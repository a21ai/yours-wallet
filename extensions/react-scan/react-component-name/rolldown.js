'use strict';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !mod || !mod.__esModule ? __defProp(target, 'default', { value: mod, enumerable: true }) : target,
    mod,
  )
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/react-component-name/rolldown.ts
var rolldown_exports = {};
__export(rolldown_exports, {
  default: () => rolldown_default,
});
module.exports = __toCommonJS(rolldown_exports);

// src/react-component-name/index.ts
var import_pluginutils = require('@rollup/pluginutils');
var import_unplugin = require('unplugin');
var import_core = require('@babel/core');
var t = __toESM(require('@babel/types'));
var createBabelPlugin = () => {
  function isComponentName(name) {
    return /^[A-Z$_]|\b(?:use|create)[A-Z]/i.test(name) && !name.endsWith('Context') && !name.endsWith('Provider');
  }
  function isReactComponent(path) {
    if (!path?.node) return false;
    if (t.isArrowFunctionExpression(path.node) || t.isFunctionDeclaration(path.node)) {
      return true;
    }
    if (
      t.isClassDeclaration(path.node) &&
      path.node.superClass &&
      t.isMemberExpression(path.node.superClass) &&
      t.isIdentifier(path.node.superClass.object) &&
      path.node.superClass.object.name === 'React' &&
      t.isIdentifier(path.node.superClass.property) &&
      path.node.superClass.property.name === 'Component'
    ) {
      return true;
    }
    if (t.isCallExpression(path.node)) {
      const callee = path.node.callee;
      if (t.isIdentifier(callee) && callee.name === 'createReactClass') {
        return true;
      }
      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.object) &&
        callee.object.name === 'React' &&
        t.isIdentifier(callee.property) &&
        callee.property.name === 'createClass'
      ) {
        return true;
      }
      if (t.isIdentifier(callee)) {
        if (callee.name.startsWith('create') || callee.name.endsWith('Component')) {
          return true;
        }
      }
      if (t.isIdentifier(callee) && callee.name.startsWith('with')) {
        return true;
      }
      if (t.isCallExpression(callee)) {
        return path.node.arguments.some(
          (arg) => (t.isIdentifier(arg) && /^[A-Z]/.exec(arg.name)) ?? isReactComponent({ node: arg }),
        );
      }
      if (t.isMemberExpression(callee)) {
        return (
          t.isIdentifier(callee.object) &&
          callee.object.name === 'React' &&
          t.isIdentifier(callee.property) &&
          ['memo', 'forwardRef', 'createClass'].includes(callee.property.name)
        );
      }
    }
    return false;
  }
  return {
    name: 'react-component-name',
    visitor: {
      Program: {
        exit(path) {
          const hasDisplayNameAssignment = /* @__PURE__ */ new Set();
          path.traverse({
            AssignmentExpression(path2) {
              const { node } = path2;
              if (
                t.isMemberExpression(node.left) &&
                t.isIdentifier(node.left.property) &&
                node.left.property.name === 'displayName' &&
                t.isIdentifier(node.left.object)
              ) {
                hasDisplayNameAssignment.add(node.left.object.name);
              }
            },
          });
          path.traverse({
            'ClassDeclaration|FunctionDeclaration|VariableDeclarator'(path2) {
              let componentName;
              let componentPath;
              if (t.isClassDeclaration(path2.node) && path2.node.id?.name) {
                componentName = path2.node.id.name;
                componentPath = path2;
              } else if (t.isFunctionDeclaration(path2.node) && path2.node.id?.name) {
                componentName = path2.node.id.name;
                componentPath = path2;
              } else if (t.isVariableDeclarator(path2.node) && t.isIdentifier(path2.node.id)) {
                componentName = path2.node.id.name;
                componentPath = path2.get('init');
              }
              if (
                componentName &&
                isComponentName(componentName) &&
                !hasDisplayNameAssignment.has(componentName) &&
                isReactComponent(componentPath)
              ) {
                const displayNameAssignment = t.tryStatement(
                  t.blockStatement([
                    t.expressionStatement(
                      t.assignmentExpression(
                        '=',
                        t.memberExpression(t.identifier(componentName), t.identifier('displayName')),
                        t.stringLiteral(componentName),
                      ),
                    ),
                  ]),
                  t.catchClause(null, t.blockStatement([])),
                );
                let targetPath = path2;
                while (targetPath && !t.isStatement(targetPath.node)) {
                  targetPath = targetPath.parentPath;
                }
                if (targetPath) {
                  targetPath.insertAfter(displayNameAssignment);
                }
              }
            },
          });
        },
      },
    },
  };
};
var reactComponentNamePlugin = (0, import_unplugin.createUnplugin)((options) => {
  const filter = (0, import_pluginutils.createFilter)(
    options?.include ?? [/\.[jt]sx?$/],
    options?.exclude ?? [/node_modules/],
  );
  return {
    name: 'react-component-name',
    enforce: 'post',
    async transform(code, id) {
      if (!filter(id)) return null;
      try {
        const result = await (0, import_core.transformAsync)(code, {
          plugins: [createBabelPlugin()],
          parserOpts: {
            plugins: ['jsx', 'typescript', 'decorators'],
          },
          filename: id,
          ast: false,
          sourceMaps: true,
          configFile: false,
          babelrc: false,
          generatorOpts: {
            jsescOption: {
              quotes: 'single',
              minimal: true,
            },
          },
        });
        return result ? { code: result.code ?? '', map: result.map } : null;
      } catch (error) {
        console.error('Error processing file:', id, error);
        return null;
      }
    },
  };
});

// src/react-component-name/rolldown.ts
var rolldown_default = reactComponentNamePlugin.rolldown;

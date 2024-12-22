import { createFilter } from '@rollup/pluginutils';
import { createUnplugin } from 'unplugin';
import { transformAsync } from '@babel/core';
import * as t from '@babel/types';

// src/react-component-name/index.ts
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
var reactComponentNamePlugin = createUnplugin((options) => {
  const filter = createFilter(options?.include ?? [/\.[jt]sx?$/], options?.exclude ?? [/node_modules/]);
  return {
    name: 'react-component-name',
    enforce: 'post',
    async transform(code, id) {
      if (!filter(id)) return null;
      try {
        const result = await transformAsync(code, {
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

export { rolldown_default as default };

'use client';
/**
 * Copyright 2024 Aiden Bai, Million Software, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
'use strict';
'use client';
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
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, 'default', { value: mod, enumerable: true }) : target,
    mod,
  )
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/core/monitor/index.ts
var monitor_exports = {};
__export(monitor_exports, {
  Monitoring: () => Monitoring,
  scanMonitoring: () => scanMonitoring,
  startMonitoring: () => startMonitoring,
});
module.exports = __toCommonJS(monitor_exports);
var import_bippy10 = require('bippy');
var import_react = require('react');

// src/core/index.ts
var import_signals3 = require('@preact/signals');
var import_bippy8 = require('bippy');

// ../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t,
    f,
    n = '';
  if ('string' == typeof e || 'number' == typeof e) n += e;
  else if ('object' == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f));
    } else for (f in e) e[f] && (n && (n += ' '), (n += f));
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = '', o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += ' '), (n += t));
  return n;
}

// ../../node_modules/.pnpm/tailwind-merge@2.5.5/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = '-';
var createClassGroupUtils = (config2) => {
  const classMap = createClassMap(config2);
  const { conflictingClassGroups, conflictingClassGroupModifiers } = config2;
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds,
  };
};
var getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject
    ? getGroupRecursive(classParts.slice(1), nextClassPartObject)
    : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({ validator }) => validator(classRest))?.classGroupId;
};
var arbitraryPropertyRegex = /^\[(.+)\]$/;
var getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      return 'arbitrary..' + property;
    }
  }
};
var createClassMap = (config2) => {
  const { theme, prefix } = config2;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: [],
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config2.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit =
        classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId,
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
var getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: [],
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
var isThemeGetter = (func) => func.isThemeGetter;
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {},
    };
  }
  let cacheSize = 0;
  let cache2 = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  const update = (key, value) => {
    cache2.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache2;
      cache2 = /* @__PURE__ */ new Map();
    }
  };
  return {
    get(key) {
      let value = cache2.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache2.has(key)) {
        cache2.set(key, value);
      } else {
        update(key, value);
      }
    },
  };
};
var IMPORTANT_MODIFIER = '!';
var createParseClassName = (config2) => {
  const { separator, experimentalParseClassName } = config2;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  const parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (
          currentCharacter === firstSeparatorCharacter &&
          (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)
        ) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier
      ? baseClassNameWithImportantModifier.substring(1)
      : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition =
      postfixModifierPosition && postfixModifierPosition > modifierStart
        ? postfixModifierPosition - modifierStart
        : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition,
    };
  };
  if (experimentalParseClassName) {
    return (className) =>
      experimentalParseClassName({
        className,
        parseClassName,
      });
  }
  return parseClassName;
};
var sortModifiers = (modifiers) => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
var createConfigUtils = (config2) => ({
  cache: createLruCache(config2.cacheSize),
  parseClassName: createParseClassName(config2),
  ...createClassGroupUtils(config2),
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const { parseClassName, getClassGroupId, getConflictingClassGroupIds } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = '';
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const { modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } =
      parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(
      hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName,
    );
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? ' ' + result : result);
  }
  return result;
};
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if ((argument = arguments[index++])) {
      if ((resolvedValue = toValue(argument))) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
var toValue = (mix) => {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if ((resolvedValue = toValue(mix[k]))) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config2 = createConfigRest.reduce(
      (previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig),
      createConfigFirst(),
    );
    configUtils = createConfigUtils(config2);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(['px', 'full', 'screen']);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex =
  /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, 'length', isLengthOnly);
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
var isArbitraryNumber = (value) => getIsArbitraryValue(value, 'number', isNumber);
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith('%') && isNumber(value.slice(0, -1));
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var sizeLabels = /* @__PURE__ */ new Set(['length', 'size', 'percentage']);
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, 'position', isNever);
var imageLabels = /* @__PURE__ */ new Set(['image', 'url']);
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, '', isShadow);
var isAny = () => true;
var getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var isLengthOnly = (value) =>
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var getDefaultConfig = () => {
  const colors = fromTheme('colors');
  const spacing = fromTheme('spacing');
  const blur = fromTheme('blur');
  const brightness = fromTheme('brightness');
  const borderColor = fromTheme('borderColor');
  const borderRadius = fromTheme('borderRadius');
  const borderSpacing = fromTheme('borderSpacing');
  const borderWidth = fromTheme('borderWidth');
  const contrast = fromTheme('contrast');
  const grayscale = fromTheme('grayscale');
  const hueRotate = fromTheme('hueRotate');
  const invert = fromTheme('invert');
  const gap = fromTheme('gap');
  const gradientColorStops = fromTheme('gradientColorStops');
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  const inset = fromTheme('inset');
  const margin = fromTheme('margin');
  const opacity = fromTheme('opacity');
  const padding = fromTheme('padding');
  const saturate = fromTheme('saturate');
  const scale = fromTheme('scale');
  const sepia = fromTheme('sepia');
  const skew = fromTheme('skew');
  const space = fromTheme('space');
  const translate = fromTheme('translate');
  const getOverscroll = () => ['auto', 'contain', 'none'];
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue];
  const getPositions = () => [
    'bottom',
    'center',
    'left',
    'left-bottom',
    'left-top',
    'right',
    'right-bottom',
    'right-top',
    'top',
  ];
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none'];
  const getBlendModes = () => [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ];
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue];
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary(),
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [
        {
          aspect: ['auto', 'square', 'video', isArbitraryValue],
        },
      ],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [
        {
          columns: [isTshirtSize],
        },
      ],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [
        {
          'break-after': getBreaks(),
        },
      ],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [
        {
          'break-before': getBreaks(),
        },
      ],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [
        {
          'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'],
        },
      ],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [
        {
          'box-decoration': ['slice', 'clone'],
        },
      ],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [
        {
          box: ['border', 'content'],
        },
      ],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: [
        'block',
        'inline-block',
        'inline',
        'flex',
        'inline-flex',
        'table',
        'inline-table',
        'table-caption',
        'table-cell',
        'table-column',
        'table-column-group',
        'table-footer-group',
        'table-header-group',
        'table-row-group',
        'table-row',
        'flow-root',
        'grid',
        'inline-grid',
        'contents',
        'list-item',
        'hidden',
      ],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [
        {
          float: ['right', 'left', 'none', 'start', 'end'],
        },
      ],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [
        {
          clear: ['left', 'right', 'both', 'none', 'start', 'end'],
        },
      ],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [
        {
          object: ['contain', 'cover', 'fill', 'none', 'scale-down'],
        },
      ],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [
        {
          object: [...getPositions(), isArbitraryValue],
        },
      ],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [
        {
          overflow: getOverflow(),
        },
      ],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [
        {
          'overflow-x': getOverflow(),
        },
      ],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [
        {
          'overflow-y': getOverflow(),
        },
      ],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [
        {
          overscroll: getOverscroll(),
        },
      ],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [
        {
          'overscroll-x': getOverscroll(),
        },
      ],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [
        {
          'overscroll-y': getOverscroll(),
        },
      ],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [
        {
          inset: [inset],
        },
      ],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [
        {
          'inset-x': [inset],
        },
      ],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [
        {
          'inset-y': [inset],
        },
      ],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [
        {
          start: [inset],
        },
      ],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [
        {
          end: [inset],
        },
      ],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [
        {
          top: [inset],
        },
      ],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [
        {
          right: [inset],
        },
      ],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [
        {
          bottom: [inset],
        },
      ],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [
        {
          left: [inset],
        },
      ],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [
        {
          z: ['auto', isInteger, isArbitraryValue],
        },
      ],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [
        {
          basis: getSpacingWithAutoAndArbitrary(),
        },
      ],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [
        {
          flex: ['row', 'row-reverse', 'col', 'col-reverse'],
        },
      ],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [
        {
          flex: ['wrap', 'wrap-reverse', 'nowrap'],
        },
      ],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [
        {
          flex: ['1', 'auto', 'initial', 'none', isArbitraryValue],
        },
      ],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [
        {
          grow: getZeroAndEmpty(),
        },
      ],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [
        {
          shrink: getZeroAndEmpty(),
        },
      ],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [
        {
          order: ['first', 'last', 'none', isInteger, isArbitraryValue],
        },
      ],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [
        {
          'grid-cols': [isAny],
        },
      ],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [
        {
          col: [
            'auto',
            {
              span: ['full', isInteger, isArbitraryValue],
            },
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [
        {
          'col-start': getNumberWithAutoAndArbitrary(),
        },
      ],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [
        {
          'col-end': getNumberWithAutoAndArbitrary(),
        },
      ],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [
        {
          'grid-rows': [isAny],
        },
      ],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [
        {
          row: [
            'auto',
            {
              span: [isInteger, isArbitraryValue],
            },
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [
        {
          'row-start': getNumberWithAutoAndArbitrary(),
        },
      ],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [
        {
          'row-end': getNumberWithAutoAndArbitrary(),
        },
      ],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [
        {
          'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'],
        },
      ],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [
        {
          'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue],
        },
      ],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [
        {
          'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue],
        },
      ],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [
        {
          gap: [gap],
        },
      ],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [
        {
          'gap-x': [gap],
        },
      ],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [
        {
          'gap-y': [gap],
        },
      ],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [
        {
          justify: ['normal', ...getAlign()],
        },
      ],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [
        {
          'justify-items': ['start', 'end', 'center', 'stretch'],
        },
      ],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [
        {
          'justify-self': ['auto', 'start', 'end', 'center', 'stretch'],
        },
      ],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [
        {
          content: ['normal', ...getAlign(), 'baseline'],
        },
      ],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [
        {
          items: ['start', 'end', 'center', 'baseline', 'stretch'],
        },
      ],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [
        {
          self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'],
        },
      ],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [
        {
          'place-content': [...getAlign(), 'baseline'],
        },
      ],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [
        {
          'place-items': ['start', 'end', 'center', 'baseline', 'stretch'],
        },
      ],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [
        {
          'place-self': ['auto', 'start', 'end', 'center', 'stretch'],
        },
      ],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [
        {
          p: [padding],
        },
      ],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [
        {
          px: [padding],
        },
      ],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [
        {
          py: [padding],
        },
      ],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [
        {
          ps: [padding],
        },
      ],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [
        {
          pe: [padding],
        },
      ],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [
        {
          pt: [padding],
        },
      ],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [
        {
          pr: [padding],
        },
      ],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [
        {
          pb: [padding],
        },
      ],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [
        {
          pl: [padding],
        },
      ],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [
        {
          m: [margin],
        },
      ],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [
        {
          mx: [margin],
        },
      ],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [
        {
          my: [margin],
        },
      ],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [
        {
          ms: [margin],
        },
      ],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [
        {
          me: [margin],
        },
      ],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [
        {
          mt: [margin],
        },
      ],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [
        {
          mr: [margin],
        },
      ],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [
        {
          mb: [margin],
        },
      ],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [
        {
          ml: [margin],
        },
      ],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [
        {
          'space-x': [space],
        },
      ],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [
        {
          'space-y': [space],
        },
      ],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [
        {
          w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing],
        },
      ],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [
        {
          'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit'],
        },
      ],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [
        {
          'max-w': [
            isArbitraryValue,
            spacing,
            'none',
            'full',
            'min',
            'max',
            'fit',
            'prose',
            {
              screen: [isTshirtSize],
            },
            isTshirtSize,
          ],
        },
      ],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [
        {
          h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'],
        },
      ],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [
        {
          'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'],
        },
      ],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [
        {
          'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'],
        },
      ],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [
        {
          size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit'],
        },
      ],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [
        {
          text: ['base', isTshirtSize, isArbitraryLength],
        },
      ],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [
        {
          font: [
            'thin',
            'extralight',
            'light',
            'normal',
            'medium',
            'semibold',
            'bold',
            'extrabold',
            'black',
            isArbitraryNumber,
          ],
        },
      ],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [
        {
          font: [isAny],
        },
      ],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [
        {
          tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue],
        },
      ],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [
        {
          'line-clamp': ['none', isNumber, isArbitraryNumber],
        },
      ],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [
        {
          leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength, isArbitraryValue],
        },
      ],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [
        {
          'list-image': ['none', isArbitraryValue],
        },
      ],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [
        {
          list: ['none', 'disc', 'decimal', isArbitraryValue],
        },
      ],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [
        {
          list: ['inside', 'outside'],
        },
      ],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [
        {
          placeholder: [colors],
        },
      ],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [
        {
          'placeholder-opacity': [opacity],
        },
      ],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [
        {
          text: ['left', 'center', 'right', 'justify', 'start', 'end'],
        },
      ],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [
        {
          text: [colors],
        },
      ],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [
        {
          'text-opacity': [opacity],
        },
      ],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [
        {
          decoration: [...getLineStyles(), 'wavy'],
        },
      ],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [
        {
          decoration: ['auto', 'from-font', isLength, isArbitraryLength],
        },
      ],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [
        {
          'underline-offset': ['auto', isLength, isArbitraryValue],
        },
      ],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [
        {
          decoration: [colors],
        },
      ],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [
        {
          text: ['wrap', 'nowrap', 'balance', 'pretty'],
        },
      ],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [
        {
          indent: getSpacingWithArbitrary(),
        },
      ],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [
        {
          align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue],
        },
      ],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [
        {
          whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'],
        },
      ],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [
        {
          break: ['normal', 'words', 'all', 'keep'],
        },
      ],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [
        {
          hyphens: ['none', 'manual', 'auto'],
        },
      ],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [
        {
          content: ['none', isArbitraryValue],
        },
      ],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [
        {
          bg: ['fixed', 'local', 'scroll'],
        },
      ],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [
        {
          'bg-clip': ['border', 'padding', 'content', 'text'],
        },
      ],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [
        {
          'bg-opacity': [opacity],
        },
      ],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [
        {
          'bg-origin': ['border', 'padding', 'content'],
        },
      ],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [
        {
          bg: [...getPositions(), isArbitraryPosition],
        },
      ],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [
        {
          bg: [
            'no-repeat',
            {
              repeat: ['', 'x', 'y', 'round', 'space'],
            },
          ],
        },
      ],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [
        {
          bg: ['auto', 'cover', 'contain', isArbitrarySize],
        },
      ],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [
        {
          bg: [
            'none',
            {
              'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'],
            },
            isArbitraryImage,
          ],
        },
      ],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [
        {
          bg: [colors],
        },
      ],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [
        {
          from: [gradientColorStopPositions],
        },
      ],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [
        {
          via: [gradientColorStopPositions],
        },
      ],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [
        {
          to: [gradientColorStopPositions],
        },
      ],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [
        {
          from: [gradientColorStops],
        },
      ],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [
        {
          via: [gradientColorStops],
        },
      ],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [
        {
          to: [gradientColorStops],
        },
      ],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [
        {
          rounded: [borderRadius],
        },
      ],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [
        {
          'rounded-s': [borderRadius],
        },
      ],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [
        {
          'rounded-e': [borderRadius],
        },
      ],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [
        {
          'rounded-t': [borderRadius],
        },
      ],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [
        {
          'rounded-r': [borderRadius],
        },
      ],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [
        {
          'rounded-b': [borderRadius],
        },
      ],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [
        {
          'rounded-l': [borderRadius],
        },
      ],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [
        {
          'rounded-ss': [borderRadius],
        },
      ],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [
        {
          'rounded-se': [borderRadius],
        },
      ],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [
        {
          'rounded-ee': [borderRadius],
        },
      ],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [
        {
          'rounded-es': [borderRadius],
        },
      ],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [
        {
          'rounded-tl': [borderRadius],
        },
      ],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [
        {
          'rounded-tr': [borderRadius],
        },
      ],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [
        {
          'rounded-br': [borderRadius],
        },
      ],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [
        {
          'rounded-bl': [borderRadius],
        },
      ],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [
        {
          border: [borderWidth],
        },
      ],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [
        {
          'border-x': [borderWidth],
        },
      ],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [
        {
          'border-y': [borderWidth],
        },
      ],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [
        {
          'border-s': [borderWidth],
        },
      ],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [
        {
          'border-e': [borderWidth],
        },
      ],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [
        {
          'border-t': [borderWidth],
        },
      ],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [
        {
          'border-r': [borderWidth],
        },
      ],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [
        {
          'border-b': [borderWidth],
        },
      ],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [
        {
          'border-l': [borderWidth],
        },
      ],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [
        {
          'border-opacity': [opacity],
        },
      ],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [
        {
          border: [...getLineStyles(), 'hidden'],
        },
      ],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [
        {
          'divide-x': [borderWidth],
        },
      ],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [
        {
          'divide-y': [borderWidth],
        },
      ],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [
        {
          'divide-opacity': [opacity],
        },
      ],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [
        {
          divide: getLineStyles(),
        },
      ],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [
        {
          border: [borderColor],
        },
      ],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [
        {
          'border-x': [borderColor],
        },
      ],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [
        {
          'border-y': [borderColor],
        },
      ],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-s': [
        {
          'border-s': [borderColor],
        },
      ],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-e': [
        {
          'border-e': [borderColor],
        },
      ],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [
        {
          'border-t': [borderColor],
        },
      ],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [
        {
          'border-r': [borderColor],
        },
      ],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [
        {
          'border-b': [borderColor],
        },
      ],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [
        {
          'border-l': [borderColor],
        },
      ],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [
        {
          divide: [borderColor],
        },
      ],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [
        {
          outline: ['', ...getLineStyles()],
        },
      ],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [
        {
          'outline-offset': [isLength, isArbitraryValue],
        },
      ],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [
        {
          outline: [isLength, isArbitraryLength],
        },
      ],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [
        {
          outline: [colors],
        },
      ],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [
        {
          ring: getLengthWithEmptyAndArbitrary(),
        },
      ],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [
        {
          ring: [colors],
        },
      ],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [
        {
          'ring-opacity': [opacity],
        },
      ],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [
        {
          'ring-offset': [isLength, isArbitraryLength],
        },
      ],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [
        {
          'ring-offset': [colors],
        },
      ],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [
        {
          shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow],
        },
      ],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [
        {
          shadow: [isAny],
        },
      ],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [
        {
          opacity: [opacity],
        },
      ],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [
        {
          'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker'],
        },
      ],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [
        {
          'bg-blend': getBlendModes(),
        },
      ],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [
        {
          filter: ['', 'none'],
        },
      ],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [
        {
          blur: [blur],
        },
      ],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [
        {
          brightness: [brightness],
        },
      ],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [
        {
          contrast: [contrast],
        },
      ],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [
        {
          'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue],
        },
      ],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [
        {
          grayscale: [grayscale],
        },
      ],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [
        {
          'hue-rotate': [hueRotate],
        },
      ],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [
        {
          invert: [invert],
        },
      ],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [
        {
          saturate: [saturate],
        },
      ],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [
        {
          sepia: [sepia],
        },
      ],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [
        {
          'backdrop-filter': ['', 'none'],
        },
      ],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [
        {
          'backdrop-blur': [blur],
        },
      ],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [
        {
          'backdrop-brightness': [brightness],
        },
      ],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [
        {
          'backdrop-contrast': [contrast],
        },
      ],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [
        {
          'backdrop-grayscale': [grayscale],
        },
      ],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [
        {
          'backdrop-hue-rotate': [hueRotate],
        },
      ],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [
        {
          'backdrop-invert': [invert],
        },
      ],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [
        {
          'backdrop-opacity': [opacity],
        },
      ],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [
        {
          'backdrop-saturate': [saturate],
        },
      ],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [
        {
          'backdrop-sepia': [sepia],
        },
      ],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [
        {
          border: ['collapse', 'separate'],
        },
      ],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [
        {
          'border-spacing': [borderSpacing],
        },
      ],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [
        {
          'border-spacing-x': [borderSpacing],
        },
      ],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [
        {
          'border-spacing-y': [borderSpacing],
        },
      ],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [
        {
          table: ['auto', 'fixed'],
        },
      ],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [
        {
          caption: ['top', 'bottom'],
        },
      ],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [
        {
          transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue],
        },
      ],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [
        {
          duration: getNumberAndArbitrary(),
        },
      ],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [
        {
          ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue],
        },
      ],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [
        {
          delay: getNumberAndArbitrary(),
        },
      ],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [
        {
          animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue],
        },
      ],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [
        {
          transform: ['', 'gpu', 'none'],
        },
      ],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [
        {
          scale: [scale],
        },
      ],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [
        {
          'scale-x': [scale],
        },
      ],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [
        {
          'scale-y': [scale],
        },
      ],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [
        {
          rotate: [isInteger, isArbitraryValue],
        },
      ],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [
        {
          'translate-x': [translate],
        },
      ],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [
        {
          'translate-y': [translate],
        },
      ],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [
        {
          'skew-x': [skew],
        },
      ],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [
        {
          'skew-y': [skew],
        },
      ],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [
        {
          origin: [
            'center',
            'top',
            'top-right',
            'right',
            'bottom-right',
            'bottom',
            'bottom-left',
            'left',
            'top-left',
            isArbitraryValue,
          ],
        },
      ],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [
        {
          accent: ['auto', colors],
        },
      ],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [
        {
          appearance: ['none', 'auto'],
        },
      ],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [
        {
          cursor: [
            'auto',
            'default',
            'pointer',
            'wait',
            'text',
            'move',
            'help',
            'not-allowed',
            'none',
            'context-menu',
            'progress',
            'cell',
            'crosshair',
            'vertical-text',
            'alias',
            'copy',
            'no-drop',
            'grab',
            'grabbing',
            'all-scroll',
            'col-resize',
            'row-resize',
            'n-resize',
            'e-resize',
            's-resize',
            'w-resize',
            'ne-resize',
            'nw-resize',
            'se-resize',
            'sw-resize',
            'ew-resize',
            'ns-resize',
            'nesw-resize',
            'nwse-resize',
            'zoom-in',
            'zoom-out',
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [
        {
          caret: [colors],
        },
      ],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [
        {
          'pointer-events': ['none', 'auto'],
        },
      ],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [
        {
          resize: ['none', 'y', 'x', ''],
        },
      ],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [
        {
          scroll: ['auto', 'smooth'],
        },
      ],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [
        {
          'scroll-m': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [
        {
          'scroll-mx': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [
        {
          'scroll-my': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [
        {
          'scroll-ms': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [
        {
          'scroll-me': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [
        {
          'scroll-mt': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [
        {
          'scroll-mr': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [
        {
          'scroll-mb': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [
        {
          'scroll-ml': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [
        {
          'scroll-p': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [
        {
          'scroll-px': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [
        {
          'scroll-py': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [
        {
          'scroll-ps': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [
        {
          'scroll-pe': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [
        {
          'scroll-pt': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [
        {
          'scroll-pr': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [
        {
          'scroll-pb': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [
        {
          'scroll-pl': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [
        {
          snap: ['start', 'end', 'center', 'align-none'],
        },
      ],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [
        {
          snap: ['normal', 'always'],
        },
      ],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [
        {
          snap: ['none', 'x', 'y', 'both'],
        },
      ],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [
        {
          snap: ['mandatory', 'proximity'],
        },
      ],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [
        {
          touch: ['auto', 'none', 'manipulation'],
        },
      ],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [
        {
          'touch-pan': ['x', 'left', 'right'],
        },
      ],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [
        {
          'touch-pan': ['y', 'up', 'down'],
        },
      ],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [
        {
          select: ['none', 'text', 'all', 'auto'],
        },
      ],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [
        {
          'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue],
        },
      ],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [
        {
          fill: [colors, 'none'],
        },
      ],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [
        {
          stroke: [isLength, isArbitraryLength, isArbitraryNumber],
        },
      ],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [
        {
          stroke: [colors, 'none'],
        },
      ],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [
        {
          'forced-color-adjust': ['auto', 'none'],
        },
      ],
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: [
        'rounded-s',
        'rounded-e',
        'rounded-t',
        'rounded-r',
        'rounded-b',
        'rounded-l',
        'rounded-ss',
        'rounded-se',
        'rounded-ee',
        'rounded-es',
        'rounded-tl',
        'rounded-tr',
        'rounded-br',
        'rounded-bl',
      ],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': [
        'border-color-s',
        'border-color-e',
        'border-color-t',
        'border-color-r',
        'border-color-b',
        'border-color-l',
      ],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': [
        'scroll-mx',
        'scroll-my',
        'scroll-ms',
        'scroll-me',
        'scroll-mt',
        'scroll-mr',
        'scroll-mb',
        'scroll-ml',
      ],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': [
        'scroll-px',
        'scroll-py',
        'scroll-ps',
        'scroll-pe',
        'scroll-pt',
        'scroll-pr',
        'scroll-pb',
        'scroll-pl',
      ],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch'],
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading'],
    },
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// src/core/web/utils/helpers.ts
var cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
var isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.includes('Firefox');
var onIdle = (callback) => {
  if ('scheduler' in globalThis) {
    return globalThis.scheduler.postTask(callback, {
      priority: 'background',
    });
  }
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(callback);
  }
  return setTimeout(callback, 0);
};
var throttle = (callback, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return callback(...args);
    }
  };
};
var debounce = (fn, wait, options = {}) => {
  let timeoutId;
  let lastArgs;
  let isLeadingInvoked = false;
  const debounced = (...args) => {
    lastArgs = args;
    if (options.leading && !isLeadingInvoked) {
      isLeadingInvoked = true;
      fn(...args);
      return;
    }
    if (timeoutId !== void 0) {
      clearTimeout(timeoutId);
    }
    if (options.trailing !== false) {
      timeoutId = window.setTimeout(() => {
        isLeadingInvoked = false;
        timeoutId = void 0;
        fn(...lastArgs);
      }, wait);
    }
  };
  debounced.cancel = () => {
    if (timeoutId !== void 0) {
      clearTimeout(timeoutId);
      timeoutId = void 0;
      isLeadingInvoked = false;
      lastArgs = void 0;
    }
  };
  return debounced;
};
var readLocalStorage = (storageKey) => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};
var saveLocalStorage = (storageKey, state) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {}
};
var toggleMultipleClasses = (element, classes) => {
  for (const cls of classes) {
    element.classList.toggle(cls);
  }
};

// src/core/web/utils/lru.ts
var LRUNode = class {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
};
var LRUMap = class {
  constructor(limit) {
    this.limit = limit;
    this.nodes = /* @__PURE__ */ new Map();
  }
  has(key) {
    return this.nodes.has(key);
  }
  get(key) {
    const result = this.nodes.get(key);
    if (result) {
      this.bubble(result);
      return result.value;
    }
    return void 0;
  }
  set(key, value) {
    if (this.nodes.has(key)) {
      const result = this.nodes.get(key);
      if (result) {
        this.bubble(result);
      }
      return;
    }
    const node = new LRUNode(key, value);
    this.insertHead(node);
    if (this.nodes.size === this.limit && this.tail) {
      this.delete(this.tail.key);
    }
    this.nodes.set(key, node);
  }
  delete(key) {
    const result = this.nodes.get(key);
    if (result) {
      this.removeNode(result);
      this.nodes.delete(key);
    }
  }
  insertHead(node) {
    if (this.head) {
      node.next = this.head;
      this.head.prev = node;
    } else {
      this.tail = node;
      node.next = void 0;
    }
    node.prev = void 0;
    this.head = node;
  }
  removeNode(node) {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node === this.tail) {
      this.tail = node.prev;
      if (this.tail) {
        this.tail.next = void 0;
      }
    }
  }
  insertBefore(node, newNode) {
    newNode.next = node;
    if (node.prev) {
      newNode.prev = node.prev;
      node.prev.next = newNode;
    } else {
      newNode.prev = void 0;
      this.head = newNode;
    }
    node.prev = newNode;
  }
  bubble(node) {
    if (node.prev) {
      this.removeNode(node);
      this.insertBefore(node.prev, node);
    }
  }
};

// src/core/utils.ts
var import_bippy2 = require('bippy');

// src/index.ts
var import_bippy = require('bippy');

// src/core/utils.ts
var updateFiberRenderData = (fiber, renders) => {
  ReactScanInternals.options.value.onRender?.(fiber, renders);
  const type = (0, import_bippy2.getType)(fiber.type) || fiber.type;
  if (type && typeof type === 'function' && typeof type === 'object') {
    const renderData = type.renderData || {
      count: 0,
      time: 0,
      renders: [],
    };
    const firstRender = renders[0];
    renderData.count += firstRender.count;
    renderData.time += firstRender.time ?? 0;
    renderData.renders.push(firstRender);
    type.renderData = renderData;
  }
};
function isEqual(a, b) {
  return a === b || (a !== a && b !== b);
}

// src/core/web/utils/outline.ts
var DEFAULT_THROTTLE_TIME = 32;
var currentFrameId = 0;
function incrementFrameId() {
  currentFrameId++;
  requestAnimationFrame(incrementFrameId);
}
if (typeof window !== 'undefined') {
  incrementFrameId();
}
var recalcOutlines = throttle(async () => {
  const { activeOutlines } = ReactScanInternals;
  const domNodes = [];
  for (const activeOutline of activeOutlines.values()) {
    domNodes.push(activeOutline.domNode);
  }
  const rectMap = await batchGetBoundingRects(domNodes);
  for (const activeOutline of activeOutlines.values()) {
    const rect = rectMap.get(activeOutline.domNode);
    if (!rect) {
      continue;
    }
    activeOutline.target = rect;
  }
}, DEFAULT_THROTTLE_TIME);
var batchGetBoundingRects = (elements) => {
  return new Promise((resolve) => {
    const results = /* @__PURE__ */ new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target;
        const bounds = entry.boundingClientRect;
        results.set(element, bounds);
      }
      observer.disconnect();
      resolve(results);
    });
    for (const element of elements) {
      observer.observe(element);
    }
  });
};
var textMeasurementCache = new LRUMap(100);

// src/core/web/inspect-element/inspect-state-machine.ts
var import_bippy6 = require('bippy');

// src/core/web/inspect-element/overlay.ts
var import_bippy4 = require('bippy');

// src/core/web/inspect-element/utils.ts
var import_bippy3 = require('bippy');
var getFiberFromElement = (element) => {
  if ('__REACT_DEVTOOLS_GLOBAL_HOOK__' in window) {
    const { renderers } = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!renderers) return null;
    for (const [_, renderer] of Array.from(renderers)) {
      try {
        const fiber = renderer.findFiberByHostInstance(element);
        if (fiber) return fiber;
      } catch (e) {}
    }
  }
  if ('_reactRootContainer' in element) {
    return element._reactRootContainer?._internalRoot?.current?.child;
  }
  for (const key in element) {
    if (key.startsWith('__reactInternalInstance$') || key.startsWith('__reactFiber')) {
      return element[key];
    }
  }
  return null;
};
var getFirstStateNode = (fiber) => {
  let current = fiber;
  while (current) {
    if (current.stateNode instanceof Element) {
      return current.stateNode;
    }
    if (!current.child) {
      break;
    }
    current = current.child;
  }
  while (current) {
    if (current.stateNode instanceof Element) {
      return current.stateNode;
    }
    if (!current.return) {
      break;
    }
    current = current.return;
  }
  return null;
};
var getNearestFiberFromElement = (element) => {
  if (!element) return null;
  const target = element;
  const originalFiber = getFiberFromElement(target);
  if (!originalFiber) {
    return null;
  }
  const res = getParentCompositeFiber(originalFiber);
  if (!res) {
    return null;
  }
  return res[0];
};
var getParentCompositeFiber = (fiber) => {
  let curr = fiber;
  let prevNonHost = null;
  while (curr) {
    if ((0, import_bippy3.isCompositeFiber)(curr)) {
      return [curr, prevNonHost];
    }
    if ((0, import_bippy3.isHostFiber)(curr)) {
      prevNonHost = curr;
    }
    curr = curr.return;
  }
};
var isFiberInTree = (fiber, root) => {
  return !!(0, import_bippy3.traverseFiber)(root, (searchFiber) => searchFiber === fiber);
};
var isCurrentTree = (fiber) => {
  let curr = fiber;
  let rootFiber = null;
  while (curr) {
    if (curr.stateNode && ReactScanInternals.instrumentation?.fiberRoots.has(curr.stateNode)) {
      rootFiber = curr;
      break;
    }
    curr = curr.return;
  }
  if (!rootFiber) {
    return false;
  }
  const fiberRoot = rootFiber.stateNode;
  const currentRootFiber = fiberRoot.current;
  return isFiberInTree(fiber, currentRootFiber);
};
var getCompositeComponentFromElement = (element) => {
  const associatedFiber = getNearestFiberFromElement(element);
  if (!associatedFiber) return {};
  const currentAssociatedFiber = isCurrentTree(associatedFiber)
    ? associatedFiber
    : (associatedFiber.alternate ?? associatedFiber);
  const stateNode = getFirstStateNode(currentAssociatedFiber);
  if (!stateNode) return {};
  const targetRect = stateNode.getBoundingClientRect();
  if (!targetRect) return {};
  const anotherRes = getParentCompositeFiber(currentAssociatedFiber);
  if (!anotherRes) {
    return {};
  }
  let [parentCompositeFiber] = anotherRes;
  parentCompositeFiber =
    (isCurrentTree(parentCompositeFiber) ? parentCompositeFiber : parentCompositeFiber.alternate) ??
    parentCompositeFiber;
  return {
    parentCompositeFiber,
    targetRect,
  };
};

// src/core/web/inspect-element/overlay.ts
var OVERLAY_DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

// src/core/web/utils/html-template.ts
function template() {
  if (!this.node) {
    const t = document.createElement('template');
    t.innerHTML = this.html;
    this.node = this.isSVG ? t.content.firstChild.firstChild : t.content.firstChild;
  }
  return this.node.cloneNode(true);
}
function createHTMLTemplate(html, isSVG) {
  return template.bind({
    node: void 0,
    html,
    isSVG,
  });
}

// src/core/instrumentation.ts
var import_signals = require('@preact/signals');
var import_bippy5 = require('bippy');
var fps = 0;
var lastTime = performance.now();
var frameCount = 0;
var initedFps = false;
var updateFPS = () => {
  frameCount++;
  const now = performance.now();
  if (now - lastTime >= 1e3) {
    fps = frameCount;
    frameCount = 0;
    lastTime = now;
  }
  requestAnimationFrame(updateFPS);
};
var getFPS = () => {
  if (!initedFps) {
    initedFps = true;
    updateFPS();
    fps = 60;
  }
  return fps;
};
var isValueUnstable = (prevValue, nextValue) => {
  const prevValueString = fastSerialize(prevValue);
  const nextValueString = fastSerialize(nextValue);
  return (
    prevValueString === nextValueString &&
    unstableTypes.includes(typeof prevValue) &&
    unstableTypes.includes(typeof nextValue)
  );
};
var unstableTypes = ['function', 'object'];
var cache = /* @__PURE__ */ new WeakMap();
function fastSerialize(value, depth = 0) {
  if (depth < 0) return '\u2026';
  switch (typeof value) {
    case 'function':
      return value.toString();
    case 'string':
      return value;
    case 'number':
    case 'boolean':
    case 'undefined':
      return String(value);
    case 'object':
      break;
    default:
      return String(value);
  }
  if (value === null) return 'null';
  if (cache.has(value)) {
    return cache.get(value);
  }
  if (Array.isArray(value)) {
    const str2 = value.length ? `[${value.length}]` : '[]';
    cache.set(value, str2);
    return str2;
  }
  if ((0, import_bippy5.isValidElement)(value)) {
    const type = (0, import_bippy5.getDisplayName)(value.type) ?? '';
    const propCount = value.props ? Object.keys(value.props).length : 0;
    const str2 = `<${type} ${propCount}>`;
    cache.set(value, str2);
    return str2;
  }
  if (Object.getPrototypeOf(value) === Object.prototype) {
    const keys = Object.keys(value);
    const str2 = keys.length ? `{${keys.length}}` : '{}';
    cache.set(value, str2);
    return str2;
  }
  const ctor = value.constructor;
  if (ctor && typeof ctor === 'function' && ctor.name) {
    const str2 = `${ctor.name}{\u2026}`;
    cache.set(value, str2);
    return str2;
  }
  const tagString = Object.prototype.toString.call(value).slice(8, -1);
  const str = `${tagString}{\u2026}`;
  cache.set(value, str);
  return str;
}
var getPropsChanges = (fiber) => {
  const changes = [];
  const prevProps = fiber.alternate?.memoizedProps || {};
  const nextProps = fiber.memoizedProps || {};
  const allKeys = /* @__PURE__ */ new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]);
  for (const propName in allKeys) {
    const prevValue = prevProps?.[propName];
    const nextValue = nextProps?.[propName];
    if (
      isEqual(prevValue, nextValue) ||
      (0, import_bippy5.isValidElement)(prevValue) ||
      (0, import_bippy5.isValidElement)(nextValue)
    ) {
      continue;
    }
    const change = {
      type: 'props',
      name: propName,
      prevValue,
      nextValue,
      unstable: false,
    };
    changes.push(change);
    if (isValueUnstable(prevValue, nextValue)) {
      change.unstable = true;
    }
  }
  return changes;
};
function getStateChangesTraversal(prevState, nextState) {
  if (isEqual(prevState.memoizedState, nextState.memoizedState)) return;
  const change = {
    type: 'state',
    name: '',
    // bad interface should make this a discriminated union
    prevValue: prevState.memoizedState,
    nextValue: nextState.memoizedState,
    unstable: false,
  };
  this.push(change);
}
var getStateChanges = (fiber) => {
  const changes = [];
  (0, import_bippy5.traverseState)(fiber, getStateChangesTraversal.bind(changes));
  return changes;
};
function getContextChangesTraversal(prevContext, nextContext) {
  const prevValue = prevContext.memoizedValue;
  const nextValue = nextContext.memoizedValue;
  const change = {
    type: 'context',
    name: '',
    prevValue,
    nextValue,
    unstable: false,
  };
  this.push(change);
  const prevValueString = fastSerialize(prevValue);
  const nextValueString = fastSerialize(nextValue);
  if (
    unstableTypes.includes(typeof prevValue) &&
    unstableTypes.includes(typeof nextValue) &&
    prevValueString === nextValueString
  ) {
    change.unstable = true;
  }
}
var getContextChanges = (fiber) => {
  const changes = [];
  (0, import_bippy5.traverseContexts)(fiber, getContextChangesTraversal.bind(changes));
  return changes;
};
var instrumentationInstances = /* @__PURE__ */ new Map();
var inited = false;
var getAllInstances = () => Array.from(instrumentationInstances.values());
function isRenderUnnecessaryTraversal(prevValue, nextValue) {
  if (!isEqual(prevValue, nextValue) && !isValueUnstable(prevValue, nextValue)) {
    this.isRequiredChange = true;
  }
}
var isRenderUnnecessary = (fiber) => {
  if (!(0, import_bippy5.didFiberCommit)(fiber)) return true;
  const mutatedHostFibers = (0, import_bippy5.getMutatedHostFibers)(fiber);
  for (const mutatedHostFiber of mutatedHostFibers) {
    const state = {
      isRequiredChange: false,
    };
    (0, import_bippy5.traverseProps)(mutatedHostFiber, isRenderUnnecessaryTraversal.bind(state));
    if (state.isRequiredChange) return false;
  }
  return true;
};
var shouldTrackUnnecessaryRenders = () => {
  if (!ReactScanInternals.options.value.trackUnnecessaryRenders) {
    return false;
  }
  const isProd = getIsProduction();
  if (
    isProd &&
    Store.monitor.value &&
    ReactScanInternals.options.value.dangerouslyForceRunInProduction &&
    ReactScanInternals.options.value.trackUnnecessaryRenders
  ) {
    return true;
  }
  if (isProd && Store.monitor.value) {
    return false;
  }
  return ReactScanInternals.options.value.trackUnnecessaryRenders;
};
var createInstrumentation = (instanceKey, config2) => {
  const instrumentation = {
    // this will typically be false, but in cases where a user provides showToolbar: true, this will be true
    isPaused: (0, import_signals.signal)(!ReactScanInternals.options.value.enabled),
    fiberRoots: /* @__PURE__ */ new Set(),
  };
  instrumentationInstances.set(instanceKey, {
    key: instanceKey,
    config: config2,
    instrumentation,
  });
  if (!inited) {
    inited = true;
    const visitor = (0, import_bippy5.createFiberVisitor)({
      onRender(fiber, phase) {
        const type = (0, import_bippy5.getType)(fiber.type);
        if (!type) return null;
        const allInstances = getAllInstances();
        const validInstancesIndicies = [];
        for (let i = 0, len = allInstances.length; i < len; i++) {
          const instance = allInstances[i];
          if (!instance.config.isValidFiber(fiber)) continue;
          validInstancesIndicies.push(i);
        }
        if (!validInstancesIndicies.length) return null;
        const changes = [];
        if (config2.trackChanges) {
          const propsChanges = getPropsChanges(fiber);
          const stateChanges = getStateChanges(fiber);
          const contextChanges = getContextChanges(fiber);
          for (let i = 0, len = propsChanges.length; i < len; i++) {
            const change = propsChanges[i];
            changes.push(change);
          }
          for (let i = 0, len = stateChanges.length; i < len; i++) {
            const change = stateChanges[i];
            changes.push(change);
          }
          for (let i = 0, len = contextChanges.length; i < len; i++) {
            const change = contextChanges[i];
            changes.push(change);
          }
        }
        const { selfTime } = (0, import_bippy5.getTimings)(fiber);
        const fps2 = getFPS();
        const render2 = {
          phase,
          componentName: (0, import_bippy5.getDisplayName)(type),
          count: 1,
          changes,
          time: selfTime,
          forget: (0, import_bippy5.hasMemoCache)(fiber),
          // todo: allow this to be toggle-able through toolbar
          // todo: performance optimization: if the last fiber measure was very off screen, do not run isRenderUnnecessary
          unnecessary: shouldTrackUnnecessaryRenders() ? isRenderUnnecessary(fiber) : null,
          didCommit: (0, import_bippy5.didFiberCommit)(fiber),
          fps: fps2,
        };
        for (let i = 0, len = validInstancesIndicies.length; i < len; i++) {
          const index = validInstancesIndicies[i];
          const instance = allInstances[index];
          instance.config.onRender(fiber, [render2]);
        }
      },
      onError(error) {
        const allInstances = getAllInstances();
        for (const instance of allInstances) {
          instance.config.onError(error);
        }
      },
    });
    (0, import_bippy5.instrument)({
      name: 'react-scan',
      onActive: config2.onActive,
      onCommitFiberRoot(rendererID, root) {
        if (
          ReactScanInternals.instrumentation?.isPaused.value &&
          (Store.inspectState.value.kind === 'inspect-off' || Store.inspectState.value.kind === 'uninitialized') &&
          !config2.forceAlwaysTrackRenders
        ) {
          return;
        }
        const allInstances = getAllInstances();
        for (const instance of allInstances) {
          instance.config.onCommitStart();
        }
        visitor(rendererID, root);
        for (const instance of allInstances) {
          instance.config.onCommitFinish();
        }
      },
    });
  }
  return instrumentation;
};

// src/core/web/inspect-element/view-state.ts
var createWhatsChangedSection = createHTMLTemplate(
  '<details class=react-scan-what-changed style="background-color:#b8860b;color:#ffff00;padding:5px"><summary class=font-bold>What changed?',
  false,
);
var createPropsHeader = createHTMLTemplate('<div>Props:', false);
var createChangeList = createHTMLTemplate('<ul style="list-style-type:disc;padding-left:20px">', false);
var createStateHeader = createHTMLTemplate('<div>State:', false);
var createContextHeader = createHTMLTemplate('<div>State:', false);
var createScanPropertyContainer = createHTMLTemplate('<div class=react-scan-property>', false);
var createScanArrow = createHTMLTemplate('<span class=react-scan-arrow>', false);
var createScanPropertyContent = createHTMLTemplate('<div class=react-scan-property-content>', false);
var createScanPreviewLine = createHTMLTemplate('<div class=react-scan-preview-line>', false);
var createScanInput = createHTMLTemplate('<input type=text class=react-scan-input>', false);
var createScanFlashOverlay = createHTMLTemplate('<div class=react-scan-flash-overlay>', false);

// src/core/web/utils/geiger.ts
var DEFAULT_VOLUME = 0.5;
var storedVolume = Math.max(0, Math.min(1, readLocalStorage('react-scan-volume') ?? DEFAULT_VOLUME));
var config = {
  firefox: {
    duration: 0.02,
    oscillatorType: 'sine',
    startFreq: 220,
    endFreq: 110,
    attack: 5e-4,
    volumeMultiplier: storedVolume,
  },
  default: {
    duration: 1e-3,
    oscillatorType: 'sine',
    startFreq: 440,
    endFreq: 220,
    attack: 5e-4,
    volumeMultiplier: storedVolume,
  },
};
var audioConfig = isFirefox ? config.firefox : config.default;

// src/core/web/toolbar.tsx
var import_preact = require('preact');

// src/core/web/components/widget/index.tsx
var import_hooks5 = require('preact/hooks');

// src/core/web/constants.ts
var SAFE_AREA = 24;
var MIN_SIZE = {
  width: 360,
  height: 36,
};
var LOCALSTORAGE_KEY = 'react-scan-widget-settings';

// src/core/web/state.ts
var import_signals2 = require('@preact/signals');
var signalRefContainer = (0, import_signals2.signal)(null);
var defaultWidgetConfig = {
  corner: 'top-left',
  dimensions: {
    isFullWidth: false,
    isFullHeight: false,
    width: MIN_SIZE.width,
    height: MIN_SIZE.height,
    position: { x: SAFE_AREA, y: SAFE_AREA },
  },
  lastDimensions: {
    isFullWidth: false,
    isFullHeight: false,
    width: MIN_SIZE.width,
    height: MIN_SIZE.height,
    position: { x: SAFE_AREA, y: SAFE_AREA },
  },
};
var getInitialWidgetConfig = (s = false) => {
  if (typeof window === 'undefined' && s) {
    return defaultWidgetConfig;
  }
  const stored = readLocalStorage(LOCALSTORAGE_KEY);
  if (!stored) {
    const defaultConfig = {
      corner: 'top-left',
      dimensions: {
        isFullWidth: false,
        isFullHeight: false,
        width: MIN_SIZE.width,
        height: MIN_SIZE.height,
        position: { x: 24, y: 24 },
      },
      lastDimensions: {
        isFullWidth: false,
        isFullHeight: false,
        width: 360,
        height: 240,
        position: { x: 24, y: 24 },
      },
    };
    saveLocalStorage(LOCALSTORAGE_KEY, {
      corner: defaultConfig.corner,
      dimensions: defaultConfig.dimensions,
      lastDimensions: defaultConfig.lastDimensions,
    });
    return defaultConfig;
  }
  return {
    corner: stored.corner,
    dimensions: {
      isFullWidth: false,
      isFullHeight: false,
      width: MIN_SIZE.width,
      height: MIN_SIZE.height,
      position: stored.dimensions.position,
    },
    lastDimensions: stored.dimensions,
  };
};
var signalWidget = (0, import_signals2.signal)(getInitialWidgetConfig());
var updateDimensions = () => {
  if (typeof window === 'undefined') return;
  const { dimensions } = signalWidget.value;
  const { width, height, position } = dimensions;
  signalWidget.value = {
    ...signalWidget.value,
    dimensions: {
      isFullWidth: width >= window.innerWidth - SAFE_AREA * 2,
      isFullHeight: height >= window.innerHeight - SAFE_AREA * 2,
      width,
      height,
      position,
    },
  };
};

// src/core/web/components/widget/header.tsx
var import_hooks = require('preact/hooks');
var import_bippy7 = require('bippy');

// src/core/web/components/icon/index.tsx
var import_compat = require('preact/compat');
var import_jsx_runtime = require('preact/jsx-runtime');
var Icon = (0, import_compat.forwardRef)((props, ref) => {
  const { size = 15, name, fill = 'currentColor', stroke = 'currentColor', className, externalURL = '', style } = props;
  const width = Array.isArray(size) ? size[0] : size;
  const height = Array.isArray(size) ? size[1] || size[0] : size;
  const attributes = {
    width: `${width}px`,
    height: `${height}px`,
    fill,
    stroke,
    className,
    style,
  };
  const path = `${externalURL}#${name}`;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('svg', {
    ref,
    ...attributes,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('use', { href: path }),
  });
});

// src/core/web/components/widget/header.tsx
var import_jsx_runtime2 = require('preact/jsx-runtime');
var useSubscribeFocusedFiber = (onUpdate) => {
  (0, import_hooks.useEffect)(() => {
    const subscribe = () => {
      if (Store.inspectState.value.kind !== 'focused') {
        return;
      }
      const focusedElement = Store.inspectState.value.focusedDomElement;
      const { parentCompositeFiber } = getCompositeComponentFromElement(focusedElement);
      if (!parentCompositeFiber) return;
      onUpdate(parentCompositeFiber);
    };
    const unSubReportTime = Store.lastReportTime.subscribe(subscribe);
    const unSubState = Store.inspectState.subscribe(subscribe);
    return () => {
      unSubReportTime();
      unSubState();
    };
  }, []);
};
var Header = () => {
  const [componentName, setComponentName] = (0, import_hooks.useState)(null);
  const [componentRenders, setComponentRenders] = (0, import_hooks.useState)(null);
  const [componentTime, setComponentTime] = (0, import_hooks.useState)(null);
  useSubscribeFocusedFiber((fiber) => {
    const displayName = (0, import_bippy7.getDisplayName)(fiber.type);
    const reportData = Store.reportData.get(fiber);
    setComponentName(displayName ?? 'Unknown');
    setComponentRenders(reportData?.count ?? null);
    setComponentTime(reportData?.time && reportData.time > 0 ? reportData?.time : null);
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)('div', {
    class: 'react-scan-header',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)('div', {
        style: {
          gap: '0.5rem',
          display: 'flex',
          width: '50%',
          justifyContent: 'start',
          alignItems: 'center',
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)('span', { children: componentName }),
          componentRenders !== null &&
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)('span', { children: ['\u2022 x', componentRenders, ' '] }),
          componentTime !== null &&
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)('span', {
              class: 'react-scan-component-time',
              children: ['\u2022 ', componentTime.toFixed(2), 'ms'],
            }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)('div', {
        style: {
          width: '50%',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          columnGap: '2px',
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)('button', {
          title: 'Close',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '0.25rem',
            minWidth: 'fit-content',
            borderRadius: '0.25rem',
            transition: 'color 150ms linear',
          },
          onClick: () => {
            if (Store.inspectState.value.propContainer) {
              Store.inspectState.value = {
                kind: 'inspect-off',
                propContainer: Store.inspectState.value.propContainer,
              };
            }
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: 'icon-close' }),
        }),
      }),
    ],
  });
};

// src/core/web/components/widget/helpers.ts
var getWindowDimensions = /* @__PURE__ */ (() => {
  let cache2 = null;
  return () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    if (cache2 && cache2.width === currentWidth && cache2.height === currentHeight) {
      return {
        maxWidth: cache2.maxWidth,
        maxHeight: cache2.maxHeight,
        rightEdge: cache2.rightEdge,
        bottomEdge: cache2.bottomEdge,
        isFullWidth: cache2.isFullWidth,
        isFullHeight: cache2.isFullHeight,
      };
    }
    const maxWidth = currentWidth - SAFE_AREA * 2;
    const maxHeight = currentHeight - SAFE_AREA * 2;
    cache2 = {
      width: currentWidth,
      height: currentHeight,
      maxWidth,
      maxHeight,
      rightEdge: (width) => currentWidth - width - SAFE_AREA,
      bottomEdge: (height) => currentHeight - height - SAFE_AREA,
      isFullWidth: (width) => width >= maxWidth,
      isFullHeight: (height) => height >= maxHeight,
    };
    return {
      maxWidth: cache2.maxWidth,
      maxHeight: cache2.maxHeight,
      rightEdge: cache2.rightEdge,
      bottomEdge: cache2.bottomEdge,
      isFullWidth: cache2.isFullWidth,
      isFullHeight: cache2.isFullHeight,
    };
  };
})();
var getOppositeCorner = (position, currentCorner, isFullScreen, isFullWidth, isFullHeight) => {
  if (isFullScreen) {
    if (position === 'top-left') return 'bottom-right';
    if (position === 'top-right') return 'bottom-left';
    if (position === 'bottom-left') return 'top-right';
    if (position === 'bottom-right') return 'top-left';
    const [vertical, horizontal] = currentCorner.split('-');
    if (position === 'left') return `${vertical}-right`;
    if (position === 'right') return `${vertical}-left`;
    if (position === 'top') return `bottom-${horizontal}`;
    if (position === 'bottom') return `top-${horizontal}`;
  }
  if (isFullWidth) {
    if (position === 'left') return `${currentCorner.split('-')[0]}-right`;
    if (position === 'right') return `${currentCorner.split('-')[0]}-left`;
  }
  if (isFullHeight) {
    if (position === 'top') return `bottom-${currentCorner.split('-')[1]}`;
    if (position === 'bottom') return `top-${currentCorner.split('-')[1]}`;
  }
  return currentCorner;
};
var calculatePosition = (corner, width, height) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const isMinimized = width === MIN_SIZE.width;
  const effectiveWidth = isMinimized ? width : Math.min(width, windowWidth - SAFE_AREA * 2);
  const effectiveHeight = isMinimized ? height : Math.min(height, windowHeight - SAFE_AREA * 2);
  let x;
  let y;
  switch (corner) {
    case 'top-right':
      x = windowWidth - effectiveWidth - SAFE_AREA;
      y = SAFE_AREA;
      break;
    case 'bottom-right':
      x = windowWidth - effectiveWidth - SAFE_AREA;
      y = windowHeight - effectiveHeight - SAFE_AREA;
      break;
    case 'bottom-left':
      x = SAFE_AREA;
      y = windowHeight - effectiveHeight - SAFE_AREA;
      break;
    case 'top-left':
    default:
      x = SAFE_AREA;
      y = SAFE_AREA;
      break;
  }
  if (isMinimized) {
    x = Math.max(SAFE_AREA, Math.min(x, windowWidth - effectiveWidth - SAFE_AREA));
    y = Math.max(SAFE_AREA, Math.min(y, windowHeight - effectiveHeight - SAFE_AREA));
  }
  return { x, y };
};
var getPositionClasses = (position) => {
  switch (position) {
    case 'top':
      return 'top-0 left-0 right-0 -translate-y-3/4';
    case 'bottom':
      return 'right-0 bottom-0 left-0 translate-y-3/4';
    case 'left':
      return 'top-0 bottom-0 left-0 -translate-x-3/4';
    case 'right':
      return 'top-0 right-0 bottom-0 translate-x-3/4';
    case 'top-left':
      return 'top-0 left-0 -translate-x-3/4 -translate-y-3/4';
    case 'top-right':
      return 'top-0 right-0 translate-x-3/4 -translate-y-3/4';
    case 'bottom-left':
      return 'bottom-0 left-0 -translate-x-3/4 translate-y-3/4';
    case 'bottom-right':
      return 'bottom-0 right-0 translate-x-3/4 translate-y-3/4';
    default:
      return '';
  }
};
var getInteractionClasses = (position, isLine) => {
  const commonClasses = [
    'transition-[transform,opacity]',
    'duration-300',
    'delay-500',
    'group-hover:delay-0',
    'group-active:delay-0',
  ];
  if (isLine) {
    return [
      ...commonClasses,
      // Size classes
      position === 'left' || position === 'right' ? 'w-6' : 'w-full',
      position === 'left' || position === 'right' ? 'h-full' : 'h-6',
      // Cursor classes
      position === 'left' || position === 'right' ? 'cursor-ew-resize' : 'cursor-ns-resize',
    ];
  }
  return [
    ...commonClasses,
    'w-6',
    'h-6',
    position === 'top-left' || position === 'bottom-right' ? 'cursor-nwse-resize' : 'cursor-nesw-resize',
    `rounded-${position.split('-').join('')}`,
  ];
};
var positionMatchesCorner = (position, corner) => {
  const [vertical, horizontal] = corner.split('-');
  return position !== vertical && position !== horizontal;
};
var getHandleVisibility = (position, isLine, corner, isFullWidth, isFullHeight) => {
  if (isFullWidth && isFullHeight) {
    return true;
  }
  if (!isFullWidth && !isFullHeight) {
    if (isLine) {
      return positionMatchesCorner(position, corner);
    }
    return position === getOppositeCorner(corner, corner, true);
  }
  if (isFullWidth) {
    if (isLine) {
      return position !== corner.split('-')[0];
    }
    return !position.startsWith(corner.split('-')[0]);
  }
  if (isFullHeight) {
    if (isLine) {
      return position !== corner.split('-')[1];
    }
    return !position.endsWith(corner.split('-')[1]);
  }
  return false;
};
var calculateBoundedSize = (currentSize, delta, isWidth) => {
  const min = isWidth ? MIN_SIZE.width : MIN_SIZE.height * 5;
  const max = isWidth ? getWindowDimensions().maxWidth : getWindowDimensions().maxHeight;
  const newSize = currentSize + delta;
  return Math.min(Math.max(min, newSize), max);
};
var calculateNewSizeAndPosition = (position, initialSize, initialPosition, deltaX, deltaY) => {
  const maxWidth = window.innerWidth - SAFE_AREA * 2;
  const maxHeight = window.innerHeight - SAFE_AREA * 2;
  let newWidth = initialSize.width;
  let newHeight = initialSize.height;
  let newX = initialPosition.x;
  let newY = initialPosition.y;
  if (position.includes('right')) {
    const availableWidth = window.innerWidth - initialPosition.x - SAFE_AREA;
    const proposedWidth = Math.min(initialSize.width + deltaX, availableWidth);
    newWidth = Math.min(maxWidth, Math.max(MIN_SIZE.width, proposedWidth));
  }
  if (position.includes('left')) {
    const availableWidth = initialPosition.x + initialSize.width - SAFE_AREA;
    const proposedWidth = Math.min(initialSize.width - deltaX, availableWidth);
    newWidth = Math.min(maxWidth, Math.max(MIN_SIZE.width, proposedWidth));
    newX = initialPosition.x - (newWidth - initialSize.width);
  }
  if (position.includes('bottom')) {
    const availableHeight = window.innerHeight - initialPosition.y - SAFE_AREA;
    const proposedHeight = Math.min(initialSize.height + deltaY, availableHeight);
    newHeight = Math.min(maxHeight, Math.max(MIN_SIZE.height * 5, proposedHeight));
  }
  if (position.includes('top')) {
    const availableHeight = initialPosition.y + initialSize.height - SAFE_AREA;
    const proposedHeight = Math.min(initialSize.height - deltaY, availableHeight);
    newHeight = Math.min(maxHeight, Math.max(MIN_SIZE.height * 5, proposedHeight));
    newY = initialPosition.y - (newHeight - initialSize.height);
  }
  newX = Math.max(SAFE_AREA, Math.min(newX, window.innerWidth - SAFE_AREA - newWidth));
  newY = Math.max(SAFE_AREA, Math.min(newY, window.innerHeight - SAFE_AREA - newHeight));
  return {
    newSize: { width: newWidth, height: newHeight },
    newPosition: { x: newX, y: newY },
  };
};
var getClosestCorner = (position) => {
  const { maxWidth, maxHeight } = getWindowDimensions();
  const distances = {
    'top-left': Math.hypot(position.x, position.y),
    'top-right': Math.hypot(maxWidth - position.x, position.y),
    'bottom-left': Math.hypot(position.x, maxHeight - position.y),
    'bottom-right': Math.hypot(maxWidth - position.x, maxHeight - position.y),
  };
  return Object.entries(distances).reduce((closest, [corner, distance]) => {
    return distance < distances[closest] ? corner : closest;
  }, 'top-left');
};
var getBestCorner = (mouseX, mouseY, initialMouseX, initialMouseY, threshold = 100) => {
  const deltaX = initialMouseX !== void 0 ? mouseX - initialMouseX : 0;
  const deltaY = initialMouseY !== void 0 ? mouseY - initialMouseY : 0;
  const windowCenterX = window.innerWidth / 2;
  const windowCenterY = window.innerHeight / 2;
  const movingRight = deltaX > threshold;
  const movingLeft = deltaX < -threshold;
  const movingDown = deltaY > threshold;
  const movingUp = deltaY < -threshold;
  if (movingRight || movingLeft) {
    const isBottom = mouseY > windowCenterY;
    return movingRight ? (isBottom ? 'bottom-right' : 'top-right') : isBottom ? 'bottom-left' : 'top-left';
  }
  if (movingDown || movingUp) {
    const isRight = mouseX > windowCenterX;
    return movingDown ? (isRight ? 'bottom-right' : 'bottom-left') : isRight ? 'top-right' : 'top-left';
  }
  return mouseX > windowCenterX
    ? mouseY > windowCenterY
      ? 'bottom-right'
      : 'top-right'
    : mouseY > windowCenterY
      ? 'bottom-left'
      : 'top-left';
};

// src/core/web/components/widget/resize-handle.tsx
var import_hooks2 = require('preact/hooks');
var import_jsx_runtime3 = require('preact/jsx-runtime');
var ResizeHandle = ({ position }) => {
  const isLine = !position.includes('-');
  const refContainer = (0, import_hooks2.useRef)(null);
  const refLine = (0, import_hooks2.useRef)(null);
  const refCorner = (0, import_hooks2.useRef)(null);
  const prevWidth = (0, import_hooks2.useRef)(null);
  const prevHeight = (0, import_hooks2.useRef)(null);
  const prevCorner = (0, import_hooks2.useRef)(null);
  (0, import_hooks2.useEffect)(() => {
    if (!refContainer.current) return;
    const classes = getInteractionClasses(position, isLine);
    toggleMultipleClasses(refContainer.current, classes);
    const updateVisibility = (isFocused) => {
      if (!refContainer.current) return;
      const isVisible =
        isFocused &&
        getHandleVisibility(
          position,
          isLine,
          signalWidget.value.corner,
          signalWidget.value.dimensions.isFullWidth,
          signalWidget.value.dimensions.isFullHeight,
        );
      if (!isVisible) {
        refContainer.current.classList.add('hidden', 'pointer-events-none', 'opacity-0');
      } else {
        refContainer.current.classList.remove('hidden', 'pointer-events-none', 'opacity-0');
      }
    };
    const unsubscribeSignalWidget = signalWidget.subscribe((state) => {
      if (!refContainer.current) return;
      if (
        prevWidth.current !== null &&
        prevHeight.current !== null &&
        prevCorner.current !== null &&
        state.dimensions.width === prevWidth.current &&
        state.dimensions.height === prevHeight.current &&
        state.corner === prevCorner.current
      ) {
        return;
      }
      updateVisibility(Store.inspectState.value.kind === 'focused');
      prevWidth.current = state.dimensions.width;
      prevHeight.current = state.dimensions.height;
      prevCorner.current = state.corner;
    });
    const unsubscribeStoreInspectState = Store.inspectState.subscribe((state) => {
      if (!refContainer.current) return;
      updateVisibility(state.kind === 'focused');
    });
    return () => {
      unsubscribeSignalWidget();
      unsubscribeStoreInspectState();
      prevWidth.current = null;
      prevHeight.current = null;
      prevCorner.current = null;
    };
  }, []);
  const handleResize = (0, import_hooks2.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    const container = signalRefContainer.value;
    if (!container) return;
    const containerStyle = container.style;
    const { dimensions } = signalWidget.value;
    const initialX = e.clientX;
    const initialY = e.clientY;
    const initialWidth = dimensions.width;
    const initialHeight = dimensions.height;
    const initialPosition = dimensions.position;
    signalWidget.value = {
      ...signalWidget.value,
      dimensions: {
        ...dimensions,
        isFullWidth: false,
        isFullHeight: false,
        width: initialWidth,
        height: initialHeight,
        position: initialPosition,
      },
    };
    let rafId = null;
    const handleMouseMove = (e2) => {
      if (rafId) return;
      containerStyle.transition = 'none';
      rafId = requestAnimationFrame(() => {
        const { newSize, newPosition } = calculateNewSizeAndPosition(
          position,
          { width: initialWidth, height: initialHeight },
          initialPosition,
          e2.clientX - initialX,
          e2.clientY - initialY,
        );
        containerStyle.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`;
        containerStyle.width = `${newSize.width}px`;
        containerStyle.height = `${newSize.height}px`;
        signalWidget.value = {
          ...signalWidget.value,
          dimensions: {
            isFullWidth: false,
            isFullHeight: false,
            width: newSize.width,
            height: newSize.height,
            position: newPosition,
          },
        };
        rafId = null;
      });
    };
    const handleMouseUp = () => {
      if (rafId) cancelAnimationFrame(rafId);
      const { dimensions: dimensions2, corner } = signalWidget.value;
      const { isFullWidth, isFullHeight } = getWindowDimensions();
      const isCurrentFullWidth = isFullWidth(dimensions2.width);
      const isCurrentFullHeight = isFullHeight(dimensions2.height);
      const isFullScreen = isCurrentFullWidth && isCurrentFullHeight;
      let newCorner = corner;
      if (isFullScreen || isCurrentFullWidth || isCurrentFullHeight) {
        newCorner = getClosestCorner(dimensions2.position);
      }
      const newPosition = calculatePosition(newCorner, dimensions2.width, dimensions2.height);
      const onTransitionEnd = () => {
        container.removeEventListener('transitionend', onTransitionEnd);
      };
      container.addEventListener('transitionend', onTransitionEnd);
      containerStyle.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`;
      signalWidget.value = {
        corner: newCorner,
        dimensions: {
          isFullWidth: isCurrentFullWidth,
          isFullHeight: isCurrentFullHeight,
          width: dimensions2.width,
          height: dimensions2.height,
          position: newPosition,
        },
        lastDimensions: {
          isFullWidth: isCurrentFullWidth,
          isFullHeight: isCurrentFullHeight,
          width: dimensions2.width,
          height: dimensions2.height,
          position: newPosition,
        },
      };
      saveLocalStorage(LOCALSTORAGE_KEY, {
        corner: newCorner,
        dimensions: signalWidget.value.dimensions,
        lastDimensions: signalWidget.value.lastDimensions,
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });
    document.addEventListener('mouseup', handleMouseUp);
  }, []);
  const handleDoubleClick = (0, import_hooks2.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    const container = signalRefContainer.value;
    if (!container) return;
    const containerStyle = container.style;
    const { dimensions, corner } = signalWidget.value;
    const { maxWidth, maxHeight, isFullWidth, isFullHeight } = getWindowDimensions();
    const isCurrentFullWidth = isFullWidth(dimensions.width);
    const isCurrentFullHeight = isFullHeight(dimensions.height);
    const isFullScreen = isCurrentFullWidth && isCurrentFullHeight;
    const isPartiallyMaximized = (isCurrentFullWidth || isCurrentFullHeight) && !isFullScreen;
    let newWidth = dimensions.width;
    let newHeight = dimensions.height;
    const newCorner = getOppositeCorner(position, corner, isFullScreen, isCurrentFullWidth, isCurrentFullHeight);
    if (isLine) {
      if (position === 'left' || position === 'right') {
        newWidth = isCurrentFullWidth ? dimensions.width : maxWidth;
        if (isPartiallyMaximized) {
          newWidth = isCurrentFullWidth ? MIN_SIZE.width : maxWidth;
        }
      } else {
        newHeight = isCurrentFullHeight ? dimensions.height : maxHeight;
        if (isPartiallyMaximized) {
          newHeight = isCurrentFullHeight ? MIN_SIZE.height * 5 : maxHeight;
        }
      }
    } else {
      newWidth = maxWidth;
      newHeight = maxHeight;
    }
    if (isFullScreen) {
      if (isLine) {
        if (position === 'left' || position === 'right') {
          newWidth = MIN_SIZE.width;
        } else {
          newHeight = MIN_SIZE.height * 5;
        }
      } else {
        newWidth = MIN_SIZE.width;
        newHeight = MIN_SIZE.height * 5;
      }
    }
    const newPosition = calculatePosition(newCorner, newWidth, newHeight);
    const newDimensions = {
      isFullWidth: isFullWidth(newWidth),
      isFullHeight: isFullHeight(newHeight),
      width: newWidth,
      height: newHeight,
      position: newPosition,
    };
    requestAnimationFrame(() => {
      signalWidget.value = {
        corner: newCorner,
        dimensions: newDimensions,
        lastDimensions: dimensions,
      };
      containerStyle.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      containerStyle.width = `${newWidth}px`;
      containerStyle.height = `${newHeight}px`;
      containerStyle.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`;
    });
    saveLocalStorage(LOCALSTORAGE_KEY, {
      corner: newCorner,
      dimensions: newDimensions,
      lastDimensions: dimensions,
    });
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('div', {
    ref: refContainer,
    onMouseDown: handleResize,
    onDblClick: handleDoubleClick,
    className: cn(
      'flex items-center justify-center',
      'resize-handle absolute',
      'group overflow-hidden',
      'transition-opacity select-none z-50',
      getPositionClasses(position),
    ),
    children: isLine
      ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('span', {
          ref: refLine,
          className: cn(
            'absolute',
            'opacity-0 group-hover:opacity-100 group-active:opacity-100',
            'transition-[transform, opacity] duration-300',
            'delay-500 group-hover:delay-0 group-active:delay-0 group-active:opacity-0',
            {
              'translate-y-full group-hover:-translate-y-1/4': position === 'top',
              '-translate-x-full group-hover:translate-x-1/4': position === 'right',
              '-translate-y-full group-hover:translate-y-1/4': position === 'bottom',
              'translate-x-full group-hover:-translate-x-1/4': position === 'left',
            },
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, {
            name: 'icon-chevrons-up-down',
            className: cn('text-[#7b51c8]', {
              'rotate-90': position === 'left' || position === 'right',
            }),
          }),
        })
      : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('span', {
          ref: refCorner,
          className: cn(
            'absolute inset-0',
            'flex items-center justify-center',
            'opacity-0 group-hover:opacity-100 group-active:opacity-100',
            'transition-[transform,opacity] duration-300',
            'delay-500 group-hover:delay-0 group-active:delay-0',
            'origin-center',
            'text-[#7b51c8]',
            {
              'top-0 left-0 rotate-[135deg] translate-x-full translate-y-full': position === 'top-left',
              'top-0 right-0 rotate-[225deg] -translate-x-full translate-y-full': position === 'top-right',
              'bottom-0 left-0 rotate-45 translate-x-full -translate-y-full': position === 'bottom-left',
              'bottom-0 right-0 -rotate-45 -translate-x-full -translate-y-full': position === 'bottom-right',
            },
            'group-hover:translate-x-0 group-hover:translate-y-0',
            'group-active:opacity-0',
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: 'icon-chevrons-up-down' }),
        }),
  });
};

// src/core/web/components/widget/toolbar.tsx
var import_hooks4 = require('preact/hooks');

// src/core/web/components/widget/fps-meter.tsx
var import_hooks3 = require('preact/hooks');
var import_jsx_runtime4 = require('preact/jsx-runtime');
var FpsMeter = () => {
  const [fps2, setFps] = (0, import_hooks3.useState)(null);
  (0, import_hooks3.useEffect)(() => {
    const intervalId = setInterval(() => {
      setFps(getFPS());
    }, 100);
    return () => clearInterval(intervalId);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)('span', {
    style: {
      width: 'fit-content',
    },
    'data-text': String(fps2),
    className: cn(
      'with-data-text',
      'flex gap-1 items-center',
      'ml-2 px-2',
      'h-full',
      'text-white text-xs font-mono whitespace-nowrap',
      'bg-neutral-700',
      'rounded-full',
    ),
    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)('span', { className: 'text-xxs', children: 'FPS' }),
  });
};

// src/core/web/components/widget/toolbar.tsx
var import_jsx_runtime5 = require('preact/jsx-runtime');
var Toolbar = ({ refPropContainer }) => {
  const inspectState = Store.inspectState;
  const isInspectFocused = inspectState.value.kind === 'focused';
  const isInspectActive = inspectState.value.kind === 'inspecting';
  const { inspectIcon, inspectColor } = (0, import_hooks4.useMemo)(() => {
    let inspectIcon2 = null;
    let inspectColor2 = '#999';
    if (isInspectActive) {
      inspectIcon2 = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: 'icon-inspect' });
      inspectColor2 = 'rgba(142, 97, 227, 1)';
    } else if (isInspectFocused) {
      inspectIcon2 = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: 'icon-focus' });
      inspectColor2 = 'rgba(142, 97, 227, 1)';
    } else {
      inspectIcon2 = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: 'icon-inspect' });
      inspectColor2 = '#999';
    }
    return { inspectIcon: inspectIcon2, inspectColor: inspectColor2 };
  }, [isInspectActive, isInspectFocused]);
  const onToggleInspect = (0, import_hooks4.useCallback)(() => {
    const currentState = Store.inspectState.value;
    switch (currentState.kind) {
      case 'inspecting':
        Store.inspectState.value = {
          kind: 'inspect-off',
          propContainer: currentState.propContainer,
        };
        break;
      case 'focused':
        Store.inspectState.value = {
          kind: 'inspect-off',
          propContainer: currentState.propContainer,
        };
        break;
      case 'inspect-off':
        Store.inspectState.value = {
          kind: 'inspecting',
          hoveredDomElement: null,
          propContainer: refPropContainer.current,
        };
        break;
      case 'uninitialized':
        break;
    }
  }, [Store.inspectState.value]);
  const findNextElement = (0, import_hooks4.useCallback)((currentElement, direction) => {
    const allElements = Array.from(document.querySelectorAll('*')).filter((el) => el instanceof HTMLElement);
    const currentIndex = allElements.indexOf(currentElement);
    if (currentIndex === -1) return null;
    const currentFiber = getNearestFiberFromElement(currentElement);
    const increment = direction === 'next' ? 1 : -1;
    let index = currentIndex + increment;
    while (index >= 0 && index < allElements.length) {
      const fiber = getNearestFiberFromElement(allElements[index]);
      if (fiber && fiber !== currentFiber) {
        return allElements[index];
      }
      index += increment;
    }
    return null;
  }, []);
  const onPreviousFocus = (0, import_hooks4.useCallback)(() => {
    const currentState = Store.inspectState.value;
    if (currentState.kind !== 'focused' || !currentState.focusedDomElement) return;
    const prevElement = findNextElement(currentState.focusedDomElement, 'previous');
    if (prevElement) {
      Store.inspectState.value = {
        kind: 'focused',
        focusedDomElement: prevElement,
        propContainer: currentState.propContainer,
      };
    }
  }, [findNextElement]);
  const onNextFocus = (0, import_hooks4.useCallback)(() => {
    const currentState = Store.inspectState.value;
    if (currentState.kind !== 'focused' || !currentState.focusedDomElement) return;
    const nextElement = findNextElement(currentState.focusedDomElement, 'next');
    if (nextElement) {
      Store.inspectState.value = {
        kind: 'focused',
        focusedDomElement: nextElement,
        propContainer: currentState.propContainer,
      };
    }
  }, [findNextElement]);
  const onToggleActive = (0, import_hooks4.useCallback)(() => {
    if (ReactScanInternals.instrumentation) {
      ReactScanInternals.instrumentation.isPaused.value = !ReactScanInternals.instrumentation.isPaused.value;
    }
  }, [ReactScanInternals.instrumentation]);
  const onSoundToggle = (0, import_hooks4.useCallback)(() => {
    const newSoundState = !ReactScanInternals.options.value.playSound;
    setOptions({ playSound: newSoundState });
  }, []);
  (0, import_hooks4.useEffect)(() => {
    const currentState = Store.inspectState.value;
    if (currentState.kind === 'uninitialized') {
      Store.inspectState.value = {
        kind: 'inspect-off',
        propContainer: refPropContainer.current,
      };
    }
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)('div', {
    className: 'flex max-h-9 min-h-9 flex-1 items-stretch overflow-hidden',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)('button', {
        title: 'Inspect element',
        onClick: onToggleInspect,
        className: 'flex items-center justify-center px-3',
        style: { color: inspectColor },
        children: inspectIcon,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)('button', {
        id: 'react-scan-power',
        title: ReactScanInternals.instrumentation?.isPaused.value ? 'Start' : 'Stop',
        onClick: onToggleActive,
        className: cn('flex items-center justify-center px-3', {
          'text-white': !ReactScanInternals.instrumentation?.isPaused.value,
          'text-[#999]': ReactScanInternals.instrumentation?.isPaused.value,
        }),
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, {
          name: `icon-${ReactScanInternals.instrumentation?.isPaused.value ? 'eye-off' : 'eye'}`,
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)('button', {
        id: 'react-scan-sound-toggle',
        onClick: onSoundToggle,
        title: ReactScanInternals.options.value.playSound ? 'Sound On' : 'Sound Off',
        className: cn('flex items-center justify-center px-3', {
          'text-white': ReactScanInternals.options.value.playSound,
          'text-[#999]': !ReactScanInternals.options.value.playSound,
        }),
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, {
          name: `icon-${ReactScanInternals.options.value.playSound ? 'volume-on' : 'volume-off'}`,
        }),
      }),
      isInspectFocused &&
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)('div', {
          className: cn(
            'flex items-stretch justify-between',
            'ml-auto',
            'border-l-1 border-white/10 text-[#999]',
            'overflow-hidden',
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)('button', {
              id: 'react-scan-previous-focus',
              title: 'Previous element',
              onClick: onPreviousFocus,
              className: 'flex items-center justify-center px-3',
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: 'icon-previous' }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)('button', {
              id: 'react-scan-next-focus',
              title: 'Next element',
              onClick: onNextFocus,
              className: 'flex items-center justify-center px-3',
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: 'icon-next' }),
            }),
          ],
        }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)('div', {
        className: cn('flex items-center justify-center whitespace-nowrap py-1.5 px-2 text-sm text-white', {
          'ml-auto': !isInspectFocused,
        }),
        children: ['react-scan', /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FpsMeter, {})],
      }),
    ],
  });
};
var toolbar_default = Toolbar;

// src/core/web/components/widget/index.tsx
var import_jsx_runtime6 = require('preact/jsx-runtime');
var Widget = () => {
  const refShouldExpand = (0, import_hooks5.useRef)(false);
  const refContainer = (0, import_hooks5.useRef)(null);
  const refContent = (0, import_hooks5.useRef)(null);
  const refPropContainer = (0, import_hooks5.useRef)(null);
  const refFooter = (0, import_hooks5.useRef)(null);
  const refInitialMinimizedWidth = (0, import_hooks5.useRef)(0);
  const refInitialMinimizedHeight = (0, import_hooks5.useRef)(0);
  const updateWidgetPosition = (0, import_hooks5.useCallback)((shouldSave = true) => {
    if (!refContainer.current) return;
    const inspectState = Store.inspectState.value;
    const isInspectFocused = inspectState.kind === 'focused';
    const { corner } = signalWidget.value;
    let newWidth, newHeight;
    if (isInspectFocused) {
      const lastDims = signalWidget.value.lastDimensions;
      newWidth = calculateBoundedSize(lastDims.width, 0, true);
      newHeight = calculateBoundedSize(lastDims.height, 0, false);
    } else {
      const currentDims = signalWidget.value.dimensions;
      if (currentDims.width > refInitialMinimizedWidth.current) {
        signalWidget.value = {
          ...signalWidget.value,
          lastDimensions: {
            isFullWidth: currentDims.isFullWidth,
            isFullHeight: currentDims.isFullHeight,
            width: currentDims.width,
            height: currentDims.height,
            position: currentDims.position,
          },
        };
      }
      newWidth = refInitialMinimizedWidth.current;
      newHeight = refInitialMinimizedHeight.current;
    }
    const newPosition = calculatePosition(corner, newWidth, newHeight);
    if (newWidth < MIN_SIZE.width || newHeight < MIN_SIZE.height * 5) {
      shouldSave = false;
    }
    const container = refContainer.current;
    const containerStyle = container.style;
    const onTransitionEnd = () => {
      containerStyle.transition = 'none';
      updateDimensions();
      container.removeEventListener('transitionend', onTransitionEnd);
    };
    container.addEventListener('transitionend', onTransitionEnd);
    containerStyle.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    requestAnimationFrame(() => {
      containerStyle.width = `${newWidth}px`;
      containerStyle.height = `${newHeight}px`;
      containerStyle.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`;
    });
    const newDimensions = {
      isFullWidth: newWidth >= window.innerWidth - SAFE_AREA * 2,
      isFullHeight: newHeight >= window.innerHeight - SAFE_AREA * 2,
      width: newWidth,
      height: newHeight,
      position: newPosition,
    };
    signalWidget.value = {
      corner,
      dimensions: newDimensions,
      lastDimensions: isInspectFocused
        ? signalWidget.value.lastDimensions
        : newWidth > refInitialMinimizedWidth.current
          ? newDimensions
          : signalWidget.value.lastDimensions,
    };
    if (shouldSave) {
      saveLocalStorage(LOCALSTORAGE_KEY, {
        corner: signalWidget.value.corner,
        dimensions: signalWidget.value.dimensions,
        lastDimensions: signalWidget.value.lastDimensions,
      });
    }
    updateDimensions();
  }, []);
  const handleMouseDown = (0, import_hooks5.useCallback)((e) => {
    e.preventDefault();
    if (!refContainer.current || e.target.closest('button')) return;
    const container = refContainer.current;
    const containerStyle = container.style;
    const { dimensions } = signalWidget.value;
    const initialMouseX = e.clientX;
    const initialMouseY = e.clientY;
    const initialX = dimensions.position.x;
    const initialY = dimensions.position.y;
    let currentX = initialX;
    let currentY = initialY;
    let rafId = null;
    let hasMoved = false;
    let lastMouseX = initialMouseX;
    let lastMouseY = initialMouseY;
    const handleMouseMove = (e2) => {
      if (rafId) return;
      hasMoved = true;
      lastMouseX = e2.clientX;
      lastMouseY = e2.clientY;
      rafId = requestAnimationFrame(() => {
        const deltaX = lastMouseX - initialMouseX;
        const deltaY = lastMouseY - initialMouseY;
        currentX = Number(initialX) + deltaX;
        currentY = Number(initialY) + deltaY;
        containerStyle.transition = 'none';
        containerStyle.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        rafId = null;
      });
    };
    const handleMouseUp = () => {
      if (!container) return;
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (!hasMoved) return;
      const newCorner = getBestCorner(
        lastMouseX,
        lastMouseY,
        initialMouseX,
        initialMouseY,
        Store.inspectState.value.kind === 'focused' ? 80 : 40,
      );
      if (newCorner === signalWidget.value.corner) {
        containerStyle.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        const currentPosition = signalWidget.value.dimensions.position;
        requestAnimationFrame(() => {
          containerStyle.transform = `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`;
        });
        return;
      }
      const snappedPosition = calculatePosition(newCorner, dimensions.width, dimensions.height);
      if (currentX === initialX && currentY === initialY) return;
      const onTransitionEnd = () => {
        containerStyle.transition = 'none';
        updateDimensions();
        container.removeEventListener('transitionend', onTransitionEnd);
      };
      container.addEventListener('transitionend', onTransitionEnd);
      containerStyle.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      requestAnimationFrame(() => {
        containerStyle.transform = `translate3d(${snappedPosition.x}px, ${snappedPosition.y}px, 0)`;
      });
      signalWidget.value = {
        corner: newCorner,
        dimensions: {
          isFullWidth: dimensions.isFullWidth,
          isFullHeight: dimensions.isFullHeight,
          width: dimensions.width,
          height: dimensions.height,
          position: snappedPosition,
        },
        lastDimensions: signalWidget.value.lastDimensions,
      };
      saveLocalStorage(LOCALSTORAGE_KEY, {
        corner: newCorner,
        dimensions: signalWidget.value.dimensions,
        lastDimensions: signalWidget.value.lastDimensions,
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);
  (0, import_hooks5.useEffect)(() => {
    if (!refContainer.current || !refFooter.current) return;
    refContainer.current.style.width = 'min-content';
    refInitialMinimizedHeight.current = refFooter.current.offsetHeight;
    refInitialMinimizedWidth.current = refContainer.current.offsetWidth;
    refContainer.current.style.maxWidth = `calc(100vw - ${SAFE_AREA * 2}px)`;
    refContainer.current.style.maxHeight = `calc(100vh - ${SAFE_AREA * 2}px)`;
    if (Store.inspectState.value.kind !== 'focused') {
      signalWidget.value = {
        ...signalWidget.value,
        dimensions: {
          isFullWidth: false,
          isFullHeight: false,
          width: refInitialMinimizedWidth.current,
          height: refInitialMinimizedHeight.current,
          position: signalWidget.value.dimensions.position,
        },
      };
    }
    signalRefContainer.value = refContainer.current;
    const unsubscribeSignalWidget = signalWidget.subscribe((widget) => {
      if (!refContainer.current) return;
      const { x, y } = widget.dimensions.position;
      const { width, height } = widget.dimensions;
      const container = refContainer.current;
      requestAnimationFrame(() => {
        container.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
      });
    });
    const unsubscribeStoreInspectState = Store.inspectState.subscribe((state) => {
      if (!refContent.current || !refPropContainer.current) return;
      refShouldExpand.current = state.kind === 'focused';
      if (state.kind === 'focused') {
        const { parentCompositeFiber } = getCompositeComponentFromElement(state.focusedDomElement);
        if (!parentCompositeFiber) {
          setTimeout(() => {
            Store.inspectState.value = {
              kind: 'inspect-off',
              propContainer: refPropContainer.current,
            };
          }, 16);
          return;
        }
      } else {
        toggleMultipleClasses(refContent.current, ['opacity-0', 'duration-0', 'delay-0']);
      }
      updateWidgetPosition();
    });
    let resizeTimeout;
    const handleWindowResize = debounce(() => {
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
      resizeTimeout = requestAnimationFrame(() => {
        const container = refContainer.current;
        if (!container) return;
        updateWidgetPosition(true);
      });
    }, 32);
    window.addEventListener('resize', handleWindowResize);
    updateWidgetPosition(false);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      unsubscribeStoreInspectState();
      unsubscribeSignalWidget();
      saveLocalStorage(LOCALSTORAGE_KEY, {
        ...defaultWidgetConfig,
        corner: signalWidget.value.corner,
      });
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)('div', {
    id: 'react-scan-toolbar',
    ref: refContainer,
    onMouseDown: handleMouseDown,
    className: cn(
      'fixed inset-0 rounded-lg shadow-lg',
      'flex flex-col',
      'bg-black',
      'font-mono text-[13px]',
      'user-select-none',
      'opacity-0',
      'cursor-move',
      'z-[124124124124]',
      'animate-fade-in animation-duration-300 animation-delay-300',
      'will-change-transform',
    ),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)('div', {
        ref: refContent,
        className: cn(
          'relative',
          'flex-1',
          'flex flex-col',
          'rounded-t-lg',
          'overflow-hidden',
          'opacity-100',
          'transition-opacity duration-150',
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Header, {}),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)('div', {
            ref: refPropContainer,
            className: cn(
              'react-scan-prop',
              'flex-1',
              'text-white',
              'transition-opacity duration-150 delay-150',
              'overflow-y-auto overflow-x-hidden',
            ),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)('div', {
        ref: refFooter,
        className: cn(
          'h-9',
          'flex items-center justify-between',
          'transition-colors duration-200',
          'overflow-hidden',
          'rounded-lg',
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(toolbar_default, { refPropContainer }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResizeHandle, { position: 'top' }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResizeHandle, { position: 'bottom' }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResizeHandle, { position: 'left' }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResizeHandle, { position: 'right' }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResizeHandle, { position: 'top-left' }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResizeHandle, { position: 'top-right' }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResizeHandle, { position: 'bottom-left' }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ResizeHandle, { position: 'bottom-right' }),
    ],
  });
};

// src/core/web/toolbar.tsx
var import_jsx_runtime7 = require('preact/jsx-runtime');
var createToolbar = (root) => {
  const container = document.createElement('div');
  root.appendChild(container);
  (0, import_preact.render)(/* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Widget, {}), container);
  const originalRemove = container.remove.bind(container);
  container.remove = function () {
    if (container.hasChildNodes()) {
      (0, import_preact.render)(null, container);
      (0, import_preact.render)(null, container);
    }
    originalRemove();
  };
  return container;
};

// src/core/index.ts
var toolbarContainer = null;
var shadowRoot = null;
var Store = {
  wasDetailsOpen: (0, import_signals3.signal)(true),
  isInIframe: (0, import_signals3.signal)(typeof window !== 'undefined' && window.self !== window.top),
  inspectState: (0, import_signals3.signal)({
    kind: 'uninitialized',
  }),
  monitor: (0, import_signals3.signal)(null),
  fiberRoots: /* @__PURE__ */ new WeakSet(),
  reportData: /* @__PURE__ */ new WeakMap(),
  legacyReportData: /* @__PURE__ */ new Map(),
  lastReportTime: (0, import_signals3.signal)(0),
};
var ReactScanInternals = {
  instrumentation: null,
  componentAllowList: null,
  options: (0, import_signals3.signal)({
    enabled: true,
    includeChildren: true,
    playSound: false,
    log: false,
    showToolbar: true,
    renderCountThreshold: 0,
    report: void 0,
    alwaysShowLabels: false,
    animationSpeed: 'fast',
    dangerouslyForceRunInProduction: false,
    smoothlyAnimateOutlines: true,
    trackUnnecessaryRenders: false,
  }),
  onRender: null,
  scheduledOutlines: /* @__PURE__ */ new Map(),
  activeOutlines: /* @__PURE__ */ new Map(),
  Store,
};
var validateOptions = (options) => {
  const errors = [];
  const validOptions = {};
  for (const key in options) {
    const value = options[key];
    switch (key) {
      case 'enabled':
      case 'includeChildren':
      case 'playSound':
      case 'log':
      case 'showToolbar':
      case 'report':
      case 'alwaysShowLabels':
      case 'dangerouslyForceRunInProduction':
        if (typeof value !== 'boolean') {
          errors.push(`- ${key} must be a boolean. Got "${value}"`);
        } else {
          validOptions[key] = value;
        }
        break;
      case 'renderCountThreshold':
      case 'resetCountTimeout':
        if (typeof value !== 'number' || value < 0) {
          errors.push(`- ${key} must be a non-negative number. Got "${value}"`);
        } else {
          validOptions[key] = value;
        }
        break;
      case 'animationSpeed':
        if (!['slow', 'fast', 'off'].includes(value)) {
          errors.push(`- Invalid animation speed "${value}". Using default "fast"`);
        } else {
          validOptions[key] = value;
        }
        break;
      case 'onCommitStart':
      case 'onCommitFinish':
      case 'onRender':
      case 'onPaintStart':
      case 'onPaintFinish':
        if (typeof value !== 'function') {
          errors.push(`- ${key} must be a function. Got "${value}"`);
        } else {
          validOptions[key] = value;
        }
        break;
      case 'trackUnnecessaryRenders': {
        validOptions.trackUnnecessaryRenders = typeof value === 'boolean' ? value : false;
        break;
      }
      case 'smoothlyAnimateOutlines': {
        validOptions.smoothlyAnimateOutlines = typeof value === 'boolean' ? value : false;
        break;
      }
      default:
        errors.push(`- Unknown option "${key}"`);
    }
  }
  if (errors.length > 0) {
    console.warn(`[React Scan] Invalid options:
${errors.join('\n')}`);
  }
  return validOptions;
};
var setOptions = (userOptions) => {
  const validOptions = validateOptions(userOptions);
  if (Object.keys(validOptions).length === 0) {
    return;
  }
  if ('playSound' in validOptions && validOptions.playSound) {
    validOptions.enabled = true;
  }
  const newOptions = {
    ...ReactScanInternals.options.value,
    ...validOptions,
  };
  const { instrumentation } = ReactScanInternals;
  if (instrumentation && 'enabled' in validOptions) {
    instrumentation.isPaused.value = validOptions.enabled === false;
  }
  ReactScanInternals.options.value = newOptions;
  saveLocalStorage('react-scan-options', newOptions);
  if ('showToolbar' in validOptions) {
    if (toolbarContainer && !newOptions.showToolbar) {
      toolbarContainer.remove();
    }
    if (newOptions.showToolbar && toolbarContainer && shadowRoot) {
      toolbarContainer = createToolbar(shadowRoot);
    }
  }
};
var isProduction = null;
var rdtHook;
var getIsProduction = () => {
  if (isProduction !== null) {
    return isProduction;
  }
  rdtHook ??= (0, import_bippy8.getRDTHook)();
  for (const renderer of rdtHook.renderers.values()) {
    const buildType = (0, import_bippy8.detectReactBuildType)(renderer);
    if (buildType === 'production') {
      isProduction = true;
    }
  }
  return isProduction;
};

// src/core/monitor/performance.ts
var import_bippy9 = require('bippy');
var DEFAULT_FILTERS = {
  skipProviders: true,
  skipHocs: true,
  skipContainers: true,
  skipMinified: true,
  skipUtilities: true,
  skipBoundaries: true,
};
var FILTER_PATTERNS = {
  providers: [/Provider$/, /^Provider$/, /^Context$/],
  hocs: [/^with[A-Z]/, /^forward(?:Ref)?$/i, /^Forward(?:Ref)?\(/],
  containers: [/^(?:App)?Container$/, /^Root$/, /^ReactDev/],
  utilities: [
    /^Fragment$/,
    /^Suspense$/,
    /^ErrorBoundary$/,
    /^Portal$/,
    /^Consumer$/,
    /^Layout$/,
    /^Router/,
    /^Hydration/,
  ],
  boundaries: [/^Boundary$/, /Boundary$/, /^Provider$/, /Provider$/],
};
var shouldIncludeInPath = (name, filters = DEFAULT_FILTERS) => {
  const patternsToCheck = [];
  if (filters.skipProviders) patternsToCheck.push(...FILTER_PATTERNS.providers);
  if (filters.skipHocs) patternsToCheck.push(...FILTER_PATTERNS.hocs);
  if (filters.skipContainers) patternsToCheck.push(...FILTER_PATTERNS.containers);
  if (filters.skipUtilities) patternsToCheck.push(...FILTER_PATTERNS.utilities);
  if (filters.skipBoundaries) patternsToCheck.push(...FILTER_PATTERNS.boundaries);
  return !patternsToCheck.some((pattern) => pattern.test(name));
};
var minifiedPatterns = [
  /^[a-z]$/,
  // Single lowercase letter
  /^[a-z][0-9]$/,
  // Lowercase letter followed by number
  /^_+$/,
  // Just underscores
  /^[A-Za-z][_$]$/,
  // Letter followed by underscore or dollar
  /^[a-z]{1,2}$/,
  // 1-2 lowercase letters
];
var isMinified = (name) => {
  if (!name || typeof name !== 'string') {
    return true;
  }
  for (let i = 0; i < minifiedPatterns.length; i++) {
    if (minifiedPatterns[i].test(name)) return true;
  }
  const hasNoVowels = !/[aeiou]/i.test(name);
  const hasMostlyNumbers = (name.match(/\d/g)?.length ?? 0) > name.length / 2;
  const isSingleWordLowerCase = /^[a-z]+$/.test(name);
  const hasRandomLookingChars = /[$_]{2,}/.test(name);
  return (
    Number(hasNoVowels) + Number(hasMostlyNumbers) + Number(isSingleWordLowerCase) + Number(hasRandomLookingChars) >= 2
  );
};
var getInteractionPath = (fiber, filters = DEFAULT_FILTERS) => {
  if (!fiber) return [];
  const currentName = (0, import_bippy9.getDisplayName)(fiber.type);
  if (!currentName) return [];
  const stack = new Array();
  while (fiber.return) {
    const name = getCleanComponentName(fiber.type);
    if (name && !isMinified(name) && shouldIncludeInPath(name, filters)) {
      stack.push(name);
    }
    fiber = fiber.return;
  }
  const fullPath = new Array(stack.length);
  for (let i = 0; i < stack.length; i++) {
    fullPath[i] = stack[stack.length - i - 1];
  }
  return fullPath;
};
var currentMouseOver;
var getCleanComponentName = (component) => {
  const name = (0, import_bippy9.getDisplayName)(component);
  if (!name) return '';
  return name.replace(/^(?:Memo|Forward(?:Ref)?|With.*?)\((?<inner>.*?)\)$/, '$<inner>');
};
var handleMouseover = (event) => {
  if (!(event.target instanceof Element)) return;
  currentMouseOver = event.target;
};
var getFirstNamedAncestorCompositeFiber = (element) => {
  let curr = element;
  let parentCompositeFiber = null;
  while (!parentCompositeFiber && curr.parentElement) {
    curr = curr.parentElement;
    const { parentCompositeFiber: fiber } = getCompositeComponentFromElement(curr);
    if (!fiber) {
      continue;
    }
    if ((0, import_bippy9.getDisplayName)(fiber?.type)) {
      parentCompositeFiber = fiber;
    }
  }
  return parentCompositeFiber;
};
var unsubscribeTrackVisibilityChange;
var lastVisibilityHiddenAt = 'never-hidden';
var trackVisibilityChange = () => {
  unsubscribeTrackVisibilityChange?.();
  const onVisibilityChange = () => {
    if (document.hidden) {
      lastVisibilityHiddenAt = Date.now();
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);
  unsubscribeTrackVisibilityChange = () => {
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
};
function initPerformanceMonitoring(options) {
  const filters = { ...DEFAULT_FILTERS, ...options };
  const monitor = Store.monitor.value;
  if (!monitor) return;
  document.addEventListener('mouseover', handleMouseover);
  const disconnectPerformanceListener = setupPerformanceListener((entry) => {
    const target = entry.target ?? (entry.type === 'pointer' ? currentMouseOver : null);
    if (!target) {
      return;
    }
    const parentCompositeFiber = getFirstNamedAncestorCompositeFiber(target);
    if (!parentCompositeFiber) {
      return;
    }
    const displayName = (0, import_bippy9.getDisplayName)(parentCompositeFiber.type);
    if (!displayName || isMinified(displayName)) {
      return;
    }
    const path = getInteractionPath(parentCompositeFiber, filters);
    monitor.interactions.push({
      componentName: displayName,
      componentPath: path,
      performanceEntry: entry,
      components: /* @__PURE__ */ new Map(),
      url: window.location.toString(),
      route: Store.monitor.value?.route ?? new URL(window.location.href).pathname,
      commit: Store.monitor.value?.commit ?? null,
      branch: Store.monitor.value?.branch ?? null,
      uniqueInteractionId: entry.id,
    });
  });
  return () => {
    disconnectPerformanceListener();
    document.removeEventListener('mouseover', handleMouseover);
  };
}
var getInteractionType = (eventName) => {
  if (['pointerdown', 'pointerup', 'click'].includes(eventName)) {
    return 'pointer';
  }
  if (['keydown', 'keyup'].includes(eventName)) {
    return 'keyboard';
  }
  return null;
};
var setupPerformanceListener = (onEntry) => {
  trackVisibilityChange();
  const longestInteractionMap = /* @__PURE__ */ new Map();
  const interactionTargetMap = /* @__PURE__ */ new Map();
  const processInteractionEntry = (entry) => {
    if (!(entry.interactionId || entry.entryType === 'first-input')) return;
    if (entry.interactionId && entry.target && !interactionTargetMap.has(entry.interactionId)) {
      interactionTargetMap.set(entry.interactionId, entry.target);
    }
    const existingInteraction = longestInteractionMap.get(entry.interactionId);
    if (existingInteraction) {
      if (entry.duration > existingInteraction.latency) {
        existingInteraction.entries = [entry];
        existingInteraction.latency = entry.duration;
      } else if (
        entry.duration === existingInteraction.latency &&
        entry.startTime === existingInteraction.entries[0].startTime
      ) {
        existingInteraction.entries.push(entry);
      }
    } else {
      const interactionType = getInteractionType(entry.name);
      if (!interactionType) return;
      const interaction = {
        id: entry.interactionId,
        latency: entry.duration,
        entries: [entry],
        target: entry.target,
        type: interactionType,
        startTime: entry.startTime,
        processingStart: entry.processingStart,
        processingEnd: entry.processingEnd,
        duration: entry.duration,
        inputDelay: entry.processingStart - entry.startTime,
        processingDuration: entry.processingEnd - entry.processingStart,
        presentationDelay: entry.duration - (entry.processingEnd - entry.startTime),
        timestamp: Date.now(),
        timeSinceTabInactive:
          lastVisibilityHiddenAt === 'never-hidden' ? 'never-hidden' : Date.now() - lastVisibilityHiddenAt,
        visibilityState: document.visibilityState,
        timeOrigin: performance.timeOrigin,
        referrer: document.referrer,
      };
      longestInteractionMap.set(interaction.id, interaction);
      onEntry(interaction);
    }
  };
  const po = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    for (let i = 0, len = entries.length; i < len; i++) {
      const entry = entries[i];
      processInteractionEntry(entry);
    }
  });
  try {
    po.observe({
      type: 'event',
      buffered: true,
      durationThreshold: 16,
    });
    po.observe({
      type: 'first-input',
      buffered: true,
    });
  } catch {}
  return () => po.disconnect();
};

// src/core/monitor/constants.ts
var React = __toESM(require('react'));
var isRSC = !React.useRef;
var isSSR = typeof window === 'undefined' || isRSC;
var isTest =
  (typeof window !== 'undefined' /**
   * @see https://docs.cypress.io/faq/questions/using-cypress-faq#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress
   */ &&
    (window.Cypress /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/webdriver
     */ ||
      navigator.webdriver)) /**
   * @see https://stackoverflow.com/a/60491322
   */ ||
  // @ts-expect-error jest is a global in test
  typeof jest !== 'undefined';
var GZIP_MIN_LEN = 1e3;
var GZIP_MAX_LEN = 6e4;
var MAX_PENDING_REQUESTS = 15;
var FLOAT_MAX_LEN = 1e3;

// src/core/monitor/utils.ts
var getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 2 /* MOBILE */;
  } else if (/iPad|Tablet/i.test(userAgent)) {
    return 1 /* TABLET */;
  }
  return 0 /* DESKTOP */;
};
var generateId = () => {
  const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
  let id = '';
  const randomValues = crypto.getRandomValues(new Uint8Array(21));
  for (let i = 0; i < 21; i++) {
    id += alphabet[63 & randomValues[i]];
  }
  return id;
};
var getGpuRenderer = () => {
  if (!('chrome' in window)) return '';
  const gl = document.createElement('canvas').getContext('webgl', { powerPreference: 'high-performance' });
  if (!gl) return '';
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '';
};
var cachedSession;
var getSession = async ({ commit = null, branch = null }) => {
  if (isSSR) return null;
  if (cachedSession) {
    return cachedSession;
  }
  const id = generateId();
  const url = window.location.toString();
  const connection = navigator.connection;
  const wifi = (connection && connection.effectiveType) || null;
  const cpu = navigator.hardwareConcurrency;
  const mem = navigator.deviceMemory;
  const gpuRendererPromise = new Promise((resolve) => {
    onIdle(() => {
      resolve(getGpuRenderer());
    });
  });
  const session = {
    id,
    url,
    route: null,
    device: getDeviceType(),
    wifi,
    cpu,
    mem,
    gpu: await gpuRendererPromise,
    agent: navigator.userAgent,
    commit,
    branch,
    version: '0.0.52',
  };
  cachedSession = session;
  return session;
};

// src/core/monitor/network.ts
var INTERACTION_TIME_TILL_COMPLETED = 4e3;
var flush = async () => {
  const monitor = Store.monitor.value;
  if (!monitor || !navigator.onLine || !monitor.url || !monitor.interactions.length) {
    return;
  }
  const now = performance.now();
  const pendingInteractions = new Array();
  const completedInteractions = new Array();
  const interactions = monitor.interactions;
  for (let i = 0; i < interactions.length; i++) {
    const interaction = interactions[i];
    if (now - interaction.performanceEntry.startTime <= INTERACTION_TIME_TILL_COMPLETED) {
      pendingInteractions.push(interaction);
    } else {
      completedInteractions.push(interaction);
    }
  }
  if (!completedInteractions.length) return;
  const session = await getSession({
    commit: monitor.commit,
    branch: monitor.branch,
  }).catch(() => null);
  if (!session) return;
  const aggregatedComponents = new Array();
  const aggregatedInteractions = new Array();
  for (let i = 0; i < completedInteractions.length; i++) {
    const interaction = completedInteractions[i];
    const {
      duration,
      entries,
      id,
      inputDelay,
      latency,
      presentationDelay,
      processingDuration,
      processingEnd,
      processingStart,
      referrer,
      startTime,
      target,
      timeOrigin,
      timeSinceTabInactive,
      timestamp,
      type,
      visibilityState,
    } = interaction.performanceEntry;
    aggregatedInteractions.push({
      id: i,
      path: interaction.componentPath,
      name: interaction.componentName,
      time: duration,
      timestamp,
      type,
      // fixme: we can aggregate around url|route|commit|branch better to compress payload
      url: interaction.url,
      route: interaction.route,
      commit: interaction.commit,
      branch: interaction.branch,
      uniqueInteractionId: interaction.uniqueInteractionId,
      meta: {
        performanceEntry: {
          id,
          inputDelay,
          latency,
          presentationDelay,
          processingDuration,
          processingEnd,
          processingStart,
          referrer,
          startTime,
          target,
          timeOrigin,
          timeSinceTabInactive,
          visibilityState,
          duration,
          entries: entries.map((entry) => {
            const {
              duration: duration2,
              entryType,
              interactionId,
              name,
              processingEnd: processingEnd2,
              processingStart: processingStart2,
              startTime: startTime2,
            } = entry;
            return {
              duration: duration2,
              entryType,
              interactionId,
              name,
              processingEnd: processingEnd2,
              processingStart: processingStart2,
              startTime: startTime2,
            };
          }),
        },
      },
    });
    const components = Array.from(interaction.components.entries());
    for (let j = 0; j < components.length; j++) {
      const [name, component] = components[j];
      aggregatedComponents.push({
        name,
        instances: component.fibers.size,
        interactionId: i,
        renders: component.renders,
        totalTime: component.totalTime,
      });
    }
  }
  const payload = {
    interactions: aggregatedInteractions,
    components: aggregatedComponents,
    session: {
      ...session,
      url: window.location.toString(),
      route: monitor.route,
      // this might be inaccurate but used to caculate which paths all the unique sessions are coming from without having to join on the interactions table (expensive)
    },
  };
  monitor.pendingRequests++;
  monitor.interactions = pendingInteractions;
  try {
    transport(monitor.url, payload)
      .then(() => {
        monitor.pendingRequests--;
      })
      .catch(async () => {
        monitor.interactions = monitor.interactions.concat(completedInteractions);
      });
  } catch {}
  monitor.interactions = pendingInteractions;
};
var CONTENT_TYPE = 'application/json';
var supportsCompression = typeof CompressionStream === 'function';
var compress = async (payload) => {
  const stream = new Blob([payload], { type: CONTENT_TYPE }).stream().pipeThrough(new CompressionStream('gzip'));
  return new Response(stream).arrayBuffer();
};
var transport = async (url, payload) => {
  const fail = { ok: false };
  const json = JSON.stringify(payload, (key, value) => {
    if (typeof value === 'number' && parseInt(value) !== value) {
      value = ~~(value * FLOAT_MAX_LEN) / FLOAT_MAX_LEN;
    }
    if (
      // eslint-disable-next-line eqeqeq
      (value != null && value !== false) ||
      (Array.isArray(value) && value.length)
    ) {
      return value;
    }
  });
  const shouldCompress = json.length > GZIP_MIN_LEN;
  const body = shouldCompress && supportsCompression ? await compress(json) : json;
  if (!navigator.onLine) return fail;
  const headers = {
    'Content-Type': CONTENT_TYPE,
    'Content-Encoding': shouldCompress ? 'gzip' : void 0,
    'x-api-key': Store.monitor.value?.apiKey,
  };
  if (shouldCompress) url += '?z=1';
  const size = typeof body === 'string' ? body.length : body.byteLength;
  return fetch(url, {
    body,
    method: 'POST',
    referrerPolicy: 'origin',
    /**
     * Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
     * fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
     * The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
     * frequently sending events right before the user is switching pages (e.g., when finishing navigation transactions).
     *
     * This is the modern alternative to the navigator.sendBeacon API.
     * @see https://javascript.info/fetch-api#keepalive
     *
     * Gotchas:
     * - `keepalive` isn't supported by Firefox
     * - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch):
     *   If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error.
     *   We will therefore only activate the flag when we're below that limit.
     * - There is also a limit of requests that can be open at the same time, so we also limit this to 15.
     *
     * @see https://github.com/getsentry/sentry-javascript/pull/7553
     */
    keepalive: GZIP_MAX_LEN > size && MAX_PENDING_REQUESTS > (Store.monitor.value?.pendingRequests ?? 0),
    priority: 'low',
    // mode: 'no-cors',
    headers,
  });
};

// src/core/monitor/params/utils.ts
function computeRouteWithFormatter(pathname, pathParams, formatter) {
  if (!pathname || !pathParams) {
    return pathname;
  }
  let result = pathname;
  try {
    const entries = Object.entries(pathParams);
    for (const [key, value] of entries) {
      if (!Array.isArray(value)) {
        const matcher = turnValueToRegExp(value);
        if (matcher.test(result)) {
          result = result.replace(matcher, formatter.param(key));
        }
      }
    }
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        const matcher = turnValueToRegExp(value.join('/'));
        if (matcher.test(result)) {
          result = result.replace(matcher, formatter.catchAll(key));
        }
      }
    }
    return result;
  } catch (e) {
    return pathname;
  }
}
function computeRoute(pathname, pathParams) {
  return computeRouteWithFormatter(pathname, pathParams, {
    param: (key) => `/[${key}]`,
    catchAll: (key) => `/[...${key}]`,
  });
}
function turnValueToRegExp(value) {
  return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// src/core/monitor/index.ts
var MAX_RETRIES_BEFORE_COMPONENT_GC = 7;
var Monitoring = ({
  url,
  apiKey,
  params,
  path = null,
  // path passed down would be reactive
  route = null,
  commit = null,
  branch = null,
}) => {
  if (!apiKey) throw new Error('Please provide a valid API key for React Scan monitoring');
  url ??= 'https://monitoring.react-scan.com/api/v1/ingest';
  Store.monitor.value ??= {
    pendingRequests: 0,
    interactions: [],
    session: getSession({ commit, branch }).catch(() => null),
    url,
    apiKey,
    route,
    commit,
    branch,
  };
  if (!route && path && params) {
    Store.monitor.value.route = computeRoute(path, params);
  } else if (typeof window !== 'undefined') {
    Store.monitor.value.route = route ?? path ?? new URL(window.location.toString()).pathname;
  }
  (0, import_react.useEffect)(() => {
    scanMonitoring({ enabled: true });
    return initPerformanceMonitoring();
  }, []);
  return null;
};
var scanMonitoring = (options) => {
  setOptions(options);
  startMonitoring();
};
var flushInterval;
var startMonitoring = () => {
  if (!Store.monitor.value) {
    if (false) {
      throw new Error('Invariant: startMonitoring can never be called when monitoring is not initialized');
    }
  }
  if (flushInterval) {
    clearInterval(flushInterval);
  }
  flushInterval = setInterval(() => {
    try {
      void flush();
    } catch {}
  }, 2e3);
  globalThis.__REACT_SCAN__ = {
    ReactScanInternals,
  };
  const instrumentation = createInstrumentation('monitoring', {
    onCommitStart() {
      ReactScanInternals.options.value.onCommitStart?.();
    },
    onError() {},
    isValidFiber() {
      return true;
    },
    onRender(fiber, renders) {
      updateFiberRenderData(fiber, renders);
      if ((0, import_bippy10.isCompositeFiber)(fiber)) {
        aggregateComponentRenderToInteraction(fiber, renders);
      }
      ReactScanInternals.options.value.onRender?.(fiber, renders);
    },
    onCommitFinish() {
      ReactScanInternals.options.value.onCommitFinish?.();
    },
    trackChanges: false,
    forceAlwaysTrackRenders: true,
  });
  ReactScanInternals.instrumentation = instrumentation;
};
var aggregateComponentRenderToInteraction = (fiber, renders) => {
  const monitor = Store.monitor.value;
  if (!monitor || !monitor.interactions || monitor.interactions.length === 0) return;
  const lastInteraction = monitor.interactions.at(-1);
  if (!lastInteraction) return;
  const displayName = (0, import_bippy10.getDisplayName)(fiber.type);
  if (!displayName) return;
  let component = lastInteraction.components.get(displayName);
  if (!component) {
    component = {
      fibers: /* @__PURE__ */ new Set(),
      name: displayName,
      renders: 0,
      retiresAllowed: MAX_RETRIES_BEFORE_COMPONENT_GC,
      uniqueInteractionId: lastInteraction.uniqueInteractionId,
    };
    lastInteraction.components.set(displayName, component);
  }
  if (fiber.alternate && !component.fibers.has(fiber.alternate)) {
    component.fibers.add(fiber.alternate);
  }
  const rendersCount = renders.length;
  component.renders += rendersCount;
  if (fiber.actualDuration) {
    const { selfTime, totalTime } = (0, import_bippy10.getTimings)(fiber);
    if (!component.totalTime) component.totalTime = 0;
    if (!component.selfTime) component.selfTime = 0;
    component.totalTime += totalTime;
    component.selfTime += selfTime;
  }
};

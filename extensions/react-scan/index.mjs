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

// src/index.ts
import 'bippy';

// src/core/index.ts
import { signal as signal3 } from '@preact/signals';
import {
  getDisplayName as getDisplayName4,
  getRDTHook,
  getNearestHostFiber,
  getTimings as getTimings2,
  getType as getType3,
  isCompositeFiber as isCompositeFiber2,
  isInstrumentationActive,
  traverseFiber as traverseFiber2,
  detectReactBuildType,
} from 'bippy';

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
import { getType } from 'bippy';
var aggregateChanges = (changes, prevAggregatedChange) => {
  const newChange = {
    type: prevAggregatedChange?.type ?? /* @__PURE__ */ new Set(),
    unstable: prevAggregatedChange?.unstable ?? false,
  };
  for (const change of changes) {
    newChange.type.add(change.type);
    newChange.unstable = newChange.unstable || change.unstable;
  }
  return newChange;
};
var joinAggregations = ({ from, to }) => {
  to.changes.type = to.changes.type.union(from.changes.type);
  to.changes.unstable = to.changes.unstable || from.changes.unstable;
  to.aggregatedCount += 1;
  to.didCommit = to.didCommit || from.didCommit;
  to.forget = to.forget || from.forget;
  to.fps = to.fps + from.fps;
  to.phase = to.phase.union(from.phase);
  to.time = (to.time ?? 0) + (from.time ?? 0);
  to.unnecessary = to.unnecessary || from.unnecessary;
};
var aggregateRender = (newRender, prevAggregated) => {
  prevAggregated.changes = aggregateChanges(newRender.changes, prevAggregated.changes);
  prevAggregated.aggregatedCount += 1;
  prevAggregated.didCommit = prevAggregated.didCommit || newRender.didCommit;
  prevAggregated.forget = prevAggregated.forget || newRender.forget;
  prevAggregated.fps = prevAggregated.fps + newRender.fps;
  prevAggregated.phase.add(newRender.phase);
  prevAggregated.time = (prevAggregated.time ?? 0) + (newRender.time ?? 0);
  prevAggregated.unnecessary = prevAggregated.unnecessary || newRender.unnecessary;
};
var getLabelText = (groupedAggregatedRenders) => {
  let labelText = '';
  const componentsByCount = /* @__PURE__ */ new Map();
  for (const aggregatedRender of groupedAggregatedRenders) {
    const { forget, time, aggregatedCount, name } = aggregatedRender;
    if (!componentsByCount.has(aggregatedCount)) {
      componentsByCount.set(aggregatedCount, []);
    }
    componentsByCount.get(aggregatedCount).push({ name, forget, time: time ?? 0 });
  }
  const sortedCounts = Array.from(componentsByCount.keys()).sort((a, b) => b - a);
  const parts = [];
  let cumulativeTime = 0;
  for (const count of sortedCounts) {
    const componentGroup = componentsByCount.get(count);
    const names = componentGroup
      .slice(0, 4)
      .map(({ name }) => name)
      .join(', ');
    let text = names;
    const totalTime = componentGroup.reduce((sum, { time }) => sum + time, 0);
    const hasForget = componentGroup.some(({ forget }) => forget);
    cumulativeTime += totalTime;
    if (componentGroup.length > 4) {
      text += '...';
    }
    if (count > 1) {
      text += ` \xD7${count}`;
    }
    if (hasForget) {
      text = `\u2728${text}`;
    }
    parts.push(text);
  }
  labelText = parts.join(', ');
  if (!labelText.length) return null;
  if (labelText.length > 40) {
    labelText = `${labelText.slice(0, 40)}\u2026`;
  }
  if (cumulativeTime >= 0.01) {
    labelText += ` (${Number(cumulativeTime.toFixed(2))}ms)`;
  }
  return labelText;
};
var updateFiberRenderData = (fiber, renders) => {
  ReactScanInternals.options.value.onRender?.(fiber, renders);
  const type = getType(fiber.type) || fiber.type;
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
var START_COLOR = { r: 115, g: 97, b: 230 };
var END_COLOR = { r: 185, g: 49, b: 115 };
var MONO_FONT = 'Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace';
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
var flushOutlines = async (ctx) => {
  if (!ReactScanInternals.scheduledOutlines.size && !ReactScanInternals.activeOutlines.size) {
    return;
  }
  const flattenedScheduledOutlines = Array.from(ReactScanInternals.scheduledOutlines.values());
  await activateOutlines();
  recalcOutlines();
  ReactScanInternals.scheduledOutlines = /* @__PURE__ */ new Map();
  const { options } = ReactScanInternals;
  options.value.onPaintStart?.(flattenedScheduledOutlines);
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(() => fadeOutOutline(ctx));
  }
};
var animationFrameId = null;
var shouldSkipInterpolation = (rect) => {
  if (
    rect.top >= window.innerHeight || // completely below viewport
    rect.bottom <= 0 || // completely above viewport
    rect.left >= window.innerWidth || // completely right of viewport
    rect.right <= 0
  ) {
    return true;
  }
  return !ReactScanInternals.options.value.smoothlyAnimateOutlines;
};
var fadeOutOutline = (ctx) => {
  const dpi = window.devicePixelRatio || 1;
  ctx.clearRect(0, 0, ctx.canvas.width / dpi, ctx.canvas.height / dpi);
  const pendingLabeledOutlines = [];
  ctx.save();
  const phases = /* @__PURE__ */ new Set();
  const activeOutlines = ReactScanInternals.activeOutlines;
  for (const [key, activeOutline] of activeOutlines) {
    const invariant_activeOutline = activeOutline;
    let frame;
    for (const aggregatedRender of invariant_activeOutline.groupedAggregatedRender.values()) {
      aggregatedRender.frame += 1;
      frame = frame ? Math.max(aggregatedRender.frame, frame) : aggregatedRender.frame;
    }
    if (!frame) {
      activeOutlines.delete(key);
      continue;
    }
    const THRESHOLD_FPS = 60;
    const avgFps =
      invariant_activeOutline.aggregatedRender.fps / invariant_activeOutline.aggregatedRender.aggregatedCount;
    const averageScore = Math.max(
      (THRESHOLD_FPS - Math.min(avgFps, THRESHOLD_FPS)) / THRESHOLD_FPS,
      invariant_activeOutline.aggregatedRender.time ??
        0 / invariant_activeOutline.aggregatedRender.aggregatedCount / 16,
    );
    const t = Math.min(averageScore, 1);
    const r2 = Math.round(START_COLOR.r + t * (END_COLOR.r - START_COLOR.r));
    const g = Math.round(START_COLOR.g + t * (END_COLOR.g - START_COLOR.g));
    const b = Math.round(START_COLOR.b + t * (END_COLOR.b - START_COLOR.b));
    const color = { r: r2, g, b };
    let reasons = 0;
    phases.clear();
    let didCommit = false;
    let unstable = false;
    let isUnnecessary = false;
    for (const render2 of invariant_activeOutline.groupedAggregatedRender.values()) {
      if (render2.unnecessary) {
        isUnnecessary = true;
      }
      if (render2.changes.unstable) {
        unstable = true;
      }
      if (render2.didCommit) {
        didCommit = true;
      }
    }
    if (didCommit) reasons |= 1 /* Commit */;
    if (unstable) reasons |= 2 /* Unstable */;
    if (isUnnecessary) {
      reasons |= 4 /* Unnecessary */;
      color.r = 128;
      color.g = 128;
      color.b = 128;
    }
    const alphaScalar = 0.8;
    invariant_activeOutline.alpha = alphaScalar * (1 - frame / invariant_activeOutline.totalFrames);
    const alpha = invariant_activeOutline.alpha;
    const fillAlpha = alpha * 0.1;
    const target = invariant_activeOutline.target;
    const shouldSkip = shouldSkipInterpolation(target);
    if (shouldSkip) {
      invariant_activeOutline.current = target;
      invariant_activeOutline.groupedAggregatedRender.forEach((v) => {
        v.computedCurrent = target;
      });
    } else {
      if (!invariant_activeOutline.current) {
        invariant_activeOutline.current = new DOMRect(target.x, target.y, target.width, target.height);
      }
      const INTERPOLATION_SPEED = 0.2;
      const current = invariant_activeOutline.current;
      const lerp = (start2, end) => {
        return start2 + (end - start2) * INTERPOLATION_SPEED;
      };
      const computedCurrent = new DOMRect(
        lerp(current.x, target.x),
        lerp(current.y, target.y),
        lerp(current.width, target.width),
        lerp(current.height, target.height),
      );
      invariant_activeOutline.current = computedCurrent;
      invariant_activeOutline.groupedAggregatedRender.forEach((v) => {
        v.computedCurrent = computedCurrent;
      });
    }
    const rgb = `${color.r},${color.g},${color.b}`;
    ctx.strokeStyle = `rgba(${rgb},${alpha})`;
    ctx.lineWidth = 1;
    ctx.fillStyle = `rgba(${rgb},${fillAlpha})`;
    ctx.beginPath();
    ctx.rect(
      invariant_activeOutline.current.x,
      invariant_activeOutline.current.y,
      invariant_activeOutline.current.width,
      invariant_activeOutline.current.height,
    );
    ctx.stroke();
    ctx.fill();
    const labelText = getLabelText(Array.from(invariant_activeOutline.groupedAggregatedRender.values()));
    if (reasons > 0 && labelText && !(phases.has('mount') && phases.size === 1)) {
      const measured = measureTextCached(labelText, ctx);
      pendingLabeledOutlines.push({
        alpha,
        color,
        reasons,
        labelText,
        textWidth: measured.width,
        activeOutline: invariant_activeOutline,
      });
    }
    const totalFrames = invariant_activeOutline.totalFrames;
    for (const [fiber, aggregatedRender] of invariant_activeOutline.groupedAggregatedRender) {
      if (aggregatedRender.frame >= totalFrames) {
        invariant_activeOutline.groupedAggregatedRender.delete(fiber);
      }
    }
    if (invariant_activeOutline.groupedAggregatedRender.size === 0) {
      activeOutlines.delete(key);
    }
  }
  ctx.restore();
  const mergedLabels = mergeOverlappingLabels(pendingLabeledOutlines);
  ctx.save();
  ctx.font = `11px ${MONO_FONT}`;
  for (let i = 0, len = mergedLabels.length; i < len; i++) {
    const { alpha, color, reasons, groupedAggregatedRender, rect } = mergedLabels[i];
    const text = getLabelText(groupedAggregatedRender) ?? 'N/A';
    const conditionalText = reasons & 4 /* Unnecessary */ ? `${text}\u26A0\uFE0F` : text;
    const textMetrics = ctx.measureText(conditionalText);
    const textWidth = textMetrics.width;
    const textHeight = 11;
    const labelX = rect.x;
    const labelY = rect.y - textHeight - 4;
    ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
    ctx.fillRect(labelX, labelY, textWidth + 4, textHeight + 4);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillText(conditionalText, labelX + 2, labelY + textHeight);
  }
  ctx.restore();
  if (activeOutlines.size) {
    animationFrameId = requestAnimationFrame(() => fadeOutOutline(ctx));
  } else {
    animationFrameId = null;
  }
};
var areFibersEqual = (fiberA, fiberB) => {
  if (fiberA === fiberB) {
    return true;
  }
  if (fiberA.alternate === fiberB) {
    return true;
  }
  if (fiberA === fiberB.alternate) {
    return true;
  }
  if (fiberA.alternate && fiberB.alternate && fiberA.alternate === fiberB.alternate) {
    return true;
  }
  return false;
};
var getIsOffscreen = (rect) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  return rect.bottom < 0 || rect.right < 0 || rect.top > viewportHeight || rect.left > viewportWidth;
};
var activateOutlines = async () => {
  const domNodes = [];
  const scheduledOutlines = ReactScanInternals.scheduledOutlines;
  const activeOutlines = ReactScanInternals.activeOutlines;
  const activeFibers = /* @__PURE__ */ new Map();
  for (const activeOutline of ReactScanInternals.activeOutlines.values()) {
    if (!activeOutline.groupedAggregatedRender) {
      continue;
    }
    for (const [fiber, aggregatedRender] of activeOutline.groupedAggregatedRender) {
      if (fiber.alternate && activeFibers.has(fiber.alternate)) {
        const alternateAggregatedRender = activeFibers.get(fiber.alternate);
        if (alternateAggregatedRender) {
          joinAggregations({
            from: alternateAggregatedRender,
            to: aggregatedRender,
          });
        }
        activeOutline.groupedAggregatedRender?.delete(fiber);
        activeFibers.delete(fiber.alternate);
      }
      activeFibers.set(fiber, aggregatedRender);
    }
  }
  for (const [fiber, outline] of scheduledOutlines) {
    const existingAggregatedRender = activeFibers.get(fiber) || (fiber.alternate && activeFibers.get(fiber.alternate));
    if (existingAggregatedRender) {
      joinAggregations({
        to: existingAggregatedRender,
        from: outline.aggregatedRender,
      });
      existingAggregatedRender.frame = 0;
    }
    domNodes.push(outline.domNode);
  }
  const rects = await batchGetBoundingRects(domNodes);
  const totalFrames = 45;
  const alpha = 0.8;
  for (const [fiber, outline] of scheduledOutlines) {
    const rect = rects.get(outline.domNode);
    if (!rect) {
      continue;
    }
    if (rect.top === rect.bottom || rect.left === rect.right) {
      continue;
    }
    const prevAggregatedRender = activeFibers.get(fiber) || (fiber.alternate && activeFibers.get(fiber.alternate));
    const isOffScreen = getIsOffscreen(rect);
    if (isOffScreen) {
      continue;
    }
    const key = `${rect.x}-${rect.y}`;
    let existingOutline = activeOutlines.get(key);
    if (!existingOutline) {
      existingOutline = outline;
      existingOutline.target = rect;
      existingOutline.totalFrames = totalFrames;
      existingOutline.groupedAggregatedRender = /* @__PURE__ */ new Map([[fiber, outline.aggregatedRender]]);
      existingOutline.aggregatedRender.aggregatedCount = prevAggregatedRender?.aggregatedCount ?? 1;
      existingOutline.alpha = alpha;
      existingOutline.aggregatedRender.computedKey = key;
      if (prevAggregatedRender?.computedKey) {
        const groupOnKey = activeOutlines.get(prevAggregatedRender.computedKey);
        groupOnKey?.groupedAggregatedRender?.forEach((value, prevStoredFiber) => {
          if (areFibersEqual(prevStoredFiber, fiber)) {
            value.frame = 45;
            existingOutline.current = value.computedCurrent;
          }
        });
      }
      activeOutlines.set(key, existingOutline);
    } else {
      if (!prevAggregatedRender) {
        existingOutline.alpha = outline.alpha;
        existingOutline.groupedAggregatedRender?.set(fiber, outline.aggregatedRender);
      } else {
        joinAggregations({
          to: prevAggregatedRender,
          from: outline.aggregatedRender,
        });
      }
    }
    existingOutline.alpha = Math.max(existingOutline.alpha, outline.alpha);
    existingOutline.totalFrames = Math.max(existingOutline.totalFrames, outline.totalFrames);
  }
};
var mergeOverlappingLabels = (labels) => {
  if (labels.length > 1500) {
    return labels.map((label) => toMergedLabel(label));
  }
  const transformed = labels.map((label) => ({
    original: label,
    rect: applyLabelTransform(label.activeOutline.current, label.textWidth),
  }));
  transformed.sort((a, b) => a.rect.x - b.rect.x);
  const mergedLabels = [];
  const mergedSet = /* @__PURE__ */ new Set();
  for (let i = 0; i < transformed.length; i++) {
    if (mergedSet.has(i)) continue;
    let currentMerged = toMergedLabel(transformed[i].original, transformed[i].rect);
    let currentRight = currentMerged.rect.x + currentMerged.rect.width;
    for (let j = i + 1; j < transformed.length; j++) {
      if (mergedSet.has(j)) continue;
      if (transformed[j].rect.x > currentRight) {
        break;
      }
      const nextRect = transformed[j].rect;
      const overlapArea = getOverlapArea(currentMerged.rect, nextRect);
      if (overlapArea > 0) {
        const nextLabel = toMergedLabel(transformed[j].original, nextRect);
        currentMerged = mergeTwoLabels(currentMerged, nextLabel);
        mergedSet.add(j);
        currentRight = currentMerged.rect.x + currentMerged.rect.width;
      }
    }
    mergedLabels.push(currentMerged);
  }
  return mergedLabels;
};
function toMergedLabel(label, rectOverride) {
  const rect = rectOverride ?? applyLabelTransform(label.activeOutline.current, label.textWidth);
  const groupedArray = Array.from(label.activeOutline.groupedAggregatedRender.values());
  return {
    alpha: label.alpha,
    color: label.color,
    reasons: label.reasons,
    groupedAggregatedRender: groupedArray,
    rect,
  };
}
function mergeTwoLabels(a, b) {
  const mergedRect = getBoundingRect(a.rect, b.rect);
  const mergedGrouped = a.groupedAggregatedRender.concat(b.groupedAggregatedRender);
  const mergedReasons = a.reasons | b.reasons;
  return {
    alpha: Math.max(a.alpha, b.alpha),
    ...pickColorClosestToStartStage(a, b),
    // kinda wrong, should pick color in earliest stage
    reasons: mergedReasons,
    groupedAggregatedRender: mergedGrouped,
    rect: mergedRect,
  };
}
function getBoundingRect(r1, r2) {
  const x1 = Math.min(r1.x, r2.x);
  const y1 = Math.min(r1.y, r2.y);
  const x2 = Math.max(r1.x + r1.width, r2.x + r2.width);
  const y2 = Math.max(r1.y + r1.height, r2.y + r2.height);
  return new DOMRect(x1, y1, x2 - x1, y2 - y1);
}
function pickColorClosestToStartStage(a, b) {
  if (a.color.r === a.color.g && a.color.g === a.color.b) {
    return { color: a.color };
  }
  if (b.color.r === b.color.g && b.color.g === b.color.b) {
    return { color: b.color };
  }
  return { color: a.color.r <= b.color.r ? a.color : b.color };
}
function getOverlapArea(rect1, rect2) {
  if (rect1.right <= rect2.left || rect2.right <= rect1.left) {
    return 0;
  }
  if (rect1.bottom <= rect2.top || rect2.bottom <= rect1.top) {
    return 0;
  }
  const xOverlap = Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left);
  const yOverlap = Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top);
  return xOverlap * yOverlap;
}
function applyLabelTransform(rect, estimatedTextWidth) {
  const textHeight = 11;
  const labelX = rect.x;
  const labelY = rect.y;
  return new DOMRect(labelX, labelY, estimatedTextWidth + 4, textHeight + 4);
}
var textMeasurementCache = new LRUMap(100);
var measureTextCached = (text, ctx) => {
  if (textMeasurementCache.has(text)) {
    return textMeasurementCache.get(text);
  }
  ctx.font = `11px ${MONO_FONT}`;
  const metrics = ctx.measureText(text);
  textMeasurementCache.set(text, metrics);
  return metrics;
};

// src/core/web/utils/log.ts
var log = (renders) => {
  const logMap = /* @__PURE__ */ new Map();
  for (let i = 0, len = renders.length; i < len; i++) {
    const render2 = renders[i];
    if (!render2.componentName) continue;
    const changeLog = logMap.get(render2.componentName) ?? [];
    renders;
    const labelText = getLabelText([
      {
        aggregatedCount: 1,
        computedKey: null,
        name: render2.componentName,
        frame: null,
        ...render2,
        changes: {
          type: new Set(render2.changes.map((change) => change.type)),
          unstable: render2.changes.some((change) => change.unstable),
        },
        phase: /* @__PURE__ */ new Set([render2.phase]),
      },
    ]);
    if (!labelText) continue;
    let prevChangedProps = null;
    let nextChangedProps = null;
    if (render2.changes) {
      for (let i2 = 0, len2 = render2.changes.length; i2 < len2; i2++) {
        const { name, prevValue, nextValue, unstable, type } = render2.changes[i2];
        if (type === 'props') {
          prevChangedProps ??= {};
          nextChangedProps ??= {};
          prevChangedProps[`${unstable ? '\u26A0\uFE0F' : ''}${name} (prev)`] = prevValue;
          nextChangedProps[`${unstable ? '\u26A0\uFE0F' : ''}${name} (next)`] = nextValue;
        } else {
          changeLog.push({
            prev: prevValue,
            next: nextValue,
            type,
            unstable,
          });
        }
      }
    }
    if (prevChangedProps && nextChangedProps) {
      changeLog.push({
        prev: prevChangedProps,
        next: nextChangedProps,
        type: 'props',
        unstable: false,
      });
    }
    logMap.set(labelText, changeLog);
  }
  for (const [name, changeLog] of Array.from(logMap.entries())) {
    console.group(`%c${name}`, 'background: hsla(0,0%,70%,.3); border-radius:3px; padding: 0 2px;');
    for (const { type, prev, next, unstable } of changeLog) {
      console.log(`${type}:`, unstable ? '\u26A0\uFE0F' : '', prev, '!==', next);
    }
    console.groupEnd();
  }
};
var logIntro = () => {
  console.log(
    `%c[\xB7] %cReact Scan`,
    'font-weight:bold;color:#7a68e8;font-size:20px;',
    'font-weight:bold;font-size:14px;',
  );
  console.log(
    'Try React Scan Monitoring to target performance issues in production: https://react-scan.com/monitoring',
  );
};

// src/core/web/inspect-element/inspect-state-machine.ts
import { didFiberRender } from 'bippy';

// src/core/web/inspect-element/overlay.ts
import { getDisplayName } from 'bippy';

// src/core/web/inspect-element/utils.ts
import {
  ClassComponentTag,
  ForwardRefTag,
  FunctionComponentTag,
  MemoComponentTag,
  SimpleMemoComponentTag,
  isCompositeFiber,
  isHostFiber,
  traverseFiber,
} from 'bippy';
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
    if (isCompositeFiber(curr)) {
      return [curr, prevNonHost];
    }
    if (isHostFiber(curr)) {
      prevNonHost = curr;
    }
    curr = curr.return;
  }
};
var getChangedProps = (fiber) => {
  const changes = /* @__PURE__ */ new Set();
  const currentProps = fiber.memoizedProps || {};
  const previousProps = fiber.alternate?.memoizedProps || {};
  for (const key in currentProps) {
    if (currentProps[key] !== previousProps[key] && key !== 'children') {
      changes.add(key);
    }
  }
  return changes;
};
var getStateFromFiber = (fiber) => {
  if (!fiber) return {};
  if (
    fiber.tag === FunctionComponentTag ||
    fiber.tag === ForwardRefTag ||
    fiber.tag === SimpleMemoComponentTag ||
    fiber.tag === MemoComponentTag
  ) {
    let memoizedState = fiber.memoizedState;
    const state = {};
    let index = 0;
    while (memoizedState) {
      if (memoizedState.queue && memoizedState.memoizedState !== void 0) {
        state[index] = memoizedState.memoizedState;
      }
      memoizedState = memoizedState.next;
      index++;
    }
    return state;
  } else if (fiber.tag === ClassComponentTag) {
    return fiber.memoizedState || {};
  }
  return {};
};
var getChangedState = (fiber) => {
  const changes = /* @__PURE__ */ new Set();
  const currentState = getStateFromFiber(fiber);
  const previousState = fiber.alternate ? getStateFromFiber(fiber.alternate) : {};
  for (const key in currentState) {
    if (currentState[key] !== previousState[key]) {
      changes.add(key);
    }
  }
  return changes;
};
var isFiberInTree = (fiber, root) => {
  return !!traverseFiber(root, (searchFiber) => searchFiber === fiber);
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
var getAllFiberContexts = (fiber) => {
  const contexts = /* @__PURE__ */ new Map();
  if (!fiber) return contexts;
  let currentFiber = fiber;
  while (currentFiber) {
    const dependencies = currentFiber.dependencies;
    if (dependencies?.firstContext) {
      let contextItem = dependencies.firstContext;
      while (contextItem) {
        const contextType = contextItem.context;
        const contextValue = contextType._currentValue;
        if (!contexts.has(contextType)) {
          contexts.set(contextType, contextValue);
        }
        contextItem = contextItem.next;
      }
    }
    if (currentFiber.type?._context) {
      const providerContext = currentFiber.type._context;
      const providerValue = currentFiber.memoizedProps?.value;
      if (!contexts.has(providerContext)) {
        contexts.set(providerContext, providerValue);
      }
    }
    currentFiber = currentFiber.return;
  }
  return contexts;
};
var getOverrideMethods = () => {
  let overrideProps = null;
  let overrideHookState = null;
  if ('__REACT_DEVTOOLS_GLOBAL_HOOK__' in window) {
    const { renderers } = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (renderers) {
      for (const [_, renderer] of Array.from(renderers)) {
        try {
          if (overrideProps) {
            const prevOverrideProps = overrideProps;
            overrideProps = (fiber, key, value) => {
              prevOverrideProps(fiber, key, value);
              renderer.overrideProps(fiber, key, value);
            };
          } else {
            overrideProps = renderer.overrideProps;
          }
          if (overrideHookState) {
            const prevOverrideHookState = overrideHookState;
            overrideHookState = (fiber, key, value) => {
              prevOverrideHookState(fiber, key, value);
              renderer.overrideHookState(fiber, key, value);
            };
          } else {
            overrideHookState = renderer.overrideHookState;
          }
        } catch (e) {}
      }
    }
  }
  return { overrideProps, overrideHookState };
};

// src/core/web/inspect-element/overlay.ts
var currentRect = null;
var currentLockIconRect = null;
var OVERLAY_DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
var animationFrameId2 = null;
var linearInterpolation = (start2, end, t) => {
  return start2 * (1 - t) + end * t;
};
var drawHoverOverlay = (overlayElement, canvas, ctx, kind) => {
  if (!overlayElement || !canvas || !ctx) {
    return;
  }
  const { parentCompositeFiber, targetRect } = getCompositeComponentFromElement(overlayElement);
  if (!parentCompositeFiber || !targetRect) {
    return;
  }
  const reportDataFiber =
    Store.reportData.get(parentCompositeFiber) ??
    (parentCompositeFiber.alternate ? Store.reportData.get(parentCompositeFiber.alternate) : null);
  const stats = {
    count: reportDataFiber?.count ?? 0,
    time: reportDataFiber?.time ?? 0,
  };
  ctx.save();
  if (!currentRect) {
    drawRect(targetRect, canvas, ctx, kind, stats, parentCompositeFiber);
    currentRect = targetRect;
  } else {
    if (animationFrameId2 !== null) {
      cancelAnimationFrame(animationFrameId2);
    }
    const animate = () => {
      const t =
        ReactScanInternals.options.value.animationSpeed === 'fast'
          ? 0.51
          : ReactScanInternals.options.value.animationSpeed === 'slow'
            ? 0.1
            : 0;
      currentRect = {
        left: linearInterpolation(currentRect.left, targetRect.left, t),
        top: linearInterpolation(currentRect.top, targetRect.top, t),
        width: linearInterpolation(currentRect.width, targetRect.width, t),
        height: linearInterpolation(currentRect.height, targetRect.height, t),
      };
      drawRect(currentRect, canvas, ctx, kind, stats, parentCompositeFiber);
      const stillMoving =
        Math.abs(currentRect.left - targetRect.left) > 0.1 ||
        Math.abs(currentRect.top - targetRect.top) > 0.1 ||
        Math.abs(currentRect.width - targetRect.width) > 0.1 ||
        Math.abs(currentRect.height - targetRect.height) > 0.1;
      if (stillMoving) {
        animationFrameId2 = requestAnimationFrame(animate);
      } else {
        currentRect = targetRect;
        animationFrameId2 = null;
      }
    };
    animationFrameId2 = requestAnimationFrame(animate);
  }
  ctx.restore();
};
var updateCanvasSize = (canvas, ctx) => {
  if (!canvas) return;
  canvas.width = Math.floor(window.innerWidth * OVERLAY_DPR);
  canvas.height = Math.floor(window.innerHeight * OVERLAY_DPR);
  if (ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(OVERLAY_DPR, OVERLAY_DPR);
  }
};
var drawLockIcon = (ctx, x, y, size) => {
  ctx.save();
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';
  ctx.lineWidth = 1.5;
  const shackleWidth = size * 0.6;
  const shackleHeight = size * 0.5;
  const shackleX = x + (size - shackleWidth) / 2;
  const shackleY = y;
  ctx.beginPath();
  ctx.arc(shackleX + shackleWidth / 2, shackleY + shackleHeight / 2, shackleWidth / 2, Math.PI, 0, false);
  ctx.stroke();
  const bodyWidth = size * 0.8;
  const bodyHeight = size * 0.5;
  const bodyX = x + (size - bodyWidth) / 2;
  const bodyY = y + shackleHeight / 2;
  ctx.fillRect(bodyX, bodyY, bodyWidth, bodyHeight);
  ctx.restore();
};
var drawStatsPill = (ctx, rect, stats, kind, fiber) => {
  const pillHeight = 24;
  const pillPadding = 8;
  const componentName = getDisplayName(fiber?.type) ?? 'Unknown';
  let text = componentName;
  if (stats.count) {
    text += ` \u2022 \xD7${stats.count}`;
    if (stats.time) {
      text += ` (${stats.time.toFixed(1)}ms)`;
    }
  }
  ctx.save();
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;
  const lockIconSize = kind === 'locked' ? 14 : 0;
  const lockIconPadding = kind === 'locked' ? 6 : 0;
  const pillWidth = textWidth + pillPadding * 2 + lockIconSize + lockIconPadding;
  const pillX = rect.left;
  const pillY = rect.top - pillHeight - 4;
  ctx.fillStyle = 'rgb(37, 37, 38, .75)';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 3);
  ctx.fill();
  if (kind === 'locked') {
    const lockX = pillX + pillPadding;
    const lockY = pillY + (pillHeight - lockIconSize) / 2 + 2;
    drawLockIcon(ctx, lockX, lockY, lockIconSize);
    currentLockIconRect = {
      x: lockX,
      y: lockY,
      width: lockIconSize,
      height: lockIconSize,
    };
  } else {
    currentLockIconRect = null;
  }
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  const textX = pillX + pillPadding + (kind === 'locked' ? lockIconSize + lockIconPadding : 0);
  ctx.fillText(text, textX, pillY + pillHeight / 2);
  ctx.restore();
};
var drawRect = (rect, canvas, ctx, kind, stats, fiber) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (kind === 'locked') {
    ctx.strokeStyle = 'rgba(142, 97, 227, 0.5)';
    ctx.fillStyle = 'rgba(173, 97, 230, 0.10)';
    ctx.setLineDash([]);
  } else {
    ctx.strokeStyle = 'rgba(142, 97, 227, 0.5)';
    ctx.fillStyle = 'rgba(173, 97, 230, 0.10)';
    ctx.setLineDash([4]);
  }
  ctx.lineWidth = 1;
  ctx.fillRect(rect.left, rect.top, rect.width, rect.height);
  ctx.strokeRect(rect.left, rect.top, rect.width, rect.height);
  drawStatsPill(ctx, rect, stats, kind, fiber);
};

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
import { signal } from '@preact/signals';
import {
  createFiberVisitor,
  didFiberCommit,
  getDisplayName as getDisplayName2,
  getMutatedHostFibers,
  getTimings,
  getType as getType2,
  hasMemoCache,
  instrument,
  isValidElement,
  traverseContexts,
  traverseProps,
  traverseState,
} from 'bippy';
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
  if (isValidElement(value)) {
    const type = getDisplayName2(value.type) ?? '';
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
    if (isEqual(prevValue, nextValue) || isValidElement(prevValue) || isValidElement(nextValue)) {
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
  traverseState(fiber, getStateChangesTraversal.bind(changes));
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
  traverseContexts(fiber, getContextChangesTraversal.bind(changes));
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
  if (!didFiberCommit(fiber)) return true;
  const mutatedHostFibers = getMutatedHostFibers(fiber);
  for (const mutatedHostFiber of mutatedHostFibers) {
    const state = {
      isRequiredChange: false,
    };
    traverseProps(mutatedHostFiber, isRenderUnnecessaryTraversal.bind(state));
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
    isPaused: signal(!ReactScanInternals.options.value.enabled),
    fiberRoots: /* @__PURE__ */ new Set(),
  };
  instrumentationInstances.set(instanceKey, {
    key: instanceKey,
    config: config2,
    instrumentation,
  });
  if (!inited) {
    inited = true;
    const visitor = createFiberVisitor({
      onRender(fiber, phase) {
        const type = getType2(fiber.type);
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
        const { selfTime } = getTimings(fiber);
        const fps2 = getFPS();
        const render2 = {
          phase,
          componentName: getDisplayName2(type),
          count: 1,
          changes,
          time: selfTime,
          forget: hasMemoCache(fiber),
          // todo: allow this to be toggle-able through toolbar
          // todo: performance optimization: if the last fiber measure was very off screen, do not run isRenderUnnecessary
          unnecessary: shouldTrackUnnecessaryRenders() ? isRenderUnnecessary(fiber) : null,
          didCommit: didFiberCommit(fiber),
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
    instrument({
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
var EXPANDED_PATHS = /* @__PURE__ */ new Set();
var fadeOutTimers = /* @__PURE__ */ new WeakMap();
var cumulativeChanges = {
  props: /* @__PURE__ */ new Map(),
  state: /* @__PURE__ */ new Map(),
  context: /* @__PURE__ */ new Map(),
};
var createWhatsChangedSection = createHTMLTemplate(
  '<details class=react-scan-what-changed style="background-color:#b8860b;color:#ffff00;padding:5px"><summary class=font-bold>What changed?',
  false,
);
var createPropsHeader = createHTMLTemplate('<div>Props:', false);
var createChangeList = createHTMLTemplate('<ul style="list-style-type:disc;padding-left:20px">', false);
var createStateHeader = createHTMLTemplate('<div>State:', false);
var createContextHeader = createHTMLTemplate('<div>State:', false);
var renderPropsAndState = (didRender, fiber) => {
  const propContainer = Store.inspectState.value.propContainer;
  if (!propContainer) {
    return;
  }
  const fiberContext = tryOrElse(() => Array.from(getAllFiberContexts(fiber).entries()).map((x) => x[1]), []);
  const componentName = fiber.type?.displayName || fiber.type?.name || 'Unknown';
  const props = fiber.memoizedProps || {};
  const state = getStateFromFiber(fiber) || {};
  const changedProps = new Set(getChangedProps(fiber));
  const changedState = new Set(getChangedState(fiber));
  const changedContext = /* @__PURE__ */ new Set();
  for (const key of changedProps) {
    cumulativeChanges.props.set(key, (cumulativeChanges.props.get(key) ?? 0) + 1);
  }
  for (const key of changedState) {
    cumulativeChanges.state.set(key, (cumulativeChanges.state.get(key) ?? 0) + 1);
  }
  for (const key of changedContext) {
    cumulativeChanges.context.set(key, (cumulativeChanges.context.get(key) ?? 0) + 1);
  }
  propContainer.innerHTML = '';
  const changedItems = [];
  if (cumulativeChanges.props.size > 0) {
    for (const [key, count] of cumulativeChanges.props) {
      changedItems.push(`Prop: ${key} \xD7${count}`);
    }
  }
  if (cumulativeChanges.state.size > 0) {
    for (const [key, count] of cumulativeChanges.state) {
      changedItems.push(`State: ${key} \xD7${count}`);
    }
  }
  if (cumulativeChanges.context.size > 0) {
    for (const [key, count] of cumulativeChanges.context) {
      changedItems.push(`Context: ${key} \xD7${count}`);
    }
  }
  const whatChangedSection = createWhatsChangedSection();
  whatChangedSection.open = Store.wasDetailsOpen.value;
  if (cumulativeChanges.props.size > 0) {
    const propsHeader = createPropsHeader();
    const propsList = createChangeList();
    for (const [key, count] of cumulativeChanges.props) {
      const li = document.createElement('li');
      li.textContent = `${key} \xD7${count}`;
      propsList.appendChild(li);
    }
    whatChangedSection.appendChild(propsHeader);
    whatChangedSection.appendChild(propsList);
  }
  if (cumulativeChanges.state.size > 0) {
    const stateHeader = createStateHeader();
    const stateList = createChangeList();
    for (const [key, count] of cumulativeChanges.state) {
      const li = document.createElement('li');
      li.textContent = `${key} \xD7${count}`;
      stateList.appendChild(li);
    }
    whatChangedSection.appendChild(stateHeader);
    whatChangedSection.appendChild(stateList);
  }
  if (cumulativeChanges.context.size > 0) {
    const contextHeader = createContextHeader();
    const contextList = createChangeList();
    for (const [key, count] of cumulativeChanges.context) {
      const li = document.createElement('li');
      li.textContent = `${key} \xD7${count}`;
      contextList.appendChild(li);
    }
    whatChangedSection.appendChild(contextHeader);
    whatChangedSection.appendChild(contextList);
  }
  whatChangedSection.addEventListener('toggle', () => {
    Store.wasDetailsOpen.value = whatChangedSection.open;
  });
  propContainer.appendChild(whatChangedSection);
  const inspector = document.createElement('div');
  inspector.className = 'react-scan-inspector';
  const content = document.createElement('div');
  content.className = 'react-scan-content';
  const sections = [];
  if (Object.values(props).length) {
    tryOrElse(() => {
      sections.push({
        element: renderSection(componentName, didRender, fiber, propContainer, 'Props', props, changedProps),
        hasChanges: changedProps.size > 0,
      });
    }, null);
  }
  if (fiberContext.length) {
    tryOrElse(() => {
      const changedKeys = /* @__PURE__ */ new Set();
      const contextObj = Object.fromEntries(
        fiberContext.map((val, idx) => {
          const key = idx.toString();
          return [key, val];
        }),
      );
      for (const [key, value] of Object.entries(contextObj)) {
        const path = `${componentName}.context.${key}`;
        const lastValue = lastRendered.get(path);
        const isChanged = lastValue !== void 0 && lastValue !== contextObj[key];
        const isBadRender =
          isChanged &&
          ['object', 'function'].includes(typeof lastValue) &&
          fastSerialize(lastValue) === fastSerialize(contextObj[key]);
        if (isChanged) {
          changedKeys.add(key);
          changedAt.set(path, Date.now());
        }
        if (isBadRender) {
          delete contextObj[key];
          const newKey = `\u26A0\uFE0F ${key}`;
          contextObj[newKey] = value;
          changedAt.set(`${componentName}.context.${key}`, Date.now());
        }
        lastRendered.set(path, value);
      }
      sections.push({
        element: renderSection(componentName, didRender, fiber, propContainer, 'Context', contextObj, changedKeys),
        hasChanges: changedKeys.size > 0,
      });
    }, null);
  }
  if (Object.values(state).length) {
    tryOrElse(() => {
      const stateObj = Array.isArray(state)
        ? Object.fromEntries(state.map((val, idx) => [idx.toString(), val]))
        : state;
      for (const [key, value] of Object.entries(stateObj)) {
        const path = `${componentName}.state.${key}`;
        const lastValue = lastRendered.get(path);
        if (lastValue !== void 0 && lastValue !== value) {
          changedAt.set(path, Date.now());
        }
        lastRendered.set(path, value);
      }
      sections.push({
        element: renderSection(componentName, didRender, fiber, propContainer, 'State', stateObj, changedState),
        hasChanges: changedState.size > 0,
      });
    }, null);
  }
  for (const section of sections) {
    content.appendChild(section.element);
  }
  inspector.appendChild(content);
  propContainer.appendChild(inspector);
};
var renderSection = (
  componentName,
  didRender,
  fiber,
  propsContainer,
  title,
  data,
  changedKeys = /* @__PURE__ */ new Set(),
) => {
  const section = document.createElement('div');
  section.className = 'react-scan-section';
  section.dataset.section = title;
  for (const key in data) {
    const value = data[key];
    const el = createPropertyElement(
      componentName,
      didRender,
      propsContainer,
      fiber,
      key,
      value,
      title.toLowerCase(),
      0,
      changedKeys,
      '',
      /* @__PURE__ */ new WeakMap(),
    );
    if (el) {
      section.appendChild(el);
    }
  }
  return section;
};
var getPath = (componentName, section, parentPath, key) => {
  return parentPath ? `${componentName}.${parentPath}.${key}` : `${componentName}.${section}.${key}`;
};
var changedAt = /* @__PURE__ */ new Map();
var changedAtInterval;
var lastRendered = /* @__PURE__ */ new Map();
var tryOrElse = (cb, val) => {
  try {
    return cb();
  } catch (e) {
    return val;
  }
};
var isPromise = (value) => {
  return value && (value instanceof Promise || (typeof value === 'object' && 'then' in value));
};
var createScanPropertyContainer = createHTMLTemplate('<div class=react-scan-property>', false);
var createScanArrow = createHTMLTemplate('<span class=react-scan-arrow>', false);
var createScanPropertyContent = createHTMLTemplate('<div class=react-scan-property-content>', false);
var createScanPreviewLine = createHTMLTemplate('<div class=react-scan-preview-line>', false);
var createScanInput = createHTMLTemplate('<input type=text class=react-scan-input>', false);
var createScanFlashOverlay = createHTMLTemplate('<div class=react-scan-flash-overlay>', false);
var createPropertyElement = (
  componentName,
  didRender,
  propsContainer,
  fiber,
  key,
  value,
  section = '',
  level = 0,
  changedKeys = /* @__PURE__ */ new Set(),
  parentPath = '',
  objectPathMap = /* @__PURE__ */ new WeakMap(),
) => {
  try {
    if (!changedAtInterval) {
      changedAtInterval = setInterval(() => {
        for (const [key2, value2] of changedAt) {
          if (Date.now() - value2 > 450) {
            changedAt.delete(key2);
          }
        }
      }, 200);
    }
    const container = createScanPropertyContainer();
    const isExpandable =
      !isPromise(value) &&
      ((Array.isArray(value) && value.length > 0) ||
        (typeof value === 'object' && value !== null && Object.keys(value).length > 0));
    const currentPath = getPath(componentName, section, parentPath, key);
    const prevValue = lastRendered.get(currentPath);
    const isChanged = prevValue !== void 0 && prevValue !== value;
    const isBadRender =
      value &&
      ['object', 'function'].includes(typeof value) &&
      fastSerialize(value) === fastSerialize(prevValue) &&
      isChanged;
    lastRendered.set(currentPath, value);
    if (isExpandable) {
      const isExpanded = EXPANDED_PATHS.has(currentPath);
      if (typeof value === 'object' && value !== null) {
        let paths = objectPathMap.get(value);
        if (!paths) {
          paths = /* @__PURE__ */ new Set();
          objectPathMap.set(value, paths);
        }
        if (paths.has(currentPath)) {
          return createCircularReferenceElement(key);
        }
        paths.add(currentPath);
      }
      container.classList.add('react-scan-expandable');
      if (isExpanded) {
        container.classList.add('react-scan-expanded');
      }
      const arrow = createScanArrow();
      const contentWrapper = createScanPropertyContent();
      const preview = createScanPreviewLine();
      preview.dataset.key = key;
      preview.dataset.section = section;
      preview.innerHTML = `
        ${isBadRender ? '<span class="react-scan-warning">\u26A0\uFE0F</span>' : ''}
        <span class="react-scan-key">${key}:&nbsp;</span><span class="${getValueClassName(
          value,
        )} react-scan-value truncate">${getValuePreview(value)}</span>
      `;
      const content = document.createElement('div');
      content.className = isExpanded ? 'react-scan-nested-object' : 'react-scan-nested-object react-scan-hidden';
      contentWrapper.appendChild(preview);
      contentWrapper.appendChild(content);
      container.appendChild(contentWrapper);
      if (isExpanded) {
        if (Array.isArray(value)) {
          for (let i = 0, len = value.length; i < len; i++) {
            const el = createPropertyElement(
              componentName,
              didRender,
              propsContainer,
              fiber,
              `${i}`,
              value[i],
              section,
              level + 1,
              changedKeys,
              currentPath,
              objectPathMap,
            );
            if (el) {
              content.appendChild(el);
            }
          }
        } else {
          for (const k in value) {
            const v = value[key];
            const el = createPropertyElement(
              componentName,
              didRender,
              propsContainer,
              fiber,
              k,
              v,
              section,
              level + 1,
              changedKeys,
              currentPath,
              objectPathMap,
            );
            if (el) {
              content.appendChild(el);
            }
          }
        }
      }
      arrow.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanding = !container.classList.contains('react-scan-expanded');
        if (isExpanding) {
          EXPANDED_PATHS.add(currentPath);
          container.classList.add('react-scan-expanded');
          content.classList.remove('react-scan-hidden');
          if (!content.hasChildNodes()) {
            if (Array.isArray(value)) {
              for (let i = 0, len = value.length; i < len; i++) {
                const el = createPropertyElement(
                  componentName,
                  didRender,
                  propsContainer,
                  fiber,
                  `${i}`,
                  value[i],
                  section,
                  level + 1,
                  changedKeys,
                  currentPath,
                  /* @__PURE__ */ new WeakMap(),
                );
                if (el) {
                  content.appendChild(el);
                }
              }
            } else {
              for (const k in value) {
                const v = value[k];
                const el = createPropertyElement(
                  componentName,
                  didRender,
                  propsContainer,
                  fiber,
                  k,
                  v,
                  section,
                  level + 1,
                  changedKeys,
                  currentPath,
                  /* @__PURE__ */ new WeakMap(),
                );
                if (el) {
                  content.appendChild(el);
                }
              }
            }
          }
        } else {
          EXPANDED_PATHS.delete(currentPath);
          container.classList.remove('react-scan-expanded');
          content.classList.add('react-scan-hidden');
        }
      });
    } else {
      const preview = createScanPreviewLine();
      preview.dataset.key = key;
      preview.dataset.section = section;
      preview.innerHTML = `
        ${isBadRender ? '<span class="react-scan-warning">\u26A0\uFE0F</span>' : ''}
        <span class="react-scan-key">${key}:&nbsp;</span><span class="${getValueClassName(
          value,
        )} react-scan-value truncate">${getValuePreview(value)}</span>
      `;
      container.appendChild(preview);
      if (section === 'props' || section === 'state') {
        const valueElement = preview.querySelector('.react-scan-value');
        const { overrideProps, overrideHookState } = getOverrideMethods();
        const canEdit = section === 'props' ? !!overrideProps : !!overrideHookState;
        if (
          valueElement &&
          canEdit &&
          (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
        ) {
          valueElement.classList.add('react-scan-editable');
          valueElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const input = createScanInput();
            input.value = value.toString();
            const updateValue = () => {
              const newValue = input.value;
              value = typeof value === 'number' ? Number(newValue) : newValue;
              valueElement.dataset.text = getValuePreview(value);
              tryOrElse(() => {
                input.replaceWith(valueElement);
              }, null);
              tryOrElse(() => {
                const { overrideProps: overrideProps2, overrideHookState: overrideHookState2 } = getOverrideMethods();
                if (overrideProps2 && section === 'props') {
                  overrideProps2(fiber, [key], value);
                }
                if (overrideHookState2 && section === 'state') {
                  overrideHookState2(fiber, key, [], value);
                }
              }, null);
            };
            input.addEventListener('blur', updateValue);
            input.addEventListener('keydown', (event) => {
              if (event.key === 'Enter') {
                updateValue();
              }
            });
            valueElement.replaceWith(input);
            input.focus();
          });
        }
      }
    }
    if (changedKeys.has(key)) {
      changedAt.set(currentPath, Date.now());
    }
    if (changedAt.has(currentPath)) {
      const flashOverlay = createScanFlashOverlay();
      container.appendChild(flashOverlay);
      flashOverlay.style.opacity = '.9';
      const existingTimer = fadeOutTimers.get(flashOverlay);
      if (existingTimer !== void 0) {
        clearTimeout(existingTimer);
      }
      const timerId = setTimeout(() => {
        flashOverlay.style.transition = 'opacity 400ms ease-out';
        flashOverlay.style.opacity = '0';
        fadeOutTimers.delete(flashOverlay);
      }, 300);
      fadeOutTimers.set(flashOverlay, timerId);
    }
    return container;
  } catch {
    return null;
  }
};
var createCircularReferenceElement = (key) => {
  const container = createScanPropertyContainer();
  const preview = createScanPreviewLine();
  preview.innerHTML = `
    <span class="react-scan-key">${key}:&nbsp;</span><span class="react-scan-circular">[Circular Reference]</span>
  `;
  container.appendChild(preview);
  return container;
};
var getValueClassName = (value) => {
  if (Array.isArray(value)) return 'react-scan-array';
  if (value === null || value === void 0) return 'react-scan-null';
  switch (typeof value) {
    case 'string':
      return 'react-scan-string';
    case 'number':
      return 'react-scan-number';
    case 'boolean':
      return 'react-scan-boolean';
    case 'object':
      return 'react-scan-object-key';
    default:
      return '';
  }
};
var getValuePreview = (value) => {
  if (Array.isArray(value)) {
    return `Array(${value.length})`;
  }
  if (value === null) return 'null';
  if (value === void 0) return 'undefined';
  switch (typeof value) {
    case 'string':
      return `&quot;${value}&quot;`;
    case 'number':
      return value.toString();
    case 'boolean':
      return value.toString();
    case 'object': {
      if (value instanceof Promise) {
        return 'Promise';
      }
      const keys = Object.keys(value);
      if (keys.length <= 3) {
        return `{${keys.join(', ')}}`;
      }
      return `{${keys.slice(0, 8).join(', ')}, ...}`;
    }
    default:
      return typeof value;
  }
};

// src/core/web/inspect-element/inspect-state-machine.ts
var INSPECT_OVERLAY_CANVAS_ID = 'react-scan-inspect-canvas';
var lastHoveredElement;
var animationId;
var createInspectElementStateMachine = (shadow) => {
  if (typeof window === 'undefined') {
    return;
  }
  let canvas = document.getElementById(INSPECT_OVERLAY_CANVAS_ID);
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = INSPECT_OVERLAY_CANVAS_ID;
    canvas.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 214748367;
  `;
    shadow.appendChild(canvas);
    const ctx2 = canvas.getContext('2d', { alpha: true });
    if (!ctx2) {
      return;
    }
    updateCanvasSize(canvas, ctx2);
    window.addEventListener(
      'resize',
      () => {
        updateCanvasSize(canvas, ctx2);
      },
      { capture: true },
    );
  }
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    return;
  }
  const clearCanvas = () => {
    cancelAnimationFrame(animationId);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };
  const unsubscribeFns = {
    // Needs to be initialized already so that we don't shift V8 states
    focused: void 0,
    'inspect-off': void 0,
    inspecting: void 0,
    uninitialized: void 0,
  };
  const unsubscribeAll = () => {
    for (const key in unsubscribeFns) {
      unsubscribeFns[key]?.();
    }
  };
  const recursiveRaf = (cb) => {
    const helper = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      animationId = requestAnimationFrame(() => {
        cb();
        helper();
      });
    };
    helper();
  };
  window.addEventListener(
    'mousemove',
    () => {
      if (Store.inspectState.value.kind !== 'inspect-off') {
        return;
      }
      clearCanvas();
      updateCanvasSize(canvas, ctx);
    },
    { capture: true },
  );
  let previousState;
  const repaint = throttle(() => {
    const unSub = (() => {
      const inspectState = Store.inspectState.value;
      switch (inspectState.kind) {
        case 'uninitialized': {
          return;
        }
        case 'inspect-off': {
          if (previousState !== 'inspect-off') {
            setTimeout(() => {
              cancelAnimationFrame(animationId);
              unsubscribeAll();
              clearCanvas();
            }, 100);
          }
          clearCanvas();
          return;
        }
        case 'inspecting': {
          unsubscribeAll();
          recursiveRaf(() => {
            if (!inspectState.hoveredDomElement) {
              return;
            }
            drawHoverOverlay(inspectState.hoveredDomElement, canvas, ctx, 'inspecting');
          });
          const eventCatcher = document.createElement('div');
          eventCatcher.style.cssText = `
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              z-index: ${parseInt(canvas.style.zIndex) - 1};
              pointer-events: auto;
            `;
          canvas.parentNode.insertBefore(eventCatcher, canvas);
          let currentHoveredElement = null;
          const mouseMove = throttle((e) => {
            if (Store.inspectState.value.kind !== 'inspecting') {
              return;
            }
            eventCatcher.style.pointerEvents = 'none';
            const el = document.elementFromPoint(e.clientX, e.clientY);
            eventCatcher.style.pointerEvents = 'auto';
            if (!el) return;
            lastHoveredElement = el;
            currentHoveredElement = el;
            inspectState.hoveredDomElement = el;
            drawHoverOverlay(el, canvas, ctx, 'inspecting');
          }, 16);
          window.addEventListener('mousemove', mouseMove, { capture: true });
          const pointerdown = (e) => {
            e.stopPropagation();
            eventCatcher.style.pointerEvents = 'none';
            const el = currentHoveredElement ?? document.elementFromPoint(e.clientX, e.clientY) ?? lastHoveredElement;
            eventCatcher.style.pointerEvents = 'auto';
            if (!el) {
              return;
            }
            drawHoverOverlay(el, canvas, ctx, 'locked');
            Store.inspectState.value = {
              kind: 'focused',
              focusedDomElement: el,
              propContainer: inspectState.propContainer,
            };
          };
          window.addEventListener('pointerdown', pointerdown, {
            capture: true,
          });
          const keyDown = (e) => {
            if (e.key === 'Escape') {
              Store.inspectState.value = {
                kind: 'inspect-off',
                propContainer: inspectState.propContainer,
              };
              clearCanvas();
            }
          };
          window.addEventListener('keydown', keyDown, { capture: true });
          let cleanup = () => {};
          if (inspectState.hoveredDomElement) {
            cleanup = trackElementPosition(inspectState.hoveredDomElement, () => {
              drawHoverOverlay(inspectState.hoveredDomElement, canvas, ctx, 'inspecting');
            });
          }
          return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('pointerdown', pointerdown, {
              capture: true,
            });
            window.removeEventListener('mousemove', mouseMove, {
              capture: true,
            });
            window.removeEventListener('keydown', keyDown, { capture: true });
            eventCatcher.parentNode?.removeChild(eventCatcher);
            cleanup();
          };
        }
        case 'focused': {
          unsubscribeAll();
          recursiveRaf(() => {
            drawHoverOverlay(inspectState.focusedDomElement, canvas, ctx, 'locked');
          });
          if (!document.contains(inspectState.focusedDomElement)) {
            setTimeout(() => {
              clearCanvas();
            }, 500);
            Store.inspectState.value = {
              kind: 'inspect-off',
              propContainer: inspectState.propContainer,
            };
            return;
          }
          drawHoverOverlay(inspectState.focusedDomElement, canvas, ctx, 'locked');
          const element = inspectState.focusedDomElement;
          const { parentCompositeFiber } = getCompositeComponentFromElement(element);
          if (!parentCompositeFiber) {
            return;
          }
          const didRender = didFiberRender(parentCompositeFiber);
          renderPropsAndState(didRender, parentCompositeFiber);
          const keyDown = (e) => {
            if (e.key === 'Escape') {
              clearCanvas();
              drawHoverOverlay(e.target ?? inspectState.focusedDomElement, canvas, ctx, 'inspecting');
              Store.inspectState.value = {
                kind: 'inspecting',
                hoveredDomElement: e.target ?? inspectState.focusedDomElement,
                propContainer: inspectState.propContainer,
              };
            }
          };
          window.addEventListener('keydown', keyDown, { capture: true });
          const onpointerdownCanvasLockIcon = (e) => {
            if (!currentLockIconRect) {
              return;
            }
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
            const adjustedX = x / OVERLAY_DPR;
            const adjustedY = y / OVERLAY_DPR;
            if (
              adjustedX >= currentLockIconRect.x &&
              adjustedX <= currentLockIconRect.x + currentLockIconRect.width &&
              adjustedY >= currentLockIconRect.y &&
              adjustedY <= currentLockIconRect.y + currentLockIconRect.height
            ) {
              inspectState.propContainer.innerHTML = '';
              clearCanvas();
              drawHoverOverlay(e.target, canvas, ctx, 'inspecting');
              e.stopPropagation();
              Store.inspectState.value = {
                kind: 'inspecting',
                hoveredDomElement: e.target,
                propContainer: inspectState.propContainer,
              };
              return;
            }
          };
          window.addEventListener('pointerdown', onpointerdownCanvasLockIcon, {
            capture: true,
          });
          const cleanup = trackElementPosition(inspectState.focusedDomElement, () => {
            drawHoverOverlay(inspectState.focusedDomElement, canvas, ctx, 'locked');
          });
          return () => {
            cleanup();
            cancelAnimationFrame(animationId);
            window.removeEventListener('keydown', keyDown, { capture: true });
            window.removeEventListener('pointerdown', onpointerdownCanvasLockIcon, { capture: true });
          };
        }
      }
    })();
    if (unSub) {
      unsubscribeFns[Store.inspectState.value.kind] = unSub;
    }
    previousState = Store.inspectState.value.kind;
  }, 70);
  Store.inspectState.subscribe(repaint);
  Store.lastReportTime.subscribe(repaint);
  return () => {};
};
var trackElementPosition = (element, callback) => {
  const handleAnyScroll = () => {
    callback(element);
  };
  document.addEventListener('scroll', handleAnyScroll, {
    passive: true,
    capture: true,
    // catch all scroll events
  });
  return () => {
    document.removeEventListener('scroll', handleAnyScroll, { capture: true });
  };
};

// src/core/web/utils/geiger.ts
var lastPlayTime = 0;
var MIN_INTERVAL = 32;
var BASE_VOLUME = 0.5;
var FREQ_MULTIPLIER = 200;
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
var playGeigerClickSound = (audioContext, amplitude) => {
  const now = performance.now();
  if (now - lastPlayTime < MIN_INTERVAL) {
    return;
  }
  lastPlayTime = now;
  const currentTime = audioContext.currentTime;
  const { duration, oscillatorType, startFreq, endFreq, attack } = audioConfig;
  const volume = Math.max(BASE_VOLUME, amplitude) * audioConfig.volumeMultiplier;
  const oscillator = new OscillatorNode(audioContext, {
    type: oscillatorType,
    frequency: startFreq + amplitude * FREQ_MULTIPLIER,
  });
  const gainNode = new GainNode(audioContext, {
    gain: 0,
  });
  oscillator.frequency.exponentialRampToValueAtTime(endFreq, currentTime + duration);
  gainNode.gain.linearRampToValueAtTime(volume, currentTime + attack);
  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start(currentTime);
  oscillator.stop(currentTime + duration);
};

// src/core/web/assets/svgs/svgs.ts
var ICONS = `
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="icon-eye-off" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
    <path d="m2 2 20 20"/>
  </symbol>

  <symbol id="icon-eye" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </symbol>


  <symbol id="icon-inspect" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/>
    <path d="M5 3a2 2 0 0 0-2 2"/>
    <path d="M19 3a2 2 0 0 1 2 2"/>
    <path d="M5 21a2 2 0 0 1-2-2"/>
    <path d="M9 3h1"/>
    <path d="M9 21h2"/>
    <path d="M14 3h1"/>
    <path d="M3 9v1"/>
    <path d="M21 9v2"/>
    <path d="M3 14v1"/>
  </symbol>

  <symbol id="icon-focus" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/>
    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
  </symbol>

  <symbol id="icon-next" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9h6V5l7 7-7 7v-4H6V9z"/>
  </symbol>

  <symbol id="icon-previous" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/>
  </symbol>

  <symbol id="icon-volume-on" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
    <path d="M16 9a5 5 0 0 1 0 6"/>
    <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
  </symbol>

  <symbol id="icon-volume-off" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
    <line x1="22" x2="16" y1="9" y2="15"/>
    <line x1="16" x2="22" y1="9" y2="15"/>
  </symbol>

  <symbol id="icon-scan-eye" viewBox="0 0 24 24">
    <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
    <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
    <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
    <circle cx="12" cy="12" r="1"/>
    <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>
  </symbol>

  <symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </symbol>

  <symbol id="icon-replay" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
    <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
    <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
    <circle cx="12" cy="12" r="1"/>
    <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>
  </symbol>

  <symbol id="icon-chevrons-up-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m7 15 5 5 5-5"/>
    <path d="m7 9 5-5 5 5"/>
  </symbol>

  <symbol id="icon-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </symbol>
</svg>
`;

// src/core/web/overlay.ts
var initReactScanOverlay = () => {
  const container = document.getElementById('react-scan-root');
  const shadow = container?.shadowRoot;
  if (!shadow) {
    return null;
  }
  const overlayElement = document.createElement('canvas');
  overlayElement.id = 'react-scan-overlay';
  overlayElement.style.position = 'fixed';
  overlayElement.style.top = '0';
  overlayElement.style.left = '0';
  overlayElement.style.width = '100vw';
  overlayElement.style.height = '100vh';
  overlayElement.style.pointerEvents = 'none';
  overlayElement.style.zIndex = '2147483646';
  overlayElement.setAttribute('aria-hidden', 'true');
  shadow.appendChild(overlayElement);
  const ctx = overlayElement.getContext('2d');
  if (!ctx) return null;
  let resizeScheduled = false;
  const updateCanvasSize2 = () => {
    const dpi = window.devicePixelRatio || 1;
    overlayElement.width = dpi * window.innerWidth;
    overlayElement.height = dpi * window.innerHeight;
    overlayElement.style.width = `${window.innerWidth}px`;
    overlayElement.style.height = `${window.innerHeight}px`;
    ctx.resetTransform();
    ctx.scale(dpi, dpi);
    resizeScheduled = false;
  };
  window.addEventListener('resize', () => {
    recalcOutlines();
    if (!resizeScheduled) {
      resizeScheduled = true;
      requestAnimationFrame(() => {
        updateCanvasSize2();
      });
    }
  });
  window.addEventListener('scroll', () => {
    recalcOutlines();
  });
  updateCanvasSize2();
  return ctx;
};

// src/core/web/toolbar.tsx
import { render } from 'preact';

// src/core/web/components/widget/index.tsx
import { useCallback as useCallback3, useEffect as useEffect5, useRef as useRef3 } from 'preact/hooks';

// src/core/web/constants.ts
var SAFE_AREA = 24;
var MIN_SIZE = {
  width: 360,
  height: 36,
};
var LOCALSTORAGE_KEY = 'react-scan-widget-settings';

// src/core/web/state.ts
import { signal as signal2 } from '@preact/signals';
var signalRefContainer = signal2(null);
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
var signalWidget = signal2(getInitialWidgetConfig());
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
import { useRef, useEffect, useState } from 'preact/hooks';
import { getDisplayName as getDisplayName3 } from 'bippy';

// src/core/web/components/icon/index.tsx
import { forwardRef } from 'preact/compat';
import { jsx } from 'preact/jsx-runtime';
var Icon = forwardRef((props, ref) => {
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
  return /* @__PURE__ */ jsx('svg', {
    ref,
    ...attributes,
    children: /* @__PURE__ */ jsx('use', { href: path }),
  });
});

// src/core/web/components/widget/header.tsx
import { jsx as jsx2, jsxs } from 'preact/jsx-runtime';
var useSubscribeFocusedFiber = (onUpdate) => {
  useEffect(() => {
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
  const [componentName, setComponentName] = useState(null);
  const [componentRenders, setComponentRenders] = useState(null);
  const [componentTime, setComponentTime] = useState(null);
  useSubscribeFocusedFiber((fiber) => {
    const displayName = getDisplayName3(fiber.type);
    const reportData = Store.reportData.get(fiber);
    setComponentName(displayName ?? 'Unknown');
    setComponentRenders(reportData?.count ?? null);
    setComponentTime(reportData?.time && reportData.time > 0 ? reportData?.time : null);
  });
  return /* @__PURE__ */ jsxs('div', {
    class: 'react-scan-header',
    children: [
      /* @__PURE__ */ jsxs('div', {
        style: {
          gap: '0.5rem',
          display: 'flex',
          width: '50%',
          justifyContent: 'start',
          alignItems: 'center',
        },
        children: [
          /* @__PURE__ */ jsx2('span', { children: componentName }),
          componentRenders !== null && /* @__PURE__ */ jsxs('span', { children: ['\u2022 x', componentRenders, ' '] }),
          componentTime !== null &&
            /* @__PURE__ */ jsxs('span', {
              class: 'react-scan-component-time',
              children: ['\u2022 ', componentTime.toFixed(2), 'ms'],
            }),
        ],
      }),
      /* @__PURE__ */ jsx2('div', {
        style: {
          width: '50%',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          columnGap: '2px',
        },
        children: /* @__PURE__ */ jsx2('button', {
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
          children: /* @__PURE__ */ jsx2(Icon, { name: 'icon-close' }),
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
import { useCallback, useEffect as useEffect2, useRef as useRef2 } from 'preact/hooks';
import { jsx as jsx3 } from 'preact/jsx-runtime';
var ResizeHandle = ({ position }) => {
  const isLine = !position.includes('-');
  const refContainer = useRef2(null);
  const refLine = useRef2(null);
  const refCorner = useRef2(null);
  const prevWidth = useRef2(null);
  const prevHeight = useRef2(null);
  const prevCorner = useRef2(null);
  useEffect2(() => {
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
  const handleResize = useCallback((e) => {
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
  const handleDoubleClick = useCallback((e) => {
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
  return /* @__PURE__ */ jsx3('div', {
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
      ? /* @__PURE__ */ jsx3('span', {
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
          children: /* @__PURE__ */ jsx3(Icon, {
            name: 'icon-chevrons-up-down',
            className: cn('text-[#7b51c8]', {
              'rotate-90': position === 'left' || position === 'right',
            }),
          }),
        })
      : /* @__PURE__ */ jsx3('span', {
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
          children: /* @__PURE__ */ jsx3(Icon, { name: 'icon-chevrons-up-down' }),
        }),
  });
};

// src/core/web/components/widget/toolbar.tsx
import { useCallback as useCallback2, useEffect as useEffect4, useMemo } from 'preact/hooks';

// src/core/web/components/widget/fps-meter.tsx
import { useEffect as useEffect3, useState as useState2 } from 'preact/hooks';
import { jsx as jsx4 } from 'preact/jsx-runtime';
var FpsMeter = () => {
  const [fps2, setFps] = useState2(null);
  useEffect3(() => {
    const intervalId = setInterval(() => {
      setFps(getFPS());
    }, 100);
    return () => clearInterval(intervalId);
  }, []);
  return /* @__PURE__ */ jsx4('span', {
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
    children: /* @__PURE__ */ jsx4('span', { className: 'text-xxs', children: 'FPS' }),
  });
};

// src/core/web/components/widget/toolbar.tsx
import { jsx as jsx5, jsxs as jsxs2 } from 'preact/jsx-runtime';
var Toolbar = ({ refPropContainer }) => {
  const inspectState = Store.inspectState;
  const isInspectFocused = inspectState.value.kind === 'focused';
  const isInspectActive = inspectState.value.kind === 'inspecting';
  const { inspectIcon, inspectColor } = useMemo(() => {
    let inspectIcon2 = null;
    let inspectColor2 = '#999';
    if (isInspectActive) {
      inspectIcon2 = /* @__PURE__ */ jsx5(Icon, { name: 'icon-inspect' });
      inspectColor2 = 'rgba(142, 97, 227, 1)';
    } else if (isInspectFocused) {
      inspectIcon2 = /* @__PURE__ */ jsx5(Icon, { name: 'icon-focus' });
      inspectColor2 = 'rgba(142, 97, 227, 1)';
    } else {
      inspectIcon2 = /* @__PURE__ */ jsx5(Icon, { name: 'icon-inspect' });
      inspectColor2 = '#999';
    }
    return { inspectIcon: inspectIcon2, inspectColor: inspectColor2 };
  }, [isInspectActive, isInspectFocused]);
  const onToggleInspect = useCallback2(() => {
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
  const findNextElement = useCallback2((currentElement, direction) => {
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
  const onPreviousFocus = useCallback2(() => {
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
  const onNextFocus = useCallback2(() => {
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
  const onToggleActive = useCallback2(() => {
    if (ReactScanInternals.instrumentation) {
      ReactScanInternals.instrumentation.isPaused.value = !ReactScanInternals.instrumentation.isPaused.value;
    }
  }, [ReactScanInternals.instrumentation]);
  const onSoundToggle = useCallback2(() => {
    const newSoundState = !ReactScanInternals.options.value.playSound;
    setOptions({ playSound: newSoundState });
  }, []);
  useEffect4(() => {
    const currentState = Store.inspectState.value;
    if (currentState.kind === 'uninitialized') {
      Store.inspectState.value = {
        kind: 'inspect-off',
        propContainer: refPropContainer.current,
      };
    }
  }, []);
  return /* @__PURE__ */ jsxs2('div', {
    className: 'flex max-h-9 min-h-9 flex-1 items-stretch overflow-hidden',
    children: [
      /* @__PURE__ */ jsx5('button', {
        title: 'Inspect element',
        onClick: onToggleInspect,
        className: 'flex items-center justify-center px-3',
        style: { color: inspectColor },
        children: inspectIcon,
      }),
      /* @__PURE__ */ jsx5('button', {
        id: 'react-scan-power',
        title: ReactScanInternals.instrumentation?.isPaused.value ? 'Start' : 'Stop',
        onClick: onToggleActive,
        className: cn('flex items-center justify-center px-3', {
          'text-white': !ReactScanInternals.instrumentation?.isPaused.value,
          'text-[#999]': ReactScanInternals.instrumentation?.isPaused.value,
        }),
        children: /* @__PURE__ */ jsx5(Icon, {
          name: `icon-${ReactScanInternals.instrumentation?.isPaused.value ? 'eye-off' : 'eye'}`,
        }),
      }),
      /* @__PURE__ */ jsx5('button', {
        id: 'react-scan-sound-toggle',
        onClick: onSoundToggle,
        title: ReactScanInternals.options.value.playSound ? 'Sound On' : 'Sound Off',
        className: cn('flex items-center justify-center px-3', {
          'text-white': ReactScanInternals.options.value.playSound,
          'text-[#999]': !ReactScanInternals.options.value.playSound,
        }),
        children: /* @__PURE__ */ jsx5(Icon, {
          name: `icon-${ReactScanInternals.options.value.playSound ? 'volume-on' : 'volume-off'}`,
        }),
      }),
      isInspectFocused &&
        /* @__PURE__ */ jsxs2('div', {
          className: cn(
            'flex items-stretch justify-between',
            'ml-auto',
            'border-l-1 border-white/10 text-[#999]',
            'overflow-hidden',
          ),
          children: [
            /* @__PURE__ */ jsx5('button', {
              id: 'react-scan-previous-focus',
              title: 'Previous element',
              onClick: onPreviousFocus,
              className: 'flex items-center justify-center px-3',
              children: /* @__PURE__ */ jsx5(Icon, { name: 'icon-previous' }),
            }),
            /* @__PURE__ */ jsx5('button', {
              id: 'react-scan-next-focus',
              title: 'Next element',
              onClick: onNextFocus,
              className: 'flex items-center justify-center px-3',
              children: /* @__PURE__ */ jsx5(Icon, { name: 'icon-next' }),
            }),
          ],
        }),
      /* @__PURE__ */ jsxs2('div', {
        className: cn('flex items-center justify-center whitespace-nowrap py-1.5 px-2 text-sm text-white', {
          'ml-auto': !isInspectFocused,
        }),
        children: ['react-scan', /* @__PURE__ */ jsx5(FpsMeter, {})],
      }),
    ],
  });
};
var toolbar_default = Toolbar;

// src/core/web/components/widget/index.tsx
import { jsx as jsx6, jsxs as jsxs3 } from 'preact/jsx-runtime';
var Widget = () => {
  const refShouldExpand = useRef3(false);
  const refContainer = useRef3(null);
  const refContent = useRef3(null);
  const refPropContainer = useRef3(null);
  const refFooter = useRef3(null);
  const refInitialMinimizedWidth = useRef3(0);
  const refInitialMinimizedHeight = useRef3(0);
  const updateWidgetPosition = useCallback3((shouldSave = true) => {
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
  const handleMouseDown = useCallback3((e) => {
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
  useEffect5(() => {
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
  return /* @__PURE__ */ jsxs3('div', {
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
      /* @__PURE__ */ jsxs3('div', {
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
          /* @__PURE__ */ jsx6(Header, {}),
          /* @__PURE__ */ jsx6('div', {
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
      /* @__PURE__ */ jsx6('div', {
        ref: refFooter,
        className: cn(
          'h-9',
          'flex items-center justify-between',
          'transition-colors duration-200',
          'overflow-hidden',
          'rounded-lg',
        ),
        children: /* @__PURE__ */ jsx6(toolbar_default, { refPropContainer }),
      }),
      /* @__PURE__ */ jsx6(ResizeHandle, { position: 'top' }),
      /* @__PURE__ */ jsx6(ResizeHandle, { position: 'bottom' }),
      /* @__PURE__ */ jsx6(ResizeHandle, { position: 'left' }),
      /* @__PURE__ */ jsx6(ResizeHandle, { position: 'right' }),
      /* @__PURE__ */ jsx6(ResizeHandle, { position: 'top-left' }),
      /* @__PURE__ */ jsx6(ResizeHandle, { position: 'top-right' }),
      /* @__PURE__ */ jsx6(ResizeHandle, { position: 'bottom-left' }),
      /* @__PURE__ */ jsx6(ResizeHandle, { position: 'bottom-right' }),
    ],
  });
};

// src/core/web/toolbar.tsx
import { jsx as jsx7 } from 'preact/jsx-runtime';
var createToolbar = (root) => {
  const container = document.createElement('div');
  root.appendChild(container);
  render(/* @__PURE__ */ jsx7(Widget, {}), container);
  const originalRemove = container.remove.bind(container);
  container.remove = function () {
    if (container.hasChildNodes()) {
      render(null, container);
      render(null, container);
    }
    originalRemove();
  };
  return container;
};

// src/core/web/assets/css/styles.css
var styles_default =
  '*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.16 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::-moz-placeholder, textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.\\!container{width:100%!important}.container{width:100%}@media (min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media (min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media (min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media (min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media (min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-0{bottom:0}.left-0{left:0}.right-0{right:0}.top-0{top:0}.z-50{z-index:50}.z-\\[124124124124\\]{z-index:124124124124}.m-\\[2px\\]{margin:2px}.ml-2{margin-left:.5rem}.ml-auto{margin-left:auto}.block{display:block}.inline{display:inline}.flex{display:flex}.table{display:table}.hidden{display:none}.h-10{height:2.5rem}.h-12{height:3rem}.h-6{height:1.5rem}.h-8{height:2rem}.h-9{height:2.25rem}.h-full{height:100%}.max-h-9{max-height:2.25rem}.min-h-9{min-height:2.25rem}.w-6{width:1.5rem}.w-fit{width:-moz-fit-content;width:fit-content}.w-full{width:100%}.flex-1{flex:1 1 0%}.grow{flex-grow:1}.origin-center{transform-origin:center}.-translate-x-3\\/4{--tw-translate-x:-75%}.-translate-x-3\\/4,.-translate-x-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-x-full{--tw-translate-x:-100%}.-translate-y-3\\/4{--tw-translate-y:-75%}.-translate-y-3\\/4,.-translate-y-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-full{--tw-translate-y:-100%}.translate-x-3\\/4{--tw-translate-x:75%}.translate-x-3\\/4,.translate-x-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-full{--tw-translate-x:100%}.translate-y-3\\/4{--tw-translate-y:75%}.translate-y-3\\/4,.translate-y-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-full{--tw-translate-y:100%}.-rotate-45{--tw-rotate:-45deg}.-rotate-45,.rotate-45{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-45{--tw-rotate:45deg}.rotate-90{--tw-rotate:90deg}.rotate-90,.rotate-\\[135deg\\]{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-\\[135deg\\]{--tw-rotate:135deg}.rotate-\\[225deg\\]{--tw-rotate:225deg}.rotate-\\[225deg\\],.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.animate-fade-in{animation:fadeIn ease-in forwards}.cursor-ew-resize{cursor:ew-resize}.cursor-move{cursor:move}.cursor-nesw-resize{cursor:nesw-resize}.cursor-ns-resize{cursor:ns-resize}.cursor-nwse-resize{cursor:nwse-resize}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.resize{resize:both}.flex-col{flex-direction:column}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.space-y-1\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.375rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem*var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-x-hidden{overflow-x:hidden}.truncate{overflow:hidden;text-overflow:ellipsis}.truncate,.whitespace-nowrap{white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.border{border-width:1px}.border-4{border-width:4px}.border-l-1{border-left-width:1px}.border-white\\/10{border-color:hsla(0,0%,100%,.1)}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.bg-neutral-700{--tw-bg-opacity:1;background-color:rgb(64 64 64/var(--tw-bg-opacity,1))}.p-6{padding:1.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.font-mono{font-family:Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace}.text-\\[13px\\]{font-size:13px}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.text-xxs{font-size:.5rem}.font-bold{font-weight:700}.lowercase{text-transform:lowercase}.text-\\[\\#7b51c8\\]{--tw-text-opacity:1;color:rgb(123 81 200/var(--tw-text-opacity,1))}.text-\\[\\#999\\]{--tw-text-opacity:1;color:rgb(153 153 153/var(--tw-text-opacity,1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.opacity-0{opacity:0}.opacity-100{opacity:1}.\\!shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)!important;--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)!important;box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)!important}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.outline{outline-style:solid}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.\\!filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)!important}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-\\[transform\\2c opacity\\]{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.delay-0{transition-delay:0s}.delay-150{transition-delay:.15s}.delay-500{transition-delay:.5s}.duration-0{transition-duration:0s}.duration-150{transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-300{transition-duration:.3s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}.will-change-transform{will-change:transform}.animation-duration-300{animation-duration:.3s}.animation-delay-300{animation-delay:.3s}*{outline:none!important;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;backface-visibility:hidden;&::-webkit-scrollbar{width:6px;height:6px}&::-webkit-scrollbar-track{border-radius:10px;background:transparent}&::-webkit-scrollbar-thumb{border-radius:10px;background:hsla(0,0%,100%,.3)}&::-webkit-scrollbar-thumb:hover{background:hsla(0,0%,100%,.4)}}@-moz-document url-prefix(){*{scrollbar-width:thin;scrollbar-color:hsla(0,0%,100%,.4) transparent;scrollbar-width:6px}}button:hover{background-image:none}button{outline:2px solid transparent;outline-offset:2px;border-style:none;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;cursor:pointer}.with-data-text{overflow:hidden;&:before{content:attr(data-text);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}#react-scan-toolbar{position:fixed;left:0;top:0;display:flex;flex-direction:column;border-radius:.5rem;--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);font-family:Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace;font-size:13px;--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1));--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1));-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:move;opacity:0;z-index:2147483678}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}#react-scan-toolbar{animation:fadeIn ease-in forwards;animation-duration:.3s;animation-delay:.3s;--tw-shadow:0 4px 12px rgba(0,0,0,.2);--tw-shadow-colored:0 4px 12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.react-scan-header{display:flex;align-items:center;-moz-column-gap:.5rem;column-gap:.5rem;padding-left:.75rem;padding-right:.5rem;min-height:2.25rem;border-top-left-radius:.5rem;border-top-right-radius:.5rem;border-bottom-width:1px;border-color:hsla(0,0%,100%,.1);overflow:hidden;white-space:nowrap}.react-scan-close-button,.react-scan-replay-button{display:flex;align-items:center;padding:.25rem;min-width:-moz-fit-content;min-width:fit-content;border-radius:.25rem;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.react-scan-replay-button{position:relative;overflow:hidden;background-color:rgba(168,85,247,.5)!important;&:hover{background-color:rgba(168,85,247,.25)}&.disabled{opacity:.5;pointer-events:none}&:before{content:"";position:absolute;inset:0;--tw-translate-x:-100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));animation:shimmer 2s infinite;background:linear-gradient(90deg,transparent,rgba(142,97,227,.3),transparent)}}.react-scan-close-button{background-color:hsla(0,0%,100%,.1);&:hover{background-color:hsla(0,0%,100%,.15)}}@keyframes shimmer{to{transform:translateX(100%)}}.react-scan-inspector{font-size:13px;color:#fff;width:100%}.react-scan-section{display:flex;flex-direction:column;padding:.5rem 1rem;--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1));--tw-text-opacity:1;color:rgb(136 136 136/var(--tw-text-opacity,1))}.react-scan-section:before{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity,1));--tw-content:attr(data-section);content:var(--tw-content)}.react-scan-section{>div{margin-left:.5rem;min-height:1.5rem}}.react-scan-property{position:relative;display:flex;flex-direction:column;padding-top:.25rem;padding-left:1.5rem;border-left-width:1px;border-color:transparent;overflow:hidden}.react-scan-key{color:#fff}.react-scan-warning{padding-right:4px}.react-scan-string{color:#9ecbff}.react-scan-number{color:#79c7ff}.react-scan-boolean{color:#56b6c2}.react-scan-input{background:#000;border:none;color:#fff}.react-scan-array,.react-scan-object-key{color:#fff}.react-scan-expandable{display:flex;align-items:flex-start}.react-scan-arrow{position:absolute;top:.5rem;left:1.5rem;cursor:pointer;height:1.5rem;width:1.5rem;--tw-translate-x:-100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));z-index:10;&:before{content:"\u25B6";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;--tw-text-opacity:1;color:rgb(136 136 136/var(--tw-text-opacity,1));font-size:8px;transform-origin:center;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}}.react-scan-expanded>.react-scan-arrow:before{transform:rotate(90deg)}.react-scan-property-content{display:flex;flex:1 1 0%;flex-direction:column;padding-top:.25rem;max-width:100%;overflow:hidden}.react-scan-hidden{display:none}.react-scan-array-container{overflow-y:auto;margin-left:1.25rem;margin-top:8px;padding-left:8px}.react-scan-array-container,.react-scan-nested-object{border-left:1px solid hsla(0,0%,100%,.1)}.react-scan-preview-line{position:relative;display:flex;min-height:1.5rem;align-items:center}.react-scan-flash-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background-color:#8e61e3;pointer-events:none;opacity:0;z-index:999999;mix-blend-mode:multiply;transition:opacity .15s ease-in;border-radius:4px}.react-scan-flash-active{opacity:.4;transition:opacity .3s ease-in-out}#react-scan-toolbar button:hover{background:hsla(0,0%,100%,.1)}#react-scan-toolbar button:active{background:hsla(0,0%,100%,.15)}#react-scan-toolbar button:focus-visible{outline:2px solid #0070f3;outline-offset:-2px}.nav-button{opacity:var(--nav-opacity,1)}.react-scan-toolbar{border:1px solid blue}.group:hover .group-hover\\:-translate-x-1\\/4{--tw-translate-x:-25%}.group:hover .group-hover\\:-translate-x-1\\/4,.group:hover .group-hover\\:-translate-y-1\\/4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:-translate-y-1\\/4{--tw-translate-y:-25%}.group:hover .group-hover\\:translate-x-0{--tw-translate-x:0px}.group:hover .group-hover\\:translate-x-0,.group:hover .group-hover\\:translate-x-1\\/4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:translate-x-1\\/4{--tw-translate-x:25%}.group:hover .group-hover\\:translate-y-0{--tw-translate-y:0px}.group:hover .group-hover\\:translate-y-0,.group:hover .group-hover\\:translate-y-1\\/4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:translate-y-1\\/4{--tw-translate-y:25%}.group:hover .group-hover\\:opacity-100{opacity:1}.group:hover .group-hover\\:delay-0{transition-delay:0s}.group:active .group-active\\:opacity-0{opacity:0}.group:active .group-active\\:opacity-100{opacity:1}.group:active .group-active\\:delay-0{transition-delay:0s}';

// src/core/index.ts
var toolbarContainer = null;
var shadowRoot = null;
var Store = {
  wasDetailsOpen: signal3(true),
  isInIframe: signal3(typeof window !== 'undefined' && window.self !== window.top),
  inspectState: signal3({
    kind: 'uninitialized',
  }),
  monitor: signal3(null),
  fiberRoots: /* @__PURE__ */ new WeakSet(),
  reportData: /* @__PURE__ */ new WeakMap(),
  legacyReportData: /* @__PURE__ */ new Map(),
  lastReportTime: signal3(0),
};
var ReactScanInternals = {
  instrumentation: null,
  componentAllowList: null,
  options: signal3({
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
var getReport = (type) => {
  if (type) {
    for (const reportData of Array.from(Store.legacyReportData.values())) {
      if (reportData.type === type) {
        return reportData;
      }
    }
    return null;
  }
  return Store.legacyReportData;
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
var getOptions = () => ReactScanInternals.options;
var reportRender = (fiber, renders) => {
  const reportFiber = fiber;
  const { selfTime } = getTimings2(fiber.type);
  const displayName = getDisplayName4(fiber.type);
  Store.lastReportTime.value = Date.now();
  const currentFiberData = Store.reportData.get(reportFiber) ?? {
    count: 0,
    time: 0,
    renders: [],
    displayName,
    type: null,
  };
  currentFiberData.count = Number(currentFiberData.count || 0) + Number(renders.length);
  currentFiberData.time = Number(currentFiberData.time || 0) + Number(selfTime || 0);
  currentFiberData.renders = renders;
  Store.reportData.set(reportFiber, currentFiberData);
  if (displayName && ReactScanInternals.options.value.report) {
    const existingLegacyData = Store.legacyReportData.get(displayName) ?? {
      count: 0,
      time: 0,
      renders: [],
      displayName: null,
      type: getType3(fiber.type) || fiber.type,
    };
    existingLegacyData.count = existingLegacyData.time = Number(existingLegacyData.time || 0) + Number(selfTime || 0);
    existingLegacyData.renders = renders;
    Store.legacyReportData.set(displayName, existingLegacyData);
  }
};
var isValidFiber = (fiber) => {
  if (ignoredProps.has(fiber.memoizedProps)) {
    return false;
  }
  const allowList = ReactScanInternals.componentAllowList;
  const shouldAllow = allowList?.has(fiber.type) ?? allowList?.has(fiber.elementType);
  if (shouldAllow) {
    const parent = traverseFiber2(
      fiber,
      (node) => {
        const options = allowList?.get(node.type) ?? allowList?.get(node.elementType);
        return options?.includeChildren;
      },
      true,
    );
    if (!parent && !shouldAllow) return false;
  }
  return true;
};
var flushInterval;
var startFlushOutlineInterval = (ctx) => {
  clearInterval(flushInterval);
  setInterval(() => {
    requestAnimationFrame(() => {
      flushOutlines(ctx);
    });
  }, 30);
};
var updateScheduledOutlines = (fiber, renders) => {
  for (let i = 0, len = renders.length; i < len; i++) {
    const render2 = renders[i];
    const domFiber = getNearestHostFiber(fiber);
    if (!domFiber || !domFiber.stateNode) continue;
    if (ReactScanInternals.scheduledOutlines.has(fiber)) {
      const existingOutline = ReactScanInternals.scheduledOutlines.get(fiber);
      aggregateRender(render2, existingOutline.aggregatedRender);
    } else {
      ReactScanInternals.scheduledOutlines.set(fiber, {
        domNode: domFiber.stateNode,
        aggregatedRender: {
          computedCurrent: null,
          name: renders.find((render3) => render3.componentName)?.componentName ?? 'N/A',
          aggregatedCount: 1,
          changes: aggregateChanges(render2.changes),
          didCommit: render2.didCommit,
          forget: render2.forget,
          fps: render2.fps,
          phase: /* @__PURE__ */ new Set([render2.phase]),
          time: render2.time,
          unnecessary: render2.unnecessary,
          frame: 0,
          computedKey: null,
        },
        alpha: null,
        groupedAggregatedRender: null,
        target: null,
        current: null,
        totalFrames: null,
        estimatedTextWidth: null,
      });
    }
  }
};
var isProduction = null;
var rdtHook;
var getIsProduction = () => {
  if (isProduction !== null) {
    return isProduction;
  }
  rdtHook ??= getRDTHook();
  for (const renderer of rdtHook.renderers.values()) {
    const buildType = detectReactBuildType(renderer);
    if (buildType === 'production') {
      isProduction = true;
    }
  }
  return isProduction;
};
var start = () => {
  if (typeof window === 'undefined') return;
  if (getIsProduction() && !ReactScanInternals.options.value.dangerouslyForceRunInProduction) {
    return;
  }
  const rdtHook2 = getRDTHook();
  for (const renderer of rdtHook2.renderers.values()) {
    const buildType = detectReactBuildType(renderer);
    if (buildType === 'production') {
      isProduction = true;
    }
  }
  const localStorageOptions = readLocalStorage('react-scan-options');
  if (localStorageOptions) {
    const { enabled, playSound } = localStorageOptions;
    const validLocalOptions = validateOptions({ enabled, playSound });
    if (Object.keys(validLocalOptions).length > 0) {
      ReactScanInternals.options.value = {
        ...ReactScanInternals.options.value,
        ...validLocalOptions,
      };
    }
  }
  const audioContext =
    typeof window !== 'undefined'
      ? new (window.AudioContext || // @ts-expect-error -- This is a fallback for Safari
          window.webkitAudioContext)()
      : null;
  let ctx = null;
  const instrumentation = createInstrumentation('devtools', {
    onActive() {
      const existingRoot = document.querySelector('react-scan-root');
      if (existingRoot) {
        return;
      }
      const container = document.createElement('div');
      container.id = 'react-scan-root';
      shadowRoot = container.attachShadow({ mode: 'open' });
      const fragment = document.createDocumentFragment();
      const cssStyles = document.createElement('style');
      cssStyles.textContent = styles_default;
      const iconSprite = new DOMParser().parseFromString(ICONS, 'image/svg+xml').documentElement;
      shadowRoot.appendChild(iconSprite);
      const root = document.createElement('div');
      root.id = 'react-scan-toolbar-root';
      root.className = 'absolute z-2147483647';
      fragment.appendChild(cssStyles);
      fragment.appendChild(root);
      shadowRoot.appendChild(fragment);
      document.documentElement.appendChild(container);
      ctx = initReactScanOverlay();
      if (!ctx) return;
      startFlushOutlineInterval(ctx);
      createInspectElementStateMachine(shadowRoot);
      globalThis.__REACT_SCAN__ = {
        ReactScanInternals,
      };
      if (ReactScanInternals.options.value.showToolbar) {
        toolbarContainer = createToolbar(shadowRoot);
      }
      const existingOverlay = document.querySelector('react-scan-overlay');
      if (existingOverlay) {
        return;
      }
      const overlayElement = document.createElement('react-scan-overlay');
      document.documentElement.appendChild(overlayElement);
      logIntro();
    },
    onCommitStart() {
      ReactScanInternals.options.value.onCommitStart?.();
    },
    onError(error) {
      console.error('[React Scan] Error instrumenting:', error);
    },
    isValidFiber,
    onRender(fiber, renders) {
      if (
        (Boolean(ReactScanInternals.instrumentation?.isPaused.value) &&
          (Store.inspectState.value.kind === 'inspect-off' || Store.inspectState.value.kind === 'uninitialized')) ||
        !ctx ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }
      updateFiberRenderData(fiber, renders);
      if (ReactScanInternals.options.value.log) {
        log(renders);
      }
      if (isCompositeFiber2(fiber)) {
        if (ReactScanInternals.options.value.showToolbar !== false && Store.inspectState.value.kind === 'focused') {
          reportRender(fiber, renders);
        }
      }
      if (ReactScanInternals.options.value.log) {
        renders;
      }
      ReactScanInternals.options.value.onRender?.(fiber, renders);
      updateScheduledOutlines(fiber, renders);
      for (let i = 0, len = renders.length; i < len; i++) {
        const render2 = renders[i];
        if (ReactScanInternals.options.value.playSound && audioContext) {
          const renderTimeThreshold = 10;
          const amplitude = Math.min(1, ((render2.time ?? 0) - renderTimeThreshold) / (renderTimeThreshold * 2));
          playGeigerClickSound(audioContext, amplitude);
        }
      }
    },
    onCommitFinish() {
      ReactScanInternals.options.value.onCommitFinish?.();
    },
    trackChanges: true,
  });
  ReactScanInternals.instrumentation = instrumentation;
  if (!Store.monitor.value) {
    setTimeout(() => {
      if (isInstrumentationActive()) return;
      console.error('[React Scan] Failed to load. Must import React Scan before React runs.');
    }, 5e3);
  }
};
var withScan = (component, options = {}) => {
  setOptions(options);
  const isInIframe = Store.isInIframe.value;
  const componentAllowList = ReactScanInternals.componentAllowList;
  if (isInIframe || (options.enabled === false && options.showToolbar !== true)) return component;
  if (!componentAllowList) {
    ReactScanInternals.componentAllowList = /* @__PURE__ */ new WeakMap();
  }
  if (componentAllowList) {
    componentAllowList.set(component, { ...options });
  }
  start();
  return component;
};
var scan = (options = {}) => {
  setOptions(options);
  const isInIframe = Store.isInIframe.value;
  if (isInIframe || (options.enabled === false && options.showToolbar !== true)) return;
  start();
};
var useScan = (options = {}) => {
  setOptions(options);
  start();
};
var onRender = (type, _onRender) => {
  const prevOnRender = ReactScanInternals.onRender;
  ReactScanInternals.onRender = (fiber, renders) => {
    prevOnRender?.(fiber, renders);
    if (getType3(fiber.type) === type) {
      _onRender(fiber, renders);
    }
  };
};
var ignoredProps = /* @__PURE__ */ new WeakSet();
var ignoreScan = (node) => {
  if (typeof node === 'object' && node) {
    ignoredProps.add(node);
  }
};
export {
  ReactScanInternals,
  Store,
  getIsProduction,
  getOptions,
  getReport,
  ignoreScan,
  ignoredProps,
  isValidFiber,
  onRender,
  reportRender,
  scan,
  setOptions,
  start,
  useScan,
  withScan,
};

'use client';
!(function () {
  'use strict';
  var t = (t) => {
      try {
        Function.prototype.toString.call(t).indexOf('^_^') > -1 &&
          setTimeout(() => {
            throw new Error(
              'React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build',
            );
          });
      } catch {}
    },
    e = () => {},
    o = 'undefined' != typeof document && 'function' == typeof document.createElement,
    n = 'undefined' != typeof process && null != process.versions && null != process.versions.node;
  (!o && n) ||
    (() => {
      const o = new Map();
      let n = 0;
      const i = {
        checkDCE: t,
        supportsFiber: !0,
        supportsFlight: !0,
        renderers: o,
        onCommitFiberRoot: e,
        onCommitFiberUnmount: e,
        onPostCommitFiberRoot: e,
        inject(t) {
          const e = ++n;
          return o.set(e, t), i._instrumentationIsActive || (i._instrumentationIsActive = !0), e;
        },
        _instrumentationSource: 'bippy-0.0.25',
        _instrumentationIsActive: !1,
      };
      try {
        Object.defineProperty(globalThis, '__REACT_DEVTOOLS_GLOBAL_HOOK__', { configurable: !0, value: i });
      } catch {}
    })();
  /*! Bundled license information:

  bippy/dist/index.js:
    (**
     * @license bippy
     *
     * Copyright (c) Aiden Bai.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *)
  */
})();

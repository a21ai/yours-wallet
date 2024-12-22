'use client';
!(function (e) {
  'use strict';
  var t,
    n,
    o,
    r,
    i,
    a,
    s,
    l,
    c,
    d,
    u,
    p,
    f = 'bippy-0.0.25',
    h = (e) =>
      'object' == typeof e &&
      null != e &&
      '$$typeof' in e &&
      ['Symbol(react.element)', 'Symbol(react.transitional.element)'].includes(String(e.$$typeof)),
    m = (e) => 5 === e.tag || 26 === e.tag || 27 === e.tag,
    g = (e) => 0 === e.tag || 1 === e.tag || 15 === e.tag || 14 === e.tag || 11 === e.tag,
    v = (e, t) => {
      try {
        const n = e.memoizedProps,
          o = e.alternate?.memoizedProps || {},
          r = new Set([...Object.keys(o), ...Object.keys(n)]);
        for (const e of r) {
          const r = o?.[e],
            i = n?.[e];
          if (!0 === t(e, i, r)) return !0;
        }
      } catch {}
      return !1;
    },
    w = (e) => {
      const t = e.memoizedProps,
        n = e.alternate?.memoizedProps || {},
        o = e.flags ?? e.effectTag ?? 0;
      switch (e.tag) {
        case 1:
        case 0:
        case 9:
        case 11:
        case 14:
        case 15:
          return !(1 & ~o);
        default:
          return !e.alternate || n !== t || e.alternate.memoizedState !== e.memoizedState || e.alternate.ref !== e.ref;
      }
    },
    b = (e) => Boolean(!!(22 & e.flags) || !!(22 & e.subtreeFlags)),
    y = (e) => {
      switch (e.tag) {
        case 18:
        case 6:
        case 7:
        case 23:
        case 22:
          return !0;
        case 3:
          return !1;
        default: {
          const t = 'object' == typeof e.type && null !== e.type ? e.type.$$typeof : e.type;
          switch ('symbol' == typeof t ? t.toString() : t) {
            case 60111:
            case 'Symbol(react.concurrent_mode)':
            case 'Symbol(react.async_mode)':
              return !0;
            default:
              return !1;
          }
        }
      }
    },
    _ = (e) => {
      let t = x(e, m);
      return t || (t = x(e, m, !0)), t;
    },
    x = (e, t, n = !1) => {
      if (!e) return null;
      if (!0 === t(e)) return e;
      let o = n ? e.return : e.child;
      for (; o; ) {
        const e = x(o, t, n);
        if (e) return e;
        o = n ? null : o.sibling;
      }
      return null;
    },
    k = (e) => {
      const t = e?.actualDuration ?? 0;
      let n = t,
        o = e?.child ?? null;
      for (; t > 0 && null != o; ) (n -= o.actualDuration ?? 0), (o = o.sibling);
      return { selfTime: n, totalTime: t };
    },
    S = (e) => Boolean(e.updateQueue?.memoCache),
    C = (e) => ('function' == typeof e ? e : 'object' == typeof e && e ? C(e.type || e.render) : null),
    z = (e) => {
      if ('function' != typeof e && ('object' != typeof e || !e)) return null;
      const t = e.displayName || e.name || null;
      return t || ((e = C(e)) && (e.displayName || e.name)) || null;
    },
    E = (e) => {
      try {
        if ('string' == typeof e.version && e.bundleType > 0) return 'development';
      } catch {}
      return 'production';
    },
    M = (e) => {
      try {
        Function.prototype.toString.call(e).indexOf('^_^') > -1 &&
          setTimeout(() => {
            throw new Error(
              'React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build',
            );
          });
      } catch {}
    },
    $ = () => {},
    F = (e) => {
      const t = new Map();
      let n = 0;
      const o = {
        checkDCE: M,
        supportsFiber: !0,
        supportsFlight: !0,
        renderers: t,
        onCommitFiberRoot: $,
        onCommitFiberUnmount: $,
        onPostCommitFiberRoot: $,
        inject(r) {
          const i = ++n;
          return t.set(i, r), o._instrumentationIsActive || ((o._instrumentationIsActive = !0), e?.()), i;
        },
        _instrumentationSource: f,
        _instrumentationIsActive: !1,
      };
      try {
        Object.defineProperty(globalThis, '__REACT_DEVTOOLS_GLOBAL_HOOK__', { configurable: !0, value: o });
      } catch {}
      return o;
    },
    R = (e) => {
      let t = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      return t && e?.(), window.hasOwnProperty('__REACT_DEVTOOLS_GLOBAL_HOOK__') || (t = F(e)), t;
    },
    A = () => {
      const e = R();
      return Boolean(e._instrumentationIsActive) || null != globalThis.__REACT_DEVTOOLS_BACKEND_MANAGER_INJECTED__;
    },
    N = (e, t, n) => {
      let o = t;
      for (; null != o; ) {
        if ((!y(o) && w(o) && e(o, 'mount'), 13 === o.tag)) {
          if (null !== o.memoizedState) {
            const t = o.child,
              n = t ? t.sibling : null;
            if (n) {
              const t = n.child;
              null !== t && N(e, t, !1);
            }
          } else {
            let t = null;
            null !== o.child && (t = o.child.child), null !== t && N(e, t, !1);
          }
        } else null != o.child && N(e, o.child, !0);
        o = n ? o.sibling : null;
      }
    },
    O = (e, t, n, o) => {
      if (!n) return;
      const r = 13 === t.tag;
      !y(t) && w(t) && e(t, 'update');
      const i = r && null !== n.memoizedState,
        a = r && null !== t.memoizedState;
      if (i && a) {
        const o = t.child?.sibling ?? null,
          r = n.child?.sibling ?? null;
        null !== o && null !== r && O(e, o, r);
      } else if (i && !a) {
        const n = t.child;
        null !== n && N(e, n, !0);
      } else if (!i && a) {
        j(e, n);
        const o = t.child?.sibling ?? null;
        null !== o && N(e, o, !0);
      } else if (t.child !== n.child) {
        let n = t.child;
        for (; n; ) {
          if (n.alternate) {
            const t = n.alternate;
            O(e, n, t);
          } else N(e, n, !1);
          n = n.sibling;
        }
      }
    },
    P = (e, t) => {
      (!(3 === t.tag) && y(t)) || e(t, 'unmount');
    },
    j = (e, t) => {
      const n = 13 === t.tag && null !== t.memoizedState;
      let o = t.child;
      if (n) {
        const e = t.child,
          n = e?.sibling ?? null;
        o = n?.child ?? null;
      }
      for (; null !== o; ) null !== o.return && (P(e, o), j(e, o)), (o = o.sibling);
    },
    D = 0,
    L = new WeakMap(),
    H = 'undefined' != typeof document && 'function' == typeof document.createElement,
    T = 'undefined' != typeof process && null != process.versions && null != process.versions.node;
  (!H && T) || F();
  var W,
    I,
    U,
    q,
    B = {},
    V = [],
    G = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
    X = Array.isArray;
  function Y(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function K(e) {
    e && e.parentNode && e.parentNode.removeChild(e);
  }
  function J(e, n, o) {
    var r,
      i,
      a,
      s = {};
    for (a in n) 'key' == a ? (r = n[a]) : 'ref' == a ? (i = n[a]) : (s[a] = n[a]);
    if (
      (arguments.length > 2 && (s.children = arguments.length > 3 ? t.call(arguments, 2) : o),
      'function' == typeof e && null != e.defaultProps)
    )
      for (a in e.defaultProps) void 0 === s[a] && (s[a] = e.defaultProps[a]);
    return Z(e, s, r, i, null);
  }
  function Z(e, t, r, i, a) {
    var s = {
      type: e,
      props: t,
      key: r,
      ref: i,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __c: null,
      constructor: void 0,
      __v: null == a ? ++o : a,
      __i: -1,
      __u: 0,
    };
    return null == a && null != n.vnode && n.vnode(s), s;
  }
  function Q(e) {
    return e.children;
  }
  function ee(e, t) {
    (this.props = e), (this.context = t);
  }
  function te(e, t) {
    if (null == t) return e.__ ? te(e.__, e.__i + 1) : null;
    for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
    return 'function' == typeof e.type ? te(e) : null;
  }
  function ne(e) {
    var t, n;
    if (null != (e = e.__) && null != e.__c) {
      for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
        if (null != (n = e.__k[t]) && null != n.__e) {
          e.__e = e.__c.base = n.__e;
          break;
        }
      return ne(e);
    }
  }
  function oe(e) {
    ((!e.__d && (e.__d = !0) && i.push(e) && !re.__r++) || a !== n.debounceRendering) &&
      ((a = n.debounceRendering) || s)(re);
  }
  function re() {
    var e, t, o, r, a, s, c, d;
    for (i.sort(l); (e = i.shift()); )
      e.__d &&
        ((t = i.length),
        (r = void 0),
        (s = (a = (o = e).__v).__e),
        (c = []),
        (d = []),
        o.__P &&
          (((r = Y({}, a)).__v = a.__v + 1),
          n.vnode && n.vnode(r),
          pe(
            o.__P,
            r,
            a,
            o.__n,
            o.__P.namespaceURI,
            32 & a.__u ? [s] : null,
            c,
            null == s ? te(a) : s,
            !!(32 & a.__u),
            d,
          ),
          (r.__v = a.__v),
          (r.__.__k[r.__i] = r),
          fe(c, r, d),
          r.__e != s && ne(r)),
        i.length > t && i.sort(l));
    re.__r = 0;
  }
  function ie(e, t, n, o, r, i, a, s, l, c, d) {
    var u,
      p,
      f,
      h,
      m,
      g,
      v = (o && o.__k) || V,
      w = t.length;
    for (
      l = (function (e, t, n, o) {
        var r,
          i,
          a,
          s,
          l,
          c = t.length,
          d = n.length,
          u = d,
          p = 0;
        for (e.__k = [], r = 0; r < c; r++)
          null != (i = t[r]) && 'boolean' != typeof i && 'function' != typeof i
            ? ((s = r + p),
              ((i = e.__k[r] =
                'string' == typeof i || 'number' == typeof i || 'bigint' == typeof i || i.constructor == String
                  ? Z(null, i, null, null, null)
                  : X(i)
                    ? Z(Q, { children: i }, null, null, null)
                    : void 0 === i.constructor && i.__b > 0
                      ? Z(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v)
                      : i).__ = e),
              (i.__b = e.__b + 1),
              (a = null),
              -1 !== (l = i.__i = le(i, n, s, u)) && (u--, (a = n[l]) && (a.__u |= 2)),
              null == a || null === a.__v
                ? (-1 == l && p--, 'function' != typeof i.type && (i.__u |= 4))
                : l !== s && (l == s - 1 ? p-- : l == s + 1 ? p++ : (l > s ? p-- : p++, (i.__u |= 4))))
            : (i = e.__k[r] = null);
        if (u) for (r = 0; r < d; r++) null != (a = n[r]) && !(2 & a.__u) && (a.__e == o && (o = te(a)), me(a, a));
        return o;
      })(n, t, v, l),
        u = 0;
      u < w;
      u++
    )
      null != (f = n.__k[u]) &&
        ((p = -1 === f.__i ? B : v[f.__i] || B),
        (f.__i = u),
        (g = pe(e, f, p, r, i, a, s, l, c, d)),
        (h = f.__e),
        f.ref && p.ref != f.ref && (p.ref && he(p.ref, null, f), d.push(f.ref, f.__c || h, f)),
        null == m && null != h && (m = h),
        4 & f.__u || p.__k === f.__k
          ? (l = ae(f, l, e))
          : 'function' == typeof f.type && void 0 !== g
            ? (l = g)
            : h && (l = h.nextSibling),
        (f.__u &= -7));
    return (n.__e = m), l;
  }
  function ae(e, t, n) {
    var o, r;
    if ('function' == typeof e.type) {
      for (o = e.__k, r = 0; o && r < o.length; r++) o[r] && ((o[r].__ = e), (t = ae(o[r], t, n)));
      return t;
    }
    e.__e != t && (t && e.type && !n.contains(t) && (t = te(e)), n.insertBefore(e.__e, t || null), (t = e.__e));
    do {
      t = t && t.nextSibling;
    } while (null != t && 8 === t.nodeType);
    return t;
  }
  function se(e, t) {
    return (
      (t = t || []),
      null == e ||
        'boolean' == typeof e ||
        (X(e)
          ? e.some(function (e) {
              se(e, t);
            })
          : t.push(e)),
      t
    );
  }
  function le(e, t, n, o) {
    var r = e.key,
      i = e.type,
      a = n - 1,
      s = n + 1,
      l = t[n];
    if (null === l || (l && r == l.key && i === l.type && !(2 & l.__u))) return n;
    if (('function' != typeof i || i === Q || r) && o > (null == l || 2 & l.__u ? 0 : 1))
      for (; a >= 0 || s < t.length; ) {
        if (a >= 0) {
          if ((l = t[a]) && !(2 & l.__u) && r == l.key && i === l.type) return a;
          a--;
        }
        if (s < t.length) {
          if ((l = t[s]) && !(2 & l.__u) && r == l.key && i === l.type) return s;
          s++;
        }
      }
    return -1;
  }
  function ce(e, t, n) {
    '-' === t[0]
      ? e.setProperty(t, null == n ? '' : n)
      : (e[t] = null == n ? '' : 'number' != typeof n || G.test(t) ? n : n + 'px');
  }
  function de(e, t, n, o, r) {
    var i;
    e: if ('style' === t)
      if ('string' == typeof n) e.style.cssText = n;
      else {
        if (('string' == typeof o && (e.style.cssText = o = ''), o)) for (t in o) (n && t in n) || ce(e.style, t, '');
        if (n) for (t in n) (o && n[t] === o[t]) || ce(e.style, t, n[t]);
      }
    else if ('o' === t[0] && 'n' === t[1])
      (i = t !== (t = t.replace(c, '$1'))),
        (t = t.toLowerCase() in e || 'onFocusOut' === t || 'onFocusIn' === t ? t.toLowerCase().slice(2) : t.slice(2)),
        e.l || (e.l = {}),
        (e.l[t + i] = n),
        n
          ? o
            ? (n.u = o.u)
            : ((n.u = d), e.addEventListener(t, i ? p : u, i))
          : e.removeEventListener(t, i ? p : u, i);
    else {
      if ('http://www.w3.org/2000/svg' == r) t = t.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's');
      else if (
        'width' != t &&
        'height' != t &&
        'href' != t &&
        'list' != t &&
        'form' != t &&
        'tabIndex' != t &&
        'download' != t &&
        'rowSpan' != t &&
        'colSpan' != t &&
        'role' != t &&
        'popover' != t &&
        t in e
      )
        try {
          e[t] = null == n ? '' : n;
          break e;
        } catch (e) {}
      'function' == typeof n ||
        (null == n || (!1 === n && '-' !== t[4])
          ? e.removeAttribute(t)
          : e.setAttribute(t, 'popover' == t && 1 == n ? '' : n));
    }
  }
  function ue(e) {
    return function (t) {
      if (this.l) {
        var o = this.l[t.type + e];
        if (null == t.t) t.t = d++;
        else if (t.t < o.u) return;
        return o(n.event ? n.event(t) : t);
      }
    };
  }
  function pe(e, o, r, i, a, s, l, c, d, u) {
    var p,
      f,
      h,
      m,
      g,
      v,
      w,
      b,
      y,
      _,
      x,
      k,
      S,
      C,
      z,
      E,
      M,
      $ = o.type;
    if (void 0 !== o.constructor) return null;
    128 & r.__u && ((d = !!(32 & r.__u)), (s = [(c = o.__e = r.__e)])), (p = n.__b) && p(o);
    e: if ('function' == typeof $)
      try {
        if (
          ((b = o.props),
          (y = 'prototype' in $ && $.prototype.render),
          (_ = (p = $.contextType) && i[p.__c]),
          (x = p ? (_ ? _.props.value : p.__) : i),
          r.__c
            ? (w = (f = o.__c = r.__c).__ = f.__E)
            : (y ? (o.__c = f = new $(b, x)) : ((o.__c = f = new ee(b, x)), (f.constructor = $), (f.render = ge)),
              _ && _.sub(f),
              (f.props = b),
              f.state || (f.state = {}),
              (f.context = x),
              (f.__n = i),
              (h = f.__d = !0),
              (f.__h = []),
              (f._sb = [])),
          y && null == f.__s && (f.__s = f.state),
          y &&
            null != $.getDerivedStateFromProps &&
            (f.__s == f.state && (f.__s = Y({}, f.__s)), Y(f.__s, $.getDerivedStateFromProps(b, f.__s))),
          (m = f.props),
          (g = f.state),
          (f.__v = o),
          h)
        )
          y && null == $.getDerivedStateFromProps && null != f.componentWillMount && f.componentWillMount(),
            y && null != f.componentDidMount && f.__h.push(f.componentDidMount);
        else {
          if (
            (y &&
              null == $.getDerivedStateFromProps &&
              b !== m &&
              null != f.componentWillReceiveProps &&
              f.componentWillReceiveProps(b, x),
            !f.__e &&
              ((null != f.shouldComponentUpdate && !1 === f.shouldComponentUpdate(b, f.__s, x)) || o.__v === r.__v))
          ) {
            for (
              o.__v !== r.__v && ((f.props = b), (f.state = f.__s), (f.__d = !1)),
                o.__e = r.__e,
                o.__k = r.__k,
                o.__k.some(function (e) {
                  e && (e.__ = o);
                }),
                k = 0;
              k < f._sb.length;
              k++
            )
              f.__h.push(f._sb[k]);
            (f._sb = []), f.__h.length && l.push(f);
            break e;
          }
          null != f.componentWillUpdate && f.componentWillUpdate(b, f.__s, x),
            y &&
              null != f.componentDidUpdate &&
              f.__h.push(function () {
                f.componentDidUpdate(m, g, v);
              });
        }
        if (((f.context = x), (f.props = b), (f.__P = e), (f.__e = !1), (S = n.__r), (C = 0), y)) {
          for (
            f.state = f.__s, f.__d = !1, S && S(o), p = f.render(f.props, f.state, f.context), z = 0;
            z < f._sb.length;
            z++
          )
            f.__h.push(f._sb[z]);
          f._sb = [];
        } else
          do {
            (f.__d = !1), S && S(o), (p = f.render(f.props, f.state, f.context)), (f.state = f.__s);
          } while (f.__d && ++C < 25);
        (f.state = f.__s),
          null != f.getChildContext && (i = Y(Y({}, i), f.getChildContext())),
          y && !h && null != f.getSnapshotBeforeUpdate && (v = f.getSnapshotBeforeUpdate(m, g)),
          (c = ie(
            e,
            X((E = null != p && p.type === Q && null == p.key ? p.props.children : p)) ? E : [E],
            o,
            r,
            i,
            a,
            s,
            l,
            c,
            d,
            u,
          )),
          (f.base = o.__e),
          (o.__u &= -161),
          f.__h.length && l.push(f),
          w && (f.__E = f.__ = null);
      } catch (e) {
        if (((o.__v = null), d || null != s))
          if (e.then) {
            for (o.__u |= d ? 160 : 128; c && 8 === c.nodeType && c.nextSibling; ) c = c.nextSibling;
            (s[s.indexOf(c)] = null), (o.__e = c);
          } else for (M = s.length; M--; ) K(s[M]);
        else (o.__e = r.__e), (o.__k = r.__k);
        n.__e(e, o, r);
      }
    else
      null == s && o.__v === r.__v
        ? ((o.__k = r.__k), (o.__e = r.__e))
        : (c = o.__e =
            (function (e, o, r, i, a, s, l, c, d) {
              var u,
                p,
                f,
                h,
                m,
                g,
                v,
                w = r.props,
                b = o.props,
                y = o.type;
              if (
                ('svg' === y
                  ? (a = 'http://www.w3.org/2000/svg')
                  : 'math' === y
                    ? (a = 'http://www.w3.org/1998/Math/MathML')
                    : a || (a = 'http://www.w3.org/1999/xhtml'),
                null != s)
              )
                for (u = 0; u < s.length; u++)
                  if ((m = s[u]) && 'setAttribute' in m == !!y && (y ? m.localName === y : 3 === m.nodeType)) {
                    (e = m), (s[u] = null);
                    break;
                  }
              if (null == e) {
                if (null === y) return document.createTextNode(b);
                (e = document.createElementNS(a, y, b.is && b)), c && (n.__m && n.__m(o, s), (c = !1)), (s = null);
              }
              if (null === y) w === b || (c && e.data === b) || (e.data = b);
              else {
                if (((s = s && t.call(e.childNodes)), (w = r.props || B), !c && null != s))
                  for (w = {}, u = 0; u < e.attributes.length; u++) w[(m = e.attributes[u]).name] = m.value;
                for (u in w)
                  if (((m = w[u]), 'children' == u));
                  else if ('dangerouslySetInnerHTML' == u) f = m;
                  else if (!(u in b)) {
                    if (('value' == u && 'defaultValue' in b) || ('checked' == u && 'defaultChecked' in b)) continue;
                    de(e, u, null, m, a);
                  }
                for (u in b)
                  (m = b[u]),
                    'children' == u
                      ? (h = m)
                      : 'dangerouslySetInnerHTML' == u
                        ? (p = m)
                        : 'value' == u
                          ? (g = m)
                          : 'checked' == u
                            ? (v = m)
                            : (c && 'function' != typeof m) || w[u] === m || de(e, u, m, w[u], a);
                if (p)
                  c || (f && (p.__html === f.__html || p.__html === e.innerHTML)) || (e.innerHTML = p.__html),
                    (o.__k = []);
                else if (
                  (f && (e.innerHTML = ''),
                  ie(
                    e,
                    X(h) ? h : [h],
                    o,
                    r,
                    i,
                    'foreignObject' === y ? 'http://www.w3.org/1999/xhtml' : a,
                    s,
                    l,
                    s ? s[0] : r.__k && te(r, 0),
                    c,
                    d,
                  ),
                  null != s)
                )
                  for (u = s.length; u--; ) K(s[u]);
                c ||
                  ((u = 'value'),
                  'progress' === y && null == g
                    ? e.removeAttribute('value')
                    : void 0 !== g &&
                      (g !== e[u] || ('progress' === y && !g) || ('option' === y && g !== w[u])) &&
                      de(e, u, g, w[u], a),
                  (u = 'checked'),
                  void 0 !== v && v !== e[u] && de(e, u, v, w[u], a));
              }
              return e;
            })(r.__e, o, r, i, a, s, l, d, u));
    return (p = n.diffed) && p(o), 128 & o.__u ? void 0 : c;
  }
  function fe(e, t, o) {
    for (var r = 0; r < o.length; r++) he(o[r], o[++r], o[++r]);
    n.__c && n.__c(t, e),
      e.some(function (t) {
        try {
          (e = t.__h),
            (t.__h = []),
            e.some(function (e) {
              e.call(t);
            });
        } catch (e) {
          n.__e(e, t.__v);
        }
      });
  }
  function he(e, t, o) {
    try {
      if ('function' == typeof e) {
        var r = 'function' == typeof e.__u;
        r && e.__u(), (r && null == t) || (e.__u = e(t));
      } else e.current = t;
    } catch (e) {
      n.__e(e, o);
    }
  }
  function me(e, t, o) {
    var r, i;
    if (
      (n.unmount && n.unmount(e),
      (r = e.ref) && ((r.current && r.current !== e.__e) || he(r, null, t)),
      null != (r = e.__c))
    ) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount();
        } catch (e) {
          n.__e(e, t);
        }
      r.base = r.__P = null;
    }
    if ((r = e.__k)) for (i = 0; i < r.length; i++) r[i] && me(r[i], t, o || 'function' != typeof e.type);
    o || K(e.__e), (e.__c = e.__ = e.__e = void 0);
  }
  function ge(e, t, n) {
    return this.constructor(e, n);
  }
  function ve(e, o, r) {
    var i, a, s, l;
    o === document && (o = document.documentElement),
      n.__ && n.__(e, o),
      (a = (i = 'function' == typeof r) ? null : o.__k),
      (s = []),
      (l = []),
      pe(
        o,
        (e = ((!i && r) || o).__k = J(Q, null, [e])),
        a || B,
        B,
        o.namespaceURI,
        !i && r ? [r] : a ? null : o.firstChild ? t.call(o.childNodes) : null,
        s,
        !i && r ? r : a ? a.__e : o.firstChild,
        i,
        l,
      ),
      fe(s, e, l);
  }
  (t = V.slice),
    (n = {
      __e: function (e, t, n, o) {
        for (var r, i, a; (t = t.__); )
          if ((r = t.__c) && !r.__)
            try {
              if (
                ((i = r.constructor) &&
                  null != i.getDerivedStateFromError &&
                  (r.setState(i.getDerivedStateFromError(e)), (a = r.__d)),
                null != r.componentDidCatch && (r.componentDidCatch(e, o || {}), (a = r.__d)),
                a)
              )
                return (r.__E = r);
            } catch (t) {
              e = t;
            }
        throw e;
      },
    }),
    (o = 0),
    (r = function (e) {
      return null != e && null == e.constructor;
    }),
    (ee.prototype.setState = function (e, t) {
      var n;
      (n = null != this.__s && this.__s !== this.state ? this.__s : (this.__s = Y({}, this.state))),
        'function' == typeof e && (e = e(Y({}, n), this.props)),
        e && Y(n, e),
        null != e && this.__v && (t && this._sb.push(t), oe(this));
    }),
    (ee.prototype.forceUpdate = function (e) {
      this.__v && ((this.__e = !0), e && this.__h.push(e), oe(this));
    }),
    (ee.prototype.render = Q),
    (i = []),
    (s = 'function' == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
    (l = function (e, t) {
      return e.__v.__b - t.__v.__b;
    }),
    (re.__r = 0),
    (c = /(PointerCapture)$|Capture$/i),
    (d = 0),
    (u = ue(!1)),
    (p = ue(!0));
  var we = 0,
    be = [],
    ye = n,
    _e = ye.__b,
    xe = ye.__r,
    ke = ye.diffed,
    Se = ye.__c,
    Ce = ye.unmount,
    ze = ye.__;
  function Ee(e, t) {
    ye.__h && ye.__h(I, e, we || t), (we = 0);
    var n = I.__H || (I.__H = { __: [], __h: [] });
    return e >= n.__.length && n.__.push({}), n.__[e];
  }
  function Me(e) {
    return (
      (we = 1),
      (function (e, t) {
        var n = Ee(W++, 2);
        if (
          ((n.t = e),
          !n.__c &&
            ((n.__ = [
              He(void 0, t),
              function (e) {
                var t = n.__N ? n.__N[0] : n.__[0],
                  o = n.t(t, e);
                t !== o && ((n.__N = [o, n.__[1]]), n.__c.setState({}));
              },
            ]),
            (n.__c = I),
            !I.u))
        ) {
          var o = function (e, t, o) {
            if (!n.__c.__H) return !0;
            var i = n.__c.__H.__.filter(function (e) {
              return !!e.__c;
            });
            if (
              i.every(function (e) {
                return !e.__N;
              })
            )
              return !r || r.call(this, e, t, o);
            var a = n.__c.props !== e;
            return (
              i.forEach(function (e) {
                if (e.__N) {
                  var t = e.__[0];
                  (e.__ = e.__N), (e.__N = void 0), t !== e.__[0] && (a = !0);
                }
              }),
              (r && r.call(this, e, t, o)) || a
            );
          };
          I.u = !0;
          var r = I.shouldComponentUpdate,
            i = I.componentWillUpdate;
          (I.componentWillUpdate = function (e, t, n) {
            if (this.__e) {
              var a = r;
              (r = void 0), o(e, t, n), (r = a);
            }
            i && i.call(this, e, t, n);
          }),
            (I.shouldComponentUpdate = o);
        }
        return n.__N || n.__;
      })(He, e)
    );
  }
  function $e(e, t) {
    var n = Ee(W++, 3);
    !ye.__s && Le(n.__H, t) && ((n.__ = e), (n.i = t), I.__H.__h.push(n));
  }
  function Fe(e) {
    return (
      (we = 5),
      Re(function () {
        return { current: e };
      }, [])
    );
  }
  function Re(e, t) {
    var n = Ee(W++, 7);
    return Le(n.__H, t) && ((n.__ = e()), (n.__H = t), (n.__h = e)), n.__;
  }
  function Ae(e, t) {
    return (
      (we = 8),
      Re(function () {
        return e;
      }, t)
    );
  }
  function Ne() {
    for (var e; (e = be.shift()); )
      if (e.__P && e.__H)
        try {
          e.__H.__h.forEach(je), e.__H.__h.forEach(De), (e.__H.__h = []);
        } catch (t) {
          (e.__H.__h = []), ye.__e(t, e.__v);
        }
  }
  (ye.__b = function (e) {
    (I = null), _e && _e(e);
  }),
    (ye.__ = function (e, t) {
      e && t.__k && t.__k.__m && (e.__m = t.__k.__m), ze && ze(e, t);
    }),
    (ye.__r = function (e) {
      xe && xe(e), (W = 0);
      var t = (I = e.__c).__H;
      t &&
        (U === I
          ? ((t.__h = []),
            (I.__h = []),
            t.__.forEach(function (e) {
              e.__N && (e.__ = e.__N), (e.i = e.__N = void 0);
            }))
          : (t.__h.forEach(je), t.__h.forEach(De), (t.__h = []), (W = 0))),
        (U = I);
    }),
    (ye.diffed = function (e) {
      ke && ke(e);
      var t = e.__c;
      t &&
        t.__H &&
        (t.__H.__h.length &&
          ((1 !== be.push(t) && q === ye.requestAnimationFrame) || ((q = ye.requestAnimationFrame) || Pe)(Ne)),
        t.__H.__.forEach(function (e) {
          e.i && (e.__H = e.i), (e.i = void 0);
        })),
        (U = I = null);
    }),
    (ye.__c = function (e, t) {
      t.some(function (e) {
        try {
          e.__h.forEach(je),
            (e.__h = e.__h.filter(function (e) {
              return !e.__ || De(e);
            }));
        } catch (n) {
          t.some(function (e) {
            e.__h && (e.__h = []);
          }),
            (t = []),
            ye.__e(n, e.__v);
        }
      }),
        Se && Se(e, t);
    }),
    (ye.unmount = function (e) {
      Ce && Ce(e);
      var t,
        n = e.__c;
      n &&
        n.__H &&
        (n.__H.__.forEach(function (e) {
          try {
            je(e);
          } catch (e) {
            t = e;
          }
        }),
        (n.__H = void 0),
        t && ye.__e(t, n.__v));
    });
  var Oe = 'function' == typeof requestAnimationFrame;
  function Pe(e) {
    var t,
      n = function () {
        clearTimeout(o), Oe && cancelAnimationFrame(t), setTimeout(e);
      },
      o = setTimeout(n, 100);
    Oe && (t = requestAnimationFrame(n));
  }
  function je(e) {
    var t = I,
      n = e.__c;
    'function' == typeof n && ((e.__c = void 0), n()), (I = t);
  }
  function De(e) {
    var t = I;
    (e.__c = e.__()), (I = t);
  }
  function Le(e, t) {
    return (
      !e ||
      e.length !== t.length ||
      t.some(function (t, n) {
        return t !== e[n];
      })
    );
  }
  function He(e, t) {
    return 'function' == typeof t ? t(e) : t;
  }
  var Te = Symbol.for('preact-signals');
  function We() {
    if (Be > 1) Be--;
    else {
      for (var e, t = !1; void 0 !== qe; ) {
        var n = qe;
        for (qe = void 0, Ve++; void 0 !== n; ) {
          var o = n.o;
          if (((n.o = void 0), (n.f &= -3), !(8 & n.f) && Je(n)))
            try {
              n.c();
            } catch (n) {
              t || ((e = n), (t = !0));
            }
          n = o;
        }
      }
      if (((Ve = 0), Be--, t)) throw e;
    }
  }
  var Ie,
    Ue = void 0,
    qe = void 0,
    Be = 0,
    Ve = 0,
    Ge = 0;
  function Xe(e) {
    if (void 0 !== Ue) {
      var t = e.n;
      if (void 0 === t || t.t !== Ue)
        return (
          (t = { i: 0, S: e, p: Ue.s, n: void 0, t: Ue, e: void 0, x: void 0, r: t }),
          void 0 !== Ue.s && (Ue.s.n = t),
          (Ue.s = t),
          (e.n = t),
          32 & Ue.f && e.S(t),
          t
        );
      if (-1 === t.i)
        return (
          (t.i = 0),
          void 0 !== t.n &&
            ((t.n.p = t.p), void 0 !== t.p && (t.p.n = t.n), (t.p = Ue.s), (t.n = void 0), (Ue.s.n = t), (Ue.s = t)),
          t
        );
    }
  }
  function Ye(e) {
    (this.v = e), (this.i = 0), (this.n = void 0), (this.t = void 0);
  }
  function Ke(e) {
    return new Ye(e);
  }
  function Je(e) {
    for (var t = e.s; void 0 !== t; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
    return !1;
  }
  function Ze(e) {
    for (var t = e.s; void 0 !== t; t = t.n) {
      var n = t.S.n;
      if ((void 0 !== n && (t.r = n), (t.S.n = t), (t.i = -1), void 0 === t.n)) {
        e.s = t;
        break;
      }
    }
  }
  function Qe(e) {
    for (var t = e.s, n = void 0; void 0 !== t; ) {
      var o = t.p;
      -1 === t.i ? (t.S.U(t), void 0 !== o && (o.n = t.n), void 0 !== t.n && (t.n.p = o)) : (n = t),
        (t.S.n = t.r),
        void 0 !== t.r && (t.r = void 0),
        (t = o);
    }
    e.s = n;
  }
  function et(e) {
    Ye.call(this, void 0), (this.x = e), (this.s = void 0), (this.g = Ge - 1), (this.f = 4);
  }
  function tt(e) {
    var t = e.u;
    if (((e.u = void 0), 'function' == typeof t)) {
      Be++;
      var n = Ue;
      Ue = void 0;
      try {
        t();
      } catch (t) {
        throw ((e.f &= -2), (e.f |= 8), nt(e), t);
      } finally {
        (Ue = n), We();
      }
    }
  }
  function nt(e) {
    for (var t = e.s; void 0 !== t; t = t.n) t.S.U(t);
    (e.x = void 0), (e.s = void 0), tt(e);
  }
  function ot(e) {
    if (Ue !== this) throw new Error('Out-of-order effect');
    Qe(this), (Ue = e), (this.f &= -2), 8 & this.f && nt(this), We();
  }
  function rt(e) {
    (this.x = e), (this.u = void 0), (this.s = void 0), (this.o = void 0), (this.f = 32);
  }
  function it(e) {
    var t = new rt(e);
    try {
      t.c();
    } catch (e) {
      throw (t.d(), e);
    }
    return t.d.bind(t);
  }
  function at(e, t) {
    n[e] = t.bind(null, n[e] || function () {});
  }
  function st(e) {
    Ie && Ie(), (Ie = e && e.S());
  }
  function lt(e) {
    var t = this,
      n = e.data,
      o = (function (e) {
        return Re(function () {
          return Ke(e);
        }, []);
      })(n);
    o.value = n;
    var i = Re(function () {
      for (var e = t.__v; (e = e.__); )
        if (e.__c) {
          e.__c.__$f |= 4;
          break;
        }
      return (
        (t.__$u.c = function () {
          var e,
            n = t.__$u.S(),
            o = i.value;
          n(),
            r(o) || 3 !== (null == (e = t.base) ? void 0 : e.nodeType)
              ? ((t.__$f |= 1), t.setState({}))
              : (t.base.data = o);
        }),
        new et(function () {
          var e = o.value.value;
          return 0 === e ? 0 : !0 === e ? '' : e || '';
        })
      );
    }, []);
    return i.value;
  }
  function ct(e, t, n, o) {
    var r = t in e && void 0 === e.ownerSVGElement,
      i = Ke(n);
    return {
      o: function (e, t) {
        (i.value = e), (o = t);
      },
      d: it(function () {
        var n = i.value.value;
        o[t] !== n && ((o[t] = n), r ? (e[t] = n) : n ? e.setAttribute(t, n) : e.removeAttribute(t));
      }),
    };
  }
  function dt(e) {
    var t,
      n,
      o = '';
    if ('string' == typeof e || 'number' == typeof e) o += e;
    else if ('object' == typeof e)
      if (Array.isArray(e)) {
        var r = e.length;
        for (t = 0; t < r; t++) e[t] && (n = dt(e[t])) && (o && (o += ' '), (o += n));
      } else for (n in e) e[n] && (o && (o += ' '), (o += n));
    return o;
  }
  (Ye.prototype.brand = Te),
    (Ye.prototype.h = function () {
      return !0;
    }),
    (Ye.prototype.S = function (e) {
      this.t !== e && void 0 === e.e && ((e.x = this.t), void 0 !== this.t && (this.t.e = e), (this.t = e));
    }),
    (Ye.prototype.U = function (e) {
      if (void 0 !== this.t) {
        var t = e.e,
          n = e.x;
        void 0 !== t && ((t.x = n), (e.e = void 0)),
          void 0 !== n && ((n.e = t), (e.x = void 0)),
          e === this.t && (this.t = n);
      }
    }),
    (Ye.prototype.subscribe = function (e) {
      var t = this;
      return it(function () {
        var n = t.value,
          o = Ue;
        Ue = void 0;
        try {
          e(n);
        } finally {
          Ue = o;
        }
      });
    }),
    (Ye.prototype.valueOf = function () {
      return this.value;
    }),
    (Ye.prototype.toString = function () {
      return this.value + '';
    }),
    (Ye.prototype.toJSON = function () {
      return this.value;
    }),
    (Ye.prototype.peek = function () {
      var e = Ue;
      Ue = void 0;
      try {
        return this.value;
      } finally {
        Ue = e;
      }
    }),
    Object.defineProperty(Ye.prototype, 'value', {
      get: function () {
        var e = Xe(this);
        return void 0 !== e && (e.i = this.i), this.v;
      },
      set: function (e) {
        if (e !== this.v) {
          if (Ve > 100) throw new Error('Cycle detected');
          (this.v = e), this.i++, Ge++, Be++;
          try {
            for (var t = this.t; void 0 !== t; t = t.x) t.t.N();
          } finally {
            We();
          }
        }
      },
    }),
    ((et.prototype = new Ye()).h = function () {
      if (((this.f &= -3), 1 & this.f)) return !1;
      if (32 == (36 & this.f)) return !0;
      if (((this.f &= -5), this.g === Ge)) return !0;
      if (((this.g = Ge), (this.f |= 1), this.i > 0 && !Je(this))) return (this.f &= -2), !0;
      var e = Ue;
      try {
        Ze(this), (Ue = this);
        var t = this.x();
        (16 & this.f || this.v !== t || 0 === this.i) && ((this.v = t), (this.f &= -17), this.i++);
      } catch (e) {
        (this.v = e), (this.f |= 16), this.i++;
      }
      return (Ue = e), Qe(this), (this.f &= -2), !0;
    }),
    (et.prototype.S = function (e) {
      if (void 0 === this.t) {
        this.f |= 36;
        for (var t = this.s; void 0 !== t; t = t.n) t.S.S(t);
      }
      Ye.prototype.S.call(this, e);
    }),
    (et.prototype.U = function (e) {
      if (void 0 !== this.t && (Ye.prototype.U.call(this, e), void 0 === this.t)) {
        this.f &= -33;
        for (var t = this.s; void 0 !== t; t = t.n) t.S.U(t);
      }
    }),
    (et.prototype.N = function () {
      if (!(2 & this.f)) {
        this.f |= 6;
        for (var e = this.t; void 0 !== e; e = e.x) e.t.N();
      }
    }),
    Object.defineProperty(et.prototype, 'value', {
      get: function () {
        if (1 & this.f) throw new Error('Cycle detected');
        var e = Xe(this);
        if ((this.h(), void 0 !== e && (e.i = this.i), 16 & this.f)) throw this.v;
        return this.v;
      },
    }),
    (rt.prototype.c = function () {
      var e = this.S();
      try {
        if (8 & this.f) return;
        if (void 0 === this.x) return;
        var t = this.x();
        'function' == typeof t && (this.u = t);
      } finally {
        e();
      }
    }),
    (rt.prototype.S = function () {
      if (1 & this.f) throw new Error('Cycle detected');
      (this.f |= 1), (this.f &= -9), tt(this), Ze(this), Be++;
      var e = Ue;
      return (Ue = this), ot.bind(this, e);
    }),
    (rt.prototype.N = function () {
      2 & this.f || ((this.f |= 2), (this.o = qe), (qe = this));
    }),
    (rt.prototype.d = function () {
      (this.f |= 8), 1 & this.f || nt(this);
    }),
    (lt.displayName = '_st'),
    Object.defineProperties(Ye.prototype, {
      constructor: { configurable: !0, value: void 0 },
      type: { configurable: !0, value: lt },
      props: {
        configurable: !0,
        get: function () {
          return { data: this };
        },
      },
      __b: { configurable: !0, value: 1 },
    }),
    at('__b', function (e, t) {
      if ('string' == typeof t.type) {
        var n,
          o = t.props;
        for (var r in o)
          if ('children' !== r) {
            var i = o[r];
            i instanceof Ye && (n || (t.__np = n = {}), (n[r] = i), (o[r] = i.peek()));
          }
      }
      e(t);
    }),
    at('__r', function (e, t) {
      st();
      var n,
        o,
        r = t.__c;
      r &&
        ((r.__$f &= -2),
        void 0 === (n = r.__$u) &&
          (r.__$u =
            (it(function () {
              o = this;
            }),
            (o.c = function () {
              (r.__$f |= 1), r.setState({});
            }),
            (n = o)))),
        st(n),
        e(t);
    }),
    at('__e', function (e, t, n, o) {
      st(), e(t, n, o);
    }),
    at('diffed', function (e, t) {
      var n;
      if ((st(), 'string' == typeof t.type && (n = t.__e))) {
        var o = t.__np,
          r = t.props;
        if (o) {
          var i = n.U;
          if (i)
            for (var a in i) {
              var s = i[a];
              void 0 === s || a in o || (s.d(), (i[a] = void 0));
            }
          else n.U = i = {};
          for (var l in o) {
            var c = i[l],
              d = o[l];
            void 0 === c ? ((c = ct(n, l, d, r)), (i[l] = c)) : c.o(d, r);
          }
        }
      }
      e(t);
    }),
    at('unmount', function (e, t) {
      if ('string' == typeof t.type) {
        var n = t.__e;
        if (n) {
          var o = n.U;
          if (o)
            for (var r in ((n.U = void 0), o)) {
              var i = o[r];
              i && i.d();
            }
        }
      } else {
        var a = t.__c;
        if (a) {
          var s = a.__$u;
          s && ((a.__$u = void 0), s.d());
        }
      }
      e(t);
    }),
    at('__h', function (e, t, n, o) {
      (o < 3 || 9 === o) && (t.__$f |= 2), e(t, n, o);
    }),
    (ee.prototype.shouldComponentUpdate = function (e, t) {
      var n = this.__$u;
      if (!((n && void 0 !== n.s) || 4 & this.__$f)) return !0;
      if (3 & this.__$f) return !0;
      for (var o in t) return !0;
      for (var r in e) if ('__source' !== r && e[r] !== this.props[r]) return !0;
      for (var i in this.props) if (!(i in e)) return !0;
      return !1;
    });
  var ut = (e) => {
      const t = mt(e),
        { conflictingClassGroups: n, conflictingClassGroupModifiers: o } = e;
      return {
        getClassGroupId: (e) => {
          const n = e.split('-');
          return '' === n[0] && 1 !== n.length && n.shift(), pt(n, t) || ht(e);
        },
        getConflictingClassGroupIds: (e, t) => {
          const r = n[e] || [];
          return t && o[e] ? [...r, ...o[e]] : r;
        },
      };
    },
    pt = (e, t) => {
      if (0 === e.length) return t.classGroupId;
      const n = e[0],
        o = t.nextPart.get(n),
        r = o ? pt(e.slice(1), o) : void 0;
      if (r) return r;
      if (0 === t.validators.length) return;
      const i = e.join('-');
      return t.validators.find(({ validator: e }) => e(i))?.classGroupId;
    },
    ft = /^\[(.+)\]$/,
    ht = (e) => {
      if (ft.test(e)) {
        const t = ft.exec(e)[1],
          n = t?.substring(0, t.indexOf(':'));
        if (n) return 'arbitrary..' + n;
      }
    },
    mt = (e) => {
      const { theme: t, prefix: n } = e,
        o = { nextPart: new Map(), validators: [] };
      return (
        bt(Object.entries(e.classGroups), n).forEach(([e, n]) => {
          gt(n, o, e, t);
        }),
        o
      );
    },
    gt = (e, t, n, o) => {
      e.forEach((e) => {
        if ('string' != typeof e) {
          if ('function' == typeof e)
            return wt(e) ? void gt(e(o), t, n, o) : void t.validators.push({ validator: e, classGroupId: n });
          Object.entries(e).forEach(([e, r]) => {
            gt(r, vt(t, e), n, o);
          });
        } else {
          ('' === e ? t : vt(t, e)).classGroupId = n;
        }
      });
    },
    vt = (e, t) => {
      let n = e;
      return (
        t.split('-').forEach((e) => {
          n.nextPart.has(e) || n.nextPart.set(e, { nextPart: new Map(), validators: [] }), (n = n.nextPart.get(e));
        }),
        n
      );
    },
    wt = (e) => e.isThemeGetter,
    bt = (e, t) =>
      t
        ? e.map(([e, n]) => [
            e,
            n.map((e) =>
              'string' == typeof e
                ? t + e
                : 'object' == typeof e
                  ? Object.fromEntries(Object.entries(e).map(([e, n]) => [t + e, n]))
                  : e,
            ),
          ])
        : e,
    yt = (e) => {
      if (e < 1) return { get: () => {}, set: () => {} };
      let t = 0,
        n = new Map(),
        o = new Map();
      const r = (r, i) => {
        n.set(r, i), t++, t > e && ((t = 0), (o = n), (n = new Map()));
      };
      return {
        get(e) {
          let t = n.get(e);
          return void 0 !== t ? t : void 0 !== (t = o.get(e)) ? (r(e, t), t) : void 0;
        },
        set(e, t) {
          n.has(e) ? n.set(e, t) : r(e, t);
        },
      };
    },
    _t = (e) => {
      const { separator: t, experimentalParseClassName: n } = e,
        o = 1 === t.length,
        r = t[0],
        i = t.length,
        a = (e) => {
          const n = [];
          let a,
            s = 0,
            l = 0;
          for (let c = 0; c < e.length; c++) {
            let d = e[c];
            if (0 === s) {
              if (d === r && (o || e.slice(c, c + i) === t)) {
                n.push(e.slice(l, c)), (l = c + i);
                continue;
              }
              if ('/' === d) {
                a = c;
                continue;
              }
            }
            '[' === d ? s++ : ']' === d && s--;
          }
          const c = 0 === n.length ? e : e.substring(l),
            d = c.startsWith('!');
          return {
            modifiers: n,
            hasImportantModifier: d,
            baseClassName: d ? c.substring(1) : c,
            maybePostfixModifierPosition: a && a > l ? a - l : void 0,
          };
        };
      return n ? (e) => n({ className: e, parseClassName: a }) : a;
    },
    xt = (e) => {
      if (e.length <= 1) return e;
      const t = [];
      let n = [];
      return (
        e.forEach((e) => {
          '[' === e[0] ? (t.push(...n.sort(), e), (n = [])) : n.push(e);
        }),
        t.push(...n.sort()),
        t
      );
    },
    kt = /\s+/;
  function St() {
    let e,
      t,
      n = 0,
      o = '';
    for (; n < arguments.length; ) (e = arguments[n++]) && (t = Ct(e)) && (o && (o += ' '), (o += t));
    return o;
  }
  var Ct = (e) => {
    if ('string' == typeof e) return e;
    let t,
      n = '';
    for (let o = 0; o < e.length; o++) e[o] && (t = Ct(e[o])) && (n && (n += ' '), (n += t));
    return n;
  };
  function zt(e, ...t) {
    let n,
      o,
      r,
      i = function (s) {
        const l = t.reduce((e, t) => t(e), e());
        return (
          (n = ((e) => ({ cache: yt(e.cacheSize), parseClassName: _t(e), ...ut(e) }))(l)),
          (o = n.cache.get),
          (r = n.cache.set),
          (i = a),
          a(s)
        );
      };
    function a(e) {
      const t = o(e);
      if (t) return t;
      const i = ((e, t) => {
        const { parseClassName: n, getClassGroupId: o, getConflictingClassGroupIds: r } = t,
          i = [],
          a = e.trim().split(kt);
        let s = '';
        for (let e = a.length - 1; e >= 0; e -= 1) {
          const t = a[e],
            { modifiers: l, hasImportantModifier: c, baseClassName: d, maybePostfixModifierPosition: u } = n(t);
          let p = Boolean(u),
            f = o(p ? d.substring(0, u) : d);
          if (!f) {
            if (!p) {
              s = t + (s.length > 0 ? ' ' + s : s);
              continue;
            }
            if (((f = o(d)), !f)) {
              s = t + (s.length > 0 ? ' ' + s : s);
              continue;
            }
            p = !1;
          }
          const h = xt(l).join(':'),
            m = c ? h + '!' : h,
            g = m + f;
          if (i.includes(g)) continue;
          i.push(g);
          const v = r(f, p);
          for (let e = 0; e < v.length; ++e) {
            const t = v[e];
            i.push(m + t);
          }
          s = t + (s.length > 0 ? ' ' + s : s);
        }
        return s;
      })(e, n);
      return r(e, i), i;
    }
    return function () {
      return i(St.apply(null, arguments));
    };
  }
  var Et = (e) => {
      const t = (t) => t[e] || [];
      return (t.isThemeGetter = !0), t;
    },
    Mt = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    $t = /^\d+\/\d+$/,
    Ft = new Set(['px', 'full', 'screen']),
    Rt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    At =
      /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    Nt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    Ot = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    Pt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    jt = (e) => Lt(e) || Ft.has(e) || $t.test(e),
    Dt = (e) => Jt(e, 'length', Zt),
    Lt = (e) => Boolean(e) && !Number.isNaN(Number(e)),
    Ht = (e) => Jt(e, 'number', Lt),
    Tt = (e) => Boolean(e) && Number.isInteger(Number(e)),
    Wt = (e) => e.endsWith('%') && Lt(e.slice(0, -1)),
    It = (e) => Mt.test(e),
    Ut = (e) => Rt.test(e),
    qt = new Set(['length', 'size', 'percentage']),
    Bt = (e) => Jt(e, qt, Qt),
    Vt = (e) => Jt(e, 'position', Qt),
    Gt = new Set(['image', 'url']),
    Xt = (e) => Jt(e, Gt, tn),
    Yt = (e) => Jt(e, '', en),
    Kt = () => !0,
    Jt = (e, t, n) => {
      const o = Mt.exec(e);
      return !!o && (o[1] ? ('string' == typeof t ? o[1] === t : t.has(o[1])) : n(o[2]));
    },
    Zt = (e) => At.test(e) && !Nt.test(e),
    Qt = () => !1,
    en = (e) => Ot.test(e),
    tn = (e) => Pt.test(e),
    nn = zt(() => {
      const e = Et('colors'),
        t = Et('spacing'),
        n = Et('blur'),
        o = Et('brightness'),
        r = Et('borderColor'),
        i = Et('borderRadius'),
        a = Et('borderSpacing'),
        s = Et('borderWidth'),
        l = Et('contrast'),
        c = Et('grayscale'),
        d = Et('hueRotate'),
        u = Et('invert'),
        p = Et('gap'),
        f = Et('gradientColorStops'),
        h = Et('gradientColorStopPositions'),
        m = Et('inset'),
        g = Et('margin'),
        v = Et('opacity'),
        w = Et('padding'),
        b = Et('saturate'),
        y = Et('scale'),
        _ = Et('sepia'),
        x = Et('skew'),
        k = Et('space'),
        S = Et('translate'),
        C = () => ['auto', It, t],
        z = () => [It, t],
        E = () => ['', jt, Dt],
        M = () => ['auto', Lt, It],
        $ = () => ['', '0', It],
        F = () => [Lt, It];
      return {
        cacheSize: 500,
        separator: ':',
        theme: {
          colors: [Kt],
          spacing: [jt, Dt],
          blur: ['none', '', Ut, It],
          brightness: F(),
          borderColor: [e],
          borderRadius: ['none', '', 'full', Ut, It],
          borderSpacing: z(),
          borderWidth: E(),
          contrast: F(),
          grayscale: $(),
          hueRotate: F(),
          invert: $(),
          gap: z(),
          gradientColorStops: [e],
          gradientColorStopPositions: [Wt, Dt],
          inset: C(),
          margin: C(),
          opacity: F(),
          padding: z(),
          saturate: F(),
          scale: F(),
          sepia: $(),
          skew: F(),
          space: z(),
          translate: z(),
        },
        classGroups: {
          aspect: [{ aspect: ['auto', 'square', 'video', It] }],
          container: ['container'],
          columns: [{ columns: [Ut] }],
          'break-after': [{ 'break-after': ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'] }],
          'break-before': [
            { 'break-before': ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'] },
          ],
          'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
          'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
          box: [{ box: ['border', 'content'] }],
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
          float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
          clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
          isolation: ['isolate', 'isolation-auto'],
          'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
          'object-position': [
            {
              object: [
                'bottom',
                'center',
                'left',
                'left-bottom',
                'left-top',
                'right',
                'right-bottom',
                'right-top',
                'top',
                It,
              ],
            },
          ],
          overflow: [{ overflow: ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
          'overflow-x': [{ 'overflow-x': ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
          'overflow-y': [{ 'overflow-y': ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
          overscroll: [{ overscroll: ['auto', 'contain', 'none'] }],
          'overscroll-x': [{ 'overscroll-x': ['auto', 'contain', 'none'] }],
          'overscroll-y': [{ 'overscroll-y': ['auto', 'contain', 'none'] }],
          position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
          inset: [{ inset: [m] }],
          'inset-x': [{ 'inset-x': [m] }],
          'inset-y': [{ 'inset-y': [m] }],
          start: [{ start: [m] }],
          end: [{ end: [m] }],
          top: [{ top: [m] }],
          right: [{ right: [m] }],
          bottom: [{ bottom: [m] }],
          left: [{ left: [m] }],
          visibility: ['visible', 'invisible', 'collapse'],
          z: [{ z: ['auto', Tt, It] }],
          basis: [{ basis: C() }],
          'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
          'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
          flex: [{ flex: ['1', 'auto', 'initial', 'none', It] }],
          grow: [{ grow: $() }],
          shrink: [{ shrink: $() }],
          order: [{ order: ['first', 'last', 'none', Tt, It] }],
          'grid-cols': [{ 'grid-cols': [Kt] }],
          'col-start-end': [{ col: ['auto', { span: ['full', Tt, It] }, It] }],
          'col-start': [{ 'col-start': M() }],
          'col-end': [{ 'col-end': M() }],
          'grid-rows': [{ 'grid-rows': [Kt] }],
          'row-start-end': [{ row: ['auto', { span: [Tt, It] }, It] }],
          'row-start': [{ 'row-start': M() }],
          'row-end': [{ 'row-end': M() }],
          'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
          'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', It] }],
          'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', It] }],
          gap: [{ gap: [p] }],
          'gap-x': [{ 'gap-x': [p] }],
          'gap-y': [{ 'gap-y': [p] }],
          'justify-content': [
            { justify: ['normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'] },
          ],
          'justify-items': [{ 'justify-items': ['start', 'end', 'center', 'stretch'] }],
          'justify-self': [{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
          'align-content': [
            { content: ['normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'stretch', 'baseline'] },
          ],
          'align-items': [{ items: ['start', 'end', 'center', 'baseline', 'stretch'] }],
          'align-self': [{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }],
          'place-content': [
            { 'place-content': ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch', 'baseline'] },
          ],
          'place-items': [{ 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }],
          'place-self': [{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
          p: [{ p: [w] }],
          px: [{ px: [w] }],
          py: [{ py: [w] }],
          ps: [{ ps: [w] }],
          pe: [{ pe: [w] }],
          pt: [{ pt: [w] }],
          pr: [{ pr: [w] }],
          pb: [{ pb: [w] }],
          pl: [{ pl: [w] }],
          m: [{ m: [g] }],
          mx: [{ mx: [g] }],
          my: [{ my: [g] }],
          ms: [{ ms: [g] }],
          me: [{ me: [g] }],
          mt: [{ mt: [g] }],
          mr: [{ mr: [g] }],
          mb: [{ mb: [g] }],
          ml: [{ ml: [g] }],
          'space-x': [{ 'space-x': [k] }],
          'space-x-reverse': ['space-x-reverse'],
          'space-y': [{ 'space-y': [k] }],
          'space-y-reverse': ['space-y-reverse'],
          w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', It, t] }],
          'min-w': [{ 'min-w': [It, t, 'min', 'max', 'fit'] }],
          'max-w': [{ 'max-w': [It, t, 'none', 'full', 'min', 'max', 'fit', 'prose', { screen: [Ut] }, Ut] }],
          h: [{ h: [It, t, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
          'min-h': [{ 'min-h': [It, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
          'max-h': [{ 'max-h': [It, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
          size: [{ size: [It, t, 'auto', 'min', 'max', 'fit'] }],
          'font-size': [{ text: ['base', Ut, Dt] }],
          'font-smoothing': ['antialiased', 'subpixel-antialiased'],
          'font-style': ['italic', 'not-italic'],
          'font-weight': [
            { font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', Ht] },
          ],
          'font-family': [{ font: [Kt] }],
          'fvn-normal': ['normal-nums'],
          'fvn-ordinal': ['ordinal'],
          'fvn-slashed-zero': ['slashed-zero'],
          'fvn-figure': ['lining-nums', 'oldstyle-nums'],
          'fvn-spacing': ['proportional-nums', 'tabular-nums'],
          'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
          tracking: [{ tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', It] }],
          'line-clamp': [{ 'line-clamp': ['none', Lt, Ht] }],
          leading: [{ leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', jt, It] }],
          'list-image': [{ 'list-image': ['none', It] }],
          'list-style-type': [{ list: ['none', 'disc', 'decimal', It] }],
          'list-style-position': [{ list: ['inside', 'outside'] }],
          'placeholder-color': [{ placeholder: [e] }],
          'placeholder-opacity': [{ 'placeholder-opacity': [v] }],
          'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
          'text-color': [{ text: [e] }],
          'text-opacity': [{ 'text-opacity': [v] }],
          'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
          'text-decoration-style': [{ decoration: ['solid', 'dashed', 'dotted', 'double', 'none', 'wavy'] }],
          'text-decoration-thickness': [{ decoration: ['auto', 'from-font', jt, Dt] }],
          'underline-offset': [{ 'underline-offset': ['auto', jt, It] }],
          'text-decoration-color': [{ decoration: [e] }],
          'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
          'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
          'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
          indent: [{ indent: z() }],
          'vertical-align': [
            { align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', It] },
          ],
          whitespace: [{ whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] }],
          break: [{ break: ['normal', 'words', 'all', 'keep'] }],
          hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
          content: [{ content: ['none', It] }],
          'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
          'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
          'bg-opacity': [{ 'bg-opacity': [v] }],
          'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
          'bg-position': [
            {
              bg: [
                'bottom',
                'center',
                'left',
                'left-bottom',
                'left-top',
                'right',
                'right-bottom',
                'right-top',
                'top',
                Vt,
              ],
            },
          ],
          'bg-repeat': [{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }],
          'bg-size': [{ bg: ['auto', 'cover', 'contain', Bt] }],
          'bg-image': [{ bg: ['none', { 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, Xt] }],
          'bg-color': [{ bg: [e] }],
          'gradient-from-pos': [{ from: [h] }],
          'gradient-via-pos': [{ via: [h] }],
          'gradient-to-pos': [{ to: [h] }],
          'gradient-from': [{ from: [f] }],
          'gradient-via': [{ via: [f] }],
          'gradient-to': [{ to: [f] }],
          rounded: [{ rounded: [i] }],
          'rounded-s': [{ 'rounded-s': [i] }],
          'rounded-e': [{ 'rounded-e': [i] }],
          'rounded-t': [{ 'rounded-t': [i] }],
          'rounded-r': [{ 'rounded-r': [i] }],
          'rounded-b': [{ 'rounded-b': [i] }],
          'rounded-l': [{ 'rounded-l': [i] }],
          'rounded-ss': [{ 'rounded-ss': [i] }],
          'rounded-se': [{ 'rounded-se': [i] }],
          'rounded-ee': [{ 'rounded-ee': [i] }],
          'rounded-es': [{ 'rounded-es': [i] }],
          'rounded-tl': [{ 'rounded-tl': [i] }],
          'rounded-tr': [{ 'rounded-tr': [i] }],
          'rounded-br': [{ 'rounded-br': [i] }],
          'rounded-bl': [{ 'rounded-bl': [i] }],
          'border-w': [{ border: [s] }],
          'border-w-x': [{ 'border-x': [s] }],
          'border-w-y': [{ 'border-y': [s] }],
          'border-w-s': [{ 'border-s': [s] }],
          'border-w-e': [{ 'border-e': [s] }],
          'border-w-t': [{ 'border-t': [s] }],
          'border-w-r': [{ 'border-r': [s] }],
          'border-w-b': [{ 'border-b': [s] }],
          'border-w-l': [{ 'border-l': [s] }],
          'border-opacity': [{ 'border-opacity': [v] }],
          'border-style': [{ border: ['solid', 'dashed', 'dotted', 'double', 'none', 'hidden'] }],
          'divide-x': [{ 'divide-x': [s] }],
          'divide-x-reverse': ['divide-x-reverse'],
          'divide-y': [{ 'divide-y': [s] }],
          'divide-y-reverse': ['divide-y-reverse'],
          'divide-opacity': [{ 'divide-opacity': [v] }],
          'divide-style': [{ divide: ['solid', 'dashed', 'dotted', 'double', 'none'] }],
          'border-color': [{ border: [r] }],
          'border-color-x': [{ 'border-x': [r] }],
          'border-color-y': [{ 'border-y': [r] }],
          'border-color-s': [{ 'border-s': [r] }],
          'border-color-e': [{ 'border-e': [r] }],
          'border-color-t': [{ 'border-t': [r] }],
          'border-color-r': [{ 'border-r': [r] }],
          'border-color-b': [{ 'border-b': [r] }],
          'border-color-l': [{ 'border-l': [r] }],
          'divide-color': [{ divide: [r] }],
          'outline-style': [{ outline: ['', 'solid', 'dashed', 'dotted', 'double', 'none'] }],
          'outline-offset': [{ 'outline-offset': [jt, It] }],
          'outline-w': [{ outline: [jt, Dt] }],
          'outline-color': [{ outline: [e] }],
          'ring-w': [{ ring: E() }],
          'ring-w-inset': ['ring-inset'],
          'ring-color': [{ ring: [e] }],
          'ring-opacity': [{ 'ring-opacity': [v] }],
          'ring-offset-w': [{ 'ring-offset': [jt, Dt] }],
          'ring-offset-color': [{ 'ring-offset': [e] }],
          shadow: [{ shadow: ['', 'inner', 'none', Ut, Yt] }],
          'shadow-color': [{ shadow: [Kt] }],
          opacity: [{ opacity: [v] }],
          'mix-blend': [
            {
              'mix-blend': [
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
                'plus-lighter',
                'plus-darker',
              ],
            },
          ],
          'bg-blend': [
            {
              'bg-blend': [
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
              ],
            },
          ],
          filter: [{ filter: ['', 'none'] }],
          blur: [{ blur: [n] }],
          brightness: [{ brightness: [o] }],
          contrast: [{ contrast: [l] }],
          'drop-shadow': [{ 'drop-shadow': ['', 'none', Ut, It] }],
          grayscale: [{ grayscale: [c] }],
          'hue-rotate': [{ 'hue-rotate': [d] }],
          invert: [{ invert: [u] }],
          saturate: [{ saturate: [b] }],
          sepia: [{ sepia: [_] }],
          'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
          'backdrop-blur': [{ 'backdrop-blur': [n] }],
          'backdrop-brightness': [{ 'backdrop-brightness': [o] }],
          'backdrop-contrast': [{ 'backdrop-contrast': [l] }],
          'backdrop-grayscale': [{ 'backdrop-grayscale': [c] }],
          'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [d] }],
          'backdrop-invert': [{ 'backdrop-invert': [u] }],
          'backdrop-opacity': [{ 'backdrop-opacity': [v] }],
          'backdrop-saturate': [{ 'backdrop-saturate': [b] }],
          'backdrop-sepia': [{ 'backdrop-sepia': [_] }],
          'border-collapse': [{ border: ['collapse', 'separate'] }],
          'border-spacing': [{ 'border-spacing': [a] }],
          'border-spacing-x': [{ 'border-spacing-x': [a] }],
          'border-spacing-y': [{ 'border-spacing-y': [a] }],
          'table-layout': [{ table: ['auto', 'fixed'] }],
          caption: [{ caption: ['top', 'bottom'] }],
          transition: [{ transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', It] }],
          duration: [{ duration: F() }],
          ease: [{ ease: ['linear', 'in', 'out', 'in-out', It] }],
          delay: [{ delay: F() }],
          animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', It] }],
          transform: [{ transform: ['', 'gpu', 'none'] }],
          scale: [{ scale: [y] }],
          'scale-x': [{ 'scale-x': [y] }],
          'scale-y': [{ 'scale-y': [y] }],
          rotate: [{ rotate: [Tt, It] }],
          'translate-x': [{ 'translate-x': [S] }],
          'translate-y': [{ 'translate-y': [S] }],
          'skew-x': [{ 'skew-x': [x] }],
          'skew-y': [{ 'skew-y': [x] }],
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
                It,
              ],
            },
          ],
          accent: [{ accent: ['auto', e] }],
          appearance: [{ appearance: ['none', 'auto'] }],
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
                It,
              ],
            },
          ],
          'caret-color': [{ caret: [e] }],
          'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
          resize: [{ resize: ['none', 'y', 'x', ''] }],
          'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
          'scroll-m': [{ 'scroll-m': z() }],
          'scroll-mx': [{ 'scroll-mx': z() }],
          'scroll-my': [{ 'scroll-my': z() }],
          'scroll-ms': [{ 'scroll-ms': z() }],
          'scroll-me': [{ 'scroll-me': z() }],
          'scroll-mt': [{ 'scroll-mt': z() }],
          'scroll-mr': [{ 'scroll-mr': z() }],
          'scroll-mb': [{ 'scroll-mb': z() }],
          'scroll-ml': [{ 'scroll-ml': z() }],
          'scroll-p': [{ 'scroll-p': z() }],
          'scroll-px': [{ 'scroll-px': z() }],
          'scroll-py': [{ 'scroll-py': z() }],
          'scroll-ps': [{ 'scroll-ps': z() }],
          'scroll-pe': [{ 'scroll-pe': z() }],
          'scroll-pt': [{ 'scroll-pt': z() }],
          'scroll-pr': [{ 'scroll-pr': z() }],
          'scroll-pb': [{ 'scroll-pb': z() }],
          'scroll-pl': [{ 'scroll-pl': z() }],
          'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
          'snap-stop': [{ snap: ['normal', 'always'] }],
          'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
          'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
          touch: [{ touch: ['auto', 'none', 'manipulation'] }],
          'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
          'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
          'touch-pz': ['touch-pinch-zoom'],
          select: [{ select: ['none', 'text', 'all', 'auto'] }],
          'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', It] }],
          fill: [{ fill: [e, 'none'] }],
          'stroke-w': [{ stroke: [jt, Dt, Ht] }],
          stroke: [{ stroke: [e, 'none'] }],
          sr: ['sr-only', 'not-sr-only'],
          'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
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
        conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      };
    }),
    on = (...e) =>
      nn(
        (function () {
          for (var e, t, n = 0, o = '', r = arguments.length; n < r; n++)
            (e = arguments[n]) && (t = dt(e)) && (o && (o += ' '), (o += t));
          return o;
        })(e),
      ),
    rn = 'undefined' != typeof navigator && navigator.userAgent.includes('Firefox'),
    an = (e, t) => {
      let n = 0;
      return (...o) => {
        const r = Date.now();
        if (r - n >= t) return (n = r), e(...o);
      };
    },
    sn = (e) => {
      if ('undefined' == typeof window) return null;
      try {
        const t = localStorage.getItem(e);
        return t ? JSON.parse(t) : null;
      } catch {
        return null;
      }
    },
    ln = (e, t) => {
      if ('undefined' != typeof window)
        try {
          window.localStorage.setItem(e, JSON.stringify(t));
        } catch {}
    },
    cn = (e, t) => {
      for (const n of t) e.classList.toggle(n);
    },
    dn = class {
      constructor(e, t) {
        (this.key = e), (this.value = t);
      }
    },
    un = (e, t) => {
      const n = { type: t?.type ?? new Set(), unstable: t?.unstable ?? !1 };
      for (const t of e) n.type.add(t.type), (n.unstable = n.unstable || t.unstable);
      return n;
    },
    pn = ({ from: e, to: t }) => {
      (t.changes.type = t.changes.type.union(e.changes.type)),
        (t.changes.unstable = t.changes.unstable || e.changes.unstable),
        (t.aggregatedCount += 1),
        (t.didCommit = t.didCommit || e.didCommit),
        (t.forget = t.forget || e.forget),
        (t.fps = t.fps + e.fps),
        (t.phase = t.phase.union(e.phase)),
        (t.time = (t.time ?? 0) + (e.time ?? 0)),
        (t.unnecessary = t.unnecessary || e.unnecessary);
    },
    fn = (e) => {
      let t = '';
      const n = new Map();
      for (const t of e) {
        const { forget: e, time: o, aggregatedCount: r, name: i } = t;
        n.has(r) || n.set(r, []), n.get(r).push({ name: i, forget: e, time: o ?? 0 });
      }
      const o = Array.from(n.keys()).sort((e, t) => t - e),
        r = [];
      let i = 0;
      for (const e of o) {
        const t = n.get(e);
        let o = t
          .slice(0, 4)
          .map(({ name: e }) => e)
          .join(', ');
        const a = t.reduce((e, { time: t }) => e + t, 0),
          s = t.some(({ forget: e }) => e);
        (i += a), t.length > 4 && (o += '...'), e > 1 && (o += ` ×${e}`), s && (o = `✨${o}`), r.push(o);
      }
      return (
        (t = r.join(', ')),
        t.length
          ? (t.length > 40 && (t = `${t.slice(0, 40)}…`), i >= 0.01 && (t += ` (${Number(i.toFixed(2))}ms)`), t)
          : null
      );
    };
  function hn(e, t) {
    return e === t || (e != e && t != t);
  }
  var mn = 115,
    gn = 97,
    vn = 230,
    wn = 185,
    bn = 49,
    yn = 115,
    _n = 'Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace';
  'undefined' != typeof window &&
    (function e() {
      requestAnimationFrame(e);
    })();
  var xn = an(async () => {
      const { activeOutlines: e } = Zr,
        t = [];
      for (const n of e.values()) t.push(n.domNode);
      const n = await kn(t);
      for (const t of e.values()) {
        const e = n.get(t.domNode);
        e && (t.target = e);
      }
    }, 32),
    kn = (e) =>
      new Promise((t) => {
        const n = new Map(),
          o = new IntersectionObserver((e) => {
            for (const t of e) {
              const e = t.target,
                o = t.boundingClientRect;
              n.set(e, o);
            }
            o.disconnect(), t(n);
          });
        for (const t of e) o.observe(t);
      }),
    Sn = null,
    Cn = (e) => {
      const t = window.devicePixelRatio || 1;
      e.clearRect(0, 0, e.canvas.width / t, e.canvas.height / t);
      const n = [];
      e.save();
      const o = new Set(),
        r = Zr.activeOutlines;
      for (const [t, a] of r) {
        const s = a;
        let l;
        for (const e of s.groupedAggregatedRender.values()) (e.frame += 1), (l = l ? Math.max(e.frame, l) : e.frame);
        if (!l) {
          r.delete(t);
          continue;
        }
        const c = 60,
          d = s.aggregatedRender.fps / s.aggregatedRender.aggregatedCount,
          u = Math.max(
            (c - Math.min(d, c)) / c,
            s.aggregatedRender.time ?? 0 / s.aggregatedRender.aggregatedCount / 16,
          ),
          p = Math.min(u, 1),
          f = {
            r: Math.round(mn + p * (wn - mn)),
            g: Math.round(gn + p * (bn - gn)),
            b: Math.round(vn + p * (yn - vn)),
          };
        let h = 0;
        o.clear();
        let m = !1,
          g = !1,
          v = !1;
        for (const e of s.groupedAggregatedRender.values())
          e.unnecessary && (v = !0), e.changes.unstable && (g = !0), e.didCommit && (m = !0);
        m && (h |= 1), g && (h |= 2), v && ((h |= 4), (f.r = 128), (f.g = 128), (f.b = 128));
        const w = 0.8;
        s.alpha = w * (1 - l / s.totalFrames);
        const b = s.alpha,
          y = 0.1 * b,
          _ = s.target;
        if (
          (i = _).top >= window.innerHeight ||
          i.bottom <= 0 ||
          i.left >= window.innerWidth ||
          i.right <= 0 ||
          !Zr.options.value.smoothlyAnimateOutlines
        )
          (s.current = _),
            s.groupedAggregatedRender.forEach((e) => {
              e.computedCurrent = _;
            });
        else {
          s.current || (s.current = new DOMRect(_.x, _.y, _.width, _.height));
          const e = 0.2,
            t = s.current,
            n = (t, n) => t + (n - t) * e,
            o = new DOMRect(n(t.x, _.x), n(t.y, _.y), n(t.width, _.width), n(t.height, _.height));
          (s.current = o),
            s.groupedAggregatedRender.forEach((e) => {
              e.computedCurrent = o;
            });
        }
        const x = `${f.r},${f.g},${f.b}`;
        (e.strokeStyle = `rgba(${x},${b})`),
          (e.lineWidth = 1),
          (e.fillStyle = `rgba(${x},${y})`),
          e.beginPath(),
          e.rect(s.current.x, s.current.y, s.current.width, s.current.height),
          e.stroke(),
          e.fill();
        const k = fn(Array.from(s.groupedAggregatedRender.values()));
        if (h > 0 && k && (!o.has('mount') || 1 !== o.size)) {
          const t = Pn(k, e);
          n.push({ alpha: b, color: f, reasons: h, labelText: k, textWidth: t.width, activeOutline: s });
        }
        const S = s.totalFrames;
        for (const [e, t] of s.groupedAggregatedRender) t.frame >= S && s.groupedAggregatedRender.delete(e);
        0 === s.groupedAggregatedRender.size && r.delete(t);
      }
      var i;
      e.restore();
      const a = Mn(n);
      e.save(), (e.font = `11px ${_n}`);
      for (let t = 0, n = a.length; t < n; t++) {
        const { alpha: n, color: o, reasons: r, groupedAggregatedRender: i, rect: s } = a[t],
          l = fn(i) ?? 'N/A',
          c = 4 & r ? `${l}⚠️` : l,
          d = e.measureText(c).width,
          u = 11,
          p = s.x,
          f = s.y - u - 4;
        (e.fillStyle = `rgba(${o.r},${o.g},${o.b},${n})`),
          e.fillRect(p, f, d + 4, u + 4),
          (e.fillStyle = `rgba(255,255,255,${n})`),
          e.fillText(c, p + 2, f + u);
      }
      e.restore(), (Sn = r.size ? requestAnimationFrame(() => Cn(e)) : null);
    },
    zn = (e) => {
      const t = window.innerWidth,
        n = window.innerHeight;
      return e.bottom < 0 || e.right < 0 || e.top > n || e.left > t;
    },
    En = async () => {
      const e = [],
        t = Zr.scheduledOutlines,
        n = Zr.activeOutlines,
        o = new Map();
      for (const e of Zr.activeOutlines.values())
        if (e.groupedAggregatedRender)
          for (const [t, n] of e.groupedAggregatedRender) {
            if (t.alternate && o.has(t.alternate)) {
              const r = o.get(t.alternate);
              r && pn({ from: r, to: n }), e.groupedAggregatedRender?.delete(t), o.delete(t.alternate);
            }
            o.set(t, n);
          }
      for (const [n, r] of t) {
        const t = o.get(n) || (n.alternate && o.get(n.alternate));
        t && (pn({ to: t, from: r.aggregatedRender }), (t.frame = 0)), e.push(r.domNode);
      }
      const r = await kn(e);
      for (const [e, i] of t) {
        const t = r.get(i.domNode);
        if (!t) continue;
        if (t.top === t.bottom || t.left === t.right) continue;
        const a = o.get(e) || (e.alternate && o.get(e.alternate));
        if (zn(t)) continue;
        const s = `${t.x}-${t.y}`;
        let l = n.get(s);
        if (l)
          a
            ? pn({ to: a, from: i.aggregatedRender })
            : ((l.alpha = i.alpha), l.groupedAggregatedRender?.set(e, i.aggregatedRender));
        else {
          if (
            ((l = i),
            (l.target = t),
            (l.totalFrames = 45),
            (l.groupedAggregatedRender = new Map([[e, i.aggregatedRender]])),
            (l.aggregatedRender.aggregatedCount = a?.aggregatedCount ?? 1),
            (l.alpha = 0.8),
            (l.aggregatedRender.computedKey = s),
            a?.computedKey)
          ) {
            const t = n.get(a.computedKey);
            t?.groupedAggregatedRender?.forEach((t, n) => {
              var o, r;
              ((o = n) === (r = e) ||
                o.alternate === r ||
                o === r.alternate ||
                (o.alternate && r.alternate && o.alternate === r.alternate)) &&
                ((t.frame = 45), (l.current = t.computedCurrent));
            });
          }
          n.set(s, l);
        }
        (l.alpha = Math.max(l.alpha, i.alpha)), (l.totalFrames = Math.max(l.totalFrames, i.totalFrames));
      }
    },
    Mn = (e) => {
      if (e.length > 1500) return e.map((e) => $n(e));
      const t = e.map((e) => ({ original: e, rect: Nn(e.activeOutline.current, e.textWidth) }));
      t.sort((e, t) => e.rect.x - t.rect.x);
      const n = [],
        o = new Set();
      for (let e = 0; e < t.length; e++) {
        if (o.has(e)) continue;
        let r = $n(t[e].original, t[e].rect),
          i = r.rect.x + r.rect.width;
        for (let n = e + 1; n < t.length; n++) {
          if (o.has(n)) continue;
          if (t[n].rect.x > i) break;
          const e = t[n].rect;
          if (An(r.rect, e) > 0) {
            (r = Fn(r, $n(t[n].original, e))), o.add(n), (i = r.rect.x + r.rect.width);
          }
        }
        n.push(r);
      }
      return n;
    };
  function $n(e, t) {
    const n = t ?? Nn(e.activeOutline.current, e.textWidth),
      o = Array.from(e.activeOutline.groupedAggregatedRender.values());
    return { alpha: e.alpha, color: e.color, reasons: e.reasons, groupedAggregatedRender: o, rect: n };
  }
  function Fn(e, t) {
    const n = (function (e, t) {
        const n = Math.min(e.x, t.x),
          o = Math.min(e.y, t.y),
          r = Math.max(e.x + e.width, t.x + t.width),
          i = Math.max(e.y + e.height, t.y + t.height);
        return new DOMRect(n, o, r - n, i - o);
      })(e.rect, t.rect),
      o = e.groupedAggregatedRender.concat(t.groupedAggregatedRender),
      r = e.reasons | t.reasons;
    return { alpha: Math.max(e.alpha, t.alpha), ...Rn(e, t), reasons: r, groupedAggregatedRender: o, rect: n };
  }
  function Rn(e, t) {
    return e.color.r === e.color.g && e.color.g === e.color.b
      ? { color: e.color }
      : t.color.r === t.color.g && t.color.g === t.color.b
        ? { color: t.color }
        : { color: e.color.r <= t.color.r ? e.color : t.color };
  }
  function An(e, t) {
    if (e.right <= t.left || t.right <= e.left) return 0;
    if (e.bottom <= t.top || t.bottom <= e.top) return 0;
    return (
      (Math.min(e.right, t.right) - Math.max(e.left, t.left)) * (Math.min(e.bottom, t.bottom) - Math.max(e.top, t.top))
    );
  }
  function Nn(e, t) {
    const n = e.x,
      o = e.y;
    return new DOMRect(n, o, t + 4, 15);
  }
  var On = new (class {
      constructor(e) {
        (this.limit = e), (this.nodes = new Map());
      }
      has(e) {
        return this.nodes.has(e);
      }
      get(e) {
        const t = this.nodes.get(e);
        if (t) return this.bubble(t), t.value;
      }
      set(e, t) {
        if (this.nodes.has(e)) {
          const t = this.nodes.get(e);
          return void (t && this.bubble(t));
        }
        const n = new dn(e, t);
        this.insertHead(n),
          this.nodes.size === this.limit && this.tail && this.delete(this.tail.key),
          this.nodes.set(e, n);
      }
      delete(e) {
        const t = this.nodes.get(e);
        t && (this.removeNode(t), this.nodes.delete(e));
      }
      insertHead(e) {
        this.head ? ((e.next = this.head), (this.head.prev = e)) : ((this.tail = e), (e.next = void 0)),
          (e.prev = void 0),
          (this.head = e);
      }
      removeNode(e) {
        e.prev && (e.prev.next = e.next),
          e.next && (e.next.prev = e.prev),
          e === this.tail && ((this.tail = e.prev), this.tail && (this.tail.next = void 0));
      }
      insertBefore(e, t) {
        (t.next = e),
          e.prev ? ((t.prev = e.prev), (e.prev.next = t)) : ((t.prev = void 0), (this.head = t)),
          (e.prev = t);
      }
      bubble(e) {
        e.prev && (this.removeNode(e), this.insertBefore(e.prev, e));
      }
    })(100),
    Pn = (e, t) => {
      if (On.has(e)) return On.get(e);
      t.font = `11px ${_n}`;
      const n = t.measureText(e);
      return On.set(e, n), n;
    },
    jn = (e) => {
      if (!e) return null;
      const t = ((e) => {
        if ('__REACT_DEVTOOLS_GLOBAL_HOOK__' in window) {
          const { renderers: t } = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!t) return null;
          for (const [n, o] of Array.from(t))
            try {
              const t = o.findFiberByHostInstance(e);
              if (t) return t;
            } catch (e) {}
        }
        if ('_reactRootContainer' in e) return e._reactRootContainer?._internalRoot?.current?.child;
        for (const t in e) if (t.startsWith('__reactInternalInstance$') || t.startsWith('__reactFiber')) return e[t];
        return null;
      })(e);
      if (!t) return null;
      const n = Dn(t);
      return n ? n[0] : null;
    },
    Dn = (e) => {
      let t = e,
        n = null;
      for (; t; ) {
        if (g(t)) return [t, n];
        m(t) && (n = t), (t = t.return);
      }
    },
    Ln = (e) => {
      if (!e) return {};
      if (0 === e.tag || 11 === e.tag || 15 === e.tag || 14 === e.tag) {
        let t = e.memoizedState;
        const n = {};
        let o = 0;
        for (; t; ) t.queue && void 0 !== t.memoizedState && (n[o] = t.memoizedState), (t = t.next), o++;
        return n;
      }
      return (1 === e.tag && e.memoizedState) || {};
    },
    Hn = (e) => {
      let t = e,
        n = null;
      for (; t; ) {
        if (t.stateNode && Zr.instrumentation?.fiberRoots.has(t.stateNode)) {
          n = t;
          break;
        }
        t = t.return;
      }
      if (!n) return !1;
      return ((e, t) => !!x(t, (t) => t === e))(e, n.stateNode.current);
    },
    Tn = (e) => {
      const t = jn(e);
      if (!t) return {};
      const n = Hn(t) ? t : (t.alternate ?? t),
        o = ((e) => {
          let t = e;
          for (; t; ) {
            if (t.stateNode instanceof Element) return t.stateNode;
            if (!t.child) break;
            t = t.child;
          }
          for (; t; ) {
            if (t.stateNode instanceof Element) return t.stateNode;
            if (!t.return) break;
            t = t.return;
          }
          return null;
        })(n);
      if (!o) return {};
      const r = o.getBoundingClientRect();
      if (!r) return {};
      const i = Dn(n);
      if (!i) return {};
      let [a] = i;
      return (a = (Hn(a) ? a : a.alternate) ?? a), { parentCompositeFiber: a, targetRect: r };
    },
    Wn = () => {
      let e = null,
        t = null;
      if ('__REACT_DEVTOOLS_GLOBAL_HOOK__' in window) {
        const { renderers: n } = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (n)
          for (const [o, r] of Array.from(n))
            try {
              if (e) {
                const t = e;
                e = (e, n, o) => {
                  t(e, n, o), r.overrideProps(e, n, o);
                };
              } else e = r.overrideProps;
              if (t) {
                const e = t;
                t = (t, n, o) => {
                  e(t, n, o), r.overrideHookState(t, n, o);
                };
              } else t = r.overrideHookState;
            } catch (e) {}
      }
      return { overrideProps: e, overrideHookState: t };
    },
    In = null,
    Un = null,
    qn = ('undefined' != typeof window && window.devicePixelRatio) || 1,
    Bn = null,
    Vn = (e, t, n) => e * (1 - n) + t * n,
    Gn = (e, t, n, o) => {
      if (!e || !t || !n) return;
      const { parentCompositeFiber: r, targetRect: i } = Tn(e);
      if (!r || !i) return;
      const a = Jr.reportData.get(r) ?? (r.alternate ? Jr.reportData.get(r.alternate) : null),
        s = { count: a?.count ?? 0, time: a?.time ?? 0 };
      if ((n.save(), In)) {
        null !== Bn && cancelAnimationFrame(Bn);
        const e = () => {
          const a =
            'fast' === Zr.options.value.animationSpeed ? 0.51 : 'slow' === Zr.options.value.animationSpeed ? 0.1 : 0;
          (In = {
            left: Vn(In.left, i.left, a),
            top: Vn(In.top, i.top, a),
            width: Vn(In.width, i.width, a),
            height: Vn(In.height, i.height, a),
          }),
            Kn(In, t, n, o, s, r);
          Math.abs(In.left - i.left) > 0.1 ||
          Math.abs(In.top - i.top) > 0.1 ||
          Math.abs(In.width - i.width) > 0.1 ||
          Math.abs(In.height - i.height) > 0.1
            ? (Bn = requestAnimationFrame(e))
            : ((In = i), (Bn = null));
        };
        Bn = requestAnimationFrame(e);
      } else Kn(i, t, n, o, s, r), (In = i);
      n.restore();
    },
    Xn = (e, t) => {
      e &&
        ((e.width = Math.floor(window.innerWidth * qn)),
        (e.height = Math.floor(window.innerHeight * qn)),
        t && (t.setTransform(1, 0, 0, 1, 0, 0), t.scale(qn, qn)));
    },
    Yn = (e, t, n, o, r) => {
      let i = z(r?.type) ?? 'Unknown';
      n.count && ((i += ` • ×${n.count}`), n.time && (i += ` (${n.time.toFixed(1)}ms)`)),
        e.save(),
        (e.font = '12px system-ui, -apple-system, sans-serif');
      const a = 'locked' === o ? 14 : 0,
        s = 'locked' === o ? 6 : 0,
        l = e.measureText(i).width + 16 + a + s,
        c = t.left,
        d = t.top - 24 - 4;
      if (
        ((e.fillStyle = 'rgb(37, 37, 38, .75)'), e.beginPath(), e.roundRect(c, d, l, 24, 3), e.fill(), 'locked' === o)
      ) {
        const t = c + 8,
          n = d + (24 - a) / 2 + 2;
        ((e, t, n, o) => {
          e.save(), (e.strokeStyle = 'white'), (e.fillStyle = 'white'), (e.lineWidth = 1.5);
          const r = 0.6 * o,
            i = 0.5 * o,
            a = t + (o - r) / 2,
            s = n;
          e.beginPath(), e.arc(a + r / 2, s + i / 2, r / 2, Math.PI, 0, !1), e.stroke();
          const l = 0.8 * o,
            c = 0.5 * o,
            d = t + (o - l) / 2,
            u = n + i / 2;
          e.fillRect(d, u, l, c), e.restore();
        })(e, t, n, a),
          (Un = { x: t, y: n, width: a, height: a });
      } else Un = null;
      (e.fillStyle = 'white'), (e.textBaseline = 'middle');
      const u = c + 8 + ('locked' === o ? a + s : 0);
      e.fillText(i, u, d + 12), e.restore();
    },
    Kn = (e, t, n, o, r, i) => {
      n.clearRect(0, 0, t.width, t.height),
        'locked' === o
          ? ((n.strokeStyle = 'rgba(142, 97, 227, 0.5)'), (n.fillStyle = 'rgba(173, 97, 230, 0.10)'), n.setLineDash([]))
          : ((n.strokeStyle = 'rgba(142, 97, 227, 0.5)'),
            (n.fillStyle = 'rgba(173, 97, 230, 0.10)'),
            n.setLineDash([4])),
        (n.lineWidth = 1),
        n.fillRect(e.left, e.top, e.width, e.height),
        n.strokeRect(e.left, e.top, e.width, e.height),
        Yn(n, e, r, o, i);
    };
  function Jn() {
    if (!this.node) {
      const e = document.createElement('template');
      (e.innerHTML = this.html), (this.node = this.isSVG ? e.content.firstChild.firstChild : e.content.firstChild);
    }
    return this.node.cloneNode(!0);
  }
  function Zn(e, t) {
    return Jn.bind({ node: void 0, html: e, isSVG: t });
  }
  var Qn = 0,
    eo = performance.now(),
    to = 0,
    no = !1,
    oo = () => {
      to++;
      const e = performance.now();
      e - eo >= 1e3 && ((Qn = to), (to = 0), (eo = e)), requestAnimationFrame(oo);
    },
    ro = () => (no || ((no = !0), oo(), (Qn = 60)), Qn),
    io = (e, t) => lo(e) === lo(t) && ao.includes(typeof e) && ao.includes(typeof t),
    ao = ['function', 'object'],
    so = new WeakMap();
  function lo(e, t = 0) {
    if (t < 0) return '…';
    switch (typeof e) {
      case 'function':
        return e.toString();
      case 'string':
        return e;
      case 'number':
      case 'boolean':
      case 'undefined':
      default:
        return String(e);
      case 'object':
    }
    if (null === e) return 'null';
    if (so.has(e)) return so.get(e);
    if (Array.isArray(e)) {
      const t = e.length ? `[${e.length}]` : '[]';
      return so.set(e, t), t;
    }
    if (h(e)) {
      const t = `<${z(e.type) ?? ''} ${e.props ? Object.keys(e.props).length : 0}>`;
      return so.set(e, t), t;
    }
    if (Object.getPrototypeOf(e) === Object.prototype) {
      const t = Object.keys(e),
        n = t.length ? `{${t.length}}` : '{}';
      return so.set(e, n), n;
    }
    const n = e.constructor;
    if (n && 'function' == typeof n && n.name) {
      const t = `${n.name}{…}`;
      return so.set(e, t), t;
    }
    const o = `${Object.prototype.toString.call(e).slice(8, -1)}{…}`;
    return so.set(e, o), o;
  }
  function co(e, t) {
    if (hn(e.memoizedState, t.memoizedState)) return;
    const n = { type: 'state', name: '', prevValue: e.memoizedState, nextValue: t.memoizedState, unstable: !1 };
    this.push(n);
  }
  var uo = (e) => {
    const t = [];
    return (
      ((e, t) => {
        try {
          let n = e.memoizedState,
            o = e.alternate?.memoizedState;
          for (; n && o; ) {
            if (!0 === t(n, o)) return !0;
            (n = n.next), (o = o.next);
          }
        } catch {}
      })(e, co.bind(t)),
      t
    );
  };
  function po(e, t) {
    const n = e.memoizedValue,
      o = t.memoizedValue,
      r = { type: 'context', name: '', prevValue: n, nextValue: o, unstable: !1 };
    this.push(r);
    const i = lo(n),
      a = lo(o);
    ao.includes(typeof n) && ao.includes(typeof o) && i === a && (r.unstable = !0);
  }
  var fo = (e) => {
      const t = [];
      return (
        ((e, t) => {
          try {
            const n = e.dependencies,
              o = e.alternate?.dependencies;
            if (!n || !o) return !1;
            if ('object' != typeof n || !('firstContext' in n) || 'object' != typeof o || !('firstContext' in o))
              return !1;
            let r = n.firstContext,
              i = o.firstContext;
            for (
              ;
              r && 'object' == typeof r && 'memoizedValue' in r && i && 'object' == typeof i && 'memoizedValue' in i;

            ) {
              if (!0 === t(r, i)) return !0;
              (r = r.next), (i = i.next);
            }
          } catch {}
        })(e, po.bind(t)),
        t
      );
    },
    ho = new Map(),
    mo = !1,
    go = () => Array.from(ho.values());
  function vo(e, t) {
    hn(e, t) || io(e, t) || (this.isRequiredChange = !0);
  }
  var wo,
    bo,
    yo,
    _o = (e) => {
      if (!b(e)) return !0;
      const t = ((e) => {
        const t = [],
          n = [e];
        for (; n.length; ) {
          const e = n.pop();
          e && (m(e) && b(e) && w(e) && t.push(e), e.child && n.push(e.child), e.sibling && n.push(e.sibling));
        }
        return t;
      })(e);
      for (const e of t) {
        const t = { isRequiredChange: !1 };
        if ((v(e, vo.bind(t)), t.isRequiredChange)) return !1;
      }
      return !0;
    },
    xo = () => {
      if (!Zr.options.value.trackUnnecessaryRenders) return !1;
      const e = ii();
      return (
        !!(
          e &&
          Jr.monitor.value &&
          Zr.options.value.dangerouslyForceRunInProduction &&
          Zr.options.value.trackUnnecessaryRenders
        ) ||
        ((!e || !Jr.monitor.value) && Zr.options.value.trackUnnecessaryRenders)
      );
    },
    ko = (e, t) => {
      const n = { isPaused: Ke(!Zr.options.value.enabled), fiberRoots: new Set() };
      if ((ho.set(e, { key: e, config: t, instrumentation: n }), !mo)) {
        mo = !0;
        const e = (
          ({ onRender: e, onError: t }) =>
          (n, o, r) => {
            const i = o.current,
              a = (t, n) => e(t, n, r);
            let s = L.get(o);
            s || ((s = { prevFiber: null, id: D++ }), L.set(o, s));
            const { prevFiber: l } = s;
            try {
              if (i)
                if (null !== l) {
                  const e =
                      l &&
                      null != l.memoizedState &&
                      null != l.memoizedState.element &&
                      !0 !== l.memoizedState.isDehydrated,
                    t =
                      null != i.memoizedState && null != i.memoizedState.element && !0 !== i.memoizedState.isDehydrated;
                  !e && t ? N(a, i, !1) : e && t ? O(a, i, i.alternate, null) : e && !t && P(a, i);
                } else N(a, i, !1);
              else P(a, o);
            } catch (e) {
              if (!t) throw e;
              t(e);
            }
            s.prevFiber = i;
          }
        )({
          onRender(e, n) {
            const o = C(e.type);
            if (!o) return null;
            const r = go(),
              i = [];
            for (let t = 0, n = r.length; t < n; t++) {
              r[t].config.isValidFiber(e) && i.push(t);
            }
            if (!i.length) return null;
            const a = [];
            if (t.trackChanges) {
              const t = ((e) => {
                  const t = [],
                    n = e.alternate?.memoizedProps || {},
                    o = e.memoizedProps || {},
                    r = new Set([...Object.keys(n), ...Object.keys(o)]);
                  for (const e in r) {
                    const r = n?.[e],
                      i = o?.[e];
                    if (hn(r, i) || h(r) || h(i)) continue;
                    const a = { type: 'props', name: e, prevValue: r, nextValue: i, unstable: !1 };
                    t.push(a), io(r, i) && (a.unstable = !0);
                  }
                  return t;
                })(e),
                n = uo(e),
                o = fo(e);
              for (let e = 0, n = t.length; e < n; e++) {
                const n = t[e];
                a.push(n);
              }
              for (let e = 0, t = n.length; e < t; e++) {
                const t = n[e];
                a.push(t);
              }
              for (let e = 0, t = o.length; e < t; e++) {
                const t = o[e];
                a.push(t);
              }
            }
            const { selfTime: s } = k(e),
              l = ro(),
              c = {
                phase: n,
                componentName: z(o),
                count: 1,
                changes: a,
                time: s,
                forget: S(e),
                unnecessary: xo() ? _o(e) : null,
                didCommit: b(e),
                fps: l,
              };
            for (let t = 0, n = i.length; t < n; t++) {
              r[i[t]].config.onRender(e, [c]);
            }
          },
          onError(e) {
            const t = go();
            for (const n of t) n.config.onError(e);
          },
        });
        (({ onCommitFiberRoot: e, onCommitFiberUnmount: t, onPostCommitFiberRoot: n, onActive: o, name: r }) => {
          const i = R(o);
          i._instrumentationSource = r ?? f;
          const a = i.onCommitFiberRoot;
          e &&
            (i.onCommitFiberRoot = (t, n, o) => {
              a && a(t, n, o), e(t, n, o);
            });
          const s = i.onCommitFiberUnmount;
          t &&
            (i.onCommitFiberUnmount = (e, n) => {
              s && s(e, n), t(e, n);
            });
          const l = i.onPostCommitFiberRoot;
          n &&
            (i.onPostCommitFiberRoot = (e, t) => {
              l && l(e, t);
            });
        })({
          name: 'react-scan',
          onActive: t.onActive,
          onCommitFiberRoot(n, o) {
            if (
              Zr.instrumentation?.isPaused.value &&
              ('inspect-off' === Jr.inspectState.value.kind || 'uninitialized' === Jr.inspectState.value.kind) &&
              !t.forceAlwaysTrackRenders
            )
              return;
            const r = go();
            for (const e of r) e.config.onCommitStart();
            e(n, o);
            for (const e of r) e.config.onCommitFinish();
          },
        });
      }
      return n;
    },
    So = new Set(),
    Co = new WeakMap(),
    zo = { props: new Map(), state: new Map(), context: new Map() },
    Eo = Zn(
      '<details class=react-scan-what-changed style="background-color:#b8860b;color:#ffff00;padding:5px"><summary class=font-bold>What changed?',
      !1,
    ),
    Mo = Zn('<div>Props:', !1),
    $o = Zn('<ul style="list-style-type:disc;padding-left:20px">', !1),
    Fo = Zn('<div>State:', !1),
    Ro = Zn('<div>State:', !1),
    Ao = (e, t) => {
      const n = Jr.inspectState.value.propContainer;
      if (!n) return;
      const o = jo(
          () =>
            Array.from(
              ((e) => {
                const t = new Map();
                if (!e) return t;
                let n = e;
                for (; n; ) {
                  const e = n.dependencies;
                  if (e?.firstContext) {
                    let n = e.firstContext;
                    for (; n; ) {
                      const e = n.context,
                        o = e._currentValue;
                      t.has(e) || t.set(e, o), (n = n.next);
                    }
                  }
                  if (n.type?._context) {
                    const e = n.type._context,
                      o = n.memoizedProps?.value;
                    t.has(e) || t.set(e, o);
                  }
                  n = n.return;
                }
                return t;
              })(t).entries(),
            ).map((e) => e[1]),
          [],
        ),
        r = t.type?.displayName || t.type?.name || 'Unknown',
        i = t.memoizedProps || {},
        a = Ln(t) || {},
        s = new Set(
          ((e) => {
            const t = new Set(),
              n = e.memoizedProps || {},
              o = e.alternate?.memoizedProps || {};
            for (const e in n) n[e] !== o[e] && 'children' !== e && t.add(e);
            return t;
          })(t),
        ),
        l = new Set(
          ((e) => {
            const t = new Set(),
              n = Ln(e),
              o = e.alternate ? Ln(e.alternate) : {};
            for (const e in n) n[e] !== o[e] && t.add(e);
            return t;
          })(t),
        ),
        c = new Set();
      for (const e of s) zo.props.set(e, (zo.props.get(e) ?? 0) + 1);
      for (const e of l) zo.state.set(e, (zo.state.get(e) ?? 0) + 1);
      for (const e of c) zo.context.set(e, (zo.context.get(e) ?? 0) + 1);
      if (((n.innerHTML = ''), zo.props.size > 0)) for (const [e, t] of zo.props);
      if (zo.state.size > 0) for (const [e, t] of zo.state);
      if (zo.context.size > 0) for (const [e, t] of zo.context);
      const d = Eo();
      if (((d.open = Jr.wasDetailsOpen.value), zo.props.size > 0)) {
        const e = Mo(),
          t = $o();
        for (const [e, n] of zo.props) {
          const o = document.createElement('li');
          (o.textContent = `${e} ×${n}`), t.appendChild(o);
        }
        d.appendChild(e), d.appendChild(t);
      }
      if (zo.state.size > 0) {
        const e = Fo(),
          t = $o();
        for (const [e, n] of zo.state) {
          const o = document.createElement('li');
          (o.textContent = `${e} ×${n}`), t.appendChild(o);
        }
        d.appendChild(e), d.appendChild(t);
      }
      if (zo.context.size > 0) {
        const e = Ro(),
          t = $o();
        for (const [e, n] of zo.context) {
          const o = document.createElement('li');
          (o.textContent = `${e} ×${n}`), t.appendChild(o);
        }
        d.appendChild(e), d.appendChild(t);
      }
      d.addEventListener('toggle', () => {
        Jr.wasDetailsOpen.value = d.open;
      }),
        n.appendChild(d);
      const u = document.createElement('div');
      u.className = 'react-scan-inspector';
      const p = document.createElement('div');
      p.className = 'react-scan-content';
      const f = [];
      Object.values(i).length &&
        jo(() => {
          f.push({ element: No(r, e, t, n, 'Props', i, s), hasChanges: s.size > 0 });
        }, null),
        o.length &&
          jo(() => {
            const i = new Set(),
              a = Object.fromEntries(o.map((e, t) => [t.toString(), e]));
            for (const [e, t] of Object.entries(a)) {
              const n = `${r}.context.${e}`,
                o = Po.get(n),
                s = void 0 !== o && o !== a[e],
                l = s && ['object', 'function'].includes(typeof o) && lo(o) === lo(a[e]);
              if ((s && (i.add(e), Oo.set(n, Date.now())), l)) {
                delete a[e];
                (a[`⚠️ ${e}`] = t), Oo.set(`${r}.context.${e}`, Date.now());
              }
              Po.set(n, t);
            }
            f.push({ element: No(r, e, t, n, 'Context', a, i), hasChanges: i.size > 0 });
          }, null),
        Object.values(a).length &&
          jo(() => {
            const o = Array.isArray(a) ? Object.fromEntries(a.map((e, t) => [t.toString(), e])) : a;
            for (const [e, t] of Object.entries(o)) {
              const n = `${r}.state.${e}`,
                o = Po.get(n);
              void 0 !== o && o !== t && Oo.set(n, Date.now()), Po.set(n, t);
            }
            f.push({ element: No(r, e, t, n, 'State', o, l), hasChanges: l.size > 0 });
          }, null);
      for (const e of f) p.appendChild(e.element);
      u.appendChild(p), n.appendChild(u);
    },
    No = (e, t, n, o, r, i, a = new Set()) => {
      const s = document.createElement('div');
      (s.className = 'react-scan-section'), (s.dataset.section = r);
      for (const l in i) {
        const c = i[l],
          d = Uo(e, t, o, n, l, c, r.toLowerCase(), 0, a, '', new WeakMap());
        d && s.appendChild(d);
      }
      return s;
    },
    Oo = new Map(),
    Po = new Map(),
    jo = (e, t) => {
      try {
        return e();
      } catch (e) {
        return t;
      }
    },
    Do = Zn('<div class=react-scan-property>', !1),
    Lo = Zn('<span class=react-scan-arrow>', !1),
    Ho = Zn('<div class=react-scan-property-content>', !1),
    To = Zn('<div class=react-scan-preview-line>', !1),
    Wo = Zn('<input type=text class=react-scan-input>', !1),
    Io = Zn('<div class=react-scan-flash-overlay>', !1),
    Uo = (e, t, n, o, r, i, a = '', s = 0, l = new Set(), c = '', d = new WeakMap()) => {
      try {
        wo ||
          (wo = setInterval(() => {
            for (const [e, t] of Oo) Date.now() - t > 450 && Oo.delete(e);
          }, 200));
        const u = Do(),
          p =
            !((e) => e && (e instanceof Promise || ('object' == typeof e && 'then' in e)))(i) &&
            ((Array.isArray(i) && i.length > 0) || ('object' == typeof i && null !== i && Object.keys(i).length > 0)),
          f = ((e, t, n, o) => (n ? `${e}.${n}.${o}` : `${e}.${t}.${o}`))(e, a, c, r),
          h = Po.get(f),
          m = void 0 !== h && h !== i,
          g = i && ['object', 'function'].includes(typeof i) && lo(i) === lo(h) && m;
        if ((Po.set(f, i), p)) {
          const c = So.has(f);
          if ('object' == typeof i && null !== i) {
            let e = d.get(i);
            if ((e || ((e = new Set()), d.set(i, e)), e.has(f))) return qo(r);
            e.add(f);
          }
          u.classList.add('react-scan-expandable'), c && u.classList.add('react-scan-expanded');
          const p = Lo(),
            h = Ho(),
            m = To();
          (m.dataset.key = r),
            (m.dataset.section = a),
            (m.innerHTML = `\n        ${g ? '<span class="react-scan-warning">⚠️</span>' : ''}\n        <span class="react-scan-key">${r}:&nbsp;</span><span class="${Bo(i)} react-scan-value truncate">${Vo(i)}</span>\n      `);
          const v = document.createElement('div');
          if (
            ((v.className = c ? 'react-scan-nested-object' : 'react-scan-nested-object react-scan-hidden'),
            h.appendChild(m),
            h.appendChild(v),
            u.appendChild(h),
            c)
          )
            if (Array.isArray(i))
              for (let r = 0, c = i.length; r < c; r++) {
                const c = Uo(e, t, n, o, `${r}`, i[r], a, s + 1, l, f, d);
                c && v.appendChild(c);
              }
            else
              for (const c in i) {
                const u = i[r],
                  p = Uo(e, t, n, o, c, u, a, s + 1, l, f, d);
                p && v.appendChild(p);
              }
          p.addEventListener('click', (r) => {
            r.stopPropagation();
            if (!u.classList.contains('react-scan-expanded')) {
              if (
                (So.add(f),
                u.classList.add('react-scan-expanded'),
                v.classList.remove('react-scan-hidden'),
                !v.hasChildNodes())
              )
                if (Array.isArray(i))
                  for (let r = 0, c = i.length; r < c; r++) {
                    const c = Uo(e, t, n, o, `${r}`, i[r], a, s + 1, l, f, new WeakMap());
                    c && v.appendChild(c);
                  }
                else
                  for (const r in i) {
                    const c = i[r],
                      d = Uo(e, t, n, o, r, c, a, s + 1, l, f, new WeakMap());
                    d && v.appendChild(d);
                  }
            } else So.delete(f), u.classList.remove('react-scan-expanded'), v.classList.add('react-scan-hidden');
          });
        } else {
          const e = To();
          if (
            ((e.dataset.key = r),
            (e.dataset.section = a),
            (e.innerHTML = `\n        ${g ? '<span class="react-scan-warning">⚠️</span>' : ''}\n        <span class="react-scan-key">${r}:&nbsp;</span><span class="${Bo(i)} react-scan-value truncate">${Vo(i)}</span>\n      `),
            u.appendChild(e),
            'props' === a || 'state' === a)
          ) {
            const t = e.querySelector('.react-scan-value'),
              { overrideProps: n, overrideHookState: s } = Wn();
            t &&
              ('props' === a ? !!n : !!s) &&
              ('string' == typeof i || 'number' == typeof i || 'boolean' == typeof i) &&
              (t.classList.add('react-scan-editable'),
              t.addEventListener('click', (e) => {
                e.stopPropagation();
                const n = Wo();
                n.value = i.toString();
                const s = () => {
                  const e = n.value;
                  (i = 'number' == typeof i ? Number(e) : e),
                    (t.dataset.text = Vo(i)),
                    jo(() => {
                      n.replaceWith(t);
                    }, null),
                    jo(() => {
                      const { overrideProps: e, overrideHookState: t } = Wn();
                      e && 'props' === a && e(o, [r], i), t && 'state' === a && t(o, r, [], i);
                    }, null);
                };
                n.addEventListener('blur', s),
                  n.addEventListener('keydown', (e) => {
                    'Enter' === e.key && s();
                  }),
                  t.replaceWith(n),
                  n.focus();
              }));
          }
        }
        if ((l.has(r) && Oo.set(f, Date.now()), Oo.has(f))) {
          const e = Io();
          u.appendChild(e), (e.style.opacity = '.9');
          const t = Co.get(e);
          void 0 !== t && clearTimeout(t);
          const n = setTimeout(() => {
            (e.style.transition = 'opacity 400ms ease-out'), (e.style.opacity = '0'), Co.delete(e);
          }, 300);
          Co.set(e, n);
        }
        return u;
      } catch {
        return null;
      }
    },
    qo = (e) => {
      const t = Do(),
        n = To();
      return (
        (n.innerHTML = `\n    <span class="react-scan-key">${e}:&nbsp;</span><span class="react-scan-circular">[Circular Reference]</span>\n  `),
        t.appendChild(n),
        t
      );
    },
    Bo = (e) => {
      if (Array.isArray(e)) return 'react-scan-array';
      if (null == e) return 'react-scan-null';
      switch (typeof e) {
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
    },
    Vo = (e) => {
      if (Array.isArray(e)) return `Array(${e.length})`;
      if (null === e) return 'null';
      if (void 0 === e) return 'undefined';
      switch (typeof e) {
        case 'string':
          return `&quot;${e}&quot;`;
        case 'number':
        case 'boolean':
          return e.toString();
        case 'object': {
          if (e instanceof Promise) return 'Promise';
          const t = Object.keys(e);
          return t.length <= 3 ? `{${t.join(', ')}}` : `{${t.slice(0, 8).join(', ')}, ...}`;
        }
        default:
          return typeof e;
      }
    },
    Go = 'react-scan-inspect-canvas',
    Xo = (e, t) => {
      const n = () => {
        t(e);
      };
      return (
        document.addEventListener('scroll', n, { passive: !0, capture: !0 }),
        () => {
          document.removeEventListener('scroll', n, { capture: !0 });
        }
      );
    },
    Yo = 0,
    Ko = Math.max(0, Math.min(1, sn('react-scan-volume') ?? 0.5)),
    Jo = {
      firefox: {
        duration: 0.02,
        oscillatorType: 'sine',
        startFreq: 220,
        endFreq: 110,
        attack: 5e-4,
        volumeMultiplier: Ko,
      },
      default: {
        duration: 0.001,
        oscillatorType: 'sine',
        startFreq: 440,
        endFreq: 220,
        attack: 5e-4,
        volumeMultiplier: Ko,
      },
    },
    Zo = rn ? Jo.firefox : Jo.default,
    Qo = (e, t) => {
      const n = performance.now();
      if (n - Yo < 32) return;
      Yo = n;
      const o = e.currentTime,
        { duration: r, oscillatorType: i, startFreq: a, endFreq: s, attack: l } = Zo,
        c = Math.max(0.5, t) * Zo.volumeMultiplier,
        d = new OscillatorNode(e, { type: i, frequency: a + 200 * t }),
        u = new GainNode(e, { gain: 0 });
      d.frequency.exponentialRampToValueAtTime(s, o + r),
        u.gain.linearRampToValueAtTime(c, o + l),
        d.connect(u).connect(e.destination),
        d.start(o),
        d.stop(o + r);
    },
    er = 24,
    tr = 360,
    nr = 36,
    or = 'react-scan-widget-settings',
    rr = Ke(null),
    ir = {
      corner: 'top-left',
      dimensions: { isFullWidth: !1, isFullHeight: !1, width: tr, height: nr, position: { x: er, y: er } },
      lastDimensions: { isFullWidth: !1, isFullHeight: !1, width: tr, height: nr, position: { x: er, y: er } },
    },
    ar = Ke(
      ((e = !1) => {
        if ('undefined' == typeof window && e) return ir;
        const t = sn(or);
        if (!t) {
          const e = {
            corner: 'top-left',
            dimensions: { isFullWidth: !1, isFullHeight: !1, width: tr, height: nr, position: { x: 24, y: 24 } },
            lastDimensions: { isFullWidth: !1, isFullHeight: !1, width: 360, height: 240, position: { x: 24, y: 24 } },
          };
          return ln(or, { corner: e.corner, dimensions: e.dimensions, lastDimensions: e.lastDimensions }), e;
        }
        return {
          corner: t.corner,
          dimensions: { isFullWidth: !1, isFullHeight: !1, width: tr, height: nr, position: t.dimensions.position },
          lastDimensions: t.dimensions,
        };
      })(),
    ),
    sr = () => {
      if ('undefined' == typeof window) return;
      const { dimensions: e } = ar.value,
        { width: t, height: n, position: o } = e;
      ar.value = {
        ...ar.value,
        dimensions: {
          isFullWidth: t >= window.innerWidth - 48,
          isFullHeight: n >= window.innerHeight - 48,
          width: t,
          height: n,
          position: o,
        },
      };
    };
  function lr(e, t) {
    for (var n in e) if ('__source' !== n && !(n in t)) return !0;
    for (var o in t) if ('__source' !== o && e[o] !== t[o]) return !0;
    return !1;
  }
  function cr(e, t) {
    (this.props = e), (this.context = t);
  }
  ((cr.prototype = new ee()).isPureReactComponent = !0),
    (cr.prototype.shouldComponentUpdate = function (e, t) {
      return lr(this.props, e) || lr(this.state, t);
    });
  var dr = n.__b;
  n.__b = function (e) {
    e.type && e.type.__f && e.ref && ((e.props.ref = e.ref), (e.ref = null)), dr && dr(e);
  };
  var ur = ('undefined' != typeof Symbol && Symbol.for && Symbol.for('react.forward_ref')) || 3911;
  var pr = n.__e;
  n.__e = function (e, t, n, o) {
    if (e.then)
      for (var r, i = t; (i = i.__); )
        if ((r = i.__c) && r.__c) return null == t.__e && ((t.__e = n.__e), (t.__k = n.__k)), r.__c(e, t);
    pr(e, t, n, o);
  };
  var fr = n.unmount;
  function hr(e, t, n) {
    return (
      e &&
        (e.__c &&
          e.__c.__H &&
          (e.__c.__H.__.forEach(function (e) {
            'function' == typeof e.__c && e.__c();
          }),
          (e.__c.__H = null)),
        null !=
          (e = (function (e, t) {
            for (var n in t) e[n] = t[n];
            return e;
          })({}, e)).__c && (e.__c.__P === n && (e.__c.__P = t), (e.__c = null)),
        (e.__k =
          e.__k &&
          e.__k.map(function (e) {
            return hr(e, t, n);
          }))),
      e
    );
  }
  function mr(e, t, n) {
    return (
      e &&
        n &&
        ((e.__v = null),
        (e.__k =
          e.__k &&
          e.__k.map(function (e) {
            return mr(e, t, n);
          })),
        e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), (e.__c.__e = !0), (e.__c.__P = n))),
      e
    );
  }
  function gr() {
    (this.__u = 0), (this.o = null), (this.__b = null);
  }
  function vr(e) {
    var t = e.__.__c;
    return t && t.__a && t.__a(e);
  }
  function wr() {
    (this.i = null), (this.l = null);
  }
  (n.unmount = function (e) {
    var t = e.__c;
    t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), fr && fr(e);
  }),
    ((gr.prototype = new ee()).__c = function (e, t) {
      var n = t.__c,
        o = this;
      null == o.o && (o.o = []), o.o.push(n);
      var r = vr(o.__v),
        i = !1,
        a = function () {
          i || ((i = !0), (n.__R = null), r ? r(s) : s());
        };
      n.__R = a;
      var s = function () {
        if (!--o.__u) {
          if (o.state.__a) {
            var e = o.state.__a;
            o.__v.__k[0] = mr(e, e.__c.__P, e.__c.__O);
          }
          var t;
          for (o.setState({ __a: (o.__b = null) }); (t = o.o.pop()); ) t.forceUpdate();
        }
      };
      o.__u++ || 32 & t.__u || o.setState({ __a: (o.__b = o.__v.__k[0]) }), e.then(a, a);
    }),
    (gr.prototype.componentWillUnmount = function () {
      this.o = [];
    }),
    (gr.prototype.render = function (e, t) {
      if (this.__b) {
        if (this.__v.__k) {
          var n = document.createElement('div'),
            o = this.__v.__k[0].__c;
          this.__v.__k[0] = hr(this.__b, n, (o.__O = o.__P));
        }
        this.__b = null;
      }
      var r = t.__a && J(Q, null, e.fallback);
      return r && (r.__u &= -33), [J(Q, null, t.__a ? null : e.children), r];
    });
  var br = function (e, t, n) {
    if ((++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && ('t' !== e.props.revealOrder[0] || !e.l.size)))
      for (n = e.i; n; ) {
        for (; n.length > 3; ) n.pop()();
        if (n[1] < n[0]) break;
        e.i = n = n[2];
      }
  };
  ((wr.prototype = new ee()).__a = function (e) {
    var t = this,
      n = vr(t.__v),
      o = t.l.get(e);
    return (
      o[0]++,
      function (r) {
        var i = function () {
          t.props.revealOrder ? (o.push(r), br(t, e, o)) : r();
        };
        n ? n(i) : i();
      }
    );
  }),
    (wr.prototype.render = function (e) {
      (this.i = null), (this.l = new Map());
      var t = se(e.children);
      e.revealOrder && 'b' === e.revealOrder[0] && t.reverse();
      for (var n = t.length; n--; ) this.l.set(t[n], (this.i = [1, 0, this.i]));
      return e.children;
    }),
    (wr.prototype.componentDidUpdate = wr.prototype.componentDidMount =
      function () {
        var e = this;
        this.l.forEach(function (t, n) {
          br(e, n, t);
        });
      });
  var yr = ('undefined' != typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103,
    _r =
      /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    xr = /^on(Ani|Tra|Tou|BeforeInp|Compo)/,
    kr = /[A-Z0-9]/g,
    Sr = 'undefined' != typeof document,
    Cr = function (e) {
      return ('undefined' != typeof Symbol && 'symbol' == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(e);
    };
  (ee.prototype.isReactComponent = {}),
    ['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate'].forEach(function (e) {
      Object.defineProperty(ee.prototype, e, {
        configurable: !0,
        get: function () {
          return this['UNSAFE_' + e];
        },
        set: function (t) {
          Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
        },
      });
    });
  var zr = n.event;
  function Er() {}
  function Mr() {
    return this.cancelBubble;
  }
  function $r() {
    return this.defaultPrevented;
  }
  n.event = function (e) {
    return (
      zr && (e = zr(e)),
      (e.persist = Er),
      (e.isPropagationStopped = Mr),
      (e.isDefaultPrevented = $r),
      (e.nativeEvent = e)
    );
  };
  var Fr = {
      enumerable: !1,
      configurable: !0,
      get: function () {
        return this.class;
      },
    },
    Rr = n.vnode;
  n.vnode = function (e) {
    'string' == typeof e.type &&
      (function (e) {
        var t = e.props,
          n = e.type,
          o = {},
          r = -1 === n.indexOf('-');
        for (var i in t) {
          var a = t[i];
          if (
            !(
              ('value' === i && 'defaultValue' in t && null == a) ||
              (Sr && 'children' === i && 'noscript' === n) ||
              'class' === i ||
              'className' === i
            )
          ) {
            var s = i.toLowerCase();
            'defaultValue' === i && 'value' in t && null == t.value
              ? (i = 'value')
              : 'download' === i && !0 === a
                ? (a = '')
                : 'translate' === s && 'no' === a
                  ? (a = !1)
                  : 'o' === s[0] && 'n' === s[1]
                    ? 'ondoubleclick' === s
                      ? (i = 'ondblclick')
                      : 'onchange' !== s || ('input' !== n && 'textarea' !== n) || Cr(t.type)
                        ? 'onfocus' === s
                          ? (i = 'onfocusin')
                          : 'onblur' === s
                            ? (i = 'onfocusout')
                            : xr.test(i) && (i = s)
                        : (s = i = 'oninput')
                    : r && _r.test(i)
                      ? (i = i.replace(kr, '-$&').toLowerCase())
                      : null === a && (a = void 0),
              'oninput' === s && o[(i = s)] && (i = 'oninputCapture'),
              (o[i] = a);
          }
        }
        'select' == n &&
          o.multiple &&
          Array.isArray(o.value) &&
          (o.value = se(t.children).forEach(function (e) {
            e.props.selected = -1 != o.value.indexOf(e.props.value);
          })),
          'select' == n &&
            null != o.defaultValue &&
            (o.value = se(t.children).forEach(function (e) {
              e.props.selected = o.multiple
                ? -1 != o.defaultValue.indexOf(e.props.value)
                : o.defaultValue == e.props.value;
            })),
          t.class && !t.className
            ? ((o.class = t.class), Object.defineProperty(o, 'className', Fr))
            : ((t.className && !t.class) || (t.class && t.className)) && (o.class = o.className = t.className),
          (e.props = o);
      })(e),
      (e.$$typeof = yr),
      Rr && Rr(e);
  };
  var Ar = n.__r;
  n.__r = function (e) {
    Ar && Ar(e), e.__c;
  };
  var Nr = n.diffed;
  n.diffed = function (e) {
    Nr && Nr(e);
    var t = e.props,
      n = e.__e;
    null != n &&
      'textarea' === e.type &&
      'value' in t &&
      t.value !== n.value &&
      (n.value = null == t.value ? '' : t.value);
  };
  var Or = 0;
  function Pr(e, t, o, r, i, a) {
    t || (t = {});
    var s,
      l,
      c = t;
    'ref' in t && ((s = t.ref), delete t.ref);
    var d = {
      type: e,
      props: c,
      key: o,
      ref: s,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __c: null,
      constructor: void 0,
      __v: --Or,
      __i: -1,
      __u: 0,
      __source: i,
      __self: a,
    };
    if ('function' == typeof e && (s = e.defaultProps)) for (l in s) void 0 === c[l] && (c[l] = s[l]);
    return n.vnode && n.vnode(d), d;
  }
  var jr,
    Dr = (function (e) {
      function t(t) {
        if (!('ref' in t)) return e(t, null);
        var n = t.ref;
        delete t.ref;
        var o = e(t, n);
        return (t.ref = n), o;
      }
      return (
        (t.$$typeof = ur),
        (t.render = t),
        (t.prototype.isReactComponent = t.__f = !0),
        (t.displayName = 'ForwardRef(' + (e.displayName || e.name) + ')'),
        t
      );
    })((e, t) => {
      const {
        size: n = 15,
        name: o,
        fill: r = 'currentColor',
        stroke: i = 'currentColor',
        className: a,
        externalURL: s = '',
        style: l,
      } = e;
      return Pr('svg', {
        ref: t,
        ...{
          width: `${Array.isArray(n) ? n[0] : n}px`,
          height: `${Array.isArray(n) ? n[1] || n[0] : n}px`,
          fill: r,
          stroke: i,
          className: a,
          style: l,
        },
        children: Pr('use', { href: `${s}#${o}` }),
      });
    }),
    Lr = () => {
      const [e, t] = Me(null),
        [n, o] = Me(null),
        [r, i] = Me(null);
      var a;
      return (
        (a = (e) => {
          const n = z(e.type),
            r = Jr.reportData.get(e);
          t(n ?? 'Unknown'), o(r?.count ?? null), i(r?.time && r.time > 0 ? r?.time : null);
        }),
        $e(() => {
          const e = () => {
              if ('focused' !== Jr.inspectState.value.kind) return;
              const e = Jr.inspectState.value.focusedDomElement,
                { parentCompositeFiber: t } = Tn(e);
              t && a(t);
            },
            t = Jr.lastReportTime.subscribe(e),
            n = Jr.inspectState.subscribe(e);
          return () => {
            t(), n();
          };
        }, []),
        Pr('div', {
          class: 'react-scan-header',
          children: [
            Pr('div', {
              style: { gap: '0.5rem', display: 'flex', width: '50%', justifyContent: 'start', alignItems: 'center' },
              children: [
                Pr('span', { children: e }),
                null !== n && Pr('span', { children: ['• x', n, ' '] }),
                null !== r && Pr('span', { class: 'react-scan-component-time', children: ['• ', r.toFixed(2), 'ms'] }),
              ],
            }),
            Pr('div', {
              style: { width: '50%', display: 'flex', justifyContent: 'end', alignItems: 'center', columnGap: '2px' },
              children: Pr('button', {
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
                  Jr.inspectState.value.propContainer &&
                    (Jr.inspectState.value = {
                      kind: 'inspect-off',
                      propContainer: Jr.inspectState.value.propContainer,
                    });
                },
                children: Pr(Dr, { name: 'icon-close' }),
              }),
            }),
          ],
        })
      );
    },
    Hr = (() => {
      let e = null;
      return () => {
        const t = window.innerWidth,
          n = window.innerHeight;
        if (e && e.width === t && e.height === n)
          return {
            maxWidth: e.maxWidth,
            maxHeight: e.maxHeight,
            rightEdge: e.rightEdge,
            bottomEdge: e.bottomEdge,
            isFullWidth: e.isFullWidth,
            isFullHeight: e.isFullHeight,
          };
        const o = t - 48,
          r = n - 48;
        return (
          (e = {
            width: t,
            height: n,
            maxWidth: o,
            maxHeight: r,
            rightEdge: (e) => t - e - er,
            bottomEdge: (e) => n - e - er,
            isFullWidth: (e) => e >= o,
            isFullHeight: (e) => e >= r,
          }),
          {
            maxWidth: e.maxWidth,
            maxHeight: e.maxHeight,
            rightEdge: e.rightEdge,
            bottomEdge: e.bottomEdge,
            isFullWidth: e.isFullWidth,
            isFullHeight: e.isFullHeight,
          }
        );
      };
    })(),
    Tr = (e, t, n, o, r) => {
      if (n) {
        if ('top-left' === e) return 'bottom-right';
        if ('top-right' === e) return 'bottom-left';
        if ('bottom-left' === e) return 'top-right';
        if ('bottom-right' === e) return 'top-left';
        const [n, o] = t.split('-');
        if ('left' === e) return `${n}-right`;
        if ('right' === e) return `${n}-left`;
        if ('top' === e) return `bottom-${o}`;
        if ('bottom' === e) return `top-${o}`;
      }
      if (o) {
        if ('left' === e) return `${t.split('-')[0]}-right`;
        if ('right' === e) return `${t.split('-')[0]}-left`;
      }
      if (r) {
        if ('top' === e) return `bottom-${t.split('-')[1]}`;
        if ('bottom' === e) return `top-${t.split('-')[1]}`;
      }
      return t;
    },
    Wr = (e, t, n) => {
      const o = window.innerWidth,
        r = window.innerHeight,
        i = t === tr,
        a = i ? t : Math.min(t, o - 48),
        s = i ? n : Math.min(n, r - 48);
      let l, c;
      switch (e) {
        case 'top-right':
          (l = o - a - er), (c = er);
          break;
        case 'bottom-right':
          (l = o - a - er), (c = r - s - er);
          break;
        case 'bottom-left':
          (l = er), (c = r - s - er);
          break;
        default:
          (l = er), (c = er);
      }
      return (
        i && ((l = Math.max(er, Math.min(l, o - a - er))), (c = Math.max(er, Math.min(c, r - s - er)))), { x: l, y: c }
      );
    },
    Ir = (e) => {
      switch (e) {
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
    },
    Ur = (e, t, n) => {
      const o = n ? tr : 5 * nr,
        r = n ? Hr().maxWidth : Hr().maxHeight,
        i = e + t;
      return Math.min(Math.max(o, i), r);
    },
    qr = ({ position: e }) => {
      const t = !e.includes('-'),
        n = Fe(null),
        o = Fe(null),
        r = Fe(null),
        i = Fe(null),
        a = Fe(null),
        s = Fe(null);
      $e(() => {
        if (!n.current) return;
        const o = ((e, t) => {
          const n = [
            'transition-[transform,opacity]',
            'duration-300',
            'delay-500',
            'group-hover:delay-0',
            'group-active:delay-0',
          ];
          return t
            ? [
                ...n,
                'left' === e || 'right' === e ? 'w-6' : 'w-full',
                'left' === e || 'right' === e ? 'h-full' : 'h-6',
                'left' === e || 'right' === e ? 'cursor-ew-resize' : 'cursor-ns-resize',
              ]
            : [
                ...n,
                'w-6',
                'h-6',
                'top-left' === e || 'bottom-right' === e ? 'cursor-nwse-resize' : 'cursor-nesw-resize',
                `rounded-${e.split('-').join('')}`,
              ];
        })(e, t);
        cn(n.current, o);
        const r = (o) => {
            if (!n.current) return;
            const r =
              o &&
              ((e, t, n, o, r) =>
                !(!o || !r) ||
                (o || r
                  ? o
                    ? t
                      ? e !== n.split('-')[0]
                      : !e.startsWith(n.split('-')[0])
                    : !!r && (t ? e !== n.split('-')[1] : !e.endsWith(n.split('-')[1]))
                  : t
                    ? ((e, t) => {
                        const [n, o] = t.split('-');
                        return e !== n && e !== o;
                      })(e, n)
                    : e === Tr(n, n, !0)))(
                e,
                t,
                ar.value.corner,
                ar.value.dimensions.isFullWidth,
                ar.value.dimensions.isFullHeight,
              );
            r
              ? n.current.classList.remove('hidden', 'pointer-events-none', 'opacity-0')
              : n.current.classList.add('hidden', 'pointer-events-none', 'opacity-0');
          },
          l = ar.subscribe((e) => {
            n.current &&
              ((null !== i.current &&
                null !== a.current &&
                null !== s.current &&
                e.dimensions.width === i.current &&
                e.dimensions.height === a.current &&
                e.corner === s.current) ||
                (r('focused' === Jr.inspectState.value.kind),
                (i.current = e.dimensions.width),
                (a.current = e.dimensions.height),
                (s.current = e.corner)));
          }),
          c = Jr.inspectState.subscribe((e) => {
            n.current && r('focused' === e.kind);
          });
        return () => {
          l(), c(), (i.current = null), (a.current = null), (s.current = null);
        };
      }, []);
      const l = Ae((t) => {
          t.preventDefault(), t.stopPropagation();
          const n = rr.value;
          if (!n) return;
          const o = n.style,
            { dimensions: r } = ar.value,
            i = t.clientX,
            a = t.clientY,
            s = r.width,
            l = r.height,
            c = r.position;
          ar.value = {
            ...ar.value,
            dimensions: { ...r, isFullWidth: !1, isFullHeight: !1, width: s, height: l, position: c },
          };
          let d = null;
          const u = (t) => {
              d ||
                ((o.transition = 'none'),
                (d = requestAnimationFrame(() => {
                  const { newSize: n, newPosition: r } = ((e, t, n, o, r) => {
                    const i = window.innerWidth - 48,
                      a = window.innerHeight - 48;
                    let s = t.width,
                      l = t.height,
                      c = n.x,
                      d = n.y;
                    if (e.includes('right')) {
                      const e = window.innerWidth - n.x - er,
                        r = Math.min(t.width + o, e);
                      s = Math.min(i, Math.max(tr, r));
                    }
                    if (e.includes('left')) {
                      const e = n.x + t.width - er,
                        r = Math.min(t.width - o, e);
                      (s = Math.min(i, Math.max(tr, r))), (c = n.x - (s - t.width));
                    }
                    if (e.includes('bottom')) {
                      const e = window.innerHeight - n.y - er,
                        o = Math.min(t.height + r, e);
                      l = Math.min(a, Math.max(5 * nr, o));
                    }
                    if (e.includes('top')) {
                      const e = n.y + t.height - er,
                        o = Math.min(t.height - r, e);
                      (l = Math.min(a, Math.max(5 * nr, o))), (d = n.y - (l - t.height));
                    }
                    return (
                      (c = Math.max(er, Math.min(c, window.innerWidth - er - s))),
                      (d = Math.max(er, Math.min(d, window.innerHeight - er - l))),
                      { newSize: { width: s, height: l }, newPosition: { x: c, y: d } }
                    );
                  })(e, { width: s, height: l }, c, t.clientX - i, t.clientY - a);
                  (o.transform = `translate3d(${r.x}px, ${r.y}px, 0)`),
                    (o.width = `${n.width}px`),
                    (o.height = `${n.height}px`),
                    (ar.value = {
                      ...ar.value,
                      dimensions: { isFullWidth: !1, isFullHeight: !1, width: n.width, height: n.height, position: r },
                    }),
                    (d = null);
                })));
            },
            p = () => {
              d && cancelAnimationFrame(d);
              const { dimensions: e, corner: t } = ar.value,
                { isFullWidth: r, isFullHeight: i } = Hr(),
                a = r(e.width),
                s = i(e.height);
              let l = t;
              ((a && s) || a || s) &&
                (l = ((e) => {
                  const { maxWidth: t, maxHeight: n } = Hr(),
                    o = {
                      'top-left': Math.hypot(e.x, e.y),
                      'top-right': Math.hypot(t - e.x, e.y),
                      'bottom-left': Math.hypot(e.x, n - e.y),
                      'bottom-right': Math.hypot(t - e.x, n - e.y),
                    };
                  return Object.entries(o).reduce((e, [t, n]) => (n < o[e] ? t : e), 'top-left');
                })(e.position));
              const c = Wr(l, e.width, e.height),
                f = () => {
                  n.removeEventListener('transitionend', f);
                };
              n.addEventListener('transitionend', f),
                (o.transform = `translate3d(${c.x}px, ${c.y}px, 0)`),
                (ar.value = {
                  corner: l,
                  dimensions: { isFullWidth: a, isFullHeight: s, width: e.width, height: e.height, position: c },
                  lastDimensions: { isFullWidth: a, isFullHeight: s, width: e.width, height: e.height, position: c },
                }),
                ln(or, { corner: l, dimensions: ar.value.dimensions, lastDimensions: ar.value.lastDimensions }),
                document.removeEventListener('mousemove', u),
                document.removeEventListener('mouseup', p);
            };
          document.addEventListener('mousemove', u, { passive: !0 }), document.addEventListener('mouseup', p);
        }, []),
        c = Ae((n) => {
          n.preventDefault(), n.stopPropagation();
          const o = rr.value;
          if (!o) return;
          const r = o.style,
            { dimensions: i, corner: a } = ar.value,
            { maxWidth: s, maxHeight: l, isFullWidth: c, isFullHeight: d } = Hr(),
            u = c(i.width),
            p = d(i.height),
            f = u && p,
            h = (u || p) && !f;
          let m = i.width,
            g = i.height;
          const v = Tr(e, a, f, u, p);
          t
            ? 'left' === e || 'right' === e
              ? ((m = u ? i.width : s), h && (m = u ? tr : s))
              : ((g = p ? i.height : l), h && (g = p ? 5 * nr : l))
            : ((m = s), (g = l)),
            f && (t ? ('left' === e || 'right' === e ? (m = tr) : (g = 5 * nr)) : ((m = tr), (g = 5 * nr)));
          const w = Wr(v, m, g),
            b = { isFullWidth: c(m), isFullHeight: d(g), width: m, height: g, position: w };
          requestAnimationFrame(() => {
            (ar.value = { corner: v, dimensions: b, lastDimensions: i }),
              (r.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'),
              (r.width = `${m}px`),
              (r.height = `${g}px`),
              (r.transform = `translate3d(${w.x}px, ${w.y}px, 0)`);
          }),
            ln(or, { corner: v, dimensions: b, lastDimensions: i });
        }, []);
      return Pr('div', {
        ref: n,
        onMouseDown: l,
        onDblClick: c,
        className: on(
          'flex items-center justify-center',
          'resize-handle absolute',
          'group overflow-hidden',
          'transition-opacity select-none z-50',
          Ir(e),
        ),
        children: Pr(
          'span',
          t
            ? {
                ref: o,
                className: on(
                  'absolute',
                  'opacity-0 group-hover:opacity-100 group-active:opacity-100',
                  'transition-[transform, opacity] duration-300',
                  'delay-500 group-hover:delay-0 group-active:delay-0 group-active:opacity-0',
                  {
                    'translate-y-full group-hover:-translate-y-1/4': 'top' === e,
                    '-translate-x-full group-hover:translate-x-1/4': 'right' === e,
                    '-translate-y-full group-hover:translate-y-1/4': 'bottom' === e,
                    'translate-x-full group-hover:-translate-x-1/4': 'left' === e,
                  },
                ),
                children: Pr(Dr, {
                  name: 'icon-chevrons-up-down',
                  className: on('text-[#7b51c8]', { 'rotate-90': 'left' === e || 'right' === e }),
                }),
              }
            : {
                ref: r,
                className: on(
                  'absolute inset-0',
                  'flex items-center justify-center',
                  'opacity-0 group-hover:opacity-100 group-active:opacity-100',
                  'transition-[transform,opacity] duration-300',
                  'delay-500 group-hover:delay-0 group-active:delay-0',
                  'origin-center',
                  'text-[#7b51c8]',
                  {
                    'top-0 left-0 rotate-[135deg] translate-x-full translate-y-full': 'top-left' === e,
                    'top-0 right-0 rotate-[225deg] -translate-x-full translate-y-full': 'top-right' === e,
                    'bottom-0 left-0 rotate-45 translate-x-full -translate-y-full': 'bottom-left' === e,
                    'bottom-0 right-0 -rotate-45 -translate-x-full -translate-y-full': 'bottom-right' === e,
                  },
                  'group-hover:translate-x-0 group-hover:translate-y-0',
                  'group-active:opacity-0',
                ),
                children: Pr(Dr, { name: 'icon-chevrons-up-down' }),
              },
        ),
      });
    },
    Br = () => {
      const [e, t] = Me(null);
      return (
        $e(() => {
          const e = setInterval(() => {
            t(ro());
          }, 100);
          return () => clearInterval(e);
        }, []),
        Pr('span', {
          style: { width: 'fit-content' },
          'data-text': String(e),
          className: on(
            'with-data-text',
            'flex gap-1 items-center',
            'ml-2 px-2',
            'h-full',
            'text-white text-xs font-mono whitespace-nowrap',
            'bg-neutral-700',
            'rounded-full',
          ),
          children: Pr('span', { className: 'text-xxs', children: 'FPS' }),
        })
      );
    },
    Vr = ({ refPropContainer: e }) => {
      const t = Jr.inspectState,
        n = 'focused' === t.value.kind,
        o = 'inspecting' === t.value.kind,
        { inspectIcon: r, inspectColor: i } = Re(() => {
          let e = null,
            t = '#999';
          return (
            o
              ? ((e = Pr(Dr, { name: 'icon-inspect' })), (t = 'rgba(142, 97, 227, 1)'))
              : n
                ? ((e = Pr(Dr, { name: 'icon-focus' })), (t = 'rgba(142, 97, 227, 1)'))
                : ((e = Pr(Dr, { name: 'icon-inspect' })), (t = '#999')),
            { inspectIcon: e, inspectColor: t }
          );
        }, [o, n]),
        a = Ae(() => {
          const t = Jr.inspectState.value;
          switch (t.kind) {
            case 'inspecting':
            case 'focused':
              Jr.inspectState.value = { kind: 'inspect-off', propContainer: t.propContainer };
              break;
            case 'inspect-off':
              Jr.inspectState.value = { kind: 'inspecting', hoveredDomElement: null, propContainer: e.current };
          }
        }, [Jr.inspectState.value]),
        s = Ae((e, t) => {
          const n = Array.from(document.querySelectorAll('*')).filter((e) => e instanceof HTMLElement),
            o = n.indexOf(e);
          if (-1 === o) return null;
          const r = jn(e),
            i = 'next' === t ? 1 : -1;
          let a = o + i;
          for (; a >= 0 && a < n.length; ) {
            const e = jn(n[a]);
            if (e && e !== r) return n[a];
            a += i;
          }
          return null;
        }, []),
        l = Ae(() => {
          const e = Jr.inspectState.value;
          if ('focused' !== e.kind || !e.focusedDomElement) return;
          const t = s(e.focusedDomElement, 'previous');
          t && (Jr.inspectState.value = { kind: 'focused', focusedDomElement: t, propContainer: e.propContainer });
        }, [s]),
        c = Ae(() => {
          const e = Jr.inspectState.value;
          if ('focused' !== e.kind || !e.focusedDomElement) return;
          const t = s(e.focusedDomElement, 'next');
          t && (Jr.inspectState.value = { kind: 'focused', focusedDomElement: t, propContainer: e.propContainer });
        }, [s]),
        d = Ae(() => {
          Zr.instrumentation && (Zr.instrumentation.isPaused.value = !Zr.instrumentation.isPaused.value);
        }, [Zr.instrumentation]),
        u = Ae(() => {
          const e = !Zr.options.value.playSound;
          ei({ playSound: e });
        }, []);
      return (
        $e(() => {
          'uninitialized' === Jr.inspectState.value.kind &&
            (Jr.inspectState.value = { kind: 'inspect-off', propContainer: e.current });
        }, []),
        Pr('div', {
          className: 'flex max-h-9 min-h-9 flex-1 items-stretch overflow-hidden',
          children: [
            Pr('button', {
              title: 'Inspect element',
              onClick: a,
              className: 'flex items-center justify-center px-3',
              style: { color: i },
              children: r,
            }),
            Pr('button', {
              id: 'react-scan-power',
              title: Zr.instrumentation?.isPaused.value ? 'Start' : 'Stop',
              onClick: d,
              className: on('flex items-center justify-center px-3', {
                'text-white': !Zr.instrumentation?.isPaused.value,
                'text-[#999]': Zr.instrumentation?.isPaused.value,
              }),
              children: Pr(Dr, { name: 'icon-' + (Zr.instrumentation?.isPaused.value ? 'eye-off' : 'eye') }),
            }),
            Pr('button', {
              id: 'react-scan-sound-toggle',
              onClick: u,
              title: Zr.options.value.playSound ? 'Sound On' : 'Sound Off',
              className: on('flex items-center justify-center px-3', {
                'text-white': Zr.options.value.playSound,
                'text-[#999]': !Zr.options.value.playSound,
              }),
              children: Pr(Dr, { name: 'icon-' + (Zr.options.value.playSound ? 'volume-on' : 'volume-off') }),
            }),
            n &&
              Pr('div', {
                className: on(
                  'flex items-stretch justify-between',
                  'ml-auto',
                  'border-l-1 border-white/10 text-[#999]',
                  'overflow-hidden',
                ),
                children: [
                  Pr('button', {
                    id: 'react-scan-previous-focus',
                    title: 'Previous element',
                    onClick: l,
                    className: 'flex items-center justify-center px-3',
                    children: Pr(Dr, { name: 'icon-previous' }),
                  }),
                  Pr('button', {
                    id: 'react-scan-next-focus',
                    title: 'Next element',
                    onClick: c,
                    className: 'flex items-center justify-center px-3',
                    children: Pr(Dr, { name: 'icon-next' }),
                  }),
                ],
              }),
            Pr('div', {
              className: on('flex items-center justify-center whitespace-nowrap py-1.5 px-2 text-sm text-white', {
                'ml-auto': !n,
              }),
              children: ['react-scan', Pr(Br, {})],
            }),
          ],
        })
      );
    },
    Gr = () => {
      const e = Fe(!1),
        t = Fe(null),
        n = Fe(null),
        o = Fe(null),
        r = Fe(null),
        i = Fe(0),
        a = Fe(0),
        s = Ae((e = !0) => {
          if (!t.current) return;
          const n = 'focused' === Jr.inspectState.value.kind,
            { corner: o } = ar.value;
          let r, s;
          if (n) {
            const e = ar.value.lastDimensions;
            (r = Ur(e.width, 0, !0)), (s = Ur(e.height, 0, !1));
          } else {
            const e = ar.value.dimensions;
            e.width > i.current &&
              (ar.value = {
                ...ar.value,
                lastDimensions: {
                  isFullWidth: e.isFullWidth,
                  isFullHeight: e.isFullHeight,
                  width: e.width,
                  height: e.height,
                  position: e.position,
                },
              }),
              (r = i.current),
              (s = a.current);
          }
          const l = Wr(o, r, s);
          (r < tr || s < 5 * nr) && (e = !1);
          const c = t.current,
            d = c.style,
            u = () => {
              (d.transition = 'none'), sr(), c.removeEventListener('transitionend', u);
            };
          c.addEventListener('transitionend', u),
            (d.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'),
            requestAnimationFrame(() => {
              (d.width = `${r}px`), (d.height = `${s}px`), (d.transform = `translate3d(${l.x}px, ${l.y}px, 0)`);
            });
          const p = {
            isFullWidth: r >= window.innerWidth - 48,
            isFullHeight: s >= window.innerHeight - 48,
            width: r,
            height: s,
            position: l,
          };
          (ar.value = {
            corner: o,
            dimensions: p,
            lastDimensions: n ? ar.value.lastDimensions : r > i.current ? p : ar.value.lastDimensions,
          }),
            e &&
              ln(or, {
                corner: ar.value.corner,
                dimensions: ar.value.dimensions,
                lastDimensions: ar.value.lastDimensions,
              }),
            sr();
        }, []),
        l = Ae((e) => {
          if ((e.preventDefault(), !t.current || e.target.closest('button'))) return;
          const n = t.current,
            o = n.style,
            { dimensions: r } = ar.value,
            i = e.clientX,
            a = e.clientY,
            s = r.position.x,
            l = r.position.y;
          let c = s,
            d = l,
            u = null,
            p = !1,
            f = i,
            h = a;
          const m = (e) => {
              u ||
                ((p = !0),
                (f = e.clientX),
                (h = e.clientY),
                (u = requestAnimationFrame(() => {
                  const e = f - i,
                    t = h - a;
                  (c = Number(s) + e),
                    (d = Number(l) + t),
                    (o.transition = 'none'),
                    (o.transform = `translate3d(${c}px, ${d}px, 0)`),
                    (u = null);
                })));
            },
            g = () => {
              if (!n) return;
              if (
                (u && cancelAnimationFrame(u),
                document.removeEventListener('mousemove', m),
                document.removeEventListener('mouseup', g),
                !p)
              )
                return;
              const e = ((e, t, n, o, r = 100) => {
                const i = void 0 !== n ? e - n : 0,
                  a = void 0 !== o ? t - o : 0,
                  s = window.innerWidth / 2,
                  l = window.innerHeight / 2,
                  c = i > r,
                  d = a > r;
                if (c || i < -r) {
                  const e = t > l;
                  return c ? (e ? 'bottom-right' : 'top-right') : e ? 'bottom-left' : 'top-left';
                }
                if (d || a < -r) {
                  const t = e > s;
                  return d ? (t ? 'bottom-right' : 'bottom-left') : t ? 'top-right' : 'top-left';
                }
                return e > s ? (t > l ? 'bottom-right' : 'top-right') : t > l ? 'bottom-left' : 'top-left';
              })(f, h, i, a, 'focused' === Jr.inspectState.value.kind ? 80 : 40);
              if (e === ar.value.corner) {
                o.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                const e = ar.value.dimensions.position;
                return void requestAnimationFrame(() => {
                  o.transform = `translate3d(${e.x}px, ${e.y}px, 0)`;
                });
              }
              const t = Wr(e, r.width, r.height);
              if (c === s && d === l) return;
              const v = () => {
                (o.transition = 'none'), sr(), n.removeEventListener('transitionend', v);
              };
              n.addEventListener('transitionend', v),
                (o.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'),
                requestAnimationFrame(() => {
                  o.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
                }),
                (ar.value = {
                  corner: e,
                  dimensions: {
                    isFullWidth: r.isFullWidth,
                    isFullHeight: r.isFullHeight,
                    width: r.width,
                    height: r.height,
                    position: t,
                  },
                  lastDimensions: ar.value.lastDimensions,
                }),
                ln(or, { corner: e, dimensions: ar.value.dimensions, lastDimensions: ar.value.lastDimensions });
            };
          document.addEventListener('mousemove', m), document.addEventListener('mouseup', g);
        }, []);
      return (
        $e(() => {
          if (!t.current || !r.current) return;
          (t.current.style.width = 'min-content'),
            (a.current = r.current.offsetHeight),
            (i.current = t.current.offsetWidth),
            (t.current.style.maxWidth = 'calc(100vw - 48px)'),
            (t.current.style.maxHeight = 'calc(100vh - 48px)'),
            'focused' !== Jr.inspectState.value.kind &&
              (ar.value = {
                ...ar.value,
                dimensions: {
                  isFullWidth: !1,
                  isFullHeight: !1,
                  width: i.current,
                  height: a.current,
                  position: ar.value.dimensions.position,
                },
              }),
            (rr.value = t.current);
          const l = ar.subscribe((e) => {
              if (!t.current) return;
              const { x: n, y: o } = e.dimensions.position,
                { width: r, height: i } = e.dimensions,
                a = t.current;
              requestAnimationFrame(() => {
                (a.style.transform = `translate3d(${n}px, ${o}px, 0)`),
                  (a.style.width = `${r}px`),
                  (a.style.height = `${i}px`);
              });
            }),
            c = Jr.inspectState.subscribe((t) => {
              if (n.current && o.current) {
                if (((e.current = 'focused' === t.kind), 'focused' === t.kind)) {
                  const { parentCompositeFiber: e } = Tn(t.focusedDomElement);
                  if (!e)
                    return void setTimeout(() => {
                      Jr.inspectState.value = { kind: 'inspect-off', propContainer: o.current };
                    }, 16);
                } else cn(n.current, ['opacity-0', 'duration-0', 'delay-0']);
                s();
              }
            });
          let d;
          const u = ((e, t, n = {}) => {
            let o,
              r,
              i = !1;
            const a = (...a) => {
              if (((r = a), n.leading && !i)) return (i = !0), void e(...a);
              void 0 !== o && clearTimeout(o),
                !1 !== n.trailing &&
                  (o = window.setTimeout(() => {
                    (i = !1), (o = void 0), e(...r);
                  }, t));
            };
            return (
              (a.cancel = () => {
                void 0 !== o && (clearTimeout(o), (o = void 0), (i = !1), (r = void 0));
              }),
              a
            );
          })(() => {
            d && cancelAnimationFrame(d),
              (d = requestAnimationFrame(() => {
                t.current && s(!0);
              }));
          }, 32);
          return (
            window.addEventListener('resize', u),
            s(!1),
            () => {
              window.removeEventListener('resize', u), c(), l(), ln(or, { ...ir, corner: ar.value.corner });
            }
          );
        }, []),
        Pr('div', {
          id: 'react-scan-toolbar',
          ref: t,
          onMouseDown: l,
          className: on(
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
            Pr('div', {
              ref: n,
              className: on(
                'relative',
                'flex-1',
                'flex flex-col',
                'rounded-t-lg',
                'overflow-hidden',
                'opacity-100',
                'transition-opacity duration-150',
              ),
              children: [
                Pr(Lr, {}),
                Pr('div', {
                  ref: o,
                  className: on(
                    'react-scan-prop',
                    'flex-1',
                    'text-white',
                    'transition-opacity duration-150 delay-150',
                    'overflow-y-auto overflow-x-hidden',
                  ),
                }),
              ],
            }),
            Pr('div', {
              ref: r,
              className: on(
                'h-9',
                'flex items-center justify-between',
                'transition-colors duration-200',
                'overflow-hidden',
                'rounded-lg',
              ),
              children: Pr(Vr, { refPropContainer: o }),
            }),
            Pr(qr, { position: 'top' }),
            Pr(qr, { position: 'bottom' }),
            Pr(qr, { position: 'left' }),
            Pr(qr, { position: 'right' }),
            Pr(qr, { position: 'top-left' }),
            Pr(qr, { position: 'top-right' }),
            Pr(qr, { position: 'bottom-left' }),
            Pr(qr, { position: 'bottom-right' }),
          ],
        })
      );
    },
    Xr = (e) => {
      const t = document.createElement('div');
      e.appendChild(t), ve(Pr(Gr, {}), t);
      const n = t.remove.bind(t);
      return (
        (t.remove = function () {
          t.hasChildNodes() && (ve(null, t), ve(null, t)), n();
        }),
        t
      );
    },
    Yr = null,
    Kr = null,
    Jr = {
      wasDetailsOpen: Ke(!0),
      isInIframe: Ke('undefined' != typeof window && window.self !== window.top),
      inspectState: Ke({ kind: 'uninitialized' }),
      monitor: Ke(null),
      fiberRoots: new WeakSet(),
      reportData: new WeakMap(),
      legacyReportData: new Map(),
      lastReportTime: Ke(0),
    },
    Zr = {
      instrumentation: null,
      componentAllowList: null,
      options: Ke({
        enabled: !0,
        includeChildren: !0,
        playSound: !1,
        log: !1,
        showToolbar: !0,
        renderCountThreshold: 0,
        report: void 0,
        alwaysShowLabels: !1,
        animationSpeed: 'fast',
        dangerouslyForceRunInProduction: !1,
        smoothlyAnimateOutlines: !0,
        trackUnnecessaryRenders: !1,
      }),
      onRender: null,
      scheduledOutlines: new Map(),
      activeOutlines: new Map(),
      Store: Jr,
    },
    Qr = (e) => {
      const t = [],
        n = {};
      for (const o in e) {
        const r = e[o];
        switch (o) {
          case 'enabled':
          case 'includeChildren':
          case 'playSound':
          case 'log':
          case 'showToolbar':
          case 'report':
          case 'alwaysShowLabels':
          case 'dangerouslyForceRunInProduction':
            'boolean' != typeof r ? t.push(`- ${o} must be a boolean. Got "${r}"`) : (n[o] = r);
            break;
          case 'renderCountThreshold':
          case 'resetCountTimeout':
            'number' != typeof r || r < 0 ? t.push(`- ${o} must be a non-negative number. Got "${r}"`) : (n[o] = r);
            break;
          case 'animationSpeed':
            ['slow', 'fast', 'off'].includes(r)
              ? (n[o] = r)
              : t.push(`- Invalid animation speed "${r}". Using default "fast"`);
            break;
          case 'onCommitStart':
          case 'onCommitFinish':
          case 'onRender':
          case 'onPaintStart':
          case 'onPaintFinish':
            'function' != typeof r ? t.push(`- ${o} must be a function. Got "${r}"`) : (n[o] = r);
            break;
          case 'trackUnnecessaryRenders':
            n.trackUnnecessaryRenders = 'boolean' == typeof r && r;
            break;
          case 'smoothlyAnimateOutlines':
            n.smoothlyAnimateOutlines = 'boolean' == typeof r && r;
            break;
          default:
            t.push(`- Unknown option "${o}"`);
        }
      }
      return t.length > 0 && console.warn(`[React Scan] Invalid options:\n${t.join('\n')}`), n;
    },
    ei = (e) => {
      const t = Qr(e);
      if (0 === Object.keys(t).length) return;
      'playSound' in t && t.playSound && (t.enabled = !0);
      const n = { ...Zr.options.value, ...t },
        { instrumentation: o } = Zr;
      o && 'enabled' in t && (o.isPaused.value = !1 === t.enabled),
        (Zr.options.value = n),
        ln('react-scan-options', n),
        'showToolbar' in t && (Yr && !n.showToolbar && Yr.remove(), n.showToolbar && Yr && Kr && (Yr = Xr(Kr)));
    },
    ti = (e, t) => {
      const n = e,
        { selfTime: o } = k(e.type),
        r = z(e.type);
      Jr.lastReportTime.value = Date.now();
      const i = Jr.reportData.get(n) ?? { count: 0, time: 0, renders: [], displayName: r, type: null };
      if (
        ((i.count = Number(i.count || 0) + Number(t.length)),
        (i.time = Number(i.time || 0) + Number(o || 0)),
        (i.renders = t),
        Jr.reportData.set(n, i),
        r && Zr.options.value.report)
      ) {
        const n = Jr.legacyReportData.get(r) ?? {
          count: 0,
          time: 0,
          renders: [],
          displayName: null,
          type: C(e.type) || e.type,
        };
        (n.count = n.time = Number(n.time || 0) + Number(o || 0)), (n.renders = t), Jr.legacyReportData.set(r, n);
      }
    },
    ni = (e) => {
      if (li.has(e.memoizedProps)) return !1;
      const t = Zr.componentAllowList,
        n = t?.has(e.type) ?? t?.has(e.elementType);
      if (n) {
        if (
          !x(
            e,
            (e) => {
              const n = t?.get(e.type) ?? t?.get(e.elementType);
              return n?.includeChildren;
            },
            !0,
          ) &&
          !n
        )
          return !1;
      }
      return !0;
    },
    oi = (e) => {
      clearInterval(undefined),
        setInterval(() => {
          requestAnimationFrame(() => {
            (async (e) => {
              if (!Zr.scheduledOutlines.size && !Zr.activeOutlines.size) return;
              const t = Array.from(Zr.scheduledOutlines.values());
              await En(), xn(), (Zr.scheduledOutlines = new Map());
              const { options: n } = Zr;
              n.value.onPaintStart?.(t), Sn || (Sn = requestAnimationFrame(() => Cn(e)));
            })(e);
          });
        }, 30);
    },
    ri = null,
    ii = () => {
      if (null !== ri) return ri;
      jr ??= R();
      for (const e of jr.renderers.values()) {
        'production' === E(e) && (ri = !0);
      }
      return ri;
    },
    ai = () => {
      if ('undefined' == typeof window) return;
      if (ii() && !Zr.options.value.dangerouslyForceRunInProduction) return;
      const e = R();
      for (const t of e.renderers.values()) {
        'production' === E(t) && (ri = !0);
      }
      const t = sn('react-scan-options');
      if (t) {
        const { enabled: e, playSound: n } = t,
          o = Qr({ enabled: e, playSound: n });
        Object.keys(o).length > 0 && (Zr.options.value = { ...Zr.options.value, ...o });
      }
      const n = 'undefined' != typeof window ? new (window.AudioContext || window.webkitAudioContext)() : null;
      let o = null;
      const r = ko('devtools', {
        onActive() {
          if (document.querySelector('react-scan-root')) return;
          const e = document.createElement('div');
          (e.id = 'react-scan-root'), (Kr = e.attachShadow({ mode: 'open' }));
          const t = document.createDocumentFragment(),
            n = document.createElement('style');
          n.textContent =
            '*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.16 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::-moz-placeholder, textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.\\!container{width:100%!important}.container{width:100%}@media (min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media (min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media (min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media (min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media (min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-0{bottom:0}.left-0{left:0}.right-0{right:0}.top-0{top:0}.z-50{z-index:50}.z-\\[124124124124\\]{z-index:124124124124}.m-\\[2px\\]{margin:2px}.ml-2{margin-left:.5rem}.ml-auto{margin-left:auto}.block{display:block}.inline{display:inline}.flex{display:flex}.table{display:table}.hidden{display:none}.h-10{height:2.5rem}.h-12{height:3rem}.h-6{height:1.5rem}.h-8{height:2rem}.h-9{height:2.25rem}.h-full{height:100%}.max-h-9{max-height:2.25rem}.min-h-9{min-height:2.25rem}.w-6{width:1.5rem}.w-fit{width:-moz-fit-content;width:fit-content}.w-full{width:100%}.flex-1{flex:1 1 0%}.grow{flex-grow:1}.origin-center{transform-origin:center}.-translate-x-3\\/4{--tw-translate-x:-75%}.-translate-x-3\\/4,.-translate-x-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-x-full{--tw-translate-x:-100%}.-translate-y-3\\/4{--tw-translate-y:-75%}.-translate-y-3\\/4,.-translate-y-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-full{--tw-translate-y:-100%}.translate-x-3\\/4{--tw-translate-x:75%}.translate-x-3\\/4,.translate-x-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-full{--tw-translate-x:100%}.translate-y-3\\/4{--tw-translate-y:75%}.translate-y-3\\/4,.translate-y-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-full{--tw-translate-y:100%}.-rotate-45{--tw-rotate:-45deg}.-rotate-45,.rotate-45{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-45{--tw-rotate:45deg}.rotate-90{--tw-rotate:90deg}.rotate-90,.rotate-\\[135deg\\]{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-\\[135deg\\]{--tw-rotate:135deg}.rotate-\\[225deg\\]{--tw-rotate:225deg}.rotate-\\[225deg\\],.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.animate-fade-in{animation:fadeIn ease-in forwards}.cursor-ew-resize{cursor:ew-resize}.cursor-move{cursor:move}.cursor-nesw-resize{cursor:nesw-resize}.cursor-ns-resize{cursor:ns-resize}.cursor-nwse-resize{cursor:nwse-resize}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.resize{resize:both}.flex-col{flex-direction:column}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.space-y-1\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.375rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem*var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-x-hidden{overflow-x:hidden}.truncate{overflow:hidden;text-overflow:ellipsis}.truncate,.whitespace-nowrap{white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.border{border-width:1px}.border-4{border-width:4px}.border-l-1{border-left-width:1px}.border-white\\/10{border-color:hsla(0,0%,100%,.1)}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1))}.bg-neutral-700{--tw-bg-opacity:1;background-color:rgb(64 64 64/var(--tw-bg-opacity,1))}.p-6{padding:1.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.font-mono{font-family:Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace}.text-\\[13px\\]{font-size:13px}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.text-xxs{font-size:.5rem}.font-bold{font-weight:700}.lowercase{text-transform:lowercase}.text-\\[\\#7b51c8\\]{--tw-text-opacity:1;color:rgb(123 81 200/var(--tw-text-opacity,1))}.text-\\[\\#999\\]{--tw-text-opacity:1;color:rgb(153 153 153/var(--tw-text-opacity,1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.opacity-0{opacity:0}.opacity-100{opacity:1}.\\!shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)!important;--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)!important;box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)!important}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.outline{outline-style:solid}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.\\!filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)!important}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-\\[transform\\2c opacity\\]{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.delay-0{transition-delay:0s}.delay-150{transition-delay:.15s}.delay-500{transition-delay:.5s}.duration-0{transition-duration:0s}.duration-150{transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-300{transition-duration:.3s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}.will-change-transform{will-change:transform}.animation-duration-300{animation-duration:.3s}.animation-delay-300{animation-delay:.3s}*{outline:none!important;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;backface-visibility:hidden;&::-webkit-scrollbar{width:6px;height:6px}&::-webkit-scrollbar-track{border-radius:10px;background:transparent}&::-webkit-scrollbar-thumb{border-radius:10px;background:hsla(0,0%,100%,.3)}&::-webkit-scrollbar-thumb:hover{background:hsla(0,0%,100%,.4)}}@-moz-document url-prefix(){*{scrollbar-width:thin;scrollbar-color:hsla(0,0%,100%,.4) transparent;scrollbar-width:6px}}button:hover{background-image:none}button{outline:2px solid transparent;outline-offset:2px;border-style:none;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;cursor:pointer}.with-data-text{overflow:hidden;&:before{content:attr(data-text);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}#react-scan-toolbar{position:fixed;left:0;top:0;display:flex;flex-direction:column;border-radius:.5rem;--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);font-family:Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace;font-size:13px;--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1));--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1));-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:move;opacity:0;z-index:2147483678}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}#react-scan-toolbar{animation:fadeIn ease-in forwards;animation-duration:.3s;animation-delay:.3s;--tw-shadow:0 4px 12px rgba(0,0,0,.2);--tw-shadow-colored:0 4px 12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.react-scan-header{display:flex;align-items:center;-moz-column-gap:.5rem;column-gap:.5rem;padding-left:.75rem;padding-right:.5rem;min-height:2.25rem;border-top-left-radius:.5rem;border-top-right-radius:.5rem;border-bottom-width:1px;border-color:hsla(0,0%,100%,.1);overflow:hidden;white-space:nowrap}.react-scan-close-button,.react-scan-replay-button{display:flex;align-items:center;padding:.25rem;min-width:-moz-fit-content;min-width:fit-content;border-radius:.25rem;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.react-scan-replay-button{position:relative;overflow:hidden;background-color:rgba(168,85,247,.5)!important;&:hover{background-color:rgba(168,85,247,.25)}&.disabled{opacity:.5;pointer-events:none}&:before{content:"";position:absolute;inset:0;--tw-translate-x:-100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));animation:shimmer 2s infinite;background:linear-gradient(90deg,transparent,rgba(142,97,227,.3),transparent)}}.react-scan-close-button{background-color:hsla(0,0%,100%,.1);&:hover{background-color:hsla(0,0%,100%,.15)}}@keyframes shimmer{to{transform:translateX(100%)}}.react-scan-inspector{font-size:13px;color:#fff;width:100%}.react-scan-section{display:flex;flex-direction:column;padding:.5rem 1rem;--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity,1));--tw-text-opacity:1;color:rgb(136 136 136/var(--tw-text-opacity,1))}.react-scan-section:before{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity,1));--tw-content:attr(data-section);content:var(--tw-content)}.react-scan-section{>div{margin-left:.5rem;min-height:1.5rem}}.react-scan-property{position:relative;display:flex;flex-direction:column;padding-top:.25rem;padding-left:1.5rem;border-left-width:1px;border-color:transparent;overflow:hidden}.react-scan-key{color:#fff}.react-scan-warning{padding-right:4px}.react-scan-string{color:#9ecbff}.react-scan-number{color:#79c7ff}.react-scan-boolean{color:#56b6c2}.react-scan-input{background:#000;border:none;color:#fff}.react-scan-array,.react-scan-object-key{color:#fff}.react-scan-expandable{display:flex;align-items:flex-start}.react-scan-arrow{position:absolute;top:.5rem;left:1.5rem;cursor:pointer;height:1.5rem;width:1.5rem;--tw-translate-x:-100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));z-index:10;&:before{content:"▶";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;--tw-text-opacity:1;color:rgb(136 136 136/var(--tw-text-opacity,1));font-size:8px;transform-origin:center;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}}.react-scan-expanded>.react-scan-arrow:before{transform:rotate(90deg)}.react-scan-property-content{display:flex;flex:1 1 0%;flex-direction:column;padding-top:.25rem;max-width:100%;overflow:hidden}.react-scan-hidden{display:none}.react-scan-array-container{overflow-y:auto;margin-left:1.25rem;margin-top:8px;padding-left:8px}.react-scan-array-container,.react-scan-nested-object{border-left:1px solid hsla(0,0%,100%,.1)}.react-scan-preview-line{position:relative;display:flex;min-height:1.5rem;align-items:center}.react-scan-flash-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background-color:#8e61e3;pointer-events:none;opacity:0;z-index:999999;mix-blend-mode:multiply;transition:opacity .15s ease-in;border-radius:4px}.react-scan-flash-active{opacity:.4;transition:opacity .3s ease-in-out}#react-scan-toolbar button:hover{background:hsla(0,0%,100%,.1)}#react-scan-toolbar button:active{background:hsla(0,0%,100%,.15)}#react-scan-toolbar button:focus-visible{outline:2px solid #0070f3;outline-offset:-2px}.nav-button{opacity:var(--nav-opacity,1)}.react-scan-toolbar{border:1px solid blue}.group:hover .group-hover\\:-translate-x-1\\/4{--tw-translate-x:-25%}.group:hover .group-hover\\:-translate-x-1\\/4,.group:hover .group-hover\\:-translate-y-1\\/4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:-translate-y-1\\/4{--tw-translate-y:-25%}.group:hover .group-hover\\:translate-x-0{--tw-translate-x:0px}.group:hover .group-hover\\:translate-x-0,.group:hover .group-hover\\:translate-x-1\\/4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:translate-x-1\\/4{--tw-translate-x:25%}.group:hover .group-hover\\:translate-y-0{--tw-translate-y:0px}.group:hover .group-hover\\:translate-y-0,.group:hover .group-hover\\:translate-y-1\\/4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:translate-y-1\\/4{--tw-translate-y:25%}.group:hover .group-hover\\:opacity-100{opacity:1}.group:hover .group-hover\\:delay-0{transition-delay:0s}.group:active .group-active\\:opacity-0{opacity:0}.group:active .group-active\\:opacity-100{opacity:1}.group:active .group-active\\:delay-0{transition-delay:0s}';
          const r = new DOMParser().parseFromString(
            '\n<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n  <symbol id="icon-eye-off" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>\n    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>\n    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>\n    <path d="m2 2 20 20"/>\n  </symbol>\n\n  <symbol id="icon-eye" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />\n    <circle cx="12" cy="12" r="3" />\n  </symbol>\n\n\n  <symbol id="icon-inspect" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/>\n    <path d="M5 3a2 2 0 0 0-2 2"/>\n    <path d="M19 3a2 2 0 0 1 2 2"/>\n    <path d="M5 21a2 2 0 0 1-2-2"/>\n    <path d="M9 3h1"/>\n    <path d="M9 21h2"/>\n    <path d="M14 3h1"/>\n    <path d="M3 9v1"/>\n    <path d="M21 9v2"/>\n    <path d="M3 14v1"/>\n  </symbol>\n\n  <symbol id="icon-focus" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/>\n    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>\n  </symbol>\n\n  <symbol id="icon-next" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M6 9h6V5l7 7-7 7v-4H6V9z"/>\n  </symbol>\n\n  <symbol id="icon-previous" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/>\n  </symbol>\n\n  <symbol id="icon-volume-on" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>\n    <path d="M16 9a5 5 0 0 1 0 6"/>\n    <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>\n  </symbol>\n\n  <symbol id="icon-volume-off" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>\n    <line x1="22" x2="16" y1="9" y2="15"/>\n    <line x1="16" x2="22" y1="9" y2="15"/>\n  </symbol>\n\n  <symbol id="icon-scan-eye" viewBox="0 0 24 24">\n    <path d="M3 7V5a2 2 0 0 1 2-2h2"/>\n    <path d="M17 3h2a2 2 0 0 1 2 2v2"/>\n    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>\n    <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>\n    <circle cx="12" cy="12" r="1"/>\n    <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>\n  </symbol>\n\n  <symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <line x1="18" y1="6" x2="6" y2="18"/>\n    <line x1="6" y1="6" x2="18" y2="18"/>\n  </symbol>\n\n  <symbol id="icon-replay" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M3 7V5a2 2 0 0 1 2-2h2"/>\n    <path d="M17 3h2a2 2 0 0 1 2 2v2"/>\n    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>\n    <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>\n    <circle cx="12" cy="12" r="1"/>\n    <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>\n  </symbol>\n\n  <symbol id="icon-chevrons-up-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="m7 15 5 5 5-5"/>\n    <path d="m7 9 5-5 5 5"/>\n  </symbol>\n\n  <symbol id="icon-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="m6 9 6 6 6-6"/>\n  </symbol>\n</svg>\n',
            'image/svg+xml',
          ).documentElement;
          Kr.appendChild(r);
          const i = document.createElement('div');
          if (
            ((i.id = 'react-scan-toolbar-root'),
            (i.className = 'absolute z-2147483647'),
            t.appendChild(n),
            t.appendChild(i),
            Kr.appendChild(t),
            document.documentElement.appendChild(e),
            (o = (() => {
              const e = document.getElementById('react-scan-root'),
                t = e?.shadowRoot;
              if (!t) return null;
              const n = document.createElement('canvas');
              (n.id = 'react-scan-overlay'),
                (n.style.position = 'fixed'),
                (n.style.top = '0'),
                (n.style.left = '0'),
                (n.style.width = '100vw'),
                (n.style.height = '100vh'),
                (n.style.pointerEvents = 'none'),
                (n.style.zIndex = '2147483646'),
                n.setAttribute('aria-hidden', 'true'),
                t.appendChild(n);
              const o = n.getContext('2d');
              if (!o) return null;
              let r = !1;
              const i = () => {
                const e = window.devicePixelRatio || 1;
                (n.width = e * window.innerWidth),
                  (n.height = e * window.innerHeight),
                  (n.style.width = `${window.innerWidth}px`),
                  (n.style.height = `${window.innerHeight}px`),
                  o.resetTransform(),
                  o.scale(e, e),
                  (r = !1);
              };
              return (
                window.addEventListener('resize', () => {
                  xn(),
                    r ||
                      ((r = !0),
                      requestAnimationFrame(() => {
                        i();
                      }));
                }),
                window.addEventListener('scroll', () => {
                  xn();
                }),
                i(),
                o
              );
            })()),
            !o)
          )
            return;
          oi(o),
            ((e) => {
              if ('undefined' == typeof window) return;
              let t = document.getElementById(Go);
              if (!t) {
                (t = document.createElement('canvas')),
                  (t.id = Go),
                  (t.style.cssText =
                    '\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100vw;\n    height: 100vh;\n    pointer-events: none;\n    z-index: 214748367;\n  '),
                  e.appendChild(t);
                const n = t.getContext('2d', { alpha: !0 });
                if (!n) return;
                Xn(t, n),
                  window.addEventListener(
                    'resize',
                    () => {
                      Xn(t, n);
                    },
                    { capture: !0 },
                  );
              }
              const n = t.getContext('2d', { alpha: !0 });
              if (!n) return;
              const o = () => {
                  cancelAnimationFrame(yo),
                    n.save(),
                    n.setTransform(1, 0, 0, 1, 0, 0),
                    n.clearRect(0, 0, t.width, t.height),
                    n.restore();
                },
                r = { focused: void 0, 'inspect-off': void 0, inspecting: void 0, uninitialized: void 0 },
                i = () => {
                  for (const e in r) r[e]?.();
                },
                a = (e) => {
                  const t = () => {
                    yo && cancelAnimationFrame(yo),
                      (yo = requestAnimationFrame(() => {
                        e(), t();
                      }));
                  };
                  t();
                };
              let s;
              window.addEventListener(
                'mousemove',
                () => {
                  'inspect-off' === Jr.inspectState.value.kind && (o(), Xn(t, n));
                },
                { capture: !0 },
              );
              const l = an(() => {
                const e = (() => {
                  const e = Jr.inspectState.value;
                  switch (e.kind) {
                    case 'uninitialized':
                      return;
                    case 'inspect-off':
                      return (
                        'inspect-off' !== s &&
                          setTimeout(() => {
                            cancelAnimationFrame(yo), i(), o();
                          }, 100),
                        void o()
                      );
                    case 'inspecting': {
                      i(),
                        a(() => {
                          e.hoveredDomElement && Gn(e.hoveredDomElement, t, n, 'inspecting');
                        });
                      const r = document.createElement('div');
                      (r.style.cssText = `\n              position: fixed;\n              left: 0;\n              top: 0;\n              width: 100vw;\n              height: 100vh;\n              z-index: ${parseInt(t.style.zIndex) - 1};\n              pointer-events: auto;\n            `),
                        t.parentNode.insertBefore(r, t);
                      let s = null;
                      const l = an((o) => {
                        if ('inspecting' !== Jr.inspectState.value.kind) return;
                        r.style.pointerEvents = 'none';
                        const i = document.elementFromPoint(o.clientX, o.clientY);
                        (r.style.pointerEvents = 'auto'),
                          i && ((bo = i), (s = i), (e.hoveredDomElement = i), Gn(i, t, n, 'inspecting'));
                      }, 16);
                      window.addEventListener('mousemove', l, { capture: !0 });
                      const c = (o) => {
                        o.stopPropagation(), (r.style.pointerEvents = 'none');
                        const i = s ?? document.elementFromPoint(o.clientX, o.clientY) ?? bo;
                        (r.style.pointerEvents = 'auto'),
                          i &&
                            (Gn(i, t, n, 'locked'),
                            (Jr.inspectState.value = {
                              kind: 'focused',
                              focusedDomElement: i,
                              propContainer: e.propContainer,
                            }));
                      };
                      window.addEventListener('pointerdown', c, { capture: !0 });
                      const d = (t) => {
                        'Escape' === t.key &&
                          ((Jr.inspectState.value = { kind: 'inspect-off', propContainer: e.propContainer }), o());
                      };
                      window.addEventListener('keydown', d, { capture: !0 });
                      let u = () => {};
                      return (
                        e.hoveredDomElement &&
                          (u = Xo(e.hoveredDomElement, () => {
                            Gn(e.hoveredDomElement, t, n, 'inspecting');
                          })),
                        () => {
                          cancelAnimationFrame(yo),
                            window.removeEventListener('pointerdown', c, { capture: !0 }),
                            window.removeEventListener('mousemove', l, { capture: !0 }),
                            window.removeEventListener('keydown', d, { capture: !0 }),
                            r.parentNode?.removeChild(r),
                            u();
                        }
                      );
                    }
                    case 'focused': {
                      if (
                        (i(),
                        a(() => {
                          Gn(e.focusedDomElement, t, n, 'locked');
                        }),
                        !document.contains(e.focusedDomElement))
                      )
                        return (
                          setTimeout(() => {
                            o();
                          }, 500),
                          void (Jr.inspectState.value = { kind: 'inspect-off', propContainer: e.propContainer })
                        );
                      Gn(e.focusedDomElement, t, n, 'locked');
                      const r = e.focusedDomElement,
                        { parentCompositeFiber: s } = Tn(r);
                      if (!s) return;
                      const l = w(s);
                      Ao(l, s);
                      const c = (r) => {
                        'Escape' === r.key &&
                          (o(),
                          Gn(r.target ?? e.focusedDomElement, t, n, 'inspecting'),
                          (Jr.inspectState.value = {
                            kind: 'inspecting',
                            hoveredDomElement: r.target ?? e.focusedDomElement,
                            propContainer: e.propContainer,
                          }));
                      };
                      window.addEventListener('keydown', c, { capture: !0 });
                      const d = (r) => {
                        if (!Un) return;
                        const i = t.getBoundingClientRect(),
                          a = t.width / i.width,
                          s = t.height / i.height,
                          l = (r.clientX - i.left) * a,
                          c = (r.clientY - i.top) * s,
                          d = l / qn,
                          u = c / qn;
                        return d >= Un.x && d <= Un.x + Un.width && u >= Un.y && u <= Un.y + Un.height
                          ? ((e.propContainer.innerHTML = ''),
                            o(),
                            Gn(r.target, t, n, 'inspecting'),
                            r.stopPropagation(),
                            void (Jr.inspectState.value = {
                              kind: 'inspecting',
                              hoveredDomElement: r.target,
                              propContainer: e.propContainer,
                            }))
                          : void 0;
                      };
                      window.addEventListener('pointerdown', d, { capture: !0 });
                      const u = Xo(e.focusedDomElement, () => {
                        Gn(e.focusedDomElement, t, n, 'locked');
                      });
                      return () => {
                        u(),
                          cancelAnimationFrame(yo),
                          window.removeEventListener('keydown', c, { capture: !0 }),
                          window.removeEventListener('pointerdown', d, { capture: !0 });
                      };
                    }
                  }
                })();
                e && (r[Jr.inspectState.value.kind] = e), (s = Jr.inspectState.value.kind);
              }, 70);
              Jr.inspectState.subscribe(l), Jr.lastReportTime.subscribe(l);
            })(Kr),
            (globalThis.__REACT_SCAN__ = { ReactScanInternals: Zr }),
            Zr.options.value.showToolbar && (Yr = Xr(Kr));
          if (document.querySelector('react-scan-overlay')) return;
          const a = document.createElement('react-scan-overlay');
          document.documentElement.appendChild(a),
            console.log(
              '%c[·] %cReact Scan',
              'font-weight:bold;color:#7a68e8;font-size:20px;',
              'font-weight:bold;font-size:14px;',
            ),
            console.log(
              'Try React Scan Monitoring to target performance issues in production: https://react-scan.com/monitoring',
            );
        },
        onCommitStart() {
          Zr.options.value.onCommitStart?.();
        },
        onError(e) {
          console.error('[React Scan] Error instrumenting:', e);
        },
        isValidFiber: ni,
        onRender(e, t) {
          if (
            (!Boolean(Zr.instrumentation?.isPaused.value) ||
              ('inspect-off' !== Jr.inspectState.value.kind && 'uninitialized' !== Jr.inspectState.value.kind)) &&
            o &&
            'visible' === document.visibilityState
          ) {
            ((e, t) => {
              Zr.options.value.onRender?.(e, t);
              const n = C(e.type) || e.type;
              if (n && 'function' == typeof n && 'object' == typeof n) {
                const e = n.renderData || { count: 0, time: 0, renders: [] },
                  o = t[0];
                (e.count += o.count), (e.time += o.time ?? 0), e.renders.push(o), (n.renderData = e);
              }
            })(e, t),
              Zr.options.value.log &&
                ((e) => {
                  const t = new Map();
                  for (let n = 0, o = e.length; n < o; n++) {
                    const o = e[n];
                    if (!o.componentName) continue;
                    const r = t.get(o.componentName) ?? [],
                      i = fn([
                        {
                          aggregatedCount: 1,
                          computedKey: null,
                          name: o.componentName,
                          frame: null,
                          ...o,
                          changes: {
                            type: new Set(o.changes.map((e) => e.type)),
                            unstable: o.changes.some((e) => e.unstable),
                          },
                          phase: new Set([o.phase]),
                        },
                      ]);
                    if (!i) continue;
                    let a = null,
                      s = null;
                    if (o.changes)
                      for (let e = 0, t = o.changes.length; e < t; e++) {
                        const { name: t, prevValue: n, nextValue: i, unstable: l, type: c } = o.changes[e];
                        'props' === c
                          ? ((a ??= {}),
                            (s ??= {}),
                            (a[`${l ? '⚠️' : ''}${t} (prev)`] = n),
                            (s[`${l ? '⚠️' : ''}${t} (next)`] = i))
                          : r.push({ prev: n, next: i, type: c, unstable: l });
                      }
                    a && s && r.push({ prev: a, next: s, type: 'props', unstable: !1 }), t.set(i, r);
                  }
                  for (const [e, n] of Array.from(t.entries())) {
                    console.group(`%c${e}`, 'background: hsla(0,0%,70%,.3); border-radius:3px; padding: 0 2px;');
                    for (const { type: e, prev: t, next: o, unstable: r } of n)
                      console.log(`${e}:`, r ? '⚠️' : '', t, '!==', o);
                    console.groupEnd();
                  }
                })(t),
              g(e) && !1 !== Zr.options.value.showToolbar && 'focused' === Jr.inspectState.value.kind && ti(e, t),
              Zr.options.value.log,
              Zr.options.value.onRender?.(e, t),
              ((e, t) => {
                for (let r = 0, i = t.length; r < i; r++) {
                  const i = t[r],
                    a = _(e);
                  if (a && a.stateNode)
                    if (Zr.scheduledOutlines.has(e)) {
                      (n = i),
                        ((o = Zr.scheduledOutlines.get(e).aggregatedRender).changes = un(n.changes, o.changes)),
                        (o.aggregatedCount += 1),
                        (o.didCommit = o.didCommit || n.didCommit),
                        (o.forget = o.forget || n.forget),
                        (o.fps = o.fps + n.fps),
                        o.phase.add(n.phase),
                        (o.time = (o.time ?? 0) + (n.time ?? 0)),
                        (o.unnecessary = o.unnecessary || n.unnecessary);
                    } else
                      Zr.scheduledOutlines.set(e, {
                        domNode: a.stateNode,
                        aggregatedRender: {
                          computedCurrent: null,
                          name: t.find((e) => e.componentName)?.componentName ?? 'N/A',
                          aggregatedCount: 1,
                          changes: un(i.changes),
                          didCommit: i.didCommit,
                          forget: i.forget,
                          fps: i.fps,
                          phase: new Set([i.phase]),
                          time: i.time,
                          unnecessary: i.unnecessary,
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
                var n, o;
              })(e, t);
            for (let e = 0, o = t.length; e < o; e++) {
              const o = t[e];
              if (Zr.options.value.playSound && n) {
                const e = 10,
                  t = Math.min(1, ((o.time ?? 0) - e) / (2 * e));
                Qo(n, t);
              }
            }
          }
        },
        onCommitFinish() {
          Zr.options.value.onCommitFinish?.();
        },
        trackChanges: !0,
      });
      (Zr.instrumentation = r),
        Jr.monitor.value ||
          setTimeout(() => {
            A() || console.error('[React Scan] Failed to load. Must import React Scan before React runs.');
          }, 5e3);
    },
    si = (e = {}) => {
      ei(e);
      Jr.isInIframe.value || (!1 === e.enabled && !0 !== e.showToolbar) || ai();
    },
    li = new WeakSet();
  'undefined' != typeof window &&
    (si({ dangerouslyForceRunInProduction: 'function' == typeof clear, trackUnnecessaryRenders: !1 }),
    (window.reactScan = si)),
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
  */ (e.ReactScanInternals = Zr),
    (e.Store = Jr),
    (e.getIsProduction = ii),
    (e.getOptions = () => Zr.options),
    (e.getReport = (e) => {
      if (e) {
        for (const t of Array.from(Jr.legacyReportData.values())) if (t.type === e) return t;
        return null;
      }
      return Jr.legacyReportData;
    }),
    (e.ignoreScan = (e) => {
      'object' == typeof e && e && li.add(e);
    }),
    (e.ignoredProps = li),
    (e.isValidFiber = ni),
    (e.onRender = (e, t) => {
      const n = Zr.onRender;
      Zr.onRender = (o, r) => {
        n?.(o, r), C(o.type) === e && t(o, r);
      };
    }),
    (e.reportRender = ti),
    (e.scan = si),
    (e.setOptions = ei),
    (e.start = ai),
    (e.useScan = (e = {}) => {
      ei(e), ai();
    }),
    (e.withScan = (e, t = {}) => {
      ei(t);
      const n = Jr.isInIframe.value,
        o = Zr.componentAllowList;
      return (
        n ||
          (!1 === t.enabled && !0 !== t.showToolbar) ||
          (o || (Zr.componentAllowList = new WeakMap()), o && o.set(e, { ...t }), ai()),
        e
      );
    });
})({});

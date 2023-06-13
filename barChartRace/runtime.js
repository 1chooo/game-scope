// @observablehq/runtime v5.7.3 Copyright 2023 Observable, Inc.
function e(e, t, n) {
  n = n || {};
  var r = e.ownerDocument,
    o = r.defaultView.CustomEvent;
  "function" == typeof o
    ? (o = new o(t, { detail: n }))
    : ((o = r.createEvent("Event")).initEvent(t, !1, !1), (o.detail = n)),
    e.dispatchEvent(o);
}
function t(e) {
  return (
    Array.isArray(e) ||
    e instanceof Int8Array ||
    e instanceof Int16Array ||
    e instanceof Int32Array ||
    e instanceof Uint8Array ||
    e instanceof Uint8ClampedArray ||
    e instanceof Uint16Array ||
    e instanceof Uint32Array ||
    e instanceof Float32Array ||
    e instanceof Float64Array
  );
}
function n(e) {
  return e === (0 | e) + "";
}
function r(e) {
  const t = document.createElement("span");
  return (
    (t.className = "observablehq--cellname"), (t.textContent = `${e} = `), t
  );
}
const o = Symbol.prototype.toString;
function a(e) {
  return o.call(e);
}
const {
    getOwnPropertySymbols: i,
    prototype: { hasOwnProperty: s },
  } = Object,
  { toStringTag: c } = Symbol,
  l = {},
  u = i;
function f(e, t) {
  return s.call(e, t);
}
function d(e) {
  return e[c] || (e.constructor && e.constructor.name) || "Object";
}
function p(e, t) {
  try {
    const n = e[t];
    return n && n.constructor, n;
  } catch (e) {
    return l;
  }
}
const m = [
  { symbol: "@@__IMMUTABLE_INDEXED__@@", name: "Indexed", modifier: !0 },
  { symbol: "@@__IMMUTABLE_KEYED__@@", name: "Keyed", modifier: !0 },
  { symbol: "@@__IMMUTABLE_LIST__@@", name: "List", arrayish: !0 },
  { symbol: "@@__IMMUTABLE_MAP__@@", name: "Map" },
  {
    symbol: "@@__IMMUTABLE_ORDERED__@@",
    name: "Ordered",
    modifier: !0,
    prefix: !0,
  },
  { symbol: "@@__IMMUTABLE_RECORD__@@", name: "Record" },
  { symbol: "@@__IMMUTABLE_SET__@@", name: "Set", arrayish: !0, setish: !0 },
  { symbol: "@@__IMMUTABLE_STACK__@@", name: "Stack", arrayish: !0 },
];
function h(e) {
  try {
    let t = m.filter(({ symbol: t }) => !0 === e[t]);
    if (!t.length) return;
    const n = t.find((e) => !e.modifier),
      r = "Map" === n.name && t.find((e) => e.modifier && e.prefix),
      o = t.some((e) => e.arrayish),
      a = t.some((e) => e.setish);
    return {
      name: `${r ? r.name : ""}${n.name}`,
      symbols: t,
      arrayish: o && !a,
      setish: a,
    };
  } catch (e) {
    return null;
  }
}
const { getPrototypeOf: b, getOwnPropertyDescriptors: w } = Object,
  v = b({});
function y(n, o, a, i) {
  let s,
    c,
    l,
    u,
    f = t(n);
  n instanceof Map
    ? n instanceof n.constructor
      ? ((s = `Map(${n.size})`), (c = g))
      : ((s = "Map()"), (c = T))
    : n instanceof Set
    ? n instanceof n.constructor
      ? ((s = `Set(${n.size})`), (c = _))
      : ((s = "Set()"), (c = T))
    : f
    ? ((s = `${n.constructor.name}(${n.length})`), (c = C))
    : (u = h(n))
    ? ((s = `Immutable.${u.name}${"Record" === u.name ? "" : `(${n.size})`}`),
      (f = u.arrayish),
      (c = u.arrayish ? N : u.setish ? E : A))
    : i
    ? ((s = d(n)), (c = x))
    : ((s = d(n)), (c = T));
  const p = document.createElement("span");
  (p.className = "observablehq--expanded"), a && p.appendChild(r(a));
  const m = p.appendChild(document.createElement("a"));
  (m.innerHTML =
    "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M4 7L0 1h8z' fill='currentColor' />\n  </svg>"),
    m.appendChild(document.createTextNode(`${s}${f ? " [" : " {"}`)),
    m.addEventListener("mouseup", function (e) {
      e.stopPropagation(), ie(p, L(n, null, a, i));
    }),
    (c = c(n));
  for (let e = 0; !(l = c.next()).done && e < 20; ++e) p.appendChild(l.value);
  if (!l.done) {
    const t = p.appendChild(document.createElement("a"));
    (t.className = "observablehq--field"),
      (t.style.display = "block"),
      t.appendChild(document.createTextNode("  … more")),
      t.addEventListener("mouseup", function (t) {
        t.stopPropagation(),
          p.insertBefore(l.value, p.lastChild.previousSibling);
        for (let e = 0; !(l = c.next()).done && e < 19; ++e)
          p.insertBefore(l.value, p.lastChild.previousSibling);
        l.done && p.removeChild(p.lastChild.previousSibling), e(p, "load");
      });
  }
  return p.appendChild(document.createTextNode(f ? "]" : "}")), p;
}
function* g(e) {
  for (const [t, n] of e) yield S(t, n);
  yield* T(e);
}
function* _(e) {
  for (const t of e) yield q(t);
  yield* T(e);
}
function* E(e) {
  for (const t of e) yield q(t);
}
function* C(e) {
  for (let t = 0, n = e.length; t < n; ++t)
    t in e && (yield $(t, p(e, t), "observablehq--index"));
  for (const t in e)
    !n(t) && f(e, t) && (yield $(t, p(e, t), "observablehq--key"));
  for (const t of u(e)) yield $(a(t), p(e, t), "observablehq--symbol");
}
function* N(e) {
  let t = 0;
  for (const n = e.size; t < n; ++t) yield $(t, e.get(t), !0);
}
function* x(e) {
  for (const t in w(e)) yield $(t, p(e, t), "observablehq--key");
  for (const t of u(e)) yield $(a(t), p(e, t), "observablehq--symbol");
  const t = b(e);
  t && t !== v && (yield j(t));
}
function* T(e) {
  for (const t in e) f(e, t) && (yield $(t, p(e, t), "observablehq--key"));
  for (const t of u(e)) yield $(a(t), p(e, t), "observablehq--symbol");
  const t = b(e);
  t && t !== v && (yield j(t));
}
function* A(e) {
  for (const [t, n] of e) yield $(t, n, "observablehq--key");
}
function j(e) {
  const t = document.createElement("div"),
    n = t.appendChild(document.createElement("span"));
  return (
    (t.className = "observablehq--field"),
    (n.className = "observablehq--prototype-key"),
    (n.textContent = "  <prototype>"),
    t.appendChild(document.createTextNode(": ")),
    t.appendChild(ae(e, void 0, void 0, void 0, !0)),
    t
  );
}
function $(e, t, n) {
  const r = document.createElement("div"),
    o = r.appendChild(document.createElement("span"));
  return (
    (r.className = "observablehq--field"),
    (o.className = n),
    (o.textContent = `  ${e}`),
    r.appendChild(document.createTextNode(": ")),
    r.appendChild(ae(t)),
    r
  );
}
function S(e, t) {
  const n = document.createElement("div");
  return (
    (n.className = "observablehq--field"),
    n.appendChild(document.createTextNode("  ")),
    n.appendChild(ae(e)),
    n.appendChild(document.createTextNode(" => ")),
    n.appendChild(ae(t)),
    n
  );
}
function q(e) {
  const t = document.createElement("div");
  return (
    (t.className = "observablehq--field"),
    t.appendChild(document.createTextNode("  ")),
    t.appendChild(ae(e)),
    t
  );
}
function O(e) {
  const t = window.getSelection();
  return (
    "Range" === t.type &&
    (t.containsNode(e, !0) ||
      t.anchorNode.isSelfOrDescendant(e) ||
      t.focusNode.isSelfOrDescendant(e))
  );
}
function L(e, n, o, a) {
  let i,
    s,
    c,
    l,
    u = t(e);
  if (
    (e instanceof Map
      ? e instanceof e.constructor
        ? ((i = `Map(${e.size})`), (s = k))
        : ((i = "Map()"), (s = U))
      : e instanceof Set
      ? e instanceof e.constructor
        ? ((i = `Set(${e.size})`), (s = M))
        : ((i = "Set()"), (s = U))
      : u
      ? ((i = `${e.constructor.name}(${e.length})`), (s = R))
      : (l = h(e))
      ? ((i = `Immutable.${l.name}${"Record" === l.name ? "" : `(${e.size})`}`),
        (u = l.arrayish),
        (s = l.arrayish ? P : l.setish ? I : D))
      : ((i = d(e)), (s = U)),
    n)
  ) {
    const t = document.createElement("span");
    return (
      (t.className = "observablehq--shallow"),
      o && t.appendChild(r(o)),
      t.appendChild(document.createTextNode(i)),
      t.addEventListener("mouseup", function (n) {
        O(t) || (n.stopPropagation(), ie(t, L(e)));
      }),
      t
    );
  }
  const f = document.createElement("span");
  (f.className = "observablehq--collapsed"), o && f.appendChild(r(o));
  const p = f.appendChild(document.createElement("a"));
  (p.innerHTML =
    "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M7 4L1 8V0z' fill='currentColor' />\n  </svg>"),
    p.appendChild(document.createTextNode(`${i}${u ? " [" : " {"}`)),
    f.addEventListener(
      "mouseup",
      function (t) {
        O(f) || (t.stopPropagation(), ie(f, y(e, 0, o, a)));
      },
      !0
    ),
    (s = s(e));
  for (let e = 0; !(c = s.next()).done && e < 20; ++e)
    e > 0 && f.appendChild(document.createTextNode(", ")),
      f.appendChild(c.value);
  return (
    c.done || f.appendChild(document.createTextNode(", …")),
    f.appendChild(document.createTextNode(u ? "]" : "}")),
    f
  );
}
function* k(e) {
  for (const [t, n] of e) yield z(t, n);
  yield* U(e);
}
function* M(e) {
  for (const t of e) yield ae(t, !0);
  yield* U(e);
}
function* I(e) {
  for (const t of e) yield ae(t, !0);
}
function* P(e) {
  let t = -1,
    n = 0;
  for (const r = e.size; n < r; ++n)
    n > t + 1 && (yield F(n - t - 1)), yield ae(e.get(n), !0), (t = n);
  n > t + 1 && (yield F(n - t - 1));
}
function* R(e) {
  let t = -1,
    r = 0;
  for (const n = e.length; r < n; ++r)
    r in e &&
      (r > t + 1 && (yield F(r - t - 1)), yield ae(p(e, r), !0), (t = r));
  r > t + 1 && (yield F(r - t - 1));
  for (const t in e)
    !n(t) && f(e, t) && (yield B(t, p(e, t), "observablehq--key"));
  for (const t of u(e)) yield B(a(t), p(e, t), "observablehq--symbol");
}
function* U(e) {
  for (const t in e) f(e, t) && (yield B(t, p(e, t), "observablehq--key"));
  for (const t of u(e)) yield B(a(t), p(e, t), "observablehq--symbol");
}
function* D(e) {
  for (const [t, n] of e) yield B(t, n, "observablehq--key");
}
function F(e) {
  const t = document.createElement("span");
  return (
    (t.className = "observablehq--empty"),
    (t.textContent = 1 === e ? "empty" : `empty × ${e}`),
    t
  );
}
function B(e, t, n) {
  const r = document.createDocumentFragment(),
    o = r.appendChild(document.createElement("span"));
  return (
    (o.className = n),
    (o.textContent = e),
    r.appendChild(document.createTextNode(": ")),
    r.appendChild(ae(t, !0)),
    r
  );
}
function z(e, t) {
  const n = document.createDocumentFragment();
  return (
    n.appendChild(ae(e, !0)),
    n.appendChild(document.createTextNode(" => ")),
    n.appendChild(ae(t, !0)),
    n
  );
}
function W(e, t) {
  if ((e instanceof Date || (e = new Date(+e)), isNaN(e)))
    return "function" == typeof t ? t(e) : t;
  const n = e.getUTCHours(),
    r = e.getUTCMinutes(),
    o = e.getUTCSeconds(),
    a = e.getUTCMilliseconds();
  return `${
    ((i = e.getUTCFullYear()),
    i < 0 ? `-${H(-i, 6)}` : i > 9999 ? `+${H(i, 6)}` : H(i, 4))
  }-${H(e.getUTCMonth() + 1, 2)}-${H(e.getUTCDate(), 2)}${
    n || r || o || a
      ? `T${H(n, 2)}:${H(r, 2)}${
          o || a ? `:${H(o, 2)}${a ? `.${H(a, 3)}` : ""}` : ""
        }Z`
      : ""
  }`;
  var i;
}
function H(e, t) {
  return `${e}`.padStart(t, "0");
}
var V = Error.prototype.toString;
var G = RegExp.prototype.toString;
function Y(e) {
  return e.replace(/[\\`\x00-\x09\x0b-\x19]|\${/g, Z);
}
function Z(e) {
  var t = e.charCodeAt(0);
  switch (t) {
    case 8:
      return "\\b";
    case 9:
      return "\\t";
    case 11:
      return "\\v";
    case 12:
      return "\\f";
    case 13:
      return "\\r";
  }
  return t < 16
    ? "\\x0" + t.toString(16)
    : t < 32
    ? "\\x" + t.toString(16)
    : "\\" + e;
}
function J(e, t) {
  for (var n = 0; t.exec(e); ) ++n;
  return n;
}
var K = Function.prototype.toString,
  X = { prefix: "async ƒ" },
  Q = { prefix: "async ƒ*" },
  ee = { prefix: "class" },
  te = { prefix: "ƒ" },
  ne = { prefix: "ƒ*" };
function re(e, t, n) {
  var o = document.createElement("span");
  (o.className = "observablehq--function"), n && o.appendChild(r(n));
  var a = o.appendChild(document.createElement("span"));
  return (
    (a.className = "observablehq--keyword"),
    (a.textContent = e.prefix),
    o.appendChild(document.createTextNode(t)),
    o
  );
}
const {
  prototype: { toString: oe },
} = Object;
function ae(e, t, n, o, i) {
  let s = typeof e;
  switch (s) {
    case "boolean":
    case "undefined":
      e += "";
      break;
    case "number":
      e = 0 === e && 1 / e < 0 ? "-0" : e + "";
      break;
    case "bigint":
      e += "n";
      break;
    case "symbol":
      e = a(e);
      break;
    case "function":
      return (function (e, t) {
        var n,
          r,
          o = K.call(e);
        switch (e.constructor && e.constructor.name) {
          case "AsyncFunction":
            n = X;
            break;
          case "AsyncGeneratorFunction":
            n = Q;
            break;
          case "GeneratorFunction":
            n = ne;
            break;
          default:
            n = /^class\b/.test(o) ? ee : te;
        }
        return n === ee
          ? re(n, "", t)
          : (r = /^(?:async\s*)?(\w+)\s*=>/.exec(o))
          ? re(n, "(" + r[1] + ")", t)
          : (r = /^(?:async\s*)?\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(o)) ||
            (r =
              /^(?:async\s*)?function(?:\s*\*)?(?:\s*\w+)?\s*\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(
                o
              ))
          ? re(n, r[1] ? "(" + r[1].replace(/\s*,\s*/g, ", ") + ")" : "()", t)
          : re(n, "(…)", t);
      })(e, o);
    case "string":
      return (function (e, t, n, o) {
        if (!1 === t) {
          if (J(e, /["\n]/g) <= J(e, /`|\${/g)) {
            const t = document.createElement("span");
            o && t.appendChild(r(o));
            const n = t.appendChild(document.createElement("span"));
            return (
              (n.className = "observablehq--string"),
              (n.textContent = JSON.stringify(e)),
              t
            );
          }
          const a = e.split("\n");
          if (a.length > 20 && !n) {
            const n = document.createElement("div");
            o && n.appendChild(r(o));
            const i = n.appendChild(document.createElement("span"));
            (i.className = "observablehq--string"),
              (i.textContent = "`" + Y(a.slice(0, 20).join("\n")));
            const s = n.appendChild(document.createElement("span")),
              c = a.length - 20;
            return (
              (s.textContent = `Show ${c} truncated line${c > 1 ? "s" : ""}`),
              (s.className = "observablehq--string-expand"),
              s.addEventListener("mouseup", function (r) {
                r.stopPropagation(), ie(n, ae(e, t, !0, o));
              }),
              n
            );
          }
          const i = document.createElement("span");
          o && i.appendChild(r(o));
          const s = i.appendChild(document.createElement("span"));
          return (
            (s.className =
              "observablehq--string" + (n ? " observablehq--expanded" : "")),
            (s.textContent = "`" + Y(e) + "`"),
            i
          );
        }
        const a = document.createElement("span");
        o && a.appendChild(r(o));
        const i = a.appendChild(document.createElement("span"));
        return (
          (i.className = "observablehq--string"),
          (i.textContent = JSON.stringify(
            e.length > 100 ? `${e.slice(0, 50)}…${e.slice(-49)}` : e
          )),
          a
        );
      })(e, t, n, o);
    default:
      if (null === e) {
        (s = null), (e = "null");
        break;
      }
      if (e instanceof Date) {
        (s = "date"), (e = W(e, "Invalid Date"));
        break;
      }
      if (e === l) {
        (s = "forbidden"), (e = "[forbidden]");
        break;
      }
      switch (oe.call(e)) {
        case "[object RegExp]":
          (s = "regexp"),
            (e = (function (e) {
              return G.call(e);
            })(e));
          break;
        case "[object Error]":
        case "[object DOMException]":
          (s = "error"),
            (e = (function (e) {
              return e.stack || V.call(e);
            })(e));
          break;
        default:
          return (n ? y : L)(e, t, o, i);
      }
  }
  const c = document.createElement("span");
  o && c.appendChild(r(o));
  const u = c.appendChild(document.createElement("span"));
  return (u.className = `observablehq--${s}`), (u.textContent = e), c;
}
function ie(t, n) {
  t.classList.contains("observablehq--inspect") &&
    n.classList.add("observablehq--inspect"),
    t.parentNode.replaceChild(n, t),
    e(n, "load");
}
const se = /\s+\(\d+:\d+\)$/m;
class Inspector {
  constructor(e) {
    if (!e) throw new Error("invalid node");
    (this._node = e), e.classList.add("observablehq");
  }
  pending() {
    const { _node: e } = this;
    e.classList.remove("observablehq--error"),
      e.classList.add("observablehq--running");
  }
  fulfilled(t, n) {
    const { _node: r } = this;
    if (
      ((!(function (e) {
        return (
          (e instanceof Element || e instanceof Text) &&
          e instanceof e.constructor
        );
      })(t) ||
        (t.parentNode && t.parentNode !== r)) &&
        (t = ae(
          t,
          !1,
          r.firstChild &&
            r.firstChild.classList &&
            r.firstChild.classList.contains("observablehq--expanded"),
          n
        )).classList.add("observablehq--inspect"),
      r.classList.remove("observablehq--running", "observablehq--error"),
      r.firstChild !== t)
    )
      if (r.firstChild) {
        for (; r.lastChild !== r.firstChild; ) r.removeChild(r.lastChild);
        r.replaceChild(t, r.firstChild);
      } else r.appendChild(t);
    e(r, "update");
  }
  rejected(t, n) {
    const { _node: o } = this;
    for (
      o.classList.remove("observablehq--running"),
        o.classList.add("observablehq--error");
      o.lastChild;

    )
      o.removeChild(o.lastChild);
    var a = document.createElement("div");
    (a.className = "observablehq--inspect"),
      n && a.appendChild(r(n)),
      a.appendChild(document.createTextNode((t + "").replace(se, ""))),
      o.appendChild(a),
      e(o, "error", { error: t });
  }
}
Inspector.into = function (e) {
  if ("string" == typeof e && null == (e = document.querySelector(e)))
    throw new Error("container not found");
  return function () {
    return new Inspector(e.appendChild(document.createElement("div")));
  };
};
var ce = {},
  le = {};
function ue(e) {
  return new Function(
    "d",
    "return {" +
      e
        .map(function (e, t) {
          return JSON.stringify(e) + ": d[" + t + '] || ""';
        })
        .join(",") +
      "}"
  );
}
function fe(e) {
  var t = Object.create(null),
    n = [];
  return (
    e.forEach(function (e) {
      for (var r in e) r in t || n.push((t[r] = r));
    }),
    n
  );
}
function de(e, t) {
  var n = e + "",
    r = n.length;
  return r < t ? new Array(t - r + 1).join(0) + n : n;
}
function pe(e) {
  var t,
    n = e.getUTCHours(),
    r = e.getUTCMinutes(),
    o = e.getUTCSeconds(),
    a = e.getUTCMilliseconds();
  return isNaN(e)
    ? "Invalid Date"
    : ((t = e.getUTCFullYear()) < 0
        ? "-" + de(-t, 6)
        : t > 9999
        ? "+" + de(t, 6)
        : de(t, 4)) +
        "-" +
        de(e.getUTCMonth() + 1, 2) +
        "-" +
        de(e.getUTCDate(), 2) +
        (a
          ? "T" +
            de(n, 2) +
            ":" +
            de(r, 2) +
            ":" +
            de(o, 2) +
            "." +
            de(a, 3) +
            "Z"
          : o
          ? "T" + de(n, 2) + ":" + de(r, 2) + ":" + de(o, 2) + "Z"
          : r || n
          ? "T" + de(n, 2) + ":" + de(r, 2) + "Z"
          : "");
}
function me(e) {
  var t = new RegExp('["' + e + "\n\r]"),
    n = e.charCodeAt(0);
  function r(e, t) {
    var r,
      o = [],
      a = e.length,
      i = 0,
      s = 0,
      c = a <= 0,
      l = !1;
    function u() {
      if (c) return le;
      if (l) return (l = !1), ce;
      var t,
        r,
        o = i;
      if (34 === e.charCodeAt(o)) {
        for (
          ;
          (i++ < a && 34 !== e.charCodeAt(i)) || 34 === e.charCodeAt(++i);

        );
        return (
          (t = i) >= a
            ? (c = !0)
            : 10 === (r = e.charCodeAt(i++))
            ? (l = !0)
            : 13 === r && ((l = !0), 10 === e.charCodeAt(i) && ++i),
          e.slice(o + 1, t - 1).replace(/""/g, '"')
        );
      }
      for (; i < a; ) {
        if (10 === (r = e.charCodeAt((t = i++)))) l = !0;
        else if (13 === r) (l = !0), 10 === e.charCodeAt(i) && ++i;
        else if (r !== n) continue;
        return e.slice(o, t);
      }
      return (c = !0), e.slice(o, a);
    }
    for (
      10 === e.charCodeAt(a - 1) && --a, 13 === e.charCodeAt(a - 1) && --a;
      (r = u()) !== le;

    ) {
      for (var f = []; r !== ce && r !== le; ) f.push(r), (r = u());
      (t && null == (f = t(f, s++))) || o.push(f);
    }
    return o;
  }
  function o(t, n) {
    return t.map(function (t) {
      return n
        .map(function (e) {
          return i(t[e]);
        })
        .join(e);
    });
  }
  function a(t) {
    return t.map(i).join(e);
  }
  function i(e) {
    return null == e
      ? ""
      : e instanceof Date
      ? pe(e)
      : t.test((e += ""))
      ? '"' + e.replace(/"/g, '""') + '"'
      : e;
  }
  return {
    parse: function (e, t) {
      var n,
        o,
        a = r(e, function (e, r) {
          if (n) return n(e, r - 1);
          (o = e),
            (n = t
              ? (function (e, t) {
                  var n = ue(e);
                  return function (r, o) {
                    return t(n(r), o, e);
                  };
                })(e, t)
              : ue(e));
        });
      return (a.columns = o || []), a;
    },
    parseRows: r,
    format: function (t, n) {
      return (
        null == n && (n = fe(t)), [n.map(i).join(e)].concat(o(t, n)).join("\n")
      );
    },
    formatBody: function (e, t) {
      return null == t && (t = fe(e)), o(e, t).join("\n");
    },
    formatRows: function (e) {
      return e.map(a).join("\n");
    },
    formatRow: a,
    formatValue: i,
  };
}
var he = me(","),
  be = he.parse,
  we = he.parseRows,
  ve = me("\t"),
  ye = ve.parse,
  ge = ve.parseRows;
function _e(e) {
  for (var t in e) {
    var n,
      r,
      o = e[t].trim();
    if (o)
      if ("true" === o) o = !0;
      else if ("false" === o) o = !1;
      else if ("NaN" === o) o = NaN;
      else if (isNaN((n = +o))) {
        if (
          !(r = o.match(
            /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/
          ))
        )
          continue;
        Ee && r[4] && !r[7] && (o = o.replace(/-/g, "/").replace(/T/, " ")),
          (o = new Date(o));
      } else o = n;
    else o = null;
    e[t] = o;
  }
  return e;
}
const Ee =
  new Date("2019-01-01T00:00").getHours() ||
  new Date("2019-07-01T00:00").getHours();
function Ce(e, t, n) {
  return { resolve: (r = n) => `${e}@${t}/${r}` };
}
const Ne = Ce("d3", "7.8.5", "dist/d3.min.js"),
  xe = Ce("@observablehq/inputs", "0.10.4", "dist/inputs.min.js"),
  Te = Ce("@observablehq/plot", "0.6.8", "dist/plot.umd.min.js"),
  Ae = Ce("@observablehq/graphviz", "0.2.1", "dist/graphviz.min.js"),
  je = Ce("@observablehq/highlight.js", "2.0.0", "highlight.min.js"),
  $e = Ce("@observablehq/katex", "0.11.1", "dist/katex.min.js"),
  Se = Ce("lodash", "4.17.21", "lodash.min.js"),
  qe = Ce("htl", "0.3.1", "dist/htl.min.js"),
  Oe = Ce("jszip", "3.10.1", "dist/jszip.min.js"),
  Le = Ce("marked", "0.3.12", "marked.min.js"),
  ke = Ce("sql.js", "1.8.0", "dist/sql-wasm.js"),
  Me = Ce("vega", "5.22.1", "build/vega.min.js"),
  Ie = Ce("vega-lite", "5.6.0", "build/vega-lite.min.js"),
  Pe = Ce("vega-lite-api", "5.0.0", "build/vega-lite-api.min.js"),
  Re = Ce("apache-arrow", "4.0.1", "Arrow.es2015.min.js"),
  Ue = Ce("apache-arrow", "9.0.0", "+esm"),
  De = Ce("apache-arrow", "11.0.0", "+esm"),
  Fe = Ce("arquero", "4.8.8", "dist/arquero.min.js"),
  Be = Ce("topojson-client", "3.1.0", "dist/topojson-client.min.js"),
  ze = Ce("exceljs", "4.3.0", "dist/exceljs.min.js"),
  We = Ce("mermaid", "9.2.2", "dist/mermaid.min.js"),
  He = Ce("leaflet", "1.9.3", "dist/leaflet.js"),
  Ve = Ce("@duckdb/duckdb-wasm", "1.24.0", "+esm"),
  Ge = new Map(),
  Ye = [],
  Ze = Ye.map,
  Je = Ye.some,
  Ke = Ye.hasOwnProperty,
  Xe = /^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?(?:\/(.*))?$/,
  Qe = /^\d+\.\d+\.\d+(-[\w-.+]+)?$/,
  et = /(?:\.[^/]*|\/)$/;
class RequireError extends Error {
  constructor(e) {
    super(e);
  }
}
function tt(e) {
  const t = Xe.exec(e);
  return t && { name: t[1], version: t[2], path: t[3] };
}
function nt(
  e = "https://cdn.jsdelivr.net/npm/",
  t = ["unpkg", "jsdelivr", "browser", "main"]
) {
  if (!/\/$/.test(e)) throw new Error("origin lacks trailing slash");
  function n(t) {
    const n = `${e}${t.name}${t.version ? `@${t.version}` : ""}/package.json`;
    let r = Ge.get(n);
    return (
      r ||
        Ge.set(
          n,
          (r = fetch(n).then((e) => {
            if (!e.ok) throw new RequireError("unable to load package.json");
            return e.redirected && !Ge.has(e.url) && Ge.set(e.url, r), e.json();
          }))
        ),
      r
    );
  }
  return async function (r, o) {
    if (
      (r.startsWith(e) && (r = r.substring(e.length)), /^(\w+:)|\/\//i.test(r))
    )
      return r;
    if (/^[.]{0,2}\//i.test(r))
      return new URL(r, null == o ? location : o).href;
    if (!r.length || /^[\s._]/.test(r) || /\s$/.test(r))
      throw new RequireError("illegal name");
    const a = tt(r);
    if (!a) return `${e}${r}`;
    if (!a.version && null != o && o.startsWith(e)) {
      const t = await n(tt(o.substring(e.length)));
      a.version =
        (t.dependencies && t.dependencies[a.name]) ||
        (t.peerDependencies && t.peerDependencies[a.name]);
    }
    if (
      (a.path && !et.test(a.path) && (a.path += ".js"),
      a.path && a.version && Qe.test(a.version))
    )
      return `${e}${a.name}@${a.version}/${a.path}`;
    const i = await n(a);
    return `${e}${i.name}@${i.version}/${
      a.path ||
      (function (e) {
        for (const n of t) {
          let t = e[n];
          if ("string" == typeof t)
            return (
              t.startsWith("./") && (t = t.slice(2)), et.test(t) ? t : `${t}.js`
            );
        }
      })(i) ||
      "index.js"
    }`;
  };
}
RequireError.prototype.name = RequireError.name;
var rt = ot(nt());
function ot(e) {
  const t = new Map(),
    n = o(null);
  function r(e) {
    if ("string" != typeof e) return e;
    let n = t.get(e);
    return (
      n ||
        t.set(
          e,
          (n = new Promise((t, n) => {
            const r = document.createElement("script");
            (r.onload = () => {
              try {
                t(Ye.pop()(o(e)));
              } catch (e) {
                n(new RequireError("invalid module"));
              }
              r.remove();
            }),
              (r.onerror = () => {
                n(new RequireError("unable to load module")), r.remove();
              }),
              (r.async = !0),
              (r.src = e),
              (window.define = ct),
              document.head.appendChild(r);
          }))
        ),
      n
    );
  }
  function o(t) {
    return (n) => Promise.resolve(e(n, t)).then(r);
  }
  function a(e) {
    return arguments.length > 1
      ? Promise.all(Ze.call(arguments, n)).then(at)
      : n(e);
  }
  return (
    (a.alias = function (t) {
      return ot((n, r) =>
        n in t && ((r = null), "string" != typeof (n = t[n])) ? n : e(n, r)
      );
    }),
    (a.resolve = e),
    a
  );
}
function at(e) {
  const t = {};
  for (const n of e)
    for (const e in n)
      Ke.call(n, e) &&
        (null == n[e]
          ? Object.defineProperty(t, e, { get: it(n, e) })
          : (t[e] = n[e]));
  return t;
}
function it(e, t) {
  return () => e[t];
}
function st(e) {
  return "exports" === (e += "") || "module" === e;
}
function ct(e, t, n) {
  const r = arguments.length;
  r < 2
    ? ((n = e), (t = []))
    : r < 3 && ((n = t), (t = "string" == typeof e ? [] : e)),
    Ye.push(
      Je.call(t, st)
        ? (e) => {
            const r = {},
              o = { exports: r };
            return Promise.all(
              Ze.call(t, (t) =>
                "exports" === (t += "") ? r : "module" === t ? o : e(t)
              )
            ).then((e) => (n.apply(null, e), o.exports));
          }
        : (e) =>
            Promise.all(Ze.call(t, e)).then((e) =>
              "function" == typeof n ? n.apply(null, e) : n
            )
    );
}
ct.amd = {};
const lt = "https://cdn.observableusercontent.com/npm/";
let ut,
  ft = rt;
async function dt(e) {
  const [t, n] = await Promise.all([
    e(ke.resolve()),
    e.resolve(ke.resolve("dist/")),
  ]);
  return t({ locateFile: (e) => `${n}${e}` });
}
class SQLiteDatabaseClient {
  constructor(e) {
    Object.defineProperties(this, { _db: { value: e } });
  }
  static async open(e) {
    const [t, n] = await Promise.all([dt(ft), Promise.resolve(e).then(mt)]);
    return new SQLiteDatabaseClient(new t.Database(n));
  }
  async query(e, t) {
    return await (async function (e, t, n) {
      const [r] = await e.exec(t, n);
      if (!r) return [];
      const { columns: o, values: a } = r,
        i = a.map((e) => Object.fromEntries(e.map((e, t) => [o[t], e])));
      return (i.columns = o), i;
    })(this._db, e, t);
  }
  async queryRow(e, t) {
    return (await this.query(e, t))[0] || null;
  }
  async explain(e, t) {
    return ht("pre", { className: "observablehq--inspect" }, [
      bt(
        (await this.query(`EXPLAIN QUERY PLAN ${e}`, t))
          .map((e) => e.detail)
          .join("\n")
      ),
    ]);
  }
  async describeTables({ schema: e } = {}) {
    return this.query(
      `SELECT NULLIF(schema, 'main') AS schema, name FROM pragma_table_list() WHERE type = 'table'${
        null == e ? "" : " AND schema = ?"
      } AND name NOT LIKE 'sqlite_%' ORDER BY schema, name`,
      null == e ? [] : [e]
    );
  }
  async describeColumns({ schema: e, table: t } = {}) {
    if (null == t) throw new Error("missing table");
    const n = await this.query(
      `SELECT name, type, "notnull" FROM pragma_table_info(?${
        null == e ? "" : ", ?"
      }) ORDER BY cid`,
      null == e ? [t] : [t, e]
    );
    if (!n.length) throw new Error(`table not found: ${t}`);
    return n.map(({ name: e, type: t, notnull: n }) => ({
      name: e,
      type: pt(t),
      databaseType: t,
      nullable: !n,
    }));
  }
  async describe(e) {
    const t = await (void 0 === e
      ? this.query("SELECT name FROM sqlite_master WHERE type = 'table'")
      : this.query("SELECT * FROM pragma_table_info(?)", [e]));
    if (!t.length) throw new Error("Not found");
    const { columns: n } = t;
    return ht("table", { value: t }, [
      ht("thead", [
        ht(
          "tr",
          n.map((e) => ht("th", [bt(e)]))
        ),
      ]),
      ht(
        "tbody",
        t.map((e) =>
          ht(
            "tr",
            n.map((t) => ht("td", [bt(e[t])]))
          )
        )
      ),
    ]);
  }
  async sql() {
    return this.query(...this.queryTag.apply(this, arguments));
  }
  queryTag(e, ...t) {
    return [e.join("?"), t];
  }
}
function pt(e) {
  switch (e) {
    case "NULL":
      return "null";
    case "INT":
    case "INTEGER":
    case "TINYINT":
    case "SMALLINT":
    case "MEDIUMINT":
    case "BIGINT":
    case "UNSIGNED BIG INT":
    case "INT2":
    case "INT8":
      return "integer";
    case "TEXT":
    case "CLOB":
    case "DATE":
    case "DATETIME":
      return "string";
    case "REAL":
    case "DOUBLE":
    case "DOUBLE PRECISION":
    case "FLOAT":
    case "NUMERIC":
      return "number";
    case "BLOB":
      return "buffer";
    default:
      return /^(?:(?:(?:VARYING|NATIVE) )?CHARACTER|(?:N|VAR|NVAR)CHAR)\(/.test(
        e
      )
        ? "string"
        : /^(?:DECIMAL|NUMERIC)\(/.test(e)
        ? "number"
        : "other";
  }
}
function mt(e) {
  return "string" == typeof e
    ? fetch(e).then(mt)
    : e instanceof Response || e instanceof Blob
    ? e.arrayBuffer().then(mt)
    : e instanceof ArrayBuffer
    ? new Uint8Array(e)
    : e;
}
function ht(e, t, n) {
  2 === arguments.length && ((n = t), (t = void 0));
  const r = document.createElement(e);
  if (void 0 !== t) for (const e in t) r[e] = t[e];
  if (void 0 !== n) for (const e of n) r.appendChild(e);
  return r;
}
function bt(e) {
  return document.createTextNode(e);
}
function wt(e, t) {
  return null == e || null == t
    ? NaN
    : e < t
    ? -1
    : e > t
    ? 1
    : e >= t
    ? 0
    : NaN;
}
function vt(e, t = wt) {
  let n,
    r = !1;
  if (1 === t.length) {
    let o;
    for (const a of e) {
      const e = t(a);
      (r ? wt(e, o) > 0 : 0 === wt(e, e)) && ((n = a), (o = e), (r = !0));
    }
  } else
    for (const o of e) (r ? t(o, n) > 0 : 0 === t(o, o)) && ((n = o), (r = !0));
  return n;
}
function yt(e) {
  return e && "function" == typeof e.toArrowBuffer;
}
function gt(e) {
  return (
    e &&
    "function" == typeof e.getChild &&
    "function" == typeof e.toArray &&
    e.schema &&
    Array.isArray(e.schema.fields)
  );
}
function _t(e) {
  return {
    name: e.name,
    type: Et(e.type),
    nullable: e.nullable,
    databaseType: String(e.type),
  };
}
function Et(e) {
  switch (e.typeId) {
    case 2:
      return "integer";
    case 3:
    case 7:
      return "number";
    case 4:
    case 15:
      return "buffer";
    case 5:
      return "string";
    case 6:
      return "boolean";
    case 8:
    case 9:
    case 10:
      return "date";
    case 12:
    case 16:
      return "array";
    case 13:
    case 14:
      return "object";
    default:
      return "other";
  }
}
async function Ct() {
  return await import(`${lt}${De.resolve()}`);
}
Object.defineProperty(SQLiteDatabaseClient.prototype, "dialect", {
  value: "sqlite",
});
class DuckDBClient {
  constructor(e) {
    Object.defineProperties(this, { _db: { value: e } });
  }
  async queryStream(e, t) {
    const n = await this._db.connect();
    let r, o;
    try {
      if (t?.length > 0) {
        const o = await n.prepare(e);
        r = await o.send(...t);
      } else r = await n.send(e);
      if (((o = await r.next()), o.done))
        throw new Error("missing first batch");
    } catch (e) {
      throw (await n.close(), e);
    }
    return {
      schema: ((a = o.value), a.schema.fields.map(_t)),
      async *readRows() {
        try {
          for (; !o.done; ) yield o.value.toArray(), (o = await r.next());
        } finally {
          await n.close();
        }
      },
    };
    var a;
  }
  async query(e, t) {
    const n = await this.queryStream(e, t),
      r = [];
    for await (const e of n.readRows()) for (const t of e) r.push(t);
    return (r.schema = n.schema), r;
  }
  async queryRow(e, t) {
    const n = (await this.queryStream(e, t)).readRows();
    try {
      const { done: e, value: t } = await n.next();
      return e || !t.length ? null : t[0];
    } finally {
      await n.return();
    }
  }
  async sql(e, ...t) {
    return await this.query(e.join("?"), t);
  }
  queryTag(e, ...t) {
    return [e.join("?"), t];
  }
  escape(e) {
    return `"${e}"`;
  }
  async describeTables() {
    return (await this.query("SHOW TABLES")).map(({ name: e }) => ({
      name: e,
    }));
  }
  async describeColumns({ table: e } = {}) {
    return (await this.query(`DESCRIBE ${this.escape(e)}`)).map(
      ({ column_name: e, column_type: t, null: n }) => ({
        name: e,
        type: At(t),
        nullable: "NO" !== n,
        databaseType: t,
      })
    );
  }
  static async of(e = {}, t = {}) {
    const n = await (async function () {
      void 0 === ut &&
        (ut = (async function () {
          const e = await import(`${lt}${Ve.resolve()}`),
            t = await e.selectBundle({
              mvp: {
                mainModule: `${lt}${Ve.resolve("dist/duckdb-mvp.wasm")}`,
                mainWorker: `${lt}${Ve.resolve(
                  "dist/duckdb-browser-mvp.worker.js"
                )}`,
              },
              eh: {
                mainModule: `${lt}${Ve.resolve("dist/duckdb-eh.wasm")}`,
                mainWorker: `${lt}${Ve.resolve(
                  "dist/duckdb-browser-eh.worker.js"
                )}`,
              },
            }),
            n = new e.ConsoleLogger();
          return { module: e, bundle: t, logger: n };
        })());
      const { module: e, bundle: t, logger: n } = await ut,
        r = await e.createWorker(t.mainWorker),
        o = new e.AsyncDuckDB(n, r);
      return await o.instantiate(t.mainModule), o;
    })();
    return (
      void 0 === t.query?.castTimestampToDate &&
        (t = { ...t, query: { ...t.query, castTimestampToDate: !0 } }),
      void 0 === t.query?.castBigIntToDouble &&
        (t = { ...t, query: { ...t.query, castBigIntToDouble: !0 } }),
      await n.open(t),
      await Promise.all(
        Object.entries(e).map(async ([e, t]) => {
          if (t instanceof FileAttachment) await Nt(n, e, t);
          else if (gt(t)) await xt(n, e, t);
          else if (Array.isArray(t)) await Tt(n, e, t);
          else if (yt(t))
            await (async function (e, t, n) {
              const r = (await Ct()).tableFromIPC(n.toArrowBuffer());
              return await xt(e, t, r);
            })(n, e, t);
          else if ("data" in t) {
            const { data: r, ...o } = t;
            gt(r) ? await xt(n, e, r, o) : await Tt(n, e, r, o);
          } else {
            if (!("file" in t)) throw new Error(`invalid source: ${t}`);
            {
              const { file: r, ...o } = t;
              await Nt(n, e, r, o);
            }
          }
        })
      ),
      new DuckDBClient(n)
    );
  }
}
async function Nt(e, t, n, r) {
  const o = await n.url();
  if (o.startsWith("blob:")) {
    const t = await n.arrayBuffer();
    await e.registerFileBuffer(n.name, new Uint8Array(t));
  } else await e.registerFileURL(n.name, o, 4);
  const a = await e.connect();
  try {
    switch (n.mimeType) {
      case "text/csv":
      case "text/tab-separated-values":
        return await a
          .insertCSVFromPath(n.name, { name: t, schema: "main", ...r })
          .catch(async (e) => {
            if (e.toString().includes("Could not convert"))
              return await (async function (e, t, n) {
                const r = await e.prepare(
                  `CREATE TABLE '${n}' AS SELECT * FROM read_csv_auto(?, ALL_VARCHAR=TRUE)`
                );
                return await r.send(t.name);
              })(a, n, t);
            throw e;
          });
      case "application/json":
        return await a.insertJSONFromPath(n.name, {
          name: t,
          schema: "main",
          ...r,
        });
      default:
        if (/\.arrow$/i.test(n.name)) {
          const e = new Uint8Array(await n.arrayBuffer());
          return await a.insertArrowFromIPCStream(e, {
            name: t,
            schema: "main",
            ...r,
          });
        }
        if (/\.parquet$/i.test(n.name))
          return await a.query(
            `CREATE VIEW '${t}' AS SELECT * FROM parquet_scan('${n.name}')`
          );
        throw new Error(`unknown file type: ${n.mimeType}`);
    }
  } finally {
    await a.close();
  }
}
async function xt(e, t, n, r) {
  const o = await e.connect();
  try {
    await o.insertArrowTable(n, { name: t, schema: "main", ...r });
  } finally {
    await o.close();
  }
}
async function Tt(e, t, n, r) {
  const o = (await Ct()).tableFromJSON(n);
  return await xt(e, t, o, r);
}
function At(e) {
  switch (e) {
    case "BIGINT":
    case "HUGEINT":
    case "UBIGINT":
      return "bigint";
    case "DOUBLE":
    case "REAL":
    case "FLOAT":
      return "number";
    case "INTEGER":
    case "SMALLINT":
    case "TINYINT":
    case "USMALLINT":
    case "UINTEGER":
    case "UTINYINT":
      return "integer";
    case "BOOLEAN":
      return "boolean";
    case "DATE":
    case "TIMESTAMP":
    case "TIMESTAMP WITH TIME ZONE":
      return "date";
    case "VARCHAR":
    case "UUID":
      return "string";
    default:
      return /^DECIMAL\(/.test(e) ? "integer" : "other";
  }
}
Object.defineProperty(DuckDBClient.prototype, "dialect", { value: "duckdb" });
function jt(e) {
  return (
    (Array.isArray(e) &&
      ($t(e.schema) ||
        St(e.columns) ||
        (function (e) {
          const t = Math.min(20, e.length);
          for (let n = 0; n < t; ++n) {
            const t = e[n];
            if (null === t || "object" != typeof t) return !1;
          }
          return (
            t > 0 &&
            (function (e) {
              for (const t in e) return !0;
              return !1;
            })(e[0])
          );
        })(e) ||
        Lt(e) ||
        kt(e))) ||
    Mt(e)
  );
}
function $t(e) {
  return Array.isArray(e) && e.every(qt);
}
function St(e) {
  return Array.isArray(e) && e.every((e) => "string" == typeof e);
}
function qt(e) {
  return e && "string" == typeof e.name && "string" == typeof e.type;
}
function Ot(e) {
  return Mt(e) || Lt(e) || kt(e);
}
function Lt(e) {
  const t = Math.min(20, e.length);
  if (!(t > 0)) return !1;
  let n,
    r = !1;
  for (let o = 0; o < t; ++o) {
    const t = e[o];
    if (null == t) continue;
    const a = typeof t;
    if (void 0 === n)
      switch (a) {
        case "number":
        case "boolean":
        case "string":
        case "bigint":
          n = a;
          break;
        default:
          return !1;
      }
    else if (a !== n) return !1;
    r = !0;
  }
  return r;
}
function kt(e) {
  const t = Math.min(20, e.length);
  if (!(t > 0)) return !1;
  let n = !1;
  for (let r = 0; r < t; ++r) {
    const t = e[r];
    if (null != t) {
      if (!(t instanceof Date)) return !1;
      n = !0;
    }
  }
  return n;
}
function Mt(e) {
  return (
    e instanceof Int8Array ||
    e instanceof Int16Array ||
    e instanceof Int32Array ||
    e instanceof Uint8Array ||
    e instanceof Uint8ClampedArray ||
    e instanceof Uint16Array ||
    e instanceof Uint32Array ||
    e instanceof Float32Array ||
    e instanceof Float64Array
  );
}
const It = Object.assign(
  async (e, t, n, r) => {
    if (
      ((e = await Rt(await e, r)),
      (o = e) &&
        ("function" == typeof o.sql ||
          ("function" == typeof o.queryTag &&
            ("function" == typeof o.query ||
              "function" == typeof o.queryStream))) &&
        ("table" !== a || "function" == typeof o.describeColumns) &&
        o !== It)
    )
      return Ft(
        e,
        (function (e, t) {
          const n = "function" == typeof t.escape ? t.escape : (e) => e,
            { select: r, from: o, filter: a, sort: i, slice: s } = e;
          if (!o.table) throw new Error("missing from table");
          if (r.columns && 0 === r.columns.length)
            throw new Error("at least one column must be selected");
          const c = new Map(e.names?.map(({ column: e, name: t }) => [e, t])),
            l = [
              [
                `SELECT ${
                  r.columns
                    ? r.columns
                        .map((e) => {
                          const t = c.get(e);
                          return t ? `${n(e)} AS ${n(t)}` : n(e);
                        })
                        .join(", ")
                    : "*"
                } FROM ${Bt(o.table, n)}`,
              ],
            ];
          for (let e = 0; e < a.length; ++e)
            zt(e ? "\nAND " : "\nWHERE ", l), Ht(a[e], l, n);
          for (let e = 0; e < i.length; ++e)
            zt(e ? ", " : "\nORDER BY ", l), Wt(i[e], l, n);
          if ("mssql" === t.dialect || "oracle" === t.dialect) {
            if (null !== s.to || null !== s.from) {
              if (!i.length) {
                if (!r.columns)
                  throw new Error(
                    "at least one column must be explicitly specified. Received '*'."
                  );
                zt("\nORDER BY ", l),
                  Wt({ column: r.columns[0], direction: "ASC" }, l, n);
              }
              zt(`\nOFFSET ${s.from || 0} ROWS`, l),
                zt(
                  `\nFETCH NEXT ${
                    null !== s.to ? s.to - (s.from || 0) : 1e9
                  } ROWS ONLY`,
                  l
                );
            }
          } else
            (null === s.to && null === s.from) ||
              zt("\nLIMIT " + (null !== s.to ? s.to - (s.from || 0) : 1e9), l),
              null !== s.from && zt(` OFFSET ${s.from}`, l);
          return l;
        })(t, e),
        n
      );
    var o, a;
    if (jt(e))
      return (function (e, t) {
        const n = new Map(),
          r = e,
          o = un(e, t);
        e = o.source;
        let a = o.schema;
        if (t.derive) {
          const r = [];
          t.derive.map(({ name: o, value: a }) => {
            let i = [];
            fn(e, t).map((e, t) => {
              let n;
              try {
                n = a(e);
              } catch (e) {
                i.push({ index: t, error: e }), (n = void 0);
              }
              r[t] ? (r[t] = { ...r[t], [o]: n }) : r.push({ [o]: n });
            }),
              i.length && n.set(o, i);
          });
          const o = un(r, t);
          (e = e.map((e, t) => ({ ...e, ...o.source[t] }))),
            (a = [...a, ...o.schema]);
        }
        for (const { type: n, operands: r } of t.filter) {
          const [{ value: t }] = r,
            o = r.slice(1).map(({ value: e }) => e);
          switch (n) {
            case "v": {
              const [n] = o,
                r = sn(n);
              e = e.filter((e) => r(e[t]));
              break;
            }
            case "nv": {
              const [n] = o,
                r = sn(n);
              e = e.filter((e) => !r(e[t]));
              break;
            }
            case "eq": {
              const [n] = o;
              if (n instanceof Date) {
                const r = +n;
                e = e.filter((e) => +e[t] === r);
              } else e = e.filter((e) => e[t] === n);
              break;
            }
            case "ne": {
              const [n] = o;
              e = e.filter((e) => e[t] !== n);
              break;
            }
            case "c": {
              const [n] = o;
              e = e.filter((e) => "string" == typeof e[t] && e[t].includes(n));
              break;
            }
            case "nc": {
              const [n] = o;
              e = e.filter((e) => "string" == typeof e[t] && !e[t].includes(n));
              break;
            }
            case "in": {
              const n = new Set(o);
              e = e.filter((e) => n.has(e[t]));
              break;
            }
            case "nin": {
              const n = new Set(o);
              e = e.filter((e) => !n.has(e[t]));
              break;
            }
            case "n":
              e = e.filter((e) => null == e[t]);
              break;
            case "nn":
              e = e.filter((e) => null != e[t]);
              break;
            case "lt": {
              const [n] = o;
              e = e.filter((e) => e[t] < n);
              break;
            }
            case "lte": {
              const [n] = o;
              e = e.filter((e) => e[t] <= n);
              break;
            }
            case "gt": {
              const [n] = o;
              e = e.filter((e) => e[t] > n);
              break;
            }
            case "gte": {
              const [n] = o;
              e = e.filter((e) => e[t] >= n);
              break;
            }
            default:
              throw new Error(`unknown filter type: ${n}`);
          }
        }
        for (const { column: n, direction: o } of (function (e) {
          if ("function" != typeof e[Symbol.iterator])
            throw new TypeError("values is not iterable");
          return Array.from(e).reverse();
        })(t.sort)) {
          const t = "desc" === o ? Zt : Yt;
          e === r && (e = e.slice()), e.sort((e, r) => t(e[n], r[n]));
        }
        let { from: i, to: s } = t.slice;
        (i = null == i ? 0 : Math.max(0, i)),
          (s = null == s ? 1 / 0 : Math.max(0, s)),
          (i > 0 || s < 1 / 0) && (e = e.slice(Math.max(0, i), Math.max(0, s)));
        let c = a.slice();
        if (t.select.columns) {
          if (a) {
            const e = new Map(a.map((e) => [e.name, e]));
            a = t.select.columns.map((t) => e.get(t));
          }
          e = e.map((e) =>
            Object.fromEntries(t.select.columns.map((t) => [t, e[t]]))
          );
        }
        if (t.names) {
          const n = new Map(t.names.map((e) => [e.column, e]));
          a &&
            (a = a.map((e) => {
              const t = n.get(e.name);
              return { ...e, ...(t ? { name: t.name } : null) };
            })),
            c &&
              (c = c.map((e) => {
                const t = n.get(e.name);
                return { ...e, ...(t ? { name: t.name } : null) };
              })),
            (e = fn(e, t));
        }
        e !== r && a && (e.schema = a);
        return (e.fullSchema = c), (e.errors = n), e;
      })(e, t);
    if (!e) throw new Error("missing data source");
    throw new Error("invalid data source");
  },
  {
    sql: (e, t, n) =>
      async function () {
        return Ft(await Ut(await e, n), arguments, t);
      },
  }
);
function Pt(e) {
  const t = new WeakMap();
  return (n, r) => {
    if (!n) throw new Error("data source not found");
    let o = t.get(n);
    return (
      (!o || (jt(n) && n.length !== o._numRows)) &&
        ((o = e(n, r)), (o._numRows = n.length), t.set(n, o)),
      o
    );
  };
}
const Rt = Pt(async (e, t) => {
    if (e instanceof FileAttachment) {
      switch (e.mimeType) {
        case "text/csv":
          return e.csv();
        case "text/tab-separated-values":
          return e.tsv();
        case "application/json":
          return e.json();
        case "application/x-sqlite3":
          return e.sqlite();
      }
      if (/\.(arrow|parquet)$/i.test(e.name)) return Dt(e, t);
      throw new Error(`unsupported file type: ${e.mimeType}`);
    }
    return gt(e) || yt(e)
      ? Dt(e, t)
      : jt(e) && Ot(e)
      ? Array.from(e, (e) => ({ value: e }))
      : e;
  }),
  Ut = Pt(async (e, t) => {
    if (e instanceof FileAttachment) {
      switch (e.mimeType) {
        case "text/csv":
        case "text/tab-separated-values":
        case "application/json":
          return Dt(e, t);
        case "application/x-sqlite3":
          return e.sqlite();
      }
      if (/\.(arrow|parquet)$/i.test(e.name)) return Dt(e, t);
      throw new Error(`unsupported file type: ${e.mimeType}`);
    }
    return jt(e)
      ? Dt(
          await (async function (e, t) {
            const n = await Ct();
            return Ot(e) ? n.tableFromArrays({ [t]: e }) : n.tableFromJSON(e);
          })(e, t),
          t
        )
      : gt(e) || yt(e)
      ? Dt(e, t)
      : e;
  });
function Dt(
  e,
  t = e instanceof FileAttachment
    ? (function (e) {
        return e.name.replace(/@\d+(?=\.|$)/, "").replace(/\.\w+$/, "");
      })(e)
    : "__table"
) {
  return DuckDBClient.of({ [t]: e });
}
async function Ft(e, t, n) {
  if (!e) throw new Error("missing data source");
  if ("function" == typeof e.queryTag) {
    const r = new AbortController(),
      o = { signal: r.signal };
    if (
      (n.then(() => r.abort("invalidated")), "function" == typeof e.queryStream)
    )
      return (async function* (e) {
        let t = performance.now();
        const n = await e,
          r = [];
        (r.done = !1), (r.error = null), (r.schema = n.schema);
        try {
          for await (const e of n.readRows()) {
            performance.now() - t > 150 &&
              r.length > 0 &&
              (yield r, (t = performance.now()));
            for (const t of e) r.push(t);
          }
          (r.done = !0), yield r;
        } catch (e) {
          (r.error = e), yield r;
        }
      })(e.queryStream(...e.queryTag.apply(e, t), o));
    if ("function" == typeof e.query)
      return e.query(...e.queryTag.apply(e, t), o);
  }
  if ("function" == typeof e.sql) return e.sql.apply(e, t);
  throw new Error("source does not implement query, queryStream, or sql");
}
function Bt(e, t) {
  if ("object" == typeof e) {
    let n = "";
    return (
      null != e.database && (n += t(e.database) + "."),
      null != e.schema && (n += t(e.schema) + "."),
      (n += t(e.table)),
      n
    );
  }
  return t(e);
}
function zt(e, t) {
  const n = t[0];
  n[n.length - 1] += e;
}
function Wt({ column: e, direction: t }, n, r) {
  zt(`${r(e)} ${t.toUpperCase()}`, n);
}
function Ht({ type: e, operands: t }, n, r) {
  if (t.length < 1) throw new Error("Invalid operand length");
  if (1 === t.length || "v" === e || "nv" === e)
    switch ((Vt(t[0], n, r), e)) {
      case "n":
      case "nv":
        return void zt(" IS NULL", n);
      case "nn":
      case "v":
        return void zt(" IS NOT NULL", n);
      default:
        throw new Error("Invalid filter operation");
    }
  if (2 !== t.length || ["in", "nin"].includes(e)) {
    var o;
    switch ((Vt(t[0], n, r), e)) {
      case "in":
        zt(" IN (", n);
        break;
      case "nin":
        zt(" NOT IN (", n);
        break;
      default:
        throw new Error("Invalid filter operation");
    }
    !(function (e, t) {
      let n = !0;
      for (const r of e)
        n ? (n = !1) : zt(",", t), t.push(r.value), t[0].push("");
    })(t.slice(1), n),
      zt(")", n);
  } else {
    if (["c", "nc"].includes(e)) {
      switch ((Vt(t[0], n, r), e)) {
        case "c":
          zt(" LIKE ", n);
          break;
        case "nc":
          zt(" NOT LIKE ", n);
      }
      return void Vt(((o = t[1]), { ...o, value: `%${o.value}%` }), n, r);
    }
    switch ((Vt(t[0], n, r), e)) {
      case "eq":
        zt(" = ", n);
        break;
      case "ne":
        zt(" <> ", n);
        break;
      case "gt":
        zt(" > ", n);
        break;
      case "lt":
        zt(" < ", n);
        break;
      case "gte":
        zt(" >= ", n);
        break;
      case "lte":
        zt(" <= ", n);
        break;
      default:
        throw new Error("Invalid filter operation");
    }
    Vt(t[1], n, r);
  }
}
function Vt(e, t, n) {
  "column" === e.type ? zt(n(e.value), t) : (t.push(e.value), t[0].push(""));
}
function Gt(e, t) {
  return (null == e || !(e >= e)) - (null == t || !(t >= t));
}
function Yt(e, t) {
  return Gt(e, t) || (e < t ? -1 : e > t ? 1 : 0);
}
function Zt(e, t) {
  return Gt(e, t) || (e > t ? -1 : e < t ? 1 : 0);
}
const Jt = (e) => "number" == typeof e && !Number.isNaN(e),
  Kt = (e) => Number.isInteger(e) && !Number.isNaN(e),
  Xt = (e) => "string" == typeof e,
  Qt = (e) => "boolean" == typeof e,
  en = (e) => "bigint" == typeof e,
  tn = (e) => e instanceof Date && !isNaN(e),
  nn = (e) => e instanceof ArrayBuffer,
  rn = (e) => Array.isArray(e),
  on = (e) => "object" == typeof e && null !== e,
  an = (e) => null != e;
function sn(e) {
  switch (e) {
    case "string":
      return Xt;
    case "bigint":
      return en;
    case "boolean":
      return Qt;
    case "number":
      return Jt;
    case "integer":
      return Kt;
    case "date":
      return tn;
    case "buffer":
      return nn;
    case "array":
      return rn;
    case "object":
      return on;
    default:
      return an;
  }
}
const cn =
  /^(([-+]\d{2})?\d{4}(-\d{2}(-\d{2}))|(\d{1,2})\/(\d{1,2})\/(\d{2,4}))([T ]\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/;
function ln(e, t) {
  switch (t) {
    case "string":
      return "string" == typeof e || null == e ? e : String(e);
    case "boolean":
      if ("string" == typeof e) {
        const t = e.trim().toLowerCase();
        return "true" === t || ("false" !== t && null);
      }
      return "boolean" == typeof e || null == e ? e : Boolean(e);
    case "bigint":
      return "bigint" == typeof e || null == e
        ? e
        : Number.isInteger("string" != typeof e || e.trim() ? +e : NaN)
        ? BigInt(e)
        : void 0;
    case "integer":
    case "number":
      return "number" == typeof e
        ? e
        : null == e || ("string" == typeof e && !e.trim())
        ? NaN
        : Number(e);
    case "date": {
      if (e instanceof Date || null == e) return e;
      if ("number" == typeof e) return new Date(e);
      const t = String(e).trim();
      return "string" != typeof e || t ? new Date(cn.test(t) ? t : NaN) : null;
    }
    case "array":
    case "object":
    case "buffer":
    case "other":
      return e;
    default:
      throw new Error(`Unable to coerce to type: ${t}`);
  }
}
function un(e, t) {
  const n = e;
  let { schema: r, inferred: o } = (function (e) {
    const { columns: t } = e;
    let { schema: n } = e;
    return $t(n)
      ? { schema: n, inferred: !1 }
      : ((n = mn(e, St(t) ? t : void 0)), { schema: n, inferred: !0 });
  })(e);
  const a = new Map(r.map(({ name: e, type: t }) => [e, t]));
  if (t.types) {
    for (const { name: e, type: o } of t.types) {
      a.set(e, o), r === n.schema && (r = r.slice());
      const t = r.findIndex((t) => t.name === e);
      t > -1 && (r[t] = { ...r[t], type: o });
    }
    e = e.map((e) => dn(e, a, r));
  } else o && (e = e.map((e) => dn(e, a, r)));
  return { source: e, schema: r };
}
function fn(e, t) {
  if (!t.names) return e;
  const n = new Map(t.names.map((e) => [e.column, e]));
  return e.map((e) =>
    Object.fromEntries(Object.keys(e).map((t) => [n.get(t)?.name ?? t, e[t]]))
  );
}
function dn(e, t, n) {
  const r = {};
  for (const o of n) {
    const n = t.get(o.name),
      a = e[o.name];
    r[o.name] = "raw" === n ? a : ln(a, n);
  }
  return r;
}
const pn = [
  "boolean",
  "integer",
  "number",
  "date",
  "bigint",
  "array",
  "object",
  "buffer",
];
function mn(
  e,
  t = (function (e) {
    const t = new Set();
    for (const n of e)
      if (n)
        for (const e in n)
          Object.prototype.hasOwnProperty.call(n, e) && t.add(e);
    return Array.from(t);
  })(e)
) {
  const n = [],
    r = e.slice(0, 100);
  for (const e of t) {
    const t = {
      boolean: 0,
      integer: 0,
      number: 0,
      date: 0,
      string: 0,
      array: 0,
      object: 0,
      bigint: 0,
      buffer: 0,
      defined: 0,
    };
    for (const n of r) {
      let r = n[e];
      if (null == r) continue;
      const o = typeof r;
      if ("string" !== o)
        ++t.defined,
          Array.isArray(r)
            ? ++t.array
            : r instanceof Date
            ? ++t.date
            : r instanceof ArrayBuffer
            ? ++t.buffer
            : "number" === o
            ? (++t.number, Number.isInteger(r) && ++t.integer)
            : o in t && ++t[o];
      else {
        if (((r = r.trim()), !r)) continue;
        ++t.defined,
          ++t.string,
          /^(true|false)$/i.test(r)
            ? ++t.boolean
            : r && !isNaN(r)
            ? (++t.number, Number.isInteger(+r) && ++t.integer)
            : cn.test(r) && ++t.date;
      }
    }
    const o = Math.max(1, 0.9 * t.defined),
      a =
        vt(pn, (e) => (t[e] >= o ? t[e] : NaN)) ??
        (t.string >= o ? "string" : "other");
    n.push({ name: e, type: a, inferred: a });
  }
  return n;
}
class Workbook {
  constructor(e) {
    Object.defineProperties(this, {
      _: { value: e },
      sheetNames: { value: e.worksheets.map((e) => e.name), enumerable: !0 },
    });
  }
  sheet(e, t) {
    const n =
      "number" == typeof e
        ? this.sheetNames[e]
        : this.sheetNames.includes((e += ""))
        ? e
        : null;
    if (null == n) throw new Error(`Sheet not found: ${e}`);
    return (function (e, { range: t, headers: n } = {}) {
      let [[r, o], [a, i]] = (function (
        e = ":",
        { columnCount: t, rowCount: n }
      ) {
        if (!(e += "").match(/^[A-Z]*\d*:[A-Z]*\d*$/))
          throw new Error("Malformed range specifier");
        const [[r = 0, o = 0], [a = t - 1, i = n - 1]] = e.split(":").map(vn);
        return [
          [r, o],
          [a, i],
        ];
      })(t, e);
      const s = n ? e._rows[o++] : null;
      let c = new Set(["#"]);
      for (let e = r; e <= a; e++) {
        const t = s ? hn(s.findCell(e + 1)) : null;
        let n = (t && t + "") || wn(e);
        for (; c.has(n); ) n += "_";
        c.add(n);
      }
      c = new Array(r).concat(Array.from(c));
      const l = new Array(i - o + 1);
      for (let t = o; t <= i; t++) {
        const n = (l[t - o] = Object.create(null, { "#": { value: t + 1 } })),
          i = e.getRow(t + 1);
        if (i.hasValues)
          for (let e = r; e <= a; e++) {
            const t = hn(i.findCell(e + 1));
            null != t && (n[c[e + 1]] = t);
          }
      }
      return (l.columns = c.filter(() => !0)), l;
    })(this._.getWorksheet(n), t);
  }
}
function hn(e) {
  if (!e) return;
  const { value: t } = e;
  if (t && "object" == typeof t && !(t instanceof Date)) {
    if (t.formula || t.sharedFormula)
      return t.result && t.result.error ? NaN : t.result;
    if (t.richText) return bn(t);
    if (t.text) {
      let { text: e } = t;
      return (
        e.richText && (e = bn(e)),
        t.hyperlink && t.hyperlink !== e ? `${t.hyperlink} ${e}` : e
      );
    }
    return t;
  }
  return t;
}
function bn(e) {
  return e.richText.map((e) => e.text).join("");
}
function wn(e) {
  let t = "";
  e++;
  do {
    t = String.fromCharCode(64 + (e % 26 || 26)) + t;
  } while ((e = Math.floor((e - 1) / 26)));
  return t;
}
function vn(e) {
  const [, t, n] = e.match(/^([A-Z]*)(\d*)$/);
  let r = 0;
  if (t)
    for (let e = 0; e < t.length; e++)
      r += Math.pow(26, t.length - e - 1) * (t.charCodeAt(e) - 64);
  return [r ? r - 1 : void 0, n ? +n - 1 : void 0];
}
async function yn(e) {
  const t = await fetch(await e.url());
  if (!t.ok) throw new Error(`Unable to load file: ${e.name}`);
  return t;
}
async function gn(e, t, { array: n = !1, typed: r = !1 } = {}) {
  const o = await e.text(),
    a = "\t" === t ? (n ? ge : ye) : n ? we : be;
  if ("auto" === r && !n) {
    const e = a(o);
    return (function (e, t) {
      const n = new Map(t.map(({ name: e, type: t }) => [e, t]));
      return Object.assign(
        e.map((e) => dn(e, n, t)),
        { schema: t }
      );
    })(e, mn(e, e.columns));
  }
  return a(o, r && _e);
}
class _n {
  constructor(e, t) {
    Object.defineProperty(this, "name", { value: e, enumerable: !0 }),
      void 0 !== t &&
        Object.defineProperty(this, "mimeType", {
          value: t + "",
          enumerable: !0,
        });
  }
  async blob() {
    return (await yn(this)).blob();
  }
  async arrayBuffer() {
    return (await yn(this)).arrayBuffer();
  }
  async text() {
    return (await yn(this)).text();
  }
  async json() {
    return (await yn(this)).json();
  }
  async stream() {
    return (await yn(this)).body;
  }
  async csv(e) {
    return gn(this, ",", e);
  }
  async tsv(e) {
    return gn(this, "\t", e);
  }
  async image(e) {
    const t = await this.url();
    return new Promise((n, r) => {
      const o = new Image();
      new URL(t, document.baseURI).origin !== new URL(location).origin &&
        (o.crossOrigin = "anonymous"),
        Object.assign(o, e),
        (o.onload = () => n(o)),
        (o.onerror = () => r(new Error(`Unable to load file: ${this.name}`))),
        (o.src = t);
    });
  }
  async arrow({ version: e = 4 } = {}) {
    switch (e) {
      case 4: {
        const [e, t] = await Promise.all([ft(Re.resolve()), yn(this)]);
        return e.Table.from(t);
      }
      case 9: {
        const [e, t] = await Promise.all([
          import(`${lt}${Ue.resolve()}`),
          yn(this),
        ]);
        return e.tableFromIPC(t);
      }
      case 11: {
        const [e, t] = await Promise.all([
          import(`${lt}${De.resolve()}`),
          yn(this),
        ]);
        return e.tableFromIPC(t);
      }
      default:
        throw new Error(`unsupported arrow version: ${e}`);
    }
  }
  async sqlite() {
    return SQLiteDatabaseClient.open(yn(this));
  }
  async zip() {
    const [e, t] = await Promise.all([ft(Oe.resolve()), this.arrayBuffer()]);
    return new ZipArchive(await e.loadAsync(t));
  }
  async xml(e = "application/xml") {
    return new DOMParser().parseFromString(await this.text(), e);
  }
  async html() {
    return this.xml("text/html");
  }
  async xlsx() {
    const [e, t] = await Promise.all([ft(ze.resolve()), this.arrayBuffer()]);
    return new Workbook(await new e.Workbook().xlsx.load(t));
  }
}
class FileAttachment extends _n {
  constructor(e, t, n) {
    super(t, n), Object.defineProperty(this, "_url", { value: e });
  }
  async url() {
    return (await this._url) + "";
  }
}
function En(e) {
  throw new Error(`File not found: ${e}`);
}
class ZipArchive {
  constructor(e) {
    Object.defineProperty(this, "_", { value: e }),
      (this.filenames = Object.keys(e.files).filter((t) => !e.files[t].dir));
  }
  file(e) {
    const t = this._.file((e += ""));
    if (!t || t.dir) throw new Error(`file not found: ${e}`);
    return new ZipArchiveEntry(t);
  }
}
class ZipArchiveEntry extends _n {
  constructor(e) {
    super(e.name),
      Object.defineProperty(this, "_", { value: e }),
      Object.defineProperty(this, "_url", { writable: !0 });
  }
  async url() {
    return this._url || (this._url = this.blob().then(URL.createObjectURL));
  }
  async blob() {
    return this._.async("blob");
  }
  async arrayBuffer() {
    return this._.async("arraybuffer");
  }
  async text() {
    return this._.async("text");
  }
  async json() {
    return JSON.parse(await this.text());
  }
}
var Cn = {
  math: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
var Nn = 0;
function xn(e) {
  return new Tn("O-" + (null == e ? "" : e + "-") + ++Nn);
}
function Tn(e) {
  (this.id = e), (this.href = new URL(`#${e}`, location) + "");
}
Tn.prototype.toString = function () {
  return "url(" + this.href + ")";
};
var An = Object.freeze({
  __proto__: null,
  canvas: function (e, t) {
    var n = document.createElement("canvas");
    return (n.width = e), (n.height = t), n;
  },
  context2d: function (e, t, n) {
    null == n && (n = devicePixelRatio);
    var r = document.createElement("canvas");
    (r.width = e * n), (r.height = t * n), (r.style.width = e + "px");
    var o = r.getContext("2d");
    return o.scale(n, n), o;
  },
  download: function (e, t = "untitled", n = "Save") {
    const r = document.createElement("a"),
      o = r.appendChild(document.createElement("button"));
    async function a() {
      await new Promise(requestAnimationFrame),
        URL.revokeObjectURL(r.href),
        r.removeAttribute("href"),
        (o.textContent = n),
        (o.disabled = !1);
    }
    return (
      (o.textContent = n),
      (r.download = t),
      (r.onclick = async (t) => {
        if (((o.disabled = !0), r.href)) return a();
        o.textContent = "Saving…";
        try {
          const t = await ("function" == typeof e ? e() : e);
          (o.textContent = "Download"), (r.href = URL.createObjectURL(t));
        } catch (e) {
          o.textContent = n;
        }
        if (t.eventPhase) return a();
        o.disabled = !1;
      }),
      r
    );
  },
  element: function (e, t) {
    var n,
      r = (e += ""),
      o = r.indexOf(":");
    o >= 0 && "xmlns" !== (r = e.slice(0, o)) && (e = e.slice(o + 1));
    var a = Cn.hasOwnProperty(r)
      ? document.createElementNS(Cn[r], e)
      : document.createElement(e);
    if (t)
      for (var i in t)
        (o = (r = i).indexOf(":")),
          (n = t[i]),
          o >= 0 && "xmlns" !== (r = i.slice(0, o)) && (i = i.slice(o + 1)),
          Cn.hasOwnProperty(r)
            ? a.setAttributeNS(Cn[r], i, n)
            : a.setAttribute(i, n);
    return a;
  },
  input: function (e) {
    var t = document.createElement("input");
    return null != e && (t.type = e), t;
  },
  range: function (e, t, n) {
    1 === arguments.length && ((t = e), (e = null));
    var r = document.createElement("input");
    return (
      (r.min = e = null == e ? 0 : +e),
      (r.max = t = null == t ? 1 : +t),
      (r.step = null == n ? "any" : (n = +n)),
      (r.type = "range"),
      r
    );
  },
  select: function (e) {
    var t = document.createElement("select");
    return (
      Array.prototype.forEach.call(e, function (e) {
        var n = document.createElement("option");
        (n.value = n.textContent = e), t.appendChild(n);
      }),
      t
    );
  },
  svg: function (e, t) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    return (
      n.setAttribute("viewBox", [0, 0, e, t]),
      n.setAttribute("width", e),
      n.setAttribute("height", t),
      n
    );
  },
  text: function (e) {
    return document.createTextNode(e);
  },
  uid: xn,
});
var jn = Object.freeze({
  __proto__: null,
  buffer: function (e) {
    return new Promise(function (t, n) {
      var r = new FileReader();
      (r.onload = function () {
        t(r.result);
      }),
        (r.onerror = n),
        r.readAsArrayBuffer(e);
    });
  },
  text: function (e) {
    return new Promise(function (t, n) {
      var r = new FileReader();
      (r.onload = function () {
        t(r.result);
      }),
        (r.onerror = n),
        r.readAsText(e);
    });
  },
  url: function (e) {
    return new Promise(function (t, n) {
      var r = new FileReader();
      (r.onload = function () {
        t(r.result);
      }),
        (r.onerror = n),
        r.readAsDataURL(e);
    });
  },
});
function $n() {
  return this;
}
function Sn(e, t) {
  let n = !1;
  if ("function" != typeof t) throw new Error("dispose is not a function");
  return {
    [Symbol.iterator]: $n,
    next: () => (n ? { done: !0 } : ((n = !0), { done: !1, value: e })),
    return: () => ((n = !0), t(e), { done: !0 }),
    throw: () => ({ done: (n = !0) }),
  };
}
function qn(e) {
  let t,
    n,
    r = !1;
  const o = e(function (e) {
    n ? (n(e), (n = null)) : (r = !0);
    return (t = e);
  });
  if (null != o && "function" != typeof o)
    throw new Error(
      "function" == typeof o.then
        ? "async initializers are not supported"
        : "initializer returned something, but not a dispose function"
    );
  return {
    [Symbol.iterator]: $n,
    throw: () => ({ done: !0 }),
    return: () => (null != o && o(), { done: !0 }),
    next: function () {
      return {
        done: !1,
        value: r ? ((r = !1), Promise.resolve(t)) : new Promise((e) => (n = e)),
      };
    },
  };
}
function On(e) {
  switch (e.type) {
    case "range":
    case "number":
      return e.valueAsNumber;
    case "date":
      return e.valueAsDate;
    case "checkbox":
      return e.checked;
    case "file":
      return e.multiple ? e.files : e.files[0];
    case "select-multiple":
      return Array.from(e.selectedOptions, (e) => e.value);
    default:
      return e.value;
  }
}
var Ln = Object.freeze({
  __proto__: null,
  disposable: Sn,
  filter: function* (e, t) {
    for (var n, r = -1; !(n = e.next()).done; )
      t(n.value, ++r) && (yield n.value);
  },
  input: function (e) {
    return qn(function (t) {
      var n = (function (e) {
          switch (e.type) {
            case "button":
            case "submit":
            case "checkbox":
              return "click";
            case "file":
              return "change";
            default:
              return "input";
          }
        })(e),
        r = On(e);
      function o() {
        t(On(e));
      }
      return (
        e.addEventListener(n, o),
        void 0 !== r && t(r),
        function () {
          e.removeEventListener(n, o);
        }
      );
    });
  },
  map: function* (e, t) {
    for (var n, r = -1; !(n = e.next()).done; ) yield t(n.value, ++r);
  },
  observe: qn,
  queue: function (e) {
    let t;
    const n = [],
      r = e(function (e) {
        n.push(e), t && (t(n.shift()), (t = null));
        return e;
      });
    if (null != r && "function" != typeof r)
      throw new Error(
        "function" == typeof r.then
          ? "async initializers are not supported"
          : "initializer returned something, but not a dispose function"
      );
    return {
      [Symbol.iterator]: $n,
      throw: () => ({ done: !0 }),
      return: () => (null != r && r(), { done: !0 }),
      next: function () {
        return {
          done: !1,
          value: n.length
            ? Promise.resolve(n.shift())
            : new Promise((e) => (t = e)),
        };
      },
    };
  },
  range: function* (e, t, n) {
    (e = +e),
      (t = +t),
      (n = (o = arguments.length) < 2 ? ((t = e), (e = 0), 1) : o < 3 ? 1 : +n);
    for (var r = -1, o = 0 | Math.max(0, Math.ceil((t - e) / n)); ++r < o; )
      yield e + r * n;
  },
  valueAt: function (e, t) {
    if (!(!isFinite((t = +t)) || t < 0 || (t != t) | 0))
      for (var n, r = -1; !(n = e.next()).done; ) if (++r === t) return n.value;
  },
  worker: function (e) {
    const t = URL.createObjectURL(new Blob([e], { type: "text/javascript" })),
      n = new Worker(t);
    return Sn(n, () => {
      n.terminate(), URL.revokeObjectURL(t);
    });
  },
});
function kn(e, t) {
  return function (n) {
    var r,
      o,
      a,
      i,
      s,
      c,
      l,
      u,
      f = n[0],
      d = [],
      p = null,
      m = -1;
    for (s = 1, c = arguments.length; s < c; ++s) {
      if ((r = arguments[s]) instanceof Node)
        (d[++m] = r), (f += "\x3c!--o:" + m + "--\x3e");
      else if (Array.isArray(r)) {
        for (l = 0, u = r.length; l < u; ++l)
          (o = r[l]) instanceof Node
            ? (null === p &&
                ((d[++m] = p = document.createDocumentFragment()),
                (f += "\x3c!--o:" + m + "--\x3e")),
              p.appendChild(o))
            : ((p = null), (f += o));
        p = null;
      } else f += r;
      f += n[s];
    }
    if (((p = e(f)), ++m > 0)) {
      for (
        a = new Array(m),
          i = document.createTreeWalker(p, NodeFilter.SHOW_COMMENT, null, !1);
        i.nextNode();

      )
        (o = i.currentNode),
          /^o:/.test(o.nodeValue) && (a[+o.nodeValue.slice(2)] = o);
      for (s = 0; s < m; ++s) (o = a[s]) && o.parentNode.replaceChild(d[s], o);
    }
    return 1 === p.childNodes.length
      ? p.removeChild(p.firstChild)
      : 11 === p.nodeType
      ? ((o = t()).appendChild(p), o)
      : p;
  };
}
const Mn = kn(
  function (e) {
    var t = document.createElement("template");
    return (t.innerHTML = e.trim()), document.importNode(t.content, !0);
  },
  function () {
    return document.createElement("span");
  }
);
function In(e) {
  let t;
  Object.defineProperties(this, {
    generator: {
      value: qn((e) => {
        t = e;
      }),
    },
    value: { get: () => e, set: (n) => t((e = n)) },
  }),
    void 0 !== e && t(e);
}
function* Pn() {
  for (;;) yield Date.now();
}
var Rn = new Map();
function Un(e, t) {
  var n;
  return (n = Rn.get((e = +e)))
    ? n.then(() => t)
    : (n = Date.now()) >= e
    ? Promise.resolve(t)
    : (function (e, t) {
        var n = new Promise(function (n) {
          Rn.delete(t);
          var r = t - e;
          if (!(r > 0)) throw new Error("invalid time");
          if (r > 2147483647) throw new Error("too long to wait");
          setTimeout(n, r);
        });
        return Rn.set(t, n), n;
      })(n, e).then(() => t);
}
var Dn = Object.freeze({
  __proto__: null,
  delay: function (e, t) {
    return new Promise(function (n) {
      setTimeout(function () {
        n(t);
      }, e);
    });
  },
  tick: function (e, t) {
    return Un(Math.ceil((Date.now() + 1) / e) * e, t);
  },
  when: Un,
});
function Fn(e, t) {
  if (/^(\w+:)|\/\//i.test(e)) return e;
  if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href;
  if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e))
    throw new Error("illegal name");
  return "https://unpkg.com/" + e;
}
const Bn = kn(
  function (e) {
    var t = document.createElementNS("http://www.w3.org/2000/svg", "g");
    return (t.innerHTML = e.trim()), t;
  },
  function () {
    return document.createElementNS("http://www.w3.org/2000/svg", "g");
  }
);
var zn = String.raw;
function Wn(e) {
  return new Promise(function (t, n) {
    var r = document.createElement("link");
    (r.rel = "stylesheet"),
      (r.href = e),
      (r.onerror = n),
      (r.onload = t),
      document.head.appendChild(r);
  });
}
function Hn() {
  return qn(function (e) {
    var t = e(document.body.clientWidth);
    function n() {
      var n = document.body.clientWidth;
      n !== t && e((t = n));
    }
    return (
      window.addEventListener("resize", n),
      function () {
        window.removeEventListener("resize", n);
      }
    );
  });
}
const Library = Object.assign(
  Object.defineProperties(
    function (e) {
      const t = (function (e) {
        return null == e ? ft : ot(e);
      })(e);
      var n;
      Object.defineProperties(
        this,
        ((n = {
          FileAttachment: () => En,
          Mutable: () => In,
          now: Pn,
          width: Hn,
          dot: () => t(Ae.resolve()),
          htl: () => t(qe.resolve()),
          html: () => Mn,
          md: () =>
            (function (e) {
              return e(Le.resolve()).then(function (t) {
                return kn(
                  function (n) {
                    var r = document.createElement("div");
                    r.innerHTML = t(n, { langPrefix: "" }).trim();
                    var o = r.querySelectorAll("pre code[class]");
                    return (
                      o.length > 0 &&
                        e(je.resolve()).then(function (t) {
                          o.forEach(function (n) {
                            function r() {
                              t.highlightBlock(n),
                                n.parentNode.classList.add(
                                  "observablehq--md-pre"
                                );
                            }
                            t.getLanguage(n.className)
                              ? r()
                              : e(je.resolve("async-languages/index.js"))
                                  .then((r) => {
                                    if (r.has(n.className))
                                      return e(
                                        je.resolve(
                                          "async-languages/" +
                                            r.get(n.className)
                                        )
                                      ).then((e) => {
                                        t.registerLanguage(n.className, e);
                                      });
                                  })
                                  .then(r, r);
                          });
                        }),
                      r
                    );
                  },
                  function () {
                    return document.createElement("div");
                  }
                );
              });
            })(t),
          svg: () => Bn,
          tex: () =>
            (function (e) {
              return Promise.all([
                e($e.resolve()),
                e.resolve($e.resolve("dist/katex.min.css")).then(Wn),
              ]).then(function (e) {
                var t = e[0],
                  n = r();
                function r(e) {
                  return function () {
                    var n = document.createElement("div");
                    return (
                      t.render(zn.apply(String, arguments), n, e),
                      n.removeChild(n.firstChild)
                    );
                  };
                }
                return (n.options = r), (n.block = r({ displayMode: !0 })), n;
              });
            })(t),
          _: () => t(Se.resolve()),
          aq: () => t.alias({ "apache-arrow": Re.resolve() })(Fe.resolve()),
          Arrow: () => t(Re.resolve()),
          d3: () => t(Ne.resolve()),
          DuckDBClient: () => DuckDBClient,
          Inputs: () =>
            t(xe.resolve()).then((e) => ({ ...e, file: e.fileOf(_n) })),
          L: () =>
            (async function (e) {
              const t = await e(He.resolve());
              if (!t._style) {
                const n = document.createElement("link");
                (n.rel = "stylesheet"),
                  (n.href = await e.resolve(He.resolve("dist/leaflet.css"))),
                  (t._style = document.head.appendChild(n));
              }
              return t;
            })(t),
          mermaid: () =>
            (async function (e) {
              const t = await e(We.resolve());
              return (
                t.initialize({ securityLevel: "loose", theme: "neutral" }),
                function () {
                  const e = document.createElement("div");
                  return (
                    (e.innerHTML = t.render(
                      xn().id,
                      String.raw.apply(String, arguments)
                    )),
                    e.removeChild(e.firstChild)
                  );
                }
              );
            })(t),
          Plot: () => t(Te.resolve()),
          __query: () => It,
          require: () => t,
          resolve: () => Fn,
          SQLite: () => dt(t),
          SQLiteDatabaseClient: () => SQLiteDatabaseClient,
          topojson: () => t(Be.resolve()),
          vl: () =>
            (async function (e) {
              const [t, n, r] = await Promise.all(
                [Me, Ie, Pe].map((t) => e(t.resolve()))
              );
              return r.register(t, n);
            })(t),
          aapl: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/3ccff97fd2d93da734e76829b2b066eafdaac6a1fafdec0faf6ebc443271cfc109d29e80dd217468fcb2aff1e6bffdc73f356cc48feb657f35378e6abbbb63b9"
            ).csv({ typed: !0 }),
          alphabet: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/75d52e6c3130b1cae83cda89305e17b50f33e7420ef205587a135e8562bcfd22e483cf4fa2fb5df6dff66f9c5d19740be1cfaf47406286e2eb6574b49ffc685d"
            ).csv({ typed: !0 }),
          cars: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/048ec3dfd528110c0665dfa363dd28bc516ffb7247231f3ab25005036717f5c4c232a5efc7bb74bc03037155cb72b1abe85a33d86eb9f1a336196030443be4f6"
            ).csv({ typed: !0 }),
          citywages: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/39837ec5121fcc163131dbc2fe8c1a2e0b3423a5d1e96b5ce371e2ac2e20a290d78b71a4fb08b9fa6a0107776e17fb78af313b8ea70f4cc6648fad68ddf06f7a"
            ).csv({ typed: !0 }),
          diamonds: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/87942b1f5d061a21fa4bb8f2162db44e3ef0f7391301f867ab5ba718b225a63091af20675f0bfe7f922db097b217b377135203a7eab34651e21a8d09f4e37252"
            ).csv({ typed: !0 }),
          flare: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/a6b0d94a7f5828fd133765a934f4c9746d2010e2f342d335923991f31b14120de96b5cb4f160d509d8dc627f0107d7f5b5070d2516f01e4c862b5b4867533000"
            ).csv({ typed: !0 }),
          industries: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/76f13741128340cc88798c0a0b7fa5a2df8370f57554000774ab8ee9ae785ffa2903010cad670d4939af3e9c17e5e18e7e05ed2b38b848ac2fc1a0066aa0005f"
            ).csv({ typed: !0 }),
          miserables: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/31d904f6e21d42d4963ece9c8cc4fbd75efcbdc404bf511bc79906f0a1be68b5a01e935f65123670ed04e35ca8cae3c2b943f82bf8db49c5a67c85cbb58db052"
            ).json(),
          olympians: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/31ca24545a0603dce099d10ee89ee5ae72d29fa55e8fc7c9ffb5ded87ac83060d80f1d9e21f4ae8eb04c1e8940b7287d179fe8060d887fb1f055f430e210007c"
            ).csv({ typed: !0 }),
          penguins: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/715db1223e067f00500780077febc6cebbdd90c151d3d78317c802732252052ab0e367039872ab9c77d6ef99e5f55a0724b35ddc898a1c99cb14c31a379af80a"
            ).csv({ typed: !0 }),
          weather: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/693a46b22b33db0f042728700e0c73e836fa13d55446df89120682d55339c6db7cc9e574d3d73f24ecc9bc7eb9ac9a1e7e104a1ee52c00aab1e77eb102913c1f"
            ).csv({ typed: !0 }),
          DOM: An,
          Files: jn,
          Generators: Ln,
          Promises: Dn,
        }),
        Object.fromEntries(Object.entries(n).map(Vn)))
      );
    },
    {
      resolve: { get: () => ft.resolve, enumerable: !0, configurable: !0 },
      require: {
        get: () => ft,
        set: function (e) {
          ft = e;
        },
        enumerable: !0,
        configurable: !0,
      },
    }
  ),
  { resolveFrom: nt, requireFrom: ot }
);
function Vn([e, t]) {
  return [e, { value: t, writable: !0, enumerable: !0 }];
}
class RuntimeError extends Error {
  constructor(e, t) {
    super(e), (this.input = t);
  }
}
function Gn(e) {
  return () => e;
}
function Yn(e) {
  return e;
}
RuntimeError.prototype.name = "RuntimeError";
const Zn = Array.prototype.map;
function Jn() {}
const Kn = Symbol("no-observer");
function Variable(e, t, n) {
  var r;
  n || (n = Kn),
    Object.defineProperties(this, {
      _observer: { value: n, writable: !0 },
      _definition: { value: er, writable: !0 },
      _duplicate: { value: void 0, writable: !0 },
      _duplicates: { value: void 0, writable: !0 },
      _indegree: { value: NaN, writable: !0 },
      _inputs: { value: [], writable: !0 },
      _invalidate: { value: Jn, writable: !0 },
      _module: { value: t },
      _name: { value: null, writable: !0 },
      _outputs: { value: new Set(), writable: !0 },
      _promise: { value: Promise.resolve(void 0), writable: !0 },
      _reachable: { value: n !== Kn, writable: !0 },
      _rejector: {
        value:
          ((r = this),
          (e) => {
            if (e === tr) throw e;
            if (e === er)
              throw new RuntimeError(`${r._name} is not defined`, r._name);
            if (e instanceof Error && e.message)
              throw new RuntimeError(e.message, r._name);
            throw new RuntimeError(`${r._name} could not be resolved`, r._name);
          }),
      },
      _type: { value: e },
      _value: { value: void 0, writable: !0 },
      _version: { value: 0, writable: !0 },
    });
}
function Xn(e) {
  e._module._runtime._dirty.add(e), e._outputs.add(this);
}
function Qn(e) {
  e._module._runtime._dirty.add(e), e._outputs.delete(this);
}
function er() {
  throw er;
}
function tr() {
  throw tr;
}
function nr(e) {
  return () => {
    throw new RuntimeError(`${e} is defined more than once`);
  };
}
function rr(e, t, n) {
  const r = this._module._scope,
    o = this._module._runtime;
  if (
    (this._inputs.forEach(Qn, this),
    t.forEach(Xn, this),
    (this._inputs = t),
    (this._definition = n),
    (this._value = void 0),
    n === Jn ? o._variables.delete(this) : o._variables.add(this),
    e !== this._name || r.get(e) !== this)
  ) {
    let t, a;
    if (this._name)
      if (this._outputs.size)
        r.delete(this._name),
          (a = this._module._resolve(this._name)),
          (a._outputs = this._outputs),
          (this._outputs = new Set()),
          a._outputs.forEach(function (e) {
            e._inputs[e._inputs.indexOf(this)] = a;
          }, this),
          a._outputs.forEach(o._updates.add, o._updates),
          o._dirty.add(a).add(this),
          r.set(this._name, a);
      else if ((a = r.get(this._name)) === this) r.delete(this._name);
      else {
        if (3 !== a._type) throw new Error();
        a._duplicates.delete(this),
          (this._duplicate = void 0),
          1 === a._duplicates.size &&
            ((a = a._duplicates.keys().next().value),
            (t = r.get(this._name)),
            (a._outputs = t._outputs),
            (t._outputs = new Set()),
            a._outputs.forEach(function (e) {
              e._inputs[e._inputs.indexOf(t)] = a;
            }),
            (a._definition = a._duplicate),
            (a._duplicate = void 0),
            o._dirty.add(t).add(a),
            o._updates.add(a),
            r.set(this._name, a));
      }
    if (this._outputs.size) throw new Error();
    e &&
      ((a = r.get(e))
        ? 3 === a._type
          ? ((this._definition = nr(e)),
            (this._duplicate = n),
            a._duplicates.add(this))
          : 2 === a._type
          ? ((this._outputs = a._outputs),
            (a._outputs = new Set()),
            this._outputs.forEach(function (e) {
              e._inputs[e._inputs.indexOf(a)] = this;
            }, this),
            o._dirty.add(a).add(this),
            r.set(e, this))
          : ((a._duplicate = a._definition),
            (this._duplicate = n),
            (t = new Variable(3, this._module)),
            (t._name = e),
            (t._definition = this._definition = a._definition = nr(e)),
            (t._outputs = a._outputs),
            (a._outputs = new Set()),
            t._outputs.forEach(function (e) {
              e._inputs[e._inputs.indexOf(a)] = t;
            }),
            (t._duplicates = new Set([this, a])),
            o._dirty.add(a).add(t),
            o._updates.add(a).add(t),
            r.set(e, t))
        : r.set(e, this)),
      (this._name = e);
  }
  return (
    this._version > 0 && ++this._version,
    o._updates.add(this),
    o._compute(),
    this
  );
}
Object.defineProperties(Variable.prototype, {
  _pending: {
    value: function () {
      this._observer.pending && this._observer.pending();
    },
    writable: !0,
    configurable: !0,
  },
  _fulfilled: {
    value: function (e) {
      this._observer.fulfilled && this._observer.fulfilled(e, this._name);
    },
    writable: !0,
    configurable: !0,
  },
  _rejected: {
    value: function (e) {
      this._observer.rejected && this._observer.rejected(e, this._name);
    },
    writable: !0,
    configurable: !0,
  },
  define: {
    value: function (e, t, n) {
      switch (arguments.length) {
        case 1:
          (n = e), (e = t = null);
          break;
        case 2:
          (n = t), "string" == typeof e ? (t = null) : ((t = e), (e = null));
      }
      return rr.call(
        this,
        null == e ? null : String(e),
        null == t ? [] : Zn.call(t, this._module._resolve, this._module),
        "function" == typeof n ? n : Gn(n)
      );
    },
    writable: !0,
    configurable: !0,
  },
  delete: {
    value: function () {
      return rr.call(this, null, [], Jn);
    },
    writable: !0,
    configurable: !0,
  },
  import: {
    value: function (e, t, n) {
      arguments.length < 3 && ((n = t), (t = e));
      return rr.call(this, String(t), [n._resolve(String(e))], Yn);
    },
    writable: !0,
    configurable: !0,
  },
});
const or = Symbol("variable"),
  ar = Symbol("invalidation"),
  ir = Symbol("visibility");
function Module(e, t = []) {
  Object.defineProperties(this, {
    _runtime: { value: e },
    _scope: { value: new Map() },
    _builtins: {
      value: new Map([
        ["@variable", or],
        ["invalidation", ar],
        ["visibility", ir],
        ...t,
      ]),
    },
    _source: { value: null, writable: !0 },
  });
}
async function sr(e, t) {
  await e._compute();
  try {
    return await t._promise;
  } catch (n) {
    if (n === tr) return sr(e, t);
    throw n;
  }
}
function cr(e) {
  return e._name;
}
Object.defineProperties(Module.prototype, {
  _resolve: {
    value: function (e) {
      let t,
        n = this._scope.get(e);
      if (!n)
        if (((n = new Variable(2, this)), this._builtins.has(e)))
          n.define(e, Gn(this._builtins.get(e)));
        else if (this._runtime._builtin._scope.has(e))
          n.import(e, this._runtime._builtin);
        else {
          try {
            t = this._runtime._global(e);
          } catch (t) {
            return n.define(
              e,
              (function (e) {
                return () => {
                  throw e;
                };
              })(t)
            );
          }
          void 0 === t ? this._scope.set((n._name = e), n) : n.define(e, Gn(t));
        }
      return n;
    },
    writable: !0,
    configurable: !0,
  },
  redefine: {
    value: function (e) {
      const t = this._scope.get(e);
      if (!t) throw new RuntimeError(`${e} is not defined`);
      if (3 === t._type)
        throw new RuntimeError(`${e} is defined more than once`);
      return t.define.apply(t, arguments);
    },
    writable: !0,
    configurable: !0,
  },
  define: {
    value: function () {
      const e = new Variable(1, this);
      return e.define.apply(e, arguments);
    },
    writable: !0,
    configurable: !0,
  },
  derive: {
    value: function (e, t) {
      const n = new Map(),
        r = new Set(),
        o = [];
      function a(e) {
        let t = n.get(e);
        return (
          t ||
          ((t = new Module(e._runtime, e._builtins)),
          (t._source = e),
          n.set(e, t),
          o.push([t, e]),
          r.add(e),
          t)
        );
      }
      const i = a(this);
      for (const n of e) {
        const { alias: e, name: r } = "object" == typeof n ? n : { name: n };
        i.import(r, null == e ? r : e, t);
      }
      for (const e of r)
        for (const [t, n] of e._scope)
          if (n._definition === Yn) {
            if (e === this && i._scope.has(t)) continue;
            const r = n._inputs[0]._module;
            r._source && a(r);
          }
      for (const [e, t] of o)
        for (const [r, o] of t._scope) {
          const t = e._scope.get(r);
          if (!t || 2 === t._type)
            if (o._definition === Yn) {
              const t = o._inputs[0],
                a = t._module;
              e.import(t._name, r, n.get(a) || a);
            } else e.define(r, o._inputs.map(cr), o._definition);
        }
      return i;
    },
    writable: !0,
    configurable: !0,
  },
  import: {
    value: function () {
      const e = new Variable(1, this);
      return e.import.apply(e, arguments);
    },
    writable: !0,
    configurable: !0,
  },
  value: {
    value: async function (e) {
      let t = this._scope.get(e);
      if (!t) throw new RuntimeError(`${e} is not defined`);
      if (t._observer !== Kn) return sr(this._runtime, t);
      t = this.variable(!0).define([e], Yn);
      try {
        return await sr(this._runtime, t);
      } finally {
        t.delete();
      }
    },
    writable: !0,
    configurable: !0,
  },
  variable: {
    value: function (e) {
      return new Variable(1, this, e);
    },
    writable: !0,
    configurable: !0,
  },
  builtin: {
    value: function (e, t) {
      this._builtins.set(e, t);
    },
    writable: !0,
    configurable: !0,
  },
});
const lr =
  "function" == typeof requestAnimationFrame
    ? requestAnimationFrame
    : "function" == typeof setImmediate
    ? setImmediate
    : (e) => setTimeout(e, 0);
function Runtime(e = new Library(), t = vr) {
  const n = this.module();
  if (
    (Object.defineProperties(this, {
      _dirty: { value: new Set() },
      _updates: { value: new Set() },
      _precomputes: { value: [], writable: !0 },
      _computing: { value: null, writable: !0 },
      _init: { value: null, writable: !0 },
      _modules: { value: new Map() },
      _variables: { value: new Set() },
      _disposed: { value: !1, writable: !0 },
      _builtin: { value: n },
      _global: { value: t },
    }),
    e)
  )
    for (const t in e) new Variable(2, n).define(t, [], e[t]);
}
function ur(e) {
  const t = new Set(e._inputs);
  for (const n of t) {
    if (n === e) return !0;
    n._inputs.forEach(t.add, t);
  }
  return !1;
}
function fr(e) {
  ++e._indegree;
}
function dr(e) {
  --e._indegree;
}
function pr(e) {
  return e._promise.catch(e._rejector);
}
function mr(e) {
  return new Promise(function (t) {
    e._invalidate = t;
  });
}
function hr(e, t) {
  let n,
    r,
    o =
      "function" == typeof IntersectionObserver &&
      t._observer &&
      t._observer._node,
    a = !o,
    i = Jn,
    s = Jn;
  return (
    o &&
      ((r = new IntersectionObserver(
        ([e]) => (a = e.isIntersecting) && ((n = null), i())
      )),
      r.observe(o),
      e.then(() => (r.disconnect(), (r = null), s()))),
    function (e) {
      return a
        ? Promise.resolve(e)
        : r
        ? (n || (n = new Promise((e, t) => ((i = e), (s = t)))),
          n.then(() => e))
        : Promise.reject();
    }
  );
}
function br(e) {
  e._invalidate(), (e._invalidate = Jn), e._pending();
  const t = e._value,
    n = ++e._version;
  let r = null;
  const o = (e._promise = (
    e._inputs.length
      ? Promise.all(e._inputs.map(pr)).then(function (o) {
          if (e._version !== n) throw tr;
          for (let t = 0, n = o.length; t < n; ++t)
            switch (o[t]) {
              case ar:
                o[t] = r = mr(e);
                break;
              case ir:
                r || (r = mr(e)), (o[t] = hr(r, e));
                break;
              case or:
                o[t] = e;
            }
          return e._definition.apply(t, o);
        })
      : new Promise((n) => n(e._definition.call(t)))
  ).then(function (t) {
    if (e._version !== n) throw tr;
    if (
      (function (e) {
        return (
          e && "function" == typeof e.next && "function" == typeof e.return
        );
      })(t)
    )
      return (
        (r || mr(e)).then(
          ((o = t),
          function () {
            o.return();
          })
        ),
        (function (e, t, n) {
          const r = e._module._runtime;
          let o;
          function a(e) {
            return new Promise((e) => e(n.next(o))).then(
              ({ done: t, value: n }) =>
                t ? void 0 : Promise.resolve(n).then(e)
            );
          }
          function i() {
            const n = a((a) => {
              if (e._version !== t) throw tr;
              return (
                (o = a),
                s(a, n).then(() => r._precompute(i)),
                e._fulfilled(a),
                a
              );
            });
            n.catch((r) => {
              r !== tr && e._version === t && (s(void 0, n), e._rejected(r));
            });
          }
          function s(t, n) {
            return (
              (e._value = t),
              (e._promise = n),
              e._outputs.forEach(r._updates.add, r._updates),
              r._compute()
            );
          }
          return a((n) => {
            if (e._version !== t) throw tr;
            return (o = n), r._precompute(i), n;
          });
        })(e, n, t)
      );
    var o;
    return t;
  }));
  o.then(
    (t) => {
      (e._value = t), e._fulfilled(t);
    },
    (t) => {
      t !== tr && ((e._value = void 0), e._rejected(t));
    }
  );
}
function wr(e, t) {
  e._invalidate(),
    (e._invalidate = Jn),
    e._pending(),
    ++e._version,
    (e._indegree = NaN),
    (e._promise = Promise.reject(t)).catch(Jn),
    (e._value = void 0),
    e._rejected(t);
}
function vr(e) {
  return globalThis[e];
}
Object.defineProperties(Runtime.prototype, {
  _precompute: {
    value: function (e) {
      this._precomputes.push(e), this._compute();
    },
    writable: !0,
    configurable: !0,
  },
  _compute: {
    value: function () {
      return this._computing || (this._computing = this._computeSoon());
    },
    writable: !0,
    configurable: !0,
  },
  _computeSoon: {
    value: function () {
      return new Promise(lr).then(() =>
        this._disposed ? void 0 : this._computeNow()
      );
    },
    writable: !0,
    configurable: !0,
  },
  _computeNow: {
    value: async function () {
      let e,
        t,
        n = [],
        r = this._precomputes;
      if (r.length) {
        this._precomputes = [];
        for (const e of r) e();
        await (function (e = 0) {
          let t = Promise.resolve();
          for (let n = 0; n < e; ++n) t = t.then(() => {});
          return t;
        })(3);
      }
      (e = new Set(this._dirty)),
        e.forEach(function (t) {
          t._inputs.forEach(e.add, e);
          const n = (function (e) {
            if (e._observer !== Kn) return !0;
            const t = new Set(e._outputs);
            for (const e of t) {
              if (e._observer !== Kn) return !0;
              e._outputs.forEach(t.add, t);
            }
            return !1;
          })(t);
          n > t._reachable
            ? this._updates.add(t)
            : n < t._reachable && t._invalidate(),
            (t._reachable = n);
        }, this),
        (e = new Set(this._updates)),
        e.forEach(function (t) {
          t._reachable
            ? ((t._indegree = 0), t._outputs.forEach(e.add, e))
            : ((t._indegree = NaN), e.delete(t));
        }),
        (this._computing = null),
        this._updates.clear(),
        this._dirty.clear(),
        e.forEach(function (e) {
          e._outputs.forEach(fr);
        });
      do {
        for (
          e.forEach(function (e) {
            0 === e._indegree && n.push(e);
          });
          (t = n.pop());

        )
          br(t), t._outputs.forEach(o), e.delete(t);
        e.forEach(function (t) {
          ur(t) &&
            (wr(t, new RuntimeError("circular definition")),
            t._outputs.forEach(dr),
            e.delete(t));
        });
      } while (e.size);
      function o(e) {
        0 == --e._indegree && n.push(e);
      }
    },
    writable: !0,
    configurable: !0,
  },
  dispose: {
    value: function () {
      (this._computing = Promise.resolve()),
        (this._disposed = !0),
        this._variables.forEach((e) => {
          e._invalidate(), (e._version = NaN);
        });
    },
    writable: !0,
    configurable: !0,
  },
  module: {
    value: function (e, t = Jn) {
      let n;
      if (void 0 === e)
        return (n = this._init) ? ((this._init = null), n) : new Module(this);
      if (((n = this._modules.get(e)), n)) return n;
      (this._init = n = new Module(this)), this._modules.set(e, n);
      try {
        e(this, t);
      } finally {
        this._init = null;
      }
      return n;
    },
    writable: !0,
    configurable: !0,
  },
  fileAttachments: {
    value: function (e) {
      return Object.assign(
        (t) => {
          const n = e((t += ""));
          if (null == n) throw new Error(`File not found: ${t}`);
          if ("object" == typeof n && "url" in n) {
            const { url: e, mimeType: r } = n;
            return new FileAttachment(e, t, r);
          }
          return new FileAttachment(n, t);
        },
        { prototype: FileAttachment.prototype }
      );
    },
    writable: !0,
    configurable: !0,
  },
});
export { Inspector, Library, Runtime, RuntimeError };

var Bn = Object.defineProperty;
var Fn = (t, n, e) =>
  n in t
    ? Bn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var zt = (t, n, e) => (Fn(t, typeof n != "symbol" ? n + "" : n, e), e);
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = e(i);
    fetch(i.href, o);
  }
})();
var Xn = { value: () => {} };
function $t() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new at(e);
}
function at(t) {
  this._ = t;
}
function Vn(t, n) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = "",
        i = e.indexOf(".");
      if (
        (i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
        e && !n.hasOwnProperty(e))
      )
        throw new Error("unknown type: " + e);
      return { type: e, name: r };
    });
}
at.prototype = $t.prototype = {
  constructor: at,
  on: function (t, n) {
    var e = this._,
      r = Vn(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = qn(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = Wt(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = Wt(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new at(t);
  },
  call: function (t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function (t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  },
};
function qn(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function Wt(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = Xn), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var St = "http://www.w3.org/1999/xhtml";
const Kt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: St,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function _t(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    Kt.hasOwnProperty(n) ? { space: Kt[n], local: t } : t
  );
}
function Un(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === St && n.documentElement.namespaceURI === St
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function Yn(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function hn(t) {
  var n = _t(t);
  return (n.local ? Yn : Un)(n);
}
function zn() {}
function Mt(t) {
  return t == null
    ? zn
    : function () {
        return this.querySelector(t);
      };
}
function Wn(t) {
  typeof t != "function" && (t = Mt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, u, l = 0;
      l < s;
      ++l
    )
      (a = o[l]) &&
        (u = t.call(a, a.__data__, l, o)) &&
        ("__data__" in a && (u.__data__ = a.__data__), (c[l] = u));
  return new w(r, this._parents);
}
function Kn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Jn() {
  return [];
}
function pn(t) {
  return t == null
    ? Jn
    : function () {
        return this.querySelectorAll(t);
      };
}
function Qn(t) {
  return function () {
    return Kn(t.apply(this, arguments));
  };
}
function Zn(t) {
  typeof t == "function" ? (t = Qn(t)) : (t = pn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, u = 0; u < c; ++u)
      (a = s[u]) && (r.push(t.call(a, a.__data__, u, s)), i.push(a));
  return new w(r, i);
}
function dn(t) {
  return function () {
    return this.matches(t);
  };
}
function gn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var jn = Array.prototype.find;
function te(t) {
  return function () {
    return jn.call(this.children, t);
  };
}
function ne() {
  return this.firstElementChild;
}
function ee(t) {
  return this.select(t == null ? ne : te(typeof t == "function" ? t : gn(t)));
}
var re = Array.prototype.filter;
function ie() {
  return Array.from(this.children);
}
function oe(t) {
  return function () {
    return re.call(this.children, t);
  };
}
function se(t) {
  return this.selectAll(
    t == null ? ie : oe(typeof t == "function" ? t : gn(t))
  );
}
function ce(t) {
  typeof t != "function" && (t = dn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, u = 0; u < s; ++u)
      (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
  return new w(r, this._parents);
}
function mn(t) {
  return new Array(t.length);
}
function ae() {
  return new w(this._enter || this._groups.map(mn), this._parents);
}
function ft(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
ft.prototype = {
  constructor: ft,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function (t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function (t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t);
  },
};
function ue(t) {
  return function () {
    return t;
  };
}
function le(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, u = o.length; s < u; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new ft(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function fe(t, n, e, r, i, o, s) {
  var c,
    a,
    u = new Map(),
    l = n.length,
    p = o.length,
    f = new Array(l),
    d;
  for (c = 0; c < l; ++c)
    (a = n[c]) &&
      ((f[c] = d = s.call(a, a.__data__, c, n) + ""),
      u.has(d) ? (i[c] = a) : u.set(d, a));
  for (c = 0; c < p; ++c)
    (d = s.call(t, o[c], c, o) + ""),
      (a = u.get(d))
        ? ((r[c] = a), (a.__data__ = o[c]), u.delete(d))
        : (e[c] = new ft(t, o[c]));
  for (c = 0; c < l; ++c) (a = n[c]) && u.get(f[c]) === a && (i[c] = a);
}
function he(t) {
  return t.__data__;
}
function pe(t, n) {
  if (!arguments.length) return Array.from(this, he);
  var e = n ? fe : le,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = ue(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      u = 0;
    u < o;
    ++u
  ) {
    var l = r[u],
      p = i[u],
      f = p.length,
      d = de(t.call(l, l && l.__data__, u, r)),
      m = d.length,
      _ = (c[u] = new Array(m)),
      k = (s[u] = new Array(m)),
      xt = (a[u] = new Array(f));
    e(l, p, _, k, xt, d, n);
    for (var M = 0, R = 0, h, g; M < m; ++M)
      if ((h = _[M])) {
        for (M >= R && (R = M + 1); !(g = k[R]) && ++R < m; );
        h._next = g || null;
      }
  }
  return (s = new w(s, r)), (s._enter = c), (s._exit = a), s;
}
function de(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ge() {
  return new w(this._exit || this._groups.map(mn), this._parents);
}
function me(t, n, e) {
  var r = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == "function"
      ? ((r = t(r)), r && (r = r.selection()))
      : (r = r.append(t + "")),
    n != null && ((i = n(i)), i && (i = i.selection())),
    e == null ? o.remove() : e(o),
    r && i ? r.merge(i).order() : i
  );
}
function _e(t) {
  for (
    var n = t.selection ? t.selection() : t,
      e = this._groups,
      r = n._groups,
      i = e.length,
      o = r.length,
      s = Math.min(i, o),
      c = new Array(i),
      a = 0;
    a < s;
    ++a
  )
    for (
      var u = e[a], l = r[a], p = u.length, f = (c[a] = new Array(p)), d, m = 0;
      m < p;
      ++m
    )
      (d = u[m] || l[m]) && (f[m] = d);
  for (; a < i; ++a) c[a] = e[a];
  return new w(c, this._parents);
}
function ye() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function ve(t) {
  t || (t = xe);
  function n(p, f) {
    return p && f ? t(p.__data__, f.__data__) : !p - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), u, l = 0;
      l < c;
      ++l
    )
      (u = s[l]) && (a[l] = u);
    a.sort(n);
  }
  return new w(i, this._parents).order();
}
function xe(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function we() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function be() {
  return Array.from(this);
}
function Ie() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ee() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Ne() {
  return !this.node();
}
function Se(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Pe(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ae(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ke(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Oe(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Ce(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ge(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Te(t, n) {
  var e = _t(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Ae
        : Pe
      : typeof n == "function"
      ? e.local
        ? Ge
        : Ce
      : e.local
      ? Oe
      : ke)(e, n)
  );
}
function _n(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function $e(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Me(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Re(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function De(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? $e : typeof n == "function" ? Re : Me)(t, n, e ?? "")
      )
    : q(this.node(), t);
}
function q(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    _n(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Le(t) {
  return function () {
    delete this[t];
  };
}
function He(t, n) {
  return function () {
    this[t] = n;
  };
}
function Be(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function Fe(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Le : typeof n == "function" ? Be : He)(t, n))
    : this.node()[t];
}
function yn(t) {
  return t.trim().split(/^|\s+/);
}
function Rt(t) {
  return t.classList || new vn(t);
}
function vn(t) {
  (this._node = t), (this._names = yn(t.getAttribute("class") || ""));
}
vn.prototype = {
  add: function (t) {
    var n = this._names.indexOf(t);
    n < 0 &&
      (this._names.push(t),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (t) {
    var n = this._names.indexOf(t);
    n >= 0 &&
      (this._names.splice(n, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
function xn(t, n) {
  for (var e = Rt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function wn(t, n) {
  for (var e = Rt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function Xe(t) {
  return function () {
    xn(this, t);
  };
}
function Ve(t) {
  return function () {
    wn(this, t);
  };
}
function qe(t, n) {
  return function () {
    (n.apply(this, arguments) ? xn : wn)(this, t);
  };
}
function Ue(t, n) {
  var e = yn(t + "");
  if (arguments.length < 2) {
    for (var r = Rt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? qe : n ? Xe : Ve)(e, n));
}
function Ye() {
  this.textContent = "";
}
function ze(t) {
  return function () {
    this.textContent = t;
  };
}
function We(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Ke(t) {
  return arguments.length
    ? this.each(t == null ? Ye : (typeof t == "function" ? We : ze)(t))
    : this.node().textContent;
}
function Je() {
  this.innerHTML = "";
}
function Qe(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Ze(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function je(t) {
  return arguments.length
    ? this.each(t == null ? Je : (typeof t == "function" ? Ze : Qe)(t))
    : this.node().innerHTML;
}
function tr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function nr() {
  return this.each(tr);
}
function er() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function rr() {
  return this.each(er);
}
function ir(t) {
  var n = typeof t == "function" ? t : hn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function or() {
  return null;
}
function sr(t, n) {
  var e = typeof t == "function" ? t : hn(t),
    r = n == null ? or : typeof n == "function" ? n : Mt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function cr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ar() {
  return this.each(cr);
}
function ur() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function lr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function fr(t) {
  return this.select(t ? lr : ur);
}
function hr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function pr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function dr(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var e = "",
        r = n.indexOf(".");
      return (
        r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
        { type: n, name: e }
      );
    });
}
function gr(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        (o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function mr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = pr(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n);
          return;
        }
    }
    this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]);
  };
}
function _r(t, n, e) {
  var r = dr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, u = c.length, l; a < u; ++a)
        for (i = 0, l = c[a]; i < o; ++i)
          if ((s = r[i]).type === l.type && s.name === l.name) return l.value;
    }
    return;
  }
  for (c = n ? mr : gr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function bn(t, n, e) {
  var r = _n(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function yr(t, n) {
  return function () {
    return bn(this, t, n);
  };
}
function vr(t, n) {
  return function () {
    return bn(this, t, n.apply(this, arguments));
  };
}
function xr(t, n) {
  return this.each((typeof n == "function" ? vr : yr)(t, n));
}
function* wr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var In = [null];
function w(t, n) {
  (this._groups = t), (this._parents = n);
}
function nt() {
  return new w([[document.documentElement]], In);
}
function br() {
  return this;
}
w.prototype = nt.prototype = {
  constructor: w,
  select: Wn,
  selectAll: Zn,
  selectChild: ee,
  selectChildren: se,
  filter: ce,
  data: pe,
  enter: ae,
  exit: ge,
  join: me,
  merge: _e,
  selection: br,
  order: ye,
  sort: ve,
  call: we,
  nodes: be,
  node: Ie,
  size: Ee,
  empty: Ne,
  each: Se,
  attr: Te,
  style: De,
  property: Fe,
  classed: Ue,
  text: Ke,
  html: je,
  raise: nr,
  lower: rr,
  append: ir,
  insert: sr,
  remove: ar,
  clone: fr,
  datum: hr,
  on: _r,
  dispatch: xr,
  [Symbol.iterator]: wr,
};
function I(t) {
  return typeof t == "string"
    ? new w([[document.querySelector(t)]], [document.documentElement])
    : new w([[t]], In);
}
function Ir(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function Jt(t, n) {
  if (((t = Ir(t)), n === void 0 && (n = t.currentTarget), n)) {
    var e = n.ownerSVGElement || n;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      return (
        (r.x = t.clientX),
        (r.y = t.clientY),
        (r = r.matrixTransform(n.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    if (n.getBoundingClientRect) {
      var i = n.getBoundingClientRect();
      return [
        t.clientX - i.left - n.clientLeft,
        t.clientY - i.top - n.clientTop,
      ];
    }
  }
  return [t.pageX, t.pageY];
}
const Er = { passive: !1 },
  J = { capture: !0, passive: !1 };
function It(t) {
  t.stopImmediatePropagation();
}
function X(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Nr(t) {
  var n = t.document.documentElement,
    e = I(t).on("dragstart.drag", X, J);
  "onselectstart" in n
    ? e.on("selectstart.drag", X, J)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Sr(t, n) {
  var e = t.document.documentElement,
    r = I(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", X, J),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const it = (t) => () => t;
function Pt(
  t,
  {
    sourceEvent: n,
    subject: e,
    target: r,
    identifier: i,
    active: o,
    x: s,
    y: c,
    dx: a,
    dy: u,
    dispatch: l,
  }
) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    subject: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: l },
  });
}
Pt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Pr(t) {
  return !t.ctrlKey && !t.button;
}
function Ar() {
  return this.parentNode;
}
function kr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Or() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Cr() {
  var t = Pr,
    n = Ar,
    e = kr,
    r = Or,
    i = {},
    o = $t("start", "drag", "end"),
    s = 0,
    c,
    a,
    u,
    l,
    p = 0;
  function f(h) {
    h.on("mousedown.drag", d)
      .filter(r)
      .on("touchstart.drag", k)
      .on("touchmove.drag", xt, Er)
      .on("touchend.drag touchcancel.drag", M)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function d(h, g) {
    if (!(l || !t.call(this, h, g))) {
      var y = R(this, n.call(this, h, g), h, g, "mouse");
      y &&
        (I(h.view).on("mousemove.drag", m, J).on("mouseup.drag", _, J),
        Nr(h.view),
        It(h),
        (u = !1),
        (c = h.clientX),
        (a = h.clientY),
        y("start", h));
    }
  }
  function m(h) {
    if ((X(h), !u)) {
      var g = h.clientX - c,
        y = h.clientY - a;
      u = g * g + y * y > p;
    }
    i.mouse("drag", h);
  }
  function _(h) {
    I(h.view).on("mousemove.drag mouseup.drag", null),
      Sr(h.view, u),
      X(h),
      i.mouse("end", h);
  }
  function k(h, g) {
    if (t.call(this, h, g)) {
      var y = h.changedTouches,
        v = n.call(this, h, g),
        b = y.length,
        G,
        F;
      for (G = 0; G < b; ++G)
        (F = R(this, v, h, g, y[G].identifier, y[G])) &&
          (It(h), F("start", h, y[G]));
    }
  }
  function xt(h) {
    var g = h.changedTouches,
      y = g.length,
      v,
      b;
    for (v = 0; v < y; ++v)
      (b = i[g[v].identifier]) && (X(h), b("drag", h, g[v]));
  }
  function M(h) {
    var g = h.changedTouches,
      y = g.length,
      v,
      b;
    for (
      l && clearTimeout(l),
        l = setTimeout(function () {
          l = null;
        }, 500),
        v = 0;
      v < y;
      ++v
    )
      (b = i[g[v].identifier]) && (It(h), b("end", h, g[v]));
  }
  function R(h, g, y, v, b, G) {
    var F = o.copy(),
      S = Jt(G || y, g),
      Vt,
      qt,
      rt;
    if (
      (rt = e.call(
        h,
        new Pt("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: b,
          active: s,
          x: S[0],
          y: S[1],
          dx: 0,
          dy: 0,
          dispatch: F,
        }),
        v
      )) != null
    )
      return (
        (Vt = rt.x - S[0] || 0),
        (qt = rt.y - S[1] || 0),
        function Ln(wt, Ut, Hn) {
          var Yt = S,
            bt;
          switch (wt) {
            case "start":
              (i[b] = Ln), (bt = s++);
              break;
            case "end":
              delete i[b], --s;
            case "drag":
              (S = Jt(Hn || Ut, g)), (bt = s);
              break;
          }
          F.call(
            wt,
            h,
            new Pt(wt, {
              sourceEvent: Ut,
              subject: rt,
              target: f,
              identifier: b,
              active: bt,
              x: S[0] + Vt,
              y: S[1] + qt,
              dx: S[0] - Yt[0],
              dy: S[1] - Yt[1],
              dispatch: F,
            }),
            v
          );
        }
      );
  }
  return (
    (f.filter = function (h) {
      return arguments.length
        ? ((t = typeof h == "function" ? h : it(!!h)), f)
        : t;
    }),
    (f.container = function (h) {
      return arguments.length
        ? ((n = typeof h == "function" ? h : it(h)), f)
        : n;
    }),
    (f.subject = function (h) {
      return arguments.length
        ? ((e = typeof h == "function" ? h : it(h)), f)
        : e;
    }),
    (f.touchable = function (h) {
      return arguments.length
        ? ((r = typeof h == "function" ? h : it(!!h)), f)
        : r;
    }),
    (f.on = function () {
      var h = o.on.apply(o, arguments);
      return h === o ? f : h;
    }),
    (f.clickDistance = function (h) {
      return arguments.length ? ((p = (h = +h) * h), f) : Math.sqrt(p);
    }),
    f
  );
}
function Dt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function En(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function et() {}
var Q = 0.7,
  ht = 1 / Q,
  V = "\\s*([+-]?\\d+)\\s*",
  Z = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  P = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Gr = /^#([0-9a-f]{3,8})$/,
  Tr = new RegExp(`^rgb\\(${V},${V},${V}\\)$`),
  $r = new RegExp(`^rgb\\(${P},${P},${P}\\)$`),
  Mr = new RegExp(`^rgba\\(${V},${V},${V},${Z}\\)$`),
  Rr = new RegExp(`^rgba\\(${P},${P},${P},${Z}\\)$`),
  Dr = new RegExp(`^hsl\\(${Z},${P},${P}\\)$`),
  Lr = new RegExp(`^hsla\\(${Z},${P},${P},${Z}\\)$`),
  Qt = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Dt(et, j, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Zt,
  formatHex: Zt,
  formatHex8: Hr,
  formatHsl: Br,
  formatRgb: jt,
  toString: jt,
});
function Zt() {
  return this.rgb().formatHex();
}
function Hr() {
  return this.rgb().formatHex8();
}
function Br() {
  return Nn(this).formatHsl();
}
function jt() {
  return this.rgb().formatRgb();
}
function j(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = Gr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? tn(n)
          : e === 3
          ? new x(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ot(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ot(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = Tr.exec(t))
      ? new x(n[1], n[2], n[3], 1)
      : (n = $r.exec(t))
      ? new x((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = Mr.exec(t))
      ? ot(n[1], n[2], n[3], n[4])
      : (n = Rr.exec(t))
      ? ot((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = Dr.exec(t))
      ? rn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = Lr.exec(t))
      ? rn(n[1], n[2] / 100, n[3] / 100, n[4])
      : Qt.hasOwnProperty(t)
      ? tn(Qt[t])
      : t === "transparent"
      ? new x(NaN, NaN, NaN, 0)
      : null
  );
}
function tn(t) {
  return new x((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ot(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new x(t, n, e, r);
}
function Fr(t) {
  return (
    t instanceof et || (t = j(t)),
    t ? ((t = t.rgb()), new x(t.r, t.g, t.b, t.opacity)) : new x()
  );
}
function At(t, n, e, r) {
  return arguments.length === 1 ? Fr(t) : new x(t, n, e, r ?? 1);
}
function x(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Dt(
  x,
  At,
  En(et, {
    brighter(t) {
      return (
        (t = t == null ? ht : Math.pow(ht, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? Q : Math.pow(Q, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new x(L(this.r), L(this.g), L(this.b), pt(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: nn,
    formatHex: nn,
    formatHex8: Xr,
    formatRgb: en,
    toString: en,
  })
);
function nn() {
  return `#${D(this.r)}${D(this.g)}${D(this.b)}`;
}
function Xr() {
  return `#${D(this.r)}${D(this.g)}${D(this.b)}${D(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function en() {
  const t = pt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${L(this.r)}, ${L(this.g)}, ${L(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function pt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function L(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function D(t) {
  return (t = L(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function rn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new E(t, n, e, r)
  );
}
function Nn(t) {
  if (t instanceof E) return new E(t.h, t.s, t.l, t.opacity);
  if ((t instanceof et || (t = j(t)), !t)) return new E();
  if (t instanceof E) return t;
  t = t.rgb();
  var n = t.r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    s = NaN,
    c = o - i,
    a = (o + i) / 2;
  return (
    c
      ? (n === o
          ? (s = (e - r) / c + (e < r) * 6)
          : e === o
          ? (s = (r - n) / c + 2)
          : (s = (n - e) / c + 4),
        (c /= a < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (c = a > 0 && a < 1 ? 0 : s),
    new E(s, c, a, t.opacity)
  );
}
function Vr(t, n, e, r) {
  return arguments.length === 1 ? Nn(t) : new E(t, n, e, r ?? 1);
}
function E(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Dt(
  E,
  Vr,
  En(et, {
    brighter(t) {
      return (
        (t = t == null ? ht : Math.pow(ht, t)),
        new E(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? Q : Math.pow(Q, t)),
        new E(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new x(
        Et(t >= 240 ? t - 240 : t + 120, i, r),
        Et(t, i, r),
        Et(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new E(on(this.h), st(this.s), st(this.l), pt(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = pt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${on(this.h)}, ${
        st(this.s) * 100
      }%, ${st(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function on(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function st(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Et(t, n, e) {
  return (
    (t < 60
      ? n + ((e - n) * t) / 60
      : t < 180
      ? e
      : t < 240
      ? n + ((e - n) * (240 - t)) / 60
      : n) * 255
  );
}
const Sn = (t) => () => t;
function qr(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function Ur(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function Yr(t) {
  return (t = +t) == 1
    ? Pn
    : function (n, e) {
        return e - n ? Ur(n, e, t) : Sn(isNaN(n) ? e : n);
      };
}
function Pn(t, n) {
  var e = n - t;
  return e ? qr(t, e) : Sn(isNaN(t) ? n : t);
}
const sn = (function t(n) {
  var e = Yr(n);
  function r(i, o) {
    var s = e((i = At(i)).r, (o = At(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      u = Pn(i.opacity, o.opacity);
    return function (l) {
      return (
        (i.r = s(l)), (i.g = c(l)), (i.b = a(l)), (i.opacity = u(l)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function T(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var kt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Nt = new RegExp(kt.source, "g");
function zr(t) {
  return function () {
    return t;
  };
}
function Wr(t) {
  return function (n) {
    return t(n) + "";
  };
}
function Kr(t, n) {
  var e = (kt.lastIndex = Nt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = kt.exec(t)) && (i = Nt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: T(r, i) })),
      (e = Nt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? Wr(a[0].x)
        : zr(n)
      : ((n = a.length),
        function (u) {
          for (var l = 0, p; l < n; ++l) c[(p = a[l]).i] = p.x(u);
          return c.join("");
        })
  );
}
var cn = 180 / Math.PI,
  Ot = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function An(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * cn,
      skewX: Math.atan(a) * cn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var ct;
function Jr(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Ot : An(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Qr(t) {
  return t == null ||
    (ct || (ct = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    ct.setAttribute("transform", t),
    !(t = ct.transform.baseVal.consolidate()))
    ? Ot
    : ((t = t.matrix), An(t.a, t.b, t.c, t.d, t.e, t.f));
}
function kn(t, n, e, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, p, f, d, m) {
    if (u !== p || l !== f) {
      var _ = d.push("translate(", null, n, null, e);
      m.push({ i: _ - 4, x: T(u, p) }, { i: _ - 2, x: T(l, f) });
    } else (p || f) && d.push("translate(" + p + n + f + e);
  }
  function s(u, l, p, f) {
    u !== l
      ? (u - l > 180 ? (l += 360) : l - u > 180 && (u += 360),
        f.push({ i: p.push(i(p) + "rotate(", null, r) - 2, x: T(u, l) }))
      : l && p.push(i(p) + "rotate(" + l + r);
  }
  function c(u, l, p, f) {
    u !== l
      ? f.push({ i: p.push(i(p) + "skewX(", null, r) - 2, x: T(u, l) })
      : l && p.push(i(p) + "skewX(" + l + r);
  }
  function a(u, l, p, f, d, m) {
    if (u !== p || l !== f) {
      var _ = d.push(i(d) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: T(u, p) }, { i: _ - 2, x: T(l, f) });
    } else (p !== 1 || f !== 1) && d.push(i(d) + "scale(" + p + "," + f + ")");
  }
  return function (u, l) {
    var p = [],
      f = [];
    return (
      (u = t(u)),
      (l = t(l)),
      o(u.translateX, u.translateY, l.translateX, l.translateY, p, f),
      s(u.rotate, l.rotate, p, f),
      c(u.skewX, l.skewX, p, f),
      a(u.scaleX, u.scaleY, l.scaleX, l.scaleY, p, f),
      (u = l = null),
      function (d) {
        for (var m = -1, _ = f.length, k; ++m < _; ) p[(k = f[m]).i] = k.x(d);
        return p.join("");
      }
    );
  };
}
var Zr = kn(Jr, "px, ", "px)", "deg)"),
  jr = kn(Qr, ", ", ")", ")"),
  U = 0,
  z = 0,
  Y = 0,
  On = 1e3,
  dt,
  W,
  gt = 0,
  H = 0,
  yt = 0,
  tt = typeof performance == "object" && performance.now ? performance : Date,
  Cn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Lt() {
  return H || (Cn(ti), (H = tt.now() + yt));
}
function ti() {
  H = 0;
}
function mt() {
  this._call = this._time = this._next = null;
}
mt.prototype = Gn.prototype = {
  constructor: mt,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Lt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        W !== this &&
        (W ? (W._next = this) : (dt = this), (W = this)),
      (this._call = t),
      (this._time = e),
      Ct();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Ct());
  },
};
function Gn(t, n, e) {
  var r = new mt();
  return r.restart(t, n, e), r;
}
function ni() {
  Lt(), ++U;
  for (var t = dt, n; t; )
    (n = H - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --U;
}
function an() {
  (H = (gt = tt.now()) + yt), (U = z = 0);
  try {
    ni();
  } finally {
    (U = 0), ri(), (H = 0);
  }
}
function ei() {
  var t = tt.now(),
    n = t - gt;
  n > On && ((yt -= n), (gt = t));
}
function ri() {
  for (var t, n = dt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (dt = e)));
  (W = t), Ct(r);
}
function Ct(t) {
  if (!U) {
    z && (z = clearTimeout(z));
    var n = t - H;
    n > 24
      ? (t < 1 / 0 && (z = setTimeout(an, t - tt.now() - yt)),
        Y && (Y = clearInterval(Y)))
      : (Y || ((gt = tt.now()), (Y = setInterval(ei, On))), (U = 1), Cn(an));
  }
}
function un(t, n, e) {
  var r = new mt();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        r.stop(), t(i + n);
      },
      n,
      e
    ),
    r
  );
}
var ii = $t("start", "end", "cancel", "interrupt"),
  oi = [],
  Tn = 0,
  ln = 1,
  Gt = 2,
  ut = 3,
  fn = 4,
  Tt = 5,
  lt = 6;
function vt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  si(t, e, {
    name: n,
    index: r,
    group: i,
    on: ii,
    tween: oi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Tn,
  });
}
function Ht(t, n) {
  var e = N(t, n);
  if (e.state > Tn) throw new Error("too late; already scheduled");
  return e;
}
function A(t, n) {
  var e = N(t, n);
  if (e.state > ut) throw new Error("too late; already running");
  return e;
}
function N(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function si(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Gn(o, 0, e.time));
  function o(u) {
    (e.state = ln),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= u && s(u - e.delay);
  }
  function s(u) {
    var l, p, f, d;
    if (e.state !== ln) return a();
    for (l in r)
      if (((d = r[l]), d.name === e.name)) {
        if (d.state === ut) return un(s);
        d.state === fn
          ? ((d.state = lt),
            d.timer.stop(),
            d.on.call("interrupt", t, t.__data__, d.index, d.group),
            delete r[l])
          : +l < n &&
            ((d.state = lt),
            d.timer.stop(),
            d.on.call("cancel", t, t.__data__, d.index, d.group),
            delete r[l]);
      }
    if (
      (un(function () {
        e.state === ut &&
          ((e.state = fn), e.timer.restart(c, e.delay, e.time), c(u));
      }),
      (e.state = Gt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Gt)
    ) {
      for (
        e.state = ut, i = new Array((f = e.tween.length)), l = 0, p = -1;
        l < f;
        ++l
      )
        (d = e.tween[l].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++p] = d);
      i.length = p + 1;
    }
  }
  function c(u) {
    for (
      var l =
          u < e.duration
            ? e.ease.call(null, u / e.duration)
            : (e.timer.restart(a), (e.state = Tt), 1),
        p = -1,
        f = i.length;
      ++p < f;

    )
      i[p].call(t, l);
    e.state === Tt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = lt), e.timer.stop(), delete r[n];
    for (var u in r) return;
    delete t.__transition;
  }
}
function ci(t, n) {
  var e = t.__transition,
    r,
    i,
    o = !0,
    s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      (i = r.state > Gt && r.state < Tt),
        (r.state = lt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function ai(t) {
  return this.each(function () {
    ci(this, t);
  });
}
function ui(t, n) {
  var e, r;
  return function () {
    var i = A(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          (r = r.slice()), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function li(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = A(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, u = i.length; a < u; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === u && i.push(c);
    }
    o.tween = i;
  };
}
function fi(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = N(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? ui : li)(e, t, n));
}
function Bt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = A(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return N(i, r).value[n];
    }
  );
}
function $n(t, n) {
  var e;
  return (
    typeof n == "number"
      ? T
      : n instanceof j
      ? sn
      : (e = j(n))
      ? ((n = e), sn)
      : Kr
  )(t, n);
}
function hi(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function pi(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function di(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function gi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function mi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function _i(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function yi(t, n) {
  var e = _t(t),
    r = e === "transform" ? jr : $n;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? _i : mi)(e, r, Bt(this, "attr." + t, n))
      : n == null
      ? (e.local ? pi : hi)(e)
      : (e.local ? gi : di)(e, r, n)
  );
}
function vi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function xi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function wi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && xi(t, o)), e;
  }
  return (i._value = n), i;
}
function bi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && vi(t, o)), e;
  }
  return (i._value = n), i;
}
function Ii(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = _t(t);
  return this.tween(e, (r.local ? wi : bi)(r, n));
}
function Ei(t, n) {
  return function () {
    Ht(this, t).delay = +n.apply(this, arguments);
  };
}
function Ni(t, n) {
  return (
    (n = +n),
    function () {
      Ht(this, t).delay = n;
    }
  );
}
function Si(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Ei : Ni)(n, t))
    : N(this.node(), n).delay;
}
function Pi(t, n) {
  return function () {
    A(this, t).duration = +n.apply(this, arguments);
  };
}
function Ai(t, n) {
  return (
    (n = +n),
    function () {
      A(this, t).duration = n;
    }
  );
}
function ki(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Pi : Ai)(n, t))
    : N(this.node(), n).duration;
}
function Oi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    A(this, t).ease = n;
  };
}
function Ci(t) {
  var n = this._id;
  return arguments.length ? this.each(Oi(n, t)) : N(this.node(), n).ease;
}
function Gi(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    A(this, t).ease = e;
  };
}
function Ti(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Gi(this._id, t));
}
function $i(t) {
  typeof t != "function" && (t = dn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, u = 0; u < s; ++u)
      (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
  return new C(r, this._parents, this._name, this._id);
}
function Mi(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var n = this._groups,
      e = t._groups,
      r = n.length,
      i = e.length,
      o = Math.min(r, i),
      s = new Array(r),
      c = 0;
    c < o;
    ++c
  )
    for (
      var a = n[c], u = e[c], l = a.length, p = (s[c] = new Array(l)), f, d = 0;
      d < l;
      ++d
    )
      (f = a[d] || u[d]) && (p[d] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new C(s, this._parents, this._name, this._id);
}
function Ri(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Di(t, n, e) {
  var r,
    i,
    o = Ri(n) ? Ht : A;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function Li(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? N(this.node(), e).on.on(t)
    : this.each(Di(e, t, n));
}
function Hi(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function Bi() {
  return this.on("end.remove", Hi(this._id));
}
function Fi(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Mt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, u = (o[s] = new Array(a)), l, p, f = 0;
      f < a;
      ++f
    )
      (l = c[f]) &&
        (p = t.call(l, l.__data__, f, c)) &&
        ("__data__" in l && (p.__data__ = l.__data__),
        (u[f] = p),
        vt(u[f], n, e, f, u, N(l, e)));
  return new C(o, this._parents, n, e);
}
function Xi(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = pn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], u = a.length, l, p = 0; p < u; ++p)
      if ((l = a[p])) {
        for (
          var f = t.call(l, l.__data__, p, a),
            d,
            m = N(l, e),
            _ = 0,
            k = f.length;
          _ < k;
          ++_
        )
          (d = f[_]) && vt(d, n, e, _, f, m);
        o.push(f), s.push(l);
      }
  return new C(o, s, n, e);
}
var Vi = nt.prototype.constructor;
function qi() {
  return new Vi(this._groups, this._parents);
}
function Ui(t, n) {
  var e, r, i;
  return function () {
    var o = q(this, t),
      s = (this.style.removeProperty(t), q(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Mn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Yi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = q(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function zi(t, n, e) {
  var r, i, o;
  return function () {
    var s = q(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), q(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function Wi(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = A(this, t),
      u = a.on,
      l = a.value[o] == null ? c || (c = Mn(n)) : void 0;
    (u !== e || i !== l) && (r = (e = u).copy()).on(s, (i = l)), (a.on = r);
  };
}
function Ki(t, n, e) {
  var r = (t += "") == "transform" ? Zr : $n;
  return n == null
    ? this.styleTween(t, Ui(t, r)).on("end.style." + t, Mn(t))
    : typeof n == "function"
    ? this.styleTween(t, zi(t, r, Bt(this, "style." + t, n))).each(
        Wi(this._id, t)
      )
    : this.styleTween(t, Yi(t, r, n), e).on("end.style." + t, null);
}
function Ji(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Qi(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Ji(t, s, e)), r;
  }
  return (o._value = n), o;
}
function Zi(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Qi(t, n, e ?? ""));
}
function ji(t) {
  return function () {
    this.textContent = t;
  };
}
function to(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function no(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? to(Bt(this, "text", t))
      : ji(t == null ? "" : t + "")
  );
}
function eo(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function ro(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && eo(i)), n;
  }
  return (r._value = t), r;
}
function io(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, ro(t));
}
function oo() {
  for (
    var t = this._name,
      n = this._id,
      e = Rn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, u = 0; u < c; ++u)
      if ((a = s[u])) {
        var l = N(a, n);
        vt(a, t, e, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease,
        });
      }
  return new C(r, this._parents, t, e);
}
function so() {
  var t,
    n,
    e = this,
    r = e._id,
    i = e.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      a = {
        value: function () {
          --i === 0 && o();
        },
      };
    e.each(function () {
      var u = A(this, r),
        l = u.on;
      l !== t &&
        ((n = (t = l).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (u.on = n);
    }),
      i === 0 && o();
  });
}
var co = 0;
function C(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Rn() {
  return ++co;
}
var O = nt.prototype;
C.prototype = {
  constructor: C,
  select: Fi,
  selectAll: Xi,
  selectChild: O.selectChild,
  selectChildren: O.selectChildren,
  filter: $i,
  merge: Mi,
  selection: qi,
  transition: oo,
  call: O.call,
  nodes: O.nodes,
  node: O.node,
  size: O.size,
  empty: O.empty,
  each: O.each,
  on: Li,
  attr: yi,
  attrTween: Ii,
  style: Ki,
  styleTween: Zi,
  text: no,
  textTween: io,
  remove: Bi,
  tween: fi,
  delay: Si,
  duration: ki,
  ease: Ci,
  easeVarying: Ti,
  end: so,
  [Symbol.iterator]: O[Symbol.iterator],
};
function ao(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var uo = { time: null, delay: 0, duration: 250, ease: ao };
function lo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function fo(t) {
  var n, e;
  t instanceof C
    ? ((n = t._id), (t = t._name))
    : ((n = Rn()), ((e = uo).time = Lt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, u = 0; u < c; ++u)
      (a = s[u]) && vt(a, t, n, u, s, e || lo(a, n));
  return new C(r, this._parents, t, n);
}
nt.prototype.interrupt = ai;
nt.prototype.transition = fo;
function ho(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function po(t, n) {
  return fetch(t, n).then(ho);
}
function go(t) {
  return (n, e) => po(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const mo = go("application/xml");
function K(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
K.prototype = {
  constructor: K,
  scale: function (t) {
    return t === 1 ? this : new K(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new K(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function (t) {
    return t * this.k + this.x;
  },
  applyY: function (t) {
    return t * this.k + this.y;
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function (t) {
    return (t - this.x) / this.k;
  },
  invertY: function (t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
K.prototype;
class _o {
  constructor(n, e, r, i) {
    zt(this, "dragged", (n) => {
      console.log(n),
        this.sensor.attr(
          "transform",
          "translate(" +
            [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
            ") scale(" +
            this.scale +
            ")"
        );
    });
    (this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (I("#" + this.id).node() != null) return;
    const n = await mo(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr("transform", "translate(" + [0, 0] + ") scale(" + this.scale + ")")
      .attr("id", this.id)),
      this.sensor.node().append(I(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          Cr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    I(this).raise().classed("active", !0);
  }
  dragended(n) {
    I(this).classed("active", !1);
  }
}
const Ft = [
    "connector0pin-0",
    "connector1pin-1",
    "connector2pin-3",
    "connector3pin-7",
    "connector4pin-4",
    "connector5pin-1",
    "connector6pin-1",
    "connector7pin-3",
    "connector8pin-0",
    "connector9pin-3",
    "connector10pin-2",
    "connector11pin-1",
    "connector12pin-7",
    "connector13pin-5",
    "connector14pin-6",
    "connector15pin-5",
    "connector16pin-4",
    "connector17pin-2",
    "connector18pin-2",
    "connector19pin-1",
    "connector20pin-7",
    "connector21pin-2",
    "connector22pin-4",
    "connector23pin-1",
    "connector24pin-6",
    "connector25pin-5",
    "connector26pin-7",
    "connector27pin-8",
    "connector28pin-5",
    "connector29pin-9",
    "connector30pin-2",
    "connector31pin-7",
    "connector32pin-3",
    "connector33pin-6",
    "connector34pin-4",
    "connector35pin-7",
    "connector36pin-9",
    "connector37pin-7",
    "connector38pin-2",
    "connector39pin-2",
    "_x30_.1.0.220.2.3-0",
    "_x30_.1.0.221.0.5.13-6",
    "_x30_.1.0.224.0.10_1_-3",
    "_x30_.1.0.223.0.0.1.12-2",
    "_x30_.1.0.224.0.10-7",
    "_x30_.1.0.226.0.1",
    "_x30_.1.0.227.1",
  ],
  yo = {
    "connector0pin-0": "3.3v",
    "connector1pin-1": "GPIO 2",
    "connector2pin-3": "GPIO 3",
    "connector3pin-7": "GPIO 4",
    "connector4pin-4": "GND",
    "connector5pin-1": "GPIO 17",
    "connector6pin-1": "GPIO 27",
    "connector7pin-3": "GPIO 22",
    "connector8pin-0": "3.3v",
    "connector9pin-3": "GPIO 10",
    "connector10pin-2": "GPIO 9",
    "connector11pin-1": "GPIO 11",
    "connector12pin-7": "GND",
    "connector13pin-5": "RESERVED",
    "connector14pin-6": "GPIO 5",
    "connector15pin-5": "GPIO 6",
    "connector16pin-4": "GPIO 13",
    "connector17pin-2": "GPIO 19",
    "connector18pin-2": "GPIO 26",
    "connector19pin-1": "GND",
    "connector20pin-7": "GPIO 21",
    "connector21pin-2": "GPIO 20",
    "connector22pin-4": "GPIO 16",
    "connector23pin-1": "GND",
    "connector24pin-6": "GPIO 12",
    "connector25pin-5": "GND",
    "connector26pin-7": "RESERVED",
    "connector27pin-8": "GPIO 7",
    "connector28pin-5": "GPIO 8",
    "connector29pin-9": "GPIO 25",
    "connector30pin-2": "GND",
    "connector31pin-7": "GPIO 24",
    "connector32pin-3": "GPIO 23",
    "connector33pin-6": "GND",
    "connector34pin-4": "GPIO 18",
    "connector35pin-7": "UART 0 RX",
    "connector36pin-9": "UART 0 TX",
    "connector37pin-7": "GND",
    "connector38pin-2": "5V PWR",
    "connector39pin-2": "5V PWR",
    "_x30_.1.0.220.2.3-0": "HDMI",
    "_x30_.1.0.221.0.5.13-6": "Power",
    "_x30_.1.0.223.0.0.1.12-2": "Ethernet",
    "_x30_.1.0.224.0.10-7": "USB 0",
    "_x30_.1.0.224.0.10_1_-3": "USB 1",
    "_x30_.1.0.226.0.1": "CSI Camera",
    "_x30_.1.0.227.1": "DSI Display",
  },
  vo = {
    "connector0pin-0":
      "Provides 3.3V power for components like sensors and LEDs.",
    "connector1pin-1":
      "General-purpose I/O pin, used for digital input/output (e.g., buttons, LEDs).",
    "connector2pin-3":
      "General-purpose I/O pin, supports I2C (SDA) for communication with devices.",
    "connector3pin-7":
      "General-purpose I/O pin, used for digital input/output or simple circuits.",
    "connector4pin-4":
      "Ground pin for completing circuits, connects to negative terminal.",
    "connector5pin-1":
      "General-purpose I/O pin, suitable for controlling devices like relays.",
    "connector6pin-1":
      "General-purpose I/O pin, used for digital signals in projects.",
    "connector7pin-3":
      "General-purpose I/O pin, often used for LEDs or switches.",
    "connector8pin-0": "Provides 3.3V power for low-power components.",
    "connector9pin-3":
      "General-purpose I/O pin, supports SPI (MOSI) for fast data transfer.",
    "connector10pin-2":
      "General-purpose I/O pin, supports SPI (MISO) for device communication.",
    "connector11pin-1":
      "General-purpose I/O pin, supports SPI (SCLK) for clock signals.",
    "connector12pin-7":
      "Ground pin for circuit grounding, essential for stable operation.",
    "connector13pin-5":
      "Reserved pin, typically not used in standard projects.",
    "connector14pin-6":
      "General-purpose I/O pin, used for digital input/output tasks.",
    "connector15pin-5":
      "General-purpose I/O pin, suitable for sensors or actuators.",
    "connector16pin-4":
      "General-purpose I/O pin, supports PWM for motor control.",
    "connector17pin-2":
      "General-purpose I/O pin, supports SPI for peripheral communication.",
    "connector18pin-2":
      "General-purpose I/O pin, often used for digital signals.",
    "connector19pin-1":
      "Ground pin, used to complete circuits with components.",
    "connector20pin-7":
      "General-purpose I/O pin, suitable for advanced projects.",
    "connector21pin-2":
      "General-purpose I/O pin, used for digital input/output.",
    "connector22pin-4":
      "General-purpose I/O pin, supports digital signals or PWM.",
    "connector23pin-1": "Ground pin for grounding circuits, ensures safety.",
    "connector24pin-6":
      "General-purpose I/O pin, supports PWM for analog-like outputs.",
    "connector25pin-5": "Ground pin, connects to negative side of components.",
    "connector26pin-7": "Reserved pin, not typically used in general projects.",
    "connector27pin-8":
      "General-purpose I/O pin, supports I2C (SCL) for device communication.",
    "connector28pin-5":
      "General-purpose I/O pin, used for digital signals or SPI (CE0).",
    "connector29pin-9":
      "General-purpose I/O pin, often used for simple circuits.",
    "connector30pin-2":
      "Ground pin for circuit completion, ensures stable voltage.",
    "connector31pin-7":
      "General-purpose I/O pin, suitable for sensors or LEDs.",
    "connector32pin-3":
      "General-purpose I/O pin, used for digital input/output.",
    "connector33pin-6":
      "Ground pin, essential for grounding electronic circuits.",
    "connector34pin-4":
      "General-purpose I/O pin, supports PWM for motor or LED control.",
    "connector35pin-7":
      "Receives serial data for UART communication with devices.",
    "connector36pin-9":
      "Transmits serial data for UART communication with peripherals.",
    "connector37pin-7": "Ground pin, used to complete circuits safely.",
    "connector38pin-2":
      "Provides 5V power for components requiring higher voltage.",
    "connector39pin-2":
      "Provides 5V power for peripherals like motors or displays.",
    "_x30_.1.0.220.2.3-0": "Connects to HDMI displays for video output.",
    "_x30_.1.0.221.0.5.13-6":
      "Power input for the Raspberry Pi, typically micro-USB or USB-C.",
    "_x30_.1.0.223.0.0.1.12-2":
      "Connects to Ethernet for wired network communication.",
    "_x30_.1.0.224.0.10-7":
      "USB port for connecting peripherals like keyboards or storage.",
    "_x30_.1.0.224.0.10_1_-3": "Second USB port for additional peripherals.",
    "_x30_.1.0.226.0.1":
      "Connects to camera modules for capturing images or video.",
    "_x30_.1.0.227.1":
      "Connects to display modules for touchscreen or LCD output.",
  };
class xo {
  constructor(n, e, r, i) {
    (this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        });
  }
  throw(n, e) {
    (document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e);
  }
}
const B = I("#svg")
  .append("svg")
  .attr("id", "svgContainer")
  .attr("height", () => {
    const t = document.getElementById("svg");
    return Math.max(400, t.offsetHeight);
  })
  .attr("width", () => {
    const t = document.getElementById("svg");
    return Math.max(300, t.offsetWidth);
  });
console.log("SVG Container Initialized:", B.node());
window.addEventListener("resize", () => {
  const t = document.getElementById("svg");
  B.attr("height", Math.max(400, t.offsetHeight)).attr(
    "width",
    Math.max(300, t.offsetWidth)
  ),
    console.log("SVG Resized:", {
      height: t.offsetHeight,
      width: t.offsetWidth,
    });
});
const wo = new _o("raspberry", B, "images/pi3dirk.svg", 1.3, !1),
  Xt = document.getElementById("rasberryPi"),
  Dn = document.getElementById("displayInfo"),
  $ = document.getElementById("componentDescription"),
  bo =
    "Raspberry Pi: A small single-board computer for learning and prototyping. Use the terminal to install and configure software packages for various applications.";
Xt.addEventListener("click", async () => {
  console.log("Raspberry Pi clicked, loading SVG..."), await wo.load();
  const t = document.getElementById("svg");
  B.attr("height", Math.max(400, t.offsetHeight)).attr(
    "width",
    Math.max(300, t.offsetWidth)
  ),
    Ft.forEach((n) => {
      I(`#${n}`).classed("pi-pin", !0).style("fill", "#808080");
    }),
    console.log("SVG Loaded:", {
      height: t.offsetHeight,
      width: t.offsetWidth,
      svgContent: B.node().innerHTML,
    });
});
Xt.addEventListener("mouseover", () => {
  ($.innerHTML = bo),
    ($.style.display = "block"),
    console.log("Displaying Raspberry Pi description");
});
Xt.addEventListener("mouseout", () => {
  ($.innerHTML = "Hover over a component to see its description."),
    ($.style.display = "none"),
    console.log("Cleared component description");
});
B.on("mouseover touchstart", (t) => {
  var e, r;
  t.preventDefault();
  const n =
    ((e = t.target) == null ? void 0 : e.id) ||
    ((r = t.srcElement) == null ? void 0 : r.id);
  if (Ft.includes(n)) {
    const i = yo[n] || "Unknown Pin",
      o = vo[n] || "No usage information available.";
    (Dn.innerHTML = i),
      ($.innerHTML = `<strong>${i}</strong>: ${o}`),
      ($.style.display = "block"),
      I(`#${n}`).classed("pi-pin-highlight", !0),
      console.log("Pin info displayed:", { id: n, name: i, usage: o });
  }
});
B.on("mouseout touchend", (t) => {
  var e, r;
  const n =
    ((e = t.target) == null ? void 0 : e.id) ||
    ((r = t.srcElement) == null ? void 0 : r.id);
  Ft.includes(n) &&
    ((Dn.innerHTML = "CONNECTOR INFO"),
    ($.innerHTML = "Hover over a component to see its description."),
    ($.style.display = "none"),
    I(`#${n}`).classed("pi-pin-highlight", !1),
    console.log("Cleared pin info and highlight"));
});
new xo("errorBox", "errorHeading", "errorText", "closeErrorBox");

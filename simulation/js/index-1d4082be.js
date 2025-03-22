var Kn = Object.defineProperty;
var Wn = (t, n, e) =>
    n in t
        ? Kn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
        : (t[n] = e);
var jt = (t, n, e) => (Wn(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var Zn = { value: () => { } };
function Bt() {
    for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
        if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
            throw new Error("illegal type: " + r);
        e[r] = [];
    }
    return new ht(e);
}
function ht(t) {
    this._ = t;
}
function Qn(t, n) {
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
ht.prototype = Bt.prototype = {
    constructor: ht,
    on: function (t, n) {
        var e = this._,
            r = Qn(t + "", e),
            i,
            o = -1,
            s = r.length;
        if (arguments.length < 2) {
            for (; ++o < s;)
                if ((i = (t = r[o]).type) && (i = Jn(e[i], t.name))) return i;
            return;
        }
        if (n != null && typeof n != "function")
            throw new Error("invalid callback: " + n);
        for (; ++o < s;)
            if ((i = (t = r[o]).type)) e[i] = tn(e[i], t.name, n);
            else if (n == null) for (i in e) e[i] = tn(e[i], t.name, null);
        return this;
    },
    copy: function () {
        var t = {},
            n = this._;
        for (var e in n) t[e] = n[e].slice();
        return new ht(t);
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
function Jn(t, n) {
    for (var e = 0, r = t.length, i; e < r; ++e)
        if ((i = t[e]).name === n) return i.value;
}
function tn(t, n, e) {
    for (var r = 0, i = t.length; r < i; ++r)
        if (t[r].name === n) {
            (t[r] = Zn), (t = t.slice(0, r).concat(t.slice(r + 1)));
            break;
        }
    return e != null && t.push({ name: n, value: e }), t;
}
var Tt = "http://www.w3.org/1999/xhtml";
const nn = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: Tt,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
};
function vt(t) {
    var n = (t += ""),
        e = n.indexOf(":");
    return (
        e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
        nn.hasOwnProperty(n) ? { space: nn[n], local: t } : t
    );
}
function jn(t) {
    return function () {
        var n = this.ownerDocument,
            e = this.namespaceURI;
        return e === Tt && n.documentElement.namespaceURI === Tt
            ? n.createElement(t)
            : n.createElementNS(e, t);
    };
}
function te(t) {
    return function () {
        return this.ownerDocument.createElementNS(t.space, t.local);
    };
}
function wn(t) {
    var n = vt(t);
    return (n.local ? te : jn)(n);
}
function ne() { }
function qt(t) {
    return t == null
        ? ne
        : function () {
            return this.querySelector(t);
        };
}
function ee(t) {
    typeof t != "function" && (t = qt(t));
    for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (
            var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, u, l = 0;
            l < s;
            ++l
        )
            (a = o[l]) &&
                (u = t.call(a, a.__data__, l, o)) &&
                ("__data__" in a && (u.__data__ = a.__data__), (c[l] = u));
    return new v(r, this._parents);
}
function re(t) {
    return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ie() {
    return [];
}
function vn(t) {
    return t == null
        ? ie
        : function () {
            return this.querySelectorAll(t);
        };
}
function oe(t) {
    return function () {
        return re(t.apply(this, arguments));
    };
}
function se(t) {
    typeof t == "function" ? (t = oe(t)) : (t = vn(t));
    for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
        for (var s = n[o], c = s.length, a, u = 0; u < c; ++u)
            (a = s[u]) && (r.push(t.call(a, a.__data__, u, s)), i.push(a));
    return new v(r, i);
}
function bn(t) {
    return function () {
        return this.matches(t);
    };
}
function $n(t) {
    return function (n) {
        return n.matches(t);
    };
}
var ce = Array.prototype.find;
function ae(t) {
    return function () {
        return ce.call(this.children, t);
    };
}
function ue() {
    return this.firstElementChild;
}
function le(t) {
    return this.select(t == null ? ue : ae(typeof t == "function" ? t : $n(t)));
}
var fe = Array.prototype.filter;
function he() {
    return Array.from(this.children);
}
function de(t) {
    return function () {
        return fe.call(this.children, t);
    };
}
function pe(t) {
    return this.selectAll(
        t == null ? he : de(typeof t == "function" ? t : $n(t))
    );
}
function ge(t) {
    typeof t != "function" && (t = bn(t));
    for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (var o = n[i], s = o.length, c = (r[i] = []), a, u = 0; u < s; ++u)
            (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
    return new v(r, this._parents);
}
function En(t) {
    return new Array(t.length);
}
function _e() {
    return new v(this._enter || this._groups.map(En), this._parents);
}
function gt(t, n) {
    (this.ownerDocument = t.ownerDocument),
        (this.namespaceURI = t.namespaceURI),
        (this._next = null),
        (this._parent = t),
        (this.__data__ = n);
}
gt.prototype = {
    constructor: gt,
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
function me(t) {
    return function () {
        return t;
    };
}
function ye(t, n, e, r, i, o) {
    for (var s = 0, c, a = n.length, u = o.length; s < u; ++s)
        (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new gt(t, o[s]));
    for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function xe(t, n, e, r, i, o, s) {
    var c,
        a,
        u = new Map(),
        l = n.length,
        h = o.length,
        f = new Array(l),
        p;
    for (c = 0; c < l; ++c)
        (a = n[c]) &&
            ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
                u.has(p) ? (i[c] = a) : u.set(p, a));
    for (c = 0; c < h; ++c)
        (p = s.call(t, o[c], c, o) + ""),
            (a = u.get(p))
                ? ((r[c] = a), (a.__data__ = o[c]), u.delete(p))
                : (e[c] = new gt(t, o[c]));
    for (c = 0; c < l; ++c) (a = n[c]) && u.get(f[c]) === a && (i[c] = a);
}
function we(t) {
    return t.__data__;
}
function ve(t, n) {
    if (!arguments.length) return Array.from(this, we);
    var e = n ? xe : ye,
        r = this._parents,
        i = this._groups;
    typeof t != "function" && (t = me(t));
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
            h = i[u],
            f = h.length,
            p = be(t.call(l, l && l.__data__, u, r)),
            _ = p.length,
            m = (c[u] = new Array(_)),
            $ = (s[u] = new Array(_)),
            F = (a[u] = new Array(f));
        e(l, h, m, $, F, p, n);
        for (var I = 0, A = 0, d, g; I < _; ++I)
            if ((d = m[I])) {
                for (I >= A && (A = I + 1); !(g = $[A]) && ++A < _;);
                d._next = g || null;
            }
    }
    return (s = new v(s, r)), (s._enter = c), (s._exit = a), s;
}
function be(t) {
    return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function $e() {
    return new v(this._exit || this._groups.map(En), this._parents);
}
function Ee(t, n, e) {
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
function Ne(t) {
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
            var u = e[a], l = r[a], h = u.length, f = (c[a] = new Array(h)), p, _ = 0;
            _ < h;
            ++_
        )
            (p = u[_] || l[_]) && (f[_] = p);
    for (; a < i; ++a) c[a] = e[a];
    return new v(c, this._parents);
}
function Ie() {
    for (var t = this._groups, n = -1, e = t.length; ++n < e;)
        for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0;)
            (s = r[i]) &&
                (o &&
                    s.compareDocumentPosition(o) ^ 4 &&
                    o.parentNode.insertBefore(s, o),
                    (o = s));
    return this;
}
function Ae(t) {
    t || (t = Ce);
    function n(h, f) {
        return h && f ? t(h.__data__, f.__data__) : !h - !f;
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
    return new v(i, this._parents).order();
}
function Ce(t, n) {
    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Te() {
    var t = arguments[0];
    return (arguments[0] = this), t.apply(null, arguments), this;
}
function ke() {
    return Array.from(this);
}
function Se() {
    for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
        for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
            var s = r[i];
            if (s) return s;
        }
    return null;
}
function Me() {
    let t = 0;
    for (const n of this) ++t;
    return t;
}
function Pe() {
    return !this.node();
}
function Re(t) {
    for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
        for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
            (c = i[o]) && t.call(c, c.__data__, o, i);
    return this;
}
function Oe(t) {
    return function () {
        this.removeAttribute(t);
    };
}
function Le(t) {
    return function () {
        this.removeAttributeNS(t.space, t.local);
    };
}
function Ge(t, n) {
    return function () {
        this.setAttribute(t, n);
    };
}
function De(t, n) {
    return function () {
        this.setAttributeNS(t.space, t.local, n);
    };
}
function Xe(t, n) {
    return function () {
        var e = n.apply(this, arguments);
        e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
    };
}
function He(t, n) {
    return function () {
        var e = n.apply(this, arguments);
        e == null
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, e);
    };
}
function Be(t, n) {
    var e = vt(t);
    if (arguments.length < 2) {
        var r = this.node();
        return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
    }
    return this.each(
        (n == null
            ? e.local
                ? Le
                : Oe
            : typeof n == "function"
                ? e.local
                    ? He
                    : Xe
                : e.local
                    ? De
                    : Ge)(e, n)
    );
}
function Nn(t) {
    return (
        (t.ownerDocument && t.ownerDocument.defaultView) ||
        (t.document && t) ||
        t.defaultView
    );
}
function qe(t) {
    return function () {
        this.style.removeProperty(t);
    };
}
function Fe(t, n, e) {
    return function () {
        this.style.setProperty(t, n, e);
    };
}
function Ye(t, n, e) {
    return function () {
        var r = n.apply(this, arguments);
        r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
    };
}
function Ve(t, n, e) {
    return arguments.length > 1
        ? this.each(
            (n == null ? qe : typeof n == "function" ? Ye : Fe)(t, n, e ?? "")
        )
        : U(this.node(), t);
}
function U(t, n) {
    return (
        t.style.getPropertyValue(n) ||
        Nn(t).getComputedStyle(t, null).getPropertyValue(n)
    );
}
function ze(t) {
    return function () {
        delete this[t];
    };
}
function Ue(t, n) {
    return function () {
        this[t] = n;
    };
}
function Ke(t, n) {
    return function () {
        var e = n.apply(this, arguments);
        e == null ? delete this[t] : (this[t] = e);
    };
}
function We(t, n) {
    return arguments.length > 1
        ? this.each((n == null ? ze : typeof n == "function" ? Ke : Ue)(t, n))
        : this.node()[t];
}
function In(t) {
    return t.trim().split(/^|\s+/);
}
function Ft(t) {
    return t.classList || new An(t);
}
function An(t) {
    (this._node = t), (this._names = In(t.getAttribute("class") || ""));
}
An.prototype = {
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
function Cn(t, n) {
    for (var e = Ft(t), r = -1, i = n.length; ++r < i;) e.add(n[r]);
}
function Tn(t, n) {
    for (var e = Ft(t), r = -1, i = n.length; ++r < i;) e.remove(n[r]);
}
function Ze(t) {
    return function () {
        Cn(this, t);
    };
}
function Qe(t) {
    return function () {
        Tn(this, t);
    };
}
function Je(t, n) {
    return function () {
        (n.apply(this, arguments) ? Cn : Tn)(this, t);
    };
}
function je(t, n) {
    var e = In(t + "");
    if (arguments.length < 2) {
        for (var r = Ft(this.node()), i = -1, o = e.length; ++i < o;)
            if (!r.contains(e[i])) return !1;
        return !0;
    }
    return this.each((typeof n == "function" ? Je : n ? Ze : Qe)(e, n));
}
function tr() {
    this.textContent = "";
}
function nr(t) {
    return function () {
        this.textContent = t;
    };
}
function er(t) {
    return function () {
        var n = t.apply(this, arguments);
        this.textContent = n ?? "";
    };
}
function rr(t) {
    return arguments.length
        ? this.each(t == null ? tr : (typeof t == "function" ? er : nr)(t))
        : this.node().textContent;
}
function ir() {
    this.innerHTML = "";
}
function or(t) {
    return function () {
        this.innerHTML = t;
    };
}
function sr(t) {
    return function () {
        var n = t.apply(this, arguments);
        this.innerHTML = n ?? "";
    };
}
function cr(t) {
    return arguments.length
        ? this.each(t == null ? ir : (typeof t == "function" ? sr : or)(t))
        : this.node().innerHTML;
}
function ar() {
    this.nextSibling && this.parentNode.appendChild(this);
}
function ur() {
    return this.each(ar);
}
function lr() {
    this.previousSibling &&
        this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function fr() {
    return this.each(lr);
}
function hr(t) {
    var n = typeof t == "function" ? t : wn(t);
    return this.select(function () {
        return this.appendChild(n.apply(this, arguments));
    });
}
function dr() {
    return null;
}
function pr(t, n) {
    var e = typeof t == "function" ? t : wn(t),
        r = n == null ? dr : typeof n == "function" ? n : qt(n);
    return this.select(function () {
        return this.insertBefore(
            e.apply(this, arguments),
            r.apply(this, arguments) || null
        );
    });
}
function gr() {
    var t = this.parentNode;
    t && t.removeChild(this);
}
function _r() {
    return this.each(gr);
}
function mr() {
    var t = this.cloneNode(!1),
        n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
}
function yr() {
    var t = this.cloneNode(!0),
        n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
}
function xr(t) {
    return this.select(t ? yr : mr);
}
function wr(t) {
    return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function vr(t) {
    return function (n) {
        t.call(this, n, this.__data__);
    };
}
function br(t) {
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
function $r(t) {
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
function Er(t, n, e) {
    return function () {
        var r = this.__on,
            i,
            o = vr(n);
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
function Nr(t, n, e) {
    var r = br(t + ""),
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
    for (c = n ? Er : $r, i = 0; i < o; ++i) this.each(c(r[i], n, e));
    return this;
}
function kn(t, n, e) {
    var r = Nn(t),
        i = r.CustomEvent;
    typeof i == "function"
        ? (i = new i(n, e))
        : ((i = r.document.createEvent("Event")),
            e
                ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
                : i.initEvent(n, !1, !1)),
        t.dispatchEvent(i);
}
function Ir(t, n) {
    return function () {
        return kn(this, t, n);
    };
}
function Ar(t, n) {
    return function () {
        return kn(this, t, n.apply(this, arguments));
    };
}
function Cr(t, n) {
    return this.each((typeof n == "function" ? Ar : Ir)(t, n));
}
function* Tr() {
    for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
        for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
            (s = r[i]) && (yield s);
}
var Sn = [null];
function v(t, n) {
    (this._groups = t), (this._parents = n);
}
function ot() {
    return new v([[document.documentElement]], Sn);
}
function kr() {
    return this;
}
v.prototype = ot.prototype = {
    constructor: v,
    select: ee,
    selectAll: se,
    selectChild: le,
    selectChildren: pe,
    filter: ge,
    data: ve,
    enter: _e,
    exit: $e,
    join: Ee,
    merge: Ne,
    selection: kr,
    order: Ie,
    sort: Ae,
    call: Te,
    nodes: ke,
    node: Se,
    size: Me,
    empty: Pe,
    each: Re,
    attr: Be,
    style: Ve,
    property: We,
    classed: je,
    text: rr,
    html: cr,
    raise: ur,
    lower: fr,
    append: hr,
    insert: pr,
    remove: _r,
    clone: xr,
    datum: wr,
    on: Nr,
    dispatch: Cr,
    [Symbol.iterator]: Tr,
};
function P(t) {
    return typeof t == "string"
        ? new v([[document.querySelector(t)]], [document.documentElement])
        : new v([[t]], Sn);
}
function Sr(t) {
    let n;
    for (; (n = t.sourceEvent);) t = n;
    return t;
}
function en(t, n) {
    if (((t = Sr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Mr = { passive: !1 },
    tt = { capture: !0, passive: !1 };
function It(t) {
    t.stopImmediatePropagation();
}
function V(t) {
    t.preventDefault(), t.stopImmediatePropagation();
}
function Pr(t) {
    var n = t.document.documentElement,
        e = P(t).on("dragstart.drag", V, tt);
    "onselectstart" in n
        ? e.on("selectstart.drag", V, tt)
        : ((n.__noselect = n.style.MozUserSelect),
            (n.style.MozUserSelect = "none"));
}
function Rr(t, n) {
    var e = t.document.documentElement,
        r = P(t).on("dragstart.drag", null);
    n &&
        (r.on("click.drag", V, tt),
            setTimeout(function () {
                r.on("click.drag", null);
            }, 0)),
        "onselectstart" in e
            ? r.on("selectstart.drag", null)
            : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const at = (t) => () => t;
function kt(
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
kt.prototype.on = function () {
    var t = this._.on.apply(this._, arguments);
    return t === this._ ? this : t;
};
function Or(t) {
    return !t.ctrlKey && !t.button;
}
function Lr() {
    return this.parentNode;
}
function Gr(t, n) {
    return n ?? { x: t.x, y: t.y };
}
function Dr() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Xr() {
    var t = Or,
        n = Lr,
        e = Gr,
        r = Dr,
        i = {},
        o = Bt("start", "drag", "end"),
        s = 0,
        c,
        a,
        u,
        l,
        h = 0;
    function f(d) {
        d.on("mousedown.drag", p)
            .filter(r)
            .on("touchstart.drag", $)
            .on("touchmove.drag", F, Mr)
            .on("touchend.drag touchcancel.drag", I)
            .style("touch-action", "none")
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function p(d, g) {
        if (!(l || !t.call(this, d, g))) {
            var y = A(this, n.call(this, d, g), d, g, "mouse");
            y &&
                (P(d.view).on("mousemove.drag", _, tt).on("mouseup.drag", m, tt),
                    Pr(d.view),
                    It(d),
                    (u = !1),
                    (c = d.clientX),
                    (a = d.clientY),
                    y("start", d));
        }
    }
    function _(d) {
        if ((V(d), !u)) {
            var g = d.clientX - c,
                y = d.clientY - a;
            u = g * g + y * y > h;
        }
        i.mouse("drag", d);
    }
    function m(d) {
        P(d.view).on("mousemove.drag mouseup.drag", null),
            Rr(d.view, u),
            V(d),
            i.mouse("end", d);
    }
    function $(d, g) {
        if (t.call(this, d, g)) {
            var y = d.changedTouches,
                x = n.call(this, d, g),
                b = y.length,
                O,
                Y;
            for (O = 0; O < b; ++O)
                (Y = A(this, x, d, g, y[O].identifier, y[O])) &&
                    (It(d), Y("start", d, y[O]));
        }
    }
    function F(d) {
        var g = d.changedTouches,
            y = g.length,
            x,
            b;
        for (x = 0; x < y; ++x)
            (b = i[g[x].identifier]) && (V(d), b("drag", d, g[x]));
    }
    function I(d) {
        var g = d.changedTouches,
            y = g.length,
            x,
            b;
        for (
            l && clearTimeout(l),
            l = setTimeout(function () {
                l = null;
            }, 500),
            x = 0;
            x < y;
            ++x
        )
            (b = i[g[x].identifier]) && (It(d), b("end", d, g[x]));
    }
    function A(d, g, y, x, b, O) {
        var Y = o.copy(),
            C = en(O || y, g),
            Wt,
            Zt,
            ct;
        if (
            (ct = e.call(
                d,
                new kt("beforestart", {
                    sourceEvent: y,
                    target: f,
                    identifier: b,
                    active: s,
                    x: C[0],
                    y: C[1],
                    dx: 0,
                    dy: 0,
                    dispatch: Y,
                }),
                x
            )) != null
        )
            return (
                (Wt = ct.x - C[0] || 0),
                (Zt = ct.y - C[1] || 0),
                function zn(Et, Qt, Un) {
                    var Jt = C,
                        Nt;
                    switch (Et) {
                        case "start":
                            (i[b] = zn), (Nt = s++);
                            break;
                        case "end":
                            delete i[b], --s;
                        case "drag":
                            (C = en(Un || Qt, g)), (Nt = s);
                            break;
                    }
                    Y.call(
                        Et,
                        d,
                        new kt(Et, {
                            sourceEvent: Qt,
                            subject: ct,
                            target: f,
                            identifier: b,
                            active: Nt,
                            x: C[0] + Wt,
                            y: C[1] + Zt,
                            dx: C[0] - Jt[0],
                            dy: C[1] - Jt[1],
                            dispatch: Y,
                        }),
                        x
                    );
                }
            );
    }
    return (
        (f.filter = function (d) {
            return arguments.length
                ? ((t = typeof d == "function" ? d : at(!!d)), f)
                : t;
        }),
        (f.container = function (d) {
            return arguments.length
                ? ((n = typeof d == "function" ? d : at(d)), f)
                : n;
        }),
        (f.subject = function (d) {
            return arguments.length
                ? ((e = typeof d == "function" ? d : at(d)), f)
                : e;
        }),
        (f.touchable = function (d) {
            return arguments.length
                ? ((r = typeof d == "function" ? d : at(!!d)), f)
                : r;
        }),
        (f.on = function () {
            var d = o.on.apply(o, arguments);
            return d === o ? f : d;
        }),
        (f.clickDistance = function (d) {
            return arguments.length ? ((h = (d = +d) * d), f) : Math.sqrt(h);
        }),
        f
    );
}
function Yt(t, n, e) {
    (t.prototype = n.prototype = e), (e.constructor = t);
}
function Mn(t, n) {
    var e = Object.create(t.prototype);
    for (var r in n) e[r] = n[r];
    return e;
}
function st() { }
var nt = 0.7,
    _t = 1 / nt,
    z = "\\s*([+-]?\\d+)\\s*",
    et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    T = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    Hr = /^#([0-9a-f]{3,8})$/,
    Br = new RegExp(`^rgb\\(${z},${z},${z}\\)$`),
    qr = new RegExp(`^rgb\\(${T},${T},${T}\\)$`),
    Fr = new RegExp(`^rgba\\(${z},${z},${z},${et}\\)$`),
    Yr = new RegExp(`^rgba\\(${T},${T},${T},${et}\\)$`),
    Vr = new RegExp(`^hsl\\(${et},${T},${T}\\)$`),
    zr = new RegExp(`^hsla\\(${et},${T},${T},${et}\\)$`),
    rn = {
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
Yt(st, rt, {
    copy(t) {
        return Object.assign(new this.constructor(), this, t);
    },
    displayable() {
        return this.rgb().displayable();
    },
    hex: on,
    formatHex: on,
    formatHex8: Ur,
    formatHsl: Kr,
    formatRgb: sn,
    toString: sn,
});
function on() {
    return this.rgb().formatHex();
}
function Ur() {
    return this.rgb().formatHex8();
}
function Kr() {
    return Pn(this).formatHsl();
}
function sn() {
    return this.rgb().formatRgb();
}
function rt(t) {
    var n, e;
    return (
        (t = (t + "").trim().toLowerCase()),
        (n = Hr.exec(t))
            ? ((e = n[1].length),
                (n = parseInt(n[1], 16)),
                e === 6
                    ? cn(n)
                    : e === 3
                        ? new w(
                            ((n >> 8) & 15) | ((n >> 4) & 240),
                            ((n >> 4) & 15) | (n & 240),
                            ((n & 15) << 4) | (n & 15),
                            1
                        )
                        : e === 8
                            ? ut(
                                (n >> 24) & 255,
                                (n >> 16) & 255,
                                (n >> 8) & 255,
                                (n & 255) / 255
                            )
                            : e === 4
                                ? ut(
                                    ((n >> 12) & 15) | ((n >> 8) & 240),
                                    ((n >> 8) & 15) | ((n >> 4) & 240),
                                    ((n >> 4) & 15) | (n & 240),
                                    (((n & 15) << 4) | (n & 15)) / 255
                                )
                                : null)
            : (n = Br.exec(t))
                ? new w(n[1], n[2], n[3], 1)
                : (n = qr.exec(t))
                    ? new w((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
                    : (n = Fr.exec(t))
                        ? ut(n[1], n[2], n[3], n[4])
                        : (n = Yr.exec(t))
                            ? ut((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
                            : (n = Vr.exec(t))
                                ? ln(n[1], n[2] / 100, n[3] / 100, 1)
                                : (n = zr.exec(t))
                                    ? ln(n[1], n[2] / 100, n[3] / 100, n[4])
                                    : rn.hasOwnProperty(t)
                                        ? cn(rn[t])
                                        : t === "transparent"
                                            ? new w(NaN, NaN, NaN, 0)
                                            : null
    );
}
function cn(t) {
    return new w((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ut(t, n, e, r) {
    return r <= 0 && (t = n = e = NaN), new w(t, n, e, r);
}
function Wr(t) {
    return (
        t instanceof st || (t = rt(t)),
        t ? ((t = t.rgb()), new w(t.r, t.g, t.b, t.opacity)) : new w()
    );
}
function St(t, n, e, r) {
    return arguments.length === 1 ? Wr(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
    (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Yt(
    w,
    St,
    Mn(st, {
        brighter(t) {
            return (
                (t = t == null ? _t : Math.pow(_t, t)),
                new w(this.r * t, this.g * t, this.b * t, this.opacity)
            );
        },
        darker(t) {
            return (
                (t = t == null ? nt : Math.pow(nt, t)),
                new w(this.r * t, this.g * t, this.b * t, this.opacity)
            );
        },
        rgb() {
            return this;
        },
        clamp() {
            return new w(B(this.r), B(this.g), B(this.b), mt(this.opacity));
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
        hex: an,
        formatHex: an,
        formatHex8: Zr,
        formatRgb: un,
        toString: un,
    })
);
function an() {
    return `#${X(this.r)}${X(this.g)}${X(this.b)}`;
}
function Zr() {
    return `#${X(this.r)}${X(this.g)}${X(this.b)}${X(
        (isNaN(this.opacity) ? 1 : this.opacity) * 255
    )}`;
}
function un() {
    const t = mt(this.opacity);
    return `${t === 1 ? "rgb(" : "rgba("}${B(this.r)}, ${B(this.g)}, ${B(
        this.b
    )}${t === 1 ? ")" : `, ${t})`}`;
}
function mt(t) {
    return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function B(t) {
    return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function X(t) {
    return (t = B(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function ln(t, n, e, r) {
    return (
        r <= 0
            ? (t = n = e = NaN)
            : e <= 0 || e >= 1
                ? (t = n = NaN)
                : n <= 0 && (t = NaN),
        new E(t, n, e, r)
    );
}
function Pn(t) {
    if (t instanceof E) return new E(t.h, t.s, t.l, t.opacity);
    if ((t instanceof st || (t = rt(t)), !t)) return new E();
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
function Qr(t, n, e, r) {
    return arguments.length === 1 ? Pn(t) : new E(t, n, e, r ?? 1);
}
function E(t, n, e, r) {
    (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Yt(
    E,
    Qr,
    Mn(st, {
        brighter(t) {
            return (
                (t = t == null ? _t : Math.pow(_t, t)),
                new E(this.h, this.s, this.l * t, this.opacity)
            );
        },
        darker(t) {
            return (
                (t = t == null ? nt : Math.pow(nt, t)),
                new E(this.h, this.s, this.l * t, this.opacity)
            );
        },
        rgb() {
            var t = (this.h % 360) + (this.h < 0) * 360,
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
            return new w(
                At(t >= 240 ? t - 240 : t + 120, i, r),
                At(t, i, r),
                At(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity
            );
        },
        clamp() {
            return new E(fn(this.h), lt(this.s), lt(this.l), mt(this.opacity));
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
            const t = mt(this.opacity);
            return `${t === 1 ? "hsl(" : "hsla("}${fn(this.h)}, ${lt(this.s) * 100
                }%, ${lt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
        },
    })
);
function fn(t) {
    return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function lt(t) {
    return Math.max(0, Math.min(1, t || 0));
}
function At(t, n, e) {
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
const Rn = (t) => () => t;
function Jr(t, n) {
    return function (e) {
        return t + e * n;
    };
}
function jr(t, n, e) {
    return (
        (t = Math.pow(t, e)),
        (n = Math.pow(n, e) - t),
        (e = 1 / e),
        function (r) {
            return Math.pow(t + r * n, e);
        }
    );
}
function ti(t) {
    return (t = +t) == 1
        ? On
        : function (n, e) {
            return e - n ? jr(n, e, t) : Rn(isNaN(n) ? e : n);
        };
}
function On(t, n) {
    var e = n - t;
    return e ? Jr(t, e) : Rn(isNaN(t) ? n : t);
}
const hn = (function t(n) {
    var e = ti(n);
    function r(i, o) {
        var s = e((i = St(i)).r, (o = St(o)).r),
            c = e(i.g, o.g),
            a = e(i.b, o.b),
            u = On(i.opacity, o.opacity);
        return function (l) {
            return (
                (i.r = s(l)), (i.g = c(l)), (i.b = a(l)), (i.opacity = u(l)), i + ""
            );
        };
    }
    return (r.gamma = t), r;
})(1);
function L(t, n) {
    return (
        (t = +t),
        (n = +n),
        function (e) {
            return t * (1 - e) + n * e;
        }
    );
}
var Mt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    Ct = new RegExp(Mt.source, "g");
function ni(t) {
    return function () {
        return t;
    };
}
function ei(t) {
    return function (n) {
        return t(n) + "";
    };
}
function ri(t, n) {
    var e = (Mt.lastIndex = Ct.lastIndex = 0),
        r,
        i,
        o,
        s = -1,
        c = [],
        a = [];
    for (t = t + "", n = n + ""; (r = Mt.exec(t)) && (i = Ct.exec(n));)
        (o = i.index) > e &&
            ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
            (r = r[0]) === (i = i[0])
                ? c[s]
                    ? (c[s] += i)
                    : (c[++s] = i)
                : ((c[++s] = null), a.push({ i: s, x: L(r, i) })),
            (e = Ct.lastIndex);
    return (
        e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
        c.length < 2
            ? a[0]
                ? ei(a[0].x)
                : ni(n)
            : ((n = a.length),
                function (u) {
                    for (var l = 0, h; l < n; ++l) c[(h = a[l]).i] = h.x(u);
                    return c.join("");
                })
    );
}
var dn = 180 / Math.PI,
    Pt = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1,
    };
function Ln(t, n, e, r, i, o) {
    var s, c, a;
    return (
        (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
        (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
        (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
        t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
        {
            translateX: i,
            translateY: o,
            rotate: Math.atan2(n, t) * dn,
            skewX: Math.atan(a) * dn,
            scaleX: s,
            scaleY: c,
        }
    );
}
var ft;
function ii(t) {
    const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
        t + ""
    );
    return n.isIdentity ? Pt : Ln(n.a, n.b, n.c, n.d, n.e, n.f);
}
function oi(t) {
    return t == null ||
        (ft || (ft = document.createElementNS("http://www.w3.org/2000/svg", "g")),
            ft.setAttribute("transform", t),
            !(t = ft.transform.baseVal.consolidate()))
        ? Pt
        : ((t = t.matrix), Ln(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Gn(t, n, e, r) {
    function i(u) {
        return u.length ? u.pop() + " " : "";
    }
    function o(u, l, h, f, p, _) {
        if (u !== h || l !== f) {
            var m = p.push("translate(", null, n, null, e);
            _.push({ i: m - 4, x: L(u, h) }, { i: m - 2, x: L(l, f) });
        } else (h || f) && p.push("translate(" + h + n + f + e);
    }
    function s(u, l, h, f) {
        u !== l
            ? (u - l > 180 ? (l += 360) : l - u > 180 && (u += 360),
                f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: L(u, l) }))
            : l && h.push(i(h) + "rotate(" + l + r);
    }
    function c(u, l, h, f) {
        u !== l
            ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: L(u, l) })
            : l && h.push(i(h) + "skewX(" + l + r);
    }
    function a(u, l, h, f, p, _) {
        if (u !== h || l !== f) {
            var m = p.push(i(p) + "scale(", null, ",", null, ")");
            _.push({ i: m - 4, x: L(u, h) }, { i: m - 2, x: L(l, f) });
        } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
    }
    return function (u, l) {
        var h = [],
            f = [];
        return (
            (u = t(u)),
            (l = t(l)),
            o(u.translateX, u.translateY, l.translateX, l.translateY, h, f),
            s(u.rotate, l.rotate, h, f),
            c(u.skewX, l.skewX, h, f),
            a(u.scaleX, u.scaleY, l.scaleX, l.scaleY, h, f),
            (u = l = null),
            function (p) {
                for (var _ = -1, m = f.length, $; ++_ < m;) h[($ = f[_]).i] = $.x(p);
                return h.join("");
            }
        );
    };
}
var si = Gn(ii, "px, ", "px)", "deg)"),
    ci = Gn(oi, ", ", ")", ")"),
    K = 0,
    Q = 0,
    W = 0,
    Dn = 1e3,
    yt,
    J,
    xt = 0,
    q = 0,
    bt = 0,
    it = typeof performance == "object" && performance.now ? performance : Date,
    Xn =
        typeof window == "object" && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (t) {
                setTimeout(t, 17);
            };
function Vt() {
    return q || (Xn(ai), (q = it.now() + bt));
}
function ai() {
    q = 0;
}
function wt() {
    this._call = this._time = this._next = null;
}
wt.prototype = Hn.prototype = {
    constructor: wt,
    restart: function (t, n, e) {
        if (typeof t != "function")
            throw new TypeError("callback is not a function");
        (e = (e == null ? Vt() : +e) + (n == null ? 0 : +n)),
            !this._next &&
            J !== this &&
            (J ? (J._next = this) : (yt = this), (J = this)),
            (this._call = t),
            (this._time = e),
            Rt();
    },
    stop: function () {
        this._call && ((this._call = null), (this._time = 1 / 0), Rt());
    },
};
function Hn(t, n, e) {
    var r = new wt();
    return r.restart(t, n, e), r;
}
function ui() {
    Vt(), ++K;
    for (var t = yt, n; t;)
        (n = q - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
    --K;
}
function pn() {
    (q = (xt = it.now()) + bt), (K = Q = 0);
    try {
        ui();
    } finally {
        (K = 0), fi(), (q = 0);
    }
}
function li() {
    var t = it.now(),
        n = t - xt;
    n > Dn && ((bt -= n), (xt = t));
}
function fi() {
    for (var t, n = yt, e, r = 1 / 0; n;)
        n._call
            ? (r > n._time && (r = n._time), (t = n), (n = n._next))
            : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (yt = e)));
    (J = t), Rt(r);
}
function Rt(t) {
    if (!K) {
        Q && (Q = clearTimeout(Q));
        var n = t - q;
        n > 24
            ? (t < 1 / 0 && (Q = setTimeout(pn, t - it.now() - bt)),
                W && (W = clearInterval(W)))
            : (W || ((xt = it.now()), (W = setInterval(li, Dn))), (K = 1), Xn(pn));
    }
}
function gn(t, n, e) {
    var r = new wt();
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
var hi = Bt("start", "end", "cancel", "interrupt"),
    di = [],
    Bn = 0,
    _n = 1,
    Ot = 2,
    dt = 3,
    mn = 4,
    Lt = 5,
    pt = 6;
function $t(t, n, e, r, i, o) {
    var s = t.__transition;
    if (!s) t.__transition = {};
    else if (e in s) return;
    pi(t, e, {
        name: n,
        index: r,
        group: i,
        on: hi,
        tween: di,
        time: o.time,
        delay: o.delay,
        duration: o.duration,
        ease: o.ease,
        timer: null,
        state: Bn,
    });
}
function zt(t, n) {
    var e = N(t, n);
    if (e.state > Bn) throw new Error("too late; already scheduled");
    return e;
}
function k(t, n) {
    var e = N(t, n);
    if (e.state > dt) throw new Error("too late; already running");
    return e;
}
function N(t, n) {
    var e = t.__transition;
    if (!e || !(e = e[n])) throw new Error("transition not found");
    return e;
}
function pi(t, n, e) {
    var r = t.__transition,
        i;
    (r[n] = e), (e.timer = Hn(o, 0, e.time));
    function o(u) {
        (e.state = _n),
            e.timer.restart(s, e.delay, e.time),
            e.delay <= u && s(u - e.delay);
    }
    function s(u) {
        var l, h, f, p;
        if (e.state !== _n) return a();
        for (l in r)
            if (((p = r[l]), p.name === e.name)) {
                if (p.state === dt) return gn(s);
                p.state === mn
                    ? ((p.state = pt),
                        p.timer.stop(),
                        p.on.call("interrupt", t, t.__data__, p.index, p.group),
                        delete r[l])
                    : +l < n &&
                    ((p.state = pt),
                        p.timer.stop(),
                        p.on.call("cancel", t, t.__data__, p.index, p.group),
                        delete r[l]);
            }
        if (
            (gn(function () {
                e.state === dt &&
                    ((e.state = mn), e.timer.restart(c, e.delay, e.time), c(u));
            }),
                (e.state = Ot),
                e.on.call("start", t, t.__data__, e.index, e.group),
                e.state === Ot)
        ) {
            for (
                e.state = dt, i = new Array((f = e.tween.length)), l = 0, h = -1;
                l < f;
                ++l
            )
                (p = e.tween[l].value.call(t, t.__data__, e.index, e.group)) &&
                    (i[++h] = p);
            i.length = h + 1;
        }
    }
    function c(u) {
        for (
            var l =
                u < e.duration
                    ? e.ease.call(null, u / e.duration)
                    : (e.timer.restart(a), (e.state = Lt), 1),
            h = -1,
            f = i.length;
            ++h < f;

        )
            i[h].call(t, l);
        e.state === Lt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
    }
    function a() {
        (e.state = pt), e.timer.stop(), delete r[n];
        for (var u in r) return;
        delete t.__transition;
    }
}
function gi(t, n) {
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
            (i = r.state > Ot && r.state < Lt),
                (r.state = pt),
                r.timer.stop(),
                r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
                delete e[s];
        }
        o && delete t.__transition;
    }
}
function _i(t) {
    return this.each(function () {
        gi(this, t);
    });
}
function mi(t, n) {
    var e, r;
    return function () {
        var i = k(this, t),
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
function yi(t, n, e) {
    var r, i;
    if (typeof e != "function") throw new Error();
    return function () {
        var o = k(this, t),
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
function xi(t, n) {
    var e = this._id;
    if (((t += ""), arguments.length < 2)) {
        for (var r = N(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
            if ((s = r[i]).name === t) return s.value;
        return null;
    }
    return this.each((n == null ? mi : yi)(e, t, n));
}
function Ut(t, n, e) {
    var r = t._id;
    return (
        t.each(function () {
            var i = k(this, r);
            (i.value || (i.value = {}))[n] = e.apply(this, arguments);
        }),
        function (i) {
            return N(i, r).value[n];
        }
    );
}
function qn(t, n) {
    var e;
    return (
        typeof n == "number"
            ? L
            : n instanceof rt
                ? hn
                : (e = rt(n))
                    ? ((n = e), hn)
                    : ri
    )(t, n);
}
function wi(t) {
    return function () {
        this.removeAttribute(t);
    };
}
function vi(t) {
    return function () {
        this.removeAttributeNS(t.space, t.local);
    };
}
function bi(t, n, e) {
    var r,
        i = e + "",
        o;
    return function () {
        var s = this.getAttribute(t);
        return s === i ? null : s === r ? o : (o = n((r = s), e));
    };
}
function $i(t, n, e) {
    var r,
        i = e + "",
        o;
    return function () {
        var s = this.getAttributeNS(t.space, t.local);
        return s === i ? null : s === r ? o : (o = n((r = s), e));
    };
}
function Ei(t, n, e) {
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
function Ni(t, n, e) {
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
function Ii(t, n) {
    var e = vt(t),
        r = e === "transform" ? ci : qn;
    return this.attrTween(
        t,
        typeof n == "function"
            ? (e.local ? Ni : Ei)(e, r, Ut(this, "attr." + t, n))
            : n == null
                ? (e.local ? vi : wi)(e)
                : (e.local ? $i : bi)(e, r, n)
    );
}
function Ai(t, n) {
    return function (e) {
        this.setAttribute(t, n.call(this, e));
    };
}
function Ci(t, n) {
    return function (e) {
        this.setAttributeNS(t.space, t.local, n.call(this, e));
    };
}
function Ti(t, n) {
    var e, r;
    function i() {
        var o = n.apply(this, arguments);
        return o !== r && (e = (r = o) && Ci(t, o)), e;
    }
    return (i._value = n), i;
}
function ki(t, n) {
    var e, r;
    function i() {
        var o = n.apply(this, arguments);
        return o !== r && (e = (r = o) && Ai(t, o)), e;
    }
    return (i._value = n), i;
}
function Si(t, n) {
    var e = "attr." + t;
    if (arguments.length < 2) return (e = this.tween(e)) && e._value;
    if (n == null) return this.tween(e, null);
    if (typeof n != "function") throw new Error();
    var r = vt(t);
    return this.tween(e, (r.local ? Ti : ki)(r, n));
}
function Mi(t, n) {
    return function () {
        zt(this, t).delay = +n.apply(this, arguments);
    };
}
function Pi(t, n) {
    return (
        (n = +n),
        function () {
            zt(this, t).delay = n;
        }
    );
}
function Ri(t) {
    var n = this._id;
    return arguments.length
        ? this.each((typeof t == "function" ? Mi : Pi)(n, t))
        : N(this.node(), n).delay;
}
function Oi(t, n) {
    return function () {
        k(this, t).duration = +n.apply(this, arguments);
    };
}
function Li(t, n) {
    return (
        (n = +n),
        function () {
            k(this, t).duration = n;
        }
    );
}
function Gi(t) {
    var n = this._id;
    return arguments.length
        ? this.each((typeof t == "function" ? Oi : Li)(n, t))
        : N(this.node(), n).duration;
}
function Di(t, n) {
    if (typeof n != "function") throw new Error();
    return function () {
        k(this, t).ease = n;
    };
}
function Xi(t) {
    var n = this._id;
    return arguments.length ? this.each(Di(n, t)) : N(this.node(), n).ease;
}
function Hi(t, n) {
    return function () {
        var e = n.apply(this, arguments);
        if (typeof e != "function") throw new Error();
        k(this, t).ease = e;
    };
}
function Bi(t) {
    if (typeof t != "function") throw new Error();
    return this.each(Hi(this._id, t));
}
function qi(t) {
    typeof t != "function" && (t = bn(t));
    for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (var o = n[i], s = o.length, c = (r[i] = []), a, u = 0; u < s; ++u)
            (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
    return new R(r, this._parents, this._name, this._id);
}
function Fi(t) {
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
            var a = n[c], u = e[c], l = a.length, h = (s[c] = new Array(l)), f, p = 0;
            p < l;
            ++p
        )
            (f = a[p] || u[p]) && (h[p] = f);
    for (; c < r; ++c) s[c] = n[c];
    return new R(s, this._parents, this._name, this._id);
}
function Yi(t) {
    return (t + "")
        .trim()
        .split(/^|\s+/)
        .every(function (n) {
            var e = n.indexOf(".");
            return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
        });
}
function Vi(t, n, e) {
    var r,
        i,
        o = Yi(n) ? zt : k;
    return function () {
        var s = o(this, t),
            c = s.on;
        c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
    };
}
function zi(t, n) {
    var e = this._id;
    return arguments.length < 2
        ? N(this.node(), e).on.on(t)
        : this.each(Vi(e, t, n));
}
function Ui(t) {
    return function () {
        var n = this.parentNode;
        for (var e in this.__transition) if (+e !== t) return;
        n && n.removeChild(this);
    };
}
function Ki() {
    return this.on("end.remove", Ui(this._id));
}
function Wi(t) {
    var n = this._name,
        e = this._id;
    typeof t != "function" && (t = qt(t));
    for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
        for (
            var c = r[s], a = c.length, u = (o[s] = new Array(a)), l, h, f = 0;
            f < a;
            ++f
        )
            (l = c[f]) &&
                (h = t.call(l, l.__data__, f, c)) &&
                ("__data__" in l && (h.__data__ = l.__data__),
                    (u[f] = h),
                    $t(u[f], n, e, f, u, N(l, e)));
    return new R(o, this._parents, n, e);
}
function Zi(t) {
    var n = this._name,
        e = this._id;
    typeof t != "function" && (t = vn(t));
    for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
        for (var a = r[c], u = a.length, l, h = 0; h < u; ++h)
            if ((l = a[h])) {
                for (
                    var f = t.call(l, l.__data__, h, a),
                    p,
                    _ = N(l, e),
                    m = 0,
                    $ = f.length;
                    m < $;
                    ++m
                )
                    (p = f[m]) && $t(p, n, e, m, f, _);
                o.push(f), s.push(l);
            }
    return new R(o, s, n, e);
}
var Qi = ot.prototype.constructor;
function Ji() {
    return new Qi(this._groups, this._parents);
}
function ji(t, n) {
    var e, r, i;
    return function () {
        var o = U(this, t),
            s = (this.style.removeProperty(t), U(this, t));
        return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
    };
}
function Fn(t) {
    return function () {
        this.style.removeProperty(t);
    };
}
function to(t, n, e) {
    var r,
        i = e + "",
        o;
    return function () {
        var s = U(this, t);
        return s === i ? null : s === r ? o : (o = n((r = s), e));
    };
}
function no(t, n, e) {
    var r, i, o;
    return function () {
        var s = U(this, t),
            c = e(this),
            a = c + "";
        return (
            c == null && (a = c = (this.style.removeProperty(t), U(this, t))),
            s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
        );
    };
}
function eo(t, n) {
    var e,
        r,
        i,
        o = "style." + n,
        s = "end." + o,
        c;
    return function () {
        var a = k(this, t),
            u = a.on,
            l = a.value[o] == null ? c || (c = Fn(n)) : void 0;
        (u !== e || i !== l) && (r = (e = u).copy()).on(s, (i = l)), (a.on = r);
    };
}
function ro(t, n, e) {
    var r = (t += "") == "transform" ? si : qn;
    return n == null
        ? this.styleTween(t, ji(t, r)).on("end.style." + t, Fn(t))
        : typeof n == "function"
            ? this.styleTween(t, no(t, r, Ut(this, "style." + t, n))).each(
                eo(this._id, t)
            )
            : this.styleTween(t, to(t, r, n), e).on("end.style." + t, null);
}
function io(t, n, e) {
    return function (r) {
        this.style.setProperty(t, n.call(this, r), e);
    };
}
function oo(t, n, e) {
    var r, i;
    function o() {
        var s = n.apply(this, arguments);
        return s !== i && (r = (i = s) && io(t, s, e)), r;
    }
    return (o._value = n), o;
}
function so(t, n, e) {
    var r = "style." + (t += "");
    if (arguments.length < 2) return (r = this.tween(r)) && r._value;
    if (n == null) return this.tween(r, null);
    if (typeof n != "function") throw new Error();
    return this.tween(r, oo(t, n, e ?? ""));
}
function co(t) {
    return function () {
        this.textContent = t;
    };
}
function ao(t) {
    return function () {
        var n = t(this);
        this.textContent = n ?? "";
    };
}
function uo(t) {
    return this.tween(
        "text",
        typeof t == "function"
            ? ao(Ut(this, "text", t))
            : co(t == null ? "" : t + "")
    );
}
function lo(t) {
    return function (n) {
        this.textContent = t.call(this, n);
    };
}
function fo(t) {
    var n, e;
    function r() {
        var i = t.apply(this, arguments);
        return i !== e && (n = (e = i) && lo(i)), n;
    }
    return (r._value = t), r;
}
function ho(t) {
    var n = "text";
    if (arguments.length < 1) return (n = this.tween(n)) && n._value;
    if (t == null) return this.tween(n, null);
    if (typeof t != "function") throw new Error();
    return this.tween(n, fo(t));
}
function po() {
    for (
        var t = this._name,
        n = this._id,
        e = Yn(),
        r = this._groups,
        i = r.length,
        o = 0;
        o < i;
        ++o
    )
        for (var s = r[o], c = s.length, a, u = 0; u < c; ++u)
            if ((a = s[u])) {
                var l = N(a, n);
                $t(a, t, e, u, s, {
                    time: l.time + l.delay + l.duration,
                    delay: 0,
                    duration: l.duration,
                    ease: l.ease,
                });
            }
    return new R(r, this._parents, t, e);
}
function go() {
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
            var u = k(this, r),
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
var _o = 0;
function R(t, n, e, r) {
    (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Yn() {
    return ++_o;
}
var S = ot.prototype;
R.prototype = {
    constructor: R,
    select: Wi,
    selectAll: Zi,
    selectChild: S.selectChild,
    selectChildren: S.selectChildren,
    filter: qi,
    merge: Fi,
    selection: Ji,
    transition: po,
    call: S.call,
    nodes: S.nodes,
    node: S.node,
    size: S.size,
    empty: S.empty,
    each: S.each,
    on: zi,
    attr: Ii,
    attrTween: Si,
    style: ro,
    styleTween: so,
    text: uo,
    textTween: ho,
    remove: Ki,
    tween: xi,
    delay: Ri,
    duration: Gi,
    ease: Xi,
    easeVarying: Bi,
    end: go,
    [Symbol.iterator]: S[Symbol.iterator],
};
function mo(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var yo = { time: null, delay: 0, duration: 250, ease: mo };
function xo(t, n) {
    for (var e; !(e = t.__transition) || !(e = e[n]);)
        if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
    return e;
}
function wo(t) {
    var n, e;
    t instanceof R
        ? ((n = t._id), (t = t._name))
        : ((n = Yn()), ((e = yo).time = Vt()), (t = t == null ? null : t + ""));
    for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
        for (var s = r[o], c = s.length, a, u = 0; u < c; ++u)
            (a = s[u]) && $t(a, t, n, u, s, e || xo(a, n));
    return new R(r, this._parents, t, n);
}
ot.prototype.interrupt = _i;
ot.prototype.transition = wo;
const Gt = Math.PI,
    Dt = 2 * Gt,
    G = 1e-6,
    vo = Dt - G;
function Vn(t) {
    this._ += t[0];
    for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function bo(t) {
    let n = Math.floor(t);
    if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
    if (n > 15) return Vn;
    const e = 10 ** n;
    return function (r) {
        this._ += r[0];
        for (let i = 1, o = r.length; i < o; ++i)
            this._ += Math.round(arguments[i] * e) / e + r[i];
    };
}
class $o {
    constructor(n) {
        (this._x0 = this._y0 = this._x1 = this._y1 = null),
            (this._ = ""),
            (this._append = n == null ? Vn : bo(n));
    }
    moveTo(n, e) {
        this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}`;
    }
    closePath() {
        this._x1 !== null &&
            ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
    }
    lineTo(n, e) {
        this._append`L${(this._x1 = +n)},${(this._y1 = +e)}`;
    }
    quadraticCurveTo(n, e, r, i) {
        this._append`Q${+n},${+e},${(this._x1 = +r)},${(this._y1 = +i)}`;
    }
    bezierCurveTo(n, e, r, i, o, s) {
        this._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 =
            +s)}`;
    }
    arcTo(n, e, r, i, o) {
        if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
            throw new Error(`negative radius: ${o}`);
        let s = this._x1,
            c = this._y1,
            a = r - n,
            u = i - e,
            l = s - n,
            h = c - e,
            f = l * l + h * h;
        if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
        else if (f > G)
            if (!(Math.abs(h * a - u * l) > G) || !o)
                this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
            else {
                let p = r - s,
                    _ = i - c,
                    m = a * a + u * u,
                    $ = p * p + _ * _,
                    F = Math.sqrt(m),
                    I = Math.sqrt(f),
                    A = o * Math.tan((Gt - Math.acos((m + f - $) / (2 * F * I))) / 2),
                    d = A / I,
                    g = A / F;
                Math.abs(d - 1) > G && this._append`L${n + d * l},${e + d * h}`,
                    this._append`A${o},${o},0,0,${+(h * p > l * _)},${(this._x1 =
                        n + g * a)},${(this._y1 = e + g * u)}`;
            }
    }
    arc(n, e, r, i, o, s) {
        if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
            throw new Error(`negative radius: ${r}`);
        let c = r * Math.cos(i),
            a = r * Math.sin(i),
            u = n + c,
            l = e + a,
            h = 1 ^ s,
            f = s ? i - o : o - i;
        this._x1 === null
            ? this._append`M${u},${l}`
            : (Math.abs(this._x1 - u) > G || Math.abs(this._y1 - l) > G) &&
            this._append`L${u},${l}`,
            r &&
            (f < 0 && (f = (f % Dt) + Dt),
                f > vo
                    ? this._append`A${r},${r},0,1,${h},${n - c},${e - a
                        }A${r},${r},0,1,${h},${(this._x1 = u)},${(this._y1 = l)}`
                    : f > G &&
                    this._append`A${r},${r},0,${+(f >= Gt)},${h},${(this._x1 =
                        n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`);
    }
    rect(n, e, r, i) {
        this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 =
            +e)}h${(r = +r)}v${+i}h${-r}Z`;
    }
    toString() {
        return this._;
    }
}
function Eo(t) {
    if (!t.ok) throw new Error(t.status + " " + t.statusText);
    return t.text();
}
function No(t, n) {
    return fetch(t, n).then(Eo);
}
function Io(t) {
    return (n, e) => No(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Ao = Io("application/xml");
function j(t, n, e) {
    (this.k = t), (this.x = n), (this.y = e);
}
j.prototype = {
    constructor: j,
    scale: function (t) {
        return t === 1 ? this : new j(this.k * t, this.x, this.y);
    },
    translate: function (t, n) {
        return (t === 0) & (n === 0)
            ? this
            : new j(this.k, this.x + this.k * t, this.y + this.k * n);
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
j.prototype;
class Co {
    constructor(n, e, r, i) {
        jt(this, "dragged", (n) => {
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
        if (P("#" + this.id).node() != null) return;
        const n = await Ao(this.url);
        (this.sensor = this.svgContainer
            .append("g")
            .attr("transform", "translate(" + [0, 0] + ") scale(" + this.scale + ")")
            .attr("id", this.id)),
            this.sensor.node().append(P(n.documentElement).node()),
            this.movable &&
            this.sensor.call(
                Xr()
                    .on("start", this.dragstarted)
                    .on("drag", this.dragged)
                    .on("end", this.dragended)
            );
    }
    dragstarted(n) {
        P(this).raise().classed("active", !0);
    }
    dragended(n) {
        P(this).classed("active", !1);
    }
}
const Kt = [
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
],
    To = ["vcc", "gnd", "out"],
    H = {
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
    },
    ko = (t) => {
        if (t.length == 0) return { error: "No connection found" };
        const n = ["GPIO", "GND", "vcc", "gnd", "out", "5V PWR"];
        let e = 0;
        return (
            t.forEach((r) => {
                if (n.find((i) => i == r.connector)) {
                    e++;
                    return;
                }
                if (H[r.connector] == "GND") {
                    e++;
                    return;
                }
                if (H[r.connector].includes("GPIO")) {
                    e++;
                    return;
                }
            }),
            console.log(e),
            e == 5
        );
    };
class So {
    constructor(n) {
        (this.logLocationId = n), (this.connections = []);
    }
    addConnection(n) {
        this.connections.push(n),
            this.logConnectionsToHtml(),
            console.log("connections", this.connections);
    }
    logConnectionsToHtml() {
        if (this.connections.length % 2 == 0) {
            let n = document.createElement("li");
            const e = H[this.connections[this.connections.length - 2].connector]
                ? H[this.connections[this.connections.length - 2].connector]
                : this.connections[this.connections.length - 2].connector,
                r = H[this.connections[this.connections.length - 1].connector]
                    ? H[this.connections[this.connections.length - 1].connector]
                    : this.connections[this.connections.length - 1].connector;
            (n.innerHTML = `Connection no. ${this.connections.length / 2
                } : ${e} to ${r}`),
                document.getElementById(this.logLocationId).appendChild(n);
            return;
        }
    }
    getConnectionLog() {
        return this.connections;
    }
}
class Mo {
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
const D = P("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
        "height",
        window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
    Po = new Co("raspberry", D, "./images/pi3dirk.svg", 1, !1),
    Ro = document.getElementById("rasberryPi");
document.getElementById("sensor");
const yn = (t) => Kt.includes(t.srcElement.id) || To.includes(t.srcElement.id),
    Xt = document.getElementById("displayInfo"),
    Oo = document.getElementById("codeSubmit");
Ro.addEventListener("click", async () => await Po.load());
let M;
const Ht = new So("connectionLog"),
    xn = new Mo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let Z = 0;
D.on("dblclick", (t) => {
    if (yn(t) & (M == null)) {
        (M = new $o()),
            M.moveTo(t.offsetX, t.offsetY),
            Ht.addConnection({
                lineID: `path${Z}`,
                x: t.offsetX,
                y: t.offsetY,
                connector: t.srcElement.id,
            }),
            D.style("cursor", "crosshair");
        return;
    }
    if (t.srcElement.id == "svgContainer" && !Kt.includes(t.srcElement.id)) {
        M.lineTo(t.offsetX, t.offsetY),
            D.append("path")
                .attr("d", M.toString())
                .attr("stroke", "black")
                .attr("stroke-width", "2px")
                .attr("fill", "none")
                .attr("id", `path${Z}`);
        return;
    }
    if (yn(t) && M) {
        M.lineTo(t.offsetX, t.offsetY),
            D.append("path")
                .attr("d", M.toString())
                .attr("stroke", "black")
                .attr("stroke-width", "2px")
                .attr("fill", "none")
                .attr("id", `path${Z}`),
            Ht.addConnection({
                lineID: `path${Z}`,
                x: t.offsetX,
                y: t.offsetY,
                connector: t.srcElement.id,
            }),
            Z++,
            D.style("cursor", "default"),
            (M = null),
            console.log("connectedPointSequence", connectedPointSequence);
        return;
    }
});
D.on("mouseover", (t) => {
    Kt.includes(t.srcElement.id) && (Xt.innerHTML = H[t.srcElement.id]);
});
const Lo = () => {
    const t = document.getElementById("temperature").value;
    (Xt.innerHTML = "Temperature: " + t + "°C"),
        document.getElementById("temperature").addEventListener("change", () => {
            Xt.innerHTML =
                "Temperature: " + document.getElementById("temperature").value + "°C";
        });
};
Oo.addEventListener("click", () => {
    const t = ko(Ht.getConnectionLog());
    t == !0
        ? (Lo(), document.querySelector("#my-drawer-4").click())
        : t.error
            ? xn.throw("Error", t.error)
            : xn.throw(
                "Error",
                "Please connect the components properly. Refer to the connection diagram."
            );
});

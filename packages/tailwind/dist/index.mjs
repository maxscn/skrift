import { jsx as Lf } from "react/jsx-runtime";
import * as en from "react";
import ht from "react";
var Na = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tt(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
function Nf(l) {
  if (Object.prototype.hasOwnProperty.call(l, "__esModule")) return l;
  var i = l.default;
  if (typeof i == "function") {
    var v = function p() {
      return this instanceof p ? Reflect.construct(i, arguments, this.constructor) : i.apply(this, arguments);
    };
    v.prototype = i.prototype;
  } else v = {};
  return Object.defineProperty(v, "__esModule", { value: !0 }), Object.keys(l).forEach(function(p) {
    var u = Object.getOwnPropertyDescriptor(l, p);
    Object.defineProperty(v, p, u.get ? u : {
      enumerable: !0,
      get: function() {
        return l[p];
      }
    });
  }), v;
}
var bt = { exports: {} }, Fa;
function oa() {
  if (Fa) return bt.exports;
  Fa = 1;
  var l = String, i = function() {
    return { isColorSupported: !1, reset: l, bold: l, dim: l, italic: l, underline: l, inverse: l, hidden: l, strikethrough: l, black: l, red: l, green: l, yellow: l, blue: l, magenta: l, cyan: l, white: l, gray: l, bgBlack: l, bgRed: l, bgGreen: l, bgYellow: l, bgBlue: l, bgMagenta: l, bgCyan: l, bgWhite: l, blackBright: l, redBright: l, greenBright: l, yellowBright: l, blueBright: l, magentaBright: l, cyanBright: l, whiteBright: l, bgBlackBright: l, bgRedBright: l, bgGreenBright: l, bgYellowBright: l, bgBlueBright: l, bgMagentaBright: l, bgCyanBright: l, bgWhiteBright: l };
  };
  return bt.exports = i(), bt.exports.createColors = i, bt.exports;
}
const Ff = {}, $f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ff
}, Symbol.toStringTag, { value: "Module" })), We = /* @__PURE__ */ Nf($f);
var tn, $a;
function ua() {
  if ($a) return tn;
  $a = 1;
  let l = /* @__PURE__ */ oa(), i = We;
  class v extends Error {
    constructor(u, f, o, d, e, t) {
      super(u), this.name = "CssSyntaxError", this.reason = u, e && (this.file = e), d && (this.source = d), t && (this.plugin = t), typeof f < "u" && typeof o < "u" && (typeof f == "number" ? (this.line = f, this.column = o) : (this.line = f.line, this.column = f.column, this.endLine = o.line, this.endColumn = o.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, v);
    }
    setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
    }
    showSourceCode(u) {
      if (!this.source) return "";
      let f = this.source;
      u == null && (u = l.isColorSupported);
      let o = (g) => g, d = (g) => g, e = (g) => g;
      if (u) {
        let { bold: g, gray: b, red: r } = l.createColors(!0);
        d = (c) => g(r(c)), o = (c) => b(c), i && (e = (c) => i(c));
      }
      let t = f.split(/\r?\n/), n = Math.max(this.line - 3, 0), a = Math.min(this.line + 2, t.length), s = String(a).length;
      return t.slice(n, a).map((g, b) => {
        let r = n + 1 + b, c = " " + (" " + r).slice(-s) + " | ";
        if (r === this.line) {
          if (g.length > 160) {
            let m = 20, y = Math.max(0, this.column - m), S = Math.max(
              this.column + m,
              this.endColumn + m
            ), h = g.slice(y, S), O = o(c.replace(/\d/g, " ")) + g.slice(0, Math.min(this.column - 1, m - 1)).replace(/[^\t]/g, " ");
            return d(">") + o(c) + e(h) + `
 ` + O + d("^");
          }
          let _ = o(c.replace(/\d/g, " ")) + g.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return d(">") + o(c) + e(g) + `
 ` + _ + d("^");
        }
        return " " + o(c) + e(g);
      }).join(`
`);
    }
    toString() {
      let u = this.showSourceCode();
      return u && (u = `

` + u + `
`), this.name + ": " + this.message + u;
    }
  }
  return tn = v, v.default = v, tn;
}
var rn, Ua;
function xl() {
  if (Ua) return rn;
  Ua = 1;
  const l = {
    after: `
`,
    beforeClose: `
`,
    beforeComment: `
`,
    beforeDecl: `
`,
    beforeOpen: " ",
    beforeRule: `
`,
    colon: ": ",
    commentLeft: " ",
    commentRight: " ",
    emptyBody: "",
    indent: "    ",
    semicolon: !1
  };
  function i(p) {
    return p[0].toUpperCase() + p.slice(1);
  }
  class v {
    constructor(u) {
      this.builder = u;
    }
    atrule(u, f) {
      let o = "@" + u.name, d = u.params ? this.rawValue(u, "params") : "";
      if (typeof u.raws.afterName < "u" ? o += u.raws.afterName : d && (o += " "), u.nodes)
        this.block(u, o + d);
      else {
        let e = (u.raws.between || "") + (f ? ";" : "");
        this.builder(o + d + e, u);
      }
    }
    beforeAfter(u, f) {
      let o;
      u.type === "decl" ? o = this.raw(u, null, "beforeDecl") : u.type === "comment" ? o = this.raw(u, null, "beforeComment") : f === "before" ? o = this.raw(u, null, "beforeRule") : o = this.raw(u, null, "beforeClose");
      let d = u.parent, e = 0;
      for (; d && d.type !== "root"; )
        e += 1, d = d.parent;
      if (o.includes(`
`)) {
        let t = this.raw(u, null, "indent");
        if (t.length)
          for (let n = 0; n < e; n++) o += t;
      }
      return o;
    }
    block(u, f) {
      let o = this.raw(u, "between", "beforeOpen");
      this.builder(f + o + "{", u, "start");
      let d;
      u.nodes && u.nodes.length ? (this.body(u), d = this.raw(u, "after")) : d = this.raw(u, "after", "emptyBody"), d && this.builder(d), this.builder("}", u, "end");
    }
    body(u) {
      let f = u.nodes.length - 1;
      for (; f > 0 && u.nodes[f].type === "comment"; )
        f -= 1;
      let o = this.raw(u, "semicolon");
      for (let d = 0; d < u.nodes.length; d++) {
        let e = u.nodes[d], t = this.raw(e, "before");
        t && this.builder(t), this.stringify(e, f !== d || o);
      }
    }
    comment(u) {
      let f = this.raw(u, "left", "commentLeft"), o = this.raw(u, "right", "commentRight");
      this.builder("/*" + f + u.text + o + "*/", u);
    }
    decl(u, f) {
      let o = this.raw(u, "between", "colon"), d = u.prop + o + this.rawValue(u, "value");
      u.important && (d += u.raws.important || " !important"), f && (d += ";"), this.builder(d, u);
    }
    document(u) {
      this.body(u);
    }
    raw(u, f, o) {
      let d;
      if (o || (o = f), f && (d = u.raws[f], typeof d < "u"))
        return d;
      let e = u.parent;
      if (o === "before" && (!e || e.type === "root" && e.first === u || e && e.type === "document"))
        return "";
      if (!e) return l[o];
      let t = u.root();
      if (t.rawCache || (t.rawCache = {}), typeof t.rawCache[o] < "u")
        return t.rawCache[o];
      if (o === "before" || o === "after")
        return this.beforeAfter(u, o);
      {
        let n = "raw" + i(o);
        this[n] ? d = this[n](t, u) : t.walk((a) => {
          if (d = a.raws[f], typeof d < "u") return !1;
        });
      }
      return typeof d > "u" && (d = l[o]), t.rawCache[o] = d, d;
    }
    rawBeforeClose(u) {
      let f;
      return u.walk((o) => {
        if (o.nodes && o.nodes.length > 0 && typeof o.raws.after < "u")
          return f = o.raws.after, f.includes(`
`) && (f = f.replace(/[^\n]+$/, "")), !1;
      }), f && (f = f.replace(/\S/g, "")), f;
    }
    rawBeforeComment(u, f) {
      let o;
      return u.walkComments((d) => {
        if (typeof d.raws.before < "u")
          return o = d.raws.before, o.includes(`
`) && (o = o.replace(/[^\n]+$/, "")), !1;
      }), typeof o > "u" ? o = this.raw(f, null, "beforeDecl") : o && (o = o.replace(/\S/g, "")), o;
    }
    rawBeforeDecl(u, f) {
      let o;
      return u.walkDecls((d) => {
        if (typeof d.raws.before < "u")
          return o = d.raws.before, o.includes(`
`) && (o = o.replace(/[^\n]+$/, "")), !1;
      }), typeof o > "u" ? o = this.raw(f, null, "beforeRule") : o && (o = o.replace(/\S/g, "")), o;
    }
    rawBeforeOpen(u) {
      let f;
      return u.walk((o) => {
        if (o.type !== "decl" && (f = o.raws.between, typeof f < "u"))
          return !1;
      }), f;
    }
    rawBeforeRule(u) {
      let f;
      return u.walk((o) => {
        if (o.nodes && (o.parent !== u || u.first !== o) && typeof o.raws.before < "u")
          return f = o.raws.before, f.includes(`
`) && (f = f.replace(/[^\n]+$/, "")), !1;
      }), f && (f = f.replace(/\S/g, "")), f;
    }
    rawColon(u) {
      let f;
      return u.walkDecls((o) => {
        if (typeof o.raws.between < "u")
          return f = o.raws.between.replace(/[^\s:]/g, ""), !1;
      }), f;
    }
    rawEmptyBody(u) {
      let f;
      return u.walk((o) => {
        if (o.nodes && o.nodes.length === 0 && (f = o.raws.after, typeof f < "u"))
          return !1;
      }), f;
    }
    rawIndent(u) {
      if (u.raws.indent) return u.raws.indent;
      let f;
      return u.walk((o) => {
        let d = o.parent;
        if (d && d !== u && d.parent && d.parent === u && typeof o.raws.before < "u") {
          let e = o.raws.before.split(`
`);
          return f = e[e.length - 1], f = f.replace(/\S/g, ""), !1;
        }
      }), f;
    }
    rawSemicolon(u) {
      let f;
      return u.walk((o) => {
        if (o.nodes && o.nodes.length && o.last.type === "decl" && (f = o.raws.semicolon, typeof f < "u"))
          return !1;
      }), f;
    }
    rawValue(u, f) {
      let o = u[f], d = u.raws[f];
      return d && d.value === o ? d.raw : o;
    }
    root(u) {
      this.body(u), u.raws.after && this.builder(u.raws.after);
    }
    rule(u) {
      this.block(u, this.rawValue(u, "selector")), u.raws.ownSemicolon && this.builder(u.raws.ownSemicolon, u, "end");
    }
    stringify(u, f) {
      if (!this[u.type])
        throw new Error(
          "Unknown AST node type " + u.type + ". Maybe you need to change PostCSS stringifier."
        );
      this[u.type](u, f);
    }
  }
  return rn = v, v.default = v, rn;
}
var nn, Wa;
function Lr() {
  if (Wa) return nn;
  Wa = 1;
  let l = xl();
  function i(v, p) {
    new l(p).stringify(v);
  }
  return nn = i, i.default = i, nn;
}
var _t = {}, za;
function la() {
  return za || (za = 1, _t.isClean = Symbol("isClean"), _t.my = Symbol("my")), _t;
}
var an, Ba;
function Nr() {
  if (Ba) return an;
  Ba = 1;
  let l = ua(), i = xl(), v = Lr(), { isClean: p, my: u } = la();
  function f(e, t) {
    let n = new e.constructor();
    for (let a in e) {
      if (!Object.prototype.hasOwnProperty.call(e, a) || a === "proxyCache") continue;
      let s = e[a], g = typeof s;
      a === "parent" && g === "object" ? t && (n[a] = t) : a === "source" ? n[a] = s : Array.isArray(s) ? n[a] = s.map((b) => f(b, n)) : (g === "object" && s !== null && (s = f(s)), n[a] = s);
    }
    return n;
  }
  function o(e, t) {
    if (t && typeof t.offset < "u")
      return t.offset;
    let n = 1, a = 1, s = 0;
    for (let g = 0; g < e.length; g++) {
      if (a === t.line && n === t.column) {
        s = g;
        break;
      }
      e[g] === `
` ? (n = 1, a += 1) : n += 1;
    }
    return s;
  }
  class d {
    get proxyOf() {
      return this;
    }
    constructor(t = {}) {
      this.raws = {}, this[p] = !1, this[u] = !0;
      for (let n in t)
        if (n === "nodes") {
          this.nodes = [];
          for (let a of t[n])
            typeof a.clone == "function" ? this.append(a.clone()) : this.append(a);
        } else
          this[n] = t[n];
    }
    addToError(t) {
      if (t.postcssNode = this, t.stack && this.source && /\n\s{4}at /.test(t.stack)) {
        let n = this.source;
        t.stack = t.stack.replace(
          /\n\s{4}at /,
          `$&${n.input.from}:${n.start.line}:${n.start.column}$&`
        );
      }
      return t;
    }
    after(t) {
      return this.parent.insertAfter(this, t), this;
    }
    assign(t = {}) {
      for (let n in t)
        this[n] = t[n];
      return this;
    }
    before(t) {
      return this.parent.insertBefore(this, t), this;
    }
    cleanRaws(t) {
      delete this.raws.before, delete this.raws.after, t || delete this.raws.between;
    }
    clone(t = {}) {
      let n = f(this);
      for (let a in t)
        n[a] = t[a];
      return n;
    }
    cloneAfter(t = {}) {
      let n = this.clone(t);
      return this.parent.insertAfter(this, n), n;
    }
    cloneBefore(t = {}) {
      let n = this.clone(t);
      return this.parent.insertBefore(this, n), n;
    }
    error(t, n = {}) {
      if (this.source) {
        let { end: a, start: s } = this.rangeBy(n);
        return this.source.input.error(
          t,
          { column: s.column, line: s.line },
          { column: a.column, line: a.line },
          n
        );
      }
      return new l(t);
    }
    getProxyProcessor() {
      return {
        get(t, n) {
          return n === "proxyOf" ? t : n === "root" ? () => t.root().toProxy() : t[n];
        },
        set(t, n, a) {
          return t[n] === a || (t[n] = a, (n === "prop" || n === "value" || n === "name" || n === "params" || n === "important" || /* c8 ignore next */
          n === "text") && t.markDirty()), !0;
        }
      };
    }
    /* c8 ignore next 3 */
    markClean() {
      this[p] = !0;
    }
    markDirty() {
      if (this[p]) {
        this[p] = !1;
        let t = this;
        for (; t = t.parent; )
          t[p] = !1;
      }
    }
    next() {
      if (!this.parent) return;
      let t = this.parent.index(this);
      return this.parent.nodes[t + 1];
    }
    positionBy(t) {
      let n = this.source.start;
      if (t.index)
        n = this.positionInside(t.index);
      else if (t.word) {
        let a = "document" in this.source.input ? this.source.input.document : this.source.input.css, g = a.slice(
          o(a, this.source.start),
          o(a, this.source.end)
        ).indexOf(t.word);
        g !== -1 && (n = this.positionInside(g));
      }
      return n;
    }
    positionInside(t) {
      let n = this.source.start.column, a = this.source.start.line, s = "document" in this.source.input ? this.source.input.document : this.source.input.css, g = o(s, this.source.start), b = g + t;
      for (let r = g; r < b; r++)
        s[r] === `
` ? (n = 1, a += 1) : n += 1;
      return { column: n, line: a };
    }
    prev() {
      if (!this.parent) return;
      let t = this.parent.index(this);
      return this.parent.nodes[t - 1];
    }
    rangeBy(t) {
      let n = {
        column: this.source.start.column,
        line: this.source.start.line
      }, a = this.source.end ? {
        column: this.source.end.column + 1,
        line: this.source.end.line
      } : {
        column: n.column + 1,
        line: n.line
      };
      if (t.word) {
        let s = "document" in this.source.input ? this.source.input.document : this.source.input.css, b = s.slice(
          o(s, this.source.start),
          o(s, this.source.end)
        ).indexOf(t.word);
        b !== -1 && (n = this.positionInside(b), a = this.positionInside(
          b + t.word.length
        ));
      } else
        t.start ? n = {
          column: t.start.column,
          line: t.start.line
        } : t.index && (n = this.positionInside(t.index)), t.end ? a = {
          column: t.end.column,
          line: t.end.line
        } : typeof t.endIndex == "number" ? a = this.positionInside(t.endIndex) : t.index && (a = this.positionInside(t.index + 1));
      return (a.line < n.line || a.line === n.line && a.column <= n.column) && (a = { column: n.column + 1, line: n.line }), { end: a, start: n };
    }
    raw(t, n) {
      return new i().raw(this, t, n);
    }
    remove() {
      return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
    }
    replaceWith(...t) {
      if (this.parent) {
        let n = this, a = !1;
        for (let s of t)
          s === this ? a = !0 : a ? (this.parent.insertAfter(n, s), n = s) : this.parent.insertBefore(n, s);
        a || this.remove();
      }
      return this;
    }
    root() {
      let t = this;
      for (; t.parent && t.parent.type !== "document"; )
        t = t.parent;
      return t;
    }
    toJSON(t, n) {
      let a = {}, s = n == null;
      n = n || /* @__PURE__ */ new Map();
      let g = 0;
      for (let b in this) {
        if (!Object.prototype.hasOwnProperty.call(this, b) || b === "parent" || b === "proxyCache") continue;
        let r = this[b];
        if (Array.isArray(r))
          a[b] = r.map((c) => typeof c == "object" && c.toJSON ? c.toJSON(null, n) : c);
        else if (typeof r == "object" && r.toJSON)
          a[b] = r.toJSON(null, n);
        else if (b === "source") {
          let c = n.get(r.input);
          c == null && (c = g, n.set(r.input, g), g++), a[b] = {
            end: r.end,
            inputId: c,
            start: r.start
          };
        } else
          a[b] = r;
      }
      return s && (a.inputs = [...n.keys()].map((b) => b.toJSON())), a;
    }
    toProxy() {
      return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
    }
    toString(t = v) {
      t.stringify && (t = t.stringify);
      let n = "";
      return t(this, (a) => {
        n += a;
      }), n;
    }
    warn(t, n, a) {
      let s = { node: this };
      for (let g in a) s[g] = a[g];
      return t.warn(n, s);
    }
  }
  return an = d, d.default = d, an;
}
var sn, Va;
function Fr() {
  if (Va) return sn;
  Va = 1;
  let l = Nr();
  class i extends l {
    constructor(p) {
      super(p), this.type = "comment";
    }
  }
  return sn = i, i.default = i, sn;
}
var on, ja;
function $r() {
  if (ja) return on;
  ja = 1;
  let l = Nr();
  class i extends l {
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
    constructor(p) {
      p && typeof p.value < "u" && typeof p.value != "string" && (p = { ...p, value: String(p.value) }), super(p), this.type = "decl";
    }
  }
  return on = i, i.default = i, on;
}
var un, Ga;
function ct() {
  if (Ga) return un;
  Ga = 1;
  let l = Fr(), i = $r(), v = Nr(), { isClean: p, my: u } = la(), f, o, d, e;
  function t(s) {
    return s.map((g) => (g.nodes && (g.nodes = t(g.nodes)), delete g.source, g));
  }
  function n(s) {
    if (s[p] = !1, s.proxyOf.nodes)
      for (let g of s.proxyOf.nodes)
        n(g);
  }
  class a extends v {
    get first() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[0];
    }
    get last() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
    append(...g) {
      for (let b of g) {
        let r = this.normalize(b, this.last);
        for (let c of r) this.proxyOf.nodes.push(c);
      }
      return this.markDirty(), this;
    }
    cleanRaws(g) {
      if (super.cleanRaws(g), this.nodes)
        for (let b of this.nodes) b.cleanRaws(g);
    }
    each(g) {
      if (!this.proxyOf.nodes) return;
      let b = this.getIterator(), r, c;
      for (; this.indexes[b] < this.proxyOf.nodes.length && (r = this.indexes[b], c = g(this.proxyOf.nodes[r], r), c !== !1); )
        this.indexes[b] += 1;
      return delete this.indexes[b], c;
    }
    every(g) {
      return this.nodes.every(g);
    }
    getIterator() {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
      let g = this.lastEach;
      return this.indexes[g] = 0, g;
    }
    getProxyProcessor() {
      return {
        get(g, b) {
          return b === "proxyOf" ? g : g[b] ? b === "each" || typeof b == "string" && b.startsWith("walk") ? (...r) => g[b](
            ...r.map((c) => typeof c == "function" ? (_, m) => c(_.toProxy(), m) : c)
          ) : b === "every" || b === "some" ? (r) => g[b](
            (c, ..._) => r(c.toProxy(), ..._)
          ) : b === "root" ? () => g.root().toProxy() : b === "nodes" ? g.nodes.map((r) => r.toProxy()) : b === "first" || b === "last" ? g[b].toProxy() : g[b] : g[b];
        },
        set(g, b, r) {
          return g[b] === r || (g[b] = r, (b === "name" || b === "params" || b === "selector") && g.markDirty()), !0;
        }
      };
    }
    index(g) {
      return typeof g == "number" ? g : (g.proxyOf && (g = g.proxyOf), this.proxyOf.nodes.indexOf(g));
    }
    insertAfter(g, b) {
      let r = this.index(g), c = this.normalize(b, this.proxyOf.nodes[r]).reverse();
      r = this.index(g);
      for (let m of c) this.proxyOf.nodes.splice(r + 1, 0, m);
      let _;
      for (let m in this.indexes)
        _ = this.indexes[m], r < _ && (this.indexes[m] = _ + c.length);
      return this.markDirty(), this;
    }
    insertBefore(g, b) {
      let r = this.index(g), c = r === 0 ? "prepend" : !1, _ = this.normalize(
        b,
        this.proxyOf.nodes[r],
        c
      ).reverse();
      r = this.index(g);
      for (let y of _) this.proxyOf.nodes.splice(r, 0, y);
      let m;
      for (let y in this.indexes)
        m = this.indexes[y], r <= m && (this.indexes[y] = m + _.length);
      return this.markDirty(), this;
    }
    normalize(g, b) {
      if (typeof g == "string")
        g = t(o(g).nodes);
      else if (typeof g > "u")
        g = [];
      else if (Array.isArray(g)) {
        g = g.slice(0);
        for (let c of g)
          c.parent && c.parent.removeChild(c, "ignore");
      } else if (g.type === "root" && this.type !== "document") {
        g = g.nodes.slice(0);
        for (let c of g)
          c.parent && c.parent.removeChild(c, "ignore");
      } else if (g.type)
        g = [g];
      else if (g.prop) {
        if (typeof g.value > "u")
          throw new Error("Value field is missed in node creation");
        typeof g.value != "string" && (g.value = String(g.value)), g = [new i(g)];
      } else if (g.selector || g.selectors)
        g = [new e(g)];
      else if (g.name)
        g = [new f(g)];
      else if (g.text)
        g = [new l(g)];
      else
        throw new Error("Unknown node type in node creation");
      return g.map((c) => (c[u] || a.rebuild(c), c = c.proxyOf, c.parent && c.parent.removeChild(c), c[p] && n(c), c.raws || (c.raws = {}), typeof c.raws.before > "u" && b && typeof b.raws.before < "u" && (c.raws.before = b.raws.before.replace(/\S/g, "")), c.parent = this.proxyOf, c));
    }
    prepend(...g) {
      g = g.reverse();
      for (let b of g) {
        let r = this.normalize(b, this.first, "prepend").reverse();
        for (let c of r) this.proxyOf.nodes.unshift(c);
        for (let c in this.indexes)
          this.indexes[c] = this.indexes[c] + r.length;
      }
      return this.markDirty(), this;
    }
    push(g) {
      return g.parent = this, this.proxyOf.nodes.push(g), this;
    }
    removeAll() {
      for (let g of this.proxyOf.nodes) g.parent = void 0;
      return this.proxyOf.nodes = [], this.markDirty(), this;
    }
    removeChild(g) {
      g = this.index(g), this.proxyOf.nodes[g].parent = void 0, this.proxyOf.nodes.splice(g, 1);
      let b;
      for (let r in this.indexes)
        b = this.indexes[r], b >= g && (this.indexes[r] = b - 1);
      return this.markDirty(), this;
    }
    replaceValues(g, b, r) {
      return r || (r = b, b = {}), this.walkDecls((c) => {
        b.props && !b.props.includes(c.prop) || b.fast && !c.value.includes(b.fast) || (c.value = c.value.replace(g, r));
      }), this.markDirty(), this;
    }
    some(g) {
      return this.nodes.some(g);
    }
    walk(g) {
      return this.each((b, r) => {
        let c;
        try {
          c = g(b, r);
        } catch (_) {
          throw b.addToError(_);
        }
        return c !== !1 && b.walk && (c = b.walk(g)), c;
      });
    }
    walkAtRules(g, b) {
      return b ? g instanceof RegExp ? this.walk((r, c) => {
        if (r.type === "atrule" && g.test(r.name))
          return b(r, c);
      }) : this.walk((r, c) => {
        if (r.type === "atrule" && r.name === g)
          return b(r, c);
      }) : (b = g, this.walk((r, c) => {
        if (r.type === "atrule")
          return b(r, c);
      }));
    }
    walkComments(g) {
      return this.walk((b, r) => {
        if (b.type === "comment")
          return g(b, r);
      });
    }
    walkDecls(g, b) {
      return b ? g instanceof RegExp ? this.walk((r, c) => {
        if (r.type === "decl" && g.test(r.prop))
          return b(r, c);
      }) : this.walk((r, c) => {
        if (r.type === "decl" && r.prop === g)
          return b(r, c);
      }) : (b = g, this.walk((r, c) => {
        if (r.type === "decl")
          return b(r, c);
      }));
    }
    walkRules(g, b) {
      return b ? g instanceof RegExp ? this.walk((r, c) => {
        if (r.type === "rule" && g.test(r.selector))
          return b(r, c);
      }) : this.walk((r, c) => {
        if (r.type === "rule" && r.selector === g)
          return b(r, c);
      }) : (b = g, this.walk((r, c) => {
        if (r.type === "rule")
          return b(r, c);
      }));
    }
  }
  return a.registerParse = (s) => {
    o = s;
  }, a.registerRule = (s) => {
    e = s;
  }, a.registerAtRule = (s) => {
    f = s;
  }, a.registerRoot = (s) => {
    d = s;
  }, un = a, a.default = a, a.rebuild = (s) => {
    s.type === "atrule" ? Object.setPrototypeOf(s, f.prototype) : s.type === "rule" ? Object.setPrototypeOf(s, e.prototype) : s.type === "decl" ? Object.setPrototypeOf(s, i.prototype) : s.type === "comment" ? Object.setPrototypeOf(s, l.prototype) : s.type === "root" && Object.setPrototypeOf(s, d.prototype), s[u] = !0, s.nodes && s.nodes.forEach((g) => {
      a.rebuild(g);
    });
  }, un;
}
var ln, Ya;
function fa() {
  if (Ya) return ln;
  Ya = 1;
  let l = ct();
  class i extends l {
    constructor(p) {
      super(p), this.type = "atrule";
    }
    append(...p) {
      return this.proxyOf.nodes || (this.nodes = []), super.append(...p);
    }
    prepend(...p) {
      return this.proxyOf.nodes || (this.nodes = []), super.prepend(...p);
    }
  }
  return ln = i, i.default = i, l.registerAtRule(i), ln;
}
var fn, Qa;
function ca() {
  if (Qa) return fn;
  Qa = 1;
  let l = ct(), i, v;
  class p extends l {
    constructor(f) {
      super({ type: "document", ...f }), this.nodes || (this.nodes = []);
    }
    toResult(f = {}) {
      return new i(new v(), this, f).stringify();
    }
  }
  return p.registerLazyResult = (u) => {
    i = u;
  }, p.registerProcessor = (u) => {
    v = u;
  }, fn = p, p.default = p, fn;
}
var cn, Ha;
function Uf() {
  if (Ha) return cn;
  Ha = 1;
  let l = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  return cn = { nanoid: (p = 21) => {
    let u = "", f = p | 0;
    for (; f--; )
      u += l[Math.random() * 64 | 0];
    return u;
  }, customAlphabet: (p, u = 21) => (f = u) => {
    let o = "", d = f | 0;
    for (; d--; )
      o += p[Math.random() * p.length | 0];
    return o;
  } }, cn;
}
var dn, Ja;
function Pl() {
  if (Ja) return dn;
  Ja = 1;
  let { existsSync: l, readFileSync: i } = We, { dirname: v, join: p } = We, { SourceMapConsumer: u, SourceMapGenerator: f } = We;
  function o(e) {
    return Buffer ? Buffer.from(e, "base64").toString() : window.atob(e);
  }
  class d {
    constructor(t, n) {
      if (n.map === !1) return;
      this.loadAnnotation(t), this.inline = this.startWith(this.annotation, "data:");
      let a = n.map ? n.map.prev : void 0, s = this.loadMap(n.from, a);
      !this.mapFile && n.from && (this.mapFile = n.from), this.mapFile && (this.root = v(this.mapFile)), s && (this.text = s);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new u(this.text)), this.consumerCache;
    }
    decodeInline(t) {
      let n = /^data:application\/json;charset=utf-?8;base64,/, a = /^data:application\/json;base64,/, s = /^data:application\/json;charset=utf-?8,/, g = /^data:application\/json,/, b = t.match(s) || t.match(g);
      if (b)
        return decodeURIComponent(t.substr(b[0].length));
      let r = t.match(n) || t.match(a);
      if (r)
        return o(t.substr(r[0].length));
      let c = t.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + c);
    }
    getAnnotationURL(t) {
      return t.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(t) {
      return typeof t != "object" ? !1 : typeof t.mappings == "string" || typeof t._mappings == "string" || Array.isArray(t.sections);
    }
    loadAnnotation(t) {
      let n = t.match(/\/\*\s*# sourceMappingURL=/g);
      if (!n) return;
      let a = t.lastIndexOf(n.pop()), s = t.indexOf("*/", a);
      a > -1 && s > -1 && (this.annotation = this.getAnnotationURL(t.substring(a, s)));
    }
    loadFile(t) {
      if (this.root = v(t), l(t))
        return this.mapFile = t, i(t, "utf-8").toString().trim();
    }
    loadMap(t, n) {
      if (n === !1) return !1;
      if (n) {
        if (typeof n == "string")
          return n;
        if (typeof n == "function") {
          let a = n(t);
          if (a) {
            let s = this.loadFile(a);
            if (!s)
              throw new Error(
                "Unable to load previous source map: " + a.toString()
              );
            return s;
          }
        } else {
          if (n instanceof u)
            return f.fromSourceMap(n).toString();
          if (n instanceof f)
            return n.toString();
          if (this.isMap(n))
            return JSON.stringify(n);
          throw new Error(
            "Unsupported previous source map format: " + n.toString()
          );
        }
      } else {
        if (this.inline)
          return this.decodeInline(this.annotation);
        if (this.annotation) {
          let a = this.annotation;
          return t && (a = p(v(t), a)), this.loadFile(a);
        }
      }
    }
    startWith(t, n) {
      return t ? t.substr(0, n.length) === n : !1;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }
  return dn = d, d.default = d, dn;
}
var pn, Ka;
function Ur() {
  if (Ka) return pn;
  Ka = 1;
  let { nanoid: l } = /* @__PURE__ */ Uf(), { isAbsolute: i, resolve: v } = We, { SourceMapConsumer: p, SourceMapGenerator: u } = We, { fileURLToPath: f, pathToFileURL: o } = We, d = ua(), e = Pl(), t = We, n = Symbol("fromOffsetCache"), a = !!(p && u), s = !!(v && i);
  class g {
    get from() {
      return this.file || this.id;
    }
    constructor(r, c = {}) {
      if (r === null || typeof r > "u" || typeof r == "object" && !r.toString)
        throw new Error(`PostCSS received ${r} instead of CSS string`);
      if (this.css = r.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, this.document = this.css, c.document && (this.document = c.document.toString()), c.from && (!s || /^\w+:\/\//.test(c.from) || i(c.from) ? this.file = c.from : this.file = v(c.from)), s && a) {
        let _ = new e(this.css, c);
        if (_.text) {
          this.map = _;
          let m = _.consumer().file;
          !this.file && m && (this.file = this.mapResolve(m));
        }
      }
      this.file || (this.id = "<input css " + l(6) + ">"), this.map && (this.map.file = this.from);
    }
    error(r, c, _, m = {}) {
      let y, S, h;
      if (c && typeof c == "object") {
        let C = c, T = _;
        if (typeof C.offset == "number") {
          let w = this.fromOffset(C.offset);
          c = w.line, _ = w.col;
        } else
          c = C.line, _ = C.column;
        if (typeof T.offset == "number") {
          let w = this.fromOffset(T.offset);
          S = w.line, y = w.col;
        } else
          S = T.line, y = T.column;
      } else if (!_) {
        let C = this.fromOffset(c);
        c = C.line, _ = C.col;
      }
      let O = this.origin(c, _, S, y);
      return O ? h = new d(
        r,
        O.endLine === void 0 ? O.line : { column: O.column, line: O.line },
        O.endLine === void 0 ? O.column : { column: O.endColumn, line: O.endLine },
        O.source,
        O.file,
        m.plugin
      ) : h = new d(
        r,
        S === void 0 ? c : { column: _, line: c },
        S === void 0 ? _ : { column: y, line: S },
        this.css,
        this.file,
        m.plugin
      ), h.input = { column: _, endColumn: y, endLine: S, line: c, source: this.css }, this.file && (o && (h.input.url = o(this.file).toString()), h.input.file = this.file), h;
    }
    fromOffset(r) {
      let c, _;
      if (this[n])
        _ = this[n];
      else {
        let y = this.css.split(`
`);
        _ = new Array(y.length);
        let S = 0;
        for (let h = 0, O = y.length; h < O; h++)
          _[h] = S, S += y[h].length + 1;
        this[n] = _;
      }
      c = _[_.length - 1];
      let m = 0;
      if (r >= c)
        m = _.length - 1;
      else {
        let y = _.length - 2, S;
        for (; m < y; )
          if (S = m + (y - m >> 1), r < _[S])
            y = S - 1;
          else if (r >= _[S + 1])
            m = S + 1;
          else {
            m = S;
            break;
          }
      }
      return {
        col: r - _[m] + 1,
        line: m + 1
      };
    }
    mapResolve(r) {
      return /^\w+:\/\//.test(r) ? r : v(this.map.consumer().sourceRoot || this.map.root || ".", r);
    }
    origin(r, c, _, m) {
      if (!this.map) return !1;
      let y = this.map.consumer(), S = y.originalPositionFor({ column: c, line: r });
      if (!S.source) return !1;
      let h;
      typeof _ == "number" && (h = y.originalPositionFor({ column: m, line: _ }));
      let O;
      i(S.source) ? O = o(S.source) : O = new URL(
        S.source,
        this.map.consumer().sourceRoot || o(this.map.mapFile)
      );
      let C = {
        column: S.column,
        endColumn: h && h.column,
        endLine: h && h.line,
        line: S.line,
        url: O.toString()
      };
      if (O.protocol === "file:")
        if (f)
          C.file = f(O);
        else
          throw new Error("file: protocol is not available in this PostCSS build");
      let T = y.sourceContentFor(S.source);
      return T && (C.source = T), C;
    }
    toJSON() {
      let r = {};
      for (let c of ["hasBOM", "css", "file", "id"])
        this[c] != null && (r[c] = this[c]);
      return this.map && (r.map = { ...this.map }, r.map.consumerCache && (r.map.consumerCache = void 0)), r;
    }
  }
  return pn = g, g.default = g, t && t.registerInput && t.registerInput(g), pn;
}
var hn, Xa;
function vt() {
  if (Xa) return hn;
  Xa = 1;
  let l = ct(), i, v;
  class p extends l {
    constructor(f) {
      super(f), this.type = "root", this.nodes || (this.nodes = []);
    }
    normalize(f, o, d) {
      let e = super.normalize(f);
      if (o) {
        if (d === "prepend")
          this.nodes.length > 1 ? o.raws.before = this.nodes[1].raws.before : delete o.raws.before;
        else if (this.first !== o)
          for (let t of e)
            t.raws.before = o.raws.before;
      }
      return e;
    }
    removeChild(f, o) {
      let d = this.index(f);
      return !o && d === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[d].raws.before), super.removeChild(f);
    }
    toResult(f = {}) {
      return new i(new v(), this, f).stringify();
    }
  }
  return p.registerLazyResult = (u) => {
    i = u;
  }, p.registerProcessor = (u) => {
    v = u;
  }, hn = p, p.default = p, l.registerRoot(p), hn;
}
var vn, Za;
function Tl() {
  if (Za) return vn;
  Za = 1;
  let l = {
    comma(i) {
      return l.split(i, [","], !0);
    },
    space(i) {
      let v = [" ", `
`, "	"];
      return l.split(i, v);
    },
    split(i, v, p) {
      let u = [], f = "", o = !1, d = 0, e = !1, t = "", n = !1;
      for (let a of i)
        n ? n = !1 : a === "\\" ? n = !0 : e ? a === t && (e = !1) : a === '"' || a === "'" ? (e = !0, t = a) : a === "(" ? d += 1 : a === ")" ? d > 0 && (d -= 1) : d === 0 && v.includes(a) && (o = !0), o ? (f !== "" && u.push(f.trim()), f = "", o = !1) : f += a;
      return (p || f !== "") && u.push(f.trim()), u;
    }
  };
  return vn = l, l.default = l, vn;
}
var gn, es;
function da() {
  if (es) return gn;
  es = 1;
  let l = ct(), i = Tl();
  class v extends l {
    get selectors() {
      return i.comma(this.selector);
    }
    set selectors(u) {
      let f = this.selector ? this.selector.match(/,\s*/) : null, o = f ? f[0] : "," + this.raw("between", "beforeOpen");
      this.selector = u.join(o);
    }
    constructor(u) {
      super(u), this.type = "rule", this.nodes || (this.nodes = []);
    }
  }
  return gn = v, v.default = v, l.registerRule(v), gn;
}
var mn, ts;
function Wf() {
  if (ts) return mn;
  ts = 1;
  let l = fa(), i = Fr(), v = $r(), p = Ur(), u = Pl(), f = vt(), o = da();
  function d(e, t) {
    if (Array.isArray(e)) return e.map((s) => d(s));
    let { inputs: n, ...a } = e;
    if (n) {
      t = [];
      for (let s of n) {
        let g = { ...s, __proto__: p.prototype };
        g.map && (g.map = {
          ...g.map,
          __proto__: u.prototype
        }), t.push(g);
      }
    }
    if (a.nodes && (a.nodes = e.nodes.map((s) => d(s, t))), a.source) {
      let { inputId: s, ...g } = a.source;
      a.source = g, s != null && (a.source.input = t[s]);
    }
    if (a.type === "root")
      return new f(a);
    if (a.type === "decl")
      return new v(a);
    if (a.type === "rule")
      return new o(a);
    if (a.type === "comment")
      return new i(a);
    if (a.type === "atrule")
      return new l(a);
    throw new Error("Unknown node type: " + e.type);
  }
  return mn = d, d.default = d, mn;
}
var yn, rs;
function kl() {
  if (rs) return yn;
  rs = 1;
  let { dirname: l, relative: i, resolve: v, sep: p } = We, { SourceMapConsumer: u, SourceMapGenerator: f } = We, { pathToFileURL: o } = We, d = Ur(), e = !!(u && f), t = !!(l && v && i && p);
  class n {
    constructor(s, g, b, r) {
      this.stringify = s, this.mapOpts = b.map || {}, this.root = g, this.opts = b, this.css = r, this.originalCSS = r, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
    }
    addAnnotation() {
      let s;
      this.isInline() ? s = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? s = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? s = this.mapOpts.annotation(this.opts.to, this.root) : s = this.outputFile() + ".map";
      let g = `
`;
      this.css.includes(`\r
`) && (g = `\r
`), this.css += g + "/*# sourceMappingURL=" + s + " */";
    }
    applyPrevMaps() {
      for (let s of this.previous()) {
        let g = this.toUrl(this.path(s.file)), b = s.root || l(s.file), r;
        this.mapOpts.sourcesContent === !1 ? (r = new u(s.text), r.sourcesContent && (r.sourcesContent = null)) : r = s.consumer(), this.map.applySourceMap(r, g, this.toUrl(this.path(b)));
      }
    }
    clearAnnotation() {
      if (this.mapOpts.annotation !== !1)
        if (this.root) {
          let s;
          for (let g = this.root.nodes.length - 1; g >= 0; g--)
            s = this.root.nodes[g], s.type === "comment" && s.text.startsWith("# sourceMappingURL=") && this.root.removeChild(g);
        } else this.css && (this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, ""));
    }
    generate() {
      if (this.clearAnnotation(), t && e && this.isMap())
        return this.generateMap();
      {
        let s = "";
        return this.stringify(this.root, (g) => {
          s += g;
        }), [s];
      }
    }
    generateMap() {
      if (this.root)
        this.generateString();
      else if (this.previous().length === 1) {
        let s = this.previous()[0].consumer();
        s.file = this.outputFile(), this.map = f.fromSourceMap(s, {
          ignoreInvalidMapping: !0
        });
      } else
        this.map = new f({
          file: this.outputFile(),
          ignoreInvalidMapping: !0
        }), this.map.addMapping({
          generated: { column: 0, line: 1 },
          original: { column: 0, line: 1 },
          source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
        });
      return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
    }
    generateString() {
      this.css = "", this.map = new f({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      });
      let s = 1, g = 1, b = "<no source>", r = {
        generated: { column: 0, line: 0 },
        original: { column: 0, line: 0 },
        source: ""
      }, c, _;
      this.stringify(this.root, (m, y, S) => {
        if (this.css += m, y && S !== "end" && (r.generated.line = s, r.generated.column = g - 1, y.source && y.source.start ? (r.source = this.sourcePath(y), r.original.line = y.source.start.line, r.original.column = y.source.start.column - 1, this.map.addMapping(r)) : (r.source = b, r.original.line = 1, r.original.column = 0, this.map.addMapping(r))), _ = m.match(/\n/g), _ ? (s += _.length, c = m.lastIndexOf(`
`), g = m.length - c) : g += m.length, y && S !== "start") {
          let h = y.parent || { raws: {} };
          (!(y.type === "decl" || y.type === "atrule" && !y.nodes) || y !== h.last || h.raws.semicolon) && (y.source && y.source.end ? (r.source = this.sourcePath(y), r.original.line = y.source.end.line, r.original.column = y.source.end.column - 1, r.generated.line = s, r.generated.column = g - 2, this.map.addMapping(r)) : (r.source = b, r.original.line = 1, r.original.column = 0, r.generated.line = s, r.generated.column = g - 1, this.map.addMapping(r)));
        }
      });
    }
    isAnnotation() {
      return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((s) => s.annotation) : !0;
    }
    isInline() {
      if (typeof this.mapOpts.inline < "u")
        return this.mapOpts.inline;
      let s = this.mapOpts.annotation;
      return typeof s < "u" && s !== !0 ? !1 : this.previous().length ? this.previous().some((g) => g.inline) : !0;
    }
    isMap() {
      return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
    }
    isSourcesContent() {
      return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((s) => s.withContent()) : !0;
    }
    outputFile() {
      return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
    }
    path(s) {
      if (this.mapOpts.absolute || s.charCodeAt(0) === 60 || /^\w+:\/\//.test(s)) return s;
      let g = this.memoizedPaths.get(s);
      if (g) return g;
      let b = this.opts.to ? l(this.opts.to) : ".";
      typeof this.mapOpts.annotation == "string" && (b = l(v(b, this.mapOpts.annotation)));
      let r = i(b, s);
      return this.memoizedPaths.set(s, r), r;
    }
    previous() {
      if (!this.previousMaps)
        if (this.previousMaps = [], this.root)
          this.root.walk((s) => {
            if (s.source && s.source.input.map) {
              let g = s.source.input.map;
              this.previousMaps.includes(g) || this.previousMaps.push(g);
            }
          });
        else {
          let s = new d(this.originalCSS, this.opts);
          s.map && this.previousMaps.push(s.map);
        }
      return this.previousMaps;
    }
    setSourcesContent() {
      let s = {};
      if (this.root)
        this.root.walk((g) => {
          if (g.source) {
            let b = g.source.input.from;
            if (b && !s[b]) {
              s[b] = !0;
              let r = this.usesFileUrls ? this.toFileUrl(b) : this.toUrl(this.path(b));
              this.map.setSourceContent(r, g.source.input.css);
            }
          }
        });
      else if (this.css) {
        let g = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(g, this.css);
      }
    }
    sourcePath(s) {
      return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(s.source.input.from) : this.toUrl(this.path(s.source.input.from));
    }
    toBase64(s) {
      return Buffer ? Buffer.from(s).toString("base64") : window.btoa(unescape(encodeURIComponent(s)));
    }
    toFileUrl(s) {
      let g = this.memoizedFileURLs.get(s);
      if (g) return g;
      if (o) {
        let b = o(s).toString();
        return this.memoizedFileURLs.set(s, b), b;
      } else
        throw new Error(
          "`map.absolute` option is not available in this PostCSS build"
        );
    }
    toUrl(s) {
      let g = this.memoizedURLs.get(s);
      if (g) return g;
      p === "\\" && (s = s.replace(/\\/g, "/"));
      let b = encodeURI(s).replace(/[#?]/g, encodeURIComponent);
      return this.memoizedURLs.set(s, b), b;
    }
  }
  return yn = n, yn;
}
var wn, ns;
function zf() {
  if (ns) return wn;
  ns = 1;
  const l = 39, i = 34, v = 92, p = 47, u = 10, f = 32, o = 12, d = 9, e = 13, t = 91, n = 93, a = 40, s = 41, g = 123, b = 125, r = 59, c = 42, _ = 58, m = 64, y = /[\t\n\f\r "#'()/;[\\\]{}]/g, S = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, h = /.[\r\n"'(/\\]/, O = /[\da-f]/i;
  return wn = function(T, w = {}) {
    let P = T.css.valueOf(), N = w.ignoreErrors, D, B, k, A, R, I, W, Q, z, L, F = P.length, M = 0, E = [], q = [];
    function G() {
      return M;
    }
    function x(U) {
      throw T.error("Unclosed " + U, M);
    }
    function $() {
      return q.length === 0 && M >= F;
    }
    function V(U) {
      if (q.length) return q.pop();
      if (M >= F) return;
      let K = U ? U.ignoreUnclosed : !1;
      switch (D = P.charCodeAt(M), D) {
        case u:
        case f:
        case d:
        case e:
        case o: {
          A = M;
          do
            A += 1, D = P.charCodeAt(A);
          while (D === f || D === u || D === d || D === e || D === o);
          I = ["space", P.slice(M, A)], M = A - 1;
          break;
        }
        case t:
        case n:
        case g:
        case b:
        case _:
        case r:
        case s: {
          let X = String.fromCharCode(D);
          I = [X, X, M];
          break;
        }
        case a: {
          if (L = E.length ? E.pop()[1] : "", z = P.charCodeAt(M + 1), L === "url" && z !== l && z !== i && z !== f && z !== u && z !== d && z !== o && z !== e) {
            A = M;
            do {
              if (W = !1, A = P.indexOf(")", A + 1), A === -1)
                if (N || K) {
                  A = M;
                  break;
                } else
                  x("bracket");
              for (Q = A; P.charCodeAt(Q - 1) === v; )
                Q -= 1, W = !W;
            } while (W);
            I = ["brackets", P.slice(M, A + 1), M, A], M = A;
          } else
            A = P.indexOf(")", M + 1), B = P.slice(M, A + 1), A === -1 || h.test(B) ? I = ["(", "(", M] : (I = ["brackets", B, M, A], M = A);
          break;
        }
        case l:
        case i: {
          R = D === l ? "'" : '"', A = M;
          do {
            if (W = !1, A = P.indexOf(R, A + 1), A === -1)
              if (N || K) {
                A = M + 1;
                break;
              } else
                x("string");
            for (Q = A; P.charCodeAt(Q - 1) === v; )
              Q -= 1, W = !W;
          } while (W);
          I = ["string", P.slice(M, A + 1), M, A], M = A;
          break;
        }
        case m: {
          y.lastIndex = M + 1, y.test(P), y.lastIndex === 0 ? A = P.length - 1 : A = y.lastIndex - 2, I = ["at-word", P.slice(M, A + 1), M, A], M = A;
          break;
        }
        case v: {
          for (A = M, k = !0; P.charCodeAt(A + 1) === v; )
            A += 1, k = !k;
          if (D = P.charCodeAt(A + 1), k && D !== p && D !== f && D !== u && D !== d && D !== e && D !== o && (A += 1, O.test(P.charAt(A)))) {
            for (; O.test(P.charAt(A + 1)); )
              A += 1;
            P.charCodeAt(A + 1) === f && (A += 1);
          }
          I = ["word", P.slice(M, A + 1), M, A], M = A;
          break;
        }
        default: {
          D === p && P.charCodeAt(M + 1) === c ? (A = P.indexOf("*/", M + 2) + 1, A === 0 && (N || K ? A = P.length : x("comment")), I = ["comment", P.slice(M, A + 1), M, A], M = A) : (S.lastIndex = M + 1, S.test(P), S.lastIndex === 0 ? A = P.length - 1 : A = S.lastIndex - 2, I = ["word", P.slice(M, A + 1), M, A], E.push(I), M = A);
          break;
        }
      }
      return M++, I;
    }
    function Y(U) {
      q.push(U);
    }
    return {
      back: Y,
      endOfFile: $,
      nextToken: V,
      position: G
    };
  }, wn;
}
var bn, is;
function Bf() {
  if (is) return bn;
  is = 1;
  let l = fa(), i = Fr(), v = $r(), p = vt(), u = da(), f = zf();
  const o = {
    empty: !0,
    space: !0
  };
  function d(t) {
    for (let n = t.length - 1; n >= 0; n--) {
      let a = t[n], s = a[3] || a[2];
      if (s) return s;
    }
  }
  class e {
    constructor(n) {
      this.input = n, this.root = new p(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: n, start: { column: 1, line: 1, offset: 0 } };
    }
    atrule(n) {
      let a = new l();
      a.name = n[1].slice(1), a.name === "" && this.unnamedAtrule(a, n), this.init(a, n[2]);
      let s, g, b, r = !1, c = !1, _ = [], m = [];
      for (; !this.tokenizer.endOfFile(); ) {
        if (n = this.tokenizer.nextToken(), s = n[0], s === "(" || s === "[" ? m.push(s === "(" ? ")" : "]") : s === "{" && m.length > 0 ? m.push("}") : s === m[m.length - 1] && m.pop(), m.length === 0)
          if (s === ";") {
            a.source.end = this.getPosition(n[2]), a.source.end.offset++, this.semicolon = !0;
            break;
          } else if (s === "{") {
            c = !0;
            break;
          } else if (s === "}") {
            if (_.length > 0) {
              for (b = _.length - 1, g = _[b]; g && g[0] === "space"; )
                g = _[--b];
              g && (a.source.end = this.getPosition(g[3] || g[2]), a.source.end.offset++);
            }
            this.end(n);
            break;
          } else
            _.push(n);
        else
          _.push(n);
        if (this.tokenizer.endOfFile()) {
          r = !0;
          break;
        }
      }
      a.raws.between = this.spacesAndCommentsFromEnd(_), _.length ? (a.raws.afterName = this.spacesAndCommentsFromStart(_), this.raw(a, "params", _), r && (n = _[_.length - 1], a.source.end = this.getPosition(n[3] || n[2]), a.source.end.offset++, this.spaces = a.raws.between, a.raws.between = "")) : (a.raws.afterName = "", a.params = ""), c && (a.nodes = [], this.current = a);
    }
    checkMissedSemicolon(n) {
      let a = this.colon(n);
      if (a === !1) return;
      let s = 0, g;
      for (let b = a - 1; b >= 0 && (g = n[b], !(g[0] !== "space" && (s += 1, s === 2))); b--)
        ;
      throw this.input.error(
        "Missed semicolon",
        g[0] === "word" ? g[3] + 1 : g[2]
      );
    }
    colon(n) {
      let a = 0, s, g, b;
      for (let [r, c] of n.entries()) {
        if (g = c, b = g[0], b === "(" && (a += 1), b === ")" && (a -= 1), a === 0 && b === ":")
          if (!s)
            this.doubleColon(g);
          else {
            if (s[0] === "word" && s[1] === "progid")
              continue;
            return r;
          }
        s = g;
      }
      return !1;
    }
    comment(n) {
      let a = new i();
      this.init(a, n[2]), a.source.end = this.getPosition(n[3] || n[2]), a.source.end.offset++;
      let s = n[1].slice(2, -2);
      if (/^\s*$/.test(s))
        a.text = "", a.raws.left = s, a.raws.right = "";
      else {
        let g = s.match(/^(\s*)([^]*\S)(\s*)$/);
        a.text = g[2], a.raws.left = g[1], a.raws.right = g[3];
      }
    }
    createTokenizer() {
      this.tokenizer = f(this.input);
    }
    decl(n, a) {
      let s = new v();
      this.init(s, n[0][2]);
      let g = n[n.length - 1];
      for (g[0] === ";" && (this.semicolon = !0, n.pop()), s.source.end = this.getPosition(
        g[3] || g[2] || d(n)
      ), s.source.end.offset++; n[0][0] !== "word"; )
        n.length === 1 && this.unknownWord(n), s.raws.before += n.shift()[1];
      for (s.source.start = this.getPosition(n[0][2]), s.prop = ""; n.length; ) {
        let m = n[0][0];
        if (m === ":" || m === "space" || m === "comment")
          break;
        s.prop += n.shift()[1];
      }
      s.raws.between = "";
      let b;
      for (; n.length; )
        if (b = n.shift(), b[0] === ":") {
          s.raws.between += b[1];
          break;
        } else
          b[0] === "word" && /\w/.test(b[1]) && this.unknownWord([b]), s.raws.between += b[1];
      (s.prop[0] === "_" || s.prop[0] === "*") && (s.raws.before += s.prop[0], s.prop = s.prop.slice(1));
      let r = [], c;
      for (; n.length && (c = n[0][0], !(c !== "space" && c !== "comment")); )
        r.push(n.shift());
      this.precheckMissedSemicolon(n);
      for (let m = n.length - 1; m >= 0; m--) {
        if (b = n[m], b[1].toLowerCase() === "!important") {
          s.important = !0;
          let y = this.stringFrom(n, m);
          y = this.spacesFromEnd(n) + y, y !== " !important" && (s.raws.important = y);
          break;
        } else if (b[1].toLowerCase() === "important") {
          let y = n.slice(0), S = "";
          for (let h = m; h > 0; h--) {
            let O = y[h][0];
            if (S.trim().startsWith("!") && O !== "space")
              break;
            S = y.pop()[1] + S;
          }
          S.trim().startsWith("!") && (s.important = !0, s.raws.important = S, n = y);
        }
        if (b[0] !== "space" && b[0] !== "comment")
          break;
      }
      n.some((m) => m[0] !== "space" && m[0] !== "comment") && (s.raws.between += r.map((m) => m[1]).join(""), r = []), this.raw(s, "value", r.concat(n), a), s.value.includes(":") && !a && this.checkMissedSemicolon(n);
    }
    doubleColon(n) {
      throw this.input.error(
        "Double colon",
        { offset: n[2] },
        { offset: n[2] + n[1].length }
      );
    }
    emptyRule(n) {
      let a = new u();
      this.init(a, n[2]), a.selector = "", a.raws.between = "", this.current = a;
    }
    end(n) {
      this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(n[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(n);
    }
    endFile() {
      this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
    }
    freeSemicolon(n) {
      if (this.spaces += n[1], this.current.nodes) {
        let a = this.current.nodes[this.current.nodes.length - 1];
        a && a.type === "rule" && !a.raws.ownSemicolon && (a.raws.ownSemicolon = this.spaces, this.spaces = "", a.source.end = this.getPosition(n[2]), a.source.end.offset += a.raws.ownSemicolon.length);
      }
    }
    // Helpers
    getPosition(n) {
      let a = this.input.fromOffset(n);
      return {
        column: a.col,
        line: a.line,
        offset: n
      };
    }
    init(n, a) {
      this.current.push(n), n.source = {
        input: this.input,
        start: this.getPosition(a)
      }, n.raws.before = this.spaces, this.spaces = "", n.type !== "comment" && (this.semicolon = !1);
    }
    other(n) {
      let a = !1, s = null, g = !1, b = null, r = [], c = n[1].startsWith("--"), _ = [], m = n;
      for (; m; ) {
        if (s = m[0], _.push(m), s === "(" || s === "[")
          b || (b = m), r.push(s === "(" ? ")" : "]");
        else if (c && g && s === "{")
          b || (b = m), r.push("}");
        else if (r.length === 0)
          if (s === ";")
            if (g) {
              this.decl(_, c);
              return;
            } else
              break;
          else if (s === "{") {
            this.rule(_);
            return;
          } else if (s === "}") {
            this.tokenizer.back(_.pop()), a = !0;
            break;
          } else s === ":" && (g = !0);
        else s === r[r.length - 1] && (r.pop(), r.length === 0 && (b = null));
        m = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile() && (a = !0), r.length > 0 && this.unclosedBracket(b), a && g) {
        if (!c)
          for (; _.length && (m = _[_.length - 1][0], !(m !== "space" && m !== "comment")); )
            this.tokenizer.back(_.pop());
        this.decl(_, c);
      } else
        this.unknownWord(_);
    }
    parse() {
      let n;
      for (; !this.tokenizer.endOfFile(); )
        switch (n = this.tokenizer.nextToken(), n[0]) {
          case "space":
            this.spaces += n[1];
            break;
          case ";":
            this.freeSemicolon(n);
            break;
          case "}":
            this.end(n);
            break;
          case "comment":
            this.comment(n);
            break;
          case "at-word":
            this.atrule(n);
            break;
          case "{":
            this.emptyRule(n);
            break;
          default:
            this.other(n);
            break;
        }
      this.endFile();
    }
    precheckMissedSemicolon() {
    }
    raw(n, a, s, g) {
      let b, r, c = s.length, _ = "", m = !0, y, S;
      for (let h = 0; h < c; h += 1)
        b = s[h], r = b[0], r === "space" && h === c - 1 && !g ? m = !1 : r === "comment" ? (S = s[h - 1] ? s[h - 1][0] : "empty", y = s[h + 1] ? s[h + 1][0] : "empty", !o[S] && !o[y] ? _.slice(-1) === "," ? m = !1 : _ += b[1] : m = !1) : _ += b[1];
      if (!m) {
        let h = s.reduce((O, C) => O + C[1], "");
        n.raws[a] = { raw: h, value: _ };
      }
      n[a] = _;
    }
    rule(n) {
      n.pop();
      let a = new u();
      this.init(a, n[0][2]), a.raws.between = this.spacesAndCommentsFromEnd(n), this.raw(a, "selector", n), this.current = a;
    }
    spacesAndCommentsFromEnd(n) {
      let a, s = "";
      for (; n.length && (a = n[n.length - 1][0], !(a !== "space" && a !== "comment")); )
        s = n.pop()[1] + s;
      return s;
    }
    // Errors
    spacesAndCommentsFromStart(n) {
      let a, s = "";
      for (; n.length && (a = n[0][0], !(a !== "space" && a !== "comment")); )
        s += n.shift()[1];
      return s;
    }
    spacesFromEnd(n) {
      let a, s = "";
      for (; n.length && (a = n[n.length - 1][0], a === "space"); )
        s = n.pop()[1] + s;
      return s;
    }
    stringFrom(n, a) {
      let s = "";
      for (let g = a; g < n.length; g++)
        s += n[g][1];
      return n.splice(a, n.length - a), s;
    }
    unclosedBlock() {
      let n = this.current.source.start;
      throw this.input.error("Unclosed block", n.line, n.column);
    }
    unclosedBracket(n) {
      throw this.input.error(
        "Unclosed bracket",
        { offset: n[2] },
        { offset: n[2] + 1 }
      );
    }
    unexpectedClose(n) {
      throw this.input.error(
        "Unexpected }",
        { offset: n[2] },
        { offset: n[2] + 1 }
      );
    }
    unknownWord(n) {
      throw this.input.error(
        "Unknown word " + n[0][1],
        { offset: n[0][2] },
        { offset: n[0][2] + n[0][1].length }
      );
    }
    unnamedAtrule(n, a) {
      throw this.input.error(
        "At-rule without name",
        { offset: a[2] },
        { offset: a[2] + a[1].length }
      );
    }
  }
  return bn = e, bn;
}
var _n, as;
function pa() {
  if (as) return _n;
  as = 1;
  let l = ct(), i = Ur(), v = Bf();
  function p(u, f) {
    let o = new i(u, f), d = new v(o);
    try {
      d.parse();
    } catch (e) {
      throw process.env.NODE_ENV !== "production" && e.name === "CssSyntaxError" && f && f.from && (/\.scss$/i.test(f.from) ? e.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(f.from) ? e.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(f.from) && (e.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), e;
    }
    return d.root;
  }
  return _n = p, p.default = p, l.registerParse(p), _n;
}
var Sn, ss;
function El() {
  if (ss) return Sn;
  ss = 1;
  class l {
    constructor(v, p = {}) {
      if (this.type = "warning", this.text = v, p.node && p.node.source) {
        let u = p.node.rangeBy(p);
        this.line = u.start.line, this.column = u.start.column, this.endLine = u.end.line, this.endColumn = u.end.column;
      }
      for (let u in p) this[u] = p[u];
    }
    toString() {
      return this.node ? this.node.error(this.text, {
        index: this.index,
        plugin: this.plugin,
        word: this.word
      }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
    }
  }
  return Sn = l, l.default = l, Sn;
}
var On, os;
function ha() {
  if (os) return On;
  os = 1;
  let l = El();
  class i {
    get content() {
      return this.css;
    }
    constructor(p, u, f) {
      this.processor = p, this.messages = [], this.root = u, this.opts = f, this.css = void 0, this.map = void 0;
    }
    toString() {
      return this.css;
    }
    warn(p, u = {}) {
      u.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (u.plugin = this.lastPlugin.postcssPlugin);
      let f = new l(p, u);
      return this.messages.push(f), f;
    }
    warnings() {
      return this.messages.filter((p) => p.type === "warning");
    }
  }
  return On = i, i.default = i, On;
}
var xn, us;
function Al() {
  if (us) return xn;
  us = 1;
  let l = {};
  return xn = function(v) {
    l[v] || (l[v] = !0, typeof console < "u" && console.warn && console.warn(v));
  }, xn;
}
var Pn, ls;
function Cl() {
  if (ls) return Pn;
  ls = 1;
  let l = ct(), i = ca(), v = kl(), p = pa(), u = ha(), f = vt(), o = Lr(), { isClean: d, my: e } = la(), t = Al();
  const n = {
    atrule: "AtRule",
    comment: "Comment",
    decl: "Declaration",
    document: "Document",
    root: "Root",
    rule: "Rule"
  }, a = {
    AtRule: !0,
    AtRuleExit: !0,
    Comment: !0,
    CommentExit: !0,
    Declaration: !0,
    DeclarationExit: !0,
    Document: !0,
    DocumentExit: !0,
    Once: !0,
    OnceExit: !0,
    postcssPlugin: !0,
    prepare: !0,
    Root: !0,
    RootExit: !0,
    Rule: !0,
    RuleExit: !0
  }, s = {
    Once: !0,
    postcssPlugin: !0,
    prepare: !0
  }, g = 0;
  function b(S) {
    return typeof S == "object" && typeof S.then == "function";
  }
  function r(S) {
    let h = !1, O = n[S.type];
    return S.type === "decl" ? h = S.prop.toLowerCase() : S.type === "atrule" && (h = S.name.toLowerCase()), h && S.append ? [
      O,
      O + "-" + h,
      g,
      O + "Exit",
      O + "Exit-" + h
    ] : h ? [O, O + "-" + h, O + "Exit", O + "Exit-" + h] : S.append ? [O, g, O + "Exit"] : [O, O + "Exit"];
  }
  function c(S) {
    let h;
    return S.type === "document" ? h = ["Document", g, "DocumentExit"] : S.type === "root" ? h = ["Root", g, "RootExit"] : h = r(S), {
      eventIndex: 0,
      events: h,
      iterator: 0,
      node: S,
      visitorIndex: 0,
      visitors: []
    };
  }
  function _(S) {
    return S[d] = !1, S.nodes && S.nodes.forEach((h) => _(h)), S;
  }
  let m = {};
  class y {
    get content() {
      return this.stringify().content;
    }
    get css() {
      return this.stringify().css;
    }
    get map() {
      return this.stringify().map;
    }
    get messages() {
      return this.sync().messages;
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      return this.sync().root;
    }
    get [Symbol.toStringTag]() {
      return "LazyResult";
    }
    constructor(h, O, C) {
      this.stringified = !1, this.processed = !1;
      let T;
      if (typeof O == "object" && O !== null && (O.type === "root" || O.type === "document"))
        T = _(O);
      else if (O instanceof y || O instanceof u)
        T = _(O.root), O.map && (typeof C.map > "u" && (C.map = {}), C.map.inline || (C.map.inline = !1), C.map.prev = O.map);
      else {
        let w = p;
        C.syntax && (w = C.syntax.parse), C.parser && (w = C.parser), w.parse && (w = w.parse);
        try {
          T = w(O, C);
        } catch (P) {
          this.processed = !0, this.error = P;
        }
        T && !T[e] && l.rebuild(T);
      }
      this.result = new u(h, T, C), this.helpers = { ...m, postcss: m, result: this.result }, this.plugins = this.processor.plugins.map((w) => typeof w == "object" && w.prepare ? { ...w, ...w.prepare(this.result) } : w);
    }
    async() {
      return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
    }
    catch(h) {
      return this.async().catch(h);
    }
    finally(h) {
      return this.async().then(h, h);
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(h, O) {
      let C = this.result.lastPlugin;
      try {
        if (O && O.addToError(h), this.error = h, h.name === "CssSyntaxError" && !h.plugin)
          h.plugin = C.postcssPlugin, h.setMessage();
        else if (C.postcssVersion && process.env.NODE_ENV !== "production") {
          let T = C.postcssPlugin, w = C.postcssVersion, P = this.result.processor.version, N = w.split("."), D = P.split(".");
          (N[0] !== D[0] || parseInt(N[1]) > parseInt(D[1])) && console.error(
            "Unknown error from PostCSS plugin. Your current PostCSS version is " + P + ", but " + T + " uses " + w + ". Perhaps this is the source of the error below."
          );
        }
      } catch (T) {
        console && console.error && console.error(T);
      }
      return h;
    }
    prepareVisitors() {
      this.listeners = {};
      let h = (O, C, T) => {
        this.listeners[C] || (this.listeners[C] = []), this.listeners[C].push([O, T]);
      };
      for (let O of this.plugins)
        if (typeof O == "object")
          for (let C in O) {
            if (!a[C] && /^[A-Z]/.test(C))
              throw new Error(
                `Unknown event ${C} in ${O.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
              );
            if (!s[C])
              if (typeof O[C] == "object")
                for (let T in O[C])
                  T === "*" ? h(O, C, O[C][T]) : h(
                    O,
                    C + "-" + T.toLowerCase(),
                    O[C][T]
                  );
              else typeof O[C] == "function" && h(O, C, O[C]);
          }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    async runAsync() {
      this.plugin = 0;
      for (let h = 0; h < this.plugins.length; h++) {
        let O = this.plugins[h], C = this.runOnRoot(O);
        if (b(C))
          try {
            await C;
          } catch (T) {
            throw this.handleError(T);
          }
      }
      if (this.prepareVisitors(), this.hasListener) {
        let h = this.result.root;
        for (; !h[d]; ) {
          h[d] = !0;
          let O = [c(h)];
          for (; O.length > 0; ) {
            let C = this.visitTick(O);
            if (b(C))
              try {
                await C;
              } catch (T) {
                let w = O[O.length - 1].node;
                throw this.handleError(T, w);
              }
          }
        }
        if (this.listeners.OnceExit)
          for (let [O, C] of this.listeners.OnceExit) {
            this.result.lastPlugin = O;
            try {
              if (h.type === "document") {
                let T = h.nodes.map(
                  (w) => C(w, this.helpers)
                );
                await Promise.all(T);
              } else
                await C(h, this.helpers);
            } catch (T) {
              throw this.handleError(T);
            }
          }
      }
      return this.processed = !0, this.stringify();
    }
    runOnRoot(h) {
      this.result.lastPlugin = h;
      try {
        if (typeof h == "object" && h.Once) {
          if (this.result.root.type === "document") {
            let O = this.result.root.nodes.map(
              (C) => h.Once(C, this.helpers)
            );
            return b(O[0]) ? Promise.all(O) : O;
          }
          return h.Once(this.result.root, this.helpers);
        } else if (typeof h == "function")
          return h(this.result.root, this.result);
      } catch (O) {
        throw this.handleError(O);
      }
    }
    stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      this.stringified = !0, this.sync();
      let h = this.result.opts, O = o;
      h.syntax && (O = h.syntax.stringify), h.stringifier && (O = h.stringifier), O.stringify && (O = O.stringify);
      let T = new v(O, this.result.root, this.result.opts).generate();
      return this.result.css = T[0], this.result.map = T[1], this.result;
    }
    sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      if (this.processed = !0, this.processing)
        throw this.getAsyncError();
      for (let h of this.plugins) {
        let O = this.runOnRoot(h);
        if (b(O))
          throw this.getAsyncError();
      }
      if (this.prepareVisitors(), this.hasListener) {
        let h = this.result.root;
        for (; !h[d]; )
          h[d] = !0, this.walkSync(h);
        if (this.listeners.OnceExit)
          if (h.type === "document")
            for (let O of h.nodes)
              this.visitSync(this.listeners.OnceExit, O);
          else
            this.visitSync(this.listeners.OnceExit, h);
      }
      return this.result;
    }
    then(h, O) {
      return process.env.NODE_ENV !== "production" && ("from" in this.opts || t(
        "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
      )), this.async().then(h, O);
    }
    toString() {
      return this.css;
    }
    visitSync(h, O) {
      for (let [C, T] of h) {
        this.result.lastPlugin = C;
        let w;
        try {
          w = T(O, this.helpers);
        } catch (P) {
          throw this.handleError(P, O.proxyOf);
        }
        if (O.type !== "root" && O.type !== "document" && !O.parent)
          return !0;
        if (b(w))
          throw this.getAsyncError();
      }
    }
    visitTick(h) {
      let O = h[h.length - 1], { node: C, visitors: T } = O;
      if (C.type !== "root" && C.type !== "document" && !C.parent) {
        h.pop();
        return;
      }
      if (T.length > 0 && O.visitorIndex < T.length) {
        let [P, N] = T[O.visitorIndex];
        O.visitorIndex += 1, O.visitorIndex === T.length && (O.visitors = [], O.visitorIndex = 0), this.result.lastPlugin = P;
        try {
          return N(C.toProxy(), this.helpers);
        } catch (D) {
          throw this.handleError(D, C);
        }
      }
      if (O.iterator !== 0) {
        let P = O.iterator, N;
        for (; N = C.nodes[C.indexes[P]]; )
          if (C.indexes[P] += 1, !N[d]) {
            N[d] = !0, h.push(c(N));
            return;
          }
        O.iterator = 0, delete C.indexes[P];
      }
      let w = O.events;
      for (; O.eventIndex < w.length; ) {
        let P = w[O.eventIndex];
        if (O.eventIndex += 1, P === g) {
          C.nodes && C.nodes.length && (C[d] = !0, O.iterator = C.getIterator());
          return;
        } else if (this.listeners[P]) {
          O.visitors = this.listeners[P];
          return;
        }
      }
      h.pop();
    }
    walkSync(h) {
      h[d] = !0;
      let O = r(h);
      for (let C of O)
        if (C === g)
          h.nodes && h.each((T) => {
            T[d] || this.walkSync(T);
          });
        else {
          let T = this.listeners[C];
          if (T && this.visitSync(T, h.toProxy()))
            return;
        }
    }
    warnings() {
      return this.sync().warnings();
    }
  }
  return y.registerPostcss = (S) => {
    m = S;
  }, Pn = y, y.default = y, f.registerLazyResult(y), i.registerLazyResult(y), Pn;
}
var Tn, fs;
function Vf() {
  if (fs) return Tn;
  fs = 1;
  let l = kl(), i = pa();
  const v = ha();
  let p = Lr(), u = Al();
  class f {
    get content() {
      return this.result.css;
    }
    get css() {
      return this.result.css;
    }
    get map() {
      return this.result.map;
    }
    get messages() {
      return [];
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      if (this._root)
        return this._root;
      let d, e = i;
      try {
        d = e(this._css, this._opts);
      } catch (t) {
        this.error = t;
      }
      if (this.error)
        throw this.error;
      return this._root = d, d;
    }
    get [Symbol.toStringTag]() {
      return "NoWorkResult";
    }
    constructor(d, e, t) {
      e = e.toString(), this.stringified = !1, this._processor = d, this._css = e, this._opts = t, this._map = void 0;
      let n, a = p;
      this.result = new v(this._processor, n, this._opts), this.result.css = e;
      let s = this;
      Object.defineProperty(this.result, "root", {
        get() {
          return s.root;
        }
      });
      let g = new l(a, n, this._opts, e);
      if (g.isMap()) {
        let [b, r] = g.generate();
        b && (this.result.css = b), r && (this.result.map = r);
      } else
        g.clearAnnotation(), this.result.css = g.css;
    }
    async() {
      return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
    }
    catch(d) {
      return this.async().catch(d);
    }
    finally(d) {
      return this.async().then(d, d);
    }
    sync() {
      if (this.error) throw this.error;
      return this.result;
    }
    then(d, e) {
      return process.env.NODE_ENV !== "production" && ("from" in this._opts || u(
        "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
      )), this.async().then(d, e);
    }
    toString() {
      return this._css;
    }
    warnings() {
      return [];
    }
  }
  return Tn = f, f.default = f, Tn;
}
var kn, cs;
function jf() {
  if (cs) return kn;
  cs = 1;
  let l = ca(), i = Cl(), v = Vf(), p = vt();
  class u {
    constructor(o = []) {
      this.version = "8.5.3", this.plugins = this.normalize(o);
    }
    normalize(o) {
      let d = [];
      for (let e of o)
        if (e.postcss === !0 ? e = e() : e.postcss && (e = e.postcss), typeof e == "object" && Array.isArray(e.plugins))
          d = d.concat(e.plugins);
        else if (typeof e == "object" && e.postcssPlugin)
          d.push(e);
        else if (typeof e == "function")
          d.push(e);
        else if (typeof e == "object" && (e.parse || e.stringify)) {
          if (process.env.NODE_ENV !== "production")
            throw new Error(
              "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
            );
        } else
          throw new Error(e + " is not a PostCSS plugin");
      return d;
    }
    process(o, d = {}) {
      return !this.plugins.length && !d.parser && !d.stringifier && !d.syntax ? new v(this, o, d) : new i(this, o, d);
    }
    use(o) {
      return this.plugins = this.plugins.concat(this.normalize([o])), this;
    }
  }
  return kn = u, u.default = u, p.registerProcessor(u), l.registerProcessor(u), kn;
}
var En, ds;
function Je() {
  if (ds) return En;
  ds = 1;
  let l = fa(), i = Fr(), v = ct(), p = ua(), u = $r(), f = ca(), o = Wf(), d = Ur(), e = Cl(), t = Tl(), n = Nr(), a = pa(), s = jf(), g = ha(), b = vt(), r = da(), c = Lr(), _ = El();
  function m(...y) {
    return y.length === 1 && Array.isArray(y[0]) && (y = y[0]), new s(y);
  }
  return m.plugin = function(S, h) {
    let O = !1;
    function C(...w) {
      console && console.warn && !O && (O = !0, console.warn(
        S + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
      ), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(
        S + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
      ));
      let P = h(...w);
      return P.postcssPlugin = S, P.postcssVersion = new s().version, P;
    }
    let T;
    return Object.defineProperty(C, "postcss", {
      get() {
        return T || (T = C()), T;
      }
    }), C.process = function(w, P, N) {
      return m([C(N)]).process(w, P);
    }, C;
  }, m.stringify = c, m.parse = a, m.fromJSON = o, m.list = t, m.comment = (y) => new i(y), m.atRule = (y) => new l(y), m.decl = (y) => new u(y), m.rule = (y) => new r(y), m.root = (y) => new b(y), m.document = (y) => new f(y), m.CssSyntaxError = p, m.Declaration = u, m.Container = v, m.Processor = s, m.Document = f, m.Comment = i, m.Warning = _, m.AtRule = l, m.Result = g, m.Input = d, m.Rule = r, m.Root = b, m.Node = n, e.registerPostcss(m), En = m, m.default = m, En;
}
var Gf = Je();
const Ue = /* @__PURE__ */ tt(Gf);
Ue.stringify;
Ue.fromJSON;
Ue.plugin;
const Yf = Ue.parse;
Ue.list;
Ue.document;
Ue.comment;
Ue.atRule;
const Qf = Ue.rule, Hf = Ue.decl;
Ue.root;
Ue.CssSyntaxError;
Ue.Declaration;
Ue.Container;
Ue.Processor;
Ue.Document;
Ue.Comment;
Ue.Warning;
const Rl = Ue.AtRule;
Ue.Result;
Ue.Input;
const ps = Ue.Rule, Jf = Ue.Root;
Ue.Node;
const Kf = (l) => l.replace(/\/\*[\s\S]*?\*\//gm, "").replace(/;\s+/gm, ";").replace(/:\s+/gm, ":").replace(/\)\s*{/gm, "){").replace(/\s+\(/gm, "(").replace(/{\s+/gm, "{").replace(/}\s+/gm, "}").replace(/\s*{/gm, "{").replace(/;?\s*}/gm, "}"), va = (l) => {
  if (l.first === void 0) {
    const i = l.parent;
    i && (l.remove(), va(i));
  }
}, Xf = (l) => {
  l.walkRules((i) => {
    l.walkRules(i.selector, (v) => {
      if (v === i) return;
      const p = v.parent;
      v.remove(), p && va(p);
    });
  });
}, Il = (l) => typeof l.type == "function" || // @ts-expect-error - we know this is a component that may have a render function
l.type.render !== void 0;
function qr(l, i) {
  const v = ht.Children.map(l, (p) => {
    if (ht.isValidElement(p)) {
      const u = { ...p.props };
      p.props.children && !Il(p) && (u.children = qr(p.props.children, i));
      const f = i(
        ht.cloneElement(p, u, u.children)
      );
      if (ht.isValidElement(f) && (typeof f.type == "function" || // @ts-expect-error - we know this is a component that may have a render function
      f.type.render)) {
        const d = (typeof f.type == "object" ? (
          // @ts-expect-error - we know this is a component with a render function
          f.type.render
        ) : f.type)(f.props);
        return qr(d, i);
      }
      return f;
    }
    return i(p);
  });
  return v && v.length === 1 ? v[0] : v;
}
const Zf = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine"
}, Ml = (l) => l.replaceAll("+", "plus").replaceAll("[", "").replaceAll("%", "pc").replaceAll("]", "").replaceAll("(", "").replaceAll(")", "").replaceAll("!", "imprtnt").replaceAll(">", "gt").replaceAll("<", "lt").replaceAll("=", "eq").replace(/^[0-9]/, (i) => Zf[i]).replace(/[^a-zA-Z0-9\-_]/g, "_");
var St = { exports: {} }, Ot = { exports: {} }, xt = { exports: {} }, Pt = { exports: {} }, Tt = { exports: {} }, kt = { exports: {} }, Xe = {}, Et = { exports: {} }, hs;
function Dl() {
  return hs || (hs = 1, (function(l, i) {
    i.__esModule = !0, i.default = u;
    function v(f) {
      for (var o = f.toLowerCase(), d = "", e = !1, t = 0; t < 6 && o[t] !== void 0; t++) {
        var n = o.charCodeAt(t), a = n >= 97 && n <= 102 || n >= 48 && n <= 57;
        if (e = n === 32, !a)
          break;
        d += o[t];
      }
      if (d.length !== 0) {
        var s = parseInt(d, 16), g = s >= 55296 && s <= 57343;
        return g || s === 0 || s > 1114111 ? ["�", d.length + (e ? 1 : 0)] : [String.fromCodePoint(s), d.length + (e ? 1 : 0)];
      }
    }
    var p = /\\/;
    function u(f) {
      var o = p.test(f);
      if (!o)
        return f;
      for (var d = "", e = 0; e < f.length; e++) {
        if (f[e] === "\\") {
          var t = v(f.slice(e + 1, e + 7));
          if (t !== void 0) {
            d += t[0], e += t[1];
            continue;
          }
          if (f[e + 1] === "\\") {
            d += "\\", e++;
            continue;
          }
          f.length === e + 1 && (d += f[e]);
          continue;
        }
        d += f[e];
      }
      return d;
    }
    l.exports = i.default;
  })(Et, Et.exports)), Et.exports;
}
var At = { exports: {} }, vs;
function ec() {
  return vs || (vs = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = arguments.length, f = new Array(u > 1 ? u - 1 : 0), o = 1; o < u; o++)
        f[o - 1] = arguments[o];
      for (; f.length > 0; ) {
        var d = f.shift();
        if (!p[d])
          return;
        p = p[d];
      }
      return p;
    }
    l.exports = i.default;
  })(At, At.exports)), At.exports;
}
var Ct = { exports: {} }, gs;
function tc() {
  return gs || (gs = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = arguments.length, f = new Array(u > 1 ? u - 1 : 0), o = 1; o < u; o++)
        f[o - 1] = arguments[o];
      for (; f.length > 0; ) {
        var d = f.shift();
        p[d] || (p[d] = {}), p = p[d];
      }
    }
    l.exports = i.default;
  })(Ct, Ct.exports)), Ct.exports;
}
var Rt = { exports: {} }, ms;
function rc() {
  return ms || (ms = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = "", f = p.indexOf("/*"), o = 0; f >= 0; ) {
        u = u + p.slice(o, f);
        var d = p.indexOf("*/", f + 2);
        if (d < 0)
          return u;
        o = d + 2, f = p.indexOf("/*", o);
      }
      return u = u + p.slice(o), u;
    }
    l.exports = i.default;
  })(Rt, Rt.exports)), Rt.exports;
}
var ys;
function Wr() {
  if (ys) return Xe;
  ys = 1, Xe.__esModule = !0, Xe.unesc = Xe.stripComments = Xe.getProp = Xe.ensureObject = void 0;
  var l = u(Dl());
  Xe.unesc = l.default;
  var i = u(ec());
  Xe.getProp = i.default;
  var v = u(tc());
  Xe.ensureObject = v.default;
  var p = u(rc());
  Xe.stripComments = p.default;
  function u(f) {
    return f && f.__esModule ? f : { default: f };
  }
  return Xe;
}
var ws;
function st() {
  return ws || (ws = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = Wr();
    function p(d, e) {
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(d, n.key, n);
      }
    }
    function u(d, e, t) {
      return e && p(d.prototype, e), Object.defineProperty(d, "prototype", { writable: !1 }), d;
    }
    var f = function d(e, t) {
      if (typeof e != "object" || e === null)
        return e;
      var n = new e.constructor();
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var s = e[a], g = typeof s;
          a === "parent" && g === "object" ? t && (n[a] = t) : s instanceof Array ? n[a] = s.map(function(b) {
            return d(b, n);
          }) : n[a] = d(s, n);
        }
      return n;
    }, o = /* @__PURE__ */ (function() {
      function d(t) {
        t === void 0 && (t = {}), Object.assign(this, t), this.spaces = this.spaces || {}, this.spaces.before = this.spaces.before || "", this.spaces.after = this.spaces.after || "";
      }
      var e = d.prototype;
      return e.remove = function() {
        return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
      }, e.replaceWith = function() {
        if (this.parent) {
          for (var n in arguments)
            this.parent.insertBefore(this, arguments[n]);
          this.remove();
        }
        return this;
      }, e.next = function() {
        return this.parent.at(this.parent.index(this) + 1);
      }, e.prev = function() {
        return this.parent.at(this.parent.index(this) - 1);
      }, e.clone = function(n) {
        n === void 0 && (n = {});
        var a = f(this);
        for (var s in n)
          a[s] = n[s];
        return a;
      }, e.appendToPropertyAndEscape = function(n, a, s) {
        this.raws || (this.raws = {});
        var g = this[n], b = this.raws[n];
        this[n] = g + a, b || s !== a ? this.raws[n] = (b || g) + s : delete this.raws[n];
      }, e.setPropertyAndEscape = function(n, a, s) {
        this.raws || (this.raws = {}), this[n] = a, this.raws[n] = s;
      }, e.setPropertyWithoutEscape = function(n, a) {
        this[n] = a, this.raws && delete this.raws[n];
      }, e.isAtPosition = function(n, a) {
        if (this.source && this.source.start && this.source.end)
          return !(this.source.start.line > n || this.source.end.line < n || this.source.start.line === n && this.source.start.column > a || this.source.end.line === n && this.source.end.column < a);
      }, e.stringifyProperty = function(n) {
        return this.raws && this.raws[n] || this[n];
      }, e.valueToString = function() {
        return String(this.stringifyProperty("value"));
      }, e.toString = function() {
        return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
      }, u(d, [{
        key: "rawSpaceBefore",
        get: function() {
          var n = this.raws && this.raws.spaces && this.raws.spaces.before;
          return n === void 0 && (n = this.spaces && this.spaces.before), n || "";
        },
        set: function(n) {
          (0, v.ensureObject)(this, "raws", "spaces"), this.raws.spaces.before = n;
        }
      }, {
        key: "rawSpaceAfter",
        get: function() {
          var n = this.raws && this.raws.spaces && this.raws.spaces.after;
          return n === void 0 && (n = this.spaces.after), n || "";
        },
        set: function(n) {
          (0, v.ensureObject)(this, "raws", "spaces"), this.raws.spaces.after = n;
        }
      }]), d;
    })();
    i.default = o, l.exports = i.default;
  })(kt, kt.exports)), kt.exports;
}
var Me = {}, bs;
function ze() {
  if (bs) return Me;
  bs = 1, Me.__esModule = !0, Me.UNIVERSAL = Me.TAG = Me.STRING = Me.SELECTOR = Me.ROOT = Me.PSEUDO = Me.NESTING = Me.ID = Me.COMMENT = Me.COMBINATOR = Me.CLASS = Me.ATTRIBUTE = void 0;
  var l = "tag";
  Me.TAG = l;
  var i = "string";
  Me.STRING = i;
  var v = "selector";
  Me.SELECTOR = v;
  var p = "root";
  Me.ROOT = p;
  var u = "pseudo";
  Me.PSEUDO = u;
  var f = "nesting";
  Me.NESTING = f;
  var o = "id";
  Me.ID = o;
  var d = "comment";
  Me.COMMENT = d;
  var e = "combinator";
  Me.COMBINATOR = e;
  var t = "class";
  Me.CLASS = t;
  var n = "attribute";
  Me.ATTRIBUTE = n;
  var a = "universal";
  return Me.UNIVERSAL = a, Me;
}
var _s;
function ga() {
  return _s || (_s = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(st()), p = f(ze());
    function u(r) {
      if (typeof WeakMap != "function") return null;
      var c = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap();
      return (u = function(y) {
        return y ? _ : c;
      })(r);
    }
    function f(r, c) {
      if (r && r.__esModule)
        return r;
      if (r === null || typeof r != "object" && typeof r != "function")
        return { default: r };
      var _ = u(c);
      if (_ && _.has(r))
        return _.get(r);
      var m = {}, y = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var S in r)
        if (S !== "default" && Object.prototype.hasOwnProperty.call(r, S)) {
          var h = y ? Object.getOwnPropertyDescriptor(r, S) : null;
          h && (h.get || h.set) ? Object.defineProperty(m, S, h) : m[S] = r[S];
        }
      return m.default = r, _ && _.set(r, m), m;
    }
    function o(r) {
      return r && r.__esModule ? r : { default: r };
    }
    function d(r, c) {
      var _ = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (_) return (_ = _.call(r)).next.bind(_);
      if (Array.isArray(r) || (_ = e(r)) || c) {
        _ && (r = _);
        var m = 0;
        return function() {
          return m >= r.length ? { done: !0 } : { done: !1, value: r[m++] };
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function e(r, c) {
      if (r) {
        if (typeof r == "string") return t(r, c);
        var _ = Object.prototype.toString.call(r).slice(8, -1);
        if (_ === "Object" && r.constructor && (_ = r.constructor.name), _ === "Map" || _ === "Set") return Array.from(r);
        if (_ === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_)) return t(r, c);
      }
    }
    function t(r, c) {
      (c == null || c > r.length) && (c = r.length);
      for (var _ = 0, m = new Array(c); _ < c; _++)
        m[_] = r[_];
      return m;
    }
    function n(r, c) {
      for (var _ = 0; _ < c.length; _++) {
        var m = c[_];
        m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(r, m.key, m);
      }
    }
    function a(r, c, _) {
      return c && n(r.prototype, c), Object.defineProperty(r, "prototype", { writable: !1 }), r;
    }
    function s(r, c) {
      r.prototype = Object.create(c.prototype), r.prototype.constructor = r, g(r, c);
    }
    function g(r, c) {
      return g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(m, y) {
        return m.__proto__ = y, m;
      }, g(r, c);
    }
    var b = /* @__PURE__ */ (function(r) {
      s(c, r);
      function c(m) {
        var y;
        return y = r.call(this, m) || this, y.nodes || (y.nodes = []), y;
      }
      var _ = c.prototype;
      return _.append = function(y) {
        return y.parent = this, this.nodes.push(y), this;
      }, _.prepend = function(y) {
        y.parent = this, this.nodes.unshift(y);
        for (var S in this.indexes)
          this.indexes[S]++;
        return this;
      }, _.at = function(y) {
        return this.nodes[y];
      }, _.index = function(y) {
        return typeof y == "number" ? y : this.nodes.indexOf(y);
      }, _.removeChild = function(y) {
        y = this.index(y), this.at(y).parent = void 0, this.nodes.splice(y, 1);
        var S;
        for (var h in this.indexes)
          S = this.indexes[h], S >= y && (this.indexes[h] = S - 1);
        return this;
      }, _.removeAll = function() {
        for (var y = d(this.nodes), S; !(S = y()).done; ) {
          var h = S.value;
          h.parent = void 0;
        }
        return this.nodes = [], this;
      }, _.empty = function() {
        return this.removeAll();
      }, _.insertAfter = function(y, S) {
        var h;
        S.parent = this;
        for (var O = this.index(y), C = [], T = 2; T < arguments.length; T++)
          C.push(arguments[T]);
        (h = this.nodes).splice.apply(h, [O + 1, 0, S].concat(C)), S.parent = this;
        var w;
        for (var P in this.indexes)
          w = this.indexes[P], O < w && (this.indexes[P] = w + arguments.length - 1);
        return this;
      }, _.insertBefore = function(y, S) {
        var h;
        S.parent = this;
        for (var O = this.index(y), C = [], T = 2; T < arguments.length; T++)
          C.push(arguments[T]);
        (h = this.nodes).splice.apply(h, [O, 0, S].concat(C)), S.parent = this;
        var w;
        for (var P in this.indexes)
          w = this.indexes[P], w >= O && (this.indexes[P] = w + arguments.length - 1);
        return this;
      }, _._findChildAtPosition = function(y, S) {
        var h = void 0;
        return this.each(function(O) {
          if (O.atPosition) {
            var C = O.atPosition(y, S);
            if (C)
              return h = C, !1;
          } else if (O.isAtPosition(y, S))
            return h = O, !1;
        }), h;
      }, _.atPosition = function(y, S) {
        if (this.isAtPosition(y, S))
          return this._findChildAtPosition(y, S) || this;
      }, _._inferEndPosition = function() {
        this.last && this.last.source && this.last.source.end && (this.source = this.source || {}, this.source.end = this.source.end || {}, Object.assign(this.source.end, this.last.source.end));
      }, _.each = function(y) {
        this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach++;
        var S = this.lastEach;
        if (this.indexes[S] = 0, !!this.length) {
          for (var h, O; this.indexes[S] < this.length && (h = this.indexes[S], O = y(this.at(h), h), O !== !1); )
            this.indexes[S] += 1;
          if (delete this.indexes[S], O === !1)
            return !1;
        }
      }, _.walk = function(y) {
        return this.each(function(S, h) {
          var O = y(S, h);
          if (O !== !1 && S.length && (O = S.walk(y)), O === !1)
            return !1;
        });
      }, _.walkAttributes = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.ATTRIBUTE)
            return y.call(S, h);
        });
      }, _.walkClasses = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.CLASS)
            return y.call(S, h);
        });
      }, _.walkCombinators = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.COMBINATOR)
            return y.call(S, h);
        });
      }, _.walkComments = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.COMMENT)
            return y.call(S, h);
        });
      }, _.walkIds = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.ID)
            return y.call(S, h);
        });
      }, _.walkNesting = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.NESTING)
            return y.call(S, h);
        });
      }, _.walkPseudos = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.PSEUDO)
            return y.call(S, h);
        });
      }, _.walkTags = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.TAG)
            return y.call(S, h);
        });
      }, _.walkUniversals = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.UNIVERSAL)
            return y.call(S, h);
        });
      }, _.split = function(y) {
        var S = this, h = [];
        return this.reduce(function(O, C, T) {
          var w = y.call(S, C);
          return h.push(C), w ? (O.push(h), h = []) : T === S.length - 1 && O.push(h), O;
        }, []);
      }, _.map = function(y) {
        return this.nodes.map(y);
      }, _.reduce = function(y, S) {
        return this.nodes.reduce(y, S);
      }, _.every = function(y) {
        return this.nodes.every(y);
      }, _.some = function(y) {
        return this.nodes.some(y);
      }, _.filter = function(y) {
        return this.nodes.filter(y);
      }, _.sort = function(y) {
        return this.nodes.sort(y);
      }, _.toString = function() {
        return this.map(String).join("");
      }, a(c, [{
        key: "first",
        get: function() {
          return this.at(0);
        }
      }, {
        key: "last",
        get: function() {
          return this.at(this.length - 1);
        }
      }, {
        key: "length",
        get: function() {
          return this.nodes.length;
        }
      }]), c;
    })(v.default);
    i.default = b, l.exports = i.default;
  })(Tt, Tt.exports)), Tt.exports;
}
var Ss;
function ql() {
  return Ss || (Ss = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ga()), p = ze();
    function u(n) {
      return n && n.__esModule ? n : { default: n };
    }
    function f(n, a) {
      for (var s = 0; s < a.length; s++) {
        var g = a[s];
        g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(n, g.key, g);
      }
    }
    function o(n, a, s) {
      return a && f(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
    }
    function d(n, a) {
      n.prototype = Object.create(a.prototype), n.prototype.constructor = n, e(n, a);
    }
    function e(n, a) {
      return e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(g, b) {
        return g.__proto__ = b, g;
      }, e(n, a);
    }
    var t = /* @__PURE__ */ (function(n) {
      d(a, n);
      function a(g) {
        var b;
        return b = n.call(this, g) || this, b.type = p.ROOT, b;
      }
      var s = a.prototype;
      return s.toString = function() {
        var b = this.reduce(function(r, c) {
          return r.push(String(c)), r;
        }, []).join(",");
        return this.trailingComma ? b + "," : b;
      }, s.error = function(b, r) {
        return this._error ? this._error(b, r) : new Error(b);
      }, o(a, [{
        key: "errorGenerator",
        set: function(b) {
          this._error = b;
        }
      }]), a;
    })(v.default);
    i.default = t, l.exports = i.default;
  })(Pt, Pt.exports)), Pt.exports;
}
var It = { exports: {} }, Os;
function Ll() {
  return Os || (Os = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ga()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.SELECTOR, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(It, It.exports)), It.exports;
}
var Mt = { exports: {} };
/*! https://mths.be/cssesc v3.0.0 by @mathias */
var An, xs;
function nt() {
  if (xs) return An;
  xs = 1;
  var l = {}, i = l.hasOwnProperty, v = function(e, t) {
    if (!e)
      return t;
    var n = {};
    for (var a in t)
      n[a] = i.call(e, a) ? e[a] : t[a];
    return n;
  }, p = /[ -,\.\/:-@\[-\^`\{-~]/, u = /[ -,\.\/:-@\[\]\^`\{-~]/, f = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, o = function d(e, t) {
    t = v(t, d.options), t.quotes != "single" && t.quotes != "double" && (t.quotes = "single");
    for (var n = t.quotes == "double" ? '"' : "'", a = t.isIdentifier, s = e.charAt(0), g = "", b = 0, r = e.length; b < r; ) {
      var c = e.charAt(b++), _ = c.charCodeAt(), m = void 0;
      if (_ < 32 || _ > 126) {
        if (_ >= 55296 && _ <= 56319 && b < r) {
          var y = e.charCodeAt(b++);
          (y & 64512) == 56320 ? _ = ((_ & 1023) << 10) + (y & 1023) + 65536 : b--;
        }
        m = "\\" + _.toString(16).toUpperCase() + " ";
      } else
        t.escapeEverything ? p.test(c) ? m = "\\" + c : m = "\\" + _.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(c) ? m = "\\" + _.toString(16).toUpperCase() + " " : c == "\\" || !a && (c == '"' && n == c || c == "'" && n == c) || a && u.test(c) ? m = "\\" + c : m = c;
      g += m;
    }
    return a && (/^-[-\d]/.test(g) ? g = "\\-" + g.slice(1) : /\d/.test(s) && (g = "\\3" + s + " " + g.slice(1))), g = g.replace(f, function(S, h, O) {
      return h && h.length % 2 ? S : (h || "") + O;
    }), !a && t.wrap ? n + g + n : g;
  };
  return o.options = {
    escapeEverything: !1,
    isIdentifier: !1,
    quotes: "single",
    wrap: !1
  }, o.version = "3.0.0", An = o, An;
}
var Ps;
function Nl() {
  return Ps || (Ps = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(nt()), p = Wr(), u = o(st()), f = ze();
    function o(s) {
      return s && s.__esModule ? s : { default: s };
    }
    function d(s, g) {
      for (var b = 0; b < g.length; b++) {
        var r = g[b];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(s, r.key, r);
      }
    }
    function e(s, g, b) {
      return g && d(s.prototype, g), Object.defineProperty(s, "prototype", { writable: !1 }), s;
    }
    function t(s, g) {
      s.prototype = Object.create(g.prototype), s.prototype.constructor = s, n(s, g);
    }
    function n(s, g) {
      return n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, c) {
        return r.__proto__ = c, r;
      }, n(s, g);
    }
    var a = /* @__PURE__ */ (function(s) {
      t(g, s);
      function g(r) {
        var c;
        return c = s.call(this, r) || this, c.type = f.CLASS, c._constructed = !0, c;
      }
      var b = g.prototype;
      return b.valueToString = function() {
        return "." + s.prototype.valueToString.call(this);
      }, e(g, [{
        key: "value",
        get: function() {
          return this._value;
        },
        set: function(c) {
          if (this._constructed) {
            var _ = (0, v.default)(c, {
              isIdentifier: !0
            });
            _ !== c ? ((0, p.ensureObject)(this, "raws"), this.raws.value = _) : this.raws && delete this.raws.value;
          }
          this._value = c;
        }
      }]), g;
    })(u.default);
    i.default = a, l.exports = i.default;
  })(Mt, Mt.exports)), Mt.exports;
}
var Dt = { exports: {} }, Ts;
function Fl() {
  return Ts || (Ts = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(st()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.COMMENT, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Dt, Dt.exports)), Dt.exports;
}
var qt = { exports: {} }, ks;
function $l() {
  return ks || (ks = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(st()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(a) {
        var s;
        return s = e.call(this, a) || this, s.type = p.ID, s;
      }
      var n = t.prototype;
      return n.valueToString = function() {
        return "#" + e.prototype.valueToString.call(this);
      }, t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(qt, qt.exports)), qt.exports;
}
var Lt = { exports: {} }, Nt = { exports: {} }, Es;
function ma() {
  return Es || (Es = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = f(nt()), p = Wr(), u = f(st());
    function f(a) {
      return a && a.__esModule ? a : { default: a };
    }
    function o(a, s) {
      for (var g = 0; g < s.length; g++) {
        var b = s[g];
        b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(a, b.key, b);
      }
    }
    function d(a, s, g) {
      return s && o(a.prototype, s), Object.defineProperty(a, "prototype", { writable: !1 }), a;
    }
    function e(a, s) {
      a.prototype = Object.create(s.prototype), a.prototype.constructor = a, t(a, s);
    }
    function t(a, s) {
      return t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(b, r) {
        return b.__proto__ = r, b;
      }, t(a, s);
    }
    var n = /* @__PURE__ */ (function(a) {
      e(s, a);
      function s() {
        return a.apply(this, arguments) || this;
      }
      var g = s.prototype;
      return g.qualifiedName = function(r) {
        return this.namespace ? this.namespaceString + "|" + r : r;
      }, g.valueToString = function() {
        return this.qualifiedName(a.prototype.valueToString.call(this));
      }, d(s, [{
        key: "namespace",
        get: function() {
          return this._namespace;
        },
        set: function(r) {
          if (r === !0 || r === "*" || r === "&") {
            this._namespace = r, this.raws && delete this.raws.namespace;
            return;
          }
          var c = (0, v.default)(r, {
            isIdentifier: !0
          });
          this._namespace = r, c !== r ? ((0, p.ensureObject)(this, "raws"), this.raws.namespace = c) : this.raws && delete this.raws.namespace;
        }
      }, {
        key: "ns",
        get: function() {
          return this._namespace;
        },
        set: function(r) {
          this.namespace = r;
        }
      }, {
        key: "namespaceString",
        get: function() {
          if (this.namespace) {
            var r = this.stringifyProperty("namespace");
            return r === !0 ? "" : r;
          } else
            return "";
        }
      }]), s;
    })(u.default);
    i.default = n, l.exports = i.default;
  })(Nt, Nt.exports)), Nt.exports;
}
var As;
function Ul() {
  return As || (As = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ma()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.TAG, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Lt, Lt.exports)), Lt.exports;
}
var Ft = { exports: {} }, Cs;
function Wl() {
  return Cs || (Cs = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(st()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.STRING, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Ft, Ft.exports)), Ft.exports;
}
var $t = { exports: {} }, Rs;
function zl() {
  return Rs || (Rs = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ga()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(a) {
        var s;
        return s = e.call(this, a) || this, s.type = p.PSEUDO, s;
      }
      var n = t.prototype;
      return n.toString = function() {
        var s = this.length ? "(" + this.map(String).join(",") + ")" : "";
        return [this.rawSpaceBefore, this.stringifyProperty("value"), s, this.rawSpaceAfter].join("");
      }, t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })($t, $t.exports)), $t.exports;
}
var Cn = {}, Rn, Is;
function ya() {
  if (Is) return Rn;
  Is = 1, Rn = l;
  function l(v, p) {
    if (i("noDeprecation"))
      return v;
    var u = !1;
    function f() {
      if (!u) {
        if (i("throwDeprecation"))
          throw new Error(p);
        i("traceDeprecation") ? console.trace(p) : console.warn(p), u = !0;
      }
      return v.apply(this, arguments);
    }
    return f;
  }
  function i(v) {
    try {
      if (!Na.localStorage) return !1;
    } catch {
      return !1;
    }
    var p = Na.localStorage[v];
    return p == null ? !1 : String(p).toLowerCase() === "true";
  }
  return Rn;
}
var Ms;
function Bl() {
  return Ms || (Ms = 1, (function(l) {
    l.__esModule = !0, l.default = void 0, l.unescapeValue = c;
    var i = o(nt()), v = o(Dl()), p = o(ma()), u = ze(), f;
    function o(h) {
      return h && h.__esModule ? h : { default: h };
    }
    function d(h, O) {
      for (var C = 0; C < O.length; C++) {
        var T = O[C];
        T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(h, T.key, T);
      }
    }
    function e(h, O, C) {
      return O && d(h.prototype, O), Object.defineProperty(h, "prototype", { writable: !1 }), h;
    }
    function t(h, O) {
      h.prototype = Object.create(O.prototype), h.prototype.constructor = h, n(h, O);
    }
    function n(h, O) {
      return n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(T, w) {
        return T.__proto__ = w, T;
      }, n(h, O);
    }
    var a = ya(), s = /^('|")([^]*)\1$/, g = a(function() {
    }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead."), b = a(function() {
    }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead."), r = a(function() {
    }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
    function c(h) {
      var O = !1, C = null, T = h, w = T.match(s);
      return w && (C = w[1], T = w[2]), T = (0, v.default)(T), T !== h && (O = !0), {
        deprecatedUsage: O,
        unescaped: T,
        quoteMark: C
      };
    }
    function _(h) {
      if (h.quoteMark !== void 0 || h.value === void 0)
        return h;
      r();
      var O = c(h.value), C = O.quoteMark, T = O.unescaped;
      return h.raws || (h.raws = {}), h.raws.value === void 0 && (h.raws.value = h.value), h.value = T, h.quoteMark = C, h;
    }
    var m = /* @__PURE__ */ (function(h) {
      t(O, h);
      function O(T) {
        var w;
        return T === void 0 && (T = {}), w = h.call(this, _(T)) || this, w.type = u.ATTRIBUTE, w.raws = w.raws || {}, Object.defineProperty(w.raws, "unquoted", {
          get: a(function() {
            return w.value;
          }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
          set: a(function() {
            return w.value;
          }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
        }), w._constructed = !0, w;
      }
      var C = O.prototype;
      return C.getQuotedValue = function(w) {
        w === void 0 && (w = {});
        var P = this._determineQuoteMark(w), N = y[P], D = (0, i.default)(this._value, N);
        return D;
      }, C._determineQuoteMark = function(w) {
        return w.smart ? this.smartQuoteMark(w) : this.preferredQuoteMark(w);
      }, C.setValue = function(w, P) {
        P === void 0 && (P = {}), this._value = w, this._quoteMark = this._determineQuoteMark(P), this._syncRawValue();
      }, C.smartQuoteMark = function(w) {
        var P = this.value, N = P.replace(/[^']/g, "").length, D = P.replace(/[^"]/g, "").length;
        if (N + D === 0) {
          var B = (0, i.default)(P, {
            isIdentifier: !0
          });
          if (B === P)
            return O.NO_QUOTE;
          var k = this.preferredQuoteMark(w);
          if (k === O.NO_QUOTE) {
            var A = this.quoteMark || w.quoteMark || O.DOUBLE_QUOTE, R = y[A], I = (0, i.default)(P, R);
            if (I.length < B.length)
              return A;
          }
          return k;
        } else return D === N ? this.preferredQuoteMark(w) : D < N ? O.DOUBLE_QUOTE : O.SINGLE_QUOTE;
      }, C.preferredQuoteMark = function(w) {
        var P = w.preferCurrentQuoteMark ? this.quoteMark : w.quoteMark;
        return P === void 0 && (P = w.preferCurrentQuoteMark ? w.quoteMark : this.quoteMark), P === void 0 && (P = O.DOUBLE_QUOTE), P;
      }, C._syncRawValue = function() {
        var w = (0, i.default)(this._value, y[this.quoteMark]);
        w === this._value ? this.raws && delete this.raws.value : this.raws.value = w;
      }, C._handleEscapes = function(w, P) {
        if (this._constructed) {
          var N = (0, i.default)(P, {
            isIdentifier: !0
          });
          N !== P ? this.raws[w] = N : delete this.raws[w];
        }
      }, C._spacesFor = function(w) {
        var P = {
          before: "",
          after: ""
        }, N = this.spaces[w] || {}, D = this.raws.spaces && this.raws.spaces[w] || {};
        return Object.assign(P, N, D);
      }, C._stringFor = function(w, P, N) {
        P === void 0 && (P = w), N === void 0 && (N = S);
        var D = this._spacesFor(P);
        return N(this.stringifyProperty(w), D);
      }, C.offsetOf = function(w) {
        var P = 1, N = this._spacesFor("attribute");
        if (P += N.before.length, w === "namespace" || w === "ns")
          return this.namespace ? P : -1;
        if (w === "attributeNS" || (P += this.namespaceString.length, this.namespace && (P += 1), w === "attribute"))
          return P;
        P += this.stringifyProperty("attribute").length, P += N.after.length;
        var D = this._spacesFor("operator");
        P += D.before.length;
        var B = this.stringifyProperty("operator");
        if (w === "operator")
          return B ? P : -1;
        P += B.length, P += D.after.length;
        var k = this._spacesFor("value");
        P += k.before.length;
        var A = this.stringifyProperty("value");
        if (w === "value")
          return A ? P : -1;
        P += A.length, P += k.after.length;
        var R = this._spacesFor("insensitive");
        return P += R.before.length, w === "insensitive" && this.insensitive ? P : -1;
      }, C.toString = function() {
        var w = this, P = [this.rawSpaceBefore, "["];
        return P.push(this._stringFor("qualifiedAttribute", "attribute")), this.operator && (this.value || this.value === "") && (P.push(this._stringFor("operator")), P.push(this._stringFor("value")), P.push(this._stringFor("insensitiveFlag", "insensitive", function(N, D) {
          return N.length > 0 && !w.quoted && D.before.length === 0 && !(w.spaces.value && w.spaces.value.after) && (D.before = " "), S(N, D);
        }))), P.push("]"), P.push(this.rawSpaceAfter), P.join("");
      }, e(O, [{
        key: "quoted",
        get: function() {
          var w = this.quoteMark;
          return w === "'" || w === '"';
        },
        set: function(w) {
          b();
        }
        /**
         * returns a single (`'`) or double (`"`) quote character if the value is quoted.
         * returns `null` if the value is not quoted.
         * returns `undefined` if the quotation state is unknown (this can happen when
         * the attribute is constructed without specifying a quote mark.)
         */
      }, {
        key: "quoteMark",
        get: function() {
          return this._quoteMark;
        },
        set: function(w) {
          if (!this._constructed) {
            this._quoteMark = w;
            return;
          }
          this._quoteMark !== w && (this._quoteMark = w, this._syncRawValue());
        }
      }, {
        key: "qualifiedAttribute",
        get: function() {
          return this.qualifiedName(this.raws.attribute || this.attribute);
        }
      }, {
        key: "insensitiveFlag",
        get: function() {
          return this.insensitive ? "i" : "";
        }
      }, {
        key: "value",
        get: function() {
          return this._value;
        },
        set: (
          /**
           * Before 3.0, the value had to be set to an escaped value including any wrapped
           * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
           * is unescaped during parsing and any quote marks are removed.
           *
           * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
           * a deprecation warning is raised when the new value contains any characters that would
           * require escaping (including if it contains wrapped quotes).
           *
           * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
           * how the new value is quoted.
           */
          function(w) {
            if (this._constructed) {
              var P = c(w), N = P.deprecatedUsage, D = P.unescaped, B = P.quoteMark;
              if (N && g(), D === this._value && B === this._quoteMark)
                return;
              this._value = D, this._quoteMark = B, this._syncRawValue();
            } else
              this._value = w;
          }
        )
      }, {
        key: "insensitive",
        get: function() {
          return this._insensitive;
        },
        set: function(w) {
          w || (this._insensitive = !1, this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i") && (this.raws.insensitiveFlag = void 0)), this._insensitive = w;
        }
      }, {
        key: "attribute",
        get: function() {
          return this._attribute;
        },
        set: function(w) {
          this._handleEscapes("attribute", w), this._attribute = w;
        }
      }]), O;
    })(p.default);
    l.default = m, m.NO_QUOTE = null, m.SINGLE_QUOTE = "'", m.DOUBLE_QUOTE = '"';
    var y = (f = {
      "'": {
        quotes: "single",
        wrap: !0
      },
      '"': {
        quotes: "double",
        wrap: !0
      }
    }, f[null] = {
      isIdentifier: !0
    }, f);
    function S(h, O) {
      return "" + O.before + h + O.after;
    }
  })(Cn)), Cn;
}
var Ut = { exports: {} }, Ds;
function Vl() {
  return Ds || (Ds = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ma()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.UNIVERSAL, a.value = "*", a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Ut, Ut.exports)), Ut.exports;
}
var Wt = { exports: {} }, qs;
function jl() {
  return qs || (qs = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(st()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.COMBINATOR, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Wt, Wt.exports)), Wt.exports;
}
var zt = { exports: {} }, Ls;
function Gl() {
  return Ls || (Ls = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(st()), p = ze();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.NESTING, a.value = "&", a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(zt, zt.exports)), zt.exports;
}
var Bt = { exports: {} }, Ns;
function nc() {
  return Ns || (Ns = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      return p.sort(function(u, f) {
        return u - f;
      });
    }
    l.exports = i.default;
  })(Bt, Bt.exports)), Bt.exports;
}
var In = {}, oe = {}, Fs;
function Yl() {
  if (Fs) return oe;
  Fs = 1, oe.__esModule = !0, oe.word = oe.tilde = oe.tab = oe.str = oe.space = oe.slash = oe.singleQuote = oe.semicolon = oe.plus = oe.pipe = oe.openSquare = oe.openParenthesis = oe.newline = oe.greaterThan = oe.feed = oe.equals = oe.doubleQuote = oe.dollar = oe.cr = oe.comment = oe.comma = oe.combinator = oe.colon = oe.closeSquare = oe.closeParenthesis = oe.caret = oe.bang = oe.backslash = oe.at = oe.asterisk = oe.ampersand = void 0;
  var l = 38;
  oe.ampersand = l;
  var i = 42;
  oe.asterisk = i;
  var v = 64;
  oe.at = v;
  var p = 44;
  oe.comma = p;
  var u = 58;
  oe.colon = u;
  var f = 59;
  oe.semicolon = f;
  var o = 40;
  oe.openParenthesis = o;
  var d = 41;
  oe.closeParenthesis = d;
  var e = 91;
  oe.openSquare = e;
  var t = 93;
  oe.closeSquare = t;
  var n = 36;
  oe.dollar = n;
  var a = 126;
  oe.tilde = a;
  var s = 94;
  oe.caret = s;
  var g = 43;
  oe.plus = g;
  var b = 61;
  oe.equals = b;
  var r = 124;
  oe.pipe = r;
  var c = 62;
  oe.greaterThan = c;
  var _ = 32;
  oe.space = _;
  var m = 39;
  oe.singleQuote = m;
  var y = 34;
  oe.doubleQuote = y;
  var S = 47;
  oe.slash = S;
  var h = 33;
  oe.bang = h;
  var O = 92;
  oe.backslash = O;
  var C = 13;
  oe.cr = C;
  var T = 12;
  oe.feed = T;
  var w = 10;
  oe.newline = w;
  var P = 9;
  oe.tab = P;
  var N = m;
  oe.str = N;
  var D = -1;
  oe.comment = D;
  var B = -2;
  oe.word = B;
  var k = -3;
  return oe.combinator = k, oe;
}
var $s;
function ic() {
  return $s || ($s = 1, (function(l) {
    l.__esModule = !0, l.FIELDS = void 0, l.default = b;
    var i = f(Yl()), v, p;
    function u(r) {
      if (typeof WeakMap != "function") return null;
      var c = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap();
      return (u = function(y) {
        return y ? _ : c;
      })(r);
    }
    function f(r, c) {
      if (r && r.__esModule)
        return r;
      if (r === null || typeof r != "object" && typeof r != "function")
        return { default: r };
      var _ = u(c);
      if (_ && _.has(r))
        return _.get(r);
      var m = {}, y = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var S in r)
        if (S !== "default" && Object.prototype.hasOwnProperty.call(r, S)) {
          var h = y ? Object.getOwnPropertyDescriptor(r, S) : null;
          h && (h.get || h.set) ? Object.defineProperty(m, S, h) : m[S] = r[S];
        }
      return m.default = r, _ && _.set(r, m), m;
    }
    for (var o = (v = {}, v[i.tab] = !0, v[i.newline] = !0, v[i.cr] = !0, v[i.feed] = !0, v), d = (p = {}, p[i.space] = !0, p[i.tab] = !0, p[i.newline] = !0, p[i.cr] = !0, p[i.feed] = !0, p[i.ampersand] = !0, p[i.asterisk] = !0, p[i.bang] = !0, p[i.comma] = !0, p[i.colon] = !0, p[i.semicolon] = !0, p[i.openParenthesis] = !0, p[i.closeParenthesis] = !0, p[i.openSquare] = !0, p[i.closeSquare] = !0, p[i.singleQuote] = !0, p[i.doubleQuote] = !0, p[i.plus] = !0, p[i.pipe] = !0, p[i.tilde] = !0, p[i.greaterThan] = !0, p[i.equals] = !0, p[i.dollar] = !0, p[i.caret] = !0, p[i.slash] = !0, p), e = {}, t = "0123456789abcdefABCDEF", n = 0; n < t.length; n++)
      e[t.charCodeAt(n)] = !0;
    function a(r, c) {
      var _ = c, m;
      do {
        if (m = r.charCodeAt(_), d[m])
          return _ - 1;
        m === i.backslash ? _ = s(r, _) + 1 : _++;
      } while (_ < r.length);
      return _ - 1;
    }
    function s(r, c) {
      var _ = c, m = r.charCodeAt(_ + 1);
      if (!o[m]) if (e[m]) {
        var y = 0;
        do
          _++, y++, m = r.charCodeAt(_ + 1);
        while (e[m] && y < 6);
        y < 6 && m === i.space && _++;
      } else
        _++;
      return _;
    }
    var g = {
      TYPE: 0,
      START_LINE: 1,
      START_COL: 2,
      END_LINE: 3,
      END_COL: 4,
      START_POS: 5,
      END_POS: 6
    };
    l.FIELDS = g;
    function b(r) {
      var c = [], _ = r.css.valueOf(), m = _, y = m.length, S = -1, h = 1, O = 0, C = 0, T, w, P, N, D, B, k, A, R, I, W, Q, z;
      function L(F, M) {
        if (r.safe)
          _ += M, R = _.length - 1;
        else
          throw r.error("Unclosed " + F, h, O - S, O);
      }
      for (; O < y; ) {
        switch (T = _.charCodeAt(O), T === i.newline && (S = O, h += 1), T) {
          case i.space:
          case i.tab:
          case i.newline:
          case i.cr:
          case i.feed:
            R = O;
            do
              R += 1, T = _.charCodeAt(R), T === i.newline && (S = R, h += 1);
            while (T === i.space || T === i.newline || T === i.tab || T === i.cr || T === i.feed);
            z = i.space, N = h, P = R - S - 1, C = R;
            break;
          case i.plus:
          case i.greaterThan:
          case i.tilde:
          case i.pipe:
            R = O;
            do
              R += 1, T = _.charCodeAt(R);
            while (T === i.plus || T === i.greaterThan || T === i.tilde || T === i.pipe);
            z = i.combinator, N = h, P = O - S, C = R;
            break;
          // Consume these characters as single tokens.
          case i.asterisk:
          case i.ampersand:
          case i.bang:
          case i.comma:
          case i.equals:
          case i.dollar:
          case i.caret:
          case i.openSquare:
          case i.closeSquare:
          case i.colon:
          case i.semicolon:
          case i.openParenthesis:
          case i.closeParenthesis:
            R = O, z = T, N = h, P = O - S, C = R + 1;
            break;
          case i.singleQuote:
          case i.doubleQuote:
            Q = T === i.singleQuote ? "'" : '"', R = O;
            do
              for (D = !1, R = _.indexOf(Q, R + 1), R === -1 && L("quote", Q), B = R; _.charCodeAt(B - 1) === i.backslash; )
                B -= 1, D = !D;
            while (D);
            z = i.str, N = h, P = O - S, C = R + 1;
            break;
          default:
            T === i.slash && _.charCodeAt(O + 1) === i.asterisk ? (R = _.indexOf("*/", O + 2) + 1, R === 0 && L("comment", "*/"), w = _.slice(O, R + 1), A = w.split(`
`), k = A.length - 1, k > 0 ? (I = h + k, W = R - A[k].length) : (I = h, W = S), z = i.comment, h = I, N = I, P = R - W) : T === i.slash ? (R = O, z = T, N = h, P = O - S, C = R + 1) : (R = a(_, O), z = i.word, N = h, P = R - S), C = R + 1;
            break;
        }
        c.push([
          z,
          // [0] Token type
          h,
          // [1] Starting line
          O - S,
          // [2] Starting column
          N,
          // [3] Ending line
          P,
          // [4] Ending column
          O,
          // [5] Start position / Source index
          C
          // [6] End position
        ]), W && (S = W, W = null), O = C;
      }
      return c;
    }
  })(In)), In;
}
var Us;
function ac() {
  return Us || (Us = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = C(ql()), p = C(Ll()), u = C(Nl()), f = C(Fl()), o = C($l()), d = C(Ul()), e = C(Wl()), t = C(zl()), n = O(Bl()), a = C(Vl()), s = C(jl()), g = C(Gl()), b = C(nc()), r = O(ic()), c = O(Yl()), _ = O(ze()), m = Wr(), y, S;
    function h(L) {
      if (typeof WeakMap != "function") return null;
      var F = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap();
      return (h = function(q) {
        return q ? M : F;
      })(L);
    }
    function O(L, F) {
      if (L && L.__esModule)
        return L;
      if (L === null || typeof L != "object" && typeof L != "function")
        return { default: L };
      var M = h(F);
      if (M && M.has(L))
        return M.get(L);
      var E = {}, q = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var G in L)
        if (G !== "default" && Object.prototype.hasOwnProperty.call(L, G)) {
          var x = q ? Object.getOwnPropertyDescriptor(L, G) : null;
          x && (x.get || x.set) ? Object.defineProperty(E, G, x) : E[G] = L[G];
        }
      return E.default = L, M && M.set(L, E), E;
    }
    function C(L) {
      return L && L.__esModule ? L : { default: L };
    }
    function T(L, F) {
      for (var M = 0; M < F.length; M++) {
        var E = F[M];
        E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(L, E.key, E);
      }
    }
    function w(L, F, M) {
      return F && T(L.prototype, F), Object.defineProperty(L, "prototype", { writable: !1 }), L;
    }
    var P = (y = {}, y[c.space] = !0, y[c.cr] = !0, y[c.feed] = !0, y[c.newline] = !0, y[c.tab] = !0, y), N = Object.assign({}, P, (S = {}, S[c.comment] = !0, S));
    function D(L) {
      return {
        line: L[r.FIELDS.START_LINE],
        column: L[r.FIELDS.START_COL]
      };
    }
    function B(L) {
      return {
        line: L[r.FIELDS.END_LINE],
        column: L[r.FIELDS.END_COL]
      };
    }
    function k(L, F, M, E) {
      return {
        start: {
          line: L,
          column: F
        },
        end: {
          line: M,
          column: E
        }
      };
    }
    function A(L) {
      return k(L[r.FIELDS.START_LINE], L[r.FIELDS.START_COL], L[r.FIELDS.END_LINE], L[r.FIELDS.END_COL]);
    }
    function R(L, F) {
      if (L)
        return k(L[r.FIELDS.START_LINE], L[r.FIELDS.START_COL], F[r.FIELDS.END_LINE], F[r.FIELDS.END_COL]);
    }
    function I(L, F) {
      var M = L[F];
      if (typeof M == "string")
        return M.indexOf("\\") !== -1 && ((0, m.ensureObject)(L, "raws"), L[F] = (0, m.unesc)(M), L.raws[F] === void 0 && (L.raws[F] = M)), L;
    }
    function W(L, F) {
      for (var M = -1, E = []; (M = L.indexOf(F, M + 1)) !== -1; )
        E.push(M);
      return E;
    }
    function Q() {
      var L = Array.prototype.concat.apply([], arguments);
      return L.filter(function(F, M) {
        return M === L.indexOf(F);
      });
    }
    var z = /* @__PURE__ */ (function() {
      function L(M, E) {
        E === void 0 && (E = {}), this.rule = M, this.options = Object.assign({
          lossy: !1,
          safe: !1
        }, E), this.position = 0, this.css = typeof this.rule == "string" ? this.rule : this.rule.selector, this.tokens = (0, r.default)({
          css: this.css,
          error: this._errorGenerator(),
          safe: this.options.safe
        });
        var q = R(this.tokens[0], this.tokens[this.tokens.length - 1]);
        this.root = new v.default({
          source: q
        }), this.root.errorGenerator = this._errorGenerator();
        var G = new p.default({
          source: {
            start: {
              line: 1,
              column: 1
            }
          },
          sourceIndex: 0
        });
        this.root.append(G), this.current = G, this.loop();
      }
      var F = L.prototype;
      return F._errorGenerator = function() {
        var E = this;
        return function(q, G) {
          return typeof E.rule == "string" ? new Error(q) : E.rule.error(q, G);
        };
      }, F.attribute = function() {
        var E = [], q = this.currToken;
        for (this.position++; this.position < this.tokens.length && this.currToken[r.FIELDS.TYPE] !== c.closeSquare; )
          E.push(this.currToken), this.position++;
        if (this.currToken[r.FIELDS.TYPE] !== c.closeSquare)
          return this.expected("closing square bracket", this.currToken[r.FIELDS.START_POS]);
        var G = E.length, x = {
          source: k(q[1], q[2], this.currToken[3], this.currToken[4]),
          sourceIndex: q[r.FIELDS.START_POS]
        };
        if (G === 1 && !~[c.word].indexOf(E[0][r.FIELDS.TYPE]))
          return this.expected("attribute", E[0][r.FIELDS.START_POS]);
        for (var $ = 0, V = "", Y = "", U = null, K = !1; $ < G; ) {
          var X = E[$], j = this.content(X), Z = E[$ + 1];
          switch (X[r.FIELDS.TYPE]) {
            case c.space:
              if (K = !0, this.options.lossy)
                break;
              if (U) {
                (0, m.ensureObject)(x, "spaces", U);
                var fe = x.spaces[U].after || "";
                x.spaces[U].after = fe + j;
                var ve = (0, m.getProp)(x, "raws", "spaces", U, "after") || null;
                ve && (x.raws.spaces[U].after = ve + j);
              } else
                V = V + j, Y = Y + j;
              break;
            case c.asterisk:
              if (Z[r.FIELDS.TYPE] === c.equals)
                x.operator = j, U = "operator";
              else if ((!x.namespace || U === "namespace" && !K) && Z) {
                V && ((0, m.ensureObject)(x, "spaces", "attribute"), x.spaces.attribute.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "attribute"), x.raws.spaces.attribute.before = V, Y = ""), x.namespace = (x.namespace || "") + j;
                var de = (0, m.getProp)(x, "raws", "namespace") || null;
                de && (x.raws.namespace += j), U = "namespace";
              }
              K = !1;
              break;
            case c.dollar:
              if (U === "value") {
                var ne = (0, m.getProp)(x, "raws", "value");
                x.value += "$", ne && (x.raws.value = ne + "$");
                break;
              }
            // Falls through
            case c.caret:
              Z[r.FIELDS.TYPE] === c.equals && (x.operator = j, U = "operator"), K = !1;
              break;
            case c.combinator:
              if (j === "~" && Z[r.FIELDS.TYPE] === c.equals && (x.operator = j, U = "operator"), j !== "|") {
                K = !1;
                break;
              }
              Z[r.FIELDS.TYPE] === c.equals ? (x.operator = j, U = "operator") : !x.namespace && !x.attribute && (x.namespace = !0), K = !1;
              break;
            case c.word:
              if (Z && this.content(Z) === "|" && E[$ + 2] && E[$ + 2][r.FIELDS.TYPE] !== c.equals && // this look-ahead probably fails with comment nodes involved.
              !x.operator && !x.namespace)
                x.namespace = j, U = "namespace";
              else if (!x.attribute || U === "attribute" && !K) {
                V && ((0, m.ensureObject)(x, "spaces", "attribute"), x.spaces.attribute.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "attribute"), x.raws.spaces.attribute.before = Y, Y = ""), x.attribute = (x.attribute || "") + j;
                var we = (0, m.getProp)(x, "raws", "attribute") || null;
                we && (x.raws.attribute += j), U = "attribute";
              } else if (!x.value && x.value !== "" || U === "value" && !(K || x.quoteMark)) {
                var J = (0, m.unesc)(j), H = (0, m.getProp)(x, "raws", "value") || "", re = x.value || "";
                x.value = re + J, x.quoteMark = null, (J !== j || H) && ((0, m.ensureObject)(x, "raws"), x.raws.value = (H || re) + j), U = "value";
              } else {
                var te = j === "i" || j === "I";
                (x.value || x.value === "") && (x.quoteMark || K) ? (x.insensitive = te, (!te || j === "I") && ((0, m.ensureObject)(x, "raws"), x.raws.insensitiveFlag = j), U = "insensitive", V && ((0, m.ensureObject)(x, "spaces", "insensitive"), x.spaces.insensitive.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "insensitive"), x.raws.spaces.insensitive.before = Y, Y = "")) : (x.value || x.value === "") && (U = "value", x.value += j, x.raws.value && (x.raws.value += j));
              }
              K = !1;
              break;
            case c.str:
              if (!x.attribute || !x.operator)
                return this.error("Expected an attribute followed by an operator preceding the string.", {
                  index: X[r.FIELDS.START_POS]
                });
              var ee = (0, n.unescapeValue)(j), ae = ee.unescaped, ce = ee.quoteMark;
              x.value = ae, x.quoteMark = ce, U = "value", (0, m.ensureObject)(x, "raws"), x.raws.value = j, K = !1;
              break;
            case c.equals:
              if (!x.attribute)
                return this.expected("attribute", X[r.FIELDS.START_POS], j);
              if (x.value)
                return this.error('Unexpected "=" found; an operator was already defined.', {
                  index: X[r.FIELDS.START_POS]
                });
              x.operator = x.operator ? x.operator + j : j, U = "operator", K = !1;
              break;
            case c.comment:
              if (U)
                if (K || Z && Z[r.FIELDS.TYPE] === c.space || U === "insensitive") {
                  var xe = (0, m.getProp)(x, "spaces", U, "after") || "", pe = (0, m.getProp)(x, "raws", "spaces", U, "after") || xe;
                  (0, m.ensureObject)(x, "raws", "spaces", U), x.raws.spaces[U].after = pe + j;
                } else {
                  var ke = x[U] || "", me = (0, m.getProp)(x, "raws", U) || ke;
                  (0, m.ensureObject)(x, "raws"), x.raws[U] = me + j;
                }
              else
                Y = Y + j;
              break;
            default:
              return this.error('Unexpected "' + j + '" found.', {
                index: X[r.FIELDS.START_POS]
              });
          }
          $++;
        }
        I(x, "attribute"), I(x, "namespace"), this.newNode(new n.default(x)), this.position++;
      }, F.parseWhitespaceEquivalentTokens = function(E) {
        E < 0 && (E = this.tokens.length);
        var q = this.position, G = [], x = "", $ = void 0;
        do
          if (P[this.currToken[r.FIELDS.TYPE]])
            this.options.lossy || (x += this.content());
          else if (this.currToken[r.FIELDS.TYPE] === c.comment) {
            var V = {};
            x && (V.before = x, x = ""), $ = new f.default({
              value: this.content(),
              source: A(this.currToken),
              sourceIndex: this.currToken[r.FIELDS.START_POS],
              spaces: V
            }), G.push($);
          }
        while (++this.position < E);
        if (x) {
          if ($)
            $.spaces.after = x;
          else if (!this.options.lossy) {
            var Y = this.tokens[q], U = this.tokens[this.position - 1];
            G.push(new e.default({
              value: "",
              source: k(Y[r.FIELDS.START_LINE], Y[r.FIELDS.START_COL], U[r.FIELDS.END_LINE], U[r.FIELDS.END_COL]),
              sourceIndex: Y[r.FIELDS.START_POS],
              spaces: {
                before: x,
                after: ""
              }
            }));
          }
        }
        return G;
      }, F.convertWhitespaceNodesToSpace = function(E, q) {
        var G = this;
        q === void 0 && (q = !1);
        var x = "", $ = "";
        E.forEach(function(Y) {
          var U = G.lossySpace(Y.spaces.before, q), K = G.lossySpace(Y.rawSpaceBefore, q);
          x += U + G.lossySpace(Y.spaces.after, q && U.length === 0), $ += U + Y.value + G.lossySpace(Y.rawSpaceAfter, q && K.length === 0);
        }), $ === x && ($ = void 0);
        var V = {
          space: x,
          rawSpace: $
        };
        return V;
      }, F.isNamedCombinator = function(E) {
        return E === void 0 && (E = this.position), this.tokens[E + 0] && this.tokens[E + 0][r.FIELDS.TYPE] === c.slash && this.tokens[E + 1] && this.tokens[E + 1][r.FIELDS.TYPE] === c.word && this.tokens[E + 2] && this.tokens[E + 2][r.FIELDS.TYPE] === c.slash;
      }, F.namedCombinator = function() {
        if (this.isNamedCombinator()) {
          var E = this.content(this.tokens[this.position + 1]), q = (0, m.unesc)(E).toLowerCase(), G = {};
          q !== E && (G.value = "/" + E + "/");
          var x = new s.default({
            value: "/" + q + "/",
            source: k(this.currToken[r.FIELDS.START_LINE], this.currToken[r.FIELDS.START_COL], this.tokens[this.position + 2][r.FIELDS.END_LINE], this.tokens[this.position + 2][r.FIELDS.END_COL]),
            sourceIndex: this.currToken[r.FIELDS.START_POS],
            raws: G
          });
          return this.position = this.position + 3, x;
        } else
          this.unexpected();
      }, F.combinator = function() {
        var E = this;
        if (this.content() === "|")
          return this.namespace();
        var q = this.locateNextMeaningfulToken(this.position);
        if (q < 0 || this.tokens[q][r.FIELDS.TYPE] === c.comma || this.tokens[q][r.FIELDS.TYPE] === c.closeParenthesis) {
          var G = this.parseWhitespaceEquivalentTokens(q);
          if (G.length > 0) {
            var x = this.current.last;
            if (x) {
              var $ = this.convertWhitespaceNodesToSpace(G), V = $.space, Y = $.rawSpace;
              Y !== void 0 && (x.rawSpaceAfter += Y), x.spaces.after += V;
            } else
              G.forEach(function(H) {
                return E.newNode(H);
              });
          }
          return;
        }
        var U = this.currToken, K = void 0;
        q > this.position && (K = this.parseWhitespaceEquivalentTokens(q));
        var X;
        if (this.isNamedCombinator() ? X = this.namedCombinator() : this.currToken[r.FIELDS.TYPE] === c.combinator ? (X = new s.default({
          value: this.content(),
          source: A(this.currToken),
          sourceIndex: this.currToken[r.FIELDS.START_POS]
        }), this.position++) : P[this.currToken[r.FIELDS.TYPE]] || K || this.unexpected(), X) {
          if (K) {
            var j = this.convertWhitespaceNodesToSpace(K), Z = j.space, fe = j.rawSpace;
            X.spaces.before = Z, X.rawSpaceBefore = fe;
          }
        } else {
          var ve = this.convertWhitespaceNodesToSpace(K, !0), de = ve.space, ne = ve.rawSpace;
          ne || (ne = de);
          var we = {}, J = {
            spaces: {}
          };
          de.endsWith(" ") && ne.endsWith(" ") ? (we.before = de.slice(0, de.length - 1), J.spaces.before = ne.slice(0, ne.length - 1)) : de.startsWith(" ") && ne.startsWith(" ") ? (we.after = de.slice(1), J.spaces.after = ne.slice(1)) : J.value = ne, X = new s.default({
            value: " ",
            source: R(U, this.tokens[this.position - 1]),
            sourceIndex: U[r.FIELDS.START_POS],
            spaces: we,
            raws: J
          });
        }
        return this.currToken && this.currToken[r.FIELDS.TYPE] === c.space && (X.spaces.after = this.optionalSpace(this.content()), this.position++), this.newNode(X);
      }, F.comma = function() {
        if (this.position === this.tokens.length - 1) {
          this.root.trailingComma = !0, this.position++;
          return;
        }
        this.current._inferEndPosition();
        var E = new p.default({
          source: {
            start: D(this.tokens[this.position + 1])
          },
          sourceIndex: this.tokens[this.position + 1][r.FIELDS.START_POS]
        });
        this.current.parent.append(E), this.current = E, this.position++;
      }, F.comment = function() {
        var E = this.currToken;
        this.newNode(new f.default({
          value: this.content(),
          source: A(E),
          sourceIndex: E[r.FIELDS.START_POS]
        })), this.position++;
      }, F.error = function(E, q) {
        throw this.root.error(E, q);
      }, F.missingBackslash = function() {
        return this.error("Expected a backslash preceding the semicolon.", {
          index: this.currToken[r.FIELDS.START_POS]
        });
      }, F.missingParenthesis = function() {
        return this.expected("opening parenthesis", this.currToken[r.FIELDS.START_POS]);
      }, F.missingSquareBracket = function() {
        return this.expected("opening square bracket", this.currToken[r.FIELDS.START_POS]);
      }, F.unexpected = function() {
        return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[r.FIELDS.START_POS]);
      }, F.unexpectedPipe = function() {
        return this.error("Unexpected '|'.", this.currToken[r.FIELDS.START_POS]);
      }, F.namespace = function() {
        var E = this.prevToken && this.content(this.prevToken) || !0;
        if (this.nextToken[r.FIELDS.TYPE] === c.word)
          return this.position++, this.word(E);
        if (this.nextToken[r.FIELDS.TYPE] === c.asterisk)
          return this.position++, this.universal(E);
        this.unexpectedPipe();
      }, F.nesting = function() {
        if (this.nextToken) {
          var E = this.content(this.nextToken);
          if (E === "|") {
            this.position++;
            return;
          }
        }
        var q = this.currToken;
        this.newNode(new g.default({
          value: this.content(),
          source: A(q),
          sourceIndex: q[r.FIELDS.START_POS]
        })), this.position++;
      }, F.parentheses = function() {
        var E = this.current.last, q = 1;
        if (this.position++, E && E.type === _.PSEUDO) {
          var G = new p.default({
            source: {
              start: D(this.tokens[this.position])
            },
            sourceIndex: this.tokens[this.position][r.FIELDS.START_POS]
          }), x = this.current;
          for (E.append(G), this.current = G; this.position < this.tokens.length && q; )
            this.currToken[r.FIELDS.TYPE] === c.openParenthesis && q++, this.currToken[r.FIELDS.TYPE] === c.closeParenthesis && q--, q ? this.parse() : (this.current.source.end = B(this.currToken), this.current.parent.source.end = B(this.currToken), this.position++);
          this.current = x;
        } else {
          for (var $ = this.currToken, V = "(", Y; this.position < this.tokens.length && q; )
            this.currToken[r.FIELDS.TYPE] === c.openParenthesis && q++, this.currToken[r.FIELDS.TYPE] === c.closeParenthesis && q--, Y = this.currToken, V += this.parseParenthesisToken(this.currToken), this.position++;
          E ? E.appendToPropertyAndEscape("value", V, V) : this.newNode(new e.default({
            value: V,
            source: k($[r.FIELDS.START_LINE], $[r.FIELDS.START_COL], Y[r.FIELDS.END_LINE], Y[r.FIELDS.END_COL]),
            sourceIndex: $[r.FIELDS.START_POS]
          }));
        }
        if (q)
          return this.expected("closing parenthesis", this.currToken[r.FIELDS.START_POS]);
      }, F.pseudo = function() {
        for (var E = this, q = "", G = this.currToken; this.currToken && this.currToken[r.FIELDS.TYPE] === c.colon; )
          q += this.content(), this.position++;
        if (!this.currToken)
          return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
        if (this.currToken[r.FIELDS.TYPE] === c.word)
          this.splitWord(!1, function(x, $) {
            q += x, E.newNode(new t.default({
              value: q,
              source: R(G, E.currToken),
              sourceIndex: G[r.FIELDS.START_POS]
            })), $ > 1 && E.nextToken && E.nextToken[r.FIELDS.TYPE] === c.openParenthesis && E.error("Misplaced parenthesis.", {
              index: E.nextToken[r.FIELDS.START_POS]
            });
          });
        else
          return this.expected(["pseudo-class", "pseudo-element"], this.currToken[r.FIELDS.START_POS]);
      }, F.space = function() {
        var E = this.content();
        this.position === 0 || this.prevToken[r.FIELDS.TYPE] === c.comma || this.prevToken[r.FIELDS.TYPE] === c.openParenthesis || this.current.nodes.every(function(q) {
          return q.type === "comment";
        }) ? (this.spaces = this.optionalSpace(E), this.position++) : this.position === this.tokens.length - 1 || this.nextToken[r.FIELDS.TYPE] === c.comma || this.nextToken[r.FIELDS.TYPE] === c.closeParenthesis ? (this.current.last.spaces.after = this.optionalSpace(E), this.position++) : this.combinator();
      }, F.string = function() {
        var E = this.currToken;
        this.newNode(new e.default({
          value: this.content(),
          source: A(E),
          sourceIndex: E[r.FIELDS.START_POS]
        })), this.position++;
      }, F.universal = function(E) {
        var q = this.nextToken;
        if (q && this.content(q) === "|")
          return this.position++, this.namespace();
        var G = this.currToken;
        this.newNode(new a.default({
          value: this.content(),
          source: A(G),
          sourceIndex: G[r.FIELDS.START_POS]
        }), E), this.position++;
      }, F.splitWord = function(E, q) {
        for (var G = this, x = this.nextToken, $ = this.content(); x && ~[c.dollar, c.caret, c.equals, c.word].indexOf(x[r.FIELDS.TYPE]); ) {
          this.position++;
          var V = this.content();
          if ($ += V, V.lastIndexOf("\\") === V.length - 1) {
            var Y = this.nextToken;
            Y && Y[r.FIELDS.TYPE] === c.space && ($ += this.requiredSpace(this.content(Y)), this.position++);
          }
          x = this.nextToken;
        }
        var U = W($, ".").filter(function(Z) {
          var fe = $[Z - 1] === "\\", ve = /^\d+\.\d+%$/.test($);
          return !fe && !ve;
        }), K = W($, "#").filter(function(Z) {
          return $[Z - 1] !== "\\";
        }), X = W($, "#{");
        X.length && (K = K.filter(function(Z) {
          return !~X.indexOf(Z);
        }));
        var j = (0, b.default)(Q([0].concat(U, K)));
        j.forEach(function(Z, fe) {
          var ve = j[fe + 1] || $.length, de = $.slice(Z, ve);
          if (fe === 0 && q)
            return q.call(G, de, j.length);
          var ne, we = G.currToken, J = we[r.FIELDS.START_POS] + j[fe], H = k(we[1], we[2] + Z, we[3], we[2] + (ve - 1));
          if (~U.indexOf(Z)) {
            var re = {
              value: de.slice(1),
              source: H,
              sourceIndex: J
            };
            ne = new u.default(I(re, "value"));
          } else if (~K.indexOf(Z)) {
            var te = {
              value: de.slice(1),
              source: H,
              sourceIndex: J
            };
            ne = new o.default(I(te, "value"));
          } else {
            var ee = {
              value: de,
              source: H,
              sourceIndex: J
            };
            I(ee, "value"), ne = new d.default(ee);
          }
          G.newNode(ne, E), E = null;
        }), this.position++;
      }, F.word = function(E) {
        var q = this.nextToken;
        return q && this.content(q) === "|" ? (this.position++, this.namespace()) : this.splitWord(E);
      }, F.loop = function() {
        for (; this.position < this.tokens.length; )
          this.parse(!0);
        return this.current._inferEndPosition(), this.root;
      }, F.parse = function(E) {
        switch (this.currToken[r.FIELDS.TYPE]) {
          case c.space:
            this.space();
            break;
          case c.comment:
            this.comment();
            break;
          case c.openParenthesis:
            this.parentheses();
            break;
          case c.closeParenthesis:
            E && this.missingParenthesis();
            break;
          case c.openSquare:
            this.attribute();
            break;
          case c.dollar:
          case c.caret:
          case c.equals:
          case c.word:
            this.word();
            break;
          case c.colon:
            this.pseudo();
            break;
          case c.comma:
            this.comma();
            break;
          case c.asterisk:
            this.universal();
            break;
          case c.ampersand:
            this.nesting();
            break;
          case c.slash:
          case c.combinator:
            this.combinator();
            break;
          case c.str:
            this.string();
            break;
          // These cases throw; no break needed.
          case c.closeSquare:
            this.missingSquareBracket();
          case c.semicolon:
            this.missingBackslash();
          default:
            this.unexpected();
        }
      }, F.expected = function(E, q, G) {
        if (Array.isArray(E)) {
          var x = E.pop();
          E = E.join(", ") + " or " + x;
        }
        var $ = /^[aeiou]/.test(E[0]) ? "an" : "a";
        return G ? this.error("Expected " + $ + " " + E + ', found "' + G + '" instead.', {
          index: q
        }) : this.error("Expected " + $ + " " + E + ".", {
          index: q
        });
      }, F.requiredSpace = function(E) {
        return this.options.lossy ? " " : E;
      }, F.optionalSpace = function(E) {
        return this.options.lossy ? "" : E;
      }, F.lossySpace = function(E, q) {
        return this.options.lossy ? q ? " " : "" : E;
      }, F.parseParenthesisToken = function(E) {
        var q = this.content(E);
        return E[r.FIELDS.TYPE] === c.space ? this.requiredSpace(q) : q;
      }, F.newNode = function(E, q) {
        return q && (/^ +$/.test(q) && (this.options.lossy || (this.spaces = (this.spaces || "") + q), q = !0), E.namespace = q, I(E, "namespace")), this.spaces && (E.spaces.before = this.spaces, this.spaces = ""), this.current.append(E);
      }, F.content = function(E) {
        return E === void 0 && (E = this.currToken), this.css.slice(E[r.FIELDS.START_POS], E[r.FIELDS.END_POS]);
      }, F.locateNextMeaningfulToken = function(E) {
        E === void 0 && (E = this.position + 1);
        for (var q = E; q < this.tokens.length; )
          if (N[this.tokens[q][r.FIELDS.TYPE]]) {
            q++;
            continue;
          } else
            return q;
        return -1;
      }, w(L, [{
        key: "currToken",
        get: function() {
          return this.tokens[this.position];
        }
      }, {
        key: "nextToken",
        get: function() {
          return this.tokens[this.position + 1];
        }
      }, {
        key: "prevToken",
        get: function() {
          return this.tokens[this.position - 1];
        }
      }]), L;
    })();
    i.default = z, l.exports = i.default;
  })(xt, xt.exports)), xt.exports;
}
var Ws;
function sc() {
  return Ws || (Ws = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = p(ac());
    function p(f) {
      return f && f.__esModule ? f : { default: f };
    }
    var u = /* @__PURE__ */ (function() {
      function f(d, e) {
        this.func = d || function() {
        }, this.funcRes = null, this.options = e;
      }
      var o = f.prototype;
      return o._shouldUpdateSelector = function(e, t) {
        t === void 0 && (t = {});
        var n = Object.assign({}, this.options, t);
        return n.updateSelector === !1 ? !1 : typeof e != "string";
      }, o._isLossy = function(e) {
        e === void 0 && (e = {});
        var t = Object.assign({}, this.options, e);
        return t.lossless === !1;
      }, o._root = function(e, t) {
        t === void 0 && (t = {});
        var n = new v.default(e, this._parseOptions(t));
        return n.root;
      }, o._parseOptions = function(e) {
        return {
          lossy: this._isLossy(e)
        };
      }, o._run = function(e, t) {
        var n = this;
        return t === void 0 && (t = {}), new Promise(function(a, s) {
          try {
            var g = n._root(e, t);
            Promise.resolve(n.func(g)).then(function(b) {
              var r = void 0;
              return n._shouldUpdateSelector(e, t) && (r = g.toString(), e.selector = r), {
                transform: b,
                root: g,
                string: r
              };
            }).then(a, s);
          } catch (b) {
            s(b);
            return;
          }
        });
      }, o._runSync = function(e, t) {
        t === void 0 && (t = {});
        var n = this._root(e, t), a = this.func(n);
        if (a && typeof a.then == "function")
          throw new Error("Selector processor returned a promise to a synchronous call.");
        var s = void 0;
        return t.updateSelector && typeof e != "string" && (s = n.toString(), e.selector = s), {
          transform: a,
          root: n,
          string: s
        };
      }, o.ast = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.root;
        });
      }, o.astSync = function(e, t) {
        return this._runSync(e, t).root;
      }, o.transform = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.transform;
        });
      }, o.transformSync = function(e, t) {
        return this._runSync(e, t).transform;
      }, o.process = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.string || n.root.toString();
        });
      }, o.processSync = function(e, t) {
        var n = this._runSync(e, t);
        return n.string || n.root.toString();
      }, f;
    })();
    i.default = u, l.exports = i.default;
  })(Ot, Ot.exports)), Ot.exports;
}
var Mn = {}, De = {}, zs;
function oc() {
  if (zs) return De;
  zs = 1, De.__esModule = !0, De.universal = De.tag = De.string = De.selector = De.root = De.pseudo = De.nesting = De.id = De.comment = De.combinator = De.className = De.attribute = void 0;
  var l = s(Bl()), i = s(Nl()), v = s(jl()), p = s(Fl()), u = s($l()), f = s(Gl()), o = s(zl()), d = s(ql()), e = s(Ll()), t = s(Wl()), n = s(Ul()), a = s(Vl());
  function s(w) {
    return w && w.__esModule ? w : { default: w };
  }
  var g = function(P) {
    return new l.default(P);
  };
  De.attribute = g;
  var b = function(P) {
    return new i.default(P);
  };
  De.className = b;
  var r = function(P) {
    return new v.default(P);
  };
  De.combinator = r;
  var c = function(P) {
    return new p.default(P);
  };
  De.comment = c;
  var _ = function(P) {
    return new u.default(P);
  };
  De.id = _;
  var m = function(P) {
    return new f.default(P);
  };
  De.nesting = m;
  var y = function(P) {
    return new o.default(P);
  };
  De.pseudo = y;
  var S = function(P) {
    return new d.default(P);
  };
  De.root = S;
  var h = function(P) {
    return new e.default(P);
  };
  De.selector = h;
  var O = function(P) {
    return new t.default(P);
  };
  De.string = O;
  var C = function(P) {
    return new n.default(P);
  };
  De.tag = C;
  var T = function(P) {
    return new a.default(P);
  };
  return De.universal = T, De;
}
var Ee = {}, Bs;
function uc() {
  if (Bs) return Ee;
  Bs = 1, Ee.__esModule = !0, Ee.isComment = Ee.isCombinator = Ee.isClassName = Ee.isAttribute = void 0, Ee.isContainer = y, Ee.isIdentifier = void 0, Ee.isNamespace = S, Ee.isNesting = void 0, Ee.isNode = p, Ee.isPseudo = void 0, Ee.isPseudoClass = m, Ee.isPseudoElement = _, Ee.isUniversal = Ee.isTag = Ee.isString = Ee.isSelector = Ee.isRoot = void 0;
  var l = ze(), i, v = (i = {}, i[l.ATTRIBUTE] = !0, i[l.CLASS] = !0, i[l.COMBINATOR] = !0, i[l.COMMENT] = !0, i[l.ID] = !0, i[l.NESTING] = !0, i[l.PSEUDO] = !0, i[l.ROOT] = !0, i[l.SELECTOR] = !0, i[l.STRING] = !0, i[l.TAG] = !0, i[l.UNIVERSAL] = !0, i);
  function p(h) {
    return typeof h == "object" && v[h.type];
  }
  function u(h, O) {
    return p(O) && O.type === h;
  }
  var f = u.bind(null, l.ATTRIBUTE);
  Ee.isAttribute = f;
  var o = u.bind(null, l.CLASS);
  Ee.isClassName = o;
  var d = u.bind(null, l.COMBINATOR);
  Ee.isCombinator = d;
  var e = u.bind(null, l.COMMENT);
  Ee.isComment = e;
  var t = u.bind(null, l.ID);
  Ee.isIdentifier = t;
  var n = u.bind(null, l.NESTING);
  Ee.isNesting = n;
  var a = u.bind(null, l.PSEUDO);
  Ee.isPseudo = a;
  var s = u.bind(null, l.ROOT);
  Ee.isRoot = s;
  var g = u.bind(null, l.SELECTOR);
  Ee.isSelector = g;
  var b = u.bind(null, l.STRING);
  Ee.isString = b;
  var r = u.bind(null, l.TAG);
  Ee.isTag = r;
  var c = u.bind(null, l.UNIVERSAL);
  Ee.isUniversal = c;
  function _(h) {
    return a(h) && h.value && (h.value.startsWith("::") || h.value.toLowerCase() === ":before" || h.value.toLowerCase() === ":after" || h.value.toLowerCase() === ":first-letter" || h.value.toLowerCase() === ":first-line");
  }
  function m(h) {
    return a(h) && !_(h);
  }
  function y(h) {
    return !!(p(h) && h.walk);
  }
  function S(h) {
    return f(h) || r(h);
  }
  return Ee;
}
var Vs;
function lc() {
  return Vs || (Vs = 1, (function(l) {
    l.__esModule = !0;
    var i = ze();
    Object.keys(i).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === i[u] || (l[u] = i[u]);
    });
    var v = oc();
    Object.keys(v).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === v[u] || (l[u] = v[u]);
    });
    var p = uc();
    Object.keys(p).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === p[u] || (l[u] = p[u]);
    });
  })(Mn)), Mn;
}
var js;
function fc() {
  return js || (js = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(sc()), p = f(lc());
    function u(t) {
      if (typeof WeakMap != "function") return null;
      var n = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap();
      return (u = function(g) {
        return g ? a : n;
      })(t);
    }
    function f(t, n) {
      if (t && t.__esModule)
        return t;
      if (t === null || typeof t != "object" && typeof t != "function")
        return { default: t };
      var a = u(n);
      if (a && a.has(t))
        return a.get(t);
      var s = {}, g = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var b in t)
        if (b !== "default" && Object.prototype.hasOwnProperty.call(t, b)) {
          var r = g ? Object.getOwnPropertyDescriptor(t, b) : null;
          r && (r.get || r.set) ? Object.defineProperty(s, b, r) : s[b] = t[b];
        }
      return s.default = t, a && a.set(t, s), s;
    }
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }
    var d = function(n) {
      return new v.default(n);
    };
    Object.assign(d, p), delete d.__esModule;
    var e = d;
    i.default = e, l.exports = i.default;
  })(St, St.exports)), St.exports;
}
var cc = fc();
const wa = /* @__PURE__ */ tt(cc), Gs = (l) => l.replace(/-(\w|$)/g, (i, v) => v.toUpperCase()), dc = (l) => {
  const i = l.toLowerCase();
  return i.startsWith("--") ? i : i.startsWith("-ms-") ? Gs(i.slice(1)) : Gs(i);
};
function pc(l) {
  return l.replaceAll(/\\[0-9]|\\/g, "");
}
const hc = (l, i) => {
  l.walkRules((v) => {
    var p;
    ((p = v.parent) == null ? void 0 : p.type) !== "atrule" && wa((u) => {
      let f = !1;
      u.walkPseudos(() => {
        f = !0;
      }), f || i(v);
    }).processSync(v.selector);
  });
};
function vc(l, i) {
  let p = [...l.split(" ")];
  const u = {};
  return hc(i, (f) => {
    const o = [];
    wa((d) => {
      d.walkClasses((e) => {
        o.push(pc(e.value));
      });
    }).processSync(f.selector), p = p.filter((d) => !o.includes(d)), f.walkDecls((d) => {
      u[dc(d.prop)] = d.value + (d.important ? "!important" : "");
    });
  }), {
    styles: u,
    residualClassName: p.join(" ")
  };
}
const gc = (l) => {
  l.walkDecls((i) => {
    const v = /rgb\(\s*(\d+)\s*(\d+)\s*(\d+)(?:\s*\/\s*([\d%.]+))?\s*\)/g;
    i.value = i.value.replaceAll(
      v,
      (p, u, f, o, d) => {
        const e = d === "1" || typeof d > "u" ? "" : `,${d}`;
        return `rgb(${u},${f},${o}${e})`;
      }
    );
  });
}, mc = (l) => {
  const i = [], v = [], p = wa();
  return l.walkAtRules((u) => {
    const f = u.clone();
    f.walkRules((d) => {
      const e = p.astSync(d.selector);
      e.walkClasses((n) => {
        v.push(n.value), Ys(n);
      });
      const t = d.clone({ selector: e.toString() });
      t.walkDecls((n) => {
        n.important = !0;
      }), d.replaceWith(t);
    });
    const o = i.find(
      (d) => d instanceof Rl && d.params === f.params
    );
    o ? o.append(f.nodes) : i.push(f);
  }), l.walkRules((u) => {
    if (u.parent && u.parent.type !== "root") return;
    const f = p.astSync(u.selector);
    let o = !1;
    if (f.walkPseudos(() => {
      o = !0;
    }), !!o && (f.walkClasses((d) => {
      v.push(d.value), Ys(d);
    }), o)) {
      const d = u.clone({ selector: f.toString() });
      d.walkDecls((e) => {
        e.important = !0;
      }), i.push(d);
    }
  }), {
    nonInlinableClasses: v,
    sanitizedRules: i
  };
}, Ys = (l) => {
  l.replaceWith(
    l.clone({
      value: Ml(l.value)
    })
  );
}, yc = (l, i) => {
  const v = {};
  let p = [], u = [];
  if (l.props.className) {
    const o = i.generateRootForClasses(
      l.props.className.split(" ")
    );
    gc(o), {
      sanitizedRules: u,
      nonInlinableClasses: p
    } = mc(o);
    const { styles: d, residualClassName: e } = vc(
      l.props.className,
      o
    );
    if (v.style = {
      ...d,
      ...l.props.style
    }, !Il(l))
      if (e.trim().length > 0) {
        v.className = e;
        for (const t of p)
          v.className = v.className.replace(
            t,
            Ml(t)
          );
      } else
        v.className = void 0;
  }
  const f = {
    ...l.props,
    ...v
  };
  return {
    elementWithInlinedStyles: ht.cloneElement(
      l,
      f,
      f.children
    ),
    nonInlinableClasses: p,
    nonInlineStyleNodes: u
  };
};
var Dn = {}, Qs;
function wc() {
  return Qs || (Qs = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return p;
      }
    });
    let i = {
      atrule: [
        "name",
        "params"
      ],
      rule: [
        "selector"
      ]
    }, v = new Set(Object.keys(i));
    function p() {
      function u(f) {
        let o = null;
        f.each((d) => {
          if (!v.has(d.type)) {
            o = null;
            return;
          }
          if (o === null) {
            o = d;
            return;
          }
          let e = i[d.type];
          var t, n;
          d.type === "atrule" && d.name === "font-face" ? o = d : e.every((a) => ((t = d[a]) !== null && t !== void 0 ? t : "").replace(/\s+/g, " ") === ((n = o[a]) !== null && n !== void 0 ? n : "").replace(/\s+/g, " ")) ? (d.nodes && o.append(d.nodes), d.remove()) : o = d;
        }), f.each((d) => {
          d.type === "atrule" && u(d);
        });
      }
      return (f) => {
        u(f);
      };
    }
  })(Dn)), Dn;
}
var bc = wc();
const _c = /* @__PURE__ */ tt(bc);
var qn = {}, Hs;
function Sc() {
  return Hs || (Hs = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i() {
      return (u) => {
        u.walkRules((f) => {
          let o = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set([]), e = /* @__PURE__ */ new Map();
          f.walkDecls((t) => {
            if (t.parent === f) {
              if (o.has(t.prop)) {
                if (o.get(t.prop).value === t.value) {
                  d.add(o.get(t.prop)), o.set(t.prop, t);
                  return;
                }
                e.has(t.prop) || e.set(t.prop, /* @__PURE__ */ new Set()), e.get(t.prop).add(o.get(t.prop)), e.get(t.prop).add(t);
              }
              o.set(t.prop, t);
            }
          });
          for (let t of d)
            t.remove();
          for (let t of e.values()) {
            let n = /* @__PURE__ */ new Map();
            for (let a of t) {
              let s = p(a.value);
              s !== null && (n.has(s) || n.set(s, /* @__PURE__ */ new Set()), n.get(s).add(a));
            }
            for (let a of n.values()) {
              let s = Array.from(a).slice(0, -1);
              for (let g of s)
                g.remove();
            }
          }
        });
      };
    }
    let v = Symbol("unitless-number");
    function p(u) {
      let f = /^-?\d*.?\d+([\w%]+)?$/g.exec(u);
      if (f) {
        var o;
        return (o = f[1]) !== null && o !== void 0 ? o : v;
      }
      return null;
    }
  })(qn)), qn;
}
var Oc = Sc();
const xc = /* @__PURE__ */ tt(Oc);
var Ln = {}, Nn = { exports: {} }, Js;
function Ql() {
  return Js || (Js = 1, (function(l, i) {
    (function(v, p) {
      l.exports = function(u, f, o, d, e) {
        for (f = f.split ? f.split(".") : f, d = 0; d < f.length; d++) u = u ? u[f[d]] : e;
        return u === e ? o : u;
      };
    })();
  })(Nn)), Nn.exports;
}
var Fn = { exports: {} }, Ks;
function Pc() {
  return Ks || (Ks = 1, (function(l) {
    (function() {
      function i(u, f, o) {
        if (!u) return null;
        i.caseSensitive || (u = u.toLowerCase());
        var d = i.threshold === null ? null : i.threshold * u.length, e = i.thresholdAbsolute, t;
        d !== null && e !== null ? t = Math.min(d, e) : d !== null ? t = d : e !== null ? t = e : t = null;
        var n, a, s, g, b, r = f.length;
        for (b = 0; b < r; b++)
          if (a = f[b], o && (a = a[o]), !!a && (i.caseSensitive ? s = a : s = a.toLowerCase(), g = p(u, s, t), (t === null || g < t) && (t = g, o && i.returnWinningObject ? n = f[b] : n = a, i.returnFirstMatch)))
            return n;
        return n || i.nullResultValue;
      }
      i.threshold = 0.4, i.thresholdAbsolute = 20, i.caseSensitive = !1, i.nullResultValue = null, i.returnWinningObject = null, i.returnFirstMatch = !1, l.exports ? l.exports = i : window.didYouMean = i;
      var v = Math.pow(2, 32) - 1;
      function p(u, f, o) {
        o = o || o === 0 ? o : v;
        var d = u.length, e = f.length;
        if (d === 0) return Math.min(o + 1, e);
        if (e === 0) return Math.min(o + 1, d);
        if (Math.abs(d - e) > o) return o + 1;
        var t = [], n, a, s, g, b;
        for (n = 0; n <= e; n++)
          t[n] = [n];
        for (a = 0; a <= d; a++)
          t[0][a] = a;
        for (n = 1; n <= e; n++) {
          for (s = v, g = 1, n > o && (g = n - o), b = e + 1, b > o + n && (b = o + n), a = 1; a <= d; a++)
            a < g || a > b ? t[n][a] = o + 1 : f.charAt(n - 1) === u.charAt(a - 1) ? t[n][a] = t[n - 1][a - 1] : t[n][a] = Math.min(
              t[n - 1][a - 1] + 1,
              // Substitute
              Math.min(
                t[n][a - 1] + 1,
                // Insert
                t[n - 1][a] + 1
              )
            ), t[n][a] < s && (s = t[n][a]);
          if (s > o) return o + 1;
        }
        return t[e][d];
      }
    })();
  })(Fn)), Fn.exports;
}
var $n = {}, Un = {}, Xs;
function gt() {
  return Xs || (Xs = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v) {
      if (Object.prototype.toString.call(v) !== "[object Object]")
        return !1;
      const p = Object.getPrototypeOf(v);
      return p === null || Object.getPrototypeOf(p) === null;
    }
  })(Un)), Un;
}
var Zs;
function zr() {
  return Zs || (Zs = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const i = /* @__PURE__ */ p(Je()), v = /* @__PURE__ */ p(gt());
    function p(f) {
      return f && f.__esModule ? f : {
        default: f
      };
    }
    function u(f) {
      return [
        "fontSize",
        "outline"
      ].includes(f) ? (o) => (typeof o == "function" && (o = o({})), Array.isArray(o) && (o = o[0]), o) : f === "fontFamily" ? (o) => {
        typeof o == "function" && (o = o({}));
        let d = Array.isArray(o) && (0, v.default)(o[1]) ? o[0] : o;
        return Array.isArray(d) ? d.join(", ") : d;
      } : [
        "boxShadow",
        "transitionProperty",
        "transitionDuration",
        "transitionDelay",
        "transitionTimingFunction",
        "backgroundImage",
        "backgroundSize",
        "backgroundColor",
        "cursor",
        "animation"
      ].includes(f) ? (o) => (typeof o == "function" && (o = o({})), Array.isArray(o) && (o = o.join(", ")), o) : [
        "gridTemplateColumns",
        "gridTemplateRows",
        "objectPosition"
      ].includes(f) ? (o) => (typeof o == "function" && (o = o({})), typeof o == "string" && (o = i.default.list.comma(o).join(" ")), o) : (o, d = {}) => (typeof o == "function" && (o = o(d)), o);
    }
  })($n)), $n;
}
var Wn, eo;
function Tc() {
  if (eo) return Wn;
  eo = 1;
  var l = 40, i = 41, v = 39, p = 34, u = 92, f = 47, o = 44, d = 58, e = 42, t = 117, n = 85, a = 43, s = /^[a-f0-9?-]+$/i;
  return Wn = function(g) {
    for (var b = [], r = g, c, _, m, y, S, h, O, C, T = 0, w = r.charCodeAt(T), P = r.length, N = [
      {
        nodes: b
      }
    ], D = 0, B, k = "", A = "", R = ""; T < P; )
      if (w <= 32) {
        c = T;
        do
          c += 1, w = r.charCodeAt(c);
        while (w <= 32);
        y = r.slice(T, c), m = b[b.length - 1], w === i && D ? R = y : m && m.type === "div" ? (m.after = y, m.sourceEndIndex += y.length) : w === o || w === d || w === f && r.charCodeAt(c + 1) !== e && (!B || B && B.type === "function" && !1) ? A = y : b.push({
          type: "space",
          sourceIndex: T,
          sourceEndIndex: c,
          value: y
        }), T = c;
      } else if (w === v || w === p) {
        c = T, _ = w === v ? "'" : '"', y = {
          type: "string",
          sourceIndex: T,
          quote: _
        };
        do
          if (S = !1, c = r.indexOf(_, c + 1), ~c)
            for (h = c; r.charCodeAt(h - 1) === u; )
              h -= 1, S = !S;
          else
            r += _, c = r.length - 1, y.unclosed = !0;
        while (S);
        y.value = r.slice(T + 1, c), y.sourceEndIndex = y.unclosed ? c : c + 1, b.push(y), T = c + 1, w = r.charCodeAt(T);
      } else if (w === f && r.charCodeAt(T + 1) === e)
        c = r.indexOf("*/", T), y = {
          type: "comment",
          sourceIndex: T,
          sourceEndIndex: c + 2
        }, c === -1 && (y.unclosed = !0, c = r.length, y.sourceEndIndex = c), y.value = r.slice(T + 2, c), b.push(y), T = c + 2, w = r.charCodeAt(T);
      else if ((w === f || w === e) && B && B.type === "function")
        y = r[T], b.push({
          type: "word",
          sourceIndex: T - A.length,
          sourceEndIndex: T + y.length,
          value: y
        }), T += 1, w = r.charCodeAt(T);
      else if (w === f || w === o || w === d)
        y = r[T], b.push({
          type: "div",
          sourceIndex: T - A.length,
          sourceEndIndex: T + y.length,
          value: y,
          before: A,
          after: ""
        }), A = "", T += 1, w = r.charCodeAt(T);
      else if (l === w) {
        c = T;
        do
          c += 1, w = r.charCodeAt(c);
        while (w <= 32);
        if (C = T, y = {
          type: "function",
          sourceIndex: T - k.length,
          value: k,
          before: r.slice(C + 1, c)
        }, T = c, k === "url" && w !== v && w !== p) {
          c -= 1;
          do
            if (S = !1, c = r.indexOf(")", c + 1), ~c)
              for (h = c; r.charCodeAt(h - 1) === u; )
                h -= 1, S = !S;
            else
              r += ")", c = r.length - 1, y.unclosed = !0;
          while (S);
          O = c;
          do
            O -= 1, w = r.charCodeAt(O);
          while (w <= 32);
          C < O ? (T !== O + 1 ? y.nodes = [
            {
              type: "word",
              sourceIndex: T,
              sourceEndIndex: O + 1,
              value: r.slice(T, O + 1)
            }
          ] : y.nodes = [], y.unclosed && O + 1 !== c ? (y.after = "", y.nodes.push({
            type: "space",
            sourceIndex: O + 1,
            sourceEndIndex: c,
            value: r.slice(O + 1, c)
          })) : (y.after = r.slice(O + 1, c), y.sourceEndIndex = c)) : (y.after = "", y.nodes = []), T = c + 1, y.sourceEndIndex = y.unclosed ? c : T, w = r.charCodeAt(T), b.push(y);
        } else
          D += 1, y.after = "", y.sourceEndIndex = T + 1, b.push(y), N.push(y), b = y.nodes = [], B = y;
        k = "";
      } else if (i === w && D)
        T += 1, w = r.charCodeAt(T), B.after = R, B.sourceEndIndex += R.length, R = "", D -= 1, N[N.length - 1].sourceEndIndex = T, N.pop(), B = N[D], b = B.nodes;
      else {
        c = T;
        do
          w === u && (c += 1), c += 1, w = r.charCodeAt(c);
        while (c < P && !(w <= 32 || w === v || w === p || w === o || w === d || w === f || w === l || w === e && B && B.type === "function" || w === f && B.type === "function" || w === i && D));
        y = r.slice(T, c), l === w ? k = y : (t === y.charCodeAt(0) || n === y.charCodeAt(0)) && a === y.charCodeAt(1) && s.test(y.slice(2)) ? b.push({
          type: "unicode-range",
          sourceIndex: T,
          sourceEndIndex: c,
          value: y
        }) : b.push({
          type: "word",
          sourceIndex: T,
          sourceEndIndex: c,
          value: y
        }), T = c;
      }
    for (T = N.length - 1; T; T -= 1)
      N[T].unclosed = !0, N[T].sourceEndIndex = r.length;
    return N[0].nodes;
  }, Wn;
}
var zn, to;
function kc() {
  return to || (to = 1, zn = function l(i, v, p) {
    var u, f, o, d;
    for (u = 0, f = i.length; u < f; u += 1)
      o = i[u], p || (d = v(o, u, i)), d !== !1 && o.type === "function" && Array.isArray(o.nodes) && l(o.nodes, v, p), p && v(o, u, i);
  }), zn;
}
var Bn, ro;
function Ec() {
  if (ro) return Bn;
  ro = 1;
  function l(v, p) {
    var u = v.type, f = v.value, o, d;
    return p && (d = p(v)) !== void 0 ? d : u === "word" || u === "space" ? f : u === "string" ? (o = v.quote || "", o + f + (v.unclosed ? "" : o)) : u === "comment" ? "/*" + f + (v.unclosed ? "" : "*/") : u === "div" ? (v.before || "") + f + (v.after || "") : Array.isArray(v.nodes) ? (o = i(v.nodes, p), u !== "function" ? o : f + "(" + (v.before || "") + o + (v.after || "") + (v.unclosed ? "" : ")")) : f;
  }
  function i(v, p) {
    var u, f;
    if (Array.isArray(v)) {
      for (u = "", f = v.length - 1; ~f; f -= 1)
        u = l(v[f], p) + u;
      return u;
    }
    return l(v, p);
  }
  return Bn = i, Bn;
}
var Vn, no;
function Ac() {
  if (no) return Vn;
  no = 1;
  var l = 45, i = 43, v = 46, p = 101, u = 69;
  function f(o) {
    var d = o.charCodeAt(0), e;
    if (d === i || d === l) {
      if (e = o.charCodeAt(1), e >= 48 && e <= 57)
        return !0;
      var t = o.charCodeAt(2);
      return e === v && t >= 48 && t <= 57;
    }
    return d === v ? (e = o.charCodeAt(1), e >= 48 && e <= 57) : d >= 48 && d <= 57;
  }
  return Vn = function(o) {
    var d = 0, e = o.length, t, n, a;
    if (e === 0 || !f(o))
      return !1;
    for (t = o.charCodeAt(d), (t === i || t === l) && d++; d < e && (t = o.charCodeAt(d), !(t < 48 || t > 57)); )
      d += 1;
    if (t = o.charCodeAt(d), n = o.charCodeAt(d + 1), t === v && n >= 48 && n <= 57)
      for (d += 2; d < e && (t = o.charCodeAt(d), !(t < 48 || t > 57)); )
        d += 1;
    if (t = o.charCodeAt(d), n = o.charCodeAt(d + 1), a = o.charCodeAt(d + 2), (t === p || t === u) && (n >= 48 && n <= 57 || (n === i || n === l) && a >= 48 && a <= 57))
      for (d += n === i || n === l ? 3 : 2; d < e && (t = o.charCodeAt(d), !(t < 48 || t > 57)); )
        d += 1;
    return {
      number: o.slice(0, d),
      unit: o.slice(d)
    };
  }, Vn;
}
var jn, io;
function Cc() {
  if (io) return jn;
  io = 1;
  var l = Tc(), i = kc(), v = Ec();
  function p(u) {
    return this instanceof p ? (this.nodes = l(u), this) : new p(u);
  }
  return p.prototype.toString = function() {
    return Array.isArray(this.nodes) ? v(this.nodes) : "";
  }, p.prototype.walk = function(u, f) {
    return i(this.nodes, u, f), this;
  }, p.unit = Ac(), p.walk = i, p.stringify = v, jn = p, jn;
}
var Gn = {}, ao;
function ba() {
  return ao || (ao = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(d, e) {
      for (var t in e) Object.defineProperty(d, t, {
        enumerable: !0,
        get: e[t]
      });
    }
    i(l, {
      normalizeScreens: function() {
        return v;
      },
      isScreenSortable: function() {
        return p;
      },
      compareScreens: function() {
        return u;
      },
      toScreen: function() {
        return f;
      }
    });
    function v(d, e = !0) {
      return Array.isArray(d) ? d.map((t) => {
        if (e && Array.isArray(t))
          throw new Error("The tuple syntax is not supported for `screens`.");
        if (typeof t == "string")
          return {
            name: t.toString(),
            not: !1,
            values: [
              {
                min: t,
                max: void 0
              }
            ]
          };
        let [n, a] = t;
        return n = n.toString(), typeof a == "string" ? {
          name: n,
          not: !1,
          values: [
            {
              min: a,
              max: void 0
            }
          ]
        } : Array.isArray(a) ? {
          name: n,
          not: !1,
          values: a.map((s) => o(s))
        } : {
          name: n,
          not: !1,
          values: [
            o(a)
          ]
        };
      }) : v(Object.entries(d ?? {}), !1);
    }
    function p(d) {
      return d.values.length !== 1 ? {
        result: !1,
        reason: "multiple-values"
      } : d.values[0].raw !== void 0 ? {
        result: !1,
        reason: "raw-values"
      } : d.values[0].min !== void 0 && d.values[0].max !== void 0 ? {
        result: !1,
        reason: "min-and-max"
      } : {
        result: !0,
        reason: null
      };
    }
    function u(d, e, t) {
      let n = f(e, d), a = f(t, d), s = p(n), g = p(a);
      if (s.reason === "multiple-values" || g.reason === "multiple-values")
        throw new Error("Attempted to sort a screen with multiple values. This should never happen. Please open a bug report.");
      if (s.reason === "raw-values" || g.reason === "raw-values")
        throw new Error("Attempted to sort a screen with raw values. This should never happen. Please open a bug report.");
      if (s.reason === "min-and-max" || g.reason === "min-and-max")
        throw new Error("Attempted to sort a screen with both min and max values. This should never happen. Please open a bug report.");
      let { min: b, max: r } = n.values[0], { min: c, max: _ } = a.values[0];
      e.not && ([b, r] = [
        r,
        b
      ]), t.not && ([c, _] = [
        _,
        c
      ]), b = b === void 0 ? b : parseFloat(b), r = r === void 0 ? r : parseFloat(r), c = c === void 0 ? c : parseFloat(c), _ = _ === void 0 ? _ : parseFloat(_);
      let [m, y] = d === "min" ? [
        b,
        c
      ] : [
        _,
        r
      ];
      return m - y;
    }
    function f(d, e) {
      return typeof d == "object" ? d : {
        name: "arbitrary-screen",
        values: [
          {
            [e]: d
          }
        ]
      };
    }
    function o({ "min-width": d, min: e = d, max: t, raw: n } = {}) {
      return {
        min: e,
        max: t,
        raw: n
      };
    }
  })(Gn)), Gn;
}
var Yn = {}, so;
function _a() {
  return so || (so = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v) {
      return v = Array.isArray(v) ? v : [
        v
      ], v.map((p) => {
        let u = p.values.map((f) => f.raw !== void 0 ? f.raw : [
          f.min && `(min-width: ${f.min})`,
          f.max && `(max-width: ${f.max})`
        ].filter(Boolean).join(" and "));
        return p.not ? `not all and ${u}` : u;
      }).join(", ");
    }
  })(Yn)), Yn;
}
var Qn = {}, oo;
function Sa() {
  return oo || (oo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "toPath", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v) {
      if (Array.isArray(v)) return v;
      let p = v.split("[").length - 1, u = v.split("]").length - 1;
      if (p !== u)
        throw new Error(`Path is invalid. Has unbalanced brackets: ${v}`);
      return v.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
    }
  })(Qn)), Qn;
}
var Hn = {}, Jn = {}, Kn = {}, uo;
function Rc() {
  return uo || (uo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const i = {
      aliceblue: [
        240,
        248,
        255
      ],
      antiquewhite: [
        250,
        235,
        215
      ],
      aqua: [
        0,
        255,
        255
      ],
      aquamarine: [
        127,
        255,
        212
      ],
      azure: [
        240,
        255,
        255
      ],
      beige: [
        245,
        245,
        220
      ],
      bisque: [
        255,
        228,
        196
      ],
      black: [
        0,
        0,
        0
      ],
      blanchedalmond: [
        255,
        235,
        205
      ],
      blue: [
        0,
        0,
        255
      ],
      blueviolet: [
        138,
        43,
        226
      ],
      brown: [
        165,
        42,
        42
      ],
      burlywood: [
        222,
        184,
        135
      ],
      cadetblue: [
        95,
        158,
        160
      ],
      chartreuse: [
        127,
        255,
        0
      ],
      chocolate: [
        210,
        105,
        30
      ],
      coral: [
        255,
        127,
        80
      ],
      cornflowerblue: [
        100,
        149,
        237
      ],
      cornsilk: [
        255,
        248,
        220
      ],
      crimson: [
        220,
        20,
        60
      ],
      cyan: [
        0,
        255,
        255
      ],
      darkblue: [
        0,
        0,
        139
      ],
      darkcyan: [
        0,
        139,
        139
      ],
      darkgoldenrod: [
        184,
        134,
        11
      ],
      darkgray: [
        169,
        169,
        169
      ],
      darkgreen: [
        0,
        100,
        0
      ],
      darkgrey: [
        169,
        169,
        169
      ],
      darkkhaki: [
        189,
        183,
        107
      ],
      darkmagenta: [
        139,
        0,
        139
      ],
      darkolivegreen: [
        85,
        107,
        47
      ],
      darkorange: [
        255,
        140,
        0
      ],
      darkorchid: [
        153,
        50,
        204
      ],
      darkred: [
        139,
        0,
        0
      ],
      darksalmon: [
        233,
        150,
        122
      ],
      darkseagreen: [
        143,
        188,
        143
      ],
      darkslateblue: [
        72,
        61,
        139
      ],
      darkslategray: [
        47,
        79,
        79
      ],
      darkslategrey: [
        47,
        79,
        79
      ],
      darkturquoise: [
        0,
        206,
        209
      ],
      darkviolet: [
        148,
        0,
        211
      ],
      deeppink: [
        255,
        20,
        147
      ],
      deepskyblue: [
        0,
        191,
        255
      ],
      dimgray: [
        105,
        105,
        105
      ],
      dimgrey: [
        105,
        105,
        105
      ],
      dodgerblue: [
        30,
        144,
        255
      ],
      firebrick: [
        178,
        34,
        34
      ],
      floralwhite: [
        255,
        250,
        240
      ],
      forestgreen: [
        34,
        139,
        34
      ],
      fuchsia: [
        255,
        0,
        255
      ],
      gainsboro: [
        220,
        220,
        220
      ],
      ghostwhite: [
        248,
        248,
        255
      ],
      gold: [
        255,
        215,
        0
      ],
      goldenrod: [
        218,
        165,
        32
      ],
      gray: [
        128,
        128,
        128
      ],
      green: [
        0,
        128,
        0
      ],
      greenyellow: [
        173,
        255,
        47
      ],
      grey: [
        128,
        128,
        128
      ],
      honeydew: [
        240,
        255,
        240
      ],
      hotpink: [
        255,
        105,
        180
      ],
      indianred: [
        205,
        92,
        92
      ],
      indigo: [
        75,
        0,
        130
      ],
      ivory: [
        255,
        255,
        240
      ],
      khaki: [
        240,
        230,
        140
      ],
      lavender: [
        230,
        230,
        250
      ],
      lavenderblush: [
        255,
        240,
        245
      ],
      lawngreen: [
        124,
        252,
        0
      ],
      lemonchiffon: [
        255,
        250,
        205
      ],
      lightblue: [
        173,
        216,
        230
      ],
      lightcoral: [
        240,
        128,
        128
      ],
      lightcyan: [
        224,
        255,
        255
      ],
      lightgoldenrodyellow: [
        250,
        250,
        210
      ],
      lightgray: [
        211,
        211,
        211
      ],
      lightgreen: [
        144,
        238,
        144
      ],
      lightgrey: [
        211,
        211,
        211
      ],
      lightpink: [
        255,
        182,
        193
      ],
      lightsalmon: [
        255,
        160,
        122
      ],
      lightseagreen: [
        32,
        178,
        170
      ],
      lightskyblue: [
        135,
        206,
        250
      ],
      lightslategray: [
        119,
        136,
        153
      ],
      lightslategrey: [
        119,
        136,
        153
      ],
      lightsteelblue: [
        176,
        196,
        222
      ],
      lightyellow: [
        255,
        255,
        224
      ],
      lime: [
        0,
        255,
        0
      ],
      limegreen: [
        50,
        205,
        50
      ],
      linen: [
        250,
        240,
        230
      ],
      magenta: [
        255,
        0,
        255
      ],
      maroon: [
        128,
        0,
        0
      ],
      mediumaquamarine: [
        102,
        205,
        170
      ],
      mediumblue: [
        0,
        0,
        205
      ],
      mediumorchid: [
        186,
        85,
        211
      ],
      mediumpurple: [
        147,
        112,
        219
      ],
      mediumseagreen: [
        60,
        179,
        113
      ],
      mediumslateblue: [
        123,
        104,
        238
      ],
      mediumspringgreen: [
        0,
        250,
        154
      ],
      mediumturquoise: [
        72,
        209,
        204
      ],
      mediumvioletred: [
        199,
        21,
        133
      ],
      midnightblue: [
        25,
        25,
        112
      ],
      mintcream: [
        245,
        255,
        250
      ],
      mistyrose: [
        255,
        228,
        225
      ],
      moccasin: [
        255,
        228,
        181
      ],
      navajowhite: [
        255,
        222,
        173
      ],
      navy: [
        0,
        0,
        128
      ],
      oldlace: [
        253,
        245,
        230
      ],
      olive: [
        128,
        128,
        0
      ],
      olivedrab: [
        107,
        142,
        35
      ],
      orange: [
        255,
        165,
        0
      ],
      orangered: [
        255,
        69,
        0
      ],
      orchid: [
        218,
        112,
        214
      ],
      palegoldenrod: [
        238,
        232,
        170
      ],
      palegreen: [
        152,
        251,
        152
      ],
      paleturquoise: [
        175,
        238,
        238
      ],
      palevioletred: [
        219,
        112,
        147
      ],
      papayawhip: [
        255,
        239,
        213
      ],
      peachpuff: [
        255,
        218,
        185
      ],
      peru: [
        205,
        133,
        63
      ],
      pink: [
        255,
        192,
        203
      ],
      plum: [
        221,
        160,
        221
      ],
      powderblue: [
        176,
        224,
        230
      ],
      purple: [
        128,
        0,
        128
      ],
      rebeccapurple: [
        102,
        51,
        153
      ],
      red: [
        255,
        0,
        0
      ],
      rosybrown: [
        188,
        143,
        143
      ],
      royalblue: [
        65,
        105,
        225
      ],
      saddlebrown: [
        139,
        69,
        19
      ],
      salmon: [
        250,
        128,
        114
      ],
      sandybrown: [
        244,
        164,
        96
      ],
      seagreen: [
        46,
        139,
        87
      ],
      seashell: [
        255,
        245,
        238
      ],
      sienna: [
        160,
        82,
        45
      ],
      silver: [
        192,
        192,
        192
      ],
      skyblue: [
        135,
        206,
        235
      ],
      slateblue: [
        106,
        90,
        205
      ],
      slategray: [
        112,
        128,
        144
      ],
      slategrey: [
        112,
        128,
        144
      ],
      snow: [
        255,
        250,
        250
      ],
      springgreen: [
        0,
        255,
        127
      ],
      steelblue: [
        70,
        130,
        180
      ],
      tan: [
        210,
        180,
        140
      ],
      teal: [
        0,
        128,
        128
      ],
      thistle: [
        216,
        191,
        216
      ],
      tomato: [
        255,
        99,
        71
      ],
      turquoise: [
        64,
        224,
        208
      ],
      violet: [
        238,
        130,
        238
      ],
      wheat: [
        245,
        222,
        179
      ],
      white: [
        255,
        255,
        255
      ],
      whitesmoke: [
        245,
        245,
        245
      ],
      yellow: [
        255,
        255,
        0
      ],
      yellowgreen: [
        154,
        205,
        50
      ]
    };
  })(Kn)), Kn;
}
var lo;
function Hl() {
  return lo || (lo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(b, r) {
      for (var c in r) Object.defineProperty(b, c, {
        enumerable: !0,
        get: r[c]
      });
    }
    i(l, {
      parseColor: function() {
        return s;
      },
      formatColor: function() {
        return g;
      }
    });
    const v = /* @__PURE__ */ p(Rc());
    function p(b) {
      return b && b.__esModule ? b : {
        default: b
      };
    }
    let u = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, f = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, o = /(?:\d+|\d*\.\d+)%?/, d = /(?:\s*,\s*|\s+)/, e = /\s*[,/]\s*/, t = /var\(--(?:[^ )]*?)(?:,(?:[^ )]*?|var\(--[^ )]*?\)))?\)/, n = new RegExp(`^(rgba?)\\(\\s*(${o.source}|${t.source})(?:${d.source}(${o.source}|${t.source}))?(?:${d.source}(${o.source}|${t.source}))?(?:${e.source}(${o.source}|${t.source}))?\\s*\\)$`), a = new RegExp(`^(hsla?)\\(\\s*((?:${o.source})(?:deg|rad|grad|turn)?|${t.source})(?:${d.source}(${o.source}|${t.source}))?(?:${d.source}(${o.source}|${t.source}))?(?:${e.source}(${o.source}|${t.source}))?\\s*\\)$`);
    function s(b, { loose: r = !1 } = {}) {
      var c, _;
      if (typeof b != "string")
        return null;
      if (b = b.trim(), b === "transparent")
        return {
          mode: "rgb",
          color: [
            "0",
            "0",
            "0"
          ],
          alpha: "0"
        };
      if (b in v.default)
        return {
          mode: "rgb",
          color: v.default[b].map((O) => O.toString())
        };
      let m = b.replace(f, (O, C, T, w, P) => [
        "#",
        C,
        C,
        T,
        T,
        w,
        w,
        P ? P + P : ""
      ].join("")).match(u);
      if (m !== null)
        return {
          mode: "rgb",
          color: [
            parseInt(m[1], 16),
            parseInt(m[2], 16),
            parseInt(m[3], 16)
          ].map((O) => O.toString()),
          alpha: m[4] ? (parseInt(m[4], 16) / 255).toString() : void 0
        };
      var y;
      let S = (y = b.match(n)) !== null && y !== void 0 ? y : b.match(a);
      if (S === null)
        return null;
      let h = [
        S[2],
        S[3],
        S[4]
      ].filter(Boolean).map((O) => O.toString());
      return h.length === 2 && h[0].startsWith("var(") ? {
        mode: S[1],
        color: [
          h[0]
        ],
        alpha: h[1]
      } : !r && h.length !== 3 || h.length < 3 && !h.some((O) => /^var\(.*?\)$/.test(O)) ? null : {
        mode: S[1],
        color: h,
        alpha: (c = S[5]) === null || c === void 0 || (_ = c.toString) === null || _ === void 0 ? void 0 : _.call(c)
      };
    }
    function g({ mode: b, color: r, alpha: c }) {
      let _ = c !== void 0;
      return b === "rgba" || b === "hsla" ? `${b}(${r.join(", ")}${_ ? `, ${c}` : ""})` : `${b}(${r.join(" ")}${_ ? ` / ${c}` : ""})`;
    }
  })(Jn)), Jn;
}
var fo;
function Br() {
  return fo || (fo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(f, o) {
      for (var d in o) Object.defineProperty(f, d, {
        enumerable: !0,
        get: o[d]
      });
    }
    i(l, {
      withAlphaValue: function() {
        return p;
      },
      default: function() {
        return u;
      }
    });
    const v = Hl();
    function p(f, o, d) {
      if (typeof f == "function")
        return f({
          opacityValue: o
        });
      let e = (0, v.parseColor)(f, {
        loose: !0
      });
      return e === null ? d : (0, v.formatColor)({
        ...e,
        alpha: o
      });
    }
    function u({ color: f, property: o, variable: d }) {
      let e = [].concat(o);
      if (typeof f == "function")
        return {
          [d]: "1",
          ...Object.fromEntries(e.map((n) => [
            n,
            f({
              opacityVariable: d,
              opacityValue: `var(${d})`
            })
          ]))
        };
      const t = (0, v.parseColor)(f);
      return t === null ? Object.fromEntries(e.map((n) => [
        n,
        f
      ])) : t.alpha !== void 0 ? Object.fromEntries(e.map((n) => [
        n,
        f
      ])) : {
        [d]: "1",
        ...Object.fromEntries(e.map((n) => [
          n,
          (0, v.formatColor)({
            ...t,
            alpha: `var(${d})`
          })
        ]))
      };
    }
  })(Hn)), Hn;
}
var Xn = {}, Zn = {}, co;
function Oa() {
  return co || (co = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v) {
      return v.replace(/\\,/g, "\\2c ");
    }
  })(Zn)), Zn;
}
var ei = {}, ti = {}, ri = {}, po;
function pt() {
  return po || (po = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "splitAtTopLevelOnly", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v, p) {
      let u = [], f = [], o = 0, d = !1;
      for (let e = 0; e < v.length; e++) {
        let t = v[e];
        u.length === 0 && t === p[0] && !d && (p.length === 1 || v.slice(e, e + p.length) === p) && (f.push(v.slice(o, e)), o = e + p.length), d = d ? !1 : t === "\\", t === "(" || t === "[" || t === "{" ? u.push(t) : (t === ")" && u[u.length - 1] === "(" || t === "]" && u[u.length - 1] === "[" || t === "}" && u[u.length - 1] === "{") && u.pop();
      }
      return f.push(v.slice(o)), f;
    }
  })(ri)), ri;
}
var ho;
function Jl() {
  return ho || (ho = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(e, t) {
      for (var n in t) Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
      });
    }
    i(l, {
      parseBoxShadowValue: function() {
        return o;
      },
      formatBoxShadowValue: function() {
        return d;
      }
    });
    const v = pt();
    let p = /* @__PURE__ */ new Set([
      "inset",
      "inherit",
      "initial",
      "revert",
      "unset"
    ]), u = /\ +(?![^(]*\))/g, f = /^-?(\d+|\.\d+)(.*?)$/g;
    function o(e) {
      return (0, v.splitAtTopLevelOnly)(e, ",").map((n) => {
        let a = n.trim(), s = {
          raw: a
        }, g = a.split(u), b = /* @__PURE__ */ new Set();
        for (let r of g)
          f.lastIndex = 0, !b.has("KEYWORD") && p.has(r) ? (s.keyword = r, b.add("KEYWORD")) : f.test(r) ? b.has("X") ? b.has("Y") ? b.has("BLUR") ? b.has("SPREAD") || (s.spread = r, b.add("SPREAD")) : (s.blur = r, b.add("BLUR")) : (s.y = r, b.add("Y")) : (s.x = r, b.add("X")) : s.color ? (s.unknown || (s.unknown = []), s.unknown.push(r)) : s.color = r;
        return s.valid = s.x !== void 0 && s.y !== void 0, s;
      });
    }
    function d(e) {
      return e.map((t) => t.valid ? [
        t.keyword,
        t.x,
        t.y,
        t.blur,
        t.spread,
        t.color
      ].filter(Boolean).join(" ") : t.raw).join(", ");
    }
  })(ti)), ti;
}
var vo;
function Vr() {
  return vo || (vo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(I, W) {
      for (var Q in W) Object.defineProperty(I, Q, {
        enumerable: !0,
        get: W[Q]
      });
    }
    i(l, {
      normalize: function() {
        return e;
      },
      normalizeAttributeSelectors: function() {
        return t;
      },
      url: function() {
        return a;
      },
      number: function() {
        return s;
      },
      percentage: function() {
        return g;
      },
      length: function() {
        return c;
      },
      lineWidth: function() {
        return m;
      },
      shadow: function() {
        return y;
      },
      color: function() {
        return S;
      },
      image: function() {
        return h;
      },
      gradient: function() {
        return C;
      },
      position: function() {
        return w;
      },
      familyName: function() {
        return P;
      },
      genericName: function() {
        return D;
      },
      absoluteSize: function() {
        return k;
      },
      relativeSize: function() {
        return R;
      }
    });
    const v = Hl(), p = Jl(), u = pt();
    let f = [
      "min",
      "max",
      "clamp",
      "calc"
    ];
    function o(I) {
      return f.some((W) => new RegExp(`^${W}\\(.*\\)`).test(I));
    }
    const d = /* @__PURE__ */ new Set([
      // Concrete properties
      "scroll-timeline-name",
      "timeline-scope",
      "view-timeline-name",
      "font-palette",
      "anchor-name",
      "anchor-scope",
      "position-anchor",
      "position-try-options",
      // Shorthand properties
      "scroll-timeline",
      "animation-timeline",
      "view-timeline",
      "position-try"
    ]);
    function e(I, W = null, Q = !0) {
      let z = W && d.has(W.property);
      return I.startsWith("--") && !z ? `var(${I})` : I.includes("url(") ? I.split(/(url\(.*?\))/g).filter(Boolean).map((L) => /^url\(.*?\)$/.test(L) ? L : e(L, W, !1)).join("") : (I = I.replace(/([^\\])_+/g, (L, F) => F + " ".repeat(L.length - 1)).replace(/^_/g, " ").replace(/\\_/g, "_"), Q && (I = I.trim()), I = n(I), I);
    }
    function t(I) {
      return I.includes("=") && (I = I.replace(/(=.*)/g, (W, Q) => {
        if (Q[1] === "'" || Q[1] === '"')
          return Q;
        if (Q.length > 2) {
          let z = Q[Q.length - 1];
          if (Q[Q.length - 2] === " " && (z === "i" || z === "I" || z === "s" || z === "S"))
            return `="${Q.slice(1, -2)}" ${Q[Q.length - 1]}`;
        }
        return `="${Q.slice(1)}"`;
      })), I;
    }
    function n(I) {
      let W = [
        "theme"
      ], Q = [
        "min-content",
        "max-content",
        "fit-content",
        // Env
        "safe-area-inset-top",
        "safe-area-inset-right",
        "safe-area-inset-bottom",
        "safe-area-inset-left",
        "titlebar-area-x",
        "titlebar-area-y",
        "titlebar-area-width",
        "titlebar-area-height",
        "keyboard-inset-top",
        "keyboard-inset-right",
        "keyboard-inset-bottom",
        "keyboard-inset-left",
        "keyboard-inset-width",
        "keyboard-inset-height",
        "radial-gradient",
        "linear-gradient",
        "conic-gradient",
        "repeating-radial-gradient",
        "repeating-linear-gradient",
        "repeating-conic-gradient"
      ];
      return I.replace(/(calc|min|max|clamp)\(.+\)/g, (z) => {
        let L = "";
        function F() {
          let M = L.trimEnd();
          return M[M.length - 1];
        }
        for (let M = 0; M < z.length; M++) {
          let E = function(x) {
            return x.split("").every(($, V) => z[M + V] === $);
          }, q = function(x) {
            let $ = 1 / 0;
            for (let Y of x) {
              let U = z.indexOf(Y, M);
              U !== -1 && U < $ && ($ = U);
            }
            let V = z.slice(M, $);
            return M += V.length - 1, V;
          }, G = z[M];
          if (E("var"))
            L += q([
              ")",
              ","
            ]);
          else if (Q.some((x) => E(x))) {
            let x = Q.find(($) => E($));
            L += x, M += x.length - 1;
          } else W.some((x) => E(x)) ? L += q([
            ")"
          ]) : E("[") ? L += q([
            "]"
          ]) : [
            "+",
            "-",
            "*",
            "/"
          ].includes(G) && ![
            "(",
            "+",
            "-",
            "*",
            "/",
            ","
          ].includes(F()) ? L += ` ${G} ` : L += G;
        }
        return L.replace(/\s+/g, " ");
      });
    }
    function a(I) {
      return I.startsWith("url(");
    }
    function s(I) {
      return !isNaN(Number(I)) || o(I);
    }
    function g(I) {
      return I.endsWith("%") && s(I.slice(0, -1)) || o(I);
    }
    let r = `(?:${[
      "cm",
      "mm",
      "Q",
      "in",
      "pc",
      "pt",
      "px",
      "em",
      "ex",
      "ch",
      "rem",
      "lh",
      "rlh",
      "vw",
      "vh",
      "vmin",
      "vmax",
      "vb",
      "vi",
      "svw",
      "svh",
      "lvw",
      "lvh",
      "dvw",
      "dvh",
      "cqw",
      "cqh",
      "cqi",
      "cqb",
      "cqmin",
      "cqmax"
    ].join("|")})`;
    function c(I) {
      return I === "0" || new RegExp(`^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${r}$`).test(I) || o(I);
    }
    let _ = /* @__PURE__ */ new Set([
      "thin",
      "medium",
      "thick"
    ]);
    function m(I) {
      return _.has(I);
    }
    function y(I) {
      let W = (0, p.parseBoxShadowValue)(e(I));
      for (let Q of W)
        if (!Q.valid)
          return !1;
      return !0;
    }
    function S(I) {
      let W = 0;
      return (0, u.splitAtTopLevelOnly)(I, "_").every((z) => (z = e(z), z.startsWith("var(") ? !0 : (0, v.parseColor)(z, {
        loose: !0
      }) !== null ? (W++, !0) : !1)) ? W > 0 : !1;
    }
    function h(I) {
      let W = 0;
      return (0, u.splitAtTopLevelOnly)(I, ",").every((z) => (z = e(z), z.startsWith("var(") ? !0 : a(z) || C(z) || [
        "element(",
        "image(",
        "cross-fade(",
        "image-set("
      ].some((L) => z.startsWith(L)) ? (W++, !0) : !1)) ? W > 0 : !1;
    }
    let O = /* @__PURE__ */ new Set([
      "conic-gradient",
      "linear-gradient",
      "radial-gradient",
      "repeating-conic-gradient",
      "repeating-linear-gradient",
      "repeating-radial-gradient"
    ]);
    function C(I) {
      I = e(I);
      for (let W of O)
        if (I.startsWith(`${W}(`))
          return !0;
      return !1;
    }
    let T = /* @__PURE__ */ new Set([
      "center",
      "top",
      "right",
      "bottom",
      "left"
    ]);
    function w(I) {
      let W = 0;
      return (0, u.splitAtTopLevelOnly)(I, "_").every((z) => (z = e(z), z.startsWith("var(") ? !0 : T.has(z) || c(z) || g(z) ? (W++, !0) : !1)) ? W > 0 : !1;
    }
    function P(I) {
      let W = 0;
      return (0, u.splitAtTopLevelOnly)(I, ",").every((z) => (z = e(z), z.startsWith("var(") ? !0 : z.includes(" ") && !/(['"])([^"']+)\1/g.test(z) || /^\d/g.test(z) ? !1 : (W++, !0))) ? W > 0 : !1;
    }
    let N = /* @__PURE__ */ new Set([
      "serif",
      "sans-serif",
      "monospace",
      "cursive",
      "fantasy",
      "system-ui",
      "ui-serif",
      "ui-sans-serif",
      "ui-monospace",
      "ui-rounded",
      "math",
      "emoji",
      "fangsong"
    ]);
    function D(I) {
      return N.has(I);
    }
    let B = /* @__PURE__ */ new Set([
      "xx-small",
      "x-small",
      "small",
      "medium",
      "large",
      "x-large",
      "xx-large",
      "xxx-large"
    ]);
    function k(I) {
      return B.has(I);
    }
    let A = /* @__PURE__ */ new Set([
      "larger",
      "smaller"
    ]);
    function R(I) {
      return A.has(I);
    }
  })(ei)), ei;
}
var ni = {}, go;
function xa() {
  return go || (go = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v) {
      if (v = `${v}`, v === "0")
        return "0";
      if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(v))
        return v.replace(/^[+-]?/, (u) => u === "-" ? "" : "-");
      let p = [
        "var",
        "calc",
        "min",
        "max",
        "clamp"
      ];
      for (const u of p)
        if (v.includes(`${u}(`))
          return `calc(${v} * -1)`;
    }
  })(ni)), ni;
}
var ii = {}, mo;
function Ic() {
  return mo || (mo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "backgroundSize", {
      enumerable: !0,
      get: function() {
        return p;
      }
    });
    const i = Vr(), v = pt();
    function p(u) {
      let f = [
        "cover",
        "contain"
      ];
      return (0, v.splitAtTopLevelOnly)(u, ",").every((o) => {
        let d = (0, v.splitAtTopLevelOnly)(o, "_").filter(Boolean);
        return d.length === 1 && f.includes(d[0]) ? !0 : d.length !== 1 && d.length !== 2 ? !1 : d.every((e) => (0, i.length)(e) || (0, i.percentage)(e) || e === "auto");
      });
    }
  })(ii)), ii;
}
var ai = {}, si = {}, yo;
function ot() {
  return yo || (yo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(e, t) {
      for (var n in t) Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
      });
    }
    i(l, {
      dim: function() {
        return o;
      },
      default: function() {
        return d;
      }
    });
    const v = /* @__PURE__ */ p(/* @__PURE__ */ oa());
    function p(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    let u = /* @__PURE__ */ new Set();
    function f(e, t, n) {
      typeof process < "u" && process.env.JEST_WORKER_ID || n && u.has(n) || (n && u.add(n), console.warn(""), t.forEach((a) => console.warn(e, "-", a)));
    }
    function o(e) {
      return v.default.dim(e);
    }
    const d = {
      info(e, t) {
        f(v.default.bold(v.default.cyan("info")), ...Array.isArray(e) ? [
          e
        ] : [
          t,
          e
        ]);
      },
      warn(e, t) {
        f(v.default.bold(v.default.yellow("warn")), ...Array.isArray(e) ? [
          e
        ] : [
          t,
          e
        ]);
      },
      risk(e, t) {
        f(v.default.bold(v.default.magenta("risk")), ...Array.isArray(e) ? [
          e
        ] : [
          t,
          e
        ]);
      }
    };
  })(si)), si;
}
var wo;
function dt() {
  return wo || (wo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(a, s) {
      for (var g in s) Object.defineProperty(a, g, {
        enumerable: !0,
        get: s[g]
      });
    }
    i(l, {
      flagEnabled: function() {
        return d;
      },
      issueFlagNotices: function() {
        return t;
      },
      default: function() {
        return n;
      }
    });
    const v = /* @__PURE__ */ u(/* @__PURE__ */ oa()), p = /* @__PURE__ */ u(ot());
    function u(a) {
      return a && a.__esModule ? a : {
        default: a
      };
    }
    let f = {
      optimizeUniversalDefaults: !1,
      generalizedModifiers: !0,
      disableColorOpacityUtilitiesByDefault: !1,
      relativeContentPathsByDefault: !1
    }, o = {
      future: [
        "hoverOnlyWhenSupported",
        "respectDefaultRingColorOpacity",
        "disableColorOpacityUtilitiesByDefault",
        "relativeContentPathsByDefault"
      ],
      experimental: [
        "optimizeUniversalDefaults",
        "generalizedModifiers"
      ]
    };
    function d(a, s) {
      if (o.future.includes(s)) {
        var g, b, r;
        return a.future === "all" || ((r = (b = a == null || (g = a.future) === null || g === void 0 ? void 0 : g[s]) !== null && b !== void 0 ? b : f[s]) !== null && r !== void 0 ? r : !1);
      }
      if (o.experimental.includes(s)) {
        var c, _, m;
        return a.experimental === "all" || ((m = (_ = a == null || (c = a.experimental) === null || c === void 0 ? void 0 : c[s]) !== null && _ !== void 0 ? _ : f[s]) !== null && m !== void 0 ? m : !1);
      }
      return !1;
    }
    function e(a) {
      if (a.experimental === "all")
        return o.experimental;
      var s;
      return Object.keys((s = a == null ? void 0 : a.experimental) !== null && s !== void 0 ? s : {}).filter((g) => o.experimental.includes(g) && a.experimental[g]);
    }
    function t(a) {
      if (process.env.JEST_WORKER_ID === void 0 && e(a).length > 0) {
        let s = e(a).map((g) => v.default.yellow(g)).join(", ");
        p.default.warn("experimental-flags-enabled", [
          `You have enabled experimental features: ${s}`,
          "Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."
        ]);
      }
    }
    const n = o;
  })(ai)), ai;
}
var bo;
function jr() {
  return bo || (bo = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(w, P) {
      for (var N in P) Object.defineProperty(w, N, {
        enumerable: !0,
        get: P[N]
      });
    }
    i(l, {
      updateAllClasses: function() {
        return t;
      },
      asValue: function() {
        return s;
      },
      parseColorFormat: function() {
        return r;
      },
      asColor: function() {
        return _;
      },
      asLookupValue: function() {
        return m;
      },
      typeMap: function() {
        return S;
      },
      coerceValue: function() {
        return C;
      },
      getMatchingTypes: function() {
        return T;
      }
    });
    const v = /* @__PURE__ */ e(Oa()), p = Br(), u = Vr(), f = /* @__PURE__ */ e(xa()), o = Ic(), d = dt();
    function e(w) {
      return w && w.__esModule ? w : {
        default: w
      };
    }
    function t(w, P) {
      w.walkClasses((N) => {
        N.value = P(N.value), N.raws && N.raws.value && (N.raws.value = (0, v.default)(N.raws.value));
      });
    }
    function n(w, P) {
      if (!g(w))
        return;
      let N = w.slice(1, -1);
      if (P(N))
        return (0, u.normalize)(N);
    }
    function a(w, P = {}, N) {
      let D = P[w];
      if (D !== void 0)
        return (0, f.default)(D);
      if (g(w)) {
        let B = n(w, N);
        return B === void 0 ? void 0 : (0, f.default)(B);
      }
    }
    function s(w, P = {}, { validate: N = () => !0 } = {}) {
      var D;
      let B = (D = P.values) === null || D === void 0 ? void 0 : D[w];
      return B !== void 0 ? B : P.supportsNegativeValues && w.startsWith("-") ? a(w.slice(1), P.values, N) : n(w, N);
    }
    function g(w) {
      return w.startsWith("[") && w.endsWith("]");
    }
    function b(w) {
      let P = w.lastIndexOf("/"), N = w.lastIndexOf("[", P), D = w.indexOf("]", P);
      return w[P - 1] === "]" || w[P + 1] === "[" || N !== -1 && D !== -1 && N < P && P < D && (P = w.lastIndexOf("/", N)), P === -1 || P === w.length - 1 ? [
        w,
        void 0
      ] : g(w) && !w.includes("]/[") ? [
        w,
        void 0
      ] : [
        w.slice(0, P),
        w.slice(P + 1)
      ];
    }
    function r(w) {
      if (typeof w == "string" && w.includes("<alpha-value>")) {
        let P = w;
        return ({ opacityValue: N = 1 }) => P.replace(/<alpha-value>/g, N);
      }
      return w;
    }
    function c(w) {
      return (0, u.normalize)(w.slice(1, -1));
    }
    function _(w, P = {}, { tailwindConfig: N = {} } = {}) {
      var D;
      if (((D = P.values) === null || D === void 0 ? void 0 : D[w]) !== void 0) {
        var B;
        return r((B = P.values) === null || B === void 0 ? void 0 : B[w]);
      }
      let [k, A] = b(w);
      if (A !== void 0) {
        var R, I, W, Q;
        let z = (Q = (R = P.values) === null || R === void 0 ? void 0 : R[k]) !== null && Q !== void 0 ? Q : g(k) ? k.slice(1, -1) : void 0;
        return z === void 0 ? void 0 : (z = r(z), g(A) ? (0, p.withAlphaValue)(z, c(A)) : ((I = N.theme) === null || I === void 0 || (W = I.opacity) === null || W === void 0 ? void 0 : W[A]) === void 0 ? void 0 : (0, p.withAlphaValue)(z, N.theme.opacity[A]));
      }
      return s(w, P, {
        validate: u.color
      });
    }
    function m(w, P = {}) {
      var N;
      return (N = P.values) === null || N === void 0 ? void 0 : N[w];
    }
    function y(w) {
      return (P, N) => s(P, N, {
        validate: w
      });
    }
    let S = {
      any: s,
      color: _,
      url: y(u.url),
      image: y(u.image),
      length: y(u.length),
      percentage: y(u.percentage),
      position: y(u.position),
      lookup: m,
      "generic-name": y(u.genericName),
      "family-name": y(u.familyName),
      number: y(u.number),
      "line-width": y(u.lineWidth),
      "absolute-size": y(u.absoluteSize),
      "relative-size": y(u.relativeSize),
      shadow: y(u.shadow),
      size: y(o.backgroundSize)
    }, h = Object.keys(S);
    function O(w, P) {
      let N = w.indexOf(P);
      return N === -1 ? [
        void 0,
        w
      ] : [
        w.slice(0, N),
        w.slice(N + 1)
      ];
    }
    function C(w, P, N, D) {
      if (N.values && P in N.values)
        for (let { type: k } of w ?? []) {
          let A = S[k](P, N, {
            tailwindConfig: D
          });
          if (A !== void 0)
            return [
              A,
              k,
              null
            ];
        }
      if (g(P)) {
        let k = P.slice(1, -1), [A, R] = O(k, ":");
        if (!/^[\w-_]+$/g.test(A))
          R = k;
        else if (A !== void 0 && !h.includes(A))
          return [];
        if (R.length > 0 && h.includes(A))
          return [
            s(`[${R}]`, N),
            A,
            null
          ];
      }
      let B = T(w, P, N, D);
      for (let k of B)
        return k;
      return [];
    }
    function* T(w, P, N, D) {
      let B = (0, d.flagEnabled)(D, "generalizedModifiers"), [k, A] = b(P);
      if (B && N.modifiers != null && (N.modifiers === "any" || typeof N.modifiers == "object" && (A && g(A) || A in N.modifiers)) || (k = P, A = void 0), A !== void 0 && k === "" && (k = "DEFAULT"), A !== void 0 && typeof N.modifiers == "object") {
        var I, W;
        let Q = (W = (I = N.modifiers) === null || I === void 0 ? void 0 : I[A]) !== null && W !== void 0 ? W : null;
        Q !== null ? A = Q : g(A) && (A = c(A));
      }
      for (let { type: Q } of w ?? []) {
        let z = S[Q](k, N, {
          tailwindConfig: D
        });
        z !== void 0 && (yield [
          z,
          Q,
          A ?? null
        ]);
      }
    }
  })(Xn)), Xn;
}
var _o;
function Mc() {
  return _o || (_o = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return T;
      }
    });
    const i = /* @__PURE__ */ a(Ql()), v = /* @__PURE__ */ a(Pc()), p = /* @__PURE__ */ a(zr()), u = /* @__PURE__ */ a(Cc()), f = ba(), o = /* @__PURE__ */ a(_a()), d = Sa(), e = Br(), t = jr(), n = /* @__PURE__ */ a(ot());
    function a(w) {
      return w && w.__esModule ? w : {
        default: w
      };
    }
    function s(w) {
      return typeof w == "object" && w !== null;
    }
    function g(w, P) {
      let N = (0, d.toPath)(P);
      do
        if (N.pop(), (0, i.default)(w, N) !== void 0) break;
      while (N.length);
      return N.length ? N : void 0;
    }
    function b(w) {
      return typeof w == "string" ? w : w.reduce((P, N, D) => N.includes(".") ? `${P}[${N}]` : D === 0 ? N : `${P}.${N}`, "");
    }
    function r(w) {
      return w.map((P) => `'${P}'`).join(", ");
    }
    function c(w) {
      return r(Object.keys(w));
    }
    function _(w, P, N, D = {}) {
      const B = Array.isArray(P) ? b(P) : P.replace(/^['"]+|['"]+$/g, ""), k = Array.isArray(P) ? P : (0, d.toPath)(B), A = (0, i.default)(w.theme, k, N);
      if (A === void 0) {
        let I = `'${B}' does not exist in your theme config.`;
        const W = k.slice(0, -1), Q = (0, i.default)(w.theme, W);
        if (s(Q)) {
          const z = Object.keys(Q).filter((F) => _(w, [
            ...W,
            F
          ]).isValid), L = (0, v.default)(k[k.length - 1], z);
          L ? I += ` Did you mean '${b([
            ...W,
            L
          ])}'?` : z.length > 0 && (I += ` '${b(W)}' has the following valid keys: ${r(z)}`);
        } else {
          const z = g(w.theme, B);
          if (z) {
            const L = (0, i.default)(w.theme, z);
            s(L) ? I += ` '${b(z)}' has the following keys: ${c(L)}` : I += ` '${b(z)}' is not an object.`;
          } else
            I += ` Your theme has the following top-level keys: ${c(w.theme)}`;
        }
        return {
          isValid: !1,
          error: I
        };
      }
      if (!(typeof A == "string" || typeof A == "number" || typeof A == "function" || A instanceof String || A instanceof Number || Array.isArray(A))) {
        let I = `'${B}' was found but does not resolve to a string.`;
        if (s(A)) {
          let W = Object.keys(A).filter((Q) => _(w, [
            ...k,
            Q
          ]).isValid);
          W.length && (I += ` Did you mean something like '${b([
            ...k,
            W[0]
          ])}'?`);
        }
        return {
          isValid: !1,
          error: I
        };
      }
      const [R] = k;
      return {
        isValid: !0,
        value: (0, p.default)(R)(A, D)
      };
    }
    function m(w, P, N) {
      P = P.map((B) => y(w, B, N));
      let D = [
        ""
      ];
      for (let B of P)
        B.type === "div" && B.value === "," ? D.push("") : D[D.length - 1] += u.default.stringify(B);
      return D;
    }
    function y(w, P, N) {
      if (P.type === "function" && N[P.value] !== void 0) {
        let D = m(w, P.nodes, N);
        P.type = "word", P.value = N[P.value](w, ...D);
      }
      return P;
    }
    function S(w, P, N) {
      return Object.keys(N).some((B) => P.includes(`${B}(`)) ? (0, u.default)(P).walk((B) => {
        y(w, B, N);
      }).toString() : P;
    }
    let h = {
      atrule: "params",
      decl: "value"
    };
    function* O(w) {
      w = w.replace(/^['"]+|['"]+$/g, "");
      let P = w.match(/^([^\s]+)(?![^\[]*\])(?:\s*\/\s*([^\/\s]+))$/), N;
      yield [
        w,
        void 0
      ], P && (w = P[1], N = P[2], yield [
        w,
        N
      ]);
    }
    function C(w, P, N) {
      const D = Array.from(O(P)).map(([k, A]) => Object.assign(_(w, k, N, {
        opacityValue: A
      }), {
        resolvedPath: k,
        alpha: A
      }));
      var B;
      return (B = D.find((k) => k.isValid)) !== null && B !== void 0 ? B : D[0];
    }
    function T(w) {
      let P = w.tailwindConfig, N = {
        theme: (D, B, ...k) => {
          let { isValid: A, value: R, error: I, alpha: W } = C(P, B, k.length ? k : void 0);
          if (!A) {
            var Q;
            let F = D.parent, M = (Q = F == null ? void 0 : F.raws.tailwind) === null || Q === void 0 ? void 0 : Q.candidate;
            if (F && M !== void 0) {
              w.markInvalidUtilityNode(F), F.remove(), n.default.warn("invalid-theme-key-in-class", [
                `The utility \`${M}\` contains an invalid theme value and was not generated.`
              ]);
              return;
            }
            throw D.error(I);
          }
          let z = (0, t.parseColorFormat)(R);
          return (W !== void 0 || z !== void 0 && typeof z == "function") && (W === void 0 && (W = 1), R = (0, e.withAlphaValue)(z, W, z)), R;
        },
        screen: (D, B) => {
          B = B.replace(/^['"]+/g, "").replace(/['"]+$/g, "");
          let A = (0, f.normalizeScreens)(P.theme.screens).find(({ name: R }) => R === B);
          if (!A)
            throw D.error(`The '${B}' screen does not exist in your theme.`);
          return (0, o.default)(A);
        }
      };
      return (D) => {
        D.walk((B) => {
          let k = h[B.type];
          k !== void 0 && (B[k] = S(B, B[k], N));
        });
      };
    }
  })(Ln)), Ln;
}
var Dc = Mc();
const qc = /* @__PURE__ */ tt(Dc);
var oi = {}, Vt = { exports: {} }, jt = { exports: {} }, Gt = { exports: {} }, Yt = { exports: {} }, Qt = { exports: {} }, Ht = { exports: {} }, Ze = {}, Jt = { exports: {} }, So;
function Pa() {
  return So || (So = 1, (function(l, i) {
    i.__esModule = !0, i.default = u;
    function v(f) {
      for (var o = f.toLowerCase(), d = "", e = !1, t = 0; t < 6 && o[t] !== void 0; t++) {
        var n = o.charCodeAt(t), a = n >= 97 && n <= 102 || n >= 48 && n <= 57;
        if (e = n === 32, !a)
          break;
        d += o[t];
      }
      if (d.length !== 0) {
        var s = parseInt(d, 16), g = s >= 55296 && s <= 57343;
        return g || s === 0 || s > 1114111 ? ["�", d.length + (e ? 1 : 0)] : [String.fromCodePoint(s), d.length + (e ? 1 : 0)];
      }
    }
    var p = /\\/;
    function u(f) {
      var o = p.test(f);
      if (!o)
        return f;
      for (var d = "", e = 0; e < f.length; e++) {
        if (f[e] === "\\") {
          var t = v(f.slice(e + 1, e + 7));
          if (t !== void 0) {
            d += t[0], e += t[1];
            continue;
          }
          if (f[e + 1] === "\\") {
            d += "\\", e++;
            continue;
          }
          f.length === e + 1 && (d += f[e]);
          continue;
        }
        d += f[e];
      }
      return d;
    }
    l.exports = i.default;
  })(Jt, Jt.exports)), Jt.exports;
}
var Kt = { exports: {} }, Oo;
function Lc() {
  return Oo || (Oo = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = arguments.length, f = new Array(u > 1 ? u - 1 : 0), o = 1; o < u; o++)
        f[o - 1] = arguments[o];
      for (; f.length > 0; ) {
        var d = f.shift();
        if (!p[d])
          return;
        p = p[d];
      }
      return p;
    }
    l.exports = i.default;
  })(Kt, Kt.exports)), Kt.exports;
}
var Xt = { exports: {} }, xo;
function Nc() {
  return xo || (xo = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = arguments.length, f = new Array(u > 1 ? u - 1 : 0), o = 1; o < u; o++)
        f[o - 1] = arguments[o];
      for (; f.length > 0; ) {
        var d = f.shift();
        p[d] || (p[d] = {}), p = p[d];
      }
    }
    l.exports = i.default;
  })(Xt, Xt.exports)), Xt.exports;
}
var Zt = { exports: {} }, Po;
function Fc() {
  return Po || (Po = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = "", f = p.indexOf("/*"), o = 0; f >= 0; ) {
        u = u + p.slice(o, f);
        var d = p.indexOf("*/", f + 2);
        if (d < 0)
          return u;
        o = d + 2, f = p.indexOf("/*", o);
      }
      return u = u + p.slice(o), u;
    }
    l.exports = i.default;
  })(Zt, Zt.exports)), Zt.exports;
}
var To;
function Gr() {
  if (To) return Ze;
  To = 1, Ze.__esModule = !0, Ze.unesc = Ze.stripComments = Ze.getProp = Ze.ensureObject = void 0;
  var l = u(Pa());
  Ze.unesc = l.default;
  var i = u(Lc());
  Ze.getProp = i.default;
  var v = u(Nc());
  Ze.ensureObject = v.default;
  var p = u(Fc());
  Ze.stripComments = p.default;
  function u(f) {
    return f && f.__esModule ? f : { default: f };
  }
  return Ze;
}
var ko;
function ut() {
  return ko || (ko = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = Gr();
    function p(d, e) {
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(d, n.key, n);
      }
    }
    function u(d, e, t) {
      return e && p(d.prototype, e), Object.defineProperty(d, "prototype", { writable: !1 }), d;
    }
    var f = function d(e, t) {
      if (typeof e != "object" || e === null)
        return e;
      var n = new e.constructor();
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var s = e[a], g = typeof s;
          a === "parent" && g === "object" ? t && (n[a] = t) : s instanceof Array ? n[a] = s.map(function(b) {
            return d(b, n);
          }) : n[a] = d(s, n);
        }
      return n;
    }, o = /* @__PURE__ */ (function() {
      function d(t) {
        t === void 0 && (t = {}), Object.assign(this, t), this.spaces = this.spaces || {}, this.spaces.before = this.spaces.before || "", this.spaces.after = this.spaces.after || "";
      }
      var e = d.prototype;
      return e.remove = function() {
        return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
      }, e.replaceWith = function() {
        if (this.parent) {
          for (var n in arguments)
            this.parent.insertBefore(this, arguments[n]);
          this.remove();
        }
        return this;
      }, e.next = function() {
        return this.parent.at(this.parent.index(this) + 1);
      }, e.prev = function() {
        return this.parent.at(this.parent.index(this) - 1);
      }, e.clone = function(n) {
        n === void 0 && (n = {});
        var a = f(this);
        for (var s in n)
          a[s] = n[s];
        return a;
      }, e.appendToPropertyAndEscape = function(n, a, s) {
        this.raws || (this.raws = {});
        var g = this[n], b = this.raws[n];
        this[n] = g + a, b || s !== a ? this.raws[n] = (b || g) + s : delete this.raws[n];
      }, e.setPropertyAndEscape = function(n, a, s) {
        this.raws || (this.raws = {}), this[n] = a, this.raws[n] = s;
      }, e.setPropertyWithoutEscape = function(n, a) {
        this[n] = a, this.raws && delete this.raws[n];
      }, e.isAtPosition = function(n, a) {
        if (this.source && this.source.start && this.source.end)
          return !(this.source.start.line > n || this.source.end.line < n || this.source.start.line === n && this.source.start.column > a || this.source.end.line === n && this.source.end.column < a);
      }, e.stringifyProperty = function(n) {
        return this.raws && this.raws[n] || this[n];
      }, e.valueToString = function() {
        return String(this.stringifyProperty("value"));
      }, e.toString = function() {
        return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
      }, u(d, [{
        key: "rawSpaceBefore",
        get: function() {
          var n = this.raws && this.raws.spaces && this.raws.spaces.before;
          return n === void 0 && (n = this.spaces && this.spaces.before), n || "";
        },
        set: function(n) {
          (0, v.ensureObject)(this, "raws", "spaces"), this.raws.spaces.before = n;
        }
      }, {
        key: "rawSpaceAfter",
        get: function() {
          var n = this.raws && this.raws.spaces && this.raws.spaces.after;
          return n === void 0 && (n = this.spaces.after), n || "";
        },
        set: function(n) {
          (0, v.ensureObject)(this, "raws", "spaces"), this.raws.spaces.after = n;
        }
      }]), d;
    })();
    i.default = o, l.exports = i.default;
  })(Ht, Ht.exports)), Ht.exports;
}
var qe = {}, Eo;
function Be() {
  if (Eo) return qe;
  Eo = 1, qe.__esModule = !0, qe.UNIVERSAL = qe.TAG = qe.STRING = qe.SELECTOR = qe.ROOT = qe.PSEUDO = qe.NESTING = qe.ID = qe.COMMENT = qe.COMBINATOR = qe.CLASS = qe.ATTRIBUTE = void 0;
  var l = "tag";
  qe.TAG = l;
  var i = "string";
  qe.STRING = i;
  var v = "selector";
  qe.SELECTOR = v;
  var p = "root";
  qe.ROOT = p;
  var u = "pseudo";
  qe.PSEUDO = u;
  var f = "nesting";
  qe.NESTING = f;
  var o = "id";
  qe.ID = o;
  var d = "comment";
  qe.COMMENT = d;
  var e = "combinator";
  qe.COMBINATOR = e;
  var t = "class";
  qe.CLASS = t;
  var n = "attribute";
  qe.ATTRIBUTE = n;
  var a = "universal";
  return qe.UNIVERSAL = a, qe;
}
var Ao;
function Ta() {
  return Ao || (Ao = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(ut()), p = f(Be());
    function u(r) {
      if (typeof WeakMap != "function") return null;
      var c = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap();
      return (u = function(y) {
        return y ? _ : c;
      })(r);
    }
    function f(r, c) {
      if (r && r.__esModule)
        return r;
      if (r === null || typeof r != "object" && typeof r != "function")
        return { default: r };
      var _ = u(c);
      if (_ && _.has(r))
        return _.get(r);
      var m = {}, y = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var S in r)
        if (S !== "default" && Object.prototype.hasOwnProperty.call(r, S)) {
          var h = y ? Object.getOwnPropertyDescriptor(r, S) : null;
          h && (h.get || h.set) ? Object.defineProperty(m, S, h) : m[S] = r[S];
        }
      return m.default = r, _ && _.set(r, m), m;
    }
    function o(r) {
      return r && r.__esModule ? r : { default: r };
    }
    function d(r, c) {
      var _ = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (_) return (_ = _.call(r)).next.bind(_);
      if (Array.isArray(r) || (_ = e(r)) || c) {
        _ && (r = _);
        var m = 0;
        return function() {
          return m >= r.length ? { done: !0 } : { done: !1, value: r[m++] };
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function e(r, c) {
      if (r) {
        if (typeof r == "string") return t(r, c);
        var _ = Object.prototype.toString.call(r).slice(8, -1);
        if (_ === "Object" && r.constructor && (_ = r.constructor.name), _ === "Map" || _ === "Set") return Array.from(r);
        if (_ === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_)) return t(r, c);
      }
    }
    function t(r, c) {
      (c == null || c > r.length) && (c = r.length);
      for (var _ = 0, m = new Array(c); _ < c; _++)
        m[_] = r[_];
      return m;
    }
    function n(r, c) {
      for (var _ = 0; _ < c.length; _++) {
        var m = c[_];
        m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(r, m.key, m);
      }
    }
    function a(r, c, _) {
      return c && n(r.prototype, c), Object.defineProperty(r, "prototype", { writable: !1 }), r;
    }
    function s(r, c) {
      r.prototype = Object.create(c.prototype), r.prototype.constructor = r, g(r, c);
    }
    function g(r, c) {
      return g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(m, y) {
        return m.__proto__ = y, m;
      }, g(r, c);
    }
    var b = /* @__PURE__ */ (function(r) {
      s(c, r);
      function c(m) {
        var y;
        return y = r.call(this, m) || this, y.nodes || (y.nodes = []), y;
      }
      var _ = c.prototype;
      return _.append = function(y) {
        return y.parent = this, this.nodes.push(y), this;
      }, _.prepend = function(y) {
        return y.parent = this, this.nodes.unshift(y), this;
      }, _.at = function(y) {
        return this.nodes[y];
      }, _.index = function(y) {
        return typeof y == "number" ? y : this.nodes.indexOf(y);
      }, _.removeChild = function(y) {
        y = this.index(y), this.at(y).parent = void 0, this.nodes.splice(y, 1);
        var S;
        for (var h in this.indexes)
          S = this.indexes[h], S >= y && (this.indexes[h] = S - 1);
        return this;
      }, _.removeAll = function() {
        for (var y = d(this.nodes), S; !(S = y()).done; ) {
          var h = S.value;
          h.parent = void 0;
        }
        return this.nodes = [], this;
      }, _.empty = function() {
        return this.removeAll();
      }, _.insertAfter = function(y, S) {
        S.parent = this;
        var h = this.index(y);
        this.nodes.splice(h + 1, 0, S), S.parent = this;
        var O;
        for (var C in this.indexes)
          O = this.indexes[C], h <= O && (this.indexes[C] = O + 1);
        return this;
      }, _.insertBefore = function(y, S) {
        S.parent = this;
        var h = this.index(y);
        this.nodes.splice(h, 0, S), S.parent = this;
        var O;
        for (var C in this.indexes)
          O = this.indexes[C], O <= h && (this.indexes[C] = O + 1);
        return this;
      }, _._findChildAtPosition = function(y, S) {
        var h = void 0;
        return this.each(function(O) {
          if (O.atPosition) {
            var C = O.atPosition(y, S);
            if (C)
              return h = C, !1;
          } else if (O.isAtPosition(y, S))
            return h = O, !1;
        }), h;
      }, _.atPosition = function(y, S) {
        if (this.isAtPosition(y, S))
          return this._findChildAtPosition(y, S) || this;
      }, _._inferEndPosition = function() {
        this.last && this.last.source && this.last.source.end && (this.source = this.source || {}, this.source.end = this.source.end || {}, Object.assign(this.source.end, this.last.source.end));
      }, _.each = function(y) {
        this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach++;
        var S = this.lastEach;
        if (this.indexes[S] = 0, !!this.length) {
          for (var h, O; this.indexes[S] < this.length && (h = this.indexes[S], O = y(this.at(h), h), O !== !1); )
            this.indexes[S] += 1;
          if (delete this.indexes[S], O === !1)
            return !1;
        }
      }, _.walk = function(y) {
        return this.each(function(S, h) {
          var O = y(S, h);
          if (O !== !1 && S.length && (O = S.walk(y)), O === !1)
            return !1;
        });
      }, _.walkAttributes = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.ATTRIBUTE)
            return y.call(S, h);
        });
      }, _.walkClasses = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.CLASS)
            return y.call(S, h);
        });
      }, _.walkCombinators = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.COMBINATOR)
            return y.call(S, h);
        });
      }, _.walkComments = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.COMMENT)
            return y.call(S, h);
        });
      }, _.walkIds = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.ID)
            return y.call(S, h);
        });
      }, _.walkNesting = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.NESTING)
            return y.call(S, h);
        });
      }, _.walkPseudos = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.PSEUDO)
            return y.call(S, h);
        });
      }, _.walkTags = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.TAG)
            return y.call(S, h);
        });
      }, _.walkUniversals = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.UNIVERSAL)
            return y.call(S, h);
        });
      }, _.split = function(y) {
        var S = this, h = [];
        return this.reduce(function(O, C, T) {
          var w = y.call(S, C);
          return h.push(C), w ? (O.push(h), h = []) : T === S.length - 1 && O.push(h), O;
        }, []);
      }, _.map = function(y) {
        return this.nodes.map(y);
      }, _.reduce = function(y, S) {
        return this.nodes.reduce(y, S);
      }, _.every = function(y) {
        return this.nodes.every(y);
      }, _.some = function(y) {
        return this.nodes.some(y);
      }, _.filter = function(y) {
        return this.nodes.filter(y);
      }, _.sort = function(y) {
        return this.nodes.sort(y);
      }, _.toString = function() {
        return this.map(String).join("");
      }, a(c, [{
        key: "first",
        get: function() {
          return this.at(0);
        }
      }, {
        key: "last",
        get: function() {
          return this.at(this.length - 1);
        }
      }, {
        key: "length",
        get: function() {
          return this.nodes.length;
        }
      }]), c;
    })(v.default);
    i.default = b, l.exports = i.default;
  })(Qt, Qt.exports)), Qt.exports;
}
var Co;
function Kl() {
  return Co || (Co = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(Ta()), p = Be();
    function u(n) {
      return n && n.__esModule ? n : { default: n };
    }
    function f(n, a) {
      for (var s = 0; s < a.length; s++) {
        var g = a[s];
        g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(n, g.key, g);
      }
    }
    function o(n, a, s) {
      return a && f(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
    }
    function d(n, a) {
      n.prototype = Object.create(a.prototype), n.prototype.constructor = n, e(n, a);
    }
    function e(n, a) {
      return e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(g, b) {
        return g.__proto__ = b, g;
      }, e(n, a);
    }
    var t = /* @__PURE__ */ (function(n) {
      d(a, n);
      function a(g) {
        var b;
        return b = n.call(this, g) || this, b.type = p.ROOT, b;
      }
      var s = a.prototype;
      return s.toString = function() {
        var b = this.reduce(function(r, c) {
          return r.push(String(c)), r;
        }, []).join(",");
        return this.trailingComma ? b + "," : b;
      }, s.error = function(b, r) {
        return this._error ? this._error(b, r) : new Error(b);
      }, o(a, [{
        key: "errorGenerator",
        set: function(b) {
          this._error = b;
        }
      }]), a;
    })(v.default);
    i.default = t, l.exports = i.default;
  })(Yt, Yt.exports)), Yt.exports;
}
var er = { exports: {} }, Ro;
function Xl() {
  return Ro || (Ro = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(Ta()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.SELECTOR, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(er, er.exports)), er.exports;
}
var tr = { exports: {} }, Io;
function Zl() {
  return Io || (Io = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(nt()), p = Gr(), u = o(ut()), f = Be();
    function o(s) {
      return s && s.__esModule ? s : { default: s };
    }
    function d(s, g) {
      for (var b = 0; b < g.length; b++) {
        var r = g[b];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(s, r.key, r);
      }
    }
    function e(s, g, b) {
      return g && d(s.prototype, g), Object.defineProperty(s, "prototype", { writable: !1 }), s;
    }
    function t(s, g) {
      s.prototype = Object.create(g.prototype), s.prototype.constructor = s, n(s, g);
    }
    function n(s, g) {
      return n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, c) {
        return r.__proto__ = c, r;
      }, n(s, g);
    }
    var a = /* @__PURE__ */ (function(s) {
      t(g, s);
      function g(r) {
        var c;
        return c = s.call(this, r) || this, c.type = f.CLASS, c._constructed = !0, c;
      }
      var b = g.prototype;
      return b.valueToString = function() {
        return "." + s.prototype.valueToString.call(this);
      }, e(g, [{
        key: "value",
        get: function() {
          return this._value;
        },
        set: function(c) {
          if (this._constructed) {
            var _ = (0, v.default)(c, {
              isIdentifier: !0
            });
            _ !== c ? ((0, p.ensureObject)(this, "raws"), this.raws.value = _) : this.raws && delete this.raws.value;
          }
          this._value = c;
        }
      }]), g;
    })(u.default);
    i.default = a, l.exports = i.default;
  })(tr, tr.exports)), tr.exports;
}
var rr = { exports: {} }, Mo;
function ef() {
  return Mo || (Mo = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ut()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.COMMENT, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(rr, rr.exports)), rr.exports;
}
var nr = { exports: {} }, Do;
function tf() {
  return Do || (Do = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ut()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(a) {
        var s;
        return s = e.call(this, a) || this, s.type = p.ID, s;
      }
      var n = t.prototype;
      return n.valueToString = function() {
        return "#" + e.prototype.valueToString.call(this);
      }, t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(nr, nr.exports)), nr.exports;
}
var ir = { exports: {} }, ar = { exports: {} }, qo;
function ka() {
  return qo || (qo = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = f(nt()), p = Gr(), u = f(ut());
    function f(a) {
      return a && a.__esModule ? a : { default: a };
    }
    function o(a, s) {
      for (var g = 0; g < s.length; g++) {
        var b = s[g];
        b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(a, b.key, b);
      }
    }
    function d(a, s, g) {
      return s && o(a.prototype, s), Object.defineProperty(a, "prototype", { writable: !1 }), a;
    }
    function e(a, s) {
      a.prototype = Object.create(s.prototype), a.prototype.constructor = a, t(a, s);
    }
    function t(a, s) {
      return t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(b, r) {
        return b.__proto__ = r, b;
      }, t(a, s);
    }
    var n = /* @__PURE__ */ (function(a) {
      e(s, a);
      function s() {
        return a.apply(this, arguments) || this;
      }
      var g = s.prototype;
      return g.qualifiedName = function(r) {
        return this.namespace ? this.namespaceString + "|" + r : r;
      }, g.valueToString = function() {
        return this.qualifiedName(a.prototype.valueToString.call(this));
      }, d(s, [{
        key: "namespace",
        get: function() {
          return this._namespace;
        },
        set: function(r) {
          if (r === !0 || r === "*" || r === "&") {
            this._namespace = r, this.raws && delete this.raws.namespace;
            return;
          }
          var c = (0, v.default)(r, {
            isIdentifier: !0
          });
          this._namespace = r, c !== r ? ((0, p.ensureObject)(this, "raws"), this.raws.namespace = c) : this.raws && delete this.raws.namespace;
        }
      }, {
        key: "ns",
        get: function() {
          return this._namespace;
        },
        set: function(r) {
          this.namespace = r;
        }
      }, {
        key: "namespaceString",
        get: function() {
          if (this.namespace) {
            var r = this.stringifyProperty("namespace");
            return r === !0 ? "" : r;
          } else
            return "";
        }
      }]), s;
    })(u.default);
    i.default = n, l.exports = i.default;
  })(ar, ar.exports)), ar.exports;
}
var Lo;
function rf() {
  return Lo || (Lo = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ka()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.TAG, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(ir, ir.exports)), ir.exports;
}
var sr = { exports: {} }, No;
function nf() {
  return No || (No = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ut()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.STRING, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(sr, sr.exports)), sr.exports;
}
var or = { exports: {} }, Fo;
function af() {
  return Fo || (Fo = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(Ta()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(a) {
        var s;
        return s = e.call(this, a) || this, s.type = p.PSEUDO, s;
      }
      var n = t.prototype;
      return n.toString = function() {
        var s = this.length ? "(" + this.map(String).join(",") + ")" : "";
        return [this.rawSpaceBefore, this.stringifyProperty("value"), s, this.rawSpaceAfter].join("");
      }, t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(or, or.exports)), or.exports;
}
var ui = {}, $o;
function sf() {
  return $o || ($o = 1, (function(l) {
    l.__esModule = !0, l.default = void 0, l.unescapeValue = c;
    var i = o(nt()), v = o(Pa()), p = o(ka()), u = Be(), f;
    function o(h) {
      return h && h.__esModule ? h : { default: h };
    }
    function d(h, O) {
      for (var C = 0; C < O.length; C++) {
        var T = O[C];
        T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(h, T.key, T);
      }
    }
    function e(h, O, C) {
      return O && d(h.prototype, O), Object.defineProperty(h, "prototype", { writable: !1 }), h;
    }
    function t(h, O) {
      h.prototype = Object.create(O.prototype), h.prototype.constructor = h, n(h, O);
    }
    function n(h, O) {
      return n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(T, w) {
        return T.__proto__ = w, T;
      }, n(h, O);
    }
    var a = ya(), s = /^('|")([^]*)\1$/, g = a(function() {
    }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead."), b = a(function() {
    }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead."), r = a(function() {
    }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
    function c(h) {
      var O = !1, C = null, T = h, w = T.match(s);
      return w && (C = w[1], T = w[2]), T = (0, v.default)(T), T !== h && (O = !0), {
        deprecatedUsage: O,
        unescaped: T,
        quoteMark: C
      };
    }
    function _(h) {
      if (h.quoteMark !== void 0 || h.value === void 0)
        return h;
      r();
      var O = c(h.value), C = O.quoteMark, T = O.unescaped;
      return h.raws || (h.raws = {}), h.raws.value === void 0 && (h.raws.value = h.value), h.value = T, h.quoteMark = C, h;
    }
    var m = /* @__PURE__ */ (function(h) {
      t(O, h);
      function O(T) {
        var w;
        return T === void 0 && (T = {}), w = h.call(this, _(T)) || this, w.type = u.ATTRIBUTE, w.raws = w.raws || {}, Object.defineProperty(w.raws, "unquoted", {
          get: a(function() {
            return w.value;
          }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
          set: a(function() {
            return w.value;
          }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
        }), w._constructed = !0, w;
      }
      var C = O.prototype;
      return C.getQuotedValue = function(w) {
        w === void 0 && (w = {});
        var P = this._determineQuoteMark(w), N = y[P], D = (0, i.default)(this._value, N);
        return D;
      }, C._determineQuoteMark = function(w) {
        return w.smart ? this.smartQuoteMark(w) : this.preferredQuoteMark(w);
      }, C.setValue = function(w, P) {
        P === void 0 && (P = {}), this._value = w, this._quoteMark = this._determineQuoteMark(P), this._syncRawValue();
      }, C.smartQuoteMark = function(w) {
        var P = this.value, N = P.replace(/[^']/g, "").length, D = P.replace(/[^"]/g, "").length;
        if (N + D === 0) {
          var B = (0, i.default)(P, {
            isIdentifier: !0
          });
          if (B === P)
            return O.NO_QUOTE;
          var k = this.preferredQuoteMark(w);
          if (k === O.NO_QUOTE) {
            var A = this.quoteMark || w.quoteMark || O.DOUBLE_QUOTE, R = y[A], I = (0, i.default)(P, R);
            if (I.length < B.length)
              return A;
          }
          return k;
        } else return D === N ? this.preferredQuoteMark(w) : D < N ? O.DOUBLE_QUOTE : O.SINGLE_QUOTE;
      }, C.preferredQuoteMark = function(w) {
        var P = w.preferCurrentQuoteMark ? this.quoteMark : w.quoteMark;
        return P === void 0 && (P = w.preferCurrentQuoteMark ? w.quoteMark : this.quoteMark), P === void 0 && (P = O.DOUBLE_QUOTE), P;
      }, C._syncRawValue = function() {
        var w = (0, i.default)(this._value, y[this.quoteMark]);
        w === this._value ? this.raws && delete this.raws.value : this.raws.value = w;
      }, C._handleEscapes = function(w, P) {
        if (this._constructed) {
          var N = (0, i.default)(P, {
            isIdentifier: !0
          });
          N !== P ? this.raws[w] = N : delete this.raws[w];
        }
      }, C._spacesFor = function(w) {
        var P = {
          before: "",
          after: ""
        }, N = this.spaces[w] || {}, D = this.raws.spaces && this.raws.spaces[w] || {};
        return Object.assign(P, N, D);
      }, C._stringFor = function(w, P, N) {
        P === void 0 && (P = w), N === void 0 && (N = S);
        var D = this._spacesFor(P);
        return N(this.stringifyProperty(w), D);
      }, C.offsetOf = function(w) {
        var P = 1, N = this._spacesFor("attribute");
        if (P += N.before.length, w === "namespace" || w === "ns")
          return this.namespace ? P : -1;
        if (w === "attributeNS" || (P += this.namespaceString.length, this.namespace && (P += 1), w === "attribute"))
          return P;
        P += this.stringifyProperty("attribute").length, P += N.after.length;
        var D = this._spacesFor("operator");
        P += D.before.length;
        var B = this.stringifyProperty("operator");
        if (w === "operator")
          return B ? P : -1;
        P += B.length, P += D.after.length;
        var k = this._spacesFor("value");
        P += k.before.length;
        var A = this.stringifyProperty("value");
        if (w === "value")
          return A ? P : -1;
        P += A.length, P += k.after.length;
        var R = this._spacesFor("insensitive");
        return P += R.before.length, w === "insensitive" && this.insensitive ? P : -1;
      }, C.toString = function() {
        var w = this, P = [this.rawSpaceBefore, "["];
        return P.push(this._stringFor("qualifiedAttribute", "attribute")), this.operator && (this.value || this.value === "") && (P.push(this._stringFor("operator")), P.push(this._stringFor("value")), P.push(this._stringFor("insensitiveFlag", "insensitive", function(N, D) {
          return N.length > 0 && !w.quoted && D.before.length === 0 && !(w.spaces.value && w.spaces.value.after) && (D.before = " "), S(N, D);
        }))), P.push("]"), P.push(this.rawSpaceAfter), P.join("");
      }, e(O, [{
        key: "quoted",
        get: function() {
          var w = this.quoteMark;
          return w === "'" || w === '"';
        },
        set: function(w) {
          b();
        }
        /**
         * returns a single (`'`) or double (`"`) quote character if the value is quoted.
         * returns `null` if the value is not quoted.
         * returns `undefined` if the quotation state is unknown (this can happen when
         * the attribute is constructed without specifying a quote mark.)
         */
      }, {
        key: "quoteMark",
        get: function() {
          return this._quoteMark;
        },
        set: function(w) {
          if (!this._constructed) {
            this._quoteMark = w;
            return;
          }
          this._quoteMark !== w && (this._quoteMark = w, this._syncRawValue());
        }
      }, {
        key: "qualifiedAttribute",
        get: function() {
          return this.qualifiedName(this.raws.attribute || this.attribute);
        }
      }, {
        key: "insensitiveFlag",
        get: function() {
          return this.insensitive ? "i" : "";
        }
      }, {
        key: "value",
        get: function() {
          return this._value;
        },
        set: (
          /**
           * Before 3.0, the value had to be set to an escaped value including any wrapped
           * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
           * is unescaped during parsing and any quote marks are removed.
           *
           * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
           * a deprecation warning is raised when the new value contains any characters that would
           * require escaping (including if it contains wrapped quotes).
           *
           * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
           * how the new value is quoted.
           */
          function(w) {
            if (this._constructed) {
              var P = c(w), N = P.deprecatedUsage, D = P.unescaped, B = P.quoteMark;
              if (N && g(), D === this._value && B === this._quoteMark)
                return;
              this._value = D, this._quoteMark = B, this._syncRawValue();
            } else
              this._value = w;
          }
        )
      }, {
        key: "insensitive",
        get: function() {
          return this._insensitive;
        },
        set: function(w) {
          w || (this._insensitive = !1, this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i") && (this.raws.insensitiveFlag = void 0)), this._insensitive = w;
        }
      }, {
        key: "attribute",
        get: function() {
          return this._attribute;
        },
        set: function(w) {
          this._handleEscapes("attribute", w), this._attribute = w;
        }
      }]), O;
    })(p.default);
    l.default = m, m.NO_QUOTE = null, m.SINGLE_QUOTE = "'", m.DOUBLE_QUOTE = '"';
    var y = (f = {
      "'": {
        quotes: "single",
        wrap: !0
      },
      '"': {
        quotes: "double",
        wrap: !0
      }
    }, f[null] = {
      isIdentifier: !0
    }, f);
    function S(h, O) {
      return "" + O.before + h + O.after;
    }
  })(ui)), ui;
}
var ur = { exports: {} }, Uo;
function of() {
  return Uo || (Uo = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ka()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.UNIVERSAL, a.value = "*", a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(ur, ur.exports)), ur.exports;
}
var lr = { exports: {} }, Wo;
function uf() {
  return Wo || (Wo = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ut()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.COMBINATOR, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(lr, lr.exports)), lr.exports;
}
var fr = { exports: {} }, zo;
function lf() {
  return zo || (zo = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ut()), p = Be();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.NESTING, a.value = "&", a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(fr, fr.exports)), fr.exports;
}
var cr = { exports: {} }, Bo;
function $c() {
  return Bo || (Bo = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      return p.sort(function(u, f) {
        return u - f;
      });
    }
    l.exports = i.default;
  })(cr, cr.exports)), cr.exports;
}
var li = {}, ue = {}, Vo;
function ff() {
  if (Vo) return ue;
  Vo = 1, ue.__esModule = !0, ue.word = ue.tilde = ue.tab = ue.str = ue.space = ue.slash = ue.singleQuote = ue.semicolon = ue.plus = ue.pipe = ue.openSquare = ue.openParenthesis = ue.newline = ue.greaterThan = ue.feed = ue.equals = ue.doubleQuote = ue.dollar = ue.cr = ue.comment = ue.comma = ue.combinator = ue.colon = ue.closeSquare = ue.closeParenthesis = ue.caret = ue.bang = ue.backslash = ue.at = ue.asterisk = ue.ampersand = void 0;
  var l = 38;
  ue.ampersand = l;
  var i = 42;
  ue.asterisk = i;
  var v = 64;
  ue.at = v;
  var p = 44;
  ue.comma = p;
  var u = 58;
  ue.colon = u;
  var f = 59;
  ue.semicolon = f;
  var o = 40;
  ue.openParenthesis = o;
  var d = 41;
  ue.closeParenthesis = d;
  var e = 91;
  ue.openSquare = e;
  var t = 93;
  ue.closeSquare = t;
  var n = 36;
  ue.dollar = n;
  var a = 126;
  ue.tilde = a;
  var s = 94;
  ue.caret = s;
  var g = 43;
  ue.plus = g;
  var b = 61;
  ue.equals = b;
  var r = 124;
  ue.pipe = r;
  var c = 62;
  ue.greaterThan = c;
  var _ = 32;
  ue.space = _;
  var m = 39;
  ue.singleQuote = m;
  var y = 34;
  ue.doubleQuote = y;
  var S = 47;
  ue.slash = S;
  var h = 33;
  ue.bang = h;
  var O = 92;
  ue.backslash = O;
  var C = 13;
  ue.cr = C;
  var T = 12;
  ue.feed = T;
  var w = 10;
  ue.newline = w;
  var P = 9;
  ue.tab = P;
  var N = m;
  ue.str = N;
  var D = -1;
  ue.comment = D;
  var B = -2;
  ue.word = B;
  var k = -3;
  return ue.combinator = k, ue;
}
var jo;
function Uc() {
  return jo || (jo = 1, (function(l) {
    l.__esModule = !0, l.FIELDS = void 0, l.default = b;
    var i = f(ff()), v, p;
    function u(r) {
      if (typeof WeakMap != "function") return null;
      var c = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap();
      return (u = function(y) {
        return y ? _ : c;
      })(r);
    }
    function f(r, c) {
      if (r && r.__esModule)
        return r;
      if (r === null || typeof r != "object" && typeof r != "function")
        return { default: r };
      var _ = u(c);
      if (_ && _.has(r))
        return _.get(r);
      var m = {}, y = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var S in r)
        if (S !== "default" && Object.prototype.hasOwnProperty.call(r, S)) {
          var h = y ? Object.getOwnPropertyDescriptor(r, S) : null;
          h && (h.get || h.set) ? Object.defineProperty(m, S, h) : m[S] = r[S];
        }
      return m.default = r, _ && _.set(r, m), m;
    }
    for (var o = (v = {}, v[i.tab] = !0, v[i.newline] = !0, v[i.cr] = !0, v[i.feed] = !0, v), d = (p = {}, p[i.space] = !0, p[i.tab] = !0, p[i.newline] = !0, p[i.cr] = !0, p[i.feed] = !0, p[i.ampersand] = !0, p[i.asterisk] = !0, p[i.bang] = !0, p[i.comma] = !0, p[i.colon] = !0, p[i.semicolon] = !0, p[i.openParenthesis] = !0, p[i.closeParenthesis] = !0, p[i.openSquare] = !0, p[i.closeSquare] = !0, p[i.singleQuote] = !0, p[i.doubleQuote] = !0, p[i.plus] = !0, p[i.pipe] = !0, p[i.tilde] = !0, p[i.greaterThan] = !0, p[i.equals] = !0, p[i.dollar] = !0, p[i.caret] = !0, p[i.slash] = !0, p), e = {}, t = "0123456789abcdefABCDEF", n = 0; n < t.length; n++)
      e[t.charCodeAt(n)] = !0;
    function a(r, c) {
      var _ = c, m;
      do {
        if (m = r.charCodeAt(_), d[m])
          return _ - 1;
        m === i.backslash ? _ = s(r, _) + 1 : _++;
      } while (_ < r.length);
      return _ - 1;
    }
    function s(r, c) {
      var _ = c, m = r.charCodeAt(_ + 1);
      if (!o[m]) if (e[m]) {
        var y = 0;
        do
          _++, y++, m = r.charCodeAt(_ + 1);
        while (e[m] && y < 6);
        y < 6 && m === i.space && _++;
      } else
        _++;
      return _;
    }
    var g = {
      TYPE: 0,
      START_LINE: 1,
      START_COL: 2,
      END_LINE: 3,
      END_COL: 4,
      START_POS: 5,
      END_POS: 6
    };
    l.FIELDS = g;
    function b(r) {
      var c = [], _ = r.css.valueOf(), m = _, y = m.length, S = -1, h = 1, O = 0, C = 0, T, w, P, N, D, B, k, A, R, I, W, Q, z;
      function L(F, M) {
        if (r.safe)
          _ += M, R = _.length - 1;
        else
          throw r.error("Unclosed " + F, h, O - S, O);
      }
      for (; O < y; ) {
        switch (T = _.charCodeAt(O), T === i.newline && (S = O, h += 1), T) {
          case i.space:
          case i.tab:
          case i.newline:
          case i.cr:
          case i.feed:
            R = O;
            do
              R += 1, T = _.charCodeAt(R), T === i.newline && (S = R, h += 1);
            while (T === i.space || T === i.newline || T === i.tab || T === i.cr || T === i.feed);
            z = i.space, N = h, P = R - S - 1, C = R;
            break;
          case i.plus:
          case i.greaterThan:
          case i.tilde:
          case i.pipe:
            R = O;
            do
              R += 1, T = _.charCodeAt(R);
            while (T === i.plus || T === i.greaterThan || T === i.tilde || T === i.pipe);
            z = i.combinator, N = h, P = O - S, C = R;
            break;
          // Consume these characters as single tokens.
          case i.asterisk:
          case i.ampersand:
          case i.bang:
          case i.comma:
          case i.equals:
          case i.dollar:
          case i.caret:
          case i.openSquare:
          case i.closeSquare:
          case i.colon:
          case i.semicolon:
          case i.openParenthesis:
          case i.closeParenthesis:
            R = O, z = T, N = h, P = O - S, C = R + 1;
            break;
          case i.singleQuote:
          case i.doubleQuote:
            Q = T === i.singleQuote ? "'" : '"', R = O;
            do
              for (D = !1, R = _.indexOf(Q, R + 1), R === -1 && L("quote", Q), B = R; _.charCodeAt(B - 1) === i.backslash; )
                B -= 1, D = !D;
            while (D);
            z = i.str, N = h, P = O - S, C = R + 1;
            break;
          default:
            T === i.slash && _.charCodeAt(O + 1) === i.asterisk ? (R = _.indexOf("*/", O + 2) + 1, R === 0 && L("comment", "*/"), w = _.slice(O, R + 1), A = w.split(`
`), k = A.length - 1, k > 0 ? (I = h + k, W = R - A[k].length) : (I = h, W = S), z = i.comment, h = I, N = I, P = R - W) : T === i.slash ? (R = O, z = T, N = h, P = O - S, C = R + 1) : (R = a(_, O), z = i.word, N = h, P = R - S), C = R + 1;
            break;
        }
        c.push([
          z,
          // [0] Token type
          h,
          // [1] Starting line
          O - S,
          // [2] Starting column
          N,
          // [3] Ending line
          P,
          // [4] Ending column
          O,
          // [5] Start position / Source index
          C
          // [6] End position
        ]), W && (S = W, W = null), O = C;
      }
      return c;
    }
  })(li)), li;
}
var Go;
function Wc() {
  return Go || (Go = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = C(Kl()), p = C(Xl()), u = C(Zl()), f = C(ef()), o = C(tf()), d = C(rf()), e = C(nf()), t = C(af()), n = O(sf()), a = C(of()), s = C(uf()), g = C(lf()), b = C($c()), r = O(Uc()), c = O(ff()), _ = O(Be()), m = Gr(), y, S;
    function h(L) {
      if (typeof WeakMap != "function") return null;
      var F = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap();
      return (h = function(q) {
        return q ? M : F;
      })(L);
    }
    function O(L, F) {
      if (L && L.__esModule)
        return L;
      if (L === null || typeof L != "object" && typeof L != "function")
        return { default: L };
      var M = h(F);
      if (M && M.has(L))
        return M.get(L);
      var E = {}, q = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var G in L)
        if (G !== "default" && Object.prototype.hasOwnProperty.call(L, G)) {
          var x = q ? Object.getOwnPropertyDescriptor(L, G) : null;
          x && (x.get || x.set) ? Object.defineProperty(E, G, x) : E[G] = L[G];
        }
      return E.default = L, M && M.set(L, E), E;
    }
    function C(L) {
      return L && L.__esModule ? L : { default: L };
    }
    function T(L, F) {
      for (var M = 0; M < F.length; M++) {
        var E = F[M];
        E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(L, E.key, E);
      }
    }
    function w(L, F, M) {
      return F && T(L.prototype, F), Object.defineProperty(L, "prototype", { writable: !1 }), L;
    }
    var P = (y = {}, y[c.space] = !0, y[c.cr] = !0, y[c.feed] = !0, y[c.newline] = !0, y[c.tab] = !0, y), N = Object.assign({}, P, (S = {}, S[c.comment] = !0, S));
    function D(L) {
      return {
        line: L[r.FIELDS.START_LINE],
        column: L[r.FIELDS.START_COL]
      };
    }
    function B(L) {
      return {
        line: L[r.FIELDS.END_LINE],
        column: L[r.FIELDS.END_COL]
      };
    }
    function k(L, F, M, E) {
      return {
        start: {
          line: L,
          column: F
        },
        end: {
          line: M,
          column: E
        }
      };
    }
    function A(L) {
      return k(L[r.FIELDS.START_LINE], L[r.FIELDS.START_COL], L[r.FIELDS.END_LINE], L[r.FIELDS.END_COL]);
    }
    function R(L, F) {
      if (L)
        return k(L[r.FIELDS.START_LINE], L[r.FIELDS.START_COL], F[r.FIELDS.END_LINE], F[r.FIELDS.END_COL]);
    }
    function I(L, F) {
      var M = L[F];
      if (typeof M == "string")
        return M.indexOf("\\") !== -1 && ((0, m.ensureObject)(L, "raws"), L[F] = (0, m.unesc)(M), L.raws[F] === void 0 && (L.raws[F] = M)), L;
    }
    function W(L, F) {
      for (var M = -1, E = []; (M = L.indexOf(F, M + 1)) !== -1; )
        E.push(M);
      return E;
    }
    function Q() {
      var L = Array.prototype.concat.apply([], arguments);
      return L.filter(function(F, M) {
        return M === L.indexOf(F);
      });
    }
    var z = /* @__PURE__ */ (function() {
      function L(M, E) {
        E === void 0 && (E = {}), this.rule = M, this.options = Object.assign({
          lossy: !1,
          safe: !1
        }, E), this.position = 0, this.css = typeof this.rule == "string" ? this.rule : this.rule.selector, this.tokens = (0, r.default)({
          css: this.css,
          error: this._errorGenerator(),
          safe: this.options.safe
        });
        var q = R(this.tokens[0], this.tokens[this.tokens.length - 1]);
        this.root = new v.default({
          source: q
        }), this.root.errorGenerator = this._errorGenerator();
        var G = new p.default({
          source: {
            start: {
              line: 1,
              column: 1
            }
          },
          sourceIndex: 0
        });
        this.root.append(G), this.current = G, this.loop();
      }
      var F = L.prototype;
      return F._errorGenerator = function() {
        var E = this;
        return function(q, G) {
          return typeof E.rule == "string" ? new Error(q) : E.rule.error(q, G);
        };
      }, F.attribute = function() {
        var E = [], q = this.currToken;
        for (this.position++; this.position < this.tokens.length && this.currToken[r.FIELDS.TYPE] !== c.closeSquare; )
          E.push(this.currToken), this.position++;
        if (this.currToken[r.FIELDS.TYPE] !== c.closeSquare)
          return this.expected("closing square bracket", this.currToken[r.FIELDS.START_POS]);
        var G = E.length, x = {
          source: k(q[1], q[2], this.currToken[3], this.currToken[4]),
          sourceIndex: q[r.FIELDS.START_POS]
        };
        if (G === 1 && !~[c.word].indexOf(E[0][r.FIELDS.TYPE]))
          return this.expected("attribute", E[0][r.FIELDS.START_POS]);
        for (var $ = 0, V = "", Y = "", U = null, K = !1; $ < G; ) {
          var X = E[$], j = this.content(X), Z = E[$ + 1];
          switch (X[r.FIELDS.TYPE]) {
            case c.space:
              if (K = !0, this.options.lossy)
                break;
              if (U) {
                (0, m.ensureObject)(x, "spaces", U);
                var fe = x.spaces[U].after || "";
                x.spaces[U].after = fe + j;
                var ve = (0, m.getProp)(x, "raws", "spaces", U, "after") || null;
                ve && (x.raws.spaces[U].after = ve + j);
              } else
                V = V + j, Y = Y + j;
              break;
            case c.asterisk:
              if (Z[r.FIELDS.TYPE] === c.equals)
                x.operator = j, U = "operator";
              else if ((!x.namespace || U === "namespace" && !K) && Z) {
                V && ((0, m.ensureObject)(x, "spaces", "attribute"), x.spaces.attribute.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "attribute"), x.raws.spaces.attribute.before = V, Y = ""), x.namespace = (x.namespace || "") + j;
                var de = (0, m.getProp)(x, "raws", "namespace") || null;
                de && (x.raws.namespace += j), U = "namespace";
              }
              K = !1;
              break;
            case c.dollar:
              if (U === "value") {
                var ne = (0, m.getProp)(x, "raws", "value");
                x.value += "$", ne && (x.raws.value = ne + "$");
                break;
              }
            // Falls through
            case c.caret:
              Z[r.FIELDS.TYPE] === c.equals && (x.operator = j, U = "operator"), K = !1;
              break;
            case c.combinator:
              if (j === "~" && Z[r.FIELDS.TYPE] === c.equals && (x.operator = j, U = "operator"), j !== "|") {
                K = !1;
                break;
              }
              Z[r.FIELDS.TYPE] === c.equals ? (x.operator = j, U = "operator") : !x.namespace && !x.attribute && (x.namespace = !0), K = !1;
              break;
            case c.word:
              if (Z && this.content(Z) === "|" && E[$ + 2] && E[$ + 2][r.FIELDS.TYPE] !== c.equals && // this look-ahead probably fails with comment nodes involved.
              !x.operator && !x.namespace)
                x.namespace = j, U = "namespace";
              else if (!x.attribute || U === "attribute" && !K) {
                V && ((0, m.ensureObject)(x, "spaces", "attribute"), x.spaces.attribute.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "attribute"), x.raws.spaces.attribute.before = Y, Y = ""), x.attribute = (x.attribute || "") + j;
                var we = (0, m.getProp)(x, "raws", "attribute") || null;
                we && (x.raws.attribute += j), U = "attribute";
              } else if (!x.value && x.value !== "" || U === "value" && !(K || x.quoteMark)) {
                var J = (0, m.unesc)(j), H = (0, m.getProp)(x, "raws", "value") || "", re = x.value || "";
                x.value = re + J, x.quoteMark = null, (J !== j || H) && ((0, m.ensureObject)(x, "raws"), x.raws.value = (H || re) + j), U = "value";
              } else {
                var te = j === "i" || j === "I";
                (x.value || x.value === "") && (x.quoteMark || K) ? (x.insensitive = te, (!te || j === "I") && ((0, m.ensureObject)(x, "raws"), x.raws.insensitiveFlag = j), U = "insensitive", V && ((0, m.ensureObject)(x, "spaces", "insensitive"), x.spaces.insensitive.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "insensitive"), x.raws.spaces.insensitive.before = Y, Y = "")) : (x.value || x.value === "") && (U = "value", x.value += j, x.raws.value && (x.raws.value += j));
              }
              K = !1;
              break;
            case c.str:
              if (!x.attribute || !x.operator)
                return this.error("Expected an attribute followed by an operator preceding the string.", {
                  index: X[r.FIELDS.START_POS]
                });
              var ee = (0, n.unescapeValue)(j), ae = ee.unescaped, ce = ee.quoteMark;
              x.value = ae, x.quoteMark = ce, U = "value", (0, m.ensureObject)(x, "raws"), x.raws.value = j, K = !1;
              break;
            case c.equals:
              if (!x.attribute)
                return this.expected("attribute", X[r.FIELDS.START_POS], j);
              if (x.value)
                return this.error('Unexpected "=" found; an operator was already defined.', {
                  index: X[r.FIELDS.START_POS]
                });
              x.operator = x.operator ? x.operator + j : j, U = "operator", K = !1;
              break;
            case c.comment:
              if (U)
                if (K || Z && Z[r.FIELDS.TYPE] === c.space || U === "insensitive") {
                  var xe = (0, m.getProp)(x, "spaces", U, "after") || "", pe = (0, m.getProp)(x, "raws", "spaces", U, "after") || xe;
                  (0, m.ensureObject)(x, "raws", "spaces", U), x.raws.spaces[U].after = pe + j;
                } else {
                  var ke = x[U] || "", me = (0, m.getProp)(x, "raws", U) || ke;
                  (0, m.ensureObject)(x, "raws"), x.raws[U] = me + j;
                }
              else
                Y = Y + j;
              break;
            default:
              return this.error('Unexpected "' + j + '" found.', {
                index: X[r.FIELDS.START_POS]
              });
          }
          $++;
        }
        I(x, "attribute"), I(x, "namespace"), this.newNode(new n.default(x)), this.position++;
      }, F.parseWhitespaceEquivalentTokens = function(E) {
        E < 0 && (E = this.tokens.length);
        var q = this.position, G = [], x = "", $ = void 0;
        do
          if (P[this.currToken[r.FIELDS.TYPE]])
            this.options.lossy || (x += this.content());
          else if (this.currToken[r.FIELDS.TYPE] === c.comment) {
            var V = {};
            x && (V.before = x, x = ""), $ = new f.default({
              value: this.content(),
              source: A(this.currToken),
              sourceIndex: this.currToken[r.FIELDS.START_POS],
              spaces: V
            }), G.push($);
          }
        while (++this.position < E);
        if (x) {
          if ($)
            $.spaces.after = x;
          else if (!this.options.lossy) {
            var Y = this.tokens[q], U = this.tokens[this.position - 1];
            G.push(new e.default({
              value: "",
              source: k(Y[r.FIELDS.START_LINE], Y[r.FIELDS.START_COL], U[r.FIELDS.END_LINE], U[r.FIELDS.END_COL]),
              sourceIndex: Y[r.FIELDS.START_POS],
              spaces: {
                before: x,
                after: ""
              }
            }));
          }
        }
        return G;
      }, F.convertWhitespaceNodesToSpace = function(E, q) {
        var G = this;
        q === void 0 && (q = !1);
        var x = "", $ = "";
        E.forEach(function(Y) {
          var U = G.lossySpace(Y.spaces.before, q), K = G.lossySpace(Y.rawSpaceBefore, q);
          x += U + G.lossySpace(Y.spaces.after, q && U.length === 0), $ += U + Y.value + G.lossySpace(Y.rawSpaceAfter, q && K.length === 0);
        }), $ === x && ($ = void 0);
        var V = {
          space: x,
          rawSpace: $
        };
        return V;
      }, F.isNamedCombinator = function(E) {
        return E === void 0 && (E = this.position), this.tokens[E + 0] && this.tokens[E + 0][r.FIELDS.TYPE] === c.slash && this.tokens[E + 1] && this.tokens[E + 1][r.FIELDS.TYPE] === c.word && this.tokens[E + 2] && this.tokens[E + 2][r.FIELDS.TYPE] === c.slash;
      }, F.namedCombinator = function() {
        if (this.isNamedCombinator()) {
          var E = this.content(this.tokens[this.position + 1]), q = (0, m.unesc)(E).toLowerCase(), G = {};
          q !== E && (G.value = "/" + E + "/");
          var x = new s.default({
            value: "/" + q + "/",
            source: k(this.currToken[r.FIELDS.START_LINE], this.currToken[r.FIELDS.START_COL], this.tokens[this.position + 2][r.FIELDS.END_LINE], this.tokens[this.position + 2][r.FIELDS.END_COL]),
            sourceIndex: this.currToken[r.FIELDS.START_POS],
            raws: G
          });
          return this.position = this.position + 3, x;
        } else
          this.unexpected();
      }, F.combinator = function() {
        var E = this;
        if (this.content() === "|")
          return this.namespace();
        var q = this.locateNextMeaningfulToken(this.position);
        if (q < 0 || this.tokens[q][r.FIELDS.TYPE] === c.comma || this.tokens[q][r.FIELDS.TYPE] === c.closeParenthesis) {
          var G = this.parseWhitespaceEquivalentTokens(q);
          if (G.length > 0) {
            var x = this.current.last;
            if (x) {
              var $ = this.convertWhitespaceNodesToSpace(G), V = $.space, Y = $.rawSpace;
              Y !== void 0 && (x.rawSpaceAfter += Y), x.spaces.after += V;
            } else
              G.forEach(function(H) {
                return E.newNode(H);
              });
          }
          return;
        }
        var U = this.currToken, K = void 0;
        q > this.position && (K = this.parseWhitespaceEquivalentTokens(q));
        var X;
        if (this.isNamedCombinator() ? X = this.namedCombinator() : this.currToken[r.FIELDS.TYPE] === c.combinator ? (X = new s.default({
          value: this.content(),
          source: A(this.currToken),
          sourceIndex: this.currToken[r.FIELDS.START_POS]
        }), this.position++) : P[this.currToken[r.FIELDS.TYPE]] || K || this.unexpected(), X) {
          if (K) {
            var j = this.convertWhitespaceNodesToSpace(K), Z = j.space, fe = j.rawSpace;
            X.spaces.before = Z, X.rawSpaceBefore = fe;
          }
        } else {
          var ve = this.convertWhitespaceNodesToSpace(K, !0), de = ve.space, ne = ve.rawSpace;
          ne || (ne = de);
          var we = {}, J = {
            spaces: {}
          };
          de.endsWith(" ") && ne.endsWith(" ") ? (we.before = de.slice(0, de.length - 1), J.spaces.before = ne.slice(0, ne.length - 1)) : de.startsWith(" ") && ne.startsWith(" ") ? (we.after = de.slice(1), J.spaces.after = ne.slice(1)) : J.value = ne, X = new s.default({
            value: " ",
            source: R(U, this.tokens[this.position - 1]),
            sourceIndex: U[r.FIELDS.START_POS],
            spaces: we,
            raws: J
          });
        }
        return this.currToken && this.currToken[r.FIELDS.TYPE] === c.space && (X.spaces.after = this.optionalSpace(this.content()), this.position++), this.newNode(X);
      }, F.comma = function() {
        if (this.position === this.tokens.length - 1) {
          this.root.trailingComma = !0, this.position++;
          return;
        }
        this.current._inferEndPosition();
        var E = new p.default({
          source: {
            start: D(this.tokens[this.position + 1])
          },
          sourceIndex: this.tokens[this.position + 1][r.FIELDS.START_POS]
        });
        this.current.parent.append(E), this.current = E, this.position++;
      }, F.comment = function() {
        var E = this.currToken;
        this.newNode(new f.default({
          value: this.content(),
          source: A(E),
          sourceIndex: E[r.FIELDS.START_POS]
        })), this.position++;
      }, F.error = function(E, q) {
        throw this.root.error(E, q);
      }, F.missingBackslash = function() {
        return this.error("Expected a backslash preceding the semicolon.", {
          index: this.currToken[r.FIELDS.START_POS]
        });
      }, F.missingParenthesis = function() {
        return this.expected("opening parenthesis", this.currToken[r.FIELDS.START_POS]);
      }, F.missingSquareBracket = function() {
        return this.expected("opening square bracket", this.currToken[r.FIELDS.START_POS]);
      }, F.unexpected = function() {
        return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[r.FIELDS.START_POS]);
      }, F.unexpectedPipe = function() {
        return this.error("Unexpected '|'.", this.currToken[r.FIELDS.START_POS]);
      }, F.namespace = function() {
        var E = this.prevToken && this.content(this.prevToken) || !0;
        if (this.nextToken[r.FIELDS.TYPE] === c.word)
          return this.position++, this.word(E);
        if (this.nextToken[r.FIELDS.TYPE] === c.asterisk)
          return this.position++, this.universal(E);
        this.unexpectedPipe();
      }, F.nesting = function() {
        if (this.nextToken) {
          var E = this.content(this.nextToken);
          if (E === "|") {
            this.position++;
            return;
          }
        }
        var q = this.currToken;
        this.newNode(new g.default({
          value: this.content(),
          source: A(q),
          sourceIndex: q[r.FIELDS.START_POS]
        })), this.position++;
      }, F.parentheses = function() {
        var E = this.current.last, q = 1;
        if (this.position++, E && E.type === _.PSEUDO) {
          var G = new p.default({
            source: {
              start: D(this.tokens[this.position])
            },
            sourceIndex: this.tokens[this.position][r.FIELDS.START_POS]
          }), x = this.current;
          for (E.append(G), this.current = G; this.position < this.tokens.length && q; )
            this.currToken[r.FIELDS.TYPE] === c.openParenthesis && q++, this.currToken[r.FIELDS.TYPE] === c.closeParenthesis && q--, q ? this.parse() : (this.current.source.end = B(this.currToken), this.current.parent.source.end = B(this.currToken), this.position++);
          this.current = x;
        } else {
          for (var $ = this.currToken, V = "(", Y; this.position < this.tokens.length && q; )
            this.currToken[r.FIELDS.TYPE] === c.openParenthesis && q++, this.currToken[r.FIELDS.TYPE] === c.closeParenthesis && q--, Y = this.currToken, V += this.parseParenthesisToken(this.currToken), this.position++;
          E ? E.appendToPropertyAndEscape("value", V, V) : this.newNode(new e.default({
            value: V,
            source: k($[r.FIELDS.START_LINE], $[r.FIELDS.START_COL], Y[r.FIELDS.END_LINE], Y[r.FIELDS.END_COL]),
            sourceIndex: $[r.FIELDS.START_POS]
          }));
        }
        if (q)
          return this.expected("closing parenthesis", this.currToken[r.FIELDS.START_POS]);
      }, F.pseudo = function() {
        for (var E = this, q = "", G = this.currToken; this.currToken && this.currToken[r.FIELDS.TYPE] === c.colon; )
          q += this.content(), this.position++;
        if (!this.currToken)
          return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
        if (this.currToken[r.FIELDS.TYPE] === c.word)
          this.splitWord(!1, function(x, $) {
            q += x, E.newNode(new t.default({
              value: q,
              source: R(G, E.currToken),
              sourceIndex: G[r.FIELDS.START_POS]
            })), $ > 1 && E.nextToken && E.nextToken[r.FIELDS.TYPE] === c.openParenthesis && E.error("Misplaced parenthesis.", {
              index: E.nextToken[r.FIELDS.START_POS]
            });
          });
        else
          return this.expected(["pseudo-class", "pseudo-element"], this.currToken[r.FIELDS.START_POS]);
      }, F.space = function() {
        var E = this.content();
        this.position === 0 || this.prevToken[r.FIELDS.TYPE] === c.comma || this.prevToken[r.FIELDS.TYPE] === c.openParenthesis || this.current.nodes.every(function(q) {
          return q.type === "comment";
        }) ? (this.spaces = this.optionalSpace(E), this.position++) : this.position === this.tokens.length - 1 || this.nextToken[r.FIELDS.TYPE] === c.comma || this.nextToken[r.FIELDS.TYPE] === c.closeParenthesis ? (this.current.last.spaces.after = this.optionalSpace(E), this.position++) : this.combinator();
      }, F.string = function() {
        var E = this.currToken;
        this.newNode(new e.default({
          value: this.content(),
          source: A(E),
          sourceIndex: E[r.FIELDS.START_POS]
        })), this.position++;
      }, F.universal = function(E) {
        var q = this.nextToken;
        if (q && this.content(q) === "|")
          return this.position++, this.namespace();
        var G = this.currToken;
        this.newNode(new a.default({
          value: this.content(),
          source: A(G),
          sourceIndex: G[r.FIELDS.START_POS]
        }), E), this.position++;
      }, F.splitWord = function(E, q) {
        for (var G = this, x = this.nextToken, $ = this.content(); x && ~[c.dollar, c.caret, c.equals, c.word].indexOf(x[r.FIELDS.TYPE]); ) {
          this.position++;
          var V = this.content();
          if ($ += V, V.lastIndexOf("\\") === V.length - 1) {
            var Y = this.nextToken;
            Y && Y[r.FIELDS.TYPE] === c.space && ($ += this.requiredSpace(this.content(Y)), this.position++);
          }
          x = this.nextToken;
        }
        var U = W($, ".").filter(function(Z) {
          var fe = $[Z - 1] === "\\", ve = /^\d+\.\d+%$/.test($);
          return !fe && !ve;
        }), K = W($, "#").filter(function(Z) {
          return $[Z - 1] !== "\\";
        }), X = W($, "#{");
        X.length && (K = K.filter(function(Z) {
          return !~X.indexOf(Z);
        }));
        var j = (0, b.default)(Q([0].concat(U, K)));
        j.forEach(function(Z, fe) {
          var ve = j[fe + 1] || $.length, de = $.slice(Z, ve);
          if (fe === 0 && q)
            return q.call(G, de, j.length);
          var ne, we = G.currToken, J = we[r.FIELDS.START_POS] + j[fe], H = k(we[1], we[2] + Z, we[3], we[2] + (ve - 1));
          if (~U.indexOf(Z)) {
            var re = {
              value: de.slice(1),
              source: H,
              sourceIndex: J
            };
            ne = new u.default(I(re, "value"));
          } else if (~K.indexOf(Z)) {
            var te = {
              value: de.slice(1),
              source: H,
              sourceIndex: J
            };
            ne = new o.default(I(te, "value"));
          } else {
            var ee = {
              value: de,
              source: H,
              sourceIndex: J
            };
            I(ee, "value"), ne = new d.default(ee);
          }
          G.newNode(ne, E), E = null;
        }), this.position++;
      }, F.word = function(E) {
        var q = this.nextToken;
        return q && this.content(q) === "|" ? (this.position++, this.namespace()) : this.splitWord(E);
      }, F.loop = function() {
        for (; this.position < this.tokens.length; )
          this.parse(!0);
        return this.current._inferEndPosition(), this.root;
      }, F.parse = function(E) {
        switch (this.currToken[r.FIELDS.TYPE]) {
          case c.space:
            this.space();
            break;
          case c.comment:
            this.comment();
            break;
          case c.openParenthesis:
            this.parentheses();
            break;
          case c.closeParenthesis:
            E && this.missingParenthesis();
            break;
          case c.openSquare:
            this.attribute();
            break;
          case c.dollar:
          case c.caret:
          case c.equals:
          case c.word:
            this.word();
            break;
          case c.colon:
            this.pseudo();
            break;
          case c.comma:
            this.comma();
            break;
          case c.asterisk:
            this.universal();
            break;
          case c.ampersand:
            this.nesting();
            break;
          case c.slash:
          case c.combinator:
            this.combinator();
            break;
          case c.str:
            this.string();
            break;
          // These cases throw; no break needed.
          case c.closeSquare:
            this.missingSquareBracket();
          case c.semicolon:
            this.missingBackslash();
          default:
            this.unexpected();
        }
      }, F.expected = function(E, q, G) {
        if (Array.isArray(E)) {
          var x = E.pop();
          E = E.join(", ") + " or " + x;
        }
        var $ = /^[aeiou]/.test(E[0]) ? "an" : "a";
        return G ? this.error("Expected " + $ + " " + E + ', found "' + G + '" instead.', {
          index: q
        }) : this.error("Expected " + $ + " " + E + ".", {
          index: q
        });
      }, F.requiredSpace = function(E) {
        return this.options.lossy ? " " : E;
      }, F.optionalSpace = function(E) {
        return this.options.lossy ? "" : E;
      }, F.lossySpace = function(E, q) {
        return this.options.lossy ? q ? " " : "" : E;
      }, F.parseParenthesisToken = function(E) {
        var q = this.content(E);
        return E[r.FIELDS.TYPE] === c.space ? this.requiredSpace(q) : q;
      }, F.newNode = function(E, q) {
        return q && (/^ +$/.test(q) && (this.options.lossy || (this.spaces = (this.spaces || "") + q), q = !0), E.namespace = q, I(E, "namespace")), this.spaces && (E.spaces.before = this.spaces, this.spaces = ""), this.current.append(E);
      }, F.content = function(E) {
        return E === void 0 && (E = this.currToken), this.css.slice(E[r.FIELDS.START_POS], E[r.FIELDS.END_POS]);
      }, F.locateNextMeaningfulToken = function(E) {
        E === void 0 && (E = this.position + 1);
        for (var q = E; q < this.tokens.length; )
          if (N[this.tokens[q][r.FIELDS.TYPE]]) {
            q++;
            continue;
          } else
            return q;
        return -1;
      }, w(L, [{
        key: "currToken",
        get: function() {
          return this.tokens[this.position];
        }
      }, {
        key: "nextToken",
        get: function() {
          return this.tokens[this.position + 1];
        }
      }, {
        key: "prevToken",
        get: function() {
          return this.tokens[this.position - 1];
        }
      }]), L;
    })();
    i.default = z, l.exports = i.default;
  })(Gt, Gt.exports)), Gt.exports;
}
var Yo;
function zc() {
  return Yo || (Yo = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = p(Wc());
    function p(f) {
      return f && f.__esModule ? f : { default: f };
    }
    var u = /* @__PURE__ */ (function() {
      function f(d, e) {
        this.func = d || function() {
        }, this.funcRes = null, this.options = e;
      }
      var o = f.prototype;
      return o._shouldUpdateSelector = function(e, t) {
        t === void 0 && (t = {});
        var n = Object.assign({}, this.options, t);
        return n.updateSelector === !1 ? !1 : typeof e != "string";
      }, o._isLossy = function(e) {
        e === void 0 && (e = {});
        var t = Object.assign({}, this.options, e);
        return t.lossless === !1;
      }, o._root = function(e, t) {
        t === void 0 && (t = {});
        var n = new v.default(e, this._parseOptions(t));
        return n.root;
      }, o._parseOptions = function(e) {
        return {
          lossy: this._isLossy(e)
        };
      }, o._run = function(e, t) {
        var n = this;
        return t === void 0 && (t = {}), new Promise(function(a, s) {
          try {
            var g = n._root(e, t);
            Promise.resolve(n.func(g)).then(function(b) {
              var r = void 0;
              return n._shouldUpdateSelector(e, t) && (r = g.toString(), e.selector = r), {
                transform: b,
                root: g,
                string: r
              };
            }).then(a, s);
          } catch (b) {
            s(b);
            return;
          }
        });
      }, o._runSync = function(e, t) {
        t === void 0 && (t = {});
        var n = this._root(e, t), a = this.func(n);
        if (a && typeof a.then == "function")
          throw new Error("Selector processor returned a promise to a synchronous call.");
        var s = void 0;
        return t.updateSelector && typeof e != "string" && (s = n.toString(), e.selector = s), {
          transform: a,
          root: n,
          string: s
        };
      }, o.ast = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.root;
        });
      }, o.astSync = function(e, t) {
        return this._runSync(e, t).root;
      }, o.transform = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.transform;
        });
      }, o.transformSync = function(e, t) {
        return this._runSync(e, t).transform;
      }, o.process = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.string || n.root.toString();
        });
      }, o.processSync = function(e, t) {
        var n = this._runSync(e, t);
        return n.string || n.root.toString();
      }, f;
    })();
    i.default = u, l.exports = i.default;
  })(jt, jt.exports)), jt.exports;
}
var fi = {}, Le = {}, Qo;
function Bc() {
  if (Qo) return Le;
  Qo = 1, Le.__esModule = !0, Le.universal = Le.tag = Le.string = Le.selector = Le.root = Le.pseudo = Le.nesting = Le.id = Le.comment = Le.combinator = Le.className = Le.attribute = void 0;
  var l = s(sf()), i = s(Zl()), v = s(uf()), p = s(ef()), u = s(tf()), f = s(lf()), o = s(af()), d = s(Kl()), e = s(Xl()), t = s(nf()), n = s(rf()), a = s(of());
  function s(w) {
    return w && w.__esModule ? w : { default: w };
  }
  var g = function(P) {
    return new l.default(P);
  };
  Le.attribute = g;
  var b = function(P) {
    return new i.default(P);
  };
  Le.className = b;
  var r = function(P) {
    return new v.default(P);
  };
  Le.combinator = r;
  var c = function(P) {
    return new p.default(P);
  };
  Le.comment = c;
  var _ = function(P) {
    return new u.default(P);
  };
  Le.id = _;
  var m = function(P) {
    return new f.default(P);
  };
  Le.nesting = m;
  var y = function(P) {
    return new o.default(P);
  };
  Le.pseudo = y;
  var S = function(P) {
    return new d.default(P);
  };
  Le.root = S;
  var h = function(P) {
    return new e.default(P);
  };
  Le.selector = h;
  var O = function(P) {
    return new t.default(P);
  };
  Le.string = O;
  var C = function(P) {
    return new n.default(P);
  };
  Le.tag = C;
  var T = function(P) {
    return new a.default(P);
  };
  return Le.universal = T, Le;
}
var Ae = {}, Ho;
function Vc() {
  if (Ho) return Ae;
  Ho = 1, Ae.__esModule = !0, Ae.isComment = Ae.isCombinator = Ae.isClassName = Ae.isAttribute = void 0, Ae.isContainer = y, Ae.isIdentifier = void 0, Ae.isNamespace = S, Ae.isNesting = void 0, Ae.isNode = p, Ae.isPseudo = void 0, Ae.isPseudoClass = m, Ae.isPseudoElement = _, Ae.isUniversal = Ae.isTag = Ae.isString = Ae.isSelector = Ae.isRoot = void 0;
  var l = Be(), i, v = (i = {}, i[l.ATTRIBUTE] = !0, i[l.CLASS] = !0, i[l.COMBINATOR] = !0, i[l.COMMENT] = !0, i[l.ID] = !0, i[l.NESTING] = !0, i[l.PSEUDO] = !0, i[l.ROOT] = !0, i[l.SELECTOR] = !0, i[l.STRING] = !0, i[l.TAG] = !0, i[l.UNIVERSAL] = !0, i);
  function p(h) {
    return typeof h == "object" && v[h.type];
  }
  function u(h, O) {
    return p(O) && O.type === h;
  }
  var f = u.bind(null, l.ATTRIBUTE);
  Ae.isAttribute = f;
  var o = u.bind(null, l.CLASS);
  Ae.isClassName = o;
  var d = u.bind(null, l.COMBINATOR);
  Ae.isCombinator = d;
  var e = u.bind(null, l.COMMENT);
  Ae.isComment = e;
  var t = u.bind(null, l.ID);
  Ae.isIdentifier = t;
  var n = u.bind(null, l.NESTING);
  Ae.isNesting = n;
  var a = u.bind(null, l.PSEUDO);
  Ae.isPseudo = a;
  var s = u.bind(null, l.ROOT);
  Ae.isRoot = s;
  var g = u.bind(null, l.SELECTOR);
  Ae.isSelector = g;
  var b = u.bind(null, l.STRING);
  Ae.isString = b;
  var r = u.bind(null, l.TAG);
  Ae.isTag = r;
  var c = u.bind(null, l.UNIVERSAL);
  Ae.isUniversal = c;
  function _(h) {
    return a(h) && h.value && (h.value.startsWith("::") || h.value.toLowerCase() === ":before" || h.value.toLowerCase() === ":after" || h.value.toLowerCase() === ":first-letter" || h.value.toLowerCase() === ":first-line");
  }
  function m(h) {
    return a(h) && !_(h);
  }
  function y(h) {
    return !!(p(h) && h.walk);
  }
  function S(h) {
    return f(h) || r(h);
  }
  return Ae;
}
var Jo;
function jc() {
  return Jo || (Jo = 1, (function(l) {
    l.__esModule = !0;
    var i = Be();
    Object.keys(i).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === i[u] || (l[u] = i[u]);
    });
    var v = Bc();
    Object.keys(v).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === v[u] || (l[u] = v[u]);
    });
    var p = Vc();
    Object.keys(p).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === p[u] || (l[u] = p[u]);
    });
  })(fi)), fi;
}
var Ko;
function lt() {
  return Ko || (Ko = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(zc()), p = f(jc());
    function u(t) {
      if (typeof WeakMap != "function") return null;
      var n = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap();
      return (u = function(g) {
        return g ? a : n;
      })(t);
    }
    function f(t, n) {
      if (t && t.__esModule)
        return t;
      if (t === null || typeof t != "object" && typeof t != "function")
        return { default: t };
      var a = u(n);
      if (a && a.has(t))
        return a.get(t);
      var s = {}, g = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var b in t)
        if (b !== "default" && Object.prototype.hasOwnProperty.call(t, b)) {
          var r = g ? Object.getOwnPropertyDescriptor(t, b) : null;
          r && (r.get || r.set) ? Object.defineProperty(s, b, r) : s[b] = t[b];
        }
      return s.default = t, a && a.set(t, s), s;
    }
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }
    var d = function(n) {
      return new v.default(n);
    };
    Object.assign(d, p), delete d.__esModule;
    var e = d;
    i.default = e, l.exports = i.default;
  })(Vt, Vt.exports)), Vt.exports;
}
var ci = {}, di = {}, dr = { exports: {} }, pr = { exports: {} }, hr = { exports: {} }, vr = { exports: {} }, gr = { exports: {} }, mr = { exports: {} }, yr = { exports: {} }, et = {}, wr = { exports: {} }, Xo;
function cf() {
  return Xo || (Xo = 1, (function(l, i) {
    i.__esModule = !0, i.default = u;
    function v(f) {
      for (var o = f.toLowerCase(), d = "", e = !1, t = 0; t < 6 && o[t] !== void 0; t++) {
        var n = o.charCodeAt(t), a = n >= 97 && n <= 102 || n >= 48 && n <= 57;
        if (e = n === 32, !a)
          break;
        d += o[t];
      }
      if (d.length !== 0) {
        var s = parseInt(d, 16), g = s >= 55296 && s <= 57343;
        return g || s === 0 || s > 1114111 ? ["�", d.length + (e ? 1 : 0)] : [String.fromCodePoint(s), d.length + (e ? 1 : 0)];
      }
    }
    var p = /\\/;
    function u(f) {
      var o = p.test(f);
      if (!o)
        return f;
      for (var d = "", e = 0; e < f.length; e++) {
        if (f[e] === "\\") {
          var t = v(f.slice(e + 1, e + 7));
          if (t !== void 0) {
            d += t[0], e += t[1];
            continue;
          }
          if (f[e + 1] === "\\") {
            d += "\\", e++;
            continue;
          }
          f.length === e + 1 && (d += f[e]);
          continue;
        }
        d += f[e];
      }
      return d;
    }
    l.exports = i.default;
  })(wr, wr.exports)), wr.exports;
}
var br = { exports: {} }, Zo;
function Gc() {
  return Zo || (Zo = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = arguments.length, f = new Array(u > 1 ? u - 1 : 0), o = 1; o < u; o++)
        f[o - 1] = arguments[o];
      for (; f.length > 0; ) {
        var d = f.shift();
        if (!p[d])
          return;
        p = p[d];
      }
      return p;
    }
    l.exports = i.default;
  })(br, br.exports)), br.exports;
}
var _r = { exports: {} }, eu;
function Yc() {
  return eu || (eu = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = arguments.length, f = new Array(u > 1 ? u - 1 : 0), o = 1; o < u; o++)
        f[o - 1] = arguments[o];
      for (; f.length > 0; ) {
        var d = f.shift();
        p[d] || (p[d] = {}), p = p[d];
      }
    }
    l.exports = i.default;
  })(_r, _r.exports)), _r.exports;
}
var Sr = { exports: {} }, tu;
function Qc() {
  return tu || (tu = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      for (var u = "", f = p.indexOf("/*"), o = 0; f >= 0; ) {
        u = u + p.slice(o, f);
        var d = p.indexOf("*/", f + 2);
        if (d < 0)
          return u;
        o = d + 2, f = p.indexOf("/*", o);
      }
      return u = u + p.slice(o), u;
    }
    l.exports = i.default;
  })(Sr, Sr.exports)), Sr.exports;
}
var ru;
function Yr() {
  if (ru) return et;
  ru = 1, et.__esModule = !0, et.unesc = et.stripComments = et.getProp = et.ensureObject = void 0;
  var l = u(cf());
  et.unesc = l.default;
  var i = u(Gc());
  et.getProp = i.default;
  var v = u(Yc());
  et.ensureObject = v.default;
  var p = u(Qc());
  et.stripComments = p.default;
  function u(f) {
    return f && f.__esModule ? f : { default: f };
  }
  return et;
}
var nu;
function ft() {
  return nu || (nu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = Yr();
    function p(d, e) {
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(d, n.key, n);
      }
    }
    function u(d, e, t) {
      return e && p(d.prototype, e), Object.defineProperty(d, "prototype", { writable: !1 }), d;
    }
    var f = function d(e, t) {
      if (typeof e != "object" || e === null)
        return e;
      var n = new e.constructor();
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var s = e[a], g = typeof s;
          a === "parent" && g === "object" ? t && (n[a] = t) : s instanceof Array ? n[a] = s.map(function(b) {
            return d(b, n);
          }) : n[a] = d(s, n);
        }
      return n;
    }, o = /* @__PURE__ */ (function() {
      function d(t) {
        t === void 0 && (t = {}), Object.assign(this, t), this.spaces = this.spaces || {}, this.spaces.before = this.spaces.before || "", this.spaces.after = this.spaces.after || "";
      }
      var e = d.prototype;
      return e.remove = function() {
        return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
      }, e.replaceWith = function() {
        if (this.parent) {
          for (var n in arguments)
            this.parent.insertBefore(this, arguments[n]);
          this.remove();
        }
        return this;
      }, e.next = function() {
        return this.parent.at(this.parent.index(this) + 1);
      }, e.prev = function() {
        return this.parent.at(this.parent.index(this) - 1);
      }, e.clone = function(n) {
        n === void 0 && (n = {});
        var a = f(this);
        for (var s in n)
          a[s] = n[s];
        return a;
      }, e.appendToPropertyAndEscape = function(n, a, s) {
        this.raws || (this.raws = {});
        var g = this[n], b = this.raws[n];
        this[n] = g + a, b || s !== a ? this.raws[n] = (b || g) + s : delete this.raws[n];
      }, e.setPropertyAndEscape = function(n, a, s) {
        this.raws || (this.raws = {}), this[n] = a, this.raws[n] = s;
      }, e.setPropertyWithoutEscape = function(n, a) {
        this[n] = a, this.raws && delete this.raws[n];
      }, e.isAtPosition = function(n, a) {
        if (this.source && this.source.start && this.source.end)
          return !(this.source.start.line > n || this.source.end.line < n || this.source.start.line === n && this.source.start.column > a || this.source.end.line === n && this.source.end.column < a);
      }, e.stringifyProperty = function(n) {
        return this.raws && this.raws[n] || this[n];
      }, e.valueToString = function() {
        return String(this.stringifyProperty("value"));
      }, e.toString = function() {
        return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
      }, u(d, [{
        key: "rawSpaceBefore",
        get: function() {
          var n = this.raws && this.raws.spaces && this.raws.spaces.before;
          return n === void 0 && (n = this.spaces && this.spaces.before), n || "";
        },
        set: function(n) {
          (0, v.ensureObject)(this, "raws", "spaces"), this.raws.spaces.before = n;
        }
      }, {
        key: "rawSpaceAfter",
        get: function() {
          var n = this.raws && this.raws.spaces && this.raws.spaces.after;
          return n === void 0 && (n = this.spaces.after), n || "";
        },
        set: function(n) {
          (0, v.ensureObject)(this, "raws", "spaces"), this.raws.spaces.after = n;
        }
      }]), d;
    })();
    i.default = o, l.exports = i.default;
  })(yr, yr.exports)), yr.exports;
}
var Ne = {}, iu;
function Ve() {
  if (iu) return Ne;
  iu = 1, Ne.__esModule = !0, Ne.UNIVERSAL = Ne.TAG = Ne.STRING = Ne.SELECTOR = Ne.ROOT = Ne.PSEUDO = Ne.NESTING = Ne.ID = Ne.COMMENT = Ne.COMBINATOR = Ne.CLASS = Ne.ATTRIBUTE = void 0;
  var l = "tag";
  Ne.TAG = l;
  var i = "string";
  Ne.STRING = i;
  var v = "selector";
  Ne.SELECTOR = v;
  var p = "root";
  Ne.ROOT = p;
  var u = "pseudo";
  Ne.PSEUDO = u;
  var f = "nesting";
  Ne.NESTING = f;
  var o = "id";
  Ne.ID = o;
  var d = "comment";
  Ne.COMMENT = d;
  var e = "combinator";
  Ne.COMBINATOR = e;
  var t = "class";
  Ne.CLASS = t;
  var n = "attribute";
  Ne.ATTRIBUTE = n;
  var a = "universal";
  return Ne.UNIVERSAL = a, Ne;
}
var au;
function Ea() {
  return au || (au = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(ft()), p = f(Ve());
    function u(r) {
      if (typeof WeakMap != "function") return null;
      var c = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap();
      return (u = function(y) {
        return y ? _ : c;
      })(r);
    }
    function f(r, c) {
      if (r && r.__esModule)
        return r;
      if (r === null || typeof r != "object" && typeof r != "function")
        return { default: r };
      var _ = u(c);
      if (_ && _.has(r))
        return _.get(r);
      var m = {}, y = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var S in r)
        if (S !== "default" && Object.prototype.hasOwnProperty.call(r, S)) {
          var h = y ? Object.getOwnPropertyDescriptor(r, S) : null;
          h && (h.get || h.set) ? Object.defineProperty(m, S, h) : m[S] = r[S];
        }
      return m.default = r, _ && _.set(r, m), m;
    }
    function o(r) {
      return r && r.__esModule ? r : { default: r };
    }
    function d(r, c) {
      var _ = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (_) return (_ = _.call(r)).next.bind(_);
      if (Array.isArray(r) || (_ = e(r)) || c) {
        _ && (r = _);
        var m = 0;
        return function() {
          return m >= r.length ? { done: !0 } : { done: !1, value: r[m++] };
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function e(r, c) {
      if (r) {
        if (typeof r == "string") return t(r, c);
        var _ = Object.prototype.toString.call(r).slice(8, -1);
        if (_ === "Object" && r.constructor && (_ = r.constructor.name), _ === "Map" || _ === "Set") return Array.from(r);
        if (_ === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_)) return t(r, c);
      }
    }
    function t(r, c) {
      (c == null || c > r.length) && (c = r.length);
      for (var _ = 0, m = new Array(c); _ < c; _++)
        m[_] = r[_];
      return m;
    }
    function n(r, c) {
      for (var _ = 0; _ < c.length; _++) {
        var m = c[_];
        m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(r, m.key, m);
      }
    }
    function a(r, c, _) {
      return c && n(r.prototype, c), Object.defineProperty(r, "prototype", { writable: !1 }), r;
    }
    function s(r, c) {
      r.prototype = Object.create(c.prototype), r.prototype.constructor = r, g(r, c);
    }
    function g(r, c) {
      return g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(m, y) {
        return m.__proto__ = y, m;
      }, g(r, c);
    }
    var b = /* @__PURE__ */ (function(r) {
      s(c, r);
      function c(m) {
        var y;
        return y = r.call(this, m) || this, y.nodes || (y.nodes = []), y;
      }
      var _ = c.prototype;
      return _.append = function(y) {
        return y.parent = this, this.nodes.push(y), this;
      }, _.prepend = function(y) {
        return y.parent = this, this.nodes.unshift(y), this;
      }, _.at = function(y) {
        return this.nodes[y];
      }, _.index = function(y) {
        return typeof y == "number" ? y : this.nodes.indexOf(y);
      }, _.removeChild = function(y) {
        y = this.index(y), this.at(y).parent = void 0, this.nodes.splice(y, 1);
        var S;
        for (var h in this.indexes)
          S = this.indexes[h], S >= y && (this.indexes[h] = S - 1);
        return this;
      }, _.removeAll = function() {
        for (var y = d(this.nodes), S; !(S = y()).done; ) {
          var h = S.value;
          h.parent = void 0;
        }
        return this.nodes = [], this;
      }, _.empty = function() {
        return this.removeAll();
      }, _.insertAfter = function(y, S) {
        S.parent = this;
        var h = this.index(y);
        this.nodes.splice(h + 1, 0, S), S.parent = this;
        var O;
        for (var C in this.indexes)
          O = this.indexes[C], h <= O && (this.indexes[C] = O + 1);
        return this;
      }, _.insertBefore = function(y, S) {
        S.parent = this;
        var h = this.index(y);
        this.nodes.splice(h, 0, S), S.parent = this;
        var O;
        for (var C in this.indexes)
          O = this.indexes[C], O <= h && (this.indexes[C] = O + 1);
        return this;
      }, _._findChildAtPosition = function(y, S) {
        var h = void 0;
        return this.each(function(O) {
          if (O.atPosition) {
            var C = O.atPosition(y, S);
            if (C)
              return h = C, !1;
          } else if (O.isAtPosition(y, S))
            return h = O, !1;
        }), h;
      }, _.atPosition = function(y, S) {
        if (this.isAtPosition(y, S))
          return this._findChildAtPosition(y, S) || this;
      }, _._inferEndPosition = function() {
        this.last && this.last.source && this.last.source.end && (this.source = this.source || {}, this.source.end = this.source.end || {}, Object.assign(this.source.end, this.last.source.end));
      }, _.each = function(y) {
        this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach++;
        var S = this.lastEach;
        if (this.indexes[S] = 0, !!this.length) {
          for (var h, O; this.indexes[S] < this.length && (h = this.indexes[S], O = y(this.at(h), h), O !== !1); )
            this.indexes[S] += 1;
          if (delete this.indexes[S], O === !1)
            return !1;
        }
      }, _.walk = function(y) {
        return this.each(function(S, h) {
          var O = y(S, h);
          if (O !== !1 && S.length && (O = S.walk(y)), O === !1)
            return !1;
        });
      }, _.walkAttributes = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.ATTRIBUTE)
            return y.call(S, h);
        });
      }, _.walkClasses = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.CLASS)
            return y.call(S, h);
        });
      }, _.walkCombinators = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.COMBINATOR)
            return y.call(S, h);
        });
      }, _.walkComments = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.COMMENT)
            return y.call(S, h);
        });
      }, _.walkIds = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.ID)
            return y.call(S, h);
        });
      }, _.walkNesting = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.NESTING)
            return y.call(S, h);
        });
      }, _.walkPseudos = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.PSEUDO)
            return y.call(S, h);
        });
      }, _.walkTags = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.TAG)
            return y.call(S, h);
        });
      }, _.walkUniversals = function(y) {
        var S = this;
        return this.walk(function(h) {
          if (h.type === p.UNIVERSAL)
            return y.call(S, h);
        });
      }, _.split = function(y) {
        var S = this, h = [];
        return this.reduce(function(O, C, T) {
          var w = y.call(S, C);
          return h.push(C), w ? (O.push(h), h = []) : T === S.length - 1 && O.push(h), O;
        }, []);
      }, _.map = function(y) {
        return this.nodes.map(y);
      }, _.reduce = function(y, S) {
        return this.nodes.reduce(y, S);
      }, _.every = function(y) {
        return this.nodes.every(y);
      }, _.some = function(y) {
        return this.nodes.some(y);
      }, _.filter = function(y) {
        return this.nodes.filter(y);
      }, _.sort = function(y) {
        return this.nodes.sort(y);
      }, _.toString = function() {
        return this.map(String).join("");
      }, a(c, [{
        key: "first",
        get: function() {
          return this.at(0);
        }
      }, {
        key: "last",
        get: function() {
          return this.at(this.length - 1);
        }
      }, {
        key: "length",
        get: function() {
          return this.nodes.length;
        }
      }]), c;
    })(v.default);
    i.default = b, l.exports = i.default;
  })(mr, mr.exports)), mr.exports;
}
var su;
function df() {
  return su || (su = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(Ea()), p = Ve();
    function u(n) {
      return n && n.__esModule ? n : { default: n };
    }
    function f(n, a) {
      for (var s = 0; s < a.length; s++) {
        var g = a[s];
        g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(n, g.key, g);
      }
    }
    function o(n, a, s) {
      return a && f(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
    }
    function d(n, a) {
      n.prototype = Object.create(a.prototype), n.prototype.constructor = n, e(n, a);
    }
    function e(n, a) {
      return e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(g, b) {
        return g.__proto__ = b, g;
      }, e(n, a);
    }
    var t = /* @__PURE__ */ (function(n) {
      d(a, n);
      function a(g) {
        var b;
        return b = n.call(this, g) || this, b.type = p.ROOT, b;
      }
      var s = a.prototype;
      return s.toString = function() {
        var b = this.reduce(function(r, c) {
          return r.push(String(c)), r;
        }, []).join(",");
        return this.trailingComma ? b + "," : b;
      }, s.error = function(b, r) {
        return this._error ? this._error(b, r) : new Error(b);
      }, o(a, [{
        key: "errorGenerator",
        set: function(b) {
          this._error = b;
        }
      }]), a;
    })(v.default);
    i.default = t, l.exports = i.default;
  })(gr, gr.exports)), gr.exports;
}
var Or = { exports: {} }, ou;
function pf() {
  return ou || (ou = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(Ea()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.SELECTOR, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Or, Or.exports)), Or.exports;
}
var xr = { exports: {} }, uu;
function hf() {
  return uu || (uu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(nt()), p = Yr(), u = o(ft()), f = Ve();
    function o(s) {
      return s && s.__esModule ? s : { default: s };
    }
    function d(s, g) {
      for (var b = 0; b < g.length; b++) {
        var r = g[b];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(s, r.key, r);
      }
    }
    function e(s, g, b) {
      return g && d(s.prototype, g), Object.defineProperty(s, "prototype", { writable: !1 }), s;
    }
    function t(s, g) {
      s.prototype = Object.create(g.prototype), s.prototype.constructor = s, n(s, g);
    }
    function n(s, g) {
      return n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, c) {
        return r.__proto__ = c, r;
      }, n(s, g);
    }
    var a = /* @__PURE__ */ (function(s) {
      t(g, s);
      function g(r) {
        var c;
        return c = s.call(this, r) || this, c.type = f.CLASS, c._constructed = !0, c;
      }
      var b = g.prototype;
      return b.valueToString = function() {
        return "." + s.prototype.valueToString.call(this);
      }, e(g, [{
        key: "value",
        get: function() {
          return this._value;
        },
        set: function(c) {
          if (this._constructed) {
            var _ = (0, v.default)(c, {
              isIdentifier: !0
            });
            _ !== c ? ((0, p.ensureObject)(this, "raws"), this.raws.value = _) : this.raws && delete this.raws.value;
          }
          this._value = c;
        }
      }]), g;
    })(u.default);
    i.default = a, l.exports = i.default;
  })(xr, xr.exports)), xr.exports;
}
var Pr = { exports: {} }, lu;
function vf() {
  return lu || (lu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ft()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.COMMENT, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Pr, Pr.exports)), Pr.exports;
}
var Tr = { exports: {} }, fu;
function gf() {
  return fu || (fu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ft()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(a) {
        var s;
        return s = e.call(this, a) || this, s.type = p.ID, s;
      }
      var n = t.prototype;
      return n.valueToString = function() {
        return "#" + e.prototype.valueToString.call(this);
      }, t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Tr, Tr.exports)), Tr.exports;
}
var kr = { exports: {} }, Er = { exports: {} }, cu;
function Aa() {
  return cu || (cu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = f(nt()), p = Yr(), u = f(ft());
    function f(a) {
      return a && a.__esModule ? a : { default: a };
    }
    function o(a, s) {
      for (var g = 0; g < s.length; g++) {
        var b = s[g];
        b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(a, b.key, b);
      }
    }
    function d(a, s, g) {
      return s && o(a.prototype, s), Object.defineProperty(a, "prototype", { writable: !1 }), a;
    }
    function e(a, s) {
      a.prototype = Object.create(s.prototype), a.prototype.constructor = a, t(a, s);
    }
    function t(a, s) {
      return t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(b, r) {
        return b.__proto__ = r, b;
      }, t(a, s);
    }
    var n = /* @__PURE__ */ (function(a) {
      e(s, a);
      function s() {
        return a.apply(this, arguments) || this;
      }
      var g = s.prototype;
      return g.qualifiedName = function(r) {
        return this.namespace ? this.namespaceString + "|" + r : r;
      }, g.valueToString = function() {
        return this.qualifiedName(a.prototype.valueToString.call(this));
      }, d(s, [{
        key: "namespace",
        get: function() {
          return this._namespace;
        },
        set: function(r) {
          if (r === !0 || r === "*" || r === "&") {
            this._namespace = r, this.raws && delete this.raws.namespace;
            return;
          }
          var c = (0, v.default)(r, {
            isIdentifier: !0
          });
          this._namespace = r, c !== r ? ((0, p.ensureObject)(this, "raws"), this.raws.namespace = c) : this.raws && delete this.raws.namespace;
        }
      }, {
        key: "ns",
        get: function() {
          return this._namespace;
        },
        set: function(r) {
          this.namespace = r;
        }
      }, {
        key: "namespaceString",
        get: function() {
          if (this.namespace) {
            var r = this.stringifyProperty("namespace");
            return r === !0 ? "" : r;
          } else
            return "";
        }
      }]), s;
    })(u.default);
    i.default = n, l.exports = i.default;
  })(Er, Er.exports)), Er.exports;
}
var du;
function mf() {
  return du || (du = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(Aa()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.TAG, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(kr, kr.exports)), kr.exports;
}
var Ar = { exports: {} }, pu;
function yf() {
  return pu || (pu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ft()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.STRING, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Ar, Ar.exports)), Ar.exports;
}
var Cr = { exports: {} }, hu;
function wf() {
  return hu || (hu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(Ea()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(a) {
        var s;
        return s = e.call(this, a) || this, s.type = p.PSEUDO, s;
      }
      var n = t.prototype;
      return n.toString = function() {
        var s = this.length ? "(" + this.map(String).join(",") + ")" : "";
        return [this.rawSpaceBefore, this.stringifyProperty("value"), s, this.rawSpaceAfter].join("");
      }, t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Cr, Cr.exports)), Cr.exports;
}
var pi = {}, vu;
function bf() {
  return vu || (vu = 1, (function(l) {
    l.__esModule = !0, l.default = void 0, l.unescapeValue = c;
    var i = o(nt()), v = o(cf()), p = o(Aa()), u = Ve(), f;
    function o(h) {
      return h && h.__esModule ? h : { default: h };
    }
    function d(h, O) {
      for (var C = 0; C < O.length; C++) {
        var T = O[C];
        T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(h, T.key, T);
      }
    }
    function e(h, O, C) {
      return O && d(h.prototype, O), Object.defineProperty(h, "prototype", { writable: !1 }), h;
    }
    function t(h, O) {
      h.prototype = Object.create(O.prototype), h.prototype.constructor = h, n(h, O);
    }
    function n(h, O) {
      return n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(T, w) {
        return T.__proto__ = w, T;
      }, n(h, O);
    }
    var a = ya(), s = /^('|")([^]*)\1$/, g = a(function() {
    }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead."), b = a(function() {
    }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead."), r = a(function() {
    }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
    function c(h) {
      var O = !1, C = null, T = h, w = T.match(s);
      return w && (C = w[1], T = w[2]), T = (0, v.default)(T), T !== h && (O = !0), {
        deprecatedUsage: O,
        unescaped: T,
        quoteMark: C
      };
    }
    function _(h) {
      if (h.quoteMark !== void 0 || h.value === void 0)
        return h;
      r();
      var O = c(h.value), C = O.quoteMark, T = O.unescaped;
      return h.raws || (h.raws = {}), h.raws.value === void 0 && (h.raws.value = h.value), h.value = T, h.quoteMark = C, h;
    }
    var m = /* @__PURE__ */ (function(h) {
      t(O, h);
      function O(T) {
        var w;
        return T === void 0 && (T = {}), w = h.call(this, _(T)) || this, w.type = u.ATTRIBUTE, w.raws = w.raws || {}, Object.defineProperty(w.raws, "unquoted", {
          get: a(function() {
            return w.value;
          }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
          set: a(function() {
            return w.value;
          }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
        }), w._constructed = !0, w;
      }
      var C = O.prototype;
      return C.getQuotedValue = function(w) {
        w === void 0 && (w = {});
        var P = this._determineQuoteMark(w), N = y[P], D = (0, i.default)(this._value, N);
        return D;
      }, C._determineQuoteMark = function(w) {
        return w.smart ? this.smartQuoteMark(w) : this.preferredQuoteMark(w);
      }, C.setValue = function(w, P) {
        P === void 0 && (P = {}), this._value = w, this._quoteMark = this._determineQuoteMark(P), this._syncRawValue();
      }, C.smartQuoteMark = function(w) {
        var P = this.value, N = P.replace(/[^']/g, "").length, D = P.replace(/[^"]/g, "").length;
        if (N + D === 0) {
          var B = (0, i.default)(P, {
            isIdentifier: !0
          });
          if (B === P)
            return O.NO_QUOTE;
          var k = this.preferredQuoteMark(w);
          if (k === O.NO_QUOTE) {
            var A = this.quoteMark || w.quoteMark || O.DOUBLE_QUOTE, R = y[A], I = (0, i.default)(P, R);
            if (I.length < B.length)
              return A;
          }
          return k;
        } else return D === N ? this.preferredQuoteMark(w) : D < N ? O.DOUBLE_QUOTE : O.SINGLE_QUOTE;
      }, C.preferredQuoteMark = function(w) {
        var P = w.preferCurrentQuoteMark ? this.quoteMark : w.quoteMark;
        return P === void 0 && (P = w.preferCurrentQuoteMark ? w.quoteMark : this.quoteMark), P === void 0 && (P = O.DOUBLE_QUOTE), P;
      }, C._syncRawValue = function() {
        var w = (0, i.default)(this._value, y[this.quoteMark]);
        w === this._value ? this.raws && delete this.raws.value : this.raws.value = w;
      }, C._handleEscapes = function(w, P) {
        if (this._constructed) {
          var N = (0, i.default)(P, {
            isIdentifier: !0
          });
          N !== P ? this.raws[w] = N : delete this.raws[w];
        }
      }, C._spacesFor = function(w) {
        var P = {
          before: "",
          after: ""
        }, N = this.spaces[w] || {}, D = this.raws.spaces && this.raws.spaces[w] || {};
        return Object.assign(P, N, D);
      }, C._stringFor = function(w, P, N) {
        P === void 0 && (P = w), N === void 0 && (N = S);
        var D = this._spacesFor(P);
        return N(this.stringifyProperty(w), D);
      }, C.offsetOf = function(w) {
        var P = 1, N = this._spacesFor("attribute");
        if (P += N.before.length, w === "namespace" || w === "ns")
          return this.namespace ? P : -1;
        if (w === "attributeNS" || (P += this.namespaceString.length, this.namespace && (P += 1), w === "attribute"))
          return P;
        P += this.stringifyProperty("attribute").length, P += N.after.length;
        var D = this._spacesFor("operator");
        P += D.before.length;
        var B = this.stringifyProperty("operator");
        if (w === "operator")
          return B ? P : -1;
        P += B.length, P += D.after.length;
        var k = this._spacesFor("value");
        P += k.before.length;
        var A = this.stringifyProperty("value");
        if (w === "value")
          return A ? P : -1;
        P += A.length, P += k.after.length;
        var R = this._spacesFor("insensitive");
        return P += R.before.length, w === "insensitive" && this.insensitive ? P : -1;
      }, C.toString = function() {
        var w = this, P = [this.rawSpaceBefore, "["];
        return P.push(this._stringFor("qualifiedAttribute", "attribute")), this.operator && (this.value || this.value === "") && (P.push(this._stringFor("operator")), P.push(this._stringFor("value")), P.push(this._stringFor("insensitiveFlag", "insensitive", function(N, D) {
          return N.length > 0 && !w.quoted && D.before.length === 0 && !(w.spaces.value && w.spaces.value.after) && (D.before = " "), S(N, D);
        }))), P.push("]"), P.push(this.rawSpaceAfter), P.join("");
      }, e(O, [{
        key: "quoted",
        get: function() {
          var w = this.quoteMark;
          return w === "'" || w === '"';
        },
        set: function(w) {
          b();
        }
        /**
         * returns a single (`'`) or double (`"`) quote character if the value is quoted.
         * returns `null` if the value is not quoted.
         * returns `undefined` if the quotation state is unknown (this can happen when
         * the attribute is constructed without specifying a quote mark.)
         */
      }, {
        key: "quoteMark",
        get: function() {
          return this._quoteMark;
        },
        set: function(w) {
          if (!this._constructed) {
            this._quoteMark = w;
            return;
          }
          this._quoteMark !== w && (this._quoteMark = w, this._syncRawValue());
        }
      }, {
        key: "qualifiedAttribute",
        get: function() {
          return this.qualifiedName(this.raws.attribute || this.attribute);
        }
      }, {
        key: "insensitiveFlag",
        get: function() {
          return this.insensitive ? "i" : "";
        }
      }, {
        key: "value",
        get: function() {
          return this._value;
        },
        set: (
          /**
           * Before 3.0, the value had to be set to an escaped value including any wrapped
           * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
           * is unescaped during parsing and any quote marks are removed.
           *
           * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
           * a deprecation warning is raised when the new value contains any characters that would
           * require escaping (including if it contains wrapped quotes).
           *
           * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
           * how the new value is quoted.
           */
          function(w) {
            if (this._constructed) {
              var P = c(w), N = P.deprecatedUsage, D = P.unescaped, B = P.quoteMark;
              if (N && g(), D === this._value && B === this._quoteMark)
                return;
              this._value = D, this._quoteMark = B, this._syncRawValue();
            } else
              this._value = w;
          }
        )
      }, {
        key: "insensitive",
        get: function() {
          return this._insensitive;
        },
        set: function(w) {
          w || (this._insensitive = !1, this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i") && (this.raws.insensitiveFlag = void 0)), this._insensitive = w;
        }
      }, {
        key: "attribute",
        get: function() {
          return this._attribute;
        },
        set: function(w) {
          this._handleEscapes("attribute", w), this._attribute = w;
        }
      }]), O;
    })(p.default);
    l.default = m, m.NO_QUOTE = null, m.SINGLE_QUOTE = "'", m.DOUBLE_QUOTE = '"';
    var y = (f = {
      "'": {
        quotes: "single",
        wrap: !0
      },
      '"': {
        quotes: "double",
        wrap: !0
      }
    }, f[null] = {
      isIdentifier: !0
    }, f);
    function S(h, O) {
      return "" + O.before + h + O.after;
    }
  })(pi)), pi;
}
var Rr = { exports: {} }, gu;
function _f() {
  return gu || (gu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(Aa()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.UNIVERSAL, a.value = "*", a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Rr, Rr.exports)), Rr.exports;
}
var Ir = { exports: {} }, mu;
function Sf() {
  return mu || (mu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ft()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.COMBINATOR, a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Ir, Ir.exports)), Ir.exports;
}
var Mr = { exports: {} }, yu;
function Of() {
  return yu || (yu = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = u(ft()), p = Ve();
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function f(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, o(e, t);
    }
    function o(e, t) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
        return a.__proto__ = s, a;
      }, o(e, t);
    }
    var d = /* @__PURE__ */ (function(e) {
      f(t, e);
      function t(n) {
        var a;
        return a = e.call(this, n) || this, a.type = p.NESTING, a.value = "&", a;
      }
      return t;
    })(v.default);
    i.default = d, l.exports = i.default;
  })(Mr, Mr.exports)), Mr.exports;
}
var Dr = { exports: {} }, wu;
function Hc() {
  return wu || (wu = 1, (function(l, i) {
    i.__esModule = !0, i.default = v;
    function v(p) {
      return p.sort(function(u, f) {
        return u - f;
      });
    }
    l.exports = i.default;
  })(Dr, Dr.exports)), Dr.exports;
}
var hi = {}, le = {}, bu;
function xf() {
  if (bu) return le;
  bu = 1, le.__esModule = !0, le.word = le.tilde = le.tab = le.str = le.space = le.slash = le.singleQuote = le.semicolon = le.plus = le.pipe = le.openSquare = le.openParenthesis = le.newline = le.greaterThan = le.feed = le.equals = le.doubleQuote = le.dollar = le.cr = le.comment = le.comma = le.combinator = le.colon = le.closeSquare = le.closeParenthesis = le.caret = le.bang = le.backslash = le.at = le.asterisk = le.ampersand = void 0;
  var l = 38;
  le.ampersand = l;
  var i = 42;
  le.asterisk = i;
  var v = 64;
  le.at = v;
  var p = 44;
  le.comma = p;
  var u = 58;
  le.colon = u;
  var f = 59;
  le.semicolon = f;
  var o = 40;
  le.openParenthesis = o;
  var d = 41;
  le.closeParenthesis = d;
  var e = 91;
  le.openSquare = e;
  var t = 93;
  le.closeSquare = t;
  var n = 36;
  le.dollar = n;
  var a = 126;
  le.tilde = a;
  var s = 94;
  le.caret = s;
  var g = 43;
  le.plus = g;
  var b = 61;
  le.equals = b;
  var r = 124;
  le.pipe = r;
  var c = 62;
  le.greaterThan = c;
  var _ = 32;
  le.space = _;
  var m = 39;
  le.singleQuote = m;
  var y = 34;
  le.doubleQuote = y;
  var S = 47;
  le.slash = S;
  var h = 33;
  le.bang = h;
  var O = 92;
  le.backslash = O;
  var C = 13;
  le.cr = C;
  var T = 12;
  le.feed = T;
  var w = 10;
  le.newline = w;
  var P = 9;
  le.tab = P;
  var N = m;
  le.str = N;
  var D = -1;
  le.comment = D;
  var B = -2;
  le.word = B;
  var k = -3;
  return le.combinator = k, le;
}
var _u;
function Jc() {
  return _u || (_u = 1, (function(l) {
    l.__esModule = !0, l.FIELDS = void 0, l.default = b;
    var i = f(xf()), v, p;
    function u(r) {
      if (typeof WeakMap != "function") return null;
      var c = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap();
      return (u = function(y) {
        return y ? _ : c;
      })(r);
    }
    function f(r, c) {
      if (r && r.__esModule)
        return r;
      if (r === null || typeof r != "object" && typeof r != "function")
        return { default: r };
      var _ = u(c);
      if (_ && _.has(r))
        return _.get(r);
      var m = {}, y = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var S in r)
        if (S !== "default" && Object.prototype.hasOwnProperty.call(r, S)) {
          var h = y ? Object.getOwnPropertyDescriptor(r, S) : null;
          h && (h.get || h.set) ? Object.defineProperty(m, S, h) : m[S] = r[S];
        }
      return m.default = r, _ && _.set(r, m), m;
    }
    for (var o = (v = {}, v[i.tab] = !0, v[i.newline] = !0, v[i.cr] = !0, v[i.feed] = !0, v), d = (p = {}, p[i.space] = !0, p[i.tab] = !0, p[i.newline] = !0, p[i.cr] = !0, p[i.feed] = !0, p[i.ampersand] = !0, p[i.asterisk] = !0, p[i.bang] = !0, p[i.comma] = !0, p[i.colon] = !0, p[i.semicolon] = !0, p[i.openParenthesis] = !0, p[i.closeParenthesis] = !0, p[i.openSquare] = !0, p[i.closeSquare] = !0, p[i.singleQuote] = !0, p[i.doubleQuote] = !0, p[i.plus] = !0, p[i.pipe] = !0, p[i.tilde] = !0, p[i.greaterThan] = !0, p[i.equals] = !0, p[i.dollar] = !0, p[i.caret] = !0, p[i.slash] = !0, p), e = {}, t = "0123456789abcdefABCDEF", n = 0; n < t.length; n++)
      e[t.charCodeAt(n)] = !0;
    function a(r, c) {
      var _ = c, m;
      do {
        if (m = r.charCodeAt(_), d[m])
          return _ - 1;
        m === i.backslash ? _ = s(r, _) + 1 : _++;
      } while (_ < r.length);
      return _ - 1;
    }
    function s(r, c) {
      var _ = c, m = r.charCodeAt(_ + 1);
      if (!o[m]) if (e[m]) {
        var y = 0;
        do
          _++, y++, m = r.charCodeAt(_ + 1);
        while (e[m] && y < 6);
        y < 6 && m === i.space && _++;
      } else
        _++;
      return _;
    }
    var g = {
      TYPE: 0,
      START_LINE: 1,
      START_COL: 2,
      END_LINE: 3,
      END_COL: 4,
      START_POS: 5,
      END_POS: 6
    };
    l.FIELDS = g;
    function b(r) {
      var c = [], _ = r.css.valueOf(), m = _, y = m.length, S = -1, h = 1, O = 0, C = 0, T, w, P, N, D, B, k, A, R, I, W, Q, z;
      function L(F, M) {
        if (r.safe)
          _ += M, R = _.length - 1;
        else
          throw r.error("Unclosed " + F, h, O - S, O);
      }
      for (; O < y; ) {
        switch (T = _.charCodeAt(O), T === i.newline && (S = O, h += 1), T) {
          case i.space:
          case i.tab:
          case i.newline:
          case i.cr:
          case i.feed:
            R = O;
            do
              R += 1, T = _.charCodeAt(R), T === i.newline && (S = R, h += 1);
            while (T === i.space || T === i.newline || T === i.tab || T === i.cr || T === i.feed);
            z = i.space, N = h, P = R - S - 1, C = R;
            break;
          case i.plus:
          case i.greaterThan:
          case i.tilde:
          case i.pipe:
            R = O;
            do
              R += 1, T = _.charCodeAt(R);
            while (T === i.plus || T === i.greaterThan || T === i.tilde || T === i.pipe);
            z = i.combinator, N = h, P = O - S, C = R;
            break;
          // Consume these characters as single tokens.
          case i.asterisk:
          case i.ampersand:
          case i.bang:
          case i.comma:
          case i.equals:
          case i.dollar:
          case i.caret:
          case i.openSquare:
          case i.closeSquare:
          case i.colon:
          case i.semicolon:
          case i.openParenthesis:
          case i.closeParenthesis:
            R = O, z = T, N = h, P = O - S, C = R + 1;
            break;
          case i.singleQuote:
          case i.doubleQuote:
            Q = T === i.singleQuote ? "'" : '"', R = O;
            do
              for (D = !1, R = _.indexOf(Q, R + 1), R === -1 && L("quote", Q), B = R; _.charCodeAt(B - 1) === i.backslash; )
                B -= 1, D = !D;
            while (D);
            z = i.str, N = h, P = O - S, C = R + 1;
            break;
          default:
            T === i.slash && _.charCodeAt(O + 1) === i.asterisk ? (R = _.indexOf("*/", O + 2) + 1, R === 0 && L("comment", "*/"), w = _.slice(O, R + 1), A = w.split(`
`), k = A.length - 1, k > 0 ? (I = h + k, W = R - A[k].length) : (I = h, W = S), z = i.comment, h = I, N = I, P = R - W) : T === i.slash ? (R = O, z = T, N = h, P = O - S, C = R + 1) : (R = a(_, O), z = i.word, N = h, P = R - S), C = R + 1;
            break;
        }
        c.push([
          z,
          // [0] Token type
          h,
          // [1] Starting line
          O - S,
          // [2] Starting column
          N,
          // [3] Ending line
          P,
          // [4] Ending column
          O,
          // [5] Start position / Source index
          C
          // [6] End position
        ]), W && (S = W, W = null), O = C;
      }
      return c;
    }
  })(hi)), hi;
}
var Su;
function Kc() {
  return Su || (Su = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = C(df()), p = C(pf()), u = C(hf()), f = C(vf()), o = C(gf()), d = C(mf()), e = C(yf()), t = C(wf()), n = O(bf()), a = C(_f()), s = C(Sf()), g = C(Of()), b = C(Hc()), r = O(Jc()), c = O(xf()), _ = O(Ve()), m = Yr(), y, S;
    function h(L) {
      if (typeof WeakMap != "function") return null;
      var F = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap();
      return (h = function(q) {
        return q ? M : F;
      })(L);
    }
    function O(L, F) {
      if (L && L.__esModule)
        return L;
      if (L === null || typeof L != "object" && typeof L != "function")
        return { default: L };
      var M = h(F);
      if (M && M.has(L))
        return M.get(L);
      var E = {}, q = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var G in L)
        if (G !== "default" && Object.prototype.hasOwnProperty.call(L, G)) {
          var x = q ? Object.getOwnPropertyDescriptor(L, G) : null;
          x && (x.get || x.set) ? Object.defineProperty(E, G, x) : E[G] = L[G];
        }
      return E.default = L, M && M.set(L, E), E;
    }
    function C(L) {
      return L && L.__esModule ? L : { default: L };
    }
    function T(L, F) {
      for (var M = 0; M < F.length; M++) {
        var E = F[M];
        E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(L, E.key, E);
      }
    }
    function w(L, F, M) {
      return F && T(L.prototype, F), Object.defineProperty(L, "prototype", { writable: !1 }), L;
    }
    var P = (y = {}, y[c.space] = !0, y[c.cr] = !0, y[c.feed] = !0, y[c.newline] = !0, y[c.tab] = !0, y), N = Object.assign({}, P, (S = {}, S[c.comment] = !0, S));
    function D(L) {
      return {
        line: L[r.FIELDS.START_LINE],
        column: L[r.FIELDS.START_COL]
      };
    }
    function B(L) {
      return {
        line: L[r.FIELDS.END_LINE],
        column: L[r.FIELDS.END_COL]
      };
    }
    function k(L, F, M, E) {
      return {
        start: {
          line: L,
          column: F
        },
        end: {
          line: M,
          column: E
        }
      };
    }
    function A(L) {
      return k(L[r.FIELDS.START_LINE], L[r.FIELDS.START_COL], L[r.FIELDS.END_LINE], L[r.FIELDS.END_COL]);
    }
    function R(L, F) {
      if (L)
        return k(L[r.FIELDS.START_LINE], L[r.FIELDS.START_COL], F[r.FIELDS.END_LINE], F[r.FIELDS.END_COL]);
    }
    function I(L, F) {
      var M = L[F];
      if (typeof M == "string")
        return M.indexOf("\\") !== -1 && ((0, m.ensureObject)(L, "raws"), L[F] = (0, m.unesc)(M), L.raws[F] === void 0 && (L.raws[F] = M)), L;
    }
    function W(L, F) {
      for (var M = -1, E = []; (M = L.indexOf(F, M + 1)) !== -1; )
        E.push(M);
      return E;
    }
    function Q() {
      var L = Array.prototype.concat.apply([], arguments);
      return L.filter(function(F, M) {
        return M === L.indexOf(F);
      });
    }
    var z = /* @__PURE__ */ (function() {
      function L(M, E) {
        E === void 0 && (E = {}), this.rule = M, this.options = Object.assign({
          lossy: !1,
          safe: !1
        }, E), this.position = 0, this.css = typeof this.rule == "string" ? this.rule : this.rule.selector, this.tokens = (0, r.default)({
          css: this.css,
          error: this._errorGenerator(),
          safe: this.options.safe
        });
        var q = R(this.tokens[0], this.tokens[this.tokens.length - 1]);
        this.root = new v.default({
          source: q
        }), this.root.errorGenerator = this._errorGenerator();
        var G = new p.default({
          source: {
            start: {
              line: 1,
              column: 1
            }
          },
          sourceIndex: 0
        });
        this.root.append(G), this.current = G, this.loop();
      }
      var F = L.prototype;
      return F._errorGenerator = function() {
        var E = this;
        return function(q, G) {
          return typeof E.rule == "string" ? new Error(q) : E.rule.error(q, G);
        };
      }, F.attribute = function() {
        var E = [], q = this.currToken;
        for (this.position++; this.position < this.tokens.length && this.currToken[r.FIELDS.TYPE] !== c.closeSquare; )
          E.push(this.currToken), this.position++;
        if (this.currToken[r.FIELDS.TYPE] !== c.closeSquare)
          return this.expected("closing square bracket", this.currToken[r.FIELDS.START_POS]);
        var G = E.length, x = {
          source: k(q[1], q[2], this.currToken[3], this.currToken[4]),
          sourceIndex: q[r.FIELDS.START_POS]
        };
        if (G === 1 && !~[c.word].indexOf(E[0][r.FIELDS.TYPE]))
          return this.expected("attribute", E[0][r.FIELDS.START_POS]);
        for (var $ = 0, V = "", Y = "", U = null, K = !1; $ < G; ) {
          var X = E[$], j = this.content(X), Z = E[$ + 1];
          switch (X[r.FIELDS.TYPE]) {
            case c.space:
              if (K = !0, this.options.lossy)
                break;
              if (U) {
                (0, m.ensureObject)(x, "spaces", U);
                var fe = x.spaces[U].after || "";
                x.spaces[U].after = fe + j;
                var ve = (0, m.getProp)(x, "raws", "spaces", U, "after") || null;
                ve && (x.raws.spaces[U].after = ve + j);
              } else
                V = V + j, Y = Y + j;
              break;
            case c.asterisk:
              if (Z[r.FIELDS.TYPE] === c.equals)
                x.operator = j, U = "operator";
              else if ((!x.namespace || U === "namespace" && !K) && Z) {
                V && ((0, m.ensureObject)(x, "spaces", "attribute"), x.spaces.attribute.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "attribute"), x.raws.spaces.attribute.before = V, Y = ""), x.namespace = (x.namespace || "") + j;
                var de = (0, m.getProp)(x, "raws", "namespace") || null;
                de && (x.raws.namespace += j), U = "namespace";
              }
              K = !1;
              break;
            case c.dollar:
              if (U === "value") {
                var ne = (0, m.getProp)(x, "raws", "value");
                x.value += "$", ne && (x.raws.value = ne + "$");
                break;
              }
            // Falls through
            case c.caret:
              Z[r.FIELDS.TYPE] === c.equals && (x.operator = j, U = "operator"), K = !1;
              break;
            case c.combinator:
              if (j === "~" && Z[r.FIELDS.TYPE] === c.equals && (x.operator = j, U = "operator"), j !== "|") {
                K = !1;
                break;
              }
              Z[r.FIELDS.TYPE] === c.equals ? (x.operator = j, U = "operator") : !x.namespace && !x.attribute && (x.namespace = !0), K = !1;
              break;
            case c.word:
              if (Z && this.content(Z) === "|" && E[$ + 2] && E[$ + 2][r.FIELDS.TYPE] !== c.equals && // this look-ahead probably fails with comment nodes involved.
              !x.operator && !x.namespace)
                x.namespace = j, U = "namespace";
              else if (!x.attribute || U === "attribute" && !K) {
                V && ((0, m.ensureObject)(x, "spaces", "attribute"), x.spaces.attribute.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "attribute"), x.raws.spaces.attribute.before = Y, Y = ""), x.attribute = (x.attribute || "") + j;
                var we = (0, m.getProp)(x, "raws", "attribute") || null;
                we && (x.raws.attribute += j), U = "attribute";
              } else if (!x.value && x.value !== "" || U === "value" && !(K || x.quoteMark)) {
                var J = (0, m.unesc)(j), H = (0, m.getProp)(x, "raws", "value") || "", re = x.value || "";
                x.value = re + J, x.quoteMark = null, (J !== j || H) && ((0, m.ensureObject)(x, "raws"), x.raws.value = (H || re) + j), U = "value";
              } else {
                var te = j === "i" || j === "I";
                (x.value || x.value === "") && (x.quoteMark || K) ? (x.insensitive = te, (!te || j === "I") && ((0, m.ensureObject)(x, "raws"), x.raws.insensitiveFlag = j), U = "insensitive", V && ((0, m.ensureObject)(x, "spaces", "insensitive"), x.spaces.insensitive.before = V, V = ""), Y && ((0, m.ensureObject)(x, "raws", "spaces", "insensitive"), x.raws.spaces.insensitive.before = Y, Y = "")) : (x.value || x.value === "") && (U = "value", x.value += j, x.raws.value && (x.raws.value += j));
              }
              K = !1;
              break;
            case c.str:
              if (!x.attribute || !x.operator)
                return this.error("Expected an attribute followed by an operator preceding the string.", {
                  index: X[r.FIELDS.START_POS]
                });
              var ee = (0, n.unescapeValue)(j), ae = ee.unescaped, ce = ee.quoteMark;
              x.value = ae, x.quoteMark = ce, U = "value", (0, m.ensureObject)(x, "raws"), x.raws.value = j, K = !1;
              break;
            case c.equals:
              if (!x.attribute)
                return this.expected("attribute", X[r.FIELDS.START_POS], j);
              if (x.value)
                return this.error('Unexpected "=" found; an operator was already defined.', {
                  index: X[r.FIELDS.START_POS]
                });
              x.operator = x.operator ? x.operator + j : j, U = "operator", K = !1;
              break;
            case c.comment:
              if (U)
                if (K || Z && Z[r.FIELDS.TYPE] === c.space || U === "insensitive") {
                  var xe = (0, m.getProp)(x, "spaces", U, "after") || "", pe = (0, m.getProp)(x, "raws", "spaces", U, "after") || xe;
                  (0, m.ensureObject)(x, "raws", "spaces", U), x.raws.spaces[U].after = pe + j;
                } else {
                  var ke = x[U] || "", me = (0, m.getProp)(x, "raws", U) || ke;
                  (0, m.ensureObject)(x, "raws"), x.raws[U] = me + j;
                }
              else
                Y = Y + j;
              break;
            default:
              return this.error('Unexpected "' + j + '" found.', {
                index: X[r.FIELDS.START_POS]
              });
          }
          $++;
        }
        I(x, "attribute"), I(x, "namespace"), this.newNode(new n.default(x)), this.position++;
      }, F.parseWhitespaceEquivalentTokens = function(E) {
        E < 0 && (E = this.tokens.length);
        var q = this.position, G = [], x = "", $ = void 0;
        do
          if (P[this.currToken[r.FIELDS.TYPE]])
            this.options.lossy || (x += this.content());
          else if (this.currToken[r.FIELDS.TYPE] === c.comment) {
            var V = {};
            x && (V.before = x, x = ""), $ = new f.default({
              value: this.content(),
              source: A(this.currToken),
              sourceIndex: this.currToken[r.FIELDS.START_POS],
              spaces: V
            }), G.push($);
          }
        while (++this.position < E);
        if (x) {
          if ($)
            $.spaces.after = x;
          else if (!this.options.lossy) {
            var Y = this.tokens[q], U = this.tokens[this.position - 1];
            G.push(new e.default({
              value: "",
              source: k(Y[r.FIELDS.START_LINE], Y[r.FIELDS.START_COL], U[r.FIELDS.END_LINE], U[r.FIELDS.END_COL]),
              sourceIndex: Y[r.FIELDS.START_POS],
              spaces: {
                before: x,
                after: ""
              }
            }));
          }
        }
        return G;
      }, F.convertWhitespaceNodesToSpace = function(E, q) {
        var G = this;
        q === void 0 && (q = !1);
        var x = "", $ = "";
        E.forEach(function(Y) {
          var U = G.lossySpace(Y.spaces.before, q), K = G.lossySpace(Y.rawSpaceBefore, q);
          x += U + G.lossySpace(Y.spaces.after, q && U.length === 0), $ += U + Y.value + G.lossySpace(Y.rawSpaceAfter, q && K.length === 0);
        }), $ === x && ($ = void 0);
        var V = {
          space: x,
          rawSpace: $
        };
        return V;
      }, F.isNamedCombinator = function(E) {
        return E === void 0 && (E = this.position), this.tokens[E + 0] && this.tokens[E + 0][r.FIELDS.TYPE] === c.slash && this.tokens[E + 1] && this.tokens[E + 1][r.FIELDS.TYPE] === c.word && this.tokens[E + 2] && this.tokens[E + 2][r.FIELDS.TYPE] === c.slash;
      }, F.namedCombinator = function() {
        if (this.isNamedCombinator()) {
          var E = this.content(this.tokens[this.position + 1]), q = (0, m.unesc)(E).toLowerCase(), G = {};
          q !== E && (G.value = "/" + E + "/");
          var x = new s.default({
            value: "/" + q + "/",
            source: k(this.currToken[r.FIELDS.START_LINE], this.currToken[r.FIELDS.START_COL], this.tokens[this.position + 2][r.FIELDS.END_LINE], this.tokens[this.position + 2][r.FIELDS.END_COL]),
            sourceIndex: this.currToken[r.FIELDS.START_POS],
            raws: G
          });
          return this.position = this.position + 3, x;
        } else
          this.unexpected();
      }, F.combinator = function() {
        var E = this;
        if (this.content() === "|")
          return this.namespace();
        var q = this.locateNextMeaningfulToken(this.position);
        if (q < 0 || this.tokens[q][r.FIELDS.TYPE] === c.comma || this.tokens[q][r.FIELDS.TYPE] === c.closeParenthesis) {
          var G = this.parseWhitespaceEquivalentTokens(q);
          if (G.length > 0) {
            var x = this.current.last;
            if (x) {
              var $ = this.convertWhitespaceNodesToSpace(G), V = $.space, Y = $.rawSpace;
              Y !== void 0 && (x.rawSpaceAfter += Y), x.spaces.after += V;
            } else
              G.forEach(function(H) {
                return E.newNode(H);
              });
          }
          return;
        }
        var U = this.currToken, K = void 0;
        q > this.position && (K = this.parseWhitespaceEquivalentTokens(q));
        var X;
        if (this.isNamedCombinator() ? X = this.namedCombinator() : this.currToken[r.FIELDS.TYPE] === c.combinator ? (X = new s.default({
          value: this.content(),
          source: A(this.currToken),
          sourceIndex: this.currToken[r.FIELDS.START_POS]
        }), this.position++) : P[this.currToken[r.FIELDS.TYPE]] || K || this.unexpected(), X) {
          if (K) {
            var j = this.convertWhitespaceNodesToSpace(K), Z = j.space, fe = j.rawSpace;
            X.spaces.before = Z, X.rawSpaceBefore = fe;
          }
        } else {
          var ve = this.convertWhitespaceNodesToSpace(K, !0), de = ve.space, ne = ve.rawSpace;
          ne || (ne = de);
          var we = {}, J = {
            spaces: {}
          };
          de.endsWith(" ") && ne.endsWith(" ") ? (we.before = de.slice(0, de.length - 1), J.spaces.before = ne.slice(0, ne.length - 1)) : de.startsWith(" ") && ne.startsWith(" ") ? (we.after = de.slice(1), J.spaces.after = ne.slice(1)) : J.value = ne, X = new s.default({
            value: " ",
            source: R(U, this.tokens[this.position - 1]),
            sourceIndex: U[r.FIELDS.START_POS],
            spaces: we,
            raws: J
          });
        }
        return this.currToken && this.currToken[r.FIELDS.TYPE] === c.space && (X.spaces.after = this.optionalSpace(this.content()), this.position++), this.newNode(X);
      }, F.comma = function() {
        if (this.position === this.tokens.length - 1) {
          this.root.trailingComma = !0, this.position++;
          return;
        }
        this.current._inferEndPosition();
        var E = new p.default({
          source: {
            start: D(this.tokens[this.position + 1])
          },
          sourceIndex: this.tokens[this.position + 1][r.FIELDS.START_POS]
        });
        this.current.parent.append(E), this.current = E, this.position++;
      }, F.comment = function() {
        var E = this.currToken;
        this.newNode(new f.default({
          value: this.content(),
          source: A(E),
          sourceIndex: E[r.FIELDS.START_POS]
        })), this.position++;
      }, F.error = function(E, q) {
        throw this.root.error(E, q);
      }, F.missingBackslash = function() {
        return this.error("Expected a backslash preceding the semicolon.", {
          index: this.currToken[r.FIELDS.START_POS]
        });
      }, F.missingParenthesis = function() {
        return this.expected("opening parenthesis", this.currToken[r.FIELDS.START_POS]);
      }, F.missingSquareBracket = function() {
        return this.expected("opening square bracket", this.currToken[r.FIELDS.START_POS]);
      }, F.unexpected = function() {
        return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[r.FIELDS.START_POS]);
      }, F.unexpectedPipe = function() {
        return this.error("Unexpected '|'.", this.currToken[r.FIELDS.START_POS]);
      }, F.namespace = function() {
        var E = this.prevToken && this.content(this.prevToken) || !0;
        if (this.nextToken[r.FIELDS.TYPE] === c.word)
          return this.position++, this.word(E);
        if (this.nextToken[r.FIELDS.TYPE] === c.asterisk)
          return this.position++, this.universal(E);
        this.unexpectedPipe();
      }, F.nesting = function() {
        if (this.nextToken) {
          var E = this.content(this.nextToken);
          if (E === "|") {
            this.position++;
            return;
          }
        }
        var q = this.currToken;
        this.newNode(new g.default({
          value: this.content(),
          source: A(q),
          sourceIndex: q[r.FIELDS.START_POS]
        })), this.position++;
      }, F.parentheses = function() {
        var E = this.current.last, q = 1;
        if (this.position++, E && E.type === _.PSEUDO) {
          var G = new p.default({
            source: {
              start: D(this.tokens[this.position])
            },
            sourceIndex: this.tokens[this.position][r.FIELDS.START_POS]
          }), x = this.current;
          for (E.append(G), this.current = G; this.position < this.tokens.length && q; )
            this.currToken[r.FIELDS.TYPE] === c.openParenthesis && q++, this.currToken[r.FIELDS.TYPE] === c.closeParenthesis && q--, q ? this.parse() : (this.current.source.end = B(this.currToken), this.current.parent.source.end = B(this.currToken), this.position++);
          this.current = x;
        } else {
          for (var $ = this.currToken, V = "(", Y; this.position < this.tokens.length && q; )
            this.currToken[r.FIELDS.TYPE] === c.openParenthesis && q++, this.currToken[r.FIELDS.TYPE] === c.closeParenthesis && q--, Y = this.currToken, V += this.parseParenthesisToken(this.currToken), this.position++;
          E ? E.appendToPropertyAndEscape("value", V, V) : this.newNode(new e.default({
            value: V,
            source: k($[r.FIELDS.START_LINE], $[r.FIELDS.START_COL], Y[r.FIELDS.END_LINE], Y[r.FIELDS.END_COL]),
            sourceIndex: $[r.FIELDS.START_POS]
          }));
        }
        if (q)
          return this.expected("closing parenthesis", this.currToken[r.FIELDS.START_POS]);
      }, F.pseudo = function() {
        for (var E = this, q = "", G = this.currToken; this.currToken && this.currToken[r.FIELDS.TYPE] === c.colon; )
          q += this.content(), this.position++;
        if (!this.currToken)
          return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
        if (this.currToken[r.FIELDS.TYPE] === c.word)
          this.splitWord(!1, function(x, $) {
            q += x, E.newNode(new t.default({
              value: q,
              source: R(G, E.currToken),
              sourceIndex: G[r.FIELDS.START_POS]
            })), $ > 1 && E.nextToken && E.nextToken[r.FIELDS.TYPE] === c.openParenthesis && E.error("Misplaced parenthesis.", {
              index: E.nextToken[r.FIELDS.START_POS]
            });
          });
        else
          return this.expected(["pseudo-class", "pseudo-element"], this.currToken[r.FIELDS.START_POS]);
      }, F.space = function() {
        var E = this.content();
        this.position === 0 || this.prevToken[r.FIELDS.TYPE] === c.comma || this.prevToken[r.FIELDS.TYPE] === c.openParenthesis || this.current.nodes.every(function(q) {
          return q.type === "comment";
        }) ? (this.spaces = this.optionalSpace(E), this.position++) : this.position === this.tokens.length - 1 || this.nextToken[r.FIELDS.TYPE] === c.comma || this.nextToken[r.FIELDS.TYPE] === c.closeParenthesis ? (this.current.last.spaces.after = this.optionalSpace(E), this.position++) : this.combinator();
      }, F.string = function() {
        var E = this.currToken;
        this.newNode(new e.default({
          value: this.content(),
          source: A(E),
          sourceIndex: E[r.FIELDS.START_POS]
        })), this.position++;
      }, F.universal = function(E) {
        var q = this.nextToken;
        if (q && this.content(q) === "|")
          return this.position++, this.namespace();
        var G = this.currToken;
        this.newNode(new a.default({
          value: this.content(),
          source: A(G),
          sourceIndex: G[r.FIELDS.START_POS]
        }), E), this.position++;
      }, F.splitWord = function(E, q) {
        for (var G = this, x = this.nextToken, $ = this.content(); x && ~[c.dollar, c.caret, c.equals, c.word].indexOf(x[r.FIELDS.TYPE]); ) {
          this.position++;
          var V = this.content();
          if ($ += V, V.lastIndexOf("\\") === V.length - 1) {
            var Y = this.nextToken;
            Y && Y[r.FIELDS.TYPE] === c.space && ($ += this.requiredSpace(this.content(Y)), this.position++);
          }
          x = this.nextToken;
        }
        var U = W($, ".").filter(function(Z) {
          var fe = $[Z - 1] === "\\", ve = /^\d+\.\d+%$/.test($);
          return !fe && !ve;
        }), K = W($, "#").filter(function(Z) {
          return $[Z - 1] !== "\\";
        }), X = W($, "#{");
        X.length && (K = K.filter(function(Z) {
          return !~X.indexOf(Z);
        }));
        var j = (0, b.default)(Q([0].concat(U, K)));
        j.forEach(function(Z, fe) {
          var ve = j[fe + 1] || $.length, de = $.slice(Z, ve);
          if (fe === 0 && q)
            return q.call(G, de, j.length);
          var ne, we = G.currToken, J = we[r.FIELDS.START_POS] + j[fe], H = k(we[1], we[2] + Z, we[3], we[2] + (ve - 1));
          if (~U.indexOf(Z)) {
            var re = {
              value: de.slice(1),
              source: H,
              sourceIndex: J
            };
            ne = new u.default(I(re, "value"));
          } else if (~K.indexOf(Z)) {
            var te = {
              value: de.slice(1),
              source: H,
              sourceIndex: J
            };
            ne = new o.default(I(te, "value"));
          } else {
            var ee = {
              value: de,
              source: H,
              sourceIndex: J
            };
            I(ee, "value"), ne = new d.default(ee);
          }
          G.newNode(ne, E), E = null;
        }), this.position++;
      }, F.word = function(E) {
        var q = this.nextToken;
        return q && this.content(q) === "|" ? (this.position++, this.namespace()) : this.splitWord(E);
      }, F.loop = function() {
        for (; this.position < this.tokens.length; )
          this.parse(!0);
        return this.current._inferEndPosition(), this.root;
      }, F.parse = function(E) {
        switch (this.currToken[r.FIELDS.TYPE]) {
          case c.space:
            this.space();
            break;
          case c.comment:
            this.comment();
            break;
          case c.openParenthesis:
            this.parentheses();
            break;
          case c.closeParenthesis:
            E && this.missingParenthesis();
            break;
          case c.openSquare:
            this.attribute();
            break;
          case c.dollar:
          case c.caret:
          case c.equals:
          case c.word:
            this.word();
            break;
          case c.colon:
            this.pseudo();
            break;
          case c.comma:
            this.comma();
            break;
          case c.asterisk:
            this.universal();
            break;
          case c.ampersand:
            this.nesting();
            break;
          case c.slash:
          case c.combinator:
            this.combinator();
            break;
          case c.str:
            this.string();
            break;
          // These cases throw; no break needed.
          case c.closeSquare:
            this.missingSquareBracket();
          case c.semicolon:
            this.missingBackslash();
          default:
            this.unexpected();
        }
      }, F.expected = function(E, q, G) {
        if (Array.isArray(E)) {
          var x = E.pop();
          E = E.join(", ") + " or " + x;
        }
        var $ = /^[aeiou]/.test(E[0]) ? "an" : "a";
        return G ? this.error("Expected " + $ + " " + E + ', found "' + G + '" instead.', {
          index: q
        }) : this.error("Expected " + $ + " " + E + ".", {
          index: q
        });
      }, F.requiredSpace = function(E) {
        return this.options.lossy ? " " : E;
      }, F.optionalSpace = function(E) {
        return this.options.lossy ? "" : E;
      }, F.lossySpace = function(E, q) {
        return this.options.lossy ? q ? " " : "" : E;
      }, F.parseParenthesisToken = function(E) {
        var q = this.content(E);
        return E[r.FIELDS.TYPE] === c.space ? this.requiredSpace(q) : q;
      }, F.newNode = function(E, q) {
        return q && (/^ +$/.test(q) && (this.options.lossy || (this.spaces = (this.spaces || "") + q), q = !0), E.namespace = q, I(E, "namespace")), this.spaces && (E.spaces.before = this.spaces, this.spaces = ""), this.current.append(E);
      }, F.content = function(E) {
        return E === void 0 && (E = this.currToken), this.css.slice(E[r.FIELDS.START_POS], E[r.FIELDS.END_POS]);
      }, F.locateNextMeaningfulToken = function(E) {
        E === void 0 && (E = this.position + 1);
        for (var q = E; q < this.tokens.length; )
          if (N[this.tokens[q][r.FIELDS.TYPE]]) {
            q++;
            continue;
          } else
            return q;
        return -1;
      }, w(L, [{
        key: "currToken",
        get: function() {
          return this.tokens[this.position];
        }
      }, {
        key: "nextToken",
        get: function() {
          return this.tokens[this.position + 1];
        }
      }, {
        key: "prevToken",
        get: function() {
          return this.tokens[this.position - 1];
        }
      }]), L;
    })();
    i.default = z, l.exports = i.default;
  })(vr, vr.exports)), vr.exports;
}
var Ou;
function Xc() {
  return Ou || (Ou = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = p(Kc());
    function p(f) {
      return f && f.__esModule ? f : { default: f };
    }
    var u = /* @__PURE__ */ (function() {
      function f(d, e) {
        this.func = d || function() {
        }, this.funcRes = null, this.options = e;
      }
      var o = f.prototype;
      return o._shouldUpdateSelector = function(e, t) {
        t === void 0 && (t = {});
        var n = Object.assign({}, this.options, t);
        return n.updateSelector === !1 ? !1 : typeof e != "string";
      }, o._isLossy = function(e) {
        e === void 0 && (e = {});
        var t = Object.assign({}, this.options, e);
        return t.lossless === !1;
      }, o._root = function(e, t) {
        t === void 0 && (t = {});
        var n = new v.default(e, this._parseOptions(t));
        return n.root;
      }, o._parseOptions = function(e) {
        return {
          lossy: this._isLossy(e)
        };
      }, o._run = function(e, t) {
        var n = this;
        return t === void 0 && (t = {}), new Promise(function(a, s) {
          try {
            var g = n._root(e, t);
            Promise.resolve(n.func(g)).then(function(b) {
              var r = void 0;
              return n._shouldUpdateSelector(e, t) && (r = g.toString(), e.selector = r), {
                transform: b,
                root: g,
                string: r
              };
            }).then(a, s);
          } catch (b) {
            s(b);
            return;
          }
        });
      }, o._runSync = function(e, t) {
        t === void 0 && (t = {});
        var n = this._root(e, t), a = this.func(n);
        if (a && typeof a.then == "function")
          throw new Error("Selector processor returned a promise to a synchronous call.");
        var s = void 0;
        return t.updateSelector && typeof e != "string" && (s = n.toString(), e.selector = s), {
          transform: a,
          root: n,
          string: s
        };
      }, o.ast = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.root;
        });
      }, o.astSync = function(e, t) {
        return this._runSync(e, t).root;
      }, o.transform = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.transform;
        });
      }, o.transformSync = function(e, t) {
        return this._runSync(e, t).transform;
      }, o.process = function(e, t) {
        return this._run(e, t).then(function(n) {
          return n.string || n.root.toString();
        });
      }, o.processSync = function(e, t) {
        var n = this._runSync(e, t);
        return n.string || n.root.toString();
      }, f;
    })();
    i.default = u, l.exports = i.default;
  })(hr, hr.exports)), hr.exports;
}
var vi = {}, Fe = {}, xu;
function Zc() {
  if (xu) return Fe;
  xu = 1, Fe.__esModule = !0, Fe.universal = Fe.tag = Fe.string = Fe.selector = Fe.root = Fe.pseudo = Fe.nesting = Fe.id = Fe.comment = Fe.combinator = Fe.className = Fe.attribute = void 0;
  var l = s(bf()), i = s(hf()), v = s(Sf()), p = s(vf()), u = s(gf()), f = s(Of()), o = s(wf()), d = s(df()), e = s(pf()), t = s(yf()), n = s(mf()), a = s(_f());
  function s(w) {
    return w && w.__esModule ? w : { default: w };
  }
  var g = function(P) {
    return new l.default(P);
  };
  Fe.attribute = g;
  var b = function(P) {
    return new i.default(P);
  };
  Fe.className = b;
  var r = function(P) {
    return new v.default(P);
  };
  Fe.combinator = r;
  var c = function(P) {
    return new p.default(P);
  };
  Fe.comment = c;
  var _ = function(P) {
    return new u.default(P);
  };
  Fe.id = _;
  var m = function(P) {
    return new f.default(P);
  };
  Fe.nesting = m;
  var y = function(P) {
    return new o.default(P);
  };
  Fe.pseudo = y;
  var S = function(P) {
    return new d.default(P);
  };
  Fe.root = S;
  var h = function(P) {
    return new e.default(P);
  };
  Fe.selector = h;
  var O = function(P) {
    return new t.default(P);
  };
  Fe.string = O;
  var C = function(P) {
    return new n.default(P);
  };
  Fe.tag = C;
  var T = function(P) {
    return new a.default(P);
  };
  return Fe.universal = T, Fe;
}
var Ce = {}, Pu;
function ed() {
  if (Pu) return Ce;
  Pu = 1, Ce.__esModule = !0, Ce.isComment = Ce.isCombinator = Ce.isClassName = Ce.isAttribute = void 0, Ce.isContainer = y, Ce.isIdentifier = void 0, Ce.isNamespace = S, Ce.isNesting = void 0, Ce.isNode = p, Ce.isPseudo = void 0, Ce.isPseudoClass = m, Ce.isPseudoElement = _, Ce.isUniversal = Ce.isTag = Ce.isString = Ce.isSelector = Ce.isRoot = void 0;
  var l = Ve(), i, v = (i = {}, i[l.ATTRIBUTE] = !0, i[l.CLASS] = !0, i[l.COMBINATOR] = !0, i[l.COMMENT] = !0, i[l.ID] = !0, i[l.NESTING] = !0, i[l.PSEUDO] = !0, i[l.ROOT] = !0, i[l.SELECTOR] = !0, i[l.STRING] = !0, i[l.TAG] = !0, i[l.UNIVERSAL] = !0, i);
  function p(h) {
    return typeof h == "object" && v[h.type];
  }
  function u(h, O) {
    return p(O) && O.type === h;
  }
  var f = u.bind(null, l.ATTRIBUTE);
  Ce.isAttribute = f;
  var o = u.bind(null, l.CLASS);
  Ce.isClassName = o;
  var d = u.bind(null, l.COMBINATOR);
  Ce.isCombinator = d;
  var e = u.bind(null, l.COMMENT);
  Ce.isComment = e;
  var t = u.bind(null, l.ID);
  Ce.isIdentifier = t;
  var n = u.bind(null, l.NESTING);
  Ce.isNesting = n;
  var a = u.bind(null, l.PSEUDO);
  Ce.isPseudo = a;
  var s = u.bind(null, l.ROOT);
  Ce.isRoot = s;
  var g = u.bind(null, l.SELECTOR);
  Ce.isSelector = g;
  var b = u.bind(null, l.STRING);
  Ce.isString = b;
  var r = u.bind(null, l.TAG);
  Ce.isTag = r;
  var c = u.bind(null, l.UNIVERSAL);
  Ce.isUniversal = c;
  function _(h) {
    return a(h) && h.value && (h.value.startsWith("::") || h.value.toLowerCase() === ":before" || h.value.toLowerCase() === ":after" || h.value.toLowerCase() === ":first-letter" || h.value.toLowerCase() === ":first-line");
  }
  function m(h) {
    return a(h) && !_(h);
  }
  function y(h) {
    return !!(p(h) && h.walk);
  }
  function S(h) {
    return f(h) || r(h);
  }
  return Ce;
}
var Tu;
function td() {
  return Tu || (Tu = 1, (function(l) {
    l.__esModule = !0;
    var i = Ve();
    Object.keys(i).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === i[u] || (l[u] = i[u]);
    });
    var v = Zc();
    Object.keys(v).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === v[u] || (l[u] = v[u]);
    });
    var p = ed();
    Object.keys(p).forEach(function(u) {
      u === "default" || u === "__esModule" || u in l && l[u] === p[u] || (l[u] = p[u]);
    });
  })(vi)), vi;
}
var ku;
function rd() {
  return ku || (ku = 1, (function(l, i) {
    i.__esModule = !0, i.default = void 0;
    var v = o(Xc()), p = f(td());
    function u(t) {
      if (typeof WeakMap != "function") return null;
      var n = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap();
      return (u = function(g) {
        return g ? a : n;
      })(t);
    }
    function f(t, n) {
      if (t && t.__esModule)
        return t;
      if (t === null || typeof t != "object" && typeof t != "function")
        return { default: t };
      var a = u(n);
      if (a && a.has(t))
        return a.get(t);
      var s = {}, g = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var b in t)
        if (b !== "default" && Object.prototype.hasOwnProperty.call(t, b)) {
          var r = g ? Object.getOwnPropertyDescriptor(t, b) : null;
          r && (r.get || r.set) ? Object.defineProperty(s, b, r) : s[b] = t[b];
        }
      return s.default = t, a && a.set(t, s), s;
    }
    function o(t) {
      return t && t.__esModule ? t : { default: t };
    }
    var d = function(n) {
      return new v.default(n);
    };
    Object.assign(d, p), delete d.__esModule;
    var e = d;
    i.default = e, l.exports = i.default;
  })(pr, pr.exports)), pr.exports;
}
var Eu;
function nd() {
  if (Eu) return dr.exports;
  Eu = 1;
  const { AtRule: l, Rule: i } = Je();
  let v = rd();
  function p(_, m) {
    let y;
    try {
      v((S) => {
        y = S;
      }).processSync(_);
    } catch (S) {
      throw _.includes(":") ? m ? m.error("Missed semicolon") : S : m ? m.error(S.message) : S;
    }
    return y.at(0);
  }
  function u(_, m) {
    let y = !1;
    return _.each((S) => {
      if (S.type === "nesting") {
        let h = m.clone({});
        S.value !== "&" ? S.replaceWith(
          p(S.value.replace("&", h.toString()))
        ) : S.replaceWith(h), y = !0;
      } else "nodes" in S && S.nodes && u(S, m) && (y = !0);
    }), y;
  }
  function f(_, m) {
    let y = [];
    return _.selectors.forEach((S) => {
      let h = p(S, _);
      m.selectors.forEach((O) => {
        if (!O)
          return;
        let C = p(O, m);
        u(C, h) || (C.prepend(v.combinator({ value: " " })), C.prepend(h.clone({}))), y.push(C.toString());
      });
    }), y;
  }
  function o(_, m) {
    let y = _.prev();
    for (m.after(_); y && y.type === "comment"; ) {
      let S = y.prev();
      m.after(y), y = S;
    }
    return _;
  }
  function d(_) {
    return function m(y, S, h, O = h) {
      let C = [];
      if (S.each((T) => {
        T.type === "rule" && h ? O && (T.selectors = f(y, T)) : T.type === "atrule" && T.nodes ? _[T.name] ? m(y, T, O) : S[g] !== !1 && C.push(T) : C.push(T);
      }), h && C.length) {
        let T = y.clone({ nodes: [] });
        for (let w of C)
          T.append(w);
        S.prepend(T);
      }
    };
  }
  function e(_, m, y) {
    let S = new i({
      nodes: [],
      selector: _
    });
    return S.append(m), y.after(S), S;
  }
  function t(_, m) {
    let y = {};
    for (let S of _)
      y[S] = !0;
    if (m)
      for (let S of m)
        y[S.replace(/^@/, "")] = !0;
    return y;
  }
  function n(_) {
    _ = _.trim();
    let m = _.match(/^\((.*)\)$/);
    if (!m)
      return { selector: _, type: "basic" };
    let y = m[1].match(/^(with(?:out)?):(.+)$/);
    if (y) {
      let S = y[1] === "with", h = Object.fromEntries(
        y[2].trim().split(/\s+/).map((C) => [C, !0])
      );
      if (S && h.all)
        return { type: "noop" };
      let O = (C) => !!h[C];
      return h.all ? O = () => !0 : S && (O = (C) => C === "all" ? !1 : !h[C]), {
        escapes: O,
        type: "withrules"
      };
    }
    return { type: "unknown" };
  }
  function a(_) {
    let m = [], y = _.parent;
    for (; y && y instanceof l; )
      m.push(y), y = y.parent;
    return m;
  }
  function s(_) {
    let m = _[b];
    if (!m)
      _.after(_.nodes);
    else {
      let y = _.nodes, S, h = -1, O, C, T, w = a(_);
      if (w.forEach((P, N) => {
        if (m(P.name))
          S = P, h = N, C = T;
        else {
          let D = T;
          T = P.clone({ nodes: [] }), D && T.append(D), O = O || T;
        }
      }), S ? C ? (O.append(y), S.after(C)) : S.after(y) : _.after(y), _.next() && S) {
        let P;
        w.slice(0, h + 1).forEach((N, D, B) => {
          let k = P;
          P = N.clone({ nodes: [] }), k && P.append(k);
          let A = [], I = (B[D - 1] || _).next();
          for (; I; )
            A.push(I), I = I.next();
          P.append(A);
        }), P && (C || y[y.length - 1]).after(P);
      }
    }
    _.remove();
  }
  const g = Symbol("rootRuleMergeSel"), b = Symbol("rootRuleEscapes");
  function r(_) {
    let { params: m } = _, { escapes: y, selector: S, type: h } = n(m);
    if (h === "unknown")
      throw _.error(
        `Unknown @${_.name} parameter ${JSON.stringify(m)}`
      );
    if (h === "basic" && S) {
      let O = new i({ nodes: _.nodes, selector: S });
      _.removeAll(), _.append(O);
    }
    _[b] = y, _[g] = y ? !y("all") : h === "noop";
  }
  const c = Symbol("hasRootRule");
  return dr.exports = (_ = {}) => {
    let m = t(
      ["media", "supports", "layer", "container", "starting-style"],
      _.bubble
    ), y = d(m), S = t(
      [
        "document",
        "font-face",
        "keyframes",
        "-webkit-keyframes",
        "-moz-keyframes"
      ],
      _.unwrap
    ), h = (_.rootRuleName || "at-root").replace(/^@/, ""), O = _.preserveEmpty;
    return {
      Once(C) {
        C.walkAtRules(h, (T) => {
          r(T), C[c] = !0;
        });
      },
      postcssPlugin: "postcss-nested",
      RootExit(C) {
        C[c] && (C.walkAtRules(h, s), C[c] = !1);
      },
      Rule(C) {
        let T = !1, w = C, P = !1, N = [];
        C.each((D) => {
          D.type === "rule" ? (N.length && (w = e(C.selector, N, w), N = []), P = !0, T = !0, D.selectors = f(C, D), w = o(D, w)) : D.type === "atrule" ? (N.length && (w = e(C.selector, N, w), N = []), D.name === h ? (T = !0, y(C, D, !0, D[g]), w = o(D, w)) : m[D.name] ? (P = !0, T = !0, y(C, D, !0), w = o(D, w)) : S[D.name] ? (P = !0, T = !0, y(C, D, !1), w = o(D, w)) : P && N.push(D)) : D.type === "decl" && P && N.push(D);
        }), N.length && (w = e(C.selector, N, w)), T && O !== !0 && (C.raws.semicolon = !0, C.nodes.length === 0 && C.remove());
      }
    };
  }, dr.exports.postcss = !0, dr.exports;
}
var gi, Au;
function id() {
  if (Au) return gi;
  Au = 1;
  var l = /-(\w|$)/g, i = function(u, f) {
    return f.toUpperCase();
  }, v = function(u) {
    return u = u.toLowerCase(), u === "float" ? "cssFloat" : u.charCodeAt(0) === 45 && u.charCodeAt(1) === 109 && u.charCodeAt(2) === 115 && u.charCodeAt(3) === 45 ? u.substr(1).replace(l, i) : u.replace(l, i);
  };
  return gi = v, gi;
}
var mi, Cu;
function Pf() {
  if (Cu) return mi;
  Cu = 1;
  let l = id(), i = {
    boxFlex: !0,
    boxFlexGroup: !0,
    columnCount: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    strokeDashoffset: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  };
  function v(u) {
    return typeof u.nodes > "u" ? !0 : p(u);
  }
  function p(u) {
    let f, o = {};
    return u.each((d) => {
      if (d.type === "atrule")
        f = "@" + d.name, d.params && (f += " " + d.params), typeof o[f] > "u" ? o[f] = v(d) : Array.isArray(o[f]) ? o[f].push(v(d)) : o[f] = [o[f], v(d)];
      else if (d.type === "rule") {
        let e = p(d);
        if (o[d.selector])
          for (let t in e)
            o[d.selector][t] = e[t];
        else
          o[d.selector] = e;
      } else if (d.type === "decl") {
        d.prop[0] === "-" && d.prop[1] === "-" || d.parent && d.parent.selector === ":export" ? f = d.prop : f = l(d.prop);
        let e = d.value;
        !isNaN(d.value) && i[f] && (e = parseFloat(d.value)), d.important && (e += " !important"), typeof o[f] > "u" ? o[f] = e : Array.isArray(o[f]) ? o[f].push(e) : o[f] = [o[f], e];
      }
    }), o;
  }
  return mi = p, mi;
}
var yi, Ru;
function Ca() {
  if (Ru) return yi;
  Ru = 1;
  let l = Je(), i = /\s*!important\s*$/i, v = {
    "box-flex": !0,
    "box-flex-group": !0,
    "column-count": !0,
    flex: !0,
    "flex-grow": !0,
    "flex-positive": !0,
    "flex-shrink": !0,
    "flex-negative": !0,
    "font-weight": !0,
    "line-clamp": !0,
    "line-height": !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    "tab-size": !0,
    widows: !0,
    "z-index": !0,
    zoom: !0,
    "fill-opacity": !0,
    "stroke-dashoffset": !0,
    "stroke-opacity": !0,
    "stroke-width": !0
  };
  function p(d) {
    return d.replace(/([A-Z])/g, "-$1").replace(/^ms-/, "-ms-").toLowerCase();
  }
  function u(d, e, t) {
    t === !1 || t === null || (e.startsWith("--") || (e = p(e)), typeof t == "number" && (t === 0 || v[e] ? t = t.toString() : t += "px"), e === "css-float" && (e = "float"), i.test(t) ? (t = t.replace(i, ""), d.push(l.decl({ prop: e, value: t, important: !0 }))) : d.push(l.decl({ prop: e, value: t })));
  }
  function f(d, e, t) {
    let n = l.atRule({ name: e[1], params: e[3] || "" });
    typeof t == "object" && (n.nodes = [], o(t, n)), d.push(n);
  }
  function o(d, e) {
    let t, n, a;
    for (t in d)
      if (n = d[t], !(n === null || typeof n > "u"))
        if (t[0] === "@") {
          let s = t.match(/@(\S+)(\s+([\W\w]*)\s*)?/);
          if (Array.isArray(n))
            for (let g of n)
              f(e, s, g);
          else
            f(e, s, n);
        } else if (Array.isArray(n))
          for (let s of n)
            u(e, t, s);
        else typeof n == "object" ? (a = l.rule({ selector: t }), o(n, a), e.push(a)) : u(e, t, n);
  }
  return yi = function(d) {
    let e = l.root();
    return o(d, e), e;
  }, yi;
}
var wi, Iu;
function Tf() {
  if (Iu) return wi;
  Iu = 1;
  let l = Pf();
  return wi = function(v) {
    return console && console.warn && v.warnings().forEach((p) => {
      let u = p.plugin || "PostCSS";
      console.warn(u + ": " + p.text);
    }), l(v.root);
  }, wi;
}
var bi, Mu;
function ad() {
  if (Mu) return bi;
  Mu = 1;
  let l = Je(), i = Tf(), v = Ca();
  return bi = function(u) {
    let f = l(u);
    return async (o) => {
      let d = await f.process(o, {
        parser: v,
        from: void 0
      });
      return i(d);
    };
  }, bi;
}
var _i, Du;
function sd() {
  if (Du) return _i;
  Du = 1;
  let l = Je(), i = Tf(), v = Ca();
  return _i = function(p) {
    let u = l(p);
    return (f) => {
      let o = u.process(f, { parser: v, from: void 0 });
      return i(o);
    };
  }, _i;
}
var Si, qu;
function od() {
  if (qu) return Si;
  qu = 1;
  let l = Pf(), i = Ca(), v = ad(), p = sd();
  return Si = {
    objectify: l,
    parse: i,
    async: v,
    sync: p
  }, Si;
}
var Lu;
function kf() {
  return Lu || (Lu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return f;
      }
    });
    const i = /* @__PURE__ */ u(Je()), v = /* @__PURE__ */ u(nd()), p = /* @__PURE__ */ u(od());
    function u(o) {
      return o && o.__esModule ? o : {
        default: o
      };
    }
    function f(o) {
      return Array.isArray(o) ? o.flatMap((d) => (0, i.default)([
        (0, v.default)({
          bubble: [
            "screen"
          ]
        })
      ]).process(d, {
        parser: p.default
      }).root.nodes) : f([
        o
      ]);
    }
  })(di)), di;
}
var Oi = {}, Nu;
function Ra() {
  return Nu || (Nu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(
      l,
      /**
      * @template {string | import('postcss-selector-parser').Root} T
      *
      * Prefix all classes in the selector with the given prefix
      *
      * It can take either a string or a selector AST and will return the same type
      *
      * @param {string} prefix
      * @param {T} selector
      * @param {boolean} prependNegative
      * @returns {T}
      */
      "default",
      {
        enumerable: !0,
        get: function() {
          return p;
        }
      }
    );
    const i = /* @__PURE__ */ v(lt());
    function v(u) {
      return u && u.__esModule ? u : {
        default: u
      };
    }
    function p(u, f, o = !1) {
      if (u === "")
        return f;
      let d = typeof f == "string" ? (0, i.default)().astSync(f) : f;
      return d.walkClasses((e) => {
        let t = e.value, n = o && t.startsWith("-");
        e.value = n ? `-${u}${t.slice(1)}` : `${u}${t}`;
      }), typeof f == "string" ? d.toString() : d;
    }
  })(Oi)), Oi;
}
var xi = {}, Fu;
function Qr() {
  return Fu || (Fu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(n, a) {
      for (var s in a) Object.defineProperty(n, s, {
        enumerable: !0,
        get: a[s]
      });
    }
    i(l, {
      env: function() {
        return v;
      },
      contextMap: function() {
        return p;
      },
      configContextMap: function() {
        return u;
      },
      contextSourcesMap: function() {
        return f;
      },
      sourceHashMap: function() {
        return o;
      },
      NOT_ON_DEMAND: function() {
        return d;
      },
      NONE: function() {
        return e;
      },
      resolveDebug: function() {
        return t;
      }
    });
    const v = typeof process < "u" ? {
      NODE_ENV: process.env.NODE_ENV,
      DEBUG: t(process.env.DEBUG)
    } : {
      NODE_ENV: "production",
      DEBUG: !1
    }, p = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), d = new String("*"), e = Symbol("__NONE__");
    function t(n) {
      if (n === void 0)
        return !1;
      if (n === "true" || n === "1")
        return !0;
      if (n === "false" || n === "0")
        return !1;
      if (n === "*")
        return !0;
      let a = n.split(",").map((s) => s.split(":")[0]);
      return a.includes("-tailwindcss") ? !1 : !!a.includes("tailwindcss");
    }
  })(xi)), xi;
}
var Pi = {}, Ti = {}, $u;
function mt() {
  return $u || ($u = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const i = /* @__PURE__ */ p(lt()), v = /* @__PURE__ */ p(Oa());
    function p(f) {
      return f && f.__esModule ? f : {
        default: f
      };
    }
    function u(f) {
      var o;
      let d = i.default.className();
      d.value = f;
      var e;
      return (0, v.default)((e = d == null || (o = d.raws) === null || o === void 0 ? void 0 : o.value) !== null && e !== void 0 ? e : d.value);
    }
  })(Ti)), Ti;
}
var ki = {}, Uu;
function Ia() {
  return Uu || (Uu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "movePseudos", {
      enumerable: !0,
      get: function() {
        return v;
      }
    });
    let i = {
      // Pseudo elements from the spec
      "::after": [
        "terminal",
        "jumpable"
      ],
      "::backdrop": [
        "terminal",
        "jumpable"
      ],
      "::before": [
        "terminal",
        "jumpable"
      ],
      "::cue": [
        "terminal"
      ],
      "::cue-region": [
        "terminal"
      ],
      "::first-letter": [
        "terminal",
        "jumpable"
      ],
      "::first-line": [
        "terminal",
        "jumpable"
      ],
      "::grammar-error": [
        "terminal"
      ],
      "::marker": [
        "terminal",
        "jumpable"
      ],
      "::part": [
        "terminal",
        "actionable"
      ],
      "::placeholder": [
        "terminal",
        "jumpable"
      ],
      "::selection": [
        "terminal",
        "jumpable"
      ],
      "::slotted": [
        "terminal"
      ],
      "::spelling-error": [
        "terminal"
      ],
      "::target-text": [
        "terminal"
      ],
      // Pseudo elements from the spec with special rules
      "::file-selector-button": [
        "terminal",
        "actionable"
      ],
      // Library-specific pseudo elements used by component libraries
      // These are Shadow DOM-like
      "::deep": [
        "actionable"
      ],
      "::v-deep": [
        "actionable"
      ],
      "::ng-deep": [
        "actionable"
      ],
      // Note: As a rule, double colons (::) should be used instead of a single colon
      // (:). This distinguishes pseudo-classes from pseudo-elements. However, since
      // this distinction was not present in older versions of the W3C spec, most
      // browsers support both syntaxes for the original pseudo-elements.
      ":after": [
        "terminal",
        "jumpable"
      ],
      ":before": [
        "terminal",
        "jumpable"
      ],
      ":first-letter": [
        "terminal",
        "jumpable"
      ],
      ":first-line": [
        "terminal",
        "jumpable"
      ],
      ":where": [],
      ":is": [],
      ":has": [],
      // The default value is used when the pseudo-element is not recognized
      // Because it's not recognized, we don't know if it's terminal or not
      // So we assume it can be moved AND can have user-action pseudo classes attached to it
      __default__: [
        "terminal",
        "actionable"
      ]
    };
    function v(e) {
      let [t] = p(e);
      return t.forEach(([n, a]) => n.removeChild(a)), e.nodes.push(...t.map(([, n]) => n)), e;
    }
    function p(e) {
      let t = [], n = null;
      for (let s of e.nodes)
        if (s.type === "combinator")
          t = t.filter(([, g]) => d(g).includes("jumpable")), n = null;
        else if (s.type === "pseudo") {
          f(s) ? (n = s, t.push([
            e,
            s,
            null
          ])) : n && o(s, n) ? t.push([
            e,
            s,
            n
          ]) : n = null;
          var a;
          for (let g of (a = s.nodes) !== null && a !== void 0 ? a : []) {
            let [b, r] = p(g);
            n = r || n, t.push(...b);
          }
        }
      return [
        t,
        n
      ];
    }
    function u(e) {
      return e.value.startsWith("::") || i[e.value] !== void 0;
    }
    function f(e) {
      return u(e) && d(e).includes("terminal");
    }
    function o(e, t) {
      return e.type !== "pseudo" || u(e) ? !1 : d(t).includes("actionable");
    }
    function d(e) {
      var t;
      return (t = i[e.value]) !== null && t !== void 0 ? t : i.__default__;
    }
  })(ki)), ki;
}
var Wu;
function Ef() {
  return Wu || (Wu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(c, _) {
      for (var m in _) Object.defineProperty(c, m, {
        enumerable: !0,
        get: _[m]
      });
    }
    i(l, {
      formatVariantSelector: function() {
        return n;
      },
      eliminateIrrelevantSelectors: function() {
        return g;
      },
      finalizeSelector: function() {
        return b;
      },
      handleMergePseudo: function() {
        return r;
      }
    });
    const v = /* @__PURE__ */ e(lt()), p = /* @__PURE__ */ e(Pa()), u = /* @__PURE__ */ e(mt()), f = /* @__PURE__ */ e(Ra()), o = Ia(), d = pt();
    function e(c) {
      return c && c.__esModule ? c : {
        default: c
      };
    }
    let t = ":merge";
    function n(c, { context: _, candidate: m }) {
      var y;
      let S = (y = _ == null ? void 0 : _.tailwindConfig.prefix) !== null && y !== void 0 ? y : "", h = c.map((C) => {
        let T = (0, v.default)().astSync(C.format);
        return {
          ...C,
          ast: C.respectPrefix ? (0, f.default)(S, T) : T
        };
      }), O = v.default.root({
        nodes: [
          v.default.selector({
            nodes: [
              v.default.className({
                value: (0, u.default)(m)
              })
            ]
          })
        ]
      });
      for (let { ast: C } of h)
        [O, C] = r(O, C), C.walkNesting((T) => T.replaceWith(...O.nodes[0].nodes)), O = C;
      return O;
    }
    function a(c) {
      let _ = [];
      for (; c.prev() && c.prev().type !== "combinator"; )
        c = c.prev();
      for (; c && c.type !== "combinator"; )
        _.push(c), c = c.next();
      return _;
    }
    function s(c) {
      return c.sort((_, m) => _.type === "tag" && m.type === "class" ? -1 : _.type === "class" && m.type === "tag" ? 1 : _.type === "class" && m.type === "pseudo" && m.value.startsWith("::") ? -1 : _.type === "pseudo" && _.value.startsWith("::") && m.type === "class" ? 1 : c.index(_) - c.index(m)), c;
    }
    function g(c, _) {
      let m = !1;
      c.walk((y) => {
        if (y.type === "class" && y.value === _)
          return m = !0, !1;
      }), m || c.remove();
    }
    function b(c, _, { context: m, candidate: y, base: S }) {
      var h, O;
      let C = (O = m == null || (h = m.tailwindConfig) === null || h === void 0 ? void 0 : h.separator) !== null && O !== void 0 ? O : ":";
      S = S ?? (0, d.splitAtTopLevelOnly)(y, C).pop();
      let T = (0, v.default)().astSync(c);
      if (T.walkClasses((D) => {
        D.raws && D.value.includes(S) && (D.raws.value = (0, u.default)((0, p.default)(D.raws.value)));
      }), T.each((D) => g(D, S)), T.length === 0)
        return null;
      let w = Array.isArray(_) ? n(_, {
        context: m,
        candidate: y
      }) : _;
      if (w === null)
        return T.toString();
      let P = v.default.comment({
        value: "/*__simple__*/"
      }), N = v.default.comment({
        value: "/*__simple__*/"
      });
      return T.walkClasses((D) => {
        if (D.value !== S)
          return;
        let B = D.parent, k = w.nodes[0].nodes;
        if (B.nodes.length === 1) {
          D.replaceWith(...k);
          return;
        }
        let A = a(D);
        B.insertBefore(A[0], P), B.insertAfter(A[A.length - 1], N);
        for (let I of k)
          B.insertBefore(A[0], I.clone());
        D.remove(), A = a(P);
        let R = B.index(P);
        B.nodes.splice(R, A.length, ...s(v.default.selector({
          nodes: A
        })).nodes), P.remove(), N.remove();
      }), T.walkPseudos((D) => {
        D.value === t && D.replaceWith(D.nodes);
      }), T.each((D) => (0, o.movePseudos)(D)), T.toString();
    }
    function r(c, _) {
      let m = [];
      return c.walkPseudos((y) => {
        y.value === t && m.push({
          pseudo: y,
          value: y.nodes[0].toString()
        });
      }), _.walkPseudos((y) => {
        if (y.value !== t)
          return;
        let S = y.nodes[0].toString(), h = m.find((w) => w.value === S);
        if (!h)
          return;
        let O = [], C = y.next();
        for (; C && C.type !== "combinator"; )
          O.push(C), C = C.next();
        let T = C;
        h.pseudo.parent.insertAfter(h.pseudo, v.default.selector({
          nodes: O.map((w) => w.clone())
        })), y.remove(), O.forEach((w) => w.remove()), T && T.type === "combinator" && T.remove();
      }), [
        c,
        _
      ];
    }
  })(Pi)), Pi;
}
var Ei = {}, zu;
function Af() {
  return zu || (zu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(e, t) {
      for (var n in t) Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
      });
    }
    i(l, {
      asClass: function() {
        return f;
      },
      default: function() {
        return o;
      },
      formatClass: function() {
        return d;
      }
    });
    const v = /* @__PURE__ */ u(mt()), p = /* @__PURE__ */ u(Oa());
    function u(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    function f(e) {
      return (0, p.default)(`.${(0, v.default)(e)}`);
    }
    function o(e, t) {
      return f(d(e, t));
    }
    function d(e, t) {
      return t === "DEFAULT" ? e : t === "-" || t === "-DEFAULT" ? `-${e}` : t.startsWith("-") ? `-${e}${t}` : t.startsWith("/") ? `${e}${t}` : `${e}-${t}`;
    }
  })(Ei)), Ei;
}
var Ai = {}, Ci = {}, Ri = {}, Bu;
function ud() {
  return Bu || (Bu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return p;
      }
    });
    const i = /* @__PURE__ */ v(zr());
    function v(u) {
      return u && u.__esModule ? u : {
        default: u
      };
    }
    function p(u, f = [
      [
        u,
        [
          u
        ]
      ]
    ], { filterDefault: o = !1, ...d } = {}) {
      let e = (0, i.default)(u);
      return function({ matchUtilities: t, theme: n }) {
        for (let s of f) {
          let g = Array.isArray(s[0]) ? s : [
            s
          ];
          var a;
          t(g.reduce((b, [r, c]) => Object.assign(b, {
            [r]: (_) => c.reduce((m, y) => Array.isArray(y) ? Object.assign(m, {
              [y[0]]: y[1]
            }) : Object.assign(m, {
              [y]: e(_)
            }), {})
          }), {}), {
            ...d,
            values: o ? Object.fromEntries(Object.entries((a = n(u)) !== null && a !== void 0 ? a : {}).filter(([b]) => b !== "DEFAULT")) : n(u)
          });
        }
      };
    }
  })(Ri)), Ri;
}
var Ii = {}, Vu;
function ld() {
  return Vu || (Vu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return a;
      }
    });
    const i = /* @__PURE__ */ new Set([
      "normal",
      "reverse",
      "alternate",
      "alternate-reverse"
    ]), v = /* @__PURE__ */ new Set([
      "running",
      "paused"
    ]), p = /* @__PURE__ */ new Set([
      "none",
      "forwards",
      "backwards",
      "both"
    ]), u = /* @__PURE__ */ new Set([
      "infinite"
    ]), f = /* @__PURE__ */ new Set([
      "linear",
      "ease",
      "ease-in",
      "ease-out",
      "ease-in-out",
      "step-start",
      "step-end"
    ]), o = [
      "cubic-bezier",
      "steps"
    ], d = /\,(?![^(]*\))/g, e = /\ +(?![^(]*\))/g, t = /^(-?[\d.]+m?s)$/, n = /^(\d+)$/;
    function a(s) {
      return s.split(d).map((b) => {
        let r = b.trim(), c = {
          value: r
        }, _ = r.split(e), m = /* @__PURE__ */ new Set();
        for (let y of _)
          !m.has("DIRECTIONS") && i.has(y) ? (c.direction = y, m.add("DIRECTIONS")) : !m.has("PLAY_STATES") && v.has(y) ? (c.playState = y, m.add("PLAY_STATES")) : !m.has("FILL_MODES") && p.has(y) ? (c.fillMode = y, m.add("FILL_MODES")) : !m.has("ITERATION_COUNTS") && (u.has(y) || n.test(y)) ? (c.iterationCount = y, m.add("ITERATION_COUNTS")) : !m.has("TIMING_FUNCTION") && f.has(y) || !m.has("TIMING_FUNCTION") && o.some((S) => y.startsWith(`${S}(`)) ? (c.timingFunction = y, m.add("TIMING_FUNCTION")) : !m.has("DURATION") && t.test(y) ? (c.duration = y, m.add("DURATION")) : !m.has("DELAY") && t.test(y) ? (c.delay = y, m.add("DELAY")) : m.has("NAME") ? (c.unknown || (c.unknown = []), c.unknown.push(y)) : (c.name = y, m.add("NAME"));
        return c;
      });
    }
  })(Ii)), Ii;
}
var Mi = {}, ju;
function fd() {
  return ju || (ju = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return v;
      }
    });
    const i = (p) => Object.assign({}, ...Object.entries(p ?? {}).flatMap(([u, f]) => typeof f == "object" ? Object.entries(i(f)).map(([o, d]) => ({
      [u + (o === "DEFAULT" ? "" : `-${o}`)]: d
    })) : [
      {
        [`${u}`]: f
      }
    ])), v = i;
  })(Mi)), Mi;
}
var Di = {}, Gu;
function Cf() {
  return Gu || (Gu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v) {
      return typeof v == "function" ? v({}) : v;
    }
  })(Di)), Di;
}
const cd = "3.4.10", dd = {
  version: cd
};
var qi = {}, Yu;
function pd() {
  return Yu || (Yu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "removeAlphaVariables", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v, p) {
      v.walkDecls((u) => {
        if (p.includes(u.prop)) {
          u.remove();
          return;
        }
        for (let f of p)
          u.value.includes(`/ var(${f})`) && (u.value = u.value.replace(`/ var(${f})`, ""));
      });
    }
  })(qi)), qi;
}
var Qu;
function hd() {
  return Qu || (Qu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(k, A) {
      for (var R in A) Object.defineProperty(k, R, {
        enumerable: !0,
        get: A[R]
      });
    }
    i(l, {
      variantPlugins: function() {
        return w;
      },
      corePlugins: function() {
        return B;
      }
    });
    const v = /* @__PURE__ */ O(We), p = /* @__PURE__ */ T(We), u = /* @__PURE__ */ O(Je()), f = /* @__PURE__ */ O(ud()), o = /* @__PURE__ */ O(_a()), d = /* @__PURE__ */ O(mt()), e = /* @__PURE__ */ O(ld()), t = /* @__PURE__ */ O(fd()), n = /* @__PURE__ */ T(Br()), a = /* @__PURE__ */ O(Cf()), s = /* @__PURE__ */ O(gt()), g = /* @__PURE__ */ O(zr()), b = dd, r = /* @__PURE__ */ O(ot()), c = ba(), _ = Jl(), m = pd(), y = dt(), S = Vr(), h = Ma();
    function O(k) {
      return k && k.__esModule ? k : {
        default: k
      };
    }
    function C(k) {
      if (typeof WeakMap != "function") return null;
      var A = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap();
      return (C = function(I) {
        return I ? R : A;
      })(k);
    }
    function T(k, A) {
      if (k && k.__esModule)
        return k;
      if (k === null || typeof k != "object" && typeof k != "function")
        return {
          default: k
        };
      var R = C(A);
      if (R && R.has(k))
        return R.get(k);
      var I = {}, W = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var Q in k)
        if (Q !== "default" && Object.prototype.hasOwnProperty.call(k, Q)) {
          var z = W ? Object.getOwnPropertyDescriptor(k, Q) : null;
          z && (z.get || z.set) ? Object.defineProperty(I, Q, z) : I[Q] = k[Q];
        }
      return I.default = k, R && R.set(k, I), I;
    }
    let w = {
      childVariant: ({ addVariant: k }) => {
        k("*", "& > *");
      },
      pseudoElementVariants: ({ addVariant: k }) => {
        k("first-letter", "&::first-letter"), k("first-line", "&::first-line"), k("marker", [
          ({ container: A }) => ((0, m.removeAlphaVariables)(A, [
            "--tw-text-opacity"
          ]), "& *::marker"),
          ({ container: A }) => ((0, m.removeAlphaVariables)(A, [
            "--tw-text-opacity"
          ]), "&::marker")
        ]), k("selection", [
          "& *::selection",
          "&::selection"
        ]), k("file", "&::file-selector-button"), k("placeholder", "&::placeholder"), k("backdrop", "&::backdrop"), k("before", ({ container: A }) => (A.walkRules((R) => {
          let I = !1;
          R.walkDecls("content", () => {
            I = !0;
          }), I || R.prepend(u.default.decl({
            prop: "content",
            value: "var(--tw-content)"
          }));
        }), "&::before")), k("after", ({ container: A }) => (A.walkRules((R) => {
          let I = !1;
          R.walkDecls("content", () => {
            I = !0;
          }), I || R.prepend(u.default.decl({
            prop: "content",
            value: "var(--tw-content)"
          }));
        }), "&::after"));
      },
      pseudoClassVariants: ({ addVariant: k, matchVariant: A, config: R, prefix: I }) => {
        let W = [
          // Positional
          [
            "first",
            "&:first-child"
          ],
          [
            "last",
            "&:last-child"
          ],
          [
            "only",
            "&:only-child"
          ],
          [
            "odd",
            "&:nth-child(odd)"
          ],
          [
            "even",
            "&:nth-child(even)"
          ],
          "first-of-type",
          "last-of-type",
          "only-of-type",
          // State
          [
            "visited",
            ({ container: z }) => ((0, m.removeAlphaVariables)(z, [
              "--tw-text-opacity",
              "--tw-border-opacity",
              "--tw-bg-opacity"
            ]), "&:visited")
          ],
          "target",
          [
            "open",
            "&[open]"
          ],
          // Forms
          "default",
          "checked",
          "indeterminate",
          "placeholder-shown",
          "autofill",
          "optional",
          "required",
          "valid",
          "invalid",
          "in-range",
          "out-of-range",
          "read-only",
          // Content
          "empty",
          // Interactive
          "focus-within",
          [
            "hover",
            (0, y.flagEnabled)(R(), "hoverOnlyWhenSupported") ? "@media (hover: hover) and (pointer: fine) { &:hover }" : "&:hover"
          ],
          "focus",
          "focus-visible",
          "active",
          "enabled",
          "disabled"
        ].map((z) => Array.isArray(z) ? z : [
          z,
          `&:${z}`
        ]);
        for (let [z, L] of W)
          k(z, (F) => typeof L == "function" ? L(F) : L);
        let Q = {
          group: (z, { modifier: L }) => L ? [
            `:merge(${I(".group")}\\/${(0, d.default)(L)})`,
            " &"
          ] : [
            `:merge(${I(".group")})`,
            " &"
          ],
          peer: (z, { modifier: L }) => L ? [
            `:merge(${I(".peer")}\\/${(0, d.default)(L)})`,
            " ~ &"
          ] : [
            `:merge(${I(".peer")})`,
            " ~ &"
          ]
        };
        for (let [z, L] of Object.entries(Q))
          A(z, (F = "", M) => {
            let E = (0, S.normalize)(typeof F == "function" ? F(M) : F);
            E.includes("&") || (E = "&" + E);
            let [q, G] = L("", M), x = null, $ = null, V = 0;
            for (let Y = 0; Y < E.length; ++Y) {
              let U = E[Y];
              U === "&" ? x = Y : U === "'" || U === '"' ? V += 1 : x !== null && U === " " && !V && ($ = Y);
            }
            return x !== null && $ === null && ($ = E.length), E.slice(0, x) + q + E.slice(x + 1, $) + G + E.slice($);
          }, {
            values: Object.fromEntries(W),
            [h.INTERNAL_FEATURES]: {
              respectPrefix: !1
            }
          });
      },
      directionVariants: ({ addVariant: k }) => {
        k("ltr", '&:where([dir="ltr"], [dir="ltr"] *)'), k("rtl", '&:where([dir="rtl"], [dir="rtl"] *)');
      },
      reducedMotionVariants: ({ addVariant: k }) => {
        k("motion-safe", "@media (prefers-reduced-motion: no-preference)"), k("motion-reduce", "@media (prefers-reduced-motion: reduce)");
      },
      darkVariants: ({ config: k, addVariant: A }) => {
        let [R, I = ".dark"] = [].concat(k("darkMode", "media"));
        if (R === !1 && (R = "media", r.default.warn("darkmode-false", [
          "The `darkMode` option in your Tailwind CSS configuration is set to `false`, which now behaves the same as `media`.",
          "Change `darkMode` to `media` or remove it entirely.",
          "https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration"
        ])), R === "variant") {
          let W;
          if (Array.isArray(I) || typeof I == "function" ? W = I : typeof I == "string" && (W = [
            I
          ]), Array.isArray(W))
            for (let Q of W)
              Q === ".dark" ? (R = !1, r.default.warn("darkmode-variant-without-selector", [
                "When using `variant` for `darkMode`, you must provide a selector.",
                'Example: `darkMode: ["variant", ".your-selector &"]`'
              ])) : Q.includes("&") || (R = !1, r.default.warn("darkmode-variant-without-ampersand", [
                "When using `variant` for `darkMode`, your selector must contain `&`.",
                'Example `darkMode: ["variant", ".your-selector &"]`'
              ]));
          I = W;
        }
        R === "selector" ? A("dark", `&:where(${I}, ${I} *)`) : R === "media" ? A("dark", "@media (prefers-color-scheme: dark)") : R === "variant" ? A("dark", I) : R === "class" && A("dark", `&:is(${I} *)`);
      },
      printVariant: ({ addVariant: k }) => {
        k("print", "@media print");
      },
      screenVariants: ({ theme: k, addVariant: A, matchVariant: R }) => {
        var I;
        let W = (I = k("screens")) !== null && I !== void 0 ? I : {}, Q = Object.values(W).every((K) => typeof K == "string"), z = (0, c.normalizeScreens)(k("screens")), L = /* @__PURE__ */ new Set([]);
        function F(K) {
          var X, j;
          return (j = (X = K.match(/(\D+)$/)) === null || X === void 0 ? void 0 : X[1]) !== null && j !== void 0 ? j : "(none)";
        }
        function M(K) {
          K !== void 0 && L.add(F(K));
        }
        function E(K) {
          return M(K), L.size === 1;
        }
        for (const K of z)
          for (const X of K.values)
            M(X.min), M(X.max);
        let q = L.size <= 1;
        function G(K) {
          return Object.fromEntries(z.filter((X) => (0, c.isScreenSortable)(X).result).map((X) => {
            let { min: j, max: Z } = X.values[0];
            if (Z !== void 0)
              return X;
            if (j !== void 0)
              return {
                ...X,
                not: !X.not
              };
          }).map((X) => [
            X.name,
            X
          ]));
        }
        function x(K) {
          return (X, j) => (0, c.compareScreens)(K, X.value, j.value);
        }
        let $ = x("max"), V = x("min");
        function Y(K) {
          return (X) => {
            if (Q)
              if (q) {
                if (typeof X == "string" && !E(X))
                  return r.default.warn("minmax-have-mixed-units", [
                    "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."
                  ]), [];
              } else return r.default.warn("mixed-screen-units", [
                "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."
              ]), [];
            else return r.default.warn("complex-screen-config", [
              "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing objects."
            ]), [];
            return [
              `@media ${(0, o.default)((0, c.toScreen)(X, K))}`
            ];
          };
        }
        R("max", Y("max"), {
          sort: $,
          values: Q ? G() : {}
        });
        let U = "min-screens";
        for (let K of z)
          A(K.name, `@media ${(0, o.default)(K)}`, {
            id: U,
            sort: Q && q ? V : void 0,
            value: K
          });
        R("min", Y("min"), {
          id: U,
          sort: V
        });
      },
      supportsVariants: ({ matchVariant: k, theme: A }) => {
        var R;
        k("supports", (I = "") => {
          let W = (0, S.normalize)(I), Q = /^\w*\s*\(/.test(W);
          return W = Q ? W.replace(/\b(and|or|not)\b/g, " $1 ") : W, Q ? `@supports ${W}` : (W.includes(":") || (W = `${W}: var(--tw)`), W.startsWith("(") && W.endsWith(")") || (W = `(${W})`), `@supports ${W}`);
        }, {
          values: (R = A("supports")) !== null && R !== void 0 ? R : {}
        });
      },
      hasVariants: ({ matchVariant: k, prefix: A }) => {
        k("has", (R) => `&:has(${(0, S.normalize)(R)})`, {
          values: {},
          [h.INTERNAL_FEATURES]: {
            respectPrefix: !1
          }
        }), k("group-has", (R, { modifier: I }) => I ? `:merge(${A(".group")}\\/${I}):has(${(0, S.normalize)(R)}) &` : `:merge(${A(".group")}):has(${(0, S.normalize)(R)}) &`, {
          values: {},
          [h.INTERNAL_FEATURES]: {
            respectPrefix: !1
          }
        }), k("peer-has", (R, { modifier: I }) => I ? `:merge(${A(".peer")}\\/${I}):has(${(0, S.normalize)(R)}) ~ &` : `:merge(${A(".peer")}):has(${(0, S.normalize)(R)}) ~ &`, {
          values: {},
          [h.INTERNAL_FEATURES]: {
            respectPrefix: !1
          }
        });
      },
      ariaVariants: ({ matchVariant: k, theme: A }) => {
        var R;
        k("aria", (Q) => `&[aria-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}]`, {
          values: (R = A("aria")) !== null && R !== void 0 ? R : {}
        });
        var I;
        k("group-aria", (Q, { modifier: z }) => z ? `:merge(.group\\/${z})[aria-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}] &` : `:merge(.group)[aria-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}] &`, {
          values: (I = A("aria")) !== null && I !== void 0 ? I : {}
        });
        var W;
        k("peer-aria", (Q, { modifier: z }) => z ? `:merge(.peer\\/${z})[aria-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}] ~ &` : `:merge(.peer)[aria-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}] ~ &`, {
          values: (W = A("aria")) !== null && W !== void 0 ? W : {}
        });
      },
      dataVariants: ({ matchVariant: k, theme: A }) => {
        var R;
        k("data", (Q) => `&[data-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}]`, {
          values: (R = A("data")) !== null && R !== void 0 ? R : {}
        });
        var I;
        k("group-data", (Q, { modifier: z }) => z ? `:merge(.group\\/${z})[data-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}] &` : `:merge(.group)[data-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}] &`, {
          values: (I = A("data")) !== null && I !== void 0 ? I : {}
        });
        var W;
        k("peer-data", (Q, { modifier: z }) => z ? `:merge(.peer\\/${z})[data-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}] ~ &` : `:merge(.peer)[data-${(0, S.normalizeAttributeSelectors)((0, S.normalize)(Q))}] ~ &`, {
          values: (W = A("data")) !== null && W !== void 0 ? W : {}
        });
      },
      orientationVariants: ({ addVariant: k }) => {
        k("portrait", "@media (orientation: portrait)"), k("landscape", "@media (orientation: landscape)");
      },
      prefersContrastVariants: ({ addVariant: k }) => {
        k("contrast-more", "@media (prefers-contrast: more)"), k("contrast-less", "@media (prefers-contrast: less)");
      },
      forcedColorsVariants: ({ addVariant: k }) => {
        k("forced-colors", "@media (forced-colors: active)");
      }
    }, P = [
      "translate(var(--tw-translate-x), var(--tw-translate-y))",
      "rotate(var(--tw-rotate))",
      "skewX(var(--tw-skew-x))",
      "skewY(var(--tw-skew-y))",
      "scaleX(var(--tw-scale-x))",
      "scaleY(var(--tw-scale-y))"
    ].join(" "), N = [
      "var(--tw-blur)",
      "var(--tw-brightness)",
      "var(--tw-contrast)",
      "var(--tw-grayscale)",
      "var(--tw-hue-rotate)",
      "var(--tw-invert)",
      "var(--tw-saturate)",
      "var(--tw-sepia)",
      "var(--tw-drop-shadow)"
    ].join(" "), D = [
      "var(--tw-backdrop-blur)",
      "var(--tw-backdrop-brightness)",
      "var(--tw-backdrop-contrast)",
      "var(--tw-backdrop-grayscale)",
      "var(--tw-backdrop-hue-rotate)",
      "var(--tw-backdrop-invert)",
      "var(--tw-backdrop-opacity)",
      "var(--tw-backdrop-saturate)",
      "var(--tw-backdrop-sepia)"
    ].join(" "), B = {
      preflight: ({ addBase: k }) => {
        let A = u.default.parse(v.default.readFileSync(p.join(__dirname, "./css/preflight.css"), "utf8"));
        k([
          u.default.comment({
            text: `! tailwindcss v${b.version} | MIT License | https://tailwindcss.com`
          }),
          ...A.nodes
        ]);
      },
      container: /* @__PURE__ */ (() => {
        function k(R = []) {
          return R.flatMap((I) => I.values.map((W) => W.min)).filter((I) => I !== void 0);
        }
        function A(R, I, W) {
          if (typeof W > "u")
            return [];
          if (!(typeof W == "object" && W !== null))
            return [
              {
                screen: "DEFAULT",
                minWidth: 0,
                padding: W
              }
            ];
          let Q = [];
          W.DEFAULT && Q.push({
            screen: "DEFAULT",
            minWidth: 0,
            padding: W.DEFAULT
          });
          for (let z of R)
            for (let L of I)
              for (let { min: F } of L.values)
                F === z && Q.push({
                  minWidth: z,
                  padding: W[L.name]
                });
          return Q;
        }
        return function({ addComponents: R, theme: I }) {
          let W = (0, c.normalizeScreens)(I("container.screens", I("screens"))), Q = k(W), z = A(Q, W, I("container.padding")), L = (M) => {
            let E = z.find((q) => q.minWidth === M);
            return E ? {
              paddingRight: E.padding,
              paddingLeft: E.padding
            } : {};
          }, F = Array.from(new Set(Q.slice().sort((M, E) => parseInt(M) - parseInt(E)))).map((M) => ({
            [`@media (min-width: ${M})`]: {
              ".container": {
                "max-width": M,
                ...L(M)
              }
            }
          }));
          R([
            {
              ".container": Object.assign({
                width: "100%"
              }, I("container.center", !1) ? {
                marginRight: "auto",
                marginLeft: "auto"
              } : {}, L(0))
            },
            ...F
          ]);
        };
      })(),
      accessibility: ({ addUtilities: k }) => {
        k({
          ".sr-only": {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0"
          },
          ".not-sr-only": {
            position: "static",
            width: "auto",
            height: "auto",
            padding: "0",
            margin: "0",
            overflow: "visible",
            clip: "auto",
            whiteSpace: "normal"
          }
        });
      },
      pointerEvents: ({ addUtilities: k }) => {
        k({
          ".pointer-events-none": {
            "pointer-events": "none"
          },
          ".pointer-events-auto": {
            "pointer-events": "auto"
          }
        });
      },
      visibility: ({ addUtilities: k }) => {
        k({
          ".visible": {
            visibility: "visible"
          },
          ".invisible": {
            visibility: "hidden"
          },
          ".collapse": {
            visibility: "collapse"
          }
        });
      },
      position: ({ addUtilities: k }) => {
        k({
          ".static": {
            position: "static"
          },
          ".fixed": {
            position: "fixed"
          },
          ".absolute": {
            position: "absolute"
          },
          ".relative": {
            position: "relative"
          },
          ".sticky": {
            position: "sticky"
          }
        });
      },
      inset: (0, f.default)("inset", [
        [
          "inset",
          [
            "inset"
          ]
        ],
        [
          [
            "inset-x",
            [
              "left",
              "right"
            ]
          ],
          [
            "inset-y",
            [
              "top",
              "bottom"
            ]
          ]
        ],
        [
          [
            "start",
            [
              "inset-inline-start"
            ]
          ],
          [
            "end",
            [
              "inset-inline-end"
            ]
          ],
          [
            "top",
            [
              "top"
            ]
          ],
          [
            "right",
            [
              "right"
            ]
          ],
          [
            "bottom",
            [
              "bottom"
            ]
          ],
          [
            "left",
            [
              "left"
            ]
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      isolation: ({ addUtilities: k }) => {
        k({
          ".isolate": {
            isolation: "isolate"
          },
          ".isolation-auto": {
            isolation: "auto"
          }
        });
      },
      zIndex: (0, f.default)("zIndex", [
        [
          "z",
          [
            "zIndex"
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      order: (0, f.default)("order", void 0, {
        supportsNegativeValues: !0
      }),
      gridColumn: (0, f.default)("gridColumn", [
        [
          "col",
          [
            "gridColumn"
          ]
        ]
      ]),
      gridColumnStart: (0, f.default)("gridColumnStart", [
        [
          "col-start",
          [
            "gridColumnStart"
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      gridColumnEnd: (0, f.default)("gridColumnEnd", [
        [
          "col-end",
          [
            "gridColumnEnd"
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      gridRow: (0, f.default)("gridRow", [
        [
          "row",
          [
            "gridRow"
          ]
        ]
      ]),
      gridRowStart: (0, f.default)("gridRowStart", [
        [
          "row-start",
          [
            "gridRowStart"
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      gridRowEnd: (0, f.default)("gridRowEnd", [
        [
          "row-end",
          [
            "gridRowEnd"
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      float: ({ addUtilities: k }) => {
        k({
          ".float-start": {
            float: "inline-start"
          },
          ".float-end": {
            float: "inline-end"
          },
          ".float-right": {
            float: "right"
          },
          ".float-left": {
            float: "left"
          },
          ".float-none": {
            float: "none"
          }
        });
      },
      clear: ({ addUtilities: k }) => {
        k({
          ".clear-start": {
            clear: "inline-start"
          },
          ".clear-end": {
            clear: "inline-end"
          },
          ".clear-left": {
            clear: "left"
          },
          ".clear-right": {
            clear: "right"
          },
          ".clear-both": {
            clear: "both"
          },
          ".clear-none": {
            clear: "none"
          }
        });
      },
      margin: (0, f.default)("margin", [
        [
          "m",
          [
            "margin"
          ]
        ],
        [
          [
            "mx",
            [
              "margin-left",
              "margin-right"
            ]
          ],
          [
            "my",
            [
              "margin-top",
              "margin-bottom"
            ]
          ]
        ],
        [
          [
            "ms",
            [
              "margin-inline-start"
            ]
          ],
          [
            "me",
            [
              "margin-inline-end"
            ]
          ],
          [
            "mt",
            [
              "margin-top"
            ]
          ],
          [
            "mr",
            [
              "margin-right"
            ]
          ],
          [
            "mb",
            [
              "margin-bottom"
            ]
          ],
          [
            "ml",
            [
              "margin-left"
            ]
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      boxSizing: ({ addUtilities: k }) => {
        k({
          ".box-border": {
            "box-sizing": "border-box"
          },
          ".box-content": {
            "box-sizing": "content-box"
          }
        });
      },
      lineClamp: ({ matchUtilities: k, addUtilities: A, theme: R }) => {
        k({
          "line-clamp": (I) => ({
            overflow: "hidden",
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-line-clamp": `${I}`
          })
        }, {
          values: R("lineClamp")
        }), A({
          ".line-clamp-none": {
            overflow: "visible",
            display: "block",
            "-webkit-box-orient": "horizontal",
            "-webkit-line-clamp": "none"
          }
        });
      },
      display: ({ addUtilities: k }) => {
        k({
          ".block": {
            display: "block"
          },
          ".inline-block": {
            display: "inline-block"
          },
          ".inline": {
            display: "inline"
          },
          ".flex": {
            display: "flex"
          },
          ".inline-flex": {
            display: "inline-flex"
          },
          ".table": {
            display: "table"
          },
          ".inline-table": {
            display: "inline-table"
          },
          ".table-caption": {
            display: "table-caption"
          },
          ".table-cell": {
            display: "table-cell"
          },
          ".table-column": {
            display: "table-column"
          },
          ".table-column-group": {
            display: "table-column-group"
          },
          ".table-footer-group": {
            display: "table-footer-group"
          },
          ".table-header-group": {
            display: "table-header-group"
          },
          ".table-row-group": {
            display: "table-row-group"
          },
          ".table-row": {
            display: "table-row"
          },
          ".flow-root": {
            display: "flow-root"
          },
          ".grid": {
            display: "grid"
          },
          ".inline-grid": {
            display: "inline-grid"
          },
          ".contents": {
            display: "contents"
          },
          ".list-item": {
            display: "list-item"
          },
          ".hidden": {
            display: "none"
          }
        });
      },
      aspectRatio: (0, f.default)("aspectRatio", [
        [
          "aspect",
          [
            "aspect-ratio"
          ]
        ]
      ]),
      size: (0, f.default)("size", [
        [
          "size",
          [
            "width",
            "height"
          ]
        ]
      ]),
      height: (0, f.default)("height", [
        [
          "h",
          [
            "height"
          ]
        ]
      ]),
      maxHeight: (0, f.default)("maxHeight", [
        [
          "max-h",
          [
            "maxHeight"
          ]
        ]
      ]),
      minHeight: (0, f.default)("minHeight", [
        [
          "min-h",
          [
            "minHeight"
          ]
        ]
      ]),
      width: (0, f.default)("width", [
        [
          "w",
          [
            "width"
          ]
        ]
      ]),
      minWidth: (0, f.default)("minWidth", [
        [
          "min-w",
          [
            "minWidth"
          ]
        ]
      ]),
      maxWidth: (0, f.default)("maxWidth", [
        [
          "max-w",
          [
            "maxWidth"
          ]
        ]
      ]),
      flex: (0, f.default)("flex"),
      flexShrink: (0, f.default)("flexShrink", [
        [
          "flex-shrink",
          [
            "flex-shrink"
          ]
        ],
        [
          "shrink",
          [
            "flex-shrink"
          ]
        ]
      ]),
      flexGrow: (0, f.default)("flexGrow", [
        [
          "flex-grow",
          [
            "flex-grow"
          ]
        ],
        [
          "grow",
          [
            "flex-grow"
          ]
        ]
      ]),
      flexBasis: (0, f.default)("flexBasis", [
        [
          "basis",
          [
            "flex-basis"
          ]
        ]
      ]),
      tableLayout: ({ addUtilities: k }) => {
        k({
          ".table-auto": {
            "table-layout": "auto"
          },
          ".table-fixed": {
            "table-layout": "fixed"
          }
        });
      },
      captionSide: ({ addUtilities: k }) => {
        k({
          ".caption-top": {
            "caption-side": "top"
          },
          ".caption-bottom": {
            "caption-side": "bottom"
          }
        });
      },
      borderCollapse: ({ addUtilities: k }) => {
        k({
          ".border-collapse": {
            "border-collapse": "collapse"
          },
          ".border-separate": {
            "border-collapse": "separate"
          }
        });
      },
      borderSpacing: ({ addDefaults: k, matchUtilities: A, theme: R }) => {
        k("border-spacing", {
          "--tw-border-spacing-x": 0,
          "--tw-border-spacing-y": 0
        }), A({
          "border-spacing": (I) => ({
            "--tw-border-spacing-x": I,
            "--tw-border-spacing-y": I,
            "@defaults border-spacing": {},
            "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
          }),
          "border-spacing-x": (I) => ({
            "--tw-border-spacing-x": I,
            "@defaults border-spacing": {},
            "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
          }),
          "border-spacing-y": (I) => ({
            "--tw-border-spacing-y": I,
            "@defaults border-spacing": {},
            "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
          })
        }, {
          values: R("borderSpacing")
        });
      },
      transformOrigin: (0, f.default)("transformOrigin", [
        [
          "origin",
          [
            "transformOrigin"
          ]
        ]
      ]),
      translate: (0, f.default)("translate", [
        [
          [
            "translate-x",
            [
              [
                "@defaults transform",
                {}
              ],
              "--tw-translate-x",
              [
                "transform",
                P
              ]
            ]
          ],
          [
            "translate-y",
            [
              [
                "@defaults transform",
                {}
              ],
              "--tw-translate-y",
              [
                "transform",
                P
              ]
            ]
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      rotate: (0, f.default)("rotate", [
        [
          "rotate",
          [
            [
              "@defaults transform",
              {}
            ],
            "--tw-rotate",
            [
              "transform",
              P
            ]
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      skew: (0, f.default)("skew", [
        [
          [
            "skew-x",
            [
              [
                "@defaults transform",
                {}
              ],
              "--tw-skew-x",
              [
                "transform",
                P
              ]
            ]
          ],
          [
            "skew-y",
            [
              [
                "@defaults transform",
                {}
              ],
              "--tw-skew-y",
              [
                "transform",
                P
              ]
            ]
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      scale: (0, f.default)("scale", [
        [
          "scale",
          [
            [
              "@defaults transform",
              {}
            ],
            "--tw-scale-x",
            "--tw-scale-y",
            [
              "transform",
              P
            ]
          ]
        ],
        [
          [
            "scale-x",
            [
              [
                "@defaults transform",
                {}
              ],
              "--tw-scale-x",
              [
                "transform",
                P
              ]
            ]
          ],
          [
            "scale-y",
            [
              [
                "@defaults transform",
                {}
              ],
              "--tw-scale-y",
              [
                "transform",
                P
              ]
            ]
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      transform: ({ addDefaults: k, addUtilities: A }) => {
        k("transform", {
          "--tw-translate-x": "0",
          "--tw-translate-y": "0",
          "--tw-rotate": "0",
          "--tw-skew-x": "0",
          "--tw-skew-y": "0",
          "--tw-scale-x": "1",
          "--tw-scale-y": "1"
        }), A({
          ".transform": {
            "@defaults transform": {},
            transform: P
          },
          ".transform-cpu": {
            transform: P
          },
          ".transform-gpu": {
            transform: P.replace("translate(var(--tw-translate-x), var(--tw-translate-y))", "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)")
          },
          ".transform-none": {
            transform: "none"
          }
        });
      },
      animation: ({ matchUtilities: k, theme: A, config: R }) => {
        let I = (z) => (0, d.default)(R("prefix") + z);
        var W;
        let Q = Object.fromEntries(Object.entries((W = A("keyframes")) !== null && W !== void 0 ? W : {}).map(([z, L]) => [
          z,
          {
            [`@keyframes ${I(z)}`]: L
          }
        ]));
        k({
          animate: (z) => {
            let L = (0, e.default)(z);
            return [
              ...L.flatMap((F) => Q[F.name]),
              {
                animation: L.map(({ name: F, value: M }) => F === void 0 || Q[F] === void 0 ? M : M.replace(F, I(F))).join(", ")
              }
            ];
          }
        }, {
          values: A("animation")
        });
      },
      cursor: (0, f.default)("cursor"),
      touchAction: ({ addDefaults: k, addUtilities: A }) => {
        k("touch-action", {
          "--tw-pan-x": " ",
          "--tw-pan-y": " ",
          "--tw-pinch-zoom": " "
        });
        let R = "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)";
        A({
          ".touch-auto": {
            "touch-action": "auto"
          },
          ".touch-none": {
            "touch-action": "none"
          },
          ".touch-pan-x": {
            "@defaults touch-action": {},
            "--tw-pan-x": "pan-x",
            "touch-action": R
          },
          ".touch-pan-left": {
            "@defaults touch-action": {},
            "--tw-pan-x": "pan-left",
            "touch-action": R
          },
          ".touch-pan-right": {
            "@defaults touch-action": {},
            "--tw-pan-x": "pan-right",
            "touch-action": R
          },
          ".touch-pan-y": {
            "@defaults touch-action": {},
            "--tw-pan-y": "pan-y",
            "touch-action": R
          },
          ".touch-pan-up": {
            "@defaults touch-action": {},
            "--tw-pan-y": "pan-up",
            "touch-action": R
          },
          ".touch-pan-down": {
            "@defaults touch-action": {},
            "--tw-pan-y": "pan-down",
            "touch-action": R
          },
          ".touch-pinch-zoom": {
            "@defaults touch-action": {},
            "--tw-pinch-zoom": "pinch-zoom",
            "touch-action": R
          },
          ".touch-manipulation": {
            "touch-action": "manipulation"
          }
        });
      },
      userSelect: ({ addUtilities: k }) => {
        k({
          ".select-none": {
            "user-select": "none"
          },
          ".select-text": {
            "user-select": "text"
          },
          ".select-all": {
            "user-select": "all"
          },
          ".select-auto": {
            "user-select": "auto"
          }
        });
      },
      resize: ({ addUtilities: k }) => {
        k({
          ".resize-none": {
            resize: "none"
          },
          ".resize-y": {
            resize: "vertical"
          },
          ".resize-x": {
            resize: "horizontal"
          },
          ".resize": {
            resize: "both"
          }
        });
      },
      scrollSnapType: ({ addDefaults: k, addUtilities: A }) => {
        k("scroll-snap-type", {
          "--tw-scroll-snap-strictness": "proximity"
        }), A({
          ".snap-none": {
            "scroll-snap-type": "none"
          },
          ".snap-x": {
            "@defaults scroll-snap-type": {},
            "scroll-snap-type": "x var(--tw-scroll-snap-strictness)"
          },
          ".snap-y": {
            "@defaults scroll-snap-type": {},
            "scroll-snap-type": "y var(--tw-scroll-snap-strictness)"
          },
          ".snap-both": {
            "@defaults scroll-snap-type": {},
            "scroll-snap-type": "both var(--tw-scroll-snap-strictness)"
          },
          ".snap-mandatory": {
            "--tw-scroll-snap-strictness": "mandatory"
          },
          ".snap-proximity": {
            "--tw-scroll-snap-strictness": "proximity"
          }
        });
      },
      scrollSnapAlign: ({ addUtilities: k }) => {
        k({
          ".snap-start": {
            "scroll-snap-align": "start"
          },
          ".snap-end": {
            "scroll-snap-align": "end"
          },
          ".snap-center": {
            "scroll-snap-align": "center"
          },
          ".snap-align-none": {
            "scroll-snap-align": "none"
          }
        });
      },
      scrollSnapStop: ({ addUtilities: k }) => {
        k({
          ".snap-normal": {
            "scroll-snap-stop": "normal"
          },
          ".snap-always": {
            "scroll-snap-stop": "always"
          }
        });
      },
      scrollMargin: (0, f.default)("scrollMargin", [
        [
          "scroll-m",
          [
            "scroll-margin"
          ]
        ],
        [
          [
            "scroll-mx",
            [
              "scroll-margin-left",
              "scroll-margin-right"
            ]
          ],
          [
            "scroll-my",
            [
              "scroll-margin-top",
              "scroll-margin-bottom"
            ]
          ]
        ],
        [
          [
            "scroll-ms",
            [
              "scroll-margin-inline-start"
            ]
          ],
          [
            "scroll-me",
            [
              "scroll-margin-inline-end"
            ]
          ],
          [
            "scroll-mt",
            [
              "scroll-margin-top"
            ]
          ],
          [
            "scroll-mr",
            [
              "scroll-margin-right"
            ]
          ],
          [
            "scroll-mb",
            [
              "scroll-margin-bottom"
            ]
          ],
          [
            "scroll-ml",
            [
              "scroll-margin-left"
            ]
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      scrollPadding: (0, f.default)("scrollPadding", [
        [
          "scroll-p",
          [
            "scroll-padding"
          ]
        ],
        [
          [
            "scroll-px",
            [
              "scroll-padding-left",
              "scroll-padding-right"
            ]
          ],
          [
            "scroll-py",
            [
              "scroll-padding-top",
              "scroll-padding-bottom"
            ]
          ]
        ],
        [
          [
            "scroll-ps",
            [
              "scroll-padding-inline-start"
            ]
          ],
          [
            "scroll-pe",
            [
              "scroll-padding-inline-end"
            ]
          ],
          [
            "scroll-pt",
            [
              "scroll-padding-top"
            ]
          ],
          [
            "scroll-pr",
            [
              "scroll-padding-right"
            ]
          ],
          [
            "scroll-pb",
            [
              "scroll-padding-bottom"
            ]
          ],
          [
            "scroll-pl",
            [
              "scroll-padding-left"
            ]
          ]
        ]
      ]),
      listStylePosition: ({ addUtilities: k }) => {
        k({
          ".list-inside": {
            "list-style-position": "inside"
          },
          ".list-outside": {
            "list-style-position": "outside"
          }
        });
      },
      listStyleType: (0, f.default)("listStyleType", [
        [
          "list",
          [
            "listStyleType"
          ]
        ]
      ]),
      listStyleImage: (0, f.default)("listStyleImage", [
        [
          "list-image",
          [
            "listStyleImage"
          ]
        ]
      ]),
      appearance: ({ addUtilities: k }) => {
        k({
          ".appearance-none": {
            appearance: "none"
          },
          ".appearance-auto": {
            appearance: "auto"
          }
        });
      },
      columns: (0, f.default)("columns", [
        [
          "columns",
          [
            "columns"
          ]
        ]
      ]),
      breakBefore: ({ addUtilities: k }) => {
        k({
          ".break-before-auto": {
            "break-before": "auto"
          },
          ".break-before-avoid": {
            "break-before": "avoid"
          },
          ".break-before-all": {
            "break-before": "all"
          },
          ".break-before-avoid-page": {
            "break-before": "avoid-page"
          },
          ".break-before-page": {
            "break-before": "page"
          },
          ".break-before-left": {
            "break-before": "left"
          },
          ".break-before-right": {
            "break-before": "right"
          },
          ".break-before-column": {
            "break-before": "column"
          }
        });
      },
      breakInside: ({ addUtilities: k }) => {
        k({
          ".break-inside-auto": {
            "break-inside": "auto"
          },
          ".break-inside-avoid": {
            "break-inside": "avoid"
          },
          ".break-inside-avoid-page": {
            "break-inside": "avoid-page"
          },
          ".break-inside-avoid-column": {
            "break-inside": "avoid-column"
          }
        });
      },
      breakAfter: ({ addUtilities: k }) => {
        k({
          ".break-after-auto": {
            "break-after": "auto"
          },
          ".break-after-avoid": {
            "break-after": "avoid"
          },
          ".break-after-all": {
            "break-after": "all"
          },
          ".break-after-avoid-page": {
            "break-after": "avoid-page"
          },
          ".break-after-page": {
            "break-after": "page"
          },
          ".break-after-left": {
            "break-after": "left"
          },
          ".break-after-right": {
            "break-after": "right"
          },
          ".break-after-column": {
            "break-after": "column"
          }
        });
      },
      gridAutoColumns: (0, f.default)("gridAutoColumns", [
        [
          "auto-cols",
          [
            "gridAutoColumns"
          ]
        ]
      ]),
      gridAutoFlow: ({ addUtilities: k }) => {
        k({
          ".grid-flow-row": {
            gridAutoFlow: "row"
          },
          ".grid-flow-col": {
            gridAutoFlow: "column"
          },
          ".grid-flow-dense": {
            gridAutoFlow: "dense"
          },
          ".grid-flow-row-dense": {
            gridAutoFlow: "row dense"
          },
          ".grid-flow-col-dense": {
            gridAutoFlow: "column dense"
          }
        });
      },
      gridAutoRows: (0, f.default)("gridAutoRows", [
        [
          "auto-rows",
          [
            "gridAutoRows"
          ]
        ]
      ]),
      gridTemplateColumns: (0, f.default)("gridTemplateColumns", [
        [
          "grid-cols",
          [
            "gridTemplateColumns"
          ]
        ]
      ]),
      gridTemplateRows: (0, f.default)("gridTemplateRows", [
        [
          "grid-rows",
          [
            "gridTemplateRows"
          ]
        ]
      ]),
      flexDirection: ({ addUtilities: k }) => {
        k({
          ".flex-row": {
            "flex-direction": "row"
          },
          ".flex-row-reverse": {
            "flex-direction": "row-reverse"
          },
          ".flex-col": {
            "flex-direction": "column"
          },
          ".flex-col-reverse": {
            "flex-direction": "column-reverse"
          }
        });
      },
      flexWrap: ({ addUtilities: k }) => {
        k({
          ".flex-wrap": {
            "flex-wrap": "wrap"
          },
          ".flex-wrap-reverse": {
            "flex-wrap": "wrap-reverse"
          },
          ".flex-nowrap": {
            "flex-wrap": "nowrap"
          }
        });
      },
      placeContent: ({ addUtilities: k }) => {
        k({
          ".place-content-center": {
            "place-content": "center"
          },
          ".place-content-start": {
            "place-content": "start"
          },
          ".place-content-end": {
            "place-content": "end"
          },
          ".place-content-between": {
            "place-content": "space-between"
          },
          ".place-content-around": {
            "place-content": "space-around"
          },
          ".place-content-evenly": {
            "place-content": "space-evenly"
          },
          ".place-content-baseline": {
            "place-content": "baseline"
          },
          ".place-content-stretch": {
            "place-content": "stretch"
          }
        });
      },
      placeItems: ({ addUtilities: k }) => {
        k({
          ".place-items-start": {
            "place-items": "start"
          },
          ".place-items-end": {
            "place-items": "end"
          },
          ".place-items-center": {
            "place-items": "center"
          },
          ".place-items-baseline": {
            "place-items": "baseline"
          },
          ".place-items-stretch": {
            "place-items": "stretch"
          }
        });
      },
      alignContent: ({ addUtilities: k }) => {
        k({
          ".content-normal": {
            "align-content": "normal"
          },
          ".content-center": {
            "align-content": "center"
          },
          ".content-start": {
            "align-content": "flex-start"
          },
          ".content-end": {
            "align-content": "flex-end"
          },
          ".content-between": {
            "align-content": "space-between"
          },
          ".content-around": {
            "align-content": "space-around"
          },
          ".content-evenly": {
            "align-content": "space-evenly"
          },
          ".content-baseline": {
            "align-content": "baseline"
          },
          ".content-stretch": {
            "align-content": "stretch"
          }
        });
      },
      alignItems: ({ addUtilities: k }) => {
        k({
          ".items-start": {
            "align-items": "flex-start"
          },
          ".items-end": {
            "align-items": "flex-end"
          },
          ".items-center": {
            "align-items": "center"
          },
          ".items-baseline": {
            "align-items": "baseline"
          },
          ".items-stretch": {
            "align-items": "stretch"
          }
        });
      },
      justifyContent: ({ addUtilities: k }) => {
        k({
          ".justify-normal": {
            "justify-content": "normal"
          },
          ".justify-start": {
            "justify-content": "flex-start"
          },
          ".justify-end": {
            "justify-content": "flex-end"
          },
          ".justify-center": {
            "justify-content": "center"
          },
          ".justify-between": {
            "justify-content": "space-between"
          },
          ".justify-around": {
            "justify-content": "space-around"
          },
          ".justify-evenly": {
            "justify-content": "space-evenly"
          },
          ".justify-stretch": {
            "justify-content": "stretch"
          }
        });
      },
      justifyItems: ({ addUtilities: k }) => {
        k({
          ".justify-items-start": {
            "justify-items": "start"
          },
          ".justify-items-end": {
            "justify-items": "end"
          },
          ".justify-items-center": {
            "justify-items": "center"
          },
          ".justify-items-stretch": {
            "justify-items": "stretch"
          }
        });
      },
      gap: (0, f.default)("gap", [
        [
          "gap",
          [
            "gap"
          ]
        ],
        [
          [
            "gap-x",
            [
              "columnGap"
            ]
          ],
          [
            "gap-y",
            [
              "rowGap"
            ]
          ]
        ]
      ]),
      space: ({ matchUtilities: k, addUtilities: A, theme: R }) => {
        k({
          "space-x": (I) => (I = I === "0" ? "0px" : I, {
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-space-x-reverse": "0",
              "margin-right": `calc(${I} * var(--tw-space-x-reverse))`,
              "margin-left": `calc(${I} * calc(1 - var(--tw-space-x-reverse)))`
            }
          }),
          "space-y": (I) => (I = I === "0" ? "0px" : I, {
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-space-y-reverse": "0",
              "margin-top": `calc(${I} * calc(1 - var(--tw-space-y-reverse)))`,
              "margin-bottom": `calc(${I} * var(--tw-space-y-reverse))`
            }
          })
        }, {
          values: R("space"),
          supportsNegativeValues: !0
        }), A({
          ".space-y-reverse > :not([hidden]) ~ :not([hidden])": {
            "--tw-space-y-reverse": "1"
          },
          ".space-x-reverse > :not([hidden]) ~ :not([hidden])": {
            "--tw-space-x-reverse": "1"
          }
        });
      },
      divideWidth: ({ matchUtilities: k, addUtilities: A, theme: R }) => {
        k({
          "divide-x": (I) => (I = I === "0" ? "0px" : I, {
            "& > :not([hidden]) ~ :not([hidden])": {
              "@defaults border-width": {},
              "--tw-divide-x-reverse": "0",
              "border-right-width": `calc(${I} * var(--tw-divide-x-reverse))`,
              "border-left-width": `calc(${I} * calc(1 - var(--tw-divide-x-reverse)))`
            }
          }),
          "divide-y": (I) => (I = I === "0" ? "0px" : I, {
            "& > :not([hidden]) ~ :not([hidden])": {
              "@defaults border-width": {},
              "--tw-divide-y-reverse": "0",
              "border-top-width": `calc(${I} * calc(1 - var(--tw-divide-y-reverse)))`,
              "border-bottom-width": `calc(${I} * var(--tw-divide-y-reverse))`
            }
          })
        }, {
          values: R("divideWidth"),
          type: [
            "line-width",
            "length",
            "any"
          ]
        }), A({
          ".divide-y-reverse > :not([hidden]) ~ :not([hidden])": {
            "@defaults border-width": {},
            "--tw-divide-y-reverse": "1"
          },
          ".divide-x-reverse > :not([hidden]) ~ :not([hidden])": {
            "@defaults border-width": {},
            "--tw-divide-x-reverse": "1"
          }
        });
      },
      divideStyle: ({ addUtilities: k }) => {
        k({
          ".divide-solid > :not([hidden]) ~ :not([hidden])": {
            "border-style": "solid"
          },
          ".divide-dashed > :not([hidden]) ~ :not([hidden])": {
            "border-style": "dashed"
          },
          ".divide-dotted > :not([hidden]) ~ :not([hidden])": {
            "border-style": "dotted"
          },
          ".divide-double > :not([hidden]) ~ :not([hidden])": {
            "border-style": "double"
          },
          ".divide-none > :not([hidden]) ~ :not([hidden])": {
            "border-style": "none"
          }
        });
      },
      divideColor: ({ matchUtilities: k, theme: A, corePlugins: R }) => {
        k({
          divide: (I) => R("divideOpacity") ? {
            "& > :not([hidden]) ~ :not([hidden])": (0, n.default)({
              color: I,
              property: "border-color",
              variable: "--tw-divide-opacity"
            })
          } : {
            "& > :not([hidden]) ~ :not([hidden])": {
              "border-color": (0, a.default)(I)
            }
          }
        }, {
          values: (({ DEFAULT: I, ...W }) => W)((0, t.default)(A("divideColor"))),
          type: [
            "color",
            "any"
          ]
        });
      },
      divideOpacity: ({ matchUtilities: k, theme: A }) => {
        k({
          "divide-opacity": (R) => ({
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-divide-opacity": R
            }
          })
        }, {
          values: A("divideOpacity")
        });
      },
      placeSelf: ({ addUtilities: k }) => {
        k({
          ".place-self-auto": {
            "place-self": "auto"
          },
          ".place-self-start": {
            "place-self": "start"
          },
          ".place-self-end": {
            "place-self": "end"
          },
          ".place-self-center": {
            "place-self": "center"
          },
          ".place-self-stretch": {
            "place-self": "stretch"
          }
        });
      },
      alignSelf: ({ addUtilities: k }) => {
        k({
          ".self-auto": {
            "align-self": "auto"
          },
          ".self-start": {
            "align-self": "flex-start"
          },
          ".self-end": {
            "align-self": "flex-end"
          },
          ".self-center": {
            "align-self": "center"
          },
          ".self-stretch": {
            "align-self": "stretch"
          },
          ".self-baseline": {
            "align-self": "baseline"
          }
        });
      },
      justifySelf: ({ addUtilities: k }) => {
        k({
          ".justify-self-auto": {
            "justify-self": "auto"
          },
          ".justify-self-start": {
            "justify-self": "start"
          },
          ".justify-self-end": {
            "justify-self": "end"
          },
          ".justify-self-center": {
            "justify-self": "center"
          },
          ".justify-self-stretch": {
            "justify-self": "stretch"
          }
        });
      },
      overflow: ({ addUtilities: k }) => {
        k({
          ".overflow-auto": {
            overflow: "auto"
          },
          ".overflow-hidden": {
            overflow: "hidden"
          },
          ".overflow-clip": {
            overflow: "clip"
          },
          ".overflow-visible": {
            overflow: "visible"
          },
          ".overflow-scroll": {
            overflow: "scroll"
          },
          ".overflow-x-auto": {
            "overflow-x": "auto"
          },
          ".overflow-y-auto": {
            "overflow-y": "auto"
          },
          ".overflow-x-hidden": {
            "overflow-x": "hidden"
          },
          ".overflow-y-hidden": {
            "overflow-y": "hidden"
          },
          ".overflow-x-clip": {
            "overflow-x": "clip"
          },
          ".overflow-y-clip": {
            "overflow-y": "clip"
          },
          ".overflow-x-visible": {
            "overflow-x": "visible"
          },
          ".overflow-y-visible": {
            "overflow-y": "visible"
          },
          ".overflow-x-scroll": {
            "overflow-x": "scroll"
          },
          ".overflow-y-scroll": {
            "overflow-y": "scroll"
          }
        });
      },
      overscrollBehavior: ({ addUtilities: k }) => {
        k({
          ".overscroll-auto": {
            "overscroll-behavior": "auto"
          },
          ".overscroll-contain": {
            "overscroll-behavior": "contain"
          },
          ".overscroll-none": {
            "overscroll-behavior": "none"
          },
          ".overscroll-y-auto": {
            "overscroll-behavior-y": "auto"
          },
          ".overscroll-y-contain": {
            "overscroll-behavior-y": "contain"
          },
          ".overscroll-y-none": {
            "overscroll-behavior-y": "none"
          },
          ".overscroll-x-auto": {
            "overscroll-behavior-x": "auto"
          },
          ".overscroll-x-contain": {
            "overscroll-behavior-x": "contain"
          },
          ".overscroll-x-none": {
            "overscroll-behavior-x": "none"
          }
        });
      },
      scrollBehavior: ({ addUtilities: k }) => {
        k({
          ".scroll-auto": {
            "scroll-behavior": "auto"
          },
          ".scroll-smooth": {
            "scroll-behavior": "smooth"
          }
        });
      },
      textOverflow: ({ addUtilities: k }) => {
        k({
          ".truncate": {
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap"
          },
          ".overflow-ellipsis": {
            "text-overflow": "ellipsis"
          },
          ".text-ellipsis": {
            "text-overflow": "ellipsis"
          },
          ".text-clip": {
            "text-overflow": "clip"
          }
        });
      },
      hyphens: ({ addUtilities: k }) => {
        k({
          ".hyphens-none": {
            hyphens: "none"
          },
          ".hyphens-manual": {
            hyphens: "manual"
          },
          ".hyphens-auto": {
            hyphens: "auto"
          }
        });
      },
      whitespace: ({ addUtilities: k }) => {
        k({
          ".whitespace-normal": {
            "white-space": "normal"
          },
          ".whitespace-nowrap": {
            "white-space": "nowrap"
          },
          ".whitespace-pre": {
            "white-space": "pre"
          },
          ".whitespace-pre-line": {
            "white-space": "pre-line"
          },
          ".whitespace-pre-wrap": {
            "white-space": "pre-wrap"
          },
          ".whitespace-break-spaces": {
            "white-space": "break-spaces"
          }
        });
      },
      textWrap: ({ addUtilities: k }) => {
        k({
          ".text-wrap": {
            "text-wrap": "wrap"
          },
          ".text-nowrap": {
            "text-wrap": "nowrap"
          },
          ".text-balance": {
            "text-wrap": "balance"
          },
          ".text-pretty": {
            "text-wrap": "pretty"
          }
        });
      },
      wordBreak: ({ addUtilities: k }) => {
        k({
          ".break-normal": {
            "overflow-wrap": "normal",
            "word-break": "normal"
          },
          ".break-words": {
            "overflow-wrap": "break-word"
          },
          ".break-all": {
            "word-break": "break-all"
          },
          ".break-keep": {
            "word-break": "keep-all"
          }
        });
      },
      borderRadius: (0, f.default)("borderRadius", [
        [
          "rounded",
          [
            "border-radius"
          ]
        ],
        [
          [
            "rounded-s",
            [
              "border-start-start-radius",
              "border-end-start-radius"
            ]
          ],
          [
            "rounded-e",
            [
              "border-start-end-radius",
              "border-end-end-radius"
            ]
          ],
          [
            "rounded-t",
            [
              "border-top-left-radius",
              "border-top-right-radius"
            ]
          ],
          [
            "rounded-r",
            [
              "border-top-right-radius",
              "border-bottom-right-radius"
            ]
          ],
          [
            "rounded-b",
            [
              "border-bottom-right-radius",
              "border-bottom-left-radius"
            ]
          ],
          [
            "rounded-l",
            [
              "border-top-left-radius",
              "border-bottom-left-radius"
            ]
          ]
        ],
        [
          [
            "rounded-ss",
            [
              "border-start-start-radius"
            ]
          ],
          [
            "rounded-se",
            [
              "border-start-end-radius"
            ]
          ],
          [
            "rounded-ee",
            [
              "border-end-end-radius"
            ]
          ],
          [
            "rounded-es",
            [
              "border-end-start-radius"
            ]
          ],
          [
            "rounded-tl",
            [
              "border-top-left-radius"
            ]
          ],
          [
            "rounded-tr",
            [
              "border-top-right-radius"
            ]
          ],
          [
            "rounded-br",
            [
              "border-bottom-right-radius"
            ]
          ],
          [
            "rounded-bl",
            [
              "border-bottom-left-radius"
            ]
          ]
        ]
      ]),
      borderWidth: (0, f.default)("borderWidth", [
        [
          "border",
          [
            [
              "@defaults border-width",
              {}
            ],
            "border-width"
          ]
        ],
        [
          [
            "border-x",
            [
              [
                "@defaults border-width",
                {}
              ],
              "border-left-width",
              "border-right-width"
            ]
          ],
          [
            "border-y",
            [
              [
                "@defaults border-width",
                {}
              ],
              "border-top-width",
              "border-bottom-width"
            ]
          ]
        ],
        [
          [
            "border-s",
            [
              [
                "@defaults border-width",
                {}
              ],
              "border-inline-start-width"
            ]
          ],
          [
            "border-e",
            [
              [
                "@defaults border-width",
                {}
              ],
              "border-inline-end-width"
            ]
          ],
          [
            "border-t",
            [
              [
                "@defaults border-width",
                {}
              ],
              "border-top-width"
            ]
          ],
          [
            "border-r",
            [
              [
                "@defaults border-width",
                {}
              ],
              "border-right-width"
            ]
          ],
          [
            "border-b",
            [
              [
                "@defaults border-width",
                {}
              ],
              "border-bottom-width"
            ]
          ],
          [
            "border-l",
            [
              [
                "@defaults border-width",
                {}
              ],
              "border-left-width"
            ]
          ]
        ]
      ], {
        type: [
          "line-width",
          "length"
        ]
      }),
      borderStyle: ({ addUtilities: k }) => {
        k({
          ".border-solid": {
            "border-style": "solid"
          },
          ".border-dashed": {
            "border-style": "dashed"
          },
          ".border-dotted": {
            "border-style": "dotted"
          },
          ".border-double": {
            "border-style": "double"
          },
          ".border-hidden": {
            "border-style": "hidden"
          },
          ".border-none": {
            "border-style": "none"
          }
        });
      },
      borderColor: ({ matchUtilities: k, theme: A, corePlugins: R }) => {
        k({
          border: (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: "border-color",
            variable: "--tw-border-opacity"
          }) : {
            "border-color": (0, a.default)(I)
          }
        }, {
          values: (({ DEFAULT: I, ...W }) => W)((0, t.default)(A("borderColor"))),
          type: [
            "color",
            "any"
          ]
        }), k({
          "border-x": (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: [
              "border-left-color",
              "border-right-color"
            ],
            variable: "--tw-border-opacity"
          }) : {
            "border-left-color": (0, a.default)(I),
            "border-right-color": (0, a.default)(I)
          },
          "border-y": (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: [
              "border-top-color",
              "border-bottom-color"
            ],
            variable: "--tw-border-opacity"
          }) : {
            "border-top-color": (0, a.default)(I),
            "border-bottom-color": (0, a.default)(I)
          }
        }, {
          values: (({ DEFAULT: I, ...W }) => W)((0, t.default)(A("borderColor"))),
          type: [
            "color",
            "any"
          ]
        }), k({
          "border-s": (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: "border-inline-start-color",
            variable: "--tw-border-opacity"
          }) : {
            "border-inline-start-color": (0, a.default)(I)
          },
          "border-e": (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: "border-inline-end-color",
            variable: "--tw-border-opacity"
          }) : {
            "border-inline-end-color": (0, a.default)(I)
          },
          "border-t": (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: "border-top-color",
            variable: "--tw-border-opacity"
          }) : {
            "border-top-color": (0, a.default)(I)
          },
          "border-r": (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: "border-right-color",
            variable: "--tw-border-opacity"
          }) : {
            "border-right-color": (0, a.default)(I)
          },
          "border-b": (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: "border-bottom-color",
            variable: "--tw-border-opacity"
          }) : {
            "border-bottom-color": (0, a.default)(I)
          },
          "border-l": (I) => R("borderOpacity") ? (0, n.default)({
            color: I,
            property: "border-left-color",
            variable: "--tw-border-opacity"
          }) : {
            "border-left-color": (0, a.default)(I)
          }
        }, {
          values: (({ DEFAULT: I, ...W }) => W)((0, t.default)(A("borderColor"))),
          type: [
            "color",
            "any"
          ]
        });
      },
      borderOpacity: (0, f.default)("borderOpacity", [
        [
          "border-opacity",
          [
            "--tw-border-opacity"
          ]
        ]
      ]),
      backgroundColor: ({ matchUtilities: k, theme: A, corePlugins: R }) => {
        k({
          bg: (I) => R("backgroundOpacity") ? (0, n.default)({
            color: I,
            property: "background-color",
            variable: "--tw-bg-opacity"
          }) : {
            "background-color": (0, a.default)(I)
          }
        }, {
          values: (0, t.default)(A("backgroundColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      backgroundOpacity: (0, f.default)("backgroundOpacity", [
        [
          "bg-opacity",
          [
            "--tw-bg-opacity"
          ]
        ]
      ]),
      backgroundImage: (0, f.default)("backgroundImage", [
        [
          "bg",
          [
            "background-image"
          ]
        ]
      ], {
        type: [
          "lookup",
          "image",
          "url"
        ]
      }),
      gradientColorStops: /* @__PURE__ */ (() => {
        function k(A) {
          return (0, n.withAlphaValue)(A, 0, "rgb(255 255 255 / 0)");
        }
        return function({ matchUtilities: A, theme: R, addDefaults: I }) {
          I("gradient-color-stops", {
            "--tw-gradient-from-position": " ",
            "--tw-gradient-via-position": " ",
            "--tw-gradient-to-position": " "
          });
          let W = {
            values: (0, t.default)(R("gradientColorStops")),
            type: [
              "color",
              "any"
            ]
          }, Q = {
            values: R("gradientColorStopPositions"),
            type: [
              "length",
              "percentage"
            ]
          };
          A({
            from: (z) => {
              let L = k(z);
              return {
                "@defaults gradient-color-stops": {},
                "--tw-gradient-from": `${(0, a.default)(z)} var(--tw-gradient-from-position)`,
                "--tw-gradient-to": `${L} var(--tw-gradient-to-position)`,
                "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)"
              };
            }
          }, W), A({
            from: (z) => ({
              "--tw-gradient-from-position": z
            })
          }, Q), A({
            via: (z) => {
              let L = k(z);
              return {
                "@defaults gradient-color-stops": {},
                "--tw-gradient-to": `${L}  var(--tw-gradient-to-position)`,
                "--tw-gradient-stops": `var(--tw-gradient-from), ${(0, a.default)(z)} var(--tw-gradient-via-position), var(--tw-gradient-to)`
              };
            }
          }, W), A({
            via: (z) => ({
              "--tw-gradient-via-position": z
            })
          }, Q), A({
            to: (z) => ({
              "@defaults gradient-color-stops": {},
              "--tw-gradient-to": `${(0, a.default)(z)} var(--tw-gradient-to-position)`
            })
          }, W), A({
            to: (z) => ({
              "--tw-gradient-to-position": z
            })
          }, Q);
        };
      })(),
      boxDecorationBreak: ({ addUtilities: k }) => {
        k({
          ".decoration-slice": {
            "box-decoration-break": "slice"
          },
          ".decoration-clone": {
            "box-decoration-break": "clone"
          },
          ".box-decoration-slice": {
            "box-decoration-break": "slice"
          },
          ".box-decoration-clone": {
            "box-decoration-break": "clone"
          }
        });
      },
      backgroundSize: (0, f.default)("backgroundSize", [
        [
          "bg",
          [
            "background-size"
          ]
        ]
      ], {
        type: [
          "lookup",
          "length",
          "percentage",
          "size"
        ]
      }),
      backgroundAttachment: ({ addUtilities: k }) => {
        k({
          ".bg-fixed": {
            "background-attachment": "fixed"
          },
          ".bg-local": {
            "background-attachment": "local"
          },
          ".bg-scroll": {
            "background-attachment": "scroll"
          }
        });
      },
      backgroundClip: ({ addUtilities: k }) => {
        k({
          ".bg-clip-border": {
            "background-clip": "border-box"
          },
          ".bg-clip-padding": {
            "background-clip": "padding-box"
          },
          ".bg-clip-content": {
            "background-clip": "content-box"
          },
          ".bg-clip-text": {
            "background-clip": "text"
          }
        });
      },
      backgroundPosition: (0, f.default)("backgroundPosition", [
        [
          "bg",
          [
            "background-position"
          ]
        ]
      ], {
        type: [
          "lookup",
          [
            "position",
            {
              preferOnConflict: !0
            }
          ]
        ]
      }),
      backgroundRepeat: ({ addUtilities: k }) => {
        k({
          ".bg-repeat": {
            "background-repeat": "repeat"
          },
          ".bg-no-repeat": {
            "background-repeat": "no-repeat"
          },
          ".bg-repeat-x": {
            "background-repeat": "repeat-x"
          },
          ".bg-repeat-y": {
            "background-repeat": "repeat-y"
          },
          ".bg-repeat-round": {
            "background-repeat": "round"
          },
          ".bg-repeat-space": {
            "background-repeat": "space"
          }
        });
      },
      backgroundOrigin: ({ addUtilities: k }) => {
        k({
          ".bg-origin-border": {
            "background-origin": "border-box"
          },
          ".bg-origin-padding": {
            "background-origin": "padding-box"
          },
          ".bg-origin-content": {
            "background-origin": "content-box"
          }
        });
      },
      fill: ({ matchUtilities: k, theme: A }) => {
        k({
          fill: (R) => ({
            fill: (0, a.default)(R)
          })
        }, {
          values: (0, t.default)(A("fill")),
          type: [
            "color",
            "any"
          ]
        });
      },
      stroke: ({ matchUtilities: k, theme: A }) => {
        k({
          stroke: (R) => ({
            stroke: (0, a.default)(R)
          })
        }, {
          values: (0, t.default)(A("stroke")),
          type: [
            "color",
            "url",
            "any"
          ]
        });
      },
      strokeWidth: (0, f.default)("strokeWidth", [
        [
          "stroke",
          [
            "stroke-width"
          ]
        ]
      ], {
        type: [
          "length",
          "number",
          "percentage"
        ]
      }),
      objectFit: ({ addUtilities: k }) => {
        k({
          ".object-contain": {
            "object-fit": "contain"
          },
          ".object-cover": {
            "object-fit": "cover"
          },
          ".object-fill": {
            "object-fit": "fill"
          },
          ".object-none": {
            "object-fit": "none"
          },
          ".object-scale-down": {
            "object-fit": "scale-down"
          }
        });
      },
      objectPosition: (0, f.default)("objectPosition", [
        [
          "object",
          [
            "object-position"
          ]
        ]
      ]),
      padding: (0, f.default)("padding", [
        [
          "p",
          [
            "padding"
          ]
        ],
        [
          [
            "px",
            [
              "padding-left",
              "padding-right"
            ]
          ],
          [
            "py",
            [
              "padding-top",
              "padding-bottom"
            ]
          ]
        ],
        [
          [
            "ps",
            [
              "padding-inline-start"
            ]
          ],
          [
            "pe",
            [
              "padding-inline-end"
            ]
          ],
          [
            "pt",
            [
              "padding-top"
            ]
          ],
          [
            "pr",
            [
              "padding-right"
            ]
          ],
          [
            "pb",
            [
              "padding-bottom"
            ]
          ],
          [
            "pl",
            [
              "padding-left"
            ]
          ]
        ]
      ]),
      textAlign: ({ addUtilities: k }) => {
        k({
          ".text-left": {
            "text-align": "left"
          },
          ".text-center": {
            "text-align": "center"
          },
          ".text-right": {
            "text-align": "right"
          },
          ".text-justify": {
            "text-align": "justify"
          },
          ".text-start": {
            "text-align": "start"
          },
          ".text-end": {
            "text-align": "end"
          }
        });
      },
      textIndent: (0, f.default)("textIndent", [
        [
          "indent",
          [
            "text-indent"
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      verticalAlign: ({ addUtilities: k, matchUtilities: A }) => {
        k({
          ".align-baseline": {
            "vertical-align": "baseline"
          },
          ".align-top": {
            "vertical-align": "top"
          },
          ".align-middle": {
            "vertical-align": "middle"
          },
          ".align-bottom": {
            "vertical-align": "bottom"
          },
          ".align-text-top": {
            "vertical-align": "text-top"
          },
          ".align-text-bottom": {
            "vertical-align": "text-bottom"
          },
          ".align-sub": {
            "vertical-align": "sub"
          },
          ".align-super": {
            "vertical-align": "super"
          }
        }), A({
          align: (R) => ({
            "vertical-align": R
          })
        });
      },
      fontFamily: ({ matchUtilities: k, theme: A }) => {
        k({
          font: (R) => {
            let [I, W = {}] = Array.isArray(R) && (0, s.default)(R[1]) ? R : [
              R
            ], { fontFeatureSettings: Q, fontVariationSettings: z } = W;
            return {
              "font-family": Array.isArray(I) ? I.join(", ") : I,
              ...Q === void 0 ? {} : {
                "font-feature-settings": Q
              },
              ...z === void 0 ? {} : {
                "font-variation-settings": z
              }
            };
          }
        }, {
          values: A("fontFamily"),
          type: [
            "lookup",
            "generic-name",
            "family-name"
          ]
        });
      },
      fontSize: ({ matchUtilities: k, theme: A }) => {
        k({
          text: (R, { modifier: I }) => {
            let [W, Q] = Array.isArray(R) ? R : [
              R
            ];
            if (I)
              return {
                "font-size": W,
                "line-height": I
              };
            let { lineHeight: z, letterSpacing: L, fontWeight: F } = (0, s.default)(Q) ? Q : {
              lineHeight: Q
            };
            return {
              "font-size": W,
              ...z === void 0 ? {} : {
                "line-height": z
              },
              ...L === void 0 ? {} : {
                "letter-spacing": L
              },
              ...F === void 0 ? {} : {
                "font-weight": F
              }
            };
          }
        }, {
          values: A("fontSize"),
          modifiers: A("lineHeight"),
          type: [
            "absolute-size",
            "relative-size",
            "length",
            "percentage"
          ]
        });
      },
      fontWeight: (0, f.default)("fontWeight", [
        [
          "font",
          [
            "fontWeight"
          ]
        ]
      ], {
        type: [
          "lookup",
          "number",
          "any"
        ]
      }),
      textTransform: ({ addUtilities: k }) => {
        k({
          ".uppercase": {
            "text-transform": "uppercase"
          },
          ".lowercase": {
            "text-transform": "lowercase"
          },
          ".capitalize": {
            "text-transform": "capitalize"
          },
          ".normal-case": {
            "text-transform": "none"
          }
        });
      },
      fontStyle: ({ addUtilities: k }) => {
        k({
          ".italic": {
            "font-style": "italic"
          },
          ".not-italic": {
            "font-style": "normal"
          }
        });
      },
      fontVariantNumeric: ({ addDefaults: k, addUtilities: A }) => {
        let R = "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)";
        k("font-variant-numeric", {
          "--tw-ordinal": " ",
          "--tw-slashed-zero": " ",
          "--tw-numeric-figure": " ",
          "--tw-numeric-spacing": " ",
          "--tw-numeric-fraction": " "
        }), A({
          ".normal-nums": {
            "font-variant-numeric": "normal"
          },
          ".ordinal": {
            "@defaults font-variant-numeric": {},
            "--tw-ordinal": "ordinal",
            "font-variant-numeric": R
          },
          ".slashed-zero": {
            "@defaults font-variant-numeric": {},
            "--tw-slashed-zero": "slashed-zero",
            "font-variant-numeric": R
          },
          ".lining-nums": {
            "@defaults font-variant-numeric": {},
            "--tw-numeric-figure": "lining-nums",
            "font-variant-numeric": R
          },
          ".oldstyle-nums": {
            "@defaults font-variant-numeric": {},
            "--tw-numeric-figure": "oldstyle-nums",
            "font-variant-numeric": R
          },
          ".proportional-nums": {
            "@defaults font-variant-numeric": {},
            "--tw-numeric-spacing": "proportional-nums",
            "font-variant-numeric": R
          },
          ".tabular-nums": {
            "@defaults font-variant-numeric": {},
            "--tw-numeric-spacing": "tabular-nums",
            "font-variant-numeric": R
          },
          ".diagonal-fractions": {
            "@defaults font-variant-numeric": {},
            "--tw-numeric-fraction": "diagonal-fractions",
            "font-variant-numeric": R
          },
          ".stacked-fractions": {
            "@defaults font-variant-numeric": {},
            "--tw-numeric-fraction": "stacked-fractions",
            "font-variant-numeric": R
          }
        });
      },
      lineHeight: (0, f.default)("lineHeight", [
        [
          "leading",
          [
            "lineHeight"
          ]
        ]
      ]),
      letterSpacing: (0, f.default)("letterSpacing", [
        [
          "tracking",
          [
            "letterSpacing"
          ]
        ]
      ], {
        supportsNegativeValues: !0
      }),
      textColor: ({ matchUtilities: k, theme: A, corePlugins: R }) => {
        k({
          text: (I) => R("textOpacity") ? (0, n.default)({
            color: I,
            property: "color",
            variable: "--tw-text-opacity"
          }) : {
            color: (0, a.default)(I)
          }
        }, {
          values: (0, t.default)(A("textColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      textOpacity: (0, f.default)("textOpacity", [
        [
          "text-opacity",
          [
            "--tw-text-opacity"
          ]
        ]
      ]),
      textDecoration: ({ addUtilities: k }) => {
        k({
          ".underline": {
            "text-decoration-line": "underline"
          },
          ".overline": {
            "text-decoration-line": "overline"
          },
          ".line-through": {
            "text-decoration-line": "line-through"
          },
          ".no-underline": {
            "text-decoration-line": "none"
          }
        });
      },
      textDecorationColor: ({ matchUtilities: k, theme: A }) => {
        k({
          decoration: (R) => ({
            "text-decoration-color": (0, a.default)(R)
          })
        }, {
          values: (0, t.default)(A("textDecorationColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      textDecorationStyle: ({ addUtilities: k }) => {
        k({
          ".decoration-solid": {
            "text-decoration-style": "solid"
          },
          ".decoration-double": {
            "text-decoration-style": "double"
          },
          ".decoration-dotted": {
            "text-decoration-style": "dotted"
          },
          ".decoration-dashed": {
            "text-decoration-style": "dashed"
          },
          ".decoration-wavy": {
            "text-decoration-style": "wavy"
          }
        });
      },
      textDecorationThickness: (0, f.default)("textDecorationThickness", [
        [
          "decoration",
          [
            "text-decoration-thickness"
          ]
        ]
      ], {
        type: [
          "length",
          "percentage"
        ]
      }),
      textUnderlineOffset: (0, f.default)("textUnderlineOffset", [
        [
          "underline-offset",
          [
            "text-underline-offset"
          ]
        ]
      ], {
        type: [
          "length",
          "percentage",
          "any"
        ]
      }),
      fontSmoothing: ({ addUtilities: k }) => {
        k({
          ".antialiased": {
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale"
          },
          ".subpixel-antialiased": {
            "-webkit-font-smoothing": "auto",
            "-moz-osx-font-smoothing": "auto"
          }
        });
      },
      placeholderColor: ({ matchUtilities: k, theme: A, corePlugins: R }) => {
        k({
          placeholder: (I) => R("placeholderOpacity") ? {
            "&::placeholder": (0, n.default)({
              color: I,
              property: "color",
              variable: "--tw-placeholder-opacity"
            })
          } : {
            "&::placeholder": {
              color: (0, a.default)(I)
            }
          }
        }, {
          values: (0, t.default)(A("placeholderColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      placeholderOpacity: ({ matchUtilities: k, theme: A }) => {
        k({
          "placeholder-opacity": (R) => ({
            "&::placeholder": {
              "--tw-placeholder-opacity": R
            }
          })
        }, {
          values: A("placeholderOpacity")
        });
      },
      caretColor: ({ matchUtilities: k, theme: A }) => {
        k({
          caret: (R) => ({
            "caret-color": (0, a.default)(R)
          })
        }, {
          values: (0, t.default)(A("caretColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      accentColor: ({ matchUtilities: k, theme: A }) => {
        k({
          accent: (R) => ({
            "accent-color": (0, a.default)(R)
          })
        }, {
          values: (0, t.default)(A("accentColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      opacity: (0, f.default)("opacity", [
        [
          "opacity",
          [
            "opacity"
          ]
        ]
      ]),
      backgroundBlendMode: ({ addUtilities: k }) => {
        k({
          ".bg-blend-normal": {
            "background-blend-mode": "normal"
          },
          ".bg-blend-multiply": {
            "background-blend-mode": "multiply"
          },
          ".bg-blend-screen": {
            "background-blend-mode": "screen"
          },
          ".bg-blend-overlay": {
            "background-blend-mode": "overlay"
          },
          ".bg-blend-darken": {
            "background-blend-mode": "darken"
          },
          ".bg-blend-lighten": {
            "background-blend-mode": "lighten"
          },
          ".bg-blend-color-dodge": {
            "background-blend-mode": "color-dodge"
          },
          ".bg-blend-color-burn": {
            "background-blend-mode": "color-burn"
          },
          ".bg-blend-hard-light": {
            "background-blend-mode": "hard-light"
          },
          ".bg-blend-soft-light": {
            "background-blend-mode": "soft-light"
          },
          ".bg-blend-difference": {
            "background-blend-mode": "difference"
          },
          ".bg-blend-exclusion": {
            "background-blend-mode": "exclusion"
          },
          ".bg-blend-hue": {
            "background-blend-mode": "hue"
          },
          ".bg-blend-saturation": {
            "background-blend-mode": "saturation"
          },
          ".bg-blend-color": {
            "background-blend-mode": "color"
          },
          ".bg-blend-luminosity": {
            "background-blend-mode": "luminosity"
          }
        });
      },
      mixBlendMode: ({ addUtilities: k }) => {
        k({
          ".mix-blend-normal": {
            "mix-blend-mode": "normal"
          },
          ".mix-blend-multiply": {
            "mix-blend-mode": "multiply"
          },
          ".mix-blend-screen": {
            "mix-blend-mode": "screen"
          },
          ".mix-blend-overlay": {
            "mix-blend-mode": "overlay"
          },
          ".mix-blend-darken": {
            "mix-blend-mode": "darken"
          },
          ".mix-blend-lighten": {
            "mix-blend-mode": "lighten"
          },
          ".mix-blend-color-dodge": {
            "mix-blend-mode": "color-dodge"
          },
          ".mix-blend-color-burn": {
            "mix-blend-mode": "color-burn"
          },
          ".mix-blend-hard-light": {
            "mix-blend-mode": "hard-light"
          },
          ".mix-blend-soft-light": {
            "mix-blend-mode": "soft-light"
          },
          ".mix-blend-difference": {
            "mix-blend-mode": "difference"
          },
          ".mix-blend-exclusion": {
            "mix-blend-mode": "exclusion"
          },
          ".mix-blend-hue": {
            "mix-blend-mode": "hue"
          },
          ".mix-blend-saturation": {
            "mix-blend-mode": "saturation"
          },
          ".mix-blend-color": {
            "mix-blend-mode": "color"
          },
          ".mix-blend-luminosity": {
            "mix-blend-mode": "luminosity"
          },
          ".mix-blend-plus-darker": {
            "mix-blend-mode": "plus-darker"
          },
          ".mix-blend-plus-lighter": {
            "mix-blend-mode": "plus-lighter"
          }
        });
      },
      boxShadow: (() => {
        let k = (0, g.default)("boxShadow"), A = [
          "var(--tw-ring-offset-shadow, 0 0 #0000)",
          "var(--tw-ring-shadow, 0 0 #0000)",
          "var(--tw-shadow)"
        ].join(", ");
        return function({ matchUtilities: R, addDefaults: I, theme: W }) {
          I("box-shadow", {
            "--tw-ring-offset-shadow": "0 0 #0000",
            "--tw-ring-shadow": "0 0 #0000",
            "--tw-shadow": "0 0 #0000",
            "--tw-shadow-colored": "0 0 #0000"
          }), R({
            shadow: (Q) => {
              Q = k(Q);
              let z = (0, _.parseBoxShadowValue)(Q);
              for (let L of z)
                L.valid && (L.color = "var(--tw-shadow-color)");
              return {
                "@defaults box-shadow": {},
                "--tw-shadow": Q === "none" ? "0 0 #0000" : Q,
                "--tw-shadow-colored": Q === "none" ? "0 0 #0000" : (0, _.formatBoxShadowValue)(z),
                "box-shadow": A
              };
            }
          }, {
            values: W("boxShadow"),
            type: [
              "shadow"
            ]
          });
        };
      })(),
      boxShadowColor: ({ matchUtilities: k, theme: A }) => {
        k({
          shadow: (R) => ({
            "--tw-shadow-color": (0, a.default)(R),
            "--tw-shadow": "var(--tw-shadow-colored)"
          })
        }, {
          values: (0, t.default)(A("boxShadowColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      outlineStyle: ({ addUtilities: k }) => {
        k({
          ".outline-none": {
            outline: "2px solid transparent",
            "outline-offset": "2px"
          },
          ".outline": {
            "outline-style": "solid"
          },
          ".outline-dashed": {
            "outline-style": "dashed"
          },
          ".outline-dotted": {
            "outline-style": "dotted"
          },
          ".outline-double": {
            "outline-style": "double"
          }
        });
      },
      outlineWidth: (0, f.default)("outlineWidth", [
        [
          "outline",
          [
            "outline-width"
          ]
        ]
      ], {
        type: [
          "length",
          "number",
          "percentage"
        ]
      }),
      outlineOffset: (0, f.default)("outlineOffset", [
        [
          "outline-offset",
          [
            "outline-offset"
          ]
        ]
      ], {
        type: [
          "length",
          "number",
          "percentage",
          "any"
        ],
        supportsNegativeValues: !0
      }),
      outlineColor: ({ matchUtilities: k, theme: A }) => {
        k({
          outline: (R) => ({
            "outline-color": (0, a.default)(R)
          })
        }, {
          values: (0, t.default)(A("outlineColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      ringWidth: ({ matchUtilities: k, addDefaults: A, addUtilities: R, theme: I, config: W }) => {
        let Q = (() => {
          var z, L;
          if ((0, y.flagEnabled)(W(), "respectDefaultRingColorOpacity"))
            return I("ringColor.DEFAULT");
          let F = I("ringOpacity.DEFAULT", "0.5");
          return !((z = I("ringColor")) === null || z === void 0) && z.DEFAULT ? (0, n.withAlphaValue)((L = I("ringColor")) === null || L === void 0 ? void 0 : L.DEFAULT, F, `rgb(147 197 253 / ${F})`) : `rgb(147 197 253 / ${F})`;
        })();
        A("ring-width", {
          "--tw-ring-inset": " ",
          "--tw-ring-offset-width": I("ringOffsetWidth.DEFAULT", "0px"),
          "--tw-ring-offset-color": I("ringOffsetColor.DEFAULT", "#fff"),
          "--tw-ring-color": Q,
          "--tw-ring-offset-shadow": "0 0 #0000",
          "--tw-ring-shadow": "0 0 #0000",
          "--tw-shadow": "0 0 #0000",
          "--tw-shadow-colored": "0 0 #0000"
        }), k({
          ring: (z) => ({
            "@defaults ring-width": {},
            "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
            "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${z} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
            "box-shadow": [
              "var(--tw-ring-offset-shadow)",
              "var(--tw-ring-shadow)",
              "var(--tw-shadow, 0 0 #0000)"
            ].join(", ")
          })
        }, {
          values: I("ringWidth"),
          type: "length"
        }), R({
          ".ring-inset": {
            "@defaults ring-width": {},
            "--tw-ring-inset": "inset"
          }
        });
      },
      ringColor: ({ matchUtilities: k, theme: A, corePlugins: R }) => {
        k({
          ring: (I) => R("ringOpacity") ? (0, n.default)({
            color: I,
            property: "--tw-ring-color",
            variable: "--tw-ring-opacity"
          }) : {
            "--tw-ring-color": (0, a.default)(I)
          }
        }, {
          values: Object.fromEntries(Object.entries((0, t.default)(A("ringColor"))).filter(([I]) => I !== "DEFAULT")),
          type: [
            "color",
            "any"
          ]
        });
      },
      ringOpacity: (k) => {
        let { config: A } = k;
        return (0, f.default)("ringOpacity", [
          [
            "ring-opacity",
            [
              "--tw-ring-opacity"
            ]
          ]
        ], {
          filterDefault: !(0, y.flagEnabled)(A(), "respectDefaultRingColorOpacity")
        })(k);
      },
      ringOffsetWidth: (0, f.default)("ringOffsetWidth", [
        [
          "ring-offset",
          [
            "--tw-ring-offset-width"
          ]
        ]
      ], {
        type: "length"
      }),
      ringOffsetColor: ({ matchUtilities: k, theme: A }) => {
        k({
          "ring-offset": (R) => ({
            "--tw-ring-offset-color": (0, a.default)(R)
          })
        }, {
          values: (0, t.default)(A("ringOffsetColor")),
          type: [
            "color",
            "any"
          ]
        });
      },
      blur: ({ matchUtilities: k, theme: A }) => {
        k({
          blur: (R) => ({
            "--tw-blur": R.trim() === "" ? " " : `blur(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("blur")
        });
      },
      brightness: ({ matchUtilities: k, theme: A }) => {
        k({
          brightness: (R) => ({
            "--tw-brightness": `brightness(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("brightness")
        });
      },
      contrast: ({ matchUtilities: k, theme: A }) => {
        k({
          contrast: (R) => ({
            "--tw-contrast": `contrast(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("contrast")
        });
      },
      dropShadow: ({ matchUtilities: k, theme: A }) => {
        k({
          "drop-shadow": (R) => ({
            "--tw-drop-shadow": Array.isArray(R) ? R.map((I) => `drop-shadow(${I})`).join(" ") : `drop-shadow(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("dropShadow")
        });
      },
      grayscale: ({ matchUtilities: k, theme: A }) => {
        k({
          grayscale: (R) => ({
            "--tw-grayscale": `grayscale(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("grayscale")
        });
      },
      hueRotate: ({ matchUtilities: k, theme: A }) => {
        k({
          "hue-rotate": (R) => ({
            "--tw-hue-rotate": `hue-rotate(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("hueRotate"),
          supportsNegativeValues: !0
        });
      },
      invert: ({ matchUtilities: k, theme: A }) => {
        k({
          invert: (R) => ({
            "--tw-invert": `invert(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("invert")
        });
      },
      saturate: ({ matchUtilities: k, theme: A }) => {
        k({
          saturate: (R) => ({
            "--tw-saturate": `saturate(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("saturate")
        });
      },
      sepia: ({ matchUtilities: k, theme: A }) => {
        k({
          sepia: (R) => ({
            "--tw-sepia": `sepia(${R})`,
            "@defaults filter": {},
            filter: N
          })
        }, {
          values: A("sepia")
        });
      },
      filter: ({ addDefaults: k, addUtilities: A }) => {
        k("filter", {
          "--tw-blur": " ",
          "--tw-brightness": " ",
          "--tw-contrast": " ",
          "--tw-grayscale": " ",
          "--tw-hue-rotate": " ",
          "--tw-invert": " ",
          "--tw-saturate": " ",
          "--tw-sepia": " ",
          "--tw-drop-shadow": " "
        }), A({
          ".filter": {
            "@defaults filter": {},
            filter: N
          },
          ".filter-none": {
            filter: "none"
          }
        });
      },
      backdropBlur: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-blur": (R) => ({
            "--tw-backdrop-blur": R.trim() === "" ? " " : `blur(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropBlur")
        });
      },
      backdropBrightness: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-brightness": (R) => ({
            "--tw-backdrop-brightness": `brightness(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropBrightness")
        });
      },
      backdropContrast: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-contrast": (R) => ({
            "--tw-backdrop-contrast": `contrast(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropContrast")
        });
      },
      backdropGrayscale: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-grayscale": (R) => ({
            "--tw-backdrop-grayscale": `grayscale(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropGrayscale")
        });
      },
      backdropHueRotate: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-hue-rotate": (R) => ({
            "--tw-backdrop-hue-rotate": `hue-rotate(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropHueRotate"),
          supportsNegativeValues: !0
        });
      },
      backdropInvert: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-invert": (R) => ({
            "--tw-backdrop-invert": `invert(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropInvert")
        });
      },
      backdropOpacity: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-opacity": (R) => ({
            "--tw-backdrop-opacity": `opacity(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropOpacity")
        });
      },
      backdropSaturate: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-saturate": (R) => ({
            "--tw-backdrop-saturate": `saturate(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropSaturate")
        });
      },
      backdropSepia: ({ matchUtilities: k, theme: A }) => {
        k({
          "backdrop-sepia": (R) => ({
            "--tw-backdrop-sepia": `sepia(${R})`,
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          })
        }, {
          values: A("backdropSepia")
        });
      },
      backdropFilter: ({ addDefaults: k, addUtilities: A }) => {
        k("backdrop-filter", {
          "--tw-backdrop-blur": " ",
          "--tw-backdrop-brightness": " ",
          "--tw-backdrop-contrast": " ",
          "--tw-backdrop-grayscale": " ",
          "--tw-backdrop-hue-rotate": " ",
          "--tw-backdrop-invert": " ",
          "--tw-backdrop-opacity": " ",
          "--tw-backdrop-saturate": " ",
          "--tw-backdrop-sepia": " "
        }), A({
          ".backdrop-filter": {
            "@defaults backdrop-filter": {},
            "-webkit-backdrop-filter": D,
            "backdrop-filter": D
          },
          ".backdrop-filter-none": {
            "-webkit-backdrop-filter": "none",
            "backdrop-filter": "none"
          }
        });
      },
      transitionProperty: ({ matchUtilities: k, theme: A }) => {
        let R = A("transitionTimingFunction.DEFAULT"), I = A("transitionDuration.DEFAULT");
        k({
          transition: (W) => ({
            "transition-property": W,
            ...W === "none" ? {} : {
              "transition-timing-function": R,
              "transition-duration": I
            }
          })
        }, {
          values: A("transitionProperty")
        });
      },
      transitionDelay: (0, f.default)("transitionDelay", [
        [
          "delay",
          [
            "transitionDelay"
          ]
        ]
      ]),
      transitionDuration: (0, f.default)("transitionDuration", [
        [
          "duration",
          [
            "transitionDuration"
          ]
        ]
      ], {
        filterDefault: !0
      }),
      transitionTimingFunction: (0, f.default)("transitionTimingFunction", [
        [
          "ease",
          [
            "transitionTimingFunction"
          ]
        ]
      ], {
        filterDefault: !0
      }),
      willChange: (0, f.default)("willChange", [
        [
          "will-change",
          [
            "will-change"
          ]
        ]
      ]),
      contain: ({ addDefaults: k, addUtilities: A }) => {
        let R = "var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style)";
        k("contain", {
          "--tw-contain-size": " ",
          "--tw-contain-layout": " ",
          "--tw-contain-paint": " ",
          "--tw-contain-style": " "
        }), A({
          ".contain-none": {
            contain: "none"
          },
          ".contain-content": {
            contain: "content"
          },
          ".contain-strict": {
            contain: "strict"
          },
          ".contain-size": {
            "@defaults contain": {},
            "--tw-contain-size": "size",
            contain: R
          },
          ".contain-inline-size": {
            "@defaults contain": {},
            "--tw-contain-size": "inline-size",
            contain: R
          },
          ".contain-layout": {
            "@defaults contain": {},
            "--tw-contain-layout": "layout",
            contain: R
          },
          ".contain-paint": {
            "@defaults contain": {},
            "--tw-contain-paint": "paint",
            contain: R
          },
          ".contain-style": {
            "@defaults contain": {},
            "--tw-contain-style": "style",
            contain: R
          }
        });
      },
      content: (0, f.default)("content", [
        [
          "content",
          [
            "--tw-content",
            [
              "content",
              "var(--tw-content)"
            ]
          ]
        ]
      ]),
      forcedColorAdjust: ({ addUtilities: k }) => {
        k({
          ".forced-color-adjust-auto": {
            "forced-color-adjust": "auto"
          },
          ".forced-color-adjust-none": {
            "forced-color-adjust": "none"
          }
        });
      }
    };
  })(Ci)), Ci;
}
var Li = {}, Hu;
function Rf() {
  return Hu || (Hu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(
      l,
      // Arbitrary values must contain balanced brackets (), [] and {}. Escaped
      // values don't count, and brackets inside quotes also don't count.
      //
      // E.g.: w-[this-is]w-[weird-and-invalid]
      // E.g.: w-[this-is\\]w-\\[weird-but-valid]
      // E.g.: content-['this-is-also-valid]-weirdly-enough']
      "default",
      {
        enumerable: !0,
        get: function() {
          return u;
        }
      }
    );
    let i = /* @__PURE__ */ new Map([
      [
        "{",
        "}"
      ],
      [
        "[",
        "]"
      ],
      [
        "(",
        ")"
      ]
    ]), v = new Map(Array.from(i.entries()).map(([f, o]) => [
      o,
      f
    ])), p = /* @__PURE__ */ new Set([
      '"',
      "'",
      "`"
    ]);
    function u(f) {
      let o = [], d = !1;
      for (let e = 0; e < f.length; e++) {
        let t = f[e];
        if (t === ":" && !d && o.length === 0)
          return !1;
        if (p.has(t) && f[e - 1] !== "\\" && (d = !d), !d && f[e - 1] !== "\\") {
          if (i.has(t))
            o.push(t);
          else if (v.has(t)) {
            let n = v.get(t);
            if (o.length <= 0 || o.pop() !== n)
              return !1;
          }
        }
      }
      return !(o.length > 0);
    }
  })(Li)), Li;
}
var Ni = {}, Ju;
function vd() {
  return Ju || (Ju = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "hasContentChanged", {
      enumerable: !0,
      get: function() {
        return d;
      }
    });
    const i = /* @__PURE__ */ p(We), v = /* @__PURE__ */ f(Qr());
    function p(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    function u(e) {
      if (typeof WeakMap != "function") return null;
      var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (u = function(a) {
        return a ? n : t;
      })(e);
    }
    function f(e, t) {
      if (e && e.__esModule)
        return e;
      if (e === null || typeof e != "object" && typeof e != "function")
        return {
          default: e
        };
      var n = u(t);
      if (n && n.has(e))
        return n.get(e);
      var a = {}, s = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var g in e)
        if (g !== "default" && Object.prototype.hasOwnProperty.call(e, g)) {
          var b = s ? Object.getOwnPropertyDescriptor(e, g) : null;
          b && (b.get || b.set) ? Object.defineProperty(a, g, b) : a[g] = e[g];
        }
      return a.default = e, n && n.set(e, a), a;
    }
    function o(e) {
      try {
        return i.default.createHash("md5").update(e, "utf-8").digest("binary");
      } catch {
        return "";
      }
    }
    function d(e, t) {
      let n = t.toString();
      if (!n.includes("@tailwind"))
        return !1;
      let a = v.sourceHashMap.get(e), s = o(n), g = a !== s;
      return v.sourceHashMap.set(e, s), g;
    }
  })(Ni)), Ni;
}
var Fi = {}, $i = {}, Ku;
function gd() {
  return Ku || (Ku = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v) {
      return (v > 0n) - (v < 0n);
    }
  })($i)), $i;
}
var Ui = {}, Xu;
function md() {
  return Xu || (Xu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "remapBitfield", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v, p) {
      let u = 0n, f = 0n;
      for (let [o, d] of p)
        v & o && (u = u | o, f = f | d);
      return v & ~u | f;
    }
  })(Ui)), Ui;
}
var Zu;
function yd() {
  return Zu || (Zu = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "Offsets", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const i = /* @__PURE__ */ p(gd()), v = md();
    function p(d) {
      return d && d.__esModule ? d : {
        default: d
      };
    }
    class u {
      constructor() {
        this.offsets = {
          defaults: 0n,
          base: 0n,
          components: 0n,
          utilities: 0n,
          variants: 0n,
          user: 0n
        }, this.layerPositions = {
          defaults: 0n,
          base: 1n,
          components: 2n,
          utilities: 3n,
          // There isn't technically a "user" layer, but we need to give it a position
          // Because it's used for ordering user-css from @apply
          user: 4n,
          variants: 5n
        }, this.reservedVariantBits = 0n, this.variantOffsets = /* @__PURE__ */ new Map();
      }
      /**
      * @param {Layer} layer
      * @returns {RuleOffset}
      */
      create(e) {
        return {
          layer: e,
          parentLayer: e,
          arbitrary: 0n,
          variants: 0n,
          parallelIndex: 0n,
          index: this.offsets[e]++,
          propertyOffset: 0n,
          property: "",
          options: []
        };
      }
      /**
      * @param {string} name
      * @returns {RuleOffset}
      */
      arbitraryProperty(e) {
        return {
          ...this.create("utilities"),
          arbitrary: 1n,
          property: e
        };
      }
      /**
      * Get the offset for a variant
      *
      * @param {string} variant
      * @param {number} index
      * @returns {RuleOffset}
      */
      forVariant(e, t = 0) {
        let n = this.variantOffsets.get(e);
        if (n === void 0)
          throw new Error(`Cannot find offset for unknown variant ${e}`);
        return {
          ...this.create("variants"),
          variants: n << BigInt(t)
        };
      }
      /**
      * @param {RuleOffset} rule
      * @param {RuleOffset} variant
      * @param {VariantOption} options
      * @returns {RuleOffset}
      */
      applyVariantOffset(e, t, n) {
        return n.variant = t.variants, {
          ...e,
          layer: "variants",
          parentLayer: e.layer === "variants" ? e.parentLayer : e.layer,
          variants: e.variants | t.variants,
          options: n.sort ? [].concat(n, e.options) : e.options,
          // TODO: Technically this is wrong. We should be handling parallel index on a per variant basis.
          // We'll take the max of all the parallel indexes for now.
          // @ts-ignore
          parallelIndex: f([
            e.parallelIndex,
            t.parallelIndex
          ])
        };
      }
      /**
      * @param {RuleOffset} offset
      * @param {number} parallelIndex
      * @returns {RuleOffset}
      */
      applyParallelOffset(e, t) {
        return {
          ...e,
          parallelIndex: BigInt(t)
        };
      }
      /**
      * Each variant gets 1 bit per function / rule registered.
      * This is because multiple variants can be applied to a single rule and we need to know which ones are present and which ones are not.
      * Additionally, every unique group of variants is grouped together in the stylesheet.
      *
      * This grouping is order-independent. For instance, we do not differentiate between `hover:focus` and `focus:hover`.
      *
      * @param {string[]} variants
      * @param {(name: string) => number} getLength
      */
      recordVariants(e, t) {
        for (let n of e)
          this.recordVariant(n, t(n));
      }
      /**
      * The same as `recordVariants` but for a single arbitrary variant at runtime.
      * @param {string} variant
      * @param {number} fnCount
      *
      * @returns {RuleOffset} The highest offset for this variant
      */
      recordVariant(e, t = 1) {
        return this.variantOffsets.set(e, 1n << this.reservedVariantBits), this.reservedVariantBits += BigInt(t), {
          ...this.create("variants"),
          variants: this.variantOffsets.get(e)
        };
      }
      /**
      * @param {RuleOffset} a
      * @param {RuleOffset} b
      * @returns {bigint}
      */
      compare(e, t) {
        if (e.layer !== t.layer)
          return this.layerPositions[e.layer] - this.layerPositions[t.layer];
        if (e.parentLayer !== t.parentLayer)
          return this.layerPositions[e.parentLayer] - this.layerPositions[t.parentLayer];
        for (let a of e.options)
          for (let s of t.options) {
            if (a.id !== s.id || !a.sort || !s.sort) continue;
            var n;
            let g = (n = f([
              a.variant,
              s.variant
            ])) !== null && n !== void 0 ? n : 0n, b = ~(g | g - 1n), r = e.variants & b, c = t.variants & b;
            if (r !== c)
              continue;
            let _ = a.sort({
              value: a.value,
              modifier: a.modifier
            }, {
              value: s.value,
              modifier: s.modifier
            });
            if (_ !== 0) return _;
          }
        return e.variants !== t.variants ? e.variants - t.variants : e.parallelIndex !== t.parallelIndex ? e.parallelIndex - t.parallelIndex : e.arbitrary !== t.arbitrary ? e.arbitrary - t.arbitrary : e.propertyOffset !== t.propertyOffset ? e.propertyOffset - t.propertyOffset : e.index - t.index;
      }
      /**
      * Arbitrary variants are recorded in the order they're encountered.
      * This means that the order is not stable between environments and sets of content files.
      *
      * In order to make the order stable, we need to remap the arbitrary variant offsets to
      * be in alphabetical order starting from the offset of the first arbitrary variant.
      */
      recalculateVariantOffsets() {
        let e = Array.from(this.variantOffsets.entries()).filter(([a]) => a.startsWith("[")).sort(([a], [s]) => o(a, s)), t = e.map(([, a]) => a).sort((a, s) => (0, i.default)(a - s));
        return e.map(([, a], s) => [
          a,
          t[s]
        ]).filter(([a, s]) => a !== s);
      }
      /**
      * @template T
      * @param {[RuleOffset, T][]} list
      * @returns {[RuleOffset, T][]}
      */
      remapArbitraryVariantOffsets(e) {
        let t = this.recalculateVariantOffsets();
        return t.length === 0 ? e : e.map((n) => {
          let [a, s] = n;
          return a = {
            ...a,
            variants: (0, v.remapBitfield)(a.variants, t)
          }, [
            a,
            s
          ];
        });
      }
      /**
      * @template T
      * @param {[RuleOffset, T][]} list
      * @returns {[RuleOffset, T][]}
      */
      sortArbitraryProperties(e) {
        let t = /* @__PURE__ */ new Set();
        for (let [g] of e)
          g.arbitrary === 1n && t.add(g.property);
        if (t.size === 0)
          return e;
        let n = Array.from(t).sort(), a = /* @__PURE__ */ new Map(), s = 1n;
        for (let g of n)
          a.set(g, s++);
        return e.map((g) => {
          let [b, r] = g;
          var c;
          return b = {
            ...b,
            propertyOffset: (c = a.get(b.property)) !== null && c !== void 0 ? c : 0n
          }, [
            b,
            r
          ];
        });
      }
      /**
      * @template T
      * @param {[RuleOffset, T][]} list
      * @returns {[RuleOffset, T][]}
      */
      sort(e) {
        return e = this.remapArbitraryVariantOffsets(e), e = this.sortArbitraryProperties(e), e.sort(([t], [n]) => (0, i.default)(this.compare(t, n)));
      }
    }
    function f(d) {
      let e = null;
      for (const t of d)
        e = e ?? t, e = e > t ? e : t;
      return e;
    }
    function o(d, e) {
      let t = d.length, n = e.length, a = t < n ? t : n;
      for (let s = 0; s < a; s++) {
        let g = d.charCodeAt(s) - e.charCodeAt(s);
        if (g !== 0) return g;
      }
      return t - n;
    }
  })(Fi)), Fi;
}
var el;
function Ma() {
  return el || (el = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(J, H) {
      for (var re in H) Object.defineProperty(J, re, {
        enumerable: !0,
        get: H[re]
      });
    }
    i(l, {
      INTERNAL_FEATURES: function() {
        return D;
      },
      isValidVariantFormatString: function() {
        return E;
      },
      parseVariant: function() {
        return q;
      },
      getFileModifiedMap: function() {
        return $;
      },
      createContext: function() {
        return fe;
      },
      getContext: function() {
        return we;
      }
    });
    const v = /* @__PURE__ */ w(We), p = /* @__PURE__ */ w(We), u = /* @__PURE__ */ w(Je()), f = /* @__PURE__ */ w(Ql()), o = /* @__PURE__ */ w(lt()), d = /* @__PURE__ */ w(zr()), e = /* @__PURE__ */ w(kf()), t = /* @__PURE__ */ w(Ra()), n = /* @__PURE__ */ w(gt()), a = /* @__PURE__ */ w(mt()), s = /* @__PURE__ */ N(Af()), g = jr(), b = hd(), r = /* @__PURE__ */ N(Qr()), c = Sa(), _ = /* @__PURE__ */ w(ot()), m = /* @__PURE__ */ w(xa()), y = /* @__PURE__ */ w(Rf()), S = Hr(), h = vd(), O = yd(), C = dt(), T = Ef();
    function w(J) {
      return J && J.__esModule ? J : {
        default: J
      };
    }
    function P(J) {
      if (typeof WeakMap != "function") return null;
      var H = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap();
      return (P = function(te) {
        return te ? re : H;
      })(J);
    }
    function N(J, H) {
      if (J && J.__esModule)
        return J;
      if (J === null || typeof J != "object" && typeof J != "function")
        return {
          default: J
        };
      var re = P(H);
      if (re && re.has(J))
        return re.get(J);
      var te = {}, ee = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var ae in J)
        if (ae !== "default" && Object.prototype.hasOwnProperty.call(J, ae)) {
          var ce = ee ? Object.getOwnPropertyDescriptor(J, ae) : null;
          ce && (ce.get || ce.set) ? Object.defineProperty(te, ae, ce) : te[ae] = J[ae];
        }
      return te.default = J, re && re.set(J, te), te;
    }
    const D = Symbol(), B = {
      MatchVariant: Symbol.for("MATCH_VARIANT")
    }, k = {
      Base: 1,
      Dynamic: 2
    };
    function A(J, H) {
      let re = J.tailwindConfig.prefix;
      return typeof re == "function" ? re(H) : re + H;
    }
    function R({ type: J = "any", ...H }) {
      let re = [].concat(J);
      return {
        ...H,
        types: re.map((te) => Array.isArray(te) ? {
          type: te[0],
          ...te[1]
        } : {
          type: te,
          preferOnConflict: !1
        })
      };
    }
    function I(J) {
      let H = [], re = "", te = 0;
      for (let ee = 0; ee < J.length; ee++) {
        let ae = J[ee];
        if (ae === "\\")
          re += "\\" + J[++ee];
        else if (ae === "{")
          ++te, H.push(re.trim()), re = "";
        else if (ae === "}") {
          if (--te < 0)
            throw new Error("Your { and } are unbalanced.");
          H.push(re.trim()), re = "";
        } else
          re += ae;
      }
      return re.length > 0 && H.push(re.trim()), H = H.filter((ee) => ee !== ""), H;
    }
    function W(J, H, { before: re = [] } = {}) {
      if (re = [].concat(re), re.length <= 0) {
        J.push(H);
        return;
      }
      let te = J.length - 1;
      for (let ee of re) {
        let ae = J.indexOf(ee);
        ae !== -1 && (te = Math.min(te, ae));
      }
      J.splice(te, 0, H);
    }
    function Q(J) {
      return Array.isArray(J) ? J.flatMap((H) => !Array.isArray(H) && !(0, n.default)(H) ? H : (0, e.default)(H)) : Q([
        J
      ]);
    }
    function z(J, H) {
      return (0, o.default)((te) => {
        let ee = [];
        return H && H(te), te.walkClasses((ae) => {
          ee.push(ae.value);
        }), ee;
      }).transformSync(J);
    }
    function L(J) {
      J.walkPseudos((H) => {
        H.value === ":not" && H.remove();
      });
    }
    function F(J, H = {
      containsNonOnDemandable: !1
    }, re = 0) {
      let te = [], ee = [];
      J.type === "rule" ? ee.push(...J.selectors) : J.type === "atrule" && J.walkRules((ae) => ee.push(...ae.selectors));
      for (let ae of ee) {
        let ce = z(ae, L);
        ce.length === 0 && (H.containsNonOnDemandable = !0);
        for (let xe of ce)
          te.push(xe);
      }
      return re === 0 ? [
        H.containsNonOnDemandable || te.length === 0,
        te
      ] : te;
    }
    function M(J) {
      return Q(J).flatMap((H) => {
        let re = /* @__PURE__ */ new Map(), [te, ee] = F(H);
        return te && ee.unshift(r.NOT_ON_DEMAND), ee.map((ae) => (re.has(H) || re.set(H, H), [
          ae,
          re.get(H)
        ]));
      });
    }
    function E(J) {
      return J.startsWith("@") || J.includes("&");
    }
    function q(J) {
      J = J.replace(/\n+/g, "").replace(/\s{1,}/g, " ").trim();
      let H = I(J).map((re) => {
        if (!re.startsWith("@"))
          return ({ format: ce }) => ce(re);
        let [, te, ee] = /@(\S*)( .+|[({].*)?/g.exec(re);
        var ae;
        return ({ wrap: ce }) => ce(u.default.atRule({
          name: te,
          params: (ae = ee == null ? void 0 : ee.trim()) !== null && ae !== void 0 ? ae : ""
        }));
      }).reverse();
      return (re) => {
        for (let te of H)
          te(re);
      };
    }
    function G(J, H, { variantList: re, variantMap: te, offsets: ee, classList: ae }) {
      function ce(se, ie) {
        return se ? (0, f.default)(J, se, ie) : J;
      }
      function xe(se) {
        return (0, t.default)(J.prefix, se);
      }
      function pe(se, ie) {
        return se === r.NOT_ON_DEMAND ? r.NOT_ON_DEMAND : ie.respectPrefix ? H.tailwindConfig.prefix + se : se;
      }
      function ke(se, ie, he = {}) {
        let Oe = (0, c.toPath)(se), Se = ce([
          "theme",
          ...Oe
        ], ie);
        return (0, d.default)(Oe[0])(Se, he);
      }
      let me = 0, Re = {
        postcss: u.default,
        prefix: xe,
        e: a.default,
        config: ce,
        theme: ke,
        corePlugins: (se) => Array.isArray(J.corePlugins) ? J.corePlugins.includes(se) : ce([
          "corePlugins",
          se
        ], !0),
        variants: () => [],
        addBase(se) {
          for (let [ie, he] of M(se)) {
            let Oe = pe(ie, {}), Se = ee.create("base");
            H.candidateRuleMap.has(Oe) || H.candidateRuleMap.set(Oe, []), H.candidateRuleMap.get(Oe).push([
              {
                sort: Se,
                layer: "base"
              },
              he
            ]);
          }
        },
        /**
        * @param {string} group
        * @param {Record<string, string | string[]>} declarations
        */
        addDefaults(se, ie) {
          const he = {
            [`@defaults ${se}`]: ie
          };
          for (let [Oe, Se] of M(he)) {
            let ye = pe(Oe, {});
            H.candidateRuleMap.has(ye) || H.candidateRuleMap.set(ye, []), H.candidateRuleMap.get(ye).push([
              {
                sort: ee.create("defaults"),
                layer: "defaults"
              },
              Se
            ]);
          }
        },
        addComponents(se, ie) {
          ie = Object.assign({}, {
            preserveSource: !1,
            respectPrefix: !0,
            respectImportant: !1
          }, Array.isArray(ie) ? {} : ie);
          for (let [Oe, Se] of M(se)) {
            let ye = pe(Oe, ie);
            ae.add(ye), H.candidateRuleMap.has(ye) || H.candidateRuleMap.set(ye, []), H.candidateRuleMap.get(ye).push([
              {
                sort: ee.create("components"),
                layer: "components",
                options: ie
              },
              Se
            ]);
          }
        },
        addUtilities(se, ie) {
          ie = Object.assign({}, {
            preserveSource: !1,
            respectPrefix: !0,
            respectImportant: !0
          }, Array.isArray(ie) ? {} : ie);
          for (let [Oe, Se] of M(se)) {
            let ye = pe(Oe, ie);
            ae.add(ye), H.candidateRuleMap.has(ye) || H.candidateRuleMap.set(ye, []), H.candidateRuleMap.get(ye).push([
              {
                sort: ee.create("utilities"),
                layer: "utilities",
                options: ie
              },
              Se
            ]);
          }
        },
        matchUtilities: function(se, ie) {
          ie = R({
            ...{
              respectPrefix: !0,
              respectImportant: !0,
              modifiers: !1
            },
            ...ie
          });
          let Oe = ee.create("utilities");
          for (let Se in se) {
            let $e = function(Pe, { isOnlyPlugin: _e }) {
              let [ge, Te, je] = (0, g.coerceValue)(ie.types, Pe, ie, J);
              if (ge === void 0)
                return [];
              if (!ie.types.some(({ type: Ye }) => Ye === Te))
                if (_e)
                  _.default.warn([
                    `Unnecessary typehint \`${Te}\` in \`${Se}-${Pe}\`.`,
                    `You can safely update it to \`${Se}-${Pe.replace(Te + ":", "")}\`.`
                  ]);
                else
                  return [];
              if (!(0, y.default)(ge))
                return [];
              let it = {
                get modifier() {
                  return ie.modifiers || _.default.warn(`modifier-used-without-options-for-${Se}`, [
                    "Your plugin must set `modifiers: true` in its options to support modifiers."
                  ]), je;
                }
              }, Ge = (0, C.flagEnabled)(J, "generalizedModifiers");
              return [].concat(Ge ? Ie(ge, it) : Ie(ge)).filter(Boolean).map((Ye) => ({
                [(0, s.default)(Se, Pe)]: Ye
              }));
            }, ye = pe(Se, ie), Ie = se[Se];
            ae.add([
              ye,
              ie
            ]);
            let be = [
              {
                sort: Oe,
                layer: "utilities",
                options: ie
              },
              $e
            ];
            H.candidateRuleMap.has(ye) || H.candidateRuleMap.set(ye, []), H.candidateRuleMap.get(ye).push(be);
          }
        },
        matchComponents: function(se, ie) {
          ie = R({
            ...{
              respectPrefix: !0,
              respectImportant: !1,
              modifiers: !1
            },
            ...ie
          });
          let Oe = ee.create("components");
          for (let Se in se) {
            let $e = function(Pe, { isOnlyPlugin: _e }) {
              let [ge, Te, je] = (0, g.coerceValue)(ie.types, Pe, ie, J);
              if (ge === void 0)
                return [];
              if (!ie.types.some(({ type: Ye }) => Ye === Te))
                if (_e)
                  _.default.warn([
                    `Unnecessary typehint \`${Te}\` in \`${Se}-${Pe}\`.`,
                    `You can safely update it to \`${Se}-${Pe.replace(Te + ":", "")}\`.`
                  ]);
                else
                  return [];
              if (!(0, y.default)(ge))
                return [];
              let it = {
                get modifier() {
                  return ie.modifiers || _.default.warn(`modifier-used-without-options-for-${Se}`, [
                    "Your plugin must set `modifiers: true` in its options to support modifiers."
                  ]), je;
                }
              }, Ge = (0, C.flagEnabled)(J, "generalizedModifiers");
              return [].concat(Ge ? Ie(ge, it) : Ie(ge)).filter(Boolean).map((Ye) => ({
                [(0, s.default)(Se, Pe)]: Ye
              }));
            }, ye = pe(Se, ie), Ie = se[Se];
            ae.add([
              ye,
              ie
            ]);
            let be = [
              {
                sort: Oe,
                layer: "components",
                options: ie
              },
              $e
            ];
            H.candidateRuleMap.has(ye) || H.candidateRuleMap.set(ye, []), H.candidateRuleMap.get(ye).push(be);
          }
        },
        addVariant(se, ie, he = {}) {
          ie = [].concat(ie).map((Oe) => {
            if (typeof Oe != "string")
              return (Se = {}) => {
                let { args: ye, modifySelectors: Ie, container: $e, separator: be, wrap: Pe, format: _e } = Se, ge = Oe(Object.assign({
                  modifySelectors: Ie,
                  container: $e,
                  separator: be
                }, he.type === B.MatchVariant && {
                  args: ye,
                  wrap: Pe,
                  format: _e
                }));
                if (typeof ge == "string" && !E(ge))
                  throw new Error(`Your custom variant \`${se}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`);
                return Array.isArray(ge) ? ge.filter((Te) => typeof Te == "string").map((Te) => q(Te)) : ge && typeof ge == "string" && q(ge)(Se);
              };
            if (!E(Oe))
              throw new Error(`Your custom variant \`${se}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`);
            return q(Oe);
          }), W(re, se, he), te.set(se, ie), H.variantOptions.set(se, he);
        },
        matchVariant(se, ie, he) {
          var Oe;
          let Se = (Oe = he == null ? void 0 : he.id) !== null && Oe !== void 0 ? Oe : ++me, ye = se === "@", Ie = (0, C.flagEnabled)(J, "generalizedModifiers");
          var $e;
          for (let [_e, ge] of Object.entries(($e = he == null ? void 0 : he.values) !== null && $e !== void 0 ? $e : {}))
            _e !== "DEFAULT" && Re.addVariant(ye ? `${se}${_e}` : `${se}-${_e}`, ({ args: Te, container: je }) => ie(ge, Ie ? {
              modifier: Te == null ? void 0 : Te.modifier,
              container: je
            } : {
              container: je
            }), {
              ...he,
              value: ge,
              id: Se,
              type: B.MatchVariant,
              variantInfo: k.Base
            });
          var be;
          let Pe = "DEFAULT" in ((be = he == null ? void 0 : he.values) !== null && be !== void 0 ? be : {});
          Re.addVariant(se, ({ args: _e, container: ge }) => {
            if ((_e == null ? void 0 : _e.value) === r.NONE && !Pe)
              return null;
            var Te;
            return ie((_e == null ? void 0 : _e.value) === r.NONE ? he.values.DEFAULT : (Te = _e == null ? void 0 : _e.value) !== null && Te !== void 0 ? Te : typeof _e == "string" ? _e : "", Ie ? {
              modifier: _e == null ? void 0 : _e.modifier,
              container: ge
            } : {
              container: ge
            });
          }, {
            ...he,
            id: Se,
            type: B.MatchVariant,
            variantInfo: k.Dynamic
          });
        }
      };
      return Re;
    }
    let x = /* @__PURE__ */ new WeakMap();
    function $(J) {
      return x.has(J) || x.set(J, /* @__PURE__ */ new Map()), x.get(J);
    }
    function V(J, H) {
      let re = !1, te = /* @__PURE__ */ new Map();
      for (let ae of J) {
        var ee;
        if (!ae) continue;
        let ce = p.default.parse(ae), xe = ce.hash ? ce.href.replace(ce.hash, "") : ce.href;
        xe = ce.search ? xe.replace(ce.search, "") : xe;
        let pe = (ee = v.default.statSync(decodeURIComponent(xe), {
          throwIfNoEntry: !1
        })) === null || ee === void 0 ? void 0 : ee.mtimeMs;
        pe && ((!H.has(ae) || pe > H.get(ae)) && (re = !0), te.set(ae, pe));
      }
      return [
        re,
        te
      ];
    }
    function Y(J) {
      J.walkAtRules((H) => {
        [
          "responsive",
          "variants"
        ].includes(H.name) && (Y(H), H.before(H.nodes), H.remove());
      });
    }
    function U(J) {
      let H = [];
      return J.each((re) => {
        re.type === "atrule" && [
          "responsive",
          "variants"
        ].includes(re.name) && (re.name = "layer", re.params = "utilities");
      }), J.walkAtRules("layer", (re) => {
        if (Y(re), re.params === "base") {
          for (let te of re.nodes)
            H.push(function({ addBase: ee }) {
              ee(te, {
                respectPrefix: !1
              });
            });
          re.remove();
        } else if (re.params === "components") {
          for (let te of re.nodes)
            H.push(function({ addComponents: ee }) {
              ee(te, {
                respectPrefix: !1,
                preserveSource: !0
              });
            });
          re.remove();
        } else if (re.params === "utilities") {
          for (let te of re.nodes)
            H.push(function({ addUtilities: ee }) {
              ee(te, {
                respectPrefix: !1,
                preserveSource: !0
              });
            });
          re.remove();
        }
      }), H;
    }
    function K(J, H) {
      let re = Object.entries({
        ...b.variantPlugins,
        ...b.corePlugins
      }).map(([pe, ke]) => J.tailwindConfig.corePlugins.includes(pe) ? ke : null).filter(Boolean), te = J.tailwindConfig.plugins.map((pe) => (pe.__isOptionsFunction && (pe = pe()), typeof pe == "function" ? pe : pe.handler)), ee = U(H), ae = [
        b.variantPlugins.childVariant,
        b.variantPlugins.pseudoElementVariants,
        b.variantPlugins.pseudoClassVariants,
        b.variantPlugins.hasVariants,
        b.variantPlugins.ariaVariants,
        b.variantPlugins.dataVariants
      ], ce = [
        b.variantPlugins.supportsVariants,
        b.variantPlugins.reducedMotionVariants,
        b.variantPlugins.prefersContrastVariants,
        b.variantPlugins.screenVariants,
        b.variantPlugins.orientationVariants,
        b.variantPlugins.directionVariants,
        b.variantPlugins.darkVariants,
        b.variantPlugins.forcedColorsVariants,
        b.variantPlugins.printVariant
      ];
      return (J.tailwindConfig.darkMode === "class" || Array.isArray(J.tailwindConfig.darkMode) && J.tailwindConfig.darkMode[0] === "class") && (ce = [
        b.variantPlugins.supportsVariants,
        b.variantPlugins.reducedMotionVariants,
        b.variantPlugins.prefersContrastVariants,
        b.variantPlugins.darkVariants,
        b.variantPlugins.screenVariants,
        b.variantPlugins.orientationVariants,
        b.variantPlugins.directionVariants,
        b.variantPlugins.forcedColorsVariants,
        b.variantPlugins.printVariant
      ]), [
        ...re,
        ...ae,
        ...te,
        ...ce,
        ...ee
      ];
    }
    function X(J, H) {
      let re = [], te = /* @__PURE__ */ new Map();
      H.variantMap = te;
      let ee = new O.Offsets();
      H.offsets = ee;
      let ae = /* @__PURE__ */ new Set(), ce = G(H.tailwindConfig, H, {
        variantList: re,
        variantMap: te,
        offsets: ee,
        classList: ae
      });
      for (let ie of J)
        if (Array.isArray(ie))
          for (let he of ie)
            he(ce);
        else
          ie == null || ie(ce);
      ee.recordVariants(re, (ie) => te.get(ie).length);
      for (let [ie, he] of te.entries())
        H.variantMap.set(ie, he.map((Oe, Se) => [
          ee.forVariant(ie, Se),
          Oe
        ]));
      var xe;
      let pe = ((xe = H.tailwindConfig.safelist) !== null && xe !== void 0 ? xe : []).filter(Boolean);
      if (pe.length > 0) {
        let ie = [];
        for (let he of pe) {
          if (typeof he == "string") {
            H.changedContent.push({
              content: he,
              extension: "html"
            });
            continue;
          }
          if (he instanceof RegExp) {
            _.default.warn("root-regex", [
              "Regular expressions in `safelist` work differently in Tailwind CSS v3.0.",
              "Update your `safelist` configuration to eliminate this warning.",
              "https://tailwindcss.com/docs/content-configuration#safelisting-classes"
            ]);
            continue;
          }
          ie.push(he);
        }
        if (ie.length > 0) {
          let he = /* @__PURE__ */ new Map(), Oe = H.tailwindConfig.prefix.length, Se = ie.some((ye) => ye.pattern.source.includes("!"));
          for (let ye of ae) {
            let Ie = Array.isArray(ye) ? (() => {
              let [$e, be] = ye;
              var Pe;
              let ge = Object.keys((Pe = be == null ? void 0 : be.values) !== null && Pe !== void 0 ? Pe : {}).map((Te) => (0, s.formatClass)($e, Te));
              return be != null && be.supportsNegativeValues && (ge = [
                ...ge,
                ...ge.map((Te) => "-" + Te)
              ], ge = [
                ...ge,
                ...ge.map((Te) => Te.slice(0, Oe) + "-" + Te.slice(Oe))
              ]), be.types.some(({ type: Te }) => Te === "color") && (ge = [
                ...ge,
                ...ge.flatMap((Te) => Object.keys(H.tailwindConfig.theme.opacity).map((je) => `${Te}/${je}`))
              ]), Se && (be != null && be.respectImportant) && (ge = [
                ...ge,
                ...ge.map((Te) => "!" + Te)
              ]), ge;
            })() : [
              ye
            ];
            for (let $e of Ie)
              for (let { pattern: be, variants: Pe = [] } of ie)
                if (be.lastIndex = 0, he.has(be) || he.set(be, 0), !!be.test($e)) {
                  he.set(be, he.get(be) + 1), H.changedContent.push({
                    content: $e,
                    extension: "html"
                  });
                  for (let _e of Pe)
                    H.changedContent.push({
                      content: _e + H.tailwindConfig.separator + $e,
                      extension: "html"
                    });
                }
          }
          for (let [ye, Ie] of he.entries())
            Ie === 0 && _.default.warn([
              `The safelist pattern \`${ye}\` doesn't match any Tailwind CSS classes.`,
              "Fix this pattern or remove it from your `safelist` configuration.",
              "https://tailwindcss.com/docs/content-configuration#safelisting-classes"
            ]);
        }
      }
      var ke, me;
      let Re = (me = [].concat((ke = H.tailwindConfig.darkMode) !== null && ke !== void 0 ? ke : "media")[1]) !== null && me !== void 0 ? me : "dark", se = [
        A(H, Re),
        A(H, "group"),
        A(H, "peer")
      ];
      H.getClassOrder = function(he) {
        let Oe = [
          ...he
        ].sort((be, Pe) => be === Pe ? 0 : be < Pe ? -1 : 1), Se = new Map(Oe.map((be) => [
          be,
          null
        ])), ye = (0, S.generateRules)(new Set(Oe), H, !0);
        ye = H.offsets.sort(ye);
        let Ie = BigInt(se.length);
        for (const [, be] of ye) {
          let Pe = be.raws.tailwind.candidate;
          var $e;
          Se.set(Pe, ($e = Se.get(Pe)) !== null && $e !== void 0 ? $e : Ie++);
        }
        return he.map((be) => {
          var Pe;
          let _e = (Pe = Se.get(be)) !== null && Pe !== void 0 ? Pe : null, ge = se.indexOf(be);
          return _e === null && ge !== -1 && (_e = BigInt(ge)), [
            be,
            _e
          ];
        });
      }, H.getClassList = function(he = {}) {
        let Oe = [];
        for (let be of ae)
          if (Array.isArray(be)) {
            var Se;
            let [Pe, _e] = be, ge = [];
            var ye;
            let Te = Object.keys((ye = _e == null ? void 0 : _e.modifiers) !== null && ye !== void 0 ? ye : {});
            if (!(_e == null || (Se = _e.types) === null || Se === void 0) && Se.some(({ type: Ge }) => Ge === "color")) {
              var Ie;
              Te.push(...Object.keys((Ie = H.tailwindConfig.theme.opacity) !== null && Ie !== void 0 ? Ie : {}));
            }
            let je = {
              modifiers: Te
            }, it = he.includeMetadata && Te.length > 0;
            var $e;
            for (let [Ge, at] of Object.entries(($e = _e == null ? void 0 : _e.values) !== null && $e !== void 0 ? $e : {})) {
              if (at == null)
                continue;
              let Ye = (0, s.formatClass)(Pe, Ge);
              if (Oe.push(it ? [
                Ye,
                je
              ] : Ye), _e != null && _e.supportsNegativeValues && (0, m.default)(at)) {
                let rt = (0, s.formatClass)(Pe, `-${Ge}`);
                ge.push(it ? [
                  rt,
                  je
                ] : rt);
              }
            }
            Oe.push(...ge);
          } else
            Oe.push(be);
        return Oe;
      }, H.getVariants = function() {
        let he = Math.random().toString(36).substring(7).toUpperCase(), Oe = [];
        for (let [ye, Ie] of H.variantOptions.entries())
          if (Ie.variantInfo !== k.Base) {
            var Se;
            Oe.push({
              name: ye,
              isArbitrary: Ie.type === Symbol.for("MATCH_VARIANT"),
              values: Object.keys((Se = Ie.values) !== null && Se !== void 0 ? Se : {}),
              hasDash: ye !== "@",
              selectors({ modifier: $e, value: be } = {}) {
                let Pe = `TAILWINDPLACEHOLDER${he}`, _e = u.default.rule({
                  selector: `.${Pe}`
                }), ge = u.default.root({
                  nodes: [
                    _e.clone()
                  ]
                }), Te = ge.toString();
                var je;
                let it = ((je = H.variantMap.get(ye)) !== null && je !== void 0 ? je : []).flatMap(([Qe, He]) => He), Ge = [];
                for (let Qe of it) {
                  var at;
                  let He = [];
                  var Ye;
                  let yt = {
                    args: {
                      modifier: $e,
                      value: (Ye = (at = Ie.values) === null || at === void 0 ? void 0 : at[be]) !== null && Ye !== void 0 ? Ye : be
                    },
                    separator: H.tailwindConfig.separator,
                    modifySelectors(Ke) {
                      return ge.each((Zr) => {
                        Zr.type === "rule" && (Zr.selectors = Zr.selectors.map((La) => Ke({
                          get className() {
                            return (0, S.getClassNameFromSelector)(La);
                          },
                          selector: La
                        })));
                      }), ge;
                    },
                    format(Ke) {
                      He.push(Ke);
                    },
                    wrap(Ke) {
                      He.push(`@${Ke.name} ${Ke.params} { & }`);
                    },
                    container: ge
                  }, wt = Qe(yt);
                  if (He.length > 0 && Ge.push(He), Array.isArray(wt))
                    for (let Ke of wt)
                      He = [], Ke(yt), Ge.push(He);
                }
                let rt = [], Mf = ge.toString();
                Te !== Mf && (ge.walkRules((Qe) => {
                  let He = Qe.selector, yt = (0, o.default)((wt) => {
                    wt.walkClasses((Ke) => {
                      Ke.value = `${ye}${H.tailwindConfig.separator}${Ke.value}`;
                    });
                  }).processSync(He);
                  rt.push(He.replace(yt, "&").replace(Pe, "&"));
                }), ge.walkAtRules((Qe) => {
                  rt.push(`@${Qe.name} (${Qe.params}) { & }`);
                }));
                var Jr;
                let Df = !(be in ((Jr = Ie.values) !== null && Jr !== void 0 ? Jr : {}));
                var Kr;
                let qf = (Kr = Ie[D]) !== null && Kr !== void 0 ? Kr : {}, Da = !(Df || qf.respectPrefix === !1);
                Ge = Ge.map((Qe) => Qe.map((He) => ({
                  format: He,
                  respectPrefix: Da
                }))), rt = rt.map((Qe) => ({
                  format: Qe,
                  respectPrefix: Da
                }));
                let Xr = {
                  candidate: Pe,
                  context: H
                }, qa = Ge.map((Qe) => (0, T.finalizeSelector)(`.${Pe}`, (0, T.formatVariantSelector)(Qe, Xr), Xr).replace(`.${Pe}`, "&").replace("{ & }", "").trim());
                return rt.length > 0 && qa.push((0, T.formatVariantSelector)(rt, Xr).toString().replace(`.${Pe}`, "&")), qa;
              }
            });
          }
        return Oe;
      };
    }
    function j(J, H) {
      J.classCache.has(H) && (J.notClassCache.add(H), J.classCache.delete(H), J.applyClassCache.delete(H), J.candidateRuleMap.delete(H), J.candidateRuleCache.delete(H), J.stylesheetCache = null);
    }
    function Z(J, H) {
      let re = H.raws.tailwind.candidate;
      if (re) {
        for (const te of J.ruleCache)
          te[1].raws.tailwind.candidate === re && J.ruleCache.delete(te);
        j(J, re);
      }
    }
    function fe(J, H = [], re = u.default.root()) {
      var te;
      let ee = {
        disposables: [],
        ruleCache: /* @__PURE__ */ new Set(),
        candidateRuleCache: /* @__PURE__ */ new Map(),
        classCache: /* @__PURE__ */ new Map(),
        applyClassCache: /* @__PURE__ */ new Map(),
        // Seed the not class cache with the blocklist (which is only strings)
        notClassCache: new Set((te = J.blocklist) !== null && te !== void 0 ? te : []),
        postCssNodeCache: /* @__PURE__ */ new Map(),
        candidateRuleMap: /* @__PURE__ */ new Map(),
        tailwindConfig: J,
        changedContent: H,
        variantMap: /* @__PURE__ */ new Map(),
        stylesheetCache: null,
        variantOptions: /* @__PURE__ */ new Map(),
        markInvalidUtilityCandidate: (ce) => j(ee, ce),
        markInvalidUtilityNode: (ce) => Z(ee, ce)
      }, ae = K(ee, re);
      return X(ae, ee), ee;
    }
    let ve = r.contextMap, de = r.configContextMap, ne = r.contextSourcesMap;
    function we(J, H, re, te, ee, ae) {
      let ce = H.opts.from, xe = te !== null;
      r.env.DEBUG && console.log("Source path:", ce);
      let pe;
      if (xe && ve.has(ce))
        pe = ve.get(ce);
      else if (de.has(ee)) {
        let se = de.get(ee);
        ne.get(se).add(ce), ve.set(ce, se), pe = se;
      }
      let ke = (0, h.hasContentChanged)(ce, J);
      if (pe) {
        let [se, ie] = V([
          ...ae
        ], $(pe));
        if (!se && !ke)
          return [
            pe,
            !1,
            ie
          ];
      }
      if (ve.has(ce)) {
        let se = ve.get(ce);
        if (ne.has(se) && (ne.get(se).delete(ce), ne.get(se).size === 0)) {
          ne.delete(se);
          for (let [ie, he] of de)
            he === se && de.delete(ie);
          for (let ie of se.disposables.splice(0))
            ie(se);
        }
      }
      r.env.DEBUG && console.log("Setting up new context...");
      let me = fe(re, [], J);
      Object.assign(me, {
        userConfigPath: te
      });
      let [, Re] = V([
        ...ae
      ], $(me));
      return de.set(ee, me), ve.set(ce, me), ne.has(me) || ne.set(me, /* @__PURE__ */ new Set()), ne.get(me).add(ce), [
        me,
        !0,
        Re
      ];
    }
  })(Ai)), Ai;
}
var Wi = {}, tl;
function If() {
  return tl || (tl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "applyImportantSelector", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const i = /* @__PURE__ */ p(lt()), v = Ia();
    function p(f) {
      return f && f.__esModule ? f : {
        default: f
      };
    }
    function u(f, o) {
      let d = (0, i.default)().astSync(f);
      return d.each((e) => {
        e.nodes.some((n) => n.type === "combinator") && (e.nodes = [
          i.default.pseudo({
            value: ":is",
            nodes: [
              e.clone()
            ]
          })
        ]), (0, v.movePseudos)(e);
      }), `${o} ${d.toString()}`;
    }
  })(Wi)), Wi;
}
var rl;
function Hr() {
  return rl || (rl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(x, $) {
      for (var V in $) Object.defineProperty(x, V, {
        enumerable: !0,
        get: $[V]
      });
    }
    i(l, {
      getClassNameFromSelector: function() {
        return O;
      },
      resolveMatches: function() {
        return L;
      },
      generateRules: function() {
        return q;
      }
    });
    const v = /* @__PURE__ */ m(Je()), p = /* @__PURE__ */ m(lt()), u = /* @__PURE__ */ m(kf()), f = /* @__PURE__ */ m(gt()), o = /* @__PURE__ */ m(Ra()), d = jr(), e = /* @__PURE__ */ m(ot()), t = /* @__PURE__ */ S(Qr()), n = Ef(), a = Af(), s = Vr(), g = Ma(), b = /* @__PURE__ */ m(Rf()), r = pt(), c = dt(), _ = If();
    function m(x) {
      return x && x.__esModule ? x : {
        default: x
      };
    }
    function y(x) {
      if (typeof WeakMap != "function") return null;
      var $ = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap();
      return (y = function(Y) {
        return Y ? V : $;
      })(x);
    }
    function S(x, $) {
      if (x && x.__esModule)
        return x;
      if (x === null || typeof x != "object" && typeof x != "function")
        return {
          default: x
        };
      var V = y($);
      if (V && V.has(x))
        return V.get(x);
      var Y = {}, U = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var K in x)
        if (K !== "default" && Object.prototype.hasOwnProperty.call(x, K)) {
          var X = U ? Object.getOwnPropertyDescriptor(x, K) : null;
          X && (X.get || X.set) ? Object.defineProperty(Y, K, X) : Y[K] = x[K];
        }
      return Y.default = x, V && V.set(x, Y), Y;
    }
    let h = (0, p.default)((x) => x.first.filter(({ type: $ }) => $ === "class").pop().value);
    function O(x) {
      return h.transformSync(x);
    }
    function* C(x) {
      let $ = 1 / 0;
      for (; $ >= 0; ) {
        let V, Y = !1;
        if ($ === 1 / 0 && x.endsWith("]")) {
          let X = x.indexOf("[");
          x[X - 1] === "-" ? V = X - 1 : x[X - 1] === "/" ? (V = X - 1, Y = !0) : V = -1;
        } else $ === 1 / 0 && x.includes("/") ? (V = x.lastIndexOf("/"), Y = !0) : V = x.lastIndexOf("-", $);
        if (V < 0)
          break;
        let U = x.slice(0, V), K = x.slice(Y ? V : V + 1);
        $ = V - 1, !(U === "" || K === "/") && (yield [
          U,
          K
        ]);
      }
    }
    function T(x, $) {
      if (x.length === 0 || $.tailwindConfig.prefix === "")
        return x;
      for (let V of x) {
        let [Y] = V;
        if (Y.options.respectPrefix) {
          let U = v.default.root({
            nodes: [
              V[1].clone()
            ]
          }), K = V[1].raws.tailwind.classCandidate;
          U.walkRules((X) => {
            let j = K.startsWith("-");
            X.selector = (0, o.default)($.tailwindConfig.prefix, X.selector, j);
          }), V[1] = U.nodes[0];
        }
      }
      return x;
    }
    function w(x, $) {
      if (x.length === 0)
        return x;
      let V = [];
      function Y(U) {
        return U.parent && U.parent.type === "atrule" && U.parent.name === "keyframes";
      }
      for (let [U, K] of x) {
        let X = v.default.root({
          nodes: [
            K.clone()
          ]
        });
        X.walkRules((j) => {
          if (Y(j))
            return;
          let Z = (0, p.default)().astSync(j.selector);
          Z.each((fe) => (0, n.eliminateIrrelevantSelectors)(fe, $)), (0, d.updateAllClasses)(Z, (fe) => fe === $ ? `!${fe}` : fe), j.selector = Z.toString(), j.walkDecls((fe) => fe.important = !0);
        }), V.push([
          {
            ...U,
            important: !0
          },
          X.nodes[0]
        ]);
      }
      return V;
    }
    function P(x, $, V) {
      if ($.length === 0)
        return $;
      let Y = {
        modifier: null,
        value: t.NONE
      };
      {
        let [j, ...Z] = (0, r.splitAtTopLevelOnly)(x, "/");
        if (Z.length > 1 && (j = j + "/" + Z.slice(0, -1).join("/"), Z = Z.slice(-1)), Z.length && !V.variantMap.has(x) && (x = j, Y.modifier = Z[0], !(0, c.flagEnabled)(V.tailwindConfig, "generalizedModifiers")))
          return [];
      }
      if (x.endsWith("]") && !x.startsWith("[")) {
        let j = /(.)(-?)\[(.*)\]/g.exec(x);
        if (j) {
          let [, Z, fe, ve] = j;
          if (Z === "@" && fe === "-") return [];
          if (Z !== "@" && fe === "") return [];
          x = x.replace(`${fe}[${ve}]`, ""), Y.value = ve;
        }
      }
      if (G(x) && !V.variantMap.has(x)) {
        let j = V.offsets.recordVariant(x), Z = (0, s.normalize)(x.slice(1, -1)), fe = (0, r.splitAtTopLevelOnly)(Z, ",");
        if (fe.length > 1)
          return [];
        if (!fe.every(g.isValidVariantFormatString))
          return [];
        let ve = fe.map((de, ne) => [
          V.offsets.applyParallelOffset(j, ne),
          (0, g.parseVariant)(de.trim())
        ]);
        V.variantMap.set(x, ve);
      }
      if (V.variantMap.has(x)) {
        var U;
        let j = G(x);
        var K;
        let Z = (K = (U = V.variantOptions.get(x)) === null || U === void 0 ? void 0 : U[g.INTERNAL_FEATURES]) !== null && K !== void 0 ? K : {}, fe = V.variantMap.get(x).slice(), ve = [], de = !(j || Z.respectPrefix === !1);
        for (let [ne, we] of $) {
          if (ne.layer === "user")
            continue;
          let J = v.default.root({
            nodes: [
              we.clone()
            ]
          });
          for (let [H, re, te] of fe) {
            let ce = function() {
              ee.raws.neededBackup || (ee.raws.neededBackup = !0, ee.walkRules((me) => me.raws.originalSelector = me.selector));
            }, xe = function(me) {
              return ce(), ee.each((Re) => {
                Re.type === "rule" && (Re.selectors = Re.selectors.map((se) => me({
                  get className() {
                    return O(se);
                  },
                  selector: se
                })));
              }), ee;
            }, ee = (te ?? J).clone(), ae = [], pe = re({
              // Public API
              get container() {
                return ce(), ee;
              },
              separator: V.tailwindConfig.separator,
              modifySelectors: xe,
              // Private API for now
              wrap(me) {
                let Re = ee.nodes;
                ee.removeAll(), me.append(Re), ee.append(me);
              },
              format(me) {
                ae.push({
                  format: me,
                  respectPrefix: de
                });
              },
              args: Y
            });
            if (Array.isArray(pe)) {
              for (let [me, Re] of pe.entries())
                fe.push([
                  V.offsets.applyParallelOffset(H, me),
                  Re,
                  // If the clone has been modified we have to pass that back
                  // though so each rule can use the modified container
                  ee.clone()
                ]);
              continue;
            }
            if (typeof pe == "string" && ae.push({
              format: pe,
              respectPrefix: de
            }), pe === null)
              continue;
            ee.raws.neededBackup && (delete ee.raws.neededBackup, ee.walkRules((me) => {
              let Re = me.raws.originalSelector;
              if (!Re || (delete me.raws.originalSelector, Re === me.selector)) return;
              let se = me.selector, ie = (0, p.default)((he) => {
                he.walkClasses((Oe) => {
                  Oe.value = `${x}${V.tailwindConfig.separator}${Oe.value}`;
                });
              }).processSync(Re);
              ae.push({
                format: se.replace(ie, "&"),
                respectPrefix: de
              }), me.selector = Re;
            })), ee.nodes[0].raws.tailwind = {
              ...ee.nodes[0].raws.tailwind,
              parentLayer: ne.layer
            };
            var X;
            let ke = [
              {
                ...ne,
                sort: V.offsets.applyVariantOffset(ne.sort, H, Object.assign(Y, V.variantOptions.get(x))),
                collectedFormats: ((X = ne.collectedFormats) !== null && X !== void 0 ? X : []).concat(ae)
              },
              ee.nodes[0]
            ];
            ve.push(ke);
          }
        }
        return ve;
      }
      return [];
    }
    function N(x, $, V = {}) {
      return !(0, f.default)(x) && !Array.isArray(x) ? [
        [
          x
        ],
        V
      ] : Array.isArray(x) ? N(x[0], $, x[1]) : ($.has(x) || $.set(x, (0, u.default)(x)), [
        $.get(x),
        V
      ]);
    }
    const D = /^[a-z_-]/;
    function B(x) {
      return D.test(x);
    }
    function k(x) {
      if (!x.includes("://"))
        return !1;
      try {
        const $ = new URL(x);
        return $.scheme !== "" && $.host !== "";
      } catch {
        return !1;
      }
    }
    function A(x) {
      let $ = !0;
      return x.walkDecls((V) => {
        if (!R(V.prop, V.value))
          return $ = !1, !1;
      }), $;
    }
    function R(x, $) {
      if (k(`${x}:${$}`))
        return !1;
      try {
        return v.default.parse(`a{${x}:${$}}`).toResult(), !0;
      } catch {
        return !1;
      }
    }
    function I(x, $) {
      var V;
      let [, Y, U] = (V = x.match(/^\[([a-zA-Z0-9-_]+):(\S+)\]$/)) !== null && V !== void 0 ? V : [];
      if (U === void 0 || !B(Y) || !(0, b.default)(U))
        return null;
      let K = (0, s.normalize)(U, {
        property: Y
      });
      return R(Y, K) ? [
        [
          {
            sort: $.offsets.arbitraryProperty(x),
            layer: "utilities",
            options: {
              respectImportant: !0
            }
          },
          () => ({
            [(0, a.asClass)(x)]: {
              [Y]: K
            }
          })
        ]
      ] : null;
    }
    function* W(x, $) {
      $.candidateRuleMap.has(x) && (yield [
        $.candidateRuleMap.get(x),
        "DEFAULT"
      ]), yield* (function* (j) {
        j !== null && (yield [
          j,
          "DEFAULT"
        ]);
      })(I(x, $));
      let V = x, Y = !1;
      const U = $.tailwindConfig.prefix, K = U.length, X = V.startsWith(U) || V.startsWith(`-${U}`);
      V[K] === "-" && X && (Y = !0, V = U + V.slice(K + 1)), Y && $.candidateRuleMap.has(V) && (yield [
        $.candidateRuleMap.get(V),
        "-DEFAULT"
      ]);
      for (let [j, Z] of C(V))
        $.candidateRuleMap.has(j) && (yield [
          $.candidateRuleMap.get(j),
          Y ? `-${Z}` : Z
        ]);
    }
    function Q(x, $) {
      return x === t.NOT_ON_DEMAND ? [
        t.NOT_ON_DEMAND
      ] : (0, r.splitAtTopLevelOnly)(x, $);
    }
    function* z(x, $) {
      for (const U of x) {
        var V, Y;
        U[1].raws.tailwind = {
          ...U[1].raws.tailwind,
          classCandidate: $,
          preserveSource: (Y = (V = U[0].options) === null || V === void 0 ? void 0 : V.preserveSource) !== null && Y !== void 0 ? Y : !1
        }, yield U;
      }
    }
    function* L(x, $) {
      let V = $.tailwindConfig.separator, [Y, ...U] = Q(x, V).reverse(), K = !1;
      Y.startsWith("!") && (K = !0, Y = Y.slice(1));
      for (let de of W(Y, $)) {
        let ne = [], we = /* @__PURE__ */ new Map(), [J, H] = de, re = J.length === 1;
        for (let [te, ee] of J) {
          let ae = [];
          if (typeof ee == "function")
            for (let ce of [].concat(ee(H, {
              isOnlyPlugin: re
            }))) {
              let [xe, pe] = N(ce, $.postCssNodeCache);
              for (let ke of xe)
                ae.push([
                  {
                    ...te,
                    options: {
                      ...te.options,
                      ...pe
                    }
                  },
                  ke
                ]);
            }
          else if (H === "DEFAULT" || H === "-DEFAULT") {
            let ce = ee, [xe, pe] = N(ce, $.postCssNodeCache);
            for (let ke of xe)
              ae.push([
                {
                  ...te,
                  options: {
                    ...te.options,
                    ...pe
                  }
                },
                ke
              ]);
          }
          if (ae.length > 0) {
            var X, j, Z;
            let ce = Array.from((0, d.getMatchingTypes)((j = (X = te.options) === null || X === void 0 ? void 0 : X.types) !== null && j !== void 0 ? j : [], H, (Z = te.options) !== null && Z !== void 0 ? Z : {}, $.tailwindConfig)).map(([xe, pe]) => pe);
            ce.length > 0 && we.set(ae, ce), ne.push(ae);
          }
        }
        if (G(H)) {
          if (ne.length > 1) {
            let ae = function(xe) {
              return xe.length === 1 ? xe[0] : xe.find((pe) => {
                let ke = we.get(pe);
                return pe.some(([{ options: me }, Re]) => A(Re) ? me.types.some(({ type: se, preferOnConflict: ie }) => ke.includes(se) && ie) : !1);
              });
            }, [te, ee] = ne.reduce((xe, pe) => (pe.some(([{ options: me }]) => me.types.some(({ type: Re }) => Re === "any")) ? xe[0].push(pe) : xe[1].push(pe), xe), [
              [],
              []
            ]);
            var fe;
            let ce = (fe = ae(ee)) !== null && fe !== void 0 ? fe : ae(te);
            if (ce)
              ne = [
                ce
              ];
            else {
              var ve;
              let xe = ne.map((ke) => /* @__PURE__ */ new Set([
                ...(ve = we.get(ke)) !== null && ve !== void 0 ? ve : []
              ]));
              for (let ke of xe)
                for (let me of ke) {
                  let Re = !1;
                  for (let se of xe)
                    ke !== se && se.has(me) && (se.delete(me), Re = !0);
                  Re && ke.delete(me);
                }
              let pe = [];
              for (let [ke, me] of xe.entries())
                for (let Re of me) {
                  let se = ne[ke].map(([, ie]) => ie).flat().map((ie) => ie.toString().split(`
`).slice(1, -1).map((he) => he.trim()).map((he) => `      ${he}`).join(`
`)).join(`

`);
                  pe.push(`  Use \`${x.replace("[", `[${Re}:`)}\` for \`${se.trim()}\``);
                  break;
                }
              e.default.warn([
                `The class \`${x}\` is ambiguous and matches multiple utilities.`,
                ...pe,
                `If this is content and not a class, replace it with \`${x.replace("[", "&lsqb;").replace("]", "&rsqb;")}\` to silence this warning.`
              ]);
              continue;
            }
          }
          ne = ne.map((te) => te.filter((ee) => A(ee[1])));
        }
        ne = ne.flat(), ne = Array.from(z(ne, Y)), ne = T(ne, $), K && (ne = w(ne, Y));
        for (let te of U)
          ne = P(te, ne, $);
        for (let te of ne)
          te[1].raws.tailwind = {
            ...te[1].raws.tailwind,
            candidate: x
          }, te = F(te, {
            context: $,
            candidate: x
          }), te !== null && (yield te);
      }
    }
    function F(x, { context: $, candidate: V }) {
      if (!x[0].collectedFormats)
        return x;
      let Y = !0, U;
      try {
        U = (0, n.formatVariantSelector)(x[0].collectedFormats, {
          context: $,
          candidate: V
        });
      } catch {
        return null;
      }
      let K = v.default.root({
        nodes: [
          x[1].clone()
        ]
      });
      return K.walkRules((X) => {
        if (!M(X))
          try {
            let j = (0, n.finalizeSelector)(X.selector, U, {
              candidate: V,
              context: $
            });
            if (j === null) {
              X.remove();
              return;
            }
            X.selector = j;
          } catch {
            return Y = !1, !1;
          }
      }), !Y || K.nodes.length === 0 ? null : (x[1] = K.nodes[0], x);
    }
    function M(x) {
      return x.parent && x.parent.type === "atrule" && x.parent.name === "keyframes";
    }
    function E(x) {
      if (x === !0)
        return ($) => {
          M($) || $.walkDecls((V) => {
            V.parent.type === "rule" && !M(V.parent) && (V.important = !0);
          });
        };
      if (typeof x == "string")
        return ($) => {
          M($) || ($.selectors = $.selectors.map((V) => (0, _.applyImportantSelector)(V, x)));
        };
    }
    function q(x, $, V = !1) {
      let Y = [], U = E($.tailwindConfig.important);
      for (let X of x) {
        if ($.notClassCache.has(X))
          continue;
        if ($.candidateRuleCache.has(X)) {
          Y = Y.concat(Array.from($.candidateRuleCache.get(X)));
          continue;
        }
        let j = Array.from(L(X, $));
        if (j.length === 0) {
          $.notClassCache.add(X);
          continue;
        }
        $.classCache.set(X, j);
        var K;
        let Z = (K = $.candidateRuleCache.get(X)) !== null && K !== void 0 ? K : /* @__PURE__ */ new Set();
        $.candidateRuleCache.set(X, Z);
        for (const fe of j) {
          let [{ sort: ve, options: de }, ne] = fe;
          if (de.respectImportant && U) {
            let J = v.default.root({
              nodes: [
                ne.clone()
              ]
            });
            J.walkRules(U), ne = J.nodes[0];
          }
          let we = [
            ve,
            V ? ne.clone() : ne
          ];
          Z.add(we), $.ruleCache.add(we), Y.push(we);
        }
      }
      return Y;
    }
    function G(x) {
      return x.startsWith("[") && x.endsWith("]");
    }
  })(ci)), ci;
}
var nl;
function wd() {
  return nl || (nl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return O;
      }
    });
    const i = /* @__PURE__ */ d(Je()), v = /* @__PURE__ */ d(lt()), p = Hr(), u = /* @__PURE__ */ d(mt()), f = If(), o = Ia();
    function d(C) {
      return C && C.__esModule ? C : {
        default: C
      };
    }
    function e(C) {
      let T = /* @__PURE__ */ new Map();
      i.default.root({
        nodes: [
          C.clone()
        ]
      }).walkRules((D) => {
        (0, v.default)((B) => {
          B.walkClasses((k) => {
            let A = k.parent.toString(), R = T.get(A);
            R || T.set(A, R = /* @__PURE__ */ new Set()), R.add(k.value);
          });
        }).processSync(D.selector);
      });
      let P = Array.from(T.values(), (D) => Array.from(D)), N = P.flat();
      return Object.assign(N, {
        groups: P
      });
    }
    let t = (0, v.default)();
    function n(C) {
      return t.astSync(C);
    }
    function a(C, T) {
      let w = /* @__PURE__ */ new Set();
      for (let P of C)
        w.add(P.split(T).pop());
      return Array.from(w);
    }
    function s(C, T) {
      let w = C.tailwindConfig.prefix;
      return typeof w == "function" ? w(T) : w + T;
    }
    function* g(C) {
      for (yield C; C.parent; )
        yield C.parent, C = C.parent;
    }
    function b(C, T = {}) {
      let w = C.nodes;
      C.nodes = [];
      let P = C.clone(T);
      return C.nodes = w, P;
    }
    function r(C) {
      for (let T of g(C))
        if (C !== T) {
          if (T.type === "root")
            break;
          C = b(T, {
            nodes: [
              C
            ]
          });
        }
      return C;
    }
    function c(C, T) {
      let w = /* @__PURE__ */ new Map();
      return C.walkRules((P) => {
        for (let k of g(P)) {
          var N;
          if (((N = k.raws.tailwind) === null || N === void 0 ? void 0 : N.layer) !== void 0)
            return;
        }
        let D = r(P), B = T.offsets.create("user");
        for (let k of e(P)) {
          let A = w.get(k) || [];
          w.set(k, A), A.push([
            {
              layer: "user",
              sort: B,
              important: !1
            },
            D
          ]);
        }
      }), w;
    }
    function _(C, T) {
      for (let w of C) {
        if (T.notClassCache.has(w) || T.applyClassCache.has(w))
          continue;
        if (T.classCache.has(w)) {
          T.applyClassCache.set(w, T.classCache.get(w).map(([N, D]) => [
            N,
            D.clone()
          ]));
          continue;
        }
        let P = Array.from((0, p.resolveMatches)(w, T));
        if (P.length === 0) {
          T.notClassCache.add(w);
          continue;
        }
        T.applyClassCache.set(w, P);
      }
      return T.applyClassCache;
    }
    function m(C) {
      let T = null;
      return {
        get: (w) => (T = T || C(), T.get(w)),
        has: (w) => (T = T || C(), T.has(w))
      };
    }
    function y(C) {
      return {
        get: (T) => C.flatMap((w) => w.get(T) || []),
        has: (T) => C.some((w) => w.has(T))
      };
    }
    function S(C) {
      let T = C.split(/[\s\t\n]+/g);
      return T[T.length - 1] === "!important" ? [
        T.slice(0, -1),
        !0
      ] : [
        T,
        !1
      ];
    }
    function h(C, T, w) {
      let P = /* @__PURE__ */ new Set(), N = [];
      if (C.walkAtRules("apply", (A) => {
        let [R] = S(A.params);
        for (let I of R)
          P.add(I);
        N.push(A);
      }), N.length === 0)
        return;
      let D = y([
        w,
        _(P, T)
      ]);
      function B(A, R, I) {
        let W = n(A), Q = n(R), L = n(`.${(0, u.default)(I)}`).nodes[0].nodes[0];
        return W.each((F) => {
          let M = /* @__PURE__ */ new Set();
          Q.each((E) => {
            let q = !1;
            E = E.clone(), E.walkClasses((G) => {
              G.value === L.value && (q || (G.replaceWith(...F.nodes.map((x) => x.clone())), M.add(E), q = !0));
            });
          });
          for (let E of M) {
            let q = [
              []
            ];
            for (let G of E.nodes)
              G.type === "combinator" ? (q.push(G), q.push([])) : q[q.length - 1].push(G);
            E.nodes = [];
            for (let G of q)
              Array.isArray(G) && G.sort((x, $) => x.type === "tag" && $.type === "class" ? -1 : x.type === "class" && $.type === "tag" ? 1 : x.type === "class" && $.type === "pseudo" && $.value.startsWith("::") ? -1 : x.type === "pseudo" && x.value.startsWith("::") && $.type === "class" ? 1 : 0), E.nodes = E.nodes.concat(G);
          }
          F.replaceWith(...M);
        }), W.toString();
      }
      let k = /* @__PURE__ */ new Map();
      for (let A of N) {
        let [R] = k.get(A.parent) || [
          [],
          A.source
        ];
        k.set(A.parent, [
          R,
          A.source
        ]);
        let [I, W] = S(A.params);
        if (A.parent.type === "atrule") {
          if (A.parent.name === "screen") {
            let Q = A.parent.params;
            throw A.error(`@apply is not supported within nested at-rules like @screen. We suggest you write this as @apply ${I.map((z) => `${Q}:${z}`).join(" ")} instead.`);
          }
          throw A.error(`@apply is not supported within nested at-rules like @${A.parent.name}. You can fix this by un-nesting @${A.parent.name}.`);
        }
        for (let Q of I) {
          if ([
            s(T, "group"),
            s(T, "peer")
          ].includes(Q))
            throw A.error(`@apply should not be used with the '${Q}' utility`);
          if (!D.has(Q))
            throw A.error(`The \`${Q}\` class does not exist. If \`${Q}\` is a custom class, make sure it is defined within a \`@layer\` directive.`);
          let z = D.get(Q);
          for (let [, L] of z)
            L.type !== "atrule" && L.walkRules(() => {
              throw A.error([
                `The \`${Q}\` class cannot be used with \`@apply\` because \`@apply\` does not currently support nested CSS.`,
                "Rewrite the selector without nesting or configure the `tailwindcss/nesting` plugin:",
                "https://tailwindcss.com/docs/using-with-preprocessors#nesting"
              ].join(`
`));
            });
          R.push([
            Q,
            W,
            z
          ]);
        }
      }
      for (let [A, [R, I]] of k) {
        let W = [];
        for (let [z, L, F] of R) {
          let M = [
            z,
            ...a([
              z
            ], T.tailwindConfig.separator)
          ];
          for (let [E, q] of F) {
            let G = e(A), x = e(q);
            if (x = x.groups.filter((U) => U.some((K) => M.includes(K))).flat(), x = x.concat(a(x, T.tailwindConfig.separator)), G.some((U) => x.includes(U)))
              throw q.error(`You cannot \`@apply\` the \`${z}\` utility here because it creates a circular dependency.`);
            let V = i.default.root({
              nodes: [
                q.clone()
              ]
            });
            V.walk((U) => {
              U.source = I;
            }), (q.type !== "atrule" || q.type === "atrule" && q.name !== "keyframes") && V.walkRules((U) => {
              if (!e(U).some((fe) => fe === z)) {
                U.remove();
                return;
              }
              let K = typeof T.tailwindConfig.important == "string" ? T.tailwindConfig.important : null, j = A.raws.tailwind !== void 0 && K && A.selector.indexOf(K) === 0 ? A.selector.slice(K.length) : A.selector;
              j === "" && (j = A.selector), U.selector = B(j, U.selector, z), K && j !== A.selector && (U.selector = (0, f.applyImportantSelector)(U.selector, K)), U.walkDecls((fe) => {
                fe.important = E.important || L;
              });
              let Z = (0, v.default)().astSync(U.selector);
              Z.each((fe) => (0, o.movePseudos)(fe)), U.selector = Z.toString();
            }), V.nodes[0] && W.push([
              E.sort,
              V.nodes[0]
            ]);
          }
        }
        let Q = T.offsets.sort(W).map((z) => z[1]);
        A.after(Q);
      }
      for (let A of N)
        A.parent.nodes.length > 1 ? A.remove() : A.parent.remove();
      h(C, T, w);
    }
    function O(C) {
      return (T) => {
        let w = m(() => c(T, C));
        h(T, C, w);
      };
    }
  })(oi)), oi;
}
var bd = wd();
const _d = /* @__PURE__ */ tt(bd);
var zi = {}, Bi, il;
function Sd() {
  if (il) return Bi;
  il = 1;
  class l {
    constructor(v = {}) {
      if (!(v.maxSize && v.maxSize > 0))
        throw new TypeError("`maxSize` must be a number greater than 0");
      if (typeof v.maxAge == "number" && v.maxAge === 0)
        throw new TypeError("`maxAge` must be a number greater than 0");
      this.maxSize = v.maxSize, this.maxAge = v.maxAge || 1 / 0, this.onEviction = v.onEviction, this.cache = /* @__PURE__ */ new Map(), this.oldCache = /* @__PURE__ */ new Map(), this._size = 0;
    }
    _emitEvictions(v) {
      if (typeof this.onEviction == "function")
        for (const [p, u] of v)
          this.onEviction(p, u.value);
    }
    _deleteIfExpired(v, p) {
      return typeof p.expiry == "number" && p.expiry <= Date.now() ? (typeof this.onEviction == "function" && this.onEviction(v, p.value), this.delete(v)) : !1;
    }
    _getOrDeleteIfExpired(v, p) {
      if (this._deleteIfExpired(v, p) === !1)
        return p.value;
    }
    _getItemValue(v, p) {
      return p.expiry ? this._getOrDeleteIfExpired(v, p) : p.value;
    }
    _peek(v, p) {
      const u = p.get(v);
      return this._getItemValue(v, u);
    }
    _set(v, p) {
      this.cache.set(v, p), this._size++, this._size >= this.maxSize && (this._size = 0, this._emitEvictions(this.oldCache), this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map());
    }
    _moveToRecent(v, p) {
      this.oldCache.delete(v), this._set(v, p);
    }
    *_entriesAscending() {
      for (const v of this.oldCache) {
        const [p, u] = v;
        this.cache.has(p) || this._deleteIfExpired(p, u) === !1 && (yield v);
      }
      for (const v of this.cache) {
        const [p, u] = v;
        this._deleteIfExpired(p, u) === !1 && (yield v);
      }
    }
    get(v) {
      if (this.cache.has(v)) {
        const p = this.cache.get(v);
        return this._getItemValue(v, p);
      }
      if (this.oldCache.has(v)) {
        const p = this.oldCache.get(v);
        if (this._deleteIfExpired(v, p) === !1)
          return this._moveToRecent(v, p), p.value;
      }
    }
    set(v, p, { maxAge: u = this.maxAge === 1 / 0 ? void 0 : Date.now() + this.maxAge } = {}) {
      this.cache.has(v) ? this.cache.set(v, {
        value: p,
        maxAge: u
      }) : this._set(v, { value: p, expiry: u });
    }
    has(v) {
      return this.cache.has(v) ? !this._deleteIfExpired(v, this.cache.get(v)) : this.oldCache.has(v) ? !this._deleteIfExpired(v, this.oldCache.get(v)) : !1;
    }
    peek(v) {
      if (this.cache.has(v))
        return this._peek(v, this.cache);
      if (this.oldCache.has(v))
        return this._peek(v, this.oldCache);
    }
    delete(v) {
      const p = this.cache.delete(v);
      return p && this._size--, this.oldCache.delete(v) || p;
    }
    clear() {
      this.cache.clear(), this.oldCache.clear(), this._size = 0;
    }
    resize(v) {
      if (!(v && v > 0))
        throw new TypeError("`maxSize` must be a number greater than 0");
      const p = [...this._entriesAscending()], u = p.length - v;
      u < 0 ? (this.cache = new Map(p), this.oldCache = /* @__PURE__ */ new Map(), this._size = p.length) : (u > 0 && this._emitEvictions(p.slice(0, u)), this.oldCache = new Map(p.slice(u)), this.cache = /* @__PURE__ */ new Map(), this._size = 0), this.maxSize = v;
    }
    *keys() {
      for (const [v] of this)
        yield v;
    }
    *values() {
      for (const [, v] of this)
        yield v;
    }
    *[Symbol.iterator]() {
      for (const v of this.cache) {
        const [p, u] = v;
        this._deleteIfExpired(p, u) === !1 && (yield [p, u.value]);
      }
      for (const v of this.oldCache) {
        const [p, u] = v;
        this.cache.has(p) || this._deleteIfExpired(p, u) === !1 && (yield [p, u.value]);
      }
    }
    *entriesDescending() {
      let v = [...this.cache];
      for (let p = v.length - 1; p >= 0; --p) {
        const u = v[p], [f, o] = u;
        this._deleteIfExpired(f, o) === !1 && (yield [f, o.value]);
      }
      v = [...this.oldCache];
      for (let p = v.length - 1; p >= 0; --p) {
        const u = v[p], [f, o] = u;
        this.cache.has(f) || this._deleteIfExpired(f, o) === !1 && (yield [f, o.value]);
      }
    }
    *entriesAscending() {
      for (const [v, p] of this._entriesAscending())
        yield [v, p.value];
    }
    get size() {
      if (!this._size)
        return this.oldCache.size;
      let v = 0;
      for (const p of this.oldCache.keys())
        this.cache.has(p) || v++;
      return Math.min(this._size + v, this.maxSize);
    }
  }
  return Bi = l, Bi;
}
var Vi = {}, al;
function Od() {
  return al || (al = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(p, u = void 0, f = void 0) {
      return p.map((o) => {
        let d = o.clone();
        return f !== void 0 && (d.raws.tailwind = {
          ...d.raws.tailwind,
          ...f
        }), u !== void 0 && v(d, (e) => {
          var t;
          if (((t = e.raws.tailwind) === null || t === void 0 ? void 0 : t.preserveSource) === !0 && e.source)
            return !1;
          e.source = u;
        }), d;
      });
    }
    function v(p, u) {
      if (u(p) !== !1) {
        var f;
        (f = p.each) === null || f === void 0 || f.call(p, (o) => v(o, u));
      }
    }
  })(Vi)), Vi;
}
var ji = {}, Gi = {}, sl;
function xd() {
  return sl || (sl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(s, g) {
      for (var b in g) Object.defineProperty(s, b, {
        enumerable: !0,
        get: g[b]
      });
    }
    i(l, {
      pattern: function() {
        return f;
      },
      withoutCapturing: function() {
        return o;
      },
      any: function() {
        return d;
      },
      optional: function() {
        return e;
      },
      zeroOrMore: function() {
        return t;
      },
      nestedBrackets: function() {
        return n;
      },
      escape: function() {
        return a;
      }
    });
    const v = /[\\^$.*+?()[\]{}|]/g, p = RegExp(v.source);
    function u(s) {
      return s = Array.isArray(s) ? s : [
        s
      ], s = s.map((g) => g instanceof RegExp ? g.source : g), s.join("");
    }
    function f(s) {
      return new RegExp(u(s), "g");
    }
    function o(s) {
      return new RegExp(`(?:${u(s)})`, "g");
    }
    function d(s) {
      return `(?:${s.map(u).join("|")})`;
    }
    function e(s) {
      return `(?:${u(s)})?`;
    }
    function t(s) {
      return `(?:${u(s)})*`;
    }
    function n(s, g, b = 1) {
      return o([
        a(s),
        /[^\s]*/,
        b === 1 ? `[^${a(s)}${a(g)}s]*` : d([
          `[^${a(s)}${a(g)}s]*`,
          n(s, g, b - 1)
        ]),
        /[^\s]*/,
        a(g)
      ]);
    }
    function a(s) {
      return s && p.test(s) ? s.replace(v, "\\$&") : s || "";
    }
  })(Gi)), Gi;
}
var ol;
function Pd() {
  return ol || (ol = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "defaultExtractor", {
      enumerable: !0,
      get: function() {
        return f;
      }
    });
    const i = /* @__PURE__ */ u(xd()), v = pt();
    function p(n) {
      if (typeof WeakMap != "function") return null;
      var a = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap();
      return (p = function(g) {
        return g ? s : a;
      })(n);
    }
    function u(n, a) {
      if (n && n.__esModule)
        return n;
      if (n === null || typeof n != "object" && typeof n != "function")
        return {
          default: n
        };
      var s = p(a);
      if (s && s.has(n))
        return s.get(n);
      var g = {}, b = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var r in n)
        if (r !== "default" && Object.prototype.hasOwnProperty.call(n, r)) {
          var c = b ? Object.getOwnPropertyDescriptor(n, r) : null;
          c && (c.get || c.set) ? Object.defineProperty(g, r, c) : g[r] = n[r];
        }
      return g.default = n, s && s.set(n, g), g;
    }
    function f(n) {
      let a = Array.from(o(n));
      return (s) => {
        let g = [];
        for (let r of a) {
          var b;
          for (let c of (b = s.match(r)) !== null && b !== void 0 ? b : [])
            g.push(t(c));
        }
        for (let r of g.slice()) {
          let c = (0, v.splitAtTopLevelOnly)(r, ".");
          for (let _ = 0; _ < c.length; _++) {
            let m = c[_];
            if (_ >= c.length - 1) {
              g.push(m);
              continue;
            }
            let y = Number(c[_ + 1]);
            isNaN(y) ? g.push(m) : _++;
          }
        }
        return g;
      };
    }
    function* o(n) {
      let a = n.tailwindConfig.separator, s = n.tailwindConfig.prefix !== "" ? i.optional(i.pattern([
        /-?/,
        i.escape(n.tailwindConfig.prefix)
      ])) : "", g = i.any([
        // Arbitrary properties (without square brackets)
        /\[[^\s:'"`]+:[^\s\[\]]+\]/,
        // Arbitrary properties with balanced square brackets
        // This is a targeted fix to continue to allow theme()
        // with square brackets to work in arbitrary properties
        // while fixing a problem with the regex matching too much
        /\[[^\s:'"`\]]+:[^\s]+?\[[^\s]+\][^\s]+?\]/,
        // Utilities
        i.pattern([
          // Utility Name / Group Name
          i.any([
            /-?(?:\w+)/,
            // This is here to make sure @container supports everything that other utilities do
            /@(?:\w+)/
          ]),
          // Normal/Arbitrary values
          i.optional(i.any([
            i.pattern([
              // Arbitrary values
              i.any([
                /-(?:\w+-)*\['[^\s]+'\]/,
                /-(?:\w+-)*\["[^\s]+"\]/,
                /-(?:\w+-)*\[`[^\s]+`\]/,
                /-(?:\w+-)*\[(?:[^\s\[\]]+\[[^\s\[\]]+\])*[^\s:\[\]]+\]/
              ]),
              // Not immediately followed by an `{[(`
              /(?![{([]])/,
              // optionally followed by an opacity modifier
              /(?:\/[^\s'"`\\><$]*)?/
            ]),
            i.pattern([
              // Arbitrary values
              i.any([
                /-(?:\w+-)*\['[^\s]+'\]/,
                /-(?:\w+-)*\["[^\s]+"\]/,
                /-(?:\w+-)*\[`[^\s]+`\]/,
                /-(?:\w+-)*\[(?:[^\s\[\]]+\[[^\s\[\]]+\])*[^\s\[\]]+\]/
              ]),
              // Not immediately followed by an `{[(`
              /(?![{([]])/,
              // optionally followed by an opacity modifier
              /(?:\/[^\s'"`\\$]*)?/
            ]),
            // Normal values w/o quotes — may include an opacity modifier
            /[-\/][^\s'"`\\$={><]*/
          ]))
        ])
      ]), b = [
        // Without quotes
        i.any([
          // This is here to provide special support for the `@` variant
          i.pattern([
            /@\[[^\s"'`]+\](\/[^\s"'`]+)?/,
            a
          ]),
          // With variant modifier (e.g.: group-[..]/modifier)
          i.pattern([
            /([^\s"'`\[\\]+-)?\[[^\s"'`]+\]\/[\w_-]+/,
            a
          ]),
          i.pattern([
            /([^\s"'`\[\\]+-)?\[[^\s"'`]+\]/,
            a
          ]),
          i.pattern([
            /[^\s"'`\[\\]+/,
            a
          ])
        ]),
        // With quotes allowed
        i.any([
          // With variant modifier (e.g.: group-[..]/modifier)
          i.pattern([
            /([^\s"'`\[\\]+-)?\[[^\s`]+\]\/[\w_-]+/,
            a
          ]),
          i.pattern([
            /([^\s"'`\[\\]+-)?\[[^\s`]+\]/,
            a
          ]),
          i.pattern([
            /[^\s`\[\\]+/,
            a
          ])
        ])
      ];
      for (const r of b)
        yield i.pattern([
          // Variants
          "((?=((",
          r,
          ")+))\\2)?",
          // Important (optional)
          /!?/,
          s,
          g
        ]);
      yield /[^<>"'`\s.(){}[\]#=%$][^<>"'`\s(){}[\]#=%$]*[^<>"'`\s.(){}[\]#=%:$]/g;
    }
    let d = /([\[\]'"`])([^\[\]'"`])?/g, e = /[^"'`\s<>\]]+/;
    function t(n) {
      if (!n.includes("-["))
        return n;
      let a = 0, s = [], g = n.matchAll(d);
      g = Array.from(g).flatMap((b) => {
        const [, ...r] = b;
        return r.map((c, _) => Object.assign([], b, {
          index: b.index + _,
          0: c
        }));
      });
      for (let b of g) {
        let r = b[0], c = s[s.length - 1];
        if (r === c ? s.pop() : (r === "'" || r === '"' || r === "`") && s.push(r), !c) {
          if (r === "[") {
            a++;
            continue;
          } else if (r === "]") {
            a--;
            continue;
          }
          if (a < 0)
            return n.substring(0, b.index - 1);
          if (a === 0 && !e.test(r))
            return n.substring(0, b.index);
        }
      }
      return n;
    }
  })(ji)), ji;
}
var ul;
function Td() {
  return ul || (ul = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return y;
      }
    });
    const i = /* @__PURE__ */ e(We), v = /* @__PURE__ */ e(Sd()), p = /* @__PURE__ */ n(Qr()), u = Hr(), f = /* @__PURE__ */ e(ot()), o = /* @__PURE__ */ e(Od()), d = Pd();
    function e(S) {
      return S && S.__esModule ? S : {
        default: S
      };
    }
    function t(S) {
      if (typeof WeakMap != "function") return null;
      var h = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap();
      return (t = function(C) {
        return C ? O : h;
      })(S);
    }
    function n(S, h) {
      if (S && S.__esModule)
        return S;
      if (S === null || typeof S != "object" && typeof S != "function")
        return {
          default: S
        };
      var O = t(h);
      if (O && O.has(S))
        return O.get(S);
      var C = {}, T = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var w in S)
        if (w !== "default" && Object.prototype.hasOwnProperty.call(S, w)) {
          var P = T ? Object.getOwnPropertyDescriptor(S, w) : null;
          P && (P.get || P.set) ? Object.defineProperty(C, w, P) : C[w] = S[w];
        }
      return C.default = S, O && O.set(S, C), C;
    }
    let a = p.env;
    const s = {
      DEFAULT: d.defaultExtractor
    }, g = {
      DEFAULT: (S) => S,
      svelte: (S) => S.replace(/(?:^|\s)class:/g, " ")
    };
    function b(S, h) {
      let O = S.tailwindConfig.content.extract;
      return O[h] || O.DEFAULT || s[h] || s.DEFAULT(S);
    }
    function r(S, h) {
      let O = S.content.transform;
      return O[h] || O.DEFAULT || g[h] || g.DEFAULT;
    }
    let c = /* @__PURE__ */ new WeakMap();
    function _(S, h, O, C) {
      c.has(h) || c.set(h, new v.default({
        maxSize: 25e3
      }));
      for (let T of S.split(`
`))
        if (T = T.trim(), !C.has(T))
          if (C.add(T), c.get(h).has(T))
            for (let w of c.get(h).get(T))
              O.add(w);
          else {
            let w = h(T).filter((N) => N !== "!*"), P = new Set(w);
            for (let N of P)
              O.add(N);
            c.get(h).set(T, P);
          }
    }
    function m(S, h) {
      let O = h.offsets.sort(S), C = {
        base: /* @__PURE__ */ new Set(),
        defaults: /* @__PURE__ */ new Set(),
        components: /* @__PURE__ */ new Set(),
        utilities: /* @__PURE__ */ new Set(),
        variants: /* @__PURE__ */ new Set()
      };
      for (let [T, w] of O)
        C[T.layer].add(w);
      return C;
    }
    function y(S) {
      return async (h) => {
        let O = {
          base: null,
          components: null,
          utilities: null,
          variants: null
        };
        if (h.walkAtRules((F) => {
          F.name === "tailwind" && Object.keys(O).includes(F.params) && (O[F.params] = F);
        }), Object.values(O).every((F) => F === null))
          return h;
        var C;
        let T = /* @__PURE__ */ new Set([
          ...(C = S.candidates) !== null && C !== void 0 ? C : [],
          p.NOT_ON_DEMAND
        ]), w = /* @__PURE__ */ new Set();
        a.DEBUG && console.time("Reading changed files");
        let P = [];
        for (let F of S.changedContent) {
          let M = r(S.tailwindConfig, F.extension), E = b(S, F.extension);
          P.push([
            F,
            {
              transformer: M,
              extractor: E
            }
          ]);
        }
        const N = 500;
        for (let F = 0; F < P.length; F += N) {
          let M = P.slice(F, F + N);
          await Promise.all(M.map(async ([{ file: E, content: q }, { transformer: G, extractor: x }]) => {
            q = E ? await i.default.promises.readFile(E, "utf8") : q, _(G(q), x, T, w);
          }));
        }
        a.DEBUG && console.timeEnd("Reading changed files");
        let D = S.classCache.size;
        a.DEBUG && console.time("Generate rules"), a.DEBUG && console.time("Sorting candidates");
        let B = new Set([
          ...T
        ].sort((F, M) => F === M ? 0 : F < M ? -1 : 1));
        a.DEBUG && console.timeEnd("Sorting candidates"), (0, u.generateRules)(B, S), a.DEBUG && console.timeEnd("Generate rules"), a.DEBUG && console.time("Build stylesheet"), (S.stylesheetCache === null || S.classCache.size !== D) && (S.stylesheetCache = m([
          ...S.ruleCache
        ], S)), a.DEBUG && console.timeEnd("Build stylesheet");
        let { defaults: k, base: A, components: R, utilities: I, variants: W } = S.stylesheetCache;
        O.base && (O.base.before((0, o.default)([
          ...A,
          ...k
        ], O.base.source, {
          layer: "base"
        })), O.base.remove()), O.components && (O.components.before((0, o.default)([
          ...R
        ], O.components.source, {
          layer: "components"
        })), O.components.remove()), O.utilities && (O.utilities.before((0, o.default)([
          ...I
        ], O.utilities.source, {
          layer: "utilities"
        })), O.utilities.remove());
        const Q = Array.from(W).filter((F) => {
          var M;
          const E = (M = F.raws.tailwind) === null || M === void 0 ? void 0 : M.parentLayer;
          return E === "components" ? O.components !== null : E === "utilities" ? O.utilities !== null : !0;
        });
        O.variants ? (O.variants.before((0, o.default)(Q, O.variants.source, {
          layer: "variants"
        })), O.variants.remove()) : Q.length > 0 && h.append((0, o.default)(Q, h.source, {
          layer: "variants"
        }));
        var z;
        h.source.end = (z = h.source.end) !== null && z !== void 0 ? z : h.source.start;
        const L = Q.some((F) => {
          var M;
          return ((M = F.raws.tailwind) === null || M === void 0 ? void 0 : M.parentLayer) === "utilities";
        });
        O.utilities && I.size === 0 && !L && f.default.warn("content-problems", [
          "No utility classes were detected in your source files. If this is unexpected, double-check the `content` option in your Tailwind CSS configuration.",
          "https://tailwindcss.com/docs/content-configuration"
        ]), a.DEBUG && (console.log("Potential classes: ", T.size), console.log("Active contexts: ", p.contextSourcesMap.size)), S.changedContent = [], h.walkAtRules("layer", (F) => {
          Object.keys(O).includes(F.params) && F.remove();
        });
      };
    }
  })(zi)), zi;
}
var kd = Td();
const Ed = /* @__PURE__ */ tt(kd);
var Ad = Hr(), Yi = {}, ll;
function Cd() {
  return ll || (ll = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return v;
      }
    });
    function i(p) {
      if (!p.walkAtRules) return;
      let u = /* @__PURE__ */ new Set();
      if (p.walkAtRules("apply", (f) => {
        u.add(f.parent);
      }), u.size !== 0)
        for (let f of u) {
          let o = [], d = [];
          for (let e of f.nodes)
            e.type === "atrule" && e.name === "apply" ? (d.length > 0 && (o.push(d), d = []), o.push([
              e
            ])) : d.push(e);
          if (d.length > 0 && o.push(d), o.length !== 1) {
            for (let e of [
              ...o
            ].reverse()) {
              let t = f.clone({
                nodes: []
              });
              t.append(e), f.after(t);
            }
            f.remove();
          }
        }
    }
    function v() {
      return (p) => {
        i(p);
      };
    }
  })(Yi)), Yi;
}
var Rd = Cd();
const fl = /* @__PURE__ */ tt(Rd);
var Qi = {}, cl;
function Id() {
  return cl || (cl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    });
    function i(s, g) {
      for (var b in g) Object.defineProperty(s, b, {
        enumerable: !0,
        get: g[b]
      });
    }
    i(l, {
      elementSelectorParser: function() {
        return e;
      },
      default: function() {
        return a;
      }
    });
    const v = /* @__PURE__ */ f(Je()), p = /* @__PURE__ */ f(lt()), u = dt();
    function f(s) {
      return s && s.__esModule ? s : {
        default: s
      };
    }
    let o = {
      id(s) {
        return p.default.attribute({
          attribute: "id",
          operator: "=",
          value: s.value,
          quoteMark: '"'
        });
      }
    };
    function d(s) {
      let g = s.filter((y) => y.type !== "pseudo" || y.nodes.length > 0 ? !0 : y.value.startsWith("::") || [
        ":before",
        ":after",
        ":first-line",
        ":first-letter"
      ].includes(y.value)).reverse(), b = /* @__PURE__ */ new Set([
        "tag",
        "class",
        "id",
        "attribute"
      ]), r = g.findIndex((y) => b.has(y.type));
      if (r === -1) return g.reverse().join("").trim();
      let c = g[r], _ = o[c.type] ? o[c.type](c) : c;
      g = g.slice(0, r);
      let m = g.findIndex((y) => y.type === "combinator" && y.value === ">");
      return m !== -1 && (g.splice(0, m), g.unshift(p.default.universal())), [
        _,
        ...g.reverse()
      ].join("").trim();
    }
    let e = (0, p.default)((s) => s.map((g) => {
      let b = g.split((r) => r.type === "combinator" && r.value === " ").pop();
      return d(b);
    })), t = /* @__PURE__ */ new Map();
    function n(s) {
      return t.has(s) || t.set(s, e.transformSync(s)), t.get(s);
    }
    function a({ tailwindConfig: s }) {
      return (g) => {
        let b = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set();
        if (g.walkAtRules("defaults", (m) => {
          if (m.nodes && m.nodes.length > 0) {
            r.add(m);
            return;
          }
          let y = m.params;
          b.has(y) || b.set(y, /* @__PURE__ */ new Set()), b.get(y).add(m.parent), m.remove();
        }), (0, u.flagEnabled)(s, "optimizeUniversalDefaults"))
          for (let m of r) {
            let y = /* @__PURE__ */ new Map();
            var c;
            let S = (c = b.get(m.params)) !== null && c !== void 0 ? c : [];
            for (let h of S)
              for (let O of n(h.selector)) {
                let C = O.includes(":-") || O.includes("::-") || O.includes(":has") ? O : "__DEFAULT__";
                var _;
                let T = (_ = y.get(C)) !== null && _ !== void 0 ? _ : /* @__PURE__ */ new Set();
                y.set(C, T), T.add(O);
              }
            if ((0, u.flagEnabled)(s, "optimizeUniversalDefaults")) {
              if (y.size === 0) {
                m.remove();
                continue;
              }
              for (let [, h] of y) {
                let O = v.default.rule({
                  source: m.source
                });
                O.selectors = [
                  ...h
                ], O.append(m.nodes.map((C) => C.clone())), m.before(O);
              }
            }
            m.remove();
          }
        else if (r.size) {
          let m = v.default.rule({
            selectors: [
              "*",
              "::before",
              "::after"
            ]
          });
          for (let S of r)
            m.append(S.nodes), m.parent || S.before(m), m.source || (m.source = S.source), S.remove();
          let y = m.clone({
            selectors: [
              "::backdrop"
            ]
          });
          m.after(y);
        }
      };
    }
  })(Qi)), Qi;
}
var Md = Id();
const Dd = /* @__PURE__ */ tt(Md);
var Hi = {}, dl;
function qd() {
  return dl || (dl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const i = ba(), v = /* @__PURE__ */ p(_a());
    function p(f) {
      return f && f.__esModule ? f : {
        default: f
      };
    }
    function u({ tailwindConfig: { theme: f } }) {
      return function(o) {
        o.walkAtRules("screen", (d) => {
          let e = d.params, n = (0, i.normalizeScreens)(f.screens).find(({ name: a }) => a === e);
          if (!n)
            throw d.error(`No \`${e}\` screen found.`);
          d.name = "media", d.params = (0, v.default)(n);
        });
      };
    }
  })(Hi)), Hi;
}
var Ld = qd();
const Nd = /* @__PURE__ */ tt(Ld), Fd = (l, i) => l instanceof ps && i instanceof ps ? l.selector === i.selector || i.selector.includes("*") || i.selector.includes(":root") : l === i, $d = (l) => (l.walkRules((i) => {
  const v = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set();
  i.walkDecls((u) => {
    if (/var\(--[^\s)]+\)/.test(u.value)) {
      const f = [
        ...u.value.matchAll(/var\(--[^\s)]+\)/gm)
      ].map((o) => o.toString());
      l.walkDecls((o) => {
        var d;
        if (/--[^\s]+/.test(o.prop)) {
          const e = `var(${o.prop})`;
          if (f != null && f.includes(e) && Fd(u.parent, o.parent)) {
            if (((d = o.parent) == null ? void 0 : d.parent) instanceof Rl && o.parent !== u.parent) {
              const t = o.parent.parent, n = Hf();
              n.prop = u.prop, n.value = u.value.replaceAll(
                e,
                o.value
              ), n.important = u.important;
              const a = v.get(t);
              a ? a.add(n) : v.set(
                o.parent.parent,
                /* @__PURE__ */ new Set([n])
              );
              return;
            }
            p.add({
              declaration: u,
              replacing: e,
              replacement: o.value
            });
          }
        }
      });
    }
  });
  for (const {
    declaration: u,
    replacing: f,
    replacement: o
  } of p)
    u.value = u.value.replaceAll(f, o);
  for (const [u, f] of v.entries()) {
    const o = Qf();
    o.selector = i.selector, o.append(...f), u.append(o);
  }
}), l.walkDecls((i) => {
  if (/--[^\s]+/.test(i.prop)) {
    const v = i.parent;
    i.remove(), v && va(v);
  }
}), l);
var Ud = Ma(), Ji = {}, Ki = {}, Xi = {}, pl;
function Wd() {
  return pl || (pl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const i = [
      "preflight",
      "container",
      "accessibility",
      "pointerEvents",
      "visibility",
      "position",
      "inset",
      "isolation",
      "zIndex",
      "order",
      "gridColumn",
      "gridColumnStart",
      "gridColumnEnd",
      "gridRow",
      "gridRowStart",
      "gridRowEnd",
      "float",
      "clear",
      "margin",
      "boxSizing",
      "lineClamp",
      "display",
      "aspectRatio",
      "size",
      "height",
      "maxHeight",
      "minHeight",
      "width",
      "minWidth",
      "maxWidth",
      "flex",
      "flexShrink",
      "flexGrow",
      "flexBasis",
      "tableLayout",
      "captionSide",
      "borderCollapse",
      "borderSpacing",
      "transformOrigin",
      "translate",
      "rotate",
      "skew",
      "scale",
      "transform",
      "animation",
      "cursor",
      "touchAction",
      "userSelect",
      "resize",
      "scrollSnapType",
      "scrollSnapAlign",
      "scrollSnapStop",
      "scrollMargin",
      "scrollPadding",
      "listStylePosition",
      "listStyleType",
      "listStyleImage",
      "appearance",
      "columns",
      "breakBefore",
      "breakInside",
      "breakAfter",
      "gridAutoColumns",
      "gridAutoFlow",
      "gridAutoRows",
      "gridTemplateColumns",
      "gridTemplateRows",
      "flexDirection",
      "flexWrap",
      "placeContent",
      "placeItems",
      "alignContent",
      "alignItems",
      "justifyContent",
      "justifyItems",
      "gap",
      "space",
      "divideWidth",
      "divideStyle",
      "divideColor",
      "divideOpacity",
      "placeSelf",
      "alignSelf",
      "justifySelf",
      "overflow",
      "overscrollBehavior",
      "scrollBehavior",
      "textOverflow",
      "hyphens",
      "whitespace",
      "textWrap",
      "wordBreak",
      "borderRadius",
      "borderWidth",
      "borderStyle",
      "borderColor",
      "borderOpacity",
      "backgroundColor",
      "backgroundOpacity",
      "backgroundImage",
      "gradientColorStops",
      "boxDecorationBreak",
      "backgroundSize",
      "backgroundAttachment",
      "backgroundClip",
      "backgroundPosition",
      "backgroundRepeat",
      "backgroundOrigin",
      "fill",
      "stroke",
      "strokeWidth",
      "objectFit",
      "objectPosition",
      "padding",
      "textAlign",
      "textIndent",
      "verticalAlign",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "textTransform",
      "fontStyle",
      "fontVariantNumeric",
      "lineHeight",
      "letterSpacing",
      "textColor",
      "textOpacity",
      "textDecoration",
      "textDecorationColor",
      "textDecorationStyle",
      "textDecorationThickness",
      "textUnderlineOffset",
      "fontSmoothing",
      "placeholderColor",
      "placeholderOpacity",
      "caretColor",
      "accentColor",
      "opacity",
      "backgroundBlendMode",
      "mixBlendMode",
      "boxShadow",
      "boxShadowColor",
      "outlineStyle",
      "outlineWidth",
      "outlineOffset",
      "outlineColor",
      "ringWidth",
      "ringColor",
      "ringOpacity",
      "ringOffsetWidth",
      "ringOffsetColor",
      "blur",
      "brightness",
      "contrast",
      "dropShadow",
      "grayscale",
      "hueRotate",
      "invert",
      "saturate",
      "sepia",
      "filter",
      "backdropBlur",
      "backdropBrightness",
      "backdropContrast",
      "backdropGrayscale",
      "backdropHueRotate",
      "backdropInvert",
      "backdropOpacity",
      "backdropSaturate",
      "backdropSepia",
      "backdropFilter",
      "transitionProperty",
      "transitionDelay",
      "transitionDuration",
      "transitionTimingFunction",
      "willChange",
      "contain",
      "content",
      "forcedColorAdjust"
    ];
  })(Xi)), Xi;
}
var Zi = {}, hl;
function zd() {
  return hl || (hl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v, p) {
      return v === void 0 ? p : Array.isArray(v) ? v : [
        ...new Set(p.filter((f) => v !== !1 && v[f] !== !1).concat(Object.keys(v).filter((f) => v[f] !== !1)))
      ];
    }
  })(Zi)), Zi;
}
var ea = {}, vl;
function Bd() {
  return vl || (vl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const i = /* @__PURE__ */ v(ot());
    function v(f) {
      return f && f.__esModule ? f : {
        default: f
      };
    }
    function p({ version: f, from: o, to: d }) {
      i.default.warn(`${o}-color-renamed`, [
        `As of Tailwind CSS ${f}, \`${o}\` has been renamed to \`${d}\`.`,
        "Update your configuration file to silence this warning."
      ]);
    }
    const u = {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617"
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712"
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b"
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a"
      },
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09"
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a"
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
        950: "#431407"
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03"
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
        950: "#422006"
      },
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
        950: "#1a2e05"
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
        950: "#052e16"
      },
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22"
      },
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
        950: "#042f2e"
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344"
      },
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49"
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554"
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
        950: "#1e1b4b"
      },
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
        950: "#2e1065"
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764"
      },
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
        950: "#4a044e"
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
        950: "#500724"
      },
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
        950: "#4c0519"
      },
      get lightBlue() {
        return p({
          version: "v2.2",
          from: "lightBlue",
          to: "sky"
        }), this.sky;
      },
      get warmGray() {
        return p({
          version: "v3.0",
          from: "warmGray",
          to: "stone"
        }), this.stone;
      },
      get trueGray() {
        return p({
          version: "v3.0",
          from: "trueGray",
          to: "neutral"
        }), this.neutral;
      },
      get coolGray() {
        return p({
          version: "v3.0",
          from: "coolGray",
          to: "gray"
        }), this.gray;
      },
      get blueGray() {
        return p({
          version: "v3.0",
          from: "blueGray",
          to: "slate"
        }), this.slate;
      }
    };
  })(ea)), ea;
}
var ta = {}, gl;
function Vd() {
  return gl || (gl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "defaults", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v, ...p) {
      for (let o of p) {
        for (let d in o) {
          var u;
          !(v == null || (u = v.hasOwnProperty) === null || u === void 0) && u.call(v, d) || (v[d] = o[d]);
        }
        for (let d of Object.getOwnPropertySymbols(o)) {
          var f;
          !(v == null || (f = v.hasOwnProperty) === null || f === void 0) && f.call(v, d) || (v[d] = o[d]);
        }
      }
      return v;
    }
  })(ta)), ta;
}
var ra = {}, ml;
function jd() {
  return ml || (ml = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "normalizeConfig", {
      enumerable: !0,
      get: function() {
        return f;
      }
    });
    const i = dt(), v = /* @__PURE__ */ u(ot());
    function p(o) {
      if (typeof WeakMap != "function") return null;
      var d = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap();
      return (p = function(t) {
        return t ? e : d;
      })(o);
    }
    function u(o, d) {
      if (o && o.__esModule)
        return o;
      if (o === null || typeof o != "object" && typeof o != "function")
        return {
          default: o
        };
      var e = p(d);
      if (e && e.has(o))
        return e.get(o);
      var t = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var a in o)
        if (a !== "default" && Object.prototype.hasOwnProperty.call(o, a)) {
          var s = n ? Object.getOwnPropertyDescriptor(o, a) : null;
          s && (s.get || s.set) ? Object.defineProperty(t, a, s) : t[a] = o[a];
        }
      return t.default = o, e && e.set(o, t), t;
    }
    function f(o) {
      if ((() => {
        if (o.purge || !o.content || !Array.isArray(o.content) && !(typeof o.content == "object" && o.content !== null))
          return !1;
        if (Array.isArray(o.content))
          return o.content.every((t) => typeof t == "string" ? !0 : !(typeof (t == null ? void 0 : t.raw) != "string" || t != null && t.extension && typeof (t == null ? void 0 : t.extension) != "string"));
        if (typeof o.content == "object" && o.content !== null) {
          if (Object.keys(o.content).some((t) => ![
            "files",
            "relative",
            "extract",
            "transform"
          ].includes(t)))
            return !1;
          if (Array.isArray(o.content.files)) {
            if (!o.content.files.every((t) => typeof t == "string" ? !0 : !(typeof (t == null ? void 0 : t.raw) != "string" || t != null && t.extension && typeof (t == null ? void 0 : t.extension) != "string")))
              return !1;
            if (typeof o.content.extract == "object") {
              for (let t of Object.values(o.content.extract))
                if (typeof t != "function")
                  return !1;
            } else if (!(o.content.extract === void 0 || typeof o.content.extract == "function"))
              return !1;
            if (typeof o.content.transform == "object") {
              for (let t of Object.values(o.content.transform))
                if (typeof t != "function")
                  return !1;
            } else if (!(o.content.transform === void 0 || typeof o.content.transform == "function"))
              return !1;
            if (typeof o.content.relative != "boolean" && typeof o.content.relative < "u")
              return !1;
          }
          return !0;
        }
        return !1;
      })() || v.default.warn("purge-deprecation", [
        "The `purge`/`content` options have changed in Tailwind CSS v3.0.",
        "Update your configuration file to eliminate this warning.",
        "https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"
      ]), o.safelist = (() => {
        var t;
        let { content: n, purge: a, safelist: s } = o;
        return Array.isArray(s) ? s : Array.isArray(n == null ? void 0 : n.safelist) ? n.safelist : Array.isArray(a == null ? void 0 : a.safelist) ? a.safelist : Array.isArray(a == null || (t = a.options) === null || t === void 0 ? void 0 : t.safelist) ? a.options.safelist : [];
      })(), o.blocklist = (() => {
        let { blocklist: t } = o;
        if (Array.isArray(t)) {
          if (t.every((n) => typeof n == "string"))
            return t;
          v.default.warn("blocklist-invalid", [
            "The `blocklist` option must be an array of strings.",
            "https://tailwindcss.com/docs/content-configuration#discarding-classes"
          ]);
        }
        return [];
      })(), typeof o.prefix == "function")
        v.default.warn("prefix-function", [
          "As of Tailwind CSS v3.0, `prefix` cannot be a function.",
          "Update `prefix` in your configuration to be a string to eliminate this warning.",
          "https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"
        ]), o.prefix = "";
      else {
        var e;
        o.prefix = (e = o.prefix) !== null && e !== void 0 ? e : "";
      }
      o.content = {
        relative: (() => {
          let { content: t } = o;
          return t != null && t.relative ? t.relative : (0, i.flagEnabled)(o, "relativeContentPathsByDefault");
        })(),
        files: (() => {
          let { content: t, purge: n } = o;
          return Array.isArray(n) ? n : Array.isArray(n == null ? void 0 : n.content) ? n.content : Array.isArray(t) ? t : Array.isArray(t == null ? void 0 : t.content) ? t.content : Array.isArray(t == null ? void 0 : t.files) ? t.files : [];
        })(),
        extract: (() => {
          let t = (() => {
            var s, g, b, r, c, _, m, y, S, h;
            return !((s = o.purge) === null || s === void 0) && s.extract ? o.purge.extract : !((g = o.content) === null || g === void 0) && g.extract ? o.content.extract : !((b = o.purge) === null || b === void 0 || (r = b.extract) === null || r === void 0) && r.DEFAULT ? o.purge.extract.DEFAULT : !((c = o.content) === null || c === void 0 || (_ = c.extract) === null || _ === void 0) && _.DEFAULT ? o.content.extract.DEFAULT : !((m = o.purge) === null || m === void 0 || (y = m.options) === null || y === void 0) && y.extractors ? o.purge.options.extractors : !((S = o.content) === null || S === void 0 || (h = S.options) === null || h === void 0) && h.extractors ? o.content.options.extractors : {};
          })(), n = {}, a = (() => {
            var s, g, b, r;
            if (!((s = o.purge) === null || s === void 0 || (g = s.options) === null || g === void 0) && g.defaultExtractor)
              return o.purge.options.defaultExtractor;
            if (!((b = o.content) === null || b === void 0 || (r = b.options) === null || r === void 0) && r.defaultExtractor)
              return o.content.options.defaultExtractor;
          })();
          if (a !== void 0 && (n.DEFAULT = a), typeof t == "function")
            n.DEFAULT = t;
          else if (Array.isArray(t))
            for (let { extensions: s, extractor: g } of t ?? [])
              for (let b of s)
                n[b] = g;
          else typeof t == "object" && t !== null && Object.assign(n, t);
          return n;
        })(),
        transform: (() => {
          let t = (() => {
            var a, s, g, b, r, c;
            return !((a = o.purge) === null || a === void 0) && a.transform ? o.purge.transform : !((s = o.content) === null || s === void 0) && s.transform ? o.content.transform : !((g = o.purge) === null || g === void 0 || (b = g.transform) === null || b === void 0) && b.DEFAULT ? o.purge.transform.DEFAULT : !((r = o.content) === null || r === void 0 || (c = r.transform) === null || c === void 0) && c.DEFAULT ? o.content.transform.DEFAULT : {};
          })(), n = {};
          return typeof t == "function" ? n.DEFAULT = t : typeof t == "object" && t !== null && Object.assign(n, t), n;
        })()
      };
      for (let t of o.content.files)
        if (typeof t == "string" && /{([^,]*?)}/g.test(t)) {
          v.default.warn("invalid-glob-braces", [
            `The glob pattern ${(0, v.dim)(t)} in your Tailwind CSS configuration is invalid.`,
            `Update it to ${(0, v.dim)(t.replace(/{([^,]*?)}/g, "$1"))} to silence this warning.`
          ]);
          break;
        }
      return o;
    }
  })(ra)), ra;
}
var na = {}, yl;
function Gd() {
  return yl || (yl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "cloneDeep", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    function i(v) {
      return Array.isArray(v) ? v.map((p) => i(p)) : typeof v == "object" && v !== null ? Object.fromEntries(Object.entries(v).map(([p, u]) => [
        p,
        i(u)
      ])) : v;
    }
  })(na)), na;
}
var wl;
function Yd() {
  return wl || (wl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return N;
      }
    });
    const i = /* @__PURE__ */ g(xa()), v = /* @__PURE__ */ g(Wd()), p = /* @__PURE__ */ g(zd()), u = /* @__PURE__ */ g(Bd()), f = Vd(), o = Sa(), d = jd(), e = /* @__PURE__ */ g(gt()), t = Gd(), n = jr(), a = Br(), s = /* @__PURE__ */ g(Cf());
    function g(D) {
      return D && D.__esModule ? D : {
        default: D
      };
    }
    function b(D) {
      return typeof D == "function";
    }
    function r(D, ...B) {
      let k = B.pop();
      for (let A of B)
        for (let R in A) {
          let I = k(D[R], A[R]);
          I === void 0 ? (0, e.default)(D[R]) && (0, e.default)(A[R]) ? D[R] = r({}, D[R], A[R], k) : D[R] = A[R] : D[R] = I;
        }
      return D;
    }
    const c = {
      colors: u.default,
      negative(D) {
        return Object.keys(D).filter((B) => D[B] !== "0").reduce((B, k) => {
          let A = (0, i.default)(D[k]);
          return A !== void 0 && (B[`-${k}`] = A), B;
        }, {});
      },
      breakpoints(D) {
        return Object.keys(D).filter((B) => typeof D[B] == "string").reduce((B, k) => ({
          ...B,
          [`screen-${k}`]: D[k]
        }), {});
      }
    };
    function _(D, ...B) {
      return b(D) ? D(...B) : D;
    }
    function m(D) {
      return D.reduce((B, { extend: k }) => r(B, k, (A, R) => A === void 0 ? [
        R
      ] : Array.isArray(A) ? [
        R,
        ...A
      ] : [
        R,
        A
      ]), {});
    }
    function y(D) {
      return {
        ...D.reduce((B, k) => (0, f.defaults)(B, k), {}),
        // In order to resolve n config objects, we combine all of their `extend` properties
        // into arrays instead of objects so they aren't overridden.
        extend: m(D)
      };
    }
    function S(D, B) {
      if (Array.isArray(D) && (0, e.default)(D[0]))
        return D.concat(B);
      if (Array.isArray(B) && (0, e.default)(B[0]) && (0, e.default)(D))
        return [
          D,
          ...B
        ];
      if (Array.isArray(B))
        return B;
    }
    function h({ extend: D, ...B }) {
      return r(B, D, (k, A) => !b(k) && !A.some(b) ? r({}, k, ...A, S) : (R, I) => r({}, ...[
        k,
        ...A
      ].map((W) => _(W, R, I)), S));
    }
    function* O(D) {
      let B = (0, o.toPath)(D);
      if (B.length === 0 || (yield B, Array.isArray(D)))
        return;
      let k = /^(.*?)\s*\/\s*([^/]+)$/, A = D.match(k);
      if (A !== null) {
        let [, R, I] = A, W = (0, o.toPath)(R);
        W.alpha = I, yield W;
      }
    }
    function C(D) {
      const B = (k, A) => {
        for (const R of O(k)) {
          let I = 0, W = D;
          for (; W != null && I < R.length; )
            W = W[R[I++]], W = b(W) && (R.alpha === void 0 || I <= R.length - 1) ? W(B, c) : W;
          if (W !== void 0) {
            if (R.alpha !== void 0) {
              let Q = (0, n.parseColorFormat)(W);
              return (0, a.withAlphaValue)(Q, R.alpha, (0, s.default)(Q));
            }
            return (0, e.default)(W) ? (0, t.cloneDeep)(W) : W;
          }
        }
        return A;
      };
      return Object.assign(B, {
        theme: B,
        ...c
      }), Object.keys(D).reduce((k, A) => (k[A] = b(D[A]) ? D[A](B, c) : D[A], k), {});
    }
    function T(D) {
      let B = [];
      return D.forEach((k) => {
        B = [
          ...B,
          k
        ];
        var A;
        const R = (A = k == null ? void 0 : k.plugins) !== null && A !== void 0 ? A : [];
        R.length !== 0 && R.forEach((I) => {
          I.__isOptionsFunction && (I = I());
          var W;
          B = [
            ...B,
            ...T([
              (W = I == null ? void 0 : I.config) !== null && W !== void 0 ? W : {}
            ])
          ];
        });
      }), B;
    }
    function w(D) {
      return [
        ...D
      ].reduceRight((k, A) => b(A) ? A({
        corePlugins: k
      }) : (0, p.default)(A, k), v.default);
    }
    function P(D) {
      return [
        ...D
      ].reduceRight((k, A) => [
        ...k,
        ...A
      ], []);
    }
    function N(D) {
      let B = [
        ...T(D),
        {
          prefix: "",
          important: !1,
          separator: ":"
        }
      ];
      var k, A;
      return (0, d.normalizeConfig)((0, f.defaults)({
        theme: C(h(y(B.map((R) => (k = R == null ? void 0 : R.theme) !== null && k !== void 0 ? k : {})))),
        corePlugins: w(B.map((R) => R.corePlugins)),
        plugins: P(D.map((R) => (A = R == null ? void 0 : R.plugins) !== null && A !== void 0 ? A : []))
      }, ...B));
    }
  })(Ki)), Ki;
}
var ia = {}, aa, bl;
function Qd() {
  return bl || (bl = 1, aa = {
    content: [],
    presets: [],
    darkMode: "media",
    // or 'class'
    theme: {
      accentColor: ({ theme: l }) => ({
        ...l("colors"),
        auto: "auto"
      }),
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite"
      },
      aria: {
        busy: 'busy="true"',
        checked: 'checked="true"',
        disabled: 'disabled="true"',
        expanded: 'expanded="true"',
        hidden: 'hidden="true"',
        pressed: 'pressed="true"',
        readonly: 'readonly="true"',
        required: 'required="true"',
        selected: 'selected="true"'
      },
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9"
      },
      backdropBlur: ({ theme: l }) => l("blur"),
      backdropBrightness: ({ theme: l }) => l("brightness"),
      backdropContrast: ({ theme: l }) => l("contrast"),
      backdropGrayscale: ({ theme: l }) => l("grayscale"),
      backdropHueRotate: ({ theme: l }) => l("hueRotate"),
      backdropInvert: ({ theme: l }) => l("invert"),
      backdropOpacity: ({ theme: l }) => l("opacity"),
      backdropSaturate: ({ theme: l }) => l("saturate"),
      backdropSepia: ({ theme: l }) => l("sepia"),
      backgroundColor: ({ theme: l }) => l("colors"),
      backgroundImage: {
        none: "none",
        "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
        "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
        "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
        "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
        "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
        "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))"
      },
      backgroundOpacity: ({ theme: l }) => l("opacity"),
      backgroundPosition: {
        bottom: "bottom",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top"
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain"
      },
      blur: {
        0: "0",
        none: "",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px"
      },
      borderColor: ({ theme: l }) => ({
        ...l("colors"),
        DEFAULT: l("colors.gray.200", "currentColor")
      }),
      borderOpacity: ({ theme: l }) => l("opacity"),
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px"
      },
      borderSpacing: ({ theme: l }) => ({
        ...l("spacing")
      }),
      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px"
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none"
      },
      boxShadowColor: ({ theme: l }) => l("colors"),
      brightness: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        200: "2"
      },
      caretColor: ({ theme: l }) => l("colors"),
      colors: ({ colors: l }) => ({
        inherit: l.inherit,
        current: l.current,
        transparent: l.transparent,
        black: l.black,
        white: l.white,
        slate: l.slate,
        gray: l.gray,
        zinc: l.zinc,
        neutral: l.neutral,
        stone: l.stone,
        red: l.red,
        orange: l.orange,
        amber: l.amber,
        yellow: l.yellow,
        lime: l.lime,
        green: l.green,
        emerald: l.emerald,
        teal: l.teal,
        cyan: l.cyan,
        sky: l.sky,
        blue: l.blue,
        indigo: l.indigo,
        violet: l.violet,
        purple: l.purple,
        fuchsia: l.fuchsia,
        pink: l.pink,
        rose: l.rose
      }),
      columns: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        "3xs": "16rem",
        "2xs": "18rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem"
      },
      container: {},
      content: {
        none: "none"
      },
      contrast: {
        0: "0",
        50: ".5",
        75: ".75",
        100: "1",
        125: "1.25",
        150: "1.5",
        200: "2"
      },
      cursor: {
        auto: "auto",
        default: "default",
        pointer: "pointer",
        wait: "wait",
        text: "text",
        move: "move",
        help: "help",
        "not-allowed": "not-allowed",
        none: "none",
        "context-menu": "context-menu",
        progress: "progress",
        cell: "cell",
        crosshair: "crosshair",
        "vertical-text": "vertical-text",
        alias: "alias",
        copy: "copy",
        "no-drop": "no-drop",
        grab: "grab",
        grabbing: "grabbing",
        "all-scroll": "all-scroll",
        "col-resize": "col-resize",
        "row-resize": "row-resize",
        "n-resize": "n-resize",
        "e-resize": "e-resize",
        "s-resize": "s-resize",
        "w-resize": "w-resize",
        "ne-resize": "ne-resize",
        "nw-resize": "nw-resize",
        "se-resize": "se-resize",
        "sw-resize": "sw-resize",
        "ew-resize": "ew-resize",
        "ns-resize": "ns-resize",
        "nesw-resize": "nesw-resize",
        "nwse-resize": "nwse-resize",
        "zoom-in": "zoom-in",
        "zoom-out": "zoom-out"
      },
      divideColor: ({ theme: l }) => l("borderColor"),
      divideOpacity: ({ theme: l }) => l("borderOpacity"),
      divideWidth: ({ theme: l }) => l("borderWidth"),
      dropShadow: {
        sm: "0 1px 1px rgb(0 0 0 / 0.05)",
        DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
        md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
        lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
        xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
        "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
        none: "0 0 #0000"
      },
      fill: ({ theme: l }) => ({
        none: "none",
        ...l("colors")
      }),
      flex: {
        1: "1 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        none: "none"
      },
      flexBasis: ({ theme: l }) => ({
        auto: "auto",
        ...l("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%"
      }),
      flexGrow: {
        0: "0",
        DEFAULT: "1"
      },
      flexShrink: {
        0: "0",
        DEFAULT: "1"
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ],
        serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace"
        ]
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }]
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900"
      },
      gap: ({ theme: l }) => l("spacing"),
      gradientColorStops: ({ theme: l }) => l("colors"),
      gradientColorStopPositions: {
        "0%": "0%",
        "5%": "5%",
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "25%": "25%",
        "30%": "30%",
        "35%": "35%",
        "40%": "40%",
        "45%": "45%",
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
        "65%": "65%",
        "70%": "70%",
        "75%": "75%",
        "80%": "80%",
        "85%": "85%",
        "90%": "90%",
        "95%": "95%",
        "100%": "100%"
      },
      grayscale: {
        0: "0",
        DEFAULT: "100%"
      },
      gridAutoColumns: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0, 1fr)"
      },
      gridAutoRows: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0, 1fr)"
      },
      gridColumn: {
        auto: "auto",
        "span-1": "span 1 / span 1",
        "span-2": "span 2 / span 2",
        "span-3": "span 3 / span 3",
        "span-4": "span 4 / span 4",
        "span-5": "span 5 / span 5",
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-full": "1 / -1"
      },
      gridColumnEnd: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13"
      },
      gridColumnStart: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13"
      },
      gridRow: {
        auto: "auto",
        "span-1": "span 1 / span 1",
        "span-2": "span 2 / span 2",
        "span-3": "span 3 / span 3",
        "span-4": "span 4 / span 4",
        "span-5": "span 5 / span 5",
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-full": "1 / -1"
      },
      gridRowEnd: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13"
      },
      gridRowStart: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13"
      },
      gridTemplateColumns: {
        none: "none",
        subgrid: "subgrid",
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))"
      },
      gridTemplateRows: {
        none: "none",
        subgrid: "subgrid",
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))"
      },
      height: ({ theme: l }) => ({
        auto: "auto",
        ...l("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content"
      }),
      hueRotate: {
        0: "0deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        90: "90deg",
        180: "180deg"
      },
      inset: ({ theme: l }) => ({
        auto: "auto",
        ...l("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%"
      }),
      invert: {
        0: "0",
        DEFAULT: "100%"
      },
      keyframes: {
        spin: {
          to: {
            transform: "rotate(360deg)"
          }
        },
        ping: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0"
          }
        },
        pulse: {
          "50%": {
            opacity: ".5"
          }
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
          }
        }
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        3: ".75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem"
      },
      listStyleType: {
        none: "none",
        disc: "disc",
        decimal: "decimal"
      },
      listStyleImage: {
        none: "none"
      },
      margin: ({ theme: l }) => ({
        auto: "auto",
        ...l("spacing")
      }),
      lineClamp: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6"
      },
      maxHeight: ({ theme: l }) => ({
        ...l("spacing"),
        none: "none",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content"
      }),
      maxWidth: ({ theme: l, breakpoints: i }) => ({
        ...l("spacing"),
        none: "none",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        prose: "65ch",
        ...i(l("screens"))
      }),
      minHeight: ({ theme: l }) => ({
        ...l("spacing"),
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content"
      }),
      minWidth: ({ theme: l }) => ({
        ...l("spacing"),
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content"
      }),
      objectPosition: {
        bottom: "bottom",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top"
      },
      opacity: {
        0: "0",
        5: "0.05",
        10: "0.1",
        15: "0.15",
        20: "0.2",
        25: "0.25",
        30: "0.3",
        35: "0.35",
        40: "0.4",
        45: "0.45",
        50: "0.5",
        55: "0.55",
        60: "0.6",
        65: "0.65",
        70: "0.7",
        75: "0.75",
        80: "0.8",
        85: "0.85",
        90: "0.9",
        95: "0.95",
        100: "1"
      },
      order: {
        first: "-9999",
        last: "9999",
        none: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12"
      },
      outlineColor: ({ theme: l }) => l("colors"),
      outlineOffset: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px"
      },
      outlineWidth: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px"
      },
      padding: ({ theme: l }) => l("spacing"),
      placeholderColor: ({ theme: l }) => l("colors"),
      placeholderOpacity: ({ theme: l }) => l("opacity"),
      ringColor: ({ theme: l }) => ({
        DEFAULT: l("colors.blue.500", "#3b82f6"),
        ...l("colors")
      }),
      ringOffsetColor: ({ theme: l }) => l("colors"),
      ringOffsetWidth: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px"
      },
      ringOpacity: ({ theme: l }) => ({
        DEFAULT: "0.5",
        ...l("opacity")
      }),
      ringWidth: {
        DEFAULT: "3px",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px"
      },
      rotate: {
        0: "0deg",
        1: "1deg",
        2: "2deg",
        3: "3deg",
        6: "6deg",
        12: "12deg",
        45: "45deg",
        90: "90deg",
        180: "180deg"
      },
      saturate: {
        0: "0",
        50: ".5",
        100: "1",
        150: "1.5",
        200: "2"
      },
      scale: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      },
      scrollMargin: ({ theme: l }) => ({
        ...l("spacing")
      }),
      scrollPadding: ({ theme: l }) => l("spacing"),
      sepia: {
        0: "0",
        DEFAULT: "100%"
      },
      skew: {
        0: "0deg",
        1: "1deg",
        2: "2deg",
        3: "3deg",
        6: "6deg",
        12: "12deg"
      },
      space: ({ theme: l }) => ({
        ...l("spacing")
      }),
      spacing: {
        px: "1px",
        0: "0px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem"
      },
      stroke: ({ theme: l }) => ({
        none: "none",
        ...l("colors")
      }),
      strokeWidth: {
        0: "0",
        1: "1",
        2: "2"
      },
      supports: {},
      data: {},
      textColor: ({ theme: l }) => l("colors"),
      textDecorationColor: ({ theme: l }) => l("colors"),
      textDecorationThickness: {
        auto: "auto",
        "from-font": "from-font",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px"
      },
      textIndent: ({ theme: l }) => ({
        ...l("spacing")
      }),
      textOpacity: ({ theme: l }) => l("opacity"),
      textUnderlineOffset: {
        auto: "auto",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px"
      },
      transformOrigin: {
        center: "center",
        top: "top",
        "top-right": "top right",
        right: "right",
        "bottom-right": "bottom right",
        bottom: "bottom",
        "bottom-left": "bottom left",
        left: "left",
        "top-left": "top left"
      },
      transitionDelay: {
        0: "0s",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms"
      },
      transitionDuration: {
        DEFAULT: "150ms",
        0: "0s",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms"
      },
      transitionProperty: {
        none: "none",
        all: "all",
        DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform"
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      translate: ({ theme: l }) => ({
        ...l("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%"
      }),
      size: ({ theme: l }) => ({
        auto: "auto",
        ...l("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content"
      }),
      width: ({ theme: l }) => ({
        auto: "auto",
        ...l("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        screen: "100vw",
        svw: "100svw",
        lvw: "100lvw",
        dvw: "100dvw",
        min: "min-content",
        max: "max-content",
        fit: "fit-content"
      }),
      willChange: {
        auto: "auto",
        scroll: "scroll-position",
        contents: "contents",
        transform: "transform"
      },
      zIndex: {
        auto: "auto",
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50"
      }
    },
    plugins: []
  }), aa;
}
var _l;
function Hd() {
  return _l || (_l = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const i = /* @__PURE__ */ p(Qd()), v = dt();
    function p(f) {
      return f && f.__esModule ? f : {
        default: f
      };
    }
    function u(f) {
      var o;
      const d = ((o = f == null ? void 0 : f.presets) !== null && o !== void 0 ? o : [
        i.default
      ]).slice().reverse().flatMap((n) => u(n instanceof Function ? n() : n)), e = {
        // Add experimental configs here...
        respectDefaultRingColorOpacity: {
          theme: {
            ringColor: ({ theme: n }) => ({
              DEFAULT: "#3b82f67f",
              ...n("colors")
            })
          }
        },
        disableColorOpacityUtilitiesByDefault: {
          corePlugins: {
            backgroundOpacity: !1,
            borderOpacity: !1,
            divideOpacity: !1,
            placeholderOpacity: !1,
            ringOpacity: !1,
            textOpacity: !1
          }
        }
      }, t = Object.keys(e).filter((n) => (0, v.flagEnabled)(f, n)).map((n) => e[n]);
      return [
        f,
        ...t,
        ...d
      ];
    }
  })(ia)), ia;
}
var Sl;
function Jd() {
  return Sl || (Sl = 1, (function(l) {
    Object.defineProperty(l, "__esModule", {
      value: !0
    }), Object.defineProperty(l, "default", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const i = /* @__PURE__ */ p(Yd()), v = /* @__PURE__ */ p(Hd());
    function p(f) {
      return f && f.__esModule ? f : {
        default: f
      };
    }
    function u(...f) {
      let [, ...o] = (0, v.default)(f[0]);
      return (0, i.default)([
        ...f,
        ...o
      ]);
    }
  })(Ji)), Ji;
}
var sa, Ol;
function Kd() {
  if (Ol) return sa;
  Ol = 1;
  let l = Jd();
  return sa = (l.__esModule ? l : { default: l }).default, sa;
}
var Xd = Kd();
const Zd = /* @__PURE__ */ tt(Xd), ep = (l) => Ud.createContext(
  Zd({
    ...l,
    content: [],
    corePlugins: {
      preflight: !1
    }
  })
), tp = Yf(
  `
  @tailwind base;
  @tailwind components;
`
).root();
function rp(l) {
  const i = ep(l);
  return {
    generateRootForClasses: (v) => {
      const p = Ad.generateRules(
        new Set(v),
        i
      ), u = tp.clone().append(...p.map(([, f]) => f));
      return fl()(u), Ed(i)(u), fl()(u), _d(i)(u), qc(i)(u), Nd(i)(u), Dd(i)(u), _c(i)(u), xc(i)(u), $d(u), u;
    }
  };
}
const ap = ({ children: l, config: i }) => {
  const v = rp(i ?? {}), p = new Jf();
  let u = [], f = !1, o = qr(l, (d) => {
    if (en.isValidElement(d)) {
      const {
        elementWithInlinedStyles: e,
        nonInlinableClasses: t,
        nonInlineStyleNodes: n
      } = yc(d, v);
      return u = u.concat(t), p.append(n), t.length > 0 && !f && (f = !0), e;
    }
    return d;
  });
  if (Xf(p), f) {
    let d = !1;
    if (o = qr(o, (e) => {
      if (d)
        return e;
      if (en.isValidElement(e) && e.type === "head") {
        d = !0;
        const t = /* @__PURE__ */ Lf("style", { children: Kf(p.toString().trim()) });
        return en.cloneElement(
          e,
          e.props,
          e.props.children,
          t
        );
      }
      return e;
    }), !d)
      throw new Error(
        `You are trying to use the following Tailwind classes that cannot be inlined: ${u.join(
          " "
        )}.
For the media queries to work properly on rendering, they need to be added into a <style> tag inside of a <head> tag,
the Tailwind component tried finding a <head> element but just wasn't able to find it.

Make sure that you have a <head> element at some point inside of the <Tailwind> component at any depth. 
This can also be our <Head> component.

If you do already have a <head> element at some depth, 
please file a bug https://github.com/maxscn/skrift/issues/new?assignees=&labels=Type%3A+Bug&projects=&template=1.bug_report.yml.`
      );
  }
  return o;
};
export {
  ap as Tailwind
};

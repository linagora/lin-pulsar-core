import * as e from "vue";
import { Fragment as t, Text as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createVNode as s, defineAsyncComponent as c, defineComponent as l, effectScope as u, getCurrentInstance as d, getCurrentScope as f, hasInjectionContext as p, inject as m, isReactive as h, isRef as g, markRaw as _, mergeProps as v, nextTick as y, onMounted as b, onScopeDispose as x, onUnmounted as S, openBlock as C, reactive as w, ref as T, renderList as ee, renderSlot as E, resolveDynamicComponent as D, shallowRef as O, toRaw as k, toRef as A, toRefs as j, unref as M, watch as N } from "vue";
import { getInstance as P, registerRemotes as te } from "@module-federation/enhanced/runtime";
// \0rolldown/runtime.js
var ne = Object.create, F = Object.defineProperty, I = Object.getOwnPropertyDescriptor, re = Object.getOwnPropertyNames, ie = Object.getPrototypeOf, ae = Object.prototype.hasOwnProperty, oe = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), L = (e, t) => {
	let n = {};
	for (var r in e) F(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || F(n, Symbol.toStringTag, { value: "Module" }), n;
}, se = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = re(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !ae.call(e, s) && s !== n && F(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = I(t, s)) || r.enumerable
	});
	return e;
}, ce = (e, t, n) => (n = e == null ? {} : ne(ie(e)), se(t || !e || !e.__esModule || !ae.call(e, "default") ? F(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), le = null;
function ue(e) {
	le === null ? le = e : console.warn("[LinPulsar Core] Module Federation has already been initialized. Re-initialization is ignored.");
}
function de() {
	if (le === null) throw Error("[LinPulsar Core] Module Federation is not initialized. Call setModuleFederation() first.");
	return le;
}
var fe = (e) => c(() => de().loadRemote(e).then((t) => {
	if (!t?.default) throw Error(`Failed to load component from ${e}`);
	return t.default;
})), pe = {};
function me(e, t) {
	pe[e] = _(t);
}
function he(e) {
	Object.entries(e).forEach(([e, t]) => me(e, t));
}
function ge(e) {
	return pe[e];
}
function _e(e) {
	return ge(e) || (console.warn(`[LinPulsar Core] Local component "${e}" is not registered, falling back to global resolution. Registered components: ${Object.keys(pe).join(", ")}.`), e);
}
// node_modules/.pnpm/pinia@3.0.4_typescript@6.0.3_vue@3.5.44_typescript@6.0.3_/node_modules/pinia/dist/pinia.mjs
var ve = typeof window < "u", ye, be = (e) => ye = e;
process.env.NODE_ENV;
var xe = process.env.NODE_ENV === "production" ? /* istanbul ignore next */ Symbol() : Symbol("pinia");
function Se(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ce;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ce ||= {});
var R = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function we(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function Te(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		Ae(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function Ee(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function De(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let t = new MouseEvent("click", {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			button: 0,
			relatedTarget: null
		});
		e.dispatchEvent(t);
	}
}
var Oe = typeof navigator == "object" ? navigator : { userAgent: "" }, ke = /Macintosh/.test(Oe.userAgent) && /AppleWebKit/.test(Oe.userAgent) && !/Safari/.test(Oe.userAgent), Ae = ve ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ke ? je : "msSaveOrOpenBlob" in Oe ? Me : Ne : () => {};
function je(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? De(r) : Ee(r.href) ? Te(e, t, n) : (r.target = "_blank", De(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		De(r);
	}, 0));
}
function Me(e, t = "download", n) {
	if (typeof e == "string") {
		if (Ee(e)) Te(e, t, n);
		else {
			let t = document.createElement("a");
			t.href = e, t.target = "_blank", setTimeout(function() {
				De(t);
			});
		}
	} else navigator.msSaveOrOpenBlob(we(e, n), t);
}
function Ne(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return Te(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(R.HTMLElement)) || "safari" in R, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || ke) && typeof FileReader < "u") {
		let t = new FileReader();
		t.onloadend = function() {
			let e = t.result;
			if (typeof e != "string") throw r = null, Error("Wrong reader.result type");
			e = o ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = e : location.assign(e), r = null;
		}, t.readAsDataURL(e);
	} else {
		let t = URL.createObjectURL(e);
		r ? r.location.assign(t) : location.href = t, r = null, setTimeout(function() {
			URL.revokeObjectURL(t);
		}, 4e4);
	}
}
var { assign: Pe } = Object;
function Fe(e, t) {
	for (let n in t) {
		let r = t[n];
		if (!(n in e)) continue;
		let i = e[n];
		e[n] = Se(i) && Se(r) && !g(r) && !h(r) ? Fe(i, r) : r;
	}
	return e;
}
var Ie = () => {};
function Le(e, t, n, r = Ie) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && f() && x(i), i;
}
function Re(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var ze = (e) => e(), Be = Symbol(), Ve = Symbol();
function He(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		e[n] = Se(i) && Se(r) && e.hasOwnProperty(n) && !g(r) && !h(r) ? He(i, r) : r;
	}
	return e;
}
var Ue = process.env.NODE_ENV === "production" ? /* istanbul ignore next */ Symbol() : Symbol("pinia:skipHydration");
function We(e) {
	return !Se(e) || !Object.prototype.hasOwnProperty.call(e, Ue);
}
var { assign: Ge } = Object;
function Ke(e) {
	return !!(g(e) && e.effect);
}
function qe(e, t, n, i) {
	let { state: a, actions: o, getters: s } = t, c = n.state.value[e], l;
	function u() {
		c || process.env.NODE_ENV !== "production" && i || 
		/* istanbul ignore if */
		(n.state.value[e] = a ? a() : {});
		let t = process.env.NODE_ENV !== "production" && i ? j(T(a ? a() : {}).value) : j(n.state.value[e]);
		return Ge(t, o, Object.keys(s || {}).reduce((i, a) => (process.env.NODE_ENV !== "production" && a in t && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${a}" in store "${e}".`), i[a] = _(r(() => {
			be(n);
			let t = n._s.get(e);
			return s[a].call(t, t);
		})), i), {}));
	}
	return l = Je(e, u, t, n, i, !0), l;
}
function Je(e, t, n = {}, i, a, o) {
	let s, c = Ge({ actions: {} }, n);
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== "production" && !i._e.active) throw Error("Pinia destroyed");
	let l = { deep: !0 };
	/* istanbul ignore else */
	process.env.NODE_ENV !== "production" && (l.onTrigger = (e) => {
		/* istanbul ignore else */
		d ? v = e : d == 0 && !M._hotUpdating && 
		/* istanbul ignore else */
		(Array.isArray(v) ? v.push(e) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
	});
	let d, f, p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), v, b = i.state.value[e];
	o || b || process.env.NODE_ENV !== "production" && a || 
	/* istanbul ignore if */
	(i.state.value[e] = {});
	let x = T({}), S;
	function C(t) {
		let n;
		d = f = !1, process.env.NODE_ENV !== "production" && (v = []), typeof t == "function" ? (t(i.state.value[e]), n = {
			type: Ce.patchFunction,
			storeId: e,
			events: v
		}) : (He(i.state.value[e], t), n = {
			type: Ce.patchObject,
			payload: t,
			storeId: e,
			events: v
		});
		let r = S = Symbol();
		y().then(() => {
			S === r && (d = !0);
		}), f = !0, Re(p, n, i.state.value[e]);
	}
	let ee = o ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			Ge(e, t);
		});
	} : process.env.NODE_ENV === "production" ? Ie : () => {
		throw Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
	};
	function E() {
		s.stop(), p.clear(), m.clear(), i._s.delete(e);
	}
	let D = (t, n = "") => {
		if (Be in t) return t[Ve] = n, t;
		let r = function() {
			be(i);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			Re(m, {
				args: n,
				name: r[Ve],
				store: M,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : M, n);
			} catch (e) {
				throw Re(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (Re(a, e), e)).catch((e) => (Re(o, e), Promise.reject(e))) : (Re(a, l), l);
		};
		return r[Be] = !0, r[Ve] = n, r;
	}, O = /*#__PURE__*/ _({
		actions: {},
		getters: {},
		state: [],
		hotState: x
	}), j = {
		_p: i,
		$id: e,
		$onAction: Le.bind(null, m),
		$patch: C,
		$reset: ee,
		$subscribe(t, n = {}) {
			let r = Le(p, t, n.detached, () => a()), a = s.run(() => N(() => i.state.value[e], (r) => {
				(n.flush === "sync" ? f : d) && t({
					storeId: e,
					type: Ce.direct,
					events: v
				}, r);
			}, Ge({}, l, n)));
			return r;
		},
		$dispose: E
	}, M = w(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ve ? Ge({
		_hmrPayload: O,
		_customProperties: _(/* @__PURE__ */ new Set())
	}, j) : j);
	i._s.set(e, M);
	let P = (i._a && i._a.runWithContext || ze)(() => i._e.run(() => (s = u()).run(() => t({ action: D }))));
	for (let t in P) {
		let r = P[t];
		g(r) && !Ke(r) || h(r) ? (process.env.NODE_ENV !== "production" && a ? x.value[t] = A(P, t) : o || (b && We(r) && (g(r) ? r.value = b[t] : He(r, b[t])), i.state.value[e][t] = r), process.env.NODE_ENV !== "production" && O.state.push(t)) : typeof r == "function" ? 
		/* istanbul ignore else */
		(P[t] = process.env.NODE_ENV !== "production" && a ? r : D(r, t), process.env.NODE_ENV !== "production" && (O.actions[t] = r), c.actions[t] = r) : process.env.NODE_ENV !== "production" && Ke(r) && (O.getters[t] = o ? n.getters[t] : r, ve && (P._getters ||= _([])).push(t));
	}
	if (Ge(M, P), Ge(k(M), P), Object.defineProperty(M, "$state", {
		get: () => process.env.NODE_ENV !== "production" && a ? x.value : i.state.value[e],
		set: (e) => {
			/* istanbul ignore if */
			if (process.env.NODE_ENV !== "production" && a) throw Error("cannot set hotState");
			C((t) => {
				Ge(t, e);
			});
		}
	}), process.env.NODE_ENV !== "production" && (M._hotUpdate = _((t) => {
		M._hotUpdating = !0, t._hmrPayload.state.forEach((e) => {
			if (e in M.$state) {
				let n = t.$state[e], r = M.$state[e];
				typeof n == "object" && Se(n) && Se(r) ? Fe(n, r) : t.$state[e] = r;
			}
			M[e] = A(t.$state, e);
		}), Object.keys(M.$state).forEach((e) => {
			e in t.$state || delete M[e];
		}), d = !1, f = !1, i.state.value[e] = A(t._hmrPayload, "hotState"), f = !0, y().then(() => {
			d = !0;
		});
		for (let e in t._hmrPayload.actions) {
			let n = t[e];
			M[e] = D(n, e);
		}
		for (let e in t._hmrPayload.getters) {
			let n = t._hmrPayload.getters[e], a = o ? r(() => (be(i), n.call(M, M))) : n;
			M[e] = a;
		}
		Object.keys(M._hmrPayload.getters).forEach((e) => {
			e in t._hmrPayload.getters || delete M[e];
		}), Object.keys(M._hmrPayload.actions).forEach((e) => {
			e in t._hmrPayload.actions || delete M[e];
		}), M._hmrPayload = t._hmrPayload, M._getters = t._getters, M._hotUpdating = !1;
	})), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ve) {
		let e = {
			writable: !0,
			configurable: !0,
			enumerable: !1
		};
		[
			"_p",
			"_hmrPayload",
			"_getters",
			"_customProperties"
		].forEach((t) => {
			Object.defineProperty(M, t, Ge({ value: M[t] }, e));
		});
	}
	return i._p.forEach((e) => {
		/* istanbul ignore else */
		if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ve) {
			let t = s.run(() => e({
				store: M,
				app: i._a,
				pinia: i,
				options: c
			}));
			Object.keys(t || {}).forEach((e) => M._customProperties.add(e)), Ge(M, t);
		} else Ge(M, s.run(() => e({
			store: M,
			app: i._a,
			pinia: i,
			options: c
		})));
	}), process.env.NODE_ENV !== "production" && M.$state && typeof M.$state == "object" && typeof M.$state.constructor == "function" && !M.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${M.$id}".`), b && o && n.hydrate && n.hydrate(M.$state, b), d = !0, f = !0, M;
}
function Ye(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, o) {
		let s = p();
		if (n = (process.env.NODE_ENV === "test" && ye && ye._testing ? null : n) || (s ? m(xe, null) : null), n && be(n), process.env.NODE_ENV !== "production" && !ye) throw Error("[🍍]: \"getActivePinia()\" was called but there was no active Pinia. Are you trying to use a store before calling \"app.use(pinia)\"?\nSee https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.\nThis will fail in production.");
		n = ye, n._s.has(e) || (i ? Je(e, t, r, n) : qe(e, r, n), process.env.NODE_ENV !== "production" && (a._pinia = n));
		let c = n._s.get(e);
		if (process.env.NODE_ENV !== "production" && o) {
			let a = "__hot:" + e, s = i ? Je(a, t, r, n, !0) : qe(a, Ge({}, r), n, !0);
			o._hotUpdate(s), delete n.state.value[a], n._s.delete(a);
		}
		if (process.env.NODE_ENV !== "production" && ve) {
			let t = d();
			if (t && t.proxy && !o) {
				let n = t.proxy, r = "_pStores" in n ? n._pStores : n._pStores = {};
				r[e] = c;
			}
		}
		return c;
	}
	return a.$id = e, a;
}
// src/services/piniaStoreService.ts
var Xe = null;
function Ze(e) {
	Xe === null ? Xe = e : console.warn("[LinPulsar Core] Pinia store has already been initialized. Re-initialization is ignored.");
}
function Qe() {
	if (Xe === null) throw Error("[LinPulsar Core] Pinia store is not initialized. Call setPiniaStore() first.");
	return Xe;
}
// src/stores/linPulsarZoneStore.ts
var $e = () => et(Qe()), et = Ye("LinPulsarZoneStore", {
	state: () => ({ zones: {} }),
	getters: { hasZoneEntries: (e) => (t) => (e.zones[t]?.length ?? 0) > 0 },
	actions: {
		appendEntry(e, t) {
			this.zones[e] || (this.zones[e] = []), this.zones[e].push(t);
		},
		registerPlugin(e, t, n) {
			this.appendEntry(e, {
				type: "federated",
				plugin: t,
				props: n
			});
		},
		registerPluginOnce(e, t, n) {
			this.zones[e]?.some((e) => e.type === "federated" && e.plugin === t) || this.registerPlugin(e, t, n);
		},
		registerComponent(e, t, n) {
			this.appendEntry(e, {
				type: "component",
				component: t,
				props: n
			});
		}
	}
}), tt = /* @__PURE__ */ l({
	inheritAttrs: !1,
	__name: "LinPulsarZoneRenderer",
	props: { zone: {} },
	setup(e) {
		let n = e, r = ($e().zones[n.zone] || []).map((e) => ({
			props: e.props,
			component: e.type === "federated" ? fe(e.plugin) : _e(e.component)
		}));
		return (e, n) => (C(), o(t, null, [(C(!0), o(t, null, ee(M(r), (t, n) => (C(), i(D(t.component), v({ key: n }, { ref_for: !0 }, {
			...e.$attrs,
			...t.props
		}), null, 16))), 128)), M(r).length === 0 ? E(e.$slots, "default", {}, void 0, void 0, 0) : a("", !0)], 64));
	}
}), nt = /* @__PURE__ */ oe(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs = r();
	})(n, (function() {
		var e = 1e3, t = 6e4, n = 36e5, r = "millisecond", i = "second", a = "minute", o = "hour", s = "day", c = "week", l = "month", u = "quarter", d = "year", f = "date", p = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(e) {
				var t = [
					"th",
					"st",
					"nd",
					"rd"
				], n = e % 100;
				return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]";
			}
		}, _ = function(e, t, n) {
			var r = String(e);
			return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e;
		}, v = {
			s: _,
			z: function(e) {
				var t = -e.utcOffset(), n = Math.abs(t), r = Math.floor(n / 60), i = n % 60;
				return (t <= 0 ? "+" : "-") + _(r, 2, "0") + ":" + _(i, 2, "0");
			},
			m: function e(t, n) {
				if (t.date() < n.date()) return -e(n, t);
				var r = 12 * (n.year() - t.year()) + (n.month() - t.month()), i = t.clone().add(r, l), a = n - i < 0, o = t.clone().add(r + (a ? -1 : 1), l);
				return +(-(r + (n - i) / (a ? i - o : o - i)) || 0);
			},
			a: function(e) {
				return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
			},
			p: function(e) {
				return {
					M: l,
					y: d,
					w: c,
					d: s,
					D: f,
					h: o,
					m: a,
					s: i,
					ms: r,
					Q: u
				}[e] || String(e || "").toLowerCase().replace(/s$/, "");
			},
			u: function(e) {
				return e === void 0;
			}
		}, y = "en", b = {};
		b[y] = g;
		var x = "$isDayjsObject", S = function(e) {
			return e instanceof ee || !(!e || !e[x]);
		}, C = function e(t, n, r) {
			var i;
			if (!t) return y;
			if (typeof t == "string") {
				var a = t.toLowerCase();
				b[a] && (i = a), n && (b[a] = n, i = a);
				var o = t.split("-");
				if (!i && o.length > 1) return e(o[0]);
			} else {
				var s = t.name;
				b[s] = t, i = s;
			}
			return !r && i && (y = i), i || !r && y;
		}, w = function(e, t) {
			if (S(e)) return e.clone();
			var n = typeof t == "object" ? t : {};
			return n.date = e, n.args = arguments, new ee(n);
		}, T = v;
		T.l = C, T.i = S, T.w = function(e, t) {
			return w(e, {
				locale: t.$L,
				utc: t.$u,
				x: t.$x,
				$offset: t.$offset
			});
		};
		var ee = function() {
			function g(e) {
				this.$L = C(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[x] = !0;
			}
			var _ = g.prototype;
			return _.parse = function(e) {
				this.$d = function(e) {
					var t = e.date, n = e.utc;
					if (t === null) return /* @__PURE__ */ new Date(NaN);
					if (T.u(t)) return /* @__PURE__ */ new Date();
					if (t instanceof Date) return new Date(t);
					if (typeof t == "string" && !/Z$/i.test(t)) {
						var r = t.match(m);
						if (r) {
							var i = r[2] - 1 || 0, a = (r[7] || "0").substring(0, 3);
							return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a);
						}
					}
					return new Date(t);
				}(e), this.init();
			}, _.init = function() {
				var e = this.$d;
				this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
			}, _.$utils = function() {
				return T;
			}, _.isValid = function() {
				return this.$d.toString() !== p;
			}, _.isSame = function(e, t) {
				var n = w(e);
				return this.startOf(t) <= n && n <= this.endOf(t);
			}, _.isAfter = function(e, t) {
				return w(e) < this.startOf(t);
			}, _.isBefore = function(e, t) {
				return this.endOf(t) < w(e);
			}, _.$g = function(e, t, n) {
				return T.u(e) ? this[t] : this.set(n, e);
			}, _.unix = function() {
				return Math.floor(this.valueOf() / 1e3);
			}, _.valueOf = function() {
				return this.$d.getTime();
			}, _.startOf = function(e, t) {
				var n = this, r = !!T.u(t) || t, u = T.p(e), p = function(e, t) {
					var i = T.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
					return r ? i : i.endOf(s);
				}, m = function(e, t) {
					return T.w(n.toDate()[e].apply(n.toDate("s"), (r ? [
						0,
						0,
						0,
						0
					] : [
						23,
						59,
						59,
						999
					]).slice(t)), n);
				}, h = this.$W, g = this.$M, _ = this.$D, v = "set" + (this.$u ? "UTC" : "");
				switch (u) {
					case d: return r ? p(1, 0) : p(31, 11);
					case l: return r ? p(1, g) : p(0, g + 1);
					case c:
						var y = this.$locale().weekStart || 0, b = (h < y ? h + 7 : h) - y;
						return p(r ? _ - b : _ + (6 - b), g);
					case s:
					case f: return m(v + "Hours", 0);
					case o: return m(v + "Minutes", 1);
					case a: return m(v + "Seconds", 2);
					case i: return m(v + "Milliseconds", 3);
					default: return this.clone();
				}
			}, _.endOf = function(e) {
				return this.startOf(e, !1);
			}, _.$set = function(e, t) {
				var n, c = T.p(e), u = "set" + (this.$u ? "UTC" : ""), p = (n = {}, n[s] = u + "Date", n[f] = u + "Date", n[l] = u + "Month", n[d] = u + "FullYear", n[o] = u + "Hours", n[a] = u + "Minutes", n[i] = u + "Seconds", n[r] = u + "Milliseconds", n)[c], m = c === s ? this.$D + (t - this.$W) : t;
				if (c === l || c === d) {
					var h = this.clone().set(f, 1);
					h.$d[p](m), h.init(), this.$d = h.set(f, Math.min(this.$D, h.daysInMonth())).$d;
				} else p && this.$d[p](m);
				return this.init(), this;
			}, _.set = function(e, t) {
				return this.clone().$set(e, t);
			}, _.get = function(e) {
				return this[T.p(e)]();
			}, _.add = function(r, u) {
				var f, p = this;
				r = Number(r);
				var m = T.p(u), h = function(e) {
					var t = w(p);
					return T.w(t.date(t.date() + Math.round(e * r)), p);
				};
				if (m === l) return this.set(l, this.$M + r);
				if (m === d) return this.set(d, this.$y + r);
				if (m === s) return h(1);
				if (m === c) return h(7);
				var g = (f = {}, f[a] = t, f[o] = n, f[i] = e, f)[m] || 1, _ = this.$d.getTime() + r * g;
				return T.w(_, this);
			}, _.subtract = function(e, t) {
				return this.add(-1 * e, t);
			}, _.format = function(e) {
				var t = this, n = this.$locale();
				if (!this.isValid()) return n.invalidDate || p;
				var r = e || "YYYY-MM-DDTHH:mm:ssZ", i = T.z(this), a = this.$H, o = this.$m, s = this.$M, c = n.weekdays, l = n.months, u = n.meridiem, d = function(e, n, i, a) {
					return e && (e[n] || e(t, r)) || i[n].slice(0, a);
				}, f = function(e) {
					return T.s(a % 12 || 12, e, "0");
				}, m = u || function(e, t, n) {
					var r = e < 12 ? "AM" : "PM";
					return n ? r.toLowerCase() : r;
				};
				return r.replace(h, (function(e, r) {
					return r || function(e) {
						switch (e) {
							case "YY": return String(t.$y).slice(-2);
							case "YYYY": return T.s(t.$y, 4, "0");
							case "M": return s + 1;
							case "MM": return T.s(s + 1, 2, "0");
							case "MMM": return d(n.monthsShort, s, l, 3);
							case "MMMM": return d(l, s);
							case "D": return t.$D;
							case "DD": return T.s(t.$D, 2, "0");
							case "d": return String(t.$W);
							case "dd": return d(n.weekdaysMin, t.$W, c, 2);
							case "ddd": return d(n.weekdaysShort, t.$W, c, 3);
							case "dddd": return c[t.$W];
							case "H": return String(a);
							case "HH": return T.s(a, 2, "0");
							case "h": return f(1);
							case "hh": return f(2);
							case "a": return m(a, o, !0);
							case "A": return m(a, o, !1);
							case "m": return String(o);
							case "mm": return T.s(o, 2, "0");
							case "s": return String(t.$s);
							case "ss": return T.s(t.$s, 2, "0");
							case "SSS": return T.s(t.$ms, 3, "0");
							case "Z": return i;
						}
						return null;
					}(e) || i.replace(":", "");
				}));
			}, _.utcOffset = function() {
				return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			}, _.diff = function(r, f, p) {
				var m, h = this, g = T.p(f), _ = w(r), v = (_.utcOffset() - this.utcOffset()) * t, y = this - _, b = function() {
					return T.m(h, _);
				};
				switch (g) {
					case d:
						m = b() / 12;
						break;
					case l:
						m = b();
						break;
					case u:
						m = b() / 3;
						break;
					case c:
						m = (y - v) / 6048e5;
						break;
					case s:
						m = (y - v) / 864e5;
						break;
					case o:
						m = y / n;
						break;
					case a:
						m = y / t;
						break;
					case i:
						m = y / e;
						break;
					default: m = y;
				}
				return p ? m : T.a(m);
			}, _.daysInMonth = function() {
				return this.endOf(l).$D;
			}, _.$locale = function() {
				return b[this.$L];
			}, _.locale = function(e, t) {
				if (!e) return this.$L;
				var n = this.clone(), r = C(e, t, !0);
				return r && (n.$L = r), n;
			}, _.clone = function() {
				return T.w(this.$d, this);
			}, _.toDate = function() {
				return new Date(this.valueOf());
			}, _.toJSON = function() {
				return this.isValid() ? this.toISOString() : null;
			}, _.toISOString = function() {
				return this.$d.toISOString();
			}, _.toString = function() {
				return this.$d.toUTCString();
			}, g;
		}(), E = ee.prototype;
		return w.prototype = E, [
			["$ms", r],
			["$s", i],
			["$m", a],
			["$H", o],
			["$W", s],
			["$M", l],
			["$y", d],
			["$D", f]
		].forEach((function(e) {
			E[e[1]] = function(t) {
				return this.$g(t, e[0], e[1]);
			};
		})), w.extend = function(e, t) {
			return e.$i ||= (e(t, ee, w), !0), w;
		}, w.locale = C, w.isDayjs = S, w.unix = function(e) {
			return w(1e3 * e);
		}, w.en = b[y], w.Ls = b, w.p = {}, w;
	}));
})), z = /* @__PURE__ */ oe(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_customParseFormat = r();
	})(n, (function() {
		var e = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		}, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, a = /\d*[^-_:/,()\s\d]+/, o = {}, s = function(e) {
			return (e = +e) + (e > 68 ? 1900 : 2e3);
		}, c = function(e) {
			return function(t) {
				this[e] = +t;
			};
		}, l = [/[+-]\d\d:?(\d\d)?|Z/, function(e) {
			(this.zone ||= {}).offset = function(e) {
				if (!e || e === "Z") return 0;
				var t = e.match(/([+-]|\d\d)/g), n = 60 * t[1] + (+t[2] || 0);
				return n === 0 ? 0 : t[0] === "+" ? -n : n;
			}(e);
		}], u = function(e) {
			var t = o[e];
			return t && (t.indexOf ? t : t.s.concat(t.f));
		}, d = function(e, t) {
			var n, r = o.meridiem;
			if (r) {
				for (var i = 1; i <= 24; i += 1) if (e.indexOf(r(i, 0, t)) > -1) {
					n = i > 12;
					break;
				}
			} else n = e === (t ? "pm" : "PM");
			return n;
		}, f = {
			A: [a, function(e) {
				this.afternoon = d(e, !1);
			}],
			a: [a, function(e) {
				this.afternoon = d(e, !0);
			}],
			Q: [n, function(e) {
				this.month = 3 * (e - 1) + 1;
			}],
			S: [n, function(e) {
				this.milliseconds = 100 * e;
			}],
			SS: [r, function(e) {
				this.milliseconds = 10 * e;
			}],
			SSS: [/\d{3}/, function(e) {
				this.milliseconds = +e;
			}],
			s: [i, c("seconds")],
			ss: [i, c("seconds")],
			m: [i, c("minutes")],
			mm: [i, c("minutes")],
			H: [i, c("hours")],
			h: [i, c("hours")],
			HH: [i, c("hours")],
			hh: [i, c("hours")],
			D: [i, c("day")],
			DD: [r, c("day")],
			Do: [a, function(e) {
				var t = o.ordinal, n = e.match(/\d+/);
				if (this.day = n[0], t) for (var r = 1; r <= 31; r += 1) t(r).replace(/\[|\]/g, "") === e && (this.day = r);
			}],
			w: [i, c("week")],
			ww: [r, c("week")],
			M: [i, c("month")],
			MM: [r, c("month")],
			MMM: [a, function(e) {
				var t = u("months"), n = (u("monthsShort") || t.map((function(e) {
					return e.slice(0, 3);
				}))).indexOf(e) + 1;
				if (n < 1) throw Error();
				this.month = n % 12 || n;
			}],
			MMMM: [a, function(e) {
				var t = u("months").indexOf(e) + 1;
				if (t < 1) throw Error();
				this.month = t % 12 || t;
			}],
			Y: [/[+-]?\d+/, c("year")],
			YY: [r, function(e) {
				this.year = s(e);
			}],
			YYYY: [/\d{4}/, c("year")],
			Z: l,
			ZZ: l
		};
		function p(n) {
			for (var r = n, i = o && o.formats, a = (n = r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, n, r) {
				var a = r && r.toUpperCase();
				return n || i[r] || e[r] || i[a].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e, t, n) {
					return t || n.slice(1);
				}));
			}))).match(t), s = a.length, c = 0; c < s; c += 1) {
				var l = a[c], u = f[l], d = u && u[0], p = u && u[1];
				a[c] = p ? {
					regex: d,
					parser: p
				} : l.replace(/^\[|\]$/g, "");
			}
			return function(e) {
				for (var t = {}, n = 0, r = 0; n < s; n += 1) {
					var i = a[n];
					if (typeof i == "string") r += i.length;
					else {
						var o = i.regex, c = i.parser, l = e.slice(r), u = o.exec(l)[0];
						c.call(t, u), e = e.replace(u, "");
					}
				}
				return function(e) {
					var t = e.afternoon;
					if (t !== void 0) {
						var n = e.hours;
						t ? n < 12 && (e.hours += 12) : n === 12 && (e.hours = 0), delete e.afternoon;
					}
				}(t), t;
			};
		}
		return function(e, t, n) {
			n.p.customParseFormat = !0, e && e.parseTwoDigitYear && (s = e.parseTwoDigitYear);
			var r = t.prototype, i = r.parse;
			r.parse = function(e) {
				var t = e.date, r = e.utc, a = e.args;
				this.$u = r;
				var s = a[1];
				if (typeof s == "string") {
					var c = !0 === a[2], l = !0 === a[3], u = c || l, d = a[2];
					l && (d = a[2]), o = this.$locale(), !c && d && (o = n.Ls[d]), this.$d = function(e, t, n, r) {
						try {
							if (["x", "X"].indexOf(t) > -1) return /* @__PURE__ */ new Date((t === "X" ? 1e3 : 1) * e);
							var i = p(t)(e), a = i.year, o = i.month, s = i.day, c = i.hours, l = i.minutes, u = i.seconds, d = i.milliseconds, f = i.zone, m = i.week, h = /* @__PURE__ */ new Date(), g = s || (a || o ? 1 : h.getDate()), _ = a || h.getFullYear(), v = 0;
							a && !o || (v = o > 0 ? o - 1 : h.getMonth());
							var y, b = c || 0, x = l || 0, S = u || 0, C = d || 0;
							return f ? new Date(Date.UTC(_, v, g, b, x, S, C + 60 * f.offset * 1e3)) : n ? new Date(Date.UTC(_, v, g, b, x, S, C)) : (y = new Date(_, v, g, b, x, S, C), m && (y = r(y).week(m).toDate()), y);
						} catch {
							return /* @__PURE__ */ new Date("");
						}
					}(t, s, r, n), this.init(), d && !0 !== d && (this.$L = this.locale(d).$L), u && t != this.format(s) && (this.$d = /* @__PURE__ */ new Date("")), o = {};
				} else if (s instanceof Array) for (var f = s.length, m = 1; m <= f; m += 1) {
					a[1] = s[m - 1];
					var h = n.apply(this, a);
					if (h.isValid()) {
						this.$d = h.$d, this.$L = h.$L, this.init();
						break;
					}
					m === f && (this.$d = /* @__PURE__ */ new Date(""));
				}
				else i.call(this, e);
			};
		};
	}));
})), rt = /* @__PURE__ */ oe(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_utc = r();
	})(n, (function() {
		var e = "minute", t = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
		return function(r, i, a) {
			var o = i.prototype;
			a.utc = function(e) {
				return new i({
					date: e,
					utc: !0,
					args: arguments
				});
			}, o.utc = function(t) {
				var n = a(this.toDate(), {
					locale: this.$L,
					utc: !0
				});
				return t ? n.add(this.utcOffset(), e) : n;
			}, o.local = function() {
				return a(this.toDate(), {
					locale: this.$L,
					utc: !1
				});
			};
			var s = o.parse;
			o.parse = function(e) {
				e.utc && (this.$u = !0), this.$utils().u(e.$offset) || (this.$offset = e.$offset), s.call(this, e);
			};
			var c = o.init;
			o.init = function() {
				if (this.$u) {
					var e = this.$d;
					this.$y = e.getUTCFullYear(), this.$M = e.getUTCMonth(), this.$D = e.getUTCDate(), this.$W = e.getUTCDay(), this.$H = e.getUTCHours(), this.$m = e.getUTCMinutes(), this.$s = e.getUTCSeconds(), this.$ms = e.getUTCMilliseconds();
				} else c.call(this);
			};
			var l = o.utcOffset;
			o.utcOffset = function(r, i) {
				var a = this.$utils().u;
				if (a(r)) return this.$u ? 0 : a(this.$offset) ? l.call(this) : this.$offset;
				if (typeof r == "string" && (r = function(e) {
					e === void 0 && (e = "");
					var r = e.match(t);
					if (!r) return null;
					var i = ("" + r[0]).match(n) || [
						"-",
						0,
						0
					], a = i[0], o = 60 * i[1] + +i[2];
					return o === 0 ? 0 : a === "+" ? o : -o;
				}(r), r === null)) return this;
				var o = Math.abs(r) <= 16 ? 60 * r : r;
				if (o === 0) return this.utc(i);
				var s = this.clone();
				if (i) return s.$offset = o, s.$u = !1, s;
				var c = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
				return (s = this.local().add(o + c, e)).$offset = o, s.$x.$localOffset = c, s;
			};
			var u = o.format;
			o.format = function(e) {
				var t = e || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
				return u.call(this, t);
			}, o.valueOf = function() {
				var e = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
				return this.$d.valueOf() - 6e4 * e;
			}, o.isUTC = function() {
				return !!this.$u;
			}, o.toISOString = function() {
				return this.toDate().toISOString();
			}, o.toString = function() {
				return this.toDate().toUTCString();
			};
			var d = o.toDate;
			o.toDate = function(e) {
				return e === "s" && this.$offset ? a(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this);
			};
			var f = o.diff;
			o.diff = function(e, t, n) {
				if (e && this.$u === e.$u) return f.call(this, e, t, n);
				var r = this.local(), i = a(e).local();
				return f.call(r, i, t, n);
			};
		};
	}));
})), it = /* @__PURE__ */ ce(nt(), 1), at = /* @__PURE__ */ ce(z(), 1), ot = /* @__PURE__ */ ce(rt(), 1);
function st(e, t) {
	typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
var ct = {};
function lt(e) {
	ct[e] || (ct[e] = !0, st(e));
}
var ut = typeof window < "u", dt, ft;
if (process.env.NODE_ENV !== "production") {
	let e = ut && window.performance;
	e && e.mark && e.measure && e.clearMarks && e.clearMeasures && (dt = (t) => {
		e.mark(t);
	}, ft = (t, n, r) => {
		e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
	});
}
var pt = /\{([0-9a-zA-Z]+)\}/g;
function mt(e, ...t) {
	return t.length === 1 && K(t[0]) && (t = t[0]), t && t.hasOwnProperty || (t = {}), e.replace(pt, (e, n) => t.hasOwnProperty(n) ? t[n] : "");
}
var ht = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), gt = (e, t, n) => _t({
	l: e,
	k: t,
	s: n
}), _t = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), B = (e) => typeof e == "number" && isFinite(e), vt = (e) => Lt(e) === "[object Date]", yt = (e) => Lt(e) === "[object RegExp]", bt = (e) => q(e) && Object.keys(e).length === 0, xt = Object.assign, St = Object.create, V = (e = null) => St(e), Ct, wt = () => Ct ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : V();
function Tt(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Et(e) {
	return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var Dt = /^\s*javascript\s*(?::|&#0*58;?|&#x0*3a;?|&colon;?)/i, Ot = /^(?:href|src|action|formaction)$/i;
function kt(e) {
	return Dt.test(e);
}
function At(e) {
	let t = /url\s*\(/gi, n = "", r = 0, i;
	for (; (i = t.exec(e)) !== null;) {
		let a = i.index, o = t.lastIndex - 1, s = o + 1, c = 1, l = null;
		for (; s < e.length; s++) {
			let t = e[s];
			if (l) t === l && (l = null);
			else if (t === "\"" || t === "'") l = t;
			else if (t === "(") c++;
			else if (t === ")" && (c--, c === 0)) break;
		}
		if (c !== 0) break;
		let u = e.slice(o + 1, s).trim(), d = u.startsWith("\"") && u.endsWith("\"") || u.startsWith("'") && u.endsWith("'") ? u.slice(1, -1).trim() : u;
		n += e.slice(r, a), n += kt(d) ? "url(about:blank)" : e.slice(a, s + 1), r = s + 1;
	}
	return n + e.slice(r);
}
function jt(e, t) {
	return Ot.test(e) && kt(t) ? "about:blank" : Et(e.toLowerCase() === "style" ? At(t) : t);
}
function Mt(e) {
	return e = e.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (e, t, n) => `${t}="${jt(t, n)}"`), e = e.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (e, t, n) => `${t}='${jt(t, n)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (process.env.NODE_ENV !== "production" && st("Potentially dangerous event handlers detected in translation. Consider removing onclick, onerror, etc. from your translation messages."), e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), e = e.replace(/(\s+(?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi, (e, t, n) => kt(n) ? `${t}about:blank` : e), e;
}
var Nt = Object.prototype.hasOwnProperty;
function Pt(e, t) {
	return Nt.call(e, t);
}
var H = Array.isArray, U = (e) => typeof e == "function", W = (e) => typeof e == "string", G = (e) => typeof e == "boolean", K = (e) => typeof e == "object" && !!e, Ft = (e) => K(e) && U(e.then) && U(e.catch), It = Object.prototype.toString, Lt = (e) => It.call(e), q = (e) => Lt(e) === "[object Object]", Rt = (e) => e == null ? "" : H(e) || q(e) && e.toString === It ? JSON.stringify(e, null, 2) : String(e);
function zt(e, t = "") {
	return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, "");
}
var Bt = 2;
function Vt(e, t = 0, n = e.length) {
	let r = e.split(/\r?\n/), i = 0, a = [];
	for (let e = 0; e < r.length; e++) if (i += r[e].length + 1, i >= t) {
		for (let o = e - Bt; o <= e + Bt || n > i; o++) {
			if (o < 0 || o >= r.length) continue;
			let s = o + 1;
			a.push(`${s}${" ".repeat(3 - String(s).length)}|  ${r[o]}`);
			let c = r[o].length;
			if (o === e) {
				let e = t - (i - c) + 1, r = Math.max(1, n > i ? c - e : n - t);
				a.push("   |  " + " ".repeat(e) + "^".repeat(r));
			} else if (o > e) {
				if (n > i) {
					let e = Math.max(Math.min(n - i, c), 1);
					a.push("   |  " + "^".repeat(e));
				}
				i += c + 1;
			}
		}
		break;
	}
	return a.join("\n");
}
function Ht() {
	let e = /* @__PURE__ */ new Map();
	return {
		events: e,
		on(t, n) {
			let r = e.get(t);
			r && r.push(n) || e.set(t, [n]);
		},
		off(t, n) {
			let r = e.get(t);
			r && r.splice(r.indexOf(n) >>> 0, 1);
		},
		emit(t, n) {
			(e.get(t) || []).slice().map((e) => e(n)), (e.get("*") || []).slice().map((e) => e(t, n));
		}
	};
}
var Ut = (e) => !K(e) || H(e);
function Wt(e, t) {
	if (Ut(e) || Ut(t)) throw Error("Invalid value");
	let n = [{
		src: e,
		des: t
	}];
	for (; n.length;) {
		let { src: e, des: t } = n.pop();
		Object.keys(e).forEach((r) => {
			r !== "__proto__" && (K(e[r]) && !K(t[r]) && (t[r] = Array.isArray(e[r]) ? [] : V()), Ut(t[r]) || Ut(e[r]) ? t[r] = e[r] : n.push({
				src: e[r],
				des: t[r]
			}));
		});
	}
}
// node_modules/.pnpm/@intlify+message-compiler@11.4.6/node_modules/@intlify/message-compiler/dist/message-compiler.mjs
function Gt(e, t, n) {
	return {
		line: e,
		column: t,
		offset: n
	};
}
function Kt(e, t, n) {
	let r = {
		start: e,
		end: t
	};
	return n != null && (r.source = n), r;
}
var J = {
	EXPECTED_TOKEN: 1,
	INVALID_TOKEN_IN_PLACEHOLDER: 2,
	UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
	UNKNOWN_ESCAPE_SEQUENCE: 4,
	INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
	UNBALANCED_CLOSING_BRACE: 6,
	UNTERMINATED_CLOSING_BRACE: 7,
	EMPTY_PLACEHOLDER: 8,
	NOT_ALLOW_NEST_PLACEHOLDER: 9,
	INVALID_LINKED_FORMAT: 10,
	MUST_HAVE_MESSAGES_IN_PLURAL: 11,
	UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
	UNEXPECTED_EMPTY_LINKED_KEY: 13,
	UNEXPECTED_LEXICAL_ANALYSIS: 14,
	UNHANDLED_CODEGEN_NODE_TYPE: 15,
	UNHANDLED_MINIFIER_NODE_TYPE: 16
}, qt = {
	[J.EXPECTED_TOKEN]: "Expected token: '{0}'",
	[J.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
	[J.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
	[J.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
	[J.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
	[J.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
	[J.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
	[J.EMPTY_PLACEHOLDER]: "Empty placeholder",
	[J.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
	[J.INVALID_LINKED_FORMAT]: "Invalid linked format",
	[J.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
	[J.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
	[J.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
	[J.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
	[J.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
	[J.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Jt(e, t, n = {}) {
	let { domain: r, messages: i, args: a } = n, o = process.env.NODE_ENV === "production" ? e : mt((i || qt)[e] || "", ...a || []), s = SyntaxError(String(o));
	return s.code = e, t && (s.location = t), s.domain = r, s;
}
function Yt(e) {
	throw e;
}
var Xt = /<\/?[\w\s="/.':;#-\/]+>/, Zt = (e) => Xt.test(e), Qt = " ", $t = "\r", en = "\n", tn = "\u2028", nn = "\u2029";
function rn(e) {
	let t = e, n = 0, r = 1, i = 1, a = 0, o = (e) => t[e] === $t && t[e + 1] === en, s = (e) => t[e] === en, c = (e) => t[e] === nn, l = (e) => t[e] === tn, u = (e) => o(e) || s(e) || c(e) || l(e), d = () => n, f = () => r, p = () => i, m = () => a, h = (e) => o(e) || c(e) || l(e) ? en : t[e], g = () => h(n), _ = () => h(n + a);
	function v() {
		return a = 0, u(n) && (r++, i = 0), o(n) && n++, n++, i++, t[n];
	}
	function y() {
		return o(n + a) && a++, a++, t[n + a];
	}
	function b() {
		n = 0, r = 1, i = 1, a = 0;
	}
	function x(e = 0) {
		a = e;
	}
	function S() {
		let e = n + a;
		for (; e !== n;) v();
		a = 0;
	}
	return {
		index: d,
		line: f,
		column: p,
		peekOffset: m,
		charAt: h,
		currentChar: g,
		currentPeek: _,
		next: v,
		peek: y,
		reset: b,
		resetPeek: x,
		skipToPeek: S
	};
}
var an = void 0, on = "'", sn = "tokenizer";
function cn(e, t = {}) {
	let n = t.location !== !1, r = rn(e), i = () => r.index(), a = () => Gt(r.line(), r.column(), r.index()), o = a(), s = i(), c = {
		currentType: 13,
		offset: s,
		startLoc: o,
		endLoc: o,
		lastType: 13,
		lastOffset: s,
		lastStartLoc: o,
		lastEndLoc: o,
		braceNest: 0,
		inLinked: !1,
		text: ""
	}, l = () => c, { onError: u } = t;
	function d(e, t, r, ...i) {
		let a = l();
		if (t.column += r, t.offset += r, u) {
			let r = Jt(e, n ? Kt(a.startLoc, t) : null, {
				domain: sn,
				args: i
			});
			u(r);
		}
	}
	function f(e, t, r) {
		e.endLoc = a(), e.currentType = t;
		let i = { type: t };
		return n && (i.loc = Kt(e.startLoc, e.endLoc)), r != null && (i.value = r), i;
	}
	let p = (e) => f(e, 13);
	function m(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(J.EXPECTED_TOKEN, a(), 0, t), "");
	}
	function h(e) {
		let t = "";
		for (; e.currentPeek() === Qt || e.currentPeek() === en;) t += e.currentPeek(), e.peek();
		return t;
	}
	function g(e) {
		let t = h(e);
		return e.skipToPeek(), t;
	}
	function _(e) {
		if (e === an) return !1;
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t === 95;
	}
	function v(e) {
		if (e === an) return !1;
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function y(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = _(e.currentPeek());
		return e.resetPeek(), r;
	}
	function b(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = v(e.currentPeek() === "-" ? e.peek() : e.currentPeek());
		return e.resetPeek(), r;
	}
	function x(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = e.currentPeek() === on;
		return e.resetPeek(), r;
	}
	function S(e, t) {
		let { currentType: n } = t;
		if (n !== 7) return !1;
		h(e);
		let r = e.currentPeek() === ".";
		return e.resetPeek(), r;
	}
	function C(e, t) {
		let { currentType: n } = t;
		if (n !== 8) return !1;
		h(e);
		let r = _(e.currentPeek());
		return e.resetPeek(), r;
	}
	function w(e, t) {
		let { currentType: n } = t;
		if (n !== 7 && n !== 11) return !1;
		h(e);
		let r = e.currentPeek() === ":";
		return e.resetPeek(), r;
	}
	function T(e, t) {
		let { currentType: n } = t;
		if (n !== 9) return !1;
		let r = () => {
			let t = e.currentPeek();
			return t === "{" ? _(e.peek()) : t === "@" || t === "|" || t === ":" || t === "." || t === Qt || !t ? !1 : t === en ? (e.peek(), r()) : E(e, !1);
		}, i = r();
		return e.resetPeek(), i;
	}
	function ee(e) {
		h(e);
		let t = e.currentPeek() === "|";
		return e.resetPeek(), t;
	}
	function E(e, t = !0) {
		let n = (t = !1, r = "") => {
			let i = e.currentPeek();
			return i === "{" || i === "@" || !i ? t : i === "|" ? r !== Qt && r !== en : i === Qt ? (e.peek(), n(!0, Qt)) : i !== en || (e.peek(), n(!0, en));
		}, r = n();
		return t && e.resetPeek(), r;
	}
	function D(e, t) {
		let n = e.currentChar();
		if (n !== an) return t(n) ? (e.next(), n) : null;
	}
	function O(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36;
	}
	function k(e) {
		return D(e, O);
	}
	function A(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36 || t === 45;
	}
	function j(e) {
		return D(e, A);
	}
	function M(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function N(e) {
		return D(e, M);
	}
	function P(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
	}
	function te(e) {
		return D(e, P);
	}
	function ne(e) {
		let t = "", n = "";
		for (; t = N(e);) n += t;
		return n;
	}
	function F(e) {
		let t = "";
		for (;;) {
			let n = e.currentChar();
			if (n === "\\") {
				let r = e.peek();
				r === "{" || r === "}" || r === "@" || r === "|" || r === "\\" ? (t += n + r, e.next(), e.next()) : (e.resetPeek(), t += n, e.next());
			} else if (n === "{" || n === "}" || n === "@" || n === "|" || !n) break;
			else if (n === Qt || n === en) {
				if (E(e)) t += n, e.next();
				else if (ee(e)) break;
				else t += n, e.next();
			} else t += n, e.next();
		}
		return t;
	}
	function I(e) {
		g(e);
		let t = "", n = "";
		for (; t = j(e);) n += t;
		let r = e.currentChar();
		if (r && r !== "}" && r !== an && r !== Qt && r !== en && r !== "　") {
			let t = ce(e);
			return d(J.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n + t), n + t;
		}
		return e.currentChar() === an && d(J.UNTERMINATED_CLOSING_BRACE, a(), 0), n;
	}
	function re(e) {
		g(e);
		let t = "";
		return e.currentChar() === "-" ? (e.next(), t += `-${ne(e)}`) : t += ne(e), e.currentChar() === an && d(J.UNTERMINATED_CLOSING_BRACE, a(), 0), t;
	}
	function ie(e) {
		return e !== on && e !== en;
	}
	function ae(e) {
		g(e), m(e, "'");
		let t = "", n = "";
		for (; t = D(e, ie);) n += t === "\\" ? oe(e) : t;
		let r = e.currentChar();
		return r === en || r === an ? (d(J.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), r === en && (e.next(), m(e, "'")), n) : (m(e, "'"), n);
	}
	function oe(e) {
		let t = e.currentChar();
		switch (t) {
			case "\\":
			case "'": return e.next(), `\\${t}`;
			case "u": return L(e, t, 4);
			case "U": return L(e, t, 6);
			default: return d(J.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), "";
		}
	}
	function L(e, t, n) {
		m(e, t);
		let r = "";
		for (let i = 0; i < n; i++) {
			let n = te(e);
			if (!n) {
				d(J.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
				break;
			}
			r += n;
		}
		return `\\${t}${r}`;
	}
	function se(e) {
		return e !== "{" && e !== "}" && e !== Qt && e !== en;
	}
	function ce(e) {
		g(e);
		let t = "", n = "";
		for (; t = D(e, se);) n += t;
		return n;
	}
	function le(e) {
		let t = "", n = "";
		for (; t = k(e);) n += t;
		return n;
	}
	function ue(e) {
		let t = (n) => {
			let r = e.currentChar();
			return r === "{" || r === "@" || r === "|" || r === "(" || r === ")" || !r || r === Qt ? n : (n += r, e.next(), t(n));
		};
		return t("");
	}
	function de(e) {
		g(e);
		let t = m(e, "|");
		return g(e), t;
	}
	function fe(e, t) {
		let n = null;
		switch (e.currentChar()) {
			case "{": return t.braceNest >= 1 && d(J.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = f(t, 2, "{"), g(e), t.braceNest++, n;
			case "}": return t.braceNest > 0 && t.currentType === 2 && d(J.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = f(t, 3, "}"), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && t.braceNest === 0 && (t.inLinked = !1), n;
			case "@": return t.braceNest > 0 && d(J.UNTERMINATED_CLOSING_BRACE, a(), 0), n = pe(e, t) || p(t), t.braceNest = 0, n;
			default: {
				let r = !0, i = !0, o = !0;
				if (ee(e)) return t.braceNest > 0 && d(J.UNTERMINATED_CLOSING_BRACE, a(), 0), n = f(t, 1, de(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (t.braceNest > 0 && (t.currentType === 4 || t.currentType === 5 || t.currentType === 6)) return d(J.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, me(e, t);
				if (r = y(e, t)) return n = f(t, 4, I(e)), g(e), n;
				if (i = b(e, t)) return n = f(t, 5, re(e)), g(e), n;
				if (o = x(e, t)) return n = f(t, 6, ae(e)), g(e), n;
				if (!r && !i && !o) return n = f(t, 12, ce(e)), d(J.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), g(e), n;
				break;
			}
		}
		return n;
	}
	function pe(e, t) {
		let { currentType: n } = t, r = null, i = e.currentChar();
		switch (n !== 7 && n !== 8 && n !== 11 && n !== 9 || i !== en && i !== Qt || d(J.INVALID_LINKED_FORMAT, a(), 0), i) {
			case "@": return e.next(), r = f(t, 7, "@"), t.inLinked = !0, r;
			case ".": return g(e), e.next(), f(t, 8, ".");
			case ":": return g(e), e.next(), f(t, 9, ":");
			default: return ee(e) ? (r = f(t, 1, de(e)), t.braceNest = 0, t.inLinked = !1, r) : S(e, t) || w(e, t) ? (g(e), pe(e, t)) : C(e, t) ? (g(e), f(t, 11, le(e))) : T(e, t) ? (g(e), i === "{" ? fe(e, t) || r : f(t, 10, ue(e))) : (n === 7 && d(J.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = !1, me(e, t));
		}
	}
	function me(e, t) {
		let n = { type: 13 };
		if (t.braceNest > 0) return fe(e, t) || p(t);
		if (t.inLinked) return pe(e, t) || p(t);
		switch (e.currentChar()) {
			case "{": return fe(e, t) || p(t);
			case "}": return d(J.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), f(t, 3, "}");
			case "@": return pe(e, t) || p(t);
			default:
				if (ee(e)) return n = f(t, 1, de(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (E(e)) return f(t, 0, F(e));
		}
		return n;
	}
	function he() {
		let { currentType: e, offset: t, startLoc: n, endLoc: o } = c;
		return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = o, c.offset = i(), c.startLoc = a(), r.currentChar() === an ? f(c, 13) : me(r, c);
	}
	return {
		nextToken: he,
		currentOffset: i,
		currentPosition: a,
		context: l
	};
}
var ln = "parser", un = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g, dn = /\\([\\@{}|])/g;
function fn(e, t) {
	return t;
}
function pn(e, t, n) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\'": return "'";
		default: {
			let e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�";
		}
	}
}
function mn(e = {}) {
	let t = e.location !== !1, { onError: n } = e;
	function r(e, r, i, a, ...o) {
		let s = e.currentPosition();
		if (s.offset += a, s.column += a, n) {
			let e = Jt(r, t ? Kt(i, s) : null, {
				domain: ln,
				args: o
			});
			n(e);
		}
	}
	function i(e, n, r) {
		let i = { type: e };
		return t && (i.start = n, i.end = n, i.loc = {
			start: r,
			end: r
		}), i;
	}
	function a(e, n, r, i) {
		t && (e.end = n, e.loc && (e.loc.end = r));
	}
	function o(e, t) {
		let n = e.context(), r = i(3, n.offset, n.startLoc);
		return r.value = t.replace(dn, fn), a(r, e.currentOffset(), e.currentPosition()), r;
	}
	function s(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(5, n, r);
		return o.index = parseInt(t, 10), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function c(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(4, n, r);
		return o.key = t, e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function l(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(9, n, r);
		return o.value = t.replace(un, pn), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function u(e) {
		let t = e.nextToken(), n = e.context(), { lastOffset: o, lastStartLoc: s } = n, c = i(8, o, s);
		return t.type === 11 ? (t.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, hn(t)), c.value = t.value || "", a(c, e.currentOffset(), e.currentPosition()), { node: c }) : (r(e, J.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), c.value = "", a(c, o, s), {
			nextConsumeToken: t,
			node: c
		});
	}
	function d(e, t) {
		let n = e.context(), r = i(7, n.offset, n.startLoc);
		return r.value = t, a(r, e.currentOffset(), e.currentPosition()), r;
	}
	function f(e) {
		let t = e.context(), n = i(6, t.offset, t.startLoc), o = e.nextToken();
		if (o.type === 8) {
			let t = u(e);
			n.modifier = t.node, o = t.nextConsumeToken || e.nextToken();
		}
		switch (o.type !== 9 && r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(o)), o = e.nextToken(), o.type === 2 && (o = e.nextToken()), o.type) {
			case 10:
				o.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(o)), n.key = d(e, o.value || "");
				break;
			case 4:
				o.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(o)), n.key = c(e, o.value || "");
				break;
			case 5:
				o.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(o)), n.key = s(e, o.value || "");
				break;
			case 6:
				o.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(o)), n.key = l(e, o.value || "");
				break;
			default: {
				r(e, J.UNEXPECTED_EMPTY_LINKED_KEY, t.lastStartLoc, 0);
				let s = e.context(), c = i(7, s.offset, s.startLoc);
				return c.value = "", a(c, s.offset, s.startLoc), n.key = c, a(n, s.offset, s.startLoc), {
					nextConsumeToken: o,
					node: n
				};
			}
		}
		return a(n, e.currentOffset(), e.currentPosition()), { node: n };
	}
	function p(e) {
		let t = e.context(), n = i(2, t.currentType === 1 ? e.currentOffset() : t.offset, t.currentType === 1 ? t.endLoc : t.startLoc);
		n.items = [];
		let u = null;
		do {
			let i = u || e.nextToken();
			switch (u = null, i.type) {
				case 0:
					i.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(i)), n.items.push(o(e, i.value || ""));
					break;
				case 5:
					i.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(i)), n.items.push(s(e, i.value || ""));
					break;
				case 4:
					i.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(i)), n.items.push(c(e, i.value || ""));
					break;
				case 6:
					i.value ?? r(e, J.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, hn(i)), n.items.push(l(e, i.value || ""));
					break;
				case 7: {
					let t = f(e);
					n.items.push(t.node), u = t.nextConsumeToken || null;
					break;
				}
			}
		} while (t.currentType !== 13 && t.currentType !== 1);
		return a(n, t.currentType === 1 ? t.lastOffset : e.currentOffset(), t.currentType === 1 ? t.lastEndLoc : e.currentPosition()), n;
	}
	function m(e, t, n, o) {
		let s = e.context(), c = o.items.length === 0, l = i(1, t, n);
		l.cases = [], l.cases.push(o);
		do {
			let t = p(e);
			c ||= t.items.length === 0, l.cases.push(t);
		} while (s.currentType !== 13);
		return c && r(e, J.MUST_HAVE_MESSAGES_IN_PLURAL, n, 0), a(l, e.currentOffset(), e.currentPosition()), l;
	}
	function h(e) {
		let t = e.context(), { offset: n, startLoc: r } = t, i = p(e);
		return t.currentType === 13 ? i : m(e, n, r, i);
	}
	function g(n) {
		let o = cn(n, xt({}, e)), s = o.context(), c = i(0, s.offset, s.startLoc);
		return t && c.loc && (c.loc.source = n), c.body = h(o), e.onCacheKey && (c.cacheKey = e.onCacheKey(n)), s.currentType !== 13 && r(o, J.UNEXPECTED_LEXICAL_ANALYSIS, s.lastStartLoc, 0, n[s.offset] || ""), a(c, o.currentOffset(), o.currentPosition()), c;
	}
	return { parse: g };
}
function hn(e) {
	if (e.type === 13) return "EOF";
	let t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function gn(e, t = {}) {
	let n = {
		ast: e,
		helpers: /* @__PURE__ */ new Set()
	};
	return {
		context: () => n,
		helper: (e) => (n.helpers.add(e), e)
	};
}
function _n(e, t) {
	for (let n = 0; n < e.length; n++) vn(e[n], t);
}
function vn(e, t) {
	switch (e.type) {
		case 1:
			_n(e.cases, t), t.helper("plural");
			break;
		case 2:
			_n(e.items, t);
			break;
		case 6:
			vn(e.key, t), t.helper("linked"), t.helper("type");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4: t.helper("interpolate"), t.helper("named");
	}
}
function yn(e, t = {}) {
	let n = gn(e);
	n.helper("normalize"), e.body && vn(e.body, n);
	let r = n.context();
	e.helpers = Array.from(r.helpers);
}
function bn(e) {
	let t = e.body;
	return t.type === 2 ? xn(t) : t.cases.forEach((e) => xn(e)), e;
}
function xn(e) {
	if (e.items.length === 1) {
		let t = e.items[0];
		(t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
	} else {
		let t = [];
		for (let n = 0; n < e.items.length; n++) {
			let r = e.items[n];
			if (r.type !== 3 && r.type !== 9 || r.value == null) break;
			t.push(r.value);
		}
		if (t.length === e.items.length) {
			e.static = zt(t);
			for (let t = 0; t < e.items.length; t++) {
				let n = e.items[t];
				(n.type === 3 || n.type === 9) && delete n.value;
			}
		}
	}
}
var Sn = "minifier";
function Cn(e) {
	switch (e.t = e.type, e.type) {
		case 0: {
			let t = e;
			Cn(t.body), t.b = t.body, delete t.body;
			break;
		}
		case 1: {
			let t = e, n = t.cases;
			for (let e = 0; e < n.length; e++) Cn(n[e]);
			t.c = n, delete t.cases;
			break;
		}
		case 2: {
			let t = e, n = t.items;
			for (let e = 0; e < n.length; e++) Cn(n[e]);
			t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
			break;
		}
		case 3:
		case 9:
		case 8:
		case 7: {
			let t = e;
			t.value && (t.v = t.value, delete t.value);
			break;
		}
		case 6: {
			let t = e;
			Cn(t.key), t.k = t.key, delete t.key, t.modifier && (Cn(t.modifier), t.m = t.modifier, delete t.modifier);
			break;
		}
		case 5: {
			let t = e;
			t.i = t.index, delete t.index;
			break;
		}
		case 4: {
			let t = e;
			t.k = t.key, delete t.key;
			break;
		}
		default: if (process.env.NODE_ENV !== "production") throw Jt(J.UNHANDLED_MINIFIER_NODE_TYPE, null, {
			domain: Sn,
			args: [e.type]
		});
	}
	delete e.type;
}
var wn = "parser";
function Tn(e, t) {
	let { filename: n, breakLineCode: r, needIndent: i } = t, a = t.location !== !1, o = {
		filename: n,
		code: "",
		column: 1,
		line: 1,
		offset: 0,
		map: void 0,
		breakLineCode: r,
		needIndent: i,
		indentLevel: 0
	};
	a && e.loc && (o.source = e.loc.source);
	let s = () => o;
	function c(e, t) {
		o.code += e;
	}
	function l(e, t = !0) {
		let n = t ? r : "";
		c(i ? n + "  ".repeat(e) : n);
	}
	function u(e = !0) {
		let t = ++o.indentLevel;
		e && l(t);
	}
	function d(e = !0) {
		let t = --o.indentLevel;
		e && l(t);
	}
	function f() {
		l(o.indentLevel);
	}
	return {
		context: s,
		push: c,
		indent: u,
		deindent: d,
		newline: f,
		helper: (e) => `_${e}`,
		needIndent: () => o.needIndent
	};
}
function En(e, t) {
	let { helper: n } = e;
	e.push(`${n("linked")}(`), An(e, t.key), t.modifier ? (e.push(", "), An(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Dn(e, t) {
	let { helper: n, needIndent: r } = e;
	e.push(`${n("normalize")}([`), e.indent(r());
	let i = t.items.length;
	for (let n = 0; n < i && (An(e, t.items[n]), n !== i - 1); n++) e.push(", ");
	e.deindent(r()), e.push("])");
}
function On(e, t) {
	let { helper: n, needIndent: r } = e;
	if (t.cases.length > 1) {
		e.push(`${n("plural")}([`), e.indent(r());
		let i = t.cases.length;
		for (let n = 0; n < i && (An(e, t.cases[n]), n !== i - 1); n++) e.push(", ");
		e.deindent(r()), e.push("])");
	}
}
function kn(e, t) {
	t.body ? An(e, t.body) : e.push("null");
}
function An(e, t) {
	let { helper: n } = e;
	switch (t.type) {
		case 0:
			kn(e, t);
			break;
		case 1:
			On(e, t);
			break;
		case 2:
			Dn(e, t);
			break;
		case 6:
			En(e, t);
			break;
		case 8:
			e.push(JSON.stringify(t.value), t);
			break;
		case 7:
			e.push(JSON.stringify(t.value), t);
			break;
		case 5:
			e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
			break;
		case 4:
			e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
			break;
		case 9:
			e.push(JSON.stringify(t.value), t);
			break;
		case 3:
			e.push(JSON.stringify(t.value), t);
			break;
		default: if (process.env.NODE_ENV !== "production") throw Jt(J.UNHANDLED_CODEGEN_NODE_TYPE, null, {
			domain: wn,
			args: [t.type]
		});
	}
}
var jn = (e, t = {}) => {
	let n = W(t.mode) ? t.mode : "normal", r = W(t.filename) ? t.filename : "message.intl";
	t.sourceMap;
	let i = t.breakLineCode == null ? n === "arrow" ? ";" : "\n" : t.breakLineCode, a = t.needIndent ? t.needIndent : n !== "arrow", o = e.helpers || [], s = Tn(e, {
		filename: r,
		breakLineCode: i,
		needIndent: a
	});
	s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(a), o.length > 0 && (s.push(`const { ${zt(o.map((e) => `${e}: _${e}`), ", ")} } = ctx`), s.newline()), s.push("return "), An(s, e), s.deindent(a), s.push("}"), delete e.helpers;
	let { code: c, map: l } = s.context();
	return {
		ast: e,
		code: c,
		map: l ? l.toJSON() : void 0
	};
};
function Mn(e, t = {}) {
	let n = xt({}, t), r = !!n.jit, i = !!n.minify, a = n.optimize == null || n.optimize, o = mn(n).parse(e);
	return r ? (a && bn(o), i && Cn(o), {
		ast: o,
		code: ""
	}) : (yn(o, n), jn(o, n));
}
// node_modules/.pnpm/@intlify+core-base@11.4.6/node_modules/@intlify/core-base/dist/core-base.mjs
function Nn() {
	typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (wt().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (wt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Pn(e) {
	return K(e) && Wn(e) === 0 && (Pt(e, "b") || Pt(e, "body"));
}
var Fn = ["b", "body"];
function In(e) {
	return Zn(e, Fn);
}
var Ln = ["c", "cases"];
function Rn(e) {
	return Zn(e, Ln, []);
}
var zn = ["s", "static"];
function Bn(e) {
	return Zn(e, zn);
}
var Vn = ["i", "items"];
function Hn(e) {
	return Zn(e, Vn, []);
}
var Un = ["t", "type"];
function Wn(e) {
	return Zn(e, Un);
}
var Gn = ["v", "value"];
function Kn(e, t) {
	let n = Zn(e, Gn);
	if (n != null) return n;
	throw $n(t);
}
var qn = ["m", "modifier"];
function Jn(e) {
	return Zn(e, qn);
}
var Yn = ["k", "key"];
function Xn(e) {
	let t = Zn(e, Yn);
	if (t) return t;
	throw $n(6);
}
function Zn(e, t, n) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (Pt(e, r) && e[r] != null) return e[r];
	}
	return n;
}
var Qn = [
	...Fn,
	...Ln,
	...zn,
	...Vn,
	...Yn,
	...qn,
	...Gn,
	...Un
];
function $n(e) {
	return /* @__PURE__ */ Error(`unhandled node type: ${e}`);
}
function er(e) {
	return (t) => tr(t, e);
}
function tr(e, t) {
	let n = In(t);
	if (n == null) throw $n(0);
	if (Wn(n) === 1) {
		let t = Rn(n);
		return e.plural(t.reduce((t, n) => [...t, nr(e, n)], []));
	}
	return nr(e, n);
}
function nr(e, t) {
	let n = Bn(t);
	if (n != null) return e.type === "text" ? n : e.normalize([n]);
	{
		let n = Hn(t).reduce((t, n) => [...t, rr(e, n)], []);
		return e.normalize(n);
	}
}
function rr(e, t) {
	let n = Wn(t);
	switch (n) {
		case 3: return Kn(t, n);
		case 9: return Kn(t, n);
		case 4: {
			let r = t;
			if (Pt(r, "k") && r.k) return e.interpolate(e.named(r.k));
			if (Pt(r, "key") && r.key) return e.interpolate(e.named(r.key));
			throw $n(n);
		}
		case 5: {
			let r = t;
			if (Pt(r, "i") && B(r.i)) return e.interpolate(e.list(r.i));
			if (Pt(r, "index") && B(r.index)) return e.interpolate(e.list(r.index));
			throw $n(n);
		}
		case 6: {
			let n = t, r = Jn(n), i = Xn(n);
			return e.linked(rr(e, i), r ? rr(e, r) : void 0, e.type);
		}
		case 7: return Kn(t, n);
		case 8: return Kn(t, n);
		default: throw Error(`unhandled node on format message part: ${n}`);
	}
}
var ir = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function ar(e, t) {
	t && Zt(e) && st(mt(ir, { source: e }));
}
var or = (e) => e, sr = V();
function cr(e, t = {}) {
	let n = !1, r = t.onError || Yt;
	return t.onError = (e) => {
		n = !0, r(e);
	}, {
		...Mn(e, t),
		detectError: n
	};
}
/* #__NO_SIDE_EFFECTS__ */
function lr(e, t) {
	if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && W(e)) {
		let n = !G(t.warnHtmlMessage) || t.warnHtmlMessage;
		process.env.NODE_ENV !== "production" && ar(e, n);
		let r = (t.onCacheKey || or)(e), i = sr[r];
		if (i) return i;
		let { ast: a, detectError: o } = cr(e, {
			...t,
			location: process.env.NODE_ENV !== "production",
			jit: !0
		}), s = er(a);
		return o ? s : sr[r] = s;
	}
	{
		if (process.env.NODE_ENV !== "production" && !Pn(e)) return st(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), (() => e);
		let n = e.cacheKey;
		return n ? sr[n] || (sr[n] = er(e)) : er(e);
	}
}
var ur = null;
function dr(e) {
	ur = e;
}
function fr(e, t, n) {
	ur && ur.emit("i18n:init", {
		timestamp: Date.now(),
		i18n: e,
		version: t,
		meta: n
	});
}
var pr = /* #__PURE__*/ mr("function:translate");
function mr(e) {
	return (t) => ur && ur.emit(e, t);
}
var hr = {
	INVALID_ARGUMENT: 17,
	INVALID_DATE_ARGUMENT: 18,
	INVALID_ISO_DATE_ARGUMENT: 19,
	NOT_SUPPORT_NON_STRING_MESSAGE: 20,
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
	NOT_SUPPORT_LOCALE_TYPE: 23
};
function gr(e) {
	return Jt(e, null, process.env.NODE_ENV === "production" ? void 0 : { messages: _r });
}
var _r = {
	[hr.INVALID_ARGUMENT]: "Invalid arguments",
	[hr.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
	[hr.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
	[hr.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
	[hr.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
	[hr.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
	[hr.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function vr(e, t) {
	return t.locale == null ? br(e.locale) : br(t.locale);
}
var yr;
function br(e) {
	if (W(e)) return e;
	if (U(e)) {
		if (e.resolvedOnce && yr != null) return yr;
		if (e.constructor.name === "Function") {
			let t = e();
			if (Ft(t)) throw gr(hr.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return yr = t;
		}
		throw gr(hr.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	}
	throw gr(hr.NOT_SUPPORT_LOCALE_TYPE);
}
function xr(e, t, n) {
	return [.../* @__PURE__ */ new Set([n, ...H(t) ? t : K(t) ? Object.keys(t) : W(t) ? [t] : [n]])];
}
function Sr(e, t, n) {
	let r = W(n) ? n : zr, i = e;
	i.__localeChainCache ||= /* @__PURE__ */ new Map();
	let a = i.__localeChainCache.get(r);
	if (!a) {
		a = [];
		let e = [n];
		for (; H(e);) e = Cr(a, e, t);
		let o = H(t) || !q(t) ? t : t.default ? t.default : null;
		e = W(o) ? [o] : o, H(e) && Cr(a, e, !1), i.__localeChainCache.set(r, a);
	}
	return a;
}
function Cr(e, t, n) {
	let r = !0;
	for (let i = 0; i < t.length && G(r); i++) {
		let a = t[i];
		W(a) && (r = wr(e, t[i], n));
	}
	return r;
}
function wr(e, t, n) {
	let r, i = t.split("-");
	do
		r = Tr(e, i.join("-"), n), i.splice(-1, 1);
	while (i.length && r === !0);
	return r;
}
function Tr(e, t, n) {
	let r = !1;
	if (!e.includes(t) && (r = !0, t)) {
		r = t[t.length - 1] !== "!";
		let i = t.replace(/!/g, "");
		e.push(i), (H(n) || q(n)) && n[i] && (r = n[i]);
	}
	return r;
}
var Er = [];
Er[0] = {
	w: [0],
	i: [3, 0],
	"[": [4],
	o: [7]
}, Er[1] = {
	w: [1],
	".": [2],
	"[": [4],
	o: [7]
}, Er[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, Er[3] = {
	i: [3, 0],
	0: [3, 0],
	w: [1, 1],
	".": [2, 1],
	"[": [4, 1],
	o: [7, 1]
}, Er[4] = {
	"'": [5, 0],
	"\"": [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, Er[5] = {
	"'": [4, 0],
	o: 8,
	l: [5, 0]
}, Er[6] = {
	"\"": [4, 0],
	o: 8,
	l: [6, 0]
};
var Dr = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Or(e) {
	return Dr.test(e);
}
function kr(e) {
	let t = e.charCodeAt(0);
	return t === e.charCodeAt(e.length - 1) && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Ar(e) {
	if (e == null) return "o";
	switch (e.charCodeAt(0)) {
		case 91:
		case 93:
		case 46:
		case 34:
		case 39: return e;
		case 95:
		case 36:
		case 45: return "i";
		case 9:
		case 10:
		case 13:
		case 160:
		case 65279:
		case 8232:
		case 8233: return "w";
	}
	return "i";
}
function jr(e) {
	let t = e.trim();
	return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Or(t) ? kr(t) : "*" + t;
}
function Mr(e) {
	let t = [], n = -1, r = 0, i = 0, a, o, s, c, l, u, d, f = [];
	f[0] = () => {
		o === void 0 ? o = s : o += s;
	}, f[1] = () => {
		o !== void 0 && (t.push(o), o = void 0);
	}, f[2] = () => {
		f[0](), i++;
	}, f[3] = () => {
		if (i > 0) i--, r = 4, f[0]();
		else {
			if (i = 0, o === void 0 || (o = jr(o), o === !1)) return !1;
			f[1]();
		}
	};
	function p() {
		let t = e[n + 1];
		if (r === 5 && t === "'" || r === 6 && t === "\"") return n++, s = "\\" + t, f[0](), !0;
	}
	for (; r !== null;) if (n++, a = e[n], !(a === "\\" && p())) {
		if (c = Ar(a), d = Er[r], l = d[c] || d.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (u = f[l[1]], u && (s = a, u() === !1)))) return;
		if (r === 7) return t;
	}
}
var Nr = /* @__PURE__ */ new Map();
function Pr(e, t) {
	return K(e) ? e[t] : null;
}
function Fr(e, t) {
	if (!K(e)) return null;
	let n = Nr.get(t);
	if (n || (n = Mr(t), n && Nr.set(t, n)), !n) return null;
	let r = n.length, i = e, a = 0;
	for (; a < r;) {
		let e = n[a];
		if (Qn.includes(e) && Pn(i) || !K(i) || !Pt(i, e)) return null;
		let t = i[e];
		if (t === void 0 || U(i)) return null;
		i = t, a++;
	}
	return i;
}
var Y = {
	NOT_FOUND_KEY: 1,
	FALLBACK_TO_TRANSLATE: 2,
	CANNOT_FORMAT_NUMBER: 3,
	FALLBACK_TO_NUMBER_FORMAT: 4,
	CANNOT_FORMAT_DATE: 5,
	FALLBACK_TO_DATE_FORMAT: 6,
	EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
	INVALID_NUMBER_ARGUMENT: 8,
	INVALID_DATE_ARGUMENT: 9
}, Ir = {
	[Y.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
	[Y.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
	[Y.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
	[Y.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
	[Y.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
	[Y.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
	[Y.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future.",
	[Y.INVALID_NUMBER_ARGUMENT]: "Invalid argument for number formatting: expected a number but received '{value}'.",
	[Y.INVALID_DATE_ARGUMENT]: "Invalid argument for datetime formatting: expected a Date, number, or ISO string but received '{value}'."
};
function Lr(e, ...t) {
	return mt(Ir[e], ...t);
}
var Rr = "11.4.6", zr = "en-US", Br = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Vr() {
	return {
		upper: (e, t) => t === "text" && W(e) ? e.toUpperCase() : t === "vnode" && K(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
		lower: (e, t) => t === "text" && W(e) ? e.toLowerCase() : t === "vnode" && K(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
		capitalize: (e, t) => t === "text" && W(e) ? Br(e) : t === "vnode" && K(e) && "__v_isVNode" in e ? Br(e.children) : e
	};
}
var Hr;
function Ur(e) {
	Hr = e;
}
var Wr;
function Gr(e) {
	Wr = e;
}
var Kr;
function qr(e) {
	Kr = e;
}
var Jr = null, Yr = /* @__NO_SIDE_EFFECTS__ */ () => Jr, Xr = null, Zr = (e) => {
	Xr = e;
}, Qr = () => Xr, $r = 0;
function ei(e = {}) {
	let t = U(e.onWarn) ? e.onWarn : st, n = W(e.version) ? e.version : Rr, r = W(e.locale) || U(e.locale) ? e.locale : zr, i = U(r) ? zr : r, a = H(e.fallbackLocale) || q(e.fallbackLocale) || W(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : i, o = q(e.messages) ? e.messages : ti(i), s = q(e.datetimeFormats) ? e.datetimeFormats : ti(i), c = q(e.numberFormats) ? e.numberFormats : ti(i), l = xt(V(), e.modifiers, Vr()), u = e.pluralRules || V(), d = U(e.missing) ? e.missing : null, f = G(e.missingWarn) || yt(e.missingWarn) ? e.missingWarn : !0, p = G(e.fallbackWarn) || yt(e.fallbackWarn) ? e.fallbackWarn : !0, m = !!e.fallbackFormat, h = !!e.unresolving, g = U(e.postTranslation) ? e.postTranslation : null, _ = q(e.processor) ? e.processor : null, v = !G(e.warnHtmlMessage) || e.warnHtmlMessage, y = !!e.escapeParameter, b = U(e.messageCompiler) ? e.messageCompiler : Hr;
	process.env.NODE_ENV !== "production" && U(e.messageCompiler) && lt(Lr(Y.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
	let x = U(e.messageResolver) ? e.messageResolver : Wr || Pr, S = U(e.localeFallbacker) ? e.localeFallbacker : Kr || xr, C = K(e.fallbackContext) ? e.fallbackContext : void 0, w = e, T = K(w.__datetimeFormatters) ? w.__datetimeFormatters : /* @__PURE__ */ new Map(), ee = K(w.__numberFormatters) ? w.__numberFormatters : /* @__PURE__ */ new Map(), E = K(w.__meta) ? w.__meta : {};
	$r++;
	let D = {
		version: n,
		cid: $r,
		locale: r,
		fallbackLocale: a,
		messages: o,
		modifiers: l,
		pluralRules: u,
		missing: d,
		missingWarn: f,
		fallbackWarn: p,
		fallbackFormat: m,
		unresolving: h,
		postTranslation: g,
		processor: _,
		warnHtmlMessage: v,
		escapeParameter: y,
		messageCompiler: b,
		messageResolver: x,
		localeFallbacker: S,
		fallbackContext: C,
		onWarn: t,
		__meta: E
	};
	return D.datetimeFormats = s, D.numberFormats = c, D.__datetimeFormatters = T, D.__numberFormatters = ee, process.env.NODE_ENV !== "production" && (D.__v_emitter = w.__v_emitter == null ? void 0 : w.__v_emitter), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && fr(D, n, E), D;
}
var ti = (e) => ({ [e]: V() });
function ni(e, t) {
	return e instanceof RegExp ? e.test(t) : e;
}
function ri(e, t) {
	return e instanceof RegExp ? e.test(t) : e;
}
function ii(e, t, n, r, i) {
	let { missing: a, onWarn: o } = e;
	if (process.env.NODE_ENV !== "production") {
		let r = e.__v_emitter;
		r && r.emit("missing", {
			locale: n,
			key: t,
			type: i,
			groupId: `${i}:${t}`
		});
	}
	if (a !== null) {
		let r = a(e, n, t, i);
		return W(r) ? r : t;
	}
	return process.env.NODE_ENV !== "production" && ri(r, t) && o(Lr(Y.NOT_FOUND_KEY, {
		key: t,
		locale: n
	})), t;
}
function ai(e, t, n) {
	let r = e;
	r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function oi(e, t) {
	return e !== t && e.split("-")[0] === t.split("-")[0];
}
function si(e, t) {
	let n = t.indexOf(e);
	if (n === -1) return !1;
	for (let r = n + 1; r < t.length; r++) if (oi(e, t[r])) return !0;
	return !1;
}
var ci = typeof Intl < "u", li = {
	dateTimeFormat: ci && Intl.DateTimeFormat !== void 0,
	numberFormat: ci && Intl.NumberFormat !== void 0
};
function ui(e, ...t) {
	let { datetimeFormats: n, unresolving: r, fallbackLocale: i, onWarn: a, localeFallbacker: o } = e, { __datetimeFormatters: s } = e;
	if (process.env.NODE_ENV !== "production" && !li.dateTimeFormat) return a(Lr(Y.CANNOT_FORMAT_DATE)), "";
	if (!W(t[0]) && !vt(t[0]) && !B(t[0])) return process.env.NODE_ENV !== "production" && a(Lr(Y.INVALID_DATE_ARGUMENT, { value: String(t[0]) })), "";
	let [c, l, u, d] = fi(...t), f = G(u.missingWarn) ? u.missingWarn : e.missingWarn, p = G(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = !!u.part, h = vr(e, u), g = o(e, i, h);
	if (!W(c) || c === "") {
		let e = new Intl.DateTimeFormat(h.replace(/!/g, ""), d);
		return m ? e.formatToParts(l) : e.format(l);
	}
	let _ = {}, v, y = null, b = h, x = null, S = "datetime format";
	for (let t = 0; t < g.length; t++) {
		if (v = x = g[t], process.env.NODE_ENV !== "production" && h !== v && ni(p, c) && a(Lr(Y.FALLBACK_TO_DATE_FORMAT, {
			key: c,
			target: v
		})), process.env.NODE_ENV !== "production" && h !== v) {
			let t = e.__v_emitter;
			t && t.emit("fallback", {
				type: S,
				key: c,
				from: b,
				to: x,
				groupId: `${S}:${c}`
			});
		}
		if (_ = n[v] || {}, y = _[c], q(y)) break;
		ii(e, c, v, f, S), b = x;
	}
	if (!q(y) || !W(v)) return r ? -1 : c;
	let C = `${v}__${c}`;
	bt(d) || (C = `${C}__${JSON.stringify(d)}`);
	let w = s.get(C);
	return w || (w = new Intl.DateTimeFormat(v, xt({}, y, d)), s.set(C, w)), m ? w.formatToParts(l) : w.format(l);
}
var di = [
	"localeMatcher",
	"weekday",
	"era",
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"timeZoneName",
	"formatMatcher",
	"hour12",
	"timeZone",
	"dateStyle",
	"timeStyle",
	"calendar",
	"dayPeriod",
	"numberingSystem",
	"hourCycle",
	"fractionalSecondDigits"
];
function fi(...e) {
	let [t, n, r, i] = e, a = V(), o = V(), s;
	if (W(t)) {
		let e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!e) throw gr(hr.INVALID_ISO_DATE_ARGUMENT);
		let n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
		s = new Date(n);
		try {
			s.toISOString();
		} catch {
			throw gr(hr.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (vt(t)) {
		if (isNaN(t.getTime())) throw gr(hr.INVALID_DATE_ARGUMENT);
		s = t;
	} else if (B(t)) s = t;
	else throw gr(hr.INVALID_ARGUMENT);
	return W(n) ? a.key = n : q(n) && Object.keys(n).forEach((e) => {
		di.includes(e) ? o[e] = n[e] : a[e] = n[e];
	}), W(r) ? a.locale = r : q(r) && (o = r), q(i) && (o = i), [
		a.key || "",
		s,
		a,
		o
	];
}
function pi(e, t, n) {
	let r = e;
	for (let e in n) {
		let n = `${t}__${e}`;
		r.__datetimeFormatters.has(n) && r.__datetimeFormatters.delete(n);
	}
}
function mi(e, ...t) {
	let { numberFormats: n, unresolving: r, fallbackLocale: i, onWarn: a, localeFallbacker: o } = e, { __numberFormatters: s } = e;
	if (process.env.NODE_ENV !== "production" && !li.numberFormat) return a(Lr(Y.CANNOT_FORMAT_NUMBER)), "";
	if (!B(t[0])) return process.env.NODE_ENV !== "production" && a(Lr(Y.INVALID_NUMBER_ARGUMENT, { value: String(t[0]) })), "";
	let [c, l, u, d] = gi(...t), f = G(u.missingWarn) ? u.missingWarn : e.missingWarn, p = G(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, m = !!u.part, h = vr(e, u), g = o(e, i, h);
	if (!W(c) || c === "") {
		let e = new Intl.NumberFormat(h.replace(/!/g, ""), d);
		return m ? e.formatToParts(l) : e.format(l);
	}
	let _ = {}, v, y = null, b = h, x = null, S = "number format";
	for (let t = 0; t < g.length; t++) {
		if (v = x = g[t], process.env.NODE_ENV !== "production" && h !== v && ni(p, c) && a(Lr(Y.FALLBACK_TO_NUMBER_FORMAT, {
			key: c,
			target: v
		})), process.env.NODE_ENV !== "production" && h !== v) {
			let t = e.__v_emitter;
			t && t.emit("fallback", {
				type: S,
				key: c,
				from: b,
				to: x,
				groupId: `${S}:${c}`
			});
		}
		if (_ = n[v] || {}, y = _[c], q(y)) break;
		ii(e, c, v, f, S), b = x;
	}
	if (!q(y) || !W(v)) return r ? -1 : c;
	let C = `${v}__${c}`;
	bt(d) || (C = `${C}__${JSON.stringify(d)}`);
	let w = s.get(C);
	return w || (w = new Intl.NumberFormat(v, xt({}, y, d)), s.set(C, w)), m ? w.formatToParts(l) : w.format(l);
}
var hi = [
	"localeMatcher",
	"style",
	"currency",
	"currencyDisplay",
	"currencySign",
	"useGrouping",
	"minimumIntegerDigits",
	"minimumFractionDigits",
	"maximumFractionDigits",
	"minimumSignificantDigits",
	"maximumSignificantDigits",
	"compactDisplay",
	"notation",
	"signDisplay",
	"unit",
	"unitDisplay",
	"roundingMode",
	"roundingPriority",
	"roundingIncrement",
	"trailingZeroDisplay"
];
function gi(...e) {
	let [t, n, r, i] = e, a = V(), o = V();
	if (!B(t)) throw gr(hr.INVALID_ARGUMENT);
	let s = t;
	return W(n) ? a.key = n : q(n) && Object.keys(n).forEach((e) => {
		hi.includes(e) ? o[e] = n[e] : a[e] = n[e];
	}), W(r) ? a.locale = r : q(r) && (o = r), q(i) && (o = i), [
		a.key || "",
		s,
		a,
		o
	];
}
function _i(e, t, n) {
	let r = e;
	for (let e in n) {
		let n = `${t}__${e}`;
		r.__numberFormatters.has(n) && r.__numberFormatters.delete(n);
	}
}
var vi = (e) => e, yi = (e) => "", bi = "text", xi = (e) => e.length === 0 ? "" : zt(e), Si = Rt;
function Ci(e, t) {
	return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function wi(e) {
	let t = B(e.pluralIndex) ? e.pluralIndex : -1;
	return B(e.named?.count) ? e.named.count : B(e.named?.n) ? e.named.n : t;
}
function Ti(e = {}) {
	let t = e.locale, n = wi(e), r = W(t) && U(e.pluralRules?.[t]) ? e.pluralRules[t] : Ci, i = r === Ci ? void 0 : Ci, a = (e) => e[r(n, e.length, i)], o = e.list || [], s = (e) => o[e], c = e.named || V();
	B(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
	let l = (e) => c[e];
	function u(t, n) {
		return (U(e.messages) ? e.messages(t, !!n) : K(e.messages) ? e.messages[t] : !1) || (e.parent ? e.parent.message(t) : yi);
	}
	let d = (t) => e.modifiers ? e.modifiers[t] : vi, f = U(e.processor?.normalize) ? e.processor.normalize : xi, p = U(e.processor?.interpolate) ? e.processor.interpolate : Si, m = {
		list: s,
		named: l,
		plural: a,
		linked: (e, ...t) => {
			let [n, r] = t, i = "text", a = "";
			t.length === 1 ? K(n) ? (a = n.modifier || a, i = n.type || i) : W(n) && (a = n || a) : t.length === 2 && (W(n) && (a = n || a), W(r) && (i = r || i));
			let o = u(e, !0)(m), s = o === "" || o === void 0 ? e : o, c = i === "vnode" && H(s) && a ? s[0] : s;
			return a ? d(a)(c, i) : c;
		},
		message: u,
		type: W(e.processor?.type) ? e.processor.type : bi,
		interpolate: p,
		normalize: f,
		values: xt(V(), o, c)
	};
	return m;
}
var Ei = () => "", Di = (e) => U(e);
function Oi(e, ...t) {
	let { fallbackFormat: n, postTranslation: r, unresolving: i, messageCompiler: a, fallbackLocale: o, messages: s } = e, [c, l] = Ni(...t), u = G(l.missingWarn) ? l.missingWarn : e.missingWarn, d = G(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, f = G(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, p = !!l.resolvedMessage, m = W(l.default) || G(l.default) ? G(l.default) ? a ? c : () => c : l.default : n ? a ? c : () => c : null, h = n || m != null && (W(m) || U(m)), g = vr(e, l);
	f && ki(l);
	let [_, v, y] = p ? [
		c,
		g,
		s[g] || V()
	] : Ai(e, c, g, o, d, u), b = _, x = c;
	if (!p && !(W(b) || Pn(b) || Di(b)) && h && (b = m, x = b), !p && (!(W(b) || Pn(b) || Di(b)) || !W(v))) return i ? -1 : c;
	if (process.env.NODE_ENV !== "production" && W(b) && e.messageCompiler == null) return st(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${c}'.`), c;
	let S = !1, C = Di(b) ? b : ji(e, c, v, b, x, () => {
		S = !0;
	});
	if (S) return b;
	let w = Mi(e, C, Ti(Ii(e, v, y, l))), T = r ? r(w, c) : w;
	if (f && W(T) && (T = Mt(T)), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
		let t = {
			timestamp: Date.now(),
			key: W(c) ? c : Di(b) ? b.key : "",
			locale: v || (Di(b) ? b.locale : ""),
			format: W(b) ? b : Di(b) ? b.source : "",
			message: T
		};
		t.meta = xt({}, e.__meta, /* @__PURE__ */ Yr() || {}), pr(t);
	}
	return T;
}
function ki(e) {
	H(e.list) ? e.list = e.list.map((e) => W(e) ? Tt(e) : e) : K(e.named) && Object.keys(e.named).forEach((t) => {
		W(e.named[t]) && (e.named[t] = Tt(e.named[t]));
	});
}
function Ai(e, t, n, r, i, a) {
	let { messages: o, onWarn: s, messageResolver: c, localeFallbacker: l } = e, u = l(e, r, n), d = V(), f, p = null, m = n, h = null, g = "translate";
	for (let r = 0; r < u.length; r++) {
		f = h = u[r], process.env.NODE_ENV !== "production" && n !== f && !oi(n, f) && ni(i, t) && s(Lr(Y.FALLBACK_TO_TRANSLATE, {
			key: t,
			target: f
		}));
		let l = process.env.NODE_ENV === "production" ? void 0 : e.__v_emitter;
		process.env.NODE_ENV !== "production" && n !== f && l && l.emit("fallback", {
			type: g,
			key: t,
			from: m,
			to: h,
			groupId: `${g}:${t}`
		}), d = o[f] || V();
		let _ = null, v, y;
		if (process.env.NODE_ENV !== "production" && ut && l && (_ = window.performance.now(), v = "intlify-message-resolve-start", y = "intlify-message-resolve-end", dt && dt(v)), (p = c(d, t)) === null && (p = d[t]), process.env.NODE_ENV !== "production" && ut && l) {
			let e = window.performance.now();
			l && _ && p && l.emit("message-resolve", {
				type: "message-resolve",
				key: t,
				message: p,
				time: e - _,
				groupId: `${g}:${t}`
			}), v && y && dt && ft && (dt(y), ft("intlify message resolve", v, y));
		}
		if (W(p) || Pn(p) || Di(p)) break;
		if (!si(f, u)) {
			let n = ii(e, t, f, a, g);
			n !== t && (p = n);
		}
		m = h;
	}
	return [
		p,
		f,
		d
	];
}
function ji(e, t, n, r, i, a) {
	let { messageCompiler: o, warnHtmlMessage: s } = e;
	if (Di(r)) {
		let e = r;
		return e.locale = e.locale || n, e.key = e.key || t, e;
	}
	if (o == null) {
		let e = (() => r);
		return e.locale = n, e.key = t, e;
	}
	let c = process.env.NODE_ENV === "production" ? void 0 : e.__v_emitter, l = null, u, d;
	process.env.NODE_ENV !== "production" && ut && c && (l = window.performance.now(), u = "intlify-message-compilation-start", d = "intlify-message-compilation-end", dt && dt(u));
	let f = o(r, Pi(e, n, i, r, s, a));
	if (process.env.NODE_ENV !== "production" && ut && c) {
		let e = window.performance.now();
		c && l && c.emit("message-compilation", {
			type: "message-compilation",
			message: r,
			time: e - l,
			groupId: `translate:${t}`
		}), u && d && dt && ft && (dt(d), ft("intlify message compilation", u, d));
	}
	return f.locale = n, f.key = t, f.source = r, f;
}
function Mi(e, t, n) {
	let r = process.env.NODE_ENV === "production" ? void 0 : e.__v_emitter, i = null, a, o;
	process.env.NODE_ENV !== "production" && ut && r && (i = window.performance.now(), a = "intlify-message-evaluation-start", o = "intlify-message-evaluation-end", dt && dt(a));
	let s = t(n);
	if (process.env.NODE_ENV !== "production" && ut && r) {
		let e = window.performance.now();
		r && i && r.emit("message-evaluation", {
			type: "message-evaluation",
			value: s,
			time: e - i,
			groupId: `translate:${t.key}`
		}), a && o && dt && ft && (dt(o), ft("intlify message evaluation", a, o));
	}
	return s;
}
function Ni(...e) {
	let [t, n, r] = e, i = V();
	if (!W(t) && !B(t) && !Di(t) && !Pn(t)) throw gr(hr.INVALID_ARGUMENT);
	let a = B(t) ? String(t) : (Di(t), t);
	return B(n) ? i.plural = n : W(n) ? i.default = n : q(n) && !bt(n) ? i.named = n : H(n) && (i.list = n), B(r) ? i.plural = r : W(r) ? i.default = r : q(r) && xt(i, r), [a, i];
}
function Pi(e, t, n, r, i, a) {
	return {
		locale: t,
		key: n,
		warnHtmlMessage: i,
		onError: (t) => {
			if (a && a(t), process.env.NODE_ENV !== "production") {
				let i = Fi(r), a = t.location && i && Vt(i, t.location.start.offset, t.location.end.offset), o = e.__v_emitter;
				o && i && o.emit("compile-error", {
					message: i,
					error: t.message,
					start: t.location && t.location.start.offset,
					end: t.location && t.location.end.offset,
					groupId: `translate:${n}`
				});
				let s = `Message compilation error: ${t.message}`;
				throw SyntaxError(a ? `${s}\n${a}` : s);
			}
			throw t;
		},
		onCacheKey: (e) => gt(t, n, e)
	};
}
function Fi(e) {
	if (W(e)) return e;
	if (e.loc && e.loc.source) return e.loc.source;
}
function Ii(e, t, n, r) {
	let { modifiers: i, pluralRules: a, messageResolver: o, fallbackLocale: s, fallbackWarn: c, missingWarn: l, fallbackContext: u } = e, d = {
		locale: t,
		modifiers: i,
		pluralRules: a,
		messages: (r, i) => {
			let a = o(n, r);
			if (a == null && (u || i)) {
				let [n, , i] = Ai(u || e, r, t, s, c, l);
				a = n ?? o(i, r);
			}
			if (W(a) || Pn(a)) {
				let n = !1, i = ji(e, r, t, a, r, () => {
					n = !0;
				});
				return n ? Ei : i;
			}
			return Di(a) ? a : Ei;
		}
	};
	return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), B(r.plural) && (d.pluralIndex = r.plural), d;
}
Nn();
// node_modules/.pnpm/vue-i18n@11.4.6_vue@3.5.44_typescript@6.0.3_/node_modules/vue-i18n/dist/vue-i18n.mjs
var Li = "11.4.6";
function Ri() {
	typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (wt().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (wt().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (wt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (wt().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
var X = {
	UNEXPECTED_RETURN_TYPE: 24,
	INVALID_ARGUMENT: 25,
	MUST_BE_CALL_SETUP_TOP: 26,
	NOT_INSTALLED: 27,
	REQUIRED_VALUE: 28,
	INVALID_VALUE: 29,
	CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
	NOT_INSTALLED_WITH_PROVIDE: 31,
	UNEXPECTED_ERROR: 32,
	NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
	NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function zi(e, ...t) {
	return Jt(e, null, process.env.NODE_ENV === "production" ? void 0 : {
		messages: Bi,
		args: t
	});
}
var Bi = {
	[X.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
	[X.INVALID_ARGUMENT]: "Invalid argument",
	[X.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
	[X.NOT_INSTALLED]: "Need to install with `app.use` function",
	[X.UNEXPECTED_ERROR]: "Unexpected error",
	[X.REQUIRED_VALUE]: "Required in value: {0}",
	[X.INVALID_VALUE]: "Invalid value",
	[X.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
	[X.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
	[X.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
	[X.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, Vi = /* #__PURE__*/ ht("__translateVNode"), Hi = /* #__PURE__*/ ht("__datetimeParts"), Ui = /* #__PURE__*/ ht("__numberParts"), Wi = /* #__PURE__*/ ht("__enableEmitter"), Gi = /* #__PURE__*/ ht("__disableEmitter"), Ki = ht("__setPluralRules");
ht("__intlifyMeta");
var qi = /* #__PURE__*/ ht("__injectWithOption"), Ji = /* #__PURE__*/ ht("__dispose"), Yi = {
	FALLBACK_TO_ROOT: 10,
	NOT_FOUND_PARENT_SCOPE: 11,
	IGNORE_OBJ_FLATTEN: 12,
	DEPRECATE_LEGACY_MODE: 13,
	DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
	DUPLICATE_USE_I18N_CALLING: 15
}, Xi = {
	[Yi.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
	[Yi.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
	[Yi.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
	[Yi.DEPRECATE_LEGACY_MODE]: "Legacy API mode has been deprecated in v11. Use Composition API mode instead.\nAbout how to use the Composition API mode, see https://vue-i18n.intlify.dev/guide/advanced/composition.html",
	[Yi.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE]: "'v-t' has been deprecated in v11. Use translate APIs ('t' or '$t') instead.",
	[Yi.DUPLICATE_USE_I18N_CALLING]: "Duplicate `useI18n` calling by local scope. Please don't call it on local scope, due to it does not work properly in component."
};
function Zi(e, ...t) {
	return mt(Xi[e], ...t);
}
function Qi(e) {
	if (!K(e) || Pn(e)) return e;
	for (let t in e) if (Pt(e, t)) {
		if (!t.includes(".")) K(e[t]) && Qi(e[t]);
		else {
			let n = t.split("."), r = n.length - 1, i = e, a = !1;
			for (let e = 0; e < r; e++) {
				if (n[e] === "__proto__") throw Error(`unsafe key: ${n[e]}`);
				if (n[e] in i || (i[n[e]] = V()), !K(i[n[e]])) {
					process.env.NODE_ENV !== "production" && st(Zi(Yi.IGNORE_OBJ_FLATTEN, { key: n[e] })), a = !0;
					break;
				}
				i = i[n[e]];
			}
			if (a || (Pn(i) ? Qn.includes(n[r]) || delete e[t] : (i[n[r]] = e[t], delete e[t])), !Pn(i)) {
				let e = i[n[r]];
				K(e) && Qi(e);
			}
		}
	}
	return e;
}
function $i(e, t) {
	let { messages: n, __i18n: r, messageResolver: i, flatJson: a } = t, o = q(n) ? n : H(r) ? V() : { [e]: V() };
	if (H(r) && r.forEach((e) => {
		if ("locale" in e && "resource" in e) {
			let { locale: t, resource: n } = e;
			t ? (o[t] = o[t] || V(), Wt(n, o[t])) : Wt(n, o);
		} else W(e) && Wt(JSON.parse(e), o);
	}), i == null && a) for (let e in o) Pt(o, e) && Qi(o[e]);
	return o;
}
function ea(e) {
	return e.type;
}
function ta(e, t, n) {
	let r = K(t.messages) ? t.messages : V();
	"__i18nGlobal" in n && (r = $i(e.locale.value, {
		messages: r,
		__i18n: n.__i18nGlobal
	}));
	let i = Object.keys(r);
	if (i.length && i.forEach((t) => {
		e.mergeLocaleMessage(t, r[t]);
	}), K(t.datetimeFormats)) {
		let n = Object.keys(t.datetimeFormats);
		n.length && n.forEach((n) => {
			e.mergeDateTimeFormat(n, t.datetimeFormats[n]);
		});
	}
	if (K(t.numberFormats)) {
		let n = Object.keys(t.numberFormats);
		n.length && n.forEach((n) => {
			e.mergeNumberFormat(n, t.numberFormats[n]);
		});
	}
}
function na(e) {
	return s(n, null, e, 0);
}
function ra() {
	let t = "currentInstance";
	return t in e ? e[t] : e.getCurrentInstance();
}
var ia = () => [], aa = () => !1, oa = 0;
function sa(e) {
	return ((t, n, r, i) => e(n, r, ra() || void 0, i));
}
function ca(e = {}) {
	let { __root: t, __injectWithOption: n } = e, i = t === void 0, a = e.flatJson, o = ut ? T : O, s = !G(e.inheritLocale) || e.inheritLocale, c = o(t && s ? t.locale.value : W(e.locale) ? e.locale : zr), l = o(t && s ? t.fallbackLocale.value : W(e.fallbackLocale) || H(e.fallbackLocale) || q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : c.value), u = o($i(c.value, e)), d = o(q(e.datetimeFormats) ? e.datetimeFormats : { [c.value]: {} }), f = o(q(e.numberFormats) ? e.numberFormats : { [c.value]: {} }), p = t ? t.missingWarn : G(e.missingWarn) || yt(e.missingWarn) ? e.missingWarn : !0, m = t ? t.fallbackWarn : G(e.fallbackWarn) || yt(e.fallbackWarn) ? e.fallbackWarn : !0, h = t ? t.fallbackRoot : !G(e.fallbackRoot) || e.fallbackRoot, g = !!e.fallbackFormat, _ = U(e.missing) ? e.missing : null, v = U(e.missing) ? sa(e.missing) : null, y = U(e.postTranslation) ? e.postTranslation : null, b = t ? t.warnHtmlMessage : !G(e.warnHtmlMessage) || e.warnHtmlMessage, x = !!e.escapeParameter, S = t ? t.modifiers : q(e.modifiers) ? e.modifiers : {}, C = e.pluralRules || t && t.pluralRules, w;
	w = (() => {
		i && Zr(null);
		let t = {
			version: Li,
			locale: c.value,
			fallbackLocale: l.value,
			messages: u.value,
			modifiers: S,
			pluralRules: C,
			missing: v === null ? void 0 : v,
			missingWarn: p,
			fallbackWarn: m,
			fallbackFormat: g,
			unresolving: !0,
			postTranslation: y === null ? void 0 : y,
			warnHtmlMessage: b,
			escapeParameter: x,
			messageResolver: e.messageResolver,
			messageCompiler: e.messageCompiler,
			__meta: { framework: "vue" }
		};
		t.datetimeFormats = d.value, t.numberFormats = f.value, t.__datetimeFormatters = q(w) ? w.__datetimeFormatters : void 0, t.__numberFormatters = q(w) ? w.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (t.__v_emitter = q(w) ? w.__v_emitter : void 0);
		let n = ei(t);
		return i && Zr(n), n;
	})(), ai(w, c.value, l.value);
	function ee() {
		return [
			c.value,
			l.value,
			u.value,
			d.value,
			f.value
		];
	}
	let E = r({
		get: () => c.value,
		set: (e) => {
			w.locale = e, c.value = e;
		}
	}), D = r({
		get: () => l.value,
		set: (e) => {
			w.fallbackLocale = e, l.value = e, ai(w, c.value, e);
		}
	}), k = r(() => u.value), A = /* #__PURE__*/ r(() => d.value), j = /* #__PURE__*/ r(() => f.value);
	function M() {
		return U(y) ? y : null;
	}
	function P(e) {
		y = e, w.postTranslation = e;
	}
	function te() {
		return _;
	}
	function ne(e) {
		e !== null && (v = sa(e)), _ = e, w.missing = v;
	}
	function F(e, t) {
		return e !== "translate" || !t.resolvedMessage;
	}
	let I = (e, n, r, a, o, s) => {
		ee();
		let c;
		try {
			process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, i || (w.fallbackContext = t ? Qr() : void 0), c = e(w);
		} finally {
			process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, i || (w.fallbackContext = void 0);
		}
		if (r !== "translate exists" && B(c) && c === -1 || r === "translate exists" && !c) {
			let [e, i] = n();
			if (process.env.NODE_ENV !== "production" && t && W(e) && F(r, i) && (h && (ni(m, e) || ri(p, e)) && st(Zi(Yi.FALLBACK_TO_ROOT, {
				key: e,
				type: r
			})), process.env.NODE_ENV !== "production")) {
				let { __v_emitter: t } = w;
				t && h && t.emit("fallback", {
					type: r,
					key: e,
					to: "global",
					groupId: `${r}:${e}`
				});
			}
			return t && h ? a(t) : o(e);
		}
		if (s(c)) return c;
		/* istanbul ignore next */
		throw zi(X.UNEXPECTED_RETURN_TYPE);
	};
	function re(...e) {
		return I((t) => Reflect.apply(Oi, null, [t, ...e]), () => Ni(...e), "translate", (t) => Reflect.apply(t.t, t, [...e]), (e) => e, (e) => W(e));
	}
	function ie(...e) {
		let [t, n, r] = e;
		if (r && !K(r)) throw zi(X.INVALID_ARGUMENT);
		return re(t, n, xt({ resolvedMessage: !0 }, r || {}));
	}
	function ae(...e) {
		return I((t) => Reflect.apply(ui, null, [t, ...e]), () => fi(...e), "datetime format", (t) => Reflect.apply(t.d, t, [...e]), () => "", (e) => W(e) || H(e));
	}
	function oe(...e) {
		return I((t) => Reflect.apply(mi, null, [t, ...e]), () => gi(...e), "number format", (t) => Reflect.apply(t.n, t, [...e]), () => "", (e) => W(e) || H(e));
	}
	function L(e) {
		return e.map((e) => W(e) || B(e) || G(e) ? na(String(e)) : e);
	}
	let se = {
		normalize: L,
		interpolate: (e) => e,
		type: "vnode"
	};
	function ce(...e) {
		return I((t) => {
			let n, r = t;
			try {
				r.processor = se, n = Reflect.apply(Oi, null, [r, ...e]);
			} finally {
				r.processor = null;
			}
			return n;
		}, () => Ni(...e), "translate", (t) => t[Vi](...e), (e) => [na(e)], (e) => H(e));
	}
	function le(...e) {
		return I((t) => Reflect.apply(mi, null, [t, ...e]), () => gi(...e), "number format", (t) => t[Ui](...e), ia, (e) => W(e) || H(e));
	}
	function ue(...e) {
		return I((t) => Reflect.apply(ui, null, [t, ...e]), () => fi(...e), "datetime format", (t) => t[Hi](...e), ia, (e) => W(e) || H(e));
	}
	function de(e) {
		C = e, w.pluralRules = C;
	}
	function fe(e, t) {
		return I(() => {
			if (!e) return !1;
			let n = W(t) ? t : c.value, r = W(t) ? [n] : Sr(w, l.value, n);
			for (let t = 0; t < r.length; t++) {
				let n = he(r[t]), i = w.messageResolver(n, e);
				if (i === null && (i = n[e]), Pn(i) || Di(i) || W(i)) return !0;
			}
			return !1;
		}, () => [e], "translate exists", (n) => Reflect.apply(n.te, n, [e, t]), aa, (e) => G(e));
	}
	function pe(e) {
		let t = null, n = Sr(w, l.value, c.value);
		for (let r = 0; r < n.length; r++) {
			let i = u.value[n[r]] || {}, a = w.messageResolver(i, e);
			if (a != null) {
				t = a;
				break;
			}
		}
		return t;
	}
	function me(e) {
		return pe(e) ?? (t && t.tm(e) || {});
	}
	function he(e) {
		return u.value[e] || {};
	}
	function ge(e, t) {
		if (a) {
			let n = { [e]: t };
			for (let e in n) Pt(n, e) && Qi(n[e]);
			t = n[e];
		}
		u.value[e] = t, w.messages = u.value;
	}
	function _e(e, t) {
		u.value[e] = u.value[e] || {};
		let n = { [e]: t };
		if (a) for (let e in n) Pt(n, e) && Qi(n[e]);
		t = n[e], Wt(t, u.value[e]), w.messages = u.value;
	}
	function ve(e) {
		return d.value[e] || {};
	}
	function ye(e, t) {
		d.value[e] = t, w.datetimeFormats = d.value, pi(w, e, t);
	}
	function be(e, t) {
		d.value[e] = xt(d.value[e] || {}, t), w.datetimeFormats = d.value, pi(w, e, t);
	}
	function xe(e) {
		return f.value[e] || {};
	}
	function Se(e, t) {
		f.value[e] = t, w.numberFormats = f.value, _i(w, e, t);
	}
	function Ce(e, t) {
		f.value[e] = xt(f.value[e] || {}, t), w.numberFormats = f.value, _i(w, e, t);
	}
	oa++, t && ut && (N(t.locale, (e) => {
		s && (c.value = e, w.locale = e, ai(w, c.value, l.value));
	}), N(t.fallbackLocale, (e) => {
		s && (l.value = e, w.fallbackLocale = e, ai(w, c.value, l.value));
	}));
	let R = {
		id: oa,
		locale: E,
		fallbackLocale: D,
		get inheritLocale() {
			return s;
		},
		set inheritLocale(e) {
			s = e, e && t && (c.value = t.locale.value, l.value = t.fallbackLocale.value, ai(w, c.value, l.value));
		},
		get availableLocales() {
			return Object.keys(u.value).sort();
		},
		messages: k,
		get modifiers() {
			return S;
		},
		get pluralRules() {
			return C || {};
		},
		get isGlobal() {
			return i;
		},
		get missingWarn() {
			return p;
		},
		set missingWarn(e) {
			p = e, w.missingWarn = p;
		},
		get fallbackWarn() {
			return m;
		},
		set fallbackWarn(e) {
			m = e, w.fallbackWarn = m;
		},
		get fallbackRoot() {
			return h;
		},
		set fallbackRoot(e) {
			h = e;
		},
		get fallbackFormat() {
			return g;
		},
		set fallbackFormat(e) {
			g = e, w.fallbackFormat = g;
		},
		get warnHtmlMessage() {
			return b;
		},
		set warnHtmlMessage(e) {
			b = e, w.warnHtmlMessage = e;
		},
		get escapeParameter() {
			return x;
		},
		set escapeParameter(e) {
			x = e, w.escapeParameter = e;
		},
		t: re,
		getLocaleMessage: he,
		setLocaleMessage: ge,
		mergeLocaleMessage: _e,
		getPostTranslationHandler: M,
		setPostTranslationHandler: P,
		getMissingHandler: te,
		setMissingHandler: ne,
		[Ki]: de
	};
	return R.datetimeFormats = A, R.numberFormats = j, R.rt = ie, R.te = fe, R.tm = me, R.d = ae, R.n = oe, R.getDateTimeFormat = ve, R.setDateTimeFormat = ye, R.mergeDateTimeFormat = be, R.getNumberFormat = xe, R.setNumberFormat = Se, R.mergeNumberFormat = Ce, R[qi] = n, R[Vi] = ce, R[Hi] = ue, R[Ui] = le, process.env.NODE_ENV !== "production" && (R[Wi] = (e) => {
		w.__v_emitter = e;
	}, R[Gi] = () => {
		w.__v_emitter = void 0;
	}), R;
}
function la(e, t) {}
var ua = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (e) => e === "parent" || e === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
xt({
	keypath: {
		type: String,
		required: !0
	},
	plural: {
		type: [Number, String],
		validator: (e) => B(e) || !isNaN(e)
	}
}, ua), xt({
	value: {
		type: Number,
		required: !0
	},
	format: { type: [String, Object] }
}, ua);
var da = /* #__PURE__*/ ht("global-vue-i18n");
function fa(e = {}) {
	let t = ra();
	if (t == null) throw zi(X.MUST_BE_CALL_SETUP_TOP);
	if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw zi(X.NOT_INSTALLED);
	let n = pa(t), r = ha(n), i = ea(t), a = ma(e, i);
	if (a === "global") return ta(r, e, i), r;
	if (a === "parent") {
		let i = ga(n, t, e.__useComponent);
		return i ??= (process.env.NODE_ENV !== "production" && st(Zi(Yi.NOT_FOUND_PARENT_SCOPE)), r), i;
	}
	if (a === "isolated") {
		if (n.mode !== "composition") throw zi(X.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		let i = n, a = xt({}, e);
		a.__root = ga(n, t) || r;
		let o = ca(a);
		i.__composerExtend && (o[Ji] = i.__composerExtend(o));
		let s = null;
		if (process.env.NODE_ENV !== "production") {
			s = Ht();
			let e = o;
			e[Wi] && e[Wi](s), s.on("*", la);
		}
		return f() && x(() => {
			if (process.env.NODE_ENV !== "production") {
				s && s.off("*", la);
				let e = o;
				e[Gi] && e[Gi]();
			}
			let e = o[Ji];
			e && (e(), delete o[Ji]);
		}), o;
	}
	let o = n, s = o.__getInstance(t);
	if (s == null) {
		let n = xt({}, e);
		"__i18n" in i && (n.__i18n = i.__i18n), r && (n.__root = r), s = ca(n), o.__composerExtend && (s[Ji] = o.__composerExtend(s)), va(o, t, s), o.__setInstance(t, s);
	} else process.env.NODE_ENV !== "production" && a === "local" && st(Zi(Yi.DUPLICATE_USE_I18N_CALLING));
	return s;
}
function pa(e) {
	let t = m(e.isCE ? da : e.appContext.app.__VUE_I18N_SYMBOL__);
	/* istanbul ignore if */
	if (!t) throw zi(e.isCE ? X.NOT_INSTALLED_WITH_PROVIDE : X.UNEXPECTED_ERROR);
	return t;
}
function ma(e, t) {
	return bt(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function ha(e) {
	return e.mode === "composition" ? e.global : e.global.__composer;
}
function ga(e, t, n = !1) {
	let r = null, i = t.root, a = _a(t, n);
	for (; a != null;) {
		let t = e;
		if (e.mode === "composition") r = t.__getInstance(a);
		else if (__VUE_I18N_LEGACY_API__) {
			let e = t.__getInstance(a);
			e != null && (r = e.__composer, n && r && !r[qi] && (r = null));
		}
		if (r != null || i === a) break;
		a = a.parent;
	}
	return r;
}
function _a(e, t = !1) {
	return e == null ? null : t && e.vnode.ctx || e.parent;
}
function va(e, t, n) {
	let r = null;
	b(() => {
		if (process.env.NODE_ENV !== "production") {
			t.__VUE_I18N__ = n, r = Ht();
			let e = n;
			e[Wi] && e[Wi](r), r.on("*", la);
		}
	}, t), S(() => {
		let i = n;
		process.env.NODE_ENV !== "production" && (r && r.off("*", la), i[Gi] && i[Gi](), delete t.__VUE_I18N__), e.__deleteInstance(t);
		let a = i[Ji];
		a && (a(), delete i[Ji]);
	}, t);
}
if (xt({
	value: {
		type: [Number, Date],
		required: !0
	},
	format: { type: [String, Object] }
}, ua), Ri(), Ur(lr), Gr(Fr), qr(Sr), process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
	let e = wt();
	e.__INTLIFY__ = !0, dr(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV, it.default.extend(at.default), it.default.extend(ot.default);
var ya = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/;
function ba(e) {
	let t = ya.exec(e);
	if (!t) return !0;
	let n = t[1] ? "YYYY-MM-DD[T]HH:mm:ss" : "YYYY-MM-DD";
	return (0, it.default)(t[0], n, !0).isValid();
}
function xa() {
	let { t: e } = fa(), t = (t, n) => {
		if (!t) return "";
		let r = (0, it.default)(t.toString());
		return r.isValid() ? r.format(e(n)) : "";
	}, n = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
	return {
		toDate: t,
		toDateISO: (t, r) => {
			let i = t?.toString() || "";
			if (!i) return "";
			if (n.test(i)) return ba(i) && (0, it.default)(i).isValid() ? i : "";
			let a = it.default.utc(i, e(r), !0);
			return a.isValid() ? a.toISOString() : "";
		},
		toEmptyRecord: (e) => Object.fromEntries(e.map((e) => [e.name, ""])),
		toDayJs: (e) => {
			let t = e?.toString() || "";
			if (t === "") return null;
			let n = (0, it.default)(t);
			return ba(t) && n.isValid() ? n : null;
		},
		formatDate: (e, t, n) => {
			let r = e?.toString();
			if (!r) return "";
			let i = n ? (0, it.default)(r, n, !0) : (0, it.default)(r);
			return i.isValid() ? i.format(t) : "";
		}
	};
}
// src/services/dayjsService.ts
var Sa = null;
function Ca(e) {
	Sa === null ? Sa = e : console.warn("[LinPulsar Core] Dayjs instance has already been initialized. Re-initialization is ignored.");
}
function wa() {
	if (Sa === null) throw Error("[LinPulsar Core] Dayjs instance is not initialized. Call setDayjsInstance() first.");
	return Sa;
}
// src/composables/useDayjs.ts
var Ta = "YYYY-MM-DD";
function Ea() {
	let e = wa();
	function t(t, n) {
		return typeof t == "string" ? e(t, n || "YYYY-MM-DD", !0) : e(t);
	}
	function n(e, n) {
		let r = e.map((e) => t(e, n)).filter((e) => e.isValid());
		return r.length === 0 ? null : r.reduce((e, t) => t.isAfter(e) ? t : e);
	}
	function r(e, n) {
		let r = e.map((e) => t(e, n)).filter((e) => e.isValid());
		return r.length === 0 ? null : r.reduce((e, t) => t.isBefore(e) ? t : e);
	}
	return {
		maxDate: n,
		minDate: r,
		toDayjs: t
	};
}
// node_modules/.pnpm/interactjs@1.10.27/node_modules/interactjs/dist/interact.min.js
var Da = /* @__PURE__ */ oe(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).interact = r();
	})(n, (function() {
		function e(e, t) {
			var n = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(e);
				t && (r = r.filter((function(t) {
					return Object.getOwnPropertyDescriptor(e, t).enumerable;
				}))), n.push.apply(n, r);
			}
			return n;
		}
		function n(t) {
			for (var n = 1; n < arguments.length; n++) {
				var r = arguments[n] == null ? {} : arguments[n];
				n % 2 ? e(Object(r), !0).forEach((function(e) {
					s(t, e, r[e]);
				})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach((function(e) {
					Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
				}));
			}
			return t;
		}
		function r(e) {
			return r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
				return typeof e;
			} : function(e) {
				return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			}, r(e);
		}
		function i(e, t) {
			if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
		}
		function a(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, m(r.key), r);
			}
		}
		function o(e, t, n) {
			return t && a(e.prototype, t), n && a(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
		}
		function s(e, t, n) {
			return (t = m(t)) in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e;
		}
		function c(e, t) {
			if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
			e.prototype = Object.create(t && t.prototype, { constructor: {
				value: e,
				writable: !0,
				configurable: !0
			} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && u(e, t);
		}
		function l(e) {
			return l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
				return e.__proto__ || Object.getPrototypeOf(e);
			}, l(e);
		}
		function u(e, t) {
			return u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
				return e.__proto__ = t, e;
			}, u(e, t);
		}
		function d(e) {
			if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
			return e;
		}
		function f(e) {
			var t = function() {
				if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
				if (typeof Proxy == "function") return !0;
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0;
				} catch {
					return !1;
				}
			}();
			return function() {
				var n, r = l(e);
				if (t) {
					var i = l(this).constructor;
					n = Reflect.construct(r, arguments, i);
				} else n = r.apply(this, arguments);
				return function(e, t) {
					if (t && (typeof t == "object" || typeof t == "function")) return t;
					if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
					return d(e);
				}(this, n);
			};
		}
		function p() {
			return p = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(e, t, n) {
				var r = function(e, t) {
					for (; !Object.prototype.hasOwnProperty.call(e, t) && (e = l(e)) !== null;);
					return e;
				}(e, t);
				if (r) {
					var i = Object.getOwnPropertyDescriptor(r, t);
					return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
				}
			}, p.apply(this, arguments);
		}
		function m(e) {
			var t = function(e, t) {
				if (typeof e != "object" || !e) return e;
				var n = e[Symbol.toPrimitive];
				if (n !== void 0) {
					var r = n.call(e, t);
					if (typeof r != "object") return r;
					throw TypeError("@@toPrimitive must return a primitive value.");
				}
				return String(e);
			}(e, "string");
			return typeof t == "symbol" ? t : t + "";
		}
		var h = function(e) {
			return !(!e || !e.Window) && e instanceof e.Window;
		}, g = void 0, _ = void 0;
		function v(e) {
			g = e;
			var t = e.document.createTextNode("");
			t.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(t) === t && (e = e.wrap(e)), _ = e;
		}
		function y(e) {
			return h(e) ? e : (e.ownerDocument || e).defaultView || _.window;
		}
		typeof window < "u" && window && v(window);
		var b = function(e) {
			return !!e && r(e) === "object";
		}, x = function(e) {
			return typeof e == "function";
		}, S = {
			window: function(e) {
				return e === _ || h(e);
			},
			docFrag: function(e) {
				return b(e) && e.nodeType === 11;
			},
			object: b,
			func: x,
			number: function(e) {
				return typeof e == "number";
			},
			bool: function(e) {
				return typeof e == "boolean";
			},
			string: function(e) {
				return typeof e == "string";
			},
			element: function(e) {
				if (!e || r(e) !== "object") return !1;
				var t = y(e) || _;
				return /object|function/.test(typeof Element > "u" ? "undefined" : r(Element)) ? e instanceof Element || e instanceof t.Element : e.nodeType === 1 && typeof e.nodeName == "string";
			},
			plainObject: function(e) {
				return b(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString());
			},
			array: function(e) {
				return b(e) && e.length !== void 0 && x(e.splice);
			}
		};
		function C(e) {
			var t = e.interaction;
			if (t.prepared.name === "drag") {
				var n = t.prepared.axis;
				n === "x" ? (t.coords.cur.page.y = t.coords.start.page.y, t.coords.cur.client.y = t.coords.start.client.y, t.coords.velocity.client.y = 0, t.coords.velocity.page.y = 0) : n === "y" && (t.coords.cur.page.x = t.coords.start.page.x, t.coords.cur.client.x = t.coords.start.client.x, t.coords.velocity.client.x = 0, t.coords.velocity.page.x = 0);
			}
		}
		function w(e) {
			var t = e.iEvent, n = e.interaction;
			if (n.prepared.name === "drag") {
				var r = n.prepared.axis;
				if (r === "x" || r === "y") {
					var i = r === "x" ? "y" : "x";
					t.page[i] = n.coords.start.page[i], t.client[i] = n.coords.start.client[i], t.delta[i] = 0;
				}
			}
		}
		var T = {
			id: "actions/drag",
			install: function(e) {
				var t = e.actions, n = e.Interactable, r = e.defaults;
				n.prototype.draggable = T.draggable, t.map.drag = T, t.methodDict.drag = "draggable", r.actions.drag = T.defaults;
			},
			listeners: {
				"interactions:before-action-move": C,
				"interactions:action-resume": C,
				"interactions:action-move": w,
				"auto-start:check": function(e) {
					var t = e.interaction, n = e.interactable, r = e.buttons, i = n.options.drag;
					if (i && i.enabled && (!t.pointerIsDown || !/mouse|pointer/.test(t.pointerType) || (r & n.options.drag.mouseButtons) != 0)) return e.action = {
						name: "drag",
						axis: i.lockAxis === "start" ? i.startAxis : i.lockAxis
					}, !1;
				}
			},
			draggable: function(e) {
				return S.object(e) ? (this.options.drag.enabled = !1 !== e.enabled, this.setPerAction("drag", e), this.setOnEvents("drag", e), /^(xy|x|y|start)$/.test(e.lockAxis) && (this.options.drag.lockAxis = e.lockAxis), /^(xy|x|y)$/.test(e.startAxis) && (this.options.drag.startAxis = e.startAxis), this) : S.bool(e) ? (this.options.drag.enabled = e, this) : this.options.drag;
			},
			beforeMove: C,
			move: w,
			defaults: {
				startAxis: "xy",
				lockAxis: "xy"
			},
			getCursor: function() {
				return "move";
			},
			filterEventType: function(e) {
				return e.search("drag") === 0;
			}
		}, ee = T, E = {
			init: function(e) {
				var t = e;
				E.document = t.document, E.DocumentFragment = t.DocumentFragment || D, E.SVGElement = t.SVGElement || D, E.SVGSVGElement = t.SVGSVGElement || D, E.SVGElementInstance = t.SVGElementInstance || D, E.Element = t.Element || D, E.HTMLElement = t.HTMLElement || E.Element, E.Event = t.Event, E.Touch = t.Touch || D, E.PointerEvent = t.PointerEvent || t.MSPointerEvent;
			},
			document: null,
			DocumentFragment: null,
			SVGElement: null,
			SVGSVGElement: null,
			SVGElementInstance: null,
			Element: null,
			HTMLElement: null,
			Event: null,
			Touch: null,
			PointerEvent: null
		};
		function D() {}
		var O = E, k = {
			init: function(e) {
				var t = O.Element, n = e.navigator || {};
				k.supportsTouch = "ontouchstart" in e || S.func(e.DocumentTouch) && O.document instanceof e.DocumentTouch, k.supportsPointerEvent = !1 !== n.pointerEnabled && !!O.PointerEvent, k.isIOS = /iP(hone|od|ad)/.test(n.platform), k.isIOS7 = /iP(hone|od|ad)/.test(n.platform) && /OS 7[^\d]/.test(n.appVersion), k.isIe9 = /MSIE 9/.test(n.userAgent), k.isOperaMobile = n.appName === "Opera" && k.supportsTouch && /Presto/.test(n.userAgent), k.prefixedMatchesSelector = "matches" in t.prototype ? "matches" : "webkitMatchesSelector" in t.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in t.prototype ? "mozMatchesSelector" : "oMatchesSelector" in t.prototype ? "oMatchesSelector" : "msMatchesSelector", k.pEventTypes = k.supportsPointerEvent ? O.PointerEvent === e.MSPointerEvent ? {
					up: "MSPointerUp",
					down: "MSPointerDown",
					over: "mouseover",
					out: "mouseout",
					move: "MSPointerMove",
					cancel: "MSPointerCancel"
				} : {
					up: "pointerup",
					down: "pointerdown",
					over: "pointerover",
					out: "pointerout",
					move: "pointermove",
					cancel: "pointercancel"
				} : null, k.wheelEvent = O.document && "onmousewheel" in O.document ? "mousewheel" : "wheel";
			},
			supportsTouch: null,
			supportsPointerEvent: null,
			isIOS7: null,
			isIOS: null,
			isIe9: null,
			isOperaMobile: null,
			prefixedMatchesSelector: null,
			pEventTypes: null,
			wheelEvent: null
		}, A = k;
		function j(e, t) {
			if (e.contains) return e.contains(t);
			for (; t;) {
				if (t === e) return !0;
				t = t.parentNode;
			}
			return !1;
		}
		function M(e, t) {
			for (; S.element(e);) {
				if (P(e, t)) return e;
				e = N(e);
			}
			return null;
		}
		function N(e) {
			var t = e.parentNode;
			if (S.docFrag(t)) {
				for (; (t = t.host) && S.docFrag(t););
				return t;
			}
			return t;
		}
		function P(e, t) {
			return _ !== g && (t = t.replace(/\/deep\//g, " ")), e[A.prefixedMatchesSelector](t);
		}
		var te = function(e) {
			return e.parentNode || e.host;
		};
		function ne(e, t) {
			for (var n, r = [], i = e; (n = te(i)) && i !== t && n !== i.ownerDocument;) r.unshift(i), i = n;
			return r;
		}
		function F(e, t, n) {
			for (; S.element(e);) {
				if (P(e, t)) return !0;
				if ((e = N(e)) === n) return P(e, t);
			}
			return !1;
		}
		function I(e) {
			return e.correspondingUseElement || e;
		}
		function re(e) {
			var t = e instanceof O.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
			return t && {
				left: t.left,
				right: t.right,
				top: t.top,
				bottom: t.bottom,
				width: t.width || t.right - t.left,
				height: t.height || t.bottom - t.top
			};
		}
		function ie(e) {
			var t, n = re(e);
			if (!A.isIOS7 && n) {
				var r = {
					x: (t = (t = y(e)) || _).scrollX || t.document.documentElement.scrollLeft,
					y: t.scrollY || t.document.documentElement.scrollTop
				};
				n.left += r.x, n.right += r.x, n.top += r.y, n.bottom += r.y;
			}
			return n;
		}
		function ae(e) {
			for (var t = []; e;) t.push(e), e = N(e);
			return t;
		}
		function oe(e) {
			return !!S.string(e) && (O.document.querySelector(e), !0);
		}
		function L(e, t) {
			for (var n in t) e[n] = t[n];
			return e;
		}
		function se(e, t, n) {
			return e === "parent" ? N(n) : e === "self" ? t.getRect(n) : M(n, e);
		}
		function ce(e, t, n, r) {
			var i = e;
			return S.string(i) ? i = se(i, t, n) : S.func(i) && (i = i.apply(void 0, r)), S.element(i) && (i = ie(i)), i;
		}
		function le(e) {
			return e && {
				x: "x" in e ? e.x : e.left,
				y: "y" in e ? e.y : e.top
			};
		}
		function ue(e) {
			return !e || "x" in e && "y" in e || ((e = L({}, e)).x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e;
		}
		function de(e, t, n) {
			e.left && (t.left += n.x), e.right && (t.right += n.x), e.top && (t.top += n.y), e.bottom && (t.bottom += n.y), t.width = t.right - t.left, t.height = t.bottom - t.top;
		}
		function fe(e, t, n) {
			var r = n && e.options[n];
			return le(ce(r && r.origin || e.options.origin, e, t, [e && t])) || {
				x: 0,
				y: 0
			};
		}
		function pe(e, t) {
			var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(e) {
				return !0;
			}, r = arguments.length > 3 ? arguments[3] : void 0;
			if (r ||= {}, S.string(e) && e.search(" ") !== -1 && (e = me(e)), S.array(e)) return e.forEach((function(e) {
				return pe(e, t, n, r);
			})), r;
			if (S.object(e) && (t = e, e = ""), S.func(t) && n(e)) r[e] = r[e] || [], r[e].push(t);
			else if (S.array(t)) for (var i = 0, a = t; i < a.length; i++) {
				var o = a[i];
				pe(e, o, n, r);
			}
			else if (S.object(t)) for (var s in t) pe(me(s).map((function(t) {
				return `${e}${t}`;
			})), t[s], n, r);
			return r;
		}
		function me(e) {
			return e.trim().split(/ +/);
		}
		var he = function(e, t) {
			return Math.sqrt(e * e + t * t);
		}, ge = ["webkit", "moz"];
		function _e(e, t) {
			e.__set ||= {};
			var n = function(n) {
				if (ge.some((function(e) {
					return n.indexOf(e) === 0;
				}))) return 1;
				typeof e[n] != "function" && n !== "__set" && Object.defineProperty(e, n, {
					get: function() {
						return n in e.__set ? e.__set[n] : e.__set[n] = t[n];
					},
					set: function(t) {
						e.__set[n] = t;
					},
					configurable: !0
				});
			};
			for (var r in t) n(r);
			return e;
		}
		function ve(e, t) {
			e.page = e.page || {}, e.page.x = t.page.x, e.page.y = t.page.y, e.client = e.client || {}, e.client.x = t.client.x, e.client.y = t.client.y, e.timeStamp = t.timeStamp;
		}
		function ye(e) {
			e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0;
		}
		function be(e) {
			return e instanceof O.Event || e instanceof O.Touch;
		}
		function xe(e, t, n) {
			return e ||= "page", (n ||= {}).x = t[e + "X"], n.y = t[e + "Y"], n;
		}
		function Se(e, t) {
			return t ||= {
				x: 0,
				y: 0
			}, A.isOperaMobile && be(e) ? (xe("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : xe("page", e, t), t;
		}
		function Ce(e) {
			return S.number(e.pointerId) ? e.pointerId : e.identifier;
		}
		function R(e, t, n) {
			var r = t.length > 1 ? Te(t) : t[0];
			Se(r, e.page), function(e, t) {
				t ||= {}, A.isOperaMobile && be(e) ? xe("screen", e, t) : xe("client", e, t);
			}(r, e.client), e.timeStamp = n;
		}
		function we(e) {
			var t = [];
			return S.array(e) ? (t[0] = e[0], t[1] = e[1]) : e.type === "touchend" ? e.touches.length === 1 ? (t[0] = e.touches[0], t[1] = e.changedTouches[0]) : e.touches.length === 0 && (t[0] = e.changedTouches[0], t[1] = e.changedTouches[1]) : (t[0] = e.touches[0], t[1] = e.touches[1]), t;
		}
		function Te(e) {
			for (var t = {
				pageX: 0,
				pageY: 0,
				clientX: 0,
				clientY: 0,
				screenX: 0,
				screenY: 0
			}, n = 0; n < e.length; n++) {
				var r = e[n];
				for (var i in t) t[i] += r[i];
			}
			for (var a in t) t[a] /= e.length;
			return t;
		}
		function Ee(e) {
			if (!e.length) return null;
			var t = we(e), n = Math.min(t[0].pageX, t[1].pageX), r = Math.min(t[0].pageY, t[1].pageY), i = Math.max(t[0].pageX, t[1].pageX), a = Math.max(t[0].pageY, t[1].pageY);
			return {
				x: n,
				y: r,
				left: n,
				top: r,
				right: i,
				bottom: a,
				width: i - n,
				height: a - r
			};
		}
		function De(e, t) {
			var n = t + "X", r = t + "Y", i = we(e);
			return he(i[0][n] - i[1][n], i[0][r] - i[1][r]);
		}
		function Oe(e, t) {
			var n = t + "X", r = t + "Y", i = we(e), a = i[1][n] - i[0][n], o = i[1][r] - i[0][r];
			return 180 * Math.atan2(o, a) / Math.PI;
		}
		function ke(e) {
			return S.string(e.pointerType) ? e.pointerType : S.number(e.pointerType) ? [
				void 0,
				void 0,
				"touch",
				"pen",
				"mouse"
			][e.pointerType] : /touch/.test(e.type || "") || e instanceof O.Touch ? "touch" : "mouse";
		}
		function Ae(e) {
			var t = S.func(e.composedPath) ? e.composedPath() : e.path;
			return [I(t ? t[0] : e.target), I(e.currentTarget)];
		}
		var je = function() {
			function e(t) {
				i(this, e), this.immediatePropagationStopped = !1, this.propagationStopped = !1, this._interaction = t;
			}
			return o(e, [
				{
					key: "preventDefault",
					value: function() {}
				},
				{
					key: "stopPropagation",
					value: function() {
						this.propagationStopped = !0;
					}
				},
				{
					key: "stopImmediatePropagation",
					value: function() {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					}
				}
			]), e;
		}();
		Object.defineProperty(je.prototype, "interaction", {
			get: function() {
				return this._interaction._proxy;
			},
			set: function() {}
		});
		var Me = function(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				e.push(r);
			}
			return e;
		}, Ne = function(e) {
			return Me([], e);
		}, Pe = function(e, t) {
			for (var n = 0; n < e.length; n++) if (t(e[n], n, e)) return n;
			return -1;
		}, Fe = function(e, t) {
			return e[Pe(e, t)];
		}, Ie = function(e) {
			c(n, e);
			var t = f(n);
			function n(e, r, a) {
				var o;
				i(this, n), (o = t.call(this, r._interaction)).dropzone = void 0, o.dragEvent = void 0, o.relatedTarget = void 0, o.draggable = void 0, o.propagationStopped = !1, o.immediatePropagationStopped = !1;
				var s = a === "dragleave" ? e.prev : e.cur, c = s.element, l = s.dropzone;
				return o.type = a, o.target = c, o.currentTarget = c, o.dropzone = l, o.dragEvent = r, o.relatedTarget = r.target, o.draggable = r.interactable, o.timeStamp = r.timeStamp, o;
			}
			return o(n, [
				{
					key: "reject",
					value: function() {
						var e = this, t = this._interaction.dropState;
						if (this.type === "dropactivate" || this.dropzone && t.cur.dropzone === this.dropzone && t.cur.element === this.target) {
							if (t.prev.dropzone = this.dropzone, t.prev.element = this.target, t.rejected = !0, t.events.enter = null, this.stopImmediatePropagation(), this.type === "dropactivate") {
								var r = t.activeDrops, i = Pe(r, (function(t) {
									var n = t.dropzone, r = t.element;
									return n === e.dropzone && r === e.target;
								}));
								t.activeDrops.splice(i, 1);
								var a = new n(t, this.dragEvent, "dropdeactivate");
								a.dropzone = this.dropzone, a.target = this.target, this.dropzone.fire(a);
							} else this.dropzone.fire(new n(t, this.dragEvent, "dragleave"));
						}
					}
				},
				{
					key: "preventDefault",
					value: function() {}
				},
				{
					key: "stopPropagation",
					value: function() {
						this.propagationStopped = !0;
					}
				},
				{
					key: "stopImmediatePropagation",
					value: function() {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					}
				}
			]), n;
		}(je);
		function Le(e, t) {
			for (var n = 0, r = e.slice(); n < r.length; n++) {
				var i = r[n], a = i.dropzone, o = i.element;
				t.dropzone = a, t.target = o, a.fire(t), t.propagationStopped = t.immediatePropagationStopped = !1;
			}
		}
		function Re(e, t) {
			for (var n = function(e, t) {
				for (var n = [], r = 0, i = e.interactables.list; r < i.length; r++) {
					var a = i[r];
					if (a.options.drop.enabled) {
						var o = a.options.drop.accept;
						if (!(S.element(o) && o !== t || S.string(o) && !P(t, o) || S.func(o) && !o({
							dropzone: a,
							draggableElement: t
						}))) for (var s = 0, c = a.getAllElements(); s < c.length; s++) {
							var l = c[s];
							l !== t && n.push({
								dropzone: a,
								element: l,
								rect: a.getRect(l)
							});
						}
					}
				}
				return n;
			}(e, t), r = 0; r < n.length; r++) {
				var i = n[r];
				i.rect = i.dropzone.getRect(i.element);
			}
			return n;
		}
		function ze(e, t, n) {
			for (var r = e.dropState, i = e.interactable, a = e.element, o = [], s = 0, c = r.activeDrops; s < c.length; s++) {
				var l = c[s], u = l.dropzone, d = l.element, f = l.rect, p = u.dropCheck(t, n, i, a, d, f);
				o.push(p ? d : null);
			}
			var m = function(e) {
				for (var t, n, r, i = [], a = 0; a < e.length; a++) {
					var o = e[a], s = e[t];
					if (o && a !== t) {
						if (s) {
							var c = te(o), l = te(s);
							if (c !== o.ownerDocument) {
								if (l !== o.ownerDocument) {
									if (c !== l) {
										i = i.length ? i : ne(s);
										var u = void 0;
										if (s instanceof O.HTMLElement && o instanceof O.SVGElement && !(o instanceof O.SVGSVGElement)) {
											if (o === l) continue;
											u = o.ownerSVGElement;
										} else u = o;
										for (var d = ne(u, s.ownerDocument), f = 0; d[f] && d[f] === i[f];) f++;
										var p = [
											d[f - 1],
											d[f],
											i[f]
										];
										if (p[0]) for (var m = p[0].lastChild; m;) {
											if (m === p[1]) {
												t = a, i = d;
												break;
											}
											if (m === p[2]) break;
											m = m.previousSibling;
										}
									} else r = s, (parseInt(y(n = o).getComputedStyle(n).zIndex, 10) || 0) >= (parseInt(y(r).getComputedStyle(r).zIndex, 10) || 0) && (t = a);
								} else t = a;
							}
						} else t = a;
					}
				}
				return t;
			}(o);
			return r.activeDrops[m] || null;
		}
		function Be(e, t, n) {
			var r = e.dropState, i = {
				enter: null,
				leave: null,
				activate: null,
				deactivate: null,
				move: null,
				drop: null
			};
			return n.type === "dragstart" && (i.activate = new Ie(r, n, "dropactivate"), i.activate.target = null, i.activate.dropzone = null), n.type === "dragend" && (i.deactivate = new Ie(r, n, "dropdeactivate"), i.deactivate.target = null, i.deactivate.dropzone = null), r.rejected || (r.cur.element !== r.prev.element && (r.prev.dropzone && (i.leave = new Ie(r, n, "dragleave"), n.dragLeave = i.leave.target = r.prev.element, n.prevDropzone = i.leave.dropzone = r.prev.dropzone), r.cur.dropzone && (i.enter = new Ie(r, n, "dragenter"), n.dragEnter = r.cur.element, n.dropzone = r.cur.dropzone)), n.type === "dragend" && r.cur.dropzone && (i.drop = new Ie(r, n, "drop"), n.dropzone = r.cur.dropzone, n.relatedTarget = r.cur.element), n.type === "dragmove" && r.cur.dropzone && (i.move = new Ie(r, n, "dropmove"), n.dropzone = r.cur.dropzone)), i;
		}
		function Ve(e, t) {
			var n = e.dropState, r = n.activeDrops, i = n.cur, a = n.prev;
			t.leave && a.dropzone.fire(t.leave), t.enter && i.dropzone.fire(t.enter), t.move && i.dropzone.fire(t.move), t.drop && i.dropzone.fire(t.drop), t.deactivate && Le(r, t.deactivate), n.prev.dropzone = i.dropzone, n.prev.element = i.element;
		}
		function He(e, t) {
			var n = e.interaction, r = e.iEvent, i = e.event;
			if (r.type === "dragmove" || r.type === "dragend") {
				var a = n.dropState;
				t.dynamicDrop && (a.activeDrops = Re(t, n.element));
				var o = r, s = ze(n, o, i);
				a.rejected = a.rejected && !!s && s.dropzone === a.cur.dropzone && s.element === a.cur.element, a.cur.dropzone = s && s.dropzone, a.cur.element = s && s.element, a.events = Be(n, 0, o);
			}
		}
		var Ue = {
			id: "actions/drop",
			install: function(e) {
				var t = e.actions, n = e.interactStatic, r = e.Interactable, i = e.defaults;
				e.usePlugin(ee), r.prototype.dropzone = function(e) {
					return function(e, t) {
						if (S.object(t)) {
							if (e.options.drop.enabled = !1 !== t.enabled, t.listeners) {
								var n = pe(t.listeners), r = Object.keys(n).reduce((function(e, t) {
									return e[/^(enter|leave)/.test(t) ? `drag${t}` : /^(activate|deactivate|move)/.test(t) ? `drop${t}` : t] = n[t], e;
								}), {}), i = e.options.drop.listeners;
								i && e.off(i), e.on(r), e.options.drop.listeners = r;
							}
							return S.func(t.ondrop) && e.on("drop", t.ondrop), S.func(t.ondropactivate) && e.on("dropactivate", t.ondropactivate), S.func(t.ondropdeactivate) && e.on("dropdeactivate", t.ondropdeactivate), S.func(t.ondragenter) && e.on("dragenter", t.ondragenter), S.func(t.ondragleave) && e.on("dragleave", t.ondragleave), S.func(t.ondropmove) && e.on("dropmove", t.ondropmove), /^(pointer|center)$/.test(t.overlap) ? e.options.drop.overlap = t.overlap : S.number(t.overlap) && (e.options.drop.overlap = Math.max(Math.min(1, t.overlap), 0)), "accept" in t && (e.options.drop.accept = t.accept), "checker" in t && (e.options.drop.checker = t.checker), e;
						}
						return S.bool(t) ? (e.options.drop.enabled = t, e) : e.options.drop;
					}(this, e);
				}, r.prototype.dropCheck = function(e, t, n, r, i, a) {
					return function(e, t, n, r, i, a, o) {
						var s = !1;
						if (!(o ||= e.getRect(a))) return !!e.options.drop.checker && e.options.drop.checker(t, n, s, e, a, r, i);
						var c = e.options.drop.overlap;
						if (c === "pointer") {
							var l = fe(r, i, "drag"), u = Se(t);
							u.x += l.x, u.y += l.y;
							var d = u.x > o.left && u.x < o.right, f = u.y > o.top && u.y < o.bottom;
							s = d && f;
						}
						var p = r.getRect(i);
						if (p && c === "center") {
							var m = p.left + p.width / 2, h = p.top + p.height / 2;
							s = m >= o.left && m <= o.right && h >= o.top && h <= o.bottom;
						}
						return p && S.number(c) && (s = Math.max(0, Math.min(o.right, p.right) - Math.max(o.left, p.left)) * Math.max(0, Math.min(o.bottom, p.bottom) - Math.max(o.top, p.top)) / (p.width * p.height) >= c), e.options.drop.checker && (s = e.options.drop.checker(t, n, s, e, a, r, i)), s;
					}(this, e, t, n, r, i, a);
				}, n.dynamicDrop = function(t) {
					return S.bool(t) ? (e.dynamicDrop = t, n) : e.dynamicDrop;
				}, L(t.phaselessTypes, {
					dragenter: !0,
					dragleave: !0,
					dropactivate: !0,
					dropdeactivate: !0,
					dropmove: !0,
					drop: !0
				}), t.methodDict.drop = "dropzone", e.dynamicDrop = !1, i.actions.drop = Ue.defaults;
			},
			listeners: {
				"interactions:before-action-start": function(e) {
					var t = e.interaction;
					t.prepared.name === "drag" && (t.dropState = {
						cur: {
							dropzone: null,
							element: null
						},
						prev: {
							dropzone: null,
							element: null
						},
						rejected: null,
						events: null,
						activeDrops: []
					});
				},
				"interactions:after-action-start": function(e, t) {
					var n = e.interaction, r = (e.event, e.iEvent);
					if (n.prepared.name === "drag") {
						var i = n.dropState;
						i.activeDrops = [], i.events = {}, i.activeDrops = Re(t, n.element), i.events = Be(n, 0, r), i.events.activate && (Le(i.activeDrops, i.events.activate), t.fire("actions/drop:start", {
							interaction: n,
							dragEvent: r
						}));
					}
				},
				"interactions:action-move": He,
				"interactions:after-action-move": function(e, t) {
					var n = e.interaction, r = e.iEvent;
					if (n.prepared.name === "drag") {
						var i = n.dropState;
						Ve(n, i.events), t.fire("actions/drop:move", {
							interaction: n,
							dragEvent: r
						}), i.events = {};
					}
				},
				"interactions:action-end": function(e, t) {
					if (e.interaction.prepared.name === "drag") {
						var n = e.interaction, r = e.iEvent;
						He(e, t), Ve(n, n.dropState.events), t.fire("actions/drop:end", {
							interaction: n,
							dragEvent: r
						});
					}
				},
				"interactions:stop": function(e) {
					var t = e.interaction;
					if (t.prepared.name === "drag") {
						var n = t.dropState;
						n && (n.activeDrops = null, n.events = null, n.cur.dropzone = null, n.cur.element = null, n.prev.dropzone = null, n.prev.element = null, n.rejected = !1);
					}
				}
			},
			getActiveDrops: Re,
			getDrop: ze,
			getDropEvents: Be,
			fireDropEvents: Ve,
			filterEventType: function(e) {
				return e.search("drag") === 0 || e.search("drop") === 0;
			},
			defaults: {
				enabled: !1,
				accept: null,
				overlap: "pointer"
			}
		}, We = Ue;
		function Ge(e) {
			var t = e.interaction, n = e.iEvent, r = e.phase;
			if (t.prepared.name === "gesture") {
				var i = t.pointers.map((function(e) {
					return e.pointer;
				})), a = r === "start", o = r === "end", s = t.interactable.options.deltaSource;
				if (n.touches = [i[0], i[1]], a) n.distance = De(i, s), n.box = Ee(i), n.scale = 1, n.ds = 0, n.angle = Oe(i, s), n.da = 0, t.gesture.startDistance = n.distance, t.gesture.startAngle = n.angle;
				else if (o || t.pointers.length < 2) {
					var c = t.prevEvent;
					n.distance = c.distance, n.box = c.box, n.scale = c.scale, n.ds = 0, n.angle = c.angle, n.da = 0;
				} else n.distance = De(i, s), n.box = Ee(i), n.scale = n.distance / t.gesture.startDistance, n.angle = Oe(i, s), n.ds = n.scale - t.gesture.scale, n.da = n.angle - t.gesture.angle;
				t.gesture.distance = n.distance, t.gesture.angle = n.angle, S.number(n.scale) && n.scale !== 1 / 0 && !isNaN(n.scale) && (t.gesture.scale = n.scale);
			}
		}
		var Ke = {
			id: "actions/gesture",
			before: ["actions/drag", "actions/resize"],
			install: function(e) {
				var t = e.actions, n = e.Interactable, r = e.defaults;
				n.prototype.gesturable = function(e) {
					return S.object(e) ? (this.options.gesture.enabled = !1 !== e.enabled, this.setPerAction("gesture", e), this.setOnEvents("gesture", e), this) : S.bool(e) ? (this.options.gesture.enabled = e, this) : this.options.gesture;
				}, t.map.gesture = Ke, t.methodDict.gesture = "gesturable", r.actions.gesture = Ke.defaults;
			},
			listeners: {
				"interactions:action-start": Ge,
				"interactions:action-move": Ge,
				"interactions:action-end": Ge,
				"interactions:new": function(e) {
					e.interaction.gesture = {
						angle: 0,
						distance: 0,
						scale: 1,
						startAngle: 0,
						startDistance: 0
					};
				},
				"auto-start:check": function(e) {
					if (!(e.interaction.pointers.length < 2)) {
						var t = e.interactable.options.gesture;
						if (t && t.enabled) return e.action = { name: "gesture" }, !1;
					}
				}
			},
			defaults: {},
			getCursor: function() {
				return "";
			},
			filterEventType: function(e) {
				return e.search("gesture") === 0;
			}
		}, qe = Ke;
		function Je(e, t, n, r, i, a, o) {
			if (!t) return !1;
			if (!0 === t) {
				var s = S.number(a.width) ? a.width : a.right - a.left, c = S.number(a.height) ? a.height : a.bottom - a.top;
				if (o = Math.min(o, Math.abs((e === "left" || e === "right" ? s : c) / 2)), s < 0 && (e === "left" ? e = "right" : e === "right" && (e = "left")), c < 0 && (e === "top" ? e = "bottom" : e === "bottom" && (e = "top")), e === "left") {
					var l = s >= 0 ? a.left : a.right;
					return n.x < l + o;
				}
				if (e === "top") {
					var u = c >= 0 ? a.top : a.bottom;
					return n.y < u + o;
				}
				if (e === "right") return n.x > (s >= 0 ? a.right : a.left) - o;
				if (e === "bottom") return n.y > (c >= 0 ? a.bottom : a.top) - o;
			}
			return !!S.element(r) && (S.element(t) ? t === r : F(r, t, i));
		}
		function Ye(e) {
			var t = e.iEvent, n = e.interaction;
			if (n.prepared.name === "resize" && n.resizeAxes) {
				var r = t;
				n.interactable.options.resize.square ? (n.resizeAxes === "y" ? r.delta.x = r.delta.y : r.delta.y = r.delta.x, r.axes = "xy") : (r.axes = n.resizeAxes, n.resizeAxes === "x" ? r.delta.y = 0 : n.resizeAxes === "y" && (r.delta.x = 0));
			}
		}
		var Xe, Ze, Qe = {
			id: "actions/resize",
			before: ["actions/drag"],
			install: function(e) {
				var t = e.actions, n = e.browser, r = e.Interactable, i = e.defaults;
				Qe.cursors = function(e) {
					return e.isIe9 ? {
						x: "e-resize",
						y: "s-resize",
						xy: "se-resize",
						top: "n-resize",
						left: "w-resize",
						bottom: "s-resize",
						right: "e-resize",
						topleft: "se-resize",
						bottomright: "se-resize",
						topright: "ne-resize",
						bottomleft: "ne-resize"
					} : {
						x: "ew-resize",
						y: "ns-resize",
						xy: "nwse-resize",
						top: "ns-resize",
						left: "ew-resize",
						bottom: "ns-resize",
						right: "ew-resize",
						topleft: "nwse-resize",
						bottomright: "nwse-resize",
						topright: "nesw-resize",
						bottomleft: "nesw-resize"
					};
				}(n), Qe.defaultMargin = n.supportsTouch || n.supportsPointerEvent ? 20 : 10, r.prototype.resizable = function(t) {
					return function(e, t, n) {
						return S.object(t) ? (e.options.resize.enabled = !1 !== t.enabled, e.setPerAction("resize", t), e.setOnEvents("resize", t), S.string(t.axis) && /^x$|^y$|^xy$/.test(t.axis) ? e.options.resize.axis = t.axis : t.axis === null && (e.options.resize.axis = n.defaults.actions.resize.axis), S.bool(t.preserveAspectRatio) ? e.options.resize.preserveAspectRatio = t.preserveAspectRatio : S.bool(t.square) && (e.options.resize.square = t.square), e) : S.bool(t) ? (e.options.resize.enabled = t, e) : e.options.resize;
					}(this, t, e);
				}, t.map.resize = Qe, t.methodDict.resize = "resizable", i.actions.resize = Qe.defaults;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.resizeAxes = "xy";
				},
				"interactions:action-start": function(e) {
					(function(e) {
						var t = e.iEvent, n = e.interaction;
						if (n.prepared.name === "resize" && n.prepared.edges) {
							var r = t, i = n.rect;
							n._rects = {
								start: L({}, i),
								corrected: L({}, i),
								previous: L({}, i),
								delta: {
									left: 0,
									right: 0,
									width: 0,
									top: 0,
									bottom: 0,
									height: 0
								}
							}, r.edges = n.prepared.edges, r.rect = n._rects.corrected, r.deltaRect = n._rects.delta;
						}
					})(e), Ye(e);
				},
				"interactions:action-move": function(e) {
					(function(e) {
						var t = e.iEvent, n = e.interaction;
						if (n.prepared.name === "resize" && n.prepared.edges) {
							var r = t, i = n.interactable.options.resize.invert, a = i === "reposition" || i === "negate", o = n.rect, s = n._rects, c = s.start, l = s.corrected, u = s.delta, d = s.previous;
							if (L(d, l), a) {
								if (L(l, o), i === "reposition") {
									if (l.top > l.bottom) {
										var f = l.top;
										l.top = l.bottom, l.bottom = f;
									}
									if (l.left > l.right) {
										var p = l.left;
										l.left = l.right, l.right = p;
									}
								}
							} else l.top = Math.min(o.top, c.bottom), l.bottom = Math.max(o.bottom, c.top), l.left = Math.min(o.left, c.right), l.right = Math.max(o.right, c.left);
							for (var m in l.width = l.right - l.left, l.height = l.bottom - l.top, l) u[m] = l[m] - d[m];
							r.edges = n.prepared.edges, r.rect = l, r.deltaRect = u;
						}
					})(e), Ye(e);
				},
				"interactions:action-end": function(e) {
					var t = e.iEvent, n = e.interaction;
					if (n.prepared.name === "resize" && n.prepared.edges) {
						var r = t;
						r.edges = n.prepared.edges, r.rect = n._rects.corrected, r.deltaRect = n._rects.delta;
					}
				},
				"auto-start:check": function(e) {
					var t = e.interaction, n = e.interactable, r = e.element, i = e.rect, a = e.buttons;
					if (i) {
						var o = L({}, t.coords.cur.page), s = n.options.resize;
						if (s && s.enabled && (!t.pointerIsDown || !/mouse|pointer/.test(t.pointerType) || (a & s.mouseButtons) != 0)) {
							if (S.object(s.edges)) {
								var c = {
									left: !1,
									right: !1,
									top: !1,
									bottom: !1
								};
								for (var l in c) c[l] = Je(l, s.edges[l], o, t._latestPointer.eventTarget, r, i, s.margin || Qe.defaultMargin);
								c.left = c.left && !c.right, c.top = c.top && !c.bottom, (c.left || c.right || c.top || c.bottom) && (e.action = {
									name: "resize",
									edges: c
								});
							} else {
								var u = s.axis !== "y" && o.x > i.right - Qe.defaultMargin, d = s.axis !== "x" && o.y > i.bottom - Qe.defaultMargin;
								(u || d) && (e.action = {
									name: "resize",
									axes: (u ? "x" : "") + (d ? "y" : "")
								});
							}
							return !e.action && void 0;
						}
					}
				}
			},
			defaults: {
				square: !1,
				preserveAspectRatio: !1,
				axis: "xy",
				margin: NaN,
				edges: null,
				invert: "none"
			},
			cursors: null,
			getCursor: function(e) {
				var t = e.edges, n = e.axis, r = e.name, i = Qe.cursors, a = null;
				if (n) a = i[r + n];
				else if (t) {
					for (var o = "", s = 0, c = [
						"top",
						"bottom",
						"left",
						"right"
					]; s < c.length; s++) {
						var l = c[s];
						t[l] && (o += l);
					}
					a = i[o];
				}
				return a;
			},
			filterEventType: function(e) {
				return e.search("resize") === 0;
			},
			defaultMargin: null
		}, $e = Qe, et = {
			id: "actions",
			install: function(e) {
				e.usePlugin(qe), e.usePlugin($e), e.usePlugin(ee), e.usePlugin(We);
			}
		}, tt = 0, nt = {
			request: function(e) {
				return Xe(e);
			},
			cancel: function(e) {
				return Ze(e);
			},
			init: function(e) {
				if (Xe = e.requestAnimationFrame, Ze = e.cancelAnimationFrame, !Xe) for (var t = [
					"ms",
					"moz",
					"webkit",
					"o"
				], n = 0; n < t.length; n++) {
					var r = t[n];
					Xe = e[`${r}RequestAnimationFrame`], Ze = e[`${r}CancelAnimationFrame`] || e[`${r}CancelRequestAnimationFrame`];
				}
				Xe &&= Xe.bind(e), Ze &&= Ze.bind(e), Xe || (Xe = function(t) {
					var n = Date.now(), r = Math.max(0, 16 - (n - tt)), i = e.setTimeout((function() {
						t(n + r);
					}), r);
					return tt = n + r, i;
				}, Ze = function(e) {
					return clearTimeout(e);
				});
			}
		}, z = {
			defaults: {
				enabled: !1,
				margin: 60,
				container: null,
				speed: 300
			},
			now: Date.now,
			interaction: null,
			i: 0,
			x: 0,
			y: 0,
			isScrolling: !1,
			prevTime: 0,
			margin: 0,
			speed: 0,
			start: function(e) {
				z.isScrolling = !0, nt.cancel(z.i), e.autoScroll = z, z.interaction = e, z.prevTime = z.now(), z.i = nt.request(z.scroll);
			},
			stop: function() {
				z.isScrolling = !1, z.interaction && (z.interaction.autoScroll = null), nt.cancel(z.i);
			},
			scroll: function() {
				var e = z.interaction, t = e.interactable, n = e.element, r = e.prepared.name, i = t.options[r].autoScroll, a = rt(i.container, t, n), o = z.now(), s = (o - z.prevTime) / 1e3, c = i.speed * s;
				if (c >= 1) {
					var l = {
						x: z.x * c,
						y: z.y * c
					};
					if (l.x || l.y) {
						var u = it(a);
						S.window(a) ? a.scrollBy(l.x, l.y) : a && (a.scrollLeft += l.x, a.scrollTop += l.y);
						var d = it(a), f = {
							x: d.x - u.x,
							y: d.y - u.y
						};
						(f.x || f.y) && t.fire({
							type: "autoscroll",
							target: n,
							interactable: t,
							delta: f,
							interaction: e,
							container: a
						});
					}
					z.prevTime = o;
				}
				z.isScrolling && (nt.cancel(z.i), z.i = nt.request(z.scroll));
			},
			check: function(e, t) {
				return e.options[t].autoScroll?.enabled;
			},
			onInteractionMove: function(e) {
				var t = e.interaction, n = e.pointer;
				if (t.interacting() && z.check(t.interactable, t.prepared.name)) {
					if (t.simulation) z.x = z.y = 0;
					else {
						var r, i, a, o, s = t.interactable, c = t.element, l = t.prepared.name, u = s.options[l].autoScroll, d = rt(u.container, s, c);
						if (S.window(d)) o = n.clientX < z.margin, r = n.clientY < z.margin, i = n.clientX > d.innerWidth - z.margin, a = n.clientY > d.innerHeight - z.margin;
						else {
							var f = re(d);
							o = n.clientX < f.left + z.margin, r = n.clientY < f.top + z.margin, i = n.clientX > f.right - z.margin, a = n.clientY > f.bottom - z.margin;
						}
						z.x = i ? 1 : o ? -1 : 0, z.y = a ? 1 : r ? -1 : 0, z.isScrolling || (z.margin = u.margin, z.speed = u.speed, z.start(t));
					}
				}
			}
		};
		function rt(e, t, n) {
			return (S.string(e) ? se(e, t, n) : e) || y(n);
		}
		function it(e) {
			return S.window(e) && (e = window.document.body), {
				x: e.scrollLeft,
				y: e.scrollTop
			};
		}
		var at = {
			id: "auto-scroll",
			install: function(e) {
				var t = e.defaults, n = e.actions;
				e.autoScroll = z, z.now = function() {
					return e.now();
				}, n.phaselessTypes.autoscroll = !0, t.perAction.autoScroll = z.defaults;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.autoScroll = null;
				},
				"interactions:destroy": function(e) {
					e.interaction.autoScroll = null, z.stop(), z.interaction &&= null;
				},
				"interactions:stop": z.stop,
				"interactions:action-move": function(e) {
					return z.onInteractionMove(e);
				}
			}
		};
		function ot(e, t) {
			var n = !1;
			return function() {
				return n ||= (_.console.warn(t), !0), e.apply(this, arguments);
			};
		}
		function st(e, t) {
			return e.name = t.name, e.axis = t.axis, e.edges = t.edges, e;
		}
		function ct(e) {
			return S.bool(e) ? (this.options.styleCursor = e, this) : e === null ? (delete this.options.styleCursor, this) : this.options.styleCursor;
		}
		function lt(e) {
			return S.func(e) ? (this.options.actionChecker = e, this) : e === null ? (delete this.options.actionChecker, this) : this.options.actionChecker;
		}
		var ut = {
			id: "auto-start/interactableMethods",
			install: function(e) {
				var t = e.Interactable;
				t.prototype.getAction = function(t, n, r, i) {
					var a = function(e, t, n, r, i) {
						var a = {
							action: null,
							interactable: e,
							interaction: n,
							element: r,
							rect: e.getRect(r),
							buttons: t.buttons || {
								0: 1,
								1: 4,
								3: 8,
								4: 16
							}[t.button]
						};
						return i.fire("auto-start:check", a), a.action;
					}(this, n, r, i, e);
					return this.options.actionChecker ? this.options.actionChecker(t, n, a, this, i, r) : a;
				}, t.prototype.ignoreFrom = ot((function(e) {
					return this._backCompatOption("ignoreFrom", e);
				}), "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = ot((function(e) {
					return this._backCompatOption("allowFrom", e);
				}), "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), t.prototype.actionChecker = lt, t.prototype.styleCursor = ct;
			}
		};
		function dt(e, t, n, r, i) {
			return t.testIgnoreAllow(t.options[e.name], n, r) && t.options[e.name].enabled && ht(t, n, e, i) ? e : null;
		}
		function ft(e, t, n, r, i, a, o) {
			for (var s = 0, c = r.length; s < c; s++) {
				var l = r[s], u = i[s], d = l.getAction(t, n, e, u);
				if (d) {
					var f = dt(d, l, u, a, o);
					if (f) return {
						action: f,
						interactable: l,
						element: u
					};
				}
			}
			return {
				action: null,
				interactable: null,
				element: null
			};
		}
		function pt(e, t, n, r, i) {
			var a = [], o = [], s = r;
			function c(e) {
				a.push(e), o.push(s);
			}
			for (; S.element(s);) {
				a = [], o = [], i.interactables.forEachMatch(s, c);
				var l = ft(e, t, n, a, o, r, i);
				if (l.action && !l.interactable.options[l.action.name].manualStart) return l;
				s = N(s);
			}
			return {
				action: null,
				interactable: null,
				element: null
			};
		}
		function mt(e, t, n) {
			var r = t.action, i = t.interactable, a = t.element;
			r ||= { name: null }, e.interactable = i, e.element = a, st(e.prepared, r), e.rect = i && r.name ? i.getRect(a) : null, B(e, n), n.fire("autoStart:prepared", { interaction: e });
		}
		function ht(e, t, n, r) {
			var i = e.options, a = i[n.name].max, o = i[n.name].maxPerElement, s = r.autoStart.maxInteractions, c = 0, l = 0, u = 0;
			if (!(a && o && s)) return !1;
			for (var d = 0, f = r.interactions.list; d < f.length; d++) {
				var p = f[d], m = p.prepared.name;
				if (p.interacting() && (++c >= s || p.interactable === e && ((l += +(m === n.name)) >= a || p.element === t && (u++, m === n.name && u >= o)))) return !1;
			}
			return s > 0;
		}
		function gt(e, t) {
			return S.number(e) ? (t.autoStart.maxInteractions = e, this) : t.autoStart.maxInteractions;
		}
		function _t(e, t, n) {
			var r = n.autoStart.cursorElement;
			r && r !== e && (r.style.cursor = ""), e.ownerDocument.documentElement.style.cursor = t, e.style.cursor = t, n.autoStart.cursorElement = t ? e : null;
		}
		function B(e, t) {
			var n = e.interactable, r = e.element, i = e.prepared;
			if (e.pointerType === "mouse" && n && n.options.styleCursor) {
				var a = "";
				if (i.name) {
					var o = n.options[i.name].cursorChecker;
					a = S.func(o) ? o(i, n, r, e._interacting) : t.actions.map[i.name].getCursor(i);
				}
				_t(e.element, a || "", t);
			} else t.autoStart.cursorElement && _t(t.autoStart.cursorElement, "", t);
		}
		var vt = {
			id: "auto-start/base",
			before: ["actions"],
			install: function(e) {
				var t = e.interactStatic, n = e.defaults;
				e.usePlugin(ut), n.base.actionChecker = null, n.base.styleCursor = !0, L(n.perAction, {
					manualStart: !1,
					max: 1 / 0,
					maxPerElement: 1,
					allowFrom: null,
					ignoreFrom: null,
					mouseButtons: 1
				}), t.maxInteractions = function(t) {
					return gt(t, e);
				}, e.autoStart = {
					maxInteractions: 1 / 0,
					withinInteractionLimit: ht,
					cursorElement: null
				};
			},
			listeners: {
				"interactions:down": function(e, t) {
					var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
					n.interacting() || mt(n, pt(n, r, i, a, t), t);
				},
				"interactions:move": function(e, t) {
					(function(e, t) {
						var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
						n.pointerType !== "mouse" || n.pointerIsDown || n.interacting() || mt(n, pt(n, r, i, a, t), t);
					})(e, t), function(e, t) {
						var n = e.interaction;
						if (n.pointerIsDown && !n.interacting() && n.pointerWasMoved && n.prepared.name) {
							t.fire("autoStart:before-start", e);
							var r = n.interactable, i = n.prepared.name;
							i && r && (r.options[i].manualStart || !ht(r, n.element, n.prepared, t) ? n.stop() : (n.start(n.prepared, r, n.element), B(n, t)));
						}
					}(e, t);
				},
				"interactions:stop": function(e, t) {
					var n = e.interaction, r = n.interactable;
					r && r.options.styleCursor && _t(n.element, "", t);
				}
			},
			maxInteractions: gt,
			withinInteractionLimit: ht,
			validateAction: dt
		}, yt = {
			id: "auto-start/dragAxis",
			listeners: { "autoStart:before-start": function(e, t) {
				var n = e.interaction, r = e.eventTarget, i = e.dx, a = e.dy;
				if (n.prepared.name === "drag") {
					var o = Math.abs(i), s = Math.abs(a), c = n.interactable.options.drag, l = c.startAxis, u = o > s ? "x" : o < s ? "y" : "xy";
					if (n.prepared.axis = c.lockAxis === "start" ? u[0] : c.lockAxis, u !== "xy" && l !== "xy" && l !== u) {
						n.prepared.name = null;
						for (var d = r, f = function(e) {
							if (e !== n.interactable) {
								var i = n.interactable.options.drag;
								if (!i.manualStart && e.testIgnoreAllow(i, d, r)) {
									var a = e.getAction(n.downPointer, n.downEvent, n, d);
									if (a && a.name === "drag" && function(e, t) {
										if (!t) return !1;
										var n = t.options.drag.startAxis;
										return e === "xy" || n === "xy" || n === e;
									}(u, e) && vt.validateAction(a, e, d, r, t)) return e;
								}
							}
						}; S.element(d);) {
							var p = t.interactables.forEachMatch(d, f);
							if (p) {
								n.prepared.name = "drag", n.interactable = p, n.element = d;
								break;
							}
							d = N(d);
						}
					}
				}
			} }
		};
		function bt(e) {
			var t = e.prepared && e.prepared.name;
			if (!t) return null;
			var n = e.interactable.options;
			return n[t].hold || n[t].delay;
		}
		var xt = {
			id: "auto-start/hold",
			install: function(e) {
				var t = e.defaults;
				e.usePlugin(vt), t.perAction.hold = 0, t.perAction.delay = 0;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.autoStartHoldTimer = null;
				},
				"autoStart:prepared": function(e) {
					var t = e.interaction, n = bt(t);
					n > 0 && (t.autoStartHoldTimer = setTimeout((function() {
						t.start(t.prepared, t.interactable, t.element);
					}), n));
				},
				"interactions:move": function(e) {
					var t = e.interaction, n = e.duplicate;
					t.autoStartHoldTimer && t.pointerWasMoved && !n && (clearTimeout(t.autoStartHoldTimer), t.autoStartHoldTimer = null);
				},
				"autoStart:before-start": function(e) {
					var t = e.interaction;
					bt(t) > 0 && (t.prepared.name = null);
				}
			},
			getHoldDuration: bt
		}, St = {
			id: "auto-start",
			install: function(e) {
				e.usePlugin(vt), e.usePlugin(xt), e.usePlugin(yt);
			}
		}, V = function(e) {
			return /^(always|never|auto)$/.test(e) ? (this.options.preventDefault = e, this) : S.bool(e) ? (this.options.preventDefault = e ? "always" : "never", this) : this.options.preventDefault;
		};
		function Ct(e) {
			var t = e.interaction, n = e.event;
			t.interactable && t.interactable.checkAndPreventDefault(n);
		}
		var wt = {
			id: "core/interactablePreventDefault",
			install: function(e) {
				var t = e.Interactable;
				t.prototype.preventDefault = V, t.prototype.checkAndPreventDefault = function(t) {
					return function(e, t, n) {
						var r = e.options.preventDefault;
						if (r !== "never") {
							if (r !== "always") {
								if (t.events.supportsPassive && /^touch(start|move)$/.test(n.type)) {
									var i = y(n.target).document, a = t.getDocOptions(i);
									if (!a || !a.events || !1 !== a.events.passive) return;
								}
								/^(mouse|pointer|touch)*(down|start)/i.test(n.type) || S.element(n.target) && P(n.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n.preventDefault();
							} else n.preventDefault();
						}
					}(this, e, t);
				}, e.interactions.docEvents.push({
					type: "dragstart",
					listener: function(t) {
						for (var n = 0, r = e.interactions.list; n < r.length; n++) {
							var i = r[n];
							if (i.element && (i.element === t.target || j(i.element, t.target))) return void i.interactable.checkAndPreventDefault(t);
						}
					}
				});
			},
			listeners: [
				"down",
				"move",
				"up",
				"cancel"
			].reduce((function(e, t) {
				return e[`interactions:${t}`] = Ct, e;
			}), {})
		};
		function Tt(e, t) {
			if (t.phaselessTypes[e]) return !0;
			for (var n in t.map) if (e.indexOf(n) === 0 && e.substr(n.length) in t.phases) return !0;
			return !1;
		}
		function Et(e) {
			var t = {};
			for (var n in e) {
				var r = e[n];
				t[n] = S.plainObject(r) ? Et(r) : S.array(r) ? Ne(r) : r;
			}
			return t;
		}
		var Dt = function() {
			function e(t) {
				i(this, e), this.states = [], this.startOffset = {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = t, this.result = Ot(), this.edges = {
					left: !1,
					right: !1,
					top: !1,
					bottom: !1
				};
			}
			return o(e, [
				{
					key: "start",
					value: function(e, t) {
						var n, r, i = e.phase, a = this.interaction, o = function(e) {
							var t = e.interactable.options[e.prepared.name], n = t.modifiers;
							return n && n.length ? n : [
								"snap",
								"snapSize",
								"snapEdges",
								"restrict",
								"restrictEdges",
								"restrictSize"
							].map((function(e) {
								var n = t[e];
								return n && n.enabled && {
									options: n,
									methods: n._methods
								};
							})).filter((function(e) {
								return !!e;
							}));
						}(a);
						this.prepareStates(o), this.startEdges = L({}, a.edges), this.edges = L({}, this.startEdges), this.startOffset = (n = a.rect, r = t, n ? {
							left: r.x - n.left,
							top: r.y - n.top,
							right: n.right - r.x,
							bottom: n.bottom - r.y
						} : {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0
						}), this.startDelta = {
							x: 0,
							y: 0
						};
						var s = this.fillArg({
							phase: i,
							pageCoords: t,
							preEnd: !1
						});
						return this.result = Ot(), this.startAll(s), this.result = this.setAll(s);
					}
				},
				{
					key: "fillArg",
					value: function(e) {
						var t = this.interaction;
						return e.interaction = t, e.interactable = t.interactable, e.element = t.element, e.rect ||= t.rect, e.edges ||= this.startEdges, e.startOffset = this.startOffset, e;
					}
				},
				{
					key: "startAll",
					value: function(e) {
						for (var t = 0, n = this.states; t < n.length; t++) {
							var r = n[t];
							r.methods.start && (e.state = r, r.methods.start(e));
						}
					}
				},
				{
					key: "setAll",
					value: function(e) {
						var t = e.phase, n = e.preEnd, r = e.skipModifiers, i = e.rect, a = e.edges;
						e.coords = L({}, e.pageCoords), e.rect = L({}, i), e.edges = L({}, a);
						for (var o = r ? this.states.slice(r) : this.states, s = Ot(e.coords, e.rect), c = 0; c < o.length; c++) {
							var l, u = o[c], d = u.options, f = L({}, e.coords), p = null;
							(l = u.methods) != null && l.set && this.shouldDo(d, n, t) && (e.state = u, p = u.methods.set(e), de(e.edges, e.rect, {
								x: e.coords.x - f.x,
								y: e.coords.y - f.y
							})), s.eventProps.push(p);
						}
						L(this.edges, e.edges), s.delta.x = e.coords.x - e.pageCoords.x, s.delta.y = e.coords.y - e.pageCoords.y, s.rectDelta.left = e.rect.left - i.left, s.rectDelta.right = e.rect.right - i.right, s.rectDelta.top = e.rect.top - i.top, s.rectDelta.bottom = e.rect.bottom - i.bottom;
						var m = this.result.coords, h = this.result.rect;
						return m && h && (s.changed = s.rect.left !== h.left || s.rect.right !== h.right || s.rect.top !== h.top || s.rect.bottom !== h.bottom || m.x !== s.coords.x || m.y !== s.coords.y), s;
					}
				},
				{
					key: "applyToInteraction",
					value: function(e) {
						var t = this.interaction, n = e.phase, r = t.coords.cur, i = t.coords.start, a = this.result, o = this.startDelta, s = a.delta;
						n === "start" && L(this.startDelta, a.delta);
						for (var c = 0, l = [[i, o], [r, s]]; c < l.length; c++) {
							var u = l[c], d = u[0], f = u[1];
							d.page.x += f.x, d.page.y += f.y, d.client.x += f.x, d.client.y += f.y;
						}
						var p = this.result.rectDelta, m = e.rect || t.rect;
						m.left += p.left, m.right += p.right, m.top += p.top, m.bottom += p.bottom, m.width = m.right - m.left, m.height = m.bottom - m.top;
					}
				},
				{
					key: "setAndApply",
					value: function(e) {
						var t = this.interaction, n = e.phase, r = e.preEnd, i = e.skipModifiers, a = this.setAll(this.fillArg({
							preEnd: r,
							phase: n,
							pageCoords: e.modifiedCoords || t.coords.cur.page
						}));
						if (this.result = a, !a.changed && (!i || i < this.states.length) && t.interacting()) return !1;
						if (e.modifiedCoords) {
							var o = t.coords.cur.page, s = {
								x: e.modifiedCoords.x - o.x,
								y: e.modifiedCoords.y - o.y
							};
							a.coords.x += s.x, a.coords.y += s.y, a.delta.x += s.x, a.delta.y += s.y;
						}
						this.applyToInteraction(e);
					}
				},
				{
					key: "beforeEnd",
					value: function(e) {
						var t = e.interaction, n = e.event, r = this.states;
						if (r && r.length) {
							for (var i = !1, a = 0; a < r.length; a++) {
								var o = r[a];
								e.state = o;
								var s = o.options, c = o.methods, l = c.beforeEnd && c.beforeEnd(e);
								if (l) return this.endResult = l, !1;
								i ||= !i && this.shouldDo(s, !0, e.phase, !0);
							}
							i && t.move({
								event: n,
								preEnd: !0
							});
						}
					}
				},
				{
					key: "stop",
					value: function(e) {
						var t = e.interaction;
						if (this.states && this.states.length) {
							var n = L({
								states: this.states,
								interactable: t.interactable,
								element: t.element,
								rect: null
							}, e);
							this.fillArg(n);
							for (var r = 0, i = this.states; r < i.length; r++) {
								var a = i[r];
								n.state = a, a.methods.stop && a.methods.stop(n);
							}
							this.states = null, this.endResult = null;
						}
					}
				},
				{
					key: "prepareStates",
					value: function(e) {
						this.states = [];
						for (var t = 0; t < e.length; t++) {
							var n = e[t], r = n.options, i = n.methods, a = n.name;
							this.states.push({
								options: r,
								methods: i,
								index: t,
								name: a
							});
						}
						return this.states;
					}
				},
				{
					key: "restoreInteractionCoords",
					value: function(e) {
						var t = e.interaction, n = t.coords, r = t.rect, i = t.modification;
						if (i.result) {
							for (var a = i.startDelta, o = i.result, s = o.delta, c = o.rectDelta, l = 0, u = [[n.start, a], [n.cur, s]]; l < u.length; l++) {
								var d = u[l], f = d[0], p = d[1];
								f.page.x -= p.x, f.page.y -= p.y, f.client.x -= p.x, f.client.y -= p.y;
							}
							r.left -= c.left, r.right -= c.right, r.top -= c.top, r.bottom -= c.bottom;
						}
					}
				},
				{
					key: "shouldDo",
					value: function(e, t, n, r) {
						return !(!e || !1 === e.enabled || r && !e.endOnly || e.endOnly && !t || n === "start" && !e.setStart);
					}
				},
				{
					key: "copyFrom",
					value: function(e) {
						this.startOffset = e.startOffset, this.startDelta = e.startDelta, this.startEdges = e.startEdges, this.edges = e.edges, this.states = e.states.map((function(e) {
							return Et(e);
						})), this.result = Ot(L({}, e.result.coords), L({}, e.result.rect));
					}
				},
				{
					key: "destroy",
					value: function() {
						for (var e in this) this[e] = null;
					}
				}
			]), e;
		}();
		function Ot(e, t) {
			return {
				rect: t,
				coords: e,
				delta: {
					x: 0,
					y: 0
				},
				rectDelta: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				},
				eventProps: [],
				changed: !0
			};
		}
		function kt(e, t) {
			var n = e.defaults, r = {
				start: e.start,
				set: e.set,
				beforeEnd: e.beforeEnd,
				stop: e.stop
			}, i = function(e) {
				var i = e || {};
				for (var a in i.enabled = !1 !== i.enabled, n) a in i || (i[a] = n[a]);
				var o = {
					options: i,
					methods: r,
					name: t,
					enable: function() {
						return i.enabled = !0, o;
					},
					disable: function() {
						return i.enabled = !1, o;
					}
				};
				return o;
			};
			return t && typeof t == "string" && (i._defaults = n, i._methods = r), i;
		}
		function At(e) {
			var t = e.iEvent, n = e.interaction.modification.result;
			n && (t.modifiers = n.eventProps);
		}
		var jt = {
			id: "modifiers/base",
			before: ["actions"],
			install: function(e) {
				e.defaults.perAction.modifiers = [];
			},
			listeners: {
				"interactions:new": function(e) {
					var t = e.interaction;
					t.modification = new Dt(t);
				},
				"interactions:before-action-start": function(e) {
					var t = e.interaction, n = e.interaction.modification;
					n.start(e, t.coords.start.page), t.edges = n.edges, n.applyToInteraction(e);
				},
				"interactions:before-action-move": function(e) {
					var t = e.interaction, n = t.modification, r = n.setAndApply(e);
					return t.edges = n.edges, r;
				},
				"interactions:before-action-end": function(e) {
					var t = e.interaction, n = t.modification, r = n.beforeEnd(e);
					return t.edges = n.startEdges, r;
				},
				"interactions:action-start": At,
				"interactions:action-move": At,
				"interactions:action-end": At,
				"interactions:after-action-start": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				},
				"interactions:after-action-move": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				},
				"interactions:stop": function(e) {
					return e.interaction.modification.stop(e);
				}
			}
		}, Mt = {
			base: {
				preventDefault: "auto",
				deltaSource: "page"
			},
			perAction: {
				enabled: !1,
				origin: {
					x: 0,
					y: 0
				}
			},
			actions: {}
		}, Nt = function(e) {
			c(n, e);
			var t = f(n);
			function n(e, r, a, o, s, c, l) {
				var u;
				i(this, n), (u = t.call(this, e)).relatedTarget = null, u.screenX = void 0, u.screenY = void 0, u.button = void 0, u.buttons = void 0, u.ctrlKey = void 0, u.shiftKey = void 0, u.altKey = void 0, u.metaKey = void 0, u.page = void 0, u.client = void 0, u.delta = void 0, u.rect = void 0, u.x0 = void 0, u.y0 = void 0, u.t0 = void 0, u.dt = void 0, u.duration = void 0, u.clientX0 = void 0, u.clientY0 = void 0, u.velocity = void 0, u.speed = void 0, u.swipe = void 0, u.axes = void 0, u.preEnd = void 0, s ||= e.element;
				var f = e.interactable, p = (f && f.options || Mt).deltaSource, m = fe(f, s, a), h = o === "start", g = o === "end", _ = h ? d(u) : e.prevEvent, v = h ? e.coords.start : g ? {
					page: _.page,
					client: _.client,
					timeStamp: e.coords.cur.timeStamp
				} : e.coords.cur;
				return u.page = L({}, v.page), u.client = L({}, v.client), u.rect = L({}, e.rect), u.timeStamp = v.timeStamp, g || (u.page.x -= m.x, u.page.y -= m.y, u.client.x -= m.x, u.client.y -= m.y), u.ctrlKey = r.ctrlKey, u.altKey = r.altKey, u.shiftKey = r.shiftKey, u.metaKey = r.metaKey, u.button = r.button, u.buttons = r.buttons, u.target = s, u.currentTarget = s, u.preEnd = c, u.type = l || a + (o || ""), u.interactable = f, u.t0 = h ? e.pointers[e.pointers.length - 1].downTime : _.t0, u.x0 = e.coords.start.page.x - m.x, u.y0 = e.coords.start.page.y - m.y, u.clientX0 = e.coords.start.client.x - m.x, u.clientY0 = e.coords.start.client.y - m.y, u.delta = h || g ? {
					x: 0,
					y: 0
				} : {
					x: u[p].x - _[p].x,
					y: u[p].y - _[p].y
				}, u.dt = e.coords.delta.timeStamp, u.duration = u.timeStamp - u.t0, u.velocity = L({}, e.coords.velocity[p]), u.speed = he(u.velocity.x, u.velocity.y), u.swipe = g || o === "inertiastart" ? u.getSwipe() : null, u;
			}
			return o(n, [
				{
					key: "getSwipe",
					value: function() {
						var e = this._interaction;
						if (e.prevEvent.speed < 600 || this.timeStamp - e.prevEvent.timeStamp > 150) return null;
						var t = 180 * Math.atan2(e.prevEvent.velocityY, e.prevEvent.velocityX) / Math.PI;
						t < 0 && (t += 360);
						var n = 112.5 <= t && t < 247.5, r = 202.5 <= t && t < 337.5;
						return {
							up: r,
							down: !r && 22.5 <= t && t < 157.5,
							left: n,
							right: !n && (292.5 <= t || t < 67.5),
							angle: t,
							speed: e.prevEvent.speed,
							velocity: {
								x: e.prevEvent.velocityX,
								y: e.prevEvent.velocityY
							}
						};
					}
				},
				{
					key: "preventDefault",
					value: function() {}
				},
				{
					key: "stopImmediatePropagation",
					value: function() {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					}
				},
				{
					key: "stopPropagation",
					value: function() {
						this.propagationStopped = !0;
					}
				}
			]), n;
		}(je);
		Object.defineProperties(Nt.prototype, {
			pageX: {
				get: function() {
					return this.page.x;
				},
				set: function(e) {
					this.page.x = e;
				}
			},
			pageY: {
				get: function() {
					return this.page.y;
				},
				set: function(e) {
					this.page.y = e;
				}
			},
			clientX: {
				get: function() {
					return this.client.x;
				},
				set: function(e) {
					this.client.x = e;
				}
			},
			clientY: {
				get: function() {
					return this.client.y;
				},
				set: function(e) {
					this.client.y = e;
				}
			},
			dx: {
				get: function() {
					return this.delta.x;
				},
				set: function(e) {
					this.delta.x = e;
				}
			},
			dy: {
				get: function() {
					return this.delta.y;
				},
				set: function(e) {
					this.delta.y = e;
				}
			},
			velocityX: {
				get: function() {
					return this.velocity.x;
				},
				set: function(e) {
					this.velocity.x = e;
				}
			},
			velocityY: {
				get: function() {
					return this.velocity.y;
				},
				set: function(e) {
					this.velocity.y = e;
				}
			}
		});
		var Pt = o((function e(t, n, r, a, o) {
			i(this, e), this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = t, this.pointer = n, this.event = r, this.downTime = a, this.downTarget = o;
		})), H = function(e) {
			return e.interactable = "", e.element = "", e.prepared = "", e.pointerIsDown = "", e.pointerWasMoved = "", e._proxy = "", e;
		}({}), U = function(e) {
			return e.start = "", e.move = "", e.end = "", e.stop = "", e.interacting = "", e;
		}({}), W = 0, G = function() {
			function e(t) {
				var n = this, r = t.pointerType, a = t.scopeFire;
				i(this, e), this.interactable = null, this.element = null, this.rect = null, this._rects = void 0, this.edges = null, this._scopeFire = void 0, this.prepared = {
					name: null,
					axis: null,
					edges: null
				}, this.pointerType = void 0, this.pointers = [], this.downEvent = null, this.downPointer = {}, this._latestPointer = {
					pointer: null,
					event: null,
					eventTarget: null
				}, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = ot((function(e) {
					this.move(e);
				}), "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = {
					start: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					},
					prev: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					},
					cur: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					},
					delta: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					},
					velocity: {
						page: {
							x: 0,
							y: 0
						},
						client: {
							x: 0,
							y: 0
						},
						timeStamp: 0
					}
				}, this._id = W++, this._scopeFire = a, this.pointerType = r;
				var o = this;
				this._proxy = {};
				var s = function(e) {
					Object.defineProperty(n._proxy, e, { get: function() {
						return o[e];
					} });
				};
				for (var c in H) s(c);
				var l = function(e) {
					Object.defineProperty(n._proxy, e, { value: function() {
						return o[e].apply(o, arguments);
					} });
				};
				for (var u in U) l(u);
				this._scopeFire("interactions:new", { interaction: this });
			}
			return o(e, [
				{
					key: "pointerMoveTolerance",
					get: function() {
						return 1;
					}
				},
				{
					key: "pointerDown",
					value: function(e, t, n) {
						var r = this.updatePointer(e, t, n, !0), i = this.pointers[r];
						this._scopeFire("interactions:down", {
							pointer: e,
							event: t,
							eventTarget: n,
							pointerIndex: r,
							pointerInfo: i,
							type: "down",
							interaction: this
						});
					}
				},
				{
					key: "start",
					value: function(e, t, n) {
						return !(this.interacting() || !this.pointerIsDown || this.pointers.length < (e.name === "gesture" ? 2 : 1) || !t.options[e.name].enabled) && (st(this.prepared, e), this.interactable = t, this.element = n, this.rect = t.getRect(n), this.edges = this.prepared.edges ? L({}, this.prepared.edges) : {
							left: !0,
							right: !0,
							top: !0,
							bottom: !0
						}, this._stopped = !1, this._interacting = this._doPhase({
							interaction: this,
							event: this.downEvent,
							phase: "start"
						}) && !this._stopped, this._interacting);
					}
				},
				{
					key: "pointerMove",
					value: function(e, t, n) {
						this.simulation || this.modification && this.modification.endResult || this.updatePointer(e, t, n, !1);
						var r, i, a = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
						this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, i = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = he(r, i) > this.pointerMoveTolerance);
						var o, s, c, l = this.getPointerIndex(e), u = {
							pointer: e,
							pointerIndex: l,
							pointerInfo: this.pointers[l],
							event: t,
							type: "move",
							eventTarget: n,
							dx: r,
							dy: i,
							duplicate: a,
							interaction: this
						};
						a || (o = this.coords.velocity, s = this.coords.delta, c = Math.max(s.timeStamp / 1e3, .001), o.page.x = s.page.x / c, o.page.y = s.page.y / c, o.client.x = s.client.x / c, o.client.y = s.client.y / c, o.timeStamp = c), this._scopeFire("interactions:move", u), a || this.simulation || (this.interacting() && (u.type = null, this.move(u)), this.pointerWasMoved && ve(this.coords.prev, this.coords.cur));
					}
				},
				{
					key: "move",
					value: function(e) {
						e && e.event || ye(this.coords.delta), (e = L({
							pointer: this._latestPointer.pointer,
							event: this._latestPointer.event,
							eventTarget: this._latestPointer.eventTarget,
							interaction: this
						}, e || {})).phase = "move", this._doPhase(e);
					}
				},
				{
					key: "pointerUp",
					value: function(e, t, n, r) {
						var i = this.getPointerIndex(e);
						i === -1 && (i = this.updatePointer(e, t, n, !1));
						var a = /cancel$/i.test(t.type) ? "cancel" : "up";
						this._scopeFire(`interactions:${a}`, {
							pointer: e,
							pointerIndex: i,
							pointerInfo: this.pointers[i],
							event: t,
							eventTarget: n,
							type: a,
							curEventTarget: r,
							interaction: this
						}), this.simulation || this.end(t), this.removePointer(e, t);
					}
				},
				{
					key: "documentBlur",
					value: function(e) {
						this.end(e), this._scopeFire("interactions:blur", {
							event: e,
							type: "blur",
							interaction: this
						});
					}
				},
				{
					key: "end",
					value: function(e) {
						var t;
						this._ending = !0, e ||= this._latestPointer.event, this.interacting() && (t = this._doPhase({
							event: e,
							interaction: this,
							phase: "end"
						})), this._ending = !1, !0 === t && this.stop();
					}
				},
				{
					key: "currentAction",
					value: function() {
						return this._interacting ? this.prepared.name : null;
					}
				},
				{
					key: "interacting",
					value: function() {
						return this._interacting;
					}
				},
				{
					key: "stop",
					value: function() {
						this._scopeFire("interactions:stop", { interaction: this }), this.interactable = this.element = null, this._interacting = !1, this._stopped = !0, this.prepared.name = this.prevEvent = null;
					}
				},
				{
					key: "getPointerIndex",
					value: function(e) {
						var t = Ce(e);
						return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : Pe(this.pointers, (function(e) {
							return e.id === t;
						}));
					}
				},
				{
					key: "getPointerInfo",
					value: function(e) {
						return this.pointers[this.getPointerIndex(e)];
					}
				},
				{
					key: "updatePointer",
					value: function(e, t, n, r) {
						var i, a, o, s = Ce(e), c = this.getPointerIndex(e), l = this.pointers[c];
						return r = !1 !== r && (r || /(down|start)$/i.test(t.type)), l ? l.pointer = e : (l = new Pt(s, e, t, null, null), c = this.pointers.length, this.pointers.push(l)), R(this.coords.cur, this.pointers.map((function(e) {
							return e.pointer;
						})), this._now()), i = this.coords.delta, a = this.coords.prev, o = this.coords.cur, i.page.x = o.page.x - a.page.x, i.page.y = o.page.y - a.page.y, i.client.x = o.client.x - a.client.x, i.client.y = o.client.y - a.client.y, i.timeStamp = o.timeStamp - a.timeStamp, r && (this.pointerIsDown = !0, l.downTime = this.coords.cur.timeStamp, l.downTarget = n, _e(this.downPointer, e), this.interacting() || (ve(this.coords.start, this.coords.cur), ve(this.coords.prev, this.coords.cur), this.downEvent = t, this.pointerWasMoved = !1)), this._updateLatestPointer(e, t, n), this._scopeFire("interactions:update-pointer", {
							pointer: e,
							event: t,
							eventTarget: n,
							down: r,
							pointerInfo: l,
							pointerIndex: c,
							interaction: this
						}), c;
					}
				},
				{
					key: "removePointer",
					value: function(e, t) {
						var n = this.getPointerIndex(e);
						if (n !== -1) {
							var r = this.pointers[n];
							this._scopeFire("interactions:remove-pointer", {
								pointer: e,
								event: t,
								eventTarget: null,
								pointerIndex: n,
								pointerInfo: r,
								interaction: this
							}), this.pointers.splice(n, 1), this.pointerIsDown = !1;
						}
					}
				},
				{
					key: "_updateLatestPointer",
					value: function(e, t, n) {
						this._latestPointer.pointer = e, this._latestPointer.event = t, this._latestPointer.eventTarget = n;
					}
				},
				{
					key: "destroy",
					value: function() {
						this._latestPointer.pointer = null, this._latestPointer.event = null, this._latestPointer.eventTarget = null;
					}
				},
				{
					key: "_createPreparedEvent",
					value: function(e, t, n, r) {
						return new Nt(this, e, this.prepared.name, t, this.element, n, r);
					}
				},
				{
					key: "_fireEvent",
					value: function(e) {
						var t;
						(t = this.interactable) == null || t.fire(e), (!this.prevEvent || e.timeStamp >= this.prevEvent.timeStamp) && (this.prevEvent = e);
					}
				},
				{
					key: "_doPhase",
					value: function(e) {
						var t = e.event, n = e.phase, r = e.preEnd, i = e.type, a = this.rect;
						if (a && n === "move" && (de(this.edges, a, this.coords.delta[this.interactable.options.deltaSource]), a.width = a.right - a.left, a.height = a.bottom - a.top), !1 === this._scopeFire(`interactions:before-action-${n}`, e)) return !1;
						var o = e.iEvent = this._createPreparedEvent(t, n, r, i);
						return this._scopeFire(`interactions:action-${n}`, e), n === "start" && (this.prevEvent = o), this._fireEvent(o), this._scopeFire(`interactions:after-action-${n}`, e), !0;
					}
				},
				{
					key: "_now",
					value: function() {
						return Date.now();
					}
				}
			]), e;
		}();
		function K(e) {
			Ft(e.interaction);
		}
		function Ft(e) {
			if (!function(e) {
				return !(!e.offset.pending.x && !e.offset.pending.y);
			}(e)) return !1;
			var t = e.offset.pending;
			return Lt(e.coords.cur, t), Lt(e.coords.delta, t), de(e.edges, e.rect, t), t.x = 0, t.y = 0, !0;
		}
		function It(e) {
			var t = e.x, n = e.y;
			this.offset.pending.x += t, this.offset.pending.y += n, this.offset.total.x += t, this.offset.total.y += n;
		}
		function Lt(e, t) {
			var n = e.page, r = e.client, i = t.x, a = t.y;
			n.x += i, n.y += a, r.x += i, r.y += a;
		}
		U.offsetBy = "";
		var q = {
			id: "offset",
			before: [
				"modifiers",
				"pointer-events",
				"actions",
				"inertia"
			],
			install: function(e) {
				e.Interaction.prototype.offsetBy = It;
			},
			listeners: {
				"interactions:new": function(e) {
					e.interaction.offset = {
						total: {
							x: 0,
							y: 0
						},
						pending: {
							x: 0,
							y: 0
						}
					};
				},
				"interactions:update-pointer": function(e) {
					return function(e) {
						e.pointerIsDown && (Lt(e.coords.cur, e.offset.total), e.offset.pending.x = 0, e.offset.pending.y = 0);
					}(e.interaction);
				},
				"interactions:before-action-start": K,
				"interactions:before-action-move": K,
				"interactions:before-action-end": function(e) {
					var t = e.interaction;
					if (Ft(t)) return t.move({ offset: !0 }), t.end(), !1;
				},
				"interactions:stop": function(e) {
					var t = e.interaction;
					t.offset.total.x = 0, t.offset.total.y = 0, t.offset.pending.x = 0, t.offset.pending.y = 0;
				}
			}
		}, Rt = function() {
			function e(t) {
				i(this, e), this.active = !1, this.isModified = !1, this.smoothEnd = !1, this.allowResume = !1, this.modification = void 0, this.modifierCount = 0, this.modifierArg = void 0, this.startCoords = void 0, this.t0 = 0, this.v0 = 0, this.te = 0, this.targetOffset = void 0, this.modifiedOffset = void 0, this.currentOffset = void 0, this.lambda_v0 = 0, this.one_ve_v0 = 0, this.timeout = void 0, this.interaction = void 0, this.interaction = t;
			}
			return o(e, [
				{
					key: "start",
					value: function(e) {
						var t = this.interaction, n = zt(t);
						if (!n || !n.enabled) return !1;
						var r = t.coords.velocity.client, i = he(r.x, r.y), a = this.modification ||= new Dt(t);
						if (a.copyFrom(t.modification), this.t0 = t._now(), this.allowResume = n.allowResume, this.v0 = i, this.currentOffset = {
							x: 0,
							y: 0
						}, this.startCoords = t.coords.cur.page, this.modifierArg = a.fillArg({
							pageCoords: this.startCoords,
							preEnd: !0,
							phase: "inertiastart"
						}), this.t0 - t.coords.cur.timeStamp < 50 && i > n.minSpeed && i > n.endSpeed) this.startInertia();
						else {
							if (a.result = a.setAll(this.modifierArg), !a.result.changed) return !1;
							this.startSmoothEnd();
						}
						return t.modification.result.rect = null, t.offsetBy(this.targetOffset), t._doPhase({
							interaction: t,
							event: e,
							phase: "inertiastart"
						}), t.offsetBy({
							x: -this.targetOffset.x,
							y: -this.targetOffset.y
						}), t.modification.result.rect = null, this.active = !0, t.simulation = this, !0;
					}
				},
				{
					key: "startInertia",
					value: function() {
						var e = this, t = this.interaction.coords.velocity.client, n = zt(this.interaction), r = n.resistance, i = -Math.log(n.endSpeed / this.v0) / r;
						this.targetOffset = {
							x: (t.x - i) / r,
							y: (t.y - i) / r
						}, this.te = i, this.lambda_v0 = r / this.v0, this.one_ve_v0 = 1 - n.endSpeed / this.v0;
						var a = this.modification, o = this.modifierArg;
						o.pageCoords = {
							x: this.startCoords.x + this.targetOffset.x,
							y: this.startCoords.y + this.targetOffset.y
						}, a.result = a.setAll(o), a.result.changed && (this.isModified = !0, this.modifiedOffset = {
							x: this.targetOffset.x + a.result.delta.x,
							y: this.targetOffset.y + a.result.delta.y
						}), this.onNextFrame((function() {
							return e.inertiaTick();
						}));
					}
				},
				{
					key: "startSmoothEnd",
					value: function() {
						var e = this;
						this.smoothEnd = !0, this.isModified = !0, this.targetOffset = {
							x: this.modification.result.delta.x,
							y: this.modification.result.delta.y
						}, this.onNextFrame((function() {
							return e.smoothEndTick();
						}));
					}
				},
				{
					key: "onNextFrame",
					value: function(e) {
						var t = this;
						this.timeout = nt.request((function() {
							t.active && e();
						}));
					}
				},
				{
					key: "inertiaTick",
					value: function() {
						var e, t, n, r, i, a, o, s = this, c = this.interaction, l = zt(c).resistance, u = (c._now() - this.t0) / 1e3;
						if (u < this.te) {
							var d, f = 1 - (Math.exp(-l * u) - this.lambda_v0) / this.one_ve_v0;
							this.isModified ? (e = 0, t = 0, n = this.targetOffset.x, r = this.targetOffset.y, i = this.modifiedOffset.x, a = this.modifiedOffset.y, d = {
								x: Vt(o = f, e, n, i),
								y: Vt(o, t, r, a)
							}) : d = {
								x: this.targetOffset.x * f,
								y: this.targetOffset.y * f
							};
							var p = {
								x: d.x - this.currentOffset.x,
								y: d.y - this.currentOffset.y
							};
							this.currentOffset.x += p.x, this.currentOffset.y += p.y, c.offsetBy(p), c.move(), this.onNextFrame((function() {
								return s.inertiaTick();
							}));
						} else c.offsetBy({
							x: this.modifiedOffset.x - this.currentOffset.x,
							y: this.modifiedOffset.y - this.currentOffset.y
						}), this.end();
					}
				},
				{
					key: "smoothEndTick",
					value: function() {
						var e = this, t = this.interaction, n = t._now() - this.t0, r = zt(t).smoothEndDuration;
						if (n < r) {
							var i = {
								x: Ht(n, 0, this.targetOffset.x, r),
								y: Ht(n, 0, this.targetOffset.y, r)
							}, a = {
								x: i.x - this.currentOffset.x,
								y: i.y - this.currentOffset.y
							};
							this.currentOffset.x += a.x, this.currentOffset.y += a.y, t.offsetBy(a), t.move({ skipModifiers: this.modifierCount }), this.onNextFrame((function() {
								return e.smoothEndTick();
							}));
						} else t.offsetBy({
							x: this.targetOffset.x - this.currentOffset.x,
							y: this.targetOffset.y - this.currentOffset.y
						}), this.end();
					}
				},
				{
					key: "resume",
					value: function(e) {
						var t = e.pointer, n = e.event, r = e.eventTarget, i = this.interaction;
						i.offsetBy({
							x: -this.currentOffset.x,
							y: -this.currentOffset.y
						}), i.updatePointer(t, n, r, !0), i._doPhase({
							interaction: i,
							event: n,
							phase: "resume"
						}), ve(i.coords.prev, i.coords.cur), this.stop();
					}
				},
				{
					key: "end",
					value: function() {
						this.interaction.move(), this.interaction.end(), this.stop();
					}
				},
				{
					key: "stop",
					value: function() {
						this.active = this.smoothEnd = !1, this.interaction.simulation = null, nt.cancel(this.timeout);
					}
				}
			]), e;
		}();
		function zt(e) {
			var t = e.interactable, n = e.prepared;
			return t && t.options && n.name && t.options[n.name].inertia;
		}
		var Bt = {
			id: "inertia",
			before: ["modifiers", "actions"],
			install: function(e) {
				var t = e.defaults;
				e.usePlugin(q), e.usePlugin(jt), e.actions.phases.inertiastart = !0, e.actions.phases.resume = !0, t.perAction.inertia = {
					enabled: !1,
					resistance: 10,
					minSpeed: 100,
					endSpeed: 10,
					allowResume: !0,
					smoothEndDuration: 300
				};
			},
			listeners: {
				"interactions:new": function(e) {
					var t = e.interaction;
					t.inertia = new Rt(t);
				},
				"interactions:before-action-end": function(e) {
					var t = e.interaction, n = e.event;
					return (!t._interacting || t.simulation || !t.inertia.start(n)) && null;
				},
				"interactions:down": function(e) {
					var t = e.interaction, n = e.eventTarget, r = t.inertia;
					if (r.active) for (var i = n; S.element(i);) {
						if (i === t.element) {
							r.resume(e);
							break;
						}
						i = N(i);
					}
				},
				"interactions:stop": function(e) {
					var t = e.interaction.inertia;
					t.active && t.stop();
				},
				"interactions:before-action-resume": function(e) {
					var t = e.interaction.modification;
					t.stop(e), t.start(e, e.interaction.coords.cur.page), t.applyToInteraction(e);
				},
				"interactions:before-action-inertiastart": function(e) {
					return e.interaction.modification.setAndApply(e);
				},
				"interactions:action-resume": At,
				"interactions:action-inertiastart": At,
				"interactions:after-action-inertiastart": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				},
				"interactions:after-action-resume": function(e) {
					return e.interaction.modification.restoreInteractionCoords(e);
				}
			}
		};
		function Vt(e, t, n, r) {
			var i = 1 - e;
			return i * i * t + 2 * i * e * n + e * e * r;
		}
		function Ht(e, t, n, r) {
			return -n * (e /= r) * (e - 2) + t;
		}
		var Ut = Bt;
		function Wt(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				if (e.immediatePropagationStopped) break;
				r(e);
			}
		}
		var Gt = function() {
			function e(t) {
				i(this, e), this.options = void 0, this.types = {}, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.global = void 0, this.options = L({}, t || {});
			}
			return o(e, [
				{
					key: "fire",
					value: function(e) {
						var t, n = this.global;
						(t = this.types[e.type]) && Wt(e, t), !e.propagationStopped && n && (t = n[e.type]) && Wt(e, t);
					}
				},
				{
					key: "on",
					value: function(e, t) {
						var n = pe(e, t);
						for (e in n) this.types[e] = Me(this.types[e] || [], n[e]);
					}
				},
				{
					key: "off",
					value: function(e, t) {
						var n = pe(e, t);
						for (e in n) {
							var r = this.types[e];
							if (r && r.length) for (var i = 0, a = n[e]; i < a.length; i++) {
								var o = a[i], s = r.indexOf(o);
								s !== -1 && r.splice(s, 1);
							}
						}
					}
				},
				{
					key: "getRect",
					value: function(e) {
						return null;
					}
				}
			]), e;
		}(), Kt = function() {
			function e(t) {
				i(this, e), this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = t, _e(this, t);
			}
			return o(e, [
				{
					key: "preventOriginalDefault",
					value: function() {
						this.originalEvent.preventDefault();
					}
				},
				{
					key: "stopPropagation",
					value: function() {
						this.originalEvent.stopPropagation();
					}
				},
				{
					key: "stopImmediatePropagation",
					value: function() {
						this.originalEvent.stopImmediatePropagation();
					}
				}
			]), e;
		}();
		function J(e) {
			return S.object(e) ? {
				capture: !!e.capture,
				passive: !!e.passive
			} : {
				capture: !!e,
				passive: !1
			};
		}
		function qt(e, t) {
			return e === t || (typeof e == "boolean" ? !!t.capture === e && !!t.passive == 0 : !!e.capture == !!t.capture && !!e.passive == !!t.passive);
		}
		var Jt = {
			id: "events",
			install: function(e) {
				var t, n = [], r = {}, i = [], a = {
					add: o,
					remove: s,
					addDelegate: function(e, t, n, a, s) {
						var u = J(s);
						if (!r[n]) {
							r[n] = [];
							for (var d = 0; d < i.length; d++) {
								var f = i[d];
								o(f, n, c), o(f, n, l, !0);
							}
						}
						var p = r[n], m = Fe(p, (function(n) {
							return n.selector === e && n.context === t;
						}));
						m || (m = {
							selector: e,
							context: t,
							listeners: []
						}, p.push(m)), m.listeners.push({
							func: a,
							options: u
						});
					},
					removeDelegate: function(e, t, n, i, a) {
						var o, u = J(a), d = r[n], f = !1;
						if (d) for (o = d.length - 1; o >= 0; o--) {
							var p = d[o];
							if (p.selector === e && p.context === t) {
								for (var m = p.listeners, h = m.length - 1; h >= 0; h--) {
									var g = m[h];
									if (g.func === i && qt(g.options, u)) {
										m.splice(h, 1), m.length || (d.splice(o, 1), s(t, n, c), s(t, n, l, !0)), f = !0;
										break;
									}
								}
								if (f) break;
							}
						}
					},
					delegateListener: c,
					delegateUseCapture: l,
					delegatedEvents: r,
					documents: i,
					targets: n,
					supportsOptions: !1,
					supportsPassive: !1
				};
				function o(e, t, r, i) {
					if (e.addEventListener) {
						var o = J(i), s = Fe(n, (function(t) {
							return t.eventTarget === e;
						}));
						s || (s = {
							eventTarget: e,
							events: {}
						}, n.push(s)), s.events[t] || (s.events[t] = []), Fe(s.events[t], (function(e) {
							return e.func === r && qt(e.options, o);
						})) || (e.addEventListener(t, r, a.supportsOptions ? o : o.capture), s.events[t].push({
							func: r,
							options: o
						}));
					}
				}
				function s(e, t, r, i) {
					if (e.addEventListener && e.removeEventListener) {
						var o = Pe(n, (function(t) {
							return t.eventTarget === e;
						})), c = n[o];
						if (c && c.events) {
							if (t !== "all") {
								var l = !1, u = c.events[t];
								if (u) {
									if (r === "all") {
										for (var d = u.length - 1; d >= 0; d--) {
											var f = u[d];
											s(e, t, f.func, f.options);
										}
										return;
									}
									for (var p = J(i), m = 0; m < u.length; m++) {
										var h = u[m];
										if (h.func === r && qt(h.options, p)) {
											e.removeEventListener(t, r, a.supportsOptions ? p : p.capture), u.splice(m, 1), u.length === 0 && (delete c.events[t], l = !0);
											break;
										}
									}
								}
								l && !Object.keys(c.events).length && n.splice(o, 1);
							} else for (t in c.events) c.events.hasOwnProperty(t) && s(e, t, "all");
						}
					}
				}
				function c(e, t) {
					for (var n = J(t), i = new Kt(e), a = r[e.type], o = Ae(e)[0], s = o; S.element(s);) {
						for (var c = 0; c < a.length; c++) {
							var l = a[c], u = l.selector, d = l.context;
							if (P(s, u) && j(d, o) && j(d, s)) {
								var f = l.listeners;
								i.currentTarget = s;
								for (var p = 0; p < f.length; p++) {
									var m = f[p];
									qt(m.options, n) && m.func(i);
								}
							}
						}
						s = N(s);
					}
				}
				function l(e) {
					return c(e, !0);
				}
				return (t = e.document) == null || t.createElement("div").addEventListener("test", null, {
					get capture() {
						return a.supportsOptions = !0;
					},
					get passive() {
						return a.supportsPassive = !0;
					}
				}), e.events = a, a;
			}
		}, Yt = {
			methodOrder: [
				"simulationResume",
				"mouseOrPen",
				"hasPointer",
				"idle"
			],
			search: function(e) {
				for (var t = 0, n = Yt.methodOrder; t < n.length; t++) {
					var r = Yt[n[t]](e);
					if (r) return r;
				}
				return null;
			},
			simulationResume: function(e) {
				var t = e.pointerType, n = e.eventType, r = e.eventTarget, i = e.scope;
				if (!/down|start/i.test(n)) return null;
				for (var a = 0, o = i.interactions.list; a < o.length; a++) {
					var s = o[a], c = r;
					if (s.simulation && s.simulation.allowResume && s.pointerType === t) for (; c;) {
						if (c === s.element) return s;
						c = N(c);
					}
				}
				return null;
			},
			mouseOrPen: function(e) {
				var t, n = e.pointerId, r = e.pointerType, i = e.eventType, a = e.scope;
				if (r !== "mouse" && r !== "pen") return null;
				for (var o = 0, s = a.interactions.list; o < s.length; o++) {
					var c = s[o];
					if (c.pointerType === r) {
						if (c.simulation && !Xt(c, n)) continue;
						if (c.interacting()) return c;
						t ||= c;
					}
				}
				if (t) return t;
				for (var l = 0, u = a.interactions.list; l < u.length; l++) {
					var d = u[l];
					if (!(d.pointerType !== r || /down/i.test(i) && d.simulation)) return d;
				}
				return null;
			},
			hasPointer: function(e) {
				for (var t = e.pointerId, n = 0, r = e.scope.interactions.list; n < r.length; n++) {
					var i = r[n];
					if (Xt(i, t)) return i;
				}
				return null;
			},
			idle: function(e) {
				for (var t = e.pointerType, n = 0, r = e.scope.interactions.list; n < r.length; n++) {
					var i = r[n];
					if (i.pointers.length === 1) {
						var a = i.interactable;
						if (a && (!a.options.gesture || !a.options.gesture.enabled)) continue;
					} else if (i.pointers.length >= 2) continue;
					if (!i.interacting() && t === i.pointerType) return i;
				}
				return null;
			}
		};
		function Xt(e, t) {
			return e.pointers.some((function(e) {
				return e.id === t;
			}));
		}
		var Zt = Yt, Qt = [
			"pointerDown",
			"pointerMove",
			"pointerUp",
			"updatePointer",
			"removePointer",
			"windowBlur"
		];
		function $t(e, t) {
			return function(n) {
				var r = t.interactions.list, i = ke(n), a = Ae(n), o = a[0], s = a[1], c = [];
				if (/^touch/.test(n.type)) {
					t.prevTouchTime = t.now();
					for (var l = 0, u = n.changedTouches; l < u.length; l++) {
						var d = u[l], f = {
							pointer: d,
							pointerId: Ce(d),
							pointerType: i,
							eventType: n.type,
							eventTarget: o,
							curEventTarget: s,
							scope: t
						}, p = en(f);
						c.push([
							f.pointer,
							f.eventTarget,
							f.curEventTarget,
							p
						]);
					}
				} else {
					var m = !1;
					if (!A.supportsPointerEvent && /mouse/.test(n.type)) {
						for (var h = 0; h < r.length && !m; h++) m = r[h].pointerType !== "mouse" && r[h].pointerIsDown;
						m = m || t.now() - t.prevTouchTime < 500 || n.timeStamp === 0;
					}
					if (!m) {
						var g = {
							pointer: n,
							pointerId: Ce(n),
							pointerType: i,
							eventType: n.type,
							curEventTarget: s,
							eventTarget: o,
							scope: t
						}, _ = en(g);
						c.push([
							g.pointer,
							g.eventTarget,
							g.curEventTarget,
							_
						]);
					}
				}
				for (var v = 0; v < c.length; v++) {
					var y = c[v], b = y[0], x = y[1], S = y[2];
					y[3][e](b, n, x, S);
				}
			};
		}
		function en(e) {
			var t = e.pointerType, n = e.scope, r = {
				interaction: Zt.search(e),
				searchDetails: e
			};
			return n.fire("interactions:find", r), r.interaction || n.interactions.new({ pointerType: t });
		}
		function tn(e, t) {
			var n = e.doc, r = e.scope, i = e.options, a = r.interactions.docEvents, o = r.events, s = o[t];
			for (var c in r.browser.isIOS && !i.events && (i.events = { passive: !1 }), o.delegatedEvents) s(n, c, o.delegateListener), s(n, c, o.delegateUseCapture, !0);
			for (var l = i && i.events, u = 0; u < a.length; u++) {
				var d = a[u];
				s(n, d.type, d.listener, l);
			}
		}
		var nn = {
			id: "core/interactions",
			install: function(e) {
				for (var t = {}, n = 0; n < Qt.length; n++) {
					var r = Qt[n];
					t[r] = $t(r, e);
				}
				var a, s = A.pEventTypes;
				function l() {
					for (var t = 0, n = e.interactions.list; t < n.length; t++) {
						var r = n[t];
						if (r.pointerIsDown && r.pointerType === "touch" && !r._interacting) for (var i = function() {
							var t = o[a];
							e.documents.some((function(e) {
								return j(e.doc, t.downTarget);
							})) || r.removePointer(t.pointer, t.event);
						}, a = 0, o = r.pointers; a < o.length; a++) i();
					}
				}
				(a = O.PointerEvent ? [
					{
						type: s.down,
						listener: l
					},
					{
						type: s.down,
						listener: t.pointerDown
					},
					{
						type: s.move,
						listener: t.pointerMove
					},
					{
						type: s.up,
						listener: t.pointerUp
					},
					{
						type: s.cancel,
						listener: t.pointerUp
					}
				] : [
					{
						type: "mousedown",
						listener: t.pointerDown
					},
					{
						type: "mousemove",
						listener: t.pointerMove
					},
					{
						type: "mouseup",
						listener: t.pointerUp
					},
					{
						type: "touchstart",
						listener: l
					},
					{
						type: "touchstart",
						listener: t.pointerDown
					},
					{
						type: "touchmove",
						listener: t.pointerMove
					},
					{
						type: "touchend",
						listener: t.pointerUp
					},
					{
						type: "touchcancel",
						listener: t.pointerUp
					}
				]).push({
					type: "blur",
					listener: function(t) {
						for (var n = 0, r = e.interactions.list; n < r.length; n++) r[n].documentBlur(t);
					}
				}), e.prevTouchTime = 0, e.Interaction = function(t) {
					c(r, t);
					var n = f(r);
					function r() {
						return i(this, r), n.apply(this, arguments);
					}
					return o(r, [{
						key: "pointerMoveTolerance",
						get: function() {
							return e.interactions.pointerMoveTolerance;
						},
						set: function(t) {
							e.interactions.pointerMoveTolerance = t;
						}
					}, {
						key: "_now",
						value: function() {
							return e.now();
						}
					}]), r;
				}(G), e.interactions = {
					list: [],
					new: function(t) {
						t.scopeFire = function(t, n) {
							return e.fire(t, n);
						};
						var n = new e.Interaction(t);
						return e.interactions.list.push(n), n;
					},
					listeners: t,
					docEvents: a,
					pointerMoveTolerance: 1
				}, e.usePlugin(wt);
			},
			listeners: {
				"scope:add-document": function(e) {
					return tn(e, "add");
				},
				"scope:remove-document": function(e) {
					return tn(e, "remove");
				},
				"interactable:unset": function(e, t) {
					for (var n = e.interactable, r = t.interactions.list.length - 1; r >= 0; r--) {
						var i = t.interactions.list[r];
						i.interactable === n && (i.stop(), t.fire("interactions:destroy", { interaction: i }), i.destroy(), t.interactions.list.length > 2 && t.interactions.list.splice(r, 1));
					}
				}
			},
			onDocSignal: tn,
			doOnInteractions: $t,
			methodNames: Qt
		}, rn = function(e) {
			return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
		}(rn || {}), an = function() {
			function e(t, n, r, a) {
				i(this, e), this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new Gt(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n.actions, this.target = t, this._context = n.context || r, this._win = y(oe(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = a, this.set(n);
			}
			return o(e, [
				{
					key: "_defaults",
					get: function() {
						return {
							base: {},
							perAction: {},
							actions: {}
						};
					}
				},
				{
					key: "setOnEvents",
					value: function(e, t) {
						return S.func(t.onstart) && this.on(`${e}start`, t.onstart), S.func(t.onmove) && this.on(`${e}move`, t.onmove), S.func(t.onend) && this.on(`${e}end`, t.onend), S.func(t.oninertiastart) && this.on(`${e}inertiastart`, t.oninertiastart), this;
					}
				},
				{
					key: "updatePerActionListeners",
					value: function(e, t, n) {
						var r = this, i = this._actions.map[e]?.filterEventType, a = function(e) {
							return (i == null || i(e)) && Tt(e, r._actions);
						};
						(S.array(t) || S.object(t)) && this._onOff(rn.Off, e, t, void 0, a), (S.array(n) || S.object(n)) && this._onOff(rn.On, e, n, void 0, a);
					}
				},
				{
					key: "setPerAction",
					value: function(e, t) {
						var n = this._defaults;
						for (var r in t) {
							var i = r, a = this.options[e], o = t[i];
							i === "listeners" && this.updatePerActionListeners(e, a.listeners, o), S.array(o) ? a[i] = Ne(o) : S.plainObject(o) ? (a[i] = L(a[i] || {}, Et(o)), S.object(n.perAction[i]) && "enabled" in n.perAction[i] && (a[i].enabled = !1 !== o.enabled)) : S.bool(o) && S.object(n.perAction[i]) ? a[i].enabled = o : a[i] = o;
						}
					}
				},
				{
					key: "getRect",
					value: function(e) {
						return e ||= S.element(this.target) ? this.target : null, S.string(this.target) && (e ||= this._context.querySelector(this.target)), ie(e);
					}
				},
				{
					key: "rectChecker",
					value: function(e) {
						var t = this;
						return S.func(e) ? (this.getRect = function(n) {
							var r = L({}, e.apply(t, n));
							return "width" in r || (r.width = r.right - r.left, r.height = r.bottom - r.top), r;
						}, this) : e === null ? (delete this.getRect, this) : this.getRect;
					}
				},
				{
					key: "_backCompatOption",
					value: function(e, t) {
						if (oe(t) || S.object(t)) {
							for (var n in this.options[e] = t, this._actions.map) this.options[n][e] = t;
							return this;
						}
						return this.options[e];
					}
				},
				{
					key: "origin",
					value: function(e) {
						return this._backCompatOption("origin", e);
					}
				},
				{
					key: "deltaSource",
					value: function(e) {
						return e === "page" || e === "client" ? (this.options.deltaSource = e, this) : this.options.deltaSource;
					}
				},
				{
					key: "getAllElements",
					value: function() {
						var e = this.target;
						return S.string(e) ? Array.from(this._context.querySelectorAll(e)) : S.func(e) && e.getAllElements ? e.getAllElements() : S.element(e) ? [e] : [];
					}
				},
				{
					key: "context",
					value: function() {
						return this._context;
					}
				},
				{
					key: "inContext",
					value: function(e) {
						return this._context === e.ownerDocument || j(this._context, e);
					}
				},
				{
					key: "testIgnoreAllow",
					value: function(e, t, n) {
						return !this.testIgnore(e.ignoreFrom, t, n) && this.testAllow(e.allowFrom, t, n);
					}
				},
				{
					key: "testAllow",
					value: function(e, t, n) {
						return !e || !!S.element(n) && (S.string(e) ? F(n, e, t) : !!S.element(e) && j(e, n));
					}
				},
				{
					key: "testIgnore",
					value: function(e, t, n) {
						return !(!e || !S.element(n)) && (S.string(e) ? F(n, e, t) : !!S.element(e) && j(e, n));
					}
				},
				{
					key: "fire",
					value: function(e) {
						return this.events.fire(e), this;
					}
				},
				{
					key: "_onOff",
					value: function(e, t, n, r, i) {
						S.object(t) && !S.array(t) && (r = n, n = null);
						var a = pe(t, n, i);
						for (var o in a) {
							o === "wheel" && (o = A.wheelEvent);
							for (var s = 0, c = a[o]; s < c.length; s++) {
								var l = c[s];
								Tt(o, this._actions) ? this.events[e === rn.On ? "on" : "off"](o, l) : S.string(this.target) ? this._scopeEvents[e === rn.On ? "addDelegate" : "removeDelegate"](this.target, this._context, o, l, r) : this._scopeEvents[e === rn.On ? "add" : "remove"](this.target, o, l, r);
							}
						}
						return this;
					}
				},
				{
					key: "on",
					value: function(e, t, n) {
						return this._onOff(rn.On, e, t, n);
					}
				},
				{
					key: "off",
					value: function(e, t, n) {
						return this._onOff(rn.Off, e, t, n);
					}
				},
				{
					key: "set",
					value: function(e) {
						var t = this._defaults;
						for (var n in S.object(e) || (e = {}), this.options = Et(t.base), this._actions.methodDict) {
							var r = n, i = this._actions.methodDict[r];
							this.options[r] = {}, this.setPerAction(r, L(L({}, t.perAction), t.actions[r])), this[i](e[r]);
						}
						for (var a in e) a === "getRect" ? this.rectChecker(e.getRect) : S.func(this[a]) && this[a](e[a]);
						return this;
					}
				},
				{
					key: "unset",
					value: function() {
						if (S.string(this.target)) for (var e in this._scopeEvents.delegatedEvents) for (var t = this._scopeEvents.delegatedEvents[e], n = t.length - 1; n >= 0; n--) {
							var r = t[n], i = r.selector, a = r.context, o = r.listeners;
							i === this.target && a === this._context && t.splice(n, 1);
							for (var s = o.length - 1; s >= 0; s--) this._scopeEvents.removeDelegate(this.target, this._context, e, o[s][0], o[s][1]);
						}
						else this._scopeEvents.remove(this.target, "all");
					}
				}
			]), e;
		}(), on = function() {
			function e(t) {
				var n = this;
				i(this, e), this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = t, t.addListeners({ "interactable:unset": function(e) {
					var t = e.interactable, r = t.target, i = S.string(r) ? n.selectorMap[r] : r[n.scope.id], a = Pe(i, (function(e) {
						return e === t;
					}));
					i.splice(a, 1);
				} });
			}
			return o(e, [
				{
					key: "new",
					value: function(e, t) {
						t = L(t || {}, { actions: this.scope.actions });
						var n = new this.scope.Interactable(e, t, this.scope.document, this.scope.events);
						return this.scope.addDocument(n._doc), this.list.push(n), S.string(e) ? (this.selectorMap[e] || (this.selectorMap[e] = []), this.selectorMap[e].push(n)) : (n.target[this.scope.id] || Object.defineProperty(e, this.scope.id, {
							value: [],
							configurable: !0
						}), e[this.scope.id].push(n)), this.scope.fire("interactable:new", {
							target: e,
							options: t,
							interactable: n,
							win: this.scope._win
						}), n;
					}
				},
				{
					key: "getExisting",
					value: function(e, t) {
						var n = t && t.context || this.scope.document, r = S.string(e), i = r ? this.selectorMap[e] : e[this.scope.id];
						if (i) return Fe(i, (function(t) {
							return t._context === n && (r || t.inContext(e));
						}));
					}
				},
				{
					key: "forEachMatch",
					value: function(e, t) {
						for (var n = 0, r = this.list; n < r.length; n++) {
							var i = r[n], a = void 0;
							if ((S.string(i.target) ? S.element(e) && P(e, i.target) : e === i.target) && i.inContext(e) && (a = t(i)), a !== void 0) return a;
						}
					}
				}
			]), e;
		}(), sn = function() {
			function e() {
				var t = this;
				i(this, e), this.id = `__interact_scope_${Math.floor(100 * Math.random())}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = A, this.defaults = Et(Mt), this.Eventable = Gt, this.actions = {
					map: {},
					phases: {
						start: !0,
						move: !0,
						end: !0
					},
					methodDict: {},
					phaselessTypes: {}
				}, this.interactStatic = function(e) {
					var t = function t(n, r) {
						var i = e.interactables.getExisting(n, r);
						return i || ((i = e.interactables.new(n, r)).events.global = t.globalEvents), i;
					};
					return t.getPointerAverage = Te, t.getTouchBBox = Ee, t.getTouchDistance = De, t.getTouchAngle = Oe, t.getElementRect = ie, t.getElementClientRect = re, t.matchesSelector = P, t.closest = M, t.globalEvents = {}, t.version = "1.10.27", t.scope = e, t.use = function(e, t) {
						return this.scope.usePlugin(e, t), this;
					}, t.isSet = function(e, t) {
						return !!this.scope.interactables.get(e, t && t.context);
					}, t.on = ot((function(e, t, n) {
						if (S.string(e) && e.search(" ") !== -1 && (e = e.trim().split(/ +/)), S.array(e)) {
							for (var r = 0, i = e; r < i.length; r++) {
								var a = i[r];
								this.on(a, t, n);
							}
							return this;
						}
						if (S.object(e)) {
							for (var o in e) this.on(o, e[o], t);
							return this;
						}
						return Tt(e, this.scope.actions) ? this.globalEvents[e] ? this.globalEvents[e].push(t) : this.globalEvents[e] = [t] : this.scope.events.add(this.scope.document, e, t, { options: n }), this;
					}), "The interact.on() method is being deprecated"), t.off = ot((function(e, t, n) {
						if (S.string(e) && e.search(" ") !== -1 && (e = e.trim().split(/ +/)), S.array(e)) {
							for (var r = 0, i = e; r < i.length; r++) {
								var a = i[r];
								this.off(a, t, n);
							}
							return this;
						}
						if (S.object(e)) {
							for (var o in e) this.off(o, e[o], t);
							return this;
						}
						var s;
						return Tt(e, this.scope.actions) ? e in this.globalEvents && (s = this.globalEvents[e].indexOf(t)) !== -1 && this.globalEvents[e].splice(s, 1) : this.scope.events.remove(this.scope.document, e, t, n), this;
					}), "The interact.off() method is being deprecated"), t.debug = function() {
						return this.scope;
					}, t.supportsTouch = function() {
						return A.supportsTouch;
					}, t.supportsPointerEvent = function() {
						return A.supportsPointerEvent;
					}, t.stop = function() {
						for (var e = 0, t = this.scope.interactions.list; e < t.length; e++) t[e].stop();
						return this;
					}, t.pointerMoveTolerance = function(e) {
						return S.number(e) ? (this.scope.interactions.pointerMoveTolerance = e, this) : this.scope.interactions.pointerMoveTolerance;
					}, t.addDocument = function(e, t) {
						this.scope.addDocument(e, t);
					}, t.removeDocument = function(e) {
						this.scope.removeDocument(e);
					}, t;
				}(this), this.InteractEvent = Nt, this.Interactable = void 0, this.interactables = new on(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = {
					list: [],
					map: {}
				}, this.onWindowUnload = function(e) {
					return t.removeDocument(e.target);
				};
				var n = this;
				this.Interactable = function(e) {
					c(r, e);
					var t = f(r);
					function r() {
						return i(this, r), t.apply(this, arguments);
					}
					return o(r, [
						{
							key: "_defaults",
							get: function() {
								return n.defaults;
							}
						},
						{
							key: "set",
							value: function(e) {
								return p(l(r.prototype), "set", this).call(this, e), n.fire("interactable:set", {
									options: e,
									interactable: this
								}), this;
							}
						},
						{
							key: "unset",
							value: function() {
								p(l(r.prototype), "unset", this).call(this);
								var e = n.interactables.list.indexOf(this);
								e < 0 || (n.interactables.list.splice(e, 1), n.fire("interactable:unset", { interactable: this }));
							}
						}
					]), r;
				}(an);
			}
			return o(e, [
				{
					key: "addListeners",
					value: function(e, t) {
						this.listenerMaps.push({
							id: t,
							map: e
						});
					}
				},
				{
					key: "fire",
					value: function(e, t) {
						for (var n = 0, r = this.listenerMaps; n < r.length; n++) {
							var i = r[n].map[e];
							if (i && !1 === i(t, this, e)) return !1;
						}
					}
				},
				{
					key: "init",
					value: function(e) {
						return this.isInitialized ? this : function(e, t) {
							return e.isInitialized = !0, S.window(t) && v(t), O.init(t), A.init(t), nt.init(t), e.window = t, e.document = t.document, e.usePlugin(nn), e.usePlugin(Jt), e;
						}(this, e);
					}
				},
				{
					key: "pluginIsInstalled",
					value: function(e) {
						var t = e.id;
						return t ? !!this._plugins.map[t] : this._plugins.list.indexOf(e) !== -1;
					}
				},
				{
					key: "usePlugin",
					value: function(e, t) {
						if (!this.isInitialized || this.pluginIsInstalled(e)) return this;
						if (e.id && (this._plugins.map[e.id] = e), this._plugins.list.push(e), e.install && e.install(this, t), e.listeners && e.before) {
							for (var n = 0, r = this.listenerMaps.length, i = e.before.reduce((function(e, t) {
								return e[t] = !0, e[cn(t)] = !0, e;
							}), {}); n < r; n++) {
								var a = this.listenerMaps[n].id;
								if (a && (i[a] || i[cn(a)])) break;
							}
							this.listenerMaps.splice(n, 0, {
								id: e.id,
								map: e.listeners
							});
						} else e.listeners && this.listenerMaps.push({
							id: e.id,
							map: e.listeners
						});
						return this;
					}
				},
				{
					key: "addDocument",
					value: function(e, t) {
						if (this.getDocIndex(e) !== -1) return !1;
						var n = y(e);
						t = t ? L({}, t) : {}, this.documents.push({
							doc: e,
							options: t
						}), this.events.documents.push(e), e !== this.document && this.events.add(n, "unload", this.onWindowUnload), this.fire("scope:add-document", {
							doc: e,
							window: n,
							scope: this,
							options: t
						});
					}
				},
				{
					key: "removeDocument",
					value: function(e) {
						var t = this.getDocIndex(e), n = y(e), r = this.documents[t].options;
						this.events.remove(n, "unload", this.onWindowUnload), this.documents.splice(t, 1), this.events.documents.splice(t, 1), this.fire("scope:remove-document", {
							doc: e,
							window: n,
							scope: this,
							options: r
						});
					}
				},
				{
					key: "getDocIndex",
					value: function(e) {
						for (var t = 0; t < this.documents.length; t++) if (this.documents[t].doc === e) return t;
						return -1;
					}
				},
				{
					key: "getDocOptions",
					value: function(e) {
						var t = this.getDocIndex(e);
						return t === -1 ? null : this.documents[t].options;
					}
				},
				{
					key: "now",
					value: function() {
						return (this.window.Date || Date).now();
					}
				}
			]), e;
		}();
		function cn(e) {
			return e && e.replace(/\/.*$/, "");
		}
		var ln = new sn(), un = ln.interactStatic, dn = typeof globalThis < "u" ? globalThis : window;
		ln.init(dn);
		var fn = Object.freeze({
			__proto__: null,
			edgeTarget: function() {},
			elements: function() {},
			grid: function(e) {
				var t = [
					["x", "y"],
					["left", "top"],
					["right", "bottom"],
					["width", "height"]
				].filter((function(t) {
					var n = t[0], r = t[1];
					return n in e || r in e;
				})), n = function(n, r) {
					for (var i = e.range, a = e.limits, o = a === void 0 ? {
						left: -1 / 0,
						right: 1 / 0,
						top: -1 / 0,
						bottom: 1 / 0
					} : a, s = e.offset, c = s === void 0 ? {
						x: 0,
						y: 0
					} : s, l = {
						range: i,
						grid: e,
						x: null,
						y: null
					}, u = 0; u < t.length; u++) {
						var d = t[u], f = d[0], p = d[1], m = Math.round((n - c.x) / e[f]), h = Math.round((r - c.y) / e[p]);
						l[f] = Math.max(o.left, Math.min(o.right, m * e[f] + c.x)), l[p] = Math.max(o.top, Math.min(o.bottom, h * e[p] + c.y));
					}
					return l;
				};
				return n.grid = e, n.coordFields = t, n;
			}
		}), pn = {
			id: "snappers",
			install: function(e) {
				var t = e.interactStatic;
				t.snappers = L(t.snappers || {}, fn), t.createSnapGrid = t.snappers.grid;
			}
		}, mn = {
			start: function(e) {
				var t = e.state, r = e.rect, i = e.edges, a = e.pageCoords, o = t.options, s = o.ratio, c = o.enabled, l = t.options, u = l.equalDelta, d = l.modifiers;
				s === "preserve" && (s = r.width / r.height), t.startCoords = L({}, a), t.startRect = L({}, r), t.ratio = s, t.equalDelta = u;
				var f = t.linkedEdges = {
					top: i.top || i.left && !i.bottom,
					left: i.left || i.top && !i.right,
					bottom: i.bottom || i.right && !i.top,
					right: i.right || i.bottom && !i.left
				};
				if (t.xIsPrimaryAxis = !(!i.left && !i.right), t.equalDelta) {
					var p = (f.left ? 1 : -1) * (f.top ? 1 : -1);
					t.edgeSign = {
						x: p,
						y: p
					};
				} else t.edgeSign = {
					x: f.left ? -1 : 1,
					y: f.top ? -1 : 1
				};
				if (!1 !== c && L(i, f), d != null && d.length) {
					var m = new Dt(e.interaction);
					m.copyFrom(e.interaction.modification), m.prepareStates(d), t.subModification = m, m.startAll(n({}, e));
				}
			},
			set: function(e) {
				var t = e.state, r = e.rect, i = e.coords, a = t.linkedEdges, o = L({}, i), s = t.equalDelta ? hn : gn;
				if (L(e.edges, a), s(t, t.xIsPrimaryAxis, i, r), !t.subModification) return null;
				var c = L({}, r);
				de(a, c, {
					x: i.x - o.x,
					y: i.y - o.y
				});
				var l = t.subModification.setAll(n(n({}, e), {}, {
					rect: c,
					edges: a,
					pageCoords: i,
					prevCoords: i,
					prevRect: c
				})), u = l.delta;
				return l.changed && (s(t, Math.abs(u.x) > Math.abs(u.y), l.coords, l.rect), L(i, l.coords)), l.eventProps;
			},
			defaults: {
				ratio: "preserve",
				equalDelta: !1,
				modifiers: [],
				enabled: !1
			}
		};
		function hn(e, t, n) {
			var r = e.startCoords, i = e.edgeSign;
			t ? n.y = r.y + (n.x - r.x) * i.y : n.x = r.x + (n.y - r.y) * i.x;
		}
		function gn(e, t, n, r) {
			var i = e.startRect, a = e.startCoords, o = e.ratio, s = e.edgeSign;
			if (t) {
				var c = r.width / o;
				n.y = a.y + (c - i.height) * s.y;
			} else {
				var l = r.height * o;
				n.x = a.x + (l - i.width) * s.x;
			}
		}
		var _n = kt(mn, "aspectRatio"), vn = function() {};
		vn._defaults = {};
		var yn = vn;
		function bn(e, t, n) {
			return S.func(e) ? ce(e, t.interactable, t.element, [
				n.x,
				n.y,
				t
			]) : ce(e, t.interactable, t.element);
		}
		var xn = {
			start: function(e) {
				var t = e.rect, n = e.startOffset, r = e.state, i = e.interaction, a = e.pageCoords, o = r.options, s = o.elementRect, c = L({
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				}, o.offset || {});
				if (t && s) {
					var l = bn(o.restriction, i, a);
					if (l) {
						var u = l.right - l.left - t.width, d = l.bottom - l.top - t.height;
						u < 0 && (c.left += u, c.right += u), d < 0 && (c.top += d, c.bottom += d);
					}
					c.left += n.left - t.width * s.left, c.top += n.top - t.height * s.top, c.right += n.right - t.width * (1 - s.right), c.bottom += n.bottom - t.height * (1 - s.bottom);
				}
				r.offset = c;
			},
			set: function(e) {
				var t = e.coords, n = e.interaction, r = e.state, i = r.options, a = r.offset, o = bn(i.restriction, n, t);
				if (o) {
					var s = function(e) {
						return !e || "left" in e && "top" in e || ((e = L({}, e)).left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e;
					}(o);
					t.x = Math.max(Math.min(s.right - a.right, t.x), s.left + a.left), t.y = Math.max(Math.min(s.bottom - a.bottom, t.y), s.top + a.top);
				}
			},
			defaults: {
				restriction: null,
				elementRect: null,
				offset: null,
				endOnly: !1,
				enabled: !1
			}
		}, Sn = kt(xn, "restrict"), Cn = {
			top: 1 / 0,
			left: 1 / 0,
			bottom: -1 / 0,
			right: -1 / 0
		}, wn = {
			top: -1 / 0,
			left: -1 / 0,
			bottom: 1 / 0,
			right: 1 / 0
		};
		function Tn(e, t) {
			for (var n = 0, r = [
				"top",
				"left",
				"bottom",
				"right"
			]; n < r.length; n++) {
				var i = r[n];
				i in e || (e[i] = t[i]);
			}
			return e;
		}
		var En = {
			noInner: Cn,
			noOuter: wn,
			start: function(e) {
				var t, n = e.interaction, r = e.startOffset, i = e.state, a = i.options;
				a && (t = le(bn(a.offset, n, n.coords.start.page))), t ||= {
					x: 0,
					y: 0
				}, i.offset = {
					top: t.y + r.top,
					left: t.x + r.left,
					bottom: t.y - r.bottom,
					right: t.x - r.right
				};
			},
			set: function(e) {
				var t = e.coords, n = e.edges, r = e.interaction, i = e.state, a = i.offset, o = i.options;
				if (n) {
					var s = L({}, t), c = bn(o.inner, r, s) || {}, l = bn(o.outer, r, s) || {};
					Tn(c, Cn), Tn(l, wn), n.top ? t.y = Math.min(Math.max(l.top + a.top, s.y), c.top + a.top) : n.bottom && (t.y = Math.max(Math.min(l.bottom + a.bottom, s.y), c.bottom + a.bottom)), n.left ? t.x = Math.min(Math.max(l.left + a.left, s.x), c.left + a.left) : n.right && (t.x = Math.max(Math.min(l.right + a.right, s.x), c.right + a.right));
				}
			},
			defaults: {
				inner: null,
				outer: null,
				offset: null,
				endOnly: !1,
				enabled: !1
			}
		}, Dn = kt(En, "restrictEdges"), On = L({
			get elementRect() {
				return {
					top: 0,
					left: 0,
					bottom: 1,
					right: 1
				};
			},
			set elementRect(e) {}
		}, xn.defaults), kn = kt({
			start: xn.start,
			set: xn.set,
			defaults: On
		}, "restrictRect"), An = {
			width: -1 / 0,
			height: -1 / 0
		}, jn = {
			width: 1 / 0,
			height: 1 / 0
		}, Mn = kt({
			start: function(e) {
				return En.start(e);
			},
			set: function(e) {
				var t = e.interaction, n = e.state, r = e.rect, i = e.edges, a = n.options;
				if (i) {
					var o = ue(bn(a.min, t, e.coords)) || An, s = ue(bn(a.max, t, e.coords)) || jn;
					n.options = {
						endOnly: a.endOnly,
						inner: L({}, En.noInner),
						outer: L({}, En.noOuter)
					}, i.top ? (n.options.inner.top = r.bottom - o.height, n.options.outer.top = r.bottom - s.height) : i.bottom && (n.options.inner.bottom = r.top + o.height, n.options.outer.bottom = r.top + s.height), i.left ? (n.options.inner.left = r.right - o.width, n.options.outer.left = r.right - s.width) : i.right && (n.options.inner.right = r.left + o.width, n.options.outer.right = r.left + s.width), En.set(e), n.options = a;
				}
			},
			defaults: {
				min: null,
				max: null,
				endOnly: !1,
				enabled: !1
			}
		}, "restrictSize"), Nn = {
			start: function(e) {
				var t, n = e.interaction, r = e.interactable, i = e.element, a = e.rect, o = e.state, s = e.startOffset, c = o.options, l = c.offsetWithOrigin ? function(e) {
					var t = e.interaction.element;
					return le(ce(e.state.options.origin, null, null, [t])) || fe(e.interactable, t, e.interaction.prepared.name);
				}(e) : {
					x: 0,
					y: 0
				};
				if (c.offset === "startCoords") t = {
					x: n.coords.start.page.x,
					y: n.coords.start.page.y
				};
				else {
					var u = ce(c.offset, r, i, [n]);
					(t = le(u) || {
						x: 0,
						y: 0
					}).x += l.x, t.y += l.y;
				}
				var d = c.relativePoints;
				o.offsets = a && d && d.length ? d.map((function(e, n) {
					return {
						index: n,
						relativePoint: e,
						x: s.left - a.width * e.x + t.x,
						y: s.top - a.height * e.y + t.y
					};
				})) : [{
					index: 0,
					relativePoint: null,
					x: t.x,
					y: t.y
				}];
			},
			set: function(e) {
				var t = e.interaction, n = e.coords, r = e.state, i = r.options, a = r.offsets, o = fe(t.interactable, t.element, t.prepared.name), s = L({}, n), c = [];
				i.offsetWithOrigin || (s.x -= o.x, s.y -= o.y);
				for (var l = 0, u = a; l < u.length; l++) for (var d = u[l], f = s.x - d.x, p = s.y - d.y, m = 0, h = i.targets.length; m < h; m++) {
					var g = i.targets[m], _ = void 0;
					(_ = S.func(g) ? g(f, p, t._proxy, d, m) : g) && c.push({
						x: (S.number(_.x) ? _.x : f) + d.x,
						y: (S.number(_.y) ? _.y : p) + d.y,
						range: S.number(_.range) ? _.range : i.range,
						source: g,
						index: m,
						offset: d
					});
				}
				for (var v = {
					target: null,
					inRange: !1,
					distance: 0,
					range: 0,
					delta: {
						x: 0,
						y: 0
					}
				}, y = 0; y < c.length; y++) {
					var b = c[y], x = b.range, C = b.x - s.x, w = b.y - s.y, T = he(C, w), ee = T <= x;
					x === 1 / 0 && v.inRange && v.range !== 1 / 0 && (ee = !1), v.target && !(ee ? v.inRange && x !== 1 / 0 ? T / x < v.distance / v.range : x === 1 / 0 && v.range !== 1 / 0 || T < v.distance : !v.inRange && T < v.distance) || (v.target = b, v.distance = T, v.range = x, v.inRange = ee, v.delta.x = C, v.delta.y = w);
				}
				return v.inRange && (n.x = v.target.x, n.y = v.target.y), r.closest = v, v;
			},
			defaults: {
				range: 1 / 0,
				targets: null,
				offset: null,
				offsetWithOrigin: !0,
				origin: null,
				relativePoints: null,
				endOnly: !1,
				enabled: !1
			}
		}, Pn = kt(Nn, "snap"), Fn = {
			start: function(e) {
				var t = e.state, n = e.edges, r = t.options;
				if (!n) return null;
				e.state = { options: {
					targets: null,
					relativePoints: [{
						x: +!n.left,
						y: +!n.top
					}],
					offset: r.offset || "self",
					origin: {
						x: 0,
						y: 0
					},
					range: r.range
				} }, t.targetFields = t.targetFields || [["width", "height"], ["x", "y"]], Nn.start(e), t.offsets = e.state.offsets, e.state = t;
			},
			set: function(e) {
				var t = e.interaction, n = e.state, r = e.coords, i = n.options, a = n.offsets, o = {
					x: r.x - a[0].x,
					y: r.y - a[0].y
				};
				n.options = L({}, i), n.options.targets = [];
				for (var s = 0, c = i.targets || []; s < c.length; s++) {
					var l = c[s], u = void 0;
					if (u = S.func(l) ? l(o.x, o.y, t) : l) {
						for (var d = 0, f = n.targetFields; d < f.length; d++) {
							var p = f[d], m = p[0], h = p[1];
							if (m in u || h in u) {
								u.x = u[m], u.y = u[h];
								break;
							}
						}
						n.options.targets.push(u);
					}
				}
				var g = Nn.set(e);
				return n.options = i, g;
			},
			defaults: {
				range: 1 / 0,
				targets: null,
				offset: null,
				endOnly: !1,
				enabled: !1
			}
		}, In = kt(Fn, "snapSize"), Ln = {
			aspectRatio: _n,
			restrictEdges: Dn,
			restrict: Sn,
			restrictRect: kn,
			restrictSize: Mn,
			snapEdges: kt({
				start: function(e) {
					var t = e.edges;
					return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], Fn.start(e)) : null;
				},
				set: Fn.set,
				defaults: L(Et(Fn.defaults), {
					targets: void 0,
					range: void 0,
					offset: {
						x: 0,
						y: 0
					}
				})
			}, "snapEdges"),
			snap: Pn,
			snapSize: In,
			spring: yn,
			avoid: yn,
			transform: yn,
			rubberband: yn
		}, Rn = {
			id: "modifiers",
			install: function(e) {
				var t = e.interactStatic;
				for (var n in e.usePlugin(jt), e.usePlugin(pn), t.modifiers = Ln, Ln) {
					var r = Ln[n], i = r._defaults;
					i._methods = r._methods, e.defaults.perAction[n] = i;
				}
			}
		}, zn = function(e) {
			c(n, e);
			var t = f(n);
			function n(e, r, a, o, s, c) {
				var l;
				if (i(this, n), _e(d(l = t.call(this, s)), a), a !== r && _e(d(l), r), l.timeStamp = c, l.originalEvent = a, l.type = e, l.pointerId = Ce(r), l.pointerType = ke(r), l.target = o, l.currentTarget = null, e === "tap") {
					var u = s.getPointerIndex(r);
					l.dt = l.timeStamp - s.pointers[u].downTime;
					var f = l.timeStamp - s.tapTime;
					l.double = !!s.prevTap && s.prevTap.type !== "doubletap" && s.prevTap.target === l.target && f < 500;
				} else e === "doubletap" && (l.dt = r.timeStamp - s.tapTime, l.double = !0);
				return l;
			}
			return o(n, [
				{
					key: "_subtractOrigin",
					value: function(e) {
						var t = e.x, n = e.y;
						return this.pageX -= t, this.pageY -= n, this.clientX -= t, this.clientY -= n, this;
					}
				},
				{
					key: "_addOrigin",
					value: function(e) {
						var t = e.x, n = e.y;
						return this.pageX += t, this.pageY += n, this.clientX += t, this.clientY += n, this;
					}
				},
				{
					key: "preventDefault",
					value: function() {
						this.originalEvent.preventDefault();
					}
				}
			]), n;
		}(je), Bn = {
			id: "pointer-events/base",
			before: [
				"inertia",
				"modifiers",
				"auto-start",
				"actions"
			],
			install: function(e) {
				e.pointerEvents = Bn, e.defaults.actions.pointerEvents = Bn.defaults, L(e.actions.phaselessTypes, Bn.types);
			},
			listeners: {
				"interactions:new": function(e) {
					var t = e.interaction;
					t.prevTap = null, t.tapTime = 0;
				},
				"interactions:update-pointer": function(e) {
					var t = e.down, n = e.pointerInfo;
					(t || !n.hold) && (n.hold = {
						duration: 1 / 0,
						timeout: null
					});
				},
				"interactions:move": function(e, t) {
					var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
					e.duplicate || n.pointerIsDown && !n.pointerWasMoved || (n.pointerIsDown && Un(e), Vn({
						interaction: n,
						pointer: r,
						event: i,
						eventTarget: a,
						type: "move"
					}, t));
				},
				"interactions:down": function(e, t) {
					(function(e, t) {
						for (var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget, o = e.pointerIndex, s = n.pointers[o].hold, c = ae(a), l = {
							interaction: n,
							pointer: r,
							event: i,
							eventTarget: a,
							type: "hold",
							targets: [],
							path: c,
							node: null
						}, u = 0; u < c.length; u++) l.node = c[u], t.fire("pointerEvents:collect-targets", l);
						if (l.targets.length) {
							for (var d = 1 / 0, f = 0, p = l.targets; f < p.length; f++) {
								var m = p[f].eventable.options.holdDuration;
								m < d && (d = m);
							}
							s.duration = d, s.timeout = setTimeout((function() {
								Vn({
									interaction: n,
									eventTarget: a,
									pointer: r,
									event: i,
									type: "hold"
								}, t);
							}), d);
						}
					})(e, t), Vn(e, t);
				},
				"interactions:up": function(e, t) {
					Un(e), Vn(e, t), function(e, t) {
						var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget;
						n.pointerWasMoved || Vn({
							interaction: n,
							eventTarget: a,
							pointer: r,
							event: i,
							type: "tap"
						}, t);
					}(e, t);
				},
				"interactions:cancel": function(e, t) {
					Un(e), Vn(e, t);
				}
			},
			PointerEvent: zn,
			fire: Vn,
			collectEventTargets: Hn,
			defaults: {
				holdDuration: 600,
				ignoreFrom: null,
				allowFrom: null,
				origin: {
					x: 0,
					y: 0
				}
			},
			types: {
				down: !0,
				move: !0,
				up: !0,
				cancel: !0,
				tap: !0,
				doubletap: !0,
				hold: !0
			}
		};
		function Vn(e, t) {
			var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget, o = e.type, s = e.targets, c = s === void 0 ? Hn(e, t) : s, l = new zn(o, r, i, a, n, t.now());
			t.fire("pointerEvents:new", { pointerEvent: l });
			for (var u = {
				interaction: n,
				pointer: r,
				event: i,
				eventTarget: a,
				targets: c,
				type: o,
				pointerEvent: l
			}, d = 0; d < c.length; d++) {
				var f = c[d];
				for (var p in f.props || {}) l[p] = f.props[p];
				var m = fe(f.eventable, f.node);
				if (l._subtractOrigin(m), l.eventable = f.eventable, l.currentTarget = f.node, f.eventable.fire(l), l._addOrigin(m), l.immediatePropagationStopped || l.propagationStopped && d + 1 < c.length && c[d + 1].node !== l.currentTarget) break;
			}
			if (t.fire("pointerEvents:fired", u), o === "tap") {
				var h = l.double ? Vn({
					interaction: n,
					pointer: r,
					event: i,
					eventTarget: a,
					type: "doubletap"
				}, t) : l;
				n.prevTap = h, n.tapTime = h.timeStamp;
			}
			return l;
		}
		function Hn(e, t) {
			var n = e.interaction, r = e.pointer, i = e.event, a = e.eventTarget, o = e.type, s = n.getPointerIndex(r), c = n.pointers[s];
			if (o === "tap" && (n.pointerWasMoved || !c || c.downTarget !== a)) return [];
			for (var l = ae(a), u = {
				interaction: n,
				pointer: r,
				event: i,
				eventTarget: a,
				type: o,
				path: l,
				targets: [],
				node: null
			}, d = 0; d < l.length; d++) u.node = l[d], t.fire("pointerEvents:collect-targets", u);
			return o === "hold" && (u.targets = u.targets.filter((function(e) {
				var t, r;
				return e.eventable.options.holdDuration === ((t = n.pointers[s]) == null || (r = t.hold) == null ? void 0 : r.duration);
			}))), u.targets;
		}
		function Un(e) {
			var t = e.interaction, n = e.pointerIndex, r = t.pointers[n].hold;
			r && r.timeout && (clearTimeout(r.timeout), r.timeout = null);
		}
		var Wn = Object.freeze({
			__proto__: null,
			default: Bn
		});
		function Gn(e) {
			var t = e.interaction;
			t.holdIntervalHandle &&= (clearInterval(t.holdIntervalHandle), null);
		}
		var Kn = {
			id: "pointer-events/holdRepeat",
			install: function(e) {
				e.usePlugin(Bn);
				var t = e.pointerEvents;
				t.defaults.holdRepeatInterval = 0, t.types.holdrepeat = e.actions.phaselessTypes.holdrepeat = !0;
			},
			listeners: [
				"move",
				"up",
				"cancel",
				"endall"
			].reduce((function(e, t) {
				return e[`pointerEvents:${t}`] = Gn, e;
			}), {
				"pointerEvents:new": function(e) {
					var t = e.pointerEvent;
					t.type === "hold" && (t.count = (t.count || 0) + 1);
				},
				"pointerEvents:fired": function(e, t) {
					var n = e.interaction, r = e.pointerEvent, i = e.eventTarget, a = e.targets;
					if (r.type === "hold" && a.length) {
						var o = a[0].eventable.options.holdRepeatInterval;
						o <= 0 || (n.holdIntervalHandle = setTimeout((function() {
							t.pointerEvents.fire({
								interaction: n,
								eventTarget: i,
								type: "hold",
								pointer: r,
								event: r
							}, t);
						}), o));
					}
				}
			})
		}, qn = {
			id: "pointer-events/interactableTargets",
			install: function(e) {
				var t = e.Interactable;
				t.prototype.pointerEvents = function(e) {
					return L(this.events.options, e), this;
				};
				var n = t.prototype._backCompatOption;
				t.prototype._backCompatOption = function(e, t) {
					var r = n.call(this, e, t);
					return r === this && (this.events.options[e] = t), r;
				};
			},
			listeners: {
				"pointerEvents:collect-targets": function(e, t) {
					var n = e.targets, r = e.node, i = e.type, a = e.eventTarget;
					t.interactables.forEachMatch(r, (function(e) {
						var t = e.events, o = t.options;
						t.types[i] && t.types[i].length && e.testIgnoreAllow(o, r, a) && n.push({
							node: r,
							eventable: t,
							props: { interactable: e }
						});
					}));
				},
				"interactable:new": function(e) {
					var t = e.interactable;
					t.events.getRect = function(e) {
						return t.getRect(e);
					};
				},
				"interactable:set": function(e, t) {
					var n = e.interactable, r = e.options;
					L(n.events.options, t.pointerEvents.defaults), L(n.events.options, r.pointerEvents || {});
				}
			}
		};
		if (un.use(wt), un.use(q), un.use({
			id: "pointer-events",
			install: function(e) {
				e.usePlugin(Wn), e.usePlugin(Kn), e.usePlugin(qn);
			}
		}), un.use(Ut), un.use(Rn), un.use(St), un.use(et), un.use(at), un.use({
			id: "reflow",
			install: function(e) {
				var t = e.Interactable;
				e.actions.phases.reflow = !0, t.prototype.reflow = function(t) {
					return function(e, t, n) {
						for (var r = e.getAllElements(), i = n.window.Promise, a = i ? [] : null, o = function() {
							var o = r[s], c = e.getRect(o);
							if (!c) return 1;
							var l, u = Fe(n.interactions.list, (function(n) {
								return n.interacting() && n.interactable === e && n.element === o && n.prepared.name === t.name;
							}));
							if (u) u.move(), a && (l = u._reflowPromise || new i((function(e) {
								u._reflowResolve = e;
							})));
							else {
								var d = ue(c);
								l = function(e, t, n, r, i) {
									var a = e.interactions.new({ pointerType: "reflow" }), o = {
										interaction: a,
										event: i,
										pointer: i,
										eventTarget: n,
										phase: "reflow"
									};
									a.interactable = t, a.element = n, a.prevEvent = i, a.updatePointer(i, i, n, !0), ye(a.coords.delta), st(a.prepared, r), a._doPhase(o);
									var s = e.window.Promise, c = s ? new s((function(e) {
										a._reflowResolve = e;
									})) : void 0;
									return a._reflowPromise = c, a.start(r, t, n), a._interacting ? (a.move(o), a.end(i)) : (a.stop(), a._reflowResolve()), a.removePointer(i, i), c;
								}(n, e, o, t, function(e) {
									return {
										coords: e,
										get page() {
											return this.coords.page;
										},
										get client() {
											return this.coords.client;
										},
										get timeStamp() {
											return this.coords.timeStamp;
										},
										get pageX() {
											return this.coords.page.x;
										},
										get pageY() {
											return this.coords.page.y;
										},
										get clientX() {
											return this.coords.client.x;
										},
										get clientY() {
											return this.coords.client.y;
										},
										get pointerId() {
											return this.coords.pointerId;
										},
										get target() {
											return this.coords.target;
										},
										get type() {
											return this.coords.type;
										},
										get pointerType() {
											return this.coords.pointerType;
										},
										get buttons() {
											return this.coords.buttons;
										},
										preventDefault: function() {}
									};
								}({
									page: {
										x: d.x,
										y: d.y
									},
									client: {
										x: d.x,
										y: d.y
									},
									timeStamp: n.now()
								}));
							}
							a && a.push(l);
						}, s = 0; s < r.length && !o(); s++);
						return a && i.all(a).then((function() {
							return e;
						}));
					}(this, t, e);
				};
			},
			listeners: { "interactions:stop": function(e, t) {
				var n = e.interaction;
				n.pointerType === "reflow" && (n._reflowResolve && n._reflowResolve(), function(e, t) {
					e.splice(e.indexOf(t), 1);
				}(t.interactions.list, n));
			} }
		}), un.default = un, (t === void 0 ? "undefined" : r(t)) === "object" && t) try {
			t.exports = un;
		} catch {}
		return un.default = un, un;
	}));
})), Oa = function(e, t) {
	return Oa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, Oa(e, t);
};
function ka(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	Oa(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Aa(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ja(e, t) {
	var n = typeof Symbol == "function" && e[Symbol.iterator];
	if (!n) return e;
	var r = n.call(e), i, a = [], o;
	try {
		for (; (t === void 0 || t-- > 0) && !(i = r.next()).done;) a.push(i.value);
	} catch (e) {
		o = { error: e };
	} finally {
		try {
			i && !i.done && (n = r.return) && n.call(r);
		} finally {
			if (o) throw o.error;
		}
	}
	return a;
}
function Ma(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function Na(e) {
	return typeof e == "function";
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function Pa(e) {
	var t = e(function(e) {
		Error.call(e), e.stack = (/* @__PURE__ */ Error()).stack;
	});
	return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var Fa = Pa(function(e) {
	return function(t) {
		e(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map(function(e, t) {
			return t + 1 + ") " + e.toString();
		}).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t;
	};
});
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function Ia(e, t) {
	if (e) {
		var n = e.indexOf(t);
		0 <= n && e.splice(n, 1);
	}
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscription.js
var La = function() {
	function e(e) {
		this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
	}
	return e.prototype.unsubscribe = function() {
		var e, t, n, r, i;
		if (!this.closed) {
			this.closed = !0;
			var a = this._parentage;
			if (a) {
				if (this._parentage = null, Array.isArray(a)) try {
					for (var o = Aa(a), s = o.next(); !s.done; s = o.next()) s.value.remove(this);
				} catch (t) {
					e = { error: t };
				} finally {
					try {
						s && !s.done && (t = o.return) && t.call(o);
					} finally {
						if (e) throw e.error;
					}
				}
				else a.remove(this);
			}
			var c = this.initialTeardown;
			if (Na(c)) try {
				c();
			} catch (e) {
				i = e instanceof Fa ? e.errors : [e];
			}
			var l = this._finalizers;
			if (l) {
				this._finalizers = null;
				try {
					for (var u = Aa(l), d = u.next(); !d.done; d = u.next()) {
						var f = d.value;
						try {
							Ba(f);
						} catch (e) {
							i ??= [], e instanceof Fa ? i = Ma(Ma([], ja(i)), ja(e.errors)) : i.push(e);
						}
					}
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						d && !d.done && (r = u.return) && r.call(u);
					} finally {
						if (n) throw n.error;
					}
				}
			}
			if (i) throw new Fa(i);
		}
	}, e.prototype.add = function(t) {
		if (t && t !== this) {
			if (this.closed) Ba(t);
			else {
				if (t instanceof e) {
					if (t.closed || t._hasParent(this)) return;
					t._addParent(this);
				}
				(this._finalizers = this._finalizers ?? []).push(t);
			}
		}
	}, e.prototype._hasParent = function(e) {
		var t = this._parentage;
		return t === e || Array.isArray(t) && t.includes(e);
	}, e.prototype._addParent = function(e) {
		var t = this._parentage;
		this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
	}, e.prototype._removeParent = function(e) {
		var t = this._parentage;
		t === e ? this._parentage = null : Array.isArray(t) && Ia(t, e);
	}, e.prototype.remove = function(t) {
		var n = this._finalizers;
		n && Ia(n, t), t instanceof e && t._removeParent(this);
	}, e.EMPTY = (function() {
		var t = new e();
		return t.closed = !0, t;
	})(), e;
}(), Ra = La.EMPTY;
function za(e) {
	return e instanceof La || e && "closed" in e && Na(e.remove) && Na(e.add) && Na(e.unsubscribe);
}
function Ba(e) {
	Na(e) ? e() : e.unsubscribe();
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/config.js
var Va = {
	onUnhandledError: null,
	onStoppedNotification: null,
	Promise: void 0,
	useDeprecatedSynchronousErrorHandling: !1,
	useDeprecatedNextContext: !1
}, Ha = {
	setTimeout: function(e, t) {
		var n = [...arguments].slice(2), r = Ha.delegate;
		return r?.setTimeout ? r.setTimeout.apply(r, Ma([e, t], ja(n))) : setTimeout.apply(void 0, Ma([e, t], ja(n)));
	},
	clearTimeout: function(e) {
		return (Ha.delegate?.clearTimeout || clearTimeout)(e);
	},
	delegate: void 0
};
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function Ua(e) {
	Ha.setTimeout(function() {
		var t = Va.onUnhandledError;
		if (t) t(e);
		else throw e;
	});
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/noop.js
function Wa() {}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var Ga = (function() {
	return Ja("C", void 0, void 0);
})();
function Ka(e) {
	return Ja("E", void 0, e);
}
function qa(e) {
	return Ja("N", e, void 0);
}
function Ja(e, t, n) {
	return {
		kind: e,
		value: t,
		error: n
	};
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var Ya = null;
function Xa(e) {
	if (Va.useDeprecatedSynchronousErrorHandling) {
		var t = !Ya;
		if (t && (Ya = {
			errorThrown: !1,
			error: null
		}), e(), t) {
			var n = Ya, r = n.errorThrown, i = n.error;
			if (Ya = null, r) throw i;
		}
	} else e();
}
function Za(e) {
	Va.useDeprecatedSynchronousErrorHandling && Ya && (Ya.errorThrown = !0, Ya.error = e);
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Qa = function(e) {
	ka(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.isStopped = !1, t ? (n.destination = t, za(t) && t.add(n)) : n.destination = oo, n;
	}
	return t.create = function(e, t, n) {
		return new no(e, t, n);
	}, t.prototype.next = function(e) {
		this.isStopped ? ao(qa(e), this) : this._next(e);
	}, t.prototype.error = function(e) {
		this.isStopped ? ao(Ka(e), this) : (this.isStopped = !0, this._error(e));
	}, t.prototype.complete = function() {
		this.isStopped ? ao(Ga, this) : (this.isStopped = !0, this._complete());
	}, t.prototype.unsubscribe = function() {
		this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
	}, t.prototype._next = function(e) {
		this.destination.next(e);
	}, t.prototype._error = function(e) {
		try {
			this.destination.error(e);
		} finally {
			this.unsubscribe();
		}
	}, t.prototype._complete = function() {
		try {
			this.destination.complete();
		} finally {
			this.unsubscribe();
		}
	}, t;
}(La), $a = Function.prototype.bind;
function eo(e, t) {
	return $a.call(e, t);
}
var to = function() {
	function e(e) {
		this.partialObserver = e;
	}
	return e.prototype.next = function(e) {
		var t = this.partialObserver;
		if (t.next) try {
			t.next(e);
		} catch (e) {
			ro(e);
		}
	}, e.prototype.error = function(e) {
		var t = this.partialObserver;
		if (t.error) try {
			t.error(e);
		} catch (e) {
			ro(e);
		}
		else ro(e);
	}, e.prototype.complete = function() {
		var e = this.partialObserver;
		if (e.complete) try {
			e.complete();
		} catch (e) {
			ro(e);
		}
	}, e;
}(), no = function(e) {
	ka(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this, a;
		if (Na(t) || !t) a = {
			next: t ?? void 0,
			error: n ?? void 0,
			complete: r ?? void 0
		};
		else {
			var o;
			i && Va.useDeprecatedNextContext ? (o = Object.create(t), o.unsubscribe = function() {
				return i.unsubscribe();
			}, a = {
				next: t.next && eo(t.next, o),
				error: t.error && eo(t.error, o),
				complete: t.complete && eo(t.complete, o)
			}) : a = t;
		}
		return i.destination = new to(a), i;
	}
	return t;
}(Qa);
function ro(e) {
	Va.useDeprecatedSynchronousErrorHandling ? Za(e) : Ua(e);
}
function io(e) {
	throw e;
}
function ao(e, t) {
	var n = Va.onStoppedNotification;
	n && Ha.setTimeout(function() {
		return n(e, t);
	});
}
var oo = {
	closed: !0,
	next: Wa,
	error: io,
	complete: Wa
}, so = (function() {
	return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/identity.js
function co(e) {
	return e;
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/pipe.js
function lo(e) {
	return e.length === 0 ? co : e.length === 1 ? e[0] : function(t) {
		return e.reduce(function(e, t) {
			return t(e);
		}, t);
	};
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Observable.js
var uo = function() {
	function e(e) {
		e && (this._subscribe = e);
	}
	return e.prototype.lift = function(t) {
		var n = new e();
		return n.source = this, n.operator = t, n;
	}, e.prototype.subscribe = function(e, t, n) {
		var r = this, i = mo(e) ? e : new no(e, t, n);
		return Xa(function() {
			var e = r, t = e.operator, n = e.source;
			i.add(t ? t.call(i, n) : n ? r._subscribe(i) : r._trySubscribe(i));
		}), i;
	}, e.prototype._trySubscribe = function(e) {
		try {
			return this._subscribe(e);
		} catch (t) {
			e.error(t);
		}
	}, e.prototype.forEach = function(e, t) {
		var n = this;
		return t = fo(t), new t(function(t, r) {
			var i = new no({
				next: function(t) {
					try {
						e(t);
					} catch (e) {
						r(e), i.unsubscribe();
					}
				},
				error: r,
				complete: t
			});
			n.subscribe(i);
		});
	}, e.prototype._subscribe = function(e) {
		return this.source?.subscribe(e);
	}, e.prototype[so] = function() {
		return this;
	}, e.prototype.pipe = function() {
		return lo([...arguments])(this);
	}, e.prototype.toPromise = function(e) {
		var t = this;
		return e = fo(e), new e(function(e, n) {
			var r;
			t.subscribe(function(e) {
				return r = e;
			}, function(e) {
				return n(e);
			}, function() {
				return e(r);
			});
		});
	}, e.create = function(t) {
		return new e(t);
	}, e;
}();
function fo(e) {
	return e ?? Va.Promise ?? Promise;
}
function po(e) {
	return e && Na(e.next) && Na(e.error) && Na(e.complete);
}
function mo(e) {
	return e && e instanceof Qa || po(e) && za(e);
}
// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var ho = Pa(function(e) {
	return function() {
		e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
	};
}), go = function(e) {
	ka(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
	}
	return t.prototype.lift = function(e) {
		var t = new _o(this, this);
		return t.operator = e, t;
	}, t.prototype._throwIfClosed = function() {
		if (this.closed) throw new ho();
	}, t.prototype.next = function(e) {
		var t = this;
		Xa(function() {
			var n, r;
			if (t._throwIfClosed(), !t.isStopped) {
				t.currentObservers ||= Array.from(t.observers);
				try {
					for (var i = Aa(t.currentObservers), a = i.next(); !a.done; a = i.next()) a.value.next(e);
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						a && !a.done && (r = i.return) && r.call(i);
					} finally {
						if (n) throw n.error;
					}
				}
			}
		});
	}, t.prototype.error = function(e) {
		var t = this;
		Xa(function() {
			if (t._throwIfClosed(), !t.isStopped) {
				t.hasError = t.isStopped = !0, t.thrownError = e;
				for (var n = t.observers; n.length;) n.shift().error(e);
			}
		});
	}, t.prototype.complete = function() {
		var e = this;
		Xa(function() {
			if (e._throwIfClosed(), !e.isStopped) {
				e.isStopped = !0;
				for (var t = e.observers; t.length;) t.shift().complete();
			}
		});
	}, t.prototype.unsubscribe = function() {
		this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
	}, Object.defineProperty(t.prototype, "observed", {
		get: function() {
			return this.observers?.length > 0;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._trySubscribe = function(t) {
		return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t);
	}, t.prototype._subscribe = function(e) {
		return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
	}, t.prototype._innerSubscribe = function(e) {
		var t = this, n = this, r = n.hasError, i = n.isStopped, a = n.observers;
		return r || i ? Ra : (this.currentObservers = null, a.push(e), new La(function() {
			t.currentObservers = null, Ia(a, e);
		}));
	}, t.prototype._checkFinalizedStatuses = function(e) {
		var t = this, n = t.hasError, r = t.thrownError, i = t.isStopped;
		n ? e.error(r) : i && e.complete();
	}, t.prototype.asObservable = function() {
		var e = new uo();
		return e.source = this, e;
	}, t.create = function(e, t) {
		return new _o(e, t);
	}, t;
}(uo), _o = function(e) {
	ka(t, e);
	function t(t, n) {
		var r = e.call(this) || this;
		return r.destination = t, r.source = n, r;
	}
	return t.prototype.next = function(e) {
		var t, n;
		(n = (t = this.destination)?.next) == null || n.call(t, e);
	}, t.prototype.error = function(e) {
		var t, n;
		(n = (t = this.destination)?.error) == null || n.call(t, e);
	}, t.prototype.complete = function() {
		var e, t;
		(t = (e = this.destination)?.complete) == null || t.call(e);
	}, t.prototype._subscribe = function(e) {
		return this.source?.subscribe(e) ?? Ra;
	}, t;
}(go), vo = /* @__PURE__ */ ce(Da(), 1), yo = new go();
// src/composables/useDialog.ts
function bo(e, t) {
	let n = T(!1), r = T(null), i, a = null;
	function o(r) {
		if (r.key !== e) return;
		let i = r.data;
		i.type === "close" ? n.value = !1 : (n.value = !0, t?.(i));
	}
	N(r, (e) => {
		l(), e?.$el && s(e.$el);
	}, { flush: "post" });
	function s(e) {
		a = (0, vo.default)(e).draggable({
			allowFrom: ".drag-handle",
			listeners: { move(e) {
				let t = e.target;
				if (!(t instanceof HTMLElement || t instanceof SVGElement)) return;
				let n = c(t.getAttribute("data-x")) + e.dx, r = c(t.getAttribute("data-y")) + e.dy;
				t.style.transform = `translate(${n}px, ${r}px)`, t.setAttribute("data-x", String(n)), t.setAttribute("data-y", String(r));
			} },
			modifiers: [vo.default.modifiers.restrictRect({
				restriction: "parent",
				endOnly: !0
			})]
		});
	}
	function c(e) {
		let t = parseFloat(e ?? "");
		return Number.isNaN(t) ? 0 : t;
	}
	function l() {
		a?.unset(), a = null;
	}
	return b(() => {
		i = yo.subscribe(o);
	}), S(() => {
		l(), i?.unsubscribe();
	}), {
		show: n,
		dialogRef: r
	};
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/bind.js
function xo(e, t) {
	return function() {
		return e.apply(t, arguments);
	};
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/utils.js
var { toString: So } = Object.prototype, { getPrototypeOf: Co } = Object, { iterator: wo, toStringTag: To } = Symbol, Eo = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Do = (e) => typeof e == "string" && (e === "__proto__" || e === "constructor" || e === "prototype"), Oo = (e, t, n) => e === Object.prototype || !n && t === null, ko = (e) => {
	if (!Object.isExtensible(e)) return !1;
	let t = Object.getOwnPropertyNames(e);
	return Object.getOwnPropertySymbols && t.push(...Object.getOwnPropertySymbols(e)), t.every((t) => {
		if (Do(t)) return !1;
		let n = Object.getOwnPropertyDescriptor(e, t);
		return !!n && n.configurable && n.writable === !0;
	});
}, Ao = (e, t) => {
	let n = e, r = [];
	for (; n != null;) {
		if (r.indexOf(n) !== -1) return !1;
		r.push(n);
		let i = Co(n);
		if (Oo(n, i, n === e)) return !1;
		if (Eo(n, t)) return !0;
		n = i;
	}
	return !1;
}, jo = (e, t) => e != null && Ao(e, t) ? e[t] : void 0, Mo = (e) => {
	if (e == null || typeof e != "object" && typeof e != "function") return e;
	let t = Co(e);
	if (t === null && ko(e)) return e;
	let n = Object.create(null), r = Object.create(null), i = [], a = e;
	for (; a != null && i.indexOf(a) === -1;) {
		i.push(a);
		let o = a === e ? t : Co(a);
		if (Oo(a, o, a === e)) break;
		let s = Object.getOwnPropertyNames(a);
		Object.getOwnPropertySymbols && s.push(...Object.getOwnPropertySymbols(a));
		for (let t of s) Do(t) || Eo(r, t) || (n[t] = e[t], r[t] = !0);
		a = o;
	}
	return n;
}, No = ((e) => (t) => {
	let n = So.call(t);
	return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(Object.create(null)), Po = (e) => (e = e.toLowerCase(), (t) => No(t) === e), Fo = (e) => (t) => typeof t === e, { isArray: Io } = Array, Lo = Fo("undefined");
function Ro(e) {
	return e !== null && !Lo(e) && e.constructor !== null && !Lo(e.constructor) && Ho(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
var zo = Po("ArrayBuffer");
function Bo(e) {
	let t;
	return t = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && zo(e.buffer), t;
}
var Vo = Fo("string"), Ho = Fo("function"), Uo = Fo("number"), Wo = (e) => typeof e == "object" && !!e, Go = (e) => e === !0 || e === !1, Ko = (e) => {
	if (!Wo(e)) return !1;
	let t = Co(e);
	return (t === null || t === Object.prototype || Co(t) === null) && !Ao(e, To) && !Ao(e, wo);
}, qo = (e) => {
	if (!Wo(e) || Ro(e)) return !1;
	try {
		return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
	} catch {
		return !1;
	}
}, Jo = Po("Date"), Yo = Po("File"), Xo = (e) => !!(e && e.uri !== void 0), Zo = (e) => e && e.getParts !== void 0, Qo = Po("Blob"), $o = Po("FileList"), es = Po("Set"), ts = (e) => Wo(e) && Ho(e.pipe);
function ns() {
	return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
var rs = ns(), is = rs.FormData === void 0 ? void 0 : rs.FormData, as = (e) => {
	if (!e) return !1;
	if (is && e instanceof is) return !0;
	let t = Co(e);
	if (!t || t === Object.prototype || !Ho(e.append)) return !1;
	let n = No(e);
	return n === "formdata" || n === "object" && Ho(e.toString) && e.toString() === "[object FormData]";
}, os = Po("URLSearchParams"), [ss, cs, ls, us] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(Po), ds = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function fs(e, t, { allOwnKeys: n = !1 } = {}) {
	if (e == null) return;
	let r, i;
	if (typeof e != "object" && (e = [e]), Io(e)) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
	else {
		if (Ro(e)) return;
		let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length, o;
		for (r = 0; r < a; r++) o = i[r], t.call(null, e[o], o, e);
	}
}
function ps(e, t) {
	if (Ro(e)) return null;
	t = t.toLowerCase();
	let n = Object.keys(e), r = n.length, i;
	for (; r-- > 0;) if (i = n[r], t === i.toLowerCase()) return i;
	return null;
}
var ms = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, hs = (e) => !Lo(e) && e !== ms;
function gs(...e) {
	let { caseless: t, skipUndefined: n } = hs(this) && this || {}, r = {}, i = (e, i) => {
		if (i === "__proto__" || i === "constructor" || i === "prototype") return;
		let a = t && typeof i == "string" && ps(r, i) || i, o = Eo(r, a) ? r[a] : void 0;
		Ko(o) && Ko(e) ? r[a] = gs(o, e) : Ko(e) ? r[a] = gs({}, e) : Io(e) ? r[a] = e.slice() : n && Lo(e) || (r[a] = e);
	};
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		if (!n || Ro(n) || (fs(n, i), typeof n != "object" || Io(n))) continue;
		let r = Object.getOwnPropertySymbols(n);
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			Os.call(n, t) && i(n[t], t);
		}
	}
	return r;
}
var _s = (e, t, n, { allOwnKeys: r } = {}) => (fs(t, (t, r) => {
	n && Ho(t) ? Object.defineProperty(e, r, {
		__proto__: null,
		value: xo(t, n),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : Object.defineProperty(e, r, {
		__proto__: null,
		value: t,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}, { allOwnKeys: r }), e), vs = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), ys = (e, t, n, r) => {
	e.prototype = Object.create(t.prototype, r), Object.defineProperty(e.prototype, "constructor", {
		__proto__: null,
		value: e,
		writable: !0,
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "super", {
		__proto__: null,
		value: t.prototype
	}), n && Object.assign(e.prototype, n);
}, bs = (e, t, n, r) => {
	let i, a, o, s = {};
	if (t ||= {}, e == null) return t;
	do {
		for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0;) o = i[a], r && !r(o, e, t) || s[o] || (t[o] = e[o], s[o] = !0);
		e = n !== !1 && Co(e);
	} while (e && (!n || n(e, t)) && e !== Object.prototype);
	return t;
}, xs = (e, t, n) => {
	e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
	let r = e.indexOf(t, n);
	return r !== -1 && r === n;
}, Ss = (e) => {
	if (!e) return null;
	if (Io(e)) return e;
	let t = e.length;
	if (!Uo(t)) return null;
	let n = Array(t);
	for (; t-- > 0;) n[t] = e[t];
	return n;
}, Cs = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Co(Uint8Array)), ws = (e, t) => {
	let n = (e && e[wo]).call(e), r;
	for (; (r = n.next()) && !r.done;) {
		let n = r.value;
		t.call(e, n[0], n[1]);
	}
}, Ts = (e, t) => {
	let n, r = [];
	for (; (n = e.exec(t)) !== null;) r.push(n);
	return r;
}, Es = Po("HTMLFormElement"), Ds = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, n) {
	return t.toUpperCase() + n;
}), { propertyIsEnumerable: Os } = Object.prototype, ks = Po("RegExp"), As = (e, t) => {
	let n = Object.getOwnPropertyDescriptors(e), r = {};
	fs(n, (n, i) => {
		let a;
		(a = t(n, i, e)) !== !1 && (r[i] = a || n);
	}), Object.defineProperties(e, r);
}, js = (e) => {
	As(e, (t, n) => {
		if (Ho(e) && [
			"arguments",
			"caller",
			"callee"
		].includes(n)) return !1;
		let r = e[n];
		Ho(r) && (t.enumerable = !1, "writable" in t ? t.writable = !1 : t.set ||= () => {
			throw Error("Can not rewrite read-only method '" + n + "'");
		});
	});
}, Ms = (e, t) => {
	let n = {}, r = (e) => {
		e.forEach((e) => {
			n[e] = !0;
		});
	};
	return Io(e) ? r(e) : r(String(e).split(t)), n;
}, Ns = () => {}, Ps = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Fs(e) {
	return !!(e && Ho(e.append) && e[To] === "FormData" && e[wo]);
}
var Is = (e) => {
	let t = /* @__PURE__ */ new WeakSet(), n = (e) => {
		if (Wo(e)) {
			if (t.has(e)) return;
			if (Ro(e)) return e;
			if (!("toJSON" in e)) {
				t.add(e);
				let r;
				if (es(e)) {
					r = [];
					for (let t of e) {
						let e = n(t);
						!Lo(e) && r.push(e);
					}
				} else r = Io(e) ? [] : {}, fs(e, (e, t) => {
					let i = n(e);
					!Lo(i) && (r[t] = i);
				});
				return t.delete(e), r;
			}
		}
		return e;
	};
	return n(e);
}, Ls = Po("AsyncFunction"), Rs = (e) => e && (Wo(e) || Ho(e)) && Ho(e.then) && Ho(e.catch), zs = ((e, t) => e ? setImmediate : t ? ((e, t) => (ms.addEventListener("message", ({ source: n, data: r }) => {
	n === ms && r === e && t.length && t.shift()();
}, !1), (n) => {
	t.push(n), ms.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(typeof setImmediate == "function", Ho(ms.postMessage)), Bs = typeof queueMicrotask < "u" ? queueMicrotask.bind(ms) : typeof process < "u" && process.nextTick || zs, Vs = (e) => e != null && Ho(e[wo]), Z = {
	isArray: Io,
	isArrayBuffer: zo,
	isBuffer: Ro,
	isFormData: as,
	isArrayBufferView: Bo,
	isString: Vo,
	isNumber: Uo,
	isBoolean: Go,
	isObject: Wo,
	isPlainObject: Ko,
	isEmptyObject: qo,
	isReadableStream: ss,
	isRequest: cs,
	isResponse: ls,
	isHeaders: us,
	isUndefined: Lo,
	isDate: Jo,
	isFile: Yo,
	isReactNativeBlob: Xo,
	isReactNative: Zo,
	isBlob: Qo,
	isRegExp: ks,
	isFunction: Ho,
	isStream: ts,
	isURLSearchParams: os,
	isTypedArray: Cs,
	isFileList: $o,
	forEach: fs,
	merge: gs,
	extend: _s,
	trim: ds,
	stripBOM: vs,
	inherits: ys,
	toFlatObject: bs,
	kindOf: No,
	kindOfTest: Po,
	endsWith: xs,
	toArray: Ss,
	forEachEntry: ws,
	matchAll: Ts,
	isHTMLForm: Es,
	hasOwnProperty: Eo,
	hasOwnProp: Eo,
	hasOwnInPrototypeChain: Ao,
	getSafeProp: jo,
	toSafeFlatObject: Mo,
	reduceDescriptors: As,
	freezeMethods: js,
	toObjectSet: Ms,
	toCamelCase: Ds,
	noop: Ns,
	toFiniteNumber: Ps,
	findKey: ps,
	global: ms,
	isContextDefined: hs,
	isSpecCompliantForm: Fs,
	toJSONObject: Is,
	isAsyncFn: Ls,
	isThenable: Rs,
	setImmediate: zs,
	asap: Bs,
	isIterable: Vs,
	isSafeIterable: (e) => e != null && Ao(e, wo) && Vs(e)
}, Hs = Z.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]), Us = (e) => {
	let t = {}, n, r, i;
	return e && e.split("\n").forEach(function(e) {
		i = e.indexOf(":"), n = e.substring(0, i).trim().toLowerCase(), r = e.substring(i + 1).trim();
		let a = Z.hasOwnProp(t, n);
		!n || a && Z.hasOwnProp(Hs, n) || (n === "set-cookie" ? a ? t[n].push(r) : t[n] = [r] : t[n] = a ? t[n] + ", " + r : r);
	}), t;
};
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function Ws(e) {
	let t = 0, n = e.length;
	for (; t < n;) {
		let n = e.charCodeAt(t);
		if (n !== 9 && n !== 32) break;
		t += 1;
	}
	for (; n > t;) {
		let t = e.charCodeAt(n - 1);
		if (t !== 9 && t !== 32) break;
		--n;
	}
	return t === 0 && n === e.length ? e : e.slice(t, n);
}
var Gs = /* @__PURE__ */ RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), Ks = /* @__PURE__ */ RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function qs(e, t) {
	return Z.isArray(e) ? e.map((e) => qs(e, t)) : Ws(String(e).replace(t, ""));
}
var Js = (e) => qs(e, Gs), Ys = (e) => qs(e, Ks);
function Xs(e) {
	let t = Object.create(null);
	return Z.forEach(e.toJSON(), (e, n) => {
		t[n] = Ys(e);
	}), t;
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/AxiosHeaders.js
var Zs = Symbol("internals");
function Qs(e) {
	return e && String(e).trim().toLowerCase();
}
function $s(e) {
	return e === !1 || e == null ? e : Z.isArray(e) ? e.map($s) : Js(String(e));
}
function ec(e) {
	let t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r;
	for (; r = n.exec(e);) t[r[1]] = r[2];
	return t;
}
var tc = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function nc(e) {
	let t = 0, n = e.length;
	for (; t < n;) {
		let n = e.charCodeAt(t);
		if (n !== 9 && n !== 32) break;
		t += 1;
	}
	for (; n > t;) {
		let t = e.charCodeAt(n - 1);
		if (t !== 9 && t !== 32) break;
		--n;
	}
	return t === 0 && n === e.length ? e : e.slice(t, n);
}
function rc(e) {
	let t = e.length - 1;
	if (t < 1 || e.charCodeAt(0) !== 34 || e.charCodeAt(t) !== 34) return e;
	let n = "";
	for (let r = 1; r < t; r++) {
		let i = e.charCodeAt(r);
		if (i === 34 || i === 92 && (r += 1, r >= t)) return e;
		n += e[r];
	}
	return n;
}
function ic(e) {
	let t = Object.create(null), n = String(e), r = 0, i = !1, a = !1;
	function o(e) {
		let i = nc(n.slice(r, e)), a = i.indexOf("=");
		if (a < 1) return;
		let o = nc(i.slice(0, a));
		if (!tc.test(o)) return;
		let s = o.toLowerCase();
		if (s === "__proto__" || s === "constructor" || s === "prototype") return;
		let c = nc(i.slice(a + 1));
		t[s] = rc(c);
	}
	for (let e = 0; e < n.length; e++) {
		let t = n.charCodeAt(e);
		i ? a ? a = !1 : t === 92 ? a = !0 : t === 34 && (i = !1) : t === 34 ? i = !0 : (t === 44 || t === 59) && (o(e), r = e + 1);
	}
	return o(n.length), t;
}
var ac = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function oc(e, t, n, r, i) {
	if (Z.isFunction(r)) return r.call(this, t, n);
	if (i && (t = n), Z.isString(t)) {
		if (Z.isString(r)) return t.indexOf(r) !== -1;
		if (Z.isRegExp(r)) return r.test(t);
	}
}
function sc(e) {
	return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function cc(e, t) {
	let n = Z.toCamelCase(" " + t);
	[
		"get",
		"set",
		"has"
	].forEach((r) => {
		Object.defineProperty(e, r + n, {
			__proto__: null,
			value: function(e, n, i) {
				return this[r].call(this, t, e, n, i);
			},
			configurable: !0
		});
	});
}
var lc = class {
	constructor(e) {
		e && this.set(e);
	}
	set(e, t, n) {
		let r = this;
		function i(e, t, n) {
			let i = Qs(t);
			if (!i) return;
			let a = Z.findKey(r, i);
			(!a || r[a] === void 0 || n === !0 || n === void 0 && r[a] !== !1) && (r[a || t] = $s(e));
		}
		let a = (e, t) => Z.forEach(e, (e, n) => i(e, n, t));
		if (Z.isPlainObject(e) || e instanceof this.constructor) a(e, t);
		else if (Z.isString(e) && (e = e.trim()) && !ac(e)) a(Us(e), t);
		else if (Z.isObject(e) && Z.isSafeIterable(e)) {
			let n = Object.create(null), r, i;
			for (let t of e) {
				if (!Z.isArray(t)) throw TypeError("Object iterator must return a key-value pair");
				i = t[0], Z.hasOwnProp(n, i) ? (r = n[i], n[i] = Z.isArray(r) ? [...r, t[1]] : [r, t[1]]) : n[i] = t[1];
			}
			a(n, t);
		} else e != null && i(t, e, n);
		return this;
	}
	get(e, t) {
		if (e = Qs(e), e) {
			let n = Z.findKey(this, e);
			if (n) {
				let e = this[n];
				if (!t) return e;
				if (t === !0) return ec(e);
				if (Z.isFunction(t)) return t.call(this, e, n);
				if (Z.isRegExp(t)) return t.exec(e);
				throw TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(e, t) {
		if (e = Qs(e), e) {
			let n = Z.findKey(this, e);
			return !(!n || this[n] === void 0 || t && !oc(this, this[n], n, t));
		}
		return !1;
	}
	delete(e, t) {
		let n = this, r = !1;
		function i(e) {
			if (e = Qs(e), e) {
				let i = Z.findKey(n, e);
				i && (!t || oc(n, n[i], i, t)) && (delete n[i], r = !0);
			}
		}
		return Z.isArray(e) ? e.forEach(i) : i(e), r;
	}
	clear(e) {
		let t = Object.keys(this), n = t.length, r = !1;
		for (; n--;) {
			let i = t[n];
			(!e || oc(this, this[i], i, e, !0)) && (delete this[i], r = !0);
		}
		return r;
	}
	normalize(e) {
		let t = this, n = {};
		return Z.forEach(this, (r, i) => {
			let a = Z.findKey(n, i);
			if (a) {
				t[a] = $s(r), delete t[i];
				return;
			}
			let o = e ? sc(i) : String(i).trim();
			o !== i && delete t[i], t[o] = $s(r), n[o] = !0;
		}), this;
	}
	concat(...e) {
		return this.constructor.concat(this, ...e);
	}
	toJSON(e) {
		let t = Object.create(null);
		return Z.forEach(this, (n, r) => {
			n != null && n !== !1 && (t[r] = e && Z.isArray(n) ? n.join(", ") : n);
		}), t;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join("\n");
	}
	getSetCookie() {
		let e = this.get("set-cookie");
		return Z.isArray(e) ? e : e == null || e === !1 ? [] : [e];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(e) {
		return e instanceof this ? e : new this(e);
	}
	static parseParameters(e) {
		return ic(e);
	}
	static concat(e, ...t) {
		let n = new this(e);
		return t.forEach((e) => n.set(e)), n;
	}
	static accessor(e) {
		let t = (this[Zs] = this[Zs] = { accessors: {} }).accessors, n = this.prototype;
		function r(e) {
			let r = Qs(e);
			t[r] || (cc(n, e), t[r] = !0);
		}
		return Z.isArray(e) ? e.forEach(r) : r(e), this;
	}
};
lc.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]), Z.reduceDescriptors(lc.prototype, ({ value: e }, t) => {
	let n = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(e) {
			this[n] = e;
		}
	};
}), Z.freezeMethods(lc);
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/AxiosError.js
var uc = "[REDACTED ****]";
function dc(e) {
	if (Z.hasOwnProp(e, "toJSON")) return !0;
	let t = Object.getPrototypeOf(e);
	for (; t && t !== Object.prototype;) {
		if (Z.hasOwnProp(t, "toJSON")) return !0;
		t = Object.getPrototypeOf(t);
	}
	return !1;
}
function fc(e, t) {
	let n = new Set(t.map((e) => String(e).toLowerCase())), r = [], i = (e) => {
		if (typeof e != "object" || !e || Z.isBuffer(e)) return e;
		if (r.indexOf(e) !== -1) return;
		e instanceof lc && (e = e.toJSON()), r.push(e);
		let t;
		if (Z.isArray(e)) t = [], e.forEach((e, n) => {
			let r = i(e);
			Z.isUndefined(r) || (t[n] = r);
		});
		else {
			if (!Z.isPlainObject(e) && dc(e)) return r.pop(), e;
			t = Object.create(null);
			for (let [r, a] of Object.entries(e)) {
				let e = n.has(r.toLowerCase()) ? uc : i(a);
				Z.isUndefined(e) || (t[r] = e);
			}
		}
		return r.pop(), t;
	};
	return i(e);
}
function pc(e) {
	try {
		return String(e);
	} catch {
		return "";
	}
}
function mc(e) {
	return e.errors.map((e) => {
		try {
			return e && e.message ? pc(e.message) : pc(e);
		} catch {
			return "";
		}
	}).filter(Boolean).join("; ") || e.name || "AggregateError";
}
var Q = class e extends Error {
	static from(t, n, r, i, a, o) {
		let s = t.message;
		!s && Z.isArray(t.errors) && t.errors.length && (s = mc(t));
		let c = new e(s, n || t.code, r, i, a);
		return Object.defineProperty(c, "cause", {
			__proto__: null,
			value: t,
			writable: !0,
			enumerable: !1,
			configurable: !0
		}), c.name = t.name, t.status != null && c.status == null && (c.status = t.status), o && Object.assign(c, o), c;
	}
	constructor(e, t, n, r, i) {
		super(e), Object.defineProperty(this, "message", {
			__proto__: null,
			value: e,
			enumerable: !0,
			writable: !0,
			configurable: !0
		}), this.name = "AxiosError", this.isAxiosError = !0, t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status);
	}
	toJSON() {
		let e = this.config, t = e && Z.hasOwnProp(e, "redact") ? e.redact : void 0, n = Z.isArray(t) && t.length > 0 ? fc(e, t) : Z.toJSONObject(e);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: n,
			code: this.code,
			status: this.status
		};
	}
};
Q.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE", Q.ERR_BAD_OPTION = "ERR_BAD_OPTION", Q.ECONNABORTED = "ECONNABORTED", Q.ETIMEDOUT = "ETIMEDOUT", Q.ECONNREFUSED = "ECONNREFUSED", Q.ERR_NETWORK = "ERR_NETWORK", Q.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS", Q.ERR_DEPRECATED = "ERR_DEPRECATED", Q.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE", Q.ERR_BAD_REQUEST = "ERR_BAD_REQUEST", Q.ERR_CANCELED = "ERR_CANCELED", Q.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT", Q.ERR_INVALID_URL = "ERR_INVALID_URL", Q.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
function hc(e) {
	return Z.isPlainObject(e) || Z.isArray(e);
}
function gc(e) {
	return Z.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function _c(e, t, n) {
	return e ? e.concat(t).map(function(e, t) {
		return e = gc(e), !n && t ? "[" + e + "]" : e;
	}).join(n ? "." : "") : t;
}
function vc(e) {
	return Z.isArray(e) && !e.some(hc);
}
var yc = Z.toFlatObject(Z, {}, null, function(e) {
	return /^is[A-Z]/.test(e);
});
function bc(e, t, n) {
	if (!Z.isObject(e)) throw TypeError("target must be an object");
	t ||= new FormData();
	let r = (e, t) => {
		let r = Z.getSafeProp(n, e);
		return Z.isUndefined(r) ? t : r;
	}, i = r("metaTokens", !0), a = r("visitor") || h, o = r("dots", !1), s = r("indexes", !1), c = r("Blob") || typeof Blob < "u" && Blob, l = r("maxDepth", 100), u = c && Z.isSpecCompliantForm(t), d = [];
	if (!Z.isFunction(a)) throw TypeError("visitor must be a function");
	function f(e) {
		if (e === null) return "";
		if (Z.isDate(e)) return e.toISOString();
		if (Z.isBoolean(e)) return e.toString();
		if (!u && Z.isBlob(e)) throw new Q("Blob is not supported. Use a Buffer instead.");
		if (Z.isArrayBuffer(e) || Z.isTypedArray(e)) {
			if (u && typeof c == "function") return new c([e]);
			throw new Q("Blob is not supported. Use a Buffer instead.", Q.ERR_NOT_SUPPORT);
		}
		return e;
	}
	function p(e) {
		if (e > l) throw new Q("Object is too deeply nested (" + e + " levels). Max depth: " + l, Q.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function m(e, t) {
		if (l === Infinity) return JSON.stringify(e);
		let n = [];
		return JSON.stringify(e, function(e, r) {
			if (!Z.isObject(r)) return r;
			for (; n.length && n[n.length - 1] !== this;) n.pop();
			return n.push(r), p(t + n.length - 1), r;
		});
	}
	function h(e, n, r) {
		let a = e;
		if (Z.isReactNative(t) && Z.isReactNativeBlob(e)) return t.append(_c(r, n, o), f(e)), !1;
		if (e && !r && typeof e == "object") {
			if (Z.endsWith(n, "{}")) n = i ? n : n.slice(0, -2), e = m(e, 1);
			else if (Z.isArray(e) && vc(e) || (Z.isFileList(e) || Z.endsWith(n, "[]")) && (a = Z.toArray(e))) return n = gc(n), a.forEach(function(e, r) {
				!(Z.isUndefined(e) || e === null) && t.append(s === !0 ? _c([n], r, o) : s === null ? n : n + "[]", f(e));
			}), !1;
		}
		return hc(e) ? !0 : (t.append(_c(r, n, o), f(e)), !1);
	}
	let g = Object.assign(yc, {
		defaultVisitor: h,
		convertValue: f,
		isVisitable: hc
	});
	function _(e, n, r = 0) {
		if (!Z.isUndefined(e)) {
			if (p(r), d.indexOf(e) !== -1) throw Error("Circular reference detected in " + n.join("."));
			d.push(e), Z.forEach(e, function(e, i) {
				(!(Z.isUndefined(e) || e === null) && a.call(t, e, Z.isString(i) ? i.trim() : i, n, g)) === !0 && _(e, n ? n.concat(i) : [i], r + 1);
			}), d.pop();
		}
	}
	if (!Z.isObject(e)) throw TypeError("data must be an object");
	return _(e), t;
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function xc(e) {
	let t = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(e).replace(/[!'()~]|%20/g, function(e) {
		return t[e];
	});
}
function Sc(e, t) {
	this._pairs = [], e && bc(e, this, t);
}
var Cc = Sc.prototype;
Cc.append = function(e, t) {
	this._pairs.push([e, t]);
}, Cc.toString = function(e) {
	let t = e ? (t) => e.call(this, t, xc) : xc;
	return this._pairs.map(function(e) {
		return t(e[0]) + "=" + t(e[1]);
	}, "").join("&");
};
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/buildURL.js
function wc(e) {
	return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Tc(e, t, n) {
	if (!t) return e;
	e ||= "";
	let r = Z.isFunction(n) ? { serialize: n } : n, i = Z.getSafeProp(r, "encode") || wc, a = Z.getSafeProp(r, "serialize"), o;
	if (o = a ? a(t, r) : Z.isURLSearchParams(t) ? t.toString() : new Sc(t, r).toString(i), o) {
		let t = e.indexOf("#");
		t !== -1 && (e = e.slice(0, t)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
	}
	return e;
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/InterceptorManager.js
var Ec = Symbol("internals");
function Dc(e) {
	return e ? e.length : 0;
}
function Oc(e) {
	if (e) for (; e.length && e[e.length - 1] === null;) e.pop();
}
function kc(e, t) {
	let n = e.handlers, r = Dc(n);
	n === t.handlersRef ? r !== t.handlersLength && (r ? t.handlerEntries.forEach(function(e, r) {
		n[e.index] !== e.handler && t.handlerEntries.delete(r);
	}) : t.handlerEntries.clear()) : (t.handlersRef = n, t.handlerEntries.clear()), t.handlersLength = r;
}
var Ac = class {
	constructor() {
		this.handlers = [], this[Ec] = {
			handlersRef: this.handlers,
			handlersLength: this.handlers.length,
			handlerEntries: /* @__PURE__ */ new Map(),
			iterationDepth: 0,
			nextId: 0
		};
	}
	use(e, t, n) {
		let r = {
			fulfilled: e,
			rejected: t,
			synchronous: n ? n.synchronous : !1,
			runWhen: n ? n.runWhen : null
		}, i = this[Ec];
		this.handlers ??= [], kc(this, i);
		let a = i.nextId++;
		return this.handlers.push(r), i.handlerEntries.set(a, {
			handler: r,
			index: this.handlers.length - 1
		}), i.handlersLength = this.handlers.length, a;
	}
	eject(e) {
		let t = this[Ec];
		kc(this, t);
		let n = t.handlerEntries.get(e);
		if (n) {
			if (t.handlerEntries.delete(e), this.handlers[n.index] !== n.handler) return;
			this.handlers[n.index] = null, t.iterationDepth || (Oc(this.handlers), t.handlersLength = this.handlers.length);
		}
	}
	clear() {
		this.handlers && (this.handlers = [], kc(this, this[Ec]));
	}
	forEach(e) {
		let t = this[Ec];
		kc(this, t), t.iterationDepth++;
		try {
			Z.forEach(this.handlers, function(t) {
				t !== null && e(t);
			});
		} finally {
			--t.iterationDepth || (kc(this, t), Oc(this.handlers), t.handlersLength = Dc(this.handlers));
		}
	}
}, jc = {
	silentJSONParsing: !0,
	forcedJSONParsing: !0,
	clarifyTimeoutError: !1,
	legacyInterceptorReqResOrdering: !0,
	advertiseZstdAcceptEncoding: !1,
	validateStatusUndefinedResolves: !0
}, Mc = {
	isBrowser: !0,
	classes: {
		URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : Sc,
		FormData: typeof FormData < "u" ? FormData : null,
		Blob: typeof Blob < "u" ? Blob : null
	},
	protocols: [
		"http",
		"https",
		"file",
		"blob",
		"url",
		"data"
	]
}, Nc = /* @__PURE__ */ L({
	hasBrowserEnv: () => Pc,
	hasStandardBrowserEnv: () => Ic,
	hasStandardBrowserWebWorkerEnv: () => Lc,
	navigator: () => Fc,
	origin: () => Rc
}), Pc = typeof window < "u" && typeof document < "u", Fc = typeof navigator == "object" && navigator || void 0, Ic = Pc && (!Fc || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(Fc.product) < 0), Lc = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Rc = Pc && window.location.href || "http://localhost", zc = {
	...Nc,
	...Mc
};
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/toURLEncodedForm.js
function Bc(e, t) {
	return bc(e, new zc.classes.URLSearchParams(), {
		visitor: function(e, t, n, r) {
			return zc.isNode && Z.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
		},
		...t
	});
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/formDataToJSON.js
var Vc = 100;
function Hc(e) {
	if (e > Vc) throw new Q("FormData field is too deeply nested (" + e + " levels). Max depth: " + Vc, Q.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
function Uc(e) {
	let t = [], n = /[^.[\]]+|\[([^.[\]]*)]/g, r;
	for (; (r = n.exec(e)) !== null;) Hc(t.length), t.push(r[0] === "[]" ? "" : r[1] || r[0]);
	return t;
}
function Wc(e) {
	let t = {}, n = Object.keys(e), r, i = n.length, a;
	for (r = 0; r < i; r++) a = n[r], t[a] = e[a];
	return t;
}
function Gc(e) {
	function t(e, n, r, i) {
		Hc(i);
		let a = e[i++];
		if (a === "__proto__") return !0;
		let o = Number.isFinite(+a), s = i >= e.length;
		return a = !a && Z.isArray(r) ? r.length : a, s ? (Z.hasOwnProp(r, a) ? r[a] = Z.isArray(r[a]) ? r[a].concat(n) : [r[a], n] : r[a] = n, !o) : (Z.hasOwnProp(r, a) && Z.isObject(r[a]) || (r[a] = []), t(e, n, r[a], i) && Z.isArray(r[a]) && (r[a] = Wc(r[a])), !o);
	}
	if (Z.isFormData(e) && Z.isFunction(e.entries)) {
		let n = {};
		return Z.forEachEntry(e, (e, r) => {
			t(Uc(e), r, n, 0);
		}), n;
	}
	return null;
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/methodList.js
var Kc = Object.freeze([
	"get",
	"delete",
	"head",
	"options",
	"post",
	"put",
	"patch",
	"purge",
	"link",
	"unlink",
	"query"
]), qc = (e, t) => e != null && Z.hasOwnProp(e, t) ? e[t] : void 0;
function Jc(e, t, n) {
	if (Z.isString(e)) try {
		return (t || JSON.parse)(e), Z.trim(e);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (n || JSON.stringify)(e);
}
var Yc = {
	transitional: jc,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function(e, t) {
		let n = t.getContentType() || "", r = n.indexOf("application/json") > -1, i = Z.isObject(e);
		if (i && Z.isHTMLForm(e) && (e = new FormData(e)), Z.isFormData(e)) return r ? JSON.stringify(Gc(e)) : e;
		if (Z.isArrayBuffer(e) || Z.isBuffer(e) || Z.isStream(e) || Z.isFile(e) || Z.isBlob(e) || Z.isReadableStream(e)) return e;
		if (Z.isArrayBufferView(e)) return e.buffer;
		if (Z.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
		let a;
		if (i) {
			let t = qc(this, "formSerializer");
			if (n.indexOf("application/x-www-form-urlencoded") > -1) return Bc(e, t).toString();
			if ((a = Z.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
				let n = qc(this, "env"), r = n && n.FormData;
				return bc(a ? { "files[]": e } : e, r && new r(), t);
			}
		}
		return i || r ? (t.setContentType("application/json", !1), Jc(e)) : e;
	}],
	transformResponse: [function(e) {
		let t = qc(this, "transitional") || Yc.transitional, n = t && t.forcedJSONParsing, r = qc(this, "responseType"), i = r === "json";
		if (Z.isResponse(e) || Z.isReadableStream(e)) return e;
		if (e && Z.isString(e) && (n && !r || i)) {
			let n = !(t && t.silentJSONParsing) && i;
			try {
				return JSON.parse(e, qc(this, "parseReviver"));
			} catch (e) {
				if (n) throw e.name === "SyntaxError" ? Q.from(e, Q.ERR_BAD_RESPONSE, this, null, qc(this, "response")) : e;
			}
		}
		return e;
	}],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: zc.classes.FormData,
		Blob: zc.classes.Blob
	},
	validateStatus: function(e) {
		return e >= 200 && e < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
Z.forEach(Kc, (e) => {
	Yc.headers[e] = {};
});
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/transformData.js
function Xc(e, t) {
	let n = this || Yc, r = t || n, i = lc.from(r.headers), a = r.data;
	return Z.forEach(e, function(e) {
		a = e.call(n, a, i.normalize(), t ? t.status : void 0);
	}), i.normalize(), a;
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/cancel/isCancel.js
function Zc(e) {
	return !!(e && e.__CANCEL__);
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/cancel/CanceledError.js
var Qc = class extends Q {
	constructor(e, t, n) {
		super(e ?? "canceled", Q.ERR_CANCELED, t, n), this.name = "CanceledError", this.__CANCEL__ = !0;
	}
};
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/settle.js
function $c(e, t, n) {
	let r = n.config.validateStatus;
	!n.status || !r || r(n.status) ? e(n) : t(new Q("Request failed with status code " + n.status, n.status >= 400 && n.status < 500 ? Q.ERR_BAD_REQUEST : Q.ERR_BAD_RESPONSE, n.config, n.request, n));
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js
var el = /[\t\n\r]/g;
function tl(e) {
	if (typeof e != "string") return e;
	let t = 0;
	for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
	return e.slice(t).replace(el, "");
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/parseProtocol.js
function nl(e) {
	let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
	return t && t[1] || "";
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/speedometer.js
function rl(e, t) {
	e ||= 10;
	let n = Array(e), r = Array(e), i = 0, a = 0, o;
	return t = t === void 0 ? 1e3 : t, function(s) {
		let c = Date.now(), l = r[a];
		o ||= c, n[i] = s, r[i] = c;
		let u = a, d = 0;
		for (; u !== i;) d += n[u++], u %= e;
		if (i = (i + 1) % e, i === a && (a = (a + 1) % e), c - o < t) return;
		let f = l && c - l;
		return f ? Math.round(d * 1e3 / f) : void 0;
	};
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/throttle.js
function il(e, t) {
	let n = 0, r = 1e3 / t, i, a, o = (t, r = Date.now()) => {
		n = r, i = null, a &&= (clearTimeout(a), null), e(...t);
	};
	return [
		(...e) => {
			let t = Date.now(), s = t - n;
			s >= r ? o(e, t) : (i = e, a ||= setTimeout(() => {
				a = null, o(i);
			}, r - s));
		},
		() => i && o(i),
		(...e) => o(e)
	];
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/progressEventReducer.js
var al = (e, t, n = 3) => {
	let r = 0, i = rl(50, 250);
	return il((n) => {
		if (!n || !Z.isNumber(n.loaded)) return;
		let a = n.loaded, o = n.lengthComputable ? n.total : void 0, s = Math.max(0, o == null ? a : Math.min(a, o)), c = Math.max(0, s - r), l = i(c);
		r = Math.max(r, s), e({
			loaded: s,
			total: o,
			progress: o ? s / o : void 0,
			bytes: c,
			rate: l || void 0,
			estimated: l && o ? (o - s) / l : void 0,
			event: n,
			lengthComputable: o != null,
			[t ? "download" : "upload"]: !0
		});
	}, n);
}, ol = (e, t) => {
	let n = e != null;
	return [(r) => t[0]({
		lengthComputable: n,
		total: e,
		loaded: r
	}), t[1]];
}, sl = (e, t = Z.asap) => (...n) => t(() => e(...n)), cl = zc.hasStandardBrowserEnv ? ((e, t) => (n) => (n = new URL(n, zc.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(zc.origin), zc.navigator && /(msie|trident)/i.test(zc.navigator.userAgent)) : () => !0, ll = zc.hasStandardBrowserEnv ? {
	write(e, t, n, r, i, a, o) {
		if (typeof document > "u") return;
		let s = [`${e}=${encodeURIComponent(t)}`];
		Z.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`), Z.isString(r) && s.push(`path=${r}`), Z.isString(i) && s.push(`domain=${i}`), a === !0 && s.push("secure"), Z.isString(o) && s.push(`SameSite=${o}`), document.cookie = s.join("; ");
	},
	read(e) {
		if (typeof document > "u") return null;
		let t = document.cookie.split(";");
		for (let n = 0; n < t.length; n++) {
			let r = t[n].replace(/^\s+/, ""), i = r.indexOf("=");
			if (i !== -1 && r.slice(0, i) === e) try {
				return decodeURIComponent(r.slice(i + 1));
			} catch {
				return r.slice(i + 1);
			}
		}
		return null;
	},
	remove(e) {
		this.write(e, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
};
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/isAbsoluteURL.js
function ul(e) {
	return typeof e == "string" && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/combineURLs.js
function dl(e, t) {
	if (!t) return e;
	let n = e.length;
	for (; n > 0 && e.charCodeAt(n - 1) === 47;) n--;
	return e.slice(0, n) + "/" + t.replace(/^\/+/, "");
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/buildFullPath.js
var fl = /^https?:(?!\/\/)/i;
function pl(e) {
	return e && e.replace(/(^|&)([^=&]*=)?[^&]+/g, (e, t, n = "") => `${t}${n}${uc}`);
}
function ml(e) {
	let t = e.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${uc}@`), n = t.indexOf("#"), r = (n === -1 ? t : t.slice(0, n)).replace(/([?&][^=&#]*=)[^&#]*/g, `$1${uc}`);
	return n === -1 ? r : `${r}#${pl(t.slice(n + 1))}`;
}
function hl(e, t) {
	if (typeof e == "string") {
		let n = tl(e);
		if (fl.test(n)) throw new Q(`Invalid URL ${JSON.stringify(ml(n))}: missing "//" after protocol`, Q.ERR_INVALID_URL, t);
	}
}
function gl(e, t, n, r) {
	hl(t, r);
	let i = !ul(t);
	return e && (i || n === !1) ? (hl(e, r), dl(e, t)) : t;
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/mergeConfig.js
var _l = (e) => e instanceof lc ? { ...e } : e, vl = (e) => Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor ? Object.keys(e).concat(Object.getOwnPropertySymbols(e).filter((t) => Object.getOwnPropertyDescriptor(e, t).enumerable)) : Object.keys(e);
function yl(e, t) {
	e ||= {}, t ||= {};
	let n = Object.create(null);
	Object.defineProperty(n, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: !1,
		writable: !0,
		configurable: !0
	});
	function r(e, t, n, r) {
		return Z.isPlainObject(e) && Z.isPlainObject(t) ? Z.merge.call({ caseless: r }, e, t) : Z.isPlainObject(t) ? Z.merge({}, t) : Z.isArray(t) ? t.slice() : t;
	}
	function i(e, t, n, i) {
		if (!Z.isUndefined(t)) return r(e, t, n, i);
		if (!Z.isUndefined(e)) return r(void 0, e, n, i);
	}
	function a(e, t) {
		if (!Z.isUndefined(t)) return r(void 0, t);
	}
	function o(e, t) {
		if (!Z.isUndefined(t)) return r(void 0, t);
		if (!Z.isUndefined(e)) return r(void 0, e);
	}
	function s(n) {
		let r = Z.hasOwnProp(t, "transitional") ? t.transitional : void 0;
		if (!Z.isUndefined(r)) {
			if (Z.isPlainObject(r)) {
				if (Z.hasOwnProp(r, n)) return r[n];
			} else return;
		}
		let i = Z.hasOwnProp(e, "transitional") ? e.transitional : void 0;
		if (Z.isPlainObject(i) && Z.hasOwnProp(i, n)) return i[n];
	}
	function c(n, i, a) {
		if (Z.hasOwnProp(t, a)) return r(n, i);
		if (Z.hasOwnProp(e, a)) return r(void 0, n);
	}
	let l = {
		url: a,
		method: a,
		data: a,
		baseURL: o,
		transformRequest: o,
		transformResponse: o,
		paramsSerializer: o,
		timeout: o,
		timeoutErrorMessage: o,
		withCredentials: o,
		withXSRFToken: o,
		adapter: o,
		responseType: o,
		xsrfCookieName: o,
		xsrfHeaderName: o,
		onUploadProgress: o,
		onDownloadProgress: o,
		decompress: o,
		maxContentLength: o,
		maxBodyLength: o,
		beforeRedirect: o,
		transport: o,
		httpAgent: o,
		httpsAgent: o,
		cancelToken: o,
		socketPath: o,
		allowedSocketPaths: o,
		responseEncoding: o,
		validateStatus: c,
		headers: (e, t, n) => i(_l(e), _l(t), n, !0)
	};
	return Z.forEach(vl({
		...e,
		...t
	}), function(r) {
		if (r === "__proto__" || r === "constructor" || r === "prototype") return;
		let a = Z.hasOwnProp(l, r) ? l[r] : i, o = a(Z.hasOwnProp(e, r) ? e[r] : void 0, Z.hasOwnProp(t, r) ? t[r] : void 0, r);
		Z.isUndefined(o) && a !== c || (n[r] = o);
	}), Z.hasOwnProp(t, "validateStatus") && Z.isUndefined(t.validateStatus) && s("validateStatusUndefinedResolves") === !1 && (Z.hasOwnProp(e, "validateStatus") ? n.validateStatus = r(void 0, e.validateStatus) : delete n.validateStatus), n;
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/setFormDataHeaders.js
var bl = ["content-type", "content-length"];
function xl(e, t, n) {
	n === "content-only" ? Object.entries(t || {}).forEach(([t, n]) => {
		bl.includes(t.toLowerCase()) && e.set(t, n);
	}) : e.set(t);
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/resolveConfig.js
var Sl = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16)));
function Cl(e) {
	let t = yl({}, e), n = (e) => Z.hasOwnProp(t, e) ? t[e] : void 0, r = n("data"), i = n("withXSRFToken"), a = n("xsrfHeaderName"), o = n("xsrfCookieName"), s = n("headers"), c = n("auth"), l = n("baseURL"), u = n("allowAbsoluteUrls"), d = n("url");
	if (t.headers = s = lc.from(s), t.url = Tc(gl(l, d, u, t), n("params"), n("paramsSerializer")), c) {
		let t = Z.getSafeProp(c, "username") || "", n = Z.getSafeProp(c, "password") || "";
		try {
			s.set("Authorization", "Basic " + btoa(t + ":" + (n ? Sl(n) : "")));
		} catch (t) {
			throw Q.from(t, Q.ERR_BAD_OPTION_VALUE, e);
		}
	}
	if (Z.isFormData(r)) {
		let e = Z.getSafeProp(r, "getHeaders");
		zc.hasStandardBrowserEnv || zc.hasStandardBrowserWebWorkerEnv || Z.isReactNative(r) ? s.setContentType(void 0) : Z.isFunction(e) && xl(s, e.call(r), n("formDataHeaderPolicy"));
	}
	if (zc.hasStandardBrowserEnv && (Z.isFunction(i) && (i = i(t)), i === !0 || i == null && cl(t.url))) {
		let e = a && o && ll.read(o);
		e && s.set(a, e);
	}
	return t;
}
var wl = typeof XMLHttpRequest < "u" && function(e) {
	return new Promise(function(t, n) {
		let r = Cl(e), i = r.data, a = lc.from(r.headers).normalize(), { responseType: o, onUploadProgress: s, onDownloadProgress: c } = r, l, u, d, f, p, m;
		function h() {
			f && f(), p && p(), r.cancelToken && r.cancelToken.unsubscribe(l), r.signal && r.signal.removeEventListener("abort", l);
		}
		let g = new XMLHttpRequest();
		g.open(r.method.toUpperCase(), r.url, !0), g.timeout = r.timeout;
		function _(i) {
			if (!g) return;
			if (g.status === 0 && (nl(tl(r.url)) || nl(zc.origin)) !== "file" && !(g.responseURL && g.responseURL.startsWith("file:"))) {
				n(new Q("Request aborted", Q.ECONNABORTED, e, g)), h(), g = null;
				return;
			}
			try {
				i ? m && m(i) : p && p();
			} catch (e) {
				setTimeout(() => {
					throw e;
				});
			}
			if (!g) return;
			let a = lc.from("getAllResponseHeaders" in g && g.getAllResponseHeaders());
			$c(function(e) {
				t(e), h();
			}, function(e) {
				n(e), h();
			}, {
				data: !o || o === "text" || o === "json" ? g.responseText : g.response,
				status: g.status,
				statusText: g.statusText,
				headers: a,
				config: e,
				request: g
			}), g = null;
		}
		"onloadend" in g ? g.onloadend = _ : g.onreadystatechange = function() {
			g && g.readyState === 4 && (g.status !== 0 || g.responseURL && g.responseURL.startsWith("file:")) && setTimeout(_);
		}, g.onabort = function() {
			g &&= (n(new Q("Request aborted", Q.ECONNABORTED, e, g)), h(), null);
		}, g.onerror = function(t) {
			let r = new Q(t && t.message ? t.message : "Network Error", Q.ERR_NETWORK, e, g);
			r.event = t || null, n(r), h(), g = null;
		}, g.ontimeout = function() {
			let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded", i = r.transitional || jc;
			r.timeoutErrorMessage && (t = r.timeoutErrorMessage), n(new Q(t, i.clarifyTimeoutError ? Q.ETIMEDOUT : Q.ECONNABORTED, e, g)), h(), g = null;
		}, i === void 0 && a.setContentType(null), "setRequestHeader" in g && Z.forEach(Xs(a), function(e, t) {
			g.setRequestHeader(t, e);
		}), Z.isUndefined(r.withCredentials) || (g.withCredentials = !!r.withCredentials), o && o !== "json" && (g.responseType = r.responseType), c && ([d, p, m] = al(c, !0), g.addEventListener("progress", d)), s && g.upload && ([u, f] = al(s), g.upload.addEventListener("progress", u), g.upload.addEventListener("loadend", f)), (r.cancelToken || r.signal) && (l = (t) => {
			g &&= (n(!t || t.type ? new Qc(null, e, g) : t), g.abort(), h(), null);
		}, r.cancelToken && r.cancelToken.subscribe(l), r.signal && (r.signal.aborted ? l() : r.signal.addEventListener("abort", l)));
		let v = nl(r.url);
		v && !zc.protocols.includes(v) ? (n(new Q("Unsupported protocol " + v + ":", Q.ERR_BAD_REQUEST, e)), h()) : g.send(i || null);
	});
}, Tl = (e, t) => {
	if (e = e ? e.filter(Boolean) : [], !t && !e.length) return;
	let n = new AbortController(), r = !1, i = function(e) {
		if (!r) {
			r = !0, o();
			let t = e instanceof Error ? e : this.reason;
			n.abort(t instanceof Q ? t : new Qc(t instanceof Error ? t.message : t));
		}
	}, a = t && setTimeout(() => {
		a = null, i(new Q(`timeout of ${t}ms exceeded`, Q.ETIMEDOUT));
	}, t), o = () => {
		e &&= (a && clearTimeout(a), a = null, e.forEach((e) => {
			e.unsubscribe ? e.unsubscribe(i) : e.removeEventListener("abort", i);
		}), null);
	};
	e.forEach((e) => {
		r || (e.aborted ? i.call(e) : e.addEventListener("abort", i, { once: !0 }));
	});
	let { signal: s } = n;
	return s.unsubscribe = () => Z.asap(o), s;
}, El = function* (e, t) {
	let n = e.byteLength;
	if (!t || n < t) {
		yield e;
		return;
	}
	let r = 0, i;
	for (; r < n;) i = r + t, yield e.slice(r, i), r = i;
}, Dl = async function* (e, t) {
	for await (let n of Ol(e)) yield* El(n, t);
}, Ol = async function* (e) {
	if (e[Symbol.asyncIterator]) {
		yield* e;
		return;
	}
	let t = e.getReader();
	try {
		for (;;) {
			let { done: e, value: n } = await t.read();
			if (e) break;
			yield n;
		}
	} finally {
		await t.cancel();
	}
}, kl = (e, t, n, r) => {
	let i = Dl(e, t), a = 0, o, s = (e) => {
		o || (o = !0, r && r(e));
	};
	return new ReadableStream({
		async pull(e) {
			try {
				let { done: t, value: r } = await i.next();
				if (t) {
					s(), e.close();
					return;
				}
				let o = r.byteLength;
				n && n(a += o), e.enqueue(new Uint8Array(r));
			} catch (e) {
				throw s(e), e;
			}
		},
		cancel(e) {
			return s(e), i.return();
		}
	}, { highWaterMark: 2 });
}, Al = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, jl = (e, t, n) => t + 2 < n && Al(e.charCodeAt(t + 1)) && Al(e.charCodeAt(t + 2)), Ml = (e) => e <= 57 ? e - 48 : (e & 223) - 55, Nl = (e) => e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || e === 43 || e === 47 || e === 45 || e === 95, Pl = (e) => e === 9 || e === 10 || e === 12 || e === 13 || e === 32, Fl = (e) => {
	let t = Math.floor(e / 4), n = e % 4;
	return t * 3 + (n === 2 ? 1 : n === 3 ? 2 : 0);
}, Il = (e) => {
	let t = e.length, n = 0;
	return t > 0 && e.charCodeAt(t - 1) === 61 && (n++, t > 1 && e.charCodeAt(t - 2) === 61 && n++), Math.floor((t - n) * 3 / 4);
}, Ll = (e) => {
	let t = e.length, n = 0, r = 0, i = !1;
	for (let a = 0; a < t; a++) {
		let o = e.charCodeAt(a);
		o === 37 && jl(e, a, t) && (o = Ml(e.charCodeAt(a + 1)) * 16 + Ml(e.charCodeAt(a + 2)), a += 2), !Pl(o) && (o === 61 ? r++ : !Nl(o) || r > 0 ? i = !0 : n++);
	}
	return i || r > 2 || r > 0 && (n + r) % 4 != 0 || n % 4 == 1 ? Il(e) : Fl(n);
}, Rl = (e, t) => {
	if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
	let n = e.indexOf(",");
	if (n < 0) return 0;
	let r = e.slice(5, n), i = e.slice(n + 1);
	if (/;base64/i.test(r)) return t(i);
	let a = 0;
	for (let e = 0, t = i.length; e < t; e++) {
		let n = i.charCodeAt(e);
		if (n === 37 && jl(i, e, t)) a += 1, e += 2;
		else if (n < 128) a += 1;
		else if (n < 2048) a += 2;
		else if (n >= 55296 && n <= 56319 && e + 1 < t) {
			let t = i.charCodeAt(e + 1);
			t >= 56320 && t <= 57343 ? (a += 4, e++) : a += 3;
		} else a += 3;
	}
	return a;
};
function zl(e) {
	let t = typeof e == "string" ? e.indexOf("#") : -1;
	return Rl(t === -1 ? e : e.slice(0, t), Ll);
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/env/data.js
var Bl = "1.20.0", Vl = 65536, Hl = {
	cache: "default",
	redirect: "follow",
	referrer: "about:client",
	referrerPolicy: "",
	mode: "cors",
	integrity: "",
	keepalive: !1,
	priority: "auto",
	window: null
}, { isFunction: Ul } = Z, Wl = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16))), Gl = (e) => {
	if (!Z.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, Kl = (e, ...t) => {
	try {
		return !!e(...t);
	} catch {
		return !1;
	}
}, ql = (e) => {
	let t = e.indexOf("://"), n = e;
	return t !== -1 && (n = n.slice(t + 3)), n.includes("@") || n.includes(":");
}, Jl = (e) => {
	let t = Z.global !== void 0 && Z.global !== null ? Z.global : globalThis, { ReadableStream: n, TextEncoder: r } = t;
	e = Z.merge.call({ skipUndefined: !0 }, {
		Request: t.Request,
		Response: t.Response
	}, e);
	let { fetch: i, Request: a, Response: o } = e, s = i ? Ul(i) : typeof fetch == "function", c = Ul(a), l = Ul(o);
	if (!s) return !1;
	let u = s && Ul(n), d = s && (typeof r == "function" ? ((e) => (t) => e.encode(t))(new r()) : async (e) => new Uint8Array(await new a(e).arrayBuffer())), f = c && u && Kl(() => {
		let e = !1, t = new a(zc.origin, {
			body: new n(),
			method: "POST",
			get duplex() {
				return e = !0, "half";
			}
		}), r = t.headers.has("Content-Type");
		return t.body != null && t.body.cancel(), e && !r;
	}), p = l && u && Kl(() => Z.isReadableStream(new o("").body)), m = { stream: p && ((e) => e.body) };
	s && [
		"text",
		"arrayBuffer",
		"blob",
		"formData",
		"stream"
	].forEach((e) => {
		!m[e] && (m[e] = (t, n) => {
			let r = t && t[e];
			if (r) return r.call(t);
			throw new Q(`Response type '${e}' is not supported`, Q.ERR_NOT_SUPPORT, n);
		});
	});
	let h = async (e) => {
		if (e == null) return 0;
		if (Z.isBlob(e)) return e.size;
		if (Z.isSpecCompliantForm(e)) return (await new a(zc.origin, {
			method: "POST",
			body: e
		}).arrayBuffer()).byteLength;
		if (Z.isArrayBufferView(e) || Z.isArrayBuffer(e)) return e.byteLength;
		if (Z.isURLSearchParams(e) && (e += ""), Z.isString(e)) return (await d(e)).byteLength;
	}, g = async (e, t) => Z.toFiniteNumber(e.getContentLength()) ?? h(t);
	return async (e) => {
		let { url: t, method: n, data: s, signal: l, cancelToken: d, timeout: _, onDownloadProgress: v, onUploadProgress: y, responseType: b, headers: x, withCredentials: S = "same-origin", fetchOptions: C, maxContentLength: w, maxBodyLength: T, maxRedirects: ee } = Cl(e), E = Z.isNumber(w) && w > -1, D = Z.isNumber(T) && T > -1, O = (t) => Z.hasOwnProp(e, t) ? e[t] : void 0, k = i || fetch;
		b = b ? (b + "").toLowerCase() : "text";
		let A = Tl([l, d && d.toAbortSignal()], _), j = null, M = A && A.unsubscribe && (() => {
			A.unsubscribe();
		}), N, P = null, te = () => new Q("Request body larger than maxBodyLength limit", Q.ERR_BAD_REQUEST, e, j);
		try {
			let i, l = O("auth");
			if (l && (i = {
				username: Z.getSafeProp(l, "username") || "",
				password: Z.getSafeProp(l, "password") || ""
			}), ql(t)) {
				let e = new URL(t, zc.origin);
				!i && (e.username || e.password) && (i = {
					username: Gl(e.username),
					password: Gl(e.password)
				}), (e.username || e.password) && (e.username = "", e.password = "", t = e.href);
			}
			if (i && (x.delete("authorization"), x.set("Authorization", "Basic " + btoa(Wl((i.username || "") + ":" + (i.password || ""))))), E && typeof t == "string" && t.startsWith("data:") && zl(t) > w) throw new Q("maxContentLength size of " + w + " exceeded", Q.ERR_BAD_RESPONSE, e, j);
			if (D && n !== "get" && n !== "head") {
				let e = await h(s);
				if (typeof e == "number" && isFinite(e) && (N = e, e > T)) throw te();
			}
			let d = D && (Z.isReadableStream(s) || Z.isStream(s)), _ = (e, t, n) => kl(e, Vl, (e) => {
				if (D && e > T) throw P = te();
				t && t(e);
			}, n);
			if (f && n !== "get" && n !== "head" && (y || d)) {
				if (N ??= await g(x, s), N !== 0 || d) {
					let e = new a(t, {
						method: "POST",
						body: s,
						duplex: "half"
					}), n;
					if (Z.isFormData(s) && (n = e.headers.get("content-type")) && x.setContentType(n), e.body) {
						let [t, n] = y && ol(N, al(sl(y))) || [];
						s = _(e.body, t, n);
					}
				}
			} else if (d && !c && u && n !== "get" && n !== "head") s = _(s);
			else if (d && c && !f && n !== "get" && n !== "head") throw new Q("Stream request bodies are not supported by the current fetch implementation", Q.ERR_NOT_SUPPORT, e, j);
			Z.isString(S) || (S = S ? "include" : "omit");
			let ne = c && "credentials" in a.prototype;
			if (Z.isFormData(s)) {
				let e = x.getContentType();
				e && /^multipart\/form-data/i.test(e) && !/boundary=/i.test(e) && x.delete("content-type");
			}
			x.set("User-Agent", "axios/" + Bl, !1);
			let F = C == null ? C : Object.assign(Object.create(null), C);
			F && (delete F.body, delete F.headers, delete F.method, delete F.signal, delete F.duplex, delete F.credentials);
			let I = Object.assign(Object.create(null), F, {
				signal: A,
				method: n.toUpperCase(),
				headers: Xs(x.normalize()),
				body: s,
				duplex: "half",
				credentials: ne ? S : void 0
			});
			c && (Z.forEach(Hl, (e, t) => {
				I[t] === void 0 && (I[t] = e);
			}), I.signal === void 0 && (I.signal = null), I.body === void 0 && (I.body = null)), ee === 0 && (I.redirect = "manual", F && (F.redirect = "manual")), j = c && new a(t, I);
			let re = await (c ? k(j, F) : k(t, I)), ie = lc.from(re.headers);
			if (E) {
				let t = Z.toFiniteNumber(ie.getContentLength());
				if (t != null && t > w) throw new Q("maxContentLength size of " + w + " exceeded", Q.ERR_BAD_RESPONSE, e, j);
			}
			let ae = p && (b === "stream" || b === "response");
			if (p && re.body && (v || E || ae && M)) {
				let t = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((e) => {
					t[e] = re[e];
				});
				let n = Z.toFiniteNumber(ie.getContentLength()), [r, i] = v && ol(n, al(sl(v), !0)) || [], a = 0;
				re = new o(kl(re.body, Vl, (t) => {
					if (E && (a = t, a > w)) throw new Q("maxContentLength size of " + w + " exceeded", Q.ERR_BAD_RESPONSE, e, j);
					r && r(t);
				}, () => {
					i && i(), M && M();
				}), t);
			}
			b ||= "text";
			let oe = await m[Z.findKey(m, b) || "text"](re, e);
			if (E && !p && !ae) {
				let t;
				if (oe != null && (typeof oe.byteLength == "number" ? t = oe.byteLength : typeof oe.size == "number" ? t = oe.size : typeof oe == "string" && (t = typeof r == "function" ? new r().encode(oe).byteLength : oe.length)), typeof t == "number" && t > w) throw new Q("maxContentLength size of " + w + " exceeded", Q.ERR_BAD_RESPONSE, e, j);
			}
			return !ae && M && M(), await new Promise((t, n) => {
				$c(t, n, {
					data: oe,
					headers: lc.from(re.headers),
					status: re.status,
					statusText: re.statusText,
					config: e,
					request: j
				});
			});
		} catch (t) {
			if (M && M(), A && A.aborted && A.reason instanceof Q) {
				let n = A.reason;
				throw n.config = e, j && (n.request = j), t !== n && Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			if (P) throw j && !P.request && (P.request = j), P;
			if (t instanceof Q) throw j && !t.request && (t.request = j), t;
			if (t && t.name === "TypeError" && /Load failed|fetch/i.test(t.message)) {
				let n = new Q("Network Error", Q.ERR_NETWORK, e, j, t && t.response);
				throw Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t.cause || t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			throw Q.from(t, t && t.code, e, j, t && t.response);
		}
	};
}, Yl = /* @__PURE__ */ new Map(), Xl = (e) => {
	let t = e && e.env || {}, { fetch: n, Request: r, Response: i } = t, a = [
		r,
		i,
		n
	], o = a.length, s, c, l = Yl;
	for (; o--;) s = a[o], c = l.get(s), c === void 0 && l.set(s, c = o ? /* @__PURE__ */ new Map() : Jl(t)), l = c;
	return c;
};
Xl();
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/adapters/adapters.js
var Zl = {
	http: null,
	xhr: wl,
	fetch: { get: Xl }
};
Z.forEach(Zl, (e, t) => {
	if (e) {
		try {
			Object.defineProperty(e, "name", {
				__proto__: null,
				value: t
			});
		} catch {}
		Object.defineProperty(e, "adapterName", {
			__proto__: null,
			value: t
		});
	}
});
var Ql = (e) => `- ${e}`, $l = (e) => Z.isFunction(e) || e === null || e === !1;
function eu(e, t) {
	e = Z.isArray(e) ? e : [e];
	let { length: n } = e, r, i, a = {};
	for (let o = 0; o < n; o++) {
		r = e[o];
		let n;
		if (i = r, !$l(r) && (i = Zl[(n = String(r)).toLowerCase()], i === void 0)) throw new Q(`Unknown adapter '${n}'`);
		if (i && (Z.isFunction(i) || (i = i.get(t)))) break;
		a[n || "#" + o] = i;
	}
	if (!i) {
		let e = Object.entries(a).map(([e, t]) => `adapter ${e} ` + (t === !1 ? "is not supported by the environment" : "is not available in the build"));
		throw new Q("There is no suitable adapter to dispatch the request " + (n ? e.length > 1 ? "since :\n" + e.map(Ql).join("\n") : " " + Ql(e[0]) : "as no adapter specified"), Q.ERR_NOT_SUPPORT);
	}
	return i;
}
var tu = {
	getAdapter: eu,
	adapters: Zl
};
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/core/dispatchRequest.js
function nu(e) {
	if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Qc(null, e);
}
function ru(e) {
	let t = Z.toSafeFlatObject(e);
	return nu(t), t.headers = lc.from(Z.getSafeProp(t, "headers")), t.data = Xc.call(t, t.transformRequest), [
		"post",
		"put",
		"patch"
	].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), tu.getAdapter(t.adapter || Yc.adapter, t)(t).then(function(e) {
		nu(t), t.response = e;
		try {
			e.data = Xc.call(t, t.transformResponse, e);
		} finally {
			delete t.response;
		}
		return e.headers = lc.from(e.headers), e;
	}, function(e) {
		if (!Zc(e) && (nu(t), e && e.response)) {
			t.response = e.response;
			try {
				e.response.data = Xc.call(t, t.transformResponse, e.response);
			} finally {
				delete t.response;
			}
			e.response.headers = lc.from(e.response.headers);
		}
		return Promise.reject(e);
	});
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/validator.js
var iu = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((e, t) => {
	iu[e] = function(n) {
		return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
	};
});
var au = {};
iu.transitional = function(e, t, n) {
	function r(e, t) {
		return "[Axios v" + Bl + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
	}
	return (n, i, a) => {
		if (e === !1) throw new Q(r(i, " has been removed" + (t ? " in " + t : "")), Q.ERR_DEPRECATED);
		return t && !au[i] && (au[i] = !0, console.warn(r(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, i, a);
	};
}, iu.spelling = function(e) {
	return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function ou(e, t, n) {
	if (typeof e != "object" || !e) throw new Q("options must be an object", Q.ERR_BAD_OPTION_VALUE);
	let r = Object.keys(e), i = r.length;
	for (; i-- > 0;) {
		let a = r[i], o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
		if (o) {
			let t = e[a], n = t === void 0 || o(t, a, e);
			if (n !== !0) throw new Q("option " + a + " must be " + n, Q.ERR_BAD_OPTION_VALUE);
		} else if (n !== !0) throw new Q("Unknown option " + a, Q.ERR_BAD_OPTION);
	}
}
var su = {
	assertOptions: ou,
	validators: iu
}, cu = su.validators, lu = class {
	constructor(e) {
		this.defaults = e || {}, this.interceptors = {
			request: new Ac(),
			response: new Ac()
		};
	}
	async request(e, t) {
		try {
			return await this._request(e, t);
		} catch (e) {
			if (e instanceof Error) try {
				let t = {};
				Error.captureStackTrace ? Error.captureStackTrace(t) : t = /* @__PURE__ */ Error();
				let n = t.stack, r = "";
				if (typeof n == "string") {
					let e = n.indexOf("\n");
					r = e === -1 ? "" : n.slice(e + 1);
				}
				if (!e.stack) e.stack = r;
				else if (r) {
					let t = r.indexOf("\n"), n = t === -1 ? -1 : r.indexOf("\n", t + 1), i = n === -1 ? "" : r.slice(n + 1);
					String(e.stack).endsWith(i) || (e.stack += "\n" + r);
				}
			} catch {}
			throw e;
		}
	}
	_request(e, t) {
		typeof e == "string" ? (t ||= {}, t.url = e) : t = e || {}, t = yl(this.defaults, t);
		let { transitional: n, paramsSerializer: r, headers: i } = t;
		n !== void 0 && su.assertOptions(n, {
			silentJSONParsing: cu.transitional(cu.boolean),
			forcedJSONParsing: cu.transitional(cu.boolean),
			clarifyTimeoutError: cu.transitional(cu.boolean),
			legacyInterceptorReqResOrdering: cu.transitional(cu.boolean),
			advertiseZstdAcceptEncoding: cu.transitional(cu.boolean),
			validateStatusUndefinedResolves: cu.transitional(cu.boolean)
		}, !1), r != null && (Z.isFunction(r) ? t.paramsSerializer = { serialize: r } : su.assertOptions(r, {
			encode: cu.function,
			serialize: cu.function
		}, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls === void 0 ? t.allowAbsoluteUrls = !0 : t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls), su.assertOptions(t, {
			baseUrl: cu.spelling("baseURL"),
			withXsrfToken: cu.spelling("withXSRFToken")
		}, !0), t.method = (Z.getSafeProp(t, "method") || Z.getSafeProp(this.defaults, "method") || "get").toLowerCase();
		let a = i && Z.merge(i.common, i[t.method]);
		i && Z.forEach(Kc.concat("common"), (e) => {
			delete i[e];
		}), t.headers = lc.concat(a, i);
		let o = [], s = !0;
		this.interceptors.request.forEach(function(e) {
			if (typeof e.runWhen == "function" && e.runWhen(t) === !1) return;
			s &&= e.synchronous;
			let n = t.transitional || jc;
			n && n.legacyInterceptorReqResOrdering ? o.unshift(e.fulfilled, e.rejected) : o.push(e.fulfilled, e.rejected);
		});
		let c = [];
		this.interceptors.response.forEach(function(e) {
			c.push(e.fulfilled, e.rejected);
		});
		let l, u = 0, d;
		if (!s) {
			let e = [ru.bind(this), void 0];
			for (e.unshift(...o), e.push(...c), d = e.length, l = Promise.resolve(t); u < d;) l = l.then(e[u++], e[u++]);
			return l;
		}
		d = o.length;
		let f = t;
		for (; u < d;) {
			let e = o[u++], t = o[u++];
			try {
				f = e ? e(f) : f;
			} catch (e) {
				if (!t) {
					l = Promise.reject(e);
					break;
				}
				try {
					let n = t.call(this, e);
					Z.isThenable(n) && (l = Promise.resolve(n).then(() => ru.call(this, f)));
				} catch (e) {
					l = Promise.reject(e);
				}
				break;
			}
		}
		if (!l) try {
			l = ru.call(this, f);
		} catch (e) {
			l = Promise.reject(e);
		}
		for (u = 0, d = c.length; u < d;) l = l.then(c[u++], c[u++]);
		return l;
	}
	getUri(e) {
		return e = yl(this.defaults, e), Tc(gl(e.baseURL, e.url, e.allowAbsoluteUrls, e), e.params, e.paramsSerializer);
	}
};
Z.forEach([
	"delete",
	"get",
	"head",
	"options"
], function(e) {
	lu.prototype[e] = function(t, n) {
		return this.request(yl(n || {}, {
			method: e,
			url: t,
			data: n && Z.hasOwnProp(n, "data") ? n.data : void 0
		}));
	};
}), Z.forEach([
	"post",
	"put",
	"patch",
	"query"
], function(e) {
	function t(t) {
		return function(n, r, i) {
			return this.request(yl(i || {}, {
				method: e,
				headers: t ? { "Content-Type": "multipart/form-data" } : {},
				url: n,
				data: r
			}));
		};
	}
	lu.prototype[e] = t(), e !== "query" && (lu.prototype[e + "Form"] = t(!0));
});
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/cancel/CancelToken.js
var uu = class e {
	constructor(e) {
		if (typeof e != "function") throw TypeError("executor must be a function.");
		let t;
		this.promise = new Promise(function(e) {
			t = e;
		});
		let n = this;
		this.promise.then((e) => {
			if (!n._listeners) return;
			let t = n._listeners.length;
			for (; t-- > 0;) n._listeners[t](e);
			n._listeners = null;
		}), this.promise.then = (e) => {
			let t, r = new Promise((e) => {
				n.subscribe(e), t = e;
			}).then(e);
			return r.cancel = function() {
				n.unsubscribe(t);
			}, r;
		}, e(function(e, r, i) {
			n.reason || (n.reason = new Qc(e, r, i), t(n.reason));
		});
	}
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	subscribe(e) {
		this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e];
	}
	unsubscribe(e) {
		if (!this._listeners) return;
		let t = this._listeners.indexOf(e);
		t !== -1 && this._listeners.splice(t, 1);
	}
	toAbortSignal() {
		let e = new AbortController(), t = (t) => {
			e.abort(t);
		};
		return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
	}
	static source() {
		let t;
		return {
			token: new e(function(e) {
				t = e;
			}),
			cancel: t
		};
	}
};
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/spread.js
function du(e) {
	return function(t) {
		return e.apply(null, t);
	};
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/isAxiosError.js
function fu(e) {
	return Z.isObject(e) && e.isAxiosError === !0;
}
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/helpers/HttpStatusCode.js
var pu = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	ContentTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	UnprocessableContent: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerReturnsAnUnknownError: 520,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(pu).forEach(([e, t]) => {
	pu[t] === void 0 && (pu[t] = e);
});
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/lib/axios.js
function mu(e) {
	let t = new lu(e), n = xo(lu.prototype.request, t);
	return Z.extend(n, lu.prototype, t, { allOwnKeys: !0 }), Z.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(t) {
		return mu(yl(e, t));
	}, n;
}
var $ = mu(Yc);
$.Axios = lu, $.CanceledError = Qc, $.CancelToken = uu, $.isCancel = Zc, $.VERSION = Bl, $.toFormData = bc, $.AxiosError = Q, $.Cancel = $.CanceledError, $.all = function(e) {
	return Promise.all(e);
}, $.spread = du, $.isAxiosError = fu, $.mergeConfig = yl, $.AxiosHeaders = lc, $.formToJSON = (e) => Gc(Z.isHTMLForm(e) ? new FormData(e) : e), $.getAdapter = tu.getAdapter, $.HttpStatusCode = pu, $.default = $;
// node_modules/.pnpm/axios@1.20.0_debug@4.4.3_supports-color@7.2.0__supports-color@7.2.0/node_modules/axios/index.js
var { Axios: hu, AxiosError: gu, CanceledError: _u, isCancel: vu, CancelToken: yu, VERSION: bu, all: xu, Cancel: Su, isAxiosError: Cu, spread: wu, toFormData: Tu, AxiosHeaders: Eu, HttpStatusCode: Du, formToJSON: Ou, getAdapter: ku, mergeConfig: Au, create: ju } = $, Mu = null;
function Nu(e) {
	Mu === null ? Mu = e : console.warn("[LinPulsar Core] HTTP client has already been initialized. Re-initialization is ignored.");
}
function Pu() {
	if (Mu === null) throw Error("[LinPulsar Core] HTTP client is not initialized. Call setHttpClient() first.");
	return Mu;
}
// src/services/linPulsarModuleConfigurationService.ts
var Fu = /* @__PURE__ */ new Map();
function Iu(e) {
	Fu.set(e.instanceId, e);
}
function Lu(e) {
	let t = Fu.get(e);
	if (!t) throw Error(`[LinPulsar Core] No module host configuration found for instanceId: ${e}`);
	return t;
}
// src/services/linPulsarEntityService.ts
async function Ru(e, t) {
	let n = Lu(e);
	return Pu().post(`/${n.apiEndpoint}`, t).then(({ data: e }) => e);
}
async function zu(e, t, n) {
	let r = Lu(e);
	return Pu().put(`/${r.apiEndpoint}/${t}`, n).then(({ data: e }) => e);
}
async function Bu(e, t, n) {
	let r = Lu(e);
	return Pu().get(`/${r.apiEndpoint}`, { params: {
		...t,
		...n
	} }).then(({ data: e }) => e);
}
async function Vu(e, t) {
	let n = Lu(e);
	return Pu().get(`/${n.apiEndpoint}/${t}`).then(({ data: e }) => e);
}
async function Hu(e, t) {
	let n = Lu(e);
	return Pu().delete(`/${n.apiEndpoint}/${t}`);
}
async function Uu(e, t, n) {
	let r = Lu(e);
	await Pu().post(`/${r.apiEndpoint}/validate/${t}`, n, { headers: { "Content-Type": "application/json" } });
}
// src/services/objectService.ts
function Wu(e, t) {
	if (!Ju(e) || !Ju(t)) return t;
	let n = { ...e };
	for (let r of Object.keys(t)) n[r] = Wu(e[r], t[r]);
	return n;
}
function Gu(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		let e = n.split("."), i = t;
		e.forEach((t, n) => {
			n === e.length - 1 ? i[t] = r : (Ju(i[t]) || (i[t] = {}), i = i[t]);
		});
	}
	return t;
}
function Ku(e, t) {
	return t.split(".").reduce((e, t) => Ju(e) ? e[t] : void 0, e);
}
function qu(e, t, n) {
	let [r, ...i] = t.split("."), a = { ...e };
	return a[r] = i.length === 0 ? n : qu(Ju(a[r]) ? a[r] : {}, i.join("."), n), a;
}
function Ju(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Yu(e, t) {
	return typeof e != "object" || !e ? e : Object.fromEntries(Object.entries(e).map(([e, n]) => [t(e), Ju(n) ? Yu(n, t) : n]));
}
function Xu(e, t) {
	if (e === t || typeof e == "number" && typeof t == "number" && Number.isNaN(e) && Number.isNaN(t)) return !0;
	if (e == null || t == null || typeof e != "object" || typeof t != "object" || Array.isArray(e) !== Array.isArray(t)) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	let i = e, a = t;
	return n.every((e) => Object.prototype.hasOwnProperty.call(a, e) && Xu(i[e], a[e]));
}
function Zu(e, t) {
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return !1;
		let n = /* @__PURE__ */ new Set();
		return e.every((e) => {
			let r = t.findIndex((t, r) => !n.has(r) && Zu(e, t));
			return r !== -1 && (n.add(r), !0);
		});
	}
	if (Ju(e) && Ju(t)) {
		let n = Object.keys(e), r = Object.keys(t);
		return n.length === r.length && n.every((n) => Object.prototype.hasOwnProperty.call(t, n) && Zu(e[n], t[n]));
	}
	return Xu(e, t);
}
// src/services/i18nService.ts
var Qu = null;
function $u(e) {
	Qu === null ? Qu = e : console.warn("[LinPulsar Core] I18n has already been initialized. Re-initialization is ignored.");
}
function ed() {
	if (Qu === null) throw Error("[LinPulsar Core] I18n is not initialized. Call setI18nInstance() first.");
	return Qu;
}
// src/stores/linPulsarUiStore.ts
var td = () => nd(Qe()), nd = Ye("LinPulsarUiStore", {
	state: () => ({
		mainNavigationItems: [],
		i18n: {
			locale: "",
			languages: []
		}
	}),
	actions: {
		addMainNavigationMenuItems(...e) {
			this.mainNavigationItems.push(...e);
		},
		setAvailableLanguages(e) {
			this.i18n.languages = e;
		},
		setLocale(e) {
			this.i18n.locale = e;
		}
	}
}), rd = () => id(Qe()), id = Ye("LinPulsarUserPreferenceStore", {
	state: () => ({ userPreferences: {} }),
	actions: {
		setUserPreferences(e) {
			this.userPreferences = e;
		},
		setUserPreference(e, t) {
			this.userPreferences[e] = t;
		},
		removeUserPreference(e) {
			delete this.userPreferences[e];
		}
	}
});
// src/composables/useLinPulsarUserPreference.ts
function ad() {
	let e = rd();
	function t() {
		return Pu().get("user-preferences").then(({ data: t }) => {
			e.setUserPreferences(t);
		});
	}
	function n(t, n) {
		return Pu().post("user-preferences", {
			key: t,
			value: n
		}).then(({ data: t }) => {
			e.setUserPreference(t.key, t.value);
		});
	}
	function r(t) {
		return Pu().delete(`user-preferences/${t}`).then(() => {
			e.removeUserPreference(t);
		});
	}
	return {
		init: t,
		saveUserPreference: n,
		deleteUserPreference: r,
		userPreferenceStore: e
	};
}
// src/composables/useScopedI18n.ts
function od(e) {
	let { t, te: n, tm: r } = fa({
		useScope: "global",
		__i18n: ed().global
	});
	function i(...n) {
		let [r, i, a] = n;
		return t(`${e}.${r}`, i, a);
	}
	function a(...t) {
		return n(`${e}.${t[0]}`, t[1]);
	}
	function o(...t) {
		return r(`${e}.${t[0]}`);
	}
	function s(e, ...t) {
		return a(t[0]) ? i(...t) : e;
	}
	return {
		t: i,
		te: a,
		tm: o,
		translateOrDefault: s
	};
}
var sd = "language";
function cd(e) {
	let t = td();
	return !!e && t.i18n.languages.includes(e);
}
function ld() {
	let { userPreferenceStore: e } = ad(), t = td();
	return [e.userPreferences?.[sd], localStorage.getItem(sd)].find(cd) ?? t.i18n.locale;
}
async function ud(e) {
	let { userPreferenceStore: t, saveUserPreference: n } = ad(), r = t.userPreferences?.[sd];
	localStorage.setItem(sd, e), e !== r && await n(sd, e);
}
async function dd(e) {
	let t = td(), n = ed();
	n.global.locale.value = e, t.setLocale(e), await ud(e);
}
// src/composables/useFieldValidation.ts
var fd = /* @__PURE__ */ new Set([Du.BadRequest, Du.NotFound]);
function pd(e) {
	return $.isAxiosError(e) && e.response?.status != null && fd.has(e.response.status);
}
function md(e) {
	return e == null ? [] : Array.isArray(e) ? e : [e];
}
function hd(e) {
	return /\.([^.]+)$/.exec(e)?.[1]?.toLowerCase() ?? "";
}
function gd(e) {
	let { t } = od(e), { toDayjs: n } = Ea();
	async function r(e, n, r) {
		try {
			return await Uu(e, n, r), !0;
		} catch (e) {
			return pd(e) ? e.response.data.error : t("validation.unknownError");
		}
	}
	function i(e) {
		return e == null || e === "" ? t("validation.required") : !0;
	}
	function a(e) {
		return e == null || e === "" ? !0 : typeof e != "string" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e) ? t("validation.email") : !0;
	}
	function o(e, n) {
		return e != null && e.length < n ? t("validation.minLength", { min: n }) : !0;
	}
	function s(e, n) {
		return e != null && e.length > n ? t("validation.maxLength", { max: n }) : !0;
	}
	function c(e, n) {
		return n > e ? t("validation.min", { min: n }) : !0;
	}
	function l(e, n) {
		return e > n ? t("validation.max", { max: n }) : !0;
	}
	function u(e, n) {
		return new RegExp(n).test(e) ? !0 : t("validation.pattern", { pattern: n.toString() });
	}
	function d(e, n) {
		return e == null || !(typeof e == "object" ? n.some((t) => Zu(e, t)) : n.some((t) => t != null && String(t) === String(e))) || t("validation.unique");
	}
	function f(e, n) {
		return !md(e).some((e) => e.size > n * 1024 * 1024) || t("validation.maxFileSize", { maxFileSize: n });
	}
	function p(e, n) {
		if (n.length === 0) return !0;
		let r = n.map((e) => e.toLowerCase().replace(/^\./, ""));
		return !md(e).some((e) => !r.includes(hd(e.name))) || t("validation.allowedExtensions", { extensions: r.join(", ") });
	}
	function m(e, r) {
		return e == null || e === "" || n(e, r).isValid() ? !0 : t("validation.invalidDate", { format: r || "YYYY-MM-DD" });
	}
	function h(e, r, i) {
		if (e == null || e === "") return !0;
		let a = n(e, i), o = n(r, i);
		return !a.isValid() || !o.isValid() || a.isAfter(o, "day") ? !0 : t("validation.afterDate", { compareTo: o.format(i || "YYYY-MM-DD") });
	}
	function g(e, r, i) {
		if (e == null || e === "") return !0;
		let a = n(e, i), o = n(r, i);
		return !a.isValid() || !o.isValid() || a.isBefore(o, "day") ? !0 : t("validation.beforeDate", { compareTo: o.format(i || "YYYY-MM-DD") });
	}
	function _(e, r, i) {
		if (e == null || e === "") return !0;
		let a = n(e, i), o = n(r, i);
		return !a.isValid() || !o.isValid() || !a.isBefore(o, "day") || t("validation.fromDate", { compareTo: o.format(i || "YYYY-MM-DD") });
	}
	function v(e, r, i) {
		if (e == null || e === "") return !0;
		let a = n(e, i), o = n(r, i);
		return !a.isValid() || !o.isValid() || !a.isAfter(o, "day") || t("validation.upToDate", { compareTo: o.format(i || "YYYY-MM-DD") });
	}
	return {
		validateFromApi: r,
		required: i,
		email: a,
		minLength: o,
		maxLength: s,
		min: c,
		max: l,
		pattern: u,
		unique: d,
		maxFileSize: f,
		allowedExtensions: p,
		validDate: m,
		afterDate: h,
		beforeDate: g,
		fromDate: _,
		upToDate: v
	};
}
// src/types/linPulsarFilter.ts
var _d = "|", vd = "not_", yd = [
	"lk_",
	"gt_",
	"lt_"
], bd = class e {
	isNegation;
	operator;
	value;
	item;
	constructor(e, t, n, r) {
		this.isNegation = e, this.operator = t, this.value = n, this.item = r;
	}
	static fromString(t) {
		if (typeof t != "string" || t === "") return new e(!1, "", "");
		let n = t, r = !1;
		n.startsWith("not_") && (r = !0, n = n.slice(vd.length));
		let i = yd.find((e) => n.startsWith(e)) ?? "";
		return new e(r, i, n.slice(i.length));
	}
	toString() {
		return `${this.isNegation ? vd : ""}${this.operator}${this.value}`;
	}
}, xd = class e {
	id;
	name;
	type;
	options;
	values;
	dynamicLabelOptions;
	constructor(e, t, n, r, i) {
		this.id = crypto.randomUUID(), this.name = e, this.type = t, this.options = n, this.values = r, this.dynamicLabelOptions = i;
	}
	static fromString(t, n, r) {
		let i = typeof n != "string" || n === "" ? [] : n.split("|").map((e) => bd.fromString(e));
		return new e(t, r?.type ?? "text", r?.options ?? {}, i, r?.dynamicLabelOptions);
	}
	toString() {
		return this.values.map((e) => e.toString()).join("|");
	}
};
// src/composables/useLinPulsarFilterUrl.ts
function Sd(e, t) {
	function n(n, r) {
		let i = Object.fromEntries(Object.entries(t.query).filter(([e]) => r.includes(e)));
		e.replace({ query: n.reduce((e, t) => {
			let n = t.name, r = t.toString();
			if (r === "") return e;
			e[n] || (e[n] = []);
			let i = e[n];
			return Array.isArray(i) ? i.push(r) : e[n] = [i, r], e;
		}, i) });
	}
	function r(e) {
		let n = [];
		return Object.keys(t.query).map((t) => e.find(({ name: e }) => t === e)).filter((e) => !!e).forEach((e) => {
			let r = t.query[e.name];
			(Array.isArray(r) ? r : [r]).filter((e) => e !== null).forEach((t) => {
				n.push(xd.fromString(e.name, t, e));
			});
		}), n;
	}
	return {
		setFiltersInUrl: n,
		getFiltersFromUrl: r
	};
}
// src/composables/useNotify.ts
function Cd() {
	function e(e) {
		yo.next({
			key: "notify",
			data: e
		});
	}
	return { Notify: e };
}
// src/services/nunjucksService.ts
var wd = null;
function Td(e) {
	wd === null ? (wd = e, Dd()) : console.warn("[LinPulsar Core] Nunjucks environment has already been initialized. Re-initialization is ignored.");
}
function Ed() {
	if (wd === null) throw Error("[LinPulsar Core] Nunjucks environment is not initialized. Call setNunjucksEnv() first.");
	return wd;
}
function Dd() {
	wd?.addGlobal("hasItem", Od);
}
function Od(e, t, n) {
	return e?.some((e) => e[t] === n) ?? !1;
}
// src/composables/useNunjucks.ts
var kd = /^\s*\{\{\s*([^\s{}]+?)\s*\}\}\s*$/, Ad = /^[A-Za-z_$][\w$]*$/, jd = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function Md(e) {
	return typeof e != "object" || !e ? !1 : Object.getPrototypeOf(k(e)) === Object.prototype;
}
function Nd(e) {
	let t = kd.exec(e)?.[1];
	if (t === void 0) return null;
	let n = t.split(".");
	return n.every((e) => Ad.test(e) && !jd.has(e)) ? n : null;
}
function Pd(e, t) {
	let n = Nd(e);
	if (n === null) return null;
	let r = t;
	for (let e of n) {
		if (!Md(r) || !Object.hasOwn(r, e)) return null;
		r = r[e];
	}
	return Md(r) ? structuredClone(k(r)) : null;
}
function Fd() {
	let e = Ed();
	function t(n, r) {
		if (typeof n == "string") {
			let t = Pd(n, r);
			return t === null ? e.renderString(n, r) : t;
		}
		return Array.isArray(n) ? n.map((e) => t(e, r)) : Md(n) ? Object.fromEntries(Object.entries(n).map(([e, n]) => [e, t(n, r)])) : n;
	}
	function n(t, n) {
		return e.renderString(t, n);
	}
	return {
		render: t,
		renderString: n
	};
}
// src/composables/usePagination.ts
function Id() {
	function e(e) {
		let t = e.sortBy || "updateDate", n = e.descending ? "desc" : "asc";
		return {
			page: (e.page || 1) - 1,
			size: e.rowsPerPage || 5,
			sort: `${t},${n}`
		};
	}
	function t(e, t) {
		return {
			page: e.number + 1,
			rowsPerPage: e.size,
			rowsNumber: e.totalElements,
			sortBy: t.sortBy || null,
			descending: t.descending
		};
	}
	return {
		toPagination: e,
		toQuasarPagination: t
	};
}
// src/constants/quasarDate.ts
var Ld = "YYYY/MM/DD";
// src/composables/useQuasarFieldValidation.ts
function Rd(e) {
	let { validateFromApi: t, required: n, email: r, minLength: i, maxLength: a, min: o, max: s, pattern: c, unique: l, maxFileSize: u, allowedExtensions: d, validDate: f, afterDate: p, beforeDate: m, fromDate: h, upToDate: g } = gd(e);
	return {
		validateFromApi: (e, n) => (r) => t(e, n, r),
		required: n,
		email: r,
		min: (e) => (t) => o(typeof t == "string" ? parseFloat(t) : t, e),
		max: (e) => (t) => s(typeof t == "string" ? parseFloat(t) : t, e),
		minLength: (e) => (t) => i(t, e),
		maxLength: (e) => (t) => a(t, e),
		pattern: (e) => (t) => c(t, e),
		unique: (e) => (t) => l(t, e),
		maxFileSize: (e) => (t) => u(t, e),
		allowedExtensions: (e) => (t) => d(t, e),
		validDate: (e) => (t) => f(t, e || "YYYY/MM/DD"),
		afterDate: (e, t) => (n) => p(n, e, t || "YYYY/MM/DD"),
		beforeDate: (e, t) => (n) => m(n, e, t || "YYYY/MM/DD"),
		fromDate: (e, t) => (n) => h(n, e, t || "YYYY/MM/DD"),
		upToDate: (e, t) => (n) => g(n, e, t || "YYYY/MM/DD")
	};
}
// src/composables/useQuasarRules.ts
function zd(e, t, n, r) {
	let { required: i, email: a, validateFromApi: o, ...s } = Rd(r), c = t.required ? [i] : [];
	return n.forEach((e) => {
		if (e === "email") c.push(a);
		else if (s[e] && t.inputSettings?.[e] != null) {
			let n = t.inputSettings[e];
			c.push(s[e](n));
		}
	}), t.hasValidations && c.push(o(e, t.name)), c;
}
// src/composables/useTree.ts
function Bd() {
	function e(t) {
		return t.map((t) => ({
			type: t.type,
			key: t.key,
			value: t.value,
			children: e(t.nodes)
		}));
	}
	return { toQTreeNodes: e };
}
// src/services/uiDesignService.ts
var Vd = null;
function Hd(e) {
	Vd === null ? Vd = e : console.warn("[LinPulsar Core] UI Design has already been initialized. Re-initialization is ignored.");
}
function Ud() {
	if (Vd === null) throw Error("[LinPulsar Core] UI Design is not initialized. Call setUiDesign() first.");
	return Vd;
}
// src/types/uiDesign.ts
var Wd = [
	"icon",
	"iconRight",
	"noCaps",
	"noWrap",
	"align",
	"stack",
	"stretch",
	"size",
	"outline",
	"flat",
	"unelevated",
	"rounded",
	"push",
	"square",
	"glossy",
	"fab",
	"fabMini",
	"padding",
	"color",
	"textColor",
	"dense",
	"ripple",
	"round"
], Gd = [
	"vertical",
	"outsideArrows",
	"mobileArrows",
	"align",
	"breakpoint",
	"leftIcon",
	"rightIcon",
	"stretch",
	"shrink",
	"switchIndicator",
	"narrowIndicator",
	"inlineLabel",
	"noCaps",
	"activeColor",
	"activeBgColor",
	"indicatorColor",
	"contentClass",
	"activeClass",
	"dense"
], Kd = [
	"icon",
	"activeClass",
	"exactActiveClass",
	"noCaps",
	"alert",
	"contentClass",
	"ripple"
], qd = [
	"reveal",
	"revealOffset",
	"elevated",
	"bordered"
], Jd = ["inset"], Yd = ["shrink"], Xd = [
	"icon",
	"size",
	"fontSize",
	"color",
	"textColor",
	"square",
	"rounded"
], Zd = [
	"floating",
	"multiLine",
	"align",
	"color",
	"textColor",
	"transparent",
	"outline",
	"rounded"
], Qd = /* @__PURE__ */ "virtualScrollItemSize.virtualScrollStickySizeStart.virtualScrollStickySizeEnd.color.iconFirstPage.iconPrevPage.iconNextPage.iconLastPage.grid.gridHeader.dense.hideHeader.hideBottom.hideSelectedBanner.hideNoData.hidePagination.flat.bordered.square.separator.wrapCells.tableStyle.tableClass.tableHeaderStyle.tableHeaderClass.cardContainerStyle.cardContainerClass.cardStyle.cardClass.titleClass".split("."), $d = [
	"dark",
	"square",
	"flat",
	"bordered"
], ef = ["align", "vertical"], tf = ["horizontal"], nf = [
	"left",
	"right",
	"name",
	"size",
	"color"
], rf = [
	"removeAriaLabel",
	"icon",
	"iconRight",
	"iconRemove",
	"iconSelected",
	"dense",
	"size",
	"dark",
	"color",
	"textColor",
	"square",
	"outline",
	"ripple"
], af = [
	"toggleOrder",
	"toggleIndeterminate",
	"keepColor",
	"icon",
	"checkedIcon",
	"uncheckedIcon",
	"indeterminateIcon",
	"leftLabel",
	"size",
	"color",
	"dark",
	"dense",
	"iconColor"
], of = [
	"toggleOrder",
	"toggleIndeterminate",
	"keepColor",
	"checkedIcon",
	"uncheckedIcon",
	"indeterminateIcon",
	"size",
	"color",
	"dark",
	"dense"
], sf = [
	"autofocus",
	"stackLabel",
	"hideHint",
	"clearable",
	"clearIcon",
	"counter",
	"autogrow",
	"fillMask",
	"reverseFillMask",
	"unmaskedValue",
	"debounce",
	"labelColor",
	"color",
	"bgColor",
	"dark",
	"filled",
	"outlined",
	"borderless",
	"standout",
	"hideBottomSpace",
	"rounded",
	"square",
	"dense",
	"itemAligned",
	"noErrorIcon"
], cf = [
	"landscape",
	"yearsInMonthView",
	"todayBtn",
	"minimal",
	"defaultView",
	"color",
	"textColor",
	"dark",
	"square",
	"flat",
	"bordered"
], lf = [
	"loading",
	"loadingShowDelay",
	"noSpinner",
	"noNativeMenu",
	"noTransition",
	"draggable",
	"src",
	"srcset",
	"sizes",
	"placeholderSrc",
	"errorSrc",
	"ratio",
	"initialRatio",
	"width",
	"height",
	"fit",
	"position",
	"imgClass",
	"imgStyle",
	"spinnerColor",
	"spinnerSize"
], uf = [
	"clearable",
	"autofocus",
	"stackLabel",
	"hideHint",
	"clearIcon",
	"counter",
	"labelColor",
	"color",
	"bgColor",
	"dark",
	"filled",
	"outlined",
	"borderless",
	"standout",
	"hideBottomSpace",
	"rounded",
	"square",
	"dense",
	"itemAligned",
	"noErrorIcon"
], df = [
	"autofocus",
	"stackLabel",
	"hideHint",
	"clearable",
	"clearIcon",
	"useChips",
	"labelColor",
	"color",
	"bgColor",
	"dark",
	"filled",
	"outlined",
	"borderless",
	"standout",
	"hideBottomSpace",
	"rounded",
	"square",
	"dense",
	"itemAligned",
	"inputClass",
	"inputStyle",
	"noErrorIcon"
], ff = /* @__PURE__ */ "virtualScrollHorizontal.clearable.autofocus.hideDropdownIcon.popupNoRouteDismiss.fillInput.transitionShow.transitionHide.transitionDuration.behavior.stackLabel.hideHint.clearIcon.counter.dropdownIcon.useInput.inputDebounce.optionsDense.optionsDark.optionsSelectedClass.optionsCover.menuShrink.disableTabSelection.menuAnchor.menuSelf.menuOffset.displayValueHtml.hideSelected.useChips.labelColor.color.bgColor.dark.filled.outlined.borderless.standout.hideBottomSpace.rounded.square.dense.itemAligned.popupContentClass.popupContentStyle.inputClass.inputStyle.noErrorIcon.virtualScrollSliceSize.virtualScrollSliceRatioBefore.virtualScrollSliceRatioAfter.virtualScrollItemSize.virtualScrollStickySizeStart.virtualScrollStickySizeEnd".split("."), pf = [
	"persistent",
	"noEscDismiss",
	"noBackdropDismiss",
	"noRouteDismiss",
	"autoClose",
	"noRefocus",
	"noFocus",
	"noShake",
	"allowFocusOutside",
	"seamless",
	"maximized",
	"fullWidth",
	"fullHeight",
	"position",
	"backdropFilter",
	"square",
	"transitionShow",
	"transitionHide",
	"transitionDuration"
], mf = [
	"size",
	"color",
	"thickness"
], hf = /* @__PURE__ */ "split.disableMainBtn.disableDropdown.persistent.noEscDismiss.noRouteDismiss.autoClose.noRefocus.noFocus.icon.iconRight.noCaps.noWrap.align.stack.stretch.dropdownIcon.cover.menuAnchor.menuSelf.menuOffset.size.outline.flat.unelevated.rounded.push.square.glossy.fab.fabMini.padding.color.textColor.dense.ripple.noIconAnimation.contentStyle.contentClass.transitionShow.transitionHide.transitionDuration".split("."), gf = ["view", "container"], _f = [
	"separator",
	"padding",
	"tag",
	"bordered",
	"dense",
	"dark"
], vf = [
	"insetLevel",
	"tag",
	"activeClass",
	"exactActiveClass",
	"clickable",
	"manualFocus",
	"focused",
	"dark",
	"dense"
], yf = [
	"avatar",
	"thumbnail",
	"side",
	"top",
	"noWrap"
], bf = [
	"autofocus",
	"noErrorFocus",
	"noResetFocus",
	"greedy"
], xf = [
	"lines",
	"overline",
	"caption",
	"header"
], Sf = [
	"inlineActions",
	"dense",
	"rounded",
	"dark"
], Cf = [
	"contextMenu",
	"touchPosition",
	"persistent",
	"noEscDismiss",
	"noRouteDismiss",
	"autoClose",
	"separateClosePopup",
	"noRefocus",
	"noFocus",
	"fit",
	"cover",
	"anchor",
	"self",
	"offset",
	"dark",
	"square",
	"maxHeight",
	"maxWidth",
	"transitionShow",
	"transitionHide",
	"transitionDuration"
], wf = [
	"tickStrategy",
	"noSelectionUnset",
	"defaultExpandAll",
	"accordion",
	"noTransition",
	"noConnectors",
	"color",
	"controlColor",
	"textColor",
	"selectedColor",
	"dense",
	"dark",
	"duration"
], Tf = [
	"horizontal",
	"limits",
	"modelValue",
	"reverse",
	"unit",
	"disable",
	"beforeClass",
	"afterClass",
	"separatorClass",
	"separatorStyle",
	"dark"
], Ef = [
	"spaced",
	"inset",
	"vertical",
	"dark",
	"size",
	"color"
], Df = [
	"keepColor",
	"type",
	"leftLabel",
	"inline",
	"size",
	"color",
	"dark",
	"dense"
], Of = [
	"visible",
	"delay",
	"dark",
	"verticalOffset",
	"horizontalOffset",
	"barStyle",
	"verticalBarStyle",
	"horizontalBarStyle",
	"thumbStyle",
	"verticalThumbStyle",
	"horizontalThumbStyle",
	"contentStyle",
	"contentActiveStyle"
], kf = /* @__PURE__ */ "tag.sort.delay.delayOnTouchOnly.touchStartThreshold.disabled.animation.easing.handle.filter.draggable.ghostClass.chosenClass.dragClass.swapThreshold.invertSwap.invertedSwapThreshold.direction.forceFallback.fallbackClass.fallbackOnBody.fallbackTolerance.emptyInsertThreshold.scroll.scrollSensitivity.scrollSpeed".split("."), Af = {
	"q-avatar": Xd,
	"q-badge": Zd,
	"q-banner": Sf,
	"q-btn": Wd,
	"q-btn-dropdown": hf,
	"q-card": $d,
	"q-card-actions": ef,
	"q-card-section": tf,
	"q-checkbox": of,
	"q-date": cf,
	"q-dialog": pf,
	"q-field": uf,
	"q-file": df,
	"q-form": bf,
	"q-header": qd,
	"q-icon": nf,
	"q-chip": rf,
	"q-img": lf,
	"q-input": sf,
	"q-item": vf,
	"q-item-label": xf,
	"q-item-section": yf,
	"q-layout": gf,
	"q-list": _f,
	"q-menu": Cf,
	"q-option-group": Df,
	"q-route-tab": Kd,
	"q-scroll-area": Of,
	"q-select": ff,
	"q-separator": Ef,
	"q-spinner": mf,
	"q-splitter": Tf,
	"q-table": Qd,
	"q-tabs": Gd,
	"q-toggle": af,
	"q-toolbar": Jd,
	"q-toolbar-title": Yd,
	"q-tree": wf
}, jf = { draggable: kf }, Mf = ["class", "style"], Nf = {
	...Af,
	...jf
};
function Pf(e, t) {
	return t.split(".").reduce((e, t) => {
		if (e && typeof e == "object") return e[t];
	}, e);
}
function Ff(e, t, n) {
	let r = Pf(e, `${t}.${n}`);
	if (r === void 0 && (r = Pf(e, `default.${n}`)), typeof r == "object") throw Error(`[UiDesign] Value for '${t}.${n}' is a nested object or null, expected a primitive.`);
	return r;
}
function If(e) {
	if (!(e in Nf)) throw Error(`[UiDesign] The component '${e}' is not supported for UI design retrieval.`);
	return [...Nf[e], ...Mf];
}
function Lf() {
	let e = r(() => Ud());
	function t(t, n, r) {
		let i = If(n), a = {};
		for (let o of i) {
			let i = r?.[o] ?? Ff(e.value, t, `${n}.${String(o)}`);
			i !== void 0 && (a[o] = i);
		}
		return a;
	}
	return { ui: t };
}
// src/composables/useValueFormatter.ts
function Rf(e) {
	return { toDate: (t, n) => !n?.formatKey || typeof n.formatKey != "string" ? t : e.toDate(t, n.formatKey) };
}
function zf() {
	let e = Rf(xa());
	function t(t, n, r) {
		return t == null || !n || !Object.hasOwn(e, n) ? t : e[n](t, r);
	}
	return { formatValue: t };
}
// src/services/linPulsarConfigurationService.ts
async function Bf() {
	return (await Pu().get("/metadata/entities")).data;
}
async function Vf(e) {
	return (await Pu().get(`/metadata/entities/${e}`)).data;
}
async function Hf() {
	return (await Pu().get("/metadata/routes")).data;
}
// src/stores/linPulsarConfigurationStore.ts
var Uf = () => Wf(Qe()), Wf = Ye("LinPulsarConfigurationStore", {
	state: () => ({
		entities: [],
		apiEndpoints: [],
		loading: !1,
		error: null
	}),
	getters: {
		getEntityByName: (e) => (t) => e.entities.find((e) => e.name === t),
		getApiEndpointsByEntity: (e) => (t) => e.apiEndpoints.filter((e) => e.entity === t)
	},
	actions: { async fetchConfiguration() {
		this.loading = !0, this.error = null;
		try {
			let [e, t] = await Promise.all([Bf(), Hf()]);
			this.entities = e, this.apiEndpoints = t;
		} catch (e) {
			this.error = e instanceof Error ? e.message : "Failed to fetch configuration", console.error("[LinPulsar Core] Failed to fetch configuration:", e);
		} finally {
			this.loading = !1;
		}
	} }
}), Gf = () => Kf(Qe()), Kf = Ye("LinPulsarUserStore", {
	state: () => ({
		user: {
			username: "",
			email: "",
			fullName: "",
			roles: []
		},
		isAuthenticated: !1
	}),
	actions: { setUserFromClaims(e) {
		let t = e.roles;
		this.user = {
			username: e.sub,
			email: typeof e.email == "string" ? e.email : "",
			fullName: typeof e.name == "string" ? e.name : "",
			roles: Array.isArray(t) ? t.filter((e) => typeof e == "string") : []
		}, this.isAuthenticated = !0;
	} }
}), qf = "&", Jf = "=", Yf = class e {
	id;
	label;
	filters;
	constructor(e, t, n) {
		this.id = e, this.label = t, this.filters = n;
	}
	static fromString(t, n, r, i = []) {
		let a = typeof r != "string" || r === "" ? [] : r.split(qf).filter((e) => e.includes(Jf)).map((e) => {
			let t = e.indexOf(Jf), n = e.slice(0, t), r = e.slice(t + 1);
			return xd.fromString(n, r, i.find((e) => e.name === n));
		});
		return new e(t, n, a);
	}
	toString() {
		return this.filters.map((e) => `${e.name}${Jf}${e.toString()}`).join(qf);
	}
}, Xf = /* @__PURE__ */ function(e) {
	return e.SETUP = "setup", e.CONFIGURE = "configure", e.INITIALIZE = "initialize", e.READY = "ready", e.POST_INIT = "postInit", e;
}({}), Zf = class {
	id;
	name;
	version;
	description;
	constructor(e, t, n, r) {
		this.id = e, this.name = t, this.version = n, this.description = r;
	}
	async setup() {
		return { success: !0 };
	}
	async configure(e) {
		return { success: !0 };
	}
	async initialize(e) {
		return { success: !0 };
	}
	async ready(e) {
		return { success: !0 };
	}
	async postInit(e) {
		return { success: !0 };
	}
}, Qf = class extends Zf {
	dialogComponents;
	dialogComponentZone;
	constructor(e) {
		super(e.id, e.name, e.version, e.description), this.dialogComponents = e.dialogComponents ?? [], this.dialogComponentZone = e.dialogZone;
	}
	async postInit(e) {
		e.options?.addNavigationMenu && td().addMainNavigationMenuItems({
			id: e.instanceId,
			labelKey: `${e.instanceId}.NavigationMenu.label`,
			path: e.basePath
		});
		let t = $e();
		return this.dialogComponents.forEach((e) => {
			t.registerPluginOnce(this.dialogComponentZone, e);
		}), { success: !0 };
	}
};
function $f(e) {
	return Object.assign(new Qf(e), e.hooks);
}
// src/lifecycle/linPulsarModuleFederation.ts
async function ep(e, t) {
	return (await Promise.all(e.map(async (e) => {
		try {
			let n = await fetch(e);
			if (!n.ok) return console.error(`[LinPulsar Core] Failed to load file: ${e} (HTTP ${n.status})`), null;
			let r = await n.json();
			return t(r) ? (console.debug(`[LinPulsar Core] Loaded file: ${n.url}`), r) : (console.error(`[LinPulsar Core] Invalid content in file: ${e}`), null);
		} catch {
			return console.error(`[LinPulsar Core] Failed to fetch or parse file: ${e}`), null;
		}
	}))).filter((e) => e !== null);
}
function tp(e) {
	if (typeof e != "object" || !e) return !1;
	let { type: t, plugin: n, component: r } = e;
	return t === "federated" && typeof n == "string" || t === "component" && typeof r == "string";
}
function np(e) {
	return typeof e == "string" || tp(e);
}
function rp(e) {
	if (typeof e != "object" || !e) return !1;
	let { zone: t, plugin: n, component: r } = e, i = [n, r];
	return typeof t == "string" && i.every((e) => e === void 0 || typeof e == "string") && i.filter((e) => e !== void 0).length === 1;
}
var ip = [
	"instanceId",
	"remoteName",
	"basePath"
], ap = [
	"lifecycleRemote",
	"routesRemote",
	"i18nRemote"
];
function op(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return ip.every((e) => typeof t[e] == "string") && ap.every((e) => np(t[e])) && (t.zones === void 0 || Array.isArray(t.zones) && t.zones.every(rp));
}
function sp(e) {
	return ep(e, op);
}
async function cp(e) {
	return (await ep(e, (e) => Array.isArray(e) && e.every(rp))).flat();
}
function lp(e) {
	let t = $e();
	e.forEach((e) => {
		"component" in e && e.component ? t.registerComponent(e.zone, e.component, e.props) : "plugin" in e && e.plugin && t.registerPlugin(e.zone, e.plugin, e.props);
	});
}
async function up(e) {
	if (typeof e == "string" || e.type === "federated") {
		let t = typeof e == "string" ? e : e.plugin;
		return (await de().loadRemote(t))?.default;
	}
	let t = ge(e.component);
	if (t === void 0) throw Error(`[LinPulsar Core] Local component "${e.component}" is not registered.`);
	return t;
}
async function dp(e) {
	let t = await up(e.routesRemote);
	return !t || t.length === 0 ? null : t;
}
async function fp(e) {
	return await up(e.i18nRemote) ?? {};
}
var pp = /^\{\{\s*config((?:\.\w+)+)\s*\}\}$/;
function mp(e, t) {
	if (typeof e != "string") return e;
	let n = pp.exec(e)?.[1], r = n ? Ku(t, n.slice(1)) : void 0;
	return tp(r) ? r : Ed().renderString(e, { config: t });
}
function hp(e, t) {
	return {
		name: e.name,
		path: Ed().renderString(e.path, { config: t }),
		component: async () => {
			let n = mp(e.component, t), r = await up(n);
			if (!r) throw Error(`[LinPulsar Core] Route component could not be loaded: ${JSON.stringify(n)}.`);
			return r;
		},
		children: e.children?.map((e) => hp(e, t)) || [],
		meta: e.meta ? gp(e.meta, t) : void 0
	};
}
function gp(e, t) {
	if (typeof e == "string") return Ed().renderString(e, { config: t });
	if (Array.isArray(e)) return e.map((e) => gp(e, t));
	if (typeof e == "object" && e) {
		let n = {};
		for (let r in e) n[r] = gp(e[r], t);
		return n;
	}
	return e;
}
async function _p(e, t, n) {
	return Iu(t), e.setup();
}
async function vp(e, t, n) {
	let r = await dp(t);
	r && r.map((e) => hp(e, t)).forEach((e) => {
		e.name && n.hasRoute(e.name) && n.removeRoute(e.name), n.addRoute(e);
	});
	let i = Yu(await fp(t), (e) => Ed().renderString(e, { config: t }));
	if (i) {
		let e = ed(), t = i, n = e.global.messages.value;
		Object.keys(n).forEach((r) => {
			let i = Wu(t[r], n[r]);
			e.global.setLocaleMessage(r, i);
		});
	}
	return e.configure(t);
}
async function yp(e, t, n) {
	return e.initialize(t);
}
async function bp(e, t, n) {
	return e.ready(t);
}
async function xp(e, t, n) {
	return lp(t.zones ?? []), e.postInit(t);
}
var Sp = {
	[Xf.SETUP]: _p,
	[Xf.CONFIGURE]: vp,
	[Xf.INITIALIZE]: yp,
	[Xf.READY]: bp,
	[Xf.POST_INIT]: xp
};
async function Cp(e) {
	let { router: t, remotes: n, modules: r, extraZones: i, localComponents: a } = e, o = { ...Sp };
	Object.entries(e.hooks ?? {}).forEach(([e, t]) => {
		let n = Sp[e];
		o[e] = async (e, r, i) => (await n(e, r, i), t(e, r, i));
	}), te(n), ue(P()), a && he(a);
	let [s, c] = await Promise.all([sp(r), cp(i ?? [])]), l = /* @__PURE__ */ new Map();
	for (let e of s) {
		let t = await up(e.lifecycleRemote);
		l.set(e.instanceId, t);
	}
	let u = [
		Xf.SETUP,
		Xf.CONFIGURE,
		Xf.INITIALIZE,
		Xf.READY,
		Xf.POST_INIT
	];
	for (let e of u) for (let n of s) await o[e](l.get(n.instanceId), n, t);
	lp(c);
}
var wp = { init: Cp };
export { Zf as BasicRemoteModule, Ta as DEFAULT_DATE_FORMAT, vd as LIN_PULSAR_FILTER_NEGATION_PREFIX, _d as LIN_PULSAR_FILTER_OR_SEPARATOR, xd as LinPulsarFilter, Yf as LinPulsarFilterSet, bd as LinPulsarFilterValue, tt as LinPulsarZoneRenderer, Xf as ModuleLifecyclePhase, Ld as QDATE_DEFAULT_MASK, dd as changeLocale, $f as createModulePageLifecycle, Xu as deepEqual, Zu as deepEqualUnordered, Hu as deleteEntityById, Gu as fromDot, Hf as getApiEndpointsConfiguration, wa as getDayjsInstance, Bu as getEntities, Bf as getEntitiesConfiguration, Vu as getEntityById, Vf as getEntityConfiguration, Pu as getHttpClient, ed as getI18nInstance, ge as getLocalComponent, de as getModuleFederation, Lu as getModuleHostConfiguration, Ku as getNestedValue, Ed as getNunjucksEnv, Qe as getPiniaStore, Ud as getUiDesign, Ju as isObject, wp as linPulsarModuleFederation, fe as loadAsyncComponent, Wu as merge, me as registerLocalComponent, he as registerLocalComponents, Iu as registerModuleHostConfiguration, Yu as renameKeys, _e as resolveLocalComponent, ld as resolveLocale, Ru as saveEntity, Ca as setDayjsInstance, Nu as setHttpClient, $u as setI18nInstance, ue as setModuleFederation, qu as setNestedValue, Td as setNunjucksEnv, Ze as setPiniaStore, Hd as setUiDesign, ud as syncLocale, yo as uiEventSubject, zu as updateEntity, xa as useCommonMapper, Ea as useDayjs, bo as useDialog, gd as useFieldValidation, Uf as useLinPulsarConfigurationStore, Sd as useLinPulsarFilterUrl, td as useLinPulsarUiStore, ad as useLinPulsarUserPreference, rd as useLinPulsarUserPreferenceStore, Gf as useLinPulsarUserStore, $e as useLinPulsarZoneStore, Cd as useNotify, Fd as useNunjucks, Id as usePagination, Rd as useQuasarFieldValidation, zd as useQuasarRules, od as useScopedI18n, Bd as useTree, Lf as useUiDesign, zf as useValueFormatter };

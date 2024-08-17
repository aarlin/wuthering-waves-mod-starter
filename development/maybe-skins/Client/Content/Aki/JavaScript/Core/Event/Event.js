"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Event = void 0);
const Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats");
class Event {
	constructor(t) {
		(this.rK = t),
			(this.nK = new Map()),
			(this.sK = void 0),
			(this.aK = void 0),
			(this.hK = new Array());
	}
	Has(t, e) {
		var i,
			e = Event.lK.get(e);
		return (
			!!e &&
			((i = this.nK.get(t)) && i.has(e)
				? !(i = this._K.get(t)) || !i.has(e)
				: void 0 !== (i = this.uK.get(t)) && i.has(e))
		);
	}
	Add(t, e) {
		return this.YW(t, e, 0);
	}
	Once(t, e) {
		return this.YW(t, e, 1);
	}
	Remove(t, e) {
		e = Event.lK.get(e);
		return !!e && this.O7(t, e);
	}
	Emit(e, ...i) {
		if (this.cK(e))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Event",
						1,
						"事件重复派发，请检查事件链是否产生循环调用",
						["name", this.rK[e]],
						["emitting", this.hK],
					),
				!1
			);
		this.mK(e, !0);
		var s = this.nK.get(e);
		if (s) {
			!Stats_1.Stat.Enable ||
				((h = this.rK[e]), Event.dK.get(h)) ||
				((o = void 0), Event.dK.set(h, o));
			let t = void 0;
			for (const a of s) {
				var n = a[0],
					r = n.deref();
				if (r) {
					if (!(t = t || this._K.get(e)) || !t.has(n)) {
						1 === a[1] && this.O7(e, n);
						Event.CK.get(r);
						try {
							r(...i);
						} catch (t) {
							t instanceof Error
								? Log_1.Log.CheckError() &&
									Log_1.Log.ErrorWithStack(
										"Event",
										1,
										"事件处理方法执行异常",
										t,
										["name", this.rK[e]],
										["error", t.message],
									)
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Event",
										1,
										"事件处理方法执行异常",
										["name", this.rK[e]],
										["error", t],
									);
						}
					}
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Event", 1, "事件处理方法已被回收", [
							"name",
							this.rK[e],
						]),
						s.delete(n),
						0 === s.size && this.nK.delete(e);
			}
		}
		this.mK(e, !1);
		var h = this._K.get(e);
		if (h) {
			for (const t of h.values()) this.gK(e, t);
			h.clear(), this._K.delete(e);
		}
		var o = this.uK.get(e);
		if (o) {
			for (const v of o) this.fK(e, v[0], v[1]);
			o.clear(), this.uK.delete(e);
		}
		return !0;
	}
	YW(t, e, i) {
		if (void 0 === this.rK[t])
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 1, "事件名不存在，请检查事件名是否正确", [
						"name",
						t,
					]),
				!1
			);
		let s = Event.lK.get(e);
		if (
			(s || ((s = new WeakRef(e)), Event.lK.set(e, s)),
			Stats_1.Stat.Enable &&
				!Event.CK.has(e) &&
				((n = e.name), Event.CK.set(e, void (n && n.length))),
			!this.cK(t))
		)
			return this.fK(t, s, i);
		var e = this.nK.get(t),
			n = this._K.get(t);
		if (e && e.has(s))
			return n && n.has(s)
				? (n.delete(s), !0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Event",
							1,
							"事件已存在，请检查同一个事件名同一个处理函数的注册逻辑",
							["name", this.rK[t]],
						),
					!1);
		let r = this.uK.get(t);
		return r && r.has(s)
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Event",
						1,
						"事件重复注册在待修改列表，请检查同一个事件名同一个处理函数的注册逻辑",
						["name", this.rK[t]],
					),
				!1)
			: (r || ((r = new Map()), this.uK.set(t, r)), r.set(s, i), !0);
	}
	fK(t, e, i) {
		let s = this.nK.get(t);
		if (s) {
			if (s.has(e))
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Event",
							1,
							"事件重复注册，请检查同一个事件名同一个处理函数的注册逻辑",
							["name", this.rK[t]],
						),
					!1
				);
		} else (s = new Map()), this.nK.set(t, s);
		return s.set(e, i), !0;
	}
	O7(t, e) {
		if (!this.cK(t)) return this.gK(t, e);
		var i = this.nK.get(t),
			s = this.uK.get(t);
		if (!i || !i.has(e))
			return s && s.has(e)
				? (s.delete(e), !0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Event",
							1,
							"事件不存在，请检查同一个事件名同一个处理函数的移除逻辑",
							["name", this.rK[t]],
						),
					!1);
		let n = this._K.get(t);
		return n && n.has(e)
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Event",
						1,
						"事件重复移除在待移除列表，请检查同一个事件名同一个处理函数的移除逻辑",
						["name", this.rK[t]],
					),
				!1)
			: (n || ((n = new Set()), this._K.set(t, n)), n.add(e), !0);
	}
	gK(t, e) {
		var i = this.nK.get(t);
		return i && i.delete(e)
			? (0 === i.size && this.nK.delete(t), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Event",
						1,
						"事件不存在，请检查同一个事件名同一个处理函数的移除逻辑",
						["name", this.rK[t]],
					),
				!1);
	}
	cK(t) {
		var e = Math.floor(t / 32);
		return e < this.hK.length && !!(this.hK[e] & (1 << (t % 32)));
	}
	mK(t, e) {
		for (var i = Math.floor(t / 32), t = t % 32; this.hK.length < i; )
			this.hK.push(0);
		this.hK.length === i
			? this.hK.push(e ? 1 << t : 0)
			: e
				? (this.hK[i] |= 1 << t)
				: (this.hK[i] &= ~(1 << t));
	}
	get uK() {
		return this.sK || (this.sK = new Map()), this.sK;
	}
	get _K() {
		return this.aK || (this.aK = new Map()), this.aK;
	}
}
((exports.Event = Event).lK = new WeakMap()),
	(Event.dK = new Map()),
	(Event.CK = new WeakMap());
//# sourceMappingURL=Event.js.map

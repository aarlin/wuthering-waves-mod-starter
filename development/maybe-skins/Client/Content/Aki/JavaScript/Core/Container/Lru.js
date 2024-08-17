"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Lru = void 0);
const Log_1 = require("../Common/Log"),
	USED_THRESHOLD = 3;
class Node {
	constructor(t, i) {
		(this.Key = t),
			(this.Value = i),
			(this.Prev = void 0),
			(this.Next = void 0),
			(this.Count = 0);
	}
}
class Lru {
	constructor(t, i = void 0, s = void 0) {
		(this.a7 = i),
			(this.h7 = s),
			(this.l7 = !0),
			(this.s6 = 0),
			(this.a6 = -0),
			(this._7 = new Map()),
			(this.ve = new WeakMap()),
			(this.t7 = void 0),
			(this.i7 = void 0),
			(this.n6 = 0),
			(this.h6 = 0),
			(this.l6 = 0),
			(this.u7 = 0),
			(this.c7 = 0),
			(this.m7 = new FinalizationRegistry((t) => {
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "对象被意外回收", ["key", t]);
			})),
			this.a7
				? t < 2
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 1, "容量必须大于 1", ["capacity", t])
					: ((this.s6 = t), (this.a6 = 1 - 1 / t))
				: Log_1.Log.CheckError() && Log_1.Log.Error("Core", 1, "创建器不存在");
	}
	get Enable() {
		return this.l7;
	}
	set Enable(t) {
		this.l7 !== t && this.Clear(), (this.l7 = t);
	}
	get Size() {
		return this.n6;
	}
	get Capacity() {
		return this.s6;
	}
	set Capacity(t) {
		if (t < 2)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Core", 1, "容量必须大于 1", ["capacity", t]);
		else
			for (
				this.h6 = (this.h6 / this.s6) * t,
					this.l6 = (this.l6 / this.s6) * t,
					this.s6 = t,
					this.a6 = 1 - 1 / t;
				this.n6 > t;
			)
				this.d7();
	}
	get HitRate() {
		return 0 < this.h6 ? this.h6 / (this.h6 + this.l6) : 0;
	}
	get UsedAvg() {
		return 0 < this.n6 ? this.u7 / this.n6 : 0;
	}
	get ThresholdUsedRate() {
		return 0 < this.n6 ? this.c7 / this.n6 : 0;
	}
	Create(t) {
		if (this.a7) {
			var i,
				s = this.a7(t);
			if (s)
				return (
					this.m7.register(s, t, s), (i = new Node(t, s)), this.ve.set(s, i), s
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Core", 1, "创建器创建对象为空", ["key", t]);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Core", 1, "创建器不存在", ["key", t]);
	}
	Get(t) {
		if (this.l7 && Lru.IsLruEnabledGlobal) {
			var i = this._7.get(t);
			if (i) {
				var s = i.values().next().value;
				if (s)
					return (
						i.delete(s) && 0 === i.size && this._7.delete(t),
						this.C7(s),
						(s.Count += 1),
						(this.h6 = this.h6 * this.a6 + 1),
						(this.l6 = this.l6 * this.a6),
						s.Value
					);
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "存在键对应的节点集合，但集合为空", [
						"key",
						t,
					]),
					(this.h6 = this.h6 * this.a6),
					(this.l6 = this.l6 * this.a6 + 1);
			}
		}
	}
	GetCount(t) {
		return this.l7 && Lru.IsLruEnabledGlobal && (t = this._7.get(t))
			? t.size
			: 0;
	}
	Put(t) {
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "无效对象", ["value", t]),
				!1
			);
		if (!this.l7 || !Lru.IsLruEnabledGlobal)
			return this.m7.unregister(t), this.ve.delete(t), !1;
		var i = this.ve.get(t);
		if (!i)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "对象不在容器中", ["value", t]),
				!1
			);
		this.g7(i);
		let s = this._7.get(i.Key);
		return (
			s || ((s = new Set()), this._7.set(i.Key, s)),
			s.add(i),
			this.n6 > this.s6 && this.d7(),
			!0
		);
	}
	RemoveExternal(t) {
		return t
			? (this.m7.unregister(t), this.ve.delete(t), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "无效对象", ["value", t]),
				!1);
	}
	Clear() {
		for (; this.n6; ) this.d7();
		this._7.clear(),
			(this.t7 = void 0),
			(this.i7 = void 0),
			(this.h6 = 0),
			(this.l6 = 0);
	}
	g7(t) {
		(t.Prev = void 0),
			(t.Next = this.t7),
			this.t7 ? (this.t7.Prev = t) : (this.i7 = t),
			(this.t7 = t),
			(this.n6 += 1),
			(this.u7 += t.Count),
			t.Count >= USED_THRESHOLD && (this.c7 += 1);
	}
	C7(t) {
		t.Prev ? (t.Prev.Next = t.Next) : (this.t7 = t.Next),
			t.Next ? (t.Next.Prev = t.Prev) : (this.i7 = t.Prev),
			(t.Prev = void 0),
			(t.Next = void 0),
			--this.n6,
			(this.u7 -= t.Count),
			t.Count >= USED_THRESHOLD && --this.c7;
	}
	d7() {
		var t, i, s;
		this.i7 &&
			((t = this.i7),
			this.C7(t),
			(t.Count = 0),
			(i = t.Value),
			this.m7.unregister(i),
			(s = this._7.get(t.Key)) &&
				s.delete(t) &&
				0 === s.size &&
				this._7.delete(t.Key),
			this.ve.delete(i),
			this.h7?.(i));
	}
}
(exports.Lru = Lru).IsLruEnabledGlobal = !0;
//# sourceMappingURL=Lru.js.map

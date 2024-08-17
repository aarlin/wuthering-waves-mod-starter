"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrimLru = void 0);
const Log_1 = require("../Common/Log"),
	USED_THRESHOLD = 3;
class Node {
	constructor(t, i, s) {
		(this.Key = t),
			(this.Value = i),
			(this.Size = s),
			(this.Prev = void 0),
			(this.Next = void 0),
			(this.Count = 0);
	}
}
class TrimLru {
	constructor(t, i = !1) {
		(this.X7 = i),
			(this.l7 = !0),
			(this.s6 = 0),
			(this.a6 = -0),
			(this._7 = new Map()),
			(this.t7 = void 0),
			(this.i7 = void 0),
			(this.n6 = 0),
			(this.h6 = 0),
			(this.l6 = 0),
			(this.u7 = 0),
			(this.c7 = 0),
			t < 2
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "容量必须大于 1", ["capacity", t])
				: ((this.s6 = t), (this.a6 = 1 - 1 / t));
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
				this.a6 = 1 - 1 / t,
					this.h6 = (this.h6 / this.s6) * t,
					this.l6 = (this.l6 / this.s6) * t,
					this.s6 = t;
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
	Get(t) {
		if (this.l7) {
			t = this._7.get(t);
			if (t)
				return (
					this.C7(t),
					(t.Count += 1),
					this.g7(t),
					(this.h6 = this.h6 * this.a6 + t.Size),
					(this.l6 = this.l6 * this.a6),
					t.Value
				);
			(this.h6 = this.h6 * this.a6), (this.l6 = this.l6 * this.a6 + 1);
		}
	}
	Put(t, i, s = 1) {
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "无效键", ["key", t]),
				!1
			);
		if (this._7.has(t))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "键已存在", ["key", t]),
				!1
			);
		if (!this.X7 && !i)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Core", 1, "无效对象", ["value", i]),
				!1
			);
		if (!this.l7) return !1;
		i = new Node(t, i, s);
		for (this._7.set(t, i), this.g7(i); this.n6 > this.s6; ) this.d7();
		return !0;
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
			(this.n6 += t.Size),
			(this.u7 += t.Count * t.Size),
			t.Count >= USED_THRESHOLD && (this.c7 += t.Count * t.Size);
	}
	C7(t) {
		t.Prev ? (t.Prev.Next = t.Next) : (this.t7 = t.Next),
			t.Next ? (t.Next.Prev = t.Prev) : (this.i7 = t.Prev),
			(t.Prev = void 0),
			(t.Next = void 0),
			(this.n6 -= t.Size),
			(this.u7 -= t.Count * t.Size),
			t.Count >= USED_THRESHOLD && (this.c7 -= t.Count * t.Size);
	}
	d7() {
		var t;
		this.i7 &&
			((t = this.i7), this.C7(t), (t.Count = 0), this._7.delete(t.Key));
	}
}
exports.TrimLru = TrimLru;
//# sourceMappingURL=TrimLru.js.map

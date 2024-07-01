"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CustomMap = void 0);
class CustomMap {
	constructor() {
		(this.gpr = new Map()), (this.K7 = new Array()), (this.fpr = new Map());
	}
	Size() {
		return this.gpr.size;
	}
	Set(t, e) {
		var s = this.gpr.get(t);
		void 0 !== s
			? (this.K7[s] = e)
			: ((s = this.gpr.size),
				this.gpr.set(t, s),
				this.K7.push(e),
				this.fpr.set(s, t));
	}
	Get(t) {
		if (void 0 !== (t = this.gpr.get(t))) return this.K7[t];
	}
	GetByIndex(t) {
		return (t = this.fpr.get(t)), this.Get(t);
	}
	Contains(t) {
		return void 0 !== this.gpr.get(t);
	}
	Remove(t) {
		var e,
			s,
			r,
			i = this.gpr.get(t);
		return (
			void 0 !== i &&
			((t = this.gpr.delete(t)),
			(e = this.fpr.delete(i)),
			1 < this.K7.length
				? ((s = this.K7.length - 1),
					(r = this.fpr.get(s)) &&
						(this.fpr.delete(s), this.gpr.set(r, i), this.fpr.set(i, r)),
					(this.K7[i] = this.K7[s]),
					this.K7.splice(s, 1))
				: (this.K7.length = 0),
			t) &&
			e
		);
	}
	RemoveByIndex(t) {
		return void 0 !== (t = this.fpr.get(t)) && this.Remove(t);
	}
	Keys() {
		return this.gpr.keys();
	}
	GetItems() {
		return this.K7;
	}
	Clear() {
		this.gpr.clear(), this.fpr.clear(), (this.K7.length = 0);
	}
}
exports.CustomMap = CustomMap;

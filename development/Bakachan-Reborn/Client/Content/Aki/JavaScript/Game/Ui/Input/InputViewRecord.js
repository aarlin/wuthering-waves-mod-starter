"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputViewRecord = void 0);
class InputViewRecord {
	constructor() {
		this.Ncr = new Map();
	}
	Add(e) {
		var r = (r = this.Ncr.get(e)) ? r + 1 : 1;
		return this.Ncr.set(e, r), r;
	}
	Remove(e) {
		var r = this.Ncr.get(e);
		return void 0 === r
			? 0
			: (0 < (r -= 1) ? this.Ncr.set(e, r) : this.Ncr.delete(e), r);
	}
	Has(e) {
		return !!(e = this.Ncr.get(e)) && 0 < e;
	}
	HasAny() {
		for (const e of this.Ncr.values()) if (0 < e) return !0;
		return !1;
	}
	Size() {
		return this.Ncr.size;
	}
	Clear() {
		this.Ncr.clear();
	}
}
exports.InputViewRecord = InputViewRecord;

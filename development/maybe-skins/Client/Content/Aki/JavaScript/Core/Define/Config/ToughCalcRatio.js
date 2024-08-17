"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ToughCalcRatio = void 0);
class ToughCalcRatio {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RatioNormal() {
		return this.rationormal();
	}
	get RatioSpecial() {
		return this.ratiospecial();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsToughCalcRatio(t, i) {
		return (i || new ToughCalcRatio()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
	}
	rationormal() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	ratiospecial() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ToughCalcRatio = ToughCalcRatio;
//# sourceMappingURL=ToughCalcRatio.js.map

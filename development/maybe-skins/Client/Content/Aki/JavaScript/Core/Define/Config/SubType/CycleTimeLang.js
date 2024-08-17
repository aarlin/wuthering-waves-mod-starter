"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CycleTimeLang = void 0);
class CycleTimeLang {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get CycleType() {
		return this.cycletype();
	}
	get CycleParam() {
		return this.cycleparam();
	}
	get TimeParam() {
		return this.timeparam();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsCycleTimeLang(t, e) {
		return (e || new CycleTimeLang()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	cycletype() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cycleparam() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	timeparam() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.CycleTimeLang = CycleTimeLang;
//# sourceMappingURL=CycleTimeLang.js.map

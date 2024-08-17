"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialBarSizeInfo = void 0);
class SpecialBarSizeInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Index() {
		return this.index();
	}
	get SizeX() {
		return this.sizex();
	}
	get SizeY() {
		return this.sizey();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSpecialBarSizeInfo(t, i) {
		return (i || new SpecialBarSizeInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	index() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sizex() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sizey() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SpecialBarSizeInfo = SpecialBarSizeInfo;
//# sourceMappingURL=SpecialBarSizeInfo.js.map

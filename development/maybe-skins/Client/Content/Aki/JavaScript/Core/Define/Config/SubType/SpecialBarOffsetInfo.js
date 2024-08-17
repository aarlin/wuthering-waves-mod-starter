"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialBarOffsetInfo = void 0);
class SpecialBarOffsetInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get MinPercent() {
		return this.minpercent();
	}
	get MaxPercent() {
		return this.maxpercent();
	}
	get MinOffsetX() {
		return this.minoffsetx();
	}
	get MinOffsetY() {
		return this.minoffsety();
	}
	get MaxOffsetX() {
		return this.maxoffsetx();
	}
	get MaxOffsetY() {
		return this.maxoffsety();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsSpecialBarOffsetInfo(t, s) {
		return (s || new SpecialBarOffsetInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	minpercent() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxpercent() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	minoffsetx() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	minoffsety() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxoffsetx() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxoffsety() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SpecialBarOffsetInfo = SpecialBarOffsetInfo;
//# sourceMappingURL=SpecialBarOffsetInfo.js.map

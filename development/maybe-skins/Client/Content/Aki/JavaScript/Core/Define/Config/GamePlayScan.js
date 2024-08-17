"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GamePlayScan = void 0);
const Vector_1 = require("./SubType/Vector");
class GamePlayScan {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get UId() {
		return this.uid();
	}
	get IconPath() {
		return this.iconpath();
	}
	get Interval() {
		return this.interval();
	}
	get Offset() {
		return this.offset();
	}
	get ResourcePath() {
		return this.resourcepath();
	}
	get Color() {
		return this.color();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsGamePlayScan(t, r) {
		return (r || new GamePlayScan()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	uid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	iconpath(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	interval() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 8;
	}
	offset(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r
			? (t || new Vector_1.Vector()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
	resourcepath(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	color() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.GamePlayScan = GamePlayScan;
//# sourceMappingURL=GamePlayScan.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChipType = void 0);
class ChipType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TypeDescription() {
		return this.typedescription();
	}
	get Icon() {
		return this.icon();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsChipType(t, i) {
		return (i || new ChipType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typedescription(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.ChipType = ChipType;
//# sourceMappingURL=ChipType.js.map

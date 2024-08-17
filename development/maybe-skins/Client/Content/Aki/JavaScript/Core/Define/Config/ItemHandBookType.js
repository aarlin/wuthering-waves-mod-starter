"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemHandBookType = void 0);
class ItemHandBookType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Descrtption() {
		return this.descrtption();
	}
	get Icon() {
		return this.icon();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsItemHandBookType(t, s) {
		return (s || new ItemHandBookType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	descrtption(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	icon(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.ItemHandBookType = ItemHandBookType;
//# sourceMappingURL=ItemHandBookType.js.map

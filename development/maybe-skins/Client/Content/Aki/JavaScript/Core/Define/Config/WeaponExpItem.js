"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponExpItem = void 0);
class WeaponExpItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Cost() {
		return this.cost();
	}
	get BasicExp() {
		return this.basicexp();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsWeaponExpItem(t, s) {
		return (s || new WeaponExpItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cost() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	basicexp() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.WeaponExpItem = WeaponExpItem;
//# sourceMappingURL=WeaponExpItem.js.map

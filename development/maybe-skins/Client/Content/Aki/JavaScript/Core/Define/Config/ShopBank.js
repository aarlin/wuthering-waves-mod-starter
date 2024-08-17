"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopBank = void 0);
class ShopBank {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CondId() {
		return this.condid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsShopBank(t, s) {
		return (s || new ShopBank()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	condid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ShopBank = ShopBank;
//# sourceMappingURL=ShopBank.js.map

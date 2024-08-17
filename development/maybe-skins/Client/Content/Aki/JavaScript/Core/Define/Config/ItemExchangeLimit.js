"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemExchangeLimit = void 0);
class ItemExchangeLimit {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get AddBtnTime() {
		return this.addbtntime();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsItemExchangeLimit(t, i) {
		return (i || new ItemExchangeLimit()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	addbtntime() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 100;
	}
}
exports.ItemExchangeLimit = ItemExchangeLimit;
//# sourceMappingURL=ItemExchangeLimit.js.map

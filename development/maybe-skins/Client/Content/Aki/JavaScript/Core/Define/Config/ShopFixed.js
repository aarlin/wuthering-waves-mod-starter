"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopFixed = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class ShopFixed {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ShopId() {
		return this.shopid();
	}
	get ItemId() {
		return this.itemid();
	}
	get ItemNum() {
		return this.itemnum();
	}
	get CondId() {
		return this.condid();
	}
	get LimitNum() {
		return this.limitnum();
	}
	get OriginalPrice() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.originalpriceLength(),
			(t) => this.originalprice(t)?.key(),
			(t) => this.originalprice(t)?.value(),
		);
	}
	get Price() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.priceLength(),
			(t) => this.price(t)?.key(),
			(t) => this.price(t)?.value(),
		);
	}
	get Show() {
		return this.show();
	}
	get Label() {
		return this.label();
	}
	get SwitchText() {
		return this.switchtext();
	}
	get PurchaseText() {
		return this.purchasetext();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsShopFixed(t, i) {
		return (i || new ShopFixed()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	shopid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	itemnum() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	condid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	limitnum() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : -1;
	}
	GetOriginalpriceAt(t, i) {
		return this.originalprice(t);
	}
	originalprice(t, i) {
		var s = this.J7.__offset(this.z7, 16);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	originalpriceLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetPriceAt(t, i) {
		return this.price(t);
	}
	price(t, i) {
		var s = this.J7.__offset(this.z7, 18);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	priceLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	show() {
		var t = this.J7.__offset(this.z7, 20);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	label(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	switchtext(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	purchasetext(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.ShopFixed = ShopFixed;
//# sourceMappingURL=ShopFixed.js.map

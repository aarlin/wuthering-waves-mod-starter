"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopDirectGoods = void 0);
class PayShopDirectGoods {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get GoodsId() {
		return this.goodsid();
	}
	get PayId() {
		return this.payid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPayShopDirectGoods(t, s) {
		return (s || new PayShopDirectGoods()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	goodsid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	payid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PayShopDirectGoods = PayShopDirectGoods;
//# sourceMappingURL=PayShopDirectGoods.js.map

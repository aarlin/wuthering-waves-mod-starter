"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ShopInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ShopType() {
		return this.shoptype();
	}
	get ShopName() {
		return this.shopname();
	}
	get OpenId() {
		return this.openid();
	}
	get ShowCurrency() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.showcurrencyLength(),
			(t) => this.showcurrency(t),
		);
	}
	get DialogueText() {
		return this.dialoguetext();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsShopInfo(t, s) {
		return (s || new ShopInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	shoptype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	shopname(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	openid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetShowcurrencyAt(t) {
		return this.showcurrency(t);
	}
	showcurrency(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	showcurrencyLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	showcurrencyArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	dialoguetext(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.ShopInfo = ShopInfo;
//# sourceMappingURL=ShopInfo.js.map

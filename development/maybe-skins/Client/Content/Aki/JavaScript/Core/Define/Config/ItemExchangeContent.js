"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemExchangeContent = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class ItemExchangeContent {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get Times() {
		return this.times();
	}
	get GainCount() {
		return this.gaincount();
	}
	get Consume() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.consumeLength(),
			(t) => this.consume(t)?.key(),
			(t) => this.consume(t)?.value(),
		);
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsItemExchangeContent(t, e) {
		return (e || new ItemExchangeContent()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	times() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	gaincount() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetConsumeAt(t, e) {
		return this.consume(t);
	}
	consume(t, e) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (e || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	consumeLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.ItemExchangeContent = ItemExchangeContent;
//# sourceMappingURL=ItemExchangeContent.js.map

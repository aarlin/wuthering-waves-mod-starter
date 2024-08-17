"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueRandomGood = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils"),
	DicStringInt_1 = require("./DicStringInt");
class RogueRandomGood {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get GoodsPoolWeight() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.goodspoolweightLength(),
			(t) => this.goodspoolweight(t)?.key(),
			(t) => this.goodspoolweight(t)?.value(),
		);
	}
	get Discount() {
		return this.discount();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRogueRandomGood(t, i) {
		return (i || new RogueRandomGood()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetGoodspoolweightAt(t, i) {
		return this.goodspoolweight(t);
	}
	goodspoolweight(t, i) {
		var s = this.J7.__offset(this.z7, 4);
		return s
			? (i || new DicStringInt_1.DicStringInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	goodspoolweightLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	discount() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RogueRandomGood = RogueRandomGood;
//# sourceMappingURL=RogueRandomGood.js.map

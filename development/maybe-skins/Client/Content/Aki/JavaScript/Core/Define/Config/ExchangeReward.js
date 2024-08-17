"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExchangeReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt"),
	DicIntIntIntMap_1 = require("./SubType/DicIntIntIntMap");
class ExchangeReward {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SharedId() {
		return this.sharedid();
	}
	get MaxCount() {
		return this.maxcount();
	}
	get Cost() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.costLength(),
			(t) => this.cost(t)?.key(),
			(t) => this.cost(t)?.value(),
		);
	}
	get RewardId() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.rewardidLength(),
			(t) => this.rewardid(t)?.key(),
			(t) => this.rewardid(t)?.value(),
		);
	}
	get PreviewReward() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.previewrewardLength(),
			(t) => this.previewreward(t)?.key(),
			(t) => this.previewreward(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsExchangeReward(t, i) {
		return (i || new ExchangeReward()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sharedid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxcount() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetCostAt(t, i) {
		return this.cost(t);
	}
	cost(t, i) {
		var e = this.J7.__offset(this.z7, 10);
		return e
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	costLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetRewardidAt(t, i) {
		return this.rewardid(t);
	}
	rewardid(t, i) {
		var e = this.J7.__offset(this.z7, 12);
		return e
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	rewardidLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetPreviewrewardAt(t, i) {
		return this.previewreward(t);
	}
	previewreward(t, i) {
		var e = this.J7.__offset(this.z7, 14);
		return e
			? (i || new DicIntIntIntMap_1.DicIntIntIntMap()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	previewrewardLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.ExchangeReward = ExchangeReward;
//# sourceMappingURL=ExchangeReward.js.map

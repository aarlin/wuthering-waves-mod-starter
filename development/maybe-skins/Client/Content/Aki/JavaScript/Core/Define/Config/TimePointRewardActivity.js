"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimePointRewardActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class TimePointRewardActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActivityId() {
		return this.activityid();
	}
	get RewardItem() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.rewarditemLength(),
			(t) => this.rewarditem(t)?.key(),
			(t) => this.rewarditem(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTimePointRewardActivity(t, i) {
		return (i || new TimePointRewardActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRewarditemAt(t, i) {
		return this.rewarditem(t);
	}
	rewarditem(t, i) {
		var e = this.J7.__offset(this.z7, 8);
		return e
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	rewarditemLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.TimePointRewardActivity = TimePointRewardActivity;
//# sourceMappingURL=TimePointRewardActivity.js.map

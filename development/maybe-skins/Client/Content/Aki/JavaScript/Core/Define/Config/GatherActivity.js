"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GatherActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class GatherActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PlayTask() {
		return this.playtask();
	}
	get TaskClue() {
		return this.taskclue();
	}
	get SubmitItem() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.submititemLength(),
			(t) => this.submititem(t)?.key(),
			(t) => this.submititem(t)?.value(),
		);
	}
	get Reward() {
		return this.reward();
	}
	get LocationEntityConfigId() {
		return this.locationentityconfigid();
	}
	get MarkId() {
		return this.markid();
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
	static getRootAsGatherActivity(t, i) {
		return (i || new GatherActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	playtask() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	taskclue(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetSubmititemAt(t, i) {
		return this.submititem(t);
	}
	submititem(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	submititemLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	reward() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	locationentityconfigid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	markid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRewarditemAt(t, i) {
		return this.rewarditem(t);
	}
	rewarditem(t, i) {
		var s = this.J7.__offset(this.z7, 18);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	rewarditemLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.GatherActivity = GatherActivity;
//# sourceMappingURL=GatherActivity.js.map

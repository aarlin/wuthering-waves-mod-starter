"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDefenceInstance = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TowerDefenceInstance {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get InstanceId() {
		return this.instanceid();
	}
	get ActivityId() {
		return this.activityid();
	}
	get SortId() {
		return this.sortid();
	}
	get OptionalBuff() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.optionalbuffLength(),
			(t) => this.optionalbuff(t),
		);
	}
	get OpenDay() {
		return this.openday();
	}
	get Condition() {
		return this.condition();
	}
	get RewardId() {
		return this.rewardid();
	}
	get RewardScore() {
		return this.rewardscore();
	}
	get LevelRewardDesc() {
		return this.levelrewarddesc();
	}
	get BaseEntityId() {
		return this.baseentityid();
	}
	get UnlockScoreLimit() {
		return this.unlockscorelimit();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTowerDefenceInstance(t, i) {
		return (i || new TowerDefenceInstance()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	instanceid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sortid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetOptionalbuffAt(t) {
		return this.optionalbuff(t);
	}
	optionalbuff(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	optionalbuffLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	optionalbuffArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	openday() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	condition() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rewardid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rewardscore() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelrewarddesc(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	baseentityid() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlockscorelimit() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TowerDefenceInstance = TowerDefenceInstance;
//# sourceMappingURL=TowerDefenceInstance.js.map

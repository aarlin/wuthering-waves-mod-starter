"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BossRushActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActivityId() {
		return this.activityid();
	}
	get InstId() {
		return this.instid();
	}
	get GroupId() {
		return this.groupid();
	}
	get SortId() {
		return this.sortid();
	}
	get BuffCount() {
		return this.buffcount();
	}
	get DefaultBuff() {
		return GameUtils_1.GameUtils.ConvertToArray(this.defaultbuffLength(), (t) =>
			this.defaultbuff(t),
		);
	}
	get OptionalBuff() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.optionalbuffLength(),
			(t) => this.optionalbuff(t),
		);
	}
	get UnlockBuff() {
		return GameUtils_1.GameUtils.ConvertToArray(this.unlockbuffLength(), (t) =>
			this.unlockbuff(t),
		);
	}
	get OpenDay() {
		return this.openday();
	}
	get Condition() {
		return this.condition();
	}
	get PreLevel() {
		return this.prelevel();
	}
	get RewardScore() {
		return this.rewardscore();
	}
	get LevelRewardDesc() {
		return this.levelrewarddesc();
	}
	get RewardId() {
		return this.rewardid();
	}
	get BossInfo() {
		return this.bossinfo();
	}
	get PreviewTexture() {
		return this.previewtexture();
	}
	get StageTexture() {
		return this.stagetexture();
	}
	get BossCount() {
		return this.bosscount();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBossRushActivity(t, s) {
		return (s || new BossRushActivity()).__init(
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
	instid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	groupid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sortid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	buffcount() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetDefaultbuffAt(t) {
		return this.defaultbuff(t);
	}
	defaultbuff(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	defaultbuffLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultbuffArray() {
		var t = this.J7.__offset(this.z7, 16);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetOptionalbuffAt(t) {
		return this.optionalbuff(t);
	}
	optionalbuff(t) {
		var s = this.J7.__offset(this.z7, 18);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	optionalbuffLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	optionalbuffArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetUnlockbuffAt(t) {
		return this.unlockbuff(t);
	}
	unlockbuff(t) {
		var s = this.J7.__offset(this.z7, 20);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	unlockbuffLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	unlockbuffArray() {
		var t = this.J7.__offset(this.z7, 20);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	openday() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	condition() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	prelevel() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rewardscore() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelrewarddesc(t) {
		var s = this.J7.__offset(this.z7, 30);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	rewardid() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	bossinfo() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	previewtexture(t) {
		var s = this.J7.__offset(this.z7, 36);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	stagetexture(t) {
		var s = this.J7.__offset(this.z7, 38);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	bosscount() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BossRushActivity = BossRushActivity;
//# sourceMappingURL=BossRushActivity.js.map

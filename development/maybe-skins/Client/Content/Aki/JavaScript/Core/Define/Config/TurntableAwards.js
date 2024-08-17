"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TurntableAwards = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class TurntableAwards {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActivityId() {
		return this.activityid();
	}
	get GroupId() {
		return this.groupid();
	}
	get RewardItem() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.rewarditemLength(),
			(t) => this.rewarditem(t)?.key(),
			(t) => this.rewarditem(t)?.value(),
		);
	}
	get IsSpecial() {
		return this.isspecial();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTurntableAwards(t, i) {
		return (i || new TurntableAwards()).__init(
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
	groupid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRewarditemAt(t, i) {
		return this.rewarditem(t);
	}
	rewarditem(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	rewarditemLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	isspecial() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.TurntableAwards = TurntableAwards;
//# sourceMappingURL=TurntableAwards.js.map

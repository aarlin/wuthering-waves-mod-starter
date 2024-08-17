"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class BattlePassReward {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get BattlePassId() {
		return this.battlepassid();
	}
	get Level() {
		return this.level();
	}
	get FreeReward() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.freerewardLength(),
			(t) => this.freereward(t)?.key(),
			(t) => this.freereward(t)?.value(),
		);
	}
	get PayReward() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.payrewardLength(),
			(t) => this.payreward(t)?.key(),
			(t) => this.payreward(t)?.value(),
		);
	}
	get IsMilestone() {
		return this.ismilestone();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsBattlePassReward(t, e) {
		return (e || new BattlePassReward()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	battlepassid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetFreerewardAt(t, e) {
		return this.freereward(t);
	}
	freereward(t, e) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? (e || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	freerewardLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetPayrewardAt(t, e) {
		return this.payreward(t);
	}
	payreward(t, e) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (e || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	payrewardLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	ismilestone() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.BattlePassReward = BattlePassReward;
//# sourceMappingURL=BattlePassReward.js.map

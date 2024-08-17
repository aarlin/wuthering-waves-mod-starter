"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePass = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class BattlePass {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get InitialLevel() {
		return this.initiallevel();
	}
	get LevelLimit() {
		return this.levellimit();
	}
	get LevelUpExp() {
		return this.levelupexp();
	}
	get ConsumeId() {
		return this.consumeid();
	}
	get ConsumeCount() {
		return this.consumecount();
	}
	get IsRecurringLevel() {
		return this.isrecurringlevel();
	}
	get FreeRecurringReward() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.freerecurringrewardLength(),
			(t) => this.freerecurringreward(t)?.key(),
			(t) => this.freerecurringreward(t)?.value(),
		);
	}
	get PayRecurringReward() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.payrecurringrewardLength(),
			(t) => this.payrecurringreward(t)?.key(),
			(t) => this.payrecurringreward(t)?.value(),
		);
	}
	get RecurringLevelExp() {
		return this.recurringlevelexp();
	}
	get WeekExpLimit() {
		return this.weekexplimit();
	}
	get ExclusiveRewardPath() {
		return this.exclusiverewardpath();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsBattlePass(t, r) {
		return (r || new BattlePass()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	initiallevel() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levellimit() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelupexp() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	consumeid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	consumecount() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	isrecurringlevel() {
		var t = this.J7.__offset(this.z7, 16);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	GetFreerecurringrewardAt(t, r) {
		return this.freerecurringreward(t);
	}
	freerecurringreward(t, r) {
		var e = this.J7.__offset(this.z7, 18);
		return e
			? (r || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	freerecurringrewardLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetPayrecurringrewardAt(t, r) {
		return this.payrecurringreward(t);
	}
	payrecurringreward(t, r) {
		var e = this.J7.__offset(this.z7, 20);
		return e
			? (r || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	payrecurringrewardLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	recurringlevelexp() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	weekexplimit() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	exclusiverewardpath(t) {
		var r = this.J7.__offset(this.z7, 26);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.BattlePass = BattlePass;
//# sourceMappingURL=BattlePass.js.map

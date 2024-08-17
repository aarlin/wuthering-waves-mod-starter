"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassUnlockPop = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class BattlePassUnlockPop {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get TpyeID() {
		return this.tpyeid();
	}
	get UnlockTitle() {
		return this.unlocktitle();
	}
	get UnlockText() {
		return this.unlocktext();
	}
	get UnlockReward() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.unlockrewardLength(),
			(t) => this.unlockreward(t)?.key(),
			(t) => this.unlockreward(t)?.value(),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBattlePassUnlockPop(t, s) {
		return (s || new BattlePassUnlockPop()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	tpyeid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlocktitle(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	unlocktext(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetUnlockrewardAt(t, s) {
		return this.unlockreward(t);
	}
	unlockreward(t, s) {
		var e = this.J7.__offset(this.z7, 10);
		return e
			? (s || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	unlockrewardLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.BattlePassUnlockPop = BattlePassUnlockPop;
//# sourceMappingURL=BattlePassUnlockPop.js.map

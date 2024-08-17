"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleScoreLevelConf = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BattleScoreLevelConf {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return this.groupid();
	}
	get Level() {
		return this.level();
	}
	get LowerUpperLimits() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.lowerupperlimitsLength(),
			(t) => this.lowerupperlimits(t),
		);
	}
	get Bgm() {
		return this.bgm();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsBattleScoreLevelConf(t, e) {
		return (e || new BattleScoreLevelConf()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	groupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetLowerupperlimitsAt(t) {
		return this.lowerupperlimits(t);
	}
	lowerupperlimits(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.readInt32(this.J7.__vector(this.z7 + e) + 4 * t) : 0;
	}
	lowerupperlimitsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	lowerupperlimitsArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	bgm(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.BattleScoreLevelConf = BattleScoreLevelConf;
//# sourceMappingURL=BattleScoreLevelConf.js.map

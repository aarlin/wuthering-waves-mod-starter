"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiTeamLevelNew = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	FloatRange_1 = require("./SubType/FloatRange");
class AiTeamLevelNew {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PositionId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.positionidLength(), (t) =>
			this.positionid(t),
		);
	}
	get AllocationPeriodic() {
		return this.allocationperiodic();
	}
	get AttackerNum() {
		return this.attackernum();
	}
	get AttackCountDown() {
		return this.attackcountdown();
	}
	get NoAttackCountDown() {
		return this.noattackcountdown();
	}
	get BeAttackCountDown() {
		return this.beattackcountdown();
	}
	get EliteRatio() {
		return GameUtils_1.GameUtils.ConvertToArray(this.eliteratioLength(), (t) =>
			this.eliteratio(t),
		);
	}
	get RangeRatio() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rangeratioLength(), (t) =>
			this.rangeratio(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAiTeamLevelNew(t, i) {
		return (i || new AiTeamLevelNew()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	GetPositionidAt(t) {
		return this.positionid(t);
	}
	positionid(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	positionidLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	positionidArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	allocationperiodic(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	attackernum() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	attackcountdown(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	noattackcountdown(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	beattackcountdown(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	GetEliteratioAt(t) {
		return this.eliteratio(t);
	}
	eliteratio(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	eliteratioLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	eliteratioArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetRangeratioAt(t) {
		return this.rangeratio(t);
	}
	rangeratio(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	rangeratioLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rangeratioArray() {
		var t = this.J7.__offset(this.z7, 20);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.AiTeamLevelNew = AiTeamLevelNew;
//# sourceMappingURL=AiTeamLevelNew.js.map

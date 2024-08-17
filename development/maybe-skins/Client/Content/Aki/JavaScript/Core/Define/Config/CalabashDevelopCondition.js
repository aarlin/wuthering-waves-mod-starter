"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashDevelopCondition = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class CalabashDevelopCondition {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Condition() {
		return this.condition();
	}
	get ConditionParam() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.conditionparamLength(),
			(t) => this.conditionparam(t),
		);
	}
	get Description() {
		return this.description();
	}
	get RewardExp() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.rewardexpLength(),
			(t) => this.rewardexp(t)?.key(),
			(t) => this.rewardexp(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCalabashDevelopCondition(t, i) {
		return (i || new CalabashDevelopCondition()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	condition() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetConditionparamAt(t) {
		return this.conditionparam(t);
	}
	conditionparam(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	conditionparamLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	conditionparamArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	description(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetRewardexpAt(t, i) {
		return this.rewardexp(t);
	}
	rewardexp(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	rewardexpLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.CalabashDevelopCondition = CalabashDevelopCondition;
//# sourceMappingURL=CalabashDevelopCondition.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillCondition = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class SkillCondition {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ConditionType() {
		return this.conditiontype();
	}
	get ConditionParam() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.conditionparamLength(),
			(t) => this.conditionparam(t)?.key(),
			(t) => this.conditionparam(t)?.value(),
		);
	}
	get Description() {
		return this.description();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSkillCondition(t, i) {
		return (i || new SkillCondition()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	conditiontype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetConditionparamAt(t, i) {
		return this.conditionparam(t);
	}
	conditionparam(t, i) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	conditionparamLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	description(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.SkillCondition = SkillCondition;
//# sourceMappingURL=SkillCondition.js.map

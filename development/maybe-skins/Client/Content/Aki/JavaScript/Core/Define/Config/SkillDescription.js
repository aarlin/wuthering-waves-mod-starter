"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillDescription = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	StringArray_1 = require("./SubType/StringArray");
class SkillDescription {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SkillLevelGroupId() {
		return this.skilllevelgroupid();
	}
	get AttributeName() {
		return this.attributename();
	}
	get SkillDetailNum() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.skilldetailnumLength(),
			(t) => this.skilldetailnum(t),
		);
	}
	get Description() {
		return this.description();
	}
	get Order() {
		return this.order();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSkillDescription(t, i) {
		return (i || new SkillDescription()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skilllevelgroupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	attributename(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetSkilldetailnumAt(t, i) {
		return this.skilldetailnum(t);
	}
	skilldetailnum(t, i) {
		var r = this.J7.__offset(this.z7, 10);
		return r
			? (i || new StringArray_1.StringArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	skilldetailnumLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	description(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	order() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SkillDescription = SkillDescription;
//# sourceMappingURL=SkillDescription.js.map

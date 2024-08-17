"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiBaseSkill = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntArray_1 = require("./SubType/IntArray");
class AiBaseSkill {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RandomSkills() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.randomskillsLength(),
			(t) => this.randomskills(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAiBaseSkill(t, s) {
		return (s || new AiBaseSkill()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRandomskillsAt(t, s) {
		return this.randomskills(t);
	}
	randomskills(t, s) {
		var i = this.J7.__offset(this.z7, 6);
		return i
			? (s || new IntArray_1.IntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	randomskillsLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.AiBaseSkill = AiBaseSkill;
//# sourceMappingURL=AiBaseSkill.js.map

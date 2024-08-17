"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillInput = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SkillInput {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get InputArray() {
		return GameUtils_1.GameUtils.ConvertToArray(this.inputarrayLength(), (t) =>
			this.inputarray(t),
		);
	}
	get SkillArray() {
		return GameUtils_1.GameUtils.ConvertToArray(this.skillarrayLength(), (t) =>
			this.skillarray(t),
		);
	}
	get Description() {
		return this.description();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSkillInput(t, i) {
		return (i || new SkillInput()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetInputarrayAt(t) {
		return this.inputarray(t);
	}
	inputarray(t, i) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	inputarrayLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetSkillarrayAt(t) {
		return this.skillarray(t);
	}
	skillarray(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	skillarrayLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	skillarrayArray() {
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
}
exports.SkillInput = SkillInput;
//# sourceMappingURL=SkillInput.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillInput = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleSkillInput {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get RoleId() {
		return this.roleid();
	}
	get SkillInputIdList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.skillinputidlistLength(),
			(t) => this.skillinputidlist(t),
		);
	}
	get Icon() {
		return this.icon();
	}
	get DescList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.desclistLength(), (t) =>
			this.desclist(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRoleSkillInput(t, i) {
		return (i || new RoleSkillInput()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetSkillinputidlistAt(t) {
		return this.skillinputidlist(t);
	}
	skillinputidlist(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	skillinputidlistLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	skillinputidlistArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetDesclistAt(t) {
		return this.desclist(t);
	}
	desclist(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	desclistLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.RoleSkillInput = RoleSkillInput;
//# sourceMappingURL=RoleSkillInput.js.map

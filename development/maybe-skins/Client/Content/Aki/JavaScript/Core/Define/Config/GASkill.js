"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GASkill = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GASkill {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ConfigId() {
		return this.configid();
	}
	get SkillId() {
		return this.skillid();
	}
	get MontageId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.montageidLength(), (t) =>
			this.montageid(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGASkill(t, i) {
		return (i || new GASkill()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	configid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetMontageidAt(t) {
		return this.montageid(t);
	}
	montageid(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	montageidLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	montageidArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.GASkill = GASkill;
//# sourceMappingURL=GASkill.js.map

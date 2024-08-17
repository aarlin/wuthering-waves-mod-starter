"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HardnessMode = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class HardnessMode {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ReductionData() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.reductiondataLength(),
			(t) => this.reductiondata(t),
		);
	}
	get AttackTypeData() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.attacktypedataLength(),
			(t) => this.attacktypedata(t),
		);
	}
	get CorrectData() {
		return GameUtils_1.GameUtils.ConvertToArray(this.correctdataLength(), (t) =>
			this.correctdata(t),
		);
	}
	get WeaponReduction() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.weaponreductionLength(),
			(t) => this.weaponreduction(t),
		);
	}
	get SkillTypeParam() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.skilltypeparamLength(),
			(t) => this.skilltypeparam(t),
		);
	}
	get Percent() {
		return this.percent();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsHardnessMode(t, s) {
		return (s || new HardnessMode()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetReductiondataAt(t) {
		return this.reductiondata(t);
	}
	reductiondata(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	reductiondataLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	reductiondataArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetAttacktypedataAt(t) {
		return this.attacktypedata(t);
	}
	attacktypedata(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	attacktypedataLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	attacktypedataArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetCorrectdataAt(t) {
		return this.correctdata(t);
	}
	correctdata(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	correctdataLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	correctdataArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetWeaponreductionAt(t) {
		return this.weaponreduction(t);
	}
	weaponreduction(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	weaponreductionLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	weaponreductionArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetSkilltypeparamAt(t) {
		return this.skilltypeparam(t);
	}
	skilltypeparam(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	skilltypeparamLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	skilltypeparamArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	percent() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.HardnessMode = HardnessMode;
//# sourceMappingURL=HardnessMode.js.map

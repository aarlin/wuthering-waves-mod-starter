"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceTrialRoleConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class InstanceTrialRoleConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MaleFormation() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.maleformationLength(),
			(t) => this.maleformation(t),
		);
	}
	get FemaleFormation() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.femaleformationLength(),
			(t) => this.femaleformation(t),
		);
	}
	get MaleDelayFormation() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.maledelayformationLength(),
			(t) => this.maledelayformation(t),
		);
	}
	get FemaleDelayFormation() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.femaledelayformationLength(),
			(t) => this.femaledelayformation(t),
		);
	}
	get OnlyTrial() {
		return this.onlytrial();
	}
	get AutoChange() {
		return this.autochange();
	}
	get ShowInEntrance() {
		return this.showinentrance();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsInstanceTrialRoleConfig(t, i) {
		return (i || new InstanceTrialRoleConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetMaleformationAt(t) {
		return this.maleformation(t);
	}
	maleformation(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	maleformationLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	maleformationArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetFemaleformationAt(t) {
		return this.femaleformation(t);
	}
	femaleformation(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	femaleformationLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	femaleformationArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetMaledelayformationAt(t) {
		return this.maledelayformation(t);
	}
	maledelayformation(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	maledelayformationLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	maledelayformationArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetFemaledelayformationAt(t) {
		return this.femaledelayformation(t);
	}
	femaledelayformation(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	femaledelayformationLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	femaledelayformationArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	onlytrial() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	autochange() {
		var t = this.J7.__offset(this.z7, 16);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	showinentrance() {
		var t = this.J7.__offset(this.z7, 18);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.InstanceTrialRoleConfig = InstanceTrialRoleConfig;
//# sourceMappingURL=InstanceTrialRoleConfig.js.map

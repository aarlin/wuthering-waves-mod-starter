"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonIndex = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringIntArray_1 = require("./SubType/DicStringIntArray");
class SkillButtonIndex {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DesktopButtonTypeList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.desktopbuttontypelistLength(),
			(t) => this.desktopbuttontypelist(t),
		);
	}
	get PadButtonTypeList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.padbuttontypelistLength(),
			(t) => this.padbuttontypelist(t),
		);
	}
	get DesktopButtonTypeMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.desktopbuttontypemapLength(),
			(t) => this.desktopbuttontypemap(t)?.key(),
			(t) => this.desktopbuttontypemap(t)?.value(),
		);
	}
	get PadButtonTypeMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.padbuttontypemapLength(),
			(t) => this.padbuttontypemap(t)?.key(),
			(t) => this.padbuttontypemap(t)?.value(),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsSkillButtonIndex(t, s) {
		return (s || new SkillButtonIndex()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetDesktopbuttontypelistAt(t) {
		return this.desktopbuttontypelist(t);
	}
	desktopbuttontypelist(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	desktopbuttontypelistLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	desktopbuttontypelistArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetPadbuttontypelistAt(t) {
		return this.padbuttontypelist(t);
	}
	padbuttontypelist(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	padbuttontypelistLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	padbuttontypelistArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetDesktopbuttontypemapAt(t, s) {
		return this.desktopbuttontypemap(t);
	}
	desktopbuttontypemap(t, s) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? (s || new DicStringIntArray_1.DicStringIntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	desktopbuttontypemapLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetPadbuttontypemapAt(t, s) {
		return this.padbuttontypemap(t);
	}
	padbuttontypemap(t, s) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? (s || new DicStringIntArray_1.DicStringIntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	padbuttontypemapLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.SkillButtonIndex = SkillButtonIndex;
//# sourceMappingURL=SkillButtonIndex.js.map

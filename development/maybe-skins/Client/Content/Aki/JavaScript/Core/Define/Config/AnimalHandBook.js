"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalHandBook = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class AnimalHandBook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MeshId() {
		return this.meshid();
	}
	get Name() {
		return this.name();
	}
	get Scale() {
		return GameUtils_1.GameUtils.ConvertToArray(this.scaleLength(), (t) =>
			this.scale(t),
		);
	}
	get Position() {
		return GameUtils_1.GameUtils.ConvertToArray(this.positionLength(), (t) =>
			this.position(t),
		);
	}
	get Rotator() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rotatorLength(), (t) =>
			this.rotator(t),
		);
	}
	get StandAnim() {
		return this.standanim();
	}
	get Icon() {
		return this.icon();
	}
	get TypeDescrtption() {
		return this.typedescrtption();
	}
	get Place() {
		return this.place();
	}
	get Descrtption() {
		return this.descrtption();
	}
	get DropItemId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.dropitemidLength(), (t) =>
			this.dropitemid(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAnimalHandBook(t, i) {
		return (i || new AnimalHandBook()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	meshid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetScaleAt(t) {
		return this.scale(t);
	}
	scale(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	scaleLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	scaleArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetPositionAt(t) {
		return this.position(t);
	}
	position(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	positionLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	positionArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetRotatorAt(t) {
		return this.rotator(t);
	}
	rotator(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	rotatorLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rotatorArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	standanim(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	typedescrtption(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	place(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	descrtption(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetDropitemidAt(t) {
		return this.dropitemid(t);
	}
	dropitemid(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	dropitemidLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	dropitemidArray() {
		var t = this.J7.__offset(this.z7, 26);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.AnimalHandBook = AnimalHandBook;
//# sourceMappingURL=AnimalHandBook.js.map

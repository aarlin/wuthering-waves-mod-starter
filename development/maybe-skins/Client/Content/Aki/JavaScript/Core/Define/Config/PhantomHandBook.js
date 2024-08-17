"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomHandBook = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomHandBook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get TypeDescrtption() {
		return this.typedescrtption();
	}
	get Intensity() {
		return this.intensity();
	}
	get Place() {
		return this.place();
	}
	get Title1() {
		return this.title1();
	}
	get Descrtption1() {
		return this.descrtption1();
	}
	get Title2() {
		return this.title2();
	}
	get Descrtption2() {
		return this.descrtption2();
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
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhantomHandBook(t, i) {
		return (i || new PhantomHandBook()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	typedescrtption(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	intensity(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	place(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	title1(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	descrtption1(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	title2(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	descrtption2(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetScaleAt(t) {
		return this.scale(t);
	}
	scale(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	scaleLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	scaleArray() {
		var t = this.J7.__offset(this.z7, 22);
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
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	positionLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	positionArray() {
		var t = this.J7.__offset(this.z7, 24);
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
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	rotatorLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rotatorArray() {
		var t = this.J7.__offset(this.z7, 26);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.PhantomHandBook = PhantomHandBook;
//# sourceMappingURL=PhantomHandBook.js.map

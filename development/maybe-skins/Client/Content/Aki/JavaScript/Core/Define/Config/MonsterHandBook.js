"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterHandBook = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterHandBook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get Name() {
		return this.name();
	}
	get MeshId() {
		return this.meshid();
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
	get TypeDescrtption() {
		return this.typedescrtption();
	}
	get Descrtption() {
		return this.descrtption();
	}
	get FightSkillDescrtption() {
		return this.fightskilldescrtption();
	}
	get PhantomItem() {
		return GameUtils_1.GameUtils.ConvertToArray(this.phantomitemLength(), (t) =>
			this.phantomitem(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMonsterHandBook(t, i) {
		return (i || new MonsterHandBook()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	meshid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetScaleAt(t) {
		return this.scale(t);
	}
	scale(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	scaleLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	scaleArray() {
		var t = this.J7.__offset(this.z7, 12);
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
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	positionLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	positionArray() {
		var t = this.J7.__offset(this.z7, 14);
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
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	rotatorLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rotatorArray() {
		var t = this.J7.__offset(this.z7, 16);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	standanim(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	typedescrtption(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	descrtption(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	fightskilldescrtption(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetPhantomitemAt(t) {
		return this.phantomitem(t);
	}
	phantomitem(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	phantomitemLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	phantomitemArray() {
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
exports.MonsterHandBook = MonsterHandBook;
//# sourceMappingURL=MonsterHandBook.js.map

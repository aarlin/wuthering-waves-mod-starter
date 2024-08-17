"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotoSetup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class PhotoSetup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ValueType() {
		return this.valuetype();
	}
	get Name() {
		return this.name();
	}
	get Type() {
		return this.type();
	}
	get Options() {
		return GameUtils_1.GameUtils.ConvertToArray(this.optionsLength(), (t) =>
			this.options(t),
		);
	}
	get DefaultOptionIndex() {
		return this.defaultoptionindex();
	}
	get SubOptions() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.suboptionsLength(),
			(t) => this.suboptions(t)?.key(),
			(t) => this.suboptions(t)?.value(),
		);
	}
	get ValueRange() {
		return GameUtils_1.GameUtils.ConvertToArray(this.valuerangeLength(), (t) =>
			this.valuerange(t),
		);
	}
	get IsReverseSet() {
		return this.isreverseset();
	}
	get ChangeValue() {
		return this.changevalue();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPhotoSetup(t, s) {
		return (s || new PhotoSetup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	valuetype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	type() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetOptionsAt(t) {
		return this.options(t);
	}
	options(t, s) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	optionsLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultoptionindex() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	GetSuboptionsAt(t, s) {
		return this.suboptions(t);
	}
	suboptions(t, s) {
		var i = this.J7.__offset(this.z7, 16);
		return i
			? (s || new DicIntIntArray_1.DicIntIntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	suboptionsLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetValuerangeAt(t) {
		return this.valuerange(t);
	}
	valuerange(t) {
		var s = this.J7.__offset(this.z7, 18);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	valuerangeLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	valuerangeArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	isreverseset() {
		var t = this.J7.__offset(this.z7, 20);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	changevalue() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readFloat32(this.z7 + t) : 0.1;
	}
}
exports.PhotoSetup = PhotoSetup;
//# sourceMappingURL=PhotoSetup.js.map

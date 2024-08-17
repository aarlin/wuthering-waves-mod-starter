"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Shield = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Shield {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Priority() {
		return this.priority();
	}
	get RefrenceAttribute() {
		return this.refrenceattribute();
	}
	get RefrenceTarget() {
		return this.refrencetarget();
	}
	get AttributeRate() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.attributerateLength(),
			(t) => this.attributerate(t),
		);
	}
	get Value() {
		return GameUtils_1.GameUtils.ConvertToArray(this.valueLength(), (t) =>
			this.value(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsShield(t, i) {
		return (i || new Shield()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	priority() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	refrenceattribute() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	refrencetarget() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetAttributerateAt(t) {
		return this.attributerate(t);
	}
	attributerate(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	attributerateLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	attributerateArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetValueAt(t) {
		return this.value(t);
	}
	value(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	valueLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	valueArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.Shield = Shield;
//# sourceMappingURL=Shield.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FloatArray = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils");
class FloatArray {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ArrayFloat() {
		return GameUtils_1.GameUtils.ConvertToArray(this.arrayfloatLength(), (t) =>
			this.arrayfloat(t),
		);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsFloatArray(t, r) {
		return (r || new FloatArray()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetArrayfloatAt(t) {
		return this.arrayfloat(t);
	}
	arrayfloat(t) {
		var r = this.J7.__offset(this.z7, 4);
		return r ? this.J7.readFloat32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
	}
	arrayfloatLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	arrayfloatArray() {
		var t = this.J7.__offset(this.z7, 4);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.FloatArray = FloatArray;
//# sourceMappingURL=FloatArray.js.map

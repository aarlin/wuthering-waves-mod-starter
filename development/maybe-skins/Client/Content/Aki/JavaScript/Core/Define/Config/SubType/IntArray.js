"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.IntArray = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils");
class IntArray {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ArrayInt() {
		return GameUtils_1.GameUtils.ConvertToArray(this.arrayintLength(), (t) =>
			this.arrayint(t),
		);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsIntArray(t, r) {
		return (r || new IntArray()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetArrayintAt(t) {
		return this.arrayint(t);
	}
	arrayint(t) {
		var r = this.J7.__offset(this.z7, 4);
		return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
	}
	arrayintLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	arrayintArray() {
		var t = this.J7.__offset(this.z7, 4);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.IntArray = IntArray;
//# sourceMappingURL=IntArray.js.map

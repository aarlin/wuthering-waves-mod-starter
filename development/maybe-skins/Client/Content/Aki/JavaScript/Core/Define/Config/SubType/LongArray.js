"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongArray = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils");
class LongArray {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ArrayLong() {
		return GameUtils_1.GameUtils.ConvertToArray(this.arraylongLength(), (t) =>
			this.arraylong(t),
		);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsLongArray(t, r) {
		return (r || new LongArray()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetArraylongAt(t) {
		return this.arraylong(t);
	}
	arraylong(t) {
		var r = this.J7.__offset(this.z7, 4);
		return r
			? this.J7.readInt64(this.J7.__vector(this.z7 + r) + 8 * t)
			: BigInt(0);
	}
	arraylongLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.LongArray = LongArray;
//# sourceMappingURL=LongArray.js.map

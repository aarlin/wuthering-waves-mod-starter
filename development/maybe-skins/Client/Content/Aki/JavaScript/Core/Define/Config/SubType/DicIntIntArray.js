"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicIntIntArray = void 0);
const IntArray_1 = require("./IntArray");
class DicIntIntArray {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsDicIntIntArray(t, r) {
		return (r || new DicIntIntArray()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	value(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (t || new IntArray_1.IntArray()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
}
exports.DicIntIntArray = DicIntIntArray;
//# sourceMappingURL=DicIntIntArray.js.map

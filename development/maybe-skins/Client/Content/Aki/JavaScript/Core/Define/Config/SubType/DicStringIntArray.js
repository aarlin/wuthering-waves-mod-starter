"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicStringIntArray = void 0);
const IntArray_1 = require("./IntArray");
class DicStringIntArray {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsDicStringIntArray(t, r) {
		return (r || new DicStringIntArray()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key(t) {
		var r = this.J7.__offset(this.z7, 4);
		return r ? this.J7.__string(this.z7 + r, t) : null;
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
exports.DicStringIntArray = DicStringIntArray;
//# sourceMappingURL=DicStringIntArray.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicIntStringArray = void 0);
const StringArray_1 = require("./StringArray");
class DicIntStringArray {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsDicIntStringArray(t, r) {
		return (r || new DicIntStringArray()).__init(
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
			? (t || new StringArray_1.StringArray()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
}
exports.DicIntStringArray = DicIntStringArray;
//# sourceMappingURL=DicIntStringArray.js.map

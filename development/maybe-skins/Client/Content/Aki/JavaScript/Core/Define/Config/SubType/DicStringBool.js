"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicStringBool = void 0);
class DicStringBool {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDicStringBool(t, i) {
		return (i || new DicStringBool()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	value() {
		var t = this.J7.__offset(this.z7, 6);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.DicStringBool = DicStringBool;
//# sourceMappingURL=DicStringBool.js.map

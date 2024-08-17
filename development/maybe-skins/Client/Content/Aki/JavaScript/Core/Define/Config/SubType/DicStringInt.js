"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicStringInt = void 0);
class DicStringInt {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDicStringInt(t, i) {
		return (i || new DicStringInt()).__init(
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
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DicStringInt = DicStringInt;
//# sourceMappingURL=DicStringInt.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicIntInt = void 0);
class DicIntInt {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsDicIntInt(t, s) {
		return (s || new DicIntInt()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	value() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DicIntInt = DicIntInt;
//# sourceMappingURL=DicIntInt.js.map

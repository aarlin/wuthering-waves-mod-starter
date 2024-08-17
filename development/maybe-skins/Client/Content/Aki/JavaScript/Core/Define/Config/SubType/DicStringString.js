"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicStringString = void 0);
class DicStringString {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDicStringString(t, i) {
		return (i || new DicStringString()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	value(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.DicStringString = DicStringString;
//# sourceMappingURL=DicStringString.js.map

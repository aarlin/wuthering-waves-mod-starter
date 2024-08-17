"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicStringFloat = void 0);
class DicStringFloat {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDicStringFloat(t, i) {
		return (i || new DicStringFloat()).__init(
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
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.DicStringFloat = DicStringFloat;
//# sourceMappingURL=DicStringFloat.js.map

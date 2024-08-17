"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DicIntIntIntMap = void 0);
const IntIntMap_1 = require("./IntIntMap");
class DicIntIntIntMap {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	__init(t, n) {
		return (this.z7 = t), (this.J7 = n), this;
	}
	static getRootAsDicIntIntIntMap(t, n) {
		return (n || new DicIntIntIntMap()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	value(t) {
		var n = this.J7.__offset(this.z7, 6);
		return n
			? (t || new IntIntMap_1.IntIntMap()).__init(
					this.J7.__indirect(this.z7 + n),
					this.J7,
				)
			: null;
	}
}
exports.DicIntIntIntMap = DicIntIntIntMap;
//# sourceMappingURL=DicIntIntIntMap.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.IntPair = void 0);
class IntPair {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Item1() {
		return this.item1();
	}
	get Item2() {
		return this.item2();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsIntPair(t, i) {
		return (i || new IntPair()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	item1() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	item2() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.IntPair = IntPair;
//# sourceMappingURL=IntPair.js.map

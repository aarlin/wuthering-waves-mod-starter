"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.IntIntMap = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils"),
	DicIntInt_1 = require("./DicIntInt");
class IntIntMap {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get MapIntInt() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.mapintintLength(),
			(t) => this.mapintint(t)?.key(),
			(t) => this.mapintint(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsIntIntMap(t, i) {
		return (i || new IntIntMap()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetMapintintAt(t, i) {
		return this.mapintint(t);
	}
	mapintint(t, i) {
		var n = this.J7.__offset(this.z7, 4);
		return n
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + n) + 4 * t),
					this.J7,
				)
			: null;
	}
	mapintintLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.IntIntMap = IntIntMap;
//# sourceMappingURL=IntIntMap.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FloatRange = void 0);
class FloatRange {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Min() {
		return this.min();
	}
	get Max() {
		return this.max();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsFloatRange(t, s) {
		return (s || new FloatRange()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	min() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	max() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.FloatRange = FloatRange;
//# sourceMappingURL=FloatRange.js.map

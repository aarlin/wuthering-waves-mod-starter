"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiFlee = void 0);
const FloatRange_1 = require("./SubType/FloatRange");
class AiFlee {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FleeDistance() {
		return this.fleedistance();
	}
	get FleeAngle() {
		return this.fleeangle();
	}
	get FleeHeight() {
		return this.fleeheight();
	}
	get TimeMilliseconds() {
		return this.timemilliseconds();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsAiFlee(t, e) {
		return (e || new AiFlee()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	fleedistance(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	fleeangle(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	fleeheight() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	timemilliseconds() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readFloat32(this.z7 + t) : 1e3;
	}
}
exports.AiFlee = AiFlee;
//# sourceMappingURL=AiFlee.js.map

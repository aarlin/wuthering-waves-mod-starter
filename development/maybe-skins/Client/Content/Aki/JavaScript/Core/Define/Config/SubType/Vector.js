"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Vector = void 0);
class Vector {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get X() {
		return this.x();
	}
	get Y() {
		return this.y();
	}
	get Z() {
		return this.z();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsVector(t, s) {
		return (s || new Vector()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	x() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	y() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	z() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.Vector = Vector;
//# sourceMappingURL=Vector.js.map

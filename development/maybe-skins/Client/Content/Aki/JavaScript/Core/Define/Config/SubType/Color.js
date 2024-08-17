"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Color = void 0);
class Color {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get R() {
		return this.r();
	}
	get G() {
		return this.g();
	}
	get B() {
		return this.b();
	}
	get A() {
		return this.a();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsColor(t, s) {
		return (s || new Color()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	r() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	g() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	b() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	a() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.Color = Color;
//# sourceMappingURL=Color.js.map

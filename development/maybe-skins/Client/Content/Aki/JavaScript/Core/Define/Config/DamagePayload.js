"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamagePayload = void 0);
class DamagePayload {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get A() {
		return this.a();
	}
	get B() {
		return this.b();
	}
	get C() {
		return this.c();
	}
	get D() {
		return this.d();
	}
	get E() {
		return this.e();
	}
	get F() {
		return this.f();
	}
	get G() {
		return this.g();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsDamagePayload(t, s) {
		return (s || new DamagePayload()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
	}
	a() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	b() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	c() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	d() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	e() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	f() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	g() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DamagePayload = DamagePayload;
//# sourceMappingURL=DamagePayload.js.map

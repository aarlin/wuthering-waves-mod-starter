"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FogBlock = void 0);
class FogBlock {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Block() {
		return this.block();
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
	get Alpha() {
		return this.alpha();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsFogBlock(t, s) {
		return (s || new FogBlock()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	block(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	r() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	g() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	b() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	alpha() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.FogBlock = FogBlock;
//# sourceMappingURL=FogBlock.js.map

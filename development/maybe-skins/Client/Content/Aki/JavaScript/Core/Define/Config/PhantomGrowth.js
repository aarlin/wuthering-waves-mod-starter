"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomGrowth = void 0);
class PhantomGrowth {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GrowthId() {
		return this.growthid();
	}
	get Level() {
		return this.level();
	}
	get Value() {
		return this.value();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsPhantomGrowth(t, r) {
		return (r || new PhantomGrowth()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	growthid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	value() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomGrowth = PhantomGrowth;
//# sourceMappingURL=PhantomGrowth.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RolePropertyGrowth = void 0);
class RolePropertyGrowth {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Level() {
		return this.level();
	}
	get BreachLevel() {
		return this.breachlevel();
	}
	get LifeMaxRatio() {
		return this.lifemaxratio();
	}
	get AtkRatio() {
		return this.atkratio();
	}
	get DefRatio() {
		return this.defratio();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsRolePropertyGrowth(t, r) {
		return (r || new RolePropertyGrowth()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	breachlevel() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	lifemaxratio() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	atkratio() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	defratio() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RolePropertyGrowth = RolePropertyGrowth;
//# sourceMappingURL=RolePropertyGrowth.js.map

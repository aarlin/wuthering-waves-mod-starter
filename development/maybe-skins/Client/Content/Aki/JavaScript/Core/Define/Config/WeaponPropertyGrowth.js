"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponPropertyGrowth = void 0);
class WeaponPropertyGrowth {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CurveId() {
		return this.curveid();
	}
	get Level() {
		return this.level();
	}
	get BreachLevel() {
		return this.breachlevel();
	}
	get CurveValue() {
		return this.curvevalue();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsWeaponPropertyGrowth(t, r) {
		return (r || new WeaponPropertyGrowth()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	curveid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	breachlevel() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	curvevalue() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.WeaponPropertyGrowth = WeaponPropertyGrowth;
//# sourceMappingURL=WeaponPropertyGrowth.js.map

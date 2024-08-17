"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponLevel = void 0);
class WeaponLevel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get LevelId() {
		return this.levelid();
	}
	get Level() {
		return this.level();
	}
	get Exp() {
		return this.exp();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsWeaponLevel(t, e) {
		return (e || new WeaponLevel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	exp() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.WeaponLevel = WeaponLevel;
//# sourceMappingURL=WeaponLevel.js.map

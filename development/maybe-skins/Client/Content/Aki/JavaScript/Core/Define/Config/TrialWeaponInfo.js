"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrialWeaponInfo = void 0);
class TrialWeaponInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get WeaponId() {
		return this.weaponid();
	}
	get WeaponLevel() {
		return this.weaponlevel();
	}
	get WeaponResonanceLevel() {
		return this.weaponresonancelevel();
	}
	get FullLevelTrialId() {
		return this.fullleveltrialid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsTrialWeaponInfo(t, e) {
		return (e || new TrialWeaponInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	weaponid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	weaponlevel() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	weaponresonancelevel() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	fullleveltrialid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TrialWeaponInfo = TrialWeaponInfo;
//# sourceMappingURL=TrialWeaponInfo.js.map

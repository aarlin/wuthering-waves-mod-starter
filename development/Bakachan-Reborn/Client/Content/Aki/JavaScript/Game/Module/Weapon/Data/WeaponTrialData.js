"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponTrialData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	WeaponDataBase_1 = require("./WeaponDataBase");
class WeaponTrialData extends WeaponDataBase_1.WeaponDataBase {
	constructor() {
		super(...arguments),
			(this.TrialId = 0),
			(this.TrialConfig = void 0),
			(this.RoleId = 0),
			(this.BreachLevel = 0);
	}
	SetTrialId(e) {
		(this.TrialId = e),
			(this.TrialConfig =
				ConfigManager_1.ConfigManager.WeaponConfig.GetTrialWeaponConfig(
					this.TrialId,
				)),
			this.InitWeaponBreachLevel();
	}
	InitWeaponBreachLevel() {
		var e = this.GetBreachConfigList(),
			a = this.GetLevel();
		for (const r of e)
			if (a <= r.LevelLimit) {
				this.BreachLevel = r.Level;
				break;
			}
	}
	GetItemId() {
		return this.TrialConfig.WeaponId;
	}
	GetLevel() {
		return this.TrialConfig.WeaponLevel;
	}
	GetResonanceLevel() {
		return this.TrialConfig.WeaponResonanceLevel;
	}
	GetBreachLevel() {
		return this.BreachLevel;
	}
	HasRole() {
		return 0 !== this.RoleId;
	}
	SetRoleId(e) {
		this.RoleId = e;
	}
	GetRoleId() {
		return this.RoleId;
	}
	IsTrial() {
		return !0;
	}
	CanGoBreach() {
		return !1;
	}
	GetTrialConfig() {
		return this.TrialConfig;
	}
}
exports.WeaponTrialData = WeaponTrialData;

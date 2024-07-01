"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleOnlineInstanceData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData"),
	RoleDataBase_1 = require("./RoleDataBase");
class RoleOnlineInstanceData extends RoleDataBase_1.RoleDataBase {
	constructor(e) {
		super(e), (this.WeaponTrialData = void 0), this.SetDefaultData();
	}
	SetDefaultData() {
		var e = this.GetRoleConfig();
		(this.WeaponTrialData = new WeaponTrialData_1.WeaponTrialData()),
			this.WeaponTrialData.SetTrialId(e.WeaponType);
	}
	IsTrialRole() {
		return !1;
	}
	GetRoleId() {
		return this.Id;
	}
	GetName(e) {
		var a = this.GetRoleConfig();
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(a.Name);
	}
	CanChangeName() {
		return !1;
	}
	GetShowAttributeValueById(e) {
		return 0;
	}
	IsOnlineRole() {
		return !0;
	}
	GetWeaponData() {
		return this.WeaponTrialData;
	}
	GetRoleCreateTime() {
		return 0;
	}
	GetIsNew() {
		return !1;
	}
}
exports.RoleOnlineInstanceData = RoleOnlineInstanceData;

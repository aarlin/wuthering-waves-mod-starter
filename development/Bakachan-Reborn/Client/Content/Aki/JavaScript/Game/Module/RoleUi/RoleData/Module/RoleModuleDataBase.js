"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleModuleDataBase = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class RoleModuleDataBase {
	constructor(e) {
		this.RoleId = e;
	}
	GetRoleConfig() {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId);
	}
}
exports.RoleModuleDataBase = RoleModuleDataBase;

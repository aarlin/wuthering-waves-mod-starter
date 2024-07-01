"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.JoinTeamConfig = void 0);
const RoleDescriptionById_1 = require("../../../Core/Define/ConfigQuery/RoleDescriptionById"),
	RoleInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleInfoById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class JoinTeamConfig extends ConfigBase_1.ConfigBase {
	GetRoleDescriptionConfig(e) {
		return RoleDescriptionById_1.configRoleDescriptionById.GetConfig(e);
	}
	GetRoleConfig(e) {
		return RoleInfoById_1.configRoleInfoById.GetConfig(e);
	}
	GetRoleNameId(e) {
		if ((e = this.GetRoleDescriptionConfig(e)))
			return (e = e.RoleId), this.GetRoleConfig(e).Name;
	}
	GetRoleTexturePath(e) {
		if ((e = this.GetRoleDescriptionConfig(e))) return e.Texture;
	}
	GetRoleDescriptionId(e) {
		if ((e = this.GetRoleDescriptionConfig(e))) return e.Description;
	}
	GetRoleElementId(e) {
		if ((e = this.GetRoleDescriptionConfig(e)))
			return (e = e.RoleId), this.GetRoleConfig(e).ElementId;
	}
	GetRoleConfigId(e) {
		if ((e = this.GetRoleDescriptionConfig(e))) return e.RoleId;
	}
}
exports.JoinTeamConfig = JoinTeamConfig;

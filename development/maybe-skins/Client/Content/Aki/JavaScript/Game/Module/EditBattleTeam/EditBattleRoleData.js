"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditBattleRoleData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	RoleDefine_1 = require("../RoleUi/RoleDefine");
class EditBattleRoleData {
	constructor() {
		(this.ConfigId = 0),
			(this.OnlineIndex = void 0),
			(this.PlayerName = void 0),
			(this.Level = 0),
			(this.IsSelf = !1),
			(this.IsReady = !1),
			(this.PlayerId = 0);
	}
	Init(e, i, t, a, o, n, l) {
		(this.PlayerId = e),
			(this.ConfigId = i),
			(this.OnlineIndex = t),
			(this.PlayerName = a),
			(this.Level = o),
			(this.IsSelf = n),
			(this.IsReady = l);
	}
	SetReady(e) {
		this.IsReady = e;
	}
	get GetTrialRoleConfig() {
		if (this.ConfigId > RoleDefine_1.ROBOT_DATA_MIN_ID) {
			let e =
				ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
					this.ConfigId,
				);
			return (e =
				e ||
				ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
					this.ConfigId,
				));
		}
	}
}
exports.EditBattleRoleData = EditBattleRoleData;

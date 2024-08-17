"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemRoleDescription = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRoleDescription extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		var r;
		return e.BoardId
			? !!(r =
					ConfigManager_1.ConfigManager.JoinTeamConfig.GetRoleDescriptionConfig(
						e.BoardId,
					)) &&
					void 0 !==
						(await UiManager_1.UiManager.OpenViewAsync(
							"RoleNewJoinTipView",
							r.RoleId,
						))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 36, "角色入队界面参数有误", [
						"BoardId",
						e.BoardId,
					]),
				!1);
	}
	GetViewName(e, o) {
		return "RoleNewJoinTipView";
	}
}
exports.OpenSystemRoleDescription = OpenSystemRoleDescription;

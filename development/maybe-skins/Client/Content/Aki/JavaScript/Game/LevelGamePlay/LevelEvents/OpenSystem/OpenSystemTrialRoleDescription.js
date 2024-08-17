"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemTrialRoleDescription = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	JoinTeamController_1 = require("../../../Module/JoinTeam/JoinTeamController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTrialRoleDescription extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		return e.BoardId
			? JoinTeamController_1.JoinTeamController.OpenJoinTeamView(e.BoardId, !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 36, "角色入队界面参数有误", [
						"BoardId",
						e.BoardId,
					]),
				!1);
	}
	GetViewName(e, o) {
		return "JoinTeamView";
	}
}
exports.OpenSystemTrialRoleDescription = OpenSystemTrialRoleDescription;

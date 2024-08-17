"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.JoinTeamController = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager");
class JoinTeamController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {}
	static OnRemoveEvents() {}
	static async OpenJoinTeamView(e, a = !1) {
		return (
			ModelManager_1.ModelManager.JoinTeamModel.SetRoleDescriptionId(e),
			!UiManager_1.UiManager.IsViewShow("JoinTeamView") &&
				void 0 !==
					(await UiManager_1.UiManager.OpenViewAsync("JoinTeamView", a))
		);
	}
	static CloseJoinTeamView() {
		UiManager_1.UiManager.IsViewShow("JoinTeamView") &&
			UiManager_1.UiManager.CloseView("JoinTeamView"),
			ModelManager_1.ModelManager.JoinTeamModel.SetRoleDescriptionId(void 0);
	}
}
exports.JoinTeamController = JoinTeamController;

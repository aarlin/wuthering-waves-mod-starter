"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonEntranceFlowSkipEditFormation = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
	EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
	InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController"),
	InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowSkipEditFormation extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
	OnCreate() {
		this.AddStep(() => {
			UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView");
		}),
			this.AddStep(() => {
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterInstanceDungeonByAutoRole()
					.then(
						(n) => {
							n &&
								EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
						},
						() => {},
					)
					.finally(() => {
						this.Reset();
					});
			});
	}
}
exports.InstanceDungeonEntranceFlowSkipEditFormation =
	InstanceDungeonEntranceFlowSkipEditFormation;

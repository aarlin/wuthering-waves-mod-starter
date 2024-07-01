"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonEntranceFlowRoguelike = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	RoguelikeController_1 = require("../../Roguelike/RoguelikeController"),
	InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowRoguelike extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
	OnCreate() {
		this.AddStep(() => {
			RoguelikeController_1.RoguelikeController.OpenRoguelikeInstanceView();
		}),
			this.AddStep(() => {
				RoguelikeController_1.RoguelikeController.OpenRoguelikeSelectRoleView(
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
				);
			}),
			this.AddStep(() => {
				RoguelikeController_1.RoguelikeController.RoguelikeStartRequest(
					!1,
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
					ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList,
				);
			});
	}
}
exports.InstanceDungeonEntranceFlowRoguelike =
	InstanceDungeonEntranceFlowRoguelike;

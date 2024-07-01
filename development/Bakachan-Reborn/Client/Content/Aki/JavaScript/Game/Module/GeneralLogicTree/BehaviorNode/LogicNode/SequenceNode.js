"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SequenceNode = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LogicNodeBase_1 = require("./LogicNodeBase");
class SequenceNode extends LogicNodeBase_1.LogicNodeBase {
	constructor(e) {
		super(e), (this.NodeType = "Sequence");
	}
	OnNodeActive() {
		super.OnNodeActive();
		var e = this.Config;
		e &&
			e.PerformanceSetting?.EnableOptimize &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ChangePerformanceLimitMode,
				!0,
				!1,
			),
			"Role" === this.Config.BudgetCameraType &&
				((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
					? (e = e.Entity.GetComponent(1)?.Owner)?.IsValid()
						? GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetCenterRole(
								e,
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Event",
								25,
								"SetRoleAsCameraToGameBudget: Current entity's actor is not valid!",
							)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Event",
							25,
							"SetRoleAsCameraToGameBudget: ModelManager.FormationModel!.GetCurrentEntity is undefined!",
						));
	}
	OnNodeDeActive(e) {
		super.OnNodeDeActive(e),
			(e = this.Config) &&
				e.PerformanceSetting?.EnableOptimize &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ChangePerformanceLimitMode,
					!1,
					!1,
				);
	}
}
exports.SequenceNode = SequenceNode;

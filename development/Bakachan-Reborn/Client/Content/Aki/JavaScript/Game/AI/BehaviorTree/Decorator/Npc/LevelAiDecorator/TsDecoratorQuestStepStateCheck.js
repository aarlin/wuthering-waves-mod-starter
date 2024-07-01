"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorQuestStepStateCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.QuestId = 0),
			(this.ChildQuestId = 0),
			(this.IsInitTsVariables = !1),
			(this.TsQuestId = 0),
			(this.TsChildQuestId = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsQuestId = this.QuestId),
			(this.TsChildQuestId = this.ChildQuestId));
	}
	PerformConditionCheckAI(e, s) {
		var t;
		return e.AiController
			? (this.InitTsVariables(),
				!(!this.TsQuestId || !this.TsChildQuestId) &&
					(3 ===
						ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
							this.TsQuestId,
						) ||
						(!!(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
							this.TsQuestId,
						)) &&
							(t.GetNode(this.TsChildQuestId)?.IsSuccess ?? !1))))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorQuestStepStateCheck;

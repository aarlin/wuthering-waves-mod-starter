"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class TsDecoratorQuestStateCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.QuestId = 0),
			(this.CheckStateId = 0),
			(this.CheckType = 0),
			(this.IsInitTsVariables = !1),
			(this.TsQuestId = 0),
			(this.TsCheckStateId = 0),
			(this.TsCheckType = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsQuestId = this.QuestId),
			(this.TsCheckStateId = this.CheckStateId),
			(this.TsCheckType = this.CheckType));
	}
	PerformConditionCheckAI(e, t) {
		if (!e.AiController)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1
			);
		if ((this.InitTsVariables(), !this.TsQuestId)) return !1;
		var s =
			ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
				this.TsQuestId,
			) === this.TsCheckStateId;
		switch (this.TsCheckType) {
			case 0:
				return s;
			case 1:
				return !s;
			default:
				return !1;
		}
	}
}
exports.default = TsDecoratorQuestStateCheck;

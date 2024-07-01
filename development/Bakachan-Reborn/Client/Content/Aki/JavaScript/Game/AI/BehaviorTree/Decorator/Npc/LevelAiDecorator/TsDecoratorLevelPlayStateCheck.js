"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	ICondition_1 = require("../../../../../../UniverseEditor/Interface/ICondition"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorLevelPlayStateCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.CheckType = 0),
			(this.LevelPlayId = 0),
			(this.StateId = 0),
			(this.IsInitTsVariables = !1),
			(this.TsCheckType = 0),
			(this.TsLevelPlayId = 0),
			(this.TsStateId = ICondition_1.ELevelPlayState.Close);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsCheckType = this.CheckType),
			(this.TsLevelPlayId = this.LevelPlayId),
			(this.TsStateId = this.StateId));
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
		if ((this.InitTsVariables(), !this.TsLevelPlayId)) return !1;
		switch (this.TsCheckType) {
			case 0:
				return ModelManager_1.ModelManager.LevelPlayModel.CheckLevelPlayState(
					this.TsLevelPlayId,
					this.TsStateId,
					"Eq",
				);
			case 1:
				return ModelManager_1.ModelManager.LevelPlayModel.CheckLevelPlayState(
					this.TsLevelPlayId,
					this.TsStateId,
					"Ne",
				);
			default:
				return !1;
		}
	}
}
exports.default = TsDecoratorLevelPlayStateCheck;

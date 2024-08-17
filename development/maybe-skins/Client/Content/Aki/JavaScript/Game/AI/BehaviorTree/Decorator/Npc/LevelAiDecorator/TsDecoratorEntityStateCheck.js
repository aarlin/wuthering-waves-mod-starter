"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorEntityStateCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.CheckType = 0),
			(this.StatusEntityId = 0),
			(this.State = ""),
			(this.IsInitTsVariables = !1),
			(this.TsCheckType = 0),
			(this.TsStatusEntityId = 0),
			(this.TsState = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsCheckType = this.CheckType),
			(this.TsStatusEntityId = this.StatusEntityId),
			(this.TsState = this.State));
	}
	PerformConditionCheckAI(t, e) {
		if (!t.AiController)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				!1
			);
		if ((this.InitTsVariables(), !this.TsStatusEntityId || "" === this.TsState))
			return !1;
		if (
			((t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.TsStatusEntityId,
			)),
			!t?.Valid)
		)
			return !1;
		if (!(t = t.Entity.GetComponent(177))) return !1;
		var s = t.ContainsTagByName(this.TsState);
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
exports.default = TsDecoratorEntityStateCheck;

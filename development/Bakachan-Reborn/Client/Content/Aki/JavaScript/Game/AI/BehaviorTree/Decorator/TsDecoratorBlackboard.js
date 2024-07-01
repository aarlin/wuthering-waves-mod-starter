"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorBlackboard extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.BlackboardKeyName = ""),
			(this.IsSet = !1),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKeyName = ""),
			(this.TsIsSet = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKeyName = this.BlackboardKeyName),
			(this.TsIsSet = this.IsSet));
	}
	PerformConditionCheckAI(r, e) {
		var a = r.AiController;
		return a
			? (this.InitTsVariables(),
				(r = BlackboardController_1.BlackboardController.HasValueByEntity(
					a.CharAiDesignComp.Entity.Id,
					this.TsBlackboardKeyName,
				)),
				this.TsIsSet === r)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						r.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorBlackboard;

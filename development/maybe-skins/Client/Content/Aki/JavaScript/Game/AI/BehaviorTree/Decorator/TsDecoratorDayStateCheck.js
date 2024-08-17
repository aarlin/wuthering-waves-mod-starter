"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorDayStateCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.BlackboardKey = "DayState"),
			(this.CheckValue = 0),
			(this.IsCollected = !1),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKey = ""),
			(this.TsCheckValue = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKey = this.BlackboardKey),
			(this.TsCheckValue = this.CheckValue));
	}
	PerformConditionCheckAI(e, t) {
		var r = e.AiController;
		return r
			? (this.InitTsVariables(),
				this.IsCollected ||
					((e = r.NpcDecision) &&
						((this.IsCollected = !0), (e.CheckDayState = !0))),
				!!(e = r.CharActorComp) &&
					((r = e.Entity.Id),
					BlackboardController_1.BlackboardController.GetIntValueByEntity(
						r,
						this.TsBlackboardKey,
					) === this.TsCheckValue))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorDayStateCheck;

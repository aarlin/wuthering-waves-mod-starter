"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorNowTimeCompare extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.BlackboardKey = ""),
			(this.IsGreaterThan = !0),
			(this.CompareValue = 0),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKey = ""),
			(this.TsIsGreaterThan = !1),
			(this.TsCompareValue = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKey = this.BlackboardKey),
			(this.TsIsGreaterThan = this.IsGreaterThan),
			(this.TsCompareValue = this.CompareValue));
	}
	PerformConditionCheckAI(e, r) {
		var a, o;
		return (
			this.InitTsVariables(),
			!!this.TsBlackboardKey &&
				((a = e.AiController)
					? ((a = a.CharActorComp.Entity.Id),
						(o = Time_1.Time.WorldTime),
						!(a =
							BlackboardController_1.BlackboardController.GetIntValueByEntity(
								a,
								this.TsBlackboardKey,
							)) ||
							((o -= a),
							this.TsIsGreaterThan
								? o > this.TsCompareValue
								: this.TsCompareValue > o))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
								"Type",
								e.GetClass().GetName(),
							]),
						!1))
		);
	}
}
exports.default = TsDecoratorNowTimeCompare;

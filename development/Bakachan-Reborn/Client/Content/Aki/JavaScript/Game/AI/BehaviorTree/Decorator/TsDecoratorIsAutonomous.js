"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log");
class TsDecoratorIsAutonomous extends UE.BTDecorator_BlueprintBase {
	PerformConditionCheckAI(o, e) {
		var r = o.AiController;
		return r
			? r.CharActorComp.IsAutonomousProxy
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						o.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorIsAutonomous;

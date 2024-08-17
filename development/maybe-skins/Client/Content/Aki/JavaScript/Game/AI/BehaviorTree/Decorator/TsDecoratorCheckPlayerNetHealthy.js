"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	OnlineController_1 = require("../../../Module/Online/OnlineController");
class TsDecoratorCheckPlayerNetHealthy extends UE.BTDecorator_BlueprintBase {
	PerformConditionCheckAI(e, r) {
		var o = e.AiController;
		return o
			? ((o = o.CharAiDesignComp.Entity.GetComponent(0).GetPlayerId()),
				OnlineController_1.OnlineController.CheckPlayerNetHealthy(o))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorCheckPlayerNetHealthy;

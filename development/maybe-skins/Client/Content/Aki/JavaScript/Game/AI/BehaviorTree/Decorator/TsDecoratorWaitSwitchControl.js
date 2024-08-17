"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log");
class TsDecoratorWaitSwitchControl extends UE.BTDecorator_BlueprintBase {
	PerformConditionCheckAI(e, r) {
		var o = e.AiController;
		return o
			? o.IsWaitingSwitchControl()
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1);
	}
}
exports.default = TsDecoratorWaitSwitchControl;

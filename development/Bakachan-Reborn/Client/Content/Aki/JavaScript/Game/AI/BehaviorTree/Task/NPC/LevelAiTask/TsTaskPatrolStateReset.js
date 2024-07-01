"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
	BehaviorTreeDefines_1 = require("../../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines"),
	BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskPatrolStateReset extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments), (this.SplineId = 0);
	}
	ReceiveExecuteAI(e, r) {
		var t,
			o = e.AiController;
		o
			? (BlackboardController_1.BlackboardController.GetStringValueByEntity(
					o.CharAiDesignComp.Entity.Id,
					BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreeStateName,
				)?.endsWith(this.SplineId.toString()) ||
					((t = BehaviorTreeDefines_1.BehaviorTreeDefines.GetPatrolStateName(
						this.SplineId,
					)),
					BlackboardController_1.BlackboardController.SetStringValueByEntity(
						o.CharAiDesignComp.Entity.Id,
						BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreeStateName,
						t,
					),
					BlackboardController_1.BlackboardController.RemoveValueByEntity(
						o.CharAiDesignComp.Entity.Id,
						BehaviorTreeDefines_1.BehaviorTreeDefines
							.PatrolFinishSegmentIndexName,
					)),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskPatrolStateReset;

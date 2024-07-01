"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSneakFail extends TsTaskAbortImmediatelyBase_1.default {
	ReceiveExecuteAI(e, t) {
		e.AiController
			? (ActorUtils_1.ActorUtils.GetEntityByActor(t)
					?.Entity?.GetComponent(185)
					?.TagContainer?.UpdateExactTag(3, -1951091619, 0),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskSneakFail;

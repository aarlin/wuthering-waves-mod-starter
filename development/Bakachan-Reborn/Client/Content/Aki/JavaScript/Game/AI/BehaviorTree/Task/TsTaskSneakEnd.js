"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSneakEnd extends TsTaskAbortImmediatelyBase_1.default {
	ReceiveExecuteAI(e, t) {
		e.AiController
			? ((t = ActorUtils_1.ActorUtils.GetEntityByActor(t)) &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SneakMonsterStop,
						t.Id,
					),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskSneakEnd;

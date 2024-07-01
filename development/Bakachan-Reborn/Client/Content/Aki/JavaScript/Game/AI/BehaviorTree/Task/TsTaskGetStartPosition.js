"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	START_POSITION_KEY = "StartPosition";
class TsTaskGetStartPosition extends TsTaskAbortImmediatelyBase_1.default {
	ReceiveExecuteAI(e, t) {
		var o, r;
		e instanceof TsAiController_1.default
			? ((r = (o = e.AiController.CharActorComp).Entity),
				o?.Valid
					? ((o = o.Entity.Id),
						(r = r.GetComponent(0).GetInitLocation()),
						BlackboardController_1.BlackboardController.SetVectorValueByEntity(
							o,
							"StartPosition",
							r.X,
							r.Y,
							r.Z,
						),
						this.FinishExecute(!0))
					: this.FinishExecute(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskGetStartPosition;

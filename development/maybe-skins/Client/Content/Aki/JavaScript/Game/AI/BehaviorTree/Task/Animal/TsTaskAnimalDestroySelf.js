"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../Core/Common/Log"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class TsTaskAnimalDestroySelf extends TsTaskAbortImmediatelyBase_1.default {
	ReceiveExecuteAI(e, r) {
		var o,
			t = e.AiController;
		t
			? ((o = (t = t.CharActorComp.Entity).GetComponent(38)) &&
					o.DisableAi("动物销毁"),
				(o = t.GetComponent(154)) && (o.PendingDestroy = !1),
				(o = t.GetComponent(0)),
				ControllerHolder_1.ControllerHolder.CreatureController.AnimalDestroyRequest(
					o.GetCreatureDataId(),
				),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskAnimalDestroySelf;

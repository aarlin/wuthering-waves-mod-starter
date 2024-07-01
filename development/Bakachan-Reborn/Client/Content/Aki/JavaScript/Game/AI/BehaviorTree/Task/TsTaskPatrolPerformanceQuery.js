"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPatrolPerformanceQuery extends TsTaskAbortImmediatelyBase_1.default {
	ReceiveExecuteAI(e, r) {
		var o, t, a;
		e instanceof TsAiController_1.default
			? (t = e.AiController?.AiPatrol) &&
				((a = (o = e.AiController.CharActorComp.Entity).GetComponent(17)),
				(o = o.GetComponent(185)),
				a) &&
				o
				? (a.ClearLastPerformanceTag(),
					(t = t.GetNextPerformanceTag())
						? a.AddPerformanceTag(t)
						: o.HasTag((a = -1645015979)) && o.RemoveTag(a),
					this.Finish(!0))
				: this.Finish(!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.Finish(!1));
	}
}
exports.default = TsTaskPatrolPerformanceQuery;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSetNowTime extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.BlackboardKey = ""),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKey = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKey = this.BlackboardKey));
	}
	ReceiveTickAI(e, r, a) {
		var o,
			t = e.AiController;
		t
			? (this.InitTsVariables(),
				this.TsBlackboardKey &&
					((t = t.CharActorComp.Entity.Id),
					(o = Time_1.Time.WorldTime),
					BlackboardController_1.BlackboardController.SetIntValueByEntity(
						t,
						this.TsBlackboardKey,
						o,
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
exports.default = TsTaskSetNowTime;

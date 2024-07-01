"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangePatrol extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.PatrolIndex = 0),
			(this.PatrolIdBlackboardKey = ""),
			(this.IsInitTsVariables = !1),
			(this.TsPatrolIndex = 0),
			(this.TsPatrolIdBlackboardKey = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsPatrolIndex = this.PatrolIndex),
			(this.TsPatrolIdBlackboardKey = this.PatrolIdBlackboardKey));
	}
	ReceiveExecuteAI(a, t) {
		this.InitTsVariables();
		var e,
			r = a.AiController;
		r
			? ((e = r.CharActorComp.Entity.Id),
				(r = r.AiPatrol),
				this.TsPatrolIdBlackboardKey
					? ((e =
							BlackboardController_1.BlackboardController.GetIntValueByEntity(
								e,
								this.TsPatrolIdBlackboardKey,
							)),
						r.ResetPatrolById(e))
					: r.ResetPatrol(this.TsPatrolIndex),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						a.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskChangePatrol;

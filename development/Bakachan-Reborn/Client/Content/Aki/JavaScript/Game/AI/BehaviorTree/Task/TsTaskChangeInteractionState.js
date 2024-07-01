"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeInteractionState extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.InteractionState = !0),
			(this.IsInitTsVariables = !1),
			(this.TsInteractionState = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsInteractionState = this.InteractionState));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables();
		var a,
			r = t.AiController;
		r
			? ((a = r.CharActorComp.Entity.GetComponent(178))
					? a.SetInteractionState(
							this.TsInteractionState,
							"TsTaskChangeInteractionState ReceiveExecuteAI",
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							30,
							"实体交互组件无效",
							[
								"CreatureDataId",
								r.CharActorComp.CreatureData.GetCreatureDataId(),
							],
							["PbDataId", r.CharActorComp.CreatureData.GetPbDataId()],
						),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskChangeInteractionState;

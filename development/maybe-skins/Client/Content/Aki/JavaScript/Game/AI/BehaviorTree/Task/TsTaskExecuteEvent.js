"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsTaskExecuteEvent extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.EventGroupId = 0),
			(this.IsInitTsVariables = !1),
			(this.TsEventGroupId = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsEventGroupId = this.EventGroupId));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables();
		var r = e.AiController;
		r
			? (0 < this.TsEventGroupId &&
					ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActions(
						this.TsEventGroupId,
						r.CharActorComp.Actor,
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
exports.default = TsTaskExecuteEvent;

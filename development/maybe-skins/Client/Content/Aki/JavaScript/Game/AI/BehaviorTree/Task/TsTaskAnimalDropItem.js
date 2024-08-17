"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsTaskAnimalDropItem extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.DoOnce = !0),
			(this.IsInitTsVariables = !1),
			(this.TsDoOnce = !0),
			(this.HasDone = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0), (this.TsDoOnce = this.DoOnce));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables();
		var s = e.AiController;
		s
			? (s = s.CharActorComp.Entity).GetComponent(38)
				? ((this.TsDoOnce && this.HasDone) ||
						((s = s.GetComponent(0).GetCreatureDataId()),
						ControllerHolder_1.ControllerHolder.CreatureController.AnimalDropItemRequest(
							Number(s),
						),
						(this.HasDone = !0)),
					this.FinishExecute(!0))
				: this.FinishExecute(!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskAnimalDropItem;

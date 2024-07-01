"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeMoveSpeed extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.MoveSpeed = 0),
			(this.ResetDefault = !1),
			(this.IsInitTsVariables = !1),
			(this.TsMoveSpeed = 0),
			(this.TsResetDefault = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMoveSpeed = this.MoveSpeed),
			(this.TsResetDefault = this.ResetDefault));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables();
		var s,
			a = e.AiController;
		a
			? ((a = a.CharActorComp) &&
					(a = ActorUtils_1.ActorUtils.GetEntityByActor(a.Actor)) &&
					(s = a.Entity.GetComponent(36)) &&
					(this.TsResetDefault
						? ((a = a.Entity.GetComponent(158).MoveState), s.ResetMaxSpeed(a))
						: (s.SetMaxSpeed(this.TsMoveSpeed), s.SetSpeedLock())),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskChangeMoveSpeed;

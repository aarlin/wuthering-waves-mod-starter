"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskDestroySelf extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.IsPause = !1),
			(this.IsInitTsVariables = !1),
			(this.TsIsPause = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0), (this.TsIsPause = this.IsPause));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables();
		const o = e.AiController;
		var r, s;
		o
			? ((r = o.CharActorComp),
				(s = o.CharActorComp.Entity.GetComponent(38)),
				this.TsIsPause
					? (s?.DisableAi("玩家主控权"),
						r.CreatureData.GetEntityType() ===
							Protocol_1.Aki.Protocol.HBs.Proto_Player &&
							TimerSystem_1.TimerSystem.Next((e) => {
								var t = o.CharActorComp,
									r = o.CharActorComp.Entity;
								r.GetComponent(38) &&
									(Global_1.Global.CharacterController.Possess(t.Actor),
									(t = r.GetComponent(161)) && t.StopMove(!1),
									(t = r.GetComponent(52)).ClearMoveVectorCache(),
									t.SetActive(!0));
							}))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 30, "已废弃的行为树任务节点", [
							"Type",
							e.GetClass().GetName(),
						]),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskDestroySelf;

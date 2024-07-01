"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	AnimalStateMachineComponent_1 = require("../../../../NewWorld/Character/Animal/Component/AnimalStateMachineComponent"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskSwitchAnimalState extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.State = 0),
			(this.ReceiveExecuteTime = -0),
			(this.WaitTime = -0);
	}
	ReceiveExecuteAI(e, t) {
		var i = e.AiController;
		i
			? (i = i.CharActorComp.Entity.GetComponent(14)).CurrentState() ===
				this.State
				? this.FinishExecute(!0)
				: (i.SwitchState(
						AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(
							this.State,
						),
					),
					(this.WaitTime = i.GetWaitTime()),
					(this.ReceiveExecuteTime = Time_1.Time.WorldTimeSeconds))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	ReceiveTickAI(e, t, i) {
		var o = e.AiController;
		o
			? this.ReceiveExecuteTime + this.WaitTime <
					Time_1.Time.WorldTimeSeconds &&
				(o.CharActorComp.Entity.GetComponent(14).SwitchState(
					AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(
						0,
					),
				),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	ReceiveAbortAI(e, t) {
		(e = e.AiController) &&
			e.CharActorComp?.Entity?.GetComponent(14)?.SwitchState(
				AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(0),
			),
			this.FinishAbort();
	}
}
exports.default = TsTaskSwitchAnimalState;

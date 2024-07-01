"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskInteractTarget extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.BlackboardKey = ""),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKey = ""),
			(this.EndTime = -0),
			(this.AnimComp = void 0),
			(this.OnMontageEnded = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKey = this.BlackboardKey));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables();
		var r,
			o = t.AiController;
		o
			? this.TsBlackboardKey &&
				(this.OnMontageEnded ||
					(this.OnMontageEnded = (t, e) => {
						this.EndTime = Time_1.Time.WorldTime;
					}),
				(this.EndTime = Time_1.Time.WorldTime),
				(r = o.CharActorComp.Entity.Id),
				(r = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
					r,
					this.TsBlackboardKey,
				))) &&
				(r = WorldFunctionLibrary_1.default.GetDynamicEntity(r))
				? ((this.AnimComp = o.CharActorComp.Entity.GetComponent(160)),
					this.ExecuteInteractTarget(r, o.CharActorComp))
				: this.FinishExecute(!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	ExecuteInteractTarget(t, e) {
		t = ActorUtils_1.ActorUtils.GetEntityByActor(t);
		var r = CharacterController_1.CharacterController.GetActorComponent(t);
		let o = r.ActorLocation,
			i = r.ActorRotation;
		(r = t.Entity.GetComponent(91)),
			r?.IsInit &&
				((t = r.GetInteractPosition()) && (o = t),
				(t = r.GetInteractRotator()) && (i = t),
				e.SetInputRotator(i),
				e.SetActorLocationAndRotation(
					o,
					i,
					"行为树节点.目标交互.强制切换目前",
					!1,
				));
	}
	ReceiveTickAI(t, e, r) {
		this.EndTime < Time_1.Time.WorldTime && this.Finish(!0);
	}
	OnClear() {
		(this.EndTime = 0),
			this.AnimComp &&
				(this.AnimComp.MainAnimInstance.OnMontageEnded.Remove(
					this.OnMontageEnded,
				),
				(this.AnimComp = void 0));
	}
}
exports.default = TsTaskInteractTarget;

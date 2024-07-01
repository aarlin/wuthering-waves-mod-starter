"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	BasePerformComponent_1 = require("../../../NewWorld/Character/Common/Component/BasePerformComponent"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPlayMontage extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.Montage = void 0),
			(this.MontagePath = ""),
			(this.LoopDuration = 0),
			(this.RepeatTimes = 0),
			(this.MaskInteract = !1),
			(this.IsInitTsVariables = !1),
			(this.TsMontage = ""),
			(this.TsMaskInteract = !1),
			(this.IsPlayLoop = !1),
			(this.LoopMontage = !1),
			(this.TsLoopDuration = 0),
			(this.TsRepeatTimes = 0),
			(this.InteractComponent = void 0),
			(this.HasAborted = !1),
			(this.PlayingMontageId = 0),
			(this.Entity = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMontage = this.Montage.ToAssetPathName()),
			"" === this.TsMontage && (this.TsMontage = this.MontagePath),
			(this.TsMaskInteract = this.MaskInteract),
			(this.TsLoopDuration = this.LoopDuration),
			(this.TsRepeatTimes = this.RepeatTimes));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables();
		var s,
			o = t.AiController;
		o
			? ((this.Entity = o.CharActorComp.Entity),
				"" === this.TsMontage
					? (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"BehaviorTree",
								30,
								"播放蒙太奇未配置",
								["ConfigID", this.Entity?.GetComponent(0)?.GetPbDataId()],
								["BehaviorTree", this.TreeAsset.GetName()],
							),
						this.FinishExecute(!0))
					: ((this.InteractComponent = this.Entity.GetComponent(178)),
						this.TsMaskInteract &&
							this.InteractComponent &&
							this.InteractComponent.SetInteractionState(
								!1,
								"TsTaskPlayMontage ReceiveExecuteAI",
							),
						(this.IsPlayLoop = 0 !== this.TsLoopDuration),
						(this.LoopMontage =
							-1 === this.TsLoopDuration || -1 === this.TsRepeatTimes),
						(o = this.Entity.GetComponent(37)),
						(s = new BasePerformComponent_1.PlayMontageConfig(
							this.RepeatTimes,
							this.LoopDuration,
							this.IsPlayLoop,
							this.LoopMontage,
						)),
						(this.PlayingMontageId = o.LoadAndPlayMontage(
							this.TsMontage,
							s,
							void 0,
							() => {
								this.HasAborted || this.FinishExecute(!0);
							},
							() => !this.HasAborted,
						)),
						this.PlayingMontageId < 0 && this.FinishExecute(!0)))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	OnAbort() {
		this.TsMaskInteract &&
			this.InteractComponent &&
			this.InteractComponent.SetInteractionState(
				!0,
				"TsTaskPlayMontage OnClear",
			),
			(this.InteractComponent = void 0),
			(this.HasAborted = !0),
			this.Entity?.GetComponent(37)?.ClearAndStopMontage(this.PlayingMontageId);
	}
}
exports.default = TsTaskPlayMontage;

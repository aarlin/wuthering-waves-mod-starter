"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskTurnAndPlayMontage = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BasePerformComponent_1 = require("../../../NewWorld/Character/Common/Component/BasePerformComponent"),
	LevelAiTask_1 = require("../LevelAiTask"),
	TURN_SPEED = 200,
	TOLERANCE = 10;
class LevelAiTaskTurnAndPlayMontage extends LevelAiTask_1.LevelAiTask {
	constructor() {
		super(...arguments),
			(this.Tae = void 0),
			(this.WTe = 0),
			(this.bTe = 0),
			(this.qTe = !1),
			(this.GTe = !1),
			(this.NTe = 0),
			(this.OTe = 0),
			(this.kTe = !1),
			(this.KTe = 0);
	}
	ExecuteTask() {
		return (this.KTe = 1), (this.NotifyTick = !0), 3;
	}
	TickTask(e) {
		switch (this.KTe) {
			case 1:
				this.QTe(), (this.KTe = 2);
				break;
			case 2:
				this.Tae.InputRotatorProxy.Equals(this.Tae.ActorRotationProxy, 10) &&
					((this.Tae.Entity.GetComponent(36).CharacterMovement.MovementMode =
						this.WTe),
					(this.KTe = 3));
				break;
			case 3:
				this.XTe(), (this.KTe = 4);
				break;
			case 4:
				break;
			default:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelAi",
						51,
						"[TurnToAndPlayMontage] 阶段切换出错",
						["CurPhase", this.KTe],
					);
		}
	}
	AbortTask() {
		return (
			this.KTe < 3
				? this.Tae?.ClearInput()
				: ((this.kTe = !0),
					this.CreatureDataComponent.Entity.GetComponent(
						37,
					).ClearAndStopMontage(this.bTe)),
			2
		);
	}
	OnTaskFinished(e) {
		(this.Tae = void 0), (this.WTe = 0);
	}
	QTe() {
		var e,
			t = this.Params;
		t
			? (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					t.EntityId,
				))
				? ((this.Tae = e.Entity.GetComponent(3)),
					(e = e.Entity.GetComponent(36)?.CharacterMovement)?.IsValid()
						? ((this.WTe = e.MovementMode),
							(e.MovementMode = 1),
							(e = Vector_1.Vector.Create(
								t.Pos.X ?? 0,
								t.Pos.Y ?? 0,
								t.Pos.Z ?? 0,
							)),
							AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
								this.Tae,
								e,
								200,
							))
						: this.FinishLatentTask(1))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("LevelAi", 30, "执行转向动作时实体不存在:", [
							"PbDataId",
							t.EntityId,
						]),
					this.FinishLatentTask(1))
			: this.FinishLatentTask(1);
	}
	XTe() {
		var e,
			t,
			i = this.Params;
		i
			? ((this.NTe = i.LoopDuration ?? 0),
				(this.OTe = i.RepeatTimes ?? 0),
				(this.qTe = void 0 !== this.NTe && 0 !== this.NTe),
				(this.GTe = -1 === this.NTe || -1 === this.OTe),
				(e = this.CreatureDataComponent.Entity.GetComponent(37)),
				(t = new BasePerformComponent_1.PlayMontageConfig(
					this.OTe,
					this.NTe,
					this.qTe,
					this.GTe,
				)),
				(i = { IsAbp: i.IsAbpMontage, MontageId: i.MontageId }),
				(this.kTe = !1),
				(this.bTe = e.LoadAndPlayMontageById(
					i,
					t,
					void 0,
					() => {
						this.kTe || this.FinishLatentTask(0);
					},
					() => !this.kTe,
				)),
				this.bTe < 0 && this.FinishLatentTask(0))
			: this.FinishLatentTask(1);
	}
}
exports.LevelAiTaskTurnAndPlayMontage = LevelAiTaskTurnAndPlayMontage;

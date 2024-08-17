"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStatePalsy = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	CameraController_1 = require("../../../Camera/CameraController"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterHitComponent_1 = require("../../../NewWorld/Character/Common/Component/CharacterHitComponent_New"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStatePalsy extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments), (this.wne = ""), (this.Bne = "");
	}
	OnActivate() {
		var e, t;
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 4, "TestOnActivate"),
			this.Bne &&
				(e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					this.Bne,
					UE.CounterAttackCameraData_C,
				)) &&
				(CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraModify(
					e.CameraData.Tag,
					e.CameraData.持续时间,
					e.CameraData.淡入时间,
					e.CameraData.淡出时间,
					e.CameraData.摄像机配置,
					void 0,
					e.CameraData.打断淡出时间,
					void 0,
					void 0,
					void 0,
					e.CameraData.CameraAttachSocket,
				),
				this.Node?.TimeScaleComponent?.SetTimeScale(
					e.VictimTimeScale.优先级,
					e.VictimTimeScale.时间膨胀值,
					e.VictimTimeScale.时间膨胀变化曲线,
					e.VictimTimeScale.时间膨胀时长,
					4,
				),
				(t = this.Node.AiController.AiHateList.GetCurrentTarget()) &&
					t.Entity.GetComponent(107).SetTimeScale(
						e.AttackerTimeScale.优先级,
						e.AttackerTimeScale.时间膨胀值,
						e.AttackerTimeScale.时间膨胀变化曲线,
						e.AttackerTimeScale.时间膨胀时长,
						4,
					),
				!e.CameraShake ||
					CameraController_1.CameraController.Model.IsModeEnabled(2) ||
					CameraController_1.CameraController.Model.IsModeEnabled(1) ||
					((t =
						ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
							4,
						).CameraActor.K2_GetActorLocation()),
					CameraController_1.CameraController.PlayWorldCameraShake(
						e.CameraShake,
						t,
						0,
						CharacterHitComponent_1.OUTER_RADIUS,
						1,
						!1,
					))),
			this.wne &&
				(e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					this.wne,
					UE.CounterAttackEffectData_C,
				)) &&
				(t = this.Node?.HitComponent?.LastHitData) &&
				this.Node?.HitComponent?.PlayCounterAttackEffect(
					t,
					e.EffectDA.AssetPathName?.toString(),
					e.Scale,
				);
	}
	OnDeactivate() {}
	OnInit(e) {
		return (
			(this.wne = e.BindPalsy.CounterAttackEffect),
			(this.Bne = e.BindPalsy.CounterAttackCamera),
			!0
		);
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineStatePalsy = AiStateMachineStatePalsy;

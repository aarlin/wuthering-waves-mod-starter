"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	RenderModuleController_1 = require("../../Manager/RenderModuleController"),
	WuYinQuBattleConfig_1 = require("../WuYinQuBattleConfig"),
	WuYinQuBattleNameDefines_1 = require("../WuYinQuBattleNameDefines"),
	WuYinQuBattleStateBase_1 = require("./WuYinQuBattleStateBase");
class WuYinQuBattleStateIdleToFighting extends WuYinQuBattleStateBase_1.default {
	constructor() {
		super(...arguments),
			(this.j3 = -0),
			(this.Jsr = void 0),
			(this.zsr = ResourceSystem_1.ResourceSystem.InvalidId);
	}
	OnEnter(e) {
		const t = this.Owner.GetKuroLevelSequenceActor();
		var i;
		t &&
		UE.KismetSystemLibrary.IsValid(t) &&
		UE.KismetSystemLibrary.IsValid(t.SequencePlayer)
			? ((this.Jsr = t?.GetSequence()),
				UE.KismetSystemLibrary.IsValid(this.Jsr)
					? (t.SetSequence(this.Jsr), this.Zsr())
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"RenderBattle",
								39,
								"进入Idle2Fighting的过度状态时没有Sequence资源，开始资源加载。",
								["WuYinQuBattleActor", this.Owner?.GetName()],
							),
						(i = t.LevelSequence.AssetPathName.toString()),
						(this.zsr = ResourceSystem_1.ResourceSystem.LoadAsync(
							i,
							UE.LevelSequence,
							(e) => {
								(this.zsr = ResourceSystem_1.ResourceSystem.InvalidId),
									UE.KismetSystemLibrary.IsValid(e)
										? ((this.Jsr = e), t.SetSequence(this.Jsr), this.Zsr())
										: Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"RenderBattle",
												39,
												"进入Idle2Fighting的过度状态时没有Sequence资源，资源加载失败。",
												["WuYinQuBattleActor", this.Owner?.GetName()],
											);
							},
						))))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderBattle",
					39,
					"进入Idle2Fighting的过度状态时没有SequencePlayer",
					["WuYinQuBattleActor", this.Owner?.GetName()],
				);
	}
	Zsr() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderBattle", 12, "进入Idle2Fighting的过度状态"),
			(this.Owner.当前状态 = "静止状态到战斗阶段1");
		var e = this.Owner.WuYinQuFightingData,
			t = this.Owner.K2_GetActorLocation(),
			i =
				(RenderModuleController_1.RenderModuleController.AddBattleReference(t),
				this.Owner.GetKuroLevelSequenceActor());
		i &&
			UE.KismetSystemLibrary.IsValid(i) &&
			UE.KismetSystemLibrary.IsValid(i.GetSequence()) &&
			UE.KismetSystemLibrary.IsValid(i.SequencePlayer) &&
			(i.SequencePlayer.IsPlaying() && i.SequencePlayer.Stop(),
			i.SequencePlayer.Play(),
			i.SequencePlayer.JumpToMarkedFrame(
				WuYinQuBattleConfig_1.default.MarkFightingStart1,
			)),
			e.IdleToFightingTransitionTime <= 0 ||
			!UE.KismetSystemLibrary.IsValid(e.IdleToFightingCurve)
				? this.StateMachine.Switch(1)
				: ((this.j3 = 0),
					(i = this.Owner.WuYinQuFightingData.GlobalMPC) &&
						(UE.KismetMaterialLibrary.SetVectorParameterValue(
							this.Owner.GetWorld(),
							i,
							WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
								.GlobalLandscapeCenterAndIntensity,
							new UE.LinearColor(t.X, t.Y, t.Z, 1),
						),
						UE.KismetMaterialLibrary.SetVectorParameterValue(
							this.Owner.GetWorld(),
							i,
							WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
								.GlobalLandscapeRadiusAndHardness,
							new UE.LinearColor(
								0,
								WuYinQuBattleConfig_1.default.LandscapeHardness,
								0,
								0,
							),
						)),
					i &&
						UE.KismetMaterialLibrary.SetScalarParameterValue(
							this.Owner.GetWorld(),
							i,
							WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
								.GlobalBlackStoneErosion,
							0,
						));
	}
	OnUpdate(e) {
		var t, i;
		this.j3 > this.Owner.WuYinQuFightingData.IdleToFightingTransitionTime
			? this.StateMachine.Switch(1)
			: ((this.j3 += e / 1e3),
				(e = MathUtils_1.MathUtils.Clamp(
					this.j3 / this.Owner.WuYinQuFightingData.IdleToFightingTransitionTime,
					0,
					1,
				)),
				(t = MathUtils_1.MathUtils.Clamp(
					this.Owner.WuYinQuFightingData.IdleToFightingCurve.GetFloatValue(e),
					0,
					1,
				)),
				(e =
					this.Owner.WuYinQuFightingData.LandscapeShowingRadiusCurve.GetFloatValue(
						e,
					)),
				(i = this.Owner.WuYinQuFightingData.GlobalMPC) &&
					UE.KismetMaterialLibrary.SetVectorParameterValue(
						this.Owner.GetWorld(),
						i,
						WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
							.GlobalLandscapeRadiusAndHardness,
						new UE.LinearColor(
							e,
							WuYinQuBattleConfig_1.default.LandscapeHardness,
							0,
							0,
						),
					),
				i &&
					UE.KismetMaterialLibrary.SetScalarParameterValue(
						this.Owner.GetWorld(),
						i,
						WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
							.GlobalBlackStoneErosion,
						t,
					));
	}
	OnExit(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderBattle", 12, "退出Idle2Fighting的过度状态"),
			(this.Jsr = void 0),
			this.zsr !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.zsr),
				(this.zsr = ResourceSystem_1.ResourceSystem.InvalidId),
				Log_1.Log.CheckError()) &&
				Log_1.Log.Error(
					"RenderBattle",
					39,
					"退出Idle2Fighting的过度状态时还在加载资源，取消资源加载",
				);
	}
}
exports.default = WuYinQuBattleStateIdleToFighting;

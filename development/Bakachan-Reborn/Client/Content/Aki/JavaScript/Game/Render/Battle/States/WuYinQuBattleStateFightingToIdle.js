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
class WuYinQuBattleStateFightingToIdle extends WuYinQuBattleStateBase_1.default {
	constructor() {
		super(...arguments),
			(this.j3 = -0),
			(this.Jsr = void 0),
			(this.zsr = ResourceSystem_1.ResourceSystem.InvalidId);
	}
	OnEnter(e) {
		const t = this.Owner.GetKuroLevelSequenceActor();
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
								"进入Fighting2Idle过度状态没有Sequence资源，开始资源加载。",
							),
						(this.zsr = ResourceSystem_1.ResourceSystem.LoadAsync(
							t.LevelSequence.AssetPathName.toString(),
							UE.LevelSequence,
							(e) => {
								(this.zsr = ResourceSystem_1.ResourceSystem.InvalidId),
									UE.KismetSystemLibrary.IsValid(e)
										? ((this.Jsr = e), t.SetSequence(this.Jsr), this.Zsr())
										: Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"RenderBattle",
												39,
												"进入Fighting2Idle过度状态没有Sequence资源，资源加载失败。",
												["WuYinQuBattleActor", this.Owner?.GetName()],
											);
							},
						))))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderBattle",
					39,
					"进入Fighting2Idle过度状态没有SequencePlayer",
					["WuYinQuBattleActor", this.Owner?.GetName()],
				);
	}
	Zsr() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderBattle", 12, "进入Fighting2Idle过度状态"),
			RenderModuleController_1.RenderModuleController.DecBattleReference(),
			(this.Owner.当前状态 = "战斗阶段到静止状态");
		var e = this.Owner.WuYinQuFightingData,
			t = this.Owner.GetKuroLevelSequenceActor();
		t &&
			UE.KismetSystemLibrary.IsValid(t) &&
			UE.KismetSystemLibrary.IsValid(t.GetSequence()) &&
			UE.KismetSystemLibrary.IsValid(t.SequencePlayer) &&
			(t.SequencePlayer.Play(),
			t.SequencePlayer.JumpToMarkedFrame(
				WuYinQuBattleConfig_1.default.MarkFightingOverStart,
			)),
			e.FightingToIdleTransitionTime <= 0 ||
			!UE.KismetSystemLibrary.IsValid(e.FightingToIdleCurve)
				? this.StateMachine.Switch(0)
				: (this.j3 = 0);
	}
	OnUpdate(e) {
		var t, i, r;
		this.j3 > this.Owner.WuYinQuFightingData.FightingToIdleTransitionTime
			? this.StateMachine.Switch(0)
			: ((this.j3 += e / 1e3),
				(e = MathUtils_1.MathUtils.Clamp(
					this.j3 / this.Owner.WuYinQuFightingData.FightingToIdleTransitionTime,
					0,
					1,
				)),
				(t = MathUtils_1.MathUtils.Clamp(
					this.Owner.WuYinQuFightingData.FightingToIdleCurve.GetFloatValue(e),
					0,
					1,
				)),
				(i = this.Owner.WuYinQuFightingData.GlobalMPC) &&
					((e =
						this.Owner.WuYinQuFightingData.LandscapeFadingRadiusCurve.GetFloatValue(
							e,
						)),
					(r = this.Owner.K2_GetActorLocation()),
					UE.KismetMaterialLibrary.SetVectorParameterValue(
						this.Owner.GetWorld(),
						i,
						WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
							.GlobalLandscapeCenterAndIntensity,
						new UE.LinearColor(r.X, r.Y, r.Z, 1),
					),
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
					)),
				i &&
					UE.KismetMaterialLibrary.SetScalarParameterValue(
						this.Owner.GetWorld(),
						i,
						WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
							.GlobalBlackStoneErosion,
						1 - t,
					));
	}
	OnExit(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderBattle", 12, "退出Fighting2Idle过度状态");
		var t,
			i = this.Owner.WuYinQuFightingData.GlobalMPC;
		i &&
			((t = this.Owner.K2_GetActorLocation()),
			UE.KismetMaterialLibrary.SetVectorParameterValue(
				this.Owner.GetWorld(),
				i,
				WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
					.GlobalLandscapeCenterAndIntensity,
				new UE.LinearColor(t.X, t.Y, t.Z, 0),
			)),
			(this.Jsr = void 0),
			this.zsr !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.zsr),
				(this.zsr = ResourceSystem_1.ResourceSystem.InvalidId),
				Log_1.Log.CheckError()) &&
				Log_1.Log.Error(
					"RenderBattle",
					39,
					"退出Fighting2Idle过度状态时还在加载资源，取消资源加载",
				);
	}
}
exports.default = WuYinQuBattleStateFightingToIdle;

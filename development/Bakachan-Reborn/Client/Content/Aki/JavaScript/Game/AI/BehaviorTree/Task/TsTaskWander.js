"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	NONE_PATH = "None",
	BLINK_STATE = 3,
	SKILL_STATE = 4;
class TsTaskWander extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.RandomRadius = 0),
			(this.MinWanderDistance = 0),
			(this.MaxNavigationMillisecond = 0),
			(this.MoveStateForWanderOrReset = !0),
			(this.MaxStopTime = 0),
			(this.BlinkTime = 0),
			(this.UsePatrolPointPriority = !0),
			(this.ShowEffectDa = void 0),
			(this.HideEffectDa = void 0),
			(this.ShowMaterialDa = void 0),
			(this.HideMaterialDa = void 0),
			(this.Debug = !1),
			(this.SelectedTargetLocation = void 0),
			(this.FoundPath = !1),
			(this.NavigationPath = void 0),
			(this.CurrentNavigationIndex = 0),
			(this.NavigationEndTime = -0),
			(this.InBlink = !1),
			(this.StopTimeCount = 0),
			(this.BlinkTimeCount = 0),
			(this.PreLocation = void 0),
			(this.ShowMaterialData = void 0),
			(this.HideMaterialData = void 0),
			(this.MoveStateActural = 0),
			(this.IsInitTsVariables = !1),
			(this.TsRandomRadius = 0),
			(this.TsMinWanderDistance = 0),
			(this.TsMaxNavigationMillisecond = 0),
			(this.TsMoveStateForWanderOrReset = !1),
			(this.TsMaxStopTime = 0),
			(this.TsBlinkTime = 0),
			(this.TsUsePatrolPointPriority = !1),
			(this.TsShowEffectDa = ""),
			(this.TsHideEffectDa = ""),
			(this.TsShowMaterialDa = ""),
			(this.TsHideMaterialDa = ""),
			(this.TsDebug = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsRandomRadius = this.RandomRadius),
			(this.TsMinWanderDistance = this.MinWanderDistance),
			(this.TsMaxNavigationMillisecond = this.MaxNavigationMillisecond),
			(this.TsMoveStateForWanderOrReset = this.MoveStateForWanderOrReset),
			(this.TsMaxStopTime = this.MaxStopTime),
			(this.TsBlinkTime = this.BlinkTime),
			(this.TsUsePatrolPointPriority = this.UsePatrolPointPriority),
			(this.TsShowEffectDa = this.ShowEffectDa
				? this.ShowEffectDa.AssetPathName.toString()
				: ""),
			(this.TsShowEffectDa =
				"None" === this.TsShowEffectDa ? "" : this.TsShowEffectDa),
			(this.TsHideEffectDa = this.HideEffectDa
				? this.HideEffectDa.AssetPathName.toString()
				: ""),
			(this.TsHideEffectDa =
				"None" === this.TsHideEffectDa ? "" : this.TsHideEffectDa),
			(this.TsShowMaterialDa = this.ShowMaterialDa
				? this.ShowMaterialDa.AssetPathName.toString()
				: "None"),
			(this.TsHideMaterialDa = this.HideMaterialDa
				? this.HideMaterialDa.AssetPathName.toString()
				: "None"),
			(this.TsDebug = this.Debug));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables();
		var i = t.AiController;
		if (i) {
			var a,
				o = i.AiWanderInfos?.AiWander,
				r =
					(o
						? ((this.MoveStateActural = this.TsMoveStateForWanderOrReset
								? o.WanderMoveState
								: o.ResetMoveState),
							(this.TsShowEffectDa = o.ShowEffectDaPath),
							(this.TsHideEffectDa = o.HideEffectDaPath),
							(this.TsShowMaterialDa = o.ShowMaterialDaPath),
							(this.TsHideMaterialDa = o.HideMaterialDaPath))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("BehaviorTree", 6, "没有配置AiWander", [
									"AiBaseId",
									i.AiBase.Id,
								]),
							(this.MoveStateActural = 2)),
					i.AiWanderRadiusConfig &&
						((this.TsRandomRadius = i.AiWanderRadiusConfig.RandomRadius),
						(this.TsMinWanderDistance =
							i.AiWanderRadiusConfig.MinWanderDistance)),
					i.CharActorComp),
				s = Vector_1.Vector.Create();
			switch (
				(this.TsUsePatrolPointPriority &&
				i.AiPatrol.HasPatrolConfig() &&
				(a = i.AiPatrol.GetLastPatrolPoint())
					? s.DeepCopy(a)
					: s.DeepCopy(i.CharActorComp.GetInitLocation()),
				this.FindNavPoint(t, s, r),
				this.CheckPreLocationDistance(r, 0),
				this.MoveStateActural)
			) {
				case 1:
				case 2:
					if (
						(this.NavigationPath || (this.NavigationPath = new Array()),
						(this.FoundPath =
							AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
								t,
								r.ActorLocation,
								this.SelectedTargetLocation,
								this.NavigationPath,
							)),
						!this.FoundPath)
					) {
						if (this.TsMoveStateForWanderOrReset) return void this.Finish(!1);
						if (this.BlinkMoveBegin(r, !0))
							return void (
								Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("BehaviorTree", 58, "AiWander怪物复位寻路失败", [
									"Type",
									t.GetClass().GetName(),
								])
							);
					}
					(this.CurrentNavigationIndex = 1),
						(this.NavigationEndTime =
							Time_1.Time.WorldTime + this.TsMaxNavigationMillisecond);
					var n = r.Entity.CheckGetComponent(89);
					if (n.Valid)
						switch (this.MoveStateActural) {
							case 1:
								n.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
								);
								break;
							case 2:
								n.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
						}
					break;
				case 3:
					this.BlinkMoveBegin(r);
					break;
				case 4:
					this.UseSkill(r, o);
			}
			this.SetAiSceneEnable(i, !1);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				(this.FoundPath = !1);
	}
	FindNavPoint(t, e, i) {
		let a = 5;
		for (; 0 < a; --a) {
			var o = (0, puerts_1.$ref)(this.SelectedTargetLocation),
				r = UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(
					t,
					e.ToUeVector(),
					o,
					this.TsRandomRadius,
				);
			if (
				((this.SelectedTargetLocation = (0, puerts_1.$unref)(o)),
				r &&
					UE.Vector.DistSquared(this.SelectedTargetLocation, i.ActorLocation) >
						this.TsMinWanderDistance * this.TsMinWanderDistance)
			)
				break;
		}
		let s = !1;
		(s =
			UE.Vector.DistSquared(this.SelectedTargetLocation, i.ActorLocation) <=
				this.TsRandomRadius * this.TsRandomRadius || s) ||
			((this.FoundPath = !1),
			(this.NavigationPath = void 0),
			Vector_1.Vector.VectorCopy(e, this.SelectedTargetLocation));
	}
	SetAiSceneEnable(t, e) {
		this.TsMoveStateForWanderOrReset || t.AiPerception.SetAllAiSenseEnable(e);
	}
	ReceiveTickAI(t, e, i) {
		var a,
			o,
			r,
			s = t.AiController;
		s
			? this.FoundPath || this.InBlink
				? ((a = s.CharActorComp),
					this.TsDebug && this.DrawDebugPath(a),
					this.InBlink
						? this.BlinkMoveTick(a, i)
						: (!this.TsMoveStateForWanderOrReset &&
								Time_1.Time.WorldTime > this.NavigationEndTime &&
								(Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"BehaviorTree",
										58,
										"AiWander怪物复位超时，瞬移回目标点",
										["Type", t.GetClass().GetName()],
									),
								this.BlinkMoveBegin(a, !0))) ||
							((o = Vector_1.Vector.Create(
								this.NavigationPath[this.CurrentNavigationIndex],
							)).Subtraction(a.ActorLocationProxy, o),
							(o.Z = 0),
							(r = o.Size()) <= s.AiWanderInfos.AiWander.CompleteDistance &&
							(this.CurrentNavigationIndex++,
							this.CurrentNavigationIndex === this.NavigationPath.length)
								? this.Finish(!0)
								: ((o.Z = 0),
									(o.X /= r),
									(o.Y /= r),
									a.SetInputDirect(o),
									AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
										a,
										o,
										s.AiWanderInfos.AiWander.TurnSpeed,
									),
									this.TsMoveStateForWanderOrReset ||
										this.CheckPreLocationDistance(a, i) ||
										(Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"BehaviorTree",
												58,
												"AiWander怪物游荡卡住超时，瞬移回目标点",
												["Type", t.GetClass().GetName()],
											),
										this.BlinkMoveBegin(a, !0)))))
				: this.Finish(!1)
			: this.FinishExecute(!1);
	}
	OnClear() {
		var t;
		this.AIOwner instanceof TsAiController_1.default &&
			(AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
			this.SetAiSceneEnable(this.AIOwner.AiController, !0),
			this.InBlink &&
				(this.AIOwner.AiController.CharActorComp.Actor.SetActorEnableCollision(
					!0,
				),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"BehaviorTree",
					58,
					"AiWander[OnClear]怪物闪烁导致Actor碰撞为True",
					["Actor:", this.AIOwner.AiController.CharActorComp.Actor.GetName()],
				),
			this.HideMaterialData &&
				0 <= this.HideMaterialData &&
				(this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(
					this.HideMaterialData,
				),
				this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.ResetAllRenderingState()),
			this.ShowMaterialData &&
				0 <= this.ShowMaterialData &&
				(this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(
					this.ShowMaterialData,
				),
				this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.ResetAllRenderingState()),
			this.TsMoveStateForWanderOrReset ||
				((t = this.AIOwner.AiController.CharActorComp.Entity),
				EventSystem_1.EventSystem.EmitWithTarget(
					t,
					EventDefine_1.EEventName.AiTaskWanderForResetEnd,
				))),
			(this.NavigationPath = void 0),
			(this.FoundPath = !1),
			(this.InBlink = !1),
			(this.BlinkTimeCount = 0),
			(this.StopTimeCount = 0),
			(this.HideMaterialData = void 0),
			(this.ShowMaterialData = void 0);
	}
	CheckPreLocationDistance(t, e) {
		var i;
		return this.PreLocation
			? ((i = t.ActorLocationProxy),
				Vector_1.Vector.DistSquared(this.PreLocation, i) <
				MathUtils_1.MathUtils.MillisecondToSecond
					? (this.StopTimeCount += e)
					: (this.StopTimeCount = 0),
				this.PreLocation.DeepCopy(i),
				!(this.StopTimeCount > this.TsMaxStopTime))
			: ((this.PreLocation = Vector_1.Vector.Create(t.ActorLocation)),
				!(this.StopTimeCount = 0));
	}
	BlinkMoveBegin(t, e = !1) {
		return !(
			(3 !== this.MoveStateActural && !e) ||
			(e && (this.MoveStateActural = 3),
			(this.InBlink = !0),
			(this.BlinkTimeCount = 0),
			(this.ShowMaterialData = void 0),
			(this.HideMaterialData = void 0),
			t.Actor.SetActorEnableCollision(!1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"BehaviorTree",
					58,
					"AiWander[BlinkMoveBegin]怪物闪烁导致Actor碰撞为False",
					["Actor:", t.Actor.GetName()],
				),
			"" !== this.TsHideEffectDa &&
				((e = EffectSystem_1.EffectSystem.SpawnEffect(
					GlobalData_1.GlobalData.World,
					MathUtils_1.MathUtils.DefaultTransform,
					this.TsHideEffectDa,
					"[TsTaskWander.BlinkMoveBegin] hideEffect",
					new EffectContext_1.EffectContext(t.Entity.Id),
				)),
				(e = EffectSystem_1.EffectSystem.GetEffectActor(e))
					? e.K2_SetActorLocation(t.ActorLocation, !1, void 0, !1)
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("BehaviorTree", 58, "AiWander瞬移隐藏特效生成失败", [
							"Type",
							t.Actor.GetName(),
						])),
			"" !== this.TsHideMaterialDa
				? ResourceSystem_1.ResourceSystem.LoadAsync(
						this.TsHideMaterialDa,
						UE.PD_CharacterControllerData_C,
						(e) => {
							e
								? (this.HideMaterialData =
										t.Actor.CharRenderingComponent.AddMaterialControllerData(e))
								: ((this.HideMaterialData = 0),
									Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"BehaviorTree",
											58,
											"AiWander瞬移隐藏材质生成失败",
											["Type", t.Actor.GetName()],
										));
						},
					)
				: (this.HideMaterialData = -1),
			0)
		);
	}
	BlinkMoveTick(t, e) {
		(this.BlinkTimeCount += e),
			this.BlinkTimeCount >= this.TsBlinkTime - 1 &&
				void 0 === this.ShowMaterialData &&
				(t.SetActorLocation(
					this.SelectedTargetLocation,
					"脱战节点.执行瞬移重置位置",
					!1,
				),
				t.FixBornLocation("脱战节点.修正角色地面位置", !0, void 0, !1),
				t.Actor.SetActorEnableCollision(!0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"BehaviorTree",
						58,
						"AiWander[BlinkMoveTick]怪物闪烁导致Actor碰撞为True",
						["Actor:", t.Actor.GetName()],
					),
				this.ResetAiInfo(t),
				"" !== this.TsShowEffectDa &&
					((e = EffectSystem_1.EffectSystem.SpawnEffect(
						GlobalData_1.GlobalData.World,
						MathUtils_1.MathUtils.DefaultTransform,
						this.TsShowEffectDa,
						"[TsTaskWander.BlinkMoveTick] showEffect",
						new EffectContext_1.EffectContext(t.Entity.Id),
					)),
					(e = EffectSystem_1.EffectSystem.GetEffectActor(e))
						? e.K2_SetActorLocation(t.ActorLocation, !1, void 0, !1)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"BehaviorTree",
								58,
								"AiWander瞬移显示特效生成失败",
								["Type", t.Actor.GetName()],
							)),
				this.HideMaterialData &&
					0 <= this.HideMaterialData &&
					(t.Actor.CharRenderingComponent.RemoveMaterialControllerData(
						this.HideMaterialData,
					),
					(this.HideMaterialData = void 0)),
				"" !== this.TsShowMaterialDa
					? ResourceSystem_1.ResourceSystem.LoadAsync(
							this.TsShowMaterialDa,
							UE.PD_CharacterControllerData_C,
							(e) => {
								e
									? (this.ShowMaterialData =
											t.Actor.CharRenderingComponent.AddMaterialControllerData(
												e,
											))
									: ((this.ShowMaterialData = -1),
										Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"BehaviorTree",
												58,
												"AiWander瞬移显示材质生成失败",
												["Type", t.Actor.GetName()],
											));
							},
						)
					: (this.ShowMaterialData = -1),
				t.SetInputDirect(Vector_1.Vector.ZeroVector)),
			this.BlinkTimeCount >= this.TsBlinkTime && this.BlinkMoveEnd(t);
	}
	BlinkMoveEnd(t) {
		return (
			!!this.InBlink &&
			((this.InBlink = !1),
			t.Actor.bActorEnableCollision ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						58,
						"AiWander[BlinkMoveEnd]怪物闪烁此刻Actor碰撞不应该为False,查看[BlinkMoveTick]是否置为True",
						["Actor:", t.Actor.GetName()],
					)),
			this.ShowMaterialData &&
				0 <= this.ShowMaterialData &&
				(t.Actor.CharRenderingComponent.RemoveMaterialControllerData(
					this.ShowMaterialData,
				),
				(this.ShowMaterialData = void 0)),
			t.Actor.CharRenderingComponent.ResetAllRenderingState(),
			this.Finish(!0),
			!0)
		);
	}
	UseSkill(t, e) {
		(t = t.Entity.GetComponent(33)).Valid
			? ((t = t.BeginSkill(e.MoveStateGA, {
					Context: "TsTaskWander.UseSkill",
				})),
				this.Finish(t))
			: this.Finish(!1);
	}
	ResetAiInfo(t) {
		var e = t.Entity.GetComponent(0)?.GetRotation();
		t.SetActorRotation(e, "脱战节点.重置为基础方法", !1);
	}
	DrawDebugPath(t) {
		var e = this.NavigationPath.length;
		if (0 !== e) {
			let i = 0;
			UE.KismetSystemLibrary.DrawDebugSphere(
				t.Actor,
				this.SelectedTargetLocation,
				40,
				10,
				ColorUtils_1.ColorUtils.LinearGreen,
				0,
				2,
			),
				UE.KismetSystemLibrary.DrawDebugLine(
					t.Actor,
					t.ActorLocation,
					this.SelectedTargetLocation,
					ColorUtils_1.ColorUtils.LinearGreen,
					0,
					2,
				);
			for (const a of this.NavigationPath)
				UE.KismetSystemLibrary.DrawDebugSphere(
					t.Actor,
					a.ToUeVector(),
					30,
					10,
					ColorUtils_1.ColorUtils.LinearRed,
					0,
					2,
				),
					++i < e &&
						UE.KismetSystemLibrary.DrawDebugLine(
							t.Actor,
							a.ToUeVector(),
							this.NavigationPath[i].ToUeVector(),
							ColorUtils_1.ColorUtils.LinearRed,
							0,
							2,
						);
		}
	}
}
exports.default = TsTaskWander;

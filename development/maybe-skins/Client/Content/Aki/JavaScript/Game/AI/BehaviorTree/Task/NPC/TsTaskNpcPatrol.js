"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
	CharacterUnifiedStateTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	ColorUtils_1 = require("../../../../Utils/ColorUtils"),
	AiPatrolController_1 = require("../../../Controller/AiPatrolController"),
	TsAiController_1 = require("../../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	PROFILE_KEY = "TsTaskNpcPatrol_GetObstacleLocation",
	CHECK_RAYCAST_INTERVAL = 0.5,
	DEBUG_CONFIG_ID = [109002526, 109002530];
class TsTaskNpcPatrol extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.DebugMode = !1),
			(this.MoveState = 0),
			(this.MoveOnePath = !1),
			(this.UseSimpleMove = !1),
			(this.RaycastLength = 0),
			(this.ChangeMoveTime = 0),
			(this.ChangeMoveAngle = 0),
			(this.MaxChangeAngle = 0),
			(this.ChangeMoveDistance = 0),
			(this.Entity = void 0),
			(this.ActorComp = void 0),
			(this.MoveComp = void 0),
			(this.StateComp = void 0),
			(this.AnimComp = void 0),
			(this.AiComp = void 0),
			(this.CacheCrossVector = void 0),
			(this.CacheVector = void 0),
			(this.SingleMoveForward = void 0),
			(this.CurTime = -0),
			(this.ChangeMoveTimeInternal = -0),
			(this.TraceElement = void 0),
			(this.IsInit = !1),
			(this.IsPause = !1),
			(this.ForceExit = !1),
			(this.EntityConfigId = 0),
			(this.IsDebugEntity = !1),
			(this.DebugComp = void 0),
			(this.PatrolLogic = void 0),
			(this.PatrolConfig = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsDebugMode = !1),
			(this.TsMoveState = 0),
			(this.TsMoveOnePath = !1),
			(this.TsUseSimpleMove = !1),
			(this.TsRaycastLength = 0),
			(this.TsChangeMoveTime = -0),
			(this.TsChangeMoveAngle = 0),
			(this.TsMaxChangeAngle = 0),
			(this.TsChangeMoveDistance = 0),
			(this.HandleMoveEnd = void 0),
			(this.ChangeStateHandle = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsDebugMode = this.DebugMode),
			(this.TsMoveState = this.MoveState),
			(this.TsMoveOnePath = this.MoveOnePath),
			(this.TsUseSimpleMove = this.UseSimpleMove),
			(this.TsRaycastLength = this.RaycastLength),
			(this.TsChangeMoveTime = this.ChangeMoveTime),
			(this.TsChangeMoveAngle = this.ChangeMoveAngle),
			(this.TsMaxChangeAngle = this.MaxChangeAngle),
			(this.TsChangeMoveDistance = this.ChangeMoveDistance));
	}
	ReceiveExecuteAI(t, e) {
		var o;
		this.InitTsVariables(),
			t instanceof TsAiController_1.default
				? ((o = t.AiController),
					(this.PatrolLogic = o.AiPatrol),
					(this.PatrolConfig = this.PatrolLogic.GetConfig()),
					this.PatrolConfig
						? ((this.ActorComp = o.CharActorComp),
							GlobalData_1.GlobalData.IsPlayInEditor &&
								(this.DebugComp =
									this.ActorComp.Actor.TsCharacterDebugComponent),
							(this.Entity = o.CharAiDesignComp.Entity),
							this.InitBaseInfo(),
							this.InitTraceElement(),
							AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"AI",
									43,
									"NPC开始巡逻",
									["Id", this.EntityConfigId],
									["IsLogicAutonomousProxy", this.ActorComp.IsAutonomousProxy],
									[
										"IsMoveAutonomousProxy",
										this.ActorComp.IsMoveAutonomousProxy,
									],
								),
							this.HandleMoveEnd ||
								(this.HandleMoveEnd = (t) => {
									this.ExecuteMoveEnd(t);
								}),
							this.PatrolLogic.GeneratePatrol(!1),
							this.InitPatrolInfo())
						: this.Finish(!1))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
							"Type",
							t.GetClass().GetName(),
						]),
					this.Finish(!1));
	}
	InitBaseInfo() {
		this.CacheVector ||
			((this.CacheCrossVector = Vector_1.Vector.Create()),
			(this.CacheVector = Vector_1.Vector.Create()),
			(this.SingleMoveForward = Vector_1.Vector.Create())),
			(this.MoveComp = this.Entity.GetComponent(36)),
			(this.StateComp = this.Entity.GetComponent(158)),
			(this.AnimComp = this.Entity.GetComponent(160)),
			(this.AiComp = this.Entity.GetComponent(38)),
			(this.CurTime = 0),
			(this.IsInit = !1),
			(this.IsPause = !1),
			(this.ForceExit = !1),
			(this.EntityConfigId = this.ActorComp.CreatureData.GetPbDataId()),
			(this.IsDebugEntity = DEBUG_CONFIG_ID.includes(this.EntityConfigId)),
			this.DebugComp && this.DebugComp.ClearDebugPatrolPoints(),
			this.IsDebugEntity &&
				AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode &&
				((this.ChangeStateHandle = (t, e) => {
					this.HandleChangedState(t, e);
				}),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.ChangeStateHandle,
				));
	}
	HandleChangedState(t, e) {
		this.IsInit &&
			(e === CharacterUnifiedStateTypes_1.ECharMoveState.Other
				? (this.ForceExit = !0)
				: this.AiComp.AiController.AiPatrol.CheckMoveStateChanged(
						this.StateComp,
						this.TsMoveState,
					) &&
					TimerSystem_1.TimerSystem.Next(() => {
						var t = this.AiComp?.AiController?.AiPatrol;
						t && t.ChangeMoveState(this.StateComp, this.TsMoveState);
					}));
	}
	InitTraceElement() {
		this.TraceElement ||
			((this.TraceElement = UE.NewObject(UE.TraceBoxElement.StaticClass())),
			(this.TraceElement.bIsSingle = !0),
			(this.TraceElement.bIgnoreSelf = !0),
			this.TraceElement.SetBoxHalfSize(
				this.TsRaycastLength / 2,
				20,
				this.ActorComp.HalfHeight / 2,
			),
			(this.TraceElement.DrawTime = 0.5),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				this.TraceElement,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				this.TraceElement,
				ColorUtils_1.ColorUtils.LinearRed,
			),
			this.TraceElement.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.Pawn,
			),
			this.TraceElement.SetDrawDebugTrace(this.TsDebugMode ? 2 : 0)),
			(this.TraceElement.WorldContextObject = this.ActorComp.Owner);
	}
	InitPatrolInfo() {
		var t = this.ActorComp.ActorLocationProxy,
			e = this.ActorComp.CreatureData;
		this.PatrolLogic.StartPatrol(!1, void 0),
			e.SetPosAbnormal(!1),
			this.PatrolLogic.ResetBaseInfoByMainPoint(
				this.MoveComp,
				this.StateComp,
				this.TsMoveState,
			),
			this.TsDebugMode &&
				this.DebugComp &&
				this.DebugComp.SaveDebugPatrolPoint(t),
			this.MoveToPatrolPoint(),
			(this.IsInit = !0);
	}
	MoveToPatrolPoint() {
		var t = this.PatrolLogic.PatrolPoint;
		t
			? (this.CacheVector.FromUeVector(t.Point),
				this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy),
				this.CacheVector.Normalize(),
				this.SingleMoveForward.FromUeVector(this.CacheVector),
				(t = {
					Points: [
						{ Index: 0, Position: t.Point, MoveState: this.TsMoveState },
					],
					Navigation: !0,
					IsFly: this.PatrolConfig.ContainZ,
					DebugMode: this.TsDebugMode,
					Loop: !1,
					Callback: this.HandleMoveEnd,
					ReturnFalseWhenNavigationFailed: !1,
				}),
				this.MoveComp.MoveAlongPath(t))
			: this.Finish(!1);
	}
	ExecuteMoveEnd(t) {
		var e;
		1 === t
			? ((e = this.PatrolLogic.PatrolPoint),
				this.CheckMoveEnd(e)
					? (this.PatrolLogic.PatrolFinish(), this.Finish(!0))
					: e !== this.PatrolLogic.PatrolPoint &&
						((e = this.PatrolLogic.PatrolPoint)
							? (e.IsMain &&
									this.PatrolLogic.ResetBaseInfoByMainPoint(
										this.MoveComp,
										this.StateComp,
										this.TsMoveState,
									),
								this.MoveToPatrolPoint())
							: this.Finish(!0)))
			: 2 === t
				? this.Finish(!1)
				: 3 === t && this.PatrolError();
	}
	ReceiveTickAI(t, e, o) {
		this.ForceExit
			? this.Finish(!1)
			: this.IsPause ||
				(0 < this.ChangeMoveTimeInternal &&
					((this.ChangeMoveTimeInternal -= o),
					this.ChangeMoveTimeInternal < 0) &&
					this.MoveToPatrolPoint(),
				(this.CurTime += o),
				this.CurTime > 0.5 && ((this.CurTime = 0), this.ExecuteObstacle()));
	}
	ExecuteObstacle() {
		var t;
		this.IsDebugEntity &&
			AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode &&
			this.DebugComp &&
			this.DebugComp.SaveDebugPatrolPoint(this.ActorComp.ActorLocationProxy),
			this.GetObstacleLocation() &&
				((t = this.MoveComp.MoveToLocationLogic.CurrentToLocation),
				(t = this.CalculateAmendForward(t)),
				Math.abs(
					MathUtils_1.MathUtils.GetAngleByVectorDot(this.SingleMoveForward, t),
				) > this.TsMaxChangeAngle || this.CalculateAmendMovePoint(t));
	}
	CalculateAmendForward(t) {
		return (
			this.CacheVector.FromUeVector(t),
			this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy),
			(this.CacheVector.Z = 0),
			this.CacheVector.Normalize(),
			Vector_1.Vector.CrossProduct(
				this.ActorComp.ActorForwardProxy,
				this.CacheVector,
				this.CacheCrossVector,
			),
			this.CacheVector.FromUeVector(this.ActorComp.ActorForwardProxy),
			0 < this.CacheCrossVector.Z
				? this.CacheVector.RotateAngleAxis(
						-this.TsChangeMoveAngle,
						Vector_1.Vector.UpVectorProxy,
						this.CacheVector,
					)
				: this.CacheVector.RotateAngleAxis(
						this.TsChangeMoveAngle,
						Vector_1.Vector.UpVectorProxy,
						this.CacheVector,
					),
			this.CacheVector
		);
	}
	CalculateAmendMovePoint(t) {
		this.CacheVector.FromUeVector(t),
			this.CacheVector.MultiplyEqual(this.TsChangeMoveDistance),
			this.CacheVector.AdditionEqual(this.ActorComp.ActorLocationProxy),
			(t = {
				Points: [
					{ Index: 0, Position: this.CacheVector, MoveState: this.TsMoveState },
				],
				Navigation: !0,
				IsFly: this.PatrolConfig.ContainZ,
				DebugMode: this.TsDebugMode,
				Loop: !1,
				Callback: this.HandleMoveEnd,
				ReturnFalseWhenNavigationFailed: !1,
			}),
			this.MoveComp.MoveAlongPath(t),
			(this.ChangeMoveTimeInternal = this.TsChangeMoveTime);
	}
	GetObstacleLocation() {
		this.CacheVector.FromUeVector(this.ActorComp.ActorForwardProxy),
			this.CacheVector.MultiplyEqual(this.TraceElement.HalfSizeX),
			this.CacheVector.AdditionEqual(this.ActorComp.ActorLocationProxy),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.TraceElement,
				this.CacheVector,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.TraceElement,
				this.CacheVector,
			),
			TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
				this.TraceElement,
				this.ActorComp.ActorRotationProxy,
			);
		var t = TraceElementCommon_1.TraceElementCommon.BoxTrace(
				this.TraceElement,
				PROFILE_KEY,
			),
			e = this.TraceElement.HitResult;
		return !(
			!t ||
			!e.bBlockingHit ||
			(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
				e,
				0,
				this.CacheVector,
			),
			this.IsDebugEntity &&
				AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Level",
					43,
					"NPC巡逻，碰撞到实体",
					["Id", this.EntityConfigId],
					["Actor", e.Actors.Get(0).GetActorLabel()],
					["NowLocation", this.ActorComp.ActorLocationProxy],
					["HitLocation", this.CacheVector],
				),
			0)
		);
	}
	CheckMoveEnd(t) {
		let e = !1;
		return (
			0 < this.ChangeMoveTimeInternal
				? ((this.ChangeMoveTimeInternal = 0), this.MoveToPatrolPoint())
				: ((e = this.PatrolLogic.CheckPatrolEnd()),
					this.TsMoveOnePath &&
						t.IsMain &&
						!t.IsIgnorePoint &&
						t.Actions &&
						ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
							t.Actions,
							LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
						)),
			e
		);
	}
	PatrolError() {
		var t, e, o;
		(this.IsPause = !0),
			AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode &&
				((t = this.ActorComp.ActorLocationProxy),
				(o =
					Global_1.Global.BaseCharacter.CharacterActorComponent
						.ActorLocationProxy),
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						43,
						"NPC巡逻，触发异常停止",
						["Id", this.EntityConfigId],
						["EntityActive", this.Entity.Active],
						["HasMove", this.MoveComp.HasMoveInput],
						["TickInterval", this.Entity.GetTickInterval()],
						["HasModelBuffer", this.AnimComp.HasModelBuffer()],
						[
							"WasRecentlyRenderedOnScreen",
							this.ActorComp.Owner.WasRecentlyRenderedOnScreen(),
						],
						["CustomTimeDilation", this.ActorComp.Owner.CustomTimeDilation],
					),
				(e = this.PatrolLogic.PatrolPoint.Point),
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						43,
						"NPC巡逻，巡逻信息",
						["PlayerDist", Math.ceil(Vector_1.Vector.Dist2D(t, o))],
						["PatrolDist", Math.ceil(Vector_1.Vector.Dist2D(t, e))],
						["PatrolIndex", this.PatrolLogic.PatrolIndex],
						["NowLocation", t],
						["ToLocation", e],
					),
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						43,
						"NPC巡逻，角色输入信息",
						["SimpleMove", this.TsUseSimpleMove],
						["MoveState", this.StateComp?.MoveState],
						["MovementMode", this.MoveComp.CharacterMovement.MovementMode],
						["MoveSpeed", this.MoveComp.Speed],
						["MaxSpeed", this.MoveComp.CharacterMovement.MaxWalkSpeed],
						["MoveInput", this.ActorComp.Actor.K2_GetMovementInputVector()],
						["InputDirect", this.ActorComp.InputDirectProxy],
						["InputRotator", this.ActorComp.InputRotatorProxy],
						["ActorForward", this.ActorComp.ActorForwardProxy],
						["Velocity", this.ActorComp.Owner.GetVelocity()],
					),
				(o = this.AnimComp.MainAnimInstance),
				Log_1.Log.CheckWarn()) &&
				Log_1.Log.Warn("AI", 43, "NPC巡逻，角色ABP动画详细信息", [
					"Anims",
					o.GetDebugAnimNodeString(),
				]),
			this.ActorComp.CreatureData.RequestPosAbnormal(),
			this.ActorComp.ClearInput(),
			this.AnimComp.StopModelBuffer(),
			this.MoveComp.StopMove(!0),
			(this.MoveComp.IsSpecialMove = !1),
			(this.MoveComp.HasMoveInput = !1);
	}
	OnAbort() {
		this.PatrolLogic?.PatrolFinish();
	}
	OnClear() {
		this.AIOwner instanceof TsAiController_1.default &&
			(AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("AI", 43, "NPC退出巡逻", ["Id", this.EntityConfigId]),
			this.MoveComp &&
				(this.TsMoveOnePath &&
					this.MoveComp.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
				(this.MoveComp.IsSpecialMove = !1),
				(this.MoveComp.HasMoveInput = !1)),
			this.IsDebugEntity &&
				AiPatrolController_1.AiPatrolController.OpenNpcPatrolDebugMode &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.ChangeStateHandle,
				),
			(this.Entity = void 0),
			(this.ActorComp = void 0),
			(this.DebugComp = void 0),
			(this.MoveComp = void 0),
			(this.StateComp = void 0),
			(this.AnimComp = void 0),
			(this.AiComp = void 0),
			(this.PatrolLogic = void 0),
			(this.PatrolConfig = void 0),
			(this.CurTime = 0),
			(this.IsPause = !1),
			(this.ForceExit = !1),
			(this.IsInit = !1));
	}
}
exports.default = TsTaskNpcPatrol;

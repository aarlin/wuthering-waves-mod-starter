"use strict";
var NpcMoveComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, i) {
			var a,
				r = arguments.length,
				n =
					r < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, o))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(t, e, o, i);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(a = t[s]) &&
						(n = (r < 3 ? a(n) : 3 < r ? a(e, o, n) : a(e, o)) || n);
			return 3 < r && n && Object.defineProperty(e, o, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcMoveComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	CharacterAttributeTypes_1 = require("./Abilities/CharacterAttributeTypes"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	BaseMoveComponent_1 = require("./BaseMoveComponent"),
	MIN_MOVE_SPEED = 20,
	MAX_IN_WATER_SPEED = 800,
	BASE_MOVE_INHERIT_TIME = 1.5,
	IN_TURN_TOLERANCE = 0.1;
let NpcMoveComponent = (NpcMoveComponent_1 = class extends (
	BaseMoveComponent_1.BaseMoveComponent
) {
	constructor() {
		super(...arguments),
			(this.CanResponseInputTasks = new Array()),
			(this.CachedDeltaYaw = 0),
			(this.IsTurning = !1),
			(this.OnPositionStateChanged = (t, e) => {
				switch (
					(t === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
						((this.IsFallingIntoWater = !1),
						this.StopAddMove(this.AirInertiaHandler),
						(this.AirInertiaHandler = 0)),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Character",
							21,
							"OnPositionStateChanged:",
							["NPCName:", this.ActorComp.Actor.GetName()],
							["oldPositionState->", t],
							["newPositionState", e],
						),
					e)
				) {
					case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
						this.VelocityVector.FromUeVector(this.ActorComp.ActorVelocityProxy);
						var o = this.VelocityVector.Size();
						o > 800 &&
							(this.VelocityVector.MultiplyEqual(800 / o),
							this.CharacterMovement.Velocity.Set(
								this.VelocityVector.X,
								this.VelocityVector.Y,
								this.VelocityVector.Z,
							),
							this.ActorComp.ResetCachedVelocityTime());
						break;
					case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
					case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
						break;
					case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
						this.HasBaseMovement &&
							!this.ActorComp.Actor.BasedMovement.bRelativeRotation &&
							this.DeltaBaseMovementSpeed &&
							(this.AirInertiaHandler = this.SetAddMoveWorld(
								this.DeltaBaseMovementSpeed,
								1.5,
								NpcMoveComponent_1.BaseMoveInheritCurve,
								this.AirInertiaHandler,
							));
				}
			}),
			(this.AirInertiaHandler = 0);
	}
	static get Dependencies() {
		return [3];
	}
	SetMaxSpeed(t) {
		let e = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
		e <= 0 && (e = CharacterAttributeTypes_1.PER_TEN_THOUSAND),
			(t *= e /= CharacterAttributeTypes_1.PER_TEN_THOUSAND),
			5 === this.CharacterMovement.MovementMode
				? (this.CharacterMovement.MaxFlySpeed = t)
				: (this.CharacterMovement.MaxWalkSpeed = t);
	}
	OnClear() {
		return (
			super.OnClear(),
			this.JumpDelayTimer &&
				TimerSystem_1.TimerSystem.Remove(this.JumpDelayTimer),
			this.MoveController?.Dispose(),
			!0
		);
	}
	OnInit() {
		return !0;
	}
	OnStart() {
		(this.AccelerationLerpCurve =
			ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				PreloadConstants_1.ACC_LERP_CURVE_PATH,
				UE.CurveFloat,
			)),
			this.AccelerationLerpCurve?.IsValid() ||
				ModelManager_1.ModelManager.PreloadModel.CommonAssetElement.PrintDebugInfo(),
			(this.AccelerationChangeMoveState =
				CharacterUnifiedStateTypes_1.ECharMoveState.Other);
		var t = this.Entity.GetComponent(3);
		return (
			!!t.Valid &&
			((this.IsHidden = !1),
			(this.ActorComp = t),
			(this.CharacterMovement = t.Actor.CharacterMovement),
			(this.CharacterMovement.GravityScale = 2),
			(this.CharacterMovement.bRotationFollowBaseMovement = !0),
			(this.AnimComp = this.Entity.GetComponent(160)),
			(this.UnifiedStateComponent = this.Entity.GetComponent(89)),
			(this.CapsuleOffset = Vector_1.Vector.Create(
				0,
				0,
				this.ActorComp.Radius - this.ActorComp.HalfHeight,
			)),
			this.InitCreatureProperty(),
			(this.MovementData = DataTableUtil_1.DataTableUtil.GetDataTableRow(
				this.ActorComp.Actor.DtBaseMovementSetting,
				CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString(),
			)),
			(this.ActorComp.Actor.DtBaseMovementSetting && this.MovementData) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						58,
						"以下BP_{Character}没有在蓝图中配置Dt_BaseMovementSetting找对应的蓝图负责人处理",
						["Character", this.ActorComp.Actor.GetName()],
					)),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.OnMoveStateChange,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnDirectionStateChanged,
				this.OnDirectionStateChange,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				this.OnPositionStateChanged,
			),
			(this.IsStopInternal = !1),
			this.InitBaseState(),
			this.InitTraceInfo(),
			!0)
		);
	}
	static get BaseMoveInheritCurve() {
		return (
			this.BaseMoveInheritCurveInternal ||
				(this.BaseMoveInheritCurveInternal =
					ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH,
						UE.CurveFloat,
					)),
			this.BaseMoveInheritCurveInternal
		);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Entity,
			EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
			this.OnMoveStateChange,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnDirectionStateChanged,
				this.OnDirectionStateChange,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				this.OnPositionStateChanged,
			);
		for (const t of this.CanResponseInputTasks) t.EndTask();
		return (this.CanResponseInputTasks.length = 0), !(this.IsHidden = !1);
	}
	OnActivate() {
		this.OnMoveStateChange(
			CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
			CharacterUnifiedStateTypes_1.ECharMoveState.Run,
		),
			this.OnPositionStateChanged(
				CharacterUnifiedStateTypes_1.ECharPositionState.Air,
				CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
			),
			this.CharacterMovement.MovementMode !==
				this.CharacterMovement.DefaultLandMovementMode &&
				this.CharacterMovement.SetMovementMode(
					this.CharacterMovement.DefaultLandMovementMode,
				);
	}
	OnTick(t) {
		if (
			(super.OnTick(t),
			this.ActorComp &&
				((this.CharHeightAboveGround = -1),
				(this.DeltaTimeSeconds = t * MathUtils_1.MathUtils.MillisecondToSecond),
				this.MoveController?.UpdateMove(this.DeltaTimeSeconds),
				0 < this.SpeedLockFrame && --this.SpeedLockFrame,
				this.IsJump && --this.JumpFrameCount,
				this.LerpMaxAcceleration(),
				this.UpdateBaseMovement(),
				!this.IsSpecialMove))
		)
			if (
				(this.IsStopInternal
					? (this.Speed = 0)
					: (this.Speed = this.ActorComp.ActorVelocityProxy.Size2D()),
				(this.IsMoving = this.Speed > 20),
				this.ActorComp.IsMoveAutonomousProxy)
			) {
				this.UpdateMovementInput(this.ActorComp.InputDirect);
				var e =
					1 < this.Entity.GetTickInterval() &&
					this.AnimComp?.Valid &&
					this.ActorComp.Owner.WasRecentlyRenderedOnScreen();
				let i,
					a = (e && (i = this.AnimComp.GetMeshTransform()), !1);
				this.CanResponseInput()
					? (this.SetInfoVar(),
						(o = this.ActorComp.ActorRotationProxy.Pitch),
						this.UpdateFacing(),
						(a ||= o !== this.ActorComp.ActorRotationProxy.Pitch),
						this.CacheVar())
					: (this.HasMoveInput = !1),
					this.UpdateAddMoveSpeed() && (a = !0),
					this.UpdateAddMoveOffset() && (a = !0),
					e && a && this.AnimComp.SetModelBuffer(i, t),
					this.OnTickGravityScale(),
					this.ActorComp.SetInputRotatorByNumber(
						this.ActorComp.InputRotator.Pitch,
						this.ActorComp.InputRotator.Yaw + this.DeltaBaseMovementYaw,
						this.ActorComp.InputRotator.Roll,
					);
				var o =
					this.ActorComp.InputRotator.Yaw -
					this.ActorComp.ActorRotationProxy.Yaw;
				this.CanResponseInput() &&
					(MathUtils_1.MathUtils.IsNearlyZero(this.CachedDeltaYaw, 0.1) &&
					!MathUtils_1.MathUtils.IsNearlyZero(o, 0.1)
						? EventSystem_1.EventSystem.EmitWithTarget(
								this.Entity,
								EventDefine_1.EEventName.CharTurnBegin,
							)
						: !MathUtils_1.MathUtils.IsNearlyZero(this.CachedDeltaYaw, 0.1) &&
							MathUtils_1.MathUtils.IsNearlyZero(o, 0.1) &&
							EventSystem_1.EventSystem.EmitWithTarget(
								this.Entity,
								EventDefine_1.EEventName.CharTurnEnd,
							),
					(this.CachedDeltaYaw = o)),
					ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
						this.PrintAnimInstanceMovementInfo();
			} else
				this.CanResponseInput()
					? (this.SetInfoVar(), this.UpdateFacing(), this.CacheVar())
					: (this.HasMoveInput = !1);
	}
	InitCreatureProperty() {
		var t = this.Entity.GetComponent(0);
		(this.CreatureProperty = t.GetEntityPropertyConfig()),
			(this.CharacterMovement.Mass = this.CreatureProperty.重量),
			(this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级),
			(this.CharacterMovement.GoThroughPriority =
				this.CreatureProperty.穿透优先级);
	}
	UpdateAddMoveSpeed(t = 0) {
		if (0 === this.VelocityAdditionMap.size) return !1;
		for (var [e, o] of (NpcMoveComponent_1.VelocityAdditionTotal.Reset(),
		this.VelocityAdditionMap))
			(0 <= o.Duration && o.ElapsedTime >= o.Duration) ||
			(o.MovementMode &&
				this.CharacterMovement.CustomMovementMode !== o.MovementMode)
				? this.VelocityAdditionMap.delete(e)
				: ((o.ElapsedTime += this.DeltaTimeSeconds),
					this.VelocityVector.FromUeVector(o.Velocity),
					o.CurveFloat?.IsValid() &&
						this.VelocityVector.MultiplyEqual(
							o.CurveFloat.GetFloatValue(
								0 < o.Duration ? o.ElapsedTime / o.Duration : 1,
							),
						),
					0 < o.Duration &&
						o.ElapsedTime > o.Duration &&
						((e = o.ElapsedTime - o.Duration),
						(o = (this.DeltaTimeSeconds - e) / this.DeltaTimeSeconds),
						this.VelocityVector.MultiplyEqual(o)),
					NpcMoveComponent_1.VelocityAdditionTotal.AdditionEqual(
						this.VelocityVector,
					));
		return (
			0 !== this.VelocityAdditionMap.size &&
			(this.ActorComp.IsRoleAndCtrlByMe &&
				Math.abs(NpcMoveComponent_1.VelocityAdditionTotal.X) <
					MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(NpcMoveComponent_1.VelocityAdditionTotal.Y) <
					MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(NpcMoveComponent_1.VelocityAdditionTotal.Z - 50) <
					MathUtils_1.MathUtils.SmallNumber &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Movement", 6, "叠加向上移动50厘米", [
					"Actor",
					this.ActorComp.Actor.GetName(),
				]),
			this.UnifiedStateComponent.PositionState ===
			CharacterUnifiedStateTypes_1.ECharPositionState.Ground
				? this.ActorComp.KuroMoveAlongFloor(
						NpcMoveComponent_1.VelocityAdditionTotal.ToUeVector(),
						this.DeltaTimeSeconds,
						"UpdateAddMoveSpeed",
					)
				: (NpcMoveComponent_1.VelocityAdditionDestination.DeepCopy(
						NpcMoveComponent_1.VelocityAdditionTotal,
					),
					NpcMoveComponent_1.VelocityAdditionDestination.MultiplyEqual(
						this.DeltaTimeSeconds,
					),
					this.ActorComp.AddActorWorldOffset(
						NpcMoveComponent_1.VelocityAdditionDestination.ToUeVector(),
						"UpdateAddMoveSpeed",
						!0,
					)),
			!0)
		);
	}
	UpdateMovementInput(t) {
		switch (this.UnifiedStateComponent?.PositionState) {
			case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
				this.ActorComp.Actor.AddMovementInput(
					t,
					this.AnimComp?.Valid ? this.AnimComp.GetWalkRunMix() : 1,
					!1,
				);
				break;
			case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
				this.ActorComp.Actor.AddMovementInput(t, 1, !1);
		}
	}
	UpdateFacing() {
		this.CanUpdateMovingRotation() &&
			(this.ActorComp.OverrideTurnSpeed
				? (this.SmoothCharacterRotation(
						this.ActorComp.InputRotator,
						this.ActorComp.OverrideTurnSpeed,
						this.DeltaTimeSeconds,
						!1,
						"Movement.UpdateFacing",
					),
					this.ActorComp.SetOverrideTurnSpeed(void 0))
				: this.UpdateGroundedRotation());
	}
});
(NpcMoveComponent = NpcMoveComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(163)],
		NpcMoveComponent,
	)),
	(exports.NpcMoveComponent = NpcMoveComponent);

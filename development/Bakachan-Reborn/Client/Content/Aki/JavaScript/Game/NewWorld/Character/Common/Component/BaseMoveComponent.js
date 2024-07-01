"use strict";
var BaseMoveComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, o, i) {
			var r,
				a = arguments.length,
				n =
					a < 3
						? t
						: null === i
							? (i = Object.getOwnPropertyDescriptor(t, o))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(e, t, o, i);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(r = e[s]) &&
						(n = (a < 3 ? r(n) : 3 < a ? r(t, o, n) : r(t, o)) || n);
			return 3 < a && n && Object.defineProperty(t, o, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseMoveComponent = exports.GravityScale = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	CurveUtils_1 = require("../../../../../Core/Utils/Curve/CurveUtils"),
	Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
	GlobalData_1 = require("../../../../GlobalData"),
	ActorUtils_1 = require("../../../../Utils/ActorUtils"),
	TsBaseItem_1 = require("../../../SceneItem/BaseItem/TsBaseItem"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	CharacterAttributeTypes_1 = require("./Abilities/CharacterAttributeTypes"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	BaseMoveCharacter_1 = require("./Move/BaseMoveCharacter"),
	MoveToLocationLogic_1 = require("./Move/MoveToLocationLogic"),
	PROFILE_KEY = "CharacterMoveComponent_GetHeightAboveGround",
	ROTATION_AIM = 1500,
	NEAR_ZERO = 1e-6,
	HEIGHT_DETECT = 500,
	ROTATABLE_THREADHOLD = 0.5,
	BASE_MOVEMENT_VELOCITY_RATE = 0.2,
	SPEED_LOCK_FRAME = 5,
	INVALID_FORCE_SPEED = -1e8,
	OPEN_DEBUG = !1,
	DEFAULT_MAX_FALLING_VELOCITY_2D = 700,
	DEFAULT_AIR_CONTROL = 0.05,
	WALK_OFF_LEDGE_DELAY_FRAME = 1;
class VelocityAddition {
	constructor(e, t, o, i, r, a, n) {
		(this.ElapsedTime = -0),
			(this.Duration = -0),
			(this.Velocity = void 0),
			(this.CurveFloat = void 0),
			(this.MovementMode = -0),
			(this.VelocityCurveType = 0),
			(this.VelocityCurveMin = -0),
			(this.VelocityCurveMax = -0),
			(this.ElapsedTime = 0),
			(this.Duration = e),
			(this.Velocity = t),
			(this.CurveFloat = o),
			(this.MovementMode = i),
			(this.VelocityCurveType = r),
			(this.VelocityCurveMin = a),
			(this.VelocityCurveMax = n);
	}
	VelocityCurveFunc(e) {
		let t = e;
		switch (this.VelocityCurveType) {
			case 1:
				t = MathUtils_1.MathUtils.BlendEaseIn(
					this.VelocityCurveMax,
					this.VelocityCurveMin,
					e,
					2,
				);
				break;
			case 3:
				t = MathUtils_1.MathUtils.BlendEaseIn(
					this.VelocityCurveMin,
					this.VelocityCurveMax,
					e - 1,
					2,
				);
				break;
			case 2:
				t =
					this.VelocityCurveMax +
					(this.VelocityCurveMin - this.VelocityCurveMax) * e;
		}
		return MathUtils_1.MathUtils.Clamp(t, 0, 1);
	}
}
class GravityScale {
	constructor(e = 0, t = 0, o = 0, i = 0, r = 0, a = 0) {
		(this.ScaleUp = e),
			(this.ScaleDown = t),
			(this.ScaleTop = o),
			(this.VelocityTop = i),
			(this.Duration = r),
			(this.ElapsedTime = a);
	}
}
exports.GravityScale = GravityScale;
class RotationSetting {
	constructor() {
		(this.MinSpeed = 360),
			(this.MaxSpeed = 600),
			(this.MinOffset = 0),
			(this.MaxOffset = 180),
			(this.Curve = CurveUtils_1.CurveUtils.DefaultLinear);
	}
	ClearObject() {
		return (
			(this.MinSpeed = 360),
			(this.MaxSpeed = 600),
			(this.MinOffset = 0),
			(this.MaxOffset = 180),
			(this.Curve = CurveUtils_1.CurveUtils.DefaultLinear),
			!0
		);
	}
	UpdateSettings(e) {
		(this.MinSpeed = e.最小旋转速度),
			(this.MaxSpeed = e.最大旋转速度),
			(this.MinOffset = e.最小角度差),
			(this.MaxOffset = e.最大角度差),
			(this.Curve = CurveUtils_1.CurveUtils.CreateCurveByStruct(e.渐变曲线));
	}
	GetSpeed(e) {
		return (
			(e = (e - this.MinOffset) / (this.MaxOffset - this.MinOffset)),
			this.MinSpeed +
				this.Curve.GetCurrentValue(e) * (this.MaxSpeed - this.MinSpeed)
		);
	}
}
let BaseMoveComponent = (BaseMoveComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.IsInputDrivenCharacter = !1),
			(this.ActorComp = void 0),
			(this.CharacterMovement = void 0),
			(this.AnimComp = void 0),
			(this.MoveToLocationLogicInternal = void 0),
			(this.MoveControllerInternal = void 0),
			(this.HasMoveInput = !1),
			(this.ForceExitStateStop = !1),
			(this.IsMoving = !1),
			(this.Speed = 0),
			(this.IsSpecialMove = !1),
			(this.CanMoveWithDistanceInternal = !0),
			(this.CanMoveFromInputInternal = !0),
			(this.DeltaTimeSeconds = 0),
			(this.JumpUpRate = 1),
			(this.ConfigChainLengthSquared = -1),
			(this.CurrentChainLengthSquared = 0),
			(this.ChainCenter = Vector_1.Vector.Create()),
			(this.ForceSpeed = Vector_1.Vector.Create(-1e8, -1e8, -1e8)),
			(this.Acceleration = Vector_1.Vector.Create()),
			(this.PreviousVelocity = Vector_1.Vector.Create()),
			(this.TmpQuat = Quat_1.Quat.Create()),
			(this.PreviousAimYaw = 0),
			(this.AimYawRate = 0),
			(this.IsFallingIntoWater = !1),
			(this.JumpFrameCount = 0),
			(this.CharHeightAboveGround = -1),
			(this.CreatureProperty = void 0),
			(this.MovementData = void 0),
			(this.rFr = void 0),
			(this.nFr = new RotationSetting()),
			(this.UnifiedStateComponent = void 0),
			(this.HasBaseMovement = !1),
			(this.OldMovementMode = void 0),
			(this.IsHidden = !1),
			(this.HasDeltaBaseMovementData = !1),
			(this.DeltaBaseMovementOffset = void 0),
			(this.DeltaBaseMovementQuat = void 0),
			(this.DeltaBaseMovementSpeed = void 0),
			(this.DeltaConveyBeltSpeed = void 0),
			(this.DeltaBaseMovementYaw = 0),
			(this.BasePrimitiveComponent = void 0),
			(this.IsDeltaBaseSpeedNeedZ = !1),
			(this.IsLockedRotation = !1),
			(this.SpeedLockFrame = 0),
			(this.VelocityVector = Vector_1.Vector.Create()),
			(this.IsStopInternal = !1),
			(this.DebugMovementSetting = void 0),
			(this.UseDebugMovementSetting = !1),
			(this.WalkOffCount = 0),
			(this.CannotResponseInputCount = 0),
			(this.CapsuleOffset = void 0),
			(this.SphereTrace = void 0),
			(this.AccelerationChangeMoveState = void 0),
			(this.AccelerationLerpCurve = void 0),
			(this.FallingHorizontalMaxSpeed = 700),
			(this.DesireMaxAccelerationLerpTime = -0),
			(this.MaxAccelerationLerpTime = -0),
			(this.K7s = !1),
			(this.$7s = 0),
			(this.TurnRate = 1),
			(this.OnDirectionStateChange = (e, t) => {
				this.ResetMovementSetting(t),
					(t = this.UnifiedStateComponent?.MoveState),
					this.ResetMaxSpeed(t),
					this.ResetCharacterMovementInfo(t);
			}),
			(this.OnMoveStateChange = (e, t) => {
				var o = this.UnifiedStateComponent?.DirectionState;
				this.ResetMovementSetting(o),
					this.ResetMaxSpeed(t),
					this.ResetCharacterMovementInfo(t);
			}),
			(this.OnPositionStateChange = () => {
				var e = this.UnifiedStateComponent?.DirectionState;
				this.ResetMovementSetting(e),
					(e = this.UnifiedStateComponent?.MoveState);
				this.ResetMaxSpeed(e), this.ResetCharacterMovementInfo(e);
			}),
			(this.JumpDelayTimer = void 0),
			(this.GroundedTimeUe = 0),
			(this.VelocityAdditionIncId = 1),
			(this.VelocityAdditionMap = new Map()),
			(this.VelocityAdditionMapByMesh = new Map()),
			(this.AddMoveOffset = void 0),
			(this.AddMoveRotation = Rotator_1.Rotator.Create()),
			(this.StartLocation = Vector_1.Vector.Create()),
			(this.TempRotator = Rotator_1.Rotator.Create(0, 0, 0)),
			(this.CurrentGravityScale = void 0);
	}
	SetForceSpeed(e) {
		e.ContainsNaN() &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error("Movement", 6, "SetForceSpeed Contains NaN", [
				"speed",
				e,
			]),
			this.ForceSpeed.DeepCopy(e),
			this.CharacterMovement &&
				(this.CharacterMovement.Velocity = this.ForceSpeed.ToUeVector()),
			this.ActorComp && this.ActorComp.ResetCachedVelocityTime();
	}
	get IsJump() {
		return 0 < this.JumpFrameCount;
	}
	get CurrentMovementSettings() {
		return this.rFr;
	}
	set CurrentMovementSettings(e) {
		(this.rFr = e), this.nFr.UpdateSettings(e.ControllerRotationSpeedSetting);
	}
	set AccelerationLerpTime(e) {
		(this.DesireMaxAccelerationLerpTime = e),
			(this.MaxAccelerationLerpTime = e);
	}
	get AccelerationLerpTime() {
		return this.DesireMaxAccelerationLerpTime;
	}
	SetFallingHorizontalMaxSpeed(e) {
		this.FallingHorizontalMaxSpeed = e;
	}
	ClearFallingHorizontalMaxSpeed() {
		this.FallingHorizontalMaxSpeed = 700;
	}
	get BasePlatform() {
		var e;
		if (this.BasePrimitiveComponent?.IsValid())
			return (e = this.BasePrimitiveComponent?.GetOwner()) instanceof
				UE.BP_BasePlatform_C
				? e
				: (e = ActorUtils_1.ActorUtils.GetEntityByActor(
							this.BasePrimitiveComponent.GetOwner()?.GetAttachRootParentActor(),
							!1,
						)?.Entity?.GetComponent(182))
					? e?.GetInteractionMainActor()?.BasePlatform
					: void 0;
		this.BasePrimitiveComponent = void 0;
	}
	SetUseDebugMovementSetting(e) {
		this.UseDebugMovementSetting = e;
	}
	SetDebugMovementSetting(e) {
		this.DebugMovementSetting = e;
	}
	ApplyDebugMovementSetting() {
		this.CurrentMovementSettings = this.DebugMovementSetting;
	}
	ResetMovementSettingByDirectionState(e) {
		switch (e) {
			case CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection:
				this.CurrentMovementSettings = this.MovementData.FaceDirection.Standing;
				break;
			case CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection:
				this.CurrentMovementSettings = this.MovementData.LockDirection.Standing;
				break;
			case CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection:
				this.CurrentMovementSettings = this.MovementData.AimDirection.Standing;
		}
	}
	ResetMovementSetting(e) {
		this.MovementData
			? this.UseDebugMovementSetting
				? this.ApplyDebugMovementSetting()
				: this.ResetMovementSettingByDirectionState(e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					58,
					"以下BP_{Character}没有在蓝图中配置Dt_BaseMovementSetting找对应的蓝图负责人处理",
					["Character", this.ActorComp.Actor.GetName()],
				);
	}
	ResetMaxSpeed(e) {
		if (!(0 < this.SpeedLockFrame)) {
			var t = this.ActorComp.Actor.TsCharacterDebugComponent.MaxFixSpeed;
			switch (e) {
				case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
					this.SetMaxSpeed(t + (this.CurrentMovementSettings?.WalkSpeed ?? 0));
					break;
				case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
					this.SetMaxSpeed(t + (this.CurrentMovementSettings?.RunSpeed ?? 0));
					break;
				case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
					this.SetMaxSpeed(
						t + (this.CurrentMovementSettings?.SprintSpeed ?? 0),
					);
					break;
				case CharacterUnifiedStateTypes_1.ECharMoveState.Swing:
					this.SetMaxSpeed(t + (this.CurrentMovementSettings?.SwingSpeed ?? 0));
					break;
				default:
					this.SetMaxSpeed(t + (this.CurrentMovementSettings?.RunSpeed ?? 0));
			}
		}
	}
	SetMaxSpeed(e) {
		var t = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
		e *= t /= CharacterAttributeTypes_1.PER_TEN_THOUSAND;
		5 === this.CharacterMovement.MovementMode
			? (this.CharacterMovement.MaxFlySpeed = e)
			: (this.CharacterMovement.MaxWalkSpeed = e);
	}
	ResetCharacterMovementInfo(e) {
		(this.CharacterMovement.MaxWalkSpeedCrouched =
			this.CharacterMovement.MaxWalkSpeed),
			e === CharacterUnifiedStateTypes_1.ECharMoveState.Swing
				? (this.CharacterMovement.MaxAcceleration =
						this.CurrentMovementSettings?.SwingAcceleration ?? 0)
				: (this.CharacterMovement.MaxAcceleration =
						this.CurrentMovementSettings?.Acceleration ?? 0),
			(this.CharacterMovement.GroundFriction =
				this.CurrentMovementSettings?.GroundFriction ?? 0);
	}
	SetAddMoveOffset(e) {
		(this.AddMoveOffset = e),
			this.ActorComp.IsRoleAndCtrlByMe &&
				e &&
				1e6 < e.SizeSquared() &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Movement",
					6,
					"AddMove超过了10米",
					["Actor", this.ActorComp.Actor.GetName()],
					["Offset", e],
				);
	}
	SetAddMoveRotation(e) {
		this.AddMoveRotation.DeepCopy(e);
	}
	StopMove(e) {
		e &&
			(this.CharacterMovement &&
				(this.CharacterMovement.Velocity = Vector_1.Vector.ZeroVector),
			this.ActorComp?.ResetCachedVelocityTime(),
			this.MoveController?.StopMove()),
			(this.IsStopInternal = e);
	}
	SetHiddenMovementMode(e) {
		e !== this.IsHidden &&
			(e
				? ((this.OldMovementMode = this.CharacterMovement?.MovementMode),
					this.CharacterMovement?.SetMovementMode(0))
				: this.CharacterMovement?.SetMovementMode(this.OldMovementMode),
			(this.IsHidden = e));
	}
	OnInitData() {
		return (
			(this.CurrentGravityScale = new GravityScale()),
			this.ForceSpeed.Set(-1e8, -1e8, -1e8),
			!0
		);
	}
	InitTraceInfo() {
		(this.SphereTrace = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.SphereTrace.WorldContextObject = this.ActorComp.Owner),
			(this.SphereTrace.bIsSingle = !0),
			(this.SphereTrace.bIgnoreSelf = !0),
			this.SphereTrace.SetTraceTypeQuery(
				QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
			);
	}
	InitBaseState() {
		switch (this.ActorComp.CreatureData.GetEntityType()) {
			case Protocol_1.Aki.Protocol.HBs.Proto_Player:
				(this.CharacterMovement.bKuroAutoActiveNav = !1),
					(this.CharacterMovement.bKuroStillBlockInNav = !0),
					(this.CharacterMovement.bProjectNavMeshWalking = !1),
					(this.IsInputDrivenCharacter = !0);
				break;
			case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
			case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
				(this.CharacterMovement.bKuroAutoActiveNav = !1),
					(this.CharacterMovement.bKuroStillBlockInNav = !0),
					(this.CharacterMovement.bProjectNavMeshWalking = !1),
					(this.IsInputDrivenCharacter = !1);
				break;
			case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
				(this.CharacterMovement.bKuroAutoActiveNav = !1),
					(this.CharacterMovement.bKuroStillBlockInNav = !1),
					(this.CharacterMovement.bProjectNavMeshWalking = !1),
					(this.IsInputDrivenCharacter = !0);
				break;
			default:
				(this.CharacterMovement.bKuroAutoActiveNav = !1),
					(this.CharacterMovement.bKuroStillBlockInNav = !1),
					(this.CharacterMovement.bProjectNavMeshWalking = !0),
					(this.IsInputDrivenCharacter = !0);
		}
		(this.CharacterMovement.bImpartBaseVelocityZ = !1),
			(this.CharacterMovement.bImpartBaseVelocityX = !1),
			(this.CharacterMovement.bImpartBaseVelocityY = !1);
	}
	OnActivate() {
		this.OnMoveStateChange(
			CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
			CharacterUnifiedStateTypes_1.ECharMoveState.Run,
		),
			2 === this.CharacterMovement.MovementMode &&
				this.CharacterMovement.SetMovementMode(1);
	}
	PrintAnimInstanceMovementInfo() {
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn("Test", 58, "TickInfo:", [
				"HasMoveInput",
				this.HasMoveInput,
			]);
	}
	InitCreatureProperty() {
		var e = this.Entity.GetComponent(0);
		(this.CreatureProperty = e.GetEntityPropertyConfig()),
			(this.CharacterMovement.Mass = this.CreatureProperty.重量),
			(this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级),
			(this.CharacterMovement.GoThroughPriority =
				this.CreatureProperty.穿透优先级);
	}
	ResetHitPriorityAndGoThrough() {
		this.CreatureProperty &&
			((this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级),
			(this.CharacterMovement.GoThroughPriority =
				this.CreatureProperty.穿透优先级));
	}
	CanResponseInput() {
		return 0 === this.CannotResponseInputCount;
	}
	SetInfoVar() {
		this.DeltaTimeSeconds > 1e-6 &&
			(this.Acceleration.DeepCopy(this.ActorComp.ActorVelocityProxy),
			this.Acceleration.SubtractionEqual(this.PreviousVelocity),
			this.Acceleration.DivisionEqual(this.DeltaTimeSeconds),
			(this.AimYawRate =
				Math.abs(this.ActorComp.ActorRotationProxy.Yaw - this.PreviousAimYaw) /
				this.DeltaTimeSeconds)),
			(this.HasMoveInput =
				(Math.abs(this.ActorComp.InputDirectProxy.X) > 1e-6 ||
					Math.abs(this.ActorComp.InputDirectProxy.Y) > 1e-6) &&
				this.CharacterMovement.MaxAcceleration > 1e-6);
	}
	CacheVar() {
		this.PreviousVelocity.DeepCopy(this.ActorComp.ActorVelocityProxy),
			(this.PreviousAimYaw = this.ActorComp.ActorRotation.Yaw);
	}
	CanUpdateMovingRotation() {
		return (
			this.UnifiedStateComponent.DirectionState ===
				CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection ||
			!this.AnimComp?.Valid ||
			!this.AnimComp.HasKuroRootMotion ||
			this.AnimComp.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
				CharacterNameDefines_1.CharacterNameDefines.ROOT_ROTATABLE,
				0,
			) >= 0.5
		);
	}
	SetLockedRotation(e) {
		this.IsLockedRotation = e;
	}
	get LockedRotation() {
		return this.IsLockedRotation;
	}
	SmoothCharacterRotation(
		e,
		t,
		o,
		i = !1,
		r = "Movement.SmoothCharacterRotation",
		a = !0,
	) {
		var n;
		this.IsLockedRotation ||
			(n = this.ActorComp.ActorRotationProxy).Equals2(e) ||
			(this.TempRotator.DeepCopy(e),
			MathUtils_1.MathUtils.RotatorInterpConstantTo(
				n,
				this.TempRotator,
				o,
				(a ? this.SpeedScaled(t) : t) * this.TurnRate,
				this.TempRotator,
			),
			1 < this.Entity.GetTickInterval() &&
			this.AnimComp?.Valid &&
			this.ActorComp.Owner.WasRecentlyRenderedOnScreen()
				? ((e = this.AnimComp.GetMeshTransform()),
					this.ActorComp.SetActorRotationWithPriority(
						this.TempRotator.ToUeRotator(),
						r,
						0,
						i,
					),
					this.AnimComp.SetModelBuffer(
						e,
						o * MathUtils_1.MathUtils.SecondToMillisecond,
					))
				: this.ActorComp.SetActorRotationWithPriority(
						this.TempRotator.ToUeRotator(),
						r,
						0,
						i,
					));
	}
	ApplyForceSpeedAndRecordSpeed() {
		-1e8 !== this.ForceSpeed.X &&
			(this.ForceSpeed.ContainsNaN()
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Movement", 6, "ForceSpeed Nan.", [
						"V",
						this.ForceSpeed,
					])
				: (this.CharacterMovement.Velocity = this.ForceSpeed.ToUeVector()),
			this.ActorComp.ResetCachedVelocityTime(),
			(this.ForceSpeed.X = -1e8));
	}
	ConsumeForceFallingSpeed() {
		return !0;
	}
	SetAddMoveWorldSpeedWithMesh(e, t) {
		var o;
		e
			? ((o = this.VelocityAdditionMapByMesh.get(e) ?? 0),
				(o = this.SetAddMoveWorld(t, -1, void 0, o)) &&
					this.VelocityAdditionMapByMesh.set(e, o))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Game",
					15,
					"[CharacterMoveComponent.SetAddMoveWorldSpeedWithMesh] 叠加位移失败，mesh为空",
				);
	}
	SetAddMoveWithMesh(e, t, o, i) {
		var r;
		e
			? ((r = this.VelocityAdditionMapByMesh.get(e) ?? 0),
				(t = this.ActorComp.ActorRotation.RotateVector(t)),
				(r = this.SetAddMoveWorld(t, o, i, r)) &&
					this.VelocityAdditionMapByMesh.set(e, r))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Game",
					15,
					"[CharacterMoveComponent.SetAddMoveWithMesh] 叠加位移失败，mesh为空",
				);
	}
	SetAddMoveWorld(e, t, o, i, r, a = 0, n = 0, s = 1) {
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						15,
						"[CharacterMoveComponent.SetAddMoveWorldNew] 叠加位移失败，速度为空",
					),
				0
			);
		if (
			GlobalData_1.GlobalData.IsPlayInEditor &&
			(s <= n ||
				MathUtils_1.MathUtils.Clamp(n, 0, 1) !== n ||
				MathUtils_1.MathUtils.Clamp(s, 0, 1) !== s)
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						21,
						"速度曲线配置错误",
						["Min", n],
						["Max", s],
					),
				0
			);
		let h;
		return i && (h = this.VelocityAdditionMap.get(i))
			? (e.ContainsNaN() &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error("Movement", 6, "SetAddMoveWorld Contains NaN", [
						"speed",
						e,
					]),
				(h.ElapsedTime = 0),
				(h.Velocity = e),
				(h.Duration = t),
				(h.CurveFloat = o),
				(h.MovementMode = r),
				i)
			: ((h = new VelocityAddition(t, e, o, r ?? 0, a, n, s)),
				(i = ++this.VelocityAdditionIncId),
				this.VelocityAdditionMap.set(i, h),
				i);
	}
	SetAddMoveWorldWithMesh(e, t, o, i) {
		var r;
		e
			? ((r = this.VelocityAdditionMapByMesh.get(e) ?? 0),
				(r = this.SetAddMoveWorld(t, o, i, r)) &&
					this.VelocityAdditionMapByMesh.set(e, r))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Game",
					15,
					"[CharacterMoveComponent.SetAddMoveWorldWithMesh] 叠加位移失败，mesh为空",
				);
	}
	StopAddMove(e) {
		return this.VelocityAdditionMap.delete(e);
	}
	StopAddMoveWithMesh(e) {
		return (
			(e = this.VelocityAdditionMapByMesh.get(e)),
			this.VelocityAdditionMap.delete(e)
		);
	}
	StopAllAddMove() {
		this.VelocityAdditionMap.clear();
	}
	OnTick(e) {
		(this.CanMoveWithDistanceInternal = this.Entity.DistanceWithCamera <= 7e3),
			this.K7s &&
				this.$7s + 1 <= Time_1.Time.Frame &&
				((this.$7s = Time_1.Time.Frame),
				this.SetWalkOffLedge(this.WalkOffCount <= 0),
				(this.K7s = !1));
	}
	OnTickGravityScale() {
		this.CurrentGravityScale.Duration < 0 ||
			(this.CurrentGravityScale.ElapsedTime >=
				this.CurrentGravityScale.Duration ||
			this.UnifiedStateComponent?.PositionState !==
				CharacterUnifiedStateTypes_1.ECharPositionState.Air
				? ((this.CharacterMovement.GravityScale = 2),
					(this.CurrentGravityScale.Duration = -1))
				: ((this.CurrentGravityScale.ElapsedTime += this.DeltaTimeSeconds),
					this.CurrentGravityScale.VelocityTop <
					Math.abs(this.CharacterMovement.Velocity.Z)
						? (this.CharacterMovement.GravityScale =
								2 *
								(0 < this.CharacterMovement.Velocity.Z
									? this.CurrentGravityScale.ScaleUp
									: this.CurrentGravityScale.ScaleDown))
						: (this.CharacterMovement.GravityScale =
								2 * this.CurrentGravityScale.ScaleTop)));
	}
	UpdateAddMoveOffset() {
		return (
			this.AddMoveOffset &&
				(this.UnifiedStateComponent?.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Ground
					? (this.VelocityVector.FromUeVector(this.AddMoveOffset),
						this.VelocityVector.DivisionEqual(this.DeltaTimeSeconds),
						this.ActorComp.KuroMoveAlongFloor(
							this.VelocityVector.ToUeVector(),
							this.DeltaTimeSeconds,
							"UpdateAddMoveOffset",
						))
					: (this.VelocityVector.FromUeVector(this.AddMoveOffset),
						this.MoveCharacter(
							this.VelocityVector,
							this.DeltaTimeSeconds,
							"移动.更新速度叠加",
						)),
				(this.AddMoveOffset = void 0)),
			!this.AddMoveRotation.IsNearlyZero() &&
				(this.ActorComp.AddActorLocalRotation(
					this.AddMoveRotation.ToUeRotator(),
					"移动.更新旋转叠加 ",
					!1,
				),
				this.AddMoveRotation.Reset(),
				!0)
		);
	}
	UpdateAddMoveSpeed(e = 1) {
		if (0 === this.VelocityAdditionMap.size) return !1;
		BaseMoveComponent_1.VelocityAdditionTotal.Reset();
		var t,
			o,
			i,
			r = this.DeltaTimeSeconds * e;
		for ([t, o] of this.VelocityAdditionMap)
			if (0 <= o.Duration && o.ElapsedTime >= o.Duration)
				this.VelocityAdditionMap.delete(t);
			else if (
				o.MovementMode &&
				this.CharacterMovement.CustomMovementMode !== o.MovementMode
			)
				this.VelocityAdditionMap.delete(t);
			else if (
				((o.ElapsedTime += r),
				this.VelocityVector.FromUeVector(o.Velocity),
				0 !== o.VelocityCurveType
					? ((i = o.VelocityCurveFunc(
							0 < o.Duration ? o.ElapsedTime / o.Duration : 1,
						)),
						this.VelocityVector.FromUeVector(o.Velocity),
						this.VelocityVector.MultiplyEqual(i))
					: o.CurveFloat?.IsValid() &&
						this.VelocityVector.MultiplyEqual(
							o.CurveFloat.GetFloatValue(
								0 < o.Duration ? o.ElapsedTime / o.Duration : 1,
							),
						),
				0 < o.Duration &&
					o.ElapsedTime > o.Duration &&
					((i = o.ElapsedTime - o.Duration),
					this.VelocityVector.MultiplyEqual((r - i) / r)),
				BaseMoveComponent_1.VelocityAdditionTotal.AdditionEqual(
					this.VelocityVector,
				),
				this.VelocityVector.ContainsNaN())
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Movement",
							6,
							"VelocityVector NaN",
							["key", t],
							["VelocityVector", this.VelocityVector],
							["velocityAddition.Velocity", o.Velocity],
							["deltaTimeSeconds", r],
						),
					this.VelocityAdditionMap.delete(t),
					!1
				);
		return (
			0 !== this.VelocityAdditionMap.size &&
			(this.ActorComp.IsRoleAndCtrlByMe &&
				Math.abs(BaseMoveComponent_1.VelocityAdditionTotal.X) <
					MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(BaseMoveComponent_1.VelocityAdditionTotal.Y) <
					MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(BaseMoveComponent_1.VelocityAdditionTotal.Z - 50) <
					MathUtils_1.MathUtils.SmallNumber &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Movement", 6, "叠加向上移动50厘米", [
					"Actor",
					this.ActorComp.Actor.GetName(),
				]),
			this.UnifiedStateComponent.PositionState ===
			CharacterUnifiedStateTypes_1.ECharPositionState.Ground
				? this.ActorComp.KuroMoveAlongFloor(
						BaseMoveComponent_1.VelocityAdditionTotal.ToUeVector(),
						r,
						"UpdateAddMoveSpeed",
					)
				: (BaseMoveComponent_1.VelocityAdditionDestination.DeepCopy(
						BaseMoveComponent_1.VelocityAdditionTotal,
					),
					BaseMoveComponent_1.VelocityAdditionDestination.MultiplyEqual(r),
					BaseMoveComponent_1.VelocityAdditionDestination.ContainsNaN()
						? Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Movement",
								6,
								"VelocityAdditionDestination NaN",
								[
									"VelocityAdditionDestination",
									BaseMoveComponent_1.VelocityAdditionDestination,
								],
								[
									"VelocityAdditionTotal",
									BaseMoveComponent_1.VelocityAdditionTotal,
								],
								["deltaTimeSeconds", r],
							)
						: this.ActorComp.AddActorWorldOffset(
								BaseMoveComponent_1.VelocityAdditionDestination.ToUeVector(),
								"UpdateAddMoveSpeed",
								!0,
							)),
			!0)
		);
	}
	GetHeightAboveGround(e = 500) {
		var t, o;
		return (
			this.CharHeightAboveGround >= e ||
				(MathUtils_1.MathUtils.TransformPosition(
					this.ActorComp.ActorLocationProxy,
					this.ActorComp.ActorRotationProxy,
					this.ActorComp.ActorScaleProxy,
					this.CapsuleOffset,
					this.StartLocation,
				),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.SphereTrace,
					this.StartLocation,
				),
				this.SphereTrace.SetEndLocation(
					this.StartLocation.X,
					this.StartLocation.Y,
					this.StartLocation.Z - e,
				),
				(this.SphereTrace.Radius = this.ActorComp.ScaledRadius),
				(o = TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.SphereTrace,
					PROFILE_KEY,
				)),
				(t = this.SphereTrace.HitResult),
				o && t.bBlockingHit
					? ((o = t.LocationZ_Array.Get(0)),
						(this.CharHeightAboveGround = this.StartLocation.Z - o))
					: (this.CharHeightAboveGround = e)),
			this.CharHeightAboveGround
		);
	}
	IsInAir() {
		return (
			this.UnifiedStateComponent?.PositionState ===
			CharacterUnifiedStateTypes_1.ECharPositionState.Air
		);
	}
	SetSpeedLock() {
		this.SpeedLockFrame = 5;
	}
	get FallingIntoWater() {
		return this.IsFallingIntoWater;
	}
	set FallingIntoWater(e) {
		this.IsFallingIntoWater = e;
	}
	MoveCharacter(e, t, o = "") {
		this.UnifiedStateComponent?.PositionState ===
		CharacterUnifiedStateTypes_1.ECharPositionState.Ground
			? (e.DivisionEqual(t),
				this.ActorComp.KuroMoveAlongFloor(
					e.ToUeVector(),
					t,
					o || "MoveCharacter",
				))
			: this.ActorComp.AddActorWorldOffset(
					e.ToUeVector(),
					o || "MoveCharacter",
					!0,
				),
			this.ActorComp.ResetAllCachedTime();
	}
	SetWalkOffLedgeRecord(e) {
		e
			? (--this.WalkOffCount,
				0 === this.WalkOffCount &&
					((this.K7s = !0), (this.$7s = Time_1.Time.Frame)))
			: (++this.WalkOffCount,
				1 === this.WalkOffCount && ((this.K7s = !1), this.SetWalkOffLedge(!1)));
	}
	SetWalkOffLedge(e) {
		e
			? ((this.CharacterMovement.bCanWalkOffLedges = !0),
				(this.CharacterMovement.PerchRadiusThreshold = 0),
				(this.CharacterMovement.PerchAdditionalHeight = 40))
			: ((this.CharacterMovement.bCanWalkOffLedges = !1),
				(this.CharacterMovement.PerchRadiusThreshold =
					this.ActorComp.ScaledRadius),
				(this.CharacterMovement.PerchAdditionalHeight =
					2 * this.ActorComp.ScaledRadius));
	}
	LerpMaxAcceleration() {
		var e, t;
		this.DesireMaxAccelerationLerpTime <= 0 ||
			(this.UnifiedStateComponent?.MoveState !==
			this.AccelerationChangeMoveState
				? (this.DesireMaxAccelerationLerpTime = 0)
				: ((t = this.CurrentMovementSettings?.Acceleration),
					(this.DesireMaxAccelerationLerpTime -= this.DeltaTimeSeconds),
					(e =
						(this.MaxAccelerationLerpTime -
							this.DesireMaxAccelerationLerpTime) /
						this.MaxAccelerationLerpTime),
					(e = this.AccelerationLerpCurve.GetFloatValue(e)),
					(this.CharacterMovement.MaxAcceleration = e * t),
					(t = 0.8 * (MathUtils_1.MathUtils.Clamp(e, 1, 2) - 1) + 1),
					this.SetMaxSpeed(this.CurrentMovementSettings.SprintSpeed * t)));
	}
	UpdateGroundedRotation() {
		let e = 0,
			t = "";
		(t = this.ActorComp.UseControllerRotation.IsNearlyZero()
			? ((e = this.nFr.GetSpeed(
					Math.abs(
						this.ActorComp.InputRotator.Yaw -
							this.ActorComp.ActorRotationProxy.Yaw,
					),
				)),
				"Movement.UpdateGroundedRotation.ROTATION_MEDIUM")
			: ((e = 1500), "Movement.UpdateGroundedRotation.ROTATION_AIM")),
			this.SmoothCharacterRotation(
				this.ActorComp.InputRotator,
				e,
				this.DeltaTimeSeconds,
				!1,
				t,
			);
	}
	UpdateBaseMovement() {
		var e,
			t = this.ActorComp.Actor.BasedMovement;
		if (
			((this.HasBaseMovement === t.bRelativeRotation &&
				this.BasePrimitiveComponent === t.MovementBase) ||
				((this.HasBaseMovement = t.bRelativeRotation),
				(this.BasePrimitiveComponent = t.MovementBase),
				this.BasePrimitiveComponent &&
					this.HasBaseMovement &&
					(e =
						this.BasePrimitiveComponent.GetOwner()?.RootComponent
							?.AttachParent) &&
					((e = e.AttachParent?.GetOwner()) instanceof TsBaseCharacter_1.default
						? ((this.IsDeltaBaseSpeedNeedZ = !1),
							(o = e.GetEntityNoBlueprint()) &&
								o.GetComponent(99)?.SetTakeOverTick(!0))
						: e instanceof TsBaseItem_1.default &&
							(this.IsDeltaBaseSpeedNeedZ = !0))),
			this.HasBaseMovement && 2 === t?.MovementBase?.Mobility)
		) {
			var o = this.CharacterMovement.BaseDeltaQuat.Rotator();
			let e;
			(o.Roll = 0),
				(o.Pitch = 0),
				(this.DeltaBaseMovementQuat = o.Quaternion()),
				(this.DeltaBaseMovementYaw = o.Yaw),
				(this.DeltaBaseMovementOffset =
					this.CharacterMovement.BaseDeltaPosition),
				(e = MathUtils_1.MathUtils.IsNearlyZero(this.DeltaTimeSeconds)
					? new UE.Vector(0, 0, 0)
					: this.DeltaBaseMovementOffset.op_Division(this.DeltaTimeSeconds)),
				this.IsDeltaBaseSpeedNeedZ || (e.Z = 0),
				this.DeltaBaseMovementSpeed
					? MathUtils_1.MathUtils.LerpVector(
							this.DeltaBaseMovementSpeed,
							e,
							0.2,
							this.DeltaBaseMovementSpeed,
						)
					: (this.DeltaBaseMovementSpeed = e),
				(3e3 < Math.abs(this.DeltaBaseMovementSpeed.X) ||
					3e3 < Math.abs(this.DeltaBaseMovementSpeed.Y) ||
					3e3 < Math.abs(this.DeltaBaseMovementSpeed.Z)) &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Movement",
						6,
						"异常惯性速度",
						["Speed", this.DeltaBaseMovementSpeed],
						["BasedMovement", t.MovementBase.GetOwner()?.GetName()],
					),
				(this.HasDeltaBaseMovementData = !0);
		} else
			(this.DeltaBaseMovementOffset = void 0),
				(this.DeltaBaseMovementQuat = void 0),
				(this.DeltaBaseMovementYaw = 0),
				(this.DeltaBaseMovementSpeed = void 0),
				(this.HasDeltaBaseMovementData = !1);
	}
	SpeedScaled(e) {
		return e;
	}
	get CanMoveFromInput() {
		return this.CanMoveFromInputInternal;
	}
	set CanMoveFromInput(e) {
		this.CanMoveFromInputInternal = e;
	}
	CanMove() {
		return (
			this.CanMoveFromInputInternal &&
			(this.CanMoveWithDistanceInternal ||
				this.UnifiedStateComponent.IsInFighting)
		);
	}
	CanJumpPress() {
		return !1;
	}
	CanWalkPress() {
		return !1;
	}
	IsMovingToLocation() {
		return this.MoveController.IsMoving();
	}
	MoveToLocationEnd(e) {
		this.MoveController.MoveEnd(e);
	}
	StopMoveToLocation() {
		this.MoveController.StopMove();
	}
	MoveAlongPath(e) {
		this.MoveController.IsMoving() &&
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Movement",
					51,
					"[BaseMoveComponent.MoveAlongPath]正在移动中，停止当前移动",
					["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
					["Actor", this.ActorComp?.Owner?.GetName()],
					["IsRunning", this.MoveToLocationLogic.IsRunning],
				),
			this.MoveController.StopMove()),
			(this.IsStopInternal = !1),
			this.MoveToLocationLogic.MoveAlongPath(e);
	}
	get MoveController() {
		return (
			this.MoveControllerInternal ||
				(this.MoveControllerInternal =
					new MoveToLocationLogic_1.MoveToLocationController(
						this.Entity,
						this.MoveToLocationLogic,
					)),
			this.MoveControllerInternal
		);
	}
	get MoveToLocationLogic() {
		return (
			this.MoveToLocationLogicInternal ||
				((this.MoveToLocationLogicInternal =
					new BaseMoveCharacter_1.BaseMoveCharacter()),
				this.MoveToLocationLogicInternal.Init(this.Entity)),
			this.MoveToLocationLogicInternal
		);
	}
	SetTurnRate(e) {
		this.TurnRate = e;
	}
	ResetTurnRate() {
		this.TurnRate = 1;
	}
	SetAirControl(e) {
		this.CharacterMovement.AirControl = e;
	}
	ResetAirControl() {
		this.CharacterMovement.AirControl = 0.05;
	}
	OnClear() {
		return super.OnClear(), (this.K7s = !1), !(this.$7s = 0);
	}
});
(BaseMoveComponent.BaseMoveInheritCurveInternal = void 0),
	(BaseMoveComponent.VelocityAdditionTotal = Vector_1.Vector.Create()),
	(BaseMoveComponent.VelocityAdditionDestination = Vector_1.Vector.Create()),
	(BaseMoveComponent = BaseMoveComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(36)],
			BaseMoveComponent,
		)),
	(exports.BaseMoveComponent = BaseMoveComponent);

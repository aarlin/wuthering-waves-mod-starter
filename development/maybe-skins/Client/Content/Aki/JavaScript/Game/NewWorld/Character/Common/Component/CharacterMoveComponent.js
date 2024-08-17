"use strict";
var CharacterMoveComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, o, i) {
			var r,
				n = arguments.length,
				a =
					n < 3
						? t
						: null === i
							? (i = Object.getOwnPropertyDescriptor(t, o))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, o, i);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(r = e[s]) &&
						(a = (n < 3 ? r(a) : 3 < n ? r(t, o, a) : r(t, o)) || a);
			return 3 < n && a && Object.defineProperty(t, o, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterMoveComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	CharacterAttributeTypes_1 = require("./Abilities/CharacterAttributeTypes"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	BaseMoveComponent_1 = require("./BaseMoveComponent"),
	CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController"),
	WhirlpoolPoint_1 = require("./Move/WhirlpoolPoint"),
	MIN_MOVE_SPEED = 20,
	GLIDING_CONTROL_OFFSET = 0.3,
	GLIDING_HEIGHT_THREDHOLD = 250,
	MAX_IN_WATER_SPEED = 800,
	GLIDE_STRENGTH_THREADHOLD = 10,
	SQUARE_MAX_INHERIT_SPEED = 1e6,
	cannotResponseInputTag = [-648310348, -2044964178, 1008164187, 191377386],
	JUMP_FRAME_COUNT = 3,
	SLIDE_JUMP_LERP_TIME = 100,
	SLIDE_JUMP_SPEED = 900,
	OVER_VELOCITY_PERCENT = 1.01,
	BASE_MOVE_INHERIT_TIME = 1.5,
	TRY_GLIDE_TIME = 500,
	NEAR_ZERO = 1e-6,
	MAX_WALK_FLOOR_ANGLE = 55;
class ForceFallingSpeedCache {
	constructor() {
		(this.ForceFallingSpeed = Vector_1.Vector.Create()),
			(this.Tag = 0),
			(this.HasForceFallingSpeed = !1);
	}
}
let CharacterMoveComponent = (CharacterMoveComponent_1 = class extends (
	BaseMoveComponent_1.BaseMoveComponent
) {
	constructor() {
		super(...arguments),
			(this.TimeScaleComp = void 0),
			(this.GlideComp = void 0),
			(this.SwimComp = void 0),
			(this.ForceFallingSpeedCache = void 0),
			(this.SkillComp = void 0),
			(this.LastGlidingControlTime = 0),
			(this.AttributeComponent = void 0),
			(this.TagComponent = void 0),
			(this.DeathComponent = void 0),
			(this.AirInertiaHandler = 0),
			(this.CanResponseInputTasks = new Array()),
			(this.TryGlideTime = 0),
			(this.qHr = new WhirlpoolPoint_1.WhirlpoolPoint()),
			(this.GHr = 0),
			(this.GroundedFrame = 0),
			(this.OnLand = () => {
				(this.GroundedTimeUe = UE.GameplayStatics.GetTimeSeconds(
					this.ActorComp.Actor,
				)),
					(this.GroundedFrame = Time_1.Time.Frame),
					1 === UE.Actor.GetKuroNetMode() &&
						this.ActorComp.IsAutonomousProxy &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.EntityOnLandedPush,
							this.Entity,
						);
			}),
			(this.OnPositionStateChanged = (e, t) => {
				switch (
					(e === CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
						((this.IsFallingIntoWater = !1),
						this.StopAddMove(this.AirInertiaHandler),
						(this.AirInertiaHandler = 0),
						this.ActorComp.IsRoleAndCtrlByMe) &&
						t === CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
						this.PlayerMotionRequest(Protocol_1.Aki.Protocol.n3s.Proto_BeLand),
					t)
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
						break;
					case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
						this.Entity.Active &&
							this.ActorComp.IsAutonomousProxy &&
							(this.Entity.GetComponent(18)?.FallInjure(),
							this.GetWhirlpoolEnable()) &&
							this.EndWhirlpool();
						break;
					case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
						this.HasBaseMovement &&
							!this.ActorComp.Actor.BasedMovement.bRelativeRotation &&
							this.DeltaBaseMovementSpeed &&
							(this.AirInertiaHandler = this.SetAddMoveWorld(
								this.DeltaBaseMovementSpeed,
								1.5,
								CharacterMoveComponent_1.BaseMoveInheritCurve,
								this.AirInertiaHandler,
							)),
							this.DeltaConveyBeltSpeed &&
								(this.AirInertiaHandler = this.SetAddMoveWorld(
									this.DeltaConveyBeltSpeed,
									1.5,
									CharacterMoveComponent_1.BaseMoveInheritCurve,
									this.AirInertiaHandler,
								));
				}
			}),
			(this.OnStateInherit = (e, t, o) => {
				var i;
				e?.Valid &&
					(i = e.GetComponent(161))?.Valid &&
					(this.CharacterMovement.ConsumeInputVector(),
					this.CharacterMovement.AddInputVector(
						i.CharacterMovement.GetLastInputVector(),
						!0,
					),
					this.ActorComp.SetInputDirect(i.ActorComp.InputDirectProxy),
					this.ActorComp.SetInputRotator(i.ActorComp.InputRotator),
					this.ActorComp.SetOverrideTurnSpeed(i.ActorComp.OverrideTurnSpeed),
					(this.HasMoveInput = i.HasMoveInput),
					(this.CharacterMovement.LastUpdateVelocity =
						i.GetLastUpdateVelocity()),
					this.ActorComp.ResetCachedVelocityTime(),
					0 !== t ||
						o ||
						((this.IsMoving = i.IsMoving),
						CharacterMoveComponent_1.TempVelocity.DeepCopy(
							i.ActorComp.ActorVelocityProxy,
						),
						(t = CharacterMoveComponent_1.TempVelocity.SizeSquared()) > 1e6 &&
							CharacterMoveComponent_1.TempVelocity.MultiplyEqual(
								Math.sqrt(1e6 / t),
							),
						this.Entity.GetComponent(185)?.HasTag(-1423251824) ||
							(this.ForceSpeed.DeepCopy(CharacterMoveComponent_1.TempVelocity),
							(this.Speed = this.ForceSpeed.Size2D()),
							(this.CharacterMovement.Velocity = this.ForceSpeed.ToUeVector())),
						i.ActorComp.Actor.BasedMovement.MovementBase ||
							(this.ActorComp.Actor.BasedMovement.MovementBase = void 0),
						(o = e.GetComponent(185)),
						0 === i.CharacterMovement.MovementMode || o?.HasTag(-2100129479)
							? this.CharacterMovement.SetMovementMode(1, 0)
							: 5 !== i.CharacterMovement.MovementMode &&
								this.CharacterMovement.SetMovementMode(
									i.CharacterMovement.MovementMode,
									i.CharacterMovement.CustomMovementMode,
								),
						(t = this.ActorComp.Actor.CharacterMovement.CurrentFloor),
						(e = i.ActorComp.Actor.CharacterMovement.CurrentFloor),
						(t.bBlockingHit = e.bBlockingHit),
						(t.bLineTrace = e.bLineTrace),
						(t.bWalkableFloor = e.bWalkableFloor),
						(t.FloorDist = e.FloorDist),
						(t.HitResult = e.HitResult),
						(t.LineDist = e.LineDist),
						UE.KuroStaticLibrary.SetBaseAndSaveBaseLocation(
							this.CharacterMovement,
							i.CharacterMovement.GetMovementBase(),
						)));
			}),
			(this.OnSprintTag = (e, t) => {
				if (t)
					switch (e) {
						case 24802177:
							this.PlayerMotionRequest(Protocol_1.Aki.Protocol.n3s.Proto_Spurt);
							break;
						case -268378154:
							this.PlayerMotionRequest(
								Protocol_1.Aki.Protocol.n3s.Proto_Pullback,
							);
							break;
						case 1965311544:
							this.PlayerMotionRequest(
								Protocol_1.Aki.Protocol.n3s.Proto_AirSprint,
							);
							break;
						case -2042325985:
							this.PlayerMotionRequest(
								Protocol_1.Aki.Protocol.n3s.Proto_BackFlip,
							);
					}
			}),
			(this.SlideTrans = void 0),
			(this.OnSpeedRatioAttributeChanged = (e, t, o) => {
				var i = this.UnifiedStateComponent?.MoveState,
					r = this.Entity.GetComponent(161);
				r?.Valid && r.ResetMaxSpeed(i);
			}),
			(this.OnResponseInputTagsChanged = (e, t) => {
				t
					? (0 === this.CannotResponseInputCount && (this.HasMoveInput = !1),
						++this.CannotResponseInputCount)
					: --this.CannotResponseInputCount;
			});
	}
	static get Dependencies() {
		return [3];
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
	SetForceFallingSpeed(e, t) {
		(this.ForceFallingSpeedCache.ForceFallingSpeed.X = 0),
			(this.ForceFallingSpeedCache.ForceFallingSpeed.Y = 0),
			(this.ForceFallingSpeedCache.ForceFallingSpeed.Z = e.Z),
			this.SetForceSpeed(this.ForceFallingSpeedCache.ForceFallingSpeed),
			(this.ForceFallingSpeedCache.ForceFallingSpeed.X = e.X),
			(this.ForceFallingSpeedCache.ForceFallingSpeed.Y = e.Y),
			(this.ForceFallingSpeedCache.ForceFallingSpeed.Z = 0),
			(this.ForceFallingSpeedCache.Tag = t),
			(this.ForceFallingSpeedCache.HasForceFallingSpeed = !0);
	}
	ConsumeForceFallingSpeed() {
		return (
			!!this.ForceFallingSpeedCache.HasForceFallingSpeed &&
			(this.TagComponent.HasTag(this.ForceFallingSpeedCache.Tag)
				? !(
						this.AnimComp.HasKuroRootMotion ||
						3 !== this.CharacterMovement.MovementMode ||
						((this.ForceFallingSpeedCache.ForceFallingSpeed.Z =
							this.CharacterMovement.Velocity.Z),
						this.SetForceSpeed(this.ForceFallingSpeedCache.ForceFallingSpeed),
						(this.ForceFallingSpeedCache.HasForceFallingSpeed = !1))
					)
				: (this.ForceFallingSpeedCache.HasForceFallingSpeed = !1))
		);
	}
	get WalkSpeed() {
		return this.CurrentMovementSettings.WalkSpeed;
	}
	get RunSpeed() {
		return this.CurrentMovementSettings.RunSpeed;
	}
	get SprintSpeed() {
		return this.CurrentMovementSettings.SprintSpeed;
	}
	get SwimSpeed() {
		return this.CurrentMovementSettings.NormalSwimSpeed;
	}
	get FastSwimSpeed() {
		return this.CurrentMovementSettings.FastSwimSpeed;
	}
	SetOverrideMaxFallingSpeed(e) {
		this.GHr = e;
	}
	ResetOverrideMaxFallingSpeed() {
		this.GHr = 0;
	}
	SetMaxSpeed(e) {
		let t = this.AttributeComponent?.GetCurrentValue(EAttributeId.R4n);
		(!t || t <= 0) && (t = CharacterAttributeTypes_1.PER_TEN_THOUSAND),
			(t /= CharacterAttributeTypes_1.PER_TEN_THOUSAND);
		var o = this.CharacterMovement.MovementMode;
		5 === o
			? (this.CharacterMovement.MaxFlySpeed = e * t)
			: (this.CharacterMovement.MaxWalkSpeed =
					3 === o ? (0 < this.GHr ? this.GHr : e) * t : e * t),
			this.ActorComp?.IsRoleAndCtrlByMe &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Movement",
					6,
					"SetMaxSpeed",
					["Entity", this.Entity.Id],
					["WalkSpeed", this.CharacterMovement.MaxWalkSpeed],
					["FlySpeed", this.CharacterMovement.MaxFlySpeed],
					["NewSpeed", e],
					["SpeedRatio", t],
				);
	}
	OnInitData() {
		return (
			super.OnInitData(),
			(this.CurrentGravityScale = new BaseMoveComponent_1.GravityScale()),
			(this.ForceFallingSpeedCache = new ForceFallingSpeedCache()),
			!0
		);
	}
	OnClear() {
		return (
			super.OnClear(),
			this.JumpDelayTimer &&
				TimerSystem_1.TimerSystem.Remove(this.JumpDelayTimer),
			CharacterMoveComponent_1.TempVelocity.Reset(),
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
			(this.AccelerationLerpTime = 0),
			(this.AccelerationChangeMoveState =
				CharacterUnifiedStateTypes_1.ECharMoveState.Other);
		var e = this.Entity.GetComponent(3);
		if (!e.Valid) return !1;
		(this.IsHidden = !1),
			(this.ActorComp = e),
			(this.CharacterMovement = e.Actor.CharacterMovement),
			(this.CharacterMovement.GravityScale = 2),
			(this.CharacterMovement.bRotationFollowBaseMovement = !0),
			this.CharacterMovement.SetWalkableFloorAngle(55),
			(this.AnimComp = this.Entity.GetComponent(160)),
			(this.GlideComp = this.Entity.GetComponent(50)),
			(this.SwimComp = this.Entity.GetComponent(66)),
			(this.AttributeComponent = this.Entity.GetComponent(156)),
			(this.TagComponent = this.Entity.GetComponent(185)),
			(this.DeathComponent = this.Entity.GetComponent(15)),
			(this.UnifiedStateComponent = this.Entity.GetComponent(89)),
			(this.SkillComp = this.Entity.GetComponent(33)),
			(this.TimeScaleComp = this.Entity.GetComponent(107)),
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
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				this.OnPositionStateChange,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnDirectionStateChanged,
				this.OnDirectionStateChange,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnLand,
				this.OnLand,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				this.OnPositionStateChanged,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.OnStateInherit,
			),
			(this.IsStopInternal = !1),
			this.InitBaseState(),
			this.AttributeComponent?.AddListener(
				EAttributeId.R4n,
				this.OnSpeedRatioAttributeChanged,
			),
			(this.CannotResponseInputCount = 0);
		for (const e of cannotResponseInputTag)
			this.TagComponent &&
				(this.TagComponent.HasTag(e) && ++this.CannotResponseInputCount,
				this.CanResponseInputTasks.push(
					this.TagComponent.ListenForTagAddOrRemove(
						e,
						this.OnResponseInputTagsChanged,
					),
				));
		return (
			this.InitTraceInfo(),
			this.TagComponent.AddTagAddOrRemoveListener(24802177, this.OnSprintTag),
			this.TagComponent.AddTagAddOrRemoveListener(-268378154, this.OnSprintTag),
			this.TagComponent.AddTagAddOrRemoveListener(1965311544, this.OnSprintTag),
			this.TagComponent.AddTagAddOrRemoveListener(
				-2042325985,
				this.OnSprintTag,
			),
			!0
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
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				this.OnPositionStateChange,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnDirectionStateChanged,
				this.OnDirectionStateChange,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnLand,
				this.OnLand,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				this.OnPositionStateChanged,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.OnStateInherit,
			),
			this.AttributeComponent?.RemoveListener(
				EAttributeId.R4n,
				this.OnSpeedRatioAttributeChanged,
			);
		for (const e of this.CanResponseInputTasks) e.EndTask();
		return (
			(this.CanResponseInputTasks.length = 0),
			(this.IsHidden = !1),
			this.TagComponent.RemoveTagAddOrRemoveListener(
				24802177,
				this.OnSprintTag,
			),
			this.TagComponent.RemoveTagAddOrRemoveListener(
				-268378154,
				this.OnSprintTag,
			),
			this.TagComponent.RemoveTagAddOrRemoveListener(
				1965311544,
				this.OnSprintTag,
			),
			this.TagComponent.RemoveTagAddOrRemoveListener(
				-2042325985,
				this.OnSprintTag,
			),
			!0
		);
	}
	OnActivate() {
		this.OnMoveStateChange(
			CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
			CharacterUnifiedStateTypes_1.ECharMoveState.Run,
		),
			2 === this.CharacterMovement.MovementMode &&
				this.CharacterMovement.SetMovementMode(1);
	}
	OnDisable() {
		this.DeltaTimeSeconds = 0;
	}
	OnTick(e) {
		if (
			!(e < MathUtils_1.MathUtils.SmallNumber) &&
			(super.OnTick(e), this.ActorComp) &&
			this.DeathComponent &&
			(this.qHr.GetEnable() || !this.DeathComponent.IsDead()) &&
			((this.CharHeightAboveGround = -1),
			(this.DeltaTimeSeconds = e * MathUtils_1.MathUtils.MillisecondToSecond),
			this.MoveController?.UpdateMove(this.DeltaTimeSeconds),
			0 < this.SpeedLockFrame && --this.SpeedLockFrame,
			this.IsJump && --this.JumpFrameCount,
			this.LerpMaxAcceleration(),
			this.UpdateBaseMovement(),
			!this.IsSpecialMove)
		)
			if (
				(this.IsStopInternal
					? (this.Speed = 0)
					: (this.Speed = this.ActorComp.ActorVelocityProxy.Size2D()),
				(this.IsMoving = this.Speed > 20),
				this.ActorComp.IsMoveAutonomousProxy)
			) {
				this.UpdateInputOrder(),
					this.UnifiedStateComponent?.Valid &&
						this.UnifiedStateComponent.PositionState ===
							CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
						this.UnifiedStateComponent.MoveState ===
							CharacterUnifiedStateTypes_1.ECharMoveState.Other &&
						!this.AnimComp.HasKuroRootMotion &&
						((o = Math.max(this.FallingHorizontalMaxSpeed, this.GHr)),
						this.Speed > 1.01 * o) &&
						(CharacterMoveComponent_1.TempVelocity.DeepCopy(
							this.ActorComp.ActorVelocityProxy,
						),
						(CharacterMoveComponent_1.TempVelocity.X *= o / this.Speed),
						(CharacterMoveComponent_1.TempVelocity.Y *= o / this.Speed),
						CharacterMoveComponent_1.TempVelocity.ContainsNaN() &&
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Movement",
								6,
								"Air Speed Limit has NaN",
								["velocity", CharacterMoveComponent_1.TempVelocity],
								["speed", this.Speed],
								["max", o],
							),
						(this.CharacterMovement.Velocity =
							CharacterMoveComponent_1.TempVelocity.ToUeVector()),
						(this.Speed = this.FallingHorizontalMaxSpeed),
						this.ActorComp.ResetCachedVelocityTime());
				var t,
					o =
						1 < this.Entity.GetTickInterval() &&
						this.AnimComp?.Valid &&
						this.ActorComp.Owner.WasRecentlyRenderedOnScreen();
				let i,
					r = (o && (i = this.AnimComp.GetMeshTransform()), !1);
				this.CanResponseInput()
					? (this.SetInfoVar(),
						(t = this.ActorComp.ActorRotationProxy.Pitch),
						this.UpdateFacing(),
						(r ||= t !== this.ActorComp.ActorRotationProxy.Pitch),
						this.CacheVar())
					: (this.HasMoveInput = !1),
					this.qHr.GetEnable()
						? ((r = this.NHr()),
							this.qHr.OnTick(
								this.DeltaTimeSeconds *
									(this.TimeScaleComp?.CurrentTimeScale ?? 1),
							) || this.EndWhirlpool())
						: (this.UpdateAddMoveSpeed(
								this.TimeScaleComp?.CurrentTimeScale ?? 1,
							) && (r = !0),
							this.UpdateAddMoveOffset() && (r = !0)),
					o && r && this.AnimComp.SetModelBuffer(i, e),
					this.OnTickGravityScale(),
					this.ActorComp.SetInputRotatorByNumber(
						this.ActorComp.InputRotator.Pitch,
						this.ActorComp.InputRotator.Yaw + this.DeltaBaseMovementYaw,
						this.ActorComp.InputRotator.Roll,
					),
					ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
						this.PrintAnimInstanceMovementInfo(),
					this.UpdateMoveChain(),
					this.TryGlideTime &&
						(this.TrySetGlide() && (this.TryGlideTime = 0),
						(this.TryGlideTime = Math.max(this.TryGlideTime - e, 0)));
			} else
				this.CanResponseInput()
					? (this.SetInfoVar(), this.UpdateFacing(), this.CacheVar())
					: (this.HasMoveInput = !1);
	}
	ContainsTag(e) {
		return this.TagComponent?.HasTag(e) ?? !1;
	}
	JumpRelease() {
		this.ActorComp.Actor.StopJumping();
	}
	JumpCheck() {
		return !(
			!this.CanResponseInput() ||
			this.ContainsTag(-291592299) ||
			(this.UnifiedStateComponent?.PositionState !==
				CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
				this.UnifiedStateComponent?.PositionState !==
					CharacterUnifiedStateTypes_1.ECharPositionState.Ski)
		);
	}
	CanJumpPress() {
		if (this.GroundedFrame > Time_1.Time.Frame - 2) return !1;
		var e = this.Entity.GetComponent(33),
			t = this.UnifiedStateComponent?.PositionState,
			o = this.UnifiedStateComponent?.MoveState;
		switch (t) {
			case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
			case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
			case CharacterUnifiedStateTypes_1.ECharPositionState.Ski:
				return (!e.Valid || e.CheckJumpCanInterrupt()) && this.JumpCheck();
			case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
				return o === CharacterUnifiedStateTypes_1.ECharMoveState.Glide
					? Time_1.Time.WorldTime - this.LastGlidingControlTime > 0.3
					: (CharacterUnifiedStateTypes_1.ECharMoveState.Slide, !0);
			default:
				return !1;
		}
	}
	CanWalkPress() {
		return (
			this.UnifiedStateComponent?.PositionState ===
			CharacterUnifiedStateTypes_1.ECharPositionState.Ground
		);
	}
	LimitMaxSpeed() {
		this.VelocityVector.FromUeVector(this.ActorComp.ActorVelocityProxy);
		var e = this.VelocityVector.Size(),
			t = this.CurrentMovementSettings?.SprintSpeed;
		t < e &&
			(this.VelocityVector.MultiplyEqual(t / e),
			this.CharacterMovement.Velocity.Set(
				this.VelocityVector.X,
				this.VelocityVector.Y,
				this.VelocityVector.Z,
			),
			this.ActorComp.ResetCachedVelocityTime());
	}
	OnJump() {
		var e = this.Entity.GetComponent(160);
		e.Valid && e.MainAnimInstance && e.MainAnimInstance.Montage_Stop(0),
			(this.JumpFrameCount = 3),
			this.AnimComp.OnJump();
	}
	JumpPress() {
		if (!this.CheckInHit() && this.CanJumpPress()) {
			var e = this.UnifiedStateComponent?.PositionState,
				t = e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
				o = e === CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
			if (t || o)
				this.TagComponent?.RemoveTag(-1371021686),
					(o = this.Entity.GetComponent(33)).Valid &&
						o.CurrentSkill &&
						(o.StopGroup1Skill("跳跃打断技能"), this.LimitMaxSpeed()),
					this.OnJump(),
					t &&
						this.PlayerMotionRequest(
							Protocol_1.Aki.Protocol.n3s.Proto_MotionJump,
						);
			else {
				if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
					if (this.JumpPressInAir()) return;
				} else if (
					e === CharacterUnifiedStateTypes_1.ECharPositionState.Ski &&
					this.JumpPressInSki()
				)
					return;
				this.TrySetGlide() || (this.TryGlideTime = 500);
			}
		}
	}
	CheckInHit() {
		return !(
			!this.TagComponent?.HasTag(-1503953470) &&
			!this.TagComponent?.HasTag(-2044964178)
		);
	}
	JumpPressInAir() {
		var e;
		return !(
			this.CheckInHit() ||
			((e = this.UnifiedStateComponent?.MoveState) ===
			CharacterUnifiedStateTypes_1.ECharMoveState.Glide
				? (this.GlideComp?.Valid &&
						(this.GlideComp.ExitGlideState(),
						(this.LastGlidingControlTime = Time_1.Time.WorldTime)),
					0)
				: e === CharacterUnifiedStateTypes_1.ECharMoveState.Soar
					? (this.GlideComp?.Valid &&
							(this.GlideComp.ExitSoarState(),
							(this.LastGlidingControlTime = Time_1.Time.WorldTime)),
						0)
					: e !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide ||
						(CharacterMoveComponent_1.TempVelocity.FromUeVector(
							this.CharacterMovement.Kuro_GetBlockDirectWhenMove(),
						),
						this.AnimComp?.Valid &&
							(this.SlideTrans ||
								(this.SlideTrans = Transform_1.Transform.Create()),
							MathUtils_1.MathUtils.LookRotationUpFirst(
								CharacterMoveComponent_1.TempVelocity,
								Vector_1.Vector.UpVectorProxy,
								this.TmpQuat,
							),
							this.SlideTrans.Set(
								this.ActorComp.ActorLocationProxy,
								this.TmpQuat,
								this.ActorComp.ActorScaleProxy,
							),
							this.AnimComp.SetTransformWithModelBuffer(
								this.SlideTrans.ToUeTransform(),
								100,
							)),
						(CharacterMoveComponent_1.TempVelocity.Z = 0),
						CharacterMoveComponent_1.TempVelocity.Normalize() ||
							CharacterMoveComponent_1.TempVelocity.DeepCopy(
								this.ActorComp.ActorForwardProxy,
							),
						CharacterMoveComponent_1.TempVelocity.MultiplyEqual(
							900 / CharacterMoveComponent_1.TempVelocity.Size2D(),
						),
						(this.CharacterMovement.Velocity =
							CharacterMoveComponent_1.TempVelocity.ToUeVector()),
						this.OnJump(),
						this.CharacterMovement.SetMovementMode(3),
						this.PlayerMotionRequest(
							Protocol_1.Aki.Protocol.n3s.Proto_MotionJump,
						),
						0))
		);
	}
	JumpPressInSki() {
		var e;
		return (
			!this.CheckInHit() &&
			!!(e = this.Entity.GetComponent(32)) &&
			(CharacterMoveComponent_1.TempVelocity.FromUeVector(
				this.ActorComp.ActorForwardProxy,
			),
			this.AnimComp?.Valid &&
				(this.SlideTrans || (this.SlideTrans = Transform_1.Transform.Create()),
				MathUtils_1.MathUtils.LookRotationUpFirst(
					CharacterMoveComponent_1.TempVelocity,
					e.SlideForward,
					this.TmpQuat,
				),
				this.SlideTrans.Set(
					this.ActorComp.ActorLocationProxy,
					this.TmpQuat,
					this.ActorComp.ActorScaleProxy,
				),
				this.AnimComp.SetTransformWithModelBuffer(
					this.SlideTrans.ToUeTransform(),
					100,
				)),
			(CharacterMoveComponent_1.TempVelocity.Z = 0),
			CharacterMoveComponent_1.TempVelocity.Normalize() ||
				CharacterMoveComponent_1.TempVelocity.DeepCopy(
					this.ActorComp.ActorForwardProxy,
				),
			CharacterMoveComponent_1.TempVelocity.MultiplyEqual(
				this.ActorComp.ActorVelocityProxy.Size2D(),
			),
			(this.CharacterMovement.Velocity =
				CharacterMoveComponent_1.TempVelocity.ToUeVector()),
			this.OnJump(),
			e.OnJump(),
			this.PlayerMotionRequest(Protocol_1.Aki.Protocol.n3s.Proto_MotionJump),
			!0)
		);
	}
	TrySetGlide() {
		if (
			this.UnifiedStateComponent?.PositionState ===
			CharacterUnifiedStateTypes_1.ECharPositionState.Air
		) {
			var e = this.UnifiedStateComponent.MoveState;
			if (
				e !== CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
				e !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
				!this.TagComponent?.HasTag(-8769906) &&
				Time_1.Time.WorldTime - this.LastGlidingControlTime > 0.3 &&
				(this.GetHeightAboveGround() > 250 ||
					this.TagComponent?.HasTag(-654554827)) &&
				FormationAttributeController_1.FormationAttributeController.GetValue(
					1,
				) > 10
			) {
				if ((e = this.Entity.GetComponent(33)).Valid && e.CurrentSkill) {
					if (!e.CheckGlideCanInterrupt()) return !1;
					e.StopGroup1Skill("滑翔打断技能"), this.LimitMaxSpeed();
				}
				return (
					this.GlideComp?.Valid &&
						(ModelManager_1.ModelManager.CharacterModel?.TestSoarOn
							? this.GlideComp.EnterSoarState()
							: this.GlideComp.EnterGlideState(),
						this.StopAddMove(this.AirInertiaHandler),
						(this.AirInertiaHandler = 0),
						(this.LastGlidingControlTime = Time_1.Time.WorldTime)),
					!0
				);
			}
		}
		return !1;
	}
	PlayerMovementInput(e) {
		var t = this.Entity.GetComponent(26);
		if (!t?.GetSitDownState()) {
			if (
				((t = this.Entity.GetComponent(33)),
				t?.Valid &&
					this.ContainsTag(1996624497) &&
					!this.ContainsTag(-652371212))
			) {
				if (
					!this.CanResponseInput() ||
					!t.IsMainSkillReadyEnd ||
					e.SizeSquared() < 1e-6
				)
					return;
				t.StopGroup1Skill("移动打断技能");
			}
			switch (this.UnifiedStateComponent?.PositionState) {
				case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
					this.ActorComp.Actor.AddMovementInput(
						e,
						this.AnimComp?.Valid ? this.AnimComp.GetWalkRunMix() : 1,
						!1,
					);
					break;
				case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
				case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
					this.ActorComp.Actor.AddMovementInput(e, 1, !1);
			}
		}
	}
	UpdateInputOrder() {
		this.CanResponseInput() &&
			this.PlayerMovementInput(this.ActorComp.InputDirect);
	}
	SmoothCharacterRotationByValue(
		e,
		t,
		o,
		i,
		r,
		n = "Movement.SmoothCharacterRotationByValue",
	) {
		this.LockedRotation ||
			((this.TempRotator.Pitch = e),
			(this.TempRotator.Yaw = t),
			(this.TempRotator.Roll = o),
			(e = this.ActorComp.ActorRotationProxy),
			this.TempRotator.Equals(e)) ||
			(MathUtils_1.MathUtils.RotatorInterpConstantTo(
				e,
				this.TempRotator,
				r,
				i,
				this.TempRotator,
			),
			this.ActorComp.SetActorRotationWithPriority(
				this.TempRotator.ToUeRotator(),
				n,
				0,
				!1,
				!1,
			));
	}
	UpdateInAirRotation() {
		!this.UnifiedStateComponent ||
			(this.UnifiedStateComponent.MoveState !==
				CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
				this.UnifiedStateComponent.MoveState !==
					CharacterUnifiedStateTypes_1.ECharMoveState.Slide) ||
			this.SmoothCharacterRotation(
				this.ActorComp.InputRotator,
				TsBaseRoleConfig_1.tsBaseRoleConfig.SmoothCharacterRotationSpeed,
				this.DeltaTimeSeconds,
				!1,
				"Movement.UpdateInAirRotation",
			);
	}
	SetAddMoveSpeed(e, t) {
		return (
			(e = this.ActorComp.ActorRotation.RotateVector(e)),
			this.SetAddMoveWorld(e, -1, void 0, t)
		);
	}
	SetAddMoveSpeedWithMesh(e, t) {
		var o;
		e
			? ((o = this.VelocityAdditionMapByMesh.get(e) ?? 0),
				(t = this.ActorComp.ActorRotation.RotateVector(t)),
				(o = this.SetAddMoveWorld(t, -1, void 0, o)) &&
					this.VelocityAdditionMapByMesh.set(e, o))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Game",
					15,
					"[CharacterMoveComponent.SetAddMoveSpeedWithMesh] 叠加位移失败，mesh为空",
				);
	}
	SetAddMove(e, t, o, i, r, n, a) {
		return (
			(e = this.ActorComp.ActorRotation.RotateVector(e)),
			this.SetAddMoveWorld(e, t, o, i, void 0, r, n, a)
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
	SetGravityScale(e, t, o, i, r) {
		(1 === e && 1 === t && 1 === o) ||
			((this.CurrentGravityScale.ScaleUp = e),
			(this.CurrentGravityScale.ScaleDown = t),
			(this.CurrentGravityScale.ScaleTop = o),
			(this.CurrentGravityScale.VelocityTop = i),
			(this.CurrentGravityScale.Duration = r),
			(this.CurrentGravityScale.ElapsedTime = 0));
	}
	GetLastUpdateVelocity() {
		return this.CharacterMovement.GetLastUpdateVelocity();
	}
	get CharacterWeight() {
		return this.CreatureProperty ? this.CreatureProperty.重量 : 0;
	}
	get HasSwimmingBlock() {
		return (
			this.CharacterMovement.CustomMovementMode ===
				CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM &&
			0 < this.CharacterMovement.Kuro_GetBlockDirectWhenMove().SizeSquared()
		);
	}
	UpdateSkillRotation() {
		return (
			!!this.SkillComp &&
			!(
				!this.SkillComp.Active ||
				!this.SkillComp.UpdateAllSkillRotator(this.DeltaTimeSeconds)
			)
		);
	}
	UpdateFacing() {
		if (this.CanUpdateMovingRotation()) {
			var e = this.Entity.GetComponent(26);
			if (!e?.GetSitDownState())
				if (this.ActorComp.OverrideTurnSpeed)
					this.SmoothCharacterRotation(
						this.ActorComp.InputRotator,
						this.ActorComp.OverrideTurnSpeed,
						this.DeltaTimeSeconds,
						!1,
						"Movement.UpdateFacing",
					),
						this.ActorComp.SetOverrideTurnSpeed(void 0);
				else if (
					!this.UpdateSkillRotation() &&
					this.IsInputDrivenCharacter &&
					!(0 < this.AnimComp.BattleIdleEndTime)
				)
					if (((e = this.UnifiedStateComponent), e?.Valid)) {
						if (((e = e.PositionState), !this.ContainsTag(1996624497)))
							switch (e) {
								case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
									this.UpdateGroundedRotation();
									break;
								case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
									this.UpdateInAirRotation();
							}
					} else this.UpdateGroundedRotation();
		} else this.UpdateSkillRotation();
	}
	SpeedScaled(e) {
		return this.TimeScaleComp
			? e * this.TimeScaleComp.CurrentTimeScale * this.ActorComp.TimeDilation
			: e;
	}
	CanMove() {
		return super.CanMove() && !this.ContainsTag(-2044964178);
	}
	SetChain(e, t) {
		(this.ConfigChainLengthSquared = e < 0 ? -1 : e * e),
			this.ChainCenter.FromUeVector(t || this.ActorComp.GetInitLocation());
	}
	UpdateMoveChain() {
		var e;
		this.ConfigChainLengthSquared < 0 ||
			((this.CurrentChainLengthSquared = Math.max(
				this.CurrentChainLengthSquared,
				this.ConfigChainLengthSquared,
			)),
			(e = Vector_1.Vector.DistSquared2D(
				this.ActorComp.ActorLocationProxy,
				this.ChainCenter,
			)) > this.CurrentChainLengthSquared
				? (this.ChainCenter.Subtraction(
						this.ActorComp.ActorLocationProxy,
						CharacterMoveComponent_1.TempVelocity,
					),
					(CharacterMoveComponent_1.TempVelocity.Z = 0),
					CharacterMoveComponent_1.TempVelocity.MultiplyEqual(
						(Math.sqrt(e) - Math.sqrt(this.CurrentChainLengthSquared)) /
							CharacterMoveComponent_1.TempVelocity.Size2D(),
					),
					this.MoveCharacter(
						CharacterMoveComponent_1.TempVelocity,
						this.DeltaTimeSeconds,
					))
				: e > this.ConfigChainLengthSquared &&
					(this.CurrentChainLengthSquared = e));
	}
	PlayerMotionRequest(e) {
		var t = Protocol_1.Aki.Protocol.Fns.create();
		(t.y3n = e), Net_1.Net.Call(16502, t, () => {});
	}
	NHr() {
		var e,
			t = this.qHr.GetAlpha();
		return !(
			1 < t ||
			((e = CharacterMoveComponent_1.VelocityAdditionDestination),
			Vector_1.Vector.Lerp(this.qHr.BeginLocation, this.qHr.ToLocation, t, e),
			this.ActorComp.SetActorLocation(e.ToUeVector(), "移动.被吸引", !1),
			0)
		);
	}
	BeginWhirlpool(e, t, o, i, r = -1, n = 0) {
		var a = this.CharacterMovement;
		(a.GravityScale = 0),
			this.Entity.GetComponent(158).SetMoveState(
				CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp,
			),
			a.SetMovementMode(3),
			this.SetForceFallingSpeed(Vector_1.Vector.ZeroVector, 31862857),
			this.qHr.Begin(e, t, o, i, r, n);
	}
	EndWhirlpool() {
		(this.CharacterMovement.GravityScale = 2), this.qHr.OnEnd();
	}
	GetWhirlpoolEnable() {
		return this.qHr.GetEnable();
	}
	GetWhirlpoolId() {
		return this.qHr.GetId();
	}
	CompareWhirlpoolPriority(e) {
		return e < this.qHr.GetMoveTime();
	}
	UpdateWhirlpoolLocation(e) {
		this.qHr.UpdateLocation(e);
	}
});
(CharacterMoveComponent.TempVelocity = Vector_1.Vector.Create()),
	(CharacterMoveComponent = CharacterMoveComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(161)],
			CharacterMoveComponent,
		)),
	(exports.CharacterMoveComponent = CharacterMoveComponent);

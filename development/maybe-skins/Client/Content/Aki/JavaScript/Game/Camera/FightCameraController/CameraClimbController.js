"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraClimbController = void 0);
const UE = require("ue"),
	Time_1 = require("../../../Core/Common/Time"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StateBase_1 = require("../../../Core/Utils/StateMachine/StateBase"),
	StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	GlobalData_1 = require("../../GlobalData"),
	CameraControllerBase_1 = require("./CameraControllerBase"),
	IS_DEBUG = !1;
class DefaultState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments), (this.gle = 0);
	}
	OnEnter() {
		this.gle = 0;
	}
	OnUpdate(e) {
		(this.gle += e * this.Owner.ElapseTimeScale),
			this.gle > this.Owner.PrepTime && this.StateMachine.Switch(2);
	}
}
class CenterState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments),
			(this.fle = Rotator_1.Rotator.Create()),
			(this.ple = Rotator_1.Rotator.Create()),
			(this.gle = 0);
	}
	CanReEnter() {
		return !0;
	}
	OnReEnter() {
		this.OnEnter();
	}
	OnEnter() {
		this.fle.DeepCopy(this.Owner.Camera.CurrentCamera.ArmRotation),
			this.ple.DeepCopy(this.Owner.Camera.PlayerRotator),
			(this.gle = 0);
	}
	OnUpdate(e) {
		var t;
		this.Owner.Camera.IsModifiedArmRotation
			? this.StateMachine.Switch(0)
			: ((t =
					(e / this.Owner.FadeInCenterTime) *
					this.Owner.AdditionalArmLength *
					this.Owner.ElapseTimeScale),
				(this.Owner.Camera.DesiredCamera.ArmLength =
					this.Owner.Camera.CurrentCamera.ArmLength + t),
				(this.Owner.Camera.IsModifiedArmLength = !0),
				(this.gle += e),
				(t = this.gle / this.Owner.FadeInCenterTime),
				(t = MathUtils_1.MathUtils.BlendEaseIn(
					0,
					1,
					t,
					this.Owner.CenterStateBlendInExp,
				)),
				Rotator_1.Rotator.Lerp(
					this.fle,
					this.ple,
					t,
					this.Owner.Camera.DesiredCamera.ArmRotation,
				),
				(this.Owner.Camera.IsModifiedArmRotation = !0),
				this.gle > this.Owner.FadeInCenterTime && this.StateMachine.Switch(2));
	}
}
class ReadyState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments), (this.gle = 0);
	}
	OnEnter() {
		this.gle = 0;
	}
	OnUpdate(e) {
		this.Owner.Camera.IsModifiedArmRotation
			? this.StateMachine.Switch(0)
			: this.Owner.IsMoving
				? ((this.gle += e * this.Owner.ElapseTimeScale),
					this.gle > this.Owner.MoveDelayTime && this.StateMachine.Switch(3))
				: (this.gle = 0);
	}
}
class AdjustState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments), (this.vle = !1);
	}
	OnEnter() {
		this.vle = !1;
	}
	OnUpdate(e) {
		var t, i, a, r;
		this.Owner.Camera.IsModifiedArmRotation
			? this.StateMachine.Switch(0)
			: this.Owner.IsMoving
				? ((r = Vector_1.Vector.Create()),
					this.Owner.Camera.PlayerRotator.Vector(r),
					(i = Vector_1.Vector.Create()),
					this.Owner.UpdateInterp(
						e,
						this.Owner.DefaultInterpSpeed,
						this.Owner.MoveDirection,
					),
					this.Owner.Camera.DesiredCamera.ArmRotation.Vector(i),
					!(t =
						Math.abs(
							Math.acos(Vector_1.Vector.DotProduct(r, i)) *
								MathUtils_1.MathUtils.RadToDeg,
						) <= this.Owner.ApplicableAngleWithCharacter) && this.vle
						? ((a = Vector_1.Vector.Create()),
							r.CrossProduct(i, a),
							(i = Vector_1.Vector.Create()),
							a.Normalize()
								? r.RotateAngleAxis(
										this.Owner.ApplicableAngleWithCharacter,
										a,
										i,
									)
								: i.DeepCopy(r),
							i.Rotation(this.Owner.Camera.DesiredCamera.ArmRotation),
							(this.Owner.Camera.IsModifiedArmRotation = !0),
							(this.vle = !0))
						: (this.vle = t),
					MathUtils_1.MathUtils.IsNearlyEqual(
						this.Owner.Camera.CurrentCamera.ArmLength,
						this.Owner.DefaultArmLength,
					) ||
						((a =
							this.Owner.DefaultArmLength -
							this.Owner.Camera.CurrentCamera.ArmLength),
						(r = this.Owner.ArmLengthSpeed * e),
						Math.abs(r) > Math.abs(a)
							? (this.Owner.Camera.DesiredCamera.ArmLength =
									this.Owner.DefaultArmLength)
							: (this.Owner.Camera.DesiredCamera.ArmLength =
									this.Owner.Camera.CurrentCamera.ArmLength +
									(r = 0 < a ? r : -r)),
						(this.Owner.Camera.IsModifiedArmLength = !0)))
				: this.StateMachine.Switch(4);
	}
}
class FadeOutState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments), (this.gle = 0);
	}
	OnEnter() {
		this.gle = 0;
	}
	OnUpdate(e) {
		var t;
		this.Owner.Camera.IsModifiedArmRotation
			? this.StateMachine.Switch(0)
			: this.Owner.IsMoving
				? this.StateMachine.Switch(3)
				: this.gle >= this.Owner.FadeOutDuration
					? this.StateMachine.Switch(2)
					: ((this.gle += e),
						(t = MathUtils_1.MathUtils.RangeClamp(
							this.gle,
							0,
							this.Owner.FadeOutDuration,
							this.Owner.DefaultInterpSpeed,
							0,
						)),
						this.Owner.UpdateInterp(e, t, this.Owner.MoveDirection));
	}
}
class ReachThePeakState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments),
			(this.Mle = Vector_1.Vector.Create()),
			(this.Sle = Rotator_1.Rotator.Create());
	}
	OnEnter() {
		this.Sle.DeepCopy(this.Owner.Camera.PlayerRotator),
			(this.Sle.Pitch = this.Owner.ReachThePeakPitch),
			this.Sle.Vector(this.Mle);
	}
	OnUpdate(e) {
		this.Owner.Camera.IsModifiedArmRotation
			? this.StateMachine.Switch(0)
			: this.Owner.UpdateInterp(e, this.Owner.ReachThePeakSpeed, this.Mle);
	}
}
class CameraClimbController extends CameraControllerBase_1.CameraControllerBase {
	constructor(e) {
		super(e),
			(this.FadeOutDuration = -0),
			(this.PrepTime = -0),
			(this.MoveDelayTime = -0),
			(this.DefaultInterpSpeed = 0),
			(this.ReferToMoveSpeed = 0),
			(this.AdditionalArmLength = 0),
			(this.FadeInCenterTime = -0),
			(this.CenterStateBlendInExp = 0),
			(this.DefaultArmLength = 0),
			(this.ArmLengthSpeed = 0),
			(this.DesiredAngle = 0),
			(this.PitchUpRate = 0),
			(this.PitchDownRate = 0),
			(this.ApplicableAngleWithCharacter = 0),
			(this.StopInputDelay = 0),
			(this.ReachThePeakSpeed = 0),
			(this.ReachThePeakPitch = 0),
			(this.LargeAngleTurnThreshold = 0),
			(this.LargeAngleTurnDelay = 0),
			(this.StartInputDelay = 0),
			(this.ElapseTimeScale = 1),
			(this.IsMoving = !1),
			(this.Ele = Vector_1.Vector.Create()),
			(this.yle = 0),
			(this.Ile = 0),
			(this.MoveDirection = Vector_1.Vector.Create()),
			(this.Lz = Vector_1.Vector.Create()),
			(this.Tz = Vector_1.Vector.Create()),
			(this.OnCharClimbStartExit = (e, t) => {
				this.Camera.CharacterEntityHandle.Id === e &&
					this.Tle(t) &&
					(3 === this.Lle.CurrentState
						? this.Lle.Switch(5)
						: 1 === this.Lle.CurrentState && this.Lle.Switch(0));
			}),
			(this.Lle = new StateMachine_1.StateMachine(this)),
			this.Lle.AddState(0, DefaultState),
			this.Lle.AddState(1, CenterState),
			this.Lle.AddState(2, ReadyState),
			this.Lle.AddState(3, AdjustState),
			this.Lle.AddState(4, FadeOutState),
			this.Lle.AddState(5, ReachThePeakState),
			this.Lle.Start(0);
	}
	Name() {
		return "ClimbController";
	}
	OnInit() {
		this.SetConfigMap(1, "FadeOutDuration"),
			this.SetConfigMap(2, "PrepTime"),
			this.SetConfigMap(3, "MoveDelayTime"),
			this.SetConfigMap(4, "DefaultInterpSpeed"),
			this.SetConfigMap(5, "ReferToMoveSpeed"),
			this.SetConfigMap(6, "AdditionalArmLength"),
			this.SetConfigMap(7, "FadeInCenterTime"),
			this.SetConfigMap(8, "CenterStateBlendInExp"),
			this.SetConfigMap(9, "DefaultArmLength"),
			this.SetConfigMap(10, "ArmLengthSpeed"),
			this.SetConfigMap(11, "DesiredAngle"),
			this.SetConfigMap(13, "PitchUpRate"),
			this.SetConfigMap(12, "PitchDownRate"),
			this.SetConfigMap(14, "ApplicableAngleWithCharacter"),
			this.SetConfigMap(16, "ReachThePeakSpeed"),
			this.SetConfigMap(17, "ReachThePeakPitch"),
			this.SetConfigMap(18, "LargeAngleTurnThreshold"),
			this.SetConfigMap(19, "LargeAngleTurnDelay"),
			this.SetConfigMap(15, "StopInputDelay"),
			this.SetConfigMap(20, "StartInputDelay");
	}
	OnEnable() {
		var e =
			this.Camera.CharacterEntityHandle.Entity.GetComponent(
				31,
			).GetExitClimbType();
		this.Tle(e) ? this.Lle.Switch(0) : this.Lle.Switch(1),
			this.Camera.CameraAdjustController.Lock(this),
			this.Camera.CameraAutoController.Lock(this),
			this.Camera.CameraSidestepController.Lock(this),
			this.Ele.Reset(),
			(this.yle =
				Time_1.Time.Now +
				this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.Ile = 0),
			(this.IsMoving = !1),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharClimbStartExit,
				this.OnCharClimbStartExit,
			);
	}
	OnDisable() {
		this.Camera.CameraAdjustController.Unlock(this),
			this.Camera.CameraAutoController.Unlock(this),
			this.Camera.CameraSidestepController.Unlock(this),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.CharClimbStartExit,
				this.OnCharClimbStartExit,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.CharClimbStartExit,
					this.OnCharClimbStartExit,
				);
	}
	UpdateCustomEnableCondition() {
		return this.Camera.ContainsTag(504239013);
	}
	UpdateInternal(e) {
		var t =
			this.Camera.CharacterEntityHandle.Entity.GetComponent(52).GetMoveVector();
		(this.Lz.X = t.X),
			(this.Lz.Y = t.Y),
			this.Dle(this.Lz)
				? Time_1.Time.Now > this.yle
					? (this.Ele.DeepCopy(this.Lz),
						this.Lz.Set(0, this.Ele.Y, this.Ele.X),
						this.Camera.Character.CharacterActorComponent.ActorQuatProxy.RotateVector(
							this.Lz,
							this.MoveDirection,
						),
						(this.IsMoving = !0),
						(t =
							this.Camera.CharacterEntityHandle.Entity.GetComponent(161).Speed),
						(this.ElapseTimeScale =
							t > this.ReferToMoveSpeed ? t / this.ReferToMoveSpeed : 1),
						(this.yle =
							Time_1.Time.Now +
							this.LargeAngleTurnDelay *
								TimeUtil_1.TimeUtil.InverseMillisecond))
					: this.IsMoving &&
						Time_1.Time.Now > this.Ile &&
						((this.IsMoving = !1),
						(this.yle =
							Time_1.Time.Now +
							this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond))
				: this.IsMoving &&
					((t =
						this.Camera.CharacterEntityHandle.Entity.GetComponent(161).Speed),
					(this.ElapseTimeScale =
						t > this.ReferToMoveSpeed ? t / this.ReferToMoveSpeed : 1)),
			this.Lle.Update(e);
	}
	Dle(e) {
		var t = e.X || e.Y;
		if (this.IsMoving)
			if (t) {
				if (
					((this.Ile =
						Time_1.Time.Now +
						this.StopInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
					this.Ele.X * e.X + this.Ele.Y * e.Y >
						Math.cos(
							this.LargeAngleTurnThreshold * MathUtils_1.MathUtils.DegToRad,
						))
				)
					return (
						(this.yle =
							Time_1.Time.Now +
							this.LargeAngleTurnDelay *
								TimeUtil_1.TimeUtil.InverseMillisecond),
						(e =
							this.Camera.CharacterEntityHandle.Entity.GetComponent(161).Speed),
						(this.ElapseTimeScale =
							e > this.ReferToMoveSpeed ? e / this.ReferToMoveSpeed : 1),
						!1
					);
			} else
				this.yle =
					Time_1.Time.Now +
					this.LargeAngleTurnDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
		else if (
			((this.Ile =
				Time_1.Time.Now +
				this.StopInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
			!t)
		)
			return (
				(this.yle =
					Time_1.Time.Now +
					this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
				!1
			);
		return !0;
	}
	UpdateInterp(e, t, i) {
		var a = this.Camera.Character.CharacterActorComponent.ActorForwardProxy,
			r =
				((i =
					((s =
						(this.Lz.DeepCopy(a),
						this.Tz.DeepCopy(i),
						Math.abs(
							Math.acos(this.Lz.DotProduct(this.Tz)) *
								MathUtils_1.MathUtils.RadToDeg,
						))) > this.DesiredAngle
						? (this.Lz.CrossProduct(this.Tz, this.Tz),
							this.Tz.CrossProduct(this.Lz, this.Tz),
							(s = this.DesiredAngle * MathUtils_1.MathUtils.DegToRad),
							this.Lz.MultiplyEqual(Math.cos(s)),
							this.Tz.MultiplyEqual(Math.sin(s)),
							this.Lz.AdditionEqual(this.Tz))
						: this.Lz.DeepCopy(i),
					this.Camera.CurrentCamera.ArmRotation.Vector(this.Tz),
					this.Tz.X * a.Y - this.Tz.Y * a.X)),
				this.Tz.X * this.Lz.Y - this.Tz.Y * this.Lz.X),
			s = this.Lz.X * a.Y - this.Lz.Y * a.X;
		(a = i * r < 0 && i * s < 0),
			MathUtils_1.MathUtils.LerpDirect2dByMaxAngle(
				this.Tz,
				this.Lz,
				this.Lz.Z < 0 ? this.PitchDownRate : this.PitchUpRate,
				e * t * this.ElapseTimeScale,
				a,
				this.Lz,
			),
			(r = this.Camera.DesiredCamera.ArmRotation);
		MathUtils_1.MathUtils.LookRotationForwardFirst(
			this.Lz,
			Vector_1.Vector.UpVectorProxy,
			r,
		),
			(this.Camera.IsModifiedArmRotation = !0);
	}
	Tle(e) {
		return 2 === e || 7 === e || 8 === e || 9 === e;
	}
}
exports.CameraClimbController = CameraClimbController;

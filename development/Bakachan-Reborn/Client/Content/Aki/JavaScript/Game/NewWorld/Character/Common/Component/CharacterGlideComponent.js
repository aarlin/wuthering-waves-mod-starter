"use strict";
var CharacterGlideComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, o) {
			var i,
				a = arguments.length,
				n =
					a < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, r))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(t, e, r, o);
			else
				for (var h = t.length - 1; 0 <= h; h--)
					(i = t[h]) &&
						(n = (a < 3 ? i(n) : 3 < a ? i(e, r, n) : i(e, r)) || n);
			return 3 < a && n && Object.defineProperty(e, r, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterGlideComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
	FLYING_GRAVITY = 15,
	FLYING_FRICTION = 0.1,
	FLYING_DECELERATION = 0.068,
	FLYING_ACCELERATOR = 55,
	FLYING_MAX_SPEED = 650,
	FLYING_MAX_FALLING_SPEED = 250,
	SOAR_MAX_NORMAL_ANGLE = 45,
	SOAR_NORMAL_SPEED = 80,
	SOAR_AIRFRICTION = 0.1,
	SOAR_AERODYNAMICS = 5,
	SOAR_ROTATE_SPEED = 80,
	SOAR_TURN_SPEED_SQR_THRESHOLD = 1e4,
	SOAR_PITCH_MIN = 20,
	SOAR_PITCH_MAX = 90,
	SOAR_PITCH_AVERAGE = 55,
	SOAR_INPUT_MIN_SPEED = 500,
	SOAR_INPUT_MAX_SPEED = 1e3,
	soarGravity = new UE.Vector(0, 0, -2e3),
	SOAR_NORMAL_SPEED_NO_INPUT_ROLL = 45,
	SOAR_NORMAL_SPEED_NO_INPUT_PTICH = 10,
	DEBUG_DRAW = !1,
	redColor = new UE.LinearColor(1, 0, 0, 1),
	greenColor = new UE.LinearColor(0, 1, 0, 1);
let CharacterGlideComponent = (CharacterGlideComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.s3o = void 0),
			(this._Vr = void 0),
			(this.Xte = void 0),
			(this.oRe = void 0),
			(this.uVr = void 0),
			(this.cVr = Vector_1.Vector.Create()),
			(this.mVr = Vector_1.Vector.Create()),
			(this.dVr = Quat_1.Quat.Create()),
			(this.CVr = Vector_1.Vector.Create()),
			(this.gVr = !1),
			(this.fVr = 0),
			(this.pVr = (t) => {
				this.Xte?.HasTag(921953316)
					? this.s3o.CharacterMovement.KuroFlying(
							t,
							0,
							0.1,
							0.068,
							55,
							650,
							250,
						)
					: this.s3o.CharacterMovement.KuroFlying(
							t,
							15,
							0.1,
							0.068,
							55,
							650,
							250,
						);
			}),
			(this.vVr = (t) => {
				var e, r, o;
				this.nXt &&
					this.s3o &&
					(e = this.s3o.CharacterMovement) &&
					(this.CalculateSoarQuat(),
					this.dVr.RotateVector(
						Vector_1.Vector.UpVectorProxy,
						CharacterGlideComponent_1.Lz,
					),
					(r = this.oRe?.HasKuroRootMotion),
					(o = !this.nXt.InputDirectProxy.IsZero()),
					this.gVr
						? this.s3o.Speed > 1e3 && (this.gVr = !1)
						: this.fVr < Time_1.Time.Frame &&
							!r &&
							this.s3o.Speed < 500 &&
							(this.gVr = !0),
					r
						? this.dVr.RotateVector(Vector_1.Vector.UpVectorProxy, this.mVr)
						: this.gVr || !o
							? (this.nXt.ActorQuatProxy.Inverse(CharacterGlideComponent_1.az),
								CharacterGlideComponent_1.az.RotateVector(
									this.mVr,
									CharacterGlideComponent_1.Lz,
								),
								(r =
									Math.atan2(
										CharacterGlideComponent_1.Lz.Y,
										CharacterGlideComponent_1.Lz.Z,
									) * MathUtils_1.MathUtils.RadToDeg),
								(o =
									Math.atan2(
										Math.sqrt(
											MathUtils_1.MathUtils.Square(
												CharacterGlideComponent_1.Lz.Z,
											) +
												MathUtils_1.MathUtils.Square(
													CharacterGlideComponent_1.Lz.Y,
												),
										),
										CharacterGlideComponent_1.Lz.X,
									) * MathUtils_1.MathUtils.RadToDeg),
								(r =
									MathUtils_1.MathUtils.InterpConstantTo(r, 0, t, 45) *
									MathUtils_1.MathUtils.DegToRad),
								(o =
									MathUtils_1.MathUtils.InterpConstantTo(o, 20, t, 10) *
									MathUtils_1.MathUtils.DegToRad),
								(CharacterGlideComponent_1.Lz.X = Math.cos(o)),
								(o = Math.sin(o)),
								(CharacterGlideComponent_1.Lz.Y = o * Math.sin(r)),
								(CharacterGlideComponent_1.Lz.Z = o * Math.cos(r)),
								this.nXt.ActorQuatProxy.RotateVector(
									CharacterGlideComponent_1.Lz,
									this.mVr,
								))
							: (this.cVr.DeepCopy(this.nXt.InputDirectProxy),
								this.cVr.Normalize(),
								(o = 80 * this.cVr.Y * t),
								CharacterGlideComponent_1.Gue.Set(0, o, 0),
								this.nXt.AddActorLocalRotation(
									CharacterGlideComponent_1.Gue.ToUeRotator(),
								),
								CharacterGlideComponent_1.Gue.Quaternion(
									CharacterGlideComponent_1.az,
								),
								CharacterGlideComponent_1.az.Multiply(this.dVr, this.dVr),
								CharacterGlideComponent_1.Lz.DeepCopy(
									this.nXt.ActorVelocityProxy,
								),
								CharacterGlideComponent_1.az.RotateVector(
									CharacterGlideComponent_1.Lz,
									CharacterGlideComponent_1.Lz,
								),
								(e.Velocity = CharacterGlideComponent_1.Lz.ToUeVector()),
								CharacterGlideComponent_1.az.RotateVector(this.mVr, this.mVr),
								(r = 45 * this.cVr.X * MathUtils_1.MathUtils.DegToRad),
								(this.CVr.X = Math.sin(r)),
								(this.CVr.Y = 0),
								(this.CVr.Z = Math.cos(r)),
								this.dVr.RotateVector(this.CVr, this.CVr),
								this.dVr.RotateVector(
									Vector_1.Vector.UpVectorProxy,
									CharacterGlideComponent_1.Lz,
								),
								this.MVr(this.CVr),
								(o = 80 * t),
								Vector_1.Vector.DirectLerp(this.mVr, this.CVr, o, this.mVr)),
					this.dVr.Inverse(CharacterGlideComponent_1.az),
					CharacterGlideComponent_1.az.RotateVector(
						this.mVr,
						CharacterGlideComponent_1.Lz,
					),
					CharacterGlideComponent_1.Lz.Z < 0 &&
						((CharacterGlideComponent_1.Lz.X = -CharacterGlideComponent_1.Lz.X),
						(CharacterGlideComponent_1.Lz.Y = -CharacterGlideComponent_1.Lz.Y),
						this.dVr.RotateVector(CharacterGlideComponent_1.Lz, this.mVr)),
					CharacterGlideComponent_1.Lz.Z < 0 &&
						((CharacterGlideComponent_1.Lz.Z = 0),
						CharacterGlideComponent_1.Lz.Normalize() ||
							CharacterGlideComponent_1.Lz.DeepCopy(
								this.nXt.ActorForwardProxy,
							)),
					UE.KuroMovementBPLibrary.KuroSoar(
						t,
						e,
						0.1,
						5,
						soarGravity,
						this.mVr.ToUeVector(),
					) || this.ExitSoarState(),
					this.nXt.ResetAllCachedTime());
			}),
			(this.OnStateInherit = (t, e, r) => {
				t?.Valid &&
					(t = t.GetComponent(50))?.Valid &&
					0 === e &&
					!r &&
					(this.mVr.DeepCopy(t.mVr),
					this.dVr.DeepCopy(t.dVr),
					this.CVr.DeepCopy(t.CVr),
					(this.gVr = t.gVr));
			}),
			(this.SVr = (t, e) => {
				this._Vr?.SetParaglidingIsAscent(e);
			});
	}
	OnStart() {
		return (
			(this.nXt = this.Entity.CheckGetComponent(3)),
			(this.s3o = this.Entity.CheckGetComponent(161)),
			(this._Vr = this.Entity.CheckGetComponent(69)),
			(this.Xte = this.Entity.CheckGetComponent(185)),
			(this.oRe = this.Entity.CheckGetComponent(160)),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveGlide,
				this.pVr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveSoar,
				this.vVr,
			),
			(this.uVr = this.Xte.ListenForTagAddOrRemove(-1819043374, this.SVr)),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.OnStateInherit,
			),
			!0
		);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveGlide,
				this.pVr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveSoar,
				this.vVr,
			),
			this.uVr.EndTask(),
			(this.uVr = void 0),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.OnStateInherit,
			),
			!0
		);
	}
	EnterGlideState() {
		this.s3o.CharacterMovement.SetMovementMode(
			6,
			CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE,
		);
	}
	ExitGlideState() {
		this.s3o.CharacterMovement.SetMovementMode(3, 0);
	}
	EnterSoarState() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Test", 6, "EnterSoarState", ["Entity", this.Entity.Id]),
			this.s3o.CharacterMovement.SetMovementMode(
				6,
				CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR,
			),
			this.nXt.ClearInput(),
			this.CalculateSoarQuat(),
			this.dVr.RotateVector(Vector_1.Vector.UpVectorProxy, this.mVr),
			(this.gVr = !1),
			(this.fVr = Time_1.Time.Frame);
	}
	ExitSoarState() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Test", 6, "ExitSoarState", ["Entity", this.Entity.Id]),
			this.s3o.CharacterMovement.SetMovementMode(3, 0);
	}
	CalculateSoarQuat() {
		var t;
		this.nXt.ActorVelocityProxy.IsNearlyZero()
			? this.dVr.DeepCopy(this.nXt.ActorQuatProxy)
			: (t = this.nXt.ActorVelocityProxy).SizeSquared2D() < 1e4
				? (CharacterGlideComponent_1.Lz.DeepCopy(this.nXt.ActorForwardProxy),
					0 < t.Z && CharacterGlideComponent_1.Lz.MultiplyEqual(-1),
					MathUtils_1.MathUtils.LookRotationForwardFirst(
						t,
						CharacterGlideComponent_1.Lz,
						this.dVr,
					))
				: MathUtils_1.MathUtils.LookRotationForwardFirst(
						t,
						Vector_1.Vector.UpVectorProxy,
						this.dVr,
					);
	}
	MVr(t) {
		var e, r;
		this.nXt &&
			((r = t.DotProduct(this.nXt.ActorForwardProxy)),
			(e = t.DotProduct(Vector_1.Vector.UpVectorProxy)),
			((e = Math.atan2(e, r) * MathUtils_1.MathUtils.RadToDeg) >= 20 &&
				e <= 90) ||
				((r =
					((MathUtils_1.MathUtils.WrapAngle(e - 55) < 0 ? 20 : 90) - e) *
					MathUtils_1.MathUtils.DegToRad),
				CharacterGlideComponent_1.Lz.Set(Math.cos(r), 0, Math.sin(r)),
				this.nXt.ActorQuatProxy.RotateVector(
					CharacterGlideComponent_1.Lz,
					CharacterGlideComponent_1.Lz,
				),
				Quat_1.Quat.FindBetween(
					this.nXt.ActorForwardProxy,
					CharacterGlideComponent_1.Lz,
					CharacterGlideComponent_1.az,
				),
				CharacterGlideComponent_1.az.RotateVector(t, t)));
	}
});
(CharacterGlideComponent.Lz = Vector_1.Vector.Create()),
	(CharacterGlideComponent.Gue = Rotator_1.Rotator.Create()),
	(CharacterGlideComponent.az = Quat_1.Quat.Create()),
	(CharacterGlideComponent = CharacterGlideComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(50)],
			CharacterGlideComponent,
		)),
	(exports.CharacterGlideComponent = CharacterGlideComponent);

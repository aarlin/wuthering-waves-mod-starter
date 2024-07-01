"use strict";
var CharacterSlideComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, i, r) {
			var o,
				s = arguments.length,
				a =
					s < 3
						? e
						: null === r
							? (r = Object.getOwnPropertyDescriptor(e, i))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, i, r);
			else
				for (var h = t.length - 1; 0 <= h; h--)
					(o = t[h]) &&
						(a = (s < 3 ? o(a) : 3 < s ? o(e, i, a) : o(e, i)) || a);
			return 3 < s && a && Object.defineProperty(e, i, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterSlideComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	SlideById_1 = require("../../../../../../Core/Define/ConfigQuery/SlideById"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	PreloadConstants_1 = require("../../../../../World/Controller/PreloadConstants"),
	CharacterNameDefines_1 = require("../../CharacterNameDefines"),
	CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
	CustomMovementDefine_1 = require("./CustomMovementDefine"),
	LEAVE_SLIDE_TIME = 0.25,
	LEAVE_SLIDE_MIN_HEIGHT = 5,
	PROFILE_KEY = "slide",
	CHANGE_FORWARD_ANGLE_THRESHOLD = 135,
	COMBINE_NORMAL_Z_THRESHOLD = 0.707,
	SLIDE_Z_THRESHOLD = 0.1,
	SKI_BRAKE_ANGLE_THRESHOLD = 135,
	SKI_MAX_INPUT_ANGLE = 135,
	DEFAULT_SKI_MAX_TURN_ANGLE = 50,
	DEFAULT_SKI_MAX_FALLING_SPEED = 5e3,
	DEFAULT_SKI_MAX_SPEED = 3500;
class SkiParams {
	constructor() {
		(this.InitSpeed = 700),
			(this.BaseAccForSpeedUp = 300),
			(this.BaseAccForSpeedDown = 300),
			(this.BaseTargetSpeed = 1e3),
			(this.SlopExtraTargetSpeed = 200),
			(this.SlopExtraAccel = 150),
			(this.TurnSpeed = 50),
			(this.IgnoreStepHeight = 20),
			(this.JumpTurnRate = 0.4);
	}
}
let CharacterSlideComponent = (CharacterSlideComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.Gce = void 0),
			(this.oRe = void 0),
			(this.W5r = void 0),
			(this.cBe = void 0),
			(this.Lie = void 0),
			(this.Nce = void 0),
			(this.Lz = Vector_1.Vector.Create()),
			(this.Tz = Vector_1.Vector.Create()),
			(this.M7o = Vector_1.Vector.Create()),
			(this.S7o = Vector_1.Vector.Create()),
			(this.AJr = Vector_1.Vector.Create()),
			(this.UJr = -0),
			(this.SlideForward = Vector_1.Vector.Create()),
			(this.GroundNormal = Vector_1.Vector.Create()),
			(this.pZo = new Array()),
			(this.PJr = new Set()),
			(this.wJr = 0),
			(this.BJr = 0),
			(this.SlideSwitchThisFrame = !1),
			(this.StandMode = !1),
			(this.LastAngleOffset = 0),
			(this.bJr = void 0),
			(this.qJr = void 0),
			(this.GJr = 0),
			(this.NJr = void 0),
			(this.OJr = !1),
			(this.kJr = void 0),
			(this.$Rn = void 0),
			(this.FJr = Vector_1.Vector.Create()),
			(this.wbn = Vector_1.Vector.Create()),
			(this.bbn = Vector_1.Vector.Create()),
			(this.hUe = (t, e) => {
				e !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
					(this.Gce.CharacterMovement.FallingLateralFriction = 0),
					e === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
						(this.bbn.DeepCopy(this.Hte.ActorForwardProxy),
						this.Gce.ResetTurnRate(),
						this.wbn.Equality(Vector_1.Vector.ZeroVectorProxy) ||
							(this.Lz.DeepCopy(this.wbn),
							this.FJr.Multiply(this.Lz.DotProduct(this.FJr), this.Tz),
							this.Lz.Subtraction(this.Tz, this.Tz),
							(e = Math.min(this.Tz.Size(), 3500)),
							this.Lz.DeepCopy(this.Hte.ActorForwardProxy),
							this.FJr.Multiply(this.Lz.DotProduct(this.FJr), this.M7o),
							this.Lz.Subtraction(this.M7o, this.M7o),
							this.M7o.Normalize() ||
								this.M7o.DeepCopy(this.Hte.ActorForwardProxy),
							this.M7o.MultiplyEqual(e),
							this.Gce.SetForceSpeed(this.M7o),
							this.wbn.Reset()));
			}),
			(this.VJr = !1),
			(this.HJr = (t) => {
				this.OJr &&
					(this.Hte.ActorForwardProxy.Multiply(this.NJr.InitSpeed, this.Lz),
					this.Gce.SetForceSpeed(this.Lz),
					(this.OJr = !1)),
					this.qbn(t, this.bbn),
					this.Gbn(this.Lz),
					UE.KuroMovementBPLibrary.KuroSki(
						t,
						this.Gce.CharacterMovement,
						this.GroundNormal.ToUeVector(),
						this.bbn.ToUeVector(),
						this.Lz.ToUeVector(),
						this.NJr.IgnoreStepHeight,
						void 0,
					) ||
						(this.jJr()
							? (this.Gce.CharacterMovement.SetMovementMode(1),
								this.W5r.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Run,
								))
							: this.Gce.CharacterMovement.SetMovementMode(3));
			}),
			(this.WJr = (t) => {
				var e = CharacterSlideComponent_1.SlideConfig,
					i = (this.M7o.DeepCopy(this.Hte.InputDirectProxy), this.M7o);
				let r = !1;
				if (i.Normalize())
					if (
						((r = e.Ski),
						this.Lz.DeepCopy(this.SlideForward),
						this.Lz.CrossProduct(Vector_1.Vector.UpVectorProxy, this.Tz),
						this.Tz.CrossProduct(this.Lz, this.AJr),
						this.AJr.Normalize())
					) {
						let r = !0;
						e.Ski &&
							((o =
								this.SlideForward.HeadingAngle() *
								MathUtils_1.MathUtils.RadToDeg),
							(s = i.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg),
							(r = Math.abs(MathUtils_1.MathUtils.WrapAngle(o - s)) < 135)) &&
							((o =
								this.Hte.ActorVelocityProxy.HeadingAngle() *
								MathUtils_1.MathUtils.RadToDeg),
							(s = MathUtils_1.MathUtils.WrapAngle(s - o)),
							Math.abs(s) > 135) &&
							((o =
								MathUtils_1.MathUtils.WrapAngle(o + 135 * Math.sign(s)) *
								MathUtils_1.MathUtils.DegToRad),
							i.Set(Math.cos(o), Math.sin(o), 0));
						var o,
							s = i.DotProduct(this.AJr);
						let a = 0;
						0 < s
							? ((a = s * e.SlideAccelUp),
								(o = this.Hte.ActorVelocityProxy.DotProduct(this.AJr)),
								e.Ski
									? (a *= MathUtils_1.MathUtils.RangeClamp(
											o,
											-e.SkiHorizontalInputSpeedThreshold.Max,
											-e.SkiHorizontalInputSpeedThreshold.Min,
											1,
											0,
										))
									: a * e.SlideAccel * t > o && (a = 0))
							: (a = s * e.SlideAccelDown),
							this.AJr.Multiply(a, this.Lz),
							r &&
								(this.Tz.MultiplyEqual(
									this.Tz.DotProduct(i) / this.Tz.SizeSquared(),
								),
								this.Lz.AdditionEqual(this.Tz)),
							this.Lz.MultiplyEqual(e.SlideAccel);
					} else i.Multiply(e.SlideAccel, this.Lz);
				else this.Lz.Reset();
				this.Lz.ContainsNaN() &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error("Movement", 6, "Slide speed has NaN", [
						"velocity",
						this.Lz,
					]);
				let a = 0,
					h = 0,
					n = 0,
					l = 0;
				(l = this.qJr
					? ((a = 0), (h = 0), (n = this.qJr.LimitSpeed))
					: ((a = this.BJr),
						(h = e.SlideFriction),
						r
							? ((n = e.SkiMaxSpHor), e.SkiMaxSpVer)
							: ((n = e.MaxSlideHorizontalSeed), -1))),
					this.Gce.CharacterMovement.KuroSlide(
						t,
						a,
						h,
						0.25 === this.UJr
							? this.Lz.ToUeVector()
							: Vector_1.Vector.ZeroVector,
						n,
						this.GroundNormal.ToUeVector(),
						l,
						CharacterSlideComponent_1.SpeedReduceCurve,
					)
						? (this.UJr = 0.25)
						: this.Gce.CharacterMovement.Kuro_GetBlockActorWhenMove()
							? (this.Gce.CharacterMovement.SetMovementMode(1), (this.VJr = !0))
							: ((this.UJr -= t),
								this.UJr < 0 &&
									this.KJr() &&
									(this.Gce.CharacterMovement.SetMovementMode(3),
									(this.VJr = !0)));
			}),
			(this.QJr = (t, e, i) => {
				0 !== e ||
					i ||
					((e = t.GetComponent(32)),
					this.W5r.MoveState !==
						CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
						this.W5r.MoveState !==
							CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
						e.W5r.MoveState !==
							CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
						e.W5r.MoveState !==
							CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) ||
					((this.UJr = e.UJr),
					this.SlideForward.DeepCopy(e.SlideForward),
					(this.wJr = e.wJr),
					(this.BJr = e.BJr),
					(this.SlideSwitchThisFrame = e.SlideSwitchThisFrame),
					(this.StandMode = e.StandMode),
					(this.LastAngleOffset = e.LastAngleOffset),
					(this.NJr = e.NJr),
					(this.qJr = e.qJr),
					(this.GJr = e.GJr));
			}),
			(this.YRn = (t, e) => {
				e ||
					(this.bJr && this.Gce.StopAddMove(this.bJr),
					this.Gce.ResetTurnRate(),
					this.Lie.RemoveTagAddOrRemoveListener(378770267, this.YRn));
			});
	}
	static get SlideConfig() {
		return (
			this.SlideConfigInternal || this.SetSlideConfig(0),
			this.SlideConfigInternal
		);
	}
	static SetSlideConfig(t) {
		if (this.SlideConfigInternal?.Id !== t.toString()) {
			this.SlideConfigInternal = SlideById_1.configSlideById.GetConfig(
				t.toString(),
			);
			var e,
				i,
				r = new Array();
			for ([e, i] of this.SlideConfigInternal.FallingLateralFrictions) {
				var o = [
					(o = Math.cos(e * MathUtils_1.MathUtils.DegToRad)) * o * o,
					o * o,
					o,
					1,
					i,
				];
				r.push(o);
			}
			for (let t = r.length - 1; 0 <= t; --t)
				for (let e = 0; e < t; ++e) {
					var s = r[e][t] / r[t][t];
					for (let i = 0; i < r[t].length; ++i) r[e][i] -= r[t][i] * s;
				}
			for (let t = 0; t < r.length; ++t) {
				for (let e = t + 1; e < r.length; ++e) {
					var a = r[e][t] / r[t][t];
					for (let i = 0; i < r[t].length; ++i) r[e][i] -= r[t][i] * a;
				}
				this.SlideFallingCoefficientArray[t] = r[t][4] / r[t][t];
			}
			this.SlideConfigInternal.SpeedReduceCurve
				? ResourceSystem_1.ResourceSystem.LoadAsync(
						this.SlideConfigInternal.SpeedReduceCurve,
						UE.CurveFloat,
						(t) => {
							this.SpeedReduceCurve = t;
						},
					)
				: (this.SpeedReduceCurve = void 0);
		}
	}
	static GetSlideFallingFriction(t) {
		this.SlideConfigInternal || this.SetSlideConfig(0);
		let e = 0;
		for (const i of this.SlideFallingCoefficientArray) e = e * t + i;
		return e;
	}
	static get JumpAddMoveCurve() {
		return (
			this.XJr ||
				(this.XJr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					PreloadConstants_1.SLIDE_JUMP_ADD_MOVE_CURVE,
					UE.CurveFloat,
				)),
			this.XJr
		);
	}
	static get Dependencies() {
		return [3, 161, 158];
	}
	Gbn(t) {
		let e = this.NJr.BaseAccForSpeedUp,
			i = this.NJr.BaseTargetSpeed;
		var r =
				(Math.acos(
					Vector_1.Vector.DotProduct(
						this.SlideForward,
						Vector_1.Vector.UpVectorProxy,
					),
				) *
					MathUtils_1.MathUtils.RadToDeg) /
				90,
			o = this.NJr.SlopExtraAccel * r,
			s =
				((r = this.NJr.SlopExtraTargetSpeed * r),
				Math.sign(
					Vector_1.Vector.DotProduct(
						this.Hte.ActorForwardProxy,
						this.SlideForward,
					),
				));
		(e += s * o),
			(i += s * r),
			this.qJr && ((e += this.qJr.Acceleration), (i += this.qJr.LimitSpeed)),
			(i = Math.min(i, 3500)),
			t.Set(e, this.NJr.BaseAccForSpeedDown, i);
	}
	qbn(t, e) {
		var i = this.Lz,
			r = this.Tz,
			o = this.M7o,
			s = this.S7o,
			a = this.NJr.TurnSpeed;
		let h = -50,
			n = 50;
		var l = this.Entity.GetComponent(95);
		i.DeepCopy(this.Hte.ActorForwardProxy),
			l?.Active &&
				((h = l.MinTurnAngle),
				(n = l.MaxTurnAngle),
				i.DeepCopy(l.SplineDirection)),
			this.SlideForward.CrossProduct(i, o),
			o.Normalize() || o.DeepCopy(this.Hte.ActorRightProxy),
			r.DeepCopy(this.Hte.InputDirectProxy),
			r.Normalize() ? o.Multiply(o.DotProduct(r), r) : r.Reset(),
			r.ContainsNaN() &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Movement", 51, "滑雪输入中有NaN", ["Input", r]),
			s.DeepCopy(this.Hte.ActorVelocityProxy),
			s.Normalize() || s.DeepCopy(this.Hte.ActorForwardProxy),
			(l = s.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg),
			(s = i.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg),
			(i = this.Obn(l - s)),
			(l = r.DotProduct(o) * a * t),
			(i = MathUtils_1.MathUtils.Clamp(i + l, h, n));
		(i = this.Obn(i + s)),
			e.FromUeVector(MathUtils_1.MathUtils.GetVector2dByAngle(i));
	}
	Obn(t) {
		let e = t;
		for (; 180 < e; ) e -= 360;
		for (; e < -180; ) e += 360;
		return e;
	}
	OnStart() {
		if (
			((this.Hte = this.Entity.GetComponent(3)),
			(this.Gce = this.Entity.GetComponent(161)),
			(this.oRe = this.Entity.GetComponent(160)),
			(this.Nce = this.Entity.GetComponent(52)),
			(this.W5r = this.Entity.GetComponent(158)),
			(this.cBe = this.Entity.GetComponent(33)),
			(this.Lie = this.Entity.GetComponent(185)),
			this.Lz.Reset(),
			this.AJr.Reset(),
			this.Lie?.Valid)
		)
			for (const t of CharacterSlideComponent_1.X2r)
				this.pZo.push(
					this.Lie.ListenForTagAnyCountChanged(t, (e) => {
						this.Moi(t, e);
					}),
				),
					this.Lie.HasTag(t) && this.PJr.add(t);
		return (
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.hUe,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveSlide,
				this.WJr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveSki,
				this.HJr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.QJr,
			),
			!0
		);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Entity,
			EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
			this.hUe,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveSlide,
				this.WJr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveSki,
				this.HJr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.QJr,
			);
		for (const t of this.pZo) t.EndTask();
		return !(this.pZo.length = 0);
	}
	OnTick(t) {
		!this.Hte?.IsMoveAutonomousProxy ||
			this.W5r.MoveState ===
				CharacterUnifiedStateTypes_1.ECharMoveState.Glide ||
			this.Gce.IsJump ||
			(this.cBe?.CurrentSkill
				? this.W5r?.MoveState ===
						CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
					this.Gce.CharacterMovement?.SetMovementMode(3)
				: this.Nce.IsInAutomaticFlightMode() ||
					(this.Lie.HasTag(378770267)
						? this.TickSkiMode(t)
						: this.TickSlideMode(t)));
	}
	$Jr(t, e) {
		(this.SlideSwitchThisFrame = !1),
			this.NJr
				? ((this.SlideSwitchThisFrame = !t && !this.StandMode),
					(this.StandMode = !0))
				: t
					? ((this.SlideSwitchThisFrame = !1),
						(this.StandMode =
							this.SlideForward.Z >
							Math.cos(
								((e.SlideModeSwitchRange.Min + e.SlideModeSwitchRange.Max) /
									2) *
									MathUtils_1.MathUtils.DegToRad,
							)))
					: this.StandMode
						? this.SlideForward.Z <
								Math.cos(
									e.SlideModeSwitchRange.Max * MathUtils_1.MathUtils.DegToRad,
								) && ((this.StandMode = !1), (this.SlideSwitchThisFrame = !0))
						: this.SlideForward.Z >
								Math.cos(
									e.SlideModeSwitchRange.Min * MathUtils_1.MathUtils.DegToRad,
								) && ((this.StandMode = !0), (this.SlideSwitchThisFrame = !0));
	}
	YJr(t) {
		var e, i;
		this.NJr
			? (this.Lz.FromUeVector(this.Gce.CharacterMovement.Velocity),
				(e =
					this.Lz.SizeSquared2D() < MathUtils_1.MathUtils.SmallNumber
						? this.Hte.ActorRotationProxy.Yaw
						: MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz)),
				this.Hte.SetInputRotatorByNumber(0, e, 0),
				this.Hte.SetOverrideTurnSpeed(this.NJr.TurnSpeed))
			: ((e = MathUtils_1.MathUtils.GetAngleByVector2D(this.SlideForward)),
				this.Lie.HasTag(-91611865) || this.StandMode
					? (this.Hte.SetInputRotatorByNumber(0, e, 0),
						(this.LastAngleOffset = 0))
					: (t || this.Hte.InputDirectProxy.IsNearlyZero()
							? this.Lz.DeepCopy(this.Hte.ActorForwardProxy)
							: this.Lz.DeepCopy(this.Hte.InputDirectProxy),
						(i = MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz)),
						(i = MathUtils_1.MathUtils.WrapAngle(i - e)),
						(t ||
							Math.abs(
								MathUtils_1.MathUtils.WrapAngle(this.LastAngleOffset - i),
							) > 135) &&
							(this.LastAngleOffset = 180 * Math.round(i / 180)),
						this.Hte.SetInputRotatorByNumber(0, e + this.LastAngleOffset, 0)),
				this.Hte.SetOverrideTurnSpeed(
					CharacterSlideComponent_1.SlideConfig.TurnSpeed,
				));
	}
	Moi(t, e) {
		0 === e ? this.PJr.delete(t) : this.PJr.add(t);
	}
	KJr() {
		var t;
		return !(t =
			(((t =
				ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject =
				this.Hte.Actor),
			(t.Radius = this.Hte.ScaledRadius),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				t,
				this.Hte.ActorLocationProxy,
			),
			this.Lz.DeepCopy(this.Hte.ActorLocationProxy),
			(this.Lz.Z -= this.Hte.ScaledHalfHeight - this.Hte.Radius + 5),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Lz),
			TraceElementCommon_1.TraceElementCommon.ShapeTrace(
				this.Hte.Actor.CapsuleComponent,
				t,
				"slide",
				"slide",
			)));
	}
	jJr() {
		var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
		(t.WorldContextObject = this.Hte.Actor),
			(t.Radius = this.Hte.ScaledRadius),
			this.Lz.DeepCopy(this.Hte.ActorLocationProxy),
			(this.Lz.Z -= this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz),
			this.Tz.DeepCopy(this.Hte.ActorLocationProxy),
			(this.Tz.Z -= this.Hte.ScaledHalfHeight),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz),
			t.ActorsToIgnore.Empty();
		for (const e of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
			t.ActorsToIgnore.Add(e);
		return TraceElementCommon_1.TraceElementCommon.ShapeTrace(
			this.Hte.Actor.CapsuleComponent,
			t,
			"slide",
			"slide",
		)
			? t.HitResult
			: void 0;
	}
	JJr() {
		var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
		(t.WorldContextObject = this.Hte.Actor),
			(t.Radius = this.Hte.ScaledRadius),
			this.Lz.DeepCopy(this.Hte.ActorLocationProxy),
			(this.Lz.Z -= this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz),
			Vector_1.Vector.UpVectorProxy.CrossProduct(this.SlideForward, this.M7o),
			this.M7o.CrossProduct(this.SlideForward, this.M7o),
			this.M7o.Normalize(),
			this.M7o.MultiplyEqual(100),
			this.Lz.Addition(this.M7o, this.Tz),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz),
			t.ActorsToIgnore.Empty();
		for (const e of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
			t.ActorsToIgnore.Add(e);
		return (
			!TraceElementCommon_1.TraceElementCommon.ShapeTrace(
				this.Hte.Actor.CapsuleComponent,
				t,
				"slide",
				"slide",
			) ||
			(TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
				t.HitResult,
				0,
				this.M7o,
			),
			this.M7o.AdditionEqual(this.SlideForward),
			!!this.M7o.Normalize() && this.M7o.Z < 0.707)
		);
	}
	OnJump() {
		this.Hte &&
			(this.wbn.DeepCopy(this.Hte.ActorVelocityProxy),
			this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
			this.FJr.Multiply(this.Lz.DotProduct(this.FJr), this.Tz),
			this.Lz.Subtraction(this.Tz, this.M7o),
			(this.bJr = this.Gce?.SetAddMoveWorld(
				this.M7o.ToUeVector(),
				2,
				void 0,
				this.bJr,
				void 0,
				2,
			)),
			this.Gce.SetTurnRate(this.NJr.JumpTurnRate),
			this.Lie.AddTagAddOrRemoveListener(378770267, this.YRn));
	}
	SetSkiAccel(t) {
		(this.W5r?.PositionState !==
			CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
			this.W5r?.MoveState !==
				CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) ||
			((this.GJr = t.Duration),
			(this.qJr = t),
			this.qJr.InstantSpeed &&
				((t = this.Hte.ActorVelocityProxy.Size()),
				(t = Math.min(t + this.qJr.InstantSpeed, 3500)),
				this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
				this.Lz.Normalize() || this.Lz.DeepCopy(this.Hte.ActorForwardProxy),
				this.Lz.MultiplyEqual(t),
				this.Gce.SetForceSpeed(this.Lz)),
			this.Lie.AddTag(-1940399338));
	}
	TickSlideMode(t) {
		if (this.VJr) this.VJr = !1;
		else if (
			0 < this.PJr.size ||
			(this.oRe?.Valid && this.oRe.HasKuroRootMotion)
		)
			this.W5r.MoveState ===
				CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
				this.Gce.CharacterMovement.SetMovementMode(3);
		else {
			let t = !1;
			var e = this.Gce.CharacterMovement.Kuro_GetBlockDirectWhenMove(),
				i = this.Gce.CharacterMovement.Kuro_GetBlockActorWhenMove(),
				r = CharacterSlideComponent_1.SlideConfig;
			if (
				(this.GroundNormal.Reset(),
				this.M7o.FromUeVector(this.Gce.CharacterMovement.Velocity),
				e.Z > 0.1 &&
					(this.NJr || this.M7o.Z < -MathUtils_1.MathUtils.KindaSmallNumber) &&
					i &&
					!i.ActorHasTag(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE))
			) {
				if (
					(this.SlideForward.FromUeVector(e),
					this.GroundNormal.DeepCopy(this.SlideForward),
					this.W5r.MoveState !==
						CharacterUnifiedStateTypes_1.ECharMoveState.Slide && !this.JJr())
				)
					return;
				this.W5r.MoveState !==
					CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
					(this.Gce.CharacterMovement.SetMovementMode(
						6,
						CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE,
					),
					this.W5r.SetMoveState(
						CharacterUnifiedStateTypes_1.ECharMoveState.Slide,
					),
					(t = !0),
					(this.wJr = 0),
					(this.UJr = 0.25));
			} else if (
				this.W5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide
			)
				return;
			Math.abs(this.wJr - this.SlideForward.Z) >
				MathUtils_1.MathUtils.KindaSmallNumber &&
				((this.wJr = this.SlideForward.Z),
				(this.BJr = CharacterSlideComponent_1.GetSlideFallingFriction(
					this.wJr,
				))),
				this.YJr(t),
				this.$Jr(t, r);
		}
	}
	TickSkiMode(t) {
		if (
			(0 < this.GJr &&
				((e = this.Hte.Owner.CustomTimeDilation),
				(this.GJr -= t * MathUtils_1.MathUtils.MillisecondToSecond * e),
				this.GJr < 0) &&
				((this.GJr = 0), (this.qJr = void 0), this.Lie.RemoveTag(-1940399338)),
			this.VJr)
		)
			this.VJr = !1;
		else if (
			this.W5r.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Ground ||
			this.W5r.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Ski
		)
			if (0 < this.PJr.size || (this.oRe?.Valid && this.oRe.HasKuroRootMotion))
				this.W5r.MoveState ===
					CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
					(this.Gce.CharacterMovement.SetMovementMode(1),
					this.W5r.SetMoveState(
						CharacterUnifiedStateTypes_1.ECharMoveState.Run,
					));
			else {
				this.GroundNormal.Reset(),
					this.M7o.FromUeVector(this.Gce.CharacterMovement.Velocity);
				let i = !1;
				if (
					((t = this.jJr())
						? ((this.$Rn = t.Components.Get(0)),
							(this.kJr = this.$Rn?.GetOwner()),
							TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
								t,
								0,
								this.FJr,
							))
						: ((this.$Rn = void 0), (this.kJr = void 0), this.FJr.Reset()),
					this.Lz.DeepCopy(this.FJr),
					this.Lz.SubtractionEqual(Vector_1.Vector.UpVectorProxy),
					this.JRn())
				) {
					if (
						(this.SlideForward.DeepCopy(this.FJr),
						this.GroundNormal.DeepCopy(this.SlideForward),
						this.W5r.MoveState !==
							CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
							!this.JJr())
					)
						return;
					this.W5r.MoveState !==
						CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
						(this.Gce.CharacterMovement.SetMovementMode(
							6,
							CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI,
						),
						this.W5r.SetMoveState(
							CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki,
						),
						(i = !0),
						(this.wJr = 0));
				} else if (
					this.W5r.MoveState !==
					CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki
				)
					return;
				var e = CharacterSlideComponent_1.SlideConfig;
				this.YJr(i), this.$Jr(i, e);
			}
	}
	EnterSkiMode(t) {
		if (((t = t.SkiConfig), !this.NJr)) {
			var e = ResourceSystem_1.ResourceSystem.SyncLoad(t, UE.BP_SkiConfig_C);
			if (!e?.IsValid())
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Movement",
						51,
						"获取滑雪参数DA失败",
						["DaPath", t],
						["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
					)
				);
			(this.NJr = new SkiParams()),
				(this.NJr.InitSpeed = e.初始速度),
				(this.NJr.BaseAccForSpeedUp = e.基础加速度),
				(this.NJr.BaseAccForSpeedDown = e.基础减速度),
				(this.NJr.BaseTargetSpeed = e.基础目标速度),
				(this.NJr.SlopExtraTargetSpeed = e.斜坡额外目标速度),
				(this.NJr.SlopExtraAccel = e.斜坡额外加速度),
				(this.NJr.TurnSpeed = e.转向速度),
				(this.NJr.IgnoreStepHeight = e.忽视阶梯高度),
				(this.NJr.JumpTurnRate = e.跳跃转向速度系数);
		}
		(this.OJr = !0),
			this.wbn.Reset(),
			this.Lie.AddTag(378770267),
			this.Gce.SetFallingHorizontalMaxSpeed(5e3);
	}
	ExitSkiMode() {
		(this.NJr = void 0),
			(this.OJr = !1),
			this.wbn.Reset(),
			this.Gce.ClearFallingHorizontalMaxSpeed(),
			this.Lie.RemoveTag(378770267),
			this.W5r.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Ski &&
				(this.Gce.CharacterMovement.SetMovementMode(1),
				this.W5r.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run));
	}
	JRn() {
		return !(
			!this.$Rn ||
			(this.kJr &&
				this.kJr.ActorHasTag(
					CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
				))
		);
	}
});
(CharacterSlideComponent.SlideConfigInternal = void 0),
	(CharacterSlideComponent.SlideFallingCoefficientArray = [0, 0, 0, 0]),
	(CharacterSlideComponent.SpeedReduceCurve = void 0),
	(CharacterSlideComponent.XJr = void 0),
	(CharacterSlideComponent.X2r = [-1503953470, 1008164187, -752177221]),
	(CharacterSlideComponent = CharacterSlideComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(32)],
			CharacterSlideComponent,
		)),
	(exports.CharacterSlideComponent = CharacterSlideComponent);

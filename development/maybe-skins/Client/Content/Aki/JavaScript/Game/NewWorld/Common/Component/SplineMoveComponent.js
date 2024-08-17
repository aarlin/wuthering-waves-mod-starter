"use strict";
var SplineMoveComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, i, s) {
			var n,
				o = arguments.length,
				r =
					o < 3
						? e
						: null === s
							? (s = Object.getOwnPropertyDescriptor(e, i))
							: s;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(t, e, i, s);
			else
				for (var h = t.length - 1; 0 <= h; h--)
					(n = t[h]) &&
						(r = (o < 3 ? n(r) : 3 < o ? n(e, i, r) : n(e, i)) || r);
			return 3 < o && r && Object.defineProperty(e, i, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SplineMoveComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	CurveUtils_1 = require("../../../../Core/Utils/Curve/CurveUtils"),
	PowerCurve3_1 = require("../../../../Core/Utils/Curve/PowerCurve3"),
	Quat_1 = require("../../../../Core/Utils/Math/Quat"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines"),
	CharacterAttributeTypes_1 = require("../../Character/Common/Component/Abilities/CharacterAttributeTypes"),
	CharacterUnifiedStateTypes_1 = require("../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	MAX_INPUT_COS = 0.707,
	FORWARD_BACKWARD_THRESHOLD = 0.5,
	FORECAST_DIST = 500,
	MAX_OFFSET_INCREASE = 1e5,
	DAMPING = 0.96,
	STANDARD_FPS = 60;
class SplineMoveParams {
	constructor(t, e, i) {
		(this.Id = t),
			(this.Spline = i),
			(this.CurrentMaxOffsetSquared = 0),
			(this.CurrentMaxOffset = 0),
			(this.InputLimitCos = 0),
			(this.InputLimitSin = 0),
			(this.Type = "PathLine"),
			(this.MaxOffsetDist = 0),
			(this.OnlyForward = !1),
			(this.InputLimitAngle = 0),
			(this.EdgeLimitCurve = CurveUtils_1.CurveUtils.DefaultLinear),
			(this.Type = e.Pattern.Type),
			(this.MaxOffsetDist = e.Pattern.MaxOffsetDistance ?? 0),
			(this.OnlyForward = e.Pattern.IsOneWay ?? !1),
			"RacingTrack" === e.Pattern.Type
				? (this.InputLimitAngle = e.Pattern.DirectionAngleLimit)
				: "SlideTrack" === e.Pattern.Type &&
					((this.InputLimitAngle = e.Pattern.DirectionAngleLimit),
					(this.EdgeLimitCurve = new PowerCurve3_1.PowerCurve3(
						e.Pattern.EdgeLimitCurveFactor,
					))),
			(this.CurrentMaxOffset = this.MaxOffsetDist + 1e5),
			(this.CurrentMaxOffsetSquared =
				this.CurrentMaxOffset * this.CurrentMaxOffset),
			"RacingTrack" === this.Type &&
				((this.InputLimitCos = Math.cos(
					this.InputLimitAngle * MathUtils_1.MathUtils.DegToRad,
				)),
				(this.InputLimitSin = Math.sin(
					this.InputLimitAngle * MathUtils_1.MathUtils.DegToRad,
				)));
	}
}
let SplineMoveComponent = (SplineMoveComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.Ssn = void 0),
			(this.Gce = void 0),
			(this.oRe = void 0),
			(this.aYo = void 0),
			(this.Lie = void 0),
			(this.Esn = void 0),
			(this.Uxr = void 0),
			(this.ysn = new Map()),
			(this.Isn = new Array()),
			(this.Tsn = void 0),
			(this.Xrr = Vector_1.Vector.Create()),
			(this.Lsn = 0),
			(this.Dsn = !0),
			(this.LastRightSpeed = 0),
			(this.MinTurnAngle = 0),
			(this.MaxTurnAngle = 0),
			(this.SplineDirection = Vector_1.Vector.Create()),
			(this.Wye = Vector_1.Vector.Create()),
			(this.Asn = Quat_1.Quat.Create()),
			(this.Usn = Vector_1.Vector.Create()),
			(this.Psn = Vector_1.Vector.Create()),
			(this.Due = Vector_1.Vector.Create()),
			(this.Aae = Vector_1.Vector.Create()),
			(this.Lz = Vector_1.Vector.Create()),
			(this.az = Quat_1.Quat.Create());
	}
	static get SplineMoveConfig() {
		return (
			this.xsn ||
				(this.xsn = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					this.DaPath,
					UE.Object,
				)),
			this.xsn
		);
	}
	get CurrentSplineMoveType() {
		return this.Tsn?.Type;
	}
	OnStart() {
		return (
			(this.Uxr = this.Disable("[SplineMoveComponent.OnStart] 默认Disable")),
			(this.Hte = this.Entity.GetComponent(1)),
			(0, RegisterComponent_1.isComponentInstance)(this.Hte, 3) &&
				(this.Ssn = this.Hte),
			(this.Gce = this.Entity.GetComponent(161)),
			(this.oRe = this.Entity.GetComponent(160)),
			(this.aYo = this.Entity.GetComponent(158)),
			(this.Lie = this.Entity.GetComponent(185)),
			(this.Esn = this.Entity.GetComponent(156)),
			!0
		);
	}
	OnEnd() {
		for (var [t] of this.ysn)
			ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
				t,
				this.Entity.Id,
				1,
			);
		return this.ysn.clear(), !(this.Isn.length = 0);
	}
	OnTick(t) {
		var e, i;
		this.Tsn
			? ((e = (i = this.Tsn.Spline).FindInputKeyClosestToWorldLocation(
					this.Hte.ActorLocationProxy.ToUeVector(),
				)),
				this.Wye.FromUeVector(i.GetLocationAtSplineInputKey(e, 1)),
				this.SplineDirection.DeepCopy(i.GetDirectionAtSplineInputKey(e, 1)),
				(this.SplineDirection.Z = 0),
				this.SplineDirection.Normalize(),
				MathUtils_1.MathUtils.LookRotationUpFirst(
					this.SplineDirection,
					Vector_1.Vector.UpVectorProxy,
					this.Asn,
				),
				(i = t * MathUtils_1.MathUtils.MillisecondToSecond),
				this.wsn(e, i),
				this.Xrr.DeepCopy(this.Due),
				this.Bsn())
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Movement", 6, "Tick in No SplineMove!"),
				(this.Uxr = this.Disable(
					"[SplineMoveComponent.OnTick] this.CurrentSplineMoveParams为false",
				)));
	}
	bsn(t) {
		if (this.Ssn && "RacingTrack" === this.Tsn.Type) {
			var e = this.Ssn.InputDirectProxy;
			(this.Lz.X = -this.SplineDirection.Y),
				(this.Lz.Y = this.SplineDirection.X),
				(this.Lz.Z = 0);
			let n = this.Lz.DotProduct(e);
			n < -this.Tsn.InputLimitSin
				? (n = -this.Tsn.InputLimitSin)
				: n > this.Tsn.InputLimitSin && (n = this.Tsn.InputLimitSin);
			e = this.Gce.CharacterMovement.MaxWalkSpeed * n;
			var i = this.Gce.CharacterMovement.MaxAcceleration,
				s = e - this.LastRightSpeed;
			i = i * t;
			let o = 0;
			Math.abs(s) > i
				? ((o =
						s * this.LastRightSpeed < 0
							? this.LastRightSpeed * Math.pow(0.96, 60 * t)
							: this.LastRightSpeed),
					(o += Math.sign(s) * i))
				: (o = e),
				this.Lz.MultiplyEqual(((this.LastRightSpeed + o) / 2) * t),
				this.Due.AdditionEqual(this.Lz),
				(this.LastRightSpeed = o);
		}
	}
	wsn(t, e) {
		this.Due.DeepCopy(this.Hte.ActorLocationProxy),
			this.bsn(e),
			this.Hte.ActorLocationProxy.Subtraction(this.Xrr, this.Lz);
		var i,
			s = 0 < this.Lz.DotProduct(this.SplineDirection);
		this.Tsn.OnlyForward && !s
			? (this.Xrr.Subtraction(this.Due, this.Aae),
				(s = this.SplineDirection.DotProduct(this.Aae)),
				this.SplineDirection.Multiply(s, this.Lz),
				this.Due.AdditionEqual(this.Lz))
			: ((s = this.Tsn.Spline),
				this.Psn.FromUeVector(s.GetDirectionAtSplineInputKey(this.Lsn, 1)),
				(this.Psn.Z = 0),
				this.Psn.Normalize() &&
					(this.Gce &&
						(this.Lz.FromUeVector(this.Gce.CharacterMovement.Velocity),
						Quat_1.Quat.FindBetween(this.Psn, this.SplineDirection, this.az),
						this.az.RotateVector(this.Lz, this.Lz),
						(this.Gce.CharacterMovement.Velocity = this.Lz.ToUeVector())),
					"RacingTrack" === this.Tsn.Type) &&
					(this.Usn.FromUeVector(s.GetLocationAtSplineInputKey(this.Lsn, 1)),
					this.Due.Subtraction(this.Usn, this.Aae),
					(this.Aae.Z = 0),
					this.Psn.Multiply(this.Aae.DotProduct(this.Psn), this.Lz),
					this.Aae.SubtractionEqual(this.Lz),
					this.az.RotateVector(this.Aae, this.Lz),
					(s = this.Due.Z),
					this.Wye.Addition(this.Lz, this.Due),
					(this.Due.Z = s)),
				(this.Lsn = t)),
			this.Wye.Subtraction(this.Due, this.Aae),
			(this.Aae.Z = 0),
			this.SplineDirection.Multiply(
				this.Aae.DotProduct(this.SplineDirection),
				this.Lz,
			),
			this.Aae.SubtractionEqual(this.Lz),
			(s = this.Aae.SizeSquared()),
			(t = this.Tsn.CurrentMaxOffset);
		this.Tsn.CurrentMaxOffsetSquared < s
			? 0 < t
				? ((i = Math.sqrt(s)),
					this.Aae.Multiply((i - t) / i, this.Lz),
					this.Due.AdditionEqual(this.Lz))
				: ((this.Aae.Z = 0), this.Due.AdditionEqual(this.Aae))
			: this.Tsn.CurrentMaxOffset > this.Tsn.MaxOffsetDist &&
				(s > MathUtils_1.MathUtils.Square(this.Tsn.MaxOffsetDist)
					? ((this.Tsn.CurrentMaxOffset = Math.sqrt(s)),
						(this.Tsn.CurrentMaxOffsetSquared = s))
					: ((this.Tsn.CurrentMaxOffset = this.Tsn.MaxOffsetDist),
						(this.Tsn.CurrentMaxOffsetSquared = MathUtils_1.MathUtils.Square(
							this.Tsn.MaxOffsetDist,
						)))),
			Vector_1.Vector.DistSquared(this.Hte.ActorLocationProxy, this.Due) >
				MathUtils_1.MathUtils.SmallNumber &&
				(this.Gce
					? (this.Due.Subtraction(this.Hte.ActorLocationProxy, this.Aae),
						this.Gce.MoveCharacter(this.Aae, e))
					: this.Hte.SetActorLocation(this.Due.ToUeVector(), "样条移动", !1));
	}
	Bsn() {
		var t;
		this.Ssn &&
			((t = this.Ssn.InputDirectProxy),
			this.aYo?.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
				(ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(
					this.az,
				),
				this.az.RotateVector(t, this.Lz),
				this.Ssn.SetInputDirect(this.Lz)),
			this.qsn(t),
			this.aYo?.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Climb) &&
			(this.Hte.ActorQuatProxy.Inverse(this.az),
			this.az.RotateVector(t, this.Lz),
			(this.Lz.Z = 0),
			this.Ssn.SetInputDirect(this.Lz));
	}
	qsn(t) {
		var e = this.Tsn;
		if ("RacingTrack" === e.Type)
			this.Ssn.SetInputRotatorByNumber(
				0,
				this.SplineDirection.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg,
				0,
			),
				t.IsNearlyZero() ||
				((i = this.SplineDirection.DotProduct(t)), e.OnlyForward) ||
				i > (this.Dsn ? -0.5 : 0.5)
					? ((this.Dsn = !0), this.Ssn.SetInputDirect(this.SplineDirection))
					: ((this.Dsn = !1),
						this.SplineDirection.UnaryNegation(this.Lz),
						this.Ssn.SetInputDirect(this.Lz));
		else if ("PathLine" === e.Type) {
			var i = t.DotProduct(this.SplineDirection);
			let s = 0;
			if (e.OnlyForward) {
				if (t.DotProduct(this.SplineDirection) < 0.707)
					return void this.Ssn.ClearInput();
				s = 1;
			} else {
				if (Math.abs(i) < 0.707) return void this.Ssn.ClearInput();
				s = Math.sign(i);
			}
			this.SplineDirection.Multiply(500 * s, this.Lz),
				this.Lz.AdditionEqual(this.Wye),
				this.Lz.SubtractionEqual(this.Due),
				(this.Lz.Z = 0),
				this.Lz.Normalize(),
				this.Ssn.SetInputDirect(this.Lz),
				this.Ssn.SetInputRotatorByNumber(
					0,
					this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg,
					0,
				);
		} else this.Gsn(t);
	}
	Gsn(t) {
		var e = this.Tsn,
			i =
				(this.Asn.Inverse(this.az),
				this.Hte.ActorLocationProxy.Subtraction(this.Wye, this.Lz),
				this.az.RotateVector(this.Lz, this.Lz),
				e.EdgeLimitCurve.GetCurrentValue(
					Math.abs(this.Lz.Y) / e.MaxOffsetDist,
				));
		let s = -e.InputLimitAngle,
			n = e.InputLimitAngle;
		this.Lz.Y < 0 ? (s *= 1 - i) : (n *= 1 - i),
			(this.MinTurnAngle = s),
			(this.MaxTurnAngle = n),
			t.IsNearlyZero()
				? this.Asn.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz)
				: (ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(
						this.az,
					),
					this.az.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz),
					(this.Lz.Z = 0),
					this.Lz.IsNearlyZero() &&
						this.az.RotateVector(Vector_1.Vector.UpVectorProxy, this.Lz),
					MathUtils_1.MathUtils.LookRotationUpFirst(
						this.Lz,
						Vector_1.Vector.UpVectorProxy,
						this.az,
					),
					this.az.Inverse(this.az),
					this.az.RotateVector(t, this.Lz),
					(e = this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg),
					(i =
						MathUtils_1.MathUtils.Clamp(e, s, n) *
						MathUtils_1.MathUtils.DegToRad),
					this.Lz.Set(Math.cos(i), Math.sin(i), 0),
					this.Asn.RotateVector(this.Lz, this.Lz)),
			this.Ssn.SetInputDirect(this.Lz),
			this.Ssn.SetInputRotatorByNumber(
				0,
				this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg,
				0,
			);
	}
	StartSplineMove(t, e) {
		var i;
		(this.Isn.length && this.Isn[this.Isn.length - 1] === t) ||
			((i =
				ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
					t,
					this.Entity.Id,
					1,
				)),
			this.StartSplineMoveInternal(t, e, i));
	}
	StartSplineMoveInternal(t, e, i) {
		var s;
		this.Uxr &&
			(this.Enable(this.Uxr, "SplineMoveComponent.StartSplineMoveInternal"),
			(this.Uxr = void 0),
			"SlideTrack" !== e.Pattern.Type) &&
			(this.Gce?.SetTurnRate(SplineMoveComponent_1.SplineMoveConfig.TurnRate),
			this.Gce?.SetAirControl(
				SplineMoveComponent_1.SplineMoveConfig.AirControl,
			),
			this.Gce?.SetOverrideMaxFallingSpeed(
				SplineMoveComponent_1.SplineMoveConfig.MaxFlySpeed,
			),
			this.Lie?.AddTag(-451106150),
			this.Esn?.SetBaseValue(
				Protocol_1.Aki.Protocol.Bks.Proto_Jump,
				CharacterAttributeTypes_1.PER_TEN_THOUSAND *
					SplineMoveComponent_1.SplineMoveConfig.JumpHeightRate,
			),
			(s = this.oRe?.MainAnimInstance),
			UE.KuroStaticLibrary.IsObjectClassByName(
				s,
				CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
			)) &&
			s.设置跳跃速率(SplineMoveComponent_1.SplineMoveConfig.JumpTimeScale);
		let n = this.ysn.get(t);
		n || ((n = new SplineMoveParams(t, e, i)), this.ysn.set(t, n)),
			this.Isn.push(t),
			(this.Tsn = n).OnlyForward &&
				(this.Xrr.DeepCopy(this.Hte.ActorLocationProxy),
				(this.Lsn = i.FindInputKeyClosestToWorldLocation(
					this.Xrr.ToUeVector(),
				))),
			(this.LastRightSpeed = 0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Movement",
					6,
					"StartSplineMove",
					["Spline Id", t],
					["Actor", this.Hte.Owner.GetName()],
					["StackCount", this.Isn.length],
				);
	}
	EndSplineMove(t) {
		if (this.ysn.get(t)) {
			for (
				ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
					t,
					this.Entity.Id,
					1,
				),
					this.ysn.delete(t);
				this.Isn.length && !this.ysn.has(this.Isn[this.Isn.length - 1]);
			)
				this.Isn.length = this.Isn.length - 1;
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Movement",
					6,
					"EndSplineMove",
					["Spline Id", t],
					["Actor", this.Hte.Owner.GetName()],
					["StackCount", this.Isn.length],
				),
				this.Isn.length
					? (this.Tsn = this.ysn.get(this.Isn[this.Isn.length - 1]))
					: this.Uxr ||
						((this.Uxr = this.Disable(
							"[SplineMoveComponent.EndSplineMove] 没有下一个SplineMove",
						)),
						this.Gce?.ResetTurnRate(),
						this.Gce?.ResetAirControl(),
						this.Gce?.ResetOverrideMaxFallingSpeed(),
						this.Lie?.RemoveTag(-451106150),
						this.Esn?.SetBaseValue(
							Protocol_1.Aki.Protocol.Bks.Proto_Jump,
							CharacterAttributeTypes_1.PER_TEN_THOUSAND,
						),
						(t = this.oRe?.MainAnimInstance),
						UE.KuroStaticLibrary.IsObjectClassByName(
							t,
							CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
						) && t.设置跳跃速率(1));
		}
	}
});
(SplineMoveComponent.DaPath =
	"/Game/Aki/Data/Fight/DA_SplineMoveConfig.DA_SplineMoveConfig"),
	(SplineMoveComponent.xsn = void 0),
	(SplineMoveComponent = SplineMoveComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(95)],
			SplineMoveComponent,
		)),
	(exports.SplineMoveComponent = SplineMoveComponent);

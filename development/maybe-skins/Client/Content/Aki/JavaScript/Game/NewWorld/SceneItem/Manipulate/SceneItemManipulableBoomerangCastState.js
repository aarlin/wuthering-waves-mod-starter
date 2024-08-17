"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableBoomerangCastState = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableBoomerangCastState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
	constructor(t, r) {
		super(t, r),
			(this.wrr = -0),
			(this.qje = void 0),
			(this.Brr = 180),
			(this.brr = Vector_1.Vector.Create()),
			(this.qrr = void 0),
			(this.lWo = void 0),
			(this.Gje = void 0),
			(this.Grr = 0),
			(this.Nrr = 0),
			(this.Orr = 0.033),
			(this.krr = Vector_1.Vector.Create()),
			(this.Frr = Vector_1.Vector.Create()),
			(this.Vrr = 0),
			(this.StateType = "BeCastingFree"),
			(this.qrr = this.SceneItem.Config.ThrowCfg.MotionConfig),
			(this.wrr = this.qrr.Velocity),
			(this.Brr = this.qrr.AngularVelocity),
			StringUtils_1.StringUtils.IsEmpty(this.qrr.AngularVelocityCurve) ||
				ResourceSystem_1.ResourceSystem.LoadAsync(
					this.qrr.AngularVelocityCurve,
					UE.CurveFloat,
					(t) => {
						this.lWo = t;
					},
				),
			StringUtils_1.StringUtils.IsEmpty(this.qrr.VelocityCurve) ||
				ResourceSystem_1.ResourceSystem.LoadAsync(
					this.qrr.VelocityCurve,
					UE.CurveFloat,
					(t) => {
						this.Gje = t;
					},
				),
			(this.qje = Vector_1.Vector.Create()),
			(t =
				this.SceneItem.Config.ThrowCfg.MotionConfig.RenderTrajectoryConfig
					?.Time),
			(this.Nrr = t ?? 0);
	}
	OnEnter() {
		super.OnEnter(),
			(this.Grr = 0),
			this.krr.DeepCopy(this.Frr),
			this.HitCallback &&
				this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.HitCallback),
			(this.SceneItem.ForceMoving = !0);
	}
	SetVelocityDirection(t) {
		this.qje.DeepCopy(t);
	}
	OnTick(t) {
		for (this.Vrr += t; this.Vrr > this.Orr; )
			this.UpdateLocation(this.Orr), (this.Vrr -= this.Orr);
		return this.UpdateRotationAccordingToVelocity(), !0;
	}
	UpdateLocation(t) {
		(this.Grr += t),
			(t = this.Hrr(this.krr, this.qje, this.brr, t)),
			this.SceneItem.ActorComp.SetActorLocation(
				t.ToUeVector(),
				"[ManipulableCastState.UpdateSlalomLocation]",
			),
			(this.krr = t);
	}
	Hrr(t, r, e, i) {
		let o = this.Brr * i;
		return (
			this.lWo?.IsValid() && (o *= this.lWo.GetFloatValue(this.Grr)),
			(o *= this.qrr.Direction === IComponent_1.EDirection.Right ? 1 : -1),
			(o = Math.floor(100 * o) / 100),
			r.RotateAngleAxis(o, e, r),
			(e = Vector_1.Vector.Create()),
			r.Multiply(this.wrr * i, e),
			this.Gje?.IsValid() && e.MultiplyEqual(this.Gje.GetFloatValue(this.Grr)),
			e.Set(
				Math.floor(100 * e.X) / 100,
				Math.floor(100 * e.Y) / 100,
				Math.floor(100 * e.Z) / 100,
			),
			t.Addition(e, e),
			e
		);
	}
	GetCastPath(t, r) {
		var e = [];
		this.qje.DeepCopy(t),
			(this.Frr = Vector_1.Vector.Create(
				this.SceneItem.ActorComp.ActorLocationProxy,
			));
		let i = Vector_1.Vector.Create(this.Frr);
		var o = Vector_1.Vector.Create(Vector_1.Vector.UpVectorProxy),
			s =
				(o.CrossProduct(this.qje, o),
				o.Normalize(),
				this.brr.DeepCopy(o),
				this.qje.CrossProduct(this.brr, this.brr),
				this.brr.Normalize(),
				(this.Grr = 0),
				e.push(i),
				r ?? this.Nrr);
		for (let r = 0; r < s; r += this.Orr) {
			this.Grr += this.Orr;
			var a = this.Hrr(i, t, this.brr, this.Orr);
			(i = a), e.push(a);
		}
		return e;
	}
}
exports.SceneItemManipulableBoomerangCastState =
	SceneItemManipulableBoomerangCastState;

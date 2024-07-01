"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueFollow = void 0);
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
	EffectSystem_1 = require("../../../../../../Effect/EffectSystem"),
	GameplayCueEffect_1 = require("./GameplayCueEffect"),
	MAGIC_NUMBER = 0.1;
class GameplayCueFollow extends GameplayCueEffect_1.GameplayCueEffect {
	constructor() {
		super(...arguments),
			(this.UXo = Vector_1.Vector.Create()),
			(this.nCt = Vector_1.Vector.Create()),
			(this.AXo = Vector_1.Vector.Create()),
			(this.PXo = Rotator_1.Rotator.Create()),
			(this.I1e = Vector_1.Vector.Create()),
			(this.sUo = Rotator_1.Rotator.Create()),
			(this.Due = Vector_1.Vector.Create()),
			(this.xXo = Rotator_1.Rotator.Create()),
			(this.wXo = !1),
			(this.BXo = !1),
			(this.bXo = Rotator_1.Rotator.Create()),
			(this.qXo = 0),
			(this.GXo = void 0),
			(this.NXo = 0),
			(this.OXo = -0),
			(this.zje = !1);
	}
	OnInit() {
		super.OnInit(),
			this.SocketTransform.FromUeTransform(
				this.TargetMesh.GetSocketTransform(this.TargetSocket),
			),
			this.RelativeTransform.ComposeTransforms(
				this.SocketTransform,
				this.TargetTransform,
			),
			this.UXo.FromUeVector(this.ActorInternal.K2_GetActorLocation()),
			(this.OXo = Vector_1.Vector.Dist2D(
				this.TargetTransform.GetLocation(),
				this.UXo,
			)),
			(this.wXo = this.CueConfig.bLockRevolution),
			(this.qXo = this.CueConfig.InterpSpeed),
			(this.GXo = Vector_1.Vector.Create(
				Math.abs(this.CueConfig.FaultTolerance.X),
				Math.abs(this.CueConfig.FaultTolerance.Y),
				Math.abs(this.CueConfig.FaultTolerance.Z),
			)),
			(this.NXo = this.CueConfig.FarthestDistance);
		var t = Vector_1.Vector.Create(
			this.CueConfig.LockRotation.X,
			this.CueConfig.LockRotation.Y,
			this.CueConfig.LockRotation.Z,
		);
		(this.BXo = !t.IsZero()), t.Rotation(this.bXo);
	}
	OnTick(t) {
		this.kXo(t);
	}
	AttachEffect() {
		this.kXo();
	}
	kXo(t) {
		if (EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle)) {
			var o = EffectSystem_1.EffectSystem.GetEffectActor(this.EffectViewHandle);
			if (
				(this.I1e.FromUeVector(o.K2_GetActorLocation()),
				this.sUo.FromUeRotator(o.K2_GetActorRotation()),
				this.wXo
					? (this.Due.FromUeVector(
							this.TargetMesh.GetSocketLocation(this.TargetSocket),
						),
						this.Due.AdditionEqual(this.RelativeTransform.GetLocation()),
						this.xXo.FromUeRotator(
							this.TargetMesh.GetSocketRotation(this.TargetSocket),
						))
					: (this.SocketTransform.FromUeTransform(
							this.TargetMesh.GetSocketTransform(this.TargetSocket),
						),
						this.RelativeTransform.ComposeTransforms(
							this.SocketTransform,
							this.TargetTransform,
						),
						(this.Due = this.TargetTransform.GetLocation()),
						(this.xXo = this.TargetTransform.GetRotation().Rotator())),
				t)
			) {
				var e = Vector_1.Vector.Distance(this.I1e, this.Due);
				if (e < 0.1) return void (this.zje = !1);
				this.FXo(this.I1e, this.Due),
					this.VXo(this.I1e, this.Due, this.sUo, this.xXo, e),
					MathUtils_1.MathUtils.VectorInterpTo(
						this.I1e,
						this.Due,
						t,
						this.qXo,
						this.Due,
					),
					MathUtils_1.MathUtils.RotatorInterpTo(
						this.sUo,
						this.xXo,
						t,
						this.qXo,
						this.xXo,
					);
			}
			this.UXo.FromUeVector(this.ActorInternal.K2_GetActorLocation()),
				!this.sUo.Equals(this.xXo, 0.1) &&
					Vector_1.Vector.Dist2D(this.Due, this.UXo) < this.OXo &&
					((this.UXo.Z = this.Due.Z),
					this.Due.Subtraction(this.UXo, this.nCt),
					this.nCt.Normalize(),
					this.nCt.MultiplyEqual(this.OXo),
					this.UXo.Addition(this.nCt, this.Due)),
				o.K2_SetActorLocationAndRotation(
					this.Due.ToUeVector(),
					(this.BXo ? this.bXo : this.xXo).ToUeRotator(),
					!1,
					void 0,
					!0,
				);
		}
	}
	FXo(t, o) {
		var e, s;
		!this.zje &&
			((o.X = MathUtils_1.MathUtils.Clamp(
				t.X,
				o.X - this.GXo.X,
				o.X + this.GXo.X,
			)),
			(e = o.X !== t.X),
			(o.Y = MathUtils_1.MathUtils.Clamp(
				t.Y,
				o.Y - this.GXo.Y,
				o.Y + this.GXo.Y,
			)),
			(s = o.Y !== t.Y),
			(o.Z = MathUtils_1.MathUtils.Clamp(
				t.Z,
				o.Z - this.GXo.Z,
				o.Z + this.GXo.Z,
			)),
			(o = o.Z !== t.Z),
			e || s || o) &&
			(this.zje = !0);
	}
	VXo(t, o, e, s, i) {
		(i = this.NXo / Math.max(i, 0.1)) < 1 &&
			(Vector_1.Vector.Lerp(o, t, i, this.AXo),
			Rotator_1.Rotator.Lerp(s, e, i, this.PXo),
			t.DeepCopy(this.AXo),
			e.DeepCopy(this.PXo));
	}
}
exports.GameplayCueFollow = GameplayCueFollow;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HitStaticFunction = exports.BulletStaticFunction = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EffectAudioContext_1 = require("../../../Effect/EffectContext/EffectAudioContext"),
	EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	BulletConstant_1 = require("../BulletConstant"),
	collisionColor = new UE.LinearColor(255, 80, 77, 1),
	DRAW_SECTOR_ANGLE_PERIOD = 30;
class BulletStaticFunction {
	static CreateMultipleBoxToFan(t, e, o, i, r, a) {
		let c;
		c =
			o < MathCommon_1.MathCommon.FlatAngle
				? BulletConstant_1.BulletConstant.FactorBoxSix
				: BulletConstant_1.BulletConstant.FactorBoxTwelve;
		var s = new UE.Transform(),
			n = new UE.Rotator(0);
		let l = o / c;
		var f,
			u =
				(((f =
					((f = Vector_1.Vector.Create(e / 2, 0, 0)).AdditionEqual(
						Vector_1.Vector.Create(i),
					),
					s.SetLocation(f.ToUeVector()),
					t.AddComponentByClass(
						UE.BoxComponent.StaticClass(),
						!1,
						s,
						!1,
					))).LineThickness = 5),
				f.SetBoxExtent(Vector_1.Vector.OneVector, !1),
				f.SetCollisionProfileName(r),
				a.add(f),
				Vector_1.Vector.Create(0, 0, 0));
		for (let f = 0; f < c / 2; ++f) {
			u.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
				u.RotateAngleAxis(l, Vector_1.Vector.UpVectorProxy, u),
				u.MultiplyEqual(e / 2),
				u.AdditionEqual(Vector_1.Vector.Create(i)),
				s.SetLocation(u.ToUeVector()),
				u.Reset(),
				(n.Yaw = l),
				s.SetRotation(n.Quaternion());
			var E = t.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, s, !1);
			(E.LineThickness = 5),
				E.SetBoxExtent(Vector_1.Vector.OneVector, !1),
				E.SetCollisionProfileName(r),
				(l += o / c),
				a.add(E);
		}
		l = -o / c;
		for (let f = 0; f < c / 2; ++f) {
			u.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
				u.RotateAngleAxis(l, Vector_1.Vector.UpVectorProxy, u),
				u.MultiplyEqual(e / 2),
				u.AdditionEqual(Vector_1.Vector.Create(i)),
				s.SetLocation(u.ToUeVector()),
				u.Reset(),
				(n.Yaw = l),
				s.SetRotation(n.Quaternion());
			var m = t.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, s, !1);
			(m.LineThickness = 5),
				m.SetBoxExtent(Vector_1.Vector.OneVector, !1),
				m.SetCollisionProfileName(r),
				(l -= o / c),
				a.add(m);
		}
		return f;
	}
	static CompCurveVector(t, e, o) {
		var i = (0, puerts_1.$ref)(0),
			r = (0, puerts_1.$ref)(0);
		o.GetTimeRange(r, i),
			(i = (0, puerts_1.$unref)(i)),
			(r = (0, puerts_1.$unref)(r)),
			(e = MathUtils_1.MathUtils.IsNearlyZero(
				e,
				MathUtils_1.MathUtils.KindaSmallNumber,
			)
				? MathUtils_1.MathUtils.KindaSmallNumber
				: e);
		return o.GetVectorValue(
			MathUtils_1.MathUtils.RangeClamp(t / e, 0, 1, r, i),
		);
	}
	static CompCurveFloat(t, e, o) {
		var i = (0, puerts_1.$ref)(0),
			r = (0, puerts_1.$ref)(0);
		o.GetTimeRange(r, i),
			(i = (0, puerts_1.$unref)(i)),
			(r = (0, puerts_1.$unref)(r)),
			(e = MathUtils_1.MathUtils.IsNearlyZero(
				e,
				MathUtils_1.MathUtils.KindaSmallNumber,
			)
				? MathUtils_1.MathUtils.KindaSmallNumber
				: e);
		return o.GetFloatValue(MathUtils_1.MathUtils.RangeClamp(t / e, 0, 1, r, i));
	}
	static DebugDrawRing(t, e, o, i) {
		var r;
		o <= 0 ||
			((r = new UE.Vector(i.X, i.Y, i.Z + t)),
			(i = new UE.Vector(i.X, i.Y, i.Z - t)),
			0 < e &&
				UE.KismetSystemLibrary.DrawDebugCylinder(
					GlobalData_1.GlobalData.GameInstance,
					r,
					i,
					e,
					32,
					collisionColor,
				),
			UE.KismetSystemLibrary.DrawDebugCylinder(
				GlobalData_1.GlobalData.GameInstance,
				r,
				i,
				o,
				32,
				collisionColor,
			));
	}
	static DebugDrawSector(t, e, o, i, r, a, c) {
		i.RotateVector(Vector_1.Vector.UpVectorProxy, this.f7o),
			this.f7o.Multiply(t, this.p7o),
			this.f7o.Multiply(-t, this.v7o),
			r.Addition(this.p7o, this.f7o),
			r.Addition(this.v7o, this.Tz),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.GameInstance,
				this.f7o.ToUeVector(),
				this.Tz.ToUeVector(),
				a ?? collisionColor,
				c,
			);
		var s = o * MathUtils_1.MathUtils.DegToRad * 0.5,
			n =
				(this.M7o.Set(Math.cos(s) * e, Math.sin(s) * e, 0),
				i.RotateVector(this.M7o, this.S7o),
				this.S7o.AdditionEqual(r),
				this.E7o.FromUeVector(this.S7o),
				this.S7o.AdditionEqual(this.p7o),
				this.E7o.AdditionEqual(this.v7o),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.GameInstance,
					this.f7o.ToUeVector(),
					this.S7o.ToUeVector(),
					a ?? collisionColor,
					c,
				),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.GameInstance,
					this.Tz.ToUeVector(),
					this.E7o.ToUeVector(),
					a ?? collisionColor,
					c,
				),
				this.M7o.Set(Math.cos(-s) * e, Math.sin(-s) * e, 0),
				i.RotateVector(this.M7o, this.S7o),
				this.S7o.AdditionEqual(r),
				this.E7o.FromUeVector(this.S7o),
				this.S7o.AdditionEqual(this.p7o),
				this.E7o.AdditionEqual(this.v7o),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.GameInstance,
					this.S7o.ToUeVector(),
					this.E7o.ToUeVector(),
					a ?? collisionColor,
					c,
				),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.GameInstance,
					this.f7o.ToUeVector(),
					this.S7o.ToUeVector(),
					a ?? collisionColor,
					c,
				),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.GameInstance,
					this.Tz.ToUeVector(),
					this.E7o.ToUeVector(),
					a ?? collisionColor,
					c,
				),
				Math.max(Math.ceil(o / 30), 2)),
			l = (o / n) * MathUtils_1.MathUtils.DegToRad;
		for (let t = 1; t <= n; ++t) {
			this.f7o.FromUeVector(this.S7o), this.Tz.FromUeVector(this.E7o);
			var f = l * t - s;
			this.M7o.Set(Math.cos(f) * e, Math.sin(f) * e, 0),
				i.RotateVector(this.M7o, this.S7o),
				this.S7o.AdditionEqual(r),
				this.E7o.FromUeVector(this.S7o),
				this.S7o.AdditionEqual(this.p7o),
				this.E7o.AdditionEqual(this.v7o),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.GameInstance,
					this.S7o.ToUeVector(),
					this.E7o.ToUeVector(),
					a ?? collisionColor,
					c,
				),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.GameInstance,
					this.f7o.ToUeVector(),
					this.S7o.ToUeVector(),
					a ?? collisionColor,
					c,
				),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.GameInstance,
					this.Tz.ToUeVector(),
					this.E7o.ToUeVector(),
					a ?? collisionColor,
					c,
				);
		}
	}
	static SpawnHitEffect(t, e, o) {
		t.EffectInfo.HandOver ||
			((e = t.EffectInfo.EffectData.EffectOnHit.get(e)) &&
				BulletStaticFunction.PlayBulletEffect(
					t.Actor,
					e,
					t.ActorComponent.ActorTransform,
					t,
					o,
				));
	}
	static BulletHitEffect(t, e) {
		var o = t.EffectInfo.EffectData.EffectOnHit.get(2);
		o &&
			((e = new UE.Transform(
				Rotator_1.Rotator.ZeroRotator,
				e,
				Vector_1.Vector.OneVector,
			)),
			BulletStaticFunction.PlayBulletEffect(
				t.Actor,
				o,
				e,
				t,
				"[BulletStaticFunction.BulletHitEffect]",
			));
	}
	static PlayBulletEffect(t, e, o, i, r) {
		let a;
		(0, RegisterComponent_1.isComponentInstance)(i.AttackerAudioComponent, 170)
			? (((c = new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole =
					"p1" === i.AttackerAudioComponent.Priority.State),
				(c.EntityId = i.Attacker ? i.Attacker.Id : void 0),
				(c.SourceObject = i.AttackerActorComp.Owner),
				(a = c))
			: i.AttackerActorComp?.Valid &&
				(((a = new EffectContext_1.EffectContext(
					i.Attacker ? i.Attacker.Id : void 0,
				)).EntityId = i.Attacker ? i.Attacker.Id : void 0),
				(a.SourceObject = i.AttackerActorComp.Owner));
		var c = EffectSystem_1.EffectSystem.SpawnEffect(t, o, e, r, a, 0);
		return c;
	}
	static DestroyEffect(t, e = !0) {
		var o;
		t.HandOver ||
			t.IsEffectDestroy ||
			((t.IsEffectDestroy = !0),
			EffectSystem_1.EffectSystem.IsValid(t.Effect) &&
				((o = EffectSystem_1.EffectSystem.GetSureEffectActor(
					t.Effect,
				))?.IsValid() && o.K2_DetachFromActor(1, 1, 1),
				t.IsFinishAuto
					? (e && EffectSystem_1.EffectSystem.SetTimeScale(t.Effect, 1),
						EffectSystem_1.EffectSystem.StopEffectById(
							t.Effect,
							"[BulletStaticFunction.DestroyEffect] IsFinishAuto=true",
							!1,
						))
					: EffectSystem_1.EffectSystem.StopEffectById(
							t.Effect,
							"[BulletStaticFunction.DestroyEffect] IsFinishAuto=false",
							!0,
						)));
	}
	static SetBulletEffectTimeScale(t, e) {
		EffectSystem_1.EffectSystem.IsValid(t.Effect) &&
			EffectSystem_1.EffectSystem.SetTimeScale(t.Effect, e);
	}
	static HandOverEffects(t, e) {
		(t = t.EffectInfo),
			(e = e.EffectInfo),
			this.DestroyEffect(e),
			(e.EffectData = t.EffectData),
			(e.Effect = t.Effect),
			(e.IsEffectDestroy = !1),
			(t.HandOver = !0),
			(t.Effect = 0);
	}
	static HandOverEffectsAfterInitTransform(t) {
		var e = t.EffectInfo;
		e = EffectSystem_1.EffectSystem.GetEffectActor(e.Effect);
		e?.IsValid()
			? e.K2_AttachToActor(t.Actor, FNameUtil_1.FNameUtil.NONE, 1, 1, 1, !0)
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Bullet", 21, "接收父子弹特效为空");
	}
}
((exports.BulletStaticFunction = BulletStaticFunction).p7o =
	Vector_1.Vector.Create()),
	(BulletStaticFunction.v7o = Vector_1.Vector.Create()),
	(BulletStaticFunction.f7o = Vector_1.Vector.Create()),
	(BulletStaticFunction.Tz = Vector_1.Vector.Create()),
	(BulletStaticFunction.M7o = Vector_1.Vector.Create()),
	(BulletStaticFunction.S7o = Vector_1.Vector.Create()),
	(BulletStaticFunction.E7o = Vector_1.Vector.Create());
class HitStaticFunction {
	static PlayHitAudio(t, e, o, i) {
		5 === t &&
			o &&
			!StringUtils_1.StringUtils.IsBlank(o) &&
			((t = EffectSystem_1.EffectSystem.GetSureEffectActor(e)),
			(e = AudioSystem_1.AudioSystem.GetAkComponent(t, {
				OnCreated: (t) => {
					AudioSystem_1.AudioSystem.SetSwitch(
						"char_p1orp3",
						i ? "p1" : "p3",
						t,
					);
				},
			})),
			AudioSystem_1.AudioSystem.PostEvent(o, e));
	}
	static CreateEffectContext(t, e = void 0) {
		if (t) {
			var o,
				i = t.GetComponent(42),
				r = t.GetComponent(1);
			let a;
			return (
				(0, RegisterComponent_1.isComponentInstance)(i, 170)
					? (((o =
							new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole =
							e ?? "p1" === i.Priority.State),
						(o.SourceObject = r.Owner),
						((a = o).SourceObject = r?.Owner),
						(a.EntityId = t.Id))
					: r?.Valid &&
						(((a = new EffectContext_1.EffectContext()).SourceObject =
							r?.Owner),
						(a.EntityId = t.Id)),
				a
			);
		}
	}
}
exports.HitStaticFunction = HitStaticFunction;

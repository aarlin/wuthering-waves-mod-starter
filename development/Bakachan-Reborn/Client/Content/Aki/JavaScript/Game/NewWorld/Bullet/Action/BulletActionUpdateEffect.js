"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionUpdateEffect = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
	BulletPool_1 = require("../Model/BulletPool"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateEffect extends BulletActionBase_1.BulletActionBase {
	OnExecute() {
		var t = this.BulletInfo.EffectInfo,
			e = this.BulletInfo.BulletDataMain,
			l =
				((t.EffectData = e.Render),
				(t.IsFinishAuto = t.EffectData.EffectStopInsteadDestroy),
				t.EffectData.SpecialEffect);
		this.W5o(),
			4 === e.Base.Shape
				? ((e = t.EffectData.EffectBulletParams.get(1)),
					(e = Number(e)),
					(t.EffectOriginSize = 1 / (isNaN(e) ? 1 : e)),
					(e = l.get(1)) &&
						0 < e.length &&
						((t.EffectExtremity =
							BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
								this.BulletInfo.Actor,
								e,
								this.BulletInfo.ActorComponent.ActorTransform,
								this.BulletInfo,
								"[BulletActionUpdateEffect.OnExecute] 1",
							)),
						EffectSystem_1.EffectSystem.IsValid(t.EffectExtremity)) &&
						EffectSystem_1.EffectSystem.GetEffectActor(
							t.EffectExtremity,
						).SetActorHiddenInGame(!0),
					(e = l.get(2)) &&
						0 < e.length &&
						((l = this.BulletInfo.Actor),
						(t.EffectBlock =
							BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
								l,
								e,
								l.GetTransform(),
								this.BulletInfo,
								"[BulletActionUpdateEffect.OnExecute] 2",
							)),
						EffectSystem_1.EffectSystem.IsValid(t.EffectBlock)) &&
						EffectSystem_1.EffectSystem.GetEffectActor(
							t.EffectBlock,
						).SetActorHiddenInGame(!0))
				: (this.IsFinish = !0);
	}
	W5o() {
		var t,
			e,
			l,
			o,
			f,
			c = this.BulletInfo.ActorComponent;
		c &&
			(this.BulletInfo.BulletDataMain.Render.HandOverParentEffect
				? BulletStaticFunction_1.BulletStaticFunction.HandOverEffectsAfterInitTransform(
						this.BulletInfo,
					)
				: (f = (o = this.BulletInfo.EffectInfo).EffectData).EffectBullet
						.length <= 0 ||
					((t = BulletPool_1.BulletPool.CreateRotator()),
					this.BulletInfo.IsCollisionRelativeRotationModify
						? MathUtils_1.MathUtils.ComposeRotator(
								BulletConstant_1.BulletConstant.RotateToRight,
								this.BulletInfo.BulletDataMain.Base.Rotator,
								t,
							)
						: t.FromUeRotator(BulletConstant_1.BulletConstant.RotateToRight),
					(e = new UE.Transform(
						UE.KismetMathLibrary.TransformRotation(
							c.ActorTransform,
							t.ToUeRotator(),
						),
						c.ActorLocation,
						c.ActorScale,
					)),
					BulletPool_1.BulletPool.RecycleRotator(t),
					(o.Effect =
						BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
							c.Owner,
							f.EffectBullet,
							e,
							this.BulletInfo,
							"[BulletActionUpdateEffect.SpawnBulletEffectOnBegin]",
						)),
					EffectSystem_1.EffectSystem.IsValid(o.Effect) &&
						(t = EffectSystem_1.EffectSystem.GetEffectActor(o.Effect)) &&
						(t.K2_AttachToActor(
							c.Owner,
							FNameUtil_1.FNameUtil.NONE,
							1,
							1,
							1,
							!0,
						),
						f.EffectBulletParams.has(3) &&
							((e = f.EffectBulletParams.get(3).split(",")),
							(o = Number(e[1])),
							(c = Number(e[2])),
							(e = Number(e[0])),
							(l = BulletPool_1.BulletPool.CreateRotator()).Set(o, c, e),
							t.K2_SetActorRelativeRotation(l.ToUeRotator(), !1, void 0, !0),
							BulletPool_1.BulletPool.RecycleRotator(l)),
						f.EffectBulletParams.has(2) &&
							((o = f.EffectBulletParams.get(2).split(",")),
							(c = Number(o[0])),
							(e = Number(o[1])),
							(l = Number(o[2])),
							(o = BulletPool_1.BulletPool.CreateVector()).Set(c, e, l),
							t.K2_SetActorRelativeLocation(o.ToUeVector(), !1, void 0, !0),
							BulletPool_1.BulletPool.RecycleVector(o)),
						f.EffectBulletParams.has(4)) &&
						((c = f.EffectBulletParams.get(4).split(",")),
						(e = Number(c[1])),
						(l = Number(c[0])),
						(o = Number(c[2])),
						(f = BulletPool_1.BulletPool.CreateVector()).Set(e, l, o),
						t.SetActorScale3D(f.ToUeVector()),
						BulletPool_1.BulletPool.RecycleVector(f))));
	}
	OnTick(t) {
		var e, l;
		this.BulletInfo.NeedDestroy ||
			((e = this.BulletInfo.EffectInfo),
			((l = BulletPool_1.BulletPool.CreateVector()).X = 1),
			(l.Y = this.BulletInfo.RayInfo.Length * e.EffectOriginSize),
			(l.Z = 1),
			EffectSystem_1.EffectSystem.GetEffectActor(e.Effect)?.SetActorScale3D(
				l.ToUeVector(),
			),
			BulletPool_1.BulletPool.RecycleVector(l),
			EffectSystem_1.EffectSystem.GetEffectActor(
				e.EffectExtremity,
			)?.SetActorHiddenInGame(this.BulletInfo.RayInfo.IsBlock),
			EffectSystem_1.EffectSystem.GetEffectActor(
				e.EffectBlock,
			)?.SetActorHiddenInGame(!this.BulletInfo.RayInfo.IsBlock),
			(this.BulletInfo.RayInfo.IsBlock
				? (EffectSystem_1.EffectSystem.GetEffectActor(
						e.EffectBlock,
					)?.K2_SetActorLocation(
						this.BulletInfo.RayInfo.EndPoint.ToUeVector(),
						!1,
						void 0,
						!0,
					),
					EffectSystem_1.EffectSystem.GetEffectActor(e.EffectBlock))
				: (EffectSystem_1.EffectSystem.GetEffectActor(
						e.EffectExtremity,
					)?.K2_SetActorLocation(
						this.BulletInfo.RayInfo.EndPoint.ToUeVector(),
						!1,
						void 0,
						!0,
					),
					EffectSystem_1.EffectSystem.GetEffectActor(e.EffectExtremity))
			)?.K2_SetActorRotation(this.BulletInfo.ActorComponent.ActorRotation, !1));
	}
}
exports.BulletActionUpdateEffect = BulletActionUpdateEffect;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletCollisionUtil = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	Queue_1 = require("../../../../Core/Container/Queue"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	Transform_1 = require("../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent_New"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletPool_1 = require("../Model/BulletPool"),
	BulletStaticFunction_1 = require("./BulletStaticFunction");
class BulletCollisionUtil {
	static UpdateCollisionExtend(t, e, o, l, a) {
		switch (t) {
			case 0:
				e.SetBoxExtent(o.ToUeVector(), !0);
				break;
			case 1:
				e.SetSphereRadius(o.X, !0);
				break;
			case 2:
				var i = this.GetSectorExtent(o, l),
					r = e,
					n = BulletPool_1.BulletPool.CreateVector();
				a.Quaternion().RotateVector(BulletCollisionUtil.o7o, n),
					r.K2_SetRelativeLocation(n.ToUeVector(), !1, void 0, !0),
					BulletPool_1.BulletPool.RecycleVector(n),
					r.SetBoxExtent(i.ToUeVector(), !0);
				break;
			case 3:
				e.SetBoxExtent(new UE.Vector(o.X, o.X, o.Z), !0);
		}
	}
	static UpdateRegionExtend(t, e, o) {
		switch (t) {
			case 6:
				e.BoxExtent = o.ToUeVector();
				break;
			case 7:
				e.Radius = o.X;
				break;
			case 8:
				(e.Radius = o.X), (e.HalfHeight = o.Z), (e.Angle = o.Y);
				break;
			case 9:
				(e.Radius = o.X), (e.HalfHeight = o.Z);
		}
	}
	static GetSectorExtent(t, e) {
		BulletCollisionUtil.o7o.FromUeVector(e);
		var o;
		e = Vector_1.Vector.Create();
		return (
			t.Y < 180
				? ((BulletCollisionUtil.o7o.X += 0.5 * t.X),
					e.Set(
						0.5 * t.X,
						Math.sin(0.5 * t.Y * MathUtils_1.MathUtils.DegToRad) * t.X,
						t.Z,
					))
				: ((o = Math.cos(0.5 * t.Y * MathUtils_1.MathUtils.DegToRad)),
					(BulletCollisionUtil.o7o.X += t.X * (1 + o) * 0.5),
					e.Set(t.X * (1 - o) * 0.5, t.X, t.Z)),
			e
		);
	}
	static ShowBulletDeBugDraw(t) {
		var e, o, l, a, i, r, n;
		UE.KismetSystemLibrary.DrawDebugSphere(
			GlobalData_1.GlobalData.GameInstance,
			t.ActorComponent.ActorLocation,
			10,
			void 0,
			ColorUtils_1.ColorUtils.LinearRed,
		),
			t.Size.IsZero() ||
				((e = t.BulletDataMain.Base.Shape),
				(o = t.CollisionInfo.CollisionComponent),
				3 === e
					? ((a = o.BoundsScale),
						BulletStaticFunction_1.BulletStaticFunction.DebugDrawRing(
							t.Size.Z * a,
							a * t.Size.Y,
							t.Size.X * a,
							t.CenterLocation,
						),
						t.BulletDataMain?.Base.DebugShowProgress &&
							((r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
								t.CenterLocation,
							),
							(r.Z -= t.Size.Z * a),
							(n = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
							(a = MathUtils_1.MathUtils.Lerp(
								a * t.Size.Y,
								t.Size.X * a,
								n / t.BulletDataMain.Base.Duration,
							)),
							UE.KismetSystemLibrary.DrawDebugCircle(
								GlobalData_1.GlobalData.GameInstance,
								r.ToUeVector(),
								a,
								36,
								ColorUtils_1.ColorUtils.LinearRed,
								t.BulletDataMain.Base.Duration - n,
								3,
								t.Actor?.GetActorRightVector(),
								t.Actor?.GetActorForwardVector(),
								!1,
							),
							BulletPool_1.BulletPool.RecycleVector(r)))
					: 2 === e
						? ((a = o.BoundsScale),
							(n = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(
								t.CollisionRotator,
							),
							BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(
								t.Size.Z * a,
								t.Size.X * a,
								t.Size.Y,
								n.Quaternion(),
								t.CenterLocation,
							),
							t.BulletDataMain?.Base.DebugShowProgress &&
								((r = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
								(l = MathUtils_1.MathUtils.Lerp(
									0,
									t.Size.Y,
									r / t.BulletDataMain.Base.Duration,
								)),
								(i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
									t.CenterLocation,
								),
								(i.Z -= t.Size.Z * a),
								BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(
									1,
									t.Size.X * a,
									l,
									n.Quaternion(),
									i,
									ColorUtils_1.ColorUtils.LinearRed,
									t.BulletDataMain.Base.Duration - r,
								),
								BulletPool_1.BulletPool.RecycleVector(i)),
							BulletPool_1.BulletPool.RecycleRotator(n))
						: 0 === e
							? ((a = o.BoundsScale),
								(l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
									o.BoxExtent,
								),
								l.MultiplyEqual(a),
								UE.KismetSystemLibrary.DrawDebugBox(
									GlobalData_1.GlobalData.GameInstance,
									o.K2_GetComponentLocation(),
									l.ToUeVector(),
									ColorUtils_1.ColorUtils.LinearYellow,
									o.K2_GetComponentRotation(),
									0,
									1,
								),
								t.BulletDataMain?.Base.DebugShowProgress &&
									((r = BulletPool_1.BulletPool.CreateVector()),
									(i = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
									Vector_1.Vector.Lerp(
										Vector_1.Vector.ZeroVectorProxy,
										l,
										i / t.BulletDataMain.Base.Duration,
										r,
									),
									(r.Z = 4),
									(n = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
										o.K2_GetComponentLocation(),
									),
									(n.Z -= l.Z + 2),
									UE.KismetSystemLibrary.DrawDebugBox(
										GlobalData_1.GlobalData.GameInstance,
										n.ToUeVector(),
										r.ToUeVector(),
										ColorUtils_1.ColorUtils.LinearRed,
										o.K2_GetComponentRotation(),
										t.BulletDataMain.Base.Duration - i,
										2,
									),
									BulletPool_1.BulletPool.RecycleVector(r),
									BulletPool_1.BulletPool.RecycleVector(n)),
								BulletPool_1.BulletPool.RecycleVector(l))
							: 1 === e &&
								((a = o.GetScaledSphereRadius()),
								(i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
									o.K2_GetComponentLocation(),
								),
								UE.KismetSystemLibrary.DrawDebugSphere(
									GlobalData_1.GlobalData.GameInstance,
									i.ToUeVector(),
									a,
									void 0,
									ColorUtils_1.ColorUtils.LinearGreen,
								),
								t.BulletDataMain?.Base.DebugShowProgress &&
									((r = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
									(n = MathUtils_1.MathUtils.Lerp(
										0,
										a,
										r / t.BulletDataMain.Base.Duration,
									)),
									UE.KismetSystemLibrary.DrawDebugCircle(
										GlobalData_1.GlobalData.GameInstance,
										i.ToUeVector(),
										n,
										36,
										ColorUtils_1.ColorUtils.LinearRed,
										t.BulletDataMain.Base.Duration - r,
										3,
										t.Actor?.GetActorRightVector(),
										t.Actor?.GetActorForwardVector(),
										!1,
									)),
								BulletPool_1.BulletPool.RecycleVector(i)));
	}
	static EntityLeave(t, e) {
		var o = e.EntityHandle;
		if (o?.Valid) {
			const i = o.Entity;
			if (1 === e.Type) {
				var l,
					a = (o = t.CollisionInfo).CharacterEntityMap.get(i);
				void 0 === a ||
					((l = i.GetComponent(3)) &&
						(this.r7o(t, i, l.IsRoleAndCtrlByMe), 0 < a) &&
						i.GetComponent(107)?.RemoveTimeScale(a),
					o.CharacterEntityMap.delete(i),
					t.BulletDataMain.Base.Interval <= 0 &&
						o.ObjectsHitCurrent.delete(i.Id),
					o.CharacterEntityMap.size) ||
					(o.HaveCharacterInBullet = !1);
			} else if (2 === e.Type) {
				const o = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
					e.BulletEntityId,
				);
				o &&
					void 0 !== (a = (l = t.CollisionInfo).BulletEntityMap.get(o)) &&
					(0 < a && BulletUtil_1.BulletUtil.RemoveTimeScale(t, a),
					l.BulletEntityMap.delete(o));
			}
		}
	}
	static r7o(t, e, o) {
		if (
			((o = e.GetComponent(0)?.IsRole() && !o),
			(t = t.BulletDataMain),
			!o && t.Execution.GeIdApplyToVictim)
		) {
			var l = e.GetComponent(157);
			if (l)
				for (const e of t.Execution.GeIdApplyToVictim)
					l.RemoveBuff(
						e,
						-1,
						"BulletCollisionUtil.CharacterLeaveBulletUseBuff",
					);
		}
	}
	static n7o(t, e, o, l, a, i) {
		var r = new Array();
		return (
			(e = e.EffectOnHit.get(o ? 7 : 4)) &&
				0 < e.length &&
				"None" !== e &&
				r.push(e),
			a &&
				t.IsPartHit &&
				(o = t.GetPartHitConf(l)) &&
				(o.ReplaceBulletHitEffect && (r.length = 0),
				(e = o.Effect),
				ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(e) &&
					r.push(e.ToAssetPathName()),
				i) &&
				((a = o.Audio),
				ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(a)) &&
				r.push(a.ToAssetPathName()),
			r
		);
	}
	static PlayHitEffect(t, e, o, l, a, i) {
		var r = (n = t.BulletDataMain).Render,
			n = 0 < n.Base.DamageId;
		if (
			(e = e.Entity.GetComponent(185).HasTag(-1728163740)
				? void 0
				: BulletCollisionUtil.n7o(
						e,
						r,
						l,
						o,
						n,
						t.BulletDataMain.Base.EnablePartHitAudio,
					)) &&
			0 < e.length
		) {
			let C;
			(C = (l = r.EffectOnHitConf.get(0))
				? (l.EnableHighLimit &&
						((o = t.GetActorLocation().Z),
						(n = l.HighLimit),
						(a.Z = MathUtils_1.MathUtils.Clamp(a.Z, o + n.X, o + n.Y))),
					l.Scale)
				: Vector_1.Vector.OneVectorProxy),
				BulletCollisionUtil.s7o.Set(a, i.Quaternion(), C);
			var c = t.Attacker?.GetComponent(51)?.HitEffectMap;
			o = t.Attacker?.GetComponent(42);
			let m = !1;
			(0, RegisterComponent_1.isComponentInstance)(o, 170) &&
				(m = "p1" === o.Priority.State);
			var s = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
				t.Attacker,
				m,
			);
			const _ = r.AudioOnHit;
			var u = (t, e) => {
				BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, e, _, m);
			};
			for (const t of e) {
				let e = 0;
				var B = c.get(t);
				B &&
				B.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT &&
				((e = B.Pop()), EffectSystem_1.EffectSystem.IsValid(e))
					? (EffectSystem_1.EffectSystem.ReplayEffect(
							e,
							"ReUseHitEffect",
							BulletCollisionUtil.s7o.ToUeTransform(),
						),
						B.Push(e),
						BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, e, _, m))
					: ((e = EffectSystem_1.EffectSystem.SpawnEffect(
							GlobalData_1.GlobalData.World,
							BulletCollisionUtil.s7o.ToUeTransform(),
							t,
							"[BulletCollisionUtil.ProcessHitEffect]",
							s,
							void 0,
							void 0,
							u,
						)),
						c.has(t) || c.set(t, new Queue_1.Queue()),
						c.get(t).Push(e));
			}
		}
	}
	static PlaySceneItemHitEffect(t, e, o, l) {
		var a = t?.GetComponent(51)?.HitEffectMap;
		let i = 0;
		var r = a.get(e),
			n = t?.GetComponent(42);
		let c = !1;
		(0, RegisterComponent_1.isComponentInstance)(n, 170) &&
			(c = "p1" === n.Priority.State),
			r &&
			r.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT &&
			((i = r.Pop()), EffectSystem_1.EffectSystem.IsValid(i))
				? (EffectSystem_1.EffectSystem.ReplayEffect(i, "ReUseHitEffect", o),
					r.Push(i),
					BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, i, l, c))
				: ((n = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
						t,
						c,
					)),
					(i = EffectSystem_1.EffectSystem.SpawnEffect(
						GlobalData_1.GlobalData.World,
						o,
						e,
						"[BulletCollisionUtil.ProcessHitEffect]",
						n,
						void 0,
						void 0,
						(t, e) => {
							BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, e, l, c);
						},
					)),
					a.has(e) || a.set(e, new Queue_1.Queue()),
					a.get(e).Push(i));
	}
	static CalcPartDistance(t, e) {
		var o = BulletPool_1.BulletPool.CreateVector();
		o.FromUeVector(t.K2_GetComponentLocation()),
			(t = BulletPool_1.BulletPool.CreateVector()),
			o.Subtraction(e.CenterLocation, t),
			t.Normalize(),
			(e = Vector_1.Vector.DistSquared(o, e.GetActorLocation()));
		return (
			BulletPool_1.BulletPool.RecycleVector(o),
			BulletPool_1.BulletPool.RecycleVector(t),
			e
		);
	}
	static GetImpactPointCharacter(t, e, o) {
		var l, a, i, r;
		t instanceof UE.CapsuleComponent
			? ((l = e.GetActorLocation()),
				o.FromUeVector(t.GetUpVector()),
				this.h7o.FromUeVector(t.K2_GetComponentLocation()),
				l.Subtraction(this.h7o, this.l7o),
				(r = Vector_1.Vector.DotProduct(this.l7o, o)),
				(a = Math.sign(r)),
				(i = Math.abs(r)),
				(r = Math.min(t.CapsuleHalfHeight, i) * a),
				o.MultiplyEqual(r),
				o.AdditionEqual(this.h7o),
				ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
					e.Attacker.Id,
				) &&
					UE.KismetSystemLibrary.DrawDebugSphere(
						GlobalData_1.GlobalData.World,
						o.ToUeVector(),
						4,
						8,
						ColorUtils_1.ColorUtils.LinearBlue,
						2,
						3,
					),
				l.Subtraction(o, this._7o),
				this._7o.Normalize(),
				this._7o.MultiplyEqual(t.CapsuleRadius),
				o.AdditionEqual(this._7o),
				ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
					e.Attacker.Id,
				) &&
					UE.KismetSystemLibrary.DrawDebugSphere(
						GlobalData_1.GlobalData.World,
						o.ToUeVector(),
						4,
						8,
						ColorUtils_1.ColorUtils.LinearYellow,
						2,
						3,
					),
				BulletConstant_1.BulletConstant.OpenHitActorLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						21,
						"命中特效 碰撞点 角色",
						["boneName", t.GetName()],
						["bulletRowName", e.BulletRowName],
					))
			: t instanceof UE.BoxComponent
				? BulletCollisionUtil.GetHitPointBoxComp(t, e, o)
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Bullet",
							21,
							"击中了其它形状组件作为部位碰撞体",
							["boneName", t?.GetName()],
							["actorName", t?.GetOwner().GetName()],
						),
					o.FromUeVector(e.GetActorLocation()));
	}
	static GetHitPointBoxComp(t, e, o, l) {
		this.c7o.FromUeTransform(t.K2_GetComponentToWorld());
		l = l ?? e.GetActorLocation();
		var a = (r =
				(this.c7o.InverseTransformPosition(l, this.m7o),
				this.d7o.FromUeVector(this.m7o),
				this.d7o.MultiplyEqual(-1),
				t.BoxExtent)).X,
			i = r.Y,
			r = r.Z;
		a = this.C7o(this.m7o, this.d7o, [-a, -i, -r], [a, i, r], this.g7o);
		this.c7o.TransformPosition(this.g7o, o),
			1 !== a &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Bullet",
					21,
					"理论上必须有一个碰撞点才对",
					["Bullet", e.BulletRowName],
					["Part", t.GetName()],
					["Victim", t.GetOwner()?.GetName()],
				),
			BulletConstant_1.BulletConstant.OpenHitActorLog &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Bullet",
					21,
					"命中特效 碰撞点 角色 Box",
					["boneName", t.GetName()],
					["bulletRowName", e.BulletRowName],
					["outPoint", o],
				),
			ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
				e.Attacker.Id,
			) &&
				(UE.KismetSystemLibrary.DrawDebugSphere(
					GlobalData_1.GlobalData.World,
					o.ToUeVector(),
					4,
					8,
					ColorUtils_1.ColorUtils.LinearYellow,
					2,
					3,
				),
				UE.KismetSystemLibrary.DrawDebugLine(
					GlobalData_1.GlobalData.World,
					l.ToUeVector(),
					this.c7o.GetLocation().ToUeVector(),
					ColorUtils_1.ColorUtils.LinearBlue,
					2,
					3,
				));
	}
	static C7o(t, e, o, l, a) {
		let i = 0,
			r = Number.MAX_VALUE;
		for (let a = 0; a < 3; a++)
			if (Math.abs(e.Tuple[a]) < Number.EPSILON) {
				if (t.Tuple[a] < o[a] || t.Tuple[a] > l[a]) return 0;
			} else {
				var n = 1 / e.Tuple[a];
				let c = (o[a] - t.Tuple[a]) * n,
					s = (l[a] - t.Tuple[a]) * n;
				if (
					(c > s && ((n = c), (c = s), (s = n)),
					c > i && (i = c),
					s > r && (r = s),
					i > r)
				)
					return 0;
			}
		return e.Multiply(i, a), a.AdditionEqual(t), 1;
	}
	static GetImpactPointSceneItem(t, e, o) {
		var l,
			a = BulletPool_1.BulletPool.CreateVector(),
			i =
				(a.FromUeVector(t.K2_GetComponentLocation()),
				BulletPool_1.BulletPool.CreateVector());
		const r = t.Bounds.SphereRadius;
		if (
			(Math.abs(e.MoveInfo.BulletSpeed) < MathUtils_1.MathUtils.SmallNumber
				? t.IsA(UE.BoxComponent.StaticClass())
					? BulletCollisionUtil.GetHitPointBoxComp(
							t,
							e,
							o,
							e.AttackerActorComp.ActorLocationProxy,
						)
					: (e.AttackerActorComp.ActorLocationProxy.Subtraction(a, i),
						i.Normalize(),
						i.MultiplyEqual(r),
						i.Addition(a, o))
				: (a.Subtraction(e.CollisionInfo.LastFramePosition, i),
					(l = i.Size() - r),
					i.Normalize(),
					i.MultiplyEqual(l),
					e.CollisionInfo.LastFramePosition.Addition(i, o)),
			BulletPool_1.BulletPool.RecycleVector(a),
			BulletPool_1.BulletPool.RecycleVector(i),
			BulletConstant_1.BulletConstant.OpenHitActorLog &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Bullet",
					21,
					"命中特效 碰撞点 场景物",
					["boneName", t.GetName()],
					["radius", r],
					["bulletRowName", e.BulletRowName],
				),
			ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(e.Attacker.Id))
		) {
			UE.KismetSystemLibrary.DrawDebugSphere(
				GlobalData_1.GlobalData.World,
				a.ToUeVector(),
				4,
				8,
				ColorUtils_1.ColorUtils.LinearBlue,
				2,
				3,
			),
				UE.KismetSystemLibrary.DrawDebugSphere(
					GlobalData_1.GlobalData.World,
					o.ToUeVector(),
					4,
					8,
					ColorUtils_1.ColorUtils.LinearYellow,
					2,
					3,
				);
		}
	}
}
((exports.BulletCollisionUtil = BulletCollisionUtil).o7o =
	Vector_1.Vector.Create()),
	(BulletCollisionUtil.a7o = void 0),
	(BulletCollisionUtil.s7o = Transform_1.Transform.Create()),
	(BulletCollisionUtil.h7o = Vector_1.Vector.Create()),
	(BulletCollisionUtil.l7o = Vector_1.Vector.Create()),
	(BulletCollisionUtil._7o = Vector_1.Vector.Create()),
	(BulletCollisionUtil.c7o = Transform_1.Transform.Create()),
	(BulletCollisionUtil.m7o = Vector_1.Vector.Create()),
	(BulletCollisionUtil.d7o = Vector_1.Vector.Create()),
	(BulletCollisionUtil.g7o = Vector_1.Vector.Create()),
	(BulletCollisionUtil.u7o = void 0);

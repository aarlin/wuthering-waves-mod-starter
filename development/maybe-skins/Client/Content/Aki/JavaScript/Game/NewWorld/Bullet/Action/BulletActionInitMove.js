"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionInitMove = void 0);
const UE = require("ue"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletController_1 = require("../BulletController"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletMoveInfo_1 = require("../Model/BulletMoveInfo"),
	BulletPool_1 = require("../Model/BulletPool"),
	BulletTraceElementPool_1 = require("../Model/BulletTraceElementPool"),
	BulletActionBase_1 = require("./BulletActionBase"),
	DEFAULT_GRAVITY = -1e3,
	DEFAULT_UP_DISTANCE = 500,
	PROFILE_AIMED_TOWARD = "BulletMoveAimedToward",
	PROFILE_STICK_GROUND = "BulletMoveStickGround";
class BulletActionInitMove extends BulletActionBase_1.BulletActionBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.t5o = !1),
			(this.i5o = void 0),
			(this.o5o = void 0),
			(this.r5o = !1);
	}
	get n5o() {
		return (
			this.t5o ||
				((this.t5o = !0),
				(this.i5o = this.s5o(this.a5o, this.Pe.Move.SkeletonComponentName))),
			this.i5o
		);
	}
	set a5o(o) {
		this.o5o !== o && ((this.o5o = o), (this.t5o = !1), (this.i5o = void 0));
	}
	get a5o() {
		return this.o5o || (this.o5o = this.BulletInfo.AttackerActorComp), this.o5o;
	}
	Clear() {
		super.Clear(),
			(this.Pe = void 0),
			(this.t5o = !1),
			(this.i5o = void 0),
			(this.o5o = void 0),
			(this.r5o = !1);
	}
	OnExecute() {
		var o = this.BulletInfo.BulletInitParams;
		const t = this.BulletInfo.BulletDataMain;
		var e = (this.Pe = t).Move,
			l = t.Obstacle,
			r = this.BulletInfo.MoveInfo,
			a = ((r.BulletSpeedRatio = 1), this.BulletInfo.AttackerSkillComp);
		this.BulletInfo.TargetActorComp?.Valid &&
			a?.Valid &&
			a.CurrentSkill &&
			a.SkillTargetSocket &&
			(this.BulletInfo.SkillBoneName = FNameUtil_1.FNameUtil.GetDynamicFName(
				a.SkillTargetSocket,
			)),
			(r.BulletSpeed = e.Speed),
			r.ObstaclesOffset.FromUeVector(l.Center),
			this.l5o(),
			this._5o(),
			(a = t.Base),
			(l = t.Aimed);
		if (
			(!a.StickGround &&
				l.AimedCtrlDir &&
				(o.FromRemote
					? r.BeginSpeedRotator.FromUeRotator(o.InitialTransform.Rotator())
					: this.c5o(r.BeginSpeedRotator),
				this.BulletInfo.SetActorRotation(r.BeginSpeedRotator.ToUeRotator())),
			this.m5o(),
			this.d5o(),
			this.C5o(),
			this.g5o(),
			0 < e.TrackParams.length)
		) {
			const o = e.TrackParams[0];
			(r.MinFollowHeight = o.Y), (r.SpeedFollowTarget = o.X);
		}
		r.LastFramePosition.FromUeVector(this.BulletInfo.GetActorLocation()),
			r.FollowBoneBulletRotator.FromUeRotator(
				this.BulletInfo.GetActorRotation(),
			),
			this.BulletInfo.ApplyCacheLocationAndRotation();
	}
	s5o(o, t) {
		if (t !== StringUtils_1.NONE_STRING) {
			var e = o.Actor.K2_GetComponentsByClass(
					UE.SkeletalMeshComponent.StaticClass(),
				),
				l = e ? e.Num() : 0;
			for (let o = 0; o < l; o++) {
				var r = e.Get(o);
				if (r?.IsValid() && r.GetName() === t) return r;
			}
		}
		return o.SkeletalMesh;
	}
	f5o(o) {
		var t,
			e,
			l = this.Pe.Move;
		0 === l.FollowType
			? ((e = this.BulletInfo),
				(t = this.s5o(
					o?.Valid ? o : e.AttackerActorComp,
					l.SkeletonComponentName,
				)),
				l.IsLockScale && e.Actor.RootComponent.SetAbsolute(!1, !1, !0),
				e.ApplyCacheLocationAndRotation(),
				e.ActorComponent.SetAttachToComponent(t, l.BoneName, 1, 1, 1, !0),
				e.InitPosition.FromUeVector(e.ActorComponent.ActorLocationProxy))
			: 3 === l.FollowType &&
				((t = this.BulletInfo),
				(e = this.s5o(
					o?.Valid ? o : t.AttackerActorComp,
					l.SkeletonComponentName,
				)),
				l.IsLockScale && t.Actor.RootComponent.SetAbsolute(!1, !1, !0),
				t.ApplyCacheLocationAndRotation(),
				t.ActorComponent.SetAttachToComponent(e, l.BoneName, 0, 0, 0, !0),
				t.Actor.K2_SetActorRelativeLocation(
					t.BornLocationOffset.ToUeVector(),
					!1,
					void 0,
					!1,
				),
				t.Actor.K2_SetActorRelativeRotation(
					Rotator_1.Rotator.ZeroRotator,
					!1,
					void 0,
					!0,
				),
				t.InitPosition.FromUeVector(t.ActorComponent.ActorLocationProxy));
	}
	l5o() {
		var o = this.BulletInfo;
		switch (this.Pe.Base.BornPositionStandard) {
			case 0:
				this.p5o(o.AttackerActorComp);
				break;
			case 1:
				this.v5o(o.BaseTransformEntity?.Entity?.GetComponent(1));
				break;
			case 7:
			case 8:
			case 5:
			case 10:
			case 9:
			case 4:
				this.M5o(o.BaseTransformEntity);
				break;
			case 3:
				this.E5o(o);
				break;
			case 2:
				this.y5o(MathUtils_1.MathUtils.DefaultTransformProxy);
				break;
			case 6:
				this.I5o();
		}
	}
	p5o(o) {
		this.y5o(void 0), this.f5o(o);
	}
	v5o(o) {
		var t = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
		this.T5o(o, t),
			this.y5o(t),
			(0, RegisterComponent_1.isComponentInstance)(o, 3) && this.f5o(o);
	}
	M5o(o) {
		var t = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
		o = o?.Entity?.GetComponent(1);
		(0, RegisterComponent_1.isComponentInstance)(o, 3)
			? (this.T5o(o, t), (this.a5o = o), this.y5o(t), this.f5o(o))
			: (this.T5o(o, t), this.y5o(t));
	}
	E5o(o) {
		var t, e, l, r, a;
		4 === this.Pe.Move.FollowType
			? this.L5o(o)
			: ((t = BulletMoveInfo_1.BulletMoveInfo.TempTransform1),
				(l = o.BulletInitParams),
				(r = this.Pe.Base),
				(e = BulletPool_1.BulletPool.CreateVector()),
				t.FromUeTransform(l.InitialTransform),
				e.FromUeVector(t.GetLocation()),
				e.Equals(
					Vector_1.Vector.ZeroVectorProxy,
					MathCommon_1.MathCommon.KindaSmallNumber,
				)
					? this.y5o(t)
					: ((l = r.BornPositionRandom),
						(r = BulletPool_1.BulletPool.CreateVector()),
						(a = BulletPool_1.BulletPool.CreateVector()),
						l.Equality(Vector_1.Vector.ZeroVectorProxy)
							? a.FromUeVector(o.BornLocationOffset)
							: (o.BulletInitParams.FromRemote
									? a.FromUeVector(o.RandomPosOffset)
									: ((a.X = this.HY(l.X)),
										(a.Y = this.HY(l.Y)),
										(a.Z = this.HY(l.Z)),
										o.RandomPosOffset.FromUeVector(a)),
								a.AdditionEqual(o.BornLocationOffset)),
						t.TransformPosition(a, r),
						o.SetActorLocation(r),
						o.InitPosition.FromUeVector(r),
						BulletPool_1.BulletPool.RecycleVector(r),
						BulletPool_1.BulletPool.RecycleVector(a)),
				BulletPool_1.BulletPool.RecycleVector(e));
	}
	L5o(o) {
		var t,
			e = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
				o.ParentEntityId,
			);
		e
			? ((e = e.GetBulletInfo()),
				(o.ParentEffect = e.EffectInfo.Effect),
				(t = EffectSystem_1.EffectSystem.GetSureEffectActor(o.ParentEffect))
					? BulletUtil_1.BulletUtil.AttachParentEffectSkeleton(
							o,
							t,
							o.ParentEffect,
						) &&
						o.InitPosition.FromUeVector(o.ActorComponent.ActorLocationProxy)
					: ((t = e.MoveInfo.LastFramePosition),
						o.SetActorLocation(t),
						o.InitPosition.FromUeVector(t),
						BulletController_1.BulletController.AddSimpleAction(o, 10)))
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Temp",
						18,
						"子弹为跟随父子弹特效骨骼，但是找不到父子弹",
						["EntityId", o.BulletEntityId],
						["BulletRowName", o.BulletRowName],
						["ParentEntityId", o.ParentEntityId],
					),
				this.y5o(void 0));
	}
	I5o() {
		var o = BulletUtil_1.BulletUtil.GetCurrentRole(this.BulletInfo),
			t = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
		t.FromUeTransform(o.ActorTransform),
			(this.a5o = o),
			this.y5o(t),
			this.f5o(o);
	}
	y5o(o) {
		var t = this.BulletInfo,
			e = t.MoveInfo,
			l = this.Pe.Base,
			r = this.Pe.Move,
			a = l.BornPositionRandom,
			i = t.AttackerActorComp,
			n = BulletPool_1.BulletPool.CreateVector(),
			c =
				((a =
					(a.Equality(Vector_1.Vector.ZeroVectorProxy)
						? n.FromUeVector(t.BornLocationOffset)
						: (t.BulletInitParams.FromRemote
								? n.FromUeVector(t.RandomPosOffset)
								: ((n.X = this.HY(a.X)),
									(n.Y = this.HY(a.Y)),
									(n.Z = this.HY(a.Z)),
									t.RandomPosOffset.FromUeVector(n)),
							n.AdditionEqual(t.BornLocationOffset)),
					BulletPool_1.BulletPool.CreateVector())),
				BulletPool_1.BulletPool.CreateVector());
		FNameUtil_1.FNameUtil.IsEmpty(r.BoneName) || !this.n5o
			? (1 !== l.BornPositionStandard && (n.Z -= i.ScaledHalfHeight),
				(
					o ||
					((l = BulletMoveInfo_1.BulletMoveInfo.TempTransform1).SetRotation(
						i.ActorQuatProxy,
					),
					l.SetLocation(i.ActorLocationProxy),
					l.SetScale3D(i.ActorScaleProxy),
					l)
				).TransformPosition(n, a))
			: (e.SocketTransform.FromUeTransform(
					this.n5o.GetSocketTransform(r.BoneName, 0),
				),
				a.FromUeVector(e.SocketTransform.GetLocation()),
				i.ActorQuatProxy.RotateVector(n, c),
				a.AdditionEqual(c)),
			t.SetActorLocation(a),
			t.InitPosition.FromUeVector(a),
			BulletPool_1.BulletPool.RecycleVector(n),
			BulletPool_1.BulletPool.RecycleVector(a),
			BulletPool_1.BulletPool.RecycleVector(c);
	}
	T5o(o, t) {
		var e = this.BulletInfo,
			l = e.AttackerActorComp;
		o
			? (t.FromUeTransform(o.GetSocketTransform(e.SkillBoneName)),
				(o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
					t.GetLocation(),
				),
				this.D5o(o),
				t.SetLocation(o),
				BulletPool_1.BulletPool.RecycleVector(o))
			: (t.Reset(),
				(e = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
					l.ActorLocation,
				),
				this.D5o(e),
				t.SetLocation(e),
				BulletPool_1.BulletPool.RecycleVector(e)),
			t.SetRotation(l.ActorQuat);
	}
	D5o(o) {
		var t,
			e,
			l = this.BulletInfo,
			r = this.BulletInfo.BulletDataMain.Base,
			a = ((this.r5o = !1), BulletPool_1.BulletPool.CreateVector()),
			i = ((r = (a.FromUeVector(r.BornDistLimit), a.Y)), a.X),
			n = a.Z;
		a.IsZero() ||
			((t = l.AttackerActorComp.ActorLocationProxy),
			a.FromUeVector(o),
			r < (e = Vector_1.Vector.Dist(a, t))
				? (a.SubtractionEqual(t),
					a.Normalize(),
					a.MultiplyEqual(r),
					a.AdditionEqual(t),
					(this.r5o = !0))
				: e <= i
					? ((this.r5o = !0),
						l.TargetActorComp?.Valid
							? (a.SubtractionEqual(t), a.Normalize(), a.MultiplyEqual(i))
							: (a.FromUeVector(l.AttackerActorComp.ActorForward),
								a.MultiplyEqual(n)),
						a.AdditionEqual(t))
					: a.FromUeVector(o),
			o.FromUeVector(a)),
			BulletPool_1.BulletPool.RecycleVector(a);
	}
	c5o(o) {
		var t = this.BulletInfo,
			e = this.BulletInfo.BulletDataMain.Aimed,
			l = Global_1.Global.CharacterCameraManager,
			r = BulletPool_1.BulletPool.CreateVector(),
			a = BulletPool_1.BulletPool.CreateVector(),
			i = BulletPool_1.BulletPool.CreateVector(),
			n = BulletPool_1.BulletPool.CreateVector(),
			c =
				((e =
					(r.FromUeVector(l.GetCameraLocation()),
					a.FromUeVector(l.GetActorForwardVector()),
					a.MultiplyEqual(e.DistLimit),
					a.AdditionEqual(r),
					t.MoveInfo.AimedLineTraceElement ||
						(t.MoveInfo.AimedLineTraceElement =
							BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(
								ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim,
								t.AttackerId,
								t.CollisionInfo.IgnoreQueries,
							)),
					t.MoveInfo.AimedLineTraceElement)),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, r),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, a),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					e,
					PROFILE_AIMED_TOWARD,
				));
		let m = -1;
		if (c) {
			var u = e.HitResult,
				s = u.GetHitCount(),
				B = BulletPool_1.BulletPool.CreateVector(),
				d = BulletPool_1.BulletPool.CreateVector();
			d.FromUeVector(l.GetActorForwardVector());
			for (let o = 0; o < s; o++) {
				BulletConstant_1.BulletConstant.OpenMoveLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Bullet", 21, "BulletAimedToward", [
						"ActorLabel",
						GlobalData_1.GlobalData.IsPlayInEditor
							? u.Actors.Get(o)?.ActorLabel
							: u.Actors.Get(o)?.GetName(),
					]);
				var P = u.Components.Get(o).GetCollisionProfileName();
				if (
					!BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(P) &&
					(TraceElementCommon_1.TraceElementCommon.GetHitLocation(u, o, i),
					B.FromUeVector(i),
					B.SubtractionEqual(t.GetActorLocation()),
					B.Normalize(),
					0 < Vector_1.Vector.DotProduct(d, B) &&
						((P = u.Actors?.Get(o)),
						P?.IsValid() &&
							((P = ActorUtils_1.ActorUtils.GetEntityByActor(
								P,
								!1,
							)?.Entity?.GetComponent(3)),
							!P || BulletUtil_1.BulletUtil.AttackedCondition(t, P))))
				) {
					m = o;
					break;
				}
			}
			BulletPool_1.BulletPool.RecycleVector(B),
				BulletPool_1.BulletPool.RecycleVector(d);
		}
		BulletConstant_1.BulletConstant.OpenMoveLog &&
			UE.KismetSystemLibrary.DrawDebugSphere(
				GlobalData_1.GlobalData.World,
				(m < 0 ? a : i).ToUeVector(),
				10,
				10,
				ColorUtils_1.ColorUtils.LinearGreen,
				10,
			),
			n.FromUeVector(t.GetActorLocation()),
			(c = m < 0 ? a : i),
			n.SubtractionEqual(c),
			n.MultiplyEqual(-1),
			(e = UE.KismetMathLibrary.FindLookAtRotation(
				t.GetActorLocation().ToUeVector(),
				c.ToUeVector(),
			)),
			(l = t.AttackerActorComp?.ActorForwardProxy),
			l && l.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
			n.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
			o.FromUeRotator(e),
			BulletPool_1.BulletPool.RecycleVector(r),
			BulletPool_1.BulletPool.RecycleVector(a),
			BulletPool_1.BulletPool.RecycleVector(i),
			BulletPool_1.BulletPool.RecycleVector(n);
	}
	_5o() {
		var o,
			t,
			e,
			l = this.Pe.Aimed,
			r = this.Pe.Move;
		l.AimedCtrlDir ||
			3 === r.FollowType ||
			5 === r.Trajectory ||
			4 === r.Trajectory ||
			((o = (l = this.BulletInfo).MoveInfo),
			(t = this.Pe.Base),
			this.R5o(o.BeginSpeedRotator),
			(e = BulletPool_1.BulletPool.CreateRotator()),
			r.InitVelocityRot.IsNearlyZero() ||
				(e.FromUeRotator(o.BeginSpeedRotator),
				MathUtils_1.MathUtils.ComposeRotator(
					r.InitVelocityRot,
					e,
					o.BeginSpeedRotator,
				)),
			(t.StickGround && !t.IgnoreGradient) ||
				(t.Rotator.IsNearlyZero() || (l.IsCollisionRelativeRotationModify = !0),
				r.InitVelocityDirRandom.IsZero() ||
					this.U5o(o.BeginSpeedRotator, r.InitVelocityDirRandom),
				BulletUtil_1.BulletUtil.ClampBeginRotator(l),
				l.SetActorRotation(o.BeginSpeedRotator)),
			BulletPool_1.BulletPool.RecycleRotator(e));
	}
	U5o(o, t) {
		var e, l;
		0 < t.X
			? ((l = BulletPool_1.BulletPool.CreateVector()),
				this.BulletInfo.BulletInitParams.FromRemote
					? l.FromUeVector(this.BulletInfo.RandomInitSpeedOffset)
					: ((e = UE.KismetMathLibrary.RandomUnitVectorInConeInDegrees(
							Vector_1.Vector.ForwardVector,
							t.X,
						)),
						l.FromUeVector(e),
						this.BulletInfo.RandomInitSpeedOffset.FromUeVector(l)),
				o.Quaternion().RotateVector(l, l),
				MathUtils_1.MathUtils.VectorToRotator(l, o),
				BulletPool_1.BulletPool.RecycleVector(l))
			: (0 < t.Y || 0 < t.Z) &&
				((e = BulletPool_1.BulletPool.CreateRotator()),
				this.BulletInfo?.BulletInitParams.FromRemote
					? e.Set(
							this.BulletInfo.RandomInitSpeedOffset.Y,
							this.BulletInfo.RandomInitSpeedOffset.Z,
							0,
						)
					: ((l = this.HY(t.Y)),
						(t = this.HY(t.Z)),
						e.Set(l, t, 0),
						this.BulletInfo.RandomInitSpeedOffset.Set(0, l, t)),
				(l = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(o),
				MathUtils_1.MathUtils.ComposeRotator(e, l, o),
				BulletPool_1.BulletPool.RecycleRotator(e),
				BulletPool_1.BulletPool.RecycleRotator(l));
	}
	R5o(o) {
		let t;
		var e = this.BulletInfo,
			l = e.MoveInfo,
			r = this.Pe.Move,
			a = r.InitVelocityDirParam;
		switch (r.InitVelocityDirStandard) {
			case 0:
				if (FNameUtil_1.FNameUtil.IsEmpty(r.BoneName) || 0 === r.FollowType)
					return void o.FromUeRotator(e.AttackerActorComp.ActorRotationProxy);
				l.SocketTransform.GetRotation().Rotator(o);
				var i = r.FollowSkeletonRotLimit,
					n = e.GetActorRotation();
				return (
					1 <= i.X && (o.Roll = n.Roll),
					1 <= i.Y && (o.Pitch = n.Pitch),
					void (
						1 <= i.Z && (o.Yaw = e.AttackerActorComp.ActorRotationProxy.Yaw)
					)
				);
			case 3:
				if (
					((n = e.TransformCreate.Rotator()),
					Rotator_1.Rotator.ZeroRotatorProxy.Equals2(n))
				)
					break;
				return void o.FromUeRotator(n);
			case 2:
				if ((i = e.AttackerActorComp))
					return (
						(t =
							a !== StringUtils_1.NONE_STRING
								? i.Actor.Mesh.GetSocketLocation(
										FNameUtil_1.FNameUtil.GetDynamicFName(a),
									)
								: i.ActorLocation),
						void o.FromUeRotator(
							BulletUtil_1.BulletUtil.FindLookAtRot(
								e.GetActorLocation(),
								t,
								r.InitVelocityKeepUp,
							),
						)
					);
				break;
			case 1:
				return (t = BulletUtil_1.BulletUtil.GetTargetLocation(
					e.TargetActorComp,
					StringUtils_1.StringUtils.IsNothing(a)
						? e.SkillBoneName
						: FNameUtil_1.FNameUtil.GetDynamicFName(a),
					e,
				))
					? void o.FromUeRotator(
							BulletUtil_1.BulletUtil.FindLookAtRot(
								e.GetActorLocation(),
								t,
								r.InitVelocityKeepUp,
							),
						)
					: void o.FromUeRotator(e.AttackerActorComp.ActorRotationProxy);
			case 4:
				return void o.FromUeRotator(e.GetActorRotation());
			case 5:
			case 8:
			case 9:
			case 11:
			case 6:
			case 10:
				return (
					(n = e.GetBaseVelocityTarget()),
					n?.Valid
						? ((t = n.GetSocketLocation(
								FNameUtil_1.FNameUtil.GetDynamicFName(a),
							)),
							void o.FromUeRotator(
								BulletUtil_1.BulletUtil.FindLookAtRot(
									e.GetActorLocation(),
									t,
									r.InitVelocityKeepUp,
								),
							))
						: void o.FromUeRotator(e.AttackerActorComp.ActorRotationProxy)
				);
			case 7:
				return (
					(i = BulletUtil_1.BulletUtil.GetCurrentRole(this.BulletInfo)),
					i?.Valid
						? ((t = i.GetSocketLocation(
								FNameUtil_1.FNameUtil.GetDynamicFName(a),
							)),
							void o.FromUeRotator(
								BulletUtil_1.BulletUtil.FindLookAtRot(
									e.GetActorLocation(),
									t,
									r.InitVelocityKeepUp,
								),
							))
						: void o.FromUeRotator(e.AttackerActorComp.ActorRotationProxy)
				);
		}
		o.FromUeRotator(Rotator_1.Rotator.ZeroRotatorProxy);
	}
	d5o() {
		var o = this.BulletInfo,
			t = o.MoveInfo,
			e = o.BulletDataMain.Move;
		if (3 === e.Trajectory) {
			var l = BulletPool_1.BulletPool.CreateVector();
			let a = 0;
			if (0 === e.TrackTarget || 10 === e.TrackTarget) {
				var r = BulletUtil_1.BulletUtil.GetCurrentRole(o);
				if (!r)
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Bullet",
								21,
								"围绕中心旋转子弹获取不到当前玩家控制的角色",
								["Id", o.BulletRowName],
								["Attacker", o.AttackerActorComp.Actor.GetName()],
							),
						BulletController_1.BulletController.DestroyBullet(
							o.BulletEntityId,
							!1,
						),
						void BulletPool_1.BulletPool.RecycleVector(l)
					);
				t.RoundCenter.FromUeVector(o.InitPosition),
					(a = r.ActorRotation.Yaw),
					l.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
			} else
				(r = o.TargetActorComp),
					r?.Valid
						? (this.A5o(r),
							(a = r.ActorRotation.Yaw),
							l.FromUeVector(r.ActorForward))
						: (t.RoundCenter.FromUeVector(o.InitPosition),
							l.FromUeVector(Vector_1.Vector.ForwardVectorProxy));
			(r = e.TrackParams[0]),
				(e = BulletPool_1.BulletPool.CreateVector()),
				l.RotateAngleAxis(r.Y, Vector_1.Vector.UpVectorProxy, e),
				(e.Z =
					-Math.sin((a + r.Y) * MathCommon_1.MathCommon.DegToRad) *
					Math.tan(r.Z * MathCommon_1.MathCommon.DegToRad)),
				e.Normalize(),
				e.MultiplyEqual(r.X),
				e.AdditionEqual(t.RoundCenter),
				o.SetActorLocation(e),
				t.RoundOnceAxis.Set(
					0,
					Math.sin(r.Z * MathCommon_1.MathCommon.DegToRad),
					Math.cos(r.Z * MathCommon_1.MathCommon.DegToRad),
				),
				BulletPool_1.BulletPool.RecycleVector(l),
				BulletPool_1.BulletPool.RecycleVector(e);
		}
	}
	A5o(o) {
		var t = this.BulletInfo,
			e = t.MoveInfo;
		t.ClearCacheLocationAndRotation(),
			t.ActorComponent.SetActorTransform(o.ActorTransform),
			e.RoundCenter.FromUeVector(
				o.ActorTransform.TransformPosition(t.BornLocationOffset.ToUeVector()),
			),
			e.RoundCenterLastLocation.FromUeVector(o.ActorLocation);
	}
	C5o() {
		var o = this.Pe.Move,
			t = o.Trajectory,
			e = 4 === t;
		if ((e || 5 === t) && (t = o.TrackParams) && !(t.length < 2)) {
			var l = this.BulletInfo,
				r = l.MoveInfo;
			let d = 0,
				P = !1,
				h = 0;
			e
				? (a = t[2]) && ((d = a.X), (P = 0 < a.Z), (h = a.Y))
				: (a = t[1]) && (d = a.Y),
				r.GravityMoveRotator.Reset();
			var a = l.Attacker?.GetComponent(3),
				i = l.TargetActorComp,
				n = BulletPool_1.BulletPool.CreateVector(),
				c = FNameUtil_1.FNameUtil.GetDynamicFName(o.TrackTargetBlackboardKey);
			if (
				(c = BulletUtil_1.BulletUtil.GetTargetLocation(
					i,
					FNameUtil_1.FNameUtil.IsNothing(c) ? l.SkillBoneName : c,
					l,
				))
			) {
				i?.Valid && (0, RegisterComponent_1.isComponentInstance)(i, 3)
					? (n.FromUeVector(c),
						0 !== d && (n.Z += i.Actor.CapsuleComponent.CapsuleHalfHeight * d),
						P &&
							(m = i.Entity?.GetComponent(161)) &&
							(n.Z -= m.GetHeightAboveGround()))
					: n.FromUeVector(c);
				var m = BulletPool_1.BulletPool.CreateVector(!0);
				const t = BulletPool_1.BulletPool.CreateVector();
				switch (o.DestOffsetForward) {
					case 0:
						t.FromUeVector(l.AttackerActorComp.ActorForwardProxy);
						break;
					case 2:
						n.Subtraction(l.AttackerActorComp.ActorLocationProxy, t),
							(t.Z = 0),
							t.Normalize();
						break;
					case 1:
						t.FromUeVector(i.ActorForwardProxy);
				}
				c = o.DestOffset.X;
				var u = o.DestOffset.Y,
					s = o.DestOffset.Z;
				0 !== u &&
					((B = BulletPool_1.BulletPool.CreateVector()),
					Vector_1.Vector.CrossProduct(t, Vector_1.Vector.UpVectorProxy, B),
					B.MultiplyEqual(u),
					m.AdditionEqual(B),
					BulletPool_1.BulletPool.RecycleVector(B)),
					0 !== c && (t.MultiplyEqual(c), m.AdditionEqual(t)),
					0 !== s &&
						((u = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
							Vector_1.Vector.UpVectorProxy,
						),
						u.MultiplyEqual(s),
						m.AdditionEqual(u),
						BulletPool_1.BulletPool.RecycleVector(u)),
					n.AdditionEqual(m),
					BulletPool_1.BulletPool.RecycleVector(m),
					BulletPool_1.BulletPool.RecycleVector(t);
			} else
				n.FromUeVector(a.ActorForwardProxy),
					n.MultiplyEqual(t[0].X),
					n.AdditionEqual(a.ActorLocationProxy);
			let C = 0;
			var B = t[0];
			u =
				(e
					? ((s = 0 < (c = t[1]).Z ? c.Z : 1),
						(r.Gravity = 0 !== B.Z ? B.Z : -1e3),
						(u = Vector_1.Vector.Dist2D(n, l.GetActorLocation())),
						(u += h),
						(u = Math.max(u, B.X)),
						(u = Math.min(u, B.Y)),
						(r.BulletSpeed2D = u / s),
						(m = n.Z - l.GetActorLocation().Z),
						(m = Math.max(m, c.X)),
						(m = Math.min(m, c.Y)),
						(r.BulletSpeedZ = m / s - 0.5 * r.Gravity * s),
						(r.BulletSpeed = Math.sqrt(
							Math.pow(r.BulletSpeed2D, 2) + Math.pow(r.BulletSpeedZ, 2),
						)),
						(C =
							Math.atan(r.BulletSpeedZ / r.BulletSpeed2D) *
							MathCommon_1.MathCommon.RadToDeg))
					: ((C = t[1].X),
						(r.Gravity = 0 !== B.Z ? B.Z : -1e3),
						(a = Vector_1.Vector.Dist2D(n, l.GetActorLocation())),
						(e = n.Z - l.GetActorLocation().Z),
						(r.BulletSpeed2D = Math.sqrt(
							Math.abs(
								(a * a * r.Gravity) /
									(2 * e -
										2 * Math.tan(C * MathCommon_1.MathCommon.DegToRad) * a),
							),
						)),
						(r.BulletSpeedZ =
							Math.tan(C * MathCommon_1.MathCommon.DegToRad) * r.BulletSpeed2D),
						(r.BulletSpeed = Math.sqrt(
							Math.pow(r.BulletSpeed2D, 2) + Math.pow(r.BulletSpeedZ, 2),
						)),
						(r.BulletSpeed = Math.max(B.X, r.BulletSpeed)),
						(r.BulletSpeed = Math.min(B.Y, r.BulletSpeed)),
						(r.BulletSpeedZ =
							Math.sin(C * MathCommon_1.MathCommon.DegToRad) * r.BulletSpeed),
						(r.BulletSpeed2D =
							Math.cos(C * MathCommon_1.MathCommon.DegToRad) * r.BulletSpeed)),
				r.GravityMoveRotator);
			const _ = BulletPool_1.BulletPool.CreateVector();
			n.Subtraction(l.GetActorLocation(), _),
				_.Normalize(),
				MathUtils_1.MathUtils.LookRotationUpFirst(
					_,
					Vector_1.Vector.UpVectorProxy,
					u,
				),
				BulletPool_1.BulletPool.RecycleVector(_),
				(u.Pitch = C),
				o.InitVelocityRot.IsNearlyZero() ||
					((c = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(u),
					MathUtils_1.MathUtils.ComposeRotator(o.InitVelocityRot, c, u),
					BulletPool_1.BulletPool.RecycleRotator(c)),
				BulletPool_1.BulletPool.RecycleVector(n);
		}
	}
	g5o() {
		var o = this.BulletInfo,
			t = o.MoveInfo,
			e = o.AttackerMoveComp,
			l = this.Pe.Move,
			r = l.FollowType;
		(0 !== r && 3 !== r) || (o.ActorComponent.NeedDetach = !0),
			e?.HasBaseMovement &&
				(0 === l.Speed
					? o.ActorComponent.NeedDetach ||
						(o.ApplyCacheLocationAndRotation(),
						o.ActorComponent.SetAttachToComponent(
							o.AttackerActorComp.Actor.BasedMovement.MovementBase,
							FNameUtil_1.FNameUtil.NONE,
							1,
							1,
							1,
							!1,
						),
						(o.ActorComponent.NeedDetach = !0))
					: ((t.IsOnBaseMovement = !0),
						(r = e.DeltaBaseMovementSpeed) &&
							t.LastBaseMovementSpeed.FromUeVector(r)));
	}
	m5o() {
		var o = this.BulletInfo,
			t = this.Pe.Base;
		if (t.StickGround) {
			var e = BulletPool_1.BulletPool.CreateVector(),
				l = BulletPool_1.BulletPool.CreateVector(),
				r =
					(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace ||
						(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace =
							BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(
								UE.TraceLineElement.StaticClass(),
								QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
							)),
					Info_1.Info.IsBuildDevelopmentOrDebug &&
						((r = (a = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(
							this.BulletInfo.Attacker.Id,
						))
							? 2
							: 0),
						BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace.SetDrawDebugTrace(
							r,
						),
						a) &&
						(TraceElementCommon_1.TraceElementCommon.SetTraceColor(
							BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace,
							ColorUtils_1.ColorUtils.LinearGreen,
						),
						TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
							BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace,
							ColorUtils_1.ColorUtils.LinearRed,
						)),
					BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace),
				a = o.BaseTransformEntity?.Entity?.GetComponent(3);
			let u = 0;
			(u = (
				(i =
					(l.FromUeVector(o.GetActorLocation()),
					a?.Valid &&
						!this.r5o &&
						(0, RegisterComponent_1.isComponentInstance)(a, 3)))
					? a.GetSocketLocation(o.SkillBoneName)
					: ((l.Z += 500), o.GetActorLocation())
			).Z),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, l),
				l.FromUeVector(o.GetActorLocation()),
				(l.Z -= t.StickTraceLen),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, l);
			var i = TraceElementCommon_1.TraceElementCommon.LineTrace(
					r,
					PROFILE_STICK_GROUND,
				),
				n = r.HitResult;
			let s = -1;
			if (i) {
				var c = n.GetHitCount();
				if (0 < c) {
					let o = Math.abs(n.LocationZ_Array.Get(0) - u);
					for (let t = (s = 0); t < c; t++) {
						var m = n.LocationZ_Array.Get(t);
						o > (m = Math.abs(m - u)) && ((o = m), (s = t));
					}
				}
			}
			0 <= s
				? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, s, e),
					o.SetActorLocation(e),
					t.IgnoreGradient
						? e.FromUeVector(Vector_1.Vector.UpVectorProxy)
						: TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, s, e))
				: (a?.Valid
						? (e.FromUeVector(a.ActorLocationProxy),
							(e.Z -= a.ScaledHalfHeight))
						: (e.FromUeVector(o.GetActorLocation()), (e.Z -= t.Size.Z)),
					o.SetActorLocation(e),
					e.FromUeVector(Vector_1.Vector.UpVectorProxy)),
				(r = BulletPool_1.BulletPool.CreateRotator()),
				t.IgnoreGradient ||
					(MathUtils_1.MathUtils.LookRotationUpFirst(
						Vector_1.Vector.ForwardVectorProxy,
						e,
						r,
					),
					o.SetActorRotation(r),
					0 !== o.AttackerActorComp.ActorRotationProxy.Yaw &&
						(r.Set(0, o.AttackerActorComp.ActorRotationProxy.Yaw, 0),
						o.AddBulletLocalRotator(r.ToUeRotator()))),
				BulletPool_1.BulletPool.RecycleVector(e),
				BulletPool_1.BulletPool.RecycleVector(l),
				BulletPool_1.BulletPool.RecycleRotator(r);
		}
	}
	HY(o) {
		return 0 === o ? 0 : Math.random() * o;
	}
}
((exports.BulletActionInitMove = BulletActionInitMove).h5o = void 0),
	(BulletActionInitMove.u5o = void 0);

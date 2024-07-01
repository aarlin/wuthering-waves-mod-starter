"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletMoveSystem = void 0);
const cpp_1 = require("cpp"),
	UE = require("ue"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	Time_1 = require("../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	StatDefine_1 = require("../../../Common/StatDefine"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
	BulletController_1 = require("../BulletController"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletPool_1 = require("../Model/BulletPool"),
	BulletSystemBase_1 = require("./BulletSystemBase");
class BulletMoveSystem extends BulletSystemBase_1.BulletSystemBase {
	constructor() {
		super(...arguments), (this.mie = 0);
	}
	OnTick(e) {
		this.mie = e / TimeUtil_1.TimeUtil.InverseMillisecond;
		let t = 0;
		for (const r of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
			PerformanceController_1.PerformanceController
				.IsEntityTickPerformanceTest &&
				(t = cpp_1.KuroTime.GetMilliseconds64());
			var o,
				l = r.GetBulletInfo();
			if (!l.NeedDestroy && l.IsInit && !l.IsFrozen) {
				if (!BulletUtil_1.BulletUtil.CheckBulletAttackerExist(l)) {
					BulletController_1.BulletController.DestroyBullet(
						l.BulletEntityId,
						!1,
					);
					continue;
				}
				StatDefine_1.BATTLESTAT_ENABLED;
				try {
					l.BulletDataMain.Execution.MovementReplaced
						? l.ActionLogicComponent.ActionTickMovement(e)
						: (this.Fjo(l),
							(o = l.Actor.CustomTimeDilation * l.Entity.TimeDilation),
							this.Vjo(l, o),
							this.Hjo(l, o),
							this.jjo(l),
							l.ApplyCacheLocationAndRotation()),
						l.MoveInfo.LastFramePosition.FromUeVector(
							l.ActorComponent.ActorLocationProxy,
						);
				} catch (e) {
					e instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Bullet",
								18,
								"BulletMoveTick Error",
								e,
								["BulletEntityId", l.BulletEntityId],
								["BulletRowName", l.BulletRowName],
								["error", e.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Bullet",
								18,
								"BulletMoveTick Error",
								["EntityId", l.BulletEntityId],
								["BulletRowName", l.BulletRowName],
								["error", e],
							);
				}
				StatDefine_1.BATTLESTAT_ENABLED;
			}
			PerformanceController_1.PerformanceController
				.IsEntityTickPerformanceTest &&
				PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
					"Bullet",
					!0,
					cpp_1.KuroTime.GetMilliseconds64() - t,
					1,
					l.BornFrameCount,
				);
		}
	}
	Fjo(e) {
		var t,
			o = e.MoveInfo;
		o.BaseAdditiveAccelerate.IsZero() &&
			o.AdditiveAccelerateCurve &&
			((t = e.BulletDataMain.Base),
			(e = BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
				e.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
				t.Duration,
				o.AdditiveAccelerateCurve,
			)),
			o.AdditiveAccelerate.Set(
				o.BaseAdditiveAccelerate.X * e.X,
				o.BaseAdditiveAccelerate.Y * e.Y,
				o.BaseAdditiveAccelerate.Z * e.Z,
			));
	}
	Vjo(e, t) {
		switch (e.BulletDataMain.Move.Trajectory) {
			case 0:
				break;
			case 2:
				this.Wjo(e);
				break;
			case 1:
				this.Kjo(e, t);
				break;
			case 3:
				this.Qjo(e, t);
				break;
			case 5:
			case 4:
				this.Xjo(e);
		}
	}
	$jo(e) {
		let t;
		switch (e.BulletDataMain.Move.TrackTarget) {
			case 6:
			case 2:
			case 7:
			case 8:
			case 5:
			case 9:
			case 4:
				t = e.TargetActorComp;
				break;
			case 1:
				t = BulletUtil_1.BulletUtil.GetCurrentRole(e);
				break;
			case 3:
				if (e.BulletInitParams.FromRemote) return e.TargetActorComp;
				(t = e.GetLockOnTargetDynamic()),
					this.OnChangeTargetRequest(e, t?.Entity ? t?.Entity.Id : -1);
		}
		return t;
	}
	Yjo(e) {
		var t,
			o,
			l = e.MoveInfo,
			r = this.$jo(e);
		r?.Valid &&
			((t = (r = r.Entity.GetComponent(161)).ActorComp.ActorLocation),
			(o = BulletPool_1.BulletPool.CreateVector()).Set(
				t.X,
				t.Y,
				t.Z -
					Math.min(r.GetHeightAboveGround(), l.MinFollowHeight) -
					r.ActorComp.HalfHeight,
			),
			l.SpeedFollowTarget < 1
				? (Vector_1.Vector.Lerp(
						e.ActorComponent.ActorLocationProxy,
						o,
						l.SpeedFollowTarget,
						l.LocationFollowTarget,
					),
					e.SetActorLocation(l.LocationFollowTarget))
				: e.SetActorLocation(o),
			BulletPool_1.BulletPool.RecycleVector(o));
	}
	Wjo(e) {
		var t = this.$jo(e);
		(t = BulletUtil_1.BulletUtil.GetTargetLocation(t, e.SkillBoneName, e)) &&
			e.SetActorRotation(
				UE.KismetMathLibrary.FindLookAtRotation(
					e.ActorComponent.ActorLocation,
					t,
				),
			);
	}
	Kjo(e, t) {
		var o = this.$jo(e),
			l = e.BulletDataMain?.Move.TrackTargetBone;
		(l = BulletUtil_1.BulletUtil.GetTargetLocation(
			o,
			StringUtils_1.StringUtils.IsNothing(l)
				? e.SkillBoneName
				: FNameUtil_1.FNameUtil.GetDynamicFName(l),
			e,
		)) &&
			(o?.Entity.GetComponent(185)?.HasTag(1008164187)
				? e.OnTargetInValid()
				: (o = e.BulletDataMain.Move).TrackParams.length <= 0 ||
					(0 !== o.TrackParams[0].X
						? this.Jjo(e, l, t)
						: (0 === o.TrackParams[0].Y && 0 === o.TrackParams[0].Z) ||
							this.zjo(e, l)));
	}
	Jjo(e, t, o) {
		var l =
			((r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t),
			r.SubtractionEqual(e.ActorComponent.ActorLocationProxy),
			r.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
			Vector_1.Vector.DotProduct(r, e.ActorComponent.ActorForwardProxy));
		l = Math.acos(l) * MathCommon_1.MathCommon.RadToDeg;
		if ((BulletPool_1.BulletPool.RecycleVector(r), !(l <= 0))) {
			var r = e.BulletDataMain.Move,
				a = e.BulletDataMain.Base,
				i = r.TrackParams[0].X;
			let c = 0;
			(c =
				0 < r.TrackCurves.length
					? BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
							e.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
							a.Duration,
							r.TrackCurves[0],
						).X *
						this.mie *
						i
					: i * this.mie),
				(a = Math.min(l, c)),
				(r = UE.KismetMathLibrary.FindLookAtRotation(
					e.ActorComponent.ActorLocation,
					t,
				)),
				(i = e.MoveInfo).TraceRotator.Set(
					r.Pitch,
					r.Yaw,
					e.ActorComponent.ActorRotation.Roll,
				),
				(l = MathUtils_1.MathUtils.IsNearlyZero(
					l,
					MathCommon_1.MathCommon.KindaSmallNumber,
				)
					? MathCommon_1.MathCommon.KindaSmallNumber
					: l),
				(t = Rotator_1.Rotator.Create()),
				Rotator_1.Rotator.Lerp(
					e.ActorComponent.ActorRotationProxy,
					i.TraceRotator,
					(a * o) / l,
					t,
				),
				e.SetActorRotation(t);
		}
	}
	zjo(e, t) {
		var o = e.BulletDataMain.Move,
			l = o.TrackParams[0].Y,
			r = o.TrackParams[0].Z,
			a = e.ActorComponent,
			i =
				(t = UE.KismetMathLibrary.FindLookAtRotation(a.ActorLocation, t))
					.Pitch - a.ActorRotationProxy.Pitch;
		let c = t.Yaw - a.ActorRotationProxy.Yaw,
			n =
				(Math.abs(c) > MathCommon_1.MathCommon.FlatAngle &&
					(c =
						(2 * MathCommon_1.MathCommon.FlatAngle - Math.abs(c)) *
						Math.sign(c) *
						-1),
				0),
			u = 0;
		(u = Math.abs(c) > r * this.mie ? r * this.mie * Math.sign(c) : c),
			0 < o.TrackCurves.length &&
				((t = e.BulletDataMain.Base),
				(u =
					(t = BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
						e.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
						t.Duration,
						o.TrackCurves[0],
					)).Z *
					this.mie *
					r *
					Math.sign(c)),
				(n = t.Y * this.mie * l * Math.sign(i))),
			(n = Math.abs(i) > l * this.mie ? l * this.mie * Math.sign(i) : i),
			Math.abs(u) > Math.abs(c) && (u = c),
			Math.abs(n) > Math.abs(i) && (n = i),
			(o = a.ActorRotationProxy),
			(r = e.MoveInfo).TraceRotator.Set(o.Pitch + n, o.Yaw + u, o.Roll),
			e.SetActorRotation(r.TraceRotator);
	}
	Qjo(e, t) {
		var o = e.MoveInfo,
			l = BulletPool_1.BulletPool.CreateVector(),
			r =
				(l.FromUeVector(e.ActorComponent.ActorLocationProxy),
				l.SubtractionEqual(o.RoundCenter),
				e.BulletDataMain.Move),
			a =
				((t =
					(r.Speed * this.mie * t * MathCommon_1.MathCommon.RadToDeg) /
					r.TrackParams[0].X),
				BulletPool_1.BulletPool.CreateVector()),
			i =
				(a.FromUeVector(o.RoundCenter), BulletPool_1.BulletPool.CreateVector());
		l.RotateAngleAxis(t, o.RoundOnceAxis, i),
			a.AdditionEqual(i),
			e.SetActorRotation(
				UE.KismetMathLibrary.FindLookAtRotation(
					e.ActorComponent.ActorLocation,
					a.ToUeVector(),
				),
			),
			0 !== r.TrackTarget &&
				10 !== r.TrackTarget &&
				(t = this.$jo(e)?.Entity) &&
				((r = BulletPool_1.BulletPool.CreateVector()),
				e.SetTargetById(t.Id),
				this.Zjo(e, e.TargetActorComp, r),
				a.AdditionEqual(r),
				o.RoundCenter.AdditionEqual(r),
				BulletPool_1.BulletPool.RecycleVector(r)),
			e.SetActorLocation(a),
			BulletPool_1.BulletPool.RecycleVector(l),
			BulletPool_1.BulletPool.RecycleVector(a),
			BulletPool_1.BulletPool.RecycleVector(i);
	}
	Zjo(e, t, o) {
		(t = t.ActorLocationProxy),
			o.FromUeVector(t),
			(e = e.MoveInfo),
			o.SubtractionEqual(e.RoundCenterLastLocation),
			e.RoundCenterLastLocation.FromUeVector(t);
	}
	Xjo(e) {
		var t = e.BulletDataMain.Move.TrackParams;
		!t ||
			t.length < 2 ||
			(((t = e.MoveInfo).BulletSpeedZ += t.Gravity * this.mie),
			(t.BulletSpeed = Math.sqrt(
				Math.pow(t.BulletSpeed2D, 2) + Math.pow(t.BulletSpeedZ, 2),
			)),
			(e = t.GravityMoveRotator).Set(
				Math.atan(t.BulletSpeedZ / t.BulletSpeed2D) *
					MathCommon_1.MathCommon.RadToDeg,
				e.Yaw,
				e.Roll,
			));
	}
	Hjo(e, t) {
		var o = e.MoveInfo,
			l = e.BulletDataMain.Move,
			r = e.BulletDataMain.Base;
		let a = 0,
			i =
				((a = l.SpeedCurve
					? (Info_1.Info.IsBuildDevelopmentOrDebug &&
							!l.SpeedCurve.IsValid() &&
							UE.KismetSystemLibrary.ExecuteConsoleCommand(
								GlobalData_1.GlobalData.World,
								"Obj Refs Name=DelayBulletSpeed",
							),
						BulletStaticFunction_1.BulletStaticFunction.CompCurveFloat(
							e.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond,
							r.Duration,
							l.SpeedCurve,
						) * o.BulletSpeed)
					: o.BulletSpeed),
				r.Duration);
		var c,
			n,
			u = BulletPool_1.BulletPool.CreateVector();
		switch (l.Trajectory) {
			case 2:
				0 < l.TrackParams.length &&
					0 < l.TrackParams[0].X &&
					(i = l.TrackParams[0].X);
				var m,
					s,
					B = BulletUtil_1.BulletUtil.GetTargetLocation(
						e.TargetActorComp,
						e.SkillBoneName,
						e,
					);
				B
					? ((m =
							i -
							(Time_1.Time.WorldTime - e.GenerateTime) /
								TimeUtil_1.TimeUtil.InverseMillisecond),
						(m = MathUtils_1.MathUtils.IsNearlyZero(
							m,
							MathCommon_1.MathCommon.KindaSmallNumber,
						)
							? MathCommon_1.MathCommon.KindaSmallNumber
							: m),
						(s = BulletPool_1.BulletPool.CreateVector()).FromUeVector(B),
						(a =
							Vector_1.Vector.Dist(e.ActorComponent.ActorLocationProxy, s) / m),
						BulletPool_1.BulletPool.RecycleVector(s),
						a < l.Speed && (a = l.Speed),
						o.UpdateDirVector.Set(a * this.mie * t, 0, 0),
						e.ActorRotateVector(o.UpdateDirVector, u))
					: ((a = o.BulletSpeed),
						o.BeginSpeedRotator.Vector(u),
						u.MultiplyEqual(a * this.mie * t));
				break;
			case 5:
			case 4:
				o.GravityMoveRotator.Quaternion().RotateVector(
					Vector_1.Vector.ForwardVectorProxy,
					u,
				),
					u.MultiplyEqual(a * this.mie * t);
				break;
			case 1:
				e.GetActorForward(u), u.MultiplyEqual(a * this.mie * t);
				break;
			case 3:
				return void BulletPool_1.BulletPool.RecycleVector(u);
			case 6:
				return this.Yjo(e), void BulletPool_1.BulletPool.RecycleVector(u);
			default:
				o.BeginSpeedRotator.Vector(u), u.MultiplyEqual(a * this.mie * t);
		}
		u.MultiplyEqual(o.BulletSpeedRatio),
			o.BaseAdditiveAccelerate.IsZero() ||
				((r = BulletPool_1.BulletPool.CreateVector()),
				o.V0.Multiply(this.mie, r),
				(c = BulletPool_1.BulletPool.CreateVector()),
				o.AdditiveAccelerate.Multiply(0.5 * this.mie * this.mie, c),
				r.AdditionEqual(c),
				u.AdditionEqual(r),
				(n = BulletPool_1.BulletPool.CreateVector()),
				o.AdditiveAccelerate.Multiply(this.mie, n),
				o.V0.AdditionEqual(n),
				BulletPool_1.BulletPool.RecycleVector(r),
				BulletPool_1.BulletPool.RecycleVector(c),
				BulletPool_1.BulletPool.RecycleVector(n)),
			o.BulletSpeedDir.FromUeVector(u),
			this.eWo(e, u),
			BulletPool_1.BulletPool.RecycleVector(u),
			this.tWo(e, o, l.TrackTarget);
	}
	tWo(e, t, o) {
		10 === o &&
			((o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
				BulletUtil_1.BulletUtil.GetTargetLocation(
					void 0,
					FNameUtil_1.FNameUtil.NONE,
					e,
				),
			),
			(t = t.BulletSpeedDir.SizeSquared()),
			Vector_1.Vector.DistSquared(e.GetActorLocation(), o) < t &&
				((e.IsTimeNotEnough = !0),
				e?.SetActorLocation(o),
				BulletController_1.BulletController.DestroyBullet(
					e.BulletEntityId,
					!1,
				)),
			BulletPool_1.BulletPool.RecycleVector(o));
	}
	eWo(e, t) {
		var o,
			l = e.MoveInfo;
		l.IsOnBaseMovement &&
			((o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
				l.LastBaseMovementSpeed,
			),
			o.MultiplyEqual(this.mie),
			t.AdditionEqual(o),
			BulletPool_1.BulletPool.RecycleVector(o)),
			t.Equals(Vector_1.Vector.ZeroVectorProxy) ||
				((l = BulletPool_1.BulletPool.CreateVector()),
				e.ActorComponent.ActorLocationProxy.Addition(t, l),
				e.SetActorLocation(l),
				BulletPool_1.BulletPool.RecycleVector(l));
	}
	jjo(e) {
		var t,
			o = e.BulletDataMain.Move,
			l = o.FollowType;
		(0 !== l && 3 !== l) ||
			((l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
				o.FollowSkeletonRotLimit,
			),
			l.IsZero()
				? BulletPool_1.BulletPool.RecycleVector(l)
				: ((o = e.MoveInfo),
					(t = e.ActorComponent.ActorRotationProxy),
					l.X < 1
						? (o.FollowBoneBulletRotator.Roll = t.Roll)
						: (o.FollowBoneBulletRotator.Roll = 0),
					l.Y < 1
						? (o.FollowBoneBulletRotator.Pitch = t.Pitch)
						: (o.FollowBoneBulletRotator.Pitch = 0),
					l.Z < 1
						? (o.FollowBoneBulletRotator.Yaw = t.Yaw)
						: (o.FollowBoneBulletRotator.Yaw =
								e.AttackerActorComp.ActorRotationProxy.Yaw),
					BulletPool_1.BulletPool.RecycleVector(l),
					e.SetActorRotation(o.FollowBoneBulletRotator)));
	}
	OnChangeTargetRequest(e, t) {
		var o, l, r;
		ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			!e.BulletInitParams.FromRemote &&
			(1 !== e.BulletDataMain.Base.SyncType
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Bullet",
						21,
						"动态改变目标的子弹必须设置 基础设置.网络同步类型 为 网络同步子弹",
						["BulletId", e.BulletRowName],
						["Attacker", e.AttackerActorComp?.Actor?.GetName()],
					)
				: (e.TargetIdLast !== t &&
						((o = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(
							e.BulletEntityId,
						)),
						(l =
							ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t)),
						((r = Protocol_1.Aki.Protocol.aNn.create()).VVn = {
							r4n: void 0,
							E4n: o,
							L4n: MathUtils_1.MathUtils.NumberToLong(l),
						}),
						CombatMessage_1.CombatNet.Call(15723, e.Attacker, r),
						Log_1.Log.CheckDebug()) &&
						Log_1.Log.Debug(
							"Bullet",
							21,
							"修改子弹目标请求",
							["新的目标id", t],
							["CreatureId", l],
						),
					(e.TargetIdLast = t)));
	}
}
(exports.BulletMoveSystem = BulletMoveSystem).gW = void 0;

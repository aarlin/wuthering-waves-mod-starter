"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletCollisionSystem = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	Time_1 = require("../../../../Core/Common/Time"),
	DamageById_1 = require("../../../../Core/Define/ConfigQuery/DamageById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Transform_1 = require("../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	SpaceUtils_1 = require("../../../../Core/Utils/SpaceUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	IMatch_1 = require("../../../../UniverseEditor/Interface/IMatch"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	StatDefine_1 = require("../../../Common/StatDefine"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	SceneTeamController_1 = require("../../../Module/SceneTeam/SceneTeamController"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
	BulletTypes_1 = require("../BulletTypes"),
	ExtraEffectBaseTypes_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectBaseTypes"),
	ExtraEffectDamageFilter_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectDamageFilter"),
	BulletActionInitHit_1 = require("../Action/BulletActionInitHit"),
	BulletController_1 = require("../BulletController"),
	BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil"),
	BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletEntity_1 = require("../Entity/BulletEntity"),
	BulletCollisionInfo_1 = require("../Model/BulletCollisionInfo"),
	BulletPool_1 = require("../Model/BulletPool"),
	BulletTraceElementPool_1 = require("../Model/BulletTraceElementPool"),
	BulletSystemBase_1 = require("./BulletSystemBase"),
	PROFILE_UPDATETRACE_BOX = "BulletMoveUpdateTraceBox",
	PROFILE_UPDATETRACE_SPHERE = "BulletMoveUpdateTraceSphere",
	PROFILE_UPDATE_TRACE_DEFAULT = "BulletMoveUpdateTraceDefault",
	PROFILE_OBSTACLES = "BulletMoveObstacles",
	PROFILE_TICKTRACE = "BulletOnTickTrace";
class BulletCollisionSystem extends BulletSystemBase_1.BulletSystemBase {
	constructor() {
		super(...arguments),
			(this.BHo = Transform_1.Transform.Create()),
			(this.bHo = Vector_1.Vector.Create()),
			(this.qHo = Vector_1.Vector.Create()),
			(this._9o = void 0),
			(this.GHo = void 0),
			(this.NHo = void 0),
			(this.OHo = void 0),
			(this.mie = 0),
			(this.kHo = Vector_1.Vector.Create()),
			(this.FHo = Vector_1.Vector.Create());
	}
	get VHo() {
		return this._9o.ActionLogicComponent;
	}
	OnTick(t) {
		let e = 0;
		this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond;
		for (const l of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
			PerformanceController_1.PerformanceController
				.IsEntityTickPerformanceTest &&
				(e = cpp_1.KuroTime.GetMilliseconds64());
			var o = l.GetBulletInfo();
			!o.NeedDestroy &&
				o.IsInit &&
				(StatDefine_1.BATTLESTAT_ENABLED,
				this.HHo(t, o),
				StatDefine_1.BATTLESTAT_ENABLED),
				PerformanceController_1.PerformanceController
					.IsEntityTickPerformanceTest &&
					PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
						"Bullet",
						!1,
						cpp_1.KuroTime.GetMilliseconds64() - e,
						1,
						o.BornFrameCount,
					);
		}
		(this._9o = void 0),
			(this.GHo = void 0),
			(this.NHo = void 0),
			(this.OHo = void 0);
	}
	HHo(t, e) {
		(this._9o = e),
			(this.GHo = e.CollisionInfo),
			(this.NHo = e.BulletDataMain.Base.Shape),
			4 === this.NHo && ((this.OHo = e.RayInfo), this.jHo(t)),
			this.WHo(),
			this.KHo(),
			this.QHo(),
			this.XHo(t),
			ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
				this._9o.Attacker.Id,
			) && BulletCollisionUtil_1.BulletCollisionUtil.ShowBulletDeBugDraw(e);
	}
	jHo(t) {
		var e = this._9o;
		if (!e.NeedDestroy && e.CollisionInfo.IsStartup) {
			this.GHo.UpdateTraceSphere ||
				(this.GHo.UpdateTraceSphere =
					BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
						ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
							this._9o.BulletDataMain.Logic.ProfileName.toString(),
							this._9o.BulletRowName,
						),
						e.AttackerId,
						this.GHo.IgnoreQueries,
					));
			var o = this.GHo.UpdateTraceSphere;
			if (
				(t =
					((this.OHo.IsBlock = !1),
					this.OHo.StartPoint.FromUeVector(
						this._9o.ActorComponent.ActorLocationProxy,
					),
					this.OHo.EndPoint.FromUeVector(
						this._9o.ActorComponent.ActorForwardProxy,
					),
					(this.OHo.Length += this.OHo.Speed * t),
					(this.OHo.Length = Math.min(this.OHo.Length, this._9o.Size.Y)),
					this.OHo.EndPoint.MultiplyEqual(this.OHo.Length),
					this.OHo.EndPoint.AdditionEqual(this.OHo.StartPoint),
					o.SetStartLocation(
						this.OHo.StartPoint.X,
						this.OHo.StartPoint.Y,
						this.OHo.StartPoint.Z,
					),
					o.SetEndLocation(
						this.OHo.EndPoint.X,
						this.OHo.EndPoint.Y,
						this.OHo.EndPoint.Z,
					),
					(o.Radius = e.Size.Z),
					this.GHo.ClearHitActorData(),
					(this.GHo.HasSearchedHitActorsCurFrame = !0),
					TraceElementCommon_1.TraceElementCommon.SphereTrace(
						o,
						PROFILE_TICKTRACE,
					)))
			) {
				var l = new Array(),
					i = o.HitResult.GetHitCount();
				for (let t = 0; t < i; t++)
					l.push({ Distance: o.HitResult.DistanceArray.Get(t), Index: t });
				if (0 < l.length) {
					l.sort((t, e) => t.Distance - e.Distance);
					var a = o.HitResult.Actors,
						n = o.HitResult.Components;
					for (const t of l) {
						var r = a.Get(t.Index),
							s = n.Get(t.Index);
						if ((this.$Ho(r, s), 0 < this.GHo.ArrayHitActorData.length))
							return (
								(this.OHo.IsBlock = !0),
								(this.OHo.Length = t.Distance),
								this.OHo.EndPoint.FromUeVector(
									this._9o.ActorComponent.ActorForwardProxy,
								),
								this.OHo.EndPoint.MultiplyEqual(this.OHo.Length),
								void this.OHo.EndPoint.AdditionEqual(this.OHo.StartPoint)
							);
					}
				}
			}
		}
	}
	WHo() {
		var t = this._9o.LiveTime - this.GHo.ActiveDelayMs;
		if (
			(!this.GHo.IsPassDelay &&
				0 < this.GHo.ActiveDelayMs &&
				0 <= t &&
				((this.GHo.IsPassDelay = !0),
				(this.GHo.IsStartup = !0),
				(this.GHo.IsProcessOpen = !0),
				BulletConstant_1.BulletConstant.OpenCollisionLog) &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Bullet",
					21,
					"Bullet.UpdateInterval.Delay",
					["IdName", this._9o.BulletRowName],
					["Actor", this._9o.Actor?.GetName()],
					["ActiveTime", t],
				),
			this.GHo.IsPassDelay && 0 < this.GHo.IntervalMs)
		) {
			var e = this.GHo.IntervalMs * this.GHo.StageInterval,
				o = this.GHo.ObjectsHitCurrent;
			if (this._9o.BulletDataMain.Base.IntervalAfterHit) {
				var l,
					i,
					a = new Array();
				for ([l, i] of o)
					Time_1.Time.Now - i >= this.GHo.IntervalMs && a.push(l);
				for (let t = 0, e = a.length; t < e; t++) o.delete(a[t]);
			} else
				e <= t &&
					(this.GHo.StageInterval++,
					(this.GHo.AllowedEnergy = !0),
					(this.GHo.IsProcessOpen = !0),
					o.clear(),
					BulletConstant_1.BulletConstant.OpenCollisionLog) &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						21,
						"Bullet.UpdateInterval",
						["IdName", this._9o.BulletRowName],
						["Actor", this._9o.Actor?.GetName()],
						["TotalIntervalMs", e],
						["ActiveTime", t],
					);
		}
	}
	KHo() {
		var t, e, o, l;
		this._9o.IsTensile &&
			(e = this._9o.AttackerActorComp)?.Actor &&
			((t = this._9o.ActorComponent),
			(o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
				e.Actor.Mesh.GetRelativeTransform().GetLocation(),
			),
			o.AdditionEqual(e.ActorLocationProxy),
			(l = this.BHo).SetRotation(e.ActorQuatProxy),
			l.SetScale3D(e.ActorScaleProxy),
			l.SetLocation(o),
			BulletPool_1.BulletPool.RecycleVector(o),
			(e = BulletPool_1.BulletPool.CreateVector()),
			l.TransformPosition(this._9o.BornLocationOffset, e),
			(o = UE.KismetMathLibrary.FindLookAtRotation(
				t.ActorLocation,
				e.ToUeVector(),
			)),
			(l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
				this._9o.InitPosition,
			),
			l.AdditionEqual(e),
			l.DivisionEqual(2),
			e.SubtractionEqual(this._9o.InitPosition),
			this.bHo.FromUeVector(this._9o.Size),
			(this.bHo.X += e.Size() / 2),
			this.GHo.CollisionComponent instanceof UE.BoxComponent &&
				this.GHo.CollisionComponent.SetBoxExtent(this.bHo.ToUeVector(), !1),
			t.SetActorLocationAndRotation(l.ToUeVector(), o),
			BulletPool_1.BulletPool.RecycleVector(l),
			BulletPool_1.BulletPool.RecycleVector(e));
	}
	QHo() {
		var t, e;
		this.GHo.FinalScale.Equals(Vector_1.Vector.OneVectorProxy) ||
			(this.GHo.CollisionComponent
				? ((t = this._9o.BulletDataMain).Scale.ScaleCurve
						? (this.qHo.FromUeVector(
								BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
									this._9o.LiveTime,
									t.Base.Duration * TimeUtil_1.TimeUtil.InverseMillisecond,
									t.Scale.ScaleCurve,
								),
							),
							this.qHo.MultiplyEqual(this.GHo.FinalScale))
						: Vector_1.Vector.Lerp(
								Vector_1.Vector.OneVectorProxy,
								this.GHo.FinalScale,
								this._9o.LiveTime /
									(TimeUtil_1.TimeUtil.InverseMillisecond * t.Base.Duration),
								this.qHo,
							),
					t.Base.Size.Multiply(this.qHo, this._9o.Size),
					3 === t.Base.Shape &&
						t.Scale.ShapeSwitch &&
						((e = t.Base.Size.X - t.Base.Size.Y),
						(this._9o.Size.Y = this._9o.Size.X - e)),
					BulletCollisionUtil_1.BulletCollisionUtil.UpdateCollisionExtend(
						t.Base.Shape,
						this.GHo.CollisionComponent,
						this._9o.Size,
						this.GHo.CenterLocalLocation,
						t.Base.Rotator,
					))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Bullet",
						18,
						"更新子弹缩放时，子弹没有碰撞组件",
						["BulletEntityId", this._9o.BulletEntityId],
						["BulletRowName", this._9o.BulletRowName],
					));
	}
	XHo(t) {
		this._9o.FrozenTime &&
			(BulletUtil_1.BulletUtil.BulletFrozen(this._9o),
			(this._9o.FrozenTime -= t),
			this._9o.FrozenTime <= 0) &&
			(BulletUtil_1.BulletUtil.BulletUnfrozen(this._9o),
			(this._9o.FrozenTime = void 0));
	}
	OnAfterTick(t) {
		this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond;
		let e = 0;
		for (const l of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
			PerformanceController_1.PerformanceController
				.IsEntityTickPerformanceTest &&
				(e = cpp_1.KuroTime.GetMilliseconds64());
			var o = l.GetBulletInfo();
			if (!o.NeedDestroy && o.IsInit) {
				if (!BulletUtil_1.BulletUtil.CheckBulletAttackerExist(o)) {
					BulletController_1.BulletController.DestroyBullet(
						o.BulletEntityId,
						!1,
					);
					continue;
				}
				StatDefine_1.BATTLESTAT_ENABLED,
					this.YHo(t, o),
					StatDefine_1.BATTLESTAT_ENABLED;
			}
			PerformanceController_1.PerformanceController
				.IsEntityTickPerformanceTest &&
				PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
					"Bullet",
					!1,
					cpp_1.KuroTime.GetMilliseconds64() - e,
					1,
					o.BornFrameCount,
				);
		}
		(this._9o = void 0),
			(this.GHo = void 0),
			(this.NHo = void 0),
			(this.OHo = void 0);
	}
	YHo(t, e) {
		if (
			((this._9o = e),
			(this.GHo = e.CollisionInfo),
			(this.NHo = e.BulletDataMain.Base.Shape),
			this.JHo())
		) {
			if (7 === this.NHo) this.zHo();
			else {
				var o = this.ZHo();
				if (
					(e.HasCheckedPosition ||
						(o && e.BulletDataMain.Logic.DestroyOnHitObstacle && this.ejo(),
						e.CheckedPosition()),
					this.tjo(),
					!this.GHo.HasSearchedHitActorsCurFrame)
				) {
					o = (0, puerts_1.$ref)(void 0);
					var l =
						(this.GHo.CollisionComponent?.GetOverlappingComponents(o),
						(0, puerts_1.$unref)(o));
					if (l) {
						var i = l.Num();
						for (let t = 0; t < i; t++) {
							var a = l.Get(t),
								n = a.GetOwner();
							this.$Ho(n, a);
						}
					}
				}
			}
			this.GHo.IsInProcessHit = !0;
			e = this._9o.CollisionLocation;
			var r,
				s = this.GHo.ArrayHitActorData,
				c = s.length;
			if (1 < c) {
				for (let t = 0; t < c; t++) {
					var u = s[t],
						m = BulletCollisionInfo_1.bulletHitPriorityList[u.Type];
					u.Priority = void 0 !== m ? m - t : 0;
				}
				this.GHo.ArrayHitActorData.sort((t, e) => e.Priority - t.Priority);
			}
			if (this.GHo.IsProcessOpen) {
				let t = 1;
				for (const e of this.GHo.ArrayHitActorData)
					this.ijo(e)
						? ((e.IsValidHit = !0),
							(e.ValidProcessIndex = t++),
							this.GHo.LastMapHitActorData.get(e.Actor)?.IsValidHit &&
								(e.IsContinueHit = !0),
							this.ojo(e))
						: ((e.IsValidHit = !1), (e.IsContinueHit = !1));
				!this._9o.BulletDataMain.Base.IntervalAfterHit &&
					0 < this.GHo.IntervalMs &&
					(this.GHo.IsProcessOpen = !1);
			}
			for (const t of this.GHo.LastArrayHitActorData)
				t.IsValidHit &&
					(!(r = t.Actor) ||
						((r = this.GHo.MapHitActorData.get(r)) && r.IsValidHit) ||
						BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this._9o, t));
			this.GHo.LastFramePosition.FromUeVector(e),
				(this.GHo.IsInProcessHit = !1),
				this.GHo.UpdateLastHitActorData();
		} else {
			if (0 < this.GHo.LastArrayHitActorData.length) {
				this.GHo.IsInProcessHit = !0;
				for (const t of this.GHo.LastArrayHitActorData)
					t.IsValidHit &&
						BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this._9o, t);
				(this.GHo.IsInProcessHit = !1), this.GHo.ClearLastHitActorData();
			}
			0 < this.GHo.ArrayHitActor.length && this.GHo.ClearHitActorData();
		}
	}
	JHo() {
		var t = this._9o;
		return (
			!(
				(t.CloseCollision ||
					t.NeedDestroy ||
					!t.CollisionInfo.IsStartup ||
					t.ActorComponent.Owner?.IsActorBeingDestroyed()) ??
				t.IsFrozen
			) && !t.IsTensile
		);
	}
	rjo(t) {
		var e = t.BulletDataMain.Move,
			o = t.ActorComponent.NeedDetach;
		e = e.Speed;
		return !(!o && (0 === e || e * this.mie < t.Size.X));
	}
	ZHo() {
		if (4 === this.NHo || this.GHo.RegionComponent) return !1;
		var t = this._9o,
			e = this.GHo.NeedHitObstacles,
			o = t.BulletDataMain.Base.IsOversizeForTrace;
		let l = !0,
			i = !0;
		(l = this.GHo.HasObstaclesCollision
			? ((i = e), this.rjo(t))
			: ((i = !1), e ? !o : this.rjo(t))),
			this.GHo.ClearHitActorData();
		var a = t.CollisionLocation;
		if (
			(this.GHo.LastFramePosition.Equals(a) &&
				a.AdditionEqual(t.ActorComponent.ActorForwardProxy),
			i && this.njo(t, a),
			!l)
		)
			return !1;
		let n,
			r,
			s = !(this.GHo.HasSearchedHitActorsCurFrame = !0);
		switch (t.BulletDataMain.Base.Shape) {
			case 0:
				this.GHo.UpdateTraceBox ||
					(this.GHo.UpdateTraceBox =
						BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
							ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
								t.BulletDataMain.Logic.ProfileName.toString(),
								t.BulletRowName,
							),
							t.AttackerId,
							this.GHo.IgnoreQueries,
						)),
					(r = this.GHo.UpdateTraceBox),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						r,
						this.GHo.LastFramePosition,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, a),
					TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(r, t.Size),
					TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
						r,
						t.CollisionRotator,
					),
					(s = TraceElementCommon_1.TraceElementCommon.BoxTrace(
						r,
						PROFILE_UPDATETRACE_BOX,
					)) && (n = r.HitResult);
				break;
			case 1:
				this.GHo.UpdateTraceSphere ||
					(this.GHo.UpdateTraceSphere =
						BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
							ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
								t.BulletDataMain.Logic.ProfileName.toString(),
								t.BulletRowName,
							),
							t.AttackerId,
							this.GHo.IgnoreQueries,
						)),
					((r = this.GHo.UpdateTraceSphere).Radius = t.Size.X),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						r,
						this.GHo.LastFramePosition,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, a),
					(s = TraceElementCommon_1.TraceElementCommon.SphereTrace(
						r,
						PROFILE_UPDATETRACE_SPHERE,
					)) && (n = r.HitResult);
				break;
			case 3:
				this.GHo.UpdateTraceBox ||
					(this.GHo.UpdateTraceBox =
						BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
							ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
								t.BulletDataMain.Logic.ProfileName.toString(),
								t.BulletRowName,
							),
							t.AttackerId,
							this.GHo.IgnoreQueries,
						)),
					(r = this.GHo.UpdateTraceBox),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						r,
						this.GHo.LastFramePosition,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, a);
				var c = BulletPool_1.BulletPool.CreateVector();
				c.Set(this._9o.Size.X, this._9o.Size.X, this._9o.Size.Z),
					TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(r, c),
					BulletPool_1.BulletPool.RecycleVector(c),
					TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
						r,
						t.CollisionRotator,
					),
					(s = TraceElementCommon_1.TraceElementCommon.BoxTrace(
						r,
						PROFILE_UPDATETRACE_BOX,
					)) && (n = r.HitResult);
				break;
			case 2:
				this.GHo.UpdateTraceBox ||
					(this.GHo.UpdateTraceBox =
						BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
							ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
								t.BulletDataMain.Logic.ProfileName.toString(),
								t.BulletRowName,
							),
							t.AttackerId,
							this.GHo.IgnoreQueries,
						)),
					(r = this.GHo.UpdateTraceBox),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						r,
						this.GHo.LastFramePosition,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, a),
					TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
						r,
						BulletCollisionUtil_1.BulletCollisionUtil.GetSectorExtent(
							this._9o.Size,
							this.GHo.CenterLocalLocation,
						),
					),
					TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
						r,
						t.CollisionRotator,
					),
					(s = TraceElementCommon_1.TraceElementCommon.BoxTrace(
						r,
						PROFILE_UPDATETRACE_BOX,
					)) && (n = r.HitResult);
				break;
			default:
				this.GHo.UpdateTraceLine ||
					(this.GHo.UpdateTraceLine =
						BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(
							ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
								t.BulletDataMain.Logic.ProfileName.toString(),
								t.BulletRowName,
							),
							t.AttackerId,
							this.GHo.IgnoreQueries,
						)),
					(r = this.GHo.UpdateTraceLine),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						r,
						this.GHo.LastFramePosition,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, a),
					(s = TraceElementCommon_1.TraceElementCommon.LineTrace(
						r,
						PROFILE_UPDATE_TRACE_DEFAULT,
					)) && (n = r.HitResult);
		}
		if (s) {
			var u = n.GetHitCount();
			if (!(u <= 0))
				if (1 === u)
					this.$Ho(n.Actors.Get(0), n.Components.Get(0), void 0, n, 0);
				else {
					var m = new Array(),
						B = n.Components,
						C = n.Actors,
						h = n.LocationX_Array,
						_ = n.LocationY_Array,
						d = n.LocationZ_Array;
					for (let t = 0; t < u; t++) {
						var E = BulletPool_1.BulletPool.CreateBulletHitTempResult();
						(E.Index = t),
							(E.ImpactPoint.X = h.Get(t)),
							(E.ImpactPoint.Y = _.Get(t)),
							(E.ImpactPoint.Z = d.Get(t)),
							(E.DistSquared = Vector_1.Vector.DistSquared(
								E.ImpactPoint,
								this.GHo.LastFramePosition,
							)),
							(E.Component = B.Get(t)),
							(E.Actor = C.Get(t)),
							m.push(E);
					}
					0 < m.length && m.sort((t, e) => t.DistSquared - e.DistSquared);
					for (const t of m)
						this.$Ho(t.Actor, t.Component, t, n),
							BulletPool_1.BulletPool.RecycleBulletHitTempResult(t);
				}
		}
		return !0;
	}
	ejo() {
		var t = this._9o;
		if ("" !== t.BulletDataMain.Move.BoneNameString) {
			var e = BulletPool_1.BulletPool.CreateVector(),
				o =
					((l =
						(e.FromUeVector(t.AttackerActorComp.ActorLocationProxy),
						BulletPool_1.BulletPool.CreateVector())).FromUeVector(
						t.InitPosition,
					),
					(l.Z = e.Z),
					Math.sqrt(t.AttackerActorComp.ScaledRadius));
			if (Vector_1.Vector.DistSquared2D(e, l) < o)
				BulletPool_1.BulletPool.RecycleVector(e),
					BulletPool_1.BulletPool.RecycleVector(l);
			else {
				if (
					((o =
						BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(
							ModelManager_1.ModelManager.BulletModel.ObjectTypeObstacles,
							t.AttackerId,
							this.GHo.IgnoreQueries,
						)),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, e),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, l),
					BulletPool_1.BulletPool.RecycleVector(e),
					BulletPool_1.BulletPool.RecycleVector(l),
					(e = TraceElementCommon_1.TraceElementCommon.LineTrace(
						o,
						"BulletCheckPosition",
					)))
				) {
					var l,
						i = (l = o.HitResult).GetHitCount(),
						a = l.Components,
						n = l.Actors;
					for (let e = 0; e < i; e++) {
						var r = n.Get(e),
							s = t.AttackerActorComp.Actor.BasePlatform;
						(s && r === s) || this.$Ho(r, a.Get(e));
					}
				}
				BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceLineElement(
					o,
				);
			}
		}
	}
	zHo() {
		this.GHo.HasSearchedHitActorsCurFrame = !0;
		var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
		if (t) {
			var e = this._9o.Size.X,
				o = this._9o.ActorComponent.ActorLocationProxy;
			for (const l of t) this.ajo(l, o, e);
		}
	}
	ajo(t, e, o) {
		var l, i;
		t?.IsInit &&
			(i = t.Entity) &&
			(l = i.GetComponent(0)) &&
			((l = l.GetEntityType()) === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
				l === Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
				l === Protocol_1.Aki.Protocol.HBs.Proto_Vision) &&
			(i = (l = i.GetComponent(3))?.ActorLocationProxy) &&
			Math.abs(i.X - e.X) <= o &&
			Math.abs(i.Y - e.Y) <= o &&
			Math.abs(i.Z - e.Z) <= o &&
			this.hjo(t, l);
	}
	tjo() {
		var t = this.GHo.RegionDetectComponent;
		if (t) {
			this.GHo.HasSearchedHitActorsCurFrame = !0;
			var e = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
			if (e) for (const o of e) this.ljo(o, t);
		}
	}
	ljo(t, e) {
		var o, l;
		t?.IsInit &&
			(o = t.Entity) &&
			(l = o.GetComponent(0)) &&
			((l = l.GetEntityType()) === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
				l === Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
				l === Protocol_1.Aki.Protocol.HBs.Proto_Vision) &&
			(l = o.GetComponent(3)) &&
			e.Detect(l.ActorLocation, BulletConstant_1.BulletConstant.RegionKey) &&
			this.hjo(t, l);
	}
	njo(t, e) {
		var o = t.MoveInfo;
		if (t.CollisionInfo.HasObstaclesCollision) {
			this.GHo.ObstaclesTraceElement ||
				(this.GHo.ObstaclesTraceElement =
					BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
						ModelManager_1.ModelManager.BulletModel.ObjectTypeObstacles,
						t.AttackerId,
						this.GHo.IgnoreQueries,
					));
			var l,
				i,
				a = this.GHo.ObstaclesTraceElement;
			t = t.BulletDataMain.Obstacle;
			if (
				((a.Radius = t.Radius),
				o.ObstaclesOffset.IsZero()
					? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							a,
							this.GHo.LastFramePosition,
						),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(a, e))
					: ((t = BulletPool_1.BulletPool.CreateVector()),
						(l = BulletPool_1.BulletPool.CreateVector()),
						(i = UE.KismetMathLibrary.FindLookAtRotation(
							this.GHo.LastFramePosition.ToUeVector(),
							e.ToUeVector(),
						)),
						BulletCollisionSystem._jo.SetRotation(i.Quaternion()),
						BulletCollisionSystem._jo.SetLocation(this.GHo.LastFramePosition),
						BulletCollisionSystem._jo.TransformPosition(o.ObstaclesOffset, t),
						BulletCollisionSystem._jo.SetLocation(e),
						BulletCollisionSystem._jo.TransformPosition(o.ObstaclesOffset, l),
						TraceElementCommon_1.TraceElementCommon.SetStartLocation(a, t),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(a, l),
						BulletPool_1.BulletPool.RecycleVector(t),
						BulletPool_1.BulletPool.RecycleVector(l)),
				TraceElementCommon_1.TraceElementCommon.SphereTrace(
					a,
					PROFILE_OBSTACLES,
				))
			) {
				var n = a.HitResult,
					r = n.Components,
					s = n.Actors,
					c = n.GetHitCount();
				for (let t = 0; t < c; t++) this.ujo(s.Get(t), r.Get(t), n, t);
			}
		}
	}
	cjo(t) {
		let e = this.GHo.MapBulletConditionResult.get(t);
		return (
			e ||
				((e = BulletPool_1.BulletPool.CreateBulletConditionResult()),
				this.GHo.MapBulletConditionResult.set(t, e)),
			!e.KeepDisable &&
				!(
					(e.HasConstResult && !e.ConstResult) ||
					((e.ConstResult = this.mjo(t)),
					(e.HasConstResult = !0),
					!e.ConstResult)
				)
		);
	}
	djo(t) {
		var e = t.ConditionResult;
		return e
			? (0 !== t.Type && !!this.Cjo(t)) || !(e.KeepDisable = !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Bullet",
						18,
						"生成HitActorData前没有经过PreCheckCondition",
					),
				!1);
	}
	Cjo(t) {
		return !(
			4 === this._9o.BulletDataMain.Base.Shape &&
			1 === t.Type &&
			!this.OHo.BlockByCharacter
		);
	}
	ijo(t) {
		if (t.Actor?.IsValid()) {
			var e = t.ConditionResult;
			if (e)
				return (
					!e.KeepDisable && (this.gjo(t) ? this.fjo(t) : !(e.KeepDisable = !0))
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Bullet",
					18,
					"生成HitActorData前没有经过PreCheckCondition",
				);
			for (const e of this.GHo.MapBulletConditionResult.keys()) {
				e === t.Actor &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Bullet",
						18,
						"MapBulletConditionResult有该actor的数据",
					);
				break;
			}
		}
		return !1;
	}
	mjo(t) {
		var e;
		return !(
			!t ||
			((e = this._9o.BulletDataMain), t === this._9o.Actor) ||
			(!(
				e.Base.HitConditionTagId ||
				this._9o.BulletCamp & BulletActionInitHit_1.SELF_NUMBER
			) &&
				t === this._9o.AttackerActorComp.Actor)
		);
	}
	gjo(t) {
		return (
			0 !== t.Type &&
			!!t.Actor?.IsValid() &&
			!(
				(t.EntityHandle && !t.EntityHandle.Valid) ||
				(1 === t.Type &&
					ExtraEffectDamageFilter_1.DamageFilter.ApplyEffects(
						this._9o.Attacker,
						t.Entity,
						this._9o.BulletInitParams.BulletRowName,
						this._9o.Tags,
						this._9o.BulletInitParams.SkillId,
						this._9o.BulletDataMain.Base.DamageId,
					))
			)
		);
	}
	fjo(t) {
		return !!this.pjo(t) && !!this.vjo(t) && !!this.Mjo(t);
	}
	pjo(t) {
		var e = this._9o.BulletDataMain,
			o = e.Base.HitConditionTagId;
		return o
			? BulletUtil_1.BulletUtil.DoesEntityContainsTag(t.Entity, o)
			: !(o = e.Base.BanHitTagId) ||
					!BulletUtil_1.BulletUtil.DoesEntityContainsTag(t.Entity, o);
	}
	vjo(t) {
		if (this._9o.CloseCollision) return !0;
		switch (this._9o.BulletDataMain.Base.Shape) {
			case 3:
				var e = this._9o.CenterLocation;
				for (const o of t.Components)
					if (
						SpaceUtils_1.SpaceUtils.IsComponentInRingArea(e, this._9o.Size, o)
					)
						return !0;
				return !1;
			case 2:
				var o = this._9o.CenterLocation,
					l = BulletPool_1.BulletPool.CreateRotator();
				l.FromUeRotator(this._9o.CollisionInfo.CollisionTransform.Rotator());
				for (const e of t.Components)
					if (
						SpaceUtils_1.SpaceUtils.IsComponentInSectorArea(
							o,
							this._9o.Size,
							l.Quaternion(),
							e,
						)
					)
						return BulletPool_1.BulletPool.RecycleRotator(l), !0;
				return BulletPool_1.BulletPool.RecycleRotator(l), !1;
			default:
				return !0;
		}
	}
	Mjo(t) {
		return (
			1 !== t.Type ||
			((t = t.Entity.GetComponent(3)),
			BulletUtil_1.BulletUtil.AttackedCondition(this._9o, t))
		);
	}
	$Ho(t, e, o, l, i) {
		if (
			(BulletConstant_1.BulletConstant.OpenHitActorLog &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Bullet",
					18,
					"触发碰撞",
					["BulletRowName", this._9o.BulletRowName],
					["Actor", t.GetName()],
					["Component", e.GetName()],
					["Bone", l?.BoneNameArray?.Num() ?? 0],
				),
			this.cjo(t))
		) {
			let a = this.GHo.MapHitActorData.get(t),
				n = !1;
			if (a) {
				if (a.HasComponent(e)) return;
			} else if (((n = !0), !(a = this.Sjo(t, e)))) return;
			this.Ejo(a, e)
				? (a.AddComponent(e),
					l &&
						4 === a.Type &&
						(o
							? a.AddHitTempResult(o, l.BoneNameArray.Get(i))
							: a.AddHitResult(l, i)),
					n &&
						((e = this.GHo.MapBulletConditionResult.get(t)),
						(a.ConditionResult = e),
						this.djo(a)
							? (this.GHo.AddHitActorData(t, a),
								BulletConstant_1.BulletConstant.OpenHitActorLog &&
									Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Bullet",
										18,
										"碰撞通过预检测",
										["BulletRowName", this._9o.BulletRowName],
										["actor", t.GetName()],
										["type", a.Type],
									))
							: BulletPool_1.BulletPool.RecycleBulletHitActorData(a)))
				: n && BulletPool_1.BulletPool.RecycleBulletHitActorData(a);
		}
	}
	ujo(t, e, o, l) {
		if (
			this.GHo.HasObstaclesCollision &&
			!this._9o.NeedDestroy &&
			2 !== this._9o.BulletDataMain.Move.FollowType
		) {
			var i =
				ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(t);
			if (
				!(i?.Entity?.GetComponent(138) ?? i?.Entity?.GetComponent(146)) &&
				!(
					(t &&
						(t instanceof UE.KuroEntityActor ||
							UE.KuroStaticLibrary.IsImplementInterface(
								t.GetClass(),
								UE.BPI_CreatureInterface_C.StaticClass(),
							))) ||
					t instanceof UE.TriggerVolume
				)
			) {
				if (!(i = this.GHo.MapHitActorData.get(t))) {
					i = this.yjo(t);
					let e = this.GHo.MapBulletConditionResult.get(t);
					e ||
						((e = BulletPool_1.BulletPool.CreateBulletConditionResult()),
						this.GHo.MapBulletConditionResult.set(t, e),
						(e.HasConstResult = !0),
						(e.ConstResult = !0)),
						(i.ConditionResult = e),
						i.AddHitResult(o, l),
						this.GHo.AddHitActorData(t, i);
				}
				BulletConstant_1.BulletConstant.OpenHitActorLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						21,
						"触发碰撞 障碍物检测",
						["Bullet", this._9o?.BulletRowName],
						["Actor", t.GetName()],
					);
			}
		}
	}
	hjo(t, e) {
		var o,
			l = e.Owner;
		BulletConstant_1.BulletConstant.OpenHitActorLog &&
			Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Bullet",
				18,
				"触发碰撞（大范围子弹）",
				["BulletRowName", this._9o.BulletRowName],
				["Actor", l.GetName()],
				["entityId", t.Id],
			),
			!this.cjo(l) ||
				(o = this.GHo.MapHitActorData.get(l)) ||
				(((o = BulletPool_1.BulletPool.CreateBulletHitActorData()).Actor = l),
				(o.EntityHandle = t),
				(o.Type = 1),
				o.AddComponent(e.Actor.Mesh),
				(t = this.GHo.MapBulletConditionResult.get(l)),
				(o.ConditionResult = t),
				this.djo(o)
					? (this.GHo.AddHitActorData(l, o),
						BulletConstant_1.BulletConstant.OpenHitActorLog &&
							Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Bullet",
								18,
								"碰撞通过预检测",
								["BulletRowName", this._9o.BulletRowName],
								["actor", l.GetName()],
								["type", o.Type],
							))
					: BulletPool_1.BulletPool.RecycleBulletHitActorData(o));
	}
	Ejo(t, e) {
		return !(
			1 === t.Type &&
			((t = t.Entity.GetComponent(3)),
			(e = e.GetName()),
			t.IsPartHit &&
				(e === BulletConstant_1.BulletConstant.MoveCylinder ||
					!t.IsPartComponentEnable(e)))
		);
	}
	Sjo(t, e) {
		var o = BulletPool_1.BulletPool.CreateBulletHitActorData();
		if ((o.Actor = t)) {
			let e;
			if (
				(t instanceof UE.KuroEntityActor
					? (e = t.EntityId)
					: UE.KuroStaticLibrary.IsImplementInterface(
							t.GetClass(),
							UE.BPI_CreatureInterface_C.StaticClass(),
						) && (e = t.GetEntityId()),
				void 0 !== e)
			) {
				var l = ModelManager_1.ModelManager.CharacterModel.GetHandle(e);
				if ((o.EntityHandle = l)?.Valid) {
					var i = (l = l.Entity).GetComponent(0),
						a = i?.GetEntityType();
					if (a === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem)
						return (o.Type = 3), o;
					if (a === Protocol_1.Aki.Protocol.HBs.Proto_Npc)
						return (o.Type = 5), o;
					if (
						a === Protocol_1.Aki.Protocol.HBs.Proto_Animal &&
						2 === i.GetEntityCamp()
					)
						return (o.Type = 6), o;
					if (l.GetComponent(3)) return (o.Type = 1), o;
				} else if (
					(a =
						ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(e)) &&
					a instanceof BulletEntity_1.BulletEntity
				)
					return (o.Type = 2), (o.BulletEntityId = e), o;
				return (o.Type = 0), o;
			}
		}
		return (
			(i =
				ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(t)),
			i?.Valid
				? ((o.EntityHandle = i), (o.Type = 3), o)
				: this.GHo.HasObstaclesCollision
					? void 0
					: (this._9o.BulletDataMain.Logic.IgnoreWater &&
						BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(
							e.GetCollisionProfileName(),
						)
							? (o.Type = 0)
							: (o.Type = 4),
						o)
		);
	}
	yjo(t) {
		var e = BulletPool_1.BulletPool.CreateBulletHitActorData();
		return (e.Actor = t), (e.Type = 4), (e.FromObstaclesCollision = !0), e;
	}
	ojo(t) {
		var e = this._9o;
		if (!e.NeedDestroy) {
			this.Tjo(t);
			try {
				switch (t.Type) {
					case 1:
						this.Ljo(t);
						break;
					case 2:
						this.Djo(t);
						break;
					case 3:
						this.Rjo(t);
						break;
					case 4:
						this.Ujo(t);
						break;
					case 5:
					case 6:
						if (t.EntityHandle?.Valid) break;
						return void EventSystem_1.EventSystem.EmitWithTarget(
							t.Entity,
							EventDefine_1.EEventName.BulletHitSpecialCharacter,
							e,
						);
				}
				BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountTotal(this._9o) &&
					(BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
						this._9o,
						8,
						"[BulletCollisionSystem.ProcessHit]",
					),
					this._9o.ChildInfo?.SetIsNumberNotEnough(!0),
					BulletController_1.BulletController.DestroyBullet(
						e.BulletEntityId,
						!1,
					));
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Bullet",
							18,
							"Bullet ProcessHit Error",
							t,
							["BulletEntityId", this._9o.BulletEntityId],
							["BulletRowName", this._9o.BulletRowName],
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Bullet",
							18,
							"Bullet ProcessHit Error",
							["BulletEntityId", this._9o.BulletEntityId],
							["BulletRowName", this._9o.BulletRowName],
							["error", t],
						);
			}
		}
	}
	Tjo(t) {
		Stats_1.Stat.Enable &&
			t.Entity &&
			(t.Entity.Id, t.Entity.GetComponent(0)?.GetPbDataId());
	}
	Ljo(t) {
		var e;
		t.EntityHandle?.Valid &&
			((e = t.Entity.GetComponent(58))?.Valid && e.IsMultiPart
				? this.Ajo(t)
				: this.Pjo(t));
	}
	Ajo(t) {
		var e = t.Entity.GetComponent(3),
			o = (this.xjo(t.Entity), this._9o);
		if (
			this.wjo(t) &&
			BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(
				o,
				t.Entity,
			)
		) {
			var l = e.Entity,
				i = e.ActorForwardProxy,
				a = l.GetComponent(58),
				n = [],
				r = [],
				s = [],
				c = [];
			let d = !1;
			var u = new Map();
			(e = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(
				UE.KismetMathLibrary.TransformRotation(
					o.AttackerActorComp.ActorTransform,
					o.BulletDataMain.Base.AttackDirection.ToUeRotator(),
				),
			);
			let E = 0;
			var m = t.Components;
			let H;
			for (let e = 0, l = t.Components.length; e < l; e++) {
				var B = m[e];
				const t = B.GetName();
				if (t !== BulletConstant_1.BulletConstant.MoveCylinder) {
					var C = a.GetPart(t);
					if (!(n.includes(C) || r.includes(C) || s.includes(C))) {
						if (
							(BulletConstant_1.BulletConstant.OpenHitActorLog &&
								Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Bullet",
									21,
									"子弹击中部位",
									["部位", t],
									["子弹ID", o.BulletRowName],
								),
							C?.Active)
						)
							if (((C.HitBoneName = t), C.IsShield)) {
								var h = BulletPool_1.BulletPool.CreateVector();
								if (
									(BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
										B,
										o,
										h,
									),
									u.set(t, h),
									this.CheckAngle(C.BlockAngle, o, h, i))
								) {
									n.push(C), (E = e);
									break;
								}
							} else
								C.SeparateDamage
									? (r.push(C),
										C.IsWeakness &&
											((h = BulletPool_1.BulletPool.CreateVector()),
											BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
												B,
												o,
												h,
											),
											u.set(t, h)))
									: (s.push(C),
										C.IsWeakness &&
											((C = BulletPool_1.BulletPool.CreateVector()),
											BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
												B,
												o,
												C,
											),
											u.set(t, C)),
										(d = !0));
						else c.push(t), (d = !0);
						(C = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
							B,
							o,
						)),
							BulletConstant_1.BulletConstant.OpenHitActorLog &&
								Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Bullet",
									21,
									"命中特效 选择",
									["boneName", t],
									["cos", C],
									["bulletRowName", o.BulletRowName],
								),
							(void 0 === H || C < H) && ((H = C), (E = e));
					}
				}
			}
			let y = !1;
			if (0 < n.length)
				BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(o, l);
			else {
				for (const t of r) {
					if (
						!BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(
							o,
							l,
						)
					)
						break;
					t.IsWeakness &&
						((t.IsWeaknessHit = this.CheckWeakness(
							t,
							o,
							u.get(t.HitBoneName),
							i,
						)),
						t.IsWeaknessHit) &&
						(y = !0),
						BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(o, l);
				}
				if (0 < s.length) {
					let t;
					for (const e of s)
						if (
							e.IsWeakness &&
							((e.IsWeaknessHit = this.CheckWeakness(
								e,
								o,
								u.get(e.HitBoneName),
								i,
							)),
							e.IsWeaknessHit)
						) {
							t = e;
							break;
						}
					t && ((s.length = 0), (y = !0), s.push(t));
				}
			}
			BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(o, l)
				? d && BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(o, l)
				: (d = !1);
			var _ = m[E];
			const T = _.GetName(),
				g = BulletPool_1.BulletPool.CreateVector();
			u.has(T)
				? g.FromUeVector(u.get(T))
				: BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
						_,
						o,
						g,
					),
				BulletConstant_1.BulletConstant.OpenHitActorLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						21,
						"命中特效 最终",
						["boneName", T],
						["bulletRowName", o.BulletRowName],
					),
				(_ = this._9o.BulletDataMain),
				this.GHo.StopHit || this.Bjo(t, _, g, d, T, n, r, s, c, y),
				BulletUtil_1.BulletUtil.SummonBullet(
					this._9o,
					1,
					t.Entity,
					!1,
					g,
					o.CollisionInfo.LastFramePosition,
				),
				_.Logic.DestroyOnHitCharacter &&
					this._9o.AttackerActorComp.IsAutonomousProxy &&
					BulletController_1.BulletController.DestroyBullet(
						this._9o.BulletEntityId,
						!1,
					),
				(this.GHo.StopHit = !1);
			for (const [, t] of u) BulletPool_1.BulletPool.RecycleVector(t);
			BulletPool_1.BulletPool.RecycleVector(g),
				BulletPool_1.BulletPool.RecycleRotator(e);
		}
	}
	CheckWeakness(t, e, o, l) {
		if (t && t.IsWeakness) {
			var i = e.BulletDataMain.Logic.Type;
			if (
				!t.WeaknessTypeSet ||
				0 === t.WeaknessTypeSet.size ||
				(i && t.WeaknessTypeSet.has(i))
			)
				return this.CheckAngle(t.WeaknessAngle, e, o, l);
		}
		return !1;
	}
	CheckAngle(t, e, o, l) {
		var i, a;
		return (
			0 === t ||
			(1 === (a = (i = e.Entity).Data.Logic.HitDirectionType)
				? (i.GetComponent(1).ActorLocationProxy.Subtraction(o, this.kHo),
					this.kHo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber))
				: 0 === a
					? (this.kHo.FromUeVector(e.AttackerActorComp.ActorLocationProxy),
						this.kHo.SubtractionEqual(o),
						this.kHo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber))
					: this.kHo.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
			this.FHo.FromUeVector(l),
			0 <= t && this.FHo.MultiplyEqual(-1),
			Vector_1.Vector.DotProduct(this.kHo, this.FHo) >= Math.cos(t))
		);
	}
	xjo(t) {
		if (t.GetComponent(17)) {
			this.GHo.CharacterEntityMap.has(t) ||
				this.GHo.CharacterEntityMap.set(t, -1);
			var e = this._9o.BulletDataMain;
			if (
				e.Base.ContinuesCollision &&
				((this.GHo.HaveCharacterInBullet = !0),
				BulletUtil_1.BulletUtil.SummonBullet(this._9o, 1, t, !0),
				e.Execution.GeIdApplyToVictim)
			) {
				var o,
					l = this._9o.Attacker.CheckGetComponent(157),
					i = t.CheckGetComponent(157),
					a = t.CheckGetComponent(185);
				let n = !0;
				if (
					(n =
						!(
							t.GetComponent(0).IsRole() && !t.GetComponent(3).IsRoleAndCtrlByMe
						) && n)
				)
					for (const t of e.Execution.GeIdApplyToVictim)
						0 === i.GetBuffTotalStackById(t) &&
							i.AddBuff(t, {
								InstigatorId: l.CreatureDataId,
								Level: this._9o.SkillLevel,
								PreMessageId: this._9o.ContextId,
								Reason: `子弹${e.BulletRowName}命中`,
							});
				a.HasTag(-648310348) ||
					((a = e.TimeScale.TimeScaleOnHit),
					e.TimeScale.AreaTimeScale
						? 0 < this.GHo.CharacterEntityMap.get(t) ||
							((o = t.GetComponent(107))
								? ((o = o.SetTimeScale(
										a.优先级,
										a.时间膨胀值,
										a.时间膨胀变化曲线,
										e.Base.Duration,
										2,
									)),
									this.GHo.CharacterEntityMap.set(t, o))
								: this.GHo.CharacterEntityMap.set(t, 0))
						: this.GHo.CharacterEntityMap.set(t, 0));
			}
		}
	}
	Pjo(t) {
		var e = t.Entity,
			o = t.Entity.GetComponent(3),
			l = this._9o;
		if (
			(this.xjo(t.Entity),
			this.wjo(t) &&
				BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(l, t.Entity))
		)
			if (this.bjo(t.Entity))
				UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
					o.Actor,
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668),
					void 0,
				),
					this._9o?.Attacker &&
						e &&
						((i = [
							this._9o.Attacker,
							e,
							this._9o.BulletInitParams.SkillId,
							BigInt(this._9o.BulletRowName ?? -1),
						]),
						SceneTeamController_1.SceneTeamController.EmitEvent(
							e,
							EventDefine_1.EEventName.CharLimitDodge,
							...i,
						));
			else {
				e = l.BulletDataMain;
				var i = BulletPool_1.BulletPool.CreateVector(),
					a = t.Components,
					n = a.length;
				let c;
				if (0 < n) {
					let t,
						e = 0;
					for (let o = 0; o < n; o++) {
						var r = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
							a[o],
							l,
						);
						(void 0 === t || r < e) && ((e = r), (t = o));
					}
					var s = a[t];
					(c = s.GetName()),
						BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
							s,
							l,
							i,
						);
				} else
					i.FromUeVector(
						o.GetSocketLocation(BulletConstant_1.BulletConstant.HitCase),
					);
				this.GHo.StopHit || this.Bjo(t, e, i, !0, c),
					BulletUtil_1.BulletUtil.SummonBullet(
						this._9o,
						1,
						t.Entity,
						!1,
						i,
						l.CollisionInfo.LastFramePosition,
					),
					e.Logic.DestroyOnHitCharacter &&
						this._9o.AttackerActorComp.IsAutonomousProxy &&
						BulletController_1.BulletController.DestroyBullet(
							this._9o.BulletEntityId,
							!1,
						),
					(this.GHo.StopHit = !1),
					BulletPool_1.BulletPool.RecycleVector(i);
			}
	}
	bjo(t) {
		return (
			!!this._9o.BulletDataMain.Logic.CanDodge &&
			!!BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -549410347) &&
			!BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -1221493771)
		);
	}
	Bjo(t, e, o, l, i, a, n, r, s, c = !1) {
		var u = this._9o,
			m = u.AttackerActorComp,
			B = t.Entity.GetComponent(3),
			C =
				void 0 !==
				(_ = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
					u.Attacker,
					e.Base.BeHitEffect,
				)),
			h =
				0 < (h = e.Base.DamageId)
					? DamageById_1.configDamageById.GetConfig(h).CalculateType
					: -1,
			_ = new BulletTypes_1.HitInformation(
				u.Attacker,
				t.Entity,
				_,
				u.BulletRowName,
				UE.KismetMathLibrary.TransformRotation(
					m.Actor.Mesh.K2_GetComponentToWorld(),
					e.Base.AttackDirection.ToUeRotator(),
				),
				BulletUtil_1.BulletUtil.ShakeTest(u, t.Entity.GetComponent(1)),
				FNameUtil_1.FNameUtil.GetDynamicFName(i) ?? FNameUtil_1.FNameUtil.NONE,
				o.ToUeVector(),
				u.SkillLevel,
				e,
				this._9o.BulletRowName,
				e.Logic.Data,
				u.BulletEntityId,
				h,
			);
		if (
			(GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
				this._9o.BulletEntityId,
				t.Entity.Id,
			),
			EventSystem_1.EventSystem.EmitWithTarget(
				u.Entity,
				EventDefine_1.EEventName.BulletHit,
				_,
				void 0,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.BulletHit,
				_,
				void 0,
			),
			this.VHo.ActionHit(t),
			this.qjo(B))
		) {
			i = B.Entity.Id;
			var d =
				((i =
					((o =
						(this.GHo.ObjectsHitCurrent.set(i, Time_1.Time.Now),
						this.Gjo(e.Base.IntervalAfterHit, u, i),
						BulletCollisionUtil_1.BulletCollisionUtil.PlayHitEffect(
							u,
							B,
							_.HitPart.toString(),
							c,
							_.HitPosition,
							_.HitEffectRotation,
						),
						B.Entity.GetComponent(51).OnHit(
							_,
							C,
							u.Entity,
							this.GHo.AllowedEnergy,
							l,
							a,
							n,
							r,
							s,
						),
						e.Execution.SendGameplayEventTagToAttacker)).TagName !==
						StringUtils_1.NONE_STRING &&
						(((h = new UE.GameplayEventData()).Target = B.Actor),
						(h.Instigator = u.Actor),
						UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
							u.AttackerActorComp.Actor,
							o,
							h,
						)),
					e.Execution.SendGameplayEventTagToVictim)).TagName !==
					StringUtils_1.NONE_STRING &&
					t.Entity.GetComponent(17).SendGameplayEventToActor(i),
				m.Entity.CheckGetComponent(157));
			c = _.ReBulletData.Execution;
			for (const t of c.SendGeIdToAttacker)
				d.AddBuff(t, {
					InstigatorId: d.CreatureDataId,
					Level: u.SkillLevel,
					PreMessageId: u.ContextId,
					Reason: `子弹${u.BulletRowName}命中后对攻击者应用GE添加`,
				});
			var E = B.Entity.GetComponent(157);
			if (E?.Valid) {
				for (const t of c.SendGeIdToVictim)
					E.AddBuff(t, {
						InstigatorId: d.CreatureDataId,
						Level: u.SkillLevel,
						Reason: `子弹${u.BulletRowName}命中后对受击者应用GE添加`,
						PreMessageId: u.ContextId,
					});
				E.HasBuffTrigger(16) &&
					((C = m.Entity.GetComponent(33)),
					(l =
						0 < e.Base.DamageId
							? DamageById_1.configDamageById.GetConfig(e.Base.DamageId)
							: void 0),
					((a = new ExtraEffectBaseTypes_1.RequirementPayload()).SkillId =
						Number(u.BulletInitParams.SkillId ?? -1)),
					(a.SkillGenre = C.CurrentSkill
						? C.CurrentSkill.SkillInfo.SkillGenre
						: -1),
					l &&
						((a.DamageGenre = l.Type),
						(a.CalculateType = l.CalculateType),
						(a.SmashType = l.SmashType),
						(a.ElementType = l.Element)),
					(a.BulletId = BigInt(u.BulletRowName)),
					(a.BulletTags = u.Tags ?? []),
					E.TriggerEvents(16, d, a));
			}
			if (this.GHo.AllowedEnergy) {
				for (const t of c.EnergyRecoverGeIds)
					d.AddBuff(t, {
						InstigatorId: d.CreatureDataId,
						Level: u.SkillLevel,
						PreMessageId: u.ContextId,
						Reason: `子弹${u.BulletRowName}命中后对攻击者应用能量恢复类GE`,
					});
				this.GHo.AllowedEnergy = !1;
			}
			if (c.SendGeIdToRoleInGame) {
				var H =
					ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.CheckGetComponent(
						157,
					);
				if (H)
					for (const t of c.SendGeIdToRoleInGame)
						H.AddBuff(t, {
							InstigatorId: d.CreatureDataId,
							Level: u.SkillLevel,
							PreMessageId: u.ContextId,
							Reason: `子弹${u.BulletRowName}命中后对场上角色应用GE添加`,
						});
			}
		}
	}
	Gjo(t, e, o) {
		if (t) {
			let n = !0;
			var l,
				i,
				a = (t = e.EntityHitCount).get(o);
			for ([l, i] of t)
				if (l !== o && a <= i) {
					n = !1;
					break;
				}
			n && (this.GHo.StageInterval++, (this.GHo.AllowedEnergy = !0)),
				BulletConstant_1.BulletConstant.OpenCollisionLog &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						21,
						"RoleHit",
						["BulletId", e.BulletRowName],
						["Stage", this.GHo.StageInterval],
						["AllowedEnergy", this.GHo.AllowedEnergy],
						["EntityId", e.Entity.Id],
					);
		}
	}
	qjo(t) {
		var e,
			o,
			l,
			i = this._9o.AttackerActorComp;
		return (
			!(!i?.Valid || !t?.Valid) &&
			((o = i.Entity),
			(l = t.Entity),
			(e = (o = o.GetComponent(0)).IsRole() || o.IsVision()),
			(o = o.GetSummonerPlayerId()),
			(l = l.GetComponent(0).IsRole()),
			0 < o
				? o === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
				: (e && !l ? i : t).IsAutonomousProxy)
		);
	}
	Djo(t) {
		var e, o, l, i;
		!t.IsContinueHit &&
			this._9o &&
			(t = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
				t.BulletEntityId,
			)) &&
			(this.Njo(t), this._9o.IsAutonomousProxy) &&
			((l = this._9o.BulletDataMain),
			(e = t.GetBulletInfo()).IsTensile
				? (i = e.Attacker) &&
					this.bjo(i) &&
					!this.Ojo(i) &&
					((o = i.GetComponent(3)),
					(0, RegisterComponent_1.isComponentInstance)(o, 3) &&
						(UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
							o.Actor,
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668),
							void 0,
						),
						this._9o.Attacker) &&
						((o = [
							this._9o.Attacker,
							i,
							this._9o.BulletInitParams.SkillId,
							BigInt(this._9o.BulletRowName ?? -1),
						]),
						SceneTeamController_1.SceneTeamController.EmitEvent(
							i,
							EventDefine_1.EEventName.CharLimitDodge,
							...o,
						)),
					i.GetComponent(0).GetEntityType() ===
						Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
						(o = this._9o.AttackerBuffComp)?.Valid &&
						o.AddTagWithReturnHandle([-2043183300], l.Base.Duration),
					BulletController_1.BulletController.DestroyBullet(t.Id, !1))
				: ((i =
						0 <
						(l.Logic.ReboundChannel &
							e.BulletDataMain.Execution.ReboundBitMask)),
					(o =
						0 <
						(this._9o.BulletDataMain.Execution.ReboundBitMask &
							e.BulletDataMain.Logic.ReboundChannel)),
					(l = BulletUtil_1.BulletUtil.CheckSupport(e, this._9o.AttackerCamp)),
					(o || i || l) &&
						((i = e.Attacker),
						(!l && this.Ojo(i)) ||
							(l
								? t.GetComponent(13).ActionSupport(this._9o.Entity)
								: o &&
									0 === e.AttackerCamp &&
									(this.VHo.ActionRebound(e),
									BulletController_1.BulletController.DestroyBullet(
										this._9o.BulletEntityId,
										!1,
									),
									EventSystem_1.EventSystem.EmitWithTarget(
										e.Attacker,
										EventDefine_1.EEventName.BulletRebound,
										this._9o.Attacker,
										this._9o.BulletInitParams.SkillId,
									))))));
	}
	Njo(t) {
		var e = t.GetBulletInfo(),
			o = e.BulletDataMain,
			l = this._9o.BulletDataMain;
		!l.Base.ContinuesCollision ||
			!l.TimeScale.ForceBulletTimeScaleInArea ||
			o.TimeScale.TimeScaleWithAttacker ||
			o.Base.ContinuesCollision ||
			this.GHo.BulletEntityMap.get(t) ||
			((o = l.TimeScale.TimeScaleOnHit),
			(e = BulletUtil_1.BulletUtil.SetTimeScale(
				e,
				o.优先级,
				o.时间膨胀值,
				o.时间膨胀变化曲线,
				l.Base.Duration,
				2,
			)),
			this.GHo.BulletEntityMap.set(t, e));
	}
	Ojo(t) {
		var e = t.GetComponent(3);
		return (
			!BulletUtil_1.BulletUtil.AttackedCondition(this._9o, e) ||
			!this.kjo() ||
			!BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(this._9o, t)
		);
	}
	Rjo(t) {
		if (this.wjo(t)) {
			var e = this._9o,
				o = e.BulletDataMain;
			if (t.EntityHandle?.Valid) {
				var l = t.Entity,
					i = BulletPool_1.BulletPool.CreateVector();
				if (t.HitResult)
					i.Set(
						t.HitResult.ImpactPointX[0],
						t.HitResult.ImpactPointY[0],
						t.HitResult.ImpactPointZ[0],
					);
				else {
					var a = t.Components,
						n = a.length;
					if (0 < n) {
						let t,
							o = 0;
						for (let l = 0; l < n; l++) {
							var r =
								BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
									a[l],
									e,
								);
							(void 0 === t || r < o) && ((o = r), (t = l));
						}
						BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointSceneItem(
							a[t],
							e,
							i,
						);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Bullet",
								21,
								"命中场景物获取不到碰撞体",
								["bulletRowName", e.BulletRowName],
								["SceneItemId", t.Entity.GetComponent(0).GetCreatureDataId()],
							);
				}
				var s = l.Id,
					c = e.AttackerActorComp,
					u = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
						this._9o.Attacker,
						o.Base.BeHitEffect,
					),
					m =
						(GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
							e.BulletEntityId,
							s,
						),
						e.BulletEntityId),
					B =
						0 < o.Base.DamageId
							? DamageById_1.configDamageById.GetConfig(o.Base.DamageId)
									.CalculateType
							: -1;
				u = new BulletTypes_1.HitInformation(
					e.Attacker,
					void 0,
					u,
					Number(e.BulletRowName),
					UE.KismetMathLibrary.TransformRotation(
						c.Actor.Mesh.K2_GetComponentToWorld(),
						o.Base.AttackDirection.ToUeRotator(),
					),
					!1,
					void 0,
					i.ToUeVector(),
					0,
					o,
					this._9o.BulletRowName,
					o.Logic.Data,
					m,
					B,
				);
				BulletUtil_1.BulletUtil.SummonBullet(e, 1, t.Entity, !1),
					this.VHo.ActionHitObstacles(t),
					EventSystem_1.EventSystem.EmitWithTarget(
						e.Entity,
						EventDefine_1.EEventName.BulletHit,
						u,
						void 0,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.BulletHit,
						u,
						void 0,
					),
					BulletPool_1.BulletPool.RecycleVector(i),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Bullet",
							21,
							"HitSceneItem",
							["BulletId", e.BulletRowName],
							["EntityId", m],
							["VitimEntityId", s],
						);
				let C = !0,
					h = IMatch_1.EBulletPenetrationType.Penetrable;
				(B =
					(h =
						(c = l.GetComponent(138)) &&
						((C = c.OnSceneItemHit(u, t)),
						void 0 === (h = c.GetPenetrationType()))
							? IMatch_1.EBulletPenetrationType.Penetrable
							: h) === IMatch_1.EBulletPenetrationType.Penetrable
						? o.Logic.DestroyOnHitCharacter
						: o.Logic.DestroyOnHitObstacle),
					C &&
						B &&
						BulletController_1.BulletController.DestroyBullet(
							e.BulletEntityId,
							!1,
						),
					c ||
						((i = l.GetComponent(0)),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Bullet",
								18,
								"子弹打中的场景物件没有SceneItemHitComponent, 需要检查碰撞通道是否规范",
								["BulletId", e.BulletRowName],
								["SceneItemPbDataId", i?.GetPbDataId()],
							)),
					this.GHo.ObjectsHitCurrent.set(s, Time_1.Time.Now),
					this.Gjo(o.Base.IntervalAfterHit, e, s);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Bullet", 21, "HitSceneItem victim entity invalid", [
						"BulletId",
						e.BulletRowName,
					]);
		}
	}
	Ujo(t) {
		var e;
		t.IsContinueHit ||
			((e = BulletPool_1.BulletPool.CreateVector()),
			t.HitResult
				? e.Set(
						t.HitResult.ImpactPointX[0],
						t.HitResult.ImpactPointY[0],
						t.HitResult.ImpactPointZ[0],
					)
				: e.FromUeVector(this._9o.ActorComponent.ActorLocationProxy),
			BulletUtil_1.BulletUtil.SummonBullet(this._9o, 2, t.Entity, !1),
			this.VHo.ActionHitObstacles(t),
			BulletStaticFunction_1.BulletStaticFunction.BulletHitEffect(
				this._9o,
				e.ToUeVector(),
			),
			BulletPool_1.BulletPool.RecycleVector(e),
			this._9o.BulletDataMain.Logic.DestroyOnHitObstacle &&
				BulletController_1.BulletController.DestroyBullet(
					this._9o.BulletEntityId,
					!1,
				));
	}
	wjo(t) {
		return !!this.kjo() && !this.GHo.ObjectsHitCurrent.has(t.Entity.Id);
	}
	kjo() {
		var t,
			e = this._9o.BulletDataMain,
			o = Math.max(0, e.Base.CollisionActiveDelay);
		return (
			((e = e.Base.CollisionActiveDuration) < 0 && o <= 0) ||
			((t = this._9o.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond),
			e < 0 ? o <= t : 0 < e && o <= t && t <= o + e)
		);
	}
}
((exports.BulletCollisionSystem = BulletCollisionSystem).gW = void 0),
	(BulletCollisionSystem.sjo = void 0),
	(BulletCollisionSystem.fW = void 0),
	(BulletCollisionSystem._jo = Transform_1.Transform.Create()),
	(BulletCollisionSystem.Ijo = void 0);

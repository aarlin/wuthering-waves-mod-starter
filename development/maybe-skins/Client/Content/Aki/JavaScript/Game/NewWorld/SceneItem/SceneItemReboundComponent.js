"use strict";
var SceneItemReboundComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, i) {
			var n,
				r = arguments.length,
				s =
					r < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, o))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, o, i);
			else
				for (var h = t.length - 1; 0 <= h; h--)
					(n = t[h]) &&
						(s = (r < 3 ? n(s) : 3 < r ? n(e, o, s) : n(e, o)) || s);
			return 3 < r && s && Object.defineProperty(e, o, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemReboundComponent = void 0);
const UE = require("ue"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	PROFILE_BULLECT_TRACK = "SceneItemReboundComponent_CalculateBulletTrackHit",
	REFLECT_START_OFFSET = 30,
	REFLECT_BULLET_EFFECT_CD = 2e3;
let SceneItemReboundComponent = (SceneItemReboundComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.aMn = void 0),
			(this.hMn = void 0),
			(this.P9r = void 0),
			(this.w9r = void 0),
			(this.lMn = void 0),
			(this.cz = void 0),
			(this.o9o = void 0),
			(this.A9r = void 0),
			(this.Hte = void 0),
			(this.Lie = void 0),
			(this._Mn = !1),
			(this.uMn = ""),
			(this.cie = void 0),
			(this.cMn = 150),
			(this.mMn = !0),
			(this.dMn = void 0);
	}
	OnInitData(t) {
		return (
			(t = t.GetParam(SceneItemReboundComponent_1)[0]),
			(this._Mn = 0 < t.BulletId),
			this._Mn && (this.uMn = t.BulletId.toString()),
			(this.dMn = Vector_1.Vector.Create()),
			(t = t.Option.ReboundPoint),
			this.dMn.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0),
			!0
		);
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.GetComponent(182)),
			(this.Lie = this.Entity.GetComponent(177)),
			(this.aMn = Vector_1.Vector.Create()),
			(this.hMn = Vector_1.Vector.Create()),
			(this.P9r = Vector_1.Vector.Create()),
			(this.w9r = Vector_1.Vector.Create()),
			(this.lMn = Vector_1.Vector.Create()),
			(this.cz = Vector_1.Vector.Create()),
			(this.cie = Rotator_1.Rotator.Create()),
			(this.o9o = Quat_1.Quat.Create()),
			!0
		);
	}
	OnActivate() {
		this.N9r();
	}
	End() {
		return (
			(this.Hte = void 0),
			(this.aMn = void 0),
			(this.hMn = void 0),
			(this.P9r = void 0),
			(this.w9r = void 0),
			(this.lMn = void 0),
			(this.cz = void 0),
			(this.A9r = void 0),
			(this.cie = void 0),
			!(this.o9o = void 0)
		);
	}
	N9r() {
		this.A9r ||
			((this.A9r = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.A9r.bIsSingle = !1),
			(this.A9r.bIgnoreSelf = !0),
			(this.A9r.Radius = 75),
			this.A9r.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible)),
			(this.A9r.WorldContextObject = this.Entity.GetComponent(182)?.Owner);
	}
	CalculateReflectDir(t, e, o = void 0, i = !0) {
		return (
			(o
				? (this.cie.DeepCopy(o.K2_GetActorRotation()), this.cie)
				: this.Hte.ActorRotationProxy
			).Vector(this.lMn),
			Vector_1.Vector.ZeroVectorProxy.Subtraction(t, t),
			!(i && t.DotProduct(this.lMn) < 0) && (e.DeepCopy(this.lMn), !0)
		);
	}
	ReboundBullet(t, e) {
		if (this._Mn && e.BulletRowName !== this.uMn) return !1;
		let o;
		if (
			(this.Lie.HasTag(-1827668160) ||
				(this.Lie.AddTag(-1827668160),
				TimerSystem_1.TimerSystem.Delay(() => {
					this.Lie.RemoveTag(-1827668160);
				}, 2e3)),
			e.MoveInfo.BeginSpeedRotator.Vector(this.aMn),
			this.aMn.Multiply(this.cMn, this.cz),
			e.ActorComponent.ActorLocationProxy.Addition(this.cz, this.w9r),
			e.CollisionInfo.LastFramePosition.Subtraction(this.cz, this.P9r),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.A9r,
				this.P9r,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.A9r,
				this.w9r,
			),
			TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.A9r,
				PROFILE_BULLECT_TRACK,
			))
		) {
			let t = -1;
			for (let e = 0; e < this.A9r.HitResult.GetHitCount(); e++)
				if (
					ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
						this.A9r.HitResult.Actors.Get(e),
						!0,
					)?.Id === this.Entity.Id
				) {
					t = e;
					break;
				}
			-1 < t &&
				((o = this.A9r.HitResult.Actors.Get(t)),
				TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
					this.A9r.HitResult,
					t,
					this.cz,
				));
		}
		if (!o) {
			if (this.mMn) return !0;
			this.cz.DeepCopy(t.HitPosition);
		}
		return (
			(t = o.GetAttachParentActor()) && (o = t),
			!(
				!this.CalculateReflectDir(this.aMn, this.hMn, o, !1) ||
				(MathUtils_1.MathUtils.LookRotationForwardFirst(
					this.hMn,
					Vector_1.Vector.UpVectorProxy,
					e.MoveInfo.BeginSpeedRotator,
				),
				this.mMn
					? ((o
							? (this.aMn.DeepCopy(o.K2_GetActorLocation()),
								this.cie.FromUeRotator(o.K2_GetActorRotation()),
								this.cie)
							: (this.aMn.DeepCopy(this.Hte.ActorLocationProxy),
								this.Hte.ActorRotationProxy)
						).Quaternion(this.o9o),
						this.hMn.Multiply(30, this.hMn))
					: (this.hMn.Multiply(30, this.hMn), this.aMn.DeepCopy(this.cz)),
				this.aMn.Addition(this.hMn, this.aMn),
				this.o9o.RotateVector(this.dMn, this.cz),
				this.aMn.Addition(this.cz, this.aMn),
				e.ActorComponent.SetActorLocation(this.aMn.ToUeVector()),
				e.ActorComponent.SetActorRotation(
					e.MoveInfo.BeginSpeedRotator.ToUeRotator(),
				),
				(e.LiveTime = 0))
			)
		);
	}
});
(SceneItemReboundComponent = SceneItemReboundComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(146)],
		SceneItemReboundComponent,
	)),
	(exports.SceneItemReboundComponent = SceneItemReboundComponent);

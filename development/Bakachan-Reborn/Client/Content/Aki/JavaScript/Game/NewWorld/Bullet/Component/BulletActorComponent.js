"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, r) {
		var l,
			n = arguments.length,
			a =
				n < 3
					? e
					: null === r
						? (r = Object.getOwnPropertyDescriptor(e, o))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(t, e, o, r);
		else
			for (var i = t.length - 1; 0 <= i; i--)
				(l = t[i]) && (a = (n < 3 ? l(a) : 3 < n ? l(e, o, a) : l(e, o)) || a);
		return 3 < n && a && Object.defineProperty(e, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActorComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../GlobalData"),
	BaseActorComponent_1 = require("../../Common/Component/BaseActorComponent"),
	BulletActorPool_1 = require("../BulletActorPool");
let BulletActorComponent = class extends BaseActorComponent_1.BaseActorComponent {
	constructor() {
		super(...arguments),
			(this.NHo = void 0),
			(this.NeedDetach = !1),
			(this.ChildrenAttached = []),
			(this.cbr = !1);
	}
	OnStart() {
		var t = this.Entity.GetBulletInfo(),
			e = t.BulletDataMain;
		(this.NHo = e.Base.Shape),
			(this.cbr = e.Move.IsLockScale),
			(e = BulletActorPool_1.BulletActorPool.Get(this.NHo));
		return (
			GlobalData_1.GlobalData.IsPlayInEditor &&
				(e.ActorLabel = `BulletActor_${this.NHo}_` + t.BulletRowName),
			(e.EntityId = this.Entity.Id),
			(t.Actor = e),
			(this.ActorInternal = t.Actor),
			(t.ActorComponent = this),
			super.OnStart()
		);
	}
	OnClear() {
		if (this.ActorInternal) {
			if (
				(this.cbr && this.ActorInternal.RootComponent.SetAbsolute(!1, !1, !1),
				0 < this.ChildrenAttached.length)
			)
				for (const t of this.ChildrenAttached)
					t?.IsValid() &&
						t.GetParentActor() === this.ActorInternal &&
						t.K2_DetachFromActor(1, 1, 1);
			var t = this.Entity?.GetBulletInfo(),
				e = t?.CollisionInfo?.CollisionComponent;
			e &&
				(t.IsCollisionRelativeLocationZero ||
					e.K2_SetRelativeLocation(Vector_1.Vector.ZeroVector, !1, void 0, !0),
				t.IsCollisionRelativeRotationModify &&
					e.K2_SetRelativeRotation(
						Rotator_1.Rotator.ZeroRotator,
						!1,
						void 0,
						!0,
					),
				e.bHiddenInGame ||
					(e.SetHiddenInGame(!0),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Bullet", 21, "子弹碰撞盒显隐被修改", [
							"Bullet",
							t.BulletRowName,
						]))),
				GlobalData_1.GlobalData.IsPlayInEditor &&
					(this.NeedDetach ||
						Vector_1.Vector.OneVector.Equals(
							this.ActorInternal.GetActorScale3D(),
							MathCommon_1.MathCommon.KindaSmallNumber,
						) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Bullet",
								18,
								"子弹回收时发现子弹缩放值异常",
								["EntityId", this.Entity?.Id],
								["BulletRowName", t?.BulletRowName],
							)),
					!this.NeedDetach) &&
					this.ActorInternal.GetAttachParentActor() &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Bullet",
						18,
						"子弹回收时发现子弹仍Attach在别的实体上",
						["EntityId", this.Entity?.Id],
						["BulletRowName", t?.BulletRowName],
					),
				BulletActorPool_1.BulletActorPool.Recycle(
					this.ActorInternal,
					this.NHo,
					this.NeedDetach,
				);
		}
		return (
			(this.NHo = void 0),
			(this.ChildrenAttached.length = 0),
			(this.NeedDetach = !1),
			super.OnClear()
		);
	}
	SetAttachToComponent(t, e, o, r, l, n) {
		this.ActorInternal.K2_AttachToComponent(t, e, o, r, l, n),
			this.ResetAllCachedTime();
	}
	AddBulletLocalRotator(t) {
		this.ActorInternal.K2_AddActorLocalRotation(t, !0, void 0, !1),
			this.ResetAllCachedTime();
	}
	SetBulletCustomTimeDilation(t) {
		this.ActorInternal.CustomTimeDilation = t;
	}
};
(BulletActorComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(152)],
	BulletActorComponent,
)),
	(exports.BulletActorComponent = BulletActorComponent);

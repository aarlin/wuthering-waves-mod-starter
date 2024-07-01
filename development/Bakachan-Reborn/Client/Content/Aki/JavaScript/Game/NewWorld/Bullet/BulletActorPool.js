"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActorPool = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../GlobalData"),
	BulletConstant_1 = require("./BulletConstant"),
	SIZE_POOL = 30,
	PRE_ADD_COUNT = 5;
class BulletActorPool {
	static Get(t) {
		let o;
		if (this.Q5o.has(t))
			for (var e = this.Q5o.get(t); !o && 0 < e.length; )
				(o = e.pop())?.IsValid() || (o = void 0);
		return (
			o ||
				((o = ActorSystem_1.ActorSystem.Get(
					UE.KuroEntityActor.StaticClass(),
					MathUtils_1.MathUtils.DefaultTransform,
					void 0,
				)).GetComponentByClass(UE.SceneComponent.StaticClass()) ||
					o.AddComponentByClass(
						UE.SceneComponent.StaticClass(),
						!1,
						MathUtils_1.MathUtils.DefaultTransform,
						!1,
					),
				(o.bAutoDestroyWhenFinished = !1),
				o.SetActorEnableCollision(!1)),
			o
		);
	}
	static Recycle(t, o, e = !1) {
		t.SetActorHiddenInGame(!0),
			t.SetActorEnableCollision(!1),
			e &&
				(t.K2_DetachFromActor(1, 1, 1),
				t.SetActorScale3D(Vector_1.Vector.OneVector)),
			BulletConstant_1.BulletConstant.OpenActorRecycleCheck &&
				(t.GetActorScale3D().op_Equality(Vector_1.Vector.OneVector) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("Bullet", 18, "bullet actor scale invalid")),
				(e = t.GetComponentByClass(UE.ShapeComponent.StaticClass()))) &&
				!e.RelativeScale3D.op_Equality(Vector_1.Vector.OneVector) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Bullet", 18, "bullet collisionComp scale invalid");
		let l = this.Q5o.get(o);
		l || ((l = []), this.Q5o.set(o, l)),
			l.length > 30 ? ActorSystem_1.ActorSystem.Put(t) : l.push(t);
	}
	static Preload() {
		this.X5o(0, UE.BoxComponent.StaticClass()),
			this.X5o(1, UE.SphereComponent.StaticClass()),
			this.X5o(3, UE.BoxComponent.StaticClass()),
			this.X5o(4, void 0);
	}
	static X5o(t, o) {
		let e = this.Q5o.get(t);
		e || ((e = []), this.Q5o.set(t, e));
		for (let t = e.length; t < 5; t++) {
			var l,
				s = ActorSystem_1.ActorSystem.Get(
					UE.KuroEntityActor.StaticClass(),
					MathUtils_1.MathUtils.DefaultTransform,
					void 0,
				);
			s.GetComponentByClass(UE.SceneComponent.StaticClass()) ||
				s.AddComponentByClass(
					UE.SceneComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				),
				(s.bAutoDestroyWhenFinished = !1),
				s.SetActorHiddenInGame(!0),
				s.SetActorEnableCollision(!1),
				o &&
					(GlobalData_1.GlobalData.IsPlayInEditor &&
					BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor
						? (((l = s.AddComponentByClass(
								o,
								!1,
								MathUtils_1.MathUtils.DefaultTransform,
								!0,
							)).CreationMethod = 3),
							s.FinishAddComponent(
								l,
								!1,
								MathUtils_1.MathUtils.DefaultTransform,
							))
						: s.AddComponentByClass(
								o,
								!1,
								MathUtils_1.MathUtils.DefaultTransform,
								!1,
							)),
				e.push(s);
		}
	}
	static Clear() {
		for (var [, t] of this.Q5o)
			for (const o of t) ActorSystem_1.ActorSystem.Put(o);
		this.Q5o.clear();
	}
}
(exports.BulletActorPool = BulletActorPool).Q5o = new Map();

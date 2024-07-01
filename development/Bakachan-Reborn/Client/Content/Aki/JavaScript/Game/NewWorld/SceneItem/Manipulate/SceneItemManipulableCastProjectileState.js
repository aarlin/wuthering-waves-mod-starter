"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulatableCastProjectileState = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	Global_1 = require("../../../Global"),
	SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulatableCastProjectileState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
	constructor(e, t) {
		super(e, t),
			(this.Wrr = void 0),
			(this.Krr = void 0),
			(this.Qrr = 0),
			(this.hYo = 0),
			(this.Xrr = Vector_1.Vector.Create()),
			(this.$rr = Vector_1.Vector.Create()),
			(this.StateType = "BeCastingFree");
	}
	OnEnter() {
		super.OnEnter(),
			this.Yrr(),
			(this.Qrr = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式初速度),
			(this.hYo = 0),
			(this.Xrr = Vector_1.Vector.Create(this.SceneItem.LastHoldingLocation));
	}
	OnTick(e) {
		return (
			(e = this.Qrr * e),
			(this.hYo += e),
			(e = this.Wrr.GetLocationAtDistanceAlongSpline(this.hYo, 1)),
			this.SceneItem.ActorComp.SetActorLocation(e),
			this.hYo >= this.Wrr.GetSplineLength() &&
				(this.SceneItem.CurrentState = this.SceneItem.ResetState),
			(this.SceneItem.ActorComp.PhysicsMode = 3),
			(this.$rr = Vector_1.Vector.Create()),
			this.SceneItem.ActorComp.ActorLocationProxy.Subtraction(
				this.Xrr,
				this.$rr,
			),
			this.$rr.Normalize(),
			(this.Xrr = Vector_1.Vector.Create(
				this.SceneItem.ActorComp.ActorLocation,
			)),
			!0
		);
	}
	OnExit() {
		super.OnExit(),
			this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
				this.$rr.MultiplyEqual(this.Qrr).ToUeVector(),
			),
			this.Krr?.IsValid() &&
				(ActorSystem_1.ActorSystem.Put(this.Krr),
				(this.Krr = void 0),
				(this.Wrr = void 0));
	}
	Yrr() {
		var e = this.SceneItem.ManipulateBaseConfig,
			t = this.SceneItem.LastHoldingLocation.ToUeVector(),
			r = Vector_1.Vector.Create(0, 0, 0),
			i =
				(((i = CameraController_1.CameraController.CameraRotator).Pitch +=
					e.抛物瞄准模式仰角),
				i.Vector(r),
				r.Normalize(),
				r.MultiplyEqual(e.抛物瞄准模式初速度),
				(0, puerts_1.$ref)(void 0)),
			o = (0, puerts_1.$ref)(void 0),
			a = (0, puerts_1.$ref)(void 0),
			s = UE.NewArray(UE.Actor),
			n =
				(s.Add(this.SceneItem.ActorComp.Owner),
				s.Add(Global_1.Global.BaseCharacter.CharacterActorComponent.Owner),
				UE.NewArray(UE.BuiltinByte)),
			c =
				(n.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
				n.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
				n.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
				UE.GameplayStatics.Blueprint_PredictProjectilePath_ByObjectType(
					this.SceneItem.ActorComp.Owner,
					i,
					o,
					a,
					t,
					r.ToUeVector(),
					!0,
					this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
					n,
					!1,
					s,
					this.SceneItem?.ManipulateBaseConfig?.抛物瞄准射线Debug ? 2 : 0,
					5,
					10,
					10,
					e.抛物瞄准模式重力加速度,
				),
				(0, puerts_1.$unref)(o));
		for (let e = 0; e < c.Num(); e++) {
			let r = c.Get(e);
			(r = r.op_Subtraction(t)), c.Set(e, r);
		}
		(this.Krr = ActorSystem_1.ActorSystem.Get(
			UE.BP_BasePathLine_C.StaticClass(),
			MathUtils_1.MathUtils.DefaultTransform,
		)),
			this.Krr.K2_SetActorLocation(t, !1, void 0, !0),
			(this.Wrr = this.Krr.GetComponentByClass(
				UE.SplineComponent.StaticClass(),
			)),
			this.Wrr.SetSplinePoints(c, 0, !0);
	}
}
exports.SceneItemManipulatableCastProjectileState =
	SceneItemManipulatableCastProjectileState;

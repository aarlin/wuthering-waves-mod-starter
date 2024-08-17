"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueMoveSpline = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../../../../Core/Actor/ActorSystem"),
	Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
	EffectSystem_1 = require("../../../../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../../../../GlobalData"),
	GameplayCueEffect_1 = require("./GameplayCueEffect"),
	WIDTH = 70,
	LENGTH = 100,
	TANGENT = 130,
	SPLINE_MOVE_SPEED = 520,
	SPLINE_ROTATION_SPEED = 20;
class GameplayCueMoveSpline extends GameplayCueEffect_1.GameplayCueEffect {
	constructor() {
		super(...arguments),
			(this.m$o = void 0),
			(this.d$o = (0, puerts_1.$ref)(0)),
			(this.C$o = (0, puerts_1.$ref)(0)),
			(this.g$o = (0, puerts_1.$ref)(!1));
	}
	OnTick(e) {
		var t;
		EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle) &&
			(t = EffectSystem_1.EffectSystem.GetSureEffectActor(
				this.EffectViewHandle,
			)) &&
			UE.MoveSplineAI_C.元素球跟随(
				e,
				t,
				this.ActorInternal,
				this.m$o,
				(0, puerts_1.$unref)(this.d$o),
				520,
				20,
				(0, puerts_1.$unref)(this.C$o),
				(0, puerts_1.$unref)(this.g$o),
				void 0,
				this.d$o,
				this.C$o,
				this.g$o,
			);
	}
	OnDestroy() {
		ActorSystem_1.ActorSystem.Put(this.m$o.GetOwner()), super.OnDestroy();
	}
	AttachEffect() {
		var e = [
				new UE.Vector(-70, 0, 0),
				new UE.Vector(0, 100, 0),
				new UE.Vector(70, 0, 0),
				new UE.Vector(0, -100, 0),
			],
			t = [
				new UE.Vector(0, 130, 0),
				new UE.Vector(130, 0, 0),
				new UE.Vector(0, -130, 0),
				new UE.Vector(-130, 0, 0),
			],
			r =
				((this.m$o = this.f$o()),
				this.m$o.SetClosedLoop(!0),
				this.m$o.ClearSplinePoints(),
				UE.NewArray(UE.SplinePoint));
		for (let s = 0; s < e.length; s++) {
			var o = new UE.SplinePoint(
				s,
				e[s],
				t[s],
				t[s],
				Rotator_1.Rotator.ZeroRotator,
				Vector_1.Vector.OneVector,
				4,
			);
			r.Add(o);
		}
		this.m$o.AddPoints(r);
	}
	f$o() {
		var e = ActorSystem_1.ActorSystem.Get(
			UE.Actor.StaticClass(),
			this.ActorInternal.GetTransform(),
		);
		return (e =
			(GlobalData_1.GlobalData.IsPlayInEditor &&
				e.SetActorLabel(
					this.ActorInternal.GetActorLabel() + ":" + GameplayCueMoveSpline.name,
				),
			e.AddComponentByClass(
				UE.KuroMoveSplineComponent.StaticClass(),
				!1,
				this.ActorInternal.GetTransform(),
				!1,
			)));
	}
}
exports.GameplayCueMoveSpline = GameplayCueMoveSpline;

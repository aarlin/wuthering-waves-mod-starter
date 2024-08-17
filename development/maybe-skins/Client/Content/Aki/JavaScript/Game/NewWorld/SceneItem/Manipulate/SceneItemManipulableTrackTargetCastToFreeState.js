"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableTrackTargetCastToFreeState = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	CameraController_1 = require("../../../Camera/CameraController"),
	SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState"),
	PROFILE_KEY = "[SceneItemManipulableTrackTargetCastToFreeState.OnEnter]",
	MAX_DISTANCE = 5e3,
	SPHERE_TRACE_RADIUS = 1;
class SceneItemManipulableTrackTargetCastToFreeState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
	constructor(e, t) {
		super(e, t),
			(this.xnr = void 0),
			(this.wnr = void 0),
			(this.Bnr = void 0),
			(this.bnr = void 0),
			(this.qnr = void 0),
			(this.Gnr = !1),
			(this.Qrr = 0),
			(this.StateType = "BeCastingFree");
	}
	SetStartCameraLocation(e) {
		this.xnr = e;
	}
	OnEnter() {
		var e, t;
		super.OnEnter(),
			void 0 !== this.xnr &&
				((this.Gnr = !1),
				(this.wnr = Vector_1.Vector.Create(
					this.SceneItem.ActorComp.ActorLocationProxy,
				)),
				(t = this.SceneItem.Config.ThrowCfg.MotionConfig),
				(this.Qrr = t.Velocity),
				(this.qnr = 5e3),
				(t = Vector_1.Vector.Create(0, 0, 0)),
				CameraController_1.CameraController.CameraRotator.Vector(t),
				void 0 === SceneItemManipulableTrackTargetCastToFreeState.Nnr &&
					this.koe(),
				(e = Vector_1.Vector.Create(this.xnr)).AdditionEqual(
					t.MultiplyEqual(5e3),
				),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					SceneItemManipulableTrackTargetCastToFreeState.Nnr,
					this.xnr,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					SceneItemManipulableTrackTargetCastToFreeState.Nnr,
					e,
				),
				(t = TraceElementCommon_1.TraceElementCommon.SphereTrace(
					SceneItemManipulableTrackTargetCastToFreeState.Nnr,
					PROFILE_KEY,
				)),
				(this.Bnr = Vector_1.Vector.Create(e)),
				t &&
					SceneItemManipulableTrackTargetCastToFreeState.Nnr.HitResult
						.bBlockingHit &&
					(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
						SceneItemManipulableTrackTargetCastToFreeState.Nnr.HitResult,
						0,
						this.Bnr,
					),
					(this.qnr = Vector_1.Vector.Dist(this.wnr, this.Bnr))),
				(this.bnr = Vector_1.Vector.Create(this.Bnr)),
				this.bnr.SubtractionEqual(this.wnr),
				this.bnr.Normalize(),
				this.EnterCallback && this.EnterCallback(),
				(this.SceneItem.ActorComp.PhysicsMode = 0));
	}
	koe() {
		(SceneItemManipulableTrackTargetCastToFreeState.Nnr = UE.NewObject(
			UE.TraceSphereElement.StaticClass(),
		)),
			(SceneItemManipulableTrackTargetCastToFreeState.Nnr.WorldContextObject =
				this.SceneItem.ActorComp.Owner),
			(SceneItemManipulableTrackTargetCastToFreeState.Nnr.bIsSingle = !0),
			(SceneItemManipulableTrackTargetCastToFreeState.Nnr.bIgnoreSelf = !0);
		var e =
			((e = UE.NewArray(UE.BuiltinByte)).Add(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
			),
			e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
			e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
			e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
			(0, puerts_1.$ref)(e));
		SceneItemManipulableTrackTargetCastToFreeState.Nnr.SetObjectTypesQuery(e),
			(SceneItemManipulableTrackTargetCastToFreeState.Nnr.Radius = 1),
			(SceneItemManipulableTrackTargetCastToFreeState.Nnr.DrawTime = 5);
	}
	OnExit() {
		super.OnExit(), (this.xnr = void 0);
	}
	OnTick(e) {
		var t = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocationProxy);
		t = Vector_1.Vector.Create(t);
		let r = Vector_1.Vector.Create(this.bnr);
		if (
			(t.AdditionEqual(r.MultiplyEqual(this.Qrr * e)),
			this.Gnr ||
				this.SceneItem.ActorComp.SetActorLocation(
					t.ToUeVector(),
					"[SceneItemManipulableTrackTargetCastToFreeState.UpdateLocation]",
				),
			(this.qnr -= this.Qrr * e),
			!this.Gnr && this.qnr <= 0)
		) {
			if (this.SceneItem?.CurrentState !== this) return !0;
			(this.Gnr = !0),
				this.SceneItem.TryEnableTick(),
				(this.SceneItem.ActorComp.PhysicsMode = 3),
				(r = Vector_1.Vector.Create(this.bnr)),
				this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
					r.MultiplyEqual(this.Qrr).ToUeVector(),
				);
		}
		return (
			this.SceneItem.ManipulateBaseConfig.随速度调整朝向 &&
				!this.AfterHit &&
				((t = Vector_1.Vector.Create(this.bnr.ToUeVector()).ToUeVector()),
				(e = UE.KismetMathLibrary.FindLookAtRotation(
					this.SceneItem.ActorComp.ActorLocation,
					this.SceneItem.ActorComp.ActorLocation.op_Addition(t),
				)),
				this.SceneItem.ActorComp.SetActorRotation(
					e,
					"[ManipulableCastState.UpdateRotationAccordingToVelocity]",
					!1,
				)),
			!0
		);
	}
}
(exports.SceneItemManipulableTrackTargetCastToFreeState =
	SceneItemManipulableTrackTargetCastToFreeState).Nnr = void 0;

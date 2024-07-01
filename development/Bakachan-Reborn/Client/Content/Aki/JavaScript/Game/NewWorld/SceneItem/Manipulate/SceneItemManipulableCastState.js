"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableCastState = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableCastState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
	constructor(t, e) {
		super(t),
			(this.M$i = void 0),
			(this.CastDuration = -0),
			(this.CastRotAxis = void 0),
			(this.StartLoc = void 0),
			(this.StartRot = void 0),
			(this.IsUsePath = !1),
			(this.PathScaleFactor = -0),
			(this.CastDirection = void 0),
			(this.FinishCallback = void 0),
			(this.HitCallback = void 0),
			(this.Jrr = Vector_1.Vector.Create()),
			(this.zrr = Vector_1.Vector.Create()),
			(this.AfterHit = !1),
			(this.NeedResetPhysicsMode = !0),
			(this.Zrr = () => {
				this.AfterHit = !0;
			}),
			(this.M$i = e);
	}
	SetFinishCallback(t) {
		this.FinishCallback = t;
	}
	SetHitCallback(t) {
		this.HitCallback = t;
	}
	SetEnterCallback(t) {
		this.EnterCallback = t;
	}
	OnEnter() {
		this.StartCameraShake(this.M$i),
			(this.Timer = 0),
			(this.AfterHit = !1),
			this.SceneItem.ActorComp.Owner.OnActorHit.Clear(),
			this.HitCallback &&
				(this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.HitCallback),
				this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.Zrr)),
			(this.SceneItem.NeedRemoveControllerId = !0),
			LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(
				this.SceneItem.Entity.Id,
				!1,
			),
			this.SceneItem.OnCastItem(),
			this.SceneItem.TryAddTagById(1488763518),
			FNameUtil_1.FNameUtil.IsNothing(
				this.SceneItem.ManipulateBaseConfig.投掷状态碰撞预设,
			) ||
				this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
					this.SceneItem.ManipulateBaseConfig.投掷状态碰撞预设,
				);
	}
	OnTick(t) {
		return !0;
	}
	OnExit() {
		this.StopCameraShake(),
			this.SceneItem.TryRemoveTagById(1488763518),
			(this.NeedResetPhysicsMode = !0);
	}
	StartCast() {
		var t = Vector_1.Vector.Dist(
			this.SceneItem.ActorComp.ActorLocationProxy,
			this.SceneItem.TargetActorComponent.ActorLocationProxy,
		);
		let e = 1;
		var i = this.SceneItem.Config.ThrowCfg.MotionConfig;
		i.Type === IComponent_1.EThrowMotion.Projectile && (e = i.Velocity),
			(this.CastDuration = t / e),
			(this.CastRotAxis = Vector_1.Vector.Create(
				UE.KismetMathLibrary.RandomUnitVector(),
			)),
			(this.StartLoc = Vector_1.Vector.Create(
				this.SceneItem.ActorComp.ActorLocation,
			)),
			(this.StartRot = Rotator_1.Rotator.Create(
				this.SceneItem.ActorComp.ActorRotation,
			)),
			(this.SceneItem.ActorComp.PhysicsMode = 0);
	}
	CalcDirection() {
		this.SceneItem.CalcCastTargetPoint();
		var t =
			((t = Vector_1.Vector.Create(
				this.SceneItem.CastTargetLocation,
			)).SubtractionEqual(this.StartLoc),
			this.SceneItem.ManipulateBaseConfig.投掷运动轨迹曲线?.IsValid() &&
				(this.IsUsePath =
					t.Size() >
					ConfigManager_1.ConfigManager.ManipulateConfig.DontUseLineDistance),
			(this.PathScaleFactor = t.Size()),
			t.Normalize(),
			(this.CastDirection = Vector_1.Vector.Create(t)),
			Vector_1.Vector.Create());
		this.CastDirection.CrossProduct(Vector_1.Vector.UpVectorProxy, t),
			t.CrossProduct(this.CastDirection, this.zrr),
			this.zrr.Normalize(),
			this.zrr.CrossProduct(this.CastDirection, this.Jrr),
			this.Jrr.Normalize();
	}
	UpdateRotationAccordingToVelocity() {
		var t;
		this.SceneItem.ManipulateBaseConfig.随速度调整朝向 &&
			!this.AfterHit &&
			((t =
				this.SceneItem.ActorComp.GetPrimitiveComponent().GetComponentVelocity()).Normalize(
				MathCommon_1.MathCommon.SmallNumber,
			),
			(t = UE.KismetMathLibrary.FindLookAtRotation(
				this.SceneItem.ActorComp.ActorLocation,
				this.SceneItem.ActorComp.ActorLocation.op_Addition(t),
			)),
			this.SceneItem.ActorComp.SetActorRotation(
				t,
				"[ManipulableCastState.UpdateRotationAccordingToVelocity]",
				!1,
			));
	}
	UpdateLocation(t) {
		var e, i, o, a, r;
		this.SceneItem.PlayingMatchSequence ||
			((e = Vector_1.Vector.Create()),
			this.IsUsePath
				? ((r = Vector_1.Vector.Create(
						this.SceneItem.ManipulateBaseConfig.投掷运动轨迹曲线.GetVectorValue(
							t,
						),
					)).MultiplyEqual(this.PathScaleFactor),
					(i = Vector_1.Vector.Create()),
					(o = Vector_1.Vector.Create()),
					(a = Vector_1.Vector.Create()),
					this.CastDirection.Multiply(r.X, i),
					this.Jrr.Multiply(r.Y, o),
					this.zrr.Multiply(r.Z, a),
					e.AdditionEqual(i).AdditionEqual(o).AdditionEqual(a),
					e.AdditionEqual(this.StartLoc))
				: ((r = UE.KismetMathLibrary.Ease(0, 1, t, 6, 3)),
					Vector_1.Vector.Lerp(
						this.StartLoc,
						this.SceneItem.CastTargetLocation,
						r,
						e,
					)),
			this.SceneItem.ActorComp.SetActorLocation(
				e.ToUeVector(),
				"[ManipulableCastState.UpdateLocation]",
				void 0 !== this.HitCallback,
			));
	}
}
exports.SceneItemManipulableCastState = SceneItemManipulableCastState;

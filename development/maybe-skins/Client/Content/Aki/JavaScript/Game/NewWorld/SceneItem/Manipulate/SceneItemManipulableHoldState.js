"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableHoldState = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	GameSplineUtils_1 = require("../../../LevelGamePlay/Common/GameSplineUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableHoldState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
	constructor(e, t, i, r) {
		super(e),
			(this.M$i = void 0),
			(this.inr = void 0),
			(this.anr = void 0),
			(this.opi = 0),
			(this.jye = Vector_1.Vector.Create()),
			(this.k1t = Vector_1.Vector.Create()),
			(this.hnr = void 0),
			(this.lnr = void 0),
			(this._nr = (0, puerts_1.$ref)(void 0)),
			(this.unr = (0, puerts_1.$ref)(void 0)),
			(this.cnr = (0, puerts_1.$ref)(void 0)),
			(this.mnr = UE.NewArray(UE.Actor)),
			(this.dnr = void 0),
			(this.Cnr = void 0),
			(this.gnr = void 0),
			(this.fnr = void 0),
			(this.pnr = void 0),
			(this.M$i = t),
			(this.inr = i),
			(this.anr = r),
			(this.StateType = "BeHolding");
	}
	SetEnterCallback(e) {
		this.EnterCallback = e;
	}
	OnEnter() {
		this.StartCameraShake(this.M$i),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddSubCameraTag,
				this.inr,
			),
			(this.pnr = this.inr),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddExtraHoldingTags,
				this.anr,
			),
			(this.SceneItem.ActorComp.PhysicsMode = 2),
			this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
				Vector_1.Vector.ZeroVector,
			),
			this.mnr.Add(this.SceneItem.ActorComp.Owner),
			this.mnr.Add(Global_1.Global.BaseCharacter.CharacterActorComponent.Owner),
			this.EnterCallback && this.EnterCallback(),
			FNameUtil_1.FNameUtil.IsNothing(
				this.SceneItem.ManipulateBaseConfig.保持状态碰撞预设,
			) ||
				this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
					this.SceneItem.ManipulateBaseConfig.保持状态碰撞预设,
				),
			this.SceneItem.Config?.HoldCfg?.TrackTarget && this.vnr(),
			this.SceneItem.IsProjectileAimMode && this.Yrr();
		var e =
				Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
					185,
				),
			t =
				(e.AddTag(-1011082332),
				this.SceneItem.ManipulateBaseConfig?.抛物瞄准模式开关 ||
					e.AddTag(510134989),
				this.SceneItem.Entity.GetComponent(122));
		t?.Valid ? e.AddTag(882475449) : e.AddTag(1892366727);
	}
	OnTick(e) {
		return (
			(this.Timer += e),
			(e = this.snr()),
			(this.SceneItem.MovementTargetLocation = e.Loc),
			(this.SceneItem.MovementTargetRotation = e.Rot),
			!(
				(e = Vector_1.Vector.Distance(
					this.SceneItem.ActorComp.ActorLocationProxy,
					Vector_1.Vector.Create(e.Loc),
				)) >
					ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance ||
				(this.SceneItem.Config?.HoldCfg?.TrackTarget && this.Mnr(),
				this.SceneItem.IsProjectileAimMode && this.Snr(),
				0)
			)
		);
	}
	OnExit() {
		this.StopCameraShake(),
			void 0 !== this.pnr &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RemoveSubCameraTag,
					this.pnr,
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RemoveExtraHoldingTags,
				this.anr,
			),
			this.mnr.Empty(),
			this.SceneItem.Config?.HoldCfg?.TrackTarget && this.Enr(),
			this.ynr();
		var e =
			Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
				185,
			);
		e?.RemoveTag(-1011082332),
			e?.RemoveTag(510134989),
			e?.RemoveTag(-624589333),
			e?.RemoveTag(-1070569477),
			this.SceneItem?.LastHoldingLocation.DeepCopy(
				this.SceneItem.ActorComp.ActorLocationProxy,
			);
	}
	snr() {
		var e = this.SceneItem.ManipulateBaseConfig,
			t = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform,
			i = this.SceneItem.UsingAssistantHoldOffset
				? this.SceneItem.ConfigAssistantHoldOffset
				: this.SceneItem.ConfigHoldOffset;
		(i = t.TransformPositionNoScale(i)).Z +=
			Math.sin(this.Timer * Math.PI * e.摆动频率) * e.摆动范围;
		let r = UE.KismetMathLibrary.ComposeRotators(
			this.SceneItem.ConfigHoldRotator,
			t.Rotator(),
		);
		(t = new UE.Rotator(0, this.Timer * e.角速度, 0)),
			(r = UE.KismetMathLibrary.ComposeRotators(t, r)),
			(e = this.SceneItem.Entity.GetComponent(122));
		return (
			e?.Valid &&
				((t = new UE.Rotator(0, -e.Rotation, 0)),
				(r = UE.KismetMathLibrary.ComposeRotators(t, r))),
			{ Loc: i, Rot: r }
		);
	}
	Mnr() {
		var e, t;
		this.lnr &&
			((e = this.SceneItem.ActorComp.ActorLocationProxy),
			(t = this.Inr(e, this.k1t)),
			this.lnr.SetSplinePoints(t, 0, !0),
			this.hnr.K2_SetActorLocation(e.ToUeVector(), !1, void 0, !0));
	}
	Enr() {
		EffectSystem_1.EffectSystem.IsValid(this.opi) &&
			(EffectSystem_1.EffectSystem.StopEffectById(
				this.opi,
				"[SceneItemManipulableHoldState.ClearCurSplineAndEffectHandle]",
				!0,
			),
			(this.opi = 0)),
			this.hnr?.IsValid() &&
				(ActorSystem_1.ActorSystem.Put(this.hnr),
				(this.hnr = void 0),
				(this.lnr = void 0));
	}
	vnr() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
			this.SceneItem.Config.HoldCfg.TrackTarget.EntityId,
		);
		e &&
			(this.k1t.Set(e.Transform.Pos.X, e.Transform.Pos.Y, e.Transform.Pos.Z),
			(e = this.Inr(this.SceneItem.ActorComp.ActorLocationProxy, this.k1t)),
			(e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
				this.k1t,
				e,
				this.SceneItem.Config.HoldCfg.TrackTarget.EffectPath,
			))) &&
			((this.opi = e.EffectHandle),
			(this.hnr = e.SplineActor),
			(this.lnr = e.SplineComp));
	}
	Inr(e, t) {
		var i = UE.NewArray(UE.Vector),
			r = (i.Add(Vector_1.Vector.ZeroVector), Vector_1.Vector.Distance(e, t)),
			n = this.SceneItem.Config.HoldCfg.TrackTarget.EffectLength;
		return (
			t.Subtraction(e, this.jye),
			n < r && (this.jye.Normalize(), this.jye.Multiply(n, this.jye)),
			i.Add(this.jye.ToUeVector()),
			i
		);
	}
	Yrr() {
		var e = this.SceneItem.ManipulateBaseConfig,
			t = this.SceneItem.ActorComp.ActorLocation,
			i = (0, puerts_1.$unref)(this.unr);
		(t = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
			Vector_1.Vector.Create(t),
			i,
			e.抛物瞄准模式样条特效.AssetPathName.toString(),
		)) &&
			((this.dnr = t.EffectHandle),
			(this.Cnr = t.SplineActor),
			(this.gnr = t.SplineComp),
			(this.fnr = EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				MathUtils_1.MathUtils.DefaultTransform,
				e.抛物瞄准模式终点特效.AssetPathName.toString(),
				"[SceneItemManipulableHoldState.GeneratePredictProjectilePoints]",
				new EffectContext_1.EffectContext(this.SceneItem?.Entity.Id),
			)));
	}
	Snr() {
		if (this.gnr) {
			var e,
				t = this.SceneItem.ManipulateBaseConfig,
				i = this.SceneItem.ActorComp.ActorLocation,
				r = Vector_1.Vector.Create(0, 0, 0),
				n =
					((e =
						(((e = CameraController_1.CameraController.CameraRotator).Pitch +=
							t.抛物瞄准模式仰角),
						e.Vector(r),
						r.Normalize(),
						r.MultiplyEqual(t.抛物瞄准模式初速度),
						UE.NewArray(UE.BuiltinByte))).Add(
						QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
					),
					e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
					e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
					UE.GameplayStatics.Blueprint_PredictProjectilePath_ByObjectType(
						this.SceneItem.ActorComp.Owner,
						this._nr,
						this.unr,
						this.cnr,
						i,
						r.ToUeVector(),
						!0,
						this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
						e,
						!1,
						this.mnr,
						this.SceneItem?.ManipulateBaseConfig?.抛物瞄准射线Debug ? 1 : 0,
						5,
						10,
						10,
						t.抛物瞄准模式重力加速度,
					),
					(0, puerts_1.$unref)(this.unr));
			for (let e = 0; e < n.Num(); e++) {
				let t = n.Get(e);
				(t = t.op_Subtraction(i)), n.Set(e, t);
			}
			this.gnr.SetSplinePoints(n, 0, !0),
				this.Cnr.K2_SetActorLocation(i, !1, void 0, !0),
				EffectSystem_1.EffectSystem.GetEffectActor(
					this.fnr,
				).K2_SetActorLocation(
					n.Get(n.Num() - 1).op_Addition(i),
					!1,
					void 0,
					!0,
				);
		}
	}
	ynr() {
		EffectSystem_1.EffectSystem.IsValid(this.dnr) &&
			(EffectSystem_1.EffectSystem.StopEffectById(
				this.dnr,
				"[SceneItemManipulableHoldState.ClearProjectileSpline]",
				!0,
			),
			(this.dnr = 0)),
			this.Cnr?.IsValid() &&
				(ActorSystem_1.ActorSystem.Put(this.Cnr),
				(this.Cnr = void 0),
				(this.gnr = void 0)),
			EffectSystem_1.EffectSystem.IsValid(this.fnr) &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.fnr,
					"[SceneItemManipulableHoldState.ClearProjectileSpline]",
					!0,
				),
				(this.fnr = 0));
	}
	EnterProjectileAimMode() {
		this.Yrr(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RemoveSubCameraTag,
				this.inr,
			),
			(this.pnr = void 0);
		var e = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式镜头;
		void 0 !== e &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddSubCameraTag,
				e,
			),
			(this.pnr = e));
	}
	ExitProjectileAimMode() {
		this.ynr();
		var e = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式镜头;
		void 0 !== e &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RemoveSubCameraTag,
				e,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddSubCameraTag,
				this.inr,
			),
			(this.pnr = this.inr);
	}
}
exports.SceneItemManipulableHoldState = SceneItemManipulableHoldState;

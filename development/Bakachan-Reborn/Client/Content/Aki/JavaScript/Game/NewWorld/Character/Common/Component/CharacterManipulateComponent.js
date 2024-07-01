"use strict";
var CharacterManipulateComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, i) {
			var o,
				a = arguments.length,
				n =
					a < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(t, e, r, i);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(o = t[s]) &&
						(n = (a < 3 ? o(n) : 3 < a ? o(e, r, n) : o(e, r)) || n);
			return 3 < a && n && Object.defineProperty(e, r, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterManipulateComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	LevelAimLineController_1 = require("../../../../LevelGamePlay/AimLine/LevelAimLineController"),
	LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
	ActorUtils_1 = require("../../../../Utils/ActorUtils"),
	SceneItemManipulableBoomerangCastState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableBoomerangCastState"),
	SceneItemManipulableCastFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastFreeState"),
	SceneItemManipulableCastToOutletState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToOutletState"),
	SceneItemManipulableCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToTargetState"),
	SceneItemManipulableTrackTargetCastToFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableTrackTargetCastToFreeState"),
	SceneItemManipulableTrackTargetCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableTrackTargetCastToTargetState"),
	PROFILE_KEY = "CharacterManipulateComponent_LineTarceTestWithTarget",
	CAST_PITCH_MAX = 75,
	CAST_PITCH_MIN = -45,
	TARGET_ACTOR_TAG = new UE.FName("ControlObj"),
	DRAW_SPHERE_DEBUG = !1,
	MANIPULATE_SKILL_ID = 1003,
	HIT_COLLISION_NAME = new UE.FName("攻击碰撞"),
	MANIPULATE_CHECK_IGNORE_TAG = new UE.FName("ManipulateCheck_Ignore"),
	NORMAL_CHECK_PRESET_NAME = new UE.FName("被控物检测_Normal"),
	MONSTER_PART_CHECK_PRESET_NAME = new UE.FName("被控物检测_Part"),
	TEMP_HALF_HEIGHT = 80,
	MAX_CALC_WEIGTH_NUMBER_PER_FRAME = 3,
	LineTraceColor = new UE.LinearColor(1, 0, 0, 1);
let CharacterManipulateComponent =
	(CharacterManipulateComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.ac = 0),
				(this.z9r = void 0),
				(this.Z9r = void 0),
				(this.e7r = void 0),
				(this.t7r = void 0),
				(this.i7r = void 0),
				(this.o7r = void 0),
				(this.r7r = void 0),
				(this.nXt = void 0),
				(this.s3o = void 0),
				(this.Xte = void 0),
				(this.AWo = []),
				(this.n7r = -0),
				(this.s7r = -0),
				(this.a7r = -0),
				(this.h7r = void 0),
				(this.l7r = !1),
				(this._7r = !1),
				(this.u7r = 0),
				(this.uoe = void 0),
				(this.c7r = void 0),
				(this.m7r = !1),
				(this.d7r = 1),
				(this.C7r = void 0),
				(this.g7r = void 0),
				(this.f7r = !1),
				(this.p7r = !1),
				(this.v7r = void 0),
				(this.M7r = -MathUtils_1.MathUtils.MaxFloat),
				(this.S7r = void 0),
				(this.E7r = void 0),
				(this.y7r = []),
				(this.I7r = Vector_1.Vector.Create(0, 0, 0)),
				(this.T7r = 2),
				(this.L7r = void 0),
				(this.zpe = (t, e) => {
					this.t7r === e.Entity && this.StopManipualte();
				}),
				(this.D7r = () => {
					1003 ===
					ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId
						? ((this.d7r = 1),
							1003 ===
								ModelManager_1.ModelManager.RouletteModel
									.CurrentExploreSkillId &&
								void 0 !== this.Z9r &&
								void 0 === this.t7r &&
								this.R7r(1193763416),
							this.Xte.HasTag(40422668) && this.AddOrRemoveManipulateAirTag(!0))
						: ((this.d7r = 0.7),
							this.A7r(1193763416),
							this.AddOrRemoveManipulateAirTag(!1));
				}),
				(this.U7r = (t) => {
					"None" !== t.TagName && this.Xte?.AddTag(t?.TagId);
				}),
				(this.P7r = (t) => {
					"None" !== t.TagName && this.Xte?.RemoveTag(t?.TagId);
				}),
				(this.x7r = (t) => {
					for (let r = 0; r < t.Num(); r++) {
						var e = t.Get(r);
						"None" !== e.TagName && this.Xte?.AddTag(e?.TagId);
					}
				}),
				(this.w7r = (t) => {
					for (let r = 0; r < t.Num(); r++) {
						var e = t.Get(r);
						"None" !== e.TagName && this.Xte?.RemoveTag(e?.TagId);
					}
				}),
				(this.B7r = () => {
					this.StopManipualte();
				}),
				(this.b7r = (t) => {
					var e = this.t7r?.GetComponent(177);
					e && (t ? e.AddTag(230094484) : e.RemoveTag(230094484));
				}),
				(this.gIe = (t, e) => {
					1003 ===
						ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId &&
						this.AddOrRemoveManipulateAirTag(e);
				}),
				(this.q7r = () => {
					this.A7r(1193763416),
						this.Xte.RemoveTag(-1178928415),
						this.Xte.RemoveTag(-1976579620);
				});
		}
		set DebugDrawSphereAndArrow(t) {
			this.l7r = t;
		}
		get DebugDrawSphereAndArrow() {
			return this.l7r;
		}
		set TraceDebug(t) {
			this._7r = t;
		}
		get TraceDebug() {
			return this._7r;
		}
		OnInit() {
			return (this.ac = 0), (this.z9r = this.Entity.GetComponent(1).Owner), !0;
		}
		OnStart() {
			return (
				(this.nXt = this.Entity.GetComponent(3)),
				(this.s3o = this.Entity.GetComponent(161)),
				(this.Z9r = void 0),
				(this.e7r = void 0),
				(this.t7r = void 0),
				(this.i7r = void 0),
				(this.o7r = void 0),
				(this.h7r = new UE.Transform()),
				(this.l7r = false),
				(this.u7r = ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange),
				(this.Xte = this.Entity.GetComponent(185)),
				(this.L7r = this.Xte.ListenForTagAddOrRemove(40422668, this.gIe)),
				this.Ore(),
				!0
			);
		}
		Ore() {
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddSubCameraTag,
				this.U7r,
			),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.RemoveSubCameraTag,
					this.P7r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.AddExtraHoldingTags,
					this.x7r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.RemoveExtraHoldingTags,
					this.w7r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnChangeSelectedExploreId,
					this.D7r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.RemoveEntity,
					this.zpe,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.ChangeModeFinish,
					this.B7r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnManipulateShowLandTips,
					this.b7r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnChangeRole,
					this.B7r,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharBeHitAnim,
					this.B7r,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRevive,
					this.q7r,
				);
		}
		kre() {
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddSubCameraTag,
				this.U7r,
			),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.RemoveSubCameraTag,
					this.P7r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.AddExtraHoldingTags,
					this.x7r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.RemoveExtraHoldingTags,
					this.w7r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnChangeSelectedExploreId,
					this.D7r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.RemoveEntity,
					this.zpe,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.ChangeModeFinish,
					this.B7r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnManipulateShowLandTips,
					this.b7r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnChangeRole,
					this.B7r,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharBeHitAnim,
					this.B7r,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRevive,
					this.q7r,
				);
		}
		OnTick(t) {
			if (this.nXt.IsMoveAutonomousProxy)
				if (CharacterManipulateComponent_1.G7r)
					switch (this.ac) {
						case 0:
							this.m7r || this.$jo(!1);
							break;
						case 1:
							this.N7r(t);
							break;
						case 2:
							this.O7r(t);
							break;
						case 3:
							this.k7r(t),
								this.o7r?.IsProjectileAimMode || this.$jo(!0),
								this.F7r();
							break;
						case 4:
							this.V7r(t);
					}
				else
					ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
						1003,
					) && (CharacterManipulateComponent_1.G7r = !0);
		}
		OnEnd() {
			return (
				this.Reset(),
				this.r7r &&
					(this.r7r.K2_DestroyComponent(this.z9r), (this.r7r = void 0)),
				this.uoe && (this.uoe.Dispose(), (this.uoe = void 0)),
				this.c7r && (this.c7r.Dispose(), (this.c7r = void 0)),
				this.L7r && (this.L7r.EndTask(), (this.L7r = void 0)),
				this.kre(),
				!0
			);
		}
		GetDrawTarget() {
			if ((0 === this.ac || 1 === this.ac) && this.Z9r?.Valid) {
				var t = this.Z9r.GetComponent(1);
				if (t) return t.Owner;
			}
		}
		SetDrawTargetEntity(t) {
			this.Z9r = t;
		}
		GetDrawTargetChantTime() {
			var t;
			return this.Z9r?.Valid && (t = this.Z9r.GetComponent(140))
				? t.ManipulateBaseConfig.读条时间
				: 0;
		}
		GetCastTarget() {
			if (3 === this.ac && this.Z9r?.Valid) {
				var t = this.Z9r.GetComponent(1);
				if (t) return t.Owner;
			}
		}
		Chant(t) {
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Character", 23, "[Manipulate] Chant", [
						"State",
						this.ac,
					]),
				!!this.Z9r?.Valid &&
					!!this.e7r?.CanBeHeld &&
					!(
						this.m7r ||
						(this.e7r?.IsCanInteractType()
							? this.e7r.IsRequestingRemoveControllerId || (this.H7r(t), 0)
							: (this.StopManipualte(), 1))
					)
			);
		}
		H7r(t) {
			var e = this.Z9r.GetComponent(0)?.GetCreatureDataId();
			const r = Protocol_1.Aki.Protocol.y1s.create();
			(r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
				(r.W9n = !0),
				(this.m7r = !0),
				Net_1.Net.Call(19086, r, (e) => {
					if (this.m7r) {
						switch (e.lkn) {
							case Protocol_1.Aki.Protocol.lkn.Sys:
								break;
							case Protocol_1.Aki.Protocol.lkn.Proto_ErrNotBeControlledPlayer:
							case Protocol_1.Aki.Protocol.lkn
								.Proto_ErrBeControlledEntityNotExist:
								return (this.m7r = !1), void this.StopManipualte();
							default:
								return (
									ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
										e.lkn,
										6430,
									),
									(this.m7r = !1),
									void this.StopManipualte()
								);
						}
						var i;
						this.e7r?.Valid
							? (this.e7r.TryDisableTick("Chant"), this.j7r(t))
							: (((i = Protocol_1.Aki.Protocol.y1s.create()).rkn = r.rkn),
								(i.W9n = !1),
								Net_1.Net.Call(19086, i, (t) => {})),
							(this.m7r = !1);
					}
				});
		}
		j7r(t) {
			if (!this.m7r) return !1;
			this.Entity.GetComponent(36)?.SetForceSpeed(
				Vector_1.Vector.ZeroVectorProxy,
			);
			var e = this.Z9r?.GetComponent(182);
			if (!e) return this.W7r(), this.StopManipualte(), !1;
			var r = this.s3o.CharacterMovement.CurrentFloor;
			return r && r.HitResult.Actor === e.Owner
				? (this.W7r(), this.StopManipualte(), !1)
				: (e.SetAutonomous(!0),
					(this.n7r = 0),
					(r = this.Z9r.GetComponent(140)),
					r?.TryRemoveTagById(793256493),
					r?.TryRemoveSpecLockTag(),
					this.Draw(),
					t.Callback.Broadcast(!0),
					(this.T7r = 2),
					!0);
		}
		Draw() {
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Character", 23, "[Manipulate] Draw", [
						"State",
						this.ac,
					]),
				!!this.Z9r?.Valid &&
					((this.t7r = this.Z9r),
					(this.i7r = this.t7r.GetComponent(182)),
					(this.o7r = this.t7r.GetComponent(140)),
					(this.Z9r = void 0),
					(this.e7r = void 0),
					(this.s7r = 0),
					(this.o7r.CurrentState = this.o7r.DrawState),
					this.Xte?.Valid &&
						(this.Xte.RemoveTag(135557294), this.Xte.AddTag(2078326536)),
					this.A7r(1193763416),
					(this.ac = 2),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnManipulateCompleteChanting,
					),
					!0)
			);
		}
		Cast() {
			if (
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Character", 23, "[Manipulate] Cast", [
						"State",
						this.ac,
					]),
				4 !== this.ac)
			)
				return !1;
			if (!this.t7r.Valid) return !1;
			if (
				(this.r7r && this.r7r.ReleaseComponent(),
				this.p7r &&
					(LevelAimLineController_1.LevelAimLineController.StopEffect(),
					(this.p7r = !1)),
				(this.h7r = this.i7r.ActorTransform),
				(this.o7r.IsCanBeHeld = !1),
				this.o7r.TryEnableTick(),
				this.Z9r?.Valid && !this.o7r.IsProjectileAimMode)
			) {
				let r = !1;
				var t = this.Z9r.GetComponent(145),
					e = this.Z9r.GetComponent(121);
				t?.Valid
					? e?.Valid && t.GetIsIllegal(this.t7r)
						? (this.K7r(), (r = !0))
						: (e?.Valid &&
								EventSystem_1.EventSystem.EmitWithTarget(
									this.t7r,
									EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
									t.GetCurrentChooseIndex(),
									!1,
								),
							(e = this.o7r.CastToOutletState) instanceof
								SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState &&
								e.SetTarget(this.Z9r),
							(this.o7r.CurrentState = this.o7r.CastToOutletState))
					: ((t = this.o7r.CastToTargetState) instanceof
						SceneItemManipulableCastToTargetState_1.SceneItemManipulableCastToTargetState
							? t.SetTarget(this.Z9r)
							: t instanceof
									SceneItemManipulableTrackTargetCastToTargetState_1.SceneItemManipulableTrackTargetCastToTargetState &&
								t.SetTargetActorWithPart(this.Z9r.GetComponent(1), this.C7r),
						(this.o7r.CurrentState = this.o7r.CastToTargetState)),
					r ||
						((e = this.Z9r.GetComponent(1)),
						this.h7r.SetRotation(
							new UE.Quat(
								UE.KismetMathLibrary.FindLookAtRotation(
									this.i7r.ActorLocation,
									e.ActorLocation,
								),
							),
						)),
					(this.Z9r = void 0);
			} else this.K7r();
			return (
				(this.o7r.IsProjectileAimMode = !1),
				EffectSystem_1.EffectSystem.SpawnEffect(
					GlobalData_1.GlobalData.World,
					this.h7r,
					ConfigManager_1.ConfigManager.ManipulateConfig.PushEffectPath,
					"[CharacterManipulateComponent.Cast]",
					new EffectContext_1.EffectContext(this.Entity.Id),
				),
				this.TBo(),
				!0
			);
		}
		K7r() {
			var t = this.Q7r(),
				e = this.o7r.CastFreeState;
			e instanceof
			SceneItemManipulableCastFreeState_1.SceneItemManipulableCastFreeState
				? e.SetForward(t.Vector())
				: e instanceof
						SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState
					? e.SetVelocityDirection(Vector_1.Vector.Create(t.Vector()))
					: e instanceof
							SceneItemManipulableTrackTargetCastToFreeState_1.SceneItemManipulableTrackTargetCastToFreeState &&
						e.SetStartCameraLocation(
							ModelManager_1.ModelManager.ManipulaterModel
								.ExitHoldingStateCameraLocation,
						),
				this.o7r.IsProjectileAimMode
					? (this.o7r.CurrentState = this.o7r.CastProjectileState)
					: (this.o7r.CurrentState = this.o7r.CastFreeState),
				this.h7r.SetRotation(new UE.Quat(t));
		}
		Q7r() {
			var t = Global_1.Global.CharacterCameraManager.GetCameraRotation();
			return (
				(t.Pitch = MathUtils_1.MathUtils.Clamp(
					t.Pitch + this.o7r.ManipulateBaseConfig.无锁状态附加仰角,
					-45,
					75,
				)),
				t
			);
		}
		Drop() {
			if (
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Character", 23, "[Manipulate] Drop", [
						"State",
						this.ac,
					]),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.HideJigsawBaseHint,
				),
				!this.t7r?.Valid && !this.Z9r?.Valid)
			)
				return !1;
			this.m7r && (this.W7r(), (this.m7r = !1)),
				(3 !== this.ac && 4 !== this.ac) ||
					!this.r7r ||
					this.r7r.ReleaseComponent();
			var t = (this.t7r ?? this.Z9r)?.GetComponent(140);
			return (
				(t.IsCanBeHeld = !1),
				(t.IsProjectileAimMode = !1),
				t?.Valid &&
					t.CurrentState !== t.ResetState &&
					t.CurrentState !== t.MatchOutletState &&
					((t.CurrentState = t.DropState), t?.TryEnableTick()),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
					!1,
					this.Z9r,
					!1,
				),
				this.TBo(),
				!0
			);
		}
		Reset() {
			var t = this.t7r ?? this.Z9r;
			if (t) {
				var e = Vector_1.Vector.Create(t.GetComponent(182).ActorLocationProxy),
					r = Vector_1.Vector.Create(e);
				let o;
				if (
					(e.Set(e.X, e.Y, e.Z + 500),
					r.Set(r.X, r.Y, r.Z - 1e3),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, e),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, r),
					(this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
					TraceElementCommon_1.TraceElementCommon.LineTrace(
						this.uoe,
						PROFILE_KEY,
					) && this.uoe.HitResult.bBlockingHit)
				)
					for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
						var i = this.uoe.HitResult.Actors.Get(t);
						if (void 0 !== i) {
							o = i.GetName();
							break;
						}
					}
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Character",
						32,
						"[CharacterManipulateComp] StopManipualte",
						["Location", t.GetComponent(182).ActorLocationProxy],
						["FloorName", o],
						["id", this.Entity.Id],
					);
			}
			0 !== this.ac && this.Drop(), this.TBo();
		}
		X7r() {
			var t;
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Character", 23, "[Manipulate] Hold", [
					"State",
					this.ac,
				]),
				this.t7r?.Valid &&
					(ModelManager_1.ModelManager.ManipulaterModel.NeedShowLandTips() &&
						this.t7r?.GetComponent(177)?.AddTag(230094484),
					this.r7r ||
						((this.r7r = this.z9r.GetComponentByClass(
							UE.PhysicsHandleComponent.StaticClass(),
						)),
						this.r7r) ||
						(this.r7r = this.z9r.AddComponentByClass(
							UE.PhysicsHandleComponent.StaticClass(),
							!1,
							new UE.Transform(),
							!1,
						)),
					(this.o7r.CurrentState = this.o7r.HoldState),
					(t = this.o7r.ManipulateBaseConfig),
					this.r7r.SetLinearStiffness(t.线性刚度),
					this.r7r.SetLinearDamping(t.线性阻尼),
					this.r7r.SetAngularStiffness(t.角刚度),
					this.r7r.SetAngularDamping(t.角度阻尼),
					this.o7r.ManipulateBaseConfig.控物保持使用物理 &&
						this.r7r.GrabComponentAtLocationWithRotation(
							this.i7r.GetPrimitiveComponent(),
							FNameUtil_1.FNameUtil.EMPTY,
							this.i7r.ActorLocation,
							this.i7r.ActorRotation,
						),
					this.Xte?.Valid &&
						(this.Xte.RemoveTag(2078326536), this.Xte.AddTag(-624589333)),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnManipulateStartChanting,
						this.o7r.ManipulateBaseConfig.读条时间,
						this.o7r.ManipulateBaseConfig.控物准星资源ID,
					),
					this.ActiveHandFX(this.t7r),
					LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActiveOrDeactiveManipulateFx(
						this.t7r.Id,
						!0,
					),
					(this.ac = 3));
		}
		Precast(t) {
			return (
				3 === this.ac &&
				(EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.HideJigsawBaseHint,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
					!1,
					this.Z9r,
					!1,
				),
				(ModelManager_1.ModelManager.ManipulaterModel.ExitHoldingStateCameraLocation =
					Vector_1.Vector.Create(
						CameraController_1.CameraController.CameraLocation,
					)),
				(this.a7r = 0),
				this.o7r.PrecastState.SetDirection(t),
				(this.o7r.CurrentState = this.o7r.PrecastState),
				(this.ac = 4),
				!0)
			);
		}
		TBo() {
			this.Xte?.Valid &&
				(this.Xte.RemoveTag(135557294),
				this.Xte.RemoveTag(2078326536),
				this.Xte.RemoveTag(-624589333),
				this.Xte.RemoveTag(-284509534)),
				this.A7r(1193763416),
				this.m7r && (this.W7r(), (this.m7r = !1), this.StopManipualte()),
				this.p7r &&
					(LevelAimLineController_1.LevelAimLineController.StopEffect(),
					(this.p7r = !1)),
				ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(
					Vector_1.Vector.ZeroVectorProxy,
				),
				(this.C7r = void 0);
			var t = this.t7r ?? this.Z9r;
			t?.GetComponent(177)?.RemoveTag(230094484),
				this.f7r &&
					LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActiveOrDeactiveManipulateFx(
						t.Id,
						!1,
					),
				(this.t7r = void 0),
				(this.i7r = void 0),
				(this.o7r = void 0),
				(this.Z9r = void 0),
				(this.e7r = void 0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.HiddenManipulateUI,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnManipulateCancelChanting,
				),
				this.DeactiveHandFx(),
				(this.ac = 0),
				(this.T7r = 2),
				(this.g7r = void 0);
		}
		$jo(t) {
			var e = this.s3o.CharacterMovement.CurrentFloor.HitResult.Actor;
			if (e)
				switch (this.T7r) {
					case 2:
						this.$7r(), this.Y7r(e, t), (this.T7r = 0);
						break;
					case 0:
						this.J7r(e, t);
						break;
					case 1:
						this.z7r(this.S7r, t), (this.T7r = 2);
				}
			else
				this.Z9r?.Valid &&
					(this.m7r && this.W7r(),
					(this.Z9r = void 0),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
						void 0 !== this.Z9r,
						this.Z9r,
						t,
					)),
					this.A7r(1193763416),
					this.$7r();
		}
		$7r() {
			CameraController_1.CameraController.CameraRotator.Vector(this.I7r),
				(this.M7r = -MathUtils_1.MathUtils.MaxFloat),
				(this.S7r = void 0),
				(this.y7r = []),
				(this.g7r = void 0);
		}
		Y7r(t, e) {
			let r = this.u7r;
			e && (r = this.o7r.ManipulateBaseConfig.投掷锁定范围);
			var i = ModelManager_1.ModelManager.CameraModel?.FightCameraFinalDistance;
			i && (r += i),
				ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
					r,
					1,
					this.AWo,
				);
			for (const r of this.AWo) {
				var o = r.Entity;
				if (o?.Valid && !o.GetComponent(0)?.IsConcealed)
					if (!(a = o.GetComponent(182)) || t !== a.Owner) {
						if (!e && !o.GetComponent(140)?.Valid) continue;
						var a = o.GetComponent(121),
							n = o.GetComponent(122);
						((a?.Valid ?? n?.Valid) ||
							o.GetComponent(182)?.GetIsSceneInteractionLoadCompleted()) &&
							this.y7r.push(o);
					}
			}
			if (e) {
				ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
					r,
					2,
					this.AWo,
				);
				for (const t of this.AWo) {
					var s = t.Entity;
					!s?.Valid || s.GetComponent(0)?.IsConcealed || this.y7r.push(s);
				}
			}
		}
		J7r(t, e) {
			let r = 0;
			if (this.y7r)
				for (; r < 3; ) {
					if (this.y7r.length <= 0) return void (this.T7r = 1);
					var i,
						o = this.y7r.shift();
					o?.Valid &&
						(((i = o.GetComponent(182)) && t === i.Owner) ||
							((this.E7r = void 0),
							(i = this.Z7r(o, e, this.I7r)) > this.M7r &&
								((this.M7r = i), (this.S7r = o), (this.C7r = this.E7r)),
							r++));
				}
		}
		z7r(t, e) {
			var r;
			this.eHr(t),
				t &&
					this.g7r &&
					(r = this.tHr(t, this.g7r.BoneName)[0]) &&
					((r = Vector_1.Vector.Create(r.GetLocation())),
					ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(
						r,
					)),
				t !== this.Z9r
					? (this.Z9r?.Valid &&
							void 0 === this.t7r &&
							((r = this.Z9r.GetComponent(140))?.TryRemoveTagById(793256493),
							r?.TryRemoveSpecLockTag()),
						(this.Z9r = t),
						e
							? t
								? (EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.ManipulateStartLockCastTarget,
										this.Z9r,
										this.C7r,
									),
									(this.g7r = this.C7r))
								: EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.ManipulateEndLockCastTarget,
									)
							: EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
									void 0 !== this.Z9r,
									this.Z9r,
									e,
								),
						(r = this.Z9r?.GetComponent(1)),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Character",
								32,
								"Manipulate Switch To New Target",
								[
									"Actor",
									void 0 === r
										? void 0
										: UE.KismetSystemLibrary.GetDisplayName(r.Owner),
								],
							),
						this.Z9r?.Valid && (this.e7r = this.Z9r.GetComponent(140)),
						this.Z9r?.Valid && void 0 === this.t7r
							? ((t = this.Z9r.GetComponent(140))?.TryAddTagById(793256493),
								t?.TryAddSpecLockTag(),
								1003 ===
									ModelManager_1.ModelManager.RouletteModel
										.CurrentExploreSkillId && this.R7r(1193763416))
							: this.A7r(1193763416))
					: this.g7r !== this.C7r &&
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ManipulateStartLockCastTarget,
							this.Z9r,
							this.C7r,
						),
						(this.g7r = this.C7r));
		}
		eHr(t) {
			t?.Valid
				? (t !== this.Z9r &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.HideJigsawBaseHint,
						),
					(t = t.GetComponent(145))?.Valid
						? (t.ShowAimModel(this.t7r),
							this.A7r(1520676172),
							this.o7r?.Config?.BaseCfg?.CanRotate && this.R7r(-1070569477))
						: this.A7r(-1070569477))
				: (EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.HideJigsawBaseHint,
					),
					this.A7r(-1070569477),
					this.o7r?.Config?.BaseCfg?.CanRotate && this.R7r(1520676172));
		}
		Z7r(t, e, r) {
			var i = -MathUtils_1.MathUtils.MaxFloat,
				o = t.GetComponent(1);
			if (!this.iHr(t, e, o)) return i;
			var a = t.GetComponent(177),
				n = t.GetComponent(140);
			if (n?.Valid && void 0 === n?.ManipulateBaseConfig) return i;
			let s = !1,
				h = !1,
				l = 1;
			if (a?.HasTag(-709838471)) return i;
			if (e) {
				if (!this.t7r?.Valid && !this.Z9r?.Valid) return i;
				var m = (a = t.GetComponent(0)).GetBaseInfo();
				if (!m) return i;
				if (
					this.t7r.GetComponent(141)?.Valid &&
					0 < (a = a.GetAwakedEntities()).length &&
					!a.includes(this.t7r.GetComponent(0).GetPbDataId())
				)
					return i;
				if (this.o7r.Config.SearchTargetCfg)
					for (const t of this.o7r.Config.SearchTargetCfg.LockConditions)
						if ((0, IUtil_1.isEntitiyMatch)(t.EntitiyMatch, m.Category)) {
							(s = !0), (l = t.Weight);
							break;
						}
				if (!s) return i;
				if (
					((a = t.GetComponent(145)) &&
						(s = !(
							!a?.CheckMatchManipulatable(this.o7r?.Entity) ||
							!a?.CanSetNewItem() ||
							a?.IsLockOrSlient() ||
							!a?.MultiplayerLimitTypeCheck()
						)),
					(a =
						t.GetComponent(0).GetEntityType() ===
						Protocol_1.Aki.Protocol.HBs.Proto_Monster),
					s)
				)
					if (a) {
						let e = !1;
						if (0 < (a = t.GetComponent(58)).Parts.length)
							for (const t of a.Parts)
								if (t.Active) {
									e = !0;
									break;
								}
						s = e
							? ((h = !0), !!(t = this.oHr(t, a)) && 0 < t.length)
							: this.rHr(o);
					} else s = this.rHr(o);
			} else
				(s = o.Owner?.ActorHasTag(TARGET_ACTOR_TAG) ?? !1),
					(!n?.Valid ||
						((s = s && n.CanBeHeld),
						(a = this.nXt?.ActorLocationProxy),
						(t = o.ActorLocationProxy),
						Vector_1.Vector.Distance(a, t) >
							n.ManipulateBaseConfig.被感知范围)) &&
						(s = !1),
					(a = this.Entity.GetComponent(0).GetCreatureDataId()),
					(t = n?.GetControllerId()),
					(s =
						(s = (void 0 === t || 0 === t || (0 !== t && t === a)) && s) &&
						this.rHr(o));
			return s ? l * this.nHr(o, r, i, h, e) : i;
		}
		sHr() {
			(this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
				(this.uoe.WorldContextObject = this.nXt.Owner),
				(this.uoe.bIsSingle = !1),
				(this.uoe.bIgnoreSelf = !0),
				(this.uoe.bIsProfile = !0),
				(this.uoe.DrawTime = 0.5),
				TraceElementCommon_1.TraceElementCommon.SetTraceColor(
					this.uoe,
					LineTraceColor,
				),
				TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
					this.uoe,
					new UE.LinearColor(0, 1, 0, 1),
				);
		}
		aHr() {
			(this.c7r = UE.NewObject(UE.TraceSphereElement.StaticClass())),
				(this.c7r.WorldContextObject = this.nXt.Owner),
				(this.c7r.bIsSingle = !1),
				(this.c7r.bIgnoreSelf = !0),
				(this.c7r.bIsProfile = !0),
				(this.c7r.ProfileName = NORMAL_CHECK_PRESET_NAME),
				(this.c7r.DrawTime = 0.5),
				TraceElementCommon_1.TraceElementCommon.SetTraceColor(
					this.c7r,
					LineTraceColor,
				),
				TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
					this.c7r,
					LineTraceColor,
				);
		}
		rHr(t) {
			this.uoe || this.sHr();
			var e =
				((e = Vector_1.Vector.Create()).DeepCopy(this.nXt.ActorLocationProxy),
				e.AdditionEqual(Vector_1.Vector.Create(0, 0, 80)),
				e.ToUeVector());
			let r = t.ActorLocation;
			var i = t.Entity.GetComponent(132);
			i?.Valid && (r = i.GetHitPoint().ToUeVector()),
				(i = t.Entity.GetComponent(145)),
				i?.Valid && (r = i.GetSocketLocation(this.t7r).ToUeVector()),
				(i = t.Entity.GetComponent(124)),
				i?.Valid && (r = i.GetHitPoint().ToUeVector()),
				(i = t.Entity.GetComponent(140));
			i?.Valid && (r = r.op_Addition(i.ManipulateBaseConfig.被感知坐标偏移)),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, e),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, r),
				this.uoe.SetDrawDebugTrace(this._7r ? 2 : 0);
			let o = !0;
			if (
				((this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.uoe,
					PROFILE_KEY,
				) && this.uoe.HitResult.bBlockingHit)
			)
				for (let e = 0; e < this.uoe.HitResult.Actors.Num(); e++) {
					var a = this.uoe.HitResult.Actors.Get(e);
					if (void 0 !== a) {
						var n = this.uoe.HitResult.Components.Get(e);
						if (this.hHr(a, t)) break;
						if (this.lHr(a, n)) {
							o = !1;
							break;
						}
					}
				}
			return o && this._Hr(this.i7r, o);
		}
		_Hr(t, e) {
			var r =
					((r = Vector_1.Vector.Create()).DeepCopy(this.nXt.ActorLocationProxy),
					r.AdditionEqual(Vector_1.Vector.Create(0, 0, 80)),
					r.ToUeVector()),
				i = this.z9r.GetTransform(),
				o = t?.Entity.GetComponent(140);
			if (!o?.Valid) return e;
			if (
				((e = i.TransformPositionNoScale(o.ConfigHoldOffset)),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, r),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, e),
				(this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
				(i = TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.uoe,
					PROFILE_KEY,
				)) && this.uoe.HitResult.bBlockingHit)
			)
				for (let e = 0; e < this.uoe.HitResult.Actors.Num(); e++) {
					var a = this.uoe.HitResult.Actors.Get(e);
					if (void 0 !== a) {
						if (this.t7r.GetComponent(143)?.IsChildrenActor(a)) break;
						var n = this.uoe.HitResult.Components.Get(e);
						if (this.hHr(a, t)) break;
						if (this.lHr(a, n)) return !1;
					}
				}
			return !0;
		}
		lHr(t, e) {
			return (
				this.i7r?.Owner !== t &&
				!(
					!e ||
					t.ActorHasTag(MANIPULATE_CHECK_IGNORE_TAG) ||
					((t = e.GetCollisionProfileName()),
					RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(
						t,
					)) ||
					HIT_COLLISION_NAME.op_Equality(t)
				)
			);
		}
		F7r() {
			this.c7r || this.aHr();
			var t = Vector_1.Vector.Create(),
				e =
					(t.DeepCopy(this.nXt.ActorLocationProxy),
					t.AdditionEqual(Vector_1.Vector.Create(0, 0, this.nXt.HalfHeight)),
					t.ToUeVector());
			const r = Vector_1.Vector.Create();
			if (
				(r.DeepCopy(this.nXt.ActorForwardProxy),
				r.Normalize(),
				t.AdditionEqual(r.MultiplyEqual(20)),
				(t = t.ToUeVector()),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.c7r, e),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.c7r, t),
				(this.c7r.Radius = this.nXt.HalfHeight),
				this.c7r.SetDrawDebugTrace(this._7r ? 1 : 0),
				(e = TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.c7r,
					PROFILE_KEY,
				)) && this.c7r.HitResult.bBlockingHit)
			) {
				for (let t = 0; t < this.c7r.HitResult.Actors.Num(); t++) {
					var i = this.c7r.HitResult.Actors.Get(t);
					if (void 0 !== i && !this.hHr(i, this.i7r)) {
						var o = this.c7r.HitResult.Components.Get(t);
						if (this.lHr(i, o)) {
							(i = Vector_1.Vector.Create()),
								TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
									this.c7r.HitResult,
									t,
									i,
								),
								i.SubtractionEqual(this.nXt.ActorLocationProxy);
							const e = this.nXt.ActorForwardProxy;
							if (
								(i.Set(i.X, i.Y, 0),
								i.Normalize(),
								e.Set(e.X, e.Y, 0),
								e.Normalize(),
								i.CrossProduct(e, i),
								0 < i.Z)
							)
								return void (this.o7r.UsingAssistantHoldOffset = !0);
						}
					}
				}
				this.o7r.UsingAssistantHoldOffset &&
					(this.o7r.UsingAssistantHoldOffset = !1);
			} else this.o7r.UsingAssistantHoldOffset = !1;
		}
		hHr(t, e) {
			let r;
			return (
				(r = (
					UE.KuroStaticLibrary.IsImplementInterface(
						t.GetClass(),
						UE.BPI_CreatureInterface_C.StaticClass(),
					)
						? ActorUtils_1.ActorUtils
						: ModelManager_1.ModelManager.SceneInteractionModel
				).GetEntityByActor(t))?.Id === e?.Entity.Id
			);
		}
		iHr(t, e, r) {
			return !!t.Active && !((e && t === this.t7r) || !r?.Valid);
		}
		nHr(t, e, r, i, o = !1) {
			return i
				? this.uHr(t, e, r)
				: t.Entity.GetComponent(122)?.Valid
					? this.cHr(t, e, r, o)
					: this.mHr(t, e, r, o);
		}
		mHr(t, e, r, i) {
			var o = Vector_1.Vector.Create(t.ActorLocationProxy),
				a = t.Entity.GetComponent(145),
				n =
					((a =
						(a?.Valid && o.DeepCopy(a.GetSocketLocation(this.t7r)),
						Vector_1.Vector.Create(0, 0, 0))),
					o.Subtraction(CameraController_1.CameraController.CameraLocation, a),
					a.Normalize(),
					e.Normalize(),
					MathUtils_1.MathUtils.DotProduct(a, e));
			a = Vector_1.Vector.Distance(o, this.nXt.ActorLocationProxy);
			let s = -1;
			e = t.Entity.GetComponent(140);
			var h = new Array(),
				l = new Array();
			if (i)
				for (const t of this.o7r.Config.SearchTargetCfg.AngleWeight)
					h.push(t.Angle), l.push(t.Weight);
			else {
				var m = e.ManipulateBaseConfig.被感知角度权重;
				for (let t = 0; t < m.Num(); t++) {
					var c = m.GetKey(t),
						C = m.Get(c);
					h.push(c), l.push(C);
				}
			}
			for (let t = 0; t < h.length; t++) {
				var E = h[t];
				if (n > Math.cos(((E * this.d7r) / 180) * Math.PI)) {
					s = l[t];
					break;
				}
			}
			return -1 === s
				? r
				: s *
						((o = i ? this.o7r.ManipulateBaseConfig.投掷锁定范围 : this.u7r) -
							a);
		}
		uHr(t, e, r) {
			var i = t.Entity;
			t = i.GetComponent(58);
			let o = -Number.MAX_VALUE,
				a = -1;
			var n = this.oHr(i, t);
			for (let t = 0; t < n.length; t++) {
				var s = n[t],
					h =
						((s = this.tHr(i, s.BoneName)[0]),
						Vector_1.Vector.Create(s.GetLocation())),
					l = Vector_1.Vector.Create(0, 0, 0);
				h.Subtraction(this.nXt.ActorLocationProxy, l),
					l.Normalize(),
					e.Normalize(),
					Vector_1.Vector.Create(s.GetLocation()).SubtractionEqual(
						this.nXt.ActorLocationProxy,
					);
				var m = MathUtils_1.MathUtils.DotProduct(l, e);
				if (
					!(
						(s = Vector_1.Vector.Distance(h, this.nXt.ActorLocationProxy)) >
						this.u7r
					)
				) {
					let e = -1;
					var c = new Array(),
						C = new Array();
					for (const t of this.o7r.Config.SearchTargetCfg.AngleWeight)
						c.push(t.Angle), C.push(t.Weight);
					for (let t = 0; t < c.length; t++) {
						var E = c[t];
						if (m > Math.cos(((E * this.d7r) / 180) * Math.PI)) {
							e = C[t];
							break;
						}
					}
					-1 !== e && (l = e * (this.u7r - s)) > o && ((o = l), (a = t));
				}
			}
			return -1 !== a ? ((this.E7r = n[a]), 1e4) : r;
		}
		cHr(t, e, r, i) {
			var o = t.Entity.GetComponent(122);
			let a = -MathUtils_1.MathUtils.MaxFloat;
			var n = Vector_1.Vector.Create(0, 0, 0),
				s = [],
				h = [];
			e.Normalize();
			let l = -1;
			if (((s = []), (h = []), i))
				for (const t of this.o7r.Config.SearchTargetCfg.AngleWeight)
					s.push(t.Angle), h.push(t.Weight);
			else {
				var m = t.Entity.GetComponent(140).ManipulateBaseConfig.被感知角度权重;
				for (let t = 0; t < m.Num(); t++) {
					var c = m.GetKey(t),
						C = m.Get(c);
					s.push(c), h.push(C);
				}
			}
			for (const t of o.GetAllActivatedBlockPos()) {
				t.Subtraction(CameraController_1.CameraController.CameraLocation, n),
					n.Normalize();
				var E,
					u = MathUtils_1.MathUtils.DotProduct(n, e);
				for (let t = 0; t < s.length; t++) {
					var d = s[t];
					if (u > Math.cos(((d * this.d7r) / 180) * Math.PI)) {
						l = h[t];
						break;
					}
				}
				-1 !== l && (E = l * u) > a && (a = E);
			}
			return a === -MathUtils_1.MathUtils.MaxFloat ? r : a;
		}
		N7r(t) {
			(this.n7r += 0.001 * t),
				this.e7r.CurrentState.Tick(0.001 * t),
				void 0 === this.e7r
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Character",
								32,
								"[Manipulate] 读条中的对象上没有Manipulatable组件",
								["Name", this.Z9r],
							),
						this.StopManipualte())
					: this.n7r > this.e7r.ManipulateBaseConfig.读条时间 && this.Draw();
		}
		O7r(t) {
			this.o7r?.PlayingMatchSequence ||
				((this.s7r += 0.001 * t),
				this._Hr(this.i7r, !1)
					? (this.o7r.CurrentState.Tick(0.001 * t),
						(t = this.o7r?.ManipulateBaseConfig.吸取时间) &&
							this.s7r >= t &&
							((t = this.i7r.ActorLocationProxy),
							Vector_1.Vector.DistSquared(t, this.i7r.ActorLocationProxy) < 2500
								? this.X7r()
								: (this.StopManipualte(), this.Reset())))
					: (this.StopManipualte(), this.Reset()));
		}
		k7r(t) {
			if (((this.s7r += 0.001 * t), this.r7r?.IsValid())) {
				if (
					(this.o7r.CurrentState.Tick(0.001 * t),
					this.o7r.CastFreeState instanceof
						SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState &&
						this.o7r.Config.ThrowCfg.MotionConfig.RenderTrajectoryConfig
							?.Effect)
				) {
					let e = [];
					0 <
						(e = this.Z9r?.Valid
							? ((t = this.o7r.CalcCastTargetPointWithEntity(
									this.Z9r,
								)).Subtraction(this.i7r.ActorLocationProxy, t),
								t.Normalize(),
								this.o7r.CastFreeState.GetCastPath(t))
							: ((t = this.Q7r()),
								this.o7r.CastFreeState.GetCastPath(
									Vector_1.Vector.Create(t.Vector()),
								))).length &&
						(this.p7r ||
							(LevelAimLineController_1.LevelAimLineController.PlayEffect() &&
								(this.p7r = !0)),
						LevelAimLineController_1.LevelAimLineController.UpdatePoints(e, 1));
				}
				Vector_1.Vector.Distance(
					this.i7r.ActorLocationProxy,
					Vector_1.Vector.Create(this.o7r.MovementTargetLocation),
				) < ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance
					? this.o7r.IsHoldingUsePhysics
						? this.r7r.SetTargetLocationAndRotation(
								this.o7r.MovementTargetLocation,
								this.o7r.MovementTargetRotation,
							)
						: this.i7r.SetActorLocationAndRotation(
								this.o7r.MovementTargetLocation,
								this.o7r.MovementTargetRotation,
								"TickHolding",
								!1,
							)
					: (this.StopManipualte(), this.Reset());
			}
		}
		V7r(t) {
			(this.a7r += t),
				this.o7r.CurrentState.Tick(0.001 * t),
				this.a7r > ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime &&
					this.Cast();
		}
		StopManipualte() {
			var t = this.Entity.GetComponent(33);
			t.EndSkill(CharacterManipulateComponent_1.SkillId, "StopManipualte"),
				t.EndSkill(
					CharacterManipulateComponent_1.HoldingSkillId,
					"StopManipualte",
				),
				t.EndSkill(
					CharacterManipulateComponent_1.CastSkillId,
					"StopManipualte",
				),
				t.EndSkill(
					CharacterManipulateComponent_1.CancelSkillId,
					"StopManipualte",
				),
				this.A7r(1193763416);
		}
		GetHoldingActor() {
			return this.i7r.Owner;
		}
		GetHoldingEntity() {
			return this.t7r;
		}
		SetDataFromOldRole(t) {
			var e = t.Entity.GetComponent(55);
			3 === e.ac &&
				((t.Entity.GetComponent(33).SkillTarget = void 0),
				(this.Entity.GetComponent(33).SkillTarget = void 0)),
				e.Reset(),
				(this._7r = e._7r),
				this.StopManipualte(),
				this.A7r(1193763416);
		}
		R7r(t) {
			this.Xte.HasTag(t) || this.Xte.AddTag(t);
		}
		A7r(t) {
			this.Xte.HasTag(t) && this.Xte.RemoveTag(t);
		}
		ActiveHandFX(t, e = 0) {
			var r = t.GetComponent(177);
			r
				? (r.AddTag(1408918695), (this.v7r = r), (this.f7r = !0))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Character", 32, "被控物目标找不到TagComp", [
						"Entity",
						t,
					]);
		}
		DeactiveHandFx() {
			this.v7r &&
				(this.v7r.RemoveTag(1408918695), (this.v7r = void 0), (this.f7r = !1));
		}
		W7r() {
			var t,
				e = this.Z9r ?? this.t7r;
			e?.Valid &&
				((e = e.GetComponent(0)?.GetCreatureDataId()),
				((t = Protocol_1.Aki.Protocol.y1s.create()).rkn =
					MathUtils_1.MathUtils.NumberToLong(e)),
				(t.W9n = !1),
				Net_1.Net.Call(19086, t, (t) => {}));
		}
		AddOrRemoveManipulateAirTag(t) {
			let e = 0;
			(e = 3 === this.ac ? -1976579620 : -1178928415),
				t
					? this.Xte.HasTag(e) || this.Xte.AddTag(e)
					: (this.Xte.RemoveTag(-1976579620), this.Xte.RemoveTag(-1178928415));
		}
		tHr(t, e) {
			var r,
				i,
				o = t.GetComponent(3)?.Actor?.Mesh;
			let a;
			for ([r, i] of t.GetComponent(58).GroupMapByBone)
				if (i === e.toString()) {
					a = FNameUtil_1.FNameUtil.GetDynamicFName(r);
					break;
				}
			return (
				(t = o.GetAllSocketNames()),
				void 0 !== a && -1 !== t.FindIndex(a)
					? [o.GetSocketTransform(a, 0), a]
					: [void 0, void 0]
			);
		}
		oHr(t, e) {
			var r,
				i,
				o,
				a = new Array();
			for (const n of e.Parts)
				n.Active &&
					(([i, r] = this.tHr(t, n.BoneName)), i) &&
					((o = this.nXt.ActorLocationProxy),
					(i = Vector_1.Vector.Create(i.GetLocation())),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, o),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, i),
					(this.uoe.ProfileName = MONSTER_PART_CHECK_PRESET_NAME),
					(TraceElementCommon_1.TraceElementCommon.LineTrace(
						this.uoe,
						PROFILE_KEY,
					) &&
						this.uoe.HitResult.bBlockingHit &&
						((o =
							!this.uoe.HitResult.Components.Get(
								0,
							).AttachSocketName.op_Equality(r)),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Temp",
								32,
								"realBoneName",
								["realBoneName", r.toString()],
								["beBlock", o],
							),
						o)) ||
						a.push(n));
			return 0 < a.length ? a : void 0;
		}
		ExtraAction() {
			var t;
			3 === this.ac &&
				(this.t7r.Valid || this.o7r.Valid) &&
				(t = this.t7r.GetComponent(122))?.Valid &&
				(this.o7r?.TryRemoveTagById(-1354651119),
				t.RotateSelf(),
				this.o7r?.TryAddTagById(-1354651119));
		}
		GetIsCharRotateWithCameraWhenManipulate() {
			return 2 !== this.ac && 3 !== this.ac
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							32,
							"[Manipulate.GetIsCharRotateWithCameraWhenManipulate] 当前不是控物中",
						),
					!1)
				: this.o7r.ManipulateBaseConfig.角色是否随相机旋转;
		}
		ChangeToProjectileState() {
			return !(
				3 !== this.ac ||
				this.o7r.IsProjectileAimMode ||
				!this.o7r.ManipulateBaseConfig.抛物瞄准模式开关 ||
				((this.o7r.IsProjectileAimMode = !0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ManipulateEndLockCastTarget,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
					!1,
					void 0,
					!0,
				),
				0)
			);
		}
		ChangeToNormalState() {
			return !(
				3 !== this.ac ||
				!this.o7r.IsProjectileAimMode ||
				!this.o7r.ManipulateBaseConfig.抛物瞄准模式开关 ||
				((this.o7r.IsProjectileAimMode = !1),
				this.Z9r?.Valid &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ManipulateStartLockCastTarget,
						this.Z9r,
						this.C7r,
					),
				0)
			);
		}
	});
(CharacterManipulateComponent.G7r = !1),
	(CharacterManipulateComponent.SkillId = 210003),
	(CharacterManipulateComponent.CastSkillId = 210005),
	(CharacterManipulateComponent.CancelSkillId = 210006),
	(CharacterManipulateComponent.HoldingSkillId = 210007),
	(CharacterManipulateComponent = CharacterManipulateComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(55)],
			CharacterManipulateComponent,
		)),
	(exports.CharacterManipulateComponent = CharacterManipulateComponent);

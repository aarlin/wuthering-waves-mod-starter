"use strict";
var SceneItemLevitateMagnetComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, o) {
			var r,
				i = arguments.length,
				a =
					i < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, n, o);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(r = e[s]) &&
						(a = (i < 3 ? r(a) : 3 < i ? r(t, n, a) : r(t, n)) || a);
			return 3 < i && a && Object.defineProperty(t, n, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemLevitateMagnetComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
	SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent"),
	COS_45 = Math.cos((45 * Math.PI) / 180);
let SceneItemLevitateMagnetComponent =
	(SceneItemLevitateMagnetComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Config = void 0),
				(this.Hte = void 0),
				(this.Gce = void 0),
				(this.C1n = void 0),
				(this.hpn = void 0),
				(this.Lie = void 0),
				(this.lpn = void 0),
				(this.Uxr = -1),
				(this.bMr = void 0),
				(this._pn = void 0),
				(this.Hme = (0, puerts_1.$ref)(void 0)),
				(this.upn = 0),
				(this.cpn = void 0),
				(this.Frr = Vector_1.Vector.Create()),
				(this.pIn = (e) => {
					e.Attacker.Id ===
						Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.Id &&
						LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
							this._pn,
						);
				}),
				(this.M1n = (e) => {
					if (!this.Gce.IsMoving && this.Hte?.IsAutonomousProxy) {
						if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
							switch (this._pn) {
								case 2:
									return;
								case 0:
									var t =
										ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
											e.Attacker.Id,
											{ ParamType: 1 },
										);
									if (t && !t.IsMyRole()) return;
									if (e.Attacker.GetComponent(1).IsAutonomousProxy) break;
									return;
							}
						var n,
							o,
							r = e.Attacker.GetComponent(1).ActorLocationProxy,
							i = Vector_1.Vector.Create();
						this.Hte.ActorLocationProxy.Subtraction(r, i),
							i.Normalize(),
							this.hpn?.Valid &&
								(([r, n, o] = this.hpn.GetNextMoveTargetOnHit(i)), r) &&
								((r =
									Vector_1.Vector.Dist2D(n, this.Hte.ActorLocationProxy) /
									this.Config.MoveSpeed),
								this.Gce.AddMoveTarget(
									new SceneItemMoveComponent_1.MoveTarget(n, r),
								),
								(this.lpn = o),
								this.Enable(this.Uxr, "SceneItemLevitateMagnetComponent.OnHit"),
								this.hpn.RemoveMagnetTipsTag(),
								this.Lie.RemoveTag(-1063846162),
								this.mpn(i));
					}
				}),
				(this.gIe = (e, t) => {
					-1 < e.indexOf(-709838471) &&
						(EventSystem_1.EventSystem.RemoveWithTarget(
							this,
							EventDefine_1.EEventName.OnSceneItemHitByHitData,
							this.M1n,
						),
						EventSystem_1.EventSystem.RemoveWithTarget(
							this.Entity,
							EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
							this.pIn,
						));
				}),
				(this.dpn = () => {
					(this.bMr = UE.NewObject(UE.TraceBoxElement.StaticClass())),
						(this.bMr.WorldContextObject = this.Hte.Owner),
						(this.bMr.bIsSingle = !0),
						(this.bMr.bIgnoreSelf = !0),
						this.bMr.AddObjectTypeQuery(
							QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
						),
						this.bMr.AddObjectTypeQuery(
							QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
						),
						this.bMr.AddObjectTypeQuery(
							QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
						),
						this.bMr.AddObjectTypeQuery(
							QueryTypeDefine_1.KuroObjectTypeQuery.Destructible,
						),
						(this.bMr.DrawTime = 0.5),
						(this.cpn =
							SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
								this.Hte.GetSceneInteractionLevelHandleId(),
							));
					var e =
						SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
							this.Hte.GetSceneInteractionLevelHandleId(),
						);
					for (let t = 0; t < e.Num(); t++)
						this.bMr.ActorsToIgnore.Add(e.Get(t));
					this.upn =
						this.cpn.K2_GetActorLocation().Z - this.Hte.ActorLocationProxy.Z;
					var t = Vector_1.Vector.Create();
					this.Hte?.ActorUpProxy.Multiply(this.upn, t),
						(this.Frr = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy)),
						this.Frr.AdditionEqual(t),
						(t = this.Hte.ActorRotation);
					this.Hte.SetActorRotation(Rotator_1.Rotator.ZeroRotator),
						this.cpn.GetActorBounds(!1, void 0, this.Hme),
						TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
							this.bMr,
							(0, puerts_1.$unref)(this.Hme),
						),
						TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							this.bMr,
							this.Frr,
						),
						TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
							this.bMr,
							t,
						),
						this.Hte.SetActorRotation(t);
				});
		}
		OnInitData(e) {
			return (
				(e = e.GetParam(SceneItemLevitateMagnetComponent_1)[0]),
				(this.Config = e),
				(e = this.Entity.GetComponent(0).GetBaseInfo()),
				(this._pn = e?.OnlineInteractType),
				!0
			);
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(182)),
				(this.Gce = this.Entity.GetComponent(113)),
				(this.C1n = this.Entity.GetComponent(138)),
				this.C1n.RegisterComponent(this),
				(this.hpn = this.Entity.GetComponent(122)),
				(this.Lie = this.Entity.GetComponent(177)),
				this.Lie.AddTag(-1063846162),
				this.Lie.ContainsTag(
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-709838471),
				) ||
					(EventSystem_1.EventSystem.AddWithTarget(
						this,
						EventDefine_1.EEventName.OnSceneItemHitByHitData,
						this.M1n,
					),
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
						this.pIn,
					)),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.gIe,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.dpn,
				),
				(this.Uxr = this.Disable("[SceneItemHitMoveComp]初始化关闭Tick")),
				!0
			);
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.HasWithTarget(
					this,
					EventDefine_1.EEventName.OnSceneItemHitByHitData,
					this.M1n,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this,
						EventDefine_1.EEventName.OnSceneItemHitByHitData,
						this.M1n,
					),
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
					this.pIn,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
						this.pIn,
					),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.gIe,
				),
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.dpn,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
						this.dpn,
					),
				!0
			);
		}
		OnTick(e) {
			this.Gce.IsMoving ||
				((this.Uxr = this.Disable("[SceneItemHitMoveComp]运动结束关闭Tick")),
				this.hpn?.Valid && this.hpn.OnMove(this.lpn),
				this.Cpn(),
				this.Lie.AddTag(-1063846162));
		}
		mpn(e) {
			var t = Vector_1.Vector.Create(e),
				n = Vector_1.Vector.Create(this.Hte.ActorUpProxy),
				o = (n.Normalize(), Vector_1.Vector.Create());
			const r = e.DotProduct(n);
			n.Multiply(r, o),
				t.SubtractionEqual(o),
				t.Normalize(),
				(e = Vector_1.Vector.Create(0, 0, 0)),
				this.Hte.ActorQuatProxy.RotateVector(
					Vector_1.Vector.BackwardVectorProxy,
					e,
				),
				(n = Vector_1.Vector.Create(0, 0, 0)),
				this.Hte.ActorQuatProxy.RotateVector(
					Vector_1.Vector.LeftVectorProxy,
					n,
				),
				(o = [
					{ Direction: this.Hte.ActorForwardProxy, TagId: 503743627 },
					{ Direction: this.Hte.ActorRightProxy, TagId: -1945582411 },
					{ Direction: e, TagId: 1594082526 },
					{ Direction: n, TagId: 1996023206 },
				]);
			for (const e of o) {
				if (MathUtils_1.MathUtils.DotProduct(t, e.Direction) > COS_45)
					return void this.Lie.AddTag(e.TagId);
			}
		}
		Cpn() {
			this.Lie.RemoveTag(503743627),
				this.Lie.RemoveTag(1594082526),
				this.Lie.RemoveTag(1996023206),
				this.Lie.RemoveTag(-1945582411);
		}
		UpdateBoxTrace(e, t) {
			var n;
			this.bMr &&
				((n =
					SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
						this.Hte.GetSceneInteractionLevelHandleId(),
					)),
				(e = Vector_1.Vector.Create(e.GetBlockLocationByIndex(t))),
				(t = Vector_1.Vector.Create()),
				this.Hte?.ActorUpProxy.Multiply(this.upn, t),
				e?.AdditionEqual(t),
				(t = Rotator_1.Rotator.Create(this.Hte.ActorRotation)),
				this.Hte.SetActorRotation(Rotator_1.Rotator.ZeroRotator),
				n.GetActorBounds(!1, void 0, this.Hme),
				TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
					this.bMr,
					(0, puerts_1.$unref)(this.Hme),
				),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bMr, e),
				TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(this.bMr, t),
				this.Hte.SetActorRotation(t.ToUeRotator()),
				(this.Frr = Vector_1.Vector.Create(this.cpn.K2_GetActorLocation())));
		}
		StartBoxTrace(e) {
			if (!this.bMr) return !1;
			SceneItemLevitateMagnetComponent_1.TraceDebug &&
				this.bMr.SetDrawDebugTrace(2);
			var t,
				n = Vector_1.Vector.Create(this.Frr),
				o =
					((e =
						((e = Vector_1.Vector.Create(e)).SubtractionEqual(n),
						Vector_1.Vector.Create(e))),
					(t = Vector_1.Vector.Create(this.Hte.ActorUpProxy)).Normalize(),
					Vector_1.Vector.Create()),
				r = e.DotProduct(t);
			return (
				(t =
					(t.Multiply(r, o),
					e.SubtractionEqual(o),
					Vector_1.Vector.Create(n))).AdditionEqual(e),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bMr, t),
				TraceElementCommon_1.TraceElementCommon.BoxTrace(
					this.bMr,
					"[SceneItemLevitateMagnetComponent.StartBoxTrace]",
				)
			);
		}
	});
(SceneItemLevitateMagnetComponent.TraceDebug = !1),
	(SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(139)],
			SceneItemLevitateMagnetComponent,
		)),
	(exports.SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent);

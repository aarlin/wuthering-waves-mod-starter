"use strict";
var SceneItemResetPositionComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, o) {
			var i,
				r = arguments.length,
				s =
					r < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, n, o);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(i = t[a]) &&
						(s = (r < 3 ? i(s) : 3 < r ? i(e, n, s) : i(e, n)) || s);
			return 3 < r && s && Object.defineProperty(e, n, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemResetPositionComponent = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
	ActorUtils_1 = require("../../Utils/ActorUtils"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	TRIGGER_COMPONENT_TAG = new UE.FName("TriggerComponent");
let SceneItemResetPositionComponent =
	(SceneItemResetPositionComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.OMn = void 0),
				(this.Wen = void 0),
				(this.wS = void 0),
				(this.kMn = void 0),
				(this.Lo = void 0),
				(this.FMn = void 0),
				(this.SIe = void 0),
				(this.VMn = !1),
				(this.OnRemoveEntity = (t, e) => {
					(e = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
						this.SIe.GetPbDataId() === e
							? (this.VMn = !0)
							: this.wS.includes(e) && this.FMn.push(e);
				}),
				(this.GUe = (t, e, n) => {
					e = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
					this.FMn.includes(e) &&
						((e = this.FMn.indexOf(e)), this.FMn.splice(e, 1));
				}),
				(this.Itn = (t, e) => {
					var n;
					this.VMn ||
						((e = this.Ntn(e))?.Valid &&
							this.wS &&
							((n = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
							this.wS.includes(n)) &&
							!this.FMn.includes(n) &&
							LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
								e,
								void 0,
								this.Entity.GetComponent(0).GetCreatureDataId(),
								!0,
							));
				}),
				(this.Etn = (t, e, n, o) => {
					var i;
					this.VMn ||
						((e = this.Ntn(e))?.Valid &&
							this.wS &&
							((i = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
							this.wS.includes(i)) &&
							!this.FMn.includes(i) &&
							LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(
								e,
								void 0,
								this.Entity.GetComponent(0).GetCreatureDataId(),
								!0,
							));
				});
		}
		OnInitData(t) {
			return (
				(t = t.GetParam(SceneItemResetPositionComponent_1)[0]),
				(this.wS = t.EntityIds),
				(this.Lo = t),
				(this.FMn = []),
				!0
			);
		}
		OnStart() {
			var t;
			if (
				("Box" ===
				(t = (t =
					((t = this.Entity.GetComponent(1)) && (this.OMn = t.Owner),
					(this.SIe = this.Entity.GetComponent(0)),
					(this.kMn = this.SIe.GetTransform()),
					this.Lo)).Range).Type
					? this.Utn(t)
					: "Sphere" === t.Type
						? this.Ptn(t)
						: "Volume" === t.Type && this.wtn(t),
				!this.OMn)
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							30,
							"[SceneItemResetPositionComponent] TriggerItem创建失败",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
						),
					!1
				);
			if ("Volume" === t.Type) this.OMn.OnActorEndOverlap.Add(this.Itn);
			else {
				if (!this.Wen)
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneGameplay",
								30,
								"[SceneItemResetPositionComponent] TriggerComponent创建失败",
								["CreatureDataId", this.SIe.GetCreatureDataId()],
								["ConfigId", this.SIe.GetPbDataId()],
							),
						!1
					);
				this.Wen.OnComponentEndOverlap.Add(this.Etn);
			}
			return this.mEe(), !0;
		}
		OnClear() {
			return this.dEe(), !0;
		}
		mEe() {
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddEntity,
				this.GUe,
			),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.RemoveEntity,
					this.OnRemoveEntity,
				);
		}
		dEe() {
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddEntity,
				this.GUe,
			),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.RemoveEntity,
					this.OnRemoveEntity,
				);
		}
		Utn(t) {
			var e, n;
			this.OMn ||
				(this.OMn = ActorSystem_1.ActorSystem.Get(
					UE.Actor.StaticClass(),
					this.kMn,
				)),
				(this.Wen = this.OMn?.AddComponentByClass(
					UE.BoxComponent.StaticClass(),
					!1,
					this.kMn,
					!1,
				)),
				this.Wen &&
					(this.Wen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
					this.Wen?.SetBoxExtent(
						new UE.Vector(t.Size.X, t.Size.Y, t.Size.Z),
						!0,
					),
					(n = Vector_1.Vector.Create(this.kMn.GetLocation())),
					(e = Vector_1.Vector.Create(t.Center.X, t.Center.Y, t.Center.Z)),
					n.AdditionEqual(e),
					this.Wen.K2_SetWorldLocation(n.ToUeVector(), !1, void 0, !1),
					t.Rotator) &&
					((e = Rotator_1.Rotator.Create(this.kMn.GetRotation().Rotator())),
					(n = Rotator_1.Rotator.Create(t.Rotator.Y, t.Rotator.Z, t.Rotator.X)),
					e.AdditionEqual(n),
					this.Wen.K2_SetRelativeRotation(e.ToUeRotator(), !1, void 0, !1));
		}
		Ptn(t) {
			var e;
			this.OMn ||
				(this.OMn = ActorSystem_1.ActorSystem.Get(
					UE.Actor.StaticClass(),
					this.kMn,
				)),
				(this.Wen = this.OMn?.AddComponentByClass(
					UE.SphereComponent.StaticClass(),
					!1,
					this.kMn,
					!1,
				)),
				this.Wen &&
					(this.Wen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
					this.Wen?.SetSphereRadius(t.Radius, !0),
					(e = Vector_1.Vector.Create(this.kMn.GetLocation())),
					(t = Vector_1.Vector.Create(t.Center.X, t.Center.Y, t.Center.Z)),
					e.AdditionEqual(t),
					this.Wen.K2_SetWorldLocation(e.ToUeVector(), !1, void 0, !1));
		}
		wtn(t) {
			(t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
				GlobalData_1.GlobalData.World,
				UE.KuroTriggerVolumeManager.StaticClass(),
			).GetKuroTriggerVolume(
				FNameUtil_1.FNameUtil.GetDynamicFName(t.VolumeKey),
			)) && (this.OMn = t);
		}
		Ntn(t) {
			if (
				UE.KuroStaticLibrary.IsImplementInterface(
					t.GetClass(),
					UE.BPI_CreatureInterface_C.StaticClass(),
				)
			)
				return ActorUtils_1.ActorUtils.GetEntityByActor(t);
		}
	});
(SceneItemResetPositionComponent = SceneItemResetPositionComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(148)],
		SceneItemResetPositionComponent,
	)),
	(exports.SceneItemResetPositionComponent = SceneItemResetPositionComponent);

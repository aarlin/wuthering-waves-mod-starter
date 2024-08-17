"use strict";
var SceneItemPortalComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, o) {
			var r,
				a = arguments.length,
				i =
					a < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				i = Reflect.decorate(t, e, n, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(r = t[s]) &&
						(i = (a < 3 ? r(i) : 3 < a ? r(e, n, i) : r(e, n)) || i);
			return 3 < a && i && Object.defineProperty(e, n, i), i;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemPortalComponent = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PortalController_1 = require("../../Controller/PortalController"),
	INVALID_ENTITY = 0;
let SceneItemPortalComponent = (SceneItemPortalComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.D1n = "A"),
			(this.R1n = 0),
			(this.Hte = void 0),
			(this.PortalCapture = void 0),
			(this.wDe = 0),
			(this.A1n = (t, e, n) => {
				var o;
				e?.Valid &&
					(o = e.Entity.GetComponent(0)?.GetPbDataId()) &&
					this.R1n === o &&
					this.PortalCapture?.IsValid() &&
					((o = e.Entity.GetComponent(193)) &&
						o.PortalCapture &&
						(this.PortalCapture.SetPair(o.PortalCapture), "A" === this.D1n) &&
						PortalController_1.PortalController.RegisterPair(
							this.wDe,
							this.PortalCapture.Plane.K2_GetComponentToWorld(),
							o.PortalCapture.Plane.K2_GetComponentToWorld(),
							this.Hte.Owner,
							o.Hte.Owner,
						),
					EventSystem_1.EventSystem.Has(
						EventDefine_1.EEventName.RemoveEntity,
						this.U1n,
					) ||
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.RemoveEntity,
							this.U1n,
						));
			}),
			(this.U1n = (t, e) => {
				e?.Valid &&
					(e = e.Entity.GetComponent(0)?.GetPbDataId()) &&
					this.R1n === e &&
					(EventSystem_1.EventSystem.Has(
						EventDefine_1.EEventName.AddEntity,
						this.A1n,
					) ||
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.AddEntity,
							this.A1n,
						),
					this.PortalCapture?.IsValid()) &&
					(this.PortalCapture.SetPair(void 0), "A" === this.D1n) &&
					PortalController_1.PortalController.UnRegisterPair(this.wDe);
			}),
			(this.P1n = (t) => {
				var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
				if (e?.Valid) {
					var n = e.Entity.GetComponent(3);
					CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
						n.Actor.K2_GetActorRotation(),
					),
						CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(),
						CameraController_1.CameraController.FightCamera.LogicComponent.ResetInitialCameraRotation(),
						e.Entity.GetComponent(185).HasTag(-1371021686) &&
							e.Entity.GetComponent(33).StopGroup1Skill("Portal Stop skill");
					const o = e.Entity.GetComponent(161);
					t &&
						o &&
						TimerSystem_1.TimerSystem.Delay(() => {
							o && o.CharacterMovement && (o.CharacterMovement.Velocity = t);
						}, 100);
				} else
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Teleport", 7, "传送门:失败,找不到当前玩家角色");
			});
	}
	OnInitData(t) {
		var e = t.GetParam(SceneItemPortalComponent_1)[0];
		switch (e.Config.Type) {
			case "Dynamic":
				break;
			case "Static":
				this.R1n = e.Config.LinkPortalEntityId;
		}
		return (
			(this.D1n = e.Config.PortalModel),
			t.EntityData && (this.wDe = t.EntityData?.R5n),
			!0
		);
	}
	OnStart() {
		return (this.Hte = this.Entity.GetComponent(182)), !0;
	}
	OnActivate() {
		var t;
		return (
			this.Hte?.Valid &&
				((this.PortalCapture = ActorSystem_1.ActorSystem.Spawn(
					UE.BP_KuroPortalCapture_C.StaticClass(),
					this.Hte.ActorTransform,
					this.Hte.Owner,
				)),
				this.PortalCapture?.IsValid()) &&
				(this.PortalCapture.SetPbDataId(this.wDe),
				this.PortalCapture.K2_AttachToActor(
					this.Hte.Owner,
					void 0,
					1,
					1,
					1,
					!1,
				),
				this.PortalCapture.RoleTeleport.Add(this.P1n),
				(t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
					this.R1n,
				))?.IsInit
					? ((t = t.Entity.GetComponent(193)) &&
							t.PortalCapture &&
							(this.PortalCapture.SetPair(t.PortalCapture), "A" === this.D1n) &&
							PortalController_1.PortalController.RegisterPair(
								this.wDe,
								this.PortalCapture.Plane.K2_GetComponentToWorld(),
								t.PortalCapture.Plane.K2_GetComponentToWorld(),
								this.Hte.Owner,
								t.Hte.Owner,
							),
						EventSystem_1.EventSystem.Has(
							EventDefine_1.EEventName.RemoveEntity,
							this.U1n,
						) ||
							EventSystem_1.EventSystem.Add(
								EventDefine_1.EEventName.RemoveEntity,
								this.U1n,
							))
					: EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.AddEntity,
							this.A1n,
						)),
			!0
		);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.RemoveEntity,
				this.U1n,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.RemoveEntity,
					this.U1n,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.AddEntity,
				this.A1n,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.AddEntity,
					this.A1n,
				),
			this.PortalCapture?.IsValid() &&
				("A" === this.D1n &&
					PortalController_1.PortalController.UnRegisterPair(this.wDe),
				this.PortalCapture.SetPair(void 0),
				this.PortalCapture.K2_DetachFromActor(),
				this.PortalCapture.RoleTeleport.Clear(),
				ActorSystem_1.ActorSystem.Put(this.PortalCapture)),
			!0
		);
	}
});
(SceneItemPortalComponent = SceneItemPortalComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(193)],
		SceneItemPortalComponent,
	)),
	(exports.SceneItemPortalComponent = SceneItemPortalComponent);

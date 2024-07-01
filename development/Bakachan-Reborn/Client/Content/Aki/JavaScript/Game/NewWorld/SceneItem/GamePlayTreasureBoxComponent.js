"use strict";
var SceneItemTreasureBoxComponent_1,
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
	(exports.SceneItemTreasureBoxComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
let SceneItemTreasureBoxComponent =
	(SceneItemTreasureBoxComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.man = void 0),
				(this.Pcn = void 0),
				(this.xcn = void 0),
				(this.B1n = () => {
					this.wcn(),
						this.Entity.CheckGetComponent(117).IsInState(2) && this.Bcn();
				}),
				(this.bcn = (e) => {
					this.wcn();
				}),
				(this.qcn = (e) => {
					this.wcn();
				});
		}
		OnInitData(e) {
			return (
				(e = e.GetParam(SceneItemTreasureBoxComponent_1)[0]),
				(this.Pcn = e?.TypeId),
				!0
			);
		}
		OnStart() {
			var e = this.Entity.GetComponent(0),
				t = e?.GetBaseInfo();
			return t
				? ((this.man = t.OnlineInteractType ?? 2), !0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							7,
							"[SceneItemTreasureBoxComponent.OnStart] 宝箱组件初始化失败,没有基础信息配置(baseInfo)",
							["CreatureGenID:", e.GetOwnerId()],
							["PbDataId:", e.GetPbDataId()],
						),
					!1);
		}
		OnActivate() {
			return (
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.B1n,
				),
				2 === this.Pcn &&
					(EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemLockPropChange,
						this.qcn,
					),
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStatePreChange,
						this.bcn,
					)),
				(this.xcn = void 0),
				this.Entity.CheckGetComponent(117).IsInState(0) || this.B1n(),
				!0
			);
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.B1n,
				),
				2 === this.Pcn &&
					(EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemLockPropChange,
						this.qcn,
					),
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStatePreChange,
						this.bcn,
					)),
				!0
			);
		}
		wcn() {
			var e = this.Entity.CheckGetComponent(117),
				t = this.Entity.CheckGetComponent(177);
			let n, o;
			switch (e.State) {
				case 1:
					n = this.Entity.CheckGetComponent(115).IsLocked
						? ((o = -1107341031), -1491083225)
						: ((o = -1491083225), -1107341031);
					break;
				case 2:
					(o = -1107341031), (n = -1526657280);
			}
			void 0 !== n &&
				this.xcn !== n &&
				(t.NotifyLock++,
				void 0 !== o && this.xcn === o && t.RemoveTag(o),
				(this.xcn = n),
				t.AddTag(n),
				t.NotifyLock--);
		}
		Bcn() {
			ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
				ModelManager_1.ModelManager.CreatureModel.GetWorldOwner() &&
				LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
					this.man,
				) &&
				LevelGamePlayController_1.LevelGamePlayController.GetRewardTreasureBoxRequest(
					this.Entity.Id,
				);
		}
		CloseAllCollisions() {
			var e = this.Entity.GetComponent(182),
				t =
					(SceneItemTreasureBoxComponent_1.Gcn(e.Owner),
					SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
						e.GetSceneInteractionLevelHandleId(),
					));
			if (t)
				for (let e = 0, o = t.Num(); e < o; e++) {
					var n = t.Get(e);
					SceneItemTreasureBoxComponent_1.Gcn(n);
				}
		}
		static Gcn(e) {
			var t = e.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
			if (t)
				for (let e = 0, o = t.Num(); e < o; e++) {
					var n = t.Get(e);
					(n.CanCharacterStepUpOn = 0),
						n.SetCollisionResponseToAllChannels(0),
						n.SetCollisionResponseToChannel(
							QueryTypeDefine_1.KuroCollisionChannel.Pawn,
							2,
						),
						n.SetCollisionResponseToChannel(
							QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
							2,
						),
						n.SetCollisionResponseToChannel(
							QueryTypeDefine_1.KuroCollisionChannel.PawnMonster,
							2,
						);
				}
		}
	});
(SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(125)],
		SceneItemTreasureBoxComponent,
	)),
	(exports.SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent);

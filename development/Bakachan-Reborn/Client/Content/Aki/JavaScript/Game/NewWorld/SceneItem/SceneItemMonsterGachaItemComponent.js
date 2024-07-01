"use strict";
var SceneItemMonsterGachaItemComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, o) {
			var r,
				a = arguments.length,
				c =
					a < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				c = Reflect.decorate(e, t, n, o);
			else
				for (var i = e.length - 1; 0 <= i; i--)
					(r = e[i]) &&
						(c = (a < 3 ? r(c) : 3 < a ? r(t, n, c) : r(t, n)) || c);
			return 3 < a && c && Object.defineProperty(t, n, c), c;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemMonsterGachaItemComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
	ItemMaterialManager_1 = require("../../Render/Scene/Item/MaterialController/ItemMaterialManager"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
let SceneItemMonsterGachaItemComponent =
	(SceneItemMonsterGachaItemComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Lo = void 0),
				(this.Hte = void 0),
				(this.Qnn = () => {
					ResourceSystem_1.ResourceSystem.LoadAsync(
						this.Lo.MaterialDataPath,
						UE.ItemMaterialControllerActorData_C,
						(e) => {
							if (e) {
								var t =
									SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
										this.Hte.GetSceneInteractionLevelHandleId(),
									);
								for (let o = 0; o < t.Num(); o++) {
									var n = t.Get(o);
									ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
										n,
										e,
									);
								}
							}
						},
					);
				});
		}
		OnInitData(e) {
			return (
				(e = e.GetParam(SceneItemMonsterGachaItemComponent_1)[0]),
				(this.Lo = e),
				!0
			);
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(182)),
				EventSystem_1.EventSystem.OnceWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.Qnn,
				),
				!0
			);
		}
	});
(SceneItemMonsterGachaItemComponent = SceneItemMonsterGachaItemComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(141)],
		SceneItemMonsterGachaItemComponent,
	)),
	(exports.SceneItemMonsterGachaItemComponent =
		SceneItemMonsterGachaItemComponent);

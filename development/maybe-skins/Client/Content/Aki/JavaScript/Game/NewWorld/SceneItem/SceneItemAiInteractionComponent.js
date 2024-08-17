"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, i) {
		var r,
			o = arguments.length,
			s =
				o < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, i);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(r = e[a]) && (s = (o < 3 ? r(s) : 3 < o ? r(t, n, s) : r(t, n)) || s);
		return 3 < o && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemAiInteractionComponent = void 0);
const Time_1 = require("../../../Core/Common/Time"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	AiInteractionItemQueryManager_1 = require("./AiInteraction/AiInteractionItemQueryManager"),
	AI_USED_COLD_DOWN = 2e3;
let SceneItemAiInteractionComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.IsSearchByAi = void 0),
			(this.SearchEntity = void 0),
			(this.IsUsingByAi = void 0),
			(this.LastUsedTime = -2e3),
			(this.EnableHandler = void 0),
			(this.MoveComp = void 0),
			(this.OnEntityDeadEvent = void 0);
	}
	static get Dependencies() {
		return [182];
	}
	OnStart() {
		(this.LastUsedTime = -2e3),
			(this.IsUsingByAi = !1),
			this.Vmn(),
			(this.OnEntityDeadEvent = () => {
				this.OnEntityDead();
			});
		var e = this.Entity.GetComponent(0).GetVisible();
		return (
			(this.EnableHandler = e
				? -1
				: this.Entity.Disable(
						"[SceneItemAiInteractionComponent.OnStart] visible为false",
					)),
			(this.MoveComp = this.Entity.GetComponent(108)),
			AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().RegisterItem(
				this.Entity,
			),
			!0
		);
	}
	OnEnd() {
		return (
			AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().UnRegisterItem(
				this.Entity,
			),
			!0
		);
	}
	Vmn() {
		(this.IsSearchByAi = !1), (this.SearchEntity = void 0);
	}
	OnEntityDead() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.SearchEntity,
			EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
			this.OnEntityDeadEvent,
		),
			this.Vmn();
	}
	SetSearched(e) {
		this.IsSearchByAi ||
			((this.IsSearchByAi = !0),
			(this.SearchEntity = e),
			EventSystem_1.EventSystem.AddWithTarget(
				e,
				EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
				this.OnEntityDeadEvent,
			));
	}
	SetUnSearched() {
		this.IsSearchByAi && this.OnEntityDead();
	}
	OnLastUsed() {
		this.SetUnSearched(), (this.LastUsedTime = Time_1.Time.WorldTime);
	}
	CanBeUsed() {
		return this.MoveComp
			? !this.MoveComp.EnableMovement
			: Time_1.Time.WorldTime - this.LastUsedTime > 2e3;
	}
	HiddenItem(e) {
		return (
			e !== (-1 !== this.EnableHandler) &&
			(e
				? (this.EnableHandler = this.Entity.Disable(
						"[SceneItemAiInteractionComponent.HiddenItem] bHidden为true",
					))
				: (this.Entity.Enable(
						this.EnableHandler,
						"[SceneItemAiInteractionComponent.HiddenItem] bHidden为false",
					),
					(this.EnableHandler = -1)),
			!0)
		);
	}
	ItemAttachEntity(e) {}
	IsSearchByOther(e) {
		return !!this.IsSearchByAi && this.SearchEntity.Id !== e;
	}
};
(SceneItemAiInteractionComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(128)],
	SceneItemAiInteractionComponent,
)),
	(exports.SceneItemAiInteractionComponent = SceneItemAiInteractionComponent);

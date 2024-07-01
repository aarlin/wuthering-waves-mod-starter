"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, i) {
		var o,
			r = arguments.length,
			s =
				r < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, e, n, i);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(o = t[a]) && (s = (r < 3 ? o(s) : 3 < r ? o(e, n, s) : o(e, n)) || s);
		return 3 < r && s && Object.defineProperty(e, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DurabilityComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
let DurabilityComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.zht = void 0),
			(this.ac = void 0),
			(this.ect = void 0),
			(this.Bht = void 0),
			(this.DeadActions = void 0);
	}
	get IsDestroyed() {
		return 1 <= this.ac;
	}
	OnInit() {
		(this.zht = this.Entity.GetComponent(0)),
			(this.ac = 0),
			(this.ect = void 0);
		var t = this.zht.GetPbEntityInitData();
		t = (0, IComponent_1.getComponent)(t.ComponentsData, "DestructibleItem");
		return (
			t.DurabilityStateConfig?.NonDestructable ||
				(this.DeadActions = t.DestructionActions),
			this.Entity.GetComponent(106).SetLogicRange(
				ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
			),
			!0
		);
	}
	OnStart() {
		return (
			(this.Bht = (t) => {
				this.dnn();
			}),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneItemDurabilityChange,
				this.Bht,
			),
			this.dnn(),
			!0
		);
	}
	OnEnd() {
		return (
			void 0 !== this.Bht &&
				(EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemDurabilityChange,
					this.Bht,
				),
				(this.Bht = void 0)),
			(this.ac = void 0) !== this.ect &&
				TimerSystem_1.TimerSystem.Has(this.ect) &&
				TimerSystem_1.TimerSystem.Remove(this.ect),
			!(this.ect = void 0)
		);
	}
	dnn() {
		0 !== this.ac ||
			0 < this.zht.GetDurabilityValue() ||
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSceneItemDestroy,
				this.Entity,
			),
			(this.ac = 1));
	}
};
(DurabilityComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(90)],
	DurabilityComponent,
)),
	(exports.DurabilityComponent = DurabilityComponent);

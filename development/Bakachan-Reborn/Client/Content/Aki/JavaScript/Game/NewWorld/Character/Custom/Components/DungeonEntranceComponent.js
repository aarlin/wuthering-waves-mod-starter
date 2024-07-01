"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var i,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, o);
		else
			for (var E = e.length - 1; 0 <= E; E--)
				(i = e[E]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
		return 3 < r && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DungeonEntranceComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let DungeonEntranceComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Ben = void 0),
			(this.ben = void 0),
			(this.qen = (e, t) => {
				this.Nen();
			}),
			(this.Oen = (e) => {
				this.Nen(e);
			});
	}
	OnStart() {
		return (
			(this.Ben = this.Entity.GetComponent(117)),
			(this.ben = new Array()),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneItemStateChange,
				this.qen,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
				this.Oen,
			),
			this.Nen(),
			!0
		);
	}
	OnActivate() {
		return !0;
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneItemStateChange,
				this.qen,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
				this.Oen,
			),
			!(this.ben = void 0)
		);
	}
	RegisterRestoreCb(e) {
		this.ben.push(e);
	}
	Restore() {
		if (this.ben?.length) {
			for (const e of this.ben) e();
			this.ben.length = 0;
		}
	}
	Nen(e) {
		e
			? -3775711 === e && this.Ben.ChangePerformanceState(217251158, !1, !1)
			: 2 === this.Ben?.State &&
				this.Ben.ChangePerformanceState(217251158, !1, !1);
	}
};
(DungeonEntranceComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(72)],
	DungeonEntranceComponent,
)),
	(exports.DungeonEntranceComponent = DungeonEntranceComponent);

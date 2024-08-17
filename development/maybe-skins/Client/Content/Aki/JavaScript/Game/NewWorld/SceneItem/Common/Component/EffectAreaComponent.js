"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, r) {
		var o,
			i = arguments.length,
			s =
				i < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, n))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, r);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(o = e[a]) && (s = (i < 3 ? o(s) : 3 < i ? o(t, n, s) : o(t, n)) || s);
		return 3 < i && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectAreaComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks");
let EffectAreaComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.pln = !1),
			(this.vln = (e) => {
				(this.pln = e),
					LevelGeneralNetworks_1.LevelGeneralNetworks.RequestPlayerAccessEffectArea(
						this.Entity.Id,
						e,
					);
			});
	}
	OnInitData(e) {
		return !0;
	}
	OnStart() {
		return (
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
				this.vln,
			),
			!0
		);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
				this.vln,
			),
			this.pln && this.vln(!1),
			!0
		);
	}
};
(EffectAreaComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(195)],
	EffectAreaComponent,
)),
	(exports.EffectAreaComponent = EffectAreaComponent);

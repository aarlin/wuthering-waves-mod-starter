"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, i) {
		var o,
			r = arguments.length,
			m =
				r < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			m = Reflect.decorate(e, t, n, i);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(o = e[s]) && (m = (r < 3 ? o(m) : 3 < r ? o(t, n, m) : o(t, n)) || m);
		return 3 < r && m && Object.defineProperty(t, n, m), m;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemAdviceComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	REVERTIME = 3e3;
let SceneItemAdviceComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Xte = void 0),
			(this.z6e = void 0),
			(this.Fmn = () => {
				this.jm(),
					this.Xte.HasTag(-3775711) &&
						(this.Xte.ChangeLocalLevelTag(-1152559349, -3775711),
						EventSystem_1.EventSystem.EmitWithTarget(
							this.Entity,
							EventDefine_1.EEventName.OnSceneItemStateChange,
							-1152559349,
							!0,
						));
			});
	}
	OnActivate() {
		var e = this.Entity.GetComponent(178);
		if (
			e &&
			e.GetInteractController() &&
			(e = this.Entity.GetComponent(0)) &&
			(e = e.GetAdviceInfo())
		) {
			var t = this.Entity.GetComponent(102);
			if (t) {
				this.Xte = this.Entity.GetComponent(177);
				let n =
					ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceInteractText();
				(n = n.replace("{PlayerName}", e.GetPlayerName())), (t.PawnName = n);
			}
		}
	}
	DoInteract() {
		this.jm(),
			this.Xte.HasTag(-1152559349) &&
				(this.Xte.ChangeLocalLevelTag(-3775711, -1152559349),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					-3775711,
					!1,
				),
				this.jm(),
				(this.z6e = TimerSystem_1.TimerSystem.Delay(this.Fmn, 3e3)));
	}
	jm() {
		void 0 !== this.z6e &&
			(TimerSystem_1.TimerSystem.Remove(this.z6e), (this.z6e = void 0));
	}
	OnEnd() {
		return this.jm(), !0;
	}
};
(SceneItemAdviceComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(127)],
	SceneItemAdviceComponent,
)),
	(exports.SceneItemAdviceComponent = SceneItemAdviceComponent);

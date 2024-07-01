"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateCue = void 0);
const GameplayCueById_1 = require("../../../../Core/Define/ConfigQuery/GameplayCueById"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateCue extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments),
			(this.Vre = void 0),
			(this.Ine = !1),
			(this.Tne = void 0),
			(this.Lne = 0),
			(this.Dne = !1),
			(this.Rne = void 0);
	}
	OnInit(e) {
		(this.Ine = e.BindCue.HideOnLoading), (this.Vre = []);
		for (const t of e.BindCue.CueIds) this.Vre.push(BigInt(t));
		return !0;
	}
	OnActivate() {
		(this.Tne = []),
			(this.Lne = 0),
			(this.Dne = !0),
			this.Ine &&
				!this.Rne &&
				(this.Rne = this.Node.ActorComponent.DisableActor(
					"状态机加载特效或材质",
				));
		for (const t of this.Vre) {
			var e = GameplayCueById_1.configGameplayCueById.GetConfig(t);
			if (!e) return;
			(e = this.Node.GameplayCueComponent.CreateGameplayCue(e, {
				BeginCallback: () => {
					this.Une(t);
				},
			})) && this.Tne.push(e);
		}
	}
	OnDeactivate() {
		this.Ine &&
			this.Dne &&
			(this.Node.ActorComponent.EnableActor(this.Rne), (this.Rne = void 0));
		for (const e of this.Tne) e.Destroy();
		this.Tne.length = 0;
	}
	Une(e) {
		this.Node.Activated &&
			(this.Lne++, this.Ine) &&
			this.Lne >= this.Vre.length &&
			(this.Node.ActorComponent.EnableActor(this.Rne),
			(this.Rne = void 0),
			(this.Dne = !1));
	}
	OnClear() {
		if (this.Tne && 0 < this.Tne.length) {
			for (const e of this.Tne) e.Destroy();
			this.Tne.length = 0;
		}
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineStateCue = AiStateMachineStateCue;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateTag = void 0);
const CombatDebugController_1 = require("../../../Utils/CombatDebugController"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateTag extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments),
			(this.TagId = 0),
			(this.TagName = ""),
			(this.TagHandle = void 0);
	}
	OnInit(t) {
		return (this.TagId = t.BindTag.TagId), !0;
	}
	OnActivate(t) {
		this.TagHandle ||
			(this.TagHandle = this.Node.BuffComponent.AddTagWithReturnHandle([
				this.TagId,
			]));
	}
	OnDeactivate(t) {
		let e = !1;
		if (t && t.BindStates && 0 < t.BindStates?.length)
			for (const a of t.BindStates)
				a instanceof AiStateMachineStateTag &&
					a.TagId === this.TagId &&
					((a.TagHandle = this.TagHandle), (e = !0));
		this.TagHandle ||
			CombatDebugController_1.CombatDebugController.CombatError(
				"StateMachineNew",
				this.Node.Entity,
				"AiStateMachineStateTag移除Tag失败，TagHandle不存在",
				["node", this.Node.Name],
			),
			e || this.Node.BuffComponent.RemoveBuffByHandle(this.TagHandle),
			(this.TagHandle = void 0);
	}
	ToString(t, e = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, e);
	}
}
exports.AiStateMachineStateTag = AiStateMachineStateTag;

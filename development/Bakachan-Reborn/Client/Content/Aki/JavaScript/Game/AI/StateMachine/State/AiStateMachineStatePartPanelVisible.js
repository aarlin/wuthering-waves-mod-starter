"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStatePartPanelVisible = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStatePartPanelVisible extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments), (this.PartName = void 0), (this.Visible = !1);
	}
	OnInit(e) {
		return (
			(this.PartName = new UE.FName(e.BindPartPanelVisible.PartName)),
			(this.Visible = e.BindPartPanelVisible.Visible),
			!0
		);
	}
	OnActivate(e, t) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnSetPartStateVisible,
			this.Node.Entity.Id,
			this.PartName,
			this.Visible,
		);
	}
	OnDeactivate(e, t) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnSetPartStateVisible,
			this.Node.Entity.Id,
			this.PartName,
			!this.Visible,
		);
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineStatePartPanelVisible =
	AiStateMachineStatePartPanelVisible;

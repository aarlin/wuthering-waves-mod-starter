"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionSetHeadIconVisible = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetHeadIconVisible extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments),
			(this.JXi = () => {
				this.FinishExecute(!0);
			});
	}
	OnExecute() {
		var e = this.ActionInfo.Params;
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.UpdatePortraitVisible,
			e,
			this.JXi,
		);
	}
	OnInterruptExecute() {}
}
exports.FlowActionSetHeadIconVisible = FlowActionSetHeadIconVisible;

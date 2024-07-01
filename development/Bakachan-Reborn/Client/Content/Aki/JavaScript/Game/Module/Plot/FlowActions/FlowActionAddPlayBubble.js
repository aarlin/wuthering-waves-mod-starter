"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionAddPlayBubble = void 0);
const DynamicFlowController_1 = require("../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionAddPlayBubble extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var o = this.ActionInfo.Params;
		if (o && 0 !== o.EntityIds.length) {
			const e = o.EntityIds[0];
			((o = this.BTe(o)).Callback = () => {
				DynamicFlowController_1.DynamicFlowController.RemoveDynamicFlow(e);
			}),
				DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(o),
				this.FinishExecute(!0);
		}
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
	BTe(o) {
		var e = new DynamicFlowController_1.CharacterDynamicFlowData();
		return (e.BubbleData = o), (e.Type = 4), e;
	}
}
exports.FlowActionAddPlayBubble = FlowActionAddPlayBubble;

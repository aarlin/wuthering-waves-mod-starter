"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const GlobalData_1 = require("../../../../../GlobalData"),
	CharacterFlowComponent_1 = require("../../../../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent"),
	DynamicFlowController_1 = require("../../../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController"),
	TsAiController_1 = require("../../../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskPlayBubble extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.FlowListName = ""),
			(this.FlowId = 0),
			(this.StateId = 0),
			(this.IsInitTsVariables = !1),
			(this.TsFlowListName = ""),
			(this.TsFlowId = 0),
			(this.TsStateId = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsFlowListName = this.FlowListName),
			(this.TsFlowId = this.FlowId),
			(this.TsStateId = this.StateId));
	}
	ReceiveExecuteAI(t, e) {
		if ((this.InitTsVariables(), t instanceof TsAiController_1.default))
			if (this.TsFlowListName)
				if ((t = t.AiController.CharActorComp)) {
					var a = {
						FlowListName: this.TsFlowListName,
						FlowId: this.TsFlowId,
						StateId: this.TsStateId,
					};
					const e = t.CreatureData.GetPbDataId();
					((t = this.CreateCharacterFlowData(e, a)).Callback = () => {
						DynamicFlowController_1.DynamicFlowController.RemoveDynamicFlow(e);
					}),
						DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(t),
						this.FinishExecute(!0);
				} else this.FinishExecute(!1);
			else this.FinishExecute(!1);
		else this.FinishExecute(!1);
	}
	CreateCharacterFlowData(t, e) {
		var a = new DynamicFlowController_1.CharacterDynamicFlowData();
		t = {
			EntityIds: [t],
			EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
			LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
			Flow: e,
			WaitTime: 0,
			RedDot: !1,
		};
		return (a.BubbleData = t), a;
	}
}
exports.default = TsTaskPlayBubble;

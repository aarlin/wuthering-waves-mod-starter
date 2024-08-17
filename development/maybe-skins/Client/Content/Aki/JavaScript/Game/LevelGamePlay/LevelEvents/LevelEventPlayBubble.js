"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPlayBubble = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterFlowComponent_1 = require("../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent"),
	DynamicFlowController_1 = require("../../NewWorld/Character/Common/Component/Flow/DynamicFlowController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayBubble extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, l, o) {
		if (e) {
			const o = e.EntityId;
			((e = this.BTe(o, e.Flow)).Callback = () => {
				DynamicFlowController_1.DynamicFlowController.RemoveDynamicFlow(o);
			}),
				DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(e),
				6 === l?.Type &&
					ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
						l.TreeIncId,
					)?.AddDynamicFlowNpc(o),
				this.FinishExecute(!0);
		} else this.FinishExecute(!1);
	}
	BTe(e, l) {
		var o = new DynamicFlowController_1.CharacterDynamicFlowData();
		e = {
			EntityIds: [e],
			EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
			LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
			Flow: l,
			WaitTime: 0,
		};
		return (o.BubbleData = e), (o.Type = 2), o;
	}
}
exports.LevelEventPlayBubble = LevelEventPlayBubble;

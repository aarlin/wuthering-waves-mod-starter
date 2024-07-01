"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionTaskFinish = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTaskFinish extends AiStateMachineCondition_1.AiStateMachineCondition {
	OnInit(i) {
		return (this.HasTaskFinishCondition = !0);
	}
	OnEnter() {
		this.ResultSelf = this.Node.CurrentLeafNode.TaskFinish;
	}
	OnTick() {
		this.ResultSelf = this.Node.CurrentLeafNode.TaskFinish;
	}
	ToString(i, n = 0) {
		super.ToString(i, n), i.Append("节点任务完成\n");
	}
}
exports.AiStateMachineConditionTaskFinish = AiStateMachineConditionTaskFinish;

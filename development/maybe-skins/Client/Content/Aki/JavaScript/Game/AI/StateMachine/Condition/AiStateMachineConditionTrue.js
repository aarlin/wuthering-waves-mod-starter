"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionTrue = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTrue extends AiStateMachineCondition_1.AiStateMachineCondition {
	OnInit(e) {
		return (this.ResultSelf = !0);
	}
	ToString(e, i = 0) {
		super.ToString(e, i), e.Append("[True]");
	}
}
exports.AiStateMachineConditionTrue = AiStateMachineConditionTrue;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionLeaveFight = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionLeaveFight extends AiStateMachineCondition_1.AiStateMachineCondition {
	ToString(i, e = 0) {
		super.ToString(i, e), i.Append("离开战斗\n");
	}
}
exports.AiStateMachineConditionLeaveFight = AiStateMachineConditionLeaveFight;

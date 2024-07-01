"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionPartLife = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionPartLife extends AiStateMachineCondition_1.AiStateMachineCondition {
	OnInit(i) {
		return !0;
	}
	ToString(i, t = 0) {
		super.ToString(i, t), i.Append("[部位血量]");
	}
}
exports.AiStateMachineConditionPartLife = AiStateMachineConditionPartLife;

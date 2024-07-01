"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionBuffStack = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionBuffStack extends AiStateMachineCondition_1.AiStateMachineCondition {
	constructor() {
		super(...arguments),
			(this.BuffId = 0),
			(this.MinStack = 0),
			(this.MaxStack = 0);
	}
	OnInit(t) {
		return (
			(this.BuffId = t.CondBuffStack.BuffId),
			(this.MinStack = t.CondBuffStack.MinStack),
			(this.MaxStack = t.CondBuffStack.MaxStack),
			!0
		);
	}
	ToString(t, i = 0) {
		super.ToString(t, i),
			t.Append(
				`有检查Buff层数 [BuffId:${this.BuffId}] [Min:${this.MinStack}] [Max:${this.MaxStack}]\n`,
			);
	}
}
exports.AiStateMachineConditionBuffStack = AiStateMachineConditionBuffStack;

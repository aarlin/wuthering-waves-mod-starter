"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionHate = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionHate extends AiStateMachineCondition_1.AiStateMachineCondition {
	OnTick() {
		(this.ResultSelf = !!this.Node.AiController.AiHateList.GetCurrentTarget()),
			this.ResultSelf &&
				this.Node.SummonerAiController &&
				(this.ResultSelf =
					!!this.Node.SummonerAiController.AiHateList.GetCurrentTarget());
	}
	ToString(t, e = 0) {
		super.ToString(t, e), t.Append("有仇恨\n");
	}
}
exports.AiStateMachineConditionHate = AiStateMachineConditionHate;

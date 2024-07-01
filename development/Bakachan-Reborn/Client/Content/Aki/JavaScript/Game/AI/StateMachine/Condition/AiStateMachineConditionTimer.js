"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionTimer = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTimer extends AiStateMachineCondition_1.AiStateMachineCondition {
	constructor() {
		super(...arguments), (this.pne = -0), (this.vne = -0);
	}
	OnInit(i) {
		return (
			(this.pne = i.CondTimer.MinTime), (this.vne = i.CondTimer.MaxTime), !0
		);
	}
	ToString(i, e = 0) {
		super.ToString(i, e),
			i.Append(
				`延迟 [时间:${(this.pne / 1e3).toFixed(1)}-${(this.vne / 1e3).toFixed(1)}]\n`,
			);
	}
}
exports.AiStateMachineConditionTimer = AiStateMachineConditionTimer;

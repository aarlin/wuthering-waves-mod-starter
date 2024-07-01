"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionMontageTimeRemaining = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionMontageTimeRemaining extends AiStateMachineCondition_1.AiStateMachineCondition {
	constructor() {
		super(...arguments), (this.Ql = -0), (this.fne = void 0);
	}
	OnInit(i) {
		return (
			(this.HasTaskFinishCondition = !0),
			(this.Ql = 0.001 * i.CondMontageTimeRemaining.Time),
			102 !== this.Node.Task?.Type && 3 !== this.Node.Task?.Type
				? this.Node.Owner.PushErrorMessage(
						`初始化条件[动画剩余时间]失败，node[${this.Node.Name}|${this.Node.Uuid}], to:` +
							this.Transition.To,
					)
				: (this.fne = this.Node.Task),
			!0
		);
	}
	OnEnter() {
		this.fne?.HasResource
			? this.Node.TaskFinish
				? (this.ResultSelf = !0)
				: this.fne?.Playing &&
					(this.ResultSelf = this.fne.GetTimeRemaining() <= this.Ql)
			: (this.ResultSelf = !1);
	}
	OnTick() {
		this.fne?.HasResource
			? this.Node.TaskFinish
				? (this.ResultSelf = !0)
				: this.fne?.Playing &&
					(this.ResultSelf = this.fne.GetTimeRemaining() <= this.Ql)
			: (this.ResultSelf = !1);
	}
	OnExit() {
		this.ResultSelf = !1;
	}
	ToString(i, e = 0) {
		super.ToString(i, e), i.Append(`动画剩余时间小于 [${this.Ql.toFixed(1)}\n`);
	}
}
exports.AiStateMachineConditionMontageTimeRemaining =
	AiStateMachineConditionMontageTimeRemaining;

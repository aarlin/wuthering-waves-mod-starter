"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionTag = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTag extends AiStateMachineCondition_1.AiStateMachineCondition {
	constructor() {
		super(...arguments),
			(this.TagName = ""),
			(this.TagId = 0),
			(this.vJ = void 0),
			(this.lne = (t, i) => {
				this.ResultSelf = i;
			});
	}
	OnInit(t) {
		return (
			(this.TagId = t.CondTag.TagId),
			(this.TagName = t.CondTag.TagName),
			(this.vJ = this.Node.TagComponent.ListenForTagAddOrRemove(
				this.TagId,
				this.lne,
			)),
			(this.CheckForClient = !!t.IsClient),
			(this.ResultSelf = this.Node.TagComponent.HasTag(this.TagId)),
			!0
		);
	}
	OnEnter() {
		this.ResultSelf = this.Node.TagComponent.HasTag(this.TagId);
	}
	OnClear() {
		this.vJ.EndTask(), (this.vJ = void 0);
	}
	ToString(t, i = 0) {
		super.ToString(t, i), t.Append(`Tag[${this.TagName}]\n`);
	}
}
exports.AiStateMachineConditionTag = AiStateMachineConditionTag;

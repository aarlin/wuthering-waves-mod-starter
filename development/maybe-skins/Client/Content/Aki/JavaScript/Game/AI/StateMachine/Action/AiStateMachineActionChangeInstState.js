"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineActionChangeInstState = void 0);
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionChangeInstState extends AiStateMachineAction_1.AiStateMachineAction {
	constructor() {
		super(...arguments), (this.TagId = 0), (this.TagName = "");
	}
	OnInit(t) {
		return (
			(this.TagId = t.ActionInstChangeStateTag.TagId),
			(this.TagName = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(
				this.TagId,
			)),
			!0
		);
	}
	ToString(t, e = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, e);
	}
}
exports.AiStateMachineActionChangeInstState =
	AiStateMachineActionChangeInstState;

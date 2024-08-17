"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionFinishTalk = void 0);
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionFinishTalk extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e = this.Runner;
		this.FinishExecute(!0, !1), e.FinishTalk();
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
}
exports.FlowActionFinishTalk = FlowActionFinishTalk;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionOpenSystemBoard = void 0);
const FlowActionLevelAsyncAction_1 = require("./FlowActionLevelAsyncAction");
class FlowActionOpenSystemBoard extends FlowActionLevelAsyncAction_1.FlowActionLevelAsyncAction {
	OnBackgroundExecute() {
		this.FinishExecute(!0);
	}
}
exports.FlowActionOpenSystemBoard = FlowActionOpenSystemBoard;

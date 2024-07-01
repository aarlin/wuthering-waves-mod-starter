"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSwitchFsmState extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments), (this.States = void 0);
	}
	ReceiveTickAI(e, t, s) {
		e.AiController ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]),
			this.FinishExecute(!1)),
			this.FinishExecute(!0);
	}
}
exports.default = TsTaskSwitchFsmState;

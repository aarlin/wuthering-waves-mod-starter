"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskGamePlayCallFinish extends TsTaskAbortImmediatelyBase_1.default {
	ReceiveExecuteAI(e, s) {
		this.FinishExecute(!0);
	}
}
exports.default = TsTaskGamePlayCallFinish;

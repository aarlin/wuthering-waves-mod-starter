"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsTaskAbortImmediatelyBase extends UE.BTTask_BlueprintBase {
	ReceiveAbortAI(e, s) {
		this.FinishAbort(), this.OnAbort(), this.OnClear();
	}
	Finish(e) {
		this.FinishExecute(e), this.OnClear();
	}
	OnAbort() {}
	OnClear() {}
}
exports.default = TsTaskAbortImmediatelyBase;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
	TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskLog extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments), (this.Level = ""), (this.Content = "");
	}
	ReceiveExecuteAI(e, o) {
		if (this.Level && this.Content) {
			switch (this.Level) {
				case "Warn":
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("BehaviorTree", 51, this.Content);
					break;
				case "Info":
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("BehaviorTree", 51, this.Content);
					break;
				case "Error":
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 51, this.Content);
					break;
				default:
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("BehaviorTree", 51, this.Content);
			}
			this.FinishExecute(!0);
		} else this.FinishExecute(!1);
	}
}
exports.default = TsTaskLog;

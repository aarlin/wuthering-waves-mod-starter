"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskLog = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskLog extends LevelAiTask_1.LevelAiTask {
	ExecuteTask() {
		var e = this.Params;
		if (e)
			switch (e.Level) {
				case "Warn":
					Log_1.Log.CheckWarn() && Log_1.Log.Warn("LevelAi", 30, e.Content);
					break;
				case "Info":
					Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelAi", 30, e.Content);
					break;
				case "Error":
					Log_1.Log.CheckError() && Log_1.Log.Error("LevelAi", 30, e.Content);
			}
		return 0;
	}
}
exports.LevelAiTaskLog = LevelAiTaskLog;

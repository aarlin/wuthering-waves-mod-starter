"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventLog = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventLog extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		var L = e;
		if (L)
			switch (L.Level) {
				case "Warn":
					Log_1.Log.CheckWarn() && Log_1.Log.Warn("LevelEvent", 7, L.Content);
					break;
				case "Info":
					Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 7, L.Content);
					break;
				case "Error":
					Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 7, L.Content);
			}
	}
}
exports.LevelEventLog = LevelEventLog;

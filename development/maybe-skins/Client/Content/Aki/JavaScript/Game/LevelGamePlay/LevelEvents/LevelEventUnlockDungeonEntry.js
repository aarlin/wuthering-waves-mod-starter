"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventUnlockDungeonEntry = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUnlockDungeonEntry extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, n, o) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"InstanceDungeon",
				5,
				"注意，该行为已经废弃，通知程序处理",
			);
	}
}
exports.LevelEventUnlockDungeonEntry = LevelEventUnlockDungeonEntry;

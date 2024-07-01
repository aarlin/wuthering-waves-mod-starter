"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckInstanceEntranceUnlockStatus = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInstanceEntranceUnlockStatus extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InstanceDungeon",
					5,
					"注意，该条件已经废弃，通知程序处理",
				),
			!1
		);
	}
}
exports.LevelConditionCheckInstanceEntranceUnlockStatus =
	LevelConditionCheckInstanceEntranceUnlockStatus;

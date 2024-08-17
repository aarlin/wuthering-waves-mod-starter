"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	LevelEventLockInputState_1 = require("../../../LevelGamePlay/LevelEventLockInputState"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class LevelEventInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		return (
			!!LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Input", 8, "[InputDistribute]刷新关卡事件输入Tag时", [
					"输入TAG",
					LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames,
				]),
			this.SetInputDistributeTags(
				LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames,
			),
			!0)
		);
	}
}
exports.LevelEventInputDistribute = LevelEventInputDistribute;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckDungeonFinished = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeonFinished extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		var i;
		return (
			!!e.LimitParams &&
			!!(i = e.LimitParams.get("InstanceId")) &&
			((e = e.LimitParams.get("Finish")), !!i) &&
			((i = parseInt(i)),
			(1 === parseInt(e)) ===
				ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(i))
		);
	}
}
exports.LevelConditionCheckDungeonFinished = LevelConditionCheckDungeonFinished;

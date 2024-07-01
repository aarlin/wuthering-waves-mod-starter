"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckCalabashLevel = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase"),
	ModelManager_1 = require("../../Manager/ModelManager");
class LevelConditionCheckCalabashLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		return (
			!!e.LimitParams &&
			!!(e = e.LimitParams.get("Level")) &&
			ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel() >= Number(e)
		);
	}
}
exports.LevelConditionCheckCalabashLevel = LevelConditionCheckCalabashLevel;

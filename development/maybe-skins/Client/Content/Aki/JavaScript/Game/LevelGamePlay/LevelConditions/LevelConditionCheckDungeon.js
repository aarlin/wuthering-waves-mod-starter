"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckDungeon = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeon extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		var a;
		return (
			!!e.LimitParams &&
			!!(e = e.LimitParams.get("Id")) &&
			((a = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
			parseInt(e) === a)
		);
	}
}
exports.LevelConditionCheckDungeon = LevelConditionCheckDungeon;

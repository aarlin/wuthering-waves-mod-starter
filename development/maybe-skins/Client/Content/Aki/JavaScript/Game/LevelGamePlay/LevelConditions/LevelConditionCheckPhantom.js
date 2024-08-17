"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckPhantomMaxLevel =
		exports.LevelConditionCheckPhantomLevel =
			void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelConditionCheckPhantomLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		var l;
		return (
			!!e.LimitParams &&
			((l = e.LimitParams.get("ItemId")),
			(e = e.LimitParams.get("Level")),
			(l = l ? parseInt(l) : 0),
			(e = e ? parseInt(e) : 0),
			ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckPhantomLevelSatisfied(
				l,
				e,
			))
		);
	}
}
exports.LevelConditionCheckPhantomLevel = LevelConditionCheckPhantomLevel;
class LevelConditionCheckPhantomMaxLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		return ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckHasPhantomMaxLevel();
	}
}
exports.LevelConditionCheckPhantomMaxLevel = LevelConditionCheckPhantomMaxLevel;

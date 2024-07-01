"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckExploreLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckExploreLevel extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, r) {
		var l = e,
			n = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
		switch (l.Compare) {
			case "Eq":
				return n === l.Level;
			case "Ne":
				return n !== l.Level;
			case "Ge":
				return n >= l.Level;
			case "Gt":
				return n > l.Level;
			case "Le":
				return n <= l.Level;
			case "Lt":
				return n < l.Level;
		}
		return !1;
	}
}
exports.LevelConditionCheckExploreLevel = LevelConditionCheckExploreLevel;

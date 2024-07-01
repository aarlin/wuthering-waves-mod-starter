"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCompareTeammateDie = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareTeammateDie extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e) {
		if (!e) return !1;
		var a = e;
		let r = 0;
		for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
			e.IsDead() && r++;
		switch (a.Compare) {
			case "Eq":
				return r === a.DieCount;
			case "Ne":
				return r !== a.DieCount;
			case "Ge":
				return r >= a.DieCount;
			case "Gt":
				return r > a.DieCount;
			case "Le":
				return r <= a.DieCount;
			case "Lt":
				return r < a.DieCount;
			default:
				return !1;
		}
	}
}
exports.LevelConditionCompareTeammateDie = LevelConditionCompareTeammateDie;

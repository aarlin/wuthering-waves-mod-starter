"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionQuestState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionQuestState extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		var a = e;
		if (!a) return !1;
		var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(a.QuestId);
		let s = !1;
		switch (a.Compare) {
			case "Eq":
				s = r === a.State;
				break;
			case "Ne":
				s = r !== a.State;
				break;
			case "Ge":
				s = r >= a.State;
				break;
			case "Gt":
				s = r > a.State;
				break;
			case "Le":
				s = r <= a.State;
				break;
			case "Lt":
				s = r < a.State;
		}
		return s;
	}
}
exports.LevelConditionQuestState = LevelConditionQuestState;

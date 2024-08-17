"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckRogueAbilitySelect = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRogueAbilitySelect extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e) {
		var o, l;
		return (
			!!e &&
			((o = e.IsReceived),
			(l = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
			(e =
				ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
					e.BoardId,
				)) && e.Layer === l
				? o
					? e.IsSelect
					: !e.IsSelect
				: o)
		);
	}
}
exports.LevelConditionCheckRogueAbilitySelect =
	LevelConditionCheckRogueAbilitySelect;

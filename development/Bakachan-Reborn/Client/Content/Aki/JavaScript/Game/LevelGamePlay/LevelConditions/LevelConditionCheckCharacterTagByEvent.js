"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckCharacterTagByEvent = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCharacterTagByEvent extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a, ...r) {
		var n;
		return !(
			r[2] >= r[3] ||
			!(n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
			r[0] !== n.Id
		);
	}
}
exports.LevelConditionCheckCharacterTagByEvent =
	LevelConditionCheckCharacterTagByEvent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionEntityState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionEntityState extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		var a;
		return (
			!!e &&
			!!(a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				e.EntityId,
			))?.Valid &&
			!!(a = a.Entity.GetComponent(177)) &&
			((a = a.ContainsTagByName(e.State)), "Eq" === e.Compare ? a : !a)
		);
	}
}
exports.LevelConditionEntityState = LevelConditionEntityState;

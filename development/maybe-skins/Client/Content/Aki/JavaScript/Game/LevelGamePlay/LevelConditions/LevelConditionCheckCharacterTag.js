"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckCharacterTag = void 0);
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCharacterTag extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		var t;
		return (
			!!(
				e.LimitParams &&
				(e = e.LimitParams.get("Tag")) &&
				(t =
					(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) &&
					t.Entity.GetComponent(185))
			) && t.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
		);
	}
	CheckNew(e, a) {
		if (!e) return !1;
		let t = !1;
		var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		return (
			r && (r = r.Entity.GetComponent(185)) && (t = r.HasTag(e.TagId)),
			e.IsContain ? t : !t
		);
	}
}
exports.LevelConditionCheckCharacterTag = LevelConditionCheckCharacterTag;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckPlayerStateRestriction = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	PlayerStateRestrictionById_1 = require("../../../Core/Define/ConfigQuery/PlayerStateRestrictionById"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPlayerStateRestriction extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		if (!e) return !1;
		var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		if (!a)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"LevelCondition",
						37,
						"[CheckPlayerStateRestriction]无法获取当前角色",
					),
				!1
			);
		var r = a.Entity.GetComponent(185);
		if (!r)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"LevelCondition",
						37,
						"[CheckPlayerStateRestriction]无法获取当前角色BaseTagComponent组件",
					),
				!1
			);
		if (
			(a =
				PlayerStateRestrictionById_1.configPlayerStateRestrictionById.GetConfig(
					e.RestrictionId,
				))
		) {
			for (const e of a.IncludedTags)
				if (!r.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)))
					return !1;
			for (const e of a.ExcludedTags)
				if (r.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)))
					return !1;
		}
		return !0;
	}
}
exports.LevelConditionCheckPlayerStateRestriction =
	LevelConditionCheckPlayerStateRestriction;

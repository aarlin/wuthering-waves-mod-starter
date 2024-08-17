"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventUsePhantomSkill = void 0);
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	BlackboardController_1 = require("../../World/Controller/BlackboardController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUsePhantomSkill extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, a) {
		if (e && ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
			var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
			if (
				(void 0 !== e.BlackboardPos &&
					BlackboardController_1.BlackboardController.SetVectorValueByEntity(
						l.Entity.Id,
						e.BlackboardPos.Key,
						e.BlackboardPos.Value.X ?? 0,
						e.BlackboardPos.Value.Y ?? 0,
						e.BlackboardPos.Value.Z ?? 0,
					),
				void 0 !== e.BlackboardRot)
			) {
				if (!Global_1.Global.BaseCharacter) return;
				BlackboardController_1.BlackboardController.SetRotatorValueByEntity(
					l.Entity.Id,
					e.BlackboardRot.Key,
					e.BlackboardRot.Value.Y ?? 0,
					e.BlackboardRot.Value.X ?? 0,
					e.BlackboardRot.Value.Z ?? 0,
				);
			}
			l.Entity.GetComponent(185).AddTag(
				GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.SkillType),
			);
		}
	}
}
exports.LevelEventUsePhantomSkill = LevelEventUsePhantomSkill;

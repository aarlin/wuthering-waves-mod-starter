"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckClientUseVisionSkill = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckClientUseVisionSkill extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, i) {
		var o, n, l;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: (o = e.LimitParams.get("PhantomSkillId"))
				? !!(n = Global_1.Global.BaseCharacter) &&
					!!(
						(l = n.GetEntityNoBlueprint()?.GetComponent(34)) &&
						(n = n.GetEntityNoBlueprint()?.GetComponent(33)) &&
						(l = l.GetVisionData(Number(o))) &&
						n.GetSkill(l.技能ID)?.Active
					)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckClientUseVisionSkill}的定义`,
						),
					!1);
	}
}
exports.LevelConditionCheckClientUseVisionSkill =
	LevelConditionCheckClientUseVisionSkill;

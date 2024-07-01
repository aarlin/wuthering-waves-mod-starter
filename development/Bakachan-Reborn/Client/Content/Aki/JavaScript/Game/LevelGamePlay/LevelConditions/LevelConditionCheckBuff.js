"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckBuff = void 0);
const UE = require("ue"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckBuff extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		var r = UE.KismetStringLibrary.Conv_StringToInt(
				e.LimitParams.get("PbDataId"),
			),
			n = UE.KismetStringLibrary.Conv_StringToInt(
				e.LimitParams.get("IsPlayer"),
			);
		e = UE.KismetStringLibrary.Conv_StringToInt64(e.LimitParams.get("BuffId"));
		if (n) {
			n = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
			const t = EntitySystem_1.EntitySystem.Get(n)?.GetComponent(157);
			return !!t?.GetBuffTotalStackById(e);
		}
		const a =
			ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				r,
			)?.Entity?.GetComponent(157);
		return !!a?.GetBuffTotalStackById(e);
	}
}
exports.LevelConditionCheckBuff = LevelConditionCheckBuff;

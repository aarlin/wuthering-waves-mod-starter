"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckEntityCommonTag = void 0);
const UE = require("ue"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityCommonTag extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		var n = UE.KismetStringLibrary.Conv_StringToInt64(
				e.LimitParams.get("CreatureGen"),
			),
			r = parseInt(e.LimitParams.get("EntityConfigId")),
			a = e.LimitParams.get("EntityCommonTag");
		e = new Array();
		ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(n, e);
		for (const t of e) {
			if (
				t.Entity.GetComponent(0).GetPbDataId() === r &&
				!t.Entity.GetComponent(177)?.ContainsTagByName(a)
			)
				return !1;
		}
		return !0;
	}
	CheckNew(e, t) {
		if (!e) return !1;
		let n = !1;
		var r = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
			e.EntityId,
		);
		return (
			r &&
				(r = EntitySystem_1.EntitySystem.GetComponent(r.Id, 177)) &&
				(n = r.HasTag(e.TagId)),
			e.IsContain ? n : !n
		);
	}
}
exports.LevelConditionCheckEntityCommonTag = LevelConditionCheckEntityCommonTag;

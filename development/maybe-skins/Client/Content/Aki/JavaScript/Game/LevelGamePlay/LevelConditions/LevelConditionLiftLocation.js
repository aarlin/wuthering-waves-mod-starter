"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionLiftLocation = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	ActorUtils_1 = require("../../Utils/ActorUtils"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionLiftLocation extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		if (!e) return !1;
		let o;
		return (
			e.IsSelf
				? t && (o = ActorUtils_1.ActorUtils.GetEntityByActor(t))
				: (o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
						e.EntityId,
					)),
			!!o?.Valid &&
				!!(t = o.Entity.GetComponent(123)) &&
				((t = t.CurLiftFloor === e.Location), "Eq" === e.Compare ? t : !t)
		);
	}
}
exports.LevelConditionLiftLocation = LevelConditionLiftLocation;

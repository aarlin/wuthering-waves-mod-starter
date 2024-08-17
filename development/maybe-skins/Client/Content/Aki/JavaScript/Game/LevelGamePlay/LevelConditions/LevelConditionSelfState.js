"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionSelfState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	ActorUtils_1 = require("../../Utils/ActorUtils"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionSelfState extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t, r) {
		if (!e) return !1;
		let n;
		return (
			t && (n = ActorUtils_1.ActorUtils.GetEntityByActor(t)),
			!!(n =
				r && 1 === r.Type
					? ModelManager_1.ModelManager.CreatureModel.GetEntityById(r.EntityId)
					: n)?.Valid &&
				!!(t = n.Entity.GetComponent(177)) &&
				((r = t.ContainsTagByName(e.State)), "Eq" === e.Compare ? r : !r)
		);
	}
}
exports.LevelConditionSelfState = LevelConditionSelfState;

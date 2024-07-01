"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckEntityLocked = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityLocked extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		if (!e) return !1;
		var n = e;
		for (const e of n.Entities) {
			var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
			if (!r?.Valid) return !1;
			if (!(r = r.Entity.GetComponent(177))) return !1;
			if (r.HasTag(-662723379)) {
				if (!n.IsLocked) return !1;
			} else if (n.IsLocked) return !1;
		}
		return !0;
	}
}
exports.LevelConditionCheckEntityLocked = LevelConditionCheckEntityLocked;

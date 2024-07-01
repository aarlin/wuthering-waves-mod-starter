"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckEntityConfigId = void 0);
const ActorUtils_1 = require("../../Utils/ActorUtils"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityConfigId extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		return !!(
			e.LimitParams &&
			t &&
			(e = e.LimitParams.get("ConfigId")) &&
			((e = Number.parseInt(e)),
			(t = ActorUtils_1.ActorUtils.GetEntityByActor(t))) &&
			(t = t.Entity.GetComponent(0)) &&
			t.GetPbDataId() === e
		);
	}
}
exports.LevelConditionCheckEntityConfigId = LevelConditionCheckEntityConfigId;

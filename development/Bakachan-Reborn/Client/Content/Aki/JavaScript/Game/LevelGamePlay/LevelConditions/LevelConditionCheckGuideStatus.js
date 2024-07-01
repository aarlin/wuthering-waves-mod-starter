"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckGuideStatus = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckGuideStatus extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		if (!e.LimitParams || !e.LimitParamsOpe) return !1;
		var a = e.LimitParams.get("GuideGroupId"),
			i = e.LimitParams.get("Status");
		let r = e.LimitParamsOpe.get("Status");
		return (
			!(!a || !i) &&
			((r = r || ""),
			ModelManager_1.ModelManager.GuideModel.CheckGroupStatus(
				parseInt(a),
				parseInt(i),
				r,
			))
		);
	}
}
exports.LevelConditionCheckGuideStatus = LevelConditionCheckGuideStatus;

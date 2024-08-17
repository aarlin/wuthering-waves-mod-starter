"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckLevelOp = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLevelOp extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, r) {
		if (!e.LimitParams) return !1;
		var a = e.LimitParams.get("Level");
		if (!a) return !1;
		var t = parseInt(a),
			n = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(0);
		if (!n) return !1;
		switch (e.LimitParams.get("Op")) {
			case "Eq":
				return n === t;
			case "Ne":
				return n !== t;
			case "Ge":
			default:
				return t <= n;
			case "Gt":
				return t < n;
			case "Le":
				return n <= t;
			case "Lt":
				return n < t;
		}
	}
}
exports.LevelConditionCheckLevelOp = LevelConditionCheckLevelOp;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckCurWorldLevelOp = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCurWorldLevelOp extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, r) {
		if (!e.LimitParams) return !1;
		var a = e.LimitParams.get("Level");
		if (!a) return !1;
		var l = parseInt(a),
			t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
		if (!t) return !1;
		switch (e.LimitParams.get("Op")) {
			case "Eq":
				return t === l;
			case "Ne":
				return t !== l;
			case "Ge":
			default:
				return l <= t;
			case "Gt":
				return l < t;
			case "Le":
				return t <= l;
			case "Lt":
				return t < l;
		}
	}
}
exports.LevelConditionCheckCurWorldLevelOp = LevelConditionCheckCurWorldLevelOp;

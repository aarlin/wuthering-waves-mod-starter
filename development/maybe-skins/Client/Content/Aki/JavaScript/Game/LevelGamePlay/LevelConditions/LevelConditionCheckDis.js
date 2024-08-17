"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckDis = void 0);
const Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDis extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		if (e.LimitParams && a) {
			var r = e.LimitParams.get("Distance");
			e = e.LimitParams.get("CheckWay");
			if (r && e) {
				var s = Global_1.Global.BaseCharacter.GetDistanceTo(a);
				switch (e) {
					case "1":
						return parseFloat(r) >= s;
					case "2":
						return parseFloat(r) <= s;
					case "3":
						return parseFloat(r) !== s;
				}
			}
		}
		return !1;
	}
}
exports.LevelConditionCheckDis = LevelConditionCheckDis;

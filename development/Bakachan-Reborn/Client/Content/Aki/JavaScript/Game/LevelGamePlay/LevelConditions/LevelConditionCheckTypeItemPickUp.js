"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckTypeItemPickUp = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTypeItemPickUp extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, i, ...n) {
		return (
			!!e.LimitParams &&
			!!(e = e.LimitParams.get("Type")) &&
			((e = parseInt(e)),
			ConfigManager_1.ConfigManager.ItemConfig.GetConfig(Number(n[0]))
				.MainTypeId === e)
		);
	}
}
exports.LevelConditionCheckTypeItemPickUp = LevelConditionCheckTypeItemPickUp;

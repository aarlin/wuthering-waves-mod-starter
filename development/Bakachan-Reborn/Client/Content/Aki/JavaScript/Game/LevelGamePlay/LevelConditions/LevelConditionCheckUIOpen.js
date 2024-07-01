"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckUIOpen = void 0);
const UiManager_1 = require("../../Ui/UiManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckUIOpen extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		return (
			!!(e = e.LimitParams.get("UIName")) && UiManager_1.UiManager.IsViewOpen(e)
		);
	}
}
exports.LevelConditionCheckUIOpen = LevelConditionCheckUIOpen;

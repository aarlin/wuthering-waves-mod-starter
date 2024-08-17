"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventOpenUi = void 0);
const UiManager_1 = require("../../Ui/UiManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenUi extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, n) {
		(e = e.get("UIName")), UiManager_1.UiManager.OpenView(e);
	}
}
exports.LevelEventOpenUi = LevelEventOpenUi;

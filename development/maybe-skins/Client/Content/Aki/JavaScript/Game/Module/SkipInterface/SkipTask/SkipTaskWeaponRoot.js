"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipTaskWeaponRoot = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
	SkipTask_1 = require("./SkipTask");
class SkipTaskWeaponRoot extends SkipTask_1.SkipTask {
	OnRun(e) {
		(e = { WeaponIncId: e, IsFromRoleRootView: !1 }),
			UiManager_1.UiManager.OpenView("WeaponRootView", e),
			this.Finish();
	}
}
exports.SkipTaskWeaponRoot = SkipTaskWeaponRoot;

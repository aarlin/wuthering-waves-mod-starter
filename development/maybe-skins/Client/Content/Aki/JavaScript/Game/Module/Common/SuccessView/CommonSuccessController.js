"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSuccessController = void 0);
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonSuccessData_1 = require("./CommonSuccessData");
class CommonSuccessController extends UiControllerBase_1.UiControllerBase {
	static OpenCommonSuccessView(e = void 0, o = void 0) {
		(e = e ?? new CommonSuccessData_1.CommonSuccessData()),
			UiManager_1.UiManager.OpenView("CommonSuccessView", e, o);
	}
}
exports.CommonSuccessController = CommonSuccessController;

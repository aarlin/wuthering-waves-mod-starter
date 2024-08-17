"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemCook = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemCook extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		return (
			void 0 !== (await UiManager_1.UiManager.OpenViewAsync("CookRootView"))
		);
	}
	GetViewName(e) {
		return "CookRootView";
	}
}
exports.OpenSystemCook = OpenSystemCook;

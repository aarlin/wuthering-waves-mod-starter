"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemSynthetic = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemSynthetic extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, t) {
		return (
			void 0 !== (await UiManager_1.UiManager.OpenViewAsync("ComposeRootView"))
		);
	}
	GetViewName(e) {
		return "ComposeRootView";
	}
}
exports.OpenSystemSynthetic = OpenSystemSynthetic;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemExploreLevel = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemExploreLevel extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, r) {
		return (
			void 0 !== (await UiManager_1.UiManager.OpenViewAsync("ExploreLevelView"))
		);
	}
	GetViewName(e) {
		return "ExploreLevelView";
	}
}
exports.OpenSystemExploreLevel = OpenSystemExploreLevel;

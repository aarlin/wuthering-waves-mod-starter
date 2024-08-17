"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemRoguelikeActivity = void 0);
const RoguelikeController_1 = require("../../../Module/Roguelike/RoguelikeController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRoguelikeActivity extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, t) {
		return RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView();
	}
	GetViewName(e) {
		return "RoguelikeActivityView";
	}
}
exports.OpenSystemRoguelikeActivity = OpenSystemRoguelikeActivity;

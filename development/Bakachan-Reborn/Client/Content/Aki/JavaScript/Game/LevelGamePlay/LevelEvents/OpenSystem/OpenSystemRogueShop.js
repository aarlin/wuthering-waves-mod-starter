"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemRogueShop = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	RoguelikeController_1 = require("../../../Module/Roguelike/RoguelikeController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRogueShop extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		return RoguelikeController_1.RoguelikeController.OpenBuffSelectViewById(-1);
	}
	GetViewName(e, o) {
		var r =
			ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(-1);
		return RoguelikeController_1.RoguelikeController.GetViewNameByGainType(
			r.RoguelikeGainDataType,
		);
	}
}
exports.OpenSystemRogueShop = OpenSystemRogueShop;

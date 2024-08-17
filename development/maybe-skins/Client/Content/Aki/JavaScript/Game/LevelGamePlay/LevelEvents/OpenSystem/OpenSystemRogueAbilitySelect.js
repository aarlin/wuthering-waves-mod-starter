"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemRogueEventSelect = exports.OpenSystemRogueAbilitySelect =
		void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RoguelikeController_1 = require("../../../Module/Roguelike/RoguelikeController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRogueAbilitySelect extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		return (
			(ModelManager_1.ModelManager.RoguelikeModel.CurIndex = e.BoardId),
			RoguelikeController_1.RoguelikeController.OpenBuffSelectViewById(
				e.BoardId,
			)
		);
	}
	GetViewName(e, o) {
		return (
			(e =
				ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
					e.BoardId,
				)),
			RoguelikeController_1.RoguelikeController.GetViewNameByGainType(
				e.RoguelikeGainDataType,
			)
		);
	}
}
exports.OpenSystemRogueAbilitySelect = OpenSystemRogueAbilitySelect;
class OpenSystemRogueEventSelect extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		return (
			(ModelManager_1.ModelManager.RoguelikeModel.CurIndex =
				Protocol_1.Aki.Protocol._3s.Proto_EventBindId),
			RoguelikeController_1.RoguelikeController.OpenBuffSelectViewById(
				Protocol_1.Aki.Protocol._3s.Proto_EventBindId,
			)
		);
	}
	GetViewName(e, o) {
		return "RoguelikeRandomEventView";
	}
}
exports.OpenSystemRogueEventSelect = OpenSystemRogueEventSelect;

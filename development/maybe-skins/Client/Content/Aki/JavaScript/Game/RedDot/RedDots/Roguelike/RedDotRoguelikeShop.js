"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotRoguelikeShop = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotRoguelikeShop extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.RoguelikeDataUpdate,
			EventDefine_1.EEventName.RefreshAllPayShop,
			EventDefine_1.EEventName.RefreshGoods,
			EventDefine_1.EEventName.RefreshGoodsList,
			EventDefine_1.EEventName.RefreshPayShop,
			EventDefine_1.EEventName.CrossDay,
		];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.RoguelikeModel.CheckRoguelikeShopRedDot();
	}
}
exports.RedDotRoguelikeShop = RedDotRoguelikeShop;

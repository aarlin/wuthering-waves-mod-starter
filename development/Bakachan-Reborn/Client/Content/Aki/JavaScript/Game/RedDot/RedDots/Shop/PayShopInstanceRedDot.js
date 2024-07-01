"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopInstanceRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class PayShopInstanceRedDot extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionPayShop";
	}
	IsMultiple() {
		return !0;
	}
	IsAllEventParamAsUId() {
		return !1;
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.PayShopGoodsBuy,
			EventDefine_1.EEventName.GoodsRefreshDiscountTime,
			EventDefine_1.EEventName.RefreshAllPayShop,
			EventDefine_1.EEventName.RefreshPayShop,
			EventDefine_1.EEventName.RefreshGoods,
			EventDefine_1.EEventName.RefreshGoodsList,
			EventDefine_1.EEventName.UnLockGoods,
		];
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.PayShopModel.CheckPayShopHasRedDot(e);
	}
}
exports.PayShopInstanceRedDot = PayShopInstanceRedDot;

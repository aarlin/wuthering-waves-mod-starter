"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopTabRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class PayShopTabRedDot extends RedDotBase_1.RedDotBase {
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
			EventDefine_1.EEventName.SwitchPayShopView,
			EventDefine_1.EEventName.RefreshPayShop,
			EventDefine_1.EEventName.RefreshGoods,
			EventDefine_1.EEventName.RefreshGoodsList,
			EventDefine_1.EEventName.UnLockGoods,
		];
	}
	OnCheck(e) {
		var o = ModelManager_1.ModelManager.PayShopModel.GetCurrentPayShopId();
		return ModelManager_1.ModelManager.PayShopModel.CheckPayShopTabHasRedDot(
			o,
			e,
		);
	}
}
exports.PayShopTabRedDot = PayShopTabRedDot;

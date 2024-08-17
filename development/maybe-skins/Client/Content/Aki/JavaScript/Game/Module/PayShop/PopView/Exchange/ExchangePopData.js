"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExchangePopData = void 0);
const UiPopViewData_1 = require("../../../../Ui/Define/UiPopViewData");
class ExchangePopData extends UiPopViewData_1.UiPopViewData {
	constructor() {
		super(...arguments),
			(this.GoodsId = 0),
			(this.PayShopGoods = void 0),
			(this.ShopItemResource = "");
	}
}
exports.ExchangePopData = ExchangePopData;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopPanelData = void 0);
class ShopPanelData {
	constructor() {
		(this.ItemId = 0),
			(this.CurrencyId = 0),
			(this.SingleBuyCount = 0),
			(this.SingleBuyPrice = 0),
			(this.BoughtCount = 0),
			(this.BuyLimit = 0),
			(this.IsLock = !1),
			(this.LockText = void 0),
			(this.InSellTime = !1),
			(this.BuySuccessFunction = void 0);
	}
	IsSoldOut() {
		return 0 < this.BuyLimit && this.BoughtCount === this.BuyLimit;
	}
	IsInteractive() {
		return !this.IsSoldOut() && this.InSellTime && !this.IsLock;
	}
}
exports.ShopPanelData = ShopPanelData;

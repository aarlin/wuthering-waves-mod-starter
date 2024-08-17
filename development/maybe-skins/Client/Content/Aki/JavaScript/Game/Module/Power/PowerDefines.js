"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PowerViewData =
		exports.PowerConst =
		exports.PowerItemInfo =
		exports.PowerConfirmBoxData =
		exports.EPowerShopType =
			void 0);
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
var EPowerShopType;
!(function (e) {
	(e[(e.BuyWithMoney = 6)] = "BuyWithMoney"),
		(e[(e.BuyWithItem = 7)] = "BuyWithItem");
})((EPowerShopType = exports.EPowerShopType || (exports.EPowerShopType = {})));
class PowerConfirmBoxData {
	constructor(e = 2, o = 0) {
		(this.ConfirmCallback = void 0),
			(this.CancelCallback = void 0),
			(this.Type = e),
			(this.PowerRequired = o);
	}
}
exports.PowerConfirmBoxData = PowerConfirmBoxData;
class PowerItemInfo {
	constructor(e) {
		(this.ItemName = ""),
			(this.Cio = 0),
			(this.StackValue = 0),
			(this.RenewValue = 0),
			(this.CostValue = 0),
			(this.ShopId = 0),
			(this.GoodsId = 0),
			(this.IsHideWhenZero = !1),
			(this.RemainCount = 0),
			(this.ItemId = e);
	}
	set ItemId(e) {
		(this.Cio = e),
			this.Cio <= PowerConst.MaxVirtualItemId
				? (this.ShopId = EPowerShopType.BuyWithMoney)
				: (this.ShopId = EPowerShopType.BuyWithItem);
	}
	get ItemId() {
		return this.Cio;
	}
}
exports.PowerItemInfo = PowerItemInfo;
class PowerConst {
	constructor() {}
}
((exports.PowerConst = PowerConst).MaxVirtualItemId = 2e3),
	(PowerConst.SingCube = 10800);
class PowerViewData extends UiPopViewData_1.UiPopViewData {
	constructor() {
		super(...arguments), (this.IsMultipleView = !0);
	}
}
exports.PowerViewData = PowerViewData;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopViewData = void 0);
const UiViewData_1 = require("../../../Ui/Define/UiViewData");
class PayShopViewData extends UiViewData_1.UiViewData {
	constructor() {
		super(...arguments),
			(this.PayShopId = 1),
			(this.SwitchId = void 0),
			(this.ShowShopIdList = []);
	}
}
exports.PayShopViewData = PayShopViewData;

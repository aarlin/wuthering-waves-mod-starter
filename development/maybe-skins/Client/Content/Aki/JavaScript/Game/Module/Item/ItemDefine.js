"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemTipsData = void 0);
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
class ItemTipsData extends UiPopViewData_1.UiPopViewData {
	constructor() {
		super(...arguments), (this.ItemId = 0), (this.ItemUid = 0);
	}
}
exports.ItemTipsData = ItemTipsData;

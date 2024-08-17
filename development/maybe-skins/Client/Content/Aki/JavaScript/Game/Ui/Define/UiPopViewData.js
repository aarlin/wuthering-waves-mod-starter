"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiPopViewData = void 0);
const UiViewData_1 = require("./UiViewData");
class UiPopViewData extends UiViewData_1.UiViewData {
	constructor() {
		super(...arguments), (this.NotAddChildToTopStackView = !1);
	}
}
exports.UiPopViewData = UiPopViewData;

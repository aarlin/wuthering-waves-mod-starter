"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridReceivedComponent = void 0);
const SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent");
class SmallItemGridReceivedComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
	GetResourceId() {
		return "UiItem_ItemBReceived";
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.SmallItemGridReceivedComponent = SmallItemGridReceivedComponent;

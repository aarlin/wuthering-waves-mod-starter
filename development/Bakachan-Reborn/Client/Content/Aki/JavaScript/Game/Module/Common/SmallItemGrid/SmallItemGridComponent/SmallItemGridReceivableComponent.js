"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridReceivableComponent = void 0);
const SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent");
class SmallItemGridReceivableComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
	GetResourceId() {
		return "UiItem_ItemBReceivable";
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.SmallItemGridReceivableComponent = SmallItemGridReceivableComponent;

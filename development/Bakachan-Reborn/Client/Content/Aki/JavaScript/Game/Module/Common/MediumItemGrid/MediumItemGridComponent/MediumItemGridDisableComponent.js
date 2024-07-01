"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridDisableComponent = void 0);
const MediumItemGridVisibleComponent_1 = require("./MediumItemGridVisibleComponent");
class MediumItemGridDisableComponent extends MediumItemGridVisibleComponent_1.MediumItemGridVisibleComponent {
	GetResourceId() {
		return "UiItem_ItemDark";
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.MediumItemGridDisableComponent = MediumItemGridDisableComponent;

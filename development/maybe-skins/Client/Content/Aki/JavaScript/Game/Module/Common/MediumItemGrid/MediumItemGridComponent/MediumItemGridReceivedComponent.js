"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridReceivedComponent = void 0);
const MediumItemGridVisibleComponent_1 = require("./MediumItemGridVisibleComponent");
class MediumItemGridReceivedComponent extends MediumItemGridVisibleComponent_1.MediumItemGridVisibleComponent {
	GetResourceId() {
		return "UiItem_ItemReceived";
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.MediumItemGridReceivedComponent = MediumItemGridReceivedComponent;

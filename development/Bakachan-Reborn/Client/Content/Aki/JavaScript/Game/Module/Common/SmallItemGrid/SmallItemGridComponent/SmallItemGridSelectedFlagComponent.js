"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridSelectedFlagComponent = void 0);
const SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent");
class SmallItemGridSelectedFlagComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
	GetResourceId() {
		return "UiItem_ItemBRoleSel";
	}
	OnRefresh(e) {
		super.OnRefresh(e), this.SetUiActive(e);
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.SmallItemGridSelectedFlagComponent = SmallItemGridSelectedFlagComponent;

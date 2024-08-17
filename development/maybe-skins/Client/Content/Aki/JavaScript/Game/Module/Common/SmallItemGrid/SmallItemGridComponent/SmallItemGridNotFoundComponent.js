"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridNotFoundComponent = void 0);
const SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent");
class SmallItemGridNotFoundComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
	GetResourceId() {
		return "UiItem_ItemBNotFound";
	}
	OnRefresh(e) {
		super.OnRefresh(e), this.SetUiActive(e);
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.SmallItemGridNotFoundComponent = SmallItemGridNotFoundComponent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridVisibleComponent = void 0);
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridVisibleComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
	OnRefresh(e) {
		this.SetActive(e);
	}
}
exports.SmallItemGridVisibleComponent = SmallItemGridVisibleComponent;

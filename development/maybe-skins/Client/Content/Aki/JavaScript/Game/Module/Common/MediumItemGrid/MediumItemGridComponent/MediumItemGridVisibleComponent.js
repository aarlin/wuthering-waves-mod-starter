"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridVisibleComponent = void 0);
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridVisibleComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	OnRefresh(e) {
		this.SetActive(e);
	}
}
exports.MediumItemGridVisibleComponent = MediumItemGridVisibleComponent;

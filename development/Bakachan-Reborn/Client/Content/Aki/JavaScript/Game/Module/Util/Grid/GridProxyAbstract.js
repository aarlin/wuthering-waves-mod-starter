"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GridProxyAbstract = void 0);
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class GridProxyAbstract extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0);
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, r) {
		return this.GridIndex;
	}
}
exports.GridProxyAbstract = GridProxyAbstract;

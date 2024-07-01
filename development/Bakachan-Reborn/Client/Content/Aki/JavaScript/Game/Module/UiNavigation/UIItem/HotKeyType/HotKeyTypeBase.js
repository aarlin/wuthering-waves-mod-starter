"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HotKeyTypeBase = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class HotKeyTypeBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.IsMultiKeyItem = !1);
	}
	SetIsMultiKeyItem(e) {
		this.IsMultiKeyItem = e;
	}
	Clear() {
		this.OnClear();
	}
	OnClear() {}
}
exports.HotKeyTypeBase = HotKeyTypeBase;

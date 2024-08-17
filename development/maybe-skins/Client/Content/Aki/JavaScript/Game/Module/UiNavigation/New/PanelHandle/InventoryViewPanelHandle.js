"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InventoryViewPanelHandle = void 0);
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class InventoryViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
	constructor() {
		super(...arguments), (this.nwo = !1);
	}
	get IsInDestroyMode() {
		return this.nwo;
	}
	swo() {
		let e = "";
		for (const t of this.DefaultNavigationListener)
			if ("InventoryItemGridToggle" === t.GetNavigationComponent().GetType()) {
				e = t.GroupName;
				break;
			}
		return this.GetNavigationGroup(e);
	}
	SetItemGridDestroyMode(e) {
		this.nwo = e;
		var t = this.swo();
		if (t)
			for (let n = 0, o = t.ListenerList.Num(); n < o; ++n)
				t.ListenerList.Get(n).GetBehaviorComponent().bToggleOnSelect = !e;
	}
}
exports.InventoryViewPanelHandle = InventoryViewPanelHandle;

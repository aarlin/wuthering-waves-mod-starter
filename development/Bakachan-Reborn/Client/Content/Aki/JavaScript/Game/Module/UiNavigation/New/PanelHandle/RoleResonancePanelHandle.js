"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleResonancePanelHandle = void 0);
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class RoleResonancePanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
	constructor() {
		super(...arguments), (this.GroupName = ""), (this.hwo = void 0);
	}
	OnGetSuitableNavigationListenerList(e) {
		return this.hwo ? [this.hwo] : [];
	}
	SetToggleSelectByGroupName(e) {
		var t = this.GetNavigationGroup(e);
		if (t) {
			this.GroupName = e;
			for (let e = 0, a = t.ListenerList.Num(); e < a; ++e)
				t.ListenerList.Get(e).GetBehaviorComponent().bToggleOnSelect = !0;
		}
	}
	ResetToggleSelect() {
		var e = this.GetNavigationGroup(this.GroupName);
		if (e) {
			this.GroupName = "";
			for (let t = 0, a = e.ListenerList.Num(); t < a; ++t)
				e.ListenerList.Get(t).GetBehaviorComponent().bToggleOnSelect = !1;
		}
	}
	SetDefaultNavigationListener(e) {
		this.hwo = e;
	}
}
exports.RoleResonancePanelHandle = RoleResonancePanelHandle;

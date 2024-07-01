"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillPanelHandle = void 0);
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class RoleSkillPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
	constructor() {
		super(...arguments), (this.GroupName = "");
	}
	SetToggleSelectByGroupName(e) {
		var l = this.GetNavigationGroup(e);
		if (l) {
			this.GroupName = e;
			for (let e = 0, t = l.ListenerList.Num(); e < t; ++e)
				l.ListenerList.Get(e).GetBehaviorComponent().bToggleOnSelect = !0;
		}
	}
	ResetToggleSelect() {
		var e = this.GetNavigationGroup(this.GroupName);
		if (e) {
			this.GroupName = "";
			for (let l = 0, t = e.ListenerList.Num(); l < t; ++l)
				e.ListenerList.Get(l).GetBehaviorComponent().bToggleOnSelect = !1;
		}
	}
}
exports.RoleSkillPanelHandle = RoleSkillPanelHandle;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationRoleSkillTreeToggle = void 0);
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
	NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleSkillTreeToggle extends NavigationToggle_1.NavigationToggle {
	constructor() {
		super(...arguments),
			(this.ywo = !1),
			(this.Iwo = () => {
				var e = this.Selectable;
				1 === e.GetToggleState() && (this.ywo = !0), (e.bToggleOnSelect = !1);
			});
	}
	OnInit() {
		super.OnInit(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SelectRoleTabOutside,
				this.Iwo,
			);
	}
	OnClear() {
		super.OnClear(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SelectRoleTabOutside,
				this.Iwo,
			);
	}
	OnToggleClick() {
		var e = this.PanelHandle;
		StringUtils_1.StringUtils.IsBlank(e.GroupName) &&
			e.SetToggleSelectByGroupName(this.Listener.GroupName);
	}
	OnHandlePointerSelectInheritance(e) {
		return !this.ywo || (this.ywo = !1);
	}
}
exports.NavigationRoleSkillTreeToggle = NavigationRoleSkillTreeToggle;

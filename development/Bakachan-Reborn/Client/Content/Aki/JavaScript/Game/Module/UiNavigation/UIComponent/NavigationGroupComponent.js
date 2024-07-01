"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationGroupInsideComponent =
		exports.NavigationGroupPrevComponent =
		exports.NavigationGroupNextComponent =
			void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput"),
	UiNavigationLogic_1 = require("../New/UiNavigationLogic"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class NavigationGroupNextComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor() {
		super(...arguments),
			(this.Ubo = (i) => {
				3 === i &&
					UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroupByTag(
						this.GetHotKeyConfig().BindButtonTag,
					);
			});
	}
	OnRelease(i) {
		UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroupByTag(
			i.BindButtonTag,
		);
	}
	OnStartInputAxis(i) {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(
			this.Ubo,
		);
	}
	OnFinishInputAxis(i) {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
			this.Ubo,
		);
	}
	OnClear() {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
			this.Ubo,
		);
	}
	OnRefreshSelfHotKeyState(i) {
		if ((t = i.GetFocusListener())) {
			var t = t.GetNavigationGroup(),
				o = this.GetBindButtonTag();
			let e;
			(e = o ? t.GroupNameMap.Get(o) : t.NextGroupName),
				!StringUtils_1.StringUtils.IsEmpty(e) &&
				(o = i.GetActiveNavigationGroupByNameCheckAll(e))
					? ((t =
							UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(
								o,
							)),
						this.SetVisibleMode(2, t))
					: this.SetVisibleMode(2, !1);
		} else this.SetVisibleMode(2, !1);
	}
}
exports.NavigationGroupNextComponent = NavigationGroupNextComponent;
class NavigationGroupPrevComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor() {
		super(...arguments),
			(this.Abo = (i) => {
				2 === i &&
					UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(
						6,
					);
			});
	}
	OnPress() {
		UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(
			6,
		);
	}
	OnStartInputAxis(i) {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(
			this.Abo,
		);
	}
	OnFinishInputAxis(i) {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
			this.Abo,
		);
	}
	OnClear() {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
			this.Abo,
		);
	}
	OnRefreshSelfHotKeyState(i) {
		var t = i.GetFocusListener();
		t &&
		((t = t.GetNavigationGroup()),
		!StringUtils_1.StringUtils.IsEmpty(t.PrevGroupName)) &&
		(i = i.GetActiveNavigationGroupByNameCheckAll(t.PrevGroupName))
			? ((t =
					UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(i)),
				this.SetVisibleMode(2, t))
			: this.SetVisibleMode(2, !1);
	}
}
exports.NavigationGroupPrevComponent = NavigationGroupPrevComponent;
class NavigationGroupInsideComponent extends HotKeyComponent_1.HotKeyComponent {
	OnRelease() {
		UiNavigationNewController_1.UiNavigationNewController.JumpInsideNavigationGroup();
	}
	OnRefreshSelfHotKeyState(i) {
		(i = i.GetFocusListener()) &&
		UiNavigationNewController_1.UiNavigationNewController.GetCanFocusInsideListener(
			i,
		)
			? this.SetVisibleMode(2, !0)
			: this.SetVisibleMode(2, !1);
	}
}
exports.NavigationGroupInsideComponent = NavigationGroupInsideComponent;

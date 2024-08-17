"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityDescriptionTypeA = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityDescriptionTypeA extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	SetTitleByTextId(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, t);
	}
	SetTitleByText(e) {
		this.GetText(1).SetText(e);
	}
	SetTitleVisible(e) {
		this.GetItem(0).SetUIActive(e);
	}
	SetContentByTextId(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e, t);
	}
	SetContentByText(e) {
		this.GetText(2).SetText(e);
	}
}
exports.ActivityDescriptionTypeA = ActivityDescriptionTypeA;

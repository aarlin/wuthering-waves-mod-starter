"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityUnlockTipView = void 0);
const UE = require("ue"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ActivityUnlockTipView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments), (this.ActivityBaseData = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnAfterShow() {
		this.CloseMe();
	}
	OnStart() {
		(this.ActivityBaseData = this.OpenParam), this.Refresh();
	}
	Refresh() {
		this.SetTitle(this.ActivityBaseData.LocalConfig.Title);
	}
	SetTitle(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
	}
}
exports.ActivityUnlockTipView = ActivityUnlockTipView;

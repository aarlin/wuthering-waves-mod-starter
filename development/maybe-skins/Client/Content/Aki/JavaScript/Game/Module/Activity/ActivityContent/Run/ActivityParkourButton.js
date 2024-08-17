"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityParkourButton = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class ActivityParkourButton extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.c2e = void 0),
			(this.m2e = () => {
				this.c2e?.();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[3, this.m2e]]);
	}
	OnBeforeShow() {
		this.GetText(0).SetText(""), this.GetText(2).SetText("");
	}
	async InitializeAsync(t, e) {
		(this.c2e = e), await this.CreateByActorAsync(t);
	}
	SetFloatText(t, ...e) {
		this.GetText(2).SetUIActive(!0),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), t, e);
	}
	SetBtnText(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), t, e);
	}
}
exports.ActivityParkourButton = ActivityParkourButton;

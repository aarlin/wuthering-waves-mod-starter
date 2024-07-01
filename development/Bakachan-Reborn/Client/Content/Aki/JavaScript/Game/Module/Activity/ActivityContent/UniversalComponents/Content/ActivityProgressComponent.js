"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityProgressComponents = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityProgressComponents extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	SetProgressPercent(e) {
		this.GetSprite(0).SetFillAmount(e);
	}
	SetProgressTextByText(e) {
		this.GetText(1).SetText(e);
	}
	SetTitleByTextId(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e, t);
	}
	SetTitleByText(e) {
		this.GetText(2).SetText(e);
	}
	SetDescriptionByTextId(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e, t);
	}
	SetDescriptionByText(e) {
		this.GetText(3).SetText(e);
	}
}
exports.ActivityProgressComponents = ActivityProgressComponents;

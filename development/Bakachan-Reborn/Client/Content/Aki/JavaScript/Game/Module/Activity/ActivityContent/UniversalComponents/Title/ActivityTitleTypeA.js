"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTitleTypeA = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityTitleTypeA extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UISprite],
		];
	}
	OnStart() {
		this.SetSubTitleVisible(!1);
	}
	SetTitleByTextId(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
	}
	SetTitleByText(e) {
		this.GetText(0).SetText(e);
	}
	SetTimeTextByText(e) {
		this.GetText(1).SetText(e);
	}
	SetTimeTextVisible(e) {
		this.GetText(1).SetUIActive(e);
	}
	SetTimeTextByTextId(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, t);
	}
	SetBgTextureByPath(e, t) {
		this.SetTextureByPath(e, this.GetTexture(2), void 0, t);
	}
	SetBgTextureVisible(e) {
		this.GetTexture(2).SetUIActive(e);
	}
	SetSubTitleVisible(e) {
		this.GetText(3).SetUIActive(e);
	}
	SetSubTitleByTextId(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e, t);
	}
	SetSubTitleByText(e) {
		this.GetText(3).SetText(e);
	}
	SetSubTitleIconVisible(e) {
		this.GetSprite(4).SetUIActive(e);
	}
	SetSubTitleIconByPath(e, t) {
		this.SetSpriteByPath(e, this.GetSprite(4), !1, void 0, t);
	}
}
exports.ActivityTitleTypeA = ActivityTitleTypeA;

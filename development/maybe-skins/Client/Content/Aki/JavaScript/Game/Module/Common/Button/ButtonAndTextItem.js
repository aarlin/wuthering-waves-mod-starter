"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ButtonAndTextItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ButtonAndTextItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.yVe = void 0),
			(this.Kyt = () => {
				this.yVe && this.yVe();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.Kyt]]);
	}
	RefreshText(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), e, t);
	}
	RefreshTextNew(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, t);
	}
	SetText(e) {
		this.GetText(1).SetText(e);
	}
	SetTextColor(e) {
		this.GetText(1).SetColor(e);
	}
	RefreshEnable(e) {
		this.GetButton(0).SetSelfInteractive(e);
	}
	BindCallback(e) {
		this.yVe || (this.yVe = e);
	}
}
exports.ButtonAndTextItem = ButtonAndTextItem;

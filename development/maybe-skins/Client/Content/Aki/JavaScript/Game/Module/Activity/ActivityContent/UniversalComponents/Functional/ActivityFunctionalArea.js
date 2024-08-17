"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityFunctionalArea = void 0);
const UE = require("ue"),
	RedDotController_1 = require("../../../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
	LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityFunctionalArea extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.KFe = void 0),
			(this.FunctionButton = void 0),
			(this.QFe = void 0),
			(this.XFe = () => {
				this.KFe && this.KFe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[4, this.XFe]]);
	}
	OnStart() {
		var t = this.GetItem(6);
		(this.FunctionButton = new ButtonItem_1.ButtonItem(t)),
			this.SetRewardRedDotVisible(!1);
	}
	SetLockTextByTextId(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t, e);
	}
	SetLockTextByText(t) {
		this.GetText(2).SetText(t);
	}
	GetLockSprite() {
		return this.GetSprite(1);
	}
	SetLockSpriteVisible(t) {
		this.GetSprite(1).SetUIActive(t);
	}
	SetPanelConditionVisible(t) {
		this.GetItem(0).SetUIActive(t);
	}
	SetRewardButtonVisible(t) {
		this.GetItem(3).SetUIActive(t);
	}
	SetRewardButtonEnableClick(t) {
		this.GetButton(4).SetSelfInteractive(t);
	}
	SetRewardButtonFunction(t) {
		this.KFe = t;
	}
	SetRewardRedDotVisible(t) {
		this.GetItem(5).SetUIActive(t);
	}
	BindRewardRedDot(t, e = 0) {
		var i = this.GetItem(5);
		i &&
			((this.QFe = t), this.QFe) &&
			RedDotController_1.RedDotController.BindRedDot(t, i, void 0, e);
	}
	UnbindRewardRedDotById(t, e) {
		var i = this.GetItem(5);
		i && RedDotController_1.RedDotController.UnBindGivenUi(t, i, e);
	}
	UnBindRewardRedDot() {
		this.QFe &&
			(RedDotController_1.RedDotController.UnBindRedDot(this.QFe),
			(this.QFe = void 0));
	}
}
exports.ActivityFunctionalArea = ActivityFunctionalArea;

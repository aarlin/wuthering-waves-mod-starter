"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionalPanelConditionActivate =
		exports.FunctionalPanelConditionLock =
		exports.ActivityFunctionalTypeA =
			void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	ButtonAndTextItem_1 = require("../../../../Common/Button/ButtonAndTextItem"),
	LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityFunctionalTypeA extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.FunctionButton = void 0),
			(this.PanelLock = void 0),
			(this.PanelActivate = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		var t = this.GetItem(0);
		(this.PanelLock = new FunctionalPanelConditionLock()),
			await this.PanelLock.CreateByActorAsync(t.GetOwner()),
			(t = this.GetItem(2)),
			(this.PanelActivate = new FunctionalPanelConditionActivate()),
			await this.PanelActivate.CreateByActorAsync(t.GetOwner()),
			(t = this.GetItem(1));
		this.FunctionButton = new ButtonAndTextItem_1.ButtonAndTextItem(t);
	}
	SetLockTextByTextId(t, ...e) {
		this.PanelLock.SetTextByTextId(t, ...e);
	}
	SetLockTextByText(t) {
		this.PanelLock.SetTextByText(t);
	}
	SetLockSpriteVisible(t) {
		this.PanelLock.SetSpriteVisible(t);
	}
	SetPanelConditionVisible(t) {
		this.GetItem(0).SetUIActive(t);
	}
	SetLockConditionButtonVisible(t) {
		this.PanelLock.SetButtonVisible(t);
	}
	SetActivateTextByTextId(t, ...e) {
		this.PanelActivate.SetTextByTextId(t, ...e);
	}
	SetActivateTextByText(t) {
		this.PanelActivate.SetTextByText(t);
	}
	SetActivateSpriteVisible(t) {
		this.PanelActivate.SetSpriteVisible(t);
	}
	SetActivatePanelConditionVisible(t) {
		this.GetItem(2).SetUIActive(t);
	}
	SetFunctionRedDotVisible(t) {
		this.GetItem(3)?.SetUIActive(t);
	}
}
exports.ActivityFunctionalTypeA = ActivityFunctionalTypeA;
class FunctionalPanelConditionLock extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ButtonCallBack = void 0),
			(this.LDn = () => {
				this.ButtonCallBack?.();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[2, this.LDn]]);
	}
	SetTextByTextId(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, e);
	}
	SetTextByText(t) {
		this.GetText(1).SetText(t);
	}
	GetIconSprite() {
		return this.GetSprite(0);
	}
	SetSpriteVisible(t) {
		this.GetSprite(0).SetUIActive(t);
	}
	SetButtonVisible(t) {
		this.GetButton(2).RootUIComp.SetUIActive(t);
	}
}
exports.FunctionalPanelConditionLock = FunctionalPanelConditionLock;
class FunctionalPanelConditionActivate extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
		];
	}
	SetTextByTextId(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, e);
	}
	SetTextByText(t) {
		this.GetText(1).SetText(t);
	}
	GetIconSprite() {
		return this.GetSprite(0);
	}
	SetSpriteVisible(t) {
		this.GetSprite(0).SetUIActive(t);
	}
}
exports.FunctionalPanelConditionActivate = FunctionalPanelConditionActivate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemTipsWithButtonComponent = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	ButtonItem_1 = require("../Button/ButtonItem"),
	ItemTipsComponent_1 = require("./ItemTipsComponent");
class ItemTipsWithButtonComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.gPt = void 0),
			(this.fPt = void 0),
			(this.pPt = (t, e, o) => (
				(e = new ButtonItem_1.ButtonItem(e)).SetFunction(t.Function),
				e.SetShowText(t.Text),
				{ Key: t.Index, Value: e }
			));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIHorizontalLayout],
			[2, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.gPt = new ItemTipsComponent_1.ItemTipsComponent()),
			await this.gPt.CreateByActorAsync(this.GetItem(0).GetOwner());
	}
	OnStart() {
		this.fPt = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetHorizontalLayout(1),
			this.pPt,
		);
	}
	OnBeforeDestroy() {
		this.gPt.Destroy(), this.fPt.ClearChildren();
	}
	RefreshTips(t) {
		this.gPt.Refresh(t);
	}
	RefreshButton(t) {
		this.fPt.RebuildLayoutByDataNew(t);
	}
	ClearButtonList() {
		this.fPt.RebuildLayoutByDataNew([]);
	}
	SetButtonTextByIndex(t, e, o) {
		this.fPt.GetLayoutItemMap().get(t)?.SetLocalText(e, o);
	}
	SetButtonEnableByIndex(t, e) {
		this.fPt.GetLayoutItemMap().get(t)?.SetEnableClick(e);
	}
	SetButtonPanelVisible(t) {
		this.GetHorizontalLayout(1).RootUIComp.SetUIActive(t);
	}
	SetButtonRedDotVisible(t, e) {
		this.fPt.GetLayoutItemMap().get(t)?.SetRedDotVisible(e);
	}
	SetVisible(t) {
		this.SetActive(t);
	}
	SetTipsComponentLockButton(t) {
		this.gPt.SetTipsComponentLockButton(t);
	}
}
exports.ItemTipsWithButtonComponent = ItemTipsWithButtonComponent;

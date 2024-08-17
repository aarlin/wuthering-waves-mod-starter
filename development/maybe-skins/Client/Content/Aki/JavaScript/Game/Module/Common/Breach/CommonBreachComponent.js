"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonBreachComponent = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayoutAdd_1 = require("../../Util/GenericLayoutAdd"),
	UiComponentUtil_1 = require("../../Util/UiComponentUtil"),
	ButtonItem_1 = require("../Button/ButtonItem"),
	CommonCostItem_1 = require("../PropItem/CommonCostItem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonBreachComponent extends UiPanelBase_1.UiPanelBase {
	constructor(t, e = !1) {
		super(),
			(this.Hyt = e),
			(this.BreachItem = void 0),
			(this.DisItem = void 0),
			(this.CostItemList = []),
			(this.ScrollView = void 0),
			(this.EnoughMaterial = !0),
			(this.EnoughMoney = !0),
			(this.MoneyId = 0),
			(this.jyt = () => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					this.MoneyId,
				);
			}),
			(this.Wyt = (t, e, o) => {
				var [t, n] = t;
				return (
					(t =
						((e = new CommonCostItem_1.CommonCostItem(e)).UpdateItem(t, n),
						this.CostItemList.push(e),
						ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
							t,
						))) < n && (this.EnoughMaterial = !1),
					{ Key: o, Value: e }
				);
			}),
			(this.ClearCostItem = () => {
				for (const t of this.CostItemList.values()) t.Destroy();
				this.CostItemList = [];
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UILayoutBase],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
			[8, UE.UITexture],
		]),
			(this.BtnBindInfo = [[1, this.jyt]]);
	}
	OnStart() {
		(this.BreachItem = new ButtonItem_1.ButtonItem(this.GetItem(0))),
			(this.ScrollView = new GenericLayoutAdd_1.GenericLayoutAdd(
				this.GetLayoutBase(5),
				this.Wyt,
			)),
			this.SetDisButtonEnableClick(!1);
	}
	SetMoneyActive(t) {
		this.GetButton(1).RootUIComp.SetUIActive(t);
	}
	UpdateMoneyState(t, e) {
		this.SetMoneyActive(!0), (this.MoneyId = t);
		var o = this.GetText(2),
			n = this.GetText(3),
			i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(t);
		(this.EnoughMoney = UiComponentUtil_1.UiComponentUtil.SetMoneyState(
			o,
			n,
			e,
			i,
		)),
			this.SetItemIcon(this.GetTexture(8), t);
	}
	UpdateMaterialState(t) {
		this.ScrollView.ClearChildren(),
			(this.EnoughMaterial = !0),
			t &&
				((t = Array.from(t)),
				this.ScrollView.AddItemToLayout(t, this.Hyt ? 1 : 0));
	}
	OnBeforeDestroy() {
		this.ScrollView.ClearChildren();
	}
	UpdateComponent(t, e, o = void 0) {
		this.UpdateMoneyState(t, e), this.UpdateMaterialState(o);
	}
	UpdateMoney(t, e) {
		this.ClearCostItem(),
			this.GetItem(4).SetUIActive(!1),
			this.UpdateMoneyState(t, e);
	}
	UpdateMaterial(t) {
		this.SetMoneyActive(!1), this.UpdateMaterialState(t);
	}
	SetBreachFunction(t) {
		this.BreachItem.SetFunction(t);
	}
	GetEnoughMoney() {
		return this.EnoughMoney;
	}
	GetEnoughMaterial() {
		return this.EnoughMaterial;
	}
	GetEnoughAll() {
		return this.EnoughMaterial && this.EnoughMoney;
	}
	SetBreachButtonEnableClick(t) {
		this.BreachItem.SetEnableClick(t);
	}
	SetBreachButtonText(t) {
		this.BreachItem.SetText(t);
	}
	SetBreachButtonLocalText(t, ...e) {
		this.BreachItem.SetLocalText(t, e);
	}
	SetBreachButtonShowText(t) {
		this.BreachItem.SetShowText(t);
	}
	SetCostItemShowOrHide(t) {
		this.GetItem(6).SetUIActive(t);
	}
	SetDisFunction(t) {
		this.GetButton(7).OnClickCallBack.Bind(t);
	}
	SetDisButtonEnableClick(t) {
		this.GetButton(7).RootUIComp.SetUIActive(t);
	}
}
exports.CommonBreachComponent = CommonBreachComponent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopRechargeView = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	PayItemController_1 = require("../../PayItem/PayItemController"),
	DiscountShopView_1 = require("./DiscountShopView"),
	PayShopRechargeItem_1 = require("./TabItem/PayShopRechargeItem");
class PayShopRechargeView extends DiscountShopView_1.DiscountShopView {
	constructor() {
		super(...arguments),
			(this.rFi = !1),
			(this.InitItem = () => new PayShopRechargeItem_1.PayShopRechargeItem()),
			(this.GetProxyData = (e) => this.PayShopGoodsList[e]),
			(this.UEe = (e) => {}),
			(this.lFi = () => {
				var e;
				this.rFi
					? this.RefreshLoopScroll(this.CurrentSelectTabId)
					: ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
							138,
						)).FunctionMap.set(1, () => {
							this.RefreshLoopScroll(this.CurrentSelectTabId);
						}),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							e,
						)),
					(this.rFi = !1);
			});
	}
	GetScrollItem() {
		return this.GetItem(6);
	}
	AddEventListener() {
		super.AddEventListener(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RefreshPayItemList,
				this.lFi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPayItemSuccess,
				this.UEe,
			);
	}
	RemoveEventListener() {
		super.RemoveEventListener(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RefreshPayItemList,
				this.lFi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPayItemSuccess,
				this.UEe,
			);
	}
	RefreshLoopScroll(e) {
		var t = ModelManager_1.ModelManager.PayItemModel.GetDataList().sort(
				(e, t) => e.ItemCount - t.ItemCount,
			),
			o = new Array();
		for (const e of t)
			ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(e.PayItemId)
				.IsDisplay && o.push(e);
		(this.PayShopGoodsList = o),
			this.LoopScrollView.ReloadProxyData(
				this.GetProxyData,
				this.PayShopGoodsList.length,
				!1,
			),
			this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(!0);
	}
	OnBeforeShow() {
		this.GetItem(4).SetUIActive(!1),
			this.TabGroup.SetActive(!1),
			(this.rFi = !0),
			this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(!1),
			PayItemController_1.PayItemController.SendPayItemInfoRequest();
	}
	OnDiscountShopAfterShow() {
		this.GetText(5).SetUIActive(!0);
	}
}
exports.PayShopRechargeView = PayShopRechargeView;

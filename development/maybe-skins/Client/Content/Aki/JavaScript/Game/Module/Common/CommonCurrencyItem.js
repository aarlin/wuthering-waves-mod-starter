"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonCurrencyItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class CommonCurrencyItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.gIt = 0),
			(this.SkipAutoAddEvent = !1),
			(this.Qyt = void 0),
			(this.fIt = void 0),
			(this.j7e = () => {
				this.fIt?.(), this.Qyt?.(this.gIt);
			}),
			(this.pIt = () => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					this.gIt,
				);
			}),
			(this.vIt = () => {
				this.RefreshCountText();
			}),
			(this.MIt = (e) => {
				for (const t of e)
					if (this.gIt === t.Ekn) return void this.RefreshCountText();
			}),
			(this.SIt = (e) => {
				e.includes(this.gIt) && this.RefreshCountText();
			}),
			(this.EIt = (e, t, n) => {
				this.gIt === e.Ekn && this.RefreshCountText();
			}),
			(this.yIt = (e) => {
				e === ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency()
					? ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge()
					: e === ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency() &&
						ControllerHolder_1.ControllerHolder.ItemExchangeController.OpenExchangeViewByItemId(
							e,
						);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UITextureTransitionComponent],
		]),
			(this.BtnBindInfo = [
				[2, this.j7e],
				[3, this.pIt],
			]);
	}
	OnStart() {
		this.SkipAutoAddEvent || this.AddEventListener();
	}
	OnBeforeDestroy() {
		this.SkipAutoAddEvent || this.RemoveEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PayShopGoodsBuy,
			this.vIt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlayerCurrencyChange,
				this.vIt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddCommonItemList,
				this.MIt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveCommonItem,
				this.SIt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnCommonItemCountRefresh,
				this.EIt,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PayShopGoodsBuy,
			this.vIt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlayerCurrencyChange,
				this.vIt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddCommonItemList,
				this.MIt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveCommonItem,
				this.SIt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnCommonItemCountRefresh,
				this.EIt,
			);
	}
	IIt() {
		const e = this.GetTexture(0);
		e.SetUIActive(!1),
			this.SetItemIcon(this.GetTexture(0), this.gIt, void 0, () => {
				this.TIt(), e.SetUIActive(!0);
			});
	}
	TIt() {
		var e = this.GetUiTextureTransitionComponent(4);
		e && e.SetAllStateTexture(this.GetTexture(0).GetTexture());
	}
	RefreshTemp(e, t) {
		this.ShowWithoutText(e), this.RefreshCountText(t);
	}
	ShowWithoutText(e) {
		(this.gIt = e), this.IIt();
	}
	RefreshCountText(e) {
		var t = this.GetText(1);
		e =
			e ??
			ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				this.gIt,
			);
		t?.SetText(e.toString());
	}
	SetCountText(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), e, ...t);
	}
	SetButtonFunction(e) {
		this.Qyt = e;
	}
	SetBeforeButtonFunction(e) {
		this.fIt = e;
	}
	SetButtonActive(e) {
		this.GetButton(2).RootUIComp.SetUIActive(e);
	}
	SetToPayShopFunction() {
		this.Qyt = this.yIt;
	}
	SetPayShopButtonActive() {
		var e = ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency(),
			t = ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency(),
			n = this.GetButton(2);
		this.gIt !== e && this.gIt !== t
			? n.RootUIComp.SetUIActive(!1)
			: n.RootUIComp.SetUIActive(!0);
	}
}
exports.CommonCurrencyItem = CommonCurrencyItem;

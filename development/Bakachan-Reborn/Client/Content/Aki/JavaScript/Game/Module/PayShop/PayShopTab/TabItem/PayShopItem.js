"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	PayShopGoods_1 = require("../../PayShopData/PayShopGoods"),
	PayShopItemBase_1 = require("./PayShopItemBase");
class PayShopItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.dFi = !1),
			(this.CFi = !1),
			(this.Pe = void 0),
			(this.gFi = void 0),
			(this.fFi = !1),
			(this.pFi = 0),
			(this.vFi = !1),
			(this.MFi = ""),
			(this.SFi = 0),
			(this.EFi = !1),
			(this.yFi = !1),
			(this.IFi = !1),
			(this.TFi = !1),
			(this.LFi = !1),
			(this.DFi = !0),
			(this.jbe = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 点击商品", [
						"Id",
						this.Pe.GetGoodsData().Id,
					]),
					ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(
						this.Pe,
					);
			}),
			(this.YOi = () => {
				this.Pe &&
					this.IsUiActiveInHierarchy() &&
					this.gFi.Refresh(this.Pe.ConvertToPayShopBaseSt(), !1, 0);
			}),
			(this.RFi = () => {
				if (this.Pe && this.IsUiActiveInHierarchy()) {
					let t = !1;
					this.UFi() && (t = !0),
						this.wkt() && (t = !0),
						this.AFi(),
						this.PFi(),
						this.xFi(),
						this._pt(),
						this.wFi(),
						this.BFi(),
						this.gFi.OnTimerRefresh(this.Pe.ConvertToPayShopBaseSt(), !1, 0),
						t && this.TryEmitRefreshTips();
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UIText],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIText],
			[15, UE.UIItem],
			[16, UE.UIText],
		]),
			(this.BtnBindInfo = [[8, this.jbe]]);
	}
	HideExchangePopViewElement() {
		this.SetRaycastState(!1),
			this.SetDownPriceShowState(!1),
			this.SetForceHideReUpTextState(!0),
			this.SetResellShowState(!0),
			this.SetDisableSelfInteractiveState(!0),
			this.SetLeftTimeTextShowState(!1),
			this.SetRedDotState(!1);
	}
	HidePackageViewElement() {
		this.SetRaycastState(!1),
			this.SetForceHideReUpTextState(!0),
			this.SetResellShowState(!0),
			this.SetDisableSelfInteractiveState(!0),
			this.SetLeftTimeTextShowState(!1),
			this.gFi.SetDownPriceOnlyShow(!0),
			this.SetRedDotState(!1);
	}
	SetRaycastState(t) {
		this.RootItem.SetRaycastTarget(t),
			this.gFi.GetRootItem().SetRaycastTarget(t),
			this.GetButton(8).SetCanClickWhenDisable(t);
	}
	SetResellShowState(t) {
		this.IFi = t;
	}
	SetDisableSelfInteractiveState(t) {
		this.TFi = t;
	}
	SetForceHideReUpTextState(t) {
		this.LFi = t;
	}
	SetDownPriceShowState(t) {
		this.gFi.SetDownPriceShowState(t);
	}
	OnStart() {
		this.GetItem(12).SetUIActive(!1),
			(this.gFi = new PayShopItemBase_1.PayShopItemBase(this.GetItem(0))),
			this.gFi.Init(),
			(this.dFi = this.GetItem(5).bIsUIActive),
			(this.CFi = this.GetItem(1).bIsUIActive),
			(this.fFi = this.GetItem(4).bIsUIActive),
			(this.vFi = this.GetText(7).bIsUIActive),
			(this.EFi = !1),
			(this.yFi = !1),
			(this.DFi = this.GetItem(12).bIsActive),
			this.GetButton(8).SetCanClickWhenDisable(!0),
			this.dde();
	}
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.DiscountShopTimerRefresh,
			this.RFi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnQueryProductInfo,
				this.YOi,
			);
	}
	Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.DiscountShopTimerRefresh,
			this.RFi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnQueryProductInfo,
				this.YOi,
			);
	}
	Refresh(t, e, i) {
		t instanceof PayShopGoods_1.PayShopGoods &&
			((this.Pe = t),
			this.gFi.Refresh(t.ConvertToPayShopBaseSt(), e, i),
			this.O8e(),
			this.UFi(),
			this.wkt(),
			this.AFi(),
			this.PFi(),
			this.xFi(),
			this._pt(),
			this.bFi(),
			this.wFi(),
			this.BFi());
	}
	O8e() {
		this.GetItem(15).SetUIActive(!1), (this.yFi = !1);
	}
	BFi() {
		let t = !this.Pe.IfCanBuy();
		t && this.TFi && (t = !1);
		var e = void 0,
			i = void 0;
		this.yFi !== t &&
			((e = this.GetItem(15)),
			(i = this.GetText(16)),
			(this.yFi = t),
			e.SetUIActive(t),
			t) &&
			i.SetText(this.Pe.GetConditionLimitText());
	}
	_pt() {
		var t = this.Pe.IsSoldOut();
		let e = this.Pe.IsLimitGoods() && t;
		e && this.TFi && (e = !1),
			this.EFi !== e &&
				((this.EFi = e), this.GetItem(13)?.SetUIActive(e), t) &&
				this.GetText(14)?.SetText(this.Pe.GetDownTipsText());
	}
	xFi() {
		let t = !1;
		(t =
			0 < this.Pe.GetDiscountLabel() &&
			(!!this.Pe.InLabelShowTime() || (this.Pe.InLabelShowTime(), !1))),
			this.fFi !== t && (this.GetItem(4).SetUIActive(t), (this.fFi = t));
	}
	wFi() {
		var t = this.fFi || this.CFi;
		this.DFi !== t && ((this.DFi = t), this.GetItem(12).SetUIActive(t));
	}
	AFi() {
		var t = this.Pe.GetDiscountLabel();
		0 < t &&
			this.Pe.InLabelShowTime() &&
			this.pFi !== t &&
			((this.pFi = t),
			(t = ConfigManager_1.ConfigManager.PayShopConfig.GetShopDiscountLabel(t)),
			this.GetText(11).ShowTextNew(t));
	}
	wkt() {
		var t = this.Pe.GetCountDownData();
		let e = !1;
		if (0 === t[2])
			this.dFi && (this.GetItem(5).SetUIActive(!1), (this.dFi = !1), (e = !0));
		else {
			let i = t[1];
			if (((t = t[0]), (i = this.IFi ? void 0 : i) && 2 !== t)) {
				if (
					(this.dFi ||
						(this.GetItem(5).SetUIActive(!0), (this.dFi = !0), (e = !0)),
					(t = this.GetText(6)),
					"string" == typeof i)
				)
					return t.SetText(i), e;
				LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.TimeValue);
			} else
				this.dFi &&
					(this.GetItem(5).SetUIActive(!1), (this.dFi = !1), (e = !0));
		}
		return e;
	}
	PFi() {
		var t = this.Pe.GetResellText();
		let e = !StringUtils_1.StringUtils.IsEmpty(t);
		this.IFi && (e = !1),
			this.MFi !== t &&
				((this.MFi = t), e) &&
				((t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(t)),
				this.GetText(7).SetText(t)),
			this.vFi !== e && ((this.vFi = e), this.GetText(7).SetUIActive(e));
	}
	UFi() {
		var t = this.GetItem(1),
			e = this.Pe.HasDiscount();
		let i = !1;
		return (
			this.CFi !== e && (t.SetUIActive(e), (this.CFi = e), (i = !0)),
			this.CFi &&
				(t = this.Pe.GetDiscount()) !== this.SFi &&
				((this.SFi = t),
				this.GetText(2).SetText(
					StringUtils_1.StringUtils.Format("-{0}%", t.toString()),
				),
				(i = !0)),
			i
		);
	}
	bFi() {
		var t, e;
		this.LFi
			? this.GetItem(5).SetUIActive(!1)
			: this.dFi ||
				(2 === (t = this.Pe.GetCountDownData())[0]
					? ((t = t[1]),
						this.GetItem(5).SetUIActive(!0),
						this.gFi.SetLeftTimeTextShowState(!1),
						(e = this.GetText(6)),
						"string" == typeof t
							? e.SetText(t)
							: LguiUtil_1.LguiUtil.SetLocalText(e, t.TextId, t.TimeValue))
					: (this.GetItem(5).SetUIActive(!1),
						this.gFi.SetLeftTimeTextShowState(!0)));
	}
	SetLeftTimeTextShowState(t) {
		this.gFi.SetLeftTimeTextShowState(t);
	}
	SetNameTextShowState(t) {
		this.gFi.SetNameTextShowState(t);
	}
	SetRedDotState(t) {
		(this.gFi.RefreshRedDotState = t), this.gFi.SetRedDotVisible(t);
	}
	TryEmitRefreshTips() {
		ControllerHolder_1.ControllerHolder.PayShopController.ClosePayShopGoodDetailPopView(),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() ||
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RefreshPayShop,
					this.Pe.PayShopId,
					!0,
				);
	}
	OnBeforeDestroy() {
		this.Cde();
	}
}
exports.PayShopItem = PayShopItem;

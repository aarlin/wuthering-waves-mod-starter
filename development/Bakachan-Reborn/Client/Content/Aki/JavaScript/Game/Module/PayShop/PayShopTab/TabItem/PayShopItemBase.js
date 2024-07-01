"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopItemBase = exports.PayShopItemBaseSt = void 0);
const UE = require("ue"),
	LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	HelpController_1 = require("../../../Help/HelpController"),
	PayShopGoods_1 = require("../../PayShopData/PayShopGoods"),
	PayShopDefine_1 = require("../../PayShopDefine"),
	NORMALCOLOR = "000000FF",
	REDCOLOR = "BA5C59FF";
class PayShopItemBaseSt {
	constructor() {
		(this.Id = 0),
			(this.Quality = 0),
			(this.ItemId = 0),
			(this.ItemCount = 0),
			(this.ItemName = ""),
			(this.IsDirect = !1),
			(this.PriceData = void 0),
			(this.IfRechargeItem = !1),
			(this.StageImage = ""),
			(this.GetShopTipsText = void 0),
			(this.GetIfNeedShowDownTipsText = void 0),
			(this.GetDownTipsText = void 0),
			(this.GetSpriteTextBgColor = void 0),
			(this.GetTextTipsColor = void 0),
			(this.RedDotExistFunc = void 0),
			(this.GetDirectPriceTextFunc = void 0),
			(this.bor = "");
	}
	Refresh(e) {
		this.bor !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
			(e instanceof PayShopGoods_1.PayShopGoods
				? this.PhraseFromPayItemData(e)
				: this.PhrasePromPayItemData(e));
	}
	PhraseFromPayItemData(e) {
		(this.Quality = e.GetItemData().Quality),
			(this.ItemId = e.GetItemData().ItemId),
			(this.ItemCount = e.GetGoodsData().ItemCount),
			(this.ItemName = e
				.GetGoodsData()
				.GetGoodsName(LanguageSystem_1.LanguageSystem.PackageLanguage)),
			(this.IsDirect = e.IsDirect()),
			(this.Id = e.GetGoodsData().Id),
			(this.StageImage = e.GetGoodsData().StageImage),
			(this.PriceData = e.GetPriceData()),
			(this.GetShopTipsText = () => e.GetShopTipsText()),
			(this.GetIfNeedShowDownTipsText = () => e.GetIfNeedShowDownTipsText()),
			(this.GetDownTipsText = () => e.GetDownTipsText()),
			(this.GetTextTipsColor = () => e.GetTextTipsColor()),
			(this.GetSpriteTextBgColor = () => e.GetSpriteTextBgColor()),
			(this.GetDirectPriceTextFunc = () => e.GetDirectPriceText()),
			(this.RedDotExistFunc = () =>
				!(!e.IfCanBuy() || e.IsLocked() || e.IsSoldOut() || this.IsDirect) &&
				0 === e.GetPriceData().NowPrice),
			(this.bor = LanguageSystem_1.LanguageSystem.PackageLanguage);
	}
	PhrasePromPayItemData(e) {
		var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
			e.ItemId,
		);
		(this.Quality = t.QualityId),
			(this.ItemId = e.ItemId),
			(this.ItemCount = e.ItemCount),
			(this.StageImage = e.StageImage),
			(this.ItemName = e.GetPayItemShowName()),
			(this.IsDirect = !0),
			(this.Id = e.PayItemId),
			this.IsDirect &&
				(this.GetDirectPriceTextFunc = () => e.GetDirectPriceText()),
			(this.IfRechargeItem = !0),
			(this.bor = LanguageSystem_1.LanguageSystem.PackageLanguage);
	}
}
exports.PayShopItemBaseSt = PayShopItemBaseSt;
class PayShopItemBase extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Pe = void 0),
			(this.wqe = void 0),
			(this.qFi = !1),
			(this.hJ = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.GFi = void 0),
			(this.JGn = ""),
			(this.qni = () => {
				HelpController_1.HelpController.OpenHelpById(
					PayShopDefine_1.MONTH_CARD_HELP_ID,
				);
			}),
			(this.NFi = !0),
			(this.RefreshRedDotState = !0),
			(this.wqe = e);
	}
	Init() {
		this.SetRootActor(this.wqe.GetOwner(), !0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UITexture],
			[3, UE.UIButtonComponent],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UITexture],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UITexture],
			[13, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.qni]]);
	}
	SetDownPriceShowState(e) {
		this.GetSprite(1).SetUIActive(e),
			this.GetItem(6).SetUIActive(e),
			this.GetText(10).SetUIActive(e);
	}
	SetDownPriceOnlyShow(e) {
		this.GetSprite(1).SetUIActive(e),
			this.GetItem(6).SetUIActive(e),
			this.GetText(10).SetUIActive(!e);
	}
	OnTimerRefresh(e, t, i) {
		(this.Pe && this.Pe.Id === e.Id) || (this.qFi = !1),
			(this.Pe = e),
			this.OFi();
	}
	Refresh(e, t, i) {
		(this.Pe && this.Pe.Id === e.Id) || (this.qFi = !1),
			(this.Pe = e),
			this.kFi(),
			this.Aqe(),
			this.FFi(),
			this.VFi(),
			this.HFi(),
			this.jFi(),
			this.OFi();
	}
	OFi() {
		this.WFi(), this.i2i(), this.KFi(), this.QFi(), this.RefreshRedDot();
	}
	OnBeforeDestroy() {
		this.XFi();
	}
	QFi() {
		var e;
		this.Pe.GetTextTipsColor &&
			((e = this.Pe.GetTextTipsColor()),
			this.GetText(10).SetColor(UE.Color.FromHex(e)));
	}
	HFi() {
		var e = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
		this.GetButton(3).RootUIComp.SetUIActive(this.Pe.Id === e);
	}
	kFi() {
		var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
			this.Pe.Quality,
		).PayShopQualitySprite;
		this.SetSpriteByPath(e, this.GetSprite(0), !1);
	}
	Aqe() {
		let e = this.GetTexture(2);
		var t,
			i =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
					this.Pe.ItemId,
				);
		this.Pe.IfRechargeItem
			? (e.SetUIActive(!1),
				(e = this.GetTexture(12)).SetUIActive(!0),
				(t = this.Pe.StageImage),
				this.SetTextureByPath(t, e))
			: "" !== this.Pe.StageImage
				? ((t = this.Pe.StageImage), this.SetTextureByPath(t, e))
				: (1 === i
						? ((t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
								this.Pe.ItemId,
							)),
							this.SetRoleIcon(t.Card, e, this.Pe.ItemId))
						: this.SetItemIcon(e, this.Pe.ItemId),
					this.XFi(),
					this.$Fi());
	}
	XFi() {
		this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId &&
			(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ),
			(this.hJ = ResourceSystem_1.ResourceSystem.InvalidId));
	}
	$Fi() {
		var e =
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
				this.Pe.ItemId,
			);
		const t = this.GetTexture(2);
		3 === e
			? ((e =
					ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
						"MI_HeadYuan",
					)),
				(this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(
					e,
					UE.MaterialInterface,
					(e) => {
						t.SetCustomUIMaterial(e);
					},
					102,
				)))
			: t.SetCustomUIMaterial(void 0);
	}
	FFi() {
		this.qFi || (this.GetText(5).SetText(this.Pe.ItemName), (this.qFi = !0));
	}
	VFi() {
		var e,
			t = this.GetTexture(7);
		this.Pe.IsDirect || 0 === (e = this.Pe.PriceData).NowPrice
			? t.SetUIActive(!1)
			: (t.SetUIActive(!0), this.SetItemIcon(t, e.CurrencyId));
	}
	WFi() {
		var e,
			t = this.GetText(9);
		!this.Pe.IsDirect &&
		(e = this.Pe.PriceData).OriginalPrice &&
		e.InDiscountTime
			? (t.SetUIActive(!0), t.SetText(`<s>${e.OriginalPrice.toString()}</s>`))
			: t.SetUIActive(!1);
	}
	i2i() {
		let e = "000000FF";
		var t, i;
		!this.Pe.IsDirect &&
			this.Pe.PriceData.OwnNumber() < this.Pe.PriceData.NowPrice &&
			(e = REDCOLOR),
			(this.GFi && this.GFi === this.Pe.PriceData && this.JGn === e) ||
				((this.JGn = e),
				(this.GFi = this.Pe?.PriceData),
				(t = this.GetText(8)),
				this.Pe.IsDirect
					? (i = this.Pe.GetDirectPriceTextFunc?.()) &&
						(t.SetText(i), t.SetColor(UE.Color.FromHex(e)))
					: (0 === (i = this.Pe.PriceData).NowPrice
							? t.ShowTextNew("ShopDiscountLabel_4")
							: t.SetText(i.NowPrice.toString()),
						(i = e),
						t.SetColor(UE.Color.FromHex(i))));
	}
	KFi() {
		var e,
			t = this.Pe.GetShopTipsText?.();
		this.NFi && !StringUtils_1.StringUtils.IsEmpty(t)
			? ((e = this.GetText(4)).SetUIActive(!0), e.SetText(t))
			: this.GetText(4).SetUIActive(!1);
	}
	SetLeftTimeTextShowState(e) {
		(this.NFi = e),
			this.Pe &&
				((e = this.Pe.GetShopTipsText?.()),
				this.GetText(4).SetUIActive(
					this.NFi && !StringUtils_1.StringUtils.IsEmpty(e),
				));
	}
	SetNameTextShowState(e) {
		this.GetText(5).SetUIActive(e);
	}
	SetRedDotVisible(e) {
		this.GetItem(11).SetUIActive(e);
	}
	RefreshRedDot() {
		this.RefreshRedDotState &&
			this.Pe.RedDotExistFunc &&
			this.SetRedDotVisible(this.Pe.RedDotExistFunc());
	}
	jFi() {
		this.GetItem(13)?.SetUIActive(!this.Pe.IfRechargeItem);
	}
}
exports.PayShopItemBase = PayShopItemBase;

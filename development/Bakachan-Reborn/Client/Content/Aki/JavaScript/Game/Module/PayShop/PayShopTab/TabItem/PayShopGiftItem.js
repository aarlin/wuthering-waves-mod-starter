"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopGiftItem = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager"),
	HelpController_1 = require("../../../Help/HelpController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	SOLDOUT_ALPHA = 0.6;
class PayShopGiftItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e, t = void 0) {
		super(),
			(this.Data = void 0),
			(this.SellTimerId = void 0),
			(this.DiscountTimerId = void 0),
			(this.ToggleFunction = void 0),
			(this.QBt = void 0),
			(this.uFi = !1),
			(this.O3e = 0),
			(this.xIt = void 0),
			(this.x4e = () => {
				this.GetExtendToggle(0).SetToggleState(0, !1),
					this.ToggleFunction(this.Data.GetGoodsId());
			}),
			(this.qni = () => {
				HelpController_1.HelpController.OpenHelpById(this.O3e);
			}),
			(this.i2i = (e) => {
				var t = this.Data.GetGoodsData();
				t.IsDirect() || (t.Price.Id === e && this.SetPrice());
			}),
			(this.cFi = () => {
				(this.DiscountTimerId = void 0),
					this.SetDiscountTime(),
					this.Data.HasDiscount() ||
						(this.SetPrice(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.GoodsRefreshDiscountTime,
							this.Data.GetGoodsId(),
						));
			}),
			(this.$Bt = LguiResourceManager_1.LguiResourceManager.InvalidId),
			(this.mFi = e),
			t && this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UITexture],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UIText],
			[12, UE.UIItem],
			[13, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.x4e],
				[13, this.qni],
			]);
	}
	OnStart() {
		this.GetButton(13).RootUIComp.SetUIActive(!1);
	}
	AddEventListener() {
		this.uFi ||
			((this.uFi = !0),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlayerCurrencyChange,
				this.i2i,
			));
	}
	RemoveEventListener() {
		this.uFi &&
			((this.uFi = !1),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlayerCurrencyChange,
				this.i2i,
			));
	}
	SetBelongViewName(e) {
		this.xIt = e;
	}
	Refresh(e) {
		this.AddEventListener(), this.RefreshGiftItem(e);
	}
	RefreshGiftItem(e) {
		(this.Data = e), this.RefreshState();
	}
	Clear() {
		this.RemoveEventListener(),
			this.RemoveSellTimer(),
			this.RemoveDiscountTimer();
	}
	OnBeforeDestroy() {
		this.RemoveEventListener(),
			this.RemoveSellTimer(),
			this.RemoveDiscountTimer(),
			LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.$Bt);
	}
	RefreshState() {
		var e = this.Data.GetItemData();
		this.SetQuality(e.Quality),
			this.SetIcon(),
			this.SetTips(),
			this.SetPrice(),
			this.SetDiscountTime(),
			this.SetSellTime(),
			this.SetName(e.Name),
			this.ShowDebugText();
	}
	SetQuality(e) {
		let t = (e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e))
			.PayShopTexture;
		1 === this.mFi && (t = e.NewPayShopTexture),
			this.SetTextureByPath(t, this.GetTexture(2));
	}
	SetIcon() {
		var e = this.GetTexture(1);
		this.SetItemIcon(e, this.Data.GetItemData().ItemId, this.xIt);
	}
	SetTips() {
		this.RootItem.SetAlpha(1);
		var e,
			t = this.GetText(4);
		this.Data.IsLocked()
			? ((e = this.Data.GetConditionTextId()),
				LguiUtil_1.LguiUtil.SetLocalTextNew(t, e),
				t.SetUIActive(!0),
				this.RootItem.SetAlpha(0.6))
			: this.Data.IsLimitGoods()
				? (t.SetUIActive(!0),
					this.Data.IsSoldOut()
						? (LguiUtil_1.LguiUtil.SetLocalText(t, "SoldoutText"),
							this.RootItem.SetAlpha(0.6))
						: ((e = this.Data.GetRemainingData()),
							LguiUtil_1.LguiUtil.SetLocalText(t, e.TextId, e.Count)))
				: t.SetUIActive(!1);
	}
	SetPrice() {
		var e,
			t = this.GetText(7),
			i = this.GetTexture(5),
			s = this.GetText(6);
		this.Data.IsDirect()
			? (t.SetUIActive(!1),
				i.SetUIActive(!1),
				(e = this.Data.GetDirectPriceText()),
				s.SetText(e))
			: (i.SetUIActive(!0),
				(e = this.Data.GetPriceData()).OriginalPrice
					? (t.SetUIActive(!0),
						t.SetText(`<s>${e.OriginalPrice.toString()}</s>`))
					: t.SetUIActive(!1),
				s.SetText(e.NowPrice.toString()),
				s.SetChangeColor(e.OwnNumber() < e.NowPrice, s.changeColor),
				this.SetItemIcon(i, e.CurrencyId));
	}
	SetDiscountTime() {
		this.RemoveDiscountTimer();
		var e,
			t = this.GetItem(8),
			i = this.GetText(10),
			s = this.GetItem(9);
		this.Data.HasDiscount()
			? (t.SetUIActive(!0),
				(e = this.Data.IsPermanentDiscount()),
				s.SetUIActive(!e),
				(s = this.Data.GetDiscount()),
				i.SetText("-" + s + "%"),
				e ||
					((i = this.Data.GetDiscountRemainTime()),
					(this.DiscountTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(
						this.cFi,
						i.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND,
					))))
			: t.SetUIActive(!1);
	}
	SetSellTime() {
		this.RemoveSellTimer();
		var e,
			t,
			i = this.GetItem(12);
		this.Data.IsPermanentSell()
			? i.SetUIActive(!1)
			: this.Data.InSellTime() &&
				((e = this.Data.GetEndTimeRemainData()),
				(t = this.GetText(11)),
				i.SetUIActive(!0),
				"string" == typeof e
					? t.SetText(e)
					: (LguiUtil_1.LguiUtil.SetLocalText(t, e.TextId, e.TimeValue),
						(this.SellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(() => {
							(this.SellTimerId = void 0), this.SetSellTime();
						}, e.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND))));
	}
	SetName(e) {
		var t,
			i = this.GetText(3),
			s = this.Data.GetGoodsData();
		1 < s.ItemCount
			? ((t = new LguiUtil_1.TableTextArgNew(e)),
				LguiUtil_1.LguiUtil.SetLocalText(i, "GoodsName", t, s.ItemCount))
			: i.ShowTextNew(e);
	}
	ShowDebugText() {
		GlobalData_1.GlobalData.IsPlayInEditor &&
			(this.QBt
				? this.QBt?.SetText(this.Data.GetGoodsId().toString())
				: (LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.$Bt),
					(this.$Bt =
						LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
							"UiItem_DebugText_Prefab",
							this.RootItem,
							(e) => {
								(this.$Bt =
									LguiResourceManager_1.LguiResourceManager.InvalidId),
									(this.QBt = e.GetComponentByClass(UE.UIText.StaticClass())),
									this.QBt?.SetText(this.Data.GetGoodsId().toString());
							},
						))));
	}
	RemoveSellTimer() {
		void 0 !== this.SellTimerId &&
			(TimerSystem_1.RealTimeTimerSystem.Remove(this.SellTimerId),
			(this.SellTimerId = void 0));
	}
	RemoveDiscountTimer() {
		void 0 !== this.DiscountTimerId &&
			(TimerSystem_1.RealTimeTimerSystem.Remove(this.DiscountTimerId),
			(this.DiscountTimerId = void 0));
	}
	SetToggleFunction(e) {
		this.ToggleFunction = e;
	}
	SetTipsIdAndShowTipsButton(e) {
		this.GetButton(13).RootUIComp.SetUIActive(!0), (this.O3e = e);
	}
}
exports.PayShopGiftItem = PayShopGiftItem;

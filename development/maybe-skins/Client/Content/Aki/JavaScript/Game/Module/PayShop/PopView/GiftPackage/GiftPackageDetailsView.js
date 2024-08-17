"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GiftPackageDetailsView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	PayShopItem_1 = require("../../PayShopTab/TabItem/PayShopItem"),
	GiftPackageMonthlyCardItem_1 = require("./GiftPackageMonthlyCardItem"),
	GiftPackageSupplyPackItem_1 = require("./GiftPackageSupplyPackItem");
class GiftPackageDetailsView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.i3i = void 0),
			(this.Data = void 0),
			(this.Goods = void 0),
			(this.GoodsData = void 0),
			(this.ResellTimerId = void 0),
			(this.l3i = ItemDefines_1.EItemFunctionType.ManualOpenGift),
			(this._3i = void 0),
			(this.xe = void 0),
			(this.PUt = () => {
				this.CloseMe();
			}),
			(this.xUt = () => {
				var e;
				this.IsEnoughMoney() && this.GoodsData.IfPayGift()
					? (ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
							this.GoodsData.Id,
						),
						this.CloseMe())
					: this.IsEnoughMoney() && !this.GoodsData.IfPayGift()
						? (ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(
								this.GoodsData.Id,
							),
							this.CloseMe())
						: ((e =
								ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency()),
							this.GoodsData.Price.Id === e
								? (ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowFirstCurrencyConfirm(),
									this.CloseMe())
								: ((e =
										ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
											this.GoodsData.Price.Id,
										)),
									(e = new LguiUtil_1.TableTextArgNew(e.Name)),
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"ShopResourceNotEnough",
										e,
									)));
			}),
			(this.PCi = () => {
				this.CloseMe();
			}),
			(this.PFi = () => {
				this.RemoveResellTimer();
				var e,
					t = this.Goods.GetExchangePopViewResellText();
				this.Goods.GetIfNeedExtraLimitText()
					? (e = this.Goods.GetExtraLimitText()) &&
						(this.GetItem(7).SetUIActive(!0), this.GetText(8).ShowTextNew(e))
					: this.Goods.GetPriceData().Enough
						? 2 !== (e = this.Goods.GetCountDownData())[0]
							? (this.GetItem(7).SetUIActive(!1),
								this.GetText(8).SetUIActive(!1))
							: (this.GetItem(7).SetUIActive(!0),
								StringUtils_1.StringUtils.IsEmpty(t) ||
									this.GetText(8).ShowTextNew(t),
								(this.ResellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(
									this.PFi,
									e[2] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
								)))
						: StringUtils_1.StringUtils.IsEmpty(t)
							? (this.GetItem(7).SetUIActive(!0),
								(e =
									ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
										this.Goods.GetPriceData().CurrencyId,
									)) &&
									((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
										e.Name,
									)),
									LguiUtil_1.LguiUtil.SetLocalText(
										this.GetText(8),
										"CurrencyNotEnough",
										e,
									)))
							: this.GetText(8).ShowTextNew(t);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIInteractionGroup],
			[8, UE.UIText],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[4, this.PUt],
				[5, this.xUt],
			]);
	}
	OnBeforeCreate() {
		var e,
			t,
			i = this.OpenParam,
			o =
				((this.Goods = i.PayShopGoods),
				(this.GoodsData = this.Goods.GetGoodsData()),
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					this.GoodsData.ItemId,
				));
		for ([e, t] of ((this.xe = void 0), o.Parameters)) {
			var s = ItemDefines_1.EItemFunctionType[e];
			if (!StringUtils_1.StringUtils.IsEmpty(s)) {
				(this.l3i = e), (this.xe = t);
				break;
			}
		}
		this.xe ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Config",
					44,
					"检查道具ID的参数（Parameters）字段 是否 表示为正确的指向道具id的参数",
					["道具ID", this.GoodsData.ItemId],
				)),
			(this.i3i = new PayShopItem_1.PayShopItem()),
			this.i3i.SetRootActorLoadInfo(i.ShopItemResource),
			this.AddChild(this.i3i);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PayShopGoodsBuy,
			this.PUt,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PayShopGoodsBuy,
			this.PUt,
		);
	}
	OnStart() {
		var e;
		this.xe &&
			((e = this.GetItem(1)),
			this.l3i === ItemDefines_1.EItemFunctionType.AutoOpenMonthCard
				? (this._3i =
						new GiftPackageMonthlyCardItem_1.GiftPackageMonthlyCardItem(
							this.xe,
							e,
						))
				: (this.l3i !== ItemDefines_1.EItemFunctionType.AutoOpenGift &&
						this.l3i !== ItemDefines_1.EItemFunctionType.ManualOpenGift) ||
					(this._3i = new GiftPackageSupplyPackItem_1.GiftPackageSupplyPackItem(
						this.xe,
						e,
						this.Goods,
					)),
			this.i3i.GetRootItem().SetUIParent(this.GetItem(0), !1));
	}
	OnBeforeShow() {
		this.i3i.HidePackageViewElement(),
			this.Wwn(),
			this.i3i.Refresh(this.Goods, !1, 0),
			this.SetInteractionGroup(),
			this.PFi(),
			this.vIt();
	}
	Wwn() {
		var e = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
		this.Goods?.GetGoodsId() === e && this.i3i.SetLeftTimeTextShowState(!0);
	}
	async vIt() {
		var e;
		this.Goods.IsDirect() ||
			(0 !== this.GoodsData.GetNowPrice() &&
				(0 < this.Goods.GetPriceData().CurrencyId &&
					((e = new Array()).push(this.Goods.GetPriceData().CurrencyId),
					await this.ChildPopView?.PopItem.SetCurrencyItemList(e)),
				(
					this.ChildPopView?.PopItem.GetCurrencyComponent().GetCurrencyItemList()
				).forEach((e) => {
					e.SetBeforeButtonFunction(this.PCi), e.SetToPayShopFunction();
				})));
	}
	OnBeforeDestroy() {
		this._3i && this._3i.Destroy(), this.RemoveResellTimer();
	}
	RemoveResellTimer() {
		void 0 !== this.ResellTimerId &&
			(TimerSystem_1.RealTimeTimerSystem.Remove(this.ResellTimerId),
			(this.ResellTimerId = void 0));
	}
	IsEnoughMoney() {
		var e;
		return (
			!!this.GoodsData.IsDirect() ||
			((e = this.GoodsData.Price.Id),
			ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) >=
				this.GoodsData.GetNowPrice())
		);
	}
	SetInteractionGroup() {
		var e = this.GetInteractionGroup(6);
		this.Goods.IsLocked() ||
		this.Goods.IsSoldOut() ||
		!this.Goods.IfCanBuy() ||
		!this.Goods.GetPriceData().Enough
			? e.SetInteractable(!1)
			: e.SetInteractable(!0);
	}
}
exports.GiftPackageDetailsView = GiftPackageDetailsView;

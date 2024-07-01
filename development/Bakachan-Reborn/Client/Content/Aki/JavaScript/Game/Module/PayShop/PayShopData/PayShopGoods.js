"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopGoods = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	PayShopItemBase_1 = require("../PayShopTab/TabItem/PayShopItemBase");
class PayShopGoods {
	constructor(e) {
		(this.Pe = void 0),
			(this.S2i = !1),
			(this.PayShopId = 1),
			(this.XNi = void 0),
			(this.E2i = 0),
			(this.PayShopId = e);
	}
	SetGoodsData(e) {
		(this.Pe = e),
			(this.S2i = this.InSellTime()),
			(this.XNi = new PayShopItemBase_1.PayShopItemBaseSt()),
			this.XNi.PhraseFromPayItemData(this);
	}
	SetPayGiftId(e) {
		this.E2i = e;
	}
	GetGetPayGiftData() {
		return ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(
			this.E2i,
		);
	}
	GetGoodsData() {
		return this.Pe;
	}
	IsLocked() {
		return this.Pe.Locked;
	}
	GetConditionTextId() {
		var e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
			this.Pe.Id,
		).BuyConditionId;
		return 0 !== e
			? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
					e,
				) ?? ""
			: "";
	}
	GetDiscountLabel() {
		return this.Pe.LabelId;
	}
	GetItemData() {
		var e = ConfigManager_1.ConfigManager.InventoryConfig,
			t = this.Pe.ItemId;
		return {
			Quality: (e = e.GetItemConfigData(t)).QualityId,
			ItemId: t,
			Name: e.Name,
		};
	}
	IfPayGift() {
		return this.Pe.IfPayGift();
	}
	GetPriceData() {
		var e = this.Pe.GetNowPrice(),
			t = this.Pe.GetOriginalPrice();
		const i = this.Pe.Price.Id;
		var n =
			ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
		return {
			OwnNumber: () =>
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i),
			NowPrice: e,
			OriginalPrice: t,
			CurrencyId: i,
			Enough: 0 <= n - e,
			InDiscountTime: this.Pe.HasDiscount(),
		};
	}
	GetDirectPriceText() {
		var e = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(
			this.Pe.Price.Id.toString(),
		);
		return (
			e ||
			((e = this.Pe.Price.Id),
			ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(e))
		);
	}
	GetRemainingData() {
		var e;
		if (this.Pe.HasBuyLimit())
			return (
				(e = this.Pe.GetRemainingCount()),
				{ TextId: this.Pe.GetRemainingTextId(), Count: e }
			);
	}
	SetUnLock() {
		this.Pe.SetUnLock();
	}
	GetDiscount() {
		return this.Pe.GetDiscount();
	}
	HasDiscount() {
		return this.Pe.HasDiscount();
	}
	IsPermanentDiscount() {
		return (
			(0 === this.Pe.EndPromotionTime && 0 === this.Pe.BeginPromotionTime) ||
			(0 === this.Pe.EndPromotionTime &&
				TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime))
		);
	}
	IsPermanentSell() {
		return (
			(0 === this.Pe.BeginTime && 0 === this.Pe.EndTime) ||
			(TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime) &&
				0 === this.Pe.EndTime)
		);
	}
	InSellTime() {
		return (
			!!this.IsPermanentSell() ||
			(Number(this.Pe.EndTime) > TimeUtil_1.TimeUtil.GetServerTime() &&
				TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime))
		);
	}
	InLabelShowTime() {
		return this.Pe.InLabelShowTime();
	}
	InUnPermanentSellTime() {
		return (
			!this.IsPermanentSell() &&
			Number(this.Pe.EndTime) > TimeUtil_1.TimeUtil.GetServerTime() &&
			TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime)
		);
	}
	GetDiscountTimeData() {
		var e,
			t = this.Pe.GetPromotionText();
		return StringUtils_1.StringUtils.IsEmpty(t)
			? ((e = Number(this.Pe.EndPromotionTime)),
				PayShopGoods.GetEndTimeShowText(e))
			: t;
	}
	GetDiscountRemainTime() {
		var e =
			Number(this.Pe.EndPromotionTime) - TimeUtil_1.TimeUtil.GetServerTime();
		let t = TimeUtil_1.TimeUtil.CalculateRemainingTime(e);
		return (
			t || {
				TimeValue: 0,
				RemainingTime: 0 + TimeUtil_1.TimeUtil.TimeDeviation,
				TextId: CommonDefine_1.remainTimeTextId[1],
			}
		);
	}
	GetDiscountCountDown() {
		var e =
			Number(this.Pe.EndPromotionTime) - TimeUtil_1.TimeUtil.GetServerTime();
		return TimeUtil_1.TimeUtil.GetCountDownData(e);
	}
	GetUpdateTimeRemainData() {
		var e = Number(this.Pe.UpdateTime);
		return PayShopGoods.GetEndTimeShowText(e);
	}
	GetUpdateRemainTime() {
		return (
			Number(this.Pe.UpdateTime) -
			TimeUtil_1.TimeUtil.GetServerTime() +
			TimeUtil_1.TimeUtil.TimeDeviation
		);
	}
	InUpdateTime() {
		return (
			!!this.Pe.HasBuyLimit() &&
			0 !== this.Pe.UpdateTime &&
			Number(this.Pe.UpdateTime) > TimeUtil_1.TimeUtil.GetServerTime()
		);
	}
	NeedUpdate() {
		return this.InSellTime() && !this.S2i
			? (this.S2i = !0)
			: !!this.Pe.HasBuyLimit() &&
					0 !== this.Pe.UpdateTime &&
					Number(this.Pe.UpdateTime) <= TimeUtil_1.TimeUtil.GetServerTime() &&
					this.InSellTime();
	}
	static GetEndTimeShowText(e) {
		var t = TimeUtil_1.TimeUtil.GetServerTime();
		e = Math.max(e - t, 0);
		return 0 === (t = PayShopGoods.GetTimeTypeData(e))[0]
			? ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotEnoughOneHour")
			: TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t[0], t[1])
					.CountDownText;
	}
	static GetTimeTypeData(e) {
		return e > CommonDefine_1.SECOND_PER_DAY
			? [3, 2]
			: e > CommonDefine_1.SECOND_PER_HOUR
				? [2, 2]
				: [0, 0];
	}
	GetTimeRemainData(e) {
		e -= TimeUtil_1.TimeUtil.GetServerTime();
		let t = TimeUtil_1.TimeUtil.CalculateRemainingTime(e);
		return (
			t || {
				TimeValue: 0,
				RemainingTime: 0,
				TextId: CommonDefine_1.remainTimeTextId[1],
			}
		);
	}
	GetEndTimeRemainData() {
		var e,
			t = this.Pe.GetSellTimeText();
		return StringUtils_1.StringUtils.IsEmpty(t)
			? ((e = Number(this.Pe.EndTime)), PayShopGoods.GetEndTimeShowText(e))
			: t;
	}
	GetDownTipsText() {
		if (this.CheckIfMonthCardItem())
			return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"MonthlyCardMax",
			);
		if (this.IsLimitGoods() && this.IsSoldOut())
			return ConfigManager_1.ConfigManager.TextConfig.GetTextById("SoldOut");
		if (!this.IfCanBuy()) {
			if (this.GetGoodsData().GetItemConfig().ShowTypes.includes(30))
				return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"Text_Shop_Role_Text",
				);
			var e = this.GetConditionTextId();
			if (!StringUtils_1.StringUtils.IsEmpty(e))
				return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
		}
		return "";
	}
	GetConditionLimitText() {
		return this.Pe.GetIfCanBuy() ? "" : this.Pe.GetUnFinishConditionText();
	}
	GetExtraLimitText() {
		var e;
		return this.CheckIfMonthCardItem()
			? "Text_MonthlyCardMax_Text"
			: this.IfCanBuy()
				? void 0
				: this.GetGoodsData().GetItemConfig().ShowTypes.includes(30)
					? ((e = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
							this.GetGoodsData().ItemId,
						)[0]),
						void 0 ===
						ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)
							? "DontHaveRole"
							: "RoleBrenchItemMax")
					: this.GetConditionTextId();
	}
	GetIfNeedExtraLimitText() {
		return this.CheckIfMonthCardItem()
			? !ModelManager_1.ModelManager.MonthCardModel.IsRemainDayInMaxLimit()
			: !this.IfCanBuy();
	}
	GetIfNeedShowDownTipsText() {
		if (this.CheckIfMonthCardItem()) {
			var e = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
			if (
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MonthCardMaxDays",
				) < e
			)
				return !0;
		}
		return !(!this.IsLimitGoods() || !this.IsSoldOut()) || !this.IfCanBuy();
	}
	GetSpriteTextBgColor() {
		if (this.CheckIfMonthCardItem()) {
			var e = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
			if (
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MonthCardMaxDays",
				) < e
			)
				return "3E3E3BFF";
		}
		return this.IsLimitGoods() && this.IsSoldOut() ? "6C6C6CFF" : "F9F9F9FF";
	}
	GetTextTipsColor() {
		if (this.CheckIfMonthCardItem()) {
			var e = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
			if (
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MonthCardMaxDays",
				) < e
			)
				return "F9F9F9FF";
		}
		return this.IsLimitGoods() && this.IsSoldOut() ? "F9F9F9FF" : "181818FF";
	}
	GetCountDownData() {
		let e,
			t = 0,
			i = 0;
		return (
			e ||
				(this.IsLimitGoods() &&
					this.GetGoodsData().IsWeeklyRefresh() &&
					0 === this.GetRemainingData().Count &&
					this.GetGoodsData().IfMayReSell() &&
					((e = this.GetUpdateTimeRemainData()),
					(t = 2),
					(i = this.GetTimeRemainData(this.Pe.UpdateTime)?.RemainingTime))),
			e ||
				(this.HasDiscount() &&
					!this.IsPermanentDiscount() &&
					((e = this.GetDiscountTimeData()),
					(t = 1),
					(i = this.GetTimeRemainData(this.Pe.EndPromotionTime).RemainingTime)),
				e) ||
				((e = this.GetEndTimeRemainData()),
				(t = 3),
				(i = this.GetTimeRemainData(this.Pe.EndTime)?.RemainingTime)),
			[t, e, i]
		);
	}
	GetResellText() {
		let e = "";
		return (
			this.IsLimitGoods() &&
				this.GetGoodsData().IsWeeklyRefresh() &&
				(0 !== this.GetRemainingData().Count ||
				this.GetGoodsData().IfMayReSell()
					? 0 === this.GetRemainingData().Count &&
						this.GetGoodsData().IfMayReSell() &&
						(e = "ReSell")
					: (e = "DistanceToDown")),
			e
		);
	}
	GetExchangePopViewResellText() {
		let e = "";
		return this.IsLimitGoods() &&
			this.GetGoodsData().IsWeeklyRefresh() &&
			0 === this.GetRemainingData().Count &&
			this.GetGoodsData().IfMayReSell()
			? "SoldOut"
			: e;
	}
	GetBuyLimitText() {
		if (this.IsLimitGoods()) {
			let t = "";
			var e;
			return "LimitBuy" ==
				(t =
					0 === this.Pe.UpdateType
						? "LimitBuy"
						: 1 === this.Pe.UpdateType
							? "DailyLeftTime"
							: 2 === this.Pe.UpdateType
								? "WeekLeftTime"
								: 3 === this.Pe.UpdateType
									? "MonthLeftTime"
									: "LimitBuy")
				? ((e = this.Pe.BuyLimit - this.Pe.BoughtCount),
					StringUtils_1.StringUtils.Format(
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(t),
						e.toString(),
						this.Pe.BuyLimit.toString(),
					))
				: StringUtils_1.StringUtils.Format(
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(t),
						(this.Pe.BuyLimit - this.Pe.BoughtCount).toString(),
					);
		}
		return "";
	}
	GetExchangeViewShopTipsText() {
		if (this.CheckIfMonthCardItem())
			return ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText();
		if (this.IsLimitGoods()) {
			let t = "",
				i =
					((t =
						0 === this.Pe.UpdateType
							? "LimitBuy_B"
							: 1 === this.Pe.UpdateType
								? "DayLimitBuy_B"
								: 2 === this.Pe.UpdateType
									? "WeekLimitBuy_B"
									: 3 === this.Pe.UpdateType
										? "MonthLimitBuy_B"
										: "LimitBuy_B"),
					"");
			var e = this.Pe.BuyLimit - this.Pe.BoughtCount;
			return (
				(i =
					0 < this.GetGoodsData().GetRemainingCount()
						? StringUtils_1.StringUtils.Format(
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"BuyTextEnough",
								),
								e.toString(),
								this.Pe.BuyLimit.toString(),
							)
						: StringUtils_1.StringUtils.Format(
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"BuyTextNotEnough",
								),
								e.toString(),
								this.Pe.BuyLimit.toString(),
							)),
				StringUtils_1.StringUtils.Format(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(t),
					i,
				)
			);
		}
		return "";
	}
	GetShopTipsText() {
		if (this.CheckIfMonthCardItem())
			return ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText();
		if (this.IsLimitGoods()) {
			let t = "";
			t =
				0 === this.Pe.UpdateType
					? "LimitBuy"
					: 1 === this.Pe.UpdateType
						? "DayLimitBuy"
						: 2 === this.Pe.UpdateType
							? "WeekLimitBuy"
							: 3 === this.Pe.UpdateType
								? "MonthLimitBuy"
								: "LimitBuy";
			var e = this.Pe.BuyLimit - this.Pe.BoughtCount;
			return StringUtils_1.StringUtils.Format(
				ConfigManager_1.ConfigManager.TextConfig.GetTextById(t),
				e.toString(),
				this.Pe.BuyLimit.toString(),
			);
		}
		return "";
	}
	GetTabId() {
		return this.Pe.TabId;
	}
	IsLimitGoods() {
		return this.Pe.HasBuyLimit();
	}
	IfCanBuy() {
		if (this.CheckIfMonthCardItem()) {
			let t = (e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
				this.GetGoodsData().ItemId,
			)).Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenMonthCard);
			if (
				!(t =
					t ||
					e.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard))
			)
				return !0;
			if (!ModelManager_1.ModelManager.MonthCardModel.CheckMonthCardIfCanBuy())
				return !1;
		}
		var e;
		if (
			(e = this.GetGoodsData().GetItemConfig()) &&
			e.ShowTypes?.includes(30) &&
			(e = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
				this.GetGoodsData().ItemId,
			)) &&
			0 < e.length
		)
			return (
				(e = e[0]),
				!!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e) &&
					0 <
						ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(
							e,
						)
			);
		return this.Pe.GetIfCanBuy();
	}
	IsSoldOut() {
		return !!this.Pe.HasBuyLimit() && this.Pe.BoughtCount === this.Pe.BuyLimit;
	}
	GetGoodsId() {
		return this.Pe.Id;
	}
	IsDirect() {
		return this.Pe.IsDirect();
	}
	AddBoughtCount(e) {
		this.Pe.BoughtCount += e;
	}
	IsShowInShop() {
		return this.Pe.IsShowInShop();
	}
	ConvertToPayShopBaseSt() {
		return this.XNi.Refresh(this), this.XNi;
	}
	CheckIfMonthCardItem() {
		return this.GetGoodsData().CheckIfMonthCardItem();
	}
}
exports.PayShopGoods = PayShopGoods;

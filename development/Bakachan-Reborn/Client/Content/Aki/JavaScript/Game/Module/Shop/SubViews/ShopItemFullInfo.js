"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopItemFullInfo = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ShopDefine_1 = require("../ShopDefine"),
	ShopUtils_1 = require("../ShopUtils");
class ItemPrice {
	constructor(i, e, t) {
		(this.CoinId = i), (this.CoinPrice = e), (this.OriginalPrice = t);
	}
}
class ShopItemFullInfo {
	constructor(i, e, t) {
		(this.DefaultPrice = void 0),
			(this.Price = new Map()),
			(this.ConditionText = ""),
			(this.ItemInfo = i),
			(this.BoughtCount = e.s8n ?? 0),
			(this.IsLocked = e.h3n),
			(this.BuyLimit = e.yxs),
			(this.StackSize = e.k4n),
			e.Exs.forEach((i, t) => {
				var n = e.Ixs.find((e) => e.gVn === i.gVn);
				n = new ItemPrice(i.gVn, i.Mxs, n?.Mxs ?? -1);
				this.Price.set(i.gVn, n), 0 === t && (this.DefaultPrice = n);
			}),
			(this.Id = e.Ekn),
			(this.Label = e.Txs),
			(this.BeginTime = e.HCs ?? 0),
			(this.EndTime = e.jCs ?? 0),
			0 !==
				(i = ConfigManager_1.ConfigManager.ShopConfig.GetShopFixedInfoByItemId(
					t,
					e.Ekn,
				)).CondId &&
				(this.ConditionText =
					ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
						i?.CondId,
					).HintText),
			(this.SwitchText = e.Lxs),
			(this.PurchaseText = e.Rxs),
			(this.ItemId = e.G3n),
			(this.ShopId = t);
	}
	get LockInfo() {
		var i, e, t, n;
		return 0 < this.BeginTime &&
			this.BeginTime > TimeUtil_1.TimeUtil.GetServerTime()
			? ((n = Math.trunc(this.BeginTime - TimeUtil_1.TimeUtil.GetServerTime())),
				(i = Math.trunc(n / ShopDefine_1.SECONDS_PER_DAY)),
				(e = Math.trunc(
					(n % ShopDefine_1.SECONDS_PER_DAY) / ShopDefine_1.SECONDS_PRE_HOUR,
				)),
				(t = Math.trunc(
					(n % ShopDefine_1.SECONDS_PRE_HOUR) / ShopDefine_1.SECONDS_PRE_MIN,
				)),
				(n = Math.trunc(n) % ShopDefine_1.SECONDS_PRE_MIN),
				0 < i
					? StringUtils_1.StringUtils.Format(
							ConfigManager_1.ConfigManager.TextConfig.GetTextById(
								"ShopLockTime1",
							),
							i.toString(),
						)
					: 0 < e
						? StringUtils_1.StringUtils.Format(
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"ShopLockTime2",
								),
								e.toString(),
							)
						: 0 < t
							? StringUtils_1.StringUtils.Format(
									ConfigManager_1.ConfigManager.TextConfig.GetTextById(
										"ShopLockTime3",
									),
									t.toString(),
								)
							: StringUtils_1.StringUtils.Format(
									ConfigManager_1.ConfigManager.TextConfig.GetTextById(
										"ShopLockTime4",
									),
									n.toString(),
								))
			: this.IsLocked
				? this.ConditionText
				: "";
	}
	IsUnlocked() {
		return !(
			(0 < this.BeginTime &&
				this.BeginTime > TimeUtil_1.TimeUtil.GetServerTime()) ||
			this.IsLocked
		);
	}
	InSellTime() {
		return (
			!(0 < this.EndTime) ||
			(TimeUtil_1.TimeUtil.GetServerTime() >= this.BeginTime &&
				this.EndTime > TimeUtil_1.TimeUtil.GetServerTime())
		);
	}
	IsAffordable(i = 1) {
		return (
			!!this.DefaultPrice &&
			ShopUtils_1.ShopUtils.GetResource(this.DefaultPrice.CoinId) >=
				this.DefaultPrice.CoinPrice * i
		);
	}
	GetMaxBuyCount() {
		var i;
		return this.DefaultPrice
			? ((i = ShopUtils_1.ShopUtils.GetResource(this.DefaultPrice.CoinId)),
				(i = Math.trunc(i / this.DefaultPrice.CoinPrice)),
				0 < this.BuyLimit ? Math.min(this.BuyLimit - this.BoughtCount, i) : i)
			: -1;
	}
	IsOutOfDate() {
		return (
			0 < this.EndTime && this.EndTime < TimeUtil_1.TimeUtil.GetServerTime()
		);
	}
	IsSoldOut() {
		return 0 < this.BuyLimit && this.BoughtCount === this.BuyLimit;
	}
	InSaleTime() {
		var i;
		return (
			0 < this.BeginTime &&
			0 < this.EndTime &&
			((i = TimeUtil_1.TimeUtil.GetServerTime()), this.BeginTime < i) &&
			i < this.EndTime
		);
	}
	IsOutOfStock() {
		return (
			(0 < this.BuyLimit && this.BoughtCount === this.BuyLimit) ||
			(0 < this.EndTime && this.EndTime < TimeUtil_1.TimeUtil.GetServerTime())
		);
	}
	IsInteractive() {
		return this.IsUnlocked() && !this.IsOutOfStock();
	}
	GetMoneyId() {
		return this.DefaultPrice ? this.DefaultPrice.CoinId : -1;
	}
	GetDefaultPrice() {
		return this.DefaultPrice ? this.DefaultPrice.CoinPrice : -1;
	}
	GetPrice(i) {
		return this.Price && 0 !== this.Price.size
			? this.Price.get(i).CoinPrice
			: -1;
	}
	GetOriginalPrice() {
		return this.DefaultPrice ? this.DefaultPrice.OriginalPrice : -1;
	}
}
exports.ShopItemFullInfo = ShopItemFullInfo;

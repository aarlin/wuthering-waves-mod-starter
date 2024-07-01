"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopGoodsData = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	PayShopDefine_1 = require("../PayShopDefine"),
	PayShopGoodsPrice_1 = require("./PayShopGoodsPrice");
class PayShopGoodsData {
	constructor() {
		(this.Id = 0),
			(this.TabId = 0),
			(this.ItemId = 0),
			(this.ItemCount = 0),
			(this.Locked = !1),
			(this.y2i = !0),
			(this.BuyLimit = 0),
			(this.BoughtCount = 0),
			(this.Price = new PayShopGoodsPrice_1.PayShopGoodsPrice()),
			(this.UpdateType = 0),
			(this.ShopItemType = 0),
			(this.BeginTime = 0),
			(this.EndTime = 0),
			(this.BeginPromotionTime = 0),
			(this.EndPromotionTime = 0),
			(this.UpdateTime = 0),
			(this.LabelId = 0),
			(this.LabelBeginTime = 0),
			(this.LabelEndTime = 0),
			(this.Sort = 0),
			(this.Show = !0),
			(this.PromotionShow = 0),
			(this.he = ""),
			(this.StageImage = ""),
			(this.I2i = 0),
			(this.Yxn = ""),
			(this.UnFinishedCondition = void 0);
	}
	Phrase(e) {
		this.Id = e.Ekn;
		var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
			e.Ekn,
		);
		(this.TabId = t.TabId),
			(this.ItemId = e.G3n),
			(this.ItemCount = e.g5n),
			(this.Locked = e.KPs),
			(this.y2i = e.eUs),
			(this.BuyLimit = e.FPs),
			(this.BoughtCount = e.s8n),
			this.Price.Phrase(e.QPs),
			(this.BeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.HCs))),
			(this.EndTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.jCs))),
			(this.BeginPromotionTime = Number(
				MathUtils_1.MathUtils.LongToBigInt(e.XPs),
			)),
			(this.EndPromotionTime = Number(
				MathUtils_1.MathUtils.LongToBigInt(e.YPs),
			)),
			(this.UpdateTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.eAs))),
			(this.UpdateType = Number(e.cTs)),
			(this.ShopItemType = Number(e.JPs)),
			(this.LabelId = t.Tag),
			(this.LabelBeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.zPs))),
			(this.LabelEndTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.ZPs))),
			(this.Sort = t.Sort),
			(this.PromotionShow = t.PromotionShow),
			this.M2i();
	}
	GetIfCanBuy() {
		return this.IfRoleCallBackItem()
			? !(!this.IfHaveRoleCallBackItemNeedRole() || !this.IfCanResonant())
			: !(
					this.CheckIfMonthCardItem() &&
					!ModelManager_1.ModelManager.MonthCardModel.CheckMonthCardIfCanBuy()
				) && !!this.y2i;
	}
	IfRoleCallBackItem() {
		return this.GetItemConfig().ShowTypes.includes(30);
	}
	IfHaveRoleCallBackItemNeedRole() {
		if (this.IfRoleCallBackItem()) {
			var e = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
				this.ItemId,
			)[0];
			if (
				void 0 === ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)
			)
				return !1;
		}
		return !0;
	}
	IfCanResonant() {
		if (this.IfRoleCallBackItem()) {
			var e = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
				this.ItemId,
			)[0];
			if (
				ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(
					e,
				) <= 0
			)
				return !1;
		}
		return !0;
	}
	GetUnFinishConditionText() {
		if (this.IfRoleCallBackItem()) {
			if (!this.IfHaveRoleCallBackItemNeedRole())
				return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"DontHaveRole",
				);
			if (!this.IfCanResonant())
				return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"RoleBrenchItemMax",
				);
		}
		var e;
		return this.CheckIfMonthCardItem()
			? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"Text_MonthlyCardMax_Text",
				)
			: 0 !==
					(e =
						ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
							this.Id,
						).BuyConditionId)
				? ((e =
						LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
							e,
						) ?? ""),
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e))
				: "";
	}
	CheckIfMonthCardItem() {
		return (
			this.Id ===
			ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId()
		);
	}
	M2i() {
		let e = "";
		var t;
		"" === e &&
			(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					this.ItemId,
				).Name,
			)),
			1 < this.ItemCount &&
				((t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"GoodsName",
					)),
				(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
				(e = StringUtils_1.StringUtils.Format(
					t,
					e,
					this.ItemCount.toString(),
				))),
			(this.Yxn = LanguageSystem_1.LanguageSystem.PackageLanguage),
			(this.he = e);
	}
	PhraseFromPayPackageData(e) {
		(this.Id = e.Id),
			(this.ItemId = e.ItemId),
			(this.ItemCount = e.ItemCount),
			(this.Locked = !1),
			(this.y2i = !0),
			(this.BuyLimit = e.BuyLimit),
			(this.BoughtCount = e.BoughtCount),
			(this.Price.Id = e.PayId),
			(this.BeginTime = e.BeginTime),
			(this.EndTime = e.EndTime),
			(this.UpdateTime = e.EndTime),
			(this.UpdateType = 0),
			(this.ShopItemType = 1),
			(this.LabelId = 0),
			(this.LabelBeginTime = 0),
			(this.LabelEndTime = 0),
			(this.Sort = e.Sort),
			(this.PromotionShow = 0),
			(this.TabId = e.TabId),
			(this.StageImage = e.StageImage),
			(this.I2i = 1),
			ModelManager_1.ModelManager.RechargeModel.SetRechargeInfo(
				e.PayId,
				e.Amount,
				e.ProductId,
			),
			(this.he = e.GetName());
	}
	GetItemConfig() {
		return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
			this.ItemId,
		);
	}
	GetGoodsName(e) {
		return (
			this.Yxn !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
				this.M2i(),
			this.he
		);
	}
	CheckIfSame(e) {
		return !!(
			this.Id === e.Ekn &&
			this.ItemId === e.G3n &&
			this.ItemCount === e.g5n &&
			this.Locked === e.KPs &&
			this.y2i === e.eUs &&
			this.BuyLimit === e.FPs &&
			this.BoughtCount === e.s8n &&
			this.T2i(e) &&
			this.L2i(this.BeginTime, e.HCs ?? void 0) &&
			this.L2i(this.EndTime, e.jCs ?? void 0) &&
			this.L2i(this.BeginPromotionTime, e.XPs ?? void 0) &&
			this.L2i(this.EndPromotionTime, e.YPs ?? void 0) &&
			this.L2i(this.UpdateTime, e.eAs ?? void 0) &&
			Number(this.UpdateType) === e.cTs &&
			Number(this.ShopItemType) === e.JPs &&
			this.L2i(this.LabelBeginTime, e.zPs ?? void 0) &&
			this.L2i(this.LabelEndTime, e.ZPs ?? void 0)
		);
	}
	IfMayReSell() {
		if (0 !== this.UpdateType && 4 !== this.UpdateType) {
			if (0 === Number(this.EndTime)) return !0;
			if (Number(this.UpdateTime) < Number(this.EndTime)) return !0;
		}
		return !1;
	}
	L2i(e, t) {
		return void 0 !== e && void 0 !== t
			? Number(e) === Number(t)
			: !((void 0 === e && void 0 !== t) || (void 0 !== e && void 0 === t));
	}
	T2i(e) {
		return (
			this.Price.Id === e.QPs.Ekn &&
			this.Price.Count === e.QPs.I5n &&
			this.Price.PromotionCount === e.QPs.WPs
		);
	}
	InLabelShowTime() {
		var e = TimeUtil_1.TimeUtil.GetServerTime();
		return (
			0 !== this.LabelId &&
			((0 < this.LabelBeginTime &&
				e >= Number(this.LabelBeginTime) &&
				0 === this.LabelEndTime) ||
				(0 === this.LabelBeginTime && 0 === this.LabelEndTime) ||
				(Number(this.LabelEndTime) > e && e >= Number(this.LabelBeginTime)))
		);
	}
	GetSortValue() {
		return (
			0 === this.Sort
				? ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
						this.Id,
					)
				: this
		).Sort;
	}
	ShopId() {
		return ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
			this.Id,
		).ShopId;
	}
	GetUpdateTime() {
		return 0 === this.UpdateTime && this.IsWeeklyRefresh()
			? ModelManager_1.ModelManager.PayShopModel.GetPayShopUpdateTime(
					this.ShopId(),
				)
			: this.UpdateTime;
	}
	IsWeeklyRefresh() {
		return 0 !== this.UpdateType && 4 !== this.UpdateType;
	}
	HasDiscount() {
		var e, t;
		return (
			!(this.Price.PromotionCount <= 0) &&
			((t = TimeUtil_1.TimeUtil.GetServerTime()),
			(0 === this.EndPromotionTime && 0 === this.BeginPromotionTime) ||
				(0 === this.EndPromotionTime &&
					0 < this.BeginPromotionTime &&
					t >= Number(this.BeginPromotionTime)) ||
				((e = TimeUtil_1.TimeUtil.IsExceededServerTime(this.EndPromotionTime)),
				(t =
					Number(this.EndPromotionTime) > t &&
					t >= Number(this.BeginPromotionTime)),
				e && t))
		);
	}
	GetOriginalPrice() {
		if (this.HasDiscount()) return this.Price.Count;
	}
	GetDiscount() {
		return this.Price.GetDiscount();
	}
	GetRemainingCount() {
		return this.BuyLimit - this.BoughtCount;
	}
	GetRemainingTextId() {
		return PayShopDefine_1.payShopUpdateTypeTextId[this.UpdateType];
	}
	HasBuyLimit() {
		return 0 < this.BuyLimit;
	}
	SetUnLock() {
		this.Locked = !1;
	}
	IsDirect() {
		return 1 === this.ShopItemType;
	}
	GetNowPrice() {
		return this.HasDiscount() ? this.Price.PromotionCount : this.Price.Count;
	}
	GetConditionTextId() {
		var e;
		return 0 === this.I2i &&
			0 !==
				(e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
					this.Id,
				).BuyConditionId)
			? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
					e,
				) ?? ""
			: "";
	}
	Discount() {
		var e;
		return 0 === this.I2i
			? 0 !== this.PromotionShow
				? Math.ceil(this.PromotionShow / PayShopDefine_1.DISCOUNT_PERCENT)
				: 0 !==
						(e =
							ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
								this.Id,
							)).PromotionShow
					? Math.ceil(e.PromotionShow / PayShopDefine_1.DISCOUNT_PERCENT)
					: Math.ceil(this.GetDiscount())
			: Math.ceil(this.GetDiscount());
	}
	GetPromotionText() {
		if (0 === this.I2i) {
			var e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
				this.Id,
			);
			if (e.PromotionTimeText)
				return ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsLocalText(
					e.PromotionTimeText,
				);
		}
		return "";
	}
	GetSellTimeText() {
		if (0 === this.I2i) {
			var e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
				this.Id,
			);
			if (e.SellTimeText)
				return ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsLocalText(
					e.SellTimeText,
				);
		}
		return "";
	}
	IsShowInShop() {
		if (0 === this.I2i) {
			var e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
				this.Id,
			);
			if (e) return e.Show && !this.Locked;
		}
		return !0;
	}
	IfPayGift() {
		return 1 === this.I2i;
	}
	GetGiftId() {
		let e;
		var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
			this.ItemId,
		);
		return 11 === t.ItemType
			? (e = t.Parameters.get(
					ItemDefines_1.EItemFunctionType.ManualOpenGift,
				)) || t.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift)
			: e;
	}
	GetRewardItemType() {
		return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
			this.ItemId,
		).ItemType;
	}
}
exports.PayShopGoodsData = PayShopGoodsData;

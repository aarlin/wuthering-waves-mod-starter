"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayItemData = void 0);
const PayItem_1 = require("../../../Core/Define/Config/PayItem"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PayShopItemBase_1 = require("../PayShop/PayShopTab/TabItem/PayShopItemBase");
class PayItemData {
	constructor() {
		(this.XNi = void 0),
			(this.$Ni = 0),
			(this.Amount = ""),
			(this.ProductId = ""),
			(this.PayItemId = 0),
			(this.ItemId = 0),
			(this.ItemCount = 0),
			(this.BonusItemCount = 0),
			(this.SpecialBonusItemCount = 0),
			(this.CanSpecialBonus = !1),
			(this.StageImage = "");
	}
	Phrase(t) {
		(this.$Ni = t.xPs ?? 0),
			(this.Amount = t.kPs),
			(this.ProductId = t.OPs),
			(this.PayItemId = t.Ekn ?? 0),
			(this.ItemId = t.G3n ?? 0),
			(this.ItemCount = t.g5n ?? 0),
			(this.BonusItemCount = t.bPs ?? 0),
			(this.SpecialBonusItemCount = t.BPs ?? 0),
			(this.StageImage = t.GPs ?? ""),
			ModelManager_1.ModelManager.RechargeModel.SetRechargeInfo(
				this.$Ni,
				this.Amount.toString(),
				this.ProductId,
			),
			t instanceof PayItem_1.PayItem ||
				(this.CanSpecialBonus = t.qPs ?? void 0),
			(this.XNi = new PayShopItemBase_1.PayShopItemBaseSt()),
			this.XNi.PhrasePromPayItemData(this);
	}
	ConvertPayItemDataToPayShopItemBaseSt() {
		return this.XNi.Refresh(this), this.XNi;
	}
	GetPayItemShowName() {
		var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					this.ItemId,
				).Name,
			),
			e =
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"GoodsName",
				);
		e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
		return StringUtils_1.StringUtils.Format(e, t, this.ItemCount.toString());
	}
	GetDirectPriceText() {
		var t = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(
			this.$Ni.toString(),
		);
		return (
			t || ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(this.$Ni)
		);
	}
}
exports.PayItemData = PayItemData;

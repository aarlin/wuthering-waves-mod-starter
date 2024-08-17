"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayItemModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PayItemDefine_1 = require("./PayItemDefine");
class PayItemModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.YNi = []),
			(this.JNi = new Map()),
			(this.Version = ""),
			(this.zNi = void 0);
	}
	GetDataList() {
		return this.YNi;
	}
	GetPayingItemName() {
		return this.zNi;
	}
	CleanPayingItemName() {
		this.zNi = void 0;
	}
	ConvertPayItemDataToPayShopItemBaseSt(e) {
		return e.ConvertPayItemDataToPayShopItemBaseSt();
	}
	UpdatePayingItemName(e) {
		(e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(e)),
			(e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId)),
			(this.zNi = e);
	}
	ResetSpecialBonus(e) {
		for (const a of e) {
			var t = this.JNi.get(a);
			t && (t.CanSpecialBonus = !0);
		}
	}
	InitDataListByServer(e) {
		0 !== this.YNi.length && 0 !== e.length && (this.YNi.length = 0);
		for (const a of e) {
			var t = new PayItemDefine_1.PayItemData();
			t.Phrase(a), this.YNi.push(t), this.JNi.set(a.Ekn, t);
		}
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayItemList);
	}
	OnClear() {
		return (
			(this.YNi.length = 0),
			(this.YNi = void 0),
			this.JNi.clear(),
			(this.Version = ""),
			!(this.zNi = void 0)
		);
	}
	CreateSdkPayment(e, t, a) {
		e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(e);
		var n = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId),
			i = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(e.ItemId),
			r = e.PayId,
			o = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(r);
		return {
			product_id:
				ModelManager_1.ModelManager.RechargeModel.GetPayIdProductId(r),
			cpOrderId: t,
			price: o,
			goodsName: "" + n + e.ItemCount,
			goodsDesc: "" + i + e.ItemCount,
			extraParams: " ",
			callbackUrl: a,
			currency: "",
		};
	}
}
exports.PayItemModel = PayItemModel;

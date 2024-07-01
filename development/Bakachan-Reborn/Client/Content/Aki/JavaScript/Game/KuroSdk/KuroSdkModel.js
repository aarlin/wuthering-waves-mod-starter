"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KuroSdkModel = void 0);
const UE = require("ue"),
	ModelBase_1 = require("../../Core/Framework/ModelBase"),
	BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	KuroSdkDefine_1 = require("./KuroSdkDefine"),
	KuroSdkReport_1 = require("./KuroSdkReport");
class KuroSdkModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ReportedInitState = !1),
			(this.TEe = void 0),
			(this.LEe = new Map()),
			(this.CanUseSdk = !1),
			(this.CurrentPayItemName = "");
	}
	OnInit() {
		return (
			(this.CanUseSdk =
				UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") &&
				BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") ===
					KuroSdkDefine_1.USESDK),
			KuroSdkReport_1.KuroSdkReport.Init(),
			!0
		);
	}
	OnQueryProductInfo(e) {
		e.forEach((e) => {
			this.LEe.set(e.GoodId, e);
		}),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnQueryProductInfo,
			);
	}
	GetQueryProductCurrency(e) {
		return (
			(e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
			(e = this.LEe.get(e.ProductId)) && e.Currency ? e.Currency : ""
		);
	}
	GetQueryProductPrice(e) {
		return (
			(e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
			(e = this.LEe.get(e.ProductId)) && e.Price ? e.Price : 0
		);
	}
	GetQueryProductShowPrice(e) {
		if (
			((e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
			(e = this.LEe.get(e.ProductId)) && e.Currency && e.Price)
		)
			return e.Currency + e.Price;
	}
	GetQueryProductName(e) {
		if (
			((e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
			(e = this.LEe.get(e.ProductId)))
		)
			return e.Name;
	}
	GetQueryProductDesc(e) {
		if (
			((e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
			(e = this.LEe.get(e.ProductId)))
		)
			return e.Desc;
	}
	GetBasicInfo() {
		if (this.CanUseSdk)
			return (
				this.TEe?.bIsValid || (this.TEe = UE.KuroSDKManager.GetBasicInfo()),
				this.TEe
			);
	}
}
exports.KuroSdkModel = KuroSdkModel;

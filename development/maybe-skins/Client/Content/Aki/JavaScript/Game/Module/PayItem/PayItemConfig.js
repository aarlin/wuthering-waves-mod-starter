"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayItemConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	PayById_1 = require("../../../Core/Define/ConfigQuery/PayById"),
	PayByPayIdAndRegion_1 = require("../../../Core/Define/ConfigQuery/PayByPayIdAndRegion"),
	PayByRegion_1 = require("../../../Core/Define/ConfigQuery/PayByRegion"),
	PayItemAll_1 = require("../../../Core/Define/ConfigQuery/PayItemAll"),
	PayItemById_1 = require("../../../Core/Define/ConfigQuery/PayItemById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager");
class PayItemConfig extends ConfigBase_1.ConfigBase {
	GetPayItemList() {
		return PayItemAll_1.configPayItemAll.GetConfigList();
	}
	GetPayConfigById(e) {
		return PayById_1.configPayById.GetConfig(e);
	}
	GetPayConf(e) {
		var r =
			ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerName();
		if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
			const n = PayByPayIdAndRegion_1.configPayByPayIdAndRegion.GetConfigList(
				e,
				r,
			);
			if (void 0 !== n && 0 < n.length) return n[0];
		}
		const n = PayByPayIdAndRegion_1.configPayByPayIdAndRegion.GetConfigList(
			e,
			r,
		);
		if (void 0 !== n && 0 < n.length) return n[0];
	}
	GetCurrentRegionPayConfigList() {
		var e =
			ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerName();
		return PayByRegion_1.configPayByRegion.GetConfigList(e);
	}
	GetPayShowCurrency() {
		return ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
			? this.GetGlobalCurrencyChar()
			: this.GetMainlandCurrencyChar();
	}
	GetPayShow(e) {
		var r,
			n = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(
				e.toString(),
			);
		return (
			n ||
			((n = new StringBuilder_1.StringBuilder()),
			(r = this.GetPayShowCurrency()),
			n.Append(r),
			(r = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(e)),
			n.Append(r),
			n.ToString())
		);
	}
	GetPayItem(e) {
		return PayItemById_1.configPayItemById.GetConfig(e);
	}
	GetWaitPaySuccessTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"MaxWaitSuccessTime",
		);
	}
	GetMainlandCurrencyChar() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"MainlandCurrencyChar",
		);
	}
	GetGlobalCurrencyChar() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"GlobalCurrencyChar",
		);
	}
}
exports.PayItemConfig = PayItemConfig;

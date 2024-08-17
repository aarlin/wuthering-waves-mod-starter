"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ShopFixedByShopId_1 = require("../../../Core/Define/ConfigQuery/ShopFixedByShopId"),
	ShopFixedByShopIdAndId_1 = require("../../../Core/Define/ConfigQuery/ShopFixedByShopIdAndId"),
	ShopInfoById_1 = require("../../../Core/Define/ConfigQuery/ShopInfoById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class ShopConfig extends ConfigBase_1.ConfigBase {
	GetTextConfig(o) {
		return ConfigManager_1.ConfigManager.TextConfig.GetTextById(o);
	}
	GetShopName(o) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
	}
	GetShopInfoConfig(o) {
		var e = ShopInfoById_1.configShopInfoById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Shop", 19, "查表ShopInfo错误", ["Id", o])),
			e
		);
	}
	GetFixedShopList(o) {
		var e = ShopFixedByShopId_1.configShopFixedByShopId.GetConfigList(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Shop", 19, "表ShopFixed配置找不到", ["ShopId", o])),
			e
		);
	}
	GetShopFixedInfoByItemId(o, e) {
		var r = ShopFixedByShopIdAndId_1.configShopFixedByShopIdAndId.GetConfig(
			o,
			e,
		);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Shop",
						19,
						"表ShopFixed配置找不到",
						["ShopId", o],
						["Id", e],
					)),
			r
		);
	}
}
exports.ShopConfig = ShopConfig;

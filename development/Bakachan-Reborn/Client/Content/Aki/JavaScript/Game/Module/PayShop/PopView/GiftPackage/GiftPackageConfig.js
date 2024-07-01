"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GiftPackageConfig = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	GiftPackageById_1 = require("../../../../../Core/Define/ConfigQuery/GiftPackageById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class GiftPackageConfig extends ConfigBase_1.ConfigBase {
	GetGiftPackageConfig(e) {
		return GiftPackageById_1.configGiftPackageById.GetConfig(e);
	}
	GetGiftItemList(e, o) {
		o.length = 0;
		var i = GiftPackageById_1.configGiftPackageById.GetConfig(e);
		if (i)
			for (var [g, t] of ((o.length = 0), i.Content))
				(g = [{ IncId: 0, ItemId: g }, t]), o.push(g);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Temp", 11, "GiftPackage里没有该id", ["Id", e]);
	}
}
exports.GiftPackageConfig = GiftPackageConfig;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CollectItemConfig = void 0);
const DragonPoolAll_1 = require("../../../Core/Define/ConfigQuery/DragonPoolAll"),
	DragonPoolById_1 = require("../../../Core/Define/ConfigQuery/DragonPoolById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class CollectItemConfig extends ConfigBase_1.ConfigBase {
	GetAllDragonPoolConfigList() {
		return DragonPoolAll_1.configDragonPoolAll.GetConfigList();
	}
	GetDragonPoolConfigById(o) {
		return DragonPoolById_1.configDragonPoolById.GetConfig(o);
	}
}
exports.CollectItemConfig = CollectItemConfig;

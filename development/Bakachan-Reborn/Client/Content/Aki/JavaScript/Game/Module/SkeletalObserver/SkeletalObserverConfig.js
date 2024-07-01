"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkeletalObserverConfig = void 0);
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
class SkeletalObserverConfig extends ConfigBase_1.ConfigBase {
	GetMeshConfig(e) {
		return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
			0,
			e.toString(),
		);
	}
}
exports.SkeletalObserverConfig = SkeletalObserverConfig;

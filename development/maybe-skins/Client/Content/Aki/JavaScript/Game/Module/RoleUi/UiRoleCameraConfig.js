"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiRoleCameraConfig = void 0);
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
class UiRoleCameraConfig extends ConfigBase_1.ConfigBase {
	GetRoleCameraConfig(e) {
		return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(18, e);
	}
	GetDefaultRoleCameraConfig() {
		return this.GetRoleCameraConfig("默认");
	}
	GetRoleCameraOffsetConfig(e) {
		return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(19, e);
	}
}
exports.UiRoleCameraConfig = UiRoleCameraConfig;

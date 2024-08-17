"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlatformConfig = void 0);
const DevicePlatformByPidAndVid_1 = require("../../../Core/Define/ConfigQuery/DevicePlatformByPidAndVid"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PlatformConfig extends ConfigBase_1.ConfigBase {
	GetDeviceConfigByProductIdAndVendorId(e) {
		return DevicePlatformByPidAndVid_1.configDevicePlatformByPidAndVid.GetConfig(
			e,
		);
	}
}
exports.PlatformConfig = PlatformConfig;

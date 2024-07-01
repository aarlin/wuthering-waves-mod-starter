"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PackageConfigUtil = void 0);
const BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController");
class PackageConfigUtil {
	static GetPackageConfigOrDefault(e, o = void 0) {
		return BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
			e,
			o,
		);
	}
}
exports.PackageConfigUtil = PackageConfigUtil;

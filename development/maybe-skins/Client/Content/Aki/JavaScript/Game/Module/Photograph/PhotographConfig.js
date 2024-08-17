"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotographConfig = void 0);
const PhotoMontageById_1 = require("../../../Core/Define/ConfigQuery/PhotoMontageById"),
	PhotoMontageByRoleId_1 = require("../../../Core/Define/ConfigQuery/PhotoMontageByRoleId"),
	PhotoSetupAll_1 = require("../../../Core/Define/ConfigQuery/PhotoSetupAll"),
	PhotoSetupByValueType_1 = require("../../../Core/Define/ConfigQuery/PhotoSetupByValueType"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	PhotographDefine_1 = require("./PhotographDefine");
class PhotographConfig extends ConfigBase_1.ConfigBase {
	GetPhotoMontageConfig(e) {
		return PhotoMontageById_1.configPhotoMontageById.GetConfig(e);
	}
	GetPhotoMontageConfigListByRoleId(e) {
		return PhotoMontageByRoleId_1.configPhotoMontageByRoleId.GetConfigList(e);
	}
	GetPhotoSetupConfig(e) {
		return PhotoSetupByValueType_1.configPhotoSetupByValueType.GetConfig(e);
	}
	GetAllPhotoSetupConfig() {
		return PhotoSetupAll_1.configPhotoSetupAll.GetConfigList();
	}
	GetDepthDistanceDefaultValue() {
		var e = this.GetPhotoSetupConfig(4);
		return e ? e.ValueRange[2] : PhotographDefine_1.DEFAULT_FOCAL_LENTGH;
	}
	GetDepthOfFieldRadiusDefaultValue() {
		var e = this.GetPhotoSetupConfig(5);
		return e ? e.ValueRange[2] : PhotographDefine_1.DEFAULT_APERTURE;
	}
}
exports.PhotographConfig = PhotographConfig;

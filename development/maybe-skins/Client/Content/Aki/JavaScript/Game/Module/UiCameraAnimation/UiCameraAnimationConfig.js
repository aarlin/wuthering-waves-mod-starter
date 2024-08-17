"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraAnimationConfig = void 0);
const ChildUiCameraMappingAll_1 = require("../../../Core/Define/ConfigQuery/ChildUiCameraMappingAll"),
	ChildUiCameraMappingByViewName_1 = require("../../../Core/Define/ConfigQuery/ChildUiCameraMappingByViewName"),
	UiCameraMappingAll_1 = require("../../../Core/Define/ConfigQuery/UiCameraMappingAll"),
	UiCameraMappingByViewName_1 = require("../../../Core/Define/ConfigQuery/UiCameraMappingByViewName"),
	UiShowByViewName_1 = require("../../../Core/Define/ConfigQuery/UiShowByViewName"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
class UiCameraAnimationConfig extends ConfigBase_1.ConfigBase {
	GetViewConfig(i) {
		return UiShowByViewName_1.configUiShowByViewName.GetConfig(i);
	}
	GetUiCameraAnimationConfig(i) {
		return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(16, i);
	}
	GetUiCameraAnimationBlendData(i) {
		return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(15, i);
	}
	GetUiCameraMappingConfig(i) {
		return UiCameraMappingByViewName_1.configUiCameraMappingByViewName.GetConfig(
			i,
		);
	}
	GetChildUiCameraMappingConfig(i) {
		return ChildUiCameraMappingByViewName_1.configChildUiCameraMappingByViewName.GetConfig(
			i,
		);
	}
	GetAllUiCameraMappingConfig() {
		return UiCameraMappingAll_1.configUiCameraMappingAll.GetConfigList();
	}
	GetAllChildUiCameraMappingConfig() {
		return ChildUiCameraMappingAll_1.configChildUiCameraMappingAll.GetConfigList();
	}
}
exports.UiCameraAnimationConfig = UiCameraAnimationConfig;

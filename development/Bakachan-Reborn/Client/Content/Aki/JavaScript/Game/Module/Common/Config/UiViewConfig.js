"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewConfig = void 0);
const UiFloatConfigByViewNameIfNull_1 = require("../../../../Core/Define/ConfigQuery/UiFloatConfigByViewNameIfNull"),
	UiNormalConfigByViewNameIfNull_1 = require("../../../../Core/Define/ConfigQuery/UiNormalConfigByViewNameIfNull"),
	UiShowByViewName_1 = require("../../../../Core/Define/ConfigQuery/UiShowByViewName"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class UiViewConfig extends ConfigBase_1.ConfigBase {
	GetUiShowConfig(e) {
		return UiShowByViewName_1.configUiShowByViewName.GetConfig(e);
	}
	GetUiFloatConfig(e) {
		return UiFloatConfigByViewNameIfNull_1.configUiFloatConfigByViewNameIfNull.GetConfig(
			e,
			e,
			e,
		);
	}
	GetUiNormalConfig(e) {
		return UiNormalConfigByViewNameIfNull_1.configUiNormalConfigByViewNameIfNull.GetConfig(
			e,
			e,
			e,
		);
	}
}
exports.UiViewConfig = UiViewConfig;

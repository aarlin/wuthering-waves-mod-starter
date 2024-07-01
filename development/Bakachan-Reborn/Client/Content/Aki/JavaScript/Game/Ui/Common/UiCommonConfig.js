"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCommonConfig = void 0);
const InteractBackGroundByViewName_1 = require("../../../Core/Define/ConfigQuery/InteractBackGroundByViewName"),
	NpcSystemBackgroundByViewName_1 = require("../../../Core/Define/ConfigQuery/NpcSystemBackgroundByViewName"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class UiCommonConfig extends ConfigBase_1.ConfigBase {
	GetNpcSystemBackgroundByViewName(e) {
		return NpcSystemBackgroundByViewName_1.configNpcSystemBackgroundByViewName.GetConfig(
			e,
		);
	}
	GetInteractBackgroundByViewName(e) {
		return InteractBackGroundByViewName_1.configInteractBackGroundByViewName.GetConfig(
			e,
		);
	}
}
exports.UiCommonConfig = UiCommonConfig;

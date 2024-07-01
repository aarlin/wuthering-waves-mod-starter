"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelUpConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LevelUpConfig extends ConfigBase_1.ConfigBase {
	GetExpBarAnimationLength() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"LevelUpAnimationLength",
		);
	}
	GetLevelUpViewCloseDelay() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"LevelUpViewCloseDelay",
		);
	}
	GetMaxExpCloseDelay() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"MaxExpCloseDelay",
		);
	}
	GetHiddenLevelUpLevel() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"HiddenLevelUpView",
		);
	}
}
exports.LevelUpConfig = LevelUpConfig;

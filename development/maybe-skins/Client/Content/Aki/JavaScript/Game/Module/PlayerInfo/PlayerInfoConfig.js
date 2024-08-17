"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerInfoConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	HeadIconById_1 = require("../../../Core/Define/ConfigQuery/HeadIconById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PlayerInfoConfig extends ConfigBase_1.ConfigBase {
	GetIsUseAccountName() {
		return (
			CommonParamById_1.configCommonParamById.GetBoolConfig(
				"player_use_accountname",
			) ?? !0
		);
	}
	GetMaleIconPath() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"player_male_headicon",
		);
	}
	GetFemaleIconPath() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"player_female_headicon",
		);
	}
	GetMaleStandPath() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"player_male_stand",
		);
	}
	GetFemaleStandPath() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"player_female_stand",
		);
	}
	GetPlayerBigIconPath(e) {
		return HeadIconById_1.configHeadIconById.GetConfig(e).BigIconPath;
	}
	GetPlayerIconPath(e) {
		return HeadIconById_1.configHeadIconById.GetConfig(e)?.IconPath;
	}
}
exports.PlayerInfoConfig = PlayerInfoConfig;

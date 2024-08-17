"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridModel = void 0);
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
class SmallItemGridModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ItemGridCoolDownSecond = 0),
			(this.ItemGridNameMaxLength = 0),
			(this.DefaultQualitySpritePath = "");
	}
	OnInit() {
		return (
			(this.ItemGridNameMaxLength =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"ItemGridNameMaxLength",
				)),
			(this.DefaultQualitySpritePath =
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_QualityVisionB",
				)),
			(this.ItemGridCoolDownSecond =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"ItemGridCoolDownSecond",
				)),
			!0
		);
	}
}
exports.SmallItemGridModel = SmallItemGridModel;

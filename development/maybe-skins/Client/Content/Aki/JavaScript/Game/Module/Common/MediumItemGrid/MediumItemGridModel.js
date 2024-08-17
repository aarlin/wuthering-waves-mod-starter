"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridModel = void 0);
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
class MediumItemGridModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ItemGridCoolDownSecond = 0),
			(this.AttackBuffSpritePath = ""),
			(this.DefenseBuffSpritePath = ""),
			(this.RestoreHealthBuffSpritePath = ""),
			(this.RechargeBuffSpritePath = ""),
			(this.ResurrectionBuffSpritePath = "");
	}
	OnInit() {
		return (
			(this.ItemGridCoolDownSecond =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"ItemGridCoolDownSecond",
				)),
			(this.AttackBuffSpritePath =
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_ItemIconAttack",
				)),
			(this.DefenseBuffSpritePath =
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_ItemIconShield",
				)),
			(this.RestoreHealthBuffSpritePath =
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_ItemIconHeart",
				)),
			(this.RechargeBuffSpritePath =
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_ItemIconPhysical",
				)),
			(this.ResurrectionBuffSpritePath =
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_ItemIconRecover",
				)),
			!0
		);
	}
	OnClear() {
		return !0;
	}
}
exports.MediumItemGridModel = MediumItemGridModel;

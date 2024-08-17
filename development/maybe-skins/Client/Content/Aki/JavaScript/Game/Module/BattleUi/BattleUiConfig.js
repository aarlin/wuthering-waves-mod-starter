"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	BasePropertyById_1 = require("../../../Core/Define/ConfigQuery/BasePropertyById"),
	ElementInfoById_1 = require("../../../Core/Define/ConfigQuery/ElementInfoById"),
	GamepadKeyByKeyName_1 = require("../../../Core/Define/ConfigQuery/GamepadKeyByKeyName"),
	PcKeyByKeyName_1 = require("../../../Core/Define/ConfigQuery/PcKeyByKeyName"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ModelManager_1 = require("../../Manager/ModelManager");
class BattleUiConfig extends ConfigBase_1.ConfigBase {
	GetHardnessPercentList() {
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"HardnessPercentStage1",
			),
			r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"HardnessPercentStage2",
			),
			a = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"HardnessPercentStage3",
			);
		return [
			CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"HardnessPercentStage4",
			),
			a,
			r,
			e,
		];
	}
	GetElementConfig(e) {
		return ElementInfoById_1.configElementInfoById.GetConfig(e);
	}
	GetBufferAnimationSpeed() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"BossHPAttenuateBufferSpeed",
		);
	}
	GetPcKeyConfig(e) {
		return PcKeyByKeyName_1.configPcKeyByKeyName.GetConfig(e);
	}
	GetGamePadKeyConfig(e) {
		return GamepadKeyByKeyName_1.configGamepadKeyByKeyName.GetConfig(e);
	}
	GetPropertyType(e) {
		return BasePropertyById_1.configBasePropertyById.GetConfig(e)
			.ElementPropertyType;
	}
	GetThreadColor(e, r) {
		if (0 === r || 2 === r)
			return ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor3;
		r = ModelManager_1.ModelManager.RoleModel.GetRoleListHighestLevel();
		var a = ModelManager_1.ModelManager.BattleUiModel.ThreatLevel1,
			o = ModelManager_1.ModelManager.BattleUiModel.ThreatLevel3;
		return a <= (r -= e)
			? ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor3
			: r < a && o <= r
				? ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor2
				: ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor1;
	}
}
exports.BattleUiConfig = BattleUiConfig;

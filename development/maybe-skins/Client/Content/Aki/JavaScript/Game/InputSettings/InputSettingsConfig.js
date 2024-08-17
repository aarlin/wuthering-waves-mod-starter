"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputSettingsConfig = void 0);
const ActionMappingAll_1 = require("../../Core/Define/ConfigQuery/ActionMappingAll"),
	ActionMappingByActionName_1 = require("../../Core/Define/ConfigQuery/ActionMappingByActionName"),
	ActionMappingByActionType_1 = require("../../Core/Define/ConfigQuery/ActionMappingByActionType"),
	AxisMappingAll_1 = require("../../Core/Define/ConfigQuery/AxisMappingAll"),
	AxisMappingByAxisName_1 = require("../../Core/Define/ConfigQuery/AxisMappingByAxisName"),
	AxisMappingByAxisType_1 = require("../../Core/Define/ConfigQuery/AxisMappingByAxisType"),
	CombinationActionAll_1 = require("../../Core/Define/ConfigQuery/CombinationActionAll"),
	CombinationActionByActionName_1 = require("../../Core/Define/ConfigQuery/CombinationActionByActionName"),
	CombinationActionByActionType_1 = require("../../Core/Define/ConfigQuery/CombinationActionByActionType"),
	CombinationAxisAll_1 = require("../../Core/Define/ConfigQuery/CombinationAxisAll"),
	GamepadKeyById_1 = require("../../Core/Define/ConfigQuery/GamepadKeyById"),
	GamepadKeyByKeyName_1 = require("../../Core/Define/ConfigQuery/GamepadKeyByKeyName"),
	PcKeyById_1 = require("../../Core/Define/ConfigQuery/PcKeyById"),
	PcKeyByKeyName_1 = require("../../Core/Define/ConfigQuery/PcKeyByKeyName"),
	PlatformIconById_1 = require("../../Core/Define/ConfigQuery/PlatformIconById"),
	ConfigBase_1 = require("../../Core/Framework/ConfigBase");
class InputSettingsConfig extends ConfigBase_1.ConfigBase {
	GetAllActionMappingConfig() {
		return ActionMappingAll_1.configActionMappingAll.GetConfigList();
	}
	GetActionMappingConfigByActionType(e) {
		return ActionMappingByActionType_1.configActionMappingByActionType.GetConfigList(
			e,
		);
	}
	GetActionMappingConfigByActionName(e) {
		return ActionMappingByActionName_1.configActionMappingByActionName.GetConfig(
			e,
		);
	}
	GetAllAxisMappingConfig() {
		return AxisMappingAll_1.configAxisMappingAll.GetConfigList();
	}
	GetAxisMappingConfigByActionType(e) {
		return AxisMappingByAxisType_1.configAxisMappingByAxisType.GetConfigList(e);
	}
	GetAxisMappingConfigByAxisName(e) {
		return AxisMappingByAxisName_1.configAxisMappingByAxisName.GetConfig(e);
	}
	GetAllCombinationActionConfig() {
		return CombinationActionAll_1.configCombinationActionAll.GetConfigList();
	}
	GetCombinationActionConfigByActionName(e) {
		return CombinationActionByActionName_1.configCombinationActionByActionName.GetConfig(
			e,
		);
	}
	GetCombinationActionConfigByActionType(e) {
		return CombinationActionByActionType_1.configCombinationActionByActionType.GetConfigList(
			e,
		);
	}
	GetAllCombinationAxisConfig() {
		return CombinationAxisAll_1.configCombinationAxisAll.GetConfigList();
	}
	GetPcKeyConfig(e) {
		return PcKeyByKeyName_1.configPcKeyByKeyName.GetConfig(e);
	}
	GetPcKeyConfigById(e) {
		return PcKeyById_1.configPcKeyById.GetConfig(e);
	}
	GetGamepadKeyConfig(e) {
		return GamepadKeyByKeyName_1.configGamepadKeyByKeyName.GetConfig(e);
	}
	GetGamepadKeyConfigById(e) {
		return GamepadKeyById_1.configGamepadKeyById.GetConfig(e);
	}
	GetPlatformIconConfig(e) {
		return PlatformIconById_1.configPlatformIconById.GetConfig(e);
	}
}
exports.InputSettingsConfig = InputSettingsConfig;
//# sourceMappingURL=InputSettingsConfig.js.map

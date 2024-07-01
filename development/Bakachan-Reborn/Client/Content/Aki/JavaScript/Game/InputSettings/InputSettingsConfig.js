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
	GetActionMappingConfigByActionType(i) {
		return ActionMappingByActionType_1.configActionMappingByActionType.GetConfigList(
			i,
		);
	}
	GetActionMappingConfigByActionName(i) {
		return ActionMappingByActionName_1.configActionMappingByActionName.GetConfig(
			i,
		);
	}
	GetAllAxisMappingConfig() {
		return AxisMappingAll_1.configAxisMappingAll.GetConfigList();
	}
	GetAxisMappingConfigByActionType(i) {
		return AxisMappingByAxisType_1.configAxisMappingByAxisType.GetConfigList(i);
	}
	GetAxisMappingConfigByAxisName(i) {
		return AxisMappingByAxisName_1.configAxisMappingByAxisName.GetConfig(i);
	}
	GetAllCombinationActionConfig() {
		return CombinationActionAll_1.configCombinationActionAll.GetConfigList();
	}
	GetCombinationActionConfigByActionName(i) {
		return CombinationActionByActionName_1.configCombinationActionByActionName.GetConfig(
			i,
		);
	}
	GetCombinationActionConfigByActionType(i) {
		return CombinationActionByActionType_1.configCombinationActionByActionType.GetConfigList(
			i,
		);
	}
	GetAllCombinationAxisConfig() {
		return CombinationAxisAll_1.configCombinationAxisAll.GetConfigList();
	}
	GetPcKeyConfig(i) {
		return PcKeyByKeyName_1.configPcKeyByKeyName.GetConfig(i);
	}
	GetPcKeyConfigById(i) {
		return PcKeyById_1.configPcKeyById.GetConfig(i);
	}
	GetGamepadKeyConfig(i) {
		return GamepadKeyByKeyName_1.configGamepadKeyByKeyName.GetConfig(i);
	}
	GetGamepadKeyConfigById(i) {
		return GamepadKeyById_1.configGamepadKeyById.GetConfig(i);
	}
	GetPlatformIconConfig(i) {
		return PlatformIconById_1.configPlatformIconById.GetConfig(i);
	}
}
exports.InputSettingsConfig = InputSettingsConfig;

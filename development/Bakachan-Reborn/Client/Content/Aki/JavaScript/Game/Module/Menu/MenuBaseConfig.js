"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuBaseConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	AxisRevertByRevertType_1 = require("../../../Core/Define/ConfigQuery/AxisRevertByRevertType"),
	KeySettingByTypeIdAndInputControllerType_1 = require("../../../Core/Define/ConfigQuery/KeySettingByTypeIdAndInputControllerType"),
	KeyTypeAll_1 = require("../../../Core/Define/ConfigQuery/KeyTypeAll"),
	MainTypeAll_1 = require("../../../Core/Define/ConfigQuery/MainTypeAll"),
	MainTypeById_1 = require("../../../Core/Define/ConfigQuery/MainTypeById"),
	MenuConfigAll_1 = require("../../../Core/Define/ConfigQuery/MenuConfigAll"),
	MenuConfigByFunctionId_1 = require("../../../Core/Define/ConfigQuery/MenuConfigByFunctionId"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MenuBaseConfig extends ConfigBase_1.ConfigBase {
	GetMenuBaseConfig() {
		var e = MenuConfigAll_1.configMenuConfigAll.GetConfigList();
		if (e && 0 < e.length) return e;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Menu", 8, "没有基础配置文件，请检查配置表是否缺失");
	}
	GetMainConfig() {
		var e = MainTypeAll_1.configMainTypeAll.GetConfigList();
		if (e && 0 < e.length) {
			var n = new Map();
			for (const i of e) n.set(i.Id, i);
			return n;
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Menu",
				8,
				"没有对应的主类型基础配置，请检查配置表是否缺失",
			);
	}
	GetMainTypeConfigById(e) {
		return MainTypeById_1.configMainTypeById.GetConfig(e);
	}
	GetMenuConfigByFunctionId(e) {
		return MenuConfigByFunctionId_1.configMenuConfigByFunctionId.GetConfig(e);
	}
	GetAllKeyTypeConfig() {
		return KeyTypeAll_1.configKeyTypeAll.GetConfigList();
	}
	GetKeySettingConfigListByTypeIdAndInputControllerType(e, n) {
		return KeySettingByTypeIdAndInputControllerType_1.configKeySettingByTypeIdAndInputControllerType.GetConfigList(
			e,
			n,
		);
	}
	GetAxisRevertConfigListByRevertType(e) {
		return AxisRevertByRevertType_1.configAxisRevertByRevertType.GetConfigList(
			e,
		);
	}
}
exports.MenuBaseConfig = MenuBaseConfig;

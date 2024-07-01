"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComponentConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ElementIconTagById_1 = require("../../../../Core/Define/ConfigQuery/ElementIconTagById"),
	EntranceIconTagById_1 = require("../../../../Core/Define/ConfigQuery/EntranceIconTagById"),
	ItemIconTagById_1 = require("../../../../Core/Define/ConfigQuery/ItemIconTagById"),
	MonsterIconTagById_1 = require("../../../../Core/Define/ConfigQuery/MonsterIconTagById"),
	QualityIconTagById_1 = require("../../../../Core/Define/ConfigQuery/QualityIconTagById"),
	RoleIconTagById_1 = require("../../../../Core/Define/ConfigQuery/RoleIconTagById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ComponentConfig extends ConfigBase_1.ConfigBase {
	GetItemConfigParam(o) {
		var e = ItemIconTagById_1.configItemIconTagById.GetConfig(o);
		if (e) return e.ConfigParam;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"LguiUtil",
				11,
				"[ComponentConfig.GetItemConfigParam]查找配置数据失败，数据为空",
				["标签", o],
			);
	}
	GetQualityConfigParam(o) {
		var e = QualityIconTagById_1.configQualityIconTagById.GetConfig(o);
		if (e) return e.ConfigParam;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"LguiUtil",
				11,
				"[ComponentConfig.GetQualityConfigParam]查找配置数据失败，数据为空",
				["标签", o],
			);
	}
	GetRoleConfigParam(o) {
		var e = RoleIconTagById_1.configRoleIconTagById.GetConfig(o);
		if (e) return e.ConfigParam;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"LguiUtil",
				11,
				"[ComponentConfig.GetRoleConfigParam]查找配置数据失败，数据为空",
				["标签", o],
			);
	}
	GetElementConfigParam(o) {
		var e = ElementIconTagById_1.configElementIconTagById.GetConfig(o);
		if (e) return e.ConfigParam;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"LguiUtil",
				11,
				"[ComponentConfig.GetElementIconTag]查找配置数据失败，数据为空",
				["标签", o],
			);
	}
	GetMonsterConfigParam(o) {
		var e = MonsterIconTagById_1.configMonsterIconTagById.GetConfig(o);
		if (!e || e) return e.ConfigParam;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"LguiUtil",
				11,
				"[ComponentConfig.GetMonsterConfigParam]查找配置数据失败，数据为空",
				["标签", o],
			);
	}
	GetDungeonEntranceConfigParam(o) {
		var e = EntranceIconTagById_1.configEntranceIconTagById.GetConfig(o);
		if (!e || e) return e.ConfigParam;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"LguiUtil",
				11,
				"[ComponentConfig.GetDungeonConfigParam]查找配置数据失败，数据为空",
				["标签", o],
			);
	}
}
exports.ComponentConfig = ComponentConfig;

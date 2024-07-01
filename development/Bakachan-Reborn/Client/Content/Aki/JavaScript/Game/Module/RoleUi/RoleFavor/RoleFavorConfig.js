"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	FavorGoodsByRoleId_1 = require("../../../../Core/Define/ConfigQuery/FavorGoodsByRoleId"),
	FavorLevelByLevel_1 = require("../../../../Core/Define/ConfigQuery/FavorLevelByLevel"),
	FavorRoleInfoByRoleId_1 = require("../../../../Core/Define/ConfigQuery/FavorRoleInfoByRoleId"),
	FavorStoryByRoleId_1 = require("../../../../Core/Define/ConfigQuery/FavorStoryByRoleId"),
	FavorTabCameraById_1 = require("../../../../Core/Define/ConfigQuery/FavorTabCameraById"),
	FavorWordByRoleIdAndType_1 = require("../../../../Core/Define/ConfigQuery/FavorWordByRoleIdAndType"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class RoleFavorConfig extends ConfigBase_1.ConfigBase {
	GetFavorLevelConfig(o) {
		if ((o = FavorLevelByLevel_1.configFavorLevelByLevel.GetConfig(o)))
			return o;
	}
	GetFavorRoleInfoConfig(o) {
		var e = FavorRoleInfoByRoleId_1.configFavorRoleInfoByRoleId.GetConfig(o);
		if (e) return e;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Role", 44, "角色档案配置表获取配置失败,RoleId = ", [
				"roleId",
				o,
			]);
	}
	GetFavorGoodsConfig(o) {
		var e = FavorGoodsByRoleId_1.configFavorGoodsByRoleId.GetConfigList(o);
		if (e) return e;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Role", 44, "好感度物品配置表获取配置失败,RoleId = ", [
				"roleId",
				o,
			]);
	}
	GetFavorStoryConfig(o) {
		var e = FavorStoryByRoleId_1.configFavorStoryByRoleId.GetConfigList(o);
		if (e) return e;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Role",
				44,
				"好感度故事配置表获取配置失败,RoleId =  Order By Sort",
				["roleId", o],
			);
	}
	GetFavorWordConfig(o, e) {
		var r =
			FavorWordByRoleIdAndType_1.configFavorWordByRoleIdAndType.GetConfigList(
				o,
				e,
			);
		if (r) return r;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Role",
				44,
				`好感度语音配置表获取配置失败,RoleId = ${o} Type = ` + e,
			);
	}
	GetFavorTabCameraConfig(o) {
		var e = FavorTabCameraById_1.configFavorTabCameraById.GetConfig(o);
		if (e) return e;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Role", 44, "好感度切页镜头配置获取失败,Id = ", [
				"favorTabType",
				o,
			]);
	}
}
exports.RoleFavorConfig = RoleFavorConfig;

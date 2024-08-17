"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelPlayConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ExchangeRewardById_1 = require("../../../Core/Define/ConfigQuery/ExchangeRewardById"),
	LevelPlayDataById_1 = require("../../../Core/Define/ConfigQuery/LevelPlayDataById"),
	LevelPlayNodeDataByKey_1 = require("../../../Core/Define/ConfigQuery/LevelPlayNodeDataByKey"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LevelPlayConfig extends ConfigBase_1.ConfigBase {
	GetExchangeRewardInfo(e) {
		var o = ExchangeRewardById_1.configExchangeRewardById.GetConfig(e);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneGameplay",
						19,
						"找不到兑换奖励表配置",
						["配置表路径", "Source/Config/Raw/Tables/d.兑换奖励配置"],
						["Id", e],
					)),
			o
		);
	}
	GetLevelPlayConfig(e) {
		var o = LevelPlayDataById_1.configLevelPlayDataById.GetConfig(e, !1);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("SceneGameplay", 19, "找不到任务配置", [
						"玩法Id",
						e,
					])),
			o
		);
	}
	GetLevelPlayNodeConfig(e, o) {
		var r = LevelPlayNodeDataByKey_1.configLevelPlayNodeDataByKey.GetConfig(
			e + "_" + o,
			!1,
		);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Quest",
						19,
						"找不到玩法节点配置",
						["玩法Id", e],
						["节点Id", o],
					)),
			r
		);
	}
}
exports.LevelPlayConfig = LevelPlayConfig;

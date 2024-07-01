"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	BattlePassById_1 = require("../../../../Core/Define/ConfigQuery/BattlePassById"),
	BattlePassRewardByBattlePassId_1 = require("../../../../Core/Define/ConfigQuery/BattlePassRewardByBattlePassId"),
	BattlePassTaskByTaskId_1 = require("../../../../Core/Define/ConfigQuery/BattlePassTaskByTaskId"),
	BattlePassUnlockPopByBattlePassTypeId_1 = require("../../../../Core/Define/ConfigQuery/BattlePassUnlockPopByBattlePassTypeId"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class BattlePassConfig extends ConfigBase_1.ConfigBase {
	GetAllRewardData(e) {
		return BattlePassRewardByBattlePassId_1.configBattlePassRewardByBattlePassId
			.GetConfigList(e)
			.concat(
				BattlePassRewardByBattlePassId_1.configBattlePassRewardByBattlePassId.GetConfigList(
					0,
				),
			);
	}
	GetBattlePassData(e) {
		var a = BattlePassById_1.configBattlePassById.GetConfig(e);
		if (a) return a;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Temp",
				11,
				"获取战令配置错误，BattlePass表格里没有这个id",
				["battlePassId", e],
			);
	}
	GetBattlePassTask(e) {
		var a = BattlePassTaskByTaskId_1.configBattlePassTaskByTaskId.GetConfig(e);
		if (a) return a;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Temp",
				11,
				"获取战令配置错误，BattlePassTask表格里没有这个id",
				["taskId", e],
			);
	}
	GetBattlePassUnlock(e) {
		var a =
			BattlePassUnlockPopByBattlePassTypeId_1.configBattlePassUnlockPopByBattlePassTypeId.GetConfig(
				e,
			);
		if (a) return a;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Temp",
				54,
				"获取战令配置错误，BattlePassTask表格里没有这个id",
				["taskId", e],
			);
	}
	GetBattlePassUnlockReward(e, a) {
		a.length = 0;
		var t =
			BattlePassUnlockPopByBattlePassTypeId_1.configBattlePassUnlockPopByBattlePassTypeId.GetConfig(
				e,
			);
		if (t)
			for (var [s, o] of t.UnlockReward)
				(s = [{ IncId: 0, ItemId: s }, o]), a.push(s);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Temp", 54, "BattlePassUnlockPop里没有该type", [
					"type",
					e,
				]);
	}
}
exports.BattlePassConfig = BattlePassConfig;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonInfo = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LogicTreeContainer_1 = require("../GeneralLogicTree/LogicTreeContainer");
class InstanceDungeonInfo extends LogicTreeContainer_1.LogicTreeContainer {
	constructor(e) {
		super(),
			(this.IsInteractValid = !0),
			(this.uli = 0),
			(this.cli = ""),
			(this.mli = 0),
			(this.dli = 0),
			(this.Cli = 0),
			(this.gli = void 0),
			(this.fli = void 0),
			(this.pli = 0),
			(this.vli = 0),
			(this.Mli = void 0),
			(this.Sli = void 0),
			(this.Eli = 0),
			(this.uli = e);
	}
	get Id() {
		return this.uli;
	}
	get Name() {
		return this.cli;
	}
	get LevelPlayEntityId() {
		return this.mli;
	}
	get MapId() {
		return this.dli;
	}
	get InstanceId() {
		return this.Cli;
	}
	get TrackConfig() {
		return this.gli;
	}
	get RewardConfig() {
		return this.fli;
	}
	get RewardId() {
		return this.pli;
	}
	get RewardEntityId() {
		return this.vli;
	}
	get AfterGetRewardAction() {
		return this.Mli;
	}
	get LevelPlayOpenAction() {
		return this.Sli;
	}
	get SubType() {
		return this.Eli;
	}
	InitConfig() {
		var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
			this.uli,
		);
		if (e) {
			this.dli = e.LevelId;
			var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
			);
			if (i)
				switch (
					((this.mli = e.LevelPlayEntityId),
					(this.Cli = e.InstanceId),
					(this.cli = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidName)),
					(this.gli = e.LevelPlayTrack),
					(this.Sli = e.LevelPlayOpenActions),
					(this.Eli = i.InstSubType),
					e.LevelPlayRewardConfig.Type)
				) {
					case "Interact":
						(this.pli = e.LevelPlayRewardConfig.RewardId),
							(this.vli = e.LevelPlayRewardConfig.RewardEntityId),
							(this.Mli = e.LevelPlayRewardConfig.RewardCompleteActions);
						break;
					case "Automatic":
						this.pli = e.LevelPlayRewardConfig.RewardId;
				}
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"InstanceDungeon",
						19,
						"创建副本时找不到副本配置",
						["副本id", this.dli],
						["玩法id", this.uli],
					);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("SceneGameplay", 19, "创建玩法时找不到玩法配置", [
					"玩法id",
					this.uli,
				]);
	}
	GetInstanceDungeonConfig() {
		return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
			this.uli,
		);
	}
	GetInstanceDungeonNodeConfig(e) {
		return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(
			this.uli,
			e,
		);
	}
}
exports.InstanceDungeonInfo = InstanceDungeonInfo;

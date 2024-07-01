"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdventureGuideConfig = void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
	AdventureTaskAll_1 = require("../../../Core/Define/ConfigQuery/AdventureTaskAll"),
	AdventureTaskById_1 = require("../../../Core/Define/ConfigQuery/AdventureTaskById"),
	AdventureTaskChapterAll_1 = require("../../../Core/Define/ConfigQuery/AdventureTaskChapterAll"),
	AdventureTaskChapterById_1 = require("../../../Core/Define/ConfigQuery/AdventureTaskChapterById"),
	DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById"),
	DungeonDetectionAll_1 = require("../../../Core/Define/ConfigQuery/DungeonDetectionAll"),
	DungeonDetectionById_1 = require("../../../Core/Define/ConfigQuery/DungeonDetectionById"),
	InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
	InstanceDungeonEntranceById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceById"),
	MonsterDetectionAll_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionAll"),
	MonsterDetectionById_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	SecondaryGuideDataById_1 = require("../../../Core/Define/ConfigQuery/SecondaryGuideDataById"),
	SilentAreaDetectionAll_1 = require("../../../Core/Define/ConfigQuery/SilentAreaDetectionAll"),
	SilentAreaDetectionById_1 = require("../../../Core/Define/ConfigQuery/SilentAreaDetectionById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ModelManager_1 = require("../../Manager/ModelManager");
class AdventureGuideConfig extends ConfigBase_1.ConfigBase {
	GetAdventureTaskConfig(e) {
		return AdventureTaskById_1.configAdventureTaskById.GetConfig(e);
	}
	GetAllAdventureTaskConfig() {
		return AdventureTaskAll_1.configAdventureTaskAll.GetConfigList();
	}
	GetDropShowInfo(e) {
		return DropPackageById_1.configDropPackageById.GetConfig(e).DropPreview;
	}
	GetShowReward(e, n) {
		var t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
		let r = 0;
		if (n) {
			if (e.has(n)) r = e.get(n);
			else
				for (let t = n - 1; 0 <= t; t--)
					if (e.has(t)) {
						r = e.get(t);
						break;
					}
		} else if (e.has(t)) r = e.get(t);
		else
			for (let n = t - 1; 0 <= n; n--)
				if (e.has(n)) {
					r = e.get(n);
					break;
				}
		if (0 < r) {
			const e = DropPackageById_1.configDropPackageById.GetConfig(r);
			if (e) return e.DropPreview;
		}
		return DropPackageById_1.configDropPackageById.GetConfig(e.get(1))
			.DropPreview;
	}
	GetChapterAdventureConfig(e) {
		return AdventureTaskChapterById_1.configAdventureTaskChapterById.GetConfig(
			e,
		);
	}
	GetAllMonsterDetection() {
		return MonsterDetectionAll_1.configMonsterDetectionAll.GetConfigList();
	}
	GetAllDungeonDetection() {
		return DungeonDetectionAll_1.configDungeonDetectionAll.GetConfigList();
	}
	GetAllSilentAreaDetection() {
		return SilentAreaDetectionAll_1.configSilentAreaDetectionAll.GetConfigList();
	}
	GetMonsterDetectionConfById(e) {
		return MonsterDetectionById_1.configMonsterDetectionById.GetConfig(e);
	}
	GetDungeonDetectionConfById(e) {
		return DungeonDetectionById_1.configDungeonDetectionById.GetConfig(e);
	}
	GetSilentAreaDetectionConfById(e) {
		return SilentAreaDetectionById_1.configSilentAreaDetectionById.GetConfig(e);
	}
	GetMaxChapter() {
		var e = ConfigCommon_1.ConfigCommon.ToList(
			AdventureTaskChapterAll_1.configAdventureTaskChapterAll.GetConfigList(),
		);
		return e.sort((e, n) => n.Id - e.Id), e[0].Id;
	}
	GetMaxDungeonLevel(e) {
		let n = 0;
		for (const r of InstanceDungeonEntranceById_1.configInstanceDungeonEntranceById.GetConfig(
			e,
		).InstanceDungeonList) {
			var t;
			(t = (t = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(r))
				.DifficultyLevel[t.DifficultyLevel.length - 1]) > n && (n = t);
		}
		return n;
	}
	GetSecondaryGuideDataTextById(e) {
		return SecondaryGuideDataById_1.configSecondaryGuideDataById.GetConfig(e)
			.Text;
	}
	GetSecondaryGuideDataConf(e) {
		return SecondaryGuideDataById_1.configSecondaryGuideDataById.GetConfig(e);
	}
	GetLocalFilterTextById(e) {
		return (
			(e = SecondaryGuideDataById_1.configSecondaryGuideDataById.GetConfig(e)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Text) ?? ""
		);
	}
}
exports.AdventureGuideConfig = AdventureGuideConfig;

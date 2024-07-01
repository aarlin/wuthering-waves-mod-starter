"use strict";
var EDangerType, EDungeonType, EDungeonSubType;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WORLD_LEVEL_MAX =
		exports.WORLD_LEVEL_MIN =
		exports.EDEFAULTCATEGORY =
		exports.matTypeDes =
		exports.QuestRewardViewParam =
		exports.BigWorldID =
		exports.Monster062DetectConfID =
		exports.SoundAreaDetectionRecord =
		exports.SilentAreaDetectionRecord =
		exports.DungeonDetectionRecord =
		exports.MonsterDetectionRecord =
		exports.AdventureTaskRecord =
		exports.EDungeonSubType =
		exports.EDungeonType =
		exports.EDangerType =
			void 0),
	(function (e) {
		(e[(e.Low = 1)] = "Low"),
			(e[(e.Middle = 2)] = "Middle"),
			(e[(e.High = 3)] = "High"),
			(e[(e.VeryLow = 0)] = "VeryLow");
	})((EDangerType = exports.EDangerType || (exports.EDangerType = {}))),
	(function (e) {
		(e[(e.Mat = 4)] = "Mat"),
			(e[(e.Tower = 5)] = "Tower"),
			(e[(e.Tutorial = 6)] = "Tutorial"),
			(e[(e.Weekly = 7)] = "Weekly"),
			(e[(e.Rouge = 18)] = "Rouge"),
			(e[(e.Simulation = 19)] = "Simulation"),
			(e[(e.Boss = 21)] = "Boss"),
			(e[(e.NoSoundArea = 22)] = "NoSoundArea"),
			(e[(e.LordGym = 61)] = "LordGym"),
			(e[(e.SkillTeach = 62)] = "SkillTeach");
	})((EDungeonType = exports.EDungeonType || (exports.EDungeonType = {}))),
	(function (e) {
		(e[(e.RoleTrail = 7)] = "RoleTrail"),
			(e[(e.SingleTower = 8)] = "SingleTower"),
			(e[(e.LoopTower = 9)] = "LoopTower"),
			(e[(e.WeaponMat = 10)] = "WeaponMat"),
			(e[(e.SkillMat = 11)] = "SkillMat"),
			(e[(e.Roguelike = 15)] = "Roguelike"),
			(e[(e.Mowing = 19)] = "Mowing"),
			(e[(e.BossRush = 20)] = "BossRush");
	})(
		(EDungeonSubType =
			exports.EDungeonSubType || (exports.EDungeonSubType = {})),
	);
class AdventureTaskRecord {
	constructor(e, t) {
		(this.Progress = 0), (this.AdventureTaskBase = e), (this.Status = t);
	}
	GetTotalNum() {
		return this.AdventureTaskBase.NeedProgress;
	}
}
exports.AdventureTaskRecord = AdventureTaskRecord;
class DetectionRecord {
	constructor(e, t, o) {
		(this.IsTargeting = !1),
			(this.IsLock = t),
			(this.RefreshTime = o),
			(this.Conf = e);
	}
}
class MonsterDetectionRecord extends DetectionRecord {}
exports.MonsterDetectionRecord = MonsterDetectionRecord;
class DungeonDetectionRecord extends DetectionRecord {}
exports.DungeonDetectionRecord = DungeonDetectionRecord;
class SilentAreaDetectionRecord extends DetectionRecord {}
exports.SilentAreaDetectionRecord = SilentAreaDetectionRecord;
class SoundAreaDetectionRecord {
	constructor(e, t, o) {
		(this.Type = void 0),
			(this.DungeonDetectionRecord = void 0),
			(this.SilentAreaDetectionRecord = void 0),
			(this.Type = e),
			(this.DungeonDetectionRecord = t),
			(this.SilentAreaDetectionRecord = o);
	}
	get Conf() {
		switch (this.Type) {
			case 0:
				return this.DungeonDetectionRecord?.Conf;
			case 1:
				return this.SilentAreaDetectionRecord?.Conf;
			default:
				return;
		}
	}
	get IsLock() {
		switch (this.Type) {
			case 0:
				return this.DungeonDetectionRecord?.IsLock;
			case 1:
				return this.SilentAreaDetectionRecord?.IsLock;
			default:
				return !1;
		}
	}
}
(exports.SoundAreaDetectionRecord = SoundAreaDetectionRecord),
	(exports.Monster062DetectConfID = 10010053),
	(exports.BigWorldID = 8);
class QuestRewardViewParam {
	constructor() {
		(this.IsShowExpItem = !1),
			(this.RewardList = void 0),
			(this.AreaId = 0),
			(this.BeforeContributionLevel = 0),
			(this.BeforeContributionValue = 0);
	}
}
(exports.QuestRewardViewParam = QuestRewardViewParam),
	(exports.matTypeDes = {
		0: "AdventureMatType_All",
		1: "AdventureMatType_Weapon",
		2: "AdventureMatType_Character",
		3: "AdventureMatType_Experience",
	}),
	(exports.EDEFAULTCATEGORY = 16),
	(exports.WORLD_LEVEL_MIN = 1),
	(exports.WORLD_LEVEL_MAX = 8);

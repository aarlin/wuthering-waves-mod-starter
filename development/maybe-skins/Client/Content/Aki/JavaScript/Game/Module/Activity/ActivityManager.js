"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityManager = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	FragmentMemoryActivityController_1 = require("../FragmentMemory/FragmentMemoryActivityController"),
	ActivityBeginnerBookController_1 = require("./ActivityContent/BeginnerBook/ActivityBeginnerBookController"),
	BossRushController_1 = require("./ActivityContent/BossRush/BossRushController"),
	ActivityCollectionController_1 = require("./ActivityContent/Collection/ActivityCollectionController"),
	ActivityDailyAdventureController_1 = require("./ActivityContent/DailyAdventure/ActivityDailyAdventureController"),
	ActivityDoubleRewardController_1 = require("./ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	ActivityLongShanController_1 = require("./ActivityContent/LongShan/ActivityLongShanController"),
	ActivityMowingController_1 = require("./ActivityContent/Mowing/ActivityMowingController"),
	ActivityNoviceJourneyController_1 = require("./ActivityContent/NoviceJourney/ActivityNoviceJourneyController"),
	ActivityPhantomCollectController_1 = require("./ActivityContent/PhantomCollect/ActivityPhantomCollectController"),
	ActivityRoleGuideController_1 = require("./ActivityContent/RoleGuide/ActivityRoleGuideController"),
	ActivityRoleTrialController_1 = require("./ActivityContent/RoleTrial/ActivityRoleTrialController"),
	ActivityRogueController_1 = require("./ActivityContent/RougeActivity/ActivityRogueController"),
	ActivityRunController_1 = require("./ActivityContent/Run/ActivityRunController"),
	ActivitySevenDaySignController_1 = require("./ActivityContent/SevenDaySign/ActivitySevenDaySignController"),
	ActivityTimePointRewardController_1 = require("./ActivityContent/TimePointReward/ActivityTimePointRewardController"),
	ActivityTowerGuideController_1 = require("./ActivityContent/TowerGuide/ActivityTowerGuideController"),
	ActivityTurntableController_1 = require("./ActivityContent/Turntable/ActivityTurntableController"),
	ActivityUniversalController_1 = require("./ActivityContent/UniversalActivity/ActivityUniversalController");
class ActivityManager {
	constructor() {}
	static Init() {
		this.S3e();
		for (const o in Protocol_1.Aki.Protocol.gBs) {
			var t = Number(o);
			isNaN(t) ||
				(t = this.E3e.get(t)) ||
				(Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Activity", 28, "没有注册活动类型", ["type", t]));
		}
		this.y3e();
	}
	static S3e() {
		this.E3e.set(
			Protocol_1.Aki.Protocol.gBs.Proto_Parkour,
			new ActivityRunController_1.ActivityRunController(),
		),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_GatherActivity,
				new ActivityCollectionController_1.ActivityCollectionController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_Sign,
				new ActivitySevenDaySignController_1.ActivitySevenDaySignController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_NewBieCourse,
				new ActivityNoviceJourneyController_1.ActivityNoviceJourneyController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_PureUIActivity,
				new ActivityUniversalController_1.ActivityUniversalController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_TowerGuide,
				new ActivityTowerGuideController_1.ActivityTowerGuideController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_WorldNewJourney,
				new ActivityBeginnerBookController_1.ActivityBeginnerBookController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_RougeActivity,
				new ActivityRogueController_1.ActivityRogueController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_RoleTrialActivity,
				new ActivityRoleTrialController_1.ActivityRoleTrialController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_Harvest,
				new ActivityMowingController_1.ActivityMowingController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_DoubleInstanceRewardActivity,
				new ActivityDoubleRewardController_1.ActivityDoubleRewardController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_NewRoleGuideActivity,
				new ActivityRoleGuideController_1.ActivityRoleGuideController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_PhantomCollect,
				new ActivityPhantomCollectController_1.ActivityPhantomCollectController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_DailyAdventureActivity,
				new ActivityDailyAdventureController_1.ActivityDailyAdventureController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_LongShanMainActivity,
				new ActivityLongShanController_1.ActivityLongShanController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_BossRushActivity,
				new BossRushController_1.BossRushController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_TurnTableActivity,
				new ActivityTurntableController_1.ActivityTurntableController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_TimePointRewardActivity,
				new ActivityTimePointRewardController_1.ActivityTimePointRewardController(),
			),
			this.E3e.set(
				Protocol_1.Aki.Protocol.gBs.Proto_PhotoMemoryActivity,
				new FragmentMemoryActivityController_1.FragmentMemoryActivityController(),
			);
	}
	static y3e() {
		this.E3e.forEach((t, o) => {
			t.Init();
		});
	}
	static GetActivityController(t) {
		return this.E3e.get(t);
	}
	static IsOpeningActivityView() {
		let t = !1;
		var o = Array.from(this.E3e.values()),
			e = o.length;
		for (let i = 0; i < e; i++)
			if (o[i].GetIsOpeningActivityRelativeView()) {
				t = !0;
				break;
			}
		return t;
	}
	static Clear() {
		this.E3e.forEach((t, o) => {
			t.Clear();
		}),
			this.E3e.clear();
	}
}
(exports.ActivityManager = ActivityManager).E3e = new Map();

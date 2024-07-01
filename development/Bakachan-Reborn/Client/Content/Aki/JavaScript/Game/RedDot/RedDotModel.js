"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotModel = void 0);
const Log_1 = require("../../Core/Common/Log"),
	Tree_1 = require("../../Core/Container/Tree"),
	ModelBase_1 = require("../../Core/Framework/ModelBase"),
	StringBuilder_1 = require("../../Core/Utils/StringBuilder"),
	StringUtils_1 = require("../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	RedDotAchievement_1 = require("../Module/Achievement/RedDotAchievement"),
	RedDotAchievementCategory_1 = require("../Module/Achievement/RedDotAchievementCategory"),
	RedDotActivityRun_1 = require("../Module/Activity/ActivityContent/Run/RedDotActivityRun"),
	RedDotActivityEntrance_1 = require("../Module/Activity/RedDotActivityEntrance"),
	RedDotCommonActivityPage_1 = require("../Module/Activity/RedDotCommonActivityPage"),
	RedDotItemHandBook_1 = require("../Module/HandBook/RedDotItemHandBook"),
	RedDotPhantomHandBook_1 = require("../Module/HandBook/RedDotPhantomHandBook"),
	RedDotAdventureBattleButton_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureBattleButton"),
	RedDotAdventureDailyActivityTab_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureDailyActivityTab"),
	RedDotAdventureFirstAward_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAward"),
	RedDotAdventureFirstAwardCategory_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAwardCategory"),
	RedDotAdventureFirstAwardResult_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAwardResult"),
	RedDotAdventureManual_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureManual"),
	RedDotBattlePass_1 = require("./RedDots/BattlePass/RedDotBattlePass"),
	RedDotBattlePassAlwaysTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassAlwaysTaskTab"),
	RedDotBattlePassDayTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassDayTaskTab"),
	RedDotBattlePassPayButton_1 = require("./RedDots/BattlePass/RedDotBattlePassPayButton"),
	RedDotBattlePassReward_1 = require("./RedDots/BattlePass/RedDotBattlePassReward"),
	RedDotBattlePassTask_1 = require("./RedDots/BattlePass/RedDotBattlePassTask"),
	RedDotBattlePassWeekTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassWeekTaskTab"),
	RedDotBattleViewGachaButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewGachaButton"),
	RedDotBattleViewResonanceButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewResonanceButton"),
	RedDotBattleViewShopButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewShopButton"),
	BossRushRewardRedDot_1 = require("./RedDots/BossRush/BossRushRewardRedDot"),
	RedDotCalabash_1 = require("./RedDots/CalabashSystem/RedDotCalabash"),
	RedDotCalabashTab_1 = require("./RedDots/CalabashSystem/RedDotCalabashTab"),
	RedDotChatRoom_1 = require("./RedDots/Chat/RedDotChatRoom"),
	RedDotChatView_1 = require("./RedDots/Chat/RedDotChatView"),
	RedDotComposeLevel_1 = require("./RedDots/ComposeSystem/RedDotComposeLevel"),
	RedDotCookerLevel_1 = require("./RedDots/CookSystem/RedDotCookerLevel"),
	FragmentMemoryCollectRewardRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryCollectRewardRedDot"),
	FragmentMemoryEntranceRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryEntranceRedDot"),
	FragmentMemoryTopicRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryTopicRedDot"),
	RedDotFriendNewApplication_1 = require("./RedDots/FriendSystem/RedDotFriendNewApplication"),
	RedDotFunctionAdventureGuide_1 = require("./RedDots/FunctionMenu/RedDotFunctionAdventureGuide"),
	RedDotFunctionFriend_1 = require("./RedDots/FunctionMenu/RedDotFunctionFriend"),
	RedDotFunctionInventory_1 = require("./RedDots/FunctionMenu/RedDotFunctionInventory"),
	RedDotFunctionMail_1 = require("./RedDots/FunctionMenu/RedDotFunctionMail"),
	RedDotFunctionNotice_1 = require("./RedDots/FunctionMenu/RedDotFunctionNotice"),
	RedDotFunctionPayShop_1 = require("./RedDots/FunctionMenu/RedDotFunctionPayShop"),
	RedDotFunctionPhantom_1 = require("./RedDots/FunctionMenu/RedDotFunctionPhantom"),
	RedDotFunctionRole_1 = require("./RedDots/FunctionMenu/RedDotFunctionRole"),
	RedDotFunctionTutorial_1 = require("./RedDots/FunctionMenu/RedDotFunctionTutorial"),
	RedDotInfluenceReputation_1 = require("./RedDots/Influence/RedDotInfluenceReputation"),
	RedDotInfluenceReward_1 = require("./RedDots/Influence/RedDotInfluenceReward"),
	RedDotInventoryCard_1 = require("./RedDots/Inventory/RedDotInventoryCard"),
	RedDotInventoryCollection_1 = require("./RedDots/Inventory/RedDotInventoryCollection"),
	RedDotInventoryCommon_1 = require("./RedDots/Inventory/RedDotInventoryCommon"),
	RedDotInventoryMaterial_1 = require("./RedDots/Inventory/RedDotInventoryMaterial"),
	RedDotInventoryMissionItem_1 = require("./RedDots/Inventory/RedDotInventoryMissionItem"),
	RedDotInventoryPhantom_1 = require("./RedDots/Inventory/RedDotInventoryPhantom"),
	RedDotInventorySpecialItem_1 = require("./RedDots/Inventory/RedDotInventorySpecialItem"),
	RedDotInventoryVirtual_1 = require("./RedDots/Inventory/RedDotInventoryVirtual"),
	RedDotInventoryWeapon_1 = require("./RedDots/Inventory/RedDotInventoryWeapon"),
	RedDotMailBoxFilter_1 = require("./RedDots/Mail/RedDotMailBoxFilter"),
	RedDotMailBoxImportantFilter_1 = require("./RedDots/Mail/RedDotMailBoxImportantFilter"),
	RedDotMailBoxUnScannedFilter_1 = require("./RedDots/Mail/RedDotMailBoxUnScannedFilter"),
	RedDotBattleViewQuestBtn_1 = require("./RedDots/Quest/RedDotBattleViewQuestBtn"),
	RedDotFunctionViewQuestBtn_1 = require("./RedDots/Quest/RedDotFunctionViewQuestBtn"),
	RedDotQuestViewItem_1 = require("./RedDots/Quest/RedDotQuestViewItem"),
	RedDotQuestViewTab_1 = require("./RedDots/Quest/RedDotQuestViewTab"),
	RedDotBattleViewMenu_1 = require("./RedDots/RedDotBattleViewMenu"),
	RedDotTest_1 = require("./RedDots/RedDotTest"),
	RedDotRoguelikeAchievement_1 = require("./RedDots/Roguelike/RedDotRoguelikeAchievement"),
	RedDotRoguelikeAchievementGroup_1 = require("./RedDots/Roguelike/RedDotRoguelikeAchievementGroup"),
	RedDotRoguelikeShop_1 = require("./RedDots/Roguelike/RedDotRoguelikeShop"),
	RedDotRoguelikeSkillCanUnlock_1 = require("./RedDots/Roguelike/RedDotRoguelikeSkillCanUnlock"),
	RedDotRoleHandBook_1 = require("./RedDots/RoleHandBook/RedDotRoleHandBook"),
	RedDotRoleSelectionList_1 = require("./RedDots/RoleSystem/RedDotRoleSelectionList"),
	RedDotRoleSystemRoleList_1 = require("./RedDots/RoleSystem/RedDotRoleSystemRoleList"),
	RedDotAttributeTab_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotAttributeTab"),
	RedDotRoleBreakUp_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleBreakUp"),
	RedDotRoleLevelUp_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleLevelUp"),
	RedDotResonanceTab_1 = require("./RedDots/RoleSystem/RoleResonance/RedDotResonanceTab"),
	CustomerServerRedDot_1 = require("./RedDots/Sdk/CustomerServerRedDot"),
	PayShopInstanceRedDot_1 = require("./RedDots/Shop/PayShopInstanceRedDot"),
	PayShopTabRedDot_1 = require("./RedDots/Shop/PayShopTabRedDot"),
	RedDotTowerReward_1 = require("./RedDots/TowerRewrad/RedDotTowerReward"),
	RedDotTowerRewardByDifficulties_1 = require("./RedDots/TowerRewrad/RedDotTowerRewardByDifficulties"),
	RedDotTutorialType_1 = require("./RedDots/Tutorial/RedDotTutorialType"),
	VisionIdentifyRedDot_1 = require("./RedDots/Vision/VisionIdentifyRedDot"),
	VisionOneKeyEquipRedDot_1 = require("./RedDots/Vision/VisionOneKeyEquipRedDot");
class RedDotModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.jsr = new Map());
	}
	OnInit() {
		return (
			this.qp("Test", new RedDotTest_1.RedDotTest()),
			this.qp(
				"BattleViewMenu",
				new RedDotBattleViewMenu_1.RedDotBattleViewMenu(),
			),
			this.qp(
				"BattleViewResonanceButton",
				new RedDotBattleViewResonanceButton_1.RedDotBattleViewResonanceButton(),
			),
			this.qp(
				"BattleViewShopButton",
				new RedDotBattleViewShopButton_1.RedDotBattleViewShopButton(),
			),
			this.qp(
				"BattleViewGachaButton",
				new RedDotBattleViewGachaButton_1.RedDotBattleViewGachaButton(),
			),
			this.qp("MailFilterAll", new RedDotMailBoxFilter_1.RedDotMailBoxFilter()),
			this.qp(
				"FilterImportant",
				new RedDotMailBoxImportantFilter_1.RedDotMailBoxImportantFilter(),
			),
			this.qp(
				"FilterUnScanned",
				new RedDotMailBoxUnScannedFilter_1.RedDotMailBoxUnScannedFilter(),
			),
			this.qp(
				"RoleSystemRoleList",
				new RedDotRoleSystemRoleList_1.RedDotRoleSystemRoleList(),
			),
			this.qp(
				"RoleAttributeTab",
				new RedDotAttributeTab_1.RedDotAttributeTab(),
			),
			this.qp(
				"RoleAttributeTabLevelUp",
				new RedDotRoleLevelUp_1.RedDotRoleLevelUp(),
			),
			this.qp(
				"RoleAttributeTabBreakUp",
				new RedDotRoleBreakUp_1.RedDotRoleBreakUp(),
			),
			this.qp(
				"RoleResonanceTab",
				new RedDotResonanceTab_1.RedDotResonanceTab(),
			),
			this.qp("FunctionRole", new RedDotFunctionRole_1.RedDotFunctionRole()),
			this.qp(
				"FunctionPhantom",
				new RedDotFunctionPhantom_1.RedDotFunctionPhantom(),
			),
			this.qp(
				"FunctionGacha",
				new RedDotBattleViewGachaButton_1.RedDotBattleViewGachaButton(),
			),
			this.qp(
				"FunctionTutorial",
				new RedDotFunctionTutorial_1.RedDotFunctionTutorial(),
			),
			this.qp(
				"FunctionAdventure",
				new RedDotFunctionAdventureGuide_1.RedDotFunctionAdventureGuide(),
			),
			this.qp(
				"FunctionInventory",
				new RedDotFunctionInventory_1.RedDotFunctionInventory(),
			),
			this.qp("FunctionMail", new RedDotFunctionMail_1.RedDotFunctionMail()),
			this.qp(
				"FunctionNotice",
				new RedDotFunctionNotice_1.RedDotFunctionNotice(),
			),
			this.qp(
				"FunctionPayShop",
				new RedDotFunctionPayShop_1.RedDotFunctionPayShop(),
			),
			this.qp(
				"AdventureManual",
				new RedDotAdventureManual_1.RedDotAdventureManual(),
			),
			this.qp(
				"AdventureBattleButton",
				new RedDotAdventureBattleButton_1.RedDotAdventureBattleButtonItem(),
			),
			this.qp(
				"AdventureFirstAward",
				new RedDotAdventureFirstAward_1.RedDotAdventureFirstAward(),
			),
			this.qp(
				"AdventureFirstAwardCategory",
				new RedDotAdventureFirstAwardCategory_1.RedDotAdventureFirstAwardCategory(),
			),
			this.qp(
				"AdventureFirstAwardResult",
				new RedDotAdventureFirstAwardResult_1.RedDotAdventureFirstAwardResult(),
			),
			this.qp(
				"AdventureDailyActivityTab",
				new RedDotAdventureDailyActivityTab_1.RedDotAdventureDailyActivityTab(),
			),
			this.qp("FunctionCalabash", new RedDotCalabash_1.RedDotCalabashUpdate()),
			this.qp("CalabashTab", new RedDotCalabashTab_1.RedDotCalabashTab()),
			this.qp(
				"FunctionFriend",
				new RedDotFunctionFriend_1.RedDotFunctionFriend(),
			),
			this.qp(
				"FriendNewApplication",
				new RedDotFriendNewApplication_1.RedDotFriendNewApplication(),
			),
			this.qp("ChatView", new RedDotChatView_1.RedDotChatView()),
			this.qp("ChatRoom", new RedDotChatRoom_1.RedDotChatRoom()),
			this.qp("TutorialTypeNew", new RedDotTutorialType_1.RedDotTutorialType()),
			this.qp(
				"RoleSelectionList",
				new RedDotRoleSelectionList_1.RedDotRoleSelectionList(),
			),
			this.qp(
				"InfluenceReputation",
				new RedDotInfluenceReputation_1.RedDotInfluenceReputation(),
			),
			this.qp(
				"InfluenceReward",
				new RedDotInfluenceReward_1.RedDotInfluenceReward(),
			),
			this.qp("CookerLevel", new RedDotCookerLevel_1.RedDotCookerLevel()),
			this.qp("CookerLevelMain", new RedDotCookerLevel_1.RedDotCookerLevel()),
			this.qp("BattlePass", new RedDotBattlePass_1.RedDotBattlePass()),
			this.qp(
				"BattlePassTask",
				new RedDotBattlePassTask_1.RedDotBattlePassTask(),
			),
			this.qp(
				"BattlePassReward",
				new RedDotBattlePassReward_1.RedDotBattlePassReward(),
			),
			this.qp(
				"BattlePassDayTaskTab",
				new RedDotBattlePassDayTaskTab_1.RedDotBattlePassDayTaskTab(),
			),
			this.qp(
				"BattlePassWeekTaskTab",
				new RedDotBattlePassWeekTaskTab_1.RedDotBattlePassWeekTaskTab(),
			),
			this.qp(
				"BattlePassAlwaysTaskTab",
				new RedDotBattlePassAlwaysTaskTab_1.RedDotBattlePassAlwaysTaskTab(),
			),
			this.qp("RoleHandBook", new RedDotRoleHandBook_1.RedDotRoleHandBook()),
			this.qp(
				"ComposeReagentProduction",
				new RedDotComposeLevel_1.RedDotComposeLevel(),
			),
			this.qp("ItemHandBook", new RedDotItemHandBook_1.RedDotItemHandBook()),
			this.qp(
				"PhantomHandBook",
				new RedDotPhantomHandBook_1.RedDotPhantomHandBook(),
			),
			this.qp("Achievement", new RedDotAchievement_1.RedDotAchievement()),
			this.qp(
				"AchievementCategory",
				new RedDotAchievementCategory_1.RedDotAchievementCategory(),
			),
			this.qp(
				"ActivityEntrance",
				new RedDotActivityEntrance_1.RedDotActivityEntrance(),
			),
			this.qp(
				"CommonActivityPage",
				new RedDotCommonActivityPage_1.RedDotCommonActivityPage(),
			),
			this.qp("ActivityRun", new RedDotActivityRun_1.RedDotActivityRun()),
			this.qp(
				"BattleViewQuestButton",
				new RedDotBattleViewQuestBtn_1.RedDotBattleViewQuestBtn(),
			),
			this.qp("QuestViewItem", new RedDotQuestViewItem_1.RedDotQuestViewItem()),
			this.qp("QuestTab", new RedDotQuestViewTab_1.RedDotQuestViewTab()),
			this.qp(
				"FunctionViewQuestBtn",
				new RedDotFunctionViewQuestBtn_1.RedDotFunctionViewQuestBtn(),
			),
			this.qp(
				"InventoryVirtual",
				new RedDotInventoryVirtual_1.RedDotInventoryVirtual(),
			),
			this.qp(
				"InventoryCommon",
				new RedDotInventoryCommon_1.RedDotInventoryCommon(),
			),
			this.qp(
				"InventoryWeapon",
				new RedDotInventoryWeapon_1.RedDotInventoryWeapon(),
			),
			this.qp(
				"InventoryPhantom",
				new RedDotInventoryPhantom_1.RedDotInventoryPhantom(),
			),
			this.qp(
				"InventoryCollection",
				new RedDotInventoryCollection_1.RedDotInventoryCollection(),
			),
			this.qp(
				"InventoryMaterial",
				new RedDotInventoryMaterial_1.RedDotInventoryMaterial(),
			),
			this.qp(
				"InventoryMission",
				new RedDotInventoryMissionItem_1.RedDotInventoryMissionItem(),
			),
			this.qp(
				"InventorySpecial",
				new RedDotInventorySpecialItem_1.RedDotInventorySpecialItem(),
			),
			this.qp("InventoryCard", new RedDotInventoryCard_1.RedDotInventoryCard()),
			this.qp("TowerReward", new RedDotTowerReward_1.RedDotTowerReward()),
			this.qp(
				"TowerRewardByDifficulties",
				new RedDotTowerRewardByDifficulties_1.RedDotTowerRewardByDifficulties(),
			),
			this.qp("IdentifyTab", new VisionIdentifyRedDot_1.VisionIdentifyRedDot()),
			this.qp(
				"VisionOneKeyEquip",
				new VisionOneKeyEquipRedDot_1.VisionOneKeyEquipRedDot(),
			),
			this.qp(
				"PayShopInstance",
				new PayShopInstanceRedDot_1.PayShopInstanceRedDot(),
			),
			this.qp("PayShopTab", new PayShopTabRedDot_1.PayShopTabRedDot()),
			this.qp(
				"RogueSkillUnlock",
				new RedDotRoguelikeSkillCanUnlock_1.RedDotRoguelikeSkillCanUnlock(),
			),
			this.qp(
				"RoguelikeAchievement",
				new RedDotRoguelikeAchievement_1.RedDotRoguelikeAchievement(),
			),
			this.qp("RoguelikeShop", new RedDotRoguelikeShop_1.RedDotRoguelikeShop()),
			this.qp(
				"RoguelikeAchievementGroup",
				new RedDotRoguelikeAchievementGroup_1.RedDotRoguelikeAchievementGroup(),
			),
			this.qp(
				"BossRushReward",
				new BossRushRewardRedDot_1.BossRushRewardRedDot(),
			),
			this.qp(
				"CustomerService",
				new CustomerServerRedDot_1.CustomerServerRedDot(),
			),
			this.qp(
				"FragmentMemoryReward",
				new FragmentMemoryCollectRewardRedDot_1.FragmentMemoryCollectRewardRedDot(),
			),
			this.qp(
				"FragmentMemoryEntrance",
				new FragmentMemoryEntranceRedDot_1.FragmentMemoryEntranceRedDot(),
			),
			this.qp(
				"FragmentMemoryTopic",
				new FragmentMemoryTopicRedDot_1.FragmentMemoryTopicRedDot(),
			),
			this.qp(
				"BattlePassPayButton",
				new RedDotBattlePassPayButton_1.RedDotBattlePassPayButton(),
			),
			this.Wsr(),
			!0
		);
	}
	qp(e, t) {
		(t.Name = e), this.Ksr(e, t);
	}
	Wsr() {
		var e,
			t,
			o = ConfigManager_1.ConfigManager.RedDotConfig.GetRelativeNameMap();
		for ([e, t] of this.jsr) {
			var n = t.Element.GetParentName() ?? o.get(e);
			void 0 === n ||
				StringUtils_1.StringUtils.IsEmpty(n) ||
				((n = this.jsr.get(n)) && n.AddChild(t));
		}
	}
	Ksr(e, t) {
		let o = this.jsr.get(e);
		return o || ((o = new Tree_1.Tree(t)), this.jsr.set(e, o)), o;
	}
	GetRedDotTree(e) {
		var t = this.jsr.get(e);
		if (t) return t;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("RedDot", 17, "获取红点树失败，当前红点未注册！", [
				"红点名称",
				e,
			]);
	}
	GetRedDot(e) {
		var t = this.jsr.get(e)?.Element;
		if (t) return t;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("RedDot", 17, "获取红点失败，当前红点未注册！", [
				"红点名称",
				e,
			]);
	}
	Qsr(e, t) {
		var o;
		for ([o] of (t.add(e), this.GetRedDotTree(e.Name).ChildMap)) this.Qsr(o, t);
	}
	LogAllRedDotTree(e) {
		if ((e = this.GetRedDot(e))) {
			var t = new Set(),
				o = (this.Qsr(e, t), new StringBuilder_1.StringBuilder());
			for (const e of t) o.Append(e.ToRedDotString());
			Log_1.Log.CheckInfo() && Log_1.Log.Info("RedDot", 11, o.ToString());
		}
	}
	LogAllRedDotState(e) {
		var t = this.GetRedDot(e);
		if (t) {
			var o = new Set();
			this.Qsr(t, o),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RedDot",
						8,
						"===========开始打印红点状态===========",
						["Name", e],
					);
			for (const e of o) e.PrintStateDebugString();
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RedDot", 8, "===========结束打印红点状态===========", [
					"Name",
					e,
				]);
		}
	}
}
exports.RedDotModel = RedDotModel;

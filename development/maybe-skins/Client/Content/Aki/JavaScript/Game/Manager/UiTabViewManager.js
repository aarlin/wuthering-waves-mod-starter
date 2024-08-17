"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTabViewManager = void 0);
const BossRushBuffSelectView_1 = require("../Module/Activity/ActivityContent/BossRush/BossRushBuffSelectView"),
	BossRushLevelDetailView_1 = require("../Module/Activity/ActivityContent/BossRush/BossRushLevelDetailView"),
	BossRushSelectView_1 = require("../Module/Activity/ActivityContent/BossRush/BossRushSelectView"),
	AdventureTargetView_1 = require("../Module/AdventureGuide/Views/AdventureTargetView"),
	MonsterDetectView_1 = require("../Module/AdventureGuide/Views/MonsterDetectView"),
	NewSoundAreaView_1 = require("../Module/AdventureGuide/Views/NewSoundAreaView"),
	CalabashCollectTabView_1 = require("../Module/Calabash/New/CalabashCollect/CalabashCollectTabView"),
	CalabashLevelUpTabView_1 = require("../Module/Calabash/New/CalabashLevelUp/CalabashLevelUpTabView"),
	PhantomBattleFettersTabView_1 = require("../Module/Calabash/New/PhantomBattleFetters/PhantomBattleFettersTabView"),
	VisionRecoveryTabView_1 = require("../Module/Calabash/New/VisionRecovery/VisionRecoveryTabView"),
	DailyActivityView_1 = require("../Module/DailyActivity/View/DailyActivityView"),
	RolePreviewDescribeTabView_1 = require("../Module/Gacha/PreviewView/RolePreviewDescribeTabView"),
	RolePreviewResonanceTabView_1 = require("../Module/Gacha/PreviewView/RolePreviewResonanceTabView"),
	RolePreviewSkillTabView_1 = require("../Module/Gacha/PreviewView/RolePreviewSkillTabView"),
	BattlePassRewardView_1 = require("../Module/PayShop/BattlePass/BattlePassTabView/BattlePassRewardView"),
	BattlePassTaskView_1 = require("../Module/PayShop/BattlePass/BattlePassTabView/BattlePassTaskView"),
	BattlePassWeaponView_1 = require("../Module/PayShop/BattlePass/BattlePassTabView/BattlePassWeaponView"),
	MonthCardView_1 = require("../Module/PayShop/MonthCard/MonthCardView"),
	DiscountShopView_1 = require("../Module/PayShop/PayShopTab/DiscountShopView"),
	PayPackageShopView_1 = require("../Module/PayShop/PayShopTab/PayPackageShopView"),
	PayShopRechargeView_1 = require("../Module/PayShop/PayShopTab/PayShopRechargeView"),
	PayShopRecommendView_1 = require("../Module/PayShop/PayShopTab/PayShopRecommendView"),
	RogueShopTabView_1 = require("../Module/PayShop/PayShopTab/RogueShopTabView"),
	PersonalCardTabView_1 = require("../Module/Personal/View/PersonalCardTabView"),
	PersonalInfoTabView_1 = require("../Module/Personal/View/PersonalInfoTabView"),
	VisionIdentifyView_1 = require("../Module/Phantom/Vision/View/VisionIdentifyView"),
	VisionLevelUpView_1 = require("../Module/Phantom/Vision/View/VisionLevelUpView"),
	RoleHandBookPreviewView_1 = require("../Module/RoleHandBook/RoleHandBookPreviewView"),
	RoleFavorTabView_1 = require("../Module/RoleUi/RoleFavor/RoleFavorTabView"),
	ResonanceChainView_1 = require("../Module/RoleUi/RoleResonance/ResonanceChainView"),
	RoleSkillTreeView_1 = require("../Module/RoleUi/RoleSkill/RoleSkillTreeView"),
	RoleAttributeTabView_1 = require("../Module/RoleUi/TabView/RoleAttributeTabView"),
	RolePreviewAttributeTabView_1 = require("../Module/RoleUi/TabView/RolePreviewAttributeTabView"),
	RoleVisionTabView_1 = require("../Module/RoleUi/TabView/RoleVisionTabView"),
	RoleWeaponTabView_1 = require("../Module/RoleUi/TabView/RoleWeaponTabView"),
	WeaponBreachView_1 = require("../Module/Weapon/Breach/WeaponBreachView"),
	WeaponLevelUpView_1 = require("../Module/Weapon/LevelUp/WeaponLevelUpView"),
	WeaponResonanceView_1 = require("../Module/Weapon/Reasonance/WeaponResonanceView"),
	UiTabViewStorage_1 = require("../Ui/UiTabViewStorage");
class UiTabViewManager {
	static Init() {
		UiTabViewStorage_1.UiTabViewStorage.AddUiTabViewBase([
			[
				"RoleAttributeTabView",
				RoleAttributeTabView_1.RoleAttributeTabView,
				"UiTabView_RoleAttribute_Prefab",
			],
			[
				"RoleSkillTabView",
				RoleSkillTreeView_1.RoleSkillTreeView,
				"UiTabView_RoleSkill_Prefab",
			],
			[
				"RoleWeaponTabView",
				RoleWeaponTabView_1.RoleWeaponTabView,
				"UiTabView_RoleWeapon_Prefab",
			],
			[
				"RoleFavorTabView",
				RoleFavorTabView_1.RoleFavorTabView,
				"UiView_Tab_RoleDangan_Prefab",
			],
			[
				"RolePreviewAttributeTabView",
				RolePreviewAttributeTabView_1.RolePreviewAttributeTabView,
				"UiTabView_RoleAttributePreview_Prefab",
			],
			[
				"WeaponLevelUpView",
				WeaponLevelUpView_1.WeaponLevelUpView,
				"UiTabView_WeaponLevelUp_Prefab",
			],
			[
				"WeaponBreachView",
				WeaponBreachView_1.WeaponBreachView,
				"UiTabView_WeaponBreach_Prefab",
			],
			[
				"WeaponResonanceView",
				WeaponResonanceView_1.WeaponResonanceView,
				"UiTabView_WeaponResonance_Prefab",
			],
			[
				"RolePhantomTabView",
				RoleVisionTabView_1.RoleVisionTabView,
				"UiItem_VisionIMain_New",
			],
			[
				"PayShopGiftBagView",
				DiscountShopView_1.DiscountShopView,
				"UiItem_Exchange1",
			],
			[
				"RogueShopTabView",
				RogueShopTabView_1.RogueShopTabView,
				"UiItem_Exchange1",
			],
			[
				"PayItemTabView",
				PayShopRechargeView_1.PayShopRechargeView,
				"UiItem_Exchange1",
			],
			[
				"PayShopRecommendView",
				PayShopRecommendView_1.PayShopRecommendView,
				"UiItem_Exchange1",
			],
			[
				"PayShopExchangeEntryView",
				DiscountShopView_1.DiscountShopView,
				"UiItem_Exchange1",
			],
			[
				"PayPackageShopView",
				PayPackageShopView_1.PayPackageShopView,
				"UiItem_Exchange1",
			],
			[
				"RolePreviewDescribeTabView",
				RolePreviewDescribeTabView_1.RolePreviewDescribeTabView,
				"UiTabView_RoleDescribe_Prefab",
			],
			[
				"RolePreviewSkillTabView",
				RolePreviewSkillTabView_1.RolePreviewSkillTabView,
				"UiTabView_RoleSkill_Prefab",
			],
			[
				"RolePreviewResonanceTabView",
				RolePreviewResonanceTabView_1.RolePreviewResonanceTabView,
				"UiTabView_RoleResonance_Prefab",
			],
			[
				"MonthCardView",
				MonthCardView_1.MonthCardView,
				"UiItem_MonthlyCard_Prefab",
			],
			[
				"RoleResonanceTabNewView",
				ResonanceChainView_1.ResonanceChainView,
				"UiTabView_RoleResonance_New_Prefab",
			],
			[
				"RoleHandBookPreviewView",
				RoleHandBookPreviewView_1.RoleHandBookPreviewView,
				"UiTabView_RoleDescribe_Prefab",
			],
			[
				"PersonalInfoTabView",
				PersonalInfoTabView_1.PersonalInfoTabView,
				"UiView_ShowRole",
			],
			[
				"PersonalCardTabView",
				PersonalCardTabView_1.PersonalCardTabView,
				"UiItem_Card",
			],
			[
				"AdventureTargetView",
				AdventureTargetView_1.AdventureTargetView,
				"UiView_Completion",
			],
			[
				"MonsterDetectView",
				MonsterDetectView_1.MonsterDetectView,
				"UiView_Survey",
			],
			[
				"DisposableChallengeView",
				NewSoundAreaView_1.NewSoundAreaView,
				"UiView_NewSoundArea",
			],
			[
				"NewSoundAreaView",
				NewSoundAreaView_1.NewSoundAreaView,
				"UiView_NewSoundArea",
			],
			[
				"DailyActivityTabView",
				DailyActivityView_1.DailyActivityView,
				"UiItem_Active",
			],
			[
				"VisionLevelUpView",
				VisionLevelUpView_1.VisionLevelUpView,
				"UiView_VisionLevelUp",
			],
			[
				"VisionIdentifyView",
				VisionIdentifyView_1.VisionIdentifyView,
				"UiView_VisionIdentify",
			],
			[
				"CalabashLevelUpTabView",
				CalabashLevelUpTabView_1.CalabashLevelUpTabView,
				"UiItem_VisionUpgrade",
			],
			[
				"CalabashCollectTabView",
				CalabashCollectTabView_1.CalabashCollectTabView,
				"UiItem_VisionlMap",
			],
			[
				"PhantomBattleFettersTabView",
				PhantomBattleFettersTabView_1.PhantomBattleFettersTabView,
				"UiItem_VisionFetter",
			],
			[
				"VisionRecoveryTabView",
				VisionRecoveryTabView_1.VisionRecoveryTabView,
				"UiView_VisionRecovery",
			],
			[
				"BattlePassRewardView",
				BattlePassRewardView_1.BattlePassRewardView,
				"UiItem_BattlePassReward",
			],
			[
				"BattlePassTaskView",
				BattlePassTaskView_1.BattlePassTaskView,
				"UiItem_BattlePassMission",
			],
			[
				"BattlePassWeaponView",
				BattlePassWeaponView_1.BattlePassWeaponView,
				"UiItem_WeaponPreview",
			],
			[
				"BossRushBuffSelectView",
				BossRushBuffSelectView_1.BossRushBuffSelectView,
				"UiItem_BossrushSleEntry",
			],
			[
				"BossRushLevelDetailView",
				BossRushLevelDetailView_1.BossRushLevelDetailView,
				"UiItem_BossrushLevelInfo",
			],
			[
				"BossRushSelectView",
				BossRushSelectView_1.BossRushSelectView,
				"UiItem_BossrushSleLevel",
			],
		]);
	}
}
exports.UiTabViewManager = UiTabViewManager;

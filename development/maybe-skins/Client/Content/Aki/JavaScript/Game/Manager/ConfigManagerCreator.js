"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfigManagerCreator = void 0);
const AiConfig_1 = require("../AI/Common/AiConfig"),
	ConditionConfig_1 = require("../Common/Config/ConditionConfig"),
	TextConfig_1 = require("../Common/Config/TextConfig"),
	InputSettingsConfig_1 = require("../InputSettings/InputSettingsConfig"),
	LevelGamePlayConfig_1 = require("../LevelGamePlay/Common/LevelGamePlayConfig"),
	AchievementConfig_1 = require("../Module/Achievement/AchievementConfig"),
	ActivityConfig_1 = require("../Module/Activity/ActivityConfig"),
	ActivityBeginnerBookConfig_1 = require("../Module/Activity/ActivityContent/BeginnerBook/ActivityBeginnerBookConfig"),
	BossRushConfig_1 = require("../Module/Activity/ActivityContent/BossRush/BossRushConfig"),
	ActivityCollectionConfig_1 = require("../Module/Activity/ActivityContent/Collection/ActivityCollectionConfig"),
	ActivityDailyAdventureConfig_1 = require("../Module/Activity/ActivityContent/DailyAdventure/ActivityDailyAdventureConfig"),
	ActivityNoviceJourneyConfig_1 = require("../Module/Activity/ActivityContent/NoviceJourney/ActivityNoviceJourneyConfig"),
	ActivityPhantomCollectConfig_1 = require("../Module/Activity/ActivityContent/PhantomCollect/ActivityPhantomCollectConfig"),
	ActivityRoleGuideConfig_1 = require("../Module/Activity/ActivityContent/RoleGuide/ActivityRoleGuideConfig"),
	ActivityRoleTrialConfig_1 = require("../Module/Activity/ActivityContent/RoleTrial/ActivityRoleTrialConfig"),
	ActivityRogueConfig_1 = require("../Module/Activity/ActivityContent/RougeActivity/ActivityRogueConfig"),
	ActivityRunConfig_1 = require("../Module/Activity/ActivityContent/Run/ActivityRunConfig"),
	ActivitySevenDaySignConfig_1 = require("../Module/Activity/ActivityContent/SevenDaySign/ActivitySevenDaySignConfig"),
	ActivityTimePointRewardConfig_1 = require("../Module/Activity/ActivityContent/TimePointReward/ActivityTimePointRewardConfig"),
	ActivityTowerGuideConfig_1 = require("../Module/Activity/ActivityContent/TowerGuide/ActivityTowerGuideConfig"),
	ActivityTurntableConfig_1 = require("../Module/Activity/ActivityContent/Turntable/ActivityTurntableConfig"),
	ActivityUniversalConfig_1 = require("../Module/Activity/ActivityContent/UniversalActivity/ActivityUniversalConfig"),
	AdventureConfig_1 = require("../Module/AdventureGuide/AdventureConfig"),
	AdviceConfig_1 = require("../Module/Advice/AdviceConfig"),
	AreaConfig_1 = require("../Module/Area/AreaConfig"),
	BattleScoreConfig_1 = require("../Module/Battle/Score/BattleScoreConfig"),
	BattleUiConfig_1 = require("../Module/BattleUi/BattleUiConfig"),
	BattleUiSetConfig_1 = require("../Module/BattleUiSet/BattleUiSetConfig"),
	BuffItemConfig_1 = require("../Module/BuffItem/BuffItemConfig"),
	CalabashConfig_1 = require("../Module/Calabash/CalabashConfig"),
	ChatConfig_1 = require("../Module/Chat/ChatConfig"),
	ComboTeachingConfig_1 = require("../Module/ComboTeach/ComboTeachingConfig"),
	AudioConfig_1 = require("../Module/Common/Config/AudioConfig"),
	CommonConfig_1 = require("../Module/Common/Config/CommonConfig"),
	ComponentConfig_1 = require("../Module/Common/Config/ComponentConfig"),
	ElementInfoConfig_1 = require("../Module/Common/Config/ElementInfoConfig"),
	ExchangeRewardConfig_1 = require("../Module/Common/Config/ExchangeRewardConfig"),
	MappingConfig_1 = require("../Module/Common/Config/MappingConfig"),
	PropertyIndexConfig_1 = require("../Module/Common/Config/PropertyIndexConfig"),
	UiResourceConfig_1 = require("../Module/Common/Config/UiResourceConfig"),
	UiViewConfig_1 = require("../Module/Common/Config/UiViewConfig"),
	FilterConfig_1 = require("../Module/Common/FilterSort/Filter/Model/FilterConfig"),
	SortConfig_1 = require("../Module/Common/FilterSort/Sort/Model/SortConfig"),
	ConfirmBoxConfig_1 = require("../Module/ConfirmBox/New/ConfirmBoxConfig"),
	CookConfig_1 = require("../Module/Cook/CookConfig"),
	CreateCharacterConfig_1 = require("../Module/CreateCharacter/CreateCharacterConfig"),
	DailyActivityConfig_1 = require("../Module/DailyActivity/DailyActivityConfig"),
	DamageUiConfig_1 = require("../Module/DamageUi/DamageUiConfig"),
	DynamicTabConfig_1 = require("../Module/DynamicTab/DynamicTabConfig"),
	EditBattleTeamConfig_1 = require("../Module/EditBattleTeam/EditBattleTeamConfig"),
	ErrorCodeConfig_1 = require("../Module/ErrorCode/ErrorCodeConfig"),
	ExploreLevelConfig_1 = require("../Module/ExploreLevel/ExploreLevelConfig"),
	ExploreProgressConfig_1 = require("../Module/ExploreProgress/ExploreProgressConfig"),
	FragmentMemoryConfig_1 = require("../Module/FragmentMemory/FragmentMemoryConfig"),
	FriendConfig_1 = require("../Module/Friend/FriendConfig"),
	FunctionConfig_1 = require("../Module/Functional/FunctionConfig"),
	GachaConfig_1 = require("../Module/Gacha/GachaConfig"),
	GenericPromptConfig_1 = require("../Module/GenericPrompt/GenericPromptConfig"),
	GuideConfig_1 = require("../Module/Guide/GuideConfig"),
	HandBookConfig_1 = require("../Module/HandBook/HandBookConfig"),
	HelpConfig_1 = require("../Module/Help/HelpConfig"),
	InfluenceConfig_1 = require("../Module/Influence/Config/InfluenceConfig"),
	InfoDisplayModuleConfig_1 = require("../Module/InfoDisplay/InfoDisplayModuleConfig"),
	InstanceDungeonConfig_1 = require("../Module/InstanceDungeon/InstanceDungeonConfig"),
	InstanceDungeonEntranceConfig_1 = require("../Module/InstanceDungeon/InstanceDungeonEntranceConfig"),
	InteractionConfig_1 = require("../Module/Interaction/InteractionConfig"),
	InventoryConfig_1 = require("../Module/Inventory/InventoryConfig"),
	GetWayConfig_1 = require("../Module/Item/Data/GetWayConfig"),
	ItemConfig_1 = require("../Module/Item/ItemConfig"),
	SpecialItemConfig_1 = require("../Module/Item/SpecialItem/SpecialItemConfig"),
	ItemExchangeConfig_1 = require("../Module/ItemExchange/ItemExchangeConfig"),
	ItemRewardConfig_1 = require("../Module/ItemReward/ItemRewardConfig"),
	JoinTeamConfig_1 = require("../Module/JoinTeam/JoinTeamConfig"),
	LanguageConfig_1 = require("../Module/Language/LanguageConfig"),
	LevelPlayConfig_1 = require("../Module/LevelPlay/LevelPlayConfig"),
	LevelUpConfig_1 = require("../Module/LevelUp/LevelUpConfig"),
	LoadingConfig_1 = require("../Module/Loading/LoadingConfig"),
	LoginConfig_1 = require("../Module/Login/LoginConfig"),
	LogReportConfig_1 = require("../Module/LogReport/LogReportConfig"),
	LordGymConfig_1 = require("../Module/LordGym/LordGymConfig"),
	MailConfig_1 = require("../Module/Mail/MailConfig"),
	ComposeConfig_1 = require("../Module/Manufacture/Compose/ComposeConfig"),
	ForgingConfig_1 = require("../Module/Manufacture/Forging/ForgingConfig"),
	MapConfig_1 = require("../Module/Map/MapConfig"),
	MenuBaseConfig_1 = require("../Module/Menu/MenuBaseConfig"),
	CollectItemConfig_1 = require("../Module/MingSu/CollectItemConfig"),
	MonsterInfoConfig_1 = require("../Module/MonsterInfo/MonsterInfoConfig"),
	MotionConfig_1 = require("../Module/Motion/MotionConfig"),
	NpcIconConfig_1 = require("../Module/NPC/NpcIconConfig"),
	PayItemConfig_1 = require("../Module/PayItem/PayItemConfig"),
	BattlePassConfig_1 = require("../Module/PayShop/BattlePass/BattlePassConfig"),
	MonthCardConfig_1 = require("../Module/PayShop/MonthCard/MonthCardConfig"),
	PayShopConfig_1 = require("../Module/PayShop/PayShopConfig"),
	GiftPackageConfig_1 = require("../Module/PayShop/PopView/GiftPackage/GiftPackageConfig"),
	PhantomBattleConfig_1 = require("../Module/Phantom/PhantomBattle/PhantomBattleConfig"),
	PhotographConfig_1 = require("../Module/Photograph/PhotographConfig"),
	PlatformConfig_1 = require("../Module/Platform/PlatformConfig"),
	PlayerInfoConfig_1 = require("../Module/PlayerInfo/PlayerInfoConfig"),
	FlowConfig_1 = require("../Module/Plot/Flow/FlowConfig"),
	PlotCameraTemplateConfig_1 = require("../Module/Plot/PlotCameraTemplateConfig"),
	PlotMontageConfig_1 = require("../Module/Plot/PlotMontageConfig"),
	PowerConfig_1 = require("../Module/Power/PowerConfig"),
	QuestConfig_1 = require("../Module/QuestNew/QuestConfig"),
	ReportConfig_1 = require("../Module/Report/ReportConfig"),
	RewardConfig_1 = require("../Module/Reward/RewardConfig"),
	RoguelikeConfig_1 = require("../Module/Roguelike/RoguelikeConfig"),
	RoleFavorConfig_1 = require("../Module/RoleUi/RoleFavor/RoleFavorConfig"),
	RoleSkillConfig_1 = require("../Module/RoleUi/RoleSkillConfig"),
	RoleUiConfig_1 = require("../Module/RoleUi/RoleUiConfig"),
	RoleResonanceConfig_1 = require("../Module/RoleUi/TabConfig/RoleResonanceConfig"),
	UiRoleCameraConfig_1 = require("../Module/RoleUi/UiRoleCameraConfig"),
	RouletteConfig_1 = require("../Module/Roulette/Data/RouletteConfig"),
	ShopConfig_1 = require("../Module/Shop/ShopConfig"),
	SignalDecodeConfig_1 = require("../Module/SignalDecode/SignalDecodeConfig"),
	SkeletalObserverConfig_1 = require("../Module/SkeletalObserver/SkeletalObserverConfig"),
	SkillButtonConfig_1 = require("../Module/SkillButtonUi/SkillButtonConfig"),
	SkipInterfaceConfig_1 = require("../Module/SkipInterface/SkipInterfaceConfig"),
	TimeOfDayConfig_1 = require("../Module/TimeOfDay/TimeOfDayConfig"),
	TowerClimbConfig_1 = require("../Module/TowerDetailUi/TowerClimbConfig"),
	TutorialConfig_1 = require("../Module/Tutorial/TutorialConfig"),
	UiCameraAnimationConfig_1 = require("../Module/UiCameraAnimation/UiCameraAnimationConfig"),
	UiNavigationConfig_1 = require("../Module/UiNavigation/UiNavigationConfig"),
	VideoConfig_1 = require("../Module/Video/VideoConfig"),
	WeaponConfig_1 = require("../Module/Weapon/WeaponConfig"),
	WeatherModuleConfig_1 = require("../Module/Weather/WeatherModuleConfig"),
	WorldLevelConfig_1 = require("../Module/WorldLevel/WorldLevelConfig"),
	WorldMapConfig_1 = require("../Module/WorldMap/WorldMapConfig"),
	BulletConfig_1 = require("../NewWorld/Bullet/BulletConfig"),
	EntityPhysicsAssetConfig_1 = require("../NewWorld/Character/Common/Component/PhysicsAsset/EntityPhysicsAssetConfig"),
	SwimConfig_1 = require("../NewWorld/Character/Common/Component/Swim/SwimConfig"),
	WeaponComponentConfig_1 = require("../NewWorld/Character/Common/Component/Weapon/WeaponComponentConfig"),
	FaceExpressionConfig_1 = require("../NewWorld/Character/Npc/Datas/FaceExpressionConfig"),
	ManipulateConfig_1 = require("../NewWorld/SceneItem/Manipulate/ManipulateConfig"),
	WorldConfig_1 = require("../NewWorld/WorldConfig/WorldConfig"),
	RedDotConfig_1 = require("../RedDot/RedDotConfig"),
	RenderModuleConfig_1 = require("../Render/Manager/RenderModuleConfig"),
	UiCommonConfig_1 = require("../Ui/Common/UiCommonConfig"),
	InputDistributeConfig_1 = require("../Ui/InputDistribute/InputDistributeConfig"),
	BubbleConfig_1 = require("../World/Define/BubbleConfig"),
	EntityOwnerConfig_1 = require("../World/Define/EntityOwnerConfig"),
	ConfigManager_1 = require("./ConfigManager");
class ConfigManagerCreator {
	static Init() {
		return (
			!!ConfigManagerCreator.Clear() &&
			((ConfigManager_1.ConfigManager.AreaConfig =
				new AreaConfig_1.AreaConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.AreaConfig,
			),
			(ConfigManager_1.ConfigManager.MailConfig =
				new MailConfig_1.MailConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.MailConfig,
			),
			(ConfigManager_1.ConfigManager.TextConfig =
				new TextConfig_1.TextConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.TextConfig,
			),
			(ConfigManager_1.ConfigManager.ConditionConfig =
				new ConditionConfig_1.ConditionConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ConditionConfig,
			),
			(ConfigManager_1.ConfigManager.RoleSkillConfig =
				new RoleSkillConfig_1.RoleSkillConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RoleSkillConfig,
			),
			(ConfigManager_1.ConfigManager.RoleResonanceConfig =
				new RoleResonanceConfig_1.RoleResonanceConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RoleResonanceConfig,
			),
			(ConfigManager_1.ConfigManager.LoginConfig =
				new LoginConfig_1.LoginConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.LoginConfig,
			),
			(ConfigManager_1.ConfigManager.ItemConfig =
				new ItemConfig_1.ItemConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ItemConfig,
			),
			(ConfigManager_1.ConfigManager.SpecialItemConfig =
				new SpecialItemConfig_1.SpecialItemConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.SpecialItemConfig,
			),
			(ConfigManager_1.ConfigManager.DynamicTabConfig =
				new DynamicTabConfig_1.DynamicTabConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.DynamicTabConfig,
			),
			(ConfigManager_1.ConfigManager.ErrorCodeConfig =
				new ErrorCodeConfig_1.ErrorCodeConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ErrorCodeConfig,
			),
			(ConfigManager_1.ConfigManager.WeaponConfig =
				new WeaponConfig_1.WeaponConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.WeaponConfig,
			),
			(ConfigManager_1.ConfigManager.ShopConfig =
				new ShopConfig_1.ShopConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ShopConfig,
			),
			(ConfigManager_1.ConfigManager.ConfirmBoxConfig =
				new ConfirmBoxConfig_1.ConfirmBoxConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ConfirmBoxConfig,
			),
			(ConfigManager_1.ConfigManager.BulletConfig =
				new BulletConfig_1.BulletConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.BulletConfig,
			),
			(ConfigManager_1.ConfigManager.RewardConfig =
				new RewardConfig_1.RewardConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RewardConfig,
			),
			(ConfigManager_1.ConfigManager.GetWayConfig =
				new GetWayConfig_1.GetWayConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.GetWayConfig,
			),
			(ConfigManager_1.ConfigManager.PowerConfig =
				new PowerConfig_1.PowerConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PowerConfig,
			),
			(ConfigManager_1.ConfigManager.GuideConfig =
				new GuideConfig_1.GuideConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.GuideConfig,
			),
			(ConfigManager_1.ConfigManager.CreateCharacterConfig =
				new CreateCharacterConfig_1.CreateCharacterConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.CreateCharacterConfig,
			),
			(ConfigManager_1.ConfigManager.TimeOfDayConfig =
				new TimeOfDayConfig_1.TimeOfDayConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.TimeOfDayConfig,
			),
			(ConfigManager_1.ConfigManager.FunctionConfig =
				new FunctionConfig_1.FunctionConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.FunctionConfig,
			),
			(ConfigManager_1.ConfigManager.InventoryConfig =
				new InventoryConfig_1.InventoryConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.InventoryConfig,
			),
			(ConfigManager_1.ConfigManager.EditBattleTeamConfig =
				new EditBattleTeamConfig_1.EditBattleTeamConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.EditBattleTeamConfig,
			),
			(ConfigManager_1.ConfigManager.WorldMapConfig =
				new WorldMapConfig_1.WorldMapConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.WorldMapConfig,
			),
			(ConfigManager_1.ConfigManager.CommonConfig =
				new CommonConfig_1.CommonConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.CommonConfig,
			),
			(ConfigManager_1.ConfigManager.WorldLevelConfig =
				new WorldLevelConfig_1.WorldLevelConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.WorldLevelConfig,
			),
			(ConfigManager_1.ConfigManager.AiConfig = new AiConfig_1.AiConfig()),
			ConfigManager_1.ConfigManager.Add(ConfigManager_1.ConfigManager.AiConfig),
			(ConfigManager_1.ConfigManager.CalabashConfig =
				new CalabashConfig_1.CalabashConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.CalabashConfig,
			),
			(ConfigManager_1.ConfigManager.SkeletalObserverConfig =
				new SkeletalObserverConfig_1.SkeletalObserverConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.SkeletalObserverConfig,
			),
			(ConfigManager_1.ConfigManager.LevelUpConfig =
				new LevelUpConfig_1.LevelUpConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.LevelUpConfig,
			),
			(ConfigManager_1.ConfigManager.GenericPromptConfig =
				new GenericPromptConfig_1.GenericPromptConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.GenericPromptConfig,
			),
			(ConfigManager_1.ConfigManager.PropertyIndexConfig =
				new PropertyIndexConfig_1.PropertyIndexConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PropertyIndexConfig,
			),
			(ConfigManager_1.ConfigManager.JoinTeamConfig =
				new JoinTeamConfig_1.JoinTeamConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.JoinTeamConfig,
			),
			(ConfigManager_1.ConfigManager.HelpConfig =
				new HelpConfig_1.HelpConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.HelpConfig,
			),
			(ConfigManager_1.ConfigManager.InstanceDungeonConfig =
				new InstanceDungeonConfig_1.InstanceDungeonConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.InstanceDungeonConfig,
			),
			(ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig =
				new InstanceDungeonEntranceConfig_1.InstanceDungeonEntranceConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig,
			),
			(ConfigManager_1.ConfigManager.ElementInfoConfig =
				new ElementInfoConfig_1.ElementInfoConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ElementInfoConfig,
			),
			(ConfigManager_1.ConfigManager.MappingConfig =
				new MappingConfig_1.MappingConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.MappingConfig,
			),
			(ConfigManager_1.ConfigManager.MapConfig = new MapConfig_1.MapConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.MapConfig,
			),
			(ConfigManager_1.ConfigManager.QuestNewConfig =
				new QuestConfig_1.QuestNewConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.QuestNewConfig,
			),
			(ConfigManager_1.ConfigManager.UiCameraAnimationConfig =
				new UiCameraAnimationConfig_1.UiCameraAnimationConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.UiCameraAnimationConfig,
			),
			(ConfigManager_1.ConfigManager.UiRoleCameraConfig =
				new UiRoleCameraConfig_1.UiRoleCameraConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.UiRoleCameraConfig,
			),
			(ConfigManager_1.ConfigManager.BattleUiConfig =
				new BattleUiConfig_1.BattleUiConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.BattleUiConfig,
			),
			(ConfigManager_1.ConfigManager.BattleScoreConfig =
				new BattleScoreConfig_1.BattleScoreConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.BattleScoreConfig,
			),
			(ConfigManager_1.ConfigManager.NpcIconConfig =
				new NpcIconConfig_1.NpcIconConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.NpcIconConfig,
			),
			(ConfigManager_1.ConfigManager.LevelGamePlayConfig =
				new LevelGamePlayConfig_1.LevelGamePlayConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.LevelGamePlayConfig,
			),
			(ConfigManager_1.ConfigManager.BuffItemConfig =
				new BuffItemConfig_1.BuffItemConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.BuffItemConfig,
			),
			(ConfigManager_1.ConfigManager.WorldConfig =
				new WorldConfig_1.WorldConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.WorldConfig,
			),
			(ConfigManager_1.ConfigManager.PlayerInfoConfig =
				new PlayerInfoConfig_1.PlayerInfoConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PlayerInfoConfig,
			),
			(ConfigManager_1.ConfigManager.SwimConfig =
				new SwimConfig_1.SwimConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.SwimConfig,
			),
			(ConfigManager_1.ConfigManager.RedDotConfig =
				new RedDotConfig_1.RedDotConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RedDotConfig,
			),
			(ConfigManager_1.ConfigManager.MenuBaseConfig =
				new MenuBaseConfig_1.MenuBaseConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.MenuBaseConfig,
			),
			(ConfigManager_1.ConfigManager.RoleConfig =
				new RoleUiConfig_1.RoleConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RoleConfig,
			),
			(ConfigManager_1.ConfigManager.AudioConfig =
				new AudioConfig_1.AudioConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.AudioConfig,
			),
			(ConfigManager_1.ConfigManager.InputDistributeConfig =
				new InputDistributeConfig_1.InputDistributeConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.InputDistributeConfig,
			),
			(ConfigManager_1.ConfigManager.VideoConfig =
				new VideoConfig_1.VideoConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.VideoConfig,
			),
			(ConfigManager_1.ConfigManager.RenderModuleConfig =
				new RenderModuleConfig_1.RenderModuleConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RenderModuleConfig,
			),
			(ConfigManager_1.ConfigManager.LogReportConfig =
				new LogReportConfig_1.LogReportConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.LogReportConfig,
			),
			(ConfigManager_1.ConfigManager.UiResourceConfig =
				new UiResourceConfig_1.UiResourceConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.UiResourceConfig,
			),
			(ConfigManager_1.ConfigManager.FriendConfig =
				new FriendConfig_1.FriendConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.FriendConfig,
			),
			(ConfigManager_1.ConfigManager.UiNavigationConfig =
				new UiNavigationConfig_1.UiNavigationConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.UiNavigationConfig,
			),
			(ConfigManager_1.ConfigManager.ChatConfig =
				new ChatConfig_1.ChatConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ChatConfig,
			),
			(ConfigManager_1.ConfigManager.LevelPlayConfig =
				new LevelPlayConfig_1.LevelPlayConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.LevelPlayConfig,
			),
			(ConfigManager_1.ConfigManager.PayItemConfig =
				new PayItemConfig_1.PayItemConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PayItemConfig,
			),
			(ConfigManager_1.ConfigManager.PayShopConfig =
				new PayShopConfig_1.PayShopConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PayShopConfig,
			),
			(ConfigManager_1.ConfigManager.GiftPackageConfig =
				new GiftPackageConfig_1.GiftPackageConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.GiftPackageConfig,
			),
			(ConfigManager_1.ConfigManager.GachaConfig =
				new GachaConfig_1.GachaConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.GachaConfig,
			),
			(ConfigManager_1.ConfigManager.ItemExchangeConfig =
				new ItemExchangeConfig_1.ItemExchangeConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ItemExchangeConfig,
			),
			(ConfigManager_1.ConfigManager.PhantomBattleConfig =
				new PhantomBattleConfig_1.PhantomBattleConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PhantomBattleConfig,
			),
			(ConfigManager_1.ConfigManager.SkillButtonConfig =
				new SkillButtonConfig_1.SkillButtonConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.SkillButtonConfig,
			),
			(ConfigManager_1.ConfigManager.TutorialConfig =
				new TutorialConfig_1.TutorialConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.TutorialConfig,
			),
			(ConfigManager_1.ConfigManager.WeatherModuleConfig =
				new WeatherModuleConfig_1.WeatherModuleConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.WeatherModuleConfig,
			),
			(ConfigManager_1.ConfigManager.InfoDisplayModuleConfig =
				new InfoDisplayModuleConfig_1.InfoDisplayModuleConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig,
			),
			(ConfigManager_1.ConfigManager.AdventureModuleConfig =
				new AdventureConfig_1.AdventureGuideConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.AdventureModuleConfig,
			),
			(ConfigManager_1.ConfigManager.ManipulateConfig =
				new ManipulateConfig_1.ManipulateConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ManipulateConfig,
			),
			(ConfigManager_1.ConfigManager.ComponentConfig =
				new ComponentConfig_1.ComponentConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ComponentConfig,
			),
			(ConfigManager_1.ConfigManager.InfluenceConfig =
				new InfluenceConfig_1.InfluenceConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.InfluenceConfig,
			),
			(ConfigManager_1.ConfigManager.MonthCardConfig =
				new MonthCardConfig_1.MonthCardConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.MonthCardConfig,
			),
			(ConfigManager_1.ConfigManager.ReportConfig =
				new ReportConfig_1.ReportConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ReportConfig,
			),
			(ConfigManager_1.ConfigManager.CookConfig =
				new CookConfig_1.CookConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.CookConfig,
			),
			(ConfigManager_1.ConfigManager.RoleFavorConfig =
				new RoleFavorConfig_1.RoleFavorConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RoleFavorConfig,
			),
			(ConfigManager_1.ConfigManager.MonsterInfoConfig =
				new MonsterInfoConfig_1.MonsterInfoConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.MonsterInfoConfig,
			),
			(ConfigManager_1.ConfigManager.BattlePassConfig =
				new BattlePassConfig_1.BattlePassConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.BattlePassConfig,
			),
			(ConfigManager_1.ConfigManager.ComposeConfig =
				new ComposeConfig_1.ComposeConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ComposeConfig,
			),
			(ConfigManager_1.ConfigManager.ForgingConfig =
				new ForgingConfig_1.ForgingConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ForgingConfig,
			),
			(ConfigManager_1.ConfigManager.AdviceConfig =
				new AdviceConfig_1.AdviceConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.AdviceConfig,
			),
			(ConfigManager_1.ConfigManager.MotionConfig =
				new MotionConfig_1.MotionConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.MotionConfig,
			),
			(ConfigManager_1.ConfigManager.PhotographConfig =
				new PhotographConfig_1.PhotographConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PhotographConfig,
			),
			(ConfigManager_1.ConfigManager.HandBookConfig =
				new HandBookConfig_1.HandBookConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.HandBookConfig,
			),
			(ConfigManager_1.ConfigManager.LoadingConfig =
				new LoadingConfig_1.LoadingConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.LoadingConfig,
			),
			(ConfigManager_1.ConfigManager.DamageUiConfig =
				new DamageUiConfig_1.DamageUiConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.DamageUiConfig,
			),
			(ConfigManager_1.ConfigManager.BattleUiSetConfig =
				new BattleUiSetConfig_1.BattleUiSetConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.BattleUiSetConfig,
			),
			(ConfigManager_1.ConfigManager.AchievementConfig =
				new AchievementConfig_1.AchievementConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.AchievementConfig,
			),
			(ConfigManager_1.ConfigManager.UiViewConfig =
				new UiViewConfig_1.UiViewConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.UiViewConfig,
			),
			(ConfigManager_1.ConfigManager.EntityPhysicsAssetConfig =
				new EntityPhysicsAssetConfig_1.EntityPhysicsAssetConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.EntityPhysicsAssetConfig,
			),
			(ConfigManager_1.ConfigManager.ComboTeachingConfig =
				new ComboTeachingConfig_1.ComboTeachingConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ComboTeachingConfig,
			),
			(ConfigManager_1.ConfigManager.InputSettingsConfig =
				new InputSettingsConfig_1.InputSettingsConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.InputSettingsConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityConfig =
				new ActivityConfig_1.ActivityConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityUniversalConfig =
				new ActivityUniversalConfig_1.ActivityUniversalConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityUniversalConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityRogueConfig =
				new ActivityRogueConfig_1.ActivityRogueConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityRogueConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityRunConfig =
				new ActivityRunConfig_1.ActivityRunConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityRunConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityCollectionConfig =
				new ActivityCollectionConfig_1.ActivityCollectionConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityCollectionConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig =
				new ActivityDailyAdventureConfig_1.ActivityDailyAdventureConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig =
				new ActivityTimePointRewardConfig_1.ActivityTimePointRewardConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityTowerGuideConfig =
				new ActivityTowerGuideConfig_1.ActivityTowerGuideConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityTowerGuideConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig =
				new ActivityBeginnerBookConfig_1.ActivityBeginnerBookConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityRoleTrialConfig =
				new ActivityRoleTrialConfig_1.ActivityRoleTrialConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityRoleTrialConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityRoleGuideConfig =
				new ActivityRoleGuideConfig_1.ActivityRoleGuideConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityRoleGuideConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityTurntableConfig =
				new ActivityTurntableConfig_1.ActivityTurntableConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityTurntableConfig,
			),
			(ConfigManager_1.ConfigManager.WeaponComponentConfig =
				new WeaponComponentConfig_1.WeaponComponentConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.WeaponComponentConfig,
			),
			(ConfigManager_1.ConfigManager.ItemRewardConfig =
				new ItemRewardConfig_1.ItemRewardConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ItemRewardConfig,
			),
			(ConfigManager_1.ConfigManager.RoguelikeConfig =
				new RoguelikeConfig_1.RoguelikeConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RoguelikeConfig,
			),
			(ConfigManager_1.ConfigManager.FilterConfig =
				new FilterConfig_1.FilterConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.FilterConfig,
			),
			(ConfigManager_1.ConfigManager.SortConfig =
				new SortConfig_1.SortConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.SortConfig,
			),
			(ConfigManager_1.ConfigManager.ExchangeRewardConfig =
				new ExchangeRewardConfig_1.ExchangeRewardConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ExchangeRewardConfig,
			),
			(ConfigManager_1.ConfigManager.UiCommonConfig =
				new UiCommonConfig_1.UiCommonConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.UiCommonConfig,
			),
			(ConfigManager_1.ConfigManager.DailyActivityConfig =
				new DailyActivityConfig_1.DailyActivityConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.DailyActivityConfig,
			),
			(ConfigManager_1.ConfigManager.RouletteConfig =
				new RouletteConfig_1.RouletteConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.RouletteConfig,
			),
			(ConfigManager_1.ConfigManager.FlowConfig =
				new FlowConfig_1.FlowConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.FlowConfig,
			),
			(ConfigManager_1.ConfigManager.LanguageConfig =
				new LanguageConfig_1.LanguageConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.LanguageConfig,
			),
			(ConfigManager_1.ConfigManager.SkipInterfaceConfig =
				new SkipInterfaceConfig_1.SkipInterfaceConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.SkipInterfaceConfig,
			),
			(ConfigManager_1.ConfigManager.TowerClimbConfig =
				new TowerClimbConfig_1.TowerClimbConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.TowerClimbConfig,
			),
			(ConfigManager_1.ConfigManager.InteractOptionConfig =
				new InteractionConfig_1.InteractionConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.InteractOptionConfig,
			),
			(ConfigManager_1.ConfigManager.CameraTemplateConfig =
				new PlotCameraTemplateConfig_1.PlotCameraTemplateConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.CameraTemplateConfig,
			),
			(ConfigManager_1.ConfigManager.PlotMontageConfig =
				new PlotMontageConfig_1.PlotMontageConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PlotMontageConfig,
			),
			(ConfigManager_1.ConfigManager.EntityOwnerConfig =
				new EntityOwnerConfig_1.EntityOwnerConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.EntityOwnerConfig,
			),
			(ConfigManager_1.ConfigManager.LordGymConfig =
				new LordGymConfig_1.LordGymConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.LordGymConfig,
			),
			(ConfigManager_1.ConfigManager.ExploreProgressConfig =
				new ExploreProgressConfig_1.ExploreProgressConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ExploreProgressConfig,
			),
			(ConfigManager_1.ConfigManager.ExploreLevelConfig =
				new ExploreLevelConfig_1.ExploreLevelConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ExploreLevelConfig,
			),
			(ConfigManager_1.ConfigManager.SignalDecodeConfig =
				new SignalDecodeConfig_1.SignalDecodeConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.SignalDecodeConfig,
			),
			(ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig =
				new ActivitySevenDaySignConfig_1.ActivitySevenDaySignConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig,
			),
			(ConfigManager_1.ConfigManager.BubbleConfig =
				new BubbleConfig_1.BubbleConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.BubbleConfig,
			),
			(ConfigManager_1.ConfigManager.FaceExpressionConfig =
				new FaceExpressionConfig_1.FaceExpressionConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.FaceExpressionConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig =
				new ActivityNoviceJourneyConfig_1.ActivityNoviceJourneyConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig,
			),
			(ConfigManager_1.ConfigManager.PlatformConfig =
				new PlatformConfig_1.PlatformConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.PlatformConfig,
			),
			(ConfigManager_1.ConfigManager.FragmentMemoryConfig =
				new FragmentMemoryConfig_1.FragmentMemoryConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.FragmentMemoryConfig,
			),
			(ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig =
				new ActivityPhantomCollectConfig_1.ActivityPhantomCollectConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig,
			),
			(ConfigManager_1.ConfigManager.BossRushConfig =
				new BossRushConfig_1.BossRushConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.BossRushConfig,
			),
			(ConfigManager_1.ConfigManager.CollectItemConfig =
				new CollectItemConfig_1.CollectItemConfig()),
			ConfigManager_1.ConfigManager.Add(
				ConfigManager_1.ConfigManager.CollectItemConfig,
			),
			ConfigManager_1.ConfigManager.Init())
		);
	}
	static Clear() {
		return (
			ConfigManager_1.ConfigManager.Clear(),
			(ConfigManager_1.ConfigManager.AreaConfig = void 0),
			(ConfigManager_1.ConfigManager.MailConfig = void 0),
			(ConfigManager_1.ConfigManager.TextConfig = void 0),
			(ConfigManager_1.ConfigManager.ConditionConfig = void 0),
			(ConfigManager_1.ConfigManager.RoleSkillConfig = void 0),
			(ConfigManager_1.ConfigManager.RoleResonanceConfig = void 0),
			(ConfigManager_1.ConfigManager.LoginConfig = void 0),
			(ConfigManager_1.ConfigManager.ItemConfig = void 0),
			(ConfigManager_1.ConfigManager.DynamicTabConfig = void 0),
			(ConfigManager_1.ConfigManager.ErrorCodeConfig = void 0),
			(ConfigManager_1.ConfigManager.WeaponConfig = void 0),
			(ConfigManager_1.ConfigManager.ShopConfig = void 0),
			(ConfigManager_1.ConfigManager.ConfirmBoxConfig = void 0),
			(ConfigManager_1.ConfigManager.RewardConfig = void 0),
			(ConfigManager_1.ConfigManager.GetWayConfig = void 0),
			(ConfigManager_1.ConfigManager.BulletConfig = void 0),
			(ConfigManager_1.ConfigManager.PowerConfig = void 0),
			(ConfigManager_1.ConfigManager.GuideConfig = void 0),
			(ConfigManager_1.ConfigManager.CreateCharacterConfig = void 0),
			(ConfigManager_1.ConfigManager.TimeOfDayConfig = void 0),
			(ConfigManager_1.ConfigManager.CommonConfig = void 0),
			(ConfigManager_1.ConfigManager.WorldLevelConfig = void 0),
			(ConfigManager_1.ConfigManager.AiConfig = void 0),
			(ConfigManager_1.ConfigManager.CalabashConfig = void 0),
			(ConfigManager_1.ConfigManager.SkeletalObserverConfig = void 0),
			(ConfigManager_1.ConfigManager.LevelUpConfig = void 0),
			(ConfigManager_1.ConfigManager.GenericPromptConfig = void 0),
			(ConfigManager_1.ConfigManager.InstanceDungeonConfig = void 0),
			(ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig = void 0),
			(ConfigManager_1.ConfigManager.PropertyIndexConfig = void 0),
			(ConfigManager_1.ConfigManager.HelpConfig = void 0),
			(ConfigManager_1.ConfigManager.JoinTeamConfig = void 0),
			(ConfigManager_1.ConfigManager.ElementInfoConfig = void 0),
			(ConfigManager_1.ConfigManager.MappingConfig = void 0),
			(ConfigManager_1.ConfigManager.MapConfig = void 0),
			(ConfigManager_1.ConfigManager.WorldMapConfig = void 0),
			(ConfigManager_1.ConfigManager.UiCameraAnimationConfig = void 0),
			(ConfigManager_1.ConfigManager.UiRoleCameraConfig = void 0),
			(ConfigManager_1.ConfigManager.BattleUiConfig = void 0),
			(ConfigManager_1.ConfigManager.NpcIconConfig = void 0),
			(ConfigManager_1.ConfigManager.LevelGamePlayConfig = void 0),
			(ConfigManager_1.ConfigManager.BuffItemConfig = void 0),
			(ConfigManager_1.ConfigManager.WorldConfig = void 0),
			(ConfigManager_1.ConfigManager.PlayerInfoConfig = void 0),
			(ConfigManager_1.ConfigManager.SwimConfig = void 0),
			(ConfigManager_1.ConfigManager.RedDotConfig = void 0),
			(ConfigManager_1.ConfigManager.MenuBaseConfig = void 0),
			(ConfigManager_1.ConfigManager.RoleConfig = void 0),
			(ConfigManager_1.ConfigManager.AudioConfig = void 0),
			(ConfigManager_1.ConfigManager.InputDistributeConfig = void 0),
			(ConfigManager_1.ConfigManager.VideoConfig = void 0),
			(ConfigManager_1.ConfigManager.RenderModuleConfig = void 0),
			(ConfigManager_1.ConfigManager.LogReportConfig = void 0),
			(ConfigManager_1.ConfigManager.UiResourceConfig = void 0),
			(ConfigManager_1.ConfigManager.FriendConfig = void 0),
			(ConfigManager_1.ConfigManager.UiNavigationConfig = void 0),
			(ConfigManager_1.ConfigManager.PayItemConfig = void 0),
			(ConfigManager_1.ConfigManager.PayShopConfig = void 0),
			(ConfigManager_1.ConfigManager.GiftPackageConfig = void 0),
			(ConfigManager_1.ConfigManager.GachaConfig = void 0),
			(ConfigManager_1.ConfigManager.ItemExchangeConfig = void 0),
			(ConfigManager_1.ConfigManager.PhantomBattleConfig = void 0),
			(ConfigManager_1.ConfigManager.SkillButtonConfig = void 0),
			(ConfigManager_1.ConfigManager.TutorialConfig = void 0),
			(ConfigManager_1.ConfigManager.WeatherModuleConfig = void 0),
			(ConfigManager_1.ConfigManager.InfoDisplayModuleConfig = void 0),
			(ConfigManager_1.ConfigManager.AdventureModuleConfig = void 0),
			(ConfigManager_1.ConfigManager.ManipulateConfig = void 0),
			(ConfigManager_1.ConfigManager.InfluenceConfig = void 0),
			(ConfigManager_1.ConfigManager.ComponentConfig = void 0),
			(ConfigManager_1.ConfigManager.MonthCardConfig = void 0),
			(ConfigManager_1.ConfigManager.CookConfig = void 0),
			(ConfigManager_1.ConfigManager.RoleFavorConfig = void 0),
			(ConfigManager_1.ConfigManager.MonsterInfoConfig = void 0),
			(ConfigManager_1.ConfigManager.BattlePassConfig = void 0),
			(ConfigManager_1.ConfigManager.ComposeConfig = void 0),
			(ConfigManager_1.ConfigManager.ForgingConfig = void 0),
			(ConfigManager_1.ConfigManager.AdviceConfig = void 0),
			(ConfigManager_1.ConfigManager.MotionConfig = void 0),
			(ConfigManager_1.ConfigManager.PhotographConfig = void 0),
			(ConfigManager_1.ConfigManager.LoadingConfig = void 0),
			(ConfigManager_1.ConfigManager.DamageUiConfig = void 0),
			(ConfigManager_1.ConfigManager.BattleUiSetConfig = void 0),
			(ConfigManager_1.ConfigManager.AchievementConfig = void 0),
			(ConfigManager_1.ConfigManager.UiViewConfig = void 0),
			(ConfigManager_1.ConfigManager.ComboTeachingConfig = void 0),
			(ConfigManager_1.ConfigManager.ActivityConfig = void 0),
			(ConfigManager_1.ConfigManager.ActivityRunConfig = void 0),
			(ConfigManager_1.ConfigManager.WeaponComponentConfig = void 0),
			(ConfigManager_1.ConfigManager.ItemRewardConfig = void 0),
			(ConfigManager_1.ConfigManager.FilterConfig = void 0),
			(ConfigManager_1.ConfigManager.SortConfig = void 0),
			(ConfigManager_1.ConfigManager.ExchangeRewardConfig = void 0),
			(ConfigManager_1.ConfigManager.DailyActivityConfig = void 0),
			(ConfigManager_1.ConfigManager.RouletteConfig = void 0),
			(ConfigManager_1.ConfigManager.UiCommonConfig = void 0),
			(ConfigManager_1.ConfigManager.FragmentMemoryConfig = void 0),
			(ConfigManager_1.ConfigManager.SkipInterfaceConfig = void 0),
			(ConfigManager_1.ConfigManager.TowerClimbConfig = void 0),
			(ConfigManager_1.ConfigManager.LordGymConfig = void 0),
			(ConfigManager_1.ConfigManager.ExploreProgressConfig = void 0),
			(ConfigManager_1.ConfigManager.ExploreLevelConfig = void 0),
			(ConfigManager_1.ConfigManager.SignalDecodeConfig = void 0),
			(ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig = void 0),
			(ConfigManager_1.ConfigManager.PlatformConfig = void 0),
			(ConfigManager_1.ConfigManager.CollectItemConfig = void 0),
			!(ConfigManager_1.ConfigManager.BossRushConfig = void 0)
		);
	}
}
exports.ConfigManagerCreator = ConfigManagerCreator;

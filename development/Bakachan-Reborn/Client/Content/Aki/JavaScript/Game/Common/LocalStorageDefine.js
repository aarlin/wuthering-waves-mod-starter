"use strict";
var ELocalStorageGlobalKey, ELocalStoragePlayerKey;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ELocalStoragePlayerKey = exports.ELocalStorageGlobalKey = void 0),
	(function (e) {
		(e[(e.GameQualitySetting = 0)] = "GameQualitySetting"),
			(e[(e.LoginFailCount = 1)] = "LoginFailCount"),
			(e[(e.NextLoginTime = 2)] = "NextLoginTime"),
			(e[(e.ResetLoginFailCountTime = 3)] = "ResetLoginFailCountTime"),
			(e[(e.SingleMapId = 4)] = "SingleMapId"),
			(e[(e.MultiMapId = 5)] = "MultiMapId"),
			(e[(e.LoginSex = 6)] = "LoginSex"),
			(e[(e.SelectBoxActive = 7)] = "SelectBoxActive"),
			(e[(e.AgreeAgreement = 8)] = "AgreeAgreement"),
			(e[(e.SkipPlot = 9)] = "SkipPlot"),
			(e[(e.FirstOpenShop = 10)] = "FirstOpenShop"),
			(e[(e.ServerIp = 11)] = "ServerIp"),
			(e[(e.ServerName = 12)] = "ServerName"),
			(e[(e.ServerId = 13)] = "ServerId"),
			(e[(e.PlayMenuInfo = 14)] = "PlayMenuInfo"),
			(e[(e.Account = 15)] = "Account"),
			(e[(e.GmHistory = 16)] = "GmHistory"),
			(e[(e.LocalGameTimeData = 17)] = "LocalGameTimeData"),
			(e[(e.PackageAudio = 18)] = "PackageAudio"),
			(e[(e.RecentlyAccountList = 19)] = "RecentlyAccountList"),
			(e[(e.RecentlyLoginUID = 20)] = "RecentlyLoginUID"),
			(e[(e.LastTimeUploadStamp = 21)] = "LastTimeUploadStamp"),
			(e[(e.SdkLastTimeLoginData = 22)] = "SdkLastTimeLoginData"),
			(e[(e.SdkLevelData = 23)] = "SdkLevelData"),
			(e[(e.CacheP4Version = 24)] = "CacheP4Version"),
			(e[(e.PatchVersion = 25)] = "PatchVersion"),
			(e[(e.LauncherPatchVersion = 26)] = "LauncherPatchVersion"),
			(e[(e.RequestPhotoPermissionMinTime = 27)] =
				"RequestPhotoPermissionMinTime"),
			(e[(e.PhotoAndShareShowPlayerName = 28)] = "PhotoAndShareShowPlayerName"),
			(e[(e.CombineAction = 29)] = "CombineAction");
	})(
		(ELocalStorageGlobalKey =
			exports.ELocalStorageGlobalKey || (exports.ELocalStorageGlobalKey = {})),
	),
	(function (e) {
		(e[(e.FirstOpenShop = 0)] = "FirstOpenShop"),
			(e[(e.CookerLevelKey = 1)] = "CookerLevelKey"),
			(e[(e.EditBattleTeam = 2)] = "EditBattleTeam"),
			(e[(e.GachaPoolOpenRecord = 3)] = "GachaPoolOpenRecord"),
			(e[(e.InventoryCommonItem = 4)] = "InventoryCommonItem"),
			(e[(e.InventoryAttributeItem = 5)] = "InventoryAttributeItem"),
			(e[(e.InventoryCommonItemRedDot = 6)] = "InventoryCommonItemRedDot"),
			(e[(e.InventoryAttributeItemRedDot = 7)] =
				"InventoryAttributeItemRedDot"),
			(e[(e.GetItemConfigListSaveKey = 8)] = "GetItemConfigListSaveKey"),
			(e[(e.ComposeLevelKey = 9)] = "ComposeLevelKey"),
			(e[(e.ForgingLevelKey = 10)] = "ForgingLevelKey"),
			(e[(e.Chat = 11)] = "Chat"),
			(e[(e.BattlePassPayButton = 12)] = "BattlePassPayButton"),
			(e[(e.MonthCardNextShowRedDotTime = 13)] = "MonthCardNextShowRedDotTime"),
			(e[(e.IsErrorChatReplace = 14)] = "IsErrorChatReplace"),
			(e[(e.LocalFriendApplication = 15)] = "LocalFriendApplication"),
			(e[(e.MarqueeScrollingMap = 16)] = "MarqueeScrollingMap"),
			(e[(e.LoginTime = 17)] = "LoginTime"),
			(e[(e.Activity = 18)] = "Activity"),
			(e[(e.IsTriggerMobileGuide = 19)] = "IsTriggerMobileGuide"),
			(e[(e.IsTriggerDesktopGuide = 20)] = "IsTriggerDesktopGuide"),
			(e[(e.AutoInteractionGuideAppearCount = 21)] =
				"AutoInteractionGuideAppearCount"),
			(e[(e.IsSimpleDetail = 22)] = "IsSimpleDetail"),
			(e[(e.VisionSpecialSkillShowMap = 23)] = "VisionSpecialSkillShowMap"),
			(e[(e.ItemGridDropDown = 24)] = "ItemGridDropDown"),
			(e[(e.HasShowNewMailTipsMap = 25)] = "HasShowNewMailTipsMap"),
			(e[(e.RoguelikeDescModel = 26)] = "RoguelikeDescModel"),
			(e[(e.RoleDataItem = 27)] = "RoleDataItem"),
			(e[(e.CalabashCollect = 28)] = "CalabashCollect"),
			(e[(e.CalabashCollectIsSimpleDetail = 29)] =
				"CalabashCollectIsSimpleDetail"),
			(e[(e.RoguelikeShopRecord = 30)] = "RoguelikeShopRecord"),
			(e[(e.RoguelikeShopNextTimeStamp = 31)] = "RoguelikeShopNextTimeStamp"),
			(e[(e.VisionSkin = 32)] = "VisionSkin"),
			(e[(e.SilentTips = 33)] = "SilentTips"),
			(e[(e.GachaRoleRecord = 34)] = "GachaRoleRecord"),
			(e[(e.GachaWeaponRecord = 35)] = "GachaWeaponRecord");
	})(
		(ELocalStoragePlayerKey =
			exports.ELocalStoragePlayerKey || (exports.ELocalStoragePlayerKey = {})),
	);

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EMouseCursorVisibleType =
		exports.closeViewActionsMap =
		exports.openViewActionsMap =
			void 0);
const InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine");
var EMouseCursorVisibleType;
(exports.openViewActionsMap = new Map([
	[InputMappingsDefine_1.actionMappings.邮件, "MailBoxView"],
	[InputMappingsDefine_1.actionMappings.地图, "WorldMapView"],
	[InputMappingsDefine_1.actionMappings.任务, "QuestView"],
	[InputMappingsDefine_1.actionMappings.编队, "EditFormationView"],
	[InputMappingsDefine_1.actionMappings.背包, "InventoryView"],
	[InputMappingsDefine_1.actionMappings.聊天, "ChatView"],
	[InputMappingsDefine_1.actionMappings.功能菜单, "FunctionView"],
	[InputMappingsDefine_1.actionMappings.角色选择界面, "RoleRootView"],
	[InputMappingsDefine_1.actionMappings.幻象列表界面, "PhantomExploreSetView"],
	[InputMappingsDefine_1.actionMappings.幻象探索选择界面, "PhantomExploreView"],
	[InputMappingsDefine_1.actionMappings.Gm指令, "GmView"],
	[InputMappingsDefine_1.actionMappings.教程, "TutorialView"],
	[InputMappingsDefine_1.actionMappings.联机, "OnlineWorldHallView"],
	[InputMappingsDefine_1.actionMappings.小活动, "CommonActivityView"],
	[InputMappingsDefine_1.actionMappings.调谐, "GachaMainView"],
	[InputMappingsDefine_1.actionMappings.变星, "BattlePassMainView"],
	[InputMappingsDefine_1.actionMappings.拾音辑录, "AdventureGuideView"],
])),
	(exports.closeViewActionsMap = new Map([
		[InputMappingsDefine_1.actionMappings.邮件, "MailBoxView"],
		[InputMappingsDefine_1.actionMappings.任务, "QuestView"],
		[InputMappingsDefine_1.actionMappings.背包, "InventoryView"],
		[InputMappingsDefine_1.actionMappings.角色选择界面, "RoleRootView"],
		[
			InputMappingsDefine_1.actionMappings.幻象列表界面,
			"PhantomExploreSetView",
		],
		[
			InputMappingsDefine_1.actionMappings.幻象探索选择界面,
			"PhantomExploreView",
		],
		[InputMappingsDefine_1.actionMappings.Gm指令, "GmView"],
		[InputMappingsDefine_1.actionMappings.教程, "TutorialView"],
		[InputMappingsDefine_1.actionMappings.联机, "OnlineWorldHallView"],
		[InputMappingsDefine_1.actionMappings.小活动, "CommonActivityView"],
		[InputMappingsDefine_1.actionMappings.调谐, "GachaMainView"],
		[InputMappingsDefine_1.actionMappings.变星, "BattlePassMainView"],
		[InputMappingsDefine_1.actionMappings.拾音辑录, "AdventureGuideView"],
	])),
	(function (i) {
		(i[(i.None = 0)] = "None"),
			(i[(i.AlwaysVisible = 1)] = "AlwaysVisible"),
			(i[(i.AlwaysHide = 2)] = "AlwaysHide");
	})(
		(EMouseCursorVisibleType =
			exports.EMouseCursorVisibleType ||
			(exports.EMouseCursorVisibleType = {})),
	);

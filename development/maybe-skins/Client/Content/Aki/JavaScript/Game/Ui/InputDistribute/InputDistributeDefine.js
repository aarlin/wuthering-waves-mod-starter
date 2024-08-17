"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AXIS_TOLERANCE =
		exports.inputDistributeEvents =
		exports.keyTagMap =
		exports.touchTagMap =
		exports.axisTagMap =
		exports.actionTagMap =
		exports.initializeInputDistributeTagDefine =
		exports.inputDistributeTagDefine =
			void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	InputMappingsDefine_1 = require("./InputMappingsDefine");
(exports.inputDistributeTagDefine = {
	FightInputRootTag: "FightInputRoot",
	FightInputRoot: {
		ActionInputTag: "FightInputRoot.FightInput.ActionInput",
		ActionInput: {
			CharacterSkillInputTag:
				"FightInputRoot.FightInput.ActionInput.CharacterSkillInput",
		},
		AxisInputTag: "FightInputRoot.FightInput.AxisInput",
		AxisInput: {
			CameraInputTag: "FightInputRoot.FightInput.AxisInput.CameraInput",
			CameraInput: {
				CameraRotationTag:
					"FightInputRoot.FightInput.AxisInput.CameraInput.CameraRotation",
				CameraZoomTag:
					"FightInputRoot.FightInput.AxisInput.CameraInput.CameraZoom",
			},
			MoveInputTag: "FightInputRoot.FightInput.AxisInput.MoveInput",
		},
	},
	InteractionRootTag: "InteractionRoot",
	UiInputRootTag: "UiInputRoot",
	UiInputRoot: {
		ShortcutKeyTag: "UiInputRoot.ShortcutKeyTag",
		NavigationTag: "UiInputRoot.Navigation",
		MouseInputTag: "UiInputRoot.MouseInputTag",
	},
	BlockAllInputTag: "BlockAllInputTag",
}),
	(exports.initializeInputDistributeTagDefine = [
		{
			Tag: exports.inputDistributeTagDefine.FightInputRootTag,
			ParentTag: void 0,
		},
		{
			Tag: exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
			ParentTag: exports.inputDistributeTagDefine.FightInputRootTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.FightInputRoot.ActionInput
				.CharacterSkillInputTag,
			ParentTag: exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.FightInputRoot.AxisInputTag,
			ParentTag: exports.inputDistributeTagDefine.FightInputRootTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.FightInputRoot.AxisInput
				.CameraInputTag,
			ParentTag: exports.inputDistributeTagDefine.FightInputRoot.AxisInputTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput
				.CameraRotationTag,
			ParentTag:
				exports.inputDistributeTagDefine.FightInputRoot.AxisInput
					.CameraInputTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput
				.CameraZoomTag,
			ParentTag:
				exports.inputDistributeTagDefine.FightInputRoot.AxisInput
					.CameraInputTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.FightInputRoot.AxisInput
				.MoveInputTag,
			ParentTag: exports.inputDistributeTagDefine.FightInputRoot.AxisInputTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.InteractionRootTag,
			ParentTag: void 0,
		},
		{ Tag: exports.inputDistributeTagDefine.UiInputRootTag, ParentTag: void 0 },
		{
			Tag: exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
			ParentTag: exports.inputDistributeTagDefine.UiInputRootTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.UiInputRoot.MouseInputTag,
			ParentTag: exports.inputDistributeTagDefine.UiInputRootTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
			ParentTag: exports.inputDistributeTagDefine.UiInputRootTag,
		},
		{
			Tag: exports.inputDistributeTagDefine.BlockAllInputTag,
			ParentTag: void 0,
		},
	]),
	(exports.actionTagMap = new Map([
		[
			InputMappingsDefine_1.actionMappings.大招,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInput
				.CharacterSkillInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.技能1,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInput
				.CharacterSkillInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.攻击,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInput
				.CharacterSkillInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.幻象1,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.幻象2,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.攀爬,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.手柄主攻击,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.手柄副攻击,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.瞄准,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.走跑切换,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.跳跃,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.通用交互,
			exports.inputDistributeTagDefine.InteractionRootTag,
		],
		[
			InputMappingsDefine_1.actionMappings.锁定目标,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.闪避,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.切换角色1,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.切换角色2,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.切换角色3,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.切换角色4,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[InputMappingsDefine_1.actionMappings.组合主键, void 0],
		[
			InputMappingsDefine_1.actionMappings.向前移动,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.向后移动,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.向左移动,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.向右移动,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.ZoomIn,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.ZoomOut,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.QTE交互,
			exports.inputDistributeTagDefine.FightInputRoot.ActionInputTag,
		],
		[InputMappingsDefine_1.actionMappings.Gm指令, void 0],
		[
			InputMappingsDefine_1.actionMappings.任务,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.功能菜单,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.地图,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.幻象列表界面,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.幻象探索选择界面,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[InputMappingsDefine_1.actionMappings.显示鼠标, void 0],
		[
			InputMappingsDefine_1.actionMappings.编队,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.背包,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.教程,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.联机,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.角色选择界面,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.邮件,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.商店,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.聊天,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.激活聊天,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.环境特性,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.任务追踪,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.切换交互,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.玩法放弃,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.拍照,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.Ui左键点击,
			exports.inputDistributeTagDefine.UiInputRoot.MouseInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.Ui右键点击,
			exports.inputDistributeTagDefine.UiInputRoot.MouseInputTag,
		],
		[
			InputMappingsDefine_1.actionMappings.轮盘切换,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.小活动,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.调谐,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.变星,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.拾音辑录,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.放弃改键,
			exports.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag,
		],
		[
			InputMappingsDefine_1.actionMappings.展开教程百科详情,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.滚动条切换,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.Ui返回,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.Ui方向上,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.Ui方向下,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.Ui方向左,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.Ui方向右,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘F手柄A,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘R手柄X,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘T手柄Y,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘Q手柄LB,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘E手柄RB,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘Z手柄LT,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘C手柄RT,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI手柄右摇杆上,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI手柄右摇杆下,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘G手柄特右,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘X手柄特左,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘U手柄左摇杆,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘G手柄右摇杆,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘Y手柄特右,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘H手柄特左,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘ESC手柄B,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键鼠F空格,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI手柄A方向右,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI手柄B方向左,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.手柄引导下一步,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI左摇杆上,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI左摇杆下,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI左摇杆左,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI左摇杆右,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI鼠标侧键前,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI鼠标侧键后,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.actionMappings.UI键盘V手柄特左,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
	])),
	(exports.axisTagMap = new Map([
		[
			InputMappingsDefine_1.axisMappings.LookUp,
			exports.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput
				.CameraRotationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.Turn,
			exports.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput
				.CameraRotationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.Zoom,
			exports.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput
				.CameraZoomTag,
		],
		[
			InputMappingsDefine_1.axisMappings.MoveForward,
			exports.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag,
		],
		[
			InputMappingsDefine_1.axisMappings.MoveRight,
			exports.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag,
		],
		[
			InputMappingsDefine_1.axisMappings.WheelAxis,
			exports.inputDistributeTagDefine.UiInputRoot.MouseInputTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiIncrease,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiReduce,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiIncrease2,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiReduce2,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiMoveForward,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiMoveRight,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.NavigationTopDown,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.NavigationLeftRight,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiScroll1,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiScroll2,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiLookUp,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiTurn,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.UiWheelAxis,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.Ui左摇杆,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.Ui右摇杆,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.NextGroup,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.PrevGroup,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.MapIncrease,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.MapReduce,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.MapMoveForward,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.MapMoveRight,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.RoleLookUp,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.RoleTurn,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.RoleIncrease,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[
			InputMappingsDefine_1.axisMappings.RoleReduce,
			exports.inputDistributeTagDefine.UiInputRoot.NavigationTag,
		],
		[InputMappingsDefine_1.axisMappings.MouseMove, void 0],
	])),
	(exports.touchTagMap = new Map([
		[InputMappingsDefine_1.touchIdMappings.Touch1, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch2, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch3, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch4, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch5, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch6, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch7, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch8, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch9, void 0],
		[InputMappingsDefine_1.touchIdMappings.Touch10, void 0],
	])),
	(exports.keyTagMap = new Map([
		[InputMappingsDefine_1.keyMappings.AndroidBack, void 0],
	])),
	(exports.inputDistributeEvents = [
		EventDefine_1.EEventName.OnAddNotAllowFightInputViewName,
		EventDefine_1.EEventName.OnRemoveNotAllowFightInputViewName,
		EventDefine_1.EEventName.OnClearNotAllowFightInputViewName,
		EventDefine_1.EEventName.ShowHUD,
		EventDefine_1.EEventName.HideHUD,
		EventDefine_1.EEventName.ReConnectBegin,
		EventDefine_1.EEventName.ReConnectSuccess,
		EventDefine_1.EEventName.LogOut,
		EventDefine_1.EEventName.PlotNetworkStart,
		EventDefine_1.EEventName.PlotNetworkEnd,
		EventDefine_1.EEventName.OnShowMouseCursor,
		EventDefine_1.EEventName.OnStartLoadingState,
		EventDefine_1.EEventName.OnFinishLoadingState,
		EventDefine_1.EEventName.WorldDone,
		EventDefine_1.EEventName.ResetModuleByResetToBattleView,
		EventDefine_1.EEventName.SdkKick,
		EventDefine_1.EEventName.CharOnRoleDrown,
		EventDefine_1.EEventName.OnPlotWaitViewDone,
		EventDefine_1.EEventName.OnPlatformChanged,
		EventDefine_1.EEventName.OnCameraSequenceSetUiVisible,
		EventDefine_1.EEventName.OnEnterTransitionMap,
		EventDefine_1.EEventName.OnSequenceCameraStatus,
	]),
	(exports.AXIS_TOLERANCE = 0.02);

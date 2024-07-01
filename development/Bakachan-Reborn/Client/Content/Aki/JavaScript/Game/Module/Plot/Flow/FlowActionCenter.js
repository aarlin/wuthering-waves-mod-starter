"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowAction = exports.FlowActionCenter = void 0);
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
	FlowActionAddPlayBubble_1 = require("../FlowActions/FlowActionAddPlayBubble"),
	FlowActionAwakeEntity_1 = require("../FlowActions/FlowActionAwakeEntity"),
	FlowActionBeginFlowTemplate_1 = require("../FlowActions/FlowActionBeginFlowTemplate"),
	FlowActionCameraLookAt_1 = require("../FlowActions/FlowActionCameraLookAt"),
	FlowActionChangeActorTalker_1 = require("../FlowActions/FlowActionChangeActorTalker"),
	FlowActionChangeEntityPerformanceState_1 = require("../FlowActions/FlowActionChangeEntityPerformanceState"),
	FlowActionChangeEntitySelfState_1 = require("../FlowActions/FlowActionChangeEntitySelfState"),
	FlowActionChangeEntityState_1 = require("../FlowActions/FlowActionChangeEntityState"),
	FlowActionChangeFormation_1 = require("../FlowActions/FlowActionChangeFormation"),
	FlowActionChangeInteractOptionText_1 = require("../FlowActions/FlowActionChangeInteractOptionText"),
	FlowActionChangeState_1 = require("../FlowActions/FlowActionChangeState"),
	FlowActionCloseFlowTemplate_1 = require("../FlowActions/FlowActionCloseFlowTemplate"),
	FlowActionDestroyEntity_1 = require("../FlowActions/FlowActionDestroyEntity"),
	FlowActionFadeInScreen_1 = require("../FlowActions/FlowActionFadeInScreen"),
	FlowActionFadeOutScreen_1 = require("../FlowActions/FlowActionFadeOutScreen"),
	FlowActionFinishState_1 = require("../FlowActions/FlowActionFinishState"),
	FlowActionFinishTalk_1 = require("../FlowActions/FlowActionFinishTalk"),
	FlowActionHideByRangeInFlow_1 = require("../FlowActions/FlowActionHideByRangeInFlow"),
	FlowActionJumpTalk_1 = require("../FlowActions/FlowActionJumpTalk"),
	FlowActionLevelSyncAction_1 = require("../FlowActions/FlowActionLevelSyncAction"),
	FlowActionLockTodTime_1 = require("../FlowActions/FlowActionLockTodTime"),
	FlowActionOpenQuestChapterView_1 = require("../FlowActions/FlowActionOpenQuestChapterView"),
	FlowActionOpenSystemBoard_1 = require("../FlowActions/FlowActionOpenSystemBoard"),
	FlowActionPlayMovie_1 = require("../FlowActions/FlowActionPlayMovie"),
	FlowActionPlaySequenceData_1 = require("../FlowActions/FlowActionPlaySequenceData"),
	FlowActionServerAction_1 = require("../FlowActions/FlowActionServerAction"),
	FlowActionSetCameraAnim_1 = require("../FlowActions/FlowActionSetCameraAnim"),
	FlowActionSetEntityVisible_1 = require("../FlowActions/FlowActionSetEntityVisible"),
	FlowActionSetFlowTemplate_1 = require("../FlowActions/FlowActionSetFlowTemplate"),
	FlowActionSetHeadIconVisible_1 = require("../FlowActions/FlowActionSetHeadIconVisible"),
	FlowActionSetPlayerPos_1 = require("../FlowActions/FlowActionSetPlayerPos"),
	FlowActionSetPlotMode_1 = require("../FlowActions/FlowActionSetPlotMode"),
	FlowActionSetTime_1 = require("../FlowActions/FlowActionSetTime"),
	FlowActionShowCenterText_1 = require("../FlowActions/FlowActionShowCenterText"),
	FlowActionShowTalk_1 = require("../FlowActions/FlowActionShowTalk"),
	FlowActionSwitchSubLevels_1 = require("../FlowActions/FlowActionSwitchSubLevels"),
	FlowActionTakePlotPhoto_1 = require("../FlowActions/FlowActionTakePlotPhoto"),
	FlowActionUnlockEntity_1 = require("../FlowActions/FlowActionUnlockEntity"),
	FlowActionWait_1 = require("../FlowActions/FlowActionWait");
class FlowActionCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments), (this.yQi = new Map());
	}
	OnInit() {
		this.LTe();
	}
	OnDestroy() {
		this.yQi?.clear();
	}
	LTe() {
		this.IQi("ShowTalk", FlowActionShowTalk_1.FlowActionShowTalk),
			this.IQi("ChangeState", FlowActionChangeState_1.FlowActionChangeState),
			this.IQi("FinishState", FlowActionFinishState_1.FlowActionFinishState),
			this.IQi("JumpTalk", FlowActionJumpTalk_1.FlowActionJumpTalk),
			this.IQi("FinishTalk", FlowActionFinishTalk_1.FlowActionFinishTalk),
			this.IQi(
				"PlaySequenceData",
				FlowActionPlaySequenceData_1.FlowActionPlaySequenceData,
			),
			this.IQi("SetPlotMode", FlowActionSetPlotMode_1.FlowActionSetPlotMode),
			this.IQi(
				"ShowCenterText",
				FlowActionShowCenterText_1.FlowActionShowCenterText,
			),
			this.IQi(
				"SetHeadIconVisible",
				FlowActionSetHeadIconVisible_1.FlowActionSetHeadIconVisible,
			),
			this.IQi("Wait", FlowActionWait_1.FlowActionWait),
			this.IQi("PlayMovie", FlowActionPlayMovie_1.FlowActionPlayMovie),
			this.IQi(
				"ChangeInteractOptionText",
				FlowActionChangeInteractOptionText_1.FlowActionChangeInteractOptionText,
				!0,
			),
			this.IQi("FadeInScreen", FlowActionFadeInScreen_1.FlowActionFadeInScreen),
			this.IQi(
				"FadeOutScreen",
				FlowActionFadeOutScreen_1.FlowActionFadeOutScreen,
			),
			this.IQi(
				"BeginFlowTemplate",
				FlowActionBeginFlowTemplate_1.FlowActionBeginFlowTemplate,
			),
			this.IQi(
				"SetFlowTemplate",
				FlowActionSetFlowTemplate_1.FlowActionSetFlowTemplate,
			),
			this.IQi(
				"CloseFlowTemplate",
				FlowActionCloseFlowTemplate_1.FlowActionCloseFlowTemplate,
			),
			this.IQi("SetPlayerPos", FlowActionSetPlayerPos_1.FlowActionSetPlayerPos),
			this.IQi("AwakeEntity", FlowActionAwakeEntity_1.FlowActionAwakeEntity),
			this.IQi(
				"DestroyEntity",
				FlowActionDestroyEntity_1.FlowActionDestroyEntity,
			),
			this.IQi(
				"PlayerLookAt",
				FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
				!0,
			),
			this.IQi(
				"PostAkEvent",
				FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
				!0,
			),
			this.IQi("CameraLookAt", FlowActionCameraLookAt_1.FlowActionCameraLookAt),
			this.IQi(
				"PlayBubble",
				FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
				!0,
			),
			this.IQi(
				"AddPlayBubble",
				FlowActionAddPlayBubble_1.FlowActionAddPlayBubble,
				!0,
			),
			this.IQi(
				"SetCameraAnim",
				FlowActionSetCameraAnim_1.FlowActionSetCameraAnim,
				!0,
			),
			this.IQi(
				"TakePlotPhoto",
				FlowActionTakePlotPhoto_1.FlowActionTakePlotPhoto,
			),
			this.IQi("SetTime", FlowActionSetTime_1.FlowActionSetTime, !0),
			this.IQi(
				"HideByRangeInFlow",
				FlowActionHideByRangeInFlow_1.FlowActionHideByRangeInFlow,
				!0,
			),
			this.IQi(
				"ChangeActorTalker",
				FlowActionChangeActorTalker_1.FlowActionChangeActorTalker,
				!0,
			),
			this.IQi("SetWeather", FlowActionServerAction_1.FlowActionServerAction),
			this.IQi(
				"SetTimeLockState",
				FlowActionLockTodTime_1.FlowActionLockTodTime,
				!0,
			),
			this.IQi(
				"SetWeatherLockState",
				FlowActionServerAction_1.FlowActionServerAction,
			),
			this.IQi(
				"PromptQuestChapterUI",
				FlowActionOpenQuestChapterView_1.FlowActionOpenQuestChapterView,
			),
			this.IQi(
				"OpenSystemBoard",
				FlowActionOpenSystemBoard_1.FlowActionOpenSystemBoard,
			),
			this.IQi(
				"ChangeEntityState",
				FlowActionChangeEntityState_1.FlowActionChangeEntityState,
			),
			this.IQi(
				"UnlockEntity",
				FlowActionUnlockEntity_1.FlowActionUnlockEntity,
				!0,
			),
			this.IQi(
				"AdjustPlayerCamera",
				FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
				!0,
			),
			this.IQi(
				"RestorePlayerCameraAdjustment",
				FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
				!0,
			),
			this.IQi(
				"ChangeEntityPrefabPerformance",
				FlowActionChangeEntityPerformanceState_1.FlowActionChangeEntityPerformanceState,
				!0,
			),
			this.IQi(
				"ChangeSelfEntityState",
				FlowActionChangeEntitySelfState_1.FlowActionChangeEntitySelfState,
				!0,
			),
			this.IQi(
				"SetEntityVisible",
				FlowActionSetEntityVisible_1.FlowActionSetEntityVisible,
			),
			this.IQi(
				"ChangePhantomFormation",
				FlowActionChangeFormation_1.FlowActionChangeFormation,
			),
			this.IQi(
				"RestorePhantomFormation",
				FlowActionChangeFormation_1.FlowActionChangeFormation,
			),
			this.IQi(
				"AddTrialCharacter",
				FlowActionChangeFormation_1.FlowActionChangeFormation,
			),
			this.IQi(
				"RemoveTrialCharacter",
				FlowActionChangeFormation_1.FlowActionChangeFormation,
			),
			this.IQi(
				"SwitchSubLevels",
				FlowActionSwitchSubLevels_1.FlowActionSwitchSubLevels,
			);
	}
	IQi(t, o, i = !1) {
		var e;
		this.yQi.has(t) ||
			((e = new FlowAction()).Init(t, o, i), this.yQi.set(t, e));
	}
	GetFlowAction(t) {
		return this.yQi.get(t);
	}
}
exports.FlowActionCenter = FlowActionCenter;
class FlowAction {
	constructor() {
		(this.Type = ""),
			(this.ActionClass = void 0),
			(this.IsAutoFinish = !1),
			(this.ActionInstanceList = void 0);
	}
	Init(t, o, i = !1) {
		(this.Type = t),
			(this.ActionClass = o),
			(this.IsAutoFinish = i),
			(this.ActionInstanceList = new Array()),
			(t = this.dZ()),
			this.ActionInstanceList.push(t);
	}
	dZ() {
		var t = new this.ActionClass();
		return (t.Type = this.Type), t;
	}
	GetAction() {
		var t = this.TQi();
		return (t.Owner = this), t;
	}
	TQi() {
		return this.IsAutoFinish
			? this.ActionInstanceList[0]
			: this.ActionInstanceList.length <= 0
				? this.dZ()
				: this.ActionInstanceList.pop();
	}
	RecycleAction(t) {
		(t.Owner = void 0), this.IsAutoFinish || this.ActionInstanceList.push(t);
	}
}
exports.FlowAction = FlowAction;

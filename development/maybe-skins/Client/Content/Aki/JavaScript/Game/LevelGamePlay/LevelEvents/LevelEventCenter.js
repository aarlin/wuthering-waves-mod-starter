"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCenter = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	GlobalData_1 = require("../../GlobalData"),
	LevelEventChangePhantomFormation_1 = require("../LevelEventChangePhantomFormation"),
	LevelEventRestorePhantomFormation_1 = require("../LevelEventRestorePhantomFormation"),
	LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine"),
	LevelGeneralDefine_1 = require("../LevelGeneralDefine"),
	LevelEventAddBuffToCreature_1 = require("./LevelEventAddBuffToCreature"),
	LevelEventAddBuffToEntity_1 = require("./LevelEventAddBuffToEntity"),
	LevelEventAddBuffToTriggeredEntity_1 = require("./LevelEventAddBuffToTriggeredEntity"),
	LevelEventAddCreatureTag_1 = require("./LevelEventAddCreatureTag"),
	LevelEventAddInputTag_1 = require("./LevelEventAddInputTag"),
	LevelEventAddTag_1 = require("./LevelEventAddTag"),
	LevelEventAddTrialCharacter_1 = require("./LevelEventAddTrialCharacter"),
	LevelEventAdjustPlayerCamera_1 = require("./LevelEventAdjustPlayerCamera"),
	LevelEventAdjustTodTime_1 = require("./LevelEventAdjustTodTime"),
	LevelEventAudioEvent_1 = require("./LevelEventAudioEvent"),
	LevelEventCameraLookAtPosition_1 = require("./LevelEventCameraLookAtPosition"),
	LevelEventCameraShake_1 = require("./LevelEventCameraShake"),
	LevelEventCaptureRequest_1 = require("./LevelEventCaptureRequest"),
	LevelEventChangeAI_1 = require("./LevelEventChangeAI"),
	LevelEventChangeEntityPerformanceState_1 = require("./LevelEventChangeEntityPerformanceState"),
	LevelEventChangeFightIntensity_1 = require("./LevelEventChangeFightIntensity"),
	LevelEventChangePatrol_1 = require("./LevelEventChangePatrol"),
	LevelEventChangeToVision_1 = require("./LevelEventChangeToVision"),
	LevelEventCharacterMove_1 = require("./LevelEventCharacterMove"),
	LevelEventCheckBattleState_1 = require("./LevelEventCheckBattleState"),
	LevelEventCheckFlyState_1 = require("./LevelEventCheckFlyState"),
	LevelEventClaimDungeonReward_1 = require("./LevelEventClaimDungeonReward"),
	LevelEventClaimLevelPlayReward_1 = require("./LevelEventClaimLevelPlayReward"),
	LevelEventCollect_1 = require("./LevelEventCollect"),
	LevelEventCompleteGuide_1 = require("./LevelEventCompleteGuide"),
	LevelEventControlTodTime_1 = require("./LevelEventControlTodTime"),
	LevelEventDeliverQuestBehavior_1 = require("./LevelEventDeliverQuestBehavior"),
	LevelEventEnableAi_1 = require("./LevelEventEnableAi"),
	LevelEventEnableHostility_1 = require("./LevelEventEnableHostility"),
	LevelEventEnableMapView_1 = require("./LevelEventEnableMapView"),
	LevelEventEnableSplineMoveModel_1 = require("./LevelEventEnableSplineMoveModel"),
	LevelEventEnterOrbitalCamera_1 = require("./LevelEventEnterOrbitalCamera"),
	LevelEventEnterSequenceCamera_1 = require("./LevelEventEnterSequenceCamera"),
	LevelEventEntityLookAt_1 = require("./LevelEventEntityLookAt"),
	LevelEventExecution_1 = require("./LevelEventExecution"),
	LevelEventExitCameraLookAtPosition_1 = require("./LevelEventExitCameraLookAtPosition"),
	LevelEventExitDungeon_1 = require("./LevelEventExitDungeon"),
	LevelEventExitOrbitalCamera_1 = require("./LevelEventExitOrbitalCamera"),
	LevelEventFadeInScreen_1 = require("./LevelEventFadeInScreen"),
	LevelEventFadeOutScreen_1 = require("./LevelEventFadeOutScreen"),
	LevelEventFocusOnInformationBoard_1 = require("./LevelEventFocusOnInformationBoard"),
	LevelEventForceLockOnSpecialTagTarget_1 = require("./LevelEventForceLockOnSpecialTagTarget"),
	LevelEventGuideFinish_1 = require("./LevelEventGuideFinish"),
	LevelEventGuideTrigger_1 = require("./LevelEventGuideTrigger"),
	LevelEventHideTargetRange_1 = require("./LevelEventHideTargetRange"),
	LevelEventHighlightExploreUi_1 = require("./LevelEventHighlightExploreUi"),
	LevelEventInteractFan_1 = require("./LevelEventInteractFan"),
	LevelEventInterludeActions_1 = require("./LevelEventInterludeActions"),
	LevelEventLeisureInteract_1 = require("./LevelEventLeisureInteract"),
	LevelEventLog_1 = require("./LevelEventLog"),
	LevelEventModifyActorMaterial_1 = require("./LevelEventModifyActorMaterial"),
	LevelEventMoveJigsawItem_1 = require("./LevelEventMoveJigsawItem"),
	LevelEventMoveWithSpline_1 = require("./LevelEventMoveWithSpline"),
	LevelEventOpenChapterUi_1 = require("./LevelEventOpenChapterUi"),
	LevelEventOpenDragonPool_1 = require("./LevelEventOpenDragonPool"),
	LevelEventOpenHelp_1 = require("./LevelEventOpenHelp"),
	LevelEventOpenInfoDisplayView_1 = require("./LevelEventOpenInfoDisplayView"),
	LevelEventOpenInstance_1 = require("./LevelEventOpenInstance"),
	LevelEventOpenInstanceEntrance_1 = require("./LevelEventOpenInstanceEntrance"),
	LevelEventOpenShop_1 = require("./LevelEventOpenShop"),
	LevelEventOpenSimpleGameplay_1 = require("./LevelEventOpenSimpleGameplay"),
	LevelEventOpenSystem_1 = require("./LevelEventOpenSystem"),
	LevelEventOpenUI_1 = require("./LevelEventOpenUI"),
	LevelEventPickupDropItem_1 = require("./LevelEventPickupDropItem"),
	LevelEventPlayBubble_1 = require("./LevelEventPlayBubble"),
	LevelEventPlayDynamicSettlement_1 = require("./LevelEventPlayDynamicSettlement"),
	LevelEventPlayerLoockAt_1 = require("./LevelEventPlayerLoockAt"),
	LevelEventPlayLevelSequence_1 = require("./LevelEventPlayLevelSequence"),
	LevelEventPlayMontage_1 = require("./LevelEventPlayMontage"),
	LevelEventPlayMovie_1 = require("./LevelEventPlayMovie"),
	LevelEventPlayRegisteredMontage_1 = require("./LevelEventPlayRegisteredMontage"),
	LevelEventPlayWuYinAreaSequence_1 = require("./LevelEventPlayWuYinAreaSequence"),
	LevelEventPlotInterludeAction_1 = require("./LevelEventPlotInterludeAction"),
	LevelEventPostAkEvent_1 = require("./LevelEventPostAkEvent"),
	LevelEventPrompt_1 = require("./LevelEventPrompt"),
	LevelEventRefreshInputTag_1 = require("./LevelEventRefreshInputTag"),
	LevelEventRemoveBuffFromCreature_1 = require("./LevelEventRemoveBuffFromCreature"),
	LevelEventRemoveCreatureTag_1 = require("./LevelEventRemoveCreatureTag"),
	LevelEventRemoveTag_1 = require("./LevelEventRemoveTag"),
	LevelEventRestoreFromVision_1 = require("./LevelEventRestoreFromVision"),
	LevelEventRestorePlayerCameraAdjustment_1 = require("./LevelEventRestorePlayerCameraAdjustment"),
	LevelEventRunAction_1 = require("./LevelEventRunAction"),
	LevelEventSceneItemMove_1 = require("./LevelEventSceneItemMove"),
	LevelEventSendAiEvent_1 = require("./LevelEventSendAiEvent"),
	LevelEventSendGameplayEventToPlayer_1 = require("./LevelEventSendGameplayEventToPlayer"),
	LevelEventSetActorVisible_1 = require("./LevelEventSetActorVisible"),
	LevelEventSetBattleState_1 = require("./LevelEventSetBattleState"),
	LevelEventSetBlackBoardValue_1 = require("./LevelEventSetBlackBoardValue"),
	LevelEventSetExploreState_1 = require("./LevelEventSetExploreState"),
	LevelEventSetInteractionLockState_1 = require("./LevelEventSetInteractionLockState"),
	LevelEventSetNpcPosition_1 = require("./LevelEventSetNpcPosition"),
	LevelEventSetOffset_1 = require("./LevelEventSetOffset"),
	LevelEventSetPlayerCameraLockState_1 = require("./LevelEventSetPlayerCameraLockState"),
	LevelEventSetPlayerMoveControl_1 = require("./LevelEventSetPlayerMoveControl"),
	LevelEventSetPlayerOperation_1 = require("./LevelEventSetPlayerOperation"),
	LevelEventSetPos_1 = require("./LevelEventSetPos"),
	LevelEventSetRegionConfig_1 = require("./LevelEventSetRegionConfig"),
	LevelEventSetRotation_1 = require("./LevelEventSetRotation"),
	LevelEventSetTargetPos_1 = require("./LevelEventSetTargetPos"),
	LevelEventSetTimeSlowDown_1 = require("./LevelEventSetTimeSlowDown"),
	LevelEventSettlementDungeon_1 = require("./LevelEventSettlementDungeon"),
	LevelEventSetupSeqCamera_1 = require("./LevelEventSetupSeqCamera"),
	LevelEventSetWuYinQuState_1 = require("./LevelEventSetWuYinQuState"),
	LevelEventShowDialog_1 = require("./LevelEventShowDialog"),
	LevelEventShowPlotPhoto_1 = require("./LevelEventShowPlotPhoto"),
	LevelEventShowTargetRange_1 = require("./LevelEventShowTargetRange"),
	LevelEventSpawnEffect_1 = require("./LevelEventSpawnEffect"),
	LevelEventSpawnTraceEffect_1 = require("./LevelEventSpawnTraceEffect"),
	LevelEventSportsState_1 = require("./LevelEventSportsState"),
	LevelEventsToggleScanSplineEffect_1 = require("./LevelEventsToggleScanSplineEffect"),
	LevelEventStopSceneItemMove_1 = require("./LevelEventStopSceneItemMove"),
	LevelEventSubmitQuestBehavior_1 = require("./LevelEventSubmitQuestBehavior"),
	LevelEventSwitchSubLevels_1 = require("./LevelEventSwitchSubLevels"),
	LevelEventTeleportDungeon_1 = require("./LevelEventTeleportDungeon"),
	LevelEventTeleportToResetPoint_1 = require("./LevelEventTeleportToResetPoint"),
	LevelEventTimeTrackControl_1 = require("./LevelEventTimeTrackControl"),
	LevelEventToggleAirWall_1 = require("./LevelEventToggleAirWall"),
	LevelEventToggleMapMarkState_1 = require("./LevelEventToggleMapMarkState"),
	LevelEventTreasurBoxIdleFlow_1 = require("./LevelEventTreasurBoxIdleFlow"),
	LevelEventTriggerCameraShake_1 = require("./LevelEventTriggerCameraShake"),
	LevelEventTriggerExit_1 = require("./LevelEventTriggerExit"),
	LevelEventUnlockDungeonEntry_1 = require("./LevelEventUnlockDungeonEntry"),
	LevelEventUnlockInstanceEntrance_1 = require("./LevelEventUnlockInstanceEntrance"),
	LevelEventUnlockSystemItem_1 = require("./LevelEventUnlockSystemItem"),
	LevelEventUpdateInstanceEntranceUnlockStatus_1 = require("./LevelEventUpdateInstanceEntranceUnlockStatus"),
	LevelEventUsePhantomSkill_1 = require("./LevelEventUsePhantomSkill"),
	LevelEventWaitFlyControl_1 = require("./LevelEventWaitFlyControl"),
	LevelEventWaitTime_1 = require("./LevelEventWaitTime"),
	DEFAULT = 1,
	LEVEL_1 = 4,
	LEVEL_2 = 8,
	LEVEL_MAX = 1024;
class LevelEventCenter {
	static AU() {
		(this.FLe = new Map()),
			(this.VLe = new Array()),
			(this.HLe = new Map()),
			(this.jLe = new Set()),
			(this.WLe = new Map()),
			(this.KLe = new Map());
	}
	static RegistEvents() {
		this.AU();
		var e = LevelGeneralDefine_1.ELevelGeneralEvent,
			t = LevelEventCenter.QLe;
		t(
			e.ChangeFightIntensity,
			LevelEventChangeFightIntensity_1.LevelEventChangeFightIntensity,
		),
			t(
				e.FocusOnInformationBoard,
				LevelEventFocusOnInformationBoard_1.LevelEventFocusOnInformationBoard,
			),
			t(
				e.CameraLookAtPosition,
				LevelEventCameraLookAtPosition_1.LevelEventCameraLookAtPosition,
			),
			t(
				e.SendGameplayEventToPlayer,
				LevelEventSendGameplayEventToPlayer_1.LevelEventSendGameplayEventToPlayer,
			),
			t(
				e.ExitCameraLookAtPosition,
				LevelEventExitCameraLookAtPosition_1.LevelEventExitCameraLookAtPosition,
			),
			t(
				e.SetPlayerMoveControl,
				LevelEventSetPlayerMoveControl_1.LevelEventSetPlayerMoveControl,
			),
			t(
				e.SetPlayerCameraLockState,
				LevelEventSetPlayerCameraLockState_1.LevelEventSetPlayerCameraLockState,
			),
			t(e.AddTag, LevelEventAddTag_1.LevelEventAddTag),
			t(e.RemoveTag, LevelEventRemoveTag_1.LevelEventRemoveTag),
			t(e.SetPos, LevelEventSetPos_1.LevelEventSetPos),
			t(e.SetOffset, LevelEventSetOffset_1.LevelEventSetOffset),
			t(e.SetRotation, LevelEventSetRotation_1.LevelEventSetRotation),
			t(e.AddCreatureTag, LevelEventAddCreatureTag_1.LevelEventAddCreatureTag),
			t(
				e.RemoveCreatureTag,
				LevelEventRemoveCreatureTag_1.LevelEventRemoveCreatureTag,
			),
			t(e.OpenShop, LevelEventOpenShop_1.LevelEventOpenShop),
			t(
				e.OpenInfoDisplay,
				LevelEventOpenInfoDisplayView_1.LevelEventOpenInfoDisplayView,
			),
			t(e.ChangeAI, LevelEventChangeAI_1.LevelEventChangeAI),
			t(e.PlayMontage, LevelEventPlayMontage_1.LevelEventPlayMontage, 4),
			t(e.SetTargetPos, LevelEventSetTargetPos_1.LevelEventSetTargetPos),
			t(e.GuideFinish, LevelEventGuideFinish_1.LevelEventGuideFinish),
			t(e.OpenDragonPool, LevelEventOpenDragonPool_1.LevelEventOpenDragonPool),
			t(e.OpenInstance, LevelEventOpenInstance_1.LevelEventOpenInstance),
			t(
				e.UnlockInstanceEntrance,
				LevelEventUnlockInstanceEntrance_1.LevelEventUnlockInstanceEntrance,
			),
			t(
				e.UpdateInstacneEntranceStatus,
				LevelEventUpdateInstanceEntranceUnlockStatus_1.LevelEventUpdateInstanceEntranceUnlockStatus,
			),
			t(
				e.OpenInstanceEntrance,
				LevelEventOpenInstanceEntrance_1.LevelEventOpenInstanceEntrance,
			),
			t(e.AudioEvent, LevelEventAudioEvent_1.LevelEventAudioEvent),
			t(
				e.SetTimeSlowDown,
				LevelEventSetTimeSlowDown_1.LevelEventSetTimeSlowDown,
			),
			t(e.WaitTime, LevelEventWaitTime_1.LevelEventWaitTime, 8),
			t(
				e.WaitFlyControl,
				LevelEventWaitFlyControl_1.LevelEventWaitFlyControl,
				4,
			),
			t(e.TriggerExit, LevelEventTriggerExit_1.LevelEventTriggerExit, 4),
			t(e.CheckFlyState, LevelEventCheckFlyState_1.LevelEventCheckFlyState),
			t(
				e.AddBuffToCreature,
				LevelEventAddBuffToCreature_1.LevelEventAddBuffToCreature,
			),
			t(
				e.RemoveBuffFromCreature,
				LevelEventRemoveBuffFromCreature_1.LevelEventRemoveBuffFromCreature,
			),
			t(e.AdjustTodTime, LevelEventAdjustTodTime_1.LevelEventAdjustTodTime, 4),
			t(e.OpenUI, LevelEventOpenUI_1.LevelEventOpenUi),
			t(
				e.CaptureRequest,
				LevelEventCaptureRequest_1.LevelEventCaptureRequest,
				8,
			),
			t(e.Execution, LevelEventExecution_1.LevelEventExecution, 8),
			t(e.CameraShake, LevelEventCameraShake_1.LevelEventCameraShake, 4),
			t(e.ShowDialog, LevelEventShowDialog_1.LevelEventShowDialog),
			t(e.ChangePatrol, LevelEventChangePatrol_1.LevelEventChangePatrol),
			t(
				e.PlayWuYinSequence,
				LevelEventPlayWuYinAreaSequence_1.LevelEventPlayWuYinAreaSequence,
			),
			t(
				e.TreasurBoxIdleFlow,
				LevelEventTreasurBoxIdleFlow_1.LevelEventTreasurBoxIdleFlow,
			),
			t(e.OpenHelp, LevelEventOpenHelp_1.LevelEventOpenHelp),
			t(e.PlayerLoockAt, LevelEventPlayerLoockAt_1.LevelEventPlayerLoockAt),
			t(
				e.SetBlackBoardValue,
				LevelEventSetBlackBoardValue_1.LevelEventSetBlackBoardValue,
			),
			t(e.ControlTodTime, LevelEventControlTodTime_1.LevelEventControlTodTime),
			t(e.PlayMovie, LevelEventPlayMovie_1.LevelEventPlayMovie),
			t(
				e.ForceLockOnSpecialTagTarget,
				LevelEventForceLockOnSpecialTagTarget_1.LevelEventForceLockOnSpecialTagTarget,
			),
			t(e.DisableMapView, LevelEventEnableMapView_1.LevelEventDisableMapView),
			t("PlayerLookAt", LevelEventPlayerLoockAt_1.LevelEventPlayerLoockAt),
			t(
				"CameraLookAt",
				LevelEventCameraLookAtPosition_1.LevelEventCameraLookAtPosition,
				4,
			),
			t(
				LevelGameplayActionsDefine_1.ActionCaptureRequest.name,
				LevelEventCaptureRequest_1.LevelEventCaptureRequest,
				8,
			),
			t(
				LevelGameplayActionsDefine_1.ActionExecution.name,
				LevelEventExecution_1.LevelEventExecution,
				8,
			),
			t(
				LevelGameplayActionsDefine_1.ActionSendGameplayEvent.name,
				LevelEventSendGameplayEventToPlayer_1.LevelEventSendGameplayEventToPlayer,
			),
			t(
				LevelGameplayActionsDefine_1.ActionSubmitQuestBehavior.name,
				LevelEventSubmitQuestBehavior_1.LevelEventSubmitQuestBehavior,
			),
			t(
				LevelGameplayActionsDefine_1.ActionDeliverQuestBehavior.name,
				LevelEventDeliverQuestBehavior_1.LevelEventDeliverQuestBehavior,
			),
			t("Log", LevelEventLog_1.LevelEventLog),
			t("Wait", LevelEventWaitTime_1.LevelEventWaitTime, 8, !0),
			t(
				"LeisureInteract",
				LevelEventLeisureInteract_1.LevelEventLeisureInteract,
				4,
			),
			t("Prompt", LevelEventPrompt_1.LevelEventPrompt),
			t("GuideTrigger", LevelEventGuideTrigger_1.LevelEventGuideTrigger, 8, !0),
			t("CompleteGuide", LevelEventCompleteGuide_1.LevelEventCompleteGuide, 4),
			t("OpenSystemBoard", LevelEventOpenSystem_1.LevelEventOpenSystem, 4),
			t(
				"AddBuffToEntity",
				LevelEventAddBuffToEntity_1.LevelEventAddBuffToEntity,
				4,
			),
			t(
				"RemoveBuffFromEntity",
				LevelEventRemoveBuffFromCreature_1.LevelEventRemoveBuffFromCreature,
				4,
			),
			t(
				"SetForceLock",
				LevelEventForceLockOnSpecialTagTarget_1.LevelEventForceLockOnSpecialTagTarget,
			),
			t(
				"SetWuYinQuState",
				LevelEventSetWuYinQuState_1.LevelEventSetWuYinQuState,
			),
			t(
				"SetPlayerMoveControl",
				LevelEventSetPlayerMoveControl_1.LevelEventSetPlayerMoveControl,
			),
			t("PlayEffect", LevelEventSpawnEffect_1.LevelEventSpawnEffect),
			t(
				"ClaimLevelPlayReward",
				LevelEventClaimLevelPlayReward_1.LevelEventClaimLevelPlayReward,
			),
			t(
				"PromptQuestChapterUI",
				LevelEventOpenChapterUi_1.LevelEventOpenChapterUi,
			),
			t(
				"InterludeActions",
				LevelEventInterludeActions_1.LevelEventInterludeActions,
				4,
			),
			t(
				"AddBuffToTriggeredEntity",
				LevelEventAddBuffToTriggeredEntity_1.LevelEventAddBuffToTriggeredEntity,
			),
			t("SetTime", LevelEventAdjustTodTime_1.LevelEventAdjustTodTime, 4),
			t(
				"SetBattleState",
				LevelEventSetBattleState_1.LevelEventSetBattleState,
				4,
			),
			t(
				"WaitBattleCondition",
				LevelEventCheckBattleState_1.LevelEventCheckBattleState,
				8,
			),
			t(
				"EnableHostility",
				LevelEventEnableHostility_1.LevelEventEnableHostility,
				8,
			),
			t("RunActions", LevelEventRunAction_1.LevelEventRunAction, 4),
			t("EntityLookAt", LevelEventEntityLookAt_1.LevelEventEntityLookAt, 4),
			t("CommonTip", LevelEventPrompt_1.LevelEventPrompt),
			t(
				"ClaimDungeonReward",
				LevelEventClaimDungeonReward_1.LevelEventClaimDungeonReward,
			),
			t("TraceSpline", LevelEventSpawnTraceEffect_1.LevelEventSpawnTraceEffect),
			t(
				"ToggleScanSplineEffect",
				LevelEventsToggleScanSplineEffect_1.LevelEventToggleScanSplineEffect,
			),
			t("PostAkEvent", LevelEventPostAkEvent_1.LevelEventPostAkEvent),
			t("MoveSceneItem", LevelEventSceneItemMove_1.LevelEventSceneItemMove, 4),
			t(
				"StopSceneItemMove",
				LevelEventStopSceneItemMove_1.LevelEventStopSceneItemMove,
			),
			t("SendAiEvent", LevelEventSendAiEvent_1.LevelEventSendAiEvent),
			t(
				"UnlockDungeonEntry",
				LevelEventUnlockDungeonEntry_1.LevelEventUnlockDungeonEntry,
			),
			t(
				"UnlockSystemItem",
				LevelEventUnlockSystemItem_1.LevelEventUnlockSystemItem,
			),
			t(
				"TeleportDungeon",
				LevelEventTeleportDungeon_1.LevelEventTeleportDungeon,
				1,
			),
			t("LimitPlayerOperation", LevelEventAddInputTag_1.LevelEventAddInputTag),
			t(
				"UnLimitPlayerOperation",
				LevelEventRefreshInputTag_1.LevelEventRefreshInputTag,
			),
			t("FadeInScreen", LevelEventFadeInScreen_1.LevelEventFadeInScreen, 4),
			t("FadeOutScreen", LevelEventFadeOutScreen_1.LevelEventFadeOutScreen, 4),
			t("ChangePhantom", LevelEventChangeToVision_1.LevelEventChangeToVision),
			t(
				"RestorePhantom",
				LevelEventRestoreFromVision_1.LevelEventRestoreFromVision,
			),
			t("TakePlotPhoto", LevelEventShowPlotPhoto_1.LevelEventShowPlotPhoto, 1),
			t(
				"OpenSimpleGameplay",
				LevelEventOpenSimpleGameplay_1.LevelEventOpenSimpleGameplay,
			),
			t(
				"SwitchSubLevels",
				LevelEventSwitchSubLevels_1.LevelEventSwitchLevels,
				4,
			),
			t(
				"AdjustPlayerCamera",
				LevelEventAdjustPlayerCamera_1.LevelEventAdjustPlayerCamera,
			),
			t(
				"RestorePlayerCameraAdjustment",
				LevelEventRestorePlayerCameraAdjustment_1.LevelEventRestorePlayerCameraAdjustment,
			),
			t(
				"UsePhantomSkill",
				LevelEventUsePhantomSkill_1.LevelEventUsePhantomSkill,
			),
			t(
				"TeleportToLatestResetPoint",
				LevelEventTeleportToResetPoint_1.LevelEventTeleportToResetPoint,
				4,
			),
			t(
				"EnterOrbitalCamera",
				LevelEventEnterOrbitalCamera_1.LevelEventEnterOrbitalCamera,
			),
			t(
				"ExitOrbitalCamera",
				LevelEventExitOrbitalCamera_1.LevelEventExitOrbitalCamera,
			),
			t(
				"EnableSplineMoveModel",
				LevelEventEnableSplineMoveModel_1.LevelEventEnableSplineMoveModel,
			),
			t("SetSportsState", LevelEventSportsState_1.LevelEventSportsState),
			t("EnableActor", LevelEventSetActorVisible_1.LevelEventSetActorVisible),
			t(
				"PlayLevelSequence",
				LevelEventPlayLevelSequence_1.LevelEventPlayLevelSequence,
			),
			t(
				"ModifyActorMaterial",
				LevelEventModifyActorMaterial_1.LevelEventModifyActorMaterial,
			),
			t("EnableAI", LevelEventEnableAi_1.LevelEventEnableAi),
			t(
				"SetExploreState",
				LevelEventSetExploreState_1.LevelEventSetExploreState,
			),
			t("ToggleAirWall", LevelEventToggleAirWall_1.LevelEventToggleAirWall),
			t(
				"TriggerCameraShake",
				LevelEventTriggerCameraShake_1.LevelEventTriggerCameraShake,
			),
			t(
				"HideTargetRange",
				LevelEventHideTargetRange_1.LevelEventHideTargetRange,
				4,
			),
			t(
				"ShowTargetRange",
				LevelEventShowTargetRange_1.LevelEventShowTargetRange,
				4,
			),
			t("ExitDungeon", LevelEventExitDungeon_1.LevelEventExitDungeon, 4),
			t(
				"ToggleMapMarkState",
				LevelEventToggleMapMarkState_1.LevelEventToggleMapMarkState,
				4,
			),
			t(
				"SettlementDungeon",
				LevelEventSettlementDungeon_1.LevelEventSettlementDungeon,
				4,
			),
			t(
				"AddTrialCharacter",
				LevelEventAddTrialCharacter_1.LevelEventAddTrialCharacter,
				4,
			),
			t(
				"SetPlayerOperationRestriction",
				LevelEventSetPlayerOperation_1.LevelEventSetPlayerOperation,
			),
			t(
				"ChangePhantomFormation",
				LevelEventChangePhantomFormation_1.LevelEventChangePhantomFormation,
				4,
			),
			t(
				"RestorePhantomFormation",
				LevelEventRestorePhantomFormation_1.LevelEventRestorePhantomFormation,
				4,
			),
			t(
				"ChangeEntityPrefabPerformance",
				LevelEventChangeEntityPerformanceState_1.LevelEventChangeEntityPerformanceState,
			),
			t("SetJigsawItem", LevelEventMoveJigsawItem_1.LevelEventMoveJigsawItem),
			t(
				"PlayRegisteredMontage",
				LevelEventPlayRegisteredMontage_1.LevelEventPlayRegisteredMontage,
				8,
				!0,
			),
			t(
				"ToggleHighlightExploreUi",
				LevelEventHighlightExploreUi_1.LevelEventHighlightExploreUi,
			),
			t(
				"SetRegionConfig",
				LevelEventSetRegionConfig_1.LevelEventSetRegionConfig,
				4,
				!0,
			),
			t("Collect", LevelEventCollect_1.LevelEventCollect),
			t(
				"PlayDynamicSettlement",
				LevelEventPlayDynamicSettlement_1.LevelEventPlayDynamicSettlement,
				4,
			),
			t(
				"SetInteractionLockState",
				LevelEventSetInteractionLockState_1.LevelEventSetInteractionLockState,
			),
			t(
				LevelGameplayActionsDefine_1.ActionSetNpcPosition.name,
				LevelEventSetNpcPosition_1.LevelEventSetNpcPosition,
			),
			t(
				LevelGameplayActionsDefine_1.ActionPlotInterludeAction.name,
				LevelEventPlotInterludeAction_1.LevelEventPlotInterludeAction,
				4,
			),
			t(
				LevelGameplayActionsDefine_1.ActionSetSeqCameraTransform.name,
				LevelEventSetupSeqCamera_1.LevelEventSetupSeqCamera,
			),
			t(
				LevelGameplayActionsDefine_1.ActionEnterSequenceCamera.name,
				LevelEventEnterSequenceCamera_1.LevelEventEnterSequenceCamera,
			),
			t(
				LevelGameplayActionsDefine_1.ActionPickupDropItem.name,
				LevelEventPickupDropItem_1.LevelEventPickupDropItem,
				4,
				!0,
			),
			t(
				LevelGameplayActionsDefine_1.ActionTimeTrackControl.name,
				LevelEventTimeTrackControl_1.LevelEventTimeTrackControl,
				4,
			),
			t(
				LevelGameplayActionsDefine_1.ActionInteractFan.name,
				LevelEventInteractFan_1.LevelEventInteractFan,
			),
			t("PlayMontage", LevelEventPlayMontage_1.LevelEventPlayMontage, 4),
			t("PlayBubble", LevelEventPlayBubble_1.LevelEventPlayBubble, 8),
			t(
				"MoveWithSpline",
				LevelEventMoveWithSpline_1.LevelEventMoveWithSpline,
				4,
			),
			t(
				"CharacterMoveToPoint",
				LevelEventCharacterMove_1.LevelEventCharacterMove,
				4,
			);
	}
	static GetEvent(e) {
		var t = this.HLe.get(e);
		if (t) {
			if (0 < t.length)
				return this.jLe.has(e) ? ((n = t.pop()).Reset(), n) : t[0];
			if (this.WLe.has(e)) {
				var n,
					v = this.WLe.get(e);
				for (let n = 0; n < 4; n++) {
					var l = new v(n);
					(l.Type = e), t.push(l);
				}
				return (
					GlobalData_1.GlobalData.IsPlayInEditor &&
						((n = this.KLe.get(e) + 4), this.KLe.set(e, n), n > 1024) &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							7,
							"动态扩容超上限，请检查",
							["Type", e],
							["Capacity", n],
						),
					t.pop()
				);
			}
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Level", 7, "事件组容量不足，建议扩容，请检查！！！", [
					"Type",
					e,
				]);
		}
	}
	static XLe(e) {
		var t;
		this.jLe.has(e.Type) &&
			(t = this.HLe.get(e.Type)) &&
			!t.includes(e) &&
			t.push(e);
	}
	static AddToTickList(e, t) {
		var n = t.GroupId;
		if (e) {
			let e = this.FLe.get(n);
			e || ((e = new Array()), this.FLe.set(n, e)), e.includes(t) || e.push(t);
		} else this.VLe.includes(t) || this.VLe.push(t);
	}
	static RemoveEventGroup(e) {
		if ((e = this.FLe.get(e))) for (const t of e) t.Release();
	}
	static Tick(e) {
		if (void 0 !== this.VLe && void 0 !== this.FLe) {
			for (; 0 < this.VLe.length; ) {
				var t,
					n = this.VLe.pop(),
					v = this.FLe.get(n.GroupId);
				v &&
					(-1 !== (t = v.indexOf(n)) && v.splice(t, 1), 0 === v.length) &&
					this.FLe.delete(n.GroupId),
					n.Reset(),
					this.XLe(n);
			}
			for (const t of this.FLe.values()) {
				var l = t.length;
				for (let n = 0; n < l; n++) {
					var r = t[n];
					r.Tick(e) && r.Finish();
				}
			}
		}
	}
	static IsNeedTick(e) {
		return this.jLe.has(e);
	}
	static HasAction(e) {
		return this.HLe.has(e);
	}
}
(exports.LevelEventCenter = LevelEventCenter).QLe = (e, t, n = 1, v = !1) => {
	if (!LevelEventCenter.HLe.has(e)) {
		let a;
		if (v) {
			a = new Array();
			for (let v = 0; v < n; v++) {
				var l = new t(v);
				(l.Type = e), a.push(l);
			}
		} else {
			a = new Array(n);
			for (let v = 0; v < n; v++) {
				var r = new t(v);
				(r.Type = e), (a[v] = r);
			}
		}
		LevelEventCenter.HLe.set(e, a),
			1 < n &&
				(LevelEventCenter.jLe.add(e), LevelEventCenter.KLe.set(e, n), v) &&
				LevelEventCenter.WLe.set(e, t);
	}
};

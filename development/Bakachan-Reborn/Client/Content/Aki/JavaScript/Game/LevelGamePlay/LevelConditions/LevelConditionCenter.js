"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCenter = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	LevelGeneralDefine_1 = require("../LevelGeneralDefine"),
	LevelCodeConditionCheckGroup_1 = require("./LevelCodeConditionCheckGroup"),
	LevelCondictionCheckExploreLevel_1 = require("./LevelCondictionCheckExploreLevel"),
	LevelConditionAccountSettingOpen_1 = require("./LevelConditionAccountSettingOpen"),
	LevelConditionAnyPhantomCouldUpdate_1 = require("./LevelConditionAnyPhantomCouldUpdate"),
	LevelConditionAnyRoleFullPhantom_1 = require("./LevelConditionAnyRoleFullPhantom"),
	LevelConditionCheckActivityOpen_1 = require("./LevelConditionCheckActivityOpen"),
	LevelConditionCheckAiState_1 = require("./LevelConditionCheckAiState"),
	LevelConditionCheckBattleRole_1 = require("./LevelConditionCheckBattleRole"),
	LevelConditionCheckBattleRoleIsNot_1 = require("./LevelConditionCheckBattleRoleIsNot"),
	LevelConditionCheckBattleRoleWeaponType_1 = require("./LevelConditionCheckBattleRoleWeaponType"),
	LevelConditionCheckBuff_1 = require("./LevelConditionCheckBuff"),
	LevelConditionCheckCalabashLevel_1 = require("./LevelConditionCheckCalabashLevel"),
	LevelConditionCheckCharacterTag_1 = require("./LevelConditionCheckCharacterTag"),
	LevelConditionCheckCharacterTagByEvent_1 = require("./LevelConditionCheckCharacterTagByEvent"),
	LevelConditionCheckClientUseSkill_1 = require("./LevelConditionCheckClientUseSkill"),
	LevelConditionCheckClientUseVisionSkill_1 = require("./LevelConditionCheckClientUseVisionSkill"),
	LevelConditionCheckComboTeachingState_1 = require("./LevelConditionCheckComboTeachingState"),
	LevelConditionCheckCurrentCharacter_1 = require("./LevelConditionCheckCurrentCharacter"),
	LevelConditionCheckCurWorldLevel_1 = require("./LevelConditionCheckCurWorldLevel"),
	LevelConditionCheckCurWorldLevelOp_1 = require("./LevelConditionCheckCurWorldLevelOp"),
	LevelConditionCheckDirection_1 = require("./LevelConditionCheckDirection"),
	LevelConditionCheckDis_1 = require("./LevelConditionCheckDis"),
	LevelConditionCheckDungeon_1 = require("./LevelConditionCheckDungeon"),
	LevelConditionCheckDungeonFinished_1 = require("./LevelConditionCheckDungeonFinished"),
	LevelConditionCheckDungeonId_1 = require("./LevelConditionCheckDungeonId"),
	LevelConditionCheckEnemyBuff_1 = require("./LevelConditionCheckEnemyBuff"),
	LevelConditionCheckEnemyTag_1 = require("./LevelConditionCheckEnemyTag"),
	LevelConditionCheckEntityCommonTag_1 = require("./LevelConditionCheckEntityCommonTag"),
	LevelConditionCheckEntityCommonTagByself_1 = require("./LevelConditionCheckEntityCommonTagByself"),
	LevelConditionCheckEntityConfigId_1 = require("./LevelConditionCheckEntityConfigId"),
	LevelConditionCheckEntityLocked_1 = require("./LevelConditionCheckEntityLocked"),
	LevelConditionCheckEquippedPhantom_1 = require("./LevelConditionCheckEquippedPhantom"),
	LevelConditionCheckExploreSkill_1 = require("./LevelConditionCheckExploreSkill"),
	LevelConditionCheckFanIsNotRotating_1 = require("./LevelConditionCheckFanIsNotRotating"),
	LevelConditionCheckFightEnergyBall_1 = require("./LevelConditionCheckFightEnergyBall"),
	LevelConditionCheckFightEnergyBar_1 = require("./LevelConditionCheckFightEnergyBar"),
	LevelConditionCheckFormationAnyRoleDead_1 = require("./LevelConditionCheckFormationAnyRoleDead"),
	LevelConditionCheckGuideStatus_1 = require("./LevelConditionCheckGuideStatus"),
	LevelConditionCheckHasFirstPhantomAtPosition_1 = require("./LevelConditionCheckHasFirstPhantomAtPosition"),
	LevelConditionCheckHasUnlockAffixInBossRush_1 = require("./LevelConditionCheckHasUnlockAffixInBossRush"),
	LevelConditionCheckInCombat_1 = require("./LevelConditionCheckInCombat"),
	LevelConditionCheckInputAction_1 = require("./LevelConditionCheckInputAction"),
	LevelConditionCheckInstanceEntranceUnlockStatus_1 = require("./LevelConditionCheckInstanceEntranceUnlockStatus"),
	LevelConditionCheckInstanceState_1 = require("./LevelConditionCheckInstanceState"),
	LevelConditionCheckInTodTimeSpan_1 = require("./LevelConditionCheckInTodTimeSpan"),
	LevelConditionCheckIsMulti_1 = require("./LevelConditionCheckIsMulti"),
	LevelConditionCheckLevel_1 = require("./LevelConditionCheckLevel"),
	LevelConditionCheckLevelOp_1 = require("./LevelConditionCheckLevelOp"),
	LevelConditionCheckLevelPlayRewardState_1 = require("./LevelConditionCheckLevelPlayRewardState"),
	LevelConditionCheckLevelPlayState_1 = require("./LevelConditionCheckLevelPlayState"),
	LevelConditionCheckOnTrap_1 = require("./LevelConditionCheckOnTrap"),
	LevelConditionCheckOriginWorldLevel_1 = require("./LevelConditionCheckOriginWorldLevel"),
	LevelConditionCheckPhantom_1 = require("./LevelConditionCheckPhantom"),
	LevelConditionCheckPlayerMotionState_1 = require("./LevelConditionCheckPlayerMotionState"),
	LevelConditionCheckPlayerStateRestriction_1 = require("./LevelConditionCheckPlayerStateRestriction"),
	LevelConditionCheckPositionRolePhantomSkillEquip_1 = require("./LevelConditionCheckPositionRolePhantomSkillEquip"),
	LevelConditionCheckRangeByPbDataId_1 = require("./LevelConditionCheckRangeByPbDataId"),
	LevelConditionCheckRangeSphere_1 = require("./LevelConditionCheckRangeSphere"),
	LevelConditionCheckRogueAbilitySelect_1 = require("./LevelConditionCheckRogueAbilitySelect"),
	LevelConditionCheckRogueCanUnlockSkill_1 = require("./LevelConditionCheckRogueCanUnlockSkill"),
	LevelConditionCheckRogueTerm_1 = require("./LevelConditionCheckRogueTerm"),
	LevelConditionCheckRoleLevel_1 = require("./LevelConditionCheckRoleLevel"),
	LevelConditionCheckRoleSkillTargetLevel_1 = require("./LevelConditionCheckRoleSkillTargetLevel"),
	LevelConditionCheckRoleTargetLevel_1 = require("./LevelConditionCheckRoleTargetLevel"),
	LevelConditionCheckSkillPoint_1 = require("./LevelConditionCheckSkillPoint"),
	LevelConditionCheckSystemFunction_1 = require("./LevelConditionCheckSystemFunction"),
	LevelConditionCheckTargetAttribute_1 = require("./LevelConditionCheckTargetAttribute"),
	LevelConditionCheckTeamRoleCouldLevelUp_1 = require("./LevelConditionCheckTeamRoleCouldLevelUp"),
	LevelConditionCheckTeamWeaponCouldLevelUp_1 = require("./LevelConditionCheckTeamWeaponCouldLevelUp"),
	LevelConditionCheckTeleportStatus_1 = require("./LevelConditionCheckTeleportStatus"),
	LevelConditionCheckTeleportTypeUnlock_1 = require("./LevelConditionCheckTeleportTypeUnlock"),
	LevelConditionCheckTodTimePeriod_1 = require("./LevelConditionCheckTodTimePeriod"),
	LevelConditionCheckTypeItemPickUp_1 = require("./LevelConditionCheckTypeItemPickUp"),
	LevelConditionCheckUIOpen_1 = require("./LevelConditionCheckUIOpen"),
	LevelConditionCheckUIState_1 = require("./LevelConditionCheckUIState"),
	LevelConditionCheckWeaponCount_1 = require("./LevelConditionCheckWeaponCount"),
	LevelConditionCheckWeather_1 = require("./LevelConditionCheckWeather"),
	LevelConditionCheckWorldMapSecondaryUiOpened_1 = require("./LevelConditionCheckWorldMapSecondaryUiOpened"),
	LevelConditionCompareEntityGroupState_1 = require("./LevelConditionCompareEntityGroupState"),
	LevelConditionCompareTeammateDie_1 = require("./LevelConditionCompareTeammateDie"),
	LevelConditionCompareVar_1 = require("./LevelConditionCompareVar"),
	LevelConditionDistanceLess_1 = require("./LevelConditionDistanceLess"),
	LevelConditionDragonPoolState_1 = require("./LevelConditionDragonPoolState"),
	LevelConditionEntityState_1 = require("./LevelConditionEntityState"),
	LevelConditionFinishGuideStepByEvent_1 = require("./LevelConditionFinishGuideStepByEvent"),
	LevelConditionHasBuff_1 = require("./LevelConditionHasBuff"),
	LevelConditionInvokeCheckedByEvent_1 = require("./LevelConditionInvokeCheckedByEvent"),
	LevelConditionIsPlayer_1 = require("./LevelConditionIsPlayer"),
	LevelConditionItemCheck_1 = require("./LevelConditionItemCheck"),
	LevelConditionItemCountByType_1 = require("./LevelConditionItemCountByType"),
	LevelConditionLiftLocation_1 = require("./LevelConditionLiftLocation"),
	LevelConditionMoveStateCheck_1 = require("./LevelConditionMoveStateCheck"),
	LevelConditionOnCostInsufficient_1 = require("./LevelConditionOnCostInsufficient"),
	LevelConditionOnPlayerRevive_1 = require("./LevelConditionOnPlayerRevive"),
	LevelConditionOnPlayerUseSkill_1 = require("./LevelConditionOnPlayerUseSkill"),
	LevelConditionOnTakingPhoto_1 = require("./LevelConditionOnTakingPhoto"),
	LevelConditionOnTreasureBoxOpen_1 = require("./LevelConditionOnTreasureBoxOpen"),
	LevelConditionOnViewClose_1 = require("./LevelConditionOnViewClose"),
	LevelConditionQuestState_1 = require("./LevelConditionQuestState"),
	LevelConditionQuestStepState_1 = require("./LevelConditionQuestStepState"),
	LevelConditionRoleBreach_1 = require("./LevelConditionRoleBreach"),
	LevelConditionRoleLevel_1 = require("./LevelConditionRoleLevel"),
	LevelConditionRolePhantomNum_1 = require("./LevelConditionRolePhantomNum"),
	LevelConditionRouletteEquipItemId_1 = require("./LevelConditionRouletteEquipItemId"),
	LevelConditionsCheckJigsawInfo_1 = require("./LevelConditionsCheckJigsawInfo"),
	LevelConditionSelfGameplayTagCheck_1 = require("./LevelConditionSelfGameplayTagCheck"),
	LevelConditionSelfState_1 = require("./LevelConditionSelfState"),
	LevelConditionSelfTagCheck_1 = require("./LevelConditionSelfTagCheck"),
	LevelConditionStartShootTarget_1 = require("./LevelConditionStartShootTarget"),
	LevelConditionTargetTagCheck_1 = require("./LevelConditionTargetTagCheck"),
	LevelConditionTeamCouldEquipPhantom_1 = require("./LevelConditionTeamCouldEquipPhantom"),
	LevelConditionTeamRoleLevel_1 = require("./LevelConditionTeamRoleLevel"),
	LevelConditionTeamWeaponLevel_1 = require("./LevelConditionTeamWeaponLevel"),
	LevelConditionVisionIntensifyTabOpen_1 = require("./LevelConditionVisionIntensifyTabOpen"),
	E_LGC = LevelGeneralDefine_1.ELevelGeneralCondition;
class LevelConditionCenter {
	static RegistConditions() {
		this.$Te(
			E_LGC.DistanceLess,
			LevelConditionDistanceLess_1.LevelConditionDistanceLess,
		),
			this.$Te(
				E_LGC.SelfTagCheck,
				LevelConditionSelfTagCheck_1.LevelConditionSelfTagCheck,
			),
			this.$Te(
				E_LGC.ItemCheck,
				LevelConditionItemCheck_1.LevelConditionItemCheck,
			),
			this.$Te(E_LGC.CheckDis, LevelConditionCheckDis_1.LevelConditionCheckDis),
			this.$Te(
				E_LGC.TargetTagCheck,
				LevelConditionTargetTagCheck_1.LevelConditionTargetTagCheck,
			),
			this.$Te(
				E_LGC.CheckOnTrap,
				LevelConditionCheckOnTrap_1.LevelConditionCheckOnTrap,
			),
			this.$Te(
				E_LGC.CheckDirection,
				LevelConditionCheckDirection_1.LevelConditionCheckDirection,
			),
			this.$Te(
				E_LGC.QuestState,
				LevelConditionQuestState_1.LevelConditionQuestState,
			),
			this.$Te(
				E_LGC.CheckLevel,
				LevelConditionCheckLevel_1.LevelConditionCheckLevel,
				[EventDefine_1.EEventName.OnPlayerLevelChanged],
			),
			this.$Te(
				E_LGC.CheckLevelOp,
				LevelConditionCheckLevelOp_1.LevelConditionCheckLevelOp,
				[EventDefine_1.EEventName.OnPlayerLevelChanged],
			),
			this.$Te(
				E_LGC.CheckGuideStatus,
				LevelConditionCheckGuideStatus_1.LevelConditionCheckGuideStatus,
			),
			this.$Te(
				E_LGC.CheckCharacterTagNotByEvent,
				LevelConditionCheckCharacterTag_1.LevelConditionCheckCharacterTag,
			),
			this.$Te(
				E_LGC.CheckCharacterTag,
				LevelConditionCheckCharacterTag_1.LevelConditionCheckCharacterTag,
				[EventDefine_1.EEventName.OnSkillTagChanged],
			),
			this.$Te(
				E_LGC.CheckCharacterTagByEvent,
				LevelConditionCheckCharacterTagByEvent_1.LevelConditionCheckCharacterTagByEvent,
				[EventDefine_1.EEventName.OnGlobalGameplayTagChanged],
			),
			this.$Te(
				E_LGC.DragonPoolState,
				LevelConditionDragonPoolState_1.LevelConditionDragonPoolState,
			),
			this.$Te(
				E_LGC.CheckTeleportStatus,
				LevelConditionCheckTeleportStatus_1.LevelConditionCheckTeleportStatus,
			),
			this.$Te(
				E_LGC.RoleLevel,
				LevelConditionRoleLevel_1.LevelConditionRoleLevel,
				[EventDefine_1.EEventName.RoleLevelUp],
			),
			this.$Te(
				E_LGC.CheckRoleLevel,
				LevelConditionCheckRoleLevel_1.LevelConditionCheckRoleLevel,
				[EventDefine_1.EEventName.RoleLevelUp],
			),
			this.$Te(
				E_LGC.RoleBreach,
				LevelConditionRoleBreach_1.LevelConditionRoleBreach,
			),
			this.$Te(
				E_LGC.SelfGameplayTagCheck,
				LevelConditionSelfGameplayTagCheck_1.LevelConditionSelfGameplayTagCheck,
			),
			this.$Te(
				E_LGC.CheckInTodTimeSpan,
				LevelConditionCheckInTodTimeSpan_1.LevelConditionCheckInTodTimeSpan,
			),
			this.$Te(
				E_LGC.CheckSceneItemTag,
				LevelConditionCheckEntityCommonTag_1.LevelConditionCheckEntityCommonTag,
			),
			this.$Te(E_LGC.IsPlayer, LevelConditionIsPlayer_1.LevelConditionIsPlayer),
			this.$Te(
				E_LGC.CheckEntityConfigId,
				LevelConditionCheckEntityConfigId_1.LevelConditionCheckEntityConfigId,
			),
			this.$Te(
				E_LGC.CheckOriginWorldLevel,
				LevelConditionCheckOriginWorldLevel_1.LevelConditionCheckOriginWorldLevel,
			),
			this.$Te(
				E_LGC.StartShootTarget,
				LevelConditionStartShootTarget_1.LevelConditionStartShootTarget,
			),
			this.$Te(
				E_LGC.CheckCurWorldLevel,
				LevelConditionCheckCurWorldLevel_1.LevelConditionCheckCurWorldLevel,
			),
			this.$Te(
				E_LGC.CheckCurWorldLevelOp,
				LevelConditionCheckCurWorldLevelOp_1.LevelConditionCheckCurWorldLevelOp,
			),
			this.$Te(
				E_LGC.CheckInstanceState,
				LevelConditionCheckInstanceState_1.LevelConditionCheckInstanceState,
			),
			this.$Te(
				E_LGC.MoveStateCheck,
				LevelConditionMoveStateCheck_1.LevelConditionMoveStateCheck,
			),
			this.$Te(
				E_LGC.CheckBuff,
				LevelConditionCheckBuff_1.LevelConditionCheckBuff,
			),
			this.$Te(
				E_LGC.CheckEquippedPhantom,
				LevelConditionCheckEquippedPhantom_1.LevelConditionCheckEquippedPhantom,
				[EventDefine_1.EEventName.PhantomEquip],
			),
			this.$Te(
				E_LGC.CheckEnemyBuff,
				LevelConditionCheckEnemyBuff_1.LevelConditionCheckEnemyBuff,
				[EventDefine_1.EEventName.OnAggroAdd],
			),
			this.$Te(
				E_LGC.CheckEnemyTag,
				LevelConditionCheckEnemyTag_1.LevelConditionCheckEnemyTag,
				[EventDefine_1.EEventName.OnAggroAdd],
			),
			this.$Te(
				E_LGC.CheckSkillPoint,
				LevelConditionCheckSkillPoint_1.LevelConditionCheckSkillPoint,
				[EventDefine_1.EEventName.RefreshSkillTreeLeftSkillPoint],
			),
			this.$Te(
				E_LGC.CheckExploreSkill,
				LevelConditionCheckExploreSkill_1.LevelConditionCheckExploreSkill,
				[EventDefine_1.EEventName.OnChangeSelectedExploreId],
			),
			this.$Te(
				E_LGC.CheckFightEnergyBar,
				LevelConditionCheckFightEnergyBar_1.LevelConditionCheckFightEnergyBar,
				[EventDefine_1.EEventName.CharOnEnergyChanged],
			),
			this.$Te(
				E_LGC.CheckFightEnergyBall,
				LevelConditionCheckFightEnergyBall_1.LevelConditionCheckFightEnergyBall,
				[EventDefine_1.EEventName.CharOnElementEnergyChanged],
			),
			this.$Te(
				E_LGC.CheckClientQuest,
				LevelConditionQuestStepState_1.LevelConditionQuestStepState,
				[
					EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
					EventDefine_1.EEventName.OnQuestStateChange,
				],
			),
			this.$Te(
				E_LGC.CheckClientUseSkill,
				LevelConditionCheckClientUseSkill_1.LevelConditionCheckClientUseSkill,
			),
			this.$Te(
				E_LGC.CheckUIState,
				LevelConditionCheckUIState_1.LevelConditionCheckUIState,
			),
			this.$Te(
				E_LGC.CheckUIOpen,
				LevelConditionCheckUIOpen_1.LevelConditionCheckUIOpen,
				[EventDefine_1.EEventName.OpenView],
			),
			this.$Te(
				E_LGC.CheckInputAction,
				LevelConditionCheckInputAction_1.LevelConditionCheckInputAction,
				[EventDefine_1.EEventName.OnInputChangeForCond],
			),
			this.$Te(
				E_LGC.CheckBattleRole,
				LevelConditionCheckBattleRole_1.LevelConditionCheckBattleRole,
			),
			this.$Te(
				E_LGC.CheckClientUseVisionSkill,
				LevelConditionCheckClientUseVisionSkill_1.LevelConditionCheckClientUseVisionSkill,
			),
			this.$Te(
				E_LGC.CheckInstanceEntranceUnlockStatus,
				LevelConditionCheckInstanceEntranceUnlockStatus_1.LevelConditionCheckInstanceEntranceUnlockStatus,
			),
			this.$Te(
				E_LGC.CheckSelfEntityCommonTag,
				LevelConditionCheckEntityCommonTagByself_1.LevelConditionCheckEntityCommonTagBySelf,
			),
			this.$Te(
				E_LGC.FunctionUnlock,
				LevelConditionInvokeCheckedByEvent_1.LevelConditionFunctionUnlock,
				[EventDefine_1.EEventName.OnFunctionOpenUpdate],
			),
			this.$Te(
				E_LGC.GetNewItem,
				LevelConditionInvokeCheckedByEvent_1.LevelConditionGetNewItem,
				[EventDefine_1.EEventName.OnGetNewItem],
			),
			this.$Te(
				E_LGC.HarmonyQte,
				LevelConditionInvokeCheckedByEvent_1.LevelConditionHarmonyQte,
				[EventDefine_1.EEventName.OnElementFusion],
			),
			this.$Te(
				E_LGC.GetWhichRole,
				LevelConditionInvokeCheckedByEvent_1.LevelConditionGetWhichRole,
				[EventDefine_1.EEventName.ActiveRole],
			),
			this.$Te(
				E_LGC.HpLowerThan,
				LevelConditionInvokeCheckedByEvent_1.LevelConditionHpLowerThan,
				[
					EventDefine_1.EEventName.OnServerAttributeChange,
					EventDefine_1.EEventName.CharOnHealthChanged,
				],
			),
			this.$Te(
				E_LGC.SlotOfCurrentRole,
				LevelConditionInvokeCheckedByEvent_1.LevelConditionSlotOfCurrentRole,
			),
			this.$Te(
				E_LGC.FightWithMonster,
				LevelConditionInvokeCheckedByEvent_1.LevelConditionFightWithMonster,
				[EventDefine_1.EEventName.OnAggroAdd],
			),
			this.$Te(
				E_LGC.PawnInRange,
				LevelConditionInvokeCheckedByEvent_1.LevelConditionPawnInRange,
				[EventDefine_1.EEventName.OnGuideRangeEnter],
			),
			this.$Te(
				E_LGC.PhantomTargetLevel,
				LevelConditionCheckPhantom_1.LevelConditionCheckPhantomLevel,
				[EventDefine_1.EEventName.PhantomLevelUp],
			),
			this.$Te(
				E_LGC.PhantomMaxLevel,
				LevelConditionCheckPhantom_1.LevelConditionCheckPhantomMaxLevel,
				[EventDefine_1.EEventName.PhantomLevelUp],
			),
			this.$Te(
				E_LGC.RoleTargetLevel,
				LevelConditionCheckRoleTargetLevel_1.LevelConditionCheckRoleTargetLevel,
				[EventDefine_1.EEventName.PhantomLevelUp],
			),
			this.$Te(
				E_LGC.RoleSkillTargetLevel,
				LevelConditionCheckRoleSkillTargetLevel_1.LevelConditionCheckRoleSkillTargetLevel,
				[EventDefine_1.EEventName.PhantomLevelUp],
			),
			this.$Te(
				E_LGC.BattleRoleIsNot,
				LevelConditionCheckBattleRoleIsNot_1.LevelConditionCheckBattleRoleIsNot,
				[EventDefine_1.EEventName.OnChangeRole],
			),
			this.$Te(
				E_LGC.BattleRoleWeaponType,
				LevelConditionCheckBattleRoleWeaponType_1.LevelConditionCheckBattleRoleWeaponType,
				[EventDefine_1.EEventName.OnChangeRole],
			),
			this.$Te(
				E_LGC.FormationAnyRoleDead,
				LevelConditionCheckFormationAnyRoleDead_1.LevelConditionCheckFormationAnyRoleDead,
				[EventDefine_1.EEventName.CharOnRoleDead],
			),
			this.$Te(
				E_LGC.ComboTeachingState,
				LevelConditionCheckComboTeachingState_1.LevelConditionCheckComboTeachingState,
				[EventDefine_1.EEventName.ComboTeachingCloseGuide],
			),
			this.$Te(
				E_LGC.OnViewClose,
				LevelConditionOnViewClose_1.LevelConditionOnViewClose,
				[EventDefine_1.EEventName.CloseView],
			),
			this.$Te(
				E_LGC.OnPlayerUseSkill,
				LevelConditionOnPlayerUseSkill_1.LevelConditionOnPlayerUseSkill,
				[EventDefine_1.EEventName.CharUseSkill],
			),
			this.$Te(
				E_LGC.FinishGuideStepByEvent,
				LevelConditionFinishGuideStepByEvent_1.LevelConditionOnViewReadyForGuide,
				[EventDefine_1.EEventName.FinishGuideStepByEvent],
			),
			this.$Te(
				E_LGC.PlayerRevive,
				LevelConditionOnPlayerRevive_1.LevelConditionOnPlayerRevive,
				[EventDefine_1.EEventName.PlayerRevive],
			),
			this.$Te(
				E_LGC.CheckTeamRoleCouldLevelUp,
				LevelConditionCheckTeamRoleCouldLevelUp_1.LevelConditionCheckTeamRoleCouldLevelUp,
			),
			this.$Te(
				E_LGC.CheckTeamWeaponCouldLevelUp,
				LevelConditionCheckTeamWeaponCouldLevelUp_1.LevelConditionCheckTeamWeaponCouldLevelUp,
			),
			this.$Te(
				E_LGC.ClientCalabashLevel,
				LevelConditionCheckCalabashLevel_1.LevelConditionCheckCalabashLevel,
				[EventDefine_1.EEventName.CalabashLevelUpdate],
			),
			this.$Te(
				E_LGC.TeamRoleLevel,
				LevelConditionTeamRoleLevel_1.LevelConditionTeamRoleLevel,
				[
					EventDefine_1.EEventName.RoleLevelUp,
					EventDefine_1.EEventName.OnUpdateSceneTeam,
				],
			),
			this.$Te(
				E_LGC.TeamWeaponLevel,
				LevelConditionTeamWeaponLevel_1.LevelConditionTeamWeaponLevel,
				[
					EventDefine_1.EEventName.WeaponLevelUp,
					EventDefine_1.EEventName.OnUpdateSceneTeam,
				],
			),
			this.$Te(
				E_LGC.TeamCouldEquipPhantom,
				LevelConditionTeamCouldEquipPhantom_1.LevelConditionTeamCouldEquipPhantom,
				[
					EventDefine_1.EEventName.PhantomEquip,
					EventDefine_1.EEventName.OnUpdateSceneTeam,
				],
			),
			this.$Te(
				E_LGC.CheckAnyPhantomCouldUpdate,
				LevelConditionAnyPhantomCouldUpdate_1.LevelConditionAnyPhantomCouldUpdate,
				[
					EventDefine_1.EEventName.OnPhantomItemUpdate,
					EventDefine_1.EEventName.OnGetNewItem,
				],
			),
			this.$Te(
				E_LGC.CheckAnyRoleFullPhantom,
				LevelConditionAnyRoleFullPhantom_1.LevelConditionAnyRoleFullPhantom,
				[
					EventDefine_1.EEventName.PhantomEquip,
					EventDefine_1.EEventName.OnUpdateSceneTeam,
				],
			),
			this.$Te(
				E_LGC.CheckRolePhantomNum,
				LevelConditionRolePhantomNum_1.LevelConditionRolePhantomNum,
				[EventDefine_1.EEventName.PhantomEquip],
			),
			this.$Te(
				E_LGC.CheckItemCountByType,
				LevelConditionItemCountByType_1.LevelConditionItemCountByType,
				[
					EventDefine_1.EEventName.OnResponseWeaponAll,
					EventDefine_1.EEventName.OnAddWeaponItemList,
					EventDefine_1.EEventName.OnRemoveWeaponItem,
					EventDefine_1.EEventName.OnEquipPhantomItem,
					EventDefine_1.EEventName.OnAddPhantomItemList,
					EventDefine_1.EEventName.OnRemovePhantomItem,
				],
			),
			this.$Te(
				E_LGC.CheckRouletteEquipItemId,
				LevelConditionRouletteEquipItemId_1.LevelConditionRouletteEquipItemId,
				[EventDefine_1.EEventName.OnRouletteSaveDataChange],
			),
			this.$Te(
				E_LGC.CheckVisionIntensifyTabOpen,
				LevelConditionVisionIntensifyTabOpen_1.LevelConditionVisionIntensifyTabOpen,
				[EventDefine_1.EEventName.VisionIntensifyTabOpen],
			),
			this.$Te(
				E_LGC.CheckAccountSettingOpen,
				LevelConditionAccountSettingOpen_1.LevelConditionAccountSettingOpen,
				[EventDefine_1.EEventName.ChannelReset],
			),
			this.$Te(
				E_LGC.CheckOnTreasureBoxOpen,
				LevelConditionOnTreasureBoxOpen_1.LevelConditionOnTreasureBoxOpen,
				[EventDefine_1.EEventName.OpenTreasureBox],
			),
			this.$Te(
				E_LGC.CheckWeaponCount,
				LevelConditionCheckWeaponCount_1.LevelConditionCheckWeaponCount,
				[
					EventDefine_1.EEventName.OnResponseWeaponAll,
					EventDefine_1.EEventName.OnAddWeaponItemList,
					EventDefine_1.EEventName.OnRemoveWeaponItem,
				],
			),
			this.$Te(
				E_LGC.CheckOnCostInsufficient,
				LevelConditionOnCostInsufficient_1.LevelConditionOnCostInsufficient,
				[EventDefine_1.EEventName.PhantomCostInsufficient],
			),
			this.$Te(
				E_LGC.CheckRangeByPbDataId,
				LevelConditionCheckRangeByPbDataId_1.LevelConditionCheckRangeByPbDataId,
				[EventDefine_1.EEventName.OnGuideRangeEnter],
			),
			this.$Te(
				E_LGC.CheckDungeonId,
				LevelConditionCheckDungeon_1.LevelConditionCheckDungeon,
				[EventDefine_1.EEventName.WorldDone],
			),
			this.$Te(
				E_LGC.CheckRogueTerm,
				LevelConditionCheckRogueTerm_1.LevelConditionCheckRogueTerm,
				[EventDefine_1.EEventName.RogueTermUnlock],
			),
			this.$Te(
				E_LGC.CheckTeleportTypeUnlock,
				LevelConditionCheckTeleportTypeUnlock_1.LevelConditionCheckTeleportTypeUnlock,
				[EventDefine_1.EEventName.UnlockTeleport],
			),
			this.$Te(
				E_LGC.CheckDungeonFinished,
				LevelConditionCheckDungeonFinished_1.LevelConditionCheckDungeonFinished,
				[EventDefine_1.EEventName.WorldDone],
			),
			this.$Te(
				E_LGC.CheckTypeItemPickUp,
				LevelConditionCheckTypeItemPickUp_1.LevelConditionCheckTypeItemPickUp,
				[EventDefine_1.EEventName.OnDropItemSuccess],
			),
			this.$Te(
				E_LGC.CheckRogueCanUnlockSkill,
				LevelConditionCheckRogueCanUnlockSkill_1.LevelConditionCheckRogueCanUnlockSkill,
				[
					EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
					EventDefine_1.EEventName.RoguelikeDataUpdate,
				],
			),
			this.$Te(
				E_LGC.CheckPositionRolePhantomSkillEquip,
				LevelConditionCheckPositionRolePhantomSkillEquip_1.LevelConditionCheckPositionRolePhantomSkillEquip,
				[
					EventDefine_1.EEventName.PhantomEquip,
					EventDefine_1.EEventName.OnUpdateSceneTeam,
				],
			),
			this.$Te(
				E_LGC.CheckHasFirstPhantomAtPosition,
				LevelConditionCheckHasFirstPhantomAtPosition_1.LevelConditionCheckHasFirstPhantomAtPosition,
			),
			this.$Te(
				E_LGC.CheckWorldMapSecondaryUiOpened,
				LevelConditionCheckWorldMapSecondaryUiOpened_1.LevelConditionCheckWorldMapSecondaryUiOpened,
				[EventDefine_1.EEventName.WorldMapSecondaryUiOpened],
			),
			this.$Te(
				E_LGC.CheckHasUnlockAffixInBossRush,
				LevelConditionCheckHasUnlockAffixInBossRush_1.LevelConditionCheckHasUnlockAffixInBossRush,
				[EventDefine_1.EEventName.RequestChangeBossRushView],
			),
			this.$Te(
				E_LGC.CheckActivityOpen,
				LevelConditionCheckActivityOpen_1.LevelConditionCheckActivityOpen,
			),
			this.$Te(
				E_LGC.CheckIsMulti,
				LevelConditionCheckIsMulti_1.LevelConditionCheckIsMulti,
				[
					EventDefine_1.EEventName.OnSetGameModeDataDone,
					EventDefine_1.EEventName.ChangeMode,
				],
			),
			this.$Te(
				E_LGC.OnTakingPhoto,
				LevelConditionOnTakingPhoto_1.LevelConditionOnTakingPhoto,
				[EventDefine_1.EEventName.OnScreenShotDone],
			),
			this.$Te(
				"CheckChildQuestFinished",
				LevelConditionQuestStepState_1.LevelConditionQuestStepState,
			),
			this.$Te(
				"CompareQuestState",
				LevelConditionQuestState_1.LevelConditionQuestState,
			),
			this.$Te(
				"CompareEntityState",
				LevelConditionEntityState_1.LevelConditionEntityState,
			),
			this.$Te(
				"CompareEntitySelfState",
				LevelConditionSelfState_1.LevelConditionSelfState,
			),
			this.$Te(
				"CompareExploreLevel",
				LevelCondictionCheckExploreLevel_1.LevelConditionCheckExploreLevel,
			),
			this.$Te(
				"HourToHour",
				LevelConditionCheckInTodTimeSpan_1.LevelConditionCheckInTodTimeSpan,
			),
			this.$Te(
				"RangeSphere",
				LevelConditionCheckRangeSphere_1.LevelConditionRangeSphere,
			),
			this.$Te(
				"CompareLevelPlayRewardState",
				LevelConditionCheckLevelPlayRewardState_1.LevelConditionCheckLevelPlayRewardState,
			),
			this.$Te("CheckItems", LevelConditionItemCheck_1.LevelConditionItemCheck),
			this.$Te("HasBuff", LevelConditionHasBuff_1.LevelConditionHasBuff),
			this.$Te(
				"CheckSystemFunction",
				LevelConditionCheckSystemFunction_1.LevelConditionCheckSystemFunction,
			),
			this.$Te(
				"CompareLift",
				LevelConditionLiftLocation_1.LevelConditionLiftLocation,
			),
			this.$Te(
				"CompareDungeonId",
				LevelConditionCheckDungeonId_1.LevelConditionCheckDungeonId,
			),
			this.$Te(
				"CheckAiState",
				LevelConditionCheckAiState_1.LevelConditionCheckAiState,
			),
			this.$Te(
				"CheckLevelPlayState",
				LevelConditionCheckLevelPlayState_1.LevelConditionCheckLevelPlayState,
			),
			this.$Te(
				"CompareTimePeriod",
				LevelConditionCheckTodTimePeriod_1.LevelConditionCheckTodTimePeriod,
			),
			this.$Te(
				"CompareWeather",
				LevelConditionCheckWeather_1.LevelConditionCheckWeather,
			),
			this.$Te(
				"CheckCurrentRole",
				LevelConditionCheckCurrentCharacter_1.LevelConditionCheckCurrentCharacter,
			),
			this.$Te(
				"ComparePlayerMotionState",
				LevelConditionCheckPlayerMotionState_1.LevelConditionCheckPlayerMotionState,
			),
			this.$Te(
				"CompareEntityGroupState",
				LevelConditionCompareEntityGroupState_1.LevelConditionCompareEntityGroupState,
			),
			this.$Te(
				"CheckPlayerStateRestriction",
				LevelConditionCheckPlayerStateRestriction_1.LevelConditionCheckPlayerStateRestriction,
			),
			this.$Te(
				"CheckInCombat",
				LevelConditionCheckInCombat_1.LevelConditionCheckInCombat,
			),
			this.$Te(
				"CheckJigsawInfo",
				LevelConditionsCheckJigsawInfo_1.LevelConditionCheckJigsawInfo,
			),
			this.$Te(
				"CheckTargetAttribute",
				LevelConditionCheckTargetAttribute_1.LevelConditionCheckTargetAttribute,
			),
			this.$Te(
				"CheckRogueAbilitySelect",
				LevelConditionCheckRogueAbilitySelect_1.LevelConditionCheckRogueAbilitySelect,
			),
			this.$Te(
				"CompareTeammateDie",
				LevelConditionCompareTeammateDie_1.LevelConditionCompareTeammateDie,
			),
			this.$Te(
				"CompareVar",
				LevelConditionCompareVar_1.LevelConditionCompareVar,
			),
			this.$Te(
				"CheckEntityLocked",
				LevelConditionCheckEntityLocked_1.LevelConditionCheckEntityLocked,
			),
			this.YTe(
				0,
				LevelConditionCheckCharacterTag_1.LevelConditionCheckCharacterTag,
			),
			this.YTe(
				1,
				LevelConditionCheckEntityCommonTag_1.LevelConditionCheckEntityCommonTag,
			),
			this.YTe(
				2,
				LevelConditionCheckFanIsNotRotating_1.LevelConditionCheckFanIsNotRotating,
			),
			this.YTe(3, LevelCodeConditionCheckGroup_1.LevelCodeConditionCheckGroup);
	}
	static $Te(e, n, i) {
		this.JTe.set(e, { LevelCondition: new n(), EventNames: i || [] });
	}
	static YTe(e, n) {
		this.zTe.set(e, new n());
	}
	static GetCondition(e) {
		if (this.JTe.has(e)) return this.JTe.get(e).LevelCondition;
	}
	static GetCodeCondition(e) {
		return this.zTe.get(e);
	}
	static GetConditionEventNames(e) {
		return this.JTe.has(e) ? this.JTe.get(e).EventNames : [];
	}
	static GetConditionExParams(e) {
		return this.ZTe.get(e);
	}
	static SetConditionExParams(e, n) {
		this.ZTe.set(e, n);
	}
	static GmDebugMonitor(e) {
		this.eLe = e ? new Map() : void 0;
	}
	static GmDebugCheckCondition(e) {
		return !!this.eLe && !!this.eLe.has(e) && (this.eLe.get(e) ?? !1);
	}
	static GmDebugConditionResultCache(e, n) {
		this.eLe && this.eLe.set(e, n);
	}
}
((exports.LevelConditionCenter = LevelConditionCenter).JTe = new Map()),
	(LevelConditionCenter.zTe = new Map()),
	(LevelConditionCenter.eLe = void 0),
	(LevelConditionCenter.ZTe = new Map());

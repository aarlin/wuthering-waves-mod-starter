"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	BuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BuffById"),
	ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
	BuffTypes_1 = require("./Buff/BuffTypes"),
	CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
	ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes"),
	ExtraEffectLibrary_1 = require("./ExtraEffect/ExtraEffectLibrary"),
	ExtraEffectManager_1 = require("./ExtraEffect/ExtraEffectManager");
class BuffController extends ControllerBase_1.ControllerBase {
	static SetHandlePrefix(e, t) {
		var a = (1 << ActiveBuffConfigs_1.BUFF_HANDLE_PREFIX_BYTE) - 1;
		((a =
			((e < 0 || a < e) &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						20,
						"Invalid Buff Handle prefix.",
						["prefix", e],
						["handleStart", t],
					),
				(e &= a)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Character",
					20,
					"Set GameplayEffect Handle prefix.",
					["prefix", e],
					["handleStart", t],
				),
			ModelManager_1.ModelManager.BuffModel)).HandlePrefix =
			Math.floor(e) << ActiveBuffConfigs_1.BUFF_HANDLE_ID_BYTE),
			(a.LastHandle = Math.max(t, a.LastHandle));
	}
	static GenerateHandle() {
		var e = ModelManager_1.ModelManager.BuffModel;
		return (
			(++e.LastHandle & ActiveBuffConfigs_1.HANDLE_MASK) +
			(e.HandlePrefix & ~ActiveBuffConfigs_1.HANDLE_MASK)
		);
	}
	static GetBuffDefinition(e) {
		var t = ModelManager_1.ModelManager.BuffModel.Get(e);
		return (
			t ||
			((t = BuffById_1.configBuffById.GetConfig(e))
				? BuffController.AddBuffRef(t)
				: void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Character", 20, "无法查找到对应编号的Buff。", [
							"BuffId",
							e,
						])
					))
		);
	}
	static ParseExtraEffect(e) {
		var t, a, r;
		if (e && e.ExtraEffectID)
			return (
				((t =
					new ExtraEffectBaseTypes_1.ExtraEffectParameters()).ExtraEffectId =
					e.ExtraEffectID),
				(t.ExtraEffectParameters = e.ExtraEffectParameters),
				(t.ExtraEffectGrowParameters1 = e.ExtraEffectParametersGrow1),
				(t.ExtraEffectGrowParameters2 = e.ExtraEffectParametersGrow2),
				(t.ExtraEffectRequirement = e.ExtraEffectRequirements),
				(t.ExtraEffectRequirementPara = e.ExtraEffectReqPara),
				(t.ExtraEffectRequirementSetting = e.ExtraEffectReqSetting),
				(t.ExtraEffectCd = e.ExtraEffectCD),
				(t.ExtraEffectRemoveStackNum = e.ExtraEffectRemoveStackNum),
				(t.ExtraEffectProbability = e.ExtraEffectProbability),
				(a =
					ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(
						e.Id,
						t,
						1,
					)),
				(r = require("./ExtraEffect/ExtraEffectDefine")?.getBuffExecutionClass(
					e.ExtraEffectID,
				)) && ((r = r.Create(e.Id, a, t)), (t.ExecutionEffect = r)),
				t
			);
	}
	static EKo(e) {
		var t = [e];
		for (const r of e.RelatedExtraEffectBuffId) {
			var a = BuffById_1.configBuffById.GetConfig(r);
			a && t.push(a);
		}
		return t;
	}
	static AddBuffRef(e) {
		var t = new BuffTypes_1.BuffDefinition(),
			a =
				((t.Id = e.Id),
				(t.Desc = e.GeDesc),
				(t.StackLimitCount = e.StackLimitCount),
				(t.FormationPolicy = e.FormationPolicy),
				(t.StackingType = e.StackingType),
				(t.DefaultStackCount = e.DefaultStackCount),
				(t.StackAppendCount = e.StackAppendCount),
				(t.Probability = e.Probability),
				(t.DurationMagnitude = e.DurationMagnitude),
				(t.DurationPolicy = e.DurationPolicy),
				(t.DurationMagnitude2 = e.DurationMagnitude2),
				(t.DurationCalculationPolicy = e.DurationCalculationPolicy),
				(t.DurationAffectedByBulletTime = e.bDurationAffectedByBulletTime),
				(t.Period = e.Period),
				(t.PeriodicInhibitionPolicy = e.PeriodicInhibitionPolicy),
				(t.ExecutePeriodicOnAdd = e.bExecutePeriodicEffectOnApplication),
				(t.StackDurationRefreshPolicy = e.StackDurationRefreshPolicy),
				(t.StackPeriodResetPolicy = e.StackPeriodResetPolicy),
				(t.StackExpirationRemoveNumber = e.StackExpirationRemoveNumber),
				(t.DenyOverflowAdd = e.bDenyOverflowApplication),
				(t.ClearStackOnOverflow = e.bClearStackOnOverflow),
				0 < e.GameAttributeID &&
					t.Modifiers.push({
						AttributeId: e.GameAttributeID,
						Value1: e.ModifierMagnitude,
						Value2: e.ModifierMagnitude2,
						CalculationPolicy: e.CalculationPolicy,
					}),
				(t.PrematureExpirationEffects = e.PrematureExpirationEffects),
				(t.RoutineExpirationEffects = e.RoutineExpirationEffects),
				(t.OverflowEffects = e.OverflowEffects),
				(t.GameplayCueIds = e.GameplayCueIds),
				0 < e.RemoveBuffWithTags.length &&
					(t.RemoveBuffWithTags = e.RemoveBuffWithTags.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.GrantedTags.length &&
					(t.GrantedTags = e.GrantedTags.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.ApplicationSourceTagRequirements.length &&
					(t.AddInstigatorTagRequirements =
						e.ApplicationSourceTagRequirements.map((e) =>
							GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
						).filter((e) => void 0 !== e)),
				0 < e.ApplicationSourceTagIgnores.length &&
					(t.AddInstigatorTagIgnores = e.ApplicationSourceTagIgnores.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.ApplicationTagRequirements.length &&
					(t.AddTagRequirements = e.ApplicationTagRequirements.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.ApplicationTagIgnores.length &&
					(t.AddTagIgnores = e.ApplicationTagIgnores.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.OngoingTagRequirements.length &&
					(t.ActivateTagRequirements = e.OngoingTagRequirements.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.OngoingTagIgnores.length &&
					(t.ActivateTagIgnores = e.OngoingTagIgnores.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.RemovalTagRequirements.length &&
					(t.RemoveTagExistAll = e.RemovalTagRequirements.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.RemovalTagIgnores.length &&
					(t.RemoveTagIgnores = e.RemovalTagIgnores.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.GrantedApplicationImmunityTags.length &&
					(t.ImmuneTags = e.GrantedApplicationImmunityTags.map((e) =>
						GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				0 < e.GrantedApplicationImmunityTagIgnores.length &&
					(t.ImmuneTagIgnores = e.GrantedApplicationImmunityTagIgnores.map(
						(e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
					).filter((e) => void 0 !== e)),
				this.EKo(e));
		for (const e of a)
			if (e && this.IKo(e))
				if (43 === e.ExtraEffectID) {
					t.RemoveTagExistAny = t.RemoveTagExistAny ?? [];
					for (const a of e.ExtraEffectParameters[0]
						.split("#")
						.map((e) =>
							GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.trim()),
						)
						.filter((e) => void 0 !== e))
						t.RemoveTagExistAny.push(a);
				} else {
					var r = this.ParseExtraEffect(e);
					r && t.EffectInfos.push(r);
				}
		return (
			(t.HasBuffEffect = this.HasBuffEffects(t.EffectInfos)),
			(t.HasBuffPeriodExecution = this.HasBuffPeriodExecutions(t.EffectInfos)),
			ModelManager_1.ModelManager.BuffModel.Add(e.Id, t),
			t
		);
	}
	static CreateDynamicBuffRef() {
		var e = new BuffTypes_1.BuffDefinition();
		return (
			(e.Id = ActiveBuffConfigs_1.DYNAMIC_BUFF_ID), (e.DurationPolicy = 1), e
		);
	}
	static IKo(e) {
		switch (e.ExtraEffectID) {
			case 14:
				if (2 <= e.ExtraEffectParameters.length) {
					var t = Number(e.ExtraEffectParameters[0]);
					if (CharacterAttributeTypes_1.stateAttributeIds.has(t)) break;
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							20,
							"带有锁定属性额外效果14的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)",
							["BuffId", e.Id],
							["AttributeId", t],
						);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							20,
							"带有锁定属性额外效果14的Buff配置的效果参数过少 < 2，此效果无效",
							["BuffId", e.Id],
						);
				return !1;
			case 15:
			case 16:
				if (1 <= e.ExtraEffectParameters.length) {
					if (
						((t = Number(e.ExtraEffectParameters[0])),
						CharacterAttributeTypes_1.stateAttributeIds.has(t))
					)
						break;
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							20,
							"带有锁定属性上下限额外效果的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)",
							["BuffId", e.Id],
							["AttributeId", t],
						);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							20,
							"带有锁定上下限属性额外效果15或16的Buff配置的效果参数过少 < 1，此效果无效",
							["BuffId", e.Id],
						);
				return !1;
		}
		return !0;
	}
	static GetBuffExtraEffectParameters(e) {
		var t = ModelManager_1.ModelManager.BuffModel.Get(e);
		if (t) return t.EffectInfos;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Character", 29, "无法查询到buff信息", ["buffId", e]);
	}
	static HasBuffEffects(e) {
		for (const t of e)
			if (
				!ExtraEffectManager_1.ExtraEffectManager.IsInitExecution(
					t.ExtraEffectId,
				) &&
				!ExtraEffectManager_1.ExtraEffectManager.IsPeriodExecution(
					t.ExtraEffectId,
				)
			)
				return !0;
		return !1;
	}
	static HasBuffPeriodExecutions(e) {
		for (const t of e)
			if (
				ExtraEffectManager_1.ExtraEffectManager.IsPeriodExecution(
					t.ExtraEffectId,
				)
			)
				return !0;
		return !1;
	}
}
(BuffController.yKo = void 0), (exports.default = BuffController);

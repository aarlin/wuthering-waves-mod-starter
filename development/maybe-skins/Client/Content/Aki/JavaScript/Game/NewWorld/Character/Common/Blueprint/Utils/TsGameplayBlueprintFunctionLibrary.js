"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Info_1 = require("../../../../../../Core/Common/Info"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
	LogReportController_1 = require("../../../../../Module/LogReport/LogReportController"),
	LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine"),
	PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
	PhotographController_1 = require("../../../../../Module/Photograph/PhotographController"),
	ActorUtils_1 = require("../../../../../Utils/ActorUtils"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	BulletTypes_1 = require("../../../../Bullet/BulletTypes"),
	SceneItemDynamicAttachTargetComponent_1 = require("../../../../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent"),
	EntityHandle_1 = require("../../../EntityHandle"),
	AbilityUtils_1 = require("../../Component/Abilities/AbilityUtils"),
	CharacterBuffIds_1 = require("../../Component/Abilities/CharacterBuffIds"),
	CharacterGasDebugComponent_1 = require("../../Component/Abilities/CharacterGasDebugComponent"),
	CharacterUnifiedStateTypes_1 = require("../../Component/Abilities/CharacterUnifiedStateTypes"),
	LockOnDebug_1 = require("../../Component/LockOn/LockOnDebug");
class TsGameplayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static ContainsTag(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 185)),
			!(!t?.Valid || !e) && t.HasTag(e.TagId)
		);
	}
	static AddTag(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 185)),
			t?.Valid && e && t.AddTag(e.TagId);
	}
	static AddTagWithDuration(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 157)),
			!t?.Valid || !n || e <= 0 || t.AddTagWithReturnHandle([n.TagId], e);
	}
	static AddTagByName(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 185)),
			t?.Valid &&
				void 0 !==
					(e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) &&
				t.AddTag(e);
	}
	static RemoveTag(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 185)),
			t?.Valid && e && t.RemoveTag(e.TagId);
	}
	static RemoveTagByName(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 185)),
			t?.Valid &&
				void 0 !==
					(e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) &&
				t.RemoveTag(e);
	}
	static IsLogicAutonomousProxy(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 3)?.IsAutonomousProxy ?? !1
		);
	}
	static RemoveActiveGameplayEffect(t, e, n = -1) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 157)),
			!!t?.Valid && 0 < t.RemoveBuffByHandle(e.Handle, n)
		);
	}
	static RemoveBuffByTag(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 157)),
			t?.Valid && e && t.RemoveBuffByTag(e.TagId, "蓝图通过Tag移除Buff");
	}
	static AddPassiveSkill(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 23)),
			t?.Valid && t.LearnPassiveSkill(e);
	}
	static RemovePassiveSkill(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 23)),
			t?.Valid && t.ForgetPassiveSkill(e);
	}
	static SetPassiveGaSkillId(t, e) {}
	static AddBuffForDebug(t, e, n) {
		var i;
		(t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t)) &&
			((i = EntitySystem_1.EntitySystem.GetComponent(e, 157))
				? i.AddBuffForDebug(n, { InstigatorId: t, Reason: "AddBuffForDebug" })
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Battle",
						20,
						"添加buff对象没有BuffComponent",
						["TargetEntityId", e],
						["BuffId", n],
					));
	}
	static GetSpecialBuffToSkillId(t, e) {
		return "" !== e
			? e
			: (e = CharacterBuffIds_1.specialBuffToSkillIdMap.get(t))
				? e.toString()
				: "";
	}
	static AddBuffFromGA(t, e, n, i, o) {
		var a = TsGameplayBlueprintFunctionLibrary.GetSpecialBuffToSkillId(n, i);
		if (
			"" === a &&
			-1 === CharacterBuffIds_1.specialIgnoreGaBuff.findIndex((t) => t === n)
		)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 36, "AddBuffFromGA的SkillId为空", [
					"buffId",
					n,
				]);
		else {
			var r,
				s = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
			if (s) {
				let y = EntitySystem_1.EntitySystem.GetComponent(t, 33)?.GetSkill(
					Number(a),
				)?.CombatMessageId;
				y ||
					((r = EntitySystem_1.EntitySystem.GetComponent(t, 0).GetSummonerId()),
					(y = (
						0 < r
							? ModelManager_1.ModelManager.CreatureModel.GetEntity(
									r,
								)?.Entity?.GetComponent(33)
							: PhantomUtil_1.PhantomUtil.GetSummonedEntity(
									EntitySystem_1.EntitySystem.Get(t),
									Protocol_1.Aki.Protocol.Oqs
										.Proto_ESummonTypeConcomitantCustom,
								)?.Entity?.GetComponent(33)
					)?.GetSkill(Number(a))?.CombatMessageId)),
					y ||
						(Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Battle",
								36,
								"AddBuffFromGA没有上下文",
								["skillId", i],
								["tmpSkillId", a],
								["BuffId", n],
							)),
					e instanceof TsBaseCharacter_1.default &&
						((r = e.CharacterActorComponent.Entity.CheckGetComponent(157))
							? r.AddBuff(n, {
									InstigatorId: s,
									Reason: "AddBuffFromGA",
									PreMessageId: y,
									OuterStackCount: o,
								})
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Battle",
									20,
									"添加buff对象没有BuffComponent",
									["Target", e.GetName()],
									["BuffId", n],
								));
			}
		}
	}
	static RemoveBuffById(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 157)),
			t?.Valid && t.RemoveBuff(e, n, "从蓝图移除Buff");
	}
	static GetBuffCountById(t, e, n) {
		return (
			(t = EntitySystem_1.EntitySystem.Get(t).GetComponent(187)),
			t?.Valid ? t.GetBuffTotalStackById(e, n) : 0
		);
	}
	static AddGameplayCueLocal(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 187)),
			t?.Valid && t.AddGameplayCue([n], e, "蓝图AddGameplayCueLocal");
	}
	static GetGeDebugString(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 20)?.GetGeDebugStrings() ?? ""
		);
	}
	static GetTagDebugStrings(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 20)?.GetTagDebugStrings() ??
			""
		);
	}
	static GetBuffDebugStrings(t, e) {
		return TsGameplayBlueprintFunctionLibrary.GetBuffDebugStringsNoBlueprint(
			t,
			e,
		);
	}
	static GetShieldDebugString(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 20)
				?.GetShieldDebugString()
				.trim() ?? ""
		);
	}
	static GetPassiveSkillDebugString(t) {
		return "";
	}
	static GetShieldValue(t, e) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 64)?.GetShieldValue(e) ?? 0
		);
	}
	static GetBuffDebugStringsNoBlueprint(t, e = "") {
		var n = EntitySystem_1.EntitySystem.GetComponent(t, 157);
		t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
		return (
			(n?.GetDebugBuffString(e) ?? "未找到buff组件") +
			"\n" +
			t?.GetShieldDebugString()
		);
	}
	static GetAttributeDebugString(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(
				t,
				20,
			)?.GetAttributeDebugStrings() ?? ""
		);
	}
	static GetAllAttributeDebugStrings(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(
				t,
				20,
			)?.GetAllAttributeDebugStrings() ?? ""
		);
	}
	static GetServerBuffString(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			20,
		)?.GetServerBuffString();
	}
	static GetServerTagString(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			20,
		)?.GetServerTagString();
	}
	static GetServerAttributeString(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			20,
		)?.GetServerAttributeString();
	}
	static GetServerPartString(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			20,
		)?.GetServerPartString();
	}
	static GetServerHateString(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			20,
		)?.GetServerHateString();
	}
	static GetServerShieldString(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			20,
		)?.GetServerShieldString();
	}
	static ServerDebugInfoRequest(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 20)?.ServerDebugInfoRequest();
	}
	static GetServerDebugInfoDirty(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 20)?.ServerDebugInfoDirty ??
			!1
		);
	}
	static SetServerDebugInfoDirty(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 20)) &&
			(t.ServerDebugInfoDirty = e);
	}
	static DebugResetBaseVal(t, e, n) {
		var i =
			((i = EntitySystem_1.EntitySystem.GetComponent(t, 20)) &&
				i?.DebugResetBaseValue(e, n),
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t));
		t = StringUtils_1.StringUtils.Format(
			"GmSetAttribute {0} {1} {2}",
			i.toString(),
			e.toString(),
			n.toString(),
		);
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
	}
	static DebugResetFormationValue(t, e) {
		FormationAttributeController_1.FormationAttributeController.SetValue(t, e);
	}
	static Record(t, e) {
		return Info_1.Info.IsBuildDevelopmentOrDebug
			? e
				? (CharacterGasDebugComponent_1.CharacterGasDebugComponent.BeginRecord(),
					"")
				: CharacterGasDebugComponent_1.CharacterGasDebugComponent.EndRecord()
			: "";
	}
	static RefreshEntityListView(t) {
		var e,
			n = t.GetListItems(),
			i = new Set();
		for (let e = n.Num() - 1; 0 <= e; e--) {
			var o = n.Get(e),
				a = Number(o.GetName().split(",")[0]);
			!Number.isNaN(a) || i.has(a) ? t.RemoveItem(o) : i.add(a);
		}
		for (const n of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
			i.has(n.Id) ||
				((e = (e = n?.Entity?.GetComponent(3)?.Actor?.GetName())
					? `${n.constructor.name}_${n.Id}[${e}]`
					: n.constructor.name + "_" + n.Id),
				(e = new UE.Layer(t, n.Id + "," + e)),
				t.AddItem(e));
	}
	static RefreshEntityComboBox(t) {
		var e,
			n = t.GetOptionCount(),
			i = new Set();
		for (let e = n - 1; 0 <= e; e--) {
			var o = t.GetOptionAtIndex(e),
				a = Number(/_(?<entityId>\d+)$/.exec(o)?.groups.entityId ?? -1);
			a < 0 || i.has(a) || !EntitySystem_1.EntitySystem.Get(a)
				? t.RemoveOption(o)
				: i.add(a);
		}
		for (const n of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
			i.has(n?.Id) ||
				((e = n?.Entity?.GetComponent(3)?.Actor?.GetName()) &&
					t.AddOption(e + "_" + n.Id));
	}
	static SetEntityComboBox(t, e) {
		var n = EntitySystem_1.EntitySystem.Get(e),
			i = n?.GetComponent(3)?.Actor?.GetName(),
			o = t.GetSelectedOption();
		n && i
			? Number(/_(?<entityId>\d+)$/.exec(o)?.groups.entityId ?? -1) !== e &&
				(t.FindOptionIndex((n = i + "_" + e)) < 0 && t.AddOption(n),
				t.SetSelectedOption(n))
			: o && t.ClearSelection();
	}
	static SetDebugEntityId(t) {
		CombatDebugController_1.CombatDebugController.DebugEntityId =
			CombatDebugController_1.CombatDebugController.DebugEntityId === t ? 0 : t;
	}
	static GetDebugEntityId() {
		return CombatDebugController_1.CombatDebugController.DebugEntityId ?? 0;
	}
	static RefreshBuffListView(t, e, n = "") {
		var i = [...n.matchAll(/[0-9]+/g)].map((t) => t[0] ?? ""),
			o = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(187);
		if (o) {
			var a,
				r,
				s = e.GetListItems(),
				y = new Set();
			for (let t = s.Num() - 1; 0 <= t; t--) {
				var m = s.Get(t);
				const n = o.GetBuffByHandle(Number(m.GetName().split(",")[1]));
				void 0 === n ||
				y.has(n.Handle) ||
				(0 < i.length && !i.some((t) => String(n.Id).startsWith(t)))
					? e.RemoveItem(m)
					: y.add(n.Handle);
			}
			for (const n of o.GetAllBuffs())
				y.has(n.Handle) ||
					(0 < i.length && !i.some((t) => String(n.Id).startsWith(t))) ||
					((a = new UE.Layer(e, t + "," + n.Handle)), e.AddItem(a));
			if (
				(0, RegisterComponent_1.isComponentInstance)(o, 171) &&
				o.GetFormationBuffComp()
			)
				for (const n of o.GetFormationBuffComp().GetAllBuffs())
					y.has(n.Handle) ||
						(0 < i.length && !i.some((t) => String(n.Id).startsWith(t))) ||
						((r = new UE.Layer(e, t + "," + n.Handle)), e.AddItem(r));
		} else e.ClearListItems();
	}
	static GetDebugBuff(t, e) {
		t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(187);
		var n = t?.GetBuffByHandle(e);
		return (
			n ||
			(!n && (0, RegisterComponent_1.isComponentInstance)(t, 171)
				? t.GetFormationBuffComp().GetBuffByHandle(e)
				: void 0)
		);
	}
	static GetBuffIdByHandle(t, e) {
		return TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Id ?? -1n;
	}
	static GetBuffServerIdByHandle(t, e) {
		return (
			TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.ServerId ?? -1
		);
	}
	static GetBuffDescByHandle(t, e) {
		return (
			(t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)),
			(e = t?.Config?.Desc ?? "Invalid"),
			(0, RegisterComponent_1.isComponentInstance)(
				t?.GetOwnerBuffComponent(),
				180,
			)
				? "【编队buff】\n" + e
				: e
		);
	}
	static GetBuffActivateByHandle(t, e) {
		return (
			TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.IsActive() ?? !1
		);
	}
	static GetBuffInstigatorStringByHandle(t, e) {
		return (
			TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)
				?.GetInstigatorActorComponent()
				?.Actor.GetName() ?? "Invalid"
		);
	}
	static GetBuffPeriodStringByHandle(t, e) {
		return void 0 !==
			(t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)) &&
			0 < t.Period
			? t.GetRemainPeriod().toFixed(1) + "/" + t.Period.toFixed(1)
			: "无";
	}
	static GetBuffDurationStringByHandle(t, e) {
		return void 0 !==
			(t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)) &&
			0 < t.Duration
			? t.GetRemainDuration().toFixed(1) + "/" + t.Duration.toFixed(1)
			: "无限";
	}
	static GetBuffDurationProgress(t, e) {
		return void 0 !==
			(t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)) &&
			0 < t.Duration
			? t.GetRemainDuration() / t.Duration
			: 1;
	}
	static GetBuffLivingStatusStringByHandle(t, e) {
		return (
			(t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)),
			t?.IsValid() ? (t.IsActive() ? "激活" : "失效") : "销毁"
		);
	}
	static GetBuffLevelStringByHandle(t, e) {
		return (
			"" +
			(TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Level ??
				"Invalid")
		);
	}
	static GetBuffStackStringByHandle(t, e) {
		return (
			"" +
			(TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.StackCount ??
				"Invalid")
		);
	}
	static GetBuffDebugStringByHandle(t, e) {
		let n = "";
		const i = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
		var o = i?.GetOwnerBuffComponent();
		if (!i || !o) return n;
		i.Config.GrantedTags?.forEach((t) => {
			n += `附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}\n`;
		});
		for (const t of o.BuffEffectManager?.GetEffectsByHandle(i.Handle) ?? [])
			n += `激活效果 ${t.GetDebugString()}(cd:${(o.GetBuffEffectCd(t.BuffId, t.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)\n`;
		return (
			i.Config.Modifiers?.forEach((t) => {
				var e = AbilityUtils_1.AbilityUtils.GetLevelValue(
						t.Value1 ?? [],
						i.Level,
						0,
					),
					o = AbilityUtils_1.AbilityUtils.GetLevelValue(
						t.Value2 ?? [],
						i.Level,
						0,
					);
				switch (t.CalculationPolicy[0]) {
					case 0:
						n += `属性${Protocol_1.Aki.Protocol.Bks[t.AttributeId]}增加${t.Value1}\n`;
						break;
					case 1:
						n += `属性${Protocol_1.Aki.Protocol.Bks[t.AttributeId]}增加${(0.01 * e).toFixed(1)}%\n`;
						break;
					case 2:
					case 4:
						(n +=
							`属性${Protocol_1.Aki.Protocol.Bks[t.AttributeId]}${2 === t.CalculationPolicy[0] ? "增加" : "覆盖为"}${1 === t.CalculationPolicy[2] ? "施加者" : "持有者"}${Protocol_1.Aki.Protocol.Bks[t.CalculationPolicy[1]]}${["基础值", "当前值", "附加值"][t.CalculationPolicy[3]]}的${(0.01 * e).toFixed(1)}%+` +
							o +
							(t.CalculationPolicy[4] ? "(快照)" : "")),
							t.CalculationPolicy[5] &&
								(n += "，下限" + t.CalculationPolicy[5]),
							t.CalculationPolicy[6] &&
								(n += "，比例" + t.CalculationPolicy[6]),
							t.CalculationPolicy[7] &&
								(n += "，上限" + t.CalculationPolicy[7]),
							(n += "\n");
						break;
					case 3:
						n += `属性${Protocol_1.Aki.Protocol.Bks[t.AttributeId]}覆盖为${t.Value1}\n`;
						break;
					default:
						n += "修改属性" + Protocol_1.Aki.Protocol.Bks[t.AttributeId];
				}
			}),
			n.trimEnd()
		);
	}
	static SetDistance(t, e) {
		CharacterGasDebugComponent_1.CharacterGasDebugComponent.SetDistanceMax(e);
	}
	static GetAllMovementHistory(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			20,
		)?.GetAllMovementHistory();
	}
	static ResetBaseValueLocal(t, e, n) {
		EntitySystem_1.EntitySystem.GetComponent(t, 20)?.DebugResetBaseValue(e, n);
	}
	static GetAttributeCurrentValue(t, e) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 156)?.GetCurrentValue(e);
	}
	static GetAttributeBaseValue(t, e) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 156)?.GetBaseValue(e);
	}
	static SetRageModeId(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 51)?.SetRageModeId(e);
	}
	static SetHardnessModeId(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 51)?.SetHardnessModeId(e);
	}
	static OnHit(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 51)),
			(e = BulletTypes_1.HitInformation.FromUeHitInformation(e)),
			t?.OnHit(e, !0, void 0, !1, !1, void 0, void 0, void 0);
	}
	static SetBeHitIgnoreRotate(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 51)?.SetBeHitIgnoreRotate(e);
	}
	static CheckHasPart(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 58)?.IsMultiPart ?? !1;
	}
	static GetPartRemainedLife(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 58)),
			t?.IsMultiPart ? t.GetPartByTag(e).RemainedLife() : -1
		);
	}
	static ResetPartLife(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 58)),
			t?.IsMultiPart && t.GetPartByTag(e).ResetLife();
	}
	static ActiveStiff(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 51)?.ActiveStiff(1);
	}
	static DeActiveStiff(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 51)?.DeActiveStiff(
			"蓝图退出硬直",
		);
	}
	static GetAcceptedNewBeHitAndReset(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(
				t,
				51,
			)?.GetAcceptedNewBeHitAndReset() ?? !1
		);
	}
	static GetEnterFkAndReset(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 51)?.GetEnterFkAndReset() ??
			!1
		);
	}
	static IsStiff(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.IsStiff() ?? !1;
	}
	static GetRageModeId(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.RageModeId;
	}
	static GetHardnessModeId(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.HardnessModeId;
	}
	static GetBeHitBone(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 51)),
			t?.BeHitBones && 0 < t?.BeHitBones?.length
				? t.BeHitBones[0]
				: FNameUtil_1.FNameUtil.EMPTY
		);
	}
	static GetToughDecreaseValue(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.ToughDecreaseValue;
	}
	static GetCounterAttackInfoInternal(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 51)
			?.CounterAttackInfoInternal;
	}
	static GetVisionCounterAttackInfoInternal(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 51)
			?.VisionCounterAttackInfoInternal;
	}
	static GetBeHitTime(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.BeHitTime;
	}
	static GetBeHitAnim(t) {
		return (t = EntitySystem_1.EntitySystem.GetComponent(t, 51))
			? t.BeHitAnim
			: 0;
	}
	static GetEnterFk(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.EnterFk ?? !1;
	}
	static GetBeHitDirect(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			51,
		)?.BeHitDirect.ToUeVector();
	}
	static GetBeHitLocation(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			51,
		)?.BeHitLocation.ToUeVector();
	}
	static AddCheckBuffList(t, e) {}
	static ClearCheckBuffList(t) {}
	static CounterAttackEnd(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 51)?.CounterAttackEnd();
	}
	static VisionCounterAttackEnd(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 51)?.VisionCounterAttackEnd();
	}
	static SetCounterAttackEndTime(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 51)?.SetCounterAttackEndTime(e);
	}
	static IsTriggerCounterAttack(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 51)?.IsTriggerCounterAttack ??
			!1
		);
	}
	static ResetTarget(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 29)?.ResetTarget();
	}
	static SetShowTarget(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 29)),
			t?.Valid &&
				(e
					? ((e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity),
						t.SetShowTarget(new EntityHandle_1.EntityHandle(e)))
					: t.SetShowTarget(void 0));
	}
	static ExitLockDirection(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 29)),
			t?.Valid && t.ExitLockDirection();
	}
	static EnterLockDirection(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 29)),
			t?.Valid && t.EnterLockDirection();
	}
	static GetCurrentTarget(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 29)), t?.Valid))
			return t.GetCurrentTarget()?.Entity?.GetComponent(1)?.Owner;
	}
	static SetLockOnDebugLine(t, e) {
		LockOnDebug_1.LockOnDebug.IsShowDebugLine = e;
	}
	static ManipulateValid(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 55)?.Valid ?? !1;
	}
	static ManipulateGetDrawTarget(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 55)), t?.Valid))
			return t.GetDrawTarget();
	}
	static ManipulateGetCastTarget(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 55)), t?.Valid))
			return t.GetCastTarget();
	}
	static ManipulateGetDrawTargetChantTime(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			t?.Valid ? t.GetDrawTargetChantTime() : 0
		);
	}
	static ManipulateChant(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			!!t?.Valid && t.Chant(e)
		);
	}
	static ManipulateDraw(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			!!t?.Valid && t.Draw()
		);
	}
	static ManipulateCast(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			!!t?.Valid && t.Precast(e)
		);
	}
	static ManipulateReset(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			t?.Valid && t.Reset();
	}
	static ManipulateChangeToProjectileState(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			!!t?.Valid && t.ChangeToProjectileState()
		);
	}
	static ManipulateChangeToNormalState(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			!!t?.Valid && t.ChangeToNormalState()
		);
	}
	static GetHoldingActor(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 55)), t?.Valid))
			return t.GetHoldingActor();
	}
	static SetDebugDraw(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			t?.Valid && (t.DebugDrawSphereAndArrow = e);
	}
	static ExtraAction(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			t?.Valid && t.ExtraAction();
	}
	static SetQtePosition(t, e, n, i, o, a, r, s = 0) {
		EntitySystem_1.EntitySystem.GetComponent(t, 86)?.SetQtePosition({
			Rotate: e,
			Length: n,
			Height: i,
			ReferenceTarget: o,
			QteType: s,
		});
	}
	static GetDtSkillInfo(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 33)), t?.Valid))
			return t.DtSkillInfo;
	}
	static GetLastActivateSkillTime(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.LastActivateSkillTime : 0
		);
	}
	static SetLastActivateSkillTime(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.SetLastActivateSkillTime(e);
	}
	static GetSkillElevationAngle(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.SkillElevationAngle : 0
		);
	}
	static SetSkillElevationAngle(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.SetSkillElevationAngle(e);
	}
	static CurrentSkillId(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.CurrentSkill?.SkillId.toString() : ""
		);
	}
	static CurrentPriority(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.CurrentPriority : 0
		);
	}
	static SetCurrentPriority(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.SetCurrentPriority(e);
	}
	static HasAbility(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			!!t?.Valid && t.HasAbility(Number(e))
		);
	}
	static GetSkillInfo(t, e) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 33)), t?.Valid))
			return t.GetSkillInfo(Number(e));
	}
	static SetSkillPriority(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.SetSkillPriority(Number(e), n);
	}
	static EndSkill(t, e, n, i) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid &&
				t.EndSkill(Number(e), "TsGameplayBlueprintFunctionLibrary.EndSkill");
	}
	static BeginSkill(t, e, n, i, o) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			!!t?.Valid &&
				t.BeginSkill(Number(e.toString()), {
					Target: i,
					SocketName: o.toString(),
					Context: "TsGameplayBlueprintFunctionLibrary.BeginSkill",
				})
		);
	}
	static GetSkillTarget(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.SkillTarget
				? t.SkillTarget?.Entity?.GetComponent(1)?.Owner
				: void 0
		);
	}
	static SetSkillTarget(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid &&
				((t.SkillTarget = void 0), e) &&
				(e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity) &&
				(t.SkillTarget = new EntityHandle_1.EntityHandle(e));
	}
	static IsHasInputDir(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			!!t?.Valid && t.IsHasInputDir()
		);
	}
	static GetSkillIdWithGroupId(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.GetSkillIdWithGroupId(e)?.toString() : ""
		);
	}
	static GetSkillAcceptInput(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			!!t?.Valid && t.SkillAcceptInput
		);
	}
	static SetSkillAcceptInput(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.SetSkillAcceptInput(e);
	}
	static SetCommonSkillCanBeInterrupt(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && (t.IsMainSkillReadyEnd = e);
	}
	static GetCommonSkillCanBeInterrupt(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			!!t?.Valid && t.IsMainSkillReadyEnd
		);
	}
	static OnActivateAbility(t, e, n) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.OnActivateAbility(e, n) : -1
		);
	}
	static OnEndAbility(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.OnEndAbility(e, n);
	}
	static GetPriority(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.GetPriority(Number(e)) : -1
		);
	}
	static GetActivePriority(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.GetActivePriority(Number(e)) : -1
		);
	}
	static GetSkillMontageInstance(t, e, n) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 33)), t?.Valid))
			return t.GetSkillMontageInstance(Number(e), n);
	}
	static SetSkillRotateLocation(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && ((e = Vector_1.Vector.Create(e)), t.SetRotateTarget(e, 1));
	}
	static SetSkillRotateDirect(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && ((e = Vector_1.Vector.Create(e)), t.SetRotateTarget(e, 2));
	}
	static CallAnimBreakPoint(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.CallAnimBreakPoint();
	}
	static RollingGround(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.RollingGrounded();
	}
	static ActivateAbilityVision(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 34)),
			!!t?.Valid && t.ActivateAbilityVision(e)
		);
	}
	static EndAbilityVision(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 34)),
			!!t?.Valid && t.EndAbilityVision(e)
		);
	}
	static GetVisionIdList(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 34)),
			t?.Valid ? t.GetVisionIdList() : UE.NewArray(UE.BuiltinInt)
		);
	}
	static ExitMultiSkillStateOfMorphVision(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 34)),
			t?.Valid && t.ExitMultiSkillStateOfMorphVision();
	}
	static SetKeepMultiSkillState(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 34)),
			t?.Valid && t.SetKeepMultiSkillState(e, n);
	}
	static SetEnableAttackInputActionOfMorphVision(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 34)),
			t?.Valid && t.SetEnableAttackInputActionOfMorphVision(e);
	}
	static GetVisionLevelList(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 34)),
			t?.Valid ? t.GetVisionLevelList() : UE.NewArray(UE.BuiltinInt)
		);
	}
	static GetVisionSkillId(t, e, n) {
		return PhantomUtil_1.PhantomUtil.GetEntityVisionSkillId(t, e);
	}
	static InterruptSkill(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid &&
				t.EndSkill(
					Number(e),
					"TsGameplayBlueprintFunctionLibrary.InterruptSkill",
				);
	}
	static DeleteSkills(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid &&
				t.StopAllSkills("TsGameplayBlueprintFunctionLibrary.DeleteSkills");
	}
	static GetCurrentMontageCorrespondingSkillId(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.GetCurrentMontageCorrespondingSkillId()?.toString() : ""
		);
	}
	static SetSocketName(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && (t.SkillTargetSocket = e);
	}
	static GetSocketName(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.SkillTargetSocket : ""
		);
	}
	static GetPointTransform(t, e) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 33)), t?.Valid))
			return t.GetPointTransform(FNameUtil_1.FNameUtil.GetDynamicFName(e));
	}
	static PlaySkillMontage2Server(t, e, n, i, o, a) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.PlaySkillMontage2Server(Number(e), n, i, o, a);
	}
	static EndSkillMontage(t, e, n) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid && t.EndSkillMontage(Number(e), n);
	}
	static CanActivateFixHook(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 87)),
			!!t?.Valid && t.CanActivateFixHook()
		);
	}
	static FixHookTargetLocation(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 87)), t?.Valid))
			return t.GetCurrentTargetLocation();
	}
	static FixHookTargetActor(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 87)), t?.Valid))
			return t.GetCurrentTargetActor();
	}
	static FixHookTargetIsSuiGuangType(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 87)),
			!!t?.Valid && t.GetTargetIsSuiGuangType()
		);
	}
	static FixHookTargetForward(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 87)), t?.Valid))
			return t.GetCurrentTargetForward();
	}
	static NextFixHookTargetLocation(t) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 87)), t?.Valid))
			return t.GetNextTargetLocation();
	}
	static FixHookTargetInheritSpeed(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 87)),
			!!t?.Valid && t.GetInheritSpeed()
		);
	}
	static FixHookTargetIsClimb(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 87)),
			!!t?.Valid && t.GetIsClimb()
		);
	}
	static SetIgnoreSocketName(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid &&
				t.SetIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
	}
	static DeleteIgnoreSocketName(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid &&
				t.DeleteIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
	}
	static GetToTargetSocketDistance(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 33)),
			t?.Valid ? t.GetTargetDistance() : -1
		);
	}
	static SetPredictProjectileInfo(t, e, n, i, o) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 67)),
			t?.Valid && t.SetPredictProjectileInfo(e, n, i, o);
	}
	static SetVisible(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 67)),
			t?.Valid && t.SetVisible(e);
	}
	static GetCharUnifiedMoveState(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 89)?.MoveState;
	}
	static GetCharUnifiedPositionState(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 89)?.PositionState;
	}
	static ExitHitState(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 158)?.ExitHitState();
	}
	static SetDirectionState(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 89)?.SetDirectionState(e);
	}
	static GetDirectionState(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 89)?.DirectionState;
	}
	static GetIsInGame(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 89)?.IsInGame ?? !1;
	}
	static SprintPress(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 158)?.SprintPress();
	}
	static SprintRelease(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 158)?.SprintRelease();
	}
	static StandPress(t) {
		var e = EntitySystem_1.EntitySystem.GetComponent(t, 89);
		e &&
			e.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
			EntitySystem_1.EntitySystem.GetComponent(t, 3)?.CreatureData.IsRole() &&
			e.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
	}
	static SwingPress(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 158)?.SwingPress();
	}
	static SwingRelease(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 158)?.SwingRelease();
	}
	static CustomSetWalkOrRun(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 158)?.CustomSetWalkOrRun(e);
	}
	static EnterAimStatus(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 158)?.EnterAimStatus(e);
	}
	static ExitAimStatus(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 158)?.ExitAimStatus();
	}
	static EnableEntity(t, e) {}
	static UpdateAnimInfoHit(t, e) {
		var n,
			i,
			o = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		o?.Valid &&
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 51)) &&
			((o = o.AnimLogicParamsSetter),
			(n = t.GetAcceptedNewBeHitAndReset()),
			o.AcceptedNewBeHit !== n &&
				((o.AcceptedNewBeHit = n),
				(e.AcceptedNewBeHitRef = n),
				(i = t.BeHitAnim),
				o.BeHitAnim !== i) &&
				((o.BeHitAnim = i), (e.BeHitAnimRef = i)),
			(n = t.GetEnterFkAndReset()),
			o.EnterFk !== n && ((o.EnterFk = n), (e.EnterFkRef = n)),
			(n = t.GetDoubleHitInAir()),
			o.DoubleHitInAir !== n) &&
			((o.DoubleHitInAir = n), (e.DoubleHitInAirRef = n));
	}
	static UpdateAnimInfoFk(t, e) {
		var n = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		if (n?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 51))) {
			n = n.AnimLogicParamsSetter;
			let i = t.BeHitDirect;
			n.BeHitDirect.Equals(i) ||
				(n.BeHitDirect.DeepCopy(i), (e.BeHitDirectRef = i.ToUeVector())),
				(i = t.BeHitLocation),
				n.BeHitLocation.Equals(i) ||
					(n.BeHitLocation.DeepCopy(i), (e.BeHitLocationRef = i.ToUeVector()));
		}
	}
	static UpdateAnimInfoUnifiedState(t, e) {
		var n,
			i = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		i?.Valid &&
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 89)) &&
			((i = i.AnimLogicParamsSetter),
			(n = t.MoveState),
			i.CharMoveState !== n &&
				((i.CharMoveState = n), (e.CharMoveStateRef = n)),
			(n = t.PositionState),
			i.CharPositionState !== n &&
				((i.CharPositionState = n), (e.CharPositionStateRef = n)),
			(n = t.DirectionState),
			i.CharCameraState !== n) &&
			((i.CharCameraState = n), (e.CharCameraStateRef = n));
	}
	static UpdateAnimInfoUnifiedStateRoleNpc(t, e) {
		var n = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		n?.Valid &&
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 89)) &&
			((n = n.AnimLogicParamsSetter),
			(t = t.MoveState),
			n.CharMoveState !== t) &&
			((n.CharMoveState = t), (e.CharMoveStateRef = t));
	}
	static ChangeCameraToEntityCamera() {
		PhotographController_1.PhotographController.CameraCaptureType = 1;
	}
	static GetIsCharRotateWithCameraWhenManipulate(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 55)),
			!!t?.Valid && t.GetIsCharRotateWithCameraWhenManipulate()
		);
	}
	static GetIsUseCatapultUpAnim(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 26)),
			!!t?.Valid && t.IsUseCatapultUpAnim
		);
	}
	static GetNextMultiSkillId(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 186)),
			t?.Valid ? t.GetNextMultiSkillId(e) : 0
		);
	}
	static StartManipulateInteract(t) {
		return (
			!!(t = EntitySystem_1.EntitySystem.GetComponent(t, 56)) &&
			t.StartInteract()
		);
	}
	static EndManipulateInteract(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 56)) && t.EndInteract();
	}
	static GetManipulateInteractLocation(t) {
		if ((t = EntitySystem_1.EntitySystem.GetComponent(t, 56)))
			return t.GetTargetLocation().ToUeVector();
	}
	static EnvironmentInfoDetect(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
				e,
				t.IsRoleAndCtrlByMe,
			);
	}
	static LockOnSpecifyTarget(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 29)),
			(e = EntitySystem_1.EntitySystem.Get(e)),
			t?.Valid &&
				e?.Valid &&
				t.LockOnSpecifyTarget(new EntityHandle_1.EntityHandle(e));
	}
	static IsSkillInCd(t, e) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 186)),
			!!t?.Valid && t.IsSkillInCd(e)
		);
	}
	static SendHookSkillUseLogData(t, e) {
		var n = new LogReportDefine_1.HookSkillUseLogData();
		t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
		(n.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
			(n.i_father_area_id =
				ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
			(n.f_pos_x = t.X),
			(n.f_pos_y = t.Y),
			(n.f_pos_z = t.Z),
			(n.i_has_target = e ? 1 : 0),
			LogReportController_1.LogReportController.LogReport(n);
	}
	static SendManipulateSkillUseLogData(t, e) {
		var n = new LogReportDefine_1.ManipulateSkillUseLogData();
		t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
		(n.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
			(n.i_father_area_id =
				ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
			(n.f_pos_x = t.X),
			(n.f_pos_y = t.Y),
			(n.f_pos_z = t.Z),
			(n.i_has_target = e ? 1 : 0),
			LogReportController_1.LogReportController.LogReport(n);
	}
	static SendScanSkillUseLogData(t, e) {
		var n = new LogReportDefine_1.ScanSkillUseLogData();
		t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
		(n.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
			(n.i_father_area_id =
				ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
			(n.f_pos_x = t.X),
			(n.f_pos_y = t.Y),
			(n.f_pos_z = t.Z),
			(n.i_has_target = e ? 1 : 0),
			LogReportController_1.LogReportController.LogReport(n);
	}
	static DynamicAttachEntityToActor(t, e, n) {
		var i = EntitySystem_1.EntitySystem.Get(t);
		t = EntitySystem_1.EntitySystem.GetComponent(t, 110);
		if (i && t) {
			let r = new UE.Transform();
			e = EntitySystem_1.EntitySystem.Get(e);
			var o,
				a = e?.GetComponent(1)?.Owner;
			a &&
				(a.IsA(UE.Character.StaticClass())
					? (o = a).Mesh.DoesSocketExist(n) &&
						(r = o.Mesh.GetSocketTransform(n, 0))
					: (r = a.GetTransform()),
				i
					.GetComponent(1)
					?.SetActorLocationAndRotation(
						r.GetLocation(),
						r.GetRotation().Rotator(),
					),
				void 0 !== (o = e?.GetComponent(0)?.GetCreatureDataId())) &&
				(((a =
					new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType =
					1),
				(a.RotAttachType = 1),
				(a.AttachSocketName = n),
				t.RegEntityTargetByCreatureDataId(
					o,
					void 0,
					a,
					"DynamicAttachEntityToActor",
				));
		}
	}
	static DynamicDetachEntityFromActor(t) {
		var e = EntitySystem_1.EntitySystem.Get(t);
		t = EntitySystem_1.EntitySystem.GetComponent(t, 110);
		e &&
			t &&
			t.UnRegTarget(
				"TsGameplayBlueprintFunctionLibrary.DynamicDetachEntityFromActor",
			);
	}
	static SetEntityEnable(t, e, n, i) {
		n?.IsValid()
			? ((n = `[蓝图:${n.GetName()}] ` + i),
				(i = EntitySystem_1.EntitySystem.Get(t))?.Valid &&
					ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
						i,
						e,
						n,
						!0,
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					29,
					"调用SetEntityEnable失败，因为callObject为空",
				);
	}
}
exports.default = TsGameplayBlueprintFunctionLibrary;

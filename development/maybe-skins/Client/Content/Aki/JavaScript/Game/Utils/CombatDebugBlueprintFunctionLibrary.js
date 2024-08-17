"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	FormationPropertyAll_1 = require("../../Core/Define/ConfigQuery/FormationPropertyAll"),
	PassiveSkillById_1 = require("../../Core/Define/ConfigQuery/PassiveSkillById"),
	Protocol_1 = require("../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
	FormationAttributeController_1 = require("../Module/Abilities/FormationAttributeController"),
	CharacterAttributeTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
	CharacterTagContainer_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterTagContainer"),
	TriggerType_1 = require("../NewWorld/Character/Common/Component/Abilities/Trigger/TriggerType"),
	CombatDebugController_1 = require("./CombatDebugController"),
	CombatDebugDrawController_1 = require("./CombatDebugDrawController");
class CombatDebugBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static GetDebugMonsterMovePath() {
		return CombatDebugDrawController_1.CombatDebugDrawController
			.DebugMonsterMovePath;
	}
	static SetDebugMonsterMovePath(t) {
		CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterMovePath =
			t;
	}
	static GetDebugMonsterControl() {
		return CombatDebugDrawController_1.CombatDebugDrawController
			.DebugMonsterControl;
	}
	static SetDebugMonsterControl(t) {
		CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterControl =
			t;
	}
	static IsDrawEntityBoxEnabled() {
		return (
			CombatDebugDrawController_1.CombatDebugDrawController
				.IsDrawEntityBoxEnabled ?? !1
		);
	}
	static SetDrawEntityBoxEnabled(t) {
		CombatDebugDrawController_1.CombatDebugDrawController.IsDrawEntityBoxEnabled =
			t;
	}
	static IsDrawEntityBoxInfoEnabled() {
		return (
			CombatDebugDrawController_1.CombatDebugDrawController
				.IsDrawEntityBoxInfoEnabled ?? !1
		);
	}
	static SetDrawEntityBoxInfoEnabled(t) {
		CombatDebugDrawController_1.CombatDebugDrawController.IsDrawEntityBoxInfoEnabled =
			t;
	}
	static GetCombatScriptIndexes() {
		return CombatDebugController_1.CombatDebugController.ScriptHelper
			.CombatScriptIndexes;
	}
	static FilterScript(t) {
		return CombatDebugController_1.CombatDebugController.FilterCmd(t);
	}
	static TryRefreshServerDebugInfo() {
		CombatDebugController_1.CombatDebugController.RefreshServerDebugInfo();
	}
	static GetServerBuffRemainDuration(t, e) {
		return (
			EntitySystem_1.EntitySystem.Get(t)
				?.GetComponent(20)
				?.GetServerBuffRemainDuration(e) ?? -1
		);
	}
	static GetServerBuffTotalDuration(t, e) {
		return (
			EntitySystem_1.EntitySystem.Get(t)
				?.GetComponent(20)
				?.GetServerBuffTotalDuration(e) ?? -1
		);
	}
	static GetDebugBuff(t, e) {
		t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(187);
		var r = t?.GetBuffByHandle(e);
		return (
			r ||
			(!r && (0, RegisterComponent_1.isComponentInstance)(t, 171)
				? t.GetFormationBuffComp().GetBuffByHandle(e)
				: void 0)
		);
	}
	static GetBuffRemainDuration(t, e) {
		return (
			CombatDebugBlueprintFunctionLibrary.GetDebugBuff(
				t,
				e,
			)?.GetRemainDuration() ?? -1
		);
	}
	static GetBuffTotalDuration(t, e) {
		return (
			CombatDebugBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Duration ?? -1
		);
	}
	static GetAttributeDebugString(t) {
		var e = EntitySystem_1.EntitySystem.GetComponent(t, 20),
			r = EntitySystem_1.EntitySystem.GetComponent(t, 156);
		if (!e || !r) return "";
		var a = new Set(CharacterAttributeTypes_1.attrsBaseValueClampMax.values()),
			o = new Set(CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.values()),
			n = new Set(CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.values());
		let i = "";
		const s = e.LGr?.dfs;
		var l = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
		if (s) for (const t of s) l[t.Ugs] = t;
		for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++)
			if (
				!(
					CharacterAttributeTypes_1.attrsBaseValueClamp.has(t) ||
					CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) ||
					a.has(t) ||
					CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t) ||
					o.has(t) ||
					n.has(t)
				)
			) {
				var u = Protocol_1.Aki.Protocol.Bks[t].replace("Proto_", ""),
					[C, m] = [r.GetBaseValue(t), r.GetCurrentValue(t)],
					b = m.toFixed(0),
					m = m === C ? "" : (C < m ? "(+" : "(") + (m - C).toFixed(0) + ")";
				const e = l[t];
				var y,
					[C, y] = [e?.Pgs ?? 0, e?.NFn ?? 0];
				i += `#${t} ${u} C:${b}${m} | S:${y.toFixed(0)}${(y = y === C ? "" : (C < y ? "(+" : "(") + (y - C).toFixed(0) + ")")}\n`;
			}
		return i.trim();
	}
	static GetStateAttributeDebugString(t) {
		var e = EntitySystem_1.EntitySystem.GetComponent(t, 20),
			r = EntitySystem_1.EntitySystem.GetComponent(t, 156);
		if (!e || !r) return "";
		let a = "";
		const o = e.LGr?.dfs;
		var n = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
		if (o) for (const t of o) n[t.Ugs] = t;
		for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++)
			if (
				CharacterAttributeTypes_1.attrsBaseValueClamp.has(t) ||
				CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) ||
				CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)
			) {
				var i = Protocol_1.Aki.Protocol.Bks[t].replace("Proto_", ""),
					s = r.GetBaseValue(t).toFixed(0);
				const e = n[t];
				var l,
					u,
					C,
					m,
					b = (e?.Pgs ?? 0).toFixed(0);
				CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)
					? ((m =
							CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t) ?? 0),
						(C = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t) ?? 0),
						(l = r.GetCurrentValue(C).toFixed(0)),
						(C = (n[C]?.NFn ?? 0).toFixed(0)),
						(a += `#${t} ${i} C:${s}/${l} (${(u = r.GetCurrentValue(m).toFixed(0))}/s) | S:${b}/${C} (${(m = (n[m]?.NFn ?? 0).toFixed(0))}/s)\n`))
					: CharacterAttributeTypes_1.attrsBaseValueClamp.has(t)
						? (a += `#${t} ${i} C:${s}/${(l = CharacterAttributeTypes_1.attrsBaseValueClamp.get(t) ?? 0)} | S:${b}/${l}\n`)
						: CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) &&
							((u =
								CharacterAttributeTypes_1.attrsBaseValueClampMax.get(t) ?? 0),
							(a += `#${t} ${i} C:${s}/${(C = r.GetCurrentValue(u).toFixed(0))} | S:${b}/${(m = (n[u]?.NFn ?? 0).toFixed(0))}\n`));
			}
		return a.trim();
	}
	static GetFormationAttributeDebugString(t) {
		if (!(t = EntitySystem_1.EntitySystem.GetComponent(t, 20))) return "";
		let e = "";
		t = t.LGr?.qFn;
		var r = new Array();
		if (t) for (const e of t) r[e.OFn] = e;
		for (const t of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
			var a = t.Id,
				o =
					FormationAttributeController_1.FormationAttributeController.GetValue(
						a,
					),
				n =
					FormationAttributeController_1.FormationAttributeController.GetMax(a),
				i =
					FormationAttributeController_1.FormationAttributeController.GetSpeed(
						a,
					),
				s = r[a],
				l = s?.NFn.toFixed(0) ?? "???",
				u = s?.kFn.toFixed(0) ?? "???";
			s = s?.VFn.toFixed(0) ?? "???";
			e += `#${a} C:${o?.toFixed(0)}/${n?.toFixed(0)} (${i?.toFixed(0)}/s) | S:${l}/${u} (${s}/s)\n`;
		}
		return e.trim();
	}
	static GetPassiveDebugString(t) {
		var e = EntitySystem_1.EntitySystem.GetComponent(t, 23),
			r = EntitySystem_1.EntitySystem.GetComponent(t, 25);
		if (!e) return "";
		let a = "";
		for (const t of e.GetAllPassiveSkills()) {
			var o = r?.GetTrigger(t.TriggerHandle),
				n = PassiveSkillById_1.configPassiveSkillById.GetConfig(t.SkillId),
				i = e.rkr?.GetPassiveSkillCdInfo(t.SkillId)?.CurRemainingCd;
			"" !==
				(i =
					((a += `技能: ${t.SkillId} handle: ${t.TriggerHandle} CD:${i?.toFixed(2)}\n说明: ${n.SkillDesc}\n触发器类型: ${n.TriggerType}${void 0 !== TriggerType_1.ETriggerEvent[n.TriggerType] ? "" : "(非法类型)"}\n条件公式: \n${n.TriggerFormula}\n`),
					o?.GetLastFormulaResult() ?? "")) && (a += `最后触发结果:\n${i}\n`),
				(a += "\n\n");
		}
		return a.trim();
	}
	static GetTagsDebugString(t) {
		const e = EntitySystem_1.EntitySystem.GetComponent(t, 185)?.TagContainer;
		if (!(t = EntitySystem_1.EntitySystem.GetComponent(t, 20)) || !e) return "";
		var r = t?.LGr?.hTs,
			a = ((t = t?.LGr?._Ts), new Map());
		const o = new Map([
			["实体", new Map()],
			["编队", new Map()],
		]);
		if (r) {
			var n = o.get("实体");
			for (const t of r)
				a.set(t.Ukn, a.get(t.Ukn) ?? 0 + t.I5n), n.set(t.Ukn, t.I5n);
		}
		if (t) {
			var i = o.get("编队");
			for (const e of t)
				a.set(e.Ukn, a.get(e.Ukn) ?? 0 + e.I5n), i.set(e.Ukn, e.I5n);
		}
		return (
			"【客户端】\n" +
			[...e.GetAllExactTags()]
				.map((t) => {
					var r = e.GetExactTagCount(t);
					let a =
						GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${r}(`;
					for (const r of e.GetAllChannels()) {
						var o = e.GetRowTagCount(r, t);
						o &&
							(a += CharacterTagContainer_1.channelDebugName[r] + ` x ${o} `);
					}
					return a.trimEnd() + ")\n";
				})
				.sort((t, e) => t.localeCompare(e))
				.join("") +
			"\n【服务端】\n" +
			[...a.entries()]
				.map(([t, e]) => {
					let r =
						GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${e}(`;
					var a, n;
					for ([a, n] of o.entries()) {
						var i = n.get(t);
						i && (r += a + ` x ${i} `);
					}
					return r.trimEnd() + ")\n";
				})
				.sort((t, e) => t.localeCompare(e))
				.join("")
		).trim();
	}
}
exports.default = CombatDebugBlueprintFunctionLibrary;

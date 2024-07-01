"use strict";
var CharacterGasDebugComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, o) {
			var n,
				a = arguments.length,
				i =
					a < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, r))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				i = Reflect.decorate(t, e, r, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(n = t[s]) &&
						(i = (a < 3 ? n(i) : 3 < a ? n(e, r, i) : n(e, r)) || i);
			return 3 < a && i && Object.defineProperty(e, r, i), i;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterGasDebugComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../../Core/Common/Time"),
	PriorityQueue_1 = require("../../../../../../Core/Container/PriorityQueue"),
	DamageById_1 = require("../../../../../../Core/Define/ConfigQuery/DamageById"),
	FormationPropertyAll_1 = require("../../../../../../Core/Define/ConfigQuery/FormationPropertyAll"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../../Core/Net/Net"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	TestModuleBridge_1 = require("../../../../../Bridge/TestModuleBridge"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../../../Common/PublicUtil"),
	Global_1 = require("../../../../../Global"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	AbilityUtils_1 = require("./AbilityUtils"),
	CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
	CharacterBuffController_1 = require("./CharacterBuffController"),
	CharacterStatisticsComponent_1 = require("./CharacterStatisticsComponent"),
	CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
var ESkillGenreName,
	EMovementModeName,
	EAttributeId = Protocol_1.Aki.Protocol.KBs;
const MAX_DEBUG_STRING_NUMS = 50;
!(function (t) {
	(t[(t["普攻"] = 0)] = "普攻"),
		(t[(t["蓄力"] = 1)] = "蓄力"),
		(t[(t["E技能"] = 2)] = "E技能"),
		(t[(t["大招"] = 3)] = "大招"),
		(t[(t.QTE = 4)] = "QTE"),
		(t[(t["极限闪避反击"] = 5)] = "极限闪避反击"),
		(t[(t["地面闪避"] = 6)] = "地面闪避"),
		(t[(t["极限闪避"] = 7)] = "极限闪避"),
		(t[(t["被动技能"] = 8)] = "被动技能"),
		(t[(t["战斗幻想技"] = 9)] = "战斗幻想技"),
		(t[(t["探索幻象技"] = 10)] = "探索幻象技"),
		(t[(t["空中闪避"] = 11)] = "空中闪避");
})((ESkillGenreName = ESkillGenreName || {})),
	(function (t) {
		(t[(t.MOVE_None = 0)] = "MOVE_None"),
			(t[(t.MOVE_Walking = 1)] = "MOVE_Walking"),
			(t[(t.MOVE_NavWalking = 2)] = "MOVE_NavWalking"),
			(t[(t.MOVE_Falling = 3)] = "MOVE_Falling"),
			(t[(t.MOVE_Swimming = 4)] = "MOVE_Swimming"),
			(t[(t.MOVE_Flying = 5)] = "MOVE_Flying"),
			(t[(t.MOVE_Custom = 6)] = "MOVE_Custom"),
			(t[(t.MOVE_MAX = 7)] = "MOVE_MAX");
	})((EMovementModeName = EMovementModeName || {}));
class RecordMoveSum {
	constructor() {
		(this.Name = ""),
			(this.ConfigId = 0),
			(this.TargetUniqueId = 0),
			(this.RecordNum = new Map());
	}
	ToCsv() {
		var t = new Array();
		t.push(this.ConfigId.toFixed()),
			t.push(this.Name),
			t.push(this.TargetUniqueId.toFixed());
		for (let r = 0; r < 14; r++) {
			var e = this.RecordNum.get(r);
			t.push(e ? e.toFixed() : "0");
		}
		return t;
	}
}
class RecordDamageSum {
	constructor() {
		(this.ConfigId = 0),
			(this.Name = ""),
			(this.UniqueId = 0),
			(this.DamageSourceConfigId = 0),
			(this.SourceName = ""),
			(this.SourceUniqueId = 0),
			(this.TotalDamage = 0),
			(this.RecordDamage = new Map());
	}
	ToCsvForRole() {
		var t = new Array();
		t.push(this.ConfigId.toFixed()),
			t.push(this.Name),
			t.push(this.DamageSourceConfigId.toFixed()),
			t.push(this.SourceName),
			t.push(this.SourceUniqueId.toFixed()),
			t.push(this.TotalDamage.toFixed());
		for (let r = 0; r < 14; r++) {
			var e = this.RecordDamage.get(r);
			t.push(e ? e.toFixed() : "0");
		}
		return t;
	}
	ToCsvForMonster() {
		var t = new Array();
		t.push(this.ConfigId.toFixed()),
			t.push(this.Name),
			t.push(this.UniqueId.toFixed()),
			t.push(this.DamageSourceConfigId.toFixed()),
			t.push(this.SourceName),
			t.push(this.TotalDamage.toFixed());
		for (let r = 0; r < 14; r++) {
			var e = this.RecordDamage.get(r);
			t.push(e ? e.toFixed() : "0");
		}
		return t;
	}
}
class DamageRecordDsp {
	constructor(t, e, r, o, n, a) {
		(this.TimeStamp = t),
			(this.DamageValue = e),
			(this.QteBegin = r),
			(this.InGame = o),
			(this.OutGame = n),
			(this.OutGameSkill = a);
	}
}
const attributeIdArray = [
	EAttributeId.Proto_Life,
	EAttributeId.Tkn,
	EAttributeId.Proto_Atk,
	EAttributeId.Proto_Crit,
	EAttributeId.Proto_CritDamage,
	EAttributeId.Proto_Def,
	EAttributeId.Proto_EnergyEfficiency,
	EAttributeId.Proto_EnergyMax,
	EAttributeId.Proto_Energy,
	EAttributeId.Proto_AutoAttackSpeed,
	EAttributeId.Proto_CastAttackSpeed,
	EAttributeId.Proto_DamageChangeNormalSkill,
	EAttributeId.Proto_DamageChange,
	EAttributeId.Proto_DamageChangePhantom,
	EAttributeId.Proto_DamageChangeAuto,
	EAttributeId.Proto_DamageChangeCast,
	EAttributeId.Proto_DamageChangeUltra,
	EAttributeId.Proto_DamageChangeQte,
	EAttributeId.Proto_DamageChangePhys,
	EAttributeId.Proto_DamageChangeElement1,
	EAttributeId.Proto_DamageChangeElement2,
	EAttributeId.Proto_DamageChangeElement3,
	EAttributeId.Proto_DamageChangeElement4,
	EAttributeId.Proto_DamageChangeElement5,
	EAttributeId.Proto_DamageChangeElement6,
	EAttributeId.Proto_DamageResistancePhys,
	EAttributeId.Proto_DamageResistanceElement1,
	EAttributeId.Proto_DamageResistanceElement2,
	EAttributeId.Proto_DamageResistanceElement3,
	EAttributeId.Proto_DamageResistanceElement4,
	EAttributeId.Proto_DamageResistanceElement5,
	EAttributeId.Proto_DamageResistanceElement6,
	EAttributeId.Proto_HealChange,
	EAttributeId.Proto_HealedChange,
	EAttributeId.Proto_DamageReduce,
	EAttributeId.Proto_DamageReducePhys,
	EAttributeId.Proto_DamageReduceElement1,
	EAttributeId.Proto_DamageReduceElement2,
	EAttributeId.Proto_DamageReduceElement3,
	EAttributeId.Proto_DamageReduceElement4,
	EAttributeId.Proto_DamageReduceElement5,
	EAttributeId.Proto_DamageReduceElement6,
	EAttributeId.Proto_ToughMax,
	EAttributeId.Proto_Tough,
	EAttributeId.Proto_ToughRecover,
	EAttributeId.Proto_ToughChange,
	EAttributeId.Proto_ToughReduce,
	EAttributeId.Proto_RageMax,
	EAttributeId.Proto_Rage,
	EAttributeId.Proto_RageRecover,
	EAttributeId.Proto_RagePunishTime,
	EAttributeId.Proto_RageChange,
	EAttributeId.Proto_RageReduce,
	EAttributeId.Proto_HardnessMax,
	EAttributeId.Proto_Hardness,
	EAttributeId.Proto_HardnessRecover,
	EAttributeId.Proto_HardnessPunishTime,
	EAttributeId.Proto_HardnessChange,
	EAttributeId.Proto_HardnessReduce,
];
let CharacterGasDebugComponent = (CharacterGasDebugComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.sGr = void 0),
			(this.EnableCollisionDebugDraw = !1),
			(this.aGr = 0),
			(this.hGr = void 0),
			(this.lGr = new Array()),
			(this._Gr = (t) => {
				t.includes("Tag") ||
					((this.aGr = this.aGr + 1),
					this.lGr.unshift("Num " + this.aGr + ": " + t),
					this.lGr.length > 50 && this.lGr.pop());
			}),
			(this.uGr = new Array()),
			(this.cGr = new Array()),
			(this.mGr = (t, e, r, o, n) => {
				this.dGr.unshift(
					EMovementModeName[e] +
						"." +
						o.toFixed() +
						" ->" +
						EMovementModeName[r] +
						"." +
						n.toFixed(),
				);
			}),
			(this.CGr = (t, e) => {
				this.dGr.unshift(
					CharacterUnifiedStateTypes_1.ECharMoveState[t] +
						" ->" +
						CharacterUnifiedStateTypes_1.ECharMoveState[e],
				);
			}),
			(this.gGr = (t, e) => {
				this.dGr.unshift(
					CharacterUnifiedStateTypes_1.ECharPositionState[t] +
						" ->" +
						CharacterUnifiedStateTypes_1.ECharPositionState[e],
				);
			}),
			(this.fGr = (t) => {
				this.dGr.unshift("Set NewBeHit:" + t);
			}),
			(this.dGr = new Array()),
			(this.pGr = (t) => {
				if (CharacterGasDebugComponent_1.vGr) {
					var e = t.Attacker;
					if (this.MGr(e)) {
						var r = new Array(),
							o =
								(r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
								r.push(CharacterGasDebugComponent_1.SGr(Date.now())),
								e.GetComponent(0)),
							n = o.GetEntityType();
						if (n === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
							r.push("角色"), r.push(o.GetPbDataId().toFixed());
							var a = o.Valid ? o.GetRoleId() : 0;
							if (
								!(a =
									ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
										a,
									)?.GetRoleId() ?? 0)
							)
								return;
							(a = (a =
								ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a))
								? ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(a.Name)
								: ""),
								r.push(a);
						} else {
							if (n !== Protocol_1.Aki.Protocol.HBs.Proto_Monster) return;
							r.push("怪物"),
								r.push(o.GetPbDataId().toFixed()),
								(a = PublicUtil_1.PublicUtil.GetConfigTextByKey(
									o.GetBaseInfo()?.TidName ?? "",
								)),
								r.push(a);
						}
						r.push(t.BulletRowName),
							(n = t.BulletDataMain),
							r.push(n?.BulletName ?? "0"),
							r.push(n.Base.DamageId.toString()),
							(o = t.BulletInitParams.SkillId),
							r.push(o ? o.toFixed() : ""),
							(a = e.GetComponent(33)),
							(n = o ? a.GetSkillInfo(o) : void 0),
							r.push(n ? ESkillGenreName[n.SkillGenre] : ""),
							(e = t.Entity.Id),
							CharacterGasDebugComponent_1.EGr.set(e, r),
							CharacterGasDebugComponent_1.yGr.push(e);
					}
				}
			}),
			(this.RecordMove = (t, e, r) => {
				var o, n, a;
				CharacterGasDebugComponent_1.vGr &&
					t?.Valid &&
					this.MGr(this.Entity) &&
					((o = this.Entity),
					(n = new Array()).push(
						CharacterGasDebugComponent_1.SecondsSinceStartup(),
					),
					n.push(CharacterGasDebugComponent_1.SGr(Date.now())),
					o?.GetComponent(83) ? n.push("角色") : n.push("怪物"),
					(a = o?.CheckGetComponent(0).GetPbDataId()),
					n.push(a.toFixed(0)),
					(a = o?.GetComponent(3).Actor.GetName()),
					n.push(a),
					n.push(e.toString()),
					n.push(ESkillGenreName[r]),
					(a = o.GetComponent(156)),
					n.push(a.GetCurrentValue(EAttributeId.Proto_Atk).toFixed()),
					n.push(a.GetCurrentValue(EAttributeId.Proto_Crit).toFixed()),
					n.push(a.GetCurrentValue(EAttributeId.Proto_CritDamage).toFixed()),
					n.push(a.GetCurrentValue(EAttributeId.Proto_Life).toFixed()),
					n.push(a.GetCurrentValue(EAttributeId.Proto_Def).toFixed()),
					n.push(a.GetCurrentValue(EAttributeId.Proto_DamageChange).toFixed()),
					CharacterGasDebugComponent_1.IGr.push(n.join(",")),
					CharacterGasDebugComponent_1.TGr(o, t.Entity, r));
			}),
			(this.LGr = void 0),
			(this.ServerDebugInfoDirty = !1),
			(this.DGr = (t, e) => {
				e = this.Entity.GetComponent(33)?.GetSkillInfo(e);
				var r =
					(CharacterGasDebugComponent_1.RGr ||
						(CharacterGasDebugComponent_1.RGr = new Map()),
					this.Entity.Id);
				if (4 === e.SkillGenre) {
					let t = CharacterGasDebugComponent_1.RGr.get(r);
					t ||
						((t = new PriorityQueue_1.PriorityQueue(
							CharacterGasDebugComponent_1.AGr,
						)),
						CharacterGasDebugComponent_1.RGr.set(r, t));
					var o = new DamageRecordDsp(
						Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.UGr,
						-1,
						!0,
						!1,
						!1,
						!1,
					);
					t.Push(o);
				} else if (12 === e.SkillGenre) {
					let t = CharacterGasDebugComponent_1.RGr.get(r);
					t ||
						((t = new PriorityQueue_1.PriorityQueue(
							CharacterGasDebugComponent_1.AGr,
						)),
						CharacterGasDebugComponent_1.RGr.set(r, t)),
						(o = new DamageRecordDsp(
							Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.UGr,
							-1,
							!1,
							!1,
							!1,
							!0,
						)),
						t.Push(o);
				}
			});
	}
	OnStart() {
		var t = this.Entity.GetComponent(3);
		return (
			(this.sGr = t?.Actor.AbilitySystemComponent),
			CharacterGasDebugComponent_1.PGr(),
			this.xGr(),
			this.wGr(),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharRecordOperate,
				this.RecordMove,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharUseSkill,
				this.DGr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.BulletCreate,
				this.pGr,
			),
			!0
		);
	}
	OnTick(t) {
		if (
			(CharacterGasDebugComponent_1.FEn &&
				Time_1.Time.Frame > CharacterGasDebugComponent_1.VEn &&
				((CharacterGasDebugComponent_1.UGr += 0.001 * t),
				(CharacterGasDebugComponent_1.VEn = Time_1.Time.Frame)),
			this.EnableCollisionDebugDraw)
		) {
			var e = this.Entity.GetComponent(3);
			if (e) {
				var r = e.Actor.K2_GetComponentsByClass(
					UE.CapsuleComponent.StaticClass(),
				);
				for (let t = 0; t < r.Num(); t++) {
					var o = r.Get(t);
					UE.KismetSystemLibrary.DrawDebugCapsule(
						e.Actor,
						o.K2_GetComponentLocation(),
						o.CapsuleHalfHeight,
						o.CapsuleRadius,
						o.K2_GetComponentRotation(),
						new UE.LinearColor(1, 1, 0, 1),
						0,
						1,
					);
				}
			}
		}
	}
	OnEnd() {
		return (
			this.hGr?.EndTask(),
			(this.hGr = void 0),
			this.BGr(),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharRecordOperate,
				this.RecordMove,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharUseSkill,
				this.DGr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.BulletCreate,
				this.pGr,
			),
			!0
		);
	}
	static PGr() {
		this.bGr ||
			((this.bGr = !0),
			GameplayTagUtils_1.GameplayTagUtils.CheckGameplayTagIdUniqueness());
	}
	xGr() {
		this.sGr &&
			((this.hGr =
				UE.AsyncTaskEffectDebugString.ListenForGameplayEffectExecutedDebugString(
					this.sGr,
				)),
			this.hGr?.OnAnyGameplayEffectExecuted.Add(this._Gr));
	}
	GetGeDebugStrings() {
		return this.lGr.join(" ");
	}
	GetTagDebugStrings() {
		return (
			this.Entity.GetComponent(185)?.TagContainer.GetDebugString() ??
			"找不到tag组件"
		);
	}
	GetTagContainerDebugString(t) {
		var e = t.GameplayTags?.Num() ?? 0;
		if (e <= 0) return "";
		let r = "";
		for (let o = 0; o < e; o++) r += t.GameplayTags.Get(o).TagName + " ";
		return r;
	}
	GetBuffEffectDebugString(t) {
		let e = "";
		for (const r of this.Entity.GetComponent(
			157,
		).BuffEffectManager.GetAllEffects())
			this.qGr(t, String(r.BuffId)) &&
				(e += `${r.constructor.name} buffId:${r.BuffId} handle:${r.ActiveHandleId}\n`);
		return e;
	}
	GetShieldDebugString() {
		this.uGr.length = 0;
		var t = this.Entity.GetComponent(64);
		if (t)
			for (var [, e] of t.GetDebugShieldInfo()) {
				var r = e.ShieldValue,
					o = e.Priority,
					e = e.TemplateId;
				this.uGr.push(`Shield magnitude: ${r} priority: ${o} templateId: ` + e);
			}
		return (
			(t = this.Entity.GetComponent(156)?.GetLockDebugString() ?? ""),
			"\n\nShields:\n" + this.uGr.join("\n") + t
		);
	}
	GetAttributeDebugStrings() {
		var t = this.Entity.GetComponent(156);
		if (!t) return "Invalid";
		let e = "";
		for (let a = 1; a < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; a++) {
			var r = t.GetBaseValue(a),
				o = t.GetCurrentValue(a),
				n = Protocol_1.Aki.Protocol.KBs[a];
			CharacterAttributeTypes_1.stateAttributeIds.has(a) || o === r
				? (e += `#${a} ${n}\t= ${o.toFixed(0)}\n`)
				: (e +=
						r < o
							? `#${a} ${n}\t= ${o.toFixed(0)}(+${(o - r).toFixed(0)})\n`
							: `#${a} ${n}\t= ${o.toFixed(0)}(${(o - r).toFixed(0)})\n`);
		}
		return (
			e +
			"\n队伍属性：\n" +
			CharacterGasDebugComponent_1.GetFormationAttributeDebugStrings()
		);
	}
	GetAllAttributeDebugStrings() {
		this.cGr.length = 0;
		var t = this.Entity.GetComponent(156);
		for (let n = 1; n < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; n++) {
			var e = t.GetBaseValue(n),
				r = t.GetCurrentValue(n),
				o = `Attribute ID: ${n}   ${(o = Protocol_1.Aki.Protocol.KBs[n])}  \n    Base: ${e.toFixed()}    Current: ${r.toFixed()} \n`;
			this.cGr.push(o);
		}
		return this.cGr.join("\n");
	}
	static GetFormationAttributeDebugStrings() {
		let t = "";
		for (const a of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
			var e = a.Id,
				r =
					FormationAttributeController_1.FormationAttributeController.GetValue(
						e,
					),
				o =
					FormationAttributeController_1.FormationAttributeController.GetMax(e),
				n =
					FormationAttributeController_1.FormationAttributeController.GetSpeed(
						e,
					);
			t += `#${e} = ${r?.toFixed(0)}/${o?.toFixed(0)} (${n?.toFixed(0)}/s)\n`;
		}
		return t;
	}
	GetAllAttributeDebugInfo() {
		var t = this.Entity.GetComponent(156);
		if (!t) return "Invalid";
		let e = "";
		const r = this.LGr?.dfs;
		var o = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
		if (r) for (const t of r) o[t.Ugs] = t;
		for (let r = 1; r < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; r++) {
			var n = t.GetBaseValue(r),
				a = t.GetCurrentValue(r),
				i = a.toFixed(0);
			let l = (a - n).toFixed(0);
			n <= a && (l = "+" + l), (l = a === n ? "" : `(${l})`);
			var s = Protocol_1.Aki.Protocol.KBs[r].replace("Proto_", "");
			const g = o[r];
			var u = g?.NFn.toFixed(0) ?? "0";
			let h = g ? (g.NFn - g.Pgs).toFixed(0) : "0";
			g && g.NFn > g.Pgs && (h = "+" + h),
				(h = g?.NFn === g?.Pgs ? "" : `(${h})`),
				CharacterAttributeTypes_1.stateAttributeIds.has(r) || a === n
					? (e += `#${r} ${s}\t C:${i} | S:${u}\n`)
					: (e += `#${r} ${s}\t C:${i}(${l}) | S:${u}(${h})\n`);
		}
		e += "\n队伍属性：\n";
		var l = this.LGr?.qFn,
			g = new Array();
		if (l) for (const t of l) g[t.OFn] = t;
		for (const t of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
			var h = t.Id,
				m =
					FormationAttributeController_1.FormationAttributeController.GetValue(
						h,
					),
				C =
					FormationAttributeController_1.FormationAttributeController.GetMax(h),
				d =
					FormationAttributeController_1.FormationAttributeController.GetSpeed(
						h,
					);
			const r = g[h];
			var G = r?.NFn.toFixed(0) ?? "???",
				c = r?.kFn.toFixed(0) ?? "???",
				p = r?.VFn.toFixed(0) ?? "???";
			e += `#${h}\t C:${m?.toFixed(0)}/${C?.toFixed(0)} (${d?.toFixed(0)}/s) | S:${G}/${c} (${p}/s)\n`;
		}
		return e;
	}
	wGr() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Entity,
			EventDefine_1.EEventName.CharMovementModeChanged,
			this.mGr,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.CGr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				this.gGr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnSetNewBeHit,
				this.fGr,
			);
	}
	BGr() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Entity,
			EventDefine_1.EEventName.CharMovementModeChanged,
			this.mGr,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.CGr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				this.gGr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnSetNewBeHit,
				this.fGr,
			);
	}
	GetAllMovementHistory() {
		return 50 < this.dGr.length && this.dGr.pop(), this.dGr.join("\n");
	}
	DebugResetBaseValue(t, e) {
		t >= EAttributeId.Proto_Lv &&
			t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX &&
			this.Entity.GetComponent(156).SetBaseValue(t, e);
	}
	static get IsServerLogOff() {
		return this.GGr;
	}
	static ReceiveSwitchServerLogMode(t) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				20,
				"[CharacterAbilityComponent]Server switch Buff Mode",
				["isClientControl", t],
			),
			(this.GGr = t);
	}
	static RequestSwitchServerMode(t) {
		var e = Protocol_1.Aki.Protocol.vzn.create({
			u9n: t,
			c9n: Protocol_1.Aki.Protocol.kOs.oTs,
		});
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				20,
				"[CharacterDamageComponent]Request Buff Mode",
				["isClientControl", t],
			),
			Net_1.Net.Call(17453, e, (t) => {
				this.ReceiveSwitchServerLogMode(t.u9n);
			});
	}
	static SecondsSinceStartup() {
		return (
			Time_1.Time.WorldTimeSeconds -
			CharacterGasDebugComponent_1.NGr -
			CharacterGasDebugComponent_1.UGr
		).toFixed(2);
	}
	static SetDistanceMax(t) {}
	static BeginRecord() {
		(this.UGr = 0),
			(this.vGr = !0),
			(this.NGr = Time_1.Time.WorldTimeSeconds),
			(this.OGr = Time_1.Time.ServerTimeStamp),
			this.SetDamageRecord(!0),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			(CharacterGasDebugComponent_1.RGr = void 0),
			CharacterGasDebugComponent_1.kGr(
				Global_1.Global.BaseCharacter.EntityId,
				!0,
				!1,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAbsoluteTimeStop,
				this.FGr,
			);
	}
	static EndRecord() {
		var t;
		return this.vGr
			? ((this.vGr = !1),
				this.SetDamageRecord(!1),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnChangeRole,
					this.xie,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnAbsoluteTimeStop,
					this.FGr,
				),
				(t = this.VGr()),
				this.CleanupRecord(),
				t)
			: "";
	}
	static VGr() {
		var t = new Array(),
			e = "";
		let r = "";
		UE.KuroStaticLibrary.SaveStringToFile(
			"X秒,当前时间,对象,对象ID,对象名称,技能ID,技能类型,攻击,暴击,爆伤,生命,防御,伤害加成\n" +
				this.IGr.join("\n"),
			UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "SkillRecord.csv",
			!0,
		);
		var o = new Array(),
			n =
				"X秒,当前时间,对象,对象ID,对象名称,子弹ID,子弹名称,伤害ID,技能ID,技能类型,子弹是否命中\n";
		for (const t of this.yGr) {
			var a = this.EGr.get(t);
			a.push(
				ModelManager_1.ModelManager.BulletModel.IsBulletHit(t) ? "1" : "0",
			),
				o.push(a.join(","));
		}
		UE.KuroStaticLibrary.SaveStringToFile(
			n + o.join("\n"),
			UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "BulletRecord.csv",
			!0,
		),
			(n =
				"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,Config ID,攻击,暴击,爆伤,生命,防御,伤害加成\n"),
			UE.KuroStaticLibrary.SaveStringToFile(
				n + this.HGr.join("\n"),
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"DamageRecord.csv",
				!0,
			),
			(n =
				"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,是否暴击,唯一ID,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,白条倍率,白条倍率百分比0,白条倍率百分比1,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
			UE.KuroStaticLibrary.SaveStringToFile(
				n + this.jGr.join("\n"),
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"DamageRecord_Attr.csv",
				!0,
			),
			(n =
				"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,是否暴击,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
			UE.KuroStaticLibrary.SaveStringToFile(
				n + this.WGr.join("\n"),
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"DamageRecord_Snipeshot.csv",
				!0,
			),
			(r =
				"X秒,当前时间,对象,对象ID,对象名称,BuffId,Buff名称,添加or删除\n" +
				this.KGr.join("\n")),
			UE.KuroStaticLibrary.SaveStringToFile(
				r,
				UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "BuffRecord.csv",
				!0,
			);
		for (const e of this.QGr.values()) t.push(e.ToCsv().join(","));
		(r =
			"对象ID,对象名称,唯一Id,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n" +
			t.join("\n")),
			UE.KuroStaticLibrary.SaveStringToFile(
				r,
				UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "MoveSum.csv",
				!0,
			),
			(t.length = 0),
			(e += r + "\n"),
			(n =
				"角色ID,角色名称,受伤来源ConfigId,受伤来源名称,受伤来源唯一ID,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n");
		for (const e of this.XGr.values()) t.push(e.ToCsvForRole().join(","));
		(r = n + t.join("\n")),
			UE.KuroStaticLibrary.SaveStringToFile(
				r,
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"RoleDamageSum.csv",
				!0,
			),
			(t.length = 0),
			(e += r + "\n"),
			(n =
				"怪物ConfigID,怪物名称,怪物唯一Id,攻击者ConfigId,攻击者名称,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n");
		for (const e of this.$Gr.values()) t.push(e.ToCsvForMonster().join(","));
		(r = n + t.join("\n")),
			UE.KuroStaticLibrary.SaveStringToFile(
				r,
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"MonsterDamageSum.csv",
				!0,
			),
			(t.length = 0),
			(e += r + "\n"),
			(r = "");
		var i =
			Time_1.Time.WorldTimeSeconds -
			CharacterGasDebugComponent_1.NGr -
			CharacterGasDebugComponent_1.UGr;
		let s = 0;
		for (; i >= s; ) (r += ",'" + s.toString() + "s'"), (s += 0.5);
		let u = "";
		n = (0, puerts_1.$ref)(u);
		var l =
				(UE.FileSystemOperation.ReadFile(
					UE.KismetSystemLibrary.GetProjectDirectory() +
						"../Config/ResConfig/RoleDspTpl.txt",
					n,
				),
				(u = (u = (0, puerts_1.$unref)(n)).replace("TPL_XAXIS_VALUES", r)),
				new StringBuilder_1.StringBuilder()),
			g = new Map(),
			h = new Map(),
			m = new Map(),
			C = new Map(),
			d = new Map(),
			G = new Map(),
			c = new Map(),
			p = new Map(),
			_ = new Map();
		for (s = 0; i >= s; ) {
			for (var [f, E] of CharacterGasDebugComponent_1.RGr) {
				C.has(f) || C.set(f, new Array()),
					d.has(f) || d.set(f, new Array()),
					G.has(f) || G.set(f, new Array()),
					c.has(f) || c.set(f, new Array()),
					p.has(f) || p.set(f, new Array()),
					_.has(f) || _.set(f, new Array()),
					g.has(f) || g.set(f, 0),
					h.has(f) || h.set(f, 0),
					m.has(f) || m.set(f, !1);
				let t = !1,
					e = !1;
				for (; !E.Empty; ) {
					var S = E.Top;
					if (!(S.TimeStamp <= this.NGr + s)) break;
					0 < S.DamageValue
						? g.set(f, g.get(f) + S.DamageValue)
						: S.InGame
							? m.set(f, !0)
							: S.OutGame
								? m.set(f, !1)
								: S.QteBegin
									? (t = !0)
									: S?.OutGameSkill && (e = !0),
						E.Pop(),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Character", 21, "打印时间", [
								"time",
								S.TimeStamp,
							]);
				}
				C.get(f).push(g.get(f)),
					d.get(f).push(m.get(f) ? "-10" : "'-'"),
					G.get(f).push(t ? "-20" : "'-'"),
					c.get(f).push(e ? "-30" : "'-'");
				var D = h.get(f);
				_.get(f).push(0 < D ? g.get(f) / D : 0),
					p.get(f).push(0 < s ? g.get(f) / s : 0),
					m.get(f) && h.set(f, h.get(f) + 0.5);
			}
			s += 0.5;
		}
		var b,
			y,
			v,
			I,
			T,
			A,
			P,
			M,
			U,
			R,
			F,
			B,
			N,
			L,
			k,
			w,
			x,
			V = [],
			j = [],
			O = [];
		for ([b, y] of C) {
			var q = EntitySystem_1.EntitySystem.Get(b);
			q?.Valid
				? (V.push(b),
					(q = (q = q.GetComponent(0)).Valid ? q.GetRoleId() : 0),
					(q =
						ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
							q,
						)?.GetRoleId())
						? ((q = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(q)),
							(q = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
								q.Name,
							)),
							j.push(q),
							l.Append(
								StringUtils_1.StringUtils.Format(
									"{name: '{0}伤害', type: 'line', data: [{1}],},",
									q,
									y.join(","),
								),
							))
						: O.push(b))
				: O.push(b);
		}
		for ([v, I] of p)
			O.includes(v) ||
				((T = V.indexOf(v)),
				l.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}绝对DPS', type: 'line', data: [{1}],},",
						j[T],
						I.join(","),
					),
				));
		for ([A, P] of _)
			O.includes(A) ||
				((M = V.indexOf(A)),
				l.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}站场DPS', type: 'line', data: [{1}],},",
						j[M],
						P.join(","),
					),
				));
		for ([U, R] of d)
			O.includes(U) ||
				((F = V.indexOf(U)),
				l.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}在场上', type: 'line', data: [{1}],},",
						j[F],
						R.join(","),
					),
				));
		for ([B, N] of G)
			O.includes(B) ||
				((L = V.indexOf(B)),
				l.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}QTE', type: 'line', data: [{1}],},",
						j[L],
						N.join(","),
					),
				));
		for ([k, w] of c)
			O.includes(k) ||
				((x = V.indexOf(k)),
				l.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}退场技', type: 'line', data: [{1}],},",
						j[x],
						w.join(","),
					),
				));
		return (
			(u = u.replace("CONTENT_SERIES", l.ToString())),
			UE.KuroStaticLibrary.SaveStringToFile(
				u,
				UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDsp.html",
				!0,
			),
			e
		);
	}
	MGr(t) {
		return CharacterStatisticsComponent_1.CharacterStatisticsComponent.IsInRecordArea(
			t,
		);
	}
	static RecordDamage(t, e, r, o) {
		var n = new Array();
		if ((r = (n.push(r), n.push(o), CharacterGasDebugComponent_1.YGr(t)))) {
			n.push(r.Type),
				n.push(r.ConfigId),
				n.push(r.Name),
				t.GetComponent(83) ? n.push("角色") : n.push("怪物"),
				n.push(MathUtils_1.MathUtils.LongToBigInt(e.STs).toString());
			let i,
				s = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
					t,
					MathUtils_1.MathUtils.LongToBigInt(e.wVn).toString(),
					!1,
				);
			s ||
				((o =
					ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
						t.Id,
						1,
					)),
				(i = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
					(s = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
						i,
						MathUtils_1.MathUtils.LongToBigInt(e.wVn).toString(),
					))),
				n.push(s?.BulletName ?? ""),
				n.push(e.ETs.toFixed()),
				n.push(e.vkn.toFixed());
			let u = t.GetComponent(33)?.GetSkillInfo(e.vkn);
			(u = u || i?.GetComponent(33)?.GetSkillInfo(e.vkn)),
				n.push(u?.SkillName?.toString()),
				n.push(MathUtils_1.MathUtils.LongToBigInt(e.m9n.rkn).toString());
			r = t?.CheckGetComponent(0).GetPbDataId().toFixed();
			var a = (n.push(r), n.length);
			for (const t of e.TTs.vTs)
				t.Ugs === EAttributeId.Proto_Atk
					? (n[a] = t.NFn.toFixed())
					: t.Ugs === EAttributeId.Proto_Crit
						? (n[a + 1] = t.NFn.toFixed())
						: t.Ugs === EAttributeId.Proto_CritDamage
							? (n[a + 2] = t.NFn.toFixed())
							: t.Ugs === EAttributeId.Proto_Life
								? (n[a + 3] = t.NFn.toFixed())
								: t.Ugs === EAttributeId.Proto_Def
									? (n[a + 4] = t.NFn.toFixed())
									: t.Ugs === EAttributeId.Proto_DamageChange &&
										(n[a + 5] = t.NFn.toFixed());
			CharacterGasDebugComponent_1.HGr.push(n.join(",")),
				(o = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
					MathUtils_1.MathUtils.LongToNumber(e.TTs.rkn),
				)),
				(r = EntitySystem_1.EntitySystem.Get(o)),
				CharacterGasDebugComponent_1.JGr(r, t, e.ETs, u?.SkillGenre);
		}
	}
	static JGr(t, e, r, o) {
		let n = this.XGr;
		t?.GetComponent(83) || (n = this.$Gr);
		var a,
			i = t.Id.toFixed() + e.Id.toFixed(),
			s = n.get(i);
		s
			? ((s.TotalDamage += r),
				(a = s.RecordDamage.get(o) ?? 0),
				s.RecordDamage.set(o, a + r))
			: ((s = new RecordDamageSum()),
				(a = t?.CheckGetComponent(0).GetPbDataId()),
				(s.ConfigId = a ?? 0),
				(s.UniqueId = t.Id),
				(s.Name = t?.GetComponent(3).Actor.GetName() ?? ""),
				(a = e?.CheckGetComponent(0).GetPbDataId()),
				(s.DamageSourceConfigId = a),
				(s.SourceName = e?.GetComponent(3).Actor.GetName()),
				(s.SourceUniqueId = e?.Id),
				(s.TotalDamage = r),
				(t = s.RecordDamage.get(o) ?? 0),
				s.RecordDamage.set(o, t + r),
				n.set(i, s));
	}
	static TGr(t, e, r) {
		var o = t?.GetComponent(3).Actor.GetName() ?? "",
			n =
				((t = t?.CheckGetComponent(0).GetPbDataId() ?? 0),
				(e = e?.Id ?? 0),
				this.QGr.get(t + e));
		n
			? n.RecordNum.set(r, n.RecordNum.get(r) + 1)
			: (((n = new RecordMoveSum()).ConfigId = t),
				(n.Name = o),
				(n.TargetUniqueId = e),
				n.RecordNum.set(r, 1),
				this.QGr.set(t + e, n));
	}
	qGr(t, e) {
		return !t || e.includes(t) || t.includes(e);
	}
	GetServerBuffString() {
		if (!this.LGr?.aTs?.zps) return "";
		let t = "";
		for (const n of this.LGr.aTs.zps) {
			var e = MathUtils_1.MathUtils.LongToBigInt(n.JFn),
				r = MathUtils_1.MathUtils.LongToBigInt(n.jVn).toString(),
				o = (o = CharacterBuffController_1.default.GetBuffDefinition(e))
					? o.Desc
					: "";
			t += this.zGr(
				e.toString(),
				n.y4n,
				o,
				n.QVn,
				n.r3n,
				n.rVn,
				r,
				n.Ivs,
				n.Skn,
			);
		}
		if (!this.LGr?.jEs) return "";
		for (const e of this.LGr.jEs) {
			var n = MathUtils_1.MathUtils.LongToBigInt(e.Ekn),
				a = MathUtils_1.MathUtils.LongToBigInt(e.jVn).toString(),
				i = (i = CharacterBuffController_1.default.GetBuffDefinition(n))
					? i.Desc
					: "";
			t += this.zGr(
				"编 " + n.toString(),
				e.E4n,
				i,
				e.QVn,
				e.r3n,
				e.rVn,
				a,
				e.Ivs ?? 0,
				e.Skn ?? 0,
			);
		}
		if (0 < this.LGr.aTs.Zps.length) {
			t += "\nCD : \n";
			for (const e of this.LGr.aTs.Zps)
				if (!(e.uSs.length <= 0)) {
					t +=
						"[" + MathUtils_1.MathUtils.LongToBigInt(e.JFn).toString() + "] ";
					for (const r of e.uSs) t += r.toFixed() + ", ";
				}
		}
		return t;
	}
	GetServerBuffRemainDuration(t) {
		if (!this.LGr?.aTs?.zps) return -1;
		let e = -1;
		for (const r of this.LGr.aTs.zps)
			if (r.y4n === t) {
				e = r.Ivs;
				break;
			}
		return e;
	}
	GetServerBuffTotalDuration(t) {
		if (!this.LGr?.aTs?.zps) return -1;
		let e = 0;
		for (const r of this.LGr.aTs.zps)
			if (r.y4n === t) {
				e = r.Skn;
				break;
			}
		return e;
	}
	zGr(t, e, r, o, n, a, i, s, u) {
		return (
			"[" +
			t +
			", " +
			e +
			"] " +
			o +
			"层," +
			n +
			"级," +
			(a ? "激活. " : "失效. ") +
			"施:" +
			i +
			". 时:" +
			s.toFixed(1) +
			"/" +
			u.toFixed() +
			". " +
			r +
			"\n"
		);
	}
	GetServerTagString() {
		let t = "";
		if (this.LGr?.hTs)
			for (const e of this.LGr.hTs)
				t =
					t +
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.Ukn)
						.TagName +
					" " +
					e.I5n.toString() +
					"\n";
		if (this.LGr?._Ts)
			for (const e of this.LGr._Ts)
				t =
					t +
					"[编] " +
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.Ukn)
						.TagName +
					" " +
					e.I5n.toString() +
					"\n";
		return t;
	}
	GetServerAttributeString() {
		if (!this.LGr?.dfs) return "";
		let t = "";
		for (const e of this.LGr.dfs)
			t =
				t +
				e.Ugs +
				" " +
				Protocol_1.Aki.Protocol.KBs[e.Ugs] +
				":[" +
				e.Pgs.toString() +
				"][" +
				e.NFn.toString() +
				"]\n";
		t += "\n队伍属性：\n";
		for (const e of this.LGr.qFn)
			t =
				t +
				e.OFn.toString() +
				"=" +
				e.NFn.toString() +
				"/" +
				e.kFn.toString() +
				"(" +
				e.VFn.toString() +
				"/s)\n";
		return t;
	}
	GetServerPartString() {
		if (!this.LGr?.lTs?.oSs) return "";
		let t = "";
		for (const e of this.LGr.lTs.oSs)
			t +=
				e.o9n +
				" :  " +
				e.d9n.toFixed(1) +
				" / " +
				e.Tkn.toFixed(1) +
				", " +
				e.Lkn +
				"\n";
		return t;
	}
	GetServerHateString() {
		if (!this.LGr?.efs) return "";
		let t = "";
		for (const e of this.LGr.efs)
			t +=
				MathUtils_1.MathUtils.LongToBigInt(e.rkn) +
				" : " +
				e._4n.toFixed(1) +
				"\n";
		return t;
	}
	GetServerShieldString() {
		if (!this.LGr?.Rps) return "";
		let t = "护盾总值: " + this.LGr.Rps.tSs + "\n";
		for (const e of this.LGr.Rps.eSs)
			t +=
				"[" +
				e.R5n +
				"," +
				e.E4n +
				"] " +
				(e.ZMs ? "生效" : "失效") +
				", " +
				e.YMs +
				"," +
				e.zMs +
				"," +
				e.JMs +
				"\n";
		return t;
	}
	ServerDebugInfoRequest() {
		var t = Protocol_1.Aki.Protocol.Pzn.create();
		(t.rkn = MathUtils_1.MathUtils.NumberToLong(
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
				this.Entity.Id,
			),
		)),
			Net_1.Net.Call(12552, t, (t) => {
				t && ((this.LGr = t), (this.ServerDebugInfoDirty = !0));
			});
	}
	OnBuffAdded(t) {
		CharacterGasDebugComponent_1.vGr &&
			(t = this.ZGr(t, "添加")) &&
			CharacterGasDebugComponent_1.KGr.push(t.join(","));
	}
	OnBuffRemoved(t) {
		CharacterGasDebugComponent_1.vGr &&
			(t = this.ZGr(t, "删除")) &&
			CharacterGasDebugComponent_1.KGr.push(t.join(","));
	}
	ZGr(t, e) {
		var r,
			o = new Array();
		if (
			(r = (r =
				(o.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
				o.push(CharacterGasDebugComponent_1.SGr(Date.now())),
				t.GetInstigator()))
				? CharacterGasDebugComponent_1.YGr(r)
				: void 0)
		)
			return (
				o.push(r.Type),
				o.push(r.ConfigId),
				o.push(r.Name),
				o.push(t.Config.Id.toString()),
				o.push(t.Config.Desc),
				o.push(e),
				o
			);
	}
	static YGr(t) {
		var e,
			r = (t = t.GetComponent(0)).GetEntityType();
		return r === Protocol_1.Aki.Protocol.HBs.Proto_Player
			? ((e = t.Valid ? t.GetRoleId() : 0),
				(e =
					ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.GetRoleId())
					? ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
						{
							Name: ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
								e.Name,
							),
							Type: "角色",
							ConfigId: t.GetPbDataId().toFixed(),
						})
					: void 0)
			: r === Protocol_1.Aki.Protocol.HBs.Proto_Monster
				? {
						Name: PublicUtil_1.PublicUtil.GetConfigTextByKey(
							t.GetBaseInfo()?.TidName ?? "",
						),
						Type: "怪物",
						ConfigId: t.GetPbDataId().toFixed(),
					}
				: void 0;
	}
	static SetDamageRecord(t) {
		var e = Protocol_1.Aki.Protocol.Debug.qXn.create();
		(e.C9n = t),
			Net_1.Net.Call(8311, e, (t) => {
				t &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("CombatInfo", 21, "", ["Response", t]);
			});
	}
	static OnDamageRecordNotify(t, e) {
		TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then((r) => {
			r && r.RoleTest && r.RoleTest.RecordDamageNotify(t, e);
		});
		var r,
			o,
			n = EntitySystem_1.EntitySystem.Get(
				ModelManager_1.ModelManager.CreatureModel.GetEntityId(
					MathUtils_1.MathUtils.LongToNumber(e.m9n.rkn),
				),
			);
		n.GetComponent(24)?.GetStatisticsEnable() &&
			((r = (
				0.001 *
					(MathUtils_1.MathUtils.LongToNumber(e.MTs) -
						CharacterGasDebugComponent_1.OGr) -
				CharacterGasDebugComponent_1.UGr
			).toFixed(2)),
			(o = this.SGr(e.MTs)),
			this.RecordDamage(n, e, r, o),
			this.eNr(n, e, r, o),
			this.tNr(n, e, r, o),
			this.iNr(n, e));
	}
	static iNr(t, e) {
		var r = t.GetComponent(0);
		if (r && r.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
			this.RGr || (this.RGr = new Map()), (r = t.Id);
			let o = this.RGr.get(r);
			o ||
				((o = new PriorityQueue_1.PriorityQueue(this.AGr)), this.RGr.set(r, o)),
				(t = new DamageRecordDsp(
					Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.UGr,
					e.ETs,
					!1,
					!1,
					!1,
					!1,
				)),
				o.Push(t);
		}
	}
	static kGr(t, e, r) {
		CharacterGasDebugComponent_1.RGr ||
			(CharacterGasDebugComponent_1.RGr = new Map());
		let o = CharacterGasDebugComponent_1.RGr.get(t);
		o ||
			((o = new PriorityQueue_1.PriorityQueue(
				CharacterGasDebugComponent_1.AGr,
			)),
			CharacterGasDebugComponent_1.RGr.set(t, o)),
			(t = new DamageRecordDsp(
				Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.UGr,
				-1,
				!1,
				e,
				r,
				!1,
			)),
			o.Push(t);
	}
	static tNr(t, e, r, o) {
		var n = new Array();
		if ((r = (n.push(r), n.push(o), CharacterGasDebugComponent_1.YGr(t)))) {
			n.push(r.Type),
				n.push(r.ConfigId),
				n.push(r.Name),
				n.push(
					e.yTs === Protocol_1.Aki.Protocol.yTs.Proto_FromBullet
						? "子弹"
						: "Buff",
				),
				n.push(MathUtils_1.MathUtils.LongToBigInt(e.STs).toString());
			let h,
				m = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
					t,
					MathUtils_1.MathUtils.LongToBigInt(e.wVn).toString(),
					!1,
				);
			m ||
				((o =
					ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
						t.Id,
						1,
					)),
				(h = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
					(m = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
						h,
						MathUtils_1.MathUtils.LongToBigInt(e.wVn).toString(),
					))),
				n.push(m?.BulletName ?? ""),
				n.push(e.ETs.toFixed()),
				n.push(e.vkn.toFixed());
			let C = t.GetComponent(33)?.GetSkillInfo(e.vkn)?.SkillName;
			(C = C || h?.GetComponent(33)?.GetSkillInfo(e.vkn)?.SkillName),
				n.push(C?.toString() ?? ""),
				n.push(MathUtils_1.MathUtils.LongToBigInt(e.m9n.rkn).toString()),
				n.push(e.ITs ? "1" : "0");
			(r = n.length),
				(o =
					(this.oNr(e.TTs.pTs, n, r),
					this.oNr(e.m9n.pTs, n, r + 59),
					DamageById_1.configDamageById.GetConfig(
						MathUtils_1.MathUtils.LongToBigInt(e.STs),
					))),
				(t = e.n9n);
			var a =
					((n[r + 118] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						o.ToughLv,
						t,
						0,
					).toString()),
					(n[r + 119] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						o.Energy,
						t,
						0,
					).toString()),
					(n[r + 120] = o.ElementPowerType.toString()),
					(n[r + 121] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						o.ElementPower,
						t,
						0,
					).toString()),
					new Array()),
				i = new Array();
			for (const t of e.m9n.fTs) {
				var s = MathUtils_1.MathUtils.LongToBigInt(t),
					u = CharacterBuffController_1.default.GetBuffDefinition(s);
				a.push(u.Desc), i.push(s);
			}
			(n[r + 122] = i.join("|")),
				(n[r + 123] = a.join("|")),
				(a.length = 0),
				(i.length = 0);
			for (const t of e.TTs.fTs) {
				var l = MathUtils_1.MathUtils.LongToBigInt(t),
					g = CharacterBuffController_1.default.GetBuffDefinition(l);
				a.push(g.Desc), i.push(l);
			}
			(n[r + 124] = i.join("|")),
				(n[r + 125] = a.join("|")),
				(o = n.join(",")),
				this.WGr.push(o),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Recorder", 21, "结算信息Snapshot", ["Result", o]);
		}
	}
	static SGr(t) {
		return (
			(t = new Date(MathUtils_1.MathUtils.LongToNumber(t))),
			StringUtils_1.StringUtils.Format(
				"{0}月{1}日{2}:{3}:{4}:{5}",
				t.getMonth().toString(),
				t.getDate().toString(),
				t.getHours().toString(),
				t.getMinutes().toString(),
				t.getSeconds().toString(),
				t.getMilliseconds().toString(),
			)
		);
	}
	static eNr(t, e, r, o) {
		var n = new Array();
		if ((r = (n.push(r), n.push(o), CharacterGasDebugComponent_1.YGr(t)))) {
			n.push(r.Type),
				n.push(r.ConfigId),
				n.push(r.Name),
				n.push(
					e.yTs === Protocol_1.Aki.Protocol.yTs.Proto_FromBullet
						? "子弹"
						: "Buff",
				),
				n.push(MathUtils_1.MathUtils.LongToBigInt(e.STs).toString());
			let m,
				C = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
					t,
					MathUtils_1.MathUtils.LongToBigInt(e.wVn).toString(),
					!1,
				);
			C ||
				((o =
					ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
						t.Id,
						1,
					)),
				(m = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
					(C = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
						m,
						MathUtils_1.MathUtils.LongToBigInt(e.wVn).toString(),
					))),
				n.push(C?.BulletName ?? ""),
				n.push(e.ETs.toFixed()),
				n.push(e.vkn.toFixed());
			let d = t.GetComponent(33)?.GetSkillInfo(e.vkn)?.SkillName;
			(d = d || m?.GetComponent(33)?.GetSkillInfo(e.vkn)?.SkillName),
				n.push(d?.toString() ?? ""),
				n.push(e.ITs ? "1" : "0"),
				n.push(MathUtils_1.MathUtils.LongToBigInt(e.m9n.rkn).toString());
			var a = n.length;
			let G;
			1 ===
			(r =
				(CharacterGasDebugComponent_1.rNr(e.TTs.vTs, n, a, a + 122),
				DamageById_1.configDamageById.GetConfig(
					MathUtils_1.MathUtils.LongToBigInt(e.STs),
				))).ElementPowerType
				? (G = EAttributeId.Proto_ElementPower1)
				: 2 === r.ElementPowerType
					? (G = EAttributeId.Proto_ElementPower2)
					: 3 === r.ElementPowerType
						? (G = EAttributeId.Proto_ElementPower3)
						: 4 === r.ElementPowerType
							? (G = EAttributeId.Proto_ElementPower4)
							: 5 === r.ElementPowerType
								? (G = EAttributeId.Proto_ElementPower5)
								: 6 === r.ElementPowerType &&
									(G = EAttributeId.Proto_ElementPower6),
				(n[a + 120] = r.ElementPowerType.toString());
			for (const t of e.m9n.vTs)
				t.Ugs === EAttributeId.Proto_ToughChange
					? (n[a + 118] = t.NFn.toFixed())
					: t.Ugs === EAttributeId.Proto_Energy
						? (n[a + 119] = t.NFn.toFixed())
						: G && t.Ugs === G && (n[a + 121] = t.NFn.toFixed());
			CharacterGasDebugComponent_1.rNr(e.m9n.vTs, n, a + 59, a + 181);
			o = e.n9n;
			var i =
					((n[a + 240] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.HardnessLv,
						o,
						0,
					).toString()),
					(n[a + 241] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.Percent0,
						o,
						0,
					).toString()),
					(n[a + 242] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.Percent1,
						o,
						0,
					).toString()),
					(n[a + 243] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.ToughLv,
						o,
						0,
					).toString()),
					(n[a + 244] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.Energy,
						o,
						0,
					).toString()),
					(n[a + 245] = r.ElementPowerType.toString()),
					(n[a + 246] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.ElementPower,
						o,
						0,
					).toString()),
					new Array()),
				s = new Array();
			for (const t of e.m9n.fTs) {
				var u = MathUtils_1.MathUtils.LongToBigInt(t),
					l = CharacterBuffController_1.default.GetBuffDefinition(u);
				i.push(l.Desc), s.push(u);
			}
			(n[a + 247] = s.join("|")),
				(n[a + 248] = i.join("|")),
				(i.length = 0),
				(s.length = 0);
			for (const t of e.TTs.fTs) {
				var g = MathUtils_1.MathUtils.LongToBigInt(t),
					h = CharacterBuffController_1.default.GetBuffDefinition(g);
				i.push(h.Desc), s.push(g);
			}
			(n[a + 249] = s.join("|")),
				(n[a + 250] = i.join("|")),
				(t = n.join(",")),
				this.jGr.push(t),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Recorder", 21, "结算信息Attr", ["Result", t]);
		}
	}
	static rNr(t, e, r, o) {
		for (const n of t)
			for (let t = 0, a = attributeIdArray.length; t < a; t++)
				if (n.Ugs === attributeIdArray[t]) {
					(e[r + t] = (0 < n.NFn ? n.NFn : n.Pgs).toString()),
						(e[o + t] = n.Pgs.toString());
					break;
				}
	}
	static oNr(t, e, r) {
		for (const o of t)
			for (let t = 0, n = attributeIdArray.length; t < n; t++)
				if (o.Ugs === attributeIdArray[t]) {
					e[r + t] = (0 < o.NFn ? o.NFn : o.Pgs).toString();
					break;
				}
	}
	static CleanupRecord() {
		(CharacterGasDebugComponent_1.FEn = !1),
			(CharacterGasDebugComponent_1.UGr = 0),
			(CharacterGasDebugComponent_1.IGr.length = 0),
			(CharacterGasDebugComponent_1.HGr.length = 0),
			CharacterGasDebugComponent_1.QGr.clear(),
			CharacterGasDebugComponent_1.XGr.clear(),
			CharacterGasDebugComponent_1.$Gr.clear(),
			CharacterGasDebugComponent_1.EGr.clear(),
			(CharacterGasDebugComponent_1.yGr.length = 0),
			(CharacterGasDebugComponent_1.KGr.length = 0),
			CharacterGasDebugComponent_1.RGr?.clear(),
			(CharacterGasDebugComponent_1.WGr.length = 0),
			(CharacterGasDebugComponent_1.jGr.length = 0);
	}
});
(CharacterGasDebugComponent.bGr = !1),
	(CharacterGasDebugComponent.GGr = !1),
	(CharacterGasDebugComponent.vGr = !1),
	(CharacterGasDebugComponent.NGr = 0),
	(CharacterGasDebugComponent.OGr = 0),
	(CharacterGasDebugComponent.IGr = new Array()),
	(CharacterGasDebugComponent.HGr = new Array()),
	(CharacterGasDebugComponent.QGr = new Map()),
	(CharacterGasDebugComponent.XGr = new Map()),
	(CharacterGasDebugComponent.$Gr = new Map()),
	(CharacterGasDebugComponent.EGr = new Map()),
	(CharacterGasDebugComponent.yGr = new Array()),
	(CharacterGasDebugComponent.Pt = "Statistics/FightDataRecord/"),
	(CharacterGasDebugComponent.KGr = new Array()),
	(CharacterGasDebugComponent.RGr = void 0),
	(CharacterGasDebugComponent.AGr = (t, e) => t.TimeStamp - e.TimeStamp),
	(CharacterGasDebugComponent.xie = (t, e) => {
		CharacterGasDebugComponent_1.kGr(t.Id, !0, !1),
			e && CharacterGasDebugComponent_1.kGr(e.Id, !1, !0);
	}),
	(CharacterGasDebugComponent.WGr = new Array()),
	(CharacterGasDebugComponent.jGr = new Array()),
	(CharacterGasDebugComponent.FEn = !1),
	(CharacterGasDebugComponent.UGr = 0),
	(CharacterGasDebugComponent.VEn = 0),
	(CharacterGasDebugComponent.FGr = (t) => {
		CharacterGasDebugComponent_1.FEn = t;
	}),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("E2n")],
		CharacterGasDebugComponent,
		"OnDamageRecordNotify",
		null,
	),
	(CharacterGasDebugComponent = CharacterGasDebugComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(20)],
			CharacterGasDebugComponent,
		)),
	(exports.CharacterGasDebugComponent = CharacterGasDebugComponent);

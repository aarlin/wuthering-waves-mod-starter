"use strict";
var CharacterGasDebugComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, a) {
			var i,
				n = arguments.length,
				o =
					n < 3
						? e
						: null === a
							? (a = Object.getOwnPropertyDescriptor(e, r))
							: a;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				o = Reflect.decorate(t, e, r, a);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(i = t[s]) &&
						(o = (n < 3 ? i(o) : 3 < n ? i(e, r, o) : i(e, r)) || o);
			return 3 < n && o && Object.defineProperty(e, r, o), o;
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
	EAttributeId = Protocol_1.Aki.Protocol.Bks;
const Info_1 = require("../../../../../../Core/Common/Info"),
	MAX_DEBUG_STRING_NUMS = 50;
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
		var e = new Array();
		e.push(this.ConfigId.toFixed()),
			e.push(this.Name),
			e.push(this.TargetUniqueId.toFixed());
		for (let t = 0; t < 14; t++) {
			var r = this.RecordNum.get(t);
			e.push(r ? r.toFixed() : "0");
		}
		return e;
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
		var e = new Array();
		e.push(this.ConfigId.toFixed()),
			e.push(this.Name),
			e.push(this.DamageSourceConfigId.toFixed()),
			e.push(this.SourceName),
			e.push(this.SourceUniqueId.toFixed()),
			e.push(this.TotalDamage.toFixed());
		for (let t = 0; t < 14; t++) {
			var r = this.RecordDamage.get(t);
			e.push(r ? r.toFixed() : "0");
		}
		return e;
	}
	ToCsvForMonster() {
		var e = new Array();
		e.push(this.ConfigId.toFixed()),
			e.push(this.Name),
			e.push(this.UniqueId.toFixed()),
			e.push(this.DamageSourceConfigId.toFixed()),
			e.push(this.SourceName),
			e.push(this.TotalDamage.toFixed());
		for (let t = 0; t < 14; t++) {
			var r = this.RecordDamage.get(t);
			e.push(r ? r.toFixed() : "0");
		}
		return e;
	}
}
class DamageRecordDsp {
	constructor(t, e, r, a, i, n) {
		(this.TimeStamp = t),
			(this.DamageValue = e),
			(this.QteBegin = r),
			(this.InGame = a),
			(this.OutGame = i),
			(this.OutGameSkill = n);
	}
}
const attributeIdArray = [
	EAttributeId.Proto_Life,
	EAttributeId.e5n,
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
let CharacterGasDebugComponent =
	(CharacterGasDebugComponent_1 = class CharacterGasDebugComponent extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.qqr = void 0),
				(this.EnableCollisionDebugDraw = !1),
				(this.Gqr = 0),
				(this.Nqr = void 0),
				(this.Oqr = new Array()),
				(this.kqr = (t) => {
					t.includes("Tag") ||
						((this.Gqr = this.Gqr + 1),
						this.Oqr.unshift("Num " + this.Gqr + ": " + t),
						this.Oqr.length > MAX_DEBUG_STRING_NUMS && this.Oqr.pop());
				}),
				(this.Fqr = new Array()),
				(this.Vqr = new Array()),
				(this.Hqr = (t, e, r, a, i) => {
					this.jqr.unshift(
						EMovementModeName[e] +
							"." +
							a.toFixed() +
							" ->" +
							EMovementModeName[r] +
							"." +
							i.toFixed(),
					);
				}),
				(this.Wqr = (t, e) => {
					this.jqr.unshift(
						CharacterUnifiedStateTypes_1.ECharMoveState[t] +
							" ->" +
							CharacterUnifiedStateTypes_1.ECharMoveState[e],
					);
				}),
				(this.Kqr = (t, e) => {
					this.jqr.unshift(
						CharacterUnifiedStateTypes_1.ECharPositionState[t] +
							" ->" +
							CharacterUnifiedStateTypes_1.ECharPositionState[e],
					);
				}),
				(this.Qqr = (t) => {
					this.jqr.unshift("Set NewBeHit:" + t);
				}),
				(this.jqr = new Array()),
				(this.Xqr = (t) => {
					if (CharacterGasDebugComponent_1.$qr) {
						var e = t.Attacker;
						if (this.Yqr(e)) {
							var r = new Array(),
								a =
									(r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
									r.push(CharacterGasDebugComponent_1.Jqr(Date.now())),
									e.GetComponent(0)),
								i = a.GetEntityType();
							if (i === Protocol_1.Aki.Protocol.wks.Proto_Player) {
								r.push("角色"), r.push(a.GetPbDataId().toFixed());
								var n = a.Valid ? a.GetRoleId() : 0,
									n = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(n);
								if (!n) return;
								(n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n)),
									(n = n
										? ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
												n.Name,
											)
										: "");
								r.push(n);
							} else {
								if (i !== Protocol_1.Aki.Protocol.wks.Proto_Monster) return;
								r.push("怪物"), r.push(a.GetPbDataId().toFixed());
								n = PublicUtil_1.PublicUtil.GetConfigTextByKey(
									a.GetBaseInfo()?.TidName ?? "",
								);
								r.push(n);
							}
							r.push(t.BulletRowName);
							(i = t.BulletDataMain),
								(a =
									(r.push(i?.BulletName ?? "0"),
									r.push(i.Base.DamageId.toString()),
									t.BulletInitParams.SkillId)),
								(n = (r.push(a ? a.toFixed() : ""), e.GetComponent(33))),
								(i = a ? n.GetSkillInfo(a) : void 0),
								(e =
									(r.push(i ? ESkillGenreName[i.SkillGenre] : ""),
									t.Entity.Id));
							CharacterGasDebugComponent_1.zqr.set(e, r),
								CharacterGasDebugComponent_1.Zqr.push(e);
						}
					}
				}),
				(this.RecordMove = (t, e, r) => {
					var a, i, n;
					CharacterGasDebugComponent_1.$qr &&
						t?.Valid &&
						this.Yqr(this.Entity) &&
						((a = this.Entity),
						(i = new Array()).push(
							CharacterGasDebugComponent_1.SecondsSinceStartup(),
						),
						i.push(CharacterGasDebugComponent_1.Jqr(Date.now())),
						a?.GetComponent(85) ? i.push("角色") : i.push("怪物"),
						(n = a?.CheckGetComponent(0).GetPbDataId()),
						i.push(n.toFixed(0)),
						(n = a?.GetComponent(3).Actor.GetName()),
						i.push(n),
						i.push(e.toString()),
						i.push(ESkillGenreName[r]),
						(n = a.GetComponent(158)),
						i.push(n.GetCurrentValue(EAttributeId.Proto_Atk).toFixed()),
						i.push(n.GetCurrentValue(EAttributeId.Proto_Crit).toFixed()),
						i.push(n.GetCurrentValue(EAttributeId.Proto_CritDamage).toFixed()),
						i.push(n.GetCurrentValue(EAttributeId.Proto_Life).toFixed()),
						i.push(n.GetCurrentValue(EAttributeId.Proto_Def).toFixed()),
						i.push(
							n.GetCurrentValue(EAttributeId.Proto_DamageChange).toFixed(),
						),
						CharacterGasDebugComponent_1.eGr.push(i.join(",")),
						CharacterGasDebugComponent_1.tGr(a, t.Entity, r));
				}),
				(this.iGr = void 0),
				(this.ServerDebugInfoDirty = !1),
				(this.oGr = (t, e) => {
					var e = this.Entity.GetComponent(33)?.GetSkillInfo(e),
						r =
							(CharacterGasDebugComponent_1.rGr ||
								(CharacterGasDebugComponent_1.rGr = new Map()),
							this.Entity.Id);
					if (4 === e.SkillGenre) {
						let t = CharacterGasDebugComponent_1.rGr.get(r);
						t ||
							((t = new PriorityQueue_1.PriorityQueue(
								CharacterGasDebugComponent_1.nGr,
							)),
							CharacterGasDebugComponent_1.rGr.set(r, t));
						var a = new DamageRecordDsp(
							Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr,
							-1,
							!0,
							!1,
							!1,
							!1,
						);
						t.Push(a);
					} else if (12 === e.SkillGenre) {
						let t = CharacterGasDebugComponent_1.rGr.get(r);
						t ||
							((t = new PriorityQueue_1.PriorityQueue(
								CharacterGasDebugComponent_1.nGr,
							)),
							CharacterGasDebugComponent_1.rGr.set(r, t));
						a = new DamageRecordDsp(
							Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr,
							-1,
							!1,
							!1,
							!1,
							!0,
						);
						t.Push(a);
					}
				});
		}
		OnStart() {
			var t = this.Entity.GetComponent(3);
			return (
				(this.qqr = t?.Actor.AbilitySystemComponent),
				CharacterGasDebugComponent_1.aGr(),
				this.hGr(),
				this.lGr(),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharRecordOperate,
					this.RecordMove,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharUseSkill,
					this.oGr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BulletCreate,
					this.Xqr,
				),
				!0
			);
		}
		OnTick(t) {
			if (
				(CharacterGasDebugComponent_1.Qyn &&
					Time_1.Time.Frame > CharacterGasDebugComponent_1.Xyn &&
					((CharacterGasDebugComponent_1.sGr += 0.001 * t),
					(CharacterGasDebugComponent_1.Xyn = Time_1.Time.Frame)),
				this.EnableCollisionDebugDraw)
			) {
				var e = this.Entity.GetComponent(3);
				if (e) {
					var r = e.Actor.K2_GetComponentsByClass(
						UE.CapsuleComponent.StaticClass(),
					);
					for (let t = 0; t < r.Num(); t++) {
						var a = r.Get(t);
						UE.KismetSystemLibrary.DrawDebugCapsule(
							e.Actor,
							a.K2_GetComponentLocation(),
							a.CapsuleHalfHeight,
							a.CapsuleRadius,
							a.K2_GetComponentRotation(),
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
				this.Nqr?.EndTask(),
				(this.Nqr = void 0),
				this._Gr(),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharRecordOperate,
					this.RecordMove,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharUseSkill,
					this.oGr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BulletCreate,
					this.Xqr,
				),
				!0
			);
		}
		static aGr() {
			this.uGr ||
				((this.uGr = !0),
				GameplayTagUtils_1.GameplayTagUtils.CheckGameplayTagIdUniqueness());
		}
		hGr() {
			this.qqr &&
				((this.Nqr =
					UE.AsyncTaskEffectDebugString.ListenForGameplayEffectExecutedDebugString(
						this.qqr,
					)),
				this.Nqr?.OnAnyGameplayEffectExecuted.Add(this.kqr));
		}
		GetGeDebugStrings() {
			return this.Oqr.join(" ");
		}
		GetTagDebugStrings() {
			return (
				this.Entity.GetComponent(188)?.TagContainer.GetDebugString() ??
				"找不到tag组件"
			);
		}
		GetTagContainerDebugString(e) {
			var r = e.GameplayTags?.Num() ?? 0;
			if (r <= 0) return "";
			let a = "";
			for (let t = 0; t < r; t++) a += e.GameplayTags.Get(t).TagName + " ";
			return a;
		}
		GetBuffEffectDebugString(t) {
			let e = "";
			for (const r of this.Entity.GetComponent(
				159,
			).BuffEffectManager.GetAllEffects())
				this.cGr(t, String(r.BuffId)) &&
					(e += `${r.constructor.name} buffId:${r.BuffId} handle:${r.ActiveHandleId}\n`);
			return e;
		}
		GetShieldDebugString() {
			this.Fqr.length = 0;
			var t = this.Entity.GetComponent(66);
			if (t)
				for (var [, e] of t.GetDebugShieldInfo()) {
					var r = e.ShieldValue,
						a = e.Priority,
						e = e.TemplateId;
					this.Fqr.push(
						`Shield magnitude: ${r} priority: ${a} templateId: ` + e,
					);
				}
			t = this.Entity.GetComponent(158)?.GetLockDebugString() ?? "";
			return "\n\nShields:\n" + this.Fqr.join("\n") + t;
		}
		GetAttributeDebugStrings() {
			var e = this.Entity.GetComponent(158);
			if (!e) return "Invalid";
			let r = "";
			for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
				var a = e.GetBaseValue(t),
					i = e.GetCurrentValue(t),
					n = Protocol_1.Aki.Protocol.Bks[t];
				CharacterAttributeTypes_1.stateAttributeIds.has(t) || i === a
					? (r += `#${t} ${n}	= ${i.toFixed(0)}
`)
					: (r +=
							a < i
								? `#${t} ${n}	= ${i.toFixed(0)}(+${(i - a).toFixed(0)})
`
								: `#${t} ${n}	= ${i.toFixed(0)}(${(i - a).toFixed(0)})
`);
			}
			return (r +=
				"\n队伍属性：\n" +
				CharacterGasDebugComponent_1.GetFormationAttributeDebugStrings());
		}
		GetAllAttributeDebugStrings() {
			this.Vqr.length = 0;
			var e = this.Entity.GetComponent(158);
			for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
				var r = e.GetBaseValue(t),
					a = e.GetCurrentValue(t),
					i = Protocol_1.Aki.Protocol.Bks[t],
					i = `Attribute ID: ${t}   ${i}  
    Base: ${r.toFixed()}    Current: ${a.toFixed()} 
`;
				this.Vqr.push(i);
			}
			return this.Vqr.join("\n");
		}
		static GetFormationAttributeDebugStrings() {
			let t = "";
			for (const n of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
				var e = n.Id,
					r =
						FormationAttributeController_1.FormationAttributeController.GetValue(
							e,
						),
					a =
						FormationAttributeController_1.FormationAttributeController.GetMax(
							e,
						),
					i =
						FormationAttributeController_1.FormationAttributeController.GetSpeed(
							e,
						);
				t += `#${e} = ${r?.toFixed(0)}/${a?.toFixed(0)} (${i?.toFixed(0)}/s)
`;
			}
			return t;
		}
		GetAllAttributeDebugInfo() {
			var a = this.Entity.GetComponent(158);
			if (!a) return "Invalid";
			let i = "";
			const n = this.iGr?.PSs;
			var o = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
			if (n) for (const D of n) o[D.QMs] = D;
			for (let r = 1; r < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; r++) {
				var s = a.GetBaseValue(r),
					h = a.GetCurrentValue(r),
					u = h.toFixed(0);
				let t = (h - s).toFixed(0);
				s <= h && (t = "+" + t), (t = h === s ? "" : `(${t})`);
				var _ = Protocol_1.Aki.Protocol.Bks[r].replace("Proto_", "");
				const n = o[r];
				var C = n?.d6n.toFixed(0) ?? "0";
				let e = n ? (n.d6n - n.KMs).toFixed(0) : "0";
				n && n.d6n > n.KMs && (e = "+" + e),
					(e = n?.d6n === n?.KMs ? "" : `(${e})`),
					CharacterAttributeTypes_1.stateAttributeIds.has(r) || h === s
						? (i += `#${r} ${_}	 C:${u} | S:${C}
`)
						: (i += `#${r} ${_}	 C:${u}(${t}) | S:${C}(${e})
`);
			}
			i += "\n队伍属性：\n";
			var t = this.iGr?.u6n,
				e = new Array();
			if (t) for (const p of t) e[p.m6n] = p;
			for (const d of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
				var r = d.Id,
					l =
						FormationAttributeController_1.FormationAttributeController.GetValue(
							r,
						),
					c =
						FormationAttributeController_1.FormationAttributeController.GetMax(
							r,
						),
					f =
						FormationAttributeController_1.FormationAttributeController.GetSpeed(
							r,
						);
				const n = e[r];
				var g = n?.d6n.toFixed(0) ?? "???",
					m = n?.C6n.toFixed(0) ?? "???",
					b = n?.f6n.toFixed(0) ?? "???";
				i +=
					`#${r}	 C:${l?.toFixed(0)}/${c?.toFixed(0)} (${f?.toFixed(0)}/s)` +
					` | S:${g}/${m} (${b}/s)
`;
			}
			return i;
		}
		lGr() {
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharMovementModeChanged,
				this.Hqr,
			),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.Wqr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnPositionStateChanged,
					this.Kqr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnSetNewBeHit,
					this.Qqr,
				);
		}
		_Gr() {
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharMovementModeChanged,
				this.Hqr,
			),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.Wqr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnPositionStateChanged,
					this.Kqr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnSetNewBeHit,
					this.Qqr,
				);
		}
		GetAllMovementHistory() {
			return 50 < this.jqr.length && this.jqr.pop(), this.jqr.join("\n");
		}
		DebugResetBaseValue(t, e) {
			t >= EAttributeId.Proto_Lv &&
				t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX &&
				this.Entity.GetComponent(158).SetBaseValue(t, e);
		}
		static get IsServerLogOff() {
			return this.mGr;
		}
		static ReceiveSwitchServerLogMode(t) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					20,
					"[CharacterAbilityComponent]Server switch Buff Mode",
					["isClientControl", t],
				),
				(this.mGr = t);
		}
		static RequestSwitchServerMode(t) {
			var e = Protocol_1.Aki.Protocol.cis.create({
				Vjn: t,
				Hjn: Protocol_1.Aki.Protocol.D4s.yAs,
			});
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					20,
					"[CharacterDamageComponent]Request Buff Mode",
					["isClientControl", t],
				),
				Net_1.Net.Call(24709, e, (t) => {
					this.ReceiveSwitchServerLogMode(t.Vjn);
				});
		}
		static SecondsSinceStartup() {
			return (
				Time_1.Time.WorldTimeSeconds -
				CharacterGasDebugComponent_1.dGr -
				CharacterGasDebugComponent_1.sGr
			).toFixed(2);
		}
		static SetDistanceMax(t) {}
		static BeginRecord() {
			(this.sGr = 0),
				(this.$qr = !0),
				(this.dGr = Time_1.Time.WorldTimeSeconds),
				(this.CGr = Time_1.Time.ServerTimeStamp),
				this.SetDamageRecord(!0),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnChangeRole,
					this.xie,
				),
				(CharacterGasDebugComponent_1.rGr = void 0),
				CharacterGasDebugComponent_1.gGr(
					Global_1.Global.BaseCharacter.EntityId,
					!0,
					!1,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnAbsoluteTimeStop,
					this.fGr,
				);
		}
		static EndRecord() {
			var t;
			return this.$qr
				? ((this.$qr = !1),
					this.SetDamageRecord(!1),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.OnChangeRole,
						this.xie,
					),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.OnAbsoluteTimeStop,
						this.fGr,
					),
					(t = this.pGr()),
					this.CleanupRecord(),
					t)
				: "";
		}
		static pGr() {
			var t = new Array(),
				e = "";
			let r = "";
			UE.KuroStaticLibrary.SaveStringToFile(
				"X秒,当前时间,对象,对象ID,对象名称,技能ID,技能类型,攻击,暴击,爆伤,生命,防御,伤害加成\n" +
					this.eGr.join("\n"),
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"SkillRecord.csv",
				!0,
			);
			var a = new Array(),
				i =
					"X秒,当前时间,对象,对象ID,对象名称,子弹ID,子弹名称,伤害ID,技能ID,技能类型,子弹是否命中\n";
			for (const P of this.Zqr) {
				var n = this.zqr.get(P);
				n.push(
					ModelManager_1.ModelManager.BulletModel.IsBulletHit(P) ? "1" : "0",
				),
					a.push(n.join(","));
			}
			UE.KuroStaticLibrary.SaveStringToFile(
				i + a.join("\n"),
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"BulletRecord.csv",
				!0,
			),
				(i =
					"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,Config ID,攻击,暴击,爆伤,生命,防御,伤害加成\n"),
				UE.KuroStaticLibrary.SaveStringToFile(
					i + this.vGr.join("\n"),
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"DamageRecord.csv",
					!0,
				),
				(i =
					"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,是否暴击,唯一ID,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,白条倍率,白条倍率百分比0,白条倍率百分比1,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
				UE.KuroStaticLibrary.SaveStringToFile(
					i + this.MGr.join("\n"),
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"DamageRecord_Attr.csv",
					!0,
				),
				(i =
					"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,是否暴击,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
				UE.KuroStaticLibrary.SaveStringToFile(
					i + this.EGr.join("\n"),
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"DamageRecord_Snipeshot.csv",
					!0,
				),
				(r =
					"X秒,当前时间,对象,对象ID,对象名称,BuffId,Buff名称,添加or删除\n" +
					this.SGr.join("\n")),
				UE.KuroStaticLibrary.SaveStringToFile(
					r,
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"BuffRecord.csv",
					!0,
				);
			for (const V of this.yGr.values()) t.push(V.ToCsv().join(","));
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
				(i =
					"角色ID,角色名称,受伤来源ConfigId,受伤来源名称,受伤来源唯一ID,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n");
			for (const x of this.IGr.values()) t.push(x.ToCsvForRole().join(","));
			(r = i + t.join("\n")),
				UE.KuroStaticLibrary.SaveStringToFile(
					r,
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"RoleDamageSum.csv",
					!0,
				),
				(t.length = 0),
				(e += r + "\n"),
				(i =
					"怪物ConfigID,怪物名称,怪物唯一Id,攻击者ConfigId,攻击者名称,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n");
			for (const j of this.TGr.values()) t.push(j.ToCsvForMonster().join(","));
			(r = i + t.join("\n")),
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
			var o =
				Time_1.Time.WorldTimeSeconds -
				CharacterGasDebugComponent_1.dGr -
				CharacterGasDebugComponent_1.sGr;
			let s = 0;
			for (; o >= s; ) (r += ",'" + s.toString() + "s'"), (s += 0.5);
			let h = "";
			var i = (0, puerts_1.$ref)(h),
				u =
					(UE.FileSystemOperation.ReadFile(
						UE.KismetSystemLibrary.GetProjectDirectory() +
							"../Config/ResConfig/RoleDspTpl.txt",
						i,
					),
					(h = (h = (0, puerts_1.$unref)(i)).replace("TPL_XAXIS_VALUES", r)),
					new StringBuilder_1.StringBuilder()),
				_ = new Map(),
				C = new Map(),
				l = new Map(),
				c = new Map(),
				f = new Map(),
				g = new Map(),
				m = new Map(),
				b = new Map(),
				D = new Map();
			for (s = 0; o >= s; ) {
				for (var [p, d] of CharacterGasDebugComponent_1.rGr) {
					c.has(p) || c.set(p, new Array()),
						f.has(p) || f.set(p, new Array()),
						g.has(p) || g.set(p, new Array()),
						m.has(p) || m.set(p, new Array()),
						b.has(p) || b.set(p, new Array()),
						D.has(p) || D.set(p, new Array()),
						_.has(p) || _.set(p, 0),
						C.has(p) || C.set(p, 0),
						l.has(p) || l.set(p, !1);
					let t = !1,
						e = !1;
					for (; !d.Empty; ) {
						var E = d.Top;
						if (!(E.TimeStamp <= this.dGr + s)) break;
						0 < E.DamageValue
							? _.set(p, _.get(p) + E.DamageValue)
							: E.InGame
								? l.set(p, !0)
								: E.OutGame
									? l.set(p, !1)
									: E.QteBegin
										? (t = !0)
										: E?.OutGameSkill && (e = !0),
							d.Pop(),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Character", 21, "打印时间", [
									"time",
									E.TimeStamp,
								]);
					}
					c.get(p).push(_.get(p)),
						f.get(p).push(l.get(p) ? "-10" : "'-'"),
						g.get(p).push(t ? "-20" : "'-'"),
						m.get(p).push(e ? "-30" : "'-'");
					var v = C.get(p);
					D.get(p).push(0 < v ? _.get(p) / v : 0),
						b.get(p).push(0 < s ? _.get(p) / s : 0),
						l.get(p) && C.set(p, C.get(p) + 0.5);
				}
				s += 0.5;
			}
			var A,
				y,
				G,
				I,
				q,
				M,
				N,
				O,
				S,
				L,
				F,
				U,
				k,
				Q,
				w,
				X,
				H,
				T = [],
				R = [],
				B = [];
			for ([A, y] of c) {
				var $ = EntitySystem_1.EntitySystem.Get(A);
				$?.Valid
					? (T.push(A),
						($ = ($ = $.GetComponent(0)).Valid ? $.GetRoleId() : 0),
						($ = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId($))
							? (($ =
									ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig($)),
								($ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
									$.Name,
								)),
								R.push($),
								u.Append(
									StringUtils_1.StringUtils.Format(
										"{name: '{0}伤害', type: 'line', data: [{1}],},",
										$,
										y.join(","),
									),
								))
							: B.push(A))
					: B.push(A);
			}
			for ([G, I] of b)
				B.includes(G) ||
					((q = T.indexOf(G)),
					u.Append(
						StringUtils_1.StringUtils.Format(
							"{name: '{0}绝对DPS', type: 'line', data: [{1}],},",
							R[q],
							I.join(","),
						),
					));
			for ([M, N] of D)
				B.includes(M) ||
					((O = T.indexOf(M)),
					u.Append(
						StringUtils_1.StringUtils.Format(
							"{name: '{0}站场DPS', type: 'line', data: [{1}],},",
							R[O],
							N.join(","),
						),
					));
			for ([S, L] of f)
				B.includes(S) ||
					((F = T.indexOf(S)),
					u.Append(
						StringUtils_1.StringUtils.Format(
							"{name: '{0}在场上', type: 'line', data: [{1}],},",
							R[F],
							L.join(","),
						),
					));
			for ([U, k] of g)
				B.includes(U) ||
					((Q = T.indexOf(U)),
					u.Append(
						StringUtils_1.StringUtils.Format(
							"{name: '{0}QTE', type: 'line', data: [{1}],},",
							R[Q],
							k.join(","),
						),
					));
			for ([w, X] of m)
				B.includes(w) ||
					((H = T.indexOf(w)),
					u.Append(
						StringUtils_1.StringUtils.Format(
							"{name: '{0}退场技', type: 'line', data: [{1}],},",
							R[H],
							X.join(","),
						),
					));
			return (
				(h = h.replace("CONTENT_SERIES", u.ToString())),
				UE.KuroStaticLibrary.SaveStringToFile(
					h,
					UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDsp.html",
					!0,
				),
				e
			);
		}
		Yqr(t) {
			return CharacterStatisticsComponent_1.CharacterStatisticsComponent.IsInRecordArea(
				t,
			);
		}
		static RecordDamage(a, i, n, o) {
			var s = new Array(),
				n = (s.push(n), s.push(o), CharacterGasDebugComponent_1.LGr(a));
			if (n) {
				s.push(n.Type),
					s.push(n.ConfigId),
					s.push(n.Name),
					a.GetComponent(85) ? s.push("角色") : s.push("怪物"),
					s.push(MathUtils_1.MathUtils.LongToBigInt(i.NAs).toString());
				let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
						a,
						MathUtils_1.MathUtils.LongToBigInt(i.ujn).toString(),
						!1,
					),
					e = void 0;
				t ||
					((o =
						ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
							a.Id,
							1,
						)),
					(e = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
						(t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
							e,
							MathUtils_1.MathUtils.LongToBigInt(i.ujn).toString(),
						))),
					s.push(t?.BulletName ?? ""),
					s.push(i.FAs.toFixed()),
					s.push(i.X4n.toFixed());
				let r = a.GetComponent(33)?.GetSkillInfo(i.X4n);
				(r = r || e?.GetComponent(33)?.GetSkillInfo(i.X4n)),
					s.push(r?.SkillName?.toString()),
					s.push(MathUtils_1.MathUtils.LongToBigInt(i.jjn.P4n).toString());
				var n = a?.CheckGetComponent(0).GetPbDataId().toFixed(),
					h = (s.push(n), s.length);
				for (const u of i.HAs.GAs)
					u.QMs === EAttributeId.Proto_Atk
						? (s[h] = u.d6n.toFixed())
						: u.QMs === EAttributeId.Proto_Crit
							? (s[h + 1] = u.d6n.toFixed())
							: u.QMs === EAttributeId.Proto_CritDamage
								? (s[h + 2] = u.d6n.toFixed())
								: u.QMs === EAttributeId.Proto_Life
									? (s[h + 3] = u.d6n.toFixed())
									: u.QMs === EAttributeId.Proto_Def
										? (s[h + 4] = u.d6n.toFixed())
										: u.QMs === EAttributeId.Proto_DamageChange &&
											(s[h + 5] = u.d6n.toFixed());
				CharacterGasDebugComponent_1.vGr.push(s.join(","));
				(o = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
					MathUtils_1.MathUtils.LongToNumber(i.HAs.P4n),
				)),
					(n = EntitySystem_1.EntitySystem.Get(o));
				CharacterGasDebugComponent_1.DGr(n, a, i.FAs, r?.SkillGenre);
			}
		}
		static DGr(t, e, r, a) {
			let i = this.IGr;
			t?.GetComponent(85) || (i = this.TGr);
			var n,
				o = t.Id.toFixed() + e.Id.toFixed(),
				s = i.get(o);
			s
				? ((s.TotalDamage += r),
					(n = s.RecordDamage.get(a) ?? 0),
					s.RecordDamage.set(a, n + r))
				: ((s = new RecordDamageSum()),
					(n = t?.CheckGetComponent(0).GetPbDataId()),
					(s.ConfigId = n ?? 0),
					(s.UniqueId = t.Id),
					(s.Name = t?.GetComponent(3).Actor.GetName() ?? ""),
					(n = e?.CheckGetComponent(0).GetPbDataId()),
					(s.DamageSourceConfigId = n),
					(s.SourceName = e?.GetComponent(3).Actor.GetName()),
					(s.SourceUniqueId = e?.Id),
					(s.TotalDamage = r),
					(t = s.RecordDamage.get(a) ?? 0),
					s.RecordDamage.set(a, t + r),
					i.set(o, s));
		}
		static tGr(t, e, r) {
			var a = t?.GetComponent(3).Actor.GetName() ?? "",
				t = t?.CheckGetComponent(0).GetPbDataId() ?? 0,
				e = e?.Id ?? 0,
				i = this.yGr.get(t + e);
			i
				? i.RecordNum.set(r, i.RecordNum.get(r) + 1)
				: (((i = new RecordMoveSum()).ConfigId = t),
					(i.Name = a),
					(i.TargetUniqueId = e),
					i.RecordNum.set(r, 1),
					this.yGr.set(t + e, i));
		}
		cGr(t, e) {
			return !t || e.includes(t) || t.includes(e);
		}
		GetServerBuffString() {
			if (!this.iGr?.LAs?.mIs) return "";
			let t = "";
			for (const s of this.iGr.LAs.mIs) {
				var e = MathUtils_1.MathUtils.LongToBigInt(s.L6n),
					r = MathUtils_1.MathUtils.LongToBigInt(s.Sjn).toString(),
					a = CharacterBuffController_1.default.GetBuffDefinition(e),
					a = a ? a.Desc : "";
				t += this.RGr(
					e.toString(),
					s.rVn,
					a,
					s.Ijn,
					s.P6n,
					s.qHn,
					r,
					s.FEs,
					s.Y4n,
				);
			}
			if (!this.iGr?._Rs) return "";
			for (const h of this.iGr._Rs) {
				var i = MathUtils_1.MathUtils.LongToBigInt(h.J4n),
					n = MathUtils_1.MathUtils.LongToBigInt(h.Sjn).toString(),
					o = CharacterBuffController_1.default.GetBuffDefinition(i),
					o = o ? o.Desc : "";
				t += this.RGr(
					"编 " + i.toString(),
					h.iVn,
					o,
					h.Ijn,
					h.P6n,
					h.qHn,
					n,
					h.FEs ?? 0,
					h.Y4n ?? 0,
				);
			}
			if (0 < this.iGr.LAs.CIs.length) {
				t += "\nCD : \n";
				for (const u of this.iGr.LAs.CIs)
					if (!(u.PTs.length <= 0)) {
						t +=
							"[" + MathUtils_1.MathUtils.LongToBigInt(u.L6n).toString() + "] ";
						for (const _ of u.PTs) t += _.toFixed() + ", ";
					}
			}
			return t;
		}
		GetServerBuffRemainDuration(t) {
			if (!this.iGr?.LAs?.mIs) return -1;
			let e = -1;
			for (const r of this.iGr.LAs.mIs)
				if (r.rVn === t) {
					e = r.FEs;
					break;
				}
			return e;
		}
		GetServerBuffTotalDuration(t) {
			if (!this.iGr?.LAs?.mIs) return -1;
			let e = 0;
			for (const r of this.iGr.LAs.mIs)
				if (r.rVn === t) {
					e = r.Y4n;
					break;
				}
			return e;
		}
		RGr(t, e, r, a, i, n, o, s, h) {
			return (
				"[" +
				t +
				", " +
				e +
				"] " +
				a +
				"层," +
				i +
				"级," +
				(n ? "激活. " : "失效. ") +
				"施:" +
				o +
				". 时:" +
				s.toFixed(1) +
				"/" +
				h.toFixed() +
				". " +
				r +
				"\n"
			);
		}
		GetServerTagString() {
			let t = "";
			if (this.iGr?.RAs)
				for (const e of this.iGr.RAs)
					t =
						t +
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.o5n)
							.TagName +
						" " +
						e.o9n.toString() +
						"\n";
			if (this.iGr?.AAs)
				for (const r of this.iGr.AAs)
					t =
						t +
						"[编] " +
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r.o5n)
							.TagName +
						" " +
						r.o9n.toString() +
						"\n";
			return t;
		}
		GetServerAttributeString() {
			if (!this.iGr?.PSs) return "";
			let t = "";
			for (const e of this.iGr.PSs)
				t =
					t +
					e.QMs +
					" " +
					Protocol_1.Aki.Protocol.Bks[e.QMs] +
					":[" +
					e.KMs.toString() +
					"][" +
					e.d6n.toString() +
					"]\n";
			t += "\n队伍属性：\n";
			for (const r of this.iGr.u6n)
				t =
					t +
					r.m6n.toString() +
					"=" +
					r.d6n.toString() +
					"/" +
					r.C6n.toString() +
					"(" +
					r.f6n.toString() +
					"/s)\n";
			return t;
		}
		GetServerPartString() {
			if (!this.iGr?.DAs?.yTs) return "";
			let t = "";
			for (const e of this.iGr.DAs.yTs)
				t +=
					e.bjn +
					" :  " +
					e.Wjn.toFixed(1) +
					" / " +
					e.e5n.toFixed(1) +
					", " +
					e.t5n +
					"\n";
			return t;
		}
		GetServerHateString() {
			if (!this.iGr?.fSs) return "";
			let t = "";
			for (const e of this.iGr.fSs)
				t +=
					MathUtils_1.MathUtils.LongToBigInt(e.P4n) +
					" : " +
					e.j8n.toFixed(1) +
					"\n";
			return t;
		}
		GetServerShieldString() {
			if (!this.iGr?.Hys) return "";
			let t = "护盾总值: " + this.iGr.Hys.MTs + "\n";
			for (const e of this.iGr.Hys.pTs)
				t +=
					"[" +
					e._9n +
					"," +
					e.iVn +
					"] " +
					(e.vTs ? "生效" : "失效") +
					", " +
					e.CTs +
					"," +
					e.fTs +
					"," +
					e.gTs +
					"\n";
			return t;
		}
		ServerDebugInfoRequest() {
			var t = Protocol_1.Aki.Protocol.Iis.create();
			(t.P4n = MathUtils_1.MathUtils.NumberToLong(
				ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
					this.Entity.Id,
				),
			)),
				Net_1.Net.Call(26446, t, (t) => {
					t && ((this.iGr = t), (this.ServerDebugInfoDirty = !0));
				});
		}
		OnBuffAdded(t) {
			CharacterGasDebugComponent_1.$qr &&
				(t = this.UGr(t, "添加")) &&
				CharacterGasDebugComponent_1.SGr.push(t.join(","));
		}
		OnBuffRemoved(t) {
			CharacterGasDebugComponent_1.$qr &&
				(t = this.UGr(t, "删除")) &&
				CharacterGasDebugComponent_1.SGr.push(t.join(","));
		}
		UGr(t, e) {
			var r = new Array(),
				a =
					(r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
					r.push(CharacterGasDebugComponent_1.Jqr(Date.now())),
					t.GetInstigator()),
				a = a ? CharacterGasDebugComponent_1.LGr(a) : void 0;
			if (a)
				return (
					r.push(a.Type),
					r.push(a.ConfigId),
					r.push(a.Name),
					r.push(t.Config.Id.toString()),
					r.push(t.Config.Desc),
					r.push(e),
					r
				);
		}
		static LGr(t) {
			var e,
				t = t.GetComponent(0),
				r = t.GetEntityType();
			return r === Protocol_1.Aki.Protocol.wks.Proto_Player
				? ((e = t.Valid ? t.GetRoleId() : 0),
					(e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e))
						? ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
							{
								Name: ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
									e.Name,
								),
								Type: "角色",
								ConfigId: t.GetPbDataId().toFixed(),
							})
						: void 0)
				: r === Protocol_1.Aki.Protocol.wks.Proto_Monster
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
			var e = Protocol_1.Aki.Protocol.Debug.PZn.create();
			(e.Kjn = t),
				Net_1.Net.Call(13155, e, (t) => {
					t &&
						Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("CombatInfo", 21, "", ["Response", t]);
				});
		}
		static OnDamageRecordNotify(e, r) {
			Info_1.Info.IsBuildShipping ||
				TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
					(t) => {
						t && t.RoleTest && t.RoleTest.RecordDamageNotify(e, r);
					},
				);
			var t,
				a,
				i = EntitySystem_1.EntitySystem.Get(
					ModelManager_1.ModelManager.CreatureModel.GetEntityId(
						MathUtils_1.MathUtils.LongToNumber(r.jjn.P4n),
					),
				);
			i.GetComponent(24)?.GetStatisticsEnable() &&
				((t = (
					0.001 *
						(MathUtils_1.MathUtils.LongToNumber(r.kAs) -
							CharacterGasDebugComponent_1.CGr) -
					CharacterGasDebugComponent_1.sGr
				).toFixed(2)),
				(a = this.Jqr(r.kAs)),
				this.RecordDamage(i, r, t, a),
				this.AGr(i, r, t, a),
				this.PGr(i, r, t, a),
				this.xGr(i, r));
		}
		static xGr(e, r) {
			var a = e.GetComponent(0);
			if (a && a.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player) {
				this.rGr || (this.rGr = new Map());
				a = e.Id;
				let t = this.rGr.get(a);
				t ||
					((t = new PriorityQueue_1.PriorityQueue(this.nGr)),
					this.rGr.set(a, t));
				e = new DamageRecordDsp(
					Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr,
					r.FAs,
					!1,
					!1,
					!1,
					!1,
				);
				t.Push(e);
			}
		}
		static gGr(t, e, r) {
			CharacterGasDebugComponent_1.rGr ||
				(CharacterGasDebugComponent_1.rGr = new Map());
			let a = CharacterGasDebugComponent_1.rGr.get(t);
			a ||
				((a = new PriorityQueue_1.PriorityQueue(
					CharacterGasDebugComponent_1.nGr,
				)),
				CharacterGasDebugComponent_1.rGr.set(t, a));
			t = new DamageRecordDsp(
				Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr,
				-1,
				!1,
				e,
				r,
				!1,
			);
			a.Push(t);
		}
		static PGr(a, i, n, o) {
			var s = new Array(),
				n = (s.push(n), s.push(o), CharacterGasDebugComponent_1.LGr(a));
			if (n) {
				s.push(n.Type),
					s.push(n.ConfigId),
					s.push(n.Name),
					s.push(
						i.VAs === Protocol_1.Aki.Protocol.VAs.Proto_FromBullet
							? "子弹"
							: "Buff",
					),
					s.push(MathUtils_1.MathUtils.LongToBigInt(i.NAs).toString());
				let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
						a,
						MathUtils_1.MathUtils.LongToBigInt(i.ujn).toString(),
						!1,
					),
					e = void 0;
				t ||
					((o =
						ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
							a.Id,
							1,
						)),
					(e = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
						(t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
							e,
							MathUtils_1.MathUtils.LongToBigInt(i.ujn).toString(),
						))),
					s.push(t?.BulletName ?? ""),
					s.push(i.FAs.toFixed()),
					s.push(i.X4n.toFixed());
				let r = a.GetComponent(33)?.GetSkillInfo(i.X4n)?.SkillName;
				(r = r || e?.GetComponent(33)?.GetSkillInfo(i.X4n)?.SkillName),
					s.push(r?.toString() ?? ""),
					s.push(MathUtils_1.MathUtils.LongToBigInt(i.jjn.P4n).toString()),
					s.push(i.$As ? "1" : "0");
				var n = s.length,
					o =
						(this.wGr(i.HAs.OAs, s, n),
						this.wGr(i.jjn.OAs, s, n + 59),
						DamageById_1.configDamageById.GetConfig(
							MathUtils_1.MathUtils.LongToBigInt(i.NAs),
						)),
					a = i.qjn,
					h =
						((s[n + 118] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							o.ToughLv,
							a,
							0,
						).toString()),
						(s[n + 119] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							o.Energy,
							a,
							0,
						).toString()),
						(s[n + 120] = o.ElementPowerType.toString()),
						(s[n + 121] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							o.ElementPower,
							a,
							0,
						).toString()),
						new Array()),
					u = new Array();
				for (const f of i.jjn.qAs) {
					var _ = MathUtils_1.MathUtils.LongToBigInt(f),
						C = CharacterBuffController_1.default.GetBuffDefinition(_);
					h.push(C.Desc), u.push(_);
				}
				(s[n + 122] = u.join("|")),
					(s[n + 123] = h.join("|")),
					(h.length = 0),
					(u.length = 0);
				for (const g of i.HAs.qAs) {
					var l = MathUtils_1.MathUtils.LongToBigInt(g),
						c = CharacterBuffController_1.default.GetBuffDefinition(l);
					h.push(c.Desc), u.push(l);
				}
				(s[n + 124] = u.join("|")), (s[n + 125] = h.join("|"));
				o = s.join(",");
				this.EGr.push(o),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Recorder", 21, "结算信息Snapshot", ["Result", o]);
			}
		}
		static Jqr(t) {
			t = new Date(MathUtils_1.MathUtils.LongToNumber(t));
			return StringUtils_1.StringUtils.Format(
				"{0}月{1}日{2}:{3}:{4}:{5}",
				t.getMonth().toString(),
				t.getDate().toString(),
				t.getHours().toString(),
				t.getMinutes().toString(),
				t.getSeconds().toString(),
				t.getMilliseconds().toString(),
			);
		}
		static AGr(a, i, n, o) {
			var s = new Array(),
				n = (s.push(n), s.push(o), CharacterGasDebugComponent_1.LGr(a));
			if (n) {
				s.push(n.Type),
					s.push(n.ConfigId),
					s.push(n.Name),
					s.push(
						i.VAs === Protocol_1.Aki.Protocol.VAs.Proto_FromBullet
							? "子弹"
							: "Buff",
					),
					s.push(MathUtils_1.MathUtils.LongToBigInt(i.NAs).toString());
				let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
						a,
						MathUtils_1.MathUtils.LongToBigInt(i.ujn).toString(),
						!1,
					),
					e = void 0;
				t ||
					((o =
						ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
							a.Id,
							1,
						)),
					(e = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
						(t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
							e,
							MathUtils_1.MathUtils.LongToBigInt(i.ujn).toString(),
						))),
					s.push(t?.BulletName ?? ""),
					s.push(i.FAs.toFixed()),
					s.push(i.X4n.toFixed());
				let r = a.GetComponent(33)?.GetSkillInfo(i.X4n)?.SkillName;
				(r = r || e?.GetComponent(33)?.GetSkillInfo(i.X4n)?.SkillName),
					s.push(r?.toString() ?? ""),
					s.push(i.$As ? "1" : "0"),
					s.push(MathUtils_1.MathUtils.LongToBigInt(i.jjn.P4n).toString());
				var h = s.length,
					n =
						(CharacterGasDebugComponent_1.BGr(i.HAs.GAs, s, h, h + 122),
						DamageById_1.configDamageById.GetConfig(
							MathUtils_1.MathUtils.LongToBigInt(i.NAs),
						)),
					u = EAttributeId.Proto_ElementEnergy;
				s[h + 120] = n.ElementPowerType.toString();
				for (const m of i.jjn.GAs)
					m.QMs === EAttributeId.Proto_ToughChange
						? (s[h + 118] = m.d6n.toFixed())
						: m.QMs === EAttributeId.Proto_Energy
							? (s[h + 119] = m.d6n.toFixed())
							: u && m.QMs === u && (s[h + 121] = m.d6n.toFixed());
				CharacterGasDebugComponent_1.BGr(i.jjn.GAs, s, h + 59, h + 181);
				var o = i.qjn,
					_ =
						((s[h + 240] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							n.HardnessLv,
							o,
							0,
						).toString()),
						(s[h + 241] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							n.Percent0,
							o,
							0,
						).toString()),
						(s[h + 242] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							n.Percent1,
							o,
							0,
						).toString()),
						(s[h + 243] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							n.ToughLv,
							o,
							0,
						).toString()),
						(s[h + 244] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							n.Energy,
							o,
							0,
						).toString()),
						(s[h + 245] = n.ElementPowerType.toString()),
						(s[h + 246] = AbilityUtils_1.AbilityUtils.GetLevelValue(
							n.ElementPower,
							o,
							0,
						).toString()),
						new Array()),
					C = new Array();
				for (const b of i.jjn.qAs) {
					var l = MathUtils_1.MathUtils.LongToBigInt(b),
						c = CharacterBuffController_1.default.GetBuffDefinition(l);
					_.push(c.Desc), C.push(l);
				}
				(s[h + 247] = C.join("|")),
					(s[h + 248] = _.join("|")),
					(_.length = 0),
					(C.length = 0);
				for (const D of i.HAs.qAs) {
					var f = MathUtils_1.MathUtils.LongToBigInt(D),
						g = CharacterBuffController_1.default.GetBuffDefinition(f);
					_.push(g.Desc), C.push(f);
				}
				(s[h + 249] = C.join("|")), (s[h + 250] = _.join("|"));
				a = s.join(",");
				this.MGr.push(a),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Recorder", 21, "结算信息Attr", ["Result", a]);
			}
		}
		static BGr(t, r, a, i) {
			for (const n of t)
				for (let t = 0, e = attributeIdArray.length; t < e; t++)
					if (n.QMs === attributeIdArray[t]) {
						(r[a + t] = (0 < n.d6n ? n.d6n : n.KMs).toString()),
							(r[i + t] = n.KMs.toString());
						break;
					}
		}
		static wGr(t, r, a) {
			for (const i of t)
				for (let t = 0, e = attributeIdArray.length; t < e; t++)
					if (i.QMs === attributeIdArray[t]) {
						r[a + t] = (0 < i.d6n ? i.d6n : i.KMs).toString();
						break;
					}
		}
		static CleanupRecord() {
			(CharacterGasDebugComponent_1.Qyn = !1),
				(CharacterGasDebugComponent_1.sGr = 0),
				(CharacterGasDebugComponent_1.eGr.length = 0),
				(CharacterGasDebugComponent_1.vGr.length = 0),
				CharacterGasDebugComponent_1.yGr.clear(),
				CharacterGasDebugComponent_1.IGr.clear(),
				CharacterGasDebugComponent_1.TGr.clear(),
				CharacterGasDebugComponent_1.zqr.clear(),
				(CharacterGasDebugComponent_1.Zqr.length = 0),
				(CharacterGasDebugComponent_1.SGr.length = 0),
				CharacterGasDebugComponent_1.rGr?.clear(),
				(CharacterGasDebugComponent_1.EGr.length = 0),
				(CharacterGasDebugComponent_1.MGr.length = 0);
		}
	});
(CharacterGasDebugComponent.uGr = !1),
	(CharacterGasDebugComponent.mGr = !1),
	(CharacterGasDebugComponent.$qr = !1),
	(CharacterGasDebugComponent.dGr = 0),
	(CharacterGasDebugComponent.CGr = 0),
	(CharacterGasDebugComponent.eGr = new Array()),
	(CharacterGasDebugComponent.vGr = new Array()),
	(CharacterGasDebugComponent.yGr = new Map()),
	(CharacterGasDebugComponent.IGr = new Map()),
	(CharacterGasDebugComponent.TGr = new Map()),
	(CharacterGasDebugComponent.zqr = new Map()),
	(CharacterGasDebugComponent.Zqr = new Array()),
	(CharacterGasDebugComponent.Pt = "Statistics/FightDataRecord/"),
	(CharacterGasDebugComponent.SGr = new Array()),
	(CharacterGasDebugComponent.rGr = void 0),
	(CharacterGasDebugComponent.nGr = (t, e) => t.TimeStamp - e.TimeStamp),
	(CharacterGasDebugComponent.xie = (t, e) => {
		CharacterGasDebugComponent_1.gGr(t.Id, !0, !1),
			e && CharacterGasDebugComponent_1.gGr(e.Id, !1, !0);
	}),
	(CharacterGasDebugComponent.EGr = new Array()),
	(CharacterGasDebugComponent.MGr = new Array()),
	(CharacterGasDebugComponent.Qyn = !1),
	(CharacterGasDebugComponent.sGr = 0),
	(CharacterGasDebugComponent.Xyn = 0),
	(CharacterGasDebugComponent.fGr = (t) => {
		CharacterGasDebugComponent_1.Qyn = t;
	}),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("JFn")],
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
//# sourceMappingURL=CharacterGasDebugComponent.js.map

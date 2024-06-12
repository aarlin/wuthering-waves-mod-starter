"use strict";
var CharacterGasDebugComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, i) {
			var a,
				n = arguments.length,
				o =
					n < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				o = Reflect.decorate(t, e, r, i);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(a = t[s]) &&
						(o = (n < 3 ? a(o) : 3 < n ? a(e, r, o) : a(e, r)) || o);
			return 3 < n && o && Object.defineProperty(e, r, o), o;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterGasDebugComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	PriorityQueue_1 = require("../../../../../../Core/Container/PriorityQueue"),
	DamageById_1 = require("../../../../../../Core/Define/ConfigQuery/DamageById"),
	FormationPropertyAll_1 = require("../../../../../../Core/Define/ConfigQuery/FormationPropertyAll"),
	NetDefine_1 = require("../../../../../../Core/Define/Net/NetDefine"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	Net_1 = require("../../../../../../Core/Net/Net"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../../../Common/PublicUtil"),
	Global_1 = require("../../../../../Global"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
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
	EAttributeId = Protocol_1.Aki.Protocol.EAttributeType;
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
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
	constructor(t, e, r, i, a, n) {
		(this.TimeStamp = t),
			(this.DamageValue = e),
			(this.QteBegin = r),
			(this.InGame = i),
			(this.OutGame = a),
			(this.OutGameSkill = n);
	}
}
const attributeIdArray = [
	EAttributeId.Life,
	EAttributeId.LifeMax,
	EAttributeId.Atk,
	EAttributeId.Crit,
	EAttributeId.CritDamage,
	EAttributeId.Def,
	EAttributeId.EnergyEfficiency,
	EAttributeId.EnergyMax,
	EAttributeId.Energy,
	EAttributeId.AutoAttackSpeed,
	EAttributeId.CastAttackSpeed,
	EAttributeId.DamageChangeNormalSkill,
	EAttributeId.DamageChange,
	EAttributeId.DamageChangePhantom,
	EAttributeId.DamageChangeAuto,
	EAttributeId.DamageChangeCast,
	EAttributeId.DamageChangeUltra,
	EAttributeId.DamageChangeQte,
	EAttributeId.DamageChangePhys,
	EAttributeId.DamageChangeElement1,
	EAttributeId.DamageChangeElement2,
	EAttributeId.DamageChangeElement3,
	EAttributeId.DamageChangeElement4,
	EAttributeId.DamageChangeElement5,
	EAttributeId.DamageChangeElement6,
	EAttributeId.DamageResistancePhys,
	EAttributeId.DamageResistanceElement1,
	EAttributeId.DamageResistanceElement2,
	EAttributeId.DamageResistanceElement3,
	EAttributeId.DamageResistanceElement4,
	EAttributeId.DamageResistanceElement5,
	EAttributeId.DamageResistanceElement6,
	EAttributeId.HealChange,
	EAttributeId.HealedChange,
	EAttributeId.DamageReduce,
	EAttributeId.DamageReducePhys,
	EAttributeId.DamageReduceElement1,
	EAttributeId.DamageReduceElement2,
	EAttributeId.DamageReduceElement3,
	EAttributeId.DamageReduceElement4,
	EAttributeId.DamageReduceElement5,
	EAttributeId.DamageReduceElement6,
	EAttributeId.ToughMax,
	EAttributeId.Tough,
	EAttributeId.ToughRecover,
	EAttributeId.ToughChange,
	EAttributeId.ToughReduce,
	EAttributeId.RageMax,
	EAttributeId.Rage,
	EAttributeId.RageRecover,
	EAttributeId.RagePunishTime,
	EAttributeId.RageChange,
	EAttributeId.RageReduce,
	EAttributeId.HardnessMax,
	EAttributeId.Hardness,
	EAttributeId.HardnessRecover,
	EAttributeId.HardnessPunishTime,
	EAttributeId.HardnessChange,
	EAttributeId.HardnessReduce,
];
let CharacterGasDebugComponent =
	(CharacterGasDebugComponent_1 = class CharacterGasDebugComponent extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.HUo = void 0),
				(this.EnableCollisionDebugDraw = !1),
				(this.jUo = 0),
				(this.WUo = void 0),
				(this.KUo = new Array()),
				(this.QUo = (t) => {
					t.includes("Tag") ||
						((this.jUo = this.jUo + 1),
						this.KUo.unshift("Num " + this.jUo + ": " + t),
						this.KUo.length > MAX_DEBUG_STRING_NUMS && this.KUo.pop());
				}),
				(this.$Uo = new Array()),
				(this.XUo = new Array()),
				(this.YUo = (t, e, r, i, a) => {
					this.JUo.unshift(
						EMovementModeName[e] +
							"." +
							i.toFixed() +
							" ->" +
							EMovementModeName[r] +
							"." +
							a.toFixed(),
					);
				}),
				(this.zUo = (t, e) => {
					this.JUo.unshift(
						CharacterUnifiedStateTypes_1.ECharMoveState[t] +
							" ->" +
							CharacterUnifiedStateTypes_1.ECharMoveState[e],
					);
				}),
				(this.ZUo = (t, e) => {
					this.JUo.unshift(
						CharacterUnifiedStateTypes_1.ECharPositionState[t] +
							" ->" +
							CharacterUnifiedStateTypes_1.ECharPositionState[e],
					);
				}),
				(this.eAo = (t) => {
					this.JUo.unshift("Set NewBeHit:" + t);
				}),
				(this.JUo = new Array()),
				(this.tAo = (t) => {
					if (CharacterGasDebugComponent_1.iAo) {
						var e = t.Attacker;
						if (this.rAo(e)) {
							var r = new Array(),
								i =
									(r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
									r.push(CharacterGasDebugComponent_1.oAo(Date.now())),
									e.GetComponent(0)),
								a = i.GetEntityType();
							if (a === Protocol_1.Aki.Protocol.EEntityType.Player) {
								r.push("角色"), r.push(i.GetPbDataId().toFixed());
								var n = i.Valid ? i.GetRoleId() : 0,
									n =
										ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
											n,
										).GetRoleId(),
									n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n),
									n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
										n.Name,
									);
								r.push(n);
							} else {
								if (a !== Protocol_1.Aki.Protocol.EEntityType.Monster) return;
								r.push("怪物"), r.push(i.GetPbDataId().toFixed());
								n = PublicUtil_1.PublicUtil.GetConfigTextByKey(
									i.GetBaseInfo()?.TidName ?? "",
								);
								r.push(n);
							}
							r.push(t.BulletRowName);
							(a = t.BulletDataMain),
								(i =
									(r.push(a?.BulletName ?? "0"),
									r.push(a.Base.DamageId.toString()),
									t.BulletInitParams.SkillId)),
								(n = (r.push(i ? i.toFixed() : ""), e.GetComponent(33))),
								(a = i ? n.GetSkillInfo(i) : void 0),
								(e =
									(r.push(a ? ESkillGenreName[a.SkillGenre] : ""),
									t.Entity.Id));
							CharacterGasDebugComponent_1.nAo.set(e, r),
								CharacterGasDebugComponent_1.sAo.push(e);
						}
					}
				}),
				(this.RecordMove = (t, e, r) => {
					var i, a, n;
					CharacterGasDebugComponent_1.iAo &&
						this.rAo(this.Entity) &&
						((i = this.Entity),
						(a = new Array()).push(
							CharacterGasDebugComponent_1.SecondsSinceStartup(),
						),
						a.push(CharacterGasDebugComponent_1.oAo(Date.now())),
						i?.GetComponent(83) ? a.push("角色") : a.push("怪物"),
						(n = i?.CheckGetComponent(0).GetPbDataId()),
						a.push(n.toFixed(0)),
						(n = i?.GetComponent(3).Actor.GetName()),
						a.push(n),
						a.push(e.toString()),
						a.push(ESkillGenreName[r]),
						(n = i.GetComponent(155)),
						a.push(n.GetCurrentValue(EAttributeId.Atk).toFixed()),
						a.push(n.GetCurrentValue(EAttributeId.Crit).toFixed()),
						a.push(n.GetCurrentValue(EAttributeId.CritDamage).toFixed()),
						a.push(n.GetCurrentValue(EAttributeId.Life).toFixed()),
						a.push(n.GetCurrentValue(EAttributeId.Def).toFixed()),
						a.push(n.GetCurrentValue(EAttributeId.DamageChange).toFixed()),
						CharacterGasDebugComponent_1.aAo.push(a.join(",")),
						CharacterGasDebugComponent_1.hAo(i, t.Entity, r));
				}),
				(this.lAo = void 0),
				(this.ServerDebugInfoDirty = !1),
				(this._Ao = (t, e) => {
					var e = this.Entity.GetComponent(33)?.GetSkillInfo(e),
						r =
							(CharacterGasDebugComponent_1.uAo ||
								(CharacterGasDebugComponent_1.uAo = new Map()),
							this.Entity.Id);
					if (4 === e.SkillGenre) {
						let t = CharacterGasDebugComponent_1.uAo.get(r);
						t ||
							((t = new PriorityQueue_1.PriorityQueue(
								CharacterGasDebugComponent_1.cAo,
							)),
							CharacterGasDebugComponent_1.uAo.set(r, t));
						var i = new DamageRecordDsp(
							UE.KismetSystemLibrary.GetGameTimeInSeconds(
								GlobalData_1.GlobalData.GameInstance,
							),
							-1,
							!0,
							!1,
							!1,
							!1,
						);
						t.Push(i);
					} else if (12 === e.SkillGenre) {
						let t = CharacterGasDebugComponent_1.uAo.get(r);
						t ||
							((t = new PriorityQueue_1.PriorityQueue(
								CharacterGasDebugComponent_1.cAo,
							)),
							CharacterGasDebugComponent_1.uAo.set(r, t));
						i = new DamageRecordDsp(
							UE.KismetSystemLibrary.GetGameTimeInSeconds(
								GlobalData_1.GlobalData.GameInstance,
							),
							-1,
							!1,
							!1,
							!1,
							!0,
						);
						t.Push(i);
					}
				});
		}
		OnStart() {
			var t = this.Entity.CheckGetComponent(3);
			return (
				(this.HUo = t?.Actor.AbilitySystemComponent),
				CharacterGasDebugComponent_1.mAo(),
				this.dAo(),
				this.CAo(),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharRecordOperate,
					this.RecordMove,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharUseSkill,
					this._Ao,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BulletCreate,
					this.tAo,
				),
				!0
			);
		}
		OnTick() {
			if (this.EnableCollisionDebugDraw) {
				var e = this.Entity.CheckGetComponent(3);
				if (e) {
					var r = e.Actor.K2_GetComponentsByClass(
						UE.CapsuleComponent.StaticClass(),
					);
					for (let t = 0; t < r.Num(); t++) {
						var i = r.Get(t);
						UE.KismetSystemLibrary.DrawDebugCapsule(
							e.Actor,
							i.K2_GetComponentLocation(),
							i.CapsuleHalfHeight,
							i.CapsuleRadius,
							i.K2_GetComponentRotation(),
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
				this.WUo?.EndTask(),
				(this.WUo = void 0),
				this.gAo(),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharRecordOperate,
					this.RecordMove,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharUseSkill,
					this._Ao,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.BulletCreate,
					this.tAo,
				),
				!0
			);
		}
		static mAo() {
			this.fAo ||
				((this.fAo = !0),
				GameplayTagUtils_1.GameplayTagUtils.CheckGameplayTagIdUniqueness());
		}
		dAo() {
			this.HUo &&
				((this.WUo =
					UE.AsyncTaskEffectDebugString.ListenForGameplayEffectExecutedDebugString(
						this.HUo,
					)),
				this.WUo?.OnAnyGameplayEffectExecuted.Add(this.QUo));
		}
		GetGeDebugStrings() {
			return this.KUo.join(" ");
		}
		GetTagDebugStrings() {
			return (
				this.Entity.GetComponent(184)?.TagContainer.GetDebugString() ??
				"找不到tag组件"
			);
		}
		GetTagContainerDebugString(e) {
			var r = e.GameplayTags?.Num() ?? 0;
			if (r <= 0) return "";
			let i = "";
			for (let t = 0; t < r; t++) i += e.GameplayTags.Get(t).TagName + " ";
			return i;
		}
		GetBuffEffectDebugString(t) {
			let e = "";
			for (const r of this.Entity.GetComponent(
				156,
			).BuffEffectManager.GetAllEffects())
				this.pAo(t, String(r.BuffId)) &&
					(e += `${r.constructor.name} buffId:${r.BuffId} handle:${r.ActiveHandleId}\n`);
			return e;
		}
		GetShieldDebugString() {
			this.$Uo.length = 0;
			var t = this.Entity.GetComponent(63);
			if (t)
				for (var [, e] of t.GetDebugShieldInfo()) {
					var r = e.ShieldValue,
						i = e.Priority,
						e = e.TemplateId;
					this.$Uo.push(
						`Shield magnitude: ${r} priority: ${i} templateId: ` + e,
					);
				}
			t = this.Entity.GetComponent(155)?.GetLockDebugString() ?? "";
			return "\n\nShields:\n" + this.$Uo.join("\n") + t;
		}
		GetPassiveSkillDebugString() {
			var t = this.Entity.GetComponent(23);
			return t?.Valid ? t.GetDebugString() ?? "" : "";
		}
		GetAttributeDebugStrings() {
			var e = this.Entity.GetComponent(155);
			if (!e) return "Invalid";
			let r = "";
			for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
				var i = e.GetBaseValue(t),
					a = e.GetCurrentValue(t),
					n = Protocol_1.Aki.Protocol.EAttributeType[t];
				CharacterAttributeTypes_1.stateAttributeIds.has(t) || a === i
					? (r += `#${t} ${n}	= ${a.toFixed(0)}
`)
					: (r +=
							i < a
								? `#${t} ${n}	= ${a.toFixed(0)}(+${(a - i).toFixed(0)})
`
								: `#${t} ${n}	= ${a.toFixed(0)}(${(a - i).toFixed(0)})
`);
			}
			return (r +=
				"\n队伍属性：\n" +
				CharacterGasDebugComponent_1.GetFormationAttributeDebugStrings());
		}
		GetAllAttributeDebugStrings() {
			this.XUo.length = 0;
			var e = this.Entity.GetComponent(155);
			for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
				var r = e.GetBaseValue(t),
					i = e.GetCurrentValue(t),
					a = Protocol_1.Aki.Protocol.EAttributeType[t],
					a = `Attribute ID: ${t}   ${a}
    Base: ${r.toFixed()}    Current: ${i.toFixed()}
`;
				this.XUo.push(a);
			}
			return this.XUo.join("\n");
		}
		static GetFormationAttributeDebugStrings() {
			let t = "";
			for (const n of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
				var e = n.Id,
					r =
						FormationAttributeController_1.FormationAttributeController.GetValue(
							e,
						),
					i =
						FormationAttributeController_1.FormationAttributeController.GetMax(
							e,
						),
					a =
						FormationAttributeController_1.FormationAttributeController.GetSpeed(
							e,
						);
				t += `#${e} = ${r?.toFixed(0)}/${i?.toFixed(0)} (${a?.toFixed(0)}/s)
`;
			}
			return t;
		}
		CAo() {
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharMovementModeChanged,
				this.YUo,
			),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.zUo,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnPositionStateChanged,
					this.ZUo,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnSetNewBeHit,
					this.eAo,
				);
		}
		gAo() {
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharMovementModeChanged,
				this.YUo,
			),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.zUo,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnPositionStateChanged,
					this.ZUo,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnSetNewBeHit,
					this.eAo,
				);
		}
		GetAllMovementHistory() {
			return 50 < this.JUo.length && this.JUo.pop(), this.JUo.join("\n");
		}
		DebugResetBaseValue(t, e) {
			t >= EAttributeId.Lv &&
				t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX &&
				this.Entity.GetComponent(155).SetBaseValue(t, e);
		}
		static get IsServerLogOff() {
			return this.vAo;
		}
		static ReceiveSwitchServerLogMode(t) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					20,
					"[CharacterAbilityComponent]Server switch Buff Mode",
					["isClientControl", t],
				),
				(this.vAo = t);
		}
		static RequestSwitchServerMode(t) {
			var e = Protocol_1.Aki.Protocol.SwitchBattleModeRequest.create({
				Client: t,
				ClientControllerModule: Protocol_1.Aki.Protocol.BattleModule.Log,
			});
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					20,
					"[CharacterDamageComponent]Request Buff Mode",
					["isClientControl", t],
				),
				Net_1.Net.Call(
					NetDefine_1.ERequestMessageId.SwitchBattleModeRequest,
					e,
					(t) => {
						this.ReceiveSwitchServerLogMode(t.Client);
					},
				);
		}
		static SecondsSinceStartup() {
			return (
				UE.KismetSystemLibrary.GetGameTimeInSeconds(
					GlobalData_1.GlobalData.GameInstance,
				) - CharacterGasDebugComponent_1.MAo
			).toFixed(2);
		}
		static SetDistanceMax(t) {}
		static BeginRecord() {
			(this.iAo = !0),
				(this.MAo = UE.KismetSystemLibrary.GetGameTimeInSeconds(
					GlobalData_1.GlobalData.GameInstance,
				)),
				this.SetDamageRecord(!0),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnChangeRole,
					this.sie,
				),
				(CharacterGasDebugComponent_1.uAo = void 0),
				CharacterGasDebugComponent_1.EAo(
					Global_1.Global.BaseCharacter.EntityId,
					!0,
					!1,
				);
		}
		static EndRecord() {
			return this.iAo
				? ((this.iAo = !1),
					this.SetDamageRecord(!1),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.OnChangeRole,
						this.sie,
					),
					this.SAo())
				: "";
		}
		static SAo() {
			var t = new Array(),
				e = "";
			let r = "";
			UE.KuroStaticLibrary.SaveStringToFile(
				"X秒,当前时间,对象,对象ID,对象名称,技能ID,技能类型,攻击,暴击,爆伤,生命,防御,伤害加成\n" +
					this.aAo.join("\n"),
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"SkillRecord.csv",
				!0,
			);
			var i = new Array(),
				a =
					"X秒,当前时间,对象,对象ID,对象名称,子弹ID,子弹名称,伤害ID,技能ID,技能类型,子弹是否命中\n";
			for (const q of this.sAo) {
				var n = this.nAo.get(q);
				n.push(
					ModelManager_1.ModelManager.BulletModel.IsBulletHit(q) ? "1" : "0",
				),
					i.push(n.join(","));
			}
			UE.KuroStaticLibrary.SaveStringToFile(
				a + i.join("\n"),
				UE.BlueprintPathsLibrary.ProjectSavedDir() +
					this.Pt +
					"BulletRecord.csv",
				!0,
			),
				this.nAo.clear(),
				(this.sAo.length = 0),
				(a =
					"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,Config ID,攻击,暴击,爆伤,生命,防御,伤害加成\n"),
				UE.KuroStaticLibrary.SaveStringToFile(
					a + this.yAo.join("\n"),
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"DamageRecord.csv",
					!0,
				),
				(a =
					"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,是否暴击,唯一ID,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,白条倍率,白条倍率百分比0,白条倍率百分比1,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
				UE.KuroStaticLibrary.SaveStringToFile(
					a + this.IAo.join("\n"),
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"DamageRecord_Attr.csv",
					!0,
				),
				(this.IAo.length = 0),
				(a =
					"X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,是否暴击,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
				UE.KuroStaticLibrary.SaveStringToFile(
					a + this.TAo.join("\n"),
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"DamageRecord_Snipeshot.csv",
					!0,
				),
				(this.TAo.length = 0),
				(r =
					"X秒,当前时间,对象,对象ID,对象名称,BuffId,Buff名称,添加or删除\n" +
					this.LAo.join("\n")),
				UE.KuroStaticLibrary.SaveStringToFile(
					r,
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"BuffRecord.csv",
					!0,
				);
			for (const H of this.DAo.values()) t.push(H.ToCsv().join(","));
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
				(a =
					"角色ID,角色名称,受伤来源ConfigId,受伤来源名称,受伤来源唯一ID,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n");
			for (const V of this.RAo.values()) t.push(V.ToCsvForRole().join(","));
			(r = a + t.join("\n")),
				UE.KuroStaticLibrary.SaveStringToFile(
					r,
					UE.BlueprintPathsLibrary.ProjectSavedDir() +
						this.Pt +
						"RoleDamageSum.csv",
					!0,
				),
				(t.length = 0),
				(e += r + "\n"),
				(a =
					"怪物ConfigID,怪物名称,怪物唯一Id,攻击者ConfigId,攻击者名称,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n");
			for (const x of this.UAo.values()) t.push(x.ToCsvForMonster().join(","));
			(r = a + t.join("\n")),
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
				UE.KismetSystemLibrary.GetGameTimeInSeconds(
					GlobalData_1.GlobalData.GameInstance,
				) - CharacterGasDebugComponent_1.MAo;
			let s = 0;
			for (; o >= s; ) (r += ",'" + s.toString() + "s'"), (s += 0.5);
			let h = "";
			var a = (0, puerts_1.$ref)(h),
				u =
					(UE.FileSystemOperation.ReadFile(
						UE.KismetSystemLibrary.GetProjectDirectory() +
							"../Config/ResConfig/RoleDspTpl.txt",
						a,
					),
					(h = (h = (0, puerts_1.$unref)(a)).replace("TPL_XAXIS_VALUES", r)),
					new StringBuilder_1.StringBuilder()),
				_ = new Map(),
				l = new Map(),
				C = new Map(),
				c = new Map(),
				f = new Map(),
				g = new Map(),
				b = new Map(),
				m = new Map(),
				d = new Map();
			for (s = 0; o >= s; ) {
				for (var [E, D] of CharacterGasDebugComponent_1.uAo) {
					c.has(E) || c.set(E, new Array()),
						f.has(E) || f.set(E, new Array()),
						g.has(E) || g.set(E, new Array()),
						b.has(E) || b.set(E, new Array()),
						m.has(E) || m.set(E, new Array()),
						d.has(E) || d.set(E, new Array()),
						_.has(E) || _.set(E, 0),
						l.has(E) || l.set(E, 0),
						C.has(E) || C.set(E, !1);
					let t = !1,
						e = !1;
					for (; !D.Empty; ) {
						var v = D.Top;
						if (!(v.TimeStamp <= this.MAo + s)) break;
						0 < v.DamageValue
							? _.set(E, _.get(E) + v.DamageValue)
							: v.InGame
								? C.set(E, !0)
								: v.OutGame
									? C.set(E, !1)
									: v.QteBegin
										? (t = !0)
										: v?.OutGameSkill && (e = !0),
							D.Pop(),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Character", 21, "打印时间", [
									"time",
									v.TimeStamp,
								]);
					}
					c.get(E).push(_.get(E)),
						f.get(E).push(C.get(E) ? "-10" : "'-'"),
						g.get(E).push(t ? "-20" : "'-'"),
						b.get(E).push(e ? "-30" : "'-'");
					var p = l.get(E);
					d.get(E).push(0 < p ? _.get(E) / p : 0),
						m.get(E).push(0 < s ? _.get(E) / s : 0),
						C.get(E) && l.set(E, l.get(E) + 0.5);
				}
				s += 0.5;
			}
			var A,
				I,
				y,
				M,
				S,
				G,
				U,
				w,
				R,
				P,
				O,
				$,
				B = [],
				T = [];
			for ([A, I] of c) {
				B.push(A);
				var N = EntitySystem_1.EntitySystem.Get(A).GetComponent(0),
					N = N.Valid ? N.GetRoleId() : 0,
					N =
						ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
							N,
						).GetRoleId(),
					N = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(N),
					N = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(N.Name);
				T.push(N),
					u.Append(
						StringUtils_1.StringUtils.Format(
							"{name: '{0}伤害', type: 'line', data: [{1}],},",
							N,
							I.join(","),
						),
					);
			}
			for ([y, M] of m) {
				var L = B.indexOf(y);
				u.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}绝对DPS', type: 'line', data: [{1}],},",
						T[L],
						M.join(","),
					),
				);
			}
			for ([S, G] of d) {
				var k = B.indexOf(S);
				u.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}站场DPS', type: 'line', data: [{1}],},",
						T[k],
						G.join(","),
					),
				);
			}
			for ([U, w] of f) {
				var F = B.indexOf(U);
				u.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}在场上', type: 'line', data: [{1}],},",
						T[F],
						w.join(","),
					),
				);
			}
			for ([R, P] of g) {
				var Q = B.indexOf(R);
				u.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}QTE', type: 'line', data: [{1}],},",
						T[Q],
						P.join(","),
					),
				);
			}
			for ([O, $] of b) {
				var X = B.indexOf(O);
				u.Append(
					StringUtils_1.StringUtils.Format(
						"{name: '{0}退场技', type: 'line', data: [{1}],},",
						T[X],
						$.join(","),
					),
				);
			}
			return (
				(h = h.replace("CONTENT_SERIES", u.ToString())),
				UE.KuroStaticLibrary.SaveStringToFile(
					h,
					UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDsp.html",
					!0,
				),
				(this.aAo.length = 0),
				(this.yAo.length = 0),
				this.DAo.clear(),
				this.RAo.clear(),
				this.UAo.clear(),
				e
			);
		}
		rAo(t) {
			return CharacterStatisticsComponent_1.CharacterStatisticsComponent.IsInRecordArea(
				t,
			);
		}
		static RecordDamage(t, e, r, i) {
			var a = new Array(),
				r = (a.push(r), a.push(i), CharacterGasDebugComponent_1.AAo(t));
			a.push(r.Type),
				a.push(r.ConfigId),
				a.push(r.Name),
				t.GetComponent(83) ? a.push("角色") : a.push("怪物"),
				a.push(MathUtils_1.MathUtils.LongToBigInt(e.DamageConfId).toString());
			let n = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
					t,
					MathUtils_1.MathUtils.LongToBigInt(e.BulletId).toString(),
					!1,
				),
				o = void 0,
				s =
					(n ||
						((i =
							ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
								t.Id,
								1,
							)),
						(o = EntitySystem_1.EntitySystem.Get(i))?.Valid &&
							(n = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
								o,
								MathUtils_1.MathUtils.LongToBigInt(e.BulletId).toString(),
							))),
					a.push(n?.BulletName ?? ""),
					a.push(e.DamageValue.toFixed()),
					a.push(e.SkillId.toFixed()),
					t.GetComponent(33)?.GetSkillInfo(e.SkillId));
			(s = s || o?.GetComponent(33)?.GetSkillInfo(e.SkillId)),
				a.push(s?.SkillName?.toString()),
				a.push(
					MathUtils_1.MathUtils.LongToBigInt(e.Attacker.EntityId).toString(),
				);
			var r = t?.CheckGetComponent(0).GetPbDataId().toFixed(),
				h = (a.push(r), a.length);
			for (const u of e.Victim.Attr)
				u.AttributeType === EAttributeId.Atk
					? (a[h] = u.CurrentValue.toFixed())
					: u.AttributeType === EAttributeId.Crit
						? (a[h + 1] = u.CurrentValue.toFixed())
						: u.AttributeType === EAttributeId.CritDamage
							? (a[h + 2] = u.CurrentValue.toFixed())
							: u.AttributeType === EAttributeId.Life
								? (a[h + 3] = u.CurrentValue.toFixed())
								: u.AttributeType === EAttributeId.Def
									? (a[h + 4] = u.CurrentValue.toFixed())
									: u.AttributeType === EAttributeId.DamageChange &&
										(a[h + 5] = u.CurrentValue.toFixed());
			CharacterGasDebugComponent_1.yAo.push(a.join(","));
			(i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
				MathUtils_1.MathUtils.LongToNumber(e.Victim.EntityId),
			)),
				(r = EntitySystem_1.EntitySystem.Get(i));
			CharacterGasDebugComponent_1.xAo(r, t, e.DamageValue, s?.SkillGenre);
		}
		static xAo(t, e, r, i) {
			let a = this.RAo;
			t?.GetComponent(83) || (a = this.UAo);
			var n,
				o = t.Id.toFixed() + e.Id.toFixed(),
				s = a.get(o);
			s
				? ((s.TotalDamage += r),
					(n = s.RecordDamage.get(i) ?? 0),
					s.RecordDamage.set(i, n + r))
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
					(t = s.RecordDamage.get(i) ?? 0),
					s.RecordDamage.set(i, t + r),
					a.set(o, s));
		}
		static hAo(t, e, r) {
			var i = t?.GetComponent(3).Actor.GetName() ?? "",
				t = t?.CheckGetComponent(0).GetPbDataId() ?? 0,
				e = e?.Id ?? 0,
				a = this.DAo.get(t + e);
			a
				? a.RecordNum.set(r, a.RecordNum.get(r) + 1)
				: (((a = new RecordMoveSum()).ConfigId = t),
					(a.Name = i),
					(a.TargetUniqueId = e),
					a.RecordNum.set(r, 1),
					this.DAo.set(t + e, a));
		}
		pAo(t, e) {
			return !t || e.includes(t) || t.includes(e);
		}
		GetServerBuffString() {
			if (!this.lAo?.FightBuffComponentPb?.FightBuffInfos) return "";
			let t = "";
			for (const s of this.lAo.FightBuffComponentPb.FightBuffInfos) {
				var e = MathUtils_1.MathUtils.LongToBigInt(s.BuffId),
					r = MathUtils_1.MathUtils.LongToBigInt(s.InstigatorId).toString(),
					i = CharacterBuffController_1.default.GetBuffDefinition(e),
					i = i ? i.Desc : "";
				t += this.PAo(
					e.toString(),
					s.HandleId,
					i,
					s.StackCount,
					s.Level,
					s.IsActive,
					r,
					s.LeftDuration,
					s.Duration,
				);
			}
			if (!this.lAo?.FormationBuffs) return "";
			for (const h of this.lAo.FormationBuffs) {
				var a = MathUtils_1.MathUtils.LongToBigInt(h.Id),
					n = MathUtils_1.MathUtils.LongToBigInt(h.InstigatorId).toString(),
					o = CharacterBuffController_1.default.GetBuffDefinition(a),
					o = o ? o.Desc : "";
				t += this.PAo(
					"编 " + a.toString(),
					h.Handle,
					o,
					h.StackCount,
					h.Level,
					h.IsActive,
					n,
					h.LeftDuration ?? 0,
					h.Duration ?? 0,
				);
			}
			if (0 < this.lAo.FightBuffComponentPb.ListBuffEffectCd.length) {
				t += "\nCD : \n";
				for (const u of this.lAo.FightBuffComponentPb.ListBuffEffectCd)
					if (!(u.ListCdRemaining.length <= 0)) {
						t +=
							"[" +
							MathUtils_1.MathUtils.LongToBigInt(u.BuffId).toString() +
							"] ";
						for (const _ of u.ListCdRemaining) t += _.toFixed() + ", ";
					}
			}
			return t;
		}
		PAo(t, e, r, i, a, n, o, s, h) {
			return (
				"[" +
				t +
				", " +
				e +
				"] " +
				i +
				"层," +
				a +
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
			if (this.lAo?.EntityBattleTagInfo)
				for (const e of this.lAo.EntityBattleTagInfo)
					t =
						t +
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.TagId)
							.TagName +
						" " +
						e.Count.toString() +
						"\n";
			if (this.lAo?.PlayerTagInfos)
				for (const r of this.lAo.PlayerTagInfos)
					t =
						t +
						"[编] " +
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r.TagId)
							.TagName +
						" " +
						r.Count.toString() +
						"\n";
			return t;
		}
		GetServerAttributeString() {
			if (!this.lAo?.Attributes) return "";
			let t = "";
			for (const e of this.lAo.Attributes)
				t =
					t +
					e.AttributeType +
					" " +
					Protocol_1.Aki.Protocol.EAttributeType[e.AttributeType] +
					":[" +
					e.BaseValue.toString() +
					"][" +
					e.CurrentValue.toString() +
					"]\n";
			t += "\n队伍属性：\n";
			for (const r of this.lAo.FormationAttrs)
				t =
					t +
					r.AttrId.toString() +
					"=" +
					r.CurrentValue.toString() +
					"/" +
					r.MaxValue.toString() +
					"(" +
					r.Ratio.toString() +
					"/s)\n";
			return t;
		}
		GetServerPartString() {
			if (!this.lAo?.PartComponentPb?.PartLifeInfos) return "";
			let t = "";
			for (const e of this.lAo.PartComponentPb.PartLifeInfos)
				t +=
					e.PartId +
					" :  " +
					e.LifeValue.toFixed(1) +
					" / " +
					e.LifeMax.toFixed(1) +
					", " +
					e.Activated +
					"\n";
			return t;
		}
		GetServerHateString() {
			if (!this.lAo?.HateList) return "";
			let t = "";
			for (const e of this.lAo.HateList)
				t +=
					MathUtils_1.MathUtils.LongToBigInt(e.EntityId) +
					" : " +
					e.HatredValue.toFixed(1) +
					"\n";
			return t;
		}
		GetServerShieldString() {
			if (!this.lAo?.ShieldComponentPb) return "";
			let t = "护盾总值: " + this.lAo.ShieldComponentPb.ShieldValueTotal + "\n";
			for (const e of this.lAo.ShieldComponentPb.ShieldInfoPbList)
				t +=
					"[" +
					e.ConfigId +
					"," +
					e.Handle +
					"] " +
					(e.IsValid ? "生效" : "失效") +
					", " +
					e.ShieldValue +
					"," +
					e.BuffHandle +
					"," +
					e.Priority +
					"\n";
			return t;
		}
		ServerDebugInfoRequest() {
			var t = Protocol_1.Aki.Protocol.EntityBattleInfoRequest.create();
			(t.EntityId = MathUtils_1.MathUtils.NumberToLong(
				ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
					this.Entity.Id,
				),
			)),
				Net_1.Net.Call(
					NetDefine_1.ERequestMessageId.EntityBattleInfoRequest,
					t,
					(t) => {
						t && ((this.lAo = t), (this.ServerDebugInfoDirty = !0));
					},
				);
		}
		OnBuffAdded(t) {
			CharacterGasDebugComponent_1.iAo &&
				(t = this.wAo(t, "添加")) &&
				CharacterGasDebugComponent_1.LAo.push(t.join(","));
		}
		OnBuffRemoved(t) {
			CharacterGasDebugComponent_1.iAo &&
				(t = this.wAo(t, "删除")) &&
				CharacterGasDebugComponent_1.LAo.push(t.join(","));
		}
		wAo(t, e) {
			var r = new Array(),
				i =
					(r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
					r.push(CharacterGasDebugComponent_1.oAo(Date.now())),
					t.GetInstigator()),
				i = i ? CharacterGasDebugComponent_1.AAo(i) : void 0;
			if (i)
				return (
					r.push(i.Type),
					r.push(i.ConfigId),
					r.push(i.Name),
					r.push(t.Config.Id.toString()),
					r.push(t.Config.Desc),
					r.push(e),
					r
				);
		}
		static AAo(t) {
			var e,
				t = t.GetComponent(0),
				r = t.GetEntityType();
			return r === Protocol_1.Aki.Protocol.EEntityType.Player
				? ((e = t.Valid ? t.GetRoleId() : 0),
					(e =
						ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
							e,
						).GetRoleId()),
					(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
					{
						Name: ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name),
						Type: "角色",
						ConfigId: t.GetPbDataId().toFixed(),
					})
				: r === Protocol_1.Aki.Protocol.EEntityType.Monster
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
			var e = Protocol_1.Aki.Protocol.Debug.EnableDamageRecordRequest.create();
			(e.Enable = t),
				Net_1.Net.Call(
					NetDefine_1.ERequestMessageId.EnableDamageRecordRequest,
					e,
					(t) => {
						t &&
							Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("CombatInfo", 21, "", ["Response", t]);
					},
				);
		}
		static OnDamageRecordNotify(t, e) {
			var r,
				i,
				a = EntitySystem_1.EntitySystem.Get(
					ModelManager_1.ModelManager.CreatureModel.GetEntityId(
						MathUtils_1.MathUtils.LongToNumber(e.Attacker.EntityId),
					),
				);
			a.GetComponent(24)?.GetStatisticsEnable() &&
				((r = this.SecondsSinceStartup()),
				(i = this.oAo(e.TimestampMs)),
				this.RecordDamage(a, e, r, i),
				this.BAo(a, e, r, i),
				this.bAo(a, e, r, i),
				this.qAo(a, e));
		}
		static qAo(e, r) {
			var i = e.GetComponent(0);
			if (
				i &&
				i.GetEntityType() === Protocol_1.Aki.Protocol.EEntityType.Player
			) {
				this.uAo || (this.uAo = new Map());
				i = e.Id;
				let t = this.uAo.get(i);
				t ||
					((t = new PriorityQueue_1.PriorityQueue(this.cAo)),
					this.uAo.set(i, t));
				e = new DamageRecordDsp(
					UE.KismetSystemLibrary.GetGameTimeInSeconds(
						GlobalData_1.GlobalData.GameInstance,
					),
					r.DamageValue,
					!1,
					!1,
					!1,
					!1,
				);
				t.Push(e);
			}
		}
		static EAo(t, e, r) {
			CharacterGasDebugComponent_1.uAo ||
				(CharacterGasDebugComponent_1.uAo = new Map());
			let i = CharacterGasDebugComponent_1.uAo.get(t);
			i ||
				((i = new PriorityQueue_1.PriorityQueue(
					CharacterGasDebugComponent_1.cAo,
				)),
				CharacterGasDebugComponent_1.uAo.set(t, i));
			t = new DamageRecordDsp(
				UE.KismetSystemLibrary.GetGameTimeInSeconds(
					GlobalData_1.GlobalData.GameInstance,
				),
				-1,
				!1,
				e,
				r,
				!1,
			);
			i.Push(t);
		}
		static bAo(t, e, r, i) {
			var a = new Array(),
				r = (a.push(r), a.push(i), CharacterGasDebugComponent_1.AAo(t));
			a.push(r.Type),
				a.push(r.ConfigId),
				a.push(r.Name),
				a.push(
					e.DamageSourceType ===
						Protocol_1.Aki.Protocol.DamageSourceType.FromBullet
						? "子弹"
						: "Buff",
				),
				a.push(MathUtils_1.MathUtils.LongToBigInt(e.DamageConfId).toString());
			let n = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
					t,
					MathUtils_1.MathUtils.LongToBigInt(e.BulletId).toString(),
					!1,
				),
				o = void 0,
				s =
					(n ||
						((i =
							ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
								t.Id,
								1,
							)),
						(o = EntitySystem_1.EntitySystem.Get(i))?.Valid &&
							(n = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
								o,
								MathUtils_1.MathUtils.LongToBigInt(e.BulletId).toString(),
							))),
					a.push(n?.BulletName ?? ""),
					a.push(e.DamageValue.toFixed()),
					a.push(e.SkillId.toFixed()),
					t.GetComponent(33)?.GetSkillInfo(e.SkillId)?.SkillName);
			(s = s || o?.GetComponent(33)?.GetSkillInfo(e.SkillId)?.SkillName),
				a.push(s?.toString() ?? ""),
				a.push(
					MathUtils_1.MathUtils.LongToBigInt(e.Attacker.EntityId).toString(),
				),
				a.push(e.IsCritical ? "1" : "0");
			var r = a.length,
				i =
					(this.GAo(e.Victim.AttrSnapshot, a, r),
					this.GAo(e.Attacker.AttrSnapshot, a, r + 59),
					DamageById_1.configDamageById.GetConfig(
						MathUtils_1.MathUtils.LongToBigInt(e.DamageConfId),
					)),
				t = e.SkillLevel,
				h =
					((a[r + 118] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						i.ToughLv,
						t,
						0,
					).toString()),
					(a[r + 119] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						i.Energy,
						t,
						0,
					).toString()),
					(a[r + 120] = i.ElementPowerType.toString()),
					(a[r + 121] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						i.ElementPower,
						t,
						0,
					).toString()),
					new Array()),
				u = new Array();
			for (const f of e.Attacker.BuffIds) {
				var _ = MathUtils_1.MathUtils.LongToBigInt(f),
					l = CharacterBuffController_1.default.GetBuffDefinition(_);
				h.push(l.Desc), u.push(_);
			}
			(a[r + 122] = u.join("|")),
				(a[r + 123] = h.join("|")),
				(h.length = 0),
				(u.length = 0);
			for (const g of e.Victim.BuffIds) {
				var C = MathUtils_1.MathUtils.LongToBigInt(g),
					c = CharacterBuffController_1.default.GetBuffDefinition(C);
				h.push(c.Desc), u.push(C);
			}
			(a[r + 124] = u.join("|")), (a[r + 125] = h.join("|"));
			i = a.join(",");
			this.TAo.push(i),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Recorder", 21, "结算信息Snapshot", ["Result", i]);
		}
		static oAo(t) {
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
		static BAo(t, e, r, i) {
			var a = new Array(),
				r = (a.push(r), a.push(i), CharacterGasDebugComponent_1.AAo(t));
			a.push(r.Type),
				a.push(r.ConfigId),
				a.push(r.Name),
				a.push(
					e.DamageSourceType ===
						Protocol_1.Aki.Protocol.DamageSourceType.FromBullet
						? "子弹"
						: "Buff",
				),
				a.push(MathUtils_1.MathUtils.LongToBigInt(e.DamageConfId).toString());
			let n = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
					t,
					MathUtils_1.MathUtils.LongToBigInt(e.BulletId).toString(),
					!1,
				),
				o = void 0,
				s =
					(n ||
						((i =
							ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
								t.Id,
								1,
							)),
						(o = EntitySystem_1.EntitySystem.Get(i))?.Valid &&
							(n = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
								o,
								MathUtils_1.MathUtils.LongToBigInt(e.BulletId).toString(),
							))),
					a.push(n?.BulletName ?? ""),
					a.push(e.DamageValue.toFixed()),
					a.push(e.SkillId.toFixed()),
					t.GetComponent(33)?.GetSkillInfo(e.SkillId)?.SkillName);
			(s = s || o?.GetComponent(33)?.GetSkillInfo(e.SkillId)?.SkillName),
				a.push(s?.toString() ?? ""),
				a.push(e.IsCritical ? "1" : "0"),
				a.push(
					MathUtils_1.MathUtils.LongToBigInt(e.Attacker.EntityId).toString(),
				);
			var h = a.length,
				r =
					(CharacterGasDebugComponent_1.NAo(e.Victim.Attr, a, h, h + 122),
					DamageById_1.configDamageById.GetConfig(
						MathUtils_1.MathUtils.LongToBigInt(e.DamageConfId),
					));
			let u = void 0;
			1 === r.ElementPowerType
				? (u = EAttributeId.ElementPower1)
				: 2 === r.ElementPowerType
					? (u = EAttributeId.ElementPower2)
					: 3 === r.ElementPowerType
						? (u = EAttributeId.ElementPower3)
						: 4 === r.ElementPowerType
							? (u = EAttributeId.ElementPower4)
							: 5 === r.ElementPowerType
								? (u = EAttributeId.ElementPower5)
								: 6 === r.ElementPowerType && (u = EAttributeId.ElementPower6),
				(a[h + 120] = r.ElementPowerType.toString());
			for (const b of e.Attacker.Attr)
				b.AttributeType === EAttributeId.ToughChange
					? (a[h + 118] = b.CurrentValue.toFixed())
					: b.AttributeType === EAttributeId.Energy
						? (a[h + 119] = b.CurrentValue.toFixed())
						: u &&
							b.AttributeType === u &&
							(a[h + 121] = b.CurrentValue.toFixed());
			CharacterGasDebugComponent_1.NAo(e.Attacker.Attr, a, h + 59, h + 181);
			var i = e.SkillLevel,
				_ =
					((a[h + 240] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.HardnessLv,
						i,
						0,
					).toString()),
					(a[h + 241] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.Percent0,
						i,
						0,
					).toString()),
					(a[h + 242] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.Percent1,
						i,
						0,
					).toString()),
					(a[h + 243] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.ToughLv,
						i,
						0,
					).toString()),
					(a[h + 244] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.Energy,
						i,
						0,
					).toString()),
					(a[h + 245] = r.ElementPowerType.toString()),
					(a[h + 246] = AbilityUtils_1.AbilityUtils.GetLevelValue(
						r.ElementPower,
						i,
						0,
					).toString()),
					new Array()),
				l = new Array();
			for (const m of e.Attacker.BuffIds) {
				var C = MathUtils_1.MathUtils.LongToBigInt(m),
					c = CharacterBuffController_1.default.GetBuffDefinition(C);
				_.push(c.Desc), l.push(C);
			}
			(a[h + 247] = l.join("|")),
				(a[h + 248] = _.join("|")),
				(_.length = 0),
				(l.length = 0);
			for (const d of e.Victim.BuffIds) {
				var f = MathUtils_1.MathUtils.LongToBigInt(d),
					g = CharacterBuffController_1.default.GetBuffDefinition(f);
				_.push(g.Desc), l.push(f);
			}
			(a[h + 249] = l.join("|")), (a[h + 250] = _.join("|"));
			t = a.join(",");
			this.IAo.push(t),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Recorder", 21, "结算信息Attr", ["Result", t]);
		}
		static NAo(t, r, i, a) {
			for (const n of t)
				for (let t = 0, e = attributeIdArray.length; t < e; t++)
					if (n.AttributeType === attributeIdArray[t]) {
						(r[i + t] = (
							0 < n.CurrentValue ? n.CurrentValue : n.BaseValue
						).toString()),
							(r[a + t] = n.BaseValue.toString());
						break;
					}
		}
		static GAo(t, r, i) {
			for (const a of t)
				for (let t = 0, e = attributeIdArray.length; t < e; t++)
					if (a.AttributeType === attributeIdArray[t]) {
						r[i + t] = (
							0 < a.CurrentValue ? a.CurrentValue : a.BaseValue
						).toString();
						break;
					}
		}
	});
(CharacterGasDebugComponent.fAo = !1),
	(CharacterGasDebugComponent.vAo = !1),
	(CharacterGasDebugComponent.iAo = !1),
	(CharacterGasDebugComponent.MAo = 0),
	(CharacterGasDebugComponent.aAo = new Array()),
	(CharacterGasDebugComponent.yAo = new Array()),
	(CharacterGasDebugComponent.DAo = new Map()),
	(CharacterGasDebugComponent.RAo = new Map()),
	(CharacterGasDebugComponent.UAo = new Map()),
	(CharacterGasDebugComponent.nAo = new Map()),
	(CharacterGasDebugComponent.sAo = new Array()),
	(CharacterGasDebugComponent.Pt = "Statistics/FightDataRecord/"),
	(CharacterGasDebugComponent.LAo = new Array()),
	(CharacterGasDebugComponent.uAo = void 0),
	(CharacterGasDebugComponent.cAo = (t, e) => t.TimeStamp - e.TimeStamp),
	(CharacterGasDebugComponent.sie = (t, e) => {
		CharacterGasDebugComponent_1.EAo(t.Id, !0, !1),
			CharacterGasDebugComponent_1.EAo(e.Id, !1, !0);
	}),
	(CharacterGasDebugComponent.TAo = new Array()),
	(CharacterGasDebugComponent.IAo = new Array()),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("DamageRecordNotify")],
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

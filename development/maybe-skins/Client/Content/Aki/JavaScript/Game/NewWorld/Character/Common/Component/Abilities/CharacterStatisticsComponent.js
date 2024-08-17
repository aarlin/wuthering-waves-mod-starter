"use strict";
var CharacterStatisticsComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, i, r) {
			var a,
				o = arguments.length,
				n =
					o < 3
						? e
						: null === r
							? (r = Object.getOwnPropertyDescriptor(e, i))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(t, e, i, r);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(a = t[s]) &&
						(n = (o < 3 ? a(n) : 3 < o ? a(e, i, n) : a(e, i)) || n);
			return 3 < o && n && Object.defineProperty(e, i, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterStatisticsComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../../Core/Common/Time"),
	DamageById_1 = require("../../../../../../Core/Define/ConfigQuery/DamageById"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes"),
	skillTypeToString = [
		"常态攻击",
		"共鸣技能",
		"共鸣解放",
		"固有技能",
		"连携技能",
		"异能力",
		"声骸技能",
	],
	attackTypeToString = [
		"普攻伤害",
		"蓄力攻击伤害",
		"大招伤害",
		"QTE伤害",
		"普通技能伤害",
		"战斗幻象技能伤害",
		"探索幻象技能伤害",
	];
class TargetDamageStatistics {
	constructor(t) {
		(this.TargetId = t), (this.AKo = 0), (this.IsValid = !0);
		var e = (t =
			EntitySystem_1.EntitySystem.Get(t).GetComponent(0)).GetEntityType();
		(this.JB = e === Protocol_1.Aki.Protocol.wks.Proto_Monster),
			(this.XHt = e === Protocol_1.Aki.Protocol.wks.Proto_Player),
			(this.Mne = 0),
			(this.PKo = ""),
			this.JB
				? ((this.Mne = t.GetPbDataId()),
					(this.PKo = PublicUtil_1.PublicUtil.GetConfigTextByKey(
						t.GetBaseInfo()?.TidName ?? "",
					)))
				: this.XHt &&
					((e = t.Valid ? t.GetRoleId() : 0),
					(t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))
						? ((this.Mne = t.GetRoleId()),
							(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
								this.Mne,
							)),
							(this.PKo = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
								e.Name,
							)))
						: (this.IsValid = !1));
	}
	AddDamageValue(t) {
		this.AKo += t;
	}
	ToString() {
		return StringUtils_1.StringUtils.Format(
			",{0},{1},{2},{3},{4}",
			this.JB ? "怪物" : this.XHt ? "角色" : "出错？？",
			this.PKo,
			this.Mne.toString(),
			this.TargetId.toString(),
			this.AKo.toString(),
		);
	}
}
class DamageStatisticsData {
	constructor(t, e, i, r) {
		(this.RoleId = t),
			(this.RoleName = e),
			(this.DamageType = i),
			(this.IsHeal = r),
			(this.xKo = new Map());
	}
	AddDamageValue(t, e) {
		let i = this.xKo.get(t);
		if (!i) {
			if (!(i = new TargetDamageStatistics(t)).IsValid) return;
			this.xKo.set(t, i);
		}
		i.AddDamageValue(e);
	}
	GetTargetCount() {
		return this.xKo.size;
	}
	ToString() {
		var t = new StringBuilder_1.StringBuilder();
		for (const e of this.xKo.values()) t.Append(e.ToString());
		return StringUtils_1.StringUtils.Format(
			"{0},{1},{2},{3}{4}\n",
			this.RoleId.toString(),
			this.RoleName,
			this.IsHeal ? "治疗" : "伤害",
			this.DamageType,
			t.ToString(),
		);
	}
}
class CombatDataBase {
	constructor(t, e = 0) {
		(this.AttackerId = t), (this.TargetId = e), (this.String = "");
		e = (t = new Date()).getHours();
		var i = t.getMinutes();
		t = t.getSeconds();
		this.DateCreate = StringUtils_1.StringUtils.Format(
			"{0}-{1}-{2}",
			e < 10 ? "0" + e : e.toString(),
			i < 10 ? "0" + i : i.toString(),
			t < 10 ? "0" + t : t.toString(),
		);
	}
	ToString() {
		return (
			(this.String && 0 < this.String.length) ||
				(this.String = this.ParseToString()),
			this.String
		);
	}
	static GetEntityConfigName(t) {
		if ((t = EntitySystem_1.EntitySystem.Get(t))) {
			t = t.GetComponent(0);
			var e,
				i = t?.GetEntityType();
			if (i === Protocol_1.Aki.Protocol.wks.Proto_Player)
				return (
					(e = t.Valid ? t.GetRoleId() : 0),
					(e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))
						? ((e = e.GetRoleId()),
							(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
							ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name))
						: void 0
				);
			if (i === Protocol_1.Aki.Protocol.wks.Proto_Monster)
				return PublicUtil_1.PublicUtil.GetConfigTextByKey(
					t.GetBaseInfo()?.TidName ?? "",
				);
		}
	}
	static GetSkillConfigName(t, e) {
		if ((t = EntitySystem_1.EntitySystem.Get(t)))
			return t.GetComponent(33).GetSkillInfo(e).SkillName.toString();
	}
	static GetEntityConfigNameAndSkillName(t, e, i) {
		let r, a;
		if ((t = EntitySystem_1.EntitySystem.Get(t))) {
			var o = t.GetComponent(0),
				n = o?.GetEntityType();
			if (n === Protocol_1.Aki.Protocol.wks.Proto_Player) {
				var s = o.Valid ? o.GetRoleId() : 0;
				if (!(s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(s)))
					return [void 0, void 0];
				(s = s.GetRoleId()),
					(s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(s)),
					(r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(s.Name));
				let t = -1;
				if (
					(s = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
						s.SkillId,
					))
				)
					for (const i of s)
						if (i.DamageList.includes(e)) {
							(a = skillTypeToString[i.SkillType - 1]), (t = i.SkillType);
							break;
						}
				return (
					t < 0 &&
						5 === DamageById_1.configDamageById.GetConfig(e).Type &&
						(a = "幻象技能"),
					[r, a]
				);
			}
			if (n === Protocol_1.Aki.Protocol.wks.Proto_Monster)
				return (
					(r = PublicUtil_1.PublicUtil.GetConfigTextByKey(
						o.GetBaseInfo()?.TidName ?? "",
					)),
					(a = (s = t.GetComponent(33).GetSkillInfo(i)).SkillName.toString()),
					[r, a]
				);
		}
		return [void 0, void 0];
	}
}
class CombatDataDamage extends CombatDataBase {
	constructor(t, e, i, r, a = 0) {
		super(t, a),
			(this.DamageId = e),
			(this.DamageValue = i),
			(this.SkillId = r);
	}
	ParseToString() {
		var [t, e] = CombatDataBase.GetEntityConfigNameAndSkillName(
				this.AttackerId,
				this.DamageId,
				this.SkillId,
			),
			i = CombatDataBase.GetEntityConfigName(this.TargetId),
			r = 0;
		r = EntitySystem_1.EntitySystem.Get(this.TargetId)
			.GetComponent(156)
			.GetCurrentValue(Protocol_1.Aki.Protocol.Bks.Proto_Life);
		return StringUtils_1.StringUtils.Format(
			"<Date>[{0}]</><Atk>{1}</>施放了<Skill>{2}</>对<Victim>{3}</>造成<NumDmg>{4}</>点伤害<Change>{5}</>",
			this.DateCreate,
			t ?? "",
			e ?? "",
			i ?? "",
			this.DamageValue.toString(),
			r <= 0
				? "(死亡)"
				: StringUtils_1.StringUtils.Format(
						"({0}->{1})",
						(r + this.DamageValue).toString(),
						r.toString(),
					),
		);
	}
}
class CombatDataHeal extends CombatDataBase {
	constructor(t, e, i, r, a = 0) {
		super(t, a), (this.HealId = e), (this.HealValue = i), (this.SkillId = r);
	}
	ParseToString() {
		var [t, e] = CombatDataBase.GetEntityConfigNameAndSkillName(
				this.AttackerId,
				this.HealId,
				this.SkillId,
			),
			i = CombatDataBase.GetEntityConfigName(this.TargetId),
			r = 0,
			a =
				((r = (a = EntitySystem_1.EntitySystem.Get(this.TargetId).GetComponent(
					156,
				)).GetCurrentValue(Protocol_1.Aki.Protocol.Bks.Proto_Life)),
				a.GetCurrentValue(Protocol_1.Aki.Protocol.Bks.Tkn));
		return StringUtils_1.StringUtils.Format(
			"<Date>[{0}]</><Atk>{1}</>施放了<Skill>{2}</>使<Victim>{3}</>恢复<NumDmg>{4}</>点生命<Change>{5}</>",
			this.DateCreate,
			t ?? "",
			e ?? "",
			i ?? "",
			this.HealValue.toString(),
			r === a
				? "(满血)"
				: StringUtils_1.StringUtils.Format(
						"({0}->{1})",
						r.toString(),
						(r - this.HealValue).toString(),
					),
		);
	}
}
class CombatDataSkill extends CombatDataBase {
	constructor(t, e, i = 0) {
		super(t, i), (this.SkillId = e);
	}
	ParseToString() {
		var t = CombatDataBase.GetEntityConfigName(this.AttackerId),
			e = CombatDataBase.GetSkillConfigName(this.AttackerId, this.SkillId);
		return StringUtils_1.StringUtils.Format(
			"<Date>[{0}]</><Atk>{1}</>施放了技能<Skill>{2}</>。",
			this.DateCreate,
			t ?? "",
			e ?? "",
		);
	}
}
class CombatDataBuffAdded extends CombatDataBase {
	constructor(t, e, i = 0) {
		super(t, i), (this.BuffId = e);
	}
	ParseToString() {
		var t = CombatDataBase.GetEntityConfigName(this.AttackerId),
			e = CombatDataBase.GetEntityConfigName(this.TargetId);
		return StringUtils_1.StringUtils.Format(
			"<Date>{0}</><Victim>{1}</>获得了<Atk>{2}</>添加的Buff<NumDmg>{3}</>",
			this.DateCreate,
			e ?? "",
			t ?? "",
			this.BuffId.toString(),
		);
	}
}
class CombatDataBuffRemoved extends CombatDataBase {
	constructor(t, e, i = 0) {
		super(t, i), (this.BuffId = e);
	}
	ParseToString() {
		var t = CombatDataBase.GetEntityConfigName(this.TargetId);
		return StringUtils_1.StringUtils.Format(
			"<Date>{0}</><Victim>{1}</>失去了Buff<NumDmg>{2}</>",
			this.DateCreate,
			t ?? "",
			this.BuffId.toString(),
		);
	}
}
class CombatDataKilled extends CombatDataBase {
	ParseToString() {
		var t = CombatDataBase.GetEntityConfigName(this.AttackerId),
			e = CombatDataBase.GetEntityConfigName(this.TargetId);
		return StringUtils_1.StringUtils.Format(
			"<Date>{0}</><Atk>{1}</>消灭了<Victim>{2}</>!",
			this.DateCreate,
			t ?? "",
			e ?? "",
		);
	}
}
class CombatDataRevive extends CombatDataBase {
	ParseToString() {
		var t = CombatDataBase.GetEntityConfigName(this.AttackerId);
		return StringUtils_1.StringUtils.Format(
			"<Date>{0}</><Atk>{1}</>复活",
			this.DateCreate,
			t ?? "",
		);
	}
}
let CharacterStatisticsComponent =
	(CharacterStatisticsComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.skr = (t, e, i, r, a, o, n) => {
					switch (r.CalculateType) {
						case 1:
							this.akr && this.hkr(-i, t, e, o), this.lkr(-i, t, e, o, a);
							break;
						case 0:
							this.akr &&
								this._kr(
									i,
									r.Element,
									n,
									t,
									e,
									a.IsCritical,
									r.DamageTextType,
									a.IsImmune,
									r.Id,
									a.BulletId,
									a.BuffId,
								),
								this.ukr(
									i,
									r.Element,
									n,
									t,
									e,
									a.IsCritical,
									r.DamageTextType,
									a.IsImmune,
									r.Id,
									a.BulletId,
									a.BuffId,
									a.IsTargetKilled,
									a,
								);
					}
				}),
				(this.ckr = () => {
					this.mkr();
				}),
				(this.akr = !1),
				(this.dkr = new Map()),
				(this.Ckr = new Map()),
				(this.gkr = new Map()),
				(this.fkr = new Array()),
				(this.pkr = (t, e) => {
					CharacterStatisticsComponent_1.vkr &&
						this.Entity.GetComponent(0).IsRole() &&
						(this.Mkr(t), this.Skr(e));
				}),
				(this.Ekr = (t, e) => {
					var i;
					CharacterStatisticsComponent_1.vkr &&
						this.Entity.GetComponent(0).IsRole() &&
						(this.dkr.get(e) &&
							((i = this.Entity.GetComponent(0).GetRoleConfig()),
							Log_1.Log.CheckError()) &&
							Log_1.Log.Error(
								"Character",
								21,
								"记录技能开始使用时间时有技能未执行EndSkill",
								[
									"RoleName",
									ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name),
								],
								["SkillId", e],
							),
						this.dkr.set(e, Time_1.Time.NowSeconds));
				}),
				(this.ykr = (t, e) => {
					if (
						CharacterStatisticsComponent_1.vkr &&
						this.Entity.GetComponent(0).IsRole()
					) {
						let a = CharacterStatisticsComponent_1.Ikr.get(t);
						a ||
							((r = this.Entity.GetComponent(0).GetRoleConfig()),
							(i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
								r.Name,
							)),
							(a = new CharacterOperationRecord(i, t, r.Id)),
							CharacterStatisticsComponent_1.Ikr.set(t, a));
						var i = this.Entity.GetComponent(33).GetSkillInfo(e).SkillGenre;
						let o = a.SkillOperationMap.get(i);
						o ||
							((o = new SkillOperationRecord(
								CharacterStatisticsComponent_1.Tkr[i],
							)),
							a.SkillOperationMap.set(i, o));
						var r = this.dkr.get(e);
						void 0 === r
							? Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Test",
									21,
									"计算出现异常 EndSkill",
									["Name", a.Name],
									["Id", a.EntityId],
									["Map", this.dkr],
								)
							: ((t = Time_1.Time.NowSeconds - r), o.AddOptCountAndTime(t)),
							this.dkr.set(e, void 0);
					}
				}),
				(this.Pji = (t, e) => {
					if (CharacterStatisticsComponent_1.vkr)
						if (e) this.Ckr.set(t, Time_1.Time.NowSeconds);
						else {
							e = this.Ckr.get(t);
							var i = Time_1.Time.NowSeconds - e,
								r = this.Entity.Id;
							let s = CharacterStatisticsComponent_1.Ikr.get(r);
							var a = this.Entity.GetComponent(0);
							s ||
								((o = a.GetEntityType()) ===
								Protocol_1.Aki.Protocol.wks.Proto_Monster
									? ((n = PublicUtil_1.PublicUtil.GetConfigTextByKey(
											a.GetBaseInfo()?.TidName ?? "",
										)),
										(s = new CharacterOperationRecord(n, r, a.GetPbDataId())))
									: o === Protocol_1.Aki.Protocol.wks.Proto_Player &&
										((n = a.GetRoleConfig()),
										(o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
											n.Name,
										)),
										(s = new CharacterOperationRecord(o, r, n.Id))),
								CharacterStatisticsComponent_1.Ikr.set(r, s));
							let g = s.TagOperationMap.get(t);
							var o = a.GetEntityType(),
								n = CharacterStatisticsComponent_1.StageInfo(o);
							g ||
								((g = new SkillOperationRecord(n.get(t))),
								s.TagOperationMap.set(t, g)),
								Number.isNaN(i)
									? Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Test",
											21,
											"计算出现异常 OnTagChanged",
											["Id", this.Entity.Id],
											["beginTime", e],
											["Map", this.Ckr],
											["TagId", t],
										)
									: g.AddOptCountAndTime(i);
						}
				}),
				(this.Lkr = (t, e) => {
					CharacterStatisticsComponent_1.Dkr &&
						((e = new CombatDataSkill(this.Entity.Id, e)).ToString(),
						CharacterStatisticsComponent_1.Rkr.push(e),
						CharacterStatisticsComponent_1.Akr(e)) &&
						CharacterStatisticsComponent_1.Ukr.push(e);
				});
		}
		OnInit(t) {
			return (
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharBeDamage,
					this.skr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharUseSkill,
					this.Lkr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRevive,
					this.ckr,
				),
				!0
			);
		}
		OnStart() {
			return this.Pkr(), !0;
		}
		OnActivate() {
			CharacterStatisticsComponent_1.OpenOperationRecord &&
				(this.akr = CharacterStatisticsComponent_1.IsInRecordArea(this.Entity)),
				this.xkr();
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharBeDamage,
					this.skr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharUseSkill,
					this.Lkr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnRevive,
					this.ckr,
				),
				CharacterStatisticsComponent_1.vkr && this.wkr(),
				!0
			);
		}
		OnBuffAdded(t) {
			this.Bkr(t);
		}
		OnBuffRemoved(t) {
			this.bkr(t);
		}
		GetStatisticsEnable() {
			return this.akr;
		}
		static SetStatisticsEnable(t) {
			if (t) {
				var e;
				for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
					CharacterStatisticsComponent_1.IsInRecordArea(t.Entity) &&
						(e = t.Entity.GetComponent(24))?.Valid &&
						((e.akr = !0), this.qkr.push(t.Id));
			} else {
				for (const t of this.qkr) {
					var i = EntitySystem_1.EntitySystem.Get(t);
					i?.Valid && (i.GetComponent(24).akr = !1);
				}
				this.qkr.length = 0;
			}
		}
		static CleanupRecordData() {
			this.Gkr.clear(), this.Nkr.clear(), this.Okr.clear(), this.kkr.clear();
		}
		hkr(t, e, i, r) {
			var a = r.Damage;
			r = r.DamageData.Id;
			CharacterStatisticsComponent_1.ProcessRecordBySkillType(a, e, i, r, !0),
				CharacterStatisticsComponent_1.Fkr(a, e, i, r, !0);
		}
		_kr(t, e, i, r, a, o, n, s, g, h, l) {
			CharacterStatisticsComponent_1.ProcessRecordBySkillType(
				t,
				r,
				a,
				g,
				!1,
				h,
				l,
			),
				CharacterStatisticsComponent_1.Fkr(t, r, a, g, !1);
		}
		static ProcessRecordBySkillType(t, e, i, r, a, o, n) {
			if (
				(e = e.GetComponent(0)).GetEntityType() ===
				Protocol_1.Aki.Protocol.wks.Proto_Player
			) {
				e = e.Valid ? e.GetRoleId() : 0;
				if ((s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))) {
					var s = s.GetRoleId(),
						g = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(s),
						h = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(g.Name);
					let e = 0;
					if (
						(g = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
							g.SkillId,
						))
					)
						for (const t of g)
							if (t.DamageList.includes(r)) {
								e = t.SkillType;
								break;
							}
					let l = (g = a
						? CharacterStatisticsComponent_1.kkr
						: CharacterStatisticsComponent_1.Okr).get(s);
					if ((l || ((l = new Map()), g.set(s, l)), 0 < e)) {
						let o = l.get(e);
						o ||
							((o = new DamageStatisticsData(
								s,
								h,
								(g = skillTypeToString[e - 1]),
								a,
							)),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Test",
									21,
									"伤害记录-技能",
									["伤害ID", r],
									["类型", g],
								),
							l.set(e, o)),
							o.AddDamageValue(i.Id, t),
							o.GetTargetCount() > this.Vkr && (this.Vkr = o.GetTargetCount());
					} else if (5 !== DamageById_1.configDamageById.GetConfig(r).Type)
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Test",
								21,
								"结算ID不在幻象表中",
								["结算ID", r],
								["子弹ID", o],
								["buffID", n],
							);
					else {
						let e = l.get(6);
						e ||
							((e = new DamageStatisticsData(s, h, skillTypeToString[6], a)),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Test",
									21,
									"伤害记录-技能",
									["伤害ID", r],
									["类型", "声骸技能"],
								),
							l.set(6, e)),
							e.AddDamageValue(i.Id, t),
							e.GetTargetCount() > this.Vkr && (this.Vkr = e.GetTargetCount());
					}
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Test", 21, "获取不到roleData", ["roleId", e]);
			}
		}
		static Fkr(t, e, i, r, a) {
			if (((e = e.GetComponent(0)), e?.IsRole())) {
				var o = DamageById_1.configDamageById.GetConfig(r);
				if (o) {
					e = e.Valid ? e.GetRoleId() : 0;
					if ((n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))) {
						var n = n.GetRoleId(),
							s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n),
							g =
								((s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
									s.Name,
								)),
								a ? this.Nkr : this.Gkr);
						let e = g.get(n),
							r = (e || ((e = new Map()), g.set(n, e)), e.get(o.Type));
						r ||
							((r = new DamageStatisticsData(
								n,
								s,
								attackTypeToString[o.Type],
								a,
							)),
							e.set(o.Type, r)),
							r.AddDamageValue(i.Id, t),
							this.Hkr < r.GetTargetCount() && (this.Hkr = r.GetTargetCount());
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Test", 21, "获取不到roleData", ["roleId", e]);
				} else
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Test", 21, "伤害表中找不到id", ["伤害Id", r]);
			}
		}
		static ExportStatisticsBySkillType() {
			var t = new StringBuilder_1.StringBuilder();
			t.Append("角色Id,名称,治疗/伤害,技能");
			for (let i = 0; i < this.Vkr; i++) {
				var e = (i + 1).toString();
				t.Append(StringUtils_1.StringUtils.Format(this.jkr, e, e, e, e, e));
			}
			t.Append("\n");
			var i = this.Okr;
			if (0 < i?.size)
				for (var [, r] of i) for (var [, a] of r) t.Append(a.ToString());
			if (0 < (i = this.kkr)?.size)
				for (var [, o] of i) for (var [, n] of o) t.Append(n.ToString());
			return t.ToString();
		}
		static ExportStatisticsByAttackType() {
			var t = new StringBuilder_1.StringBuilder();
			t.Append("角色Id,名称,治疗/伤害,伤害类型");
			for (let i = 0; i < this.Hkr; i++) {
				var e = (i + 1).toString();
				t.Append(StringUtils_1.StringUtils.Format(this.jkr, e, e, e, e, e));
			}
			t.Append("\n");
			var i = this.Gkr;
			if (0 < i?.size)
				for (var [, r] of i) for (var [, a] of r) t.Append(a.ToString());
			if (0 < (i = this.Nkr)?.size)
				for (var [, o] of i) for (var [, n] of o) t.Append(n.ToString());
			return t.ToString();
		}
		static get OpenOperationRecord() {
			return this.vkr;
		}
		xkr() {
			var t;
			CharacterStatisticsComponent_1.vkr &&
				((t = this.Entity),
				CharacterStatisticsComponent_1.Ikr.has(t.Id) ||
					(CharacterStatisticsComponent_1.IsInRecordArea(t) && this.Wkr()));
		}
		Wkr() {
			if (
				(this.dkr.clear(),
				this.gkr.clear(),
				this.Ckr.clear(),
				this.Entity.GetComponent(0).IsRole())
			) {
				CharacterStatisticsComponent_1.Kkr.push(this.Entity.Id),
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.CharUseSkill,
						this.Ekr,
					),
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSkillEnd,
						this.ykr,
					),
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
						this.pkr,
					);
				var t,
					e = this.Entity.GetComponent(158),
					i =
						(e?.Valid && ((e = e.MoveState), this.Skr(e)),
						this.Entity.CheckGetComponent(185));
				for ([t] of (i?.Valid &&
					this.fkr.push(i.ListenForTagAddOrRemove(-2044964178, this.Pji)),
				CharacterStatisticsComponent_1.Qkr))
					i.HasTag(t) && this.Ckr.set(t, Time_1.Time.NowSeconds);
			} else {
				var r = this.Entity.CheckGetComponent(185);
				if (r?.Valid)
					for (var [a] of (CharacterStatisticsComponent_1.Kkr.push(
						this.Entity.Id,
					),
					this.fkr.push(r.ListenForTagAddOrRemove(-1112841587, this.Pji)),
					this.fkr.push(r.ListenForTagAddOrRemove(-1109506297, this.Pji)),
					this.fkr.push(r.ListenForTagAddOrRemove(-1838149281, this.Pji)),
					this.fkr.push(r.ListenForTagAddOrRemove(1922078392, this.Pji)),
					CharacterStatisticsComponent_1.Xkr))
						r.HasTag(a) && this.Ckr.set(a, Time_1.Time.NowSeconds);
			}
		}
		wkr() {
			this.Entity.GetComponent(0)?.IsRole() &&
				(EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharUseSkill,
					this.Ekr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSkillEnd,
					this.ykr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.pkr,
				));
			for (const t of this.fkr) t.EndTask();
			this.fkr.length = 0;
		}
		Skr(t) {
			var e;
			CharacterStatisticsComponent_1.$kr.has(t) &&
				(this.gkr.get(t) &&
					((e = this.Entity.GetComponent(0).GetRoleConfig()),
					Log_1.Log.CheckError()) &&
					Log_1.Log.Error(
						"Character",
						21,
						"记录移动开始时间时有未执行OnMoveStateEnd",
						[
							"RoleName",
							ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name),
						],
						["State", t],
					),
				this.gkr.set(t, Time_1.Time.NowSeconds));
		}
		Mkr(t) {
			if (CharacterStatisticsComponent_1.$kr.has(t)) {
				var e = this.Entity.Id;
				let a = CharacterStatisticsComponent_1.Ikr.get(e),
					o =
						(a ||
							((i = this.Entity.GetComponent(0).GetRoleConfig()),
							(r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
								i.Name,
							)),
							(a = new CharacterOperationRecord(r, e, i.Id)),
							CharacterStatisticsComponent_1.Ikr.set(e, a)),
						a.MoveOperationMap.get(t));
				o ||
					((o = new SkillOperationRecord(
						CharacterStatisticsComponent_1.$kr.get(t),
					)),
					a.MoveOperationMap.set(t, o));
				var i,
					r = this.gkr.get(t);
				void 0 === r
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Test",
							21,
							"计算出现异常 OnMoveStateEnd",
							["Name", a.Name],
							["Id", a.EntityId],
							["Map", this.gkr],
						)
					: ((i = Time_1.Time.NowSeconds - r), o.AddOptCountAndTime(i)),
					this.gkr.set(t, void 0);
			}
		}
		static StageInfo(t) {
			return t === Protocol_1.Aki.Protocol.wks.Proto_Monster
				? CharacterStatisticsComponent_1.Xkr
				: t === Protocol_1.Aki.Protocol.wks.Proto_Player
					? CharacterStatisticsComponent_1.Qkr
					: void 0;
		}
		Pkr() {
			if (CharacterStatisticsComponent_1.vkr) {
				var t = this.Entity.GetComponent(185);
				if (t) {
					var e,
						i = this.Entity.GetComponent(0).GetEntityType();
					for ([e] of CharacterStatisticsComponent_1.StageInfo(i))
						t.HasTag(e) &&
							(this.Pji(e, !0), Log_1.Log.CheckDebug()) &&
							Log_1.Log.Debug(
								"Test",
								21,
								"InitStageBeginTime",
								["Id", this.Entity.Id],
								["TagId", e],
							);
				}
			}
		}
		static OperationRecord(t) {
			if ((this.vkr = t))
				for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
					var e = t.Entity.GetComponent(24);
					e &&
						t.Entity.GetComponent(17)?.Valid &&
						this.IsInRecordArea(t.Entity) &&
						((e.akr = !0), e.Wkr());
				}
			else {
				for (const t of this.Kkr) {
					var i = EntitySystem_1.EntitySystem.Get(t);
					i?.Valid && (i = i.GetComponent(24)) && ((i.akr = !1), i.wkr());
				}
				this.Kkr.length = 0;
			}
		}
		static IsInRecordArea(t) {
			if (t?.Valid) {
				var e = t.GetComponent(0);
				if (e.IsRole()) return !0;
				if (e.IsMonster()) {
					if (!(e = t.GetComponent(1))) return !1;
					if (
						Vector_1.Vector.DistSquaredXY(
							e.ActorLocationProxy,
							ModelManager_1.ModelManager.CameraModel.CameraLocation,
						) < CharacterStatisticsComponent_1.HalfLengthRecordSquared
					)
						return !0;
				}
			}
			return !1;
		}
		static ExportRecord() {
			if (0 !== this.Ikr.size) {
				this.vkr && this.OperationRecord(!1);
				var t,
					e = new StringBuilder_1.StringBuilder();
				for ([, t] of (e.Append(this.Ykr), this.Ikr)) e.Append(t.ToString());
				return e.ToString();
			}
		}
		static OperationRecordCount() {
			let t = 0;
			for (var [, e] of this.Ikr)
				t =
					(t = (t += e.SkillOperationMap.size) + e.MoveOperationMap.size) +
					e.TagOperationMap.size;
			return t;
		}
		static CleanupOperationRecord() {
			this.Ikr.clear();
		}
		static SetCombatStarted(t, e, i, r) {
			(this.Dkr = t) &&
				(this.SetTypeOpen(e),
				this.SetCurrentAttacker(i),
				this.SetCurrentTarget(r));
		}
		static GetAttackerCombatEntities() {
			this.Jkr.length = 0;
			var t = UE.NewArray(UE.BuiltinString),
				e =
					(t.Add("无"),
					this.Jkr.push(0),
					ModelManager_1.ModelManager.CreatureModel.GetAllEntities());
			for (const r of e) {
				var i = this.GetEntityName(r);
				i && (t.Add(i), this.Jkr.push(r.Id));
			}
			return t;
		}
		static GetTargetCombatEntities() {
			this.zkr.length = 0;
			var t = UE.NewArray(UE.BuiltinString),
				e =
					(t.Add("无"),
					this.zkr.push(0),
					ModelManager_1.ModelManager.CreatureModel.GetAllEntities());
			for (const r of e) {
				var i = this.GetEntityName(r);
				i && (t.Add(i), this.zkr.push(r.Id));
			}
			return t;
		}
		static GetEntityName(t) {
			var e, i;
			if (t)
				return (e = (t = t.Entity.GetComponent(0))?.GetEntityType()) ===
					Protocol_1.Aki.Protocol.wks.Proto_Player
					? ((i = t.Valid ? t.GetRoleId() : 0),
						(i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i))
							? ((i = i.GetRoleId()),
								(i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)),
								ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name))
							: void 0)
					: e === Protocol_1.Aki.Protocol.wks.Proto_Monster
						? PublicUtil_1.PublicUtil.GetConfigTextByKey(
								t.GetBaseInfo()?.TidName ?? "",
							)
						: void 0;
		}
		static SetTypeOpen(t) {
			if (!this.Zkr) {
				var e = t.length;
				if (this.e2r.size !== e) this.Zkr = !0;
				else
					for (let r = 0; r < e; r++) {
						var i = t[r];
						if (!this.e2r.get(i)) {
							this.Zkr = !0;
							break;
						}
					}
			}
			this.e2r.clear();
			for (let e = 0, i = t.length; e < i; e++) {
				var r = t[e];
				this.e2r.set(r, !0);
			}
		}
		static SetCurrentAttacker(t) {
			(t = this.Jkr[t]), this.t2r !== t && (this.Zkr = !0), (this.t2r = t);
		}
		static SetCurrentTarget(t) {
			(t = this.zkr[t]), this.i2r !== t && (this.Zkr = !0), (this.i2r = t);
		}
		static get ItemReset() {
			return this.Zkr;
		}
		static OnItemsResetFinished() {
			(this.Zkr = !1), (this.Ukr.length = 0);
			for (const t of this.Rkr) this.Akr(t) && this.Ukr.push(t);
		}
		static GetSubItemsListView(t, e) {
			var i = UE.NewArray(UE.BuiltinString);
			for (let r = 0; r < e; r++) i.Add(this.Ukr[t + r].ToString());
			return i;
		}
		static GetItemListViewCount() {
			return this.Ukr.length;
		}
		lkr(t, e, i, r, a) {
			var o;
			CharacterStatisticsComponent_1.Dkr &&
				((o = r.Damage),
				(r = r.DamageData.Id),
				(e = new CombatDataHeal(e.Id, r, o, a.SkillId, i.Id)).ToString(),
				CharacterStatisticsComponent_1.Rkr.push(e),
				CharacterStatisticsComponent_1.Akr(e)) &&
				CharacterStatisticsComponent_1.Ukr.push(e);
		}
		ukr(t, e, i, r, a, o, n, s, g, h, l, C, c) {
			CharacterStatisticsComponent_1.Dkr &&
				((g = new CombatDataDamage(r.Id, g, t, c.SkillId, a.Id)).ToString(),
				CharacterStatisticsComponent_1.Rkr.push(g),
				CharacterStatisticsComponent_1.Akr(g) &&
					CharacterStatisticsComponent_1.Ukr.push(g),
				C) &&
				((t = new CombatDataKilled(r.Id, a.Id)).ToString(),
				CharacterStatisticsComponent_1.Rkr.push(t),
				CharacterStatisticsComponent_1.Akr(t)) &&
				CharacterStatisticsComponent_1.Ukr.push(t);
		}
		Bkr(t) {
			var e;
			!CharacterStatisticsComponent_1.Dkr ||
				!(e = t.Config.Id) ||
				e <= 0 ||
				((e = new CombatDataBuffAdded(
					t.GetInstigator().Id,
					e,
					t.GetOwner().Id,
				)).ToString(),
				CharacterStatisticsComponent_1.Rkr.push(e),
				CharacterStatisticsComponent_1.Akr(e) &&
					CharacterStatisticsComponent_1.Ukr.push(e));
		}
		bkr(t) {
			var e;
			!CharacterStatisticsComponent_1.Dkr ||
				!(e = t.Config.Id) ||
				e <= 0 ||
				((e = new CombatDataBuffRemoved(
					t.GetInstigator().Id,
					e,
					t.GetOwner().Id,
				)).ToString(),
				CharacterStatisticsComponent_1.Rkr.push(e),
				CharacterStatisticsComponent_1.Akr(e) &&
					CharacterStatisticsComponent_1.Ukr.push(e));
		}
		mkr() {
			var t;
			CharacterStatisticsComponent_1.Dkr &&
				((t = new CombatDataRevive(this.Entity.Id)).ToString(),
				CharacterStatisticsComponent_1.Rkr.push(t),
				CharacterStatisticsComponent_1.Akr(t)) &&
				CharacterStatisticsComponent_1.Ukr.push(t);
		}
		static Akr(t) {
			return !(
				(0 < this.t2r && this.t2r !== t.AttackerId) ||
				(0 < this.i2r && this.i2r !== t.TargetId) ||
				(!this.e2r.get(0) && t instanceof CombatDataDamage) ||
				(!this.e2r.get(1) && t instanceof CombatDataHeal) ||
				(!this.e2r.get(2) && t instanceof CombatDataSkill) ||
				(!this.e2r.get(3) &&
					(t instanceof CombatDataBuffRemoved ||
						t instanceof CombatDataBuffAdded)) ||
				(!this.e2r.get(4) && t instanceof CombatDataKilled) ||
				(!this.e2r.get(5) && t instanceof CombatDataRevive)
			);
		}
	});
(CharacterStatisticsComponent.qkr = new Array()),
	(CharacterStatisticsComponent.Okr = new Map()),
	(CharacterStatisticsComponent.Gkr = new Map()),
	(CharacterStatisticsComponent.kkr = new Map()),
	(CharacterStatisticsComponent.Nkr = new Map()),
	(CharacterStatisticsComponent.jkr =
		",目标{0}类型,目标{1}名称,目标{2}配置ID,目标{3}单位Id,目标{4}伤害"),
	(CharacterStatisticsComponent.Vkr = 0),
	(CharacterStatisticsComponent.Hkr = 0),
	(CharacterStatisticsComponent.HalfLengthRecordSquared = 25e6),
	(CharacterStatisticsComponent.Ikr = new Map()),
	(CharacterStatisticsComponent.vkr = !1),
	(CharacterStatisticsComponent.$kr = new Map([
		[CharacterUnifiedStateTypes_1.ECharMoveState.Walk, "走"],
		[CharacterUnifiedStateTypes_1.ECharMoveState.Run, "跑"],
		[CharacterUnifiedStateTypes_1.ECharMoveState.Sprint, "冲刺"],
		[CharacterUnifiedStateTypes_1.ECharMoveState.Dodge, "闪避"],
	])),
	(CharacterStatisticsComponent.Tkr = [
		"普攻0",
		"蓄力1",
		"E技能2",
		"大招3",
		"QTE4",
		"极限闪避反击5",
		"地面闪避6",
		"极限闪避7",
		"被动技能8",
		"战斗幻象技9",
		"探索幻象技10",
		"空中闪避11",
		"无类别",
	]),
	(CharacterStatisticsComponent.Xkr = new Map([
		[-1109506297, "正常时间"],
		[-1838149281, "狂暴时间"],
		[1922078392, "瘫痪时间"],
		[-1112841587, "脆弱时间"],
	])),
	(CharacterStatisticsComponent.Qkr = new Map([[-2044964178, "受击硬直"]])),
	(CharacterStatisticsComponent.Kkr = new Array()),
	(CharacterStatisticsComponent.Ykr =
		"角色ID,角色名称,配置ID,技能/阶段,时间,次数\n"),
	(CharacterStatisticsComponent.Dkr = !1),
	(CharacterStatisticsComponent.e2r = new Map()),
	(CharacterStatisticsComponent.Jkr = new Array()),
	(CharacterStatisticsComponent.zkr = new Array()),
	(CharacterStatisticsComponent.t2r = 0),
	(CharacterStatisticsComponent.i2r = 0),
	(CharacterStatisticsComponent.Zkr = !1),
	(CharacterStatisticsComponent.Ukr = new Array()),
	(CharacterStatisticsComponent.Rkr = new Array()),
	(CharacterStatisticsComponent = CharacterStatisticsComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(24)],
			CharacterStatisticsComponent,
		)),
	(exports.CharacterStatisticsComponent = CharacterStatisticsComponent);
const SKILL_RECORD_FMT = "{0},{1},{2}";
class SkillOperationRecord {
	constructor(t) {
		(this.he = t), (this.oUe = 0), (this.JQt = 0);
	}
	AddOptCountAndTime(t, e = 1) {
		(this.oUe += t), (this.JQt += e);
	}
	ToString() {
		return StringUtils_1.StringUtils.Format(
			"{0},{1},{2}",
			this.he,
			this.oUe.toString(),
			this.JQt.toString(),
		);
	}
}
const CHARACTER_RECORD_FMT = "{0},{1},{2},{3}\n";
class CharacterOperationRecord {
	constructor(t, e, i) {
		(this.Name = t),
			(this.EntityId = e),
			(this.wKo = i),
			(this.SkillOperationMap = new Map()),
			(this.MoveOperationMap = new Map()),
			(this.TagOperationMap = new Map());
	}
	ToString() {
		var t,
			e,
			i,
			r = new StringBuilder_1.StringBuilder();
		for ([, t] of this.SkillOperationMap) {
			var a = StringUtils_1.StringUtils.Format(
				"{0},{1},{2},{3}\n",
				this.EntityId.toString(),
				this.Name,
				this.wKo.toString(),
				t.ToString(),
			);
			r.Append(a);
		}
		for ([, e] of this.MoveOperationMap) {
			var o = StringUtils_1.StringUtils.Format(
				"{0},{1},{2},{3}\n",
				this.EntityId.toString(),
				this.Name,
				this.wKo.toString(),
				e.ToString(),
			);
			r.Append(o);
		}
		for ([, i] of this.TagOperationMap) {
			var n = StringUtils_1.StringUtils.Format(
				"{0},{1},{2},{3}\n",
				this.EntityId.toString(),
				this.Name,
				this.wKo.toString(),
				i.ToString(),
			);
			r.Append(n);
		}
		return r.ToString();
	}
}

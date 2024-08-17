"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, i, o) {
		var r,
			l = arguments.length,
			n =
				l < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, i))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(t, e, i, o);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(r = t[s]) && (n = (l < 3 ? r(n) : 3 < l ? r(e, i, n) : r(e, i)) || n);
		return 3 < l && n && Object.defineProperty(e, i, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterSkillCdComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	ModManager_1 = require("../../../../../Manager/ModManager"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
let CharacterSkillCdComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.eZr = void 0),
			(this.Mzo = void 0),
			(this.tZr = void 0),
			(this.iZr = void 0),
			(this.oZr = void 0),
			(this.FBn = void 0),
			(this.Izo = void 0);
	}
	OnInit() {
		return (
			(this.eZr = this.Entity.CheckGetComponent(156)),
			(this.Mzo =
				ModelManager_1.ModelManager.SkillCdModel.GetCurWorldSkillCdData()),
			(this.tZr =
				ModelManager_1.ModelManager.SkillCdModel.GetCurWorldPassiveSkillCdData()),
			(this.iZr = new Map()),
			(this.oZr = new Map()),
			(this.FBn = new Map()),
			(this.Izo = this.Mzo.InitMultiSkill(this.Entity.Id)),
			this.Izo.Init(this.Entity.Id),
			!0
		);
	}
	OnStart() {
		if (GlobalData_1.GlobalData.IsPlayInEditor)
			for (const t of this.iZr.values()) t.CheckConfigValid();
		return !0;
	}
	OnEnd() {
		return (
			this.Mzo && (this.Mzo.RemoveEntity(this.Entity), (this.Mzo = void 0)),
			this.tZr && (this.tZr.RemoveEntity(this.Entity), (this.tZr = void 0)),
			!0
		);
	}
	GetMultiSkillInfo(t) {
		return this.Izo.GetMultiSkillInfo(t);
	}
	GetNextMultiSkillId(t) {
		if (GlobalData_1.GlobalData.IsPlayInEditor)
			for (var [e, i] of this.FBn)
				if (e === t) {
					this.IsMultiSkill(i) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Battle",
								18,
								"获取多段技能下一段技能Id时，传入的技能Id不是多段技能",
								["skillId", t],
							));
					break;
				}
		return this.Izo.GetNextMultiSkillId(t);
	}
	IsMultiSkill(t) {
		return this.Izo.IsMultiSkill(t);
	}
	CanStartMultiSkill(t) {
		return this.Izo.CanStartMultiSkill(t);
	}
	StartMultiSkill(t, e = !0) {
		return this.Izo.StartMultiSkill(t, e);
	}
	ResetMultiSkills(t) {
		this.Izo.ResetMultiSkills(t);
	}
	ResetAllMultiSkillOnChangeRole() {
		this.Izo.ResetOnChangeRole();
	}
	InitSkillCd(t) {
		var e,
			i = t.SkillId,
			o = this.iZr.get(i);
		return (
			o ||
			(1 < (e = t.SkillInfo.CooldownConfig).SectionCount - e.SectionRemaining
				? void 0
				: ((o = this.Mzo.InitSkillCd(this.Entity, t.SkillId, t.SkillInfo)),
					this.iZr.set(i, o),
					this.FBn.set(i, t.SkillInfo),
					o))
		);
	}
	InitSkillCdBySkillInfo(t, e) {
		var i = this.iZr.get(t);
		if (i)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 18, "技能重复初始化", ["skillId", t]),
				i
			);
		try {
			var o = e.CooldownConfig;
			return 1 < o.SectionCount - o.SectionRemaining
				? void 0
				: ((i = this.Mzo.InitSkillCd(this.Entity, t, e)),
					this.iZr.set(t, i),
					this.FBn.set(t, e),
					i);
		} catch (i) {
			i instanceof Error
				? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
						"Skill",
						this.Entity,
						"初始化技能CD异常",
						i,
						["skillId", t],
						["skillId", e?.SkillName],
						["error", i.message],
					)
				: CombatDebugController_1.CombatDebugController.CombatError(
						"Skill",
						this.Entity,
						"初始化技能CD异常",
						["skillId", t],
						["skillId", e?.SkillName],
						["error", i],
					);
		}
	}
	GetGroupSkillCdInfo(t) {
		return this.iZr.get(t);
	}
	IsSkillInCd(t, e = !0) {
		return !!(t = this.iZr.get(t)) && (e ? !t.HasRemainingCount() : t.IsInCd());
	}
	ModifyCdInfo(t, e) {
		var i;
		return this.iZr
			? !!(i = this.iZr.get(t)) && ((i.SkillCdInfoMap.get(t).SkillCd = e), !0)
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Battle",
						18,
						"角色技能组件还没有初始化，不允许修改技能CD",
					),
				!1);
	}
	ModifyCdTime(t, e, i) {
		var o;
		if (t && 0 !== t.length)
			if (1 === t.length)
				(o = this.iZr.get(Number(t[0]))) && o.ModifyRemainingCd(e, i);
			else {
				var r = new Set();
				for (const e of t) {
					var l = this.iZr.get(Number(e));
					l && r.add(l);
				}
				for (const t of r) t.ModifyRemainingCd(e, i);
			}
	}
	ModifyCdTimeBySkillGenres(t, e, i) {
		var o = new Array();
		for (const e of t) o.push(Number(e));
		var r,
			l,
			n,
			s = new Set();
		for ([r, l] of this.FBn)
			o.includes(l.SkillGenre) && (n = this.iZr.get(r)) && s.add(n);
		for (const t of s) t.ModifyRemainingCd(e, i);
	}
	StartCd(t, e = -1) {
		var i = this.iZr.get(t);
		return (
			ModManager_1.ModManager.Settings.NoCD && (e = -t),
			!!i && (i.StartCd(t, this.eZr, e), !0)
		);
	}
	SetLimitCount(t, e) {
		var i = this.iZr.get(t);
		return i
			? (i.SetLimitCount(999), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						18,
						"SetLimitCount 不存在该技能:",
						["EntityId", this.Entity.Id],
						["limitCount", e],
						["skillID", t],
					),
				!1);
	}
	ResetCdDelayTime(t) {
		var e = this.iZr.get(t);
		return e
			? (e.ResetDelayCd() &&
					(((e = Protocol_1.Aki.Protocol.BNn.create()).vkn = t),
					CombatMessage_1.CombatNet.Call(11892, this.Entity, e, () => {}),
					this.Izo?.ResetMultiSkills(t, !0)),
				!0)
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Battle",
						18,
						"修改CD不生效，该技能不记录CD",
						["EntityId", this.Entity.Id],
						["skillID", t],
					),
				!1);
	}
	InitPassiveSkill(t) {
		var e = t.Id,
			i = this.oZr.get(e);
		return (
			i ||
				((i = this.tZr.InitPassiveSkillCd(this.Entity, t)), this.oZr.set(e, i)),
			i
		);
	}
	IsPassiveSkillInCd(t) {
		return !!(t = this.oZr.get(t)) && t.IsInCd();
	}
	StartPassiveCd(t, e = -1) {
		var i = this.oZr.get(t);
		return (
			1302101064n != i.SkillId &&
				ModManager_1.ModManager.Settings.NoCD &&
				(e = -i.CurMaxCd),
			!!i && (i.StartCd(t, e), !0)
		);
	}
	GetPassiveSkillCdInfo(t) {
		return this.oZr.get(t);
	}
};
(CharacterSkillCdComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(186)],
	CharacterSkillCdComponent,
)),
	(exports.CharacterSkillCdComponent = CharacterSkillCdComponent);

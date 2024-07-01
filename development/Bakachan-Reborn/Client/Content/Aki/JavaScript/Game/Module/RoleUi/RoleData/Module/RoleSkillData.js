"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillData = exports.ERoleSkillReferenceType = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ConfigCommon_1 = require("../../../../../Core/Config/ConfigCommon"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterAbilityComponent_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAbilityComponent"),
	RoleModuleDataBase_1 = require("./RoleModuleDataBase");
var ERoleSkillReferenceType;
!(function (e) {
	(e[(e.SkillInfo = 0)] = "SkillInfo"),
		(e[(e.Buff = 1)] = "Buff"),
		(e[(e.Damage = 2)] = "Damage");
})(
	(ERoleSkillReferenceType =
		exports.ERoleSkillReferenceType || (exports.ERoleSkillReferenceType = {})),
);
class RoleSkillData extends RoleModuleDataBase_1.RoleModuleDataBase {
	constructor() {
		super(...arguments),
			(this.RoleSkillMap = new Map()),
			(this.RoleSkillReferenceMap = new Map()),
			(this.SkillNodeState = []),
			(this.i1o = new Map()),
			(this.o1o = []);
	}
	GetSkillNodeLevel(e) {
		let l = 0;
		var i = e.NodeType;
		return (
			2 === i || 1 === i
				? ((i = e.SkillId), (l = this.GetSkillLevel(i)))
				: this.IsSkillTreeNodeActive(e.Id) && (l = 1),
			l
		);
	}
	GetSkillLevel(e) {
		return this.RoleSkillMap.get(e) ?? 0;
	}
	SetSkillLevel(e, l) {
		this.RoleSkillMap.set(e, l);
	}
	GetAllSkillLevel() {
		return Array.from(this.RoleSkillMap.values());
	}
	GetSkillList() {
		var e;
		return 0 < this.o1o.length
			? this.o1o
			: ((e = this.GetRoleConfig().SkillId),
				(e = ConfigCommon_1.ConfigCommon.ToList(
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(e),
				)).sort((e, l) => e.SortIndex - l.SortIndex),
				this.r1o(e),
				e);
	}
	r1o(e) {
		var l = e.length;
		for (let o = 0; o < l; o++) {
			var i = e[o];
			this.o1o.push(i), this.i1o.set(i.Id, i);
		}
	}
	GetSkillConfigFromCache(e) {
		return 0 === this.i1o.size && this.GetSkillList(), this.i1o.get(e);
	}
	IsHasSkill(e) {
		return this.RoleSkillMap.has(e);
	}
	GetReferenceList(e, l) {
		var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e);
		switch (l) {
			case ERoleSkillReferenceType.SkillInfo:
				return i.SkillInfoList;
			case ERoleSkillReferenceType.Buff:
				return i.BuffList;
			case ERoleSkillReferenceType.Damage:
				return i.DamageList;
			default:
				return [];
		}
	}
	GetDefaultSkillLevel(e) {
		switch (e) {
			case ERoleSkillReferenceType.SkillInfo:
				return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL;
			case ERoleSkillReferenceType.Buff:
			case ERoleSkillReferenceType.Damage:
			default:
				return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
		}
	}
	SetSkillReferenceMapBySkillId(e) {
		for (const i in ERoleSkillReferenceType)
			if (!isNaN(Number(i))) {
				let o = this.RoleSkillReferenceMap.get(Number(i));
				o || ((o = new Map()), this.RoleSkillReferenceMap.set(Number(i), o));
				for (const t of this.GetReferenceList(e, Number(i))) {
					var l = o.get(t);
					l
						? l !== e &&
							Log_1.Log.CheckError() &&
							Log_1.Log.Error("Role", 44, "技能表里的这个ID不能对应多个技能", [
								"ID",
								t,
							])
						: o.set(t, e);
				}
			}
	}
	GetReferencedSkillLevel(e, l) {
		return (
			(e = this.RoleSkillReferenceMap.get(l)?.get(e)),
			e ? this.GetSkillLevel(e) : this.GetDefaultSkillLevel(l)
		);
	}
	SetSkillNodeStateData(e) {
		(this.SkillNodeState = e),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillTreeRefresh);
	}
	GetSkillNodeStateData() {
		return this.SkillNodeState;
	}
	GetSkillTreeNodeState(e, l) {
		var i = e.SkillId;
		return i && 0 < i && 3 !== e.NodeType
			? this.GetSkillTreeSkillNodeState(e, l)
			: this.GetSkillTreeAttributeNodeState(e, l);
	}
	GetSkillTreeSkillNodeState(e, l) {
		var i = e.SkillId,
			o = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i);
		return this.GetSkillLevel(i) === o.MaxSkillLevel
			? 3
			: !this.GetSkillTreeUnsatisfiedCondition(e) &&
					((i = this.GetRoleSkillTreeNodeUnlockConditionId(e)),
					ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
						i.toString(),
						void 0,
						!0,
						l,
					))
				? 2
				: 1;
	}
	GetSkillTreeAttributeNodeState(e, l) {
		return this.IsSkillTreeNodeActive(e.Id)
			? 3
			: this.GetSkillTreeUnsatisfiedCondition(e) ||
					(0 < (e = this.GetRoleSkillTreeNodeUnlockConditionId(e)) &&
						!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
							e.toString(),
							void 0,
							!0,
							l,
						))
				? 1
				: 2;
	}
	GetUnlockConditionTextId(e) {
		var l = this.GetSkillTreeUnsatisfiedCondition(e);
		return l
			? l.Description
			: (l = this.GetRoleSkillTreeNodeUnlockConditionId(e)) && 0 < l
				? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(l)
				: void 0;
	}
	GetRoleSkillTreeNodeUnlockConditionId(e) {
		var l,
			i = e.SkillId;
		return i && 0 < i
			? ((l =
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i)),
				(i = this.GetSkillLevel(i)),
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillLevelConfigByGroupIdAndLevel(
					l.SkillLevelGroupId,
					i + 1,
				).Condition)
			: e.UnLockCondition;
	}
	IsSkillTreeNodeActive(e) {
		let l = !1;
		var i = this.GetSkillNodeStateData(),
			o = i.length;
		for (let r = 0; r < o; r++) {
			var t = i[r];
			if (t.SkillNodeId === e && t.IsActive) {
				l = !0;
				break;
			}
		}
		return l;
	}
	GetSkillTreeUnsatisfiedCondition(e) {
		var l = e.Condition,
			i = l.length;
		for (let f = 0; f < i; f++) {
			var o = l[f],
				t =
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConditionById(
						o,
					),
				r = e.NodeGroup;
			if (t)
				if (1 === t.ConditionType) {
					for (var [n, a] of t.ConditionParam)
						if (
							((n =
								ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(
									r,
									n,
								)),
							this.GetSkillNodeLevel(n) < a)
						)
							return t;
				} else if (2 === t.ConditionType) {
					var S = e.ParentNodes.length;
					for (let l = 0; l < S; l++) {
						var s = e.ParentNodes[l];
						s =
							ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(
								r,
								s,
							);
						if (0 === this.GetSkillNodeLevel(s)) return t;
					}
				}
		}
	}
	IsSkillTreeNodeConsumeSatisfied(e) {
		var l = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e);
		l = this.GetSkillNodeLevel(l);
		if (
			(e =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(
					e,
					l + 1,
				))
		)
			for (var [i, o] of e)
				if (
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i) <
					o
				)
					return !1;
		return !0;
	}
}
exports.RoleSkillData = RoleSkillData;

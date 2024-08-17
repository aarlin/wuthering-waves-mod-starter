"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleRobotData = void 0);
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AttributeModel_1 = require("../../Attribute/AttributeModel"),
	PhantomTrialBattleData_1 = require("../../Phantom/PhantomBattle/Data/PhantomTrialBattleData"),
	WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData"),
	SkillNodeDataInfo_1 = require("./Module/DataInfo/SkillNodeDataInfo"),
	RoleDataBase_1 = require("./RoleDataBase");
class RoleRobotData extends RoleDataBase_1.RoleDataBase {
	constructor(e) {
		super(e), (this.h1o = void 0), this.SetDefaultData();
	}
	SetDefaultData() {
		this.l1o(), this._1o(), this.u1o(), this.c1o(), this.m1o();
	}
	l1o() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
				this.Id,
			),
			a = this.GetLevelData(),
			o = (a.SetLevel(e.Level), this.GetRoleConfig());
		for (const t of ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachList(
			o.BreachId,
		))
			if (e.Level <= t.MaxLevel) {
				a.SetBreachLevel(t.BreachLevel);
				break;
			}
	}
	_1o() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
				this.Id,
			),
			a = this.GetSkillData(),
			o = this.GetRoleConfig().SkillId;
		for (const i of a.GetSkillList()) {
			var t =
					(t = this.d1o(i.Id)) < e.UnlockSkillLevel ? t : e.UnlockSkillLevel,
				n =
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndSkillId(
						o,
						i.Id,
					);
			n &&
				(3 === n?.NodeType
					? a.SetSkillLevel(i.Id, 0)
					: a.SetSkillLevel(i.Id, t),
				a.SetSkillReferenceMapBySkillId(i.Id));
		}
		var i = [];
		for (const a of e.UnlockSkillNodeList) {
			var l =
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(
						o,
						a,
					),
				r = l?.NodeType;
			(4 !== r && 3 !== r) ||
				i.push(new SkillNodeDataInfo_1.SkillNodeDataInfo(l.Id, !0, l.SkillId));
		}
		0 < i.length && a.SetSkillNodeStateData(i);
	}
	d1o(e) {
		return (
			(e = ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillLevelConfigList(
					e,
				),
			)).sort((e, a) => e.Id - a.Id),
			(e = e[e.length - 1]).SkillId
		);
	}
	u1o() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
			this.Id,
		);
		this.GetResonanceData().SetResonantChainGroupIndex(e.ResonanceLevel);
	}
	c1o() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
			this.Id,
		);
		(this.h1o = new WeaponTrialData_1.WeaponTrialData()),
			this.h1o.SetTrialId(e.TrailWeapon),
			this.h1o.SetRoleId(this.Id);
	}
	m1o() {
		var e = this.GetPhantomData(),
			a =
				(e.SetIsTrial(!0),
				ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id));
		for (let g = 0, f = a.PhantomEquipList.length; g < f; ++g) {
			var o = a.PhantomEquipList[g],
				t =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrialPhantomPropConfig(
						o.Item2,
					),
				n = new PhantomTrialBattleData_1.PhantomTrialBattleData();
			n.SetIncId(
				PhantomTrialBattleData_1.PhantomTrialBattleData.GenerateLocalUniqueId(
					this.GetRoleId(),
					g,
				),
			),
				n.SetConfigId(o.Item1),
				n.SetPhantomLevel(t.Level),
				n.SetSlotIndex(g),
				n.SetFetterGroupId(t.FetterGroupId);
			for (const e of t.MainProps) {
				var i =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrailPhantomPropItemById(
							e,
						),
					l =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomGrowthValueByGrowthIdAndLevel(
							t.MainPropGrowth,
							t.Level,
						);
				l = AttributeModel_1.TipsDataTool.GetAttributeValue(i.Value, l, !1);
				n.SetMainPropValue(i.Id, l, i.IsRatio);
			}
			for (const e of t.SubPropList) {
				var r =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetTrailPhantomPropItemById(
						e,
					);
				n.SetSubPropValue(r.Id, r.Value, r.IsRatio);
			}
			e.SetDataMap(g, n),
				ModelManager_1.ModelManager.PhantomBattleModel.SetRobotPhantomData(
					n.GetIncrId(),
					n,
				);
		}
	}
	GetRoleId() {
		return ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(this.Id)
			.ParentId;
	}
	IsTrialRole() {
		return !0;
	}
	GetName(e) {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
			this.GetRoleConfig().Name,
		);
	}
	SetName(e) {
		this.Name = e;
	}
	CanChangeName() {
		return !1;
	}
	GetWeaponData() {
		return this.h1o;
	}
	IsOnlineRole() {
		return !1;
	}
	GetRoleCreateTime() {
		return 0;
	}
	GetIsNew() {
		return !1;
	}
}
exports.RoleRobotData = RoleRobotData;

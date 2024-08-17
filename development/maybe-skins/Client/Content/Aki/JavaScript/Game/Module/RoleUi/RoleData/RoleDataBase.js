"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleDataBase = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AttrListScrollData_1 = require("../View/ViewData/AttrListScrollData"),
	RoleAttributeData_1 = require("./Module/RoleAttributeData"),
	RoleAudioData_1 = require("./Module/RoleAudioData"),
	RoleFavorData_1 = require("./Module/RoleFavorData"),
	RoleLevelData_1 = require("./Module/RoleLevelData"),
	RolePhantomData_1 = require("./Module/RolePhantomData"),
	RoleResonanceData_1 = require("./Module/RoleResonanceData"),
	RoleSkillData_1 = require("./Module/RoleSkillData");
class RoleDataBase {
	constructor(e) {
		(this.RoleModelConfig = void 0),
			(this.n1o = new Map()),
			(this.s1o = [
				RoleLevelData_1.RoleLevelData,
				RoleAttributeData_1.RoleAttributeData,
				RoleSkillData_1.RoleSkillData,
				RoleResonanceData_1.RoleResonanceData,
				RolePhantomData_1.RolePhantomData,
				RoleAudioData_1.RoleAudioData,
				RoleFavorData_1.RoleFavorData,
			]),
			(this.SortAttrList = (e, t) => {
				var a = 0 !== e.Priority,
					o = 0 !== t.Priority;
				return a && o ? e.Priority - t.Priority : a ? -1 : o ? 1 : e.Id - t.Id;
			}),
			(this.Id = e),
			(this.Name = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
				this.GetRoleConfig().Name,
			)),
			this.a1o();
	}
	a1o() {
		var e = this.GetRoleId();
		for (const t of this.s1o) this.n1o.set(t, new t(e));
	}
	GetLevelData() {
		return this.n1o.get(RoleLevelData_1.RoleLevelData);
	}
	GetAttributeData() {
		return this.n1o.get(RoleAttributeData_1.RoleAttributeData);
	}
	GetSkillData() {
		return this.n1o.get(RoleSkillData_1.RoleSkillData);
	}
	GetResonanceData() {
		return this.n1o.get(RoleResonanceData_1.RoleResonanceData);
	}
	GetPhantomData() {
		return this.n1o.get(RolePhantomData_1.RolePhantomData);
	}
	GetAudioData() {
		return this.n1o.get(RoleAudioData_1.RoleAudioData);
	}
	GetFavorData() {
		return this.n1o.get(RoleFavorData_1.RoleFavorData);
	}
	GetElementInfo() {
		var e = this.GetRoleConfig();
		return ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
			e.ElementId,
		);
	}
	GetQualityConfig() {
		var e = this.GetRoleConfig();
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(
			e.QualityId,
		);
	}
	GetRoleConfig() {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
			this.GetRoleId(),
		);
	}
	GetRoleSkillTreeConfig() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
			this.GetRoleId(),
		);
		if (e)
			return ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeListByGroupId(
				e.SkillTreeGroupId,
			);
	}
	GetDataId() {
		return this.Id;
	}
	GetShowAttrList() {
		var e = new Array(),
			t =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList();
		if (t) {
			var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
					ParamType: 0,
					OnlyMyRole: !0,
				}),
				o = a ? a.EntityHandle.Entity.GetComponent(156) : void 0;
			for (const a of t)
				if (a.IsShow) {
					let t = 0,
						l = 0;
					l = o
						? ((t = o.GetBaseValue(a.Id) ?? 0),
							o.GetCurrentValue(a.Id) - t ?? 0)
						: ((t = (r = this.GetAttributeData()).GetRoleBaseAttr(a.Id)),
							r.GetRoleAddAttr(a.Id));
					var r = new AttrListScrollData_1.AttrListScrollData(
						a.Id,
						t,
						l,
						a.Priority,
						!1,
						0,
					);
					e.push(r);
				}
			e.sort(this.SortAttrList);
		}
		return e;
	}
	GetShowAttributeValueById(e) {
		var t, a;
		let o = 0;
		return (
			(a = (a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
				this.Id,
				{ ParamType: 0, OnlyMyRole: !0 },
			))
				? a.EntityHandle.Entity.GetComponent(156)
				: void 0)
				? 0 === (o = a.GetCurrentValue(e)) &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Character", 44, "角色界面获取实体属性值为0", [
						"id",
						e,
					])
				: 0 ===
						(o =
							(t = (a = this.GetAttributeData()).GetRoleBaseAttr(e)) +
							(a = a.GetRoleAddAttr(e))) &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Character",
						44,
						"角色界面从服务器获取的属性值为0",
						["id", e],
						["baseAttr", t],
						["addAttr", a],
					),
			o
		);
	}
	GetBaseAttributeValueById(e) {
		var t;
		return (t = (t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
			this.Id,
			{ ParamType: 0, OnlyMyRole: !0 },
		))
			? t.EntityHandle.Entity.GetComponent(156)
			: void 0)
			? t.GetBaseValue(e)
			: this.GetAttributeData().GetRoleBaseAttr(e);
	}
	TryRemoveNewFlag() {}
}
exports.RoleDataBase = RoleDataBase;

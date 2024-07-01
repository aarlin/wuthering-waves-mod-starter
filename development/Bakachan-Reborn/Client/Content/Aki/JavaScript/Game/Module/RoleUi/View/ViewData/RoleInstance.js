"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleInstance = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ResonanceDataInfo_1 = require("../../RoleData/Module/DataInfo/ResonanceDataInfo"),
	SkillNodeDataInfo_1 = require("../../RoleData/Module/DataInfo/SkillNodeDataInfo"),
	RoleSkillData_1 = require("../../RoleData/Module/RoleSkillData"),
	RoleDataBase_1 = require("../../RoleData/RoleDataBase");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
class RoleInstance extends RoleDataBase_1.RoleDataBase {
	constructor(e) {
		super(e), (this.CreateTime = 0);
	}
	IsTrialRole() {
		return !1;
	}
	SetRoleName(e) {
		var t;
		StringUtils_1.StringUtils.IsEmpty(e)
			? ((t = this.GetRoleConfig()),
				(this.Name = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
					t.Name,
				)))
			: (this.Name = e);
	}
	GetName(e) {
		return ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(this.Id, e)
			? ModelManager_1.ModelManager.FunctionModel.GetPlayerName()
			: this.GetRoleRealName();
	}
	GetRoleRealName() {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
			this.GetRoleConfig().Name,
		);
	}
	GetSkillInfoLevel(e) {
		return this.GetSkillData().GetReferencedSkillLevel(
			e,
			RoleSkillData_1.ERoleSkillReferenceType.SkillInfo,
		);
	}
	GetRoleId() {
		return this.Id;
	}
	GetRoleCreateTime() {
		return this.CreateTime;
	}
	RefreshSkillInfo(e, t) {
		var a;
		((a =
			((a = this.GetSkillData()).SetSkillLevel(e, t),
			a.SetSkillReferenceMapBySkillId(e),
			new Protocol_1.Aki.Protocol.oNs())).Ckn = e),
			(a.gkn = t),
			EventSystem_1.EventSystem.EmitWithTarget(
				this,
				EventDefine_1.EEventName.RoleSkillLevelUp,
				this.GetRoleId(),
				a,
			);
	}
	RefreshRoleAttr(e, t) {
		var a = this.GetAttributeData(),
			o = a.GetOldRoleBaseAttr();
		a.ClearRoleBaseAttr();
		for (const t of e) a.SetRoleBaseAttr(t.Ckn, t.gkn), o.set(t.Ckn, t.gkn);
		var n = a.GetOldRoleAddAttr();
		a.ClearRoleAddAttr();
		for (const e of t) a.SetRoleAddAttr(e.Ckn, e.gkn), n.set(e.Ckn, e.gkn);
		0 !==
			(e =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId) &&
			0 ===
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
					.ShareAttri &&
			(o.delete(EAttributeId.Proto_Life), n.delete(EAttributeId.Proto_Life)),
			EventSystem_1.EventSystem.EmitWithTarget(
				this,
				EventDefine_1.EEventName.RoleRefreshAttribute,
				o,
				n,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoleRefreshAttribute,
				o,
				n,
			);
	}
	RefreshRoleInfo(e) {
		this.SetRoleName(e.e4n), (this.CreateTime = e.BRs);
		var t = this.GetLevelData(),
			a =
				(t.SetLevel(e.r3n),
				t.SetExp(e.k3n),
				t.SetBreachLevel(e.ADs),
				this.GetSkillData());
		for (const t of e.BDs)
			a.SetSkillLevel(t.Ckn, t.gkn), a.SetSkillReferenceMapBySkillId(t.Ckn);
		var o = this.GetPhantomData();
		for (const t of e.qDs) o.RefreshPhantom(t.Ckn, t.gkn);
		var n = e.FDs.length,
			l = [];
		for (let t = 0; t < n; t++) {
			var r = e.FDs[t];
			l.push(new SkillNodeDataInfo_1.SkillNodeDataInfo(r.$8n, r.rVn, r.vkn));
		}
		a.SetSkillNodeStateData(l), this.RefreshRoleAttr(e.hDs, e.lDs);
		for (const t of e.ODs) this.RefreshResonance(t);
		this.GetResonanceData().SetResonantChainGroupIndex(e.VDs);
	}
	RefreshResonance(e) {
		var t = this.GetResonanceData();
		e = new ResonanceDataInfo_1.ResonanceDataInfo(e.xDs, e.zCs, e.bDs);
		t.SetResonance(e);
	}
	CanChangeName() {
		return (
			!ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(this.Id) ||
			!ConfigManager_1.ConfigManager.PlayerInfoConfig.GetIsUseAccountName()
		);
	}
	IsOnlineRole() {
		return !1;
	}
	GetIsNew() {
		return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
			LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
			this.Id,
		);
	}
	TryRemoveNewFlag() {
		ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
			LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
			this.Id,
		) &&
			ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
				this.Id,
			);
	}
}
exports.RoleInstance = RoleInstance;

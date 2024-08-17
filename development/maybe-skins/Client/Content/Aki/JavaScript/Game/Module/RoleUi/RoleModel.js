"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleModel = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	BasePropertyById_1 = require("../../../Core/Define/ConfigQuery/BasePropertyById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	MenuController_1 = require("../Menu/MenuController"),
	SkillNodeDataInfo_1 = require("./RoleData/Module/DataInfo/SkillNodeDataInfo"),
	RoleOnlineInstanceData_1 = require("./RoleData/RoleOnlineInstanceData"),
	RoleRobotData_1 = require("./RoleData/RoleRobotData"),
	RoleDefine_1 = require("./RoleDefine"),
	RoleBreachResponseData_1 = require("./RoleLevel/RoleBreachResponseData"),
	RoleLevelResponseData_1 = require("./RoleLevel/RoleLevelResponseData"),
	RoleSkillResponseData_1 = require("./RoleSkill/RoleSkillResponseData"),
	RoleInstance_1 = require("./View/ViewData/RoleInstance");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
	RolePropertyGrowthByLevelAndBreachLevel_1 = require("../../../Core/Define/ConfigQuery/RolePropertyGrowthByLevelAndBreachLevel"),
	StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	RoleNewJoinAgent_1 = require("./View/AgentData/RoleNewJoinAgent"),
	RolePreviewAgent_1 = require("./View/AgentData/RolePreviewAgent"),
	RoleViewAgent_1 = require("./View/AgentData/RoleViewAgent");
class RoleModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.puo = new Map()),
			(this.vuo = new Map()),
			(this.Muo = new Set()),
			(this.Suo = new Map()),
			(this.Euo = !0),
			(this.yuo = void 0),
			(this.Iuo = !1),
			(this.RoleTrialIdList = new Set()),
			(this.DefaultSortFunc = (e, t) => {
				var o = e.GetLevelData(),
					n = t.GetLevelData();
				return o.GetLevel() !== n.GetLevel()
					? n.GetLevel() - o.GetLevel()
					: e.GetRoleConfig().QualityId !== t.GetRoleConfig().QualityId
						? t.GetRoleConfig().QualityId - e.GetRoleConfig().QualityId
						: e.GetRoleConfig().Priority !== t.GetRoleConfig().Priority
							? t.GetRoleConfig().Priority - e.GetRoleConfig().Priority
							: -1;
			}),
			(this.Tuo = void 0),
			(this.Luo = void 0),
			(this.Duo = void 0),
			(this.Ruo = []),
			(this.KEn = !1),
			(this.xie = (e, t) => {
				t &&
					(t.Entity?.GetComponent(174)).RemoveTagAddOrRemoveListener(
						1733479717,
						this.QEn,
					),
					e &&
						((t = e.Entity?.GetComponent(174)).AddTagAddOrRemoveListener(
							1733479717,
							this.QEn,
						),
						this.KEn !== t.HasTag(1733479717)) &&
						((this.KEn = !this.KEn),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
							this.KEn,
						));
			}),
			(this.QEn = (e, t) => {
				1733479717 === e &&
					((this.KEn = t),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
						t,
					));
			});
	}
	set IsInRoleTrial(e) {
		(this.Iuo = e), ModelManager_1.ModelManager.OnlineModel.DisableOnline(2, e);
	}
	get IsInRoleTrial() {
		return this.Iuo;
	}
	OnInit() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			!0
		);
	}
	OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
				LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
			),
			(this.IsInRoleTrial = !1),
			this.puo.clear(),
			this.vuo.clear(),
			!0
		);
	}
	UpdateRoleInfoByServerData(e) {
		for (const t of e) this.UpdateRoleInfo(t);
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate);
	}
	RoleChange(e, t) {
		this.puo.delete(e),
			this.UpdateRoleInfo(t),
			this.UpdateMainRoleMap(t.l3n),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				t.l3n,
			);
	}
	UpdateRoleInfo(e) {
		let t = this.puo.get(e.l3n);
		var o;
		t || ((t = new RoleInstance_1.RoleInstance(e.l3n)), this.puo.set(e.l3n, t)),
			this.IsMainRole(e.l3n) &&
				((o = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(e.l3n)),
				MenuController_1.MenuController.SetTargetConfig(88, o.Gender),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RefreshMenuSetting,
					88,
				)),
			t.RefreshRoleInfo(e);
	}
	UpdateMainRoleMap(e) {
		for (const t of this.Uuo().values()) this.Suo.set(t, e);
	}
	RoleLevelUp(e, t, o) {
		var n = this.GetRoleInstanceById(e),
			a = n.GetLevelData(),
			l = a.GetLevel();
		n && (a.SetLevel(o), a.SetExp(t)),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate),
			l < o &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RoleLevelUp,
					e,
					t,
					o,
				);
	}
	RoleLevelUpReceiveItem(e) {
		var t = [];
		for (const n of Object.keys(e)) {
			var o = [{ IncId: 0, ItemId: Number.parseInt(n) }, e[n]];
			t.push(o);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RoleLevelUpReceiveItem,
			t,
		);
	}
	RoleBreakUp(e, t) {
		var o = this.GetRoleInstanceById(e);
		o && o.GetLevelData().SetBreachLevel(t),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoleBreakUp,
				e,
				t,
			);
	}
	RoleSkillLevelUp(e, t) {
		var o = this.GetRoleInstanceById(e);
		o && o.RefreshSkillInfo(t.Ckn, t.gkn),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoleSkillLevelUp,
				e,
				t,
			);
	}
	RoleNameUpdate(e, t) {
		(e = this.GetRoleInstanceById(e)) &&
			(e.SetRoleName(t),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleRefreshName));
	}
	RoleAttrUpdate(e, t, o) {
		(e = this.GetRoleInstanceById(e)) && e.RefreshRoleAttr(t, o);
	}
	RoleResonanceLockFinish(e) {
		this.puo.get(e.l3n).GetResonanceData().SetResonanceLock(e.xDs);
	}
	GetRoleViewAgent(e) {
		switch (e) {
			case 1:
				return new RolePreviewAgent_1.RolePreviewAgent();
			case 2:
				return new RoleNewJoinAgent_1.RoleNewJoinAgent();
			default:
				return new RoleViewAgent_1.RoleViewAgent();
		}
	}
	get IsShowMultiSkillDesc() {
		return this.Euo;
	}
	set IsShowMultiSkillDesc(e) {
		this.Euo = e;
	}
	GetRoleList() {
		var e = Array.from(this.puo.keys()),
			t = (this.n5i(e), []);
		for (const n of e) {
			var o = this.puo.get(n);
			1 === o.GetRoleConfig().RoleType && t.push(o);
		}
		return t;
	}
	GetRoleMap() {
		return this.puo;
	}
	GetRoleRobotMap() {
		return this.vuo;
	}
	GetBattleTeamFirstRoleId() {
		return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem
			?.GetConfigId;
	}
	n5i(e) {
		e.sort((e, t) => {
			let o = -1,
				n = -1;
			var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
			for (let i = 0; i < a.length; i++) {
				var l = a[i];
				e === l.GetConfigId && (o = i), t === l.GetConfigId && (n = i);
			}
			var i = void 0 !== a[o],
				r = void 0 !== a[n];
			return i != r
				? (r ? 1 : 0) - (i ? 1 : 0)
				: i
					? o - n
					: ((r = this.GetRoleDataById(e)),
						(i = this.GetRoleDataById(t)),
						this.DefaultSortFunc(r, i));
		});
	}
	GetRoleDataById(e, t = !0) {
		let o;
		return t
			? (e > RoleDefine_1.ROBOT_DATA_MIN_ID
					? (o = this.GetRoleRobotData(e))
					: !(o = this.puo.get(e)) &&
						this.IsMainRole(e) &&
						((t = this.GetNewMainRoleId(e)), (o = this.puo.get(t))),
				o)
			: new RoleOnlineInstanceData_1.RoleOnlineInstanceData(e);
	}
	GetNewMainRoleId(e) {
		return this.Suo.get(e);
	}
	GetRoleRobotData(e) {
		let t = this.vuo.get(e);
		return (
			t || ((t = new RoleRobotData_1.RoleRobotData(e)), this.vuo.set(e, t)), t
		);
	}
	GetRoleInstanceById(e) {
		return this.puo.get(e);
	}
	GetRoleName(e, t = void 0) {
		var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
		return o
			? o.GetName(t)
			: ((o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Name));
	}
	Auo(e, t, o) {
		let n = 0;
		ModelManager_1.ModelManager.WeaponModel.AutoAddExpItemEx(e, t, o);
		for (const e of t) n += e.SelectedCount * o(e);
		return n;
	}
	Puo() {
		var e = [];
		for (const o of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList()) {
			var t = {
				IncId: 0,
				ItemId: o.Id,
				Count: ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
					o.Id,
				),
				SelectedCount: 0,
			};
			e.push(t);
		}
		return e;
	}
	GetSelectLevelUpItemNeedMoney(e) {
		e = this.GetRoleInstanceById(e).GetLevelData().GetLevelUpNeedExp();
		var t = this.Puo();
		e = this.Auo(e, t, (e) => this.GetRoleExpItemExp(e.ItemId));
		return this.GetMoneyToLevelUp(e);
	}
	GetMoneyToLevelUp(e) {
		var t =
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"ExpConversionCount",
			);
		return Math.ceil((e * t) / 1e3);
	}
	GetHasEnoughMoneyLevelUp(e) {
		return (
			(e = this.GetSelectLevelUpItemNeedMoney(e)),
			!(
				ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
					ItemDefines_1.EItemId.Gold,
				) < e
			)
		);
	}
	GetSelectHasEnoughItemToLevelUp(e) {
		e = this.GetRoleInstanceById(e)?.GetLevelData()?.GetLevelUpNeedExp();
		let t = 0;
		for (const e of this.GetRoleCostExpList()) {
			var o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
				e.Id,
			);
			t += this.GetRoleExpItemExp(e.Id) * o;
		}
		return t >= e;
	}
	GetRoleBreachState(e) {
		if (
			!(e = (e = this.GetRoleInstanceById(e).GetLevelData()).GetBreachConfig(
				e.GetBreachLevel() + 1,
			))
		)
			return 3;
		if (
			!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
				e.ConditionId.toString(),
				void 0,
				!0,
			)
		)
			return 4;
		for (const t of e.BreachConsume)
			if (t[0] === ItemDefines_1.EItemId.Gold) {
				if (
					ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
						ItemDefines_1.EItemId.Gold,
					) < t[1]
				)
					return 1;
			} else if (
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					t[0],
				) < t[1]
			)
				return 0;
		return 2;
	}
	GetBreachItemList() {
		var e = this.RoleBreachResponseData.GetCostList();
		if (e) {
			var t = new Map();
			let o;
			for (const n of e)
				n.Ckn === ItemDefines_1.EItemId.Gold
					? (o = n.gkn)
					: t.set(n.Ckn, n.gkn);
			return { needGold: o, costItemList: t };
		}
	}
	GetRoleCostExpList() {
		var e = [],
			t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemList();
		if (t)
			for (const n of t) {
				var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(n.Id);
				o && e.push(o);
			}
		return e;
	}
	GetRoleExpItemExp(e) {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemExp(e);
	}
	GetAllRoleList() {
		return Array.from(this.puo.values());
	}
	GetRoleIdList() {
		var e = Array.from(this.puo.keys()),
			t = (this.n5i(e), []);
		for (const o of e)
			1 === this.puo.get(o).GetRoleConfig().RoleType && t.push(o);
		return t;
	}
	GetRoleTabList() {
		var e =
				ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
					"RoleRootView",
				),
			t = e.length,
			o = [];
		for (let a = 0; a < t; a++) {
			var n = e[a];
			ModelManager_1.ModelManager.FunctionModel.IsOpen(n.FunctionId) &&
				o.push(n);
		}
		return o;
	}
	GetNormalRoleTabList() {
		return this.GetRoleTabList().filter(
			(e) =>
				"RoleAttributeTabView" === e.ChildViewName ||
				"RoleWeaponTabView" === e.ChildViewName ||
				"RolePhantomTabView" === e.ChildViewName ||
				"RoleSkillTabView" === e.ChildViewName ||
				"RoleResonanceTabNewView" === e.ChildViewName ||
				"RoleFavorTabView" === e.ChildViewName,
		);
	}
	GetTrialRoleTabList() {
		return this.GetRoleTabList().filter(
			(e) =>
				"RoleAttributeTabView" === e.ChildViewName ||
				"RoleWeaponTabView" === e.ChildViewName ||
				"RolePhantomTabView" === e.ChildViewName ||
				"RoleSkillTabView" === e.ChildViewName ||
				"RoleResonanceTabNewView" === e.ChildViewName,
		);
	}
	GetPreviewRoleTabList() {
		return this.GetRoleTabList().filter(
			(e) =>
				"RolePreviewAttributeTabView" === e.ChildViewName ||
				"RoleSkillTabView" === e.ChildViewName ||
				"RoleResonanceTabNewView" === e.ChildViewName,
		);
	}
	GetRoleTabListByUiParam(e) {
		switch (e) {
			case 1:
			case 3:
			default:
				return this.GetNormalRoleTabList();
			case 0:
				return this.GetTrialRoleTabList();
			case 2:
				return this.GetPreviewRoleTabList();
		}
	}
	RedDotRoleSelectionListCondition() {
		for (const e of this.GetRoleSystemRoleList())
			if (
				ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
					e,
				)
			)
				return !0;
		return !1;
	}
	RedDotRoleSystemRoleListCondition(e) {
		let t = !1;
		var o =
			ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData
				?.GetRoleIdList;
		return (t = o ? o.includes(e) : t)
			? !!this.RedDotResonanceTabCondition(e)
			: this.RedDotResonanceTabCondition(e);
	}
	RedDotAttributeTabLevelUpCondition(e) {
		var t = this.GetRoleDataById(e);
		return (
			!t.IsTrialRole() &&
			!t.GetLevelData().GetRoleIsMaxLevel() &&
			!(
				!this.GetSelectHasEnoughItemToLevelUp(e) ||
				!this.GetHasEnoughMoneyLevelUp(e)
			)
		);
	}
	RedDotAttributeTabBreakUpCondition(e) {
		return (
			!(e = this.GetRoleDataById(e)).IsTrialRole() &&
			!!e.GetLevelData().GetRoleNeedBreakUp() &&
			this.xuo(e)
		);
	}
	RedDotFavorItemActiveCondition(e) {
		return (
			!(e = this.GetRoleDataById(e)).IsTrialRole() &&
			e.GetFavorData().IsExistCanUnlockFavorItem()
		);
	}
	xuo(e) {
		return e.GetLevelData().IsEnoughBreachConsume();
	}
	RedDotResonanceTabCondition(e) {
		var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
		for (const o of ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(
			t.GetRoleConfig().ResonanceId,
		))
			if (this.RedDotResonanceTabHoleCondition(e, o.GroupIndex)) return !0;
		return !1;
	}
	RedDotResonanceTabHoleCondition(e, t) {
		if (
			!(e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)) ||
			e.IsTrialRole()
		)
			return !1;
		if (t - this.GetRoleResonanceGroupIndex(e) != 1) return !1;
		e = this.GetRoleResonanceConfigList(e)[t - 1];
		let o = !0;
		return (
			e.ActivateConsume.forEach((e, t) => {
				ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t) < e &&
					(o = !1);
			}),
			o
		);
	}
	GetRoleResonanceState(e, t) {
		return t <= (e = e.GetResonanceData().GetResonantChainGroupIndex())
			? 2
			: t - 1 === e
				? 1
				: 0;
	}
	GetRoleResonanceGroupIndex(e) {
		return e.GetResonanceData().GetResonantChainGroupIndex();
	}
	GetRoleResonanceConfigList(e) {
		return (
			(e = e.GetDataId()),
			(e =
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
					e,
				).ResonantChainGroupId),
			ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(e)
		);
	}
	get RoleLevelResponseData() {
		return (
			this.Tuo ||
				(this.Tuo = new RoleLevelResponseData_1.RoleLevelResponseData()),
			this.Tuo
		);
	}
	UpdateLevelViewResponseData(e) {
		this.RoleLevelResponseData.UpdateRoleLevelUpViewResponse(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SelectLevelUpItemCount,
			);
	}
	get RoleBreachResponseData() {
		return (
			this.Luo ||
				(this.Luo = new RoleBreachResponseData_1.RoleBreachResponseData()),
			this.Luo
		);
	}
	UpdateRoleBreachViewResponseData(e) {
		this.RoleBreachResponseData.UpdateRoleBreakThroughViewResponse(e);
	}
	get RoleSkillResponseData() {
		return (
			this.Duo ||
				(this.Duo = new RoleSkillResponseData_1.RoleSkillResponseData()),
			this.Duo
		);
	}
	GetCurRoleSkillViewDataLocal(e, t) {
		return (
			(e = this.GetRoleDataById(e).GetSkillData().GetSkillLevel(t)),
			this.GetRoleSkillEffect(t, e)
		);
	}
	GetNextRoleSkillViewDataLocal(e, t) {
		e = this.GetRoleDataById(e).GetSkillData().GetSkillLevel(t);
		var o =
			ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(
				t,
			).MaxSkillLevel;
		return this.GetRoleSkillEffect(t, e < o ? e + 1 : o);
	}
	GetRoleSkillEffect(e, t) {
		var o = new RoleDefine_1.SkillEffect(),
			n =
				((e = ConfigCommon_1.ConfigCommon.ToList(
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetAllRoleSkillDescConfigByGroupId(
						e,
					),
				)).sort((e, t) => e.Order - t.Order),
				[]);
		for (const o of e) {
			var a = new RoleDefine_1.OneSkillEffect();
			(a.Id = o.Id), (a.Desc = []);
			for (const e of o.SkillDetailNum)
				e.ArrayString.length <= 0 ||
					t > e.ArrayString.length ||
					a.Desc.push(e.ArrayString[t - 1]);
			n.push(a);
		}
		return (o.Level = t), (o.EffectDescList = n), o;
	}
	UpdateRoleSkillViewData(e, t, o) {
		this.RoleSkillResponseData.UpdateRoleSkillViewResponse(e, t, o),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UpdateRoleSkillView,
			);
	}
	UpdateRoleSkillNodeData(e, t) {
		if (
			(e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)) &&
			(e = e.GetSkillData())
		) {
			var o = t.length,
				n = [];
			for (let e = 0; e < o; e++) {
				var a = t[e];
				n.push(new SkillNodeDataInfo_1.SkillNodeDataInfo(a.$8n, a.rVn, a.vkn));
			}
			e.SetSkillNodeStateData(n);
		}
	}
	UpdateRoleFavorData(e) {
		var t = e.length;
		for (let o = 0; o < t; o++) this.UpdateRoleFavorDataSingle(e[o]);
	}
	UpdateRoleFavorCondition(e) {
		for (var [t, o] of e)
			ModelManager_1.ModelManager.RoleFavorConditionModel.UpdateRoleFavorCondtion(
				t,
				o,
			);
	}
	UpdateRoleFavorDataSingle(e) {
		var t,
			o,
			n,
			a,
			l = e.l3n;
		(l = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(l)) &&
			(l = l.GetFavorData()) &&
			((t = e.r3n),
			(o = e.k3n),
			(n = e.SLs),
			(a = e.ELs),
			(e = e.yLs),
			l.SetFavorLevel(t),
			l.SetFavorExp(o),
			l.UpdateRoleFavorData(0, n),
			l.UpdateRoleFavorData(1, a),
			l.UpdateRoleFavorData(3, e));
	}
	UpdateRoleFavorNewCanUnLockId(e) {
		var t = e.l3n;
		ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t)
			.GetFavorData()
			.UpdateCanUnlockId(e.t6n, e.DLs);
	}
	UpdateRoleFavorLevelAndExp(e) {
		var t = e.l3n;
		(t =
			ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				t,
			).GetFavorData()).SetFavorLevel(e.r3n),
			t.SetFavorExp(e.k3n);
	}
	GetRoleSystemRoleList() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
			var e = [];
			for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
				var t = n.GetConfigId,
					o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
				o && o.IsTrialRole() && e.push(t);
			}
			var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength();
			if (
				ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
				0 < e.length &&
				e.length === n
			)
				return e;
			if (0 < e.length) {
				var a = Array.from(this.puo.keys());
				for (const t of e) a.push(t);
				return this.n5i(a), a;
			}
		}
		return this.GetRoleIdList();
	}
	GetRoleListHighestLevel() {
		let e = -1;
		for (var [, t] of this.puo)
			e = (t = t.GetLevelData().GetLevel()) > e ? t : e;
		for (var [, o] of this.vuo)
			ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(o.GetDataId(), {
				ParamType: 0,
			}) && (e = (o = o.GetLevelData().GetLevel()) > e ? o : e);
		return e;
	}
	UpdateCanChangeRoleIdList(e) {
		this.Ruo = this.Ruo.concat(e);
	}
	GetCanChangeRoleIdList() {
		return this.Ruo;
	}
	IsMainRole(e) {
		return this.Uuo().has(e);
	}
	Uuo() {
		return 0 === this.Muo.size && this.wuo(), this.Muo;
	}
	wuo() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetAllMainRoleConfig(),
			t = e.length;
		for (let n = 0; n < t; n++) {
			var o = e[n];
			this.Muo.add(o.Id);
		}
	}
	GetCurSelectMainRoleId() {
		for (const e of this.Uuo().values()) if (this.puo.get(e)) return e;
	}
	GetCurSelectMainRoleInstance() {
		for (const t of this.Uuo().values()) {
			var e = this.puo.get(t);
			if (e) return e;
		}
	}
	GetRoleLevelUpExp(e, t) {
		return (
			(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
			(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelConsume(
				e.LevelConsumeId,
				t,
			))
				? e.ExpCount
				: 1
		);
	}
	CalculateExpBackItem(e) {
		var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemList(),
			o = t.length;
		let n = e;
		var a = new Map();
		for (let e = o - 1; 0 <= e; e--) {
			var l = t[e].BasicExp,
				i = Math.floor(n / l);
			(n %= l), 0 < i && a.set(t[e].Id, i);
		}
		return a;
	}
	GetBaseAttributeById(e, t) {
		e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
		var o = BasePropertyById_1.configBasePropertyById.GetConfig(e.PropertyId);
		switch (t) {
			case EAttributeId.Proto_Atk:
				return o.Atk;
			case EAttributeId.Proto_Def:
				return o.Def;
			case EAttributeId.Tkn:
				return o.LifeMax;
		}
		return 0;
	}
	GetAttributeRadioByLevel(e, t, o) {
		var n =
			RolePropertyGrowthByLevelAndBreachLevel_1.configRolePropertyGrowthByLevelAndBreachLevel.GetConfig(
				t,
				o,
			);
		switch (e) {
			case EAttributeId.Proto_Atk:
				return n.AtkRatio;
			case EAttributeId.Proto_Def:
				return n.DefRatio;
			case EAttributeId.Tkn:
				return n.LifeMaxRatio;
		}
		return 0;
	}
	GetAttributeByLevel(e, t, o, n) {
		return (
			(e =
				this.GetBaseAttributeById(e, t) *
				this.GetAttributeRadioByLevel(t, o, n) *
				RoleDefine_1.MUL_RATIO),
			Math.floor(e)
		);
	}
	GetAddAttrLevelUp(e, t, o, n, a, l) {
		return (
			(t = this.GetAttributeByLevel(e, l, t, o)),
			this.GetAttributeByLevel(e, l, n, a) - t
		);
	}
	GetRoleSkillTreeNodeLevel(e, t) {
		if (
			!(t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(t))
		)
			return 0;
		let o = this.GetRoleInstanceById(e);
		return (
			(o = o || this.GetRoleDataById(e)),
			this.GetRoleSkillTreeNodeLevelByConfig(o, t)
		);
	}
	GetRoleSkillTreeNodeLevelByConfig(e, t) {
		return e.GetSkillData().GetSkillNodeLevel(t);
	}
	GetRoleSkillTreeNodeState(e, t) {
		if (
			(t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(t))
		) {
			let o = this.GetRoleInstanceById(e);
			return (o = o || this.GetRoleDataById(e))
				.GetSkillData()
				.GetSkillTreeNodeState(t, e);
		}
	}
	GetRoleSkillTreeNodeConsumeSatisfied(e, t) {
		return (
			!!(e = this.GetRoleInstanceById(e)) &&
			e.GetSkillData().IsSkillTreeNodeConsumeSatisfied(t)
		);
	}
	GetSkillAttributeNameByOneSkillEffect(e) {
		return ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillDescriptionConfigById(
			e.Id,
		).AttributeName;
	}
	GetSkillAttributeDescriptionByOneSkillEffect(e) {
		var t =
			ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillDescriptionConfigById(
				e.Id,
			);
		let o = "";
		if (t.Description)
			o = StringUtils_1.StringUtils.Format(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Description),
				...e.Desc,
			);
		else {
			var n = new StringBuilder_1.StringBuilder(),
				a = e.Desc.length;
			for (let t = 0; t < a; ++t) n.Append(e.Desc[t]);
			o = n.ToString();
		}
		return o;
	}
	GetResonantItemRoleMap() {
		if (!this.yuo) {
			var e;
			this.yuo = new Map();
			for (const t of ConfigManager_1.ConfigManager.RoleConfig.GetRoleList())
				t.ResonantChainGroupId <= 0 ||
					((e =
						ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(
							t.ResonantChainGroupId,
						)) &&
						e.forEach((e) => {
							for (const o of e.ActivateConsume) {
								let e = this.yuo.get(o[0]);
								(e = e || new Array()).includes(t.Id) || e.push(t.Id),
									this.yuo.set(o[0], e);
							}
						}));
		}
		return this.yuo;
	}
	GetResonantItemRoleId(e) {
		return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
			e,
		)?.ShowTypes.includes(30) &&
			(e = this.GetResonantItemRoleMap().get(e)) &&
			0 < e.length
			? e
			: void 0;
	}
	CheckRoleResonantIfMax(e) {
		return (
			!!(e = this.GetRoleInstanceById(e)) &&
			(this.GetRoleResonanceGroupIndex(e) ?? 0) >=
				ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel()
		);
	}
	GetRoleLeftResonantCount(e) {
		return (e = this.GetRoleInstanceById(e))
			? ((e = this.GetRoleResonanceGroupIndex(e) ?? 0),
				ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel() -
					e)
			: 0;
	}
	GetRoleLeftResonantCountWithInventoryItem(e) {
		var t;
		if (!(e = this.GetRoleInstanceById(e))) return 0;
		let o = 0;
		for ([t] of e.GetRoleConfig().SpilloverItem)
			o += ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
		return (
			(e = this.GetRoleResonanceGroupIndex(e) ?? 0),
			ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel() -
				e -
				o
		);
	}
	InUltraSkill() {
		return this.KEn;
	}
}
exports.RoleModel = RoleModel;

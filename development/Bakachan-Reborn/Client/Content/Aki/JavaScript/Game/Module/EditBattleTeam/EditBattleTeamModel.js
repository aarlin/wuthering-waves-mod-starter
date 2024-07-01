"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditBattleTeamModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	InstOnlineType_1 = require("../../../Core/Define/Config/SubType/InstOnlineType"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RoleDefine_1 = require("../RoleUi/RoleDefine"),
	SceneTeamDefine_1 = require("../SceneTeam/SceneTeamDefine"),
	EditBattleRoleData_1 = require("./EditBattleRoleData"),
	EditBattleRoleSlotData_1 = require("./EditBattleRoleSlotData"),
	EditBattleTeamController_1 = require("./EditBattleTeamController"),
	LIMIT_COUNT_MAX_LENGTH = 3;
class EditBattleTeamModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.$Ft = new Map()),
			(this.YFt = void 0),
			(this.JFt = void 0),
			(this.zFt = void 0),
			(this.ZFt = new Map()),
			(this.e3t = void 0),
			(this.t3t = !0),
			(this.i3t = !1);
	}
	get NeedEntrance() {
		return this.t3t;
	}
	set NeedEntrance(e) {
		this.t3t = e;
	}
	get InstanceMultiEnter() {
		return this.i3t;
	}
	set InstanceMultiEnter(e) {
		this.i3t = e;
	}
	SetInstanceDungeonId(e) {
		this.JFt = e;
	}
	get GetInstanceDungeonId() {
		return this.JFt;
	}
	get GetAllRoleConfigIdList() {
		var e = [];
		for (let o = 1; o <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; o++) {
			var t = this.GetRoleSlotData(o);
			t && t.HasRole && ((t = t.GetRoleData.ConfigId), e.push(t));
		}
		return e;
	}
	get IsAllRoleDie() {
		for (const t of this.GetAllRoleSlotData)
			if (t.HasRole) {
				var e = t.GetRoleData.ConfigId;
				if (this.IsTrialRole(e)) return !1;
				if (!ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e))
					return !1;
			}
		return !0;
	}
	get GetOwnRoleConfigIdList() {
		var e = new Array(),
			t = new Array(),
			o = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
		for (let n = 1; n <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; n++) {
			var a = this.GetRoleSlotData(n);
			a &&
				a.HasRole &&
				o === (a = a.GetRoleData).PlayerId &&
				((a = a.ConfigId), e.push(a), t.push(n - 1));
		}
		return [e, t];
	}
	get IsMultiInstanceDungeon() {
		var e = this.GetCurrentDungeonConfig;
		return (
			(!e || e.OnlineType !== InstOnlineType_1.InstOnlineType.Single) &&
			this.InstanceMultiEnter
		);
	}
	SetLeaderPlayerId(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Formation", 8, "[EditBattleTeam]设置队长", [
				"PlayerId",
				e,
			]),
			(this.zFt = e);
	}
	get GetLeaderPlayerId() {
		return this.zFt;
	}
	get GetLeaderIsSelf() {
		return (
			!!this.GetLeaderPlayerId &&
			ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
				this.GetLeaderPlayerId
		);
	}
	get IsInInstanceDungeon() {
		return ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
	}
	GetAllRoleCanAddToTeam() {
		for (const e of this.GetAllRoleConfigIdList)
			if (!this.CanAddRoleToEditTeam(e)) return { CanAdd: !1, LimitRoleId: e };
		return { CanAdd: !0, LimitRoleId: 0 };
	}
	InitTrailRoleInstance() {
		this.ZFt.clear();
		var e,
			t = this.GetCurrentFightFormation.TrialRole,
			o = ModelManager_1.ModelManager.RoleModel;
		for (const a of t)
			this.ZFt.has(a) ||
				((e = o.GetRoleDataById(
					ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
						a,
					),
				)),
				this.ZFt.set(a, e));
	}
	GetRoleList() {
		var e = ModelManager_1.ModelManager.RoleModel,
			t = [],
			o = e.GetRoleMap();
		if (this.o3t())
			for (const o of this.r3t()) {
				var a,
					n = e.GetRoleDataById(o);
				n && ((a = n.GetDataId()), this.CanAddRoleToEditTeam(a)) && t.push(n);
			}
		else {
			for (const e of o.values()) {
				var l = e.GetDataId();
				this.CanAddRoleToEditTeam(l) && t.push(e);
			}
			for (const e of this.ZFt.values()) t.push(e);
		}
		if (
			!this.e3t &&
			((this.e3t = new Array()),
			(o = ModelManager_1.ModelManager.WorldLevelModel.Sex),
			(o = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(o)))
		)
			for (const e of o) this.e3t.push(e.Id);
		for (let o = 0; o < t.length; ) {
			var r = t[o].GetRoleId();
			e.IsMainRole(r) && !this.e3t.includes(r) ? t.splice(o, 1) : o++;
		}
		return t;
	}
	HasAnyLimit() {
		return !!(this.o3t() || this.n3t() || this.s3t() || this.a3t());
	}
	r3t() {
		var e = this.GetCurrentFightFormation;
		if (e) return e.LimitRole;
	}
	o3t() {
		var e = this.r3t();
		return !!e && 0 < e.length;
	}
	n3t() {
		var e = this.GetCurrentFightFormation;
		return !!e && 3 !== (e = e.LimitCount.length) && 0 < e;
	}
	s3t() {
		var e = this.GetCurrentFightFormation;
		return !!e && 0 < e.LitmitElement.length;
	}
	a3t() {
		return !!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon();
	}
	CanAddRoleToEditTeam(e) {
		var t;
		return (
			!!this.IsTrialRole(e) ||
			((t = this.IsInLimitRole(e)), (e = this.IsInLimitElement(e)), t && e)
		);
	}
	IsInLimitRoleCount(e) {
		var t = this.GetLimitRoleCountList();
		return !t || t.includes(e);
	}
	IsInLimitRole(e) {
		var t = this.GetCurrentFightFormation;
		return !t || (t = t.LimitRole).length <= 0 || t.includes(e);
	}
	IsInLimitElement(e) {
		var t = this.GetCurrentFightFormation;
		return (
			!t ||
			(!!(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)) &&
				((e = e.ElementId), (t = t.LitmitElement).length <= 0 || t.includes(e)))
		);
	}
	GetLimitRoleCountList() {
		var e;
		if ((e = this.GetCurrentFightFormation) && 0 !== (e = e.LimitCount).length)
			return e;
	}
	GetMaxLimitRoleCount() {
		var e = this.GetLimitRoleCountList();
		return e ? e[e.length - 1] : 0;
	}
	get GetCurrentDungeonConfig() {
		if (this.GetInstanceDungeonId)
			return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetDungeonConfig(
				this.GetInstanceDungeonId,
			);
	}
	get GetCurrentFightFormation() {
		var e = this.GetCurrentDungeonConfig;
		if (e && 0 !== (e = e.FightFormationId))
			return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
				e,
			);
	}
	CreateAllRoleSlotData() {
		for (let t = 1; t <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; t++) {
			var e = new EditBattleRoleSlotData_1.EditBattleRoleSlotData(t);
			this.$Ft.set(t, e);
		}
	}
	ResetAllRoleSlotData() {
		for (const e of this.$Ft.values()) e.ResetRoleData();
		this.ZFt.clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Formation", 8, "[EditBattleTeam]还原所有战前编队数据");
	}
	HasSameConfigIdInAnyOwnRoleSlot(e) {
		for (const o of this.$Ft.values()) {
			var t = o.GetRoleData;
			if (t && t.IsSelf && o.GetRoleConfigId === e) return !0;
		}
		return !1;
	}
	GetPlayerRoleNumber(e) {
		let t = 0;
		for (var [, o] of this.$Ft) e === o.GetRoleData?.PlayerId && t++;
		return t;
	}
	GetParentRolePositionInEditBattleTeam(e) {
		var t;
		if (this.IsTrialRole(e))
			return (
				(t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).Id),
				(t = this.GetSlotDataByConfigId(t)) ? t.GetPosition : -1
			);
		for (const t of this.GetAllRoleSlotData) {
			var o = t.GetRoleData;
			if (o && (o = o.GetTrialRoleConfig) && o.ParentId === e)
				return t.GetPosition;
		}
		return -1;
	}
	get GetOwnRoleCountInRoleSlot() {
		let e = 0;
		for (const o of this.$Ft.values()) {
			var t = o.GetRoleData;
			t && t.IsSelf && e++;
		}
		return e;
	}
	GetRoleCountInRoleSlot() {
		let e = 0;
		for (const t of this.$Ft.values()) t.GetRoleData && e++;
		return e;
	}
	PrintRoleSlotsDebugString() {
		for (let t = 1; t <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; t++) {
			var e = this.GetRoleSlotData(t);
			e.HasRole
				? ((e = e.GetRoleData),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Formation",
							8,
							"[EditBattleTeam]战前编队 Position 号位的角色信息: RoleData ",
							["Position", t],
							["RoleData", e],
						))
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Formation",
						8,
						"[EditBattleTeam]战前编队 Position 号位没有角色",
						["Position", t],
					);
		}
	}
	SetCurrentEditPosition(e) {
		this.YFt = e;
	}
	get GetCurrentEditRoleSlotData() {
		if (this.YFt) return this.GetRoleSlotData(this.YFt);
	}
	IsInEditBattleTeam(e, t = !1) {
		var o = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
		for (const n of this.$Ft.values()) {
			var a = n.GetRoleData;
			if (a && (!t || o === a.PlayerId) && a.ConfigId === e) return !0;
		}
		return !1;
	}
	GetEditBattleTeamPositionByConfigId(e) {
		return (e = this.GetSlotDataByConfigId(e)) ? e.GetPosition : -1;
	}
	GetSlotDataByConfigId(e) {
		for (const o of this.$Ft.values()) {
			var t = o.GetRoleData;
			if (t && t.ConfigId === e) return o;
		}
	}
	InitAllRoleSlotData() {
		var e;
		this.IsMultiInstanceDungeon
			? (ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarFormationDataList(),
				(e =
					ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarFormationDataList()),
				this.InitAllMultiRoleData(e))
			: this.InitAllSingleRoleData();
	}
	GetRoleSlotData(e) {
		return this.$Ft.get(e);
	}
	RefreshAllEmptySlotData() {
		for (let a = 1; a <= this.$Ft.size; a++) {
			var e = this.$Ft.get(a);
			if (e)
				if (!e.GetRoleData)
					for (let n = a + 1; n <= this.$Ft.size; n++) {
						var t = this.$Ft.get(n);
						if (t) {
							var o = t.GetRoleData;
							if (o) {
								e.SetRoleData(o), t.ResetRoleData();
								break;
							}
						}
					}
		}
	}
	get GetAllRoleSlotData() {
		var e = [];
		for (const t of this.$Ft.values()) e.push(t);
		return e;
	}
	SetPlayerReady(e, t) {
		for (var [, o] of this.$Ft) {
			var a;
			o.HasRole &&
				(a = o.GetRoleData).PlayerId === e &&
				(a.SetReady(t),
				(a = o.GetPosition),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnRefreshEditBattleRoleReady,
					a,
					t,
				));
		}
	}
	get GetIsAllReady() {
		var e = this.GetAllRoleSlotData,
			t = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
			o = this.GetLeaderIsSelf;
		for (const n of e)
			if (n.HasRole) {
				var a = n.GetRoleData;
				if (o && t === a.PlayerId) continue;
				if (!a.IsReady) return !1;
			}
		return !0;
	}
	get HasSameRole() {
		var e = this.GetAllRoleSlotData;
		for (const a of e)
			if (a.HasRole && a.GetRoleData.IsSelf) {
				var t = a.GetRoleData;
				let n = t.ConfigId;
				this.IsTrialRole(n) && (n = t.GetTrialRoleConfig.ParentId);
				for (const t of e)
					if (t.HasRole && a.GetPosition !== t.GetPosition) {
						var o = t.GetRoleData;
						let e = o.ConfigId;
						if (
							(this.IsTrialRole(e) && (e = o.GetTrialRoleConfig.ParentId),
							n === e)
						)
							return !0;
					}
			}
		return !1;
	}
	IsRoleConflict(e, t) {
		for (var [, o] of this.$Ft)
			if (o && o.GetRoleData?.PlayerId !== e && o.GetRoleConfigId === t)
				return !0;
		return !1;
	}
	get GetSelfIsReady() {
		var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
		return ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarPlayerReadyState(
			e,
		);
	}
	RefreshAllMultiRoleData() {
		var e =
				ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarFormationDataList(),
			t = e.length;
		for (let a = 0; a < 3; a++) {
			var o = this.$Ft.get(a + 1);
			a + 1 > t ? o.ResetRoleData() : o.SetRoleDataByPrewarInfo(e[a]);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
		);
	}
	InitAllMultiRoleData(e) {
		this.ResetAllRoleSlotData();
		for (const a of e) {
			var t = a.GetIndex(),
				o = this.GetRoleSlotData(t);
			o &&
				(a.IsEmpty() && a.IsLeader()
					? Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Formation",
							8,
							"[EditBattleTeam]此位置没有角色:{Position}",
							["{Position}", t],
						)
					: a.IsEmpty() ||
						((t = this.CreateRoleDataFromPrewarData(a)),
						o.SetRoleData(t),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Formation",
								8,
								"[EditBattleTeam]当初始化所有联机战前编队数据时,玩家在线索引:OnlineIndex,玩家信息:PrewarFormation",
								["OnlineIndex", a.GetOnlineNumber()],
								["PrewarFormation", a],
							),
						a.IsLeader() &&
							((o = a.GetPlayerId()), this.SetLeaderPlayerId(o))));
		}
		void 0 === this.GetLeaderPlayerId &&
			((e = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
			this.SetLeaderPlayerId(e)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			),
			this.PrintRoleSlotsDebugString();
	}
	InitAllSingleRoleData() {
		this.ResetAllRoleSlotData();
		const e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
		this.SetLeaderPlayerId(e), this.InitTrailRoleInstance();
		var t = this.GetCurrentFightFormation.AutoRole;
		if (t && 0 < t.length) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Formation",
					8,
					"[EditBattleTeam]当初始化所有单人战前编队数据时,此编队填写了自动上阵角色",
					["autoRoleGroupIdList", t],
				);
			let e = 1;
			for (const n of t) {
				var o,
					a = this.GetRoleSlotData(e);
				a &&
					((o = this.ZFt.get(n))
						? ((o = this.CreateRoleDataFromRoleInstance(o)),
							a.SetRoleData(o),
							e++)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Formation",
								8,
								"[EditBattleTeam]自动上阵角色配置的角色Id不在试用角色列表中",
								["autoRoleGroupConfigId", n],
							));
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			),
				this.PrintRoleSlotsDebugString();
		} else if (this.HasAnyLimit())
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Formation",
					8,
					"[EditBattleTeam]单人战前编队存在编队限制,将不会读取编队数据初始化",
				);
		else {
			if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
				let e;
				(t = ModelManager_1.ModelManager.TowerModel.GetFloorFormation(
					ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
				)),
					(e =
						!ModelManager_1.ModelManager.TowerModel.CheckInTower() ||
						0 < t?.length
							? t
							: ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation),
					EditBattleTeamController_1.EditBattleTeamController.SetEditBattleTeamByRoleId(
						e,
					);
			} else {
				let e = 1;
				var n = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
				const t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
				var l = ModelManager_1.ModelManager.RoleModel;
				for (const o of ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData.GetRoleDataMap().values()) {
					var r,
						i,
						s,
						d = o.ConfigId;
					d <= 0 ||
						t !== o.PlayerId ||
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Formation",
								8,
								"[EditBattleTeam]当初始化所有单人战前编队数据时,编队位置:{Position},角色Id:{ConfigId},玩家Id:{PlayerId}",
								["{Position}", e],
								["{ConfigId}", d],
								["{PlayerId}", o.PlayerId],
							),
						0 < (r = this.GetMaxLimitRoleCount()) && e > r) ||
						((r = this.GetRoleSlotData(e)),
						this.CanAddRoleToEditTeam(d) &&
							((i = new EditBattleRoleData_1.EditBattleRoleData()),
							(s = l.GetRoleDataById(d)?.GetLevelData().GetLevel() ?? 0),
							i.Init(t, d, 1, n, s, !0, !0),
							r.SetRoleData(i),
							e++));
				}
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			),
				this.PrintRoleSlotsDebugString();
		}
	}
	CreateRoleDataFromPrewarData(e) {
		var t = e.GetConfigId(),
			o = e.GetOnlineNumber(),
			a = e.GetPlayerName(),
			n = e.GetPlayerId(),
			l = e.GetLevel(),
			r = e.IsSelf(),
			i = ((e = e.GetIsReady()), new EditBattleRoleData_1.EditBattleRoleData());
		return i.Init(n, t, o, a, l, r, e), i;
	}
	CreateRoleDataFromRoleInstance(e) {
		var t = e.GetDataId(),
			o =
				((e = e.GetLevelData()),
				ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
			a = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName(),
			n = ((e = e.GetLevel()), this.GetSelfIsReady),
			l = new EditBattleRoleData_1.EditBattleRoleData();
		return l.Init(o, t, 1, a, e, !0, n), l;
	}
	IsTrialRole(e) {
		return e > RoleDefine_1.ROBOT_DATA_MIN_ID;
	}
	ChangeMainRoleData() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
			var e = ModelManager_1.ModelManager.RoleModel;
			for (const n of this.$Ft.values()) {
				var t,
					o = n.GetRoleData,
					a = o?.ConfigId;
				a &&
					!this.IsTrialRole(a) &&
					e.IsMainRole(a) &&
					(t = e.GetNewMainRoleId(a)) &&
					a !== t &&
					(o.ConfigId = t);
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			);
		}
	}
}
exports.EditBattleTeamModel = EditBattleTeamModel;

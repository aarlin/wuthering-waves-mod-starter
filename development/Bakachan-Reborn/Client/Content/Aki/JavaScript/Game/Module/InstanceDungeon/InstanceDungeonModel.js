"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PrewarFormationData_1 = require("./Define/PrewarFormationData"),
	InstanceDungeonInfo_1 = require("./InstanceDungeonInfo"),
	MATCHINGTEAMSIZE = 3;
class InstanceDungeonModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.NUe = 0),
			(this.Rli = void 0),
			(this.Uli = new Map()),
			(this.Ali = new Array()),
			(this.Pli = new Map()),
			(this.xli = void 0),
			(this.wli = new Map()),
			(this.InstanceFinishSuccess = 0),
			(this.InstanceRewardHaveTake = !1),
			(this.Bli = void 0),
			(this.bli = void 0),
			(this.qli = void 0),
			(this.CurrentInstanceIsFinish = !1);
	}
	OnClear() {
		return !(this.Bli = void 0);
	}
	OnLeaveLevel() {
		return (
			this.Bli?.SetTrack(!1),
			(this.InstanceFinishSuccess = 0),
			!(this.InstanceRewardHaveTake = !1)
		);
	}
	GetInstanceId() {
		return this.NUe;
	}
	SetInstanceId(e) {
		this.NUe = e;
	}
	SetMatchTeamInfo(e) {
		this.Rli = e;
	}
	GetMatchTeamInfo() {
		return this.Rli;
	}
	SetMatchTeamHost(e) {
		this.Rli.Q4n = e;
	}
	SetMatchTeamState(e) {
		this.Rli.H5n = e;
	}
	GetMatchTeamName(e) {
		for (const t of this.Rli.ZEs) if (t.aFn === e) return t.Rgs;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("InstanceDungeon", 5, "获取匹配副本队伍队员信息失败", [
				"队员Id",
				e,
			]);
	}
	IsMatchTeamHost() {
		return (
			ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.Rli?.Q4n
		);
	}
	IsTeamNotFull() {
		return this.Gli() < 3;
	}
	GetNeedMatchSize() {
		return 3 - this.Gli();
	}
	Gli() {
		var e = this.Rli.ZEs;
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return e.length;
		var t = ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer();
		let a = e.length + t.length;
		for (const n of t) for (const t of e) n === t.aFn && a--;
		return a;
	}
	IsAllPlayerInMatchTeam() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
		var e = [];
		for (const t of this.Rli.ZEs) e.push(t.aFn);
		let t = !0;
		for (const a of ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer())
			e.includes(a) || (t = !1);
		return t;
	}
	InitMatchingTeamConfirmReadyState(e) {
		for (const t of e) {
			this.Uli.set(t.aFn, t.YAs), this.Pli.set(t.aFn, t.O5n);
			for (const e of this.Ali)
				e.GetPlayerId() === t.aFn && e.SetIsReady(t.O5n);
		}
	}
	SetMatchingPlayerConfirmState(e, t) {
		this.Uli.set(e, t);
	}
	GetMatchingPlayerConfirmStateByPlayerId(e) {
		return this.Uli.get(e);
	}
	GetMatchingTeamReady() {
		return this.Rli.H5n === Protocol_1.Aki.Protocol.kNs.Proto_ReadyConfirm;
	}
	GetPlayerUiState(e) {
		for (const t of this.Rli.ZEs) if (t.aFn === e) return t.K5n;
		return Protocol_1.Aki.Protocol.FNs.Proto_Wait;
	}
	SetPlayerUiState(e, t) {
		for (const a of this.Rli.ZEs) a.aFn === e && (a.K5n = t);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnRefreshPlayerUiState,
			e,
		);
	}
	SetPrewarPlayerReadyState(e, t) {
		this.Pli.set(e, t);
		for (const a of this.Ali) a.GetPlayerId() === e && a.SetIsReady(t);
	}
	RemovePrewarPlayerReadyState(e) {
		this.Pli.delete(e);
	}
	ClearPrewarPlayerReadyState() {
		this.Pli.clear();
	}
	RemoveMatchingTeamConfirmState(e) {
		this.Uli.delete(e);
	}
	ClearMatchingTeamConfirmState() {
		this.Uli.clear();
	}
	GetPrewarPlayerReadyState(e) {
		return (e = this.Pli.get(e)) || !1;
	}
	SetPrewarFormationDataList() {
		this.ClearPrewarData();
		for (const t of this.GetMatchTeamInfo().ZEs)
			for (const a of t.j5n) {
				var e = new PrewarFormationData_1.PrewarFormationData();
				e.SetPlayerId(t.aFn),
					e.SetIsReady(this.GetPrewarPlayerReadyState(t.aFn)),
					e.SetLife(1),
					e.SetMaxLife(1),
					e.SetLevel(a.XAs),
					e.SetConfigId(a.l3n),
					this.Ali.push(e);
			}
		this.Nli();
	}
	AddPrewarFormationDataByPlayerInfo(e, t = !0) {
		t && this.Rli.ZEs.push(e);
		for (const t of e.j5n) {
			var a = new PrewarFormationData_1.PrewarFormationData();
			a.SetPlayerId(e.aFn),
				a.SetIsReady(this.GetPrewarPlayerReadyState(e.aFn)),
				a.SetLife(1),
				a.SetMaxLife(1),
				a.SetLevel(t.XAs),
				a.SetConfigId(t.l3n),
				this.Ali.push(a);
		}
		this.Nli();
	}
	Nli() {
		var e = this.GetMatchTeamInfo().Q4n;
		let t = 1,
			a = 1;
		for (const n of this.Ali)
			n.GetPlayerId() === e && (n.SetIndex(t++), n.SetOnlineNumber(a));
		a++;
		for (const n of this.Ali)
			n.GetPlayerId() !== e && (n.SetIndex(t++), n.SetOnlineNumber(a++));
		this.Ali.sort((e, t) => e.GetIndex() - t.GetIndex());
	}
	SetMatchTeamInfoPlayerRole(e, t) {
		for (const r of this.Rli.ZEs) {
			var a, n;
			r.aFn === e &&
				((a = r.j5n.length),
				(n = t.length),
				(r.j5n = t),
				a === n && this.Oli(r),
				a < n && (this.kli(e), this.AddPrewarFormationDataByPlayerInfo(r, !1)),
				n < a) &&
				this.Fli(r);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PrewarFormationChanged,
		);
	}
	GetPrewarFormationDataList() {
		return this.Ali;
	}
	RemovePrewarFormationDataByPlayer(e) {
		let t = !1;
		for (let a = this.Ali.length - 1; 0 <= a; --a)
			this.Ali[a].GetPlayerId() === e &&
				((t = !0),
				this.Ali.splice(a, 1),
				this.RemovePrewarPlayerReadyState(e),
				this.RemoveMatchingTeamConfirmState(e));
		for (let n = this.Rli.ZEs.length - 1; 0 <= n; --n) {
			var a = this.Rli.ZEs[n];
			a && a.aFn === e && ((t = !0), this.Rli.ZEs.splice(n, 1));
		}
		return this.Nli(), t;
	}
	Oli(e) {
		var t = this.Ali.length;
		let a = 0;
		for (let i = 0; i < t; i++) {
			var n,
				r = this.Ali[i];
			e.aFn === r.GetPlayerId() &&
				((n = e.j5n[a++]), r.SetConfigId(n.l3n), r.SetLevel(n.XAs));
		}
	}
	Fli(e) {
		var t = e.aFn,
			a = e.j5n;
		for (let e = this.Ali.length - 1; 0 <= e; --e) {
			var n = this.Ali[e];
			if (n.GetPlayerId() === t) {
				let t = !1;
				for (const e of a)
					if (e.l3n === n.GetConfigId()) {
						t = !0;
						break;
					}
				t || this.Ali.splice(e, 1);
			}
		}
		this.Nli();
	}
	kli(e) {
		for (let t = this.Ali.length - 1; 0 <= t; --t)
			this.Ali[t].GetPlayerId() === e && this.Ali.splice(t, 1);
	}
	IsInPrewarFormation(e) {
		for (const t of this.Ali) if (t.GetPlayerId() === e) return !0;
		return !1;
	}
	ClearPrewarData() {
		this.Ali.length = 0;
	}
	MatchingPlayerCount() {
		return this.Uli.size;
	}
	get FormationAverageRoleLevel() {
		let e = 0;
		var t = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
		if (!t) return 0;
		let a = 0;
		for (const n of t) n.GetRoleData && ((e += n.GetRoleData?.Level ?? 0), a++);
		return a ? (e /= a) : 0;
	}
	CheckPrewarFormationAverageLowLevel(e) {
		if (
			(t =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e,
				).FightFormationId) &&
			0 <
				(t =
					ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
						t,
					)).AutoRole.length &&
			0 < t.TrialRole.length
		)
			return !1;
		var t = this.FormationAverageRoleLevel,
			[a, n] =
				ModelManager_1.ModelManager.ActivityModel.CheckActivityLevelBelongToType(
					e,
				);
		return a
			? t <
					ModelManager_1.ModelManager.ActivityModel.GetActivityLevelRecommendLevel(
						e,
						ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
						n,
					)
			: t <
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
						e,
						ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
					);
	}
	GetInstanceBeInviteDataList() {
		return this.xli;
	}
	AddInstanceBeInviteData(e) {
		e &&
			(this.xli
				? this.RemoveInstanceBeInviteData(e.GetPlayerId())
				: (this.xli = new Array()),
			this.xli.push(e));
	}
	RemoveInstanceBeInviteData(e) {
		for (let t = 0; t < this.xli.length; t++)
			if (this.xli[t].GetPlayerId() === e) return this.xli.splice(t, 1), !0;
		return !1;
	}
	GetInvitePlayerCd(e) {
		return (e = this.wli.get(e)) || 0;
	}
	SetInvitePlayerCd(e, t) {
		this.wli.set(e, t);
	}
	CreateInstanceInfo(e) {
		return (
			(this.Bli = new InstanceDungeonInfo_1.InstanceDungeonInfo(e)),
			this.Bli.InitConfig(),
			this.Bli
		);
	}
	ClearInstanceDungeonInfo() {
		var e;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 28, "尝试清除副本行为树"),
			this.Bli
				? ((e = this.Bli), (this.Bli = void 0), e.Destroy())
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("InstanceDungeon", 5, "销毁副本树时，副本树不存在");
	}
	GetInstanceDungeonInfo() {
		return this.Bli;
	}
	ResetData() {
		this.ClearPrewarData(),
			this.ClearPrewarPlayerReadyState(),
			this.ClearMatchingTeamConfirmState(),
			(this.Rli = void 0);
	}
	get LastEnterRoleList() {
		return this.bli;
	}
	set LastEnterRoleList(e) {
		this.bli = e;
	}
	SetInstanceDungeonName(e) {
		this.qli = e;
	}
	GetInstanceDungeonName() {
		return this.qli;
	}
	ConstructCurrentDungeonAreaName() {
		(this.qli = void 0),
			ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
				this.SetInstanceDungeonName(
					ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName(),
				);
	}
}
exports.InstanceDungeonModel = InstanceDungeonModel;

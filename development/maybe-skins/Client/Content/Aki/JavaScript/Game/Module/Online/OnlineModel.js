"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineModel =
		exports.onlineDisabledSourceTipsId =
		exports.onlineContinuingChallengeIcon =
			void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	OnlineHallData_1 = require("./OnlineHallData");
(exports.onlineContinuingChallengeIcon = {
	0: "ContinuingChallengeAccept",
	1: "ContinuingChallengeRefuse",
	2: "ContinuingChallengePending",
}),
	(exports.onlineDisabledSourceTipsId = {
		0: "OnlineDisabledByNonOnlineQuest",
		1: "OnlineDisabledByNonOnlinePlay",
		2: "OnlineDisabledByTrialRole",
	});
class OnlineModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Zqi = void 0),
			(this.eGi = void 0),
			(this.tGi = void 0),
			(this.WorldTeamPlayerFightInfo = []),
			(this.iGi = Protocol_1.Aki.Protocol.J3s.Proto_ConfirmJoin),
			(this.oGi = void 0),
			(this.rGi = 0),
			(this.nGi = 0),
			(this.sGi = 0),
			(this.aGi = 0),
			(this.hGi = void 0),
			(this.lGi = 3),
			(this._Gi = !1),
			(this.uGi = !1),
			(this.cGi = void 0),
			(this.mGi = new Map()),
			(this.dGi = -1),
			(this.CGi = -1),
			(this.gGi = !0),
			(this.fGi = new Map()),
			(this.CachePlayerData = void 0);
	}
	OnInit() {
		return (
			(this.Zqi = new Array()),
			(this.eGi = new Array()),
			(this.tGi = new Array()),
			(this.oGi = new Map()),
			(this.hGi = new Map()),
			(this.rGi = -1),
			(this.aGi = -1),
			(this.nGi =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"apply_valid_time",
				)),
			(this.sGi = CommonParamById_1.configCommonParamById.GetIntConfig(
				"world_level_enter_diff",
			)),
			(this.cGi = new Map()),
			!0
		);
	}
	OnClear() {
		return (
			this.Zqi && (this.Zqi.length = 0),
			(this.Zqi = void 0),
			this.eGi && (this.eGi.length = 0),
			(this.eGi = void 0),
			this.tGi && (this.tGi.length = 0),
			(this.tGi = void 0),
			this.oGi && this.oGi.clear(),
			(this.oGi = void 0),
			this.hGi && this.hGi.clear(),
			(this.hGi = void 0),
			(this.rGi = void 0),
			(this.nGi = void 0),
			(this.sGi = void 0),
			this.cGi?.clear(),
			(this.cGi = void 0),
			this.mGi && this.mGi.clear(),
			this.fGi && this.fGi.clear(),
			(this.dGi = -1),
			(this.CGi = -1),
			(this.gGi = !0)
		);
	}
	OnLeaveLevel() {
		return (
			this.mGi && this.mGi.clear(),
			(this.dGi = -1),
			(this.CGi = -1),
			(this.gGi = !0)
		);
	}
	ClearOnlineTeamMap() {
		this.hGi && this.hGi.clear();
	}
	get StrangerWorld() {
		return this.Zqi;
	}
	get FriendWorld() {
		return this.eGi;
	}
	get SearchResult() {
		return this.tGi;
	}
	get CurrentPermissionsSetting() {
		return this.iGi;
	}
	get CurrentApply() {
		return this.oGi.get(this.rGi);
	}
	get CurrentApplyList() {
		return this.oGi;
	}
	get ApplyCd() {
		return this.nGi;
	}
	get EnterDiff() {
		return this.sGi;
	}
	get OwnerId() {
		return this.aGi;
	}
	get TeamMaxSize() {
		return this.lGi;
	}
	get ShowCanJoin() {
		return this.uGi;
	}
	get ShowFriend() {
		return this._Gi;
	}
	get ChallengeApplyPlayerId() {
		return this.dGi;
	}
	get NextInitiateTime() {
		return this.CGi;
	}
	get NextInitiateLeftTime() {
		return this.CGi - TimeUtil_1.TimeUtil.GetServerTime();
	}
	get AllowInitiate() {
		return this.gGi;
	}
	SetHallShowCanJoin(e) {
		this.uGi = e;
	}
	SetHallShowFriend(e) {
		this._Gi = e;
	}
	SetTeamOwnerId(e) {
		this.aGi = e;
	}
	SetPermissionsSetting(e) {
		this.iGi = e;
	}
	CleanSearchResultList() {
		this.tGi.length = 0;
	}
	CleanFriendWorldList() {
		this.eGi.length = 0;
	}
	CleanStrangerWorldList() {
		this.Zqi.length = 0;
	}
	CleanCurrentApply() {
		this.oGi.delete(this.rGi), (this.rGi = -1);
	}
	PushSearchResultList(e) {
		this.tGi.push(e);
	}
	PushFriendWorldList(e) {
		this.eGi.push(e);
	}
	PushStrangerWorldList(e) {
		this.Zqi.push(e);
	}
	PushCurrentApplyList(e) {
		this.oGi.set(e.PlayerId, e), -1 === this.rGi && (this.rGi = e.PlayerId);
	}
	PushCurrentTeamList(e) {
		this.hGi.set(e.PlayerId, e);
	}
	DeleteCurrentApplyListById(e) {
		if ((this.oGi.delete(e), this.oGi.size < 1)) this.rGi = -1;
		else {
			let e = this.nGi;
			for (const [i, t] of this.oGi)
				t.ApplyTimeLeftTime <= e && ((e = t.ApplyTimeLeftTime), (this.rGi = i));
		}
	}
	DeleteCurrentTeamListById(e) {
		this.hGi.delete(e);
	}
	ResetTeamDataPlayer(e) {
		for (const t of this.hGi) {
			var i = t[1];
			i.PlayerNumber > e && i.PlayerNumber--;
		}
	}
	GetCurrentApplyListById(e) {
		return this.oGi.get(e);
	}
	GetCurrentTeamListById(e) {
		return this.hGi.get(e);
	}
	GetCurrentApplyList() {
		var e,
			i,
			t = new Array();
		for ([e, i] of this.oGi) 0 < e && t.push(i);
		return t.sort((e, i) => e.ApplyTimeLeftTime - i.ApplyTimeLeftTime);
	}
	GetCurrentApplySize() {
		return this.oGi.size;
	}
	GetCurrentTeamSize() {
		return this.hGi.size;
	}
	GetIsTeamModel() {
		return -1 !== this.aGi;
	}
	GetIsMyTeam() {
		return (
			ModelManager_1.ModelManager.OnlineModel.OwnerId ===
			ModelManager_1.ModelManager.PlayerInfoModel.GetId()
		);
	}
	GetExistOnlineTeam() {
		return -1 !== ModelManager_1.ModelManager.OnlineModel.OwnerId;
	}
	GetCanJoinFormStranger() {
		var e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
			i = new Array();
		for (const t of this.Zqi) t.WorldLevel <= e + this.EnterDiff && i.push(t);
		return i;
	}
	GetCanJoinFormFriend() {
		var e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
			i = new Array();
		for (const t of this.eGi)
			this.CanJoinOtherWorld(e, t.WorldLevel) && i.push(t);
		return i;
	}
	CanJoinOtherWorld(e, i) {
		return e + this.EnterDiff >= i;
	}
	GetTeamList() {
		var e = new Array();
		for (const i of this.hGi) e.push(i[1]);
		return e.sort((e, i) => e.PlayerNumber - i.PlayerNumber);
	}
	DisableOnline(e, i, t = 0) {
		i ? this.cGi?.set(t, e) : this.cGi?.delete(t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnlineDisableStateChange,
			);
	}
	IsOnlineDisabled() {
		return !!this.cGi && 0 < this.cGi.size;
	}
	GetOnlineDisabledSource() {
		return this.cGi;
	}
	ClearWorldTeamPlayerFightInfo() {
		this.WorldTeamPlayerFightInfo.length = 0;
	}
	DeleteWorldTeamPlayerFightInfo(e) {
		for (const i of this.WorldTeamPlayerFightInfo)
			i.PlayerId === e &&
				this.WorldTeamPlayerFightInfo.splice(
					this.WorldTeamPlayerFightInfo.indexOf(i),
					1,
				);
	}
	PushWorldTeamPlayerFightInfo(e) {
		this.WorldTeamPlayerFightInfo.push(e);
	}
	GetWorldTeamPlayerFightInfo(e) {
		for (const i of this.WorldTeamPlayerFightInfo)
			if (i.PlayerId === e) return i;
	}
	GetAllWorldTeamPlayer() {
		var e = new Array();
		for (const i of this.WorldTeamPlayerFightInfo) e.push(i.PlayerId);
		return e;
	}
	RefreshWorldTeamRoleInfo(e) {
		for (const r of e) {
			var i = this.GetWorldTeamPlayerFightInfo(r.aFn);
			if (i)
				for (const e of r.J4n)
					if (-1 === e.$4n) {
						var t = new Array();
						for (const i of e.FLs)
							t.push(new OnlineHallData_1.WorldTeamRoleInfo(i.l3n, i.r3n));
						i.RoleInfos = t;
					}
		}
		this.WorldTeamPlayerResetIndex();
	}
	WorldTeamPlayerResetIndex() {
		let e = 0;
		for (const i of this.WorldTeamPlayerFightInfo)
			for (const t of i.RoleInfos) t.RoleIndex = e++;
	}
	ResetContinuingChallengeConfirmState() {
		this.mGi.clear();
		for (const i of ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers()) {
			var e = i.GetPlayerId();
			this.mGi.set(e, 2);
		}
	}
	SetContinuingChallengeConfirmState(e, i) {
		this.mGi.set(e, i);
	}
	GetContinuingChallengeConfirmState(e) {
		return this.mGi.get(e);
	}
	SetChallengeApplyPlayerId(e) {
		this.dGi = e;
	}
	RefreshInitiateTime() {
		this.CGi = TimeUtil_1.TimeUtil.GetServerTime() + this.ApplyCd;
	}
	SetAllowInitiate(e) {
		this.gGi = e;
	}
	SetPlayerTeleportState(e, i) {
		this.fGi.set(e, i);
	}
	GetPlayerTeleportState(e) {
		return this.fGi.get(e);
	}
	DeletePlayerTeleportState(e) {
		this.fGi.delete(e);
	}
	ClearPlayerTeleportState() {
		this.fGi.clear();
	}
	SetRoleActivated(e, i) {
		(e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
			ParamType: 2,
			IsControl: !0,
		}).EntityHandle),
			e?.Valid &&
				e?.Entity &&
				ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
					e.Entity,
					i,
					"[OnlineModel.SetRoleActivated] 传送中隐藏",
				);
	}
}
exports.OnlineModel = OnlineModel;

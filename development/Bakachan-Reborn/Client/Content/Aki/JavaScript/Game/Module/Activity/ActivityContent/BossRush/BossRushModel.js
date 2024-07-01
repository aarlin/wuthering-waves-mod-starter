"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushModel =
		exports.BossRushTeamInfo =
		exports.BossRushBuffInfo =
		exports.BossRushRoleInfo =
			void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager");
class BossRushRoleInfo {
	constructor() {
		(this.RoleId = 0), (this.Slot = 0);
	}
}
exports.BossRushRoleInfo = BossRushRoleInfo;
class BossRushBuffInfo {
	constructor() {
		(this.BuffId = 0),
			(this.Slot = 0),
			(this.ChangeAble = !0),
			(this.State = Protocol_1.Aki.Protocol.ABs.Proto_Empty);
	}
}
exports.BossRushBuffInfo = BossRushBuffInfo;
class BossRushTeamInfo {
	constructor() {
		(this.ActivityId = 0),
			(this.hPr = void 0),
			(this.zAr = []),
			(this.lPr = []),
			(this._Pr = []),
			(this.uPr = []),
			(this.LevelInfo = void 0);
	}
	GetCurrentSelectLevel() {
		return this.hPr;
	}
	GetCurrentSelectBuff() {
		return this.zAr;
	}
	GetPrepareSelectBuff() {
		return this._Pr;
	}
	GetCurrentTeamMembers() {
		return this.uPr;
	}
	SetCurrentSelectLevel(e) {
		this.hPr = e;
	}
	InitLevelBuff(e, t, s) {
		this.zAr = [];
		for (const t of e) {
			const e = new BossRushBuffInfo();
			(e.BuffId = t.BuffId),
				(e.Slot = t.Slot),
				(e.ChangeAble = t.ChangeAble),
				(e.State = t.State),
				this.zAr.push(e);
		}
		for (const t of e) 0 < t.BuffId && this.lPr.push(t);
		for (const e of t) 0 < e.BuffId && this.lPr.push(e);
		for (const e of s) 0 < e.BuffId && this.lPr.push(e);
	}
	GetIndexBuff(e) {
		if (!(e >= this.zAr.length)) return this.zAr[e];
	}
	GetOptionBuff() {
		var e = [];
		for (const t of this.lPr)
			((0 < t.BuffId && t.State === Protocol_1.Aki.Protocol.ABs.KPs) ||
				t.Slot < 0) &&
				-1 === e.findIndex((e) => e.BuffId === t.BuffId) &&
				e.push(t);
		return e;
	}
	InitPrepareSelectBuff() {
		this._Pr = [];
		for (const e of this.zAr) this._Pr.push(e);
	}
	SetIndexPrepareSelectBuff(e, t) {
		this._Pr[e] = t;
	}
	GetIndexPrepareSelectBuff(e) {
		return this._Pr[e];
	}
	SetPrepareSelectBuff(e) {
		this._Pr = [];
		for (const t of e) this._Pr.push(t);
	}
	GetBuffMaxCount() {
		return this.zAr.length;
	}
	SetIndexTeamMembers(e, t) {
		this.uPr.length <= e ? this.uPr.push(t) : (this.uPr[e] = t);
	}
	ReSortTeamMembers() {
		var e = [];
		for (const t of this.uPr) 0 < t && e.push(t);
		for (let t = e.length; t < this.uPr.length; t++) e.push(0);
		this.uPr = e;
	}
	SetCurrentTeamMembers(e) {
		this.uPr = e;
	}
	GetRecommendLevel() {
		return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
			this.LevelInfo.GetConfig().InstId,
			ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
		);
	}
	GetIfLevelTooLow() {
		let e = 0,
			t = 0;
		for (const r of this.uPr) {
			var s;
			(s =
				((s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(r)) &&
					((e += s.GetLevelData().GetLevel()), t++),
				ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r))) &&
				((e += s.GetLevelData().GetLevel()), t++);
		}
		return e / t < this.GetRecommendLevel() || 0 === t;
	}
	Clear() {
		(this.zAr = []), (this.uPr = []);
	}
}
exports.BossRushTeamInfo = BossRushTeamInfo;
class BossRushModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.CurrentSelectLevelDetailData = void 0),
			(this.CurrentTeamInfo = void 0),
			(this.CurrentChangeBuffSlot = 0),
			(this.PlayBackAnimation = !1),
			(this.CurrentOpenBossRushActivityIds = []),
			(this.CurrentSelectActivityId = 0),
			(this.mPr = new Map()),
			(this.dPr = new Map());
	}
	GetFullScore(e) {
		let t = 0;
		for (const s of ModelManager_1.ModelManager.ActivityModel.GetActivityById(
			e,
		).GetBossRushLevelDetailInfo())
			t += s.GetScore();
		return t;
	}
	GetBossRushTeamInfoByActivityId(e) {
		let t = this.mPr.get(e);
		return t || ((t = new BossRushTeamInfo()), this.mPr.set(e, t)), t;
	}
	GetHaveUnTakeRewardIds(e) {
		var t = this.GetFullScore(e),
			s = [];
		for (const o of []) {
			var r;
			0 <= t && (r = this.dPr.get(e)) && !r.includes(o) && s.push(o);
		}
		return s;
	}
	GetLevelSelectRoleIds(e) {
		return e.GetCurrentTeamMembers();
	}
}
exports.BossRushModel = BossRushModel;

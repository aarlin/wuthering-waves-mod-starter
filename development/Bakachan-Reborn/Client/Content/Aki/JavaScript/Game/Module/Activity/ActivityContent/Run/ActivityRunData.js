"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRunData = exports.ActivityRun = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityData_1 = require("../../ActivityData"),
	ACTIVITYSELECTCACHEKEY = -256;
class ActivityRun extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments), (this.y2e = new Map()), (this.I2e = new Array());
	}
	PhraseEx(e) {
		(this.I2e = new Array()),
			e.d0s.WCs.forEach((t) => {
				var i =
					ModelManager_1.ModelManager.ActivityRunModel.CreateActivityRunData(
						e.Ekn,
						t._3n,
					);
				i.Phrase(t), this.I2e.push(i), this.y2e.set(t._3n, e.Ekn);
			});
	}
	GetChallengeActivityId(e) {
		return this.y2e.get(e);
	}
	GetChallengeDataArray() {
		return this.I2e;
	}
	SetActivityContentIndex(e) {
		ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
			this.Id,
			-256,
			this.Id,
			0,
			e,
		);
	}
	GetActivityContentIndex() {
		return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
			this.Id,
			0,
			-256,
			this.Id,
			0,
		);
	}
	GetExDataRedPointShowState() {
		var e = this.I2e.length;
		for (let t = 0; t < e; t++) if (this.I2e[t].GetRedPoint()) return !0;
		return !1;
	}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	IfAllFinish() {
		var e = this.I2e.length;
		for (let t = 0; t < e; t++)
			if (!this.I2e[t].GetIfRewardAllFinished()) return !1;
		return !0;
	}
}
exports.ActivityRun = ActivityRun;
class ActivityRunData extends ActivityData_1.ActivityExData {
	constructor() {
		super(...arguments),
			(this.T2e = 0),
			(this.L2e = new Array()),
			(this.xte = 0),
			(this.pne = 0),
			(this.D2e = 0),
			(this.Cce = -0),
			(this.R2e = !1),
			(this.U2e = -0),
			(this.A2e = -0),
			(this.P2e = void 0);
	}
	get Id() {
		return this.T2e;
	}
	GetMaxScore() {
		return this.xte;
	}
	GetMiniTime() {
		return this.pne;
	}
	GetRedPoint() {
		return !(
			!this.GetIsShow() ||
			(!this.GetChallengeNewLocalRedPoint() && !this.x2e())
		);
	}
	GetScoreArray() {
		const e = new Array();
		return (
			this.P2e.forEach((t) => {
				e.push(t[0]);
			}),
			e
		);
	}
	GetScoreIndexScore(e) {
		return (e = this.P2e.get(e)) ? e[0] : 0;
	}
	GetScoreIndexPreviewItem(e) {
		var t = Array.from(this.P2e.keys()),
			i = t.length;
		let n = 0;
		for (let r = 0; r < i; r++)
			if (t[r] === e) {
				n = this.P2e.get(t[r])[1];
				break;
			}
		var r,
			s,
			a = [];
		if (0 < n)
			for ([r, s] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
				n,
			).DropPreview) {
				var h = [{ IncId: 0, ItemId: r }, s];
				a.push(h);
			}
		return a;
	}
	GetScoreIndex(e) {
		var t = Array.from(this.P2e.keys()).length;
		for (let i = 0; i < t; i++) if (e === this.P2e.get(i)?.[0]) return i;
		return 0;
	}
	GetScoreIndexCannotGetReward(e) {
		var t = Array.from(this.P2e.keys());
		let i = 0;
		return (
			this.P2e.get(e) && (i = this.P2e.get(e)[0]),
			this.xte >= i ? (this.L2e.includes(t[e]) ? 2 : 1) : 0
		);
	}
	x2e() {
		var e = Array.from(this.P2e.keys()).length;
		for (let t = 0; t < e; t++)
			if (1 === this.GetScoreIndexCannotGetReward(t)) return !0;
		return !1;
	}
	GetIfRewardAllFinished() {
		var e = Array.from(this.P2e.keys()).length;
		for (let t = 0; t < e; t++)
			if (2 !== this.GetScoreIndexCannotGetReward(t)) return !1;
		return !0;
	}
	GetTitle() {
		return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunTitle(
			this.T2e,
		);
	}
	GetMarkId() {
		return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunMarkId(
			this.T2e,
		);
	}
	GetBackgroundTexturePath() {
		return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunTexture(
			this.T2e,
		);
	}
	SetChallengeLocalRedPointState(e) {
		ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
			this.ActivityId,
			this.T2e,
			0,
			0,
			e ? 1 : 0,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshRunActivityRedDot,
				this.T2e,
			),
			this.RefreshActivityRedPoint();
	}
	GetChallengeNewLocalRedPoint() {
		return (
			1 ===
			ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
				this.ActivityId,
				1,
				this.T2e,
				0,
				0,
			)
		);
	}
	GetIsShow() {
		return !(!this.R2e || !this.CheckIfInShowTime());
	}
	SetIsOpen(e) {
		this.R2e = e;
	}
	get BeginOpenTime() {
		return this.U2e;
	}
	get EndOpenTime() {
		return this.A2e;
	}
	OnGetScoreReward(e) {
		this.L2e.includes(e) ||
			(this.L2e.push(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshRunActivityRedDot,
				this.T2e,
			),
			this.RefreshActivityRedPoint());
	}
	CheckIfInShowTime() {
		var e;
		return (
			(0 === this.BeginOpenTime && 0 === this.EndOpenTime) ||
			((e = TimeUtil_1.TimeUtil.GetServerTime()) >= this.BeginOpenTime &&
				e <= this.EndOpenTime)
		);
	}
	OnChallengeEnd(e) {
		(this.D2e = e.J0s),
			(this.Cce = e.Skn),
			this.D2e > this.xte && (this.xte = this.D2e),
			(this.Cce < this.pne || 0 === this.pne) && (this.pne = this.Cce),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshRunActivityRedDot,
				this.T2e,
			),
			this.RefreshActivityRedPoint();
	}
	Phrase(e) {
		e instanceof Protocol_1.Aki.Protocol.KNs
			? ((this.T2e = e._3n),
				(this.L2e = []),
				e.PPs.forEach((e) => {
					this.L2e.push(e);
				}),
				(this.xte = e.DPs),
				(this.pne = e.APs))
			: e instanceof Protocol_1.Aki.Protocol.fBs &&
				((this.T2e = e._3n),
				(this.U2e = Number(MathUtils_1.MathUtils.LongToBigInt(e.HCs))),
				(this.A2e = Number(MathUtils_1.MathUtils.LongToBigInt(e.jCs)))),
			this.P2e ||
				(this.P2e =
					ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunScoreMap(
						this.T2e,
					)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshRunActivityRedDot,
				this.T2e,
			),
			this.RefreshActivityRedPoint();
	}
}
exports.ActivityRunData = ActivityRunData;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerModel =
		exports.LOCK_COLOR =
		exports.NORMOL_COLOR =
		exports.FINISH_COLOR =
		exports.FLOOR_STAR =
			void 0);
const CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController"),
	TowerData_1 = require("./TowerData");
(exports.FLOOR_STAR = 3),
	(exports.FINISH_COLOR = "#FFD12F"),
	(exports.NORMOL_COLOR = "#ECE5D8"),
	(exports.LOCK_COLOR = "#ADADAD");
class TowerModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.TowerBeginTime = void 0),
			(this.TowerEndTime = void 0),
			(this.CurrentSeason = -1),
			(this.DataSeason = 0),
			(this.CurrentSelectDifficulties = -1),
			(this.CurrentTowerId = -1),
			(this.CurrentTowerFormation = void 0),
			(this.NeedChangeFormation = !1),
			(this.CurrentNotConfirmedFloor = void 0),
			(this.NeedOpenConfirmViewTowerId = -1),
			(this.NeedOpenConfirmView = !1),
			(this.CurrentSelectFloor = -1),
			(this.RoleDifficultyFormationMap = new Map()),
			(this.RecommendFormation = void 0),
			(this.CurrentTowerLock = !1),
			(this.DefaultFloor = -1),
			(this.KTo = 0),
			(this.TowerGuideDelayTime = 0),
			(this.TowerSettlementDelayTime = 0),
			(this.QTo = new Map()),
			(this.XTo = void 0),
			(this.$To = -1),
			(this.YTo = new Map()),
			(this.JTo = new Map()),
			(this.zTo = void 0),
			(this.NeedOpenReviveView = !1);
	}
	OnInit() {
		return (
			(this.KTo =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"TowerRoleTotalCost",
				)),
			(this.TowerGuideDelayTime =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"TowerGuideDelayTime",
				)),
			(this.TowerSettlementDelayTime =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"TowerSettleDelayTime",
				)),
			this.Nqt(),
			!0
		);
	}
	OnLeaveLevel() {
		return (this.CurrentSelectFloor = -1), (this.CurrentTowerId = -1), !0;
	}
	Nqt() {
		this.ZTo(TowerData_1.LOW_RISK_DIFFICULTY, void 0),
			this.ZTo(TowerData_1.HIGH_RISK_DIFFICULTY, void 0),
			this.ZTo(TowerData_1.VARIATION_RISK_DIFFICULTY, void 0);
	}
	RefreshTowerInfo(e) {
		(this.TowerBeginTime = e.HCs),
			(this.TowerEndTime = e.jCs),
			(this.CurrentSeason = e.Yxs),
			(this.DataSeason = e.Jxs),
			this.RefreshTowerInfoByDifficulty(e.zxs);
	}
	RefreshTowerInfoByFloor(e) {
		for (const t of e) this.eLo(t);
	}
	RefreshTowerInfoByDifficulty(e) {
		for (const t of e)
			this.ZTo(t.yVn, t.b5n), this.tLo(t.Zxs), this.JTo.set(t.yVn, t.ebs);
	}
	DeleteVariationTowerInfo() {
		for (var [e, t] of this.QTo)
			t.Difficulties === TowerData_1.VARIATION_RISK_DIFFICULTY &&
				this.QTo.delete(e);
		for (var [, o] of (this.ZTo(TowerData_1.VARIATION_RISK_DIFFICULTY, void 0),
		this.JTo.set(TowerData_1.VARIATION_RISK_DIFFICULTY, 0),
		this.RoleDifficultyFormationMap))
			o.set(TowerData_1.VARIATION_RISK_DIFFICULTY, 0);
	}
	GetFloorStars(e) {
		return this.QTo.get(e)?.Star;
	}
	GetFloorStarsIndex(e) {
		return this.QTo.get(e)?.StarIndex;
	}
	GetAreaStars(e, t, o = !1) {
		let r = 0;
		if (o)
			for (var [, i] of this.XTo)
				i.Difficulties === e && i.Area === t && (r += i.Star);
		else
			for (var [, n] of this.QTo)
				n.Difficulties === e && n.Area === t && (r += n.Star);
		return r;
	}
	GetDifficultyMaxStars(e, t = !1) {
		let o;
		return (o = t ? this.zTo?.get(e) : this.JTo.get(e)) ?? 0;
	}
	GetDifficultyStars(e) {
		let t = 0;
		for (var [, o] of this.QTo) o.Difficulties === e && (t += o.Star);
		return t;
	}
	GetAreaAllStars(e, t) {
		return (
			exports.FLOOR_STAR *
			ConfigManager_1.ConfigManager.TowerClimbConfig.GetAreaFloorNumber(
				this.CurrentSeason,
				e,
				t,
			)
		);
	}
	GetDifficultyAllStars(e, t = !1) {
		return (
			exports.FLOOR_STAR *
			ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyFloorNumber(
				t ? this.$To : this.CurrentSeason,
				e,
			)
		);
	}
	GetDifficultyReward(e) {
		if ((e = this.YTo.get(e))) return e;
	}
	GetHaveChallengeFloor(e) {
		return !!this.QTo.get(e);
	}
	GetHaveChallengeFloorAndFormation(e) {
		return !(
			!(e = this.QTo.get(e)) ||
			!e.Formation ||
			0 === e.Formation.length
		);
	}
	GetFloorData(e) {
		return this.QTo.get(e);
	}
	ZTo(e, t) {
		var o = this.GetDifficultyReward(e);
		if (o) for (const e of o) e.IsReceived = t?.includes(e.Index);
		else {
			var r =
					ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyReward(e),
				i = r.length,
				n = [];
			for (let e = 0; e < i; e++) {
				var a = r[e];
				((a = new TowerData_1.TowerReward(a.Item1, a.Item2, e)).IsReceived =
					t?.includes(e)),
					n.push(a);
			}
			this.YTo.set(e, n);
		}
	}
	tLo(e) {
		for (const t of e) for (const e of t.ibs) this.eLo(e);
	}
	eLo(e) {
		let t = this.QTo.get(e.EVn);
		if (t) {
			(t.Star = e.UDs), (t.StarIndex = e.rbs);
			for (const e of t.Formation)
				this.ReduceRoleFormationCost(e.l3n, t.Difficulties, t.Cost);
			t.Formation = e.SVn;
		} else
			(t = new TowerData_1.TowerFloorInfo(e.EVn, e.UDs, e.SVn, e.rbs)),
				this.QTo.set(e.EVn, t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnTowerRecordUpdate,
					e.EVn,
					t.Difficulties,
				);
		for (const e of t.Formation) this.iLo(e.l3n, t.Difficulties, t.Cost);
	}
	iLo(e, t, o) {
		let r = this.RoleDifficultyFormationMap.get(e);
		var i;
		r
			? (i = r.get(t))
				? ((i += o), r.set(t, i))
				: r.set(t, o)
			: (r = new Map()).set(t, o),
			this.RoleDifficultyFormationMap.set(e, r);
	}
	ReduceRoleFormationCost(e, t, o) {
		var r;
		(e = this.RoleDifficultyFormationMap.get(e)) &&
			(r = e.get(t)) &&
			e.set(t, (r -= o));
	}
	GetDifficultyProgress(e) {
		e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllFloor(
			this.CurrentSeason,
			e,
		);
		let t = 0;
		for (const o of e) void 0 !== this.QTo.get(o) && t++;
		return [t, e.length];
	}
	GetDifficultyIsClear(e) {
		for (const t of ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllFloor(
			this.CurrentSeason,
			e,
		))
			if (!this.QTo.get(t)) return !1;
		return !0;
	}
	GetMaxDifficulty() {
		return this.GetDifficultyIsClear(TowerData_1.LOW_RISK_DIFFICULTY)
			? this.GetDifficultyIsClear(TowerData_1.HIGH_RISK_DIFFICULTY)
				? TowerData_1.VARIATION_RISK_DIFFICULTY
				: TowerData_1.HIGH_RISK_DIFFICULTY
			: TowerData_1.LOW_RISK_DIFFICULTY;
	}
	GetDifficultyAllAreaFirstFloor(e, t = !1) {
		return ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllAreaFirstFloor(
			t ? this.$To : this.CurrentSeason,
			e,
		);
	}
	GetDifficultyAreaAllFloor(e, t) {
		return ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAreaAllFloor(
			this.CurrentSeason,
			e,
			t,
		);
	}
	GetFloorIsUnlock(e) {
		return (
			!!this.GetHaveChallengeFloor(e) ||
			!(e =
				ConfigManager_1.ConfigManager.TowerClimbConfig.GetLastFloorInArea(e)) ||
			this.GetHaveChallengeFloor(e)
		);
	}
	GetRoleRemainCost(e, t) {
		return (e = (e = this.RoleDifficultyFormationMap.get(e)) && e.get(t))
			? this.KTo - e
			: this.KTo;
	}
	GetFloorIncludeRole(e, t) {
		if ((t = this.QTo.get(t)))
			for (const o of t.Formation) if (o.l3n === e) return !0;
		return !1;
	}
	OpenTowerFormationView(e) {
		(this.CurrentSelectFloor = e),
			(e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e)),
			EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
				e.InstanceId,
			);
	}
	IsOpenFloorFormation() {
		return -1 !== this.CurrentSelectFloor;
	}
	GetCurrentFloorName() {
		var e =
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"TowerAreaFloor",
				),
			t =
				((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
				ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
					this.CurrentTowerId,
				)),
			o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.AreaName);
		return e.replace("{0}", o).replace("{1}", "" + t.Floor);
	}
	GetFloorFormation(e) {
		var t = [];
		if ((e = this.QTo.get(e)) && e.Formation)
			for (const o of e.Formation) t.push(o.l3n);
		return t;
	}
	SaveNeedOpenConfirmView() {
		(this.NeedOpenConfirmViewTowerId = this.CurrentTowerId),
			(this.NeedOpenConfirmView = !0);
	}
	ClearNotConfirmedData() {
		(this.NeedOpenConfirmViewTowerId = -1),
			(this.NeedOpenConfirmView = !1),
			(this.CurrentNotConfirmedFloor = void 0);
	}
	OpenReviewView() {
		this.NeedOpenReviveView &&
			((this.NeedOpenReviveView = !1),
			0 <
				this.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY, !0) &&
				UiManager_1.UiManager.OpenView("TowerReviewView"),
			(this.DataSeason = this.CurrentSeason));
	}
	SaveHandleData() {
		(this.XTo = new Map(this.QTo)),
			(this.zTo = new Map(this.JTo)),
			(this.$To = this.CurrentSeason);
	}
	ClearHandleData() {
		this.XTo?.clear(),
			(this.XTo = void 0),
			this.zTo?.clear(),
			(this.zTo = void 0),
			(this.$To = -1);
	}
	CheckInTower() {
		return -1 !== this.CurrentTowerId;
	}
	GetSeasonCountDownData() {
		let e =
			MathUtils_1.MathUtils.LongToNumber(this.TowerEndTime) -
			TimeUtil_1.TimeUtil.GetServerTime();
		var t =
				(e = e <= 1 ? 1 : e) >= CommonDefine_1.SECOND_PER_DAY
					? 3
					: e >= CommonDefine_1.SECOND_PER_HOUR
						? 2
						: 1,
			o =
				e >= CommonDefine_1.SECOND_PER_DAY
					? 2
					: e >= CommonDefine_1.SECOND_PER_HOUR
						? 1
						: 0;
		return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t, o);
	}
	CanGetReward() {
		var e = this.GetDifficultyReward(this.CurrentSelectDifficulties);
		if (e) {
			var t = this.GetDifficultyMaxStars(this.CurrentSelectDifficulties);
			for (const o of e) if (t >= o.Target && !o.IsReceived) return !0;
		}
		return !1;
	}
	CanGetRewardByDifficulties(e) {
		var t = this.GetDifficultyReward(e);
		if (t) {
			var o = this.GetDifficultyMaxStars(e);
			for (const e of t) if (o >= e.Target && !e.IsReceived) return !0;
		}
		return !1;
	}
	CanGetRewardAllDifficulties() {
		for (
			let o = TowerData_1.LOW_RISK_DIFFICULTY;
			o <= TowerData_1.VARIATION_RISK_DIFFICULTY;
			o++
		) {
			var e = this.GetDifficultyReward(o),
				t = this.GetDifficultyMaxStars(o);
			if (e) for (const o of e) if (t >= o.Target && !o.IsReceived) return !0;
		}
		return !1;
	}
	IsRoleCostEnough(e) {
		return (
			!!this.GetFloorIncludeRole(e, this.CurrentSelectFloor) ||
			((e = this.GetRoleRemainCost(e, this.CurrentSelectDifficulties)),
			ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
				this.CurrentSelectFloor,
			)?.Cost <= e)
		);
	}
	GetIsInOnceTower() {
		var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
			this.CurrentTowerId,
		);
		return (
			e.Difficulty === TowerData_1.LOW_RISK_DIFFICULTY ||
			e.Difficulty === TowerData_1.HIGH_RISK_DIFFICULTY
		);
	}
	GetDifficultyRewardProgress(e) {
		e = this.GetDifficultyReward(e);
		let t = 0;
		for (const o of e) o.IsReceived && t++;
		return t / e.length;
	}
}
exports.TowerModel = TowerModel;

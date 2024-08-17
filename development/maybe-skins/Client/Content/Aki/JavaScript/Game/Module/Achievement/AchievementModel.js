"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	AchievementData_1 = require("./AchievementData"),
	RECENT_FINISHED_LIST_LENGTH = 5,
	showFunctionList = [1];
class AchievementModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.CurrentSelectCategory = void 0),
			(this.CurrentSelectGroup = void 0),
			(this.CurrentSelectAchievementId = 0),
			(this.AchievementSearchState = !1),
			(this.CurrentSearchText = ""),
			(this.CurrentFinishAchievementArray = new Array()),
			(this.CurrentCacheSearchData = void 0),
			(this.Mbe = new Map()),
			(this.Sbe = new Map()),
			(this.Ebe = new Array()),
			(this.ybe = new Map()),
			(this.Ibe = new Map()),
			(this.Tbe = new Map()),
			(this.Lbe = new Array()),
			(this.Dbe = new Array()),
			(this.Rbe = (e, t) => t.GetFinishTime() - e.GetFinishTime());
	}
	Ube(e) {
		const t = new Array();
		ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupAchievementList(
			e,
		).forEach((e) => {
			(e = this.GetAchievementData(e.Id)), t.push(e);
		}),
			this.Sbe.set(e, t);
	}
	Abe(e) {
		var t =
			ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementCategoryGroups(
				e,
			);
		const n = new Array();
		t.forEach((e) => {
			(e = this.GetAchievementGroupData(e.Id)), n.push(e);
		}),
			this.ybe.set(e, n);
	}
	Pbe() {
		(this.Ebe = new Array()),
			ConfigManager_1.ConfigManager.AchievementConfig.GetAllAchievementCategory().forEach(
				(e) => {
					var t = new AchievementData_1.AchievementCategoryData(e.Id);
					showFunctionList.includes(e.FunctionType) && this.Ebe.push(t);
				},
			);
	}
	xbe(e) {
		this.Lbe.includes(e) || this.Lbe.push(e);
	}
	wbe(e) {
		this.Dbe.includes(e) || this.Dbe.push(e);
	}
	Bbe(e) {
		var t;
		0 <=
			(t =
				(0 <= (t = this.Lbe.indexOf(e)) && this.Lbe.splice(t, 1),
				this.Dbe.indexOf(e))) && this.Dbe.splice(t, 1);
	}
	bbe() {
		this.Lbe.sort(this.Rbe);
	}
	qbe() {
		this.Dbe.sort(this.Rbe);
	}
	Gbe(e) {
		var t,
			n = new AchievementData_1.AchievementData(e);
		n.IfSingleAchievement() ||
			(0 < (t = n.GetNextLink()) && this.GetAchievementData(t).SetLastLink(e)),
			this.Ibe.set(e, n);
	}
	Nbe(e) {
		var t = new AchievementData_1.AchievementGroupData(e);
		this.Tbe.set(e, t);
	}
	PhraseBaseData(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Achievement", 28, "Achievement PhraseBaseData response"),
			(this.Lbe = new Array()),
			(this.Dbe = new Array()),
			this.Ibe.clear(),
			e.Nms.forEach((e) => {
				this.GetAchievementGroupData(e.Oms.Ekn).Phrase(e.Oms),
					e.kms.forEach((e) => {
						var t = this.GetAchievementData(e.Ekn);
						t.Phrase(e),
							1 === t.GetFinishState()
								? this.xbe(t)
								: 2 === t.GetFinishState() && this.wbe(t);
					});
			}),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAchievementDataNotify,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshAchievementRedPoint,
			);
	}
	OnAchievementProgressNotify(e) {
		var t = this.GetAchievementData(e.Ekn),
			n = t.GetFinishState();
		(e = (t.Phrase(e), t.GetFinishState())) !== n &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Achievement",
					28,
					"OnAchievementGroupProgressNotify",
					["id", t.GetId()],
					["currentState", e],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshAchievementRedPoint,
			)),
			this.Bbe(t),
			1 === t.GetFinishState()
				? this.xbe(t)
				: 2 === t.GetFinishState() && this.wbe(t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAchievementDataNotify,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
				t.GetId(),
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAchievementGroupDataNotify,
				t.GetGroupId(),
			);
	}
	OnAchievementGroupProgressNotify(e) {
		var t = this.GetAchievementGroupData(e.Oms.Ekn),
			n = t.GetFinishState();
		(e = (t.Phrase(e.Oms), t.GetFinishState())) !== n &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshAchievementRedPoint,
			),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"Achievement",
				28,
				"OnAchievementGroupProgressNotify",
				["id", t.GetId()],
				["currentState", e],
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAchievementGroupDataNotify,
				t.GetId(),
			);
	}
	GetGroupAchievements(e, t = !0) {
		let n = this.Sbe.get(e);
		if ((n || (this.Ube(e), (n = this.Sbe.get(e))), !t)) return n;
		var i = new Array();
		for (let e = 0; e < n.length; e++)
			n[e].GetShowState()
				? i.push(n[e])
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Achievement",
						28,
						"GetGroupAchievements not Show",
						["id", n[e].GetId()],
						["MaxProgress", n[e].GetMaxProgress()],
					);
		return i;
	}
	GetAchievementCategoryIndex(e) {
		return this.GetAchievementCategoryArray().findIndex(
			(t) => t.GetId() === e.GetId(),
		);
	}
	GetAchievementCategoryGroups(e) {
		let t = this.ybe.get(e);
		t || (this.Abe(e), (t = this.ybe.get(e)));
		const n = new Array();
		return (
			t.forEach((e) => {
				e.GetShowState() && n.push(e);
			}),
			n.sort((e, t) => e.GetSort() - t.GetSort()),
			n
		);
	}
	GetAchievementData(e) {
		if (!this.Ibe.get(e))
			try {
				this.Gbe(e);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack("Achievement", 59, "成就初始化异常", t, [
							"id",
							e,
						])
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Achievement", 59, "成就初始化异常", ["error", t]);
			}
		return this.Ibe.get(e);
	}
	GetAchievementCategoryArray() {
		return 0 === this.Ebe.length && this.Pbe(), this.Ebe;
	}
	GetCategory(e) {
		var t = this.GetAchievementCategoryArray();
		let n;
		for (let i = 0; i < t.length; i++) t[i].GetId() === e && (n = t[i]);
		return n;
	}
	GetAchievementGroupData(e) {
		if (e) return this.Tbe.has(e) || this.Nbe(e), this.Tbe.get(e);
	}
	GetRecentFinishedAchievementList() {
		var e,
			t,
			n = new Array();
		this.bbe();
		for (let t = 0; t < this.Lbe.length && n.length < 5; t++)
			n.includes(this.Lbe[t].GetId()) ||
				(this.Lbe[t].GetShowState() &&
					((e = this.GetAchievementGroupData(this.Lbe[t].GetGroupId())),
					(e =
						ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
							e.GetCategory(),
						)),
					showFunctionList.includes(e)) &&
					n.push(this.Lbe[t].GetId()));
		if (n.length < 5) {
			this.qbe();
			for (let e = 0; e < this.Dbe.length && n.length < 5; e++)
				n.includes(this.Dbe[e].GetId()) ||
					(this.Dbe[e].GetShowState() &&
						((t = this.GetAchievementGroupData(this.Dbe[e].GetGroupId())),
						(t =
							ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
								t.GetCategory(),
							)),
						showFunctionList.includes(t)) &&
						n.push(this.Dbe[e].GetId()));
		}
		return n;
	}
	GetAchievementRedPointState() {
		var e = this.GetAchievementCategoryArray();
		for (let t = 0; t < e.length; t++)
			if (this.GetCategoryRedPointState(e[t].GetId())) return !0;
		return !1;
	}
	GetCategoryRedPointState(e) {
		var t = this.GetAchievementCategoryGroups(e);
		if (t)
			for (let e = 0; e < t.length; e++)
				if (t[e].SmallItemRedPoint()) return !0;
		return !1;
	}
	GetCategoryStarNum(e) {
		let t = 0;
		for (const n of this.GetAchievementCategoryGroups(e))
			for (const e of this.GetGroupAchievements(n.GetId())) t += e.GetMaxStar();
		return t;
	}
	GetCategoryObtainStarNum(e) {
		let t = 0;
		for (const n of this.GetAchievementCategoryGroups(e))
			for (const e of this.GetGroupAchievements(n.GetId()))
				t += e.GetFinishedStar();
		return t;
	}
	GetAllObtainStarNum() {
		var e = this.GetAchievementCategoryArray();
		if (void 0 === e) return 0;
		let t = 0;
		for (const n of e) t += this.GetCategoryObtainStarNum(n.GetId());
		return t;
	}
	GetFinishedAchievementNum() {
		let e = 0;
		return (
			this.Dbe.forEach((t) => {
				(t = this.GetAchievementGroupData(t.GetGroupId())),
					(t =
						ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
							t.GetCategory(),
						)),
					showFunctionList.includes(t) && e++;
			}),
			this.Lbe.forEach((t) => {
				(t = this.GetAchievementGroupData(t.GetGroupId())),
					(t =
						ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
							t.GetCategory(),
						)),
					showFunctionList.includes(t) && e++;
			}),
			e
		);
	}
	GetAchievementAllStar() {
		let e = 0;
		return (
			this.GetAchievementCategoryArray().forEach((t) => {
				e += this.GetCategoryStarNum(t.GetId());
			}),
			e
		);
	}
	GetAchievementFinishedStar() {
		let e = 0;
		return (
			this.Dbe.forEach((t) => {
				var n = this.GetAchievementGroupData(t.GetGroupId());
				n =
					ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
						n.GetCategory(),
					);
				showFunctionList.includes(n) && (e += t.GetAchievementConfigStar());
			}),
			this.Lbe.forEach((t) => {
				var n = this.GetAchievementGroupData(t.GetGroupId());
				n =
					ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
						n.GetCategory(),
					);
				showFunctionList.includes(n) && (e += t.GetAchievementConfigStar());
			}),
			e
		);
	}
	RefreshSearchResult() {
		var e = this.GetAchievementCategoryArray();
		(this.Mbe = new Map()),
			e.forEach((e) => {
				var t = this.Obe(e.GetId(), this.CurrentSearchText);
				0 < Array.from(t.keys()).length && this.Mbe.set(e, t);
			});
	}
	GetSearchResult() {
		return this.Mbe;
	}
	GetSearchResultIfNull() {
		let e = !0;
		for (const t of this.Mbe.values()) {
			for (const n of t.values())
				if (0 < n.length) {
					e = !1;
					break;
				}
			if (!e) break;
		}
		return e;
	}
	Obe(e, t) {
		var n = new Map(),
			i = this.GetAchievementCategoryGroups(e);
		for (let e = 0; e < i.length; e++) {
			var r = this.GetGroupAchievements(i[e].GetId());
			const a = new Array();
			r.forEach((e) => {
				(e.GetTitle() && e.GetDesc()) ||
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Achievement",
							28,
							"成就分类找不到名称",
							["id", e.GetId()],
							["title", e.GetTitle()],
							["desc", e.GetDesc()],
						)),
					(e.GetTitle()?.includes(t) || e.GetDesc()?.includes(t)) && a.push(e);
			}),
				0 < a.length && n.set(i[e], a);
		}
		return n;
	}
	GetSearchResultData(e) {
		const t = new Array();
		for (const n of e.keys())
			e.get(n).forEach((e, n) => {
				var i = new AchievementData_1.AchievementSearchData();
				(i.AchievementSearchGroupData =
					new AchievementData_1.AchievementSearchGroupData()),
					(i.AchievementSearchGroupData.AchievementGroupData = n),
					(i.AchievementSearchGroupData.AchievementDataLength = e.length),
					t.push(i),
					e.forEach((e) => {
						var n = new AchievementData_1.AchievementSearchData();
						(n.AchievementData = e), t.push(n);
					});
			});
		return t;
	}
	IsHideAchievementGroup(e) {
		return (
			(e = this.GetAchievementGroupData(e)?.GetCategory()),
			(e =
				ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
					e,
				)),
			!showFunctionList.includes(e)
		);
	}
}
(exports.AchievementModel = AchievementModel).SortByTabIndex = (e, t) =>
	t.GetFinishSort() - e.GetFinishSort();

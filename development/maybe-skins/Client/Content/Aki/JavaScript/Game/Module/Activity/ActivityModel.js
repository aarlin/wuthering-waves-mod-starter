"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	ActivityCache_1 = require("./ActivityCache"),
	ActivityCommonDefine_1 = require("./ActivityCommonDefine"),
	ActivityMowingController_1 = require("./ActivityContent/Mowing/ActivityMowingController"),
	ActivityController_1 = require("./ActivityController"),
	ActivityManager_1 = require("./ActivityManager"),
	ACTIVITY_TIME_REASON = "活动开启关闭时间倒计时 [ActivityId:{0}, IsOpen:{1}]";
class ActivityModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.I3e = 0),
			(this.K2e = new Map()),
			(this.T3e = new Array()),
			(this.L3e = new ActivityCache_1.ActivityCache()),
			(this.D3e = new Set()),
			(this.R3e = new Map()),
			(this.U3e = new Map()),
			(this.A3e = new Set()),
			(this.P3e = new Set()),
			(this.x3e = new Map());
	}
	OnInit() {
		return this.w3e(), !0;
	}
	OnClear() {
		for (const e of this.R3e.values())
			TimerSystem_1.RealTimeTimerSystem.Remove(e);
		return this.R3e.clear(), this.D3e.clear(), !0;
	}
	InitCache() {
		this.L3e.InitData();
	}
	OnReceiveMessageData(e) {
		this.K2e.forEach((e, t) => {
			e.ForceClose();
		}),
			e.forEach((e) => {
				ActivityManager_1.ActivityManager.GetActivityController(e.Ikn)
					? this.B3e(e)?.Phrase(e)
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Activity", 28, "尚未实现活动", ["type", e.Ikn]);
			});
		const t = new Map();
		e.forEach((e) => {
			t.has(e.Ikn) || t.set(e.Ikn, new Array()), t.get(e.Ikn).push(e.Ekn);
		}),
			t.forEach((e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnReceiveActivityData,
					t,
					e,
				);
			}),
			this.L3e.OnReceiveActivityData(),
			this.RefreshShowingActivities(),
			this.b3e(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Activity", 38, "ActivityRequest 收到活动数据");
	}
	SetCurrentSelectActivityId(e) {
		this.I3e = e;
	}
	GetCurrentSelectActivityId() {
		return this.I3e;
	}
	GetCurrentOpenActivityData(e) {
		var t = this.GetCurrentShowingActivities(),
			i = t.length;
		if (0 !== i) {
			let n;
			for (let r = 0; r < i; r++)
				if (t[r].Id === e) {
					n = t[r];
					break;
				}
			return (n = n || this.GetActivityById(t[0].Id));
		}
	}
	RedPointState() {
		if (this.GetIfFunctionOpen()) {
			var e = this.T3e.length;
			for (let t = 0; t < e; t++)
				if (this.K2e.get(this.T3e[t])?.RedPointShowState) return !0;
		}
		return !1;
	}
	OnReceiveActivityRead(e) {
		(e = this.K2e.get(e)) && e.SetFirstOpenFalse();
	}
	OnActivityUpdate(e) {
		e.forEach((e) => {
			ActivityManager_1.ActivityManager.GetActivityController(e.Ikn)
				? this.B3e(e)?.Phrase(e)
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Activity", 28, "尚未实现活动", ["type", e.Ikn]);
		});
		const t = new Map();
		e.forEach((e) => {
			t.has(e.Ikn) || t.set(e.Ikn, new Array()), t.get(e.Ikn).push(e.Ekn);
		}),
			t.forEach((e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnReceiveActivityData,
					t,
					e,
				);
			}),
			this.RefreshShowingActivities(),
			this.b3e(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityUpdate);
	}
	OnDisableActivity(e) {
		e.forEach((e) => {
			(e = this.K2e.get(e)) && e.ForceClose();
		}),
			this.RefreshShowingActivities(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityUpdate);
	}
	B3e(e) {
		let t = this.K2e.get(e.Ekn);
		if (!t) {
			var i = TimeUtil_1.TimeUtil.GetServerTime(),
				n = Number(MathUtils_1.MathUtils.LongToBigInt(e.l0s)),
				r = Number(MathUtils_1.MathUtils.LongToBigInt(e.a0s));
			if (i <= n && i <= r)
				return (i = Math.min(r, n)), void this.q3e(i, e.Ekn, !0);
			t = ActivityController_1.ActivityController.CreateActivityData(e);
		}
		return (
			(r = Number(MathUtils_1.MathUtils.LongToBigInt(e._0s))),
			(n = Number(MathUtils_1.MathUtils.LongToBigInt(e.h0s))),
			(i = Math.max(r, n)),
			this.q3e(i, e.Ekn, !1),
			this.K2e.set(e.Ekn, t),
			this.T3e.push(e.Ekn),
			t
		);
	}
	q3e(e, t, i) {
		var n;
		this.D3e.has(e) ||
			e < TimeUtil_1.TimeUtil.GetServerTime() ||
			((n = Math.max(
				(e - TimeUtil_1.TimeUtil.GetServerTime()) *
					TimeUtil_1.TimeUtil.InverseMillisecond,
				TimerSystem_1.MIN_TIME,
			)),
			(t = StringUtils_1.StringUtils.Format(
				ACTIVITY_TIME_REASON,
				t.toString(),
				String(i),
			)),
			(i = TimerSystem_1.RealTimeTimerSystem.Delay(
				() => {
					this.G3e(e);
				},
				n,
				void 0,
				t,
			)) && (this.D3e.add(e), this.R3e.set(e, i)));
	}
	G3e(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Activity",
				38,
				"ActivityTimeStampCheck 活动开始结束时间检查",
			),
			ActivityController_1.ActivityController.RequestActivityData().then();
		var t = this.R3e.get(e);
		t && (TimerSystem_1.RealTimeTimerSystem.Remove(t), this.R3e.delete(e)),
			this.D3e.delete(e);
	}
	GetIfFunctionOpen() {
		return ModelManager_1.ModelManager.FunctionModel.IsOpen(10053);
	}
	GetIfShowActivity() {
		return !!this.GetIfFunctionOpen() && 0 < this.U3e.size;
	}
	GetAllActivityMap() {
		return this.K2e;
	}
	GetCurrentSelectActivity() {
		return this.K2e.get(this.I3e);
	}
	GetActivityById(e) {
		return this.K2e.get(e);
	}
	GetCurrentActivitiesByType(e) {
		const t = [];
		return (
			this.U3e.forEach((i, n) => {
				i.Type === e && t.push(i);
			}),
			t
		);
	}
	GetCurrentShowingActivities() {
		return Array.from(this.U3e.values()).sort(ActivityModel.SortFunc);
	}
	RefreshShowingActivities() {
		this.A3e.clear(),
			this.P3e.clear(),
			this.K2e.forEach((e, t) => {
				this.U3e.has(e.Id) && !e.CheckIfInShowTime()
					? (this.A3e.add(e.Id), this.U3e.delete(e.Id))
					: !this.U3e.has(e.Id) &&
						e.CheckIfInShowTime() &&
						(this.P3e.add(e.Id), this.U3e.set(e.Id, e));
			}),
			0 < this.A3e.size &&
				(EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnActivityClose,
					this.A3e,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnActivityUpdate,
				)),
			0 < this.P3e.size &&
				(EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnActivityOpen,
					this.P3e,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnActivityUpdate,
				));
	}
	b3e() {
		for (const t of this.GetCurrentShowingActivities()) {
			var e = this.GetActivityCacheData(
				t.Id,
				0,
				ActivityCommonDefine_1.ACTIVITYFIRSTUNLOCKFLAG,
				0,
				0,
			);
			t.IsUnLock() &&
				0 === e &&
				(ActivityManager_1.ActivityManager.GetActivityController(
					t.Type,
				).OnActivityFirstUnlock(t),
				this.SaveActivityData(
					t.Id,
					ActivityCommonDefine_1.ACTIVITYFIRSTUNLOCKFLAG,
					0,
					0,
					1,
				));
		}
	}
	SaveActivityData(e, t, i, n, r) {
		(e = this.GetActivityById(e)), this.L3e.SaveCacheData(e, t, i, n, r);
	}
	GetActivityCacheData(e, t, i, n, r) {
		return (e = this.GetActivityById(e)), this.L3e.GetCacheData(e, t, i, n, r);
	}
	SendActivityViewOpenLogData(e) {
		var t = new LogReportDefine_1.ActivityViewOpenLogData();
		(t.i_open_way = e), LogReportController_1.LogReportController.LogReport(t);
	}
	SendActivityTabViewOpenLogData(e) {
		var t = new LogReportDefine_1.ActivityTabViewOpenLogData(),
			i = TimeUtil_1.TimeUtil.GetServerTime();
		i = 0 === Number(e.EndOpenTime) ? 0 : Number(e.EndOpenTime) - i;
		(t.i_activity_id = e.Id),
			(t.i_activity_type = e.Type),
			(t.i_time_left = Math.round(i)),
			(t.i_unlock = e.IsUnLock() ? 1 : 0),
			LogReportController_1.LogReportController.LogReport(t);
	}
	SendActivityViewJumpClickLogData(e, t) {
		var i = new LogReportDefine_1.ActivityViewJumpClickLogData(),
			n = TimeUtil_1.TimeUtil.GetServerTime();
		n = 0 === Number(e.EndOpenTime) ? 0 : Number(e.EndOpenTime) - n;
		(i.i_activity_id = e.Id),
			(i.i_activity_type = e.Type),
			(i.i_time_left = Math.round(n)),
			(i.i_button_type = t),
			LogReportController_1.LogReportController.LogReport(i);
	}
	w3e() {
		var e = {
			CheckIsActivityLevel:
				ActivityMowingController_1.ActivityMowingController
					.CheckIsActivityLevel,
			GetLevelRecommendLevel:
				ActivityMowingController_1.ActivityMowingController.GetRecommendLevel,
		};
		this.x3e.set(Protocol_1.Aki.Protocol.gBs.Proto_Harvest, e);
	}
	GetActivityLevelUnlockState(e, t) {
		return (
			!(e = ActivityManager_1.ActivityManager.GetActivityController(e)) ||
			e.GetActivityLevelUnlockState(t)
		);
	}
	GetActivityLevelRecommendLevel(e, t, i) {
		return (i = this.x3e.get(i)) ? i.GetLevelRecommendLevel(e, t) : 0;
	}
	CheckActivityLevelBelongToType(e) {
		for (var [t, i] of this.x3e.entries())
			if ((i = i.CheckIsActivityLevel(e))) return [i, t];
		return [!1, 0];
	}
}
(exports.ActivityModel = ActivityModel).SortFunc = (e, t) =>
	t.Sort === e.Sort
		? t.BeginOpenTime === e.BeginOpenTime
			? e.Id - t.Id
			: e.BeginOpenTime - t.BeginOpenTime
		: e.Sort - t.Sort;

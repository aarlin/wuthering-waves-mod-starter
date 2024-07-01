"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeOfDayModel = exports.TodDayTime = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
	TimeOfDaySecondItem_1 = require("./Views/TimeOfDaySecondItem"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
class TodDayTime {
	constructor() {
		this.UIo = 0;
	}
	static get dwi() {
		return (
			this.AIo ||
				(this.AIo = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetRate()),
			this.AIo
		);
	}
	get Second() {
		return this.UIo;
	}
	set Second(e) {
		this.UIo = TodDayTime.ConvertToOneDaySecond(e);
	}
	get DayState() {
		return ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayStateByGameTimeMinute(
			this.Minute,
		);
	}
	get Hour() {
		return this.Minute / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR;
	}
	get Minute() {
		return this.Second / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
	}
	get HourMinuteString() {
		return TodDayTime.ConvertToHourMinuteString(this.Second);
	}
	static ConvertFromRealTimeSecond(e) {
		return TodDayTime.dwi
			? (e * TodDayTime.dwi) / TimeOfDayDefine_1.TOD_RATE_RATIO
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("TimeOfDay", 17, "获取时间流速比错误"),
				0);
	}
	static ConvertToDayState(e) {
		return ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayStateByGameTimeMinute(
			TodDayTime.ConvertToMinute(e),
		);
	}
	static ConvertToOneDaySecond(e) {
		return e < 0 ? 0 : e % TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
	}
	static ConvertToHourMinuteString(e) {
		var i = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
		e = Math.floor(
			(e - i * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
				TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
		);
		return ("0" + i).slice(-2) + ":" + ("0" + e).slice(-2);
	}
	static ConvertToDay(e) {
		return e / TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
	}
	static ConvertToHour(e) {
		return e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
	}
	static ConvertToMinute(e) {
		return e / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
	}
	static ConvertFromMinute(e) {
		return e * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
	}
	static ConvertFromHourMinute(e, i) {
		return (
			e * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR +
			i * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE
		);
	}
	static CheckInMinuteSpan(e, i) {
		if (!(e < 0 || e > TimeOfDayDefine_1.TOD_MINUTE_PER_DAY)) {
			var t = i[0];
			if (t < (i = i[1])) {
				if (t <= e && e < i) return !0;
			} else if (t <= e || e < i) return !0;
		}
		return !1;
	}
}
(exports.TodDayTime = TodDayTime).AIo = 0;
class TimeOfDayModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.PIo = new TodDayTime()),
			(this.xIo = 0),
			(this.wIo = 1),
			(this.BIo = 1),
			(this.FreezeTimeScale = !1),
			(this.PlayerAccount = void 0),
			(this.CurrentSelectTimeItemSt = void 0),
			(this.bIo = 0),
			(this.qIo = 0),
			(this.GIo = 0),
			(this.TimeRunLockState = !1),
			(this.TimeSynLockState = !1);
	}
	get GameTime() {
		return this.PIo;
	}
	GetPassSceneTime() {
		return this.GIo;
	}
	SetPassSceneTime(e) {
		this.GIo = e;
	}
	get OldTimeScale() {
		return this.BIo;
	}
	get TimeScale() {
		return this.wIo;
	}
	set TimeScale(e) {
		this.FreezeTimeScale || e < 0 || ((this.BIo = this.wIo), (this.wIo = e));
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return !0;
	}
	CacheTimeRecords() {
		(this.bIo = this.GameTime.Second), (this.xIo = Time_1.Time.Now);
	}
	CheckCanCacheRecord() {
		return (
			0 === this.xIo ||
			!(
				Time_1.Time.Now - this.xIo <
				TimeOfDayDefine_1.TOD_SAVE_CD_MINUTE *
					TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE *
					TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND
			)
		);
	}
	IsCurrentTimePassedNormally() {
		return 0 === this.bIo
			? this.GameTime.Second >=
					TimeOfDayDefine_1.TOD_SECOND_PER_DAY -
						TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS
			: this.GameTime.Second < TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS
				? this.bIo >=
						TimeOfDayDefine_1.TOD_SECOND_PER_DAY -
							TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS +
							this.GameTime.Second || this.bIo <= this.GameTime.Second
				: 0 < this.GameTime.Second - this.bIo &&
					this.GameTime.Second - this.bIo <
						TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS;
	}
	GetTimeOfDayShowData() {
		var e = new Array(),
			i = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetTimePresets();
		let t = 0;
		var o,
			n = this.GameTime.Second,
			a =
				ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayTimeChangePresets();
		for (let D = 0; D < a.length; D++)
			for (var [r] of i)
				(0 === a[D].ChangeDayNum && n > r) ||
					(((o = new TimeOfDaySecondItem_1.TimeOfDaySecondItemSt()).Id = t),
					(o.ChangeDayIndex = D),
					(o.SetTime = r),
					(o.ShowName = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						a[D].Title,
					)),
					e.push(o),
					t++);
		return e;
	}
	SetCurrentDay(e) {
		this.qIo !== e &&
			Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("TimeOfDay", 28, "日期调整"),
			(this.qIo = e);
	}
	GetCurrentDay() {
		return this.qIo;
	}
}
exports.TimeOfDayModel = TimeOfDayModel;

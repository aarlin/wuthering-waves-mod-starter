"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeOfDayConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	DaySelectPresetAll_1 = require("../../../Core/Define/ConfigQuery/DaySelectPresetAll"),
	DaySelectPresetById_1 = require("../../../Core/Define/ConfigQuery/DaySelectPresetById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimeOfDayById_1 = require("../../../Core/Define/ConfigQuery/TimeOfDayById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
	TimeOfDayModel_1 = require("./TimeOfDayModel");
class TimeOfDayConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.nIo = []), (this.sIo = []);
	}
	aIo() {
		return TimeOfDayById_1.configTimeOfDayById.GetConfig(1);
	}
	GetInitTimeSecond() {
		return (
			(this.aIo()?.InitTime ?? 0) * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE
		);
	}
	GetMaxV() {
		return TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * (this.aIo()?.V ?? 0);
	}
	GetA() {
		return TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * (this.aIo()?.A ?? 0);
	}
	GetRate() {
		var e = this.aIo()?.Rate;
		return (
			e ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("TimeOfDay", 17, "时间流速比未配置"),
			0)
		);
	}
	InitDayStateTimeSpanList() {
		var e = this.aIo()?.StateSpan;
		return !(
			!e ||
			e.size <= 0 ||
			((this.nIo = Array.from(e)),
			this.nIo.sort((e, t) => (e[0] < t[0] ? 1 : 0)),
			0)
		);
	}
	GetDayStateByGameTimeMinute(e) {
		if (0 === this.nIo.length && !this.InitDayStateTimeSpanList())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("TimeOfDay", 17, "时间区间配置错误"),
				0
			);
		let t = 0;
		return (
			this.nIo.every(
				(i, r) =>
					!TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(e, i) || ((t = r), !1),
			),
			4 <= t
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error("TimeOfDay", 17, "时间区间配置超出范围"),
					0)
				: t
		);
	}
	GetBanGamePlayTags() {
		if (!(0 < this.sIo.length)) {
			var e = this.aIo()?.BanTag;
			if (e)
				for (const i of e) {
					var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(i);
					t && this.sIo.push(t);
				}
		}
		return this.sIo;
	}
	GetTimePresets() {
		return this.aIo()?.TimePreset ?? void 0;
	}
	GetDayTimeChangePresets() {
		return DaySelectPresetAll_1.configDaySelectPresetAll.GetConfigList();
	}
	GetDayTimeChangeConfig(e) {
		if ((e = DaySelectPresetById_1.configDaySelectPresetById.GetConfig(e)))
			return e;
	}
	GetTimeChangeText(e) {
		return (
			(e = this.GetDayTimeChangeConfig(e)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title) ?? ""
		);
	}
}
exports.TimeOfDayConfig = TimeOfDayConfig;

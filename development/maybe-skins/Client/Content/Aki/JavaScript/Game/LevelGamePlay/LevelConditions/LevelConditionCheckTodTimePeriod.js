"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckTodTimePeriod = void 0);
const TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
	TimeOfDayDefine_1 = require("../../Module/TimeOfDay/TimeOfDayDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	DAYTIME_HOUR_START = 6,
	DAYTIME_HOUR_END = 18,
	NIGHT_HOUR_START = 18,
	NIGHT_HOUR_END = 6;
class LevelConditionCheckTodTimePeriod extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, i) {
		if (!e) return !1;
		let T = 0,
			o = 0;
		o =
			"DayTime" === e.TimePeriod
				? ((T = 6 * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
					18 * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
				: ((T = 18 * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
					6 * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
		var r = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(T, o);
		return "Eq" === e.Compare ? r : !r;
	}
}
exports.LevelConditionCheckTodTimePeriod = LevelConditionCheckTodTimePeriod;

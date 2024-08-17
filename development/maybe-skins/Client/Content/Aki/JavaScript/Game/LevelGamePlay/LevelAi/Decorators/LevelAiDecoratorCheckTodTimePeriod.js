"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiDecoratorCheckTodTimePeriod = void 0);
const TimeOfDayController_1 = require("../../../Module/TimeOfDay/TimeOfDayController"),
	TimeOfDayDefine_1 = require("../../../Module/TimeOfDay/TimeOfDayDefine"),
	LevelAiDecorator_1 = require("../LevelAiDecorator"),
	DAYTIME_HOUR_START = 6,
	DAYTIME_HOUR_END = 18,
	NIGHT_HOUR_START = 18,
	NIGHT_HOUR_END = 6;
class LevelAiDecoratorCheckTodTimePeriod extends LevelAiDecorator_1.LevelAiDecorator {
	OnExecutionStart() {
		this.CheckConditionOnTick = !0;
	}
	CheckCondition(e) {
		var i = this.Params;
		if (!i) return !1;
		let r = 0,
			o = 0;
		o =
			"DayTime" === i.TimePeriod
				? ((r = 6 * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
					18 * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
				: ((r = 18 * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR),
					6 * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
		var T = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(r, o);
		return "Eq" === i.Compare ? T : !T;
	}
}
exports.LevelAiDecoratorCheckTodTimePeriod = LevelAiDecoratorCheckTodTimePeriod;

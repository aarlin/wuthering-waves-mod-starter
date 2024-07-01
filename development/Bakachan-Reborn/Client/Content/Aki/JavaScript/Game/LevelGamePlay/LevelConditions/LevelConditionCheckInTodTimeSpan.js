"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckInTodTimeSpan = void 0);
const CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInTodTimeSpan extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		var o;
		return (
			!!e.LimitParams &&
			!!(o = e.LimitParams.get("StartMinute")) &&
			!!(e = e.LimitParams.get("EndMinute")) &&
			TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(
				parseInt(o),
				parseInt(e),
			)
		);
	}
	CheckNew(e, n) {
		var o, r;
		return (
			!!e &&
			!(!e.Start || !e.End) &&
			((r = e.Start.Hour * CommonDefine_1.MINUTE_PER_HOUR + e.Start.Min),
			(o = e.End.Hour * CommonDefine_1.MINUTE_PER_HOUR + e.End.Min),
			(r = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(r, o)),
			"Eq" === e.Compare ? r : !r)
		);
	}
}
exports.LevelConditionCheckInTodTimeSpan = LevelConditionCheckInTodTimeSpan;

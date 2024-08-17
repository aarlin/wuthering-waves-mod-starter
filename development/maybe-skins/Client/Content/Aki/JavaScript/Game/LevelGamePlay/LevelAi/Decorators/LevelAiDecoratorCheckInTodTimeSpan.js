"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiDecoratorCheckInTodTimeSpan = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	TimeOfDayController_1 = require("../../../Module/TimeOfDay/TimeOfDayController"),
	LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorCheckInTodTimeSpan extends LevelAiDecorator_1.LevelAiDecorator {
	OnExecutionStart() {
		this.CheckConditionOnTick = !0;
	}
	CheckCondition(e) {
		var o,
			r,
			n = this.Params;
		return (
			!(!n.Start || !n.End) &&
			((r = n.Start.Hour * CommonDefine_1.MINUTE_PER_HOUR + n.Start.Min),
			(o = n.End.Hour * CommonDefine_1.MINUTE_PER_HOUR + n.End.Min),
			(r = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(r, o)),
			"Eq" === n.Compare ? r : !r)
		);
	}
}
exports.LevelAiDecoratorCheckInTodTimeSpan = LevelAiDecoratorCheckInTodTimeSpan;

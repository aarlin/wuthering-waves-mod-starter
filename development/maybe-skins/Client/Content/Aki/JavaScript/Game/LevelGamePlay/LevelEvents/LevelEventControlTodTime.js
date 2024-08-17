"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventControlTodTime = void 0);
const TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventControlTodTime extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, o) {
		if (e)
			switch ((e = e.get("State")) ? parseInt(e) : 0) {
				case 0:
					TimeOfDayController_1.TimeOfDayController.ForcePauseTime();
					break;
				case 1:
					TimeOfDayController_1.TimeOfDayController.ForceResumeTime();
			}
	}
}
exports.LevelEventControlTodTime = LevelEventControlTodTime;

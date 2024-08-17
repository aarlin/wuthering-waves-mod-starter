"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeOfDayAnimController = void 0);
const UiLayer_1 = require("../../Ui/UiLayer"),
	UiManager_1 = require("../../Ui/UiManager"),
	TimeOfDayController_1 = require("./TimeOfDayController"),
	TimeOfDayModel_1 = require("./TimeOfDayModel");
class TimeOfDayAnimController {
	static PlayTimeAnimation(e, i, r) {
		(TimeOfDayAnimController.CallBack = r),
			UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0),
			TimeOfDayController_1.TimeOfDayController.PauseTime(),
			TimeOfDayController_1.TimeOfDayController.SyncGlobalGameTime(
				TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(i),
			),
			UiManager_1.UiManager.OpenView("TimeOfDayLoadingView");
	}
}
((exports.TimeOfDayAnimController = TimeOfDayAnimController).TickId = 0),
	(TimeOfDayAnimController.PrePromise = void 0),
	(TimeOfDayAnimController.CallBack = () => {});

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionSetTime = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	TimeOfDayModel_1 = require("../../TimeOfDay/TimeOfDayModel"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetTime extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e = this.ActionInfo.Params;
		(e = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(e.Hour, e.Min)) <
			0 || ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.SetTime(e);
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
}
exports.FlowActionSetTime = FlowActionSetTime;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
	GlobalData_1 = require("../../../../../GlobalData"),
	TimeOfDayController_1 = require("../../../../../Module/TimeOfDay/TimeOfDayController");
class TsDecoratorTimeSpanCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.CheckType = 0),
			(this.StartTime = new UE.Timecode()),
			(this.EndTime = new UE.Timecode()),
			(this.IsInitTsVariables = !1),
			(this.TsCheckType = 0),
			(this.TsStartTime = new UE.Timecode()),
			(this.TsEndTime = new UE.Timecode());
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsCheckType = this.CheckType),
			(this.TsStartTime = this.StartTime),
			(this.TsEndTime = this.EndTime));
	}
	PerformConditionCheckAI(e, i) {
		if (!e.AiController)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1
			);
		this.InitTsVariables();
		e =
			this.TsStartTime.Hours * CommonDefine_1.MINUTE_PER_HOUR +
			this.TsStartTime.Minutes;
		var t =
				this.TsEndTime.Hours * CommonDefine_1.MINUTE_PER_HOUR +
				this.TsEndTime.Minutes,
			r = TimeOfDayController_1.TimeOfDayController.CheckInMinuteSpan(e, t);
		switch (this.TsCheckType) {
			case 0:
				return r;
			case 1:
				return !r;
			default:
				return !1;
		}
	}
}
exports.default = TsDecoratorTimeSpanCheck;

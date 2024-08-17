"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogReportModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	LogReportController_1 = require("./LogReportController"),
	LogReportDefine_1 = require("./LogReportDefine"),
	RECORD_HANG_UP_OFFSET = 30;
class LogReportModel extends ModelBase_1.ModelBase {
	static get HangUpTime() {
		return this.Vpi;
	}
	static RecordOperateTime(e = !1, i = "", t = 0) {
		var o = TimeUtil_1.TimeUtil.GetServerTimeStamp();
		if ((0 === this.Hpi && (this.Hpi = o), e && i)) {
			if ((0 === (e = this.jpi.get(i)) && this.jpi.set(i, t), e === t)) return;
			this.jpi.set(i, t);
		}
		(e = (o - this.Hpi) * TimeUtil_1.TimeUtil.Millisecond) > 30 &&
			((this.Vpi += e),
			((i = new LogReportDefine_1.HangUpTimeLogData()).f_hang_up_time =
				e.toString())),
			(this.Hpi = o);
	}
}
((exports.LogReportModel = LogReportModel).Hpi = 0),
	(LogReportModel.Vpi = 0),
	(LogReportModel.jpi = new Map());

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionWait = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionWait extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments), (this.IRe = void 0);
	}
	OnExecute() {
		var e = this.ActionInfo.Params;
		this.IRe = TimerSystem_1.TimerSystem.Delay((e) => {
			(this.IRe = void 0), this.FinishExecute(!0);
		}, e.Time * TimeUtil_1.TimeUtil.InverseMillisecond);
	}
	OnInterruptExecute() {
		TimerSystem_1.TimerSystem.Has(this.IRe) &&
			TimerSystem_1.TimerSystem.Remove(this.IRe),
			this.FinishExecute(!0);
	}
}
exports.FlowActionWait = FlowActionWait;

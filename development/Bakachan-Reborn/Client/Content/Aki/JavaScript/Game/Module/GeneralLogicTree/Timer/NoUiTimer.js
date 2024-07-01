"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NoUiTimer = void 0);
const TimeUtil_1 = require("../../../Common/TimeUtil"),
	LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
class NoUiTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
	constructor() {
		super(...arguments), (this.M$t = -0);
	}
	StartShowTimer(e) {
		this.M$t = e;
	}
	GetRemainTime() {
		return (this.M$t - TimeUtil_1.TimeUtil.GetServerTimeStamp()) / 1e3;
	}
}
exports.NoUiTimer = NoUiTimer;

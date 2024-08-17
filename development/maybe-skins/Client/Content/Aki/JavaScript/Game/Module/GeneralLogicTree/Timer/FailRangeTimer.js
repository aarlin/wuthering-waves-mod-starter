"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FailRangeTimer = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
	LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
class PendingProcess {
	constructor(e) {
		(this.ProcessType = e),
			(this.ProcessId = 0),
			(this.Finished = !1),
			(this.ProcessId = ++PendingProcess.Id);
	}
}
PendingProcess.Id = 0;
class StartShowProcess extends PendingProcess {
	constructor(e) {
		super(0), (this.EndTime = e);
	}
}
class EndShowProcess extends PendingProcess {
	constructor() {
		super(1);
	}
}
class FailRangeTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
	constructor(e, s, i) {
		super(e, s, !0, i),
			(this.U$t = []),
			(this.bze = void 0),
			(this.OnTick = (e) => {
				if (0 !== this.U$t.length && !this.bze)
					switch (((this.bze = this.U$t[0]), this.bze.ProcessType)) {
						case 0:
							UiManager_1.UiManager.OpenView(
								"QuestFailRangeTipsView",
								this.bze.EndTime,
								this.HDe,
							);
							break;
						case 1:
							UiManager_1.UiManager.CloseView(
								"QuestFailRangeTipsView",
								this.HDe,
							);
					}
			}),
			(this.HDe = (e) => {
				(this.bze.Finished = !0), this.U$t.shift(), (this.bze = void 0);
			}),
			(this.bze = void 0);
	}
	Destroy() {
		(this.U$t.length = 0),
			UiManager_1.UiManager.CloseView("QuestFailRangeTipsView", this.HDe),
			super.Destroy();
	}
	StartShowTimer(e) {
		this.U$t.push(new StartShowProcess(e));
	}
	EndShowTimer() {
		this.U$t.push(new EndShowProcess());
	}
}
exports.FailRangeTimer = FailRangeTimer;

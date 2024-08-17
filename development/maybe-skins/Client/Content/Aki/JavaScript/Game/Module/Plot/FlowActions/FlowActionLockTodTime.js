"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionLockTodTime = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionLockTodTime extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e = this.ActionInfo.Params;
		if (e)
			switch (e.LockState) {
				case "Lock":
					ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.PauseTime();
					break;
				case "Unlock":
					ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.ResumeTime();
			}
		else this.FinishExecute(!1);
	}
	OnBackgroundExecute() {
		this.OnExecute(), this.FinishExecute(!0);
	}
}
exports.FlowActionLockTodTime = FlowActionLockTodTime;

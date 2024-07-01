"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionPlayMovie = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	VideoLauncher_1 = require("../../Video/VideoLauncher"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionPlayMovie extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e = this.ActionInfo.Params,
			o =
				"PlayMovie" ===
				ControllerHolder_1.ControllerHolder.FlowController.GetNextAction()
					?.Name;
		VideoLauncher_1.VideoLauncher.ShowVideoCg(
			e.VideoName,
			() => {
				ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
					this.FinishExecute(!0);
			},
			e.BackgroundFade,
			o,
		);
	}
	OnInterruptExecute() {
		VideoLauncher_1.VideoLauncher.CloseVideoCg(), this.FinishExecute(!0);
	}
}
exports.FlowActionPlayMovie = FlowActionPlayMovie;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipTaskRogueActivity = void 0);
const RoguelikeController_1 = require("../../Roguelike/RoguelikeController"),
	SkipTask_1 = require("./SkipTask");
class SkipTaskRogueActivity extends SkipTask_1.SkipTask {
	OnRun() {
		RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView(),
			this.Finish();
	}
}
exports.SkipTaskRogueActivity = SkipTaskRogueActivity;

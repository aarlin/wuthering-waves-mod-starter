"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipTaskVisionIntensifyView = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
	SkipTask_1 = require("./SkipTask");
class SkipTaskVisionIntensifyView extends SkipTask_1.SkipTask {
	OnRun(i) {
		UiManager_1.UiManager.OpenView("VisionIntensifyView", i), this.Finish();
	}
}
exports.SkipTaskVisionIntensifyView = SkipTaskVisionIntensifyView;

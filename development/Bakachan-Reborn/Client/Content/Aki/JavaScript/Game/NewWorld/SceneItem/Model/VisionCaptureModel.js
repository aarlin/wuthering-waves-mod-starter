"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionCaptureModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class VisionCaptureModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Qnr = void 0);
	}
	OnInit() {
		return (this.Qnr = new Map()), !0;
	}
	AddVisionCapture(e, r) {
		this.Qnr.has(e) &&
			Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"SceneGameplay",
				7,
				"[VisionCaptureModel]重复添加收服声骸",
				["Capture Owner ID:", e],
			),
			this.Qnr.set(e, r);
	}
	RemoveVisionCapture(e) {
		this.Qnr.delete(e);
	}
	GetVisionCapture(e) {
		return this.Qnr.get(e);
	}
	OnClear() {
		return !(this.Qnr = void 0);
	}
}
exports.VisionCaptureModel = VisionCaptureModel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionSetCameraAnim = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetCameraAnim extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		ModelManager_1.ModelManager.PlotModel.PlayCameraAnim(
			this.ActionInfo.Params,
		);
	}
}
exports.FlowActionSetCameraAnim = FlowActionSetCameraAnim;

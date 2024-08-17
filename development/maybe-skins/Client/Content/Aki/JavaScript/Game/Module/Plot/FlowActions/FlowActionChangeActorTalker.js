"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionChangeActorTalker = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeActorTalker extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e = this.ActionInfo.Params;
		e && ModelManager_1.ModelManager.PlotModel.SetActorName(e);
	}
}
exports.FlowActionChangeActorTalker = FlowActionChangeActorTalker;

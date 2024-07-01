"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionHideByRangeInFlow = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionHideByRangeInFlow extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e = this.ActionInfo.Params;
		ModelManager_1.ModelManager.PlotModel.PlotCleanRange.Open(e);
	}
	OnBackgroundExecute() {}
}
exports.FlowActionHideByRangeInFlow = FlowActionHideByRangeInFlow;

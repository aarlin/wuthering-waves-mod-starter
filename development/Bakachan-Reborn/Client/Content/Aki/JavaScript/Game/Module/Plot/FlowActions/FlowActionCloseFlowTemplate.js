"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionCloseFlowTemplate = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionCloseFlowTemplate extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		"LevelC" !== ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
			? this.FinishExecute(!0, !0)
			: ModelManager_1.ModelManager.PlotModel.EndPlotTemplate(
					this.ActionInfo.Params,
					() => {
						this.FinishExecute(!0);
					},
				);
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
}
exports.FlowActionCloseFlowTemplate = FlowActionCloseFlowTemplate;

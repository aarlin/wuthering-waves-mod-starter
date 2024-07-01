"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PlotController_1 = require("../../../Module/Plot/PlotController"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class PlotInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		var t = ModelManager_1.ModelManager.PlotModel;
		return (
			!!PlotController_1.PlotController.NeedInputRefresh() &&
			!(
				(!t.PlotConfig.DisableInput &&
					!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Input",
						8,
						"[InputDistribute]刷新剧情输入Tag时，除了视角旋转和鼠标输入,其他输入都会被禁止",
					),
				this.SetInputDistributeTags([
					InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
						.MouseInputTag,
					InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
						.NavigationTag,
				]),
				0)
			)
		);
	}
}
exports.PlotInputDistribute = PlotInputDistribute;

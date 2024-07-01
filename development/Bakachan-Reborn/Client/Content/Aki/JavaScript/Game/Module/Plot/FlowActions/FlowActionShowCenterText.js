"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionShowCenterText = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionShowCenterText extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments),
			(this.h$i = () => {
				this.Runner.FinishShowCenterTextAction(() => {
					this.FinishExecute(!0);
				});
			});
	}
	OnExecute() {
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"Plot",
				27,
				"黑屏白字行为不再维护，请策划使用ShowTalk形式的黑幕白字",
				["id", this.Context.FormatId],
				["action", this.ActionInfo.ActionId],
			);
		var e = this.ActionInfo.Params;
		ModelManager_1.ModelManager.PlotModel.ShowCenterText(e, this.h$i);
	}
	OnInterruptExecute() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
		),
			UiManager_1.UiManager.IsViewShow("PlotTransitionView") &&
				UiManager_1.UiManager.CloseView("PlotTransitionView"),
			this.FinishExecute(!0);
	}
}
exports.FlowActionShowCenterText = FlowActionShowCenterText;

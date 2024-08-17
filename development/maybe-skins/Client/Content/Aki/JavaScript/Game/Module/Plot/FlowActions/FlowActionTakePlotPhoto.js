"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionTakePlotPhoto = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionTakePlotPhoto extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments),
			(this.Ohi = () => {
				this.FinishExecute(!0);
			});
	}
	OnExecute() {
		this.ActionInfo.Params
			? UiManager_1.UiManager.IsViewShow("PlotPhotoView") ||
				UiManager_1.UiManager.OpenView("PlotPhotoView", this.Ohi)
			: this.FinishExecute(!0);
	}
}
exports.FlowActionTakePlotPhoto = FlowActionTakePlotPhoto;

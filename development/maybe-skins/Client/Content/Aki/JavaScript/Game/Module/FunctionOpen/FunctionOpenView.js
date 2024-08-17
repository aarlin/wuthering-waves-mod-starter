"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionOpenView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class FunctionOpenView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.I4t = () => {
				var e =
					ModelManager_1.ModelManager.FunctionModel.PopNewOpenFunctionList();
				e ? this.W8t(e) : this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.I4t]]);
	}
	OnStart() {
		ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() &&
			this.RootItem.SetUIActive(!1);
		var e = ModelManager_1.ModelManager.FunctionModel.PopNewOpenFunctionList();
		this.nOe(e);
	}
	OnAfterShow() {
		this.UiViewSequence.PlaySequence("Show", !0);
	}
	W8t(e) {
		this.UiViewSequence.PlaySequence("Show", !0), this.nOe(e);
	}
	nOe(e) {
		var t = this.GetTexture(0);
		this.SetTextureByPath(e.Icon, t),
			this.GetText(1).ShowTextNew(e.Title),
			this.GetText(2).ShowTextNew(e.Desc);
	}
}
exports.FunctionOpenView = FunctionOpenView;

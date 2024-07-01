"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiBlurLogic = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	UiLayerType_1 = require("../../Define/UiLayerType"),
	UiModel_1 = require("../../UiModel");
class UiBlurLogic {
	static b1r(e) {
		if (e) {
			var o = e.GetOwner().GetComponentByClass(UE.TsUiBlur_C.StaticClass());
			let r;
			(r = o
				? void 0 === o.OverrideItem
					? e
					: o.OverrideItem.RootComponent
				: r)
				? UE.LGUIBPLibrary.SetGlobalBlurUIItem(r, e.GetWorld())
				: (Log_1.Log.CheckInfo() && Log_1.Log.Info("Blur", 11, "还原模糊"),
					UE.LGUIBPLibrary.ResetGlobalBlurUIItem(e.GetWorld()));
		}
	}
	static q1r(e) {
		return e.ChildPopView
			? e.ChildPopView.GetPopViewRootItem()
			: e.GetRootItem();
	}
	static SetNormalUiRenderAfterBlur(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Blur", 11, "设置模糊", ["ViewName", e.Info.Name]),
			this.b1r(this.q1r(e));
	}
	static ResumeTopUiRenderAfterBlur() {
		var e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop);
		e?.IsShowOrShowing ||
		(e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal))
			? this.SetNormalUiRenderAfterBlur(e)
			: (Log_1.Log.CheckInfo() && Log_1.Log.Info("Blur", 11, "还原模糊"),
				UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
					GlobalData_1.GlobalData.GameInstance.GetWorld(),
				));
	}
}
exports.UiBlurLogic = UiBlurLogic;

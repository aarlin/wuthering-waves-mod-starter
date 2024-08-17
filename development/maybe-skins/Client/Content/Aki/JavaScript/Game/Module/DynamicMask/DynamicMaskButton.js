"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DynamicMaskButton = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../Ui/UiLayer");
class DynamicMaskButton extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Qyt = void 0),
			(this.UPr = void 0),
			(this.GPo = void 0),
			(this.APr = void 0),
			(this.j7e = () => {
				this.Qyt?.();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
			(this.BtnBindInfo = [[0, this.j7e]]);
	}
	OnAfterShow() {
		var t, e;
		this.UPr?.IsValid() &&
			((e = this.RootItem.K2_GetComponentToWorld().Inverse()),
			(t = this.UPr.RelativeLocation),
			(t = this.UPr.GetParentAsUIItem()
				.K2_GetComponentToWorld()
				.TransformPosition(t)),
			(e = e.TransformPosition(t)),
			this.UPr.SetUIParent(this.RootItem, !0),
			this.UPr.SetUIRelativeLocation(e));
	}
	SetButtonFunction(t) {
		this.Qyt = t;
	}
	async Init() {
		await this.CreateByResourceIdAsync(
			"UiItem_BtnMask",
			UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
		);
	}
	SetAttachChildItem(t) {
		(this.UPr = t),
			(this.GPo = t.GetParentAsUIItem()),
			(this.APr = t.GetRelativeTransform());
	}
	ResetItemParent() {
		this.UPr &&
			this.GPo &&
			(this.UPr.SetUIParent(this.GPo),
			this.UPr.K2_SetRelativeTransform(this.APr, !1, void 0, !1));
	}
}
exports.DynamicMaskButton = DynamicMaskButton;

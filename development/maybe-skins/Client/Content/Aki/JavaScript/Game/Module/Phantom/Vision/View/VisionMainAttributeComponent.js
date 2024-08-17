"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionMainAttributeComponent = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	VisionIdentifyAttributeItem_1 = require("./VisionIdentifyAttributeItem");
class VisionMainAttributeComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Layout = void 0),
			(this.sGe = () =>
				new VisionIdentifyAttributeItem_1.VisionIdentifyAttributeItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		(this.Layout = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(0),
			this.sGe,
		)),
			this.SetActive(!0),
			this.GetItem(1).SetUIActive(!1);
	}
	Update(t) {
		this.Layout.RefreshByData(t);
	}
}
exports.VisionMainAttributeComponent = VisionMainAttributeComponent;

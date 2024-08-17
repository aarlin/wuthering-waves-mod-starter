"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleVisionIdentifyAttribute = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	PhantomDataBase_1 = require("../../../Phantom/PhantomBattle/Data/PhantomDataBase"),
	VisionIdentifyItem_1 = require("../../../Phantom/Vision/View/VisionIdentifyItem"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
class RoleVisionIdentifyAttribute extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.AttributeScroller = void 0),
			(this.sGe = () => new VisionIdentifyItem_1.VisionIdentifyItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.AttributeScroller = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(0),
			this.sGe,
		);
	}
	Refresh(e, t) {
		const i = new Array();
		e.forEach((e) => {
			var n = new PhantomDataBase_1.VisionSubPropViewData();
			(n.Data = e),
				(n.SourceView = "VisionEquipmentView"),
				(n.CurrentVisionData = t),
				i.push(n);
		}),
			this.AttributeScroller.RefreshByData(i);
	}
}
exports.RoleVisionIdentifyAttribute = RoleVisionIdentifyAttribute;

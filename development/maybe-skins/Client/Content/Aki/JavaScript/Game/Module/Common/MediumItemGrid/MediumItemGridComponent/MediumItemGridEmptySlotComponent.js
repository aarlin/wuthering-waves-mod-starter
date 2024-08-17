"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridEmptySlotComponent = void 0);
const UE = require("ue"),
	MediumItemGridVisibleComponent_1 = require("./MediumItemGridVisibleComponent");
class MediumItemGridEmptySlotComponent extends MediumItemGridVisibleComponent_1.MediumItemGridVisibleComponent {
	constructor() {
		super(...arguments),
			(this.Wgt = void 0),
			(this.Mxt = () => {
				this.Wgt && this.Wgt();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
			(this.BtnBindInfo = [[0, this.Mxt]]);
	}
	GetResourceId() {
		return "UiItem_ItemBtnAdd";
	}
	GetLayoutLevel() {
		return 1;
	}
	OnDeactivate() {
		this.Wgt = void 0;
	}
	BindEmptySlotButtonCallback(t) {
		this.Wgt = t;
	}
	UnBindEmptySlotButtonCallback() {
		this.Wgt = void 0;
	}
}
exports.MediumItemGridEmptySlotComponent = MediumItemGridEmptySlotComponent;

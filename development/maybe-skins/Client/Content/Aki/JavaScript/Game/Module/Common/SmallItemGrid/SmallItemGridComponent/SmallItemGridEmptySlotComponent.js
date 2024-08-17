"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridEmptySlotComponent = void 0);
const UE = require("ue"),
	SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridEmptySlotComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
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
		return "UiItem_ItemBStateAdd";
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
	OnRefresh(t) {}
}
exports.SmallItemGridEmptySlotComponent = SmallItemGridEmptySlotComponent;

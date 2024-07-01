"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridSortIndexComponent = void 0);
const UE = require("ue"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridSortIndexComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	GetResourceId() {
		return "UiItem_ItemSortNum";
	}
	OnRefresh(e) {
		void 0 === e || 0 === e
			? this.SetActive(!1)
			: (this.GetText(0).SetText(e.toString()), this.SetActive(!0));
	}
}
exports.MediumItemGridSortIndexComponent = MediumItemGridSortIndexComponent;

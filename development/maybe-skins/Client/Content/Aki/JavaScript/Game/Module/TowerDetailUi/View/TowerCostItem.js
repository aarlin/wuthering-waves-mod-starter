"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerCostItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	TowerData_1 = require("../TowerData");
class TowerCostItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	Update(e) {
		var t = this.GetText(0),
			o = (o = (t.SetText("" + e), e >= TowerData_1.HIGH_COST))
				? TowerData_1.highColor
				: 0 === e
					? TowerData_1.noneColor
					: TowerData_1.lowColor;
		t.SetColor(o), this.GetItem(1).SetColor(o), this.GetItem(2).SetColor(o);
	}
}
exports.TowerCostItem = TowerCostItem;

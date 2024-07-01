"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridCostComponent = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	TowerData_1 = require("../../../TowerDetailUi/TowerData"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCostComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	constructor() {
		super(...arguments), (this.gxt = void 0), (this.fxt = void 0);
	}
	GetResourceId() {
		return "UiItem_ItemEnergy";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
		];
	}
	OnActivate() {
		(this.gxt = UE.Color.FromHex(TowerData_1.HIGH_COLOR)),
			(this.fxt = UE.Color.FromHex(TowerData_1.LOW_COLOR));
	}
	OnRefresh(e) {
		e = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
			e,
			ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
		);
		var t = this.GetText(0);
		t.SetText("" + e), (e = e >= TowerData_1.HIGH_COST);
		t.SetColor(e ? this.gxt : this.fxt),
			this.GetItem(1).SetColor(e ? this.gxt : this.fxt),
			this.SetActive(!0);
	}
}
exports.MediumItemGridCostComponent = MediumItemGridCostComponent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonCostItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonCostItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.ItemId = 0),
			(this.OwnCount = 0),
			(this.CostCount = 0),
			(this.j7e = () => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					this.ItemId,
				);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIButtonComponent],
			[2, UE.UISprite],
			[3, UE.UIText],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [[1, this.j7e]]);
	}
	UpdateItem(t, e) {
		(this.ItemId = t),
			(this.CostCount = e),
			this.SetItemIcon(this.GetTexture(0), this.ItemId),
			this.SetItemQualityIcon(this.GetSprite(2), this.ItemId),
			this.GetText(3).SetText(e.toString()),
			(this.OwnCount =
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t)),
			(t = this.GetText(4)).SetText(this.OwnCount.toString()),
			t.SetChangeColor(this.OwnCount >= e, t.changeColor);
	}
	IsEnough() {
		return this.OwnCount >= this.CostCount;
	}
	GetItemId() {
		return this.ItemId;
	}
	GetCostCount() {
		return this.CostCount;
	}
}
exports.CommonCostItem = CommonCostItem;

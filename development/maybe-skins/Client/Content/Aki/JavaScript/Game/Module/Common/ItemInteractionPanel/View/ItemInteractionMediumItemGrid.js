"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemInteractionMediumItemGrid = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../MediumItemGrid/LoopScrollMediumItemGrid");
class ItemInteractionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments), (this.rAt = 0), (this.VAt = void 0);
	}
	OnRefresh(e, t, o) {
		var r = (this.VAt = e).ItemConfigId,
			i =
				((this.rAt =
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r)),
				e.GetCurrentCount()),
			d = e.NeedCount;
		r = { Data: e, Type: 4, ItemConfigId: r, IsDisable: !e.IsEnable() };
		0 < i
			? ((r.BottomTextId = "ItemCountSelected"),
				(r.BottomTextParameter = [i, this.rAt]),
				(r.ReduceButtonInfo = { IsVisible: !0, LongPressConfigId: 1 }))
			: this.rAt < d
				? ((r.BottomTextId = "ItemCountNotEnough"),
					(r.BottomTextParameter = [this.rAt]))
				: (r.BottomText = this.rAt.toString()),
			this.Apply(r),
			this.SetSelected(e.IsSelected);
	}
	OnSelected(e) {
		this.VAt && (this.VAt.IsSelected = !0), this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.VAt && (this.VAt.IsSelected = !0), this.SetSelected(!1);
	}
	OnCanExecuteChange() {
		return this.VAt.IsEnable();
	}
}
exports.ItemInteractionMediumItemGrid = ItemInteractionMediumItemGrid;

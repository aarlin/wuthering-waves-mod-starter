"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DeliverMediumItemGrid = void 0);
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class DeliverMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	OnRefresh(e, t, o) {
		var r, i, d;
		e.HasItem()
			? ((r = e.GetNeedCount()),
				(d = e.GetCurrentCount()),
				(i = { Data: e, Type: 4, ItemConfigId: e.GetCurrentItemConfigId() }),
				1 < e.GetItemRangeList().length &&
					(i.ReduceButtonInfo = { IsVisible: 0 < d, LongPressConfigId: 1 }),
				d < r
					? ((i.BottomTextId = "DeliverSlotCountNotEnough"),
						(i.BottomTextParameter = [d, r]))
					: (i.BottomText = d + "/" + r),
				this.Apply(i))
			: ((d = {
					Data: e,
					Type: 1,
					BottomText: e.GetCurrentCount() + "/" + e.GetNeedCount(),
				}),
				this.Apply(d));
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
	OnCanExecuteChange() {
		return !1;
	}
	OnExtendToggleClicked() {
		var e = this.Data;
		e.HasItem() &&
			ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
				e.GetCurrentItemConfigId(),
			);
	}
}
exports.DeliverMediumItemGrid = DeliverMediumItemGrid;

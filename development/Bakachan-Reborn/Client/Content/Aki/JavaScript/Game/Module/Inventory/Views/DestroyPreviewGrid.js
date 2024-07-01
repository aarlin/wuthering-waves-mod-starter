"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DestroyPreviewGrid = void 0);
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class DestroyPreviewGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	OnRefresh(e, t, r) {
		(e = {
			Type: 4,
			Data: e,
			BottomText: e[1].toString(),
			ItemConfigId: e[0].ItemId,
		}),
			this.Apply(e),
			this.SetSelected(!1);
	}
	OnStart() {
		this.BindOnCanExecuteChange(() => !1);
	}
	OnSelected(e) {}
	OnDeselected(e) {}
}
exports.DestroyPreviewGrid = DestroyPreviewGrid;

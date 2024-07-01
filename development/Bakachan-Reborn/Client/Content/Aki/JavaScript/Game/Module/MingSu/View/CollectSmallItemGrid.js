"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CollectSmallItemGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class CollectSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	OnRefresh(e, l, o) {
		e = {
			Type: 4,
			Data: e,
			ItemConfigId: e.ItemInfo.Id,
			BottomText: e.Count.toString(),
		};
		var t = (e =
				(this.Apply(e),
				ModelManager_1.ModelManager.MingSuModel)).GetCurrentDragonPoolId(),
			r = e.CurrentPreviewLevel,
			i = e.GetTargetDragonPoolLevelById(t),
			a = e.GetTargetDragonPoolMaxLevelById(t);
		if (r === i + 1 || (r === i && r === a)) {
			if (2 === e.GetTargetDragonPoolActiveById(t))
				return void this.SetReceivedVisible(!0);
		} else if (r <= i) return void this.SetReceivedVisible(!0);
		this.SetReceivedVisible(!1);
	}
}
exports.CollectSmallItemGrid = CollectSmallItemGrid;

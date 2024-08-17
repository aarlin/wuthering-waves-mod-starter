"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTowerGuideRewardGrid = void 0);
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class ActivityTowerGuideRewardGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	OnRefresh(e, t, i) {
		var o = {
			Type: 4,
			Data: e,
			IsLockVisible: e.IsLock,
			BottomText: e.Item[1].toString(),
			ItemConfigId: e.Item[0].ItemId,
			IsDisable: e.IsLock,
			IsReceivableVisible: e.IsReceivableVisible,
		};
		this.Apply(o),
			this.SetDisableComponentColor("365988", e.IsLock),
			this.SetSelected(!1);
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
}
exports.ActivityTowerGuideRewardGrid = ActivityTowerGuideRewardGrid;

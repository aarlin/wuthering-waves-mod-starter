"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementGridItem = exports.AchievementGridItemData = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class AchievementGridItemData {
	constructor() {
		(this.Data = void 0), (this.GetRewardState = !1);
	}
}
exports.AchievementGridItemData = AchievementGridItemData;
class AchievementGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	constructor() {
		super(...arguments), (this.Mne = 0);
	}
	OnRefresh(e, t, r) {
		this.Refresh(e);
	}
	OnCanExecuteChange() {
		return !1;
	}
	OnExtendToggleClicked() {
		ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
			this.Mne,
		);
	}
	Refresh(e) {
		var t, r;
		e?.Data &&
			((r = e.Data[0]),
			(t = e.Data[1]),
			(this.Mne = r.ItemId),
			(r = e.GetRewardState),
			(e = {
				Data: e,
				Type: 4,
				ItemConfigId: this.Mne,
				BottomText: 0 < t ? "" + t : "",
				IsReceivedVisible: r,
			}),
			this.Apply(e));
	}
}
exports.AchievementGridItem = AchievementGridItem;

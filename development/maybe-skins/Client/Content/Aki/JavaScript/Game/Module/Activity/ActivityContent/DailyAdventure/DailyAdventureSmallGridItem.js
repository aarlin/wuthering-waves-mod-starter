"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyAdventureSmallGridItem = void 0);
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class DailyAdventureSmallGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	constructor() {
		super(...arguments), (this.Mne = 0);
	}
	OnRefresh(e, t, l) {
		this.Refresh(e);
	}
	Refresh(e) {
		var t = (l = e.Item)[1],
			l =
				((this.Mne = l[0].ItemId),
				{
					Data: e,
					Type: 4,
					ItemConfigId: this.Mne,
					BottomText: 0 < t ? "" + t : "",
					IsReceivedVisible: e.HasClaimed,
				});
		this.Apply(l);
	}
	OnCanExecuteChange() {
		return !1;
	}
	OnExtendToggleClicked() {}
}
exports.DailyAdventureSmallGridItem = DailyAdventureSmallGridItem;

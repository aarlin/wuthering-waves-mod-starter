"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdventureTargetRewardItem = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class AdventureTargetRewardItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments),
			(this.GetRolePositionFunc = void 0),
			(this.IsHighlightIndex = void 0);
	}
	OnRefresh(e, t, r) {
		this.SetSelected(t);
		t = e[0].ItemId;
		var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
		o &&
			((e = {
				Type: 4,
				Data: e,
				IsOmitBottomText: !0,
				BottomText: e[1].toString(),
				ItemConfigId: t,
				StarLevel: o.QualityId,
			}),
			this.Apply(e));
	}
	OnForceSelected() {
		this.SetSelected(!0, !0);
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1, !0);
	}
}
exports.AdventureTargetRewardItem = AdventureTargetRewardItem;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgingMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	ForgingController_1 = require("../ForgingController");
class ForgingMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
	OnRefresh(e, o, i) {
		var r = e.ItemId,
			t =
				ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
					r,
				).ItemId,
			n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
		if (n) {
			var g = e.IsUnlock;
			let i = !1;
			(i = g
				? ForgingController_1.ForgingController.CheckCanForging(r)
				: ForgingController_1.ForgingController.CheckCanUnlock(r)),
				(r = {
					Type: 4,
					Data: e,
					ItemConfigId: t,
					BottomTextId: n.Name,
					IsProhibit: !g,
					IsNewVisible: e.IsNew,
					IsDisable: 0 < g && !i,
					IsRedDotVisible: i && !e.IsUnlock,
					StarLevel: n.QualityId,
					IsOmitBottomText: !0,
					IsTimeFlagVisible: 0 < e.ExistEndTime,
				}),
				this.Apply(r),
				this.SetSelected(o);
		}
	}
}
exports.ForgingMediumItemGrid = ForgingMediumItemGrid;

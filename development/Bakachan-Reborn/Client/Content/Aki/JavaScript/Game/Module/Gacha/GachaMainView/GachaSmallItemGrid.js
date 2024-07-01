"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaSmallItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class GachaSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	OnRefresh(e, a, t) {
		if (
			1 ===
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)
		) {
			const a = { Type: 2, ItemConfigId: e, Data: void 0 };
			this.Apply(a);
		} else {
			const a = { Data: void 0, Type: 4, ItemConfigId: e };
			this.Apply(a), this.SetToggleInteractive(!1);
		}
	}
	OnCanExecuteChange() {
		return !1;
	}
	OnExtendToggleClicked() {}
}
exports.GachaSmallItemGrid = GachaSmallItemGrid;

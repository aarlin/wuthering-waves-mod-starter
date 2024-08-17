"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CostMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class CostMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	OnRefresh(e, t, o) {
		var i = e.ItemId,
			r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
		if (r) {
			var m = { Type: 4 };
			if (e.OnlyTextFlag)
				(m.Type = 4),
					(m.Data = e),
					(m.ItemConfigId = i),
					(m.StarLevel = r.QualityId),
					(m.BottomText = e.Count.toString());
			else {
				var d = e.SelectedCount,
					a = e.Count;
				let t = "Text_ItemEnoughText_Text";
				d < a && (t = "Text_ItemNotEnoughText_Text"),
					(d = [d, a]),
					(m.Data = e),
					(m.ItemConfigId = i),
					(m.StarLevel = r.QualityId),
					(m.BottomTextId = t),
					(m.BottomTextParameter = d);
			}
			(m.IsOmitBottomText = !1), this.Apply(m);
		}
	}
}
exports.CostMediumItemGrid = CostMediumItemGrid;

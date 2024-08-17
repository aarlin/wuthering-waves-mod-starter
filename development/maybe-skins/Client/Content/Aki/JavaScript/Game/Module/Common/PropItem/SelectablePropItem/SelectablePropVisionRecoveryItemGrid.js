"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectablePropVisionRecoveryItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	SelectablePropMediumItemGrid_1 = require("./SelectablePropMediumItemGrid");
class SelectablePropVisionRecoveryItemGrid extends SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid {
	RefreshUi(e) {
		this.SelectablePropData = e;
		var t,
			o = ModelManager_1.ModelManager.InventoryModel,
			a = e.IncId,
			r = e.ItemId,
			i = e.ItemDataType,
			l = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r);
		let n;
		(n = 0 < a ? o.GetAttributeItemData(a) : o.GetCommonItemData(r)) &&
			((o = this.SelectablePropData.SelectedCount),
			(t = this.SelectablePropData.Count),
			(e = {
				Type: 4,
				Data: e,
				ItemConfigId: r,
				StarLevel: l.QualityId,
				ReduceButtonInfo: { IsVisible: 0 < o, LongPressConfigId: 1 },
			}),
			3 === i
				? ((l = (r =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							a,
						)).GetPhantomLevel()),
					(e.Level = r.GetCost()),
					(e.IsLevelTextUseChangeColor = !0),
					(e.BottomTextId = "VisionLevel"),
					(e.IsDisable = 1 < l),
					(e.BottomTextParameter = [r.GetPhantomLevel()]),
					(e.VisionFetterGroupId = r.GetFetterGroupId()),
					(e.IsOmitBottomText = !0))
				: 0 < o
					? ((e.BottomTextId = "Text_ItemEnoughText_Text"),
						(e.BottomTextParameter = [o, t]))
					: (e.BottomText = t.toString()),
			this.Apply(e));
	}
}
exports.SelectablePropVisionRecoveryItemGrid =
	SelectablePropVisionRecoveryItemGrid;

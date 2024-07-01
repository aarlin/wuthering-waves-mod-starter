"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteAssemblyGridItem = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RouletteAssemblyGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments), (this.Data = void 0);
	}
	OnRefresh(e, t, o) {
		var d = {
			Type: 4,
			QualityType: "MediumItemGridQualitySpritePath",
			Data: e,
			IsOmitBottomText: !1,
		};
		switch (
			((2 === e.GridType ? (d.QualityId = e.QualityId) : (d.QualityId = 1),
			0 !== e.RelativeIndex) && (d.SortIndex = e.RelativeIndex),
			e.GridType)
		) {
			case 0:
				var i = e;
				(d.SpriteIconPath = i.IconPath), (d.BottomTextId = i.Name);
				break;
			case 1:
				(i = e).IconPath.includes("Atlas")
					? (d.SpriteIconPath = i.IconPath)
					: (d.IconPath = i.IconPath),
					(d.BottomTextId = e.Name);
				break;
			case 2:
				i = e;
				(i =
					((d.ItemConfigId = i.Id),
					(d.BottomText = i.ItemNum.toString()),
					ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(
						e.Id,
					))) && ((i = i.GetConfig()), (d.BuffIconType = i.ItemBuffType));
		}
		this.Apply(d), (this.Data.Index = o), this.SetSelected(t);
	}
	OnSelected(e) {
		this.GetItemGridExtendToggle().SetToggleState(1, e);
	}
	OnDeselected(e) {
		this.GetItemGridExtendToggle().SetToggleState(0, e);
	}
}
exports.RouletteAssemblyGridItem = RouletteAssemblyGridItem;

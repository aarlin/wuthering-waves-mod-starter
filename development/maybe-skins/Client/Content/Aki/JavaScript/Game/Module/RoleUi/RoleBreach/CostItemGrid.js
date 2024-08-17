"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CostItemGrid = void 0);
const ItemGridVariantSelect_1 = require("../../Common/ItemGrid/ItemGridVariantSelect"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CostItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t = void 0) {
		super(), (this.Jwt = void 0), t && this.CreateThenShowByActor(t.GetOwner());
	}
	Refresh(t, e, r) {
		this.RefreshBySelectedData(t);
	}
	OnStart() {
		(this.Jwt = new ItemGridVariantSelect_1.ItemGridVariantSelect(
			this.RootItem.GetOwner(),
		)),
			this.Jwt.SetToggleClickEvent((t, e) => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					this.Jwt.GetConfigId(),
				),
					this.Jwt.GetClickToggle().SetToggleState(0, !1);
			}),
			this.Jwt.GetAddButton().RootUIComp.SetUIActive(!1),
			this.Jwt.GetReduceButton().RootUIComp.SetUIActive(!1),
			this.Jwt.RefreshItemShowState(!0);
	}
	RefreshBySelectedData(t) {
		this.Jwt.RefreshByItemId(t.ItemId), this.RefreshCountBySelectedData(t);
	}
	OnBeforeDestroy() {
		this.Jwt?.Destroy();
	}
	RefreshCountBySelectedData(t) {
		var e = t.SelectedCount;
		let r =
			e < (t = t.Count)
				? "Text_ItemNotEnoughText_Text"
				: "Text_ItemEnoughText_Text";
		this.Jwt.RefreshTextDownByTextId(!0, r, e, t);
	}
}
exports.CostItemGrid = CostItemGrid;

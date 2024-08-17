"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonItemSmallItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	LoopScrollSmallItemGrid_1 = require("../SmallItemGrid/LoopScrollSmallItemGrid"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonItemSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	constructor() {
		super(...arguments), (this.Mne = 0);
	}
	OnRefresh(e, t, o) {
		this.Refresh(e);
	}
	Refresh(e) {
		var t = e[0],
			o = e[1];
		if (
			1 ===
			(t =
				((this.Mne = t.ItemId),
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
					this.Mne,
				)))
		) {
			var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
			const t = {
				Data: e,
				ElementId: n.ElementId,
				Type: 2,
				ItemConfigId: this.Mne,
				BottomText: 0 < o ? "" + o : "",
				QualityId: n.QualityId,
			};
			this.Apply(t);
		} else if (3 === t) {
			const t = {
				Data: e,
				Type: 3,
				ItemConfigId: this.Mne,
				BottomText: 0 < o ? "" + o : "",
			};
			this.Apply(t);
		} else {
			const t = {
				Data: e,
				Type: 4,
				ItemConfigId: this.Mne,
				BottomText: 0 < o ? "" + o : "",
			};
			this.Apply(t);
		}
	}
	RefreshByConfigId(e, t, o, n = !1) {
		if (
			((this.Mne = e),
			1 ===
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
					this.Mne,
				))
		) {
			e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
			const i = {
				Data: o,
				Type: 2,
				ItemConfigId: this.Mne,
				BottomText: t && 0 < t ? "" + t : "",
				QualityId: e.QualityId,
				IsReceivedVisible: n,
			};
			this.Apply(i);
		} else {
			const e = {
				Data: o,
				Type: 4,
				ItemConfigId: this.Mne,
				BottomText: t && 0 < t ? "" + t : "",
				IsReceivedVisible: n,
			};
			this.Apply(e);
		}
	}
	OnCanExecuteChange() {
		return !1;
	}
	OnExtendToggleClicked() {
		ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
			this.Mne,
		);
	}
}
exports.CommonItemSmallItemGrid = CommonItemSmallItemGrid;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponReplaceMediumItemGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class WeaponReplaceMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	OnSelected(e) {
		e && this.SetSelected(!0, !0);
	}
	OnDeselected(e) {
		this.SetSelected(!1, !0);
	}
	OnRefresh(e, t, o) {
		var d = e.IncId,
			l = (d =
				ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
					d,
				)).GetWeaponConfig();
		l = {
			Type: 4,
			Data: e,
			ItemConfigId: e.ItemId,
			IsLockVisible: e.GetIsLock(),
			StarLevel: l.QualityId,
			Level: d.GetResonanceLevel(),
			BottomTextId: "Text_LevelShow_Text",
			BottomTextParameter: [d.GetLevel()],
			RoleHeadInfo: { RoleConfigId: e.RoleId },
		};
		this.Apply(l), this.SetSelected(t);
	}
}
exports.WeaponReplaceMediumItemGrid = WeaponReplaceMediumItemGrid;

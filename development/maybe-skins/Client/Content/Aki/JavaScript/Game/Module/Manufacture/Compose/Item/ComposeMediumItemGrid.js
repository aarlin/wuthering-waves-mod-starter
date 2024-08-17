"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	ComposeController_1 = require("../ComposeController");
class ComposeMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
	OnRefresh(e, o, t) {
		var r = e.ItemId,
			i =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(r),
			a = 0 < e.IsUnlock;
		let n = !0;
		switch (e.MainType) {
			case 1:
				n =
					35 === e.SubType ||
					ComposeController_1.ComposeController.CheckCanReagentProduction(r);
				break;
			case 2:
				var l = e;
				n = ComposeController_1.ComposeController.CheckCanStructure(l.ItemId);
				break;
			case 3:
				(l = e),
					(n =
						0 !==
							ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
								l.ItemId,
							).IsUnlock &&
						ComposeController_1.ComposeController.CheckCanPurification(
							l.ItemId,
						));
		}
		i = i.ItemId;
		var m = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
		m &&
			((i = {
				Type: 4,
				Data: e,
				ItemConfigId: i,
				StarLevel: m.QualityId,
				BottomTextId: m.Name,
				IsProhibit: !a,
				IsNewVisible: e.IsNew,
				IsDisable: a && !n,
				IsOmitBottomText: !0,
				IsTimeFlagVisible: 0 < e.ExistEndTime,
			}),
			this.Apply(i),
			this.SetSelected(o));
	}
}
exports.ComposeMediumItemGrid = ComposeMediumItemGrid;

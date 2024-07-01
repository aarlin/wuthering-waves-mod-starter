"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponItemSmallItemGrid = void 0);
const LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class WeaponItemSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	OnRefresh(e, t, l) {
		this.Refresh(e);
	}
	Refresh(e) {
		(e = {
			Type: 4,
			Data: e,
			ItemConfigId: e.GetItemId(),
			BottomTextId: "Text_LevelShow_Text",
			BottomTextParameter: [e.GetLevel()],
		}),
			this.Apply(e);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
}
exports.WeaponItemSmallItemGrid = WeaponItemSmallItemGrid;

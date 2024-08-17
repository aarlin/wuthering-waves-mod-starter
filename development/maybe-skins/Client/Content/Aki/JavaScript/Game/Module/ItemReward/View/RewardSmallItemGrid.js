"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardSmallItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class RewardSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	OnRefresh(e, o, t) {
		var a = e.GetConfig(),
			l = e.ConfigId;
		1 === a.ItemDataType
			? ((a = {
					Data: e,
					Type: 2,
					ItemConfigId: l,
					BottomTextId: (a =
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(l)).Name,
					QualityId: a.QualityId,
				}),
				this.Apply(a))
			: ((a = { Data: e, Type: 4, ItemConfigId: l, BottomText: "x" + e.Count }),
				this.Apply(a));
	}
}
exports.RewardSmallItemGrid = RewardSmallItemGrid;

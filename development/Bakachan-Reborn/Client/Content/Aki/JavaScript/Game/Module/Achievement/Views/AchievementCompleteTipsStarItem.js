"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementCompleteTipsStarItem = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class AchievementCompleteTipsStarItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	Refresh(e, t, r) {
		this.GetItem(0)?.SetUIActive(e);
	}
}
exports.AchievementCompleteTipsStarItem = AchievementCompleteTipsStarItem;

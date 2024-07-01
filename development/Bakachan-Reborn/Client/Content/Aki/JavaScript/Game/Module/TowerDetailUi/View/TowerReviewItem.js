"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerReviewItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class TowerReviewItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	Refresh(e) {
		(e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.AreaName),
			(e = ModelManager_1.ModelManager.TowerModel.GetAreaStars(
				e.Difficulty,
				e.AreaNum,
				!0,
			)),
			this.GetText(1).SetText("" + e);
	}
}
exports.TowerReviewItem = TowerReviewItem;

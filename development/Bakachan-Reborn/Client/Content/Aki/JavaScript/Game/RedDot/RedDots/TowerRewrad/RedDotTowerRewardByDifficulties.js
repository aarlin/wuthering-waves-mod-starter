"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotTowerRewardByDifficulties = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotTowerRewardByDifficulties extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.OnTowerRewardReceived,
			EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
		];
	}
	OnCheck(e) {
		switch (e) {
			case 2:
				return ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(
					2,
				);
			case 1:
				return ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(
					1,
				);
			case 3:
				return ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(
					3,
				);
			case 4:
				var r =
						ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(
							1,
						),
					a =
						ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(
							2,
						);
				return r || a;
			default:
				return !1;
		}
	}
}
exports.RedDotTowerRewardByDifficulties = RedDotTowerRewardByDifficulties;

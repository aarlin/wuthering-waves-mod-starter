"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ModelManager_1 = require("../Manager/ModelManager"),
	LevelGamePlayController_1 = require("./LevelGamePlayController");
class TsLevelGamePlayBridge extends UE.Object {
	UpdateGamePlayTimerBridge(e, l) {}
	GetDragonPoolState(e) {
		return ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
			e,
		);
	}
	ApplyScanEffect(e) {
		LevelGamePlayController_1.LevelGamePlayController.HandleScanResponse(e);
	}
	ClearAllScanEffects() {
		LevelGamePlayController_1.LevelGamePlayController.HandleClearAllScanEffect();
	}
}
exports.default = TsLevelGamePlayBridge;

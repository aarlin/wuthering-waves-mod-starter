"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckTeleportTypeUnlock = void 0);
const TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeleportTypeUnlock extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, r, ...o) {
		return !(
			!e.LimitParams ||
			(ModelManager_1.ModelManager.GameModeModel.IsMulti &&
				ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
					ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) ||
			((e = e.LimitParams.get("TeleportType")),
			TeleporterById_1.configTeleporterById.GetConfig(o[0])?.Type !== Number(e))
		);
	}
}
exports.LevelConditionCheckTeleportTypeUnlock =
	LevelConditionCheckTeleportTypeUnlock;

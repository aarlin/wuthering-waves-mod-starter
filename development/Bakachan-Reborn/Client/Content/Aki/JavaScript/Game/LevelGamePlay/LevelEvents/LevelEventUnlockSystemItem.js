"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventUnlockSystemItem = void 0);
const IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	AchievementController_1 = require("../../Module/Achievement/AchievementController"),
	CookController_1 = require("../../Module/Cook/CookController"),
	HandBookController_1 = require("../../Module/HandBook/HandBookController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUnlockSystemItem extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		e &&
			(e.SystemOption.Type === IAction_1.EUnlockSystemItemType.CookSystem &&
				CookController_1.CookController.SendInteractiveUpdateRequest(
					e.SystemOption?.UnlockOption?.CookBookId,
				),
			e.SystemOption.Type === IAction_1.EUnlockSystemItemType.AtlasSystem &&
				(e.SystemOption.UnlockOption.Type ===
				IAction_1.EUnlockAtlasSystemType.PlotPhoto
					? HandBookController_1.HandBookController.SendIllustratedUnlockRequest(
							7,
							e.SystemOption.UnlockOption.Id,
						)
					: e.SystemOption.UnlockOption.Type ===
							IAction_1.EUnlockAtlasSystemType.GeographicalAtlas &&
						HandBookController_1.HandBookController.SendIllustratedUnlockRequest(
							2,
							e.SystemOption.UnlockOption.Id,
						)),
			e.SystemOption.Type ===
				IAction_1.EUnlockSystemItemType.AchievementSystem) &&
			AchievementController_1.AchievementController.RequestAchievementFinish(
				e.SystemOption.Id,
			);
	}
}
exports.LevelEventUnlockSystemItem = LevelEventUnlockSystemItem;

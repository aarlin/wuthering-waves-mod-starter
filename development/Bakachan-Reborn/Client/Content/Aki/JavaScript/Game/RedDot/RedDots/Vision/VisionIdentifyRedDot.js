"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionIdentifyRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class VisionIdentifyRedDot extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.PhantomLevelUpWithId,
			EventDefine_1.EEventName.OnVisionIdentifyWithId,
			EventDefine_1.EEventName.RefreshVisionIdentifyRedPoint,
		];
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.PhantomBattleModel.CheckVisionIdentifyRedDot(
			e,
		);
	}
}
exports.VisionIdentifyRedDot = VisionIdentifyRedDot;

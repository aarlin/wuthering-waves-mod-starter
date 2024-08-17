"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionOneKeyEquipRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class VisionOneKeyEquipRedDot extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.RefreshVisionEquipRedPoint];
	}
	IsMultiple() {
		return !0;
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.PhantomBattleModel.CheckVisionOneKeyEquipRedDot(
			e,
		);
	}
}
exports.VisionOneKeyEquipRedDot = VisionOneKeyEquipRedDot;

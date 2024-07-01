"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotCookerLevel = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	CookController_1 = require("../../../Module/Cook/CookController"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotCookerLevel extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.UpdateCookerInfo,
			EventDefine_1.EEventName.GetCookData,
			EventDefine_1.EEventName.CookSuccess,
			EventDefine_1.EEventName.MachiningSuccess,
			EventDefine_1.EEventName.UpgradeCookerLevel,
		];
	}
	OnCheck() {
		return CookController_1.CookController.CheckCanGetCookerLevel();
	}
}
exports.RedDotCookerLevel = RedDotCookerLevel;

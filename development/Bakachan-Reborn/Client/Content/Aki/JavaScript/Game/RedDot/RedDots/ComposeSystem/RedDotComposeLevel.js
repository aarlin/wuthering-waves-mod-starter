"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotComposeLevel = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ComposeController_1 = require("../../../Module/Manufacture/Compose/ComposeController"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotComposeLevel extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.UpdateComposeInfo,
			EventDefine_1.EEventName.GetComposeData,
			EventDefine_1.EEventName.ComposeSuccess,
			EventDefine_1.EEventName.UpgradeComposeLevel,
		];
	}
	OnCheck() {
		return ComposeController_1.ComposeController.CheckCanGetComposeLevel();
	}
}
exports.RedDotComposeLevel = RedDotComposeLevel;

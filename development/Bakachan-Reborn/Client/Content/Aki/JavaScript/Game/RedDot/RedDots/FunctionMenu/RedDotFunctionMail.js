"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotFunctionMail = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionMail extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "BattleViewResonanceButton";
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.SwitchUnfinishedFlag,
			EventDefine_1.EEventName.AddingNewMail,
			EventDefine_1.EEventName.OnFunctionOpenUpdateNotify,
		];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.MailModel.GetRedDotCouldLightOn();
	}
}
exports.RedDotFunctionMail = RedDotFunctionMail;

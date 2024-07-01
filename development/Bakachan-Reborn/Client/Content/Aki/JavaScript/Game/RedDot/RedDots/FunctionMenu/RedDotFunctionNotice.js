"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotFunctionNotice = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	RedDotBase_1 = require("../../RedDotBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RedDotFunctionNotice extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "BattleViewResonanceButton";
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh];
	}
	OnCheck() {
		return ControllerHolder_1.ControllerHolder.KuroSdkController.GetPostWebViewRedPointState();
	}
}
exports.RedDotFunctionNotice = RedDotFunctionNotice;

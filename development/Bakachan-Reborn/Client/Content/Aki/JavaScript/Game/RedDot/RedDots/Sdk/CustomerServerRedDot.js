"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CustomerServerRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	RedDotBase_1 = require("../../RedDotBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CustomerServerRedDot extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.SdkCustomerRedPointRefresh];
	}
	OnCheck() {
		return ControllerHolder_1.ControllerHolder.KuroSdkController.GetCustomerServiceRedPointState();
	}
}
exports.CustomerServerRedDot = CustomerServerRedDot;

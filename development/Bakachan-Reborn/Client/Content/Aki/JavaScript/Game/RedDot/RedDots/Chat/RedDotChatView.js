"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotChatView = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotChatView extends RedDotBase_1.RedDotBase {
	OnCheck() {
		return ModelManager_1.ModelManager.ChatModel.HasRedDot();
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.OnRefreshChatRedDot];
	}
}
exports.RedDotChatView = RedDotChatView;

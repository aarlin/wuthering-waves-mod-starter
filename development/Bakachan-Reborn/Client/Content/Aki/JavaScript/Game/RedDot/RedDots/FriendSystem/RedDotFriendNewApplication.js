"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotFriendNewApplication = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotFriendNewApplication extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionFriend";
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
			EventDefine_1.EEventName.UpdateFriendViewShow,
		];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.FriendModel.HasNewFriendApplication();
	}
}
exports.RedDotFriendNewApplication = RedDotFriendNewApplication;

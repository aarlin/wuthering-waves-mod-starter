"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotChatRoom = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotChatRoom extends RedDotBase_1.RedDotBase {
	OnCheck(e) {
		let o;
		return (
			!!(o =
				2 === e
					? ModelManager_1.ModelManager.ChatModel.GetTeamChatRoom()
					: 3 === e
						? ModelManager_1.ModelManager.ChatModel.GetWorldChatRoom()
						: ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(e)) &&
			o.GetIsShowRedDot()
		);
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.OnRefreshChatRoomRedDot];
	}
}
exports.RedDotChatRoom = RedDotChatRoom;

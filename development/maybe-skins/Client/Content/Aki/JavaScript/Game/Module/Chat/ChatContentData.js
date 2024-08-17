"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatContentData = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class ChatContentData {
	constructor(e, t, a, n, s, o, r, i, d, h, l) {
		(this.ContentUniqueId = e),
			(this.SenderPlayerId = t),
			(this.Content = a),
			(this.ContentType = n),
			(this.NoticeType = s),
			(this.IsOfflineMassage = o),
			(this.TimeStamp = r),
			(this.LastTimeStamp = i),
			(this.ChatRoomType = d),
			(this.SenderPlayerName = h),
			(this.SenderPlayerIcon = l);
	}
	IsOwnSend() {
		return (
			ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
			this.SenderPlayerId
		);
	}
}
exports.ChatContentData = ChatContentData;

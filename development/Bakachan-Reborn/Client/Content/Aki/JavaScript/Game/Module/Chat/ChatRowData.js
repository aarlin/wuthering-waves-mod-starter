"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatRowData = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
class ChatRowData {
	constructor(t, e, o, s, i, a, r, n, h, d) {
		(this.UniqueId = 0),
			(this.SenderPlayerId = 0),
			(this.SenderPlayerIcon = void 0),
			(this.SenderPlayerName = void 0),
			(this.TargetPlayerId = void 0),
			(this.Content = ""),
			(this.ContentType = Protocol_1.Aki.Protocol.U3n.nMs),
			(this.ContentChatRoomType = 0),
			(this.IsOfflineMassage = !1),
			(this.TimeStamp = 0),
			(this.IsVisible = !0),
			(this.UniqueId = t),
			(this.SenderPlayerId = e),
			(this.Content = o),
			(this.ContentType = s),
			(this.IsOfflineMassage = i),
			(this.TargetPlayerId = n),
			(this.ContentChatRoomType = a),
			(this.TimeStamp = r),
			(this.SenderPlayerName = h),
			(this.SenderPlayerIcon = d);
	}
}
exports.ChatRowData = ChatRowData;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeamChatRoomBase = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ChatContentData_1 = require("./ChatContentData"),
	ChatRoom_1 = require("./ChatRoom");
class TeamChatRoomBase extends ChatRoom_1.ChatRoom {
	AddHistoryChatContent(t) {
		this.EarliestHistoryContentUniqueId = "";
		var e = [];
		let o;
		for (const m of t) {
			var a = m.SenderPlayerId,
				i = m.Content,
				n = m.ChatContentType,
				r = m.NoticeType;
			let t = 0,
				h =
					((t =
						"number" == typeof (s = m.UtcTime)
							? s
							: s
								? Number(MathUtils_1.MathUtils.LongToBigInt(m.UtcTime))
								: TimeUtil_1.TimeUtil.GetServerTime()),
					0);
			o && (h = o.TimeStamp);
			var s = m.SenderPlayerName,
				C = m.SenderIcon;
			(o = a =
				new ChatContentData_1.ChatContentData(
					"",
					a,
					i,
					n,
					r,
					!0,
					t,
					h,
					this.ChatRoomType,
					s,
					C,
				)),
				e.push(a);
		}
		this.ChatContentList = e.concat(this.ChatContentList);
	}
}
exports.TeamChatRoomBase = TeamChatRoomBase;

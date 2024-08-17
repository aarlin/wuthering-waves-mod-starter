"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatRoom = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ChatContentData_1 = require("./ChatContentData");
class ChatRoom {
	constructor(t, e) {
		(this.ChatRoomType = 0),
			(this.ChatContentList = []),
			(this.VMt = -1),
			(this.HMt = !1),
			(this.Mne = 0),
			(this.EarliestHistoryContentUniqueId = ""),
			(this.R2e = !1),
			(this.LocalSaveMsgLimit = 0),
			(this.ChatCd = 0),
			(this.ChatRoomType = t),
			(this.Mne = e),
			(this.R2e = !1),
			(t = ConfigManager_1.ConfigManager.ChatConfig.GetChatConfig(this.Mne)) &&
				((this.LocalSaveMsgLimit = t.LocalSaveMsgLimit),
				(this.ChatCd = t.ChatCd));
	}
	Reset() {
		(this.ChatContentList.length = 0), (this.VMt = -1), (this.R2e = !1);
	}
	Open() {
		this.R2e ||
			((this.VMt = TimeUtil_1.TimeUtil.GetServerTime()),
			(this.R2e = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, " 打开聊天室", [
					"uniqueId",
					this.GetUniqueId(),
				]));
	}
	Close() {
		this.R2e &&
			((this.ChatContentList.length = 0),
			(this.VMt = -1),
			(this.R2e = !1),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("Chat", 8, " 关闭聊天室", [
				"uniqueId",
				this.GetUniqueId(),
			]);
	}
	GetIsOpen() {
		return this.R2e;
	}
	SetIsShowRedDot(t) {
		this.HMt = t;
	}
	GetIsShowRedDot() {
		return this.HMt;
	}
	GetConfigId() {
		return this.Mne;
	}
	GetUniqueId() {
		return -1;
	}
	GetChatConfig() {
		return ConfigManager_1.ConfigManager.ChatConfig.GetChatConfig(this.Mne);
	}
	GetChatContentList() {
		return this.ChatContentList;
	}
	GetEarliestHistoryContentUniqueId() {
		return this.EarliestHistoryContentUniqueId;
	}
	GetCreateTimeStamp() {
		return this.VMt;
	}
	ClearCreateTime() {
		this.VMt = -1;
	}
	GetLastTimeStamp() {
		var t = this.ChatContentList.length - 1;
		return t < 0 ? 0 : this.ChatContentList[t].TimeStamp;
	}
	AddChatContent(t, e, i, n, o, h, s, a, C, r) {
		return (
			(t = new ChatContentData_1.ChatContentData(
				t,
				e,
				i,
				n,
				o,
				h,
				s,
				a,
				this.ChatRoomType,
				C,
				r,
			)),
			this.ChatContentList.push(t),
			t
		);
	}
	GetLastChatContentData(t = 1) {
		if (!((t = this.ChatContentList.length - t) < 0))
			return this.ChatContentList[t];
	}
	AddHistoryChatContent(t) {
		t.sort((t, e) => {
			var i = t.UtcTime,
				n = e.UtcTime;
			return i && n
				? "number" == typeof i && "number" == typeof n
					? i - n
					: Number(MathUtils_1.MathUtils.LongToBigInt(i)) -
						Number(MathUtils_1.MathUtils.LongToBigInt(n))
				: t.SenderUid - e.SenderUid;
		}),
			(this.EarliestHistoryContentUniqueId = t[0].MsgId);
		var e = [];
		let i;
		for (const r of t) {
			var n = r.SenderUid,
				o = r.Content,
				h = r.ChatContentType,
				s = r.OfflineMsg,
				a = r.MsgId,
				C = r.UtcTime;
			let t = 0,
				g =
					((t =
						"number" == typeof C
							? C
							: C
								? Number(MathUtils_1.MathUtils.LongToBigInt(r.UtcTime))
								: TimeUtil_1.TimeUtil.GetServerTime()),
					0);
			i && (g = i.TimeStamp),
				(i = C =
					new ChatContentData_1.ChatContentData(
						a,
						n,
						o,
						h,
						Protocol_1.Aki.Protocol.FGs.Proto_None,
						s,
						t,
						g,
						this.ChatRoomType,
						void 0,
						void 0,
					)),
				e.push(C);
		}
		this.ChatContentList = e.concat(this.ChatContentList);
	}
}
exports.ChatRoom = ChatRoom;

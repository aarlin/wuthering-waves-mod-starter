"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ChatController_1 = require("./ChatController"),
	ChatDefine_1 = require("./ChatDefine"),
	ChatPlayerData_1 = require("./ChatPlayerData"),
	ChatRowData_1 = require("./ChatRowData"),
	PrivateChatRoom_1 = require("./PrivateChatRoom"),
	TeamChatRoom_1 = require("./TeamChatRoom"),
	WorldTeamChatRoom_1 = require("./WorldTeamChatRoom");
class ChatModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.RMt = new Map()),
			(this.AMt = []),
			(this.PMt = 0),
			(this.xMt = new Map()),
			(this.wMt = void 0),
			(this.BMt = void 0),
			(this.bMt = void 0),
			(this.qMt = []),
			(this.IsOpenedChatView = !1),
			(this.GMt = new Map()),
			(this.ShowTimeDifferent = 0);
	}
	OnInit() {
		return (
			(this.ShowTimeDifferent =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"ShowTimeDifferent",
				)),
			!0
		);
	}
	OnClear() {
		this.SaveChatSaveContent();
		for (const t of this.xMt.values()) t.Reset();
		return (
			this.xMt.clear(),
			(this.AMt.length = 0),
			(this.qMt.length = 0),
			(this.bMt = void 0),
			this.ClearChatPlayerData(),
			!0
		);
	}
	OnLeaveLevel() {
		return this.SaveChatSaveContent(), !0;
	}
	AddChatPlayerData(t) {
		var e = new ChatPlayerData_1.ChatPlayerData(t);
		return this.RMt.set(t, e), e;
	}
	GetChatPlayerData(t) {
		return this.RMt.get(t);
	}
	RefreshChatPlayerData(t, e, o) {
		let a = this.GetChatPlayerData(t);
		var n = (a = a || this.AddChatPlayerData(t)).GetPlayerIcon(),
			h = a.GetPlayerName(),
			r = ModelManager_1.ModelManager.PersonalModel,
			i = r.GetPersonalInfoData();
		i && i.PlayerId === t
			? (a.SetPlayerIcon(r.GetHeadPhotoId()), a.SetPlayerName(i.Name))
			: (a.SetPlayerIcon(e), a.SetPlayerName(o)),
			(n === e && h === o) ||
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChatPlayerInfoChanged,
					t,
				);
	}
	ClearChatPlayerData() {
		this.RMt.clear();
	}
	AddChatContent(t, e, o, a, n, h, r, i, C, s, m) {
		r = t.AddChatContent(e, o, a, n, h, r, i, C, s, m);
		let l = 0,
			v = 0;
		t instanceof PrivateChatRoom_1.PrivateChatRoom
			? ((l = t.GetTargetPlayerId()),
				this.AddAndSavePrivateChatContent(t, n, a, e, !1, o, i),
				(v = 1))
			: t instanceof TeamChatRoom_1.TeamChatRoom
				? (v = 2)
				: t instanceof WorldTeamChatRoom_1.WorldChatRoom && (v = 3),
			o !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
				this.SetChatRoomRedDot(t, !0),
			h === Protocol_1.Aki.Protocol.FGs.Proto_None &&
				this.AddChatRowData(o, a, n, !1, v, i, l, s, m),
			this.NMt(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAddChatContent,
				t,
				r,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshChatRedDot,
			);
	}
	NMt() {
		for (const t of this.xMt.values()) t.ClearCreateTime();
	}
	LoadAllChatSaveContent() {
		var t = LocalStorage_1.LocalStorage.GetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.Chat,
		);
		if (t) {
			var e,
				o,
				a = LocalStorage_1.LocalStorage.GetPlayer(
					LocalStorageDefine_1.ELocalStoragePlayerKey.IsErrorChatReplace,
					!1,
				);
			for ([e, o] of (Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Chat",
					8,
					"加载所有聊天室本地聊天记录时，判断是否已将错误的聊天记录替换",
					["isErrorChatReplace", a],
				),
			t)) {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Chat",
						8,
						"加载所有聊天室本地聊天记录",
						["ChatUniqueId", e],
						["SaveNum", o.ChatRows.length],
					);
				for (const t of o.ChatRows)
					if (
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Chat",
								8,
								"加载所有聊天室本地聊天记录",
								["ChatUniqueId", e],
								["Content", t.Content],
							),
						!a)
					)
						for (const t of o.ChatRows)
							t.Content = t.Content.replace(/'/g, "''");
				var n = Number(e);
				this.GMt.set(n, o);
			}
			a ||
				(LocalStorage_1.LocalStorage.SetPlayer(
					LocalStorageDefine_1.ELocalStoragePlayerKey.Chat,
					this.GMt,
				) &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Chat", 8, "已替换所有错误的聊天信息"),
					LocalStorage_1.LocalStorage.SetPlayer(
						LocalStorageDefine_1.ELocalStoragePlayerKey.IsErrorChatReplace,
						!0,
					)));
		} else
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.IsErrorChatReplace,
				!0,
			);
	}
	AddAndSavePrivateChatContent(t, e, o, a, n, h, r) {
		(e = {
			ChatContentType: e,
			Content: o,
			MsgId: a,
			OfflineMsg: n,
			SenderUid: h,
			UtcTime: r,
		}),
			(o = t.LocalSaveMsgLimit),
			this.AddChatSaveContent(t.GetUniqueId(), e, o),
			this.SaveChatSaveContent();
	}
	AddChatSaveContent(t, e, o) {
		let a = this.GMt.get(t);
		var n;
		a
			? ((n = a.ChatRows).length >= o && n.shift(),
				(e.Content = e.Content.replace(/'/g, "''")),
				n.push(e))
			: ((e.Content = e.Content.replace(/'/g, "''")),
				(a = { ChatRows: [e] }),
				this.GMt.set(t, a)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Chat",
					8,
					"添加本地缓存的聊天记录",
					["chatRoomUniqueId", t],
					["length", a.ChatRows.length],
					["content", e.Content],
				);
	}
	RemoveChatSaveContent(t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Chat", 8, "删除本地缓存的聊天记录", [
				"chatRoomUniqueId",
				t,
			]),
			this.GMt.delete(t),
			this.SaveChatSaveContent();
	}
	SaveChatSaveContent() {
		for (var [t, e] of (Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Chat", 8, "------保存本地缓存的聊天记录-----"),
		this.GMt)) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Chat",
					8,
					"保存的聊天室唯一Id",
					["chatRoomUniqueId", t],
					["length", e.ChatRows.length],
				);
			for (const t of e.ChatRows)
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Chat",
						8,
						"保存的聊天室本地聊天记录",
						["content", t.Content],
						["uniqueId", t.MsgId],
					);
		}
		var o = LocalStorage_1.LocalStorage.SetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.Chat,
			this.GMt,
		);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Chat", 8, "------保存本地缓存的聊天记录结束-----", [
				"bSuccess",
				o,
			]);
	}
	GetChatRoomSaveInfo(t, e, o) {
		if ((t = this.GMt.get(t))) {
			var a = t.ChatRows;
			let h = -1;
			for (let t = a.length - 1; 0 < t; t--) {
				var n = a[t];
				if (n) {
					if (n.MsgId === e) {
						h = t;
						break;
					}
					n.Content = n.Content.replace(/''/g, "'");
				}
			}
			if (!(h < 0)) return (t = Math.max(0, h - o)), a.slice(t, h);
		}
	}
	RequestPrivateRoomLocalHistory(t) {
		var e = t.GetUniqueId(),
			o = t.GetEarliestHistoryContentUniqueId();
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Chat",
					8,
					"===开始请求私人本地历史聊天记录===",
					["chatUniqueId", e],
					["fromContentUniqueId", o],
				),
			!StringUtils_1.StringUtils.IsEmpty(o))
		)
			if (
				(e = this.GetChatRoomSaveInfo(e, o, ChatDefine_1.READ_HISTORY_COUNT))
			) {
				var a = [];
				for (const t of e) {
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Chat", 8, "读取本地聊天记录:", [
							"content",
							t.Content,
						]);
					var n = new Protocol_1.Aki.Protocol.BGs();
					(n.U3n = t.ChatContentType),
						(n.H3n = t.Content),
						(n.X3n = t.MsgId),
						(n.z3n = t.OfflineMsg),
						(n.Y3n = t.SenderUid),
						(n.J3n = t.UtcTime),
						a.push(n);
				}
				this.AddPrivateHistoryChatContent(t, a);
			} else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Chat", 8, "本地记录读取已读取结束");
	}
	AddChatRowData(t, e, o, a, n, h, r, i, C, s = !0) {
		this.OMt(t, e, o, a, n, h, r, i, C),
			s && this.AMt.length > ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE && this.kMt();
	}
	SortChatRowData() {
		this.AMt.sort((t, e) => t.TimeStamp - e.TimeStamp);
	}
	ClampChatRowDataListLength() {
		var t = this.AMt.length;
		t <= ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE ||
			(this.AMt = this.AMt.slice(
				Math.max(t - ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE, 0),
			));
	}
	SetTeamChatRowDataVisible(t) {
		for (const o of this.AMt) {
			var e = o.ContentChatRoomType;
			(2 !== e && 3 !== e) || (o.IsVisible = t);
		}
	}
	OMt(t, e, o, a, n, h, r, i, C) {
		(t = new ChatRowData_1.ChatRowData(this.PMt++, t, e, o, a, n, h, r, i, C)),
			this.AMt.push(t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnPushChatRowData,
				t,
			);
	}
	ClearChatRowData() {
		this.AMt.length = 0;
	}
	RemoveChatRowDataByChatRoomType(...t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Chat",
				8,
				"[ChatDebug]删除主界面聊天数据---开始",
				["chatRoomType", t],
				["chatRowDataListLength", this.AMt.length],
			);
		var e = [];
		for (let a = 0; a < this.AMt.length; a++) {
			var o = this.AMt[a];
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Chat",
					8,
					"[ChatDebug]删除主界面聊天数据---打印当前聊天记录",
					["Content", o.Content],
					["TimeStamp", o.TimeStamp],
				),
				t.includes(o.ContentChatRoomType) && e.push(a);
		}
		for (const t of e) this.AMt.splice(t, 1);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Chat",
				8,
				"[ChatDebug]删除主界面聊天数据---结束",
				["removeIndexList", e],
				["chatRowDataListLength", this.AMt.length],
			);
	}
	kMt() {
		var t = this.AMt.shift();
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnPopChatRowData,
			t,
		);
	}
	GetChatRowDataList() {
		return this.AMt;
	}
	HasOfflineMassage() {
		for (const t of this.AMt) if (t.IsOfflineMassage) return !0;
		return !1;
	}
	AddPrivateHistoryChatContent(t, e) {
		var o = [];
		for (const t of e) {
			var a = t.Y3n,
				n = {
					UtcTime: t.J3n,
					MsgId: t.X3n,
					SenderUid: a,
					Content: t.H3n,
					ChatContentType: t.U3n,
					OfflineMsg: t.z3n,
				};
			(n =
				(o.push(n),
				ModelManager_1.ModelManager.FriendModel?.GetFriendById(a))) &&
				this.RefreshChatPlayerData(a, n.PlayerHeadPhoto, n.PlayerName);
		}
		t.AddHistoryChatContent(o),
			t.Open(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
				t,
			);
	}
	AddTeamHistoryChatContent(t, e) {
		var o = [];
		for (const t of e) {
			var a = {
				SenderPlayerId: t.uEs,
				SenderPlayerName: t.dEs,
				UtcTime: t.CEs,
				SenderIcon: t.cEs,
				Content: t.H3n,
				ChatContentType: t.U3n,
				NoticeType: t.mEs,
			};
			o.push(a);
		}
		t.AddHistoryChatContent(o),
			t.Open(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
				t,
			);
	}
	JoinChatRoom(t) {
		if (
			(this.SetChatRoomRedDot(t, !1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, " 加入聊天室", ["UniqueId", t.GetUniqueId()]),
			t.GetIsOpen())
		)
			(this.bMt = t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnJoinChatRoom,
					t,
				);
		else if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
			if (!t.CanChat())
				return void (
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Chat",
						8,
						" 加入私人聊天室时，对应好友在黑名单或不在好友列表中，无法加入聊天室",
						["UniqueId", t.GetUniqueId()],
					)
				);
			(this.bMt = t), this.RequestOpenPrivateChatRoom(t);
		} else (this.bMt = t), this.RequestOpenChatRoom(t);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnRefreshChatRedDot,
		);
	}
	LeaveCurrentChatRoom() {
		this.bMt = void 0;
	}
	RemovePrivateChatRoom(t) {
		this.bMt instanceof PrivateChatRoom_1.PrivateChatRoom &&
			this.bMt.GetTargetPlayerId() === t &&
			this.LeaveCurrentChatRoom();
		var e = this.GetPrivateChatRoom(t);
		e &&
			(e.Reset(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, " 删除私人聊天室", ["PlayerId", t]),
			this.xMt.delete(t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRemovePrivateChatRoom,
				t,
			));
	}
	ClosePrivateChatRoom(t) {
		this.bMt instanceof PrivateChatRoom_1.PrivateChatRoom &&
			this.bMt.GetTargetPlayerId() === t &&
			(this.bMt = void 0);
		var e = this.GetPrivateChatRoom(t);
		e &&
			(e.Close(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, " 关闭私人聊天室", ["PlayerId", t]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnClosePrivateChatRoom,
				t,
			));
	}
	RequestOpenPrivateChatRoom(t) {
		var e;
		t.GetIsOpen() ||
			((e = t.GetTargetPlayerId()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, " 请求打开私人聊天室", ["PlayerId", e]),
			t.Open(),
			ChatController_1.ChatController.PrivateChatHistoryRequest(e),
			this.SetChatRoomRedDot(t, !0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnOpenChatRoom,
				t,
			));
	}
	RequestOpenChatRoom(t) {
		t.GetIsOpen() ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, " 请求打开队伍/联机聊天室 "),
			t.Open(),
			this.SetChatRoomRedDot(t, !0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnOpenChatRoom,
				t,
			));
	}
	SetChatRoomRedDot(t, e) {
		t &&
			t.GetIsShowRedDot() !== e &&
			this.GetJoinedChatRoom()?.GetUniqueId() !== t.GetUniqueId() &&
			(t.SetIsShowRedDot(e),
			t instanceof PrivateChatRoom_1.PrivateChatRoom
				? ((e = t.GetTargetPlayerId()),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnRefreshChatRoomRedDot,
						e,
					))
				: t instanceof TeamChatRoom_1.TeamChatRoom
					? EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnRefreshChatRoomRedDot,
							2,
						)
					: t instanceof WorldTeamChatRoom_1.WorldChatRoom &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnRefreshChatRoomRedDot,
							3,
						));
	}
	GetJoinedChatRoom() {
		return this.bMt;
	}
	HasRedDot() {
		for (const t of this.xMt.values()) if (t.GetIsShowRedDot()) return !0;
		return !!this.wMt?.GetIsShowRedDot() || !!this.BMt?.GetIsShowRedDot();
	}
	TryGetPrivateChatRoom(t) {
		let e = this.GetPrivateChatRoom(t);
		return e || this.NewPrivateChatRoom(t);
	}
	NewPrivateChatRoom(t) {
		var e = new PrivateChatRoom_1.PrivateChatRoom(t, 1);
		return (
			this.xMt.set(t, e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnCreatePrivateChatRoom,
				t,
			),
			e
		);
	}
	NewTeamChatRoom() {
		return (this.wMt = new TeamChatRoom_1.TeamChatRoom(2)), this.wMt;
	}
	NewWorldChatRoom() {
		return (this.BMt = new WorldTeamChatRoom_1.WorldChatRoom(2)), this.BMt;
	}
	SelectedPrivateChatFriend(t) {
		(t = this.TryGetPrivateChatRoom(t)).CanChat() && this.JoinChatRoom(t);
	}
	GetPrivateChatRoom(t) {
		return this.xMt.get(t);
	}
	GetTeamChatRoom() {
		return this.wMt;
	}
	SetTeamChatRoom(t) {
		this.wMt = t;
	}
	GetWorldChatRoom() {
		return this.BMt;
	}
	SetWorldChatRoom(t) {
		this.BMt = t;
	}
	GetAllSortedChatRoom() {
		var t = [];
		for (const e of this.xMt.values())
			e.GetIsOpen() && e.CanChat() && t.push(e);
		t.sort((t, e) => {
			var o = t.GetLastTimeStamp(),
				a = e.GetLastTimeStamp();
			return 0 === o
				? -1
				: 0 === a
					? 1
					: o !== a
						? a - o
						: e.GetCreateTimeStamp() - t.GetCreateTimeStamp();
		});
		var e = this.GetTeamChatRoom();
		return (e || (e = this.GetWorldChatRoom())) && t.unshift(e), t;
	}
	IsInPrivateChatRoom(t) {
		return !!(t = this.GetPrivateChatRoom(t)) && t.GetIsOpen();
	}
	AddMutePlayer(t) {
		this.qMt.push(t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAddMutePlayer,
				t,
			);
	}
	RemoveMutePlayer(t) {
		var e = this.qMt.indexOf(t);
		e < 0 ||
			(this.qMt.splice(e, 1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				t,
			));
	}
	ClearAllMutePlayer() {
		this.qMt.length = 0;
	}
	IsInMute(t) {
		return 0 <= this.qMt.indexOf(t);
	}
}
exports.ChatModel = ChatModel;

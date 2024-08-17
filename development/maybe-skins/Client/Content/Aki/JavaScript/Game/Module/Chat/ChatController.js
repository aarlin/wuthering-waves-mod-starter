"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	PrivateChatRoom_1 = require("./PrivateChatRoom");
class ChatController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.LocalStorageInitPlayerId,
			this.mMt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSelectChatFriend,
				this.dMt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenView,
				this.UKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnEnterTeam,
				this.oJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLeaveTeam,
				this.aJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnEnterOnlineWorld,
				this.sJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLeaveOnlineWorld,
				this.hJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveFriend,
				this.CMt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ResetModuleByResetToBattleView,
				this.gMt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnGetFriendInitData,
				this.fMt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged,
				this.pMt,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.LocalStorageInitPlayerId,
			this.mMt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSelectChatFriend,
				this.dMt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenView,
				this.UKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnEnterTeam,
				this.oJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLeaveTeam,
				this.aJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnEnterOnlineWorld,
				this.sJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLeaveOnlineWorld,
				this.hJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveFriend,
				this.CMt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ResetModuleByResetToBattleView,
				this.gMt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnGetFriendInitData,
				this.fMt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged,
				this.pMt,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(8381, this.vMt),
			Net_1.Net.Register(5934, this.MMt),
			Net_1.Net.Register(29682, this.SMt),
			Net_1.Net.Register(26239, this.EMt),
			Net_1.Net.Register(25651, this.yMt),
			Net_1.Net.Register(15658, this.IMt);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(8381),
			Net_1.Net.UnRegister(5934),
			Net_1.Net.UnRegister(29682),
			Net_1.Net.UnRegister(26239),
			Net_1.Net.UnRegister(25651),
			Net_1.Net.UnRegister(15658);
	}
	static PrivateChatRequest(e, t, o) {
		o ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Chat", 8, "PrivateChatRequest 私聊对象玩家Id不存在", [
					"targetPlayerId",
					o,
				]));
		var a = new Protocol_1.Aki.Protocol.VQn();
		(a.U3n = e),
			(a.H3n = t),
			(a.j3n = o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, "PrivateChatRequest 客户端请求私聊聊天", [
					"request",
					a,
				]),
			Net_1.Net.Call(9288, Protocol_1.Aki.Protocol.VQn.create(a), (t) => {
				var o,
					a,
					n,
					r,
					l = ModelManager_1.ModelManager.ChatModel,
					i = t.j3n,
					s = t.lkn;
				s !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							s,
							26040,
						)
					: ((s = t.X3n),
						(o = t.rEs),
						(a = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
						(n = TimeUtil_1.TimeUtil.GetServerTime()),
						(r = (i = l.GetPrivateChatRoom(i)).GetLastTimeStamp()),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Chat",
								8,
								"PrivateChatResponse 私聊聊天服务端回应",
								["response", t],
							),
						l.AddChatContent(
							i,
							s,
							a,
							o,
							e,
							Protocol_1.Aki.Protocol.FGs.Proto_None,
							!1,
							n,
							r,
						),
						(t = ModelManager_1.ModelManager.FriendModel?.GetFriendById(a)) &&
							l.RefreshChatPlayerData(a, t.PlayerHeadPhoto, t.PlayerName),
						ChatController.PrivateChatOperateRequest(
							Protocol_1.Aki.Protocol.GGs.Proto_ReadMsg,
							0,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnRefreshChatRowData,
							!1,
						));
			});
	}
	static ChannelChatRequest(e, t, o) {
		var a = new Protocol_1.Aki.Protocol.tXn();
		(a.W3n = Protocol_1.Aki.Protocol.OGs.Proto_Team),
			(a.K3n = o),
			(a.U3n = e),
			(a.H3n = t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, "ChannelChatRequest 客户端请求队伍聊天", [
					"request",
					a,
				]),
			Net_1.Net.Call(1422, Protocol_1.Aki.Protocol.tXn.create(a), (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							12381,
						)
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Chat", 8, "ChannelChatRequest 队伍聊天服务端回应", [
							"response",
							e,
						]);
			});
	}
	static PrivateChatHistoryRequest(e) {
		var t = new Protocol_1.Aki.Protocol.jQn();
		(t.j3n = e),
			(this.IsInRequestHistory = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Chat",
					8,
					"PrivateChatHistoryRequest 客户端请求最近的私聊记录",
					["request", t],
				),
			Net_1.Net.Call(21736, Protocol_1.Aki.Protocol.jQn.create(t), (t) => {
				var o, a, n;
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Chat",
						8,
						"PrivateChatHistoryResponse 私聊聊天历史服务端回应",
						["response", t],
					),
					t.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
						((ChatController.IsInRequestHistory = !1),
						(o = ModelManager_1.ModelManager.ChatModel),
						(a = (t = t.Kkn).j3n)) &&
						(a = o.GetPrivateChatRoom(a)) &&
						(n = t.nEs) &&
						!(n.length <= 0) &&
						(o.AddPrivateHistoryChatContent(a, t.nEs),
						ChatController.PrivateChatOperateRequest(
							Protocol_1.Aki.Protocol.GGs.Proto_OpenChat,
							e,
						));
			});
	}
	static ChatMutePlayerRequest(e, t) {
		var o = new Protocol_1.Aki.Protocol.YQn();
		(o.j3n = e),
			(o.Q3n = t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, "ChatMutePlayerRequest 客户端请求屏蔽", [
					"request",
					o,
				]),
			Net_1.Net.Call(4045, Protocol_1.Aki.Protocol.YQn.create(o), this.LMt),
			t
				? ModelManager_1.ModelManager.ChatModel.AddMutePlayer(e)
				: ModelManager_1.ModelManager.ChatModel.RemoveMutePlayer(e);
	}
	static ChatReportPush(e) {}
	static PrivateChatOperateRequest(e, t) {
		var o = new Protocol_1.Aki.Protocol.zQn();
		(o.lFn = e),
			(o.$3n = t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Chat",
					8,
					"PrivateChatOperateRequest 客户端请求聊天操作",
					["request", o],
				),
			Net_1.Net.Call(10862, Protocol_1.Aki.Protocol.zQn.create(o), this.DMt),
			e === Protocol_1.Aki.Protocol.GGs.Proto_CloseChat &&
				ModelManager_1.ModelManager.ChatModel.ClosePrivateChatRoom(t);
	}
	static OpenFriendChat(e) {
		ModelManager_1.ModelManager.ChatModel.SelectedPrivateChatFriend(e),
			UiManager_1.UiManager.OpenView("ChatView");
	}
	static TryActiveDeleteFriendTips(e) {
		var t;
		UiManager_1.UiManager.IsViewShow("ChatView") &&
			(t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom()) &&
			t instanceof PrivateChatRoom_1.PrivateChatRoom &&
			t.GetTargetPlayerId() === e &&
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"DeleteFriendText",
			);
	}
}
((exports.ChatController = ChatController).IsInRequestHistory = !1),
	(ChatController.gMt = () => {
		UiManager_1.UiManager.IsViewShow("ChatView") &&
			UiManager_1.UiManager.CloseView("ChatView");
	}),
	(ChatController.mMt = () => {
		ModelManager_1.ModelManager.ChatModel.LoadAllChatSaveContent();
	}),
	(ChatController.dMt = (e) => {
		ModelManager_1.ModelManager.ChatModel.SelectedPrivateChatFriend(e);
	}),
	(ChatController.UKe = (e) => {
		"ChatView" === e &&
			(ModelManager_1.ModelManager.ChatModel.IsOpenedChatView = !0);
	}),
	(ChatController.$Ge = (e) => {
		"ChatView" === e &&
			ModelManager_1.ModelManager.ChatModel.SaveChatSaveContent();
	}),
	(ChatController.sJe = () => {
		ModelManager_1.ModelManager.ChatModel.GetWorldChatRoom() ||
			ModelManager_1.ModelManager.ChatModel.SetWorldChatRoom(
				ModelManager_1.ModelManager.ChatModel.NewWorldChatRoom(),
			);
	}),
	(ChatController.hJe = () => {
		var e = ModelManager_1.ModelManager.ChatModel,
			t =
				(e.SetWorldChatRoom(void 0),
				e.SetTeamChatRowDataVisible(!1),
				e.GetWorldChatRoom());
		t && e.SetChatRoomRedDot(t, !1),
			UiManager_1.UiManager.IsViewShow("ChatView") &&
				UiManager_1.UiManager.CloseView("ChatView");
	}),
	(ChatController.oJe = () => {
		var e = ModelManager_1.ModelManager.ChatModel;
		e.SetTeamChatRoom(e.NewTeamChatRoom());
	}),
	(ChatController.aJe = () => {
		var e = ModelManager_1.ModelManager.ChatModel,
			t =
				(e.SetTeamChatRoom(void 0),
				e.SetTeamChatRowDataVisible(!1),
				e.GetTeamChatRoom());
		t && e.SetChatRoomRedDot(t, !1),
			UiManager_1.UiManager.IsViewShow("ChatView") &&
				UiManager_1.UiManager.CloseView("ChatView");
	}),
	(ChatController.CMt = (e) => {
		var t = ModelManager_1.ModelManager.ChatModel;
		t.RemovePrivateChatRoom(e), t.RemoveChatSaveContent(e);
	}),
	(ChatController.vMt = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Chat", 8, "PrivateMessageNotify 私聊聊天服务端通知", [
				"notify",
				e,
			]);
		var t = ModelManager_1.ModelManager.ChatModel,
			o = (e = e.oEs).Y3n,
			a = t.TryGetPrivateChatRoom(o),
			n = e.X3n,
			r = Number(MathUtils_1.MathUtils.LongToBigInt(e.J3n)),
			l = ((r = Number(r)), e.H3n),
			i = e.U3n,
			s = ModelManager_1.ModelManager.FriendModel?.GetFriendById(o);
		s && t.RefreshChatPlayerData(o, s.PlayerHeadPhoto, s.PlayerName),
			a.GetIsOpen()
				? ((s = e.z3n),
					(e = a.GetLastTimeStamp()),
					t.AddChatContent(
						a,
						n,
						o,
						l,
						i,
						Protocol_1.Aki.Protocol.FGs.Proto_None,
						s,
						r,
						e,
					))
				: (t.RequestOpenPrivateChatRoom(a),
					t.AddChatRowData(o, l, i, !1, 1, r, o),
					t.AddAndSavePrivateChatContent(a, i, l, n, !1, o, r)),
			ChatController.PrivateChatOperateRequest(
				Protocol_1.Aki.Protocol.GGs.Proto_ReadMsg,
				0,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshChatRowData,
				!1,
			);
	}),
	(ChatController.MMt = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Chat", 8, "ChannelChatMessageNotify 队伍聊天服务端通知", [
				"notify",
				e,
			]);
		var t,
			o,
			a,
			n,
			r,
			l,
			i,
			s = ModelManager_1.ModelManager.ChatModel;
		let C, h;
		(h =
			e.K3n === Protocol_1.Aki.Protocol.kGs.Proto_MatchTeam
				? ((C = s.GetTeamChatRoom()), "TeamMatch")
				: ((C = s.GetWorldChatRoom()), "TeamWorld")),
			C &&
				((t = TimeUtil_1.TimeUtil.GetServerTime()),
				(o = (e = e._Es).uEs),
				(a = e.H3n),
				(n = e.U3n),
				(r = e.mEs),
				(l = C.GetLastTimeStamp()),
				(i = e.dEs),
				(e = e.cEs),
				s.AddChatContent(C, h, o, a, n, r, !0, t, l, i, e),
				s.RefreshChatPlayerData(o, e, i),
				r !== Protocol_1.Aki.Protocol.FGs.Proto_EnterTeam) &&
				r !== Protocol_1.Aki.Protocol.FGs.Proto_ExitTeam &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnRefreshChatRowData,
					!1,
				);
	}),
	(ChatController.SMt = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Chat",
				8,
				"PrivateChatHistoryNotify 服务端推送最近的私人聊天历史记录",
			);
		var t = ModelManager_1.ModelManager.ChatModel;
		t.RemoveChatRowDataByChatRoomType(1);
		for (const h of e.hEs) {
			var o = h.j3n,
				a = t.TryGetPrivateChatRoom(o),
				n = h.nEs;
			a.Reset(), t.AddPrivateHistoryChatContent(a, n);
			for (const e of n) {
				var r = e.Y3n,
					l = e.H3n,
					i = e.U3n,
					s = e.z3n,
					C = Number(MathUtils_1.MathUtils.LongToBigInt(e.J3n));
				s && a && t.SetChatRoomRedDot(a, !0),
					t.AddChatRowData(r, l, i, s, 1, C, o, void 0, void 0, !1);
			}
		}
		t.SortChatRowData(), t.ClampChatRowDataListLength();
		for (const e of t.GetChatRowDataList())
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Chat",
					8,
					"[ChatDebug]PrivateChatHistoryNotify---打印最终聊天数据",
					["Content", e.Content],
					["TimeStamp", e.TimeStamp],
					["IsOfflineMassage", e.IsOfflineMassage],
				);
		ChatController.PrivateChatOperateRequest(
			Protocol_1.Aki.Protocol.GGs.Proto_ReadMsg,
			0,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshChatRowData,
				!0,
			);
	}),
	(ChatController.EMt = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Chat",
				8,
				"ChannelChatHistoryNotify 服务端推送最近的队伍聊天历史记录",
			);
		var t = ModelManager_1.ModelManager.ChatModel;
		let o, a;
		if (
			(t.RemoveChatRowDataByChatRoomType(2, 3),
			(o =
				e.K3n === Protocol_1.Aki.Protocol.kGs.Proto_MatchTeam
					? ((a = 2), t.GetTeamChatRoom())
					: ((a = 3), t.GetWorldChatRoom())))
		) {
			(e = e.gEs), t.AddTeamHistoryChatContent(o, e);
			for (const o of e) {
				var n = o.uEs,
					r = o.H3n,
					l = o.U3n,
					i = o.mEs,
					s = o.dEs,
					C = o.cEs,
					h = Number(MathUtils_1.MathUtils.LongToBigInt(o.CEs));
				t.RefreshChatPlayerData(n, C, s),
					i === Protocol_1.Aki.Protocol.FGs.Proto_None &&
						t.AddChatRowData(n, r, l, !0, a, h, 0, s, C);
			}
			t.SortChatRowData(), t.ClampChatRowDataListLength();
			for (const e of t.GetChatRowDataList())
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Chat",
						8,
						"[ChatDebug]ChannelChatHistoryNotify---打印最终聊天数据",
						["Content", e.Content],
						["TimeStamp", e.TimeStamp],
						["IsOfflineMassage", e.IsOfflineMassage],
					);
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshChatRowData,
				!0,
			);
		}
	}),
	(ChatController.yMt = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Chat", 8, "ChatMutePlayerListNotify 服务端通知屏蔽列表", [
				"notify",
				e,
			]);
		var t = ModelManager_1.ModelManager.ChatModel;
		t.ClearAllMutePlayer();
		for (const o of e.aFn) t.AddMutePlayer(o);
	}),
	(ChatController.LMt = (e) => {
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Chat", 8, "ChatMutePlayerResponse 服务端屏蔽回应", [
					"response",
					e,
				]),
			(e = e.lEs) && 0 !== e.length)
		) {
			var t = ModelManager_1.ModelManager.ChatModel;
			for (const o of e) t.RemoveMutePlayer(o);
		}
	}),
	(ChatController.IMt = (e) => {
		var t = MathUtils_1.MathUtils.LongToBigInt(e.lfs);
		t = TimeUtil_1.TimeUtil.GetCountDownData(
			Number(t) - TimeUtil_1.TimeUtil.GetServerTime(),
		);
		ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
			"BanChatText" + e._fs,
			t.CountDownText,
		);
	}),
	(ChatController.DMt = (e) => {
		e.lkn !== Protocol_1.Aki.Protocol.lkn.Proto_ErrBanChatDefault &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Chat", 8, "PrivateChatOperateResponse 聊天操作回应", [
				"response",
				e,
			]);
	}),
	(ChatController.fMt = () => {
		var e = new Protocol_1.Aki.Protocol.QQn();
		Net_1.Net.Call(26302, e, (e) => {
			e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					26302,
				);
		});
	}),
	(ChatController.pMt = (e) => {
		var t = e.aFn,
			o = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(t);
		if (o) {
			switch (e.TIs) {
				case Protocol_1.Aki.Protocol.rFs.Proto_Head:
					o.SetPlayerIcon(e.Z3n);
					break;
				case Protocol_1.Aki.Protocol.rFs.e4n:
					o.SetPlayerName(e.t4n);
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnChatPlayerInfoChanged,
				t,
			);
		}
	});

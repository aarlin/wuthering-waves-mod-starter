"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FriendController = exports.FriendItemSt = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ChatController_1 = require("../Chat/ChatController"),
	LoginDefine_1 = require("../Login/Data/LoginDefine"),
	FriendDefine_1 = require("./Data/FriendDefine"),
	FriendData_1 = require("./FriendData"),
	CHECKGAP = 3e4,
	APPLYFRIENDCD = 1e3,
	SERVERREQUESTCD = 2500;
class FriendItemSt {
	constructor() {
		(this.Id = 0), (this.OperationType = 0);
	}
}
exports.FriendItemSt = FriendItemSt;
class FriendController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
	}
	static OnClear() {
		return (
			this.OnRemoveEvents(),
			this.OnUnRegisterNetEvent(),
			this.RVt(),
			(this.UVt = !1),
			!(this.AVt = !1)
		);
	}
	static CFe() {
		this.RVt(),
			(FriendController.PVt = TimerSystem_1.TimerSystem.Forever(
				FriendController.xVt,
				3e4,
			));
	}
	static RVt() {
		void 0 !== FriendController.PVt &&
			(TimerSystem_1.TimerSystem.Remove(FriendController.PVt),
			(FriendController.PVt = void 0));
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ChangeModeFinish,
			FriendController.nye,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				FriendController.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				FriendController.w4e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RedDotStart,
				FriendController.wVt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.LoadTestFriendsByGm,
				FriendController.BVt,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ChangeModeFinish,
			FriendController.nye,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				FriendController.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				FriendController.w4e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RedDotStart,
				FriendController.wVt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LoadTestFriendsByGm,
				FriendController.BVt,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(25119, FriendController.bVt),
			Net_1.Net.Register(13950, FriendController.qVt),
			Net_1.Net.Register(27961, FriendController.GVt),
			Net_1.Net.Register(13975, FriendController.NVt);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(25119),
			Net_1.Net.UnRegister(13950),
			Net_1.Net.UnRegister(27961),
			Net_1.Net.UnRegister(13975);
	}
	static RequestFriendApplyAddSend(e, o) {
		if (
			0 !== FriendController.OVt &&
			Time_1.Time.Now - FriendController.OVt <= 1e3
		)
			return;
		this.OVt = Time_1.Time.Now;
		const r = new Protocol_1.Aki.Protocol.wZn();
		(r.Ekn = e),
			(r.n5n = o),
			Net_1.Net.Call(17750, r, (e) => {
				if (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Friend", 28, "协议接收", [
							"协议id",
							"9408" + Protocol_1.Aki.Protocol.xZn.name,
						]),
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
				) {
					if (
						e.lkn ===
						Protocol_1.Aki.Protocol.lkn.Proto_ErrReceiverApplyListCountMax
					)
						return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"RecipientFriendListFull",
						);
					if (e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrFriendApplySended)
						return (
							ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(
								r.Ekn,
							),
							ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"FriendApplicationSent",
							),
							void EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.ApplicationSent,
								r.Ekn,
							)
						);
					if (
						e.lkn ===
						Protocol_1.Aki.Protocol.lkn.Proto_ErrAlreadyOnFriendApplyList
					)
						return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"FriendApplicationSent",
						);
					if (e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrIsBlockedPlayer)
						return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"IsBlockedPlayer",
						);
					if (e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrYouAreBlocked)
						return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"YouAreBlocked",
						);
					if (
						e.lkn ===
						Protocol_1.Aki.Protocol.lkn.Proto_ErrFriendApplyRequestLimit
					)
						return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"ApplicationTimesLimit",
						);
					if (
						e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrAlreadyOnFriendList
					)
						return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"AlreadyOnFriendList",
						);
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						27691,
					);
				}
				ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(
					r.Ekn,
				),
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"FriendApplicationSent",
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ApplicationSent,
						r.Ekn,
					);
			});
	}
	static RequestFriendApplyHandle(e, o) {
		const r = new Protocol_1.Aki.Protocol.bZn();
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Friend", 28, "协议接收", ["数据长度", e.length]),
			0 === e.length
				? (EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.FriendApplicationListUpdate,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
					))
				: ((r.j4n = e),
					(r.s5n = o),
					Net_1.Net.Call(23056, r, (n) => {
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Friend", 28, "协议接收", [
								"协议id",
								"9410" + Protocol_1.Aki.Protocol.BZn.name,
							]);
						let t = FriendController.kVt(n.lkn);
						var l = 1 < r.j4n.length;
						let i = 0;
						if (r.s5n === Protocol_1.Aki.Protocol.xks.Proto_Approve)
							for (const e of Object.keys(n._Rs)) {
								var d,
									a = n._Rs[e];
								a === Protocol_1.Aki.Protocol.lkn.Sys
									? (d =
											ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
												Number(e),
											)) && ModelManager_1.ModelManager.FriendModel.AddFriend(d)
									: "" === t && (t = FriendController.kVt(a));
							}
						for (const e of Object.keys(n._Rs)) {
							var _ = n._Rs[e];
							_ === Protocol_1.Aki.Protocol.lkn.Sys
								? (i++,
									ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(
										Number(e),
									),
									r.s5n === Protocol_1.Aki.Protocol.xks.Proto_Approve
										? ModelManager_1.ModelManager.FriendModel.AddPlayerToApproveFriendList(
												Number(e),
											)
										: r.s5n === Protocol_1.Aki.Protocol.xks.Proto_Reject &&
											ModelManager_1.ModelManager.FriendModel.AddPlayerToRefuseFriendList(
												Number(e),
											))
								: "" === t && (t = FriendController.kVt(_));
						}
						"" === t ||
							(l && 0 !== i) ||
							ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								t,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.FriendApplicationListUpdate,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
							),
							o === Protocol_1.Aki.Protocol.xks.Proto_Reject
								? EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.ApplicationHandled,
										3,
										e,
									)
								: o === Protocol_1.Aki.Protocol.xks.Proto_Approve &&
									EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.ApplicationHandled,
										2,
										e,
									);
					}));
	}
	static kVt(e) {
		return e !== Protocol_1.Aki.Protocol.lkn.Sys
			? e === Protocol_1.Aki.Protocol.lkn.Proto_ErrInitiatorFriendListCountMax
				? "ApplicantFriendListFull"
				: e === Protocol_1.Aki.Protocol.lkn.Proto_ErrFriendListCountMax
					? "FriendListFull"
					: "FriendApplicationInvalid"
			: "";
	}
	static LocalRemoveApplicationFriend(e) {
		ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.FriendApplicationListUpdate,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
			);
	}
	static RequestFriendDelete(e) {
		var o = new Protocol_1.Aki.Protocol.OZn();
		(o.Ekn = e),
			Net_1.Net.Call(6370, o, (o) => {
				if (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Friend", 28, "协议接收", [
							"协议id",
							"9414" + Protocol_1.Aki.Protocol.kZn.name,
						]),
					o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
				)
					return o.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrNotOnFriendList
						? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"NotOnFriendList",
							),
							void EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.UpdateFriendViewShow,
							))
						: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								18642,
							);
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"FriendDeleteSuccess",
				),
					ModelManager_1.ModelManager.FriendModel.DeleteFriend(e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdateFriendViewShow,
					);
			});
	}
	static RequestSearchPlayerBasicInfo(e) {
		var o = new Protocol_1.Aki.Protocol.vWn();
		(o.Ekn = e),
			Net_1.Net.Call(9045, o, (e) => {
				if (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Friend", 28, "协议接收", [
							"协议id",
							"5168" + Protocol_1.Aki.Protocol.pWn.name,
						]),
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
				)
					return e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_InvalidUserId
						? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"InvalidUserId",
							)
						: e.lkn ===
								Protocol_1.Aki.Protocol.lkn.Proto_ErrCanNotGetSelfBasicInfo
							? void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
									"CanNotSearchSelf",
								)
							: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									e.lkn,
									7919,
								);
				var o = new FriendData_1.FriendData();
				o.SetPlayerBasicInfo(e.a5n),
					ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(o),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SearchPlayerInfo,
						o.PlayerId,
					);
			});
	}
	static GetOfflineSection(e) {
		let o = 0,
			r = "FriendOfflineToday";
		return (
			(e = TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(e, !1)) <= 1
				? ((o = 0), (r = "FriendOfflineToday"))
				: 1 < e && e <= CommonDefine_1.DAY_PER_WEEK
					? ((o = 1), (r = "FriendOfflineInWeek"))
					: 1 < e && e <= CommonDefine_1.DAY_PER_MONTH
						? ((o = 2), (r = "FriendOfflineInMonth"))
						: e > CommonDefine_1.DAY_PER_MONTH &&
							((o = 3), (r = "FriendOfflineOverMonth")),
			[r, o]
		);
	}
	static CheckRemarkIsValid(e) {
		return void 0 !== e && "" !== e;
	}
	static CreateFriendItemSt(e, o) {
		var r = new Array();
		for (const t of e) {
			var n = new FriendItemSt();
			(n.Id = t), (n.OperationType = o), r.push(n);
		}
		return r;
	}
	static GetSortedFriendListByRules(e, o) {
		var r = new Array();
		for (let o = e.length - 1; 0 <= o; o--) r.push(e[o]);
		return r.sort(o), r;
	}
	static GetSortedBlackOrApplyList(e) {
		var o = new Array();
		for (let r = e.length - 1; 0 <= r; r--) o.push(e[r]);
		return o;
	}
	static RequestFriendRecentlyTeam() {
		var e = Protocol_1.Aki.Protocol.NZn.create();
		Net_1.Net.Call(7695, e, (e) => {
			e &&
				(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
					? ModelManager_1.ModelManager.FriendModel.InitRecentlyTeamDataByResponse(
							e.cRs,
						)
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							20003,
						));
		});
	}
	static GetOfflineTimeString(e) {
		return e <= 1
			? "FriendOfflineToday"
			: 1 < e && e <= CommonDefine_1.DAY_PER_MONTH
				? "FriendOfflineSomeDay"
				: e > CommonDefine_1.DAY_PER_MONTH
					? "FriendOfflineOverMonth"
					: "FriendOfflineToday";
	}
}
(exports.FriendController = FriendController),
	((_a = FriendController).PVt = void 0),
	(FriendController.UVt = !1),
	(FriendController.AVt = !1),
	(FriendController.OVt = 0),
	(FriendController.xVt = () => {
		_a.RequestAllFriend();
	}),
	(FriendController.nye = () => {
		FriendController.UVt
			? (FriendController.AVt !==
					ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Friend", 28, "好友模式改变"),
					FriendController.RequestAllFriend(!0, () => {
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnGetFriendInitData,
						);
					})),
				(FriendController.AVt =
					ModelManager_1.ModelManager.GameModeModel.IsMulti))
			: (FriendController.UVt = !0);
	}),
	(FriendController.w4e = () => {
		FriendController.RequestAllFriend(!0, () => {
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnGetFriendInitData,
			);
		}),
			_a.CFe();
	}),
	(FriendController.wVt = () => {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
		);
	}),
	(FriendController.FVt = 0),
	(FriendController.VVt = 0),
	(FriendController.RequestAllFriend = (e = !1, o = void 0) => {
		var r;
		((TimeUtil_1.TimeUtil.GetServerTime() <= FriendController.FVt ||
			!ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
				LoginDefine_1.ELoginStatus.EnterGameRet,
			)) &&
			!e) ||
			((r = 2.5),
			e && TimeUtil_1.TimeUtil.GetServerTime() - FriendController.VVt < r
				? TimerSystem_1.TimerSystem.Delay(() => {
						_a.RequestAllFriend(e, o);
					}, 2500)
				: ((r = new Protocol_1.Aki.Protocol.LZn()),
					(FriendController.FVt =
						TimeUtil_1.TimeUtil.GetServerTime() +
						FriendDefine_1.FRIEND_ALL_UPDATE_INTERVAL_MINUTES *
							CommonDefine_1.SECOND_PER_MINUTE),
					(FriendController.VVt = TimeUtil_1.TimeUtil.GetServerTime()),
					Net_1.Net.IsServerConnected() &&
						Net_1.Net.Call(12605, r, (e) => {
							if (
								(Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Friend", 28, "协议接收", [
										"协议id",
										"9402" + Protocol_1.Aki.Protocol.RZn.name,
									]),
								o?.(),
								void 0 === e)
							)
								Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn("Friend", 28, "RequestAllFriend Null", [
										"当前登录状态",
										ModelManager_1.ModelManager.LoginModel.GetLoginStatus(),
									]);
							else {
								const o =
									ModelManager_1.ModelManager.FriendModel.SelectedPlayerId;
								(ModelManager_1.ModelManager.FriendModel.SelectedPlayerId =
									void 0),
									e.aRs.forEach((e) => {
										var r;
										ModelManager_1.ModelManager.FriendModel.HasFriend(e.a5n.aFn)
											? ModelManager_1.ModelManager.FriendModel.GetFriendById(
													e.a5n.aFn,
												).SetFriendDataAttribute(e)
											: ((r =
													new FriendData_1.FriendData()).SetFriendDataAttribute(
													e,
												),
												ModelManager_1.ModelManager.FriendModel.AddFriend(r),
												o &&
													o === r.PlayerId &&
													(ModelManager_1.ModelManager.FriendModel.SelectedPlayerId =
														r.PlayerId));
									}),
									e.hRs.forEach((e) => {
										var o;
										ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
											e.a5n.aFn,
										)
											? ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
													e.a5n.aFn,
												).SetPlayerBasicInfo(e.a5n)
											: ((o =
													new FriendData_1.FriendApplyData()).InitializeFriendApply(
													e,
												),
												ModelManager_1.ModelManager.FriendModel.AddFriendApplication(
													o,
												));
									}),
									ModelManager_1.ModelManager.FriendModel.LoadLocalFriendApplication();
							}
						})));
	}),
	(FriendController.bVt = (e) => {
		var o;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Friend", 28, "协议接收", [
				"协议id",
				"9403" + Protocol_1.Aki.Protocol.DZn.name,
			]),
			ModelManager_1.ModelManager.FriendModel.HasFriend(e.a5n.a5n.aFn)
				? ModelManager_1.ModelManager.FriendModel.GetFriendById(
						e.a5n.a5n.aFn,
					).SetFriendDataAttribute(e.a5n)
				: ((o = new FriendData_1.FriendData()).SetFriendDataAttribute(e.a5n),
					ModelManager_1.ModelManager.FriendModel.AddFriend(o));
	}),
	(FriendController.qVt = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Friend", 28, "协议接收", [
				"协议id",
				"9404" + Protocol_1.Aki.Protocol.AZn.name,
			]),
			(e = e.Ekn),
			ChatController_1.ChatController.TryActiveDeleteFriendTips(e),
			ModelManager_1.ModelManager.FriendModel.DeleteFriend(e);
	}),
	(FriendController.GVt = (e) => {
		var o;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Friend", 28, "协议接收", [
				"协议id",
				"9405" + Protocol_1.Aki.Protocol.PZn.name,
			]),
			ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
				e.lRs.a5n.aFn,
			)
				? ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
						e.lRs.a5n.aFn,
					).SetPlayerBasicInfo(e.lRs.a5n)
				: ((o = new FriendData_1.FriendApplyData()).InitializeFriendApply(
						e.lRs,
					),
					ModelManager_1.ModelManager.FriendModel.AddFriendApplication(o)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
			);
	}),
	(FriendController.NVt = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Friend", 28, "协议接收", [
				"协议id",
				"9406" + Protocol_1.Aki.Protocol.PZn.name,
			]),
			ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e.Ekn);
	}),
	(FriendController.RequestFriendRemarkChange = async (e, o) => {
		var r = new Protocol_1.Aki.Protocol.qZn();
		return (
			(e = ((r.Ekn = e), (r.h5n = o), await Net_1.Net.CallAsync(18736, r)))
				.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
				? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						27691,
					),
					e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrFriendRemarkLengthLimit
						? EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.FriendRemarkLengthLimit,
							)
						: e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord &&
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.FriendRemarkContainsDirtyWord,
							))
				: (ModelManager_1.ModelManager.FriendModel.IsMyFriend(r.Ekn) &&
						(ModelManager_1.ModelManager.FriendModel.GetFriendById(
							r.Ekn,
						).FriendRemark = r.h5n),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdateFriendViewShow,
					)),
			e.lkn
		);
	}),
	(FriendController.RequestBlackList = () => {
		var e = new Protocol_1.Aki.Protocol.$Kn();
		Net_1.Net.Call(2749, e, (e) => {
			if (
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Friend", 28, "协议接收", [
						"协议id",
						"9302" + Protocol_1.Aki.Protocol.HKn.name,
					]),
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
			)
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					27145,
				);
			else {
				for (const r of e.qSs) {
					var o;
					ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(r.aFn)
						? ModelManager_1.ModelManager.FriendModel.GetBlockedPlayerById(
								r.aFn,
							).InitializeFriendBlackListData(r)
						: ((o =
								new FriendData_1.FriendBlackListData()).InitializeFriendBlackListData(
								r,
							),
							ModelManager_1.ModelManager.FriendModel.AddToBlackList(o));
				}
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.UpdateBlackListShow,
				);
			}
		});
	}),
	(FriendController.RequestBlockPlayer = (e) => {
		var o = new Protocol_1.Aki.Protocol.jKn();
		(o.Ekn = e),
			Net_1.Net.Call(13931, o, (o) => {
				if (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Friend", 28, "协议接收", [
							"协议id",
							"9304" + Protocol_1.Aki.Protocol.WKn.name,
						]),
					o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
				)
					return o.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrIsBlockedPlayer
						? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"IsBlockedPlayer",
							),
							void EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.UpdateBlackListShow,
							))
						: o.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrBlockListCountMax
							? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
									"BlackListFull",
								),
								void EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.UpdateBlackListShow,
								))
							: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									o.lkn,
									21617,
								);
				ModelManager_1.ModelManager.FriendModel.IsMyFriend(e) &&
					ModelManager_1.ModelManager.FriendModel.DeleteFriend(e),
					ModelManager_1.ModelManager.FriendModel.HasFriendApplication(e) &&
						ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e);
				var r = new FriendData_1.FriendBlackListData();
				r.InitializeFriendBlackListData(o.a5n),
					ModelManager_1.ModelManager.FriendModel.AddToBlackList(r),
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"BlockedPlayerSucceed",
						r.GetBlockedPlayerData.PlayerName,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdateFriendViewShow,
					);
			});
	}),
	(FriendController.RequestUnBlockPlayer = (e) => {
		var o = new Protocol_1.Aki.Protocol.KKn();
		(o.Ekn = e),
			Net_1.Net.Call(21738, o, (o) => {
				if (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Friend", 28, "协议接收", [
							"协议id",
							"9306" + Protocol_1.Aki.Protocol.QKn.name,
						]),
					o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
				)
					return o.lkn ===
						Protocol_1.Aki.Protocol.lkn.Proto_ErrIsNotBlockedPlayer
						? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"IsNotBlockedPlayer",
							),
							void EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.UpdateBlackListShow,
							))
						: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								9444,
							);
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"RemoveFromBlackListSucceeded",
					ModelManager_1.ModelManager.FriendModel.GetBlockedPlayerById(e)
						.GetBlockedPlayerData.PlayerName,
				),
					ModelManager_1.ModelManager.FriendModel.DeleteBlockedPlayer(e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdateBlackListShow,
					);
			});
	}),
	(FriendController.FriendListSortHook = (e, o) => (
		(e = ModelManager_1.ModelManager.FriendModel.GetFriendById(e)),
		(o = ModelManager_1.ModelManager.FriendModel.GetFriendById(o)),
		FriendController.HVt(e, o)
	)),
	(FriendController.HVt = (e, o) =>
		e && o
			? e.PlayerIsOnline !== o.PlayerIsOnline
				? !e.PlayerIsOnline && o.PlayerIsOnline
					? 1
					: -1
				: (e.PlayerIsOnline && o.PlayerIsOnline) ||
						FriendController.GetOfflineSection(e.PlayerLastOfflineTime)[1] ===
							FriendController.GetOfflineSection(o.PlayerLastOfflineTime)[1]
					? e.PlayerLevel === o.PlayerLevel
						? e.PlayerId - o.PlayerId
						: -(e.PlayerLevel - o.PlayerLevel)
					: -(
							FriendController.GetOfflineSection(e.PlayerLastOfflineTime)[1] -
							FriendController.GetOfflineSection(o.PlayerLastOfflineTime)[1]
						)
			: 1),
	(FriendController.BVt = (e) => {
		ModelManager_1.ModelManager.FriendModel.ClearTestFriendData();
		for (let t = 0; t < e; ++t) {
			var o = new FriendData_1.FriendData(),
				r =
					((o.PlayerId = t + 1),
					(o.PlayerName = "测试员" + (t + 1)),
					(o.FriendRemark = "仅供展示使用" + (t + 1)),
					(o.PlayerLevel = 1),
					(o.PlayerIsOnline = !0),
					(o.PlayerLastOfflineTime =
						Date.parse(new Date().toString()) /
						CommonDefine_1.MILLIONSECOND_PER_SECOND),
					(o.Debug = !0),
					new FriendData_1.FriendApplyData()),
				n = new FriendData_1.FriendBlackListData();
			(r.ApplyPlayerData = o),
				(r.ApplyCreatedTime = o.PlayerLastOfflineTime + t),
				(r.Fresh = !1),
				(n.GetBlockedPlayerData = o),
				ModelManager_1.ModelManager.FriendModel.AddFriend(o),
				ModelManager_1.ModelManager.FriendModel.AddFriendApplication(r),
				ModelManager_1.ModelManager.FriendModel.AddToBlackList(n),
				ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(o);
		}
		return (
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UpdateFriendViewShow,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UpdateBlackListShow,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SearchPlayerInfo,
				e,
			),
			(ModelManager_1.ModelManager.FriendModel.TestDataLoaded = !0)
		);
	});

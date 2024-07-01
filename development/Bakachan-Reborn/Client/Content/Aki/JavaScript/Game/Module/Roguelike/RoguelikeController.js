"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeController = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	AsyncTask_1 = require("../../World/Task/AsyncTask"),
	TaskSystem_1 = require("../../World/Task/TaskSystem"),
	BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
	ItemHintController_1 = require("../ItemHint/ItemHintController"),
	ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
	ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine"),
	LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
	RoleController_1 = require("../RoleUi/RoleController"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
	UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
	WeatherModel_1 = require("../Weather/WeatherModel"),
	EventResult_1 = require("./Define/EventResult"),
	RogueGainEntry_1 = require("./Define/RogueGainEntry"),
	RoguelikeInfo_1 = require("./Define/RoguelikeInfo");
class RoguelikeController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnCloseLoadingView,
			RoguelikeController.OnCloseLoading,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				RoguelikeController.Tso,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				RoguelikeController.gKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkEnd,
				RoguelikeController.OnPlotEnd,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnCloseLoadingView,
			RoguelikeController.OnCloseLoading,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				RoguelikeController.Tso,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				RoguelikeController.gKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotNetworkEnd,
				RoguelikeController.OnPlotEnd,
			);
	}
	static StartFlowForView(e, o, n, r, l) {
		return (
			(this.RandomEventIndex = e),
			(this.CurrentFlowListName = o),
			(this.CurrentFlowId = n),
			(this.CurrentStateId = r),
			ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
				o,
				n,
				r,
				l,
			)
		);
	}
	static async OpenRoguelikeActivityView() {
		const e = new CustomPromise_1.CustomPromise();
		return (
			UiManager_1.UiManager.OpenView("RoguelikeActivityView", void 0, (o) => {
				e.SetResult(o);
			}),
			e.Promise
		);
	}
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"RoguelikeActivityView",
			RoguelikeController.CheckCanOpen,
			"RoguelikeController.CheckCanOpen",
		),
			UiManager_1.UiManager.AddOpenViewCheckFunction(
				"RoguelikeInstanceView",
				RoguelikeController.CheckCanOpen,
				"RoguelikeController.CheckCanOpen",
			),
			UiManager_1.UiManager.AddOpenViewCheckFunction(
				"RoguelikeMemoryPlaceView",
				RoguelikeController.CheckCanOpen,
				"RoguelikeController.CheckCanOpen",
			),
			UiManager_1.UiManager.AddOpenViewCheckFunction(
				"RoguelikeSelectRoleView",
				RoguelikeController.CheckCanOpen,
				"RoguelikeController.CheckCanOpen",
			),
			UiManager_1.UiManager.AddOpenViewCheckFunction(
				"RoguelikeTokenOverView",
				RoguelikeController.CheckCanOpen,
				"RoguelikeController.CheckCanOpen",
			),
			UiManager_1.UiManager.AddOpenViewCheckFunction(
				"RogueInfoView",
				RoguelikeController.CheckCanOpen,
				"RoguelikeController.CheckCanOpen",
			),
			UiManager_1.UiManager.AddOpenViewCheckFunction(
				"RoguelikeSkillView",
				RoguelikeController.CheckCanOpen,
				"RoguelikeController.CheckCanOpen",
			),
			UiManager_1.UiManager.AddOpenViewCheckFunction(
				"RoguelikeExitTips",
				RoguelikeController.CheckCanOpenExitTips,
				"RoguelikeController.CheckCanOpenExitTips",
			);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"RoguelikeActivityView",
			RoguelikeController.CheckCanOpen,
		),
			UiManager_1.UiManager.RemoveOpenViewCheckFunction(
				"RoguelikeInstanceView",
				RoguelikeController.CheckCanOpen,
			),
			UiManager_1.UiManager.RemoveOpenViewCheckFunction(
				"RoguelikeMemoryPlaceView",
				RoguelikeController.CheckCanOpen,
			),
			UiManager_1.UiManager.RemoveOpenViewCheckFunction(
				"RoguelikeSelectRoleView",
				RoguelikeController.CheckCanOpen,
			),
			UiManager_1.UiManager.RemoveOpenViewCheckFunction(
				"RoguelikeTokenOverView",
				RoguelikeController.CheckCanOpen,
			),
			UiManager_1.UiManager.RemoveOpenViewCheckFunction(
				"RogueInfoView",
				RoguelikeController.CheckCanOpen,
			),
			UiManager_1.UiManager.RemoveOpenViewCheckFunction(
				"RoguelikeSkillView",
				RoguelikeController.CheckCanOpen,
			);
	}
	static async OpenBuffSelectViewByIdAsync(e) {
		var o,
			n =
				ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
					e,
				);
		n ||
			(((o = new Protocol_1.Aki.Protocol.sas()).Akn =
				ModelManager_1.ModelManager.RoguelikeModel.CurIndex),
			(o.k8n = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
			n.RoguelikeGainDataType === Protocol_1.Aki.Protocol.u3s.Proto_Shop &&
				(o.Akn = Protocol_1.Aki.Protocol._3s.Proto_ShopBindId),
			(n = await Net_1.Net.CallAsync(7763, o)),
			ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([
				n.Ews,
			])),
			await RoguelikeController.OpenBuffSelectViewById(e);
	}
	static async OpenBuffSelectViewById(e) {
		var o,
			n =
				ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
					e,
				);
		return n
			? ((o = RoguelikeController.GetViewNameByGainType(
					n.RoguelikeGainDataType,
				)),
				!!UiManager_1.UiManager.IsViewOpen(o) ||
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Roguelike",
							35,
							"肉鸽选择界面数据:",
							["BindId:", e],
							["Data:", n],
						),
					void 0 !== (await UiManager_1.UiManager.OpenViewAsync(o, n))))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Roguelike", 9, "没有肉鸽界面数据!"),
				!1);
	}
	static GetViewNameByGainType(e) {
		switch (e) {
			case Protocol_1.Aki.Protocol.u3s.qDs:
				return ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
					ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry
						.ConfigId,
				)
					? "RoguePhantomReplaceView"
					: "RoguePhantomSelectView";
			case Protocol_1.Aki.Protocol.u3s.tRs:
				return "RoleReplaceView";
			case Protocol_1.Aki.Protocol.u3s.Proto_CommonBuff:
				return "CommonSelectView";
			case Protocol_1.Aki.Protocol.u3s.Proto_RoleBuff:
				return "RoleBuffSelectView";
			case Protocol_1.Aki.Protocol.u3s.Proto_Shop:
				return "RogueShopView";
			case Protocol_1.Aki.Protocol.u3s.Proto_Event:
				return "RoguelikeRandomEventView";
			case Protocol_1.Aki.Protocol.u3s.Proto_Miraclecreation:
				return "RoguelikeSelectSpecialView";
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Roguelike", 9, "当前增益类型没有对应的界面数据", [
				"type",
				Protocol_1.Aki.Protocol.u3s[e],
			]);
	}
	static RoguelikeRefreshGainRequest(e) {
		var o = new Protocol_1.Aki.Protocol.oas();
		(o.V8n = e),
			(o.k8n = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
			Net_1.Net.Call(26724, o, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							26724,
							e.Fms,
						)
					: (ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([
							e.Ews,
						]),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RoguelikeRefreshGain,
							e.Ews.Akn,
						));
			});
	}
	static async RoguelikeLastInfoRequestAsync() {
		var e = new Protocol_1.Aki.Protocol.das();
		e = await Net_1.Net.CallAsync(27957, e);
		e?.wws && this.RoguelikeResultRequest(e.xws[0].vFn);
	}
	static EnterCurrentRogueEntrance() {
		this.RoguelikeSeasonDataRequest()
			.then((e) => {
				(e =
					ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
						e.F8n,
					)),
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(
						e.InstanceDungeonEntrance,
					).finally(void 0);
			})
			.finally(void 0);
	}
	static OpenRoguelikeInstanceView() {
		var e = new Protocol_1.Aki.Protocol.das();
		Net_1.Net.Call(27957, e, (e) => {
			if (e?.wws) {
				const o = e.xws[0];
				((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
					135,
				)).IsEscViewTriggerCallBack = !1),
					e.SetTextArgs(o.Pws.toString(), o.Uws.toString());
				let n = !1;
				e.SetCloseFunction(() => {
					UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") &&
						!n &&
						UiManager_1.UiManager.CloseView("InstanceDungeonEntranceView");
				}),
					e.FunctionMap.set(1, () => {
						(n = !0),
							this.RoguelikeResultRequest(o.vFn),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
					}),
					e.FunctionMap.set(2, () => {
						this.RoguelikeStartRequest(!0, o.vFn, []);
					}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}
		}),
			UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView");
	}
	static OpenRogueInfoView() {
		UiManager_1.UiManager.OpenView("RogueInfoView");
	}
	static OpenRoguelikeSelectRoleView(e) {
		UiManager_1.UiManager.OpenView("RoguelikeSelectRoleView", e);
	}
	static OpenRoguelikeSkillView(e) {
		this.RoguelikeTalentInfoRequest(e).then(() => {
			UiManager_1.UiManager.OpenView("RoguelikeSkillView", e);
		});
	}
	static async RoguelikeTalentInfoRequest(e) {
		var o = Protocol_1.Aki.Protocol.Las.create(),
			n = ((o.F8n = e), await Net_1.Net.CallAsync(17206, o));
		if (n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
			ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				n.lkn,
				3217,
			);
		else {
			for (const e of Object.keys(n.Qws))
				ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(
					Number(e),
					n.Qws[e],
				);
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoguelikeDataUpdate,
			);
		}
	}
	static OpenMemoryPlaceView() {
		this.RoguelikeSeasonDataRequest().then((e) => {
			UiManager_1.UiManager.OpenView("RoguelikeMemoryPlaceView", e);
		});
	}
	static async RoguelikeSeasonDataRequest(e, o = !1) {
		var n = new Protocol_1.Aki.Protocol.Uas();
		(n.F8n = e ?? 0), (e = await Net_1.Net.CallAsync(1111, n));
		if (o || e.lkn === Protocol_1.Aki.Protocol.lkn.Sys)
			return (
				(ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData = e.zws),
				(ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = e.zws?.jCs),
				e.zws
			);
		ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
			e.lkn,
			6565,
		);
	}
	static async RoguelikeSeasonRewardReceiveRequest(e, o) {
		var n = new Protocol_1.Aki.Protocol.Bas();
		return (
			(o = ((n.F8n = o ?? 0), (n.Akn = e), await Net_1.Net.CallAsync(25690, n)))
				.lkn === Protocol_1.Aki.Protocol.lkn.Sys ||
			(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				o.lkn,
				23846,
			),
			!1)
		);
	}
	static async RoguelikeTalentLevelUpRequest(e) {
		var o;
		(o =
			(((o = Protocol_1.Aki.Protocol.Das.create()).vkn = e),
			await Net_1.Net.CallAsync(10843, o))).lkn !==
		Protocol_1.Aki.Protocol.lkn.Sys
			? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					o.lkn,
					4821,
				)
			: (ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(
					e,
					o.r3n,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RoguelikeTalentLevelUp,
					e,
				));
	}
	static async RoguelikeStartRequest(e, o, n) {
		var r = Protocol_1.Aki.Protocol.Cas.create();
		(r.H8n = e),
			(r.vFn = o),
			(r.xkn = n),
			(r.F8n = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n),
			(ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId = o),
			BlackScreenController_1.BlackScreenController.AddBlackScreen(
				"None",
				"LeaveScene",
			),
			(e = await Net_1.Net.CallAsync(6681, r));
		return (
			BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
				"None",
				"LeaveScene",
			),
			e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
				? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						12622,
					),
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
					!1)
				: ((ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList =
						n),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.EnterInstanceDungeon,
					),
					!0)
		);
	}
	static RoguelikeQuitRequest() {
		if (!this.Lso) {
			const o =
				ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon();
			var e = Protocol_1.Aki.Protocol.fas.create();
			Net_1.Net.Call(8716, e, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						8804,
					),
					(this.Lso = !o),
					ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
			});
		}
	}
	static RoguelikeResultRequest(e) {
		var o;
		this.Lso ||
			(((o = Protocol_1.Aki.Protocol.Mas.create()).vFn = e),
			Net_1.Net.Call(20384, o, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							7871,
						)
					: ((this.Lso =
							ModelManager_1.ModelManager.RoguelikeModel?.CheckInRoguelike()),
						UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.Fws));
			}));
	}
	static RogueChooseDataResultRequest(e) {
		const o = ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry;
		let n;
		if (1 === e)
			n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
		else if (3 === e)
			n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
		else if (6 === e) {
			n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
			var r = o.ShopItemCoinId;
			if (
				ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(r) <
				(0 === o.CurrentPrice ? o.OriginalPrice : o.CurrentPrice)
			)
				return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"RoguelikeShopNotEnoughCurrency",
				);
		} else
			n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
		const l = new Protocol_1.Aki.Protocol._as();
		(l.Akn = o?.Index ?? 0),
			(l.V8n = o?.BindId ?? 0),
			(l.k8n = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
			7 === e && (l.V8n = Protocol_1.Aki.Protocol._3s.Proto_EventBindId),
			Net_1.Net.Call(1543, l, (r) => {
				if (r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						r.lkn,
						1543,
						r.Fms,
					);
				else {
					var t =
						ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
							l.V8n,
						);
					let a;
					(t.IsSelect = r?.dws),
						1 === e
							? (a =
									ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
										.PhantomEntry)
							: 3 === e
								? (a =
										ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
											.RoleEntry)
								: 6 === e
									? ((o.IsSell = !0), (a = o))
									: 7 === e
										? r.las.Dws.length <= 0
											? (t.RogueGainEntryList = [])
											: r.las.Dws.forEach((e) => {
													ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData(
														[e],
													);
												})
										: 8 === e && (a = o),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RoguelikeChooseDataResult,
							a,
							n,
							!0,
							l.V8n,
							r,
						);
				}
			});
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(19537, RoguelikeController.Dso),
			Net_1.Net.Register(6539, RoguelikeController.Rso),
			Net_1.Net.Register(8998, RoguelikeController.RoguelikeChooseDataNotify),
			Net_1.Net.Register(16227, RoguelikeController.Uso),
			Net_1.Net.Register(28895, RoguelikeController.Aso),
			Net_1.Net.Register(2778, RoguelikeController.RoguelikeTalentUnlockNotify),
			Net_1.Net.Register(11430, RoguelikeController.RoguelikeCurrencyNotify),
			Net_1.Net.Register(
				11857,
				RoguelikeController.RoguelikeCurrencyUpdateNotify,
			),
			Net_1.Net.Register(28299, RoguelikeController.RoguelikeEventGainNotify),
			Net_1.Net.Register(
				12898,
				RoguelikeController.RoguelikeGainDataUpdateNotify,
			);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(19537),
			Net_1.Net.UnRegister(6539),
			Net_1.Net.UnRegister(8998),
			Net_1.Net.UnRegister(16227),
			Net_1.Net.UnRegister(28895),
			Net_1.Net.UnRegister(2778),
			Net_1.Net.UnRegister(11430),
			Net_1.Net.UnRegister(11857),
			Net_1.Net.UnRegister(28299);
	}
	static async Pso() {
		var e = Protocol_1.Aki.Protocol.yas.create();
		(e = await Net_1.Net.CallAsync(12488, e)) &&
		e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
			? ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() &&
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
					15,
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Roguelike", 9, "肉鸽副本进入下个房间失败");
	}
	static async RoguelikeGiveUpGainRequest(e) {
		var o = Protocol_1.Aki.Protocol.Gas.create();
		(e =
			((o.V8n = e),
			(o.k8n = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount),
			await Net_1.Net.CallAsync(12802, o))).lkn !==
		Protocol_1.Aki.Protocol.lkn.Sys
			? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					12802,
				)
			: EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RoguelikeCloseGainSelectView,
				);
	}
	static async RoguelikeTokenReceiveRequest(e, o) {
		var n = Protocol_1.Aki.Protocol.xas.create();
		return (
			(e = ((n.F8n = e), (n.Ekn = o), await Net_1.Net.CallAsync(1845, n)))
				.lkn === Protocol_1.Aki.Protocol.lkn.Sys ||
			(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				e.lkn,
				1845,
			),
			!1)
		);
	}
	static async RoguelikePopularEntriesInfoRequest(e) {
		var o = Protocol_1.Aki.Protocol.Gds.create();
		return (
			(e =
				((o.vFn = e),
				(o.F8n = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n),
				await Net_1.Net.CallAsync(19107, o))).lkn !==
				Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					19107,
				),
			e
		);
	}
	static async RoguelikeTrialRoleInfoRequest(e) {
		var o = new Protocol_1.Aki.Protocol.lms();
		(o.F8n = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n),
			(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)),
			(e =
				ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
					e.FightFormationId,
				));
		return (e = ((o.j8n = e.TrialRole), await Net_1.Net.CallAsync(27185, o)))
			.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
			? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					27185,
				),
				[])
			: (await RoleController_1.RoleController.RobotRolePropRequest(e.txs),
				e.txs);
	}
	static async RoguelikePopularEntriesChangeRequest(e, o) {
		var n = Protocol_1.Aki.Protocol.kds.create();
		(e =
			((n.vFn = e),
			(n.W8n = o),
			(n.F8n = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData.F8n),
			await Net_1.Net.CallAsync(24992, n))).lkn !==
			Protocol_1.Aki.Protocol.lkn.Sys &&
			ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				e.lkn,
				24992,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoguelikePopularEntriesChange,
				o,
			);
	}
}
(exports.RoguelikeController = RoguelikeController),
	((_a = RoguelikeController).Lso = !1),
	(RoguelikeController.CurrentFlowListName = ""),
	(RoguelikeController.CurrentFlowId = 0),
	(RoguelikeController.CurrentStateId = 0),
	(RoguelikeController.RandomEventIndex = 0),
	(RoguelikeController.OnPlotEnd = (e) => {
		var o, n, r;
		e.FlowListName === _a.CurrentFlowListName &&
			e.FlowId === _a.CurrentFlowId &&
			e.StateId === _a.CurrentStateId &&
			((e =
				ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(
					_a.RandomEventIndex,
				))
				? 0 < e.RogueGainEntryList.length
					? ((o =
							ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueEventConfigById(
								e.EventId,
							)) &&
							o.IsCopyCamera &&
							((o = ModelManager_1.ModelManager.CameraModel).SaveSeqCamera(),
							(o = o.GetSavedSeqCameraThings()) ||
								(Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Camera",
										8,
										"读取Sequence相机信息时，信息不存在",
									)),
							(n = UiCameraManager_1.UiCameraManager.Get()).SetWorldLocation(
								o.CameraLocation,
							),
							n.SetWorldRotation(o.CameraRotation),
							(r = n.GetUiCameraComponent(
								UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
							)).SetCameraAperture(o.CurrentAperture),
							r.SetCameraFocalDistance(o.FocusSettings.ManualFocusDistance),
							r.SetCameraFieldOfView(o.FieldOfView),
							CameraController_1.CameraController.ExitCameraMode(1),
							n.Enter()),
						UiManager_1.UiManager.OpenView("RoguelikeRandomEventView", e))
					: ((_a.CurrentFlowId = 0),
						(_a.CurrentFlowListName = ""),
						(_a.CurrentStateId = 0),
						UiManager_1.UiManager.IsViewOpen("RoguelikeRandomEventView") &&
							UiManager_1.UiManager.CloseView(
								"RoguelikeRandomEventView",
								(e) => {
									e && UiCameraManager_1.UiCameraManager.Get().Exit();
								},
							))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Roguelike", 35, "没有肉鸽随机事件界面数据!", [
						"Index:",
						_a.RandomEventIndex,
					]));
	}),
	(RoguelikeController.OnCloseLoading = () => {
		var e, o;
		ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList &&
		0 < ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList.length
			? ((_a.Lso = !1),
				(e = ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList),
				(ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = void 0),
				(o = []).push({
					ButtonTextId: "ConfirmBox_45_ButtonText_1",
					DescriptionTextId: void 0,
					DescriptionArgs: void 0,
					IsTimeDownCloseView: !1,
					IsClickedCloseView: !1,
					OnClickedCallback: (e) => {
						UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
							UiManager_1.UiManager.CloseView("ExploreRewardView", (e) => {
								e &&
									_a.OpenRoguelikeActivityView().finally(() => {
										var e,
											o,
											n =
												ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
										void 0 !== n &&
											void 0 !== n.DungeonList &&
											void 0 !== ModelManager_1.ModelManager.RoguelikeModel &&
											void 0 !==
												ModelManager_1.ModelManager.RoguelikeModel
													.CurDungeonId &&
											((e =
												(o = n.DungeonList.indexOf(
													ModelManager_1.ModelManager.RoguelikeModel
														.CurDungeonId,
												)) + 1),
											-1 !== o &&
												e < n.DungeonList.length &&
												(o =
													ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(
														n.DungeonList[e],
													)) &&
												((n =
													MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
														o.MapName,
													)),
												UiManager_1.UiManager.OpenView(
													"RoguelikeUnlockTips",
													n,
												)),
											(ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId =
												void 0));
									});
							});
					},
				}),
				ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
					ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD_CONFIG,
					!0,
					e,
					void 0,
					void 0,
					o,
				),
				LocalStorage_1.LocalStorage.SetPlayer(
					LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
					!1,
				))
			: _a.Lso && ((_a.Lso = !1), _a.OpenRoguelikeActivityView()),
			(_a.CurrentFlowId = 0),
			(_a.CurrentFlowListName = ""),
			(_a.CurrentStateId = 0);
	}),
	(RoguelikeController.gKe = (e, o) => {
		(110056 !== e && !o) || _a.Tso();
	}),
	(RoguelikeController.Tso = () => {
		_a.RoguelikeSeasonDataRequest(void 0, !0).then((e) => {
			ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = e?.jCs;
		});
	}),
	(RoguelikeController.CheckCanOpen = () =>
		ModelManager_1.ModelManager.RoguelikeModel?.CheckRogueIsOpen()
			? ModelManager_1.ModelManager.GameModeModel?.IsMulti
				? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"Rogue_Multi_Tip",
					),
					!1)
				: !_a.Lso ||
					(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"Rogue_Function_Instance_End_Tip",
					),
					!1)
			: (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"Rogue_Function_Not_Open_Tip",
				),
				!1)),
	(RoguelikeController.CheckCanOpenExitTips = () =>
		!_a.Lso ||
		(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
			"Rogue_Function_Instance_End_Tip",
		),
		!1)),
	(RoguelikeController.RoguelikeCurrencyNotify = (e) => {
		ModelManager_1.ModelManager.RoguelikeModel.RoguelikeCurrencyDictMap.clear();
		for (const o of Object.keys(e.gws))
			ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(
				Number(o),
				e.gws[o],
			);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
		),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
	}),
	(RoguelikeController.RoguelikeCurrencyUpdateNotify = (e) => {
		var o =
			ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
		for (const l of Object.keys(e.fws)) {
			var n = Number(l),
				r = e.fws[l];
			ModelManager_1.ModelManager.RoguelikeModel.UpdateRoguelikeCurrency(n, r),
				n !== o.InsideCurrency ||
					r <= 0 ||
					ItemHintController_1.ItemHintController.AddRoguelikeItemList(
						o.InsideCurrency,
						r,
					);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
		);
	}),
	(RoguelikeController.RoguelikeEventGainNotify = (e, o) => {
		var n = new Array();
		if (0 < e.Lws.length) {
			for (const o of e.Lws) n.push(new RogueGainEntry_1.RogueGainEntry(o));
			UiManager_1.UiManager.OpenView(
				"RogueEventResultViewOneByOne",
				new EventResult_1.EventResult(n, o),
			);
		} else if (0 < e.n$s.length) {
			for (const o of e.n$s) n.push(new RogueGainEntry_1.RogueGainEntry(o));
			UiManager_1.UiManager.OpenView(
				"RogueEventResultViewAll",
				new EventResult_1.EventResult(n, o),
			);
		} else o?.();
	}),
	(RoguelikeController.RoguelikeGainDataUpdateNotify = (e) => {
		e.exs?.Ikn === Protocol_1.Aki.Protocol.u3s.Proto_Miraclecreation &&
			(e.Zws === Protocol_1.Aki.Protocol.Zws.Proto_GainDataUpdate
				? (ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList[
						e.Akn
					] = new RogueGainEntry_1.RogueGainEntry(e.exs))
				: e.Zws === Protocol_1.Aki.Protocol.Zws.Proto_GainDataDelete &&
					ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList.splice(
						e.Akn,
						1,
					));
	}),
	(RoguelikeController.RoguelikeChooseDataNotify = (e) => {
		ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData(e.Dws),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoguelikeChooseDataNotify,
			);
	}),
	(RoguelikeController.RoguelikeTalentUnlockNotify = (e) => {
		ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(e.vkn, 0);
	}),
	(RoguelikeController.Aso = (e) => {
		(_a.Lso =
			!ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon()),
			e.Fws.Ows
				? TimerSystem_1.TimerSystem.Delay(() => {
						UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.Fws);
					}, 2e3)
				: UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.Fws);
	}),
	(RoguelikeController.Uso = (e) => {
		(ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount = e.Pws),
			(ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount = e.Uws);
		var o =
			ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikeRoomTypeConfigById(
				e.Wws,
			);
		(ModelManager_1.ModelManager.RoguelikeModel.CurRoomType = o?.RoomTipsType),
			(ModelManager_1.ModelManager.RoguelikeModel.CurRoomMusicState =
				o?.RoomsMusicState),
			0 !== e.Kws &&
				WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(
					e.Kws,
					0,
				);
	}),
	(RoguelikeController.Rso = (e) => {
		ModelManager_1.ModelManager.RoguelikeModel.RogueInfo =
			new RoguelikeInfo_1.RoguelikeInfo(e);
	}),
	(RoguelikeController.Dso = (e) => {
		var o = new AsyncTask_1.AsyncTask(
			"RoguelikeSubLevelChangeTask",
			async () => {
				if (
					((ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1),
					e.$ws === e.Vws)
				)
					await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
						16,
						3,
					);
				else {
					const r = new Array(),
						l = new Array();
					l.push(e.Vws), r.push(e.$ws);
					var o = Vector_1.Vector.Create(e.PTs, e.UTs, e.Hws),
						n = new UE.Rotator(0, e.jws, 0);
					await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
						16,
						3,
					);
					const t = new CustomPromise_1.CustomPromise();
					ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
						r,
						l,
						0,
						o,
						n,
						(e) => {
							e
								? t.SetResult(!0)
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Roguelike",
										9,
										"肉鸽副本子关卡加载失败",
										["unloads", r],
										["newLoads", l],
									);
						},
					),
						await t.Promise;
				}
				return (
					await RoguelikeController.Pso(),
					await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
						16,
						1,
					),
					!0
				);
			},
		);
		TaskSystem_1.TaskSystem.AddTask(o), TaskSystem_1.TaskSystem.Run();
	}),
	(RoguelikeController.CreateCloseViewCallBack = (e, o) => {
		var n = e.t$s?.i$s;
		if (!(void 0 === n || n.length <= 0)) {
			const r = new Array();
			for (const e of n)
				if ((e.r$s && r.push(e.r$s), e.o$s.length <= 0))
					for (const o of e.o$s) r.push(o);
			if (!(r.length <= 0)) {
				let n,
					l = 0;
				return (n = (t) => {
					if (
						(!1 === t &&
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Roguelike",
								9,
								"CreateCloseViewCallBack err",
								["index", l],
								["notify", e],
							),
						l >= r.length)
					)
						o?.();
					else {
						var a = r[l++];
						switch (a.Kkn) {
							case "cas":
								RoguelikeController.RoguelikeEventGainNotify(a.cas, n);
								break;
							case "Rts":
								ItemRewardController_1.ItemRewardController.OnItemObtainNotify(
									a.Rts,
									n,
								);
						}
					}
				});
			}
		}
		o?.();
	});

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityMowingController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	AdventureDefine_1 = require("../../../AdventureGuide/AdventureDefine"),
	InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController"),
	InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
	ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
	ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityMowingData_1 = require("./ActivityMowingData"),
	ActivityMowingSubView_1 = require("./ActivityMowingSubView");
class ActivityMowingController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments),
			(this.DEe = (e, t) => {
				var n;
				0 !== ActivityMowingController.CurrentActivityId &&
					(n = ActivityMowingController.GetMowingActivityData()) &&
					n.LocalConfig?.PreShowGuideQuest.includes(e) &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						n.Id,
					);
			}),
			(this.NUr = () => {
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon() &&
					ActivityMowingController.RequestExitDungeon();
			}),
			(this.oOe = () => {
				var e;
				0 !== ActivityMowingController.CurrentActivityId &&
					(e = ActivityMowingController.GetMowingActivityData()) &&
					e.RedPointShowState &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						e.Id,
					);
			}),
			(this.RequestGetLevelReward = (e, t, n) => {
				var o = Protocol_1.Aki.Protocol.P$n.create();
				(o.YFn = e),
					(o.vFn = t),
					Net_1.Net.Call(16182, o, (n) => {
						n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
							? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									n.lkn,
									21424,
								)
							: ((n =
									ModelManager_1.ModelManager.ActivityModel.GetActivityById(
										e,
									)).SetLevelRewardStateToGot(t),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.ActivityViewRefreshCurrent,
									e,
								),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.RefreshCommonActivityRedDot,
									e,
								),
								UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
									EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName
											.RefreshCommonActivityRewardPopUpView,
										n.GetRewardViewData(),
									));
					});
			}),
			(this.JOe = (e) => {
				ModelManager_1.ModelManager.ActivityModel.GetActivityById(
					e.YFn,
				).UpdatePointRewards(e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ActivityViewRefreshCurrent,
						e.YFn,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						e.YFn,
					);
			}),
			(this.zOe = (e) => {
				ModelManager_1.ModelManager.ActivityModel.GetActivityById(
					e.YFn,
				).UpdateLevelRewards(e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ActivityViewRefreshCurrent,
						e.YFn,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						e.YFn,
					);
			}),
			(this.ZOe = (e) => {
				var t = e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys,
					n =
						(t &&
							ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								8520,
							),
						{
							ButtonTextId: "ConfirmBox_133_ButtonText_0",
							DescriptionTextId: void 0,
							IsTimeDownCloseView: !1,
							IsClickedCloseView: !0,
							OnClickedCallback: function () {
								InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
							},
						}),
					o = {
						ButtonTextId: "ConfirmBox_133_ButtonText_1",
						DescriptionTextId: "MowingHighestPoint",
						DescriptionArgs: [e.x0s.toString()],
						IsTimeDownCloseView: !1,
						IsClickedCloseView: !1,
						OnClickedCallback: function () {
							var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
								t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
							if (0 !== t.length) {
								var n = [];
								for (const e of t) n.push(e.GetConfigId);
								InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
									e,
									n,
								);
							}
						},
					},
					i = {
						TitleTextId: "MowingCurrentPoint",
						Record: e.w0s.toString(),
						IsNewRecord: e.w0s > e.x0s,
					};
				ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
					t
						? ItemRewardDefine_1.MOWING_ERROR_RESULT
						: ItemRewardDefine_1.MOWING_RESULT,
					!t && e.U0s,
					void 0,
					t ? void 0 : i,
					void 0,
					t ? [n] : [n, o],
					void 0,
					void 0,
					void 0,
				);
			});
	}
	OnRegisterNetEvent() {
		Net_1.Net.Register(28261, this.JOe),
			Net_1.Net.Register(27935, this.zOe),
			Net_1.Net.Register(8520, this.ZOe);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(28261),
			Net_1.Net.UnRegister(27935),
			Net_1.Net.UnRegister(8520);
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CrossDay,
				this.oOe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
				this.NUr,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CrossDay,
				this.oOe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
				this.NUr,
			);
	}
	OnGetActivityResource(e) {
		return "UiItem_ActivityMowing";
	}
	OnOpenView(e) {}
	OnCreateSubPageComponent(e) {
		return new ActivityMowingSubView_1.ActivityMowingSubView();
	}
	OnCreateActivityData(e) {
		return (
			(ActivityMowingController.CurrentActivityId = e.Ekn),
			new ActivityMowingData_1.ActivityMowingData()
		);
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	RequestGetPointReward(e, t) {
		var n = Protocol_1.Aki.Protocol.D$n.create();
		(n.YFn = e),
			(n.Ekn = t),
			Net_1.Net.Call(27032, n, (n) => {
				n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							n.lkn,
							9845,
						)
					: ((n =
							ModelManager_1.ModelManager.ActivityModel.GetActivityById(
								e,
							)).SetPointRewardState(t),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ActivityViewRefreshCurrent,
							e,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RefreshCommonActivityRedDot,
							e,
						),
						UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
								n.GetRewardViewData(),
							));
			});
	}
	static RequestSetDifficultyAll(e, t) {
		ActivityMowingController.GetMowingActivityData() &&
			this.RequestSetDifficulty(e, t);
	}
	static RequestExitDungeon() {
		var e = new Protocol_1.Aki.Protocol.q$n();
		Net_1.Net.Call(4739, e, (e) => {
			e ||
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
		});
	}
	static GetMowingActivityData() {
		return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
			ActivityMowingController.CurrentActivityId,
		);
	}
	GetActivityLevelUnlockState(e) {
		var t = ActivityMowingController.GetMowingActivityData();
		return !t || t.GetActivityLevelUnlockState(e);
	}
	static IsMowingInstanceDungeon(e) {
		return (
			!!e &&
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
				?.InstSubType === AdventureDefine_1.EDungeonSubType.Mowing
		);
	}
}
((exports.ActivityMowingController =
	ActivityMowingController).CurrentActivityId = 0),
	(ActivityMowingController.RequestSetDifficulty = (e, t) => {
		var n = Protocol_1.Aki.Protocol.w$n.create();
		(n.YFn = e),
			(n.a3n = t),
			Net_1.Net.Call(10617, n, (n) => {
				var o;
				for ([, o] of (n &&
					n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						n.lkn,
						2e4,
					),
				ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)
					.MowingLevelInfoDict))
					o.a3n = t;
			});
	}),
	(ActivityMowingController.GetRecommendLevel = (e, t) => {
		var n = ActivityMowingController.GetMowingActivityData();
		return n ? n.GetLevelDiffRecommendLevel(e) : 0;
	}),
	(ActivityMowingController.CheckIsActivityLevel = (e) =>
		ActivityMowingController.IsMowingInstanceDungeon(e));

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonthCardController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
	RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
class MonthCardController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return !0;
	}
	static Hki(e) {
		ModelManager_1.ModelManager.MonthCardModel.SetRemainDays(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ReceiveMonthCardDataEvent,
			);
	}
	static async RequestMonthCardData() {
		var e = Protocol_1.Aki.Protocol.mos.create();
		(e = await Net_1.Net.CallAsync(1796, e)) &&
			(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
				? this.Hki(e.rPs)
				: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						20003,
					));
	}
	static jki() {
		ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView &&
			MonthCardController.Wki();
	}
	static Kki() {
		ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView &&
			ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
			UiManager_1.UiManager.IsViewOpen("BattleView") &&
			MonthCardController.Wki();
	}
	static Wki() {
		UiManager_1.UiManager.IsViewOpen("MonthCardRewardView") ||
			UiManager_1.UiManager.OpenView("MonthCardRewardView");
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.k6e),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveBattleView,
				this.vIn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.vIn,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnItemUse,
			this.k6e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActiveBattleView,
				this.vIn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.vIn,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(1826, MonthCardController.Qki),
			Net_1.Net.Register(25574, MonthCardController.Xki);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(1826), Net_1.Net.UnRegister(25574);
	}
}
((exports.MonthCardController = MonthCardController).vIn = () => {
	MonthCardController.Kki();
}),
	(MonthCardController.Qki = (e) => {
		var r = e.I5n,
			t = e.G3n;
		(e = e.rPs),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Shop",
					38,
					"MonthCard:【月卡每日奖励】信息推送 - MonthCardDailyRewardNotify",
					["Count", r],
					["itemId", t],
					["remainDays", e],
				),
			(t = [{ IncId: 0, ItemId: t }, r]);
		(ModelManager_1.ModelManager.MonthCardModel.ServerDailyReward = t),
			(ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView = !0),
			MonthCardController.Hki(e),
			MonthCardController.Kki();
	}),
	(MonthCardController.Xki = (e) => {
		var r = e.rPs;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Shop",
				38,
				"MonthCard:【月卡购买通知】-MonthCardBuyNotify-信息推送",
				["remainDays", r],
			),
			(e = [{ IncId: 0, ItemId: e.G3n }, e.I5n]);
		(ModelManager_1.ModelManager.MonthCardModel.ServerOnceReward = e),
			ModelManager_1.ModelManager.MonthCardModel.GetRemainDays() < 0 &&
				(ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView =
					!0),
			MonthCardController.Hki(r),
			ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
				(0 !==
				(r = (e =
					ModelManager_1.ModelManager.MonthCardModel.ServerOnceReward)[0]
					.ItemId)
					? ((r = new RewardItemData_1.RewardItemData(r, e[1])),
						(e = new Array()).push(r),
						(r =
							ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardRewardId()),
						ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
							r,
							e,
							() => {
								MonthCardController.jki();
							},
						))
					: MonthCardController.jki());
	}),
	(MonthCardController.k6e = (e, r) => {
		let t = (e =
			ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e)).Parameters.get(
			ItemDefines_1.EItemFunctionType.ManualOpenMonthCard,
		);
		(t =
			t ||
			e.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard)) &&
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"UseMonthCard",
			);
	});

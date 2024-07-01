"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemRewardController = void 0);
const AudioController_1 = require("../../../Core/Audio/AudioController"),
	Log_1 = require("../../../Core/Common/Log"),
	Net_1 = require("../../../Core/Net/Net"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	UiModel_1 = require("../../Ui/UiModel"),
	ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	GachaController_1 = require("../Gacha/GachaController"),
	ItemExchangeController_1 = require("../ItemExchange/ItemExchangeController"),
	ItemRewardDefine_1 = require("./ItemRewardDefine"),
	RewardItemData_1 = require("./RewardData/RewardItemData");
class ItemRewardController extends UiControllerBase_1.UiControllerBase {
	static OnRegisterNetEvent() {
		Net_1.Net.Register(5944, this.OnItemObtainNotify);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(5944);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnItemRewardNotify,
			this.bgi,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnItemRewardNotify,
			this.bgi,
		);
	}
	static GetRewardViewReasonArray() {
		if (!this.RewardViewReasonArray) {
			this.RewardViewReasonArray = [];
			for (const e of ConfigManager_1.ConfigManager.ItemRewardConfig?.GetAllRewardViewFromSourceConfig())
				this.RewardViewReasonArray.push(e.RewardSourceId);
		}
		return this.RewardViewReasonArray;
	}
	static OpenCommonRewardView(e, r, a) {
		(e =
			ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(
				e,
				"CommonRewardView",
				r,
				a,
			)) && this.Open(e);
	}
	static OpenQuestRewardView(e, r, a) {
		(e =
			ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(
				e,
				"QuestRewardView",
				r,
				a,
			)) && this.Open(e);
	}
	static OpenExploreLevelRewardView(e) {
		var r =
			ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData();
		r &&
			((r = r.GetExploreLevel()),
			(r =
				ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreLevelRewardData(
					"ExploreLevelRewardView",
					r,
					r + 1,
					e,
				)),
			this.Open(r));
	}
	static OpenCompositeRewardView(e, r = !0, a, o) {
		(e =
			ModelManager_1.ModelManager.ItemRewardModel.RefreshCompositeRewardDataFromConfig(
				e,
				r,
				a,
				o,
			)) && this.Open(e);
	}
	static OpenExploreRewardView(e, r = !0, a, o, t, n, i, d, l, w, s) {
		return (
			!!(e =
				ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(
					e,
					r,
					a,
					o,
					t,
					n,
					i,
					d,
					l,
					w,
				)) && (this.Open(e, s), !0)
		);
	}
	static Open(e, r) {
		var a;
		UiManager_1.UiManager.IsViewOpen("DrawMainView") ||
			((a = e.GetRewardInfo()),
			UiManager_1.UiManager.IsViewOpen(a.ViewName)
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnRefreshRewardView,
						e,
					)
				: ((a = a.ViewName),
					UiManager_1.UiManager.OpenView(a, e, (e, a) => {
						r?.(e),
							e && UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(a);
					})));
	}
	static Close(e) {
		e
			? ((e = e.GetRewardInfo().ViewName),
				UiManager_1.UiManager.IsViewShow(e) &&
					UiManager_1.UiManager.CloseView(e))
			: (UiManager_1.UiManager.IsViewShow("CommonRewardView") &&
					UiManager_1.UiManager.CloseView("CommonRewardView"),
				UiManager_1.UiManager.IsViewShow("CompositeRewardView") &&
					UiManager_1.UiManager.CloseView("CompositeRewardView"),
				UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
					UiManager_1.UiManager.CloseView("ExploreRewardView"));
	}
	static SetItemList(e) {
		ModelManager_1.ModelManager.ItemRewardModel.SetItemList(e);
	}
	static AddItemList(e) {
		ModelManager_1.ModelManager.ItemRewardModel.AddItemList(e);
	}
	static SetProgressQueue(e) {
		ModelManager_1.ModelManager.ItemRewardModel.SetProgressQueue(e);
	}
	static SetExploreBarDataList(e) {
		ModelManager_1.ModelManager.ItemRewardModel.SetExploreBarDataList(e);
	}
	static SetExploreRecordInfo(e) {
		ModelManager_1.ModelManager.ItemRewardModel.SetExploreRecordInfo(e);
	}
	static SetButtonList(e) {
		ModelManager_1.ModelManager.ItemRewardModel.SetButtonList(e);
	}
	static PlayAudio(e, r) {
		var a;
		StringUtils_1.StringUtils.IsEmpty(e) ||
			((a = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e)) &&
				(AudioController_1.AudioController.PostEventByUi(a.Path, r),
				Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug("Test", 8, "[ItemReward]播放结算音频", ["audioId", e]));
	}
}
(exports.ItemRewardController = ItemRewardController),
	((_a = ItemRewardController).RewardViewReasonArray = void 0),
	(ItemRewardController.bgi = (e) => {
		if (!((o = e.Y5n).length <= 0)) {
			var r = [];
			for (const e of o) {
				var a = new RewardItemData_1.RewardItemData(e.G3n, e.I5n, e.Q5n);
				r.push(a);
			}
			var o = ModelManager_1.ModelManager.ItemRewardModel,
				t = e.V5n;
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Test", 8, "[ItemRewardController]当掉落协议通知时", [
					"reasonId",
					t,
				]),
				o.CurrentReasonId !== t && o.ClearCurrentRewardData(),
				(o.CurrentReasonId = t) === ItemRewardDefine_1.EXPLORE_LEVEL_RESON
					? ItemRewardController.OpenExploreLevelRewardView(r)
					: t === ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD
						? (ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = r)
						: t === ItemRewardDefine_1.BLACK_STONE_RESON
							? ((o = []).push({
									ButtonTextId: "ConfirmBox_45_ButtonText_1",
									DescriptionTextId: void 0,
									DescriptionArgs: void 0,
									IsTimeDownCloseView: !1,
									IsClickedCloseView: !1,
									OnClickedCallback: (e) => {
										UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
											UiManager_1.UiManager.CloseView("ExploreRewardView");
									},
								}),
								(e =
									1 < e.W5n
										? ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip(
												[3],
												!1,
											)
										: void 0),
								ItemRewardController.OpenExploreRewardView(
									ItemRewardDefine_1.BLACK_STONE_CONFIG,
									!0,
									r,
									void 0,
									void 0,
									o,
									void 0,
									void 0,
									void 0,
									e,
								))
							: ((o = _a.GetRewardViewReasonArray().includes(t)
									? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
											t,
										)
									: void 0),
								t === ItemRewardDefine_1.QUEST_SPECIAL_REWARD && o
									? ItemRewardController.OpenQuestRewardView(o.RewardViewId, r)
									: o
										? ((e = o.RewardViewId),
											ItemRewardController.OpenCommonRewardView(e, r))
										: ItemRewardController.AddItemList(r));
		}
	}),
	(ItemRewardController.OnItemObtainNotify = (e, r) => {
		if (!((t = e._gs).length <= 0)) {
			var a = [];
			const i = [];
			for (const e of t)
				if (
					1 !==
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
						e.Ekn,
					)
				) {
					var o = new RewardItemData_1.RewardItemData(e.Ekn, e.I5n, e.Q5n);
					a.push(o);
				} else for (let r = 0; r < e.I5n; r++) i.push(e.Ekn);
			var t = ModelManager_1.ModelManager.ItemRewardModel,
				n = e.V5n;
			if (
				(t =
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Test",
							8,
							"[ItemRewardController]当服务端通知奖励获得时",
							["reasonId", n],
						),
					t.CurrentReasonId !== n && t.ClearCurrentRewardData(),
					(t.CurrentReasonId = n),
					_a.GetRewardViewReasonArray().includes(n)
						? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
								n,
							)
						: void 0))
			) {
				if (
					((n = t.RewardViewId),
					(t = t.RewardSourceId) !== ItemRewardDefine_1.ITEM_EXCHANGE_RESON ||
						ItemExchangeController_1.ItemExchangeController.NeedPop)
				)
					if (t === ItemRewardDefine_1.QUEST_SPECIAL_REWARD)
						ItemRewardController.OpenQuestRewardView(n, a, r);
					else if (0 === i.length)
						ItemRewardController.OpenCommonRewardView(n, a, r);
					else if (0 === a.length)
						for (const e of i)
							GachaController_1.GachaController.CommonShowRoleResult(e, !0, !1);
					else
						ItemRewardController.OpenCommonRewardView(n, a, () => {
							for (const e of i)
								GachaController_1.GachaController.CommonShowRoleResult(
									e,
									!0,
									!1,
								);
							r?.();
						});
			} else
				ItemRewardController.AddItemList(a),
					void 0 !== r &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Test", 9, "OnItemObtainNotify err", ["notify", e]);
		}
	});

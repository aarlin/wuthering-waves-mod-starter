"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemController = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	ItemDefine_1 = require("./ItemDefine");
class ItemController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnItemLock,
			ItemController.Vmi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				this.w4e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddCommonItem,
				ItemController.Kdi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddWeaponItem,
				ItemController.Qdi,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnItemLock,
			ItemController.Vmi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				this.w4e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddCommonItem,
				ItemController.Kdi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddWeaponItem,
				ItemController.Qdi,
			);
	}
	static OpenItemTipsByItemId(e, t = void 0) {
		var n = new ItemDefine_1.ItemTipsData();
		(n.ItemId = e), UiManager_1.UiManager.OpenView("ItemTipsView", n, t);
	}
	static OpenItemTipsByItemUid(e, t, n = void 0) {
		var o = new ItemDefine_1.ItemTipsData();
		(o.ItemUid = e),
			(o.ItemId = t),
			UiManager_1.UiManager.OpenView("ItemTipsView", o, n);
	}
	static AddNewItemTip(e) {
		ModelManager_1.ModelManager.ItemModel.PushWaitItemList(e);
	}
	static CheckNewItemTips() {
		var e;
		ModelManager_1.ModelManager.ItemModel.IsWaitItemListEmpty()
			? this.IsPrintNoRewardReason &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"ItemHint",
					8,
					"[NoRewardReason][CheckNewItemTips]当前状态不允许显示入包列表:ItemHint的入包列表为空",
				)
			: UiManager_1.UiManager.IsViewOpen("NewItemTipsView") ||
					!UiManager_1.UiManager.IsViewShow("BattleView")
				? this.IsPrintNoRewardReason &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"ItemHint",
						8,
						"[NoRewardReason][CheckNewItemTips]当前状态不允许显示入包列表:NewItemTipsView在打开中，或BattleView不在显示中",
						[
							"IsNewItemTipsViewOpen",
							UiManager_1.UiManager.IsViewOpen("NewItemTipsView"),
						],
						[
							"IsBattleViewShow",
							UiManager_1.UiManager.IsViewShow("BattleView"),
						],
					)
				: ModelManager_1.ModelManager.SundryModel.IsBlockTips
					? this.IsPrintNoRewardReason &&
						Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"ItemHint",
							8,
							"[NoRewardReason][CheckNewItemTips]当前状态不允许显示入包列表:已经屏蔽弹窗",
						)
					: ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
							"next_new_item_show_time",
						)),
						TimeUtil_1.TimeUtil.GetServerTimeStamp() >=
							ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp + e &&
							(UiManager_1.UiManager.OpenView("NewItemTipsView"),
							AudioSystem_1.AudioSystem.PostEvent(
								"play_ui_item_hint_get_item_first_time",
							),
							(ItemController.LastItemHintAudioPlayedTime = Time_1.Time.Now),
							(ItemController.LastItemHintAudioLevel = 3),
							Log_1.Log.CheckInfo()) &&
							Log_1.Log.Info("Audio", 56, "[Item] 播放新物品提示音效"));
	}
}
((exports.ItemController = ItemController).LastItemHintAudioPlayedTime =
	void 0),
	(ItemController.LastItemHintAudioLevel = 0),
	(ItemController.IsPrintNoRewardReason = !1),
	(ItemController.w4e = () => {
		ModelManager_1.ModelManager.ItemModel.LoadGetItemConfigIdList();
	}),
	(ItemController.Kdi = (e, t) => {
		var n = ModelManager_1.ModelManager.ItemModel;
		e = e.Ekn;
		n.IsGotItem(e) ||
			(0 !==
				ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e)?.ObtainedShow &&
				(t && ItemController.AddNewItemTip(e), n.AddGetItemConfigIdList(e)));
	}),
	(ItemController.Qdi = (e, t, n) => {
		e = e.Ekn;
		var o = ModelManager_1.ModelManager.ItemModel;
		o.IsGotItem(e) ||
			(n && ItemController.AddNewItemTip(e), o.AddGetItemConfigIdList(e));
	}),
	(ItemController.Vmi = (e, t) => {
		t
			? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"ItemLockSuccess",
				)
			: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"ItemUnlockSuccess",
				);
	});

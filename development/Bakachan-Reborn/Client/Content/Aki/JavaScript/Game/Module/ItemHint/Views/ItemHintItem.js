"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemHintItem = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	ItemController_1 = require("../../Item/ItemController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ListSliderControl_1 = require("./ListSliderControl"),
	AUDIO_EFFECT_RARE_LEVEL = 4,
	AUDIO_HINT_CD_MS = 500;
class ItemHintItem extends ListSliderControl_1.SliderItem {
	constructor() {
		super(...arguments),
			(this.CurSequencePlayer = void 0),
			(this.LevelSequencePlayer = void 0),
			(this.Data = void 0),
			(this.zCi = void 0),
			(this.WFt = (e) => {
				"Start" === e
					? this.FinishPlayStart()
					: "Move" === e
						? this.FinishPlayHalfway()
						: "Close" === e && this.FinishPlayEnd();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[3, UE.UIText],
			[2, UE.UIText],
		];
	}
	OnStart() {
		(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.RootItem,
		)),
			this.LevelSequencePlayer.BindSequenceCloseEvent(this.WFt);
	}
	OnBeforeDestroy() {
		this.LevelSequencePlayer &&
			(this.LevelSequencePlayer.Clear(), (this.LevelSequencePlayer = void 0));
	}
	async AsyncLoadUiResource() {
		this.Data =
			ModelManager_1.ModelManager.ItemHintModel.ShiftMainInterfaceData();
		const e = new CustomPromise_1.CustomPromise();
		this.SetItemIcon(this.GetTexture(0), this.Data.ItemId, void 0, () => {
			e.SetResult(void 0);
		}),
			await e.Promise;
	}
	InitData() {
		var e,
			t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
				this.Data.ItemId,
			);
		t &&
			((e = t.Name),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e),
			(e = this.Data.ItemCount),
			this.GetText(2).SetText(e.toString()),
			(e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
				t.QualityId,
			))) &&
			((e = UE.Color.FromHex(e.TextColor)),
			this.GetText(1).SetColor(e),
			this.GetText(3).SetColor(e),
			this.GetText(2).SetColor(e),
			(this.zCi = t.QualityId)),
			(this.CurSequencePlayer = void 0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("ItemHint", 11, "ItemHintItem InitData", [
					"Status",
					this.Status,
				]);
	}
	PlayStart() {
		this.LevelSequencePlayer.PlayLevelSequenceByName("Start"),
			(this.CurSequencePlayer = "Start"),
			this.ZCi();
	}
	ZCi() {
		this.zCi && this.zCi >= 4
			? !ItemController_1.ItemController.LastItemHintAudioPlayedTime ||
				Time_1.Time.Now -
					ItemController_1.ItemController.LastItemHintAudioPlayedTime >
					500 ||
				ItemController_1.ItemController.LastItemHintAudioLevel < 2
				? (AudioSystem_1.AudioSystem.PostEvent(
						"play_ui_item_hint_in_list_rare",
					),
					(ItemController_1.ItemController.LastItemHintAudioLevel = 2),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Audio", 56, "[Item] 播放高品质物品提示音效"),
					(ItemController_1.ItemController.LastItemHintAudioPlayedTime =
						Time_1.Time.Now))
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Audio", 56, "[Item] 物品音效冷却中，不播放音效")
			: !ItemController_1.ItemController.LastItemHintAudioPlayedTime ||
					Time_1.Time.Now -
						ItemController_1.ItemController.LastItemHintAudioPlayedTime >
						500
				? (AudioSystem_1.AudioSystem.PostEvent(
						"play_ui_item_hint_in_list_normal",
					),
					(ItemController_1.ItemController.LastItemHintAudioLevel = 1),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Audio", 56, "[Item] 播放普通品质物品提示音效"),
					(ItemController_1.ItemController.LastItemHintAudioPlayedTime =
						Time_1.Time.Now))
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Audio", 56, "[Item] 物品提示音效冷却中，跳过播放");
	}
	PlayHalfway() {
		this.LevelSequencePlayer.PlayLevelSequenceByName("Move"),
			(this.CurSequencePlayer = "Move");
	}
	PlayEnd() {
		this.LevelSequencePlayer.PlayLevelSequenceByName("Close"),
			(this.CurSequencePlayer = "Close");
	}
	OnActiveStatusChange(e) {
		this.CurSequencePlayer &&
			(e
				? this.LevelSequencePlayer.PauseSequence()
				: this.LevelSequencePlayer.ResumeSequence());
	}
}
exports.ItemHintItem = ItemHintItem;

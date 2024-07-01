"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DrawMainViewNew = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	SHOW_TIPS_DELAY = 2e3;
class DrawMainViewNew extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.Delay = 0),
			(this.IsHold = !1),
			(this.IsShowTips = !1),
			(this.IsEnd = !1),
			(this.MaxQuality = 0),
			(this.HasNewItems = !1),
			(this.LevelSequencePlayer = void 0),
			(this.GachaBP = void 0),
			(this.InitGachaBp = (e, a) => {
				let t = 0;
				1 === e
					? 3 === a
						? (t = 0)
						: 4 === a
							? (t = 1)
							: 5 === a && (t = 2)
					: 4 === a
						? (t = 3)
						: 5 === a && (t = 4),
					(this.MaxQuality = a),
					(this.GachaBP = UE.KuroCollectActorComponent.GetActorWithTag(
						FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"),
						0,
					)),
					this.GachaBP.TSInitParameters(t),
					this.GachaBP.SetTickableWhenPaused(!0),
					this.GachaBP.Timeline_0?.SetTickableWhenPaused(!0);
			}),
			(this.InitAudioState = (e, a) => {
				AudioSystem_1.AudioSystem.SetState(
					"ui_gacha_times",
					1 === e ? "one" : "ten",
				),
					3 === a
						? AudioSystem_1.AudioSystem.SetState(
								"ui_gacha_quality_max",
								"normal",
							)
						: 4 === a
							? AudioSystem_1.AudioSystem.SetState(
									"ui_gacha_quality_max",
									"purple",
								)
							: 5 === a &&
								AudioSystem_1.AudioSystem.SetState(
									"ui_gacha_quality_max",
									"golden",
								);
			}),
			(this.OnClickSkip = () => {
				(this.GachaBP.IsSkip = !0),
					this.GachaBP.WhiteScreen &&
						(this.GachaBP.Timeline_0?.Stop(), this.GachaBP.WhiteScreenOff()),
					this.OnEndGacha();
			}),
			(this.OnEndGacha = () => {
				if (((this.IsShowTips = !0), this.GachaBP.IsSkip))
					if (5 === this.MaxQuality || this.HasNewItems) {
						let e = this.OpenParam;
						e
							? (e.IsOnlyShowGold = !0)
							: (e = {
									SkipOnLoadResourceFinish: !1,
									ResultViewHideExtraReward: !1,
									IsOnlyShowGold: !0,
								}),
							UiManager_1.UiManager.OpenView("GachaScanView", e, () => {
								UiManager_1.UiManager.CloseView(this.Info.Name);
							});
					} else
						UiManager_1.UiManager.OpenView(
							"GachaResultView",
							this.OpenParam,
							() => {
								UiManager_1.UiManager.CloseView(this.Info.Name);
							},
						);
				else
					UiManager_1.UiManager.OpenView(
						"GachaScanView",
						this.OpenParam,
						() => {
							UiManager_1.UiManager.CloseView(this.Info.Name);
						},
					);
			}),
			(this.OnGachaInteractFinish = () => {
				(this.IsEnd = !0), this.IsShowTips;
			}),
			(this.OnGachaClick = (e) => {
				e
					? ((this.IsHold = !0), (this.Delay = 0), (this.IsShowTips = !1))
					: (this.IsHold = !1);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIDraggableComponent],
			[1, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[1, this.OnClickSkip]]);
	}
	async OnBeforeStartAsync() {
		var e = [];
		for (const a of ModelManager_1.ModelManager.GachaModel.CurGachaResult)
			e.push(a.u5n.G3n);
		await ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence(e);
	}
	OnBeforeShow() {
		var e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length,
			a = ModelManager_1.ModelManager.GachaModel.CurGachaResult.reduce(
				(e, a) => {
					var t = a.u5n.G3n;
					t =
						ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)
							?.QualityId ?? 0;
					return (
						(this.HasNewItems = this.HasNewItems || (4 <= t && a.IsNew)),
						Math.max(e, t)
					);
				},
				0,
			);
		this.InitGachaBp(e, a), this.InitAudioState(e, a);
	}
	OnStart() {
		this.GetButton(1).RootUIComp.SetUIActive(!0),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			));
	}
	OnTick(e) {
		this.IsHold ||
			this.IsShowTips ||
			this.IsEnd ||
			((this.Delay += e), this.Delay > 2e3 && (this.IsShowTips = !0));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.EndGachaScene,
			this.OnEndGacha,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GachaClick,
				this.OnGachaClick,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GachaInteractFinish,
				this.OnGachaInteractFinish,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.EndGachaScene,
			this.OnEndGacha,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GachaClick,
				this.OnGachaClick,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GachaInteractFinish,
				this.OnGachaInteractFinish,
			);
	}
}
exports.DrawMainViewNew = DrawMainViewNew;

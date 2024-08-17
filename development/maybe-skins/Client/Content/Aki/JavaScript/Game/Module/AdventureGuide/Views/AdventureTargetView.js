"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdventureTargetView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	AdventureGuideController_1 = require("../AdventureGuideController"),
	AdventureTargetItem_1 = require("./AdventureTargetItem"),
	AdventureTargetRewardItem_1 = require("./AdventureTargetRewardItem"),
	REWARD_RECEIVED = "ChapterRewardGet",
	NOT_FINISH_TIP = "NotFinishedTip",
	GET_REWARD = "GetReward",
	FRONT_ADD_FRAME = 0.01;
class AdventureTargetView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.DFe = void 0),
			(this.W5e = 0),
			(this.K5e = void 0),
			(this.Q5e = void 0),
			(this.X5e = void 0),
			(this.$5e = 0),
			(this.Y5e = !1),
			(this.EPe = void 0),
			(this.q5e = () => {
				var e = new AdventureTargetRewardItem_1.AdventureTargetRewardItem();
				return (
					e.BindOnExtendToggleClicked(this.J5e),
					e.BindOnCanExecuteChange(this.z5e),
					e
				);
			}),
			(this.J5e = (e) => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					e.Data[0].ItemId,
				);
			}),
			(this.z5e = () => !1),
			(this.Z5e = () => new AdventureTargetItem_1.AdventureTargetItem()),
			(this.eVe = () => {
				var e;
				1 < this.W5e &&
					(this.X5e?.SetFillAmount(0),
					(e = this.W5e - 1),
					this.SetAdventureTargetInfoByChapter(
						e,
						e <=
							ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
					)),
					this.EPe?.StopCurrentSequence(!1, !0),
					this.EPe?.PlayLevelSequenceByName("Switch");
			}),
			(this.tVe = () => {
				var e;
				this.W5e <
					ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter() &&
					(this.X5e?.SetFillAmount(0),
					(e = this.W5e + 1),
					this.SetAdventureTargetInfoByChapter(
						e,
						e <=
							ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
					)),
					this.EPe?.StopCurrentSequence(!1, !0),
					this.EPe?.PlayLevelSequenceByName("Switch");
			}),
			(this.iVe = () => {
				var e =
					ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(
						this.W5e,
					);
				e.Received === e.Total
					? (ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForChapterReward(
							this.W5e,
						),
						this.K5e.SetSelfInteractive(!1))
					: ((e =
							ConfigManager_1.ConfigManager.TextConfig.GetTextById(
								NOT_FINISH_TIP,
							)),
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
							e,
						));
			}),
			(this.oVe = (e) => {
				this.W5e === e &&
					(this.SetAdventureTargetInfoByChapter(e, !1),
					this.GetItem(9).SetUIActive(!1),
					this.tVe());
			}),
			(this.rVe = (e) => {
				ModelManager_1.ModelManager.AdventureGuideModel.IsTaskOfChapter(
					e,
					this.W5e,
				) &&
					((this.Y5e = !0),
					(e = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterTasks(
						this.W5e,
					)),
					this.SetAdventureTargetInfoByChapter(this.W5e, !1),
					(e = ModelManager_1.ModelManager.AdventureGuideModel.SortChapterTasks(
						this.W5e,
					)),
					this.Q5e?.RefreshByData(e));
			}),
			(this.nVe = () => {
				this.Y5e = !1;
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UILayoutBase],
			[8, UE.UISprite],
			[9, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIScrollViewWithScrollbarComponent],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[0, this.iVe],
				[3, this.eVe],
				[4, this.tVe],
			]);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.AdventureTaskStateChange,
			this.rVe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChapterRewardReceived,
				this.oVe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnCloseRewardView,
				this.nVe,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.AdventureTaskStateChange,
			this.rVe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChapterRewardReceived,
				this.oVe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnCloseRewardView,
				this.nVe,
			);
	}
	OnTickUiTabViewBase(e) {
		var t;
		this.Y5e ||
			((t = this.X5e.fillAmount) < this.$5e &&
				this.X5e.SetFillAmount(t + 0.01));
	}
	OnStart() {
		(this.X5e = this.GetSprite(8)),
			this.X5e.SetFillAmount(0),
			this.GetItem(14).SetUIActive(!0),
			(this.K5e = this.GetButton(0)),
			this.GetItem(5).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			(this.DFe = new GenericLayout_1.GenericLayout(
				this.GetLayoutBase(7),
				this.q5e,
			)),
			(this.Q5e = new GenericScrollViewNew_1.GenericScrollViewNew(
				this.GetScrollViewWithScrollbar(12),
				this.Z5e,
			)),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	OnBeforeDestroy() {
		(this.DFe = void 0),
			(this.Q5e = void 0),
			this.EPe?.Clear(),
			(this.EPe = void 0);
	}
	sVe(e) {
		var t = this.GetButton(3),
			r = this.GetButton(4);
		t?.SetSelfInteractive(!0),
			r?.SetSelfInteractive(!0),
			1 === e && t?.SetSelfInteractive(!1),
			e ===
				ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter() &&
				r?.SetSelfInteractive(!1);
	}
	OnBeforeShow() {
		let e = ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter();
		var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter();
		e > t && (e = t),
			this.SetAdventureTargetInfoByChapter(e),
			this.EPe?.StopCurrentSequence(),
			this.EPe?.PlayLevelSequenceByName("Start"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AdventureHelpBtn,
				0,
			);
	}
	SetAdventureTargetInfoByChapter(e, t = !0) {
		(this.W5e = e),
			this.SetChapterInfo(e),
			t &&
				((t =
					ModelManager_1.ModelManager.AdventureGuideModel.SortChapterTasks(e)),
				this.aVe(t)),
			this.sVe(e),
			this.hVe(e);
	}
	SetChapterInfo(e) {
		var t =
				ConfigManager_1.ConfigManager.AdventureModuleConfig.GetChapterAdventureConfig(
					e,
				),
			r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(
				t.DropIds,
			),
			i = new Array(),
			n =
				((t =
					ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter()),
				ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter()),
			a = this.GetItem(11),
			o = this.GetScrollViewWithScrollbar(12).GetRootComponent(),
			s = this.GetItem(13),
			l = this.GetText(10);
		for (const e of r.keys()) {
			var d = [{ IncId: 0, ItemId: e }, r.get(e)];
			i.push(d);
		}
		this.DFe.RefreshByData(i),
			this.K5e?.RootUIComp.SetUIActive(e === n),
			e <= n
				? (e <= t
						? (this.K5e.SetSelfInteractive(!1),
							LguiUtil_1.LguiUtil.SetLocalText(l, REWARD_RECEIVED))
						: (this.K5e.SetSelfInteractive(!0),
							(n =
								ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(
									e,
								)).Total === n.Received
								? (LguiUtil_1.LguiUtil.SetLocalText(l, GET_REWARD),
									this.K5e.SetSelfInteractive(!0))
								: (LguiUtil_1.LguiUtil.SetLocalText(
										l,
										AdventureGuideController_1.DOING,
									),
									this.K5e.SetSelfInteractive(!1))),
					a.SetUIActive(!0),
					o.SetUIActive(!0),
					s.SetUIActive(!1))
				: (o.SetUIActive(!1), s.SetUIActive(!0));
	}
	aVe(e) {
		this.Q5e?.RefreshByData(e);
	}
	hVe(e) {
		var t =
			ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(e);
		this.GetText(6).SetText(t.Received + "/" + t.Total),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(15),
				"Adventure_Taget_State_Number",
				e,
			),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(1),
				"Adventure_Taget_State",
			),
			(this.$5e = t.Received / t.Total),
			this.GetItem(9).SetUIActive(
				t.Total === t.Received &&
					e >
						ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter(),
			);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t = Number(e[0]);
		if ((t = this.DFe.GetGridByDisplayIndex(t))) return [t, t];
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				e,
			]);
	}
}
exports.AdventureTargetView = AdventureTargetView;

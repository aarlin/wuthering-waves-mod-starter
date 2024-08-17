"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	CommonSearchComponent_1 = require("../Common/InputView/CommonSearchComponent"),
	CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
	CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
	TutorialDataItem_1 = require("./SubView/TutorialDataItem"),
	TutorialDynItem_1 = require("./SubView/TutorialDynItem"),
	TutorialPageItem_1 = require("./SubView/TutorialPageItem"),
	TutorialController_1 = require("./TutorialController"),
	TutorialDefine_1 = require("./TutorialDefine");
class TutorialView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.cpt = void 0),
			(this.XAt = void 0),
			(this.tPe = void 0),
			(this.dqe = void 0),
			(this.kDo = void 0),
			(this.FDo = void 0),
			(this.KVe = []),
			(this.VDo = 0),
			(this.dqt = void 0),
			(this.HDo = void 0),
			(this.Mbe = (t) => {
				var e = (t = ModelManager_1.ModelManager.TutorialModel.MakeSearchList(
					t,
					this.kDo,
				)).ItemData;
				this.GetItem(5).SetUIActive(!e.length),
					e.length || this.jDo(),
					t.HasTutorial ||
						this.kDo === TutorialDefine_1.ETutorialType.All ||
						this.jDo(),
					this.XAt.RefreshByData(e);
			}),
			(this.Tqe = () => {
				this.WDo(this.kDo), this.GetItem(4).SetUIActive(!0);
			}),
			(this.hPe = (t, e, i) => {
				var o = void 0;
				return (
					(o = new TutorialPageItem_1.TutorialPageItem(e)).Init(),
					o.UpdateShow(!1),
					{ Key: i, Value: o }
				);
			}),
			(this.dVe = (t, e) => new CommonTabItem_1.CommonTabItem()),
			(this.WDo = (t) => {
				(t = this.KVe[t]),
					(this.kDo = t),
					this.dqe.ResetSearch(!0),
					(t =
						ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(
							t,
						)),
					this.XAt.RefreshByData(t),
					t.length
						? TimerSystem_1.TimerSystem.Next(() => {
								this.XAt?.GetScrollItemFromIndex(0).OnSelected(!0);
							})
						: this.jDo(),
					this.GetItem(5).SetUIActive(!t.length),
					this.dqe.SetActive(!!t.length),
					this.UiViewSequence.PlaySequence("Switch"),
					this.GetUIDynScrollViewComponent(2).RootUIComp.SetUIActive(
						!!t.length,
					);
			}),
			(this.yqe = (t) => {
				var e = this.KVe[t];
				(e = TutorialDefine_1.TutorialUtils.GetTutorialTypeIconPath(e)),
					(t = TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(this.KVe[t]));
				return new CommonTabData_1.CommonTabData(
					e,
					new CommonTabTitleData_1.CommonTabTitleData(t),
				);
			}),
			(this.KDo = (t, e, i) => {
				var o = new TutorialDataItem_1.TutorialDataItem();
				return o.InitData(t), o.SetOnToggleSelected(this.QDo), o;
			}),
			(this.qDn = () => {
				var t,
					e,
					i =
						ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(
							this.kDo,
						);
				for ([t, e] of i.entries()) e.Selected = 0 === t;
				this.XAt.RefreshByData(i);
			}),
			(this.XDo = () => {
				for (const t of this.XAt.GetScrollItemItems()) t.RefreshRed();
			}),
			(this.QDo = (t, e) => {
				this.FDo !== e && (this.FDo?.SetToggleState(0, !1), (this.FDo = e)),
					this.GetItem(5).SetUIActive(!1),
					this.qIt(t);
			}),
			(this.$Do = () => {
				0 < this.VDo &&
					(this.UiViewSequence.PlaySequence("SwitchLeft"),
					this.YDo(this.VDo - 1));
			}),
			(this.JDo = () => {
				this.VDo < this.HDo.length - 1 &&
					(this.UiViewSequence.PlaySequence("SwitchRight"),
					this.YDo(this.VDo + 1));
			}),
			(this.lPe = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIDynScrollViewComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UITexture],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIHorizontalLayout],
			[13, UE.UIItem],
			[14, UE.UIButtonComponent],
			[15, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[14, this.$Do],
				[15, this.JDo],
			]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RedDotNewTutorial,
			this.XDo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnTutorialUpdate,
				this.qDn,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RedDotNewTutorial,
			this.XDo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnTutorialUpdate,
				this.qDn,
			);
	}
	async OnBeforeStartAsync() {
		(this.XAt = new DynScrollView_1.DynamicScrollView(
			this.GetUIDynScrollViewComponent(2),
			this.GetItem(3),
			new TutorialDynItem_1.TutorialDynItem(),
			this.KDo,
		)),
			await this.XAt.Init();
	}
	OnStart() {
		this.GetItem(3).SetUIActive(!1);
		for (const e in TutorialDefine_1.ETutorialType) {
			var t = Number(e);
			isNaN(t) || this.KVe.push(t);
		}
		this.dqe = new CommonSearchComponent_1.CommonSearchComponent(
			this.GetItem(1),
			this.Mbe,
			this.Tqe,
		);
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.dVe,
			this.WDo,
			this.yqe,
		);
		(this.cpt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
			this.GetItem(0),
			e,
			this.lPe,
		)),
			(this.tPe = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(12),
				this.hPe,
				this.GetItem(13),
			)),
			this.jDo();
	}
	jDo() {
		this.GetItem(4).SetUIActive(!1), (this.dqt = void 0);
	}
	OnBeforeShow() {
		var t = this.KVe.length,
			e = this.cpt.CreateTabItemDataByLength(t);
		for (let o = 0; o < t; o++) {
			var i = this.KVe[o];
			i === TutorialDefine_1.ETutorialType.All &&
				((e[o].RedDotName = "TutorialTypeNew"), (e[o].RedDotUid = i));
		}
		this.cpt.RefreshTabItem(e, () => {
			this.cpt.SelectToggleByIndex(0);
		});
	}
	OnAfterHide() {
		this.XAt.ClearChildren(), this.jDo(), (this.FDo = void 0);
	}
	OnBeforeDestroy() {
		this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
			this.tPe && (this.tPe.ClearChildren(), (this.tPe = void 0)),
			this.dqe?.Destroy(),
			this.XAt?.ClearChildren(),
			(this.XAt = void 0),
			(this.KVe = []),
			TutorialController_1.TutorialController.TryOpenAwardUiViewPending();
	}
	qIt(t) {
		this.GetItem(4).SetUIActive(!0),
			this.dqt !== t && this.UiViewSequence.PlaySequence("SwitchPage"),
			this.dqt && (this.dqt.Selected = !1),
			(this.dqt = t),
			(this.dqt.Selected = !0),
			(this.VDo = 0),
			this.dqt.SavedData.HasRedDot &&
				TutorialController_1.TutorialController.RemoveRedDotTutorialId(
					this.dqt.SavedData.TutorialId,
				),
			(t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPageIds(
				this.dqt.SavedData.TutorialId,
			)),
			(this.HDo = t).length <= 1
				? (this.GetButton(14).RootUIComp.SetUIActive(!1),
					this.GetButton(15).RootUIComp.SetUIActive(!1),
					this.GetItem(11).SetUIActive(!1))
				: (this.GetButton(14).RootUIComp.SetUIActive(!0),
					this.GetButton(15).RootUIComp.SetUIActive(!0),
					this.GetItem(11).SetUIActive(!0),
					this.tPe.RebuildLayoutByDataNew(this.HDo)),
			this.YDo(this.VDo);
	}
	YDo(t) {
		var e;
		1 < this.HDo.length &&
			(this.tPe.GetLayoutItemByIndex(this.VDo).UpdateShow(!1),
			this.tPe.GetLayoutItemByIndex(t).UpdateShow(!0)),
			(this.VDo = t),
			(t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(
				this.HDo[t],
			)).Pic && ((e = this.GetTexture(6)), this.SetTextureByPath(t.Pic, e)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.Title),
			StringUtils_1.StringUtils.IsEmpty(t.SubTitle)
				? this.GetItem(8).SetUIActive(!1)
				: (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.SubTitle),
					this.GetItem(8).SetUIActive(!0)),
			1 < this.HDo.length &&
				(this.GetButton(14).SetSelfInteractive(0 < this.VDo),
				this.GetButton(15).SetSelfInteractive(this.VDo < this.HDo.length - 1));
		let i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Content);
		(i = i.split("/n").join("")), this.GetText(10).SetText(i);
	}
}
exports.TutorialView = TutorialView;

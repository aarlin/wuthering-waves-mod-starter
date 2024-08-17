"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideTutorialTipsView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	TutorialController_1 = require("../../Tutorial/TutorialController"),
	TutorialDefine_1 = require("../../Tutorial/TutorialDefine"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class GuideTutorialTipsView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.TutorialInfo = void 0),
			(this.vzt = void 0),
			(this.Mzt = 0),
			(this.Szt = void 0),
			(this.Ezt = (e, t = 1) => {
				t &&
					this.RootItem?.bIsUIActive &&
					!UiManager_1.UiManager.IsViewOpen("LoadingView") &&
					(this.TutorialInfo.ClickToPopState(),
					this.UiViewSequence.PlaySequence("CloseTips", !0));
			}),
			(this.czt = () => {
				(this.TutorialInfo.TipState = 1),
					UiManager_1.UiManager.CloseView(this.Info.Name, () => {
						ModelManager_1.ModelManager.GuideModel.TryShowTutorial();
					});
			}),
			(this.yzt = () => {
				2 === this.TutorialInfo.TipState
					? this.CloseMe(() => {
							ModelManager_1.ModelManager.GuideModel.TryShowGuideTutorialView();
						})
					: this.Izt();
			}),
			(this.Tzt = () => {
				this.SetActive(UiManager_1.UiManager.IsViewShow("BattleView"));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UISprite],
			[2, UE.UIButtonComponent],
			[3, UE.UISprite],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.Ezt]]);
	}
	async OnCreateAsync() {
		if (((this.TutorialInfo = this.OpenParam), this.TutorialInfo.OwnerStep)) {
			const i = new CustomPromise_1.CustomPromise();
			(this.vzt = this.TutorialInfo.OwnerStep.ViewData.ViewConf),
				(this.Mzt = this.TutorialInfo.OwnerStep.Config.Duration);
			var e = this.vzt.TutorialType,
				t = TutorialDefine_1.TutorialUtils.GetTutorialTypeIconPath(e);
			t
				? ResourceSystem_1.ResourceSystem.LoadAsync(
						t,
						UE.LGUISpriteData_BaseObject,
						(e) => {
							e.IsValid() && (this.Szt = e), i.SetResult(!0);
						},
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Guide",
						17,
						`图文教程引导组${this.TutorialInfo.OwnerStep.Id}的教程分类组id不合法，找不到对应图标`,
						["不合法的分类组Id", e],
					),
				await i.Promise;
		} else this.Izt();
	}
	OnStart() {
		var e,
			t = this.GetText(0);
		this.vzt
			? ((e = this.vzt.GroupName),
				LguiUtil_1.LguiUtil.SetLocalTextNew(t, e),
				this.Szt && this.GetSprite(1).SetSprite(this.Szt),
				(t = TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(
					this.vzt.TutorialType,
				)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t),
				this.GetSprite(3).SetFillAmount(1),
				this.UiViewSequence.AddSequenceFinishEvent("StartTips", this.czt),
				this.UiViewSequence.AddSequenceFinishEvent("CloseTips", this.yzt),
				TutorialController_1.TutorialController.OnTutorialTipExistChanged(!0))
			: this.WaitToDestroy || this.Izt();
	}
	OnAfterShow() {
		0 === this.TutorialInfo.TipState
			? this.UiViewSequence.PlaySequence("StartTips")
			: this.UiViewSequence.PlaySequence("StartAtOnce");
	}
	OnBeforeDestroy() {
		TutorialController_1.TutorialController.OnTutorialTipExistChanged(!1);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideHUD, this.Tzt),
			EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowHUD, this.Tzt);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.HideHUD,
			this.Tzt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ShowHUD,
				this.Tzt,
			);
	}
	OnTick(e) {
		var t;
		this.IsShow &&
			((t = this.TutorialInfo.Duration / this.Mzt),
			this.GetSprite(3)?.SetFillAmount(t),
			this.TutorialInfo.Duration <= 0) &&
			"CloseTips" !== this.UiViewSequence.CurrentSequenceName &&
			(this.UiViewSequence.StopPrevSequence(!1),
			this.UiViewSequence.PlaySequence("CloseTips", !0));
	}
	Izt() {
		UiManager_1.UiManager.CloseView(this.Info.Name, () => {
			TutorialController_1.TutorialController.TryOpenAwardUiViewPending(),
				ModelManager_1.ModelManager.GuideModel.TryShowTutorial();
		});
	}
}
exports.GuideTutorialTipsView = GuideTutorialTipsView;

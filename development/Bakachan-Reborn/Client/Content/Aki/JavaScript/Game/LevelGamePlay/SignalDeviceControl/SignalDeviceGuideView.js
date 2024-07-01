"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDeviceGuideView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	GuideTutorialPagePanel_1 = require("../../Module/Guide/Views/GuideTutorialPagePanel"),
	TutorialPageItem_1 = require("../../Module/Tutorial/SubView/TutorialPageItem"),
	GenericLayoutNew_1 = require("../../Module/Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	TWEEN_TIME = 0.3,
	GUIDE_ID = 34033;
class SignalDeviceGuideView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.IsPopView = !0),
			(this.ZAe = void 0),
			(this.ePe = 0),
			(this.tPe = void 0),
			(this.iPe = void 0),
			(this.oPe = void 0),
			(this.rPe = void 0),
			(this.nPe = () => {
				var e, t, i;
				!this.rPe &&
					0 < this.ePe &&
					((t = (e = this.iPe.GetRootItem()).RelativeLocation),
					(i = this.GetItem(12)).SetUIRelativeLocation(
						new UE.Vector(-i.Width, i.RelativeLocation.Y, i.RelativeLocation.Z),
					),
					this.sPe(),
					this.oPe
						.GetRootItem()
						.SetUIRelativeLocation(new UE.Vector(e.Width, t.Y, t.Z)),
					this.Og(this.ePe - 1),
					(this.rPe = UE.LTweenBPLibrary.LocalPositionXTo(i, 0, 0.3, 0, 6)),
					this.rPe.OnCompleteCallBack.Bind(() => {
						this.rPe = void 0;
					}));
			}),
			(this.aPe = () => {
				var e, t, i;
				!this.rPe &&
					this.ePe < this.ZAe.length - 1 &&
					((t = (e = this.iPe.GetRootItem()).RelativeLocation),
					(i = this.GetItem(12)).SetUIRelativeLocation(
						new UE.Vector(i.Width, i.RelativeLocation.Y, i.RelativeLocation.Z),
					),
					this.sPe(),
					this.oPe
						.GetRootItem()
						.SetUIRelativeLocation(new UE.Vector(-e.Width, t.Y, t.Z)),
					this.Og(this.ePe + 1),
					(this.rPe = UE.LTweenBPLibrary.LocalPositionXTo(i, 0, 0.3, 0, 6)),
					this.rPe.OnCompleteCallBack.Bind(() => {
						this.rPe = void 0;
					}));
			}),
			(this.hPe = (e, t, i) => {
				var o = void 0;
				return (
					(o = new TutorialPageItem_1.TutorialPageItem(t)).Init(),
					o.UpdateShow(!1),
					{ Key: i, Value: o }
				);
			}),
			(this.lPe = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIHorizontalLayout],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[2, this.lPe],
				[7, this.nPe],
				[8, this.aPe],
			]);
	}
	OnBeforeDestroy() {
		this.tPe && (this.tPe.ClearChildren(), (this.tPe = void 0)),
			this.iPe.Destroy(),
			(this.iPe = void 0),
			this.oPe && (this.oPe.Destroy(), (this.oPe = void 0)),
			this.rPe && (this.rPe.Kill(), (this.rPe = void 0));
	}
	_Pe() {
		this.UiViewSequence.PlaySequence("StartAtOnce");
	}
	sPe() {
		var e;
		this.oPe ||
			((e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), this.GetItem(12))),
			(this.oPe = new GuideTutorialPagePanel_1.GuideTutorialPagePanel()),
			this.oPe.Init(e)),
			this.iPe.PlayAnime(!0),
			this.oPe.PlayAnime(!1);
	}
	async OnBeforeStartAsync() {
		(this.iPe = new GuideTutorialPagePanel_1.GuideTutorialPagePanel()),
			await this.iPe.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
	}
	OnStart() {
		(this.tPe = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetHorizontalLayout(5),
			this.hPe,
			this.GetItem(6),
		)),
			(this.ZAe =
				ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPageIds(
					34033,
				)),
			this.ZAe.length <= 1
				? (this.GetButton(7).RootUIComp.SetUIActive(!1),
					this.GetButton(8).RootUIComp.SetUIActive(!1),
					this.GetItem(4).SetUIActive(!1))
				: (this.GetButton(7).RootUIComp.SetUIActive(!0),
					this.GetButton(8).RootUIComp.SetUIActive(!0),
					this.GetItem(4).SetUIActive(!0),
					this.tPe.RebuildLayoutByDataNew(this.ZAe)),
			this.Og(0);
	}
	OnBeforeShow() {
		this._Pe();
	}
	Og(e) {
		1 < this.ZAe.length &&
			(this.tPe.GetLayoutItemByIndex(this.ePe).UpdateShow(!1),
			this.tPe.GetLayoutItemByIndex(e).UpdateShow(!0),
			this.GetButton(7).SetSelfInteractive(0 < e),
			this.GetButton(8).SetSelfInteractive(e < this.ZAe.length - 1),
			this.oPe) &&
			((t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(
				this.ZAe[this.ePe],
			)),
			this.oPe.RefreshPage(t)),
			(this.ePe = e);
		var t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(
			this.ZAe[this.ePe],
		);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title),
			this.iPe.RefreshPage(t);
	}
}
exports.SignalDeviceGuideView = SignalDeviceGuideView;

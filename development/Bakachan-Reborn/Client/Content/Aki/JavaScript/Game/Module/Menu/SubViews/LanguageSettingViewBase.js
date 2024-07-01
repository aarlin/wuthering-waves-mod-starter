"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LanguageToggleBase = exports.LanguageSettingViewBase = void 0);
const UE = require("ue"),
	LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
	LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	MenuController_1 = require("../MenuController"),
	MenuTool_1 = require("../MenuTool");
class LanguageSettingViewBase extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.MenuDataIns = void 0),
			(this.CancelButton = void 0),
			(this.ConfirmButton = void 0),
			(this.ScrollView = void 0),
			(this.SelectedToggle = void 0),
			(this.lwi = void 0),
			(this.IsConfirm = !1),
			(this.Jqt = () => {
				this.CloseMe();
			}),
			(this._wi = () => {
				(this.IsConfirm = !0), this.Jqt();
			}),
			(this.DoSelected = (e, t) => {
				this.SelectedToggle !== e && 1 === t && this.SelectedToggle?.UnSelect(),
					(this.SelectedToggle = e),
					this.OnSelected(this.SelectedToggle, t);
			}),
			(this.DoRefreshScrollView = (e, t) => {
				var i = MenuTool_1.MenuTool.GetAudioCodeById(e);
				(i = LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(i)),
					(i =
						i?.LanguageCode === LanguageSystem_1.LanguageSystem.PackageAudio &&
						2 === i.Status);
				(t = this.CreateToggle(t, e, i)) &&
					(i ? (this.SelectedToggle = t) : t.UnSelect(),
					t.SetSelectedCallBack(this.DoSelected),
					this.OnRefreshView(t));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIScrollViewWithScrollbarComponent],
		];
	}
	OnStart() {
		(this.lwi = this.OpenParam),
			(this.MenuDataIns = this.lwi[0]),
			(this.CancelButton = new ButtonItem_1.ButtonItem(this.GetItem(1))),
			(this.ConfirmButton = new ButtonItem_1.ButtonItem(this.GetItem(2))),
			this.CancelButton.SetFunction(this.Jqt),
			this.ConfirmButton.SetFunction(this._wi),
			(this.ScrollView = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(3),
				this.DoRefreshScrollView,
			)),
			this.InitScrollViewData();
		var e = this.GetText(0);
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			e,
			this.MenuDataIns.MenuDataFunctionName ?? "",
		),
			this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
				this.Jqt();
			});
	}
	InitScrollViewData() {
		var e = [];
		for (const t of MenuTool_1.MenuTool.GetLanguageDefineData())
			e.push(t.LanguageType);
		this.ScrollView.RefreshByData(e.sort((e, t) => e - t));
	}
	OnAfterHide() {
		var e = MenuController_1.MenuController.GetTargetConfig(
			this.MenuDataIns.MenuDataFunctionId,
		);
		this.IsConfirm &&
			this.SelectedToggle.GetIndex() !== e &&
			(this.MenuDataIns.MenuDataOptionsValueList.length &&
				MenuController_1.MenuController.NoticeChange(
					this.MenuDataIns.MenuDataFunctionId,
				),
			this.lwi[1](
				this.lwi[0].MenuDataFunctionId,
				this.SelectedToggle.GetIndex(),
			)),
			(this.IsConfirm = !1);
	}
	OnBeforeDestroyImplement() {
		this.ScrollView &&
			(this.ScrollView.ClearChildren(), (this.ScrollView = void 0));
	}
	CreateToggle(e, t, i) {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Menu", 8, "必须重写CreateToggle");
	}
	OnRefreshView(e) {}
	OnSelected(e, t) {}
}
exports.LanguageSettingViewBase = LanguageSettingViewBase;
class LanguageToggleBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.ProgressBuilder = new StringBuilder_1.StringBuilder()),
			(this.Index = 0),
			(this.PreToggled = !1),
			(this.SelectedCallBack = void 0),
			(this.MainText = void 0),
			(this.uwi = (e) => {
				this.SelectedCallBack?.(this, e), this.OnSelected();
			});
	}
	Initialize(e, t, i) {
		(this.Index = t),
			(this.PreToggled = i),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.uwi]]);
	}
	OnStart() {
		this.PreToggled && this.GetExtendToggle(0).SetToggleState(1, !1),
			(this.MainText = this.GetText(1));
	}
	OnBeforeDestroyImplement() {
		this.GetExtendToggle(0).CanExecuteChange.Unbind(),
			this.ProgressBuilder.Clear();
	}
	SetSelectedCallBack(e) {
		this.SelectedCallBack = e;
	}
	SetMainText(e) {
		this.MainText.ShowTextNew(e);
	}
	GetMainText() {
		return this.MainText.text;
	}
	GetIndex() {
		return this.Index;
	}
	UnSelect() {
		this.GetExtendToggle(0).SetToggleState(0, !1), this.OnUnSelected();
	}
	OnSelected() {}
	OnUnSelected() {}
}
exports.LanguageToggleBase = LanguageToggleBase;

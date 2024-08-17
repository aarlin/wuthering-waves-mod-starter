"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VoiceLanguageSelectToggle = exports.VoiceLanguageSelectView =
		void 0);
const LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	MenuController_1 = require("../MenuController"),
	MenuTool_1 = require("../MenuTool"),
	LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class VoiceLanguageSelectView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
	constructor() {
		super(...arguments),
			(this.bwi = () => {
				this.CloseMe();
			}),
			(this.Gwi = () => {
				switch (this.SelectedToggle.Updater.Status) {
					case 2:
						(this.IsConfirm = !0), this.bwi();
						break;
					case 0:
					case 1:
						UiManager_1.UiManager.OpenView("VoiceLanguageDownloadView", [
							MenuController_1.MenuController.GetTargetMenuData(53),
							void 0,
						]),
							this.bwi();
				}
			});
	}
	InitScrollViewData() {
		var e =
			LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguageTypeForAudio();
		this.ScrollView.RefreshByData(e.sort((e, t) => e - t)),
			this.CancelButton.SetFunction(this.bwi),
			this.ConfirmButton.SetFunction(this.Gwi),
			this.ConfirmButton.SetLocalText("PowerConfirm");
	}
	CreateToggle(e, t, a) {
		var i = new VoiceLanguageSelectToggle();
		return i.Initialize(e, t, a), i;
	}
	OnRefreshView(e) {
		var t = this.MenuDataIns.MenuDataOptionsNameList[e.GetIndex()];
		e.SetMainText(t);
	}
	OnSelected(e, t) {
		2 === e.Updater.Status
			? this.ConfirmButton.SetLocalText("PowerConfirm")
			: this.ConfirmButton.SetLocalText("GoToDownload");
	}
}
exports.VoiceLanguageSelectView = VoiceLanguageSelectView;
class VoiceLanguageSelectToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
	constructor() {
		super(...arguments), (this.Updater = void 0);
	}
	OnRegisterComponent() {
		super.OnRegisterComponent();
	}
	OnStart() {
		super.OnStart();
		var e = MenuTool_1.MenuTool.GetAudioCodeById(this.Index);
		(e =
			((this.Updater =
				LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(e)),
			this.GetText(2))).SetUIActive(!0),
			this.PreToggled
				? LguiUtil_1.LguiUtil.SetLocalText(e, "InUse")
				: 2 !== this.Updater.Status
					? LguiUtil_1.LguiUtil.SetLocalText(e, "NotDownloaded")
					: e.SetText(""),
			this.Updater.CalculateDownloadStatus();
	}
}
exports.VoiceLanguageSelectToggle = VoiceLanguageSelectToggle;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VoiceLanguageToggle = exports.VoiceLanguageDownloadView = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	NetworkDefine_1 = require("../../../../Launcher/NetworkDefine"),
	ResourceUpdateView_1 = require("../../../../Launcher/Ui/HotFix/ResourceUpdateView"),
	AppUtil_1 = require("../../../../Launcher/Update/AppUtil"),
	LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager"),
	LauncherTextLib_1 = require("../../../../Launcher/Util/LauncherTextLib"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	MenuTool_1 = require("../MenuTool"),
	LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class VoiceLanguageDownloadView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
	constructor() {
		super(...arguments),
			(this.wwi = !1),
			(this.Bwi = () => {
				this.RefreshUiBySelect(this.SelectedToggle);
			}),
			(this.bwi = () => {
				this.CloseMe();
			}),
			(this.qwi = () => {
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"InUseCanNotDelete",
				);
			}),
			(this.Gwi = () => {
				let e;
				switch (this.SelectedToggle.Updater.Status) {
					case 2:
						(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(72)).SetTextArgs(
							this.SelectedToggle.GetMainText(),
						),
							e.FunctionMap.set(2, () => {
								this.SelectedToggle.Updater.Delete(
									GlobalData_1.GlobalData.World,
								),
									this.RefreshUiBySelect(this.SelectedToggle);
							});
						break;
					case 0:
					case 1:
						var t;
						this.SelectedToggle.Updater.IsDownloading
							? (this.SelectedToggle.Updater.Pause(),
								this.RefreshUiBySelect(this.SelectedToggle))
							: ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
									AppUtil_1.AppUtil.GetNetworkConnectionType() ===
										NetworkDefine_1.ENetworkType.Cell
										? 70
										: 71,
								)),
								(t =
									this.SelectedToggle.Updater.TotalDiskSize -
									this.SelectedToggle.Updater.LocalDiskSize),
								(t = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(t)),
								e.SetTextArgs(this.SelectedToggle.GetMainText(), t),
								e.FunctionMap.set(2, () => {
									this.SelectedToggle.Updater.Update(
										this.SelectedToggle,
										GlobalData_1.GlobalData.World,
									).then(
										() => {
											Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"HotPatch",
													31,
													`Language ${this.SelectedToggle.Updater.LanguageCode} download success`,
												),
												this.RefreshUiBySelect(this.SelectedToggle);
										},
										() => {
											Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"HotPatch",
													31,
													`Language ${this.SelectedToggle.Updater.LanguageCode} download fail`,
												),
												this.RefreshUiBySelect(this.SelectedToggle);
										},
									),
										this.RefreshUiBySelect(this.SelectedToggle);
								}));
				}
				e &&
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			});
	}
	OnRegisterComponent() {
		super.OnRegisterComponent();
	}
	OnStart() {
		super.OnStart(),
			this.CancelButton.SetFunction(this.bwi),
			this.ConfirmButton.SetFunction(this.Gwi);
	}
	OnBeforeDestroy() {
		this.wwi = !0;
	}
	CreateToggle(e, t, a) {
		var i = new VoiceLanguageToggle();
		return i.Initialize(e, t, a), i;
	}
	OnRefreshView(e) {
		var t = this.MenuDataIns.MenuDataOptionsNameList[e.GetIndex()];
		e.SetMainText(t), e.SetDownloadStatusCallback(this.Bwi);
	}
	InitScrollViewData() {
		var e =
			LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguageTypeForAudio();
		this.ScrollView.RefreshByData(e.sort((e, t) => e - t));
	}
	OnAfterShow() {
		this.Nwi(this.SelectedToggle);
	}
	Nwi(e) {
		e.Updater.IsDownloading
			? this.ConfirmButton.SetLocalText("PauseDownload")
			: 2 !== e.Updater.Status &&
				this.ConfirmButton.SetLocalText("DownloadLanguage"),
			2 === e.Updater.Status &&
				this.ConfirmButton.SetLocalText("DeleteLanguage"),
			2 === e.Updater.Status &&
			e.Updater.LanguageCode === LanguageSystem_1.LanguageSystem.PackageAudio
				? this.ConfirmButton.SetFunction(this.qwi)
				: this.ConfirmButton.SetFunction(this.Gwi);
	}
	OnSelected(e, t) {
		this.RefreshUiBySelect(e);
	}
	RefreshUiBySelect(e) {
		this.wwi || (this.Nwi(e), e.RefreshUi());
	}
}
exports.VoiceLanguageDownloadView = VoiceLanguageDownloadView;
class LanguageDownloadTips extends ResourceUpdateView_1.ResourceUpdateViewBase {
	constructor(e, t) {
		super(),
			(this.Owi = void 0),
			(this.kwi = ""),
			(this.Owi = e),
			(this.kwi = t);
	}
	UpdatePatchProgress(e, t, a, i) {
		this.Owi
			? t === a &&
				(this.Owi.CalculateDownloadStatus(), 2 === this.Owi.Status) &&
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"LanguageDownloadFinished",
					this.kwi,
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"HotPatch",
					8,
					"UpdatePatchProgress时，找不到对应的LanguageUpdater",
				);
	}
}
class VoiceLanguageToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
	constructor() {
		super(...arguments),
			(this.HLn = void 0),
			(this.Updater = void 0),
			(this.Fwi = void 0);
	}
	async ShowNotEnoughSpaceConfirmation(e) {
		return new Promise((t) => {
			var a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(81),
				i = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(e);
			a.SetTextArgs(i),
				a.FunctionMap.set(2, () => {
					t(!0);
				}),
				a.FunctionMap.set(1, () => {
					t(!1);
				}),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					a,
				);
		});
	}
	UpdatePatchProgress(e, t, a, i) {
		this.Updater
			? (this.Vwi(t, a, i),
				t === a && (this.Updater.CalculateDownloadStatus(), this.Fwi?.()))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"HotPatch",
					8,
					"UpdatePatchProgress时，找不到对应的LanguageUpdater",
					["languageCode", this.HLn],
				);
	}
	SetDownloadStatusCallback(e) {
		this.Fwi = e;
	}
	RefreshUi() {
		var e,
			t,
			a = this.GetText(2);
		if (this.Updater) {
			if ((a.SetUIActive(!0), !this.Updater.IsDownloading)) {
				let i = StringUtils_1.EMPTY_STRING,
					o = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(
						this.Updater.TotalDiskSize,
					);
				this.Updater.LanguageCode ===
				LanguageSystem_1.LanguageSystem.PackageAudio
					? (i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("InUse"))
					: 1 === this.Updater.Status
						? ((i =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"Pausing",
								)),
							(e = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(
								this.Updater.LocalDiskSize,
							)),
							(t = o),
							this.ProgressBuilder.Clear(),
							this.ProgressBuilder.Append(e, StringUtils_1.SLASH_STRING, t),
							(o = this.ProgressBuilder.ToString()))
						: 0 === this.Updater.Status &&
							((i =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"NotDownloaded",
								)),
							(o = StringUtils_1.EMPTY_STRING)),
					this.ProgressBuilder.Clear(),
					this.ProgressBuilder.Append(i, StringUtils_1.TAB_STRING, o),
					a.SetText(this.ProgressBuilder.ToString());
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"HotPatch",
					8,
					"RefreshUi时，找不到对应的LanguageUpdater",
					["languageCode", this.HLn],
				),
				a.SetUIActive(!1);
	}
	OnRegisterComponent() {
		super.OnRegisterComponent();
	}
	OnStart() {
		super.OnStart(),
			(this.HLn = MenuTool_1.MenuTool.GetAudioCodeById(this.Index)),
			this.HLn
				? ((this.Updater =
						LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(this.HLn)),
					this.Updater
						? (this.Updater.UpdateView.SetImplement(this),
							this.Updater.CalculateDownloadStatus(),
							this.RefreshUi())
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"HotPatch",
								8,
								"创建VoiceLanguageToggle时，找不到对应的LanguageUpdater",
								["languageCode", this.HLn],
							))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"HotPatch",
						8,
						"创建VoiceLanguageToggle时，找不到对应的语言配置",
						["Index", this.Index],
					);
	}
	Vwi(e, t, a) {
		(e = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(e)),
			(t = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(t)),
			(a = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(a)),
			(e = StringUtils_1.StringUtils.Format(e, StringUtils_1.SLASH_STRING, t)),
			this.ProgressBuilder.Clear(),
			this.ProgressBuilder.Append(a, StringUtils_1.SLASH_STRING, e),
			this.GetText(2).SetText(this.ProgressBuilder.ToString());
	}
	OnBeforeDestroy() {
		this.Updater
			? (this.Updater.UpdateView.SetImplement(void 0),
				this.Updater.UpdateView.SetImplement(
					new LanguageDownloadTips(this.Updater, this.GetMainText()),
				))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"HotPatch",
					8,
					"销毁VoiceLanguageToggle时，找不到对应的LanguageUpdater",
					["languageCode", this.HLn],
				);
	}
}
exports.VoiceLanguageToggle = VoiceLanguageToggle;

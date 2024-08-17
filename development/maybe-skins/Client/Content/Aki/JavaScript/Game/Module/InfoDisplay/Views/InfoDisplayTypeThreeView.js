"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayTypeThreeView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InfoDisplayController_1 = require("../InfoDisplayController"),
	InfoDisplayAudioPlayer_1 = require("./InfoDisplayAudioPlayer");
class InfoDisplayTypeThreeView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.nsi = void 0),
			(this.Opt = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [[4, this.Opt]]);
	}
	OnStart() {
		this.nsi = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
		var e = this.GetItem(5);
		this.nsi.Initialize(e.GetOwner()),
			this.nsi.SetShowTextComponent(this.GetText(3)),
			(e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId());
		this.OPt(e),
			this.nsi.Refresh(
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
					e,
				),
			);
	}
	OPt(e) {
		this.$8e(e), this.usi(e), this.msi(e);
	}
	msi(e) {
		"" !==
		ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e)
			? (this.GetItem(5).SetUIActive(!0), this.GetItem(7).SetUIActive(!0))
			: (this.GetItem(5).SetUIActive(!1), this.GetItem(7).SetUIActive(!1));
	}
	$8e(e) {
		var i =
			ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
				e,
			);
		this.GetText(0).SetText(i),
			(i =
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
					e,
				));
		this.GetText(2).SetText(i);
	}
	usi(e) {
		"" !==
			(e =
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayBgStamp(
					e,
				)) && this.SetTextureByPath(e, this.GetTexture(1));
	}
	OnBeforeDestroy() {
		this.nsi.Destroy();
		var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
		InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
	}
	OnTick(e) {
		this.nsi?.OnTick(e);
	}
}
exports.InfoDisplayTypeThreeView = InfoDisplayTypeThreeView;

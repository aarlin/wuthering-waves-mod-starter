"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayTypeFourView = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InfoDisplayController_1 = require("../InfoDisplayController"),
	InfoDisplayAudioPlayer_1 = require("./InfoDisplayAudioPlayer"),
	LERP_PERCENTAGE = 0.3;
class InfoDisplayTypeFourView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.nsi = void 0),
			(this.ssi = void 0),
			(this.asi = 0),
			(this.hsi = (e, i) => {
				for (let i = 0; i < e.Num(); i++) {
					var t, n;
					this.ssi.length > i &&
						((n = this.ssi[i].Height),
						(t = e.Get(i).toPrecision(1)),
						(t = this.asi * Number(t)),
						(n = MathUtils_1.MathUtils.Lerp(n, t, 0.3)),
						this.ssi[i].SetHeight(n));
				}
			}),
			(this.Opt = () => {
				this.CloseMe();
			}),
			(this.lsi = () => {
				var e =
					ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
				0 <
					(e =
						ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
							e,
						)).length &&
					(ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
						e[0],
					),
					InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UITexture],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.lsi],
				[3, this.Opt],
			]);
	}
	OnStart() {
		this.nsi = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
		var e = this.GetItem(8),
			i =
				(this.nsi.Initialize(e.GetOwner()),
				this.nsi.SetShowTextComponent(this.GetText(6)),
				this.nsi.SetSpectrumCallBack(this.hsi),
				(this.ssi = new Array()),
				this.GetItem(10));
		for (let e = 0; e < i.UIChildren.Num(); e++)
			this.ssi.push(i.UIChildren.Get(e)),
				0 === e && (this.asi = i.UIChildren.Get(e).Height);
		(e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId()),
			this.OPt(e),
			this.nsi.Refresh(
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
					e,
				),
			);
	}
	OPt(e) {
		this._si(e), this.$8e(e), this.usi(e), this.msi(e);
	}
	_si(e) {
		0 <
			(e =
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
					e,
				)).length &&
			"" !== (e = e[0]) &&
			this.SetTextureByPath(e, this.GetTexture(1));
	}
	$8e(e) {
		var i =
			ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
				e,
			);
		this.GetText(2).SetText(i),
			(i =
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
					e,
				));
		this.GetText(4).SetText(i);
	}
	usi(e) {
		"" !==
			(e =
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayBgStamp(
					e,
				)) && this.SetTextureByPath(e, this.GetTexture(7));
	}
	OnTick(e) {
		this.nsi?.OnTick(e);
	}
	msi(e) {
		"" !==
		ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e)
			? (this.GetItem(8).SetUIActive(!0), this.GetItem(9).SetUIActive(!0))
			: (this.GetItem(8).SetUIActive(!1), this.GetItem(9).SetUIActive(!1));
	}
	OnBeforeDestroy() {
		this.nsi.Destroy();
		var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
		InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
	}
}
exports.InfoDisplayTypeFourView = InfoDisplayTypeFourView;

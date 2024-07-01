"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayTypeTwoView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	CircleAttachView_1 = require("../../AutoAttach/CircleAttachView"),
	NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView"),
	InfoDisplayController_1 = require("../InfoDisplayController"),
	InfoDisplayCircleAttachItem_1 = require("./InfoDisplayCircleAttachItem"),
	InfoDisplayNoCircleAttachItem_1 = require("./InfoDisplayNoCircleAttachItem"),
	PICTURE_DISTANCE = -850;
class InfoDisplayTypeTwoView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.dsi = 0),
			(this.Iye = void 0),
			(this.Wft = void 0),
			(this.jbe = (e) => {
				this.Csi(e);
			}),
			(this.gsi = 3),
			(this.Uye = (e, t, i) =>
				new InfoDisplayCircleAttachItem_1.InfoDisplayCircleAttachItem(e)),
			(this.fsi = (e, t, i) =>
				new InfoDisplayNoCircleAttachItem_1.InfoDisplayNoCircleAttachItem(e)),
			(this.Opt = () => {
				this.CloseMe();
			}),
			(this.Pwe = () => {
				this.psi(1);
			}),
			(this.wwe = () => {
				this.psi(-1);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIButtonComponent],
			[8, UE.UIItem],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[7, this.Opt],
				[3, this.Pwe],
				[4, this.wwe],
			]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ClickDisplayItem,
			this.jbe,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ClickDisplayItem,
			this.jbe,
		);
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
		this.h7e(e), this.vsi(e), this.OPt(e);
	}
	h7e(e) {
		this.Iye?.Clear(),
			this.Wft?.Clear(),
			(this.Iye = void 0),
			(this.Wft = void 0);
		e =
			ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
				e,
			);
		var t = this.GetItem(1);
		(e.length < this.gsi
			? ((this.Wft = new NoCircleAttachView_1.NoCircleAttachView(t.GetOwner())),
				this.Wft.CreateItems(this.GetItem(0).GetOwner(), -850, this.fsi),
				this.Wft.DisableDragEvent(),
				this.Wft)
			: ((this.Iye = new CircleAttachView_1.CircleAttachView(t.GetOwner())),
				this.Iye.CreateItems(this.GetItem(0).GetOwner(), -850, this.Uye),
				this.Iye.DisableDragEvent(),
				this.Iye)
		).ReloadView(e.length, e),
			(this.dsi = e.length),
			this.GetItem(0).SetUIActive(!1),
			this.Msi();
	}
	vsi(e) {
		(e =
			1 <
			ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
				e,
			).length),
			this.GetItem(8).SetUIActive(e),
			this.GetItem(9).SetUIActive(e);
	}
	OPt(e) {
		this.$8e(e), this.Msi();
	}
	$8e(e) {
		var t =
			ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
				e,
			);
		this.GetText(6).SetText(t),
			(t =
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
					e,
				));
		this.GetText(5).SetText(t);
	}
	psi(e) {
		void 0 !== this.Wft
			? this.Wft.AttachToNextItem(e)
			: void 0 !== this.Iye && this.Iye.AttachToNextItem(e);
	}
	Csi(e) {
		void 0 !== this.Wft
			? this.Wft?.ScrollToItem(e)
			: void 0 !== this.Iye && this.Iye?.ScrollToItem(e),
			this.Msi();
	}
	Msi() {
		let e = 0;
		void 0 !== this.Wft
			? (e = this.Wft.GetCurrentSelectIndex())
			: void 0 !== this.Iye && (e = this.Iye.GetCurrentSelectIndex());
		var t = e + 1 + "/" + this.dsi;
		this.GetText(2).SetText(t);
	}
	OnBeforeDestroy() {
		var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
		InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e),
			this.Iye?.Clear(),
			this.Wft?.Clear();
	}
}
exports.InfoDisplayTypeTwoView = InfoDisplayTypeTwoView;

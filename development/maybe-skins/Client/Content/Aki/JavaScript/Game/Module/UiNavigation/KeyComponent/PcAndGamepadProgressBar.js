"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PcAndGamepadProgressBar = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ProgressBar extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	SetPercent(e) {
		this.GetTexture(0)?.SetFillAmount(e);
	}
}
class PcAndGamepadProgressBar {
	constructor() {
		(this.Sxo = void 0), (this.Exo = void 0);
	}
	async Init(e, t) {
		(this.Sxo = new ProgressBar()),
			(this.Exo = new ProgressBar()),
			await Promise.all([
				this.Sxo.CreateByActorAsync(e.GetOwner()),
				this.Exo.CreateByActorAsync(t.GetOwner()),
			]),
			this.SetProgressPercent(0);
	}
	SetProgressPercent(e) {
		(ModelManager_1.ModelManager.PlatformModel?.IsGamepad()
			? this.Exo
			: this.Sxo
		)?.SetPercent(e),
			this.Wgi();
	}
	SetProgressVisible(e) {
		e ? this.Wgi() : (this.Sxo?.SetActive(!1), this.Exo?.SetActive(!1));
	}
	Wgi() {
		var e = ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
			t = !e;
		this.Sxo?.GetActive() !== t && this.Sxo?.SetActive(t),
			this.Exo?.GetActive() !== e && this.Exo?.SetActive(e);
	}
}
exports.PcAndGamepadProgressBar = PcAndGamepadProgressBar;

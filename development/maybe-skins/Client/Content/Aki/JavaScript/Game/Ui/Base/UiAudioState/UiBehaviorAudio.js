"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiBehaviorAudio = void 0);
const UiAudioModel_1 = require("../../UiAudioModel"),
	AudioStateData_1 = require("./AudioStateData");
class UiBehaviorAudio {
	constructor(i) {
		(this.A1r = void 0),
			(this.bne = void 0),
			(this.OKt = void 0),
			(this.OKt = i);
	}
	OnAfterUiShow() {
		this.A1r || (this.A1r = this.OKt.GetUiAudioComponent()),
			this.A1r &&
				this.A1r.bAudioCoverEnable &&
				(this.P1r(),
				UiAudioModel_1.UiAudioModel.AddAudioStateData(this.bne),
				UiAudioModel_1.UiAudioModel.SetRTPCLevelOpening(this.bne.Level),
				UiAudioModel_1.UiAudioModel.CalculateRTPCValueAndApply());
	}
	OnBeforeUiHide() {
		this.A1r &&
			this.A1r.bAudioCoverEnable &&
			(UiAudioModel_1.UiAudioModel.SetRTPCLevelClosing(this.bne.Level),
			UiAudioModel_1.UiAudioModel.RemoveAudioStateData(this.bne),
			UiAudioModel_1.UiAudioModel.CalculateRTPCValueAndApply());
	}
	OnBeforeDestroy() {
		this.A1r = void 0;
	}
	P1r() {
		(this.bne = new AudioStateData_1.AudioStateData()),
			(this.bne.Level = this.A1r.AudioUiCover),
			(this.bne.Alpha = this.A1r.AudioUiAlpha);
	}
}
exports.UiBehaviorAudio = UiBehaviorAudio;

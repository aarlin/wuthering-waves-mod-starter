"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	DEFAULT_FADE_DURATION = 200;
class EffectModelAudio extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.AudioEvent = void 0),
			(this.LocationOffsets = new UE.TArray()),
			(this.FadeOutTime = 200),
			(this.FadeOutCurve = 4),
			(this.KeepAlive = !1),
			(this.TrailingAudioEvent = void 0);
	}
}
exports.default = EffectModelAudio;

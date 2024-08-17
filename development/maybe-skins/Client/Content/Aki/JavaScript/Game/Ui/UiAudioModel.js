"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiAudioModel = void 0);
const AudioController_1 = require("../../Core/Audio/AudioController"),
	AudioDefine_1 = require("../../Core/Audio/AudioDefine"),
	Log_1 = require("../../Core/Common/Log");
class UiAudioModel {
	static AddAudioStateData(o) {
		this.hdr.add(o);
	}
	static RemoveAudioStateData(o) {
		return this.hdr.delete(o);
	}
	static ldr() {
		let o = 0;
		for (const e of this.hdr.values()) o < e.Level && (o = e.Level);
		return o;
	}
	static _dr() {
		let o = 0;
		for (const e of this.hdr.values()) o = o + e.Alpha - o * e.Alpha;
		return o;
	}
	static SetRTPCLevelOpening(o) {
		AudioController_1.AudioController.SetRTPCValue(
			o,
			AudioDefine_1.RPTC_COVER_LEVEL_OPENING,
		),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Audio", 11, "Audio计算结果", [
					AudioDefine_1.RPTC_COVER_LEVEL_OPENING,
					o,
				]);
	}
	static SetRTPCLevelClosing(o) {
		AudioController_1.AudioController.SetRTPCValue(
			o,
			AudioDefine_1.RPTC_COVER_LEVEL_CLOSING,
		),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Audio", 11, "Audio计算结果", [
					AudioDefine_1.RPTC_COVER_LEVEL_CLOSING,
					o,
				]);
	}
	static CalculateRTPCValueAndApply() {
		var o = this.ldr(),
			e =
				(AudioController_1.AudioController.SetRTPCValue(
					o,
					AudioDefine_1.RTPC_COVER_LEVEL,
					void 0,
					500,
				),
				this._dr()),
			i =
				(AudioController_1.AudioController.SetRTPCValue(
					e,
					AudioDefine_1.RTPC_COVER_ALPHA,
					void 0,
					500,
				),
				o - this.udr);
		(this.udr = o),
			AudioController_1.AudioController.SetRTPCValue(
				i,
				AudioDefine_1.RTPC_COVER_LEVEL_DELTA,
			),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Audio",
					11,
					"Audio计算结果",
					[AudioDefine_1.RTPC_COVER_LEVEL, o],
					[AudioDefine_1.RTPC_COVER_ALPHA, e],
					[AudioDefine_1.RTPC_COVER_LEVEL_DELTA, i],
				);
	}
}
((exports.UiAudioModel = UiAudioModel).hdr = new Set()), (UiAudioModel.udr = 0);

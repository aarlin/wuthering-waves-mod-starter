"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log");
class AudioVisualizationInstanceBase extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.Identifier = ""),
			(this.ActorEndPlayCallback = void 0);
	}
	ReceiveEndPlay() {
		this.ActorEndPlayCallback && this.ActorEndPlayCallback(this);
	}
	Start() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Audio",
				26,
				"音频可视化实例开始",
				["名称", this.GetName()],
				["标识符", this.Identifier],
			),
			this.StartInternal();
	}
	End() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Audio",
				26,
				"音频可视化实例结束",
				["名称", this.GetName()],
				["标识符", this.Identifier],
			),
			this.EndInternal();
	}
	CallBack(i, e, s) {
		if (
			(i instanceof UE.AkMusicSyncCallbackInfo && this.MidiBpm(),
			i instanceof UE.AkMIDIEventCallbackInfo)
		)
			switch (i.GetType()) {
				case 144:
					this.TriggerMidiNoteOn(i);
					break;
				case 128:
					this.TriggerMidiNoteOff(i);
			}
		this.CallBackInternal(i, e, s);
	}
	TriggerMidiNoteOn(i) {
		var e = (0, puerts_1.$ref)(void 0);
		if (i.GetNoteOn(e) && e) {
			var s = (0, puerts_1.$unref)(e).Velocity;
			switch ((0, puerts_1.$unref)(e).Note) {
				case 60:
					this.MidiC3On(s);
					break;
				case 61:
					this.MidiCs3On(s);
					break;
				case 62:
					this.MidiD3On(s);
					break;
				case 63:
					this.MidiDs3On(s);
					break;
				case 64:
					this.MidiE3On(s);
					break;
				case 65:
					this.MidiF3On(s);
					break;
				case 66:
					this.MidiFs3On(s);
					break;
				case 67:
					this.MidiG3On(s);
					break;
				case 68:
					this.MidiGs3On(s);
					break;
				case 69:
					this.MidiA3On(s);
					break;
				case 70:
					this.MidiAs3On(s);
					break;
				case 71:
					this.MidiB3On(s);
			}
		}
	}
	TriggerMidiNoteOff(i) {
		var e = (0, puerts_1.$ref)(void 0);
		if (i.GetNoteOff(e) && e) {
			var s = (0, puerts_1.$unref)(e).Velocity;
			switch ((0, puerts_1.$unref)(e).Note) {
				case 60:
					this.MidiC3Off(s);
					break;
				case 61:
					this.MidiCs3Off(s);
					break;
				case 62:
					this.MidiD3Off(s);
					break;
				case 63:
					this.MidiDs3Off(s);
					break;
				case 64:
					this.MidiE3Off(s);
					break;
				case 65:
					this.MidiF3Off(s);
					break;
				case 66:
					this.MidiFs3Off(s);
					break;
				case 67:
					this.MidiG3Off(s);
					break;
				case 68:
					this.MidiGs3Off(s);
					break;
				case 69:
					this.MidiA3Off(s);
					break;
				case 70:
					this.MidiAs3Off(s);
					break;
				case 71:
					this.MidiB3Off(s);
			}
		}
	}
	StartInternal() {}
	EndInternal() {}
	CallBackInternal(i, e, s) {}
	MidiBpm() {}
	MidiC3On(i) {}
	MidiCs3On(i) {}
	MidiD3On(i) {}
	MidiDs3On(i) {}
	MidiE3On(i) {}
	MidiF3On(i) {}
	MidiFs3On(i) {}
	MidiG3On(i) {}
	MidiGs3On(i) {}
	MidiA3On(i) {}
	MidiAs3On(i) {}
	MidiB3On(i) {}
	MidiC3Off(i) {}
	MidiCs3Off(i) {}
	MidiD3Off(i) {}
	MidiDs3Off(i) {}
	MidiE3Off(i) {}
	MidiF3Off(i) {}
	MidiFs3Off(i) {}
	MidiG3Off(i) {}
	MidiGs3Off(i) {}
	MidiA3Off(i) {}
	MidiAs3Off(i) {}
	MidiB3Off(i) {}
}
exports.default = AudioVisualizationInstanceBase;

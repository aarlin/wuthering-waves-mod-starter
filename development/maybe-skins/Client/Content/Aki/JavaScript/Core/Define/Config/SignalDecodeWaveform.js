"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDecodeWaveform = void 0);
class SignalDecodeWaveform {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get SpeedRate() {
		return this.speedrate();
	}
	get SignalFragment() {
		return this.signalfragment();
	}
	get MissingParts() {
		return this.missingparts();
	}
	get Offset() {
		return this.offset();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsSignalDecodeWaveform(t, s) {
		return (s || new SignalDecodeWaveform()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	speedrate() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 1;
	}
	signalfragment(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	missingparts(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	offset() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SignalDecodeWaveform = SignalDecodeWaveform;
//# sourceMappingURL=SignalDecodeWaveform.js.map

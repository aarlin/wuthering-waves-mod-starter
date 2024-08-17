"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDecodeGamePlay = void 0);
class SignalDecodeGamePlay {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get SignalData1() {
		return this.signaldata1();
	}
	get SignalData2() {
		return this.signaldata2();
	}
	get SignalData3() {
		return this.signaldata3();
	}
	get SignalData4() {
		return this.signaldata4();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSignalDecodeGamePlay(t, i) {
		return (i || new SignalDecodeGamePlay()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	signaldata1() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	signaldata2() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	signaldata3() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	signaldata4() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SignalDecodeGamePlay = SignalDecodeGamePlay;
//# sourceMappingURL=SignalDecodeGamePlay.js.map

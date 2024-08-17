"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotAudio = void 0);
class PlotAudio {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ExternalSourceSetting() {
		return this.externalsourcesetting();
	}
	get FileName() {
		return this.filename();
	}
	get IsCheckSex() {
		return this.ischecksex();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPlotAudio(t, s) {
		return (s || new PlotAudio()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	externalsourcesetting(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	filename(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	ischecksex() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.PlotAudio = PlotAudio;
//# sourceMappingURL=PlotAudio.js.map

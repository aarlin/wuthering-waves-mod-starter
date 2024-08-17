"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotHandBookConfig = void 0);
class PlotHandBookConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get QuestId() {
		return this.questid();
	}
	get Data() {
		return this.data();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPlotHandBookConfig(t, s) {
		return (s || new PlotHandBookConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	questid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	data(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.PlotHandBookConfig = PlotHandBookConfig;
//# sourceMappingURL=PlotHandBookConfig.js.map

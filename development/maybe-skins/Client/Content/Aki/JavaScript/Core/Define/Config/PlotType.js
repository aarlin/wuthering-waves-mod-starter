"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotType = void 0);
class PlotType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TypeDescription() {
		return this.typedescription();
	}
	get Type() {
		return this.type();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPlotType(t, s) {
		return (s || new PlotType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typedescription(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	type() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PlotType = PlotType;
//# sourceMappingURL=PlotType.js.map

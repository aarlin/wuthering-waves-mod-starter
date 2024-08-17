"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowText = void 0);
class FlowText {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Key() {
		return this.key();
	}
	get FlowListId() {
		return this.flowlistid();
	}
	get PlotLineId() {
		return this.plotlineid();
	}
	get Id() {
		return this.id();
	}
	get Text() {
		return this.text();
	}
	get Sound() {
		return this.sound();
	}
	get EsKey() {
		return this.eskey();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsFlowText(t, s) {
		return (s || new FlowText()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
	}
	flowlistid(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	plotlineid(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	id() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	text() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sound(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	eskey(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.FlowText = FlowText;
//# sourceMappingURL=FlowText.js.map

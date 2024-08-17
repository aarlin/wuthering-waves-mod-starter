"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BoxState = void 0);
class BoxState {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TagId() {
		return this.tagid();
	}
	get Name() {
		return this.name();
	}
	get Effect() {
		return this.effect();
	}
	get IsInteraction() {
		return this.isinteraction();
	}
	get Interval() {
		return this.interval();
	}
	get NextState() {
		return this.nextstate();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBoxState(t, s) {
		return (s || new BoxState()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tagid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	effect(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	isinteraction() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	interval() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	nextstate() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BoxState = BoxState;
//# sourceMappingURL=BoxState.js.map

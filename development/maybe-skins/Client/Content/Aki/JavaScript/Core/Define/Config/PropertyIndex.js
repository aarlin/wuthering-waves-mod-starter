"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PropertyIndex = void 0);
class PropertyIndex {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Key() {
		return this.key();
	}
	get Name() {
		return this.name();
	}
	get AnotherName() {
		return this.anothername();
	}
	get ConvertToWhiteId() {
		return this.converttowhiteid();
	}
	get IsShow() {
		return this.isshow();
	}
	get IsPercent() {
		return this.ispercent();
	}
	get Priority() {
		return this.priority();
	}
	get Icon() {
		return this.icon();
	}
	get Dec() {
		return this.dec();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsPropertyIndex(t, r) {
		return (r || new PropertyIndex()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	key(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	name(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	anothername(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	converttowhiteid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	isshow() {
		var t = this.J7.__offset(this.z7, 14);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	ispercent() {
		var t = this.J7.__offset(this.z7, 16);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	priority() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var r = this.J7.__offset(this.z7, 20);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	dec(t) {
		var r = this.J7.__offset(this.z7, 22);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.PropertyIndex = PropertyIndex;
//# sourceMappingURL=PropertyIndex.js.map

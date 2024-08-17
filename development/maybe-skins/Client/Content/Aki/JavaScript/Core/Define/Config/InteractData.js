"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractData = void 0);
class InteractData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Guid() {
		return this.guid();
	}
	get Type() {
		return this.type();
	}
	get Icon() {
		return this.icon();
	}
	get TidContent() {
		return this.tidcontent();
	}
	get Condition() {
		return this.condition();
	}
	get UniquenessTest() {
		return this.uniquenesstest();
	}
	get DoIntactType() {
		return this.dointacttype();
	}
	get Range() {
		return this.range();
	}
	get Duration() {
		return this.duration();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsInteractData(t, i) {
		return (i || new InteractData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	guid(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	type(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tidcontent(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	condition(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	uniquenesstest(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	dointacttype(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	range() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	duration(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.InteractData = InteractData;
//# sourceMappingURL=InteractData.js.map

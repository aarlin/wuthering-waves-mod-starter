"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RougeMiraclecreation = void 0);
class RougeMiraclecreation {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Category() {
		return this.category();
	}
	get DefaultLevel() {
		return this.defaultlevel();
	}
	get Level() {
		return this.level();
	}
	get MaxLevel() {
		return this.maxlevel();
	}
	get Icon() {
		return this.icon();
	}
	get Name() {
		return this.name();
	}
	get BriefDescribe() {
		return this.briefdescribe();
	}
	get Describe() {
		return this.describe();
	}
	get StoryDescribe() {
		return this.storydescribe();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRougeMiraclecreation(t, e) {
		return (e || new RougeMiraclecreation()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	category() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	defaultlevel() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxlevel() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	briefdescribe(t) {
		var e = this.J7.__offset(this.z7, 18);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	describe(t) {
		var e = this.J7.__offset(this.z7, 20);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	storydescribe(t) {
		var e = this.J7.__offset(this.z7, 22);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.RougeMiraclecreation = RougeMiraclecreation;
//# sourceMappingURL=RougeMiraclecreation.js.map

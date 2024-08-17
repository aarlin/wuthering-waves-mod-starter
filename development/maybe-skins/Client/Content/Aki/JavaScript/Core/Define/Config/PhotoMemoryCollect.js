"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotoMemoryCollect = void 0);
class PhotoMemoryCollect {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TopicID() {
		return this.topicid();
	}
	get Type() {
		return this.type();
	}
	get Rank() {
		return this.rank();
	}
	get ThemeBg() {
		return this.themebg();
	}
	get BgResourceM() {
		return this.bgresourcem();
	}
	get BgResourceF() {
		return this.bgresourcef();
	}
	get Title() {
		return this.title();
	}
	get TipsDesc() {
		return this.tipsdesc();
	}
	get ClueId() {
		return this.clueid();
	}
	get Desc() {
		return this.desc();
	}
	get DropId() {
		return this.dropid();
	}
	get TraceEntityId() {
		return this.traceentityid();
	}
	get TraceMarkId() {
		return this.tracemarkid();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsPhotoMemoryCollect(t, r) {
		return (r || new PhotoMemoryCollect()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	topicid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	rank() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	themebg(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	bgresourcem(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	bgresourcef(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	title(t) {
		var r = this.J7.__offset(this.z7, 18);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	tipsdesc(t) {
		var r = this.J7.__offset(this.z7, 20);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	clueid() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desc(t) {
		var r = this.J7.__offset(this.z7, 24);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	dropid() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	traceentityid() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tracemarkid() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhotoMemoryCollect = PhotoMemoryCollect;
//# sourceMappingURL=PhotoMemoryCollect.js.map

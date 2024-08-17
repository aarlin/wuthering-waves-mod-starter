"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotoMemoryTopic = void 0);
class PhotoMemoryTopic {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Rank() {
		return this.rank();
	}
	get BgResourceLight() {
		return this.bgresourcelight();
	}
	get BgResource() {
		return this.bgresource();
	}
	get TopicTexture() {
		return this.topictexture();
	}
	get Title() {
		return this.title();
	}
	get ClueId() {
		return this.clueid();
	}
	get ConditionGroupId() {
		return this.conditiongroupid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhotoMemoryTopic(t, i) {
		return (i || new PhotoMemoryTopic()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rank() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	bgresourcelight(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bgresource(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	topictexture(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	clueid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	conditiongroupid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhotoMemoryTopic = PhotoMemoryTopic;
//# sourceMappingURL=PhotoMemoryTopic.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FavorStory = void 0);
class FavorStory {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get Sort() {
		return this.sort();
	}
	get Title() {
		return this.title();
	}
	get Content() {
		return this.content();
	}
	get CondGroupId() {
		return this.condgroupid();
	}
	get Type() {
		return this.type();
	}
	get MotionImg() {
		return this.motionimg();
	}
	get AniBlueprint() {
		return this.aniblueprint();
	}
	get AniMontage() {
		return this.animontage();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsFavorStory(t, r) {
		return (r || new FavorStory()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sort() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	content(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	condgroupid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	motionimg(t) {
		var r = this.J7.__offset(this.z7, 18);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	aniblueprint(t) {
		var r = this.J7.__offset(this.z7, 20);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	animontage(t) {
		var r = this.J7.__offset(this.z7, 22);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.FavorStory = FavorStory;
//# sourceMappingURL=FavorStory.js.map

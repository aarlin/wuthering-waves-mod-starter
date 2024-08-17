"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreProgress = void 0);
class ExploreProgress {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Area() {
		return this.area();
	}
	get ExploreType() {
		return this.exploretype();
	}
	get TypeName() {
		return this.typename();
	}
	get CountMode() {
		return this.countmode();
	}
	get PhantomSkillId() {
		return this.phantomskillid();
	}
	get UnlockTextId() {
		return this.unlocktextid();
	}
	get LockTextId() {
		return this.locktextid();
	}
	get SortIndex() {
		return this.sortindex();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsExploreProgress(t, r) {
		return (r || new ExploreProgress()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	area() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	exploretype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typename(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	countmode() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	phantomskillid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlocktextid(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	locktextid(t) {
		var r = this.J7.__offset(this.z7, 18);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	sortindex() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ExploreProgress = ExploreProgress;
//# sourceMappingURL=ExploreProgress.js.map

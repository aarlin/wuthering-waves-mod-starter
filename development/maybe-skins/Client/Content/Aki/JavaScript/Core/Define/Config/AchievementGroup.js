"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementGroup = void 0);
class AchievementGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Category() {
		return this.category();
	}
	get Sort() {
		return this.sort();
	}
	get Name() {
		return this.name();
	}
	get SmallIcon() {
		return this.smallicon();
	}
	get Icon() {
		return this.icon();
	}
	get BackgroundIcon() {
		return this.backgroundicon();
	}
	get DropId() {
		return this.dropid();
	}
	get Enable() {
		return this.enable();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsAchievementGroup(t, r) {
		return (r || new AchievementGroup()).__init(
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
	sort() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	smallicon(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	icon(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	backgroundicon(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	dropid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	enable() {
		var t = this.J7.__offset(this.z7, 20);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.AchievementGroup = AchievementGroup;
//# sourceMappingURL=AchievementGroup.js.map

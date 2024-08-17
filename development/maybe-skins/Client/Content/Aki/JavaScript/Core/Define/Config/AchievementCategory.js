"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementCategory = void 0);
class AchievementCategory {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get FunctionType() {
		return this.functiontype();
	}
	get SpritePath() {
		return this.spritepath();
	}
	get TexturePath() {
		return this.texturepath();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsAchievementCategory(t, e) {
		return (e || new AchievementCategory()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	functiontype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	spritepath(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	texturepath(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.AchievementCategory = AchievementCategory;
//# sourceMappingURL=AchievementCategory.js.map

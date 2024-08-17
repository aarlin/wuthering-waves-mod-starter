"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TakeWeedsDifficulty = void 0);
class TakeWeedsDifficulty {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Magnification() {
		return this.magnification();
	}
	get RecommendedLevel() {
		return this.recommendedlevel();
	}
	get Reward() {
		return this.reward();
	}
	get Desc() {
		return this.desc();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsTakeWeedsDifficulty(t, e) {
		return (e || new TakeWeedsDifficulty()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	magnification() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	recommendedlevel() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reward() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desc(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.TakeWeedsDifficulty = TakeWeedsDifficulty;
//# sourceMappingURL=TakeWeedsDifficulty.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushMapMark = void 0);
class BossRushMapMark {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ActivityId() {
		return this.activityid();
	}
	get MarkId() {
		return this.markid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBossRushMapMark(t, s) {
		return (s || new BossRushMapMark()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	markid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BossRushMapMark = BossRushMapMark;
//# sourceMappingURL=BossRushMapMark.js.map

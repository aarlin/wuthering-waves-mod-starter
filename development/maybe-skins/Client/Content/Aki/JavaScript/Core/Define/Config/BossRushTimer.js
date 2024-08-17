"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushTimer = void 0);
class BossRushTimer {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	__init(s, t) {
		return (this.z7 = s), (this.J7 = t), this;
	}
	static getRootAsBossRushTimer(s, t) {
		return (t || new BossRushTimer()).__init(
			s.readInt32(s.position()) + s.position(),
			s,
		);
	}
	id() {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.readInt32(this.z7 + s) : 0;
	}
}
exports.BossRushTimer = BossRushTimer;
//# sourceMappingURL=BossRushTimer.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushScore = void 0);
class BossRushScore {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Score() {
		return this.score();
	}
	get RewardId() {
		return this.rewardid();
	}
	__init(s, t) {
		return (this.z7 = s), (this.J7 = t), this;
	}
	static getRootAsBossRushScore(s, t) {
		return (t || new BossRushScore()).__init(
			s.readInt32(s.position()) + s.position(),
			s,
		);
	}
	id() {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.readInt32(this.z7 + s) : 0;
	}
	score() {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.z7 + s) : 0;
	}
	rewardid() {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.z7 + s) : 0;
	}
}
exports.BossRushScore = BossRushScore;
//# sourceMappingURL=BossRushScore.js.map

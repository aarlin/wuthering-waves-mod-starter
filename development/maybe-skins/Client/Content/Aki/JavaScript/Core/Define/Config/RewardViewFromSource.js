"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardViewFromSource = void 0);
class RewardViewFromSource {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RewardSourceId() {
		return this.rewardsourceid();
	}
	get RewardViewId() {
		return this.rewardviewid();
	}
	__init(r, t) {
		return (this.z7 = r), (this.J7 = t), this;
	}
	static getRootAsRewardViewFromSource(r, t) {
		return (t || new RewardViewFromSource()).__init(
			r.readInt32(r.position()) + r.position(),
			r,
		);
	}
	id() {
		var r = this.J7.__offset(this.z7, 4);
		return r ? this.J7.readInt32(this.z7 + r) : 0;
	}
	rewardsourceid() {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.readInt32(this.z7 + r) : 0;
	}
	rewardviewid() {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.readInt32(this.z7 + r) : 0;
	}
}
exports.RewardViewFromSource = RewardViewFromSource;
//# sourceMappingURL=RewardViewFromSource.js.map

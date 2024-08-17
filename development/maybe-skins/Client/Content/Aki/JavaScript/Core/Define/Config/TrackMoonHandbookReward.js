"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackMoonHandbookReward = void 0);
class TrackMoonHandbookReward {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Goal() {
		return this.goal();
	}
	get RewardInfo() {
		return this.rewardinfo();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsTrackMoonHandbookReward(t, r) {
		return (r || new TrackMoonHandbookReward()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	goal() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rewardinfo() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TrackMoonHandbookReward = TrackMoonHandbookReward;
//# sourceMappingURL=TrackMoonHandbookReward.js.map

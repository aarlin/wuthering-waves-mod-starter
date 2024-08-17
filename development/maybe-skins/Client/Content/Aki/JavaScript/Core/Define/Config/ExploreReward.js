"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreReward = void 0);
class ExploreReward {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Country() {
		return this.country();
	}
	get ExploreLevel() {
		return this.explorelevel();
	}
	get NeedScore() {
		return this.needscore();
	}
	get Drop() {
		return this.drop();
	}
	get ShowItem() {
		return this.showitem();
	}
	get ScoreName() {
		return this.scorename();
	}
	get ScoreTexturePath() {
		return this.scoretexturepath();
	}
	get Show() {
		return this.show();
	}
	get Pic() {
		return this.pic();
	}
	get RewardName() {
		return this.rewardname();
	}
	get Reward() {
		return this.reward();
	}
	get Help() {
		return this.help();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsExploreReward(t, r) {
		return (r || new ExploreReward()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	country() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	explorelevel() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	needscore() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	drop() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showitem() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	scorename(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	scoretexturepath(t) {
		var r = this.J7.__offset(this.z7, 18);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	show() {
		var t = this.J7.__offset(this.z7, 20);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	pic(t) {
		var r = this.J7.__offset(this.z7, 22);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	rewardname(t) {
		var r = this.J7.__offset(this.z7, 24);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	reward(t) {
		var r = this.J7.__offset(this.z7, 26);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	help() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ExploreReward = ExploreReward;
//# sourceMappingURL=ExploreReward.js.map

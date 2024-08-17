"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackMoonActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TrackMoonActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActivityReward() {
		return this.activityreward();
	}
	get PermanentTarget() {
		return this.permanenttarget();
	}
	get ActivityButtonType() {
		return this.activitybuttontype();
	}
	get RewardList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rewardlistLength(), (t) =>
			this.rewardlist(t),
		);
	}
	get FocusMarkId() {
		return this.focusmarkid();
	}
	get StageQuestTips() {
		return this.stagequesttips();
	}
	get StageQuestId() {
		return this.stagequestid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTrackMoonActivity(t, i) {
		return (i || new TrackMoonActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	activityreward() {
		var t = this.J7.__offset(this.z7, 6);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	permanenttarget() {
		var t = this.J7.__offset(this.z7, 8);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	activitybuttontype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRewardlistAt(t) {
		return this.rewardlist(t);
	}
	rewardlist(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	rewardlistLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rewardlistArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	focusmarkid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	stagequesttips(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	stagequestid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TrackMoonActivity = TrackMoonActivity;
//# sourceMappingURL=TrackMoonActivity.js.map

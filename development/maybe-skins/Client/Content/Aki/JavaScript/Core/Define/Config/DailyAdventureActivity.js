"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyAdventureActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DailyAdventureActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ActivityId() {
		return this.activityid();
	}
	get AreaTitle() {
		return this.areatitle();
	}
	get AreaDescription() {
		return this.areadescription();
	}
	get AreaPic() {
		return this.areapic();
	}
	get AreaDefaultMarkId() {
		return this.areadefaultmarkid();
	}
	get TaskList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.tasklistLength(), (t) =>
			this.tasklist(t),
		);
	}
	get RewardList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rewardlistLength(), (t) =>
			this.rewardlist(t),
		);
	}
	get TaskRefreshNum() {
		return this.taskrefreshnum();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDailyAdventureActivity(t, i) {
		return (i || new DailyAdventureActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	areatitle(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	areadescription(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	areapic(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	areadefaultmarkid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTasklistAt(t) {
		return this.tasklist(t);
	}
	tasklist(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	tasklistLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	tasklistArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetRewardlistAt(t) {
		return this.rewardlist(t);
	}
	rewardlist(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	rewardlistLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rewardlistArray() {
		var t = this.J7.__offset(this.z7, 16);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	taskrefreshnum() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
}
exports.DailyAdventureActivity = DailyAdventureActivity;
//# sourceMappingURL=DailyAdventureActivity.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimePointRewardConfig = void 0);
class TimePointRewardConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ActivityId() {
		return this.activityid();
	}
	get UiPrefab() {
		return this.uiprefab();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTimePointRewardConfig(t, i) {
		return (i || new TimePointRewardConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	uiprefab(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.TimePointRewardConfig = TimePointRewardConfig;
//# sourceMappingURL=TimePointRewardConfig.js.map

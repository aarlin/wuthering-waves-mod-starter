"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayStationActivityConfig = void 0);
class PlayStationActivityConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActivityStringId() {
		return this.activitystringid();
	}
	get QuestId() {
		return this.questid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPlayStationActivityConfig(t, i) {
		return (i || new PlayStationActivityConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	activitystringid(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	questid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PlayStationActivityConfig = PlayStationActivityConfig;
//# sourceMappingURL=PlayStationActivityConfig.js.map

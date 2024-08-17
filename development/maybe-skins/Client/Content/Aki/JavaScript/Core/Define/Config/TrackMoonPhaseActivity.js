"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackMoonPhaseActivity = void 0);
class TrackMoonPhaseActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleTrialId() {
		return this.roletrialid();
	}
	get DropId() {
		return this.dropid();
	}
	get PopularityNeed() {
		return this.popularityneed();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTrackMoonPhaseActivity(t, i) {
		return (i || new TrackMoonPhaseActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roletrialid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	dropid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	popularityneed() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TrackMoonPhaseActivity = TrackMoonPhaseActivity;
//# sourceMappingURL=TrackMoonPhaseActivity.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackMoonTarget = void 0);
class TrackMoonTarget {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TargetName() {
		return this.targetname();
	}
	get Type() {
		return this.type();
	}
	get TargetReward() {
		return this.targetreward();
	}
	get TargetFunc() {
		return this.targetfunc();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsTrackMoonTarget(t, r) {
		return (r || new TrackMoonTarget()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	targetname(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	type() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	targetreward() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	targetfunc() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TrackMoonTarget = TrackMoonTarget;
//# sourceMappingURL=TrackMoonTarget.js.map

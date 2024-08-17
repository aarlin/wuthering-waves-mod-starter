"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BeginnerGuide = void 0);
class BeginnerGuide {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PlayerId() {
		return this.playerid();
	}
	get WorldLevel() {
		return this.worldlevel();
	}
	get PlayerLevel() {
		return this.playerlevel();
	}
	get Region() {
		return this.region();
	}
	get ClientPlatform() {
		return this.clientplatform();
	}
	get NetStatus() {
		return this.netstatus();
	}
	get DeviceId() {
		return this.deviceid();
	}
	get GuideId() {
		return this.guideid();
	}
	get GameDuration() {
		return this.gameduration();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsBeginnerGuide(t, i) {
		return (i || new BeginnerGuide()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	playerid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	worldlevel() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	playerlevel() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	region() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	clientplatform() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	netstatus() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	deviceid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	guideid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	gameduration() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BeginnerGuide = BeginnerGuide;
//# sourceMappingURL=BeginnerGuide.js.map

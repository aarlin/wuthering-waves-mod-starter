"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiPatrol = void 0);
class AiPatrol {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CirclePatrol() {
		return this.circlepatrol();
	}
	get PathSpline() {
		return this.pathspline();
	}
	get IsNavigation() {
		return this.isnavigation();
	}
	get StartIndex() {
		return this.startindex();
	}
	get LimitNpcDistance() {
		return this.limitnpcdistance();
	}
	get TurnSpeed() {
		return this.turnspeed();
	}
	get Loop() {
		return this.loop();
	}
	get EndDistance() {
		return this.enddistance();
	}
	get Sampling() {
		return this.sampling();
	}
	get ContainZ() {
		return this.containz();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAiPatrol(t, i) {
		return (i || new AiPatrol()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	circlepatrol() {
		var t = this.J7.__offset(this.z7, 6);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	pathspline(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	isnavigation() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	startindex() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	limitnpcdistance() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readFloat32(this.z7 + t) : 1e3;
	}
	turnspeed() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 180;
	}
	loop() {
		var t = this.J7.__offset(this.z7, 18);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	enddistance() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readFloat32(this.z7 + t) : 50;
	}
	sampling() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	containz() {
		var t = this.J7.__offset(this.z7, 24);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.AiPatrol = AiPatrol;
//# sourceMappingURL=AiPatrol.js.map

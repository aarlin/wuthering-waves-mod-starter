"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Swim = void 0);
class Swim {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SprintZOffsetRate() {
		return this.sprintzoffsetrate();
	}
	get SprintZOffsetSpeed() {
		return this.sprintzoffsetspeed();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsSwim(t, s) {
		return (s || new Swim()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	sprintzoffsetrate() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 0.2;
	}
	sprintzoffsetspeed() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 100;
	}
}
exports.Swim = Swim;
//# sourceMappingURL=Swim.js.map

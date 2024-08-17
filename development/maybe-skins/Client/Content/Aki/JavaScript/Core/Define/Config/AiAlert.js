"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiAlert = void 0);
class AiAlert {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BaseIncrease() {
		return this.baseincrease();
	}
	get DecreaseByDist() {
		return this.decreasebydist();
	}
	get MaxDist() {
		return this.maxdist();
	}
	get ForwardAngle() {
		return this.forwardangle();
	}
	get BackwardRate() {
		return this.backwardrate();
	}
	get BaseDecrease() {
		return this.basedecrease();
	}
	get AlertnessType() {
		return this.alertnesstype();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAiAlert(t, s) {
		return (s || new AiAlert()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	baseincrease() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 500;
	}
	decreasebydist() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 0.25;
	}
	maxdist() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : -1;
	}
	forwardangle() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readFloat32(this.z7 + t) : 45;
	}
	backwardrate() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readFloat32(this.z7 + t) : 0.25;
	}
	basedecrease() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 25;
	}
	alertnesstype() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.AiAlert = AiAlert;
//# sourceMappingURL=AiAlert.js.map

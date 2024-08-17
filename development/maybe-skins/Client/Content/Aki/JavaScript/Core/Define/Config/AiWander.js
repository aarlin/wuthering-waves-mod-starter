"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiWander = void 0);
class AiWander {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TurnSpeed() {
		return this.turnspeed();
	}
	get WanderMoveState() {
		return this.wandermovestate();
	}
	get ResetMoveState() {
		return this.resetmovestate();
	}
	get MoveStateGA() {
		return this.movestatega();
	}
	get CompleteDistance() {
		return this.completedistance();
	}
	get ShowEffectDaPath() {
		return this.showeffectdapath();
	}
	get HideEffectDaPath() {
		return this.hideeffectdapath();
	}
	get ShowMaterialDaPath() {
		return this.showmaterialdapath();
	}
	get HideMaterialDaPath() {
		return this.hidematerialdapath();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsAiWander(t, e) {
		return (e || new AiWander()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	turnspeed() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 180;
	}
	wandermovestate() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	resetmovestate() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	movestatega() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	completedistance() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readFloat32(this.z7 + t) : 10;
	}
	showeffectdapath(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	hideeffectdapath(t) {
		var e = this.J7.__offset(this.z7, 18);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	showmaterialdapath(t) {
		var e = this.J7.__offset(this.z7, 20);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	hidematerialdapath(t) {
		var e = this.J7.__offset(this.z7, 22);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.AiWander = AiWander;
//# sourceMappingURL=AiWander.js.map

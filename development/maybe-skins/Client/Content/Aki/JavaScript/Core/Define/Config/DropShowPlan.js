"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DropShowPlan = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DropShowPlan {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Force() {
		return GameUtils_1.GameUtils.ConvertToArray(this.forceLength(), (t) =>
			this.force(t),
		);
	}
	get Angle() {
		return GameUtils_1.GameUtils.ConvertToArray(this.angleLength(), (t) =>
			this.angle(t),
		);
	}
	get VerticalAngle() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.verticalangleLength(),
			(t) => this.verticalangle(t),
		);
	}
	get ShowBg() {
		return this.showbg();
	}
	get ShowTime() {
		return this.showtime();
	}
	get ShowCout() {
		return this.showcout();
	}
	get Adsorption() {
		return this.adsorption();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsDropShowPlan(t, s) {
		return (s || new DropShowPlan()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetForceAt(t) {
		return this.force(t);
	}
	force(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	forceLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	forceArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetAngleAt(t) {
		return this.angle(t);
	}
	angle(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	angleLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	angleArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetVerticalangleAt(t) {
		return this.verticalangle(t);
	}
	verticalangle(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	verticalangleLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	verticalangleArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	showbg() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showtime() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 3e3;
	}
	showcout() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 7;
	}
	adsorption() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DropShowPlan = DropShowPlan;
//# sourceMappingURL=DropShowPlan.js.map

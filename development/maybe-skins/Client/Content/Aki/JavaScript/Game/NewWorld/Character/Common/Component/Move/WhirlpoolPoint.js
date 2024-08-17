"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WhirlpoolPoint = void 0);
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
class WhirlpoolPoint {
	constructor() {
		(this.xe = 0),
			(this.ToLocation = Vector_1.Vector.Create()),
			(this.BeginLocation = Vector_1.Vector.Create()),
			(this.WI = !1),
			(this.e7o = 0),
			(this.H6 = 0),
			(this.Wht = -1),
			(this.fJo = 0);
	}
	static GenId() {
		return WhirlpoolPoint.pJo++;
	}
	GetEnable() {
		return this.WI;
	}
	GetMoveTime() {
		return this.e7o;
	}
	GetId() {
		return this.xe;
	}
	Begin(t, e, o, i, r = -1, h = 0) {
		(this.xe = t),
			(this.e7o = e),
			this.ToLocation.FromUeVector(o),
			this.BeginLocation.FromUeVector(i),
			(this.WI = !0),
			(this.H6 = 0),
			(this.Wht = r),
			(this.fJo = h);
	}
	UpdateLocation(t) {
		this.ToLocation.FromUeVector(t);
	}
	OnTick(t) {
		return (
			(this.H6 += t),
			!(0 < this.Wht && this.Wht <= this.H6 && ((this.H6 = this.Wht), 1))
		);
	}
	OnEnd() {
		this.WI = !1;
	}
	ClearObject() {
		return (
			(this.xe = 0),
			(this.e7o = 0),
			(this.WI = !1),
			(this.H6 = 0),
			!(this.Wht = 0)
		);
	}
	GetAlpha() {
		var t = this.H6 / this.e7o;
		switch (this.fJo) {
			case 1:
				return 1 + Math.pow(t - 1, 3);
			case 3:
				return Math.pow(t, 3);
			case 2:
				return 1 - t;
		}
		return t;
	}
}
(exports.WhirlpoolPoint = WhirlpoolPoint).pJo = 0;

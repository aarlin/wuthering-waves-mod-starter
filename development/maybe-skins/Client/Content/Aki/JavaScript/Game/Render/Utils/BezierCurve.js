"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BeizerQuadraticCurve = void 0);
class BeizerQuadraticCurve {
	constructor() {
		(this.PointA = void 0),
			(this.PointB = void 0),
			(this.ControlPoint = void 0);
	}
	InitByThreePoints(t, i, o) {
		(this.PointA = t), (this.PointB = i), (this.ControlPoint = o);
	}
	InitByPhysics(t, i, o, n) {
		(this.PointA = t),
			(this.PointB = i),
			(this.ControlPoint = this.PointA.op_Addition(o.op_Multiply(n)));
	}
	GetPos(t) {
		var i = 1 - t;
		return this.PointA.op_Multiply(i * i)
			.op_Addition(this.ControlPoint.op_Multiply(2 * i * t))
			.op_Addition(this.PointB.op_Multiply(t * t));
	}
	GetDerivativeAt(t) {
		var i = 1 - t;
		return this.PointA.op_Multiply(-2 * i)
			.op_Addition(this.ControlPoint.op_Multiply(2 * i - 2 * t))
			.op_Addition(this.PointB.op_Multiply(2 * t));
	}
	GetPolylineLength() {
		return (
			this.ControlPoint.op_Subtraction(this.PointA).Size() +
			this.ControlPoint.op_Subtraction(this.PointB).Size()
		);
	}
}
exports.BeizerQuadraticCurve = BeizerQuadraticCurve;

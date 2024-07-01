"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataScale = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataScale {
	constructor(t) {
		(this.y8o = void 0),
			(this.I8o = void 0),
			(this.T8o = !1),
			(this.L8o = void 0),
			(this.Pe = t);
	}
	get SizeScale() {
		return (
			this.y8o || (this.y8o = Vector_1.Vector.Create(this.Pe.缩放倍率)),
			this.y8o
		);
	}
	get ScaleCurve() {
		return (
			this.T8o || ((this.T8o = !0), (this.I8o = this.Pe.缩放倍率曲线)), this.I8o
		);
	}
	get ShapeSwitch() {
		return void 0 === this.L8o && (this.L8o = this.Pe.特定形状开关), this.L8o;
	}
	Preload() {
		return this.SizeScale, this.ScaleCurve, !0;
	}
}
exports.BulletDataScale = BulletDataScale;

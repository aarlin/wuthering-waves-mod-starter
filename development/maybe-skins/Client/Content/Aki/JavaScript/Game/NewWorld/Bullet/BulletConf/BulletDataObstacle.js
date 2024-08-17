"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataObstacle = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataObstacle {
	constructor(t) {
		(this.h8o = void 0), (this.l8o = void 0), (this.Pe = t);
	}
	get Center() {
		return (
			this.h8o || (this.h8o = Vector_1.Vector.Create(this.Pe.检测位置)),
			this.h8o
		);
	}
	get Radius() {
		return void 0 === this.l8o && (this.l8o = this.Pe.检测距离), this.l8o;
	}
	Preload() {
		return this.Center, this.Radius, !0;
	}
}
exports.BulletDataObstacle = BulletDataObstacle;

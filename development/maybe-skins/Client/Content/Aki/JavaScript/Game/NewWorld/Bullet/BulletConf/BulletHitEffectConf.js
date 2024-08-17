"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletHitEffectConf = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
class BulletHitEffectConf {
	constructor(t) {
		(this.HighLimit = Vector2D_1.Vector2D.Create()),
			(this.Scale = Vector_1.Vector.Create()),
			(this.EnableHighLimit = t.启用约束),
			this.HighLimit.FromUeVector2D(t.高度约束),
			this.Scale.FromUeVector(t.大小缩放);
	}
}
exports.BulletHitEffectConf = BulletHitEffectConf;

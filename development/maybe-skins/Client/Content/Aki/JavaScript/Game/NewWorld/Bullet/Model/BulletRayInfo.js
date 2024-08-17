"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletRayInfo = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletRayInfo {
	constructor() {
		(this.Length = 0),
			(this.StartPoint = Vector_1.Vector.Create()),
			(this.EndPoint = Vector_1.Vector.Create()),
			(this.IsBlock = !1),
			(this.BlockByCharacter = !1),
			(this.Speed = 0);
	}
}
exports.BulletRayInfo = BulletRayInfo;

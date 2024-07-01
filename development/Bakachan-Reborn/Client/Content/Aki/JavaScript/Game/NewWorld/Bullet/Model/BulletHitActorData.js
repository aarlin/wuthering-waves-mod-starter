"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletHitTempResult =
		exports.BulletHitResult =
		exports.BulletHitActorData =
			void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletHitActorData {
	constructor() {
		(this.Type = 0),
			(this.EntityHandle = void 0),
			(this.BulletEntityId = 0),
			(this.Components = void 0),
			(this.Actor = void 0),
			(this.IsValidHit = !1),
			(this.IsContinueHit = !1),
			(this.FromObstaclesCollision = !1),
			(this.Priority = 0),
			(this.ValidProcessIndex = 0),
			(this.HitResult = void 0),
			(this.ConditionResult = void 0);
	}
	get Entity() {
		return this.EntityHandle?.Entity;
	}
	AddComponent(t) {
		this.Components || (this.Components = []), this.Components.push(t);
	}
	AddHitResult(t, i) {
		this.HitResult || (this.HitResult = new BulletHitResult()),
			this.HitResult.AppendHitResult(t, i);
	}
	AddHitTempResult(t, i) {
		this.HitResult || (this.HitResult = new BulletHitResult()),
			this.HitResult.AppendHitTempResult(t, i);
	}
	HasComponent(t) {
		return !!this.Components && this.Components.includes(t);
	}
	Clear() {
		(this.Type = 0),
			(this.EntityHandle = void 0),
			this.Components && (this.Components.length = 0),
			(this.Components = void 0),
			(this.Actor = void 0),
			(this.IsValidHit = !1),
			(this.IsContinueHit = !1),
			(this.FromObstaclesCollision = !1),
			(this.Priority = 0),
			(this.ValidProcessIndex = 0),
			(this.HitResult = void 0),
			(this.ConditionResult = void 0);
	}
}
exports.BulletHitActorData = BulletHitActorData;
class BulletHitResult {
	constructor() {
		(this.HitCount = 0),
			(this.BoneNameArray = new Array()),
			(this.ImpactPointX = new Array()),
			(this.ImpactPointY = new Array()),
			(this.ImpactPointZ = new Array());
	}
	AppendHitResult(t, i) {
		this.HitCount++,
			this.BoneNameArray.push(t.BoneNameArray.Get(i)),
			this.ImpactPointX.push(t.ImpactPointX_Array.Get(i)),
			this.ImpactPointY.push(t.ImpactPointY_Array.Get(i)),
			this.ImpactPointZ.push(t.ImpactPointZ_Array.Get(i));
	}
	AppendHitTempResult(t, i) {
		this.HitCount++,
			this.BoneNameArray.push(i),
			this.ImpactPointX.push(t.ImpactPoint.X),
			this.ImpactPointY.push(t.ImpactPoint.Y),
			this.ImpactPointZ.push(t.ImpactPoint.Z);
	}
}
exports.BulletHitResult = BulletHitResult;
class BulletHitTempResult {
	constructor() {
		(this.Index = 0),
			(this.DistSquared = 0),
			(this.ImpactPoint = Vector_1.Vector.Create()),
			(this.Component = void 0),
			(this.Actor = void 0);
	}
}
exports.BulletHitTempResult = BulletHitTempResult;

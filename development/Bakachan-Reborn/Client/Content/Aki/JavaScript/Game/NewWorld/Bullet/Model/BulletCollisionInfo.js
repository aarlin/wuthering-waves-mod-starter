"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletCollisionInfo =
		exports.bulletHitPriorityList =
		exports.BulletConditionResult =
			void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	BulletPool_1 = require("./BulletPool"),
	BulletTraceElementPool_1 = require("./BulletTraceElementPool");
class BulletConditionResult {
	constructor() {
		(this.HasConstResult = !1),
			(this.ConstResult = !1),
			(this.KeepEnable = !1),
			(this.KeepDisable = !1);
	}
	Clear() {
		(this.HasConstResult = !1),
			(this.ConstResult = !1),
			(this.KeepEnable = !1),
			(this.KeepDisable = !1);
	}
}
(exports.BulletConditionResult = BulletConditionResult),
	(exports.bulletHitPriorityList = [void 0, 3e3, 6e3, 2e3, 1e3, 4e3, 5e3]);
class BulletCollisionInfo {
	constructor() {
		(this.ActorCollisionEnable = !1),
			(this.CollisionComponent = void 0),
			(this.RegionDetectComponent = void 0),
			(this.RegionComponent = void 0),
			(this.HasObstaclesCollision = !1),
			(this.NeedHitObstacles = !1),
			(this.MapBulletConditionResult = new Map()),
			(this.MapHitActorData = new Map()),
			(this.ArrayHitActorData = new Array()),
			(this.LastMapHitActorData = new Map()),
			(this.LastArrayHitActorData = new Array()),
			(this.ArrayHitActor = new Array()),
			(this.IsInProcessHit = !1),
			(this.HasSearchedHitActorsCurFrame = !1),
			(this.ObjectsHitCurrent = new Map()),
			(this.StopHit = !1),
			(this.HaveCharacterInBullet = !1),
			(this.CharacterEntityMap = new Map()),
			(this.BulletEntityMap = new Map()),
			(this.HitObstaclesCurFrame = !1),
			(this.IsPassDelay = !1),
			(this.AllowedEnergy = !1),
			(this.ActiveDelayMs = -0),
			(this.IntervalMs = -0),
			(this.IsProcessOpen = !1),
			(this.StageInterval = 0),
			(this.IsStartup = !1),
			(this.CenterLocalLocation = Vector_1.Vector.Create()),
			(this.FinalScale = Vector_1.Vector.Create()),
			(this.LastFramePosition = Vector_1.Vector.Create()),
			(this.UpdateTraceBox = void 0),
			(this.UpdateTraceSphere = void 0),
			(this.UpdateTraceLine = void 0),
			(this.ObstaclesTraceElement = void 0),
			(this.IgnoreChannels = new Set()),
			(this.IgnoreQueries = new Set());
	}
	get CollisionTransform() {
		return this.CollisionComponent
			? this.CollisionComponent.K2_GetComponentToWorld()
			: MathUtils_1.MathUtils.DefaultTransform;
	}
	AddHitActorData(t, e) {
		this.IsInProcessHit
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Bullet", 18, "处理子弹碰撞期间不允许修改碰撞数组")
			: this.MapHitActorData.has(t) ||
				(this.MapHitActorData.set(t, e), this.ArrayHitActorData.push(e));
	}
	ClearHitActorData() {
		if (this.IsInProcessHit)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Bullet", 18, "处理子弹碰撞期间不允许修改碰撞数组");
		else {
			for (const t of this.ArrayHitActorData)
				BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
			this.MapHitActorData.clear(),
				(this.ArrayHitActorData.length = 0),
				(this.HasSearchedHitActorsCurFrame = !1);
		}
	}
	ClearLastHitActorData() {
		if (this.IsInProcessHit)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Bullet", 18, "处理子弹碰撞期间不允许修改碰撞数组");
		else {
			for (const t of this.LastArrayHitActorData)
				BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
			this.LastMapHitActorData.clear(), (this.LastArrayHitActorData.length = 0);
		}
	}
	UpdateLastHitActorData() {
		var t;
		this.IsInProcessHit
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Bullet", 18, "处理子弹碰撞期间不允许修改碰撞数组")
			: ((t = this.LastArrayHitActorData),
				(this.LastArrayHitActorData = this.ArrayHitActorData),
				(this.ArrayHitActorData = t),
				(t = this.LastMapHitActorData),
				(this.LastMapHitActorData = this.MapHitActorData),
				(this.MapHitActorData = t),
				this.ClearHitActorData());
	}
	GetFirstVictim(t) {
		let e;
		for (const i of (e = this.IsInProcessHit
			? this.ArrayHitActorData
			: this.LastArrayHitActorData))
			if (i.IsValidHit && t.includes(i.Type) && i?.EntityHandle?.Valid)
				return i.Entity;
	}
	Clear() {
		this.IsInProcessHit &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error("Bullet", 18, "处理子弹碰撞期间不允许修改碰撞数组");
		for (const t of this.ArrayHitActorData)
			BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
		for (const t of this.LastArrayHitActorData)
			BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
		for (var [, t] of this.MapBulletConditionResult)
			BulletPool_1.BulletPool.RecycleBulletConditionResult(t);
		this.MapBulletConditionResult.clear(),
			this.MapHitActorData.clear(),
			(this.ArrayHitActorData.length = 0),
			this.LastMapHitActorData.clear(),
			(this.LastArrayHitActorData.length = 0),
			(this.ArrayHitActor.length = 0),
			(this.ActorCollisionEnable = !1),
			(this.CollisionComponent = void 0),
			(this.RegionDetectComponent = void 0),
			(this.RegionComponent = void 0),
			(this.HasObstaclesCollision = !1),
			(this.NeedHitObstacles = !1),
			(this.IsInProcessHit = !1),
			(this.IsProcessOpen = !1),
			(this.HasSearchedHitActorsCurFrame = !1),
			this.ObjectsHitCurrent.clear(),
			(this.StopHit = !1),
			(this.HaveCharacterInBullet = !1),
			this.CharacterEntityMap.clear(),
			this.BulletEntityMap.clear(),
			(this.HitObstaclesCurFrame = !1),
			(this.IsPassDelay = !1),
			(this.AllowedEnergy = !1),
			(this.ActiveDelayMs = 0),
			(this.IntervalMs = 0),
			(this.StageInterval = 0),
			(this.IsStartup = !1),
			this.CenterLocalLocation.Reset(),
			this.FinalScale.Reset(),
			this.LastFramePosition.Reset(),
			BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceBoxElement(
				this.UpdateTraceBox,
			),
			(this.UpdateTraceBox = void 0),
			BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceSphereElement(
				this.UpdateTraceSphere,
			),
			(this.UpdateTraceSphere = void 0),
			BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceLineElement(
				this.UpdateTraceLine,
			),
			(this.UpdateTraceLine = void 0),
			BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceSphereElement(
				this.ObstaclesTraceElement,
			),
			(this.ObstaclesTraceElement = void 0),
			this.IgnoreChannels.clear(),
			this.IgnoreQueries.clear();
	}
}
exports.BulletCollisionInfo = BulletCollisionInfo;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletConstant = void 0);
const UE = require("ue"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator");
class BulletConstant {}
((exports.BulletConstant = BulletConstant).ProfileNameWater = new UE.FName(
	"水体",
)),
	(BulletConstant.ProfileNameOnlyBullet = new UE.FName("Bullet_OnlyBullet")),
	(BulletConstant.RotateToRight = Rotator_1.Rotator.Create(0, -90, 0)),
	(BulletConstant.OpenCollisionLog = !1),
	(BulletConstant.OpenMoveLog = !1),
	(BulletConstant.OpenCreateLog = !1),
	(BulletConstant.OpenHitActorLog = !1),
	(BulletConstant.OpenActionStat = !1),
	(BulletConstant.OpenAllActionStat = !1),
	(BulletConstant.OpenPoolCheck = !1),
	(BulletConstant.OpenClearCheck = !1),
	(BulletConstant.OpenActorRecycleCheck = !1),
	(BulletConstant.CollisionCompVisibleInEditor = !0),
	(BulletConstant.SuperHighSpeed = 12e3),
	(BulletConstant.HighSpeed = 5e3),
	(BulletConstant.FactorBoxSix = 6),
	(BulletConstant.FactorBoxTwelve = 12),
	(BulletConstant.HitCase = new UE.FName("HitCase")),
	(BulletConstant.MoveCylinder = "CollisionCylinder"),
	(BulletConstant.RegionKey = "Region");

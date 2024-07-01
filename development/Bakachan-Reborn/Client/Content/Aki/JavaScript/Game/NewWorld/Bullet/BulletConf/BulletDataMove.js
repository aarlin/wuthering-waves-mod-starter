"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataMove = void 0);
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataMove {
	constructor(t) {
		(this.G6o = void 0),
			(this.N6o = void 0),
			(this.O6o = void 0),
			(this.k6o = void 0),
			(this.F6o = void 0),
			(this.V6o = void 0),
			(this.H6o = void 0),
			(this.j6o = void 0),
			(this.W6o = void 0),
			(this.K6o = void 0),
			(this.Q6o = void 0),
			(this.X6o = !1),
			(this.$6o = void 0),
			(this.Y6o = void 0),
			(this.J6o = void 0),
			(this.z6o = void 0),
			(this.Z6o = void 0),
			(this.e8o = void 0),
			(this.t8o = void 0),
			(this.i8o = void 0),
			(this.o8o = void 0),
			(this.r8o = void 0),
			(this.n8o = void 0),
			(this.s8o = void 0),
			(this.a8o = void 0),
			(this.Pe = t);
	}
	get InitVelocityDirStandard() {
		return (
			void 0 === this.G6o && (this.G6o = this.Pe.出生初速度方向基准), this.G6o
		);
	}
	get InitVelocityKeepUp() {
		return (
			void 0 === this.N6o && (this.N6o = this.Pe.初速度仅Z轴朝向), this.N6o
		);
	}
	get InitVelocityDirParam() {
		return (
			void 0 === this.O6o && (this.O6o = this.Pe.出生初速度方向基准参数),
			this.O6o
		);
	}
	get InitVelocityRot() {
		return (
			this.k6o || (this.k6o = Rotator_1.Rotator.Create(this.Pe.初速度偏移方向)),
			this.k6o
		);
	}
	get InitVelocityDirRandom() {
		return (
			this.F6o || (this.F6o = Vector_1.Vector.Create(this.Pe.初速度方向随机)),
			this.F6o
		);
	}
	get UpDownAngleLimit() {
		return (
			void 0 === this.V6o && (this.V6o = this.Pe.发射上下角度限制), this.V6o
		);
	}
	get FollowType() {
		return void 0 === this.H6o && (this.H6o = this.Pe.子弹跟随类型), this.H6o;
	}
	get IsLockScale() {
		return void 0 === this.j6o && (this.j6o = this.Pe.是否锁定缩放), this.j6o;
	}
	get IsDetachOnSkillEnd() {
		return (
			void 0 === this.W6o && (this.W6o = this.Pe.技能结束解除跟随骨骼), this.W6o
		);
	}
	get Speed() {
		return void 0 === this.K6o && (this.K6o = this.Pe.移动速度), this.K6o;
	}
	get SpeedCurve() {
		return (
			this.X6o || ((this.X6o = !0), (this.Q6o = this.Pe.移动速度曲线)), this.Q6o
		);
	}
	get FollowSkeletonRotLimit() {
		return (
			this.$6o || (this.$6o = Vector_1.Vector.Create(this.Pe.跟随骨骼限制旋转)),
			this.$6o
		);
	}
	get TrackParams() {
		if (!this.Y6o) {
			this.Y6o = new Array();
			var t = this.Pe.运动轨迹参数数据;
			for (let o = 0; o < t.Num(); o++) {
				var i = t.Get(o);
				this.Y6o.push(Vector_1.Vector.Create(i));
			}
		}
		return this.Y6o;
	}
	get TrackCurves() {
		if (void 0 === this.J6o) {
			this.J6o = new Array();
			var t = this.Pe.运动轨迹参数曲线;
			for (let i = 0; i < t.Num(); i++) this.J6o.push(t.Get(i));
		}
		return this.J6o;
	}
	get TrackTarget() {
		return (
			void 0 === this.z6o && (this.z6o = this.Pe.运动轨迹参数目标), this.z6o
		);
	}
	get TrackTargetBlackboardKey() {
		return (
			void 0 === this.Z6o && (this.Z6o = this.Pe.运动轨迹目标黑板Key值),
			this.Z6o
		);
	}
	get Trajectory() {
		return void 0 === this.e8o && (this.e8o = this.Pe.运动轨迹类型), this.e8o;
	}
	get BoneName() {
		return void 0 === this.t8o && (this.t8o = this.Pe.骨骼名字), this.t8o;
	}
	get BoneNameString() {
		return (
			void 0 === this.i8o && (this.i8o = this.BoneName.toString()), this.i8o
		);
	}
	get SkeletonComponentName() {
		return void 0 === this.o8o && (this.o8o = this.Pe.骨骼网格体名字), this.o8o;
	}
	get BeginVelocityLimitMap() {
		if (void 0 === this.r8o) {
			var t = this.Pe.初速度角度限制,
				i = t.Num();
			this.r8o = new Map();
			for (let s = 0; s < i; s++) {
				var o = t.GetKey(s),
					e = t.Get(o);
				this.r8o.set(o, e);
			}
		}
		return this.r8o;
	}
	get DestOffsetForward() {
		return (
			void 0 === this.n8o && (this.n8o = this.Pe.终点偏移基准朝向), this.n8o
		);
	}
	get DestOffset() {
		return (
			void 0 === this.s8o &&
				(this.s8o = Vector_1.Vector.Create(this.Pe.终点偏移)),
			this.s8o
		);
	}
	get TrackTargetBone() {
		return (
			void 0 === this.a8o && (this.a8o = this.Pe.运动轨迹目标骨骼), this.a8o
		);
	}
	Preload() {
		return (
			this.InitVelocityDirStandard,
			this.InitVelocityDirParam,
			this.InitVelocityRot,
			this.FollowType,
			this.Speed,
			this.SpeedCurve,
			this.TrackParams,
			this.TrackCurves,
			this.TrackTarget,
			this.Trajectory,
			this.BoneName,
			this.SkeletonComponentName,
			!0
		);
	}
}
exports.BulletDataMove = BulletDataMove;

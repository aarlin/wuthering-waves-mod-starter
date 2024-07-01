"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletPool = exports.SimplePool = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Pool_1 = require("../../../../Core/Container/Pool"),
	ProxyLru_1 = require("../../../../Core/Container/ProxyLru"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletEntity_1 = require("../Entity/BulletEntity"),
	BulletCollisionInfo_1 = require("./BulletCollisionInfo"),
	BulletHitActorData_1 = require("./BulletHitActorData"),
	KEY_BULLET_ENTITY = "bulletEntity",
	PRE_ADD_COUNT = 10,
	CAPACITY = 20;
class SimplePool {
	constructor() {
		this.p7 = new Array();
	}
	Get() {
		if (!(this.p7.length <= 0)) return this.p7.pop();
	}
	PreloadAdd(t) {
		t ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Pool", 18, "无效对象", ["target", t])),
			this.p7.push(t);
	}
	Release(t) {
		t ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Pool", 18, "无效对象", ["target", t])),
			this.p7.push(t);
	}
	Clear() {
		this.p7.length = 0;
	}
}
exports.SimplePool = SimplePool;
class BulletPool {
	static Init() {
		for (let o = 0; o < 10; o++) {
			var t = BulletPool.BulletEntityPool.Create("bulletEntity");
			EntitySystem_1.EntitySystem.Init(t),
				EntitySystem_1.EntitySystem.DeSpawn(t),
				BulletPool.BulletEntityPool.Put(t);
		}
		for (let t = 0; t < 10; t++) {
			var o = this.BulletHitActorDataPool.Create();
			this.BulletHitActorDataPool.Put(o);
		}
		for (let t = 0; t < 10; t++) {
			var l = this.BulletConditionResultPool.Create();
			this.BulletConditionResultPool.Put(l);
		}
		for (let t = 0; t < 10; t++)
			this.VectorPool.PreloadAdd(Vector_1.Vector.Create());
		for (let t = 0; t < 10; t++)
			this.RotatorPool.PreloadAdd(Rotator_1.Rotator.Create());
		for (let t = 0; t < 10; t++)
			this.BulletHitTempResultPool.PreloadAdd(
				new BulletHitActorData_1.BulletHitTempResult(),
			);
	}
	static Clear() {
		this.BulletEntityPool.Clear(),
			this.BulletHitActorDataPool.Clear(),
			this.BulletConditionResultPool.Clear(),
			this.VectorPool.Clear(),
			this.RotatorPool.Clear();
	}
	static CreateBulletEntity() {
		let t = BulletPool.BulletEntityPool.Get("bulletEntity");
		return (
			t
				? EntitySystem_1.EntitySystem.Respawn(t)
				: ((t = BulletPool.BulletEntityPool.Create("bulletEntity")),
					EntitySystem_1.EntitySystem.Init(t)),
			t
		);
	}
	static RecycleBulletEntity(t) {
		EntitySystem_1.EntitySystem.DeSpawn(t), BulletPool.BulletEntityPool.Put(t);
	}
	static CreateBulletHitActorData() {
		let t = BulletPool.BulletHitActorDataPool.Get();
		return t || BulletPool.BulletHitActorDataPool.Create();
	}
	static RecycleBulletHitActorData(t) {
		t.Clear(), BulletPool.BulletHitActorDataPool.Put(t);
	}
	static CreateBulletConditionResult() {
		let t = BulletPool.BulletConditionResultPool.Get();
		return t || BulletPool.BulletConditionResultPool.Create();
	}
	static RecycleBulletConditionResult(t) {
		t.Clear(), BulletPool.BulletConditionResultPool.Put(t);
	}
	static CreateVector(t = !1) {
		let o = BulletPool.VectorPool.Get();
		return o ? t && o.Reset() : (o = Vector_1.Vector.Create()), this.LHo++, o;
	}
	static RecycleVector(t) {
		this.LHo--,
			BulletConstant_1.BulletConstant.OpenPoolCheck
				? t.Set(NaN, NaN, NaN)
				: BulletPool.VectorPool.Release(t);
	}
	static CreateRotator(t = !1) {
		let o = BulletPool.RotatorPool.Get();
		return o ? t && o.Reset() : (o = Rotator_1.Rotator.Create()), this.DHo++, o;
	}
	static RecycleRotator(t) {
		this.DHo--,
			BulletConstant_1.BulletConstant.OpenPoolCheck
				? t.Set(NaN, NaN, NaN)
				: BulletPool.RotatorPool.Release(t);
	}
	static CreateBulletHitTempResult() {
		let t = BulletPool.BulletHitTempResultPool.Get();
		return (
			(t = t || new BulletHitActorData_1.BulletHitTempResult()), this.RHo++, t
		);
	}
	static RecycleBulletHitTempResult(t) {
		this.RHo--, BulletPool.BulletHitTempResultPool.Release(t);
	}
	static CheckAtFrameEnd() {
		0 !== this.LHo &&
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Bullet", 18, "当前帧子弹申请的Vector没有回收", [
					"VectorCount",
					this.LHo,
				]),
			(this.LHo = 0)),
			0 !== this.DHo &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 18, "当前帧子弹申请的Rotator没有回收", [
						"RotatorCount",
						this.DHo,
					]),
				(this.DHo = 0)),
			0 !== this.RHo &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Bullet",
						18,
						"当前帧子弹申请的BulletHitTempResultCount没有回收",
						["BulletHitTempResultCount", this.RHo],
					),
				(this.RHo = 0));
	}
}
((exports.BulletPool = BulletPool).BulletEntityPool = new ProxyLru_1.ProxyLru(
	10,
	(t) => EntitySystem_1.EntitySystem.Create(BulletEntity_1.BulletEntity),
)),
	(BulletPool.BulletHitActorDataPool = new Pool_1.Pool(
		20,
		() => new BulletHitActorData_1.BulletHitActorData(),
	)),
	(BulletPool.BulletConditionResultPool = new Pool_1.Pool(
		20,
		() => new BulletCollisionInfo_1.BulletConditionResult(),
	)),
	(BulletPool.VectorPool = new SimplePool()),
	(BulletPool.LHo = 0),
	(BulletPool.RotatorPool = new SimplePool()),
	(BulletPool.DHo = 0),
	(BulletPool.BulletHitTempResultPool = new SimplePool()),
	(BulletPool.RHo = 0);

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataRender = void 0);
const BulletHitEffectConf_1 = require("./BulletHitEffectConf");
class BulletDataRender {
	constructor(t) {
		(this._8o = void 0),
			(this.u8o = void 0),
			(this.c8o = void 0),
			(this.dFs = void 0),
			(this.m8o = void 0),
			(this.d8o = void 0),
			(this.C8o = void 0),
			(this.g8o = void 0),
			(this.f8o = void 0),
			(this.p8o = void 0),
			(this.v8o = void 0),
			(this.M8o = void 0),
			(this.S8o = void 0),
			(this.E8o = void 0),
			(this.Pe = t);
	}
	get VictimCameraShakeOnHit() {
		return (
			void 0 === this._8o &&
				(this._8o = this.Pe.命中时受击者震屏.ToAssetPathName()),
			this._8o
		);
	}
	get AttackerCameraShakeOnHit() {
		return (
			void 0 === this.u8o &&
				(this.u8o = this.Pe.命中时攻击者震屏.ToAssetPathName()),
			this.u8o
		);
	}
	get EffectOnHit() {
		if (void 0 === this.c8o) {
			this.c8o = new Map();
			var t = this.Pe.命中特效DA;
			for (let i = 0; i < t.Num(); i++) {
				var e = t.GetKey(i);
				this.c8o.set(e, t.Get(e).ToAssetPathName());
			}
		}
		return this.c8o;
	}
	get AudioOnHit() {
		return void 0 === this.dFs && (this.dFs = this.Pe.命中音效), this.dFs;
	}
	get EffectOnHitConf() {
		if (void 0 === this.m8o) {
			this.m8o = new Map();
			var t = this.Pe.命中特效配置,
				e = t.Num();
			for (let s = 0; s < e; s++) {
				var i = t.Get(s),
					o = new BulletHitEffectConf_1.BulletHitEffectConf(i);
				this.m8o.set(i.类型, o);
			}
		}
		return this.m8o;
	}
	get EffectBullet() {
		return (
			void 0 === this.d8o && (this.d8o = this.Pe.子弹特效DA.ToAssetPathName()),
			this.d8o
		);
	}
	get EffectBulletParams() {
		if (void 0 === this.C8o) {
			this.C8o = new Map();
			var t = this.Pe.子弹特效DA参数;
			for (let i = 0; i < t.Num(); i++) {
				var e = t.GetKey(i);
				this.C8o.set(e, t.Get(e));
			}
		}
		return this.C8o;
	}
	get EffectStopInsteadDestroy() {
		return (
			void 0 === this.g8o && (this.g8o = this.Pe.子弹销毁调用子弹停止特效),
			this.g8o
		);
	}
	get HandOverParentEffect() {
		return (
			void 0 === this.f8o && (this.f8o = this.Pe.接手父子弹的特效), this.f8o
		);
	}
	get CameraShakeCountMax() {
		return void 0 === this.p8o && (this.p8o = this.Pe.最大震动次数), this.p8o;
	}
	get SpecialEffect() {
		if (void 0 === this.v8o) {
			this.v8o = new Map();
			var t = this.Pe.特殊特效DA;
			for (let i = 0; i < t.Num(); i++) {
				var e = t.GetKey(i);
				this.v8o.set(e, t.Get(e).ToAssetPathName());
			}
		}
		return this.v8o;
	}
	get AttackerCameraShakeOnStart() {
		return (
			void 0 === this.M8o &&
				(this.M8o = this.Pe.生成时攻击者震屏.ToAssetPathName()),
			this.M8o
		);
	}
	get CameraShakeToSummonOwner() {
		return (
			void 0 === this.S8o && (this.S8o = this.Pe.震屏关联到召唤兽主人), this.S8o
		);
	}
	get AttackerCameraShakeOnHitWeakPoint() {
		return (
			void 0 === this.E8o &&
				(this.E8o = this.Pe.命中弱点时攻击者震屏.ToAssetPathName()),
			this.E8o
		);
	}
	Preload() {
		return (
			this.EffectBullet,
			this.HandOverParentEffect,
			this.CameraShakeCountMax,
			this.SpecialEffect,
			this.AttackerCameraShakeOnStart,
			!0
		);
	}
}
exports.BulletDataRender = BulletDataRender;

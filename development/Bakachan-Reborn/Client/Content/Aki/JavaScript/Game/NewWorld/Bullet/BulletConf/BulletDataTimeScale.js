"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataTimeScale = void 0);
class BulletDataTimeScale {
	constructor(t) {
		(this.U8o = void 0),
			(this.A8o = void 0),
			(this.P8o = void 0),
			(this.x8o = void 0),
			(this.w8o = void 0),
			(this.B8o = void 0),
			(this.b8o = void 0),
			(this.q8o = void 0),
			(this.G8o = void 0),
			(this.N8o = void 0),
			(this.Pe = t);
	}
	get AreaTimeScale() {
		return (
			void 0 === this.U8o && (this.U8o = this.Pe.区域受击者时间膨胀), this.U8o
		);
	}
	get TimeScaleOnHit() {
		return void 0 === this.A8o && (this.A8o = this.Pe.受击顿帧), this.A8o;
	}
	get ForceBulletTimeScaleInArea() {
		return (
			void 0 === this.P8o && (this.P8o = this.Pe.强制影响区域内子弹), this.P8o
		);
	}
	get TimeScaleOnAttack() {
		return void 0 === this.x8o && (this.x8o = this.Pe.攻击顿帧), this.x8o;
	}
	get TimeScaleOnAttackIgnoreAttacker() {
		return (
			void 0 === this.w8o && (this.w8o = this.Pe.攻击顿帧忽略攻击者), this.w8o
		);
	}
	get TimeScaleEffectImmune() {
		return void 0 === this.B8o && (this.B8o = this.Pe.时间膨胀失效), this.B8o;
	}
	get TimeScaleWithAttacker() {
		return (
			void 0 === this.b8o && (this.b8o = this.Pe.是否跟随攻击者顿帧), this.b8o
		);
	}
	get CharacterCustomKeyTimeScale() {
		return (
			void 0 === this.q8o && (this.q8o = this.Pe.自定义连携顿帧单位key),
			this.q8o
		);
	}
	get AttackerTimeScaleOnHitWeakPoint() {
		return (
			void 0 === this.G8o && (this.G8o = this.Pe.命中弱点攻击者顿帧), this.G8o
		);
	}
	get VictimTimeScaleOnHitWeakPoint() {
		return (
			void 0 === this.N8o && (this.N8o = this.Pe.命中弱点受击者顿帧), this.N8o
		);
	}
}
exports.BulletDataTimeScale = BulletDataTimeScale;

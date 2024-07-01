"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataAimed = void 0);
class BulletDataAimed {
	constructor(t) {
		(this.$5o = void 0),
			(this.Y5o = void 0),
			(this.J5o = void 0),
			(this.Pe = t);
	}
	get AimedCtrlDir() {
		return void 0 === this.$5o && (this.$5o = this.Pe.瞄准发射), this.$5o;
	}
	get AngleOffset() {
		return (
			void 0 === this.Y5o && (this.Y5o = this.Pe.瞄准子弹最大偏转角度), this.Y5o
		);
	}
	get DistLimit() {
		return (
			void 0 === this.J5o && (this.J5o = this.Pe.瞄准子弹最大射程), this.J5o
		);
	}
}
exports.BulletDataAimed = BulletDataAimed;

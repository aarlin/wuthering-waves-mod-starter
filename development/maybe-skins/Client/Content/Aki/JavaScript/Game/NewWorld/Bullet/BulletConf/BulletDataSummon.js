"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataSummon = void 0);
class BulletDataSummon {
	constructor(t) {
		(this.D8o = void 0), (this.R8o = void 0), (this.Pe = t);
	}
	get EntityId() {
		return void 0 === this.D8o && (this.D8o = this.Pe.实体ID), this.D8o;
	}
	get DestroyEntityOnBulletEnd() {
		return (
			void 0 === this.R8o && (this.R8o = this.Pe.是否随子弹销毁而销毁), this.R8o
		);
	}
}
exports.BulletDataSummon = BulletDataSummon;

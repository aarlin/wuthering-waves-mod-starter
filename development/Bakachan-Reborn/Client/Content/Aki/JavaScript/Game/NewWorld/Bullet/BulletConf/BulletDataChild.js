"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataChild = void 0);
class BulletDataChild {
	constructor(t) {
		(this.XVo = void 0),
			(this.$Vo = void 0),
			(this.YVo = void 0),
			(this.oVo = void 0),
			(this.JVo = void 0),
			(this.zVo = void 0),
			(this.Pe = t);
	}
	get RowName() {
		return void 0 === this.XVo && (this.XVo = this.Pe.召唤子弹ID), this.XVo;
	}
	get Delay() {
		return void 0 === this.$Vo && (this.$Vo = this.Pe.召唤子弹延迟), this.$Vo;
	}
	get Num() {
		return void 0 === this.YVo && (this.YVo = this.Pe.召唤子弹数量), this.YVo;
	}
	get Interval() {
		return void 0 === this.oVo && (this.oVo = this.Pe.召唤子弹间隔), this.oVo;
	}
	get Condition() {
		return void 0 === this.JVo && (this.JVo = this.Pe.召唤触发), this.JVo;
	}
	get BreakOnFail() {
		return void 0 === this.zVo && (this.zVo = this.Pe.失败是否停止), this.zVo;
	}
}
exports.BulletDataChild = BulletDataChild;

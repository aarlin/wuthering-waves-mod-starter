"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicController = void 0);
class BulletLogicController {
	constructor(t, e) {
		(this.LogicController = t), (this.Bullet = e), (this.oW = !1);
	}
	get NeedTick() {
		return this.oW;
	}
	set NeedTick(t) {
		this.oW = t;
	}
	OnInit() {}
	BulletLogicAction(t = 0) {}
	BulletLogicActionOnHitObstacles(t = 0) {}
	Update(t) {}
	Tick(t) {
		this.Update(t);
	}
	OnBulletDestroy() {}
}
exports.BulletLogicController = BulletLogicController;

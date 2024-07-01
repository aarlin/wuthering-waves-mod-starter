"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletChildInfo = void 0);
class BulletChildInfo {
	constructor() {
		(this.IsNumberNotEnough = !1),
			(this.IsActiveSummonChildBullet = !1),
			(this.HaveSpecialChildrenBullet = !1),
			(this.HaveSummonedBulletNumber = void 0);
	}
	SetIsNumberNotEnough(e) {
		this.IsNumberNotEnough = e;
	}
	SetIsActiveSummonChildBullet(e) {
		this.IsActiveSummonChildBullet = e;
	}
}
exports.BulletChildInfo = BulletChildInfo;

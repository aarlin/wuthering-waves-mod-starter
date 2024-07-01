"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicDestroyBulletController = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	BulletController_1 = require("../BulletController"),
	BulletHitActorData_1 = require("../Model/BulletHitActorData"),
	BulletLogicController_1 = require("./BulletLogicController"),
	NONE_STRING = "None";
class BulletLogicDestroyBulletController extends BulletLogicController_1.BulletLogicController {
	constructor(e, l) {
		super(e, l), (this.u9o = e);
	}
	BulletLogicAction(e = void 0) {
		if ("None" !== this.u9o.DestroyBulletRowName) {
			let t;
			if (
				(e &&
					e instanceof BulletHitActorData_1.BulletHitActorData &&
					(t = e.Entity),
				(e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(
					this.p9o(this.u9o.BulletOwner, t).Id,
				)))
			)
				for (const t of e) {
					var l = t.GetBulletInfo();
					l.BulletRowName === this.u9o.DestroyBulletRowName &&
						BulletController_1.BulletController.DestroyBullet(
							l.BulletEntityId,
							this.u9o.SummonChildBullet,
						);
				}
		}
	}
	p9o(e, l) {
		switch (e) {
			case 1:
			default:
				return this.Bullet.GetBulletInfo().Attacker;
			case 2:
				return l;
		}
	}
}
exports.BulletLogicDestroyBulletController = BulletLogicDestroyBulletController;

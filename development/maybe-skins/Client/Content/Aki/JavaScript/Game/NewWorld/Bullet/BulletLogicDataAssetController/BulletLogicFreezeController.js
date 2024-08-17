"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicFreezeController = void 0);
const BulletUtil_1 = require("../BulletUtil"),
	BulletHitActorData_1 = require("../Model/BulletHitActorData"),
	BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicFreezeController extends BulletLogicController_1.BulletLogicController {
	constructor(e, t) {
		super(e, t), (this._9o = this.Bullet.GetBulletInfo()), (this.u9o = e);
	}
	BulletLogicAction(e = void 0) {
		let t;
		e && e instanceof BulletHitActorData_1.BulletHitActorData && (t = e.Entity);
		var l = this.p9o(this.u9o.Target, t),
			o = this.u9o.Tags.GameplayTags.Num();
		if (l || !(0 < o)) {
			for (let e = 0; e < o; ++e)
				if (
					!l.GetComponent(185).HasTag(this.u9o.Tags.GameplayTags.Get(e)?.TagId)
				)
					return;
			BulletUtil_1.BulletUtil.FrozenBulletTime(this._9o, this.u9o.FreezeTime);
		}
	}
	p9o(e, t) {
		switch (e) {
			case 1:
			default:
				return this._9o.Attacker;
			case 2:
				return t;
		}
	}
}
exports.BulletLogicFreezeController = BulletLogicFreezeController;

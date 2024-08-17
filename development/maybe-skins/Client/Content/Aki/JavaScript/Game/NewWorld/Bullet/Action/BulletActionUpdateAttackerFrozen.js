"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionUpdateAttackerFrozen = void 0);
const BulletController_1 = require("../BulletController"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateAttackerFrozen extends BulletActionBase_1.BulletActionBase {
	OnTick(e) {
		var t = this.BulletInfo;
		(t.Attacker?.GetComponent(16)).IsFrozen() &&
			BulletController_1.BulletController.DestroyBullet(t.BulletEntityId, !1);
	}
}
exports.BulletActionUpdateAttackerFrozen = BulletActionUpdateAttackerFrozen;

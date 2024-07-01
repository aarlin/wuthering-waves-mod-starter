"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicDestroyOtherBullet = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	BulletController_1 = require("../BulletController"),
	BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicDestroyOtherBullet extends BulletLogicController_1.BulletLogicController {
	constructor(l, t) {
		super(l, t);
	}
	OnInit() {
		this.Bullet.GetBulletInfo().BulletDataMain.Execution.SupportCamp.push(
			this.LogicController.Camp,
		);
	}
	BulletLogicAction(l) {
		var t = l.GetBulletInfo(),
			e = this.LogicController.BulletId;
		(!StringUtils_1.StringUtils.IsEmpty(e) && e !== t.BulletRowName) ||
			BulletController_1.BulletController.DestroyBullet(
				l.Id,
				this.LogicController.SummonChildBullet,
			);
	}
}
exports.BulletLogicDestroyOtherBullet = BulletLogicDestroyOtherBullet;

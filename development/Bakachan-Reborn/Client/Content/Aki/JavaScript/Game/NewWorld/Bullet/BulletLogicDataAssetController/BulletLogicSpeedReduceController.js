"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicSpeedReduceController = void 0);
const BulletLogicController_1 = require("./BulletLogicController"),
	TOLERANCE = 1e-5,
	MIN_WEIGHT = 50;
class BulletLogicSpeedReduceController extends BulletLogicController_1.BulletLogicController {
	constructor(e, o) {
		super(e, o), (this._9o = this.Bullet.GetBulletInfo()), (this.u9o = e);
	}
	BulletLogicAction(e = 0) {
		var o,
			t = (t = this._9o.AttackerMoveComp.CharacterWeight) < 50 ? 50 : t,
			l = this._9o.CollisionInfo.GetFirstVictim([1]);
		l?.Valid &&
			((o =
				t -
				0.1 *
					(l = (l = l?.GetComponent(161).CharacterWeight) < 50 ? 50 : l) *
					this.u9o.SpeedDampingRatio),
			(l =
				(l =
					0 <
					(l =
						(t += 0.1 * l * this.u9o.SpeedDampingRatio) < 1e-5 || o < 0
							? 0
							: this._9o.MoveInfo.BulletSpeed * (o / t))
						? l
						: 0) < this.u9o.MinSpeed
					? 0
					: l),
			(this._9o.MoveInfo.BulletSpeed = l));
	}
	BulletLogicActionOnHitObstacles(e = 0) {
		this.u9o.IsNotThroughObstacles && (this._9o.MoveInfo.BulletSpeed = 0);
	}
}
exports.BulletLogicSpeedReduceController = BulletLogicSpeedReduceController;

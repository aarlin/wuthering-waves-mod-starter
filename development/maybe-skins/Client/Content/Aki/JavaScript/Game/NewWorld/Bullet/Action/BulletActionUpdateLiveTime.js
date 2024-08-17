"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionUpdateLiveTime = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	BulletController_1 = require("../BulletController"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateLiveTime extends BulletActionBase_1.BulletActionBase {
	OnExecute() {
		this.BulletInfo.LiveTime = 0;
	}
	AfterTick(e) {
		var t = this.BulletInfo.Actor,
			l = this.BulletInfo.Entity.TimeDilation,
			o = this.BulletInfo.BulletDataMain;
		t?.IsValid()
			? ((this.BulletInfo.LiveTime += e * t.CustomTimeDilation * l),
				t.IsActorBeingDestroyed()
					? (this.K5o(),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Bullet",
								18,
								"子弹Actor.IsActorBeingDestroyed为true",
								["子弹Id", this.BulletInfo.BulletRowName],
							))
					: o.Base.Duration < 0 ||
						(this.BulletInfo.LiveTime >
						o.Base.Duration * TimeUtil_1.TimeUtil.InverseMillisecond
							? ((this.BulletInfo.IsTimeNotEnough = !0), this.K5o())
							: this.BulletInfo.AttackerHandle || this.K5o()))
			: ((this.BulletInfo.LiveTime += e * l),
				this.K5o(),
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 18, "子弹Actor被意外销毁", [
						"子弹Id",
						this.BulletInfo.BulletRowName,
					]));
	}
	K5o() {
		BulletController_1.BulletController.DestroyBullet(
			this.BulletInfo.BulletEntityId,
			!1,
		),
			(this.IsFinish = !0);
	}
}
exports.BulletActionUpdateLiveTime = BulletActionUpdateLiveTime;

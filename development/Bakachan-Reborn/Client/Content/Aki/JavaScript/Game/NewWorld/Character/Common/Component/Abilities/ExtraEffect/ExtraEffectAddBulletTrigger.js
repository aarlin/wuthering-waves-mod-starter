"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AddBulletTrigger = void 0);
const BulletController_1 = require("../../../../../Bullet/BulletController"),
	ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AddBulletTrigger extends ExtraEffectPassiveEffects_1.PassiveEffects {
	constructor() {
		super(...arguments), (this.BulletIds = []), (this.BulletDtType = -1);
	}
	InitParameters(e) {
		(e = e.ExtraEffectParameters),
			(this.EventType = Number(e[0])),
			(this.TargetType = Number(e[1])),
			(this.BulletIds = e[2].split("#").map((e) => BigInt(e))),
			(this.BulletDtType = Number(e[3] ?? -1));
	}
	OnExecute() {
		var e = this.GetEffectTarget()?.GetEntity(),
			t = e?.CheckGetComponent(3)?.ActorTransform,
			r = this.InstigatorBuffComponent?.ActorComponent?.Actor;
		if (e && r && t) {
			var s = this.Buff.MessageId;
			for (const e of this.BulletIds)
				BulletController_1.BulletController.CreateBulletCustomTarget(
					r,
					String(e),
					t,
					{ SyncType: 1, DtType: this.BulletDtType },
					s,
				);
		}
	}
}
exports.AddBulletTrigger = AddBulletTrigger;

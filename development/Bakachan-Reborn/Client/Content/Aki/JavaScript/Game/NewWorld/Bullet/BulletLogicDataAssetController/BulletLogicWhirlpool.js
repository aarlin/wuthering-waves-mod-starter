"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicWhirlpool = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	WhirlpoolPoint_1 = require("../../Character/Common/Component/Move/WhirlpoolPoint"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicWhirlpool extends BulletLogicController_1.BulletLogicController {
	constructor(o, t) {
		super(o, t),
			(this.Z9o = 0),
			(this._9o = void 0),
			(this.xe = 0),
			(this.e7o = 0),
			(this.t7o = new Set()),
			(this.NeedTick = !0),
			(this.Z9o = o.WeightLimit),
			(this._9o = t.GetBulletInfo()),
			(this.xe = WhirlpoolPoint_1.WhirlpoolPoint.GenId()),
			(this.e7o = o.MoveTime);
	}
	OnInit() {}
	Update(o) {
		var t;
		for ([t] of this._9o.CollisionInfo.CharacterEntityMap) this.t7o.add(t);
		for (const o of this.t7o) this.i7o(o);
	}
	i7o(o) {
		var t = o?.GetComponent(161);
		!t?.Valid ||
			this.Z9o < t.CharacterWeight ||
			(t.GetWhirlpoolId() !== this.xe
				? (t.GetWhirlpoolEnable() && !t.CompareWhirlpoolPriority(this.e7o)) ||
					(t.BeginWhirlpool(
						this.xe,
						this.e7o,
						this._9o.ActorComponent.ActorLocationProxy,
						t.ActorComp.ActorLocationProxy,
					),
					BulletConstant_1.BulletConstant.OpenMoveLog &&
						Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Bullet",
							21,
							"添加吸附",
							["Entity", o.Id],
							["ToLocation", this._9o.ActorComponent.ActorLocationProxy],
							["BeginLocation", t.ActorComp.ActorLocationProxy],
						))
				: t.UpdateWhirlpoolLocation(
						this._9o.ActorComponent.ActorLocationProxy,
					));
	}
	OnBulletDestroy() {
		for (const t of this.t7o) {
			var o = t?.GetComponent(161);
			o?.Valid &&
				o.GetWhirlpoolEnable() &&
				o.GetWhirlpoolId() === this.xe &&
				(o.EndWhirlpool(), BulletConstant_1.BulletConstant.OpenMoveLog) &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Bullet",
					21,
					"解除吸附",
					["Entity", t.Id],
					["BulletLocation", this._9o.ActorComponent.ActorLocationProxy],
					["ToLocation", o.ActorComp.ActorLocationProxy],
				);
		}
		this.t7o.clear();
	}
}
exports.BulletLogicWhirlpool = BulletLogicWhirlpool;

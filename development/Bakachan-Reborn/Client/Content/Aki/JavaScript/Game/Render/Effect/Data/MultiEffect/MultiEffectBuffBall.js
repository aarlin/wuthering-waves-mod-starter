"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MultiEffectBuffBall = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	MultiEffectBase_1 = require("./MultiEffectBase");
class MultiEffectBuffBall extends MultiEffectBase_1.default {
	constructor() {
		super(...arguments),
			(this.BaseNum = 0),
			(this.SpinSpeed = -0),
			(this.Radius = -0),
			(this.ilr = -0),
			(this.BaseAngle = -0),
			(this.TempUeVector = void 0);
	}
	Init(e) {
		super.Init(e),
			(this.BaseNum = e.get("BaseNum")),
			(this.SpinSpeed = e.get("SpinSpeed")),
			(this.Radius = e.get("Radius")),
			(this.TempUeVector = new UE.Vector()),
			(this.ilr = 0.01),
			(this.BaseAngle = 0);
	}
	GetDesiredNum(e) {
		return Math.ceil(this.BaseNum * e - this.ilr);
	}
	Update(e, t, s) {
		var i = s.length,
			f =
				((e =
					(e = ((this.BaseAngle -= e * this.SpinSpeed), this.BaseNum * t)) -
					(t = Math.floor(e))),
				(2 * Math.PI) / MathUtils_1.MathUtils.Lerp(t, t + 1, e)),
			a = Math.min(t, i);
		for (let e = 0; e < a; e++) {
			var c = f * e + this.BaseAngle;
			c =
				(this.TempUeVector.Set(
					Math.cos(c) * this.Radius,
					Math.sin(c) * this.Radius,
					0,
				),
				s[e]);
			EffectSystem_1.EffectSystem.IsValid(c) &&
				EffectSystem_1.EffectSystem.GetEffectActor(
					c,
				).K2_SetActorRelativeLocation(this.TempUeVector, !1, void 0, !0);
		}
		a < i &&
			((t = f * a + this.BaseAngle),
			(i = (2 - e) * e * this.Radius),
			this.TempUeVector.Set(Math.cos(t) * i, Math.sin(t) * i, 0),
			(e = s[a]),
			EffectSystem_1.EffectSystem.IsValid(e)) &&
			EffectSystem_1.EffectSystem.GetEffectActor(e).K2_SetActorRelativeLocation(
				this.TempUeVector,
				!1,
				void 0,
				!0,
			);
	}
}
exports.MultiEffectBuffBall = MultiEffectBuffBall;

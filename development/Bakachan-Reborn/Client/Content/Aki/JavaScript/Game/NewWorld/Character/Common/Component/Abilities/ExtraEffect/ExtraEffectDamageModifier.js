"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageModifier = void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageModifier extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.Value = 0);
	}
	InitParameters(e) {
		(e = e.ExtraEffectParameters), (this.Value = Number(e[0]));
	}
	OnExecute() {
		return this.Value;
	}
	static ApplyEffects(e, t) {
		var r = t.Attacker.OwnerBuffComponent;
		let f = 0,
			a = !1;
		for (const s of t.Target.OwnerBuffComponent.BuffEffectManager.FilterById(
			12,
		))
			s.Check(e, r) && ((f += s.Execute()), (a = !0));
		return { Result: f, IsSuccessful: a };
	}
}
(exports.DamageModifier = DamageModifier).TempModifiedResult = 0;

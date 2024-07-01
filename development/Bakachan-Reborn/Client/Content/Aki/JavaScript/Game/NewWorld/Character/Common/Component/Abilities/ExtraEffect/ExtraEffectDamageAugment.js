"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageAugment = void 0);
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
	AbilityUtils_1 = require("../AbilityUtils"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
class DamageAugment extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.vQo = EAttributeId.Proto_EAttributeType_None),
			(this.MQo = -0),
			(this.SQo = 0),
			(this.EQo = 0);
	}
	InitParameters(t) {
		var e = t.ExtraEffectParameters,
			r = t.ExtraEffectGrowParameters1,
			i = ((t = t.ExtraEffectGrowParameters2), this.Level);
		(this.vQo = Number(e[0])),
			(this.EQo = Number(e[1])),
			(this.MQo = AbilityUtils_1.AbilityUtils.GetLevelValue(r, i, 0)),
			(this.SQo = AbilityUtils_1.AbilityUtils.GetLevelValue(t, i, 0));
	}
	OnExecute() {
		var t = this.vQo,
			e = this.InstigatorEntity?.Entity?.CheckGetComponent(156),
			r = this.MQo,
			i = this.SQo;
		r *= CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
		let a = 0;
		switch (this.EQo) {
			case 0:
				a = e.GetBaseValue(t);
				break;
			case 1:
				a = e.GetCurrentValue(t);
		}
		return Math.max(a * r + i, 0);
	}
	static ApplyEffects(t, e) {
		var r = e.Attacker.OwnerBuffComponent,
			i = e.Target.OwnerBuffComponent;
		let a = 0;
		for (const e of r.BuffEffectManager.FilterById(9))
			e.Check(t, i) && (a += e.Execute());
		return a;
	}
}
exports.DamageAugment = DamageAugment;

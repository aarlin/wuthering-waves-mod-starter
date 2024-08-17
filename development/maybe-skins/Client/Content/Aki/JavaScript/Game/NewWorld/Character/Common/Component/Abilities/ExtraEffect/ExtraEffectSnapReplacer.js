"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SnapReplacer = void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class SnapReplacer extends ExtraEffectBase_1.BuffEffect {
	OnExecute() {
		return this.InstigatorBuffComponent;
	}
	static ApplyEffects(e, t, r) {
		for (const n of t.BuffEffectManager.FilterById(27))
			if (
				n.InstigatorEntity?.Valid &&
				n.InstigatorEntity?.Entity.Id !== n.OwnerBuffComponent.GetEntity().Id &&
				n.Check(e, r)
			)
				return n.Execute();
		return t;
	}
}
exports.SnapReplacer = SnapReplacer;

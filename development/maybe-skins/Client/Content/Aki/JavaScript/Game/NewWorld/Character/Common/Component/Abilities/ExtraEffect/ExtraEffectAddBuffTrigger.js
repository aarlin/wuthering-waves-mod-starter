"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AddBuffTrigger = void 0);
const ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AddBuffTrigger extends ExtraEffectPassiveEffects_1.PassiveEffects {
	constructor() {
		super(...arguments), (this.BuffIds = []);
	}
	InitParameters(e) {
		(e = e.ExtraEffectParameters),
			(this.EventType = Number(e[0])),
			(this.TargetType = Number(e[1])),
			(this.BuffIds = e[2].split("#").map((e) => BigInt(e)));
	}
	OnExecute() {
		var e = this.GetEffectTarget(),
			t = this.InstigatorBuffComponent;
		if (e && t) {
			var f = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
			if (f?.IsValid())
				for (const t of this.BuffIds)
					e.AddIterativeBuff(
						t,
						f,
						void 0,
						!0,
						`因为触发其它buff额外效果而添加（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
					);
		}
	}
}
exports.AddBuffTrigger = AddBuffTrigger;

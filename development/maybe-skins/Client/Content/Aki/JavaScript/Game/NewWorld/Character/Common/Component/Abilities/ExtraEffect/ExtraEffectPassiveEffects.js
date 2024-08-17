"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PassiveEffects =
		exports.DEFAULT_PASSIVE_BUFF_ADD_TIMES =
		exports.DEFAULT_PASSIVE_BULLET_TIMES =
			void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
(exports.DEFAULT_PASSIVE_BULLET_TIMES = 1),
	(exports.DEFAULT_PASSIVE_BUFF_ADD_TIMES = 0);
class PassiveEffects extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.EventType = 0), (this.TargetType = 0);
	}
	OnCreated() {
		this.OwnerBuffComponent?.AddTrigger(
			this.ActiveHandleId,
			this.EventType,
			this,
		);
	}
	OnRemoved() {
		this.OwnerBuffComponent?.RemoveTrigger(this.ActiveHandleId, this.EventType);
	}
	CheckExecutable() {
		return !!this.OwnerBuffComponent?.HasBuffAuthority();
	}
	GetEffectTarget() {
		switch (this.TargetType) {
			case 0:
				return this.OwnerBuffComponent;
			case 1:
				return this.OpponentBuffComponent;
			case 2:
				return this.InstigatorBuffComponent;
			case 3:
				return this.GetBuffHolderSkillTarget();
			default:
				return;
		}
	}
	GetBuffHolderSkillTarget() {
		var e =
			this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(33)?.SkillTarget;
		return e ? e.Entity.CheckGetComponent(187) : this.OwnerBuffComponent;
	}
}
exports.PassiveEffects = PassiveEffects;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConvertShieldAttribute = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
	AbilityUtils_1 = require("../AbilityUtils"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class ConvertShieldAttribute extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.xQo = void 0),
			(this.wQo = 0),
			(this.ine =
				CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
			(this.BQo = 0),
			(this.bQo = 0),
			(this.qQo = 0),
			(this.GQo = 0),
			(this.NQo = 0),
			(this.VKo = void 0),
			(this.ZQe = (t) => {
				this.OQo(), this.kQo();
			});
	}
	InitParameters(t) {
		var e = t.ExtraEffectParameters;
		(this.xQo = Number(e[0])),
			(this.wQo = Number(e[1])),
			(this.ine = Number(e[2])),
			(this.BQo = Number(e[3])),
			(this.bQo = Number(e[4])),
			(this.qQo = Number(e[5])),
			(this.GQo = AbilityUtils_1.AbilityUtils.GetLevelValue(
				t.ExtraEffectGrowParameters1,
				this.Level,
				0,
			)),
			(this.NQo = AbilityUtils_1.AbilityUtils.GetLevelValue(
				t.ExtraEffectGrowParameters2,
				this.Level,
				0,
			));
	}
	OnExecute() {}
	OnCreated() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.OwnerEntity,
			EventDefine_1.EEventName.CharShieldChange,
			this.ZQe,
		),
			this.kQo();
	}
	kQo() {
		if ((e = this.xQo ? this.InstigatorEntity?.Entity : this.OwnerEntity)) {
			var t,
				e = e.CheckGetComponent(64),
				i = this.OwnerEntity?.CheckGetComponent(156);
			let s = (e = e?.GetShieldValue(this.wQo) ?? 0) >= this.bQo,
				r = e;
			0 < this.qQo && (r = Math.min(r, this.qQo)),
				(e =
					(r =
						0 < this.BQo &&
						((s =
							e >=
							(t = i?.GetCurrentValue(this.BQo) ?? 0) *
								this.bQo *
								CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
						0 < this.qQo)
							? Math.min(
									e,
									t * this.qQo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
								)
							: r) *
						this.NQo *
						CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
					this.GQo),
				s &&
					0 !== e &&
					(this.VKo = i?.AddModifier(this.ine ?? 0, { Type: 0, Value1: e }));
		}
	}
	OQo() {
		this.VKo &&
			(this.xQo ? this.InstigatorEntity?.Entity : this.OwnerEntity) &&
			(this.OwnerEntity?.CheckGetComponent(156)?.RemoveModifier(
				this.ine ?? 0,
				this.VKo,
			),
			(this.VKo = void 0));
	}
	OnRemoved() {
		this.OwnerEntity &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.OwnerEntity,
				EventDefine_1.EEventName.CharShieldChange,
				this.ZQe,
			),
			this.OQo();
	}
}
exports.ConvertShieldAttribute = ConvertShieldAttribute;

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageShare = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	DamageById_1 = require("../../../../../../../Core/Define/ConfigQuery/DamageById"),
	EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
	AbilityUtils_1 = require("../AbilityUtils"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageShare extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.ShareType = 0), (this.ShareRate = -0);
	}
	InitParameters(e) {
		var t = e.ExtraEffectParameters;
		e = e.ExtraEffectGrowParameters1;
		(this.ShareType = Number(t[0] ?? 0)),
			(this.ShareRate =
				AbilityUtils_1.AbilityUtils.GetLevelValue(e, this.Level, 0) *
				CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
	}
	static ApplyHitShare(e, t, a, r) {
		var i,
			s,
			o = DamageById_1.configDamageById.GetConfig(t.ReBulletData.Base.DamageId);
		for ([i, s] of this.GetShareRateMap(e, o))
			EntitySystem_1.EntitySystem.Get(i)
				?.CheckGetComponent(51)
				?.OnSharedHit(t, a, r, s);
	}
	static ApplyBuffShare(e, t, a, r, i) {
		for (var [s, o] of this.GetShareRateMap(e, t)) {
			var s = EntitySystem_1.EntitySystem.Get(s),
				n = s?.CheckGetComponent(1)?.ActorLocation;
			s?.CheckGetComponent(18)?.ExecuteBuffShareDamage(
				{ ...a, HitPosition: n },
				r,
				o,
				i,
			);
		}
	}
	OnExecute(e) {
		return this.InstigatorEntityId === this.OwnerEntity.Id
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Battle",
						20,
						"[DamageShare] Cannot Share damage to oneself.",
						["entityId", this.InstigatorEntityId],
					),
				[void 0, 0])
			: e
				? this.IsShareable(e.CalculateType)
					? [this.InstigatorEntityId, this.ShareRate]
					: void 0
				: [void 0, 0];
	}
	IsShareable(e) {
		switch (this.ShareType) {
			case 2:
				return 1 === e;
			case 1:
				return 0 === e;
			default:
				return !0;
		}
	}
	static GetShareRateMap(e, t) {
		var a,
			r,
			i = e.GetComponent(157),
			s = ((e = i.BuffEffectManager.FilterById(18)), new Map());
		for (const o of e)
			o.Check({}, i) &&
				(([a, r] = o.Execute(t)), void 0 !== a) &&
				s.set(a, r + (s.get(a) ?? 0));
		return s;
	}
}
exports.DamageShare = DamageShare;

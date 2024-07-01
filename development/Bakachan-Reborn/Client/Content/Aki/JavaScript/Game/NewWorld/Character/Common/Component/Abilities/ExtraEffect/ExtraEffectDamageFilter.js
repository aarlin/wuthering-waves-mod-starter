"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageFilter = void 0);
const DamageById_1 = require("../../../../../../../Core/Define/ConfigQuery/DamageById"),
	ExtraEffectBase_1 = require("./ExtraEffectBase"),
	ExtraEffectBaseTypes_1 = require("./ExtraEffectBaseTypes");
class DamageFilter extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.lNe = !1);
	}
	InitParameters(e) {
		(e = e.ExtraEffectParameters), (this.lNe = Boolean(Number(e[0])));
	}
	OnExecute() {
		return !this.lNe;
	}
	static ApplyEffects(e, t, a, r, f, n) {
		var s = e.GetComponent(157);
		t = t.GetComponent(157);
		if (s && t) {
			var l = e.GetComponent(33),
				o = new ExtraEffectBaseTypes_1.RequirementPayload();
			(f =
				(f &&
					((o.SkillId = f),
					(l = l.GetSkillInfo(f)),
					(o.SkillGenre = l?.SkillGenre ?? -1)),
				n ? DamageById_1.configDamageById.GetConfig(n) : void 0)) &&
				((o.DamageGenre = f.Type),
				(o.CalculateType = f.CalculateType),
				(o.SmashType = f.SmashType),
				(o.ElementType = f.Element)),
				(o.BulletId = BigInt(a)),
				(o.BulletTags = r ?? []),
				(o.WeaponType =
					e.GetComponent(83)?.GetWeaponType() ??
					ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS);
			for (const e of t.BuffEffectManager.FilterById(22))
				if (e.Check(o, s) === e.Execute()) return !0;
		}
		return !1;
	}
}
exports.DamageFilter = DamageFilter;

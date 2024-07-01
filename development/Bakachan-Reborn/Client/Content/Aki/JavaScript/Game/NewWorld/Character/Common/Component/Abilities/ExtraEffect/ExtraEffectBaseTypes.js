"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExtraEffectParameters =
		exports.RequirementPayload =
		exports.DEFAULT_WEAPON_TYPE_NOT_PASS =
		exports.RequireAndLimits =
		exports.EffectLimits =
			void 0);
class EffectLimits {
	constructor() {
		(this.ExtraEffectCd = -0),
			(this.ExtraEffectRemoveStackNum = 0),
			(this.ExtraEffectProbability = -0);
	}
}
exports.EffectLimits = EffectLimits;
class RequireAndLimits {
	constructor() {
		(this.CheckType = 0),
			(this.Requirements = []),
			(this.Limits = new EffectLimits());
	}
}
(exports.RequireAndLimits = RequireAndLimits),
	(exports.DEFAULT_WEAPON_TYPE_NOT_PASS = -2);
class RequirementPayload {
	constructor() {
		(this.SkillId = -1),
			(this.SkillGenre = -1),
			(this.CalculateType = -1),
			(this.DamageGenre = -1),
			(this.SmashType = -1),
			(this.BulletId = void 0),
			(this.BuffId = void 0),
			(this.IsCritical = !1),
			(this.IsImmune = !1),
			(this.IsTargetKilled = !1),
			(this.ElementType = 0),
			(this.WeaponType = -1),
			(this.PartId = -1),
			(this.PartTag = 0),
			(this.BulletTags = []);
	}
	PartialAssign(t) {
		return Object.assign(this, t);
	}
}
exports.RequirementPayload = RequirementPayload;
class ExtraEffectParameters {
	constructor() {
		(this.ExtraEffectId = 2),
			(this.ExtraEffectParameters = void 0),
			(this.ExtraEffectGrowParameters1 = void 0),
			(this.ExtraEffectGrowParameters2 = void 0),
			(this.ExtraEffectRequirement = void 0),
			(this.ExtraEffectRequirementPara = void 0),
			(this.ExtraEffectRequirementSetting = 0),
			(this.ExtraEffectCd = void 0),
			(this.ExtraEffectRemoveStackNum = 0),
			(this.ExtraEffectProbability = void 0),
			(this.ExecutionEffect = void 0);
	}
}
exports.ExtraEffectParameters = ExtraEffectParameters;

"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Calculation = exports.ENERGY_SHARE_RATE = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
    CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
    AbnormalDamageConfigByLevel_1 = require("../../../../../../Core/Define/ConfigQuery/AbnormalDamageConfigByLevel"),
    RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem"),
    AbilityUtils_1 = require("./AbilityUtils"),
    ModManager_1 = require("../../../../../Manager/ModManager"),
    CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
    ModMenu_1 = require("../../../../../ModMenu"),
    DAMAGE_CONSTANT1 = 2,
    DAMAGE_CONSTANT2 = 800,
    DAMAGE_CONSTANT3 = 8,
    DAMAGE_CONSTANT4 = 2,
    DAMAGE_CONSTANT5 = .8,
    DAMAGE_CONSTANT6 = 5,
    DAMAGE_CONSTANT_K = 4e4,
    DAMAGE_CONSTANT_A = 1,
    DAMAGE_CONSTANT_B = .8,
    DAMAGE_CONSTANT_MU = 40,
    DAMAGE_CONSTANT_SIGMA = .5,
    DAMAGE_CONSTANT_WEIGHT = .1,
    ELEMENT_CONTER_RATE = 1,
    REACTION_LIMIT_CONSTANT = 3e3,
    REACTION_EXTRACT_CONSTANT = 8,
    REACTION_LOWER_BOUND_CONSTANT = 1830,
    DAMAGE_FALLING_10000 = 1e4;

function getAttrFromSnapshots(e, t, a) {
    return a < CharacterAttributeTypes_1.EAttributeId.Proto_Lv || a >= CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX?0 : (0 !== t?e.TargetSnapshot : e.AttackerSnapshot).GetCurrentValue(a)
}
exports.ENERGY_SHARE_RATE = 3e3;
const formulas = {
    1: function (e, t, a, r, n, u, D, _, s, o, l, i, T, A, C, c, E, m, g) {
        var N = getAttrFromSnapshots.bind(this, e);
        T = N(T, i) * (A * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + C, i = N(m, E) * (c * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + g + N(l, o) * T;
        return 1 === t?(A = e.TargetSnapshot.CurrentValues.Proto_HealedChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, C = e.AttackerSnapshot.CurrentValues.Proto_HealChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, Math.max(i * (1 + A + C), 0)) : (m = Calculation.CalculateHurt(e, a.Element, a.Type, a.RelatedProperty, AbilityUtils_1.AbilityUtils.GetLevelValue(a.RateLv, r, 0), n, u, D, i), Math.max(m, 0))
    },
    2: function (e, t, a, r, n, u, D, _, s, o, l, i, T) {
        return l = getAttrFromSnapshots.bind(this, e)(l, o) * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + T, 1 === t?-Math.min(e.TargetSnapshot.CurrentValues.Proto_Life - l, 0) : Math.max(e.TargetSnapshot.CurrentValues.Proto_Life - l, 0)
    },
    3: function (e, t, a, r, n, u, D, _, s, o, l, i, T) {
        return getAttrFromSnapshots.bind(this, e)(l, o) * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + T
    },
    4: function (e, t, a, r, n, u, D, _, s, o, l, i, T, A) {
        return e = getAttrFromSnapshots.bind(this, e)(l, o) * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + T, Math.min(e, _ * (A * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND))
    },
    5: function (e, t, a, r, n, u, D, _, s, o, l) {
        return e.TargetSnapshot.CurrentValues.e5n * (o * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) / s + l
    },
    6: function (e, t, a, r, n, u, D, _, s, o, l, i, T, A, C) {
        return l = (e = getAttrFromSnapshots.bind(this, e))(l, o) * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + e(A, T) * (C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND), Math.max(l, 0)
    },
    7: function (e, t, a, r, n, u, D, _, s, o, l, i, T, A, C) {
        return l = getAttrFromSnapshots.bind(this, e)(l, o) * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + T, o = e.TargetSnapshot.CurrentValues.Proto_Life - (e.TargetSnapshot.CurrentValues.e5n * A * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + C), Math.max(0, Math.min(l, o))
    },
    1001: function (e, t, a, r, n, u, D, _, s, o, l, i, T, A, C) {
        a = a.Element;
        var c = e.AttackerSnapshot,
            E = (e = e.TargetSnapshot, c.CurrentValues.Proto_Lv);
        let m = 0;
        switch (a) {
            case 1:
                m = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(E)?.Abnormal1003 ?? 0;
                break;
            case 2:
                m = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(E)?.Abnormal1004 ?? 0;
                break;
            case 3:
                m = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(E)?.Abnormal1002 ?? 0;
                break;
            case 4:
                m = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(E)?.Abnormal1001 ?? 0;
                break;
            case 5:
                m = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(E)?.Abnormal1005 ?? 0;
                break;
            case 6:
                m = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(E)?.Abnormal1006 ?? 0
        }
        o *= CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        var g = Math.min(Calculation.GetElementDamageReduce(e, a), 1),
            N = Calculation.GetElementResistant(e, a);
        let h = 0;
        return h = N - (a = Calculation.GetElementIgnoreResistance(c, a)) <= 0?1 - (N - a) / 2 : N - a < .8?1 - (N - a) : 1 / (1 + 5 * (N - a)), N = e.CurrentValues.Proto_Def, a = c.CurrentValues.Proto_IgnoreDefRate * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, m * o * (N = Math.min(2, 1 / (N * (1 - a) / (800 + 8 * E) + 1))) * h * (1 - (a = Math.min(e.CurrentValues.Proto_DamageReduce * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, 1))) * (1 - g) * (1 + (e = Math.max(c.CurrentValues.Proto_SpecialDamageChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, -1)))
    }
};
class Calculation {
    static CalculateHurt(e, t, a, r, n, u, D, _, s = 0) {
        var o = e.AttackerSnapshot,
            l = e.TargetSnapshot,
            i = (n = n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, this.GetElementDamageBonus(o, t)),
            T = Math.min(this.GetElementDamageReduce(l, t), 1),
            A = this.GetElementResistant(l, t),
            C = this.GetElementIgnoreResistance(o, t);
        let c = 0;
        return c = A - C <= 0?1 - (A - C) / 2 : A - C < .8?1 - (A - C) : 1 / (1 + 5 * (A - C)), A = this.GetAttackTypeDamageBonus(o, a), C = getAttrFromSnapshots(e, 0, r), a = l.CurrentValues.Proto_Def, e = o.CurrentValues.Proto_IgnoreDefRate * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, r = o.CurrentValues.Proto_Lv, a = Math.min(2, 1 / (a * (1 - e) / (800 + 8 * r) + 1)), e = 1 + o.CurrentValues.Proto_DamageChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + i + A, r = l.CurrentValues.Proto_ElementPropertyType, i = Math.min(l.CurrentValues.Proto_DamageReduce * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, 1), A = 1 + o.CurrentValues.Proto_SpecialDamageChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, l = Calculation.CalculateElementMatchUpRate(t, r), t = o.CurrentValues.Proto_CritDamage * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, r = (n * C + D + s) * (u?t : 1) * a * e * c * (1 - i) * (1 - T) * A * l * Math.max(1 + _ * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, 0), Math.max(0, r)
    }
    static GetElementResistant(e, t) {
        switch (t) {
            case 0:
                return e.CurrentValues.Proto_DamageResistancePhys * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 1:
                return e.CurrentValues.Proto_DamageResistanceElement1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 2:
                return e.CurrentValues.Proto_DamageResistanceElement2 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 3:
                return e.CurrentValues.Proto_DamageResistanceElement3 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 4:
                return e.CurrentValues.Proto_DamageResistanceElement4 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 5:
                return e.CurrentValues.Proto_DamageResistanceElement5 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 6:
                return e.CurrentValues.Proto_DamageResistanceElement6 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            default:
                return 0
        }
        return 0
    }
    static GetElementIgnoreResistance(e, t) {
        switch (t) {
            case 0:
                return e.CurrentValues.Proto_IgnoreDamageResistancePhys * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 1:
                return e.CurrentValues.Proto_IgnoreDamageResistanceElement1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 2:
                return e.CurrentValues.Proto_IgnoreDamageResistanceElement2 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 3:
                return e.CurrentValues.Proto_IgnoreDamageResistanceElement3 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 4:
                return e.CurrentValues.Proto_IgnoreDamageResistanceElement4 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 5:
                return e.CurrentValues.Proto_IgnoreDamageResistanceElement5 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 6:
                return e.CurrentValues.Proto_IgnoreDamageResistanceElement6 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            default:
                return 0
        }
        return 0
    }
    static GetElementDamageReduce(e, t) {
        switch (t) {
            case 0:
                return e.CurrentValues.Proto_DamageReducePhys * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 1:
                return e.CurrentValues.Proto_DamageReduceElement1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 2:
                return e.CurrentValues.Proto_DamageReduceElement2 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 3:
                return e.CurrentValues.Proto_DamageReduceElement3 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 4:
                return e.CurrentValues.Proto_DamageReduceElement4 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 5:
                return e.CurrentValues.Proto_DamageReduceElement5 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 6:
                return e.CurrentValues.Proto_DamageReduceElement6 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            default:
                return 0
        }
        return 0
    }
    static GetElementDamageBonus(e, t) {
        switch (t) {
            case 0:
                return e.CurrentValues.Proto_DamageChangePhys * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 1:
                return e.CurrentValues.Proto_DamageChangeElement1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 2:
                return e.CurrentValues.Proto_DamageChangeElement2 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 3:
                return e.CurrentValues.Proto_DamageChangeElement3 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 4:
                return e.CurrentValues.Proto_DamageChangeElement4 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 5:
                return e.CurrentValues.Proto_DamageChangeElement5 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 6:
                return e.CurrentValues.Proto_DamageChangeElement6 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            default:
                return 0
        }
        return 0
    }
    static GetAttackTypeDamageBonus(e, t) {
        switch (t) {
            case 0:
                return e.CurrentValues.Proto_DamageChangeAuto * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 1:
                return e.CurrentValues.Proto_DamageChangeCast * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 2:
                return e.CurrentValues.Proto_DamageChangeUltra * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 3:
                return e.CurrentValues.Proto_DamageChangeQte * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 4:
                return e.CurrentValues.Proto_DamageChangeNormalSkill * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
            case 5:
                return e.CurrentValues.Proto_DamageChangePhantom * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        }
        return 0
    }
    static yQo(e, t, a, r) {
        a = getAttrFromSnapshots(e, 0, a), r *= CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        var n = e.TargetSnapshot.CurrentValues.Proto_HealedChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        e = e.AttackerSnapshot.CurrentValues.Proto_HealChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        return Math.max(0, (r * a + t) * (n + e + 1))
    }
    static ToughCalculation(e, t, a) {
        return a * (e.CurrentValues.Proto_ToughChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) * (t.CurrentValues.Proto_ToughReduce * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) * (t.CurrentValues.Proto_SkillToughRatio * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND)
    }
    static LandingDamageCalculationRole(e, t, a, r) {
        var n = CommonParamById_1.configCommonParamById.GetIntArrayConfig("landing_damage_args_role"),
            u = 0 < (u = e / n[0] - 1)?u : 0,
            D = n[2] / 1e4,
            _ = n[3] / 1e4,
            s = (_ = u + (D = Math.pow(a, D) * _), Math.floor(_ * r));
        return !0 === ModManager_1.ModManager.Settings.GodMode?0 : 0 < s?(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 29, "角色跌落伤害", ["上一帧速度", e], ["这一帧速度", t], ["damage", s], ["time", a], ["lifeMax", r], ["landing_damage_args_role", n], ["rateBase", u], ["rateT", D], ["rate", _]), s) : 0
    }
    static LandingDamageCalculationMonster(e, t) {
        var a, r = CommonParamById_1.configCommonParamById.GetIntArrayConfig("landing_damage_args_monster");
        return e < r[0]?0 : (a = Math.floor(Math.pow(e, r[1] / 1e4) * (r[3] / 1e4) * t / r[2]), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 29, "怪物跌落伤害", ["height", e], ["landing_damage_args_monster", r], ["damage", a], ["lifeMax", t]), a)
    }
    static ReactionDamageRateCalculation(e, t, a, r, n, u, D) {
        u = 2 - 3e3 / (8 * u + 1830);
        let _ = 0;
        switch (r) {
            case 0:
                _ = e.CurrentValues.Proto_DamageChangePhys;
                break;
            case 1:
                _ = e.CurrentValues.Proto_DamageChangeElement1;
                break;
            case 2:
                _ = e.CurrentValues.Proto_DamageChangeElement2;
                break;
            case 3:
                _ = e.CurrentValues.Proto_DamageChangeElement3;
                break;
            case 4:
                _ = e.CurrentValues.Proto_DamageChangeElement4;
                break;
            case 5:
                _ = e.CurrentValues.Proto_DamageChangeElement5;
                break;
            case 6:
                _ = e.CurrentValues.Proto_DamageChangeElement6
        }
        _ *= CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        r = e.CurrentValues.Proto_CritDamage * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, D = D?r : 1, r = n.A * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        var s = n.B * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
            o = n.C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
            l = n.D * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
            i = n.E * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
            T = n.F * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
            A = (n = n.G * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, e.CurrentValues.Proto_Lv),
            C = e.CurrentValues.Proto_Atk,
            c = (t = t.CurrentValues.Proto_Lv, .1 / (1 / 4e4 + 1 * Math.pow(.8, .5 * (A + 40))));
        a = a * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * (1 + u * r + s * A + i) * D * (1 + C * o) * (1 + _ * l) * (1 / (1 + t / (T + A * n))) * c;
        return Math.ceil(a)
    }
    static CalculateElementMatchUpRate(e, t) {
        return 1
    }
    static CalculateFormula(e, t, a, r, n, u, D, _, s) {
        var o = a.FormulaType,
            l = a.CalculateType;
        let i = 0;
        if (o) {
            if (!(o in formulas)) return Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "unexpected formula type", ["damageId", a.Id], ["formula type", o]), 0;
            i = formulas[o](t, l, a, r, n, D, e.Accumulation, s, AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam1, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam2, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam3, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam4, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam5, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam6, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam7, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam8, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam9, r, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(a.FormulaParam10, r, 0))
        } else o = a.RelatedProperty, s = AbilityUtils_1.AbilityUtils.GetLevelValue(a.RateLv, r, 0), i = 0 === l?this.CalculateHurt(t, a.Element, a.Type, o, s, n, D, _) : (n = AbilityUtils_1.AbilityUtils.GetLevelValue(a.CureBaseValue, r, 0), this.yQo(t, n, o, s));
        return D = e.RandomSeed, e.RandomSeed = RandomSystem_1.default.GetNextRandomSeed(D, 1), n = (((_ = AbilityUtils_1.AbilityUtils.GetLevelValue(a.FluctuationUpper, r, CharacterAttributeTypes_1.PER_TEN_THOUSAND)) - (t = AbilityUtils_1.AbilityUtils.GetLevelValue(a.FluctuationLower, r, CharacterAttributeTypes_1.PER_TEN_THOUSAND))) * (D % CharacterAttributeTypes_1.PER_TEN_THOUSAND) + t) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, i = Math.ceil(i * u * n), 1 === l?-i : i
    }
}
exports.Calculation = Calculation;
"use strict";
var CharacterDamageComponent_1, __decorate = this && this.__decorate || function (e, t, a, r) {
    var o, i = arguments.length,
        n = i < 3?t : null === r?r = Object.getOwnPropertyDescriptor(t, a) : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, a, r);
    else
        for (var l = e.length - 1; 0 <= l; l--)(o = e[l]) && (n = (i < 3?o(n) : 3 < i?o(t, a, n) : o(t, a)) || n);
    return 3 < i && n && Object.defineProperty(t, a, n), n
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CharacterDamageComponent = exports.BaseAttributeSet = exports.DamageCompPayload = exports.SnapshotPayload = void 0;
const puerts_1 = require("puerts"),
    Log_1 = require("../../../../../../Core/Common/Log"),
    Stats_1 = require("../../../../../../Core/Common/Stats"),
    Time_1 = require("../../../../../../Core/Common/Time"),
    CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
    CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
    DamageById_1 = require("../../../../../../Core/Define/ConfigQuery/DamageById"),
    DamagePayloadById_1 = require("../../../../../../Core/Define/ConfigQuery/DamagePayloadById"),
    Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
    EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
    EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
    RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
    RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem"),
    DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
    CharacterPartComponent_1 = require("../../../../../NewWorld/Character/Common/Component/CharacterPartComponent"),
    TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
    MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
    EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
    ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
    ModelManager_1 = require("../../../../../Manager/ModelManager"),
    CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
    SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
    GameplayAbilityVisionControl_1 = require("../Vision/GA/GameplayAbilityVisionControl"),
    AbilityUtils_1 = require("./AbilityUtils"),
    ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
    ModManager_1 = require("../../../../../Manager/ModManager"),
    ModMenu_1 = require("../../../../../ModMenu"),
    EntityManager_1 = require("../../../../../Manager/ModFuncs/EntityManager"),
    CharacterAbilityComponent_1 = require("./CharacterAbilityComponent"),
    CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
    CharacterBuffIds_1 = require("./CharacterBuffIds"),
    CharacterDamageCalculations_1 = require("./CharacterDamageCalculations"),
    ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes"),
    ExtraEffectDamageAccumulation_1 = require("./ExtraEffect/ExtraEffectDamageAccumulation"),
    ExtraEffectDamageAugment_1 = require("./ExtraEffect/ExtraEffectDamageAugment"),
    ExtraEffectDamageImmune_1 = require("./ExtraEffect/ExtraEffectDamageImmune"),
    ExtraEffectDamageModifier_1 = require("./ExtraEffect/ExtraEffectDamageModifier"),
    ExtraEffectDamageShare_1 = require("./ExtraEffect/ExtraEffectDamageShare"),
    ExtraEffectSnapModifier_1 = require("./ExtraEffect/ExtraEffectSnapModifier"),
    damageDataPayloadIdDefault = BigInt(0);
class SnapshotPayload {
    constructor() {
        this.Target = void 0, this.Attacker = void 0, this.TargetSnapshot = void 0, this.AttackerSnapshot = void 0
    }
}
exports.SnapshotPayload = SnapshotPayload;
class DamageCompPayload {
    constructor() {
        this.Target = void 0, this.Attacker = void 0
    }
}
exports.DamageCompPayload = DamageCompPayload;
class BaseAttributeSet {}
exports.BaseAttributeSet = BaseAttributeSet;
let CharacterDamageComponent = CharacterDamageComponent_1 = class extends EntityComponent_1.EntityComponent {
    constructor() {
        super(...arguments), this.$te = void 0, this.Xte = void 0, this.m1t = void 0, this.$br = void 0, this.Ybr = void 0, this.Jbr = void 0, this.tRr = void 0, this.HBr = void 0, this.ActorComponent = void 0, this.u1t = void 0, this.zbr = void 0, this.Zbr = void 0, this.eqr = 0, this.tqr = 0, this.iqr = new Map
    }
    get OwnerAttributeComponent() {
        return this.$te
    }
    get OwnerBuffComponent() {
        return this.m1t
    }
    OnStart() {
        return this.$te = this.Entity.CheckGetComponent(158), this.Xte = this.Entity.CheckGetComponent(188), this.m1t = this.Entity.CheckGetComponent(159), this.$br = this.Entity.CheckGetComponent(52), this.Ybr = this.Entity.CheckGetComponent(48), this.Jbr = this.Entity.GetComponent(85), this.tRr = this.Entity.CheckGetComponent(33), this.HBr = this.Entity.CheckGetComponent(160), this.ActorComponent = this.Entity.CheckGetComponent(3), this.u1t = this.Entity.CheckGetComponent(0), this.eqr = this.oqr(), !0
    }
    OnClear() {
        return this.rqr(), !0
    }
    OnTick(e) {
        -this.ActorComponent.ActorVelocityProxy.Z >= this.eqr?0 === this.tqr && (this.tqr = Time_1.Time.WorldTimeSeconds) : this.tqr = 0
    }
    ExecuteBulletDamage(e, t, a) {
        var r, o = (e = EntitySystem_1.EntitySystem.Get(e)).GetBulletInfo(),
            i = DamageById_1.configDamageById.GetConfig(t.DamageDataId);
        
        if (!this.Entity) {
            return; 
        }
        let CharacterPartComponent = this.Entity.GetComponent(60);
        if (!CharacterPartComponent) {
            return {
                DamageResult: 0,
                ToughResult: 0
            }
        }
        
        CharacterPartComponent.OnInitData();
        CharacterPartComponent.OnInit();
        CharacterPartComponent.OnActivate();
        
        let part = null;
        if (CharacterPartComponent.Parts.length > 0) {
            part = CharacterPartComponent.GetPartByIndex(0)
        }
        let res = null;
        try {
            res = i?((r = new ExtraEffectBaseTypes_1.RequirementPayload).BulletId = BigInt(o.BulletRowName), r.SkillId = Number(o.BulletInitParams.SkillId), r.BulletTags = o.Tags ?? [],
            r.PartId = t.PartId,
            0 <= r.PartId && (r.PartTag = part.PartTag?.TagId),
            o = {
                ...t,
                DamageData: i,
                Attacker: t.Attacker.CheckGetComponent(18),
                SourceType: Protocol_1.Aki.Protocol.VAs.Proto_FromBullet,
                IsReaction: i.PayloadId !== damageDataPayloadIdDefault,
                Accumulation: ExtraEffectDamageAccumulation_1.DamageAccumulation.GetAccumulation(e.Id),
                PartId: t.PartId,
                RandomSeed: ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed()
            }, this.aqr(o), this.ProcessDamage(r, o, a)) : {
                DamageResult: 0,
                ToughResult: 0
            }
        } catch {}
        return res;
    }
    ExecuteBuffDamage(e, t, a) {
        e.Attacker = e.Attacker?.GetComponent(48)?.GetAttributeHolder() ?? e.Attacker;
        var r, o, i = DamageById_1.configDamageById.GetConfig(e.DamageDataId);
        i && ((r = new ExtraEffectBaseTypes_1.RequirementPayload).PartialAssign(t), o = {
            ...e,
            DamageData: i,
            Attacker: e.Attacker.CheckGetComponent(18),
            SourceType: Protocol_1.Aki.Protocol.VAs.Proto_FromEffect,
            IsAddEnergy: !1,
            IsCounterAttack: !1,
            ForceCritical: !1,
            IsBlocked: !1,
            IsReaction: !1,
            PartId: -1,
            ExtraRate: 1,
            Accumulation: 0,
            RandomSeed: ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed()
        }, this.aqr(o), this?.ProcessDamage(r, o, a), ExtraEffectDamageShare_1.DamageShare.ApplyBuffShare(this.Entity, i, e, t, a))
    }
    ExecuteBuffShareDamage(e, t, a, r) {
        var o, i = DamageById_1.configDamageById.GetConfig(e.DamageDataId);
        i && ((o = new ExtraEffectBaseTypes_1.RequirementPayload).PartialAssign(t), t = {
            ...e,
            DamageData: i,
            Attacker: e.Attacker.CheckGetComponent(18),
            SourceType: Protocol_1.Aki.Protocol.VAs.Proto_FromEffect,
            IsAddEnergy: !1,
            IsCounterAttack: !1,
            ForceCritical: !1,
            IsBlocked: !1,
            IsReaction: !1,
            PartId: -1,
            ExtraRate: a,
            Accumulation: 0,
            RandomSeed: ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed()
        }, this.aqr(t), this.ProcessDamage(o, t, r))
    }
    ProcessDamage(e, t, a) {
        if (ModManager_1.ModManager.Settings.AlwaysCrit && (t.ForceCritical = !0), this.Xte.HasTag(1918148596) && 0 === t.DamageData.ImmuneType) return {
            DamageResult: 0,
            ToughResult: 0
        };
        var r = t.Attacker;
        0 < e.SkillId && (i = r.tRr.GetSkillInfo(e.SkillId)?.SkillGenre, e.SkillGenre = i), e.DamageGenre = t.DamageData.Type, e.CalculateType = t.DamageData.CalculateType;
        const o = this._qr(r);
        var i = this.GetLocalDamage(e, t, o);
        let n;
        return 0 <= t.PartId && (n = this.Entity.GetComponent(60)?.GetPartByIndex(t.PartId)), r = (5 === e.SkillGenre?this.GetExtraToughRate("ToughRateOnCounter") : this.GetExtraToughRate("ToughRate")) / CharacterAttributeTypes_1.PER_TEN_THOUSAND, this.GetServerDamage(t, e, (a => {
            this.Entity?.Valid && t.Attacker?.Entity?.Valid && (this.uqr(a, t, e), this.cqr(a, t, e, o), n?.OnDamage(a.Damage, t.ForceCritical, t.Attacker.Entity, !1))
        }), a), a = this.mqr(t, o, r), {
            DamageResult: i.Damage,
            ToughResult: a
        }
    }
    static OnDamageExecuteNotify(e, t) {
        ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t.gVn))?.Entity?.GetComponent(18)?.ProcessRemoteDamage(t)
    }
    ProcessRemoteDamage(e) {
        var t, a = e.Rjn ?? {},
            r = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.xjn)),
            o = DamageById_1.configDamageById.GetConfig(MathUtils_1.MathUtils.LongToBigInt(e.Pjn)),
            i = r?.Entity?.GetComponent(18);
        o && r && i?(r = {
            ...e,
            ShieldCoverDamage: e.tAs,
            DamageData: o,
            Damage: -e.zDs,
            IsCounterAttack: !1,
            IsReaction: !1,
            IsCritical: e.ZDs,
            IsTargetKilled: e.eAs,
            IsBlocked: !1,
            SourceType: a.Bjn ?? Protocol_1.Aki.Protocol.VAs.Proto_FromEffect,
            IsImmune: e.iAs === Protocol_1.Aki.Protocol.P4s.Proto_EDamageImmune_BuffEffectElement
        }, (t = new ExtraEffectBaseTypes_1.RequirementPayload).BulletId = MathUtils_1.MathUtils.LongToBigInt(a.ujn ?? -1), t.SkillId = a.X4n, t.BulletTags = [...a.wjn ?? []], t.PartId = e.bjn, t.DamageGenre = o.Type, t.CalculateType = o.CalculateType, t.IsTargetKilled = r.IsTargetKilled, 0 < t.SkillId && (t.SkillGenre = i.tRr.GetSkillInfo(t.SkillId)?.SkillGenre ?? -1), 0 <= t.PartId && (a = this.Entity.GetComponent(60), t.PartTag = a?.GetPartByIndex(t.PartId).PartTag?.TagId), t.IsCritical = ModManager_1.ModManager.Settings.AlwaysCrit?1 : r.IsCritical, t.IsImmune = r.IsImmune, o = this.ActorComponent.ActorLocation, this.uqr(r, {
            Attacker: i,
            HitPosition: o
        }, t), this.dqr(r, i, t)) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "Error when process remote damage: Unexpected damageId or invalid target/attacker.", ["DamageId", e.Pjn], ["attackerCreatureId", e.xjn], ["targetCreatureId", e.gVn])
    }
    _qr(e) {
        var t = e.Ybr.GetAttributeHolder().CheckGetComponent(158).TakeSnapshot(),
            a = this.Ybr.GetAttributeHolder().CheckGetComponent(158).TakeSnapshot();
        return {
            Attacker: this.Cqr(e),
            AttackerSnapshot: t,
            Target: this,
            TargetSnapshot: a
        }
    }
    Cqr(e) {
        return GameplayAbilityVisionControl_1.GameplayAbilityVisionControl.VisionControlHandle && e.u1t.SummonType === Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantPhantomRole?ModelManager_1.ModelManager.CreatureModel.GetEntity(e.u1t.GetSummonerId()).Entity?.GetComponent(18) : e
    }
    gqr(e, t, a, r, o) {
        var i, n = e.DamageData,
            l = e.SkillLevel,
            s = AbilityUtils_1.AbilityUtils.GetLevelValue(n.RateLv, l, 0),
            m = e.ExtraRate;
        if (e.IsReaction) return (i = DamagePayloadById_1.configDamagePayloadById.GetConfig(n.PayloadId))?CharacterDamageCalculations_1.Calculation.ReactionDamageRateCalculation(t.AttackerSnapshot, t.TargetSnapshot, s, n.Element, i, t.AttackerSnapshot.CurrentValues.Proto_ReactionEfficiency, a) : (Log_1.Log.CheckError() && Log_1.Log.Error("Character", 20, "找不到结算参数表对应id", ["id", n.PayloadId]), 0);
        let g = 1;
        return s = this.Entity.GetComponent(0), ModelManager_1.ModelManager.GameModeModel.IsMulti && s.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Monster && (g = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2?CommonParamById_1.configCommonParamById.GetFloatConfig("MutiWorldDamageRatio2") : CommonParamById_1.configCommonParamById.GetFloatConfig("MutiWorldDamageRatio3")), CharacterDamageCalculations_1.Calculation.CalculateFormula(e, t, n, l, a, m, r, o, g)
    }
    yQo(e, t) {
        var a = e.DamageData,
            r = e.SkillLevel,
            o = e.ExtraRate;
        let i = 1;
        var n = this.Entity.GetComponent(0);
        return ModelManager_1.ModelManager.GameModeModel.IsMulti && n.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Monster && (i = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2?CommonParamById_1.configCommonParamById.GetFloatConfig("MutiWorldDamageRatio2") : CommonParamById_1.configCommonParamById.GetFloatConfig("MutiWorldDamageRatio3")), CharacterDamageCalculations_1.Calculation.CalculateFormula(e, t, a, r, !1, o, 0, 0, i)
    }
    fqr(e, t, a) {
        var r = t.DamageData,
            o = a.Attacker.Jbr?.GetWeaponType() ?? ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS;
        e.PartialAssign({
            SmashType: r.SmashType,
            ElementType: r.Element,
            WeaponType: o
        }), this.vqr(e, t, a), ExtraEffectSnapModifier_1.SnapModifier.PreCriticalModify(e, a), r = this.JudgeCritical(t, a.AttackerSnapshot);
        return ExtraEffectSnapModifier_1.SnapModifier.PostCriticalModify(e, a), r
    }
    JudgeCritical(e, t) {
        switch (e.DamageData.CalculateType) {
            case 1:
            case 2:
                return !1
        }
        return !!e.ForceCritical || (e.RandomSeed = RandomSystem_1.default.GetNextRandomSeed(e.RandomSeed, 2), Math.abs(e.RandomSeed % CharacterAttributeTypes_1.PER_TEN_THOUSAND) <= t.CurrentValues.Proto_Crit)
    }
    vqr(e, t, a) {
        t.IsCounterAttack && (a.Attacker.m1t.TriggerEvents(11, a.Target.m1t, e), this.m1t.TriggerEvents(12, a.Attacker.m1t, e))
    }
    GetLocalDamage(e, t, a) {
        return 1 === t.DamageData.CalculateType?this.GetLocalHeal(e, t, a) : this.GetLocalHurt(e, t, a)
    }
    GetLocalHurt(e, t, a) {
        var r = this.fqr(e, t, a),
            o = ExtraEffectDamageAugment_1.DamageAugment.ApplyEffects(e, a),
            i = ExtraEffectSnapModifier_1.DamageAmplifyOnHit.ApplyEffects(e, a) + ExtraEffectSnapModifier_1.DamageAmplifyOnBeHit.ApplyEffects(e, a);
        let n = this.gqr(t, a, r, o, i);
        n = (o = ExtraEffectDamageModifier_1.DamageModifier.ApplyEffects(e, a)).IsSuccessful?o.Result : n;
        let l = !1;
        return ExtraEffectDamageImmune_1.DamageImmune.ApplyEffects(e, t, a) && (l = !0, n = 0), i = {
            ...t,
            Damage: n,
            ShieldCoverDamage: 0,
            IsCritical: !!ModManager_1.ModManager.Settings.AlwaysCrit || r,
            IsTargetKilled: !1,
            IsImmune: l
        }, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "本地伤害计算", ["伤害值", i.Damage], ["结算id", t.DamageData.Id], ["是否弹刀", t.IsCounterAttack], ["弹刀对应技能MessageId", t.CounterSkillMessageId]), i
    }
    GetLocalHeal(e, t, a) {
        return this.fqr(e, t, a), e = this.yQo(t, a), a = {
            ...t,
            Damage: e,
            ShieldCoverDamage: 0,
            IsCritical: !1,
            IsTargetKilled: !1,
            IsImmune: !1
        }, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "本地治疗计算", ["damage", a.Damage]), a
    }
    GetServerDamage(e, t, a, r) {
        var o = e.Attacker;
        const i = e.DamageData,
            n = Protocol_1.Aki.Protocol.M3n.create({
                Pjn: MathUtils_1.MathUtils.BigIntToLong(i.Id),
                qjn: e.SkillLevel,
                xjn: MathUtils_1.MathUtils.NumberToLong(o.Entity.GetComponent(0).GetCreatureDataId()),
                gVn: MathUtils_1.MathUtils.NumberToLong(this.Entity.GetComponent(0).GetCreatureDataId()),
                Gjn: e.IsAddEnergy,
                Ojn: e.IsCounterAttack,
                Njn: !!ModManager_1.ModManager.Settings.AlwaysCrit || e.ForceCritical,
                kjn: e.IsBlocked,
                bjn: e.PartId,
                Fjn: e.CounterSkillMessageId?MathUtils_1.MathUtils.BigIntToLong(e.CounterSkillMessageId) : 0,
                Rjn: {
                    Bjn: e.SourceType,
                    ujn: MathUtils_1.MathUtils.BigIntToLong(t.BulletId ?? BigInt(-1)),
                    wjn: t.BulletTags.filter((e => void 0 !== e)),
                    X4n: t.SkillId
                },
                eHn: ModelManager_1.ModelManager.PlayerInfoModel.AdvanceRandomSeed(0)
            });
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "伤害Request", ["攻击方", MathUtils_1.MathUtils.LongToBigInt(n.xjn)], ["受击方", MathUtils_1.MathUtils.LongToBigInt(n.gVn)], ["结算id", MathUtils_1.MathUtils.LongToBigInt(n.Pjn)], ["isBlocked", n.kjn], ["skillLevel", n.qjn], ["是否弹刀", n.Ojn], ["部位Id", n.bjn], ["弹刀对应技能MessageId", e.CounterSkillMessageId], ["RandomSeed", n.eHn]),
        CombatMessage_1.CombatNet.Call(26217, this.Entity, n, (r => {
            var o;
            r && r.iAs !== Protocol_1.Aki.Protocol.P4s.Proto_EDamageImmune_Invincible && (o = {
                ...e,
                Damage: -r.zDs,
                ShieldCoverDamage: r.tAs,
                IsCritical: r.ZDs,
                IsTargetKilled: r.eAs,
                IsImmune: r.iAs === Protocol_1.Aki.Protocol.P4s.Proto_EDamageImmune_BuffEffectElement
            }, t.IsCritical = ModManager_1.ModManager.Settings.AlwaysCrit?1 : o.IsCritical, t.IsImmune = o.IsImmune, t.IsTargetKilled = o.IsTargetKilled, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "伤害Response", ["攻击方", MathUtils_1.MathUtils.LongToBigInt(n.xjn)], ["受击方", MathUtils_1.MathUtils.LongToBigInt(n.gVn)], ["结算id", i.Id], ["伤害值", o.Damage], ["killed", o.IsTargetKilled], ["errorCode", r.O4n]), 0 === r.O4n) && a(o)
        }), r, void 0)
    }
    cqr(e, t, a, r) {
        this.Mqr(t, r), this.dqr(e, t.Attacker, a)
    }
    uqr(e, t, a) {
        var r = t.Attacker.Entity,
            o = this.Entity,
            i = e.Damage,
            n = e.DamageData;
        i = [r, o, i, n, a, e, t.HitPosition];
        1 === n.CalculateType && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FormationPanelUIShowRoleHeal, o), SceneTeamController_1.SceneTeamController.EmitEvent(o, EventDefine_1.EEventName.CharBeDamage, ...i), SceneTeamController_1.SceneTeamController.EmitEvent(r, EventDefine_1.EEventName.CharDamage, ...i), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GlobalCharDamage, ...i)
    }
    dqr(e, t, a) {
        var r = t.m1t;
        e.SourceType !== Protocol_1.Aki.Protocol.VAs.Proto_FromEffect && (t?.m1t.TriggerEvents(0, this.m1t, a), this.m1t.TriggerEvents(1, r, a)), e.IsTargetKilled && t?.m1t.TriggerEvents(6, r, a), ExtraEffectDamageAccumulation_1.DamageAccumulation.ApplyEffects(e, a, t, this)
    }
    Mqr(e, t) {
        var a = e.Attacker?.$te;
        if (a && e.IsAddEnergy) {
            var r, o, i = e.SkillLevel;
            e = e.DamageData;
            for ([r, o] of [e.SpecialEnergy1, e.SpecialEnergy2, e.SpecialEnergy3, e.SpecialEnergy4].entries()) {
                var n = CharacterAttributeTypes_1.specialEnergyIds[r],
                    l = AbilityUtils_1.AbilityUtils.GetLevelValue(o, i, 0);
                if (ModManager_1.ModManager.Settings.NoCD) {
                    var s = EntityManager_1.EntityManager.GetPlayerBluePrint();
                    s && s.includes("Yinlin")?a.AddBaseValue(n, 1e4) : s && s.includes("Sanhua")?a.AddBaseValue(n, 52) : a.AddBaseValue(n, CharacterAttributeTypes_1.attributeIdsWithMax.get(n))
                } else a.AddBaseValue(n, l)
            }
        }
    }
    mqr(e, t, a = 1) {
        var r = e.Attacker,
            o = t.AttackerSnapshot;
        t = t.TargetSnapshot, e = AbilityUtils_1.AbilityUtils.GetLevelValue(e.DamageData.ToughLv, e.SkillLevel, 0);
        if (0 !== (o = CharacterDamageCalculations_1.Calculation.ToughCalculation(o, t, e * a))) {
            let t = 1;
            e = this.Entity.GetComponent(0), ModelManager_1.ModelManager.GameModeModel.IsMulti && e.IsMonster() && (t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2?CommonParamById_1.configCommonParamById.GetFloatConfig("MutiWorldToughRatio2") : CommonParamById_1.configCommonParamById.GetFloatConfig("MutiWorldToughRatio3")), this.$te.AddBaseValue(CharacterAttributeTypes_1.EAttributeId.Proto_Tough, -o * t)
        }
        return 0 < this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Tough)?0 < t.CurrentValues.Proto_ToughRecoverDelayTime && 0 !== o && this.m1t.AddBuff(CharacterBuffIds_1.buffId.ToughRecoverDelay, {
            InstigatorId: r.u1t?.GetCreatureDataId() ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
            ApplyType: CharacterAbilityComponent_1.EBuffApplyType.Proto_UseExtraTime,
            Reason: "韧性扣减后触发"
        }) : !this.Xte.HasTag(-1112841587) && 0 < t.CurrentValues.Proto_WeakTime && (this.Uqr(!0), a = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_WeakTime), this.Zbr = TimerSystem_1.TimerSystem.Delay((() => {
            this.Xte && (this.Xte.HasTag(31862857)?this.Aqr() : this.Uqr(!1)), this.Zbr = void 0
        }), a), this.$te.SetBaseValue(CharacterAttributeTypes_1.EAttributeId.Proto_ToughRecover, 0)), o
    }
    Uqr(e) {
        e?this.Xte.AddTag(-1112841587) : (this.Xte.RemoveTag(-1112841587), this.zbr?.EndTask());
        var t = Protocol_1.Aki.Protocol.g4n.create();
        t.P4n = this.Entity.GetComponent(0).GetCreatureDataId(), t.$4n = e, CombatMessage_1.CombatNet.Call(16858, this.Entity, t, (e => {
            e && e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs && (this.Zbr && (TimerSystem_1.TimerSystem.Remove(this.Zbr), this.Zbr = void 0), this.Xte.RemoveTag(-1112841587))
        }))
    }
    Aqr() {
        this.zbr = this.Xte.ListenForTagAddOrRemove(40422668, (() => {
            this.Uqr(!1)
        }))
    }
    TryExitWeakTime() {
        this.Xte.HasTag(-1112841587) && (this.Zbr && (TimerSystem_1.TimerSystem.Remove(this.Zbr), this.Zbr = void 0), this.Uqr(!1))
    }
    rqr() {
        this.zbr && (this.zbr.EndTask(), this.zbr = void 0)
    }
    aqr(e) {
        var t = e.Attacker.Jbr?.GetSkillLevelByDamageId(e.DamageData.Id),
            a = e.Attacker.Entity.GetComponent(35)?.GetVisionLevelByDamageId(e.DamageData.Id);
        t && 0 < t?e.SkillLevel = t : a && 0 < a && (e.SkillLevel = a)
    }
    AddToughModifier(e, t) {
        this.iqr.has(e) || this.iqr.set(e, new Map), (e = this.iqr.get(e)).set(t, 1 + (e.get(t) ?? 0))
    }
    RemoveToughModifier(e, t) {
        var a;
        (e = this.iqr.get(e)) && (1 <= (a = e.get(t))?e.set(t, a - 1) : e.delete(t))
    }
    GetExtraToughRate(e) {
        var t, a;
        if (!(e = this.iqr.get(e))) return CharacterAttributeTypes_1.PER_TEN_THOUSAND;
        let r = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
        for ([t, a] of e.entries()) 0 < a && (r *= Math.pow(t / CharacterAttributeTypes_1.PER_TEN_THOUSAND, a));
        return r
    }
    FallInjure() {
        var e, t, a, r;
        this.Xte.HasTag(1918148596) || !this.HBr.IsInGame || ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure || this.Xte.HasTag(560942831) || (e = this.ActorComponent.Actor.CharacterMovement.GetLastUpdateVelocity().Z, a = this.ActorComponent.ActorVelocityProxy.Z, r = this.Pqr(), -e < this.eqr && (this.tqr = 0), t = this.tqr?Time_1.Time.WorldTimeSeconds - this.tqr : 0, (a = Math.ceil(this.xqr(-e, -a, r, t))) <= 0) || (r = this.u1t.GetCreatureDataId(), this.Entity.GetComponent(59).CollectSampleAndSend(), ControllerHolder_1.ControllerHolder.CreatureController.LandingDamageRequest(r, e, t * CommonDefine_1.MILLIONSECOND_PER_SECOND), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnFallInjure, a, !1), this.m1t?.RemoveBuffByEffectType(36, "跌落伤害移除冰冻buff"), this.$br.NeedCalculateFallInjure = !1)
    }
    xqr(e, t, a, r) {
        let o = 0;
        var i = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.e5n);
        return (o = this.u1t.IsRealMonster()?CharacterDamageCalculations_1.Calculation.LandingDamageCalculationMonster(a, i) : CharacterDamageCalculations_1.Calculation.LandingDamageCalculationRole(e, t, r, i)) <= 0?0 : o
    }
    Pqr() {
        var e, t;
        return this.$br.NeedCalculateFallInjure && (e = this.$br.BeHitLocation.Z, (t = this.ActorComponent.ActorLocationProxy.Z) < e)?e - t : 0
    }
    oqr() {
        return CommonParamById_1.configCommonParamById.GetIntArrayConfig("landing_damage_args_role")[1]
    }
};
CharacterDamageComponent.nqr = void 0, CharacterDamageComponent.sqr = void 0, CharacterDamageComponent.hqr = void 0, CharacterDamageComponent.lqr = void 0, CharacterDamageComponent.pqr = void 0, CharacterDamageComponent.Eqr = void 0, CharacterDamageComponent.Sqr = void 0, CharacterDamageComponent.yqr = void 0, CharacterDamageComponent.Iqr = void 0, CharacterDamageComponent.Tqr = void 0, CharacterDamageComponent.Lqr = void 0, CharacterDamageComponent.Dqr = void 0, CharacterDamageComponent.Rqr = void 0, __decorate([CombatMessage_1.CombatNet.Listen("mFn", !1)], CharacterDamageComponent, "OnDamageExecuteNotify", null), CharacterDamageComponent = CharacterDamageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(18)], CharacterDamageComponent), exports.CharacterDamageComponent = CharacterDamageComponent;
"use strict";
var SceneItemHitComponent_1, __decorate = this && this.__decorate || function (t, e, i, n) {
    var o, a = arguments.length,
        r = a < 3?e : null === n?n = Object.getOwnPropertyDescriptor(e, i) : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, n);
    else
        for (var l = t.length - 1; 0 <= l; l--)(o = t[l]) && (r = (a < 3?o(r) : 3 < a?o(e, i, r) : o(e, i)) || r);
    return 3 < a && r && Object.defineProperty(e, i, r), r
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SceneItemHitComponent = void 0;
const UE = require("ue"),
    EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
    EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
    RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
    Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
    Vector_1 = require("../../../Core/Utils/Math/Vector"),
    StringUtils_1 = require("../../../Core/Utils/StringUtils"),
    IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
    EventDefine_1 = require("../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../Common/Event/EventSystem"),
    LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
    ConfigManager_1 = require("../../Manager/ConfigManager"),
    ModelManager_1 = require("../../Manager/ModelManager"),
    SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
    BulletCollisionUtil_1 = require("../Bullet/BulletStaticMethod/BulletCollisionUtil"),
    BulletUtil_1 = require("../Bullet/BulletUtil"),
    AimPartUtils_1 = require("../Common/AimPartUtils"),
    ModManager_1 = require("../../Manager/ModManager"),
    SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
class ComponentHitReg {
    constructor() {
        this.ComponentHitConditionCheck = [], this.ComponentHitBaseConfig = void 0
    }
}
let SceneItemHitComponent = SceneItemHitComponent_1 = class extends EntityComponent_1.EntityComponent {
    constructor() {
        super(...arguments), this.inn = void 0, this.Hte = void 0, this.Ifn = void 0, this.Tfn = new Array, this.Lfn = new Map, this.Dfn = void 0, this.Rfn = void 0, this.Ufn = void 0, this.Afn = Rotator_1.Rotator.Create(), this.w0n = 0, this.AimParts = new Array, this.Vsa = void 0, this.kpa = void 0, this.Hsa = t => SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchPlayerAttack({
            Type: IComponent_1.EHitBulletType.PlayerAttack
        }, t, this.Entity), this.jsa = t => SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchFixedBulletId(this.Vsa, t, this.Entity)
    }
    OnStart() {
        this.inn = this.Entity.GetComponent(180), this.Ifn = this.Entity.GetComponent(117), this.Hte = this.Entity.GetComponent(185), this.w0n = this.Entity.GetComponent(0).GetEntityOnlineInteractType();
        var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.Hte?.CreatureData.GetPbDataId());
        return t && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "HitComponent")) && (this.kpa = t), !0
    }
    OnActivate() {
        if (this.kpa) {
            switch (this.kpa.HitBullet?.Type) {
                case IComponent_1.EHitBulletType.PlayerAttack:
                    this.AddHitCondition(this.Hsa);
                    break;
                case IComponent_1.EHitBulletType.FixedBulletId:
                    this.Vsa = this.kpa.HitBullet, this.AddHitCondition(this.jsa)
            }
            if (this.kpa.AimParts && this.Hte)
                for (const e of this.kpa.AimParts) {
                    var t = new AimPartUtils_1.AimPart(this.Hte);
                    t.InitSceneItem(e), this.AimParts.push(t)
                }
            this.kpa?.AttackerHitTimeScaleRatio && (this.Dfn = this.kpa.AttackerHitTimeScaleRatio), this.kpa?.VictimHitTimeScaleRatio && (this.Rfn = this.kpa.VictimHitTimeScaleRatio)
        }
    }
    Pfn(t) {
        if (this.inn.HasTag(-1431780499)) return !1;
        if (this.Ifn?.IsLocked) return !1;
        if (this.Entity.GetComponent(0)?.IsConcealed) return !1;
        let e = !0;
        if (0 < this.Tfn.length)
            for (const i of this.Tfn)
                if (!(e &&= i(t))) break;
        return e
    }
    xfn(t, e) {
        if (t = this.Lfn.get(t)?.ComponentHitConditionCheck, void 0 === t) return !0;
        let i = !0;
        if (0 < t.length)
            for (const n of t)
                if (!(i &&= n(e))) break;
        return i
    }
    wfn(t, e) {
        return t = this.Lfn.get(t)?.ComponentHitBaseConfig?.HitBullet, !t || SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(t, e, this.Entity)
    }
    OnSceneItemHitOne(t, e) {
        if (EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitAlways, t), !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.w0n, !1)) return !1;
        var i = EntitySystem_1.EntitySystem.Get(t.BulletEntityId)?.GetBulletInfo();
        if (i) {
            if (this.Entity.GetComponent(148)?.ReboundBullet(t, i)) return !1;
            if (0 !== t.CalculateType) return t.ReBulletData.TimeScale.TimeScaleOnHit && this.Ofn(t), !1;
            if (this.Pfn(t)) {
                for (var [n] of (this.WVr(t), this.Bfn(t, e), this.bfn(t), this.iwr(t), this.Lfn)) this.wfn(n, t) && this.xfn(n, t) && this.qfn(n, t);
                EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHit), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAnySceneItemEntityHit, this.Entity)
            } else this.WVr(t)
        } else this.WVr(t);
        return !0
    }
    OnSceneItemHit(t, e) {
        if (!0 === ModManager_1.ModManager.Settings.HitMultiplier)
            for (let i = 0; i < ModManager_1.ModManager.Settings.HitMultiplier; i++) this.OnSceneItemHitOne(t, e);
        else this.OnSceneItemHitOne(t, e)
    }
    GetPenetrationType() {
        return this.Entity.GetComponent(0).GetBaseInfo().Category.BulletPenetrationType
    }
    WVr(t) {
        var e, i = t.ReBulletData.Render.EffectOnHit.get(4);
        i && 0 !== i.length && (e = new UE.Transform(t.HitEffectRotation.ToUeRotator(), t.HitPosition.ToUeVector(), Vector_1.Vector.OneVector), BulletCollisionUtil_1.BulletCollisionUtil.PlaySceneItemHitEffect(t.Attacker, i, e, t.ReBulletData.Render.AudioOnHit))
    }
    Bfn(t, e) {
        var i = this.Entity.GetComponent(180);
        if (i) {
            var n = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorsNum(this.Hte.GetSceneInteractionLevelHandleId());
            let o;
            n && 0 < n?1 === e.ValidProcessIndex && (o = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorTag(this.Hte.GetSceneInteractionLevelHandleId(), e.Actor)?.TagId) : (e = (n = EntitySystem_1.EntitySystem.Get(t.BulletEntityId).GetBulletInfo()).BulletDataMain.Base.BeHitEffect, t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(n.Attacker, e), BulletUtil_1.BulletUtil.GetHitRotator(n, this.Hte, this.Afn), e = BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(this.Hte, t?.被击动作, this.Afn.Yaw), o = this.Gfn(e)), void 0 !== this.Ufn && (i.RemoveTag(this.Ufn), this.Ufn = void 0), void 0 !== o && (i.AddTag(o), this.Ufn = o)
        }
    }
    bfn(t) {
        var e = t.ReBulletData.Base.BeHitEffect;
        (e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(t.Attacker, e)) && this.Hte.UpdateHitInfo(t.HitPosition, e.地面受击速度)
    }
    qfn(t, e) {
        t?.Valid && (EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnSceneItemHit), EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnSceneItemHitByHitData, e))
    }
    iwr(t) {
        this.Nfn(t), this.Ofn(t)
    }
    Nfn(t) {
        var e, i = t.ReBulletData.TimeScale,
            n = i.TimeScaleOnAttack,
            o = this.Dfn?.ValueRatio ?? 1,
            a = this.Dfn?.TimeRatio ?? 1,
            r = this.Dfn?.MaxExtraTime ?? 0;
        i.TimeScaleOnAttackIgnoreAttacker?0 < n.时间膨胀时长 && (e = EntitySystem_1.EntitySystem.Get(t.BulletEntityId).GetBulletInfo(), BulletUtil_1.BulletUtil.SetTimeScale(e, n.优先级, n.时间膨胀值 * o, n.时间膨胀变化曲线, Math.min(n.时间膨胀时长 * a, n.时间膨胀时长 + r), 1)) : 0 < n.时间膨胀时长 && (t.Attacker.GetComponent(109)?.SetTimeScale(n.优先级 - 1, n.时间膨胀值 * o, n.时间膨胀变化曲线, Math.min(n.时间膨胀时长 * a, n.时间膨胀时长 + r), 1), e = i.CharacterCustomKeyTimeScale, StringUtils_1.StringUtils.IsEmpty(e) || (i = ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(t.Attacker.Id, e, t.BulletId.toString())) && EntitySystem_1.EntitySystem.Get(i)?.GetComponent(109)?.SetTimeScale(n.优先级, n.时间膨胀值 * o, n.时间膨胀变化曲线, Math.min(n.时间膨胀时长 * a, n.时间膨胀时长 + r), 1))
    }
    Ofn(t) {
        var e, i, n, o, a, r;
        t.ReBulletData.Base.ContinuesCollision || (e = this.Entity.GetComponent(109)) && (n = (i = t.ReBulletData.TimeScale).TimeScaleOnHit, o = this.Rfn?.ValueRatio ?? 1, a = this.Rfn?.TimeRatio ?? 1, r = this.Rfn?.MaxExtraTime ?? 0, 0 < n.时间膨胀时长) && BulletUtil_1.BulletUtil.SetVictimTimeScale(t.BulletEntityId, this.Entity.Id, e, n.优先级, n.时间膨胀值 * o, n.时间膨胀变化曲线, Math.min(n.时间膨胀时长 * a, n.时间膨胀时长 + r), 2, i.RemoveHitTimeScaleOnDestroy)
    }
    AddHitCondition(t) {
        this.Tfn.push(t)
    }
    RemoveHitCondition(t) {
        -1 !== (t = this.Tfn.indexOf(t)) && this.Tfn.splice(t, 1)
    }
    RegisterComponent(t, e) {
        var i;
        this.Lfn.has(t) || ((i = new ComponentHitReg).ComponentHitBaseConfig = e, this.Lfn.set(t, i), e && (this.kpa = e))
    }
    AddComponentHitCondition(t, e) {
        var i;
        this.Lfn.has(t) || (i = new ComponentHitReg, this.Lfn.set(t, i)), this.Lfn.get(t).ComponentHitConditionCheck.push(e)
    }
    RemoveComponentHitCondition(t, e) {
        t = this.Lfn.get(t)?.ComponentHitConditionCheck, void 0 !== t && -1 !== (e = t.indexOf(e)) && t.splice(e, 1)
    }
    Gfn(t) {
        return SceneItemHitComponent_1.kfn.get(t)
    }
};
SceneItemHitComponent.kfn = new Map([
    [8, 631236362],
    [1, -40693742],
    [9, 1688432695],
    [0, 178446985],
    [10, -1474770640],
    [3, -1876401816],
    [11, -350051159],
    [2, -2061161961]
]), SceneItemHitComponent = SceneItemHitComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(140)], SceneItemHitComponent), exports.SceneItemHitComponent = SceneItemHitComponent;
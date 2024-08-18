"use strict";
var __decorate = this && this.__decorate || function (e, t, n, i) {
    var r, a = arguments.length,
        o = a < 3?t : null === i?i = Object.getOwnPropertyDescriptor(t, n) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, n, i);
    else
        for (var h = e.length - 1; 0 <= h; h--)(r = e[h]) && (o = (a < 3?r(o) : 3 < a?r(t, n, o) : r(t, n)) || o);
    return 3 < a && o && Object.defineProperty(t, n, o), o
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PawnPerceptionComponent = void 0;
const cpp_1 = require("cpp"),
    UE = require("ue"),
    Log_1 = require("../../../../Core/Common/Log"),
    EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
    RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
    EventDefine_1 = require("../../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../../Common/Event/EventSystem"),
    ModManager_1 = require("../../../Manager/ModManager"),
    Range = 1e50,
    DISTANCE_OFFSET = 100,
    INTERACT_LOGIC_OFFSET = 100;
let PawnPerceptionComponent = class extends EntityComponent_1.EntityComponent {
    constructor() {
        super(...arguments), this.Can = void 0, this.vhn = !1, this.Mhn = !1, this.Ehn = !1, this.NearbyEnable = !1, this.Shn = !1, this.yhn = void 0, this.rzr = void 0, this.ConfigId = -0, this.Ihn = void 0, this.Thn = void 0, this.Lhn = void 0, this.Dhn = void 0, this.vzr = () => {
            this.Shn && (this.Shn = !1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveNearbyTrackRange, this.Entity))
        }, this.Rhn = e => {
            this.NearbyEnable = e, this.Shn = !1
        }
    }
    get IsInInteractRange() {
        return !!ModManager_1.ModManager.Settings.PerceptionRange || this.vhn
    }
    get IsInAdsorbRange() {
        return !!ModManager_1.ModManager.Settings.PerceptionRange || this.Mhn
    }
    get IsInSightRange() {
        return !!ModManager_1.ModManager.Settings.PerceptionRange || this.Ehn
    }
    SetInteractRange(e, t = 0, n = void 0) {
        this.rzr.SetLogicRange(Math.max(e + 100, t)), this.Ihn?this.Ihn.UpdateDistance(e, 0 === t?e : t) : (this.Ihn = this.rzr.CreatePerceptionEvent(), this.Ihn.Init(e, this.Entity?.GameBudgetManagedToken, (() => {
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("Interaction", 37, "进入交互范围", ["EntityId", this.Entity.Id]), this.vhn = !0
        }), (() => {
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("Interaction", 37, "离开交互范围", ["EntityId", this.Entity.Id]), this.vhn = !1
        }), void 0, void 0, t, n))
    }
    SetSightRange(e) {
        this.rzr.SetLogicRange(e), this.Thn?this.Thn.UpdateDistance(e) : (this.Thn = this.rzr.CreatePerceptionEvent(), this.Thn.Init(e, this.Entity?.GameBudgetManagedToken, (() => {
            this.Ehn = !0
        }), (() => {
            this.Ehn = !1
        })))
    }
    SetGuideRange(e) {
        this.rzr.SetLogicRange(e), this.Lhn?this.Lhn.UpdateDistance(e) : (this.Lhn = this.rzr.CreatePerceptionEvent(), this.Lhn.Init(e, this.Entity?.GameBudgetManagedToken, (() => {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideRangeEnter, this.Entity.Id)
        })))
    }
    OnInitData() {
        return this.yhn = UE.NewMap(UE.BuiltinInt, UE.BuiltinInt), this.ConfigId = this.Entity.GetComponent(0).GetPbDataId(), !0
    }
    OnInit() {
        return this.rzr = this.Entity.GetComponent(108), !0
    }
    OnStart() {
        var e = this.Entity.GetComponent(0),
            t = (this.Can = this.Entity.GetComponent(1), this.Can.Owner);
        return UE.KismetSystemLibrary.IsValid(t)?(EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnUpdateNearbyEnable, this.Rhn), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("Pawn", 7, "[PawnPerceptionComponent.OnStart] 非法Actor", ["PbDataId", e.GetPbDataId()]), !1)
    }
    OnActivate() {
        var e, t, n = this.Entity.GetComponent(146);
        return n && (e = n.ShowRange, t = n.HideRange, this.NearbyEnable = n.EnableTracking, this.Shn = !1, this.Dhn = this.rzr.CreatePerceptionEvent(), this.Dhn.Init(e, this.Entity?.GameBudgetManagedToken, (() => {
            this.Shn = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterNearbyTrackRange, this.Entity)
        }), (() => {
            this.Shn = !1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveNearbyTrackRange, this.Entity)
        }), void 0, (() => this.NearbyEnable), t), this.rzr.SetLogicRange(e), this.rzr.SetLogicRange(t + 100)), !0
    }
    OnEnd() {
        return this.Shn && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveNearbyTrack, this.Entity), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnUpdateNearbyEnable, this.Rhn), this.Ihn = void 0, this.Thn = void 0, this.Lhn = void 0, this.Dhn = void 0, this.yhn.Empty(), !0
    }
    GetDebugString() {
        let e = "";
        return e += `InteractRangeToken: ${this.Ihn?.EventToken??"undefined"}; IsInRangeInternal: ${this.vhn}\nInteractRangeInfo:\n`, this.Ihn && (e += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(this.Ihn.EventToken)), e
    }
};
PawnPerceptionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(106)], PawnPerceptionComponent), exports.PawnPerceptionComponent = PawnPerceptionComponent;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TrackedMark = void 0;
const puerts_1 = require("puerts"),
    UE = require("ue"),
    Info_1 = require("../../../../Core/Common/Info"),
    Log_1 = require("../../../../Core/Common/Log"),
    CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
    CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
    Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
    TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
    Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
    Vector_1 = require("../../../../Core/Utils/Math/Vector"),
    Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
    EventDefine_1 = require("../../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../../Common/Event/EventSystem"),
    Global_1 = require("../../../Global"),
    GlobalData_1 = require("../../../GlobalData"),
    ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
    ModelManager_1 = require("../../../Manager/ModelManager"),
    UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
    UiLayer_1 = require("../../../Ui/UiLayer"),
    ModManager_1 = require("../../../Manager/ModManager"),
    LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
    GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
    MapDefine_1 = require("../../Map/MapDefine"),
    MapUtil_1 = require("../../Map/MapUtil"),
    LguiUtil_1 = require("../../Util/LguiUtil"),
    BattleUiControl_1 = require("../BattleUiControl"),
    CENTER_Y = 62.5,
    MAX_A = 1176,
    MARGIN_A = 1008,
    MAX_B = 712.5,
    MARGIN_B = 495,
    center = Vector2D_1.Vector2D.Create(0, 62.5),
    RAD_2_DEG = 180 / Math.PI,
    WAVE_COLOR_NEAR = "86FF83",
    WAVE_COLOR_MIDDLE = "FFE683",
    WAVE_COLOR_FAR = "FFFFFF",
    VARNAME_WAVE_CYCLE_TIME = "LifeTime",
    VARNAME_WAVE_NUM_SCALE = "Scale",
    VARNAME_WAVE_COLOR = "Color",
    VARNAME_WAVE_ROTATION = "Rotation",
    DELAY_TIME = 500,
    SUB_SCALE = .8,
    QUEST_TRACK_MARK_INDEX = 999;
class TrackedMark extends UiPanelBase_1.UiPanelBase {
    constructor(t) {
        super(), this.TrackTarget = void 0, this.IsSubTrack = !1, this.pCt = !1, this.xst = "", this.y$e = 0, this.I$e = 0, this.ScreenPositionRef = (0, puerts_1.$ref)(void 0), this.PointTransport = Vector2D_1.Vector2D.Create(1, -1), this.MarkHideDis = 0, this.vCt = 0, this.MCt = 0, this.ECt = 0, this.SCt = void 0, this.IsInTrackRange = !1, this.TempTrackPosition = void 0, this.ScreenPosition = void 0, this.LastScreenPosition = void 0, this.InRange = !1, this.TempRotator = void 0, this.LCt = 0, this.DCt = -1, this.ShouldShowTrackMark = !0, this.RCt = void 0, this.UCt = 0, this.ACt = !1, this.PCt = !1, this.xCt = void 0, this.DirectionComp = void 0, this.BCt = void 0, this.bCt = void 0, this.NiagaraNeedActivateNextTick = !1, this.GCt = -0, this.NCt = -0, this.CurShowTime = -0, this.kCt = -0, this.FCt = !1, this.IsForceHideDirection = !1, this.HCt = !1, this.jCt = !1, this.WCt = 0, this.KCt = 0, this.QCt = 0, this.XCt = 0, this.ilt = () => {
            var t = MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(this.TrackTarget, !0);
            t && BattleUiControl_1.BattleUiControl.FocusToTargetLocation(t)
        }, this.Tct = t => {
            "Start" === t && (this.PCt = !1)
        }, this.$Ct = t => {
            t !== Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest || this.IsInTrackRange || this.YCt()
        }, this.JCt = (t, e, i) => {
            6 === t.Type && t.BtType === Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest && this.YCt()
        }, this.zCt = t => {
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 40, "[TrackedMark] [疑难杂症] 播放点声源特效", ["MarkId", this.MCt], ["EffectDuration", t], ["TrackType", this.WCt], ["UIActiveSelf", this.RootItem?.IsUIActiveSelf()]), 1 !== this.WCt || t <= 0 || this.RootItem.IsUIActiveSelf() && (this.ZCt(), this.GCt = t / CommonDefine_1.MILLIONSECOND_PER_SECOND, this.NCt = 0, this.NiagaraNeedActivateNextTick = !0)
        }, this.YCt = () => {
            var t;
            this.RCt && (t = this.RCt.GetCurrentSequence(), this.jCt?("Start" !== t && this.RCt.PlayLevelSequenceByName("Start"), this.RCt.StopCurrentSequence(!0, !0)) : "Start" !== t && this.BCt.bIsUIActive && (this.CurShowTime = 0, this.RCt.PlayLevelSequenceByName("Start")))
        }, this.egt = (t, e, i, a, r) => {
            t === this.ECt && a === this.MCt && (this.IsInTrackRange = r, this.BCt?.SetUIActive(!r))
        }, GlobalData_1.GlobalData.World && (this.ECt = t.TrackSource, this.xst = t.IconPath, this.vCt = t.ShowGroupId, this.MCt = t.Id, this.MarkHideDis = t.TrackHideDis, this.TrackTarget = t.TrackTarget, this.IsInTrackRange = t.IsInTrackRange ?? !1, this.ACt = t.AutoHideTrack ?? !1, this.kCt = CommonParamById_1.configCommonParamById.GetIntConfig("QuestMarkTrackStayTime") ?? 10, this.UCt = t.Offset?.Z ?? 0, this.GCt = 0, this.NCt = 0, this.NiagaraNeedActivateNextTick = !1, this.IsSubTrack = t.IsSubTrack ?? !1, this.WCt = t.TrackType ?? 0, 1 === this.WCt?(this.FCt = !0, this.IsForceHideDirection = !0, this.jCt = !0, this.HCt = !0, t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.MCt)?.Entity?.GetComponent(146), this.KCt = (t?.AudioPointNearRadius ?? 0) * MapDefine_1.FLOAT_0_01, this.QCt = (t?.AudioPointMiddleRadius ?? 0) * MapDefine_1.FLOAT_0_01, this.XCt = (t?.AudioPointFarRadius ?? 0) * MapDefine_1.FLOAT_0_01) : (this.FCt = !1, this.IsForceHideDirection = !1, this.jCt = !1, this.HCt = !1), this.TempTrackPosition = Vector_1.Vector.Create(), this.ScreenPosition = Vector2D_1.Vector2D.Create(), this.LastScreenPosition = Vector2D_1.Vector2D.Create(), this.TempRotator = Rotator_1.Rotator.Create(), t = UiLayer_1.UiLayer.UiRootItem, this.y$e = Math.min(1176, ((t?.GetWidth() ?? 0) - 1008) / 2), this.I$e = Math.min(712.5, ((t?.GetHeight() ?? 0) - 495) / 2), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt))
    }
    Initialize(t) {
        this.CreateThenShowByResourceIdAsync("UiItem_Mark_Prefab", t, !0)
    }
    CreateMark() {
        this.PCt = !0, this.YCt()
    }
    OnRegisterComponent() {
        this.ComponentRegisterInfos = [
            [0, UE.UISprite],
            [1, UE.UIText],
            [2, UE.UIItem],
            [3, UE.UIButtonComponent],
            [4, UE.UIItem],
            [5, UE.UINiagara],
            [6, UE.UIItem]
        ], this.BtnBindInfo = [
            [3, this.ilt]
        ]
    }
    OnStart() {
        this.xCt = this.GetItem(4), this.DirectionComp = this.GetItem(2), this.BCt = this.GetItem(6), this.xCt.SetUIActive(!this.IsInTrackRange && !this.FCt), this.DirectionComp.SetUIActive(!this.IsInTrackRange && !this.IsForceHideDirection), this.BCt.SetUIActive(!1), this.RCt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.RCt.BindSequenceCloseEvent(this.Tct), this.bCt = this.GetUiNiagara(5), this.bCt.SetUIActive(!1), this.xst && this.SetSpriteByPath(this.xst, this.GetSprite(0), !1), this.BCt.SetUIActive(!this.IsInTrackRange && !this.HCt), 5 === this.ECt && this.RootItem?.SetHierarchyIndex(999), this.CreateMark(), this.OnUiShow()
    }
    OnBeforeDestroy() {
        this.TrackTarget = void 0, this.PointTransport = void 0, this.RCt?.Clear(), this.RCt = void 0, TimerSystem_1.TimerSystem.Has(this.SCt) && TimerSystem_1.TimerSystem.Remove(this.SCt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct)
    }
    OnUiShow() {
        var t;
        1 === this.WCt && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.MCt)) && !EventSystem_1.EventSystem.HasWithTarget(t.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, this.zCt) && EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, this.zCt), this.SCt = TimerSystem_1.TimerSystem.Delay(this.YCt, 500), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct), this.IsSubTrack?this.RootItem?.SetRelativeScale3D(new UE.Vector(.8, .8, .8)) : this.RootItem?.SetRelativeScale3D(new UE.Vector(1, 1, 1))
    }
    OnUiHide() {
        var t;
        1 === this.WCt && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.MCt)) && EventSystem_1.EventSystem.HasWithTarget(t.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, this.zCt) && EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, this.zCt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct)
    }
    UpdateTrackTarget(t) {
        this.TrackTarget = t
    }
    SetVisibleByOccupied(t) {
        this.pCt = t
    }
    UpdateTrackDistance() {
        var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
        t && (MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(this.TrackTarget, !0, this.TempTrackPosition), this.UCt && (this.TempTrackPosition.Z += this.UCt), t = Vector_1.Vector.Distance(t, this.TempTrackPosition) * MapDefine_1.FLOAT_0_01, this.LCt = t, ModelManager_1.ModelManager.TrackModel.UpdateGroupMinDistance(this.vCt, t)), ModManager_1.ModManager.Settings.QuestTp && (ModManager_1.ModManager.Settings.QuestX = this.TempTrackPosition.X, ModManager_1.ModManager.Settings.QuestY = this.TempTrackPosition.Y, ModManager_1.ModManager.Settings.QuestZ = this.TempTrackPosition.Z)
    }
    Update(t) {
        var e;
        GlobalData_1.GlobalData.World?UiLayer_1.UiLayer.UiRootItem?this.RootItem && (this.CurShowTime += t / CommonDefine_1.MILLIONSECOND_PER_SECOND, this.tgt()?(e = this.LCt) < this.MarkHideDis && !this.PCt?(this.RootItem.SetUIActive(!1), 1 === this.WCt && this.ZCt()) : (this.RootItem.SetUIActive(!0), this.UpdatePositionAndRotation(t), !this.InRange || this.IsInTrackRange || this.FCt?this.xCt.SetUIActive(!1) : (e = Math.round(e), this.DCt !== e && (this.DCt = e, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_Meter_Text", this.DCt.toString())), this.xCt.SetUIActive(!0)), 1 === this.WCt && this.ogt(t), this.BCt.SetUIActive(!this.IsInTrackRange && !this.HCt)) : this.RootItem.SetUIActive(!1)) : Log_1.Log.CheckError() && Log_1.Log.Error("Map", 50, "【疑难杂症】标记固定在屏幕中心，RootItem为空") : Log_1.Log.CheckError() && Log_1.Log.Error("Map", 50, "【疑难杂症】标记固定在屏幕中心，GameWorld为空")
    }
    UpdatePositionAndRotation(t) {
        var e, i = Global_1.Global.CharacterController,
            a = this.TempTrackPosition.ToUeVector(),
            r = UE.GameplayStatics.ProjectWorldToScreen(i, a, this.ScreenPositionRef);
        r || ((a = (e = ModelManager_1.ModelManager.CameraModel.CameraTransform).InverseTransformPositionNoScale(a)).X = -a.X, e = e.TransformPositionNoScale(a), UE.GameplayStatics.ProjectWorldToScreen(i, e, this.ScreenPositionRef)), a = (0, puerts_1.$unref)(this.ScreenPositionRef);
        this.ScreenPosition.Set(a.X, a.Y), this.LastScreenPosition.Equals(this.ScreenPosition, 1) && !this.NiagaraNeedActivateNextTick || (this.LastScreenPosition.DeepCopy(this.ScreenPosition), i = ModelManager_1.ModelManager.BattleUiModel, Info_1.Info.IsInTouch() || i.UpdateViewPortSize(), this.ScreenPosition.MultiplyEqual(i.ScreenPositionScale).AdditionEqual(i.ScreenPositionOffset).MultiplyEqual(this.PointTransport), this.InRange = this.ClampToEllipse(this.ScreenPosition, r), e = this.ScreenPosition.AdditionEqual(center), this.RootItem.SetAnchorOffset(e.ToUeVector2D()), this.InRange || this.IsInTrackRange || this.IsForceHideDirection?this.DirectionComp.SetUIActive(!1) : (this.TempRotator.Reset(), this.TempRotator.Yaw = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) * RAD_2_DEG, this.DirectionComp.SetUIRelativeRotation(this.TempRotator.ToUeRotator()), this.DirectionComp.SetUIActive(!0)), this.InRange || 1 !== this.WCt?this.bCt.SetNiagaraVarFloat("Rotation", .25) : (a = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) / (2 * Math.PI), this.bCt.SetNiagaraVarFloat("Rotation", a)))
    }
    MoveTowards(t, e, i) {
        var a = e.X - t.X,
            r = (e = e.Y - t.Y, Math.sqrt(a * a + e * e));
        e = Math.atan2(e, a), a = i * Math.abs(r) / (r + 1);
        return new Vector2D_1.Vector2D(t.X + a * Math.cos(e), t.Y + a * Math.sin(e))
    }
    tgt() {
        return !this.pCt && (!(this.ACt && this.CurShowTime > this.kCt) && (!(!ModelManager_1.ModelManager.TrackModel.CanShowInGroup(this.vCt, this.LCt) || !this.ShouldShowTrackMark) && (!("number" == typeof this.TrackTarget && !ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(this.TrackTarget)) && (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()?!ModelManager_1.ModelManager.GameModeModel.IsMulti && (ModelManager_1.ModelManager.TrackModel.IsTracking(2, this.MCt) || ModelManager_1.ModelManager.TrackModel.IsTracking(4, this.MCt)) : ModelManager_1.ModelManager.TrackModel.IsTracking(this.ECt, this.MCt)))))
    }
    ClampToEllipse(t, e) {
        var i = t.X,
            a = t.Y,
            r = this.y$e,
            o = this.I$e;
        return !!(e && i * i / (r * r) + a * a / (o * o) <= 1) || (e = r * o / Math.sqrt(o * o * i * i + r * r * a * a), t.MultiplyEqual(e), !1)
    }
    ogt(t) {
        1 === this.WCt && (this.bCt.IsUIActiveSelf() || this.NiagaraNeedActivateNextTick) && (this.NiagaraNeedActivateNextTick && (this.NiagaraNeedActivateNextTick = !1, this.bCt.SetNiagaraVarFloat("LifeTime", this.GCt), this.LCt <= this.KCt?(this.bCt.SetNiagaraVarFloat("Scale", 1), this.bCt.SetNiagaraVarLinearColor("Color", new UE.LinearColor(UE.Color.FromHex("86FF83")))) : this.LCt > this.KCt && this.LCt <= this.QCt?(this.bCt.SetNiagaraVarFloat("Scale", 2 / 3), this.bCt.SetNiagaraVarLinearColor("Color", new UE.LinearColor(UE.Color.FromHex("FFE683")))) : this.LCt > this.QCt && this.LCt <= this.XCt && (this.bCt.SetNiagaraVarFloat("Scale", 1 / 3), this.bCt.SetNiagaraVarLinearColor("Color", new UE.LinearColor(UE.Color.FromHex("FFFFFF")))), this.bCt.SetNiagaraUIActive(!0, !1), this.bCt.ActivateSystem(!1)), this.NCt >= this.GCt?this.ZCt() : this.NCt += t / CommonDefine_1.MILLIONSECOND_PER_SECOND)
    }
    ZCt() {
        this.bCt.SetNiagaraUIActive(!1, !0), this.bCt.DeactivateSystem(), this.GCt = 0, this.NCt = 0, this.NiagaraNeedActivateNextTick = !1
    }
}
exports.TrackedMark = TrackedMark;
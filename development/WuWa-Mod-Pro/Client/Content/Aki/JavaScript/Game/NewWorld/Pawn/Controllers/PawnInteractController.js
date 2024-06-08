"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnInteractController = exports.InteractEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  NetDefine_1 = require("../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  Global_1 = require("../../../Global"),
  LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FormationControl_1 = require("../../../Module/Formation/FormationControl"),
  ChildQuestNodeBase_1 = require("../../../Module/GeneralLogicTree/BehaviorNode/ChildQuestNode/ChildQuestNodeBase"),
  GeneralLogicTreeUtil_1 = require("../../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
  TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils"),
  PlotController_1 = require("../../../Module/Plot/PlotController"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
  ModManager_1 = require("../../../Manager/ModManager"),
  DEFAULT_INTERACT_RANGE = 300,
  PROFILE_DETECT_VISIBLE_BLOCK = "PawnInteractController_DetectVisibleBlock",
  DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET = 10,
  EXECUTION_MAX_HEIGHT_DIFF = 50;
class InteractEntity {
  constructor(t) {
    (this.IsAdvice = !1),
      (this.Jh = void 0),
      (this.fte = void 0),
      (this.EntityId = void 0),
      (this.InteractRange = -0),
      (this.qli = 0),
      (this.Teo = -100),
      (this.Leo = -9999),
      (this.DirectOptionInstanceIds = []),
      (this.DirectOptionNames = []),
      (this.Jh = t),
      (this.EntityId = t?.Id),
      (this.IsAdvice = void 0 !== t.GetComponent(0).GetAdviceInfo()),
      (this.fte = t.GetComponent(1)),
      (this.DirectOptionInstanceIds = new Array()),
      (this.DirectOptionNames = new Array());
  }
  get Priority() {
    var t, i;
    return this.Jh
      ? (this.IsAdvice &&
          ((i = this.fte.ActorLocationProxy),
          (t =
            Global_1.Global.BaseCharacter.CharacterActorComponent
              .ActorLocationProxy),
          (i = Vector_1.Vector.Distance(i, t)),
          (this.qli =
            MathCommon_1.MathCommon.Clamp(i / this.InteractRange, 0, 1) *
            this.Teo)),
        this.qli)
      : this.Leo;
  }
  GetEntity() {
    return this.Jh;
  }
}
exports.InteractEntity = InteractEntity;
class PawnInteractController {
  constructor(t) {
    (this.fte = void 0),
      (this.Deo = void 0),
      (this.Reo = void 0),
      (this.Ueo = void 0),
      (this.Aeo = void 0),
      (this.xeo = void 0),
      (this.Peo = void 0),
      (this.weo = ""),
      (this.Beo = (ModManager_1.ModManager.Settings.PerceptionRange)?9e6:300),
      (this.beo = -1),
      (this.SectorRange = void 0),
      (this.LocationOffset = void 0),
      (this.qeo = -0),
      (this.Geo = "Option"),
      (this.IsTurnAround = !1),
      (this.IsTurnRecoveryImmediately = !1),
      (this.IsWaitTurnComplete = !1),
      (this.InteractIcon = "Dialog"),
      (this.PreTalkConfigs = void 0),
      (this.PlayerInteractiveRange = void 0),
      (this.IsPlayerTurnAround = !1),
      (this.XRe = 0),
      (this.Neo = 0),
      (this.Oeo = 0),
      (this.InteractEntity = void 0),
      (this.keo = void 0),
      (this.Feo = Vector_1.Vector.Create()),
      (this.UKt = void 0),
      (this.TempDirectOptionInstances = new Array()),
      (this.PreDirectOptionInstances = new Array()),
      (this.OnInteractionUpdate = void 0),
      (this.OnInteractActionEnd = void 0),
      (this.InteractEntity = new InteractEntity(t.Entity)),
      (this.Deo = t),
      (this.fte = t.Entity.GetComponent(1)),
      this.Heo(),
      // (this.InteractEntity.InteractRange = Math.max(
      //   this.InteractRange,
      //   this.InteractExitRange,
      // ));
      (this.InteractEntity.InteractRange =(ModManager_1.ModManager.Settings.PerceptionRange)?9e6:300);
  }
  e() {
    (this.fte = void 0),
      (this.Deo = void 0),
      (this.Reo = void 0),
      (this.Aeo = void 0),
      (this.xeo = void 0),
      (this.Ueo = void 0),
      (this.keo = void 0),
      (this.Peo = void 0),
      (this.PlayerInteractiveRange = void 0),
      (this.PreTalkConfigs = void 0),
      (this.SectorRange = void 0),
      (this.OnInteractionUpdate = void 0),
      (this.OnInteractActionEnd = void 0);
  }
  get DefaultShowOption() {
    var t = this.GetInteractiveOption();
    return this.HasDynamicOption && "Direct" === t?.DoIntactType && t.TidContent
      ? PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent)
      : PublicUtil_1.PublicUtil.GetConfigTextByKey(this.weo);
  }
  GetInteractType() {
    return this.Geo;
  }
  Heo() {
    var t = this.fte.CreatureData,
      i = t.GetPbEntityInitData();
    if (i) {
      (this.Reo = new Array()),
        (this.Aeo = new Array()),
        (this.xeo = new Array()),
        (this.Ueo = new Array());
      var e = (0, IComponent_1.getComponent)(
        i.ComponentsData,
        "InteractComponent",
      );
      if (e) {
        if (
          ((this.PreTalkConfigs = e.PreFlow),
          e.Range && (this.Beo = e.Range),
          e.ExitRange && (this.beo = e.ExitRange),
          e.SectorRange && (this.SectorRange = e.SectorRange),
          e.SectorRangeFromPlayerToEntity)
        )
          switch (e.SectorRangeFromPlayerToEntity.Type) {
            case IComponent_1.EInteractPlayerDiractionType.LeisureInteraction:
              this.PlayerInteractiveRange = e.SectorRangeFromPlayerToEntity;
              break;
            case IComponent_1.EInteractPlayerDiractionType.Npc:
          }
        if (
          (e.InteractPointOffset &&
            (this.LocationOffset = Vector_1.Vector.Create(
              e.InteractPointOffset.X || 0,
              e.InteractPointOffset.Y,
              e.InteractPointOffset.Z,
            )),
          e.TidContent && (this.weo = e.TidContent),
          (this.Geo = e.DoIntactType),
          e.TurnAroundType)
        ) {
          switch (e.TurnAroundType) {
            case IComponent_1.EInteractTurnAround.FaceEachOther:
            case IComponent_1.EInteractTurnAround
              .FaceEachOtherWithRecoveryImmediately:
              (this.IsTurnAround = !0),
                (this.IsPlayerTurnAround = !0),
                e.IsWaitForTurnAroundComplete && (this.IsWaitTurnComplete = !0);
              break;
            case IComponent_1.EInteractTurnAround.PlayerTurnToInteractor:
              this.IsPlayerTurnAround = !0;
          }
          e.TurnAroundType ===
            IComponent_1.EInteractTurnAround
              .FaceEachOtherWithRecoveryImmediately &&
            (this.IsTurnRecoveryImmediately = !0);
        }
        (this.UKt = e.MatchRoleOption), this.jeo(e);
      } else this.qeo = this.Beo;
      i = t.ComponentDataMap.get("InteractComponent")?.InteractComponent;
      this.Weo(i, e?.RandomInteract, t.GetPbDataId()),
        this.Keo(i),
        i &&
          this.Deo.SetServerLockInteract(
            i.Interacting,
            "Init Interact Controller",
          ),
        this.Qeo();
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Interaction",
          7,
          "[PawnInteractComponent.OnStart] 交互组件初始化失败",
          ["CreatureGenID:", t.GetOwnerId()],
          ["PbDataId:", t.GetPbDataId()],
        );
  }
  Keo(t) {
    if (t?.DynamicInteractInfos)
      for (const r of t.DynamicInteractInfos) {
        var i = ModelManager_1.ModelManager.InteractionModel.GetDynamicConfig(
            r.OptionGuid,
          ),
          e =
            LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
              r.GameCtx,
            );
        this.AddDynamicInteractOption(i, e, r.Text, !1);
      }
  }
  ClearDirectOptions() {
    this.InteractEntity &&
      ((this.InteractEntity.DirectOptionInstanceIds.length = 0),
      (this.InteractEntity.DirectOptionNames.length = 0));
  }
  UpdateDirectOptions(t = !0, i = !1) {
    if (this.Reo && this.fte) {
      var e = this.fte.Owner;
      if (
        e &&
        this.InteractEntity &&
        ((this.TempDirectOptionInstances.length = 0),
        (this.InteractEntity.DirectOptionInstanceIds.length = 0),
        (this.InteractEntity.DirectOptionNames.length = 0),
        !this.HasDynamicOption)
      ) {
        for (const r of this.Reo)
          r.Disabled ||
            "Direct" !== r.DoIntactType ||
            (i && "Flow" !== r.Type.Type) ||
            (1 !== r.CustomOptionType &&
              this.$eo(r) &&
              (this.TempDirectOptionInstances.push(r),
              this.InteractEntity.DirectOptionInstanceIds.push(r.InstanceId),
              this.InteractEntity.DirectOptionNames.push(r.TidContent)));
        if (t) {
          let i = !1;
          if (
            this.PreDirectOptionInstances.length ===
            this.TempDirectOptionInstances.length
          ) {
            for (let t = 0; t < this.TempDirectOptionInstances.length; t++)
              if (
                this.TempDirectOptionInstances[t] !==
                this.PreDirectOptionInstances[t]
              ) {
                i = !0;
                break;
              }
          } else i = !0;
          if (i) {
            TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView(),
              (this.PreDirectOptionInstances.length = 0);
            for (const o of this.TempDirectOptionInstances)
              this.PreDirectOptionInstances.push(o);
          }
        }
      }
    }
  }
  Weo(t, i, e) {
    if (t && t.RandomInteractIndex && t.RandomInteractIndex.length)
      if (i)
        for (const o of t.RandomInteractIndex) {
          var r = i.Options[o].Option,
            r = this.Xeo(r, 2);
          (r.RandomOptionIndex = o), this.Reo.push(r);
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Interaction", 19, "找不到随机交互组件的配置", [
            "实体配置Id",
            e,
          ]);
  }
  jeo(e) {
    if (
      (e.InteractIcon
        ? (this.InteractIcon = e.InteractIcon)
        : e.InteractDefaultIcon
          ? (this.InteractIcon = e.InteractDefaultIcon)
          : (this.InteractIcon = "Dialog"),
      0 < e.Options?.length)
    )
      for (let t = 0, i = e.Options.length; t < i; t++) {
        var r = this.Xeo(e.Options[t], 0);
        this.Reo.push(r);
      }
  }
  Qeo() {
    this.Yeo(),
      this.Jeo(),
      (this.Ueo.length = 0),
      this.OnInteractionUpdate && this.OnInteractionUpdate(),
      this.Deo && this.Deo.UpdateInteractRange();
  }
  IsInSectorRange() {
    if(ModManager_1.ModManager.Settings.PerceptionRange){return 1;}//add
    
    if (!this.SectorRange) return !0;
    var e = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.Begin),
      r = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.End),
      o = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (o) {
      let t = void 0;
      var n = this.fte.CreatureData.GetEntityType(),
        n =
          ((t =
            n === Protocol_1.Aki.Protocol.EEntityType.SceneItem
              ? this.fte.ActorRightProxy
              : this.fte.ActorForwardProxy),
          PawnInteractController.oz),
        s = PawnInteractController.lz,
        o =
          (o.ActorLocationProxy.Subtraction(this.GetInteractPoint(), n),
          (n.Z = 0),
          n.Normalize(),
          n.DotProduct(t));
      let i = Math.acos(o) * MathUtils_1.MathUtils.RadToDeg;
      if (
        (n.CrossProduct(t, s),
        0 < s.Z && (i *= -1),
        (i = MathCommon_1.MathCommon.WrapAngle(i)),
        r < e)
      ) {
        if (i > e || i < r) return !0;
      } else if (i > e && i < r) return !0;
    }
    return !1;
	
  }
  IsInPlayerInteractiveRange() {
    if(ModManager_1.ModManager.Settings.PerceptionRange){return 1;}//add
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!t) return !1;
    if (!this.PlayerInteractiveRange) return !0;
    if (
      this.PlayerInteractiveRange.Begin === -MathUtils_1.PI_DEG &&
      this.PlayerInteractiveRange.End === MathUtils_1.PI_DEG
    )
      return !0;
    var i = PawnInteractController.oz,
      e = PawnInteractController.lz,
      t =
        (i.FromUeVector(this.fte.ActorLocationProxy),
        i.SubtractionEqual(t.ActorLocationProxy),
        (i.Z = 0),
        i.Normalize(),
        t.ActorForwardProxy),
      r = i.DotProduct(t);
    let o = Math.acos(r) * MathUtils_1.MathUtils.RadToDeg;
    return (
      i.CrossProduct(t, e),
      0 < e.Z && (o *= -1),
      o > this.PlayerInteractiveRange.Begin &&
        o < this.PlayerInteractiveRange.End
    );

  }
  IsMatchRoleOption() {
    return !this.UKt || this.UKt?.length <= 0
      ? !ModelManager_1.ModelManager.FormationModel.IsPhantomFormation
      : FormationControl_1.FormationControl.IsMatchRoleOption(this.UKt);
  }
  GetInteractPoint() {
    this.Feo.DeepCopy(this.fte.ActorLocationProxy);
    var t = PawnInteractController.oz,
      i = this.LocationOffset;
    return (
      !i ||
        (0 === i.X && 0 === i.Y && 0 === i.Z) ||
        (0 !== i.X &&
          (this.fte.ActorForwardProxy.Multiply(i.X, t),
          this.Feo.AdditionEqual(t)),
        0 !== i.Y &&
          (this.fte.ActorRightProxy.Multiply(i.Y, t),
          this.Feo.AdditionEqual(t)),
        0 !== i.Z &&
          (this.fte.ActorUpProxy.Multiply(i.Z, t), this.Feo.AdditionEqual(t))),
      this.Feo
    );
  }
  Yeo() {
    if (((this.qeo = this.Beo), this.Reo))
      for (const t of this.Reo) t.Range > this.qeo && (this.qeo = t.Range);
  }
  Jeo() {
    this.Reo &&
      0 !== this.Reo.length &&
      ((this.Peo = this.Reo[0]), (this.keo = void 0));
  }
  GetInteractiveOption(i = !1) {
    if (this.Oeo === Time_1.Time.Frame && this.keo) return this.keo;
    if (this.fte && this.fte.Owner) {
      var e = this.Reo;
      if (e) {
        this.keo = void 0;
        for (let t = e.length - 1; -1 < t; t--) {
          var r = e[t];
          if (!r.Disabled)
            if (!i || "Flow" === r.Type.Type)
              if (this.$eo(r)) {
                this.keo = r;
                break;
              }
        }
        return (this.Oeo = Time_1.Time.Frame), this.keo;
      }
    }
  }
  Xeo(t, i, e, r = 0, o = 0) {
    var n = t.Range || this.Beo;
    let s = this.Geo;
    t.DoIntactType && (s = t.DoIntactType);
    var h = new LevelGameplayActionsDefine_1.CommonInteractOption();
    return h.Init(++this.XRe, t, e, n, s, i, r, o), h;
  }
  AddDynamicInteractOption(t, i, e, r = !0) {
    if (!this.Reo) return -1;
    let o = 0,
      n = 0;
    i &&
      (i instanceof LevelGeneralContextDefine_1.QuestContext
        ? ((n = 1), (o = i.QuestId))
        : i instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext &&
          i.BtType === Protocol_1.Aki.Protocol.BtType.BtTypeQuest &&
          ((n = 1), (o = i.TreeConfigId)));
    t = this.Xeo(t, 1, i, 0, n);
    return (
      (t.OptionContentId = o),
      void 0 !== e && (t.TidContent = e),
      this.Reo.push(t),
      this.Aeo.push(t),
      1 === n && (this.xeo.push(t), this.zeo()),
      i &&
        ((e = this.Zeo(t.Context)),
        this.ChangeOptionDisabled(t.InstanceId, !e)),
      r && this.Qeo(),
      t.InstanceId
    );
  }
  zeo() {
    this.xeo.sort((t, i) => {
      (t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
        t.OptionContentId,
      )),
        (i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          i.OptionContentId,
        ));
      return t && i
        ? t.Type !== i.Type
          ? t.Type - i.Type
          : t.ChapterId !== i.ChapterId
            ? t.ChapterId - i.ChapterId
            : t.Id - i.Id
        : -1;
    });
  }
  RemoveDynamicInteractOption(i) {
    if (!this.Reo) return !1;
    let e = !1;
    for (let t = this.Aeo.length - 1; -1 < t; t--) {
      var r = this.Aeo[t];
      if (r.Guid === i) {
        (e = 1 === r.ContentType), this.Aeo.splice(t, 1);
        break;
      }
    }
    if (e)
      for (let t = this.xeo.length - 1; -1 < t; t--)
        if (this.xeo[t].Guid === i) {
          this.xeo.splice(t, 1);
          break;
        }
    let o = !1;
    for (let t = this.Reo.length - 1; -1 < t; t--)
      if (this.Reo[t].Guid === i) {
        (o = !0), this.Reo.splice(t, 1)[0].Dispose();
        break;
      }
    return o && this.Qeo(), o;
  }
  AddClientInteractOption(t, i, e = "Option", r, o, n = 0, s) {
    var h = new LevelGameplayActionsDefine_1.CommonActionInfo(),
      t = ((h.Params = t), new Array()),
      h = (t.push(h), new LevelGameplayActionsDefine_1.CommonInteractActions()),
      t =
        ((h.Actions = t),
        new LevelGameplayActionsDefine_1.CommonInteractOption());
    return (
      (t.Type = h),
      (t.Condition = i),
      (t.DoIntactType = e),
      r && (t.Range = r),
      o && (t.TidContent = o),
      s && (this.LocationOffset = s),
      this.Reo
        ? ((h = this.Xeo(t, 3, void 0, n)),
          this.Reo.push(h),
          this.Qeo(),
          h.InstanceId)
        : -1
    );
  }
  RemoveClientInteractOption(i) {
    if (!this.Reo) return !1;
    let e = !1;
    for (let t = this.Reo.length - 1; -1 < t; t--)
      if (this.Reo[t].InstanceId === i) {
        (e = !0), this.Reo.splice(t, 1)[0].Dispose();
        break;
      }
    return e && this.Qeo(), e;
  }
  OnChangeModeFinish() {
    if (this.Reo)
      for (const i of this.Reo) {
        var t;
        i.Context &&
          1 === i.OptionType &&
          ((t = this.Zeo(i.Context)),
          this.ChangeOptionDisabled(i.InstanceId, !t));
      }
  }
  ChangeOptionText(i, t) {
    var e;
    this.Reo && (e = this.Reo.find((t) => t.Guid === i)) && (e.TidContent = t);
  }
  ChangeOptionDisabled(i, t) {
    var e;
    this.Reo &&
      (e = this.Reo.find((t) => t.InstanceId === i)) &&
      (e.Disabled = t);
  }
  ChangeInteractOption(t) {
    this.Peo = t;
  }
  get CurrentInteractOption() {
    return this.Peo;
  }
  get Options() {
    if (this.Ueo && this.Reo)
      for (let t = (this.Ueo.length = 0), i = this.Reo.length; t < i; t++) {
        var e = this.Reo[t];
        e.Disabled || this.Ueo.push(e);
      }
    return this.Ueo;
  }
  get ShowOptions() {
    var e = new Array();
    for (const t of this.xeo)
      StringUtils_1.StringUtils.IsEmpty(t.TidContent) ||
        t.Disabled ||
        "Option" !== t.DoIntactType ||
        (this.$eo(t) && e.push(t));
    for (let t = 0, i = this.Reo.length; t < i; t++) {
      var r = this.Reo[t];
      StringUtils_1.StringUtils.IsEmpty(r.TidContent) ||
        r.Disabled ||
        "Option" !== r.DoIntactType ||
        1 === r.ContentType ||
        (this.$eo(r) && e.push(r));
    }
    return e.push(void 0), e;
  }
  get HasDynamicOption() {
    return 0 < this.Aeo.length;
  }
  get Owner() {
    return this.fte?.Owner;
  }
  get EntityId() {
    return this.fte?.Entity?.Id;
  }
  get CreatureData() {
    return this.fte?.CreatureData;
  }
  HasInteractOptions() {
    return void 0 !== this.Reo?.length && 0 < this.Reo?.length;
  }
  get InteractRange() {
    return this.qeo;
  }
  get InteractExitRange() {
    return -1 === this.beo ? this.qeo : this.beo;
  }
  GetAutoTriggerOption() {
    if (this.Reo)
      for (let t = 0, i = this.Reo.length; t < i; t++) {
        var e = this.Reo[t];
        if ("Auto" === e.DoIntactType) if (this.$eo(e)) return e;
      }
  }
  InteractOption(t = 0) {
    t >= this.Reo.length ||
      (!(t = this.Reo[t]).Disabled &&
        this.$eo(t) &&
        (PlotController_1.PlotController.EndInteraction("Flow" === t.Type.Type),
        TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
          t,
          this,
        )));
  }
  $eo(t) {
    if (
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
        t.Condition,
        this.fte.Owner,
        LevelGeneralContextDefine_1.EntityContext.Create(this.fte.Entity.Id),
      )
    )
      return !1;
    if (3 === t.OptionType && 1 === t.CustomOptionType) {
      t = this.fte;
      if (t) {
        var i =
          ModelManager_1.ModelManager.FormationModel.GetCurrentEntity?.Entity?.GetComponent(
            3,
          );
        if (i) {
          (i = i.ActorLocationProxy.Z - i.HalfHeight),
            (t = t.ActorLocationProxy.Z - t.HalfHeight);
          if (Math.abs(i - t) > EXECUTION_MAX_HEIGHT_DIFF || this.eto())
            return !1;
        }
      }
    }
    return !0;
  }
  eto() {
    var t,
      i = ModelManager_1.ModelManager.FormationModel.GetCurrentEntity,
      e = i.Entity.GetComponent(3),
      i = i.Entity.GetComponent(26)?.ExecutionTrace;
    return i
      ? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          i,
          e.ActorLocationProxy,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          i,
          this.fte.ActorLocationProxy,
        ),
        !!TraceElementCommon_1.TraceElementCommon.LineTrace(
          i,
          PROFILE_DETECT_VISIBLE_BLOCK,
        ) &&
          ((t = PawnInteractController.oz),
          e.ActorUpProxy.Multiply(
            e.HalfHeight - DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET,
            t,
          ),
          e.ActorLocationProxy.Addition(t, t),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, t),
          (0, RegisterComponent_1.isComponentInstance)(this.fte, 3)
            ? ((e = PawnInteractController.lz),
              this.fte.ActorUpProxy.Multiply(
                this.fte.HalfHeight - DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET,
                e,
              ),
              this.fte.ActorLocationProxy.Addition(e, e),
              TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, e))
            : TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                i,
                this.fte.ActorLocationProxy,
              ),
          !!TraceElementCommon_1.TraceElementCommon.LineTrace(
            i,
            PROFILE_DETECT_VISIBLE_BLOCK,
          )))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Interaction", 37, "ExecutionTrace is undefined"),
        !1);
  }
  HandlePreInterativeLogic() {
    this.PreTalkConfigs;
  }
  RecordInteraction() {
    this.Neo++;
  }
  HasDynamicOptionType(t) {
    for (const r of this.Aeo)
      if (6 === r.Context.Type) {
        var i = r.Context.TreeConfigId,
          e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i)?.GetNode(
            r.Context.NodeId,
          );
        if (e && e instanceof ChildQuestNodeBase_1.ChildQuestNodeBase)
          for (const o of t) if (e.ChildQuestType === o) return !0;
      }
    return !1;
  }
  HasDynamicOptionTask() {
    for (const t of this.Aeo)
      if (6 === t.Context.Type) return 0 === t.Context.NodeId;
    return !1;
  }
  CheckInteractCount(t, i) {
    switch (i) {
      case 0:
        return this.Neo === t;
      case 1:
        return this.Neo !== t;
      case 2:
        return this.Neo < t;
      case 3:
        return this.Neo <= t;
      case 4:
        return this.Neo > t;
      case 5:
        return this.Neo >= t;
    }
    return !1;
  }
  GetPbDataId() {
    return this.fte.CreatureData.GetPbDataId();
  }
  GetOptionByIndex(t) {
    if (this.Reo) {
      var i = t + 1;
      for (const e of this.Reo) if (e.InstanceId === i) return e;
    }
  }
  GetOptionByInstanceId(t) {
    if (this.Reo) for (const i of this.Reo) if (i.InstanceId === t) return i;
  }
  GetOptionByGuid(t) {
    if (t && this.Reo) for (const i of this.Reo) if (i.Guid === t) return i;
  }
  HandleInteractRequest() {
    this.Deo?.Valid &&
      (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(
        this.Deo.Entity.Id,
      ) === Protocol_1.Aki.Protocol.EEntityType.Npc &&
        this.Deo.Entity.GetComponent(36)?.MoveToLocationLogic?.PushMoveInfo(),
      this.Deo.SetInteractionState(!1, "发送交互请求"),
      InputDistributeController_1.InputDistributeController.RefreshInputTag()),
      this.OnInteractActionEnd && this.OnInteractActionEnd();
  }
  HandleInteractResponse(t, i) {
    this.Deo?.Valid &&
      (this.Deo.SetServerLockInteract(i, "Interaction Response"),
      this.Deo.SetInteractionState(!0, "接收交互应答")),
      t !== Protocol_1.Aki.Protocol.ErrorCode.Success
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Interaction", 37, "交互失败", ["errorCode", t]),
          this.Deo.SetServerLockInteract(!1, "交互失败"),
          t !== Protocol_1.Aki.Protocol.ErrorCode.ErrSceneEntityNotExist &&
            t !== Protocol_1.Aki.Protocol.ErrorCode.ErrInteractRange &&
            t !== Protocol_1.Aki.Protocol.ErrorCode.ErrInteractCd &&
            t !== Protocol_1.Aki.Protocol.ErrorCode.ErrPreCondition &&
            t !==
              Protocol_1.Aki.Protocol.ErrorCode.ErrInteractOptionGuidInvalid &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t,
              NetDefine_1.EResponseMessageId.EntityInteractResponse,
            ),
          !ModelManager_1.ModelManager.PlotModel.IsInPlot &&
            UiManager_1.UiManager.IsViewShow("PlotView") &&
            PlotController_1.PlotController.EndInteraction(!1, !0))
        : ((i = this.fte?.Entity?.GetComponent(124)) && i.CloseAllCollisions(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnInteractDropItemSuccess,
          ));
  }
  Zeo(t) {
    if (!t) return !0;
    let i = !0;
    switch (t.Type) {
      case 2:
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.QuestId);
        e && (i = e.IsInteractValid);
        break;
      case 3:
        e =
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            t.LevelPlayId,
          );
        e && (i = e.IsInteractValid);
        break;
      case 6:
        e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
          t.BtType,
          t.TreeConfigId,
        );
        e && (i = e.IsInteractValid);
    }
    return i;
  }
  GetInteractionDebugInfos() {
    if (this.Reo && 0 < this.Reo?.length) {
      let t = "";
      for (const e of this.Reo) {
        t =
          (t =
            (t =
              (t = t + ("选项: " + (e.TidContent || "空名字")) + "\t\t") +
              ("交互选项类型: " +
                LevelGameplayActionsDefine_1.optionTypeLogString[
                  e.OptionType
                ]) +
              "\t\t") +
            ("交互类型: " + e.DoIntactType) +
            "\t\t") +
          ("Enable: " + !e.Disabled) +
          "\t\t";
        var i = this.$eo(e);
        if (((t += "满足开启条件: " + i), !i))
          for (const r of e.Condition.Conditions)
            t = (t += "\n") + "Condition: " + JSON.stringify(r);
        1 === e.OptionType &&
          (t = (t += "\nContext:\n") + JSON.stringify(e.Context)),
          (t += "\n\n");
      }
      return t;
    }
    return "无";
  }
}
((exports.PawnInteractController = PawnInteractController).oz =
  Vector_1.Vector.Create()),
  (PawnInteractController.lz = Vector_1.Vector.Create());
//# sourceMappingURL=PawnInteractController.js.map

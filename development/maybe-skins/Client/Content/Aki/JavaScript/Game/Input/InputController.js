"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputController = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Time_1 = require("../../Core/Common/Time"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  ModelManager_1 = require("../Manager/ModelManager"),
  ModManager_1 = require("../Manager/ModManager"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  InputManager_1 = require("../Ui/Input/InputManager"),
  InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
  InputEnums_1 = require("./InputEnums"),
  keys_State = {},
  cpp_1 = require("cpp"),
  Info_1 = require("../../Core/Common/Info"),
  GlobalData_1 = require("../GlobalData"),
  KEY_RELEASED_TIME = -1;
class InputController extends ControllerBase_1.ControllerBase {
  constructor() {
    super(...arguments), (this.key_State = !1);
  }
  static InitializeEnvironment() {
    Info_1.Info.UseFastInputCallback &&
      cpp_1.FKuroInputInterface.InitializeEnvironment(),
      Info_1.Info.AxisInputOptimize
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "Kuro.Input.AxisOptimize 1",
        )
        : UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "Kuro.Input.AxisOptimize 0",
        );
  }
  static get Model() {
    return ModelManager_1.ModelManager.InputModel;
  }
  static OnInit() {
    return this.Ore(), !0;
  }
  static OnClear() {
    return this.kre(), !0;
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotNetworkStart,
      this.AMe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForceReleaseInput,
        this.PMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.xMe,
      ),
      InputDistributeController_1.InputDistributeController.BindAxes(
        [
          InputMappingsDefine_1.axisMappings.LookUp,
          InputMappingsDefine_1.axisMappings.Turn,
          InputMappingsDefine_1.axisMappings.Zoom,
        ],
        this.wMe,
      ),
      InputDistributeController_1.InputDistributeController.BindAxes(
        [
          InputMappingsDefine_1.axisMappings.MoveForward,
          InputMappingsDefine_1.axisMappings.MoveRight,
        ],
        this.BMe,
      ),
      InputDistributeController_1.InputDistributeController.BindActions(
        [
          InputMappingsDefine_1.actionMappings.大招,
          InputMappingsDefine_1.actionMappings.幻象1,
          InputMappingsDefine_1.actionMappings.幻象2,
          InputMappingsDefine_1.actionMappings.技能1,
          InputMappingsDefine_1.actionMappings.攀爬,
          InputMappingsDefine_1.actionMappings.攻击,
          InputMappingsDefine_1.actionMappings.瞄准,
          InputMappingsDefine_1.actionMappings.走跑切换,
          InputMappingsDefine_1.actionMappings.跳跃,
          InputMappingsDefine_1.actionMappings.通用交互,
          InputMappingsDefine_1.actionMappings.锁定目标,
          InputMappingsDefine_1.actionMappings.闪避,
        ],
        this.bMe,
      );
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotNetworkStart,
      this.AMe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.xMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForceReleaseInput,
        this.PMe,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxes(
        [
          InputMappingsDefine_1.axisMappings.LookUp,
          InputMappingsDefine_1.axisMappings.Turn,
          InputMappingsDefine_1.axisMappings.Zoom,
        ],
        this.wMe,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxes(
        [
          InputMappingsDefine_1.axisMappings.MoveForward,
          InputMappingsDefine_1.axisMappings.MoveRight,
        ],
        this.BMe,
      ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.大招,
          InputMappingsDefine_1.actionMappings.幻象1,
          InputMappingsDefine_1.actionMappings.幻象2,
          InputMappingsDefine_1.actionMappings.技能1,
          InputMappingsDefine_1.actionMappings.攀爬,
          InputMappingsDefine_1.actionMappings.攻击,
          InputMappingsDefine_1.actionMappings.瞄准,
          InputMappingsDefine_1.actionMappings.走跑切换,
          InputMappingsDefine_1.actionMappings.跳跃,
          InputMappingsDefine_1.actionMappings.通用交互,
          InputMappingsDefine_1.actionMappings.锁定目标,
          InputMappingsDefine_1.actionMappings.闪避,
        ],
        this.bMe,
      );
  }
  static AddInputHandler(e) {
    this.Model.AddInputHandler(e);
  }
  static RemoveInputHandler(e) {
    this.Model.RemoveInputHandler(e);
  }
  static InputAction(e, t) {
    if (
      InputEnums_1.EInputAction.锁定目标 !== e ||
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10031)
    ) {
      var n = this.Model.GetPressTimes();
      switch (t) {
        case 1:
          var o = Time_1.Time.WorldTimeSeconds;
          n.set(e, o);
          for (const t of this.Model.GetHandlers()) {
            var i = t.GetInputFilter();
            if (i.BlockAction(e)) break;
            i.ListenToAction(e) && t.HandlePressEvent(e, o);
          }
          break;
        case 2:
          var r = n.get(e);
          if (-1 !== r) {
            var s = this.qMe(r, Time_1.Time.WorldTimeSeconds);
            n.set(e, -1);
            for (const t of this.Model.GetHandlers()) {
              var p = t.GetInputFilter();
              if (p.BlockAction(e)) break;
              p.ListenToAction(e) && t.HandleReleaseEvent(e, s);
            }
          }
      }
    }
  }
  static SetMoveControlEnabled(e, t, n, o) {
    (this.GMe = e), (this.NMe = t), (this.OMe = n), (this.kMe = o);
  }
  static IsMyKeyDown(e) {
    var t = InputSettings_1.InputSettings.IsInputKeyDown(e);
    return t && !this.key_State
      ? ((this.key_State = !0), !0)
      : (t || (this.key_State = !1), !1);
  }
  static IsMyKeyUp(e) {
    keys_State[e] || (keys_State[e] = { key_Down: !1, key_Up: !1 });
    var t = keys_State[e],
      n = InputSettings_1.InputSettings.IsInputKeyDown(e);
    return (
      n && !t.key_Down && ((t.key_Down = !0), (t.key_Up = !1)),
      n || !t.key_Down || t.key_Up || (t.key_Up = !0),
      !(!t.key_Down || !t.key_Up) && ((t.key_Down = !1), (t.key_Up = !1), !0)
    );
  }
  static InputAxis(e, t) {
    ModManager_1.ModManager.listenModsToggle();
    var n = this.Model.GetAxisValues();
    if (0 !== t || !n.has(e)) {
      if (
        (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Input",
            8,
            "[InputLog][InputController]开始接收输入",
            ["axis", e],
            ["value", t],
          ),
          e === InputEnums_1.EInputAxis.MoveForward)
      ) {
        if (!this.GMe && 0 < t) return;
        if (!this.NMe && t < 0) return;
      }
      if (e === InputEnums_1.EInputAxis.MoveRight) {
        if (!this.kMe && 0 < t) return;
        if (!this.OMe && t < 0) return;
      }
      n.set(e, t),
        ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Input",
          8,
          "[InputLog][InputController]完成接收输入",
          ["axisSet", n],
        );
    }
  }
  static PreProcessInput(e, t) {
    if (this.Model)
      for (const n of this.Model.GetHandlers()) n.PreProcessInput(e, t);
  }
  static PostProcessInput(e, t) {
    if (this.Model) {
      var n,
        o,
        i = this.Model.GetHandlers();
      for ([n, o] of this.Model.GetAxisValues())
        for (const e of i) {
          var r = e.GetInputFilter();
          if (r.BlockAxis(n)) break;
          r.ListenToAxis(n) &&
            (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Input",
                8,
                "[InputLog][InputController]开始处理轴输入",
                ["axis", n],
                ["value", o],
              ),
              e.HandleInputAxis(n, o));
        }
      var s,
        p,
        a = Time_1.Time.WorldTimeSeconds;
      for ([s, p] of this.Model.GetPressTimes()) {
        var u = this.qMe(p, a);
        if (-1 !== u)
          for (const e of i) {
            var M = e.GetInputFilter();
            if (M.BlockAction(s)) break;
            M.ListenToAction(s) && e.HandleHoldEvent(s, u);
          }
      }
      try {
        for (const n of i) n.PostProcessInput(e, t);
      } catch (e) {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack("Json", 8, "PostProcessInput", e, [
            "msg",
            e.message,
          ])
          : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Json", 8, "PostProcessInput", ["error", e]);
      }
      this.Model.GetAxisValues().clear(),
        ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Input",
          8,
          "[InputLog][InputController]开始输入处理完成",
        );
    }
  }
  static QueryCommandPriority(e) {
    return this.Model.QueryCommandPriority(e);
  }
  static IsKeyDown(e) {
    return void 0 !== (e = this.Model.GetPressTimes().get(e)) && -1 !== e;
  }
  static qMe(e, t) {
    return void 0 === e || -1 === e ? -1 : t - e;
  }
  static SetForceFeedbackConfig(e, t) {
    UE.BasePlayerController.SetKuroForceFeedbackConfig(e, t);
  }
}
((exports.InputController = InputController).HMe = void 0),
  (InputController.FMe = void 0),
  (InputController.VMe = void 0),
  (InputController.GMe = !0),
  (InputController.NMe = !0),
  (InputController.OMe = !0),
  (InputController.kMe = !0),
  (InputController.wMe = (e, t, n) => {
    n = n.GetInputAxis();
    var o =
      (InputController.InputAxis(n, t), Global_1.Global.CharacterController);
    o &&
      0 < t &&
      n !== InputEnums_1.EInputAxis.Zoom &&
      ModelManager_1.ModelManager.PlatformModel.IsPc() &&
      !o.bShowMouseCursor &&
      InputManager_1.InputManager.MoveCursorToCenter();
  }),
  (InputController.BMe = (e, t, n) => {
    (n = n.GetInputAxis()), InputController.InputAxis(n, t);
  }),
  (InputController.bMe = (e, t, n) => {
    (t = 0 === t ? 1 : 2),
      (n = n.GetInputAction()),
      InputController.InputAction(n, t);
  }),
  (InputController.AMe = () => {
    for (var [e] of InputController.Model.GetPressTimes())
      InputController.InputAction(e, 2);
  }),
  (InputController.PMe = (e) => {
    for (var [t] of (e &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Input", 7, "强制释放所有按键", ["Reason", e]),
      InputController.Model.GetPressTimes()))
      InputController.InputAction(t, 2);
  }),
  (InputController.xMe = (e) => {
    var t,
      n = ModelManager_1.ModelManager.InputDistributeModel;
    for ([t] of InputController.Model.GetPressTimes()) {
      var o = n.GetActionInputDistributeTagName(InputEnums_1.EInputAction[t]);
      !o ||
        n.IsTagMatchAnyCurrentInputTag(o) ||
        InputController.InputAction(t, 2);
    }
  });

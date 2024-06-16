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
	MenuWithText_1 = require("../Manager/MenuWithText"), // [MenuWithText]
	InputSettings_1 = require("../InputSettings/InputSettings"), // [MenuWithText]
	ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController"),
	InputManager_1 = require("../Ui/Input/InputManager"),
	InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
	InputEnums_1 = require("./InputEnums"),
	keyStates = {},
	KEY_RELEASED_TIME = -1;
class InputController extends ControllerBase_1.ControllerBase {
	// [MenuWithText] start
	constructor() {
		super(...arguments), (this.keyState = false);
	}
	// [MenuWithText] end

	static get Model() {
		return ModelManager_1.ModelManager.InputModel;
	}
	static OnInit() {
		return this.moe(), !0;
	}
	static OnClear() {
		return this.doe(), !0;
	}
	static moe() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlotNetworkStart,
			this.Kve,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ForceReleaseInput,
				this.Qve,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnInputDistributeTagChanged,
				this.$ve,
			),
			InputDistributeController_1.InputDistributeController.BindAxes(
				[
					InputMappingsDefine_1.axisMappings.LookUp,
					InputMappingsDefine_1.axisMappings.Turn,
					InputMappingsDefine_1.axisMappings.Zoom,
				],
				this.Xve,
			),
			InputDistributeController_1.InputDistributeController.BindAxes(
				[
					InputMappingsDefine_1.axisMappings.MoveForward,
					InputMappingsDefine_1.axisMappings.MoveRight,
				],
				this.Yve,
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
				this.Jve,
			);
	}
	static doe() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlotNetworkStart,
			this.Kve,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnInputDistributeTagChanged,
				this.$ve,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ForceReleaseInput,
				this.Qve,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxes(
				[
					InputMappingsDefine_1.axisMappings.LookUp,
					InputMappingsDefine_1.axisMappings.Turn,
					InputMappingsDefine_1.axisMappings.Zoom,
				],
				this.Xve,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxes(
				[
					InputMappingsDefine_1.axisMappings.MoveForward,
					InputMappingsDefine_1.axisMappings.MoveRight,
				],
				this.Yve,
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
				this.Jve,
			);
	}
	static AddInputHandler(t) {
		this.Model.AddInputHandler(t);
	}
	static RemoveInputHandler(t) {
		this.Model.RemoveInputHandler(t);
	}
	static InputAction(t, n) {
		// [MenuWithText] start
		MenuWithText_1.MenuWithText.HandleKeyInputs();
		// [MenuWithText] end
		if (
			InputEnums_1.EInputAction.锁定目标 !== t ||
			ModelManager_1.ModelManager.FunctionModel.IsOpen(10031)
		) {
			var e = this.Model.GetPressTimes();
			switch (n) {
				case 1:
					var i = Time_1.Time.WorldTimeSeconds;
					e.set(t, i);
					for (const u of this.Model.GetHandlers()) {
						var r = u.GetInputFilter();
						if (r.BlockAction(t)) break;
						r.ListenToAction(t) && u.HandlePressEvent(t, i);
					}
					break;
				case 2:
					var o = e.get(t);
					if (o !== KEY_RELEASED_TIME) {
						var p = this.zve(o, Time_1.Time.WorldTimeSeconds);
						e.set(t, KEY_RELEASED_TIME);
						for (const a of this.Model.GetHandlers()) {
							var s = a.GetInputFilter();
							if (s.BlockAction(t)) break;
							s.ListenToAction(t) && a.HandleReleaseEvent(t, p);
						}
					}
			}
		}
	}
	static SetMoveControlEnabled(t, n, e, i) {
		(this.Zve = t), (this.eMe = n), (this.tMe = e), (this.iMe = i);
	}

	// [MenuWithText] start
	static IsCustomKeyDown(str) {
		var IsInputKeyDown_1 = InputSettings_1.InputSettings.IsInputKeyDown(str);
		if (IsInputKeyDown_1 && !this.keyState) {
			this.keyState = true;
			return true;
		}
		if (!IsInputKeyDown_1) {
			this.keyState = false;
			return false;
		}
		return false;
	}

	static IsCustomKeyUp(str) {
		if (!keyStates[str]) {
			keyStates[str] = { keyDown: false, keyUp: false };
		}
		let modKeyState = keyStates[str];
		let IsInputKeyDown_1 = InputSettings_1.InputSettings.IsInputKeyDown(str);
		if (IsInputKeyDown_1 && !modKeyState.keyDown) {
			modKeyState.keyDown = true;
			modKeyState.keyUp = false;
		}
		if (!IsInputKeyDown_1 && modKeyState.keyDown && !modKeyState.keyUp) {
			modKeyState.keyUp = true;
		}
		if (modKeyState.keyDown && modKeyState.keyUp) {
			modKeyState.keyDown = false;
			modKeyState.keyUp = false;
			return true;
		}
		return false;
	}
	// [MenuWithText] end

	static InputAxis(t, n) {
		var e = this.Model.GetAxisValues();
		if (0 !== n || !e.has(t)) {
			if (
				(ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Input",
						8,
						"[InputLog][InputController]开始接收输入",
						["axis", t],
						["value", n],
					),
				t === InputEnums_1.EInputAxis.MoveForward)
			) {
				if (!this.Zve && 0 < n) return;
				if (!this.eMe && n < 0) return;
			}
			if (t === InputEnums_1.EInputAxis.MoveRight) {
				if (!this.iMe && 0 < n) return;
				if (!this.tMe && n < 0) return;
			}
			e.set(t, n),
				ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Input",
						8,
						"[InputLog][InputController]完成接收输入",
						["axisSet", e],
					);
		}
	}
	static PreProcessInput(t, n) {
		if (this.Model)
			for (const e of this.Model.GetHandlers()) e.PreProcessInput(t, n);
	}
	static PostProcessInput(t, n) {
		if (this.Model) {
			var e,
				i,
				r = this.Model.GetHandlers();
			for ([e, i] of this.Model.GetAxisValues())
				for (const I of r) {
					var o = I.GetInputFilter();
					if (o.BlockAxis(e)) break;
					o.ListenToAxis(e) &&
						(ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Input",
								8,
								"[InputLog][InputController]开始处理轴输入",
								["axis", e],
								["value", i],
							),
						I.HandleInputAxis(e, i));
				}
			var p,
				s,
				u = Time_1.Time.WorldTimeSeconds;
			for ([p, s] of this.Model.GetPressTimes()) {
				var a = this.zve(s, u);
				if (a !== KEY_RELEASED_TIME)
					for (const l of r) {
						var _ = l.GetInputFilter();
						if (_.BlockAction(p)) break;
						_.ListenToAction(p) && l.HandleHoldEvent(p, a);
					}
			}
			try {
				for (const f of r) f.PostProcessInput(t, n);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack("Json", 8, "PostProcessInput", t, [
							"msg",
							t.message,
						])
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Json", 8, "PostProcessInput", ["error", t]);
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
	static QueryCommandPriority(t) {
		return this.Model.QueryCommandPriority(t);
	}
	static IsKeyDown(t) {
		t = this.Model.GetPressTimes().get(t);
		return void 0 !== t && t !== KEY_RELEASED_TIME;
	}
	static zve(t, n) {
		return void 0 === t || t === KEY_RELEASED_TIME ? KEY_RELEASED_TIME : n - t;
	}
	static SetForceFeedbackConfig(t, n) {
		UE.BasePlayerController.SetKuroForceFeedbackConfig(t, n);
	}
}
((exports.InputController = InputController).nMe = void 0),
	(InputController.rMe = void 0),
	(InputController.oMe = void 0),
	(InputController.Zve = !0),
	(InputController.eMe = !0),
	(InputController.tMe = !0),
	(InputController.iMe = !0),
	(InputController.Xve = (t, n, e) => {
		var e = e.GetInputAxis(),
			i =
				(InputController.InputAxis(e, n), Global_1.Global.CharacterController);
		i &&
			0 < n &&
			e !== InputEnums_1.EInputAxis.Zoom &&
			ModelManager_1.ModelManager.PlatformModel.IsPc() &&
			!i.bShowMouseCursor &&
			InputManager_1.InputManager.MoveCursorToCenter();
	}),
	(InputController.Yve = (t, n, e) => {
		e = e.GetInputAxis();
		InputController.InputAxis(e, n);
	}),
	(InputController.Jve = (t, n, e) => {
		(n = 0 === n ? 1 : 2), (e = e.GetInputAction());
		InputController.InputAction(e, n);
	}),
	(InputController.Kve = () => {
		for (var [t] of InputController.Model.GetPressTimes())
			InputController.InputAction(t, 2);
	}),
	(InputController.Qve = (t) => {
		t &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Input", 7, "强制释放所有按键", ["Reason", t]);
		for (var [n] of InputController.Model.GetPressTimes())
			InputController.InputAction(n, 2);
	}),
	(InputController.$ve = (t) => {
		var n,
			e = ModelManager_1.ModelManager.InputDistributeModel;
		for ([n] of InputController.Model.GetPressTimes()) {
			var i = e.GetActionInputDistributeTagName(InputEnums_1.EInputAction[n]);
			!i ||
				e.IsTagMatchAnyCurrentInputTag(i) ||
				InputController.InputAction(n, 2);
		}
	});
//# sourceMappingURL=InputController.js.map

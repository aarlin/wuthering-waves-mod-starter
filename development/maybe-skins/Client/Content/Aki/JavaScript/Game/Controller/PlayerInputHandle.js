"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerInputHandle = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ModelManager_1 = require("../Manager/ModelManager"),
	InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController"),
	LguiEventSystemManager_1 = require("../Ui/LguiEventSystem/LguiEventSystemManager"),
	TouchFingerManager_1 = require("../Ui/TouchFinger/TouchFingerManager"),
	CombinationActionHandle_1 = require("./CombinationActionHandle"),
	CombinationAxisHandle_1 = require("./CombinationAxisHandle"),
	MIN_AXIS_INPUT = 0.1;
class PlayerInputHandle {
	constructor() {
		(this.Zde = new Map()),
			(this.IsPrintKeyName = !1),
			(this.eCe = void 0),
			(this.tCe = void 0);
	}
	Initialize() {
		(this.eCe = new CombinationActionHandle_1.CombinationActionHandle()),
			(this.tCe = new CombinationAxisHandle_1.CombinationAxisHandle());
	}
	Clear() {
		this.eCe.Clear(),
			(this.eCe = void 0),
			this.tCe.Clear(),
			(this.tCe = void 0);
	}
	Tick(e) {
		this.tCe?.Tick(e);
	}
	InputAction(e, t, n) {
		(ModelManager_1.ModelManager.PlatformModel?.IsMobileSource() &&
			ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(n)) ||
			(this.iCe(n) &&
				this.eCe.CheckCombinationAction(e) &&
				InputDistributeController_1.InputDistributeController.InputAction(
					e,
					t,
				));
	}
	InputAxis(e, t) {
		ModelManager_1.ModelManager.PlatformModel?.IsMobileSource() ||
			(Math.abs(t) <= 0.1
				? InputDistributeController_1.InputDistributeController.InputAxis(e, 0)
				: InputDistributeController_1.InputDistributeController.InputAxis(
						e,
						t,
					));
	}
	TouchBegin(e, t) {
		var n = {
			TouchType: 0,
			TouchId: (e = Number(e)),
			TouchPosition: this.oCe(e, t),
		};
		TouchFingerManager_1.TouchFingerManager.StartTouch(e, t),
			LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(
				!0,
				e,
				t,
			),
			InputDistributeController_1.InputDistributeController.InputTouch(e, n);
	}
	TouchEnd(e, t) {
		var n = {
			TouchType: 1,
			TouchId: (e = Number(e)),
			TouchPosition: this.oCe(e, t),
		};
		TouchFingerManager_1.TouchFingerManager.EndTouch(e),
			LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(
				!1,
				e,
				t,
			),
			InputDistributeController_1.InputDistributeController.InputTouch(e, n);
	}
	TouchMove(e, t) {
		var n = {
			TouchType: 2,
			TouchId: (e = Number(e)),
			TouchPosition: this.oCe(e, t),
		};
		TouchFingerManager_1.TouchFingerManager.MoveTouch(e, t),
			LguiEventSystemManager_1.LguiEventSystemManager.InputLguiTouchMove(e, t),
			InputDistributeController_1.InputDistributeController.InputTouch(e, n);
	}
	PressAnyKey(e) {
		var t;
		(ModelManager_1.ModelManager.PlatformModel?.IsMobileSource() &&
			ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(e)) ||
			((t = e.KeyName.toString()),
			this.eCe.PressAnyKey(t),
			this.tCe.PressAnyKey(t),
			this.IsPrintKeyName &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("InputSettings", 8, "按下按键", ["KeyName", t]),
			InputDistributeController_1.InputDistributeController.InputKey(t, !0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnInputAnyKey,
				!0,
				e,
			));
	}
	ReleaseAnyKey(e) {
		var t;
		(ModelManager_1.ModelManager.PlatformModel?.IsMobileSource() &&
			ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(e)) ||
			((t = e.KeyName.toString()),
			this.eCe.ReleaseAnyKey(t),
			this.tCe.ReleaseAnyKey(t),
			this.IsPrintKeyName &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("InputSettings", 8, "抬起按键", ["KeyName", t]),
			InputDistributeController_1.InputDistributeController.InputKey(t, !1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnInputAnyKey,
				!1,
				e,
			));
	}
	rCe(e) {
		return this.Zde.get(e);
	}
	oCe(e, t) {
		var n = this.rCe(e);
		return n ? (n.Set(t.X, t.Y, t.Z), n) : this.nCe(e, t);
	}
	nCe(e, t) {
		return (t = Vector_1.Vector.Create(t)), this.Zde.set(e, t), t;
	}
	iCe(e) {
		return (
			!!ModelManager_1.ModelManager.PlatformModel.IsGmLockGamepad ||
			!(
				(ModelManager_1.ModelManager.PlatformModel?.IsInGamepad() &&
					UE.KismetInputLibrary.Key_IsKeyboardKey(e)) ||
				(ModelManager_1.ModelManager.PlatformModel?.IsInKeyBoard() &&
					UE.KismetInputLibrary.Key_IsGamepadKey(e))
			)
		);
	}
}
exports.PlayerInputHandle = PlayerInputHandle;

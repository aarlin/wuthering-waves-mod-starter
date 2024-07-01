"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsLguiEventSystemActor = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Global_1 = require("../../../Game/Global"),
	ModelManager_1 = require("../../../Game/Manager/ModelManager"),
	CursorController_1 = require("../../../Game/Module/Cursor/CursorController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class TsLguiEventSystemActor extends UE.LGUIEventSystemActor {
	constructor() {
		super(...arguments),
			(this.StandaloneInputModule = void 0),
			(this.TouchInputModule = void 0),
			(this.CurrentInputModule = void 0),
			(this.NavigationEnable = !1),
			(this.HandleWrapper = void 0),
			(this.OnPlatformChanged = (e, t, n) => {});
	}
	InitializeLguiEventSystemActor() {
		this.RefreshCurrentInputModule();
		var e = (0, puerts_1.toManualReleaseDelegate)(
			TsLguiEventSystemActor.ChangeController,
		);
		(this.HandleWrapper =
			this.StandaloneInputModule.RegisterInputChangeEvent(e)),
			this.AddEvents(),
			CursorController_1.CursorController.SetWindowCursorStyle(),
			this.RegisterPointEnterExitEvent(),
			this.BroadCastInputType();
	}
	ResetLguiEventSystemActor() {
		this.StandaloneInputModule.UnregisterInputChangeEvent(this.HandleWrapper),
			(0, puerts_1.releaseManualReleaseDelegate)(
				TsLguiEventSystemActor.ChangeController,
			),
			(this.HandleWrapper = void 0),
			this.RemoveEvents(),
			this.UnRegisterPointEnterExitEvent();
	}
	AddEvents() {
		(this.OnPlatformChanged = (e, t, n) => {
			t !== n && this.RefreshCurrentInputModule();
		}),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.OnPlatformChanged,
			);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.OnPlatformChanged,
		);
	}
	InputTrigger(e, t) {
		var n;
		ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
			((n = Global_1.Global.CharacterController) &&
				n.bShowMouseCursor &&
				this.StandaloneInputModule.InputTrigger(e, t));
	}
	InputNavigation(e, t, n = !1) {
		(this.NavigationEnable || n) &&
			this.CurrentInputModule &&
			this.CurrentInputModule.InputNavigation(e, t);
	}
	InputTriggerForNavigation(e) {
		this.CurrentInputModule &&
			this.CurrentInputModule.InputTriggerForNavigation(e);
	}
	InputScroll(e) {
		this.StandaloneInputModule.InputScroll(e),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				(0 !== e &&
					0 !== (e = this.GetPointerEventData(0, !0)).inputType &&
					((e.inputType = 0),
					TsLguiEventSystemActor.ChangeController(e.inputType)));
	}
	InputTouchTrigger(e, t, n) {
		this.TouchInputModule.InputTouchTrigger(e, t, n);
	}
	InputTouchMove(e, t) {
		this.TouchInputModule.InputTouchMoved(e, t);
	}
	RefreshCurrentInputModule() {
		ModelManager_1.ModelManager.PlatformModel.IsMobile()
			? (this.CurrentInputModule = this.TouchInputModule)
			: (this.CurrentInputModule = this.StandaloneInputModule),
			this.CurrentInputModule.Activate(!1);
	}
	GetNowHitComponent() {
		if (this.CurrentInputModule)
			return this.CurrentInputModule.GetNowHitComponent();
	}
	GetPointerEventData(e, t = !1) {
		if (this.CurrentInputModule)
			return this.CurrentInputModule.GetPointerEventData(e, t);
	}
	IsPointerEventDataLineTrace(e) {
		return (
			!!this.CurrentInputModule &&
			this.CurrentInputModule.IsPointerEventDataLineTrace(e)
		);
	}
	SimulateClickButton(e, t, n = new UE.Vector2D(0.5, 0.5)) {
		return this.StandaloneInputModule.SimulationLineTrace(e, t, n);
	}
	SimulationPointerDownUp(e, t, n) {
		return this.StandaloneInputModule.SimulationPointerDownUp(e, t, n);
	}
	ResetNowIsTriggerPressed() {
		this.StandaloneInputModule.ResetNowIsTriggerPressed();
	}
	UpdateNavigationListener(e) {
		this.StandaloneInputModule.UpdateNavigation(e);
	}
	SetIsUseMouse(e) {
		this.StandaloneInputModule.SetIsUseMouse(e);
	}
	SetIsForceChange(e) {
		this.StandaloneInputModule.SetIsForceChange(e);
	}
	SetPrevMousePosition(e, t) {
		var n = this.GetPointerEventData(0, !0);
		n && (n.prevMousePos = new UE.Vector2D(e, t));
	}
	SetCurrentInputKeyType(e) {
		this.StandaloneInputModule &&
			this.CurrentInputModule === this.StandaloneInputModule &&
			this.StandaloneInputModule.SetCurrentInputKeyType(e);
	}
	RegisterPointEnterExitEvent() {
		ModelManager_1.ModelManager.PlatformModel.IsPc() &&
			this.EventSystem.RegisterPointerEnterExitEvent(
				(0, puerts_1.toManualReleaseDelegate)(
					CursorController_1.CursorController.CursorEnterExit,
				),
			);
	}
	UnRegisterPointEnterExitEvent() {
		ModelManager_1.ModelManager.PlatformModel.IsPc() &&
			(this.EventSystem.UnRegisterPointerEnterExitEvent(),
			(0, puerts_1.releaseManualReleaseDelegate)(
				CursorController_1.CursorController.CursorEnterExit,
			));
	}
	BroadCastInputType() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PointerInputTypeChange,
			this.EventSystem.defaultInputType,
		);
	}
}
((exports.TsLguiEventSystemActor = TsLguiEventSystemActor).ChangeController = (
	e,
) => {
	0 === e &&
		ModelManager_1.ModelManager.PlatformModel.SwitchInputControllerType(0, 3),
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PointerInputTypeChange,
			e,
		);
}),
	(exports.default = TsLguiEventSystemActor);

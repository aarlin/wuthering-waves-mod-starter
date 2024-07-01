"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LguiEventSystemManager = void 0);
const LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine");
class LguiEventSystemManager {
	static get LguiEventSystem() {
		return LguiEventSystemManager.Fmr?.EventSystem;
	}
	static async Initialize() {
		var e;
		LguiEventSystemManager.ZCe ||
			((LguiEventSystemManager.ZCe = !0),
			(e = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
				"UiItem_LGUIEventSystem_Actor",
				void 0,
			)),
			(LguiEventSystemManager.Fmr = e),
			LguiUtil_1.LguiUtil.SetActorIsPermanent(
				LguiEventSystemManager.Fmr,
				!0,
				!0,
			)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.LoadLguiEventSystemActor,
			),
			LguiEventSystemManager.Fmr.InitializeLguiEventSystemActor();
	}
	static Clear() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.DestroyLguiEventSystemActor,
		),
			LguiEventSystemManager.Fmr.ResetLguiEventSystemActor();
	}
	static ClickedMouse(e, t) {
		var n = LguiEventSystemManager.Fmr;
		if (n?.IsValid()) {
			var i = 0 === t;
			switch (e) {
				case InputMappingsDefine_1.actionMappings.Ui左键点击:
					n.InputTrigger(i, 0);
					break;
				case InputMappingsDefine_1.actionMappings.Ui右键点击:
					n.InputTrigger(i, 2);
			}
		}
	}
	static InputNavigation(e, t) {
		var n = LguiEventSystemManager.Fmr;
		if (n?.IsValid()) {
			var i = 0 === t;
			switch (e) {
				case InputMappingsDefine_1.actionMappings.Ui方向上:
					n.InputNavigation(3, i);
					break;
				case InputMappingsDefine_1.actionMappings.Ui方向下:
					n.InputNavigation(4, i);
					break;
				case InputMappingsDefine_1.actionMappings.Ui方向左:
					n.InputNavigation(1, i);
					break;
				case InputMappingsDefine_1.actionMappings.Ui方向右:
					n.InputNavigation(2, i);
			}
		}
	}
	static RefreshCurrentInputModule() {
		LguiEventSystemManager.Fmr?.RefreshCurrentInputModule();
	}
	static InputWheelAxis(e, t) {
		LguiEventSystemManager.Fmr?.InputScroll(t);
	}
	static InputTouchTrigger(e, t, n) {
		LguiEventSystemManager.Fmr?.InputTouchTrigger(e, t, n);
	}
	static InputLguiTouchMove(e, t) {
		LguiEventSystemManager.Fmr?.InputTouchMove(e, t);
	}
	static SetEventDataPrevPosition(e, t) {
		LguiEventSystemManager.Fmr?.SetPrevMousePosition(e, t);
	}
	static get LguiEventSystemActor() {
		return LguiEventSystemManager.Fmr;
	}
	static GetNowHitComponent() {
		return LguiEventSystemManager.Fmr.GetNowHitComponent();
	}
	static GetNowHitComponentName() {
		var e = LguiEventSystemManager.GetNowHitComponent();
		if (e) return e.GetDisplayName();
	}
	static GetPointerEventData(e, t = !1) {
		return LguiEventSystemManager.Fmr?.GetPointerEventData(e, t);
	}
	static GetPointerEventDataPosition(e) {
		if ((e = LguiEventSystemManager.GetPointerEventData(e)))
			return e.pointerPosition;
	}
	static IsPressComponentIsValid(e) {
		return (
			!!(e = LguiEventSystemManager.GetPointerEventData(e)) &&
			void 0 !== e.enterComponent &&
			void 0 !== e.pressComponent
		);
	}
	static IsNowTriggerPressed(e) {
		return (
			!!(e = LguiEventSystemManager.GetPointerEventData(e)) &&
			e.nowIsTriggerPressed
		);
	}
}
(exports.LguiEventSystemManager = LguiEventSystemManager).ZCe = !1;

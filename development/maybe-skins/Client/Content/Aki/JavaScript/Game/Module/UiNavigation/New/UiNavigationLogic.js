"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationLogic = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
	TsUiNavigationBehaviorListener_1 = require("./TsUiNavigationBehaviorListener"),
	UiNavigationGlobalData_1 = require("./UiNavigationGlobalData"),
	UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationLogic {
	static InitNavigationDelegate(e) {
		e.TryFindNavigationDelegate.Bind(
			UiNavigationLogic.TryFindNavigationDelegate,
		);
	}
	static ClearNavigationDelegate(e) {
		e.TryFindNavigationDelegate.Unbind();
	}
	static Rwo(e, t) {
		var i;
		e?.HasDynamicScrollView() &&
			((i = e.GetNavigationGroup()),
			(i = e.ScrollView.Horizontal ? i.HorizontalWrapMode : i.VerticalWrapMode),
			(t = 2 !== t && 4 !== t),
			e.ScrollView.NavigateScrollToUIItem(e?.GetRootComponent(), t, i));
	}
	static Uwo(e) {
		e &&
			AudioSystem_1.AudioSystem.PostEvent("play_ui_gamepad_navigation_common");
	}
	static Awo(e, t) {
		if (
			e &&
			e.PanelConfig?.IsAllowNavigate() &&
			e.GetNavigationComponent().CheckFindNavigationBefore()
		) {
			let a;
			var i = e.GetNavigationGroup();
			i =
				((a =
					0 === i?.GroupType
						? UiNavigationLogic.Pwo(e, t, i.AllowNavigationInSelfDynamic)
						: e.FindNavigation(t)),
				UiNavigationLogic.xwo(a));
			if (e.GetNavigationComponent().CheckFindNavigationAfter(i)) return i;
		}
	}
	static Pwo(e, t, i) {
		return (
			(t = e.FindNavigation(t)),
			!i &&
			(i = this.xwo(t)) &&
			((void 0 === e.ScrollViewActor &&
				void 0 === i.ScrollViewActor &&
				void 0 === e.LayoutActor &&
				void 0 === i.LayoutActor) ||
				e.ScrollViewActor !== i.ScrollViewActor ||
				e.LayoutActor !== i.LayoutActor)
				? e.GetSceneComponent()
				: t
		);
	}
	static xwo(e) {
		return e
			?.GetOwner()
			?.GetComponentByClass(
				TsUiNavigationBehaviorListener_1.TsUiNavigationBehaviorListener.StaticClass(),
			);
	}
	static FindUiNavigationPanelConfig(e) {
		let t,
			i = e.GetAttachParentActor();
		for (
			;
			void 0 !== i &&
			!(t = i.GetComponentByClass(
				UE.TsUiNavigationPanelConfig_C.StaticClass(),
			));
		)
			i = i.GetAttachParentActor();
		return t;
	}
	static FindUpNavigationListener(e) {
		let t,
			i = e.GetAttachParentActor();
		for (
			;
			void 0 !== i &&
			!i.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass()) &&
			!(t = i.GetComponentByClass(
				UE.TsUiNavigationBehaviorListener_C.StaticClass(),
			));
		)
			i = i.GetAttachParentActor();
		return t;
	}
	static BindHotKeyComponentAction(e, t) {
		var i,
			a = ModelManager_1.ModelManager.UiNavigationModel;
		a &&
			(i = e.GetActionName()) &&
			((a = a.GetOrAddActionHotKeyComponentSet(i)),
			t
				? (a.size <= 0 &&
						InputDistributeController_1.InputDistributeController.BindAction(
							i,
							UiNavigationLogic.bMe,
						),
					a.has(e) || a.add(e))
				: a.size <= 0 ||
					(a.delete(e),
					a.size <= 0 &&
						InputDistributeController_1.InputDistributeController.UnBindAction(
							i,
							UiNavigationLogic.bMe,
						)));
	}
	static BindHotKeyComponentAxis(e, t) {
		var i,
			a = ModelManager_1.ModelManager.UiNavigationModel;
		a &&
			(i = e.GetAxisName()) &&
			((a = a.GetOrAddAxisHotKeyComponentsSet(i)),
			t
				? (a.size <= 0 &&
						InputDistributeController_1.InputDistributeController.BindAxis(
							i,
							UiNavigationLogic.wwo,
						),
					a.has(e) || a.add(e))
				: a.size <= 0 ||
					(a.delete(e),
					a.size <= 0 &&
						InputDistributeController_1.InputDistributeController.UnBindAxis(
							i,
							UiNavigationLogic.wwo,
						)));
	}
	static HasActiveListenerInGroup(e) {
		if (e)
			for (let t = 0, i = e.ListenerList.Num(); t < i; ++t)
				if (e.ListenerList.Get(t).IsListenerActive()) return !0;
		return !1;
	}
	static UpdateNavigationListener(e) {
		var t = ModelManager_1.ModelManager.UiNavigationModel;
		t &&
			((LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent =
				e?.RootUIComp),
			t.SetCursorFollowItem(e),
			this.MemoryGroupConfigLastSelect(e),
			(t = e?.GetBehaviorComponent()) instanceof UE.UISelectableComponent) &&
			t.NotifyFocusListener();
	}
	static MemoryGroupConfigLastSelect(e) {
		var t;
		e &&
			((t = e.GetNavigationGroup())
				? t.SelectableMemory && (t.LastSelectListener = e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[MemoryGroupConfigLastSelect]查找不到当前导航的导航组,逻辑上有问题",
					));
	}
	static HandleInputControllerTypeChange() {
		var e,
			t,
			i = ModelManager_1.ModelManager.PlatformModel.IsInGamepad(),
			a = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
		a && (e = a.GetPointerEventData(0))
			? ((t =
					!(t =
						UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) ||
					t.GetCurrentPanel()?.AllowNavigateInKeyBoard),
				i
					? (a.SetIsUseMouse(!1),
						a.UpdateNavigationListener(void 0),
						ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!1),
						t ||
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.ResetNavigationListener,
							))
					: t
						? ((a = 0 === e.inputType),
							ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(a))
						: (ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!0),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.ResetNavigationListener,
							)))
			: ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!i);
	}
	static ForceChangeInputType() {
		var e;
		ModelManager_1.ModelManager.PlatformModel.IsInKeyBoard() &&
			(e =
				UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) &&
			!e.GetCurrentPanel().IsAllowNavigate() &&
			(e =
				LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) &&
			1 === e.GetPointerEventData(0).inputType &&
			e.SetIsForceChange(!0);
	}
	static ExecuteInputNavigation(e, t) {
		var i =
			UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
		i &&
			i.GetFocusListener() &&
			LguiEventSystemManager_1.LguiEventSystemManager.InputNavigation(e, t);
	}
	static ExecuteInterfaceMethod(e, t, ...i) {
		t in e && "function" == typeof e[t] && e[t](...i);
	}
}
(exports.UiNavigationLogic = UiNavigationLogic),
	((_a = UiNavigationLogic).TryFindNavigationDelegate = (e, t) =>
		0 !== e || t
			? UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation
				? void 0
				: ((t = t
						? t.GetRootComponent()
						: LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
								.navigationComponent),
					(t = UiNavigationLogic.xwo(t)),
					(t = UiNavigationLogic.Awo(t, e)),
					_a.Rwo(t, e),
					_a.Uwo(t),
					t?.GetSceneComponent())
			: LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
					.navigationComponent),
	(UiNavigationLogic.bMe = (e, t) => {
		var i = ModelManager_1.ModelManager.UiNavigationModel;
		if (i)
			for (const a of i.GetActionHotKeyComponentSet(e))
				a.IsHotKeyActive() && (0 === t ? a.Press() : a.Release());
	}),
	(UiNavigationLogic.wwo = (e, t) => {
		var i = ModelManager_1.ModelManager.UiNavigationModel;
		if (i)
			for (const a of i.GetAxisHotKeyComponentSet(e))
				a.IsAllowTickContinue() && a.InputAxis(e, t);
	});

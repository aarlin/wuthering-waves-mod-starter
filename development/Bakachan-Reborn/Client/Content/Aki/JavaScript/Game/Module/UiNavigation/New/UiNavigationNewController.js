"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationNewController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
	UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput"),
	TsUiNavigationBehaviorListener_1 = require("./TsUiNavigationBehaviorListener"),
	UiNavigationDefine_1 = require("./UiNavigationDefine"),
	UiNavigationGlobalData_1 = require("./UiNavigationGlobalData"),
	UiNavigationLogic_1 = require("./UiNavigationLogic"),
	UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationNewController extends UiControllerBase_1.UiControllerBase {
	static $wo() {
		var e =
			UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
		if (e) return e.GetScrollbarData();
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiNavigation",
				11,
				"[GetCurrentNavigationScrollbarData]查找不到当前的导航句柄",
			);
	}
	static GetCurrentNavigationActiveListenerByTag(e, t = !1) {
		var i =
			UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
		if (i) {
			var a = i.GetActiveListenerByTag(e);
			if (a || t) return a;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					"[GetCurrentNavigationActiveListenerByTag]查找不到对应的按钮",
					["Tag", e],
					["ViewName", i.ViewName],
				);
		} else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiNavigation",
					11,
					"[GetCurrentNavigationActiveListenerByTag]查找不到当前的导航句柄",
				);
	}
	static GetCurrentNavigationFocusListener() {
		var e =
			UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
		if (e) {
			if ((e = e.GetFocusListener())) return e;
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiNavigation",
					11,
					"[GetCurrentNavigationFocusListener]查找不到当前导航对象",
				);
		} else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiNavigation",
					11,
					"[GetCurrentNavigationFocusListener]查找不到当前的导航句柄",
				);
	}
	static Ywo() {
		var e = this.GetCurrentNavigationFocusListener();
		if (e) {
			if (
				(UiNavigationLogic_1.UiNavigationLogic.MemoryGroupConfigLastSelect(e),
				(e = e.GetNavigationGroup()))
			)
				return e;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					"[GetCurrentNavigationListenerGroup]查找不到当前导航的导航组,逻辑上有问题",
				);
		}
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.LoadLguiEventSystemActor,
			this.aGe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DestroyLguiEventSystemActor,
				this.Yfe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.Jwo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PointerInputTypeChange,
				this.zwo,
			),
			InputDistributeController_1.InputDistributeController.BindActions(
				[
					InputMappingsDefine_1.actionMappings.Ui方向上,
					InputMappingsDefine_1.actionMappings.Ui方向下,
					InputMappingsDefine_1.actionMappings.Ui方向左,
					InputMappingsDefine_1.actionMappings.Ui方向右,
				],
				this.Zwo,
			),
			InputDistributeController_1.InputDistributeController.BindAction(
				InputMappingsDefine_1.actionMappings.手柄引导下一步,
				this.eBo,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.LoadLguiEventSystemActor,
			this.aGe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.DestroyLguiEventSystemActor,
				this.Yfe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.Jwo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PointerInputTypeChange,
				this.zwo,
			),
			InputDistributeController_1.InputDistributeController.UnBindActions(
				[
					InputMappingsDefine_1.actionMappings.Ui方向上,
					InputMappingsDefine_1.actionMappings.Ui方向下,
					InputMappingsDefine_1.actionMappings.Ui方向左,
					InputMappingsDefine_1.actionMappings.Ui方向右,
				],
				this.Zwo,
			),
			InputDistributeController_1.InputDistributeController.UnBindAction(
				InputMappingsDefine_1.actionMappings.手柄引导下一步,
				this.eBo,
			);
	}
	static OnTick(e) {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.Tick(e),
			ModelManager_1.ModelManager.UiNavigationModel.Tick(e);
	}
	static HotKeyCloseView() {
		var e = this.GetCurrentNavigationActiveListenerByTag(
			HotKeyViewDefine_1.EXIT_TAG,
		);
		this.JumpNavigationGroup(6)
			? UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(
					e.GetNavigationComponent(),
					"InteractClickPrevGroup",
				)
			: e
				? this.CHe(e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("UiNavigation", 11, "查找不到对应的热键按钮", [
						"Tag",
						HotKeyViewDefine_1.EXIT_TAG,
					]);
	}
	static ClickButton(e) {
		(e = this.GetCurrentNavigationActiveListenerByTag(e)) && this.CHe(e);
	}
	static SimulateClickItem(e, t) {
		var i =
			LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
		return (
			!!i && i.SimulateClickButton(UiNavigationDefine_1.GAMEPAD_POINT_ID, e, t)
		);
	}
	static CHe(e) {
		UiLayer_1.UiLayer.IsInMask() ||
			(this.SimulateClickItem(e.GetBehaviorComponent().RootUIComp, e.ClickPivot)
				? (UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(
						e.GetNavigationComponent(),
						"InteractClickHandle",
					),
					ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove())
				: UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(
						e.GetNavigationComponent(),
						"InteractClickFailHandle",
					));
	}
	static ClickButtonInside(e) {
		var t = this.GetCurrentNavigationFocusListener();
		if (t) {
			let i = UiNavigationNewController.GetFocusListenerInsideListenerByTag(
				t,
				e,
			);
			(i = i || t.GetChildListenerByTag(e))
				? this.CHe(i)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[ClickButtonInside]查找不到对应的热键按钮",
						["Tag", e],
					);
		}
	}
	static Interact(e) {
		var t = this.GetCurrentNavigationFocusListener();
		return (
			!!t &&
			(e
				? this.tBo(t.GetSelectableComponent(), !0)
				: this.tBo(t.GetSelectableComponent(), !1))
		);
	}
	static InteractClick() {
		var e = this.GetCurrentNavigationFocusListener();
		this.InteractClickByListener(e);
	}
	static InteractClickByListener(e) {
		e && this.CHe(e);
	}
	static FindScrollbar(e) {
		var t = this.$wo();
		t && (e ? t.FindNextScrollbar() : t.FindPrevScrollbar());
	}
	static ScrollBarChangeSchedule(e) {
		var t = this.$wo();
		t && ((t = t.GetCurrentScrollbar()), this.iBo(t, e));
	}
	static BookMarkNavigation(e, t) {
		const i = this.GetCurrentNavigationActiveListenerByTag(t);
		if (i) {
			var a = i.GetNavigationGroup();
			if (a) {
				let t;
				for (let e = 0, i = a.ListenerList.Num(); e < i; ++e) {
					const i = a.ListenerList.Get(e);
					if (i.IsCanFocus() && i.IsSelectedToggle()) {
						t = i.GetSelectableComponent();
						break;
					}
				}
				const i =
					UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(e, t);
				let n = i
					?.GetOwner()
					?.GetComponentByClass(UE.UIExtendToggle.StaticClass());
				if (!n || t === n) {
					let i;
					switch (e) {
						case 3:
							i = 1;
							break;
						case 4:
							i = 2;
							break;
						case 1:
							i = 3;
							break;
						case 2:
							i = 4;
							break;
						default:
							i = 0;
					}
					const a =
						UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(
							i,
							t,
						);
					n = a
						?.GetOwner()
						?.GetComponentByClass(UE.UIExtendToggle.StaticClass());
				}
				n &&
					((e = n
						.GetOwner()
						.GetComponentByClass(
							UE.TsUiNavigationBehaviorListener_C.StaticClass(),
						)),
					n?.bAutoScrollOnSelected && e?.ScrollView?.IsValid() && this.oBo(e),
					this.CHe(e),
					a.RefreshNavigation) &&
					this.MarkViewHandleRefreshNavigationDirty();
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[BookMarkNavigation]查找不到对应的导航组",
						["Tag", t],
					);
		}
	}
	static MarkViewHandleRefreshNavigationDirty() {
		UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().MarkRefreshNavigationDirty();
	}
	static JumpNavigationGroupByTag(e) {
		var t,
			i,
			a = this.Ywo();
		return (
			!!a &&
			(StringUtils_1.StringUtils.IsBlank(e)
				? this.JumpNavigationGroup(5)
				: ((i =
						UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()),
					(e = a.GroupNameMap.Get(e)),
					(t = this.rBo(i, e)) &&
						(i = i.GetActiveNavigationGroupByNameCheckAll(e)) &&
						(i.PrevGroupName = a.GroupName),
					t))
		);
	}
	static JumpNavigationGroup(e) {
		var t = this.Ywo();
		if (!t) return !1;
		var i =
			UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
		switch (e) {
			case 5:
				return this.rBo(i, t.NextGroupName);
			case 6:
				var a = this.rBo(i, t.PrevGroupName);
				return a && t.SelectableMemory && (t.LastSelectListener = void 0), a;
			default:
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("UiNavigation", 11, "导航组跳转方向错误", [
							"direction",
							e,
						]),
					!1
				);
		}
	}
	static rBo(e, t) {
		return !(
			UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation ||
			!(e = e.GetActiveNavigationGroupByNameCheckAll(t)) ||
			((e = this.nBo(e))
				? (this.oBo(e), this.SwitchNavigationFocus(e), 0)
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiNavigation",
							11,
							"[ChangeFocusListenerByGroupName]找不到可跳转的导航对象",
							["GroupName", t],
						),
					1))
		);
	}
	static oBo(e) {
		var t;
		e.ScrollView &&
			(t = e.GetSelectableComponent()) &&
			e.ScrollView.ScrollTo(t.GetRootComponent());
	}
	static nBo(e) {
		if (e) {
			if (e.SelectableMemory && e.LastSelectListener) {
				var t = e.LastSelectListener;
				if (t.IsCanFocus()) return t;
			}
			return this.sBo(e);
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiNavigation",
				11,
				"[GetActiveListenerInGroup]找不到导航组",
			);
	}
	static sBo(e) {
		if (e.DefaultListener) {
			var t = e.DefaultListener;
			if (t.IsIgnoreScrollOrLayoutCheckInSwitchGroup()) return this.aBo(e);
			if (!t.IsScrollOrLayoutActor() && t.IsCanFocus()) return t;
		}
		return this.FindLoopOrDynListener(e);
	}
	static FindLoopOrDynListener(e) {
		var t = e.DefaultListener;
		return t && (t = this.hBo(e, t)) ? t : this.aBo(e);
	}
	static aBo(e) {
		let t;
		for (let a = 0, n = e.ListenerList.Num(); a < n; ++a) {
			var i = e.ListenerList.Get(a);
			if ((!t && i.IsCanFocus() && (t = i), i.IsInScrollOrLayoutCanFocus()))
				return i;
		}
		return t;
	}
	static hBo(e, t) {
		return t.HasDynamicScrollView()
			? UiNavigationNewController.S5s(e, t)
			: UiNavigationNewController.E5s(e, t);
	}
	static y5s(e, t) {
		var i = UE.LGUIBPLibrary.GetComponentsInChildren(
			e,
			UE.TsUiNavigationBehaviorListener_C.StaticClass(),
			!0,
		);
		for (let e = 0, n = i.Num(); e < n; ++e) {
			var a = i.Get(e);
			if (a.GroupName === t.GroupName) return a;
		}
	}
	static S5s(e, t) {
		let i;
		var a = t.ScrollView.DisplayItemArray;
		for (let t = 0, r = a.Num(); t < r; ++t) {
			var n = a.Get(t),
				o = UiNavigationNewController.y5s(n, e);
			if (
				o &&
				o.IsInDynScrollDisplay(n) &&
				o.IsScrollOrLayoutActor() &&
				(!i && o.IsCanFocus() && (i = o), o.IsInScrollOrLayoutCanFocus())
			)
				return o;
		}
		return i;
	}
	static E5s(e, t) {
		let i;
		var a = t.GetScrollOrLayoutActor();
		for (let t = 0, o = e.ListenerList.Num(); t < o; ++t) {
			var n = e.ListenerList.Get(t);
			if (
				n.IsScrollOrLayoutActor() &&
				(!i && n.IsCanFocus() && (i = n),
				(!a || n.GetScrollOrLayoutActor() === a) &&
					n.IsInScrollOrLayoutCanFocus())
			)
				return n;
		}
		return i;
	}
	static GetCanFocusInsideListener(e) {
		var t = e.GetNavigationGroup().InsideGroupName,
			i = UE.LGUIBPLibrary.GetComponentsInChildren(
				e.InsideGroupActor,
				UE.TsUiNavigationBehaviorListener_C.StaticClass(),
				!0,
			);
		if (i)
			for (let e = i.Num() - 1; 0 <= e; --e) {
				var a = i.Get(e);
				if (
					!StringUtils_1.StringUtils.IsEmpty(a.GroupName) &&
					t === a.GroupName &&
					a.IsCanFocus()
				)
					return a;
			}
	}
	static IsInFocusInsideListenerList(e, t) {
		var i;
		return (
			!StringUtils_1.StringUtils.IsEmpty(t.GroupName) &&
			((i = e.GetNavigationGroup().InsideGroupName),
			!!(e = UE.LGUIBPLibrary.GetComponentsInChildren(
				e.InsideGroupActor,
				UE.TsUiNavigationBehaviorListener_C.StaticClass(),
				!0,
			))) &&
			i === t.GroupName &&
			e.Contains(t)
		);
	}
	static JumpInsideNavigationGroup() {
		var e,
			t = this.Ywo();
		t &&
			((e = this.GetCurrentNavigationFocusListener()),
			(e = this.GetCanFocusInsideListener(e))
				? this.SwitchNavigationFocus(e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[JumpInsideNavigationGroup]查找不到内部有可导航对象",
						["InsideGroupName", t.InsideGroupName],
					));
	}
	static SimulationPointUp(e) {
		(e = this.GetCurrentNavigationActiveListenerByTag(e, !0))
			? this.tBo(e.GetSelectableComponent(), !1)
			: (e =
					LguiEventSystemManager_1.LguiEventSystemManager
						.LguiEventSystemActor) && e.ResetNowIsTriggerPressed();
	}
	static SimulationPointUpInside(e) {
		var t = this.GetCurrentNavigationFocusListener();
		t &&
			((t = t.GetChildListenerByTag(e))
				? this.tBo(t.GetSelectableComponent(), !1)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[SimulationPointUpInside]查找不到对应的热键按钮",
						["Tag", e],
					));
	}
	static tBo(e, t) {
		var i;
		return (
			!UiLayer_1.UiLayer.IsInMask() &&
			!!(i =
				LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) &&
			i.SimulationPointerDownUp(
				UiNavigationDefine_1.GAMEPAD_POINT_ID,
				e.RootUIComp,
				t,
			)
		);
	}
	static SimulationPointDown(e) {
		(e = this.GetCurrentNavigationActiveListenerByTag(e, !0)) &&
			this.tBo(e.GetSelectableComponent(), !0);
	}
	static SimulationPointDownInside(e) {
		var t = this.GetCurrentNavigationFocusListener();
		t &&
			((t = t.GetChildListenerByTag(e))
				? this.tBo(t.GetSelectableComponent(), !0)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[SimulationPointDownInside]查找不到对应的热键按钮",
						["Tag", e],
					));
	}
	static FindTarget(e) {
		var t = this.GetCurrentNavigationFocusListener();
		t &&
			((t = t.GetSelectableComponent()),
			(e = UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(
				e,
				t,
			)) !== t.RootUIComp) &&
			((t = e
				.GetOwner()
				.GetComponentByClass(
					UE.TsUiNavigationBehaviorListener_C.StaticClass(),
				)),
			this.oBo(t));
	}
	static SliderComponentSetValue(e, t) {
		(e = this.GetCurrentNavigationActiveListenerByTag(e)) &&
			this.lBo(e.GetSelectableComponent(), t);
	}
	static SliderInsideComponentSetValue(e, t) {
		var i = this.GetCurrentNavigationFocusListener();
		i &&
			((i = i.GetChildListenerByTag(e))
				? this.lBo(i.GetSelectableComponent(), t)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[SliderInsideComponentSetValue]查找不到对应的热键按钮",
						["Tag", e],
					));
	}
	static ScrollbarInsideComponentSetValue(e, t) {
		var i = this.GetCurrentNavigationFocusListener();
		i &&
			((i = this.GetFocusListenerInsideListenerByTag(i, e))
				? this.iBo(i.GetBehaviorComponent(), t)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[ScrollbarInsideComponentSetValue]查找不到对应的热键按钮",
						["Tag", e],
					));
	}
	static iBo(e, t) {
		e &&
			e.SetScrollProgressIncrement(t * UiNavigationDefine_1.SCROLLBAR_INTERVAL);
	}
	static lBo(e, t) {
		var i;
		e &&
			((i = e.Value),
			e.SetProgressIncrement(t, e.WholeNumbers),
			i === e.Value) &&
			(0 < t && i !== e.MaxValue
				? e.SetValue(i + 1)
				: t < 0 && i !== e.MinValue && e.SetValue(i - 1));
	}
	static DraggableComponentNavigate(e, t) {
		(e = this.GetCurrentNavigationActiveListenerByTag(e)) &&
			this._Bo(e.GetSelectableComponent(), t);
	}
	static DraggableInsideComponentNavigate(e, t) {
		var i = this.GetCurrentNavigationFocusListener();
		i &&
			((i = this.GetFocusListenerInsideListenerByTag(i, e))
				? this._Bo(i.GetSelectableComponent(), t)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"[ScrollbarInsideComponentSetValue]查找不到对应的热键按钮",
						["Tag", e],
					));
	}
	static _Bo(e, t) {
		e && (t ? e.NotifyNavigateToNext() : e.NotifyNavigateToPrev());
	}
	static SwitchNavigationFocus(e) {
		if (
			LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
				.navigationComponent ||
			this.GetCurrentNavigationFocusListener() ||
			e
		) {
			(UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup =
				!0),
				LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
					.navigationComponent ||
					((t =
						LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
							0,
						)),
					LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem?.SetSelectComponent(
						void 0,
						t,
						0,
					));
			var t =
					LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor,
				i = e?.GetSceneComponent();
			t?.UpdateNavigationListener(i),
				e ||
					UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().UpdateFocus(
						void 0,
					),
				(UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup =
					!1);
		}
	}
	static SetNavigationFocusForView(e) {
		var t, i;
		ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
			e?.IsValid() &&
			(t = e
				?.GetOwner()
				?.GetComponentByClass(
					TsUiNavigationBehaviorListener_1.default.StaticClass(),
				)) &&
			!StringUtils_1.StringUtils.IsBlank(t.GroupName) &&
			(i = t.GetNavigationGroup()) &&
			2 !== i.GroupType &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiNavigation", 11, "业务设置了导航对象", [
					"名字",
					e.displayName,
				]),
			this.SwitchNavigationFocus(t));
	}
	static SetNavigationFocusForViewSameGroup(e) {
		var t, i;
		ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
			e?.IsValid() &&
			(!(t = e
				?.GetOwner()
				?.GetComponentByClass(
					TsUiNavigationBehaviorListener_1.default.StaticClass(),
				)) ||
				StringUtils_1.StringUtils.IsBlank(t.GroupName) ||
				!(i = t.GetNavigationGroup()) ||
				2 === i.GroupType ||
				((i = this.GetCurrentNavigationFocusListener()) &&
					i.GroupName !== t.GroupName) ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiNavigation", 11, "业务设置了导航对象", [
						"名字",
						e.displayName,
					]),
				this.SwitchNavigationFocus(t)));
	}
	static SetNavigationFocusForGuide(e) {
		var t, i;
		ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
			e?.IsValid() &&
			(t = e
				?.GetOwner()
				?.GetComponentByClass(
					TsUiNavigationBehaviorListener_1.default.StaticClass(),
				)) &&
			!StringUtils_1.StringUtils.IsBlank(t.GroupName) &&
			(i = t.GetNavigationGroup()) &&
			2 !== i.GroupType &&
			(0 === i.GroupType
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiNavigation", 11, "引导设置了导航对象", [
							"名字",
							e.displayName,
						]),
					this.SwitchNavigationFocus(t))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("UiNavigation", 11, "引导设置了非导航对象", [
							"名字",
							e.displayName,
						]),
					ModelManager_1.ModelManager.UiNavigationModel.SetGuideFocusListener(
						t,
					)));
	}
	static ResetNavigationFocusForGuide() {
		ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
			ModelManager_1.ModelManager.UiNavigationModel.ResetGuideFocusListener();
	}
	static GetFocusListenerInsideListenerByTag(e, t) {
		let i = e.InsideActorMap?.Get(t);
		i = i || e.GetOwner();
		var a = UE.LGUIBPLibrary.GetComponentsInChildren(
			i,
			UE.TsUiNavigationBehaviorListener_C.StaticClass(),
			!0,
		);
		if (a)
			for (let e = a.Num() - 1; 0 <= e; --e) {
				var n = a.Get(e);
				if (n.TagArray?.Contains(t) && n.IsCanFocus()) return n;
			}
	}
	static GetMarkBookActiveListenerList(e) {
		if (!e) return [];
		if (1 !== e?.GroupType) return [];
		var t = [];
		for (let a = 0, n = e.ListenerList.Num(); a < n; ++a) {
			var i = e.ListenerList.Get(a);
			i.IsListenerActive() && t.push(i);
		}
		return t;
	}
	static ActiveTextInput(e) {
		(e = this.GetCurrentNavigationActiveListenerByTag(e)) &&
			e.GetBehaviorComponent().ActivateInputText();
	}
	static ActiveTextInputInside(e) {
		var t = this.GetCurrentNavigationFocusListener();
		t &&
			(t = this.GetFocusListenerInsideListenerByTag(t, e)) &&
			t.GetBehaviorComponent().ActivateInputText();
	}
}
(exports.UiNavigationNewController = UiNavigationNewController),
	((_a = UiNavigationNewController).IsTickEvenPausedInternal = !0),
	(UiNavigationNewController.aGe = () => {
		var e = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem;
		e &&
			(UiNavigationLogic_1.UiNavigationLogic.InitNavigationDelegate(
				LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem,
			),
			(e.HighlightWhenMouseMoveOut =
				ConfigManager_1.ConfigManager.UiNavigationConfig.GetHighlightWhenMouseMoveOut()),
			UE.UISelectableComponent.SetShieldMobileHighlight(
				ConfigManager_1.ConfigManager.UiNavigationConfig.GetMobileHighlight(),
			),
			UE.UISelectableComponent.SetShieldPCPress(
				ConfigManager_1.ConfigManager.UiNavigationConfig.GetPcPress(),
			));
	}),
	(UiNavigationNewController.Yfe = () => (
		UiNavigationLogic_1.UiNavigationLogic.ClearNavigationDelegate(
			LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem,
		),
		!0
	)),
	(UiNavigationNewController.Jwo = (e, t, i, a) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiNavigation",
				11,
				"[InputChange]输入平台改变!",
				["last", a],
				["now", e],
			),
			ModelManager_1.ModelManager.UiNavigationModel.InputControllerModeChange(),
			UiNavigationLogic_1.UiNavigationLogic.HandleInputControllerTypeChange(),
			UiNavigationLogic_1.UiNavigationLogic.ForceChangeInputType();
	}),
	(UiNavigationNewController.zwo = (e) => {
		ModelManager_1.ModelManager.PlatformModel.IsInGamepad() ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiNavigation", 11, "[InputChange]输入类型改变!", [
					"InputType",
					e,
				]),
			UiNavigationLogic_1.UiNavigationLogic.HandleInputControllerTypeChange());
	}),
	(UiNavigationNewController.Zwo = (e, t) => {
		UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(e, t);
	}),
	(UiNavigationNewController.eBo = () => {
		var e = ModelManager_1.ModelManager.UiNavigationModel;
		e &&
			e.GuideFocusListener &&
			(_a.CHe(e.GuideFocusListener), _a.ResetNavigationFocusForGuide());
	});

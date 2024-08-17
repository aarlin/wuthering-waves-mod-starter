"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsUiNavigationPanelConfig = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiNavigationUtil_1 = require("../UiNavigationUtil"),
	FindNavigationResult_1 = require("./FindNavigationResult"),
	NavigationPanelHandleCreator_1 = require("./PanelHandle/NavigationPanelHandleCreator");
class TsUiNavigationPanelConfig extends UE.LGUIBehaviour {
	constructor() {
		super(...arguments),
			(this.ViewName = ""),
			(this.Independent = !0),
			(this.IsChildPanel = !1),
			(this.DefaultNavigationActor = void 0),
			(this.DynamicListenerConfigMap = new UE.TMap()),
			(this.NormalGroup = void 0),
			(this.BookmarkGroup = void 0),
			(this.ScrollBarGroup = void 0),
			(this.AllowNavigateInKeyBoard = !1),
			(this.InteractiveTag = ""),
			(this.ViewHandle = void 0),
			(this.IsInActive = !1),
			(this.PanelHandle = void 0),
			(this.ViewHandleCacheFunctionList = []),
			(this.IncId = 0),
			(this.HotKeyItemSet = void 0),
			(this.CacheHotKeyStateMap = void 0);
	}
	AwakeBP() {
		GlobalData_1.GlobalData.GameInstance &&
			(this.InitDefaultParam(), this.InitPanelHandle());
	}
	StartBP() {
		GlobalData_1.GlobalData.GameInstance && this.NavigationViewCreate();
	}
	OnEnableBP() {
		GlobalData_1.GlobalData.GameInstance &&
			((this.IsInActive = !0),
			this.HandleAddPanel(),
			this.HandleUIActivePanel(),
			this.HandleChildUIActivePanel());
	}
	OnDisableBP() {
		GlobalData_1.GlobalData.GameInstance &&
			((this.IsInActive = !1),
			this.HandleAddPanel(),
			this.HandleUIActivePanel(),
			this.HandleChildUIActivePanel());
	}
	HandleUIActivePanel() {
		this.Independent &&
			this.HandleViewHandleFunction(() => {
				this.ViewHandle?.SetIsActive(this.IsInActive);
			});
	}
	HandleAddPanel() {
		this.IsInActive && this.ViewHandle?.SetCurrentAddPanel(this);
	}
	HandleChildUIActivePanel() {
		this.IsChildPanel &&
			this.Independent &&
			this.ViewHandle?.SetIsUsable(this.IsInActive);
	}
	OnDestroyBP() {
		GlobalData_1.GlobalData.GameInstance &&
			(this.PanelHandle.Clear(),
			this.NavigationViewDestroy(),
			(this.ViewHandle = void 0));
	}
	InitDefaultParam() {
		this.HotKeyItemSet = new Set();
	}
	NavigationViewCreate() {
		(this.IncId = ++UiNavigationUtil_1.UiNavigationUtil.IncId),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.NavigationViewCreate,
				this.IncId,
				this.GetOwner(),
			);
	}
	NavigationViewDestroy() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.NavigationViewDestroy,
			this.IncId,
			this.GetOwner(),
		);
	}
	GetGroupMap() {
		var e = new Map();
		for (let i = 0, a = this.NormalGroup.Num(); i < a; ++i) {
			var t = this.NormalGroup.Get(i);
			(t.GroupType = 0), e.set(t.GroupName, t);
		}
		for (let t = 0, a = this.BookmarkGroup.Num(); t < a; ++t) {
			var i = this.BookmarkGroup.Get(t);
			(i.GroupType = 1), e.set(i.GroupName, i);
		}
		return (
			this.ScrollBarGroup &&
				((this.ScrollBarGroup.GroupType = 2),
				e.set(this.ScrollBarGroup.GroupName, this.ScrollBarGroup)),
			e
		);
	}
	InitPanelHandle() {
		(this.PanelHandle =
			NavigationPanelHandleCreator_1.NavigationPanelHandleCreator.GetPanelHandle(
				this.InteractiveTag,
			)),
			this.PanelHandle?.SetGroupMap(this.GetGroupMap()),
			this.PanelHandle.SetDefaultNavigationListenerList(
				this.DefaultNavigationActor,
			);
	}
	HandleViewHandleFunction(e) {
		this.ViewHandle
			? e()
			: (this.ViewHandleCacheFunctionList ||
					(this.ViewHandleCacheFunctionList = []),
				this.ViewHandleCacheFunctionList.push(e));
	}
	ExecuteViewHandleFunction() {
		if (this.ViewHandleCacheFunctionList) {
			for (const e of this.ViewHandleCacheFunctionList) e();
			this.ViewHandleCacheFunctionList = [];
		}
	}
	RegisterNavigationListener(e) {
		var t;
		this.PanelHandle.AddListener(e),
			e.GetNavigationComponent().SetPanelHandle(this.PanelHandle),
			e.GetNavigationComponent().Start(),
			StringUtils_1.StringUtils.IsEmpty(e.GroupName) ||
				((t = this.PanelHandle.GetNavigationGroup(e.GroupName))
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"UiNavigation",
								11,
								"加入监听组件到导航组",
								["导航组名字", e.GroupName],
								["DisplayName", e.RootUIComp.displayName],
							),
						t.ListenerList.Add(e),
						2 === t.GroupType &&
							this.HandleViewHandleFunction(() => {
								this.ViewHandle?.MarkRefreshScrollDataDirty();
							}))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiNavigation",
							11,
							"导航监听组件找不到对应的导航组",
							["导航组名字", e.GroupName],
							[
								"Path",
								UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(
									e.RootUIComp.GetOwner(),
								),
							],
						));
	}
	DynamicListenerConfigHandle(e) {
		var t = e.DynamicTag;
		StringUtils_1.StringUtils.IsBlank(t) ||
			StringUtils_1.StringUtils.IsBlank(e.GroupName) ||
			(this.PanelHandle.GetNavigationGroup(e.GroupName)
				? (t = this.DynamicListenerConfigMap.Get(t))
					? (t.LayoutActor && (e.LayoutActor = t.LayoutActor),
						t.ScrollActor && (e.ScrollViewActor = t.ScrollActor),
						this.PanelHandle.ReplaceDefaultNavigationListener(e, t.Index))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiNavigation",
							11,
							"导航监听组件找不到对应的动态配置",
							["导航组名字", e.GroupName],
							["ViewName", this.ViewName],
						)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"UiNavigation",
						11,
						"导航监听组件找不到对应的导航组",
						["导航组名字", e.GroupName],
						["ViewName", this.ViewName],
					));
	}
	UnRegisterNavigationListener(e) {
		this.PanelHandle.DeleteListener(e);
		var t = this.PanelHandle.GetNavigationGroup(e.GroupName);
		if (t)
			for (let i = 0, a = t.ListenerList.Num(); i < a; ++i)
				if (t.ListenerList.Get(i).GetOwner() === e.GetOwner()) {
					t.ListenerList.RemoveAt(i);
					break;
				}
	}
	SetViewHandle(e) {
		(this.ViewHandle = e), this.ExecuteViewHandleFunction();
	}
	GetNavigationGroup(e) {
		return this.PanelHandle.GetNavigationGroup(e);
	}
	GetFocusListener() {
		return this.ViewHandle?.GetFocusListener();
	}
	GetPanelHandle() {
		return this.PanelHandle;
	}
	FindSuitableNavigation(e) {
		var t = new FindNavigationResult_1.FindNavigationResult();
		if (this.IsAllowNavigate())
			if (this.RootUIComp.IsUIActiveInHierarchy()) {
				for (const a of this.PanelHandle.GetSuitableNavigationListenerList(e))
					if (a) {
						let e = a;
						if (a.IsScrollOrLayoutActor()) {
							if (!a.IsScrollOrLayoutActive()) continue;
							if (a.IsInScrollOrLayoutAnimation()) {
								t.Result = 4;
								break;
							}
							var i = this.PanelHandle.GetLoopOrLayoutListener(a);
							if (!i) continue;
							e = i;
						}
						if (e.IsCanFocus()) {
							if (!e.IsRegisterToPanelConfig()) {
								t.Result = 5;
								break;
							}
							(t.Result = 1), (t.Listener = e);
							break;
						}
					}
				0 === t.Result && (t.Result = 2), this.PanelHandle.NotifyFindResult(t);
			} else t.Result = 2;
		else t.Result = 2;
		this.ViewHandle.NotifySuitableNavigation(t);
	}
	CheckReFindCondition() {
		return !(
			!this.ViewHandle ||
			(!this.RootUIComp.bIsUIActive && this.Independent
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiNavigation",
							11,
							"[ReFindNavigation]独立界面刚刚隐藏,触发导航对象取消不做通知处理",
						),
					1)
				: this.ViewHandle.HasNavigationButDisActive()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"UiNavigation",
								11,
								"[ReFindNavigation]界面已经处于HasNavigationButDisActive状态,触发导航对象取消不做通知处理",
							),
						1)
					: !this.Independent && !this.ViewHandle.GetIsActive())
		);
	}
	ReFindNavigation() {
		this.CheckReFindCondition() && this.ViewHandle.MarkRefreshNavigationDirty();
	}
	ReFindScrollbar() {
		this.ViewHandle && this.ViewHandle.FindNextScrollData();
	}
	TryFindScrollbar() {
		this.ViewHandle && this.ViewHandle.TryFindScrollData();
	}
	FindNavigationInNoneState() {
		this.ViewHandle &&
			this.ViewHandle.IsNonNavigation() &&
			this.ViewHandle.MarkRefreshNavigationDirty();
	}
	IsAllowNavigate() {
		var e = ModelManager_1.ModelManager.PlatformModel?.IsInGamepad() ?? !1;
		return this.AllowNavigateInKeyBoard || e;
	}
	AddHotKeyItem(e) {
		this.HotKeyItemSet.add(e), this.HandleAsyncHotKeyState(e);
	}
	HandleAsyncHotKeyState(e) {
		for (var [t, i] of this.GetOrCreateCacheHotKeyStateMap())
			for (const a of e.GetHotKeyComponentArray())
				a.SetVisibleMode(t, i),
					a.RefreshSelfHotKeyState(this.ViewHandle),
					a.RefreshSelfHotKeyText(this.ViewHandle);
	}
	GetOrCreateCacheHotKeyStateMap() {
		return (
			this.CacheHotKeyStateMap || (this.CacheHotKeyStateMap = new Map()),
			this.CacheHotKeyStateMap
		);
	}
	DeleteKeyItem(e) {
		this.HotKeyItemSet.delete(e);
	}
	SetHotKeyVisibleMode(e, t) {
		if ((this.GetOrCreateCacheHotKeyStateMap().set(e, t), this.HotKeyItemSet))
			for (const i of this.HotKeyItemSet)
				for (const a of i.GetHotKeyComponentArray()) a.SetVisibleMode(e, t);
	}
	NotifyListenerFocus(e) {
		this.IsAllowNavigate() && this.ViewHandle.UpdateFocus(e);
	}
	UpdateHotKeyTextForce(e, t) {
		for (const a of this.HotKeyItemSet)
			for (const n of a.GetHotKeyComponentArray()) {
				var i = n.GetBindButtonTag();
				e.Contains(i) && n.SetHotKeyDescTextForce(t);
			}
	}
	GetListenerListByTag(e) {
		return this.PanelHandle.GetListenerListByTag(e);
	}
	RefreshHotKeyComponents() {
		if (this.HotKeyItemSet)
			for (const e of this.HotKeyItemSet)
				for (const t of e.GetHotKeyComponentArray())
					t.RefreshSelfHotKeyState(this.ViewHandle),
						t.RefreshSelfHotKeyText(this.ViewHandle);
	}
	RefreshHotKeyTextId() {
		if (this.HotKeyItemSet)
			for (const e of this.HotKeyItemSet)
				for (const t of e.GetHotKeyComponentArray())
					t.RefreshSelfHotKeyText(this.ViewHandle);
	}
}
(exports.TsUiNavigationPanelConfig = TsUiNavigationPanelConfig),
	(exports.default = TsUiNavigationPanelConfig);
